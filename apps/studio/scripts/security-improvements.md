# Améliorations de Sécurité pour AWEMA CMS

## 1. Hachage des Mots de Passe

### Installer bcrypt
```bash
npm install bcryptjs
```

### Côté serveur (auto-deploy.service.ts)
```typescript
import bcrypt from 'bcryptjs';

// Lors de la création de l'utilisateur
const hashedPassword = await bcrypt.hash(adminPassword, 10);
const userData = {
  email: adminEmail,
  password_hash: hashedPassword, // Hash bcrypt au lieu de base64
  // ...
};
```

### Côté CMS (Edge Function Supabase)
```sql
-- Créer une fonction pour vérifier le mot de passe
CREATE OR REPLACE FUNCTION verify_user_password(
  user_email TEXT,
  user_password TEXT,
  user_site_id UUID
) RETURNS TABLE (
  id UUID,
  email TEXT,
  role TEXT,
  site_id UUID,
  full_name TEXT
) AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Récupérer l'utilisateur
  SELECT * INTO user_record
  FROM cms_users
  WHERE email = user_email
  AND site_id = user_site_id;
  
  -- Vérifier le mot de passe avec crypt
  IF user_record.id IS NOT NULL AND 
     crypt(user_password, user_record.password_hash) = user_record.password_hash THEN
    RETURN QUERY
    SELECT 
      user_record.id,
      user_record.email,
      user_record.role,
      user_record.site_id,
      user_record.full_name;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 2. Authentification JWT Sécurisée

### Edge Function pour Login
```typescript
// supabase/functions/cms-login/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { create } from 'https://deno.land/x/djwt@v2.8/mod.ts'
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts'

serve(async (req) => {
  const { email, password, siteId } = await req.json()
  
  // Vérifier l'utilisateur
  const { data: user } = await supabase
    .from('cms_users')
    .select('*')
    .eq('email', email)
    .eq('site_id', siteId)
    .single()
  
  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401
    })
  }
  
  // Créer un JWT
  const jwt = await create(
    { alg: 'HS256', typ: 'JWT' },
    { 
      sub: user.id,
      email: user.email,
      site_id: user.site_id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24h
    },
    Deno.env.get('JWT_SECRET')
  )
  
  return new Response(JSON.stringify({ 
    token: jwt,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

## 3. Isolation Totale des Sites

### RLS Améliorées
```sql
-- Politique stricte pour cms_users
CREATE POLICY "Users can only access their site data" ON cms_users
  FOR ALL
  USING (
    -- Service role ou utilisateur du même site
    auth.role() = 'service_role' 
    OR (
      auth.uid() = id 
      AND site_id = (
        SELECT site_id FROM cms_users WHERE id = auth.uid()
      )
    )
  );

-- Politique pour le contenu
CREATE POLICY "Content isolated by site" ON content
  FOR ALL
  USING (
    site_id = (
      SELECT site_id FROM cms_users WHERE id = auth.uid()
    )
  );

-- Audit des accès
CREATE TABLE access_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES cms_users(id),
  site_id UUID REFERENCES sites(id),
  action TEXT,
  resource TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 4. Protection contre XSS

### Sanitization des entrées
```typescript
import DOMPurify from 'isomorphic-dompurify';

// Dans le CMS
function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  });
}
```

### Content Security Policy
```typescript
// Dans netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = """
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      connect-src 'self' https://*.supabase.co;
    """
```

## 5. Validation des Domaines

### Vérifier l'unicité cross-tenant
```sql
-- Contrainte unique sur les domaines
ALTER TABLE sites 
ADD CONSTRAINT unique_domain UNIQUE (domain);

-- Fonction de validation
CREATE OR REPLACE FUNCTION validate_site_domain()
RETURNS TRIGGER AS $$
BEGIN
  -- Vérifier que le domaine n'est pas déjà utilisé
  IF NEW.domain IS NOT NULL THEN
    IF EXISTS (
      SELECT 1 FROM sites 
      WHERE domain = NEW.domain 
      AND id != NEW.id
    ) THEN
      RAISE EXCEPTION 'Ce domaine est déjà utilisé';
    END IF;
  END IF;
  
  -- Vérifier le format du subdomain
  IF NOT NEW.subdomain ~ '^[a-z0-9-]+$' THEN
    RAISE EXCEPTION 'Subdomain invalide';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_site_domain_trigger
BEFORE INSERT OR UPDATE ON sites
FOR EACH ROW
EXECUTE FUNCTION validate_site_domain();
```

## 6. Rate Limiting

### Protection contre le brute force
```typescript
// Edge Function avec rate limiting
const rateLimiter = new Map();

function checkRateLimit(ip: string): boolean {
  const key = `login_${ip}`;
  const attempts = rateLimiter.get(key) || 0;
  
  if (attempts >= 5) {
    return false; // Trop de tentatives
  }
  
  rateLimiter.set(key, attempts + 1);
  
  // Reset après 15 minutes
  setTimeout(() => rateLimiter.delete(key), 15 * 60 * 1000);
  
  return true;
}
```

## 7. Monitoring et Alertes

### Logs d'activité suspecte
```sql
-- Trigger pour logger les activités
CREATE OR REPLACE FUNCTION log_cms_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO access_logs (
    user_id,
    site_id,
    action,
    resource,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    NEW.site_id,
    TG_OP,
    TG_TABLE_NAME,
    inet_client_addr(),
    current_setting('request.headers')::json->>'user-agent'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer à toutes les tables sensibles
CREATE TRIGGER log_content_changes
AFTER INSERT OR UPDATE OR DELETE ON content
FOR EACH ROW EXECUTE FUNCTION log_cms_activity();
```

## 8. Backup et Récupération

### Sauvegardes automatiques
```typescript
// Fonction pour backup quotidien
async function backupSiteData(siteId: string) {
  const { data: site } = await supabase
    .from('sites')
    .select('*, content(*), media(*)')
    .eq('id', siteId)
    .single();
    
  // Stocker dans un bucket sécurisé
  await supabase.storage
    .from('backups')
    .upload(
      `${siteId}/${new Date().toISOString()}.json`,
      JSON.stringify(site),
      { upsert: false }
    );
}
```

## Architecture Recommandée pour Production

### 1. API Gateway
- Cloudflare Workers ou AWS API Gateway
- Rate limiting centralisé
- WAF (Web Application Firewall)

### 2. Authentification
- Supabase Auth avec MFA
- Sessions côté serveur (Redis)
- Refresh tokens sécurisés

### 3. Infrastructure
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│ Cloudflare   │────▶│   Netlify   │
│   (CMS)     │     │   Workers    │     │   (Static)  │
└─────────────┘     └──────────────┘     └─────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │   Supabase   │
                    │  (Database)  │
                    └──────────────┘
```

### 4. Coûts Estimés
- Cloudflare Workers: 0€ (100k requêtes/jour gratuit)
- Supabase: 0€ (jusqu'à 500MB)
- Netlify: 0€ (100GB bande passante)
- **Total: 0€/mois pour ~100 sites**
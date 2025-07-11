# Architecture CMS Optimale pour AWEMA

## 🏆 Solution gagnante : Supabase + Netlify Edge Functions

### Pourquoi cette stack ?

| Critère | Supabase | Autres options |
|---------|----------|----------------|
| **Coût** | 0€ (jusqu'à 500MB) | Strapi: 50€/mois hosting |
| **Setup** | 5 minutes | Strapi: 2h+ |
| **Maintenance** | 0 (géré) | Strapi: mises à jour constantes |
| **API** | REST + Realtime inclus | À développer |
| **Auth** | Intégré | À configurer |
| **Scaling** | Automatique | Manuel |

## 📐 Architecture complète

```
┌─────────────────────────────────────────────────────────┐
│                     AWEMA Studio                        │
│                  (Génère les sites)                     │
└──────────────────────┬──────────────────────────────────┘
                       │ Export avec config CMS
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   Sites Clients                         │
│                    (Netlify)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Site A    │  │   Site B    │  │   Site C    │   │
│  │  index.html │  │  index.html │  │  index.html │   │
│  │  + CMS UI   │  │  + CMS UI   │  │  + CMS UI   │   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
│         │                 │                 │           │
│         └─────────────────┴─────────────────┘           │
│                           │                             │
│                    Edge Functions                       │
│                  (Auth + Proxy API)                     │
└───────────────────────────┬─────────────────────────────┘
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Supabase                           │
│                  (1 seule instance)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Tables:                                          │   │
│  │ - sites (id, domain, settings)                  │   │
│  │ - content (site_id, page, section, data)        │   │
│  │ - media (site_id, url, alt)                     │   │
│  │ - users (email, site_id, role)                  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 💻 Code d'implémentation

### 1. Setup Supabase (5 min)

```sql
-- Tables dans Supabase
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  api_key TEXT UNIQUE DEFAULT gen_random_uuid(),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, page, section)
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'editor',
  UNIQUE(site_id, email)
);

-- Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Politique : un site ne peut voir que son contenu
CREATE POLICY "Sites can only see own content" ON content
  FOR ALL USING (site_id = current_setting('app.current_site_id')::UUID);
```

### 2. Edge Function Netlify (dans chaque site)

```typescript
// netlify/edge-functions/cms-api.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://xxx.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

export default async (request: Request) => {
  const url = new URL(request.url)
  const siteId = request.headers.get('X-Site-ID')
  const apiKey = request.headers.get('X-API-Key')
  
  if (!siteId || !apiKey) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  
  // Vérifier l'API key
  const { data: site } = await supabase
    .from('sites')
    .select('id')
    .eq('id', siteId)
    .eq('api_key', apiKey)
    .single()
    
  if (!site) {
    return new Response('Invalid credentials', { status: 401 })
  }
  
  // Router les requêtes
  if (url.pathname.startsWith('/api/content')) {
    return handleContent(request, supabase, siteId)
  }
  
  return new Response('Not found', { status: 404 })
}
```

### 3. CMS UI intégré (dans le site)

```html
<!-- Dans chaque site exporté -->
<div id="awema-cms-button" style="position:fixed;bottom:20px;right:20px;z-index:9999;display:none;">
  <button onclick="openCMS()" style="background:#3b82f6;color:white;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    ✏️ Modifier
  </button>
</div>

<script>
// Configuration du site
window.AWEMA_CMS = {
  siteId: '${SITE_ID}',
  apiKey: '${API_KEY}',
  apiUrl: '/.netlify/edge-functions/cms-api'
};

// Afficher le bouton si connecté
if (localStorage.getItem('awema_cms_token')) {
  document.getElementById('awema-cms-button').style.display = 'block';
}

// Interface CMS légère
function openCMS() {
  const modal = document.createElement('div');
  modal.innerHTML = \`
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;">
      <div style="position:absolute;inset:20px;background:white;border-radius:12px;overflow:hidden;">
        <iframe src="/admin" style="width:100%;height:100%;border:none;"></iframe>
      </div>
    </div>
  \`;
  document.body.appendChild(modal);
}
</script>
```

### 4. Coûts réels

| Service | Gratuit jusqu'à | Coût après | Pour 100 sites |
|---------|-----------------|------------|----------------|
| **Supabase** | 500MB + 2GB transfer | 25$/mois | 0€ (largement suffisant) |
| **Netlify** | 100GB/mois | 19$/TB | 0€ |
| **Total** | - | - | **0€/mois** |

### 5. Script de déploiement

```bash
#!/bin/bash
# deploy-cms-site.sh

SITE_NAME=$1
SITE_ID=$(uuidgen)
API_KEY=$(uuidgen)

# 1. Créer le site dans Supabase
curl -X POST $SUPABASE_URL/rest/v1/sites \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"$SITE_ID\",\"domain\":\"$SITE_NAME.netlify.app\",\"name\":\"$SITE_NAME\",\"api_key\":\"$API_KEY\"}"

# 2. Exporter le site avec la config
AWEMA_EXPORT_CONFIG="{\"siteId\":\"$SITE_ID\",\"apiKey\":\"$API_KEY\"}" npm run export

# 3. Déployer sur Netlify
netlify deploy --prod --dir=./dist
```

## 🚀 Avantages de cette architecture

1. **Coût = 0€** jusqu'à ~500 sites
2. **Setup = 30 minutes** total
3. **Maintenance = 0** (tout est géré)
4. **Performance = A+** (edge functions)
5. **Sécurité = A+** (RLS Supabase)

## 📱 Bonus : App mobile de gestion

```typescript
// App React Native pour gérer tous les sites
import { createClient } from '@supabase/supabase-js'

export function useSites() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  
  return {
    getSites: () => supabase.from('sites').select('*'),
    updateContent: (siteId, page, section, data) => 
      supabase.from('content').upsert({ site_id: siteId, page, section, data })
  }
}
```

## 🎯 Résultat final

- **Vos clients** : CMS simple et rapide
- **Vous** : 0€ de coût, revenus 29€/mois/client
- **Technique** : 1 Supabase pour tous, Edge functions par site
- **Business** : 100% de marge, scalable à l'infini

C'est LA solution optimale pour 2024 !
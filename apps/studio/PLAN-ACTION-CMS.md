# 🎯 Plan d'Action CMS Fonctionnel

## Problème actuel
- Edge Functions ne répondent pas (404)
- Authentification essaie d'appeler une fonction RPC qui n'existe pas
- Pas de persistance des données

## Solution proposée

### 1. Architecture
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  Site Statique  │────▶│ Netlify Functions│────▶│  Supabase   │
│   (Netlify)     │     │   (/.netlify/    │     │  (Tables)   │
└─────────────────┘     │    functions/)   │     └─────────────┘
                        └──────────────────┘
```

### 2. Implémentation

#### A. Netlify Functions (pas Edge)
```javascript
// netlify/functions/cms-auth.js
exports.handler = async (event) => {
  // Authentification directe avec Supabase
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  // Vérifier dans la table cms_users
  const { data: users } = await supabase
    .from('cms_users')
    .select('*')
    .eq('email', email)
    .single();
    
  // Retourner JWT token
}
```

#### B. CMS côté client
```javascript
// Appeler les Functions Netlify (pas Edge)
const API_BASE = '/.netlify/functions';

async function login(email, password) {
  const response = await fetch(`${API_BASE}/cms-auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  const { token } = await response.json();
  // Stocker le token pour les requêtes suivantes
}
```

#### C. Persistance Supabase
```javascript
// netlify/functions/cms-content.js
exports.handler = async (event) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  // GET: Récupérer le contenu
  if (event.httpMethod === 'GET') {
    const { data } = await supabase
      .from('cms_content')
      .select('*')
      .eq('site_id', SITE_ID);
    return { statusCode: 200, body: JSON.stringify(data) };
  }
  
  // PUT: Mettre à jour
  if (event.httpMethod === 'PUT') {
    const { data } = await supabase
      .from('cms_content')
      .update(JSON.parse(event.body))
      .eq('id', contentId);
    return { statusCode: 200, body: JSON.stringify(data) };
  }
}
```

### 3. Configuration Netlify
```toml
[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### 4. Sécurité
- Pas de CORS (même domaine)
- JWT tokens pour l'authentification
- Service key Supabase côté serveur uniquement
- Validation des entrées

### 5. Étapes d'implémentation
1. ✅ Créer les Netlify Functions
2. ✅ Configurer les redirects dans netlify.toml
3. ✅ Mettre à jour le CMS client pour utiliser /.netlify/functions
4. ✅ Tester l'authentification
5. ✅ Tester la persistance des données

## Avantages de cette approche
- ✅ Fonctionne avec Supabase
- ✅ Sécurisé (pas de CORS)
- ✅ Persistance des données
- ✅ Compatible avec l'éditeur existant
- ✅ Plus simple que les Edge Functions
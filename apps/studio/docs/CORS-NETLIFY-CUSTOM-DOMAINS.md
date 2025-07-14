# Configuration CORS pour Netlify avec Domaines Personnalisés

## 📋 Vue d'ensemble

CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité qui contrôle l'accès aux ressources entre différents domaines. Avec des domaines personnalisés, la configuration CORS devient cruciale.

## 🔧 Méthodes de Configuration

### 1. Configuration via `netlify.toml`

```toml
# Configuration de base pour tous les domaines
[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"

# Configuration spécifique pour l'API
[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
    Access-Control-Max-Age = "86400"
```

### 2. Configuration sécurisée avec domaines spécifiques

⚠️ **Pour la production, évitez `*` et spécifiez les domaines autorisés :**

```toml
# Domaine principal
[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "https://monentreprise.com"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"

# Sous-domaine
[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "https://app.monentreprise.com"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
```

### 3. Configuration dans les Netlify Functions

Pour les fonctions serverless, ajoutez les headers CORS dans chaque réponse :

```javascript
// Format moderne (ES modules)
export default async (req, context) => {
  // Headers CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // Gérer preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  // Votre logique ici
  return new Response(JSON.stringify({ data: 'votre réponse' }), {
    status: 200,
    headers: corsHeaders
  });
};

// Format CommonJS (exports.handler)
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // Gérer preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Votre logique
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ data: 'votre réponse' })
  };
};
```

### 4. Fichier `_headers` (Alternative)

Créez un fichier `_headers` à la racine :

```
/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization

/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
  Access-Control-Max-Age: 86400
```

## 🔐 Configuration pour Multi-domaines

### Solution 1 : Middleware dynamique dans les Functions

```javascript
export default async (req, context) => {
  const allowedOrigins = [
    'https://monentreprise.com',
    'https://www.monentreprise.com',
    'https://app.monentreprise.com',
    'https://test-site.netlify.app'
  ];
  
  const origin = req.headers.get('origin');
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
  };
  
  // Reste de votre logique...
};
```

### Solution 2 : Redirects avec Proxy

```toml
# Proxy API vers un domaine unique
[[redirects]]
  from = "/api/*"
  to = "https://api.monentreprise.com/:splat"
  status = 200
  force = true
  headers = {X-From = "Netlify"}
```

## 🚀 Solution Recommandée pour AWEMA

Pour le CMS AWEMA avec domaines personnalisés :

### 1. Configuration netlify.toml optimale

```toml
[build]
  publish = "."
  functions = "netlify/functions"

# Headers globaux
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

# CORS pour l'API CMS
[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization, X-Site-ID"
    Access-Control-Max-Age = "86400"

# Redirects pour les functions
[[redirects]]
  from = "/api/cms/*"
  to = "/.netlify/functions/cms-:splat"
  status = 200
  force = true
```

### 2. Template de Function avec CORS

```javascript
// netlify/functions/cms-api.js
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Site-ID',
  'Access-Control-Max-Age': '86400'
};

export default async (req, context) => {
  // OPTIONS pour preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    // Votre logique API
    const response = await handleAPIRequest(req);
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
};
```

## ⚡ Alternative : Supabase Direct

Si les Netlify Functions posent problème, utilisez directement Supabase :

### 1. Configuration Supabase CORS

Dans Supabase Dashboard > Settings > API :
- Ajoutez vos domaines autorisés
- Ou utilisez `*` pour le développement

### 2. Client-side avec Supabase

```javascript
// Dans le CMS client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://votre-projet.supabase.co',
  'votre-anon-key'
);

// Pas de problème CORS car Supabase gère tout
async function loadContent() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('*')
    .eq('site_id', siteId);
}
```

## 🎯 Recommandations Finales

1. **Développement** : Utilisez `Access-Control-Allow-Origin: *`
2. **Production** : Spécifiez les domaines exacts
3. **Domaines multiples** : Utilisez une logique dynamique
4. **Sécurité** : Toujours valider les origins côté serveur
5. **Alternative** : Si trop complexe, utilisez Supabase directement

## 📝 Checklist de Déploiement

- [ ] Configurer `netlify.toml` avec les headers CORS
- [ ] Ajouter CORS dans toutes les Netlify Functions
- [ ] Gérer les requêtes OPTIONS (preflight)
- [ ] Tester avec différents domaines
- [ ] Vérifier la console pour les erreurs CORS
- [ ] Configurer Supabase pour accepter les domaines

Cette configuration garantit que votre CMS fonctionnera avec n'importe quel domaine personnalisé sans problèmes de CORS.
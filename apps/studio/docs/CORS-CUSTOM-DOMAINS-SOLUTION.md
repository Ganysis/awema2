# Solutions CORS pour Domaines Personnalisés

## 🚀 Solution 1 : Proxy API Universal (RECOMMANDÉ)

Créez un endpoint API universel qui accepte toutes les origines :

```typescript
// apps/studio/app/api/cms-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Créer le client Supabase avec la clé service (côté serveur)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Clé service pour bypass RLS
);

export async function POST(request: NextRequest) {
  // Headers CORS permissifs
  const headers = {
    'Access-Control-Allow-Origin': '*', // Accepte TOUTES les origines
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Gérer preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    const { action, ...params } = await request.json();

    let result;
    switch (action) {
      case 'login':
        // Vérifier le mot de passe
        const { data: authData } = await supabase.rpc('verify_user_password', {
          user_email: params.email,
          user_password: params.password,
          user_site_id: params.site_id
        });
        result = authData;
        break;

      case 'getContent':
        const { data: content } = await supabase
          .from('cms_content')
          .select('*')
          .eq('site_id', params.site_id);
        result = content;
        break;

      case 'updateContent':
        const { data: updated } = await supabase
          .from('cms_content')
          .update(params.data)
          .eq('id', params.id);
        result = updated;
        break;

      // Ajouter d'autres actions selon les besoins
      default:
        throw new Error(`Action inconnue: ${action}`);
    }

    return NextResponse.json({ success: true, data: result }, { headers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400, headers }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

## 🔧 Solution 2 : Modifier le CMS pour utiliser le Proxy

```javascript
// admin/cms.js - Modifier pour utiliser le proxy
class AwemaCMS {
  constructor(config) {
    this.config = config;
    // Utiliser le proxy au lieu de Supabase direct
    this.proxyUrl = 'https://studio.awema.fr/api/cms-proxy';
  }

  async makeRequest(action, params) {
    try {
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          ...params,
          site_id: this.config.SITE_ID
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (error) {
      console.error(`Erreur ${action}:`, error);
      throw error;
    }
  }

  async login(email, password) {
    return this.makeRequest('login', { email, password });
  }

  async getContent() {
    return this.makeRequest('getContent', {});
  }

  async updateContent(id, data) {
    return this.makeRequest('updateContent', { id, data });
  }
}
```

## 🎯 Solution 3 : Configuration Dynamique CORS

Créez une fonction qui ajoute automatiquement le domaine lors du déploiement :

```typescript
// lib/services/netlify-deploy.service.ts
async configureDomainCORS(customDomain: string) {
  // Option A : Stocker dans une table Supabase
  await supabase.from('allowed_domains').insert({
    domain: customDomain,
    created_at: new Date()
  });

  // Option B : Utiliser Netlify Functions comme proxy
  // Déployer une fonction Netlify qui fait le relais
  const netlifyFunction = `
    exports.handler = async (event) => {
      const response = await fetch('${SUPABASE_URL}/rest/v1/..., {
        headers: {
          'apikey': '${SUPABASE_ANON_KEY}',
          ...JSON.parse(event.headers)
        },
        body: event.body
      });
      
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: await response.text()
      };
    };
  `;
}
```

## 🌟 Solution 4 : Architecture Sans CORS

Modifiez l'architecture pour éviter les appels cross-origin :

```javascript
// Générer le CMS avec des endpoints locaux
const cmsConfig = {
  // Au lieu de pointer vers Supabase directement
  API_URL: '/api/cms', // Endpoint local
  
  // Le site déployé aura ses propres API routes
  endpoints: {
    login: '/api/cms/login',
    content: '/api/cms/content',
    media: '/api/cms/media'
  }
};

// Déployer des fonctions Netlify avec le site
const netlifyFunctions = {
  'api/cms/login.js': generateLoginFunction(siteId),
  'api/cms/content.js': generateContentFunction(siteId),
  'api/cms/media.js': generateMediaFunction(siteId)
};
```

## 💡 RECOMMANDATION FINALE

**Pour votre cas, je recommande la Solution 1 (Proxy API) :**

1. **Hébergez un seul endpoint proxy** sur votre domaine principal (ex: studio.awema.fr)
2. **Configurez CORS sur ce domaine uniquement** : `https://studio.awema.fr`
3. **Tous les CMS passent par ce proxy** = pas de problème CORS
4. **Avantages** :
   - Une seule configuration CORS
   - Fonctionne avec n'importe quel domaine
   - Contrôle centralisé
   - Possibilité d'ajouter cache, rate limiting, etc.

## Implementation Rapide

1. Déployez le proxy API sur votre serveur principal
2. Modifiez le CMS généré pour utiliser ce proxy
3. Plus de problèmes CORS, même avec des domaines personnalisés !

```javascript
// Configuration dans le CMS exporté
window.CMS_CONFIG = {
  // Au lieu de l'URL Supabase directe
  API_URL: 'https://studio.awema.fr/api/cms-proxy',
  SITE_ID: '12c462ff-f73b-4f7a-bc41-16afafbff10a'
};
```
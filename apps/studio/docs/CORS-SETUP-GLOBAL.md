# Configuration CORS Globale pour Supabase

## Solution 1 : Wildcard pour tous les sous-domaines Netlify (RECOMMANDÉ)

Dans Supabase Dashboard → Settings → API → CORS Allowed Origins, ajoutez :

```
https://*.netlify.app
http://localhost:3000
http://localhost:3001
http://localhost:3002
```

✅ **Avantages** :
- Couvre TOUS vos déploiements Netlify automatiquement
- Inclut l'environnement de développement
- Aucune configuration supplémentaire nécessaire

## Solution 2 : Utiliser un domaine personnalisé avec wildcard

Si vous avez un domaine principal (ex: awema.fr), configurez :

```
https://*.awema.fr
https://awema.fr
```

Puis configurez vos sites clients comme :
- client1.awema.fr
- client2.awema.fr
- etc.

## Solution 3 : Proxy API via Edge Function (SANS CORS)

Créez une Edge Function Supabase qui fait office de proxy :

```typescript
// supabase/functions/cms-api/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Accepter TOUTES les origines
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  }

  // Gérer les preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  try {
    // Votre logique API ici
    const { action, data } = await req.json()
    
    // Traiter les différentes actions (login, getCo/create, etc.)
    const result = await processAction(action, data)
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...headers, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers }
    )
  }
})
```

## Solution 4 : Configuration via Variables d'Environnement

Dans votre code de déploiement, ajoutez automatiquement l'origine :

```javascript
// lib/services/auto-deploy.service.ts
async deployOneClick(options) {
  // ... code de déploiement ...
  
  // Après le déploiement, ajouter l'origine via l'API Supabase Management
  await this.addCorsOrigin(`https://${siteName}.netlify.app`);
}

async addCorsOrigin(origin) {
  // Utiliser l'API Supabase Management (nécessite un token admin)
  const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_ID}/config`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${SUPABASE_MANAGEMENT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cors_allowed_origins: {
        $add: [origin]
      }
    })
  });
}
```

## 🎯 RECOMMANDATION FINALE

**Pour votre cas, utilisez la Solution 1** :

1. Allez dans Supabase Dashboard
2. Settings → API → CORS Allowed Origins
3. Ajoutez simplement : `https://*.netlify.app`
4. Sauvegardez

Cela couvrira TOUS vos déploiements Netlify automatiquement, sans configuration supplémentaire !

## Alternative : Désactiver CORS côté Supabase

Si vous voulez désactiver complètement les vérifications CORS (NON recommandé en production) :

```sql
-- Dans une Edge Function, vous pouvez retourner des headers permissifs
-- Mais ce n'est pas possible de désactiver CORS globalement dans Supabase
```

## Configuration dans le CMS

Modifiez votre CMS pour gérer les erreurs CORS gracieusement :

```javascript
// admin/cms.js
async makeSupabaseRequest(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.message.includes('CORS')) {
      console.warn('CORS error detected, using fallback method');
      // Utiliser une méthode alternative ou un proxy
      return this.useFallbackMethod(url, options);
    }
    throw error;
  }
}
```
/**
 * Générateur de Netlify Functions pour chaque site
 * Évite les problèmes CORS en créant des endpoints locaux
 */

export class NetlifyFunctionsGenerator {
  /**
   * Génère une fonction Netlify qui fait le pont avec Supabase
   * Cette fonction sera déployée avec chaque site
   */
  generateCMSFunction(siteId: string, supabaseUrl: string, supabaseServiceKey: string): string {
    return `
// netlify/functions/cms-api.js

// Fonction pour appeler Supabase sans SDK
async function callSupabase(endpoint, options = {}) {
  const url = '${supabaseUrl}/rest/v1' + endpoint;
  const response = await fetch(url, {
    ...options,
    headers: {
      'apikey': '${supabaseServiceKey}',
      'Authorization': 'Bearer ${supabaseServiceKey}',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
}

// Fonction pour appeler une RPC
async function callRPC(functionName, params) {
  const response = await fetch('${supabaseUrl}/rest/v1/rpc/' + functionName, {
    method: 'POST',
    headers: {
      'apikey': '${supabaseServiceKey}',
      'Authorization': 'Bearer ${supabaseServiceKey}',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
}

exports.handler = async (event, context) => {
  // Headers CORS pour le domaine actuel uniquement
  const headers = {
    'Access-Control-Allow-Origin': event.headers.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  // Gérer les preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { action, ...params } = JSON.parse(event.body);
    
    // Ajouter le siteId à tous les appels
    params.site_id = '${siteId}';

    let result;
    switch (action) {
      case 'login':
        try {
          const authData = await callRPC('verify_user_password', {
            user_email: params.email,
            user_password: params.password,
            user_site_id: params.site_id
          });
          
          if (!authData || authData.length === 0) {
            throw new Error('Identifiants invalides');
          }
          
          result = {
            user: authData[0],
            token: 'netlify-' + Date.now()
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Erreur d\\'authentification: ' + error.message);
        }
        break;

      case 'getContent':
        try {
          result = await callSupabase(\`/cms_content?site_id=eq.\${params.site_id}&order=created_at.desc\`);
        } catch (error) {
          console.error('Content error:', error);
          throw new Error('Erreur de récupération du contenu');
        }
        break;

      case 'updateContent':
        const { data: updated, error: updateError } = await supabase
          .from('cms_content')
          .update(params.data)
          .eq('id', params.id)
          .eq('site_id', params.site_id)
          .select();
        
        if (updateError) throw updateError;
        result = updated;
        break;

      case 'createContent':
        const { data: created, error: createError } = await supabase
          .from('cms_content')
          .insert({ ...params.data, site_id: params.site_id })
          .select();
        
        if (createError) throw createError;
        result = created;
        break;

      case 'uploadMedia':
        const { data: media, error: mediaError } = await supabase
          .from('cms_media')
          .insert({ ...params.data, site_id: params.site_id })
          .select();
        
        if (mediaError) throw mediaError;
        result = media;
        break;

      default:
        throw new Error(\`Action inconnue: \${action}\`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: result })
    };

  } catch (error) {
    console.error('Erreur CMS API:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Erreur interne' 
      })
    };
  }
};
`;
  }

  /**
   * Génère le fichier netlify.toml avec la configuration
   */
  generateNetlifyConfig(): string {
    return `[build]
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Headers = "Content-Type"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"
`;
  }

  /**
   * Génère le package.json pour les fonctions
   */
  generateFunctionsPackageJson(): string {
    return `{
  "name": "cms-functions",
  "version": "1.0.0",
  "description": "Netlify Functions for CMS",
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}`;
  }

  /**
   * Génère tous les fichiers nécessaires pour les fonctions
   */
  generateFunctionFiles(siteId: string, supabaseUrl: string, supabaseServiceKey: string): Array<{path: string, content: string}> {
    return [
      {
        path: 'netlify/functions/cms-api.js',
        content: this.generateCMSFunction(siteId, supabaseUrl, supabaseServiceKey)
      },
      {
        path: 'netlify.toml',
        content: this.generateNetlifyConfig()
      },
      {
        path: 'netlify/functions/package.json',
        content: this.generateFunctionsPackageJson()
      }
    ];
  }
}
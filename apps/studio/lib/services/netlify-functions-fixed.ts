/**
 * Générateur de Netlify Functions classiques (pas Edge)
 * Plus simple et plus fiable pour l'authentification
 */

export class NetlifyFunctionsFixed {
  generateNetlifyToml(): string {
    return `[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/cms/*"
  to = "/.netlify/functions/cms-api/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"`;
  }

  generateCMSFunction(siteId: string, supabaseUrl: string, supabaseKey: string): string {
    return `// netlify/functions/cms-api.js
exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const path = event.path.replace('/.netlify/functions/cms-api/', '');
  
  try {
    // Simple router
    if (path === 'auth/login' && event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { email, password } = body;
      
      // Auth simple pour les tests
      if (email === 'admin@admin.fr' && password === 'admin') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            session: {
              user: {
                id: 'test-user-1',
                email: email,
                role: 'admin',
                site_id: '${siteId}'
              },
              token: Date.now().toString(36) + Math.random().toString(36),
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }
          })
        };
      }
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // Content endpoint
    if (path === 'content') {
      if (event.httpMethod === 'GET') {
        // Return stored content or default
        const content = global.cmsContent || [{
          id: 'home-page',
          page_title: 'Accueil',
          page_slug: '/',
          blocks: [],
          seo: { title: 'Bienvenue', description: 'Site AWEMA' }
        }];
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(content)
        };
      }
      
      if (event.httpMethod === 'PUT') {
        const body = JSON.parse(event.body || '{}');
        // Store in memory (will be lost on redeploy)
        global.cmsContent = global.cmsContent || [];
        const index = global.cmsContent.findIndex(p => p.id === body.id);
        if (index >= 0) {
          global.cmsContent[index] = { ...global.cmsContent[index], ...body.data };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        };
      }
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};`;
  }

  generatePackageJson(): string {
    return `{
  "name": "cms-functions",
  "version": "1.0.0",
  "description": "CMS API Functions",
  "dependencies": {}
}`;
  }
}
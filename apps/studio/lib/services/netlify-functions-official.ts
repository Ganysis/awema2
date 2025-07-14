/**
 * Générateur de Netlify Functions selon la documentation officielle
 */

export class NetlifyFunctionsOfficial {
  generateNetlifyToml(): string {
    return `[build]
  publish = "."

# API Routes
[[redirects]]
  from = "/api/test"
  to = "/.netlify/functions/test"
  status = 200

[[redirects]]
  from = "/api/cms/auth/login"
  to = "/.netlify/functions/cms-auth"
  status = 200

[[redirects]]
  from = "/api/cms/content"
  to = "/.netlify/functions/cms-content"
  status = 200`;
  }

  generateTestFunction(): { path: string; content: string } {
    return {
      path: 'netlify/functions/test.mts',
      content: `import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(JSON.stringify({
    message: 'Test function works!',
    timestamp: new Date().toISOString(),
    path: new URL(req.url).pathname,
    method: req.method
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};`
    };
  }

  generateAuthFunction(siteId: string): { path: string; content: string } {
    return {
      path: 'netlify/functions/cms-auth.mts',
      content: `import type { Context } from "@netlify/functions";

interface LoginBody {
  email: string;
  password: string;
}

export default async (req: Request, context: Context) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const body = await req.json() as LoginBody;
    const { email, password } = body;
    
    // Simple auth pour test
    if (email === 'admin@admin.fr' && password === 'admin') {
      return new Response(JSON.stringify({
        success: true,
        session: {
          user: {
            id: 'test-admin',
            email: email,
            site_id: '${siteId}'
          },
          token: 'test-token-' + Date.now()
        }
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};`
    };
  }

  generateContentFunction(siteId: string): { path: string; content: string } {
    return {
      path: 'netlify/functions/cms-content.mts',
      content: `import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (req.method === 'GET') {
    // Retourner des données de test
    return new Response(JSON.stringify([{
      id: 'home-page',
      page_title: 'Accueil',
      page_slug: '/',
      blocks: [],
      site_id: '${siteId}'
    }]), {
      status: 200,
      headers
    });
  }

  if (req.method === 'PUT') {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers
  });
};`
    };
  }

  // Package.json pour les types TypeScript
  generatePackageJson(): string {
    return `{
  "name": "cms-functions",
  "version": "1.0.0",
  "type": "module",
  "devDependencies": {
    "@netlify/functions": "^2.4.0",
    "@types/node": "^20.0.0"
  }
}`;
  }
}
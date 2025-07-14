/**
 * Générateur de Netlify Functions en TypeScript
 */

export class NetlifyFunctionsTypeScript {
  generateNetlifyToml(): string {
    return `[build]
  publish = "."
  functions = "functions"

[functions]
  node_bundler = "esbuild"`;
  }

  generateTestFunction(): string {
    // Extension .mts pour TypeScript moderne
    return {
      filename: 'test.mts',
      content: `import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(JSON.stringify({
    message: 'TypeScript function works!',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const config = {
  path: "/api/test"
};`
    };
  }

  generateAuthFunction(siteId: string): string {
    return {
      filename: 'auth.mts',
      content: `import type { Context } from "@netlify/functions";

interface LoginBody {
  email: string;
  password: string;
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/cms/auth/login"
};`
    };
  }

  generateContentFunction(siteId: string): string {
    return {
      filename: 'content.mts',
      content: `import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
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
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (req.method === 'PUT') {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = {
  path: "/api/cms/content"
};`
    };
  }

  // Package.json pour les types
  generatePackageJson(): string {
    return `{
  "name": "netlify-functions",
  "version": "1.0.0",
  "type": "module",
  "devDependencies": {
    "@netlify/functions": "^2.4.0"
  }
}`;
  }
}
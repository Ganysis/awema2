/**
 * Générateur de Netlify Functions en CommonJS (format le plus compatible)
 */

export class NetlifyFunctionsCommonJS {
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

  generateTestFunction(): string {
    return `const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify({
      message: 'Test function works!',
      timestamp: new Date().toISOString(),
      path: event.path,
      method: event.httpMethod
    })
  };
};

module.exports = { handler };`;
  }

  generateAuthFunction(siteId: string): string {
    return `const handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email, password } = body;
    
    // Simple auth pour test
    if (email === 'admin@admin.fr' && password === 'admin') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          session: {
            user: {
              id: 'test-admin',
              email: email,
              site_id: '${siteId}'
            },
            token: 'test-token-' + Date.now()
          }
        })
      };
    }
    
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid credentials' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};

module.exports = { handler };`;
  }

  generateContentFunction(siteId: string): string {
    return `const handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod === 'GET') {
    // Retourner des données de test
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([{
        id: 'home-page',
        page_title: 'Accueil',
        page_slug: '/',
        blocks: [],
        site_id: '${siteId}'
      }])
    };
  }

  if (event.httpMethod === 'PUT') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

module.exports = { handler };`;
  }
}
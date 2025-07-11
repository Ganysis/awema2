/**
 * Version simplifiée de la Netlify Function pour tests
 */

export class NetlifyFunctionsSimple {
  generateSimpleFunction(siteId: string, adminEmail: string, adminPassword: string): string {
    return `
// netlify/functions/cms-api.js
exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Gérer preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { action, ...params } = JSON.parse(event.body || '{}');
    
    let result;
    
    switch (action) {
      case 'login':
        // Login en dur pour test
        if (params.email === '${adminEmail}' && params.password === '${adminPassword}') {
          result = {
            user: {
              id: '${siteId}',
              email: '${adminEmail}',
              role: 'admin',
              site_id: '${siteId}',
              full_name: 'Administrateur'
            },
            token: 'test-token-' + Date.now()
          };
        } else {
          throw new Error('Identifiants invalides');
        }
        break;
        
      case 'test':
        result = { status: 'ok', message: 'Function works!' };
        break;
        
      default:
        throw new Error('Action non supportée: ' + action);
    }

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data: result })
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};`;
  }
}
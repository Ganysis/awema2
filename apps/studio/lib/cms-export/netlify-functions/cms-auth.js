// Netlify Function for CMS Authentication
// This will be deployed as /.netlify/functions/cms-auth

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // Get credentials from environment variables
    const ADMIN_EMAIL = process.env.CMS_ADMIN_EMAIL || 'admin@site.com';
    const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'admin123';

    // Simple authentication (in production, use proper hashing)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a simple JWT-like token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          token,
          message: 'Connexion réussie'
        })
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Identifiants incorrects' 
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur serveur',
        error: error.message 
      })
    };
  }
};
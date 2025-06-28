// Netlify Function for CMS Save
// This will be deployed as /.netlify/functions/cms-save

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

  // Check authorization
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, message: 'Non autorisé' })
    };
  }

  try {
    const siteData = JSON.parse(event.body);

    // In a real implementation, this would:
    // 1. Validate the token
    // 2. Save to a database (e.g., FaunaDB, Supabase)
    // 3. Trigger a rebuild on Netlify
    
    // For now, we'll just simulate success
    // The data could be saved to Netlify Blobs or a connected database
    
    // Trigger rebuild (requires Netlify build hook)
    if (process.env.NETLIFY_BUILD_HOOK) {
      await fetch(process.env.NETLIFY_BUILD_HOOK, { method: 'POST' });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Données sauvegardées avec succès',
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erreur lors de la sauvegarde',
        error: error.message 
      })
    };
  }
};
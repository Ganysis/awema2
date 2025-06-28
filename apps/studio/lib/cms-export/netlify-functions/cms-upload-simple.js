// Fonction Netlify simplifiée pour l'upload d'images via base64
exports.handler = async (event, context) => {
  // Gérer CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Autoriser uniquement les requêtes POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Vérifier l'authentification
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Parser le body JSON
    const body = JSON.parse(event.body);
    const { fileName, fileData, mimeType } = body;

    if (!fileName || !fileData || !mimeType) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing required fields: fileName, fileData, mimeType' })
      };
    }

    // Valider le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(mimeType)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Invalid file type',
          allowed: allowedTypes 
        })
      };
    }

    // Décoder les données base64
    const buffer = Buffer.from(fileData.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Valider la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (buffer.length > maxSize) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'File too large',
          maxSize: '5MB'
        })
      };
    }

    // Générer un nom unique pour le fichier
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = fileName.split('.').pop();
    const uniqueName = `${timestamp}-${randomStr}.${extension}`;
    const imagePath = `/images/${uniqueName}`;

    // Stocker l'image en base64 dans l'environnement
    // Note: Dans une vraie implémentation, utiliser Netlify Blobs ou un service externe
    
    // Pour le moment, on retourne juste les métadonnées
    // L'image sera stockée localement dans le navigateur via localStorage
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: true,
        data: {
          id: `img-${timestamp}-${randomStr}`,
          path: imagePath,
          url: imagePath,
          name: fileName,
          size: buffer.length,
          mimeType: mimeType,
          base64: fileData, // Renvoyer le base64 pour stockage local
          metadata: {
            originalName: fileName,
            uploadedAt: new Date().toISOString(),
            width: null,
            height: null
          }
        }
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Upload failed',
        message: error.message 
      })
    };
  }
};
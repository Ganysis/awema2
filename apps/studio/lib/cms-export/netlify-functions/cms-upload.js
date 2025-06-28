// Fonction Netlify pour l'upload d'images
exports.handler = async (event, context) => {
  // Autoriser uniquement les requêtes POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Vérifier l'authentification
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Parser le body multipart
    const contentType = event.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Content must be multipart/form-data' })
      };
    }

    // Pour Netlify, nous devons utiliser le body en base64
    if (!event.isBase64Encoded) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Body must be base64 encoded' })
      };
    }

    // Décoder le body base64
    const buffer = Buffer.from(event.body, 'base64');
    
    // Parser le multipart (version simplifiée)
    // Dans une vraie implémentation, utiliser une librairie comme busboy ou multiparty
    const boundary = contentType.split('boundary=')[1];
    if (!boundary) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No boundary found in content-type' })
      };
    }

    // Extraire le fichier du multipart
    const parts = buffer.toString('binary').split(`--${boundary}`);
    let fileData = null;
    let fileName = null;
    let mimeType = null;

    for (const part of parts) {
      if (part.includes('filename=')) {
        // Extraire le nom du fichier
        const fileNameMatch = part.match(/filename="(.+?)"/);
        if (fileNameMatch) {
          fileName = fileNameMatch[1];
        }

        // Extraire le type MIME
        const mimeMatch = part.match(/Content-Type: (.+?)\r\n/);
        if (mimeMatch) {
          mimeType = mimeMatch[1];
        }

        // Extraire les données du fichier (après les headers)
        const dataStart = part.indexOf('\r\n\r\n') + 4;
        const dataEnd = part.lastIndexOf('\r\n');
        if (dataStart > 4 && dataEnd > dataStart) {
          fileData = Buffer.from(part.substring(dataStart, dataEnd), 'binary');
        }
      }
    }

    if (!fileData || !fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file found in request' })
      };
    }

    // Valider le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(mimeType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Invalid file type',
          allowed: allowedTypes 
        })
      };
    }

    // Générer un nom unique pour le fichier
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = fileName.split('.').pop();
    const uniqueName = `${timestamp}-${randomStr}.${extension}`;
    const imagePath = `/images/${uniqueName}`;

    // Pour une vraie implémentation, il faudrait :
    // 1. Sauvegarder l'image dans un service de stockage (Netlify Blobs, S3, etc.)
    // 2. Optimiser l'image (compression, conversion WebP, etc.)
    // 3. Générer des thumbnails
    
    // Pour l'instant, on simule une sauvegarde réussie
    // Dans un déploiement réel, il faudrait utiliser Netlify Blobs ou un autre service
    
    // Note: Netlify Functions ne peuvent pas écrire directement dans le système de fichiers
    // Il faut utiliser un service externe ou Netlify Blobs

    // Retourner les informations de l'image uploadée
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
          url: imagePath, // URL relative pour le moment
          name: fileName,
          size: fileData.length,
          mimeType: mimeType,
          metadata: {
            originalName: fileName,
            uploadedAt: new Date().toISOString(),
            width: null, // À implémenter avec sharp ou jimp
            height: null
          }
        }
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Upload failed',
        message: error.message 
      })
    };
  }
};

// Gérer les requêtes OPTIONS pour CORS
exports.handler = async (event, context) => {
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

  return exports.handler(event, context);
};
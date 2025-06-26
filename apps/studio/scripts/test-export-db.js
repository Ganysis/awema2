const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testExportWithRealProject() {
  try {
    console.log('🔍 Recherche d\'un projet dans la base de données...');
    
    // Récupérer le premier projet
    const project = await prisma.project.findFirst({
      where: {
        data: {
          not: null
        }
      }
    });
    
    if (!project) {
      console.log('❌ Aucun projet trouvé dans la base de données');
      console.log('💡 Créez d\'abord un projet via l\'interface');
      return;
    }
    
    console.log('✅ Projet trouvé:', {
      id: project.id,
      name: project.name,
      hasData: !!project.data
    });
    
    // Tester l'export avec ce projet
    console.log('\n📤 Test de l\'export ZIP...');
    
    const response = await fetch('http://localhost:3000/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: project.id
      })
    });
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      
      if (contentType === 'application/zip') {
        const buffer = await response.arrayBuffer();
        const sizeKB = (buffer.byteLength / 1024).toFixed(2);
        
        console.log('✅ Export réussi !');
        console.log(`📦 Taille du ZIP: ${sizeKB} KB`);
        console.log(`📁 Nom du fichier: ${project.slug}-export.zip`);
        
        // Sauvegarder le ZIP pour test
        const fs = require('fs');
        const path = require('path');
        const outputPath = path.join(__dirname, `test-${project.slug}-export.zip`);
        
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`💾 ZIP sauvegardé dans: ${outputPath}`);
        
      } else {
        console.log('❌ Type de contenu inattendu:', contentType);
        const text = await response.text();
        console.log('Réponse:', text);
      }
    } else {
      console.log('❌ Erreur HTTP:', response.status);
      const error = await response.text();
      console.log('Message:', error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Utiliser le module http natif de Node.js
const http = require('http');

function fetch(url, options) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    const req = http.request(reqOptions, (res) => {
      let data = [];
      
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          headers: {
            get: (name) => res.headers[name.toLowerCase()]
          },
          arrayBuffer: () => Promise.resolve(buffer),
          text: () => Promise.resolve(buffer.toString())
        });
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

testExportWithRealProject();
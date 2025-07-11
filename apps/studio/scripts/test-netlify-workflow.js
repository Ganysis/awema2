#!/usr/bin/env node

/**
 * Test du workflow complet Netlify
 */

console.log('🔄 Test workflow complet Netlify...\n');

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Charger les variables d'environnement
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

async function testWorkflow() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }
    
    const { NetlifyAPI } = await import('@netlify/api');
    const client = new NetlifyAPI(process.env.NETLIFY_AUTH_TOKEN);
    
    const timestamp = Date.now();
    const siteName = `test-workflow-${timestamp}`;
    
    console.log('🆕 Test avec site:', siteName);
    
    // 1. Créer le site
    console.log('\n1️⃣ Création du site...');
    const site = await client.createSite({
      body: { name: siteName }
    });
    console.log('✅ Site créé:', site.id);
    
    // 2. Préparer les fichiers
    console.log('\n2️⃣ Préparation des fichiers...');
    const files = {
      'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>Test Workflow ${timestamp}</title>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: Arial; 
            padding: 40px; 
            text-align: center;
            background: #f0f0f0;
        }
        .success {
            background: white;
            padding: 40px;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #4CAF50; }
    </style>
</head>
<body>
    <div class="success">
        <h1>✅ Déploiement Réussi!</h1>
        <p>Site: ${siteName}</p>
        <p>Timestamp: ${timestamp}</p>
        <p>Date: ${new Date().toISOString()}</p>
    </div>
</body>
</html>`,
      'test.txt': 'Fichier de test',
      'data.json': JSON.stringify({ test: true, timestamp }, null, 2)
    };
    
    console.log('📄 Fichiers préparés:', Object.keys(files).join(', '));
    
    // 3. Créer le déploiement avec files directement
    console.log('\n3️⃣ Création du déploiement...');
    
    // Calculer les SHA pour chaque fichier
    const fileShas = {};
    Object.entries(files).forEach(([path, content]) => {
      const sha = crypto.createHash('sha1').update(content).digest('hex');
      fileShas[path] = sha;
    });
    
    console.log('🔐 SHAs calculés:', fileShas);
    
    try {
      // Méthode 1: createSiteDeploy avec files et fonctions requises
      const deploy = await client.createSiteDeploy({
        site_id: site.id,
        body: {
          files: files,
          async: false, // Déploiement synchrone
          functions: {} // Pas de fonctions
        }
      });
      
      console.log('✅ Déploiement créé:', deploy.id);
      console.log('   État:', deploy.state);
      console.log('   Requis:', deploy.required || 'Aucun');
      console.log('   Requis functions:', deploy.required_functions || 'Aucune');
      
      // Si des fichiers sont requis, les uploader
      if (deploy.required && deploy.required.length > 0) {
        console.log('\n4️⃣ Upload des fichiers requis...');
        for (const sha of deploy.required) {
          // Trouver le fichier correspondant au SHA
          const filePath = Object.entries(fileShas).find(([_, s]) => s === sha)?.[0];
          if (filePath && files[filePath]) {
            console.log(`   Upload ${filePath} (${sha})...`);
            try {
              await client.uploadDeployFile({
                deploy_id: deploy.id,
                path: filePath,
                body: files[filePath]
              });
              console.log(`   ✅ ${filePath} uploadé`);
            } catch (uploadError) {
              console.error(`   ❌ Erreur upload ${filePath}:`, uploadError.message);
            }
          }
        }
      }
      
    } catch (deployError) {
      console.error('❌ Erreur méthode 1:', deployError.message);
      
      // Méthode 2: Déploiement en 2 étapes
      console.log('\n🔄 Tentative méthode 2: déploiement en 2 étapes...');
      
      // Étape 1: Créer un déploiement vide
      const deploy2 = await client.createSiteDeploy({
        site_id: site.id,
        body: {}
      });
      
      console.log('📦 Déploiement vide créé:', deploy2.id);
      
      // Étape 2: Uploader chaque fichier
      for (const [filePath, content] of Object.entries(files)) {
        console.log(`   Upload ${filePath}...`);
        try {
          await client.uploadDeployFile({
            deploy_id: deploy2.id,
            path: filePath,
            body: Buffer.from(content)
          });
          console.log(`   ✅ ${filePath} uploadé`);
        } catch (uploadError) {
          console.error(`   ❌ Erreur:`, uploadError.message);
        }
      }
    }
    
    // 5. Vérifier le déploiement
    console.log('\n5️⃣ Vérification après 15 secondes...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Récupérer les déploiements du site
    const deploys = await client.listSiteDeploys({ site_id: site.id });
    console.log(`\n📋 ${deploys.length} déploiements trouvés:`);
    deploys.slice(0, 3).forEach(d => {
      console.log(`   - ${d.id}: ${d.state} (${new Date(d.created_at).toLocaleString()})`);
    });
    
    // Vérifier le site
    const finalSite = await client.getSite({ site_id: site.id });
    console.log('\n🌐 État final du site:');
    console.log('   État:', finalSite.state);
    console.log('   URL:', finalSite.url);
    console.log('   SSL:', finalSite.ssl_url);
    console.log('   Dernier déploiement:', finalSite.published_deploy?.id);
    
    // Test d'accès
    console.log('\n6️⃣ Test d\'accès final...');
    const response = await fetch(finalSite.ssl_url || finalSite.url);
    console.log('   Status:', response.status);
    
    if (response.ok) {
      const html = await response.text();
      console.log('   ✅ Succès! HTML reçu:', html.length, 'caractères');
      console.log('   Contenu correct:', html.includes(siteName) ? 'OUI' : 'NON');
      
      // Sauvegarder pour debug
      fs.writeFileSync('test-output-workflow.html', html);
      console.log('   HTML sauvé dans test-output-workflow.html');
    } else {
      console.log('   ❌ Erreur:', response.status, response.statusText);
    }
    
  } catch (error) {
    console.error('\n❌ Erreur:', error);
    console.error('Message:', error.message);
    if (error.response?.data) {
      console.error('Response:', error.response.data);
    }
  }
}

testWorkflow();
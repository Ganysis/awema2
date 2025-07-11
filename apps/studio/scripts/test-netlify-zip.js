#!/usr/bin/env node

/**
 * Test de déploiement Netlify avec ZIP
 */

console.log('📦 Test déploiement Netlify avec ZIP...\n');

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

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

async function deployWithZip() {
  try {
    const { NetlifyAPI } = await import('@netlify/api');
    const client = new NetlifyAPI(process.env.NETLIFY_AUTH_TOKEN);
    
    const timestamp = Date.now();
    const siteName = `test-zip-${timestamp}`;
    
    console.log('🆕 Création du site:', siteName);
    
    // 1. Créer le ZIP
    const zipPath = path.join(__dirname, `${siteName}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    return new Promise((resolve, reject) => {
      output.on('close', async () => {
        console.log(`✅ ZIP créé: ${archive.pointer()} bytes`);
        
        try {
          // 2. Créer le site
          const site = await client.createSite({
            body: { name: siteName }
          });
          
          console.log('✅ Site créé:', site.id);
          console.log('   URL:', site.url);
          
          // 3. Déployer le ZIP
          console.log('\n📤 Upload du ZIP...');
          
          const zipContent = fs.readFileSync(zipPath);
          console.log('   Taille:', zipContent.length, 'bytes');
          
          // Méthode 1: Via createSiteDeploy avec le ZIP en body
          try {
            const deploy = await client.createSiteDeploy({
              site_id: site.id,
              title: 'Test deployment',
              body: zipContent,
              headers: {
                'Content-Type': 'application/zip'
              }
            });
            
            console.log('✅ Déploiement créé:', deploy.id);
            console.log('   État initial:', deploy.state);
            
            // Attendre et vérifier
            console.log('\n⏳ Attente de 10 secondes...');
            await new Promise(r => setTimeout(r, 10000));
            
            const finalDeploy = await client.getSiteDeploy({
              site_id: site.id,
              deploy_id: deploy.id
            });
            
            console.log('\n📊 État final:', finalDeploy.state);
            console.log('   URL deploy:', finalDeploy.deploy_url);
            console.log('   SSL URL:', finalDeploy.ssl_url);
            
            // Vérifier l'accès
            console.log('\n🔍 Test d\'accès...');
            const testUrl = finalDeploy.ssl_url || finalDeploy.deploy_url || site.url;
            console.log('   Test URL:', testUrl);
            
            if (typeof fetch === 'undefined') {
              global.fetch = require('node-fetch');
            }
            
            const response = await fetch(testUrl);
            console.log('   Status:', response.status);
            
            if (response.ok) {
              const html = await response.text();
              console.log('   ✅ HTML reçu:', html.length, 'caractères');
              console.log('   Titre trouvé:', html.includes('Test AWEMA Deploy') ? 'OUI' : 'NON');
            } else {
              console.log('   ❌ Erreur:', await response.text());
            }
            
          } catch (deployError) {
            console.error('❌ Erreur déploiement:', deployError.message);
            
            // Méthode 2: Via API direct
            console.log('\n🔄 Tentative méthode API direct...');
            
            const formData = new FormData();
            formData.append('file', new Blob([zipContent]), 'site.zip');
            
            const deployResponse = await fetch(
              `https://api.netlify.com/api/v1/sites/${site.id}/deploys`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`
                },
                body: formData
              }
            );
            
            if (deployResponse.ok) {
              const deploy = await deployResponse.json();
              console.log('✅ Déploiement créé via API:', deploy.id);
            } else {
              console.error('❌ Erreur API:', await deployResponse.text());
            }
          }
          
          // Nettoyer
          fs.unlinkSync(zipPath);
          console.log('\n🧹 ZIP temporaire supprimé');
          
        } catch (error) {
          console.error('❌ Erreur:', error);
          reject(error);
        }
      });
      
      archive.on('error', reject);
      
      // Ajouter les fichiers au ZIP
      archive.pipe(output);
      
      // Ajouter le dossier test-site
      const testSitePath = path.join(__dirname, '..', 'test-site');
      if (fs.existsSync(testSitePath)) {
        console.log('📁 Ajout du dossier test-site au ZIP...');
        archive.directory(testSitePath, false);
      } else {
        console.log('📄 Ajout d\'un fichier HTML simple...');
        archive.append(fs.readFileSync(path.join(__dirname, '..', 'test-site', 'index.html')), { name: 'index.html' });
      }
      
      archive.finalize();
    });
    
  } catch (error) {
    console.error('\n❌ Erreur:', error);
    console.error('Message:', error.message);
  }
}

deployWithZip();
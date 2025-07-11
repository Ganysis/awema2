#!/usr/bin/env node

/**
 * Test direct de l'API Netlify
 */

console.log('🧪 Test direct Netlify API...\n');

// Charger les variables d'environnement
const fs = require('fs');
const path = require('path');

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

async function testNetlifyDirect() {
  try {
    const { NetlifyAPI } = await import('@netlify/api');
    const client = new NetlifyAPI(process.env.NETLIFY_AUTH_TOKEN);
    
    console.log('📋 Token Netlify:', process.env.NETLIFY_AUTH_TOKEN ? '✅ Présent' : '❌ Manquant');
    
    // 1. Lister les sites existants
    console.log('\n📋 Sites existants:');
    const sites = await client.listSites();
    console.log(`   Nombre de sites: ${sites.length}`);
    
    // Afficher les 5 derniers sites
    const recentSites = sites.slice(-5);
    recentSites.forEach(site => {
      console.log(`   - ${site.name} (${site.state})`);
      console.log(`     URL: ${site.url}`);
      console.log(`     Créé: ${new Date(site.created_at).toLocaleString()}`);
    });
    
    // 2. Créer un nouveau site de test
    const timestamp = Date.now();
    const siteName = `test-direct-${timestamp}`;
    
    console.log(`\n🆕 Création du site: ${siteName}`);
    
    // HTML minimal
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Direct Netlify</title>
    <style>
      body { font-family: Arial; padding: 40px; background: #f0f0f0; }
      .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
      h1 { color: #333; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Test Direct Netlify ✅</h1>
        <p>Ce site a été déployé directement via l'API Netlify.</p>
        <p>Timestamp: ${timestamp}</p>
        <p>Date: ${new Date().toISOString()}</p>
    </div>
</body>
</html>`;

    // Créer le site
    const site = await client.createSite({
      body: {
        name: siteName
      }
    });
    
    console.log('✅ Site créé:', site.id);
    console.log('   URL temporaire:', site.url);
    
    // 3. Déployer le contenu - Méthode 1: avec files dans createSiteDeploy
    console.log('\n📦 Déploiement du contenu (méthode 1)...');
    
    try {
      const deploy = await client.createSiteDeploy({
        site_id: site.id,
        body: {
          files: {
            'index.html': htmlContent,
            'test.txt': 'Ceci est un fichier de test'
          }
        }
      });
      
      console.log('✅ Déploiement créé:', deploy.id);
      console.log('   État:', deploy.state);
      
      // Attendre un peu
      console.log('\n⏳ Attente de 5 secondes...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Vérifier le déploiement
      const deployStatus = await client.getSiteDeploy({
        site_id: site.id,
        deploy_id: deploy.id
      });
      
      console.log('📊 État du déploiement:', deployStatus.state);
      console.log('   URL:', deployStatus.deploy_url || deployStatus.url);
      
    } catch (error) {
      console.error('❌ Erreur méthode 1:', error.message);
      
      // Essayer méthode 2
      console.log('\n📦 Tentative méthode 2: ZIP...');
      
      const archiver = require('archiver');
      const archive = archiver('zip', { zlib: { level: 9 } });
      const output = fs.createWriteStream(`${siteName}.zip`);
      
      archive.pipe(output);
      archive.append(htmlContent, { name: 'index.html' });
      archive.append('Test file', { name: 'test.txt' });
      await archive.finalize();
      
      console.log('📦 ZIP créé');
      
      // Déployer le ZIP
      const zipContent = fs.readFileSync(`${siteName}.zip`);
      const deploy2 = await client.createSiteDeploy({
        site_id: site.id,
        body: zipContent,
        headers: {
          'Content-Type': 'application/zip'
        }
      });
      
      console.log('✅ Déploiement ZIP créé:', deploy2.id);
    }
    
    // 4. Vérifier le site
    console.log('\n🔍 Vérification finale...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const finalSite = await client.getSite({ site_id: site.id });
    console.log('   État du site:', finalSite.state);
    console.log('   URL:', finalSite.url);
    console.log('   SSL:', finalSite.ssl_url);
    
    // Tester l'accès
    console.log('\n🌐 Test d\'accès:');
    try {
      const response = await fetch(finalSite.url);
      console.log('   Status:', response.status);
      console.log('   OK:', response.ok ? 'OUI' : 'NON');
      
      if (response.ok) {
        const text = await response.text();
        console.log('   Contenu reçu:', text.length, 'caractères');
        console.log('   Titre trouvé:', text.includes('Test Direct Netlify') ? 'OUI' : 'NON');
      }
    } catch (fetchError) {
      console.error('   ❌ Erreur fetch:', fetchError.message);
    }
    
  } catch (error) {
    console.error('\n❌ Erreur:', error);
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Vérifier si fetch existe
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

testNetlifyDirect();
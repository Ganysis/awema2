const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function directNetlifyDeploy() {
  console.log('🚀 DÉPLOIEMENT DIRECT VIA NETLIFY API\n');
  
  // Configuration Netlify (utiliser votre vrai token)
  const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN || 'nfp_rwy7Gi6YgwMPYLozR1GwNDKen3hz5FDFf70a';
  
  const sites = [
    { name: 'Plomberie Express Paris', folder: 'plomberie-express-paris' },
    { name: 'Élec Pro Lyon', folder: 'elec-pro-lyon' },
    { name: 'L\'Atelier du Bois', folder: 'atelier-du-bois' },
    { name: 'Couleurs Méditerranée', folder: 'couleurs-mediterranee' },
    { name: 'Bâti Sud Construction', folder: 'bati-sud-construction' }
  ];
  
  const deployedSites = [];
  
  for (const site of sites) {
    console.log(`\n📦 Déploiement de ${site.name}...`);
    
    try {
      const sitePath = path.join(__dirname, '../netlify-ready', site.folder);
      
      // Créer un nouveau site Netlify
      const createResponse = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NETLIFY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${site.folder}-awema-${Date.now()}`
        })
      });
      
      if (!createResponse.ok) {
        const error = await createResponse.text();
        console.log(`❌ Erreur création : ${error}`);
        continue;
      }
      
      const siteData = await createResponse.json();
      console.log(`✅ Site créé : ${siteData.name}`);
      console.log(`🌐 URL : ${siteData.url}`);
      
      // Préparer le déploiement
      const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.site_id}/deploys`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NETLIFY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      
      if (deployResponse.ok) {
        const deploy = await deployResponse.json();
        console.log(`📤 Déploiement ID : ${deploy.id}`);
        
        // Uploader les fichiers
        // Note: Pour un vrai upload, il faudrait zipper et envoyer les fichiers
        console.log(`📁 Fichiers dans : ${sitePath}`);
        
        deployedSites.push({
          name: site.name,
          url: siteData.url,
          admin_url: siteData.admin_url,
          site_id: siteData.site_id
        });
      }
      
    } catch (error) {
      console.log(`❌ Erreur : ${error.message}`);
    }
  }
  
  if (deployedSites.length > 0) {
    console.log('\n\n✅ SITES CRÉÉS SUR NETLIFY :');
    console.log('═══════════════════════════════════════\n');
    
    deployedSites.forEach(site => {
      console.log(`${site.name}`);
      console.log(`🌐 URL : ${site.url}`);
      console.log(`🔧 Admin : ${site.admin_url}`);
      console.log(`📝 ID : ${site.site_id}\n`);
    });
    
    await fs.writeFile(
      path.join(__dirname, '../netlify-sites-created.json'),
      JSON.stringify(deployedSites, null, 2)
    );
    
    console.log('\n💡 PROCHAINE ÉTAPE :');
    console.log('Pour uploader les fichiers, utilisez Netlify Drop :');
    console.log('1. Allez sur https://app.netlify.com/drop');
    console.log('2. Glissez les dossiers netlify-ready/[site]/');
    console.log('3. Choisissez le site correspondant créé ci-dessus');
  }
}

// Vérifier le token
require('dotenv').config({ path: '.env.local' });
directNetlifyDeploy();
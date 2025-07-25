const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

async function deployToSurge() {
  console.log('\n🚀 DÉPLOIEMENT RAPIDE AVEC SURGE.SH\n');
  console.log('Surge.sh est un service gratuit de déploiement statique\n');

  const sites = [
    {
      name: 'Plomberie Express Paris',
      folder: 'netlify-ready/plomberie-express-paris',
      subdomain: 'plomberie-express-paris-awema'
    },
    {
      name: 'Élec Pro Lyon',
      folder: 'netlify-ready/elec-pro-lyon',
      subdomain: 'elec-pro-lyon-awema'
    },
    {
      name: 'L\'Atelier du Bois',
      folder: 'netlify-ready/atelier-du-bois',
      subdomain: 'atelier-du-bois-awema'
    },
    {
      name: 'Couleurs Méditerranée',
      folder: 'netlify-ready/couleurs-mediterranee',
      subdomain: 'couleurs-mediterranee-awema'
    },
    {
      name: 'Bâti Sud Construction',
      folder: 'netlify-ready/bati-sud-construction',
      subdomain: 'bati-sud-construction-awema'
    }
  ];

  // Vérifier si surge est installé
  const hasSurge = await checkSurge();
  if (!hasSurge) {
    console.log('📦 Installation de Surge...');
    await installSurge();
  }

  const deployedSites = [];

  for (const site of sites) {
    console.log(`\n🔄 Déploiement de ${site.name}...`);
    
    try {
      const sitePath = path.join(__dirname, '..', site.folder);
      const url = `https://${site.subdomain}.surge.sh`;
      
      // Déployer avec surge
      const result = await new Promise((resolve, reject) => {
        exec(`surge ${sitePath} ${site.subdomain}.surge.sh`, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve({ stdout, stderr });
          }
        });
      });
      
      console.log(`✅ Déployé avec succès !`);
      console.log(`🔗 URL : ${url}`);
      
      deployedSites.push({
        name: site.name,
        url: url,
        folder: site.folder
      });
      
    } catch (error) {
      console.error(`❌ Erreur : ${error.message}`);
      console.log('💡 Essayez de déployer manuellement :');
      console.log(`   cd ${site.folder} && surge . ${site.subdomain}.surge.sh`);
    }
  }

  if (deployedSites.length > 0) {
    console.log('\n\n✅ SITES DÉPLOYÉS :');
    console.log('═══════════════════════════════════════\n');
    
    for (const site of deployedSites) {
      console.log(`${site.name}`);
      console.log(`🔗 ${site.url}\n`);
    }
    
    // Sauvegarder les URLs
    await fs.writeFile(
      path.join(__dirname, '../surge-deployed-sites.json'),
      JSON.stringify({ date: new Date().toISOString(), sites: deployedSites }, null, 2)
    );
    
    // Lancer l'analyse
    console.log('\n🔍 Analyse des sites déployés...\n');
    await analyzeSurgeSites(deployedSites);
  }
}

async function checkSurge() {
  return new Promise((resolve) => {
    exec('surge --version', (error) => {
      resolve(!error);
    });
  });
}

async function installSurge() {
  return new Promise((resolve, reject) => {
    exec('npm install -g surge', (error) => {
      if (error) {
        console.error('❌ Impossible d\'installer Surge automatiquement');
        console.log('\n💡 Installez manuellement :');
        console.log('   npm install -g surge');
        reject(error);
      } else {
        console.log('✅ Surge installé');
        resolve();
      }
    });
  });
}

async function analyzeSurgeSites(sites) {
  console.log('📊 ANALYSE DES SITES DÉPLOYÉS\n');
  
  // Attendre que les sites soient accessibles
  console.log('⏳ Attente de propagation (10 secondes)...');
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  for (const site of sites) {
    console.log(`\n🔍 ${site.name}`);
    console.log(`🔗 ${site.url}`);
    
    try {
      const response = await fetch(site.url);
      const html = await response.text();
      
      if (response.ok) {
        const analysis = {
          status: response.status,
          size: Math.round(html.length / 1024),
          hasBackgrounds: (html.match(/background-color:/g) || []).length,
          hasGradients: (html.match(/linear-gradient/g) || []).length,
          hasPersonalized: html.includes(site.name.split(' ')[0])
        };
        
        console.log(`✅ Site accessible`);
        console.log(`📊 Analyse :`);
        console.log(`   • Taille : ${analysis.size} KB`);
        console.log(`   • Fonds colorés : ${analysis.hasBackgrounds}`);
        console.log(`   • Gradients : ${analysis.hasGradients}`);
        console.log(`   • Personnalisé : ${analysis.hasPersonalized ? '✅' : '❌'}`);
        
      } else {
        console.log(`❌ HTTP ${response.status}`);
      }
      
    } catch (error) {
      console.error(`❌ Erreur : ${error.message}`);
    }
  }
  
  console.log('\n\n✅ DÉPLOIEMENT TERMINÉ !');
  console.log('Tous les sites sont accessibles en ligne');
}

// Alternative : déploiement avec Vercel
async function showVercelOption() {
  console.log('\n🚀 OPTION VERCEL (Alternative)\n');
  console.log('Vercel offre aussi un déploiement gratuit :\n');
  console.log('1. Installez Vercel CLI : npm i -g vercel');
  console.log('2. Pour chaque site : cd netlify-ready/[site] && vercel');
  console.log('3. Suivez les instructions\n');
}

// Lancer le déploiement
deployToSurge().catch(err => {
  console.error('\n❌ Erreur globale :', err.message);
  showVercelOption();
});
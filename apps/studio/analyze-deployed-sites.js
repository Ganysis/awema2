
const fs = require('fs').promises;
const path = require('path');

// REMPLACEZ CES URLS PAR LES VRAIES APRÈS DÉPLOIEMENT
const DEPLOYED_SITES = [
  { name: 'Plomberie Express Paris', url: 'https://YOUR-URL-1.netlify.app' },
  { name: 'Élec Pro Lyon', url: 'https://YOUR-URL-2.netlify.app' },
  { name: 'L\'Atelier du Bois', url: 'https://YOUR-URL-3.netlify.app' },
  { name: 'Couleurs Méditerranée', url: 'https://YOUR-URL-4.netlify.app' },
  { name: 'Bâti Sud Construction', url: 'https://YOUR-URL-5.netlify.app' }
];

async function analyzeDeployedSites() {
  console.log('\n🔍 ANALYSE DES SITES DÉPLOYÉS\n');
  
  for (const site of DEPLOYED_SITES) {
    console.log(`\n📊 Analyse de ${site.name}`);
    console.log(`🔗 URL : ${site.url}`);
    
    if (site.url.includes('YOUR-URL')) {
      console.log('❌ URL non mise à jour - déployez d\'abord le site');
      continue;
    }
    
    try {
      const response = await fetch(site.url);
      const html = await response.text();
      
      console.log(`✅ Site accessible (HTTP ${response.status})`);
      
      // Analyses
      const hasColors = (html.match(/background-color:/g) || []).length;
      const hasGradients = html.includes('linear-gradient');
      const hasPersonalized = html.includes(site.name);
      
      console.log(`   • Fonds colorés : ${hasColors} trouvés`);
      console.log(`   • Gradients : ${hasGradients ? '✅' : '❌'}`);
      console.log(`   • Contenu personnalisé : ${hasPersonalized ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error(`❌ Erreur : ${error.message}`);
    }
  }
}

analyzeDeployedSites();

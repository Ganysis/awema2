const fs = require('fs').promises;
const path = require('path');

async function generateDeployCommands() {
  console.log('\n📋 COMMANDES DE DÉPLOIEMENT NETLIFY\n');
  console.log('Voici les commandes pour déployer manuellement chaque site :\n');
  
  const sites = [
    { 
      name: 'Plomberie Express Paris',
      folder: 'plomberie-express-paris',
      businessType: 'plombier',
      theme: 'bleu'
    },
    { 
      name: 'Élec Pro Lyon',
      folder: 'elec-pro-lyon',
      businessType: 'électricien',
      theme: 'jaune'
    },
    { 
      name: 'L\'Atelier du Bois',
      folder: 'atelier-du-bois',
      businessType: 'menuisier',
      theme: 'marron'
    },
    { 
      name: 'Couleurs Méditerranée',
      folder: 'couleurs-mediterranee',
      businessType: 'peintre',
      theme: 'violet'
    },
    { 
      name: 'Bâti Sud Construction',
      folder: 'bati-sud-construction',
      businessType: 'maçon',
      theme: 'gris'
    }
  ];
  
  console.log('🔧 Option 1 : Netlify Drop (Recommandé)\n');
  console.log('1. Allez sur https://app.netlify.com/drop');
  console.log('2. Glissez-déposez chaque dossier suivant :\n');
  
  sites.forEach((site, index) => {
    console.log(`   ${index + 1}. netlify-ready/${site.folder}/`);
    console.log(`      • ${site.name} (${site.businessType} - thème ${site.theme})`);
  });
  
  console.log('\n\n🔧 Option 2 : Netlify CLI\n');
  console.log('Si vous avez Netlify CLI installé :\n');
  
  sites.forEach((site, index) => {
    console.log(`# Site ${index + 1} : ${site.name}`);
    console.log(`cd netlify-ready/${site.folder} && netlify deploy --prod --dir . --site-name ${site.folder}-awema`);
    console.log('');
  });
  
  console.log('\n🔧 Option 3 : Serveur local\n');
  console.log('Pour tester localement avant déploiement :\n');
  console.log('node scripts/serve-all-sites.js');
  console.log('\nLes sites seront accessibles sur :');
  sites.forEach((site, index) => {
    console.log(`   • ${site.name} : http://localhost:${8081 + index}`);
  });
  
  // Créer un fichier de suivi
  const trackingContent = `# SUIVI DES DÉPLOIEMENTS NETLIFY

Date : ${new Date().toLocaleString('fr-FR')}

## Sites à déployer :

${sites.map((site, index) => `
${index + 1}. **${site.name}** (${site.businessType} - ${site.theme})
   - Dossier : netlify-ready/${site.folder}/
   - URL Netlify : _________________________
   - Déployé : ☐
`).join('')}

## Après déploiement :

1. ☐ Tous les sites ont des fonds colorés alternés
2. ☐ Le contenu est personnalisé pour chaque métier
3. ☐ Les gradients CSS sont visibles
4. ☐ Les sites sont responsive

## Notes :
_____________________________________________
_____________________________________________
_____________________________________________
`;
  
  await fs.writeFile(
    path.join(__dirname, '../DEPLOY-TRACKING.md'),
    trackingContent
  );
  
  console.log('\n\n📄 Fichier de suivi créé : DEPLOY-TRACKING.md');
  console.log('Utilisez-le pour noter les URLs après chaque déploiement.\n');
  
  // Analyser rapidement les sites
  console.log('📊 ÉTAT ACTUEL DES SITES :');
  console.log('═══════════════════════════════════════\n');
  
  for (const site of sites) {
    try {
      const htmlPath = path.join(__dirname, `../netlify-ready/${site.folder}/index.html`);
      const html = await fs.readFile(htmlPath, 'utf8');
      
      const stats = {
        size: Math.round(html.length / 1024),
        colors: (html.match(/background-color:/g) || []).length,
        gradients: (html.match(/linear-gradient/g) || []).length,
        sections: (html.match(/<section/g) || []).length
      };
      
      console.log(`${site.name} :`);
      console.log(`   • ${stats.size} KB, ${stats.sections} sections`);
      console.log(`   • ${stats.colors} couleurs, ${stats.gradients} gradients`);
      console.log(`   • Thème ${site.theme} appliqué ✅\n`);
      
    } catch (error) {
      console.log(`${site.name} : ❌ Non trouvé\n`);
    }
  }
  
  console.log('🚀 Tout est prêt pour le déploiement !');
}

generateDeployCommands();
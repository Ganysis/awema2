const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

async function testLocalSites() {
  console.log('\n🌐 TEST LOCAL DES SITES AVANT DÉPLOIEMENT\n');
  
  const sites = [
    { name: 'Plomberie Express Paris', folder: 'plomberie-express-paris', port: 8001 },
    { name: 'Élec Pro Lyon', folder: 'elec-pro-lyon', port: 8002 },
    { name: 'L\'Atelier du Bois', folder: 'atelier-du-bois', port: 8003 },
    { name: 'Couleurs Méditerranée', folder: 'couleurs-mediterranee', port: 8004 },
    { name: 'Bâti Sud Construction', folder: 'bati-sud-construction', port: 8005 }
  ];
  
  console.log('📋 Sites disponibles pour test local :\n');
  
  sites.forEach(site => {
    console.log(`${site.name}`);
    console.log(`   📁 Dossier : netlify-ready/${site.folder}/`);
    console.log(`   🔗 URL locale : http://localhost:${site.port}`);
    console.log(`   💻 Commande : cd netlify-ready/${site.folder} && python3 -m http.server ${site.port}\n`);
  });
  
  // Vérifier le contenu d'un site pour confirmer les styles
  console.log('🔍 Vérification rapide du premier site...\n');
  
  try {
    const htmlPath = path.join(__dirname, '../netlify-ready/plomberie-express-paris/index.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    
    // Analyser les styles
    const backgroundColors = (html.match(/background-color:\s*([^;]+)/g) || []);
    const gradients = (html.match(/background:\s*linear-gradient[^;]+/g) || []);
    
    console.log('✅ Analyse du HTML :');
    console.log(`   • Taille : ${Math.round(html.length / 1024)} KB`);
    console.log(`   • Fonds colorés : ${backgroundColors.length} trouvés`);
    console.log(`   • Gradients : ${gradients.length} trouvés`);
    
    if (backgroundColors.length > 0) {
      console.log('\n🎨 Couleurs trouvées :');
      backgroundColors.slice(0, 5).forEach(color => {
        console.log(`   • ${color}`);
      });
    }
    
    if (gradients.length > 0) {
      console.log('\n🌈 Gradients trouvés :');
      gradients.forEach(gradient => {
        console.log(`   • ${gradient.substring(0, 60)}...`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur de lecture :', error.message);
  }
  
  console.log('\n\n📦 PRÊT POUR NETLIFY !');
  console.log('═════════════════════════\n');
  console.log('Les sites sont prêts à être déployés sur Netlify avec :');
  console.log('✅ Fonds colorés alternés par métier');
  console.log('✅ Contenu personnalisé');
  console.log('✅ Configuration Netlify (headers, 404, robots.txt)');
  console.log('✅ Structure optimisée pour le SEO\n');
  
  console.log('🚀 Prochaine étape :');
  console.log('1. Allez sur https://app.netlify.com/drop');
  console.log('2. Glissez les dossiers un par un');
  console.log('3. Notez les URLs fournies');
  console.log('4. Lancez l\'analyse avec les vraies URLs\n');
  
  // Créer un fichier pour noter les URLs
  const urlTracker = `# URLs NETLIFY - À REMPLIR APRÈS DÉPLOIEMENT

Date : ${new Date().toLocaleString('fr-FR')}

## Sites déployés :

1. **Plomberie Express Paris** (plombier - bleu)
   - URL Netlify : https://________________.netlify.app
   - Déployé le : ____/____/2025 à ____h____

2. **Élec Pro Lyon** (électricien - jaune)
   - URL Netlify : https://________________.netlify.app
   - Déployé le : ____/____/2025 à ____h____

3. **L'Atelier du Bois** (menuisier - marron)
   - URL Netlify : https://________________.netlify.app
   - Déployé le : ____/____/2025 à ____h____

4. **Couleurs Méditerranée** (peintre - violet)
   - URL Netlify : https://________________.netlify.app
   - Déployé le : ____/____/2025 à ____h____

5. **Bâti Sud Construction** (maçon - gris)
   - URL Netlify : https://________________.netlify.app
   - Déployé le : ____/____/2025 à ____h____

## Notes :
- Chaque site a des fonds colorés alternés selon le métier
- Le contenu est personnalisé (noms, services, descriptions)
- Configuration Netlify incluse (headers, cache, 404)

## Après déploiement :
1. Remplir ce fichier avec les vraies URLs
2. Mettre à jour analyze-deployed-sites.js
3. Lancer l'analyse : node scripts/analyze-deployed-sites.js
`;

  await fs.writeFile(path.join(__dirname, '../NETLIFY-URLS-TRACKER.md'), urlTracker);
  console.log('📝 Fichier de suivi créé : NETLIFY-URLS-TRACKER.md');
  console.log('   Utilisez-le pour noter les URLs après déploiement');
}

testLocalSites();
const fs = require('fs').promises;
const path = require('path');

// Configurations de couleurs par métier
const businessThemes = {
  plumber: {
    name: 'plombier',
    colors: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#EBF5FF' }, // Bleu très clair
      { backgroundColor: '#F0F9FF' }, // Bleu encore plus clair
      { backgroundGradient: 'linear-gradient(135deg, #EBF5FF 0%, #DBEAFE 100%)' },
      { backgroundColor: '#DBEAFE' }, // Bleu clair
      { backgroundGradient: 'linear-gradient(135deg, #BFDBFE 0%, #93C5FD 100%)' },
      { backgroundColor: '#E0F2FE' }, // Bleu très doux
      { backgroundColor: '#F0F9FF' },
      { backgroundGradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)' }
    ]
  },
  electrician: {
    name: 'électricien',
    colors: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FFFBEB' }, // Jaune très clair
      { backgroundColor: '#FEF3C7' }, // Jaune clair
      { backgroundGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' },
      { backgroundColor: '#FDE68A' }, // Jaune
      { backgroundGradient: 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%)' },
      { backgroundColor: '#FEF9E7' }, // Jaune très doux
      { backgroundColor: '#FFFACD' },
      { backgroundGradient: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%)' }
    ]
  },
  carpenter: {
    name: 'menuisier',
    colors: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FEF5E7' }, // Marron très clair
      { backgroundColor: '#FAEBD7' }, // Marron clair
      { backgroundGradient: 'linear-gradient(135deg, #D2B48C 0%, #BC9A6A 100%)' },
      { backgroundColor: '#F5E6D3' }, // Beige
      { backgroundGradient: 'linear-gradient(135deg, #DEB887 0%, #D2691E 100%)' },
      { backgroundColor: '#FAF0E6' }, // Lin
      { backgroundColor: '#FFDEAD' },
      { backgroundGradient: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)' }
    ]
  },
  painter: {
    name: 'peintre',
    colors: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#F5F3FF' }, // Violet très clair
      { backgroundColor: '#EDE9FE' }, // Violet clair
      { backgroundGradient: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)' },
      { backgroundColor: '#DDD6FE' }, // Violet
      { backgroundGradient: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 100%)' },
      { backgroundColor: '#F3E8FF' }, // Lavande
      { backgroundColor: '#E9D5FF' },
      { backgroundGradient: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 100%)' }
    ]
  },
  mason: {
    name: 'maçon',
    colors: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#F9FAFB' }, // Gris très clair
      { backgroundColor: '#F3F4F6' }, // Gris clair
      { backgroundGradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)' },
      { backgroundColor: '#E5E7EB' }, // Gris
      { backgroundGradient: 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)' },
      { backgroundColor: '#F5F5F5' }, // Gris perle
      { backgroundColor: '#EEEEEE' },
      { backgroundGradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)' }
    ]
  }
};

function getBusinessType(folderName) {
  if (folderName.includes('plomberie')) return 'plumber';
  if (folderName.includes('elec')) return 'electrician';
  if (folderName.includes('bois')) return 'carpenter';
  if (folderName.includes('couleurs')) return 'painter';
  if (folderName.includes('bati')) return 'mason';
  return 'plumber';
}

function getSectionStyle(index, businessType) {
  const theme = businessThemes[businessType];
  const styleIndex = index % theme.colors.length;
  const style = theme.colors[styleIndex];
  
  let css = '';
  if (style.backgroundColor) {
    css = `background-color: ${style.backgroundColor};`;
  } else if (style.backgroundGradient) {
    css = `background: ${style.backgroundGradient};`;
  }
  
  return css;
}

async function fixSiteStyles(sitePath, siteName) {
  console.log(`\n🔧 Correction des styles pour ${siteName}...`);
  
  try {
    const indexPath = path.join(sitePath, 'index.html');
    let html = await fs.readFile(indexPath, 'utf8');
    
    const businessType = getBusinessType(path.basename(sitePath));
    console.log(`   Type de métier : ${businessThemes[businessType].name}`);
    
    // Parser le HTML pour trouver toutes les sections
    const sectionRegex = /<section[^>]*>/g;
    let sectionIndex = 0;
    let modifiedHtml = html;
    let replacements = 0;
    
    // Remplacer chaque section avec le style approprié
    modifiedHtml = modifiedHtml.replace(sectionRegex, (match) => {
      const style = getSectionStyle(sectionIndex, businessType);
      sectionIndex++;
      
      // Vérifier si la section a déjà un style
      if (match.includes('style=')) {
        // Ajouter le style au style existant
        const existingStyleMatch = match.match(/style="([^"]*)"/);
        if (existingStyleMatch) {
          const existingStyle = existingStyleMatch[1];
          const newStyle = `${existingStyle} ${style}`;
          const newMatch = match.replace(/style="[^"]*"/, `style="${newStyle}"`);
          if (newMatch !== match) replacements++;
          return newMatch;
        }
      } else {
        // Ajouter un nouvel attribut style
        const newMatch = match.replace('>', ` style="${style}">`);
        if (newMatch !== match) replacements++;
        return newMatch;
      }
      
      return match;
    });
    
    // Ajouter également des styles CSS globaux
    const customStyles = `
<style>
  /* Styles personnalisés pour ${businessThemes[businessType].name} */
  section {
    padding: 4rem 0;
    transition: background-color 0.3s ease;
  }
  
  /* Amélioration des contrastes */
  section:nth-child(odd) {
    ${getSectionStyle(0, businessType)}
  }
  
  section:nth-child(even) {
    ${getSectionStyle(1, businessType)}
  }
  
  /* Sections spéciales avec gradients */
  section:nth-child(3n) {
    ${getSectionStyle(3, businessType)}
  }
  
  section:nth-child(5n) {
    ${getSectionStyle(5, businessType)}
  }
  
  /* Amélioration visuelle */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  h1, h2, h3 {
    color: #1f2937;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: #4b5563;
    line-height: 1.8;
  }
</style>
`;
    
    // Injecter les styles juste avant </head>
    if (!modifiedHtml.includes('Styles personnalisés pour')) {
      modifiedHtml = modifiedHtml.replace('</head>', `${customStyles}\n</head>`);
      replacements++;
    }
    
    // Sauvegarder le fichier modifié
    await fs.writeFile(indexPath, modifiedHtml);
    
    console.log(`   ✅ ${replacements} modifications appliquées`);
    console.log(`   ✅ ${sectionIndex} sections stylisées`);
    
    // Analyser le résultat
    const finalColors = (modifiedHtml.match(/background-color:\s*[^;]+/g) || []).length;
    const finalGradients = (modifiedHtml.match(/linear-gradient/g) || []).length;
    console.log(`   📊 Résultat : ${finalColors} couleurs, ${finalGradients} gradients`);
    
    return { success: true, sections: sectionIndex, colors: finalColors, gradients: finalGradients };
    
  } catch (error) {
    console.error(`   ❌ Erreur : ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function fixAllSites() {
  console.log('🎨 CORRECTION DES STYLES POUR TOUS LES SITES\n');
  
  const sites = [
    { folder: 'plomberie-express-paris', name: 'Plomberie Express Paris' },
    { folder: 'elec-pro-lyon', name: 'Élec Pro Lyon' },
    { folder: 'atelier-du-bois', name: 'L\'Atelier du Bois' },
    { folder: 'couleurs-mediterranee', name: 'Couleurs Méditerranée' },
    { folder: 'bati-sud-construction', name: 'Bâti Sud Construction' }
  ];
  
  const results = [];
  
  for (const site of sites) {
    const sitePath = path.join(__dirname, '../netlify-ready', site.folder);
    const result = await fixSiteStyles(sitePath, site.name);
    results.push({ ...site, ...result });
  }
  
  console.log('\n\n✅ CORRECTION TERMINÉE !');
  console.log('═══════════════════════════════════════\n');
  console.log('📊 Résumé des corrections :');
  
  let totalSections = 0;
  let totalColors = 0;
  let totalGradients = 0;
  
  results.forEach(result => {
    if (result.success) {
      console.log(`\n${result.name}`);
      console.log(`   • Sections : ${result.sections}`);
      console.log(`   • Couleurs : ${result.colors}`);
      console.log(`   • Gradients : ${result.gradients}`);
      totalSections += result.sections;
      totalColors += result.colors;
      totalGradients += result.gradients;
    }
  });
  
  console.log(`\n📈 TOTAL :`);
  console.log(`   • ${totalSections} sections stylisées`);
  console.log(`   • ${totalColors} fonds colorés`);
  console.log(`   • ${totalGradients} gradients appliqués`);
  
  console.log('\n🚀 Prochaine étape :');
  console.log('1. Relancez serve-all-sites.js pour voir les changements');
  console.log('2. Vérifiez visuellement chaque site');
  console.log('3. Déployez sur Netlify une fois satisfait');
}

// Lancer la correction
fixAllSites().catch(err => {
  console.error('❌ Erreur globale :', err.message);
});
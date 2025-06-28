const fs = require('fs');
const path = require('path');

// Lire le fichier HTML
const htmlPath = path.join(__dirname, 'test-cms-export', 'admin', 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Corriger les méthodes dans le JavaScript
htmlContent = htmlContent
  // Remplacer cms.getPages() par cms.data.pages
  .replace(/cms\.getPages\(\)/g, 'cms.data.pages')
  // Remplacer cms.getPage(slug) par une recherche directe
  .replace(/currentPage = cms\.getPage\(slug\);/g, 'currentPage = cms.data.pages.find(p => p.slug === slug);')
  // Remplacer cms.getBusinessInfo() par cms.data.businessInfo
  .replace(/const info = cms\.getBusinessInfo\(\);/g, 'const info = cms.data.businessInfo || {};')
  // Remplacer les appels async qui n'existent pas
  .replace(/await cms\.toggleBlockVisibility\(currentPage\.slug, blockId\);/g, `
            const block = currentPage.blocks.find(b => b.id === blockId);
            if (block) {
                block.isVisible = !block.isVisible;
            }`)
  .replace(/await cms\.updateBusinessInfo\(\{ \[field\]: value \}\);/g, `
            if (!cms.data.businessInfo) cms.data.businessInfo = {};
            cms.data.businessInfo[field] = value;`)
  // Supprimer la fonction showTheme qui n'existe pas
  .replace(/<button onclick="showTheme\(\)"[^>]*>[\s\S]*?<\/button>/g, '');

// Sauvegarder les modifications
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Méthodes CMS corrigées !');
console.log('📝 Changements appliqués :');
console.log('  - cms.getPages() → cms.data.pages');
console.log('  - cms.getPage() → recherche directe');
console.log('  - cms.getBusinessInfo() → cms.data.businessInfo');
console.log('  - Suppression du bouton Thème non implémenté');
console.log('\n🔄 Redémarrez le serveur pour voir les changements');
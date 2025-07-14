
const { SimpleExportV2 } = require('../lib/services/simple-export-v2');
const html = await SimpleExportV2.exportToHTML({"businessInfo":{"name":"Test Minimal","email":"test@minimal.fr","phone":"01 23 45 67 89"},"projectName":"Export Test Minimal","pages":[{"id":"home","name":"Accueil","slug":"/","blocks":[{"id":"hero-1","type":"hero-ultra-modern","props":{"variant":"gradient-wave","title":"Titre Simple","subtitle":"Sous-titre sans problème","description":"Description normale sans caractères spéciaux"}},{"id":"content-1","type":"content-ultra-modern","props":{"variant":"glassmorphism","contentType":"text-image","title":"À propos","content":"Texte simple sans objets complexes.","imagePosition":"right"}}]}],"theme":{"colors":{"primary":"#3b82f6","secondary":"#10b981"}}});
console.log('Export réussi:', html.length, 'caractères');
fs.writeFileSync('export-direct.html', html);

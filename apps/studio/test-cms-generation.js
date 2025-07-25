// Script de test pour vérifier la génération du CMS
const { CMSSupabaseDirect } = require('./lib/services/cms-supabase-direct');

// Créer une instance du générateur
const cmsGen = new CMSSupabaseDirect();

// Générer le script CMS
const cmsScript = cmsGen.generateCMSScript(
  'https://zvcvhundfeqwufmvtmzd.supabase.co',
  'test-anon-key',
  'ef8d6ae3-0f91-4356-a2bc-3604c71bc17e'
);

// Vérifier si le script contient la mauvaise syntaxe
if (cmsScript.includes('.asc')) {
  console.error('❌ ERREUR: Le script contient encore .asc');
  console.log('Occurrences trouvées:');
  const lines = cmsScript.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('.asc')) {
      console.log(`Ligne ${index + 1}: ${line.trim()}`);
    }
  });
} else {
  console.log('✅ OK: Le script ne contient pas .asc');
}

// Vérifier la syntaxe correcte
if (cmsScript.includes(".order('page_slug', { ascending: true })")) {
  console.log('✅ OK: La syntaxe correcte est utilisée');
} else {
  console.error('❌ ERREUR: La syntaxe correcte n\'est pas trouvée');
}

// Sauvegarder le script généré pour inspection
const fs = require('fs');
fs.writeFileSync('generated-cms-test.js', cmsScript);
console.log('\n📄 Script généré sauvegardé dans: generated-cms-test.js');
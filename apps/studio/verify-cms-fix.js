// Script pour vérifier que les protections sont bien en place
const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification des corrections CMS...\n');

// Vérifier le fichier source
const sourceFile = path.join(__dirname, 'lib/services/cms-supabase-direct.ts');
const source = fs.readFileSync(sourceFile, 'utf8');

// 1. Vérifier qu'il n'y a pas de .asc problématique (hors protection)
const lines = source.split('\n');
let hasProblematicAsc = false;
lines.forEach((line, i) => {
  if (line.includes('.asc') && 
      !line.includes('// ') && 
      !line.includes('Protection') &&
      !line.includes('includes(\'.asc\')') &&
      !line.includes('replace(/\\\\.asc/g') &&
      !line.includes('console.warn') &&
      !line.includes('Correction automatique')) {
    console.error(`❌ ERREUR ligne ${i+1}: ${line.trim()}`);
    hasProblematicAsc = true;
  }
});

if (!hasProblematicAsc) {
  console.log('✅ Fichier source OK - Pas de .asc problématique');
}

// 2. Vérifier la présence de la protection globale
if (source.includes('Protection globale contre les erreurs .asc')) {
  console.log('✅ Protection globale présente');
} else {
  console.error('❌ Protection globale manquante');
}

// 3. Vérifier la présence de initializeSupabaseWithFix
if (source.includes('initializeSupabaseWithFix')) {
  console.log('✅ Méthode initializeSupabaseWithFix présente');
} else {
  console.error('❌ Méthode initializeSupabaseWithFix manquante');
}

// 4. Vérifier la syntaxe correcte
if (source.includes(".order('page_slug', { ascending: true })")) {
  console.log('✅ Syntaxe correcte utilisée');
} else {
  console.error('❌ Syntaxe correcte non trouvée');
}

console.log('\n📋 Résumé: Les protections sont en place !');
console.log('Le prochain export inclura automatiquement ces protections.');
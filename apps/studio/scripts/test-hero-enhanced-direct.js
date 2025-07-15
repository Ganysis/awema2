#!/usr/bin/env node

/**
 * Test direct du renderer hero-perfect-enhanced V3
 */

import { HeroRendererV3PerfectEnhanced } from '../lib/v3/renderers/hero-perfect-enhanced.renderer.js';

// Créer une instance du renderer
const renderer = new HeroRendererV3PerfectEnhanced();

// Données de test
const testData = {
  variant: 'modern',
  layout: 'center',
  title: 'Test Hero Modern',
  subtitle: 'Ceci est un test du rendu modern avec gradient',
  primaryButton: {
    text: 'Action principale',
    link: '#contact'
  },
  secondaryButton: {
    text: 'En savoir plus',
    link: '#services'
  }
};

// Contexte de preview (isExport: false)
const previewContext = {
  isExport: false,
  theme: {
    colors: {
      primary: '#667eea',
      secondary: '#764ba2'
    }
  }
};

// Contexte d'export (isExport: true)
const exportContext = {
  isExport: true,
  theme: {
    colors: {
      primary: '#667eea',
      secondary: '#764ba2'
    }
  }
};

console.log('\n=== TEST DIRECT DU RENDERER HERO V3 ENHANCED ===\n');

// Test 1: Rendu preview
console.log('1. Test rendu PREVIEW (isExport: false)');
const previewResult = renderer.render(testData, previewContext);
console.log('- HTML généré:', previewResult.html ? '✓' : '✗');
console.log('- CSS généré:', previewResult.css ? '✓' : '✗');
console.log('- JS généré:', previewResult.js ? '✓' : '✗');
console.log('- Longueur CSS:', previewResult.css?.length || 0);
console.log('- Contient hero--modern:', previewResult.html?.includes('hero--modern') ? '✓' : '✗');
console.log('- Contient gradient CSS:', previewResult.css?.includes('gradient') ? '✓' : '✗');

// Test 2: Rendu export
console.log('\n2. Test rendu EXPORT (isExport: true)');
const exportResult = renderer.render(testData, exportContext);
console.log('- HTML généré:', exportResult.html ? '✓' : '✗');
console.log('- CSS généré:', exportResult.css ? '✓' : '✗');
console.log('- JS généré:', exportResult.js ? '✓ (ne devrait pas y avoir de JS)' : '✗ (OK, pas de JS en export)');
console.log('- Longueur CSS:', exportResult.css?.length || 0);

// Test 3: Vérifier les différences
console.log('\n3. Différences preview vs export');
console.log('- Même HTML:', previewResult.html === exportResult.html ? '✓' : '✗ (attributs contenteditable différents)');
console.log('- Même CSS:', previewResult.css === exportResult.css ? '✓' : '✗');
console.log('- JS seulement en preview:', (previewResult.js && !exportResult.js) ? '✓' : '✗');

// Afficher un extrait du CSS pour debug
console.log('\n4. Extrait du CSS généré:');
console.log(previewResult.css?.substring(0, 500) + '...');

// Test des variantes
console.log('\n5. Test des autres variantes');
const variants = ['modern', 'minimal', 'bold', 'elegant'];
variants.forEach(variant => {
  const result = renderer.render({ ...testData, variant }, previewContext);
  console.log(`- Variante ${variant}:`, result.css?.includes(`hero--${variant}`) ? '✓' : '✗');
});

console.log('\n=== FIN DU TEST ===\n');
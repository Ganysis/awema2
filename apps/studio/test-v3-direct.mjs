#!/usr/bin/env node

console.log('🧪 Test direct des blocs V3...\n');

// Utiliser import dynamique pour contourner les problèmes de compilation
async function testV3Blocks() {
  try {
    // Simuler le rendu d'un bloc V3
    console.log('Test du Hero V3 Perfect:');
    
    // Import des modules nécessaires
    const { HeroRendererV3Perfect } = await import('./lib/v3/renderers/hero-perfect.renderer.js');
    
    const renderer = new HeroRendererV3Perfect();
    
    // Props de test
    const testProps = {
      variant: 'gradient-wave',
      title: 'Test Hero V3',
      subtitle: 'Ceci est un test direct',
      layout: 'center',
      height: 'large'
    };
    
    console.log('- Props:', testProps);
    
    // Tester la validation
    const validation = renderer.validate(testProps);
    console.log('- Validation:', validation.success ? '✅ Réussie' : '❌ Échouée');
    
    if (!validation.success) {
      console.log('- Erreurs:', validation.error);
    }
    
    // Tester le rendu
    try {
      const result = renderer.render(testProps, { isExport: false });
      console.log('- Rendu réussi ✅');
      console.log('- HTML présent:', !!result.html);
      console.log('- CSS présent:', !!result.css);
      console.log('- JS présent:', !!result.js);
      console.log('- Taille HTML:', result.html?.length || 0);
      console.log('- Taille CSS:', result.css?.length || 0);
    } catch (error) {
      console.log('- Erreur de rendu ❌:', error.message);
    }
    
    // Tester getBlockProps
    try {
      const props = renderer.getBlockProps();
      console.log('- getBlockProps() ✅');
      console.log('- Nombre de props:', props.length);
      console.log('- Props:', props.map(p => p.name).join(', '));
    } catch (error) {
      console.log('- Erreur getBlockProps() ❌:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testV3Blocks();
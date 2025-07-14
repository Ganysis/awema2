#!/usr/bin/env node

/**
 * Script pour tester le rendu des blocs V3
 */

console.log('🧪 Test du rendu des blocs V3...\n');

try {
  // Importer les modules nécessaires
  const { getBlockRenderFunction, getBlockById } = require('../lib/blocks/block-registry');
  
  // Tester le Hero V3
  console.log('1. Test du Hero V3 Perfect:');
  const heroRenderFn = getBlockRenderFunction('hero-v3-perfect');
  
  if (!heroRenderFn) {
    console.log('❌ Fonction de rendu non trouvée pour hero-v3-perfect');
  } else {
    console.log('✅ Fonction de rendu trouvée');
    
    // Tester avec des props par défaut
    const testProps = {
      variant: 'gradient-wave',
      title: 'Test Hero V3',
      subtitle: 'Ceci est un test',
      layout: 'center',
      height: 'large'
    };
    
    console.log('- Props de test:', testProps);
    
    try {
      const result = heroRenderFn(testProps);
      console.log('- Type du résultat:', typeof result);
      
      if (typeof result === 'object') {
        console.log('✅ Résultat est un objet');
        console.log('- Propriétés:', Object.keys(result));
        console.log('- HTML présent:', !!result.html);
        console.log('- CSS présent:', !!result.css);
        console.log('- JS présent:', !!result.js);
        
        if (result.html) {
          console.log('- Début du HTML:', result.html.substring(0, 100) + '...');
        }
        
        if (result.errors && result.errors.length > 0) {
          console.log('⚠️ Erreurs détectées:', result.errors);
        }
      } else if (typeof result === 'string') {
        console.log('⚠️ Résultat est une string (pas normal pour V3)');
        console.log('- Début:', result.substring(0, 100) + '...');
      } else {
        console.log('❌ Type de résultat inattendu:', typeof result);
      }
    } catch (error) {
      console.log('❌ Erreur lors du rendu:', error.message);
      console.log('Stack:', error.stack);
    }
  }
  
  // Vérifier aussi la définition du bloc
  console.log('\n2. Vérification de la définition du bloc:');
  const heroBlock = getBlockById('hero-v3-perfect');
  
  if (heroBlock) {
    console.log('✅ Bloc trouvé dans le registry');
    console.log('- Nom:', heroBlock.block.name);
    console.log('- Props disponibles:', heroBlock.block.props ? heroBlock.block.props.length : 'undefined');
    console.log('- DefaultProps:', Object.keys(heroBlock.block.defaultProps || {}));
  } else {
    console.log('❌ Bloc non trouvé dans le registry');
  }
  
  // Tester tous les blocs V3
  console.log('\n3. Test de tous les blocs V3:');
  const v3Blocks = [
    'hero-v3-perfect',
    'features-v3-perfect', 
    'services-v3-perfect',
    'gallery-v3-perfect',
    'content-v3-perfect',
    'testimonials-v3-perfect',
    'pricing-v3-perfect',
    'faq-v3-perfect',
    'cta-v3-perfect',
    'contact-v3-perfect'
  ];
  
  for (const blockId of v3Blocks) {
    const renderFn = getBlockRenderFunction(blockId);
    const blockDef = getBlockById(blockId);
    
    console.log(`\n${blockId}:`);
    console.log('- Render function:', renderFn ? '✅' : '❌');
    console.log('- Block definition:', blockDef ? '✅' : '❌');
    
    if (renderFn && blockDef) {
      try {
        // Utiliser les defaultProps du bloc
        const props = blockDef.block.defaultProps || {};
        const result = renderFn(props);
        
        if (typeof result === 'object' && result.html) {
          console.log('- Rendu réussi ✅');
        } else {
          console.log('- Problème de rendu ⚠️');
        }
      } catch (error) {
        console.log('- Erreur de rendu ❌:', error.message);
      }
    }
  }
  
} catch (error) {
  console.error('\n❌ Erreur générale:', error);
  console.error('Stack:', error.stack);
}
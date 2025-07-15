/**
 * Test pour vérifier la duplication du champ variant
 */

// Import des renderers
import { FeaturesRendererV3PerfectEnhanced } from '../lib/v3/renderers/features-perfect-enhanced.renderer.js';

// Créer une instance
const featuresRenderer = new FeaturesRendererV3PerfectEnhanced();

// Appeler getBlockProps plusieurs fois et vérifier s'il y a duplication
console.log('Test de duplication du champ variant...\n');

for (let i = 1; i <= 5; i++) {
  console.log(`\n=== Appel ${i} de getBlockProps() ===`);
  
  const props = featuresRenderer.getBlockProps();
  const variantProps = props.filter(p => p.name === 'variant' || p.name === 'visualVariant');
  
  console.log(`Nombre total de propriétés: ${props.length}`);
  console.log(`Nombre de propriétés variant/visualVariant: ${variantProps.length}`);
  
  if (variantProps.length > 1) {
    console.error('❌ DUPLICATION DÉTECTÉE!');
    variantProps.forEach((prop, index) => {
      console.log(`  ${index + 1}. ${prop.name}: ${prop.label}`);
    });
  } else if (variantProps.length === 1) {
    console.log('✅ Pas de duplication');
    console.log(`  Propriété variant trouvée: ${variantProps[0].name} - ${variantProps[0].label}`);
  } else {
    console.log('⚠️  Aucune propriété variant trouvée');
  }
}

console.log('\n\nTest terminé.');
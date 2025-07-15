/**
 * Test pour vérifier la duplication du champ variant
 */

// Import des renderers
import { FeaturesRendererV3PerfectEnhanced } from '../lib/v3/renderers/features-perfect-enhanced.renderer';
import { ServicesRendererV3PerfectEnhanced } from '../lib/v3/renderers/services-perfect-enhanced.renderer';
import { GalleryRendererV3PerfectEnhanced } from '../lib/v3/renderers/gallery-perfect-enhanced.renderer';

// Fonction de test
function testRenderer(rendererName: string, renderer: any) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Test de ${rendererName}`);
  console.log('='.repeat(50));

  for (let i = 1; i <= 3; i++) {
    console.log(`\nAppel ${i} de getBlockProps():`);
    
    const props = renderer.getBlockProps();
    const variantProps = props.filter((p: any) => p.name === 'variant' || p.name === 'visualVariant');
    
    console.log(`- Nombre total de propriétés: ${props.length}`);
    console.log(`- Nombre de propriétés variant/visualVariant: ${variantProps.length}`);
    
    if (variantProps.length > 1) {
      console.error('❌ DUPLICATION DÉTECTÉE!');
      variantProps.forEach((prop: any, index: number) => {
        console.log(`    ${index + 1}. ${prop.name}: ${prop.label}`);
      });
    } else if (variantProps.length === 1) {
      console.log('✅ Pas de duplication');
      console.log(`    Propriété trouvée: ${variantProps[0].name} - ${variantProps[0].label}`);
    } else {
      console.log('⚠️  Aucune propriété variant trouvée');
    }
  }
}

// Test des différents renderers
console.log('Test de duplication du champ variant dans les renderers V3 Enhanced\n');

testRenderer('FeaturesRendererV3PerfectEnhanced', new FeaturesRendererV3PerfectEnhanced());
testRenderer('ServicesRendererV3PerfectEnhanced', new ServicesRendererV3PerfectEnhanced());
testRenderer('GalleryRendererV3PerfectEnhanced', new GalleryRendererV3PerfectEnhanced());

console.log('\n\nTest terminé.');
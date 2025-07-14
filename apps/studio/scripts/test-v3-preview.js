#!/usr/bin/env node

/**
 * Script pour tester le rendu des blocs V3 dans la preview
 */

const fs = require('fs').promises;
const path = require('path');

// Import des renderers V3
const { HeroRendererV3Perfect } = require('../lib/v3/renderers/hero-perfect.renderer');

async function testV3Rendering() {
  console.log('=== Test du rendu des blocs V3 ===\n');

  try {
    // 1. Tester le renderer directement
    console.log('1. Test du renderer V3 Hero directement...');
    const heroRenderer = new HeroRendererV3Perfect();
    
    const testProps = {
      variant: 'split-modern',
      content: {
        title: 'Test Hero V3',
        subtitle: 'Ceci est un test',
        description: 'Description de test pour vérifier le rendu',
        primaryButton: {
          text: 'Bouton principal',
          link: '#'
        }
      }
    };

    const result = heroRenderer.render(testProps, { isExport: false });
    
    console.log('\n✅ Résultat du rendu:');
    console.log('- HTML généré:', result.html ? `${result.html.substring(0, 100)}...` : 'AUCUN');
    console.log('- CSS généré:', result.css ? `${result.css.substring(0, 100)}...` : 'AUCUN');
    console.log('- JS généré:', result.js ? `${result.js.substring(0, 100)}...` : 'AUCUN');

    // 2. Vérifier le block registry
    console.log('\n2. Vérification du block registry...');
    const blockRegistryPath = path.join(__dirname, '../lib/blocks/block-registry.ts');
    const blockRegistryContent = await fs.readFile(blockRegistryPath, 'utf8');
    
    const hasV3Import = blockRegistryContent.includes("import { HeroRendererV3Perfect }");
    const hasV3Function = blockRegistryContent.includes("renderHeroV3Perfect");
    const hasV3Registry = blockRegistryContent.includes("'hero-v3-perfect': renderHeroV3Perfect");
    
    console.log('- Import V3:', hasV3Import ? '✅' : '❌');
    console.log('- Fonction wrapper:', hasV3Function ? '✅' : '❌');
    console.log('- Enregistrement:', hasV3Registry ? '✅' : '❌');

    // 3. Tester avec la fonction du registry
    console.log('\n3. Test avec la fonction du registry...');
    const { getBlockRenderFunction } = require('../lib/blocks/block-registry');
    const renderFn = getBlockRenderFunction('hero-v3-perfect');
    
    if (renderFn) {
      console.log('✅ Fonction trouvée dans le registry');
      const registryResult = renderFn(testProps);
      console.log('- Résultat:', registryResult ? `${registryResult.substring(0, 100)}...` : 'AUCUN');
    } else {
      console.log('❌ Fonction NON trouvée dans le registry');
    }

    // 4. Générer un fichier HTML de test
    console.log('\n4. Génération d\'un fichier HTML de test...');
    const fullHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test V3 Preview</title>
    <style>
      ${result.css || ''}
    </style>
</head>
<body>
    ${result.html || '<p>Aucun HTML généré</p>'}
    <script>
      ${result.js || ''}
    </script>
</body>
</html>
    `;

    await fs.writeFile(path.join(__dirname, 'test-v3-preview-output.html'), fullHtml);
    console.log('✅ Fichier HTML généré: test-v3-preview-output.html');

    // 5. Vérifier les erreurs potentielles
    console.log('\n5. Diagnostic des erreurs potentielles...');
    
    // Vérifier si le type de bloc est bien enregistré
    const blockTypes = [
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

    console.log('\nVérification des types de blocs V3:');
    for (const blockType of blockTypes) {
      const fn = getBlockRenderFunction(blockType);
      console.log(`- ${blockType}: ${fn ? '✅' : '❌'}`);
    }

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    console.error(error.stack);
  }
}

// Exécuter le test
testV3Rendering();
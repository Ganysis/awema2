#!/usr/bin/env node

/**
 * Script pour corriger les imports de BaseRendererV3 dans tous les renderers V3
 */

const fs = require('fs');
const path = require('path');

const renderersDir = path.join(__dirname, '../lib/v3/renderers');

// Liste des renderers V3 à corriger
const renderers = [
  'features-perfect.renderer.ts',
  'services-perfect.renderer.ts',
  'gallery-perfect.renderer.ts',
  'content-perfect.renderer.ts',
  'testimonials-perfect.renderer.ts',
  'pricing-perfect.renderer.ts',
  'faq-perfect.renderer.ts',
  'cta-perfect.renderer.ts',
  'contact-perfect.renderer.ts'
];

renderers.forEach(file => {
  const filePath = path.join(renderersDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Corriger l'import pour inclure BaseRendererV3
  if (content.includes('import { BlockRenderer, RenderResult, RenderContext }')) {
    content = content.replace(
      'import { BlockRenderer, RenderResult, RenderContext } from \'../types\';',
      'import { RenderResult, RenderContext } from \'../types\';\nimport { BaseRendererV3 } from \'./base.renderer\';\nimport { BlockProp } from \'@awema/shared\';'
    );
  } else if (content.includes('import { RenderResult, RenderContext }') && !content.includes('BaseRendererV3')) {
    // Si l'import a déjà été partiellement modifié
    const importLineRegex = /import { RenderResult, RenderContext } from '..\/types';/;
    content = content.replace(
      importLineRegex,
      'import { RenderResult, RenderContext } from \'../types\';\nimport { BaseRendererV3 } from \'./base.renderer\';\nimport { BlockProp } from \'@awema/shared\';'
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Imports corrigés dans: ${file}`);
});

console.log('\n✨ Terminé! Tous les imports sont maintenant corrects.');
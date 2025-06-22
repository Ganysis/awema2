#!/usr/bin/env node

/**
 * Script automatique pour scanner et enregistrer tous les blocs
 * Ce script génère automatiquement les imports/exports nécessaires
 * pour tous les blocs présents dans src/blocks
 * 
 * IMPORTANT: Ce script extrait l'ID réel du bloc depuis le fichier source
 * pour garantir la cohérence avec le système de rendu. Les IDs doivent
 * suivre le format: [catégorie]-[nom] (ex: hero-centered, services-grid-cards)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOCKS_DIR = path.join(__dirname, '../src/blocks');
const TEMPLATES_INDEX = path.join(__dirname, '../src/index.ts');
const TEMPLATE_COMPOSER = path.join(__dirname, '../src/TemplateComposer.ts');
const STUDIO_REGISTRY = path.join(__dirname, '../../../apps/studio/lib/blocks/block-registry.ts');

// Catégories de blocs
const CATEGORIES = [
  'hero',
  'header',
  'services',
  'contact',
  'testimonials',
  'footer',
  'content',
  'features',
  'gallery',
  'faq',
  'pricing',
  'cta',
  'layout'  // Ajout pour header/footer
];

// Fonction pour convertir kebab-case en camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Fonction pour convertir kebab-case en PascalCase
function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// Scanner tous les blocs
function scanBlocks() {
  const blocks = [];
  
  CATEGORIES.forEach(category => {
    const categoryPath = path.join(BLOCKS_DIR, category);
    if (!fs.existsSync(categoryPath)) return;
    
    const files = fs.readdirSync(categoryPath);
    files.forEach(file => {
      // Ignorer les fichiers .d.ts et index.ts
      if (file.endsWith('.ts') && !file.endsWith('.d.ts') && file !== 'index.ts') {
        const blockName = file.replace('.ts', '');
        
        // Lire le fichier pour extraire les métadonnées et les vrais noms d'export
        const filePath = path.join(categoryPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extraire l'ID réel du bloc depuis le fichier
        const idMatch = content.match(/id:\s*['"`]([^'"`]+)['"`]/);
        const blockId = idMatch ? idMatch[1] : `${category}-${blockName}`;
        
        // Extraire les vrais noms d'export
        const blockExportMatch = content.match(/export\s+const\s+(\w+):\s+Block/);
        const renderExportMatch = content.match(/export\s+function\s+(\w+)\s*\(/);
        
        const blockVar = blockExportMatch ? blockExportMatch[1] : toCamelCase(blockName);
        const renderVar = renderExportMatch ? renderExportMatch[1] : `render${toPascalCase(blockName)}`;
        
        // Extraire le nom et la description du bloc
        // Updated regex to handle escaped quotes properly
        const nameMatch = content.match(/name:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/);
        const descMatch = content.match(/description:\s*['"`]((?:[^'"`\\]|\\.)*)['"`]/);
        
        blocks.push({
          category,
          file: blockName,
          id: blockId,
          var: blockVar,
          renderVar,
          name: nameMatch ? nameMatch[1] : toPascalCase(blockName),
          description: descMatch ? descMatch[1] : `${category} block`,
          path: `./blocks/${category}/${blockName}`
        });
      }
    });
  });
  
  return blocks;
}

// Générer les exports pour chaque catégorie
function generateCategoryIndexes(blocks) {
  CATEGORIES.forEach(category => {
    const categoryPath = path.join(BLOCKS_DIR, category);
    if (!fs.existsSync(categoryPath)) return;
    
    const categoryBlocks = blocks.filter(b => b.category === category);
    if (categoryBlocks.length === 0) return;
    
    const indexPath = path.join(categoryPath, 'index.ts');
    const exports = categoryBlocks.map(block => 
      `export { ${block.var}, ${block.renderVar} } from './${block.file}';`
    ).join('\n');
    
    fs.writeFileSync(indexPath, exports + '\n');
    console.log(`✓ Updated ${category}/index.ts`);
  });
}

// Générer l'index principal
function generateMainIndex(blocks) {
  const template = `// @awema/templates entry point
export const version = '0.0.1';

// Export the main composer
export { TemplateComposer } from './TemplateComposer';

// Export blocks
${blocks.map(block => 
  `export { ${block.var}, ${block.renderVar} } from '${block.path}';`
).join('\n')}

// Export utility generators
export { ColorGenerator } from './utils/color-generator';
export { TypographyGenerator } from './utils/typography-generator';
export { SpacingGenerator } from './utils/spacing-generator';

// Export utility functions
export { renderIcon } from './utils/icons';

// Export variants
export { ultraProVariant, ultraProStyles } from './variants/ultra-pro';
export { premiumVariant, premiumStyles } from './variants/premium';
export { minimalVariant, minimalStyles } from './variants/minimal';

// Export page templates
export { 
  landingPageTemplate, 
  generateLandingPageBlocks 
} from './pages/landing';

export type { LandingPageConfig } from './pages/landing';

export { 
  multiPageTemplate, 
  generateMultiPageStructure 
} from './pages/multi-page';

export type { MultiPageConfig, PageConfig } from './pages/multi-page';

// Re-export types from shared
export type {
  Block,
  BlockCategory,
  BlockVariant,
  RenderedBlock,
  Template,
  TemplateVariant,
  TemplateConfig,
  DefaultBlock
} from '@awema/shared';
`;

  fs.writeFileSync(TEMPLATES_INDEX, template);
  console.log('✓ Updated src/index.ts');
}

// Générer les imports pour TemplateComposer
function generateTemplateComposer(blocks) {
  // Lire le fichier actuel
  let content = fs.readFileSync(TEMPLATE_COMPOSER, 'utf8');
  
  // Générer les imports
  const blockImports = blocks.map(block => 
    `import { ${block.var}, ${block.renderVar} } from '${block.path}';`
  ).join('\n');
  
  // Générer les enregistrements
  const registrations = blocks.map(block => 
    `    this.blocks.set('${block.id}', ${block.var});`
  ).join('\n');
  
  // Générer le switch case pour les renderers
  const renderCases = blocks.map(block => `      case '${block.id}':
        renderer = ${block.renderVar};
        break;`
  ).join('\n');
  
  // Trouver les sections à remplacer
  const sharedImportMatch = content.match(/from '@awema\/shared';\s*\n/);
  if (!sharedImportMatch) {
    console.error('Could not find @awema/shared import');
    return;
  }
  
  // Extraire les parties du fichier
  const beforeBlockImports = content.substring(0, sharedImportMatch.index + sharedImportMatch[0].length);
  
  // Trouver la fin des imports de blocs (avant les imports de variants)
  const variantImportMatch = content.match(/\/\/ Import variants/);
  if (!variantImportMatch) {
    console.error('Could not find variant imports section');
    return;
  }
  
  const afterBlockImports = content.substring(variantImportMatch.index);
  
  // Reconstruire le contenu avec les nouveaux imports
  let newContent = beforeBlockImports + '\n// Import blocks\n' + blockImports + '\n\n' + afterBlockImports;
  
  // Remplacer la méthode registerBlocks
  newContent = newContent.replace(
    /private registerBlocks\(\) \{[\s\S]*?\n  \}/,
    `private registerBlocks() {\n${registrations}\n  }`
  );
  
  // Remplacer le switch dans renderBlock
  newContent = newContent.replace(
    /switch \(blockId\) \{[\s\S]*?default:\s*console\.error/,
    `switch (blockId) {\n${renderCases}\n      default:\n        console.error`
  );
  
  fs.writeFileSync(TEMPLATE_COMPOSER, newContent);
  console.log('✓ Updated TemplateComposer.ts');
}

// Générer le registre du studio
function generateStudioRegistry(blocks) {
  const categoryMap = {
    'hero': 'HERO',
    'header': 'HEADER',
    'services': 'FEATURES',
    'contact': 'CONTACT',
    'testimonials': 'TESTIMONIALS',
    'footer': 'FOOTER',
    'content': 'CONTENT',
    'features': 'FEATURES',
    'gallery': 'GALLERY',
    'faq': 'FAQ',
    'pricing': 'PRICING',
    'cta': 'CTA',
    'layout': 'CONTENT'  // Map layout to CONTENT category
  };
  
  // Générer les imports
  const imports = `import {
${blocks.map(block => `  ${block.var},\n  ${block.renderVar},`).join('\n')}
  
  // Types
  type Block
} from '@awema/templates';
import { BlockCategory } from '@awema/shared';`;

  // Générer le registry
  const registry = blocks.map(block => `  {
    block: ${block.var},
    category: BlockCategory.${categoryMap[block.category] || 'CONTENT'},
    name: '${block.name}',
    description: '${block.description}',
  },`).join('\n');

  // Générer les render functions
  const renderFunctions = blocks.map(block => 
    `  '${block.id}': ${block.renderVar},`
  ).join('\n');

  const template = `${imports}

// Map template block categories to shared BlockCategory enum
const categoryMap: Record<string, BlockCategory> = {
  'hero': BlockCategory.HERO,
  'header': BlockCategory.HEADER,
  'services': BlockCategory.FEATURES,
  'contact': BlockCategory.CONTACT,
  'testimonials': BlockCategory.TESTIMONIALS,
  'footer': BlockCategory.FOOTER,
  'content': BlockCategory.CONTENT,
  'features': BlockCategory.FEATURES,
  'gallery': BlockCategory.GALLERY,
};

export interface BlockDefinition {
  block: Block;
  category: BlockCategory;
  name: string;
  description: string;
  thumbnail?: string;
}

// Define all available blocks with metadata
export const blockRegistry: BlockDefinition[] = [
${registry}
].filter(def => def && def.block); // Filter out any invalid entries

// Helper functions
export function getBlocksByCategory(category: BlockCategory): BlockDefinition[] {
  return blockRegistry.filter(def => def && def.block && def.category === category);
}

export function getBlockById(id: string): BlockDefinition | undefined {
  return blockRegistry.find(def => def && def.block && def.block.id === id);
}

export function getAllCategories(): BlockCategory[] {
  const categories = new Set(blockRegistry.map(def => def.category));
  return Array.from(categories);
}

// Map of block IDs to their render functions
const renderFunctions: Record<string, any> = {
${renderFunctions}
};

export function getBlockRenderFunction(blockId: string): ((props: any, variants?: string[]) => any) | undefined {
  return renderFunctions[blockId];
}`;

  fs.writeFileSync(STUDIO_REGISTRY, template);
  console.log('✓ Updated studio block-registry.ts');
}

// Fonction principale
function main() {
  console.log('🔍 Scanning blocks...');
  const blocks = scanBlocks();
  console.log(`Found ${blocks.length} blocks\n`);
  
  console.log('📝 Generating files...');
  
  // Créer les répertoires si nécessaire
  if (!fs.existsSync(path.dirname(STUDIO_REGISTRY))) {
    fs.mkdirSync(path.dirname(STUDIO_REGISTRY), { recursive: true });
  }
  
  // Générer tous les fichiers
  generateCategoryIndexes(blocks);
  generateMainIndex(blocks);
  generateTemplateComposer(blocks);
  generateStudioRegistry(blocks);
  
  console.log('\n✅ Auto-registration complete!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run build');
  console.log('2. Restart the dev server');
}

// Exécuter le script
main();
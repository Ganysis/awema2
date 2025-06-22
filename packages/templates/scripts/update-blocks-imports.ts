#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

interface BlockInfo {
  category: string;
  fileName: string;
  blockName: string;
  renderName: string;
  importPath: string;
}

// Function to convert kebab-case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Function to scan blocks directory and collect all block information
function scanBlocks(blocksDir: string): BlockInfo[] {
  const blocks: BlockInfo[] = [];
  
  // Read all category directories
  const categories = fs.readdirSync(blocksDir).filter(item => {
    const itemPath = path.join(blocksDir, item);
    return fs.statSync(itemPath).isDirectory() && item !== 'layout';
  });

  for (const category of categories) {
    const categoryPath = path.join(blocksDir, category);
    const files = fs.readdirSync(categoryPath);
    
    // Find all TypeScript files (excluding index.ts and .d.ts files)
    const tsFiles = files.filter(file => 
      file.endsWith('.ts') && 
      !file.endsWith('.d.ts') && 
      file !== 'index.ts'
    );

    for (const file of tsFiles) {
      const fileName = file.replace('.ts', '');
      const blockName = toCamelCase(fileName);
      const renderName = 'render' + blockName.charAt(0).toUpperCase() + blockName.slice(1);
      
      blocks.push({
        category,
        fileName,
        blockName,
        renderName,
        importPath: `./blocks/${category}/${fileName}`
      });
    }
  }

  return blocks.sort((a, b) => {
    // Sort by category first, then by file name
    if (a.category === b.category) {
      return a.fileName.localeCompare(b.fileName);
    }
    return a.category.localeCompare(b.category);
  });
}

// Function to generate import statements
function generateImports(blocks: BlockInfo[]): string {
  const imports = blocks.map(block => 
    `import { ${block.blockName}, ${block.renderName} } from '${block.importPath}';`
  );
  
  return imports.join('\n');
}

// Function to generate registerBlocks method content
function generateRegisterBlocks(blocks: BlockInfo[]): string {
  const lines: string[] = [];
  let currentCategory = '';
  
  for (const block of blocks) {
    if (block.category !== currentCategory) {
      if (currentCategory !== '') {
        lines.push('');
      }
      lines.push(`    // ${block.category}`);
      currentCategory = block.category;
    }
    
    lines.push(`    this.blocks.set('${block.fileName}', ${block.blockName});`);
    lines.push(`    this.renderers.set('${block.fileName}', ${block.renderName});`);
  }
  
  return lines.join('\n');
}

// Function to generate exports for index.ts
function generateExports(blocks: BlockInfo[]): string {
  const exports = blocks.map(block => 
    `export { ${block.blockName}, ${block.renderName} } from '${block.importPath}';`
  );
  
  return exports.join('\n');
}

// Function to update TemplateComposer.ts
function updateTemplateComposer(blocks: BlockInfo[]): void {
  const templateComposerPath = path.join(__dirname, '..', 'src', 'TemplateComposer.ts');
  let content = fs.readFileSync(templateComposerPath, 'utf-8');
  
  // Generate new imports
  const newImports = generateImports(blocks);
  
  // Replace imports section
  const importStart = content.indexOf('// Import blocks');
  const importEnd = content.indexOf('class TemplateComposer');
  
  if (importStart !== -1 && importEnd !== -1) {
    const beforeImports = content.substring(0, importStart);
    const afterImports = content.substring(importEnd);
    
    content = beforeImports + '// Import blocks\n' + newImports + '\n' + afterImports;
  }
  
  // Replace registerBlocks method
  const registerStart = content.indexOf('private registerBlocks() {');
  const registerEnd = content.indexOf('private registerVariants()');
  
  if (registerStart !== -1 && registerEnd !== -1) {
    const methodStart = registerStart + 'private registerBlocks() {'.length;
    const beforeMethod = content.substring(0, methodStart);
    const afterMethod = content.substring(content.lastIndexOf('}', registerEnd) + 1);
    
    const newRegisterContent = generateRegisterBlocks(blocks);
    content = beforeMethod + '\n' + newRegisterContent + '\n  }\n\n  ' + afterMethod.trim();
  }
  
  fs.writeFileSync(templateComposerPath, content);
  console.log('✅ Updated TemplateComposer.ts');
}

// Function to update index.ts
function updateIndex(blocks: BlockInfo[]): void {
  const indexPath = path.join(__dirname, '..', 'src', 'index.ts');
  let content = fs.readFileSync(indexPath, 'utf-8');
  
  // Find the export blocks section
  const exportStart = content.indexOf('// Export blocks');
  const exportEnd = content.indexOf('// Export utility generators');
  
  if (exportStart !== -1 && exportEnd !== -1) {
    const beforeExports = content.substring(0, exportStart);
    const afterExports = content.substring(exportEnd);
    
    const newExports = generateExports(blocks);
    content = beforeExports + '// Export blocks\n' + newExports + '\n\n' + afterExports;
  }
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Updated index.ts');
}

// Main function
function main(): void {
  const blocksDir = path.join(__dirname, '..', 'src', 'blocks');
  
  console.log('🔍 Scanning blocks directory...');
  const blocks = scanBlocks(blocksDir);
  
  console.log(`📦 Found ${blocks.length} blocks:`);
  blocks.forEach(block => {
    console.log(`  - ${block.category}/${block.fileName}`);
  });
  
  console.log('\n📝 Updating files...');
  updateTemplateComposer(blocks);
  updateIndex(blocks);
  
  console.log('\n✨ All files have been updated successfully!');
  console.log('\nNext steps:');
  console.log('1. Run "npm run build" to compile the TypeScript files');
  console.log('2. The updated imports will be automatically included');
}

// Run the script
main();
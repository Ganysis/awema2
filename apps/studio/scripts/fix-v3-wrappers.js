#!/usr/bin/env node

/**
 * Script pour corriger les wrappers V3 et ajouter le support du thème
 */

const fs = require('fs');
const path = require('path');

const blockRegistryPath = path.join(__dirname, '../lib/blocks/block-registry.ts');

console.log('🔧 Correction des wrappers V3...');

// Lire le fichier
let content = fs.readFileSync(blockRegistryPath, 'utf8');

// Liste des renderers V3
const v3Renderers = [
  'Hero',
  'Features',
  'Services',
  'Gallery',
  'Content',
  'Testimonials',
  'Pricing',
  'FAQ',
  'CTA',
  'Contact'
];

// Remplacer chaque wrapper pour ajouter le support du thème et des variantes
v3Renderers.forEach(name => {
  const oldWrapper = `const render${name}V3Perfect = (props: any) => {
  const result = ${name.toLowerCase()}V3.render(props, { isExport: false });
  return result; // Retourner l'objet complet {html, css, js}
};`;

  const newWrapper = `const render${name}V3Perfect = (props: any, variants?: string[]) => {
  // Récupérer le thème depuis le store si disponible
  const theme = typeof window !== 'undefined' 
    ? (window as any).__editorStore?.getState()?.theme 
    : undefined;
  
  const context = { 
    isExport: false,
    theme,
    device: 'desktop'
  };
  
  const result = ${name.toLowerCase()}V3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};`;

  content = content.replace(oldWrapper, newWrapper);
});

// Ajouter l'import du store au début du fichier
if (!content.includes("import { useEditorStore }")) {
  const importIndex = content.indexOf("import { BlockCategory }");
  if (importIndex !== -1) {
    content = content.slice(0, importIndex) + 
      "import { useEditorStore } from '@/lib/store/editor-store';\n" +
      content.slice(importIndex);
  }
}

// Écrire le fichier modifié
fs.writeFileSync(blockRegistryPath, content);

console.log('✅ Wrappers V3 corrigés avec support du thème!');
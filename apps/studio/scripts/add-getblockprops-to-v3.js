#!/usr/bin/env node

/**
 * Script pour ajouter getBlockProps() à tous les renderers V3
 */

const fs = require('fs');
const path = require('path');

const renderersDir = path.join(__dirname, '../lib/v3/renderers');

// Liste des renderers V3 (sans hero qui est déjà fait)
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

// Code à ajouter après getDefaultData()
const getBlockPropsCode = `

  /**
   * Retourne les propriétés éditables du bloc
   * Utilise la méthode de base qui génère automatiquement les props
   */
  getBlockProps(): BlockProp[] {
    // Utilise la méthode de la classe de base qui génère automatiquement
    // les props à partir des données par défaut
    return super.getBlockProps();
  }`;

// Code pour étendre BaseRendererV3
const importCode = `import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';`;

renderers.forEach(file => {
  const filePath = path.join(renderersDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Remplacer implements BlockRenderer par extends BaseRendererV3
  content = content.replace(
    /implements BlockRenderer<(\w+)>/,
    'extends BaseRendererV3<$1>'
  );
  
  // 2. Ajouter les imports nécessaires
  if (!content.includes('BaseRendererV3')) {
    content = content.replace(
      /import { BlockRenderer, RenderResult, RenderContext } from '..\/types';/,
      `import { RenderResult, RenderContext } from '../types';\n${importCode}`
    );
  }
  
  // 3. Ajouter super() dans le constructeur
  if (!content.includes('super()')) {
    content = content.replace(
      /constructor\(\) {/,
      'constructor() {\n    super();'
    );
  }
  
  // 4. Ajouter getBlockProps si elle n'existe pas
  if (!content.includes('getBlockProps()')) {
    // Trouver la position après getDefaultData
    const getDefaultDataMatch = content.match(/getDefaultData\(\)[^}]*}/s);
    if (getDefaultDataMatch) {
      const insertPos = getDefaultDataMatch.index + getDefaultDataMatch[0].length;
      content = content.slice(0, insertPos) + getBlockPropsCode + content.slice(insertPos);
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Mis à jour: ${file}`);
});

console.log('\n✨ Terminé! Tous les renderers V3 ont maintenant getBlockProps()');
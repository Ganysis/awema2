#!/usr/bin/env node

/**
 * Script pour tester tous les blocs V3 et identifier les problèmes
 */

import { getBlockById } from '../lib/blocks/block-registry.ts';

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
  'contact-v3-perfect',
  'header-v3-perfect',
  'footer-v3-perfect'
];

console.log('🧪 Test des blocs V3...\n');

const results = [];

for (const blockId of v3Blocks) {
  console.log(`Testing ${blockId}...`);
  
  try {
    const block = getBlockById(blockId);
    
    if (!block) {
      results.push({
        blockId,
        status: '❌ NOT FOUND'
      });
      continue;
    }

    // Test basic properties
    const props = block.block.props || [];
    const variantProp = props.find(p => p.name === 'variant');
    
    // Test rendering
    let renderOk = true;
    let htmlIssues = [];
    
    try {
      const defaultData = block.block.defaultData || {};
      const result = block.block.render(defaultData);
      
      // Check for [object Object]
      if (result.html && result.html.includes('[object Object]')) {
        renderOk = false;
        htmlIssues.push('Contains [object Object]');
      }
      
      // Check for undefined
      if (result.html && result.html.includes('undefined')) {
        renderOk = false;
        htmlIssues.push('Contains undefined');
      }
      
      // Check CSS and JS
      if (!result.css) {
        htmlIssues.push('No CSS');
      }
      if (!result.js) {
        htmlIssues.push('No JS');
      }
      
    } catch (error) {
      renderOk = false;
      htmlIssues.push(`Render error: ${error.message}`);
    }
    
    results.push({
      blockId,
      status: renderOk ? '✅ OK' : '⚠️  ISSUES',
      name: block.block.name,
      variantOptions: variantProp?.options?.length || 0,
      issues: htmlIssues.length > 0 ? htmlIssues : null
    });
    
  } catch (error) {
    results.push({
      blockId,
      status: '❌ ERROR',
      error: error.message
    });
  }
}

// Display results
console.log('\n📊 RÉSULTATS:\n');

const okCount = results.filter(r => r.status.includes('OK')).length;
const issueCount = results.filter(r => r.status.includes('ISSUES')).length;
const errorCount = results.filter(r => r.status.includes('ERROR') || r.status.includes('NOT FOUND')).length;

console.log(`Total: ${results.length} blocs`);
console.log(`✅ OK: ${okCount}`);
console.log(`⚠️  Avec problèmes: ${issueCount}`);
console.log(`❌ Erreurs: ${errorCount}`);
console.log('\nDétails:\n');

results.forEach(result => {
  console.log(`${result.status} ${result.blockId}`);
  if (result.name) console.log(`   Name: ${result.name}`);
  if (result.variantOptions) console.log(`   Variants: ${result.variantOptions}`);
  if (result.issues) {
    console.log(`   Issues:`);
    result.issues.forEach(issue => console.log(`     - ${issue}`));
  }
  if (result.error) console.log(`   Error: ${result.error}`);
  console.log('');
});

// Summary recommendations
console.log('\n💡 RECOMMANDATIONS:\n');

if (issueCount > 0) {
  console.log('Les blocs suivants ont des problèmes à corriger:');
  results
    .filter(r => r.status.includes('ISSUES'))
    .forEach(r => {
      console.log(`- ${r.blockId}:`);
      r.issues.forEach(issue => console.log(`  * ${issue}`));
    });
}

if (errorCount > 0) {
  console.log('\nLes blocs suivants ont des erreurs:');
  results
    .filter(r => r.status.includes('ERROR') || r.status.includes('NOT FOUND'))
    .forEach(r => console.log(`- ${r.blockId}: ${r.error || 'Not found'}`));
}

console.log('\n✨ Test terminé!');
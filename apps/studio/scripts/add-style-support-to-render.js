const fs = require('fs');
const path = require('path');

console.log('\n🎨 AJOUT DU SUPPORT DES STYLES AUX BLOCS\n');

// Fonction pour convertir les styles en CSS inline
function styleToCss(style) {
  if (!style) return '';
  
  let css = '';
  
  if (style.backgroundColor) {
    css += `background-color: ${style.backgroundColor}; `;
  }
  
  if (style.backgroundGradient) {
    css += `background: ${style.backgroundGradient}; `;
  }
  
  if (style.paddingY) {
    css += `padding-top: ${style.paddingY}; padding-bottom: ${style.paddingY}; `;
  }
  
  return css;
}

// Fichier de patch pour le rendu
const renderPatch = `
// Patch pour ajouter le support des styles aux blocs
export function wrapBlockWithStyle(html, blockData) {
  if (!blockData.style) {
    return html;
  }
  
  const styleString = styleToCss(blockData.style);
  if (!styleString) {
    return html;
  }
  
  // Wrapper le bloc dans une div avec les styles
  return \`<div class="block-wrapper" style="\${styleString}">\${html}</div>\`;
}

function styleToCss(style) {
  if (!style) return '';
  
  let css = '';
  
  if (style.backgroundColor) {
    css += \`background-color: \${style.backgroundColor}; \`;
  }
  
  if (style.backgroundGradient) {
    css += \`background: \${style.backgroundGradient}; \`;
  }
  
  if (style.paddingY) {
    css += \`padding-top: \${style.paddingY}; padding-bottom: \${style.paddingY}; \`;
  }
  
  return css;
}
`;

// Créer le fichier de patch
const patchPath = path.join(__dirname, '../lib/v3/utils/style-wrapper.ts');
fs.writeFileSync(patchPath, renderPatch);
console.log('✅ Fichier de patch créé : lib/v3/utils/style-wrapper.ts');

// Patch pour le composant BlockItemWithCSS.tsx
const blockItemPatch = `
// Dans BlockRealPreview, après la ligne 51 (const rendered = renderFn(...))
// Ajouter le support des styles du bloc

if (rendered && typeof rendered === 'object') {
  let html = rendered.html || '';
  
  // Appliquer les styles du bloc si présents
  if (block.style) {
    const styleString = styleToCss(block.style);
    if (styleString) {
      html = \`<div style="\${styleString}">\${html}</div>\`;
    }
  }
  
  setPreview({
    html: html,
    css: rendered.css || ''
  });
}

function styleToCss(style) {
  if (!style) return '';
  
  let css = '';
  
  if (style.backgroundColor) {
    css += \`background-color: \${style.backgroundColor}; \`;
  }
  
  if (style.backgroundGradient) {
    css += \`background: \${style.backgroundGradient}; \`;
  }
  
  if (style.paddingY) {
    css += \`padding-top: \${style.paddingY}; padding-bottom: \${style.paddingY}; \`;
  }
  
  return css.trim();
}
`;

console.log('\n📝 Instructions pour patcher BlockItemWithCSS.tsx :');
console.log('1. Ouvrir components/editor/BlockItemWithCSS.tsx');
console.log('2. Remplacer les lignes 53-58 par le code suivant :');
console.log('```typescript');
console.log(blockItemPatch);
console.log('```');

// Script pour appliquer automatiquement le style dans l'export
const exportPatch = `
// Dans le service d'export, wrapper chaque bloc avec ses styles
export function renderBlockWithStyles(block, renderFn) {
  const rendered = renderFn(block.props || {}, block.children || []);
  
  if (!block.style || !rendered) {
    return rendered;
  }
  
  const styleString = Object.entries(block.style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return \`\${cssKey}: \${value}\`;
    })
    .join('; ');
  
  if (typeof rendered === 'string') {
    return \`<div style="\${styleString}">\${rendered}</div>\`;
  }
  
  if (rendered.html) {
    rendered.html = \`<div style="\${styleString}">\${rendered.html}</div>\`;
  }
  
  return rendered;
}
`;

console.log('\n✅ RÉSUMÉ DES MODIFICATIONS NÉCESSAIRES :');
console.log('═══════════════════════════════════════');
console.log('1. ✅ Styles ajoutés aux blocs dans la base de données');
console.log('2. 🔧 Support des styles à ajouter dans BlockItemWithCSS.tsx');
console.log('3. 🔧 Support des styles à ajouter dans le service d\'export');
console.log('4. 🔧 Wrapper de style créé dans lib/v3/utils/style-wrapper.ts\n');

console.log('📌 Les blocs ont maintenant des propriétés style avec :');
console.log('   • backgroundColor : couleur de fond unie');
console.log('   • backgroundGradient : gradient CSS');
console.log('   • paddingY : espacement vertical\n');

console.log('🚀 Prochaine étape : Implémenter le support dans le rendu !');
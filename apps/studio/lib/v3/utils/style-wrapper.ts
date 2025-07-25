
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
  return `<div class="block-wrapper" style="${styleString}">${html}</div>`;
}

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

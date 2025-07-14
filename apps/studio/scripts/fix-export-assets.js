#!/usr/bin/env node

/**
 * Script pour ajouter les assets manquants dans l'export
 */

const fs = require('fs');
const path = require('path');

// Créer les placeholders d'images
const PLACEHOLDER_IMAGES = [
  // Services
  'service-vitrine.jpg',
  'service-ecommerce.jpg', 
  'service-webapp.jpg',
  'service-seo.jpg',
  // Features
  'feature-speed.jpg',
  'feature-security.jpg',
  'feature-design.jpg',
  'feature-support.jpg',
  // Portfolio
  'portfolio/luxe-fashion.jpg',
  'portfolio/techcorp-dashboard.jpg',
  'portfolio/restaurant-gourmet.jpg',
  'portfolio/startup-saas.jpg',
  'portfolio/immobilier-prestige.jpg',
  'portfolio/blog-lifestyle.jpg',
  // Testimonials
  'testimonials/sophie-martin.jpg',
  'testimonials/pierre-dubois.jpg',
  'testimonials/marie-laurent.jpg',
  // Autres
  'hero-bg.jpg',
  'logo.png',
  'logo-white.png'
];

// Créer un SVG placeholder
function createPlaceholderSVG(text, width = 800, height = 600, bgColor = '#e5e7eb', textColor = '#6b7280') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-size="24" fill="${textColor}">
      ${text}
    </text>
  </svg>`;
}

// Créer le CSS avec les fonts Inter via CDN
function generateFontCSS() {
  return `/* Inter Font via Google Fonts CDN */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* Fallback si CDN non disponible */
body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}`;
}

// Corriger le JS pour éviter les doublons
function fixJavaScriptCode(jsContent) {
  // Compter les occurrences de observerOptions
  const observerMatches = jsContent.match(/const observerOptions/g) || [];
  
  if (observerMatches.length > 1) {
    // Remplacer les occurrences supplémentaires par des noms uniques
    let counter = 1;
    jsContent = jsContent.replace(/const observerOptions/g, (match, offset) => {
      if (counter === 1) {
        counter++;
        return match; // Garder la première
      }
      return `const observerOptions${counter++}`;
    });
  }
  
  return jsContent;
}

// Exporter les fixes
module.exports = {
  PLACEHOLDER_IMAGES,
  createPlaceholderSVG,
  generateFontCSS,
  fixJavaScriptCode,
  
  // Générer tous les assets placeholders
  generatePlaceholderAssets() {
    const assets = [];
    
    // Ajouter les images placeholder
    PLACEHOLDER_IMAGES.forEach(imagePath => {
      const name = path.basename(imagePath, path.extname(imagePath));
      const svgContent = createPlaceholderSVG(name.replace(/-/g, ' ').toUpperCase());
      
      assets.push({
        path: `assets/${imagePath}`,
        content: Buffer.from(svgContent)
      });
    });
    
    // Ajouter le favicon
    const faviconSVG = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#3b82f6" rx="4"/>
      <text x="16" y="22" text-anchor="middle" font-family="system-ui" font-size="20" font-weight="bold" fill="white">A</text>
    </svg>`;
    
    assets.push({
      path: 'favicon.ico',
      content: Buffer.from(faviconSVG)
    });
    
    return assets;
  }
};

// Si exécuté directement, afficher les instructions
if (require.main === module) {
  console.log('🔧 Correction des assets pour l\'export\n');
  console.log('Ce module fournit :');
  console.log('- generatePlaceholderAssets() : Génère toutes les images placeholder');
  console.log('- generateFontCSS() : CSS pour charger Inter via CDN');
  console.log('- fixJavaScriptCode() : Corrige les variables dupliquées');
  console.log('\nPour l\'utiliser, importez-le dans static-export-simplified.ts');
}
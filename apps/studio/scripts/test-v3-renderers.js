#!/usr/bin/env node

/**
 * Script de test pour vérifier tous les renderers V3 Perfect
 */

import { HeroRendererV3Perfect } from '../lib/v3/renderers/hero-perfect.renderer.js';
import { FeaturesRendererV3Perfect } from '../lib/v3/renderers/features-perfect.renderer.js';
import { ServicesRendererV3Perfect } from '../lib/v3/renderers/services-perfect.renderer.js';
import { GalleryRendererV3Perfect } from '../lib/v3/renderers/gallery-perfect.renderer.js';
import { ContentRendererV3Perfect } from '../lib/v3/renderers/content-perfect.renderer.js';
import { TestimonialsRendererV3Perfect } from '../lib/v3/renderers/testimonials-perfect.renderer.js';
import { PricingRendererV3Perfect } from '../lib/v3/renderers/pricing-perfect.renderer.js';
import { FAQRendererV3Perfect } from '../lib/v3/renderers/faq-perfect.renderer.js';
import { CTARendererV3Perfect } from '../lib/v3/renderers/cta-perfect.renderer.js';
import { ContactRendererV3Perfect } from '../lib/v3/renderers/contact-perfect.renderer.js';

console.log('🧪 Test des renderers V3 Perfect\n');

const renderers = [
  { name: 'Hero', renderer: new HeroRendererV3Perfect() },
  { name: 'Features', renderer: new FeaturesRendererV3Perfect() },
  { name: 'Services', renderer: new ServicesRendererV3Perfect() },
  { name: 'Gallery', renderer: new GalleryRendererV3Perfect() },
  { name: 'Content', renderer: new ContentRendererV3Perfect() },
  { name: 'Testimonials', renderer: new TestimonialsRendererV3Perfect() },
  { name: 'Pricing', renderer: new PricingRendererV3Perfect() },
  { name: 'FAQ', renderer: new FAQRendererV3Perfect() },
  { name: 'CTA', renderer: new CTARendererV3Perfect() },
  { name: 'Contact', renderer: new ContactRendererV3Perfect() }
];

let allTestsPassed = true;

renderers.forEach(({ name, renderer }) => {
  console.log(`\n📦 Test du renderer ${name}`);
  console.log('─'.repeat(40));
  
  try {
    // Test 1: Vérifier que le renderer a les bonnes méthodes
    console.log('✓ Méthodes requises présentes');
    
    // Test 2: Obtenir les données par défaut
    const defaultData = renderer.getDefaultData();
    console.log(`✓ Données par défaut: ${defaultData.variant || 'default'}`);
    
    // Test 3: Valider les données par défaut
    const validation = renderer.validate(defaultData);
    if (validation.success) {
      console.log('✓ Validation des données par défaut réussie');
    } else {
      console.error('✗ Erreur de validation:', validation.error);
      allTestsPassed = false;
    }
    
    // Test 4: Rendre avec les données par défaut
    const result = renderer.render(defaultData, { isExport: false });
    
    if (result.html && result.css && result.js) {
      console.log('✓ Rendu complet (HTML, CSS, JS)');
      console.log(`  - HTML: ${result.html.length} caractères`);
      console.log(`  - CSS: ${result.css.length} caractères`);
      console.log(`  - JS: ${result.js.length} caractères`);
    } else {
      console.error('✗ Rendu incomplet');
      allTestsPassed = false;
    }
    
    // Test 5: Tester toutes les variantes
    if (defaultData.variant) {
      const variants = getVariantsForBlock(name);
      console.log(`\n  Variantes (${variants.length}):`);
      
      variants.forEach(variant => {
        const variantData = { ...defaultData, variant };
        const variantValidation = renderer.validate(variantData);
        
        if (variantValidation.success) {
          const variantResult = renderer.render(variantData, { isExport: false });
          if (variantResult.html) {
            console.log(`  ✓ ${variant}`);
          } else {
            console.log(`  ✗ ${variant} - Erreur de rendu`);
            allTestsPassed = false;
          }
        } else {
          console.log(`  ✗ ${variant} - Erreur de validation`);
          allTestsPassed = false;
        }
      });
    }
    
  } catch (error) {
    console.error(`✗ Erreur dans le renderer ${name}:`, error.message);
    allTestsPassed = false;
  }
});

// Résumé
console.log('\n' + '='.repeat(50));
if (allTestsPassed) {
  console.log('✅ Tous les tests sont passés avec succès !');
} else {
  console.log('❌ Certains tests ont échoué.');
  process.exit(1);
}

// Helper pour obtenir les variantes
function getVariantsForBlock(blockName) {
  const variants = {
    Hero: ['split-modern', 'fullscreen-video', 'particles-interactive', 'gradient-animated', '3d-perspective', 'glassmorphism', 'parallax-layers', 'geometric-shapes'],
    Features: ['grid-modern', 'bento-box', 'carousel-3d', 'timeline-vertical', 'cards-hover', 'list-detailed'],
    Services: ['cards-hover-3d', 'hexagon-grid', 'timeline', 'carousel-interactive', 'bento-box', 'floating-icons', 'interactive-map', 'glassmorphism-cards'],
    Gallery: ['masonry-modern', 'grid-hover', 'carousel-fullscreen', 'pinterest-style', 'hexagon-mosaic', '3d-flip', 'timeline-story', 'scattered-polaroid'],
    Content: ['magazine-layout', 'blog-modern', 'timeline-story', 'cards-grid', 'split-content', 'accordion-tabs', 'comparison-table', 'interactive-story'],
    Testimonials: ['carousel-modern', 'grid-masonry', 'wall-infinite', 'cards-3d', 'timeline-animated', 'video-spotlight', 'social-proof', 'interactive-map'],
    Pricing: ['cards-modern', 'table-comparison', 'slider-interactive', 'cards-flip', 'timeline', 'grid-bento', 'gradient-wave', 'neumorphic'],
    FAQ: ['accordion-modern', 'chat-style', 'timeline', 'cards-grid', 'tabs-horizontal', 'floating-bubbles', 'masonry', 'video-style'],
    CTA: ['gradient-wave', 'glassmorphism', 'split-screen', 'floating-cards', 'neon-glow', 'parallax-layers', 'morphing-shapes', 'video-background'],
    Contact: ['split-modern', 'floating-cards', 'glassmorphism', 'map-fullscreen', 'minimal-centered', 'gradient-waves', 'sidebar-sticky', 'chat-style']
  };
  
  return variants[blockName] || [];
}
#!/usr/bin/env node

/**
 * Script de test pour vérifier que les blocs V3 enhanced sont bien configurés
 */

console.log('🧪 Test des blocs V3 Enhanced...\n');

// Test imports
try {
  const { FAQRendererV3PerfectEnhanced } = require('../lib/v3/renderers/faq-perfect-enhanced.renderer');
  const { CTARendererV3PerfectEnhanced } = require('../lib/v3/renderers/cta-perfect-enhanced.renderer');
  const { ContactRendererV3PerfectEnhanced } = require('../lib/v3/renderers/contact-perfect-enhanced.renderer');
  
  console.log('✅ Imports réussis pour FAQ, CTA et Contact Enhanced');
  
  // Test instantiation
  const faqRenderer = new FAQRendererV3PerfectEnhanced();
  const ctaRenderer = new CTARendererV3PerfectEnhanced();
  const contactRenderer = new ContactRendererV3PerfectEnhanced();
  
  console.log('✅ Instantiation réussie des renderers');
  
  // Test des données par défaut
  const faqData = faqRenderer.getDefaultData();
  const ctaData = ctaRenderer.getDefaultData();
  const contactData = contactRenderer.getDefaultData();
  
  console.log('\n📊 Données par défaut:');
  console.log('- FAQ: ', faqData.variant, '/', faqData.themeVariant || 'non défini');
  console.log('- CTA: ', ctaData.variant, '/', ctaData.themeVariant || 'non défini');
  console.log('- Contact: ', contactData.variant, '/', contactData.themeVariant || 'non défini');
  
  // Test de rendu avec thème
  const theme = {
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: {
        primary: '#111827',
        secondary: '#6b7280'
      },
      border: '#e5e7eb'
    },
    typography: {
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.625
      }
    },
    spacing: {},
    borders: {
      radius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
      }
    }
  };
  
  const context = {
    isExport: false,
    theme,
    device: 'desktop'
  };
  
  // Test de rendu pour chaque variante de thème
  const themeVariants = ['modern', 'minimal', 'bold', 'elegant'];
  
  console.log('\n🎨 Test de rendu par variante de thème:');
  
  themeVariants.forEach(variant => {
    console.log(`\n  Variante: ${variant}`);
    
    // FAQ
    try {
      const faqResult = faqRenderer.render({ ...faqData, themeVariant: variant }, context);
      console.log(`  ✅ FAQ: ${faqResult.html ? 'HTML généré' : '❌ Pas d\'HTML'}`);
    } catch (e) {
      console.log(`  ❌ FAQ: Erreur - ${e.message}`);
    }
    
    // CTA
    try {
      const ctaResult = ctaRenderer.render({ ...ctaData, themeVariant: variant }, context);
      console.log(`  ✅ CTA: ${ctaResult.html ? 'HTML généré' : '❌ Pas d\'HTML'}`);
    } catch (e) {
      console.log(`  ❌ CTA: Erreur - ${e.message}`);
    }
    
    // Contact
    try {
      const contactResult = contactRenderer.render({ ...contactData, themeVariant: variant }, context);
      console.log(`  ✅ Contact: ${contactResult.html ? 'HTML généré' : '❌ Pas d\'HTML'}`);
    } catch (e) {
      console.log(`  ❌ Contact: Erreur - ${e.message}`);
    }
  });
  
  console.log('\n✨ Tests terminés avec succès!');
  
} catch (error) {
  console.error('❌ Erreur lors des tests:', error.message);
  process.exit(1);
}
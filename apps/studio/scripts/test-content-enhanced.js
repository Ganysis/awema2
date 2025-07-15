/**
 * Script de test pour Content V3 Enhanced
 */

// Import du renderer
const { ContentRendererV3PerfectEnhanced } = require('../lib/v3/renderers/content-perfect-enhanced.renderer');

// Créer une instance
const renderer = new ContentRendererV3PerfectEnhanced.ContentRendererV3PerfectEnhanced();

// Données de test
const testData = {
  id: 'content-test',
  variant: 'magazine-layout',
  title: 'Notre Histoire',
  subtitle: 'Une aventure qui a commencé il y a 20 ans',
  content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  meta: {
    author: 'Jean Dupont',
    date: '15 Janvier 2025',
    readingTime: 5
  }
};

// Test avec différents styles
const styles = ['modern', 'minimal', 'bold', 'elegant'];

styles.forEach(style => {
  console.log(`\n📝 Test Content V3 Enhanced - Style: ${style}`);
  console.log('='.repeat(50));
  
  const dataWithStyle = { ...testData, variant: style };
  
  try {
    const result = renderer.render(dataWithStyle, {
      isExport: false,
      theme: {
        colors: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          text: '#1F2937',
          textSecondary: '#6B7280',
          background: '#FFFFFF',
          surface: '#F9FAFB',
          border: '#E5E7EB'
        },
        typography: {
          fontHeading: "'Inter', sans-serif",
          fontBody: "'Inter', sans-serif"
        }
      }
    });
    
    console.log('✅ Rendu réussi');
    console.log('HTML length:', result.html?.length || 0);
    console.log('CSS length:', result.css?.length || 0);
    console.log('JS length:', result.js?.length || 0);
    console.log('HTML preview:', result.html?.substring(0, 200) + '...');
    
    // Vérifier que le style est bien appliqué
    if (result.html?.includes(`data-style-variant="${style}"`)) {
      console.log('✅ Style variant correctement appliqué');
    } else {
      console.log('❌ Style variant non trouvé dans le HTML');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
});

console.log('\n✨ Test terminé');
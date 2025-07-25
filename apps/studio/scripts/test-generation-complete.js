#!/usr/bin/env node

/**
 * Test complet de génération avec intégration dans l'éditeur
 */

require('dotenv').config({ path: '.env.local' });

// Import des services
const { DeepSeekService } = require('../lib/services/deepseek.service');
const { TemplateGeneratorEngine } = require('../lib/services/template-generator-engine');
const { AdaptiveTemplateService } = require('../lib/services/adaptive-template.service');
const { ContentPersonalizationService } = require('../lib/services/content-personalization.service');

async function testGenerationComplete() {
  console.log('🚀 Test complet de génération de site avec DeepSeek\n');
  
  // Données client test
  const clientData = {
    businessName: 'Plomberie Express 24/7',
    businessType: 'plombier',
    legalStatus: 'SARL',
    yearEstablished: 2010,
    
    // Services et zones
    services: [
      'Dépannage urgence fuite',
      'Débouchage canalisation',
      'Installation sanitaire',
      'Rénovation salle de bain'
    ],
    serviceAreas: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine'],
    is24x7Available: true,
    
    // Portfolio et références
    hasGallery: true,
    hasTestimonials: true,
    
    // Contact
    phone: '01 23 45 67 89',
    email: 'contact@plomberieexpress.fr',
    address: '123 Avenue de la République, 75011 Paris',
    
    // Préférences
    stylePreference: 'modern',
    colorPreference: 'professional'
  };
  
  try {
    // 1. Test DeepSeek
    console.log('🤖 1. Test d\'analyse avec DeepSeek...');
    const deepseek = new DeepSeekService({
      apiKey: process.env.DEEPSEEK_API_KEY
    });
    
    console.time('Analyse DeepSeek');
    const aiAnalysis = await deepseek.analyzeBusinessProfile(clientData);
    console.timeEnd('Analyse DeepSeek');
    
    console.log('✅ Analyse complétée:');
    console.log('- Priorités:', aiAnalysis.priorities?.slice(0, 3).join(', '));
    console.log('- Recommandations template:', Object.entries(aiAnalysis.templateRecommendations || {})
      .filter(([k, v]) => v > 50)
      .map(([k, v]) => `${k}: ${v}%`)
      .join(', '));
    
    // 2. Test génération de templates
    console.log('\n🎨 2. Génération de templates...');
    const templateEngine = new TemplateGeneratorEngine();
    
    console.time('Génération templates');
    const templates = await templateEngine.generateTemplates(clientData, 3);
    console.timeEnd('Génération templates');
    
    console.log(`✅ ${templates.length} templates générés:`);
    templates.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.name} (score: ${t.score}, blocs: ${t.blocks.length})`);
    });
    
    // 3. Test génération de contenu personnalisé
    console.log('\n📝 3. Génération de contenu personnalisé...');
    const contentService = new ContentPersonalizationService();
    
    console.time('Génération contenu');
    const personalizedContent = await contentService.generatePersonalizedContent(
      clientData,
      aiAnalysis
    );
    console.timeEnd('Génération contenu');
    
    console.log('✅ Contenu généré:');
    console.log('- Hero:', personalizedContent.hero?.title?.substring(0, 60) + '...');
    console.log('- Services:', personalizedContent.services?.length || 0);
    console.log('- Features:', personalizedContent.features?.length || 0);
    
    // 4. Test variations adaptatives
    console.log('\n🔄 4. Génération de variations adaptatives...');
    const adaptiveService = new AdaptiveTemplateService();
    
    console.time('Variations adaptatives');
    const variations = await adaptiveService.generateUniqueVariations(
      clientData,
      aiAnalysis,
      2
    );
    console.timeEnd('Variations adaptatives');
    
    console.log(`✅ ${variations.length} variations créées:`);
    variations.forEach((v, i) => {
      console.log(`   ${i + 1}. ${v.name} - ${v.description}`);
      console.log(`      Structure: ${v.structure}, Theme: ${v.theme.colors.primary}`);
    });
    
    // 5. Test de l'intégration complète
    console.log('\n🏗️ 5. Test de génération de site complet...');
    
    const response = await fetch('http://localhost:3000/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientData,
        config: {
          quality: 'premium',
          enableAI: true,
          provider: 'deepseek',
          wordsPerPage: 1000,
          enableCache: true
        }
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Site généré avec succès!');
      console.log('- Pages:', result.stats?.totalPages);
      console.log('- Blocs:', result.stats?.totalBlocks);
      console.log('- Temps:', result.stats?.generationTime + 's');
      console.log('- Coût estimé:', result.stats?.cost + '€');
    } else {
      console.error('❌ Erreur génération site:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Lancer le test
testGenerationComplete().then(() => {
  console.log('\n✨ Test terminé!');
  process.exit(0);
}).catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});
#!/usr/bin/env ts-node

import { SEOAIEngineService } from '../lib/services/seo-ai-engine.service';
import { SEOContentGeneratorService } from '../lib/services/seo-content-generator.service';
import { AdvancedSEOService } from '../lib/services/advanced-seo.service';
import { BusinessInfo } from '@awema/shared';

async function testSEOServices() {
  console.log('🧪 Test des services SEO AWEMA\n');

  // Données de test
  const testBusinessInfo: BusinessInfo = {
    companyName: 'Plomberie Express',
    industry: {
      category: 'plumber',
      subCategory: 'residential',
      keywords: ['plomberie', 'plombier', 'urgence']
    },
    description: 'Entreprise de plomberie professionnelle',
    targetAudience: {} as any,
    socialMedia: {},
    branding: {
      colors: { primary: '#0066CC' },
      values: []
    },
    services: [
      { id: '1', name: 'Dépannage urgence', description: 'Intervention 24/7', features: [], category: 'urgence' },
      { id: '2', name: 'Installation sanitaire', description: 'Pose complète', features: [], category: 'installation' },
      { id: '3', name: 'Détection de fuite', description: 'Technologie avancée', features: [], category: 'diagnostic' }
    ],
    location: {
      serviceArea: ['Paris', 'Boulogne', 'Neuilly'],
      isOnline: false
    },
    contact: {
      phone: '01 23 45 67 89',
      email: 'contact@plomberie-express.fr',
      address: {
        street: '123 rue de la Paix',
        city: 'Paris',
        state: '',
        postalCode: '75001',
        country: 'France'
      },
      hours: {}
    }
  };

  try {
    // Test 1: SEO AI Engine
    console.log('1️⃣ Test SEO AI Engine\n');
    const aiEngine = new SEOAIEngineService(testBusinessInfo);
    
    const analysis = await aiEngine.analyzePage(
      'Services de plomberie',
      'Nous sommes experts en plomberie à Paris',
      {
        title: 'Plombier Paris - Dépannage Urgent',
        description: 'Plombier professionnel à Paris'
      }
    );
    
    console.log(`✅ Score SEO: ${analysis.score}/100`);
    console.log(`   Issues trouvées: ${analysis.issues.length}`);
    console.log(`   Suggestions: ${analysis.suggestions.length}\n`);

    // Test 2: Content Generator
    console.log('2️⃣ Test Content Generator\n');
    const contentGen = new SEOContentGeneratorService({
      business: {
        name: testBusinessInfo.companyName,
        type: testBusinessInfo.industry.category
      },
      services: testBusinessInfo.services
    });

    const content = await contentGen.generateContent('plomberie', {
      targetKeywords: ['plombier paris', 'urgence plomberie'],
      includeFAQ: true
    });

    console.log(`✅ Titre généré: ${content.title}`);
    console.log(`   Sections: ${content.sections.length}`);
    console.log(`   FAQ: ${content.faq?.length || 0} questions\n`);

    // Test 3: Advanced SEO Service
    console.log('3️⃣ Test Advanced SEO Service\n');
    const seoService = new AdvancedSEOService({
      business: {
        name: testBusinessInfo.companyName,
        type: testBusinessInfo.industry.category
      }
    });

    const metaTags = seoService.generateMetaTags({
      title: 'Test Title',
      description: 'Test Description'
    });

    console.log('✅ Meta tags générés:');
    console.log(metaTags.substring(0, 200) + '...\n');

    // Test 4: Voice Search Optimization
    console.log('4️⃣ Test Voice Search Optimization\n');
    const voiceSearch = aiEngine.generateVoiceSearchOptimization(
      'plombier',
      'Paris'
    );

    console.log(`✅ Questions vocales: ${voiceSearch.questions.length}`);
    console.log(`   Exemple: "${voiceSearch.questions[0]}"\n`);

    // Test 5: Keyword Analysis
    console.log('5️⃣ Test Keyword Analysis\n');
    const keywords = await aiEngine.analyzeKeywords([
      'plombier paris',
      'dépannage plomberie',
      'fuite d\'eau'
    ]);

    keywords.forEach(kw => {
      console.log(`✅ ${kw.keyword}: Volume ${kw.searchVolume}, Difficulté ${kw.difficulty}/100`);
    });

    console.log('\n✨ Tous les tests SEO sont passés avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
}

// Exécuter les tests
testSEOServices().catch(console.error);
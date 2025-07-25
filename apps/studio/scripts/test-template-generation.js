#!/usr/bin/env node

/**
 * Script de test pour la génération de templates avec IA
 */

require('dotenv').config({ path: '.env.local' });

async function testTemplateGeneration() {
  console.log('🧪 Test de génération de templates avec IA\n');

  // Données de test d'un client plombier
  const testClientData = {
    businessName: 'Plomberie Express 24/7',
    businessType: 'plombier',
    legalStatus: 'SARL',
    siret: '12345678901234',
    yearEstablished: 2010,
    teamSize: '5-10',
    familyBusiness: true,
    
    // Histoire et valeurs
    founderStory: 'Entreprise familiale depuis 3 générations, spécialisée dans les interventions urgentes',
    uniqueSellingPoint: 'Intervention en moins de 30 minutes, 24/7, sans majoration week-end',
    companyValues: ['Rapidité', 'Transparence', 'Professionnalisme', 'Prix justes'],
    
    // Services
    services: [
      'Dépannage urgence fuite',
      'Débouchage canalisation',
      'Installation sanitaire',
      'Rénovation salle de bain',
      'Détection de fuite',
      'Entretien chaudière'
    ],
    
    // Zones et disponibilité
    serviceAreas: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Issy-les-Moulineaux'],
    is24x7Available: true,
    availability: {
      is24x7: true,
      emergencyResponseTime: '30 minutes'
    },
    
    // Portfolio et témoignages
    hasGallery: true,
    hasTestimonials: true,
    testimonials: [
      { text: 'Intervention rapide et efficace!', author: 'M. Dupont', rating: 5 },
      { text: 'Prix transparent, travail impeccable', author: 'Mme Martin', rating: 5 }
    ],
    
    // Préférences
    stylePreference: 'modern',
    colorPreference: 'professional',
    pricePositioning: 'standard',
    
    // Contact
    phone: '01 23 45 67 89',
    email: 'contact@plomberieexpress.fr',
    address: '123 Avenue de la République, 75011 Paris'
  };

  try {
    // 1. Tester l'API de chargement des templates
    console.log('📋 Test 1: Chargement des templates disponibles...');
    const templatesResponse = await fetch('http://localhost:3000/api/templates');
    if (templatesResponse.ok) {
      const templates = await templatesResponse.json();
      console.log(`✅ ${templates.length} templates disponibles`);
      templates.forEach(t => {
        console.log(`   - ${t.name}: ${t.description}`);
      });
    } else {
      console.error('❌ Erreur chargement templates:', templatesResponse.status);
    }

    // 2. Tester la génération de variantes
    console.log('\n🎨 Test 2: Génération de variantes personnalisées...');
    const variantsResponse = await fetch('http://localhost:3000/api/templates/generate-variants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientData: testClientData,
        templateIds: ['urgency-first', 'trust-builder', 'local-hero']
      })
    });

    if (variantsResponse.ok) {
      const variants = await variantsResponse.json();
      console.log(`✅ ${variants.length} variantes générées avec succès`);
      
      variants.forEach((v, i) => {
        console.log(`\n📄 Variante ${i + 1}: ${v.name}`);
        console.log(`   Description: ${v.description}`);
        console.log(`   Score: ${v.score}/100`);
        console.log(`   Blocs: ${v.blocks.length}`);
        console.log(`   Theme: ${v.theme.colors.primary} / ${v.theme.colors.secondary}`);
        
        if (v.aiRecommendations && v.aiRecommendations.length > 0) {
          console.log(`   Recommandations IA:`);
          v.aiRecommendations.forEach(rec => console.log(`     - ${rec}`));
        }
      });
    } else {
      const error = await variantsResponse.text();
      console.error('❌ Erreur génération variantes:', error);
    }

    // 3. Tester la génération complète d'un site
    console.log('\n🏗️ Test 3: Génération complète d\'un site...');
    const siteResponse = await fetch('http://localhost:3000/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientData: testClientData,
        config: {
          quality: 'premium',
          enableAI: true,
          provider: 'deepseek',
          wordsPerPage: 1500,
          enableCache: true
        }
      })
    });

    if (siteResponse.ok) {
      const result = await siteResponse.json();
      console.log(`✅ Site généré: ${result.message}`);
      
      if (result.site && result.site.pages) {
        console.log(`\n📑 Pages générées:`);
        result.site.pages.forEach(page => {
          console.log(`   - ${page.name} (/${page.slug}) - ${page.blocks.length} blocs`);
        });
      }
      
      if (result.stats) {
        console.log(`\n📊 Statistiques:`);
        console.log(`   - Pages: ${result.stats.totalPages}`);
        console.log(`   - Blocs: ${result.stats.totalBlocks || 'N/A'}`);
        console.log(`   - Temps: ${result.stats.generationTime || 'N/A'}`);
      }
    } else {
      const error = await siteResponse.json();
      console.error('❌ Erreur génération site:', error);
    }

    // 4. Vérifier le statut des services
    console.log('\n🔧 Test 4: Statut des services...');
    const statusResponse = await fetch('http://localhost:3000/api/generate-site');
    if (statusResponse.ok) {
      const status = await statusResponse.json();
      console.log('✅ Configuration des services:');
      console.log(`   - DeepSeek: ${status.configured.deepseek ? '✅' : '❌'}`);
      console.log(`   - Claude: ${status.configured.claude ? '✅' : '❌'}`);
      console.log(`   - OpenAI: ${status.configured.openai ? '✅' : '❌'}`);
      
      if (status.cacheStats) {
        console.log(`\n📦 Cache:`);
        console.log(`   - Entrées: ${status.cacheStats.entries}`);
        console.log(`   - Taille: ${status.cacheStats.size}`);
      }
    }

  } catch (error) {
    console.error('\n❌ Erreur lors des tests:', error);
  }

  console.log('\n✨ Tests terminés!');
}

// Lancer les tests
testTemplateGeneration().catch(console.error);
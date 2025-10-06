/**
 * Script de test pour le service NetlifyMockupGenerator
 * AWEMA 3.0 - Test Agent 3
 */

import { netlifyMockupGenerator } from './lib/services/netlify-mockup-generator.service';
import { ClientFormData } from './types/mockup.types';

async function testMockupGeneration() {
  console.log('🧪 [TEST] Démarrage du test de génération de mockups...\n');

  // Données de test d'un client plombier
  const testFormData: ClientFormData = {
    businessName: 'Plomberie Martin',
    businessType: 'plombier',
    location: 'Lyon 7ème',
    phone: '04 72 00 00 00',
    email: 'contact@plomberie-martin.fr',
    description: 'Expert en plomberie depuis 15 ans, interventions rapides 7j/7',
    services: [
      'Dépannage d\'urgence',
      'Installation sanitaire',
      'Rénovation salle de bain',
      'Détection de fuites'
    ]
  };

  try {
    // Configuration des événements pour suivre le progress
    netlifyMockupGenerator.on('mockups.generation.started', (event) => {
      console.log('🚀 Génération démarrée pour:', event.data.formData?.businessName);
    });

    netlifyMockupGenerator.on('mockups.generation.progress', (event) => {
      const { current, total, currentTemplate } = event.data.progress || {};
      console.log(`📋 Progress: ${current}/${total} - Traitement de ${currentTemplate}`);
    });

    netlifyMockupGenerator.on('mockups.generation.completed', (event) => {
      console.log('✅ Génération terminée avec succès!');
      console.log('🔗 URLs générées:');
      event.data.mockups?.forEach((mockup, index) => {
        if (mockup.status === 'ready') {
          console.log(`  ${index + 1}. ${mockup.templateName}: ${mockup.netlifyUrl}`);
        } else {
          console.log(`  ${index + 1}. ${mockup.templateName}: ERREUR - ${mockup.error}`);
        }
      });
    });

    netlifyMockupGenerator.on('mockups.generation.failed', (event) => {
      console.error('❌ Génération échouée:', event.data.error);
    });

    // Générer les mockups
    const result = await netlifyMockupGenerator.generateMockups(testFormData);

    // Afficher les résultats détaillés
    console.log('\n📊 RÉSULTATS DÉTAILLÉS:');
    console.log('========================');
    console.log(`Success: ${result.success}`);
    console.log(`Temps total: ${result.totalTime}s`);
    console.log(`Mockups générés: ${result.mockups.length}`);

    if (result.errors && result.errors.length > 0) {
      console.log('\n❌ Erreurs rencontrées:');
      result.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

    console.log('\n🎯 MOCKUPS GÉNÉRÉS:');
    console.log('===================');

    result.mockups.forEach((mockup, index) => {
      console.log(`\n${index + 1}. Template: ${mockup.templateName}`);
      console.log(`   Status: ${mockup.status}`);
      if (mockup.status === 'ready') {
        console.log(`   URL: ${mockup.netlifyUrl}`);
        console.log(`   Build Time: ${mockup.buildTime}s`);
        console.log(`   Deployment ID: ${mockup.deploymentId}`);
      } else if (mockup.error) {
        console.log(`   Erreur: ${mockup.error}`);
      }
    });

    // Vérification finale
    const successfulMockups = result.mockups.filter(m => m.status === 'ready');
    if (successfulMockups.length >= 2) {
      console.log('\n🎉 TEST RÉUSSI! Au moins 2 mockups générés avec succès.');
      console.log('📧 URLs prêtes pour l\'email client.');
    } else {
      console.log('\n⚠️  TEST PARTIELLEMENT RÉUSSI. Moins de 2 mockups générés.');
    }

    return result;

  } catch (error) {
    console.error('\n💥 ÉCHEC CRITIQUE DU TEST:', error);
    throw error;
  }
}

// Fonction utilitaire pour tester avec différents métiers
async function testMultipleBusinessTypes() {
  console.log('\n🔄 Test avec différents métiers...\n');

  const businessTypes = [
    { type: 'plombier', name: 'Plomberie Durand' },
    { type: 'electricien', name: 'Électricité Pro' },
    { type: 'paysagiste', name: 'Jardins & Nature' }
  ];

  for (const business of businessTypes) {
    console.log(`\n--- Test ${business.type.toUpperCase()} ---`);

    const formData: ClientFormData = {
      businessName: business.name,
      businessType: business.type,
      location: 'Paris 15ème',
      phone: '01 40 00 00 00',
      email: `contact@${business.name.toLowerCase().replace(/\s+/g, '-')}.fr`,
      description: `Professionnel ${business.type} depuis 10 ans`
    };

    try {
      const result = await netlifyMockupGenerator.generateMockups(formData);
      console.log(`✅ ${business.type}: ${result.mockups.filter(m => m.status === 'ready').length}/3 mockups générés`);
    } catch (error) {
      console.error(`❌ ${business.type}: Échec - ${error}`);
    }
  }
}

// Exécution des tests
async function runAllTests() {
  try {
    console.log('🎯 AWEMA 3.0 - Test Générateur Mockups Netlify');
    console.log('===============================================\n');

    // Test principal
    await testMockupGeneration();

    // Test optionnel avec différents métiers (commenté pour éviter les surcoûts)
    // await testMultipleBusinessTypes();

  } catch (error) {
    console.error('💥 Échec des tests:', error);
    process.exit(1);
  }
}

// Démarrage si exécuté directement
if (require.main === module) {
  runAllTests();
}

export { testMockupGeneration, testMultipleBusinessTypes };
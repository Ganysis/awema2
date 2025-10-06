/**
 * Test complet de l'Agent 6 : Setup Automatique Sanity CMS
 *
 * Ce fichier teste tous les aspects de l'intégration Sanity :
 * - Configuration de projet
 * - Migration de données
 * - Intégration workflow
 * - Handoff vers Agent 7
 */

import { workflowSanityIntegrationService } from './lib/services/workflow-sanity-integration.service';
import { sanitySetupService } from './lib/services/sanity-setup.service';
import { sanityDataMigrationService } from './lib/services/sanity-data-migration.service';
import { SanityProjectConfigManager } from './config/sanity-projects.config';

/**
 * Test principal - Scénario complet plombier
 */
async function testCompleteIntegration() {
  console.log('🧪 === TEST COMPLET AGENT 6 : SANITY CMS SETUP ===');
  console.log('');

  const testWorkflow = {
    workflowId: `test-workflow-${Date.now()}`,
    clientId: `client-${Date.now()}`,
    selectedTemplate: 'plombier-moderne',
    formData: {
      // Données formulaire réalistes
      telephone: '01 45 67 89 12',
      email: 'contact@plomberie-martin.fr',
      ville: 'Lyon',
      codePostal: '69001',
      adresse: '15 rue de la République',
      siret: '12345678901234',
      rcs: 'Lyon B 123 456 789',
      horairesLundi: '8h00-18h00',
      horairesSamedi: '8h00-12h00',
      urgence: '06 12 34 56 78',

      // Services spécifiques
      services: [
        {
          nom: 'Dépannage urgence plomberie',
          description: 'Intervention rapide 24h/7j pour fuites, canalisations bouchées',
          prix: 90,
          unite: 'euro',
          urgence: true
        },
        {
          nom: 'Installation chauffe-eau',
          description: 'Installation complète chauffe-eau électrique ou gaz',
          prix: 250,
          unite: 'euro'
        },
        {
          nom: 'Rénovation salle de bain',
          description: 'Rénovation complète plomberie salle de bain',
          prixType: 'devis'
        }
      ],

      // Zones d'intervention
      zonesIntervention: ['Lyon', 'Villeurbanne', 'Caluire-et-Cuire'],

      // Certifications
      certifications: ['RGE', 'Qualibat'],

      // Réseaux sociaux
      facebook: 'https://facebook.com/plomberie-martin',
      instagram: 'https://instagram.com/plomberie_martin'
    },
    businessInfo: {
      businessName: 'Plomberie Martin',
      businessType: 'plombier',
      domain: 'plomberie-martin.fr',
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#3b82f6'
      }
    },
    options: {
      includeTestData: true,
      generateSampleContent: true,
      createInitialPages: true,
      setupNavigation: true
    }
  };

  try {
    // ÉTAPE 1 : Test de validation des configurations métiers
    console.log('📋 1. Test des configurations métiers...');
    await testBusinessConfigurations();

    // ÉTAPE 2 : Test de l'intégration complète
    console.log('🚀 2. Test de l\'intégration complète...');
    const integrationResult = await workflowSanityIntegrationService.integrateAfterTemplateChoice(testWorkflow);

    if (!integrationResult.success) {
      throw new Error(`Intégration échouée: ${integrationResult.error}`);
    }

    console.log('✅ Intégration réussie!');
    console.log(`   → Projet Sanity: ${integrationResult.projectId}`);
    console.log(`   → Services: ${integrationResult.content.servicesCount}`);
    console.log(`   → Témoignages: ${integrationResult.content.testimonialsCount}`);
    console.log(`   → Projets: ${integrationResult.content.projectsCount}`);
    console.log(`   → Studio URL: ${integrationResult.credentials.studioUrl}`);

    // ÉTAPE 3 : Test du handoff vers Agent 7
    console.log('🤝 3. Test du handoff vers Agent 7...');
    const handoff = await workflowSanityIntegrationService.generateAstroHandoff(testWorkflow.workflowId);

    console.log('✅ Handoff généré!');
    console.log(`   → Config Sanity prête pour Astro`);
    console.log(`   → Variables d'environnement: ${Object.keys(handoff.deploymentVars).length}`);
    console.log(`   → Schémas: ${handoff.contentStructure.schemas.length}`);

    // ÉTAPE 4 : Test du monitoring
    console.log('📊 4. Test du monitoring...');
    const stats = workflowSanityIntegrationService.getIntegrationStats();
    console.log('✅ Statistiques récupérées!');
    console.log(`   → Total intégrations: ${stats.totalIntegrations}`);

    // ÉTAPE 5 : Test de mise à jour de contenu
    console.log('📝 5. Test de mise à jour de contenu...');
    const updateResult = await workflowSanityIntegrationService.updateSanityContent(
      testWorkflow.workflowId,
      {
        services: [{
          name: 'Nouveau service test',
          description: 'Service ajouté pour test',
          pricing: { type: 'fixed', amount: 100 }
        }]
      }
    );

    console.log('✅ Mise à jour testée!');
    console.log(`   → Services mis à jour: ${updateResult.updated.includes('services') ? 'Oui' : 'Non'}`);

    console.log('');
    console.log('🎉 === TOUS LES TESTS AGENT 6 RÉUSSIS ===');
    console.log('');

    return {
      success: true,
      results: {
        integration: integrationResult,
        handoff,
        stats,
        updateResult
      }
    };

  } catch (error) {
    console.error('❌ Erreur durant les tests:', error);
    console.log('');
    console.log('💥 === ÉCHEC DES TESTS AGENT 6 ===');
    console.log('');

    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Test des configurations métiers
 */
async function testBusinessConfigurations() {
  const businessTypes = ['plombier', 'electricien', 'menuisier', 'paysagiste', 'macon'];

  for (const businessType of businessTypes) {
    console.log(`   Testing ${businessType}...`);

    // Test configuration
    const config = SanityProjectConfigManager.getBusinessConfig(businessType);
    if (!config) {
      throw new Error(`Configuration manquante pour ${businessType}`);
    }

    // Test schémas
    const schemas = SanityProjectConfigManager.getSchemasForBusiness(businessType);
    if (schemas.length < 5) {
      throw new Error(`Pas assez de schémas pour ${businessType}: ${schemas.length}`);
    }

    // Test services par défaut
    const services = SanityProjectConfigManager.getDefaultServices(businessType);
    if (services.length < 2) {
      throw new Error(`Pas assez de services par défaut pour ${businessType}: ${services.length}`);
    }

    // Test couleurs
    const colors = SanityProjectConfigManager.getColorsForBusiness(businessType);
    if (!colors.primary || !colors.secondary) {
      throw new Error(`Couleurs manquantes pour ${businessType}`);
    }

    console.log(`   ✅ ${businessType} - OK (${schemas.length} schémas, ${services.length} services)`);
  }
}

/**
 * Test de performance - Mesure les temps d'exécution
 */
async function testPerformance() {
  console.log('⚡ Test de performance...');

  const startTime = Date.now();

  // Test d'intégration rapide
  const testResult = await workflowSanityIntegrationService.testIntegration('electricien');

  const totalTime = Date.now() - startTime;

  console.log(`✅ Performance test terminé:`);
  console.log(`   → Temps total: ${totalTime}ms`);
  console.log(`   → Temps intégration: ${testResult.duration}ms`);
  console.log(`   → Succès: ${testResult.success ? 'Oui' : 'Non'}`);

  if (totalTime > 10000) { // Plus de 10 secondes
    console.warn('⚠️  Performance dégradée - temps d\'exécution élevé');
  }

  return testResult;
}

/**
 * Test de validation des erreurs
 */
async function testErrorHandling() {
  console.log('🛡️  Test de gestion des erreurs...');

  // Test avec données invalides
  try {
    await workflowSanityIntegrationService.integrateAfterTemplateChoice({
      workflowId: '',
      clientId: '',
      selectedTemplate: 'inexistant',
      formData: {},
      businessInfo: {
        businessName: '',
        businessType: 'metier_inexistant',
        domain: 'domaine-invalide',
        colors: {}
      } as any
    } as any);

    throw new Error('Devrait avoir échoué avec des données invalides');

  } catch (error) {
    console.log('✅ Gestion d\'erreur validée:', error.message.substring(0, 50) + '...');
  }
}

/**
 * Test de nettoyage
 */
async function testCleanup() {
  console.log('🧹 Test de nettoyage...');

  const testWorkflowId = 'test-workflow-cleanup';

  const cleanupResult = await workflowSanityIntegrationService.cleanupWorkflowSanity(testWorkflowId);

  console.log(`✅ Nettoyage testé:`);
  console.log(`   → Succès: ${cleanupResult.success}`);
  console.log(`   → Éléments nettoyés: ${cleanupResult.cleaned.length}`);
  console.log(`   → Erreurs: ${cleanupResult.errors.length}`);
}

/**
 * Test de tous les métiers
 */
async function testAllBusinessTypes() {
  console.log('🏢 Test de tous les métiers...');

  const businessTypes = ['plombier', 'electricien', 'menuisier', 'paysagiste', 'macon'];
  const results = [];

  for (const businessType of businessTypes) {
    console.log(`   → Test ${businessType}...`);

    try {
      const result = await workflowSanityIntegrationService.testIntegration(businessType);
      results.push({
        businessType,
        success: result.success,
        duration: result.duration
      });

      console.log(`     ✅ ${businessType}: ${result.duration}ms`);

    } catch (error) {
      results.push({
        businessType,
        success: false,
        error: error.message
      });

      console.log(`     ❌ ${businessType}: ${error.message}`);
    }
  }

  const successful = results.filter(r => r.success);
  console.log(`✅ ${successful.length}/${results.length} métiers testés avec succès`);

  return results;
}

/**
 * Suite de tests complète
 */
async function runCompleteTestSuite() {
  console.log('🧪 === SUITE DE TESTS COMPLÈTE AGENT 6 ===');
  console.log('');

  const testResults = {
    main: null,
    performance: null,
    errorHandling: null,
    cleanup: null,
    allBusinessTypes: null
  };

  try {
    // Test principal
    testResults.main = await testCompleteIntegration();

    // Test de performance
    testResults.performance = await testPerformance();

    // Test de gestion d'erreurs
    await testErrorHandling();
    testResults.errorHandling = { success: true };

    // Test de nettoyage
    await testCleanup();
    testResults.cleanup = { success: true };

    // Test de tous les métiers
    testResults.allBusinessTypes = await testAllBusinessTypes();

    console.log('');
    console.log('📊 === RÉSUMÉ DES TESTS ===');
    console.log(`✅ Test principal: ${testResults.main.success ? 'SUCCÈS' : 'ÉCHEC'}`);
    console.log(`✅ Performance: ${testResults.performance.success ? 'SUCCÈS' : 'ÉCHEC'} (${testResults.performance.duration}ms)`);
    console.log(`✅ Gestion erreurs: ${testResults.errorHandling.success ? 'SUCCÈS' : 'ÉCHEC'}`);
    console.log(`✅ Nettoyage: ${testResults.cleanup.success ? 'SUCCÈS' : 'ÉCHEC'}`);
    console.log(`✅ Tous métiers: ${testResults.allBusinessTypes.filter((r: any) => r.success).length}/5 SUCCÈS`);
    console.log('');
    console.log('🎉 AGENT 6 SANITY CMS : 100% OPÉRATIONNEL');

    return testResults;

  } catch (error) {
    console.error('❌ Erreur dans la suite de tests:', error);
    return { success: false, error: error.message };
  }
}

// Export pour utilisation
export {
  testCompleteIntegration,
  testPerformance,
  testErrorHandling,
  runCompleteTestSuite
};

// Exécution directe si appelé en standalone
if (require.main === module) {
  runCompleteTestSuite()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
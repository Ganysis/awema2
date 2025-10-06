#!/usr/bin/env node

/**
 * Script de test complet du workflow AWEMA Studio V2
 * Remplace curl pour tester les APIs sans dépendances externes
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const API_BASE = '/api/v2';

// Utilitaires
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Awema-Test-Script/1.0'
      }
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonBody
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

function logStep(step, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`ÉTAPE ${step}: ${description}`);
  console.log(`${'='.repeat(60)}`);
}

function logResult(success, data, error = null) {
  if (success) {
    console.log('✅ SUCCÈS');
    console.log('Response:', JSON.stringify(data, null, 2));
  } else {
    console.log('❌ ÉCHEC');
    console.log('Error:', error);
    if (data) {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  }
}

async function testWorkflow() {
  console.log('🚀 DÉBUT DU TEST WORKFLOW AWEMA STUDIO V2');
  console.log(`Base URL: ${BASE_URL}`);

  let clientId = null;
  let projectId = null;
  let formId = null;

  try {
    // ÉTAPE 1: Créer un nouveau client
    logStep(1, 'Créer un nouveau client');
    const clientData = {
      name: 'Test Plomberie Moderne',
      email: 'test@plomberie-moderne.fr',
      phone: '06 99 88 77 66',
      city: 'Lyon'
    };

    const clientResponse = await makeRequest('POST', `${API_BASE}/clients`, clientData);
    if (clientResponse.status === 200 && clientResponse.data.success) {
      clientId = clientResponse.data.client.id;
      logResult(true, clientResponse.data);
      console.log(`Client créé avec ID: ${clientId}`);
    } else {
      logResult(false, clientResponse.data, `Status: ${clientResponse.status}`);
      return;
    }

    // ÉTAPE 2: Créer un projet pour le client
    logStep(2, 'Créer un projet pour le client');
    const projectData = {
      name: 'Site Web Plomberie Moderne'
    };

    const projectResponse = await makeRequest('POST', `${API_BASE}/clients/${clientId}/projects`, projectData);
    if (projectResponse.status === 200 && projectResponse.data.success) {
      projectId = projectResponse.data.project.id;
      formId = projectResponse.data.project.formId;
      logResult(true, projectResponse.data);
      console.log(`Projet créé avec ID: ${projectId}`);
      console.log(`Formulaire ID: ${formId}`);
      console.log(`URL du formulaire: ${BASE_URL}${projectResponse.data.project.formUrl}`);
    } else {
      logResult(false, projectResponse.data, `Status: ${projectResponse.status}`);
      return;
    }

    // ÉTAPE 3: Envoyer le formulaire (simuler envoi email)
    logStep(3, 'Envoyer formulaire détaillé');
    const sendFormResponse = await makeRequest('POST', `${API_BASE}/projects/${projectId}/send-form`);
    if (sendFormResponse.status === 200) {
      logResult(true, sendFormResponse.data);
    } else {
      logResult(false, sendFormResponse.data, `Status: ${sendFormResponse.status}`);
      // Continue même si l'envoi email échoue
    }

    // ÉTAPE 4: Simuler la soumission du formulaire
    logStep(4, 'Soumettre le formulaire complet');
    const formData = {
      // Données de base
      businessName: 'Plomberie Moderne Lyon',
      businessType: 'plomberie',
      city: 'Lyon',
      address: '123 Rue de la République, 69002 Lyon',
      phone: '06 99 88 77 66',
      email: 'contact@plomberie-moderne-lyon.fr',

      // Services
      services: [
        'Dépannage urgence 24/7',
        'Installation sanitaire',
        'Rénovation salle de bain',
        'Réparation fuites'
      ],

      // Style et préférences
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      stylePreference: 'professionnel',
      targetAudience: 'particuliers et entreprises',

      // Contenu
      slogan: 'Votre plombier de confiance à Lyon',
      description: 'Spécialistes en plomberie depuis 15 ans, nous intervenons rapidement pour tous vos besoins.',

      // Urgence
      hasEmergencyService: true,
      emergencyPhone: '06 99 88 77 66',

      // Zone d\'intervention
      serviceZones: ['Lyon', 'Villeurbanne', 'Caluire-et-Cuire'],

      // Certification
      certifications: ['Qualibat', 'RGE'],

      // Complétion du formulaire
      step: 8,
      completed: true
    };

    const submitResponse = await makeRequest('POST', `${API_BASE}/forms/${formId}/submit`, formData);
    if (submitResponse.status === 200) {
      logResult(true, submitResponse.data);
    } else {
      logResult(false, submitResponse.data, `Status: ${submitResponse.status}`);
    }

    // ÉTAPE 5: Générer les 3 mockups
    logStep(5, 'Générer les 3 mockups');
    const mockupsResponse = await makeRequest('POST', `${API_BASE}/projects/${projectId}/generate-mockups`);
    if (mockupsResponse.status === 200) {
      logResult(true, mockupsResponse.data);
      if (mockupsResponse.data.mockups) {
        console.log('URLs des mockups générés:');
        mockupsResponse.data.mockups.forEach((mockup, index) => {
          console.log(`  Mockup ${index + 1}: ${BASE_URL}${mockup.url}`);
        });
      }
    } else {
      logResult(false, mockupsResponse.data, `Status: ${mockupsResponse.status}`);
    }

    // ÉTAPE 6: Générer le site final
    logStep(6, 'Générer le site final');
    const finalSiteResponse = await makeRequest('POST', `${API_BASE}/projects/${projectId}/generate-final`);
    if (finalSiteResponse.status === 200) {
      logResult(true, finalSiteResponse.data);
      if (finalSiteResponse.data.siteUrl) {
        console.log(`Site final généré: ${finalSiteResponse.data.siteUrl}`);
      }
      if (finalSiteResponse.data.cmsUrl) {
        console.log(`CMS disponible: ${finalSiteResponse.data.cmsUrl}`);
      }
    } else {
      logResult(false, finalSiteResponse.data, `Status: ${finalSiteResponse.status}`);
    }

    // ÉTAPE 7: Vérifier le statut final
    logStep(7, 'Vérifier le statut final du projet');
    const clientsListResponse = await makeRequest('GET', `${API_BASE}/clients`);
    if (clientsListResponse.status === 200) {
      logResult(true, clientsListResponse.data);

      const ourClient = clientsListResponse.data.clients.find(c => c.id === clientId);
      if (ourClient && ourClient.projects.length > 0) {
        console.log('Statut final du projet:', ourClient.projects[0].status);
      }
    } else {
      logResult(false, clientsListResponse.data, `Status: ${clientsListResponse.status}`);
    }

  } catch (error) {
    console.error('❌ ERREUR CRITIQUE:', error.message);
    console.error('Stack:', error.stack);
  }

  console.log('\n🏁 FIN DU TEST WORKFLOW');
}

// Test de connectivité initial
async function testConnectivity() {
  console.log('🔍 Test de connectivité...');
  try {
    const response = await makeRequest('GET', '/');
    console.log(`✅ Application accessible (Status: ${response.status})`);
    return true;
  } catch (error) {
    console.error('❌ Application non accessible:', error.message);
    return false;
  }
}

// Exécution principale
async function main() {
  const isConnected = await testConnectivity();
  if (isConnected) {
    await testWorkflow();
  } else {
    console.log('❌ Impossible de continuer, l\'application n\'est pas accessible.');
    process.exit(1);
  }
}

// Gestion des arguments CLI
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { makeRequest, testWorkflow };
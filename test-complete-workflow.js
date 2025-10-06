// Utilisation de fetch natif Node.js (disponible depuis Node 18+)
// Si fetch n'est pas disponible, on peut utiliser node-fetch

const BASE_URL = 'http://localhost:3000';

async function testCompleteWorkflow() {
  console.log('🚀 DÉMARRAGE DU TEST COMPLET AWEMA STUDIO V2\n');

  try {
    // 1. CRÉER UN NOUVEAU CLIENT
    console.log('1. Création d\'un nouveau client...');
    const clientResponse = await fetch(`${BASE_URL}/api/v2/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Electricité Moderne Paris",
        email: "contact@electricite-moderne.fr",
        phone: "01 45 67 89 12",
        city: "Paris"
      })
    });

    console.log('Status de création client:', clientResponse.status);
    const clientContentType = clientResponse.headers.get('content-type');
    console.log('Content-Type client:', clientContentType);

    let clientData;
    if (clientContentType && clientContentType.includes('application/json')) {
      clientData = await clientResponse.json();
    } else {
      const text = await clientResponse.text();
      console.log('Réponse client HTML/Text:', text.substring(0, 500) + '...');
      throw new Error('Réponse client non-JSON reçue');
    }
    console.log('✅ Client créé:', clientData);

    if (!clientData.client || !clientData.client.id) {
      throw new Error('ID client non reçu');
    }

    const clientId = clientData.client.id;

    // 2. CRÉER UN PROJET POUR CE CLIENT
    console.log('\n2. Création d\'un projet...');
    const projectResponse = await fetch(`${BASE_URL}/api/v2/clients/${clientId}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Site Web Electricité Moderne"
      })
    });

    const projectData = await projectResponse.json();
    console.log('✅ Projet créé:', projectData);

    if (!projectData.project || !projectData.project.id) {
      throw new Error('ID projet non reçu');
    }

    const projectId = projectData.project.id;
    const formId = projectData.project.formId || projectId; // Utilise le formId ou projectId

    // 3. SOUMETTRE LE FORMULAIRE
    console.log('\n3. Soumission du formulaire...');
    const formResponse = await fetch(`${BASE_URL}/api/v2/forms/${formId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: "Electricité Moderne Paris",
        businessType: "electricien",
        city: "Paris",
        address: "45 Avenue des Champs-Élysées",
        phone: "01 45 67 89 12",
        email: "contact@electricite-moderne.fr",
        services: ["Installation électrique", "Dépannage 24/7", "Mise aux normes", "Domotique"],
        slogan: "Votre électricien de confiance à Paris",
        certifications: ["Qualifelec", "RGE", "Label Sécurité"],
        emergency247: true,
        yearsExperience: "20"
      })
    });

    const formData = await formResponse.json();
    console.log('✅ Formulaire soumis:', formData);

    // 4. GÉNÉRER ET DÉPLOYER LES 3 MOCKUPS
    console.log('\n4. Génération et déploiement des mockups...');
    const deployResponse = await fetch(`${BASE_URL}/api/v2/projects/${projectId}/generate-and-deploy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Status du déploiement:', deployResponse.status);

    // Vérifier si la réponse est du JSON
    const contentType = deployResponse.headers.get('content-type');
    console.log('Content-Type:', contentType);

    let deployData;
    if (contentType && contentType.includes('application/json')) {
      deployData = await deployResponse.json();
    } else {
      const text = await deployResponse.text();
      console.log('Réponse HTML/Text reçue:', text.substring(0, 500) + '...');
      throw new Error('Réponse non-JSON reçue du serveur');
    }

    console.log('✅ Génération et déploiement:', deployData);

    // 5. VÉRIFIER LE STATUT FINAL
    console.log('\n5. Vérification du statut final...');
    const statusResponse = await fetch(`${BASE_URL}/api/v2/clients`);
    const statusData = await statusResponse.json();
    console.log('✅ Statut final des clients:', statusData);

    // 6. RAPPORT FINAL
    console.log('\n' + '='.repeat(60));
    console.log('📋 RAPPORT FINAL DÉTAILLÉ');
    console.log('='.repeat(60));
    console.log(`🆔 ID Client: ${clientId}`);
    console.log(`🆔 ID Projet: ${projectId}`);
    console.log(`📋 Form ID: ${formId}`);
    console.log(`📧 Email: contact@electricite-moderne.fr`);
    console.log(`📱 Téléphone: 01 45 67 89 12`);
    console.log(`🏙️ Ville: Paris`);

    if (deployData && deployData.urls) {
      console.log('\n🌐 URLS DES MOCKUPS DÉPLOYÉS:');
      deployData.urls.forEach((url, index) => {
        console.log(`   Mockup ${index + 1}: ${url}`);
      });
    }

    if (deployData && deployData.mockups) {
      console.log('\n🎨 MOCKUPS GÉNÉRÉS:');
      deployData.mockups.forEach((mockup, index) => {
        console.log(`   ${mockup.style}: ${mockup.url || 'En cours de déploiement...'}`);
      });
    }

    console.log('\n✅ TEST COMPLET TERMINÉ AVEC SUCCÈS !');

  } catch (error) {
    console.error('❌ ERREUR DANS LE WORKFLOW:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Exécuter le test
testCompleteWorkflow();
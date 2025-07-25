#!/usr/bin/env node

/**
 * Test de l'interface admin/proposals
 */

require('dotenv').config({ path: '.env.local' });

async function testAdminInterface() {
  console.log('🔍 Test de l\'interface admin/proposals\n');
  
  // Test 1: API pour récupérer les propositions
  console.log('1️⃣ Test API /api/admin/template-proposals...');
  try {
    const response = await fetch('http://localhost:3000/api/admin/template-proposals');
    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success:', data.success);
      console.log('Propositions:', data.proposals?.length || 0);
      
      if (data.proposals && data.proposals.length > 0) {
        console.log('\nPropositions trouvées:');
        data.proposals.forEach((p, i) => {
          console.log(`${i + 1}. ${p.client?.companyName || p.client?.name} - Status: ${p.status}`);
          console.log(`   Créé le: ${new Date(p.createdAt).toLocaleDateString()}`);
          console.log(`   Analysé: ${p.analyzedAt ? 'Oui' : 'Non'}`);
        });
      }
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
  
  // Test 2: Créer une proposition de test si aucune n'existe
  console.log('\n2️⃣ Création d\'une proposition de test...');
  try {
    const testProposal = {
      clientId: 'test-client-' + Date.now(),
      client: {
        name: 'Jean Dupont',
        email: 'jean@test.fr',
        companyName: 'Plomberie Dupont Test'
      },
      formData: {
        businessName: 'Plomberie Dupont Test',
        businessType: 'plombier',
        services: ['Dépannage urgence', 'Installation sanitaire', 'Rénovation'],
        serviceAreas: ['Paris', 'Boulogne-Billancourt'],
        is24x7Available: true,
        yearEstablished: 2010,
        hasGallery: true,
        hasTestimonials: true,
        phone: '01 23 45 67 89',
        email: 'contact@plomberiedupont.fr',
        address: '123 rue de la Paix, 75001 Paris',
        stylePreference: 'modern',
        colorPreference: 'professional'
      }
    };
    
    // D'abord créer via l'API clients si nécessaire
    const clientResponse = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...testProposal.formData,
        client: testProposal.client
      })
    });
    
    if (clientResponse.ok) {
      const clientData = await clientResponse.json();
      console.log('✅ Client créé:', clientData.client?.id);
      
      // Maintenant l'analyser
      if (clientData.client?.id) {
        console.log('\n3️⃣ Analyse de la proposition...');
        const analyzeResponse = await fetch(`/api/admin/template-proposals/${clientData.client.id}/analyze`, {
          method: 'POST'
        });
        
        console.log('Status analyse:', analyzeResponse.status);
        if (analyzeResponse.ok) {
          console.log('✅ Analyse terminée !');
        }
      }
    }
  } catch (error) {
    console.log('❌ Erreur création:', error.message);
  }
  
  console.log('\n📌 Pour accéder à l\'interface: http://localhost:3000/admin/proposals');
}

testAdminInterface().then(() => {
  console.log('\n✨ Test terminé!');
}).catch(error => {
  console.error('❌ Erreur fatale:', error);
});
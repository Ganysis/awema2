#!/usr/bin/env node

/**
 * Script pour créer des données de test dans la base
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function setupTestData() {
  console.log('🔧 Configuration des données de test\n');
  
  try {
    // 1. Créer un client de test
    console.log('1️⃣ Création d\'un client de test...');
    const testClient = await prisma.client.create({
      data: {
        name: 'Jean Dupont',
        email: 'jean.dupont.test.' + Date.now() + '@test.fr', // Email unique
        phone: '01 23 45 67 89',
        companyName: 'Plomberie Express Test',
        address: '123 Avenue de la République',
        city: 'Paris',
        postalCode: '75011',
        status: 'ACTIVE',
        notes: 'Client test pour démonstration',
        tags: JSON.stringify(['plombier', 'urgence', '24/7'])
      }
    });
    console.log('✅ Client créé:', testClient.id);
    
    // 2. Créer une proposition de template
    console.log('\n2️⃣ Création d\'une proposition de template...');
    const formData = {
      businessName: 'Plomberie Express Test',
      businessType: 'plombier',
      legalStatus: 'SARL',
      yearEstablished: 2010,
      teamSize: '5-10',
      services: [
        'Dépannage urgence fuite',
        'Débouchage canalisation',
        'Installation sanitaire',
        'Rénovation salle de bain'
      ],
      serviceAreas: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine'],
      is24x7Available: true,
      hasGallery: true,
      hasTestimonials: true,
      phone: '01 23 45 67 89',
      email: 'contact@plomberieexpress.fr',
      address: '123 Avenue de la République, 75011 Paris',
      stylePreference: 'modern',
      colorPreference: 'professional',
      uniqueSellingPoint: 'Intervention en 30 minutes, 24/7',
      companyValues: ['Rapidité', 'Transparence', 'Professionnalisme']
    };
    
    const templateProposal = await prisma.templateProposal.create({
      data: {
        clientId: testClient.id,
        formData: JSON.stringify(formData),
        status: 'PENDING'
      }
    });
    console.log('✅ Proposition créée:', templateProposal.id);
    
    // 3. Afficher les statistiques
    console.log('\n📊 Statistiques de la base:');
    const clientCount = await prisma.client.count();
    const proposalCount = await prisma.templateProposal.count();
    console.log(`- Clients: ${clientCount}`);
    console.log(`- Propositions: ${proposalCount}`);
    
    console.log('\n✨ Données de test créées avec succès!');
    console.log('👉 Accédez à l\'interface admin: http://localhost:3000/admin/proposals');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupTestData();
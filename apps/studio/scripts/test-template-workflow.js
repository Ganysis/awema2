const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testTemplateWorkflow() {
  console.log('🚀 Test du workflow de sélection de templates\n');

  try {
    // 1. Créer un client de test
    console.log('1️⃣ Création d\'un client de test...');
    const client = await prisma.client.create({
      data: {
        name: 'Jean Dupont',
        email: 'jean.dupont@test.com',
        companyName: 'Plomberie Dupont & Fils',
        phone: '06 12 34 56 78',
        address: '123 rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        status: 'NEW'
      }
    });
    console.log('✅ Client créé:', client.name);

    // 2. Simuler la soumission du formulaire
    console.log('\n2️⃣ Simulation de la soumission du formulaire...');
    const formData = {
      businessType: 'plombier',
      businessName: 'Plomberie Dupont & Fils',
      yearEstablished: 2005,
      services: ['dépannage', 'installation', 'rénovation', 'urgences'],
      is24x7Available: true,
      hasGallery: true,
      hasTestimonials: true,
      hasPricing: false,
      serviceAreas: ['Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne'],
      targetAudience: ['particuliers', 'entreprises'],
      stylePreference: 'modern',
      goals: ['visibility', 'leads', 'urgency']
    };

    // 3. Créer une proposition
    console.log('\n3️⃣ Création de la proposition...');
    const proposal = await prisma.templateProposal.create({
      data: {
        clientId: client.id,
        formData: JSON.stringify(formData),
        status: 'PENDING'
      }
    });
    console.log('✅ Proposition créée avec ID:', proposal.id);

    // 4. URLs pour tester
    console.log('\n📋 URLs de test:');
    console.log('─────────────────');
    console.log(`🔧 Admin - Gestion des propositions:`);
    console.log(`   http://localhost:3000/admin/proposals`);
    console.log(`   → Cliquez sur la proposition de "${client.companyName}"`);
    console.log(`   → Cliquez sur "Analyser avec IA"`);
    console.log(`   → Personnalisez les 3 options`);
    console.log(`   → Envoyez au client`);
    console.log('\n👤 Client - Vue de sélection (après envoi par admin):');
    console.log(`   http://localhost:3000/client/proposals/${proposal.id}`);

    console.log('\n📊 Workflow complet:');
    console.log('1. Admin: Aller sur /admin/proposals');
    console.log('2. Admin: Analyser la proposition avec l\'IA');
    console.log('3. Admin: Personnaliser les messages et descriptions');
    console.log('4. Admin: Envoyer au client');
    console.log('5. Client: Voir et sélectionner une option');

    // 5. Vérifier l'état dans la DB
    console.log('\n🔍 Pour vérifier l\'état de la proposition:');
    console.log(`npx prisma studio → Table "template_proposals" → ID: ${proposal.id}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Fonction pour nettoyer les données de test
async function cleanupTestData() {
  console.log('\n🧹 Nettoyage des données de test...');
  
  try {
    // Supprimer les propositions de test
    await prisma.templateProposal.deleteMany({
      where: {
        client: {
          email: 'jean.dupont@test.com'
        }
      }
    });

    // Supprimer le client de test
    await prisma.client.deleteMany({
      where: {
        email: 'jean.dupont@test.com'
      }
    });

    console.log('✅ Données de test supprimées');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Menu
const args = process.argv.slice(2);
if (args[0] === 'cleanup') {
  cleanupTestData();
} else {
  testTemplateWorkflow();
}
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Les 5 clients de démonstration
const demoClients = [
  {
    name: 'Pierre Dubois',
    email: 'demo.plombier@awema.fr',
    phone: '01 42 56 78 90',
    company: 'Plomberie Express Paris',
    businessType: 'plombier',
    city: 'Paris',
    projectName: 'Site Plombier Urgentiste Paris',
    description: 'Expert plomberie 24h/7j à Paris - Intervention rapide'
  },
  {
    name: 'Marc Lefebvre',
    email: 'demo.electricien@awema.fr',
    phone: '04 78 90 12 34',
    company: 'Élec Pro Lyon',
    businessType: 'electricien',
    city: 'Lyon',
    projectName: 'Site Électricien Certifié Lyon',
    description: 'Électricien certifié Qualifelec à Lyon'
  },
  {
    name: 'Jean Dupont',
    email: 'demo.menuisier@awema.fr',
    phone: '05 56 78 90 12',
    company: 'L\'Atelier du Bois',
    businessType: 'menuisier',
    city: 'Bordeaux',
    projectName: 'Site Menuisier Artisanal Bordeaux',
    description: 'Créations sur mesure en bois massif'
  },
  {
    name: 'Sophie Martin',
    email: 'demo.peintre@awema.fr',
    phone: '04 91 23 45 67',
    company: 'Couleurs Méditerranée',
    businessType: 'peintre',
    city: 'Marseille',
    projectName: 'Site Peintre Décorateur Marseille',
    description: 'Peinture et décoration intérieure'
  },
  {
    name: 'Michel Bernard',
    email: 'demo.macon@awema.fr',
    phone: '05 61 34 56 78',
    company: 'Bâti Sud Construction',
    businessType: 'macon',
    city: 'Toulouse',
    projectName: 'Site Maçon Construction Toulouse',
    description: 'Maçonnerie générale et gros œuvre'
  }
];

async function createDemoClients() {
  console.log('🚀 Création de 5 clients de démonstration...\n');

  const results = [];

  for (let i = 0; i < demoClients.length; i++) {
    const demo = demoClients[i];
    console.log(`${i + 1}. Création : ${demo.company}`);

    try {
      // 1. Vérifier si le client existe déjà
      const existingClient = await prisma.client.findFirst({
        where: { email: demo.email }
      });

      if (existingClient) {
        console.log(`   ⚠️  Client déjà existant (ID: ${existingClient.id})`);
        
        // Vérifier si un projet existe
        const existingProject = await prisma.project.findFirst({
          where: { clientId: existingClient.id }
        });

        if (existingProject) {
          results.push({
            ...demo,
            clientId: existingClient.id,
            projectId: existingProject.id,
            status: 'existing'
          });
          console.log(`   ⚠️  Projet existant (ID: ${existingProject.id})`);
          continue;
        }
      }

      // 2. Créer le client
      const client = existingClient || await prisma.client.create({
        data: {
          name: demo.name,
          email: demo.email,
          phone: demo.phone,
          companyName: demo.company,  // Fixed: use companyName instead of company
          city: demo.city,
          status: 'ACTIVE',  // Fixed: use uppercase enum value
          // Store businessType and formData in tags field as JSON
          tags: JSON.stringify({
            businessType: demo.businessType,
            formData: {
              businessName: demo.company,
              businessType: demo.businessType,
              city: demo.city,
              phone: demo.phone,
              email: demo.email,
              description: demo.description,
              emergency247: demo.businessType === 'plombier',
              yearsExperience: Math.floor(Math.random() * 20) + 5,
              services: [],
              interventionCities: [demo.city],
              interventionRadius: '20',
              departments: [],
              colorScheme: 'predefined',
              visualStyle: 'modern',
              selectedPages: ['gallery', 'about', 'faq'],
              paymentMethods: ['cash', 'check', 'card'],
              languages: ['Français']
            }
          })
        }
      });

      if (!existingClient) {
        console.log(`   ✅ Client créé (ID: ${client.id})`);
      }

      // 3. Créer le projet
      const project = await prisma.project.create({
        data: {
          name: demo.projectName,
          slug: demo.company.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
          clientId: client.id,
          status: 'DRAFT',  // Fixed: use valid enum value
          template: 'artisan',
          // Store metadata in settings field as JSON
          settings: JSON.stringify({
            needsGeneration: true,
            generationType: 'ai',
            businessType: demo.businessType
          })
        }
      });
      console.log(`   ✅ Projet créé (ID: ${project.id})`);

      results.push({
        ...demo,
        clientId: client.id,
        projectId: project.id,
        status: 'created'
      });

    } catch (error) {
      console.error(`   ❌ Erreur : ${error.message}`);
      results.push({
        ...demo,
        error: error.message,
        status: 'error'
      });
    }
  }

  // Afficher le résumé
  console.log('\n\n════════════════════════════════════════════════════════════');
  console.log('                     📋 RÉSUMÉ DES CRÉATIONS                   ');
  console.log('════════════════════════════════════════════════════════════\n');

  const baseUrl = 'http://localhost:3000';

  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.company}`);
    
    if (result.error) {
      console.log(`   ❌ Erreur: ${result.error}`);
    } else {
      console.log(`   📧 Email: ${result.email}`);
      console.log(`   🔑 Client ID: ${result.clientId}`);
      console.log(`   🔑 Project ID: ${result.projectId}`);
      console.log(`   📊 Status: ${result.status === 'existing' ? '⚠️ Déjà existant' : '✅ Créé'}`);
      console.log(`   🔗 Lien formulaire: ${baseUrl}/dashboard/clients/${result.clientId}/edit`);
      console.log(`   🎨 Lien éditeur: ${baseUrl}/editor/${result.projectId}`);
    }
    console.log('');
  });

  console.log('════════════════════════════════════════════════════════════\n');
  console.log('🎯 PROCHAINES ÉTAPES:');
  console.log('   1. Allez sur http://localhost:3000/dashboard');
  console.log('   2. Cliquez sur un client dans la liste');
  console.log('   3. Cliquez sur "Éditer" pour accéder au formulaire');
  console.log('   4. Remplissez le formulaire complet (8 étapes)');
  console.log('   5. Cliquez sur "Générer le site" à la fin');
  console.log('   6. Le site sera généré par l\'IA en ~5 secondes !');
  console.log('\n💡 OU utilisez directement les liens ci-dessus pour accéder aux projets\n');

  await prisma.$disconnect();
}

// Exécuter
createDemoClients().catch(async (error) => {
  console.error('Erreur fatale:', error);
  await prisma.$disconnect();
  process.exit(1);
});
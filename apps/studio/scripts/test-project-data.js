/**
 * Script pour tester la création et le chargement de projets avec des données
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testProjectData() {
  try {
    console.log('🧪 Test de création et chargement de projet avec données\n');

    // 1. Créer un client de test
    console.log('1️⃣ Création d\'un client de test...');
    const client = await prisma.client.create({
      data: {
        name: 'Test Client Data',
        email: `test-data-${Date.now()}@example.com`,
        phone: '01 23 45 67 89',
        address: '123 rue Test',
        city: 'Paris',
        postalCode: '75001',
        companyName: 'Test Company SAS',
        status: 'ACTIVE'
      }
    });
    console.log(`✅ Client créé: ${client.name} (${client.id})\n`);

    // 2. Créer un projet avec des données
    console.log('2️⃣ Création d\'un projet avec données...');
    const projectData = {
      businessInfo: {
        companyName: client.companyName,
        industry: {
          category: 'artisan',
          subCategory: 'electricien',
          keywords: ['electricien', 'depannage', 'installation']
        },
        contact: {
          email: client.email,
          phone: client.phone,
          address: {
            street: client.address,
            city: client.city,
            postalCode: client.postalCode,
            country: 'France'
          }
        }
      },
      projectName: 'Projet Test avec Données',
      pages: [
        {
          id: 'home',
          name: 'Accueil',
          path: '/',
          blocks: [
            {
              id: 'hero-test',
              type: 'hero-ultra-modern',
              props: {
                variant: 'gradient-waves',
                title: 'Test Hero Block',
                subtitle: 'Ceci est un test de données de projet'
              }
            }
          ]
        }
      ],
      theme: {
        variant: 'premium',
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00'
        }
      }
    };

    const project = await prisma.project.create({
      data: {
        name: 'Projet Test Données',
        slug: `projet-test-data-${Date.now()}`,
        description: 'Projet de test pour vérifier le stockage des données',
        template: 'modern',
        clientId: client.id,
        status: 'DRAFT',
        features: JSON.stringify({ theme: 'premium' }),
        settings: JSON.stringify({}),
        data: JSON.stringify(projectData)
      }
    });
    console.log(`✅ Projet créé: ${project.name} (${project.id})\n`);

    // 3. Charger le projet et vérifier les données
    console.log('3️⃣ Chargement du projet...');
    const loadedProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: { client: true }
    });

    if (!loadedProject) {
      throw new Error('Projet non trouvé');
    }

    console.log('✅ Projet chargé avec succès');
    console.log(`   - Nom: ${loadedProject.name}`);
    console.log(`   - Client: ${loadedProject.client.name}`);
    console.log(`   - Template: ${loadedProject.template}`);
    console.log(`   - A des données: ${loadedProject.data ? 'OUI' : 'NON'}`);

    // 4. Parser et vérifier les données
    if (loadedProject.data) {
      console.log('\n4️⃣ Vérification des données...');
      const parsedData = typeof loadedProject.data === 'string' 
        ? JSON.parse(loadedProject.data) 
        : loadedProject.data;

      console.log('✅ Données parsées avec succès:');
      console.log(`   - Business Info: ${parsedData.businessInfo ? 'OK' : 'MANQUANT'}`);
      console.log(`   - Project Name: ${parsedData.projectName || 'MANQUANT'}`);
      console.log(`   - Pages: ${parsedData.pages?.length || 0} page(s)`);
      console.log(`   - Theme: ${parsedData.theme?.variant || 'MANQUANT'}`);
      
      if (parsedData.pages && parsedData.pages.length > 0) {
        console.log(`   - Blocks dans la page d'accueil: ${parsedData.pages[0].blocks?.length || 0}`);
      }

      // Afficher les données complètes en JSON
      console.log('\n📄 Données complètes du projet:');
      console.log(JSON.stringify(parsedData, null, 2));
    }

    // 5. Simuler une mise à jour via l'API
    console.log('\n5️⃣ Test de mise à jour des données...');
    const updatedData = { ...projectData };
    updatedData.pages[0].blocks.push({
      id: 'features-test',
      type: 'features-ultra-modern',
      props: {
        displayMode: 'grid',
        title: 'Nos Services Test',
        features: [
          { id: 'f1', title: 'Service 1', description: 'Description 1' },
          { id: 'f2', title: 'Service 2', description: 'Description 2' }
        ]
      }
    });

    await prisma.project.update({
      where: { id: project.id },
      data: {
        data: JSON.stringify(updatedData)
      }
    });
    console.log('✅ Données mises à jour avec succès');

    // 6. Nettoyer (optionnel)
    if (process.argv.includes('--cleanup')) {
      console.log('\n🧹 Nettoyage...');
      await prisma.project.delete({ where: { id: project.id } });
      await prisma.client.delete({ where: { id: client.id } });
      console.log('✅ Données de test supprimées');
    } else {
      console.log('\n💡 Conseil: Utilisez --cleanup pour supprimer les données de test');
      console.log(`\n🔗 Ouvrez http://localhost:3000/editor/${project.id} pour voir le projet dans l'éditeur`);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Lancer le test
testProjectData();
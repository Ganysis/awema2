const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding test data...');

  // Créer des clients de test avec différents statuts
  const testClients = [
    {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '06 12 34 56 78',
      companyName: 'Plomberie Dupont',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      status: 'NEW',
      message: 'Bonjour, je voudrais un site pour mon entreprise de plomberie.',
    },
    {
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '06 98 76 54 32',
      companyName: 'Jardinerie Martin',
      address: '45 Avenue des Fleurs',
      city: 'Lyon',
      postalCode: '69001',
      status: 'CONTACTED',
      message: 'J\'ai besoin d\'un site e-commerce pour vendre mes plantes.',
    },
    {
      name: 'Pierre Bernard',
      email: 'pierre.bernard@example.com',
      phone: '06 11 22 33 44',
      companyName: 'Électricité Bernard',
      address: '78 Boulevard Voltaire',
      city: 'Marseille',
      postalCode: '13001',
      status: 'QUALIFIED',
      message: 'Je cherche à refaire mon site web avec un système de devis en ligne.',
    },
    {
      name: 'Sophie Leroy',
      email: 'sophie.leroy@example.com',
      phone: '06 55 44 33 22',
      companyName: 'Coiffure Sophie',
      address: '12 Rue de la Beauté',
      city: 'Toulouse',
      postalCode: '31000',
      status: 'CONVERTED',
      message: 'Je veux un site avec système de réservation en ligne.',
    },
  ];

  for (const clientData of testClients) {
    try {
      const client = await prisma.client.create({
        data: clientData,
      });
      console.log(`✅ Created client: ${client.name} (${client.status})`);

      // Créer un projet pour les clients convertis
      if (client.status === 'CONVERTED') {
        const project = await prisma.project.create({
          data: {
            name: `Site Web ${client.companyName}`,
            slug: client.companyName?.toLowerCase().replace(/\s+/g, '-') || 'project',
            description: `Site web professionnel pour ${client.companyName}`,
            template: 'plumber',
            status: 'PUBLISHED',
            clientId: client.id,
          },
        });
        console.log(`  📁 Created project: ${project.name}`);
      }
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️  Client with email ${clientData.email} already exists, skipping...`);
      } else {
        throw error;
      }
    }
  }

  console.log('✨ Test data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
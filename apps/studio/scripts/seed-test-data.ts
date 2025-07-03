import { PrismaClient, ClientStatus } from '@prisma/client';

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
      status: ClientStatus.NEW,
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
      status: ClientStatus.CONTACTED,
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
      status: ClientStatus.QUALIFIED,
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
      status: ClientStatus.CONVERTED,
      message: 'Je veux un site avec système de réservation en ligne.',
    },
  ];

  for (const clientData of testClients) {
    const client = await prisma.client.create({
      data: clientData,
    });
    console.log(`✅ Created client: ${client.name} (${client.status})`);

    // Créer un projet pour les clients convertis
    if (client.status === ClientStatus.CONVERTED) {
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
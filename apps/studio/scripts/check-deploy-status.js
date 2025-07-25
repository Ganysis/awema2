const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDeployStatus() {
  console.log('📊 VÉRIFICATION DU STATUT DES DÉPLOIEMENTS\n');
  
  const projects = await prisma.project.findMany({
    where: {
      client: {
        companyName: {
          in: [
            'Plomberie Express Paris',
            'Élec Pro Lyon',
            'L\'Atelier du Bois',  
            'Couleurs Méditerranée',
            'Bâti Sud Construction'
          ]
        }
      }
    },
    include: { client: true },
    orderBy: { updatedAt: 'desc' }
  });

  console.log(`Trouvé ${projects.length} projets\n`);
  
  projects.forEach(project => {
    const data = JSON.parse(project.data || '{}');
    console.log(`${project.client.companyName}:`);
    console.log(`  ID: ${project.id}`);
    console.log(`  Slug: ${project.slug}`);
    console.log(`  Dernière MAJ: ${project.updatedAt.toLocaleString('fr-FR')}`);
    console.log(`  Déployé: ${data.deployUrl ? '✅ ' + data.deployUrl : '❌ Pas encore'}`);
    console.log('');
  });
  
  await prisma.$disconnect();
}

checkDeployStatus();
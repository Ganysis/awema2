const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deployRealNow() {
  console.log('\n🚀 DÉPLOIEMENT RÉEL IMMÉDIAT\n');
  
  try {
    // Récupérer les projets
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
      include: {
        client: true
      }
    });

    console.log(`📊 ${projects.length} projets à déployer\n`);

    for (const project of projects) {
      const projectData = JSON.parse(project.data || '{}');
      const tags = JSON.parse(project.client.tags || '{}');
      
      console.log(`🚀 ${project.client.companyName}...`);
      
      try {
        // Appel direct à l'API de déploiement
        const response = await fetch('http://localhost:3000/api/deploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            siteId: project.id,
            siteName: project.slug + '-' + Date.now(),
            projectData: projectData,
            plan: 'pro',
            customDomain: null,
            adminEmail: tags.formData?.email || 'contact@example.com'
          })
        });

        const result = await response.json();
        
        if (result.success) {
          console.log(`✅ DÉPLOYÉ : ${result.url}`);
        } else {
          console.log(`❌ Erreur : ${result.error}`);
        }
        
      } catch (error) {
        console.error(`❌ ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur :', error);
  } finally {
    await prisma.$disconnect();
  }
}

deployRealNow();
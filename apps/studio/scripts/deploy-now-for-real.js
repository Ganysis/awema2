const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config({ path: '.env.local' });

async function deployNowForReal() {
  console.log('🚀 DÉPLOIEMENT RÉEL MAINTENANT\n');
  
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
    include: { client: true }
  });

  for (const project of projects) {
    console.log(`\n📦 ${project.client.companyName}`);
    
    try {
      // Test direct avec fetch sur le port correct
      const ports = [3000, 3001, 3002];
      let deployed = false;
      
      for (const port of ports) {
        if (deployed) break;
        
        try {
          const response = await fetch(`http://localhost:${port}/api/deploy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              siteId: project.id,
              siteName: `${project.slug}-${Date.now()}`,
              projectData: JSON.parse(project.data || '{}'),
              plan: 'starter'
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log(`✅ Déployé sur port ${port}`);
            console.log(`🌐 URL: ${result.url || 'En cours...'}`);
            deployed = true;
          }
        } catch (e) {
          // Essayer le port suivant
        }
      }
      
      if (!deployed) {
        console.log('❌ Aucun serveur accessible');
      }
      
    } catch (error) {
      console.log(`❌ ${error.message}`);
    }
  }
  
  await prisma.$disconnect();
}

deployNowForReal();
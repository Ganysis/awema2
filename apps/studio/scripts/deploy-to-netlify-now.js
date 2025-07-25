const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;
const path = require('path');

async function deployToNetlifyNow() {
  console.log('\n🚀 DÉPLOIEMENT IMMÉDIAT SUR NETLIFY\n');
  
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

    console.log(`📊 ${projects.length} projets trouvés\n`);
    
    const deployedSites = [];
    const failedSites = [];
    
    for (const project of projects) {
      const projectData = JSON.parse(project.data || '{}');
      const tags = JSON.parse(project.client.tags || '{}');
      const businessType = tags.businessType || 'plombier';
      
      // Charger le HTML amélioré
      const folderMap = {
        'Plomberie Express Paris': 'plomberie-express-paris',
        'Élec Pro Lyon': 'elec-pro-lyon',
        'L\'Atelier du Bois': 'atelier-du-bois',
        'Couleurs Méditerranée': 'couleurs-mediterranee',
        'Bâti Sud Construction': 'bati-sud-construction'
      };
      
      const folder = folderMap[project.client.companyName];
      if (folder) {
        try {
          const htmlPath = path.join(__dirname, `../netlify-ready/${folder}/index.html`);
          const improvedHtml = await fs.readFile(htmlPath, 'utf8');
          
          if (!projectData.pages) projectData.pages = [];
          if (projectData.pages.length === 0) {
            projectData.pages.push({
              id: 'home',
              name: 'Accueil',
              path: '/',
              blocks: []
            });
          }
          
          projectData.pages[0].customHtml = improvedHtml;
          projectData.pages[0].hasImprovedStyles = true;
        } catch (err) {
          console.log(`⚠️  Utilisation des données existantes pour ${project.client.companyName}`);
        }
      }
      
      console.log(`\n🚀 Déploiement de ${project.client.companyName}...`);
      
      try {
        const siteName = project.slug.replace(/[^a-z0-9-]/g, '-') + '-' + Date.now();
        
        const response = await fetch('http://localhost:3002/api/deploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            siteId: project.id,
            siteName: siteName,
            projectData: projectData,
            plan: 'pro',
            customDomain: null,
            adminEmail: tags.formData?.email || 'contact@example.com'
          })
        });

        const contentType = response.headers.get('content-type');
        let result;
        
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const text = await response.text();
          console.log(`   ❌ Réponse non-JSON : ${text.substring(0, 100)}...`);
          result = { error: 'Réponse non-JSON' };
        }
        
        if (response.ok && result.success) {
          console.log(`   ✅ Déployé avec succès !`);
          console.log(`   🌐 URL : ${result.url}`);
          console.log(`   🔧 Admin : ${result.adminUrl}`);
          
          deployedSites.push({
            name: project.client.companyName,
            businessType: businessType,
            url: result.url,
            adminUrl: result.adminUrl
          });
        } else {
          console.log(`   ❌ Erreur : ${result.error || 'Déploiement échoué'}`);
          failedSites.push({
            name: project.client.companyName,
            error: result.error || response.statusText
          });
        }
        
      } catch (error) {
        console.error(`   ❌ Erreur réseau : ${error.message}`);
        failedSites.push({
          name: project.client.companyName,
          error: error.message
        });
      }
    }
    
    // Résumé
    console.log('\n\n📊 RÉSUMÉ DU DÉPLOIEMENT');
    console.log('═══════════════════════════════════════\n');
    
    if (deployedSites.length > 0) {
      console.log(`✅ ${deployedSites.length} sites déployés avec succès :\n`);
      deployedSites.forEach(site => {
        console.log(`${site.name} (${site.businessType})`);
        console.log(`   🌐 ${site.url}\n`);
      });
      
      // Sauvegarder les URLs
      await fs.writeFile(
        path.join(__dirname, '../netlify-deployed-urls.json'),
        JSON.stringify({
          date: new Date().toISOString(),
          deployedSites: deployedSites,
          failedSites: failedSites
        }, null, 2)
      );
    }
    
    if (failedSites.length > 0) {
      console.log(`\n❌ ${failedSites.length} échecs :\n`);
      failedSites.forEach(site => {
        console.log(`${site.name} : ${site.error}`);
      });
      
      console.log('\n💡 Solution probable :');
      console.log('1. Vérifiez que NETLIFY_AUTH_TOKEN est configuré dans .env.local');
      console.log('2. Vérifiez que le serveur Next.js est bien lancé sur le port 3002');
      console.log('3. Vérifiez les logs du serveur pour plus de détails');
    }
    
  } catch (error) {
    console.error('❌ Erreur globale :', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Vérifier d'abord que le serveur est accessible
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3002');
    console.log('✅ Serveur Next.js accessible sur le port 3002');
    return true;
  } catch (error) {
    console.error('❌ Le serveur Next.js n\'est pas accessible sur le port 3002');
    console.log('💡 Assurez-vous que le serveur est lancé avec : npm run dev');
    return false;
  }
}

// Lancer le déploiement
checkServer().then(isReady => {
  if (isReady) {
    deployToNetlifyNow();
  }
});
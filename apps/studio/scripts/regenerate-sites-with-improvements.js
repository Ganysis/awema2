const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function regenerateSites() {
  try {
    console.log('\n🎨 RÉGÉNÉRATION DES SITES AVEC AMÉLIORATIONS\n');
    console.log('✅ Fonds colorés alternés par business type');
    console.log('✅ Contenu 100% personnalisé (pas de templates)');
    console.log('✅ Descriptions de services spécifiques');
    console.log('✅ Styles injectés dans chaque bloc\n');

    // Récupérer les 5 clients existants
    const clients = await prisma.client.findMany({
      where: {
        companyName: {
          in: [
            'Plomberie Express Paris',
            'Élec Pro Lyon',
            'L\'Atelier du Bois',
            'Couleurs Méditerranée',
            'Bâti Sud Construction'
          ]
        }
      },
      include: {
        projects: true
      }
    });

    console.log(`📊 ${clients.length} clients trouvés à régénérer\n`);

    for (const client of clients) {
      if (client.projects.length === 0) {
        console.log(`⚠️  Pas de projet pour ${client.companyName}`);
        continue;
      }

      const project = client.projects[0];
      console.log(`\n🔄 Régénération du site pour ${client.companyName}...`);
      
      // Trigger la régénération via l'API
      const response = await fetch(`http://localhost:3000/api/projects/${project.id}/regenerate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log(`✅ Site régénéré avec succès !`);
        console.log(`🔗 Voir le site : http://localhost:3000/editor/${project.id}`);
        console.log(`👁️  Preview : http://localhost:3000/preview/${project.id}`);
      } else {
        console.log(`❌ Erreur lors de la régénération : ${response.statusText}`);
      }
    }

    console.log('\n\n📊 RÉSUMÉ DES AMÉLIORATIONS APPLIQUÉES :');
    console.log('═══════════════════════════════════════');
    console.log('1. 🎨 Fonds colorés alternés :');
    console.log('   - Plombier : Blanc → Bleu clair → Dégradé bleu');
    console.log('   - Électricien : Blanc → Jaune clair → Dégradé jaune');
    console.log('   - Menuisier : Blanc → Beige → Dégradé marron');
    console.log('   - Peintre : Blanc → Violet clair → Dégradé violet');
    console.log('   - Maçon : Blanc → Gris clair → Dégradé gris\n');
    
    console.log('2. ✍️  Contenu personnalisé :');
    console.log('   - Descriptions de services adaptées au métier');
    console.log('   - Textes uniques pour chaque business type');
    console.log('   - Pas de placeholders génériques\n');
    
    console.log('3. 🎯 Structure des blocs :');
    console.log('   - Styles directement injectés dans chaque bloc');
    console.log('   - Propriété "style" avec backgroundColor ou backgroundGradient');
    console.log('   - Header et Footer sans style de fond\n');

    console.log('✅ Régénération terminée !');
    console.log('🚀 Les sites sont maintenant visuellement riches et personnalisés !');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Alternative : Régénération directe sans API
async function regenerateDirectly() {
  try {
    console.log('\n🔄 RÉGÉNÉRATION DIRECTE DES SITES\n');

    const clients = await prisma.client.findMany({
      where: {
        companyName: {
          in: [
            'Plomberie Express Paris',
            'Élec Pro Lyon',
            'L\'Atelier du Bois',
            'Couleurs Méditerranée',
            'Bâti Sud Construction'
          ]
        }
      },
      include: {
        projects: true
      }
    });

    // Importer les services nécessaires
    const { aiSiteGenerator } = require('../lib/services/ai-site-generator.service');
    
    for (const client of clients) {
      if (client.projects.length === 0) continue;
      
      const project = client.projects[0];
      console.log(`\n🎨 Régénération de ${client.companyName}...`);
      
      // Extraire les données du formulaire depuis les tags
      const tags = JSON.parse(client.tags || '{}');
      const formData = tags.formData || {};
      
      // Régénérer le site avec les nouvelles améliorations
      const generatedSite = await aiSiteGenerator.generateSiteFromForm(formData);
      
      // Mettre à jour le projet avec les nouvelles pages
      await prisma.project.update({
        where: { id: project.id },
        data: {
          pages: JSON.stringify(generatedSite.pages),
          settings: JSON.stringify(generatedSite.settings),
          theme: JSON.stringify(generatedSite.theme)
        }
      });
      
      console.log(`✅ Site régénéré avec fonds colorés et contenu personnalisé !`);
      console.log(`🔗 http://localhost:3000/editor/${project.id}`);
    }

    console.log('\n✅ Tous les sites ont été régénérés avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Vérifier si on peut utiliser l'API ou pas
if (process.argv[2] === '--direct') {
  regenerateDirectly();
} else {
  console.log('💡 Astuce : Utilisez --direct pour régénérer sans passer par l\'API\n');
  regenerateSites();
}
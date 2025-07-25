const { PrismaClient } = require('@prisma/client');
const { aiSiteGenerator } = require('../lib/services/ai-site-generator.service');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Les 5 clients de démonstration
const demoClients = [
  {
    name: 'Plomberie Express Paris',
    email: 'demo1@awema.fr',
    phone: '01 42 56 78 90',
    company: 'Plomberie Express Paris',
    businessType: 'plombier',
    city: 'Paris',
    projectName: 'Site Plombier Urgentiste Paris',
    formData: {
      businessInfo: {
        companyName: 'Plomberie Express Paris',
        legalForm: 'SARL',
        siret: '123 456 789 00012',
        insurance: 'AXA Pro BTP',
        yearsOfExperience: '15',
        certifications: ['RGE', 'Qualibat'],
        businessType: 'plombier',
        description: 'Votre expert plomberie disponible 24h/7j à Paris'
      },
      contact: {
        phones: [
          { number: '01 42 56 78 90', type: 'main' },
          { number: '06 12 34 56 78', type: 'emergency' }
        ],
        emails: [{ email: 'contact@plomberie-express-paris.fr', type: 'contact' }],
        address: {
          street: '42 rue de la République',
          city: 'Paris',
          postalCode: '75011',
          country: 'France'
        },
        hours: {
          monday: { open: '00:00', close: '23:59', closed: false },
          tuesday: { open: '00:00', close: '23:59', closed: false },
          wednesday: { open: '00:00', close: '23:59', closed: false },
          thursday: { open: '00:00', close: '23:59', closed: false },
          friday: { open: '00:00', close: '23:59', closed: false },
          saturday: { open: '00:00', close: '23:59', closed: false },
          sunday: { open: '00:00', close: '23:59', closed: false }
        }
      },
      services: {
        mainServices: [
          {
            name: 'Débouchage canalisation',
            description: 'Intervention rapide pour déboucher vos canalisations',
            price: '89',
            priceType: 'from'
          },
          {
            name: 'Recherche de fuite',
            description: 'Détection précise sans destruction',
            price: '150',
            priceType: 'from'
          },
          {
            name: 'Dépannage chauffe-eau',
            description: 'Réparation et remplacement toutes marques',
            price: '120',
            priceType: 'from'
          }
        ]
      },
      serviceArea: {
        cities: ['Paris', 'Boulogne-Billancourt', 'Montreuil', 'Vincennes', 'Saint-Denis'],
        radius: 15,
        departments: ['75', '92', '93', '94']
      },
      branding: {
        colors: {
          primary: '#2563EB',
          secondary: '#3B82F6',
          accent: '#EF4444'
        },
        visualStyle: 'modern',
        typography: 'Inter'
      },
      options: {
        selectedPages: ['gallery', 'faq'],
        paymentMethods: ['cash', 'check', 'card', 'transfer'],
        languages: ['Français', 'Anglais'],
        emergency247: true
      }
    }
  },
  {
    name: 'Élec Pro Lyon',
    email: 'demo2@awema.fr',
    phone: '04 78 90 12 34',
    company: 'Élec Pro Lyon',
    businessType: 'electricien',
    city: 'Lyon',
    projectName: 'Site Électricien Certifié Lyon',
    formData: {
      businessInfo: {
        companyName: 'Élec Pro Lyon',
        businessType: 'electricien',
        yearsOfExperience: '22',
        certifications: ['Qualifelec', 'RGE', 'IRVE'],
        description: 'Électricien certifié pour tous vos travaux électriques à Lyon'
      },
      contact: {
        phones: [{ number: '04 78 90 12 34', type: 'main' }],
        emails: [{ email: 'contact@elecpro-lyon.fr', type: 'contact' }],
        address: {
          street: '123 avenue Jean Jaurès',
          city: 'Lyon',
          postalCode: '69007'
        }
      },
      services: {
        mainServices: [
          {
            name: 'Mise aux normes électriques',
            description: 'Mise en conformité complète NFC 15-100',
            price: '1500',
            priceType: 'from'
          },
          {
            name: 'Installation domotique',
            description: 'Maison connectée et intelligente',
            price: '2000',
            priceType: 'from'
          }
        ]
      },
      serviceArea: {
        cities: ['Lyon', 'Villeurbanne', 'Vénissieux', 'Caluire-et-Cuire', 'Bron', 'Écully'],
        radius: 20
      },
      branding: {
        colors: {
          primary: '#F59E0B',
          secondary: '#FCD34D',
          accent: '#3B82F6'
        },
        visualStyle: 'modern'
      },
      options: {
        emergency247: false
      }
    }
  },
  {
    name: 'L\'Atelier du Bois',
    email: 'demo3@awema.fr',
    phone: '05 56 78 90 12',
    company: 'L\'Atelier du Bois',
    businessType: 'menuisier',
    city: 'Bordeaux',
    projectName: 'Site Menuisier Artisanal Bordeaux',
    formData: {
      businessInfo: {
        companyName: 'L\'Atelier du Bois',
        businessType: 'menuisier',
        yearsOfExperience: '12',
        description: 'Créations sur mesure en bois massif'
      },
      contact: {
        phones: [{ number: '05 56 78 90 12', type: 'main' }],
        emails: [{ email: 'contact@atelier-bois.fr', type: 'contact' }],
        address: {
          street: '78 rue des Artisans',
          city: 'Bordeaux',
          postalCode: '33000'
        }
      },
      services: {
        mainServices: [
          {
            name: 'Cuisine sur mesure',
            description: 'Conception de cuisines personnalisées',
            price: '5000',
            priceType: 'from'
          },
          {
            name: 'Escalier bois',
            description: 'Création d\'escaliers design',
            price: '3500',
            priceType: 'from'
          }
        ]
      },
      serviceArea: {
        cities: ['Bordeaux', 'Mérignac', 'Pessac', 'Talence', 'Bègles'],
        radius: 30
      },
      branding: {
        colors: {
          primary: '#92400E',
          secondary: '#B45309',
          accent: '#059669'
        },
        visualStyle: 'natural'
      }
    }
  },
  {
    name: 'Couleurs Méditerranée',
    email: 'demo4@awema.fr',
    phone: '04 91 23 45 67',
    company: 'Couleurs Méditerranée',
    businessType: 'peintre',
    city: 'Marseille',
    projectName: 'Site Peintre Décorateur Marseille',
    formData: {
      businessInfo: {
        companyName: 'Couleurs Méditerranée',
        businessType: 'peintre',
        yearsOfExperience: '8',
        description: 'Peinture et décoration intérieure'
      },
      contact: {
        phones: [{ number: '04 91 23 45 67', type: 'main' }],
        emails: [{ email: 'contact@couleurs-med.fr', type: 'contact' }],
        address: {
          street: '56 boulevard Libération',
          city: 'Marseille',
          postalCode: '13001'
        }
      },
      services: {
        mainServices: [
          {
            name: 'Peinture intérieure',
            description: 'Murs et plafonds, finitions parfaites',
            price: '25',
            priceType: 'from'
          },
          {
            name: 'Enduits décoratifs',
            description: 'Béton ciré, stuc, tadelakt',
            price: '45',
            priceType: 'from'
          }
        ]
      },
      serviceArea: {
        cities: ['Marseille', 'Aubagne', 'La Ciotat', 'Cassis'],
        radius: 25
      },
      branding: {
        colors: {
          primary: '#8B5CF6',
          secondary: '#EC4899',
          accent: '#14B8A6'
        },
        visualStyle: 'modern'
      }
    }
  },
  {
    name: 'Bâti Sud Construction',
    email: 'demo5@awema.fr',
    phone: '05 61 34 56 78',
    company: 'Bâti Sud Construction',
    businessType: 'macon',
    city: 'Toulouse',
    projectName: 'Site Maçon Construction Toulouse',
    formData: {
      businessInfo: {
        companyName: 'Bâti Sud Construction',
        businessType: 'macon',
        yearsOfExperience: '25',
        certifications: ['Qualibat', 'RGE'],
        description: 'Maçonnerie générale et gros œuvre'
      },
      contact: {
        phones: [{ number: '05 61 34 56 78', type: 'main' }],
        emails: [{ email: 'contact@batisud.fr', type: 'contact' }],
        address: {
          street: '234 route de Narbonne',
          city: 'Toulouse',
          postalCode: '31400'
        }
      },
      services: {
        mainServices: [
          {
            name: 'Construction maison',
            description: 'Maisons individuelles clés en main',
            price: '1200',
            priceType: 'from'
          },
          {
            name: 'Extension maison',
            description: 'Agrandissement de votre habitation',
            price: '1500',
            priceType: 'from'
          }
        ]
      },
      serviceArea: {
        cities: ['Toulouse', 'Blagnac', 'Colomiers', 'Tournefeuille', 'Balma'],
        radius: 40
      },
      branding: {
        colors: {
          primary: '#6B7280',
          secondary: '#DC2626',
          accent: '#F59E0B'
        },
        visualStyle: 'industrial'
      }
    }
  }
];

async function createDemoSites() {
  console.log('🚀 Création de 5 sites de démonstration...\n');

  const results = [];

  for (let i = 0; i < demoClients.length; i++) {
    const demo = demoClients[i];
    console.log(`\n${i + 1}. Création client : ${demo.name}`);

    try {
      // 1. Créer le client
      const client = await prisma.client.create({
        data: {
          name: demo.name,
          email: demo.email,
          phone: demo.phone,
          company: demo.company,
          businessType: demo.businessType,
          city: demo.city,
          status: 'active',
          formData: demo.formData
        }
      });
      console.log(`   ✅ Client créé (ID: ${client.id})`);

      // 2. Créer le projet
      const projectId = crypto.randomUUID();
      const project = await prisma.project.create({
        data: {
          id: projectId,
          name: demo.projectName,
          clientId: client.id,
          type: 'vitrine',
          status: 'in_progress',
          template: 'artisan'
        }
      });
      console.log(`   ✅ Projet créé (ID: ${project.id})`);

      // 3. Générer le site avec l'IA
      console.log(`   ⏳ Génération du site avec l'IA...`);
      const startTime = Date.now();
      
      const generatedSite = await aiSiteGenerator.generateSiteFromForm(demo.formData);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`   ✅ Site généré en ${duration}s`);
      console.log(`      - ${generatedSite.pages.length} pages créées`);
      console.log(`      - ${generatedSite.pages.reduce((sum, p) => sum + p.blocks.length, 0)} blocs configurés`);

      // 4. Sauvegarder le contenu du site
      await prisma.projectContent.create({
        data: {
          projectId: project.id,
          content: {
            pages: generatedSite.pages,
            theme: generatedSite.theme,
            navigation: generatedSite.navigation,
            settings: generatedSite.settings
          },
          version: 1
        }
      });
      console.log(`   ✅ Contenu sauvegardé en base de données`);

      // 5. Ajouter au résultat
      results.push({
        client: demo.name,
        clientId: client.id,
        projectId: project.id,
        url: `http://localhost:3000/editor/${project.id}`,
        pages: generatedSite.pages.length,
        duration: duration
      });

    } catch (error) {
      console.error(`   ❌ Erreur : ${error.message}`);
      results.push({
        client: demo.name,
        error: error.message
      });
    }
  }

  // Afficher le résumé
  console.log('\n\n════════════════════════════════════════════════════════════');
  console.log('                   ✨ SITES CRÉÉS AVEC SUCCÈS                 ');
  console.log('════════════════════════════════════════════════════════════\n');

  results.forEach((result, index) => {
    if (result.error) {
      console.log(`❌ ${index + 1}. ${result.client}`);
      console.log(`   Erreur: ${result.error}\n`);
    } else {
      console.log(`✅ ${index + 1}. ${result.client}`);
      console.log(`   📎 URL: ${result.url}`);
      console.log(`   📄 Pages: ${result.pages}`);
      console.log(`   ⚡ Généré en: ${result.duration}s`);
      console.log(`   🔑 Client ID: ${result.clientId}`);
      console.log(`   🔑 Project ID: ${result.projectId}\n`);
    }
  });

  console.log('════════════════════════════════════════════════════════════\n');
  console.log('🎉 Les 5 sites de démonstration sont prêts !');
  console.log('📌 Accédez au dashboard : http://localhost:3000/dashboard');
  console.log('📌 Ou directement à un site via les URLs ci-dessus\n');

  await prisma.$disconnect();
}

// Exécuter
createDemoSites().catch(async (error) => {
  console.error('Erreur fatale:', error);
  await prisma.$disconnect();
  process.exit(1);
});
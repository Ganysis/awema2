const { aiSiteGenerator } = require('./lib/services/ai-site-generator.service');
const fs = require('fs');
const path = require('path');

// 5 exemples de clients différents
const testClients = [
  // 1. Plombier urgentiste à Paris
  {
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
      emails: [
        { email: 'contact@plomberie-express-paris.fr', type: 'contact' }
      ],
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
          priceType: 'from',
          duration: '30-60 min',
          guarantee: 'Garantie résultat',
          included: ['Diagnostic gratuit', 'Matériel professionnel']
        },
        {
          name: 'Recherche de fuite',
          description: 'Détection précise sans destruction',
          price: '150',
          priceType: 'from',
          duration: '1-2h',
          guarantee: 'Localisation garantie',
          included: ['Rapport détaillé', 'Photos thermiques']
        }
      ]
    },
    serviceArea: {
      cities: ['Paris', 'Boulogne-Billancourt', 'Montreuil'],
      radius: 15,
      departments: ['75', '92', '93'],
      travelFees: 'Gratuit dans Paris'
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
      paymentMethods: ['cash', 'check', 'card'],
      languages: ['Français'],
      emergency247: true
    }
  },

  // 2. Électricien à Lyon
  {
    businessInfo: {
      companyName: 'Élec Pro Lyon',
      businessType: 'electricien',
      yearsOfExperience: '22',
      description: 'Électricien certifié pour tous vos travaux'
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
          name: 'Mise aux normes',
          description: 'Mise en conformité de votre installation',
          price: '1500',
          priceType: 'from'
        },
        {
          name: 'Domotique',
          description: 'Maison connectée et intelligente',
          price: '2000',
          priceType: 'from'
        }
      ]
    },
    serviceArea: {
      cities: ['Lyon', 'Villeurbanne', 'Vénissieux'],
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
  },

  // 3. Menuisier à Bordeaux
  {
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
      cities: ['Bordeaux', 'Mérignac', 'Pessac'],
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
  },

  // 4. Peintre à Marseille
  {
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
        }
      ]
    },
    serviceArea: {
      cities: ['Marseille', 'Aubagne'],
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
  },

  // 5. Maçon à Toulouse
  {
    businessInfo: {
      companyName: 'Bâti Sud Construction',
      businessType: 'macon',
      yearsOfExperience: '25',
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
          name: 'Extension',
          description: 'Agrandissement de votre habitation',
          price: '1500',
          priceType: 'from'
        }
      ]
    },
    serviceArea: {
      cities: ['Toulouse', 'Blagnac', 'Colomiers'],
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
];

// Fonction principale
async function generateTestSites() {
  console.log('🚀 Génération de 5 sites de test...\n');

  const outputDir = path.join(__dirname, 'generated-sites');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < testClients.length; i++) {
    const client = testClients[i];
    console.log(`\n📋 Site ${i + 1}/5 : ${client.businessInfo.companyName}`);
    
    try {
      const startTime = Date.now();
      
      // Générer le site
      const generatedSite = await aiSiteGenerator.generateSiteFromForm(client);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      // Sauvegarder
      const filename = `site-${i + 1}-${client.businessInfo.businessType}.json`;
      fs.writeFileSync(
        path.join(outputDir, filename),
        JSON.stringify(generatedSite, null, 2)
      );
      
      // Afficher les stats
      console.log(`✅ Généré en ${duration}s`);
      console.log(`   - Pages: ${generatedSite.pages.length}`);
      console.log(`   - Blocs: ${generatedSite.pages.reduce((sum, p) => sum + p.blocks.length, 0)}`);
      console.log(`   - Sauvegardé: ${filename}`);
      
      // Aperçu du contenu
      const home = generatedSite.pages.find(p => p.isHomePage);
      if (home) {
        console.log(`   - SEO Title: "${home.seo.title}"`);
        const hero = home.blocks.find(b => b.type === 'HeroV3');
        if (hero) {
          console.log(`   - Hero: "${hero.props.title}"`);
        }
      }
      
    } catch (error) {
      console.error(`❌ Erreur: ${error.message}`);
    }
  }
  
  console.log('\n\n✨ Terminé ! Sites disponibles dans ./generated-sites/');
}

// Lancer la génération
generateTestSites().catch(console.error);
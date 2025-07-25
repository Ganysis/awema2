import { aiSiteGenerator } from './lib/services/ai-site-generator.service';
import { ClientFormData } from './types/client-form';
import * as fs from 'fs';
import * as path from 'path';

// 5 exemples de clients différents
const testClients: ClientFormData[] = [
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
        { email: 'contact@plomberie-express-paris.fr', type: 'contact' },
        { email: 'urgence@plomberie-express-paris.fr', type: 'support' }
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
      },
      socialMedia: {
        facebook: 'https://facebook.com/plomberieexpressparis',
        instagram: 'https://instagram.com/plomberie_express_paris'
      }
    },
    services: {
      mainServices: [
        {
          name: 'Débouchage canalisation',
          description: 'Intervention rapide pour déboucher vos canalisations avec matériel professionnel',
          price: '89',
          priceType: 'from',
          duration: '30-60 min',
          guarantee: 'Garantie résultat ou remboursé',
          included: ['Diagnostic gratuit', 'Matériel professionnel', 'Nettoyage après intervention']
        },
        {
          name: 'Recherche de fuite',
          description: 'Détection précise sans destruction avec caméra thermique et gaz traceur',
          price: '150',
          priceType: 'from',
          duration: '1-2h',
          guarantee: 'Localisation garantie',
          included: ['Rapport détaillé', 'Photos thermiques', 'Devis réparation']
        },
        {
          name: 'Dépannage chauffe-eau',
          description: 'Réparation et remplacement de chauffe-eau toutes marques',
          price: '120',
          priceType: 'from',
          duration: '1-3h',
          guarantee: 'Garantie 2 ans pièces et main d\'œuvre',
          included: ['Diagnostic', 'Pièces de base', 'Mise en service']
        }
      ]
    },
    serviceArea: {
      cities: ['Paris', 'Boulogne-Billancourt', 'Montreuil', 'Vincennes', 'Saint-Denis'],
      radius: 15,
      departments: ['75', '92', '93', '94'],
      travelFees: 'Gratuit dans Paris intramuros'
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
    },
    pricing: {
      paymentMethods: ['cash', 'check', 'card', 'transfer']
    },
    testimonials: {
      reviews: [
        {
          name: 'Marie Dupont',
          rating: 5,
          comment: 'Intervention très rapide en pleine nuit. Professionnel et efficace !',
          date: '2024-01-15',
          location: 'Paris 11ème'
        },
        {
          name: 'Jean Martin',
          rating: 5,
          comment: 'Excellent service, prix transparent, je recommande vivement.',
          date: '2024-01-10',
          location: 'Paris 20ème'
        }
      ]
    }
  },

  // 2. Électricien certifié à Lyon
  {
    businessInfo: {
      companyName: 'Élec\'Pro Lyon',
      legalForm: 'EURL',
      siret: '987 654 321 00021',
      insurance: 'Generali Pro',
      yearsOfExperience: '22',
      certifications: ['Qualifelec', 'RGE', 'IRVE'],
      businessType: 'electricien',
      description: 'Électricien certifié pour tous vos travaux électriques à Lyon'
    },
    contact: {
      phones: [
        { number: '04 78 90 12 34', type: 'main' },
        { number: '06 98 76 54 32', type: 'mobile' }
      ],
      emails: [
        { email: 'contact@elecpro-lyon.fr', type: 'contact' }
      ],
      address: {
        street: '123 avenue Jean Jaurès',
        city: 'Lyon',
        postalCode: '69007',
        country: 'France'
      },
      hours: {
        monday: { open: '08:00', close: '19:00', closed: false },
        tuesday: { open: '08:00', close: '19:00', closed: false },
        wednesday: { open: '08:00', close: '19:00', closed: false },
        thursday: { open: '08:00', close: '19:00', closed: false },
        friday: { open: '08:00', close: '19:00', closed: false },
        saturday: { open: '09:00', close: '17:00', closed: false },
        sunday: { open: '', close: '', closed: true }
      },
      socialMedia: {
        facebook: 'https://facebook.com/elecprolyon',
        linkedin: 'https://linkedin.com/company/elecpro-lyon'
      }
    },
    services: {
      mainServices: [
        {
          name: 'Mise aux normes électriques',
          description: 'Mise en conformité complète de votre installation selon NFC 15-100',
          price: '1500',
          priceType: 'from',
          duration: '1-3 jours',
          guarantee: 'Certificat Consuel inclus',
          included: ['Diagnostic complet', 'Tableau électrique neuf', 'Attestation conformité']
        },
        {
          name: 'Installation domotique',
          description: 'Maison connectée : éclairage, chauffage, volets automatisés',
          price: '2000',
          priceType: 'from',
          duration: '2-5 jours',
          guarantee: 'Garantie 5 ans sur le matériel',
          included: ['Étude personnalisée', 'Formation utilisation', 'Application mobile']
        },
        {
          name: 'Borne de recharge véhicule',
          description: 'Installation de borne pour véhicule électrique certifiée IRVE',
          price: '990',
          priceType: 'fixed',
          duration: '1 journée',
          guarantee: 'Garantie constructeur',
          included: ['Borne 7kW', 'Installation complète', 'Mise en service']
        },
        {
          name: 'Rénovation électrique',
          description: 'Rénovation complète de votre installation électrique vétuste',
          price: '80',
          priceType: 'from',
          duration: 'Sur devis',
          guarantee: 'Garantie décennale',
          included: ['Devis détaillé', 'Respect des délais', 'Nettoyage chantier']
        }
      ]
    },
    serviceArea: {
      cities: ['Lyon', 'Villeurbanne', 'Vénissieux', 'Caluire-et-Cuire', 'Bron', 'Écully'],
      radius: 20,
      departments: ['69', '01', '38'],
      travelFees: '0€ dans l\'agglomération lyonnaise'
    },
    branding: {
      colors: {
        primary: '#F59E0B',
        secondary: '#FCD34D',
        accent: '#3B82F6'
      },
      visualStyle: 'professional',
      typography: 'Roboto'
    },
    options: {
      selectedPages: ['about', 'faq', 'gallery'],
      paymentMethods: ['check', 'card', 'transfer', 'financing'],
      languages: ['Français'],
      emergency247: false
    }
  },

  // 3. Menuisier artisanal à Bordeaux
  {
    businessInfo: {
      companyName: 'L\'Atelier du Bois',
      legalForm: 'Auto-entrepreneur',
      siret: '456 789 123 00034',
      insurance: 'MAAF Pro',
      yearsOfExperience: '12',
      certifications: ['Qualibat', 'Label Artisan'],
      businessType: 'menuisier',
      description: 'Créations sur mesure en bois massif - Artisan menuisier à Bordeaux'
    },
    contact: {
      phones: [
        { number: '05 56 78 90 12', type: 'main' },
        { number: '06 45 67 89 01', type: 'mobile' }
      ],
      emails: [
        { email: 'contact@atelier-du-bois-bordeaux.fr', type: 'contact' }
      ],
      address: {
        street: '78 rue des Artisans',
        city: 'Bordeaux',
        postalCode: '33000',
        country: 'France'
      },
      hours: {
        monday: { open: '09:00', close: '18:00', closed: false },
        tuesday: { open: '09:00', close: '18:00', closed: false },
        wednesday: { open: '09:00', close: '18:00', closed: false },
        thursday: { open: '09:00', close: '18:00', closed: false },
        friday: { open: '09:00', close: '18:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '', close: '', closed: true }
      },
      socialMedia: {
        instagram: 'https://instagram.com/atelier_bois_bordeaux',
        facebook: 'https://facebook.com/atelierduboisbordeaux'
      }
    },
    services: {
      mainServices: [
        {
          name: 'Cuisine sur mesure',
          description: 'Conception et réalisation de cuisines en bois massif personnalisées',
          price: '5000',
          priceType: 'from',
          duration: '4-6 semaines',
          guarantee: 'Garantie 10 ans',
          included: ['Conception 3D', 'Bois certifié FSC', 'Pose incluse']
        },
        {
          name: 'Dressing personnalisé',
          description: 'Aménagement optimal de vos espaces avec dressing sur mesure',
          price: '2500',
          priceType: 'from',
          duration: '2-3 semaines',
          guarantee: 'Garantie 5 ans',
          included: ['Étude d\'aménagement', 'Accessoires inclus', 'Finitions soignées']
        },
        {
          name: 'Escalier bois',
          description: 'Création d\'escaliers en bois massif, design moderne ou traditionnel',
          price: '3500',
          priceType: 'from',
          duration: '3-4 semaines',
          guarantee: 'Garantie structure 10 ans',
          included: ['Plans détaillés', 'Rampe assortie', 'Vernis écologique']
        }
      ]
    },
    serviceArea: {
      cities: ['Bordeaux', 'Mérignac', 'Pessac', 'Talence', 'Bègles'],
      radius: 30,
      departments: ['33'],
      travelFees: 'Devis gratuit dans la CUB'
    },
    branding: {
      colors: {
        primary: '#92400E',
        secondary: '#B45309',
        accent: '#059669'
      },
      visualStyle: 'natural',
      typography: 'Merriweather'
    },
    options: {
      selectedPages: ['gallery', 'about'],
      paymentMethods: ['check', 'transfer', 'financing'],
      languages: ['Français'],
      emergency247: false
    },
    media: {
      photos: [
        { src: '/cuisine-chene.jpg', title: 'Cuisine en chêne massif', category: 'Cuisines' },
        { src: '/dressing-noyer.jpg', title: 'Dressing en noyer', category: 'Dressings' },
        { src: '/escalier-moderne.jpg', title: 'Escalier contemporain', category: 'Escaliers' }
      ]
    }
  },

  // 4. Peintre décorateur à Marseille
  {
    businessInfo: {
      companyName: 'Couleurs Méditerranée',
      legalForm: 'SARL',
      siret: '789 012 345 00045',
      insurance: 'Allianz Pro',
      yearsOfExperience: '8',
      certifications: ['Qualibat', 'RGE'],
      businessType: 'peintre',
      description: 'Peinture et décoration intérieure - Votre artisan coloriste à Marseille'
    },
    contact: {
      phones: [
        { number: '04 91 23 45 67', type: 'main' },
        { number: '06 78 90 12 34', type: 'mobile' }
      ],
      emails: [
        { email: 'contact@couleurs-mediterranee.fr', type: 'contact' },
        { email: 'devis@couleurs-mediterranee.fr', type: 'accounting' }
      ],
      address: {
        street: '56 boulevard de la Libération',
        city: 'Marseille',
        postalCode: '13001',
        country: 'France'
      },
      hours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '17:00', closed: false },
        saturday: { open: '', close: '', closed: true },
        sunday: { open: '', close: '', closed: true }
      }
    },
    services: {
      mainServices: [
        {
          name: 'Peinture intérieure',
          description: 'Peinture murs et plafonds avec finitions impeccables',
          price: '25',
          priceType: 'from',
          duration: 'Selon surface',
          guarantee: 'Garantie 2 ans',
          included: ['Protection des sols', 'Peinture écologique', 'Nettoyage final']
        },
        {
          name: 'Enduits décoratifs',
          description: 'Béton ciré, stuc, tadelakt pour un intérieur unique',
          price: '45',
          priceType: 'from',
          duration: '3-5 jours',
          guarantee: 'Garantie 5 ans',
          included: ['Échantillons', 'Préparation support', 'Finition protectrice']
        },
        {
          name: 'Ravalement façade',
          description: 'Rénovation complète de vos façades extérieures',
          price: '35',
          priceType: 'from',
          duration: 'Sur devis',
          guarantee: 'Garantie décennale',
          included: ['Nettoyage HP', 'Traitement fissures', 'Peinture hydrofuge']
        }
      ]
    },
    serviceArea: {
      cities: ['Marseille', 'Aubagne', 'La Ciotat', 'Cassis', 'Aix-en-Provence'],
      radius: 25,
      departments: ['13'],
      travelFees: 'Inclus dans le devis'
    },
    branding: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#14B8A6'
      },
      visualStyle: 'modern',
      typography: 'Montserrat'
    },
    options: {
      selectedPages: ['gallery', 'faq'],
      paymentMethods: ['cash', 'check', 'card'],
      languages: ['Français', 'Italien'],
      emergency247: false
    }
  },

  // 5. Maçon général à Toulouse
  {
    businessInfo: {
      companyName: 'Bâti Sud Construction',
      legalForm: 'SAS',
      siret: '321 098 765 00056',
      insurance: 'MMA BTP',
      yearsOfExperience: '25',
      certifications: ['Qualibat', 'RGE', 'Qualibat Patrimoine'],
      businessType: 'macon',
      description: 'Maçonnerie générale et gros œuvre - Construction neuve et rénovation'
    },
    contact: {
      phones: [
        { number: '05 61 34 56 78', type: 'main' },
        { number: '06 23 45 67 89', type: 'mobile' }
      ],
      emails: [
        { email: 'contact@batisud-construction.fr', type: 'contact' },
        { email: 'devis@batisud-construction.fr', type: 'accounting' }
      ],
      address: {
        street: '234 route de Narbonne',
        city: 'Toulouse',
        postalCode: '31400',
        country: 'France'
      },
      hours: {
        monday: { open: '07:00', close: '17:00', closed: false },
        tuesday: { open: '07:00', close: '17:00', closed: false },
        wednesday: { open: '07:00', close: '17:00', closed: false },
        thursday: { open: '07:00', close: '17:00', closed: false },
        friday: { open: '07:00', close: '16:00', closed: false },
        saturday: { open: '', close: '', closed: true },
        sunday: { open: '', close: '', closed: true }
      },
      socialMedia: {
        facebook: 'https://facebook.com/batisudconstruction',
        linkedin: 'https://linkedin.com/company/bati-sud-construction'
      }
    },
    services: {
      mainServices: [
        {
          name: 'Construction maison',
          description: 'Construction complète de maisons individuelles clés en main',
          price: '1200',
          priceType: 'from',
          duration: '6-9 mois',
          guarantee: 'Garantie décennale + dommages ouvrage',
          included: ['Étude de sol', 'Plans architecte', 'Suivi de chantier']
        },
        {
          name: 'Extension maison',
          description: 'Agrandissement et surélévation de votre habitation',
          price: '1500',
          priceType: 'from',
          duration: '2-4 mois',
          guarantee: 'Garantie décennale',
          included: ['Étude faisabilité', 'Démarches administratives', 'Raccordements']
        },
        {
          name: 'Rénovation complète',
          description: 'Rénovation lourde : gros œuvre, toiture, façades',
          price: '500',
          priceType: 'from',
          duration: 'Selon projet',
          guarantee: 'Garanties légales',
          included: ['Diagnostic gratuit', 'Devis détaillé', 'Coordination corps d\'état']
        },
        {
          name: 'Piscine maçonnée',
          description: 'Construction de piscines traditionnelles en béton',
          price: '15000',
          priceType: 'from',
          duration: '6-8 semaines',
          guarantee: 'Garantie décennale étanchéité',
          included: ['Terrassement', 'Local technique', 'Mise en eau']
        }
      ]
    },
    serviceArea: {
      cities: ['Toulouse', 'Blagnac', 'Colomiers', 'Tournefeuille', 'Balma', 'Muret'],
      radius: 40,
      departments: ['31', '32', '82'],
      travelFees: 'Selon distance du chantier'
    },
    branding: {
      colors: {
        primary: '#6B7280',
        secondary: '#DC2626',
        accent: '#F59E0B'
      },
      visualStyle: 'industrial',
      typography: 'Roboto'
    },
    options: {
      selectedPages: ['gallery', 'about', 'faq'],
      paymentMethods: ['check', 'transfer', 'financing'],
      languages: ['Français', 'Espagnol'],
      emergency247: false
    },
    testimonials: {
      reviews: [
        {
          name: 'Famille Garcia',
          rating: 5,
          comment: 'Excellente entreprise, très professionnelle. Notre maison a été livrée dans les temps.',
          date: '2023-10-15',
          location: 'Toulouse'
        },
        {
          name: 'M. Dubois',
          rating: 5,
          comment: 'Extension parfaitement réalisée. Équipe sérieuse et travail de qualité.',
          date: '2023-12-20',
          location: 'Colomiers'
        }
      ]
    }
  }
];

// Fonction pour générer et sauvegarder les sites
async function generateTestSites() {
  console.log('🚀 Début de la génération des 5 sites de test...\n');

  const results = [];

  for (let i = 0; i < testClients.length; i++) {
    const client = testClients[i];
    console.log(`\n📋 Génération du site ${i + 1}/5 : ${client.businessInfo?.companyName}`);
    console.log(`   Type: ${client.businessInfo?.businessType}`);
    console.log(`   Ville: ${client.contact?.address?.city}`);
    console.log(`   Services: ${client.services?.mainServices?.length || 0}`);
    
    try {
      // Générer le site
      console.log('   ⏳ Génération en cours...');
      const startTime = Date.now();
      
      const generatedSite = await aiSiteGenerator.generateSiteFromForm(client);
      
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      
      console.log(`   ✅ Site généré en ${duration.toFixed(2)}s`);
      console.log(`   📄 Pages créées: ${generatedSite.pages.length}`);
      console.log(`   🎨 Thème: ${generatedSite.theme.colors.primary}`);
      
      // Sauvegarder le résultat
      const outputDir = path.join(__dirname, 'generated-sites');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const filename = `${client.businessInfo?.businessType}-${client.contact?.address?.city?.toLowerCase()}.json`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, JSON.stringify(generatedSite, null, 2));
      console.log(`   💾 Sauvegardé dans: ${filename}`);
      
      // Analyser le contenu
      const stats = {
        client: client.businessInfo?.companyName,
        type: client.businessInfo?.businessType,
        city: client.contact?.address?.city,
        pages: generatedSite.pages.length,
        totalBlocks: generatedSite.pages.reduce((sum, page) => sum + page.blocks.length, 0),
        duration: duration,
        services: client.services?.mainServices?.length || 0,
        cities: client.serviceArea?.cities?.length || 0
      };
      
      results.push(stats);
      
      // Afficher un aperçu du contenu généré
      console.log('\n   📝 Aperçu du contenu généré:');
      const homePage = generatedSite.pages.find(p => p.isHomePage);
      if (homePage) {
        console.log(`   - Titre SEO: "${homePage.seo.title}"`);
        console.log(`   - Description: "${homePage.seo.description.substring(0, 100)}..."`);
        
        const heroBlock = homePage.blocks.find(b => b.type === 'HeroV3');
        if (heroBlock) {
          console.log(`   - Hero titre: "${heroBlock.props.title}"`);
        }
      }
      
    } catch (error) {
      console.error(`   ❌ Erreur lors de la génération: ${error}`);
      results.push({
        client: client.businessInfo?.companyName,
        error: error.message
      });
    }
  }
  
  // Résumé final
  console.log('\n\n📊 RÉSUMÉ DE LA GÉNÉRATION');
  console.log('═══════════════════════════════════════════════════════════════');
  
  results.forEach((result, index) => {
    if (result.error) {
      console.log(`\n❌ Site ${index + 1}: ${result.client}`);
      console.log(`   Erreur: ${result.error}`);
    } else {
      console.log(`\n✅ Site ${index + 1}: ${result.client}`);
      console.log(`   • Type: ${result.type}`);
      console.log(`   • Ville: ${result.city}`);
      console.log(`   • Pages générées: ${result.pages}`);
      console.log(`   • Blocs totaux: ${result.totalBlocks}`);
      console.log(`   • Services: ${result.services}`);
      console.log(`   • Villes couvertes: ${result.cities}`);
      console.log(`   • Temps de génération: ${result.duration.toFixed(2)}s`);
    }
  });
  
  const successCount = results.filter(r => !r.error).length;
  const totalTime = results.reduce((sum, r) => sum + (r.duration || 0), 0);
  const avgTime = totalTime / successCount;
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`\n🎯 STATISTIQUES GLOBALES:`);
  console.log(`   • Sites générés avec succès: ${successCount}/5`);
  console.log(`   • Temps total: ${totalTime.toFixed(2)}s`);
  console.log(`   • Temps moyen par site: ${avgTime.toFixed(2)}s`);
  console.log(`   • Total pages créées: ${results.reduce((sum, r) => sum + (r.pages || 0), 0)}`);
  console.log(`   • Total blocs créés: ${results.reduce((sum, r) => sum + (r.totalBlocks || 0), 0)}`);
  
  console.log('\n✨ Génération terminée ! Les sites sont disponibles dans ./generated-sites/');
}

// Exécuter la génération
generateTestSites().catch(console.error);
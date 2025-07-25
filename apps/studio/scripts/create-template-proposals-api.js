const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTemplateProposals() {
  try {
    console.log('🎨 Création des propositions de templates via API...\n');

    // Récupérer les clients de démonstration
    const clients = await prisma.client.findMany({
      where: {
        email: {
          contains: 'demo.'
        }
      },
      include: {
        projects: true
      }
    });

    console.log(`📋 ${clients.length} clients trouvés`);
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('                    PROPOSITIONS DE TEMPLATES                   ');
    console.log('═══════════════════════════════════════════════════════════════\n');

    const proposalIds = [];

    for (const client of clients) {
      console.log(`\n💼 ${client.companyName}`);
      console.log(`   📧 ${client.email}`);
      console.log(`   🏷️  Type: ${client.businessType || 'construction'}`);

      // Vérifier si une proposition existe déjà
      const existingProposal = await prisma.templateProposal.findFirst({
        where: {
          clientId: client.id,
          status: { in: ['ANALYZED', 'PROPOSED'] }
        }
      });

      if (existingProposal) {
        console.log(`   ⚠️  Proposition déjà existante (ID: ${existingProposal.id})`);
        console.log(`   📊 Status: ${existingProposal.status}`);
        proposalIds.push(existingProposal.id);
        continue;
      }

      // Créer des données de formulaire complètes
      const formData = {
        // Informations de base
        businessName: client.companyName,
        businessType: client.businessType || getBusinessTypeFromName(client.companyName),
        email: client.email,
        phone: client.phone || '01 23 45 67 89',
        address: client.address || '123 Rue de la République, 75001 Paris',
        website: client.website,
        
        // Services détaillés
        services: getServicesForBusiness(client.businessType || 'construction'),
        
        // Zones de service
        serviceAreas: [
          { city: 'Paris', postalCode: '75001', department: '75' },
          { city: 'Lyon', postalCode: '69001', department: '69' },
          { city: 'Marseille', postalCode: '13001', department: '13' },
          { city: 'Toulouse', postalCode: '31000', department: '31' },
          { city: 'Nice', postalCode: '06000', department: '06' }
        ],
        
        // Disponibilité et urgence
        availability: {
          is24x7: client.businessType === 'plumber' || client.businessType === 'electrician',
          workingHours: {
            monday: '8h-18h',
            tuesday: '8h-18h',
            wednesday: '8h-18h',
            thursday: '8h-18h',
            friday: '8h-18h',
            saturday: '9h-12h',
            sunday: 'Urgences uniquement'
          }
        },
        
        // Équipe
        teamSize: Math.floor(Math.random() * 15) + 5,
        yearEstablished: 2005 + Math.floor(Math.random() * 15),
        teamMembers: [
          {
            name: 'Jean Dupont',
            role: 'Fondateur & Directeur',
            experience: '20 ans',
            photo: '/team/director.jpg'
          },
          {
            name: 'Marie Martin',
            role: 'Chef d\'équipe',
            experience: '15 ans',
            photo: '/team/chef.jpg'
          }
        ],
        
        // Portfolio et réalisations
        portfolioImages: generateDetailedPortfolio(client.businessType || 'construction'),
        totalProjectsCompleted: Math.floor(Math.random() * 1000) + 500,
        
        // Style et branding
        stylePreference: getStyleForBusiness(client.businessType || 'construction'),
        colorPreference: getColorForBusiness(client.businessType || 'construction'),
        
        // Certifications et labels
        certifications: getCertificationsForBusiness(client.businessType || 'construction'),
        
        // Témoignages
        testimonials: [
          {
            text: 'Excellent travail, équipe professionnelle et ponctuelle.',
            author: 'Sophie L.',
            rating: 5,
            service: 'Rénovation complète'
          },
          {
            text: 'Je recommande vivement ! Rapport qualité/prix imbattable.',
            author: 'Marc D.',
            rating: 5,
            service: 'Installation'
          }
        ],
        
        // USP et valeurs
        uniqueSellingPoint: getUSPForBusiness(client.businessType || 'construction'),
        values: ['Qualité', 'Ponctualité', 'Transparence', 'Innovation']
      };

      // Créer la proposition
      const proposal = await prisma.templateProposal.create({
        data: {
          clientId: client.id,
          formData: formData,
          status: 'PENDING'
        }
      });

      console.log(`   ✅ Proposition créée (ID: ${proposal.id})`);
      console.log(`   📋 Status: PENDING (en attente d'analyse IA)`);
      proposalIds.push(proposal.id);
    }

    console.log('\n\n═══════════════════════════════════════════════════════════════');
    console.log('                        LIENS D\'ACCÈS                          ');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('🎯 INTERFACE ADMIN (pour analyser avec l\'IA):');
    console.log('   🔗 http://localhost:3000/admin/proposals\n');
    
    console.log('📋 ÉTAPES À SUIVRE:');
    console.log('   1. Ouvrir l\'interface admin ci-dessus');
    console.log('   2. Cliquer sur une proposition dans la liste');
    console.log('   3. Cliquer sur "Analyser avec IA" pour générer 3 variations');
    console.log('   4. Personnaliser les notes pour chaque option');
    console.log('   5. Envoyer au client pour validation\n');
    
    console.log('🔍 IDs des propositions créées:');
    proposalIds.forEach((id, index) => {
      console.log(`   ${index + 1}. ${id}`);
    });

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

function getBusinessTypeFromName(companyName) {
  if (companyName.toLowerCase().includes('plomb')) return 'plumber';
  if (companyName.toLowerCase().includes('élec')) return 'electrician';
  if (companyName.toLowerCase().includes('menuis') || companyName.toLowerCase().includes('bois')) return 'carpenter';
  if (companyName.toLowerCase().includes('peint') || companyName.toLowerCase().includes('couleur')) return 'painter';
  if (companyName.toLowerCase().includes('maçon') || companyName.toLowerCase().includes('construction')) return 'mason';
  return 'construction';
}

function getServicesForBusiness(businessType) {
  const services = {
    plumber: [
      { 
        name: 'Dépannage urgent 24/7', 
        description: 'Intervention rapide pour fuites, débouchages et urgences plomberie', 
        price: '80€/h',
        priceType: 'hourly',
        icon: '🚨',
        duration: '1-2h'
      },
      { 
        name: 'Installation sanitaire complète', 
        description: 'Création et rénovation de salles de bain et cuisines', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🚿',
        duration: '2-5 jours'
      },
      { 
        name: 'Débouchage canalisations', 
        description: 'Débouchage professionnel avec caméra d\'inspection', 
        price: '120€',
        priceType: 'fixed',
        icon: '🔧',
        duration: '1h'
      },
      { 
        name: 'Chauffe-eau et chaudière', 
        description: 'Installation, entretien et dépannage toutes marques', 
        price: 'À partir de 350€',
        priceType: 'from',
        icon: '🔥',
        duration: '2-4h'
      }
    ],
    electrician: [
      { 
        name: 'Mise aux normes électriques', 
        description: 'Mise en conformité complète installation électrique', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '⚡',
        duration: '1-3 jours'
      },
      { 
        name: 'Dépannage électrique urgent', 
        description: 'Intervention 24/7 pour pannes et urgences électriques', 
        price: '90€/h',
        priceType: 'hourly',
        icon: '🔌',
        duration: '1-2h'
      },
      { 
        name: 'Installation domotique', 
        description: 'Maison connectée : éclairage, chauffage, sécurité intelligents', 
        price: 'À partir de 1500€',
        priceType: 'from',
        icon: '🏠',
        duration: '2-5 jours'
      },
      { 
        name: 'Tableau électrique', 
        description: 'Remplacement et mise à jour tableau de répartition', 
        price: '800€',
        priceType: 'fixed',
        icon: '📊',
        duration: '4-6h'
      }
    ],
    carpenter: [
      { 
        name: 'Menuiserie sur mesure', 
        description: 'Création de meubles et aménagements personnalisés', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🪵',
        duration: '1-4 semaines'
      },
      { 
        name: 'Parquet et revêtements', 
        description: 'Pose et rénovation parquet massif, flottant, stratifié', 
        price: '45€/m²',
        priceType: 'perUnit',
        icon: '🏠',
        duration: '2-5 jours'
      },
      { 
        name: 'Escaliers bois', 
        description: 'Création et rénovation escaliers sur mesure', 
        price: 'À partir de 3000€',
        priceType: 'from',
        icon: '📐',
        duration: '1-2 semaines'
      },
      { 
        name: 'Portes et fenêtres', 
        description: 'Installation et réparation menuiseries intérieures/extérieures', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🚪',
        duration: '1-3 jours'
      }
    ],
    painter: [
      { 
        name: 'Peinture intérieure', 
        description: 'Murs, plafonds, boiseries avec finitions soignées', 
        price: '25€/m²',
        priceType: 'perUnit',
        icon: '🎨',
        duration: '2-5 jours'
      },
      { 
        name: 'Ravalement façade', 
        description: 'Nettoyage, réparation et peinture façades extérieures', 
        price: '35€/m²',
        priceType: 'perUnit',
        icon: '🏢',
        duration: '1-2 semaines'
      },
      { 
        name: 'Décoration murale', 
        description: 'Papier peint, enduits décoratifs, fresques murales', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🖼️',
        duration: '3-7 jours'
      },
      { 
        name: 'Traitement anti-humidité', 
        description: 'Solutions contre moisissures et infiltrations', 
        price: 'À partir de 50€/m²',
        priceType: 'from',
        icon: '💧',
        duration: '2-4 jours'
      }
    ],
    mason: [
      { 
        name: 'Construction gros œuvre', 
        description: 'Fondations, murs porteurs, dalles béton', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🏗️',
        duration: '2-8 semaines'
      },
      { 
        name: 'Rénovation complète', 
        description: 'Transformation et modernisation habitat', 
        price: 'Sur étude',
        priceType: 'quote',
        icon: '🔨',
        duration: '1-3 mois'
      },
      { 
        name: 'Extension maison', 
        description: 'Agrandissement avec étude personnalisée', 
        price: 'À partir de 1500€/m²',
        priceType: 'from',
        icon: '📏',
        duration: '2-4 mois'
      },
      { 
        name: 'Aménagements extérieurs', 
        description: 'Terrasses, murets, allées, piscines', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🌳',
        duration: '1-6 semaines'
      }
    ],
    construction: [
      { 
        name: 'Tous corps d\'état', 
        description: 'Coordination complète de vos travaux', 
        price: 'Sur devis',
        priceType: 'quote',
        icon: '🏗️',
        duration: 'Variable'
      }
    ]
  };
  
  return services[businessType] || services.construction;
}

function getStyleForBusiness(businessType) {
  const styles = {
    plumber: 'modern', // Pour templates Electric Neon ou Ocean Breeze
    electrician: 'tech', // Pour Cyberpunk 2030
    carpenter: 'natural', // Pour Terroir Naturel ou Forest Sanctuary
    painter: 'bold', // Pour Brutalist Impact
    mason: 'classic' // Pour Corporate Premium
  };
  return styles[businessType] || 'modern';
}

function getColorForBusiness(businessType) {
  const colors = {
    plumber: 'blue',
    electrician: 'yellow',
    carpenter: 'brown',
    painter: 'multicolor',
    mason: 'gray'
  };
  return colors[businessType] || 'blue';
}

function getCertificationsForBusiness(businessType) {
  const certs = {
    plumber: [
      { name: 'Qualibat RGE', year: '2020', image: '/certs/qualibat.png' },
      { name: 'Professionnel du Gaz', year: '2021', image: '/certs/pg.png' },
      { name: 'Handibat', year: '2022', image: '/certs/handibat.png' }
    ],
    electrician: [
      { name: 'Qualifelec', year: '2019', image: '/certs/qualifelec.png' },
      { name: 'RGE QualiPAC', year: '2020', image: '/certs/qualipac.png' },
      { name: 'Attestation Consuel', year: '2023', image: '/certs/consuel.png' }
    ],
    carpenter: [
      { name: 'Qualibat Menuiserie', year: '2018', image: '/certs/qualibat.png' },
      { name: 'Artisan d\'Art', year: '2019', image: '/certs/artisan.png' },
      { name: 'PEFC Bois Durable', year: '2021', image: '/certs/pefc.png' }
    ],
    painter: [
      { name: 'Qualibat Peinture', year: '2020', image: '/certs/qualibat.png' },
      { name: 'Label Peinture Éco', year: '2021', image: '/certs/eco.png' },
      { name: 'Applicateur Agréé', year: '2022', image: '/certs/applicateur.png' }
    ],
    mason: [
      { name: 'Qualibat Gros Œuvre', year: '2017', image: '/certs/qualibat.png' },
      { name: 'Maître Artisan', year: '2019', image: '/certs/maitre.png' },
      { name: 'Éco-Artisan RGE', year: '2020', image: '/certs/rge.png' }
    ]
  };
  return certs[businessType] || [];
}

function getUSPForBusiness(businessType) {
  const usps = {
    plumber: 'Intervention rapide 24/7 avec devis gratuit et transparent',
    electrician: 'Expertise en domotique et solutions d\'économie d\'énergie',
    carpenter: 'Créations sur mesure avec bois certifiés durables',
    painter: 'Finitions haut de gamme avec peintures écologiques',
    mason: 'Construction traditionnelle alliée aux techniques modernes'
  };
  return usps[businessType] || 'Excellence et professionnalisme depuis plus de 10 ans';
}

function generateDetailedPortfolio(businessType) {
  const categories = {
    plumber: ['Salle de bain', 'Cuisine', 'Chauffage', 'Urgence'],
    electrician: ['Tableau électrique', 'Domotique', 'Éclairage', 'Sécurité'],
    carpenter: ['Mobilier', 'Escalier', 'Parquet', 'Aménagement'],
    painter: ['Intérieur', 'Façade', 'Décoration', 'Traitement'],
    mason: ['Construction', 'Rénovation', 'Extension', 'Extérieur']
  };
  
  const images = [];
  const projectCategories = categories[businessType] || categories.mason;
  
  for (let i = 0; i < 12; i++) {
    images.push({
      url: `/portfolio/${businessType}-project-${i + 1}.jpg`,
      title: `${projectCategories[i % projectCategories.length]} - Projet ${i + 1}`,
      description: `Réalisation exceptionnelle pour un client satisfait`,
      category: projectCategories[i % projectCategories.length],
      date: `2024-${String(i + 1).padStart(2, '0')}-15`
    });
  }
  
  return images;
}

// Lancer le script
createTemplateProposals().catch(console.error);
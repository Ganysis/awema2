const { PrismaClient } = require('@prisma/client');
const { AdaptiveTemplateService } = require('../dist/lib/services/adaptive-template.service');
const { ContentPersonalizationService } = require('../dist/lib/services/content-personalization.service');

const prisma = new PrismaClient();

async function generateTemplateProposals() {
  try {
    console.log('🎨 Génération des propositions de templates...\n');

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

    console.log(`📋 ${clients.length} clients trouvés\n`);

    for (const client of clients) {
      console.log(`\n💼 Traitement de ${client.companyName}...`);

      // Simuler des données de formulaire complètes
      const formData = {
        businessName: client.companyName,
        businessType: client.businessType || 'construction',
        email: client.email,
        phone: client.phone,
        address: client.address,
        
        // Services selon le type de business
        services: getServicesForBusiness(client.businessType),
        
        // Zones de service
        serviceAreas: [
          { city: 'Paris', department: '75' },
          { city: 'Lyon', department: '69' },
          { city: 'Marseille', department: '13' }
        ],
        
        // Disponibilité
        availability: {
          is24x7: client.businessType === 'plumber' || client.businessType === 'electrician'
        },
        
        // Équipe
        teamSize: Math.floor(Math.random() * 10) + 5,
        yearEstablished: 2010 + Math.floor(Math.random() * 10),
        
        // Portfolio
        portfolioImages: generatePortfolioImages(client.businessType),
        
        // Style
        stylePreference: getStyleForBusiness(client.businessType),
        colorPreference: getColorForBusiness(client.businessType),
        
        // Certifications
        certifications: getCertificationsForBusiness(client.businessType)
      };

      // Créer une proposition de template
      const proposal = await prisma.templateProposal.create({
        data: {
          clientId: client.id,
          formData: formData,
          status: 'PENDING'
        }
      });

      console.log(`   ✅ Proposition créée (ID: ${proposal.id})`);

      // Simuler l'analyse IA
      const aiAnalysis = {
        businessProfile: {
          description: `${client.companyName} est une entreprise spécialisée avec plus de ${formData.teamSize} experts.`,
          specificites: getSpecificitesForBusiness(client.businessType)
        },
        priorities: getPrioritiesForBusiness(client.businessType),
        keyPoints: [
          'Expertise reconnue dans le domaine',
          'Service client de qualité',
          'Intervention rapide',
          'Tarifs transparents'
        ]
      };

      // Générer 3 variations de templates
      const templateService = new AdaptiveTemplateService();
      const contentService = new ContentPersonalizationService();

      const variations = await templateService.generateUniqueVariations(
        formData,
        aiAnalysis,
        3
      );

      // Mettre à jour la proposition avec les variations
      await prisma.templateProposal.update({
        where: { id: proposal.id },
        data: {
          status: 'ANALYZED',
          aiAnalysis: aiAnalysis,
          option1: variations[0],
          option2: variations[1],
          option3: variations[2],
          analyzedAt: new Date()
        }
      });

      console.log(`   ✅ 3 variations de templates générées`);
      console.log(`   🎨 Styles: ${variations.map(v => v.theme.name).join(', ')}`);
    }

    console.log('\n\n✅ Génération terminée !');
    console.log('\n📋 LIENS POUR VÉRIFIER:');
    console.log('   🔗 Dashboard Admin: http://localhost:3000/admin/proposals');
    console.log('   🔗 Dashboard Clients: http://localhost:3000/dashboard');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function getServicesForBusiness(businessType) {
  const services = {
    plumber: [
      { name: 'Dépannage urgent', description: 'Intervention 24/7 pour fuites et urgences', price: '80€/h', icon: '🚨' },
      { name: 'Installation sanitaire', description: 'Pose complète salle de bain et cuisine', price: 'Sur devis', icon: '🚿' },
      { name: 'Débouchage', description: 'Canalisations et évacuations', price: '120€', icon: '🔧' },
      { name: 'Chauffe-eau', description: 'Installation et réparation', price: 'À partir de 350€', icon: '🔥' }
    ],
    electrician: [
      { name: 'Mise aux normes', description: 'Conformité électrique complète', price: 'Sur devis', icon: '⚡' },
      { name: 'Dépannage électrique', description: 'Intervention urgente 24/7', price: '90€/h', icon: '🔌' },
      { name: 'Installation domotique', description: 'Maison connectée et intelligente', price: 'À partir de 1500€', icon: '🏠' },
      { name: 'Tableau électrique', description: 'Remplacement et mise à jour', price: '800€', icon: '📊' }
    ],
    carpenter: [
      { name: 'Menuiserie sur mesure', description: 'Meubles et aménagements personnalisés', price: 'Sur devis', icon: '🪵' },
      { name: 'Parquet et sol', description: 'Pose et rénovation tous types', price: '45€/m²', icon: '🏠' },
      { name: 'Escalier', description: 'Création et rénovation', price: 'À partir de 3000€', icon: '📐' },
      { name: 'Portes et fenêtres', description: 'Installation et réparation', price: 'Sur devis', icon: '🚪' }
    ],
    painter: [
      { name: 'Peinture intérieure', description: 'Murs, plafonds, boiseries', price: '25€/m²', icon: '🎨' },
      { name: 'Façade extérieure', description: 'Ravalement et protection', price: '35€/m²', icon: '🏢' },
      { name: 'Décoration murale', description: 'Papier peint et enduits décoratifs', price: 'Sur devis', icon: '🖼️' },
      { name: 'Traitement humidité', description: 'Anti-moisissure et étanchéité', price: 'À partir de 50€/m²', icon: '💧' }
    ],
    mason: [
      { name: 'Gros œuvre', description: 'Fondations, murs porteurs, dalles', price: 'Sur devis', icon: '🏗️' },
      { name: 'Rénovation', description: 'Transformation complète habitat', price: 'Sur étude', icon: '🔨' },
      { name: 'Extension', description: 'Agrandissement maison', price: 'À partir de 1500€/m²', icon: '📏' },
      { name: 'Terrasse et aménagement', description: 'Création espaces extérieurs', price: 'Sur devis', icon: '🌳' }
    ]
  };
  
  return services[businessType] || services.mason;
}

function getStyleForBusiness(businessType) {
  const styles = {
    plumber: 'modern',
    electrician: 'tech',
    carpenter: 'natural',
    painter: 'creative',
    mason: 'bold'
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
      { name: 'Qualibat', year: '2020' },
      { name: 'RGE', year: '2021' }
    ],
    electrician: [
      { name: 'Qualifelec', year: '2019' },
      { name: 'RGE', year: '2020' }
    ],
    carpenter: [
      { name: 'Qualibat', year: '2018' },
      { name: 'Artisan d\'Art', year: '2019' }
    ],
    painter: [
      { name: 'Qualibat', year: '2020' },
      { name: 'Label Peinture', year: '2021' }
    ],
    mason: [
      { name: 'Qualibat', year: '2017' },
      { name: 'Maître Artisan', year: '2019' }
    ]
  };
  return certs[businessType] || [];
}

function getSpecificitesForBusiness(businessType) {
  const specs = {
    plumber: 'Spécialiste des interventions d\'urgence et installations sanitaires modernes',
    electrician: 'Expert en électricité et domotique nouvelle génération',
    carpenter: 'Artisan créateur de mobilier sur mesure et aménagements bois',
    painter: 'Décorateur spécialisé en finitions haut de gamme',
    mason: 'Constructeur traditionnel avec expertise en éco-construction'
  };
  return specs[businessType] || 'Entreprise de construction professionnelle';
}

function getPrioritiesForBusiness(businessType) {
  const priorities = {
    plumber: ['Urgence 24/7', 'Confiance', 'Rapidité'],
    electrician: ['Sécurité', 'Innovation', 'Normes'],
    carpenter: ['Créativité', 'Qualité', 'Sur-mesure'],
    painter: ['Esthétique', 'Finition', 'Couleurs'],
    mason: ['Solidité', 'Tradition', 'Durabilité']
  };
  return priorities[businessType] || ['Qualité', 'Service', 'Prix'];
}

function generatePortfolioImages(businessType) {
  const images = [];
  const count = Math.floor(Math.random() * 6) + 5;
  
  for (let i = 0; i < count; i++) {
    images.push({
      url: `/placeholder/${businessType}-${i + 1}.jpg`,
      title: `Réalisation ${i + 1}`,
      description: `Projet ${businessType} haute qualité`,
      category: ['residential', 'commercial', 'renovation'][i % 3]
    });
  }
  
  return images;
}

// Compiler d'abord les services TypeScript
console.log('⚙️  Compilation des services TypeScript...');
const { execSync } = require('child_process');
try {
  execSync('npm run build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
} catch (error) {
  console.log('⚠️  Erreur de compilation, tentative avec les fichiers existants...');
}

// Lancer la génération
generateTemplateProposals().catch(console.error);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Exemples de données client avec différents niveaux de complétude
const testClients = [
  {
    name: 'Client Complet',
    businessName: 'Plomberie Express 24/7',
    businessType: 'plombier',
    data: {
      // Toutes les données disponibles
      services: [
        { name: 'Dépannage urgent', priceRange: { min: 80, max: 200, unit: 'intervention' } },
        { name: 'Installation sanitaire', priceRange: { min: 500, max: 5000, unit: 'projet' } },
        { name: 'Débouchage', priceRange: { min: 100, max: 300, unit: 'intervention' } },
        { name: 'Réparation fuite', priceRange: { min: 150, max: 400, unit: 'intervention' } },
        { name: 'Chaudière', priceRange: { min: 200, max: 3000, unit: 'intervention' } },
        { name: 'Rénovation salle de bain', priceRange: { min: 3000, max: 15000, unit: 'projet' } }
      ],
      availability: { is24x7: true, emergencyResponseTime: '30 minutes' },
      portfolioImages: [
        { url: 'img1.jpg', title: 'Salle de bain moderne' },
        { url: 'img2.jpg', title: 'Installation chaudière' },
        { url: 'img3.jpg', title: 'Plomberie cuisine' }
      ],
      testimonials: [
        { clientName: 'M. Dupont', comment: 'Intervention rapide et efficace', rating: 5 },
        { clientName: 'Mme Martin', comment: 'Très professionnel', rating: 5 }
      ],
      certifications: [
        { name: 'RGE', year: 2020 },
        { name: 'Qualibat', year: 2019 }
      ],
      teamMembers: [
        { name: 'Jean Dupuis', role: 'Gérant', experience: '15 ans' },
        { name: 'Pierre Martin', role: 'Plombier senior', experience: '10 ans' }
      ],
      pricing: { hourlyRate: 65, freeQuote: true },
      serviceAreas: ['Paris', 'Boulogne', 'Neuilly', 'Levallois'],
      yearEstablished: 2008
    }
  },
  {
    name: 'Client Minimal',
    businessName: 'Électricité Martin',
    businessType: 'electricien',
    data: {
      // Données minimales
      services: ['Installation électrique', 'Dépannage', 'Mise aux normes'],
      phone: '01 23 45 67 89',
      email: 'contact@elec-martin.fr',
      serviceAreas: ['Lyon'],
      yearEstablished: 2020
    }
  },
  {
    name: 'Client Visuel',
    businessName: 'Menuiserie Artisanale',
    businessType: 'menuisier',
    data: {
      // Focus sur le portfolio
      services: ['Meubles sur mesure', 'Cuisine', 'Dressing', 'Bibliothèque'],
      portfolioImages: [
        { url: 'cuisine1.jpg', title: 'Cuisine en chêne' },
        { url: 'dressing1.jpg', title: 'Dressing moderne' },
        { url: 'biblio1.jpg', title: 'Bibliothèque sur mesure' },
        { url: 'table1.jpg', title: 'Table en noyer' },
        { url: 'escalier1.jpg', title: 'Escalier design' },
        { url: 'bureau1.jpg', title: 'Bureau home office' },
        { url: 'cuisine2.jpg', title: 'Cuisine contemporaine' },
        { url: 'meuble1.jpg', title: 'Meuble TV' },
        { url: 'placard1.jpg', title: 'Placards intégrés' },
        { url: 'terrasse1.jpg', title: 'Aménagement terrasse' }
      ],
      certifications: [{ name: 'Artisan d\'Art', year: 2018 }],
      yearEstablished: 2015,
      uniqueSellingPoint: 'Création unique en bois local'
    }
  },
  {
    name: 'Client Urgence',
    businessName: 'SOS Serrurerie',
    businessType: 'serrurier',
    data: {
      // Focus urgence sans prix
      services: ['Ouverture porte', 'Changement serrure', 'Blindage', 'Coffre-fort'],
      availability: { is24x7: true, emergencyResponseTime: '15 minutes' },
      serviceAreas: ['Marseille', 'Aix-en-Provence', 'Aubagne'],
      teamSize: 8,
      phone: '06 12 34 56 78',
      guarantees: ['Intervention garantie', 'Devis gratuit', 'Sans casse']
    }
  },
  {
    name: 'Client Écologique',
    businessName: 'Jardins Verts',
    businessType: 'jardinier',
    data: {
      // Focus écologique
      services: [
        { name: 'Entretien jardins', description: 'Tonte, taille, désherbage' },
        { name: 'Création espaces verts', description: 'Conception et réalisation' },
        { name: 'Potager bio', description: 'Installation et conseil' }
      ],
      labels: ['eco', 'Bio', 'Permaculture'],
      ecoFriendly: true,
      certifications: [
        { name: 'Agriculture biologique', year: 2019 },
        { name: 'Jardins écologiques', year: 2020 }
      ],
      uniqueSellingPoint: 'Jardinage 100% écologique sans pesticides',
      materials: [
        { name: 'Compost bio', ecoFriendly: true },
        { name: 'Paillage naturel', ecoFriendly: true }
      ]
    }
  }
];

async function testAdaptiveTemplates() {
  console.log('🧪 Test du système de templates adaptatifs\n');
  
  for (const testClient of testClients) {
    console.log(`\n📋 ${testClient.name} - ${testClient.businessName}`);
    console.log('=' .repeat(50));
    
    // Simuler l'analyse des données
    const dataAnalysis = analyzeClientData(testClient.data);
    console.log('\n📊 Analyse des données:');
    console.log(`- Services: ${dataAnalysis.hasServices ? '✅' : '❌'} (${dataAnalysis.servicesCount} services)`);
    console.log(`- Prix: ${dataAnalysis.hasPricing ? '✅' : '❌'}`);
    console.log(`- Portfolio: ${dataAnalysis.hasPortfolio ? '✅' : '❌'} (${dataAnalysis.portfolioCount} images)`);
    console.log(`- Témoignages: ${dataAnalysis.hasTestimonials ? '✅' : '❌'}`);
    console.log(`- Équipe: ${dataAnalysis.hasTeam ? '✅' : '❌'}`);
    console.log(`- Certifications: ${dataAnalysis.hasCertifications ? '✅' : '❌'}`);
    console.log(`- Urgence 24/7: ${dataAnalysis.hasEmergency ? '✅' : '❌'}`);
    
    // Déterminer la structure optimale
    const optimalStructure = determineOptimalStructure(testClient.businessType, dataAnalysis);
    console.log(`\n🎯 Structure recommandée: ${optimalStructure.name}`);
    console.log(`📦 Blocs sélectionnés:`);
    optimalStructure.blocks.forEach((block, index) => {
      console.log(`  ${index + 1}. ${block.type} (${block.variant})`);
    });
    
    // Montrer les adaptations
    console.log('\n🔧 Adaptations spécifiques:');
    if (!dataAnalysis.hasPricing) {
      console.log('  - Pas de bloc pricing (données manquantes)');
      console.log('  - Ajout CTA "Devis gratuit" à la place');
    }
    if (!dataAnalysis.hasPortfolio) {
      console.log('  - Pas de galerie (pas d\'images)');
      console.log('  - Ajout bloc "Processus de travail" à la place');
    }
    if (dataAnalysis.hasEmergency) {
      console.log('  - Ajout bloc urgence en position haute');
      console.log('  - Hero avec badge "24/7"');
    }
    if (dataAnalysis.hasCertifications) {
      console.log('  - Ajout section certifications/garanties');
    }
  }
  
  await prisma.$disconnect();
}

function analyzeClientData(data) {
  return {
    hasServices: data.services && data.services.length > 0,
    servicesCount: data.services ? data.services.length : 0,
    hasPricing: data.pricing?.hourlyRate || data.services?.some(s => s.priceRange),
    hasPortfolio: data.portfolioImages && data.portfolioImages.length > 0,
    portfolioCount: data.portfolioImages ? data.portfolioImages.length : 0,
    hasTestimonials: data.testimonials && data.testimonials.length > 0,
    hasTeam: data.teamMembers && data.teamMembers.length > 0,
    hasCertifications: data.certifications && data.certifications.length > 0,
    hasEmergency: data.availability?.is24x7,
    hasEco: data.ecoFriendly || data.labels?.includes('eco')
  };
}

function determineOptimalStructure(businessType, analysis) {
  // Logique simplifiée pour la démo
  if (analysis.hasEmergency) {
    return {
      name: 'Structure Urgence',
      blocks: [
        { type: 'header-v3-perfect', variant: 'sticky-urgent' },
        { type: 'hero-v3-perfect', variant: 'emergency-hero' },
        { type: 'cta-v3-perfect', variant: 'urgency-banner' },
        { type: 'services-v3-perfect', variant: 'quick-services' },
        { type: 'features-v3-perfect', variant: '24-7-features' },
        { type: 'testimonials-v3-perfect', variant: 'trust-reviews' },
        { type: 'contact-v3-perfect', variant: 'emergency-form' },
        { type: 'footer-v3-perfect', variant: 'contact-footer' }
      ]
    };
  }
  
  if (analysis.portfolioCount > 5) {
    return {
      name: 'Structure Portfolio',
      blocks: [
        { type: 'header-v3-perfect', variant: 'creative-menu' },
        { type: 'hero-v3-perfect', variant: 'visual-hero' },
        { type: 'gallery-v3-perfect', variant: 'masonry-showcase' },
        { type: 'content-v3-perfect', variant: 'about-artist' },
        { type: 'services-v3-perfect', variant: 'creative-services' },
        { type: 'gallery-v3-perfect', variant: 'before-after' },
        { type: 'testimonials-v3-perfect', variant: 'creative-reviews' },
        { type: 'contact-v3-perfect', variant: 'project-inquiry' },
        { type: 'footer-v3-perfect', variant: 'portfolio-footer' }
      ]
    };
  }
  
  if (analysis.hasEco) {
    return {
      name: 'Structure Écologique',
      blocks: [
        { type: 'header-v3-perfect', variant: 'eco-header' },
        { type: 'hero-v3-perfect', variant: 'nature-hero' },
        { type: 'content-v3-perfect', variant: 'eco-mission' },
        { type: 'features-v3-perfect', variant: 'eco-benefits' },
        { type: 'services-v3-perfect', variant: 'green-services' },
        { type: 'content-v3-perfect', variant: 'certifications' },
        { type: 'testimonials-v3-perfect', variant: 'eco-testimonials' },
        { type: 'contact-v3-perfect', variant: 'nature-contact' },
        { type: 'footer-v3-perfect', variant: 'eco-footer' }
      ]
    };
  }
  
  // Structure par défaut
  return {
    name: 'Structure Standard',
    blocks: [
      { type: 'header-v3-perfect', variant: 'professional' },
      { type: 'hero-v3-perfect', variant: 'modern' },
      { type: 'content-v3-perfect', variant: 'about' },
      { type: 'services-v3-perfect', variant: 'grid' },
      { type: 'features-v3-perfect', variant: 'benefits' },
      { type: 'testimonials-v3-perfect', variant: 'carousel' },
      { type: 'contact-v3-perfect', variant: 'form-map' },
      { type: 'footer-v3-perfect', variant: 'complete' }
    ]
  };
}

// Exécuter le test
testAdaptiveTemplates().catch(console.error);
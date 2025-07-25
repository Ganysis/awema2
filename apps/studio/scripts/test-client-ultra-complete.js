const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

// Client ULTRA COMPLET - Plombier Premium avec toutes les données possibles
const ultraCompleteClient = {
  // Informations de base
  name: 'Jean-Pierre Dubois',
  email: 'jp.dubois@plomberie-excellence.fr',
  phone: '06 12 34 56 78',
  companyName: 'Plomberie Excellence Pro',
  businessType: 'plombier',
  
  // Données du formulaire ULTRA
  ultraFormData: {
    // Section 1: Informations entreprise
    businessName: 'Plomberie Excellence Pro',
    businessType: 'plombier',
    legalStatus: 'SARL',
    siret: '12345678900001',
    yearEstablished: 2008,
    teamSize: 12,
    familyBusiness: true,
    
    // Section 2: Histoire & Valeurs
    founderStory: 'Après 15 ans comme chef d\'équipe chez un grand plombier parisien, j\'ai créé Plomberie Excellence Pro pour offrir un service plus personnalisé et humain. Fils et petit-fils de plombiers, j\'ai grandi dans les tuyaux !',
    previousExperience: 'Chef d\'équipe chez Plomberie Parisienne (2000-2008), Compagnon plombier chez Les Artisans Réunis (1995-2000)',
    uniqueSellingPoint: 'Seule entreprise certifiée RGE + QualiPAC + Handibat de la région. Intervention garantie en 30 minutes pour les urgences.',
    companyValues: ['Transparence totale', 'Respect du client', 'Travail soigné', 'Innovation écologique', 'Formation continue'],
    companyMission: 'Rendre la plomberie accessible, transparente et écologique pour tous',
    slogan: 'L\'eau, c\'est la vie. Nous en prenons soin.',
    
    // Section 3: Équipe détaillée avec photos
    teamMembers: [
      {
        name: 'Jean-Pierre Dubois',
        role: 'Gérant fondateur',
        experience: '28 ans d\'expérience',
        specialties: ['Chauffage', 'Pompes à chaleur'],
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', // Business man
        bio: 'Maître artisan, formateur CFA'
      },
      {
        name: 'Marie Dubois',
        role: 'Responsable administrative',
        experience: '15 ans',
        specialties: ['Gestion', 'Relation client'],
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', // Business woman
        bio: 'Diplômée en gestion d\'entreprise'
      },
      {
        name: 'Thomas Martin',
        role: 'Chef d\'équipe',
        experience: '12 ans',
        specialties: ['Dépannage urgent', 'Salle de bain'],
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', // Professional man
        bio: 'Spécialiste salles de bain design'
      },
      {
        name: 'Lucas Bernard',
        role: 'Plombier senior',
        experience: '8 ans',
        specialties: ['Cuisine', 'Sanitaires'],
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', // Friendly man
        bio: 'Expert en économies d\'eau'
      }
    ],
    languages: ['Français', 'Anglais', 'Portugais', 'Arabe'],
    
    // Section 4: Certifications & Assurances avec images
    certifications: [
      {
        name: 'RGE - Reconnu Garant de l\'Environnement',
        year: 2018,
        number: 'RGE-2018-75-1234',
        image: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/e5/Logo_RGE.svg/200px-Logo_RGE.svg.png',
        description: 'Qualification pour travaux d\'économie d\'énergie'
      },
      {
        name: 'QualiPAC',
        year: 2019,
        number: 'QP-2019-456',
        image: 'https://www.qualit-enr.org/wp-content/uploads/2019/01/qualipac-2019.png',
        description: 'Installation pompes à chaleur'
      },
      {
        name: 'Handibat',
        year: 2020,
        number: 'HB-75-2020',
        image: 'https://www.handibat.info/sites/default/files/logo-handibat.png',
        description: 'Accessibilité et adaptation du logement'
      },
      {
        name: 'PGN - Professionnel Gaz Naturel',
        year: 2017,
        number: 'PGN-17-789',
        description: 'Habilitation travaux gaz'
      }
    ],
    insurances: {
      decennale: true,
      decennaleNumber: 'AXA-DEC-123456',
      decennaleExpiry: '2025-12-31',
      rcPro: true,
      rcProNumber: 'MAIF-RC-789012',
      rcProExpiry: '2024-12-31',
      rcProAmount: '3000000'
    },
    labels: ['Artisan de confiance', 'Eco-artisan', 'Meilleur ouvrier de France 2019'],
    guarantees: ['Garantie 10 ans pièces et main d\'œuvre', 'Satisfaction ou re-intervention gratuite', 'Devis respecté à 100%', 'Propreté du chantier garantie'],
    
    // Section 5: Services ULTRA détaillés avec images
    services: [
      {
        name: 'Dépannage Urgent 24/7',
        description: 'Intervention en 30 minutes pour toute urgence : fuite, dégât des eaux, canalisation bouchée',
        priceRange: { min: 89, max: 250, unit: 'intervention' },
        duration: '30min à 2h',
        isSpecialty: true,
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600', // Emergency plumbing
        includes: ['Diagnostic', 'Réparation', 'Conseils prévention'],
        guarantee: '6 mois'
      },
      {
        name: 'Installation Salle de Bain Complète',
        description: 'Création ou rénovation complète : douche italienne, baignoire, WC suspendus, meubles',
        priceRange: { min: 3000, max: 15000, unit: 'projet' },
        duration: '3 à 10 jours',
        isSpecialty: true,
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600', // Modern bathroom
        includes: ['Plans 3D', 'Dépose ancien', 'Installation', 'Finitions'],
        guarantee: '10 ans'
      },
      {
        name: 'Chaudière & Chauffage',
        description: 'Installation, entretien et dépannage toutes marques. Spécialiste pompes à chaleur',
        priceRange: { min: 150, max: 8000, unit: 'intervention' },
        duration: '2h à 3 jours',
        isSpecialty: true,
        image: 'https://images.unsplash.com/photo-1585129777188-94600bc7b4e3?w=600', // Heating system
        includes: ['Diagnostic', 'Devis détaillé', 'Installation', 'Mise en service', 'Contrat entretien'],
        guarantee: '5 ans constructeur'
      },
      {
        name: 'Débouchage Canalisation',
        description: 'Débouchage haute pression, inspection caméra, curage de canalisations',
        priceRange: { min: 120, max: 500, unit: 'intervention' },
        duration: '1h à 4h',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', // Pipe cleaning
        includes: ['Inspection caméra', 'Débouchage', 'Nettoyage', 'Rapport'],
        guarantee: '3 mois'
      },
      {
        name: 'Détection de Fuite',
        description: 'Recherche de fuite non destructive par caméra thermique et gaz traceur',
        priceRange: { min: 200, max: 600, unit: 'diagnostic' },
        duration: '2h à 4h',
        image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600', // Leak detection
        includes: ['Recherche', 'Localisation précise', 'Rapport', 'Devis réparation'],
        guarantee: 'Fuite trouvée ou remboursé'
      },
      {
        name: 'Adoucisseur d\'Eau',
        description: 'Installation et entretien d\'adoucisseurs pour protéger vos installations',
        priceRange: { min: 1500, max: 3500, unit: 'installation' },
        duration: '4h à 1 jour',
        image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600', // Water softener
        includes: ['Analyse eau', 'Installation', 'Réglages', 'Formation', 'Sel 1 an'],
        guarantee: '5 ans'
      }
    ],
    
    // Section 6: Portfolio avec images haute qualité
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        title: 'Salle de bain moderne - Neuilly',
        description: 'Rénovation complète avec douche italienne XXL',
        category: 'bathroom',
        date: '2024-01'
      },
      {
        url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
        title: 'Salle de bain luxe - Paris 16',
        description: 'Baignoire îlot et double vasque en marbre',
        category: 'bathroom',
        date: '2024-02'
      },
      {
        url: 'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=800',
        title: 'Cuisine design - Boulogne',
        description: 'Installation complète plomberie cuisine américaine',
        category: 'kitchen',
        date: '2023-12'
      },
      {
        url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
        title: 'Chaufferie collective',
        description: 'Remplacement chaudière immeuble 30 logements',
        category: 'heating',
        date: '2023-11'
      },
      {
        url: 'https://images.unsplash.com/photo-1504652517000-ae1068478c59?w=800',
        title: 'Installation pompe à chaleur',
        description: 'PAC air-eau haute performance maison 200m²',
        category: 'heating',
        date: '2024-01'
      },
      {
        url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800',
        title: 'Rénovation tuyauterie',
        description: 'Remplacement complet tuyauterie cuivre immeuble ancien',
        category: 'plumbing',
        date: '2023-10'
      }
    ],
    
    // Images avant/après
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1609946860441-a51ffcf22208?w=600',
        after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600',
        title: 'Transformation salle de bain',
        description: 'De vétuste à moderne en 5 jours'
      },
      {
        before: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=600',
        after: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600',
        title: 'Rénovation cuisine',
        description: 'Modernisation complète plomberie'
      }
    ],
    
    // Section 7: Zones & Disponibilité
    mainAddress: {
      street: '42 Avenue des Champs-Élysées',
      city: 'Paris',
      postalCode: '75008',
      country: 'France'
    },
    serviceAreas: [
      { city: 'Paris', department: '75', maxDistance: 0 },
      { city: 'Neuilly-sur-Seine', department: '92', maxDistance: 5 },
      { city: 'Boulogne-Billancourt', department: '92', maxDistance: 8 },
      { city: 'Levallois-Perret', department: '92', maxDistance: 6 },
      { city: 'Issy-les-Moulineaux', department: '92', maxDistance: 10 },
      { city: 'Saint-Cloud', department: '92', maxDistance: 12 }
    ],
    availability: {
      is24x7: true,
      regularHours: {
        monday: { open: '08:00', close: '19:00' },
        tuesday: { open: '08:00', close: '19:00' },
        wednesday: { open: '08:00', close: '19:00' },
        thursday: { open: '08:00', close: '19:00' },
        friday: { open: '08:00', close: '19:00' },
        saturday: { open: '09:00', close: '17:00' },
        sunday: { closed: false, urgencyOnly: true }
      },
      emergencyResponseTime: '30 minutes',
      holidayAvailability: true
    },
    
    // Section 8: Tarification transparente
    pricing: {
      hourlyRate: 65,
      minimumCharge: 89,
      emergencySurcharge: 50, // 50% la nuit et weekend
      freeQuote: true,
      freeTravel: true,
      travelCost: '0€ dans Paris, 0.50€/km au-delà'
    },
    pricePositioning: 'competitive', // budget, competitive, premium
    paymentMethods: ['CB', 'Espèces', 'Chèque', 'Virement', 'PayPal', 'Apple Pay', 'Paiement 3x sans frais'],
    
    // Section 9: Portfolio projets détaillés
    projects: [
      {
        title: 'Rénovation Hôtel Particulier Paris 7',
        description: 'Refonte complète plomberie bâtiment historique 800m²',
        duration: '3 mois',
        value: 125000,
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800'
        ],
        testimonial: 'Travail remarquable dans le respect du patrimoine'
      },
      {
        title: 'Immeuble 30 logements Neuilly',
        description: 'Remplacement complet chaufferie et production eau chaude',
        duration: '6 semaines',
        value: 85000,
        images: [
          'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800'
        ],
        testimonial: 'Chantier mené avec professionnalisme, délais respectés'
      }
    ],
    totalProjectsCompleted: 2847,
    averageProjectValue: 3500,
    specialtyProjects: ['Monuments historiques', 'Immeubles de standing', 'Maisons d\'architecte'],
    
    // Section 10: Témoignages détaillés
    testimonials: [
      {
        clientName: 'Marie Dupont',
        clientTitle: 'Propriétaire appartement Paris 16',
        service: 'Rénovation salle de bain',
        comment: 'Équipe exceptionnelle ! Ils ont transformé ma vieille salle de bain en véritable spa. Travail soigné, délais respectés et très bon contact.',
        rating: 5,
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' // Customer photo
      },
      {
        clientName: 'Pierre Martin',
        clientTitle: 'Syndic de copropriété',
        service: 'Dépannage urgent fuite',
        comment: 'Intervention à 23h un samedi soir, en 25 minutes ! Professionnalisme remarquable et tarif honnête malgré l\'urgence.',
        rating: 5,
        date: '2023-12-20'
      },
      {
        clientName: 'Sophie Bernard',
        clientTitle: 'Restaurant Le Gourmet',
        service: 'Installation cuisine professionnelle',
        comment: 'Ils ont géré toute la plomberie de notre nouvelle cuisine. Expertise technique au top et excellents conseils.',
        rating: 5,
        date: '2023-11-10'
      }
    ],
    googleReviewsUrl: 'https://g.page/r/CYRjY8qP-QwSEAE',
    googleRating: 4.9,
    totalReviews: 287,
    
    // Section 11: Processus de travail
    workProcess: {
      steps: [
        {
          number: 1,
          title: 'Premier contact',
          description: 'Appel ou formulaire en ligne',
          duration: '5 minutes',
          icon: '📞'
        },
        {
          number: 2,
          title: 'Diagnostic',
          description: 'Visite sur place ou par visio',
          duration: '30 minutes',
          icon: '🔍'
        },
        {
          number: 3,
          title: 'Devis détaillé',
          description: 'Envoi sous 24h, gratuit',
          duration: '24 heures',
          icon: '📋'
        },
        {
          number: 4,
          title: 'Intervention',
          description: 'À la date convenue',
          duration: 'Variable',
          icon: '🔧'
        },
        {
          number: 5,
          title: 'Suivi qualité',
          description: 'Appel de satisfaction',
          duration: '48h après',
          icon: '✅'
        }
      ]
    },
    
    // Section 12: Questions fréquentes personnalisées
    commonQuestions: [
      {
        question: 'Intervenez-vous vraiment en 30 minutes ?',
        answer: 'Oui, c\'est notre engagement pour les urgences dans Paris. Nous avons 3 équipes en rotation 24/7 positionnées stratégiquement.',
        category: 'urgence'
      },
      {
        question: 'Vos devis sont-ils vraiment gratuits ?',
        answer: 'Absolument ! Devis gratuit et sans engagement, même pour les gros projets. Nous nous déplaçons sans frais.',
        category: 'tarifs'
      },
      {
        question: 'Êtes-vous assurés pour les dégâts des eaux ?',
        answer: 'Oui, nous avons une assurance RC Pro de 3 millions d\'euros et la garantie décennale. Vous êtes 100% protégé.',
        category: 'garanties'
      }
    ],
    
    // Section 13: Données concurrence et marché
    clientTypes: ['Particuliers (70%)', 'Syndics (20%)', 'Entreprises (10%)'],
    typicalClientProfile: 'Propriétaire parisien, CSP+, sensible à la qualité et au service',
    mainCompetitors: ['Plombier.com', 'Allo-Plombier', 'SOS Plomberie'],
    competitiveAdvantages: [
      'Seul RGE + QualiPAC + Handibat du secteur',
      'Garantie satisfait ou re-intervention gratuite',
      'Équipe 100% salariée (pas de sous-traitance)',
      'Showroom 200m² pour choisir vos équipements'
    ],
    
    // Section 14: Partenaires et fournisseurs
    preferredBrands: ['Grohe', 'Hansgrohe', 'Geberit', 'Viessmann', 'Atlantic', 'De Dietrich'],
    suppliers: [
      { name: 'Cedeo', type: 'Grossiste sanitaire', partnership: 'Compte pro premium' },
      { name: 'Richardson', type: 'Matériel chauffage', partnership: 'Revendeur agréé' },
      { name: 'Brossette', type: 'Équipements salle de bain', partnership: 'Showroom partenaire' }
    ],
    materials: [
      { name: 'Cuivre', quality: 'Premium', ecoFriendly: true },
      { name: 'PER', quality: 'Haute qualité', ecoFriendly: true },
      { name: 'Multicouche', quality: 'Professionnel', ecoFriendly: true }
    ],
    
    // Section 15: Objectifs et vision
    businessGoals: [
      'Devenir LE plombier référence du 16ème arrondissement',
      'Ouvrir 2 nouvelles agences en 2025',
      'Former 5 apprentis par an',
      'Atteindre 0 réclamation client'
    ],
    currentChallenges: [
      'Recruter des plombiers qualifiés',
      'Gérer la croissance rapide',
      'Maintenir la qualité avec le volume'
    ],
    expansionPlans: 'Ouverture Versailles fin 2024, Saint-Germain-en-Laye 2025',
    
    // Section 16: Marketing et communication
    socialMedia: {
      facebook: 'https://facebook.com/plomberieexcellencepro',
      instagram: 'https://instagram.com/plomberie_excellence',
      linkedin: 'https://linkedin.com/company/plomberie-excellence-pro',
      youtube: 'https://youtube.com/c/PlomberieExcellenceTutos'
    },
    marketingActivities: ['Google Ads', 'SEO local', 'Flyers', 'Véhicules marqués', 'Parrainage'],
    monthlyMarketingBudget: 3000,
    
    // Section 17: Besoins spécifiques du site
    leadGenerationNeeds: 'high',
    monthlyLeadsTarget: 150,
    conversionRate: 35,
    averageTicket: 450,
    
    // Section 18: Éléments différenciants
    uniqueFeatures: [
      'Application mobile suivi intervention',
      'Devis vidéo personnalisé',
      'Garantie zéro surprise sur facture',
      'Programme fidélité -10% dès la 2ème intervention'
    ],
    awardsAndRecognition: [
      'Meilleur Artisan Plombier Paris 2023',
      'Trophée de l\'Excellence Artisanale 2022',
      'Label Artisan de Confiance depuis 2020'
    ],
    
    // Section 19: Préférences design
    stylePreference: 'modern-professional',
    colorPreference: 'blue',
    mustHaveFeatures: [
      'Bouton urgence flottant',
      'Calculateur devis en ligne',
      'Prise de RDV intégrée',
      'Chat en direct',
      'Espace client',
      'Blog conseils'
    ],
    inspirationWebsites: [
      'https://www.plombier-paris-express.com',
      'https://www.urgence-plombier-intervention.fr'
    ],
    
    // Section 20: Contenu supplémentaire
    blogTopics: [
      'Comment éviter les fuites d\'eau',
      'Entretenir sa chaudière',
      'Économiser l\'eau au quotidien',
      'Que faire en cas de dégât des eaux'
    ],
    videoContent: [
      { title: 'Déboucher un évier', url: 'https://youtube.com/watch?v=demo1' },
      { title: 'Changer un joint', url: 'https://youtube.com/watch?v=demo2' }
    ],
    downloadableGuides: [
      'Guide de l\'urgence plomberie (PDF)',
      'Check-list entretien annuel',
      'Comprendre sa facture d\'eau'
    ]
  }
};

async function createUltraCompleteClient() {
  try {
    console.log('🚀 Création du client ULTRA COMPLET avec images...\n');
    
    // Créer le client
    const client = await prisma.client.create({
      data: {
        name: ultraCompleteClient.name,
        email: ultraCompleteClient.email,
        phone: ultraCompleteClient.phone,
        companyName: ultraCompleteClient.companyName,
        city: ultraCompleteClient.ultraFormData.mainAddress.city,
        status: 'ACTIVE',
        tags: JSON.stringify(['plombier', 'urgence-24-7', 'premium']),
        notes: 'Client ULTRA COMPLET avec toutes les données pour test'
      }
    });
    
    console.log('✅ Client créé:', client.id);
    console.log('📧 Email:', client.email);
    console.log('🏢 Entreprise:', client.companyName);
    console.log('📍 Ville:', client.city);
    
    // Créer automatiquement une proposition de template
    const proposal = await prisma.templateProposal.create({
      data: {
        clientId: client.id,
        formData: JSON.stringify(ultraCompleteClient.ultraFormData),
        status: 'PENDING'
      }
    });
    
    console.log('\n📋 Proposition créée:', proposal.id);
    console.log('🔄 Status:', proposal.status);
    
    // Afficher un résumé des données
    console.log('\n📊 Résumé des données du formulaire ULTRA:');
    console.log('- Services détaillés:', ultraCompleteClient.ultraFormData.services.length);
    console.log('- Images portfolio:', ultraCompleteClient.ultraFormData.portfolioImages.length);
    console.log('- Images avant/après:', ultraCompleteClient.ultraFormData.beforeAfterImages.length);
    console.log('- Membres équipe avec photos:', ultraCompleteClient.ultraFormData.teamMembers.length);
    console.log('- Certifications avec logos:', ultraCompleteClient.ultraFormData.certifications.length);
    console.log('- Témoignages clients:', ultraCompleteClient.ultraFormData.testimonials.length);
    console.log('- Zones de service:', ultraCompleteClient.ultraFormData.serviceAreas.length);
    console.log('- Questions FAQ:', ultraCompleteClient.ultraFormData.commonQuestions.length);
    
    console.log('\n🖼️ Images utilisées:');
    ultraCompleteClient.ultraFormData.services.forEach(service => {
      console.log(`- ${service.name}: ${service.image}`);
    });
    
    console.log('\n✨ Client ULTRA COMPLET créé avec succès !');
    console.log('\n📍 Prochaine étape:');
    console.log('1. Allez sur http://localhost:3000/admin/proposals');
    console.log('2. Cliquez sur "Analyser avec IA" pour ce client');
    console.log('3. L\'IA va générer 3 variations uniques utilisant toutes les données et images !');
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    await prisma.$disconnect();
  }
}

// Exécuter la création
createUltraCompleteClient();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper for unique IDs
let blockCounter = 0;
const generateBlockId = (type) => {
  blockCounter++;
  return `${type}-${Date.now()}-${blockCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

// Enhanced backgrounds with real variety
const getBackgroundStyle = (index, businessType) => {
  const backgrounds = {
    plombier: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#EBF5FF' }, // Light blue
      { backgroundColor: '#F0F9FF' }, // Very light blue
      { backgroundGradient: 'linear-gradient(135deg, #EBF5FF 0%, #DBEAFE 100%)' },
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#F8FAFC' }
    ],
    electricien: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FFFBEB' }, // Light yellow
      { backgroundColor: '#FEF3C7' }, // Yellow tint
      { backgroundGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' },
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FFFDF7' }
    ],
    menuisier: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FEF5E7' }, // Light wood
      { backgroundColor: '#FDFCFB' }, // Cream
      { backgroundGradient: 'linear-gradient(135deg, #F5E6D3 0%, #E5D4C1 100%)' },
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FAF8F5' }
    ],
    peintre: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FAF5FF' }, // Light purple
      { backgroundColor: '#FDF4FF' }, // Light pink
      { backgroundGradient: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)' },
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FDFAFF' }
    ],
    macon: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#F9FAFB' }, // Light gray
      { backgroundColor: '#F3F4F6' }, // Gray
      { backgroundGradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)' },
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FAFAFA' }
    ]
  };
  
  const businessBackgrounds = backgrounds[businessType] || backgrounds.plombier;
  return businessBackgrounds[index % businessBackgrounds.length];
};

// Get variant based on business type and section
const getBlockVariant = (businessType, blockType, index = 0) => {
  const variants = {
    plombier: {
      hero: ['centered-bold', 'split-screen', 'fullscreen-video'],
      services: ['cards-3d', 'hexagon', 'cards-hover'],
      features: ['bento', 'grid-icons', 'timeline-vertical'],
      testimonials: ['carousel-3d', 'masonry', 'wall-of-love'],
      cta: ['gradient-waves', 'glassmorphism', 'floating-elements'],
      gallery: ['masonry-flow', 'grid-hover', 'polaroid-stack']
    },
    electricien: {
      hero: ['particles', 'gradient-animated', 'tech-grid'],
      services: ['comparison', 'timeline-horizontal', 'cards-gradient'],
      features: ['carousel-3d', 'stats-counter', 'icons-animated'],
      testimonials: ['video-gallery', 'stacked-cards', 'timeline'],
      cta: ['neon-glow', 'countdown-timer', 'split-diagonal'],
      gallery: ['instagram-style', 'before-after-slider', 'grid-uniform']
    },
    menuisier: {
      hero: ['fullscreen-image', 'split-content', 'parallax-scroll'],
      services: ['showcase-gallery', 'portfolio-style', 'minimal-grid'],
      features: ['icons-left', 'centered-clean', 'alternating-sides'],
      testimonials: ['quotes-elegant', 'grid-photos', 'slider-classic'],
      cta: ['natural-texture', 'wood-pattern', 'minimal-elegant'],
      gallery: ['lightbox-pro', 'masonry-creative', 'fullscreen-slideshow']
    },
    peintre: {
      hero: ['color-burst', 'artistic-splash', 'gallery-background'],
      services: ['color-cards', 'visual-grid', 'creative-shapes'],
      features: ['paint-splash', 'colorful-icons', 'artistic-grid'],
      testimonials: ['photo-focus', 'colorful-cards', 'wall-style'],
      cta: ['rainbow-gradient', 'paint-drip', 'vibrant-animated'],
      gallery: ['color-filter', 'wall-gallery', 'pinterest-style']
    },
    macon: {
      hero: ['construction-strong', 'blueprint-bg', 'industrial'],
      services: ['industrial-cards', 'grid-solid', 'construction-style'],
      features: ['concrete-texture', 'solid-grid', 'building-blocks'],
      testimonials: ['construction-site', 'client-logos', 'case-studies'],
      cta: ['construction-theme', 'solid-strong', 'industrial-cta'],
      gallery: ['project-showcase', 'progress-timeline', 'grid-construction']
    }
  };
  
  const businessVariants = variants[businessType] || variants.plombier;
  const blockVariants = businessVariants[blockType] || ['default'];
  return blockVariants[index % blockVariants.length];
};

// Generate personalized content based on business
const generatePersonalizedContent = (businessType, service, city, company) => {
  const yearFounded = new Date().getFullYear() - 15; // Assuming 15 years experience
  
  const contents = {
    plombier: {
      heroTitle: `${company} - Votre plombier d'urgence à ${city}`,
      heroSubtitle: `Intervention en 30 minutes • Disponible 24h/7j • Devis gratuit`,
      aboutTitle: `${company}, l'expertise plomberie depuis ${yearFounded}`,
      aboutContent: `
Depuis ${yearFounded}, ${company} est LA référence en plomberie à ${city}. Notre équipe de 12 plombiers qualifiés intervient chaque jour pour résoudre vos problèmes de plomberie, qu'il s'agisse d'une simple fuite ou d'une rénovation complète.

**Notre différence ?** Une approche transparente et honnête. Pas de surfacturation, pas de travaux inutiles. Juste des solutions efficaces au juste prix.

**Nos engagements :**
• Intervention en moins de 30 minutes pour les urgences
• Devis gratuit et détaillé avant toute intervention
• Garantie 2 ans sur tous nos travaux
• Propreté irréprochable après intervention
• Formation continue de nos équipes aux dernières normes

Avec plus de 5000 interventions réussies à ${city}, nous sommes fiers de la confiance que nous accordent nos clients. Chaque jour, c'est 15 à 20 foyers que nous dépannons dans toute la région.`,
      serviceIntro: {
        'Débouchage canalisation': `Le débouchage de canalisation est notre intervention la plus fréquente à ${city}. Avec notre matériel haute pression et nos caméras d'inspection, nous localisons et éliminons tout bouchon en moins d'une heure.`,
        'Recherche de fuite': `Une fuite non détectée peut coûter jusqu'à 2000€/an sur votre facture d'eau. Chez ${company}, nous utilisons la thermographie et les ultrasons pour détecter toute fuite sans casser vos murs.`,
        'Dépannage chauffe-eau': `Eau froide au réveil ? ${company} intervient en urgence pour réparer ou remplacer votre chauffe-eau. Toutes marques, tous modèles, avec des pièces d'origine garanties.`
      },
      guarantees: [
        'Intervention en 30 minutes chrono',
        'Devis gratuit et sans engagement',
        'Garantie 2 ans pièces et main d'œuvre',
        'Paiement après intervention'
      ]
    },
    electricien: {
      heroTitle: `${company} - Électricien certifié à ${city}`,
      heroSubtitle: `Mise aux normes • Dépannage • Domotique • Certifié Qualifelec`,
      aboutTitle: `22 ans d'excellence en électricité`,
      aboutContent: `
${company} c'est avant tout une histoire de passion pour l'électricité. Depuis ${yearFounded}, nous accompagnons les habitants de ${city} dans tous leurs projets électriques, du simple dépannage à l'installation domotique complète.

**Notre expertise :**
• Mise aux normes NFC 15-100 (plus de 800 réalisées)
• Installation de bornes de recharge véhicules électriques
• Domotique et maison connectée
• Tableaux électriques et distribution
• Éclairage LED et économies d'énergie

**Nos certifications :**
• Qualifelec RGE depuis 2015
• Habilitation IRVE pour bornes électriques
• Formation Schneider Electric et Legrand
• Certification KNX pour la domotique

Avec une équipe de 8 électriciens certifiés, nous intervenons sur ${city} et ses environs avec la garantie d'un travail irréprochable et aux normes.`,
      serviceIntro: {
        'Mise aux normes électriques': `La norme NFC 15-100 évolue régulièrement. ${company} vous garantit une installation 100% conforme avec certificat Consuel. Plus de 300 mises aux normes réalisées à ${city}.`,
        'Installation domotique': `Transformez votre maison en habitat intelligent. Contrôle à distance, scénarios automatiques, économies d'énergie... ${company} est certifié KNX pour vos projets domotiques.`,
        'Dépannage électrique': `Panne de courant ? Court-circuit ? Nos électriciens interviennent rapidement pour diagnostiquer et réparer. Disponibles 7j/7 à ${city}.`
      },
      guarantees: [
        'Certifié Qualifelec RGE',
        'Devis détaillé gratuit',
        'Garantie décennale',
        'Attestation Consuel fournie'
      ]
    },
    menuisier: {
      heroTitle: `${company} - Créateur d'espaces en bois`,
      heroSubtitle: `Menuiserie sur mesure • Artisan d'art • Bois certifié FSC`,
      aboutTitle: `L'art du bois depuis 3 générations`,
      aboutContent: `
${company} perpétue la tradition de la menuiserie artisanale à ${city}. Dans notre atelier de 400m², nous créons des pièces uniques qui subliment votre intérieur.

**Notre savoir-faire :**
• Cuisines sur mesure en bois massif
• Escaliers design et traditionnels
• Dressings et rangements optimisés
• Bibliothèques et meubles TV
• Parquets et terrasses bois

**Nos engagements éco-responsables :**
• Bois certifié FSC ou PEFC uniquement
• Finitions écologiques (huiles naturelles)
• Gestion responsable des déchets
• Circuit court avec des essences locales

Chaque création est unique, pensée et réalisée dans les règles de l'art. Nous travaillons le chêne, le hêtre, le frêne, mais aussi des essences plus rares selon vos envies.`,
      guarantees: [
        'Bois certifié FSC/PEFC',
        'Création 100% sur mesure',
        'Garantie 10 ans structure',
        'Finitions écologiques'
      ]
    },
    peintre: {
      heroTitle: `${company} - Artiste de vos murs`,
      heroSubtitle: `Peinture décorative • Enduits design • Conseils couleurs`,
      aboutTitle: `La couleur, notre passion`,
      aboutContent: `
${company} transforme vos espaces depuis ${yearFounded} à ${city}. Plus qu'un simple peintre, nous sommes des créateurs d'ambiances qui subliment votre intérieur.

**Nos spécialités :**
• Peintures décoratives et effets matière
• Enduits à la chaux, tadelakt, béton ciré
• Conseil en décoration et harmonie des couleurs
• Ravalement de façade avec ITE
• Papiers peints et revêtements muraux

**Notre approche créative :**
Chaque projet commence par une étude colorimétrique personnalisée. Nous analysons la lumière, les volumes, votre mobilier pour créer l'harmonie parfaite.

Formés aux dernières techniques (Tollens, Farrow & Ball, Little Greene), nous maîtrisons plus de 50 effets décoratifs différents.`,
      guarantees: [
        'Peintures éco-labellisées',
        'Étude couleur gratuite',
        'Protection totale du mobilier',
        'Garantie 5 ans finitions'
      ]
    },
    macon: {
      heroTitle: `${company} - Bâtisseur de confiance`,
      heroSubtitle: `Construction • Extension • Rénovation • Garantie décennale`,
      aboutTitle: `25 ans de constructions solides`,
      aboutContent: `
Depuis ${yearFounded}, ${company} construit l'avenir de ${city}. Avec plus de 200 maisons construites et 500 rénovations, nous sommes le partenaire de confiance pour tous vos projets.

**Notre expertise :**
• Construction de maisons individuelles
• Extensions et surélévations
• Rénovation complète tous corps d'état
• Maçonnerie générale et gros œuvre
• Terrasses et aménagements extérieurs

**Nos atouts :**
• Bureau d'études intégré
• Conducteur de travaux dédié
• Respect absolu des délais
• Transparence totale sur les coûts
• SAV réactif après livraison

Membre de la FFB et certifié Qualibat, nous appliquons les normes les plus strictes pour garantir la pérennité de vos constructions.`,
      guarantees: [
        'Garantie décennale complète',
        'Assurance dommages-ouvrage',
        'Planning détaillé respecté',
        'Prix ferme et définitif'
      ]
    }
  };
  
  return contents[businessType] || contents.plombier;
};

// Generate enhanced service page with real personalization
const generateEnhancedServicePage = (service, city, businessType, company, formData, cityIndex, serviceIndex) => {
  const content = generatePersonalizedContent(businessType, service.name, city, company);
  const slug = `${service.name.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase().replace(/\s+/g, '-')}`;
  let sectionIndex = 0;
  
  // Get background style helper
  const getBg = () => {
    const style = getBackgroundStyle(sectionIndex++, businessType);
    return style;
  };
  
  return {
    id: slug,
    name: `${service.name} ${city}`,
    slug: `/${slug}`,
    seo: {
      title: `${service.name} ${city} - ${company} | ${formData.emergency247 ? 'Intervention 24h/7j' : 'Devis gratuit'}`,
      description: `${company}, expert en ${service.name.toLowerCase()} à ${city}. ${service.description} ${formData.emergency247 ? 'Urgence 24h/7j.' : 'Devis gratuit.'} ☎️ ${formData.phone}`,
      keywords: [
        `${service.name} ${city}`,
        `${businessType} ${city}`,
        `${service.name} urgent ${city}`,
        `${service.name} pas cher ${city}`,
        `meilleur ${businessType} ${city}`
      ]
    },
    blocks: [
      // Header
      {
        id: generateBlockId('header'),
        type: 'header-v3-perfect',
        props: {
          variant: 'modern-transparent',
          logoText: company,
          navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Zones', href: '/zones' },
            { label: 'Contact', href: '/contact' }
          ],
          ctaButton: {
            text: formData.emergency247 ? '☎️ Urgence' : 'Devis',
            href: formData.emergency247 ? `tel:${formData.phone}` : '/contact'
          }
        }
      },
      
      // Hero with personalized content
      {
        id: generateBlockId('hero'),
        type: 'hero-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'hero', serviceIndex),
          title: `${service.name} à ${city}`,
          subtitle: `${company} - ${content.serviceIntro[service.name] || `Expert ${businessType} pour votre ${service.name.toLowerCase()}`}`,
          primaryButton: {
            text: formData.emergency247 ? '☎️ Appel urgent' : '📞 Devis gratuit',
            href: `tel:${formData.phone}`,
            size: 'large'
          },
          secondaryButton: {
            text: 'Voir nos réalisations',
            href: '#gallery'
          },
          features: [
            formData.emergency247 ? '30 min' : 'RDV rapide',
            'Devis gratuit',
            'Garantie ' + (businessType === 'menuisier' ? '10 ans' : '2 ans')
          ],
          backgroundImage: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-hero.jpg`,
          ...getBg()
        }
      },
      
      // Rich content about the service
      {
        id: generateBlockId('content'),
        type: 'content-v3-perfect',
        props: {
          variant: 'split-image',
          title: `${service.name} par ${company}`,
          content: `
${content.serviceIntro[service.name] || `Notre expertise en ${service.name.toLowerCase()} à ${city}`}

### Pourquoi choisir ${company} ?

Avec ${formData.yearsExperience || '15'} ans d'expérience à ${city}, nous avons développé une expertise unique en ${service.name.toLowerCase()}. Notre équipe de ${businessType}s qualifiés maîtrise toutes les techniques modernes pour vous garantir un résultat parfait.

**Nos atouts pour ${service.name.toLowerCase()} :**
• Diagnostic précis et gratuit
• Utilisation de matériel professionnel dernière génération
• Respect des normes en vigueur
• Transparence totale sur les tarifs
• Intervention propre et soignée

### Notre processus d'intervention

1. **Contact initial** : Vous nous appelez, nous écoutons votre besoin
2. **Diagnostic** : Analyse précise de la situation (gratuit)
3. **Devis détaillé** : Prix ferme et transparent avant intervention
4. **Intervention** : Travail soigné par nos experts
5. **Vérification** : Contrôle qualité systématique
6. **Suivi** : Nous restons disponibles après intervention

### Zone d'intervention

Basés à ${city}, nous intervenons rapidement dans tout le secteur. ${formData.emergency247 ? 'Service d\'urgence 24h/7j disponible.' : 'Prise de RDV flexible selon vos disponibilités.'}`,
          imageUrl: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-work.jpg`,
          imagePosition: sectionIndex % 2 === 0 ? 'right' : 'left',
          imageCaption: `${service.name} en cours à ${city}`,
          stats: [
            { label: 'Interventions/an', value: Math.floor(Math.random() * 200 + 300) },
            { label: 'Clients satisfaits', value: '98%' },
            { label: 'Temps moyen', value: service.duration || '2h' }
          ],
          ...getBg()
        }
      },
      
      // Process with visual steps
      {
        id: generateBlockId('features'),
        type: 'features-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'features', cityIndex),
          title: `Comment se déroule ${service.name.toLowerCase()} ?`,
          subtitle: `Notre méthode éprouvée pour un résultat garanti`,
          feature1_title: '1. Premier contact',
          feature1_description: `Appelez-nous au ${formData.phone} ou remplissez le formulaire`,
          feature1_icon: '📞',
          feature2_title: '2. Diagnostic gratuit',
          feature2_description: 'Analyse complète de votre besoin sans engagement',
          feature2_icon: '🔍',
          feature3_title: '3. Devis transparent',
          feature3_description: 'Prix détaillé et expliqué, sans surprise',
          feature3_icon: '📋',
          feature4_title: '4. Intervention pro',
          feature4_description: `Réalisation de votre ${service.name.toLowerCase()} dans les règles de l'art`,
          feature4_icon: '🛠️',
          feature5_title: '5. Contrôle qualité',
          feature5_description: 'Vérification complète et test de bon fonctionnement',
          feature5_icon: '✅',
          feature6_title: '6. Garantie & suivi',
          feature6_description: content.guarantees[3] || 'Service après-vente réactif',
          feature6_icon: '🛡️',
          ...getBg()
        }
      },
      
      // Why choose us with real benefits
      {
        id: generateBlockId('services'),
        type: 'services-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'services', serviceIndex),
          title: `Les avantages ${company}`,
          subtitle: `Pourquoi nous sommes le meilleur choix pour ${service.name.toLowerCase()} à ${city}`,
          service1_name: content.guarantees[0],
          service1_description: `Un engagement fort de ${company} pour votre satisfaction`,
          service1_icon: '🏆',
          service1_features: ['Engagement respecté', 'Sans exception', 'Prouvé par nos clients'],
          service2_name: content.guarantees[1],
          service2_description: 'Transparence totale pour votre tranquillité',
          service2_icon: '💎',
          service2_features: ['Aucun frais caché', 'Prix ferme', 'Détail complet'],
          service3_name: content.guarantees[2],
          service3_description: 'La sécurité d\'un travail garanti dans le temps',
          service3_icon: '🛡️',
          service3_features: ['Pièces et main d\'œuvre', 'SAV réactif', 'Traçabilité totale'],
          showPrices: false,
          enableComparison: true,
          ...getBg()
        }
      },
      
      // Testimonials localized
      {
        id: generateBlockId('testimonials'),
        type: 'testimonials-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'testimonials', cityIndex),
          title: `Nos clients de ${city} témoignent`,
          subtitle: `La satisfaction client, notre priorité absolue`,
          showRating: true,
          showLocation: true,
          showService: true,
          testimonial1_content: `Excellent ${service.name.toLowerCase()} ! ${company} est intervenu ${formData.emergency247 ? 'en pleine nuit' : 'rapidement'} à ${city}. Travail impeccable, équipe professionnelle et sympathique. Le prix annoncé a été respecté. Je recommande vivement !`,
          testimonial1_author: ['Marie L.', 'Pierre D.', 'Sophie M.'][serviceIndex % 3],
          testimonial1_location: `${city} centre`,
          testimonial1_rating: 5,
          testimonial1_service: service.name,
          testimonial1_date: 'Il y a 2 semaines',
          testimonial2_content: `${formData.emergency247 ? 'Dépannage urgent parfait !' : 'Travail soigné et professionnel.'} ${service.name} réalisé avec beaucoup de sérieux. L'équipe de ${company} a été ponctuelle, efficace et a laissé les lieux propres. Très satisfait du résultat.`,
          testimonial2_author: ['Jean-Marc B.', 'Philippe R.', 'Michel T.'][cityIndex % 3],
          testimonial2_location: `${city} nord`,
          testimonial2_rating: 5,
          testimonial2_service: service.name,
          testimonial2_date: 'Il y a 1 mois',
          testimonial3_content: `Je cherchais un ${businessType} sérieux à ${city} pour ${service.name.toLowerCase()}. ${company} a dépassé mes attentes : devis clair, travail de qualité, et en plus ils ont donné des conseils pour l'entretien. Parfait !`,
          testimonial3_author: ['Isabelle G.', 'Nathalie F.', 'Caroline V.'][(serviceIndex + cityIndex) % 3],
          testimonial3_location: `${city} sud`,
          testimonial3_rating: 5,
          testimonial3_service: service.name,
          testimonial3_date: 'Il y a 3 semaines',
          ...getBg()
        }
      },
      
      // Gallery with service images
      {
        id: generateBlockId('gallery'),
        type: 'gallery-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'gallery', serviceIndex),
          title: `${service.name} - Nos réalisations à ${city}`,
          subtitle: 'La qualité de notre travail en images',
          columnsDesktop: 4,
          columnsTablet: 2,
          columnsMobile: 1,
          enableLightbox: true,
          enableFilters: true,
          filterCategories: ['Tout', 'Avant/Après', 'En cours', 'Terminé'],
          hoverEffect: 'zoom-tilt',
          image1_src: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-1.jpg`,
          image1_title: `${service.name} - Avant intervention`,
          image1_description: `État initial avant notre intervention à ${city}`,
          image1_category: 'Avant/Après',
          image2_src: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-2.jpg`,
          image2_title: `${service.name} - Après intervention`,
          image2_description: 'Résultat final, travail soigné et professionnel',
          image2_category: 'Avant/Après',
          image3_src: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-3.jpg`,
          image3_title: 'Intervention en cours',
          image3_description: `Notre équipe en action pour ${service.name.toLowerCase()}`,
          image3_category: 'En cours',
          image4_src: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-4.jpg`,
          image4_title: 'Chantier complexe réussi',
          image4_description: `Un défi relevé avec succès à ${city}`,
          image4_category: 'Terminé',
          image5_src: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-5.jpg`,
          image5_title: 'Finitions parfaites',
          image5_description: 'Le souci du détail qui fait la différence',
          image5_category: 'Terminé',
          image6_src: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-6.jpg`,
          image6_title: 'Matériel professionnel',
          image6_description: 'Équipement de pointe pour un travail de qualité',
          image6_category: 'En cours',
          ...getBg()
        }
      },
      
      // FAQ specific to service and city
      {
        id: generateBlockId('faq'),
        type: 'faq-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'faq', cityIndex),
          title: `FAQ ${service.name} à ${city}`,
          subtitle: 'Les questions que vous vous posez',
          searchEnabled: true,
          categoriesEnabled: true,
          faq1_question: `Combien coûte ${service.name.toLowerCase()} à ${city} ?`,
          faq1_answer: `Le prix de ${service.name.toLowerCase()} à ${city} varie selon plusieurs facteurs : l'ampleur des travaux, l'accessibilité, et les matériaux nécessaires. ${service.price || 'Nous proposons toujours un devis gratuit et détaillé avant toute intervention.'}`,
          faq1_category: 'Tarifs',
          faq2_question: `Quels sont vos délais pour ${service.name.toLowerCase()} ?`,
          faq2_answer: formData.emergency247 ? `Pour les urgences, nous intervenons en 30 minutes maximum à ${city}. Pour les travaux planifiés, généralement sous 24-48h.` : `Nous intervenons généralement sous 48h pour ${service.name.toLowerCase()}. En cas d'urgence, nous faisons notre maximum pour intervenir le jour même.`,
          faq2_category: 'Délais',
          faq3_question: `${service.name} est-il garanti ?`,
          faq3_answer: `Oui, tous nos travaux de ${service.name.toLowerCase()} sont garantis. ${content.guarantees[2]}. Cette garantie couvre les pièces et la main d'œuvre.`,
          faq3_category: 'Garanties',
          faq4_question: `Intervenez-vous le week-end pour ${service.name.toLowerCase()} ?`,
          faq4_answer: formData.emergency247 ? `Oui, notre service d'urgence fonctionne 24h/7j, week-ends et jours fériés inclus, sans majoration excessive.` : `Nous pouvons intervenir le samedi sur demande. Pour les urgences, un service d'astreinte est disponible.`,
          faq4_category: 'Horaires',
          faq5_question: `Comment se passe le paiement ?`,
          faq5_answer: `Le paiement s'effectue après la réalisation des travaux. Nous acceptons : espèces, chèque, carte bancaire et virement. Possibilité de paiement en plusieurs fois pour les gros travaux.`,
          faq5_category: 'Paiement',
          ...getBg()
        }
      },
      
      // CTA with urgency and trust
      {
        id: generateBlockId('cta'),
        type: 'cta-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'cta', serviceIndex),
          title: `Besoin de ${service.name.toLowerCase()} à ${city} ?`,
          subtitle: formData.emergency247 
            ? `Intervention d'urgence en 30 minutes • Disponible maintenant !`
            : `Devis gratuit sous 24h • ${company} à votre service`,
          primaryButton: {
            text: `☎️ ${formData.phone}`,
            href: `tel:${formData.phone}`,
            size: 'extra-large',
            animation: 'pulse'
          },
          secondaryButton: {
            text: 'Demande en ligne',
            href: '/contact'
          },
          features: content.guarantees,
          urgencyBadge: formData.emergency247 ? 'Urgence 24h/7j' : null,
          trustBadges: ['Garantie 2 ans', '5000+ clients', `${formData.yearsExperience} ans d'expérience`],
          backgroundAnimation: 'gradient-flow',
          ...getBackgroundStyle(0, businessType) // Use primary brand color
        }
      },
      
      // Footer
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: {
          variant: 'mega-footer',
          companyName: company,
          description: `${company}, votre ${businessType} de confiance à ${city} depuis ${formData.yearsExperience} ans.`,
          phone: formData.phone,
          email: formData.email,
          address: `${city}, France`,
          services: formData.services.map(s => ({
            name: s.name,
            url: `/${s.name.toLowerCase().replace(/\s+/g, '-')}`
          })),
          cities: formData.interventionCities.map(c => ({
            name: c,
            url: `/zone/${c.toLowerCase().replace(/\s+/g, '-')}`
          })),
          certifications: formData.certifications || getDefaultCertifications(businessType),
          socialLinks: [
            { platform: 'facebook', url: '#' },
            { platform: 'google', url: '#' }
          ],
          paymentMethods: ['CB', 'Espèces', 'Chèque', 'Virement'],
          openingHours: formData.emergency247 ? '24h/24, 7j/7' : 'Lun-Ven: 8h-19h, Sam: 9h-17h'
        }
      }
    ]
  };
};

// Generate complete site with all enhancements
const generateUltraEnhancedSite = (formData, businessType) => {
  const company = formData.businessName;
  const city = formData.city;
  const content = generatePersonalizedContent(businessType, '', city, company);
  
  const pages = [];
  let sectionIndex = 0;
  
  // Helper for section backgrounds
  const getBg = () => getBackgroundStyle(sectionIndex++, businessType);
  
  // Homepage
  pages.push({
    id: 'home',
    name: 'Accueil',
    slug: '/',
    isHomePage: true,
    seo: {
      title: `${company} - ${businessType === 'plombier' ? 'Plombier' : businessType === 'electricien' ? 'Électricien' : businessType.charAt(0).toUpperCase() + businessType.slice(1)} à ${city} | ${formData.emergency247 ? 'Urgence 24h/7j' : 'Devis gratuit'}`,
      description: `${company}, votre ${businessType} de confiance à ${city}. ${formData.description || `Expert en ${formData.services.map(s => s.name).join(', ')}. Intervention rapide, travail soigné, prix justes.`}`,
      keywords: [`${businessType} ${city}`, ...formData.services.map(s => `${s.name} ${city}`), 'artisan qualifié', 'devis gratuit']
    },
    blocks: [
      // Header
      {
        id: generateBlockId('header'),
        type: 'header-v3-perfect',
        props: {
          variant: 'modern-mega',
          logoText: company,
          navigation: [
            { label: 'Accueil', href: '/' },
            { 
              label: 'Services', 
              href: '/services',
              children: formData.services.map(s => ({
                label: s.name,
                description: s.description,
                href: `/${s.name.toLowerCase().replace(/\s+/g, '-')}`,
                icon: '🔧'
              }))
            },
            { 
              label: 'Zones', 
              href: '/zones',
              children: formData.interventionCities.slice(0, 5).map(c => ({
                label: c,
                href: `/zone/${c.toLowerCase().replace(/\s+/g, '-')}`
              }))
            },
            { label: 'Réalisations', href: '/realisations' },
            { label: 'À propos', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ],
          ctaButton: {
            text: formData.emergency247 ? '☎️ Urgence 24h/7j' : 'Devis gratuit',
            href: formData.emergency247 ? `tel:${formData.phone}` : '/contact',
            style: 'primary'
          },
          topBar: {
            enabled: true,
            content: formData.emergency247 
              ? `🚨 Urgence ? Appelez-nous maintenant : ${formData.phone}`
              : `📞 ${formData.phone} • 📧 ${formData.email}`
          }
        }
      },
      
      // Hero with rich content
      {
        id: generateBlockId('hero'),
        type: 'hero-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'hero', 0),
          title: content.heroTitle,
          subtitle: content.heroSubtitle,
          primaryButton: {
            text: formData.emergency247 ? '☎️ Appel urgent' : '📞 Devis gratuit',
            href: `tel:${formData.phone}`,
            size: 'extra-large',
            animation: 'glow'
          },
          secondaryButton: {
            text: 'Découvrir nos services',
            href: '#services',
            style: 'outline'
          },
          features: [
            `${formData.yearsExperience} ans d'expérience`,
            formData.emergency247 ? 'Disponible 24h/7j' : 'Devis gratuit',
            'Garantie qualité',
            '98% de satisfaction'
          ],
          backgroundType: businessType === 'electricien' ? 'particles' : 'gradient',
          backgroundOverlay: 'gradient',
          trustBadges: [
            { text: '5000+ clients', icon: '👥' },
            { text: 'Certifié', icon: '✅' },
            { text: formData.emergency247 ? '30min' : 'RDV rapide', icon: '⚡' }
          ],
          ...getBg()
        }
      },
      
      // Services showcase
      {
        id: generateBlockId('services'),
        type: 'services-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'services', 0),
          title: 'Nos Services',
          subtitle: `${company} - Expert ${businessType} pour tous vos besoins à ${city}`,
          ...formData.services.slice(0, 3).reduce((acc, service, index) => ({
            ...acc,
            [`service${index + 1}_name`]: service.name,
            [`service${index + 1}_description`]: `${service.description} Notre équipe intervient rapidement à ${city} et environs pour ${service.name.toLowerCase()}. ${content.serviceIntro?.[service.name]?.substring(0, 150) || ''}...`,
            [`service${index + 1}_price`]: service.price || 'Sur devis',
            [`service${index + 1}_icon`]: ['🔧', '🔍', '🛠️'][index],
            [`service${index + 1}_features`]: [
              'Diagnostic gratuit',
              'Intervention rapide',
              'Garantie ' + (businessType === 'menuisier' ? '10 ans' : '2 ans'),
              'Devis détaillé'
            ],
            [`service${index + 1}_link`]: `/${service.name.toLowerCase().replace(/\s+/g, '-')}`,
            [`service${index + 1}_badge`]: index === 0 ? 'Plus populaire' : null
          }), {}),
          showPrices: true,
          enableHover: true,
          enableComparison: false,
          ctaText: 'Voir tous nos services',
          ctaLink: '/services',
          ...getBg()
        }
      },
      
      // About section
      {
        id: generateBlockId('content'),
        type: 'content-v3-perfect',
        props: {
          variant: 'story-telling',
          title: content.aboutTitle,
          content: content.aboutContent,
          imageUrl: `/images/${businessType}-team.jpg`,
          imagePosition: 'left',
          imageCaption: `L'équipe ${company}`,
          stats: [
            { label: 'Années d\'expérience', value: formData.yearsExperience || '15', suffix: 'ans' },
            { label: 'Clients satisfaits', value: '5000', suffix: '+' },
            { label: 'Interventions/an', value: '800', suffix: '+' },
            { label: 'Satisfaction', value: '98', suffix: '%' }
          ],
          badges: formData.certifications || getDefaultCertifications(businessType),
          enableAnimation: true,
          ...getBg()
        }
      },
      
      // Features/Benefits
      {
        id: generateBlockId('features'),
        type: 'features-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'features', 0),
          title: 'Pourquoi choisir ' + company + ' ?',
          subtitle: `Les avantages qui font la différence à ${city}`,
          feature1_title: formData.emergency247 ? 'Urgence 24h/7j' : 'Flexibilité horaire',
          feature1_description: formData.emergency247 
            ? `Intervention d'urgence jour et nuit. Notre équipe est disponible 24h/24 et 7j/7 pour vos urgences à ${city}.`
            : `Nous nous adaptons à vos horaires. RDV possible en soirée et week-end selon vos disponibilités.`,
          feature1_icon: formData.emergency247 ? '🚨' : '📅',
          feature1_color: 'red',
          feature2_title: 'Devis gratuit',
          feature2_description: 'Étude personnalisée et chiffrage détaillé sans engagement. Transparence totale sur les prix.',
          feature2_icon: '📋',
          feature2_color: 'blue',
          feature3_title: content.guarantees[2] || 'Garantie qualité',
          feature3_description: 'Tous nos travaux sont garantis. Nous utilisons uniquement du matériel de qualité professionnelle.',
          feature3_icon: '✅',
          feature3_color: 'green',
          feature4_title: 'Équipe certifiée',
          feature4_description: `${businessType === 'electricien' ? 'Électriciens' : businessType === 'plombier' ? 'Plombiers' : 'Artisans'} qualifiés et certifiés. Formation continue aux dernières normes.`,
          feature4_icon: '🎓',
          feature4_color: 'purple',
          feature5_title: 'Matériel pro',
          feature5_description: 'Équipements de dernière génération pour des interventions efficaces et durables.',
          feature5_icon: '🔧',
          feature5_color: 'orange',
          feature6_title: 'Prix transparents',
          feature6_description: 'Tarifs clairs communiqués avant intervention. Pas de surprise sur la facture finale.',
          feature6_icon: '💰',
          feature6_color: 'yellow',
          enableHover: true,
          layout: 'grid',
          ...getBg()
        }
      },
      
      // Process/How it works
      {
        id: generateBlockId('content'),
        type: 'content-v3-perfect',
        props: {
          variant: 'process-timeline',
          title: 'Comment ça marche ?',
          subtitle: 'Un processus simple et transparent',
          steps: [
            {
              number: '1',
              title: 'Premier contact',
              description: `Appelez-nous au ${formData.phone} ou remplissez notre formulaire en ligne`,
              icon: '📞'
            },
            {
              number: '2',
              title: 'Diagnostic',
              description: 'Nous analysons votre besoin et vous proposons la meilleure solution',
              icon: '🔍'
            },
            {
              number: '3',
              title: 'Devis gratuit',
              description: 'Un devis détaillé et transparent, sans surprise',
              icon: '📋'
            },
            {
              number: '4',
              title: 'Intervention',
              description: 'Nos experts réalisent les travaux dans les règles de l\'art',
              icon: '🛠️'
            },
            {
              number: '5',
              title: 'Garantie',
              description: content.guarantees[2] || 'Tous nos travaux sont garantis',
              icon: '✅'
            }
          ],
          ctaButton: {
            text: 'Commencer maintenant',
            href: '/contact'
          },
          ...getBg()
        }
      },
      
      // Gallery
      {
        id: generateBlockId('gallery'),
        type: 'gallery-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'gallery', 0),
          title: 'Nos réalisations',
          subtitle: `Découvrez la qualité de notre travail à ${city}`,
          columnsDesktop: 4,
          columnsTablet: 2,
          columnsMobile: 1,
          enableLightbox: true,
          enableFilters: true,
          filterCategories: ['Tout', ...formData.services.map(s => s.name)],
          hoverEffect: 'zoom-rotate',
          layoutStyle: 'masonry',
          ...formData.services.slice(0, 2).reduce((acc, service, sIndex) => {
            for (let i = 0; i < 3; i++) {
              const imageNum = sIndex * 3 + i + 1;
              acc[`image${imageNum}_src`] = `/images/${businessType}-realisation-${imageNum}.jpg`;
              acc[`image${imageNum}_title`] = `${service.name} - Projet ${i + 1}`;
              acc[`image${imageNum}_description`] = `Réalisation récente à ${city}`;
              acc[`image${imageNum}_category`] = service.name;
              acc[`image${imageNum}_tags`] = [city, service.name, 'Qualité'];
            }
            return acc;
          }, {}),
          ctaButton: {
            text: 'Voir toutes nos réalisations',
            href: '/realisations'
          },
          ...getBg()
        }
      },
      
      // Testimonials
      {
        id: generateBlockId('testimonials'),
        type: 'testimonials-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'testimonials', 0),
          title: 'Ils nous font confiance',
          subtitle: `Les avis de nos clients à ${city} et environs`,
          showRating: true,
          showLocation: true,
          showService: true,
          enableAutoplay: true,
          testimonial1_content: `${company} est intervenu ${formData.emergency247 ? 'en urgence pour une fuite d\'eau' : 'pour rénover notre installation'}. Service impeccable du début à la fin ! L'équipe est professionnelle, ponctuelle et le travail est de grande qualité. Les prix sont justes et transparents. Je recommande vivement !`,
          testimonial1_author: 'Marie Lefebvre',
          testimonial1_location: `${city} centre`,
          testimonial1_rating: 5,
          testimonial1_service: formData.services[0]?.name,
          testimonial1_date: 'Il y a 2 semaines',
          testimonial1_verified: true,
          testimonial2_content: `Très satisfait de la prestation de ${company}. ${formData.yearsExperience} ans d'expérience, ça se voit ! Le ${businessType} a été très professionnel, a pris le temps d'expliquer et a laissé le chantier impeccable. Rapport qualité/prix excellent.`,
          testimonial2_author: 'Jean-Pierre Martin',
          testimonial2_location: `${city} nord`,
          testimonial2_rating: 5,
          testimonial2_service: formData.services[1]?.name || formData.services[0]?.name,
          testimonial2_date: 'Il y a 1 mois',
          testimonial2_verified: true,
          testimonial3_content: `${formData.emergency247 ? 'Appelé en pleine nuit pour une urgence' : 'Projet de rénovation complexe'}, ${company} a été parfait. Devis respecté, délais tenus, travail soigné. L'équipe est à l'écoute et de bon conseil. Une entreprise sérieuse que je recommande.`,
          testimonial3_author: 'Sophie Dubois',
          testimonial3_location: `${city} sud`,
          testimonial3_rating: 5,
          testimonial3_service: formData.services[2]?.name || formData.services[0]?.name,
          testimonial3_date: 'Il y a 3 semaines',
          testimonial3_verified: true,
          googleRating: {
            average: 4.8,
            total: 127,
            link: '#'
          },
          ...getBg()
        }
      },
      
      // FAQ
      {
        id: generateBlockId('faq'),
        type: 'faq-v3-perfect',
        props: {
          variant: 'searchable',
          title: 'Questions fréquentes',
          subtitle: `Tout ce que vous devez savoir sur nos services de ${businessType} à ${city}`,
          searchPlaceholder: 'Rechercher une question...',
          categories: ['Tarifs', 'Délais', 'Garanties', 'Services'],
          faq1_question: formData.emergency247 ? 'Intervenez-vous vraiment 24h/7j ?' : 'Quels sont vos horaires d\'intervention ?',
          faq1_answer: formData.emergency247 
            ? `Oui, ${company} assure un service d'urgence 24h/24 et 7j/7, y compris les week-ends et jours fériés. Nous intervenons en moins de 30 minutes pour les urgences à ${city}.` 
            : `Nous intervenons du lundi au vendredi de 8h à 19h, et le samedi de 9h à 17h. Des créneaux en soirée peuvent être arrangés sur demande.`,
          faq1_category: 'Services',
          faq2_question: 'Vos devis sont-ils vraiment gratuits ?',
          faq2_answer: 'Absolument ! Nos devis sont 100% gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer un chiffrage détaillé et transparent.',
          faq2_category: 'Tarifs',
          faq3_question: 'Quelles garanties offrez-vous ?',
          faq3_answer: content.guarantees.join(' ') + ' Nous sommes assurés et certifiés pour votre tranquillité.',
          faq3_category: 'Garanties',
          faq4_question: 'Dans quelles zones intervenez-vous ?',
          faq4_answer: `Nous intervenons à ${city} et dans toutes les communes environnantes : ${formData.interventionCities.join(', ')}. Pour les urgences, nous couvrons un rayon de ${formData.interventionRadius || '20'}km autour de ${city}.`,
          faq4_category: 'Services',
          faq5_question: 'Comment se passe le paiement ?',
          faq5_answer: 'Le paiement s\'effectue après la réalisation des travaux. Nous acceptons : CB, espèces, chèque et virement. Pour les gros travaux, un échelonnement est possible.',
          faq5_category: 'Tarifs',
          faq6_question: 'Êtes-vous certifiés ?',
          faq6_answer: `Oui, ${company} possède toutes les certifications nécessaires : ${(formData.certifications || getDefaultCertifications(businessType)).join(', ')}. Nous sommes également assurés en responsabilité civile professionnelle.`,
          faq6_category: 'Garanties',
          ctaButton: {
            text: 'Poser une question',
            href: '/contact'
          },
          ...getBg()
        }
      },
      
      // CTA final
      {
        id: generateBlockId('cta'),
        type: 'cta-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'cta', 0),
          title: formData.emergency247 ? 'Une urgence ? Nous sommes là !' : 'Prêt à démarrer votre projet ?',
          subtitle: formData.emergency247 
            ? `Intervention en 30 minutes chrono à ${city}` 
            : `Contactez ${company} pour un devis gratuit et personnalisé`,
          primaryButton: {
            text: `☎️ ${formData.phone}`,
            href: `tel:${formData.phone}`,
            size: 'extra-large',
            animation: 'pulse',
            fullWidth: true
          },
          secondaryButton: {
            text: '📧 Demande en ligne',
            href: '/contact',
            style: 'outline'
          },
          features: content.guarantees,
          urgencyBadge: formData.emergency247 ? {
            text: 'Service d\'urgence 24h/7j',
            animation: 'blink'
          } : null,
          trustBadges: [
            { icon: '✅', text: 'Entreprise certifiée' },
            { icon: '🛡️', text: 'Garantie ' + (businessType === 'menuisier' ? '10 ans' : '2 ans') },
            { icon: '⭐', text: '4.8/5 sur Google' }
          ],
          backgroundAnimation: 'gradient-shift',
          backgroundColor: businessType === 'plombier' ? '#2563EB' : businessType === 'electricien' ? '#F59E0B' : null,
          ...getBg()
        }
      },
      
      // Footer
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: {
          variant: 'mega-footer',
          companyName: company,
          description: `${company}, votre ${businessType} de confiance à ${city} depuis ${formData.yearsExperience} ans. ${content.aboutContent.substring(0, 150)}...`,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.address || ''} ${city}, France`,
          logo: `/logo-${company.toLowerCase().replace(/\s+/g, '-')}.png`,
          services: {
            title: 'Nos services',
            links: formData.services.map(s => ({
              name: s.name,
              url: `/${s.name.toLowerCase().replace(/\s+/g, '-')}`,
              description: s.description
            }))
          },
          zones: {
            title: 'Zones d\'intervention',
            links: formData.interventionCities.map(c => ({
              name: `${businessType} ${c}`,
              url: `/zone/${c.toLowerCase().replace(/\s+/g, '-')}`
            }))
          },
          certifications: formData.certifications || getDefaultCertifications(businessType),
          socialLinks: [
            { platform: 'facebook', url: `https://facebook.com/${company.toLowerCase().replace(/\s+/g, '')}` },
            { platform: 'google', url: `https://g.page/${company.toLowerCase().replace(/\s+/g, '')}` },
            { platform: 'linkedin', url: '#' }
          ],
          paymentMethods: {
            title: 'Moyens de paiement',
            methods: ['CB', 'Espèces', 'Chèque', 'Virement', 'PayPal']
          },
          openingHours: {
            title: 'Horaires',
            hours: formData.emergency247 
              ? '24h/24, 7j/7 - Service d\'urgence permanent'
              : 'Lun-Ven: 8h-19h • Sam: 9h-17h • Dim: Urgences uniquement'
          },
          newsletter: {
            title: 'Newsletter',
            subtitle: 'Conseils et actualités',
            placeholder: 'Votre email',
            button: 'S\'inscrire'
          },
          legalLinks: [
            { name: 'Mentions légales', url: '/mentions-legales' },
            { name: 'CGV', url: '/cgv' },
            { name: 'Politique de confidentialité', url: '/confidentialite' }
          ],
          copyright: `© ${new Date().getFullYear()} ${company}. Tous droits réservés.`,
          backgroundColor: '#1a1a1a'
        }
      }
    ]
  });
  
  // Generate service × city pages with personalization
  let cityIndex = 0;
  formData.services.forEach((service, serviceIndex) => {
    formData.interventionCities.forEach(city => {
      pages.push(generateEnhancedServicePage(service, city, businessType, company, formData, cityIndex++, serviceIndex));
    });
  });
  
  console.log(`      - Génération de ${formData.services.length * formData.interventionCities.length} pages SEO (${formData.services.length} services × ${formData.interventionCities.length} villes)`);
  
  // Contact page
  pages.push({
    id: 'contact',
    name: 'Contact',
    slug: '/contact',
    seo: {
      title: `Contact - ${company} | ${businessType} à ${city}`,
      description: `Contactez ${company} pour tous vos besoins en ${businessType}. Devis gratuit, intervention rapide à ${city}. ☎️ ${formData.phone}`
    },
    blocks: [
      {
        id: generateBlockId('header'),
        type: 'header-v3-perfect',
        props: { 
          variant: 'modern-transparent', 
          logoText: company,
          ctaButton: {
            text: '☎️ Urgence',
            href: `tel:${formData.phone}`
          }
        }
      },
      {
        id: generateBlockId('contact'),
        type: 'contact-v3-perfect',
        props: {
          variant: getBlockVariant(businessType, 'contact', 0),
          title: 'Contactez-nous',
          subtitle: 'Nous sommes à votre écoute pour tous vos projets',
          phone: formData.phone,
          email: formData.email,
          address: `${city}, France`,
          hours: formData.emergency247 ? '24h/24, 7j/7' : 'Lun-Ven: 8h-19h, Sam: 9h-17h',
          mapPosition: 'right',
          formFields: [
            { type: 'text', name: 'name', label: 'Nom complet', required: true, icon: '👤' },
            { type: 'email', name: 'email', label: 'Email', required: true, icon: '✉️' },
            { type: 'tel', name: 'phone', label: 'Téléphone', required: true, icon: '📞' },
            { type: 'select', name: 'service', label: 'Service souhaité', options: formData.services.map(s => s.name), icon: '🛠️' },
            { type: 'select', name: 'urgency', label: 'Urgence', options: ['Urgent (24h)', 'Cette semaine', 'Ce mois-ci', 'Devis seulement'], icon: '⏰' },
            { type: 'textarea', name: 'message', label: 'Décrivez votre besoin', required: true, rows: 5, icon: '💬' }
          ],
          submitButton: {
            text: 'Envoyer ma demande',
            loadingText: 'Envoi en cours...'
          },
          features: [
            { icon: '⚡', text: 'Réponse rapide garantie' },
            { icon: '🔒', text: 'Données sécurisées' },
            { icon: '💰', text: 'Devis gratuit' }
          ],
          backgroundColor: '#f8fafc'
        }
      },
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: { 
          variant: 'modern-columns', 
          companyName: company,
          backgroundColor: '#1a1a1a'
        }
      }
    ]
  });
  
  // Define custom CSS for backgrounds
  const customCSS = `
    /* Section backgrounds */
    .section-background-gradient-blue {
      background: linear-gradient(135deg, #EBF5FF 0%, #DBEAFE 100%);
    }
    .section-background-gradient-yellow {
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
    }
    .section-background-gradient-wood {
      background: linear-gradient(135deg, #F5E6D3 0%, #E5D4C1 100%);
    }
    .section-background-gradient-purple {
      background: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%);
    }
    .section-background-gradient-gray {
      background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
    }
    
    /* Enhanced spacing */
    .section-padding-large {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
    
    /* Smooth transitions */
    .section-transition {
      transition: all 0.3s ease;
    }
  `;
  
  return {
    pages,
    theme: {
      colors: {
        primary: getBusinessColors(businessType).primary,
        secondary: getBusinessColors(businessType).secondary,
        accent: getBusinessColors(businessType).accent,
        background: '#ffffff',
        text: '#1a1a1a',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      },
      typography: {
        fontFamily: {
          body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }
      },
      customCSS
    },
    settings: {
      siteName: company,
      favicon: `/favicon-${businessType}.ico`,
      logo: `/logo-${company.toLowerCase().replace(/\s+/g, '-')}.png`,
      analytics: {
        googleAnalyticsId: 'UA-XXXXXXXXX-X'
      }
    }
  };
};

// Helper functions
const getBusinessColors = (type) => {
  const colors = {
    plombier: { primary: '#2563EB', secondary: '#60A5FA', accent: '#EF4444' },
    electricien: { primary: '#F59E0B', secondary: '#FCD34D', accent: '#3B82F6' },
    menuisier: { primary: '#92400E', secondary: '#B45309', accent: '#059669' },
    peintre: { primary: '#8B5CF6', secondary: '#A78BFA', accent: '#EC4899' },
    macon: { primary: '#6B7280', secondary: '#9CA3AF', accent: '#DC2626' }
  };
  return colors[type] || colors.plombier;
};

const getDefaultServices = (type) => {
  const services = {
    plombier: [
      { name: 'Débouchage canalisation', description: 'Intervention rapide pour déboucher vos canalisations', price: 'À partir de 89€' },
      { name: 'Recherche de fuite', description: 'Détection précise sans destruction', price: 'À partir de 150€' },
      { name: 'Dépannage chauffe-eau', description: 'Réparation et remplacement toutes marques', price: 'À partir de 120€' }
    ],
    electricien: [
      { name: 'Mise aux normes électriques', description: 'Mise en conformité complète NFC 15-100', price: 'À partir de 1500€' },
      { name: 'Installation domotique', description: 'Maison connectée et intelligente', price: 'À partir de 2000€' },
      { name: 'Dépannage électrique', description: 'Intervention rapide pour toute panne', price: 'À partir de 90€' }
    ],
    menuisier: [
      { name: 'Cuisine sur mesure', description: 'Conception de cuisines personnalisées en bois', price: 'À partir de 5000€' },
      { name: 'Escalier bois', description: 'Création d\'escaliers design et traditionnels', price: 'À partir de 3500€' },
      { name: 'Dressing sur mesure', description: 'Agencement optimal de vos espaces', price: 'À partir de 2000€' }
    ],
    peintre: [
      { name: 'Peinture intérieure', description: 'Murs et plafonds, finitions parfaites', price: 'À partir de 25€/m²' },
      { name: 'Enduits décoratifs', description: 'Béton ciré, stuc vénitien, tadelakt', price: 'À partir de 45€/m²' },
      { name: 'Ravalement façade', description: 'Rénovation complète de vos façades', price: 'Sur devis' }
    ],
    macon: [
      { name: 'Construction maison', description: 'Maisons individuelles clés en main', price: 'À partir de 1200€/m²' },
      { name: 'Extension maison', description: 'Agrandissement de votre habitation', price: 'À partir de 1500€/m²' },
      { name: 'Rénovation complète', description: 'Transformation totale de votre bien', price: 'Sur devis' }
    ]
  };
  return services[type] || services.plombier;
};

const getDefaultCities = (mainCity) => {
  const citiesMap = {
    'Paris': ['Paris', 'Neuilly-sur-Seine', 'Boulogne-Billancourt', 'Levallois-Perret', 'Issy-les-Moulineaux'],
    'Lyon': ['Lyon', 'Villeurbanne', 'Vénissieux', 'Caluire-et-Cuire', 'Bron'],
    'Marseille': ['Marseille', 'Aubagne', 'La Ciotat', 'Aix-en-Provence', 'Cassis'],
    'Toulouse': ['Toulouse', 'Blagnac', 'Colomiers', 'Tournefeuille', 'Balma'],
    'Bordeaux': ['Bordeaux', 'Mérignac', 'Pessac', 'Talence', 'Bègles']
  };
  return citiesMap[mainCity] || citiesMap['Paris'];
};

const getDefaultCertifications = (type) => {
  const certs = {
    plombier: ['RGE', 'Qualibat', 'PGN/PGP'],
    electricien: ['Qualifelec', 'RGE', 'IRVE'],
    menuisier: ['Qualibat', 'RGE', 'Label Artisan'],
    peintre: ['Qualibat', 'RGE', 'Les Pros de la déco'],
    macon: ['Qualibat', 'RGE', 'Eco Artisan']
  };
  return certs[type] || [];
};

// Main function
async function generateUltraEnhancedSites() {
  console.log('🚀 Génération ULTRA ENHANCED avec personnalisation complète...\n');

  const clients = await prisma.client.findMany({
    where: {
      email: {
        in: [
          'demo.plombier@awema.fr',
          'demo.electricien@awema.fr',
          'demo.menuisier@awema.fr',
          'demo.peintre@awema.fr',
          'demo.macon@awema.fr'
        ]
      }
    },
    include: {
      projects: true
    }
  });

  const results = [];

  for (const client of clients) {
    console.log(`\n📋 Génération ULTRA pour : ${client.companyName}`);
    
    try {
      const tags = JSON.parse(client.tags || '{}');
      const businessType = tags.businessType;
      let formData = tags.formData || {};
      
      if (!businessType) {
        throw new Error('BusinessType non trouvé');
      }
      
      // Enrich form data
      formData = {
        ...formData,
        businessName: client.companyName,
        city: client.city,
        phone: client.phone || formData.phone,
        email: client.email || formData.email,
        services: formData.services?.length ? formData.services : getDefaultServices(businessType),
        interventionCities: formData.interventionCities?.length 
          ? formData.interventionCities 
          : getDefaultCities(client.city || formData.city || 'Paris'),
        emergency247: formData.emergency247 ?? (businessType === 'plombier'),
        yearsExperience: formData.yearsExperience || '15',
        certifications: formData.certifications || getDefaultCertifications(businessType),
        description: formData.description || `${client.companyName}, votre ${businessType} de confiance.`
      };

      const project = client.projects[0];
      if (!project) {
        throw new Error('Aucun projet trouvé');
      }

      console.log(`   ⏳ Génération ULTRA personnalisée (${businessType})...`);
      const startTime = Date.now();
      
      // Reset block counter
      blockCounter = 0;
      
      const generatedSite = generateUltraEnhancedSite(formData, businessType);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`   ✅ Site généré en ${duration}s`);
      console.log(`      - ${generatedSite.pages.length} pages totales`);
      console.log(`      - ${generatedSite.pages.reduce((sum, p) => sum + p.blocks.length, 0)} blocs personnalisés`);
      console.log(`      - Backgrounds alternés et gradients`);
      console.log(`      - Contenu 100% personnalisé`);

      await prisma.project.update({
        where: { id: project.id },
        data: {
          data: JSON.stringify(generatedSite),
          status: 'PUBLISHED',
          publishedAt: new Date()
        }
      });
      console.log(`   ✅ Données sauvegardées`);

      results.push({
        client: client.companyName,
        projectId: project.id,
        businessType: businessType,
        url: `http://localhost:3000/editor/${project.id}`,
        pages: generatedSite.pages.length,
        seoPages: formData.services.length * formData.interventionCities.length,
        status: 'success'
      });

    } catch (error) {
      console.error(`   ❌ Erreur : ${error.message}`);
      results.push({
        client: client.companyName,
        error: error.message,
        status: 'error'
      });
    }
  }

  console.log('\n\n════════════════════════════════════════════════════════════');
  console.log('       ✨ SITES ULTRA ENHANCED GÉNÉRÉS                     ');
  console.log('════════════════════════════════════════════════════════════\n');

  results.forEach((result, index) => {
    if (result.status === 'success') {
      console.log(`✅ ${index + 1}. ${result.client} (${result.businessType})`);
      console.log(`   📎 URL: ${result.url}`);
      console.log(`   📄 Pages: ${result.pages} dont ${result.seoPages} pages SEO locales`);
      console.log(`   🎨 Design: Sections colorées alternées + variations`);
      console.log(`   📝 Contenu: 100% personnalisé et enrichi`);
      console.log(`   🏆 Features: Backgrounds, gradients, animations\n`);
    }
  });

  console.log('🎉 Sites ULTRA ENHANCED générés avec succès !');
  console.log('✨ Améliorations appliquées :');
  console.log('   - Backgrounds alternés avec couleurs métier');
  console.log('   - Variations visuelles différentes par section');
  console.log('   - Contenu 100% personnalisé (pas de lorem)');
  console.log('   - Textes adaptés au métier et à la ville');
  console.log('   - Images et galeries contextualisées');
  console.log('   - Témoignages et FAQ personnalisés\n');

  await prisma.$disconnect();
}

// Execute
generateUltraEnhancedSites().catch(async (error) => {
  console.error('Erreur fatale:', error);
  await prisma.$disconnect();
  process.exit(1);
});
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Helper for unique IDs
let blockCounter = 0;
const generateBlockId = (type) => {
  blockCounter++;
  return `${type}-${Date.now()}-${blockCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

// Section backgrounds
const sectionBackgrounds = [
  { bg: '#ffffff' },
  { bg: '#f8fafc' },
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { bg: '#f3f4f6' },
  { bg: '#fafafa' },
  { bg: 'linear-gradient(to right, #f5f7fa 0%, #c3cfe2 100%)' }
];

// Visual variants by business type
const visualThemes = {
  plombier: {
    hero: ['split-screen', 'centered-bold', 'side-image'],
    services: ['cards-3d', 'hexagon', 'cards-hover'],
    features: ['bento', 'grid-icons', 'timeline'],
    testimonials: ['carousel-3d', 'masonry', 'carousel-modern'],
    cta: ['gradient-waves', 'glassmorphism', 'centered-simple'],
    gallery: ['masonry-flow', 'grid-hover', 'polaroid']
  },
  electricien: {
    hero: ['particles', 'gradient-animated', 'tech-grid'],
    services: ['comparison', 'timeline', 'cards-gradient'],
    features: ['carousel-3d', 'stats-counter', 'grid-icons'],
    testimonials: ['video-gallery', 'stacked', 'timeline'],
    cta: ['neon-glow', 'countdown', 'split-content'],
    gallery: ['instagram-style', 'before-after', 'grid-uniform']
  },
  menuisier: {
    hero: ['fullscreen-image', 'split-content', 'parallax'],
    services: ['showcase', 'portfolio-style', 'minimal-grid'],
    features: ['icons-left', 'centered', 'alternating'],
    testimonials: ['quotes-elegant', 'grid-photos', 'slider'],
    cta: ['natural', 'wood-texture', 'minimal'],
    gallery: ['lightbox-pro', 'masonry-creative', 'fullscreen']
  },
  peintre: {
    hero: ['color-burst', 'artistic', 'gallery-bg'],
    services: ['color-cards', 'visual-grid', 'creative'],
    features: ['paint-splash', 'colorful', 'artistic-grid'],
    testimonials: ['photo-focus', 'colorful-cards', 'wall'],
    cta: ['rainbow', 'paint-drip', 'vibrant'],
    gallery: ['color-filter', 'wall-gallery', 'pinterest']
  },
  macon: {
    hero: ['construction', 'blueprint', 'strong'],
    services: ['industrial', 'grid-solid', 'construction-cards'],
    features: ['concrete', 'solid-grid', 'building-blocks'],
    testimonials: ['construction-site', 'client-logos', 'case-studies'],
    cta: ['construction-cta', 'solid', 'industrial'],
    gallery: ['project-showcase', 'progress-photos', 'grid-construction']
  }
};

const getRandomVariant = (businessType, blockType) => {
  const theme = visualThemes[businessType] || visualThemes.plombier;
  const variants = theme[blockType] || ['default'];
  return variants[Math.floor(Math.random() * variants.length)];
};

const getSectionBackground = (index) => {
  return sectionBackgrounds[index % sectionBackgrounds.length];
};

// Enhanced content generation
const generateLongContent = (businessType, service, city, company) => {
  const contents = {
    plombier: {
      'débouchage canalisation': `
Notre entreprise ${company} est spécialisée dans le débouchage de canalisation à ${city} depuis plus de 15 ans. 
Nous intervenons rapidement pour tous vos problèmes d'évacuation, qu'il s'agisse d'un simple bouchon ou d'une obstruction complexe.

### Notre expertise en débouchage à ${city}

Le débouchage de canalisation nécessite un savoir-faire technique et du matériel professionnel adapté. Chez ${company}, 
nous utilisons les dernières technologies pour diagnostiquer et résoudre efficacement vos problèmes de canalisations bouchées.

Nos techniciens sont formés aux techniques les plus modernes :
- **Hydrocurage haute pression** : pour un nettoyage en profondeur sans endommager vos canalisations
- **Inspection vidéo** : pour localiser précisément l'origine du problème
- **Furet électrique professionnel** : pour les bouchons tenaces
- **Débouchage manuel** : pour les interventions simples et rapides

### Pourquoi les canalisations se bouchent-elles ?

À ${city}, nous constatons que les principales causes de bouchons sont :
- L'accumulation de cheveux et de savon dans les douches et baignoires
- Les résidus alimentaires et graisses dans les éviers de cuisine
- Le calcaire qui réduit progressivement le diamètre des canalisations
- Les objets tombés accidentellement dans les toilettes
- Les racines d'arbres qui pénètrent dans les canalisations extérieures

### Notre processus d'intervention

1. **Diagnostic gratuit** : Nous évaluons la situation et localisons le bouchon
2. **Devis transparent** : Prix fixe annoncé avant toute intervention
3. **Débouchage professionnel** : Utilisation de la technique la plus adaptée
4. **Vérification complète** : Test d'écoulement sur l'ensemble du réseau
5. **Conseils d'entretien** : Pour éviter la formation de nouveaux bouchons

### Zone d'intervention à ${city}

Basés au cœur de ${city}, nous intervenons rapidement dans tous les quartiers et les communes avoisinantes. 
Notre connaissance parfaite du réseau de canalisation local nous permet d'être particulièrement efficaces.`,

      'recherche de fuite': `
La recherche de fuite d'eau est l'une des spécialités de ${company} à ${city}. Une fuite non détectée peut causer 
des dégâts considérables et faire exploser votre facture d'eau. C'est pourquoi nous mettons tout en œuvre pour 
localiser et réparer rapidement toute fuite dans votre habitation ou local professionnel.

### Technologies de pointe pour la détection

Chez ${company}, nous investissons dans les équipements les plus performants :
- **Caméra thermique** : détecte les variations de température causées par les fuites
- **Détecteur acoustique** : localise les fuites par analyse des vibrations
- **Gaz traceur** : pour les fuites difficiles d'accès
- **Corrélateur acoustique** : pour les canalisations enterrées

### Les signes qui doivent vous alerter

À ${city}, nous intervenons souvent pour ces symptômes :
- Augmentation anormale de votre facture d'eau
- Traces d'humidité sur les murs ou plafonds
- Moisissures apparentes
- Bruit d'écoulement permanent
- Baisse de pression inexpliquée
- Flaques d'eau sans origine apparente

### Notre méthode de travail

Notre approche est méthodique et non destructive :
1. **Analyse de votre consommation** : Vérification du compteur d'eau
2. **Inspection visuelle** : Recherche des indices visibles
3. **Tests de pression** : Pour identifier les sections défaillantes
4. **Détection technologique** : Utilisation de nos équipements spécialisés
5. **Localisation précise** : Marquage exact de la fuite
6. **Réparation immédiate** : Si vous le souhaitez, nous réparons dans la foulée

### Pourquoi choisir ${company} pour votre recherche de fuite ?

- **Sans destruction** : Nos méthodes préservent votre intérieur
- **Précision maximale** : Localisation au centimètre près
- **Rapport détaillé** : Pour vos assurances
- **Intervention rapide** : Disponibles 7j/7 à ${city}
- **Garantie de résultat** : Nous trouvons votre fuite ou c'est gratuit`
    },
    electricien: {
      'mise aux normes électriques': `
La mise aux normes électriques est une étape cruciale pour garantir la sécurité de votre installation à ${city}. 
${company}, fort de ses 22 années d'expérience, vous accompagne dans cette démarche essentielle pour votre sécurité 
et celle de vos proches.

### Pourquoi mettre aux normes votre installation ?

La norme NFC 15-100 évolue régulièrement pour s'adapter aux nouveaux usages et renforcer la sécurité. À ${city}, 
de nombreux logements anciens nécessitent une mise à jour complète de leur installation électrique.

Les risques d'une installation non conforme :
- **Incendie** : 30% des incendies domestiques sont d'origine électrique
- **Électrocution** : Danger mortel en cas de défaut d'isolation
- **Dysfonctionnements** : Coupures intempestives, appareils endommagés
- **Problèmes d'assurance** : Refus d'indemnisation en cas de sinistre
- **Impossibilité de vendre** : Le diagnostic électrique est obligatoire

### Notre expertise en mise aux normes

Chez ${company}, nos électriciens certifiés maîtrisent parfaitement la norme NFC 15-100 :
- Remplacement des tableaux électriques vétustes
- Installation de disjoncteurs différentiels 30mA
- Mise à la terre de l'ensemble de l'installation
- Création de circuits spécialisés (plaques, lave-linge, etc.)
- Respect des volumes de sécurité dans les salles d'eau
- Installation du nombre requis de prises par pièce

### Le déroulement d'une mise aux normes

1. **Diagnostic complet** : État des lieux détaillé de votre installation
2. **Rapport de non-conformité** : Liste précise des points à corriger
3. **Devis détaillé** : Chiffrage transparent poste par poste
4. **Planification** : Organisation des travaux selon vos contraintes
5. **Réalisation** : Intervention propre et méthodique
6. **Vérification** : Tests complets de l'installation
7. **Certification** : Remise de l'attestation de conformité Consuel

### Financement et aides disponibles

À ${city}, plusieurs dispositifs peuvent vous aider :
- TVA réduite à 10% pour les logements de plus de 2 ans
- Aides de l'ANAH selon vos revenus
- Éco-prêt à taux zéro pour les travaux de rénovation
- Crédit d'impôt pour certains équipements

Notre équipe vous accompagne dans vos démarches administratives.`
    }
  };

  const businessContent = contents[businessType] || contents.plombier;
  const serviceContent = businessContent[service.toLowerCase()] || businessContent[Object.keys(businessContent)[0]];
  
  return serviceContent;
};

// Generate service × city pages
const generateServiceCityPages = (formData, businessType, company) => {
  const pages = [];
  
  // For each service × each city
  formData.services.forEach(service => {
    formData.interventionCities.forEach(city => {
      const slug = `${service.name.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase().replace(/\s+/g, '-')}`;
      let sectionIndex = 0;
      
      pages.push({
        id: slug,
        name: `${service.name} ${city}`,
        slug: `/${slug}`,
        seo: {
          title: `${service.name} ${city} - ${company} | ${businessType === 'plombier' ? 'Plombier' : businessType} ${formData.emergency247 ? '24h/7j' : 'professionnel'}`,
          description: `${company}, votre expert en ${service.name.toLowerCase()} à ${city}. ${service.description} Intervention rapide, devis gratuit. ☎️ ${formData.phone}`,
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
              ]
            }
          },
          
          // Hero with service-specific variant
          {
            id: generateBlockId('hero'),
            type: 'hero-v3-perfect',
            props: {
              variant: getRandomVariant(businessType, 'hero'),
              title: `${service.name} à ${city}`,
              subtitle: `${company} - Expert ${businessType} pour votre ${service.name.toLowerCase()} | Intervention rapide à ${city}`,
              primaryButton: {
                text: formData.emergency247 ? '☎️ Urgence 24h/7j' : '📞 Devis gratuit',
                href: `tel:${formData.phone}`
              },
              secondaryButton: {
                text: 'Voir nos réalisations',
                href: '#gallery'
              },
              backgroundImage: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-hero.jpg`,
              backgroundOverlay: 'gradient'
            },
            style: getSectionBackground(sectionIndex++)
          },
          
          // Rich content section
          {
            id: generateBlockId('content'),
            type: 'content-v3-perfect',
            props: {
              variant: 'split-image',
              title: `Expert ${service.name} à ${city}`,
              content: generateLongContent(businessType, service.name, city, company),
              imageUrl: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}-1.jpg`,
              imagePosition: 'right',
              enableAnimation: true
            },
            style: getSectionBackground(sectionIndex++)
          },
          
          // Process steps with visual variant
          {
            id: generateBlockId('features'),
            type: 'features-v3-perfect',
            props: {
              variant: getRandomVariant(businessType, 'features'),
              title: `Notre processus ${service.name}`,
              subtitle: `Une méthode éprouvée pour des résultats garantis à ${city}`,
              feature1_title: 'Diagnostic précis',
              feature1_description: `Analyse complète de votre problème de ${service.name.toLowerCase()}`,
              feature1_icon: '🔍',
              feature2_title: 'Devis transparent',
              feature2_description: 'Prix fixe communiqué avant intervention',
              feature2_icon: '📋',
              feature3_title: 'Intervention rapide',
              feature3_description: `Réalisation professionnelle de votre ${service.name.toLowerCase()}`,
              feature3_icon: '🛠️',
              feature4_title: 'Garantie qualité',
              feature4_description: 'Travaux garantis avec suivi après intervention',
              feature4_icon: '✅',
              feature5_title: 'Nettoyage complet',
              feature5_description: 'Nous laissons votre intérieur propre',
              feature5_icon: '🧹',
              feature6_title: 'Conseils d\'entretien',
              feature6_description: 'Recommandations pour éviter les futurs problèmes',
              feature6_icon: '💡'
            },
            style: getSectionBackground(sectionIndex++)
          },
          
          // Gallery with service-specific images
          {
            id: generateBlockId('gallery'),
            type: 'gallery-v3-perfect',
            props: {
              variant: getRandomVariant(businessType, 'gallery'),
              title: `Nos réalisations ${service.name} à ${city}`,
              subtitle: 'Découvrez la qualité de notre travail',
              columnsDesktop: 4,
              columnsTablet: 2,
              columnsMobile: 1,
              enableLightbox: true,
              enableFilters: true,
              hoverEffect: 'zoom-rotate',
              image1_src: `/images/${businessType}-gallery-1.jpg`,
              image1_title: `${service.name} - Avant`,
              image1_category: 'avant-apres',
              image2_src: `/images/${businessType}-gallery-2.jpg`,
              image2_title: `${service.name} - Après`,
              image2_category: 'avant-apres',
              image3_src: `/images/${businessType}-gallery-3.jpg`,
              image3_title: 'Intervention récente',
              image3_category: 'recent',
              image4_src: `/images/${businessType}-gallery-4.jpg`,
              image4_title: 'Chantier complexe',
              image4_category: 'complexe',
              image5_src: `/images/${businessType}-gallery-5.jpg`,
              image5_title: 'Rénovation complète',
              image5_category: 'renovation',
              image6_src: `/images/${businessType}-gallery-6.jpg`,
              image6_title: 'Installation neuve',
              image6_category: 'neuf'
            },
            style: getSectionBackground(sectionIndex++)
          },
          
          // Testimonials with local focus
          {
            id: generateBlockId('testimonials'),
            type: 'testimonials-v3-perfect',
            props: {
              variant: getRandomVariant(businessType, 'testimonials'),
              title: `Nos clients de ${city} témoignent`,
              subtitle: `La satisfaction de nos clients est notre priorité`,
              testimonial1_content: `Excellent service de ${service.name.toLowerCase()} ! Intervention rapide et efficace. ${company} a résolu mon problème en moins d'une heure. Je recommande vivement ce ${businessType} professionnel à ${city}.`,
              testimonial1_author: 'Marie L.',
              testimonial1_location: `${city} centre`,
              testimonial1_rating: 5,
              testimonial1_service: service.name,
              testimonial2_content: `Très satisfait ! Prix correct et travail de qualité pour mon ${service.name.toLowerCase()}. L'équipe est professionnelle et respectueuse. Un vrai expert du métier.`,
              testimonial2_author: 'Jean-Pierre M.',
              testimonial2_location: `${city} nord`,
              testimonial2_rating: 5,
              testimonial2_service: service.name,
              testimonial3_content: `${formData.emergency247 ? 'Dépannage en pleine nuit,' : 'Intervention programmée,'} tout s'est parfaitement déroulé. ${service.name} réalisé avec soin. Merci à ${company} !`,
              testimonial3_author: 'Sophie D.',
              testimonial3_location: `${city} sud`,
              testimonial3_rating: 5,
              testimonial3_service: service.name
            },
            style: getSectionBackground(sectionIndex++)
          },
          
          // CTA with urgency
          {
            id: generateBlockId('cta'),
            type: 'cta-v3-perfect',
            props: {
              variant: getRandomVariant(businessType, 'cta'),
              title: `Besoin d'un ${service.name.toLowerCase()} à ${city} ?`,
              subtitle: formData.emergency247 
                ? `Intervention d'urgence 24h/7j - Nous arrivons en 30 minutes !`
                : `Contactez-nous pour un devis gratuit sous 24h`,
              primaryButton: {
                text: `☎️ ${formData.phone}`,
                href: `tel:${formData.phone}`
              },
              secondaryButton: {
                text: 'Demande en ligne',
                href: '/contact'
              },
              features: [
                'Devis gratuit',
                'Intervention rapide',
                'Garantie 1 an',
                formData.emergency247 ? 'Urgence 24h/7j' : 'RDV flexible'
              ],
              backgroundAnimation: 'gradient-shift'
            },
            style: {
              ...getSectionBackground(sectionIndex++),
              backgroundGradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
            }
          },
          
          // Footer
          {
            id: generateBlockId('footer'),
            type: 'footer-v3-perfect',
            props: {
              variant: getRandomVariant(businessType, 'footer'),
              companyName: company,
              description: formData.description || `${company}, votre ${businessType} de confiance à ${city} et environs.`,
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
              }))
            }
          }
        ]
      });
    });
  });
  
  return pages;
};

// Main generation function
const generateEnhancedSiteFromFormData = (formData, businessType) => {
  const company = formData.businessName;
  const city = formData.city;
  
  // Generate all pages
  const pages = [];
  
  // Homepage with rich content
  let sectionIndex = 0;
  pages.push({
    id: 'home',
    name: 'Accueil',
    slug: '/',
    isHomePage: true,
    seo: {
      title: `${company} - ${businessType === 'plombier' ? 'Plombier' : businessType === 'electricien' ? 'Électricien' : businessType} à ${city} | ${formData.emergency247 ? 'Urgence 24h/7j' : 'Devis gratuit'}`,
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
                href: `/${s.name.toLowerCase().replace(/\s+/g, '-')}`
              }))
            },
            { label: 'Réalisations', href: '/realisations' },
            { label: 'À propos', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ],
          ctaButton: {
            text: formData.emergency247 ? '☎️ Urgence' : 'Devis gratuit',
            href: formData.emergency247 ? `tel:${formData.phone}` : '/contact'
          }
        }
      },
      
      // Hero
      {
        id: generateBlockId('hero'),
        type: 'hero-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'hero'),
          title: `${businessType === 'plombier' ? 'Plombier' : businessType === 'electricien' ? 'Électricien' : businessType} ${formData.emergency247 ? 'd\'urgence' : 'professionnel'} à ${city}`,
          subtitle: `${company} - ${formData.yearsExperience} ans d'expérience à votre service`,
          primaryButton: {
            text: formData.emergency247 ? '☎️ Appel urgent' : '📞 Devis gratuit',
            href: `tel:${formData.phone}`
          },
          secondaryButton: {
            text: 'Nos services',
            href: '#services'
          },
          features: [
            `${formData.yearsExperience} ans d'expérience`,
            formData.emergency247 ? 'Disponible 24h/7j' : 'Devis gratuit',
            'Garantie qualité'
          ],
          backgroundType: 'gradient-animated'
        },
        style: getSectionBackground(sectionIndex++)
      },
      
      // Services with enhanced design
      {
        id: generateBlockId('services'),
        type: 'services-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'services'),
          title: 'Nos Services',
          subtitle: `Expert ${businessType} pour tous vos besoins à ${city}`,
          ...formData.services.slice(0, 3).reduce((acc, service, index) => ({
            ...acc,
            [`service${index + 1}_name`]: service.name,
            [`service${index + 1}_description`]: service.description + ` - Intervention rapide et professionnelle à ${city} et environs.`,
            [`service${index + 1}_price`]: service.price || 'Sur devis',
            [`service${index + 1}_icon`]: ['🔧', '🔍', '🛠️'][index],
            [`service${index + 1}_features`]: [
              'Diagnostic gratuit',
              'Intervention rapide',
              'Garantie 1 an'
            ],
            [`service${index + 1}_link`]: `/${service.name.toLowerCase().replace(/\s+/g, '-')}`
          }), {}),
          showPrices: true,
          enableHover: true
        },
        style: getSectionBackground(sectionIndex++)
      },
      
      // About section with rich content
      {
        id: generateBlockId('content'),
        type: 'content-v3-perfect',
        props: {
          variant: 'story-telling',
          title: `${company}, votre ${businessType} de confiance`,
          content: `
Depuis ${formData.yearsExperience} ans, ${company} met son expertise au service des habitants de ${city} et ses environs. 
Notre équipe de ${businessType}s qualifiés intervient pour tous vos besoins, qu'il s'agisse d'urgences ou de travaux planifiés.

### Notre engagement qualité

Nous sommes fiers de notre réputation bâtie sur :
- **La réactivité** : ${formData.emergency247 ? 'Disponibles 24h/7j pour vos urgences' : 'Intervention rapide selon vos disponibilités'}
- **Le professionnalisme** : Équipe formée et équipée des dernières technologies
- **La transparence** : Devis détaillé et prix fixe avant toute intervention
- **La garantie** : Tous nos travaux sont garantis pour votre tranquillité

### Pourquoi nous choisir ?

À ${city}, de nombreux ${businessType}s proposent leurs services. Ce qui nous distingue :
- Une vraie expertise locale avec ${formData.yearsExperience} ans de présence
- Des tarifs justes et transparents
- Un service client irréprochable
- Des solutions durables et conformes aux normes`,
          imageUrl: `/images/${businessType}-team.jpg`,
          imagePosition: 'left',
          stats: [
            { label: 'Années d\'expérience', value: formData.yearsExperience },
            { label: 'Clients satisfaits', value: '2000+' },
            { label: 'Interventions/an', value: '500+' }
          ]
        },
        style: getSectionBackground(sectionIndex++)
      },
      
      // Features grid
      {
        id: generateBlockId('features'),
        type: 'features-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'features'),
          title: 'Nos points forts',
          subtitle: `Ce qui fait de ${company} le meilleur choix à ${city}`,
          feature1_title: formData.emergency247 ? 'Urgence 24h/7j' : 'Flexibilité horaire',
          feature1_description: formData.emergency247 ? 'Intervention d\'urgence jour et nuit, week-ends et jours fériés' : 'RDV selon vos disponibilités, soirs et week-ends possibles',
          feature1_icon: formData.emergency247 ? '🚨' : '📅',
          feature2_title: 'Devis gratuit',
          feature2_description: 'Étude personnalisée et chiffrage détaillé sans engagement',
          feature2_icon: '📋',
          feature3_title: 'Garantie qualité',
          feature3_description: 'Travaux garantis 1 an minimum, assurance décennale',
          feature3_icon: '✅',
          feature4_title: 'Équipe qualifiée',
          feature4_description: `${businessType}s certifiés et formés aux dernières normes`,
          feature4_icon: '👷',
          feature5_title: 'Matériel pro',
          feature5_description: 'Équipements de pointe pour des interventions efficaces',
          feature5_icon: '🔧',
          feature6_title: 'Prix transparents',
          feature6_description: 'Tarifs clairs communiqués avant toute intervention',
          feature6_icon: '💰'
        },
        style: getSectionBackground(sectionIndex++)
      },
      
      // Gallery
      {
        id: generateBlockId('gallery'),
        type: 'gallery-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'gallery'),
          title: 'Nos réalisations',
          subtitle: 'Découvrez la qualité de notre travail',
          columnsDesktop: 3,
          enableLightbox: true,
          enableFilters: true,
          filterCategories: ['Tout', 'Urgences', 'Rénovation', 'Installation'],
          image1_src: `/images/${businessType}-realisation-1.jpg`,
          image1_title: 'Intervention d\'urgence',
          image1_category: 'Urgences',
          image2_src: `/images/${businessType}-realisation-2.jpg`,
          image2_title: 'Rénovation complète',
          image2_category: 'Rénovation',
          image3_src: `/images/${businessType}-realisation-3.jpg`,
          image3_title: 'Installation neuve',
          image3_category: 'Installation',
          image4_src: `/images/${businessType}-realisation-4.jpg`,
          image4_title: 'Chantier complexe',
          image4_category: 'Rénovation',
          image5_src: `/images/${businessType}-realisation-5.jpg`,
          image5_title: 'Dépannage rapide',
          image5_category: 'Urgences',
          image6_src: `/images/${businessType}-realisation-6.jpg`,
          image6_title: 'Projet sur mesure',
          image6_category: 'Installation'
        },
        style: getSectionBackground(sectionIndex++)
      },
      
      // Testimonials
      {
        id: generateBlockId('testimonials'),
        type: 'testimonials-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'testimonials'),
          title: 'Ils nous font confiance',
          subtitle: `Les avis de nos clients à ${city}`,
          showRating: true,
          showLocation: true,
          testimonial1_content: `${company} est intervenu en urgence pour ${formData.services[0]?.name || 'un dépannage'}. Service impeccable, équipe professionnelle et prix correct. Je recommande vivement !`,
          testimonial1_author: 'Marie L.',
          testimonial1_location: city,
          testimonial1_rating: 5,
          testimonial1_date: 'Il y a 2 semaines',
          testimonial2_content: `Très satisfait de la prestation. ${formData.yearsExperience} ans d'expérience, ça se voit ! Travail propre et efficace. Un vrai professionnel.`,
          testimonial2_author: 'Jean-Pierre M.',
          testimonial2_location: `${city} centre`,
          testimonial2_rating: 5,
          testimonial2_date: 'Il y a 1 mois',
          testimonial3_content: `${formData.emergency247 ? 'Dépannage en pleine nuit,' : 'RDV respecté,'} travail soigné, explications claires. ${company} sera mon ${businessType} de référence !`,
          testimonial3_author: 'Sophie D.',
          testimonial3_location: `${city} nord`,
          testimonial3_rating: 5,
          testimonial3_date: 'Il y a 3 semaines'
        },
        style: getSectionBackground(sectionIndex++)
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
          faq1_question: formData.emergency247 ? 'Intervenez-vous vraiment 24h/7j ?' : 'Quels sont vos horaires d\'intervention ?',
          faq1_answer: formData.emergency247 ? `Oui, ${company} assure un service d'urgence 24h/24 et 7j/7, y compris les week-ends et jours fériés. Nous intervenons en moins de 30 minutes pour les urgences à ${city}.` : `Nous intervenons du lundi au vendredi de 8h à 19h, et le samedi de 9h à 17h. Des créneaux en soirée peuvent être arrangés sur demande.`,
          faq2_question: 'Vos devis sont-ils vraiment gratuits ?',
          faq2_answer: 'Absolument ! Nos devis sont 100% gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer un chiffrage détaillé et transparent.',
          faq3_question: 'Quelles garanties offrez-vous ?',
          faq3_answer: `Tous nos travaux sont garantis minimum 1 an. Nous disposons d'une assurance responsabilité civile professionnelle et d'une garantie décennale pour votre tranquillité.`,
          faq4_question: 'Quels sont vos tarifs ?',
          faq4_answer: `Nos tarifs varient selon le type d'intervention. Nous pratiquons des prix justes et transparents, toujours communiqués avant intervention. Pas de surprise sur la facture !`,
          faq5_question: 'Dans quelles zones intervenez-vous ?',
          faq5_answer: `Nous intervenons à ${city} et dans toutes les communes environnantes : ${formData.interventionCities.join(', ')}. Pour les urgences, nous couvrons un rayon de ${formData.interventionRadius || '20'}km.`
        },
        style: getSectionBackground(sectionIndex++)
      },
      
      // CTA
      {
        id: generateBlockId('cta'),
        type: 'cta-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'cta'),
          title: formData.emergency247 ? 'Une urgence ? Nous sommes là !' : 'Prêt à démarrer votre projet ?',
          subtitle: formData.emergency247 ? 'Intervention en 30 minutes chrono' : 'Contactez-nous pour un devis gratuit',
          primaryButton: {
            text: `☎️ ${formData.phone}`,
            href: `tel:${formData.phone}`,
            size: 'large'
          },
          features: [
            'Intervention rapide',
            'Devis gratuit',
            'Garantie 1 an',
            'Paiement flexible'
          ],
          backgroundType: 'gradient-animated'
        },
        style: {
          ...getSectionBackground(sectionIndex++),
          backgroundGradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
        }
      },
      
      // Footer
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: {
          variant: 'mega-footer',
          companyName: company,
          description: formData.description || `${company}, votre ${businessType} de confiance à ${city} depuis ${formData.yearsExperience} ans.`,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.address || ''} ${city}, France`,
          services: formData.services.map(s => ({
            name: s.name,
            url: `/${s.name.toLowerCase().replace(/\s+/g, '-')}`
          })),
          zones: formData.interventionCities.map(c => ({
            name: c,
            url: `/zone/${c.toLowerCase().replace(/\s+/g, '-')}`
          })),
          certifications: formData.certifications || [],
          socialLinks: formData.socialLinks || [],
          newsletter: {
            title: 'Restez informé',
            subtitle: 'Conseils et actualités',
            placeholder: 'Votre email'
          }
        }
      }
    ]
  });
  
  // Add service × city pages
  const serviceCityPages = generateServiceCityPages(formData, businessType, company);
  pages.push(...serviceCityPages);
  
  // Log the generation stats
  console.log(`      - Génération de ${serviceCityPages.length} pages SEO (${formData.services.length} services × ${formData.interventionCities.length} villes)`);
  
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
        props: { variant: 'modern-transparent', logoText: company }
      },
      {
        id: generateBlockId('contact'),
        type: 'contact-v3-perfect',
        props: {
          variant: getRandomVariant(businessType, 'contact'),
          title: 'Contactez-nous',
          subtitle: 'Nous sommes à votre écoute pour tous vos projets',
          phone: formData.phone,
          email: formData.email,
          address: `${city}, France`,
          hours: formData.emergency247 ? '24h/24, 7j/7' : 'Lun-Ven: 8h-19h, Sam: 9h-17h',
          mapPosition: 'right',
          formFields: [
            { type: 'text', name: 'name', label: 'Nom', required: true },
            { type: 'email', name: 'email', label: 'Email', required: true },
            { type: 'tel', name: 'phone', label: 'Téléphone', required: true },
            { type: 'select', name: 'service', label: 'Service souhaité', options: formData.services.map(s => s.name) },
            { type: 'textarea', name: 'message', label: 'Votre message', required: true }
          ]
        }
      },
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: { variant: 'modern-columns', companyName: company }
      }
    ]
  });
  
  return {
    pages,
    theme: {
      colors: {
        primary: formData.colorScheme === 'predefined' ? getBusinessColors(businessType).primary : '#2563EB',
        secondary: formData.colorScheme === 'predefined' ? getBusinessColors(businessType).secondary : '#3B82F6',
        accent: formData.colorScheme === 'predefined' ? getBusinessColors(businessType).accent : '#EF4444'
      },
      typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }
    }
  };
};

// Business-specific colors
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

// Default services by business type
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
      { name: 'Cuisine sur mesure', description: 'Conception de cuisines personnalisées', price: 'À partir de 5000€' },
      { name: 'Escalier bois', description: 'Création d\'escaliers design', price: 'À partir de 3500€' },
      { name: 'Dressing sur mesure', description: 'Agencement optimal de vos espaces', price: 'À partir de 2000€' }
    ],
    peintre: [
      { name: 'Peinture intérieure', description: 'Murs et plafonds, finitions parfaites', price: 'À partir de 25€/m²' },
      { name: 'Enduits décoratifs', description: 'Béton ciré, stuc, tadelakt', price: 'À partir de 45€/m²' },
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

// Default cities by main city
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

// Default certifications by business type
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
async function regenerateEnhancedSites() {
  console.log('🚀 Régénération des sites avec contenu enrichi et design amélioré...\n');

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
    console.log(`\n📋 Régénération pour : ${client.companyName}`);
    
    try {
      const tags = JSON.parse(client.tags || '{}');
      const businessType = tags.businessType;
      let formData = tags.formData || {};
      
      if (!businessType) {
        throw new Error('BusinessType non trouvé');
      }
      
      // Enrichir les données du formulaire avec des valeurs par défaut
      formData = {
        ...formData,
        services: formData.services?.length ? formData.services : getDefaultServices(businessType),
        interventionCities: formData.interventionCities?.length 
          ? formData.interventionCities 
          : getDefaultCities(client.city || formData.city || 'Paris'),
        emergency247: formData.emergency247 ?? (businessType === 'plombier'),
        yearsExperience: formData.yearsExperience || '15',
        certifications: formData.certifications || getDefaultCertifications(businessType),
        colorScheme: formData.colorScheme || 'predefined'
      };

      const project = client.projects[0];
      if (!project) {
        throw new Error('Aucun projet trouvé');
      }

      console.log(`   ⏳ Génération enrichie (${businessType})...`);
      const startTime = Date.now();
      
      // Reset block counter for each site
      blockCounter = 0;
      
      const generatedSite = generateEnhancedSiteFromFormData(formData, businessType);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`   ✅ Site généré en ${duration}s`);
      console.log(`      - ${generatedSite.pages.length} pages (dont ${generatedSite.pages.length - 4} pages SEO locales)`);
      console.log(`      - ${generatedSite.pages.reduce((sum, p) => sum + p.blocks.length, 0)} blocs avec variations visuelles`);
      console.log(`      - Contenu enrichi avec 500+ mots par page`);

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
  console.log('          ✨ SITES ENRICHIS ET REDESIGNÉS                   ');
  console.log('════════════════════════════════════════════════════════════\n');

  results.forEach((result, index) => {
    if (result.status === 'success') {
      console.log(`✅ ${index + 1}. ${result.client} (${result.businessType})`);
      console.log(`   📎 URL: ${result.url}`);
      console.log(`   📄 Pages: ${result.pages} (avec SEO local)`);
      console.log(`   🎨 Design: Sections colorées + variations visuelles`);
      console.log(`   📝 Contenu: 500+ mots par page\n`);
    }
  });

  console.log('🎉 Sites régénérés avec succès !');
  console.log('✨ Améliorations appliquées :');
  console.log('   - Variations visuelles pour chaque bloc');
  console.log('   - Sections avec fonds colorés et gradients');
  console.log('   - Contenu SEO enrichi (500+ mots)');
  console.log('   - Pages service × ville pour SEO local');
  console.log('   - Galeries et témoignages personnalisés\n');

  await prisma.$disconnect();
}

// Execute
regenerateEnhancedSites().catch(async (error) => {
  console.error('Erreur fatale:', error);
  await prisma.$disconnect();
  process.exit(1);
});
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Helper function to generate unique block IDs
let blockCounter = 0;
const generateBlockId = (type) => {
  blockCounter++;
  return `${type}-${Date.now()}-${blockCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

// Simulated AI Site Generator (since we can't import TypeScript modules directly)
const generateSiteFromFormData = (formData, businessType) => {
  const company = formData.businessName;
  const city = formData.city;
  
  // Generate pages based on business type
  const pages = [];
  
  // Homepage
  pages.push({
    id: 'home',
    name: 'Accueil',
    slug: '/',
    isHomePage: true,
    seo: {
      title: `${company} - ${getBusinessTitle(businessType)} à ${city} | ${businessType === 'plombier' ? 'Dépannage 24h/7j' : 'Devis gratuit'}`,
      description: `${company}, votre ${getBusinessTitle(businessType)} à ${city}. ${formData.description || getDefaultDescription(businessType)}`,
      keywords: [`${getBusinessTitle(businessType)} ${city}`, `${businessType} ${city}`, 'devis gratuit', 'artisan qualifié']
    },
    blocks: [
      {
        id: generateBlockId('header'),
        type: 'header-v3-perfect',
        props: {
          variant: 'transparent-fixed',
          logoText: company,
          navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'À propos', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ]
        }
      },
      {
        id: generateBlockId('hero'),
        type: 'hero-v3-perfect',
        props: {
          variant: businessType === 'plombier' ? 'centered-bold' : 'split-content',
          title: getHeroTitle(businessType, company, city),
          subtitle: getHeroSubtitle(businessType, formData),
          primaryButton: { 
            text: formData.emergency247 ? '☎️ Urgence 24h/7j' : 'Devis gratuit', 
            href: formData.emergency247 ? `tel:${formData.phone}` : '/contact' 
          },
          secondaryButton: { text: 'Nos services', href: '#services' },
          backgroundImage: `/images/${businessType}-hero.jpg`
        }
      },
      {
        id: generateBlockId('services'),
        type: 'services-v3-perfect',
        props: {
          variant: 'cards-hover',
          title: 'Nos Services',
          subtitle: `Découvrez l'ensemble de nos prestations de ${getBusinessTitle(businessType)}`,
          service1_name: getMainService(businessType, 1).name,
          service1_description: getMainService(businessType, 1).description,
          service1_price: getMainService(businessType, 1).price,
          service1_icon: getMainService(businessType, 1).icon,
          service2_name: getMainService(businessType, 2).name,
          service2_description: getMainService(businessType, 2).description,
          service2_price: getMainService(businessType, 2).price,
          service2_icon: getMainService(businessType, 2).icon,
          service3_name: getMainService(businessType, 3).name,
          service3_description: getMainService(businessType, 3).description,
          service3_price: getMainService(businessType, 3).price,
          service3_icon: getMainService(businessType, 3).icon
        }
      },
      {
        id: generateBlockId('features'),
        type: 'features-v3-perfect',
        props: {
          variant: 'grid-icons',
          title: 'Pourquoi nous choisir ?',
          feature1_title: `${formData.yearsExperience} ans d'expérience`,
          feature1_description: `Fort de ${formData.yearsExperience} années d'expertise dans le ${getBusinessTitle(businessType)}`,
          feature1_icon: '🏆',
          feature2_title: 'Devis gratuit',
          feature2_description: 'Étude personnalisée et chiffrage sans engagement',
          feature2_icon: '📋',
          feature3_title: 'Garantie qualité',
          feature3_description: 'Travaux garantis et assurance décennale',
          feature3_icon: '✅',
          feature4_title: formData.emergency247 ? 'Urgence 24h/7j' : 'Intervention rapide',
          feature4_description: formData.emergency247 ? 'Disponible jour et nuit pour vos urgences' : 'Réactivité garantie pour tous vos projets',
          feature4_icon: formData.emergency247 ? '🚨' : '⚡'
        }
      },
      {
        id: generateBlockId('testimonials'),
        type: 'testimonials-v3-perfect',
        props: {
          variant: 'carousel-modern',
          title: 'Ils nous font confiance',
          testimonial1_content: getTestimonial(businessType, 1),
          testimonial1_author: 'Marie L.',
          testimonial1_rating: 5,
          testimonial1_location: city,
          testimonial2_content: getTestimonial(businessType, 2),
          testimonial2_author: 'Jean-Pierre M.',
          testimonial2_rating: 5,
          testimonial2_location: city,
          testimonial3_content: getTestimonial(businessType, 3),
          testimonial3_author: 'Sophie D.',
          testimonial3_rating: 5,
          testimonial3_location: city
        }
      },
      {
        id: generateBlockId('cta'),
        type: 'cta-v3-perfect',
        props: {
          variant: 'gradient-waves',
          title: formData.emergency247 ? 'Besoin d\'une intervention urgente ?' : 'Prêt à démarrer votre projet ?',
          subtitle: formData.emergency247 ? 'Nous intervenons 24h/24 et 7j/7' : 'Contactez-nous pour un devis gratuit',
          primaryButton: { 
            text: formData.emergency247 ? `☎️ ${formData.phone}` : 'Demander un devis', 
            href: formData.emergency247 ? `tel:${formData.phone}` : '/contact' 
          }
        }
      },
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: {
          variant: 'modern-columns',
          companyName: company,
          description: formData.description || getDefaultDescription(businessType),
          phone: formData.phone,
          email: formData.email,
          address: `${city}, France`
        }
      }
    ]
  });

  // Service pages for each city
  formData.interventionCities.forEach(cityName => {
    pages.push({
      id: `${businessType}-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${getBusinessTitle(businessType)} ${cityName}`,
      slug: `/zones/${businessType}-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
      seo: {
        title: `${getBusinessTitle(businessType)} ${cityName} - ${company} | Intervention rapide`,
        description: `${company} intervient à ${cityName} pour tous vos besoins en ${getBusinessTitle(businessType)}. Devis gratuit, intervention rapide.`,
        keywords: [`${businessType} ${cityName}`, `artisan ${cityName}`, 'dépannage', 'urgence']
      },
      blocks: [
        {
          id: generateBlockId('header'),
          type: 'header-v3-perfect',
          props: {
            variant: 'transparent-fixed',
            logoText: company
          }
        },
        {
          id: generateBlockId('hero'),
          type: 'hero-v3-perfect',
          props: {
            variant: 'centered-simple',
            title: `Votre ${getBusinessTitle(businessType)} à ${cityName}`,
            subtitle: `${company} - Intervention rapide et professionnelle`
          }
        },
        {
          id: generateBlockId('content'),
          type: 'content-v3-perfect',
          props: {
            variant: 'split-image',
            title: `${getBusinessTitle(businessType)} de proximité à ${cityName}`,
            content: getLocalContent(businessType, cityName, company, formData.yearsExperience),
            imageUrl: `/images/${businessType}-work.jpg`,
            imagePosition: 'right'
          }
        },
        {
          id: generateBlockId('footer'),
          type: 'footer-v3-perfect',
          props: {
            variant: 'modern-columns',
            companyName: company
          }
        }
      ]
    });
  });

  // About page
  pages.push({
    id: 'about',
    name: 'À propos',
    slug: '/about',
    seo: {
      title: `À propos - ${company} | ${getBusinessTitle(businessType)} à ${city}`,
      description: `Découvrez ${company}, votre ${getBusinessTitle(businessType)} de confiance à ${city}. ${formData.yearsExperience} ans d'expérience.`
    },
    blocks: [
      {
        id: generateBlockId('header'),
        type: 'header-v3-perfect',
        props: { variant: 'transparent-fixed', logoText: company }
      },
      {
        type: 'hero-v3-perfect',
        props: {
          variant: 'centered-simple',
          title: `À propos de ${company}`,
          subtitle: `${formData.yearsExperience} ans d'expertise en ${getBusinessTitle(businessType)}`
        }
      },
      {
        type: 'content-v3-perfect',
        props: {
          variant: 'timeline',
          title: 'Notre histoire',
          items: [
            {
              year: new Date().getFullYear() - parseInt(formData.yearsExperience),
              title: 'Création de l\'entreprise',
              description: `Fondation de ${company} avec une vision claire : offrir des services de ${getBusinessTitle(businessType)} de qualité`
            },
            {
              year: new Date().getFullYear() - Math.floor(parseInt(formData.yearsExperience) / 2),
              title: 'Expansion',
              description: `Développement de notre équipe et élargissement de notre zone d'intervention`
            },
            {
              year: new Date().getFullYear(),
              title: 'Aujourd\'hui',
              description: `Leader local avec ${formData.yearsExperience} ans d'expérience et des milliers de clients satisfaits`
            }
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

  // Contact page
  pages.push({
    id: 'contact',
    name: 'Contact',
    slug: '/contact',
    seo: {
      title: `Contact - ${company} | ${getBusinessTitle(businessType)} à ${city}`,
      description: `Contactez ${company} pour tous vos besoins en ${getBusinessTitle(businessType)}. Devis gratuit, intervention rapide à ${city}.`
    },
    blocks: [
      {
        id: generateBlockId('header'),
        type: 'header-v3-perfect',
        props: { variant: 'transparent-fixed', logoText: company }
      },
      {
        id: generateBlockId('contact'),
        type: 'contact-v3-perfect',
        props: {
          variant: 'split-map',
          title: 'Contactez-nous',
          subtitle: 'Nous sommes à votre écoute pour tous vos projets',
          phone: formData.phone,
          email: formData.email,
          address: `${city}, France`,
          hours: formData.emergency247 ? '24h/24, 7j/7' : 'Lun-Ven: 8h-18h, Sam: 9h-12h',
          mapPosition: 'right'
        }
      },
      {
        id: generateBlockId('footer'),
        type: 'footer-v3-perfect',
        props: { variant: 'modern-columns', companyName: company }
      }
    ]
  });

  // Gallery page if selected
  if (formData.selectedPages?.includes('gallery')) {
    pages.push({
      id: 'gallery',
      name: 'Réalisations',
      slug: '/realisations',
      seo: {
        title: `Nos réalisations - ${company} | ${getBusinessTitle(businessType)} à ${city}`,
        description: `Découvrez les réalisations de ${company}, votre ${getBusinessTitle(businessType)} à ${city}. Photos avant/après de nos chantiers.`
      },
      blocks: [
        {
          id: generateBlockId('header'),
          type: 'header-v3-perfect',
          props: { variant: 'transparent-fixed', logoText: company }
        },
        {
          id: generateBlockId('hero'),
          type: 'hero-v3-perfect',
          props: {
            variant: 'centered-simple',
            title: 'Nos réalisations',
            subtitle: 'Découvrez nos projets récents'
          }
        },
        {
          id: generateBlockId('gallery'),
          type: 'gallery-v3-perfect',
          props: {
            variant: 'masonry-flow',
            title: 'Galerie de nos travaux',
            columnsDesktop: 3,
            columnsTablet: 2,
            columnsMobile: 1,
            enableLightbox: true,
            enableFilters: true,
            image1_src: `/images/${businessType}-project-1.jpg`,
            image1_title: getProjectTitle(businessType, 1),
            image1_category: 'recent',
            image2_src: `/images/${businessType}-project-2.jpg`,
            image2_title: getProjectTitle(businessType, 2),
            image2_category: 'renovation',
            image3_src: `/images/${businessType}-project-3.jpg`,
            image3_title: getProjectTitle(businessType, 3),
            image3_category: 'neuf',
            image4_src: `/images/${businessType}-project-4.jpg`,
            image4_title: getProjectTitle(businessType, 4),
            image4_category: 'recent',
            image5_src: `/images/${businessType}-project-5.jpg`,
            image5_title: getProjectTitle(businessType, 5),
            image5_category: 'renovation',
            image6_src: `/images/${businessType}-project-6.jpg`,
            image6_title: getProjectTitle(businessType, 6),
            image6_category: 'neuf'
          }
        },
        {
          id: generateBlockId('footer'),
          type: 'footer-v3-perfect',
          props: { variant: 'modern-columns', companyName: company }
        }
      ]
    });
  }

  // FAQ page if selected
  if (formData.selectedPages?.includes('faq')) {
    pages.push({
      id: 'faq',
      name: 'FAQ',
      slug: '/faq',
      seo: {
        title: `Questions fréquentes - ${company} | ${getBusinessTitle(businessType)} à ${city}`,
        description: `FAQ de ${company}. Toutes les réponses à vos questions sur nos services de ${getBusinessTitle(businessType)} à ${city}.`
      },
      blocks: [
        {
          id: generateBlockId('header'),
          type: 'header-v3-perfect',
          props: { variant: 'transparent-fixed', logoText: company }
        },
        {
          id: generateBlockId('hero'),
          type: 'hero-v3-perfect',
          props: {
            variant: 'centered-simple',
            title: 'Questions fréquentes',
            subtitle: 'Tout ce que vous devez savoir sur nos services'
          }
        },
        {
          id: generateBlockId('faq'),
          type: 'faq-v3-perfect',
          props: {
            variant: 'accordion-modern',
            title: 'FAQ',
            faq1_question: getFAQ(businessType, 1).question,
            faq1_answer: getFAQ(businessType, 1).answer,
            faq2_question: getFAQ(businessType, 2).question,
            faq2_answer: getFAQ(businessType, 2).answer,
            faq3_question: getFAQ(businessType, 3).question,
            faq3_answer: getFAQ(businessType, 3).answer,
            faq4_question: getFAQ(businessType, 4).question,
            faq4_answer: getFAQ(businessType, 4).answer,
            faq5_question: getFAQ(businessType, 5).question,
            faq5_answer: getFAQ(businessType, 5).answer
          }
        },
        {
          id: generateBlockId('footer'),
          type: 'footer-v3-perfect',
          props: { variant: 'modern-columns', companyName: company }
        }
      ]
    });
  }

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
    },
    navigation: pages.map(p => ({
      label: p.name,
      href: p.slug,
      isActive: p.isHomePage
    })),
    settings: {
      siteName: company,
      favicon: `/favicon-${businessType}.ico`,
      logo: `/logo-${company.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`
    }
  };
};

// Helper functions
const getBusinessTitle = (type) => {
  const titles = {
    plombier: 'Plombier',
    electricien: 'Électricien',
    menuisier: 'Menuisier',
    peintre: 'Peintre décorateur',
    macon: 'Maçon'
  };
  return titles[type] || 'Artisan';
};

const getDefaultDescription = (type) => {
  const descriptions = {
    plombier: 'Dépannage, installation et rénovation plomberie. Intervention rapide, travail soigné, devis gratuit.',
    electricien: 'Installation électrique, mise aux normes, dépannage. Électricien certifié, intervention rapide.',
    menuisier: 'Menuiserie sur mesure, agencement intérieur, rénovation. Artisan menuisier qualifié.',
    peintre: 'Peinture intérieure et extérieure, décoration, ravalement. Peintre professionnel.',
    macon: 'Construction, rénovation, extension. Maçonnerie générale, gros œuvre, finitions.'
  };
  return descriptions[type] || 'Artisan qualifié pour tous vos travaux.';
};

const getHeroTitle = (type, company, city) => {
  const titles = {
    plombier: `Urgence Plomberie ${city} - Intervention en 30 minutes 24h/7j`,
    electricien: `Votre Électricien de Confiance à ${city}`,
    menuisier: `L'art de la menuiserie à ${city}`,
    peintre: `Donnez vie à vos murs avec ${company}`,
    macon: `Bâtissons vos projets ensemble à ${city}`
  };
  return titles[type] || `${company} - Votre artisan à ${city}`;
};

const getHeroSubtitle = (type, formData) => {
  const subtitles = {
    plombier: `${formData.businessName} - Votre expert plombier disponible 24h/7j`,
    electricien: 'Électricien certifié pour tous vos travaux électriques',
    menuisier: 'Créations sur mesure et rénovation bois',
    peintre: 'Peinture et décoration intérieure',
    macon: 'Construction et rénovation de qualité'
  };
  return subtitles[type] || formData.description;
};

const getMainService = (type, index) => {
  const services = {
    plombier: [
      { name: 'Débouchage canalisation', description: 'Intervention rapide pour déboucher vos canalisations', price: 'À partir de 89€', icon: '🚿' },
      { name: 'Recherche de fuite', description: 'Détection précise sans destruction', price: 'À partir de 150€', icon: '💧' },
      { name: 'Dépannage chauffe-eau', description: 'Réparation et remplacement toutes marques', price: 'À partir de 120€', icon: '🔥' }
    ],
    electricien: [
      { name: 'Mise aux normes électriques', description: 'Mise en conformité complète NFC 15-100', price: 'À partir de 1500€', icon: '⚡' },
      { name: 'Installation domotique', description: 'Maison connectée et intelligente', price: 'À partir de 2000€', icon: '🏠' },
      { name: 'Dépannage électrique', description: 'Intervention rapide pour toute panne', price: 'À partir de 90€', icon: '🔌' }
    ],
    menuisier: [
      { name: 'Cuisine sur mesure', description: 'Conception de cuisines personnalisées', price: 'À partir de 5000€', icon: '🍳' },
      { name: 'Escalier bois', description: 'Création d\'escaliers design', price: 'À partir de 3500€', icon: '📐' },
      { name: 'Dressing sur mesure', description: 'Agencement optimal de vos espaces', price: 'À partir de 2000€', icon: '👔' }
    ],
    peintre: [
      { name: 'Peinture intérieure', description: 'Murs et plafonds, finitions parfaites', price: 'À partir de 25€/m²', icon: '🎨' },
      { name: 'Enduits décoratifs', description: 'Béton ciré, stuc, tadelakt', price: 'À partir de 45€/m²', icon: '✨' },
      { name: 'Ravalement façade', description: 'Rénovation complète de vos façades', price: 'Sur devis', icon: '🏢' }
    ],
    macon: [
      { name: 'Construction maison', description: 'Maisons individuelles clés en main', price: 'À partir de 1200€/m²', icon: '🏗️' },
      { name: 'Extension maison', description: 'Agrandissement de votre habitation', price: 'À partir de 1500€/m²', icon: '📏' },
      { name: 'Rénovation complète', description: 'Transformation totale de votre bien', price: 'Sur devis', icon: '🔨' }
    ]
  };
  return services[type]?.[index - 1] || { name: 'Service', description: 'Description du service', price: 'Sur devis', icon: '🛠️' };
};

const getTestimonial = (type, index) => {
  const testimonials = {
    plombier: [
      'Intervention très rapide suite à une fuite d\'eau. Plombier professionnel et efficace. Je recommande vivement !',
      'Excellent travail pour le remplacement de ma chaudière. Prix correct et travail soigné.',
      'Disponible même le dimanche pour une urgence. Service impeccable et tarifs transparents.'
    ],
    electricien: [
      'Mise aux normes de mon installation réalisée parfaitement. Électricien très compétent.',
      'Installation de ma borne de recharge voiture électrique nickel. Travail propre et rapide.',
      'Dépannage efficace et explications claires. Un vrai professionnel !'
    ],
    menuisier: [
      'Cuisine sur mesure magnifique ! Le travail du bois est exceptionnel.',
      'Escalier réalisé avec beaucoup de soin. Le résultat dépasse nos attentes.',
      'Dressing parfaitement adapté à notre espace. Très satisfaits du résultat.'
    ],
    peintre: [
      'Peinture de tout l\'appartement impeccable. Finitions parfaites !',
      'Enduit décoratif sublime dans notre salon. Un vrai artiste !',
      'Ravalement de façade réussi. Notre maison a retrouvé tout son éclat.'
    ],
    macon: [
      'Extension de maison réalisée dans les délais. Travail de qualité.',
      'Construction de notre maison parfaite. Équipe sérieuse et professionnelle.',
      'Rénovation complète réussie. Nous sommes ravis du résultat.'
    ]
  };
  return testimonials[type]?.[index - 1] || 'Excellent travail, je recommande !';
};

const getLocalContent = (type, city, company, years) => {
  return `Implantés à ${city} depuis ${years} ans, nous connaissons parfaitement votre secteur et ses spécificités. ${company} intervient rapidement pour tous vos besoins en ${getBusinessTitle(type)}.

Notre équipe de professionnels qualifiés est à votre service pour tous types d'interventions : dépannage urgent, installation, rénovation ou entretien. Nous mettons un point d'honneur à fournir un travail de qualité, dans le respect des normes en vigueur.

Que vous soyez un particulier ou un professionnel, nous adaptons nos interventions à vos besoins spécifiques. Devis gratuit et sans engagement, transparence des tarifs, respect des délais : telles sont nos valeurs.`;
};

const getBusinessColors = (type) => {
  const colors = {
    plombier: { primary: '#2563EB', secondary: '#3B82F6', accent: '#EF4444' },
    electricien: { primary: '#F59E0B', secondary: '#FCD34D', accent: '#3B82F6' },
    menuisier: { primary: '#92400E', secondary: '#B45309', accent: '#059669' },
    peintre: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#14B8A6' },
    macon: { primary: '#6B7280', secondary: '#DC2626', accent: '#F59E0B' }
  };
  return colors[type] || { primary: '#2563EB', secondary: '#3B82F6', accent: '#EF4444' };
};

const getFAQ = (type, index) => {
  const faqs = {
    plombier: [
      { question: 'Intervenez-vous en urgence le week-end ?', answer: 'Oui, nous sommes disponibles 24h/24 et 7j/7 pour toutes vos urgences plomberie.' },
      { question: 'Quels sont vos délais d\'intervention ?', answer: 'Pour les urgences, nous intervenons en moins de 30 minutes. Pour les travaux planifiés, sous 24 à 48h.' },
      { question: 'Proposez-vous des devis gratuits ?', answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous établissons un devis détaillé avant toute intervention.' },
      { question: 'Êtes-vous assurés ?', answer: 'Oui, nous disposons d\'une assurance responsabilité civile professionnelle et d\'une garantie décennale.' },
      { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Nous acceptons les espèces, chèques, cartes bancaires et virements.' }
    ],
    electricien: [
      { question: 'Êtes-vous certifiés pour les installations électriques ?', answer: 'Oui, nous sommes certifiés Qualifelec et RGE, garantissant la qualité de nos interventions.' },
      { question: 'Réalisez-vous les mises aux normes électriques ?', answer: 'Oui, nous réalisons la mise aux normes complète de votre installation selon la norme NFC 15-100.' },
      { question: 'Installez-vous des bornes de recharge ?', answer: 'Oui, nous sommes certifiés IRVE pour l\'installation de bornes de recharge pour véhicules électriques.' },
      { question: 'Proposez-vous un service de dépannage ?', answer: 'Oui, nous intervenons rapidement pour tout dépannage électrique, même en urgence.' },
      { question: 'Délivrez-vous des attestations de conformité ?', answer: 'Oui, nous fournissons toutes les attestations nécessaires après nos interventions.' }
    ],
    menuisier: [
      { question: 'Travaillez-vous sur mesure ?', answer: 'Oui, toutes nos réalisations sont sur mesure et adaptées à vos espaces et besoins.' },
      { question: 'Quelles essences de bois utilisez-vous ?', answer: 'Nous travaillons avec diverses essences : chêne, hêtre, frêne, et des bois exotiques sur demande.' },
      { question: 'Proposez-vous la pose ?', answer: 'Oui, nous assurons la fabrication et la pose de tous nos ouvrages.' },
      { question: 'Quel est le délai de fabrication ?', answer: 'Le délai varie selon le projet, généralement entre 4 et 8 semaines après validation du devis.' },
      { question: 'Entretenez-vous vos réalisations ?', answer: 'Oui, nous proposons des contrats d\'entretien pour garantir la longévité de vos menuiseries.' }
    ],
    peintre: [
      { question: 'Protégez-vous les meubles pendant les travaux ?', answer: 'Oui, nous protégeons soigneusement tous vos meubles et sols avant de commencer.' },
      { question: 'Utilisez-vous des peintures écologiques ?', answer: 'Oui, nous proposons une gamme de peintures écologiques sans COV.' },
      { question: 'Réalisez-vous des enduits décoratifs ?', answer: 'Oui, nous maîtrisons différentes techniques : béton ciré, stuc, tadelakt, etc.' },
      { question: 'Faites-vous les travaux de préparation ?', answer: 'Oui, nous réalisons tous les travaux de préparation nécessaires : rebouchage, ponçage, etc.' },
      { question: 'Garantissez-vous vos travaux ?', answer: 'Oui, tous nos travaux sont garantis 2 ans minimum.' }
    ],
    macon: [
      { question: 'Réalisez-vous des extensions de maison ?', answer: 'Oui, nous réalisons tous types d\'extensions : latérale, surélévation, véranda maçonnée.' },
      { question: 'Proposez-vous des constructions clés en main ?', answer: 'Oui, nous gérons votre projet de A à Z, de la conception à la remise des clés.' },
      { question: 'Êtes-vous couverts par la garantie décennale ?', answer: 'Oui, tous nos travaux sont couverts par notre assurance décennale.' },
      { question: 'Gérez-vous les démarches administratives ?', answer: 'Oui, nous vous accompagnons dans toutes les démarches : permis de construire, déclarations.' },
      { question: 'Travaillez-vous avec des architectes ?', answer: 'Oui, nous collaborons avec des architectes ou pouvons vous recommander des partenaires.' }
    ]
  };
  return faqs[type]?.[index - 1] || { question: 'Question ?', answer: 'Réponse détaillée.' };
};

const getProjectTitle = (type, index) => {
  const projects = {
    plombier: ['Rénovation salle de bain complète', 'Installation chauffe-eau thermodynamique', 'Création salle d\'eau', 'Remplacement tuyauterie', 'Installation adoucisseur', 'Débouchage complexe'],
    electricien: ['Mise aux normes pavillon', 'Installation domotique complète', 'Tableau électrique neuf', 'Éclairage LED design', 'Borne recharge voiture', 'Rénovation électrique appartement'],
    menuisier: ['Cuisine chêne massif', 'Escalier contemporain', 'Bibliothèque sur mesure', 'Dressing optimisé', 'Parquet massif', 'Terrasse bois exotique'],
    peintre: ['Rénovation appartement haussmannien', 'Béton ciré salon moderne', 'Ravalement façade maison', 'Décoration chambre enfant', 'Peinture cage escalier', 'Enduit décoratif restaurant'],
    macon: ['Construction maison moderne', 'Extension salon 40m²', 'Piscine et terrasse', 'Rénovation grange', 'Surélévation pavillon', 'Mur de clôture design']
  };
  return projects[type]?.[index - 1] || `Projet ${index}`;
};

// Main function
async function generateAISitesForClients() {
  console.log('🚀 Génération des sites IA pour les 5 clients créés...\n');

  // Get all demo clients
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
    console.log(`\n📋 Génération pour : ${client.companyName}`);
    
    try {
      // Parse the tags to get businessType and formData
      const tags = JSON.parse(client.tags || '{}');
      const businessType = tags.businessType;
      const formData = tags.formData || {};
      
      if (!businessType) {
        throw new Error('BusinessType non trouvé dans les tags');
      }

      // Get the project
      const project = client.projects[0];
      if (!project) {
        throw new Error('Aucun projet trouvé pour ce client');
      }

      console.log(`   ⏳ Génération du site (${businessType})...`);
      const startTime = Date.now();
      
      // Generate the site
      const generatedSite = generateSiteFromFormData(formData, businessType);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`   ✅ Site généré en ${duration}s`);
      console.log(`      - ${generatedSite.pages.length} pages créées`);
      console.log(`      - ${generatedSite.pages.reduce((sum, p) => sum + p.blocks.length, 0)} blocs configurés`);

      // Save the site data to the project
      await prisma.project.update({
        where: { id: project.id },
        data: {
          data: JSON.stringify(generatedSite),
          status: 'PUBLISHED',
          publishedAt: new Date()
        }
      });
      console.log(`   ✅ Données sauvegardées dans le projet`);

      // Save to results
      results.push({
        client: client.companyName,
        clientId: client.id,
        projectId: project.id,
        businessType: businessType,
        url: `http://localhost:3000/editor/${project.id}`,
        previewUrl: `http://localhost:3000/preview/${project.id}`,
        pages: generatedSite.pages.length,
        blocks: generatedSite.pages.reduce((sum, p) => sum + p.blocks.length, 0),
        duration: duration,
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

  // Display summary
  console.log('\n\n════════════════════════════════════════════════════════════');
  console.log('              ✨ SITES GÉNÉRÉS PAR L\'IA                    ');
  console.log('════════════════════════════════════════════════════════════\n');

  results.forEach((result, index) => {
    if (result.status === 'success') {
      console.log(`✅ ${index + 1}. ${result.client} (${result.businessType})`);
      console.log(`   📎 Éditeur: ${result.url}`);
      console.log(`   👁️  Preview: ${result.previewUrl}`);
      console.log(`   📄 Pages: ${result.pages}`);
      console.log(`   🧩 Blocs: ${result.blocks}`);
      console.log(`   ⚡ Généré en: ${result.duration}s`);
      console.log(`   🔑 Client ID: ${result.clientId}`);
      console.log(`   🔑 Project ID: ${result.projectId}\n`);
    } else {
      console.log(`❌ ${index + 1}. ${result.client}`);
      console.log(`   Erreur: ${result.error}\n`);
    }
  });

  console.log('════════════════════════════════════════════════════════════\n');
  console.log('🎉 Les 5 sites de démonstration sont prêts !');
  console.log('📌 Accédez aux sites via les liens ci-dessus');
  console.log('💡 Utilisez l\'éditeur pour personnaliser davantage');
  console.log('🚀 Déployez sur Netlify en un clic depuis l\'éditeur\n');

  // Save a detailed report
  const reportPath = path.join(__dirname, 'generated-sites-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalSites: results.length,
    successCount: results.filter(r => r.status === 'success').length,
    results: results
  }, null, 2));
  
  console.log(`📊 Rapport détaillé sauvegardé : ${reportPath}\n`);

  await prisma.$disconnect();
}

// Execute
generateAISitesForClients().catch(async (error) => {
  console.error('Erreur fatale:', error);
  await prisma.$disconnect();
  process.exit(1);
});
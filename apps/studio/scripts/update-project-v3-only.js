const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// ID du projet à mettre à jour
const PROJECT_ID = 'cmd0qet6w0001j10tkkyd3t0o';

async function updateProjectWithV3Blocks() {
  console.log('🚀 Mise à jour du projet avec TOUS les blocs V3 PERFECT...\n');

  // Préparer TOUS les blocs V3 PERFECT uniquement
  const allV3Blocks = [
    // Hero V3 Perfect
    {
      id: 'hero-v3-' + Date.now(),
      type: 'HeroV3Perfect',
      data: {
        title: 'Démonstration Blocs V3 Perfect',
        subtitle: 'Architecture V3 moderne et performante',
        primaryButton: { text: 'Découvrir', href: '#features' },
        secondaryButton: { text: 'Contact', href: '#contact' },
        image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1920&h=1080&fit=crop',
        variant: 'split',
        alignment: 'left'
      }
    },
    // Features V3 Perfect
    {
      id: 'features-v3-' + Date.now() + 1,
      type: 'FeaturesV3Perfect',
      data: {
        title: 'Features V3 Perfect',
        subtitle: 'Fonctionnalités nouvelle génération',
        features: [
          {
            id: '1',
            title: 'Performance V3',
            description: 'Rendu optimisé avec la nouvelle architecture',
            icon: 'zap',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
          },
          {
            id: '2',
            title: 'SEO Perfect',
            description: 'Optimisation maximale pour les moteurs de recherche',
            icon: 'search',
            image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=400&h=300&fit=crop'
          },
          {
            id: '3',
            title: 'Responsive V3',
            description: 'Adaptation parfaite sur tous les appareils',
            icon: 'smartphone',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
          }
        ],
        variant: 'grid',
        showImages: true
      }
    },
    // Services V3 Perfect
    {
      id: 'services-v3-' + Date.now() + 2,
      type: 'ServicesV3Perfect',
      data: {
        title: 'Services V3 Perfect',
        subtitle: 'Solutions professionnelles complètes',
        services: [
          {
            id: '1',
            title: 'Développement V3',
            description: 'Sites web avec architecture V3 moderne',
            icon: 'code',
            features: ['React V3', 'Next.js 14', 'TypeScript', 'Tailwind CSS'],
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop',
            price: '2500€'
          },
          {
            id: '2',
            title: 'Design V3',
            description: 'Interfaces utilisateur nouvelle génération',
            icon: 'palette',
            features: ['UI/UX V3', 'Design System', 'Prototypes', 'Animations'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
            price: '1800€'
          }
        ],
        variant: 'cards',
        showPrices: true
      }
    },
    // Gallery V3 Perfect
    {
      id: 'gallery-v3-' + Date.now() + 3,
      type: 'GalleryV3Perfect',
      data: {
        title: 'Gallery V3 Perfect',
        subtitle: 'Portfolio avec système V3',
        images: [
          {
            id: '1',
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            alt: 'Projet V3 - E-commerce',
            title: 'E-commerce V3',
            category: 'Web V3'
          },
          {
            id: '2',
            src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
            alt: 'Projet V3 - Dashboard',
            title: 'Dashboard V3',
            category: 'App V3'
          },
          {
            id: '3',
            src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
            alt: 'Projet V3 - Corporate',
            title: 'Site Corporate V3',
            category: 'Corporate'
          },
          {
            id: '4',
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
            alt: 'Projet V3 - Blog',
            title: 'Blog V3',
            category: 'Blog'
          }
        ],
        layout: 'grid',
        columns: 2,
        showFilters: true
      }
    },
    // Content V3 Perfect
    {
      id: 'content-v3-' + Date.now() + 4,
      type: 'ContentV3Perfect',
      data: {
        title: 'Content V3 Perfect',
        content: {
          type: 'richtext',
          text: 'Le système V3 Perfect représente une nouvelle génération d\'architecture pour la création de sites web. Avec des performances optimisées, un rendu côté serveur amélioré et une expérience utilisateur exceptionnelle, V3 Perfect est la solution idéale pour les projets modernes.',
          features: [
            'Architecture modulaire V3',
            'Performances optimisées',
            'SEO avancé intégré',
            'Responsive design parfait'
          ]
        },
        variant: 'split',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        imagePosition: 'right'
      }
    },
    // Testimonials V3 Perfect
    {
      id: 'testimonials-v3-' + Date.now() + 5,
      type: 'TestimonialsV3Perfect',
      data: {
        title: 'Testimonials V3 Perfect',
        subtitle: 'Avis sur l\'architecture V3',
        testimonials: [
          {
            id: '1',
            name: 'Sophie Martin',
            role: 'CEO, TechStart',
            content: 'L\'architecture V3 a transformé notre site. Les performances sont incroyables !',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
            verified: true
          },
          {
            id: '2',
            name: 'Thomas Dubois',
            role: 'CTO, WebAgency',
            content: 'V3 Perfect est vraiment une révolution. Le code est propre et maintenable.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
            verified: true
          },
          {
            id: '3',
            name: 'Marie Bernard',
            role: 'Designer',
            content: 'L\'intégration avec V3 est un plaisir. Tout est modulaire et flexible.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
            verified: true
          }
        ],
        layout: 'grid',
        columns: 3,
        showRating: true
      }
    },
    // Pricing V3 Perfect
    {
      id: 'pricing-v3-' + Date.now() + 6,
      type: 'PricingV3Perfect',
      data: {
        title: 'Pricing V3 Perfect',
        subtitle: 'Tarifs pour l\'architecture V3',
        plans: [
          {
            id: '1',
            name: 'V3 Starter',
            price: '49',
            period: 'mois',
            description: 'Pour débuter avec V3',
            features: [
              'Architecture V3 de base',
              'Support email',
              'Mises à jour V3',
              'Documentation'
            ],
            highlighted: false,
            ctaText: 'Commencer',
            ctaHref: '#contact'
          },
          {
            id: '2',
            name: 'V3 Pro',
            price: '99',
            period: 'mois',
            description: 'V3 complet pour pros',
            features: [
              'Architecture V3 complète',
              'Support prioritaire',
              'Modules V3 avancés',
              'API V3 complète',
              'Formations V3'
            ],
            highlighted: true,
            badge: 'Populaire',
            ctaText: 'Essayer V3 Pro',
            ctaHref: '#contact'
          },
          {
            id: '3',
            name: 'V3 Enterprise',
            price: '299',
            period: 'mois',
            description: 'V3 sur mesure',
            features: [
              'V3 personnalisé',
              'Support 24/7',
              'Infrastructure dédiée',
              'Modules custom V3',
              'Équipe dédiée'
            ],
            highlighted: false,
            ctaText: 'Contact',
            ctaHref: '#contact'
          }
        ],
        variant: 'cards',
        showBadge: true
      }
    },
    // FAQ V3 Perfect
    {
      id: 'faq-v3-' + Date.now() + 7,
      type: 'FAQV3Perfect',
      data: {
        title: 'FAQ V3 Perfect',
        subtitle: 'Questions sur l\'architecture V3',
        faqs: [
          {
            id: '1',
            question: 'Qu\'est-ce que V3 Perfect ?',
            answer: 'V3 Perfect est notre nouvelle architecture de développement web, optimisée pour les performances et la maintenabilité. Elle utilise les dernières technologies React/Next.js.'
          },
          {
            id: '2',
            question: 'Pourquoi choisir V3 ?',
            answer: 'V3 offre des performances 3x supérieures, un SEO optimisé, une architecture modulaire et une expérience développeur exceptionnelle.'
          },
          {
            id: '3',
            question: 'Comment migrer vers V3 ?',
            answer: 'La migration est progressive. Nous fournissons des outils et une documentation complète pour faciliter la transition de vos projets existants.'
          },
          {
            id: '4',
            question: 'V3 est-il compatible avec mes outils ?',
            answer: 'Oui, V3 est compatible avec l\'écosystème React/Next.js standard. Tous vos outils et bibliothèques fonctionneront parfaitement.'
          }
        ],
        variant: 'accordion',
        icon: 'chevron'
      }
    },
    // CTA V3 Perfect
    {
      id: 'cta-v3-' + Date.now() + 8,
      type: 'CTAV3Perfect',
      data: {
        title: 'Prêt pour V3 Perfect ?',
        subtitle: 'Adoptez la nouvelle génération d\'architecture web',
        primaryButton: {
          text: 'Démarrer avec V3',
          href: '#contact'
        },
        secondaryButton: {
          text: 'Documentation V3',
          href: '#docs'
        },
        variant: 'centered',
        background: 'gradient',
        pattern: 'dots'
      }
    },
    // Contact V3 Perfect
    {
      id: 'contact-v3-' + Date.now() + 9,
      type: 'ContactV3Perfect',
      data: {
        title: 'Contact V3 Perfect',
        subtitle: 'Discutons de votre projet V3',
        email: 'v3@perfect-demo.com',
        phone: '+33 1 23 45 67 89',
        address: '123 Rue de la Tech, 75001 Paris',
        hours: {
          weekdays: '9h - 18h',
          saturday: '10h - 16h',
          sunday: 'Fermé'
        },
        form: {
          fields: [
            { name: 'name', label: 'Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Téléphone', type: 'tel' },
            { name: 'subject', label: 'Sujet', type: 'text', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ],
          submitText: 'Envoyer',
          successMessage: 'Message envoyé avec succès !'
        },
        showMap: true,
        variant: 'split'
      }
    }
  ];

  // Données complètes du projet
  const updateData = {
    businessInfo: {
      name: 'V3 Perfect Demo',
      email: 'contact@v3-perfect.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue de la Tech, 75001 Paris',
      website: 'https://v3-perfect.com',
      description: 'Démonstration de l\'architecture V3 Perfect'
    },
    theme: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#10B981',
        text: '#111827',
        background: '#FFFFFF',
        dark: '#1F2937'
      },
      fonts: {
        primary: 'Inter, sans-serif',
        secondary: 'Poppins, sans-serif'
      }
    },
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        title: 'V3 Perfect - Nouvelle Architecture Web',
        description: 'Découvrez tous les blocs V3 Perfect en action',
        path: '/',
        blocks: allV3Blocks
      }
    ]
  };

  console.log('📝 Mise à jour du projet avec les blocs V3...');
  console.log('📋 Blocs V3 inclus:');
  allV3Blocks.forEach((block, index) => {
    console.log(`   ${index + 1}. ${block.type}`);
  });

  const updateResponse = await fetch(`${API_BASE_URL}/projects/${PROJECT_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: updateData })
  });

  if (!updateResponse.ok) {
    const error = await updateResponse.text();
    throw new Error(`Erreur mise à jour: ${error}`);
  }

  console.log('\n✅ Projet mis à jour avec succès !');
  console.log('\n🎉 PROJET V3 PERFECT COMPLET !');
  console.log('📋 ID du projet:', PROJECT_ID);
  console.log('🔗 URL locale: http://localhost:3000/projects/' + PROJECT_ID);
  console.log(`\n✨ Total: ${allV3Blocks.length} blocs V3 Perfect !`);
  console.log('\n🚀 Le projet est prêt pour le déploiement Netlify !');

  return PROJECT_ID;
}

// Lancer le script
updateProjectWithV3Blocks()
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Erreur:', error.message);
    process.exit(1);
  });
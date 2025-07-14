const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function createCompleteV3Project() {
  console.log('🚀 Création d\'un projet complet avec TOUS les blocs V3...\n');

  // 1. D'abord créer le projet de base
  const projectData = {
    name: 'DEMO V3 - Tous les Blocs',
    description: 'Démonstration complète de tous les blocs V3',
    clientId: 'demo-v3-complete',
    template: 'plumber'
  };

  console.log('📦 Création du projet...');
  const createResponse = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });

  if (!createResponse.ok) {
    const error = await createResponse.text();
    throw new Error(`Erreur création: ${error}`);
  }

  const project = await createResponse.json();
  console.log('✅ Projet créé:', project.id);

  // 2. Préparer TOUS les blocs V3
  const allV3Blocks = [
    // Hero V3
    {
      id: 'hero-v3-demo',
      type: 'HeroV3Perfect',
      data: {
        title: 'Démonstration Complète V3',
        subtitle: 'Tous les nouveaux blocs ultra-modernes en action',
        primaryButton: { text: 'Commencer', href: '#features' },
        secondaryButton: { text: 'En savoir plus', href: '#services' },
        image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1920&h=1080&fit=crop',
        variant: 'gradient',
        alignment: 'center'
      }
    },
    // Features V3
    {
      id: 'features-v3-demo',
      type: 'FeaturesV3Perfect',
      data: {
        title: 'Fonctionnalités V3',
        subtitle: 'Design moderne et performances optimales',
        features: [
          {
            id: '1',
            title: 'Ultra Rapide',
            description: 'Performance maximale avec Next.js',
            icon: 'zap',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
          },
          {
            id: '2',
            title: 'SEO Optimisé',
            description: 'Visibilité maximale sur Google',
            icon: 'search',
            image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=400&h=300&fit=crop'
          },
          {
            id: '3',
            title: 'Responsive',
            description: 'Parfait sur tous les écrans',
            icon: 'smartphone',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
          },
          {
            id: '4',
            title: 'Sécurisé',
            description: 'Protection maximale HTTPS',
            icon: 'shield',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
          }
        ],
        variant: 'grid',
        showImages: true
      }
    },
    // Services V3
    {
      id: 'services-v3-demo',
      type: 'ServicesV3Perfect',
      data: {
        title: 'Services Premium V3',
        subtitle: 'Solutions complètes pour votre business',
        services: [
          {
            id: '1',
            title: 'Site Vitrine Premium',
            description: 'Site web professionnel avec design sur mesure',
            icon: 'globe',
            features: ['Design personnalisé', 'SEO optimisé', 'Analytics', 'Support 24/7'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            price: '2500€'
          },
          {
            id: '2',
            title: 'E-Commerce Complet',
            description: 'Boutique en ligne clé en main',
            icon: 'shopping-cart',
            features: ['Catalogue produits', 'Paiement sécurisé', 'Gestion stocks', 'Tableau de bord'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
            price: '4500€'
          },
          {
            id: '3',
            title: 'Application Web',
            description: 'Application sur mesure pour votre métier',
            icon: 'code',
            features: ['React/Next.js', 'Base de données', 'API REST', 'Déploiement cloud'],
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop',
            price: 'Sur devis'
          }
        ],
        variant: 'cards',
        showPrices: true
      }
    },
    // Pricing Ultra-Modern
    {
      id: 'pricing-ultra-demo',
      type: 'PricingUltraModern',
      data: {
        title: 'Tarifs Transparents',
        subtitle: 'Choisissez la formule adaptée à vos besoins',
        plans: [
          {
            id: '1',
            name: 'Starter',
            price: '29',
            period: 'mois',
            description: 'Idéal pour débuter',
            features: [
              '1 site web',
              'Hébergement inclus',
              'SSL gratuit',
              'Support email'
            ],
            highlighted: false,
            ctaText: 'Commencer',
            ctaHref: '#contact'
          },
          {
            id: '2',
            name: 'Pro',
            price: '79',
            period: 'mois',
            description: 'Pour les professionnels',
            features: [
              '5 sites web',
              'Hébergement premium',
              'SSL gratuit',
              'Support prioritaire',
              'Analytics avancés',
              'CMS intégré'
            ],
            highlighted: true,
            badge: 'Populaire',
            ctaText: 'Essai gratuit',
            ctaHref: '#contact'
          },
          {
            id: '3',
            name: 'Enterprise',
            price: '299',
            period: 'mois',
            description: 'Solutions sur mesure',
            features: [
              'Sites illimités',
              'Infrastructure dédiée',
              'SSL EV',
              'Support 24/7',
              'Analytics complets',
              'API personnalisée',
              'Formation équipe'
            ],
            highlighted: false,
            ctaText: 'Contactez-nous',
            ctaHref: '#contact'
          }
        ],
        variant: 'gradient'
      }
    },
    // Reviews Ultra-Modern
    {
      id: 'reviews-ultra-demo',
      type: 'ReviewsUltraModern',
      data: {
        title: 'Avis Clients',
        subtitle: 'Ils nous font confiance',
        variant: 'cards',
        reviews: [
          {
            id: '1',
            author: 'Marie Dupont',
            role: 'CEO, TechStart',
            content: 'Service exceptionnel ! Notre site est magnifique et très performant.',
            rating: 5,
            date: '2024-12-15',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
          },
          {
            id: '2',
            author: 'Jean Martin',
            role: 'Directeur Marketing',
            content: 'Très satisfait du résultat. Le SEO a boosté notre visibilité.',
            rating: 5,
            date: '2024-12-20',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
          },
          {
            id: '3',
            author: 'Sophie Bernard',
            role: 'Fondatrice, CreativeHub',
            content: 'Un travail professionnel et un support réactif. Je recommande !',
            rating: 5,
            date: '2024-12-25',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
          }
        ]
      }
    },
    // Gallery Ultra-Modern
    {
      id: 'gallery-ultra-demo',
      type: 'GalleryUltraModern',
      data: {
        title: 'Portfolio',
        subtitle: 'Nos dernières réalisations',
        images: [
          {
            id: '1',
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            alt: 'Site E-commerce Mode',
            title: 'Boutique Fashion',
            category: 'E-commerce'
          },
          {
            id: '2',
            src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
            alt: 'Application SaaS',
            title: 'Dashboard Analytics',
            category: 'Application'
          },
          {
            id: '3',
            src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
            alt: 'Site Corporate',
            title: 'Site Institutionnel',
            category: 'Corporate'
          },
          {
            id: '4',
            src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
            alt: 'Landing Page',
            title: 'Page de Vente',
            category: 'Marketing'
          },
          {
            id: '5',
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
            alt: 'Blog Tech',
            title: 'Magazine Digital',
            category: 'Blog'
          },
          {
            id: '6',
            src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
            alt: 'Portfolio Designer',
            title: 'Portfolio Créatif',
            category: 'Portfolio'
          }
        ],
        layout: 'masonry',
        showFilters: true,
        lightbox: true,
        lightboxStyle: 'modern'
      }
    },
    // Testimonials Ultra-Modern
    {
      id: 'testimonials-ultra-demo',
      type: 'TestimonialsUltraModern',
      data: {
        title: 'Témoignages',
        subtitle: 'Ce que disent nos clients',
        testimonials: [
          {
            id: '1',
            name: 'Pierre Durand',
            role: 'CEO, InnoTech',
            content: 'Une équipe professionnelle qui a dépassé nos attentes. Le site est parfait !',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
            verified: true,
            featured: true
          },
          {
            id: '2',
            name: 'Céline Moreau',
            role: 'Marketing Manager',
            content: 'Excellent travail ! Notre trafic a augmenté de 200% en 3 mois.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
            verified: true
          },
          {
            id: '3',
            name: 'Marc Leblanc',
            role: 'Entrepreneur',
            content: 'Service rapide et efficace. Le design est moderne et attractif.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
            verified: true
          },
          {
            id: '4',
            name: 'Julie Petit',
            role: 'Directrice Artistique',
            content: 'Un vrai plaisir de travailler avec cette équipe créative !',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
            verified: true
          }
        ],
        layout: 'carousel-3d',
        showRating: true,
        autoplay: true
      }
    },
    // FAQ V3
    {
      id: 'faq-v3-demo',
      type: 'FAQV3Perfect',
      data: {
        title: 'Questions Fréquentes',
        subtitle: 'Tout ce que vous devez savoir',
        faqs: [
          {
            id: '1',
            question: 'Combien de temps pour créer un site ?',
            answer: 'En général, comptez 2 à 4 semaines pour un site vitrine et 1 à 3 mois pour un e-commerce ou une application complexe.'
          },
          {
            id: '2',
            question: 'Quels sont vos tarifs ?',
            answer: 'Nos tarifs dépendent de la complexité du projet. Un site vitrine démarre à 1500€, un e-commerce à 3000€. Devis gratuit sur demande.'
          },
          {
            id: '3',
            question: 'Proposez-vous la maintenance ?',
            answer: 'Oui, nous proposons des contrats de maintenance mensuels incluant mises à jour, sauvegardes, support technique et évolutions.'
          },
          {
            id: '4',
            question: 'Mon site sera-t-il responsive ?',
            answer: 'Absolument ! Tous nos sites sont responsive design, optimisés pour desktop, tablette et mobile.'
          },
          {
            id: '5',
            question: 'Puis-je modifier mon site moi-même ?',
            answer: 'Oui, nous intégrons un CMS (système de gestion de contenu) qui vous permet de modifier facilement textes, images et contenus.'
          }
        ],
        variant: 'modern'
      }
    },
    // Content Ultra-Modern
    {
      id: 'content-ultra-demo',
      type: 'ContentUltraModern',
      data: {
        title: 'Notre Histoire',
        content: {
          type: 'story',
          items: [
            {
              year: '2020',
              title: 'Création de l\'agence',
              description: 'Lancement avec une équipe de 3 passionnés du web.'
            },
            {
              year: '2021',
              title: 'Première grande réussite',
              description: '50 sites créés et 100% de clients satisfaits.'
            },
            {
              year: '2022',
              title: 'Expansion',
              description: 'Ouverture d\'un nouveau bureau et équipe de 10 personnes.'
            },
            {
              year: '2023',
              title: 'Innovation',
              description: 'Lancement de notre propre CMS et solutions e-commerce.'
            },
            {
              year: '2024',
              title: 'Leader régional',
              description: 'Plus de 500 projets réalisés, référence dans la région.'
            }
          ]
        },
        variant: 'timeline',
        showImages: true
      }
    },
    // CTA Ultra-Modern
    {
      id: 'cta-ultra-demo',
      type: 'CTAUltraModern',
      data: {
        title: 'Prêt à transformer votre présence en ligne ?',
        subtitle: 'Contactez-nous dès maintenant pour un devis gratuit',
        primaryButton: {
          text: 'Demander un devis',
          href: '#contact'
        },
        secondaryButton: {
          text: 'Voir nos réalisations',
          href: '#gallery'
        },
        variant: 'gradient-wave',
        backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop'
      }
    },
    // Contact Ultra-Modern
    {
      id: 'contact-ultra-demo',
      type: 'ContactUltraModern',
      data: {
        title: 'Contactez-nous',
        subtitle: 'Discutons de votre projet',
        email: 'contact@demo-v3.com',
        phone: '+33 1 23 45 67 89',
        address: '123 Avenue des Champs, 75008 Paris',
        hours: {
          weekdays: '9h - 18h',
          saturday: '10h - 16h',
          sunday: 'Fermé'
        },
        socials: {
          facebook: 'https://facebook.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com'
        },
        showMap: true,
        mapPosition: 'right',
        variant: 'glassmorphism',
        formFields: [
          { id: 'name', label: 'Nom complet', type: 'text', required: true },
          { id: 'email', label: 'Email', type: 'email', required: true },
          { id: 'phone', label: 'Téléphone', type: 'tel' },
          { id: 'company', label: 'Entreprise', type: 'text' },
          { id: 'subject', label: 'Objet', type: 'text', required: true },
          { id: 'message', label: 'Votre message', type: 'textarea', required: true }
        ]
      }
    }
  ];

  // 3. Mettre à jour le projet avec tous les blocs
  const updateData = {
    businessInfo: {
      name: 'Demo V3 Company',
      email: 'contact@demo-v3.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Avenue des Champs, 75008 Paris',
      website: 'https://demo-v3.com',
      description: 'Agence web spécialisée dans la création de sites modernes'
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
        title: 'Demo V3 - Tous les Blocs Ultra-Modernes',
        description: 'Découvrez tous les nouveaux blocs V3 en action',
        path: '/',
        blocks: allV3Blocks
      }
    ]
  };

  console.log('\n📝 Mise à jour avec tous les blocs V3...');
  const updateResponse = await fetch(`${API_BASE_URL}/projects/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: updateData })
  });

  if (!updateResponse.ok) {
    const error = await updateResponse.text();
    throw new Error(`Erreur mise à jour: ${error}`);
  }

  console.log('✅ Projet mis à jour avec succès !');
  console.log('\n🎉 PROJET COMPLET CRÉÉ !');
  console.log('📋 ID du projet:', project.id);
  console.log('🔗 URL locale: http://localhost:3000/projects/' + project.id);
  console.log('\n📊 Blocs inclus:');
  allV3Blocks.forEach(block => {
    console.log(`   - ${block.type} (${block.id})`);
  });
  console.log(`\n✨ Total: ${allV3Blocks.length} blocs V3 !`);

  return project.id;
}

// Lancer le script
createCompleteV3Project()
  .then(projectId => {
    console.log('\n🚀 Prochaine étape: Déployez ce projet sur Netlify !');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Erreur:', error.message);
    process.exit(1);
  });
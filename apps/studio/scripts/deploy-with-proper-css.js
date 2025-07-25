#!/usr/bin/env node

/**
 * Déploiement avec CSS correct et clés Supabase réelles
 */

const fetch = require('node-fetch');
const crypto = require('crypto');

async function deployWithProperCSS() {
  console.log('🚀 Déploiement du site avec CSS Ultra-Modern correct\n');

  const projectData = {
    settings: {
      siteName: 'AWEMA Demo Ultra-Modern',
      siteDescription: 'Site de démonstration avec tous les blocs Ultra-Modern',
      businessInfo: {
        name: 'AWEMA Studio',
        phone: '01 23 45 67 89',
        email: 'contact@awema-demo.fr',
        address: '123 Avenue des Champs, 75008 Paris',
        city: 'Paris',
        zipCode: '75008',
        country: 'France',
        domain: 'awema-demo.fr'
      }
    },
    theme: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#1f2937',
        textSecondary: '#6b7280',
        textMuted: '#9ca3af',
        border: '#e5e7eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        dark: '#1f2937',
        light: '#f9fafb'
      },
      typography: {
        fontFamily: {
          heading: 'Inter',
          body: 'Inter'
        }
      }
    },
    pages: [{
      id: 'home',
      title: 'Accueil',
      slug: '/',
      meta: {
        title: 'AWEMA Demo - Tous les Blocs Ultra-Modern',
        description: 'Découvrez tous les blocs Ultra-Modern en action avec notre éditeur CMS intégré'
      },
      blocks: [
        // Header Ultra-Modern
        {
          id: 'header-1',
          type: 'header-ultra-modern',
          props: {
            variant: 'floating-blur',
            logo: { text: 'AWEMA Demo' },
            navigation: [
              { label: 'Accueil', href: '#' },
              { label: 'Services', href: '#services' },
              { label: 'Portfolio', href: '#gallery' },
              { label: 'Tarifs', href: '#pricing' },
              { label: 'Contact', href: '#contact' }
            ],
            ctaButton: { text: 'Devis Gratuit', href: '#contact' },
            sticky: true,
            darkMode: true
          }
        },
        
        // Hero Ultra-Modern - Gradient Wave
        {
          id: 'hero-1',
          type: 'hero-ultra-modern',
          props: {
            variant: 'gradient-wave',
            title: 'Bienvenue sur AWEMA Studio',
            subtitle: 'La nouvelle génération de création de sites web',
            description: 'Découvrez tous nos blocs Ultra-Modern avec des designs époustouflants. Testez notre éditeur CMS pour voir à quel point il est facile de personnaliser chaque élément.',
            buttonText: 'Découvrir nos services',
            buttonLink: '#services',
            secondaryButtonText: 'Voir la démo',
            secondaryButtonLink: '#demo',
            height: 'screen',
            alignment: 'center'
          }
        },

        // Features Ultra-Modern - Grid
        {
          id: 'features-1',
          type: 'features-ultra-modern',
          props: {
            title: 'Fonctionnalités Exceptionnelles',
            subtitle: 'Tout ce dont vous avez besoin pour réussir en ligne',
            layout: 'grid',
            columns: 3,
            features: [
              {
                icon: 'zap',
                title: 'Ultra Rapide',
                description: 'Performance optimale avec chargement instantané et CDN mondial'
              },
              {
                icon: 'shield',
                title: 'Sécurisé',
                description: 'Protection SSL, sauvegardes automatiques et mises à jour régulières'
              },
              {
                icon: 'smartphone',
                title: 'Responsive',
                description: 'Parfait sur tous les appareils, du mobile au desktop'
              },
              {
                icon: 'search',
                title: 'SEO Optimisé',
                description: 'Visible sur Google dès le premier jour avec notre optimisation avancée'
              },
              {
                icon: 'edit',
                title: 'CMS Intégré',
                description: 'Modifiez facilement votre contenu sans toucher au code'
              },
              {
                icon: 'headphones',
                title: 'Support 24/7',
                description: 'Une équipe dédiée pour vous accompagner à chaque étape'
              }
            ]
          }
        },

        // Content Ultra-Modern - Timeline
        {
          id: 'content-1',
          type: 'content-ultra-modern',
          props: {
            variant: 'timeline',
            title: 'Notre Parcours',
            subtitle: 'Une évolution constante vers l\'excellence',
            items: [
              {
                year: '2020',
                title: 'Création d\'AWEMA',
                description: 'Lancement de notre plateforme révolutionnaire de création de sites',
                image: '/assets/timeline-1.jpg'
              },
              {
                year: '2021',
                title: 'Première Étape',
                description: 'Plus de 1000 sites créés avec satisfaction client maximale',
                image: '/assets/timeline-2.jpg'
              },
              {
                year: '2022',
                title: 'Innovation Continue',
                description: 'Introduction des blocs Ultra-Modern et du CMS nouvelle génération',
                image: '/assets/timeline-3.jpg'
              },
              {
                year: '2023',
                title: 'Expansion',
                description: 'Présence dans 15 pays avec des clients satisfaits partout',
                image: '/assets/timeline-4.jpg'
              },
              {
                year: '2024',
                title: 'Leader du Marché',
                description: 'Plus de 10 000 sites actifs et une croissance continue',
                image: '/assets/timeline-5.jpg'
              }
            ]
          }
        },

        // Gallery Ultra-Modern - Masonry
        {
          id: 'gallery-1',
          type: 'gallery-ultra-modern',
          props: {
            variant: 'masonry-flow',
            title: 'Nos Réalisations',
            subtitle: 'Découvrez quelques-uns de nos projets les plus remarquables',
            images: [
              { src: '/assets/project-1.jpg', alt: 'Site E-commerce Moderne', title: 'E-commerce Fashion', category: 'web' },
              { src: '/assets/project-2.jpg', alt: 'Application SaaS', title: 'Dashboard Analytics', category: 'app' },
              { src: '/assets/project-3.jpg', alt: 'Site Vitrine Restaurant', title: 'Restaurant Gastronomique', category: 'web' },
              { src: '/assets/project-4.jpg', alt: 'Portfolio Créatif', title: 'Agence Design', category: 'portfolio' },
              { src: '/assets/project-5.jpg', alt: 'Plateforme Learning', title: 'E-learning Platform', category: 'app' },
              { src: '/assets/project-6.jpg', alt: 'Blog Magazine', title: 'Magazine Digital', category: 'blog' },
              { src: '/assets/project-7.jpg', alt: 'Site Corporate', title: 'Corporate Website', category: 'web' },
              { src: '/assets/project-8.jpg', alt: 'Marketplace', title: 'Multi-vendor Market', category: 'app' }
            ],
            columns: 4,
            lightbox: true,
            filterEnabled: true,
            categories: ['all', 'web', 'app', 'portfolio', 'blog']
          }
        },

        // Testimonials Ultra-Modern - Carousel 3D
        {
          id: 'testimonials-1',
          type: 'testimonials-ultra-modern',
          props: {
            title: 'Ce que disent nos clients',
            subtitle: 'La satisfaction de nos clients est notre priorité',
            layout: 'carousel-3d',
            testimonials: [
              {
                text: 'AWEMA a complètement transformé notre présence en ligne. Le site est magnifique et le CMS est un plaisir à utiliser.',
                name: 'Sophie Martin',
                role: 'CEO',
                company: 'TechStart France',
                image: '/assets/testimonial-1.jpg',
                rating: 5
              },
              {
                text: 'Service exceptionnel et résultats au-delà de nos attentes. L\'équipe est professionnelle et toujours à l\'écoute.',
                name: 'Pierre Dubois',
                role: 'Directeur Marketing',
                company: 'InnovateCorp',
                image: '/assets/testimonial-2.jpg',
                rating: 5
              },
              {
                text: 'Le meilleur investissement pour notre entreprise. ROI visible dès le premier mois avec une augmentation de 300% du trafic.',
                name: 'Marie Laurent',
                role: 'Fondatrice',
                company: 'EcoGreen Solutions',
                image: '/assets/testimonial-3.jpg',
                rating: 5
              },
              {
                text: 'Interface moderne, performances exceptionnelles et un support client vraiment réactif. Je recommande vivement !',
                name: 'Thomas Bernard',
                role: 'CTO',
                company: 'DataViz Pro',
                image: '/assets/testimonial-4.jpg',
                rating: 5
              }
            ],
            showRating: true,
            showCompany: true,
            autoplay: true
          }
        },

        // Pricing Ultra-Modern - Gradient Cards
        {
          id: 'pricing-1',
          type: 'pricing-ultra-modern',
          props: {
            variant: 'gradient-cards',
            title: 'Des Tarifs Transparents',
            subtitle: 'Choisissez l\'offre qui correspond à vos besoins',
            plans: [
              {
                name: 'Starter',
                price: '29',
                period: 'mois',
                description: 'Parfait pour débuter',
                features: [
                  'Site vitrine 5 pages',
                  'Design responsive',
                  'SSL inclus',
                  'Support email',
                  'Mises à jour mensuelles'
                ],
                buttonText: 'Commencer',
                buttonLink: '#contact'
              },
              {
                name: 'Professional',
                price: '59',
                period: 'mois',
                description: 'Le plus populaire',
                features: [
                  'Site vitrine 10 pages',
                  'CMS complet intégré',
                  'Blog inclus',
                  'Support prioritaire 24/7',
                  'Analytics avancés',
                  'Sauvegarde quotidienne',
                  'Optimisation SEO'
                ],
                highlighted: true,
                badge: 'Recommandé',
                buttonText: 'Choisir Pro',
                buttonLink: '#contact'
              },
              {
                name: 'Enterprise',
                price: '99',
                period: 'mois',
                description: 'Pour les grandes ambitions',
                features: [
                  'Pages illimitées',
                  'CMS multi-utilisateurs',
                  'Multi-langue',
                  'API personnalisée',
                  'Formation incluse',
                  'SLA garanti 99.9%',
                  'Manager dédié'
                ],
                buttonText: 'Nous contacter',
                buttonLink: '#contact'
              }
            ],
            showComparison: true
          }
        },

        // FAQ Ultra-Modern - Gradient Cards
        {
          id: 'faq-1',
          type: 'faq-ultra-modern',
          props: {
            variant: 'gradient-cards',
            title: 'Questions Fréquentes',
            subtitle: 'Tout ce que vous devez savoir sur nos services',
            faqs: [
              {
                question: 'Comment fonctionne le CMS intégré ?',
                answer: 'Notre CMS est accessible directement depuis votre site via /admin. Il vous permet de modifier tous les contenus, images et paramètres sans aucune connaissance technique. L\'interface est intuitive et inclut un éditeur visuel.',
                category: 'cms'
              },
              {
                question: 'Puis-je modifier mon site après la livraison ?',
                answer: 'Absolument ! C\'est l\'avantage principal de notre solution. Vous avez un contrôle total sur votre contenu. Nous offrons également une formation gratuite pour vous assurer une prise en main optimale.',
                category: 'cms'
              },
              {
                question: 'Quels sont les délais de création ?',
                answer: 'Un site standard est livré en 5-7 jours ouvrés. Pour des projets plus complexes avec des fonctionnalités sur mesure, comptez 2-4 semaines selon vos besoins spécifiques.',
                category: 'general'
              },
              {
                question: 'Mon site sera-t-il bien référencé sur Google ?',
                answer: 'Oui ! Tous nos sites sont optimisés SEO dès la conception : structure HTML5 sémantique, vitesse optimale, responsive design, meta tags, sitemap XML, schema.org et bien plus.',
                category: 'seo'
              },
              {
                question: 'Proposez-vous de la maintenance ?',
                answer: 'Nous offrons des forfaits de maintenance incluant : mises à jour de sécurité, sauvegardes quotidiennes, monitoring 24/7, support technique et évolutions mineures.',
                category: 'support'
              },
              {
                question: 'Comment se passe le paiement ?',
                answer: 'Nous acceptons les virements, CB et PayPal. Paiement en 3 fois : 30% à la commande, 40% à la validation maquette, 30% à la livraison.',
                category: 'payment'
              }
            ],
            categories: [
              { id: 'all', label: 'Toutes' },
              { id: 'cms', label: 'CMS' },
              { id: 'general', label: 'Général' },
              { id: 'seo', label: 'SEO' },
              { id: 'support', label: 'Support' },
              { id: 'payment', label: 'Paiement' }
            ],
            searchEnabled: true
          }
        },

        // Contact Ultra-Modern - Split Modern
        {
          id: 'contact-1',
          type: 'contact-ultra-modern',
          props: {
            variant: 'split-modern',
            title: 'Parlons de votre projet',
            subtitle: 'Notre équipe est là pour vous accompagner',
            description: 'Que vous ayez une idée précise ou besoin de conseils, nous sommes là pour transformer vos ambitions digitales en réalité.',
            formFields: [
              { name: 'name', label: 'Nom complet', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
              { name: 'company', label: 'Entreprise', type: 'text', required: false },
              { name: 'subject', label: 'Sujet', type: 'select', required: true, options: [
                'Demande de devis',
                'Question technique',
                'Support',
                'Partenariat',
                'Autre'
              ]},
              { name: 'message', label: 'Votre message', type: 'textarea', required: true, rows: 5 }
            ],
            submitText: 'Envoyer le message',
            phone: '+33 1 23 45 67 89',
            email: 'contact@awema-demo.fr',
            address: '123 Avenue des Champs, 75008 Paris',
            mapEnabled: true,
            mapPosition: 'right',
            socialLinks: [
              { platform: 'linkedin', url: '#' },
              { platform: 'twitter', url: '#' },
              { platform: 'facebook', url: '#' }
            ]
          }
        },

        // CTA Ultra-Modern - Gradient Animated
        {
          id: 'cta-1',
          type: 'cta-ultra-modern',
          props: {
            variant: 'gradient-animated',
            title: 'Prêt à transformer votre présence en ligne ?',
            subtitle: 'Rejoignez des milliers d\'entreprises qui nous font confiance',
            description: 'Commencez dès aujourd\'hui avec une consultation gratuite et sans engagement.',
            primaryButton: {
              text: 'Démarrer Maintenant',
              link: '#contact'
            },
            secondaryButton: {
              text: 'Voir nos Tarifs',
              link: '#pricing'
            },
            statistics: [
              { value: '10K+', label: 'Sites Créés' },
              { value: '99%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' }
            ]
          }
        },

        // Footer Ultra-Modern - Gradient Wave
        {
          id: 'footer-1',
          type: 'footer-ultra-modern',
          props: {
            variant: 'gradient-wave',
            logo: { text: 'AWEMA Demo' },
            about: 'AWEMA Studio est la plateforme de création de sites web nouvelle génération. Nous combinons design moderne, performance et simplicité.',
            columns: [
              {
                title: 'Services',
                links: [
                  { label: 'Création de Sites', href: '#' },
                  { label: 'E-commerce', href: '#' },
                  { label: 'Applications Web', href: '#' },
                  { label: 'Maintenance', href: '#' }
                ]
              },
              {
                title: 'Entreprise',
                links: [
                  { label: 'À Propos', href: '#' },
                  { label: 'Notre Équipe', href: '#' },
                  { label: 'Carrières', href: '#' },
                  { label: 'Blog', href: '#' }
                ]
              },
              {
                title: 'Support',
                links: [
                  { label: 'Documentation', href: '#' },
                  { label: 'FAQ', href: '#faq' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Status', href: '#' }
                ]
              }
            ],
            contact: {
              phone: '+33 1 23 45 67 89',
              email: 'contact@awema-demo.fr',
              address: '123 Avenue des Champs, 75008 Paris'
            },
            social: [
              { platform: 'facebook', url: '#' },
              { platform: 'twitter', url: '#' },
              { platform: 'linkedin', url: '#' },
              { platform: 'instagram', url: '#' }
            ],
            newsletter: {
              enabled: true,
              title: 'Newsletter',
              description: 'Recevez nos dernières actualités',
              placeholder: 'Votre email',
              buttonText: 'S\'inscrire'
            },
            copyright: '© 2024 AWEMA Studio. Tous droits réservés.',
            bottomLinks: [
              { label: 'Mentions Légales', href: '#' },
              { label: 'Politique de Confidentialité', href: '#' },
              { label: 'CGV', href: '#' }
            ]
          }
        }
      ]
    }]
  };

  try {
    console.log('📦 Envoi de la requête de déploiement avec les vraies clés Supabase...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: crypto.randomUUID(),
        siteName: `awema-ultra-modern-${Date.now()}`,
        projectData: projectData,
        plan: 'pro',
        adminEmail: 'admin@awema-demo.fr',
        customDomain: null
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Déploiement réussi !\n');
      console.log('📋 Détails du site :');
      console.log(`   🌐 Site : ${result.siteUrl}`);
      console.log(`   🔧 Admin : ${result.adminUrl}`);
      console.log('\n🔑 Identifiants CMS :');
      console.log(`   Email : ${result.credentials.email}`);
      console.log(`   Mot de passe : ${result.credentials.password}`);
      console.log('\n⚠️  Configuration Supabase :');
      console.log('   Vos vraies clés Supabase sont utilisées');
      console.log('   Assurez-vous que CORS est configuré pour ce domaine');
      console.log('\n📋 À tester :');
      console.log('   1. Vérifiez que tous les blocs s\'affichent correctement');
      console.log('   2. Les couleurs et polices doivent correspondre au thème');
      console.log('   3. L\'éditeur CMS doit fonctionner avec Supabase');
      console.log('   4. La sauvegarde doit persister dans votre base Supabase');
    } else {
      console.error('❌ Erreur:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Charger les variables d'environnement si disponibles
try {
  require('dotenv').config({ path: '../.env.local' });
} catch (e) {
  // Pas de problème si dotenv n'est pas disponible
}

deployWithProperCSS();
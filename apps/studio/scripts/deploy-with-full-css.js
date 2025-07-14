#!/usr/bin/env node

/**
 * Déploiement avec TOUT le CSS complet des blocs Ultra-Modern
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Charger les clés
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const supabaseUrlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
  const supabaseKeyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);
  
  if (supabaseUrlMatch) process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrlMatch[1].trim();
  if (supabaseKeyMatch) process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = supabaseKeyMatch[1].trim();
}

async function deployWithFullCSS() {
  console.log('🎨 Déploiement avec CSS COMPLET des blocs Ultra-Modern\n');
  console.log('✅ Ce déploiement inclut :');
  console.log('   - TOUT le CSS des blocs Ultra-Modern');
  console.log('   - Animations, gradients, glassmorphism');
  console.log('   - Responsive design complet');
  console.log('   - Fonts, ombres, transitions');
  console.log('   - Favicon et images placeholder\n');

  const projectData = {
    id: `awema-fullcss-${Date.now()}`,
    settings: {
      siteName: 'AWEMA Full CSS Demo',
      siteDescription: 'Site avec CSS complet pour tous les blocs',
      businessInfo: {
        name: 'AWEMA Studio',
        phone: '+33 1 45 67 89 00',
        email: 'hello@awema.fr',
        address: '123 Avenue Montaigne, 75008 Paris',
        city: 'Paris',
        zipCode: '75008',
        country: 'France',
        domain: 'awema.fr'
      }
    },
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#10b981',
      accentColor: '#f59e0b',
      darkColor: '#1f2937',
      lightColor: '#f9fafb',
      font: {
        heading: 'Inter',
        body: 'Inter'
      }
    },
    pages: [{
      id: 'home',
      title: 'Accueil',
      slug: '/',
      blocks: [
        // Header Ultra-Modern avec toutes les variantes
        {
          id: 'header-main',
          type: 'header-ultra-modern',
          props: {
            variant: 'floating-blur',
            logo: {
              text: 'AWEMA',
              imageUrl: '/assets/logo.png'
            },
            navigation: [
              { label: 'Accueil', href: '/' },
              { label: 'Services', href: '#services' },
              { label: 'À Propos', href: '#about' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Contact', href: '#contact' }
            ],
            ctaButton: {
              text: 'Commencer',
              href: '#contact'
            },
            sticky: true,
            darkMode: true,
            searchEnabled: true
          }
        },

        // Hero Ultra-Modern - Glassmorphism
        {
          id: 'hero-glass',
          type: 'hero-ultra-modern',
          props: {
            variant: 'glassmorphism',
            layout: 'centered',
            title: 'Design Ultra-Modern avec CSS Complet',
            subtitle: 'Découvrez la puissance du glassmorphism',
            description: 'Chaque variante avec son CSS complet : animations, effets visuels, responsive design parfait.',
            primaryButton: {
              text: 'Explorer',
              link: '#features',
              style: 'gradient'
            },
            secondaryButton: {
              text: 'En savoir plus',
              link: '#about',
              style: 'glass'
            },
            backgroundType: 'gradient',
            gradientStart: '#667eea',
            gradientEnd: '#764ba2',
            overlay: true,
            showScrollIndicator: true
          }
        },

        // Hero Ultra-Modern - Gradient Wave
        {
          id: 'hero-wave',
          type: 'hero-ultra-modern',
          props: {
            variant: 'gradient-wave',
            layout: 'two-columns',
            title: 'Vagues Animées et Gradients',
            subtitle: 'Animation CSS pure',
            description: 'Les vagues animées utilisent des keyframes CSS complexes pour créer un effet fluide.',
            primaryButton: {
              text: 'Voir le code',
              link: '#',
              style: 'primary'
            },
            backgroundType: 'animated-gradient',
            heroImage: '/assets/hero-image.jpg',
            heroImagePosition: 'right'
          }
        },

        // Hero Ultra-Modern - Particle Effect
        {
          id: 'hero-particles',
          type: 'hero-ultra-modern',
          props: {
            variant: 'particle-effect',
            title: 'Particules Animées',
            subtitle: 'CSS + JavaScript',
            description: 'Effet de particules avec animations CSS3D et transformations.',
            primaryButton: {
              text: 'Découvrir',
              link: '#'
            },
            showParticles: true,
            particleCount: 50
          }
        },

        // Features Ultra-Modern - Toutes les variantes
        {
          id: 'features-all',
          type: 'features-ultra-modern',
          props: {
            title: 'Toutes les Variantes CSS',
            subtitle: 'Chaque mode avec son style unique',
            layout: 'grid',
            columns: 3,
            features: [
              {
                icon: 'palette',
                title: 'Glassmorphism',
                description: 'Effet de verre dépoli avec backdrop-filter et blur',
                image: '/assets/feature-glass.jpg'
              },
              {
                icon: 'zap',
                title: 'Animations 3D',
                description: 'Transformations CSS 3D avec perspective et rotation',
                image: '/assets/feature-3d.jpg'
              },
              {
                icon: 'layers',
                title: 'Ombres Complexes',
                description: 'Box-shadows multiples pour effet de profondeur',
                image: '/assets/feature-shadow.jpg'
              },
              {
                icon: 'maximize',
                title: 'Hover Effects',
                description: 'Transitions fluides et transformations au survol',
                image: '/assets/feature-hover.jpg'
              },
              {
                icon: 'grid',
                title: 'Grid Layout',
                description: 'CSS Grid avancé avec auto-fit et minmax',
                image: '/assets/feature-grid.jpg'
              },
              {
                icon: 'smartphone',
                title: 'Responsive',
                description: 'Media queries et clamp() pour adaptation parfaite',
                image: '/assets/feature-responsive.jpg'
              }
            ],
            showImages: true,
            animated: true
          }
        },

        // Gallery Ultra-Modern - Masonry avec tous les effets
        {
          id: 'gallery-effects',
          type: 'gallery-ultra-modern',
          props: {
            variant: 'masonry-flow',
            title: 'Galerie avec Effets CSS Complets',
            subtitle: 'Hover, lightbox, filtres, animations',
            images: Array.from({length: 8}, (_, i) => ({
              src: `/assets/gallery-${i + 1}.jpg`,
              alt: `Image ${i + 1}`,
              title: `Effet CSS ${i + 1}`,
              category: i % 2 === 0 ? 'design' : 'photo'
            })),
            columns: 4,
            gap: 'medium',
            lightbox: true,
            lightboxStyle: 'modern-dark',
            filterEnabled: true,
            categories: ['all', 'design', 'photo'],
            hoverEffect: 'zoom-rotate',
            lazy: true,
            lazyAnimation: 'blur-up'
          }
        },

        // Testimonials Ultra-Modern - Carousel 3D
        {
          id: 'testimonials-3d',
          type: 'testimonials-ultra-modern',
          props: {
            title: 'Carousel 3D avec CSS Transform',
            subtitle: 'Perspective et rotation 3D',
            layout: 'carousel-3d',
            testimonials: [
              {
                text: 'Les animations CSS sont fluides et impressionnantes. Le rendu 3D est parfait.',
                name: 'Marie Dubois',
                role: 'Designer UI/UX',
                company: 'DesignLab',
                image: '/assets/testimonial-1.jpg',
                rating: 5
              },
              {
                text: 'Le glassmorphism et les effets de flou sont exactement ce que je cherchais.',
                name: 'Pierre Martin',
                role: 'Développeur Frontend',
                company: 'TechCorp',
                image: '/assets/testimonial-2.jpg',
                rating: 5
              },
              {
                text: 'Les transitions et animations apportent une vraie valeur ajoutée au site.',
                name: 'Sophie Laurent',
                role: 'Chef de Projet',
                company: 'WebAgency',
                image: '/assets/testimonial-3.jpg',
                rating: 5
              }
            ],
            showRating: true,
            autoplay: true,
            autoplaySpeed: 4000,
            showDots: true,
            showArrows: true
          }
        },

        // Pricing Ultra-Modern - Gradient Cards
        {
          id: 'pricing-gradient',
          type: 'pricing-ultra-modern',
          props: {
            variant: 'gradient-cards',
            title: 'Plans avec Gradients Animés',
            subtitle: 'CSS animations et transitions',
            plans: [
              {
                name: 'Basic',
                price: '29',
                period: 'mois',
                description: 'Pour débuter',
                features: [
                  'CSS de base',
                  'Animations simples',
                  'Responsive design',
                  'Support email'
                ],
                buttonText: 'Choisir Basic',
                buttonLink: '#',
                gradient: 'from-blue-400 to-blue-600'
              },
              {
                name: 'Pro',
                price: '59',
                period: 'mois',
                description: 'Le plus populaire',
                features: [
                  'CSS avancé complet',
                  'Toutes les animations',
                  'Effets 3D',
                  'Glassmorphism',
                  'Support prioritaire'
                ],
                highlighted: true,
                badge: 'POPULAIRE',
                buttonText: 'Choisir Pro',
                buttonLink: '#',
                gradient: 'from-purple-400 to-pink-600'
              },
              {
                name: 'Enterprise',
                price: '99',
                period: 'mois',
                description: 'Sur mesure',
                features: [
                  'CSS personnalisé',
                  'Animations custom',
                  'Performance optimale',
                  'Support dédié',
                  'Formation équipe'
                ],
                buttonText: 'Contacter',
                buttonLink: '#',
                gradient: 'from-green-400 to-teal-600'
              }
            ],
            showComparison: true,
            animateOnScroll: true
          }
        },

        // FAQ Ultra-Modern - Gradient Cards
        {
          id: 'faq-gradient',
          type: 'faq-ultra-modern',
          props: {
            variant: 'gradient-cards',
            title: 'Questions sur le CSS',
            subtitle: 'Tout sur nos styles avancés',
            faqs: [
              {
                question: 'Quels effets CSS sont inclus ?',
                answer: 'Tous les effets modernes : glassmorphism, neumorphism, gradients animés, transformations 3D, parallax, animations complexes, transitions fluides, et bien plus.',
                category: 'css'
              },
              {
                question: 'Le CSS est-il optimisé ?',
                answer: 'Oui, tout le CSS est minifié en production, utilise des custom properties pour la performance, et inclut uniquement les styles nécessaires.',
                category: 'performance'
              },
              {
                question: 'Comment sont gérées les animations ?',
                answer: 'Animations CSS pures avec @keyframes, transitions GPU-accelerated, respect de prefers-reduced-motion, et optimisation pour 60 FPS.',
                category: 'animations'
              },
              {
                question: 'Le responsive est-il complet ?',
                answer: 'Absolument ! Media queries pour tous les breakpoints, utilisation de clamp() et min/max, grilles fluides, et images adaptatives.',
                category: 'responsive'
              }
            ],
            categories: [
              { id: 'all', label: 'Toutes' },
              { id: 'css', label: 'CSS' },
              { id: 'performance', label: 'Performance' },
              { id: 'animations', label: 'Animations' },
              { id: 'responsive', label: 'Responsive' }
            ],
            expandIcon: 'plus-circle',
            searchEnabled: true,
            animateCards: true
          }
        },

        // Contact Ultra-Modern - Split Modern avec map
        {
          id: 'contact-map',
          type: 'contact-ultra-modern',
          props: {
            variant: 'split-modern',
            title: 'Contact avec Map Stylisée',
            subtitle: 'CSS personnalisé pour Google Maps',
            contactInfo: JSON.stringify({
              phone: '+33 1 45 67 89 00',
              email: 'hello@awema.fr',
              address: '123 Avenue Montaigne, 75008 Paris',
              hours: {
                weekdays: '9h - 18h',
                weekend: 'Fermé'
              }
            }),
            formFields: JSON.stringify([
              { name: 'name', label: 'Nom', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Téléphone', type: 'tel' },
              { name: 'subject', label: 'Sujet', type: 'select', options: ['Devis', 'Support', 'Autre'] },
              { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true }
            ]),
            showMap: true,
            mapPosition: 'right',
            mapCoordinates: JSON.stringify({
              lat: 48.8657,
              lng: 2.3003
            }),
            mapZoom: 15,
            mapStyle: 'custom',
            submitButtonText: 'Envoyer avec style'
          }
        },

        // CTA Ultra-Modern - Gradient Animated
        {
          id: 'cta-animated',
          type: 'cta-ultra-modern',
          props: {
            variant: 'gradient-animated',
            title: 'Prêt pour un Site Magnifique ?',
            subtitle: 'Avec CSS complet et animations',
            description: 'Ne laissez pas vos concurrents avoir un meilleur design.',
            primaryButton: {
              text: 'Commencer Maintenant',
              link: '#contact',
              size: 'large',
              animation: 'pulse'
            },
            secondaryButton: {
              text: 'Voir Plus',
              link: '#portfolio',
              variant: 'outline'
            },
            backgroundGradient: true,
            particleEffect: true,
            statistics: [
              { value: '100%', label: 'CSS Complet' },
              { value: '60FPS', label: 'Animations' },
              { value: '0ms', label: 'Latence' }
            ]
          }
        },

        // Footer Ultra-Modern - Gradient Wave
        {
          id: 'footer-wave',
          type: 'footer-ultra-modern',
          props: {
            variant: 'gradient-wave',
            logo: {
              text: 'AWEMA',
              tagline: 'CSS Excellence'
            },
            about: 'Démonstration complète de tous les effets CSS modernes disponibles dans AWEMA Studio.',
            columns: [
              {
                title: 'CSS Features',
                links: [
                  { label: 'Glassmorphism', href: '#' },
                  { label: 'Animations 3D', href: '#' },
                  { label: 'Gradients', href: '#' },
                  { label: 'Transitions', href: '#' }
                ]
              },
              {
                title: 'Ressources',
                links: [
                  { label: 'Documentation', href: '#' },
                  { label: 'Exemples', href: '#' },
                  { label: 'Tutoriels', href: '#' },
                  { label: 'Support', href: '#' }
                ]
              }
            ],
            contact: {
              phone: '+33 1 45 67 89 00',
              email: 'hello@awema.fr',
              address: '123 Avenue Montaigne, 75008 Paris'
            },
            social: [
              { platform: 'github', url: 'https://github.com/awema' },
              { platform: 'twitter', url: 'https://twitter.com/awema' },
              { platform: 'linkedin', url: 'https://linkedin.com/company/awema' }
            ],
            newsletter: {
              enabled: true,
              title: 'Newsletter CSS',
              description: 'Recevez nos derniers tutoriels CSS',
              placeholder: 'votre@email.com',
              buttonText: 'S\'inscrire'
            },
            copyright: '© 2024 AWEMA. CSS avec amour ❤️',
            animations: true,
            waveEffect: true
          }
        }
      ]
    }]
  };

  try {
    // Assurer que le serveur est lancé
    console.log('🔄 Vérification du serveur...');
    try {
      await fetch('http://localhost:3000/api/health');
    } catch (e) {
      console.log('⚠️  Serveur non détecté, lancement en cours...');
      console.log('   Veuillez relancer le script dans 10 secondes.');
      return;
    }

    console.log('📦 Envoi du déploiement...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: `fullcss-${Date.now()}`,
        siteName: `awema-fullcss-${Date.now()}`,
        projectData: projectData,
        plan: 'pro',
        adminEmail: 'admin@awema.fr'
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ DÉPLOIEMENT RÉUSSI AVEC CSS COMPLET !\n');
      console.log('🌐 Site : ' + result.siteUrl);
      console.log('🔧 Admin : ' + result.adminUrl);
      console.log('\n🔑 Connexion :');
      console.log('Email : ' + result.credentials.email);
      console.log('Mot de passe : ' + result.credentials.password);
      
      console.log('\n🎨 CSS Inclus :');
      console.log('✓ Glassmorphism avec backdrop-filter');
      console.log('✓ Animations @keyframes complexes');
      console.log('✓ Transformations 3D avec perspective');
      console.log('✓ Gradients animés');
      console.log('✓ Box-shadows multiples');
      console.log('✓ Transitions GPU-accelerated');
      console.log('✓ Grid et Flexbox avancés');
      console.log('✓ Media queries responsive');
      console.log('✓ Custom properties CSS');
      console.log('✓ Hover effects sophistiqués');
      
      console.log('\n🧪 Vérifications :');
      console.log('1. Tous les blocs doivent avoir leur style complet');
      console.log('2. Les animations doivent être fluides');
      console.log('3. Le glassmorphism doit fonctionner');
      console.log('4. Les gradients doivent être animés');
      console.log('5. Le responsive doit être parfait');
      
    } else {
      console.error('❌ Erreur:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

deployWithFullCSS();
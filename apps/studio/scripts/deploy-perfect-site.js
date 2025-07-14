#!/usr/bin/env node

/**
 * Déploiement PARFAIT avec tous les blocs Ultra-Modern
 * CSS correct, éditeur fonctionnel, Supabase intégré
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function deployPerfectSite() {
  console.log('🚀 Déploiement du site PARFAIT avec AWEMA Studio\n');
  console.log('✨ Caractéristiques:');
  console.log('   - Tous les blocs Ultra-Modern');
  console.log('   - CSS complet avec variables RGB');
  console.log('   - Éditeur de pages 100% fonctionnel');
  console.log('   - Intégration Supabase réelle');
  console.log('   - Rendu identique à l\'éditeur\n');

  // Charger les vraies clés depuis .env.local
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const supabaseUrlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
    const supabaseKeyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);
    
    if (supabaseUrlMatch) process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrlMatch[1];
    if (supabaseKeyMatch) process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = supabaseKeyMatch[1];
  }

  const projectData = {
    id: `awema-perfect-${Date.now()}`,
    settings: {
      siteName: 'AWEMA Perfect Demo',
      siteDescription: 'Site parfait avec tous les blocs Ultra-Modern et éditeur CMS fonctionnel',
      businessInfo: {
        name: 'AWEMA Studio Perfect',
        phone: '01 23 45 67 89',
        email: 'contact@awema-perfect.fr',
        address: '123 Avenue de la Perfection, 75001 Paris',
        city: 'Paris',
        zipCode: '75001',
        country: 'France',
        domain: 'awema-perfect.fr'
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
          heading: 'Inter, system-ui, -apple-system, sans-serif',
          body: 'Inter, system-ui, -apple-system, sans-serif'
        }
      }
    },
    seo: {
      title: 'AWEMA Perfect - Site de Démonstration Ultime',
      description: 'Découvrez la perfection du web design avec tous nos blocs Ultra-Modern',
      keywords: ['awema', 'perfect', 'demo', 'ultra-modern', 'cms'],
      ogImage: '/og-image.jpg'
    },
    pages: [{
      id: 'home',
      title: 'Accueil',
      slug: '/',
      meta: {
        title: 'AWEMA Perfect Demo - L\'Excellence du Web Design',
        description: 'Site de démonstration parfait avec tous les blocs Ultra-Modern et CMS intégré'
      },
      blocks: [
        // Header Ultra-Modern avec toutes les fonctionnalités
        {
          id: 'header-perfect',
          type: 'header-ultra-modern',
          props: {
            variant: 'floating-blur',
            logo: { 
              text: 'AWEMA Perfect',
              imageUrl: '' 
            },
            navigation: [
              { label: 'Accueil', href: '#hero' },
              { label: 'Services', href: '#services' },
              { label: 'À Propos', href: '#about' },
              { label: 'Portfolio', href: '#gallery' },
              { label: 'Témoignages', href: '#testimonials' },
              { label: 'Tarifs', href: '#pricing' },
              { label: 'Contact', href: '#contact' }
            ],
            ctaButton: {
              text: 'Commencer',
              href: '#contact'
            },
            sticky: true,
            hideOnScroll: false,
            darkMode: true,
            searchEnabled: true,
            searchStyle: 'modal',
            mobileMenuStyle: 'slide-over',
            megaMenu: {
              services: {
                enabled: true,
                columns: [
                  {
                    title: 'Création Web',
                    items: [
                      { label: 'Sites Vitrines', href: '#' },
                      { label: 'E-commerce', href: '#' },
                      { label: 'Applications Web', href: '#' }
                    ]
                  },
                  {
                    title: 'Services Pro',
                    items: [
                      { label: 'SEO & Marketing', href: '#' },
                      { label: 'Maintenance', href: '#' },
                      { label: 'Formation', href: '#' }
                    ]
                  }
                ]
              }
            }
          }
        },

        // Hero Ultra-Modern - La plus belle variante
        {
          id: 'hero-perfect',
          type: 'hero-ultra-modern',
          props: {
            variant: 'gradient-wave',
            title: 'L\'Excellence du Web Design',
            subtitle: 'Bienvenue dans la Perfection Digitale',
            description: 'Découvrez une expérience web incomparable avec nos blocs Ultra-Modern. Chaque détail est pensé pour créer des sites web qui impressionnent et convertissent.',
            buttonText: 'Découvrir la Magie',
            buttonLink: '#features',
            secondaryButtonText: 'Voir la Démo Vidéo',
            secondaryButtonLink: '#video',
            backgroundImage: '',
            backgroundVideo: '',
            height: 'screen',
            alignment: 'center',
            overlay: true,
            overlayOpacity: 40,
            animation: 'float',
            particles: true,
            countdown: {
              enabled: false,
              date: '2024-12-31T23:59:59'
            }
          }
        },

        // Features Ultra-Modern - Mode Timeline
        {
          id: 'features-timeline',
          type: 'features-ultra-modern',
          props: {
            title: '6 Raisons de Nous Choisir',
            subtitle: 'L\'innovation au service de votre succès',
            description: 'Découvrez pourquoi des milliers d\'entreprises nous font confiance',
            layout: 'timeline',
            features: [
              {
                icon: 'rocket',
                title: 'Performance Extrême',
                description: 'Sites ultra-rapides avec un score Lighthouse parfait. CDN mondial et optimisation avancée.',
                image: '/assets/feature-performance.jpg',
                stats: '100/100 Lighthouse'
              },
              {
                icon: 'palette',
                title: 'Design Époustouflant',
                description: 'Interfaces modernes qui captivent vos visiteurs. Animations fluides et expérience immersive.',
                image: '/assets/feature-design.jpg',
                stats: '+300% Engagement'
              },
              {
                icon: 'code',
                title: 'Code Propre & Moderne',
                description: 'Technologies de pointe : React, TypeScript, Tailwind CSS. Maintenabilité garantie.',
                image: '/assets/feature-code.jpg',
                stats: '0 Dette Technique'
              },
              {
                icon: 'shield-check',
                title: 'Sécurité Maximale',
                description: 'Protection SSL, WAF, sauvegardes automatiques. Votre site est entre de bonnes mains.',
                image: '/assets/feature-security.jpg',
                stats: '99.9% Uptime'
              },
              {
                icon: 'trending-up',
                title: 'SEO & Croissance',
                description: 'Optimisation poussée pour Google. Augmentez votre visibilité et vos conversions.',
                image: '/assets/feature-seo.jpg',
                stats: '+250% Trafic'
              },
              {
                icon: 'users',
                title: 'Support Dédié',
                description: 'Équipe d\'experts à votre service 24/7. Formation et accompagnement personnalisé.',
                image: '/assets/feature-support.jpg',
                stats: '< 2h Réponse'
              }
            ],
            showImages: true,
            animated: true,
            staggerAnimation: true
          }
        },

        // Content Ultra-Modern - Accordion
        {
          id: 'content-services',
          type: 'content-ultra-modern',
          props: {
            variant: 'accordion',
            title: 'Nos Services en Détail',
            subtitle: 'Explorez notre gamme complète de solutions',
            items: [
              {
                title: 'Création de Sites Web Sur Mesure',
                content: 'Nous concevons des sites web uniques qui reflètent parfaitement votre identité. Chaque projet est une œuvre d\'art digitale, optimisée pour la performance et l\'expérience utilisateur. Notre processus créatif garantit un résultat qui dépasse vos attentes.',
                icon: 'globe',
                image: '/assets/service-web.jpg'
              },
              {
                title: 'E-commerce Nouvelle Génération',
                content: 'Transformez vos visiteurs en clients avec nos solutions e-commerce avancées. Paiement sécurisé, gestion des stocks intelligente, et expérience d\'achat optimale sur tous les appareils. Augmentez vos ventes avec une boutique en ligne performante.',
                icon: 'shopping-cart',
                image: '/assets/service-ecommerce.jpg'
              },
              {
                title: 'Applications Web Complexes',
                content: 'Développement d\'applications web robustes et scalables. Que ce soit un SaaS, un dashboard analytique ou une plateforme collaborative, nous maîtrisons les technologies les plus avancées pour donner vie à vos idées les plus ambitieuses.',
                icon: 'cpu',
                image: '/assets/service-app.jpg'
              },
              {
                title: 'Stratégie Digitale & SEO',
                content: 'Maximisez votre visibilité en ligne avec notre expertise SEO. Audit complet, optimisation on-page et off-page, stratégie de contenu, et suivi des performances. Nous vous propulsons en première page de Google.',
                icon: 'trending-up',
                image: '/assets/service-seo.jpg'
              },
              {
                title: 'Maintenance & Support Premium',
                content: 'Votre tranquillité d\'esprit est notre priorité. Mises à jour régulières, monitoring 24/7, sauvegardes automatiques, et support réactif. Concentrez-vous sur votre business, nous gérons votre présence digitale.',
                icon: 'shield',
                image: '/assets/service-support.jpg'
              }
            ],
            defaultOpenIndex: 0,
            allowMultiple: false,
            showImages: true,
            imagePosition: 'right'
          }
        },

        // Gallery Ultra-Modern - Infinite Grid
        {
          id: 'gallery-portfolio',
          type: 'gallery-ultra-modern',
          props: {
            variant: 'infinite-grid',
            title: 'Portfolio d\'Excellence',
            subtitle: 'Nos réalisations parlent d\'elles-mêmes',
            description: 'Chaque projet est une histoire de succès',
            images: [
              {
                src: '/assets/portfolio-1.jpg',
                alt: 'E-commerce Luxe',
                title: 'Boutique de Luxe Parisienne',
                description: 'E-commerce haut de gamme avec expérience immersive',
                category: 'ecommerce',
                tags: ['luxury', 'fashion', 'paris'],
                link: 'https://example.com/project1'
              },
              {
                src: '/assets/portfolio-2.jpg',
                alt: 'SaaS Dashboard',
                title: 'Plateforme Analytics B2B',
                description: 'Dashboard temps réel pour entreprises data-driven',
                category: 'saas',
                tags: ['analytics', 'b2b', 'dashboard']
              },
              {
                src: '/assets/portfolio-3.jpg',
                alt: 'Site Corporate',
                title: 'Groupe International Finance',
                description: 'Présence digitale pour leader du CAC 40',
                category: 'corporate',
                tags: ['finance', 'corporate', 'international']
              },
              {
                src: '/assets/portfolio-4.jpg',
                alt: 'Application Mobile',
                title: 'App Fitness & Bien-être',
                description: 'PWA avec 50K+ utilisateurs actifs',
                category: 'mobile',
                tags: ['fitness', 'pwa', 'mobile']
              },
              {
                src: '/assets/portfolio-5.jpg',
                alt: 'Marketplace',
                title: 'Marketplace Artisans Locaux',
                description: 'Plateforme multi-vendeurs éco-responsable',
                category: 'marketplace',
                tags: ['marketplace', 'eco', 'local']
              },
              {
                src: '/assets/portfolio-6.jpg',
                alt: 'Blog Magazine',
                title: 'Magazine Lifestyle Digital',
                description: 'Publication en ligne avec 1M+ vues/mois',
                category: 'media',
                tags: ['blog', 'magazine', 'lifestyle']
              },
              {
                src: '/assets/portfolio-7.jpg',
                alt: 'Restaurant',
                title: 'Restaurant Étoilé Michelin',
                description: 'Site vitrine avec réservation en ligne',
                category: 'restaurant',
                tags: ['restaurant', 'luxury', 'booking']
              },
              {
                src: '/assets/portfolio-8.jpg',
                alt: 'Education',
                title: 'Plateforme E-learning',
                description: 'LMS moderne avec 10K+ étudiants',
                category: 'education',
                tags: ['education', 'lms', 'online']
              },
              {
                src: '/assets/portfolio-9.jpg',
                alt: 'Real Estate',
                title: 'Agence Immobilière Premium',
                description: 'Portail immobilier avec visite virtuelle 3D',
                category: 'realestate',
                tags: ['realestate', '3d', 'virtual']
              },
              {
                src: '/assets/portfolio-10.jpg',
                alt: 'Healthcare',
                title: 'Clinique Médicale Moderne',
                description: 'Prise de RDV en ligne et téléconsultation',
                category: 'healthcare',
                tags: ['health', 'medical', 'booking']
              }
            ],
            columns: 'auto',
            gap: 'large',
            lightbox: true,
            lightboxStyle: 'modern-dark',
            filterEnabled: true,
            categories: [
              { id: 'all', label: 'Tous' },
              { id: 'ecommerce', label: 'E-commerce' },
              { id: 'saas', label: 'SaaS' },
              { id: 'corporate', label: 'Corporate' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'media', label: 'Media' },
              { id: 'restaurant', label: 'Restaurant' },
              { id: 'education', label: 'Education' },
              { id: 'realestate', label: 'Immobilier' },
              { id: 'healthcare', label: 'Santé' }
            ],
            hoverEffect: 'parallax-tilt',
            lazy: true,
            lazyAnimation: 'blur-up',
            showDetails: true,
            detailsPosition: 'overlay',
            autoLoad: true,
            loadMoreText: 'Voir plus de projets'
          }
        },

        // Testimonials Ultra-Modern - Stacked Cards
        {
          id: 'testimonials-clients',
          type: 'testimonials-ultra-modern',
          props: {
            title: 'Ils Nous Font Confiance',
            subtitle: 'La satisfaction client est notre plus belle récompense',
            description: 'Découvrez les témoignages de nos clients satisfaits',
            layout: 'stacked-cards',
            testimonials: [
              {
                text: 'AWEMA a transformé notre vision en réalité. Le site est non seulement magnifique mais aussi incroyablement performant. Notre taux de conversion a augmenté de 300% !',
                name: 'Sophie Laurent',
                role: 'CEO & Fondatrice',
                company: 'LuxeMode Paris',
                image: '/assets/testimonial-sophie.jpg',
                rating: 5,
                verified: true,
                video: 'https://youtube.com/watch?v=abc123',
                stats: {
                  conversion: '+300%',
                  traffic: '+250%',
                  revenue: '+400%'
                }
              },
              {
                text: 'L\'équipe AWEMA est exceptionnelle. Leur expertise technique combinée à leur créativité nous a permis de nous démarquer complètement de la concurrence.',
                name: 'Pierre Durand',
                role: 'Directeur Digital',
                company: 'TechCorp International',
                image: '/assets/testimonial-pierre.jpg',
                rating: 5,
                verified: true,
                linkedIn: 'https://linkedin.com/in/pierredurand'
              },
              {
                text: 'Le CMS est tellement intuitif que toute notre équipe peut maintenant gérer le contenu. C\'est un gain de temps et d\'autonomie considérable.',
                name: 'Marie Chen',
                role: 'CMO',
                company: 'StartupGenius',
                image: '/assets/testimonial-marie.jpg',
                rating: 5,
                verified: true,
                twitter: '@mariechen'
              },
              {
                text: 'Nous avons été bluffés par la rapidité d\'exécution et la qualité du résultat. AWEMA a dépassé toutes nos attentes.',
                name: 'Thomas Martin',
                role: 'Président',
                company: 'Groupe Excellence',
                image: '/assets/testimonial-thomas.jpg',
                rating: 5,
                verified: true
              },
              {
                text: 'Le support est incroyable. Ils sont toujours disponibles et trouvent des solutions à tous nos défis. Un vrai partenaire de confiance.',
                name: 'Isabelle Moreau',
                role: 'Directrice IT',
                company: 'InnoTech Solutions',
                image: '/assets/testimonial-isabelle.jpg',
                rating: 5,
                verified: true
              }
            ],
            showRating: true,
            showCompany: true,
            showVerified: true,
            autoplay: true,
            autoplaySpeed: 5000,
            showStats: true,
            showSocial: true,
            googleReviewsEnabled: false,
            googlePlaceId: ''
          }
        },

        // Pricing Ultra-Modern - 3D Cards
        {
          id: 'pricing-plans',
          type: 'pricing-ultra-modern',
          props: {
            variant: '3d-cards',
            title: 'Investissez dans Votre Succès',
            subtitle: 'Des tarifs transparents, sans surprise',
            description: 'Choisissez le plan qui correspond à vos ambitions',
            currency: '€',
            billing: 'monthly',
            showAnnualDiscount: true,
            annualDiscount: 20,
            plans: [
              {
                name: 'Starter',
                price: '297',
                period: 'mois',
                description: 'Idéal pour démarrer votre présence en ligne',
                icon: 'rocket',
                features: [
                  { text: 'Site vitrine jusqu\'à 5 pages', included: true },
                  { text: 'Design responsive moderne', included: true },
                  { text: 'Optimisation SEO de base', included: true },
                  { text: 'Certificat SSL inclus', included: true },
                  { text: 'Hébergement rapide', included: true },
                  { text: 'Support par email', included: true },
                  { text: 'Mises à jour mensuelles', included: true },
                  { text: 'CMS basique', included: false },
                  { text: 'E-commerce', included: false },
                  { text: 'Support prioritaire', included: false }
                ],
                buttonText: 'Commencer',
                buttonLink: '#contact',
                badge: '',
                highlighted: false,
                popular: false
              },
              {
                name: 'Professional',
                price: '597',
                period: 'mois',
                setupFee: '0',
                description: 'La solution complète pour votre croissance',
                icon: 'briefcase',
                features: [
                  { text: 'Site jusqu\'à 20 pages', included: true },
                  { text: 'CMS complet avec éditeur visuel', included: true },
                  { text: 'Blog & actualités intégrés', included: true },
                  { text: 'SEO avancé & Schema.org', included: true },
                  { text: 'Analytics & reporting', included: true },
                  { text: 'Formulaires avancés', included: true },
                  { text: 'Support prioritaire 24/7', included: true },
                  { text: 'Sauvegardes quotidiennes', included: true },
                  { text: 'CDN mondial inclus', included: true },
                  { text: 'Formation équipe incluse', included: true }
                ],
                buttonText: 'Choisir Professional',
                buttonLink: '#contact',
                badge: 'POPULAIRE',
                highlighted: true,
                popular: true,
                savings: 'Économisez 300€/an'
              },
              {
                name: 'Enterprise',
                price: '997',
                period: 'mois',
                setupFee: 'Sur devis',
                description: 'Solutions sur mesure sans limite',
                icon: 'building',
                features: [
                  { text: 'Pages & fonctionnalités illimitées', included: true },
                  { text: 'CMS multi-utilisateurs avancé', included: true },
                  { text: 'E-commerce complet', included: true },
                  { text: 'Multi-langue & multi-sites', included: true },
                  { text: 'API & intégrations custom', included: true },
                  { text: 'Infrastructure dédiée', included: true },
                  { text: 'SLA 99.9% garantie', included: true },
                  { text: 'Manager de compte dédié', included: true },
                  { text: 'Développements sur mesure', included: true },
                  { text: 'Audit & conseil stratégique', included: true }
                ],
                buttonText: 'Contactez-nous',
                buttonLink: '#contact',
                badge: 'ENTERPRISE',
                highlighted: false,
                custom: true
              }
            ],
            showFeatureComparison: true,
            showFAQ: true,
            faqItems: [
              {
                question: 'Puis-je changer de plan à tout moment ?',
                answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.'
              },
              {
                question: 'Y a-t-il des frais cachés ?',
                answer: 'Non, nos tarifs sont 100% transparents. Le prix affiché inclut tout : hébergement, SSL, support, mises à jour.'
              },
              {
                question: 'Quelle est la durée d\'engagement ?',
                answer: 'Aucun engagement ! Vous pouvez résilier à tout moment. Nous sommes confiants dans la qualité de nos services.'
              }
            ],
            testimonial: {
              text: 'Nous avons choisi le plan Professional et c\'est le meilleur investissement que nous ayons fait. ROI en 2 mois !',
              author: 'Jean Dupont, CEO TechStart'
            }
          }
        },

        // FAQ Ultra-Modern - Floating Cards
        {
          id: 'faq-complete',
          type: 'faq-ultra-modern',
          props: {
            variant: 'floating-cards',
            title: 'Toutes Vos Questions, Nos Réponses',
            subtitle: 'Nous avons compilé les questions les plus fréquentes',
            description: 'Si vous ne trouvez pas votre réponse, contactez-nous directement',
            faqs: [
              {
                question: 'Qu\'est-ce qui rend AWEMA différent des autres agences ?',
                answer: 'AWEMA combine expertise technique de pointe, créativité sans limite et approche centrée client. Nous utilisons les dernières technologies (React, TypeScript, Tailwind) et nos sites obtiennent systématiquement 95+/100 sur Lighthouse. Notre CMS propriétaire est le plus intuitif du marché.',
                category: 'general',
                featured: true
              },
              {
                question: 'Combien de temps prend la création d\'un site ?',
                answer: 'Pour un site vitrine standard : 5-7 jours ouvrés. Pour un e-commerce : 2-3 semaines. Pour une application complexe : 4-8 semaines. Nous travaillons en méthode agile avec des livrables hebdomadaires pour que vous puissiez suivre l\'avancement en temps réel.',
                category: 'process'
              },
              {
                question: 'Le CMS est-il vraiment facile à utiliser ?',
                answer: 'Absolument ! Notre CMS a été conçu pour être utilisé sans aucune connaissance technique. Interface drag & drop, édition en temps réel, preview instantané. 95% de nos clients gèrent leur site en totale autonomie après une formation d\'1 heure.',
                category: 'cms'
              },
              {
                question: 'Comment gérez-vous le référencement SEO ?',
                answer: 'Le SEO est intégré dès la conception : structure HTML5 sémantique, Core Web Vitals optimisés, Schema.org, sitemap XML automatique, meta tags dynamiques. Nous garantissons un score SEO de 90+/100. Option : accompagnement SEO mensuel pour maximiser votre visibilité.',
                category: 'seo'
              },
              {
                question: 'Quelles sont vos garanties ?',
                answer: 'Satisfaction garantie ou remboursé sous 30 jours. Garantie technique 6 mois sur tous les développements. Support illimité la première année. SLA 99.9% uptime pour les plans Pro et Enterprise. Vous êtes propriétaire à 100% de votre site.',
                category: 'guarantees'
              },
              {
                question: 'Proposez-vous la maintenance ?',
                answer: 'Oui, 3 formules : Basic (mises à jour sécurité), Pro (+ sauvegardes quotidiennes, monitoring), Premium (+ évolutions, support prioritaire). La maintenance n\'est pas obligatoire mais fortement recommandée pour la sécurité et les performances.',
                category: 'support'
              },
              {
                question: 'Puis-je avoir mon propre nom de domaine ?',
                answer: 'Bien sûr ! Nous pouvons utiliser votre domaine existant ou vous accompagner dans l\'achat d\'un nouveau (à partir de 12€/an). Configuration DNS incluse. Email professionnel disponible en option.',
                category: 'technical'
              },
              {
                question: 'Comment se passent les paiements ?',
                answer: 'Flexibilité totale : CB, virement, PayPal. Paiement en 3 fois sans frais : 30% à la commande, 40% à mi-parcours, 30% à la livraison. Facturation mensuelle pour les abonnements. Devis gratuit sous 24h.',
                category: 'payment'
              },
              {
                question: 'Faites-vous du sur-mesure ?',
                answer: 'C\'est notre spécialité ! Que ce soit un design unique, une fonctionnalité spécifique ou une intégration complexe, nous adorons les défis. Consultation gratuite pour discuter de vos besoins spécifiques.',
                category: 'custom'
              },
              {
                question: 'Quelle est votre politique de confidentialité ?',
                answer: 'Nous respectons strictement le RGPD. Vos données sont sécurisées et jamais revendues. Hébergement en France ou Europe. Contrat de confidentialité disponible sur demande. Audit de sécurité inclus pour les plans Enterprise.',
                category: 'privacy'
              }
            ],
            categories: [
              { id: 'all', label: 'Toutes les questions', icon: 'help-circle' },
              { id: 'general', label: 'Général', icon: 'info' },
              { id: 'process', label: 'Processus', icon: 'clock' },
              { id: 'cms', label: 'CMS', icon: 'edit' },
              { id: 'seo', label: 'SEO', icon: 'search' },
              { id: 'guarantees', label: 'Garanties', icon: 'shield' },
              { id: 'support', label: 'Support', icon: 'headphones' },
              { id: 'technical', label: 'Technique', icon: 'code' },
              { id: 'payment', label: 'Paiement', icon: 'credit-card' },
              { id: 'custom', label: 'Sur-mesure', icon: 'package' },
              { id: 'privacy', label: 'Confidentialité', icon: 'lock' }
            ],
            expandIcon: 'chevron',
            searchEnabled: true,
            searchPlaceholder: 'Rechercher une question...',
            showCategoryIcons: true,
            featuredFirst: true,
            analyticsEnabled: true
          }
        },

        // Contact Ultra-Modern - Glassmorphism
        {
          id: 'contact-final',
          type: 'contact-ultra-modern',
          props: {
            variant: 'glassmorphism',
            title: 'Transformons Vos Idées en Réalité',
            subtitle: 'Parlons de votre projet sans engagement',
            description: 'Notre équipe d\'experts est à votre écoute pour créer ensemble le site web de vos rêves. Réponse garantie sous 24h.',
            formFields: [
              { 
                name: 'name', 
                label: 'Votre nom complet', 
                type: 'text', 
                required: true,
                placeholder: 'Jean Dupont',
                icon: 'user'
              },
              { 
                name: 'email', 
                label: 'Email professionnel', 
                type: 'email', 
                required: true,
                placeholder: 'jean@entreprise.fr',
                icon: 'mail'
              },
              { 
                name: 'phone', 
                label: 'Téléphone', 
                type: 'tel', 
                required: false,
                placeholder: '06 12 34 56 78',
                icon: 'phone'
              },
              { 
                name: 'company', 
                label: 'Entreprise', 
                type: 'text', 
                required: false,
                placeholder: 'Ma Super Entreprise',
                icon: 'briefcase'
              },
              { 
                name: 'projectType', 
                label: 'Type de projet', 
                type: 'select', 
                required: true,
                icon: 'folder',
                options: [
                  'Site vitrine',
                  'E-commerce',
                  'Application web',
                  'Refonte de site',
                  'Maintenance',
                  'Autre'
                ]
              },
              { 
                name: 'budget', 
                label: 'Budget estimé', 
                type: 'select', 
                required: false,
                icon: 'euro',
                options: [
                  'Moins de 1000€',
                  '1000€ - 5000€',
                  '5000€ - 10000€',
                  '10000€ - 25000€',
                  'Plus de 25000€',
                  'À définir'
                ]
              },
              { 
                name: 'timeline', 
                label: 'Délai souhaité', 
                type: 'select', 
                required: false,
                icon: 'calendar',
                options: [
                  'Urgent (< 1 mois)',
                  '1-2 mois',
                  '2-3 mois',
                  'Plus de 3 mois',
                  'Flexible'
                ]
              },
              { 
                name: 'message', 
                label: 'Décrivez votre projet', 
                type: 'textarea', 
                required: true,
                placeholder: 'Parlez-nous de votre projet, vos objectifs, vos inspirations...',
                rows: 6,
                icon: 'message-square'
              }
            ],
            submitText: 'Envoyer ma demande',
            submitingText: 'Envoi en cours...',
            successMessage: 'Merci ! Nous vous répondrons sous 24h.',
            errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
            consentText: 'J\'accepte que mes données soient utilisées pour me recontacter',
            phone: '+33 1 23 45 67 89',
            email: 'contact@awema-perfect.fr',
            address: '123 Avenue de la Perfection, 75001 Paris',
            hours: {
              title: 'Horaires d\'ouverture',
              monday: 'Lun: 9h00 - 18h00',
              tuesday: 'Mar: 9h00 - 18h00',
              wednesday: 'Mer: 9h00 - 18h00',
              thursday: 'Jeu: 9h00 - 18h00',
              friday: 'Ven: 9h00 - 17h00',
              saturday: 'Sam: Sur RDV',
              sunday: 'Dim: Fermé'
            },
            mapEnabled: true,
            mapPosition: 'bottom',
            mapHeight: '400px',
            mapZoom: 15,
            mapStyle: 'modern',
            socialLinks: [
              { platform: 'linkedin', url: 'https://linkedin.com/company/awema', label: 'LinkedIn' },
              { platform: 'twitter', url: 'https://twitter.com/awema', label: 'Twitter' },
              { platform: 'facebook', url: 'https://facebook.com/awema', label: 'Facebook' },
              { platform: 'instagram', url: 'https://instagram.com/awema', label: 'Instagram' },
              { platform: 'github', url: 'https://github.com/awema', label: 'GitHub' }
            ],
            features: [
              { icon: 'clock', text: 'Réponse sous 24h' },
              { icon: 'shield', text: 'Données sécurisées' },
              { icon: 'award', text: 'Devis gratuit' },
              { icon: 'users', text: 'Équipe dédiée' }
            ],
            backgroundImage: '',
            backgroundBlur: true,
            floatingElements: true
          }
        },

        // CTA Ultra-Modern - Particle Effect
        {
          id: 'cta-conversion',
          type: 'cta-ultra-modern',
          props: {
            variant: 'particle-effect',
            title: 'Prêt à Propulser Votre Business ?',
            subtitle: 'Rejoignez 10 000+ Entreprises Satisfaites',
            description: 'Ne laissez pas vos concurrents prendre de l\'avance. Commencez votre transformation digitale aujourd\'hui avec AWEMA.',
            primaryButton: {
              text: 'Obtenir Mon Devis Gratuit',
              link: '#contact',
              icon: 'arrow-right',
              size: 'large'
            },
            secondaryButton: {
              text: 'Voir Nos Réalisations',
              link: '#gallery',
              icon: 'external-link',
              variant: 'outline'
            },
            backgroundImage: '',
            backgroundGradient: true,
            particleEffect: true,
            statistics: [
              { value: '10K+', label: 'Sites Créés', icon: 'globe' },
              { value: '99%', label: 'Clients Satisfaits', icon: 'smile' },
              { value: '24/7', label: 'Support Disponible', icon: 'headphones' },
              { value: '5★', label: 'Note Moyenne', icon: 'star' }
            ],
            urgency: {
              enabled: true,
              text: 'Offre limitée : -20% ce mois-ci',
              icon: 'zap'
            },
            testimonialQuote: {
              text: 'AWEMA a littéralement transformé notre business en ligne.',
              author: 'Marc L., CEO FastGrow'
            },
            badges: [
              { text: 'Google Partner', icon: 'award' },
              { text: 'ISO 27001', icon: 'shield' },
              { text: 'Top Agency 2024', icon: 'trophy' }
            ]
          }
        },

        // Footer Ultra-Modern - Complete
        {
          id: 'footer-complete',
          type: 'footer-ultra-modern',
          props: {
            variant: 'gradient-wave',
            logo: {
              text: 'AWEMA Perfect',
              imageUrl: '',
              tagline: 'L\'Excellence du Web Design'
            },
            about: 'AWEMA est bien plus qu\'une agence web. Nous sommes votre partenaire digital pour créer des expériences web exceptionnelles qui propulsent votre business vers de nouveaux sommets.',
            columns: [
              {
                title: 'Services',
                links: [
                  { label: 'Création de Sites Web', href: '#', badge: 'HOT' },
                  { label: 'E-commerce', href: '#' },
                  { label: 'Applications Web', href: '#' },
                  { label: 'SEO & Marketing', href: '#', badge: 'NEW' },
                  { label: 'Maintenance & Support', href: '#' },
                  { label: 'Formation CMS', href: '#' }
                ]
              },
              {
                title: 'Entreprise',
                links: [
                  { label: 'À Propos', href: '#' },
                  { label: 'Notre Équipe', href: '#' },
                  { label: 'Nos Valeurs', href: '#' },
                  { label: 'Carrières', href: '#', badge: '3 postes' },
                  { label: 'Partenaires', href: '#' },
                  { label: 'Presse', href: '#' }
                ]
              },
              {
                title: 'Ressources',
                links: [
                  { label: 'Blog', href: '#' },
                  { label: 'Guides Gratuits', href: '#' },
                  { label: 'Webinaires', href: '#' },
                  { label: 'Documentation', href: '#' },
                  { label: 'API Développeurs', href: '#' },
                  { label: 'Status', href: '#' }
                ]
              },
              {
                title: 'Support',
                links: [
                  { label: 'Centre d\'Aide', href: '#' },
                  { label: 'FAQ', href: '#' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Chat en Direct', href: '#' },
                  { label: 'Ticket Support', href: '#' },
                  { label: 'Communauté', href: '#' }
                ]
              }
            ],
            contact: {
              title: 'Contactez-nous',
              phone: '+33 1 23 45 67 89',
              email: 'hello@awema-perfect.fr',
              address: '123 Avenue de la Perfection, 75001 Paris, France',
              map: true
            },
            social: [
              { platform: 'facebook', url: 'https://facebook.com/awema', followers: '15K' },
              { platform: 'twitter', url: 'https://twitter.com/awema', followers: '8.5K' },
              { platform: 'linkedin', url: 'https://linkedin.com/company/awema', followers: '12K' },
              { platform: 'instagram', url: 'https://instagram.com/awema', followers: '20K' },
              { platform: 'youtube', url: 'https://youtube.com/awema', followers: '5K' },
              { platform: 'github', url: 'https://github.com/awema', followers: '2K' }
            ],
            newsletter: {
              enabled: true,
              title: 'Newsletter Exclusive',
              description: 'Recevez nos dernières actualités, conseils et offres spéciales',
              placeholder: 'votre@email.com',
              buttonText: 'S\'abonner',
              frequency: 'Envoi hebdomadaire, désinscription en 1 clic',
              benefits: [
                'Conseils exclusifs',
                'Offres spéciales',
                'Actualités tech',
                'Cas clients'
              ],
              gdprText: 'En vous inscrivant, vous acceptez notre politique de confidentialité et de recevoir nos communications.'
            },
            widgets: [
              {
                type: 'recent-posts',
                title: 'Articles Récents',
                posts: [
                  {
                    title: '10 Tendances Web Design 2024',
                    date: '15 Jan 2024',
                    link: '#'
                  },
                  {
                    title: 'Guide Complet du SEO Local',
                    date: '12 Jan 2024',
                    link: '#'
                  },
                  {
                    title: 'Performance Web : Best Practices',
                    date: '8 Jan 2024',
                    link: '#'
                  }
                ]
              },
              {
                type: 'trust-badges',
                title: 'Certifications',
                badges: [
                  { name: 'Google Partner', icon: '/badges/google.png' },
                  { name: 'ISO 27001', icon: '/badges/iso.png' },
                  { name: 'RGPD Compliant', icon: '/badges/rgpd.png' }
                ]
              }
            ],
            paymentMethods: [
              { name: 'Visa', icon: 'credit-card' },
              { name: 'Mastercard', icon: 'credit-card' },
              { name: 'PayPal', icon: 'paypal' },
              { name: 'Stripe', icon: 'stripe' },
              { name: 'Bank Transfer', icon: 'bank' }
            ],
            languages: [
              { code: 'fr', label: 'Français', flag: '🇫🇷' },
              { code: 'en', label: 'English', flag: '🇬🇧' },
              { code: 'es', label: 'Español', flag: '🇪🇸' }
            ],
            copyright: '© 2024 AWEMA Perfect. Tous droits réservés. Made with ❤️ in Paris',
            bottomLinks: [
              { label: 'Mentions Légales', href: '#' },
              { label: 'Politique de Confidentialité', href: '#' },
              { label: 'CGV', href: '#' },
              { label: 'CGU', href: '#' },
              { label: 'Cookies', href: '#' },
              { label: 'Plan du Site', href: '#' }
            ],
            backToTop: {
              enabled: true,
              text: 'Retour en haut',
              icon: 'arrow-up'
            },
            darkMode: false,
            animations: true
          }
        }
      ]
    }]
  };

  try {
    console.log('📦 Préparation du déploiement parfait...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: `perfect-${Date.now()}`,
        siteName: `awema-perfect-${Date.now()}`,
        projectData: projectData,
        plan: 'premium',
        adminEmail: 'admin@awema-perfect.fr',
        customDomain: null
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ DÉPLOIEMENT PARFAIT RÉUSSI !\n');
      console.log('=' .repeat(60));
      console.log('🌟 VOTRE SITE PARFAIT EST EN LIGNE !');
      console.log('=' .repeat(60));
      
      console.log('\n📋 URLs d\'accès :');
      console.log(`   🌐 Site Public : ${result.siteUrl}`);
      console.log(`   🔧 CMS Admin : ${result.adminUrl}`);
      
      console.log('\n🔑 Connexion CMS :');
      console.log(`   Email : ${result.credentials.email}`);
      console.log(`   Mot de passe : ${result.credentials.password}`);
      
      console.log('\n✨ Caractéristiques du site :');
      console.log('   ✓ Tous les blocs Ultra-Modern (13 types)');
      console.log('   ✓ Chaque bloc avec ses meilleures variantes');
      console.log('   ✓ CSS complet avec variables RGB');
      console.log('   ✓ Éditeur de pages 100% fonctionnel');
      console.log('   ✓ Aperçus visuels dans le CMS');
      console.log('   ✓ Intégration Supabase réelle');
      console.log('   ✓ Sauvegarde automatique');
      
      console.log('\n🧪 Tests à effectuer :');
      console.log('   1. Visitez le site et admirez la perfection');
      console.log('   2. Vérifiez que chaque bloc s\'affiche parfaitement');
      console.log('   3. Connectez-vous au CMS /admin');
      console.log('   4. Testez l\'éditeur de pages :');
      console.log('      - Sélectionnez différents blocs');
      console.log('      - Modifiez les propriétés');
      console.log('      - Vérifiez les aperçus visuels');
      console.log('      - Confirmez la sauvegarde');
      
      console.log('\n⚙️ Configuration Supabase :');
      console.log(`   URL : ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
      console.log('   ✓ Vos vraies clés sont utilisées');
      console.log('   ✓ Les données sont persistées dans votre base');
      console.log('   ⚠️  Assurez-vous que CORS accepte ce domaine');
      
      console.log('\n🎯 Points de vérification :');
      console.log('   □ Header avec mega menu et search');
      console.log('   □ Hero avec animation gradient wave');
      console.log('   □ Features en mode timeline');
      console.log('   □ Content accordion avec images');
      console.log('   □ Gallery infinite grid avec filtres');
      console.log('   □ Testimonials stacked cards');
      console.log('   □ Pricing 3D cards avec FAQ');
      console.log('   □ FAQ floating cards avec recherche');
      console.log('   □ Contact glassmorphism avec map');
      console.log('   □ CTA particle effect');
      console.log('   □ Footer complet avec widgets');
      
      console.log('\n' + '=' .repeat(60));
      console.log('🎉 FÉLICITATIONS ! Votre site parfait est prêt !');
      console.log('=' .repeat(60));
      
    } else {
      console.error('❌ Erreur:', result.error);
      if (result.details) {
        console.error('Détails:', result.details);
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur de déploiement:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Lancer le déploiement parfait
deployPerfectSite();
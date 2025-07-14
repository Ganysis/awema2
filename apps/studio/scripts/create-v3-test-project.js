#!/usr/bin/env node

/**
 * Script pour créer un projet de test avec tous les blocs V3
 */

const fs = require('fs').promises;
const path = require('path');

async function createV3TestProject() {
  console.log('=== Création d\'un projet avec tous les blocs V3 ===\n');

  try {
    const API_URL = 'http://localhost:3000/api/projects';
    
    const projectData = {
      name: 'Test Complet V3 Blocks',
      clientName: 'Demo V3',
      description: 'Projet de démonstration avec tous les blocs V3 Perfect',
      industry: 'technology',
      businessInfo: {
        name: 'Tech Solutions V3',
        description: 'Entreprise de technologie moderne',
        address: '123 rue de la Tech',
        city: 'Paris',
        postalCode: '75001',
        phone: '01 23 45 67 89',
        email: 'contact@techv3.fr',
        website: 'https://techv3.fr'
      },
      theme: {
        colors: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#ec4899',
          background: '#ffffff',
          surface: '#f9fafb',
          text: '#111827',
          textMuted: '#6b7280'
        },
        typography: {
          fontFamily: {
            heading: 'Inter',
            body: 'Inter'
          },
          fontSize: {
            base: 16
          },
          lineHeight: {
            base: 1.5,
            heading: 1.2
          }
        }
      },
      pages: [
        {
          id: 'home',
          name: 'Accueil',
          slug: '/',
          seo: {
            title: 'Test V3 Blocks - Démonstration complète',
            description: 'Page de test avec tous les blocs V3 Perfect',
            keywords: ['v3', 'blocks', 'demo', 'test']
          },
          blocks: [
            // Hero V3 Perfect
            {
              id: 'hero-v3-1',
              type: 'hero-v3-perfect',
              props: {
                variant: 'split-modern',
                content: {
                  title: 'Bienvenue dans V3 Perfect',
                  subtitle: 'Architecture Ultra-Moderne',
                  description: 'Découvrez la nouvelle génération de blocs avec des performances exceptionnelles et un design époustouflant.',
                  primaryButton: {
                    text: 'Découvrir',
                    link: '#features'
                  },
                  secondaryButton: {
                    text: 'Documentation',
                    link: '#docs'
                  }
                },
                media: {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop',
                  alt: 'Hero V3'
                },
                settings: {
                  height: 'screen',
                  contentPosition: 'center-left',
                  theme: 'light',
                  animation: true
                }
              }
            },
            // Features V3 Perfect
            {
              id: 'features-v3-1',
              type: 'features-v3-perfect',
              props: {
                variant: 'bento-box',
                content: {
                  title: 'Fonctionnalités Révolutionnaires',
                  subtitle: 'Tout ce dont vous avez besoin',
                  features: [
                    {
                      id: 'f1',
                      icon: 'zap',
                      title: 'Ultra Rapide',
                      description: 'Performance optimale avec temps de chargement < 1s',
                      color: '#3b82f6',
                      size: 'large'
                    },
                    {
                      id: 'f2',
                      icon: 'shield',
                      title: 'Sécurisé',
                      description: 'Protection maximale avec SSL et chiffrement',
                      color: '#10b981'
                    },
                    {
                      id: 'f3',
                      icon: 'globe',
                      title: 'Global',
                      description: 'CDN mondial pour une disponibilité 24/7',
                      color: '#8b5cf6'
                    },
                    {
                      id: 'f4',
                      icon: 'trending-up',
                      title: 'Évolutif',
                      description: 'Architecture scalable sans limites',
                      color: '#f59e0b'
                    },
                    {
                      id: 'f5',
                      icon: 'cpu',
                      title: 'IA Intégrée',
                      description: 'Intelligence artificielle pour automatiser',
                      color: '#ec4899',
                      size: 'large'
                    }
                  ]
                },
                settings: {
                  animation: true,
                  theme: 'light'
                }
              }
            },
            // Services V3 Perfect
            {
              id: 'services-v3-1',
              type: 'services-v3-perfect',
              props: {
                variant: 'hexagon',
                content: {
                  title: 'Nos Services Premium',
                  subtitle: 'Solutions sur mesure pour votre succès',
                  services: [
                    {
                      id: 's1',
                      icon: 'code',
                      title: 'Développement Web',
                      description: 'Applications web modernes avec React, Next.js et les dernières technologies',
                      price: 'À partir de 3000€',
                      features: ['React/Next.js', 'API REST/GraphQL', 'PWA', 'SEO avancé'],
                      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
                      color: '#3b82f6'
                    },
                    {
                      id: 's2',
                      icon: 'smartphone',
                      title: 'Apps Mobiles',
                      description: 'Applications natives iOS et Android haute performance',
                      price: 'À partir de 8000€',
                      features: ['React Native', 'Flutter', 'Native', 'Cross-platform'],
                      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
                      color: '#10b981'
                    },
                    {
                      id: 's3',
                      icon: 'cloud',
                      title: 'Cloud & DevOps',
                      description: 'Infrastructure cloud moderne et automatisée',
                      price: 'Sur devis',
                      features: ['AWS/Azure/GCP', 'Kubernetes', 'CI/CD', 'Monitoring'],
                      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
                      color: '#8b5cf6'
                    },
                    {
                      id: 's4',
                      icon: 'brain',
                      title: 'IA & Machine Learning',
                      description: 'Solutions intelligentes avec IA avancée',
                      price: 'Personnalisé',
                      features: ['Deep Learning', 'NLP', 'Computer Vision', 'Prédictions'],
                      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
                      color: '#ec4899'
                    }
                  ]
                },
                settings: {
                  showPrices: true,
                  animation: true
                }
              }
            },
            // Gallery V3 Perfect
            {
              id: 'gallery-v3-1',
              type: 'gallery-v3-perfect',
              props: {
                variant: 'masonry-flow',
                content: {
                  title: 'Portfolio V3',
                  subtitle: 'Nos dernières réalisations',
                  images: [
                    {
                      id: 'g1',
                      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                      alt: 'Dashboard moderne',
                      title: 'Dashboard Analytics',
                      category: 'Web App'
                    },
                    {
                      id: 'g2',
                      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
                      alt: 'App mobile',
                      title: 'Mobile Banking',
                      category: 'Mobile',
                      size: 'tall'
                    },
                    {
                      id: 'g3',
                      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
                      alt: 'Data visualization',
                      title: 'Data Platform',
                      category: 'Big Data',
                      size: 'wide'
                    },
                    {
                      id: 'g4',
                      src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
                      alt: 'E-commerce',
                      title: 'Shop Online',
                      category: 'E-commerce'
                    }
                  ]
                },
                settings: {
                  columns: 3,
                  gap: 20,
                  lightbox: true,
                  filters: true,
                  animation: true
                }
              }
            },
            // Pricing V3 Perfect
            {
              id: 'pricing-v3-1',
              type: 'pricing-v3-perfect',
              props: {
                variant: 'cards-gradient',
                content: {
                  title: 'Tarifs Transparents',
                  subtitle: 'Choisissez l\'offre qui vous convient',
                  plans: [
                    {
                      id: 'p1',
                      name: 'Starter',
                      price: '29€',
                      period: 'mois',
                      description: 'Parfait pour débuter',
                      features: [
                        '1 site web',
                        'Support email',
                        'SSL gratuit',
                        'Sauvegarde hebdo'
                      ],
                      recommended: false,
                      color: '#6b7280'
                    },
                    {
                      id: 'p2',
                      name: 'Pro',
                      price: '79€',
                      period: 'mois',
                      description: 'Pour les professionnels',
                      features: [
                        '5 sites web',
                        'Support prioritaire',
                        'SSL + CDN',
                        'Sauvegarde journalière',
                        'Analytics avancés'
                      ],
                      recommended: true,
                      color: '#3b82f6'
                    },
                    {
                      id: 'p3',
                      name: 'Enterprise',
                      price: '299€',
                      period: 'mois',
                      description: 'Solutions sur mesure',
                      features: [
                        'Sites illimités',
                        'Support 24/7',
                        'Infrastructure dédiée',
                        'SLA 99.9%',
                        'Formation incluse'
                      ],
                      recommended: false,
                      color: '#8b5cf6'
                    }
                  ]
                },
                settings: {
                  showComparison: true,
                  animation: true
                }
              }
            },
            // Testimonials V3 Perfect
            {
              id: 'testimonials-v3-1',
              type: 'testimonials-v3-perfect',
              props: {
                variant: 'carousel-3d',
                content: {
                  title: 'Ce que disent nos clients',
                  subtitle: 'Plus de 1000 clients satisfaits',
                  testimonials: [
                    {
                      id: 't1',
                      author: 'Marie Dupont',
                      role: 'CEO',
                      company: 'TechCorp',
                      content: 'Service exceptionnel ! L\'équipe V3 a transformé notre présence digitale.',
                      rating: 5,
                      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                      featured: true
                    },
                    {
                      id: 't2',
                      author: 'Jean Martin',
                      role: 'CTO',
                      company: 'StartupXYZ',
                      content: 'Performance incroyable et support technique au top. Je recommande !',
                      rating: 5,
                      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
                    },
                    {
                      id: 't3',
                      author: 'Sophie Bernard',
                      role: 'Marketing Director',
                      company: 'Fashion Plus',
                      content: 'Notre site e-commerce n\'a jamais été aussi rapide. Merci V3 !',
                      rating: 5,
                      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
                    }
                  ]
                },
                settings: {
                  autoplay: true,
                  showRating: true,
                  animation: true
                }
              }
            },
            // FAQ V3 Perfect
            {
              id: 'faq-v3-1',
              type: 'faq-v3-perfect',
              props: {
                variant: 'accordion-modern',
                content: {
                  title: 'Questions Fréquentes',
                  subtitle: 'Tout ce que vous devez savoir',
                  categories: [
                    {
                      id: 'cat1',
                      name: 'Général',
                      questions: [
                        {
                          id: 'q1',
                          question: 'Qu\'est-ce que V3 Perfect ?',
                          answer: 'V3 Perfect est notre nouvelle génération de blocs ultra-performants avec des designs modernes et des animations avancées.'
                        },
                        {
                          id: 'q2',
                          question: 'Quels sont les avantages ?',
                          answer: 'Performance optimale, SEO avancé, design responsive, animations fluides, et personnalisation complète.'
                        }
                      ]
                    },
                    {
                      id: 'cat2',
                      name: 'Technique',
                      questions: [
                        {
                          id: 'q3',
                          question: 'Quelles technologies utilisez-vous ?',
                          answer: 'React, Next.js, TypeScript, Tailwind CSS, et les dernières innovations web.'
                        },
                        {
                          id: 'q4',
                          question: 'Est-ce compatible mobile ?',
                          answer: 'Oui, tous nos blocs sont 100% responsive et optimisés pour tous les appareils.'
                        }
                      ]
                    }
                  ]
                },
                settings: {
                  expandFirst: true,
                  showCategories: true,
                  searchable: true,
                  animation: true
                }
              }
            },
            // CTA V3 Perfect
            {
              id: 'cta-v3-1',
              type: 'cta-v3-perfect',
              props: {
                variant: 'gradient-wave',
                content: {
                  title: 'Prêt à passer au niveau supérieur ?',
                  subtitle: 'Rejoignez des milliers d\'entreprises qui nous font confiance',
                  primaryButton: {
                    text: 'Commencer Maintenant',
                    link: '#contact'
                  },
                  secondaryButton: {
                    text: 'Voir une démo',
                    link: '#demo'
                  },
                  features: [
                    'Setup en 5 minutes',
                    'Support 24/7',
                    'Garantie satisfait ou remboursé'
                  ]
                },
                settings: {
                  animation: 'wave',
                  countdown: false,
                  urgency: true
                }
              }
            },
            // Contact V3 Perfect
            {
              id: 'contact-v3-1',
              type: 'contact-v3-perfect',
              props: {
                variant: 'split-glass',
                content: {
                  title: 'Contactez-nous',
                  subtitle: 'Nous sommes là pour vous aider',
                  info: {
                    address: '123 Avenue des Champs-Élysées, 75008 Paris',
                    phone: '+33 1 23 45 67 89',
                    email: 'contact@v3perfect.fr',
                    hours: 'Lun-Ven: 9h-18h'
                  },
                  form: {
                    fields: [
                      { id: 'name', type: 'text', label: 'Nom', required: true },
                      { id: 'email', type: 'email', label: 'Email', required: true },
                      { id: 'phone', type: 'tel', label: 'Téléphone', required: false },
                      { id: 'message', type: 'textarea', label: 'Message', required: true }
                    ],
                    submitText: 'Envoyer',
                    successMessage: 'Message envoyé avec succès !'
                  }
                },
                settings: {
                  showMap: true,
                  mapPosition: 'right',
                  animation: true,
                  validation: 'realtime'
                }
              }
            }
          ]
        }
      ]
    };

    // Faire l'appel API pour créer le projet
    console.log('Envoi de la requête à l\'API...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur API: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log('\n✅ Projet créé avec succès !');
    console.log('ID du projet:', result.id);
    console.log('\n📝 Pour ouvrir dans l\'éditeur:');
    console.log(`http://localhost:3000/editor/${result.id}`);
    
    // Sauvegarder aussi en JSON pour référence
    await fs.writeFile(
      path.join(__dirname, 'v3-test-project-complete.json'),
      JSON.stringify(projectData, null, 2)
    );
    
    console.log('\n✅ Données sauvegardées dans: v3-test-project-complete.json');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error('\nAssurez-vous que:');
    console.error('1. Le serveur Next.js est en cours d\'exécution (npm run dev)');
    console.error('2. Le port 3000 est correct');
    console.error('3. L\'API est accessible');
  }
}

// Exécuter
createV3TestProject();
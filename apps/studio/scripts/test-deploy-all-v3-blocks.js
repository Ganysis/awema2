const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const NETLIFY_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;

// Créer un projet avec tous les blocs v3
async function createProjectWithAllV3Blocks() {
  console.log('📦 Création d\'un projet avec tous les blocs v3...');

  const projectData = {
    name: 'Test V3 Complet',
    description: 'Test de déploiement avec tous les blocs v3',
    clientId: 'test-client-v3',
    template: 'plumber'
  };

  // Après création, on mettra à jour avec les pages
  const projectPages = [
      {
        id: 'home',
        name: 'Home',
        title: 'Test V3 - Tous les blocs',
        description: 'Page de test avec tous les blocs v3',
        path: '/',
        blocks: [
          // Hero V3
          {
            id: 'hero-v3-test',
            type: 'HeroV3Perfect',
            data: {
              title: 'Test de tous les blocs V3',
              subtitle: 'Cette page teste le déploiement avec tous les nouveaux blocs',
              primaryButton: {
                text: 'Découvrir',
                href: '#features'
              },
              secondaryButton: {
                text: 'En savoir plus',
                href: '#contact'
              },
              image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1920&h=1080&fit=crop',
              variant: 'gradient',
              alignment: 'center'
            }
          },
          // Features V3
          {
            id: 'features-v3-test',
            type: 'FeaturesV3Perfect',
            data: {
              title: 'Fonctionnalités V3',
              subtitle: 'Découvrez nos nouvelles fonctionnalités',
              features: [
                {
                  id: '1',
                  title: 'Design Moderne',
                  description: 'Interface utilisateur épurée et moderne',
                  icon: 'star',
                  image: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=400&h=300&fit=crop'
                },
                {
                  id: '2',
                  title: 'Performance Optimale',
                  description: 'Chargement rapide et expérience fluide',
                  icon: 'zap',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
                },
                {
                  id: '3',
                  title: 'SEO Avancé',
                  description: 'Optimisation pour les moteurs de recherche',
                  icon: 'search',
                  image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=400&h=300&fit=crop'
                }
              ],
              variant: 'grid',
              showImages: true
            }
          },
          // Services V3
          {
            id: 'services-v3-test',
            type: 'ServicesV3Perfect',
            data: {
              title: 'Nos Services V3',
              subtitle: 'Des solutions adaptées à vos besoins',
              services: [
                {
                  id: '1',
                  title: 'Développement Web',
                  description: 'Sites web modernes et performants',
                  icon: 'code',
                  features: ['React/Next.js', 'API REST', 'Base de données'],
                  image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop',
                  price: '1500€'
                },
                {
                  id: '2',
                  title: 'Design UI/UX',
                  description: 'Interfaces intuitives et attractives',
                  icon: 'palette',
                  features: ['Maquettes', 'Prototypes', 'Design system'],
                  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
                  price: '1200€'
                },
                {
                  id: '3',
                  title: 'SEO & Marketing',
                  description: 'Visibilité et croissance en ligne',
                  icon: 'trending-up',
                  features: ['Audit SEO', 'Stratégie', 'Analytics'],
                  image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop',
                  price: '800€'
                }
              ],
              variant: 'cards',
              showPrices: true
            }
          },
          // Pricing Ultra-Modern
          {
            id: 'pricing-ultra-test',
            type: 'PricingUltraModern',
            data: {
              title: 'Nos Tarifs',
              subtitle: 'Des prix transparents et compétitifs',
              plans: [
                {
                  id: '1',
                  name: 'Starter',
                  price: '29',
                  period: 'mois',
                  description: 'Pour débuter',
                  features: [
                    '1 site web',
                    'Support email',
                    'SSL gratuit',
                    'Analytics de base'
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
                    'Support prioritaire',
                    'SSL gratuit',
                    'Analytics avancés',
                    'CMS intégré',
                    'Sauvegardes auto'
                  ],
                  highlighted: true,
                  badge: 'Populaire',
                  ctaText: 'Essai gratuit',
                  ctaHref: '#contact'
                },
                {
                  id: '3',
                  name: 'Enterprise',
                  price: '199',
                  period: 'mois',
                  description: 'Pour les grandes équipes',
                  features: [
                    'Sites illimités',
                    'Support 24/7',
                    'SSL gratuit',
                    'Analytics complets',
                    'CMS avancé',
                    'API access',
                    'White label'
                  ],
                  highlighted: false,
                  ctaText: 'Nous contacter',
                  ctaHref: '#contact'
                }
              ],
              variant: 'gradient'
            }
          },
          // Gallery Ultra-Modern
          {
            id: 'gallery-ultra-test',
            type: 'GalleryUltraModern',
            data: {
              title: 'Galerie Ultra-Moderne',
              subtitle: 'Découvrez nos réalisations',
              images: [
                {
                  id: '1',
                  src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                  alt: 'Projet 1',
                  title: 'Site E-commerce',
                  category: 'Web'
                },
                {
                  id: '2',
                  src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                  alt: 'Projet 2',
                  title: 'Dashboard Analytics',
                  category: 'App'
                },
                {
                  id: '3',
                  src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
                  alt: 'Projet 3',
                  title: 'Application Mobile',
                  category: 'Mobile'
                },
                {
                  id: '4',
                  src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
                  alt: 'Projet 4',
                  title: 'Branding',
                  category: 'Design'
                },
                {
                  id: '5',
                  src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
                  alt: 'Projet 5',
                  title: 'Développement API',
                  category: 'Backend'
                },
                {
                  id: '6',
                  src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
                  alt: 'Projet 6',
                  title: 'Design System',
                  category: 'Design'
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
            id: 'testimonials-ultra-test',
            type: 'TestimonialsUltraModern',
            data: {
              title: 'Témoignages Clients',
              subtitle: 'Ce que nos clients disent de nous',
              testimonials: [
                {
                  id: '1',
                  name: 'Sophie Martin',
                  role: 'CEO, TechStart',
                  content: 'Service exceptionnel ! L\'équipe a dépassé toutes nos attentes.',
                  rating: 5,
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                  verified: true
                },
                {
                  id: '2',
                  name: 'Thomas Dubois',
                  role: 'Directeur Marketing',
                  content: 'Un travail de qualité professionnelle. Je recommande vivement !',
                  rating: 5,
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                  verified: true,
                  featured: true
                },
                {
                  id: '3',
                  name: 'Marie Lefebvre',
                  role: 'Fondatrice, CreativeHub',
                  content: 'Collaboration fluide et résultats impressionnants.',
                  rating: 5,
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
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
            id: 'faq-v3-test',
            type: 'FAQV3Perfect',
            data: {
              title: 'Questions Fréquentes',
              subtitle: 'Tout ce que vous devez savoir',
              faqs: [
                {
                  id: '1',
                  question: 'Comment fonctionne le processus de création ?',
                  answer: 'Notre processus est simple et efficace. Nous commençons par une analyse de vos besoins, puis nous créons une maquette, et enfin nous développons votre solution.'
                },
                {
                  id: '2',
                  question: 'Quels sont les délais de livraison ?',
                  answer: 'Les délais varient selon la complexité du projet. En général, comptez 2-4 semaines pour un site web standard et 1-3 mois pour une application complexe.'
                },
                {
                  id: '3',
                  question: 'Proposez-vous un support après livraison ?',
                  answer: 'Oui, nous offrons différents niveaux de support selon vos besoins. Du support email basique au support 24/7 pour les entreprises.'
                }
              ],
              variant: 'modern'
            }
          },
          // Contact Ultra-Modern
          {
            id: 'contact-ultra-test',
            type: 'ContactUltraModern',
            data: {
              title: 'Contactez-nous',
              subtitle: 'Nous sommes là pour vous aider',
              email: 'contact@test-v3.com',
              phone: '+33 1 23 45 67 89',
              address: '123 Rue du Test, 75001 Paris',
              hours: {
                weekdays: '9h - 18h',
                saturday: '10h - 16h',
                sunday: 'Fermé'
              },
              socials: {
                facebook: 'https://facebook.com/testv3',
                twitter: 'https://twitter.com/testv3',
                instagram: 'https://instagram.com/testv3',
                linkedin: 'https://linkedin.com/company/testv3'
              },
              showMap: true,
              mapPosition: 'right',
              variant: 'glassmorphism',
              formFields: [
                { id: 'name', label: 'Nom', type: 'text', required: true },
                { id: 'email', label: 'Email', type: 'email', required: true },
                { id: 'phone', label: 'Téléphone', type: 'tel' },
                { id: 'subject', label: 'Sujet', type: 'text', required: true },
                { id: 'message', label: 'Message', type: 'textarea', required: true }
              ]
            }
          },
          // CTA Ultra-Modern
          {
            id: 'cta-ultra-test',
            type: 'CTAUltraModern',
            data: {
              title: 'Prêt à démarrer votre projet ?',
              subtitle: 'Contactez-nous dès aujourd\'hui pour une consultation gratuite',
              primaryButton: {
                text: 'Commencer maintenant',
                href: '#contact'
              },
              secondaryButton: {
                text: 'En savoir plus',
                href: '#services'
              },
              variant: 'gradient-wave',
              backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop'
            }
          }
        ]
      }
    ];

  // Créer le projet via l'API
  console.log('📡 Envoi de la requête à:', `${API_BASE_URL}/projects`);
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Réponse d\'erreur:', errorText);
    throw new Error(`Erreur lors de la création du projet: ${response.statusText} - ${errorText}`);
  }

  const project = await response.json();
  console.log('✅ Projet créé avec succès:', project.id);
  
  // Maintenant, mettre à jour le projet avec les pages et le thème
  console.log('📝 Mise à jour du projet avec les blocs V3...');
  
  const updateData = {
    businessInfo: {
      name: 'Test V3 Company',
      email: 'contact@test-v3.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue du Test, 75001 Paris'
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
    pages: projectPages
  };
  
  const updateResponse = await fetch(`${API_BASE_URL}/projects/${project.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: updateData })
  });
  
  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    console.error('❌ Erreur lors de la mise à jour:', errorText);
    throw new Error(`Erreur lors de la mise à jour du projet: ${errorText}`);
  }
  
  const updatedProject = await updateResponse.json();
  console.log('✅ Projet mis à jour avec les blocs V3');
  
  return updatedProject;
}

// Déployer le projet sur Netlify
async function deployProject(projectId) {
  console.log('🚀 Déploiement du projet sur Netlify...');

  if (!NETLIFY_TOKEN) {
    console.error('❌ Token Netlify non trouvé. Configurez NETLIFY_ACCESS_TOKEN dans .env.local');
    return;
  }

  const deployData = {
    projectId,
    siteName: `test-v3-blocks-${Date.now()}`,
    netlifyToken: NETLIFY_TOKEN,
    domainType: 'subdomain',
    cmsLevel: 'full'
  };

  const response = await fetch(`${API_BASE_URL}/deploy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deployData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erreur lors du déploiement: ${error}`);
  }

  const result = await response.json();
  console.log('✅ Déploiement réussi !');
  console.log('🌐 URL du site:', result.url);
  console.log('📊 Dashboard Netlify:', result.adminUrl);
  
  return result;
}

// Fonction principale
async function main() {
  try {
    console.log('🎯 Test de déploiement avec tous les blocs V3\n');

    // 1. Créer le projet
    const project = await createProjectWithAllV3Blocks();

    // 2. Attendre un peu pour que le projet soit bien enregistré
    console.log('\n⏳ Attente de 2 secondes...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Déployer le projet
    const deployment = await deployProject(project.id);

    // 4. Sauvegarder les informations de déploiement
    const deploymentInfo = {
      projectId: project.id,
      projectName: project.name,
      deploymentUrl: deployment.url,
      netlifyDashboard: deployment.adminUrl,
      deployedAt: new Date().toISOString(),
      blocksIncluded: [
        'HeroV3Perfect',
        'FeaturesV3Perfect',
        'ServicesV3Perfect',
        'PricingUltraModern',
        'GalleryUltraModern',
        'TestimonialsUltraModern',
        'FAQV3Perfect',
        'ContactUltraModern',
        'CTAUltraModern'
      ]
    };

    await fs.writeFile(
      path.join(__dirname, 'test-v3-deployment.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('\n🎉 Test de déploiement terminé avec succès !');
    console.log('📄 Informations sauvegardées dans test-v3-deployment.json');
    console.log('\n📋 Résumé:');
    console.log(`- Projet: ${project.name} (${project.id})`);
    console.log(`- URL: ${deployment.url}`);
    console.log(`- Blocs V3 testés: ${deploymentInfo.blocksIncluded.length}`);
    console.log('\n🔍 Vérifiez le site pour vous assurer que tous les blocs s\'affichent correctement.');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

// Lancer le script
main();
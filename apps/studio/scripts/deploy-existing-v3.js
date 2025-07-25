const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const NETLIFY_TOKEN = process.env.NETLIFY_ACCESS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;

// Créer des blocs V3 pour test
function createV3Blocks() {
  return [
    // Hero V3
    {
      id: 'hero-v3-' + Date.now(),
      type: 'HeroV3Perfect',
      data: {
        title: 'Test Déploiement V3',
        subtitle: 'Tous les nouveaux blocs en action',
        primaryButton: {
          text: 'Découvrir',
          href: '#features'
        },
        secondaryButton: {
          text: 'Contact',
          href: '#contact'
        },
        image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1920&h=1080&fit=crop',
        variant: 'gradient',
        alignment: 'center'
      }
    },
    // Features V3
    {
      id: 'features-v3-' + Date.now(),
      type: 'FeaturesV3Perfect',
      data: {
        title: 'Fonctionnalités V3',
        subtitle: 'Les nouveautés',
        features: [
          {
            id: '1',
            title: 'Design Moderne',
            description: 'Interface utilisateur épurée',
            icon: 'star',
            image: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=400&h=300&fit=crop'
          },
          {
            id: '2',
            title: 'Performance',
            description: 'Chargement ultra rapide',
            icon: 'zap',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
          },
          {
            id: '3',
            title: 'SEO Optimisé',
            description: 'Visibilité maximale',
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
      id: 'services-v3-' + Date.now(),
      type: 'ServicesV3Perfect',
      data: {
        title: 'Services V3',
        subtitle: 'Solutions complètes',
        services: [
          {
            id: '1',
            title: 'Développement',
            description: 'Sites web modernes',
            icon: 'code',
            features: ['React', 'Next.js', 'API'],
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop',
            price: '1500€'
          },
          {
            id: '2',
            title: 'Design',
            description: 'UI/UX attractif',
            icon: 'palette',
            features: ['Maquettes', 'Prototypes'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
            price: '1200€'
          }
        ],
        variant: 'cards',
        showPrices: true
      }
    },
    // Gallery Ultra-Modern
    {
      id: 'gallery-ultra-' + Date.now(),
      type: 'GalleryUltraModern',
      data: {
        title: 'Galerie V3',
        subtitle: 'Nos réalisations',
        images: [
          {
            id: '1',
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            alt: 'Projet 1',
            title: 'E-commerce',
            category: 'Web'
          },
          {
            id: '2',
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            alt: 'Projet 2',
            title: 'Dashboard',
            category: 'App'
          }
        ],
        layout: 'masonry',
        showFilters: true,
        lightbox: true,
        lightboxStyle: 'modern'
      }
    },
    // Contact Ultra-Modern
    {
      id: 'contact-ultra-' + Date.now(),
      type: 'ContactUltraModern',
      data: {
        title: 'Contact',
        subtitle: 'Parlons de votre projet',
        email: 'test@v3blocks.com',
        phone: '+33 1 23 45 67 89',
        address: '123 Rue Test, Paris',
        showMap: true,
        mapPosition: 'right',
        variant: 'glassmorphism',
        formFields: [
          { id: 'name', label: 'Nom', type: 'text', required: true },
          { id: 'email', label: 'Email', type: 'email', required: true },
          { id: 'message', label: 'Message', type: 'textarea', required: true }
        ]
      }
    }
  ];
}

// Fonction principale
async function main() {
  try {
    console.log('🎯 Test de déploiement Netlify avec blocs V3\n');

    if (!NETLIFY_TOKEN) {
      console.error('❌ Token Netlify non trouvé. Configurez NETLIFY_ACCESS_TOKEN dans .env.local');
      return;
    }

    // 1. Récupérer un projet existant ou en créer un simple
    const projectId = 'test-v3-deploy-' + Date.now();
    
    console.log('📦 Préparation des données du projet...');
    
    // Données du projet avec blocs V3
    const projectData = {
      businessInfo: {
        name: 'Test V3 Blocks',
        email: 'contact@testv3.com',
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
      pages: [
        {
          id: 'home',
          name: 'Accueil',
          title: 'Test V3 - Déploiement Netlify',
          description: 'Test de tous les blocs V3',
          path: '/',
          blocks: createV3Blocks()
        }
      ]
    };

    // 2. Déployer directement via l'API
    console.log('🚀 Lancement du déploiement Netlify...');
    
    const deployData = {
      siteId: crypto.randomUUID(),
      siteName: `test-v3-blocks-${Date.now()}`,
      projectData: projectData,
      plan: 'starter',
      netlifyToken: NETLIFY_TOKEN,
      domainType: 'subdomain',
      cmsLevel: 'basic'
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
    console.log('\n✅ Déploiement réussi !');
    console.log('🌐 URL du site:', result.url);
    console.log('📊 Dashboard Netlify:', result.adminUrl);
    
    // Sauvegarder les infos
    const deploymentInfo = {
      siteName: deployData.siteName,
      deploymentUrl: result.url,
      netlifyDashboard: result.adminUrl,
      deployedAt: new Date().toISOString(),
      blocksV3: [
        'HeroV3Perfect',
        'FeaturesV3Perfect',
        'ServicesV3Perfect',
        'GalleryUltraModern',
        'ContactUltraModern'
      ]
    };

    await fs.writeFile(
      path.join(__dirname, 'v3-deployment-success.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('\n🎉 Test terminé avec succès !');
    console.log('📄 Infos sauvegardées dans v3-deployment-success.json');
    console.log('\n🔍 Visitez le site pour vérifier les blocs V3 !');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

// Lancer le script
main();
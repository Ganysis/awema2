/**
 * Script de test complet pour export avec CMS
 */

const fetch = require('node-fetch');
const crypto = require('crypto');

async function testFullExport() {
  console.log('🚀 Test d\'export complet avec CMS\n');

  // Données du projet avec tous les types de blocs
  const projectData = {
    settings: {
      siteName: 'Test CMS Complet',
      siteDescription: 'Site de test avec tous les blocs Ultra Modern',
      businessInfo: {
        name: 'Test Business',
        phone: '01 23 45 67 89',
        email: 'contact@test.fr',
        address: '123 Rue du Test, 75001 Paris'
      }
    },
    pages: [
      {
        id: 'home',
        title: 'Accueil',
        slug: '/',
        blocks: [
          // Header Ultra Modern
          {
            id: 'header-1',
            type: 'header-ultra-modern',
            variant: 'transparent-blur',
            props: {
              logo: { text: 'Test CMS', type: 'text' },
              menuItems: [
                { label: 'Accueil', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' }
              ],
              ctaButton: { text: 'Devis Gratuit', href: '/contact' }
            }
          },
          // Hero Ultra Modern
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            variant: 'gradient-animation',
            props: {
              title: 'Bienvenue sur notre site CMS',
              subtitle: 'Testez toutes les fonctionnalités du CMS avec édition en temps réel',
              primaryButton: { text: 'Commencer', href: '#features' },
              secondaryButton: { text: 'En savoir plus', href: '#about' }
            }
          },
          // Features Ultra Modern
          {
            id: 'features-1',
            type: 'features-ultra-modern',
            variant: 'bento-grid',
            props: {
              title: 'Nos Fonctionnalités',
              subtitle: 'Découvrez tout ce que vous pouvez faire',
              features: [
                {
                  icon: 'edit',
                  title: 'Édition en temps réel',
                  description: 'Modifiez vos contenus directement depuis le CMS'
                },
                {
                  icon: 'blocks',
                  title: 'Blocs modulaires',
                  description: 'Construisez vos pages avec des blocs pré-conçus'
                },
                {
                  icon: 'responsive',
                  title: 'Design responsive',
                  description: 'Votre site s\'adapte à tous les écrans'
                }
              ]
            }
          },
          // Content Ultra Modern
          {
            id: 'content-1',
            type: 'content-ultra-modern',
            variant: 'split-screen',
            props: {
              title: 'À propos de nous',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              image: {
                src: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
                alt: 'À propos'
              },
              features: [
                { text: '10 ans d\'expérience' },
                { text: 'Équipe qualifiée' },
                { text: 'Service 24/7' }
              ]
            }
          },
          // Testimonials Ultra Modern
          {
            id: 'testimonials-1',
            type: 'testimonials-ultra-modern',
            variant: 'carousel-3d',
            props: {
              title: 'Ce que disent nos clients',
              testimonials: [
                {
                  id: '1',
                  name: 'Jean Dupont',
                  role: 'Directeur',
                  company: 'Entreprise A',
                  content: 'Excellent service, je recommande !',
                  rating: 5,
                  image: 'https://i.pravatar.cc/150?img=1'
                },
                {
                  id: '2',
                  name: 'Marie Martin',
                  role: 'Manager',
                  company: 'Entreprise B',
                  content: 'Très professionnel et efficace.',
                  rating: 5,
                  image: 'https://i.pravatar.cc/150?img=2'
                }
              ]
            }
          },
          // Contact Ultra Modern
          {
            id: 'contact-1',
            type: 'contact-ultra-modern',
            variant: 'glassmorphism',
            props: {
              title: 'Contactez-nous',
              subtitle: 'Nous sommes là pour vous aider',
              showMap: true,
              mapPosition: 'right',
              address: '123 Rue du Test, 75001 Paris',
              phone: '01 23 45 67 89',
              email: 'contact@test.fr',
              hours: [
                { day: 'Lundi - Vendredi', time: '9h - 18h' },
                { day: 'Samedi', time: '10h - 16h' }
              ]
            }
          },
          // Footer Ultra Modern
          {
            id: 'footer-1',
            type: 'footer-ultra-modern',
            variant: 'gradient-wave',
            props: {
              logo: { text: 'Test CMS', type: 'text' },
              description: 'Votre partenaire de confiance',
              columns: [
                {
                  title: 'Navigation',
                  links: [
                    { label: 'Accueil', href: '/' },
                    { label: 'Services', href: '/services' },
                    { label: 'Contact', href: '/contact' }
                  ]
                },
                {
                  title: 'Légal',
                  links: [
                    { label: 'Mentions légales', href: '/mentions' },
                    { label: 'CGV', href: '/cgv' }
                  ]
                }
              ],
              socialLinks: [
                { platform: 'facebook', href: '#' },
                { platform: 'twitter', href: '#' }
              ],
              newsletter: {
                enabled: true,
                title: 'Newsletter',
                placeholder: 'Votre email',
                buttonText: 'S\'abonner'
              }
            }
          }
        ],
        meta: {
          title: 'Test CMS - Accueil',
          description: 'Site de test avec CMS complet'
        }
      }
    ],
    theme: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#8b5cf6'
      }
    }
  };

  // Créer la requête de déploiement
  const deployRequest = {
    siteId: crypto.randomUUID(),
    siteName: `test-cms-complet-${Date.now()}`,
    plan: 'pro', // Pour avoir le CMS
    projectData: projectData
  };

  try {
    console.log('📦 Envoi de la requête de déploiement...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deployRequest)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    
    console.log('✅ Déploiement réussi!\n');
    console.log('📋 Résultat:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.siteUrl) {
      console.log('\n🌐 URLs du site:');
      console.log(`   Site: ${result.siteUrl}`);
      console.log(`   Admin: ${result.adminUrl || result.siteUrl + '/admin'}`);
      
      if (result.credentials) {
        console.log('\n🔐 Identifiants:');
        console.log(`   Email: ${result.credentials.email}`);
        console.log(`   Mot de passe: ${result.credentials.password}`);
      }
      
      console.log('\n📝 Fonctionnalités à tester:');
      console.log('   1. Accéder au site: ' + result.siteUrl);
      console.log('   2. Se connecter au CMS: ' + (result.adminUrl || result.siteUrl + '/admin'));
      console.log('   3. Utiliser l\'éditeur de pages pour modifier les contenus');
      console.log('   4. Vérifier que tous les blocs Ultra Modern s\'affichent');
      console.log('   5. Tester l\'édition des propriétés des blocs');
      console.log('   6. Vérifier la sauvegarde automatique');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
  }
}

// Lancer le test
testFullExport();
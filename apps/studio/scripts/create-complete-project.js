#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createCompleteProject() {
  try {
    console.log('🚀 Création d\'un NOUVEAU projet COMPLET...\n');

    // Utiliser le client existant
    const client = await prisma.client.findFirst({
      where: { email: 'jean.dupont@example.com' }
    });

    if (!client) {
      console.log('❌ Client introuvable');
      return;
    }

    // Créer un NOUVEAU projet avec un nouvel ID
    const project = await prisma.project.create({
      data: {
        name: 'Site Plomberie COMPLET v2',
        slug: 'plomberie-complet-v2',
        clientId: client.id,
        template: 'plumber',
        data: JSON.stringify({
          businessInfo: {
            name: 'Plomberie Dupont',
            phone: '06 12 34 56 78',
            email: 'contact@plomberie-dupont.fr',
            address: '123 Rue de la République',
            city: 'Paris',
            zipCode: '75001'
          },
          projectName: 'Site Plomberie Dupont',
          pages: [{
            id: 'home',
            name: 'Accueil',
            slug: '/',
            blocks: [
              {
                id: 'hero-1',
                type: 'hero-ultra-modern',
                props: {
                  variant: 'gradient-wave',
                  layout: 'two-columns',
                  title: 'Plombier Paris 24/7',
                  subtitle: 'Dépannage Urgence',
                  description: 'Intervention rapide. Devis gratuit.',
                  primaryButton: { text: 'Appeler', link: 'tel:0612345678', style: 'gradient' },
                  secondaryButton: { text: 'Devis', link: '#contact', style: 'glass' },
                  backgroundType: 'gradient',
                  gradientStart: '#1e40af',
                  gradientEnd: '#3b82f6'
                }
              },
              {
                id: 'services-1',
                type: 'services-ultra-modern',
                props: {
                  variant: 'cards-hover',
                  title: 'Nos Services',
                  subtitle: 'Expertise complète',
                  layout: 'grid',
                  columns: 3,
                  services: [
                    { icon: 'wrench', title: 'Dépannage', description: '24/7', price: '80€', image: '/assets/depannage.jpg' },
                    { icon: 'droplet', title: 'Installation', description: 'Sanitaire', price: 'Devis', image: '/assets/sanitaire.jpg' },
                    { icon: 'thermometer', title: 'Chauffage', description: 'Entretien', price: 'Devis', image: '/assets/chauffage.jpg' }
                  ],
                  showPrices: true
                }
              },
              {
                id: 'gallery-1',
                type: 'gallery-ultra-modern',
                props: {
                  variant: 'masonry-flow',
                  title: 'Réalisations',
                  subtitle: 'Nos travaux',
                  images: [
                    { src: '/assets/real-1.jpg', alt: 'Salle de bain', title: 'Rénovation', category: 'renovation' },
                    { src: '/assets/real-2.jpg', alt: 'Chaudière', title: 'Installation', category: 'chauffage' },
                    { src: '/assets/real-3.jpg', alt: 'Cuisine', title: 'Plomberie', category: 'installation' },
                    { src: '/assets/real-4.jpg', alt: 'Douche', title: 'Moderne', category: 'renovation' }
                  ],
                  columns: 4,
                  lightbox: true,
                  filterEnabled: true,
                  categories: [
                    { id: 'all', label: 'Toutes' },
                    { id: 'renovation', label: 'Rénovation' },
                    { id: 'chauffage', label: 'Chauffage' },
                    { id: 'installation', label: 'Installation' }
                  ]
                }
              },
              {
                id: 'testimonials-1',
                type: 'testimonials-ultra-modern',
                props: {
                  title: 'Avis Clients',
                  subtitle: 'Ils nous font confiance',
                  layout: 'carousel-3d',
                  testimonials: [
                    { text: 'Intervention rapide et efficace!', name: 'Marie D.', rating: 5, image: '/assets/client-1.jpg' },
                    { text: 'Travail soigné, je recommande.', name: 'Pierre M.', rating: 5, image: '/assets/client-2.jpg' },
                    { text: 'Très professionnel, prix correct.', name: 'Sophie B.', rating: 5, image: '/assets/client-3.jpg' }
                  ],
                  showRating: true,
                  autoplay: true
                }
              },
              {
                id: 'contact-1',
                type: 'contact-ultra-modern',
                props: {
                  variant: 'split-modern',
                  title: 'Contactez-Nous',
                  subtitle: 'Devis gratuit',
                  contactInfo: JSON.stringify({
                    phone: '06 12 34 56 78',
                    email: 'contact@plomberie-dupont.fr',
                    address: '123 Rue de la République, 75001 Paris'
                  }),
                  formFields: JSON.stringify([
                    { name: 'name', label: 'Nom', type: 'text', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
                    { name: 'service', label: 'Service', type: 'select', options: ['Urgence', 'Installation', 'Rénovation'] },
                    { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true }
                  ]),
                  showMap: true,
                  mapPosition: 'right',
                  mapCoordinates: JSON.stringify({ lat: 48.8566, lng: 2.3522 }),
                  mapZoom: 15
                }
              }
            ]
          }],
          theme: {
            colors: {
              primary: '#2563eb',
              secondary: '#3b82f6',
              accent: '#10b981'
            }
          }
        })
      }
    });

    console.log('✅ NOUVEAU projet créé avec succès !');
    console.log('   ID:', project.id);
    console.log('   Nom:', project.name);
    console.log('   Slug:', project.slug);
    console.log('\n📋 Contenu:');
    console.log('   - 5 blocs complets');
    console.log('   - Hero avec 2 boutons');
    console.log('   - Services avec prix');
    console.log('   - Gallery avec filtres');
    console.log('   - Testimonials carousel');
    console.log('   - Contact avec 5 champs');
    
    console.log('\n🔗 LIENS:');
    console.log('   Éditeur: http://localhost:3000/editor/' + project.id);
    console.log('   Dashboard: http://localhost:3000/dashboard');
    
    // Déployer immédiatement
    console.log('\n📦 Déploiement en cours...');
    const fetch = require('node-fetch');
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: project.id,
        siteId: `site-${Date.now()}`,
        siteName: `plomberie-v2-${Date.now()}`,
        projectData: JSON.parse(project.data),
        plan: 'pro',
        adminEmail: 'admin@plomberie.fr'
      })
    });

    const result = await response.json();
    if (result.success) {
      console.log('\n✅ DÉPLOIEMENT RÉUSSI !');
      console.log('   Site: ' + result.siteUrl);
      console.log('   Admin: ' + result.adminUrl);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCompleteProject();
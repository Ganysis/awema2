#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixExportIssues() {
  try {
    console.log('🔧 Correction des problèmes d\'export...\n');

    // 1. Créer un projet avec les bonnes données
    const client = await prisma.client.findFirst();
    if (!client) {
      console.log('❌ Aucun client trouvé');
      return;
    }

    // Créer un projet avec contentType correct pour content-ultra-modern
    const projectData = {
      businessInfo: {
        name: 'Test Export Parfait',
        phone: '01 23 45 67 89',
        email: 'contact@test-export.fr',
        address: '123 Rue de la Paix',
        city: 'Paris',
        zipCode: '75001',
        country: 'France'
      },
      projectName: 'Site Test Export Parfait',
      globalHeader: {
        id: 'header-main',
        type: 'header-ultra-modern',
        props: {
          variant: 'floating-blur',
          logo: { text: 'Test Export' },
          navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '#services' },
            { label: 'Contact', href: '#contact' }
          ],
          ctaButton: { text: 'Contact', href: '#contact' }
        }
      },
      globalFooter: {
        id: 'footer-main',
        type: 'footer-ultra-modern',
        props: {
          variant: 'gradient-wave',
          logo: { text: 'Test Export' },
          columns: [
            {
              title: 'Services',
              links: [
                { label: 'Service 1', href: '#' },
                { label: 'Service 2', href: '#' }
              ]
            }
          ],
          contact: {
            phone: '01 23 45 67 89',
            email: 'contact@test-export.fr'
          }
        }
      },
      pages: [{
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: [
          // Hero
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            props: {
              variant: 'gradient-wave',
              layout: 'two-columns',
              title: 'Bienvenue sur Test Export',
              subtitle: 'Vérification de l\'export parfait',
              description: 'Ce site teste que l\'export fonctionne correctement.',
              primaryButton: {
                text: 'Commencer',
                link: '#services',
                style: 'gradient'
              },
              backgroundType: 'gradient',
              gradientStart: '#3b82f6',
              gradientEnd: '#10b981'
            }
          },
          // Content avec le bon format
          {
            id: 'content-1',
            type: 'content-ultra-modern',
            props: {
              variant: 'glassmorphism',
              contentType: 'timeline', // Utiliser timeline directement
              title: 'Notre Histoire',
              subtitle: 'Une progression constante',
              // Pour timeline, utiliser la prop timeline au lieu de content
              timeline: [
                { year: '2020', title: 'Création', description: 'Lancement de l\'entreprise' },
                { year: '2021', title: 'Croissance', description: '100 clients satisfaits' },
                { year: '2022', title: 'Expansion', description: 'Ouverture de 3 agences' },
                { year: '2023', title: 'Leader', description: 'N°1 dans notre région' }
              ]
            }
          },
          // Content avec texte simple
          {
            id: 'content-2',
            type: 'content-ultra-modern',
            props: {
              variant: 'floating-cards',
              contentType: 'text-image',
              title: 'Pourquoi nous choisir ?',
              subtitle: 'Excellence et innovation',
              content: 'Nous offrons des services de qualité supérieure avec une approche personnalisée. Notre équipe d\'experts est à votre écoute pour réaliser vos projets.',
              image: '/assets/about-us.jpg',
              imagePosition: 'right',
              features: [
                { text: '10 ans d\'expérience', icon: 'check' },
                { text: 'Équipe certifiée', icon: 'check' },
                { text: 'Support 24/7', icon: 'check' },
                { text: 'Garantie satisfaction', icon: 'check' }
              ]
            }
          },
          // Contact avec formulaire complet
          {
            id: 'contact-1',
            type: 'contact-ultra-modern',
            props: {
              variant: 'split-modern',
              title: 'Contactez-nous',
              subtitle: 'Nous sommes à votre écoute',
              contactInfo: {
                phone: '01 23 45 67 89',
                email: 'contact@test-export.fr',
                address: '123 Rue de la Paix, 75001 Paris',
                hours: {
                  weekdays: 'Lun-Ven : 9h-18h',
                  saturday: 'Sam : 9h-12h',
                  sunday: 'Fermé'
                }
              },
              formFields: [
                { name: 'name', label: 'Nom', type: 'text', required: true, placeholder: 'Votre nom' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'votre@email.com' },
                { name: 'phone', label: 'Téléphone', type: 'tel', required: false, placeholder: '06 12 34 56 78' },
                { name: 'subject', label: 'Sujet', type: 'text', required: true, placeholder: 'Objet de votre demande' },
                { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true, placeholder: 'Votre message...' }
              ],
              showMap: true,
              mapPosition: 'right',
              mapCoordinates: { lat: 48.8566, lng: 2.3522 },
              mapZoom: 14
            }
          }
        ]
      }],
      theme: {
        variant: 'premium',
        colors: {
          primary: '#3b82f6',
          secondary: '#10b981',
          accent: '#f59e0b'
        }
      }
    };

    // Créer le projet
    const project = await prisma.project.create({
      data: {
        name: 'TEST EXPORT PARFAIT',
        slug: `test-export-${Date.now()}`,
        clientId: client.id,
        template: 'test',
        data: JSON.stringify(projectData)
      }
    });

    console.log('✅ Projet créé avec succès !');
    console.log('   ID:', project.id);
    console.log('   Nom:', project.name);
    
    console.log('\n📋 Points à vérifier après déploiement:');
    console.log('   1. ❌ PAS de [object Object] dans le contenu');
    console.log('   2. ✅ Timeline affichée correctement');
    console.log('   3. ✅ Formulaire avec tous les champs');
    console.log('   4. ✅ Features avec icônes et texte');
    console.log('   5. ✅ CSS complet (glassmorphism, gradients, etc.)');
    
    console.log('\n🔗 OUVRIR DANS L\'ÉDITEUR:');
    console.log('   http://localhost:3000/editor/' + project.id);
    
    console.log('\n💡 Solutions appliquées:');
    console.log('   - Content timeline : utilisé la prop "timeline" au lieu de "content"');
    console.log('   - Content text-image : "content" est une string, pas un array');
    console.log('   - Contact : props sont des objets directs, pas des strings JSON');
    console.log('   - Features : array d\'objets avec text et icon');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixExportIssues();
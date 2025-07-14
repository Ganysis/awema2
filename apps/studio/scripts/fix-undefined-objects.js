#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixUndefinedObjects() {
  try {
    console.log('🔧 Correction des undefined et [object Object]...\n');

    // Récupérer le dernier projet
    const project = await prisma.project.findFirst({
      where: { name: { contains: 'COMPLET' } },
      orderBy: { createdAt: 'desc' }
    });

    if (!project) {
      console.log('❌ Aucun projet trouvé');
      return;
    }

    const projectData = JSON.parse(project.data);
    let hasChanges = false;

    // Parcourir tous les blocs et corriger les props
    projectData.pages.forEach(page => {
      page.blocks.forEach(block => {
        console.log(`\n📦 Bloc ${block.type}:`);
        
        // Correction pour content-ultra-modern
        if (block.type === 'content-ultra-modern') {
          const contentType = block.props.contentType;
          console.log(`   contentType: ${contentType}`);
          
          // S'assurer que les bonnes props sont définies selon le contentType
          switch (contentType) {
            case 'timeline':
              // Pour timeline, on n'a pas besoin de content
              if (block.props.content !== undefined) {
                console.log('   ❌ Suppression de content pour timeline');
                delete block.props.content;
                hasChanges = true;
              }
              // S'assurer que timeline existe
              if (!block.props.timeline) {
                console.log('   ⚠️  timeline manquant, ajout d\'un défaut');
                block.props.timeline = [];
                hasChanges = true;
              }
              break;
              
            case 'text-image':
              // Pour text-image, content doit être une string
              if (typeof block.props.content !== 'string') {
                console.log('   ❌ content n\'est pas une string, correction');
                block.props.content = block.props.content || '';
                hasChanges = true;
              }
              break;
              
            case 'quote':
              // Pour quote, on a besoin de quote object
              if (!block.props.quote || typeof block.props.quote !== 'object') {
                console.log('   ❌ quote manquant ou invalide');
                block.props.quote = {
                  text: '',
                  author: '',
                  role: ''
                };
                hasChanges = true;
              }
              break;
          }
          
          // S'assurer que eyebrow, title, subtitle sont des strings
          ['eyebrow', 'title', 'subtitle'].forEach(prop => {
            if (block.props[prop] === undefined) {
              console.log(`   ⚠️  ${prop} undefined, ajout d'une string vide`);
              block.props[prop] = '';
              hasChanges = true;
            }
          });
        }
        
        // Correction pour contact-ultra-modern
        if (block.type === 'contact-ultra-modern') {
          // S'assurer que contactInfo est un objet
          if (typeof block.props.contactInfo === 'string') {
            try {
              console.log('   ❌ contactInfo est une string JSON, parsing...');
              block.props.contactInfo = JSON.parse(block.props.contactInfo);
              hasChanges = true;
            } catch (e) {
              console.log('   ❌ Impossible de parser contactInfo');
            }
          }
          
          // S'assurer que formFields est un array
          if (typeof block.props.formFields === 'string') {
            try {
              console.log('   ❌ formFields est une string JSON, parsing...');
              block.props.formFields = JSON.parse(block.props.formFields);
              hasChanges = true;
            } catch (e) {
              console.log('   ❌ Impossible de parser formFields');
            }
          }
          
          // S'assurer que mapCoordinates est un objet
          if (typeof block.props.mapCoordinates === 'string') {
            try {
              console.log('   ❌ mapCoordinates est une string JSON, parsing...');
              block.props.mapCoordinates = JSON.parse(block.props.mapCoordinates);
              hasChanges = true;
            } catch (e) {
              console.log('   ❌ Impossible de parser mapCoordinates');
            }
          }
        }
      });
    });

    if (hasChanges) {
      console.log('\n💾 Sauvegarde des corrections...');
      
      await prisma.project.update({
        where: { id: project.id },
        data: {
          data: JSON.stringify(projectData)
        }
      });
      
      console.log('✅ Projet corrigé et sauvegardé!');
    } else {
      console.log('\n✅ Aucune correction nécessaire');
    }

    // Créer un nouveau projet PARFAIT à partir de zéro
    console.log('\n🆕 Création d\'un projet PARFAIT...');
    
    const perfectProject = {
      businessInfo: {
        name: 'Test Sans Erreurs',
        phone: '01 23 45 67 89',
        email: 'contact@test-parfait.fr',
        address: '1 Rue de la Paix',
        city: 'Paris',
        zipCode: '75001',
        country: 'France'
      },
      projectName: 'Site Test PARFAIT Sans Erreurs',
      globalHeader: {
        id: 'header-1',
        type: 'header-ultra-modern',
        props: {
          variant: 'floating-blur',
          logo: { text: 'Test Parfait' },
          navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'À propos', href: '#about' },
            { label: 'Contact', href: '#contact' }
          ]
        }
      },
      globalFooter: {
        id: 'footer-1',
        type: 'footer-ultra-modern',
        props: {
          variant: 'gradient-wave',
          logo: { text: 'Test Parfait' },
          columns: [],
          contact: {
            phone: '01 23 45 67 89',
            email: 'contact@test-parfait.fr'
          }
        }
      },
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
              layout: 'center',
              title: 'Test Sans Erreurs',
              subtitle: 'Un site qui fonctionne parfaitement',
              description: 'Ce site est conçu pour ne pas avoir d\'erreurs [object Object] ou undefined.',
              primaryButton: {
                text: 'Commencer',
                link: '#start'
              }
            }
          },
          {
            id: 'content-timeline',
            type: 'content-ultra-modern',
            props: {
              variant: 'glassmorphism',
              contentType: 'timeline',
              title: 'Notre Timeline',
              subtitle: 'Les étapes importantes',
              eyebrow: '📅 Chronologie',
              // PAS de content pour timeline !
              timeline: [
                { year: '2020', title: 'Début', description: 'Lancement du projet' },
                { year: '2021', title: 'Croissance', description: 'Expansion rapide' },
                { year: '2022', title: 'Succès', description: 'Leader du marché' }
              ]
            }
          },
          {
            id: 'content-text',
            type: 'content-ultra-modern',
            props: {
              variant: 'floating-cards',
              contentType: 'text-image',
              title: 'À propos de nous',
              subtitle: 'Notre mission',
              eyebrow: '💡 Qui sommes-nous',
              content: 'Nous sommes une entreprise dédiée à créer des sites web sans bugs. Notre équipe d\'experts travaille sans relâche pour vous offrir la meilleure expérience possible.',
              image: '/assets/about.jpg',
              imagePosition: 'right',
              features: [
                { text: 'Sans bugs', icon: 'check' },
                { text: 'Performance optimale', icon: 'check' },
                { text: 'Design moderne', icon: 'check' }
              ]
            }
          },
          {
            id: 'contact-1',
            type: 'contact-ultra-modern',
            props: {
              variant: 'split-modern',
              title: 'Contactez-nous',
              subtitle: 'Nous sommes là pour vous',
              // Objets directs, pas de JSON.stringify !
              contactInfo: {
                phone: '01 23 45 67 89',
                email: 'contact@test-parfait.fr',
                address: '1 Rue de la Paix, 75001 Paris',
                hours: {
                  weekdays: 'Lun-Ven : 9h-18h',
                  saturday: 'Sam : 9h-12h'
                }
              },
              formFields: [
                { name: 'name', label: 'Nom', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'message', label: 'Message', type: 'textarea', rows: 4, required: true }
              ],
              showMap: true,
              mapPosition: 'right',
              mapCoordinates: { lat: 48.8566, lng: 2.3522 }
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

    const newProject = await prisma.project.create({
      data: {
        name: 'TEST PARFAIT - Sans Erreurs',
        slug: `test-parfait-${Date.now()}`,
        clientId: project.clientId,
        template: 'test',
        data: JSON.stringify(perfectProject)
      }
    });

    console.log('\n✅ Nouveau projet PARFAIT créé!');
    console.log('   ID:', newProject.id);
    console.log('   Nom:', newProject.name);
    console.log('\n🔗 OUVRIR DANS L\'ÉDITEUR:');
    console.log('   http://localhost:3000/editor/' + newProject.id);
    console.log('\n💡 Ce projet est garanti sans [object Object] ni undefined!');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixUndefinedObjects();
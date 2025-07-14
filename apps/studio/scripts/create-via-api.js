#!/usr/bin/env node

const fetch = require('node-fetch');

async function createViaAPI() {
  try {
    console.log('🚀 Création d\'un projet via l\'API...\n');

    // D'abord, récupérer un projet existant pour voir la structure attendue
    const getResponse = await fetch('http://localhost:3000/api/projects/cmd0p0hyo0001j1bpd8vuwc3j');
    
    if (getResponse.ok) {
      const existingProject = await getResponse.json();
      console.log('Structure actuelle:', JSON.stringify(existingProject, null, 2).substring(0, 500));
    }

    // Récupérer un client existant
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const client = await prisma.client.findFirst();
    await prisma.$disconnect();
    
    if (!client) {
      console.log('❌ Aucun client trouvé');
      return;
    }
    
    console.log('✅ Client trouvé:', client.name);
    
    // Créer un nouveau projet avec la structure correcte
    const projectData = {
      name: 'Site Plomberie API Test',
      clientId: client.id,
      template: 'plumber',
      businessInfo: {
        name: 'Plomberie Express',
        phone: '06 12 34 56 78',
        email: 'contact@plomberie-express.fr',
        address: '456 Boulevard Voltaire',
        city: 'Paris',
        zipCode: '75011'
      },
      pages: [{
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: [
          {
            id: `hero-${Date.now()}`,
            type: 'hero-ultra-modern',
            props: {
              variant: 'glassmorphism',
              layout: 'centered',
              title: 'Plomberie Express Paris',
              subtitle: 'Intervention en 30 minutes',
              description: 'Service de dépannage plomberie 24/7 à Paris',
              primaryButton: {
                text: 'Appel Urgence',
                link: 'tel:0612345678',
                style: 'gradient'
              },
              backgroundType: 'gradient',
              gradientStart: '#1e40af',
              gradientEnd: '#3b82f6'
            }
          },
          {
            id: `contact-${Date.now()}`,
            type: 'contact-ultra-modern',
            props: {
              variant: 'split-modern',
              title: 'Devis Gratuit',
              subtitle: 'Réponse immédiate',
              contactInfo: JSON.stringify({
                phone: '06 12 34 56 78',
                email: 'contact@plomberie-express.fr',
                address: '456 Boulevard Voltaire, 75011 Paris'
              }),
              formFields: JSON.stringify([
                { name: 'name', label: 'Votre nom', type: 'text', required: true },
                { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
                { name: 'urgency', label: 'Urgence ?', type: 'select', options: ['Oui - Urgent', 'Non - Devis'] },
                { name: 'problem', label: 'Problème', type: 'textarea', rows: 4 }
              ]),
              showMap: true,
              mapCoordinates: JSON.stringify({ lat: 48.8566, lng: 2.3522 })
            }
          }
        ]
      }]
    };

    // Créer via l'API
    const createResponse = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    });

    if (createResponse.ok) {
      const newProject = await createResponse.json();
      console.log('✅ Projet créé via l\'API !');
      console.log('   ID:', newProject.id);
      console.log('   Lien: http://localhost:3000/editor/' + newProject.id);
    } else {
      console.log('❌ Erreur API:', createResponse.status);
      const error = await createResponse.text();
      console.log('Détails:', error);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createViaAPI();
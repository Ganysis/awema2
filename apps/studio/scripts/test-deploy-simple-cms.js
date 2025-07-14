#!/usr/bin/env node

/**
 * Test de déploiement simple avec CMS basique (sans Edge Functions)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Charger les variables d'environnement
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

async function testDeploySimpleCMS() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    const timestamp = Date.now();
    const siteName = `test-cms-simple-${timestamp}`;
    const adminEmail = `admin@${siteName}.fr`;

    console.log('🚀 Test de déploiement avec CMS simple (sans Edge Functions)');
    console.log('📋 Configuration:');
    console.log('   Site:', siteName);
    console.log('   Plan: starter (CMS basique)');
    console.log('   Email admin:', adminEmail);
    console.log('');

    const testData = {
      siteId: crypto.randomUUID(),
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test CMS Simple',
          businessInfo: {
            name: 'Plomberie Pro',
            phone: '0123456789',
            email: 'contact@plomberiepro.fr',
            companyName: 'Plomberie Pro SARL'
          }
        },
        pages: [{
          id: 'home',
          slug: '/',
          title: 'Accueil',
          blocks: [
            {
              id: 'header-1',
              type: 'header-ultra-modern',
              props: {
                variant: 'transparent-blur',
                logo: {
                  text: 'Plomberie Pro',
                  fontSize: 24
                },
                menuItems: [
                  { id: '1', label: 'Accueil', link: '/', type: 'link' },
                  { id: '2', label: 'Services', link: '#services', type: 'link' },
                  { id: '3', label: 'Contact', link: '#contact', type: 'link' }
                ],
                ctaButton: {
                  text: 'Devis gratuit',
                  link: '#contact'
                },
                sticky: true,
                darkMode: false
              }
            },
            {
              id: 'hero-1',
              type: 'hero-ultra-modern',
              props: {
                variant: 'gradient-wave',
                title: 'Plomberie Express 24/7',
                subtitle: 'Intervention rapide et professionnelle',
                primaryButton: {
                  text: 'Appelez-nous',
                  link: 'tel:0123456789'
                },
                secondaryButton: {
                  text: 'Devis gratuit',
                  link: '#contact'
                },
                features: [
                  'Intervention 24h/24',
                  'Devis gratuit',
                  'Garantie 1 an'
                ],
                backgroundImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600'
              }
            },
            {
              id: 'contact-1',
              type: 'contact-ultra-modern',
              props: {
                variant: 'glassmorphism',
                title: 'Contactez-nous',
                subtitle: 'Nous sommes là pour vous aider',
                email: 'contact@plomberiepro.fr',
                phone: '01 23 45 67 89',
                address: '123 Avenue de la République, 75011 Paris',
                businessHours: [
                  { day: 'Lundi - Vendredi', hours: '8h00 - 19h00' },
                  { day: 'Samedi', hours: '9h00 - 17h00' }
                ],
                formFields: [
                  { id: 'name', label: 'Nom', type: 'text', required: true },
                  { id: 'email', label: 'Email', type: 'email', required: true },
                  { id: 'message', label: 'Message', type: 'textarea', required: true }
                ]
              }
            },
            {
              id: 'footer-1',
              type: 'footer-ultra-modern',
              props: {
                variant: 'gradient-wave',
                companyName: 'Plomberie Pro',
                description: 'Votre expert en plomberie depuis 2005',
                columns: [
                  {
                    title: 'Services',
                    links: [
                      { text: 'Dépannage urgent', url: '/services/depannage' },
                      { text: 'Installation', url: '/services/installation' }
                    ]
                  }
                ],
                contactInfo: {
                  phone: '01 23 45 67 89',
                  email: 'contact@plomberiepro.fr',
                  address: '123 Avenue de la République, 75011 Paris'
                },
                socialLinks: [
                  { platform: 'facebook', url: 'https://facebook.com' }
                ],
                bottomLinks: [
                  { text: 'Mentions légales', url: '/legal' }
                ]
              }
            }
          ]
        }],
        theme: {
          primaryColor: '#3B82F6'
        }
      },
      plan: 'starter',
      adminEmail: adminEmail,
      // Désactiver Supabase pour forcer le CMS basique
      useSupabase: false
    };

    console.log('📤 Envoi de la requête de déploiement...\n');

    // Modifier temporairement les variables d'environnement
    const originalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    // Restaurer les variables
    if (originalSupabaseUrl) process.env.NEXT_PUBLIC_SUPABASE_URL = originalSupabaseUrl;
    if (originalSupabaseKey) process.env.SUPABASE_SERVICE_ROLE_KEY = originalSupabaseKey;

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Déploiement réussi !');
      console.log('   URL du site:', result.siteUrl);
      console.log('   URL admin:', result.adminUrl);
      console.log('');
      console.log('🔐 Identifiants de connexion:');
      console.log('   Email:', result.credentials.email);
      console.log('   Mot de passe:', result.credentials.password);
      console.log('');
      console.log('💡 Pour tester le CMS:');
      console.log(`   1. Ouvrez ${result.adminUrl}`);
      console.log('   2. Connectez-vous avec les identifiants ci-dessus');
      console.log('   3. Testez l\'éditeur de pages (modifier uniquement)');
      console.log('');
      
    } else {
      console.log('❌ Échec du déploiement:', result.error);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testDeploySimpleCMS();
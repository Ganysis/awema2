#!/usr/bin/env node

/**
 * Test de déploiement complet avec Supabase
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

async function testDeployWithSupabase() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    const timestamp = Date.now();
    const siteName = `test-supabase-${timestamp}`;
    const adminEmail = `admin@${siteName}.fr`;

    console.log('🚀 Test de déploiement avec Supabase');
    console.log('📋 Configuration:');
    console.log('   Site:', siteName);
    console.log('   Plan: pro (avec CMS)');
    console.log('   Email admin:', adminEmail);
    console.log('   Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
    console.log('');

    const testData = {
      siteId: crypto.randomUUID(),
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test Supabase CMS',
          businessInfo: {
            name: 'Test Company',
            phone: '0123456789',
            email: 'contact@test.fr',
            companyName: 'Test SARL'
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
              id: 'hero-2',
              type: 'hero-ultra-modern',
              props: {
                variant: 'gradient-wave',
                title: 'Plomberie Express 24/7',
                subtitle: 'Intervention rapide et professionnelle pour tous vos besoins',
                primaryButton: {
                  text: 'Urgence ? Appelez-nous',
                  link: 'tel:0123456789'
                },
                secondaryButton: {
                  text: 'Devis en ligne',
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
              id: 'contact-3',
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
                  { day: 'Samedi', hours: '9h00 - 17h00' },
                  { day: 'Dimanche', hours: 'Urgences uniquement' }
                ],
                mapPosition: 'right',
                showMap: true,
                socialLinks: [
                  { platform: 'facebook', url: 'https://facebook.com' },
                  { platform: 'instagram', url: 'https://instagram.com' }
                ],
                formFields: [
                  { id: 'name', label: 'Nom complet', type: 'text', required: true },
                  { id: 'email', label: 'Email', type: 'email', required: true },
                  { id: 'phone', label: 'Téléphone', type: 'tel', required: true },
                  { id: 'service', label: 'Type de service', type: 'select', required: true, options: ['Urgence', 'Devis', 'Maintenance'] },
                  { id: 'message', label: 'Message', type: 'textarea', required: true }
                ]
              }
            },
            {
              id: 'footer-4',
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
                      { text: 'Installation', url: '/services/installation' },
                      { text: 'Rénovation', url: '/services/renovation' }
                    ]
                  },
                  {
                    title: 'Informations',
                    links: [
                      { text: 'À propos', url: '/about' },
                      { text: 'Tarifs', url: '/tarifs' },
                      { text: 'Zone d\'intervention', url: '/zones' }
                    ]
                  }
                ],
                contactInfo: {
                  phone: '01 23 45 67 89',
                  email: 'contact@plomberiepro.fr',
                  address: '123 Avenue de la République, 75011 Paris'
                },
                socialLinks: [
                  { platform: 'facebook', url: 'https://facebook.com' },
                  { platform: 'instagram', url: 'https://instagram.com' },
                  { platform: 'linkedin', url: 'https://linkedin.com' }
                ],
                newsletter: {
                  enabled: true,
                  title: 'Newsletter',
                  placeholder: 'Votre email',
                  buttonText: 'S\'inscrire',
                  style: 'inline'
                },
                bottomLinks: [
                  { text: 'Mentions légales', url: '/legal' },
                  { text: 'Politique de confidentialité', url: '/privacy' },
                  { text: 'CGV', url: '/cgv' }
                ]
              }
            }
          ]
        }],
        theme: {
          primaryColor: '#3B82F6'
        }
      },
      plan: 'pro',
      adminEmail: adminEmail
    };

    console.log('📤 Envoi de la requête de déploiement...\n');

    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

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
      console.log('');
      
      // Vérifier dans Supabase
      console.log('🔍 Vérification dans Supabase...');
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      
      // Vérifier le site
      const { data: site, error: siteError } = await supabase
        .from('sites')
        .select('*')
        .eq('subdomain', siteName)
        .single();
        
      if (site) {
        console.log('✅ Site trouvé dans Supabase:', site.id);
        console.log('   Plan:', site.plan);
        console.log('   Status:', site.status);
        
        // Vérifier l'utilisateur
        const { data: user, error: userError } = await supabase
          .from('cms_users')
          .select('*')
          .eq('site_id', site.id)
          .single();
          
        if (user) {
          console.log('✅ Utilisateur CMS trouvé:', user.email);
          console.log('   Rôle:', user.role);
          console.log('   Actif:', user.is_active);
        } else {
          console.log('❌ Utilisateur CMS non trouvé:', userError);
        }
      } else {
        console.log('❌ Site non trouvé dans Supabase:', siteError);
      }
      
    } else {
      console.log('❌ Échec du déploiement:', result.error);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testDeployWithSupabase();
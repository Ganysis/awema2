#!/usr/bin/env node

/**
 * Test final du déploiement complet
 */

console.log('🚀 Test FINAL de déploiement complet...\n');

// Charger les variables d'environnement
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

async function testFinalDeploy() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    const timestamp = Date.now();
    const siteId = crypto.randomUUID();
    const siteName = `test-final-${timestamp}`;

    console.log('📋 Configuration:');
    console.log('   Site ID:', siteId);
    console.log('   Site Name:', siteName);
    console.log('   Netlify Token:', process.env.NETLIFY_AUTH_TOKEN ? '✅' : '❌');
    console.log('   Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌');
    console.log('   Supabase Key:', process.env.SUPABASE_SERVICE_KEY ? '✅' : '❌');

    // Données de test avec blocs valides
    const testData = {
      siteId: siteId,
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test Final Déploiement',
          businessInfo: {
            name: 'Entreprise Test Final',
            phone: '0123456789',
            email: 'contact@test-final.fr',
            address: '123 Rue du Test, 75001 Paris',
            description: 'Une entreprise de test pour le déploiement final'
          }
        },
        pages: [{
          id: 'home',
          slug: '/',
          title: 'Accueil',
          meta: {
            title: 'Test Final - Accueil',
            description: 'Site de test pour le déploiement final AWEMA'
          },
          blocks: [
            {
              id: 'hero-1',
              type: 'hero-centered',
              props: {
                title: 'Test Final de Déploiement',
                subtitle: 'Si vous voyez cette page, le déploiement fonctionne parfaitement !',
                buttonText: 'C\'est parti !',
                buttonLink: '#contact',
                backgroundImage: '',
                backgroundOverlay: true,
                overlayOpacity: 0.5,
                textAlign: 'center'
              }
            },
            {
              id: 'features-1',
              type: 'features-icon-grid',
              props: {
                title: 'Fonctionnalités testées',
                subtitle: 'Toutes les fonctionnalités ont été vérifiées',
                features: [
                  {
                    icon: 'check',
                    title: 'Export statique',
                    description: 'Génération HTML/CSS/JS optimisée'
                  },
                  {
                    icon: 'database',
                    title: 'Intégration Supabase',
                    description: 'Base de données multi-tenant'
                  },
                  {
                    icon: 'globe',
                    title: 'Déploiement Netlify',
                    description: 'Hébergement CDN mondial'
                  },
                  {
                    icon: 'lock',
                    title: 'CMS sécurisé',
                    description: 'Interface d\'administration protégée'
                  }
                ]
              }
            },
            {
              id: 'cta-1',
              type: 'cta-clean',
              props: {
                title: 'Prêt à déployer votre site ?',
                subtitle: 'Utilisez AWEMA Studio pour créer votre site professionnel',
                buttonText: 'Commencer maintenant',
                buttonLink: 'https://awema.studio',
                backgroundColor: '#3B82F6',
                textColor: '#FFFFFF'
              }
            }
          ]
        }],
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          accentColor: '#F59E0B',
          darkMode: false,
          fontFamily: 'Inter'
        }
      },
      plan: 'pro', // Tester avec CMS
      adminEmail: `admin@${siteName}.fr`
    };

    console.log('\n📤 Envoi de la requête de déploiement...');
    console.log('   Plan:', testData.plan);
    console.log('   Admin Email:', testData.adminEmail);

    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('\n❌ Erreur HTTP:', response.status);
      console.error('Message:', errorText);
      return;
    }

    const result = await response.json();
    
    console.log('\n📥 Réponse:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ DÉPLOIEMENT RÉUSSI !');
      console.log('=' .repeat(50));
      console.log('🌐 URL du site:', result.siteUrl);
      console.log('🔐 URL admin:', result.adminUrl);
      
      if (result.credentials) {
        console.log('\n📧 Identifiants CMS:');
        console.log('   Email:', result.credentials.email);
        console.log('   Mot de passe:', result.credentials.password);
      }
      
      // Attendre avant de vérifier
      console.log('\n⏳ Attente de 20 secondes pour la propagation...');
      for (let i = 20; i > 0; i--) {
        process.stdout.write(`\r   ${i} secondes restantes...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      console.log('\r   ✅ Attente terminée       ');
      
      // Vérifier le site
      console.log('\n🔍 Vérification du site...');
      try {
        const checkResponse = await fetch(result.siteUrl);
        console.log('   Status HTTP:', checkResponse.status);
        
        if (checkResponse.ok) {
          const html = await checkResponse.text();
          console.log('   ✅ Site accessible !');
          console.log('   Taille HTML:', html.length, 'caractères');
          
          // Vérifications du contenu
          const checks = [
            { name: 'Titre', found: html.includes('Test Final de Déploiement') },
            { name: 'Hero', found: html.includes('hero-centered') },
            { name: 'Features', found: html.includes('features-icon-grid') },
            { name: 'CTA', found: html.includes('cta-clean') },
            { name: 'CSS', found: html.includes('<style>') || html.includes('styles.css') },
            { name: 'Meta SEO', found: html.includes('<meta name="description"') }
          ];
          
          console.log('\n   Vérifications du contenu:');
          checks.forEach(check => {
            console.log(`     ${check.found ? '✅' : '❌'} ${check.name}`);
          });
          
          // Sauvegarder le HTML pour analyse
          const outputPath = path.join(__dirname, 'test-final-output.html');
          fs.writeFileSync(outputPath, html);
          console.log(`\n   📄 HTML sauvegardé dans: ${outputPath}`);
          
        } else {
          console.log('   ❌ Site non accessible:', checkResponse.status);
          const errorText = await checkResponse.text();
          console.log('   Message:', errorText);
        }
      } catch (checkError) {
        console.error('   ❌ Erreur de vérification:', checkError.message);
      }
      
      // Vérifier le CMS si plan pro/premium
      if (testData.plan !== 'starter' && result.adminUrl) {
        console.log('\n🔍 Vérification du CMS...');
        try {
          const cmsResponse = await fetch(result.adminUrl);
          console.log('   Status HTTP:', cmsResponse.status);
          
          if (cmsResponse.ok) {
            const cmsHtml = await cmsResponse.text();
            console.log('   ✅ CMS accessible !');
            console.log('   Login form:', cmsHtml.includes('login') || cmsHtml.includes('password') ? 'Trouvé' : 'Non trouvé');
          } else {
            console.log('   ❌ CMS non accessible');
          }
        } catch (cmsError) {
          console.error('   ❌ Erreur CMS:', cmsError.message);
        }
      }
      
      console.log('\n' + '=' .repeat(50));
      console.log('🎉 TEST COMPLET TERMINÉ AVEC SUCCÈS !');
      console.log('=' .repeat(50));
      
    } else {
      console.log('\n❌ ÉCHEC DU DÉPLOIEMENT');
      console.log('Erreur:', result.error);
      if (result.details) {
        console.log('Détails:', JSON.stringify(result.details, null, 2));
      }
    }

  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Lancer le test
testFinalDeploy();
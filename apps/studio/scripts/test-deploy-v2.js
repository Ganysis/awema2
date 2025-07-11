#!/usr/bin/env node

/**
 * Script de test pour le déploiement V2
 */

console.log('🚀 Test de déploiement V2...\n');

// Charger les variables d'environnement manuellement
const fs = require('fs');
const path = require('path');

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

async function testDeployV2() {
  try {
    console.log('📋 Configuration:');
    console.log('   Netlify Token:', process.env.NETLIFY_AUTH_TOKEN ? '✅' : '❌');
    console.log('   Server URL: http://localhost:3000');

    const crypto = require('crypto');
    const timestamp = Date.now();
    const siteId = crypto.randomUUID();
    const siteName = 'test-v2-' + timestamp;

    // Données de test complètes
    const testData = {
      siteId: siteId,
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test V2 Site',
          businessInfo: {
            name: 'Test Company V2',
            phone: '0123456789',
            email: 'test@v2.fr',
            address: '123 Test Street'
          }
        },
        pages: [{
          id: 'home',
          slug: '/',
          title: 'Accueil',
          blocks: [
            {
              id: 'hero-1',
              type: 'hero-centered',
              props: {
                title: 'Bienvenue sur Test V2',
                subtitle: 'Ceci est un test du nouveau service de déploiement',
                buttonText: 'En savoir plus',
                buttonLink: '#contact',
                backgroundImage: ''
              }
            },
            {
              id: 'features-1',
              type: 'features-clean',
              props: {
                title: 'Nos Services',
                subtitle: 'Découvrez ce que nous proposons',
                features: [
                  {
                    title: 'Service 1',
                    description: 'Description du service 1',
                    icon: 'check'
                  },
                  {
                    title: 'Service 2',
                    description: 'Description du service 2',
                    icon: 'star'
                  }
                ]
              }
            }
          ]
        }],
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          accentColor: '#F59E0B',
          darkMode: false
        }
      },
      plan: 'pro', // Tester avec CMS
      adminEmail: `admin@${siteName}.fr`
    };

    console.log('\n📤 Déploiement du site:');
    console.log('   Site ID:', siteId);
    console.log('   Site Name:', siteName);
    console.log('   Plan:', testData.plan);
    console.log('   Admin Email:', testData.adminEmail);

    // Appeler l'API
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('\n📥 Réponse complète:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ SUCCÈS !');
      console.log('   URL du site:', result.siteUrl);
      console.log('   URL admin:', result.adminUrl);
      console.log('   Email:', result.credentials?.email);
      console.log('   Mot de passe:', result.credentials?.password);
      
      // Attendre un peu avant de vérifier
      console.log('\n⏳ Attente de 5 secondes avant vérification...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Vérifier si le site est accessible
      console.log('\n🔍 Vérification du site...');
      try {
        const checkResponse = await fetch(result.siteUrl);
        console.log('   Status:', checkResponse.status);
        console.log('   Headers:', Object.fromEntries(checkResponse.headers.entries()));
        
        if (checkResponse.ok) {
          const html = await checkResponse.text();
          console.log('   Taille HTML:', html.length, 'caractères');
          console.log('   Titre trouvé:', html.includes('<title>') ? 'Oui' : 'Non');
          console.log('   Hero trouvé:', html.includes('Bienvenue sur Test V2') ? 'Oui' : 'Non');
        }
      } catch (checkError) {
        console.error('   ❌ Erreur de vérification:', checkError.message);
      }
      
      // Vérifier le CMS
      if (testData.plan !== 'starter') {
        console.log('\n🔍 Vérification du CMS...');
        try {
          const cmsResponse = await fetch(result.adminUrl);
          console.log('   Status CMS:', cmsResponse.status);
          
          if (cmsResponse.ok) {
            const cmsHtml = await cmsResponse.text();
            console.log('   Taille HTML CMS:', cmsHtml.length, 'caractères');
            console.log('   Login form trouvé:', cmsHtml.includes('login') || cmsHtml.includes('Login') ? 'Oui' : 'Non');
          }
        } catch (cmsError) {
          console.error('   ❌ Erreur CMS:', cmsError.message);
        }
      }
      
    } else {
      console.log('\n❌ ÉCHEC:', result.error);
      if (result.details) {
        console.log('Détails:', result.details);
      }
    }

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
  }
}

// Vérifier si fetch existe
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

testDeployV2();
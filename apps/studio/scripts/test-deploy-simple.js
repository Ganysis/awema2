#!/usr/bin/env node

/**
 * Script de test simple pour le déploiement
 */

console.log('🚀 Test de déploiement SIMPLE...\n');

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

async function testDeploySimple() {
  try {
    const crypto = require('crypto');
    const timestamp = Date.now();
    const siteId = crypto.randomUUID();
    const siteName = 'test-simple-' + timestamp;

    // Données minimales avec un seul bloc simple
    const testData = {
      siteId: siteId,
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test Simple',
          businessInfo: {
            name: 'Test Simple Company',
            phone: '0123456789',
            email: 'test@simple.fr'
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
                title: 'Test Simple',
                subtitle: 'Ceci est un test minimal',
                buttonText: 'Cliquez ici',
                buttonLink: '#'
              }
            }
          ]
        }],
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981'
        }
      },
      plan: 'starter' // Sans CMS pour simplifier
    };

    console.log('📤 Déploiement:');
    console.log('   Site:', siteName);
    console.log('   Plan:', testData.plan);

    // Appeler l'API
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('\n❌ Erreur HTTP:', response.status);
    }
    
    console.log('\n📥 Réponse:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ URL:', result.siteUrl);
      
      // Attendre 10 secondes
      console.log('\n⏳ Attente de 10 secondes...');
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      // Vérifier
      console.log('\n🔍 Vérification...');
      try {
        const checkResponse = await fetch(result.siteUrl);
        console.log('   Status:', checkResponse.status);
        
        if (checkResponse.ok) {
          const html = await checkResponse.text();
          console.log('   HTML reçu:', html.length, 'caractères');
          
          // Sauvegarder le HTML pour debug
          fs.writeFileSync('test-output.html', html);
          console.log('   HTML sauvé dans test-output.html');
          
          // Vérifier le contenu
          const hasTitle = html.includes('Test Simple');
          const hasHero = html.includes('hero-centered');
          console.log('   Titre trouvé:', hasTitle ? 'OUI' : 'NON');
          console.log('   Hero trouvé:', hasHero ? 'OUI' : 'NON');
        } else {
          const text = await checkResponse.text();
          console.log('   Erreur:', text);
        }
      } catch (err) {
        console.error('   ❌ Erreur:', err.message);
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

testDeploySimple();
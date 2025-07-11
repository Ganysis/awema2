#!/usr/bin/env node

/**
 * Script de debug pour le déploiement
 */

console.log('🔍 Test de déploiement avec debug...\n');

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

async function testDeploy() {
  try {
    console.log('📋 Vérification de la configuration...');
    console.log('   Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌');
    console.log('   Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌');
    console.log('   Service Key:', process.env.SUPABASE_SERVICE_KEY ? '✅' : '❌');
    console.log('   Netlify Token:', process.env.NETLIFY_AUTH_TOKEN ? '✅' : '❌');

    // Test direct de l'API
    console.log('\n🧪 Test de l\'API de déploiement...');

    // Créer des données de test minimales
    const timestamp = Date.now();
    const crypto = require('crypto');
    const siteId = crypto.randomUUID();
    const testData = {
      siteId: siteId,
      siteName: 'test-debug-' + timestamp,
      projectData: {
        settings: { siteName: 'Test Debug' },
        pages: [{
          id: 'home',
          slug: '/',
          title: 'Accueil',
          blocks: [{
            id: 'test-1',
            type: 'hero',
            props: {
              title: 'Test de déploiement',
              subtitle: 'Debug en cours'
            }
          }]
        }],
        theme: {},
        businessInfo: {
          name: 'Test Debug',
          phone: '0123456789',
          email: 'test@debug.fr'
        }
      },
      plan: 'starter' // Sans CMS pour simplifier
    };

    console.log('\n📤 Envoi de la requête de test...');
    console.log('   Site ID:', testData.siteId);
    console.log('   Site Name:', testData.siteName);
    console.log('   Plan:', testData.plan);

    // Appeler directement l'API
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('\n📥 Réponse:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ Déploiement réussi !');
      console.log('   URL:', result.siteUrl);
      
      // Vérifier sur Netlify
      console.log('\n🔍 Vérifiez sur Netlify:');
      console.log('   1. Allez sur https://app.netlify.com');
      console.log('   2. Cherchez le site:', testData.siteName);
      console.log('   3. Vérifiez les logs de déploiement');
    } else {
      console.log('\n❌ Échec:', result.error);
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

testDeploy();
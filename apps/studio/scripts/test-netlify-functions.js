/**
 * Test avec Netlify Functions classiques
 */

const { NetlifyFunctionsFixed } = require('../lib/services/netlify-functions-fixed');
const fetch = require('node-fetch');
const crypto = require('crypto');

async function testNetlifyFunctions() {
  console.log('🚀 Test avec Netlify Functions classiques\n');

  // D'abord, créer un export local pour tester
  const generator = new NetlifyFunctionsFixed();
  
  console.log('📝 Configuration générée:');
  console.log('\nnetlify.toml:');
  console.log('```');
  console.log(generator.generateNetlifyToml());
  console.log('```');
  
  console.log('\n📦 Fonction CMS:');
  console.log('Fichier: netlify/functions/cms-api.js');
  console.log('Routes:');
  console.log('  - POST /api/cms/auth/login');
  console.log('  - GET /api/cms/content');
  console.log('  - PUT /api/cms/content');
  
  // Maintenant faire un déploiement avec cette config
  const projectData = {
    settings: {
      siteName: 'Test Functions Classiques'
    },
    pages: [{
      id: 'home',
      title: 'Accueil',
      slug: '/',
      blocks: [{
        id: 'hero-1',
        type: 'hero-ultra-modern',
        variant: 'gradient-animation',
        props: {
          title: 'Test Netlify Functions',
          subtitle: 'Utilisation des functions classiques au lieu des Edge Functions',
          primaryButton: { text: 'Accéder au CMS', href: '/admin' }
        }
      }]
    }]
  };

  console.log('\n📤 Déploiement...');
  
  try {
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteId: crypto.randomUUID(),
        siteName: `test-netlify-functions-${Date.now()}`,
        plan: 'pro',
        projectData: projectData,
        // Forcer l'utilisation des functions classiques
        useClassicFunctions: true
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('\n✅ Succès!');
      console.log(`Site: ${result.siteUrl}`);
      console.log(`Admin: ${result.siteUrl}/admin`);
      console.log('\n⚠️  Note: Les Netlify Functions classiques peuvent');
      console.log('   prendre 1-2 minutes pour être actives');
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testNetlifyFunctions();
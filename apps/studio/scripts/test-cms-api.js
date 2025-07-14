/**
 * Test de l'API CMS déployée
 */

const fetch = require('node-fetch');

async function testCMSAPI() {
  const siteUrl = 'https://test-auth-fixed-1752315371918.netlify.app';
  
  console.log('🔍 Test de l\'API CMS\n');
  console.log('Site:', siteUrl);
  console.log('');

  // Test 1: Login
  console.log('1️⃣ Test de login...');
  try {
    const loginResponse = await fetch(`${siteUrl}/api/cms/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@admin.fr',
        password: 'admin'
      })
    });

    console.log('   Status:', loginResponse.status);
    console.log('   Content-Type:', loginResponse.headers.get('content-type'));
    
    const loginText = await loginResponse.text();
    console.log('   Response length:', loginText.length);
    
    try {
      const loginData = JSON.parse(loginText);
      console.log('   ✅ JSON valide');
      console.log('   Success:', loginData.success || false);
      if (loginData.session) {
        console.log('   Session token:', loginData.session.token.substring(0, 8) + '...');
      }
    } catch (e) {
      console.log('   ❌ JSON invalide');
      console.log('   Début de la réponse:', loginText.substring(0, 100));
    }
  } catch (error) {
    console.log('   ❌ Erreur:', error.message);
  }

  // Test 2: Content
  console.log('\n2️⃣ Test de récupération du contenu...');
  try {
    const contentResponse = await fetch(`${siteUrl}/api/cms/content`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('   Status:', contentResponse.status);
    console.log('   Content-Type:', contentResponse.headers.get('content-type'));
    
    const contentText = await contentResponse.text();
    console.log('   Response length:', contentText.length);
    
    try {
      const contentData = JSON.parse(contentText);
      console.log('   ✅ JSON valide');
      console.log('   Nombre de pages:', Array.isArray(contentData) ? contentData.length : 0);
    } catch (e) {
      console.log('   ❌ JSON invalide');
      console.log('   Début de la réponse:', contentText.substring(0, 100));
    }
  } catch (error) {
    console.log('   ❌ Erreur:', error.message);
  }

  console.log('\n✅ Tests terminés');
  console.log('\n💡 Si les tests échouent avec du HTML:');
  console.log('   - L\'Edge Function n\'est peut-être pas déployée');
  console.log('   - Vérifier netlify.toml et le dossier edge-functions');
  console.log('   - Attendre quelques secondes que le déploiement se propage');
}

testCMSAPI();
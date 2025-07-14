/**
 * Test de l'API après déploiement
 */

const fetch = require('node-fetch');

async function testAPIFinal() {
  const siteUrl = 'https://test-architecture-finale-1752315921377.netlify.app';
  
  console.log('🔍 Test de l\'API Finale\n');
  console.log('Site:', siteUrl);
  console.log('');

  // Test 1: Vérifier que les redirects fonctionnent
  console.log('1️⃣ Test des redirects Netlify...');
  try {
    const testResponse = await fetch(`${siteUrl}/api/cms/health`, {
      method: 'GET'
    });
    
    console.log('   Status:', testResponse.status);
    console.log('   URL finale:', testResponse.url);
    console.log('   Redirigé:', testResponse.redirected);
  } catch (error) {
    console.log('   ❌ Erreur:', error.message);
  }

  // Test 2: Login
  console.log('\n2️⃣ Test de login...');
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
    
    if (loginResponse.status === 200) {
      const loginData = await loginResponse.json();
      console.log('   ✅ Login réussi!');
      console.log('   Session token:', loginData.session?.token?.substring(0, 10) + '...');
    } else {
      const text = await loginResponse.text();
      console.log('   ❌ Erreur login');
      console.log('   Réponse:', text.substring(0, 100));
    }
  } catch (error) {
    console.log('   ❌ Exception:', error.message);
  }

  // Test 3: Content
  console.log('\n3️⃣ Test du contenu...');
  try {
    const contentResponse = await fetch(`${siteUrl}/api/cms/content`, {
      method: 'GET'
    });

    console.log('   Status:', contentResponse.status);
    
    if (contentResponse.status === 200) {
      const contentData = await contentResponse.json();
      console.log('   ✅ Contenu récupéré');
      console.log('   Nombre de pages:', Array.isArray(contentData) ? contentData.length : 0);
    } else {
      const text = await contentResponse.text();
      console.log('   ❌ Erreur contenu');
      console.log('   Réponse:', text.substring(0, 100));
    }
  } catch (error) {
    console.log('   ❌ Exception:', error.message);
  }

  // Test 4: Vérifier la page admin
  console.log('\n4️⃣ Test de la page admin...');
  try {
    const adminResponse = await fetch(`${siteUrl}/admin`);
    console.log('   Status:', adminResponse.status);
    console.log('   Content-Type:', adminResponse.headers.get('content-type'));
    
    if (adminResponse.status === 200) {
      const adminHtml = await adminResponse.text();
      const hasLoginForm = adminHtml.includes('login-form');
      const hasPageEditor = adminHtml.includes('page-editor');
      console.log('   ✅ Page admin accessible');
      console.log('   Login form:', hasLoginForm ? '✅' : '❌');
      console.log('   Page editor:', hasPageEditor ? '✅' : '❌');
    }
  } catch (error) {
    console.log('   ❌ Exception:', error.message);
  }

  console.log('\n📋 Résumé:');
  console.log('   Si les tests échouent, attendre 30-60 secondes');
  console.log('   que les Functions Netlify soient déployées');
}

testAPIFinal();
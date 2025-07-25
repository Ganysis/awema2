async function testDeploy() {
  console.log('🧪 Test de l\'API de déploiement...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'GET'
    });
    
    console.log(`Status: ${response.status}`);
    const text = await response.text();
    console.log(`Response: ${text}`);
    
    if (response.status === 405) {
      console.log('\n✅ API accessible, test POST...\n');
      
      // Test POST
      const postResponse = await fetch('http://localhost:3000/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          siteId: 'test-site',
          siteName: 'test-deploy',
          projectData: {
            pages: [{
              id: 'home',
              name: 'Accueil',
              path: '/',
              blocks: []
            }]
          },
          plan: 'starter'
        })
      });
      
      const result = await postResponse.json();
      console.log('POST Response:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error('Erreur:', error.message);
    console.log('\n💡 Le serveur Next.js n\'est pas lancé.');
    console.log('Lancez d\'abord : npm run dev');
  }
}

testDeploy();
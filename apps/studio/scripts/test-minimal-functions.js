/**
 * Test minimal des Netlify Functions
 */

const { NetlifyFunctionsMinimal } = require('../lib/services/netlify-functions-minimal');
const crypto = require('crypto');

async function testMinimal() {
  console.log('🧪 Test Minimal Netlify Functions\n');
  
  const gen = new NetlifyFunctionsMinimal();
  
  // Créer un export minimal
  const projectData = {
    id: 'test-minimal',
    settings: { siteName: 'Test Minimal' },
    pages: [{
      id: 'home',
      title: 'Home',
      slug: '/',
      blocks: []
    }]
  };

  const exportData = {
    additionalFiles: []
  };

  // Ajouter netlify.toml
  exportData.additionalFiles.push({
    path: 'netlify.toml',
    content: gen.generateNetlifyToml()
  });

  // Ajouter les deux formats de functions
  const func1 = gen.generateHelloWorldFunction();
  exportData.additionalFiles.push({
    path: func1.path,
    content: func1.content
  });

  const func2 = gen.generateHelloWorldHandlerFunction();
  exportData.additionalFiles.push({
    path: func2.path,
    content: func2.content
  });

  // Ajouter une page HTML simple
  exportData.additionalFiles.push({
    path: 'index.html',
    content: `<!DOCTYPE html>
<html>
<head>
  <title>Test Minimal</title>
</head>
<body>
  <h1>Test Minimal Netlify Functions</h1>
  <p>Les functions devraient être accessibles à:</p>
  <ul>
    <li><a href="/.netlify/functions/hello-world">/.netlify/functions/hello-world</a></li>
    <li><a href="/.netlify/functions/hello-handler">/.netlify/functions/hello-handler</a></li>
  </ul>
  <script>
    async function test() {
      console.log('Testing functions...');
      
      try {
        const res1 = await fetch('/.netlify/functions/hello-world');
        console.log('hello-world:', res1.status, await res1.text());
      } catch (e) {
        console.error('hello-world error:', e);
      }
      
      try {
        const res2 = await fetch('/.netlify/functions/hello-handler');
        console.log('hello-handler:', res2.status, await res2.text());
      } catch (e) {
        console.error('hello-handler error:', e);
      }
    }
    test();
  </script>
</body>
</html>`
  });

  console.log('📋 Fichiers générés:');
  exportData.additionalFiles.forEach(f => {
    console.log(`   - ${f.path}`);
  });

  // Déployer via l'API
  try {
    console.log('\n📦 Déploiement...');
    const deployRequest = {
      siteId: crypto.randomUUID(),
      siteName: `test-minimal-functions-${Date.now()}`,
      plan: 'starter',
      projectData: projectData,
      additionalFiles: exportData.additionalFiles
    };

    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deployRequest)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('\n✅ Déploiement réussi!');
      console.log(`🌐 Site: ${result.siteUrl}`);
      console.log('\n⏳ Attendez 1-2 minutes puis testez:');
      console.log(`   ${result.siteUrl}/.netlify/functions/hello-world`);
      console.log(`   ${result.siteUrl}/.netlify/functions/hello-handler`);
    } else {
      console.error('❌ Erreur:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testMinimal();
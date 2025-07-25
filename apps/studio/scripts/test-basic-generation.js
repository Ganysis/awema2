#!/usr/bin/env node

/**
 * Test basique de génération
 */

require('dotenv').config({ path: '.env.local' });

async function testBasicGeneration() {
  console.log('🧪 Test basique de génération\n');
  
  // Test 1: API templates
  console.log('1️⃣ Test API /api/templates...');
  try {
    const response = await fetch('http://localhost:3000/api/templates');
    console.log('Status:', response.status);
    
    if (response.ok) {
      const templates = await response.json();
      console.log('✅ Templates:', templates.length);
    } else {
      console.log('❌ Erreur:', await response.text().then(t => t.substring(0, 200)));
    }
  } catch (error) {
    console.log('❌ Erreur fetch:', error.message);
  }
  
  // Test 2: API generate-site
  console.log('\n2️⃣ Test API /api/generate-site (mode template)...');
  try {
    const response = await fetch('http://localhost:3000/api/generate-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientData: {
          businessName: 'Test Business',
          businessType: 'plombier',
          services: ['Service 1', 'Service 2'],
          serviceAreas: ['Paris'],
          phone: '0123456789',
          email: 'test@test.fr'
        },
        config: {
          enableAI: false, // Mode template uniquement
          quality: 'standard'
        }
      })
    });
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Success:', result.success);
      console.log('Pages:', result.site?.pages?.length || 0);
    } else {
      console.log('❌ Erreur:', await response.text().then(t => t.substring(0, 200)));
    }
  } catch (error) {
    console.log('❌ Erreur fetch:', error.message);
  }
  
  // Test 3: API generate-variants simple
  console.log('\n3️⃣ Test API /api/templates/generate-variants (simple)...');
  try {
    const response = await fetch('http://localhost:3000/api/templates/generate-variants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientData: {
          businessName: 'Test',
          businessType: 'plombier',
          services: ['Service 1'],
          serviceAreas: ['Paris']
        },
        templateIds: ['urgency-first']
      })
    });
    
    console.log('Status:', response.status);
    
    const responseText = await response.text();
    console.log('Response length:', responseText.length);
    
    if (response.ok) {
      try {
        const variants = JSON.parse(responseText);
        console.log('✅ Variants:', variants.length);
      } catch (e) {
        console.log('❌ Parse error:', e.message);
        console.log('Response:', responseText.substring(0, 200));
      }
    } else {
      console.log('❌ Erreur:', responseText.substring(0, 200));
    }
  } catch (error) {
    console.log('❌ Erreur fetch:', error.message);
  }
}

testBasicGeneration().then(() => {
  console.log('\n✅ Tests basiques terminés');
}).catch(error => {
  console.error('❌ Erreur fatale:', error);
});
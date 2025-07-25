#!/usr/bin/env node

/**
 * Test de l'API de génération de variantes
 */

require('dotenv').config({ path: '.env.local' });

async function testVariantsAPI() {
  console.log('🧪 Test API génération de variantes\n');
  
  const testData = {
    clientData: {
      businessName: 'Test Plomberie',
      businessType: 'plombier',
      services: ['Dépannage', 'Installation'],
      serviceAreas: ['Paris', 'Boulogne'],
      phone: '01 23 45 67 89',
      email: 'test@plomberie.fr',
      is24x7Available: true
    },
    templateIds: ['urgency-first']
  };
  
  try {
    console.log('📤 Envoi de la requête...');
    console.time('API Response');
    
    const response = await fetch('http://localhost:3000/api/templates/generate-variants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    console.timeEnd('API Response');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API:', response.status);
      console.error(errorText.substring(0, 500));
      return;
    }
    
    const variants = await response.json();
    console.log(`\n✅ ${variants.length} variante(s) générée(s)`);
    
    variants.forEach((v, i) => {
      console.log(`\n📄 Variante ${i + 1}:`);
      console.log('- ID:', v.id);
      console.log('- Nom:', v.name);
      console.log('- Description:', v.description);
      console.log('- Blocs:', v.blocks?.length || 0);
      console.log('- Score:', v.score);
      console.log('- Theme:', v.theme?.colors?.primary);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testVariantsAPI();
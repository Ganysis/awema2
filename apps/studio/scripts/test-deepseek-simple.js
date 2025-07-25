#!/usr/bin/env node

/**
 * Test simple de DeepSeek
 */

require('dotenv').config({ path: '.env.local' });

async function testDeepSeek() {
  console.log('🧪 Test simple de DeepSeek\n');
  
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('❌ DEEPSEEK_API_KEY non configurée');
    return;
  }
  
  console.log('✅ Clé API trouvée:', apiKey.substring(0, 10) + '...');
  
  try {
    console.log('\n📡 Test de connexion à DeepSeek...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant utile.'
          },
          {
            role: 'user',
            content: 'Dis simplement "Bonjour, DeepSeek fonctionne!"'
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Erreur API:', response.status, error);
      return;
    }
    
    const data = await response.json();
    console.log('\n✅ Réponse DeepSeek:');
    console.log('Message:', data.choices[0].message.content);
    console.log('Tokens utilisés:', data.usage?.total_tokens || 'N/A');
    console.log('Modèle:', data.model);
    
    // Test d'analyse de profil
    console.log('\n🤖 Test d\'analyse de profil business...');
    
    const analysisResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `Analyse ce profil de plombier et génère un JSON simple:
            - Nom: Plomberie Express
            - Ville: Paris
            - Services: Urgence, Installation
            
            Réponds uniquement avec: {"expertise": "...", "priorite": "..."}`
          }
        ],
        temperature: 0.3,
        max_tokens: 200
      })
    });
    
    if (analysisResponse.ok) {
      const analysisData = await analysisResponse.json();
      const content = analysisData.choices[0].message.content;
      console.log('Réponse brute:', content);
      
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log('✅ JSON parsé:', parsed);
        }
      } catch (e) {
        console.log('⚠️ Pas de JSON trouvé dans la réponse');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testDeepSeek();
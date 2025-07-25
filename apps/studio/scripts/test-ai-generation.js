#!/usr/bin/env node

/**
 * Script de test pour la génération IA
 * Teste la connexion à DeepSeek et génère un exemple de contenu
 */

const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

async function testAIGeneration() {
  console.log('🧪 Test de génération IA avec DeepSeek...\n');

  // Vérifier la configuration
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('❌ DEEPSEEK_API_KEY non configurée dans .env.local');
    process.exit(1);
  }

  console.log('✅ Clé API DeepSeek trouvée');

  // Données de test
  const testClient = {
    businessName: "Plomberie Durand",
    businessType: "plombier",
    city: "Lyon",
    postalCode: "69000",
    address: "123 rue de la République",
    phone: "04 78 12 34 56",
    email: "contact@plomberie-durand.fr",
    services: [
      "Dépannage plomberie",
      "Installation sanitaire",
      "Rénovation salle de bain",
      "Débouchage canalisation"
    ],
    cities: ["Lyon", "Villeurbanne", "Caluire-et-Cuire", "Oullins", "Vénissieux"]
  };

  console.log('\n📊 Client de test:', testClient.businessName);
  console.log('🔧 Services:', testClient.services.length);
  console.log('📍 Villes:', testClient.cities.length);

  try {
    // Test direct de l'API DeepSeek
    console.log('\n🚀 Test direct de l\'API DeepSeek...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en SEO local et rédaction web français.'
          },
          {
            role: 'user',
            content: `Génère un titre H1 et une meta description pour un plombier à Lyon.
            Maximum 70 caractères pour le H1, 155 pour la meta description.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log('\n✅ Réponse DeepSeek reçue !');
    console.log('📝 Contenu généré:');
    console.log(result.choices[0].message.content);
    
    // Calculer le coût
    const tokens = result.usage.total_tokens;
    const cost = (tokens / 1000) * 0.002;
    console.log(`\n💰 Tokens utilisés: ${tokens}`);
    console.log(`💵 Coût estimé: ${cost.toFixed(4)}€`);

    // Test de l'endpoint API local
    console.log('\n🌐 Test de l\'endpoint /api/generate-site...');
    
    const apiUrl = 'http://localhost:3000/api/generate-site';
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientData: testClient,
        config: {
          quality: 'premium',
          enableAI: true,
          provider: 'deepseek',
          generateLocalPages: true,
          pagesCount: 10,
          wordsPerPage: 1500,
          enableCache: true
        }
      })
    });

    if (apiResponse.ok) {
      const apiResult = await apiResponse.json();
      console.log('\n✅ API locale fonctionnelle !');
      console.log(`📄 Pages générées: ${apiResult.stats?.totalPages || 0}`);
      console.log(`📝 Mots totaux: ${apiResult.stats?.totalWords || 0}`);
      console.log(`💰 Coût total: ${apiResult.stats?.aiCost?.toFixed(2) || '0.00'}€`);
    } else {
      console.log('\n⚠️  L\'API locale n\'est pas accessible. Assurez-vous que le serveur est démarré.');
    }

    console.log('\n🎉 Test terminé avec succès !');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Démarrer le serveur: npm run dev');
    console.log('2. Créer un nouveau client dans le dashboard');
    console.log('3. Dans l\'éditeur, cliquer sur "Génération IA"');
    console.log('4. Configurer et lancer la génération');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\n🔑 Problème d\'authentification. Vérifiez votre clé API DeepSeek.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('\n🌐 Impossible de se connecter à l\'API. Vérifiez votre connexion internet.');
    }
    
    process.exit(1);
  }
}

// Exécuter le test
testAIGeneration();
#!/usr/bin/env node

/**
 * Test deployment with contact block
 */

console.log('🚀 Test de déploiement avec bloc contact...\n');

// Charger les variables d'environnement
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

async function testContactDeploy() {
  try {
    const crypto = require('crypto');
    const timestamp = Date.now();
    const siteId = crypto.randomUUID();
    const siteName = 'test-contact-' + timestamp;

    // Données avec bloc contact
    const testData = {
      siteId: siteId,
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test Contact Form',
          businessInfo: {
            name: 'Test Contact Company',
            phone: '0123456789',
            email: 'test@contact.fr',
            address: '123 rue de Test, 75001 Paris'
          }
        },
        pages: [{
          id: 'home',
          slug: '/',
          title: 'Accueil',
          blocks: [
            {
              id: 'hero-1',
              type: 'hero-centered',
              props: {
                title: 'Bienvenue sur notre site',
                subtitle: 'Découvrez nos services',
                ctaText: 'Nous contacter',
                ctaLink: '#contact'
              }
            },
            {
              id: 'contact-1', 
              type: 'contact-form-map',
              props: {
                title: 'Contactez-nous',
                subtitle: 'Nous sommes à votre écoute',
                showMap: true,
                mapCoordinates: JSON.stringify({ lat: 48.8566, lng: 2.3522 }),
                contactInfo: JSON.stringify({
                  phone: '01 23 45 67 89',
                  email: 'contact@test.fr',
                  address: '123 rue de la Paix, 75001 Paris',
                  hours: 'Lun-Ven 9h-18h'
                }),
                formFields: JSON.stringify([
                  { name: 'name', label: 'Votre nom', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
                  { name: 'message', label: 'Message', type: 'textarea', required: true }
                ]),
                submitText: 'Envoyer le message'
              }
            }
          ]
        }],
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981'
        }
      },
      plan: 'starter'
    };

    console.log('📤 Déploiement du site avec contact...');
    console.log('   Site:', siteName);

    // Appeler l'API
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('\n❌ Erreur HTTP:', response.status);
    }
    
    console.log('\n📥 Réponse:');
    console.log(JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ URL:', result.siteUrl);
      
      // Attendre 15 secondes pour le déploiement
      console.log('\n⏳ Attente de 15 secondes...');
      await new Promise(resolve => setTimeout(resolve, 15000));
      
      // Vérifier
      console.log('\n🔍 Vérification du contenu...');
      try {
        const checkResponse = await fetch(result.siteUrl);
        console.log('   Status:', checkResponse.status);
        
        if (checkResponse.ok) {
          const html = await checkResponse.text();
          console.log('   HTML reçu:', html.length, 'caractères');
          
          // Sauvegarder pour inspection
          fs.writeFileSync('test-contact-output.html', html);
          console.log('   HTML sauvé dans test-contact-output.html');
          
          // Vérifications détaillées
          console.log('\n📊 Analyse du contenu:');
          console.log('   Hero titre:', html.includes('Bienvenue sur notre site') ? '✅' : '❌');
          console.log('   Bouton hero:', html.includes('Nous contacter') ? '✅' : '❌');
          console.log('   Contact titre:', html.includes('Contactez-nous') ? '✅' : '❌');
          console.log('   Formulaire:', html.includes('form-group') ? '✅' : '❌');
          console.log('   Map container:', html.includes('contact-map') ? '✅' : '❌');
          console.log('   Google Maps:', html.includes('maps.googleapis.com') ? '✅' : '❌');
          console.log('   Téléphone:', html.includes('01 23 45 67 89') ? '✅' : '❌');
          console.log('   Email:', html.includes('contact@test.fr') ? '✅' : '❌');
          console.log('   Adresse:', html.includes('123 rue de la Paix') ? '✅' : '❌');
          
          // Chercher les erreurs
          if (html.includes('render error')) {
            console.log('\n⚠️  Erreurs de rendu trouvées!');
          }
          if (html.includes('undefined')) {
            console.log('\n⚠️  Valeurs undefined trouvées!');
          }
          
        } else {
          const text = await checkResponse.text();
          console.log('   Erreur:', text);
        }
      } catch (err) {
        console.error('   ❌ Erreur:', err.message);
      }
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

testContactDeploy();
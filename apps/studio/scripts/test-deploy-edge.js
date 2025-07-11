#!/usr/bin/env node

/**
 * Test de déploiement avec Edge Functions
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Charger les variables d'environnement
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

async function testDeployWithEdgeFunctions() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    const timestamp = Date.now();
    const siteName = `test-edge-${timestamp}`;
    const adminEmail = `admin@${siteName}.fr`;

    console.log('🚀 Test de déploiement avec Edge Functions');
    console.log('📋 Configuration:');
    console.log('   Site:', siteName);
    console.log('   Plan: pro (avec CMS Edge)');
    console.log('   Email admin:', adminEmail);
    console.log('   Architecture: Netlify Edge Functions');
    console.log('');

    const testData = {
      siteId: crypto.randomUUID(),
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test Edge Functions',
          businessInfo: {
            name: 'Test Company Edge',
            phone: '0123456789',
            email: 'contact@test-edge.fr',
            companyName: 'Test Edge SARL'
          }
        },
        pages: [{
          id: 'home',
          slug: '/',
          title: 'Accueil',
          blocks: [{
            id: 'hero-1',
            type: 'hero-centered',
            props: {
              title: 'Site avec Edge Functions',
              subtitle: 'CMS ultra-rapide sans CORS',
              buttonText: 'Découvrir',
              buttonLink: '#features'
            }
          }, {
            id: 'features-1',
            type: 'features-grid',
            props: {
              title: 'Avantages Edge Functions',
              features: [
                {
                  icon: 'fas fa-bolt',
                  title: 'Ultra Rapide',
                  description: 'Exécution sur le CDN Netlify'
                },
                {
                  icon: 'fas fa-shield-alt',
                  title: 'Sécurisé',
                  description: 'Pas de CORS, même domaine'
                },
                {
                  icon: 'fas fa-globe',
                  title: 'Global',
                  description: 'Déployé mondialement'
                }
              ]
            }
          }]
        }],
        theme: {
          primaryColor: '#10B981'
        }
      },
      plan: 'pro',
      adminEmail: adminEmail
    };

    console.log('📤 Envoi de la requête de déploiement...\n');

    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Déploiement réussi !');
      console.log('   URL du site:', result.siteUrl);
      console.log('   URL admin:', result.adminUrl);
      console.log('');
      console.log('🔐 Identifiants de connexion:');
      console.log('   Email:', result.credentials.email);
      console.log('   Mot de passe:', result.credentials.password);
      console.log('');
      console.log('🎯 Caractéristiques Edge Functions:');
      console.log('   - Endpoints: /api/cms/*');
      console.log('   - Pas de CORS (même domaine)');
      console.log('   - Démarrage instantané');
      console.log('   - Support TypeScript natif');
      console.log('');
      console.log('💡 Pour tester:');
      console.log(`   1. Ouvrez ${result.adminUrl}`);
      console.log('   2. Connectez-vous avec les identifiants');
      console.log('   3. Vérifiez que tout fonctionne sans erreur CORS');
      console.log('');
      console.log('🧪 Test de l\'Edge Function:');
      console.log(`   curl ${result.siteUrl}/api/cms/auth/login -X POST \\`);
      console.log(`     -H "Content-Type: application/json" \\`);
      console.log(`     -d '{"email":"${result.credentials.email}","password":"${result.credentials.password}"}'`);
      
      // Sauvegarder les infos pour tests ultérieurs
      const deploymentInfo = {
        timestamp: new Date().toISOString(),
        siteName: siteName,
        siteUrl: result.siteUrl,
        adminUrl: result.adminUrl,
        credentials: result.credentials,
        architecture: 'edge-functions'
      };
      
      fs.writeFileSync(
        path.join(__dirname, `../test-edge-deployment-${timestamp}.json`),
        JSON.stringify(deploymentInfo, null, 2)
      );
      
    } else {
      console.log('❌ Échec du déploiement:', result.error);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testDeployWithEdgeFunctions();
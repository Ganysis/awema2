#!/usr/bin/env node

/**
 * Test de génération des fichiers CMS
 */

console.log('🧪 Test de génération CMS...\n');

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

async function testCMSGeneration() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    const timestamp = Date.now();
    const siteId = crypto.randomUUID();
    const siteName = `test-cms-${timestamp}`;

    console.log('📋 Test avec:');
    console.log('   Site:', siteName);
    console.log('   Plan: pro (avec CMS)');

    const testData = {
      siteId: siteId,
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test CMS Generation',
          businessInfo: {
            name: 'Test CMS',
            phone: '0123456789',
            email: 'test@cms.fr'
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
              title: 'Test CMS',
              subtitle: 'Vérification de la génération des fichiers CMS'
            }
          }]
        }],
        theme: {
          primaryColor: '#3B82F6'
        }
      },
      plan: 'pro',
      adminEmail: `admin@${siteName}.fr`
    };

    console.log('\n📤 Envoi de la requête...');

    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('\n✅ Déploiement créé');
      console.log('   URL:', result.siteUrl);
      console.log('   Admin:', result.adminUrl);
      
      // Attendre et vérifier les URLs CMS
      console.log('\n⏳ Attente de 10 secondes...');
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      console.log('\n🔍 Vérification des fichiers CMS:');
      
      const cmsFiles = [
        '/admin/',
        '/admin/index.html',
        '/admin/config.js',
        '/admin/cms.js',
        '/admin/cms.css'
      ];
      
      for (const file of cmsFiles) {
        const url = result.siteUrl.replace(/\/$/, '') + file;
        console.log(`\n   Vérification ${file}...`);
        
        try {
          const fileResponse = await fetch(url);
          console.log(`     Status: ${fileResponse.status}`);
          
          if (fileResponse.ok) {
            const content = await fileResponse.text();
            console.log(`     ✅ Trouvé (${content.length} caractères)`);
            
            if (file === '/admin/index.html' || file === '/admin/') {
              // Vérifier le contenu du CMS
              const hasLogin = content.includes('login') || content.includes('Login');
              const hasSupabase = content.includes('supabase');
              console.log(`     Login form: ${hasLogin ? 'OUI' : 'NON'}`);
              console.log(`     Supabase: ${hasSupabase ? 'OUI' : 'NON'}`);
            }
          } else {
            console.log(`     ❌ Non trouvé`);
          }
        } catch (err) {
          console.log(`     ❌ Erreur: ${err.message}`);
        }
      }
      
      // Vérifier aussi via l'API Netlify
      console.log('\n🔍 Vérification via API Netlify...');
      
      const { NetlifyAPI } = await import('@netlify/api');
      const client = new NetlifyAPI(process.env.NETLIFY_AUTH_TOKEN);
      
      try {
        const sites = await client.listSites();
        const site = sites.find(s => s.name === siteName);
        
        if (site) {
          console.log('   Site trouvé:', site.id);
          
          // Récupérer les déploiements
          const deploys = await client.listSiteDeploys({ site_id: site.id });
          if (deploys.length > 0) {
            const latestDeploy = deploys[0];
            console.log('   Dernier déploiement:', latestDeploy.id);
            console.log('   État:', latestDeploy.state);
            console.log('   Créé:', new Date(latestDeploy.created_at).toLocaleString());
            
            // Essayer de récupérer les fichiers du déploiement
            if (latestDeploy.published_at) {
              console.log('   Publié:', new Date(latestDeploy.published_at).toLocaleString());
            }
          }
        }
      } catch (netlifyError) {
        console.error('   Erreur Netlify:', netlifyError.message);
      }
      
    } else {
      console.log('\n❌ Échec:', result.error);
    }

  } catch (error) {
    console.error('\n❌ Erreur:', error);
  }
}

testCMSGeneration();
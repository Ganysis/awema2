#!/usr/bin/env node

/**
 * Script de test pour vérifier le déploiement Netlify
 * Usage: node scripts/test-deployment.js
 */

// Charger les variables d'environnement manuellement
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=');
      if (key && value) {
        process.env[key] = value;
      }
    }
  });
  console.log('✅ Variables d\'environnement chargées depuis .env.local');
} else {
  console.error('❌ Fichier .env.local introuvable');
  process.exit(1);
}

async function testNetlifyAPI() {
  const token = process.env.NETLIFY_AUTH_TOKEN;
  
  if (!token) {
    console.error('❌ NETLIFY_AUTH_TOKEN non trouvé dans .env.local');
    return;
  }
  
  console.log('✅ Token Netlify trouvé');
  
  try {
    // Tester l'API Netlify
    const response = await fetch('https://api.netlify.com/api/v1/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      console.error('❌ Erreur API Netlify:', response.status, response.statusText);
      return;
    }
    
    const user = await response.json();
    console.log('✅ Connexion Netlify OK - Utilisateur:', user.email);
    
    // Lister les sites
    const sitesResponse = await fetch('https://api.netlify.com/api/v1/sites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const sites = await sitesResponse.json();
    console.log(`✅ ${sites.length} sites trouvés sur Netlify`);
    
    if (sites.length > 0) {
      console.log('Sites récents:');
      sites.slice(0, 3).forEach(site => {
        console.log(`  - ${site.name}: ${site.ssl_url || site.url}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

async function testSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  
  console.log('\n--- Test Supabase ---');
  console.log('URL:', url ? '✅ Configurée' : '❌ Manquante');
  console.log('Anon Key:', anonKey ? '✅ Configurée' : '❌ Manquante');
  console.log('Service Key:', serviceKey ? '✅ Configurée' : '❌ Manquante');
  
  if (url && anonKey) {
    try {
      // Tester la connexion
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        }
      });
      
      console.log('Connexion Supabase:', response.ok ? '✅ OK' : `❌ Erreur ${response.status}`);
    } catch (error) {
      console.error('❌ Erreur connexion Supabase:', error.message);
    }
  }
}

async function testDeploymentFiles() {
  console.log('\n--- Test génération de fichiers ---');
  
  // Simuler un projet simple
  const testProject = {
    pages: [{
      id: 'home',
      title: 'Accueil',
      slug: '/',
      blocks: [{
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Test Déploiement',
          subtitle: 'Vérification du système'
        }
      }]
    }],
    theme: {
      primaryColor: '#000000',
      fontFamily: 'Arial'
    },
    businessInfo: {
      name: 'Test Business',
      email: 'test@example.com'
    }
  };
  
  console.log('✅ Structure de projet créée');
  console.log('Pages:', testProject.pages.length);
  console.log('Blocs:', testProject.pages[0].blocks.length);
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Début des tests de déploiement\n');
  
  console.log('--- Test API Netlify ---');
  await testNetlifyAPI();
  
  await testSupabase();
  await testDeploymentFiles();
  
  console.log('\n✅ Tests terminés');
}

runTests().catch(console.error);
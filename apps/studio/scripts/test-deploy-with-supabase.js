#!/usr/bin/env node

/**
 * Test de déploiement complet avec Supabase
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

async function testDeployWithSupabase() {
  try {
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    const timestamp = Date.now();
    const siteName = `test-supabase-${timestamp}`;
    const adminEmail = `admin@${siteName}.fr`;

    console.log('🚀 Test de déploiement avec Supabase');
    console.log('📋 Configuration:');
    console.log('   Site:', siteName);
    console.log('   Plan: pro (avec CMS)');
    console.log('   Email admin:', adminEmail);
    console.log('   Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
    console.log('');

    const testData = {
      siteId: crypto.randomUUID(),
      siteName: siteName,
      projectData: {
        settings: { 
          siteName: 'Test Supabase CMS',
          businessInfo: {
            name: 'Test Company',
            phone: '0123456789',
            email: 'contact@test.fr',
            companyName: 'Test SARL'
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
              title: 'Test Supabase CMS',
              subtitle: 'Vérification du déploiement avec base de données'
            }
          }]
        }],
        theme: {
          primaryColor: '#3B82F6'
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
      console.log('💡 Pour tester le CMS:');
      console.log(`   1. Ouvrez ${result.adminUrl}`);
      console.log('   2. Connectez-vous avec les identifiants ci-dessus');
      console.log('');
      
      // Vérifier dans Supabase
      console.log('🔍 Vérification dans Supabase...');
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      
      // Vérifier le site
      const { data: site, error: siteError } = await supabase
        .from('sites')
        .select('*')
        .eq('subdomain', siteName)
        .single();
        
      if (site) {
        console.log('✅ Site trouvé dans Supabase:', site.id);
        console.log('   Plan:', site.plan);
        console.log('   Status:', site.status);
        
        // Vérifier l'utilisateur
        const { data: user, error: userError } = await supabase
          .from('cms_users')
          .select('*')
          .eq('site_id', site.id)
          .single();
          
        if (user) {
          console.log('✅ Utilisateur CMS trouvé:', user.email);
          console.log('   Rôle:', user.role);
          console.log('   Actif:', user.is_active);
        } else {
          console.log('❌ Utilisateur CMS non trouvé:', userError);
        }
      } else {
        console.log('❌ Site non trouvé dans Supabase:', siteError);
      }
      
    } else {
      console.log('❌ Échec du déploiement:', result.error);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testDeployWithSupabase();
#!/usr/bin/env node

/**
 * Script de test de connexion au CMS Supabase
 * Teste l'authentification avec admin@admin.fr / admin
 */

require('dotenv').config({ path: '../.env.local' });

// Configuration Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variables d\'environnement manquantes !');
  console.error('Assurez-vous que .env.local contient :');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

console.log('🔧 Configuration Supabase :');
console.log(`   URL : ${SUPABASE_URL}`);
console.log('');

// Fonction pour tester la connexion
async function testConnection() {
  try {
    console.log('🔐 Test de connexion avec admin@admin.fr...');
    
    // 1. Récupérer le site_id
    console.log('📍 Recherche du site de test...');
    const sitesResponse = await fetch(`${SUPABASE_URL}/rest/v1/cms_sites?domain=eq.test-plomberie.netlify.app`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!sitesResponse.ok) {
      throw new Error(`Erreur lors de la récupération du site : ${sitesResponse.status}`);
    }
    
    const sites = await sitesResponse.json();
    if (sites.length === 0) {
      throw new Error('Site de test non trouvé ! Exécutez d\'abord create-test-site.sql');
    }
    
    const site = sites[0];
    console.log('✅ Site trouvé :', site.site_name);
    console.log('   ID :', site.id);
    
    // 2. Tester l'authentification via RPC
    console.log('\n🔑 Test d\'authentification...');
    const authResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_user_password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_email: 'admin@admin.fr',
        user_password: 'admin',
        user_site_id: site.id
      })
    });
    
    if (!authResponse.ok) {
      const error = await authResponse.text();
      throw new Error(`Erreur d'authentification : ${error}`);
    }
    
    const authResult = await authResponse.json();
    const user = authResult[0];
    
    if (!user || !user.success) {
      throw new Error(user?.message || 'Échec de l\'authentification');
    }
    
    console.log('✅ Authentification réussie !');
    console.log('   User ID :', user.id);
    console.log('   Email :', user.email);
    console.log('   Rôle :', user.role);
    console.log('   Nom :', user.full_name);
    
    // 3. Créer une session
    console.log('\n🔐 Création d\'une session...');
    const sessionResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/create_user_session`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_user_id: user.id,
        p_ip_address: '127.0.0.1',
        p_user_agent: 'Test Script'
      })
    });
    
    if (!sessionResponse.ok) {
      const error = await sessionResponse.text();
      throw new Error(`Erreur création session : ${error}`);
    }
    
    const sessionResult = await sessionResponse.json();
    const session = sessionResult[0];
    
    console.log('✅ Session créée !');
    console.log('   Session ID :', session.session_id);
    console.log('   Token :', session.session_token.substring(0, 20) + '...');
    console.log('   Expire :', new Date(session.expires_at).toLocaleString());
    
    // 4. Valider la session
    console.log('\n🔍 Validation de la session...');
    const validateResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/validate_session`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_token: session.session_token
      })
    });
    
    if (!validateResponse.ok) {
      throw new Error('Erreur validation session');
    }
    
    const validateResult = await validateResponse.json();
    const validatedUser = validateResult[0];
    
    console.log('✅ Session valide !');
    console.log('   User vérifié :', validatedUser.email);
    
    // 5. Récupérer le contenu
    console.log('\n📄 Récupération du contenu...');
    const contentResponse = await fetch(`${SUPABASE_URL}/rest/v1/cms_content?site_id=eq.${site.id}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!contentResponse.ok) {
      throw new Error('Erreur récupération contenu');
    }
    
    const content = await contentResponse.json();
    console.log('✅ Contenu récupéré :');
    content.forEach(page => {
      console.log(`   - /${page.page_slug} : ${page.data.title}`);
    });
    
    // Résumé final
    console.log('\n========================================');
    console.log('✅ TOUS LES TESTS RÉUSSIS !');
    console.log('========================================');
    console.log('');
    console.log('Le CMS est correctement configuré et fonctionne.');
    console.log('Vous pouvez vous connecter avec :');
    console.log('  Email : admin@admin.fr');
    console.log('  Mot de passe : admin');
    console.log('  Site ID : ' + site.id);
    console.log('');
    console.log('Token de session pour tests : ');
    console.log(session.session_token);
    console.log('');
    
  } catch (error) {
    console.error('\n❌ ERREUR :', error.message);
    console.error('');
    console.error('Vérifiez que :');
    console.error('1. Le script SQL a été exécuté (setup-supabase-production.sql)');
    console.error('2. Le site de test a été créé (create-test-site.sql)');
    console.error('3. Les variables d\'environnement sont correctes');
    console.error('4. Les politiques RLS sont bien configurées');
    process.exit(1);
  }
}

// Lancer le test
testConnection();
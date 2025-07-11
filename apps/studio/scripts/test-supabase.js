#!/usr/bin/env node

/**
 * Test de connexion Supabase
 */

console.log('🔍 Test de connexion Supabase...\n');

// Charger les variables d'environnement manuellement
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

async function testSupabase() {
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('📋 Configuration:');
    console.log('   URL:', supabaseUrl);
    console.log('   Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NON DÉFINI');

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Configuration manquante !');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Client Supabase créé');

    // Test 1: Vérifier les tables
    console.log('\n🔍 Vérification des tables...');
    
    const { data: sites, error: sitesError } = await supabase
      .from('sites')
      .select('count')
      .limit(1);

    if (sitesError) {
      console.error('❌ Erreur table sites:', sitesError.message);
    } else {
      console.log('✅ Table sites accessible');
    }

    // Test 2: Créer un site de test
    console.log('\n🧪 Test d\'insertion...');
    
    const testSite = {
      name: 'Site de test Supabase',
      subdomain: 'test-supabase-' + Date.now(),
      plan: 'starter'
    };

    const { data: newSite, error: insertError } = await supabase
      .from('sites')
      .insert(testSite)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erreur insertion:', insertError.message);
      console.error('   Détails:', insertError);
    } else {
      console.log('✅ Site créé:', newSite.id);
      
      // Nettoyer
      const { error: deleteError } = await supabase
        .from('sites')
        .delete()
        .eq('id', newSite.id);
        
      if (!deleteError) {
        console.log('🧹 Site de test supprimé');
      }
    }

    console.log('\n✅ Connexion Supabase fonctionnelle !');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
  }
}

testSupabase();
#!/usr/bin/env node

/**
 * Test direct de Supabase
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

async function testSupabaseDirect() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('🔗 Configuration Supabase:');
    console.log('   URL:', supabaseUrl);
    console.log('   Service Key:', supabaseServiceKey ? '✅ Présente' : '❌ Manquante');
    console.log('');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Variables Supabase manquantes');
      return;
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Test 1: Créer un site
    console.log('🧪 Test 1: Création d\'un site...');
    const siteId = crypto.randomUUID();
    const siteName = `test-direct-${Date.now()}`;
    
    const siteData = {
      id: siteId,
      name: siteName,
      subdomain: siteName,
      plan: 'pro',
      status: 'active',
      settings: { test: true },
      features: { cms: true, forms: true, seo: true }
    };
    
    const { data: newSite, error: createError } = await supabase
      .from('sites')
      .insert(siteData)
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Erreur création:', createError);
      return;
    }
    
    console.log('✅ Site créé:', newSite);
    
    // Test 2: Créer un utilisateur CMS
    console.log('\n🧪 Test 2: Création d\'un utilisateur CMS...');
    const userData = {
      email: `admin@${siteName}.fr`,
      password_hash: Buffer.from('password123').toString('base64'),
      role: 'admin',
      site_id: siteId,
      full_name: 'Test Admin',
      is_active: true
    };
    
    const { data: newUser, error: userError } = await supabase
      .from('cms_users')
      .insert(userData)
      .select()
      .single();
    
    if (userError) {
      console.error('❌ Erreur utilisateur:', userError);
    } else {
      console.log('✅ Utilisateur créé:', newUser.email);
    }
    
    // Test 3: Lister les sites
    console.log('\n🧪 Test 3: Liste des sites...');
    const { data: sites, error: listError } = await supabase
      .from('sites')
      .select('id, name, subdomain, plan, status')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (listError) {
      console.error('❌ Erreur liste:', listError);
    } else {
      console.log('✅ Sites trouvés:', sites.length);
      sites.forEach(s => console.log(`   - ${s.subdomain} (${s.plan})`));
    }
    
    // Nettoyer
    console.log('\n🧹 Nettoyage...');
    const { error: deleteError } = await supabase
      .from('sites')
      .delete()
      .eq('id', siteId);
    
    if (!deleteError) {
      console.log('✅ Site de test supprimé');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testSupabaseDirect();
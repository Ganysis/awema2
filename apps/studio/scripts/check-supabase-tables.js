#!/usr/bin/env node

/**
 * Script pour vérifier les tables existantes dans Supabase
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkTables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Variables d\'environnement manquantes');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
    console.error('SUPABASE_SERVICE_KEY:', !!supabaseServiceKey);
    process.exit(1);
  }

  console.log('🔍 Vérification des tables Supabase...');
  console.log('URL:', supabaseUrl);
  console.log('');

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Liste des tables à vérifier
  const tablesToCheck = [
    // Tables sans préfixe (schema supabase-tables.sql)
    'sites',
    'cms_users',
    'content',
    'media',
    'content_versions',
    'form_submissions',
    'analytics_events',
    'api_tokens',
    'cache_entries',
    
    // Tables avec préfixe cms_ (schema setup-supabase-production.sql)
    'cms_sites',
    'cms_content',
    'cms_media',
    'cms_versions',
    'cms_sessions',
    'cms_audit_logs',
    'cms_backups',
    'cms_form_submissions'
  ];

  console.log('📋 Vérification de', tablesToCheck.length, 'tables possibles...\n');

  const existingTables = [];
  const missingTables = [];

  for (const table of tablesToCheck) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          missingTables.push(table);
          console.log(`❌ ${table} - N'existe pas`);
        } else {
          console.log(`⚠️  ${table} - Erreur: ${error.message}`);
        }
      } else {
        existingTables.push(table);
        console.log(`✅ ${table} - Existe`);
      }
    } catch (err) {
      console.log(`❌ ${table} - Exception: ${err.message}`);
      missingTables.push(table);
    }
  }

  console.log('\n📊 Résumé:');
  console.log(`- Tables existantes: ${existingTables.length}`);
  console.log(`- Tables manquantes: ${missingTables.length}`);

  if (existingTables.length > 0) {
    console.log('\n✅ Tables trouvées:');
    existingTables.forEach(t => console.log(`   - ${t}`));
  }

  if (missingTables.length > 0) {
    console.log('\n❌ Tables manquantes:');
    missingTables.forEach(t => console.log(`   - ${t}`));
  }

  // Déterminer quelle convention est utilisée
  console.log('\n🔍 Analyse de la convention utilisée:');
  
  const hasCmsPrefix = existingTables.some(t => t.startsWith('cms_') && t !== 'cms_users');
  const hasNoPrefix = existingTables.some(t => ['sites', 'content', 'media'].includes(t));

  if (hasCmsPrefix && !hasNoPrefix) {
    console.log('📌 Convention détectée: Tables avec préfixe cms_ (setup-supabase-production.sql)');
    console.log('   ➡️  Utilisez les noms: cms_sites, cms_content, cms_media, etc.');
  } else if (hasNoPrefix && !hasCmsPrefix) {
    console.log('📌 Convention détectée: Tables sans préfixe (supabase-tables.sql)');
    console.log('   ➡️  Utilisez les noms: sites, content, media, etc.');
  } else if (existingTables.length === 0) {
    console.log('⚠️  Aucune table CMS trouvée!');
    console.log('   ➡️  Exécutez d\'abord un des scripts SQL:');
    console.log('      - scripts/setup-supabase-production.sql (recommandé)');
    console.log('      - lib/db/schema/supabase-tables.sql');
  } else {
    console.log('⚠️  Convention mixte détectée - cela peut causer des problèmes');
  }
}

checkTables().catch(console.error);
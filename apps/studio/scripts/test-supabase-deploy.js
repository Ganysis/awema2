/**
 * Script de test pour déploiement avec Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zvcvhundfeqwufmvtmzd.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjEzODc3MywiZXhwIjoyMDY3NzE0NzczfQ.eTmQmgchXQJwOyh6kWpq_7GwiR5OBww2hjxiKE_7Z0Q';

console.log('🚀 Test de déploiement avec Supabase');
console.log('URL:', supabaseUrl);
console.log('');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testDeployment() {
  try {
    // 1. Vérifier quelle convention de tables est utilisée
    console.log('1️⃣  Vérification des tables...');
    
    const hasCmsSites = await checkTable('cms_sites');
    const hasSites = await checkTable('sites');
    
    let tableName;
    if (hasCmsSites) {
      console.log('✅ Utilisation de la convention cms_* (setup-supabase-production.sql)');
      tableName = 'cms_sites';
    } else if (hasSites) {
      console.log('✅ Utilisation de la convention standard (supabase-tables.sql)');
      tableName = 'sites';
    } else {
      console.log('❌ Aucune table sites trouvée!');
      console.log('');
      console.log('📝 Création des tables nécessaires...');
      
      // Lire et exécuter le script SQL
      const sqlPath = path.join(__dirname, 'setup-supabase-production.sql');
      if (fs.existsSync(sqlPath)) {
        console.log('   Fichier SQL trouvé:', sqlPath);
        console.log('   ⚠️  Exécutez ce script dans votre console Supabase');
        console.log('   ou utilisez: supabase db push < scripts/setup-supabase-production.sql');
      }
      return;
    }
    
    // 2. Créer un site de test
    console.log('');
    console.log('2️⃣  Création d\'un site de test...');
    
    const crypto = require('crypto');
    const testId = crypto.randomUUID();
    const timestamp = Date.now();
    
    const testSite = {
      id: testId,
      site_name: 'Site de Test Supabase',
      domain: `test-${timestamp}.netlify.app`,
      status: 'active',
      config: {
        theme: 'default',
        features: ['cms_basic']
      }
    };
    
    const { data: site, error: siteError } = await supabase
      .from(tableName)
      .insert(testSite)
      .select()
      .single();
    
    if (siteError) {
      console.log('❌ Erreur création site:', siteError.message);
      return;
    }
    
    console.log('✅ Site créé:', site.domain);
    
    // 3. Vérifier la lecture
    console.log('');
    console.log('3️⃣  Vérification de la lecture...');
    
    const { data: readSite, error: readError } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', testId)
      .single();
    
    if (readError) {
      console.log('❌ Erreur lecture:', readError.message);
    } else {
      console.log('✅ Site lu avec succès');
    }
    
    // 4. Mise à jour
    console.log('');
    console.log('4️⃣  Test de mise à jour...');
    
    const { error: updateError } = await supabase
      .from(tableName)
      .update({ 
        netlify_site_id: 'test-netlify-id',
        last_deployed_at: new Date().toISOString()
      })
      .eq('id', testId);
    
    if (updateError) {
      console.log('❌ Erreur mise à jour:', updateError.message);
    } else {
      console.log('✅ Mise à jour réussie');
    }
    
    // 5. Nettoyage
    console.log('');
    console.log('5️⃣  Nettoyage...');
    
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq('id', testId);
    
    if (deleteError) {
      console.log('❌ Erreur suppression:', deleteError.message);
    } else {
      console.log('✅ Site de test supprimé');
    }
    
    console.log('');
    console.log('✅ Test terminé avec succès!');
    console.log('');
    console.log('📝 Configuration à utiliser:');
    console.log(`   - Table sites: ${tableName}`);
    console.log(`   - Convention: ${hasCmsSites ? 'PRODUCTION_TABLES' : 'STANDARD_TABLES'}`);
    console.log('');
    console.log('💡 Mettez à jour lib/config/supabase-tables.config.ts avec:');
    console.log(`   export const SUPABASE_TABLES = ${hasCmsSites ? 'PRODUCTION_TABLES' : 'STANDARD_TABLES'};`);
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

async function checkTable(tableName) {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
    
    return !error || !error.message.includes('does not exist');
  } catch {
    return false;
  }
}

// Exécuter le test
testDeployment();
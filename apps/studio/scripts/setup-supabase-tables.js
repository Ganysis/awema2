#!/usr/bin/env node

/**
 * Script pour créer les tables Supabase si elles n'existent pas
 */

const fs = require('fs');
const path = require('path');

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

async function setupSupabaseTables() {
  try {
    // Import dynamique de Supabase
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Variables Supabase manquantes dans .env.local');
      return;
    }
    
    console.log('🔗 Connexion à Supabase...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Vérifier si la table sites existe
    console.log('🔍 Vérification des tables...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('sites')
      .select('id')
      .limit(1);
    
    if (tablesError && tablesError.code === '42P01') {
      console.log('⚠️  Les tables n\'existent pas, création en cours...');
      
      // Lire le schéma SQL
      const schemaPath = path.join(__dirname, '..', 'lib', 'db', 'schema', 'supabase-tables.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      console.log('📝 Exécution du schéma SQL...');
      console.log('ℹ️  Veuillez exécuter le contenu du fichier suivant dans l\'éditeur SQL de Supabase :');
      console.log('   ', schemaPath);
      console.log('\n✅ Une fois fait, relancez ce script pour vérifier.');
      
      // Afficher les premières lignes du schéma
      console.log('\n--- Début du schéma SQL ---');
      console.log(schema.split('\n').slice(0, 20).join('\n'));
      console.log('... (voir le fichier complet)');
      
    } else if (tablesError) {
      console.error('❌ Erreur lors de la vérification:', tablesError);
    } else {
      console.log('✅ Les tables existent déjà !');
      
      // Tester l'insertion
      console.log('\n🧪 Test d\'insertion...');
      const testSite = {
        name: 'Test Site ' + Date.now(),
        subdomain: 'test-' + Date.now(),
        plan: 'starter',
        admin_email: 'test@example.com',
        status: 'active'
      };
      
      const { data: newSite, error: insertError } = await supabase
        .from('sites')
        .insert(testSite)
        .select()
        .single();
      
      if (insertError) {
        console.error('❌ Erreur d\'insertion:', insertError);
      } else {
        console.log('✅ Insertion réussie:', newSite.id);
        
        // Nettoyer
        const { error: deleteError } = await supabase
          .from('sites')
          .delete()
          .eq('id', newSite.id);
        
        if (!deleteError) {
          console.log('🧹 Test nettoyé');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    console.log('\n💡 Assurez-vous que :');
    console.log('   1. Les variables NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définies');
    console.log('   2. Le module @supabase/supabase-js est installé');
    console.log('   3. Les tables ont été créées dans Supabase');
  }
}

setupSupabaseTables();
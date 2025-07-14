#!/usr/bin/env node

/**
 * Script pour créer automatiquement la table cms_content dans Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Charger les clés depuis .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let supabaseUrl = '';
let supabaseServiceKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
  const keyMatch = envContent.match(/SUPABASE_SERVICE_KEY=(.+)/);
  
  if (urlMatch) supabaseUrl = urlMatch[1].trim();
  if (keyMatch) supabaseServiceKey = keyMatch[1].trim();
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erreur: Clés Supabase non trouvées dans .env.local');
  process.exit(1);
}

async function setupSupabaseTables() {
  console.log('🔧 Configuration de la table cms_content dans Supabase...\n');
  
  // Créer le client avec la clé service (admin)
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // Vérifier si la table existe déjà
    const { data: existingTable, error: checkError } = await supabase
      .from('cms_content')
      .select('id')
      .limit(1);

    if (!checkError || checkError.code !== '42P01') {
      console.log('✅ La table cms_content existe déjà');
      return;
    }

    console.log('📦 Création de la table cms_content...');
    
    // Créer la table via l'API SQL
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Créer la table cms_content
        CREATE TABLE IF NOT EXISTS cms_content (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            site_id UUID NOT NULL,
            page_id VARCHAR(255) NOT NULL,
            page_title VARCHAR(255),
            page_slug VARCHAR(255),
            blocks JSONB DEFAULT '[]'::jsonb,
            seo JSONB DEFAULT '{}'::jsonb,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            created_by UUID,
            updated_by UUID,
            version INTEGER DEFAULT 1,
            is_published BOOLEAN DEFAULT true,
            published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(site_id, page_slug)
        );

        -- Créer les index
        CREATE INDEX IF NOT EXISTS idx_cms_content_site_id ON cms_content(site_id);
        CREATE INDEX IF NOT EXISTS idx_cms_content_page_slug ON cms_content(page_slug);

        -- Activer RLS
        ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

        -- Politique de lecture publique
        CREATE POLICY "Enable read access for all users" ON cms_content
            FOR SELECT USING (true);

        -- Politique d'écriture publique (temporaire pour les tests)
        CREATE POLICY "Enable insert for all users" ON cms_content
            FOR INSERT WITH CHECK (true);

        CREATE POLICY "Enable update for all users" ON cms_content
            FOR UPDATE USING (true);

        -- Fonction pour mettre à jour updated_at
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Trigger pour updated_at
        DROP TRIGGER IF EXISTS update_cms_content_updated_at ON cms_content;
        CREATE TRIGGER update_cms_content_updated_at 
            BEFORE UPDATE ON cms_content
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
      `
    });

    if (error) {
      // Si exec_sql n'existe pas, essayer une approche différente
      console.log('⚠️  La fonction exec_sql n\'est pas disponible');
      console.log('📋 Veuillez exécuter manuellement le SQL suivant dans Supabase:');
      console.log('\n' + '='.repeat(60));
      console.log(fs.readFileSync(path.join(__dirname, 'create-cms-content-table.sql'), 'utf8'));
      console.log('='.repeat(60) + '\n');
      return;
    }

    console.log('✅ Table cms_content créée avec succès !');
    
    // Vérifier que tout fonctionne
    const { data: testQuery } = await supabase
      .from('cms_content')
      .select('*')
      .limit(1);
      
    console.log('✅ Table vérifiée et fonctionnelle');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n📋 Solution alternative:');
    console.log('1. Allez sur https://app.supabase.com/project/zvcvhundfeqwufmvtmzd/editor');
    console.log('2. Copiez le contenu de scripts/create-cms-content-table.sql');
    console.log('3. Exécutez la requête SQL');
  }
}

// Alternative simple si la méthode RPC ne fonctionne pas
async function showManualInstructions() {
  console.log('\n📋 Instructions manuelles pour Supabase:\n');
  console.log('1. Allez sur: https://app.supabase.com/project/zvcvhundfeqwufmvtmzd/editor');
  console.log('2. Cliquez sur "New Query"');
  console.log('3. Copiez et exécutez ce SQL:\n');
  
  const sqlContent = fs.readFileSync(
    path.join(__dirname, 'create-cms-content-table.sql'), 
    'utf8'
  );
  console.log(sqlContent);
  
  console.log('\n4. Cliquez sur "Run"');
  console.log('5. La table sera créée instantanément');
}

// Lancer le setup
setupSupabaseTables().then(() => {
  showManualInstructions();
});
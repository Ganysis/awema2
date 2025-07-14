const { createClient } = require('@supabase/supabase-js');

// Lecture directe des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cxtfgwhcmhhqtafuehzz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dGZnd2hjbWhocXRhZnVlaHp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjI3NDEzNCwiZXhwIjoyMDUxODUwMTM0fQ.zTJv3sxP8kCo0xt9bLKNrcnCPQWKCjfPT1lh5EtGNds';

console.log('🔍 Vérification rapide des tables Supabase...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable(tableName) {
  try {
    const { error } = await supabase.from(tableName).select('id').limit(1);
    if (error) {
      if (error.message.includes('does not exist')) {
        return false;
      }
      console.log(`⚠️  ${tableName}: ${error.message}`);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

async function main() {
  // Tables à vérifier
  const tables = [
    'sites', 'cms_sites',
    'content', 'cms_content', 
    'media', 'cms_media',
    'cms_users'
  ];

  console.log('Tables existantes:');
  for (const table of tables) {
    const exists = await checkTable(table);
    if (exists) {
      console.log(`✅ ${table}`);
    }
  }

  console.log('\n💡 Recommandation:');
  
  const hasCmsSites = await checkTable('cms_sites');
  const hasSites = await checkTable('sites');
  
  if (hasCmsSites && !hasSites) {
    console.log('Utilisez les tables avec préfixe cms_ (cms_sites, cms_content, etc.)');
  } else if (hasSites && !hasCmsSites) {
    console.log('Utilisez les tables sans préfixe (sites, content, etc.)');
  } else {
    console.log('Aucune table CMS trouvée - exécutez d\'abord un script SQL');
  }
}

main().catch(console.error);
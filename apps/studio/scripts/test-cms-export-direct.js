/**
 * Test direct de la génération des Netlify Functions
 */

// Définir les variables d'environnement
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://zvcvhundfeqwufmvtmzd.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.ZzrsNEiZUqzqb0zMUCwi1CCt5RJbX8G-2MpmOW2ZMAY';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjEzODc3MywiZXhwIjoyMDY3NzE0NzczfQ.eTmQmgchXQJwOyh6kWpq_7GwiR5OBww2hjxiKE_7Z0Q';

const { CMSExportIntegration } = require('../lib/services/cms-export-integration');

async function testCMSExportDirect() {
  console.log('🔍 Test direct CMSExportIntegration\n');
  
  const cmsExport = new CMSExportIntegration({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
  
  const siteConfig = {
    siteId: 'test-site-123',
    siteName: 'Test Site',
    subdomain: 'test',
    plan: 'pro',
    adminEmail: 'admin@admin.fr',
    adminPassword: 'admin'
  };
  
  const options = {
    includeCms: true,
    cmsLevel: 'basic',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    projectData: { pages: [] }
  };
  
  console.log('📦 Génération des fichiers CMS...');
  const files = cmsExport.generateCMSFiles(siteConfig, options);
  
  console.log(`\n✅ ${files.length} fichiers générés:\n`);
  
  // Afficher les fichiers générés
  files.forEach(file => {
    console.log(`   - ${file.path}`);
  });
  
  // Vérifier spécifiquement les Netlify Functions
  console.log('\n🔍 Vérification des Netlify Functions:');
  const functionFiles = files.filter(f => f.path.includes('netlify/functions'));
  
  if (functionFiles.length > 0) {
    console.log(`✅ ${functionFiles.length} functions trouvées:`);
    functionFiles.forEach(f => {
      console.log(`   - ${f.path} (${f.content.length} bytes)`);
    });
  } else {
    console.log('❌ Aucune Netlify Function générée!');
  }
  
  // Vérifier netlify.toml
  const netlifyToml = files.find(f => f.path === 'netlify.toml');
  if (netlifyToml) {
    console.log('\n✅ netlify.toml généré:');
    console.log(netlifyToml.content.split('\n').slice(0, 20).join('\n'));
  } else {
    console.log('\n❌ netlify.toml non généré!');
  }
}

testCMSExportDirect();
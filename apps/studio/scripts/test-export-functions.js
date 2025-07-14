/**
 * Test de l'export avec Netlify Functions
 */

// Définir les variables d'environnement manuellement
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://zvcvhundfeqwufmvtmzd.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.ZzrsNEiZUqzqb0zMUCwi1CCt5RJbX8G-2MpmOW2ZMAY';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjEzODc3MywiZXhwIjoyMDY3NzE0NzczfQ.eTmQmgchXQJwOyh6kWpq_7GwiR5OBww2hjxiKE_7Z0Q';

const fs = require('fs');
const path = require('path');

async function testExport() {
  console.log('🔍 Test Export avec Netlify Functions\n');
  
  const projectData = {
    id: 'test-project',
    settings: {
      siteName: 'Test Functions',
      businessInfo: {
        name: 'Test Business',
        email: 'test@test.fr'
      }
    },
    pages: [{
      id: 'home',
      title: 'Accueil', 
      slug: '/',
      blocks: [{
        id: 'hero-1',
        type: 'hero-ultra-modern',
        variant: 'gradient-animation',
        props: {
          title: 'Test Netlify Functions',
          subtitle: 'Vérification que les functions sont bien générées'
        }
      }]
    }]
  };

  const exportOptions = {
    includeCms: true,
    cmsLevel: 'basic',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    projectData: projectData
  };

  try {
    const response = await fetch('http://localhost:3000/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectData,
        options: exportOptions
      })
    });

    if (!response.ok) {
      throw new Error(`Export failed: ${response.status}`);
    }

    // Sauvegarder le ZIP
    const buffer = await response.arrayBuffer();
    const zipPath = path.join(__dirname, 'test-export.zip');
    fs.writeFileSync(zipPath, Buffer.from(buffer));
    
    console.log('✅ Export sauvegardé:', zipPath);

    // Analyser le contenu
    const { execSync } = require('child_process');
    const contents = execSync(`unzip -l ${zipPath}`, { encoding: 'utf-8' });
    
    console.log('\n📋 Fichiers Netlify dans l\'export:');
    const netlifyFiles = contents.split('\n').filter(line => 
      line.includes('netlify') || line.includes('functions')
    );
    
    netlifyFiles.forEach(file => console.log(file));
    
    // Vérifier les fichiers critiques
    const requiredFiles = [
      'netlify.toml',
      'netlify/functions/cms-auth.js',
      'netlify/functions/cms-content.js',
      'netlify/functions/package.json'
    ];
    
    console.log('\n✅ Vérification des fichiers requis:');
    requiredFiles.forEach(file => {
      const exists = contents.includes(file);
      console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    });

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testExport();
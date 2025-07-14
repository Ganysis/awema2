/**
 * Vérifier la structure des Netlify Functions dans le ZIP exporté
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Définir les variables d'environnement
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://zvcvhundfeqwufmvtmzd.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.ZzrsNEiZUqzqb0zMUCwi1CCt5RJbX8G-2MpmOW2ZMAY';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjEzODc3MywiZXhwIjoyMDY3NzE0NzczfQ.eTmQmgchXQJwOyh6kWpq_7GwiR5OBww2hjxiKE_7Z0Q';

async function verifyNetlifyFunctions() {
  console.log('🔍 Vérification des Netlify Functions\n');
  
  const projectData = {
    id: 'test-functions',
    settings: {
      siteName: 'Test Functions',
      businessInfo: { name: 'Test', email: 'test@test.fr' }
    },
    pages: [{
      id: 'home',
      title: 'Home',
      slug: '/',
      blocks: []
    }]
  };

  try {
    // D'abord sauvegarder le projet
    console.log('💾 Sauvegarde du projet...');
    const saveResponse = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: projectData })
    });
    
    if (!saveResponse.ok) {
      throw new Error('Failed to save project');
    }
    
    // 1. Créer l'export
    console.log('📦 Création de l\'export...');
    const response = await fetch('http://localhost:3000/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: projectData.id,
        options: {
          includeCms: true,
          cmsLevel: 'basic',
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Export failed: ${error}`);
    }

    // 2. Sauvegarder le ZIP
    const buffer = await response.arrayBuffer();
    const zipPath = path.join(__dirname, 'test-functions.zip');
    fs.writeFileSync(zipPath, Buffer.from(buffer));
    console.log(`✅ Export sauvegardé: ${zipPath}\n`);

    // 3. Lister le contenu
    console.log('📋 Contenu du ZIP:');
    const contents = execSync(`unzip -l ${zipPath}`, { encoding: 'utf-8' });
    console.log(contents);

    // 4. Extraire et vérifier netlify.toml
    const tempDir = path.join(__dirname, 'temp-extract');
    execSync(`rm -rf ${tempDir} && mkdir -p ${tempDir}`);
    execSync(`unzip -q ${zipPath} -d ${tempDir}`);
    
    console.log('\n📄 Contenu de netlify.toml:');
    const netlifyTomlPath = path.join(tempDir, 'netlify.toml');
    if (fs.existsSync(netlifyTomlPath)) {
      const tomlContent = fs.readFileSync(netlifyTomlPath, 'utf-8');
      console.log(tomlContent);
    } else {
      console.log('❌ netlify.toml non trouvé!');
    }

    // 5. Vérifier les functions
    console.log('\n🔍 Vérification des functions:');
    const functionsDir = path.join(tempDir, 'netlify', 'functions');
    if (fs.existsSync(functionsDir)) {
      const functions = fs.readdirSync(functionsDir);
      console.log(`✅ ${functions.length} functions trouvées:`);
      functions.forEach(func => {
        const funcPath = path.join(functionsDir, func);
        const stats = fs.statSync(funcPath);
        console.log(`   - ${func} (${stats.size} bytes)`);
      });
    } else {
      console.log('❌ Répertoire netlify/functions non trouvé!');
    }

    // 6. Nettoyer
    execSync(`rm -rf ${tempDir} ${zipPath}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

verifyNetlifyFunctions();
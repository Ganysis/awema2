#!/usr/bin/env node

/**
 * Test de l'export CMS uniquement
 */

const { StaticExportService } = require('../.next/server/app/api/export/static-export-simplified');

async function testCMSExport() {
  console.log('🧪 Test de l\'export CMS...\n');
  
  const projectData = {
    settings: { siteName: 'Test CMS' },
    pages: [{
      id: 'home',
      slug: '/',
      title: 'Accueil',
      blocks: []
    }],
    theme: {},
    businessInfo: { name: 'Test' }
  };
  
  const options = {
    includeCms: true,
    cmsLevel: 'full',
    cmsPassword: 'test123',
    cmsAdminEmail: 'admin@test.fr',
    cmsPlan: 'pro',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  };
  
  try {
    console.log('Options:', options);
    
    const result = await StaticExportService.exportSite(projectData, options);
    
    console.log('\n📦 Résultat de l\'export:');
    console.log('   HTML:', result.html.length, 'caractères');
    console.log('   CSS:', result.css.length, 'caractères');
    console.log('   JS:', result.js.length, 'caractères');
    console.log('   Fichiers additionnels:', result.additionalFiles.length);
    
    console.log('\n📄 Fichiers CMS:');
    const cmsFiles = result.additionalFiles.filter(f => f.path.includes('admin'));
    cmsFiles.forEach(file => {
      console.log(`   - ${file.path} (${file.content.length} caractères)`);
    });
    
    if (cmsFiles.length === 0) {
      console.log('   ❌ Aucun fichier CMS trouvé !');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Charger les variables d'environnement
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

testCMSExport();
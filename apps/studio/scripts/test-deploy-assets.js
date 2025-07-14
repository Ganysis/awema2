#!/usr/bin/env node

const { StaticExportService } = require('../lib/services/static-export-simplified');
const { NetlifyDeployService } = require('../lib/services/netlify-deploy.service');
const fs = require('fs').promises;
const path = require('path');

async function testDeploymentAssets() {
  console.log('🔍 Test de déploiement avec vérification des assets\n');

  // Mock project data
  const projectData = {
    id: 'test-' + Date.now(),
    projectName: 'Test Asset Deployment',
    businessInfo: {
      name: 'Test Business',
      industry: 'plombier',
      email: 'test@example.com',
      phone: '0123456789',
      address: '123 Test Street',
      city: 'Paris',
      postalCode: '75001',
      description: 'Test business description'
    },
    pages: [{
      id: 'home',
      name: 'Accueil',
      slug: 'index',
      blocks: [{
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Test Hero',
          subtitle: 'Testing CSS and assets deployment',
          buttonText: 'Test Button',
          buttonLink: '#',
          backgroundImage: '/assets/hero-bg.jpg'
        }
      }],
      meta: {
        title: 'Test Deployment',
        description: 'Testing CSS and assets'
      }
    }],
    siteSettings: {
      theme: {
        colors: {
          primary: '#3b82f6',
          secondary: '#1e40af'
        }
      }
    }
  };

  try {
    // Test 1: Export statique
    console.log('📦 Test 1: Export statique avec forDeployment=true');
    const exportOptions = {
      minifyHtml: false,
      minifyCss: false,
      minifyJs: false,
      forDeployment: true,
      includeCms: false
    };

    const exportData = await StaticExportService.exportSite(projectData, exportOptions);
    
    console.log('\n✅ Export data structure:');
    console.log('- HTML length:', exportData.html.length);
    console.log('- CSS length:', exportData.css.length);
    console.log('- JS length:', exportData.js.length);
    console.log('- Additional files:', exportData.additionalFiles.length);
    console.log('- Assets:', exportData.assets.length);
    
    console.log('\n📄 Additional files:');
    exportData.additionalFiles.forEach(file => {
      console.log(`  - ${file.path} (${file.content.length} bytes)`);
    });
    
    console.log('\n🖼️ Assets:');
    exportData.assets.forEach(asset => {
      console.log(`  - ${asset.path} (${asset.data.length} bytes)`);
    });

    // Test 2: Vérifier le HTML généré
    console.log('\n📋 Test 2: Vérification du HTML');
    const cssLinkMatch = exportData.html.match(/<link.*?href="([^"]*styles\.css[^"]*)".*?>/);
    const faviconMatch = exportData.html.match(/<link.*?rel="icon".*?href="([^"]*)".*?>/);
    
    console.log('- CSS link trouvé:', cssLinkMatch ? cssLinkMatch[1] : '❌ NON TROUVÉ');
    console.log('- Favicon link trouvé:', faviconMatch ? faviconMatch[1] : '❌ NON TROUVÉ');

    // Test 3: Sauvegarder localement pour inspection
    console.log('\n💾 Test 3: Sauvegarde locale pour inspection');
    const testDir = path.join(__dirname, 'test-deploy-output');
    await fs.mkdir(testDir, { recursive: true });
    await fs.mkdir(path.join(testDir, 'assets/css'), { recursive: true });
    await fs.mkdir(path.join(testDir, 'assets/js'), { recursive: true });
    
    // Sauvegarder les fichiers
    await fs.writeFile(path.join(testDir, 'index.html'), exportData.html);
    await fs.writeFile(path.join(testDir, 'assets/css/styles.css'), exportData.css);
    await fs.writeFile(path.join(testDir, 'assets/js/main.js'), exportData.js);
    
    // Sauvegarder les assets
    for (const asset of exportData.assets) {
      const assetPath = path.join(testDir, asset.path);
      await fs.mkdir(path.dirname(assetPath), { recursive: true });
      await fs.writeFile(assetPath, asset.data);
    }
    
    console.log(`✅ Fichiers sauvegardés dans: ${testDir}`);
    console.log('   Vous pouvez ouvrir index.html dans un navigateur pour vérifier');

    // Test 4: Simuler le déploiement Netlify
    console.log('\n🚀 Test 4: Simulation du déploiement Netlify');
    
    // Créer la structure des fichiers comme Netlify le fait
    const files = {};
    files['index.html'] = exportData.html;
    
    if (exportData.css) {
      files['assets/css/styles.css'] = exportData.css;
    }
    if (exportData.js) {
      files['assets/js/main.js'] = exportData.js;
    }
    
    exportData.additionalFiles.forEach(file => {
      files[file.path] = file.content;
    });
    
    // Les assets doivent être convertis en base64 pour Netlify
    if (exportData.assets && exportData.assets.length > 0) {
      console.log(`\n📦 Conversion de ${exportData.assets.length} assets en base64...`);
      exportData.assets.forEach(asset => {
        const base64Content = asset.data.toString('base64');
        files[asset.path] = base64Content;
        console.log(`  - ${asset.path}: ${asset.data.length} bytes → ${base64Content.length} chars base64`);
      });
    }
    
    console.log('\n📊 Résumé des fichiers pour Netlify:');
    Object.keys(files).forEach(path => {
      const size = typeof files[path] === 'string' ? files[path].length : files[path].byteLength;
      console.log(`  - ${path}: ${size} bytes`);
    });

    console.log('\n✅ Test complété avec succès!');
    console.log('\n💡 Recommandations:');
    console.log('1. Vérifiez que les liens CSS/favicon sont corrects dans le HTML');
    console.log('2. Assurez-vous que les assets sont bien convertis en base64 pour Netlify');
    console.log('3. Testez le site localement dans test-deploy-output/');
    console.log('4. Vérifiez la console du navigateur pour les erreurs 404');

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    console.error(error.stack);
  }
}

// Exécuter le test
testDeploymentAssets().catch(console.error);
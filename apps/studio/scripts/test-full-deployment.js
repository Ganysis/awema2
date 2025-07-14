#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const fs = require('fs').promises;
const path = require('path');

// Dynamic imports for ES modules
async function runTest() {
  const { StaticExportService } = await import('../.next/server/app/api/export/static-export-simplified.js');
  const { NetlifyDeployService } = await import('../.next/server/app/api/export/netlify-deploy.service.js');
  
  console.log('🚀 Full Deployment Test\n');
  
  // Check for Netlify token
  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
  if (!NETLIFY_TOKEN) {
    console.error('❌ NETLIFY_TOKEN not found in environment variables');
    console.log('Please add NETLIFY_TOKEN to your .env.local file');
    return;
  }
  
  // Test project data
  const projectData = {
    id: 'test-' + Date.now(),
    projectName: 'Test CSS Assets Deploy',
    businessInfo: {
      name: 'Test Plomberie Pro',
      industry: 'plombier',
      email: 'test@plomberie.com',
      phone: '0123456789',
      address: '123 Rue Test',
      city: 'Paris',
      postalCode: '75001',
      description: 'Expert en plomberie depuis 2010'
    },
    pages: [{
      id: 'home',
      name: 'Accueil',
      slug: 'index',
      blocks: [
        {
          id: 'hero-1',
          type: 'hero-centered',
          props: {
            title: 'Plomberie Pro Paris',
            subtitle: 'Votre expert plombier à Paris - Intervention rapide 24/7',
            buttonText: 'Devis Gratuit',
            buttonLink: '#contact',
            backgroundImage: '/assets/hero-bg.jpg'
          }
        },
        {
          id: 'services-1',
          type: 'services-grid-cards',
          props: {
            title: 'Nos Services',
            subtitle: 'Une expertise complète en plomberie',
            services: [
              {
                title: 'Dépannage urgent',
                description: 'Intervention rapide 24/7',
                icon: '🔧'
              },
              {
                title: 'Installation',
                description: 'Pose de sanitaires et tuyauterie',
                icon: '🚿'
              },
              {
                title: 'Rénovation',
                description: 'Modernisation de vos installations',
                icon: '🏠'
              }
            ]
          }
        }
      ],
      meta: {
        title: 'Plomberie Pro Paris - Expert Plombier 24/7',
        description: 'Plombier professionnel à Paris. Dépannage urgent, installation, rénovation. Devis gratuit.'
      }
    }],
    siteSettings: {
      theme: {
        colors: {
          primary: '#2563eb',
          secondary: '#1e40af',
          accent: '#dc2626'
        }
      }
    }
  };
  
  try {
    // Step 1: Test static export
    console.log('📦 Step 1: Testing static export...');
    const exportOptions = {
      minifyHtml: false,
      minifyCss: false,
      minifyJs: false,
      forDeployment: true,
      includeCms: false
    };
    
    const exportData = await StaticExportService.exportSite(projectData, exportOptions);
    
    console.log('\n✅ Export successful:');
    console.log('- HTML:', exportData.html.length, 'chars');
    console.log('- CSS:', exportData.css.length, 'chars');
    console.log('- JS:', exportData.js.length, 'chars');
    console.log('- Additional files:', exportData.additionalFiles.length);
    console.log('- Assets:', exportData.assets.length);
    
    // Save locally for inspection
    const testDir = path.join(__dirname, 'test-deploy-output');
    await fs.mkdir(testDir, { recursive: true });
    await fs.mkdir(path.join(testDir, 'assets/css'), { recursive: true });
    
    await fs.writeFile(path.join(testDir, 'index.html'), exportData.html);
    await fs.writeFile(path.join(testDir, 'assets/css/styles.css'), exportData.css);
    
    console.log(`\n💾 Files saved to: ${testDir}`);
    console.log('You can open index.html to check if CSS loads correctly');
    
    // Step 2: Deploy to Netlify
    console.log('\n🚀 Step 2: Deploying to Netlify...');
    
    const deployService = new NetlifyDeployService(NETLIFY_TOKEN);
    const siteName = `awema-test-${Date.now()}`;
    
    const deployOptions = {
      projectId: projectData.id,
      siteName: siteName,
      netlifyToken: NETLIFY_TOKEN,
      includeCms: false
    };
    
    const result = await deployService.deployProject(
      projectData,
      deployOptions,
      (progress) => {
        console.log(`[${progress.stage}] ${progress.message} (${progress.progress}%)`);
      }
    );
    
    console.log('\n✅ Deployment successful!');
    console.log('🌐 Site URL:', result.siteUrl);
    console.log('📋 Deploy ID:', result.deployId);
    console.log('\n👉 Visit the site and check:');
    console.log('1. CSS is loading (styles should be applied)');
    console.log('2. Favicon is visible in browser tab');
    console.log('3. Images/placeholders are loading');
    console.log('4. Open DevTools Network tab to see if any 404 errors');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
  }
}

// Run the test
runTest().catch(console.error);
#!/usr/bin/env node

const path = require('path');
const fs = require('fs').promises;

// Mock minimal project data
const mockProject = {
  projectName: 'Test CSS',
  businessInfo: {
    name: 'Test Business',
    industry: 'plombier'
  },
  pages: [{
    id: 'home',
    name: 'Accueil',
    slug: 'index',
    blocks: [{
      id: 'hero-1',
      type: 'hero-centered',
      props: {
        title: 'Test Hero Title',
        subtitle: 'Test subtitle',
        buttonText: 'Click Me',
        buttonLink: '#'
      }
    }],
    meta: {
      title: 'Test Page',
      description: 'Testing CSS generation'
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

async function testCSSGeneration() {
  console.log('🔍 Testing CSS Generation\n');

  try {
    // First check if we can access block registry
    const blockRegistryPath = path.join(__dirname, '../lib/blocks/block-registry.ts');
    console.log('Checking block registry at:', blockRegistryPath);
    
    const blockRegistryExists = await fs.access(blockRegistryPath).then(() => true).catch(() => false);
    console.log('Block registry exists:', blockRegistryExists);
    
    // Check if we can find the render functions
    if (blockRegistryExists) {
      const content = await fs.readFile(blockRegistryPath, 'utf8');
      const hasRenderFunctions = content.includes('renderFunctions');
      const hasHeroRender = content.includes('renderHeroCentered');
      console.log('Has renderFunctions map:', hasRenderFunctions);
      console.log('Has hero render import:', hasHeroRender);
      
      // Check imports
      const importsMatch = content.match(/from\s+['"]@awema\/templates['"]/g);
      console.log('Found @awema/templates imports:', importsMatch ? importsMatch.length : 0);
    }
    
    // Test the export through API
    console.log('\n📦 Testing export through API...');
    
    const exportResponse = await fetch('http://localhost:3001/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: 'test-project',
        minifyHtml: false,
        minifyCss: false,
        minifyJs: false,
        generateManifest: true,
        generateServiceWorker: true,
        includeCms: false
      })
    }).catch(err => {
      console.log('Could not connect to API:', err.message);
      return null;
    });
    
    if (exportResponse) {
      console.log('API Response status:', exportResponse.status);
      console.log('API Response headers:', Object.fromEntries(exportResponse.headers));
    }
    
    // Check the actual static export service
    console.log('\n📝 Checking static export service...');
    const exportServicePath = path.join(__dirname, '../lib/services/static-export-simplified.ts');
    const exportServiceExists = await fs.access(exportServicePath).then(() => true).catch(() => false);
    console.log('Export service exists:', exportServiceExists);
    
    if (exportServiceExists) {
      const content = await fs.readFile(exportServicePath, 'utf8');
      
      // Check key functions
      const hasGenerateThemeCSS = content.includes('generateThemeCSS');
      const hasCollectBlockResources = content.includes('collectBlockResources');
      const hasRenderFunction = content.includes('getBlockRenderFunction');
      
      console.log('Has generateThemeCSS:', hasGenerateThemeCSS);
      console.log('Has collectBlockResources:', hasCollectBlockResources);
      console.log('Has getBlockRenderFunction:', hasRenderFunction);
      
      // Check CSS collection logic
      const cssCollectionMatch = content.match(/if\s*\(rendered\.css\)/);
      console.log('Has CSS collection logic:', !!cssCollectionMatch);
    }
    
    console.log('\n💡 Diagnosis:');
    console.log('1. The blocks are imported from @awema/templates package');
    console.log('2. The render functions should return {html, css, js} objects');
    console.log('3. CSS is collected in collectBlockResources function');
    console.log('4. Theme CSS is generated separately');
    console.log('5. All CSS is combined: fonts + theme + blocks');
    
    console.log('\n🔧 Potential issues:');
    console.log('- Render functions from @awema/templates might not return CSS');
    console.log('- The CSS might be empty if blocks don\'t generate styles');
    console.log('- The forDeployment flag correctly switches to external CSS file');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testCSSGeneration();
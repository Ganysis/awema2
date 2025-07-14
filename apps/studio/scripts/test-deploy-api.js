#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function testDeployAPI() {
  console.log('🚀 Testing Deployment via API\n');
  
  // Check for env file
  const envPath = path.join(__dirname, '../.env.local');
  const envExists = await fs.access(envPath).then(() => true).catch(() => false);
  
  if (!envExists) {
    console.log('📝 Creating .env.local.example file...');
    const exampleContent = `# Netlify API Token
NETLIFY_TOKEN=your_netlify_token_here

# Supabase (optional for CMS)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
`;
    await fs.writeFile(path.join(__dirname, '../.env.local.example'), exampleContent);
    console.log('✅ Created .env.local.example');
    console.log('❌ Please create .env.local with your Netlify token');
    return;
  }
  
  // Read env file
  const envContent = await fs.readFile(envPath, 'utf8');
  const tokenMatch = envContent.match(/NETLIFY_TOKEN=(.+)/);
  
  if (!tokenMatch || !tokenMatch[1] || tokenMatch[1] === 'your_netlify_token_here') {
    console.log('❌ NETLIFY_TOKEN not configured in .env.local');
    console.log('Please add your Netlify API token');
    return;
  }
  
  const NETLIFY_TOKEN = tokenMatch[1].trim();
  console.log('✅ Found Netlify token');
  
  // Test deployment
  const testData = {
    projectId: 'test-' + Date.now(),
    siteName: `awema-css-test-${Date.now()}`,
    netlifyToken: NETLIFY_TOKEN,
    includeCms: false,
    projectData: {
      projectName: 'Test CSS Deploy',
      businessInfo: {
        name: 'Test Business',
        industry: 'plombier',
        email: 'test@example.com',
        phone: '0123456789',
        city: 'Paris'
      },
      pages: [{
        id: 'home',
        name: 'Accueil',
        slug: 'index',
        blocks: [{
          id: 'hero-1',
          type: 'hero-centered',
          props: {
            title: 'Test CSS Loading',
            subtitle: 'If you see styled text, CSS is working!',
            buttonText: 'Success',
            buttonLink: '#'
          }
        }],
        meta: {
          title: 'CSS Test',
          description: 'Testing CSS deployment'
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
    }
  };
  
  console.log('\n📡 Calling deploy API...');
  console.log('Site name:', testData.siteName);
  
  try {
    const response = await fetch('http://localhost:3001/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }
    
    const result = await response.json();
    
    console.log('\n✅ Deployment successful!');
    console.log('🌐 Site URL:', result.siteUrl);
    console.log('📋 Deploy ID:', result.deployId);
    console.log('\n🔍 Please check:');
    console.log('1. Visit the URL and check if CSS styles are applied');
    console.log('2. Look for the favicon in the browser tab');
    console.log('3. Open DevTools > Network tab and refresh');
    console.log('4. Check for any 404 errors on CSS or assets');
    console.log('\n💡 Expected results:');
    console.log('- Blue styled header text');
    console.log('- Styled button');
    console.log('- Proper fonts (Inter)');
    console.log('- No 404 errors');
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the dev server is running: npm run dev');
    console.log('2. Check if the server is on http://localhost:3001');
    console.log('3. Verify your Netlify token is valid');
  }
}

testDeployAPI();
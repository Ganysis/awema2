#!/usr/bin/env node

/**
 * Test the block rendering functionality
 */

const path = require('path');

// Mock Next.js environment
process.env.NODE_ENV = 'production';

// Import the export service
const exportServicePath = path.join(__dirname, '..', '.next', 'server', 'app', 'lib', 'services', 'static-export-simplified.js');
const { StaticExportSimplified } = require(exportServicePath);

// Test data
const testData = {
  pages: [{
    id: 'home',
    slug: '/',
    title: 'Test Home',
    meta: {
      title: 'Test Site',
      description: 'Testing block rendering'
    },
    blocks: [
      {
        id: 'contact-1',
        type: 'contact-form-map',
        props: {
          title: 'Contact Us',
          subtitle: 'Get in touch with our team',
          showMap: true,
          mapCoordinates: JSON.stringify({ lat: 48.8566, lng: 2.3522 }),
          contactInfo: JSON.stringify({
            phone: '01 23 45 67 89',
            email: 'contact@test.fr',
            address: '123 rue de Test, Paris',
            hours: 'Mon-Fri 9am-6pm'
          }),
          formFields: JSON.stringify([
            { name: 'name', label: 'Your Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ]),
          submitText: 'Send Message'
        }
      }
    ]
  }],
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981'
  },
  businessInfo: {
    name: 'Test Business',
    phone: '01 23 45 67 89',
    email: 'test@business.fr'
  }
};

async function testBlockRendering() {
  try {
    console.log('🧪 Testing block rendering...\n');
    
    const exportService = new StaticExportSimplified();
    const result = await exportService.exportProject(testData, {
      siteName: 'test-block-render',
      projectName: 'Test Block Render',
      generateZip: false
    });
    
    // Check if contact block was rendered properly
    const html = result.html;
    
    console.log('📊 Results:');
    console.log('- HTML length:', html.length, 'characters');
    console.log('- Contains contact title:', html.includes('Contact Us') ? '✅' : '❌');
    console.log('- Contains map container:', html.includes('contact-map') ? '✅' : '❌');
    console.log('- Contains form fields:', html.includes('form-group') ? '✅' : '❌');
    console.log('- Contains phone number:', html.includes('01 23 45 67 89') ? '✅' : '❌');
    console.log('- Contains Google Maps script:', html.includes('maps.googleapis.com') ? '✅' : '❌');
    
    // Save output for inspection
    require('fs').writeFileSync('test-block-render-output.html', html);
    console.log('\n✅ Output saved to test-block-render-output.html');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
}

testBlockRendering();
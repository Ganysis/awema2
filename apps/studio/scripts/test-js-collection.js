#!/usr/bin/env node

/**
 * Test JS collection from blocks
 */

// Mock the environment
process.env.NODE_ENV = 'production';

// Import the render function from the templates
const { renderContactFormMap } = require('../node_modules/@awema/templates/src/blocks/contact/form-map.js');

// Test data
const contactProps = {
  title: 'Contact Us',
  subtitle: 'Get in touch',
  showMap: true,
  mapCoordinates: { lat: 48.8566, lng: 2.3522 },
  contactInfo: {
    phone: '01 23 45 67 89',
    email: 'test@test.fr',
    address: '123 rue Test',
    hours: 'Mon-Fri 9am-6pm'
  },
  formFields: [
    { name: 'name', label: 'Name', type: 'text', required: true }
  ],
  submitText: 'Send'
};

console.log('🧪 Testing contact block JS collection...\n');

try {
  const rendered = renderContactFormMap(contactProps, []);
  
  console.log('📊 Render results:');
  console.log('- Has HTML:', !!rendered.html);
  console.log('- Has CSS:', !!rendered.css);
  console.log('- Has JS:', !!rendered.js);
  
  if (rendered.js) {
    console.log('\n📜 JavaScript content preview:');
    console.log('- Length:', rendered.js.length, 'characters');
    console.log('- Contains Google Maps:', rendered.js.includes('maps.googleapis.com') ? '✅' : '❌');
    console.log('- Contains initContactMap:', rendered.js.includes('initContactMap') ? '✅' : '❌');
    console.log('- Contains map coordinates:', rendered.js.includes('48.8566') ? '✅' : '❌');
    
    // Save JS for inspection
    require('fs').writeFileSync('test-contact-js.js', rendered.js);
    console.log('\n✅ JS saved to test-contact-js.js');
  } else {
    console.log('\n❌ No JS returned from render!');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
}
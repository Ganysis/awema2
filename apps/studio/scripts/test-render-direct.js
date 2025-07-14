#!/usr/bin/env node

/**
 * Direct test of block rendering
 */

// Test parsing JSON props
const testProps = {
  title: 'Contact Us',
  subtitle: 'Get in touch',
  showMap: true,
  mapCoordinates: '{"lat": 48.8566, "lng": 2.3522}',
  contactInfo: '{"phone": "01 23 45 67 89", "email": "test@test.fr", "address": "123 rue Test"}',
  formFields: '[{"name": "name", "label": "Name", "type": "text", "required": true}]',
  submitText: 'Send'
};

console.log('🧪 Testing prop parsing...\n');
console.log('Original props:');
console.log(testProps);

// Simulate the parsing logic
let processedProps = { ...testProps };

Object.keys(processedProps).forEach(key => {
  const value = processedProps[key];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') {
        processedProps[key] = parsed;
        console.log(`✅ Parsed ${key}:`, parsed);
      }
    } catch (e) {
      console.log(`ℹ️ Kept ${key} as string:`, value);
    }
  }
});

console.log('\n📊 Processed props:');
console.log(JSON.stringify(processedProps, null, 2));

// Test accessing nested properties
console.log('\n🔍 Testing access:');
console.log('- contactInfo.phone:', processedProps.contactInfo?.phone || 'NOT FOUND');
console.log('- mapCoordinates.lat:', processedProps.mapCoordinates?.lat || 'NOT FOUND');
console.log('- formFields[0].name:', processedProps.formFields?.[0]?.name || 'NOT FOUND');
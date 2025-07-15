// Script pour tester directement le renderer V3 Hero
import { HeroRendererV3PerfectEnhanced } from '../lib/v3/renderers/hero-perfect-enhanced.renderer.js';

console.log('Testing V3 Hero Renderer...');

const renderer = new HeroRendererV3PerfectEnhanced();

const testData = {
  variant: 'modern',
  layout: 'center',
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  primaryButton: {
    text: 'Action',
    link: '#'
  }
};

const context = {
  isExport: false,
  device: 'desktop'
};

console.log('Calling render with:', testData);
const result = renderer.render(testData, context);

console.log('Result type:', typeof result);
console.log('Result keys:', result ? Object.keys(result) : 'null');
console.log('Has CSS:', !!result?.css);
console.log('CSS length:', result?.css?.length || 0);
console.log('First 500 chars of CSS:', result?.css?.substring(0, 500) || 'No CSS');
console.log('Has HTML:', !!result?.html);
console.log('HTML length:', result?.html?.length || 0);
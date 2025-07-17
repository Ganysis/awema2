// Test du nouveau Content Renderer Clean
const { ContentRendererV3Clean } = require('./dist-test/lib/v3/renderers/content-v3-clean.renderer.js');

const renderer = new ContentRendererV3Clean();

// Tester getBlockProps
console.log('\n=== Test getBlockProps ===');
const props = renderer.getBlockProps();
console.log(`Nombre de propriétés: ${props.length}`);
props.forEach((prop, index) => {
  console.log(`${index + 1}. ${prop.name} (${prop.type}) - ${prop.label}`);
});

// Vérifier qu'il n'y a pas de champs parasites
console.log('\n=== Vérification des champs ===');
const imageFields = props.filter(p => 
  p.name.toLowerCase().includes('image') || 
  p.name.toLowerCase().includes('alt') ||
  p.type === 'IMAGE'
);
console.log(`Champs image trouvés: ${imageFields.length}`);
imageFields.forEach(field => {
  console.log(`- ${field.name}: ${field.label}`);
});

// Tester le rendu
console.log('\n=== Test de rendu ===');
const testData = {
  visualVariant: 'modern',
  contentType: 'text-image',
  contentTitle: 'Test du nouveau Content',
  contentSubtitle: 'Sans champs parasites',
  imagePosition: 'right',
  imageUrl: '/test.jpg',
  richContent: '<h2>Titre</h2><p>Contenu de test</p>'
};

const result = renderer.render(testData);
console.log('HTML généré:', result.html.substring(0, 200) + '...');
console.log('CSS présent:', result.css.length > 0 ? '✓' : '✗');
console.log('JS présent:', result.js.length > 0 ? '✓' : '✗');
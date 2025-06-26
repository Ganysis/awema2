// Test simple de l'API d'export
async function testExport() {
  try {
    console.log('Testing export API...');
    
    // Simuler une requête d'export
    const response = await fetch('http://localhost:3000/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: 'test-project-id' // On utilise un ID de test
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      
      if (contentType === 'application/zip') {
        console.log('✅ Export API returns a ZIP file!');
        const buffer = await response.arrayBuffer();
        console.log('ZIP size:', buffer.byteLength, 'bytes');
      } else {
        console.log('❌ Unexpected content type:', contentType);
      }
    } else {
      const error = await response.text();
      console.log('❌ Export failed:', error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Pour tester directement dans Node.js
if (typeof window === 'undefined') {
  testExport();
}
async function testSimpleAPI() {
  try {
    console.log('🧪 Test simple de l\'API...');

    // Test GET sur les clients
    const getResponse = await fetch('http://localhost:3000/api/v2/clients');
    console.log('GET /api/v2/clients - Status:', getResponse.status);
    console.log('Content-Type:', getResponse.headers.get('content-type'));

    if (getResponse.status === 200) {
      const data = await getResponse.json();
      console.log('✅ Données reçues:', data);
    } else {
      const text = await getResponse.text();
      console.log('❌ Erreur:', text.substring(0, 300));
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

testSimpleAPI();
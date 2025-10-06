async function verifyMockups() {
  const mockupUrls = [
    'https://electricite-moderne-paris-mockup-1-1758200426455.netlify.app',
    'https://electricite-moderne-paris-mockup-2-1758200433518.netlify.app',
    'https://electricite-moderne-paris-mockup-3-1758200440514.netlify.app'
  ];

  console.log('🔍 VÉRIFICATION DES MOCKUPS DÉPLOYÉS\n');

  for (let i = 0; i < mockupUrls.length; i++) {
    const url = mockupUrls[i];
    console.log(`${i + 1}. Test du mockup: ${url}`);

    try {
      const response = await fetch(url);
      console.log(`   Status: ${response.status}`);
      console.log(`   Content-Type: ${response.headers.get('content-type')}`);

      if (response.ok) {
        const html = await response.text();

        // Vérifier que c'est bien du HTML valide
        const hasHtml = html.includes('<html');
        const hasTitle = html.includes('Electricité Moderne Paris');
        const hasPhone = html.includes('01 45 67 89 12');

        console.log(`   ✅ HTML valide: ${hasHtml}`);
        console.log(`   ✅ Nom client: ${hasTitle}`);
        console.log(`   ✅ Téléphone: ${hasPhone}`);
        console.log(`   📏 Taille: ${html.length} caractères`);
      } else {
        console.log(`   ❌ Erreur HTTP: ${response.statusText}`);
      }
    } catch (error) {
      console.log(`   ❌ Erreur réseau: ${error.message}`);
    }

    console.log('');
  }
}

verifyMockups();
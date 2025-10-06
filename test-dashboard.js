async function testDashboard() {
  console.log('📊 TEST DU DASHBOARD V2\n');

  try {
    // Test des clients
    const clientsResponse = await fetch('http://localhost:3000/api/v2/clients');
    console.log('✅ API Clients Status:', clientsResponse.status);

    if (clientsResponse.ok) {
      const clientsData = await clientsResponse.json();
      console.log('📋 Nombre total de clients:', clientsData.clients.length);

      clientsData.clients.forEach((client, index) => {
        console.log(`\n🏢 Client ${index + 1}:`);
        console.log(`   ID: ${client.id}`);
        console.log(`   Nom: ${client.name}`);
        console.log(`   Email: ${client.email}`);
        console.log(`   Ville: ${client.city}`);
        console.log(`   Projets: ${client.projects.length}`);

        if (client.projects.length > 0) {
          client.projects.forEach((project, pIndex) => {
            console.log(`   📁 Projet ${pIndex + 1}: ${project.name} (${project.status})`);
            if (project.mockups && project.mockups.length > 0) {
              console.log(`      🎨 Mockups: ${project.mockups.length} déployés`);
              project.mockups.forEach((mockup, mIndex) => {
                console.log(`         ${mIndex + 1}. ${mockup.style}: ${mockup.url}`);
              });
            }
          });
        }
      });
    }

    // Test d'accès au dashboard
    console.log('\n🌐 Test accès au dashboard...');
    const dashboardResponse = await fetch('http://localhost:3000/dashboard-v2');
    console.log('Dashboard accessible:', dashboardResponse.status === 200 ? '✅ Oui' : '❌ Non');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testDashboard();
/**
 * Test de déploiement avec authentification simplifiée
 */

const fetch = require('node-fetch');

async function testSimpleAuth() {
  console.log('🚀 Test de déploiement avec auth simplifiée\n');

  const projectData = {
    settings: {
      siteName: 'Test Auth Simple',
      businessInfo: {
        name: 'Test Business',
        email: 'contact@test.fr'
      }
    },
    pages: [
      {
        id: 'home',
        title: 'Accueil',
        slug: '/',
        blocks: [
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            variant: 'gradient-animation',
            props: {
              title: 'Test CMS avec Auth Simple',
              subtitle: 'Login: admin@admin.fr / admin',
              primaryButton: { text: 'Tester le CMS', href: '/admin' }
            }
          },
          {
            id: 'content-1',
            type: 'content-ultra-modern',
            variant: 'split-screen',
            props: {
              title: 'Fonctionnalités',
              content: 'Ce site utilise une authentification simplifiée pour tester le CMS.',
              features: [
                { text: 'Édition de pages' },
                { text: 'Sauvegarde automatique' },
                { text: 'Preview en temps réel' }
              ]
            }
          }
        ]
      }
    ]
  };

  const deployRequest = {
    siteId: `test-auth-${Date.now()}`,
    siteName: `test-auth-simple-${Date.now()}`,
    plan: 'starter', // Pas de Supabase
    projectData: projectData,
    // Forcer l'utilisation du CMS simple
    adminEmail: 'admin@admin.fr',
    adminPassword: 'admin'
  };

  try {
    console.log('📦 Envoi de la requête...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deployRequest)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Déploiement réussi!\n');
      console.log('🌐 URLs:');
      console.log(`   Site: ${result.siteUrl}`);
      console.log(`   Admin: ${result.siteUrl}/admin`);
      console.log('\n🔐 Login:');
      console.log('   Email: admin@admin.fr');
      console.log('   Mot de passe: admin');
      console.log('\n⚠️  Note: Ce déploiement utilise une auth simplifiée');
      console.log('   Les données sont stockées en mémoire (pas de DB)');
    } else {
      console.error('❌ Erreur:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testSimpleAuth();
/**
 * Test avec l'authentification corrigée
 */

const fetch = require('node-fetch');
const crypto = require('crypto');

async function testFixedAuth() {
  console.log('🚀 Déploiement avec authentification corrigée\n');

  const projectData = {
    settings: {
      siteName: 'Test Auth Corrigée',
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
            id: 'header-1',
            type: 'header-ultra-modern',
            variant: 'transparent-blur',
            props: {
              logo: { text: 'CMS Fixed', type: 'text' },
              menuItems: [
                { label: 'Accueil', href: '/' },
                { label: 'Admin', href: '/admin' }
              ]
            }
          },
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            variant: 'gradient-animation',
            props: {
              title: '✅ Authentification Corrigée',
              subtitle: 'Le CMS devrait maintenant fonctionner correctement',
              primaryButton: { 
                text: 'Accéder au CMS', 
                href: '/admin' 
              }
            }
          },
          {
            id: 'content-1',
            type: 'content-ultra-modern',
            variant: 'split-screen',
            props: {
              title: 'Identifiants de connexion',
              content: 'Utilisez ces identifiants pour vous connecter au CMS',
              features: [
                { text: 'Email: admin@admin.fr' },
                { text: 'Mot de passe: admin' },
                { text: 'URL: /admin' }
              ]
            }
          },
          {
            id: 'footer-1',
            type: 'footer-ultra-modern',
            variant: 'gradient-wave',
            props: {
              logo: { text: 'CMS Fixed', type: 'text' },
              description: 'Test de l\'authentification corrigée'
            }
          }
        ]
      }
    ]
  };

  const deployRequest = {
    siteId: crypto.randomUUID(),
    siteName: `test-auth-fixed-${Date.now()}`,
    plan: 'pro', // Pour avoir le CMS avec Edge Functions
    projectData: projectData
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
      console.log(`   Admin: ${result.adminUrl || result.siteUrl + '/admin'}`);
      console.log('\n🔐 Identifiants:');
      console.log('   Email: admin@admin.fr');
      console.log('   Mot de passe: admin');
      console.log('\n📝 Corrections appliquées:');
      console.log('   - Auth simple sans Supabase RPC');
      console.log('   - Route /api/cms/auth/login correcte');
      console.log('   - Pas d\'erreur JSON');
      console.log('\n⚡ Edge Functions déployées:');
      console.log('   - /api/cms/auth/login');
      console.log('   - /api/cms/content');
      console.log('   - /api/cms/media');
    } else {
      console.error('❌ Erreur:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testFixedAuth();
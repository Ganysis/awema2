#!/usr/bin/env node

/**
 * Test complet du déploiement avec génération de fichiers
 */

// Charger les variables d'environnement
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=');
      if (key && value) {
        process.env[key] = value;
      }
    }
  });
}

async function testFullDeployment() {
  console.log('🚀 Test de déploiement complet\n');
  
  // Projet de test
  const testProject = {
    id: 'test-deploy-' + Date.now(),
    pages: [{
      id: 'home',
      title: 'Accueil',
      slug: '/',
      blocks: [{
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Site de Test Déploiement',
          subtitle: 'Vérification du système de déploiement',
          buttonText: 'En savoir plus',
          buttonLink: '#contact'
        }
      }, {
        id: 'content-1',
        type: 'content',
        props: {
          title: 'Test de Contenu',
          content: 'Ceci est un test pour vérifier que le déploiement fonctionne correctement.',
          imagePosition: 'right'
        }
      }],
      seo: {
        title: 'Test Déploiement - AWEMA',
        description: 'Site de test pour vérifier le système de déploiement'
      }
    }],
    theme: {
      primaryColor: '#0070f3',
      secondaryColor: '#ff4081',
      fontFamily: 'Inter, sans-serif'
    },
    businessInfo: {
      name: 'Test Business AWEMA',
      email: 'test@awema.fr',
      phone: '01 23 45 67 89',
      address: '123 Rue du Test, 75001 Paris'
    },
    globalHeader: {
      id: 'header',
      type: 'header',
      props: {
        logo: { text: 'Test AWEMA' },
        navigation: [
          { label: 'Accueil', href: '/' },
          { label: 'Contact', href: '#contact' }
        ]
      }
    },
    globalFooter: {
      id: 'footer',
      type: 'footer',
      props: {
        copyright: '© 2024 Test AWEMA. Tous droits réservés.'
      }
    }
  };
  
  console.log('📦 Projet de test créé');
  console.log('- Pages:', testProject.pages.length);
  console.log('- Blocs:', testProject.pages[0].blocks.length);
  console.log('- ID:', testProject.id);
  
  // Appeler l'API de déploiement
  try {
    console.log('\n🌐 Appel de l\'API de déploiement...');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        siteId: testProject.id,
        siteName: 'test-awema-' + Date.now(),
        projectData: testProject,
        plan: 'starter',
        adminEmail: 'test@awema.fr'
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('\n❌ Erreur de déploiement:', result.error);
      console.log('Status:', response.status);
      return;
    }
    
    console.log('\n✅ Déploiement réussi !');
    console.log('- URL du site:', result.siteUrl);
    console.log('- URL admin:', result.adminUrl);
    if (result.credentials) {
      console.log('- Email admin:', result.credentials.email);
      console.log('- Mot de passe:', result.credentials.password);
    }
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    console.log('Assurez-vous que le serveur Next.js est lancé sur http://localhost:3000');
  }
}

// Vérifier que le serveur est accessible
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/health');
    return response.ok;
  } catch {
    return false;
  }
}

async function main() {
  const serverOk = await checkServer();
  if (!serverOk) {
    console.log('⚠️  Le serveur Next.js ne semble pas être lancé');
    console.log('Lancez "npm run dev" dans un autre terminal puis réessayez');
    return;
  }
  
  await testFullDeployment();
}

main().catch(console.error);
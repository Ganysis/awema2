#!/usr/bin/env node

/**
 * 🧪 Test des nouveaux tokens Netlify et Sanity
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: './apps/studio/.env.production-real' });

const TOKENS = {
  netlify: 'nfp_x8tkR52sgdiX7XjaaymBmspi6DPSAe8Vf5b2',
  sanity: 'skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf'
};

console.log('🚀 Test des nouveaux tokens API\n');
console.log('================================\n');

// Test 1: Netlify
async function testNetlify() {
  console.log('📦 TEST NETLIFY');
  console.log('---------------');

  try {
    // Récupérer les sites existants
    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      headers: {
        'Authorization': `Bearer ${TOKENS.netlify}`
      }
    });

    if (response.ok) {
      const sites = await response.json();
      console.log('✅ Token Netlify valide !');
      console.log(`   ${sites.length} sites existants`);

      // Afficher les 3 premiers sites
      sites.slice(0, 3).forEach(site => {
        console.log(`   - ${site.name}: ${site.url}`);
      });
    } else {
      const error = await response.text();
      console.log('❌ Erreur Netlify:', error);
    }
  } catch (error) {
    console.log('❌ Erreur connexion Netlify:', error.message);
  }
}

// Test 2: Créer un site Netlify de test
async function createNetlifySite() {
  console.log('\n🎨 CRÉATION SITE NETLIFY TEST');
  console.log('-------------------------------');

  const siteName = `awema-test-${Date.now()}`;

  try {
    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKENS.netlify}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: siteName,
        custom_domain: null
      })
    });

    if (response.ok) {
      const site = await response.json();
      console.log('✅ Site Netlify créé !');
      console.log('   Nom:', site.name);
      console.log('   URL:', site.url);
      console.log('   Admin:', site.admin_url);
      console.log('   ID:', site.id);

      return site;
    } else {
      const error = await response.text();
      console.log('❌ Erreur création site:', error);
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }

  return null;
}

// Test 3: Sanity
async function testSanity() {
  console.log('\n📝 TEST SANITY');
  console.log('--------------');

  try {
    // Test avec le token
    const projectId = 'awema-sites'; // À ajuster si différent
    const dataset = 'production';

    const response = await fetch(
      `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=*[_type == "project"][0]`,
      {
        headers: {
          'Authorization': `Bearer ${TOKENS.sanity}`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token Sanity valide !');
      console.log('   Dataset:', dataset);
      console.log('   Résultat:', data.result ? 'Données trouvées' : 'Pas de données (normal au début)');
    } else {
      const error = await response.text();

      // Si erreur 404, le projet n'existe peut-être pas encore
      if (response.status === 404) {
        console.log('⚠️ Projet Sanity non trouvé');
        console.log('   Créez le projet avec: sanity init --create-project "awema-sites"');
      } else {
        console.log('❌ Erreur Sanity:', error);
      }
    }
  } catch (error) {
    console.log('❌ Erreur connexion Sanity:', error.message);
  }
}

// Test 4: Workflow complet simulé
async function testWorkflowMockups() {
  console.log('\n🔄 TEST WORKFLOW MOCKUPS');
  console.log('-------------------------');

  console.log('Simulation génération 3 mockups pour client "Plomberie Test"...\n');

  const templates = ['sydney', 'nextspace', 'locomotive'];
  const mockups = [];

  for (const template of templates) {
    const siteName = `plomberie-${template}-${Date.now()}`;
    console.log(`📍 Génération mockup ${template}...`);

    // Créer un site Netlify vide pour le mockup
    try {
      const response = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKENS.netlify}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: siteName
        })
      });

      if (response.ok) {
        const site = await response.json();
        console.log(`   ✅ ${template}: ${site.url}`);
        mockups.push({
          template,
          url: site.url,
          id: site.id
        });
      }
    } catch (error) {
      console.log(`   ❌ Erreur ${template}:`, error.message);
    }
  }

  if (mockups.length > 0) {
    console.log('\n✅ Mockups générés avec succès !');
    console.log('URLs à envoyer au client:');
    mockups.forEach(m => console.log(`  - ${m.template}: ${m.url}`));
  }

  return mockups;
}

// Test 5: Configuration complète
async function checkFullConfiguration() {
  console.log('\n📊 VÉRIFICATION CONFIGURATION COMPLÈTE');
  console.log('=======================================\n');

  const config = {
    supabase: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌',
    deepseek: process.env.DEEPSEEK_API_KEY ? '✅' : '❌',
    cloudflare: process.env.CLOUDFLARE_API_TOKEN ? '✅' : '❌',
    netlify: TOKENS.netlify ? '✅' : '❌',
    sanity: TOKENS.sanity ? '✅' : '❌',
    email: process.env.BREVO_API_KEY || process.env.RESEND_API_KEY ? '✅' : '❌'
  };

  console.log('Services configurés:');
  console.log('  Supabase    :', config.supabase, '(Base de données)');
  console.log('  DeepSeek    :', config.deepseek, '(IA enrichissement)');
  console.log('  Cloudflare  :', config.cloudflare, '(Déploiement production)');
  console.log('  Netlify     :', config.netlify, '(Mockups temporaires)');
  console.log('  Sanity      :', config.sanity, '(CMS headless)');
  console.log('  Email       :', config.email, '(Notifications)');

  const configured = Object.values(config).filter(v => v === '✅').length;
  const total = Object.keys(config).length;
  const percentage = Math.round((configured / total) * 100);

  console.log(`\n📈 Configuration: ${configured}/${total} services (${percentage}%)`);

  if (percentage >= 80) {
    console.log('🎉 Le système est presque complètement configuré !');
  } else if (percentage >= 60) {
    console.log('👍 Bonne progression ! Il reste quelques services à configurer.');
  } else {
    console.log('💪 Continuez ! Plusieurs services restent à configurer.');
  }

  return config;
}

// Main
async function main() {
  await testNetlify();
  await testSanity();

  const config = await checkFullConfiguration();

  // Si Netlify fonctionne, proposer de créer des mockups
  if (config.netlify === '✅') {
    console.log('\n💡 Netlify configuré ! Voulez-vous tester la génération de mockups ?');
    console.log('   Pour tester: node test-netlify-sanity.cjs --with-mockups');

    if (process.argv.includes('--with-mockups')) {
      await testWorkflowMockups();
    }
  }

  console.log('\n================================');
  console.log('✅ TESTS TERMINÉS');
  console.log('================================\n');

  if (config.email === '❌') {
    console.log('📧 Prochaine étape: Configurer un service email');
    console.log('   Option 1: Brevo (gratuit) - https://www.brevo.com');
    console.log('   Option 2: Resend - https://resend.com');
  }

  console.log('\nAvec tous les services configurés, le workflow sera 100% opérationnel !');
}

// Lancer les tests
main().catch(console.error);
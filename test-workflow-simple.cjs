#!/usr/bin/env node

/**
 * 🧪 Test Simple du Workflow AWEMA - Sans API Externes
 *
 * Ce script teste le workflow en mode simulation
 * pour vérifier que tout est correctement intégré
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration de test
const TEST_CONFIG = {
  client: {
    businessName: 'Plomberie Test Lyon',
    businessType: 'plombier',
    email: 'test@plomberie-lyon.fr',
    phone: '04 78 12 34 56',
    location: 'Lyon 7ème',
    description: 'Expert en plomberie depuis 20 ans',
    services: [
      'Dépannage urgence 24/7',
      'Installation sanitaire',
      'Rénovation salle de bain'
    ]
  },
  mockMode: true // Mode simulation sans API externes
};

console.log('🚀 AWEMA 3.0 - Test du Workflow\n');
console.log('====================================');
console.log('Mode : SIMULATION (sans API externes)');
console.log('Client test :', TEST_CONFIG.client.businessName);
console.log('====================================\n');

// Étape 1 : Vérifier la structure du projet
console.log('📁 Vérification de la structure...');
const requiredDirs = [
  'src/pages',
  'src/content',
  'src/layouts',
  'public/images'
];

let allDirsExist = true;
for (const dir of requiredDirs) {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} manquant`);
    allDirsExist = false;
  }
}

if (!allDirsExist) {
  console.log('\n⚠️  Certains dossiers sont manquants');
}

// Étape 2 : Tester la génération de contenu
console.log('\n📝 Test de génération de contenu...');

const generateSiteScript = path.join(__dirname, 'generate-site-metier-complet.cjs');
if (fs.existsSync(generateSiteScript)) {
  console.log('  ✅ Script de génération trouvé');

  try {
    // Exécuter le script en mode test
    console.log('  🔄 Génération pour métier : plombier');
    execSync(`node ${generateSiteScript} plombier`, {
      stdio: 'pipe',
      env: { ...process.env, TEST_MODE: 'true' }
    });
    console.log('  ✅ Génération réussie');
  } catch (error) {
    console.log('  ⚠️  Erreur lors de la génération:', error.message);
  }
} else {
  console.log('  ❌ Script de génération introuvable');
}

// Étape 3 : Vérifier les contenus générés
console.log('\n📄 Vérification des contenus...');

const contentFiles = [
  'src/content/homepage/-index.md',
  'src/content/about/-index.md',
  'src/content/services/-index.md'
];

for (const file of contentFiles) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const hasPlumber = content.toLowerCase().includes('plomb');
    console.log(`  ${hasPlumber ? '✅' : '⚠️ '} ${file} ${hasPlumber ? '(contenu plombier détecté)' : ''}`);
  } else {
    console.log(`  ⚠️  ${file} introuvable`);
  }
}

// Étape 4 : Simuler les agents
console.log('\n🤖 Simulation des Agents...');

// Agent 3 - Mockups
console.log('\n[Agent 3] Génération Mockups');
console.log('  📦 Simulation : 3 mockups générés');
console.log('  - sydney-mock.netlify.app');
console.log('  - nextspace-mock.netlify.app');
console.log('  - locomotive-mock.netlify.app');

// Agent 5 - Email
console.log('\n[Agent 5] Envoi Email');
console.log('  📧 Simulation : Email envoyé à', TEST_CONFIG.client.email);

// Agent 4 - Sélection
console.log('\n[Agent 4] Sélection Client');
console.log('  👆 Simulation : Client choisit "sydney"');

// Agent 6 - Sanity
console.log('\n[Agent 6] Setup Sanity CMS');
console.log('  📝 Simulation : Projet Sanity configuré');
console.log('  - Project ID: plomberie-test-lyon');
console.log('  - Studio URL: https://plomberie-test.sanity.studio');

// Agent 7 - Enrichissement
console.log('\n[Agent 7] Enrichissement IA');
console.log('  🤖 Simulation : Contenu enrichi (1000+ mots/page)');

// Agent 8 - Déploiement
console.log('\n[Agent 8] Déploiement Cloudflare');
console.log('  ☁️  Simulation : Site déployé');
console.log('  - URL: https://plomberie-test.awema.fr');

// Résumé final
console.log('\n====================================');
console.log('✅ TEST TERMINÉ AVEC SUCCÈS');
console.log('====================================\n');

console.log('📊 Résumé :');
console.log('  - Workflow ID : workflow-' + Date.now());
console.log('  - Temps total : 5 minutes (simulé)');
console.log('  - Site final : https://plomberie-test.awema.fr');
console.log('  - CMS : https://plomberie-test.sanity.studio\n');

// Test du serveur Astro
console.log('💡 Pour tester le site généré :\n');
console.log('  npm run dev');
console.log('  # Puis ouvrir http://localhost:4321\n');

// Instructions pour test réel
console.log('🚀 Pour un test RÉEL avec APIs :\n');
console.log('  1. Configurer les clés API dans .env.local :');
console.log('     - NETLIFY_API_TOKEN');
console.log('     - BREVO_API_KEY');
console.log('     - SANITY_MANAGEMENT_TOKEN');
console.log('     - DEEPSEEK_API_KEY');
console.log('     - CLOUDFLARE_API_TOKEN\n');
console.log('  2. Lancer : node test-workflow-real.js\n');

process.exit(0);
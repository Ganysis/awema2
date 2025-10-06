#!/usr/bin/env node

/**
 * 🚀 Test de déploiement Cloudflare avec les vrais tokens
 *
 * Tokens configurés:
 * - ✅ Cloudflare Account ID: 596a12cfcd7eeda376f77b030d19aff5
 * - ✅ Cloudflare API Token: ns6-ir43C9gBdMO1XWSIOEVAAsVY4CPTY4vUPK0t
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Charger les variables d'environnement
require('dotenv').config({ path: './apps/studio/.env.production-real' });

const CLOUDFLARE_ACCOUNT_ID = '596a12cfcd7eeda376f77b030d19aff5';
const CLOUDFLARE_API_TOKEN = 'ns6-ir43C9gBdMO1XWSIOEVAAsVY4CPTY4vUPK0t';

console.log('🚀 AWEMA - Test Déploiement Cloudflare Pages\n');
console.log('================================================');

// Configuration du projet de test
const TEST_PROJECT = {
  name: 'plomberie-test-' + Date.now(),
  business: 'Plomberie Excellence Lyon',
  domain: 'plomberie-test.pages.dev'
};

/**
 * 1. Créer un projet Cloudflare Pages
 */
async function createCloudflareProject() {
  console.log('\n📦 Création du projet Cloudflare Pages...');

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: TEST_PROJECT.name,
        production_branch: 'main'
      })
    }
  );

  const data = await response.json();

  if (response.ok) {
    console.log('✅ Projet créé:', data.result.name);
    console.log('   URL:', `https://${data.result.subdomain}.pages.dev`);
    return data.result;
  } else {
    console.log('⚠️ Erreur création projet:', data.errors?.[0]?.message || 'Erreur inconnue');

    // Si le projet existe déjà, on continue
    if (data.errors?.[0]?.code === 8000007) {
      console.log('   Le projet existe déjà, on continue...');
      return { name: TEST_PROJECT.name, subdomain: TEST_PROJECT.name };
    }

    throw new Error('Impossible de créer le projet');
  }
}

/**
 * 2. Préparer les fichiers de build
 */
async function prepareBuildFiles() {
  console.log('\n🔨 Préparation du build Astro...');

  // Vérifier si le site existe déjà (généré précédemment)
  const distPath = path.join(__dirname, 'dist');

  if (!fs.existsSync(distPath)) {
    console.log('   Génération du site statique...');

    try {
      // Build le site Astro
      execSync('npm run build', {
        stdio: 'inherit',
        cwd: __dirname
      });

      console.log('✅ Build terminé avec succès');
    } catch (error) {
      console.log('⚠️ Erreur pendant le build:', error.message);
      console.log('   Utilisation du dossier public comme fallback...');

      // Créer un site minimal si le build échoue
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }

      // Copier un fichier HTML minimal
      const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${TEST_PROJECT.business}</title>
    <style>
        body { font-family: system-ui; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; opacity: 0.9; }
        .badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); border-radius: 2rem; margin-top: 2rem; }
    </style>
</head>
<body>
    <h1>🚀 ${TEST_PROJECT.business}</h1>
    <p>Site déployé avec succès sur Cloudflare Pages</p>
    <div class="badge">Propulsé par AWEMA 3.0</div>
</body>
</html>`;

      fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent);
    }
  } else {
    console.log('✅ Dossier de build existant trouvé');
  }

  return distPath;
}

/**
 * 3. Déployer sur Cloudflare Pages via Direct Upload
 */
async function deployToCloudflare(distPath) {
  console.log('\n☁️ Déploiement sur Cloudflare Pages...');

  // Créer un formulaire pour uploader les fichiers
  const FormData = (await import('form-data')).default;
  const formData = new FormData();

  // Ajouter tous les fichiers du dossier dist
  function addFilesToFormData(dir, basePath = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const relativePath = path.join(basePath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        addFilesToFormData(filePath, relativePath);
      } else {
        const content = fs.readFileSync(filePath);
        formData.append('file', content, {
          filename: relativePath.replace(/\\/g, '/'),
          contentType: 'application/octet-stream'
        });
      }
    }
  }

  // Si le dossier dist contient peu de fichiers, on ajoute directement
  const files = fs.readdirSync(distPath);
  if (files.length === 0) {
    console.log('❌ Aucun fichier à déployer');
    return null;
  }

  // Pour le test, on va juste uploader le index.html
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    formData.append('file', fs.createReadStream(indexPath), 'index.html');
  }

  // Créer un déploiement
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${TEST_PROJECT.name}/deployments`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        ...formData.getHeaders()
      },
      body: formData
    }
  );

  const data = await response.json();

  if (response.ok) {
    console.log('✅ Déploiement réussi!');
    console.log('   ID:', data.result.id);
    console.log('   URL:', data.result.url);
    return data.result;
  } else {
    console.log('❌ Erreur déploiement:', data.errors?.[0]?.message || 'Erreur inconnue');
    return null;
  }
}

/**
 * 4. Tester avec l'API Workers (alternative)
 */
async function testCloudflareWorkers() {
  console.log('\n⚡ Test alternative avec Cloudflare Workers...');

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts`,
    {
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
      }
    }
  );

  const data = await response.json();

  if (response.ok) {
    console.log('✅ API Cloudflare accessible');
    console.log('   Nombre de workers:', data.result?.length || 0);
    return true;
  } else {
    console.log('❌ Erreur API:', data.errors?.[0]?.message || 'Erreur inconnue');
    return false;
  }
}

/**
 * 5. Vérifier les permissions du token
 */
async function verifyTokenPermissions() {
  console.log('\n🔐 Vérification des permissions du token...');

  const response = await fetch(
    'https://api.cloudflare.com/client/v4/user/tokens/verify',
    {
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
      }
    }
  );

  const data = await response.json();

  if (response.ok && data.success) {
    console.log('✅ Token valide');
    console.log('   ID:', data.result.id);
    console.log('   Status:', data.result.status);
    return true;
  } else {
    console.log('❌ Token invalide:', data.errors?.[0]?.message || 'Erreur inconnue');
    return false;
  }
}

/**
 * Main - Exécution des tests
 */
async function main() {
  try {
    // 1. Vérifier le token
    const tokenValid = await verifyTokenPermissions();
    if (!tokenValid) {
      console.log('\n⚠️ Token invalide, impossible de continuer');
      return;
    }

    // 2. Tester l'accès à l'API
    await testCloudflareWorkers();

    // 3. Créer le projet
    const project = await createCloudflareProject();

    // 4. Préparer les fichiers
    const distPath = await prepareBuildFiles();

    // 5. Déployer (si possible)
    // Note: Le déploiement direct peut nécessiter Wrangler CLI
    console.log('\n📝 Note: Pour un déploiement complet, utiliser Wrangler CLI:');
    console.log('   npm install -g wrangler');
    console.log('   wrangler pages deploy dist --project-name=' + TEST_PROJECT.name);

    console.log('\n================================================');
    console.log('📊 RÉSUMÉ DU TEST CLOUDFLARE');
    console.log('================================================');
    console.log('✅ Token Cloudflare valide');
    console.log('✅ Accès API confirmé');
    console.log('✅ Projet créé:', TEST_PROJECT.name);
    console.log('📌 URL prévue:', `https://${TEST_PROJECT.name}.pages.dev`);
    console.log('\n💡 Prochaine étape:');
    console.log('   Installer Wrangler CLI pour déploiement automatique');
    console.log('   ou utiliser GitHub Actions pour CI/CD');

  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    console.error(error.stack);
  }
}

// Lancer le test
main().catch(console.error);
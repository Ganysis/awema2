const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const NETLIFY_TOKEN = process.env.NETLIFY_ACCESS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
const PROJECT_ID = 'cmd0qet6w0001j10tkkyd3t0o';

async function deployV3Project() {
  console.log('🚀 DÉPLOIEMENT DU PROJET V3 SUR NETLIFY...\n');

  if (!NETLIFY_TOKEN) {
    throw new Error('Token Netlify manquant !');
  }

  // Récupérer les données du projet
  console.log('📦 Récupération des données du projet...');
  const projectResponse = await fetch(`${API_BASE_URL}/projects/${PROJECT_ID}`);
  
  if (!projectResponse.ok) {
    throw new Error('Impossible de récupérer le projet');
  }

  const project = await projectResponse.json();
  console.log('✅ Projet récupéré:', project.name);

  // Préparer le déploiement
  const timestamp = Date.now();
  const siteName = `v3-perfect-demo-${timestamp}`;
  
  const deployData = {
    projectId: PROJECT_ID,
    siteId: siteName,
    siteName: siteName,
    projectData: project.data,
    plan: 'starter',
    netlifyToken: NETLIFY_TOKEN,
    domainType: 'subdomain',
    cmsLevel: 'basic'
  };

  console.log('\n🌐 Nom du site:', siteName);
  console.log('📡 Envoi de la requête de déploiement...');

  const deployResponse = await fetch(`${API_BASE_URL}/deploy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deployData)
  });

  if (!deployResponse.ok) {
    const error = await deployResponse.text();
    throw new Error(`Erreur déploiement: ${error}`);
  }

  const result = await deployResponse.json();
  
  console.log('\n✅ DÉPLOIEMENT RÉUSSI !');
  console.log('\n📌 LIENS IMPORTANTS:');
  console.log('🌐 URL DU SITE: https://' + siteName + '.netlify.app');
  console.log('📊 DASHBOARD NETLIFY:', result.adminUrl || `https://app.netlify.com/sites/${siteName}`);
  console.log('\n🎉 Le site avec tous les blocs V3 Perfect est en ligne !');
  
  // Sauvegarder les infos
  const fs = require('fs').promises;
  const deployInfo = {
    projectId: PROJECT_ID,
    siteName: siteName,
    siteUrl: `https://${siteName}.netlify.app`,
    netlifyDashboard: result.adminUrl || `https://app.netlify.com/sites/${siteName}`,
    deployedAt: new Date().toISOString(),
    blocksV3: [
      'HeroV3Perfect',
      'FeaturesV3Perfect', 
      'ServicesV3Perfect',
      'GalleryV3Perfect',
      'ContentV3Perfect',
      'TestimonialsV3Perfect',
      'PricingV3Perfect',
      'FAQV3Perfect',
      'CTAV3Perfect',
      'ContactV3Perfect'
    ]
  };

  await fs.writeFile(
    'v3-deploy-success.json',
    JSON.stringify(deployInfo, null, 2)
  );

  return deployInfo;
}

// GO !
deployV3Project()
  .then(info => {
    console.log('\n📄 Infos sauvegardées dans v3-deploy-success.json');
    console.log('\n🔗 VISITE TON SITE ICI: ' + info.siteUrl);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ ERREUR:', error.message);
    process.exit(1);
  });
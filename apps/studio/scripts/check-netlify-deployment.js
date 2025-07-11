#!/usr/bin/env node

const { NetlifyAPI } = require('@netlify/api');

// Configuration
const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN || process.env.NETLIFY_TOKEN;
const SITE_NAME = 'test-debug-1752151506356';

if (!NETLIFY_TOKEN) {
  console.error('❌ Erreur: NETLIFY_AUTH_TOKEN ou NETLIFY_TOKEN non défini');
  process.exit(1);
}

async function checkDeployment() {
  try {
    const client = new NetlifyAPI(NETLIFY_TOKEN);
    
    console.log('🔍 Recherche du site:', SITE_NAME);
    
    // Lister tous les sites
    const sites = await client.listSites();
    const site = sites.find(s => s.name === SITE_NAME);
    
    if (!site) {
      console.log('❌ Site non trouvé');
      console.log('\n📋 Sites disponibles:');
      sites.slice(0, 5).forEach(s => {
        console.log(`  - ${s.name}: ${s.url}`);
      });
      return;
    }
    
    console.log('\n✅ Site trouvé:');
    console.log('  ID:', site.id);
    console.log('  Nom:', site.name);
    console.log('  URL:', site.url);
    console.log('  SSL URL:', site.ssl_url);
    console.log('  Admin URL:', site.admin_url);
    console.log('  Créé le:', new Date(site.created_at).toLocaleString());
    console.log('  Mis à jour le:', new Date(site.updated_at).toLocaleString());
    console.log('  État:', site.state);
    
    // Récupérer les derniers déploiements
    console.log('\n📦 Derniers déploiements:');
    const deploys = await client.listSiteDeploys({
      site_id: site.id,
      per_page: 5
    });
    
    if (deploys.length === 0) {
      console.log('  Aucun déploiement trouvé');
    } else {
      deploys.forEach((deploy, index) => {
        console.log(`\n  Déploiement #${index + 1}:`);
        console.log('    ID:', deploy.id);
        console.log('    État:', deploy.state);
        console.log('    Créé le:', new Date(deploy.created_at).toLocaleString());
        console.log('    Publié le:', deploy.published_at ? new Date(deploy.published_at).toLocaleString() : 'Non publié');
        console.log('    URL de déploiement:', deploy.deploy_ssl_url || deploy.deploy_url);
        console.log('    Contexte:', deploy.context);
        console.log('    Branche:', deploy.branch);
        
        if (deploy.error_message) {
          console.log('    ❌ Erreur:', deploy.error_message);
        }
        
        if (deploy.summary) {
          console.log('    📊 Résumé:', JSON.stringify(deploy.summary, null, 2));
        }
      });
    }
    
    // Vérifier les fichiers du dernier déploiement
    if (deploys.length > 0 && deploys[0].state === 'ready') {
      console.log('\n📄 Vérification des fichiers du dernier déploiement...');
      try {
        const deployFiles = await client.getDeploy({
          deploy_id: deploys[0].id
        });
        
        console.log('  Nombre de fichiers:', deployFiles.file_count || 'Non disponible');
        console.log('  Taille totale:', deployFiles.file_size ? `${(deployFiles.file_size / 1024 / 1024).toFixed(2)} MB` : 'Non disponible');
      } catch (error) {
        console.log('  ⚠️  Impossible de récupérer les détails des fichiers');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
  }
}

checkDeployment();
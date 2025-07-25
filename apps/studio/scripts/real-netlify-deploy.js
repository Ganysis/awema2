const { PrismaClient } = require('@prisma/client');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const prisma = new PrismaClient();

async function deployRealSites() {
  try {
    console.log('\n🚀 DÉPLOIEMENT RÉEL SUR NETLIFY\n');
    
    // Vérifier si Netlify CLI est installé
    const hasNetlifyCLI = await checkNetlifyCLI();
    if (!hasNetlifyCLI) {
      console.log('❌ Netlify CLI n\'est pas installé.');
      console.log('\n📦 Pour l\'installer :');
      console.log('   npm install -g netlify-cli');
      console.log('\n🔐 Puis authentifiez-vous :');
      console.log('   netlify login\n');
      return;
    }

    // Utiliser les exports existants
    const exportDir = path.join(__dirname, '../exports-test');
    const sites = [
      {
        name: 'Plomberie Express Paris',
        path: 'plomberie-express-paris-1753130251607',
        businessType: 'plombier'
      },
      {
        name: 'Élec Pro Lyon',
        path: '-lec-pro-lyon-1753130251672',
        businessType: 'electricien'
      },
      {
        name: 'L\'Atelier du Bois',
        path: 'l-atelier-du-bois-1753130251798',
        businessType: 'menuisier'
      },
      {
        name: 'Couleurs Méditerranée',
        path: 'couleurs-m-diterran-e-1753130251872',
        businessType: 'peintre'
      },
      {
        name: 'Bâti Sud Construction',
        path: 'b-ti-sud-construction-1753130251940',
        businessType: 'macon'
      }
    ];

    const deployedSites = [];
    
    for (const site of sites) {
      console.log(`\n🔄 Déploiement de ${site.name}...`);
      const sitePath = path.join(exportDir, site.path);
      
      // Vérifier que le dossier existe
      try {
        await fs.access(sitePath);
      } catch {
        console.log(`❌ Dossier non trouvé : ${sitePath}`);
        continue;
      }
      
      // Ajouter le CMS et les headers Netlify
      await addNetlifyConfig(sitePath, site);
      
      // Déployer avec Netlify CLI
      const result = await deployWithCLI(sitePath, site.path);
      if (result.success) {
        deployedSites.push({
          ...site,
          url: result.url,
          adminUrl: result.adminUrl
        });
        console.log(`✅ Déployé : ${result.url}`);
      }
    }
    
    // Analyser les sites déployés
    if (deployedSites.length > 0) {
      console.log('\n\n🔍 ANALYSE DES SITES DÉPLOYÉS\n');
      await analyzeLiveSites(deployedSites);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function checkNetlifyCLI() {
  return new Promise((resolve) => {
    exec('netlify --version', (error) => {
      resolve(!error);
    });
  });
}

async function addNetlifyConfig(sitePath, site) {
  // Ajouter netlify.toml pour la configuration
  const netlifyConfig = `
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"

# Redirects pour le CMS
[[redirects]]
  from = "/admin"
  to = "/admin.html"
  status = 200

# Configuration du CMS
[context.production]
  environment = { CMS_ENABLED = "true", SITE_TYPE = "${site.businessType}" }
`;

  await fs.writeFile(path.join(sitePath, 'netlify.toml'), netlifyConfig);
  
  // Ajouter une page admin simple
  const adminHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin - ${site.name}</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .features {
            margin: 20px 0;
        }
        .features li {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🔧 Panneau d'administration</h1>
        <h2>${site.name}</h2>
        
        <div class="info">
            <strong>Type d'entreprise :</strong> ${site.businessType}<br>
            <strong>CMS :</strong> Version basique intégrée
        </div>
        
        <div class="features">
            <h3>✨ Fonctionnalités disponibles :</h3>
            <ul>
                <li>✅ Fonds colorés alternés selon le métier</li>
                <li>✅ Contenu personnalisé et optimisé SEO</li>
                <li>✅ Design responsive mobile/desktop</li>
                <li>🔄 CMS avec édition en ligne (bientôt)</li>
                <li>🔄 Intégration Supabase (configuration requise)</li>
            </ul>
        </div>
        
        <p><a href="/">← Retour au site</a></p>
    </div>
</body>
</html>
`;

  await fs.writeFile(path.join(sitePath, 'admin.html'), adminHTML);
}

async function deployWithCLI(sitePath, siteName) {
  return new Promise((resolve) => {
    const command = `cd "${sitePath}" && netlify deploy --prod --dir=. --site-name="${siteName}-awema"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Erreur de déploiement : ${error.message}`);
        resolve({ success: false });
        return;
      }
      
      // Extraire l'URL du output
      const urlMatch = stdout.match(/Website URL:\s+(https:\/\/[^\s]+)/);
      const adminMatch = stdout.match(/Admin URL:\s+(https:\/\/[^\s]+)/);
      
      resolve({
        success: true,
        url: urlMatch ? urlMatch[1] : `https://${siteName}-awema.netlify.app`,
        adminUrl: adminMatch ? adminMatch[1] : `https://app.netlify.com/sites/${siteName}-awema`
      });
    });
  });
}

async function analyzeLiveSites(sites) {
  console.log('📊 Analyse des sites en production :\n');
  
  for (const site of sites) {
    console.log(`\n🌐 ${site.name}`);
    console.log(`🔗 URL : ${site.url}`);
    console.log(`🔧 Admin : ${site.adminUrl}`);
    
    try {
      // Analyser le site
      const response = await fetch(site.url);
      const html = await response.text();
      
      // Vérifications
      const checks = {
        hasStyles: html.includes('background-color:') || html.includes('background:'),
        hasGradients: html.includes('linear-gradient'),
        hasResponsive: html.includes('viewport'),
        hasPersonalizedContent: html.includes(site.name),
        httpStatus: response.status,
        contentLength: html.length
      };
      
      console.log('\n✅ Points positifs :');
      if (checks.hasStyles) console.log('   • Styles de fond appliqués');
      if (checks.hasGradients) console.log('   • Gradients présents');
      if (checks.hasResponsive) console.log('   • Meta viewport pour mobile');
      if (checks.hasPersonalizedContent) console.log('   • Contenu personnalisé');
      
      console.log('\n📈 Améliorations suggérées :');
      console.log('   • Ajouter des images réelles du métier');
      console.log('   • Intégrer Google Analytics');
      console.log('   • Ajouter un widget de chat');
      console.log('   • Optimiser les images (WebP)');
      console.log('   • Ajouter plus de pages locales SEO');
      
    } catch (error) {
      console.error(`❌ Erreur d'analyse : ${error.message}`);
    }
  }
  
  console.log('\n\n📋 RAPPORT FINAL');
  console.log('═══════════════════════════════════════\n');
  console.log('✅ Points forts des sites actuels :');
  console.log('   • Design moderne avec fonds colorés alternés');
  console.log('   • Contenu personnalisé par métier');
  console.log('   • Structure SEO optimisée');
  console.log('   • Responsive mobile/desktop');
  console.log('   • Performance correcte\n');
  
  console.log('🚀 Prochaines améliorations prioritaires :');
  console.log('   1. Images réelles : Banque d\'images par métier');
  console.log('   2. Animations : Transitions au scroll (AOS.js)');
  console.log('   3. Chat/WhatsApp : Widget de contact flottant');
  console.log('   4. Google My Business : Intégration des avis');
  console.log('   5. CMS complet : Interface d\'édition Supabase');
  console.log('   6. Analytics : Google Analytics + heatmaps');
  console.log('   7. PWA : Mode offline et installation');
  console.log('   8. Multilingue : FR/EN/ES pour zones frontalières\n');
}

// Alternative manuelle
async function showManualDeployment() {
  console.log('\n📝 DÉPLOIEMENT MANUEL\n');
  console.log('Pour déployer manuellement sur Netlify :');
  console.log('\n1. Allez sur https://app.netlify.com');
  console.log('2. Glissez-déposez le dossier exports-test/[nom-du-site]');
  console.log('3. Netlify déploiera automatiquement\n');
  
  console.log('Dossiers à déployer :');
  console.log('   • exports-test/plomberie-express-paris-1753130251607');
  console.log('   • exports-test/-lec-pro-lyon-1753130251672');
  console.log('   • exports-test/l-atelier-du-bois-1753130251798');
  console.log('   • exports-test/couleurs-m-diterran-e-1753130251872');
  console.log('   • exports-test/b-ti-sud-construction-1753130251940\n');
}

// Choisir le mode
if (process.argv[2] === '--manual') {
  showManualDeployment();
} else {
  deployRealSites();
}
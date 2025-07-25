const fs = require('fs').promises;
const path = require('path');
const archiver = require('archiver');
const { createWriteStream } = require('fs');

async function prepareForNetlify() {
  console.log('\n📦 PRÉPARATION DES SITES POUR NETLIFY\n');
  
  const exportDir = path.join(__dirname, '../exports-test');
  const deployDir = path.join(__dirname, '../netlify-ready');
  
  // Créer le dossier de déploiement
  await fs.mkdir(deployDir, { recursive: true });
  
  const sites = [
    {
      name: 'Plomberie Express Paris',
      sourcePath: 'plomberie-express-paris-1753130251607',
      deployName: 'plomberie-express-paris',
      businessType: 'plombier'
    },
    {
      name: 'Élec Pro Lyon',
      sourcePath: '-lec-pro-lyon-1753130251672',
      deployName: 'elec-pro-lyon',
      businessType: 'electricien'
    },
    {
      name: 'L\'Atelier du Bois',
      sourcePath: 'l-atelier-du-bois-1753130251798',
      deployName: 'atelier-du-bois',
      businessType: 'menuisier'
    },
    {
      name: 'Couleurs Méditerranée',
      sourcePath: 'couleurs-m-diterran-e-1753130251872',
      deployName: 'couleurs-mediterranee',
      businessType: 'peintre'
    },
    {
      name: 'Bâti Sud Construction',
      sourcePath: 'b-ti-sud-construction-1753130251940',
      deployName: 'bati-sud-construction',
      businessType: 'macon'
    }
  ];
  
  for (const site of sites) {
    console.log(`\n🔄 Préparation de ${site.name}...`);
    
    const sourceDir = path.join(exportDir, site.sourcePath);
    const targetDir = path.join(deployDir, site.deployName);
    
    try {
      // Vérifier que le dossier source existe
      await fs.access(sourceDir);
      
      // Créer le dossier cible
      await fs.mkdir(targetDir, { recursive: true });
      
      // Copier les fichiers
      const files = await fs.readdir(sourceDir);
      for (const file of files) {
        const source = path.join(sourceDir, file);
        const target = path.join(targetDir, file);
        await fs.copyFile(source, target);
      }
      
      // Ajouter netlify.toml
      const netlifyConfig = `
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirects pour SEO
[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301

# Page 404 personnalisée
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

# Configuration du site
[build.environment]
  SITE_NAME = "${site.name}"
  BUSINESS_TYPE = "${site.businessType}"
`;

      await fs.writeFile(path.join(targetDir, 'netlify.toml'), netlifyConfig);
      
      // Ajouter une page 404
      const page404 = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page non trouvée - ${site.name}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .error-container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 500px;
        }
        h1 { 
            font-size: 4rem; 
            margin: 0 0 1rem; 
            color: ${site.businessType === 'plombier' ? '#3B82F6' :
                    site.businessType === 'electricien' ? '#F59E0B' :
                    site.businessType === 'menuisier' ? '#92400E' :
                    site.businessType === 'peintre' ? '#7C3AED' : '#6B7280'};
        }
        h2 { color: #333; margin-bottom: 1rem; }
        p { color: #666; margin-bottom: 2rem; }
        a {
            display: inline-block;
            padding: 0.75rem 2rem;
            background: ${site.businessType === 'plombier' ? '#3B82F6' :
                         site.businessType === 'electricien' ? '#F59E0B' :
                         site.businessType === 'menuisier' ? '#92400E' :
                         site.businessType === 'peintre' ? '#7C3AED' : '#6B7280'};
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: opacity 0.3s;
        }
        a:hover { opacity: 0.9; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <h2>Page non trouvée</h2>
        <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
        <a href="/">Retour à l'accueil</a>
    </div>
</body>
</html>
`;

      await fs.writeFile(path.join(targetDir, '404.html'), page404);
      
      // Ajouter robots.txt
      const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://${site.deployName}.netlify.app/sitemap.xml
`;

      await fs.writeFile(path.join(targetDir, 'robots.txt'), robotsTxt);
      
      // Créer un ZIP pour chaque site (optionnel)
      const zipPath = path.join(deployDir, `${site.deployName}.zip`);
      await createZip(targetDir, zipPath);
      
      console.log(`✅ Site préparé dans : netlify-ready/${site.deployName}/`);
      console.log(`   • Fichiers : index.html, netlify.toml, 404.html, robots.txt`);
      console.log(`   • ZIP créé : ${site.deployName}.zip`);
      
    } catch (error) {
      console.error(`❌ Erreur pour ${site.name} :`, error.message);
    }
  }
  
  console.log('\n\n📋 INSTRUCTIONS DE DÉPLOIEMENT NETLIFY :');
  console.log('═══════════════════════════════════════════\n');
  console.log('Option 1 : Glisser-déposer (recommandé)');
  console.log('1. Allez sur https://app.netlify.com');
  console.log('2. Glissez le dossier netlify-ready/[nom-du-site] sur la page');
  console.log('3. Netlify déploiera automatiquement\n');
  
  console.log('Option 2 : Upload du ZIP');
  console.log('1. Allez sur https://app.netlify.com/drop');
  console.log('2. Glissez le fichier netlify-ready/[nom-du-site].zip\n');
  
  console.log('Option 3 : Netlify CLI');
  console.log('1. Installez : npm install -g netlify-cli');
  console.log('2. Authentifiez : netlify login');
  console.log('3. Déployez : netlify deploy --dir=netlify-ready/[nom-du-site] --prod\n');
  
  console.log('📁 Sites prêts dans : apps/studio/netlify-ready/');
  
  // Créer un fichier avec les URLs prévues
  const urlsFile = `
# URLs Netlify prévues après déploiement

## Sites avec fonds colorés et contenu personnalisé :

1. **Plomberie Express Paris** (Thème bleu)
   - URL : https://plomberie-express-paris.netlify.app
   - Ou : https://[votre-nom-unique].netlify.app

2. **Élec Pro Lyon** (Thème jaune)
   - URL : https://elec-pro-lyon.netlify.app
   - Ou : https://[votre-nom-unique].netlify.app

3. **L'Atelier du Bois** (Thème marron)
   - URL : https://atelier-du-bois.netlify.app
   - Ou : https://[votre-nom-unique].netlify.app

4. **Couleurs Méditerranée** (Thème violet)
   - URL : https://couleurs-mediterranee.netlify.app
   - Ou : https://[votre-nom-unique].netlify.app

5. **Bâti Sud Construction** (Thème gris)
   - URL : https://bati-sud-construction.netlify.app
   - Ou : https://[votre-nom-unique].netlify.app

## Après déploiement :

1. Copiez les URLs réelles de vos sites
2. Mettez à jour le fichier analyze-real-netlify-sites.js avec ces URLs
3. Relancez l'analyse : node scripts/analyze-real-netlify-sites.js
`;

  await fs.writeFile(path.join(deployDir, 'NETLIFY-URLS.md'), urlsFile);
  console.log('\n📄 Guide des URLs : netlify-ready/NETLIFY-URLS.md');
}

function createZip(sourceDir, zipPath) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', resolve);
    archive.on('error', reject);
    
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

// Si archiver n'est pas installé, version simplifiée
async function prepareSimple() {
  console.log('\n📦 PRÉPARATION SIMPLIFIÉE POUR NETLIFY\n');
  
  const exportDir = path.join(__dirname, '../exports-test');
  const sites = await fs.readdir(exportDir);
  
  console.log('Sites disponibles pour déploiement :');
  sites.forEach((site, index) => {
    console.log(`${index + 1}. ${site}`);
  });
  
  console.log('\n📋 Pour déployer sur Netlify :');
  console.log('1. Allez sur https://app.netlify.com/drop');
  console.log('2. Glissez le dossier exports-test/[nom-du-site]');
  console.log('3. Netlify vous donnera une URL du type : https://amazing-site-123abc.netlify.app');
  console.log('4. Notez cette URL pour l\'analyse\n');
  
  console.log('💡 Astuce : Vous pouvez renommer le site après déploiement dans les paramètres Netlify');
}

// Vérifier si archiver est disponible
try {
  require('archiver');
  prepareForNetlify();
} catch {
  prepareSimple();
}
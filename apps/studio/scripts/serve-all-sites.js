const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// Serveur HTTP simple pour servir les fichiers statiques
const http = require('http');
const url = require('url');

async function serveSite(sitePath, port) {
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html
    if (pathname === '/') {
      pathname = '/index.html';
    }
    
    const filePath = path.join(sitePath, pathname);
    
    try {
      const data = await fs.readFile(filePath);
      
      // Set content type
      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
      }[ext] || 'text/plain';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch (err) {
      res.writeHead(404);
      res.end('404 Not Found');
    }
  });
  
  server.listen(port);
  return server;
}

async function serveAllSites() {
  console.log('\n🚀 SERVEUR LOCAL POUR VISUALISER LES SITES\n');
  
  const sites = [
    { 
      name: 'Plomberie Express Paris', 
      folder: 'netlify-ready/plomberie-express-paris', 
      port: 8081,
      businessType: 'plombier'
    },
    { 
      name: 'Élec Pro Lyon', 
      folder: 'netlify-ready/elec-pro-lyon', 
      port: 8082,
      businessType: 'électricien'
    },
    { 
      name: 'L\'Atelier du Bois', 
      folder: 'netlify-ready/atelier-du-bois', 
      port: 8083,
      businessType: 'menuisier'
    },
    { 
      name: 'Couleurs Méditerranée', 
      folder: 'netlify-ready/couleurs-mediterranee', 
      port: 8084,
      businessType: 'peintre'
    },
    { 
      name: 'Bâti Sud Construction', 
      folder: 'netlify-ready/bati-sud-construction', 
      port: 8085,
      businessType: 'maçon'
    }
  ];
  
  const servers = [];
  const servedSites = [];
  
  for (const site of sites) {
    try {
      const sitePath = path.join(__dirname, '..', site.folder);
      const server = await serveSite(sitePath, site.port);
      servers.push(server);
      
      const localUrl = `http://localhost:${site.port}`;
      servedSites.push({
        name: site.name,
        businessType: site.businessType,
        url: localUrl,
        port: site.port
      });
      
      console.log(`✅ ${site.name} (${site.businessType})`);
      console.log(`   🔗 ${localUrl}\n`);
      
    } catch (error) {
      console.error(`❌ Erreur pour ${site.name} : ${error.message}`);
    }
  }
  
  if (servedSites.length > 0) {
    console.log('\n📊 ANALYSE DES SITES EN LOCAL\n');
    
    // Attendre que les serveurs soient prêts
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    for (const site of servedSites) {
      console.log(`\n🔍 ${site.name} (${site.businessType})`);
      console.log(`🔗 ${site.url}`);
      
      try {
        const response = await fetch(site.url);
        const html = await response.text();
        
        if (response.ok) {
          // Analyser le contenu
          const analysis = {
            size: Math.round(html.length / 1024),
            backgroundColors: (html.match(/background-color:\s*[^;]+/g) || []).length,
            gradients: (html.match(/linear-gradient/g) || []).length,
            hasPersonalized: html.includes(site.name.split(' ')[0]),
            hasCMS: html.includes('cms-config') || html.includes('SUPABASE_URL'),
            sections: (html.match(/<section/g) || []).length
          };
          
          console.log(`\n📈 Résultats :`);
          console.log(`   • Taille : ${analysis.size} KB`);
          console.log(`   • Sections : ${analysis.sections}`);
          console.log(`   • Fonds colorés : ${analysis.backgroundColors}`);
          console.log(`   • Gradients : ${analysis.gradients}`);
          console.log(`   • Personnalisé : ${analysis.hasPersonalized ? '✅' : '❌'}`);
          console.log(`   • CMS intégré : ${analysis.hasCMS ? '✅' : '❌'}`);
          
          // Extraire quelques couleurs pour vérifier
          const colors = html.match(/background-color:\s*([^;]+)/g);
          if (colors && colors.length > 0) {
            console.log(`\n🎨 Aperçu des couleurs :`);
            colors.slice(0, 5).forEach(color => {
              console.log(`   • ${color}`);
            });
          }
        }
        
      } catch (error) {
        console.error(`❌ Erreur d'analyse : ${error.message}`);
      }
    }
    
    console.log('\n\n✅ SERVEURS LOCAUX ACTIFS !');
    console.log('═══════════════════════════════════════\n');
    console.log('🌐 Sites accessibles localement :');
    servedSites.forEach(site => {
      console.log(`   • ${site.name} : ${site.url}`);
    });
    
    console.log('\n📋 ANALYSE VISUELLE :');
    console.log('Ouvrez chaque URL dans votre navigateur pour vérifier :');
    console.log('   ✓ Les fonds colorés alternés');
    console.log('   ✓ Les gradients appliqués');
    console.log('   ✓ Le contenu personnalisé');
    console.log('   ✓ La présence du CMS');
    
    console.log('\n🛑 Pour arrêter les serveurs : Ctrl+C\n');
    
    // Garder les serveurs actifs
    process.on('SIGINT', () => {
      console.log('\n\n🛑 Arrêt des serveurs...');
      servers.forEach(server => server.close());
      process.exit(0);
    });
    
  }
}

// Lancer les serveurs
serveAllSites().catch(err => {
  console.error('❌ Erreur globale :', err.message);
});
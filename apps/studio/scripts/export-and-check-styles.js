const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');
const prisma = new PrismaClient();

// Import du service d'export - commenté car TypeScript
// const { StaticExportService } = require('../lib/services/static-export.service');

async function exportAndCheckStyles() {
  try {
    console.log('\n📦 EXPORT ET VÉRIFICATION DES STYLES\n');

    // Créer le dossier d'export
    const exportDir = path.join(__dirname, '../exports-test');
    await fs.mkdir(exportDir, { recursive: true });

    // Récupérer les projets
    const projects = await prisma.project.findMany({
      where: {
        client: {
          companyName: {
            in: [
              'Plomberie Express Paris',
              'Élec Pro Lyon',
              'L\'Atelier du Bois',
              'Couleurs Méditerranée',
              'Bâti Sud Construction'
            ]
          }
        }
      },
      include: {
        client: true
      }
    });

    console.log(`📊 ${projects.length} projets trouvés\n`);

    const exportService = new StaticExportService();
    const results = [];

    for (const project of projects) {
      console.log(`\n🔄 Export de ${project.client.companyName}...`);
      
      try {
        // Extraire les données du projet
        const projectData = JSON.parse(project.data || '{}');
        
        // Créer un dossier pour ce projet
        const projectDir = path.join(exportDir, project.slug);
        await fs.mkdir(projectDir, { recursive: true });
        
        // Exporter le site
        const exportData = await exportService.exportProject(project.id);
        
        // Sauvegarder les fichiers
        await fs.writeFile(
          path.join(projectDir, 'index.html'),
          exportData.html
        );
        
        if (exportData.css) {
          await fs.writeFile(
            path.join(projectDir, 'styles.css'),
            exportData.css
          );
        }
        
        // Analyser le HTML pour vérifier les styles
        const styleAnalysis = analyzeStyles(exportData.html);
        
        results.push({
          name: project.client.companyName,
          slug: project.slug,
          path: projectDir,
          analysis: styleAnalysis
        });
        
        console.log(`✅ Exporté dans : exports-test/${project.slug}/`);
        console.log(`📊 Analyse : ${styleAnalysis.totalBlocks} blocs, ${styleAnalysis.styledBlocks} avec styles`);
        
      } catch (error) {
        console.error(`❌ Erreur pour ${project.client.companyName}:`, error.message);
      }
    }

    // Créer une page d'index pour voir tous les sites
    await createIndexPage(exportDir, results);
    
    console.log('\n\n✅ EXPORT TERMINÉ !');
    console.log('═══════════════════════════════');
    console.log('\n📁 Fichiers exportés dans : apps/studio/exports-test/');
    console.log('\n🔗 Pour voir les sites :');
    results.forEach(result => {
      console.log(`\n${result.name} :`);
      console.log(`📄 file://${path.resolve(result.path)}/index.html`);
      console.log(`📊 ${result.analysis.summary}`);
    });
    
    console.log('\n\n🏠 Page d\'index avec tous les sites :');
    console.log(`📄 file://${path.resolve(exportDir)}/index.html`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function analyzeStyles(html) {
  const backgroundColors = (html.match(/background-color:\s*([^;]+)/g) || []).length;
  const gradients = (html.match(/background:\s*linear-gradient/g) || []).length;
  const inlineStyles = (html.match(/style="[^"]+"/g) || []).length;
  const divWithStyles = (html.match(/<div[^>]+style="[^"]*background/g) || []).length;
  
  return {
    totalBlocks: (html.match(/<section/g) || []).length,
    styledBlocks: divWithStyles,
    backgroundColors,
    gradients,
    inlineStyles,
    summary: `${backgroundColors} fonds colorés, ${gradients} gradients, ${inlineStyles} styles inline`
  };
}

async function createIndexPage(exportDir, results) {
  const indexHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sites Exportés - Test des Styles</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: #f5f5f5;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 3rem;
        }
        .sites-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .site-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .site-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .site-card h2 {
            margin: 0 0 1rem 0;
            color: #333;
        }
        .site-card .type {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        .site-card .stats {
            background: #f8f9fa;
            padding: 0.75rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            font-size: 0.85rem;
        }
        .site-card .links {
            display: flex;
            gap: 1rem;
        }
        .site-card a {
            flex: 1;
            padding: 0.5rem 1rem;
            text-align: center;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s;
        }
        .site-card a.view {
            background: #3b82f6;
            color: white;
        }
        .site-card a.view:hover {
            background: #2563eb;
        }
        .site-card a.iframe {
            background: #10b981;
            color: white;
        }
        .site-card a.iframe:hover {
            background: #059669;
        }
        .preview-section {
            margin-top: 3rem;
        }
        .preview-section h2 {
            margin-bottom: 1.5rem;
        }
        .iframe-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
        }
        .iframe-wrapper {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .iframe-header {
            background: #f3f4f6;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #e5e7eb;
            font-weight: 500;
        }
        iframe {
            width: 100%;
            height: 600px;
            border: none;
        }
    </style>
</head>
<body>
    <h1>🎨 Sites Exportés avec Styles Personnalisés</h1>
    
    <div class="sites-grid">
        ${results.map(result => {
            const businessType = result.name.includes('Plomberie') ? 'Plombier' :
                               result.name.includes('Élec') ? 'Électricien' :
                               result.name.includes('Atelier') ? 'Menuisier' :
                               result.name.includes('Couleurs') ? 'Peintre' : 'Maçon';
            return `
            <div class="site-card">
                <h2>${result.name}</h2>
                <div class="type">🔧 ${businessType}</div>
                <div class="stats">
                    📊 Analyse des styles :<br>
                    • ${result.analysis.backgroundColors} fonds colorés<br>
                    • ${result.analysis.gradients} gradients<br>
                    • ${result.analysis.styledBlocks} blocs stylisés<br>
                    • ${result.analysis.inlineStyles} styles inline
                </div>
                <div class="links">
                    <a href="${result.slug}/index.html" class="view" target="_blank">Voir le site</a>
                    <a href="#iframe-${result.slug}" class="iframe">Preview ↓</a>
                </div>
            </div>
            `;
        }).join('')}
    </div>

    <div class="preview-section">
        <h2>👁️ Previews intégrées</h2>
        <div class="iframe-container">
            ${results.map(result => `
            <div class="iframe-wrapper" id="iframe-${result.slug}">
                <div class="iframe-header">${result.name}</div>
                <iframe src="${result.slug}/index.html"></iframe>
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
  `;
  
  await fs.writeFile(path.join(exportDir, 'index.html'), indexHtml);
}

// Alternative : Export simple sans service TypeScript
async function simpleExport() {
  try {
    console.log('\n📦 EXPORT SIMPLE DES SITES\n');

    const exportDir = path.join(__dirname, '../exports-test');
    await fs.mkdir(exportDir, { recursive: true });

    const projects = await prisma.project.findMany({
      where: {
        client: {
          companyName: {
            in: ['Plomberie Express Paris']
          }
        }
      },
      include: {
        client: true
      }
    });

    for (const project of projects) {
      console.log(`\n🔄 Export simple de ${project.client.companyName}...`);
      
      const projectData = JSON.parse(project.data || '{}');
      const pages = projectData.pages || [];
      const homePage = pages.find(p => p.isHomePage) || pages[0];
      
      if (!homePage) {
        console.log('❌ Pas de page trouvée');
        continue;
      }

      // Générer un HTML simple avec les styles
      const html = generateSimpleHTML(homePage, project.client.companyName);
      
      const projectDir = path.join(exportDir, project.slug);
      await fs.mkdir(projectDir, { recursive: true });
      await fs.writeFile(path.join(projectDir, 'test.html'), html);
      
      console.log(`✅ Exporté dans : exports-test/${project.slug}/test.html`);
      console.log(`🔗 file://${path.resolve(projectDir)}/test.html`);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function generateSimpleHTML(page, companyName) {
  const blocks = page.blocks || [];
  
  const blocksHTML = blocks.map(block => {
    let blockHTML = `<div class="block ${block.type}">`;
    
    // Ajouter le style si présent
    if (block.style) {
      const styleStr = Object.entries(block.style)
        .map(([key, value]) => {
          if (key === 'backgroundColor') return `background-color: ${value}`;
          if (key === 'backgroundGradient') return `background: ${value}`;
          return '';
        })
        .filter(s => s)
        .join('; ');
      
      if (styleStr) {
        blockHTML = `<div class="block ${block.type}" style="${styleStr}; padding: 3rem 0;">`;
      }
    }
    
    // Contenu simple du bloc
    blockHTML += `
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
        <h2>${block.props?.title || block.type}</h2>
        <p>${block.props?.subtitle || block.props?.description || 'Contenu du bloc'}</p>
      </div>
    `;
    
    blockHTML += '</div>';
    return blockHTML;
  }).join('\n');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - Test des Styles</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: sans-serif; }
        .block { min-height: 300px; display: flex; align-items: center; }
        h2 { font-size: 2rem; margin-bottom: 1rem; }
        p { font-size: 1.1rem; color: #666; }
    </style>
</head>
<body>
    ${blocksHTML}
</body>
</html>
  `;
}

// Choisir la méthode d'export
if (process.argv[2] === '--simple') {
  simpleExport();
} else {
  exportAndCheckStyles().catch(err => {
    console.error('Erreur fatale:', err);
    // Fallback sur export simple
    console.log('\n🔄 Tentative d\'export simple...');
    simpleExport();
  });
}
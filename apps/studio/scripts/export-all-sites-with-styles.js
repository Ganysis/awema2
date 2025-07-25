const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');
const prisma = new PrismaClient();

async function exportAllSites() {
  try {
    console.log('\n🎨 EXPORT DE TOUS LES SITES AVEC STYLES\n');

    const exportDir = path.join(__dirname, '../exports-test');
    await fs.mkdir(exportDir, { recursive: true });

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
    const results = [];

    for (const project of projects) {
      console.log(`🔄 Export de ${project.client.companyName}...`);
      
      const projectData = JSON.parse(project.data || '{}');
      const pages = projectData.pages || [];
      const homePage = pages.find(p => p.isHomePage) || pages[0];
      
      if (!homePage) {
        console.log('❌ Pas de page trouvée');
        continue;
      }

      // Extraire le business type
      const tags = JSON.parse(project.client.tags || '{}');
      const businessType = tags.businessType || 'plombier';
      
      // Générer un HTML enrichi
      const html = generateEnhancedHTML(homePage, project.client.companyName, businessType);
      
      const projectDir = path.join(exportDir, project.slug);
      await fs.mkdir(projectDir, { recursive: true });
      await fs.writeFile(path.join(projectDir, 'index.html'), html);
      
      // Analyser le HTML
      const analysis = analyzeHTML(html);
      
      results.push({
        name: project.client.companyName,
        slug: project.slug,
        businessType: businessType,
        path: projectDir,
        analysis: analysis
      });
      
      console.log(`✅ Exporté : exports-test/${project.slug}/index.html`);
      console.log(`📊 ${analysis.summary}`);
    }

    // Créer la page d'index
    await createMasterIndex(exportDir, results);
    
    console.log('\n\n✅ EXPORT TERMINÉ AVEC SUCCÈS !');
    console.log('═══════════════════════════════════════');
    console.log('\n📁 Tous les sites sont dans : apps/studio/exports-test/');
    console.log('\n🔗 LIENS DIRECTS :');
    
    results.forEach(result => {
      console.log(`\n${result.name} (${result.businessType}) :`);
      console.log(`📄 file://${path.resolve(result.path)}/index.html`);
    });
    
    console.log('\n\n🏠 PAGE D\'INDEX PRINCIPALE :');
    console.log(`📄 file://${path.resolve(exportDir)}/index.html`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function generateEnhancedHTML(page, companyName, businessType) {
  const blocks = page.blocks || [];
  
  // Couleurs par métier
  const themeColors = {
    plombier: { primary: '#3B82F6', secondary: '#EBF5FF', text: '#1E40AF' },
    electricien: { primary: '#F59E0B', secondary: '#FEF3C7', text: '#B45309' },
    menuisier: { primary: '#92400E', secondary: '#FEF5E7', text: '#78350F' },
    peintre: { primary: '#7C3AED', secondary: '#F3E8FF', text: '#6D28D9' },
    macon: { primary: '#6B7280', secondary: '#F5F5F5', text: '#374151' }
  };
  
  const theme = themeColors[businessType] || themeColors.plombier;
  
  const blocksHTML = blocks.map((block, index) => {
    let blockHTML = '';
    let blockStyle = '';
    
    // Appliquer le style si présent
    if (block.style) {
      const styleEntries = [];
      
      if (block.style.backgroundColor) {
        styleEntries.push(`background-color: ${block.style.backgroundColor}`);
      }
      
      if (block.style.backgroundGradient) {
        styleEntries.push(`background: ${block.style.backgroundGradient}`);
      }
      
      if (styleEntries.length > 0) {
        blockStyle = ` style="${styleEntries.join('; ')}; padding: 4rem 0;"`;
      }
    }
    
    // Ignorer Header et Footer pour les styles
    if (['header-v3-perfect', 'footer-v3-perfect'].includes(block.type)) {
      blockStyle = '';
    }
    
    blockHTML = `
    <section class="block ${block.type}" id="block-${index}"${blockStyle}>
      <div class="container">`;
    
    // Contenu spécifique par type de bloc
    switch(block.type) {
      case 'hero-v3-perfect':
        blockHTML += `
        <div class="hero-content">
          <h1>${block.props?.title || companyName}</h1>
          <p class="hero-subtitle">${block.props?.subtitle || 'Votre expert de confiance'}</p>
          ${block.props?.primaryButton ? `<a href="${block.props.primaryButton.href}" class="btn btn-primary">${block.props.primaryButton.text}</a>` : ''}
        </div>`;
        break;
        
      case 'services-v3-perfect':
        blockHTML += `
        <h2>${block.props?.title || 'Nos Services'}</h2>
        <p class="section-subtitle">${block.props?.subtitle || ''}</p>
        <div class="services-grid">`;
        
        for (let i = 1; i <= 6; i++) {
          const serviceName = block.props?.[`service${i}_name`];
          if (serviceName) {
            blockHTML += `
            <div class="service-card">
              <div class="service-icon">${block.props[`service${i}_icon`] || '🔧'}</div>
              <h3>${serviceName}</h3>
              <p>${block.props[`service${i}_description`] || 'Description du service'}</p>
            </div>`;
          }
        }
        blockHTML += '</div>';
        break;
        
      case 'cta-v3-perfect':
        blockHTML += `
        <div class="cta-content">
          <h2>${block.props?.title || 'Contactez-nous'}</h2>
          <p>${block.props?.subtitle || 'Nous sommes à votre service'}</p>
          ${block.props?.primaryButton ? `<a href="${block.props.primaryButton.href}" class="btn btn-cta">${block.props.primaryButton.text}</a>` : ''}
        </div>`;
        break;
        
      default:
        blockHTML += `
        <h2>${block.props?.title || block.type}</h2>
        <p>${block.props?.subtitle || block.props?.description || ''}</p>`;
    }
    
    blockHTML += `
      </div>
    </section>`;
    
    return blockHTML;
  }).join('\n');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Professionnel</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .block {
            position: relative;
            overflow: hidden;
        }
        
        h1, h2, h3 {
            color: ${theme.text};
            margin-bottom: 1rem;
        }
        
        h1 {
            font-size: 3rem;
            line-height: 1.2;
        }
        
        h2 {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        h3 {
            font-size: 1.5rem;
        }
        
        p {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 1rem;
        }
        
        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            margin-bottom: 3rem;
        }
        
        /* Hero */
        .hero-content {
            text-align: center;
            padding: 4rem 0;
        }
        
        .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }
        
        /* Services */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .service-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        
        .service-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        /* CTA */
        .cta-content {
            text-align: center;
            padding: 2rem 0;
        }
        
        .cta-content h2, .cta-content p {
            color: white !important;
        }
        
        /* Buttons */
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s;
            margin-top: 1rem;
        }
        
        .btn-primary {
            background: ${theme.primary};
            color: white;
        }
        
        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        
        .btn-cta {
            background: white;
            color: ${theme.primary};
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .btn-cta:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        
        /* Header/Footer */
        .header-v3-perfect {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .footer-v3-perfect {
            background: #1f2937;
            color: white;
            padding: 3rem 0 2rem;
            margin-top: 4rem;
        }
        
        .footer-v3-perfect h2, .footer-v3-perfect p {
            color: white;
        }
    </style>
</head>
<body>
    ${blocksHTML}
</body>
</html>
  `;
}

function analyzeHTML(html) {
  const backgrounds = html.match(/background-color:\s*[^;]+/g) || [];
  const gradients = html.match(/background:\s*linear-gradient[^;]+/g) || [];
  const sections = html.match(/<section/g) || [];
  
  return {
    totalSections: sections.length,
    backgroundColors: backgrounds.length,
    gradients: gradients.length,
    summary: `${sections.length} sections, ${backgrounds.length} fonds colorés, ${gradients.length} gradients`
  };
}

async function createMasterIndex(exportDir, results) {
  const indexHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎨 Sites avec Styles Personnalisés</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 2rem;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
        }
        .card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .card-header {
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .card-header.plombier {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
        }
        .card-header.electricien {
            background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        }
        .card-header.menuisier {
            background: linear-gradient(135deg, #92400E 0%, #78350F 100%);
        }
        .card-header.peintre {
            background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
        }
        .card-header.macon {
            background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
        }
        .card h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
        }
        .card-type {
            opacity: 0.9;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .card-body {
            padding: 2rem;
        }
        .stats {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            line-height: 1.8;
        }
        .stats strong {
            color: #333;
        }
        .links {
            display: flex;
            gap: 1rem;
        }
        .btn {
            flex: 1;
            padding: 0.75rem 1.5rem;
            text-align: center;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn-view {
            background: #3b82f6;
            color: white;
        }
        .btn-view:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }
        .iframe-section {
            margin-top: 4rem;
        }
        .iframe-grid {
            display: grid;
            gap: 2rem;
        }
        .iframe-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .iframe-header {
            padding: 1rem 1.5rem;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            font-weight: 600;
        }
        iframe {
            width: 100%;
            height: 800px;
            border: none;
        }
        .legend {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            margin-bottom: 3rem;
            text-align: center;
        }
        .legend h3 {
            margin-bottom: 1rem;
        }
        .legend-items {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .color-box {
            width: 24px;
            height: 24px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Sites Artisans avec Styles Personnalisés</h1>
        
        <div class="legend">
            <h3>Thèmes par métier</h3>
            <div class="legend-items">
                <div class="legend-item">
                    <div class="color-box" style="background: #3B82F6"></div>
                    <span>Plombier</span>
                </div>
                <div class="legend-item">
                    <div class="color-box" style="background: #F59E0B"></div>
                    <span>Électricien</span>
                </div>
                <div class="legend-item">
                    <div class="color-box" style="background: #92400E"></div>
                    <span>Menuisier</span>
                </div>
                <div class="legend-item">
                    <div class="color-box" style="background: #7C3AED"></div>
                    <span>Peintre</span>
                </div>
                <div class="legend-item">
                    <div class="color-box" style="background: #6B7280"></div>
                    <span>Maçon</span>
                </div>
            </div>
        </div>
        
        <div class="grid">
            ${results.map(result => `
            <div class="card">
                <div class="card-header ${result.businessType}">
                    <h2>${result.name}</h2>
                    <div class="card-type">${result.businessType}</div>
                </div>
                <div class="card-body">
                    <div class="stats">
                        <strong>📊 Analyse du rendu :</strong><br>
                        • ${result.analysis.totalSections} sections<br>
                        • ${result.analysis.backgroundColors} fonds colorés<br>
                        • ${result.analysis.gradients} gradients<br>
                        ✅ Styles appliqués avec succès
                    </div>
                    <div class="links">
                        <a href="${result.slug}/index.html" class="btn btn-view" target="_blank">
                            Voir le site →
                        </a>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="iframe-section">
            <h2 style="text-align: center; margin-bottom: 2rem;">👁️ Aperçu en direct</h2>
            <div class="iframe-grid">
                ${results.map(result => `
                <div class="iframe-card">
                    <div class="iframe-header">${result.name} - ${result.businessType}</div>
                    <iframe src="${result.slug}/index.html"></iframe>
                </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>
  `;
  
  await fs.writeFile(path.join(exportDir, 'index.html'), indexHTML);
}

exportAllSites();
const fs = require('fs').promises;
const path = require('path');

// URLs réelles des sites Netlify (à remplacer par vos URLs après déploiement)
const DEPLOYED_SITES = [
  {
    name: 'Plomberie Express Paris',
    businessType: 'plombier',
    url: 'https://plomberie-express-paris.netlify.app', // Remplacer par l'URL réelle
    expectedFeatures: {
      colors: ['#EBF5FF', '#F0F9FF', '#DBEAFE'],
      gradients: ['linear-gradient'],
      keywords: ['plombier', 'Paris', 'débouchage', 'fuite']
    }
  },
  {
    name: 'Élec Pro Lyon',
    businessType: 'electricien',
    url: 'https://elec-pro-lyon.netlify.app', // Remplacer par l'URL réelle
    expectedFeatures: {
      colors: ['#FFFBEB', '#FEF3C7'],
      gradients: ['linear-gradient'],
      keywords: ['électricien', 'Lyon', 'mise aux normes', 'dépannage']
    }
  },
  {
    name: 'L\'Atelier du Bois',
    businessType: 'menuisier',
    url: 'https://atelier-du-bois.netlify.app', // Remplacer par l'URL réelle
    expectedFeatures: {
      colors: ['#FEF5E7', '#FAEBD7'],
      gradients: ['linear-gradient'],
      keywords: ['menuisier', 'parquet', 'sur mesure']
    }
  },
  {
    name: 'Couleurs Méditerranée',
    businessType: 'peintre',
    url: 'https://couleurs-mediterranee.netlify.app', // Remplacer par l'URL réelle
    expectedFeatures: {
      colors: ['#FAF5FF', '#F3E8FF'],
      gradients: ['linear-gradient'],
      keywords: ['peintre', 'peinture', 'décoration']
    }
  },
  {
    name: 'Bâti Sud Construction',
    businessType: 'macon',
    url: 'https://bati-sud-construction.netlify.app', // Remplacer par l'URL réelle
    expectedFeatures: {
      colors: ['#F5F5F5', '#EEEEEE'],
      gradients: ['linear-gradient'],
      keywords: ['maçon', 'construction', 'rénovation']
    }
  }
];

async function analyzeRealSites() {
  console.log('\n🔍 ANALYSE RÉELLE DES SITES NETLIFY\n');
  console.log('⚠️  Assurez-vous d\'avoir déployé les sites et mis à jour les URLs dans ce script\n');

  const results = [];
  
  for (const site of DEPLOYED_SITES) {
    console.log(`\n📊 Analyse de ${site.name} (${site.businessType})`);
    console.log(`🔗 URL : ${site.url}`);
    
    try {
      // 1. Vérifier si le site est accessible
      const response = await fetch(site.url);
      const html = await response.text();
      
      if (response.status !== 200) {
        console.log(`❌ Site non accessible (HTTP ${response.status})`);
        console.log(`   → Vérifiez que le site est bien déployé sur cette URL`);
        continue;
      }
      
      console.log(`✅ Site accessible (HTTP ${response.status})`);
      
      // 2. Analyser le contenu HTML
      const analysis = {
        performance: await analyzePerformance(site.url, html),
        styles: analyzeStyles(html, site.expectedFeatures),
        content: analyzeContent(html, site),
        seo: analyzeSEO(html, site),
        accessibility: analyzeAccessibility(html),
        mobile: analyzeMobile(html)
      };
      
      // 3. Afficher les résultats
      displayAnalysisResults(site, analysis);
      
      // 4. Sauvegarder pour le rapport
      results.push({
        site: site.name,
        url: site.url,
        analysis: analysis,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error(`❌ Erreur d'analyse : ${error.message}`);
      console.log(`   → Vérifiez que l'URL est correcte et accessible`);
    }
  }
  
  // Générer un rapport complet
  await generateReport(results);
}

function analyzeStyles(html, expectedFeatures) {
  const analysis = {
    hasBackgroundColors: false,
    hasGradients: false,
    foundColors: [],
    foundGradients: [],
    alternatingBackgrounds: false,
    score: 0
  };
  
  // Chercher les couleurs de fond
  const colorMatches = html.match(/background-color:\s*([^;]+)/g) || [];
  analysis.hasBackgroundColors = colorMatches.length > 0;
  analysis.foundColors = colorMatches.map(match => match.split(':')[1].trim());
  
  // Chercher les gradients
  const gradientMatches = html.match(/background:\s*(linear-gradient[^;]+)/g) || [];
  analysis.hasGradients = gradientMatches.length > 0;
  analysis.foundGradients = gradientMatches.map(match => match.split(':')[1].trim());
  
  // Vérifier l'alternance
  analysis.alternatingBackgrounds = analysis.foundColors.length >= 3;
  
  // Calculer le score
  if (analysis.hasBackgroundColors) analysis.score += 30;
  if (analysis.hasGradients) analysis.score += 30;
  if (analysis.alternatingBackgrounds) analysis.score += 40;
  
  return analysis;
}

function analyzeContent(html, site) {
  const analysis = {
    hasPersonalizedContent: false,
    hasBusinessKeywords: false,
    hasCityMentions: false,
    hasServiceDescriptions: false,
    contentQuality: 0
  };
  
  // Vérifier la personnalisation
  analysis.hasPersonalizedContent = html.includes(site.name);
  
  // Vérifier les mots-clés métier
  const businessKeywords = site.expectedFeatures.keywords;
  const foundKeywords = businessKeywords.filter(keyword => 
    html.toLowerCase().includes(keyword.toLowerCase())
  );
  analysis.hasBusinessKeywords = foundKeywords.length > 0;
  analysis.foundKeywords = foundKeywords;
  
  // Vérifier les mentions de ville
  const cityPattern = /(Paris|Lyon|Marseille|Toulouse|Nice)/gi;
  const cityMatches = html.match(cityPattern) || [];
  analysis.hasCityMentions = cityMatches.length > 0;
  analysis.cityCount = cityMatches.length;
  
  // Vérifier les descriptions de services
  analysis.hasServiceDescriptions = html.includes('description') && html.length > 5000;
  
  // Score de qualité
  if (analysis.hasPersonalizedContent) analysis.contentQuality += 25;
  if (analysis.hasBusinessKeywords) analysis.contentQuality += 25;
  if (analysis.hasCityMentions) analysis.contentQuality += 25;
  if (analysis.hasServiceDescriptions) analysis.contentQuality += 25;
  
  return analysis;
}

function analyzeSEO(html, site) {
  const analysis = {
    hasTitle: false,
    hasMetaDescription: false,
    hasH1: false,
    hasStructuredData: false,
    hasCanonical: false,
    seoScore: 0
  };
  
  // Titre
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  analysis.hasTitle = !!titleMatch;
  analysis.title = titleMatch ? titleMatch[1] : '';
  
  // Meta description
  analysis.hasMetaDescription = html.includes('<meta name="description"');
  
  // H1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  analysis.hasH1 = !!h1Match;
  analysis.h1Text = h1Match ? h1Match[1] : '';
  
  // Structured data
  analysis.hasStructuredData = html.includes('application/ld+json');
  
  // Canonical
  analysis.hasCanonical = html.includes('rel="canonical"');
  
  // Score SEO
  if (analysis.hasTitle) analysis.seoScore += 20;
  if (analysis.hasMetaDescription) analysis.seoScore += 20;
  if (analysis.hasH1) analysis.seoScore += 20;
  if (analysis.hasStructuredData) analysis.seoScore += 20;
  if (analysis.hasCanonical) analysis.seoScore += 20;
  
  return analysis;
}

function analyzeAccessibility(html) {
  const analysis = {
    hasAltTexts: false,
    hasAriaLabels: false,
    hasLangAttribute: false,
    hasSkipLink: false,
    accessibilityScore: 0
  };
  
  // Alt texts
  const imgCount = (html.match(/<img/g) || []).length;
  const altCount = (html.match(/alt="/g) || []).length;
  analysis.hasAltTexts = imgCount > 0 && altCount >= imgCount * 0.8;
  
  // ARIA labels
  analysis.hasAriaLabels = html.includes('aria-label');
  
  // Lang attribute
  analysis.hasLangAttribute = html.includes('lang="fr"');
  
  // Skip link
  analysis.hasSkipLink = html.includes('skip') && html.includes('#main');
  
  // Score
  if (analysis.hasAltTexts) analysis.accessibilityScore += 30;
  if (analysis.hasAriaLabels) analysis.accessibilityScore += 20;
  if (analysis.hasLangAttribute) analysis.accessibilityScore += 30;
  if (analysis.hasSkipLink) analysis.accessibilityScore += 20;
  
  return analysis;
}

function analyzeMobile(html) {
  const analysis = {
    hasViewport: false,
    hasResponsiveImages: false,
    hasMobileMenu: false,
    mobileScore: 0
  };
  
  // Viewport
  analysis.hasViewport = html.includes('viewport');
  
  // Responsive images
  analysis.hasResponsiveImages = html.includes('srcset') || html.includes('picture');
  
  // Mobile menu
  analysis.hasMobileMenu = html.includes('mobile-menu') || html.includes('burger');
  
  // Score
  if (analysis.hasViewport) analysis.mobileScore += 40;
  if (analysis.hasResponsiveImages) analysis.mobileScore += 30;
  if (analysis.hasMobileMenu) analysis.mobileScore += 30;
  
  return analysis;
}

async function analyzePerformance(url, html) {
  const analysis = {
    htmlSize: html.length,
    loadTime: 0,
    hasMinification: false,
    hasCompression: false,
    performanceScore: 0
  };
  
  // Taille du HTML
  analysis.htmlSizeKB = Math.round(html.length / 1024);
  
  // Vérifier la minification
  analysis.hasMinification = !html.includes('  ') && !html.includes('\n\n');
  
  // Score de performance basique
  if (analysis.htmlSizeKB < 100) analysis.performanceScore += 30;
  else if (analysis.htmlSizeKB < 200) analysis.performanceScore += 20;
  else analysis.performanceScore += 10;
  
  if (analysis.hasMinification) analysis.performanceScore += 30;
  
  // Estimation du temps de chargement
  analysis.estimatedLoadTime = analysis.htmlSizeKB * 10; // ms approximatif
  
  return analysis;
}

function displayAnalysisResults(site, analysis) {
  console.log('\n📈 Résultats de l\'analyse :');
  
  // Styles
  console.log('\n🎨 Styles et design :');
  console.log(`   • Fonds colorés : ${analysis.styles.hasBackgroundColors ? '✅' : '❌'} (${analysis.styles.foundColors.length} trouvés)`);
  console.log(`   • Gradients : ${analysis.styles.hasGradients ? '✅' : '❌'} (${analysis.styles.foundGradients.length} trouvés)`);
  console.log(`   • Alternance : ${analysis.styles.alternatingBackgrounds ? '✅' : '❌'}`);
  console.log(`   • Score : ${analysis.styles.score}/100`);
  
  // Contenu
  console.log('\n✍️ Contenu :');
  console.log(`   • Personnalisé : ${analysis.content.hasPersonalizedContent ? '✅' : '❌'}`);
  console.log(`   • Mots-clés métier : ${analysis.content.hasBusinessKeywords ? '✅' : '❌'} (${analysis.content.foundKeywords?.join(', ') || 'aucun'})`);
  console.log(`   • Mentions ville : ${analysis.content.hasCityMentions ? '✅' : '❌'} (${analysis.content.cityCount || 0} fois)`);
  console.log(`   • Score : ${analysis.content.contentQuality}/100`);
  
  // SEO
  console.log('\n🔍 SEO :');
  console.log(`   • Title : ${analysis.seo.hasTitle ? '✅' : '❌'} "${analysis.seo.title || ''}"`);
  console.log(`   • Meta desc : ${analysis.seo.hasMetaDescription ? '✅' : '❌'}`);
  console.log(`   • H1 : ${analysis.seo.hasH1 ? '✅' : '❌'} "${analysis.seo.h1Text || ''}"`);
  console.log(`   • Score : ${analysis.seo.seoScore}/100`);
  
  // Performance
  console.log('\n🚀 Performance :');
  console.log(`   • Taille HTML : ${analysis.performance.htmlSizeKB} KB`);
  console.log(`   • Minifié : ${analysis.performance.hasMinification ? '✅' : '❌'}`);
  console.log(`   • Score : ${analysis.performance.performanceScore}/100`);
  
  // Score global
  const totalScore = Math.round(
    (analysis.styles.score + 
     analysis.content.contentQuality + 
     analysis.seo.seoScore + 
     analysis.performance.performanceScore) / 4
  );
  
  console.log(`\n🏆 Score global : ${totalScore}/100`);
}

async function generateReport(results) {
  const reportPath = path.join(__dirname, '../netlify-analysis-report.json');
  const htmlReportPath = path.join(__dirname, '../netlify-analysis-report.html');
  
  // Rapport JSON
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
  
  // Rapport HTML
  const htmlReport = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport d'analyse Netlify</title>
    <style>
        body { font-family: sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        .site { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .score { font-size: 2em; font-weight: bold; }
        .good { color: green; }
        .medium { color: orange; }
        .bad { color: red; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>📊 Rapport d'analyse des sites Netlify</h1>
    <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
    
    ${results.map(r => {
      const totalScore = Math.round(
        (r.analysis.styles.score + 
         r.analysis.content.contentQuality + 
         r.analysis.seo.seoScore + 
         r.analysis.performance.performanceScore) / 4
      );
      const scoreClass = totalScore >= 70 ? 'good' : totalScore >= 50 ? 'medium' : 'bad';
      
      return `
      <div class="site">
        <h2>${r.site}</h2>
        <p>URL : <a href="${r.url}" target="_blank">${r.url}</a></p>
        <p class="score ${scoreClass}">Score global : ${totalScore}/100</p>
        
        <table>
          <tr>
            <th>Catégorie</th>
            <th>Score</th>
            <th>Détails</th>
          </tr>
          <tr>
            <td>🎨 Styles</td>
            <td>${r.analysis.styles.score}/100</td>
            <td>${r.analysis.styles.foundColors.length} couleurs, ${r.analysis.styles.foundGradients.length} gradients</td>
          </tr>
          <tr>
            <td>✍️ Contenu</td>
            <td>${r.analysis.content.contentQuality}/100</td>
            <td>${r.analysis.content.cityCount || 0} mentions ville</td>
          </tr>
          <tr>
            <td>🔍 SEO</td>
            <td>${r.analysis.seo.seoScore}/100</td>
            <td>${r.analysis.seo.hasTitle ? 'Title ✓' : 'Title ✗'}, ${r.analysis.seo.hasH1 ? 'H1 ✓' : 'H1 ✗'}</td>
          </tr>
          <tr>
            <td>🚀 Performance</td>
            <td>${r.analysis.performance.performanceScore}/100</td>
            <td>${r.analysis.performance.htmlSizeKB} KB</td>
          </tr>
        </table>
      </div>
      `;
    }).join('')}
    
    <h2>📋 Recommandations</h2>
    <ul>
      <li>Ajouter des images optimisées en WebP</li>
      <li>Implémenter le lazy loading</li>
      <li>Ajouter Google Analytics</li>
      <li>Intégrer un chat/WhatsApp</li>
      <li>Créer plus de pages locales SEO</li>
    </ul>
</body>
</html>
  `;
  
  await fs.writeFile(htmlReportPath, htmlReport);
  
  console.log('\n\n📄 Rapports générés :');
  console.log(`   • JSON : ${reportPath}`);
  console.log(`   • HTML : ${htmlReportPath}`);
  console.log(`   • Ouvrir : file://${path.resolve(htmlReportPath)}`);
}

// Exécuter l'analyse
analyzeRealSites();
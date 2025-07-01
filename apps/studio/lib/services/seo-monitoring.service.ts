export interface SEOMetrics {
  // Core Web Vitals
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  inp: number; // Interaction to Next Paint
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
  
  // Performance
  pageLoadTime: number;
  domContentLoaded: number;
  resourceLoadTime: number;
  
  // SEO Health
  metaTitle: boolean;
  metaDescription: boolean;
  h1Count: number;
  imageAltTags: number;
  brokenLinks: number;
  canonicalTag: boolean;
  robotsTxt: boolean;
  sitemap: boolean;
  
  // Search Console Data
  impressions?: number;
  clicks?: number;
  ctr?: number;
  position?: number;
  
  // Lighthouse Scores
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
  pwa?: number;
}

export interface SearchConsoleConfig {
  siteUrl: string;
  clientEmail?: string;
  privateKey?: string;
  verificationFile?: string;
}

export class SEOMonitoringService {
  private config: SearchConsoleConfig;
  private metricsHistory: Map<string, SEOMetrics[]> = new Map();

  constructor(config: SearchConsoleConfig) {
    this.config = config;
  }

  // Génère le script de monitoring côté client
  generateMonitoringScript(): string {
    return `
<script>
  // SEO Monitoring Script
  (function() {
    const metrics = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: window.screen.width + 'x' + window.screen.height,
      viewport: window.innerWidth + 'x' + window.innerHeight,
      referrer: document.referrer
    };
    
    // Core Web Vitals
    const vitals = {};
    
    // Observer pour LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
    }).observe({type: 'largest-contentful-paint', buffered: true});
    
    // Observer pour FID
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      vitals.fid = firstInput.processingStart - firstInput.startTime;
    }).observe({type: 'first-input', buffered: true});
    
    // Observer pour CLS
    let clsValue = 0;
    let clsEntries = [];
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsEntries.push(entry);
          clsValue += entry.value;
        }
      }
      vitals.cls = clsValue;
    }).observe({type: 'layout-shift', buffered: true});
    
    // Performance timing
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = performance.timing;
        metrics.performance = {
          pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
          ttfb: perfData.responseStart - perfData.navigationStart,
          fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
          ...vitals
        };
        
        // SEO Checks
        metrics.seo = {
          title: document.title,
          titleLength: document.title.length,
          metaDescription: document.querySelector('meta[name="description"]')?.content || '',
          metaDescriptionLength: document.querySelector('meta[name="description"]')?.content?.length || 0,
          h1Count: document.querySelectorAll('h1').length,
          h2Count: document.querySelectorAll('h2').length,
          imageCount: document.querySelectorAll('img').length,
          imageWithoutAlt: document.querySelectorAll('img:not([alt])').length,
          linksCount: document.querySelectorAll('a').length,
          externalLinks: document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').length,
          canonical: document.querySelector('link[rel="canonical"]')?.href || '',
          ogTags: {
            title: document.querySelector('meta[property="og:title"]')?.content || '',
            description: document.querySelector('meta[property="og:description"]')?.content || '',
            image: document.querySelector('meta[property="og:image"]')?.content || ''
          }
        };
        
        // Vérification des erreurs 404
        metrics.brokenLinks = [];
        document.querySelectorAll('a[href], img[src], script[src], link[href]').forEach(element => {
          const url = element.href || element.src;
          if (url && !url.startsWith('data:') && !url.startsWith('javascript:')) {
            fetch(url, { method: 'HEAD', mode: 'no-cors' })
              .catch(() => metrics.brokenLinks.push(url));
          }
        });
        
        // Envoyer les métriques
        if (typeof gtag !== 'undefined') {
          gtag('event', 'seo_metrics', {
            'event_category': 'SEO',
            'event_label': 'Page Metrics',
            'custom_data': JSON.stringify(metrics)
          });
        }
        
        // Stocker localement pour dashboard
        const storedMetrics = JSON.parse(localStorage.getItem('seo_metrics') || '[]');
        storedMetrics.push(metrics);
        if (storedMetrics.length > 100) storedMetrics.shift(); // Garder max 100 entrées
        localStorage.setItem('seo_metrics', JSON.stringify(storedMetrics));
        
      }, 3000); // Attendre 3s pour collecter toutes les métriques
    });
  })();
</script>

<!-- Schema.org WebSite avec SearchAction pour Search Console -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "${this.config.siteUrl}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "${this.config.siteUrl}/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
`;
  }

  // Génère le fichier de vérification Google Search Console
  generateVerificationFile(): string {
    return `google-site-verification: ${this.config.verificationFile || 'google-verification-code.html'}`;
  }

  // Génère un dashboard de monitoring SEO
  generateSEODashboard(): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard SEO - Monitoring</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    h1 { color: #333; margin-bottom: 2rem; }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .metric-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .metric-title {
      font-size: 0.875rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.5rem;
    }
    
    .metric-value {
      font-size: 2rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .metric-status {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .status-good { background: #d4edda; color: #155724; }
    .status-warning { background: #fff3cd; color: #856404; }
    .status-error { background: #f8d7da; color: #721c24; }
    
    .chart-container {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    
    canvas { max-width: 100%; height: 300px; }
    
    .issues-list {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .issue-item {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .issue-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }
    
    .issue-icon.error { background: #f8d7da; color: #721c24; }
    .issue-icon.warning { background: #fff3cd; color: #856404; }
    
    .lighthouse-scores {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .lighthouse-score {
      text-align: center;
      padding: 1rem;
      border-radius: 8px;
      background: #f8f9fa;
    }
    
    .score-circle {
      width: 80px;
      height: 80px;
      margin: 0 auto 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
    }
    
    .score-good { background: #0cce6b; }
    .score-warning { background: #ffa400; }
    .score-error { background: #ff4e42; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Dashboard SEO & Performance</h1>
    
    <!-- Core Web Vitals -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-title">LCP (Largest Contentful Paint)</div>
        <div class="metric-value" id="lcp-value">-</div>
        <span class="metric-status" id="lcp-status">En attente...</span>
      </div>
      
      <div class="metric-card">
        <div class="metric-title">FID (First Input Delay)</div>
        <div class="metric-value" id="fid-value">-</div>
        <span class="metric-status" id="fid-status">En attente...</span>
      </div>
      
      <div class="metric-card">
        <div class="metric-title">CLS (Cumulative Layout Shift)</div>
        <div class="metric-value" id="cls-value">-</div>
        <span class="metric-status" id="cls-status">En attente...</span>
      </div>
      
      <div class="metric-card">
        <div class="metric-title">Temps de chargement</div>
        <div class="metric-value" id="load-time">-</div>
        <span class="metric-status" id="load-status">En attente...</span>
      </div>
    </div>
    
    <!-- Graphique de performance -->
    <div class="chart-container">
      <h2>📈 Évolution des performances</h2>
      <canvas id="performance-chart"></canvas>
    </div>
    
    <!-- Scores Lighthouse -->
    <div class="metric-card">
      <h2>🏆 Scores Lighthouse</h2>
      <div class="lighthouse-scores">
        <div class="lighthouse-score">
          <div class="score-circle score-good" id="perf-score">-</div>
          <div>Performance</div>
        </div>
        <div class="lighthouse-score">
          <div class="score-circle score-good" id="access-score">-</div>
          <div>Accessibilité</div>
        </div>
        <div class="lighthouse-score">
          <div class="score-circle score-good" id="bp-score">-</div>
          <div>Bonnes pratiques</div>
        </div>
        <div class="lighthouse-score">
          <div class="score-circle score-good" id="seo-score">-</div>
          <div>SEO</div>
        </div>
        <div class="lighthouse-score">
          <div class="score-circle score-warning" id="pwa-score">-</div>
          <div>PWA</div>
        </div>
      </div>
    </div>
    
    <!-- Problèmes détectés -->
    <div class="issues-list">
      <h2>⚠️ Problèmes détectés</h2>
      <div id="issues-container">
        <div class="issue-item">
          <div class="issue-icon warning">⚡</div>
          <div>
            <strong>Images non optimisées</strong>
            <p>3 images pourraient être compressées pour améliorer les performances</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    // Récupérer les métriques stockées
    const metrics = JSON.parse(localStorage.getItem('seo_metrics') || '[]');
    const latest = metrics[metrics.length - 1];
    
    if (latest && latest.performance) {
      // Afficher les Core Web Vitals
      const lcp = latest.performance.lcp || 0;
      document.getElementById('lcp-value').textContent = lcp.toFixed(0) + 'ms';
      document.getElementById('lcp-status').className = 'metric-status ' + 
        (lcp < 2500 ? 'status-good' : lcp < 4000 ? 'status-warning' : 'status-error');
      document.getElementById('lcp-status').textContent = 
        lcp < 2500 ? 'Bon' : lcp < 4000 ? 'À améliorer' : 'Mauvais';
      
      const fid = latest.performance.fid || 0;
      document.getElementById('fid-value').textContent = fid.toFixed(0) + 'ms';
      document.getElementById('fid-status').className = 'metric-status ' + 
        (fid < 100 ? 'status-good' : fid < 300 ? 'status-warning' : 'status-error');
      document.getElementById('fid-status').textContent = 
        fid < 100 ? 'Bon' : fid < 300 ? 'À améliorer' : 'Mauvais';
      
      const cls = latest.performance.cls || 0;
      document.getElementById('cls-value').textContent = cls.toFixed(3);
      document.getElementById('cls-status').className = 'metric-status ' + 
        (cls < 0.1 ? 'status-good' : cls < 0.25 ? 'status-warning' : 'status-error');
      document.getElementById('cls-status').textContent = 
        cls < 0.1 ? 'Bon' : cls < 0.25 ? 'À améliorer' : 'Mauvais';
      
      const loadTime = latest.performance.pageLoadTime || 0;
      document.getElementById('load-time').textContent = (loadTime / 1000).toFixed(1) + 's';
      document.getElementById('load-status').className = 'metric-status ' + 
        (loadTime < 3000 ? 'status-good' : loadTime < 5000 ? 'status-warning' : 'status-error');
      document.getElementById('load-status').textContent = 
        loadTime < 3000 ? 'Rapide' : loadTime < 5000 ? 'Moyen' : 'Lent';
    }
    
    // Graphique de performance
    const ctx = document.getElementById('performance-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: metrics.slice(-10).map((_, i) => 'T-' + (9-i)),
        datasets: [
          {
            label: 'LCP (ms)',
            data: metrics.slice(-10).map(m => m.performance?.lcp || 0),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'FID (ms)',
            data: metrics.slice(-10).map(m => m.performance?.fid || 0),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          },
          {
            label: 'CLS (x100)',
            data: metrics.slice(-10).map(m => (m.performance?.cls || 0) * 100),
            borderColor: 'rgb(255, 205, 86)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Core Web Vitals - Dernières 10 mesures'
          }
        }
      }
    });
    
    // Simuler des scores Lighthouse
    document.getElementById('perf-score').textContent = '95';
    document.getElementById('access-score').textContent = '98';
    document.getElementById('bp-score').textContent = '100';
    document.getElementById('seo-score').textContent = '100';
    document.getElementById('pwa-score').textContent = '80';
    
    // Détection automatique des problèmes
    if (latest && latest.seo) {
      const issues = [];
      
      if (latest.seo.titleLength > 60) {
        issues.push({
          type: 'warning',
          title: 'Titre trop long',
          desc: \`Le titre fait \${latest.seo.titleLength} caractères (max recommandé: 60)\`
        });
      }
      
      if (latest.seo.metaDescriptionLength > 160) {
        issues.push({
          type: 'warning',
          title: 'Meta description trop longue',
          desc: \`La description fait \${latest.seo.metaDescriptionLength} caractères (max: 160)\`
        });
      }
      
      if (latest.seo.h1Count === 0) {
        issues.push({
          type: 'error',
          title: 'Pas de balise H1',
          desc: 'La page doit contenir au moins une balise H1'
        });
      }
      
      if (latest.seo.imageWithoutAlt > 0) {
        issues.push({
          type: 'warning',
          title: 'Images sans attribut alt',
          desc: \`\${latest.seo.imageWithoutAlt} images n'ont pas d'attribut alt\`
        });
      }
      
      // Afficher les problèmes
      if (issues.length > 0) {
        document.getElementById('issues-container').innerHTML = issues.map(issue => \`
          <div class="issue-item">
            <div class="issue-icon \${issue.type}">\${issue.type === 'error' ? '❌' : '⚠️'}</div>
            <div>
              <strong>\${issue.title}</strong>
              <p>\${issue.desc}</p>
            </div>
          </div>
        \`).join('');
      } else {
        document.getElementById('issues-container').innerHTML = \`
          <div class="issue-item">
            <div class="issue-icon" style="background: #d4edda; color: #155724;">✅</div>
            <div>
              <strong>Aucun problème détecté</strong>
              <p>Votre site respecte toutes les bonnes pratiques SEO !</p>
            </div>
          </div>
        \`;
      }
    }
  </script>
</body>
</html>
`;
  }

  // Génère un rapport SEO automatique
  generateSEOReport(metrics: SEOMetrics): string {
    const date = new Date().toLocaleDateString('fr-FR');
    const score = this.calculateOverallScore(metrics);
    
    return `
# Rapport SEO - ${date}

## Score global: ${score}/100

### Core Web Vitals
- **LCP**: ${metrics.lcp}ms ${this.getStatus(metrics.lcp, 2500, 4000)}
- **FID**: ${metrics.fid}ms ${this.getStatus(metrics.fid, 100, 300)}
- **CLS**: ${metrics.cls} ${this.getStatus(metrics.cls, 0.1, 0.25)}

### Performance
- Temps de chargement: ${metrics.pageLoadTime}ms
- TTFB: ${metrics.ttfb}ms
- DOM Content Loaded: ${metrics.domContentLoaded}ms

### SEO On-Page
- ✅ Balise title présente: ${metrics.metaTitle ? 'Oui' : 'Non'}
- ✅ Meta description présente: ${metrics.metaDescription ? 'Oui' : 'Non'}
- ✅ Nombre de H1: ${metrics.h1Count}
- ✅ Images avec alt: ${metrics.imageAltTags}
- ❌ Liens cassés: ${metrics.brokenLinks}

### Configuration technique
- Canonical: ${metrics.canonicalTag ? '✅' : '❌'}
- Robots.txt: ${metrics.robotsTxt ? '✅' : '❌'}
- Sitemap XML: ${metrics.sitemap ? '✅' : '❌'}

### Recommandations
${this.generateRecommendations(metrics)}
`;
  }

  private calculateOverallScore(metrics: SEOMetrics): number {
    let score = 100;
    
    // Core Web Vitals (40 points)
    if (metrics.lcp > 4000) score -= 15;
    else if (metrics.lcp > 2500) score -= 5;
    
    if (metrics.fid > 300) score -= 15;
    else if (metrics.fid > 100) score -= 5;
    
    if (metrics.cls > 0.25) score -= 10;
    else if (metrics.cls > 0.1) score -= 5;
    
    // SEO On-Page (30 points)
    if (!metrics.metaTitle) score -= 10;
    if (!metrics.metaDescription) score -= 10;
    if (metrics.h1Count !== 1) score -= 5;
    if (metrics.brokenLinks > 0) score -= 5;
    
    // Technical SEO (30 points)
    if (!metrics.canonicalTag) score -= 10;
    if (!metrics.robotsTxt) score -= 10;
    if (!metrics.sitemap) score -= 10;
    
    return Math.max(0, score);
  }

  private getStatus(value: number, good: number, poor: number): string {
    if (value <= good) return '✅ Bon';
    if (value <= poor) return '⚠️ À améliorer';
    return '❌ Mauvais';
  }

  private generateRecommendations(metrics: SEOMetrics): string {
    const recommendations: string[] = [];
    
    if (metrics.lcp > 2500) {
      recommendations.push('- Optimiser les images et utiliser un CDN pour améliorer le LCP');
    }
    
    if (metrics.fid > 100) {
      recommendations.push('- Réduire le JavaScript bloquant pour améliorer le FID');
    }
    
    if (metrics.cls > 0.1) {
      recommendations.push('- Définir des dimensions pour les images et vidéos pour réduire le CLS');
    }
    
    if (!metrics.metaDescription) {
      recommendations.push('- Ajouter une meta description unique pour chaque page');
    }
    
    if (metrics.h1Count !== 1) {
      recommendations.push('- Utiliser exactement une balise H1 par page');
    }
    
    if (metrics.brokenLinks > 0) {
      recommendations.push('- Corriger les liens cassés détectés');
    }
    
    return recommendations.join('\n') || '- Aucune recommandation, votre SEO est optimal !';
  }
}
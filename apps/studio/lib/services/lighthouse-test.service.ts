import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export interface LighthouseResults {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  metrics: {
    firstContentfulPaint: number;
    speedIndex: number;
    largestContentfulPaint: number;
    timeToInteractive: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
  };
  opportunities: Array<{
    id: string;
    title: string;
    description: string;
    score: number;
    savings: {
      bytes?: number;
      ms?: number;
    };
  }>;
  diagnostics: Array<{
    id: string;
    title: string;
    description: string;
    score: number;
  }>;
}

export class LighthouseTestService {
  /**
   * Lance un test Lighthouse sur une URL
   */
  async runTest(url: string, options?: {
    device?: 'mobile' | 'desktop';
    throttling?: boolean;
  }): Promise<LighthouseResults> {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    const lighthouseOptions = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
      port: chrome.port,
      formFactor: options?.device || 'mobile',
      throttling: options?.throttling !== false ? {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4
      } : null
    };
    
    try {
      const runnerResult = await lighthouse(url, lighthouseOptions);
      
      if (!runnerResult || !runnerResult.lhr) {
        throw new Error('Lighthouse test failed');
      }
      
      const lhr = runnerResult.lhr;
      
      // Extraire les scores principaux
      const scores = {
        performance: Math.round((lhr.categories.performance?.score || 0) * 100),
        accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((lhr.categories.seo?.score || 0) * 100),
        pwa: Math.round((lhr.categories.pwa?.score || 0) * 100)
      };
      
      // Extraire les métriques de performance
      const metrics = {
        firstContentfulPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
        speedIndex: lhr.audits['speed-index']?.numericValue || 0,
        largestContentfulPaint: lhr.audits['largest-contentful-paint']?.numericValue || 0,
        timeToInteractive: lhr.audits['interactive']?.numericValue || 0,
        totalBlockingTime: lhr.audits['total-blocking-time']?.numericValue || 0,
        cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.numericValue || 0
      };
      
      // Extraire les opportunités d'optimisation
      const opportunities = Object.values(lhr.audits)
        .filter(audit => audit.details?.type === 'opportunity' && audit.score !== null && audit.score < 0.9)
        .map(audit => ({
          id: audit.id,
          title: audit.title,
          description: audit.description || '',
          score: Math.round((audit.score || 0) * 100),
          savings: {
            bytes: audit.details?.overallSavingsBytes,
            ms: audit.details?.overallSavingsMs
          }
        }))
        .sort((a, b) => (b.savings.ms || 0) - (a.savings.ms || 0));
      
      // Extraire les diagnostics
      const diagnostics = Object.values(lhr.audits)
        .filter(audit => audit.details?.type === 'table' && audit.score !== null && audit.score < 0.9)
        .map(audit => ({
          id: audit.id,
          title: audit.title,
          description: audit.description || '',
          score: Math.round((audit.score || 0) * 100)
        }));
      
      await chrome.kill();
      
      return {
        ...scores,
        metrics,
        opportunities,
        diagnostics
      };
    } catch (error) {
      await chrome.kill();
      throw error;
    }
  }
  
  /**
   * Teste plusieurs pages et génère un rapport
   */
  async testMultiplePages(urls: string[], outputPath: string): Promise<{
    summary: {
      avgPerformance: number;
      avgSEO: number;
      avgAccessibility: number;
      passedCoreWebVitals: boolean;
    };
    pages: Map<string, LighthouseResults>;
  }> {
    const results = new Map<string, LighthouseResults>();
    let totalPerformance = 0;
    let totalSEO = 0;
    let totalAccessibility = 0;
    let passedCoreWebVitals = true;
    
    for (const url of urls) {
      console.log(`Testing ${url}...`);
      try {
        const result = await this.runTest(url);
        results.set(url, result);
        
        totalPerformance += result.performance;
        totalSEO += result.seo;
        totalAccessibility += result.accessibility;
        
        // Vérifier Core Web Vitals
        if (result.metrics.largestContentfulPaint > 2500 ||
            result.metrics.cumulativeLayoutShift > 0.1 ||
            result.metrics.totalBlockingTime > 300) {
          passedCoreWebVitals = false;
        }
        
        // Attendre un peu entre les tests
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to test ${url}:`, error);
      }
    }
    
    const summary = {
      avgPerformance: Math.round(totalPerformance / urls.length),
      avgSEO: Math.round(totalSEO / urls.length),
      avgAccessibility: Math.round(totalAccessibility / urls.length),
      passedCoreWebVitals
    };
    
    // Générer le rapport HTML
    const report = this.generateHTMLReport(summary, results);
    await writeFile(join(outputPath, 'lighthouse-report.html'), report);
    
    return { summary, pages: results };
  }
  
  /**
   * Génère un rapport HTML des résultats
   */
  private generateHTMLReport(summary: any, results: Map<string, LighthouseResults>): string {
    const getScoreColor = (score: number) => {
      if (score >= 90) return '#0cce6b';
      if (score >= 50) return '#ffa400';
      return '#ff4e42';
    };
    
    const getScoreEmoji = (score: number) => {
      if (score >= 90) return '🟢';
      if (score >= 50) return '🟡';
      return '🔴';
    };
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport Lighthouse - ${new Date().toLocaleDateString('fr-FR')}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 2rem;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        h1 { font-size: 2rem; margin-bottom: 1rem; }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .metric {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
        }
        .metric-value {
            font-size: 3rem;
            font-weight: bold;
            margin: 0.5rem 0;
        }
        .metric-label {
            color: #666;
            font-size: 0.875rem;
        }
        .page-result {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        .page-url {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #333;
        }
        .scores {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .score {
            text-align: center;
            padding: 1rem;
            border-radius: 8px;
            background: #f8f9fa;
        }
        .score-value {
            font-size: 2rem;
            font-weight: bold;
            display: block;
            margin-bottom: 0.5rem;
        }
        .core-vitals {
            background: #f0f9ff;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .vitals-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .vital {
            background: white;
            padding: 1rem;
            border-radius: 6px;
        }
        .vital-name {
            font-size: 0.875rem;
            color: #666;
            margin-bottom: 0.25rem;
        }
        .vital-value {
            font-size: 1.25rem;
            font-weight: 600;
        }
        .opportunities {
            margin-top: 1.5rem;
        }
        .opportunity {
            background: #fffbeb;
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 0.5rem;
            border-left: 4px solid #fbbf24;
        }
        .success-badge {
            background: #d1fae5;
            color: #065f46;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .warning-badge {
            background: #fed7aa;
            color: #92400e;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Rapport Lighthouse</h1>
            <p>Généré le ${new Date().toLocaleString('fr-FR')}</p>
            
            <div class="summary">
                <div class="metric">
                    <div class="metric-label">Performance moyenne</div>
                    <div class="metric-value" style="color: ${getScoreColor(summary.avgPerformance)}">
                        ${summary.avgPerformance}
                    </div>
                </div>
                <div class="metric">
                    <div class="metric-label">SEO moyen</div>
                    <div class="metric-value" style="color: ${getScoreColor(summary.avgSEO)}">
                        ${summary.avgSEO}
                    </div>
                </div>
                <div class="metric">
                    <div class="metric-label">Accessibilité moyenne</div>
                    <div class="metric-value" style="color: ${getScoreColor(summary.avgAccessibility)}">
                        ${summary.avgAccessibility}
                    </div>
                </div>
                <div class="metric">
                    <div class="metric-label">Core Web Vitals</div>
                    <div class="metric-value">
                        ${summary.passedCoreWebVitals ? 
                          '<span class="success-badge">✅ Réussi</span>' : 
                          '<span class="warning-badge">⚠️ À améliorer</span>'
                        }
                    </div>
                </div>
            </div>
        </div>
        
        ${Array.from(results.entries()).map(([url, result]) => `
            <div class="page-result">
                <div class="page-url">${url}</div>
                
                <div class="scores">
                    <div class="score">
                        <span class="score-value" style="color: ${getScoreColor(result.performance)}">
                            ${getScoreEmoji(result.performance)} ${result.performance}
                        </span>
                        <div>Performance</div>
                    </div>
                    <div class="score">
                        <span class="score-value" style="color: ${getScoreColor(result.seo)}">
                            ${getScoreEmoji(result.seo)} ${result.seo}
                        </span>
                        <div>SEO</div>
                    </div>
                    <div class="score">
                        <span class="score-value" style="color: ${getScoreColor(result.accessibility)}">
                            ${getScoreEmoji(result.accessibility)} ${result.accessibility}
                        </span>
                        <div>Accessibilité</div>
                    </div>
                    <div class="score">
                        <span class="score-value" style="color: ${getScoreColor(result.bestPractices)}">
                            ${getScoreEmoji(result.bestPractices)} ${result.bestPractices}
                        </span>
                        <div>Bonnes pratiques</div>
                    </div>
                </div>
                
                <div class="core-vitals">
                    <h3>Core Web Vitals</h3>
                    <div class="vitals-grid">
                        <div class="vital">
                            <div class="vital-name">LCP (Largest Contentful Paint)</div>
                            <div class="vital-value" style="color: ${result.metrics.largestContentfulPaint <= 2500 ? '#0cce6b' : '#ff4e42'}">
                                ${(result.metrics.largestContentfulPaint / 1000).toFixed(2)}s
                            </div>
                        </div>
                        <div class="vital">
                            <div class="vital-name">TBT (Total Blocking Time)</div>
                            <div class="vital-value" style="color: ${result.metrics.totalBlockingTime <= 300 ? '#0cce6b' : '#ff4e42'}">
                                ${result.metrics.totalBlockingTime}ms
                            </div>
                        </div>
                        <div class="vital">
                            <div class="vital-name">CLS (Cumulative Layout Shift)</div>
                            <div class="vital-value" style="color: ${result.metrics.cumulativeLayoutShift <= 0.1 ? '#0cce6b' : '#ff4e42'}">
                                ${result.metrics.cumulativeLayoutShift.toFixed(3)}
                            </div>
                        </div>
                    </div>
                </div>
                
                ${result.opportunities.length > 0 ? `
                    <div class="opportunities">
                        <h3>Opportunités d'optimisation</h3>
                        ${result.opportunities.slice(0, 5).map(opp => `
                            <div class="opportunity">
                                <strong>${opp.title}</strong>
                                ${opp.savings.ms ? `<span style="float: right">⏱️ ${(opp.savings.ms / 1000).toFixed(2)}s</span>` : ''}
                                <div style="font-size: 0.875rem; color: #666; margin-top: 0.25rem;">
                                    ${opp.description}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
</body>
</html>
    `;
  }
  
  /**
   * Vérifie si un site passe les critères de performance
   */
  validatePerformance(results: LighthouseResults): {
    passed: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    
    // Vérifier les scores minimums
    if (results.performance < 90) {
      issues.push(`Score de performance trop bas: ${results.performance}/100 (minimum requis: 90)`);
    }
    
    if (results.seo < 90) {
      issues.push(`Score SEO trop bas: ${results.seo}/100 (minimum requis: 90)`);
    }
    
    if (results.accessibility < 90) {
      issues.push(`Score d'accessibilité trop bas: ${results.accessibility}/100 (minimum requis: 90)`);
    }
    
    // Vérifier Core Web Vitals
    if (results.metrics.largestContentfulPaint > 2500) {
      issues.push(`LCP trop élevé: ${(results.metrics.largestContentfulPaint / 1000).toFixed(2)}s (maximum: 2.5s)`);
    }
    
    if (results.metrics.totalBlockingTime > 300) {
      issues.push(`TBT trop élevé: ${results.metrics.totalBlockingTime}ms (maximum: 300ms)`);
    }
    
    if (results.metrics.cumulativeLayoutShift > 0.1) {
      issues.push(`CLS trop élevé: ${results.metrics.cumulativeLayoutShift.toFixed(3)} (maximum: 0.1)`);
    }
    
    return {
      passed: issues.length === 0,
      issues
    };
  }
}

export const lighthouseTestService = new LighthouseTestService();
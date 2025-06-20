/**
 * Performance Reporter
 * Generates comprehensive performance reports for AWEMA Phase 1
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { LighthouseResult } from './LighthouseAnalyzer';
import { WebVitalsMetrics, CoreWebVitals, MetricRating } from './CoreWebVitals';

export interface PerformanceReport {
  timestamp: string;
  phase: string;
  sites: SitePerformanceData[];
  summary: PerformanceSummary;
  kpis: Phase1KPIs;
}

export interface SitePerformanceData {
  name: string;
  url: string;
  lighthouse: LighthouseResult;
  bundleSize: BundleMetrics;
  generationTime?: number;
}

export interface BundleMetrics {
  total: number;
  js: number;
  css: number;
  images: number;
  fonts: number;
}

export interface PerformanceSummary {
  totalSites: number;
  averageScores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  averageMetrics: WebVitalsMetrics;
  bundleSizeAverage: number;
  generationTimeAverage: number;
}

export interface Phase1KPIs {
  lighthouseTarget: { achieved: boolean; details: string };
  generationTimeTarget: { achieved: boolean; details: string };
  bundleSizeTarget: { achieved: boolean; details: string };
  overallSuccess: boolean;
}

export class PerformanceReporter {
  private outputDir: string;
  private webVitals: CoreWebVitals;

  constructor(outputDir: string = './performance-reports') {
    this.outputDir = outputDir;
    this.webVitals = new CoreWebVitals();
    
    // Ensure output directory exists
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate comprehensive performance report
   */
  generateReport(sites: SitePerformanceData[]): PerformanceReport {
    const timestamp = new Date().toISOString();
    const summary = this.calculateSummary(sites);
    const kpis = this.evaluatePhase1KPIs(summary, sites);

    const report: PerformanceReport = {
      timestamp,
      phase: 'Phase 1 - POC',
      sites,
      summary,
      kpis
    };

    return report;
  }

  /**
   * Calculate summary statistics
   */
  private calculateSummary(sites: SitePerformanceData[]): PerformanceSummary {
    const totalSites = sites.length;
    
    // Initialize accumulators
    const scores = {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0
    };
    
    const metrics: WebVitalsMetrics = {
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
      inp: 0
    };
    
    let totalBundleSize = 0;
    let totalGenerationTime = 0;
    let generationTimeCount = 0;

    // Accumulate values
    for (const site of sites) {
      scores.performance += site.lighthouse.scores.performance;
      scores.accessibility += site.lighthouse.scores.accessibility;
      scores.bestPractices += site.lighthouse.scores.bestPractices;
      scores.seo += site.lighthouse.scores.seo;

      metrics.lcp += site.lighthouse.metrics.lcp;
      metrics.fid += site.lighthouse.metrics.fid;
      metrics.cls += site.lighthouse.metrics.cls;
      metrics.fcp += site.lighthouse.metrics.fcp;
      metrics.ttfb += site.lighthouse.metrics.ttfb;
      metrics.inp += site.lighthouse.metrics.tti; // Using TTI as proxy for INP

      totalBundleSize += site.bundleSize.total;
      
      if (site.generationTime) {
        totalGenerationTime += site.generationTime;
        generationTimeCount++;
      }
    }

    // Calculate averages
    return {
      totalSites,
      averageScores: {
        performance: Math.round(scores.performance / totalSites),
        accessibility: Math.round(scores.accessibility / totalSites),
        bestPractices: Math.round(scores.bestPractices / totalSites),
        seo: Math.round(scores.seo / totalSites)
      },
      averageMetrics: {
        lcp: metrics.lcp / totalSites,
        fid: metrics.fid / totalSites,
        cls: metrics.cls / totalSites,
        fcp: metrics.fcp / totalSites,
        ttfb: metrics.ttfb / totalSites,
        inp: metrics.inp / totalSites
      },
      bundleSizeAverage: totalBundleSize / totalSites,
      generationTimeAverage: generationTimeCount > 0 ? totalGenerationTime / generationTimeCount : 0
    };
  }

  /**
   * Evaluate Phase 1 KPIs
   */
  private evaluatePhase1KPIs(summary: PerformanceSummary, sites: SitePerformanceData[]): Phase1KPIs {
    // Lighthouse target: 95+ performance, 95+ accessibility, 90+ best practices, 100 SEO
    const lighthouseAchieved = 
      summary.averageScores.performance >= 95 &&
      summary.averageScores.accessibility >= 95 &&
      summary.averageScores.bestPractices >= 90 &&
      summary.averageScores.seo >= 100;

    // Generation time target: < 5 seconds
    const generationTimeAchieved = summary.generationTimeAverage > 0 && 
                                  summary.generationTimeAverage < 5000;

    // Bundle size target: < 100KB
    const bundleSizeAchieved = summary.bundleSizeAverage < 100 * 1024;

    return {
      lighthouseTarget: {
        achieved: lighthouseAchieved,
        details: `Performance: ${summary.averageScores.performance}/95, ` +
                `Accessibility: ${summary.averageScores.accessibility}/95, ` +
                `Best Practices: ${summary.averageScores.bestPractices}/90, ` +
                `SEO: ${summary.averageScores.seo}/100`
      },
      generationTimeTarget: {
        achieved: generationTimeAchieved,
        details: summary.generationTimeAverage > 0 
          ? `Average: ${(summary.generationTimeAverage / 1000).toFixed(2)}s / 5s target`
          : 'No generation time data available'
      },
      bundleSizeTarget: {
        achieved: bundleSizeAchieved,
        details: `Average: ${(summary.bundleSizeAverage / 1024).toFixed(1)}KB / 100KB target`
      },
      overallSuccess: lighthouseAchieved && generationTimeAchieved && bundleSizeAchieved
    };
  }

  /**
   * Save report to file
   */
  saveReport(report: PerformanceReport, format: 'json' | 'html' = 'json'): string {
    const filename = `performance-report-${new Date().toISOString().split('T')[0]}.${format}`;
    const filepath = join(this.outputDir, filename);

    if (format === 'json') {
      writeFileSync(filepath, JSON.stringify(report, null, 2));
    } else if (format === 'html') {
      const html = this.generateHTMLReport(report);
      writeFileSync(filepath, html);
    }

    return filepath;
  }

  /**
   * Generate HTML report
   */
  private generateHTMLReport(report: PerformanceReport): string {
    const { summary, kpis } = report;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWEMA Performance Report - Phase 1</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #1a1a1a;
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }
        .header p {
            margin: 0;
            opacity: 0.8;
        }
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .kpi-card {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .kpi-card h3 {
            margin: 0 0 15px 0;
            color: #444;
        }
        .kpi-status {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .kpi-status.achieved {
            background: #d4edda;
            color: #155724;
        }
        .kpi-status.failed {
            background: #f8d7da;
            color: #721c24;
        }
        .metrics-section {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .metric {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #0066cc;
            margin: 10px 0;
        }
        .metric-label {
            color: #666;
            font-size: 0.9em;
        }
        .sites-table {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow-x: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #444;
        }
        .score-cell {
            font-weight: 600;
        }
        .score-good { color: #28a745; }
        .score-ok { color: #ffc107; }
        .score-bad { color: #dc3545; }
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>AWEMA Performance Report</h1>
        <p>Phase 1 - POC Validation | Generated: ${new Date(report.timestamp).toLocaleString()}</p>
    </div>

    <div class="kpi-grid">
        <div class="kpi-card">
            <h3>🎯 Lighthouse Scores</h3>
            <span class="kpi-status ${kpis.lighthouseTarget.achieved ? 'achieved' : 'failed'}">
                ${kpis.lighthouseTarget.achieved ? '✓ Achieved' : '✗ Not Achieved'}
            </span>
            <p>${kpis.lighthouseTarget.details}</p>
        </div>
        
        <div class="kpi-card">
            <h3>⚡ Generation Time</h3>
            <span class="kpi-status ${kpis.generationTimeTarget.achieved ? 'achieved' : 'failed'}">
                ${kpis.generationTimeTarget.achieved ? '✓ Achieved' : '✗ Not Achieved'}
            </span>
            <p>${kpis.generationTimeTarget.details}</p>
        </div>
        
        <div class="kpi-card">
            <h3>📦 Bundle Size</h3>
            <span class="kpi-status ${kpis.bundleSizeTarget.achieved ? 'achieved' : 'failed'}">
                ${kpis.bundleSizeTarget.achieved ? '✓ Achieved' : '✗ Not Achieved'}
            </span>
            <p>${kpis.bundleSizeTarget.details}</p>
        </div>
    </div>

    <div class="metrics-section">
        <h2>Average Performance Metrics</h2>
        <div class="metrics-grid">
            <div class="metric">
                <div class="metric-label">Performance</div>
                <div class="metric-value">${summary.averageScores.performance}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Accessibility</div>
                <div class="metric-value">${summary.averageScores.accessibility}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Best Practices</div>
                <div class="metric-value">${summary.averageScores.bestPractices}</div>
            </div>
            <div class="metric">
                <div class="metric-label">SEO</div>
                <div class="metric-value">${summary.averageScores.seo}</div>
            </div>
        </div>
    </div>

    <div class="metrics-section">
        <h2>Core Web Vitals (Average)</h2>
        <div class="metrics-grid">
            <div class="metric">
                <div class="metric-label">LCP</div>
                <div class="metric-value">${Math.round(summary.averageMetrics.lcp)}ms</div>
            </div>
            <div class="metric">
                <div class="metric-label">FID</div>
                <div class="metric-value">${Math.round(summary.averageMetrics.fid)}ms</div>
            </div>
            <div class="metric">
                <div class="metric-label">CLS</div>
                <div class="metric-value">${summary.averageMetrics.cls.toFixed(3)}</div>
            </div>
            <div class="metric">
                <div class="metric-label">TTFB</div>
                <div class="metric-value">${Math.round(summary.averageMetrics.ttfb)}ms</div>
            </div>
        </div>
    </div>

    <div class="sites-table">
        <h2>Individual Site Performance</h2>
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Performance</th>
                    <th>Accessibility</th>
                    <th>Best Practices</th>
                    <th>SEO</th>
                    <th>Bundle Size</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${report.sites.map(site => `
                <tr>
                    <td>${site.name}</td>
                    <td class="score-cell ${this.getScoreClass(site.lighthouse.scores.performance, 95)}">${site.lighthouse.scores.performance}</td>
                    <td class="score-cell ${this.getScoreClass(site.lighthouse.scores.accessibility, 95)}">${site.lighthouse.scores.accessibility}</td>
                    <td class="score-cell ${this.getScoreClass(site.lighthouse.scores.bestPractices, 90)}">${site.lighthouse.scores.bestPractices}</td>
                    <td class="score-cell ${this.getScoreClass(site.lighthouse.scores.seo, 100)}">${site.lighthouse.scores.seo}</td>
                    <td>${(site.bundleSize.total / 1024).toFixed(1)}KB</td>
                    <td>${site.lighthouse.passed ? '✅ Pass' : '❌ Fail'}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>Generated by AWEMA Performance Reporter | Phase 1 POC Validation</p>
    </div>
</body>
</html>
    `;
  }

  private getScoreClass(score: number, target: number): string {
    if (score >= target) return 'score-good';
    if (score >= target * 0.9) return 'score-ok';
    return 'score-bad';
  }

  /**
   * Generate markdown report for documentation
   */
  generateMarkdownReport(report: PerformanceReport): string {
    const { summary, kpis } = report;
    
    return `
# AWEMA Performance Report - Phase 1

Generated: ${new Date(report.timestamp).toLocaleString()}

## 🎯 Phase 1 KPIs Status

### Overall Status: ${kpis.overallSuccess ? '✅ SUCCESS' : '❌ FAILED'}

| KPI | Target | Achieved | Details |
|-----|--------|----------|---------|
| Lighthouse Scores | Performance: 95+, Accessibility: 95+, Best Practices: 90+, SEO: 100 | ${kpis.lighthouseTarget.achieved ? '✅' : '❌'} | ${kpis.lighthouseTarget.details} |
| Generation Time | < 5 seconds | ${kpis.generationTimeTarget.achieved ? '✅' : '❌'} | ${kpis.generationTimeTarget.details} |
| Bundle Size | < 100KB | ${kpis.bundleSizeTarget.achieved ? '✅' : '❌'} | ${kpis.bundleSizeTarget.details} |

## 📊 Performance Summary

### Average Lighthouse Scores
- **Performance**: ${summary.averageScores.performance}/100
- **Accessibility**: ${summary.averageScores.accessibility}/100
- **Best Practices**: ${summary.averageScores.bestPractices}/100
- **SEO**: ${summary.averageScores.seo}/100

### Average Core Web Vitals
- **LCP**: ${Math.round(summary.averageMetrics.lcp)}ms
- **FID**: ${Math.round(summary.averageMetrics.fid)}ms
- **CLS**: ${summary.averageMetrics.cls.toFixed(3)}
- **FCP**: ${Math.round(summary.averageMetrics.fcp)}ms
- **TTFB**: ${Math.round(summary.averageMetrics.ttfb)}ms

### Other Metrics
- **Average Bundle Size**: ${(summary.bundleSizeAverage / 1024).toFixed(1)}KB
- **Average Generation Time**: ${summary.generationTimeAverage > 0 ? (summary.generationTimeAverage / 1000).toFixed(2) + 's' : 'N/A'}
- **Total Sites Tested**: ${summary.totalSites}

## 📋 Individual Site Results

| Site | Performance | Accessibility | Best Practices | SEO | Bundle Size | Status |
|------|------------|---------------|----------------|-----|-------------|---------|
${report.sites.map(site => 
`| ${site.name} | ${site.lighthouse.scores.performance} | ${site.lighthouse.scores.accessibility} | ${site.lighthouse.scores.bestPractices} | ${site.lighthouse.scores.seo} | ${(site.bundleSize.total / 1024).toFixed(1)}KB | ${site.lighthouse.passed ? '✅' : '❌'} |`
).join('\n')}

## 🚀 Achievements

${kpis.overallSuccess ? `
### ✅ Phase 1 KPIs Successfully Achieved!

All Phase 1 performance targets have been met:
- Lighthouse scores exceed all thresholds
- Generation time is under 5 seconds
- Bundle size is under 100KB

The POC successfully demonstrates AWEMA's capability to generate high-performance, accessible, and SEO-optimized websites.
` : `
### ⚠️ Some KPIs Need Improvement

While significant progress has been made, the following areas need attention:
${!kpis.lighthouseTarget.achieved ? '- Lighthouse scores need improvement\n' : ''}${!kpis.generationTimeTarget.achieved ? '- Generation time optimization required\n' : ''}${!kpis.bundleSizeTarget.achieved ? '- Bundle size reduction needed\n' : ''}
`}

---
*Generated by AWEMA Performance Reporter*
    `;
  }
}

// Export default instance
export const performanceReporter = new PerformanceReporter();
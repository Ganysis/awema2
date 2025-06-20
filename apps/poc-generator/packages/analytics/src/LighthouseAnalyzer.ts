/**
 * Lighthouse Analyzer
 * Programmatic Lighthouse testing for AWEMA generated sites
 */

import * as lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface LighthouseTarget {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseResult {
  url: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
    fcp: number;
    si: number;
    tti: number;
    tbt: number;
  };
  passed: boolean;
  failures: Array<{
    category: string;
    score: number;
    target: number;
  }>;
}

export class LighthouseAnalyzer {
  private targets: LighthouseTarget;
  private chrome: chromeLauncher.LaunchedChrome | null = null;

  constructor(targets: LighthouseTarget = {
    performance: 95,
    accessibility: 95,
    bestPractices: 90,
    seo: 100
  }) {
    this.targets = targets;
  }

  async launchChrome(): Promise<chromeLauncher.LaunchedChrome> {
    this.chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
      port: 0 // Auto-select port
    });
    return this.chrome;
  }

  async closeChrome(): Promise<void> {
    if (this.chrome) {
      await this.chrome.kill();
      this.chrome = null;
    }
  }

  async analyze(url: string): Promise<LighthouseResult> {
    let chrome: chromeLauncher.LaunchedChrome | null = null;
    
    try {
      // Launch Chrome if not already running
      chrome = this.chrome || await this.launchChrome();
      
      // Run Lighthouse
      const options = {
        logLevel: 'error',
        output: 'json',
        port: chrome.port,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      };

      const runnerResult = await lighthouse(url, options);
      
      if (!runnerResult || !runnerResult.lhr) {
        throw new Error('Lighthouse failed to generate report');
      }

      const lhr = runnerResult.lhr;

      // Extract scores
      const scores = {
        performance: Math.round((lhr.categories.performance?.score || 0) * 100),
        accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((lhr.categories.seo?.score || 0) * 100)
      };

      // Extract metrics
      const audits = lhr.audits;
      const metrics = {
        lcp: audits['largest-contentful-paint']?.numericValue || 0,
        fid: audits['max-potential-fid']?.numericValue || 0,
        cls: audits['cumulative-layout-shift']?.numericValue || 0,
        ttfb: audits['server-response-time']?.numericValue || 0,
        fcp: audits['first-contentful-paint']?.numericValue || 0,
        si: audits['speed-index']?.numericValue || 0,
        tti: audits['interactive']?.numericValue || 0,
        tbt: audits['total-blocking-time']?.numericValue || 0
      };

      // Check against targets
      const failures: Array<{ category: string; score: number; target: number }> = [];
      let passed = true;

      const categoryMap = {
        performance: 'performance',
        accessibility: 'accessibility',
        bestPractices: 'best-practices',
        seo: 'seo'
      };

      for (const [key, targetScore] of Object.entries(this.targets)) {
        const scoreKey = key as keyof typeof scores;
        if (scores[scoreKey] < targetScore) {
          passed = false;
          failures.push({
            category: categoryMap[key as keyof typeof categoryMap] || key,
            score: scores[scoreKey],
            target: targetScore
          });
        }
      }

      // If not using shared Chrome instance, close it
      if (!this.chrome && chrome) {
        await chrome.kill();
      }

      return {
        url,
        scores,
        metrics,
        passed,
        failures
      };

    } catch (error) {
      // Cleanup on error
      if (!this.chrome && chrome) {
        await chrome.kill();
      }
      throw error;
    }
  }

  async analyzeMultiple(urls: string[]): Promise<LighthouseResult[]> {
    const results: LighthouseResult[] = [];
    
    // Launch Chrome once for all tests
    await this.launchChrome();
    
    try {
      for (const url of urls) {
        console.log(`Analyzing ${url}...`);
        const result = await this.analyze(url);
        results.push(result);
      }
    } finally {
      // Always close Chrome when done
      await this.closeChrome();
    }
    
    return results;
  }

  generateReport(results: LighthouseResult[], outputPath: string): void {
    const report = {
      timestamp: new Date().toISOString(),
      targets: this.targets,
      results: results,
      summary: this.generateSummary(results)
    };

    writeFileSync(outputPath, JSON.stringify(report, null, 2));
  }

  private generateSummary(results: LighthouseResult[]) {
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    
    // Calculate averages
    const avgScores = {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0
    };

    const avgMetrics = {
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
      fcp: 0,
      si: 0,
      tti: 0,
      tbt: 0
    };

    for (const result of results) {
      for (const [key, value] of Object.entries(result.scores)) {
        avgScores[key as keyof typeof avgScores] += value;
      }
      for (const [key, value] of Object.entries(result.metrics)) {
        avgMetrics[key as keyof typeof avgMetrics] += value;
      }
    }

    const count = results.length;
    for (const key of Object.keys(avgScores)) {
      avgScores[key as keyof typeof avgScores] = Math.round(avgScores[key as keyof typeof avgScores] / count);
    }
    for (const key of Object.keys(avgMetrics)) {
      avgMetrics[key as keyof typeof avgMetrics] = Math.round(avgMetrics[key as keyof typeof avgMetrics] / count);
    }

    return {
      totalTests: count,
      passed,
      failed,
      averageScores: avgScores,
      averageMetrics: avgMetrics,
      phase1KPIsAchieved: this.checkPhase1KPIs(avgScores)
    };
  }

  private checkPhase1KPIs(avgScores: typeof LighthouseAnalyzer.prototype.generateSummary.arguments[0][0]['scores']): boolean {
    return avgScores.performance >= 95 &&
           avgScores.accessibility >= 95 &&
           avgScores.bestPractices >= 90 &&
           avgScores.seo >= 100;
  }

  async testLocalFile(filePath: string): Promise<LighthouseResult> {
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Use file:// protocol for local files
    const fileUrl = `file://${filePath}`;
    return this.analyze(fileUrl);
  }

  async testGeneratedSites(generatedSitesDir: string): Promise<LighthouseResult[]> {
    const fs = require('fs');
    const results: LighthouseResult[] = [];

    if (!existsSync(generatedSitesDir)) {
      throw new Error(`Generated sites directory not found: ${generatedSitesDir}`);
    }

    const sites = fs.readdirSync(generatedSitesDir)
      .filter((file: string) => fs.statSync(join(generatedSitesDir, file)).isDirectory());

    await this.launchChrome();

    try {
      for (const site of sites) {
        const indexPath = join(generatedSitesDir, site, 'index.html');
        if (existsSync(indexPath)) {
          console.log(`Testing ${site}...`);
          const result = await this.testLocalFile(indexPath);
          results.push(result);
        }
      }
    } finally {
      await this.closeChrome();
    }

    return results;
  }
}

// Export default instance with Phase 1 targets
export const defaultAnalyzer = new LighthouseAnalyzer();
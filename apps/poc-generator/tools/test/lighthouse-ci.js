#!/usr/bin/env node

/**
 * Lighthouse CI Test Runner
 * Validates generated sites meet Phase 1 performance targets
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Performance targets for Phase 1
const PERFORMANCE_TARGETS = {
  performance: 95,
  accessibility: 95,
  'best-practices': 90,
  seo: 100
};

// Sites to test
const GENERATED_SITES_DIR = path.join(__dirname, '../../generated-sites');

class LighthouseCIRunner {
  constructor() {
    this.results = [];
  }

  async testSite(siteName, sitePath) {
    console.log(`\n🔍 Testing site: ${siteName}`);
    console.log(`   Path: ${sitePath}`);

    try {
      // File URL for local testing
      const fileUrl = `file://${path.join(sitePath, 'index.html')}`;
      
      // Run Lighthouse
      const lighthouseCmd = `npx lighthouse "${fileUrl}" --output=json --output-path=./lighthouse-report-${siteName}.json --chrome-flags="--headless --no-sandbox --disable-gpu" --preset=desktop --quiet`;
      
      console.log('   Running Lighthouse analysis...');
      
      try {
        execSync(lighthouseCmd, { stdio: 'pipe' });
      } catch (error) {
        console.error('   ❌ Lighthouse command failed:', error.message);
        throw error;
      }
      
      // Read and parse results
      const reportPath = `./lighthouse-report-${siteName}.json`;
      if (!fs.existsSync(reportPath)) {
        throw new Error('Lighthouse report not generated');
      }
      
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      
      // Extract scores
      const scores = {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        'best-practices': Math.round(report.categories['best-practices'].score * 100),
        seo: Math.round(report.categories.seo.score * 100)
      };
      
      // Check against targets
      const results = {
        siteName,
        scores,
        passed: true,
        failures: []
      };
      
      for (const [category, target] of Object.entries(PERFORMANCE_TARGETS)) {
        if (scores[category] < target) {
          results.passed = false;
          results.failures.push({
            category,
            score: scores[category],
            target,
            diff: scores[category] - target
          });
        }
      }
      
      // Core Web Vitals
      const audits = report.audits;
      results.coreWebVitals = {
        lcp: audits['largest-contentful-paint']?.numericValue || 0,
        fid: audits['max-potential-fid']?.numericValue || 0,
        cls: audits['cumulative-layout-shift']?.numericValue || 0,
        ttfb: audits['server-response-time']?.numericValue || 0,
        fcp: audits['first-contentful-paint']?.numericValue || 0,
        si: audits['speed-index']?.numericValue || 0
      };
      
      // Bundle size calculation
      const resourceSummary = audits['resource-summary']?.details?.items || [];
      const jsItem = resourceSummary.find(item => item.resourceType === 'script');
      const cssItem = resourceSummary.find(item => item.resourceType === 'stylesheet');
      const totalItem = resourceSummary.find(item => item.resourceType === 'total');
      
      results.bundleSize = {
        js: jsItem?.transferSize || 0,
        css: cssItem?.transferSize || 0,
        total: totalItem?.transferSize || 0,
        totalKB: Math.round((totalItem?.transferSize || 0) / 1024 * 10) / 10
      };
      
      this.results.push(results);
      
      // Cleanup
      fs.unlinkSync(reportPath);
      
      // Print results
      this.printSiteResults(results);
      
      return results;
      
    } catch (error) {
      console.error(`   ❌ Error testing ${siteName}:`, error.message);
      return {
        siteName,
        error: error.message,
        passed: false
      };
    }
  }

  printSiteResults(results) {
    console.log('\n   📊 Lighthouse Scores:');
    for (const [category, score] of Object.entries(results.scores)) {
      const target = PERFORMANCE_TARGETS[category];
      const passed = score >= target;
      const emoji = passed ? '✅' : '❌';
      console.log(`      ${emoji} ${category}: ${score}/100 (target: ${target})`);
    }
    
    console.log('\n   ⚡ Core Web Vitals:');
    console.log(`      LCP: ${Math.round(results.coreWebVitals.lcp)}ms`);
    console.log(`      FID: ${Math.round(results.coreWebVitals.fid)}ms`);
    console.log(`      CLS: ${results.coreWebVitals.cls.toFixed(3)}`);
    console.log(`      FCP: ${Math.round(results.coreWebVitals.fcp)}ms`);
    console.log(`      TTFB: ${Math.round(results.coreWebVitals.ttfb)}ms`);
    
    console.log('\n   📦 Bundle Size:');
    console.log(`      Total: ${results.bundleSize.totalKB}KB`);
    if (results.bundleSize.js > 0) {
      console.log(`      JS: ${Math.round(results.bundleSize.js / 1024 * 10) / 10}KB`);
    }
    if (results.bundleSize.css > 0) {
      console.log(`      CSS: ${Math.round(results.bundleSize.css / 1024 * 10) / 10}KB`);
    }
    
    if (results.passed) {
      console.log('\n   ✅ All performance targets met!');
    } else {
      console.log('\n   ❌ Failed targets:');
      results.failures.forEach(failure => {
        console.log(`      - ${failure.category}: ${failure.score} (needed ${failure.target})`);
      });
    }
  }

  async runTests() {
    console.log('🚀 Lighthouse CI Test Runner');
    console.log('===========================\n');
    
    // Check if generated sites exist
    if (!fs.existsSync(GENERATED_SITES_DIR)) {
      console.error('❌ No generated sites found. Please run generation first.');
      process.exit(1);
    }
    
    // Get all generated sites
    const sites = fs.readdirSync(GENERATED_SITES_DIR)
      .filter(file => fs.statSync(path.join(GENERATED_SITES_DIR, file)).isDirectory());
    
    if (sites.length === 0) {
      console.error('❌ No sites found in generated-sites directory.');
      process.exit(1);
    }
    
    console.log(`Found ${sites.length} sites to test`);
    
    // Test each site
    for (const site of sites) {
      await this.testSite(site, path.join(GENERATED_SITES_DIR, site));
    }
    
    // Summary
    this.printSummary();
  }

  printSummary() {
    console.log('\n\n📈 PERFORMANCE TEST SUMMARY');
    console.log('============================\n');
    
    const validResults = this.results.filter(r => !r.error);
    const passed = validResults.filter(r => r.passed).length;
    const failed = validResults.filter(r => !r.passed).length;
    
    console.log(`Total sites tested: ${this.results.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    
    if (validResults.length > 0) {
      // Average scores
      const avgScores = {};
      for (const category of Object.keys(PERFORMANCE_TARGETS)) {
        const scores = validResults
          .filter(r => r.scores)
          .map(r => r.scores[category]);
        avgScores[category] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      }
      
      console.log('\n📊 Average Scores:');
      for (const [category, avg] of Object.entries(avgScores)) {
        const target = PERFORMANCE_TARGETS[category];
        const emoji = avg >= target ? '✅' : '❌';
        console.log(`   ${emoji} ${category}: ${avg}/100 (target: ${target})`);
      }
      
      // Average bundle size
      const bundleSizes = validResults
        .filter(r => r.bundleSize)
        .map(r => r.bundleSize.totalKB);
      if (bundleSizes.length > 0) {
        const avgBundleSize = Math.round(bundleSizes.reduce((a, b) => a + b, 0) / bundleSizes.length * 10) / 10;
        
        console.log(`\n📦 Average Bundle Size: ${avgBundleSize}KB`);
        console.log(`   ${avgBundleSize < 100 ? '✅' : '❌'} Target: < 100KB`);
      }
      
      // Phase 1 KPIs validation
      console.log('\n🎯 Phase 1 KPIs Validation:');
      const kpisPassed = 
        avgScores.performance >= 95 &&
        avgScores.accessibility >= 95 &&
        avgScores['best-practices'] >= 90 &&
        avgScores.seo >= 100 &&
        (bundleSizes.length === 0 || bundleSizes.reduce((a, b) => a + b, 0) / bundleSizes.length < 100);
      
      if (kpisPassed) {
        console.log('   ✅ All Phase 1 KPIs achieved!');
      } else {
        console.log('   ❌ Some KPIs not met');
      }
    }
    
    // Exit code
    process.exit(failed > 0 ? 1 : 0);
  }
}

// Check if lighthouse is available
try {
  execSync('npx lighthouse --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Lighthouse CLI not found.');
  console.error('   Please install it: npm install -g lighthouse');
  process.exit(1);
}

// Run tests
const runner = new LighthouseCIRunner();
runner.runTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
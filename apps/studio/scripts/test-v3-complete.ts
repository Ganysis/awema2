/**
 * Test complet V3 - Script executable
 */

import { RenderEngineV3 } from '../lib/v3/core/render-engine-with-logs';
import { V2ToV3Adapter } from '../lib/v3/adapters/v2-to-v3.adapter';
import { StaticExportV3 } from '../lib/v3/export/static-export-v3';
import { logger } from '../lib/v3/core/logger';

// Import tous les renderers
import { HeroRendererV3 } from '../lib/v3/renderers/hero.renderer';
import { ContactRendererV3 } from '../lib/v3/renderers/contact.renderer';
import { FeaturesRendererV3 } from '../lib/v3/renderers/features.renderer';
import { GalleryRendererV3 } from '../lib/v3/renderers/gallery.renderer';
import { FAQRendererV3 } from '../lib/v3/renderers/faq.renderer';
import { PricingRendererV3 } from '../lib/v3/renderers/pricing.renderer';
import { CTARendererV3 } from '../lib/v3/renderers/cta.renderer';
import { ContentRendererV3 } from '../lib/v3/renderers/content.renderer';
import { ServicesRendererV3 } from '../lib/v3/renderers/services.renderer';
import { TestimonialsRendererV3 } from '../lib/v3/renderers/testimonials.renderer';

// Import des defaults
import { heroDefaults } from '../lib/v3/schemas/blocks/hero';
import { contactDefaults } from '../lib/v3/schemas/blocks/contact';
import { featuresDefaults } from '../lib/v3/schemas/blocks/features';
import { galleryDefaults } from '../lib/v3/schemas/blocks/gallery';
import { faqDefaults } from '../lib/v3/schemas/blocks/faq';
import { pricingDefaults } from '../lib/v3/schemas/blocks/pricing';
import { ctaDefaults } from '../lib/v3/schemas/blocks/cta';
import { contentDefaults } from '../lib/v3/schemas/blocks/content';
import { servicesDefaults } from '../lib/v3/schemas/blocks/services';
import { testimonialsDefaults } from '../lib/v3/schemas/blocks/testimonials';

import * as fs from 'fs';
import * as path from 'path';

// Types
import { BlockData } from '../lib/v3/types';

interface TestResult {
  name: string;
  success: boolean;
  duration: number;
  error?: string;
  details?: any;
}

class V3TestSuite {
  private results: TestResult[] = [];
  private engine: RenderEngineV3;
  private adapter: V2ToV3Adapter;
  private exporter: StaticExportV3;
  
  constructor() {
    logger.info('V3TestSuite', 'constructor', '🧪 Initialisation de la suite de tests V3');
    
    this.engine = new RenderEngineV3();
    this.adapter = new V2ToV3Adapter();
    this.exporter = new StaticExportV3();
    
    this.registerAllRenderers();
  }
  
  private registerAllRenderers(): void {
    const renderers = [
      new HeroRendererV3(),
      new ContactRendererV3(),
      new FeaturesRendererV3(),
      new GalleryRendererV3(),
      new FAQRendererV3(),
      new PricingRendererV3(),
      new CTARendererV3(),
      new ContentRendererV3(),
      new ServicesRendererV3(),
      new TestimonialsRendererV3()
    ];
    
    renderers.forEach(renderer => {
      this.engine.registerRenderer(renderer);
    });
  }
  
  async runAllTests(): Promise<void> {
    console.log('\n🚀 AWEMA V3 - Suite de Tests Complète\n');
    
    // Tests unitaires
    await this.runUnitTests();
    
    // Tests d'intégration
    await this.runIntegrationTests();
    
    // Tests de performance
    await this.runPerformanceTests();
    
    // Tests d'export
    await this.runExportTests();
    
    // Afficher les résultats
    this.displayResults();
  }
  
  private async runUnitTests(): Promise<void> {
    console.log('📋 Tests unitaires...\n');
    
    // Test Logger
    await this.test('Logger - Niveaux de log', async () => {
      logger.clear();
      logger.debug('Test', 'method', 'Debug');
      logger.info('Test', 'method', 'Info');
      logger.warn('Test', 'method', 'Warn');
      logger.error('Test', 'method', 'Error');
      
      const logs = logger.getLogs();
      if (logs.length !== 4) throw new Error(`Expected 4 logs, got ${logs.length}`);
      return { logsCount: logs.length };
    });
    
    // Test Adapter
    await this.test('Adapter - Conversion V2 vers V3', async () => {
      const v2Block = {
        id: 'test-1',
        type: 'hero-ultra-modern',
        props: {
          variant: 'gradient-animated',
          title: 'Test Title'
        }
      };
      
      const v3Block = this.adapter.convertBlock(v2Block);
      if (!v3Block) throw new Error('Conversion failed');
      if (v3Block.data.title !== 'Test Title') throw new Error('Title mismatch');
      
      return { converted: true, type: v3Block.type };
    });
    
    // Test chaque renderer
    const renderers = [
      { name: 'Hero', type: 'hero-ultra-modern', data: heroDefaults },
      { name: 'Contact', type: 'contact-ultra-modern', data: contactDefaults },
      { name: 'Features', type: 'features-ultra-modern', data: featuresDefaults },
      { name: 'Gallery', type: 'gallery-ultra-modern', data: galleryDefaults },
      { name: 'FAQ', type: 'faq-ultra-modern', data: faqDefaults },
      { name: 'Pricing', type: 'pricing-ultra-modern', data: pricingDefaults },
      { name: 'CTA', type: 'cta-ultra-modern', data: ctaDefaults },
      { name: 'Content', type: 'content-ultra-modern', data: contentDefaults },
      { name: 'Services', type: 'services-ultra-modern', data: servicesDefaults },
      { name: 'Testimonials', type: 'testimonials-ultra-modern', data: testimonialsDefaults }
    ];
    
    for (const { name, type, data } of renderers) {
      await this.test(`Renderer ${name} - Rendu avec données par défaut`, async () => {
        const block: BlockData = {
          id: `test-${type}`,
          type,
          data,
          meta: {
            id: `test-${type}`,
            type,
            version: '3.0.0',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            validationStatus: 'valid'
          }
        };
        
        const result = await this.engine.renderBlock(block);
        
        if (!result.html) throw new Error('No HTML generated');
        if (result.errors.length > 0) throw new Error(`Errors: ${result.errors.map(e => e.message).join(', ')}`);
        
        return {
          htmlLength: result.html.length,
          cssLength: result.css.length,
          jsLength: result.js.length,
          renderTime: result.performance?.renderTime
        };
      });
    }
  }
  
  private async runIntegrationTests(): Promise<void> {
    console.log('\n🔗 Tests d\'intégration...\n');
    
    // Test page complète
    await this.test('Page complète - Hero + Features + CTA', async () => {
      const blocks: BlockData[] = [
        {
          id: 'page-hero',
          type: 'hero-ultra-modern',
          data: { ...heroDefaults, title: 'Page de test V3' },
          meta: { 
            id: 'page-hero',
            type: 'hero-ultra-modern',
            version: '3.0.0', 
            created: new Date().toISOString(), 
            modified: new Date().toISOString(),
            validationStatus: 'valid'
          }
        },
        {
          id: 'page-features',
          type: 'features-ultra-modern',
          data: featuresDefaults,
          meta: { 
            id: 'page-features',
            type: 'features-ultra-modern',
            version: '3.0.0', 
            created: new Date().toISOString(), 
            modified: new Date().toISOString(),
            validationStatus: 'valid'
          }
        },
        {
          id: 'page-cta',
          type: 'cta-ultra-modern',
          data: ctaDefaults,
          meta: { 
            id: 'page-cta',
            type: 'cta-ultra-modern',
            version: '3.0.0', 
            created: new Date().toISOString(), 
            modified: new Date().toISOString(),
            validationStatus: 'valid'
          }
        }
      ];
      
      const results = await Promise.all(blocks.map(b => this.engine.renderBlock(b)));
      const totalErrors = results.reduce((acc, r) => acc + r.errors.length, 0);
      
      if (totalErrors > 0) throw new Error(`${totalErrors} errors in page rendering`);
      
      return {
        blocksCount: blocks.length,
        totalHtmlLength: results.reduce((acc, r) => acc + r.html.length, 0),
        totalRenderTime: results.reduce((acc, r) => acc + (r.performance?.renderTime || 0), 0)
      };
    });
  }
  
  private async runPerformanceTests(): Promise<void> {
    console.log('\n⚡ Tests de performance...\n');
    
    // Test rendu parallèle
    await this.test('Performance - Rendu de 10 blocs en parallèle', async () => {
      const blocks: BlockData[] = Array.from({ length: 10 }, (_, i) => ({
        id: `perf-${i}`,
        type: 'features-ultra-modern',
        data: featuresDefaults,
        meta: { 
          id: `perf-${i}`,
          type: 'features-ultra-modern',
          version: '3.0.0', 
          created: new Date().toISOString(), 
          modified: new Date().toISOString(),
          validationStatus: 'valid'
        }
      }));
      
      const startTime = performance.now();
      const results = await Promise.all(blocks.map(b => this.engine.renderBlock(b)));
      const totalTime = performance.now() - startTime;
      
      const avgTime = totalTime / blocks.length;
      if (avgTime > 100) throw new Error(`Rendering too slow: ${avgTime.toFixed(2)}ms per block`);
      
      return {
        totalTime: totalTime.toFixed(2),
        avgTime: avgTime.toFixed(2),
        blocksRendered: results.filter(r => r.errors.length === 0).length
      };
    });
  }
  
  private async runExportTests(): Promise<void> {
    console.log('\n📦 Tests d\'export...\n');
    
    // Test export site complet
    await this.test('Export - Site complet avec 3 pages', async () => {
      const pages = [
        {
          id: 'home',
          name: 'Accueil',
          slug: 'index',
          blocks: [
            { id: 'h1', type: 'hero-ultra-modern', props: heroDefaults },
            { id: 'f1', type: 'features-ultra-modern', props: featuresDefaults },
            { id: 'c1', type: 'cta-ultra-modern', props: ctaDefaults }
          ]
        },
        {
          id: 'services',
          name: 'Services',
          slug: 'services',
          blocks: [
            { id: 's1', type: 'services-ultra-modern', props: servicesDefaults },
            { id: 'p1', type: 'pricing-ultra-modern', props: pricingDefaults }
          ]
        },
        {
          id: 'contact',
          name: 'Contact',
          slug: 'contact',
          blocks: [
            { id: 'co1', type: 'contact-ultra-modern', props: contactDefaults }
          ]
        }
      ];
      
      const globalData = {
        siteName: 'Test V3 Site',
        siteUrl: 'https://test-v3.com'
      };
      
      const result = await this.exporter.exportSite(pages, globalData, {
        minify: true,
        inlineCSS: true,
        inlineJS: true
      });
      
      if (!result.success) throw new Error('Export failed');
      if (result.errors.length > 0) throw new Error(`Export errors: ${result.errors.length}`);
      
      return {
        filesCount: result.files.size,
        totalSize: result.stats.totalSize,
        v3BlocksRendered: result.stats.v3BlocksRendered,
        renderTime: result.stats.renderTime.toFixed(2)
      };
    });
  }
  
  private async test(name: string, fn: () => Promise<any>): Promise<void> {
    const startTime = performance.now();
    
    try {
      const details = await fn();
      const duration = performance.now() - startTime;
      
      this.results.push({
        name,
        success: true,
        duration,
        details
      });
      
      console.log(`✅ ${name} (${duration.toFixed(2)}ms)`);
      if (details) {
        console.log(`   └─ ${JSON.stringify(details)}`);
      }
    } catch (error) {
      const duration = performance.now() - startTime;
      
      this.results.push({
        name,
        success: false,
        duration,
        error: error instanceof Error ? error.message : String(error)
      });
      
      console.log(`❌ ${name} (${duration.toFixed(2)}ms)`);
      console.log(`   └─ Error: ${error}`);
    }
  }
  
  private displayResults(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSULTATS FINAUX');
    console.log('='.repeat(60) + '\n');
    
    const successCount = this.results.filter(r => r.success).length;
    const totalCount = this.results.length;
    const successRate = (successCount / totalCount * 100).toFixed(1);
    const totalDuration = this.results.reduce((acc, r) => acc + r.duration, 0);
    
    console.log(`✅ Tests réussis: ${successCount}/${totalCount} (${successRate}%)`);
    console.log(`⏱️  Temps total: ${totalDuration.toFixed(2)}ms`);
    console.log(`📝 Logs générés: ${logger.getLogs().length}`);
    
    if (successCount < totalCount) {
      console.log('\n❌ Tests échoués:');
      this.results
        .filter(r => !r.success)
        .forEach(r => {
          console.log(`  - ${r.name}: ${r.error}`);
        });
    }
    
    // Sauvegarder le rapport
    this.saveReport();
  }
  
  private saveReport(): void {
    const report = {
      date: new Date().toISOString(),
      summary: {
        total: this.results.length,
        success: this.results.filter(r => r.success).length,
        failed: this.results.filter(r => !r.success).length,
        totalDuration: this.results.reduce((acc, r) => acc + r.duration, 0)
      },
      results: this.results,
      logs: logger.getLogs().slice(0, 100) // Premiers 100 logs
    };
    
    const reportPath = path.join(__dirname, 'v3-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Rapport sauvegardé: ${reportPath}`);
    
    // Générer aussi un HTML
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(__dirname, 'v3-test-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    
    console.log(`📄 Rapport HTML: ${htmlPath}`);
  }
  
  private generateHTMLReport(report: any): string {
    const successRate = (report.summary.success / report.summary.total * 100).toFixed(1);
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport de Tests V3 - AWEMA Studio</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f9fafb;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }
    h1 { color: #3b82f6; }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    .stat {
      padding: 1.5rem;
      background: #f3f4f6;
      border-radius: 0.5rem;
      text-align: center;
    }
    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #3b82f6;
    }
    .stat-label {
      color: #6b7280;
    }
    .success { color: #10b981; }
    .error { color: #ef4444; }
    .test-result {
      padding: 1rem;
      margin: 0.5rem 0;
      background: #f9fafb;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .test-result.success { border-left: 4px solid #10b981; }
    .test-result.error { border-left: 4px solid #ef4444; }
    .duration { color: #6b7280; font-size: 0.875rem; }
    pre { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧪 Rapport de Tests V3 - AWEMA Studio</h1>
    <p>Généré le ${new Date(report.date).toLocaleString('fr-FR')}</p>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-value ${report.summary.success === report.summary.total ? 'success' : 'error'}">
          ${successRate}%
        </div>
        <div class="stat-label">Taux de réussite</div>
      </div>
      <div class="stat">
        <div class="stat-value">${report.summary.total}</div>
        <div class="stat-label">Tests exécutés</div>
      </div>
      <div class="stat">
        <div class="stat-value success">${report.summary.success}</div>
        <div class="stat-label">Réussis</div>
      </div>
      <div class="stat">
        <div class="stat-value error">${report.summary.failed}</div>
        <div class="stat-label">Échoués</div>
      </div>
      <div class="stat">
        <div class="stat-value">${(report.summary.totalDuration / 1000).toFixed(2)}s</div>
        <div class="stat-label">Durée totale</div>
      </div>
    </div>
    
    <h2>Détails des tests</h2>
    ${report.results.map((r: any) => `
      <div class="test-result ${r.success ? 'success' : 'error'}">
        <div>
          <strong>${r.success ? '✅' : '❌'} ${r.name}</strong>
          ${r.error ? `<div style="color: #ef4444; font-size: 0.875rem;">${r.error}</div>` : ''}
          ${r.details ? `<div style="color: #6b7280; font-size: 0.875rem;">${JSON.stringify(r.details)}</div>` : ''}
        </div>
        <span class="duration">${r.duration.toFixed(2)}ms</span>
      </div>
    `).join('')}
    
    ${report.summary.failed > 0 ? `
      <h2 style="color: #ef4444;">Tests échoués</h2>
      ${report.results.filter((r: any) => !r.success).map((r: any) => `
        <div style="margin: 1rem 0; padding: 1rem; background: #fee2e2; border-radius: 0.5rem;">
          <strong>${r.name}</strong>
          <pre style="background: #fecaca; margin-top: 0.5rem;">${r.error}</pre>
        </div>
      `).join('')}
    ` : ''}
    
    <h2>Premiers logs</h2>
    <pre>${JSON.stringify(report.logs.slice(0, 20), null, 2)}</pre>
    
    <hr style="margin: 2rem 0;">
    <p style="text-align: center; color: #6b7280;">
      AWEMA Studio V3 - Tests automatisés
    </p>
  </div>
</body>
</html>`;
  }
}

// Exécuter les tests
async function main() {
  const testSuite = new V3TestSuite();
  await testSuite.runAllTests();
}

main().catch(error => {
  console.error('💥 Erreur fatale:', error);
  process.exit(1);
});
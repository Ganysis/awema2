"use strict";
/**
 * Test complet V3 - Script executable
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const render_engine_with_logs_1 = require("../lib/v3/core/render-engine-with-logs");
const v2_to_v3_adapter_1 = require("../lib/v3/adapters/v2-to-v3.adapter");
const static_export_v3_1 = require("../lib/v3/export/static-export-v3");
const logger_1 = require("../lib/v3/core/logger");
// Import tous les renderers
const hero_renderer_1 = require("../lib/v3/renderers/hero.renderer");
const contact_renderer_1 = require("../lib/v3/renderers/contact.renderer");
const features_renderer_1 = require("../lib/v3/renderers/features.renderer");
const gallery_renderer_1 = require("../lib/v3/renderers/gallery.renderer");
const faq_renderer_1 = require("../lib/v3/renderers/faq.renderer");
const pricing_renderer_1 = require("../lib/v3/renderers/pricing.renderer");
const cta_renderer_1 = require("../lib/v3/renderers/cta.renderer");
const content_renderer_1 = require("../lib/v3/renderers/content.renderer");
const services_renderer_1 = require("../lib/v3/renderers/services.renderer");
const testimonials_renderer_1 = require("../lib/v3/renderers/testimonials.renderer");
// Import des defaults
const hero_1 = require("../lib/v3/schemas/blocks/hero");
const contact_1 = require("../lib/v3/schemas/blocks/contact");
const features_1 = require("../lib/v3/schemas/blocks/features");
const gallery_1 = require("../lib/v3/schemas/blocks/gallery");
const faq_1 = require("../lib/v3/schemas/blocks/faq");
const pricing_1 = require("../lib/v3/schemas/blocks/pricing");
const cta_1 = require("../lib/v3/schemas/blocks/cta");
const content_1 = require("../lib/v3/schemas/blocks/content");
const services_1 = require("../lib/v3/schemas/blocks/services");
const testimonials_1 = require("../lib/v3/schemas/blocks/testimonials");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class V3TestSuite {
    constructor() {
        this.results = [];
        logger_1.logger.info('V3TestSuite', 'constructor', '🧪 Initialisation de la suite de tests V3');
        this.engine = new render_engine_with_logs_1.RenderEngineV3();
        this.adapter = new v2_to_v3_adapter_1.V2ToV3Adapter();
        this.exporter = new static_export_v3_1.StaticExportV3();
        this.registerAllRenderers();
    }
    registerAllRenderers() {
        const renderers = [
            new hero_renderer_1.HeroRendererV3(),
            new contact_renderer_1.ContactRendererV3(),
            new features_renderer_1.FeaturesRendererV3(),
            new gallery_renderer_1.GalleryRendererV3(),
            new faq_renderer_1.FAQRendererV3(),
            new pricing_renderer_1.PricingRendererV3(),
            new cta_renderer_1.CTARendererV3(),
            new content_renderer_1.ContentRendererV3(),
            new services_renderer_1.ServicesRendererV3(),
            new testimonials_renderer_1.TestimonialsRendererV3()
        ];
        renderers.forEach(renderer => {
            this.engine.registerRenderer(renderer);
        });
    }
    async runAllTests() {
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
    async runUnitTests() {
        console.log('📋 Tests unitaires...\n');
        // Test Logger
        await this.test('Logger - Niveaux de log', async () => {
            logger_1.logger.clear();
            logger_1.logger.debug('Test', 'method', 'Debug');
            logger_1.logger.info('Test', 'method', 'Info');
            logger_1.logger.warn('Test', 'method', 'Warn');
            logger_1.logger.error('Test', 'method', 'Error');
            const logs = logger_1.logger.getLogs();
            if (logs.length !== 4)
                throw new Error(`Expected 4 logs, got ${logs.length}`);
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
            if (!v3Block)
                throw new Error('Conversion failed');
            if (v3Block.data.title !== 'Test Title')
                throw new Error('Title mismatch');
            return { converted: true, type: v3Block.type };
        });
        // Test chaque renderer
        const renderers = [
            { name: 'Hero', type: 'hero-ultra-modern', data: hero_1.heroDefaults },
            { name: 'Contact', type: 'contact-ultra-modern', data: contact_1.contactDefaults },
            { name: 'Features', type: 'features-ultra-modern', data: features_1.featuresDefaults },
            { name: 'Gallery', type: 'gallery-ultra-modern', data: gallery_1.galleryDefaults },
            { name: 'FAQ', type: 'faq-ultra-modern', data: faq_1.faqDefaults },
            { name: 'Pricing', type: 'pricing-ultra-modern', data: pricing_1.pricingDefaults },
            { name: 'CTA', type: 'cta-ultra-modern', data: cta_1.ctaDefaults },
            { name: 'Content', type: 'content-ultra-modern', data: content_1.contentDefaults },
            { name: 'Services', type: 'services-ultra-modern', data: services_1.servicesDefaults },
            { name: 'Testimonials', type: 'testimonials-ultra-modern', data: testimonials_1.testimonialsDefaults }
        ];
        for (const { name, type, data } of renderers) {
            await this.test(`Renderer ${name} - Rendu avec données par défaut`, async () => {
                const block = {
                    id: `test-${type}`,
                    type,
                    data,
                    meta: {
                        version: '3.0.0',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                };
                const result = await this.engine.renderBlock(block);
                if (!result.html)
                    throw new Error('No HTML generated');
                if (result.errors.length > 0)
                    throw new Error(`Errors: ${result.errors.map(e => e.message).join(', ')}`);
                return {
                    htmlLength: result.html.length,
                    cssLength: result.css.length,
                    jsLength: result.js.length,
                    renderTime: result.performance?.renderTime
                };
            });
        }
    }
    async runIntegrationTests() {
        console.log('\n🔗 Tests d\'intégration...\n');
        // Test page complète
        await this.test('Page complète - Hero + Features + CTA', async () => {
            const blocks = [
                {
                    id: 'page-hero',
                    type: 'hero-ultra-modern',
                    data: { ...hero_1.heroDefaults, title: 'Page de test V3' },
                    meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
                },
                {
                    id: 'page-features',
                    type: 'features-ultra-modern',
                    data: features_1.featuresDefaults,
                    meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
                },
                {
                    id: 'page-cta',
                    type: 'cta-ultra-modern',
                    data: cta_1.ctaDefaults,
                    meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
                }
            ];
            const results = await Promise.all(blocks.map(b => this.engine.renderBlock(b)));
            const totalErrors = results.reduce((acc, r) => acc + r.errors.length, 0);
            if (totalErrors > 0)
                throw new Error(`${totalErrors} errors in page rendering`);
            return {
                blocksCount: blocks.length,
                totalHtmlLength: results.reduce((acc, r) => acc + r.html.length, 0),
                totalRenderTime: results.reduce((acc, r) => acc + (r.performance?.renderTime || 0), 0)
            };
        });
    }
    async runPerformanceTests() {
        console.log('\n⚡ Tests de performance...\n');
        // Test rendu parallèle
        await this.test('Performance - Rendu de 10 blocs en parallèle', async () => {
            const blocks = Array.from({ length: 10 }, (_, i) => ({
                id: `perf-${i}`,
                type: 'features-ultra-modern',
                data: features_1.featuresDefaults,
                meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
            }));
            const startTime = performance.now();
            const results = await Promise.all(blocks.map(b => this.engine.renderBlock(b)));
            const totalTime = performance.now() - startTime;
            const avgTime = totalTime / blocks.length;
            if (avgTime > 100)
                throw new Error(`Rendering too slow: ${avgTime.toFixed(2)}ms per block`);
            return {
                totalTime: totalTime.toFixed(2),
                avgTime: avgTime.toFixed(2),
                blocksRendered: results.filter(r => r.errors.length === 0).length
            };
        });
    }
    async runExportTests() {
        console.log('\n📦 Tests d\'export...\n');
        // Test export site complet
        await this.test('Export - Site complet avec 3 pages', async () => {
            const pages = [
                {
                    id: 'home',
                    name: 'Accueil',
                    slug: 'index',
                    blocks: [
                        { id: 'h1', type: 'hero-ultra-modern', props: hero_1.heroDefaults },
                        { id: 'f1', type: 'features-ultra-modern', props: features_1.featuresDefaults },
                        { id: 'c1', type: 'cta-ultra-modern', props: cta_1.ctaDefaults }
                    ]
                },
                {
                    id: 'services',
                    name: 'Services',
                    slug: 'services',
                    blocks: [
                        { id: 's1', type: 'services-ultra-modern', props: services_1.servicesDefaults },
                        { id: 'p1', type: 'pricing-ultra-modern', props: pricing_1.pricingDefaults }
                    ]
                },
                {
                    id: 'contact',
                    name: 'Contact',
                    slug: 'contact',
                    blocks: [
                        { id: 'co1', type: 'contact-ultra-modern', props: contact_1.contactDefaults }
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
            if (!result.success)
                throw new Error('Export failed');
            if (result.errors.length > 0)
                throw new Error(`Export errors: ${result.errors.length}`);
            return {
                filesCount: result.files.size,
                totalSize: result.stats.totalSize,
                v3BlocksRendered: result.stats.v3BlocksRendered,
                renderTime: result.stats.renderTime.toFixed(2)
            };
        });
    }
    async test(name, fn) {
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
        }
        catch (error) {
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
    displayResults() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 RÉSULTATS FINAUX');
        console.log('='.repeat(60) + '\n');
        const successCount = this.results.filter(r => r.success).length;
        const totalCount = this.results.length;
        const successRate = (successCount / totalCount * 100).toFixed(1);
        const totalDuration = this.results.reduce((acc, r) => acc + r.duration, 0);
        console.log(`✅ Tests réussis: ${successCount}/${totalCount} (${successRate}%)`);
        console.log(`⏱️  Temps total: ${totalDuration.toFixed(2)}ms`);
        console.log(`📝 Logs générés: ${logger_1.logger.getLogs().length}`);
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
    saveReport() {
        const report = {
            date: new Date().toISOString(),
            summary: {
                total: this.results.length,
                success: this.results.filter(r => r.success).length,
                failed: this.results.filter(r => !r.success).length,
                totalDuration: this.results.reduce((acc, r) => acc + r.duration, 0)
            },
            results: this.results,
            logs: logger_1.logger.getLogs().slice(0, 100) // Premiers 100 logs
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
    generateHTMLReport(report) {
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
    ${report.results.map((r) => `
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
      ${report.results.filter((r) => !r.success).map((r) => `
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

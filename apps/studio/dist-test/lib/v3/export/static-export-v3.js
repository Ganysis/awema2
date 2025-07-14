"use strict";
/**
 * Export Statique V3 - Export robuste avec logs détaillés
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticExportV3 = void 0;
const render_engine_with_logs_1 = require("../core/render-engine-with-logs");
const v2_to_v3_adapter_1 = require("../adapters/v2-to-v3.adapter");
const logger_1 = require("../core/logger");
// Import des renderers
const hero_renderer_1 = require("../renderers/hero.renderer");
const contact_renderer_1 = require("../renderers/contact.renderer");
const features_renderer_1 = require("../renderers/features.renderer");
const gallery_renderer_1 = require("../renderers/gallery.renderer");
const faq_renderer_1 = require("../renderers/faq.renderer");
const pricing_renderer_1 = require("../renderers/pricing.renderer");
const cta_renderer_1 = require("../renderers/cta.renderer");
const content_renderer_1 = require("../renderers/content.renderer");
const services_renderer_1 = require("../renderers/services.renderer");
const testimonials_renderer_1 = require("../renderers/testimonials.renderer");
class StaticExportV3 {
    constructor() {
        logger_1.logger.info('StaticExportV3', 'constructor', '🚀 Initialisation de l\'export V3');
        this.engine = new render_engine_with_logs_1.RenderEngineV3();
        this.adapter = new v2_to_v3_adapter_1.V2ToV3Adapter();
        // Enregistrer tous les renderers
        this.registerRenderers();
    }
    registerRenderers() {
        logger_1.logger.debug('StaticExportV3', 'registerRenderers', 'Enregistrement des renderers');
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
            logger_1.logger.debug('StaticExportV3', 'registerRenderers', `✅ Renderer enregistré: ${renderer.type}`);
        });
    }
    async exportSite(pages, globalData, options = {}) {
        const startTime = performance.now();
        logger_1.logger.info('StaticExportV3', 'exportSite', '📦 Début de l\'export V3', {
            pagesCount: pages.length,
            options
        });
        const result = {
            success: true,
            files: new Map(),
            errors: [],
            warnings: [],
            stats: {
                totalPages: pages.length,
                totalBlocks: 0,
                totalSize: 0,
                renderTime: 0,
                v2BlocksConverted: 0,
                v3BlocksRendered: 0
            }
        };
        try {
            // Exporter chaque page
            for (const page of pages) {
                logger_1.logger.info('StaticExportV3', 'exportSite', `📄 Export de la page: ${page.name}`, {
                    slug: page.slug,
                    blocksCount: page.blocks.length
                });
                const pageResult = await this.exportPage(page, globalData, options);
                if (pageResult.success) {
                    result.files.set(pageResult.filename, pageResult.html);
                    result.stats.totalBlocks += pageResult.blocksCount;
                    result.stats.v2BlocksConverted += pageResult.v2BlocksConverted;
                    result.stats.v3BlocksRendered += pageResult.v3BlocksRendered;
                }
                else {
                    result.errors.push(...pageResult.errors);
                    result.warnings.push(...pageResult.warnings);
                }
            }
            // Générer les fichiers globaux
            await this.generateGlobalFiles(result, globalData, options);
            // Calculer les stats finales
            result.stats.renderTime = performance.now() - startTime;
            result.stats.totalSize = Array.from(result.files.values())
                .reduce((acc, content) => acc + content.length, 0);
            logger_1.logger.info('StaticExportV3', 'exportSite', '✅ Export V3 terminé', result.stats);
        }
        catch (error) {
            logger_1.logger.error('StaticExportV3', 'exportSite', '❌ Erreur lors de l\'export', error);
            result.success = false;
            result.errors.push({
                type: 'export',
                message: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
        return result;
    }
    async exportPage(page, globalData, options) {
        const startTime = performance.now();
        logger_1.logger.debug('StaticExportV3', 'exportPage', 'Export de page', {
            pageId: page.id,
            slug: page.slug
        });
        const result = {
            success: true,
            filename: `${page.slug === '/' ? 'index' : page.slug}.html`,
            html: '',
            blocksCount: page.blocks.length,
            v2BlocksConverted: 0,
            v3BlocksRendered: 0,
            errors: [],
            warnings: []
        };
        try {
            // Convertir les blocs V2 en V3
            const v3Blocks = [];
            for (const v2Block of page.blocks) {
                logger_1.logger.debug('StaticExportV3', 'exportPage', `🔄 Conversion bloc V2: ${v2Block.type}`);
                const v3Block = this.adapter.convertBlock(v2Block);
                if (v3Block) {
                    v3Blocks.push(v3Block);
                    result.v2BlocksConverted++;
                }
                else {
                    logger_1.logger.warn('StaticExportV3', 'exportPage', `⚠️ Bloc non converti: ${v2Block.type}`);
                    result.warnings.push({
                        blockId: v2Block.id,
                        type: 'conversion',
                        message: `Bloc ${v2Block.type} non supporté en V3`
                    });
                }
            }
            // Rendre tous les blocs V3
            const renderResults = [];
            const context = {
                page: {
                    id: page.id,
                    slug: page.slug,
                    name: page.name
                },
                globalData,
                format: options.format || 'static'
            };
            for (const block of v3Blocks) {
                const renderResult = await this.engine.renderBlock(block, context);
                renderResults.push(renderResult);
                if (renderResult.errors.length === 0) {
                    result.v3BlocksRendered++;
                }
                result.errors.push(...renderResult.errors);
                result.warnings.push(...renderResult.warnings);
            }
            // Assembler le HTML
            result.html = this.assembleHTML(page, renderResults, options);
            logger_1.logger.info('StaticExportV3', 'exportPage', `✅ Page exportée: ${page.name}`, {
                renderTime: performance.now() - startTime,
                blocksRendered: result.v3BlocksRendered,
                errorsCount: result.errors.length
            });
        }
        catch (error) {
            logger_1.logger.error('StaticExportV3', 'exportPage', '❌ Erreur export page', error);
            result.success = false;
            result.errors.push({
                type: 'page',
                message: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
        return result;
    }
    assembleHTML(page, renderResults, options) {
        logger_1.logger.debug('StaticExportV3', 'assembleHTML', 'Assemblage HTML', {
            pageSlug: page.slug,
            blocksCount: renderResults.length
        });
        // Collecter tous les CSS et JS
        const allCSS = renderResults.map(r => r.css).filter(Boolean).join('\n\n');
        const allJS = renderResults.map(r => r.js).filter(Boolean).join('\n\n');
        const allHTML = renderResults.map(r => r.html).join('\n\n');
        // Template HTML
        const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo?.title || page.name}</title>
  ${page.seo?.description ? `<meta name="description" content="${page.seo.description}">` : ''}
  ${page.seo?.keywords ? `<meta name="keywords" content="${page.seo.keywords}">` : ''}
  
  <!-- V3 Export Meta -->
  <meta name="generator" content="AWEMA Studio V3">
  <meta name="export-date" content="${new Date().toISOString()}">
  
  ${options.inlineCSS ? `
  <style>
    /* Reset CSS */
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    
    /* Variables globales */
    :root {
      --primary: #3b82f6;
      --secondary: #10b981;
      --text: #1f2937;
      --text-secondary: #6b7280;
      --bg-elevated: #ffffff;
      --border: #e5e7eb;
    }
    
    /* Styles des blocs */
    ${allCSS}
  </style>
  ` : '<link rel="stylesheet" href="styles.css">'}
</head>
<body>
  <!-- Page: ${page.name} -->
  ${allHTML}
  
  ${options.inlineJS ? `
  <script>
    // V3 Runtime
    ${allJS}
  </script>
  ` : '<script src="scripts.js"></script>'}
  
  <!-- V3 Debug Info -->
  <script>
    console.log('🚀 AWEMA V3 - Page chargée');
    console.log('📊 Stats:', {
      blocks: ${renderResults.length},
      errors: ${renderResults.reduce((acc, r) => acc + r.errors.length, 0)},
      warnings: ${renderResults.reduce((acc, r) => acc + r.warnings.length, 0)}
    });
  </script>
</body>
</html>`;
        // Minifier si demandé
        if (options.minify) {
            return this.minifyHTML(html);
        }
        return html;
    }
    async generateGlobalFiles(result, globalData, options) {
        logger_1.logger.debug('StaticExportV3', 'generateGlobalFiles', 'Génération fichiers globaux');
        // Si les CSS/JS ne sont pas inline, créer les fichiers
        if (!options.inlineCSS) {
            // TODO: Collecter tous les CSS
            result.files.set('styles.css', '/* V3 Styles */');
        }
        if (!options.inlineJS) {
            // TODO: Collecter tous les JS
            result.files.set('scripts.js', '/* V3 Scripts */');
        }
        // Ajouter robots.txt
        result.files.set('robots.txt', `User-agent: *
Allow: /

Sitemap: /sitemap.xml`);
        // Ajouter sitemap.xml
        const sitemap = this.generateSitemap(Array.from(result.files.keys()));
        result.files.set('sitemap.xml', sitemap);
        // Ajouter manifest.json pour PWA
        const manifest = {
            name: globalData.siteName || 'Site Web',
            short_name: globalData.siteName || 'Site',
            start_url: '/',
            display: 'standalone',
            theme_color: '#3b82f6',
            background_color: '#ffffff'
        };
        result.files.set('manifest.json', JSON.stringify(manifest, null, 2));
    }
    generateSitemap(filenames) {
        const urls = filenames
            .filter(f => f.endsWith('.html'))
            .map(f => `  <url>
    <loc>/${f}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${f === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>`)
            .join('\n');
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
    }
    minifyHTML(html) {
        // Minification simple
        return html
            .replace(/\n\s*/g, ' ')
            .replace(/>\s+</g, '><')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }
    // Méthode pour obtenir les logs
    getLogs() {
        return logger_1.logger.getLogs();
    }
    // Méthode pour effacer les logs
    clearLogs() {
        logger_1.logger.clear();
    }
}
exports.StaticExportV3 = StaticExportV3;

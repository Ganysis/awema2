/**
 * Export Statique V3 - Export robuste avec logs détaillés
 */

import { RenderEngineV3 } from '../core/render-engine-with-logs';
import { V2ToV3Adapter } from '../adapters/v2-to-v3.adapter';
import { logger } from '../core/logger';

// Import des renderers
import { HeroRendererV3 } from '../renderers/hero.renderer';
import { ContactRendererV3 } from '../renderers/contact.renderer';
import { FeaturesRendererV3 } from '../renderers/features.renderer';
import { GalleryRendererV3 } from '../renderers/gallery.renderer';
import { FAQRendererV3 } from '../renderers/faq.renderer';
import { PricingRendererV3 } from '../renderers/pricing.renderer';
import { CTARendererV3 } from '../renderers/cta.renderer';
import { ContentRendererV3 } from '../renderers/content.renderer';
import { ServicesRendererV3 } from '../renderers/services.renderer';
import { TestimonialsRendererV3 } from '../renderers/testimonials.renderer';

// Types
import { BlockData, RenderContext } from '../types';

interface Page {
  id: string;
  name: string;
  slug: string;
  blocks: any[]; // V2 blocks
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

interface ExportOptions {
  minify?: boolean;
  inlineCSS?: boolean;
  inlineJS?: boolean;
  optimize?: boolean;
  format?: 'static' | 'nextjs' | 'gatsby' | 'nuxt';
}

interface ExportResult {
  success: boolean;
  files: Map<string, string>;
  errors: any[];
  warnings: any[];
  stats: {
    totalPages: number;
    totalBlocks: number;
    totalSize: number;
    renderTime: number;
    v2BlocksConverted: number;
    v3BlocksRendered: number;
  };
}

export class StaticExportV3 {
  private engine: RenderEngineV3;
  private adapter: V2ToV3Adapter;
  
  constructor() {
    logger.info('StaticExportV3', 'constructor', '🚀 Initialisation de l\'export V3');
    
    this.engine = new RenderEngineV3();
    this.adapter = new V2ToV3Adapter();
    
    // Enregistrer tous les renderers
    this.registerRenderers();
  }
  
  private registerRenderers(): void {
    logger.debug('StaticExportV3', 'registerRenderers', 'Enregistrement des renderers');
    
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
      logger.debug('StaticExportV3', 'registerRenderers', `✅ Renderer enregistré: ${renderer.type}`);
    });
  }
  
  async exportSite(
    pages: Page[],
    globalData: any,
    options: ExportOptions = {}
  ): Promise<ExportResult> {
    const startTime = performance.now();
    
    logger.info('StaticExportV3', 'exportSite', '📦 Début de l\'export V3', {
      pagesCount: pages.length,
      options
    });
    
    const result: ExportResult = {
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
        logger.info('StaticExportV3', 'exportSite', `📄 Export de la page: ${page.name}`, {
          slug: page.slug,
          blocksCount: page.blocks.length
        });
        
        const pageResult = await this.exportPage(page, globalData, options);
        
        if (pageResult.success) {
          result.files.set(pageResult.filename, pageResult.html);
          result.stats.totalBlocks += pageResult.blocksCount;
          result.stats.v2BlocksConverted += pageResult.v2BlocksConverted;
          result.stats.v3BlocksRendered += pageResult.v3BlocksRendered;
        } else {
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
      
      logger.info('StaticExportV3', 'exportSite', '✅ Export V3 terminé', result.stats);
      
    } catch (error) {
      logger.error('StaticExportV3', 'exportSite', '❌ Erreur lors de l\'export', error as Error);
      result.success = false;
      result.errors.push({
        type: 'export',
        message: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
    
    return result;
  }
  
  private async exportPage(
    page: Page,
    globalData: any,
    options: ExportOptions
  ): Promise<any> {
    const startTime = performance.now();
    
    logger.debug('StaticExportV3', 'exportPage', 'Export de page', {
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
      const v3Blocks: BlockData[] = [];
      
      for (const v2Block of page.blocks) {
        logger.debug('StaticExportV3', 'exportPage', `🔄 Conversion bloc V2: ${v2Block.type}`);
        
        const v3Block = this.adapter.convertBlock(v2Block);
        
        if (v3Block) {
          v3Blocks.push(v3Block);
          result.v2BlocksConverted++;
        } else {
          logger.warn('StaticExportV3', 'exportPage', `⚠️ Bloc non converti: ${v2Block.type}`);
          result.warnings.push({
            blockId: v2Block.id,
            type: 'conversion',
            message: `Bloc ${v2Block.type} non supporté en V3`
          });
        }
      }
      
      // Rendre tous les blocs V3
      const renderResults = [];
      const context: RenderContext = {
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
      
      logger.info('StaticExportV3', 'exportPage', `✅ Page exportée: ${page.name}`, {
        renderTime: performance.now() - startTime,
        blocksRendered: result.v3BlocksRendered,
        errorsCount: result.errors.length
      });
      
    } catch (error) {
      logger.error('StaticExportV3', 'exportPage', '❌ Erreur export page', error as Error);
      result.success = false;
      result.errors.push({
        type: 'page',
        message: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
    
    return result;
  }
  
  private assembleHTML(
    page: Page,
    renderResults: any[],
    options: ExportOptions
  ): string {
    logger.debug('StaticExportV3', 'assembleHTML', 'Assemblage HTML', {
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
  
  private async generateGlobalFiles(
    result: ExportResult,
    globalData: any,
    options: ExportOptions
  ): Promise<void> {
    logger.debug('StaticExportV3', 'generateGlobalFiles', 'Génération fichiers globaux');
    
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
  
  private generateSitemap(filenames: string[]): string {
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
  
  private minifyHTML(html: string): string {
    // Minification simple
    return html
      .replace(/\n\s*/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  
  // Méthode pour obtenir les logs
  getLogs() {
    return logger.getLogs();
  }
  
  // Méthode pour effacer les logs
  clearLogs() {
    logger.clear();
  }
}
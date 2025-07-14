/**
 * Export Service V3 - Export robuste et optimisé
 */

import { RenderEngineV3 } from '../core/render-engine';
import { 
  ExportOptionsV3, 
  ExportResultV3, 
  ExportedFile,
  BlockData,
  ThemeV3
} from '../types';
import { z } from 'zod';

export class ExportServiceV3 {
  private renderEngine: RenderEngineV3;
  
  constructor(renderEngine: RenderEngineV3) {
    this.renderEngine = renderEngine;
  }

  /**
   * Exporte un projet complet
   */
  async export(
    project: any,
    options: ExportOptionsV3
  ): Promise<ExportResultV3> {
    const startTime = performance.now();
    const errors: any[] = [];
    
    try {
      console.log('[ExportV3] Début de l\'export...');
      
      // 1. Valider et préparer les données
      const { blocks, theme, pages, businessInfo } = await this.prepareProjectData(project);
      
      // 2. Rendre tous les blocs
      const renderResults = await this.renderEngine.renderBlocks(blocks);
      
      // 3. Générer les fichiers
      const files: ExportedFile[] = [];
      
      // Page principale
      const indexHtml = await this.generateIndexHTML({
        blocks: renderResults,
        theme,
        businessInfo,
        options
      });
      
      files.push({
        path: 'index.html',
        content: options.optimization.minifyHTML ? this.minifyHTML(indexHtml) : indexHtml,
        type: 'text/html',
        size: indexHtml.length,
        encoding: 'utf8'
      });
      
      // CSS combiné
      const combinedCSS = this.combineCSS(renderResults.map(r => r.css));
      const finalCSS = options.optimization.minifyCSS ? this.minifyCSS(combinedCSS) : combinedCSS;
      
      if (!options.optimization.inlineCSS) {
        files.push({
          path: 'assets/css/styles.css',
          content: finalCSS,
          type: 'text/css',
          size: finalCSS.length,
          encoding: 'utf8'
        });
      }
      
      // JS combiné
      const combinedJS = this.combineJS(renderResults.map(r => r.js));
      const finalJS = options.optimization.minifyJS ? this.minifyJS(combinedJS) : combinedJS;
      
      if (!options.optimization.inlineJS && finalJS.trim()) {
        files.push({
          path: 'assets/js/main.js',
          content: finalJS,
          type: 'text/javascript',
          size: finalJS.length,
          encoding: 'utf8'
        });
      }
      
      // Assets (images, fonts, etc.)
      const assets = await this.collectAssets(renderResults);
      for (const asset of assets) {
        files.push({
          path: `assets/${asset.type}s/${asset.path}`,
          content: asset.content || '',
          type: this.getMimeType(asset.path),
          size: asset.size || 0,
          encoding: 'binary'
        });
      }
      
      // Fichiers additionnels
      if (options.features.cms) {
        files.push(...await this.generateCMSFiles(project, options));
      }
      
      if (options.features.sitemap) {
        files.push(this.generateSitemap(pages, businessInfo));
      }
      
      if (options.features.robots) {
        files.push(this.generateRobotsTxt(businessInfo));
      }
      
      if (options.features.pwa) {
        files.push(...this.generatePWAFiles(businessInfo));
      }
      
      // 4. Créer le manifest
      const manifest = {
        version: '3.0.0',
        created: new Date(),
        pages: pages.map(p => p.slug),
        assets: assets.map(a => a.path),
        totalSize: files.reduce((sum, f) => sum + f.size, 0),
        checksum: await this.generateChecksum(files)
      };
      
      // 5. Générer le rapport
      const report = {
        performance: {
          totalTime: performance.now() - startTime,
          renderTime: renderResults.reduce((sum, r) => sum + r.performance.renderTime, 0),
          optimizationTime: 0, // TODO
          fileWriteTime: 0, // TODO
        },
        sizes: {
          html: files.filter(f => f.type.includes('html')).reduce((sum, f) => sum + f.size, 0),
          css: finalCSS.length,
          js: finalJS.length,
          images: assets.filter(a => a.type === 'image').reduce((sum, a) => sum + (a.size || 0), 0),
          total: files.reduce((sum, f) => sum + f.size, 0),
        },
        optimization: {
          htmlMinified: 0, // TODO: calculer la réduction
          cssMinified: 0,
          jsMinified: 0,
          imagesOptimized: 0,
        },
        seo: await this.analyzeSEO(indexHtml, businessInfo),
      };
      
      return {
        success: true,
        files,
        manifest,
        report,
        errors
      };
      
    } catch (error) {
      console.error('[ExportV3] Erreur:', error);
      
      return {
        success: false,
        files: [],
        manifest: {} as any,
        report: {} as any,
        errors: [{
          type: 'export',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          details: error
        }]
      };
    }
  }

  /**
   * Prépare les données du projet
   */
  private async prepareProjectData(project: any) {
    // Transformer les données du projet en BlockData[]
    const blocks: BlockData[] = [];
    
    // Header global
    if (project.globalHeader) {
      blocks.push(this.transformToBlockData(project.globalHeader));
    }
    
    // Blocs de la page principale
    const mainPage = project.pages?.find(p => p.slug === '/') || project.pages?.[0];
    if (mainPage?.blocks) {
      blocks.push(...mainPage.blocks.map(b => this.transformToBlockData(b)));
    }
    
    // Footer global
    if (project.globalFooter) {
      blocks.push(this.transformToBlockData(project.globalFooter));
    }
    
    return {
      blocks,
      theme: project.theme || this.getDefaultTheme(),
      pages: project.pages || [],
      businessInfo: project.businessInfo || {}
    };
  }

  /**
   * Transforme un bloc en BlockData V3
   */
  private transformToBlockData(block: any): BlockData {
    return {
      meta: {
        id: block.id || crypto.randomUUID(),
        type: block.type,
        version: '3.0.0',
        created: new Date(),
        modified: new Date(),
        validationStatus: 'valid',
      },
      data: block.props || {}
    };
  }

  /**
   * Génère le HTML principal
   */
  private async generateIndexHTML({ blocks, theme, businessInfo, options }: any): Promise<string> {
    const html = blocks.map(r => r.html).join('\n');
    const inlineCSS = options.optimization.inlineCSS ? this.combineCSS(blocks.map(r => r.css)) : '';
    const inlineJS = options.optimization.inlineJS ? this.combineJS(blocks.map(r => r.js)) : '';
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.name || 'Mon Site'}</title>
    <meta name="description" content="${businessInfo.description || 'Site web professionnel'}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <!-- Theme -->
    ${this.generateThemeCSS(theme)}
    
    ${options.optimization.inlineCSS ? `<style>${inlineCSS}</style>` : '<link rel="stylesheet" href="/assets/css/styles.css">'}
    
    ${options.features.analytics ? this.generateAnalytics(options) : ''}
</head>
<body>
    ${html}
    
    ${options.optimization.inlineJS ? `<script>${inlineJS}</script>` : '<script src="/assets/js/main.js"></script>'}
</body>
</html>`;
  }

  /**
   * Génère le CSS du thème
   */
  private generateThemeCSS(theme: ThemeV3): string {
    return `<style>
:root {
  /* Colors */
  --color-primary-50: ${theme.colors.primary[50]};
  --color-primary-100: ${theme.colors.primary[100]};
  --color-primary-200: ${theme.colors.primary[200]};
  --color-primary-300: ${theme.colors.primary[300]};
  --color-primary-400: ${theme.colors.primary[400]};
  --color-primary-500: ${theme.colors.primary[500]};
  --color-primary-600: ${theme.colors.primary[600]};
  --color-primary-700: ${theme.colors.primary[700]};
  --color-primary-800: ${theme.colors.primary[800]};
  --color-primary-900: ${theme.colors.primary[900]};
  
  /* Shortcuts */
  --primary: var(--color-primary-500);
  --secondary: var(--color-secondary-500);
  --accent: var(--color-accent-500);
  
  /* Typography */
  --font-heading: ${theme.typography.fonts.heading};
  --font-body: ${theme.typography.fonts.body};
  --font-mono: ${theme.typography.fonts.mono};
  
  /* Spacing */
  --space-unit: ${theme.spacing.unit}px;
}
</style>`;
  }

  /**
   * Combine CSS en éliminant les doublons
   */
  private combineCSS(cssArray: string[]): string {
    // Utiliser un Set pour éliminer les doublons
    const seen = new Set<string>();
    const combined: string[] = [];
    
    cssArray.forEach(css => {
      if (css && !seen.has(css)) {
        seen.add(css);
        combined.push(css);
      }
    });
    
    return combined.join('\n\n');
  }

  /**
   * Combine JS de manière sûre
   */
  private combineJS(jsArray: string[]): string {
    return jsArray
      .filter(js => js && js.trim())
      .map(js => `(function() {\n${js}\n})();`)
      .join('\n\n');
  }

  /**
   * Collecte tous les assets
   */
  private async collectAssets(renderResults: any[]): Promise<any[]> {
    const assets: any[] = [];
    
    renderResults.forEach(result => {
      if (result.assets) {
        assets.push(...result.assets);
      }
    });
    
    // Éliminer les doublons
    const uniqueAssets = new Map();
    assets.forEach(asset => {
      uniqueAssets.set(asset.path, asset);
    });
    
    return Array.from(uniqueAssets.values());
  }

  /**
   * Génère les fichiers CMS
   */
  private async generateCMSFiles(project: any, options: ExportOptionsV3): Promise<ExportedFile[]> {
    // TODO: Implémenter la génération CMS
    return [{
      path: 'admin/index.html',
      content: '<h1>CMS V3</h1>',
      type: 'text/html',
      size: 100,
      encoding: 'utf8'
    }];
  }

  /**
   * Génère le sitemap
   */
  private generateSitemap(pages: any[], businessInfo: any): ExportedFile {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>https://${businessInfo.domain || 'example.com'}${page.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    return {
      path: 'sitemap.xml',
      content: sitemap,
      type: 'application/xml',
      size: sitemap.length,
      encoding: 'utf8'
    };
  }

  /**
   * Génère robots.txt
   */
  private generateRobotsTxt(businessInfo: any): ExportedFile {
    const robots = `User-agent: *
Allow: /

Sitemap: https://${businessInfo.domain || 'example.com'}/sitemap.xml`;
    
    return {
      path: 'robots.txt',
      content: robots,
      type: 'text/plain',
      size: robots.length,
      encoding: 'utf8'
    };
  }

  /**
   * Génère les fichiers PWA
   */
  private generatePWAFiles(businessInfo: any): ExportedFile[] {
    // TODO: Implémenter manifest.json et service worker
    return [];
  }

  /**
   * Analyse SEO
   */
  private async analyzeSEO(html: string, businessInfo: any) {
    // TODO: Implémenter l'analyse SEO
    return {
      score: 85,
      issues: [],
      suggestions: []
    };
  }

  /**
   * Minification HTML
   */
  private minifyHTML(html: string): string {
    // Simple minification - en production utiliser un vrai minifier
    return html
      .replace(/\n\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  /**
   * Minification CSS
   */
  private minifyCSS(css: string): string {
    // Simple minification
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n\s+/g, ' ')
      .replace(/:\s+/g, ':')
      .replace(/;\s+/g, ';')
      .trim();
  }

  /**
   * Minification JS
   */
  private minifyJS(js: string): string {
    // Simple minification
    return js
      .replace(/\/\/.*$/gm, '')
      .replace(/\n\s+/g, ' ')
      .trim();
  }

  /**
   * Génère un checksum
   */
  private async generateChecksum(files: ExportedFile[]): Promise<string> {
    // Simple checksum basé sur la taille
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    return totalSize.toString(16);
  }

  /**
   * Obtient le type MIME
   */
  private getMimeType(path: string): string {
    const ext = path.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'text/javascript',
      'json': 'application/json',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
      'woff': 'font/woff',
      'woff2': 'font/woff2',
    };
    
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  /**
   * Obtient le thème par défaut
   */
  private getDefaultTheme(): ThemeV3 {
    return {
      id: 'default',
      name: 'Default Theme',
      colors: {
        primary: this.generateColorScale('#3b82f6'),
        secondary: this.generateColorScale('#10b981'),
        accent: this.generateColorScale('#f59e0b'),
        gray: this.generateColorScale('#6b7280'),
        success: this.generateColorScale('#10b981'),
        warning: this.generateColorScale('#f59e0b'),
        error: this.generateColorScale('#ef4444'),
        info: this.generateColorScale('#3b82f6'),
        background: {
          default: '#ffffff',
          paper: '#f9fafb',
          elevated: '#ffffff'
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          disabled: '#9ca3af',
          inverse: '#ffffff'
        }
      },
      typography: {
        fonts: {
          heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          mono: 'Menlo, Monaco, Consolas, monospace'
        },
        sizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem'
        },
        weights: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800
        },
        lineHeights: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75
        }
      },
      spacing: {
        unit: 4,
        scale: {
          0: 0,
          1: 4,
          2: 8,
          3: 12,
          4: 16,
          5: 20,
          6: 24,
          8: 32,
          10: 40,
          12: 48,
          16: 64,
          20: 80,
          24: 96,
          32: 128,
          40: 160,
          48: 192,
          56: 224,
          64: 256
        }
      },
      components: {
        button: {
          borderRadius: '0.5rem',
          padding: { x: '1.5rem', y: '0.75rem' },
          fontSize: '1rem',
          fontWeight: 500
        },
        card: {
          borderRadius: '0.75rem',
          padding: '1.5rem',
          shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        },
        input: {
          borderRadius: '0.375rem',
          padding: { x: '1rem', y: '0.75rem' },
          borderWidth: '1px'
        }
      }
    };
  }

  /**
   * Génère une échelle de couleur
   */
  private generateColorScale(baseColor: string): any {
    // Simple échelle - en production utiliser une vraie génération
    return {
      50: baseColor + '10',
      100: baseColor + '20',
      200: baseColor + '40',
      300: baseColor + '60',
      400: baseColor + '80',
      500: baseColor,
      600: baseColor + 'dd',
      700: baseColor + 'bb',
      800: baseColor + '99',
      900: baseColor + '77',
      950: baseColor + '55'
    };
  }

  /**
   * Génère le code Analytics
   */
  private generateAnalytics(options: ExportOptionsV3): string {
    // TODO: Implémenter GA4, GTM, etc.
    return '';
  }
}
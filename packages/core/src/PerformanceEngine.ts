import { GeneratorContext } from '@awema/shared';
import { minify as htmlMinify } from 'html-minifier-terser';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { minify as terserMinify } from 'terser';

export class PerformanceEngine {
  async optimizeHTML(html: string, context: GeneratorContext): Promise<string> {
    const { performance } = context.config;
    
    if (!performance.optimization.minifyHTML) {
      return html;
    }

    try {
      const optimized = await htmlMinify(html, {
        collapseWhitespace: true,
        removeComments: performance.optimization.removeComments,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: performance.optimization.minifyCSS,
        minifyJS: performance.optimization.minifyJS,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        sortAttributes: true,
        sortClassName: true
      });

      return optimized;
    } catch (error) {
      console.error('HTML optimization failed:', error);
      return html;
    }
  }

  async optimizeCSS(css: string, context: GeneratorContext): Promise<string> {
    const { performance } = context.config;
    
    if (!performance.optimization.minifyCSS) {
      return css;
    }

    try {
      // Process with PostCSS
      const plugins = [];
      
      // Add autoprefixer
      if (performance.styles.autoprefixer) {
        plugins.push(autoprefixer({
          overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
        }));
      }
      
      // Add cssnano for minification
      plugins.push(cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: performance.optimization.removeComments
          },
          normalizeWhitespace: performance.optimization.removeWhitespace,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceIdents: true,
          uniqueSelectors: true,
          calc: true,
          zindex: false
        }]
      }));

      const result = await postcss(plugins).process(css, {
        from: undefined
      });

      return result.css;
    } catch (error) {
      console.error('CSS optimization failed:', error);
      return css;
    }
  }

  async optimizeJS(js: string, context: GeneratorContext): Promise<string> {
    const { performance } = context.config;
    
    if (!performance.optimization.minifyJS) {
      return js;
    }

    try {
      const result = await terserMinify(js, {
        compress: {
          drop_console: context.config.environment === 'production',
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug'],
          passes: 2,
          ecma: 2015
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: !performance.optimization.removeComments,
          ecma: 2015
        },
        sourceMap: performance.scripts.sourceMaps
      });

      return result.code || js;
    } catch (error) {
      console.error('JS optimization failed:', error);
      return js;
    }
  }

  generateCacheHeaders(_fileType: string, context: GeneratorContext): Record<string, string> {
    const { caching } = context.config.performance;
    
    if (!caching.enabled) {
      return {};
    }

    const headers: Record<string, string> = {};
    
    // Set Cache-Control header
    const directives: string[] = [];
    
    if (caching.public) {
      directives.push('public');
    } else {
      directives.push('private');
    }
    
    if (caching.maxAge > 0) {
      directives.push(`max-age=${caching.maxAge}`);
    }
    
    if (caching.staleWhileRevalidate) {
      directives.push(`stale-while-revalidate=${caching.staleWhileRevalidate}`);
    }
    
    if (caching.mustRevalidate) {
      directives.push('must-revalidate');
    }
    
    if (caching.immutable) {
      directives.push('immutable');
    }
    
    headers['Cache-Control'] = directives.join(', ');
    
    // Set Vary headers
    if (caching.varyHeaders && caching.varyHeaders.length > 0) {
      headers['Vary'] = caching.varyHeaders.join(', ');
    }
    
    // Set ETag
    headers['ETag'] = `"${Date.now()}"`;
    
    return headers;
  }

  generateResourceHints(context: GeneratorContext): string[] {
    const { preloading } = context.config.performance;
    const hints: string[] = [];
    
    // DNS prefetch
    if (preloading.dnsPrefetch.length > 0) {
      preloading.dnsPrefetch.forEach(domain => {
        hints.push(`<link rel="dns-prefetch" href="${domain}">`);
      });
    }
    
    // Preconnect
    if (preloading.preconnect.length > 0) {
      preloading.preconnect.forEach(domain => {
        hints.push(`<link rel="preconnect" href="${domain}" crossorigin>`);
      });
    }
    
    return hints;
  }

  calculatePerformanceScore(metrics: {
    fcp: number; // First Contentful Paint
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte
  }): number {
    // Lighthouse v8 scoring
    const fcpScore = this.getMetricScore(metrics.fcp, [1800, 3000]);
    const lcpScore = this.getMetricScore(metrics.lcp, [2500, 4000]);
    const fidScore = this.getMetricScore(metrics.fid, [100, 300]);
    const clsScore = this.getMetricScore(metrics.cls, [0.1, 0.25]);
    const ttfbScore = this.getMetricScore(metrics.ttfb, [800, 1800]);
    
    // Weighted average (Lighthouse weights)
    const score = (
      fcpScore * 0.10 +
      lcpScore * 0.25 +
      fidScore * 0.10 +
      clsScore * 0.15 +
      ttfbScore * 0.40
    ) * 100;
    
    return Math.round(score);
  }

  private getMetricScore(value: number, [good, poor]: [number, number]): number {
    if (value <= good) return 1;
    if (value >= poor) return 0;
    
    // Linear interpolation between good and poor
    return 1 - ((value - good) / (poor - good));
  }

  generatePerformanceReport(context: GeneratorContext): string {
    const report = {
      timestamp: new Date().toISOString(),
      project: context.project.name,
      metrics: context.metrics,
      recommendations: this.getRecommendations(context),
      optimizations: {
        html: context.config.performance.optimization.minifyHTML,
        css: context.config.performance.optimization.minifyCSS,
        js: context.config.performance.optimization.minifyJS,
        images: context.config.performance.images.webp && context.config.performance.images.avif,
        criticalCSS: context.config.performance.optimization.criticalCSS,
        lazyLoading: context.config.performance.optimization.lazyLoading
      }
    };
    
    return JSON.stringify(report, null, 2);
  }

  private getRecommendations(context: GeneratorContext): string[] {
    const recommendations: string[] = [];
    const { performance } = context.config;
    
    if (!performance.optimization.minifyHTML) {
      recommendations.push('Enable HTML minification to reduce file size');
    }
    
    if (!performance.optimization.criticalCSS) {
      recommendations.push('Enable critical CSS extraction to improve initial render');
    }
    
    if (!performance.images.webp || !performance.images.avif) {
      recommendations.push('Enable modern image formats (WebP/AVIF) for better compression');
    }
    
    if (!performance.compression.brotli) {
      recommendations.push('Enable Brotli compression for better text compression');
    }
    
    if (!performance.optimization.lazyLoading) {
      recommendations.push('Enable lazy loading for images and videos');
    }
    
    if (!performance.fonts.subset) {
      recommendations.push('Enable font subsetting to reduce font file sizes');
    }
    
    if (performance.caching.maxAge < 86400) {
      recommendations.push('Increase cache duration for static assets');
    }
    
    return recommendations;
  }
}
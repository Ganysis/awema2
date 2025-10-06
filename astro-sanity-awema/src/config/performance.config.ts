/**
 * Performance Configuration for Core Web Vitals Optimization
 */

export const performanceConfig = {
  // Resource Hints Configuration
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.sanity.io',
    ],
    dnsPrefetch: [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://vitals.vercel-insights.com',
    ],
    prefetch: [
      // Add critical resources that should be prefetched
    ],
    preload: [
      // Critical fonts, CSS, or JS files
    ]
  },

  // Image Optimization Settings
  imageOptimization: {
    formats: ['avif', 'webp', 'jpg'],
    defaultFormat: 'webp',
    quality: {
      avif: 65,
      webp: 80,
      jpg: 85
    },
    breakpoints: [320, 640, 768, 1024, 1280, 1536, 1920, 2560],
    lazyLoadRootMargin: '50px 0px',
    lazyLoadThreshold: 0.01,
    aspectRatios: {
      hero: '16/9',
      card: '4/3',
      square: '1/1',
      portrait: '3/4'
    },
    // Sizes for responsive images
    sizes: {
      default: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      hero: '100vw',
      card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
      thumbnail: '(max-width: 768px) 50vw, 25vw'
    }
  },

  // Critical Path Configuration
  criticalPath: {
    // Pages that need critical CSS extraction
    pages: ['/', '/pricing', '/contact', '/about'],
    // Inline critical CSS size limit (in KB)
    inlineSizeLimit: 14,
    // Extract critical CSS for these viewports
    viewports: [
      { width: 414, height: 896 }, // Mobile
      { width: 1920, height: 1080 } // Desktop
    ]
  },

  // Cache Strategies
  cacheStrategies: {
    // Static assets (images, fonts)
    static: {
      maxAge: 31536000, // 1 year
      immutable: true
    },
    // CSS and JS files
    assets: {
      maxAge: 31536000, // 1 year
      immutable: true,
      sMaxAge: 31536000
    },
    // HTML pages
    html: {
      maxAge: 0,
      sMaxAge: 31536000,
      staleWhileRevalidate: 86400
    },
    // API responses
    api: {
      maxAge: 0,
      sMaxAge: 60,
      staleWhileRevalidate: 86400
    }
  },

  // Script Loading Configuration
  scriptLoading: {
    // Scripts to defer
    defer: [
      'analytics',
      'chat-widget',
      'social-share',
      'animations'
    ],
    // Scripts to load async
    async: [
      'google-analytics',
      'google-tag-manager'
    ],
    // Scripts to lazy load on user interaction
    lazyLoad: [
      'video-player',
      'maps',
      'comments'
    ]
  },

  // Performance Budgets
  performanceBudgets: {
    // Maximum sizes in KB
    javascript: 200,
    css: 100,
    images: 500,
    fonts: 150,
    total: 1000,
    // Core Web Vitals targets
    metrics: {
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100,  // First Input Delay (ms)
      cls: 0.1,  // Cumulative Layout Shift
      fcp: 1800, // First Contentful Paint (ms)
      ttfb: 800  // Time to First Byte (ms)
    }
  },

  // Optimization Features
  features: {
    // Enable/disable specific optimizations
    criticalCss: true,
    lazyLoadImages: true,
    webpGeneration: true,
    fontSubsetting: true,
    removeUnusedCss: true,
    minifyHtml: true,
    minifyCss: true,
    minifyJs: true,
    compressAssets: true,
    inlineSmallAssets: true,
    preloadFonts: true,
    optimizeImages: true,
    generateSrcset: true,
    enablePrefetch: true,
    enableServiceWorker: false,
    enablePwa: false
  },

  // Monitoring Configuration
  monitoring: {
    // Enable performance monitoring
    enabled: true,
    // Send metrics to analytics
    sendToAnalytics: true,
    // Console logging in development
    logToConsole: import.meta.env.DEV,
    // Metrics to track
    metrics: ['LCP', 'FID', 'CLS', 'FCP', 'TTFB']
  }
};

// Helper functions for performance optimization
export const performanceUtils = {
  /**
   * Get optimized image sizes based on container
   */
  getImageSizes(container: 'hero' | 'card' | 'thumbnail' | 'default' = 'default') {
    return performanceConfig.imageOptimization.sizes[container];
  },

  /**
   * Get cache headers for different resource types
   */
  getCacheHeaders(type: 'static' | 'assets' | 'html' | 'api') {
    const strategy = performanceConfig.cacheStrategies[type];
    const headers: Record<string, string> = {};

    if (strategy.maxAge !== undefined) {
      headers['Cache-Control'] = `public, max-age=${strategy.maxAge}`;

      if (strategy.sMaxAge) {
        headers['Cache-Control'] += `, s-maxage=${strategy.sMaxAge}`;
      }

      if (strategy.staleWhileRevalidate) {
        headers['Cache-Control'] += `, stale-while-revalidate=${strategy.staleWhileRevalidate}`;
      }

      if (strategy.immutable) {
        headers['Cache-Control'] += ', immutable';
      }
    }

    return headers;
  },

  /**
   * Check if a metric meets the performance budget
   */
  checkBudget(metric: string, value: number): boolean {
    const budgets = performanceConfig.performanceBudgets.metrics as any;
    if (budgets[metric.toLowerCase()]) {
      return value <= budgets[metric.toLowerCase()];
    }
    return true;
  },

  /**
   * Get preload links for critical resources
   */
  getPreloadLinks(): string[] {
    const links: string[] = [];

    // Add preconnect hints
    performanceConfig.resourceHints.preconnect.forEach(url => {
      links.push(`<link rel="preconnect" href="${url}" crossorigin>`);
    });

    // Add DNS prefetch hints
    performanceConfig.resourceHints.dnsPrefetch.forEach(url => {
      links.push(`<link rel="dns-prefetch" href="${url}">`);
    });

    return links;
  }
};

export default performanceConfig;
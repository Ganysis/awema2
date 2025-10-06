/**
 * Configuration pour garantir PageSpeed 95+ et qualité ultra
 */

export const PERFORMANCE_CONFIG = {
  // Optimisations critiques pour PageSpeed 95+
  critical: {
    // CSS critique inline (above-the-fold)
    inlineCSS: true,
    maxInlineSize: 14000, // 14KB max pour CSS critique
    
    // Éliminer le render-blocking
    asyncJS: true,
    deferNonCritical: true,
    
    // Fonts optimisées
    fontDisplay: 'swap',
    preloadFonts: true,
    systemFontFallback: true,
  },

  // Images ultra-optimisées
  images: {
    formats: ['avif', 'webp', 'jpg'], // AVIF pour ultra compression
    quality: {
      avif: 80,
      webp: 85,
      jpg: 85,
    },
    lazyLoad: true,
    placeholders: 'blur', // LQIP (Low Quality Image Placeholder)
    responsiveSizes: [320, 640, 768, 1024, 1920, 2560],
    maxWidth: 2560,
  },

  // Contraste WCAG AAA
  accessibility: {
    contrastRatio: {
      normal: 7.0,  // WCAG AAA
      large: 4.5,   // WCAG AAA pour texte large
    },
    colorBlindSafe: true,
    highContrastMode: true,
  },

  // Performance metrics cibles
  targets: {
    FCP: 1000,      // First Contentful Paint < 1s
    LCP: 2000,      // Largest Contentful Paint < 2s
    CLS: 0.05,      // Cumulative Layout Shift < 0.05
    FID: 50,        // First Input Delay < 50ms
    TTI: 3000,      // Time to Interactive < 3s
    SpeedIndex: 2000,
    
    // Poids des ressources
    maxHTMLSize: 30,    // KB
    maxCSSSize: 50,     // KB
    maxJSSize: 100,     // KB
    maxTotalSize: 300,  // KB
  },

  // Optimisations CSS
  css: {
    purgeUnused: true,
    minify: true,
    cssVariables: true, // Pour theming performant
    gridFallback: true,
    modernSyntax: false, // Éviter syntaxe trop moderne
    
    // Optimisations spécifiques
    removeComments: true,
    mergeRules: true,
    mergeMediaQueries: true,
    sortDeclarations: true,
  },

  // Optimisations HTML
  html: {
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    },
    resourceHints: true, // dns-prefetch, preconnect, etc.
  },

  // Cache stratégies
  caching: {
    staticAssets: '1 year',
    images: '1 year',
    css: '1 year',
    js: '1 year',
    html: '1 hour',
    api: 'no-cache',
  },

  // Validation qualité design
  designQuality: {
    // Matching visuel
    visualAccuracy: 0.98, // 98% de similarité minimum
    colorAccuracy: 0.95,  // 95% pour les couleurs
    layoutAccuracy: 0.99, // 99% pour le layout
    
    // Contraintes design
    minContrast: 7.0,
    maxColors: 5,        // Palette limitée pour cohérence
    gridSystem: 8,       // Système de grille 8px
    
    // Typographie
    fontScaleRatio: 1.25, // Échelle typographique harmonieuse
    maxFontFamilies: 2,   // Maximum 2 familles de polices
  },
};
/**
 * Optimisations de performance V3
 * Lazy loading, Critical CSS, préchargement intelligent
 */

// ============================================
// LAZY LOADING D'IMAGES
// ============================================

export class ImageOptimizer {
  private observer: IntersectionObserver;
  private loadedImages = new Set<string>();

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target as HTMLImageElement);
          }
        });
      },
      {
        // Charger les images 50px avant qu'elles n'entrent dans le viewport
        rootMargin: '50px',
        threshold: 0.01
      }
    );
  }

  /**
   * Observe une image pour lazy loading
   */
  observe(img: HTMLImageElement) {
    // Ajouter un placeholder flou
    if (img.dataset.src && !img.src) {
      img.classList.add('lazy-image');
      this.addPlaceholder(img);
      this.observer.observe(img);
    }
  }

  /**
   * Charge une image
   */
  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (!src || this.loadedImages.has(src)) return;

    // Précharger l'image
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      this.loadedImages.add(src);
      this.observer.unobserve(img);
      
      // Charger la version haute résolution si disponible
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    };
    
    tempImg.src = src;
  }

  /**
   * Ajoute un placeholder avec effet blur
   */
  private addPlaceholder(img: HTMLImageElement) {
    // Créer une version basse résolution
    const placeholder = img.dataset.placeholder;
    if (placeholder) {
      img.style.backgroundImage = `url(${placeholder})`;
      img.style.backgroundSize = 'cover';
      img.style.filter = 'blur(10px)';
    } else {
      // Placeholder par défaut
      img.style.backgroundColor = '#f0f0f0';
    }
  }

  /**
   * Nettoie l'observer
   */
  disconnect() {
    this.observer.disconnect();
  }
}

// ============================================
// CRITICAL CSS
// ============================================

export const criticalCSS = {
  /**
   * Extrait le CSS critique pour le rendu initial
   */
  extract(): string {
    return `
      /* Reset minimal */
      *, *::before, *::after { box-sizing: border-box; }
      * { margin: 0; padding: 0; }
      
      /* Typographie de base */
      html { font-size: 16px; line-height: 1.5; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #111827;
        background: #ffffff;
      }
      
      /* Layout de base */
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      /* Above the fold uniquement */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
      }
      
      /* Skeleton screens */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
  },

  /**
   * Injecte le CSS critique dans le head
   */
  inject(css: string) {
    const style = document.createElement('style');
    style.textContent = css;
    style.id = 'critical-css';
    document.head.insertBefore(style, document.head.firstChild);
  },

  /**
   * Charge le CSS non-critique de manière asynchrone
   */
  loadAsync(href: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = function() {
      this.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }
};

// ============================================
// RESSOURCES PRÉCHARGEMENT
// ============================================

export class ResourceHints {
  /**
   * Préconnecte aux domaines tiers
   */
  static preconnect(origins: string[]) {
    origins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Précharge les ressources critiques
   */
  static preload(resources: Array<{href: string, as: string, type?: string}>) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      document.head.appendChild(link);
    });
  }

  /**
   * Prefetch pour la navigation future
   */
  static prefetch(urls: string[]) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        urls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
      });
    }
  }
}

// ============================================
// OPTIMISATION DU RENDU
// ============================================

export const renderOptimizations = {
  /**
   * Debounce pour les événements fréquents
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function(this: any, ...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  /**
   * Throttle pour limiter les appels
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * RequestAnimationFrame pour animations fluides
   */
  rafSchedule(callback: () => void) {
    let rafId: number | null = null;
    
    return () => {
      if (rafId !== null) return;
      
      rafId = requestAnimationFrame(() => {
        callback();
        rafId = null;
      });
    };
  },

  /**
   * Virtualisation pour longues listes
   */
  virtualizeList<T>(
    items: T[],
    itemHeight: number,
    containerHeight: number,
    scrollTop: number
  ): { visible: T[], offset: number } {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
    const visible = items.slice(startIndex, endIndex);
    const offset = startIndex * itemHeight;
    
    return { visible, offset };
  }
};

// ============================================
// MÉTRIQUES DE PERFORMANCE
// ============================================

export class PerformanceMonitor {
  private marks = new Map<string, number>();

  /**
   * Marque le début d'une mesure
   */
  mark(name: string) {
    this.marks.set(name, performance.now());
  }

  /**
   * Mesure le temps écoulé
   */
  measure(name: string, startMark: string): number {
    const start = this.marks.get(startMark);
    if (!start) return 0;
    
    const duration = performance.now() - start;
    
    // Log en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  /**
   * Observe les Core Web Vitals
   */
  observeWebVitals(callback: (metric: any) => void) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback({ name: 'LCP', value: entry.startTime });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        callback({ name: 'FID', value: fid });
      }
    }).observe({ type: 'first-input', buffered: true });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          callback({ name: 'CLS', value: clsValue });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }
}

// ============================================
// CSS OPTIMISÉ
// ============================================

export const generatePerformanceCSS = () => `
  /* Images lazy loading */
  .lazy-image {
    background-color: #f0f0f0;
    transition: filter 0.3s ease-out, opacity 0.3s ease-out;
  }
  
  .lazy-image.loaded {
    filter: blur(0) !important;
  }

  /* Optimisation des fonts */
  @font-face {
    font-family: 'Inter';
    font-display: swap; /* Évite le FOIT */
    src: local('Inter'), url('/fonts/inter.woff2') format('woff2');
  }

  /* Contain pour isolation */
  .card {
    contain: layout style paint;
  }

  /* GPU acceleration hints */
  .animate {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Réduction des repaints */
  .fixed-size {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  /* Optimisation du scroll */
  .scroll-container {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  /* Éviter les layout shifts */
  img, video, iframe {
    max-width: 100%;
    height: auto;
    aspect-ratio: attr(width) / attr(height);
  }

  /* Optimisation mobile */
  @media (max-width: 768px) {
    /* Désactiver les effets coûteux sur mobile */
    .no-mobile-effects {
      box-shadow: none !important;
      filter: none !important;
    }
    
    /* Simplifier les animations */
    * {
      animation-duration: 0.2s !important;
    }
  }

  /* Mode économie de données */
  @media (prefers-reduced-data: reduce) {
    /* Pas d'images de fond */
    .bg-image {
      background-image: none !important;
      background-color: var(--primary);
    }
    
    /* Pas de fonts custom */
    body {
      font-family: system-ui, -apple-system, sans-serif !important;
    }
  }
`;

// ============================================
// CONFIGURATION RECOMMANDÉE
// ============================================

export const performanceConfig = {
  // Images
  images: {
    formats: ['webp', 'avif', 'jpeg'],
    sizes: [320, 640, 768, 1024, 1280, 1920],
    quality: 85,
    placeholder: 'blur',
  },

  // Bundles
  bundles: {
    maxSize: 200_000, // 200KB max par bundle
    splitChunks: true,
    treeshake: true,
    minify: true,
  },

  // Cache
  cache: {
    static: '1 year',
    html: '1 hour',
    api: 'no-cache',
  },

  // Préchargement
  preload: [
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
    { href: '/css/critical.css', as: 'style' },
  ],

  // Préconnexion
  preconnect: [
    'https://fonts.googleapis.com',
    'https://images.unsplash.com',
  ]
};
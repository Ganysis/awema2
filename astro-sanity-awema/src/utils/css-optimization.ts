/**
 * CSS Optimization Utilities for Core Web Vitals
 */

// Critical CSS patterns for above-the-fold content
export const criticalCSS = `
  /* Reset and base styles */
  *,::after,::before{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%;line-height:1.5}
  body{margin:0;min-height:100vh;-webkit-font-smoothing:antialiased}
  img,picture,video,canvas,svg{display:block;max-width:100%;height:auto}
  input,button,textarea,select{font:inherit}
  h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}
  p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}

  /* Layout containment */
  .container{width:100%;margin-right:auto;margin-left:auto;padding-right:1rem;padding-left:1rem}
  @media(min-width:640px){.container{max-width:640px}}
  @media(min-width:768px){.container{max-width:768px}}
  @media(min-width:1024px){.container{max-width:1024px}}
  @media(min-width:1280px){.container{max-width:1280px}}

  /* Prevent layout shifts */
  img,video{aspect-ratio:attr(width)/attr(height)}
  [data-aos]{visibility:hidden}
  [data-aos].aos-animate{visibility:visible}

  /* Font loading optimization */
  .fonts-loading body{opacity:0.9}
  .fonts-loaded body{opacity:1;transition:opacity 0.1s}

  /* Critical utilities */
  .hidden{display:none}
  .invisible{visibility:hidden}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
`;

/**
 * Extract critical CSS for a given HTML string
 */
export function extractCriticalCSS(html: string, css: string): string {
  // This is a simplified version - in production, use a library like critical or penthouse
  const usedSelectors = new Set<string>();

  // Extract all classes and IDs from HTML
  const classMatches = html.matchAll(/class="([^"]+)"/g);
  const idMatches = html.matchAll(/id="([^"]+)"/g);

  for (const match of classMatches) {
    match[1].split(' ').forEach(cls => usedSelectors.add('.' + cls));
  }

  for (const match of idMatches) {
    usedSelectors.add('#' + match[1]);
  }

  // Extract matching CSS rules
  const criticalRules: string[] = [];
  const cssRules = css.split('}');

  for (const rule of cssRules) {
    const hasUsedSelector = Array.from(usedSelectors).some(selector =>
      rule.includes(selector)
    );

    if (hasUsedSelector || rule.includes('@media') || rule.includes(':root')) {
      criticalRules.push(rule + '}');
    }
  }

  return criticalRules.join('').replace(/\s+/g, ' ').trim();
}

/**
 * Purge unused CSS from a stylesheet
 */
export function purgeUnusedCSS(css: string, htmlContent: string[]): string {
  const usedSelectors = new Set<string>();

  // Extract all possible selectors from HTML content
  htmlContent.forEach(html => {
    // Extract classes
    const classRegex = /class\s*=\s*["']([^"']+)["']/g;
    let match;
    while ((match = classRegex.exec(html)) !== null) {
      match[1].split(/\s+/).forEach(cls => {
        if (cls) usedSelectors.add(cls);
      });
    }

    // Extract IDs
    const idRegex = /id\s*=\s*["']([^"']+)["']/g;
    while ((match = idRegex.exec(html)) !== null) {
      if (match[1]) usedSelectors.add(match[1]);
    }

    // Extract tag names
    const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)/g;
    while ((match = tagRegex.exec(html)) !== null) {
      if (match[1]) usedSelectors.add(match[1].toLowerCase());
    }
  });

  // Parse CSS and keep only used rules
  const purgedCSS: string[] = [];
  const rules = css.split('}');

  for (const rule of rules) {
    if (!rule.trim()) continue;

    // Always keep keyframes, media queries, and CSS variables
    if (rule.includes('@keyframes') ||
        rule.includes('@media') ||
        rule.includes(':root') ||
        rule.includes('@supports')) {
      purgedCSS.push(rule + '}');
      continue;
    }

    // Check if rule contains any used selector
    const selectorPart = rule.split('{')[0];
    const shouldKeep = Array.from(usedSelectors).some(selector => {
      return selectorPart.includes('.' + selector) ||
             selectorPart.includes('#' + selector) ||
             selectorPart.includes(selector + ' ') ||
             selectorPart.includes(selector + ',') ||
             selectorPart.includes(selector + '{') ||
             selectorPart.includes(selector + ':') ||
             selectorPart.includes(selector + '[') ||
             selectorPart.endsWith(selector);
    });

    if (shouldKeep) {
      purgedCSS.push(rule + '}');
    }
  }

  return purgedCSS.join('').replace(/\s+/g, ' ').trim();
}

/**
 * Minify CSS
 */
export function minifyCSS(css: string): string {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around specific characters
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove empty rules
    .replace(/[^{}]+\{\s*\}/g, '')
    // Remove duplicate semicolons
    .replace(/;;+/g, ';')
    .trim();
}

/**
 * Add CSS containment for better performance
 */
export function addCSSContainment(selector: string, containTypes: string[] = ['layout', 'style', 'paint']): string {
  return `${selector}{contain:${containTypes.join(' ')}}`;
}

/**
 * Generate optimized CSS for images
 */
export function generateImageOptimizationCSS(): string {
  return `
    /* Image optimization styles */
    img {
      content-visibility: auto;
      contain-intrinsic-size: 512px;
    }

    img[loading="lazy"] {
      opacity: 0;
      transition: opacity 0.3s;
    }

    img.loaded {
      opacity: 1;
    }

    /* Responsive images */
    picture img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    /* Prevent layout shift */
    img[width][height] {
      aspect-ratio: attr(width) / attr(height);
    }
  `;
}

/**
 * Generate CSS for skeleton screens
 */
export function generateSkeletonCSS(): string {
  return `
    /* Skeleton loading styles */
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s ease-in-out infinite;
    }

    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Dark mode skeleton */
    @media (prefers-color-scheme: dark) {
      .skeleton {
        background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }
  `;
}

/**
 * CSS-in-JS utility for dynamic styles with optimal performance
 */
export class OptimizedStyleSheet {
  private styles: Map<string, string> = new Map();
  private styleElement: HTMLStyleElement | null = null;

  constructor() {
    if (typeof document !== 'undefined') {
      this.styleElement = document.createElement('style');
      this.styleElement.setAttribute('data-optimized', 'true');
      document.head.appendChild(this.styleElement);
    }
  }

  addRule(selector: string, styles: Record<string, string>): void {
    const rule = `${selector}{${Object.entries(styles)
      .map(([prop, value]) => `${this.camelToKebab(prop)}:${value}`)
      .join(';')}}`;

    this.styles.set(selector, rule);
    this.updateStyleElement();
  }

  removeRule(selector: string): void {
    this.styles.delete(selector);
    this.updateStyleElement();
  }

  private updateStyleElement(): void {
    if (this.styleElement) {
      const css = Array.from(this.styles.values()).join('');
      this.styleElement.textContent = minifyCSS(css);
    }
  }

  private camelToKebab(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  clear(): void {
    this.styles.clear();
    if (this.styleElement) {
      this.styleElement.textContent = '';
    }
  }

  destroy(): void {
    this.clear();
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
    }
  }
}

export default {
  criticalCSS,
  extractCriticalCSS,
  purgeUnusedCSS,
  minifyCSS,
  addCSSContainment,
  generateImageOptimizationCSS,
  generateSkeletonCSS,
  OptimizedStyleSheet
};
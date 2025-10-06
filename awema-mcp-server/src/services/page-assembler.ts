/**
 * Assembleur de pages - Combine tous les blocs dans le bon ordre
 */

export class PageAssembler {
  /**
   * Assemble tous les blocs en une page complète
   */
  async assemblePage(
    blocks: any[],
    options: AssemblyOptions
  ): Promise<AssembledPage> {
    // 1. Trier les blocs dans l'ordre correct
    const sortedBlocks = this.sortBlocks(blocks);
    
    // 2. Générer le HTML complet
    const html = this.generateHTML(sortedBlocks, options);
    
    // 3. Combiner tous les CSS
    const css = this.combineCSS(sortedBlocks, options);
    
    // 4. Combiner les JS si nécessaire
    const js = this.combineJS(sortedBlocks);
    
    return { html, css, js };
  }

  /**
   * Trie les blocs dans l'ordre logique d'une page
   */
  private sortBlocks(blocks: any[]): any[] {
    const order = [
      'header',
      'hero',
      'services',
      'features',
      'gallery',
      'testimonials',
      'pricing',
      'faq',
      'cta',
      'contact',
      'footer'
    ];
    
    return blocks.sort((a, b) => {
      const indexA = order.indexOf(a.type);
      const indexB = order.indexOf(b.type);
      
      // Si pas dans l'ordre, mettre à la fin
      const orderA = indexA === -1 ? 999 : indexA;
      const orderB = indexB === -1 ? 999 : indexB;
      
      return orderA - orderB;
    });
  }

  /**
   * Génère le HTML complet de la page
   */
  private generateHTML(blocks: any[], options: AssemblyOptions): string {
    const { colors, performance } = options;
    
    const htmlBlocks = blocks.map(block => block.html).join('\n');
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Site professionnel généré automatiquement">
    
    <!-- Performance -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    
    <title>Votre Site Professionnel</title>
    
    ${performance ? '' : '<link rel="stylesheet" href="styles.css">'}
</head>
<body>
    ${htmlBlocks}
    
    ${performance ? '' : '<script src="scripts.js" defer></script>'}
</body>
</html>`;
  }

  /**
   * Combine tous les CSS avec déduplication
   */
  private combineCSS(blocks: any[], options: AssemblyOptions): string {
    const { colors } = options;
    
    // CSS de base avec les variables
    const baseCSS = `
/* Variables globales */
:root {
  --primary: ${colors?.primary || '#2563eb'};
  --secondary: ${colors?.secondary || '#64748b'};
  --accent: ${colors?.accent || '#f59e0b'};
  --background: ${colors?.background || '#ffffff'};
  --text: ${colors?.text || '#1a1a1a'};
  --light: ${colors?.light || '#f8fafc'};
  --dark: ${colors?.dark || '#0f172a'};
  
  /* Spacing system */
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 1);
  --space-sm: calc(var(--space-unit) * 2);
  --space-md: calc(var(--space-unit) * 3);
  --space-lg: calc(var(--space-unit) * 4);
  --space-xl: calc(var(--space-unit) * 6);
  --space-2xl: calc(var(--space-unit) * 8);
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Reset & Base */
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--text);
  background: var(--background);
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

/* Utility classes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Performance optimizations */
.lazy {
  content-visibility: auto;
}

/* Smooth scroll pour ancres */
html:focus-within {
  scroll-behavior: smooth;
}

/* Réduction des mouvements si préférence utilisateur */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

    // Collecter tous les CSS des blocs
    const blockCSS = blocks
      .map(block => `\n/* ${block.type.toUpperCase()} Block */\n${block.css}`)
      .join('\n');
    
    // Déduplication basique (supprimer les doublons exacts)
    const dedupedCSS = this.deduplicateCSS(baseCSS + blockCSS);
    
    return dedupedCSS;
  }

  /**
   * Combine les JS des blocs
   */
  private combineJS(blocks: any[]): string {
    const jsBlocks = blocks
      .filter(block => block.js)
      .map(block => `\n// ${block.type.toUpperCase()} Block\n${block.js}`)
      .join('\n');
    
    if (!jsBlocks) return '';
    
    return `
// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    ${jsBlocks}
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading pour images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback pour navigateurs anciens
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});`;
  }

  /**
   * Déduplique le CSS (supprime les règles en double)
   */
  private deduplicateCSS(css: string): string {
    const rules = new Set<string>();
    const lines = css.split('\n');
    const dedupedLines: string[] = [];
    
    let currentRule = '';
    let inRule = false;
    
    for (const line of lines) {
      currentRule += line + '\n';
      
      if (line.includes('{')) {
        inRule = true;
      }
      
      if (line.includes('}') && inRule) {
        inRule = false;
        
        // Normaliser la règle pour comparaison
        const normalizedRule = currentRule
          .replace(/\s+/g, ' ')
          .replace(/:\s+/g, ':')
          .trim();
        
        // Ajouter seulement si pas déjà présent
        if (!rules.has(normalizedRule)) {
          rules.add(normalizedRule);
          dedupedLines.push(currentRule.trim());
        }
        
        currentRule = '';
      }
    }
    
    return dedupedLines.join('\n\n');
  }
}

// Types
interface AssemblyOptions {
  style?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    light: string;
    dark: string;
  };
  performance?: boolean;
}

interface AssembledPage {
  html: string;
  css: string;
  js: string;
}
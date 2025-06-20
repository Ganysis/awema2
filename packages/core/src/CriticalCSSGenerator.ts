import { Page, GeneratorContext } from '@awema/shared';
import postcss from 'postcss';
import { PurgeCSS } from 'purgecss';

export class CriticalCSSGenerator {
  async process(html: string, page: Page, context: GeneratorContext): Promise<string> {
    const { performance } = context.config;
    
    if (!performance.optimization.criticalCSS) {
      return html;
    }
    
    try {
      // Extract critical CSS
      const criticalCSS = await this.extractCriticalCSS(html, page, context);
      
      // Inline critical CSS
      const optimizedHtml = this.inlineCriticalCSS(html, criticalCSS);
      
      // Add preload for full CSS
      const finalHtml = this.addCSSPreload(optimizedHtml, page);
      
      return finalHtml;
    } catch (error) {
      console.error('Critical CSS extraction failed:', error);
      return html;
    }
  }

  private async extractCriticalCSS(
    html: string,
    page: Page,
    context: GeneratorContext
  ): Promise<string> {
    // For POC, we'll extract CSS that's already in the HTML
    // In production, we'd use a tool like critical or penthouse
    
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const styles: string[] = [];
    let match;
    
    while ((match = styleRegex.exec(html)) !== null) {
      styles.push(match[1]);
    }
    
    const allCSS = styles.join('\n');
    
    // Purge unused CSS for critical path
    const purgedCSS = await this.purgeUnusedCSS(allCSS, html);
    
    // Extract only above-the-fold CSS
    const criticalCSS = await this.extractAboveTheFoldCSS(purgedCSS);
    
    return criticalCSS;
  }

  private async purgeUnusedCSS(css: string, html: string): Promise<string> {
    try {
      const purgeCSSResult = await new PurgeCSS().purge({
        content: [
          {
            raw: html,
            extension: 'html'
          }
        ],
        css: [
          {
            raw: css
          }
        ],
        safelist: {
          standard: [
            // Keep animation classes
            /^animate-/,
            // Keep state classes
            /^is-/,
            /^has-/,
            // Keep responsive classes
            /^sm:/,
            /^md:/,
            /^lg:/,
            /^xl:/,
            // Keep dynamic classes
            'active',
            'disabled',
            'loading',
            'error',
            'success'
          ]
        }
      });
      
      return purgeCSSResult[0].css;
    } catch (error) {
      console.error('PurgeCSS failed:', error);
      return css;
    }
  }

  private async extractAboveTheFoldCSS(css: string): Promise<string> {
    // For POC, we'll consider specific selectors as critical
    const criticalSelectors = [
      // Reset and base
      '*',
      'html',
      'body',
      // Layout
      '.container',
      '.header',
      '.hero',
      '.nav-*',
      '.logo',
      // Typography
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p',
      'a',
      // Buttons
      '.btn',
      '.btn-primary',
      '.btn-secondary',
      // Above the fold components
      '.hero-*',
      '.header-*'
    ];
    
    try {
      // Parse CSS
      const root = postcss.parse(css);
      const criticalRoot = postcss.root();
      
      // Extract rules matching critical selectors
      root.walkRules(rule => {
        const selector = rule.selector.toLowerCase();
        const isCritical = criticalSelectors.some(critical => {
          if (critical.endsWith('*')) {
            const prefix = critical.slice(0, -1);
            return selector.includes(prefix);
          }
          return selector === critical || selector.includes(critical);
        });
        
        if (isCritical) {
          criticalRoot.append(rule.clone());
        }
      });
      
      // Also include @font-face and CSS variables
      root.walkAtRules(atRule => {
        if (atRule.name === 'font-face' || 
            (atRule.name === 'media' && atRule.params.includes('prefers-reduced-motion'))) {
          criticalRoot.append(atRule.clone());
        }
      });
      
      // Include :root CSS variables
      root.walkRules(':root', rule => {
        criticalRoot.append(rule.clone());
      });
      
      return criticalRoot.toString();
    } catch (error) {
      console.error('Critical CSS extraction failed:', error);
      return css;
    }
  }

  private inlineCriticalCSS(html: string, criticalCSS: string): string {
    // Find the closing </head> tag
    const headEndIndex = html.indexOf('</head>');
    
    if (headEndIndex === -1) {
      return html;
    }
    
    // Create critical CSS style tag
    const criticalStyleTag = `
    <!-- Critical CSS -->
    <style id="critical-css">
${criticalCSS}
    </style>`;
    
    // Insert before </head>
    const optimizedHtml = 
      html.slice(0, headEndIndex) + 
      criticalStyleTag + '\n' +
      html.slice(headEndIndex);
    
    return optimizedHtml;
  }

  private addCSSPreload(html: string, page: Page): string {
    // Add preload and async loading for full CSS
    const cssPreload = `
    <!-- Preload full CSS -->
    <link rel="preload" href="/css/${page.id}.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/${page.id}.css"></noscript>
    
    <!-- LoadCSS polyfill -->
    <script>
    /*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
    !function(e){"use strict";var t=function(t,n,r,o){var i,a=e.document,d=a.createElement("link");if(n)i=n;else{var f=(a.body||a.getElementsByTagName("head")[0]).childNodes;i=f[f.length-1]}var l=a.styleSheets;if(o)for(var c in o)o.hasOwnProperty(c)&&d.setAttribute(c,o[c]);d.rel="stylesheet",d.href=t,d.media="only x",function e(t){if(a.body)return t();setTimeout(function(){e(t)})}(function(){i.parentNode.insertBefore(d,n?i:i.nextSibling)});var s=function(e){for(var t=d.href,n=l.length;n--;)if(l[n].href===t)return e();setTimeout(function(){s(e)})};function u(){d.addEventListener&&d.removeEventListener("load",u),d.media=r||"all"}return d.addEventListener&&d.addEventListener("load",u),d.onloadcssdefined=s,s(u),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this);
    </script>`;
    
    // Find the closing </head> tag
    const headEndIndex = html.indexOf('</head>');
    
    if (headEndIndex === -1) {
      return html;
    }
    
    // Insert before </head>
    const finalHtml = 
      html.slice(0, headEndIndex) + 
      cssPreload + '\n' +
      html.slice(headEndIndex);
    
    return finalHtml;
  }

  async generateCriticalPath(
    page: Page,
    context: GeneratorContext
  ): Promise<{
    inlineCSS: string;
    deferredCSS: string[];
  }> {
    // This would be used for more advanced critical CSS extraction
    // For now, returning mock data
    return {
      inlineCSS: '',
      deferredCSS: [`/css/${page.id}.css`]
    };
  }

  estimateCriticalCSSSize(css: string): number {
    // Estimate the size of critical CSS
    // This helps in keeping it under 14KB for optimal performance
    return Buffer.byteLength(css, 'utf8');
  }

  optimizeCriticalCSS(css: string, maxSize: number = 14336): string {
    // 14KB limit for inline CSS
    const currentSize = this.estimateCriticalCSSSize(css);
    
    if (currentSize <= maxSize) {
      return css;
    }
    
    // If too large, prioritize most important rules
    try {
      const root = postcss.parse(css);
      const priorityRoot = postcss.root();
      
      // Priority order
      const priorities = [
        ':root',
        'html',
        'body',
        '.container',
        '.header',
        '.hero',
        'h1',
        'h2',
        '.btn-primary'
      ];
      
      let currentOptimizedSize = 0;
      
      for (const priority of priorities) {
        root.walkRules(rule => {
          if (rule.selector.includes(priority)) {
            const ruleString = rule.toString();
            const ruleSize = Buffer.byteLength(ruleString, 'utf8');
            
            if (currentOptimizedSize + ruleSize <= maxSize) {
              priorityRoot.append(rule.clone());
              currentOptimizedSize += ruleSize;
            }
          }
        });
      }
      
      return priorityRoot.toString();
    } catch (error) {
      console.error('Critical CSS optimization failed:', error);
      return css.slice(0, maxSize);
    }
  }
}
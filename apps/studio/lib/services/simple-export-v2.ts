import { getBlockRenderFunction } from '@/lib/blocks/block-registry';
import type { EditorBlock } from '@/lib/store/editor-store';

export class SimpleExportV2 {
  /**
   * Export ULTRA SIMPLE qui fonctionne à 100%
   */
  static async exportToHTML(projectData: any): Promise<string> {
    const { pages = [], theme = {}, businessInfo = {}, globalHeader, globalFooter } = projectData;
    
    // 1. CSS de base COMPLET
    const baseCSS = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      
      /* Variables CSS */
      :root {
        --primary: ${theme.colors?.primary || '#3b82f6'};
        --secondary: ${theme.colors?.secondary || '#10b981'};
        --accent: ${theme.colors?.accent || '#f59e0b'};
        --text: #1f2937;
        --bg: #ffffff;
      }
      
      /* Glassmorphism */
      .glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      /* Gradients */
      .gradient-primary {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
      }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fadeIn 0.6s ease-out; }
    `;
    
    // 2. Collecter TOUT le CSS et HTML
    let allCSS = baseCSS;
    let allHTML = '';
    
    // Helper: Rendre un bloc de façon SAFE
    const renderBlockSafe = (block: EditorBlock): { html: string, css: string } => {
      try {
        const renderFn = getBlockRenderFunction(block.type);
        if (!renderFn) {
          return {
            html: `<div class="block-error">Bloc ${block.type} non trouvé</div>`,
            css: ''
          };
        }
        
        // IMPORTANT: Nettoyer les props
        const cleanProps = this.cleanBlockProps(block);
        const result = renderFn(cleanProps, []);
        
        return {
          html: result.html || '',
          css: result.css || ''
        };
      } catch (error) {
        console.error(`Erreur bloc ${block.type}:`, error);
        return {
          html: `<div class="block-error">Erreur: ${error.message}</div>`,
          css: ''
        };
      }
    };
    
    // 3. Rendre header
    if (globalHeader) {
      const { html, css } = renderBlockSafe(globalHeader);
      allHTML += html;
      allCSS += css;
    }
    
    // 4. Rendre tous les blocs
    const homePage = pages.find(p => p.slug === '/') || pages[0];
    if (homePage && homePage.blocks) {
      homePage.blocks.forEach(block => {
        const { html, css } = renderBlockSafe(block);
        allHTML += html;
        allCSS += css;
      });
    }
    
    // 5. Rendre footer
    if (globalFooter) {
      const { html, css } = renderBlockSafe(globalFooter);
      allHTML += html;
      allCSS += css;
    }
    
    // 6. Créer le HTML complet
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.name || 'Mon Site'}</title>
    <style>${allCSS}</style>
</head>
<body>
    ${allHTML}
    
    <script>
      // Script de base pour interactivité
      document.addEventListener('DOMContentLoaded', function() {
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      });
    </script>
</body>
</html>`;
  }
  
  /**
   * Nettoie les props pour éviter [object Object] et undefined
   */
  static cleanBlockProps(block: EditorBlock): any {
    const props = { ...block.props };
    
    // Règles spécifiques par type de bloc
    if (block.type === 'content-ultra-modern') {
      if (props.contentType === 'timeline' && props.content !== undefined) {
        delete props.content; // Timeline n'a pas besoin de content
      }
      if (props.contentType === 'text-image' && !props.content) {
        props.content = ''; // Assurer que content est une string
      }
    }
    
    // Nettoyer toutes les props
    Object.keys(props).forEach(key => {
      const value = props[key];
      
      // Si undefined, mettre une valeur par défaut
      if (value === undefined) {
        if (key.includes('title') || key.includes('text') || key.includes('description')) {
          props[key] = '';
        } else if (key.includes('items') || key.includes('list') || key.includes('fields')) {
          props[key] = [];
        } else {
          props[key] = null;
        }
      }
      
      // Parser les strings JSON
      if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
        try {
          props[key] = JSON.parse(value);
        } catch (e) {
          // Garder la string
        }
      }
    });
    
    return props;
  }
  
  /**
   * Export en fichiers séparés (HTML + CSS + JS)
   */
  static async exportToFiles(projectData: any): Promise<{
    html: string,
    css: string,
    js: string,
    assets: Array<{ path: string, content: string }>
  }> {
    const fullHTML = await this.exportToHTML(projectData);
    
    // Extraire CSS et JS du HTML
    const cssMatch = fullHTML.match(/<style>([\s\S]*?)<\/style>/);
    const jsMatch = fullHTML.match(/<script>([\s\S]*?)<\/script>/);
    
    const css = cssMatch ? cssMatch[1] : '';
    const js = jsMatch ? jsMatch[1] : '';
    
    // HTML sans CSS/JS inline
    let cleanHTML = fullHTML
      .replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="styles.css">')
      .replace(/<script>[\s\S]*?<\/script>/, '<script src="script.js"></script>');
    
    return {
      html: cleanHTML,
      css: css,
      js: js,
      assets: []
    };
  }
}
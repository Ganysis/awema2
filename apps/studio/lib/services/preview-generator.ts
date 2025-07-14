import { TemplateComposer, ColorGenerator, TypographyGenerator, SpacingGenerator } from '@awema/templates';
import type { EditorBlock, Theme } from '../store/editor-store';
import type { DefaultBlock } from '@awema/shared';
import { blockRegistry, getBlockRenderFunction } from '../blocks/block-registry';
import { NetlifyMediaService } from './netlify-media.service';

export class PreviewGenerator {
  private composer: TemplateComposer;
  private mediaService: NetlifyMediaService | null = null;
  private projectId: string | null = null;

  constructor() {
    this.composer = new TemplateComposer();
  }

  async setProjectId(projectId: string) {
    this.projectId = projectId;
    this.mediaService = new NetlifyMediaService();
    // Load images from localStorage
    try {
      await this.mediaService.loadFromLocalStorage(projectId);
      console.log('Loaded images for preview:', this.mediaService.getProjectImages().length);
    } catch (error) {
      console.log('No images to load for preview');
    }
  }

  generatePreview(
    blocks: EditorBlock[], 
    theme: Theme,
    globalHeader?: EditorBlock | null,
    globalFooter?: EditorBlock | null
  ): string {
    console.log('Generating preview with blocks:', blocks);
    
    try {
      // Collect CSS and JS from all blocks
      const collectedCSS: string[] = [];
      const collectedJS: string[] = [];
      let allHTML = '';
      
      // Helper to render a block and collect its assets
      const renderAndCollect = (block: EditorBlock) => {
        try {
          const renderFn = getBlockRenderFunction(block.type);
          if (!renderFn) {
            console.warn(`No render function found for block type: ${block.type}`);
            return;
          }
          
          // Convert to template block which includes defaults
          const templateBlock = this.convertBlockToTemplateBlock(block);
          
          // Call the render function with merged props
          const rendered = renderFn(templateBlock.props, []);
          
          if (rendered) {
            if (typeof rendered === 'string') {
              // Si c'est une string, c'est du HTML direct
              allHTML += rendered;
            } else if (typeof rendered === 'object') {
              // Si c'est un objet, extraire html, css, js
              if (rendered.html) {
                allHTML += rendered.html;
              }
              if (rendered.css) {
                collectedCSS.push(rendered.css);
              }
              if (rendered.js) {
                collectedJS.push(rendered.js);
              }
            }
          }
        } catch (error) {
          console.error(`Error rendering block ${block.type}:`, error);
        }
      };
      
      // Render header if exists
      if (globalHeader) {
        renderAndCollect(globalHeader);
      }
      
      // Render page blocks
      blocks.forEach(block => {
        renderAndCollect(block);
      });
      
      // Render footer if exists
      if (globalFooter) {
        renderAndCollect(globalFooter);
      }

      // Generate base CSS with resets and utilities
      const baseCSS = this.generateBaseCSS();
      
      // Generate theme-specific styles
      const themeStyles = this.generateThemeStyles(theme);
      
      // Combine all CSS
      const blockStyles = collectedCSS.filter(css => css && css.trim()).join('\n\n');
      const allCSS = `
        ${baseCSS}
        ${themeStyles}
        ${blockStyles}
      `;
      
      // Combine all JS
      const allJS = collectedJS.filter(js => js && js.trim()).join('\n\n');

      // Create complete HTML document
      return this.createHTMLDocument({
        html: allHTML,
        css: allCSS,
        js: allJS,
        criticalCSS: '',
        theme
      });
    } catch (error) {
      console.error('Error generating preview:', error);
      return this.createErrorDocument(error as Error);
    }
  }
  
  private createErrorDocument(error: Error): string {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Preview Error</title>
    <style>
      body { 
        font-family: system-ui, -apple-system, sans-serif; 
        padding: 2rem; 
        background: #f3f4f6; 
      }
      .error { 
        background: white; 
        border: 1px solid #ef4444; 
        border-radius: 0.5rem; 
        padding: 1.5rem; 
        color: #dc2626; 
      }
      pre { 
        background: #fee2e2; 
        padding: 1rem; 
        border-radius: 0.25rem; 
        overflow: auto; 
      }
    </style>
</head>
<body>
    <div class="error">
        <h1>Preview Generation Error</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
    </div>
</body>
</html>`;
  }

  private generateBaseCSS(): string {
    return `
      /* CSS Reset and Base Styles */
      *, *::before, *::after {
        box-sizing: border-box;
      }
      
      * {
        margin: 0;
        padding: 0;
      }
      
      html {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
      }
      
      body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
      }
      
      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
        height: auto;
      }
      
      input, button, textarea, select {
        font: inherit;
      }
      
      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }
      
      /* Container */
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      
      /* Button Styles */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        font-weight: 500;
        text-decoration: none;
        border-radius: var(--border-radius);
        transition: all 0.2s ease;
        cursor: pointer;
        border: none;
        text-align: center;
        white-space: nowrap;
      }
      
      .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .btn-lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }
      
      .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      /* Grid System */
      .grid {
        display: grid;
        gap: 1.5rem;
      }
      
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      
      @media (max-width: 768px) {
        .md\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      /* Utilities */
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      .text-right { text-align: right; }
      
      .mx-auto {
        margin-left: auto;
        margin-right: auto;
      }
      
      .relative { position: relative; }
      .absolute { position: absolute; }
      
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      .flex-wrap { flex-wrap: wrap; }
      .gap-4 { gap: 1rem; }
      .gap-6 { gap: 1.5rem; }
      .gap-8 { gap: 2rem; }
      
      /* Section Spacing */
      section {
        padding: 4rem 0;
      }
      
      @media (min-width: 768px) {
        section {
          padding: 5rem 0;
        }
      }
      
      /* Default link styles */
      a {
        color: var(--color-primary);
        text-decoration: none;
        transition: color 0.2s ease;
      }
      
      a:hover {
        color: color-mix(in srgb, var(--color-primary) 85%, black);
      }
      
      /* Form elements */
      input, textarea, select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        background: var(--color-background);
        color: var(--color-text);
        font-size: 1rem;
        line-height: 1.5;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      
      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
      }
      
      /* Typography utilities */
      .text-primary { color: var(--color-primary); }
      .text-secondary { color: var(--color-secondary); }
      .text-accent { color: var(--color-accent); }
      .text-muted { color: var(--color-text-muted); }
      
      .font-light { font-weight: 300; }
      .font-normal { font-weight: 400; }
      .font-medium { font-weight: 500; }
      .font-semibold { font-weight: 600; }
      .font-bold { font-weight: 700; }
      
      /* Background utilities */
      .bg-primary { background-color: var(--color-primary); }
      .bg-secondary { background-color: var(--color-secondary); }
      .bg-accent { background-color: var(--color-accent); }
      .bg-surface { background-color: var(--color-surface); }
      
      /* Responsive Text */
      @media (max-width: 768px) {
        h1 { font-size: 2rem; }
        h2 { font-size: 1.75rem; }
        h3 { font-size: 1.5rem; }
      }
    `;
  }

  private generateThemeStyles(theme: Theme): string {
    let styles = '';

    // Add CSS variables for colors with fallbacks
    const colors = theme.colors || {};
    styles += `
      :root {
        --color-primary: ${colors.primary || 'hsl(221, 83%, 53%)'};
        --color-secondary: ${colors.secondary || 'hsl(271, 81%, 65%)'};
        --color-accent: ${colors.accent || 'hsl(0, 84%, 60%)'};
        --color-background: ${colors.background || 'hsl(0, 0%, 100%)'};
        --color-text: ${colors.text || 'hsl(222, 47%, 11%)'};
        --color-text-muted: ${colors.textMuted || 'hsl(215, 20%, 65%)'};
        --color-text-secondary: ${colors.textSecondary || colors.textMuted || 'hsl(215, 20%, 65%)'};
        --color-surface: ${colors.surface || 'hsl(210, 20%, 98%)'};
        --color-border: ${colors.border || 'hsl(214, 32%, 91%)'};
        --color-success: ${colors.success || 'hsl(142, 71%, 45%)'};
        --color-warning: ${colors.warning || 'hsl(45, 93%, 47%)'};
        --color-error: ${colors.error || 'hsl(0, 84%, 60%)'};
        
        /* Typography */
        --font-heading: ${theme.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif'};
        --font-body: ${theme.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif'};
        --font-size-base: ${theme.typography?.fontSize?.base || '1rem'};
        --font-size-sm: ${theme.typography?.fontSize?.sm || '0.875rem'};
        --font-size-lg: ${theme.typography?.fontSize?.lg || '1.125rem'};
        --font-size-xl: ${theme.typography?.fontSize?.xl || '1.25rem'};
        --font-size-2xl: ${theme.typography?.fontSize?.['2xl'] || '1.5rem'};
        --font-size-3xl: ${theme.typography?.fontSize?.['3xl'] || '1.875rem'};
        --line-height-base: ${theme.typography?.lineHeight?.normal || '1.5'};
        --line-height-heading: ${theme.typography?.lineHeight?.tight || '1.25'};
        
        /* Spacing */
        --spacing-xs: ${theme.spacing?.spacing?.['2'] || '0.5rem'};
        --spacing-sm: ${theme.spacing?.spacing?.['4'] || '1rem'};
        --spacing-md: ${theme.spacing?.spacing?.['6'] || '1.5rem'};
        --spacing-lg: ${theme.spacing?.spacing?.['8'] || '2rem'};
        --spacing-xl: ${theme.spacing?.spacing?.['12'] || '3rem'};
        --spacing-2xl: ${theme.spacing?.spacing?.['16'] || '4rem'};
        
        /* Border radius */
        --border-radius: 0.375rem;
        --border-radius-lg: 0.5rem;
        --border-radius-xl: 0.75rem;
      }
      
      /* Apply base typography */
      body {
        font-family: var(--font-body);
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        color: var(--color-text);
        background-color: var(--color-background);
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        line-height: var(--line-height-heading);
        font-weight: 600;
      }
      
      h1 { font-size: var(--font-size-3xl); }
      h2 { font-size: var(--font-size-2xl); }
      h3 { font-size: var(--font-size-xl); }
      h4 { font-size: var(--font-size-lg); }
      
      /* Button styles based on variant */
      .btn-primary {
        background-color: var(--color-primary);
        color: white;
      }
      
      .btn-primary:hover {
        background-color: color-mix(in srgb, var(--color-primary) 85%, black);
      }
      
      .btn-secondary {
        background-color: var(--color-secondary);
        color: white;
      }
      
      .btn-secondary:hover {
        background-color: color-mix(in srgb, var(--color-secondary) 85%, black);
      }
      
      .btn-outline {
        background-color: transparent;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
      }
      
      .btn-outline:hover {
        background-color: var(--color-primary);
        color: white;
      }
      
      /* Additional utility classes for better styling */
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
      .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
      
      .rounded-sm { border-radius: 0.125rem; }
      .rounded { border-radius: 0.25rem; }
      .rounded-md { border-radius: 0.375rem; }
      .rounded-lg { border-radius: 0.5rem; }
      .rounded-xl { border-radius: 0.75rem; }
      .rounded-2xl { border-radius: 1rem; }
      .rounded-full { border-radius: 9999px; }
      
      /* Cards and surfaces */
      .card {
        background: var(--color-surface);
        border-radius: var(--border-radius-lg);
        padding: 1.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      }
      
      /* Icon styles */
      .icon {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        stroke-width: 2;
        stroke: currentColor;
        fill: none;
      }
      
      .icon-sm { width: 1rem; height: 1rem; }
      .icon-lg { width: 2rem; height: 2rem; }
      .icon-xl { width: 3rem; height: 3rem; }
    `;

    // Add custom CSS if provided
    if (theme.customCSS) {
      styles += '\n' + theme.customCSS;
    }

    return styles;
  }
  
  private convertBlockToTemplateBlock(block: EditorBlock): DefaultBlock {
    // Find the block definition to get defaults
    const blockDef = blockRegistry.find(def => def.block.id === block.type);
    const defaultProps = blockDef?.block.defaultProps || {};
    
    // Get default values from prop definitions
    const propDefaults: Record<string, any> = {};
    if (blockDef?.block.props) {
      blockDef.block.props.forEach(prop => {
        if (prop.defaultValue !== undefined) {
          propDefaults[prop.name] = prop.defaultValue;
        }
      });
    }
    
    // Transform image URLs in props
    const transformedProps = this.transformImageUrls(block.props);
    
    // Merge all defaults with transformed props (transformed props take precedence)
    const mergedProps = { ...propDefaults, ...defaultProps, ...transformedProps };
    
    // Apply background styling if present
    if (transformedProps.backgroundColor || transformedProps.backgroundPattern) {
      mergedProps._customStyles = this.generateBackgroundStyles(transformedProps);
    }
    
    return {
      blockId: block.type,
      order: 0,
      props: mergedProps,
      variants: []
    };
  }
  
  private generateBackgroundStyles(props: Record<string, any>): string {
    const styles: string[] = [];
    
    if (props.backgroundColor) {
      styles.push(`background-color: ${props.backgroundColor};`);
    }
    
    if (props.backgroundPattern && props.backgroundPattern !== 'none') {
      switch (props.backgroundPattern) {
        case 'dots':
          styles.push(`background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);`);
          styles.push(`background-size: 20px 20px;`);
          break;
        case 'grid':
          styles.push(`background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);`);
          styles.push(`background-size: 20px 20px;`);
          break;
        case 'lines':
          styles.push(`background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px);`);
          break;
        case 'waves':
          styles.push(`background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23000000' fill-opacity='0.03'/%3E%3C/svg%3E");`);
          break;
      }
    }
    
    return styles.join(' ');
  }

  private createHTMLDocument(options: {
    html: string;
    css: string;
    js: string;
    criticalCSS: string;
    theme: Theme;
  }): string {
    const { html, css, js, criticalCSS, theme } = options;

    // Get Google Fonts link
    const fontsLink = this.getGoogleFontsLink(theme.typography.fontFamily);

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - AWEMA Studio</title>
    
    ${fontsLink ? `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${fontsLink}` : ''}
    
    <style>${criticalCSS}</style>
    <style>${css}</style>
</head>
<body>
    ${html}
    ${js ? `<script>${js}</script>` : ''}
</body>
</html>`;
  }

  private getGoogleFontsLink(fontFamily: { heading: string; body: string }): string | null {
    const fonts = new Set<string>();
    
    // Extract font names (remove fallbacks)
    const headingFont = fontFamily.heading.split(',')[0].trim().replace(/['"]/g, '');
    const bodyFont = fontFamily.body.split(',')[0].trim().replace(/['"]/g, '');
    
    // List of system fonts that don't need Google Fonts
    const systemFonts = [
      '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 
      'Helvetica', 'Arial', 'sans-serif', 'serif', 'monospace'
    ];
    
    if (!systemFonts.includes(headingFont)) {
      fonts.add(headingFont);
    }
    if (!systemFonts.includes(bodyFont) && bodyFont !== headingFont) {
      fonts.add(bodyFont);
    }
    
    if (fonts.size === 0) {
      return null;
    }
    
    // Create Google Fonts URL
    const fontParams = Array.from(fonts)
      .map(font => `family=${font.replace(/ /g, '+')}:wght@300;400;500;600;700`)
      .join('&');
    
    return `<link href="https://fonts.googleapis.com/css2?${fontParams}&display=swap" rel="stylesheet">`;
  }

  private transformImageUrls(props: Record<string, any>): Record<string, any> {
    if (!this.mediaService || !this.projectId) {
      return props;
    }

    // Get already loaded images - they should be loaded by the hook
    const images = this.mediaService.getProjectImages();

    // Deep clone props to avoid mutations
    const transformed = JSON.parse(JSON.stringify(props));

    // Transform all string values that look like image paths
    const transformValue = (value: any): any => {
      if (typeof value === 'string' && value.startsWith('/images/')) {
        console.log('Found image path:', value);
        // Find the image by path
        const image = images.find(img => img.path === value);
        if (image) {
          // Return the blob URL for preview
          const blobUrl = this.mediaService?.getPreviewUrl(image.id);
          console.log('Transformed to blob URL:', blobUrl);
          return blobUrl || value;
        }
        console.log('Image not found in storage');
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively transform object properties
        Object.keys(value).forEach(key => {
          value[key] = transformValue(value[key]);
        });
      } else if (Array.isArray(value)) {
        // Transform array items
        return value.map(item => transformValue(item));
      }
      return value;
    };

    // Transform all properties
    Object.keys(transformed).forEach(key => {
      transformed[key] = transformValue(transformed[key]);
    });

    return transformed;
  }
}

// Export singleton instance
export const previewGenerator = new PreviewGenerator();
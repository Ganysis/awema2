import { TemplateComposer, ColorGenerator, TypographyGenerator, SpacingGenerator } from '@awema/templates';
import type { EditorBlock, Theme } from '../store/editor-store';
import type { DefaultBlock } from '@awema/shared';
import { blockRegistry } from '../blocks/block-registry';
import { NetlifyMediaService } from '../services/netlify-media.service';

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
    
    // Convert all blocks including header and footer
    const allBlocks: DefaultBlock[] = [];
    let currentOrder = 0;
    
    // Add header if exists
    if (globalHeader) {
      const headerBlock = this.convertBlockToTemplateBlock(globalHeader);
      headerBlock.order = currentOrder++;
      allBlocks.push(headerBlock);
    }
    
    // Add page blocks
    blocks.forEach((block) => {
      const convertedBlock = this.convertBlockToTemplateBlock(block);
      convertedBlock.order = currentOrder++;
      allBlocks.push(convertedBlock);
    });
    
    // Add footer if exists
    if (globalFooter) {
      const footerBlock = this.convertBlockToTemplateBlock(globalFooter);
      footerBlock.order = currentOrder++;
      allBlocks.push(footerBlock);
    }

    console.log('All blocks including header/footer:', allBlocks);

    try {
      // Generate the page with the composer
      const result = this.composer.composePage({
        template: 'landing-page',
        variant: theme.variant,
        blocks: allBlocks,
        customStyles: this.generateThemeStyles(theme)
      });

      // Create complete HTML document
      return this.createHTMLDocument({
        ...result,
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

  private generateThemeStyles(theme: Theme): string {
    let styles = '';

    // Add CSS variables for colors
    styles += `
      :root {
        --color-primary: ${theme.colors.primary};
        --color-secondary: ${theme.colors.secondary};
        --color-accent: ${theme.colors.accent};
        --color-background: ${theme.colors.background};
        --color-text: ${theme.colors.text};
        --color-text-muted: ${theme.colors.textMuted};
        
        /* Typography */
        --font-heading: ${theme.typography.fontFamily.heading};
        --font-body: ${theme.typography.fontFamily.body};
        --font-size-base: ${theme.typography.fontSize.base};
        --font-size-sm: ${theme.typography.fontSize.sm};
        --font-size-lg: ${theme.typography.fontSize.lg};
        --font-size-xl: ${theme.typography.fontSize.xl};
        --font-size-2xl: ${theme.typography.fontSize['2xl']};
        --font-size-3xl: ${theme.typography.fontSize['3xl']};
        --line-height-base: ${theme.typography.lineHeight.normal};
        --line-height-heading: ${theme.typography.lineHeight.tight};
        
        /* Spacing */
        --spacing-xs: ${theme.spacing.spacing['2']};
        --spacing-sm: ${theme.spacing.spacing['4']};
        --spacing-md: ${theme.spacing.spacing['6']};
        --spacing-lg: ${theme.spacing.spacing['8']};
        --spacing-xl: ${theme.spacing.spacing['12']};
        --spacing-2xl: ${theme.spacing.spacing['16']};
        
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
          const blobUrl = this.mediaService.getPreviewUrl(image.id);
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
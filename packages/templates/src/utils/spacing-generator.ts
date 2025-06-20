/**
 * Dynamic spacing and layout system generator
 */

export interface SpacingScale {
  '0': string;
  'px': string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;
}

export interface LayoutSystem {
  spacing: SpacingScale;
  containerSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  gridColumns: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '8': string;
    '12': string;
  };
}

export interface SpacingOptions {
  density?: 'compact' | 'comfortable' | 'spacious';
  style?: 'sharp' | 'soft' | 'rounded' | 'fluid';
  containerWidth?: 'narrow' | 'normal' | 'wide' | 'full';
}

export class SpacingGenerator {
  /**
   * Generate a complete spacing and layout system
   */
  static generateSystem(options: SpacingOptions = {}): LayoutSystem {
    const {
      density = 'comfortable',
      style = 'soft',
      containerWidth = 'normal'
    } = options;

    // Base unit for spacing
    const baseUnit = density === 'compact' ? 4 : density === 'spacious' ? 6 : 5;
    
    // Generate spacing scale
    const spacing = this.generateSpacingScale(baseUnit);
    
    // Generate container sizes
    const containerSizes = this.generateContainerSizes(containerWidth);
    
    // Standard breakpoints
    const breakpoints = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    };
    
    // Generate border radius based on style
    const borderRadius = this.generateBorderRadius(style);
    
    // Grid columns
    const gridColumns = this.generateGridColumns();

    return {
      spacing,
      containerSizes,
      breakpoints,
      borderRadius,
      gridColumns
    };
  }

  /**
   * Generate spacing scale based on base unit
   */
  private static generateSpacingScale(baseUnit: number): SpacingScale {
    const scale: Partial<SpacingScale> = {
      '0': '0px',
      'px': '1px'
    };
    
    const multipliers = [
      0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
    ];
    
    multipliers.forEach(multiplier => {
      const key = multiplier.toString();
      const value = baseUnit * multiplier;
      scale[key as keyof SpacingScale] = `${value / 16}rem`;
    });
    
    return scale as SpacingScale;
  }

  /**
   * Generate container sizes based on width preference
   */
  private static generateContainerSizes(width: string): LayoutSystem['containerSizes'] {
    const baseWidths = {
      narrow: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem'
      },
      normal: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem'
      },
      wide: {
        xs: '24rem',
        sm: '30rem',
        md: '36rem',
        lg: '48rem',
        xl: '60rem',
        '2xl': '72rem'
      },
      full: {
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%'
      }
    };
    
    const selectedWidth = width as keyof typeof baseWidths;
    return {
      ...(baseWidths[selectedWidth] || baseWidths.normal),
      full: '100%'
    };
  }

  /**
   * Generate border radius based on style
   */
  private static generateBorderRadius(style: string): LayoutSystem['borderRadius'] {
    const styles = {
      sharp: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
      },
      soft: {
        none: '0',
        sm: '0.25rem',
        base: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px'
      },
      rounded: {
        none: '0',
        sm: '0.375rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        full: '9999px'
      },
      fluid: {
        none: '0',
        sm: '0.5rem',
        base: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        full: '9999px'
      }
    };
    
    const selectedStyle = style as keyof typeof styles;
    return styles[selectedStyle] || styles.soft;
  }

  /**
   * Generate grid column utilities
   */
  private static generateGridColumns(): LayoutSystem['gridColumns'] {
    return {
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '5': 'repeat(5, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))',
      '8': 'repeat(8, minmax(0, 1fr))',
      '12': 'repeat(12, minmax(0, 1fr))'
    };
  }

  /**
   * Generate CSS custom properties for layout system
   */
  static generateCSSVariables(system: LayoutSystem): string {
    let css = ':root {\n';
    
    // Spacing
    Object.entries(system.spacing).forEach(([key, value]) => {
      css += `  --space-${key}: ${value};\n`;
    });
    
    // Container sizes
    Object.entries(system.containerSizes).forEach(([key, value]) => {
      css += `  --container-${key}: ${value};\n`;
    });
    
    // Breakpoints
    Object.entries(system.breakpoints).forEach(([key, value]) => {
      css += `  --breakpoint-${key}: ${value};\n`;
    });
    
    // Border radius
    Object.entries(system.borderRadius).forEach(([key, value]) => {
      css += `  --radius-${key}: ${value};\n`;
    });
    
    // Section spacing patterns
    css += `
  /* Section Spacing Patterns */
  --section-spacing-tight: var(--space-12);
  --section-spacing-normal: var(--space-20);
  --section-spacing-loose: var(--space-32);
  
  /* Content Spacing Patterns */
  --content-spacing-tight: var(--space-4);
  --content-spacing-normal: var(--space-6);
  --content-spacing-loose: var(--space-8);
  
  /* Component Spacing Patterns */
  --component-padding-sm: var(--space-2) var(--space-3);
  --component-padding-md: var(--space-3) var(--space-4);
  --component-padding-lg: var(--space-4) var(--space-6);
  
  /* Grid Gaps */
  --grid-gap-tight: var(--space-2);
  --grid-gap-normal: var(--space-4);
  --grid-gap-loose: var(--space-8);
}

/* Utility Classes */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

/* Section Spacing */
.section {
  padding-top: var(--section-spacing-normal);
  padding-bottom: var(--section-spacing-normal);
}

.section--tight {
  padding-top: var(--section-spacing-tight);
  padding-bottom: var(--section-spacing-tight);
}

.section--loose {
  padding-top: var(--section-spacing-loose);
  padding-bottom: var(--section-spacing-loose);
}
`;
    
    return css;
  }

  /**
   * Generate responsive padding/margin utilities
   */
  static generateSpacingUtilities(system: LayoutSystem): string {
    const properties = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my'];
    const propertyMap: { [key: string]: string[] } = {
      'p': ['padding'],
      'pt': ['padding-top'],
      'pr': ['padding-right'],
      'pb': ['padding-bottom'],
      'pl': ['padding-left'],
      'px': ['padding-left', 'padding-right'],
      'py': ['padding-top', 'padding-bottom'],
      'm': ['margin'],
      'mt': ['margin-top'],
      'mr': ['margin-right'],
      'mb': ['margin-bottom'],
      'ml': ['margin-left'],
      'mx': ['margin-left', 'margin-right'],
      'my': ['margin-top', 'margin-bottom']
    };
    
    let css = '';
    
    properties.forEach(prop => {
      Object.entries(system.spacing).forEach(([key, value]) => {
        css += `.${prop}-${key.replace('.', '\\.')} {\n`;
        propertyMap[prop].forEach(cssProp => {
          css += `  ${cssProp}: ${value};\n`;
        });
        css += '}\n';
      });
    });
    
    return css;
  }

  /**
   * Generate layout presets for different content types
   */
  static getLayoutPresets(): { [key: string]: SpacingOptions } {
    return {
      'landing': { density: 'spacious', style: 'soft', containerWidth: 'wide' },
      'dashboard': { density: 'compact', style: 'sharp', containerWidth: 'full' },
      'blog': { density: 'comfortable', style: 'soft', containerWidth: 'narrow' },
      'portfolio': { density: 'spacious', style: 'rounded', containerWidth: 'wide' },
      'corporate': { density: 'comfortable', style: 'sharp', containerWidth: 'normal' },
      'minimal': { density: 'spacious', style: 'sharp', containerWidth: 'normal' }
    };
  }
}
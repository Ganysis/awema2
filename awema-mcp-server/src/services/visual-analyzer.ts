import { Page } from 'puppeteer';

export interface VisualPattern {
  spacing: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  shadows: {
    none: boolean;
    subtle: string[];
    medium: string[];
    strong: string[];
  };
  borders: {
    radius: {
      none: boolean;
      small: string[];
      medium: string[];
      large: string[];
      full: string[];
    };
    styles: string[];
    widths: string[];
  };
  animations: {
    transitions: string[];
    transforms: string[];
    durations: string[];
    easings: string[];
  };
  gradients: {
    linear: string[];
    radial: string[];
  };
  typography: {
    sizes: Record<string, string>;
    weights: string[];
    lineHeights: string[];
    letterSpacings: string[];
  };
}

export class VisualAnalyzer {
  async analyzeVisualPatterns(page: Page): Promise<VisualPattern> {
    const patterns = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const patterns: any = {
        spacing: new Set<string>(),
        shadows: new Set<string>(),
        borderRadius: new Set<string>(),
        transitions: new Set<string>(),
        gradients: new Set<string>(),
        fontSizes: new Set<string>(),
        fontWeights: new Set<string>(),
        lineHeights: new Set<string>()
      };

      // Analyser chaque élément
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        
        // Espacements
        ['padding', 'margin', 'gap'].forEach(prop => {
          ['top', 'right', 'bottom', 'left'].forEach(side => {
            const value = style.getPropertyValue(`${prop}-${side}`);
            if (value && value !== '0px') patterns.spacing.add(value);
          });
        });

        // Ombres
        const boxShadow = style.boxShadow;
        if (boxShadow && boxShadow !== 'none') {
          patterns.shadows.add(boxShadow);
        }

        // Border radius
        ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(corner => {
          const radius = style.getPropertyValue(`border-${corner}-radius`);
          if (radius && radius !== '0px') patterns.borderRadius.add(radius);
        });

        // Transitions
        const transition = style.transition;
        if (transition && transition !== 'none' && transition !== 'all 0s ease 0s') {
          patterns.transitions.add(transition);
        }

        // Gradients (dans background)
        const bg = style.backgroundImage;
        if (bg && bg.includes('gradient')) {
          patterns.gradients.add(bg);
        }

        // Typographie
        const fontSize = style.fontSize;
        if (fontSize) patterns.fontSizes.add(fontSize);
        
        const fontWeight = style.fontWeight;
        if (fontWeight) patterns.fontWeights.add(fontWeight);
        
        const lineHeight = style.lineHeight;
        if (lineHeight && lineHeight !== 'normal') patterns.lineHeights.add(lineHeight);
      });

      return {
        spacing: Array.from(patterns.spacing),
        shadows: Array.from(patterns.shadows),
        borderRadius: Array.from(patterns.borderRadius),
        transitions: Array.from(patterns.transitions),
        gradients: Array.from(patterns.gradients),
        fontSizes: Array.from(patterns.fontSizes),
        fontWeights: Array.from(patterns.fontWeights),
        lineHeights: Array.from(patterns.lineHeights)
      };
    });

    return this.categorizePatterns(patterns);
  }

  private categorizePatterns(raw: any): VisualPattern {
    return {
      spacing: this.categorizeSpacing(raw.spacing),
      shadows: this.categorizeShadows(raw.shadows),
      borders: {
        radius: this.categorizeBorderRadius(raw.borderRadius),
        styles: this.extractBorderStyles(raw),
        widths: this.extractBorderWidths(raw)
      },
      animations: {
        transitions: raw.transitions || [],
        transforms: this.extractTransforms(raw.transitions),
        durations: this.extractDurations(raw.transitions),
        easings: this.extractEasings(raw.transitions)
      },
      gradients: {
        linear: raw.gradients?.filter((g: string) => g.includes('linear')) || [],
        radial: raw.gradients?.filter((g: string) => g.includes('radial')) || []
      },
      typography: {
        sizes: this.categorizeTypographySizes(raw.fontSizes),
        weights: raw.fontWeights || [],
        lineHeights: raw.lineHeights || [],
        letterSpacings: []
      }
    };
  }

  private categorizeSpacing(spacings: string[]): VisualPattern['spacing'] {
    const values = spacings
      .map(s => parseFloat(s))
      .filter(v => !isNaN(v))
      .sort((a, b) => a - b);

    const unique = [...new Set(values)];
    
    return {
      small: unique[0] ? `${unique[0]}px` : '8px',
      medium: unique[1] ? `${unique[1]}px` : '16px',
      large: unique[2] ? `${unique[2]}px` : '24px',
      xlarge: unique[3] ? `${unique[3]}px` : '32px'
    };
  }

  private categorizeShadows(shadows: string[]): VisualPattern['shadows'] {
    const categorized = {
      none: shadows.length === 0,
      subtle: [] as string[],
      medium: [] as string[],
      strong: [] as string[]
    };

    shadows.forEach(shadow => {
      // Analyser l'intensité basée sur le blur et l'opacité
      const blurMatch = shadow.match(/(\d+)px\s+rgba?\(/);
      const opacityMatch = shadow.match(/rgba?\([\d\s,]+,\s*([\d.]+)\)/);
      
      const blur = blurMatch ? parseInt(blurMatch[1]) : 0;
      const opacity = opacityMatch ? parseFloat(opacityMatch[1]) : 1;

      if (blur < 10 && opacity < 0.2) {
        categorized.subtle.push(shadow);
      } else if (blur < 20 && opacity < 0.4) {
        categorized.medium.push(shadow);
      } else {
        categorized.strong.push(shadow);
      }
    });

    return categorized;
  }

  private categorizeBorderRadius(radiuses: string[]): VisualPattern['borders']['radius'] {
    const categorized = {
      none: radiuses.length === 0,
      small: [] as string[],
      medium: [] as string[],
      large: [] as string[],
      full: [] as string[]
    };

    radiuses.forEach(radius => {
      const value = parseFloat(radius);
      if (value === 0) return;
      
      if (radius === '50%' || value > 100) {
        categorized.full.push(radius);
      } else if (value <= 4) {
        categorized.small.push(radius);
      } else if (value <= 12) {
        categorized.medium.push(radius);
      } else {
        categorized.large.push(radius);
      }
    });

    return categorized;
  }

  private extractBorderStyles(raw: any): string[] {
    // Extraire les styles de bordure depuis le raw data
    return ['solid', 'dashed', 'dotted'];
  }

  private extractBorderWidths(raw: any): string[] {
    return ['1px', '2px', '3px'];
  }

  private extractTransforms(transitions: string[]): string[] {
    return transitions
      .filter(t => t.includes('transform'))
      .map(t => t.split(' ')[0]);
  }

  private extractDurations(transitions: string[]): string[] {
    const durations = new Set<string>();
    transitions.forEach(t => {
      const match = t.match(/(\d+\.?\d*)s/);
      if (match) durations.add(match[0]);
    });
    return Array.from(durations);
  }

  private extractEasings(transitions: string[]): string[] {
    const easings = new Set<string>();
    const easingPatterns = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier'];
    
    transitions.forEach(t => {
      easingPatterns.forEach(pattern => {
        if (t.includes(pattern)) easings.add(pattern);
      });
    });
    
    return Array.from(easings);
  }

  private categorizeTypographySizes(sizes: string[]): Record<string, string> {
    const values = sizes
      .map(s => parseFloat(s))
      .filter(v => !isNaN(v))
      .sort((a, b) => a - b);

    const unique = [...new Set(values)];
    
    return {
      xs: unique[0] ? `${unique[0]}px` : '12px',
      sm: unique[1] ? `${unique[1]}px` : '14px',
      base: unique[2] ? `${unique[2]}px` : '16px',
      lg: unique[3] ? `${unique[3]}px` : '18px',
      xl: unique[4] ? `${unique[4]}px` : '20px',
      '2xl': unique[5] ? `${unique[5]}px` : '24px',
      '3xl': unique[6] ? `${unique[6]}px` : '30px'
    };
  }
}
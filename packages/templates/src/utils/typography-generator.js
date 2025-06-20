/**
 * Typography system generator for unlimited font combinations
 */
export class TypographyGenerator {
    /**
     * Generate a complete typography system
     */
    static generateSystem(options = {}) {
        const { style = 'modern', scale = 'normal', contrast = 'medium' } = options;
        // Select random font combination for the style
        const fontOptions = this.fontCombinations[style] || this.fontCombinations.modern;
        const fonts = fontOptions[Math.floor(Math.random() * fontOptions.length)];
        // Generate scale based on options
        const baseSize = scale === 'compact' ? 14 : scale === 'spacious' ? 18 : 16;
        const scaleRatio = scale === 'compact' ? 1.2 : scale === 'spacious' ? 1.333 : 1.25;
        // Generate font sizes with clamp for responsive typography
        const fontSize = this.generateFontSizes(baseSize, scaleRatio);
        // Generate weights based on contrast
        const fontWeight = this.generateFontWeights(contrast);
        // Generate line heights
        const lineHeight = this.generateLineHeights(scale);
        // Generate letter spacing
        const letterSpacing = this.generateLetterSpacing(style);
        return {
            fontFamily: fonts,
            fontSize,
            fontWeight,
            lineHeight,
            letterSpacing
        };
    }
    /**
     * Generate responsive font sizes with clamp
     */
    static generateFontSizes(baseSize, ratio) {
        const calculate = (steps) => {
            const size = baseSize * Math.pow(ratio, steps);
            const min = size * 0.85;
            const max = size * 1.15;
            const preferred = `${(size / 16).toFixed(3)}rem`;
            const minRem = `${(min / 16).toFixed(3)}rem`;
            const maxRem = `${(max / 16).toFixed(3)}rem`;
            const vw = ((size - min) / (1920 - 375) * 100).toFixed(2);
            return `clamp(${minRem}, ${preferred} + ${vw}vw, ${maxRem})`;
        };
        return {
            xs: calculate(-2),
            sm: calculate(-1),
            base: `${(baseSize / 16).toFixed(3)}rem`,
            lg: calculate(1),
            xl: calculate(2),
            '2xl': calculate(3),
            '3xl': calculate(4),
            '4xl': calculate(5),
            '5xl': calculate(6),
            '6xl': calculate(7)
        };
    }
    /**
     * Generate font weights based on contrast level
     */
    static generateFontWeights(contrast) {
        switch (contrast) {
            case 'low':
                return {
                    light: 300,
                    normal: 400,
                    medium: 500,
                    semibold: 500,
                    bold: 600,
                    extrabold: 700
                };
            case 'high':
                return {
                    light: 200,
                    normal: 400,
                    medium: 500,
                    semibold: 600,
                    bold: 700,
                    extrabold: 900
                };
            default: // medium
                return {
                    light: 300,
                    normal: 400,
                    medium: 500,
                    semibold: 600,
                    bold: 700,
                    extrabold: 800
                };
        }
    }
    /**
     * Generate line heights based on scale
     */
    static generateLineHeights(scale) {
        const base = scale === 'compact' ? 1.4 : scale === 'spacious' ? 1.8 : 1.6;
        return {
            none: 1,
            tight: base - 0.3,
            snug: base - 0.15,
            normal: base,
            relaxed: base + 0.15,
            loose: base + 0.3
        };
    }
    /**
     * Generate letter spacing based on style
     */
    static generateLetterSpacing(style) {
        const isWide = ['elegant', 'minimal'].includes(style);
        const isTight = ['technical', 'modern'].includes(style);
        if (isWide) {
            return {
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.02em',
                wider: '0.04em',
                widest: '0.08em'
            };
        }
        else if (isTight) {
            return {
                tighter: '-0.04em',
                tight: '-0.02em',
                normal: '0',
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.04em'
            };
        }
        else {
            return {
                tighter: '-0.03em',
                tight: '-0.015em',
                normal: '0',
                wide: '0.015em',
                wider: '0.03em',
                widest: '0.06em'
            };
        }
    }
    /**
     * Generate CSS custom properties for typography
     */
    static generateCSSVariables(system) {
        return `
      :root {
        /* Font Families */
        --font-heading: '${system.fontFamily.heading}', sans-serif;
        --font-body: '${system.fontFamily.body}', sans-serif;
        --font-mono: '${system.fontFamily.mono}', monospace;
        
        /* Font Sizes */
        --text-xs: ${system.fontSize.xs};
        --text-sm: ${system.fontSize.sm};
        --text-base: ${system.fontSize.base};
        --text-lg: ${system.fontSize.lg};
        --text-xl: ${system.fontSize.xl};
        --text-2xl: ${system.fontSize['2xl']};
        --text-3xl: ${system.fontSize['3xl']};
        --text-4xl: ${system.fontSize['4xl']};
        --text-5xl: ${system.fontSize['5xl']};
        --text-6xl: ${system.fontSize['6xl']};
        
        /* Font Weights */
        --font-light: ${system.fontWeight.light};
        --font-normal: ${system.fontWeight.normal};
        --font-medium: ${system.fontWeight.medium};
        --font-semibold: ${system.fontWeight.semibold};
        --font-bold: ${system.fontWeight.bold};
        --font-extrabold: ${system.fontWeight.extrabold};
        
        /* Line Heights */
        --leading-none: ${system.lineHeight.none};
        --leading-tight: ${system.lineHeight.tight};
        --leading-snug: ${system.lineHeight.snug};
        --leading-normal: ${system.lineHeight.normal};
        --leading-relaxed: ${system.lineHeight.relaxed};
        --leading-loose: ${system.lineHeight.loose};
        
        /* Letter Spacing */
        --tracking-tighter: ${system.letterSpacing.tighter};
        --tracking-tight: ${system.letterSpacing.tight};
        --tracking-normal: ${system.letterSpacing.normal};
        --tracking-wide: ${system.letterSpacing.wide};
        --tracking-wider: ${system.letterSpacing.wider};
        --tracking-widest: ${system.letterSpacing.widest};
      }
      
      /* Base Typography Styles */
      body {
        font-family: var(--font-body);
        font-size: var(--text-base);
        font-weight: var(--font-normal);
        line-height: var(--leading-normal);
        letter-spacing: var(--tracking-normal);
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        font-weight: var(--font-bold);
        line-height: var(--leading-tight);
      }
      
      h1 { font-size: var(--text-5xl); }
      h2 { font-size: var(--text-4xl); }
      h3 { font-size: var(--text-3xl); }
      h4 { font-size: var(--text-2xl); }
      h5 { font-size: var(--text-xl); }
      h6 { font-size: var(--text-lg); }
      
      code, pre {
        font-family: var(--font-mono);
      }
    `;
    }
    /**
     * Get Google Fonts import URL for a typography system
     */
    static getGoogleFontsImport(system) {
        const fonts = new Set([
            system.fontFamily.heading,
            system.fontFamily.body,
            system.fontFamily.mono
        ]);
        const weights = Object.values(system.fontWeight).join(';');
        const fontParams = Array.from(fonts)
            .map(font => `family=${font.replace(' ', '+')}:wght@${weights}`)
            .join('&');
        return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
    }
    /**
     * Generate typography presets for different industries
     */
    static getIndustryPresets() {
        return {
            'construction': { style: 'modern', scale: 'normal', contrast: 'high' },
            'renovation': { style: 'elegant', scale: 'spacious', contrast: 'medium' },
            'artisan': { style: 'classic', scale: 'normal', contrast: 'medium' },
            'tech-service': { style: 'technical', scale: 'compact', contrast: 'high' },
            'creative': { style: 'playful', scale: 'spacious', contrast: 'medium' },
            'professional': { style: 'minimal', scale: 'normal', contrast: 'low' }
        };
    }
}
TypographyGenerator.fontCombinations = {
    modern: [
        { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
        { heading: 'Poppins', body: 'Inter', mono: 'Fira Code' },
        { heading: 'Manrope', body: 'Manrope', mono: 'Source Code Pro' },
        { heading: 'DM Sans', body: 'DM Sans', mono: 'IBM Plex Mono' },
        { heading: 'Space Grotesk', body: 'Inter', mono: 'Space Mono' }
    ],
    classic: [
        { heading: 'Playfair Display', body: 'Lora', mono: 'Courier Prime' },
        { heading: 'Merriweather', body: 'Source Serif Pro', mono: 'Courier Prime' },
        { heading: 'Crimson Text', body: 'Crimson Text', mono: 'Courier New' },
        { heading: 'EB Garamond', body: 'EB Garamond', mono: 'Courier Prime' },
        { heading: 'Libre Baskerville', body: 'Libre Baskerville', mono: 'Courier New' }
    ],
    playful: [
        { heading: 'Fredoka', body: 'Nunito', mono: 'Fira Code' },
        { heading: 'Comfortaa', body: 'Quicksand', mono: 'Source Code Pro' },
        { heading: 'Rubik', body: 'Rubik', mono: 'JetBrains Mono' },
        { heading: 'Baloo 2', body: 'Nunito Sans', mono: 'Fira Code' },
        { heading: 'Quicksand', body: 'Quicksand', mono: 'Space Mono' }
    ],
    elegant: [
        { heading: 'Cormorant Garamond', body: 'Montserrat', mono: 'IBM Plex Mono' },
        { heading: 'Tenor Sans', body: 'Lato', mono: 'Source Code Pro' },
        { heading: 'Bodoni Moda', body: 'Open Sans', mono: 'JetBrains Mono' },
        { heading: 'DM Serif Display', body: 'DM Sans', mono: 'DM Mono' },
        { heading: 'Libre Caslon Display', body: 'Raleway', mono: 'Courier Prime' }
    ],
    technical: [
        { heading: 'JetBrains Mono', body: 'IBM Plex Sans', mono: 'JetBrains Mono' },
        { heading: 'Source Code Pro', body: 'Source Sans Pro', mono: 'Source Code Pro' },
        { heading: 'Roboto Mono', body: 'Roboto', mono: 'Roboto Mono' },
        { heading: 'Fira Code', body: 'Fira Sans', mono: 'Fira Code' },
        { heading: 'IBM Plex Mono', body: 'IBM Plex Sans', mono: 'IBM Plex Mono' }
    ],
    minimal: [
        { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
        { heading: 'Helvetica Neue', body: 'Helvetica Neue', mono: 'Monaco' },
        { heading: 'Arial', body: 'Arial', mono: 'Consolas' },
        { heading: 'Work Sans', body: 'Work Sans', mono: 'Source Code Pro' },
        { heading: 'Karla', body: 'Karla', mono: 'Fira Code' }
    ]
};

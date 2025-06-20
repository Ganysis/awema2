/**
 * Color palette generator for unlimited variations
 */
export class ColorGenerator {
    /**
     * Generate a complete color scheme based on options
     */
    static generateScheme(options = {}) {
        const { baseHue = Math.random() * 360, scheme = 'analogous', saturation = 'normal', theme = 'light' } = options;
        const saturationMap = {
            muted: { min: 20, max: 40 },
            normal: { min: 40, max: 70 },
            vibrant: { min: 70, max: 90 }
        };
        const sat = saturationMap[saturation];
        const baseSat = sat.min + Math.random() * (sat.max - sat.min);
        // Generate color hues based on scheme
        const hues = this.generateHues(baseHue, scheme);
        // Generate the color scheme
        const isDark = theme === 'dark';
        return {
            primary: `hsl(${hues.primary}, ${baseSat}%, ${isDark ? 60 : 45}%)`,
            secondary: `hsl(${hues.secondary}, ${baseSat * 0.8}%, ${isDark ? 55 : 50}%)`,
            accent: `hsl(${hues.accent}, ${baseSat * 1.2}%, ${isDark ? 65 : 40}%)`,
            background: isDark ?
                `hsl(${baseHue}, 10%, 8%)` :
                `hsl(${baseHue}, 15%, 98%)`,
            surface: isDark ?
                `hsl(${baseHue}, 8%, 12%)` :
                `hsl(${baseHue}, 10%, 96%)`,
            text: isDark ?
                `hsl(${baseHue}, 5%, 95%)` :
                `hsl(${baseHue}, 10%, 10%)`,
            textSecondary: isDark ?
                `hsl(${baseHue}, 5%, 70%)` :
                `hsl(${baseHue}, 8%, 35%)`,
            border: isDark ?
                `hsl(${baseHue}, 8%, 25%)` :
                `hsl(${baseHue}, 10%, 88%)`,
            success: `hsl(140, 70%, ${isDark ? 50 : 45}%)`,
            warning: `hsl(45, 85%, ${isDark ? 55 : 50}%)`,
            error: `hsl(0, 70%, ${isDark ? 55 : 50}%)`
        };
    }
    /**
     * Generate hues based on color scheme theory
     */
    static generateHues(baseHue, scheme) {
        const normalizeHue = (h) => ((h % 360) + 360) % 360;
        switch (scheme) {
            case 'monochromatic':
                return {
                    primary: baseHue,
                    secondary: baseHue,
                    accent: baseHue
                };
            case 'analogous':
                return {
                    primary: baseHue,
                    secondary: normalizeHue(baseHue + 30),
                    accent: normalizeHue(baseHue - 30)
                };
            case 'complementary':
                return {
                    primary: baseHue,
                    secondary: normalizeHue(baseHue + 180),
                    accent: normalizeHue(baseHue + 180)
                };
            case 'triadic':
                return {
                    primary: baseHue,
                    secondary: normalizeHue(baseHue + 120),
                    accent: normalizeHue(baseHue + 240)
                };
            case 'tetradic':
                return {
                    primary: baseHue,
                    secondary: normalizeHue(baseHue + 90),
                    accent: normalizeHue(baseHue + 180)
                };
            default:
                return {
                    primary: baseHue,
                    secondary: normalizeHue(baseHue + 30),
                    accent: normalizeHue(baseHue + 60)
                };
        }
    }
    /**
     * Generate CSS custom properties for a color scheme
     */
    static generateCSSVariables(scheme) {
        return `
      :root {
        --color-primary: ${scheme.primary};
        --color-secondary: ${scheme.secondary};
        --color-accent: ${scheme.accent};
        --color-background: ${scheme.background};
        --color-surface: ${scheme.surface};
        --color-text: ${scheme.text};
        --color-text-secondary: ${scheme.textSecondary};
        --color-border: ${scheme.border};
        --color-success: ${scheme.success};
        --color-warning: ${scheme.warning};
        --color-error: ${scheme.error};
        
        /* Derived colors */
        --color-primary-light: ${this.lighten(scheme.primary, 20)};
        --color-primary-dark: ${this.darken(scheme.primary, 20)};
        --color-secondary-light: ${this.lighten(scheme.secondary, 20)};
        --color-secondary-dark: ${this.darken(scheme.secondary, 20)};
        
        /* Shadows */
        --shadow-sm: 0 1px 2px 0 ${this.toRgba(scheme.text, 0.05)};
        --shadow-md: 0 4px 6px -1px ${this.toRgba(scheme.text, 0.1)}, 0 2px 4px -1px ${this.toRgba(scheme.text, 0.06)};
        --shadow-lg: 0 10px 15px -3px ${this.toRgba(scheme.text, 0.1)}, 0 4px 6px -2px ${this.toRgba(scheme.text, 0.05)};
        --shadow-xl: 0 20px 25px -5px ${this.toRgba(scheme.text, 0.1)}, 0 10px 10px -5px ${this.toRgba(scheme.text, 0.04)};
      }
    `;
    }
    /**
     * Generate predefined professional color schemes
     */
    static getProfessionalSchemes() {
        return {
            'tech-blue': {
                primary: 'hsl(217, 91%, 60%)',
                secondary: 'hsl(271, 91%, 65%)',
                accent: 'hsl(0, 91%, 71%)',
                background: 'hsl(0, 0%, 100%)',
                surface: 'hsl(210, 20%, 98%)',
                text: 'hsl(222, 47%, 11%)',
                textSecondary: 'hsl(215, 20%, 65%)',
                border: 'hsl(214, 32%, 91%)',
                success: 'hsl(142, 71%, 45%)',
                warning: 'hsl(45, 93%, 47%)',
                error: 'hsl(0, 84%, 60%)'
            },
            'earth-tones': {
                primary: 'hsl(25, 70%, 50%)',
                secondary: 'hsl(45, 60%, 55%)',
                accent: 'hsl(10, 80%, 60%)',
                background: 'hsl(40, 23%, 97%)',
                surface: 'hsl(39, 20%, 95%)',
                text: 'hsl(25, 30%, 15%)',
                textSecondary: 'hsl(25, 15%, 40%)',
                border: 'hsl(30, 20%, 88%)',
                success: 'hsl(140, 60%, 45%)',
                warning: 'hsl(45, 85%, 50%)',
                error: 'hsl(0, 70%, 55%)'
            },
            'ocean-breeze': {
                primary: 'hsl(199, 89%, 48%)',
                secondary: 'hsl(187, 80%, 42%)',
                accent: 'hsl(174, 72%, 56%)',
                background: 'hsl(195, 53%, 97%)',
                surface: 'hsl(195, 40%, 96%)',
                text: 'hsl(200, 50%, 10%)',
                textSecondary: 'hsl(200, 20%, 45%)',
                border: 'hsl(195, 30%, 90%)',
                success: 'hsl(140, 70%, 45%)',
                warning: 'hsl(45, 90%, 50%)',
                error: 'hsl(0, 75%, 55%)'
            },
            'midnight': {
                primary: 'hsl(217, 91%, 60%)',
                secondary: 'hsl(271, 81%, 65%)',
                accent: 'hsl(350, 80%, 65%)',
                background: 'hsl(222, 47%, 8%)',
                surface: 'hsl(222, 40%, 12%)',
                text: 'hsl(210, 20%, 95%)',
                textSecondary: 'hsl(215, 15%, 70%)',
                border: 'hsl(220, 30%, 20%)',
                success: 'hsl(142, 71%, 50%)',
                warning: 'hsl(45, 93%, 55%)',
                error: 'hsl(0, 84%, 65%)'
            }
        };
    }
    /**
     * Utility functions
     */
    static lighten(color, percent) {
        const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match)
            return color;
        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = Math.min(100, parseInt(match[3]) + percent);
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    static darken(color, percent) {
        const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match)
            return color;
        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = Math.max(0, parseInt(match[3]) - percent);
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    static toRgba(_color, alpha) {
        // Simplified conversion - in production, use proper HSL to RGB conversion
        return `rgba(0, 0, 0, ${alpha})`;
    }
}
/**
 * Generate variations for a specific trade/business type
 */
export function generateTradeColorSchemes(trade) {
    const tradeHues = {
        electricien: [45, 60, 200], // Yellow, orange, blue
        plombier: [200, 210, 220], // Blues
        menuisier: [25, 35, 45], // Browns, oranges
        peintre: [0, 120, 240], // Full spectrum
        macon: [20, 30, 40], // Earth tones
        jardinier: [120, 140, 160], // Greens
        couvreur: [0, 15, 30], // Reds, oranges
        carreleur: [180, 200, 220], // Cyans, blues
    };
    const hues = tradeHues[trade] || [Math.random() * 360];
    return hues.map(hue => ColorGenerator.generateScheme({
        baseHue: hue,
        scheme: 'analogous',
        contrast: 'medium',
        saturation: 'normal',
        theme: 'light'
    }));
}

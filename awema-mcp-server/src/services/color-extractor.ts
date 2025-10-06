import sharp from 'sharp';
import { promisify } from 'util';
import Vibrant from 'node-vibrant';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  vibrant?: string;
  muted?: string;
  darkVibrant?: string;
  darkMuted?: string;
  lightVibrant?: string;
  lightMuted?: string;
}

export class ColorExtractor {
  async extract(screenshotBase64: string): Promise<ColorPalette> {
    try {
      // Convertir base64 en buffer
      const buffer = Buffer.from(screenshotBase64, 'base64');

      // Redimensionner l'image pour une analyse plus rapide
      const resizedBuffer = await sharp(buffer)
        .resize(400, 300, { fit: 'inside' })
        .toBuffer();

      // Utiliser Vibrant pour extraire la palette
      const palette = await Vibrant.from(resizedBuffer).getPalette();

      // Construire la palette de couleurs
      const colors: ColorPalette = {
        primary: palette.Vibrant?.hex || '#ff6900',
        secondary: palette.DarkVibrant?.hex || '#1a1a1a',
        accent: palette.LightVibrant?.hex || '#ff8c00',
        vibrant: palette.Vibrant?.hex,
        muted: palette.Muted?.hex,
        darkVibrant: palette.DarkVibrant?.hex,
        darkMuted: palette.DarkMuted?.hex,
        lightVibrant: palette.LightVibrant?.hex,
        lightMuted: palette.LightMuted?.hex
      };

      // Ajuster pour les sites artisans (privilégier les couleurs chaudes)
      if (this.isWarmColor(colors.primary)) {
        // Garder la couleur chaude comme primaire
      } else if (this.isWarmColor(colors.accent)) {
        // Échanger primary et accent
        [colors.primary, colors.accent] = [colors.accent, colors.primary];
      }

      return colors;

    } catch (error) {
      console.error('Error extracting colors:', error);
      // Retourner des couleurs par défaut pour artisan
      return {
        primary: '#ff6900',
        secondary: '#1a1a1a',
        accent: '#ff8c00'
      };
    }
  }

  private isWarmColor(hex: string): boolean {
    if (!hex) return false;
    
    // Convertir hex en RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Les couleurs chaudes ont plus de rouge et/ou jaune
    return r > b && (r > 150 || g > 100);
  }

  async extractFromDOM(html: string): Promise<ColorPalette> {
    // Extraire les couleurs depuis le HTML/CSS
    const colorRegex = /#([0-9a-f]{3}|[0-9a-f]{6})\b|rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi;
    const matches = html.match(colorRegex) || [];
    
    // Compter la fréquence des couleurs
    const colorFrequency = new Map<string, number>();
    
    matches.forEach(color => {
      const normalized = this.normalizeColor(color);
      if (normalized) {
        colorFrequency.set(normalized, (colorFrequency.get(normalized) || 0) + 1);
      }
    });

    // Trier par fréquence
    const sortedColors = Array.from(colorFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);

    // Filtrer les couleurs trop claires ou trop sombres
    const usableColors = sortedColors.filter(color => {
      const brightness = this.getColorBrightness(color);
      return brightness > 30 && brightness < 220;
    });

    return {
      primary: usableColors[0] || '#ff6900',
      secondary: usableColors[1] || '#1a1a1a',
      accent: usableColors[2] || '#ff8c00'
    };
  }

  private normalizeColor(color: string): string | null {
    color = color.trim().toLowerCase();
    
    // Hex couleur
    if (color.startsWith('#')) {
      if (color.length === 4) {
        // Convertir #abc en #aabbcc
        return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      }
      return color;
    }
    
    // RGB
    if (color.startsWith('rgb')) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        return this.rgbToHex(r, g, b);
      }
    }
    
    return null;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  private getColorBrightness(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Formule de luminosité perçue
    return (r * 299 + g * 587 + b * 114) / 1000;
  }
}
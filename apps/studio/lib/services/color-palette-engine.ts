import { z } from 'zod';
import Color from 'color';

export interface ColorPalette {
  id: string;
  name: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background?: string;
    surface?: string;
    text?: string;
    textLight?: string;
    error?: string;
    warning?: string;
    success?: string;
  };
  mood: 'professional' | 'friendly' | 'urgent' | 'luxury' | 'tech' | 'natural' | 'bold';
  contrast: 'high' | 'medium' | 'low';
  accessibility: number; // Score WCAG
}

export class ColorPaletteEngine {
  private palettes: Map<string, ColorPalette[]> = new Map();

  constructor() {
    this.initializePalettes();
  }

  // Initialiser les palettes par métier
  private initializePalettes() {
    // Palettes Plombier
    this.palettes.set('plombier', [
      {
        id: 'ocean-trust',
        name: 'Ocean Trust',
        category: 'plombier',
        colors: {
          primary: '#0066CC',
          secondary: '#00A651',
          accent: '#FF6B35',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#1A202C',
          textLight: '#718096',
          error: '#E53E3E',
          warning: '#F6AD55',
          success: '#48BB78'
        },
        mood: 'professional',
        contrast: 'high',
        accessibility: 95
      },
      {
        id: 'aqua-modern',
        name: 'Aqua Modern',
        category: 'plombier',
        colors: {
          primary: '#0891B2',
          secondary: '#7C3AED',
          accent: '#EC4899',
          background: '#F9FAFB',
          surface: '#FFFFFF',
          text: '#111827',
          textLight: '#6B7280'
        },
        mood: 'tech',
        contrast: 'high',
        accessibility: 92
      },
      {
        id: 'urgency-pro',
        name: 'Urgency Pro',
        category: 'plombier',
        colors: {
          primary: '#DC2626',
          secondary: '#059669',
          accent: '#F59E0B',
          background: '#FEF3C7',
          surface: '#FFFBEB',
          text: '#78350F',
          textLight: '#92400E'
        },
        mood: 'urgent',
        contrast: 'high',
        accessibility: 90
      }
    ]);

    // Palettes Électricien
    this.palettes.set('electricien', [
      {
        id: 'voltage-yellow',
        name: 'Voltage Yellow',
        category: 'electricien',
        colors: {
          primary: '#FCD34D',
          secondary: '#1F2937',
          accent: '#EF4444',
          background: '#FFFBEB',
          surface: '#FEF3C7',
          text: '#1F2937',
          textLight: '#4B5563'
        },
        mood: 'tech',
        contrast: 'high',
        accessibility: 94
      },
      {
        id: 'electric-purple',
        name: 'Electric Purple',
        category: 'electricien',
        colors: {
          primary: '#8B5CF6',
          secondary: '#10B981',
          accent: '#F59E0B',
          background: '#FAFAF9',
          surface: '#FFFFFF',
          text: '#18181B',
          textLight: '#71717A'
        },
        mood: 'tech',
        contrast: 'medium',
        accessibility: 88
      },
      {
        id: 'power-grid',
        name: 'Power Grid',
        category: 'electricien',
        colors: {
          primary: '#3B82F6',
          secondary: '#F97316',
          accent: '#06B6D4',
          background: '#F0F9FF',
          surface: '#E0F2FE',
          text: '#0C4A6E',
          textLight: '#075985'
        },
        mood: 'professional',
        contrast: 'high',
        accessibility: 93
      }
    ]);

    // Palettes Menuisier
    this.palettes.set('menuisier', [
      {
        id: 'wood-craft',
        name: 'Wood Craft',
        category: 'menuisier',
        colors: {
          primary: '#92400E',
          secondary: '#059669',
          accent: '#F59E0B',
          background: '#FEF3C7',
          surface: '#FFFBEB',
          text: '#451A03',
          textLight: '#78350F'
        },
        mood: 'natural',
        contrast: 'high',
        accessibility: 91
      },
      {
        id: 'artisan-elegant',
        name: 'Artisan Elegant',
        category: 'menuisier',
        colors: {
          primary: '#7C2D12',
          secondary: '#0891B2',
          accent: '#D97706',
          background: '#FFFBF3',
          surface: '#FFF7ED',
          text: '#18181B',
          textLight: '#57534E'
        },
        mood: 'luxury',
        contrast: 'medium',
        accessibility: 89
      }
    ]);

    // Palettes Peintre
    this.palettes.set('peintre', [
      {
        id: 'creative-spectrum',
        name: 'Creative Spectrum',
        category: 'peintre',
        colors: {
          primary: '#7C3AED',
          secondary: '#EC4899',
          accent: '#06B6D4',
          background: '#FAFAFF',
          surface: '#F3F4F6',
          text: '#111827',
          textLight: '#6B7280'
        },
        mood: 'bold',
        contrast: 'high',
        accessibility: 90
      },
      {
        id: 'pastel-dream',
        name: 'Pastel Dream',
        category: 'peintre',
        colors: {
          primary: '#A78BFA',
          secondary: '#F9A8D4',
          accent: '#67E8F9',
          background: '#FDF4FF',
          surface: '#FCE7F3',
          text: '#701A75',
          textLight: '#A21CAF'
        },
        mood: 'friendly',
        contrast: 'medium',
        accessibility: 87
      }
    ]);

    // Palettes Génériques Pro
    this.palettes.set('general', [
      {
        id: 'corporate-blue',
        name: 'Corporate Blue',
        category: 'general',
        colors: {
          primary: '#1E40AF',
          secondary: '#10B981',
          accent: '#F59E0B',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          textLight: '#64748B'
        },
        mood: 'professional',
        contrast: 'high',
        accessibility: 96
      },
      {
        id: 'modern-dark',
        name: 'Modern Dark',
        category: 'general',
        colors: {
          primary: '#8B5CF6',
          secondary: '#10B981',
          accent: '#F59E0B',
          background: '#0F172A',
          surface: '#1E293B',
          text: '#F8FAFC',
          textLight: '#CBD5E1'
        },
        mood: 'tech',
        contrast: 'high',
        accessibility: 94
      },
      {
        id: 'luxury-gold',
        name: 'Luxury Gold',
        category: 'general',
        colors: {
          primary: '#991B1B',
          secondary: '#B91C1C',
          accent: '#FCD34D',
          background: '#1F2937',
          surface: '#374151',
          text: '#F9FAFB',
          textLight: '#D1D5DB'
        },
        mood: 'luxury',
        contrast: 'high',
        accessibility: 92
      }
    ]);
  }

  // Obtenir les palettes pour un métier
  getPalettesForBusiness(businessType: string): ColorPalette[] {
    const businessPalettes = this.palettes.get(businessType) || [];
    const generalPalettes = this.palettes.get('general') || [];
    return [...businessPalettes, ...generalPalettes];
  }

  // Obtenir une palette par mood
  getPalettesByMood(mood: ColorPalette['mood']): ColorPalette[] {
    const allPalettes: ColorPalette[] = [];
    this.palettes.forEach(palettes => {
      allPalettes.push(...palettes.filter(p => p.mood === mood));
    });
    return allPalettes;
  }

  // Générer une palette personnalisée basée sur une couleur
  generateCustomPalette(baseColor: string, mood: ColorPalette['mood'] = 'professional'): ColorPalette {
    const base = Color(baseColor);
    
    // Générer les couleurs complémentaires
    const colors = {
      primary: base.hex(),
      secondary: this.generateSecondary(base, mood),
      accent: this.generateAccent(base, mood),
      background: this.generateBackground(base, mood),
      surface: this.generateSurface(base, mood),
      text: this.generateTextColor(base, mood),
      textLight: this.generateTextLight(base, mood),
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981'
    };

    // Calculer l'accessibilité
    const accessibility = this.calculateAccessibility(colors);

    return {
      id: 'custom-' + Date.now(),
      name: 'Custom Palette',
      category: 'custom',
      colors,
      mood,
      contrast: this.calculateContrast(colors),
      accessibility
    };
  }

  // Générer une couleur secondaire
  private generateSecondary(base: Color, mood: ColorPalette['mood']): string {
    switch (mood) {
      case 'professional':
        return base.rotate(180).saturate(0.5).hex();
      case 'friendly':
        return base.rotate(60).lighten(0.2).hex();
      case 'urgent':
        return base.rotate(-120).saturate(0.8).hex();
      case 'luxury':
        return base.rotate(30).darken(0.3).hex();
      case 'tech':
        return base.rotate(240).hex();
      case 'natural':
        return base.rotate(120).desaturate(0.3).hex();
      case 'bold':
        return base.rotate(90).saturate(1).hex();
      default:
        return base.rotate(180).hex();
    }
  }

  // Générer une couleur d'accent
  private generateAccent(base: Color, mood: ColorPalette['mood']): string {
    switch (mood) {
      case 'urgent':
        return '#F59E0B'; // Orange pour urgence
      case 'luxury':
        return '#FCD34D'; // Or pour luxe
      case 'tech':
        return base.rotate(180).negate().hex();
      default:
        return base.rotate(120).hex();
    }
  }

  // Générer une couleur de fond
  private generateBackground(base: Color, mood: ColorPalette['mood']): string {
    if (mood === 'luxury' || mood === 'tech') {
      // Fond sombre pour luxe et tech
      return base.darken(0.9).desaturate(0.5).hex();
    }
    // Fond clair pour les autres
    return base.lighten(0.95).desaturate(0.8).hex();
  }

  // Générer une couleur de surface
  private generateSurface(base: Color, mood: ColorPalette['mood']): string {
    if (mood === 'luxury' || mood === 'tech') {
      return base.darken(0.8).desaturate(0.4).hex();
    }
    return '#FFFFFF';
  }

  // Générer une couleur de texte
  private generateTextColor(base: Color, mood: ColorPalette['mood']): string {
    const background = this.generateBackground(base, mood);
    const bgLuminosity = Color(background).luminosity();
    
    // Texte clair sur fond sombre, texte sombre sur fond clair
    return bgLuminosity > 0.5 ? '#0F172A' : '#F8FAFC';
  }

  // Générer une couleur de texte claire
  private generateTextLight(base: Color, mood: ColorPalette['mood']): string {
    const textColor = this.generateTextColor(base, mood);
    return Color(textColor).alpha(0.7).hex();
  }

  // Calculer le score d'accessibilité
  private calculateAccessibility(colors: any): number {
    let score = 0;
    let tests = 0;

    // Test du contraste texte/fond
    const textBgContrast = Color(colors.text).contrast(Color(colors.background));
    if (textBgContrast >= 7) score += 30; // AAA
    else if (textBgContrast >= 4.5) score += 20; // AA
    tests++;

    // Test du contraste primary/fond
    const primaryBgContrast = Color(colors.primary).contrast(Color(colors.background));
    if (primaryBgContrast >= 4.5) score += 25;
    tests++;

    // Test du contraste secondary/fond
    const secondaryBgContrast = Color(colors.secondary).contrast(Color(colors.background));
    if (secondaryBgContrast >= 4.5) score += 25;
    tests++;

    // Test du contraste accent/fond
    const accentBgContrast = Color(colors.accent).contrast(Color(colors.background));
    if (accentBgContrast >= 4.5) score += 20;
    tests++;

    return Math.round(score);
  }

  // Calculer le niveau de contraste
  private calculateContrast(colors: any): 'high' | 'medium' | 'low' {
    const avgContrast = (
      Color(colors.text).contrast(Color(colors.background)) +
      Color(colors.primary).contrast(Color(colors.background)) +
      Color(colors.secondary).contrast(Color(colors.background))
    ) / 3;

    if (avgContrast >= 7) return 'high';
    if (avgContrast >= 4.5) return 'medium';
    return 'low';
  }

  // Ajuster une palette pour un mood spécifique
  adjustPaletteForMood(palette: ColorPalette, newMood: ColorPalette['mood']): ColorPalette {
    const basePrimary = Color(palette.colors.primary);
    
    // Ajuster selon le nouveau mood
    const adjustedPalette = { ...palette };
    adjustedPalette.mood = newMood;
    
    switch (newMood) {
      case 'urgent':
        // Rendre plus rouge/orange
        adjustedPalette.colors.primary = basePrimary.rotate(-30).saturate(0.2).hex();
        adjustedPalette.colors.accent = '#F59E0B';
        break;
        
      case 'luxury':
        // Assombrir et désaturer légèrement
        adjustedPalette.colors.primary = basePrimary.darken(0.2).hex();
        adjustedPalette.colors.background = '#1F2937';
        adjustedPalette.colors.accent = '#FCD34D';
        break;
        
      case 'friendly':
        // Éclaircir et réchauffer
        adjustedPalette.colors.primary = basePrimary.lighten(0.1).rotate(10).hex();
        break;
        
      case 'tech':
        // Rendre plus froid et moderne
        adjustedPalette.colors.primary = basePrimary.rotate(-20).hex();
        adjustedPalette.colors.secondary = '#10B981';
        break;
    }
    
    // Recalculer l'accessibilité
    adjustedPalette.accessibility = this.calculateAccessibility(adjustedPalette.colors);
    adjustedPalette.contrast = this.calculateContrast(adjustedPalette.colors);
    
    return adjustedPalette;
  }

  // Obtenir la meilleure palette pour un formulaire
  getBestPaletteForForm(formData: any): ColorPalette {
    const palettes = this.getPalettesForBusiness(formData.businessType);
    
    // Déterminer le mood approprié
    let mood: ColorPalette['mood'] = 'professional';
    if (formData.is24x7Available) mood = 'urgent';
    else if (formData.stylePreference === 'elegant') mood = 'luxury';
    else if (formData.targetAudience?.includes('particuliers')) mood = 'friendly';
    else if (formData.businessType === 'electricien') mood = 'tech';
    
    // Filtrer par mood
    const moodPalettes = palettes.filter(p => p.mood === mood);
    
    // Retourner la palette avec le meilleur score d'accessibilité
    return moodPalettes.reduce((best, current) => 
      current.accessibility > best.accessibility ? current : best
    , moodPalettes[0] || palettes[0]);
  }

  // Exporter toutes les palettes
  exportPalettes(): ColorPalette[] {
    const allPalettes: ColorPalette[] = [];
    this.palettes.forEach(palettes => {
      allPalettes.push(...palettes);
    });
    return allPalettes;
  }
}
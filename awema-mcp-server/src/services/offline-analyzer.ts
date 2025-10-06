/**
 * Analyseur OFFLINE sans API - Ultra performant et gratuit
 * Utilise des algorithmes locaux pour analyser les designs
 */

import sharp from 'sharp';
import Color from 'color';
import { PERFORMANCE_CONFIG } from '../config/performance.config.js';

export class OfflineAnalyzer {
  /**
   * Analyse une image sans API externe
   */
  async analyzeImage(imageBuffer: Buffer): Promise<DesignAnalysis> {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    
    // 1. Extraction des couleurs dominantes
    const colors = await this.extractColors(imageBuffer);
    
    // 2. Détection de la structure/layout
    const layout = await this.detectLayout(imageBuffer, metadata);
    
    // 3. Analyse du style visuel
    const style = this.analyzeStyle(colors, layout);
    
    // 4. Détection des zones de contenu
    const contentZones = await this.detectContentZones(imageBuffer, metadata);
    
    // 5. Analyse de la complexité
    const complexity = this.analyzeComplexity(contentZones, colors);

    return {
      colors,
      layout,
      style,
      contentZones,
      complexity,
      recommendations: this.generateRecommendations(style, complexity),
    };
  }

  /**
   * Extraction des couleurs avec algorithme de quantification
   */
  private async extractColors(imageBuffer: Buffer): Promise<ColorAnalysis> {
    const { dominant, palette } = await sharp(imageBuffer)
      .resize(150, 150, { fit: 'inside' }) // Réduire pour performance
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const colors = new Map<string, number>();
        
        // Compter les occurrences de couleurs
        for (let i = 0; i < data.length; i += info.channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Quantifier les couleurs (réduire la précision)
          const qR = Math.round(r / 15) * 15;
          const qG = Math.round(g / 15) * 15;
          const qB = Math.round(b / 15) * 15;
          
          const hex = `#${[qR, qG, qB].map(x => x.toString(16).padStart(2, '0')).join('')}`;
          colors.set(hex, (colors.get(hex) || 0) + 1);
        }
        
        // Trier par fréquence
        const sorted = Array.from(colors.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([color]) => color);
        
        return {
          dominant: sorted[0],
          palette: sorted.slice(0, 5),
        };
      });

    // Analyser les propriétés des couleurs
    const primaryColor = Color(dominant);
    const isDark = primaryColor.lightness() < 50;
    const saturation = primaryColor.hsl().color[1];
    
    // Générer une palette harmonieuse
    const harmoniousPalette = this.generateHarmoniousPalette(dominant);
    
    // Calculer les contrastes
    const contrasts = this.calculateContrasts(palette);

    return {
      dominant,
      palette,
      harmoniousPalette,
      isDark,
      saturation,
      contrasts,
      accessibility: contrasts.every(c => c >= 7.0) ? 'AAA' : 'AA',
    };
  }

  /**
   * Génère une palette harmonieuse à partir d'une couleur
   */
  private generateHarmoniousPalette(baseColor: string): HarmoniousPalette {
    const base = Color(baseColor);
    
    return {
      primary: baseColor,
      secondary: base.rotate(120).hex(), // Triade
      accent: base.rotate(180).hex(),    // Complémentaire
      light: base.lighten(0.4).hex(),
      dark: base.darken(0.4).hex(),
      background: base.lightness() > 50 ? '#ffffff' : '#1a1a1a',
      text: base.lightness() > 50 ? '#1a1a1a' : '#ffffff',
    };
  }

  /**
   * Calcule les ratios de contraste
   */
  private calculateContrasts(colors: string[]): number[] {
    const contrasts: number[] = [];
    
    for (let i = 0; i < colors.length - 1; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const ratio = Color(colors[i]).contrast(Color(colors[j]));
        contrasts.push(ratio);
      }
    }
    
    return contrasts;
  }

  /**
   * Détecte le type de layout via analyse de contours
   */
  private async detectLayout(imageBuffer: Buffer, metadata: any): Promise<LayoutAnalysis> {
    // Détection des bords pour identifier la structure
    const edges = await sharp(imageBuffer)
      .grayscale()
      .convolve({
        width: 3,
        height: 3,
        kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1], // Laplacian edge detection
      })
      .raw()
      .toBuffer();

    // Analyser la distribution des bords
    const horizontalEdges = this.countHorizontalLines(edges, metadata);
    const verticalEdges = this.countVerticalLines(edges, metadata);
    
    // Déterminer le type de layout
    let layoutType: 'grid' | 'flex' | 'masonry' | 'asymmetric';
    if (horizontalEdges > 5 && verticalEdges > 5) {
      layoutType = 'grid';
    } else if (verticalEdges > horizontalEdges * 1.5) {
      layoutType = 'flex';
    } else if (horizontalEdges > verticalEdges * 1.5) {
      layoutType = 'masonry';
    } else {
      layoutType = 'asymmetric';
    }

    // Détecter les colonnes
    const columns = Math.min(12, Math.max(1, Math.round(verticalEdges / 2)));
    
    // Analyser l'espacement
    const spacing = this.detectSpacing(edges, metadata);

    return {
      type: layoutType,
      columns,
      hasGrid: layoutType === 'grid',
      spacing,
      symmetry: Math.abs(horizontalEdges - verticalEdges) < 3 ? 'symmetric' : 'asymmetric',
      density: (horizontalEdges + verticalEdges) / (metadata.width + metadata.height),
    };
  }

  /**
   * Compte les lignes horizontales (pour détecter les sections)
   */
  private countHorizontalLines(edges: Buffer, metadata: any): number {
    let count = 0;
    const threshold = 128;
    
    for (let y = 0; y < metadata.height; y += 10) {
      let consecutivePixels = 0;
      for (let x = 0; x < metadata.width; x++) {
        const idx = (y * metadata.width + x) * metadata.channels;
        if (edges[idx] > threshold) {
          consecutivePixels++;
          if (consecutivePixels > metadata.width * 0.6) {
            count++;
            break;
          }
        } else {
          consecutivePixels = 0;
        }
      }
    }
    
    return count;
  }

  /**
   * Compte les lignes verticales (pour détecter les colonnes)
   */
  private countVerticalLines(edges: Buffer, metadata: any): number {
    let count = 0;
    const threshold = 128;
    
    for (let x = 0; x < metadata.width; x += 10) {
      let consecutivePixels = 0;
      for (let y = 0; y < metadata.height; y++) {
        const idx = (y * metadata.width + x) * metadata.channels;
        if (edges[idx] > threshold) {
          consecutivePixels++;
          if (consecutivePixels > metadata.height * 0.6) {
            count++;
            break;
          }
        } else {
          consecutivePixels = 0;
        }
      }
    }
    
    return count;
  }

  /**
   * Détecte l'espacement moyen
   */
  private detectSpacing(edges: Buffer, metadata: any): SpacingSystem {
    // Simplified - en production, analyser les gaps entre éléments
    const baseUnit = 8; // Système de grille 8px
    
    return {
      base: baseUnit,
      scale: 1.5, // Échelle d'espacement
      pattern: 'consistent',
      padding: {
        small: baseUnit,
        medium: baseUnit * 2,
        large: baseUnit * 4,
      },
      margin: {
        small: baseUnit,
        medium: baseUnit * 3,
        large: baseUnit * 6,
      },
    };
  }

  /**
   * Détecte les zones de contenu principales
   */
  private async detectContentZones(imageBuffer: Buffer, metadata: any): Promise<ContentZone[]> {
    // Segmentation basique par analyse de densité
    const segments = await sharp(imageBuffer)
      .resize(20, 20, { fit: 'fill' }) // Très petite taille pour segmentation rapide
      .raw()
      .toBuffer();

    const zones: ContentZone[] = [];
    const gridSize = 20;
    
    // Analyser chaque cellule de la grille
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const idx = (y * gridSize + x) * 3;
        const brightness = (segments[idx] + segments[idx + 1] + segments[idx + 2]) / 3;
        
        // Si la zone a du contenu (ni trop clair ni trop sombre)
        if (brightness > 30 && brightness < 225) {
          const zone: ContentZone = {
            x: (x / gridSize) * metadata.width,
            y: (y / gridSize) * metadata.height,
            width: metadata.width / gridSize,
            height: metadata.height / gridSize,
            type: this.guessZoneType(y, gridSize),
            density: brightness / 255,
          };
          zones.push(zone);
        }
      }
    }

    return this.mergeAdjacentZones(zones);
  }

  /**
   * Devine le type de zone selon sa position
   */
  private guessZoneType(yPosition: number, gridSize: number): string {
    const relativeY = yPosition / gridSize;
    
    if (relativeY < 0.15) return 'header';
    if (relativeY < 0.35) return 'hero';
    if (relativeY < 0.5) return 'features';
    if (relativeY < 0.7) return 'content';
    if (relativeY < 0.85) return 'cta';
    return 'footer';
  }

  /**
   * Fusionne les zones adjacentes
   */
  private mergeAdjacentZones(zones: ContentZone[]): ContentZone[] {
    // Simplified - en production, utiliser un algorithme de clustering
    return zones;
  }

  /**
   * Analyse le style visuel global
   */
  private analyzeStyle(colors: ColorAnalysis, layout: LayoutAnalysis): StyleAnalysis {
    const { isDark, saturation } = colors;
    const { type: layoutType, symmetry, density } = layout;
    
    // Déterminer le style
    let style: 'corporate' | 'modern' | 'creative' | 'minimal' | 'bold';
    
    if (saturation < 20 && symmetry === 'symmetric') {
      style = 'minimal';
    } else if (saturation > 70 && density > 0.5) {
      style = 'bold';
    } else if (layoutType === 'grid' && saturation < 50) {
      style = 'corporate';
    } else if (layoutType === 'asymmetric' || saturation > 60) {
      style = 'creative';
    } else {
      style = 'modern';
    }

    const formality = style === 'corporate' || style === 'minimal' ? 'professional' : 'casual';
    const complexity = density > 0.5 ? 'complex' : density > 0.3 ? 'moderate' : 'simple';

    return {
      style,
      formality,
      complexity,
      modernness: style === 'modern' || style === 'creative' ? 'cutting-edge' : 'classic',
      attributes: {
        clean: complexity === 'simple',
        professional: formality === 'professional',
        playful: style === 'creative',
        elegant: style === 'minimal',
        dynamic: style === 'bold',
      },
    };
  }

  /**
   * Analyse la complexité du design
   */
  private analyzeComplexity(zones: ContentZone[], colors: ColorAnalysis): ComplexityAnalysis {
    const elementCount = zones.length;
    const colorCount = colors.palette.length;
    const contrastVariety = new Set(colors.contrasts.map(c => Math.round(c))).size;
    
    // Score de complexité (0-100)
    const score = Math.min(100, 
      (elementCount * 3) + 
      (colorCount * 5) + 
      (contrastVariety * 10)
    );

    return {
      score,
      level: score > 70 ? 'high' : score > 40 ? 'medium' : 'low',
      factors: {
        elements: elementCount,
        colors: colorCount,
        contrasts: contrastVariety,
      },
      recommendation: score > 70 
        ? 'Simplifier pour améliorer la lisibilité'
        : score < 30 
        ? 'Ajouter des éléments visuels pour plus d\'intérêt'
        : 'Bon équilibre de complexité',
    };
  }

  /**
   * Génère des recommandations
   */
  private generateRecommendations(style: StyleAnalysis, complexity: ComplexityAnalysis): string[] {
    const recommendations: string[] = [];

    // Recommandations selon le style
    if (style.style === 'corporate') {
      recommendations.push('Utiliser une grille stricte pour la structure');
      recommendations.push('Privilégier les couleurs sobres et professionnelles');
      recommendations.push('Typography sans-serif claire et lisible');
    } else if (style.style === 'modern') {
      recommendations.push('Intégrer des micro-animations subtiles');
      recommendations.push('Utiliser des espaces blancs généreux');
      recommendations.push('Gradients subtils pour la profondeur');
    }

    // Recommandations selon la complexité
    if (complexity.level === 'high') {
      recommendations.push('Réduire le nombre de couleurs à 3-4 maximum');
      recommendations.push('Créer une hiérarchie visuelle plus claire');
    } else if (complexity.level === 'low') {
      recommendations.push('Ajouter des éléments visuels d\'intérêt');
      recommendations.push('Introduire des variations subtiles');
    }

    // Toujours optimiser pour la performance
    recommendations.push('Optimiser les images en AVIF/WebP');
    recommendations.push('Implémenter le lazy loading');
    recommendations.push('Minimiser le CSS critique');

    return recommendations;
  }
}

// Types
interface DesignAnalysis {
  colors: ColorAnalysis;
  layout: LayoutAnalysis;
  style: StyleAnalysis;
  contentZones: ContentZone[];
  complexity: ComplexityAnalysis;
  recommendations: string[];
}

interface ColorAnalysis {
  dominant: string;
  palette: string[];
  harmoniousPalette: HarmoniousPalette;
  isDark: boolean;
  saturation: number;
  contrasts: number[];
  accessibility: 'AA' | 'AAA';
}

interface HarmoniousPalette {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
  dark: string;
  background: string;
  text: string;
}

interface LayoutAnalysis {
  type: 'grid' | 'flex' | 'masonry' | 'asymmetric';
  columns: number;
  hasGrid: boolean;
  spacing: SpacingSystem;
  symmetry: 'symmetric' | 'asymmetric';
  density: number;
}

interface SpacingSystem {
  base: number;
  scale: number;
  pattern: 'consistent' | 'variable';
  padding: {
    small: number;
    medium: number;
    large: number;
  };
  margin: {
    small: number;
    medium: number;
    large: number;
  };
}

interface ContentZone {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  density: number;
}

interface StyleAnalysis {
  style: 'corporate' | 'modern' | 'creative' | 'minimal' | 'bold';
  formality: 'casual' | 'professional';
  complexity: 'simple' | 'moderate' | 'complex';
  modernness: 'classic' | 'modern' | 'cutting-edge';
  attributes: {
    clean: boolean;
    professional: boolean;
    playful: boolean;
    elegant: boolean;
    dynamic: boolean;
  };
}

interface ComplexityAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: {
    elements: number;
    colors: number;
    contrasts: number;
  };
  recommendation: string;
}
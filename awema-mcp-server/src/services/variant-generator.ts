import { VisualPattern } from './visual-analyzer';
import { GeneratedBlock } from './block-generator';

export interface VariantOptions {
  style: 'moderne' | 'classique' | 'minimaliste' | 'premium' | 'dynamique';
  intensity: 'subtile' | 'normale' | 'forte';
  colorScheme?: 'original' | 'inverse' | 'monochrome' | 'vibrant';
}

export class VariantGenerator {
  generateVariants(
    baseBlock: GeneratedBlock, 
    visualPattern: VisualPattern,
    options: VariantOptions[]
  ): GeneratedBlock[] {
    return options.map(opt => this.createVariant(baseBlock, visualPattern, opt));
  }

  private createVariant(
    base: GeneratedBlock,
    pattern: VisualPattern,
    options: VariantOptions
  ): GeneratedBlock {
    const variant = JSON.parse(JSON.stringify(base)); // Deep clone
    variant.id = `${base.id}-${options.style}-${options.intensity}`;
    
    // Appliquer les transformations selon le style
    switch (options.style) {
      case 'moderne':
        this.applyModernStyle(variant, pattern, options.intensity);
        break;
      case 'classique':
        this.applyClassicStyle(variant, pattern, options.intensity);
        break;
      case 'minimaliste':
        this.applyMinimalistStyle(variant, pattern, options.intensity);
        break;
      case 'premium':
        this.applyPremiumStyle(variant, pattern, options.intensity);
        break;
      case 'dynamique':
        this.applyDynamicStyle(variant, pattern, options.intensity);
        break;
    }

    // Appliquer le schéma de couleurs si spécifié
    if (options.colorScheme) {
      this.applyColorScheme(variant, options.colorScheme);
    }

    return variant;
  }

  private applyModernStyle(block: GeneratedBlock, pattern: VisualPattern, intensity: string) {
    // Augmenter les border radius
    const radiusMap = {
      subtile: pattern.borders.radius.small[0] || '4px',
      normale: pattern.borders.radius.medium[0] || '12px',
      forte: pattern.borders.radius.large[0] || '24px'
    };

    // Ajouter des ombres douces
    const shadowMap = {
      subtile: '0 2px 4px rgba(0,0,0,0.1)',
      normale: '0 8px 16px rgba(0,0,0,0.1)',
      forte: '0 20px 40px rgba(0,0,0,0.15)'
    };

    // Appliquer les styles
    block.data.borderRadius = radiusMap[intensity];
    block.data.boxShadow = shadowMap[intensity];
    
    // Espacements généreux
    block.data.padding = intensity === 'forte' ? pattern.spacing.xlarge : pattern.spacing.large;
    
    // Gradient subtil pour le fond
    if (intensity !== 'subtile') {
      block.data.backgroundGradient = `linear-gradient(135deg, ${block.data.primaryColor}10, ${block.data.primaryColor}05)`;
    }

    // Animations au hover
    block.data.hoverEffect = 'transform: translateY(-4px); box-shadow: ' + shadowMap[intensity];
    block.data.transition = 'all 0.3s ease';
  }

  private applyClassicStyle(block: GeneratedBlock, pattern: VisualPattern, intensity: string) {
    // Coins moins arrondis
    block.data.borderRadius = intensity === 'subtile' ? '0' : '4px';
    
    // Bordures définies
    const borderMap = {
      subtile: '1px solid rgba(0,0,0,0.1)',
      normale: '2px solid rgba(0,0,0,0.15)',
      forte: '3px solid rgba(0,0,0,0.2)'
    };
    block.data.border = borderMap[intensity];
    
    // Pas d'ombres ou très subtiles
    if (intensity !== 'subtile') {
      block.data.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }
    
    // Typographie plus formelle
    block.data.fontWeight = '400';
    block.data.letterSpacing = '0.02em';
  }

  private applyMinimalistStyle(block: GeneratedBlock, pattern: VisualPattern, intensity: string) {
    // Supprimer les éléments superflus
    block.data.boxShadow = 'none';
    block.data.border = 'none';
    block.data.borderRadius = '0';
    
    // Espacements généreux
    const spacingMap = {
      subtile: pattern.spacing.medium,
      normale: pattern.spacing.large,
      forte: pattern.spacing.xlarge
    };
    block.data.padding = spacingMap[intensity];
    block.data.margin = spacingMap[intensity];
    
    // Typographie épurée
    block.data.fontWeight = '300';
    block.data.fontSize = pattern.typography.sizes.lg;
    
    // Couleurs très limitées
    if (intensity === 'forte') {
      block.data.colorScheme = 'monochrome';
    }
  }

  private applyPremiumStyle(block: GeneratedBlock, pattern: VisualPattern, intensity: string) {
    // Effets sophistiqués
    const shadowLayers = {
      subtile: '0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06)',
      normale: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
      forte: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)'
    };
    block.data.boxShadow = shadowLayers[intensity];
    
    // Gradients sophistiqués
    if (block.data.primaryColor) {
      block.data.backgroundGradient = `linear-gradient(135deg, ${block.data.primaryColor}, ${this.adjustColor(block.data.primaryColor, -20)})`;
    }
    
    // Bordures avec gradient
    block.data.borderImage = `linear-gradient(135deg, ${block.data.primaryColor}, ${block.data.accentColor || block.data.primaryColor}) 1`;
    
    // Animations élégantes
    block.data.animation = 'fadeInUp 0.6s ease-out';
    block.data.hoverEffect = 'transform: scale(1.02)';
    
    // Typographie premium
    block.data.fontFamily = 'Playfair Display, serif';
    block.data.letterSpacing = '0.05em';
  }

  private applyDynamicStyle(block: GeneratedBlock, pattern: VisualPattern, intensity: string) {
    // Animations énergiques
    const animationMap = {
      subtile: 'pulse 2s ease-in-out infinite',
      normale: 'bounce 1s ease-in-out',
      forte: 'shake 0.5s ease-in-out'
    };
    
    // Transformations au scroll
    block.data.scrollAnimation = true;
    block.data.scrollEffect = intensity === 'forte' ? 'parallax' : 'fadeIn';
    
    // Couleurs vives
    if (block.data.primaryColor) {
      block.data.primaryColor = this.adjustColor(block.data.primaryColor, 20, 20);
    }
    
    // Formes dynamiques
    if (intensity === 'forte') {
      block.data.clipPath = 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)';
    }
    
    // Interactions riches
    block.data.hoverEffect = 'transform: rotate(2deg) scale(1.05)';
    block.data.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  }

  private applyColorScheme(block: GeneratedBlock, scheme: string) {
    const primary = block.data.primaryColor || '#ff6900';
    
    switch (scheme) {
      case 'inverse':
        // Inverser les couleurs
        [block.data.primaryColor, block.data.backgroundColor] = [block.data.backgroundColor || '#ffffff', primary];
        block.data.textColor = this.getContrastColor(block.data.backgroundColor);
        break;
        
      case 'monochrome':
        // Tout en nuances de gris
        const gray = this.toGrayscale(primary);
        block.data.primaryColor = gray;
        block.data.secondaryColor = this.adjustColor(gray, -20);
        block.data.accentColor = this.adjustColor(gray, -40);
        break;
        
      case 'vibrant':
        // Couleurs plus saturées
        block.data.primaryColor = this.adjustColor(primary, 20, 30);
        block.data.accentColor = this.getComplementaryColor(primary);
        break;
    }
  }

  // Utilitaires de couleur
  private adjustColor(color: string, brightness: number = 0, saturation: number = 0): string {
    // Convertir hex en HSL, ajuster, et reconvertir
    // Simplifié pour l'exemple
    return color;
  }

  private toGrayscale(color: string): string {
    // Convertir en niveau de gris
    return '#808080';
  }

  private getContrastColor(bg: string): string {
    // Retourner noir ou blanc selon le contraste
    return '#000000';
  }

  private getComplementaryColor(color: string): string {
    // Retourner la couleur complémentaire
    return '#00ff00';
  }
}
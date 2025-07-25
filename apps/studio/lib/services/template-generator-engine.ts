import { TemplateRulesEngine, FormData, TemplateAction } from './template-rules-engine';
import { blockRegistry } from '@/lib/blocks/block-registry';
import { v4 as uuidv4 } from 'uuid';

export interface GeneratedTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  score: number;
  blocks: TemplateBlock[];
  theme: TemplateTheme;
  metadata: TemplateMetadata;
}

export interface TemplateBlock {
  id: string;
  type: string;
  variant?: string;
  props: Record<string, any>;
  position: number;
}

export interface TemplateTheme {
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background?: string;
    text?: string;
  };
  fonts?: {
    heading: string;
    body: string;
  };
  spacing?: 'compact' | 'normal' | 'relaxed';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}

export interface TemplateMetadata {
  performance: 'high' | 'medium' | 'low';
  accessibility: number; // 0-100
  seoScore: number; // 0-100
  conversionFocus: 'high' | 'medium' | 'low';
  animations: boolean;
  responsive: boolean;
}

// Patterns de templates prédéfinis
export const TEMPLATE_PATTERNS = {
  // Pattern Urgence
  'urgency-master': {
    name: 'Urgence Master',
    description: 'Optimisé pour les services d\'urgence 24/7',
    blocks: [
      { type: 'header-v3-perfect', variant: 'modern', props: { sticky: 'always', ctaText: 'Urgence' } },
      { type: 'hero-v3-perfect', variant: 'bold', props: { countdown: true, urgencyBadge: true } },
      { type: 'services-v3-perfect', variant: 'cards-hover', props: { highlight: 'urgency' } },
      { type: 'cta-v3-perfect', variant: 'urgent', props: { countdown: true, pulseAnimation: true } },
      { type: 'contact-v3-perfect', variant: 'floating-cards', props: { showPhone: true, size: 'large' } },
      { type: 'footer-v3-perfect', variant: 'dark', props: { showEmergencyContact: true } }
    ],
    theme: {
      colors: { primary: '#DC2626', secondary: '#059669', accent: '#F59E0B' },
      spacing: 'compact'
    }
  },

  // Pattern Confiance
  'trust-builder': {
    name: 'Trust Builder',
    description: 'Met en avant l\'expérience et la confiance',
    blocks: [
      { type: 'header-v3-perfect', variant: 'corporate', props: { showBadges: true } },
      { type: 'hero-v3-perfect', variant: 'elegant', props: { showTrustBadges: true } },
      { type: 'content-v3-perfect', variant: 'stats', props: { showYearsExperience: true } },
      { type: 'features-v3-perfect', variant: 'timeline', props: { showProcess: true } },
      { type: 'testimonials-v3-perfect', variant: 'video-cards', props: { showRatings: true } },
      { type: 'faq-v3-perfect', variant: 'chatbot', props: { showExpertBadge: true } },
      { type: 'footer-v3-perfect', variant: 'gradient', props: { showCertifications: true } }
    ],
    theme: {
      colors: { primary: '#1E40AF', secondary: '#10B981', accent: '#6366F1' },
      spacing: 'relaxed'
    }
  },

  // Pattern Visuel
  'visual-showcase': {
    name: 'Visual Showcase',
    description: 'Portfolio visuel pour métiers créatifs',
    blocks: [
      { type: 'header-v3-perfect', variant: 'minimal', props: { transparent: true } },
      { type: 'hero-v3-perfect', variant: 'split', props: { imageGallery: true } },
      { type: 'gallery-v3-perfect', variant: 'masonry-flow', props: { showFilters: true, lightbox: true } },
      { type: 'services-v3-perfect', variant: 'image-cards', props: { showPortfolio: true } },
      { type: 'content-v3-perfect', variant: 'before-after', props: { interactive: true } },
      { type: 'cta-v3-perfect', variant: 'elegant', props: { backgroundImage: true } },
      { type: 'footer-v3-perfect', variant: 'waves', props: { showInstagram: true } }
    ],
    theme: {
      colors: { primary: '#7C3AED', secondary: '#EC4899', accent: '#F59E0B' },
      borderRadius: 'large'
    }
  },

  // Pattern Premium
  'premium-elite': {
    name: 'Premium Elite',
    description: 'Design luxueux pour services haut de gamme',
    blocks: [
      { type: 'header-v3-perfect', variant: 'elegant', props: { glassmorphism: true } },
      { type: 'hero-v3-perfect', variant: 'video-bg', props: { parallax: true } },
      { type: 'services-v3-perfect', variant: 'luxury-cards', props: { goldAccents: true } },
      { type: 'features-v3-perfect', variant: 'bento-grid', props: { animations: 'premium' } },
      { type: 'pricing-v3-perfect', variant: 'elegant', props: { showValue: true } },
      { type: 'testimonials-v3-perfect', variant: 'luxury', props: { showClientLogos: true } },
      { type: 'contact-v3-perfect', variant: 'glassmorphism', props: { showAppointment: true } },
      { type: 'footer-v3-perfect', variant: 'organic', props: { minimal: true } }
    ],
    theme: {
      colors: { primary: '#991B1B', secondary: '#B91C1C', accent: '#FCD34D', background: '#1F2937' },
      fonts: { heading: 'Playfair Display', body: 'Inter' }
    }
  },

  // Pattern Local SEO
  'local-hero': {
    name: 'Local Hero',
    description: 'Optimisé pour le référencement local',
    blocks: [
      { type: 'header-v3-perfect', variant: 'modern', props: { showLocation: true } },
      { type: 'hero-v3-perfect', variant: 'local-focused', props: { showServiceArea: true } },
      { type: 'services-v3-perfect', variant: 'location-based', props: { showCities: true } },
      { type: 'content-v3-perfect', variant: 'local-expertise', props: { showMap: true } },
      { type: 'testimonials-v3-perfect', variant: 'local-reviews', props: { showLocation: true } },
      { type: 'contact-v3-perfect', variant: 'split-map', props: { mapProminent: true } },
      { type: 'footer-v3-perfect', variant: 'centered', props: { showServiceAreas: true } }
    ],
    theme: {
      colors: { primary: '#059669', secondary: '#3B82F6', accent: '#F59E0B' }
    }
  }
};

export class TemplateGeneratorEngine {
  private rulesEngine: TemplateRulesEngine;
  
  constructor() {
    this.rulesEngine = new TemplateRulesEngine();
  }

  // Générer des templates basés sur les données du formulaire
  async generateTemplates(formData: FormData, count: number = 3): Promise<GeneratedTemplate[]> {
    const templates: GeneratedTemplate[] = [];
    
    // 1. Évaluer les règles pour obtenir les actions
    const actions = this.rulesEngine.evaluateRules(formData);
    
    // 2. Créer le template principal basé sur les règles
    const primaryTemplate = this.createTemplateFromActions(actions, formData);
    templates.push(primaryTemplate);
    
    // 3. Générer des variantes basées sur différents patterns
    const variants = this.generateVariants(formData, primaryTemplate, count - 1);
    templates.push(...variants);
    
    // 4. Scorer et trier les templates
    return this.scoreAndSortTemplates(templates, formData);
  }

  // Créer un template à partir des actions
  private createTemplateFromActions(actions: TemplateAction[], formData: FormData): GeneratedTemplate {
    const blocks: TemplateBlock[] = [];
    const theme = this.createThemeFromActions(actions, formData);
    
    // Grouper les actions par type
    const blockActions = actions.filter(a => a.type === 'addBlock');
    const variantActions = actions.filter(a => a.type === 'setVariant');
    
    // Créer les blocs de base
    const baseBlocks = this.getBaseBlocks(formData);
    
    // Ajouter les blocs des actions
    blockActions.forEach(action => {
      if (action.blockId) {
        const existingBlock = blocks.find(b => b.type === action.blockId);
        if (existingBlock) {
          // Mettre à jour le bloc existant
          Object.assign(existingBlock.props, action.value);
        } else {
          // Ajouter un nouveau bloc
          blocks.push({
            id: uuidv4(),
            type: action.blockId,
            variant: action.value?.variant,
            props: action.value || {},
            position: action.position || blocks.length
          });
        }
      }
    });
    
    // Appliquer les variantes
    variantActions.forEach(action => {
      if (action.blockId === 'all') {
        blocks.forEach(block => {
          block.variant = action.value;
        });
      } else if (action.blockId) {
        const block = blocks.find(b => b.type === action.blockId);
        if (block) {
          block.variant = action.value;
        }
      }
    });
    
    // Fusionner avec les blocs de base
    const finalBlocks = this.mergeBlocks(baseBlocks, blocks);
    
    // Ordonner les blocs
    const orderedBlocks = this.orderBlocks(finalBlocks);
    
    return {
      id: uuidv4(),
      name: this.generateTemplateName(formData, 'primary'),
      description: this.generateTemplateDescription(formData, orderedBlocks),
      category: formData.businessType,
      score: 100, // Template principal a le score max
      blocks: orderedBlocks,
      theme,
      metadata: this.generateMetadata(orderedBlocks, theme)
    };
  }

  // Obtenir les blocs de base pour un type de business
  private getBaseBlocks(formData: FormData): TemplateBlock[] {
    const blocks: TemplateBlock[] = [
      {
        id: uuidv4(),
        type: 'header-v3-perfect',
        variant: 'modern',
        props: {
          businessName: '{{businessName}}',
          tagline: '{{tagline}}',
          phone: '{{phone}}',
          ctaText: 'Devis gratuit'
        },
        position: 0
      },
      {
        id: uuidv4(),
        type: 'hero-v3-perfect',
        variant: 'split',
        props: {
          title: '{{heroTitle}}',
          subtitle: '{{heroSubtitle}}',
          primaryButtonText: 'Contactez-nous',
          secondaryButtonText: 'Nos services'
        },
        position: 1
      },
      {
        id: uuidv4(),
        type: 'footer-v3-perfect',
        variant: 'gradient',
        props: {
          businessName: '{{businessName}}',
          address: '{{address}}',
          phone: '{{phone}}',
          email: '{{email}}'
        },
        position: 999
      }
    ];
    
    // Ajouter des blocs spécifiques selon le business
    if (formData.services.length > 0) {
      blocks.push({
        id: uuidv4(),
        type: 'services-v3-perfect',
        variant: 'cards-hover',
        props: {
          title: 'Nos Services',
          services: '{{services}}'
        },
        position: 2
      });
    }
    
    if (formData.hasTestimonials) {
      blocks.push({
        id: uuidv4(),
        type: 'testimonials-v3-perfect',
        variant: 'modern',
        props: {
          title: 'Ce que disent nos clients'
        },
        position: 5
      });
    }
    
    blocks.push({
      id: uuidv4(),
      type: 'contact-v3-perfect',
      variant: 'split-map',
      props: {
        title: 'Contactez-nous',
        showMap: true
      },
      position: 8
    });
    
    return blocks;
  }

  // Créer un thème à partir des actions et des préférences
  private createThemeFromActions(actions: TemplateAction[], formData: FormData): TemplateTheme {
    const baseTheme = this.getBaseTheme(formData.businessType, formData.stylePreference);
    
    // Appliquer les modifications de couleur des actions
    const colorActions = actions.filter(a => a.type === 'setColor');
    colorActions.forEach(action => {
      Object.assign(baseTheme.colors, action.value);
    });
    
    return baseTheme;
  }

  // Obtenir le thème de base pour un type de business
  private getBaseTheme(businessType: string, stylePreference?: string): TemplateTheme {
    const themes: Record<string, TemplateTheme> = {
      plombier: {
        colors: { primary: '#0066CC', secondary: '#10B981', accent: '#F59E0B' },
        fonts: { heading: 'Inter', body: 'Inter' },
        spacing: 'normal',
        borderRadius: 'medium'
      },
      electricien: {
        colors: { primary: '#FCD34D', secondary: '#1F2937', accent: '#EF4444' },
        fonts: { heading: 'Inter', body: 'Inter' },
        spacing: 'normal',
        borderRadius: 'small'
      },
      menuisier: {
        colors: { primary: '#92400E', secondary: '#059669', accent: '#F59E0B' },
        fonts: { heading: 'Playfair Display', body: 'Inter' },
        spacing: 'relaxed',
        borderRadius: 'large'
      },
      peintre: {
        colors: { primary: '#7C3AED', secondary: '#EC4899', accent: '#06B6D4' },
        fonts: { heading: 'Inter', body: 'Inter' },
        spacing: 'normal',
        borderRadius: 'large'
      }
    };
    
    return themes[businessType] || themes.plombier;
  }

  // Générer des variantes de templates
  private generateVariants(formData: FormData, primaryTemplate: GeneratedTemplate, count: number): GeneratedTemplate[] {
    const variants: GeneratedTemplate[] = [];
    const patterns = Object.entries(TEMPLATE_PATTERNS);
    
    // Sélectionner les patterns les plus pertinents
    const relevantPatterns = patterns.filter(([key, pattern]) => {
      if (formData.is24x7Available && key === 'urgency-master') return true;
      if (formData.yearEstablished && formData.yearEstablished < 2010 && key === 'trust-builder') return true;
      if (formData.hasGallery && key === 'visual-showcase') return true;
      if (formData.stylePreference === 'elegant' && key === 'premium-elite') return true;
      if (formData.serviceAreas.length > 5 && key === 'local-hero') return true;
      return false;
    });
    
    // Créer des variantes basées sur les patterns
    relevantPatterns.slice(0, count).forEach(([key, pattern]) => {
      const variant = this.createTemplateFromPattern(pattern, formData);
      variant.id = uuidv4();
      variant.name = this.generateTemplateName(formData, key);
      variant.score = this.calculateTemplateScore(variant, formData);
      variants.push(variant);
    });
    
    // Si pas assez de patterns pertinents, créer des variantes aléatoires
    while (variants.length < count) {
      const randomPattern = patterns[Math.floor(Math.random() * patterns.length)][1];
      const variant = this.createTemplateFromPattern(randomPattern, formData);
      variant.id = uuidv4();
      variant.name = this.generateTemplateName(formData, 'variant-' + variants.length);
      variant.score = this.calculateTemplateScore(variant, formData);
      variants.push(variant);
    }
    
    return variants;
  }

  // Créer un template à partir d'un pattern
  private createTemplateFromPattern(pattern: any, formData: FormData): GeneratedTemplate {
    const blocks: TemplateBlock[] = pattern.blocks.map((block: any, index: number) => ({
      id: uuidv4(),
      type: block.type,
      variant: block.variant,
      props: this.personalizeProps(block.props, formData),
      position: index
    }));
    
    const theme = { ...pattern.theme };
    
    // Personnaliser selon les préférences de couleur
    if (formData.colorPreference === 'vibrant') {
      theme.colors = this.makeColorsVibrant(theme.colors);
    } else if (formData.colorPreference === 'muted') {
      theme.colors = this.makeColorsMuted(theme.colors);
    }
    
    return {
      id: '',
      name: pattern.name,
      description: pattern.description,
      category: formData.businessType,
      score: 0,
      blocks,
      theme,
      metadata: this.generateMetadata(blocks, theme)
    };
  }

  // Personnaliser les props avec les données du formulaire
  private personalizeProps(props: Record<string, any>, formData: FormData): Record<string, any> {
    const personalized = { ...props };
    
    // Remplacer les placeholders
    Object.keys(personalized).forEach(key => {
      if (typeof personalized[key] === 'string' && personalized[key].includes('{{')) {
        personalized[key] = personalized[key]
          .replace('{{businessName}}', formData.businessName)
          .replace('{{businessType}}', formData.businessType)
          .replace('{{tagline}}', `${formData.businessType} professionnel`)
          .replace('{{heroTitle}}', `Votre ${formData.businessType} de confiance`)
          .replace('{{heroSubtitle}}', `Services professionnels de ${formData.businessType}`);
      }
    });
    
    return personalized;
  }

  // Fusionner les blocs
  private mergeBlocks(baseBlocks: TemplateBlock[], additionalBlocks: TemplateBlock[]): TemplateBlock[] {
    const merged = [...baseBlocks];
    
    additionalBlocks.forEach(newBlock => {
      const existingIndex = merged.findIndex(b => b.type === newBlock.type);
      if (existingIndex >= 0) {
        // Remplacer le bloc existant
        merged[existingIndex] = newBlock;
      } else {
        // Ajouter le nouveau bloc
        merged.push(newBlock);
      }
    });
    
    return merged;
  }

  // Ordonner les blocs selon leur position et compatibilité
  private orderBlocks(blocks: TemplateBlock[]): TemplateBlock[] {
    // Trier par position
    const sorted = blocks.sort((a, b) => a.position - b.position);
    
    // Obtenir l'ordre optimal via le moteur de règles
    const blockTypes = sorted.map(b => b.type);
    const optimalOrder = this.rulesEngine.getOptimalBlockOrder(blockTypes);
    
    // Réorganiser selon l'ordre optimal
    const ordered: TemplateBlock[] = [];
    optimalOrder.forEach((type, index) => {
      const block = sorted.find(b => b.type === type);
      if (block) {
        block.position = index;
        ordered.push(block);
      }
    });
    
    return ordered;
  }

  // Générer les métadonnées du template
  private generateMetadata(blocks: TemplateBlock[], theme: TemplateTheme): TemplateMetadata {
    // Calculer la performance basée sur le nombre de blocs et animations
    const blockCount = blocks.length;
    const hasHeavyBlocks = blocks.some(b => 
      b.type.includes('gallery') || b.type.includes('video') || b.variant?.includes('3d')
    );
    
    let performance: 'high' | 'medium' | 'low' = 'high';
    if (blockCount > 10 || hasHeavyBlocks) performance = 'medium';
    if (blockCount > 15 && hasHeavyBlocks) performance = 'low';
    
    // Calculer l'accessibilité
    const hasProperHeadings = blocks.some(b => b.type.includes('hero'));
    const hasAltTexts = true; // Assumé car nos blocs V3 le supportent
    const hasAriaLabels = true; // Assumé car nos blocs V3 le supportent
    const accessibilityScore = (hasProperHeadings ? 30 : 0) + (hasAltTexts ? 35 : 0) + (hasAriaLabels ? 35 : 0);
    
    // Calculer le score SEO
    const hasMeta = true; // Toujours vrai avec notre système
    const hasSchema = true; // Toujours vrai avec notre système
    const hasProperStructure = blocks.some(b => b.type === 'header-v3-perfect') && 
                              blocks.some(b => b.type === 'footer-v3-perfect');
    const seoScore = (hasMeta ? 30 : 0) + (hasSchema ? 35 : 0) + (hasProperStructure ? 35 : 0);
    
    // Focus conversion
    const hasCTA = blocks.some(b => b.type === 'cta-v3-perfect');
    const hasContact = blocks.some(b => b.type === 'contact-v3-perfect');
    const hasUrgency = blocks.some(b => b.variant?.includes('urgent'));
    const conversionFocus = (hasCTA && hasContact && hasUrgency) ? 'high' : 
                           (hasCTA || hasContact) ? 'medium' : 'low';
    
    return {
      performance,
      accessibility: accessibilityScore,
      seoScore,
      conversionFocus,
      animations: blocks.some(b => b.props.animations !== false),
      responsive: true // Toujours vrai avec nos blocs V3
    };
  }

  // Générer un nom de template
  private generateTemplateName(formData: FormData, variant: string): string {
    const style = formData.stylePreference || 'modern';
    const focus = formData.is24x7Available ? 'Urgence' : 
                 formData.hasTestimonials ? 'Confiance' :
                 formData.hasGallery ? 'Portfolio' : 'Pro';
    
    return `${formData.businessType} ${focus} ${style.charAt(0).toUpperCase() + style.slice(1)}`;
  }

  // Générer une description de template
  private generateTemplateDescription(formData: FormData, blocks: TemplateBlock[]): string {
    const features = [];
    
    if (blocks.some(b => b.type === 'gallery-v3-perfect')) features.push('galerie photos');
    if (blocks.some(b => b.type === 'testimonials-v3-perfect')) features.push('témoignages clients');
    if (blocks.some(b => b.type === 'pricing-v3-perfect')) features.push('tarifs transparents');
    if (blocks.some(b => b.variant?.includes('urgent'))) features.push('optimisé urgences');
    
    return `Template professionnel pour ${formData.businessType} avec ${features.join(', ')}`;
  }

  // Calculer le score d'un template
  private calculateTemplateScore(template: GeneratedTemplate, formData: FormData): number {
    let score = 50; // Score de base
    
    // Bonus pour correspondance métier
    if (template.category === formData.businessType) score += 10;
    
    // Bonus pour métadonnées
    score += template.metadata.seoScore * 0.2;
    score += template.metadata.accessibility * 0.1;
    if (template.metadata.conversionFocus === 'high') score += 15;
    if (template.metadata.performance === 'high') score += 10;
    
    // Bonus pour features demandées
    const blocks = template.blocks;
    if (formData.hasGallery && blocks.some(b => b.type === 'gallery-v3-perfect')) score += 10;
    if (formData.hasTestimonials && blocks.some(b => b.type === 'testimonials-v3-perfect')) score += 10;
    if (formData.hasPricing && blocks.some(b => b.type === 'pricing-v3-perfect')) score += 10;
    
    return Math.min(100, score);
  }

  // Scorer et trier les templates
  private scoreAndSortTemplates(templates: GeneratedTemplate[], formData: FormData): GeneratedTemplate[] {
    // Recalculer les scores si nécessaire
    templates.forEach(template => {
      if (template.score === 0) {
        template.score = this.calculateTemplateScore(template, formData);
      }
    });
    
    // Trier par score décroissant
    return templates.sort((a, b) => b.score - a.score);
  }

  // Rendre les couleurs plus vibrantes
  private makeColorsVibrant(colors: any): any {
    // Implémenter la logique pour rendre les couleurs plus vibrantes
    // Pour l'instant, retourner les couleurs telles quelles
    return colors;
  }

  // Rendre les couleurs plus douces
  private makeColorsMuted(colors: any): any {
    // Implémenter la logique pour rendre les couleurs plus douces
    // Pour l'instant, retourner les couleurs telles quelles
    return colors;
  }
}
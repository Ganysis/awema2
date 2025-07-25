import { PrismaClient } from '@prisma/client';
import { TemplateRulesEngine } from './template-rules-engine';
// import { AIContentGeneratorService } from './ai-content-generator.service';
import { ColorPaletteEngine } from './color-palette-engine';

interface TemplateSelectionCriteria {
  businessType: string;
  services: string[];
  targetAudience: string[];
  stylePreference: string;
  urgencyLevel: 'high' | 'medium' | 'low';
  hasGallery: boolean;
  hasTestimonials: boolean;
  hasPricing: boolean;
  is24x7Available: boolean;
  yearEstablished?: number;
  serviceAreas: string[];
  specializations: string[];
  goals: string[];
}

interface SelectedTemplate {
  id: string;
  name: string;
  description: string;
  score: number;
  blocks: any[];
  theme: any;
  tags: string[];
  reasoning: string;
  personalizationSuggestions: string[];
}

export class TemplateSelectionService {
  private prisma: PrismaClient;
  private rulesEngine: TemplateRulesEngine;
  // private aiService: AIContentGeneratorService;
  private colorEngine: ColorPaletteEngine;

  constructor() {
    this.prisma = new PrismaClient();
    this.rulesEngine = new TemplateRulesEngine();
    // this.aiService = new AIContentGeneratorService();
    this.colorEngine = new ColorPaletteEngine();
  }

  /**
   * Sélectionne les 3 meilleurs templates pour un client
   */
  async selectBestTemplates(
    criteria: TemplateSelectionCriteria,
    count: number = 3
  ): Promise<SelectedTemplate[]> {
    // 1. Récupérer tous les templates de la catégorie
    const categoryTemplates = await this.getTemplatesByCategory(criteria.businessType);
    
    // 2. Scorer chaque template selon les critères
    const scoredTemplates = await this.scoreTemplates(categoryTemplates, criteria);
    
    // 3. Trier par score et prendre les N meilleurs
    const topTemplates = scoredTemplates
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
    
    // 4. Personnaliser chaque template sélectionné
    const personalizedTemplates = await Promise.all(
      topTemplates.map(template => this.personalizeTemplate(template, criteria))
    );
    
    return personalizedTemplates;
  }

  /**
   * Récupère les templates d'une catégorie
   */
  private async getTemplatesByCategory(category: string) {
    const templates = await this.prisma.template.findMany({
      where: {
        category,
        isActive: true
      }
    });

    return templates.map(t => ({
      ...t,
      blocks: JSON.parse(t.blocks),
      theme: JSON.parse(t.theme),
      tags: t.tags ? JSON.parse(t.tags) : [],
      metadata: t.metadata ? JSON.parse(t.metadata) : {}
    }));
  }

  /**
   * Score les templates selon les critères
   */
  private async scoreTemplates(templates: any[], criteria: TemplateSelectionCriteria) {
    return templates.map(template => {
      let score = template.score || 50; // Score de base
      
      // Bonus pour correspondance de style
      if (template.tags.includes(criteria.stylePreference)) {
        score += 20;
      }
      
      // Bonus pour urgence
      if (criteria.is24x7Available && template.tags.includes('urgency')) {
        score += 25;
      }
      
      // Bonus pour ancienneté
      if (criteria.yearEstablished && criteria.yearEstablished < 2010 && template.tags.includes('trust')) {
        score += 15;
      }
      
      // Bonus pour portfolio visuel
      if (criteria.hasGallery && this.hasGalleryBlock(template.blocks)) {
        score += 15;
      }
      
      // Bonus pour témoignages
      if (criteria.hasTestimonials && this.hasTestimonialsBlock(template.blocks)) {
        score += 10;
      }
      
      // Bonus pour tarifs
      if (criteria.hasPricing && this.hasPricingBlock(template.blocks)) {
        score += 10;
      }
      
      // Bonus pour SEO local
      if (criteria.serviceAreas.length > 5 && template.tags.includes('local')) {
        score += 20;
      }
      
      // Bonus pour métadonnées
      const metadata = template.metadata;
      if (metadata) {
        score += (metadata.accessibility || 0) * 0.1;
        score += (metadata.seoScore || 0) * 0.1;
        if (metadata.conversionFocus === 'high' && criteria.urgencyLevel === 'high') {
          score += 15;
        }
      }
      
      return { ...template, score: Math.min(100, score) };
    });
  }

  /**
   * Personnalise un template selon les critères
   */
  private async personalizeTemplate(
    template: any,
    criteria: TemplateSelectionCriteria
  ): Promise<SelectedTemplate> {
    // Adapter la palette de couleurs
    const adaptedTheme = await this.adaptTheme(template.theme, criteria);
    
    // Adapter les blocs selon les besoins
    const adaptedBlocks = await this.adaptBlocks(template.blocks, criteria);
    
    // Générer le raisonnement de sélection
    const reasoning = this.generateReasoning(template, criteria);
    
    // Générer des suggestions de personnalisation
    const suggestions = await this.generatePersonalizationSuggestions(template, criteria);
    
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      score: template.score,
      blocks: adaptedBlocks,
      theme: adaptedTheme,
      tags: template.tags,
      reasoning,
      personalizationSuggestions: suggestions
    };
  }

  /**
   * Adapte le thème selon les préférences
   */
  private async adaptTheme(theme: any, criteria: TemplateSelectionCriteria) {
    const adaptedTheme = { ...theme };
    
    // Obtenir la meilleure palette pour le formulaire
    const palette = this.colorEngine.getBestPaletteForForm({
      businessType: criteria.businessType,
      stylePreference: criteria.stylePreference,
      is24x7Available: criteria.is24x7Available,
      targetAudience: criteria.targetAudience
    });
    
    // Appliquer la palette
    adaptedTheme.colors = {
      ...adaptedTheme.colors,
      ...palette.colors
    };
    
    // Ajuster selon le style
    if (criteria.stylePreference === 'minimal') {
      adaptedTheme.spacing = 'relaxed';
      adaptedTheme.borderRadius = 'small';
    } else if (criteria.stylePreference === 'bold') {
      adaptedTheme.spacing = 'compact';
      adaptedTheme.borderRadius = 'none';
    }
    
    return adaptedTheme;
  }

  /**
   * Adapte les blocs selon les besoins
   */
  private async adaptBlocks(blocks: any[], criteria: TemplateSelectionCriteria) {
    const adaptedBlocks = [...blocks];
    
    // Ajouter un bloc urgence si nécessaire
    if (criteria.is24x7Available && !this.hasUrgencyBlock(blocks)) {
      const urgencyBlock = {
        id: this.generateId(),
        type: 'cta-v3-perfect',
        variant: 'urgent',
        props: {
          title: 'Service d\'urgence 24/7',
          subtitle: 'Nous intervenons rapidement',
          primaryButtonText: 'Appel d\'urgence',
          countdown: true,
          pulseAnimation: true
        },
        position: 2
      };
      adaptedBlocks.splice(2, 0, urgencyBlock);
    }
    
    // Ajouter un bloc galerie si demandé
    if (criteria.hasGallery && !this.hasGalleryBlock(blocks)) {
      const galleryBlock = {
        id: this.generateId(),
        type: 'gallery-v3-perfect',
        variant: 'masonry-flow',
        props: {
          title: 'Nos réalisations',
          showFilters: true,
          lightbox: true
        },
        position: 4
      };
      adaptedBlocks.splice(4, 0, galleryBlock);
    }
    
    // Réorganiser les positions
    adaptedBlocks.forEach((block, index) => {
      block.position = index;
    });
    
    return adaptedBlocks;
  }

  /**
   * Génère le raisonnement de sélection
   */
  private generateReasoning(template: any, criteria: TemplateSelectionCriteria): string {
    const reasons = [];
    
    if (template.tags.includes(criteria.stylePreference)) {
      reasons.push(`Style ${criteria.stylePreference} correspondant à vos préférences`);
    }
    
    if (criteria.is24x7Available && template.tags.includes('urgency')) {
      reasons.push('Optimisé pour les services d\'urgence 24/7');
    }
    
    if (criteria.hasGallery && this.hasGalleryBlock(template.blocks)) {
      reasons.push('Inclut une galerie pour présenter vos réalisations');
    }
    
    if (template.metadata?.seoScore > 90) {
      reasons.push('Excellent score SEO pour améliorer votre visibilité');
    }
    
    if (template.metadata?.conversionFocus === 'high') {
      reasons.push('Focus sur la conversion pour maximiser les contacts');
    }
    
    return reasons.join('. ');
  }

  /**
   * Génère des suggestions de personnalisation
   */
  private async generatePersonalizationSuggestions(
    template: any,
    criteria: TemplateSelectionCriteria
  ): Promise<string[]> {
    const suggestions = [];
    
    // Suggestions basées sur le type de business
    if (criteria.businessType === 'plombier' && criteria.specializations.includes('chauffage')) {
      suggestions.push('Ajouter une section dédiée aux services de chauffage');
    }
    
    // Suggestions basées sur la zone de service
    if (criteria.serviceAreas.length > 10) {
      suggestions.push('Créer des pages locales pour chaque ville desservie');
    }
    
    // Suggestions basées sur l'audience
    if (criteria.targetAudience.includes('entreprises')) {
      suggestions.push('Ajouter une section B2B avec des études de cas');
    }
    
    // Suggestions basées sur les objectifs
    if (criteria.goals.includes('leads')) {
      suggestions.push('Intégrer des formulaires de capture à plusieurs endroits stratégiques');
    }
    
    // Suggestions générales
    suggestions.push('Personnaliser les images avec des photos de vos réalisations');
    suggestions.push('Adapter les textes pour refléter votre ton de marque');
    
    return suggestions;
  }

  // Méthodes utilitaires
  private hasGalleryBlock(blocks: any[]): boolean {
    return blocks.some(b => b.type === 'gallery-v3-perfect');
  }

  private hasTestimonialsBlock(blocks: any[]): boolean {
    return blocks.some(b => b.type === 'testimonials-v3-perfect');
  }

  private hasPricingBlock(blocks: any[]): boolean {
    return blocks.some(b => b.type === 'pricing-v3-perfect');
  }

  private hasUrgencyBlock(blocks: any[]): boolean {
    return blocks.some(b => b.variant === 'urgent' || b.props?.urgencyCTA);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Génère des variantes personnalisées avec l'IA
   */
  async generateAIPersonalizedVariants(
    baseTemplate: any,
    criteria: TemplateSelectionCriteria,
    count: number = 3
  ): Promise<SelectedTemplate[]> {
    const variants: SelectedTemplate[] = [];
    
    // Générer différentes variantes avec des focus différents
    const focuses = ['conversion', 'trust', 'visual'];
    
    for (let i = 0; i < Math.min(count, focuses.length); i++) {
      const focus = focuses[i];
      const variant = await this.generateVariantWithFocus(baseTemplate, criteria, focus);
      variants.push(variant);
    }
    
    return variants;
  }

  /**
   * Génère une variante avec un focus spécifique
   */
  private async generateVariantWithFocus(
    baseTemplate: any,
    criteria: TemplateSelectionCriteria,
    focus: string
  ): Promise<SelectedTemplate> {
    const variant = JSON.parse(JSON.stringify(baseTemplate)); // Deep clone
    
    switch (focus) {
      case 'conversion':
        variant.name += ' - Conversion Max';
        variant.description = 'Variante optimisée pour maximiser les conversions';
        // Ajouter plus de CTAs et d'éléments d'urgence
        break;
        
      case 'trust':
        variant.name += ' - Confiance Pro';
        variant.description = 'Variante axée sur la crédibilité et la confiance';
        // Ajouter plus de témoignages et badges
        break;
        
      case 'visual':
        variant.name += ' - Portfolio Plus';
        variant.description = 'Variante mettant en avant le visuel et les réalisations';
        // Ajouter plus d'éléments visuels
        break;
    }
    
    return variant;
  }

  /**
   * Nettoie les ressources
   */
  async cleanup() {
    await this.prisma.$disconnect();
  }
}
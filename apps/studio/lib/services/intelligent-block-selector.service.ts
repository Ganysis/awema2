interface BlockSelectionCriteria {
  availableData: {
    services: boolean;
    pricing: boolean;
    portfolio: boolean;
    testimonials: boolean;
    team: boolean;
    certifications: boolean;
    process: boolean;
    faq: boolean;
    location: boolean;
    emergency: boolean;
  };
  businessType: string;
  businessCharacteristics: string[];
  aiPriorities: string[];
}

interface BlockRecommendation {
  type: string;
  variant: string;
  reason: string;
  priority: number;
  alternativeIf?: {
    condition: string;
    alternative: BlockRecommendation;
  };
}

export class IntelligentBlockSelectorService {
  // Règles de sélection par type de business
  private businessRules: Record<string, BlockRecommendation[]> = {
    plombier: [
      {
        type: 'hero-v3-perfect',
        variant: 'split-content',
        reason: 'Mise en avant du numéro d\'urgence',
        priority: 100
      },
      {
        type: 'cta-v3-perfect',
        variant: 'urgency-banner',
        reason: 'Urgences plomberie fréquentes',
        priority: 95
      },
      {
        type: 'services-v3-perfect',
        variant: 'cards-hover',
        reason: 'Services variés à présenter',
        priority: 90
      },
      {
        type: 'gallery-v3-perfect',
        variant: 'before-after',
        reason: 'Montrer les transformations',
        priority: 80,
        alternativeIf: {
          condition: 'no-portfolio',
          alternative: {
            type: 'content-v3-perfect',
            variant: 'process',
            reason: 'Expliquer le processus d\'intervention',
            priority: 80
          }
        }
      }
    ],
    electricien: [
      {
        type: 'hero-v3-perfect',
        variant: 'gradient-modern',
        reason: 'Image moderne et technologique',
        priority: 100
      },
      {
        type: 'features-v3-perfect',
        variant: 'security-badges',
        reason: 'Sécurité électrique primordiale',
        priority: 95
      },
      {
        type: 'content-v3-perfect',
        variant: 'certifications',
        reason: 'Normes et certifications importantes',
        priority: 90
      },
      {
        type: 'pricing-v3-perfect',
        variant: 'transparent-pricing',
        reason: 'Transparence sur les tarifs électriques',
        priority: 85,
        alternativeIf: {
          condition: 'no-pricing',
          alternative: {
            type: 'faq-v3-perfect',
            variant: 'technical-faq',
            reason: 'Questions techniques fréquentes',
            priority: 85
          }
        }
      }
    ],
    menuisier: [
      {
        type: 'hero-v3-perfect',
        variant: 'fullscreen-video',
        reason: 'Montrer le savoir-faire en vidéo',
        priority: 100
      },
      {
        type: 'gallery-v3-perfect',
        variant: 'masonry-flow',
        reason: 'Portfolio visuel essentiel',
        priority: 95
      },
      {
        type: 'content-v3-perfect',
        variant: 'craftsmanship',
        reason: 'Histoire et savoir-faire artisanal',
        priority: 90
      },
      {
        type: 'services-v3-perfect',
        variant: 'detailed-cards',
        reason: 'Services sur-mesure détaillés',
        priority: 85
      }
    ],
    jardinier: [
      {
        type: 'hero-v3-perfect',
        variant: 'nature-parallax',
        reason: 'Immersion nature',
        priority: 100
      },
      {
        type: 'gallery-v3-perfect',
        variant: 'seasons-gallery',
        reason: 'Transformations au fil des saisons',
        priority: 95
      },
      {
        type: 'services-v3-perfect',
        variant: 'seasonal-services',
        reason: 'Services par saison',
        priority: 90
      },
      {
        type: 'content-v3-perfect',
        variant: 'eco-approach',
        reason: 'Approche écologique',
        priority: 85
      }
    ]
  };

  // Blocs spécifiques selon les données disponibles
  private dataBasedBlocks: Record<string, BlockRecommendation> = {
    'has-emergency': {
      type: 'cta-v3-perfect',
      variant: 'urgency-banner',
      reason: 'Service d\'urgence disponible',
      priority: 95
    },
    'has-portfolio': {
      type: 'gallery-v3-perfect',
      variant: 'dynamic-gallery',
      reason: 'Portfolio riche à valoriser',
      priority: 90
    },
    'has-testimonials': {
      type: 'testimonials-v3-perfect',
      variant: 'social-proof',
      reason: 'Témoignages clients disponibles',
      priority: 85
    },
    'has-team': {
      type: 'content-v3-perfect',
      variant: 'team-showcase',
      reason: 'Équipe à présenter',
      priority: 80
    },
    'has-certifications': {
      type: 'content-v3-perfect',
      variant: 'trust-indicators',
      reason: 'Certifications à mettre en avant',
      priority: 85
    },
    'has-process': {
      type: 'content-v3-perfect',
      variant: 'step-by-step',
      reason: 'Processus détaillé disponible',
      priority: 75
    },
    'has-pricing': {
      type: 'pricing-v3-perfect',
      variant: 'comparative-table',
      reason: 'Tarifs à afficher',
      priority: 80
    },
    'has-faq': {
      type: 'faq-v3-perfect',
      variant: 'smart-accordion',
      reason: 'Questions fréquentes disponibles',
      priority: 70
    }
  };

  // Sélection intelligente des blocs
  selectOptimalBlocks(criteria: BlockSelectionCriteria): BlockRecommendation[] {
    const selectedBlocks: BlockRecommendation[] = [];
    const usedTypes = new Set<string>();
    
    // 1. Blocs obligatoires pour tous
    selectedBlocks.push({
      type: 'header-v3-perfect',
      variant: this.selectHeaderVariant(criteria),
      reason: 'Navigation essentielle',
      priority: 100
    });
    
    // 2. Blocs spécifiques au métier
    const businessBlocks = this.businessRules[criteria.businessType] || [];
    for (const block of businessBlocks) {
      // Vérifier les conditions alternatives
      if (block.alternativeIf) {
        const conditionMet = this.checkCondition(block.alternativeIf.condition, criteria);
        if (conditionMet) {
          selectedBlocks.push(block.alternativeIf.alternative);
          usedTypes.add(block.alternativeIf.alternative.type);
        } else {
          selectedBlocks.push(block);
          usedTypes.add(block.type);
        }
      } else {
        selectedBlocks.push(block);
        usedTypes.add(block.type);
      }
    }
    
    // 3. Blocs basés sur les données disponibles
    if (criteria.availableData.emergency) {
      const urgencyBlock = this.dataBasedBlocks['has-emergency'];
      if (!usedTypes.has(urgencyBlock.type)) {
        selectedBlocks.push(urgencyBlock);
        usedTypes.add(urgencyBlock.type);
      }
    }
    
    if (criteria.availableData.portfolio) {
      const portfolioBlock = this.dataBasedBlocks['has-portfolio'];
      if (!usedTypes.has(portfolioBlock.type)) {
        selectedBlocks.push(portfolioBlock);
        usedTypes.add(portfolioBlock.type);
      }
    }
    
    if (criteria.availableData.testimonials) {
      const testimonialBlock = this.dataBasedBlocks['has-testimonials'];
      if (!usedTypes.has(testimonialBlock.type)) {
        selectedBlocks.push(testimonialBlock);
        usedTypes.add(testimonialBlock.type);
      }
    }
    
    // 4. Blocs basés sur les priorités IA
    if (criteria.aiPriorities.includes('confiance')) {
      if (criteria.availableData.certifications && !usedTypes.has('content-v3-perfect-certifications')) {
        selectedBlocks.push(this.dataBasedBlocks['has-certifications']);
      }
    }
    
    if (criteria.aiPriorities.includes('transparence')) {
      if (criteria.availableData.pricing && !usedTypes.has('pricing-v3-perfect')) {
        selectedBlocks.push(this.dataBasedBlocks['has-pricing']);
      }
    }
    
    // 5. Blocs de conversion (toujours présents)
    if (!usedTypes.has('contact-v3-perfect')) {
      selectedBlocks.push({
        type: 'contact-v3-perfect',
        variant: this.selectContactVariant(criteria),
        reason: 'Conversion essentielle',
        priority: 90
      });
    }
    
    selectedBlocks.push({
      type: 'footer-v3-perfect',
      variant: this.selectFooterVariant(criteria),
      reason: 'Informations de contact',
      priority: 100
    });
    
    // Trier par priorité
    return selectedBlocks.sort((a, b) => b.priority - a.priority);
  }

  // Vérification des conditions
  private checkCondition(condition: string, criteria: BlockSelectionCriteria): boolean {
    switch (condition) {
      case 'no-portfolio':
        return !criteria.availableData.portfolio;
      case 'no-pricing':
        return !criteria.availableData.pricing;
      case 'no-team':
        return !criteria.availableData.team;
      default:
        return false;
    }
  }

  // Sélection de variante header
  private selectHeaderVariant(criteria: BlockSelectionCriteria): string {
    if (criteria.businessCharacteristics.includes('premium')) {
      return 'elegant-minimal';
    }
    if (criteria.businessCharacteristics.includes('modern')) {
      return 'futuristic';
    }
    if (criteria.businessCharacteristics.includes('urgency')) {
      return 'sticky-transparent';
    }
    return 'classic-professional';
  }

  // Sélection de variante contact
  private selectContactVariant(criteria: BlockSelectionCriteria): string {
    if (criteria.availableData.location) {
      return 'split-map';
    }
    if (criteria.businessCharacteristics.includes('urgency')) {
      return 'emergency-form';
    }
    if (criteria.businessCharacteristics.includes('premium')) {
      return 'elegant-form';
    }
    return 'simple-form';
  }

  // Sélection de variante footer
  private selectFooterVariant(criteria: BlockSelectionCriteria): string {
    if (criteria.availableData.certifications && criteria.availableData.location) {
      return 'mega-footer';
    }
    if (criteria.businessCharacteristics.includes('minimal')) {
      return 'minimal-footer';
    }
    return 'corporate';
  }

  // Génération de structures alternatives
  generateAlternativeStructures(
    baseStructure: BlockRecommendation[],
    count: number = 3
  ): BlockRecommendation[][] {
    const alternatives: BlockRecommendation[][] = [];
    
    for (let i = 0; i < count; i++) {
      const alternative = [...baseStructure];
      
      // Stratégie 1: Réorganiser les blocs
      if (i === 0) {
        // Mettre les témoignages avant les services
        const testimonialIndex = alternative.findIndex(b => b.type.includes('testimonials'));
        const servicesIndex = alternative.findIndex(b => b.type.includes('services'));
        if (testimonialIndex > -1 && servicesIndex > -1 && testimonialIndex > servicesIndex) {
          [alternative[testimonialIndex], alternative[servicesIndex]] = 
          [alternative[servicesIndex], alternative[testimonialIndex]];
        }
      }
      
      // Stratégie 2: Remplacer certains blocs
      if (i === 1) {
        const featuresIndex = alternative.findIndex(b => b.type.includes('features'));
        if (featuresIndex > -1) {
          alternative[featuresIndex] = {
            type: 'content-v3-perfect',
            variant: 'benefits-grid',
            reason: 'Alternative aux features',
            priority: alternative[featuresIndex].priority
          };
        }
      }
      
      // Stratégie 3: Ajouter des blocs supplémentaires
      if (i === 2) {
        const ctaIndex = alternative.findIndex(b => b.type.includes('cta'));
        if (ctaIndex === -1) {
          alternative.splice(alternative.length - 2, 0, {
            type: 'cta-v3-perfect',
            variant: 'conversion-focused',
            reason: 'Augmenter la conversion',
            priority: 85
          });
        }
      }
      
      alternatives.push(alternative);
    }
    
    return alternatives;
  }

  // Optimisation pour mobile
  optimizeForMobile(blocks: BlockRecommendation[]): BlockRecommendation[] {
    return blocks.map(block => {
      // Adapter les variantes pour mobile
      if (block.type === 'hero-v3-perfect' && block.variant === 'fullscreen-video') {
        return {
          ...block,
          variant: 'simple-centered',
          reason: block.reason + ' (optimisé mobile)'
        };
      }
      
      if (block.type === 'gallery-v3-perfect' && block.variant === 'masonry-flow') {
        return {
          ...block,
          variant: 'swiper-mobile',
          reason: block.reason + ' (optimisé mobile)'
        };
      }
      
      return block;
    });
  }
}
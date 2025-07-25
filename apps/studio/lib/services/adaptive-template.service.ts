import { DeepSeekService } from './deepseek.service';
import { ContentPersonalizationService } from './content-personalization.service';

interface TemplateStructure {
  id: string;
  name: string;
  description: string;
  blocks: Array<{
    type: string;
    variant?: string;
    position: number;
    condition?: (data: any) => boolean;
    priority?: 'required' | 'optional' | 'conditional';
  }>;
  tags: string[];
}

interface AdaptiveBlock {
  type: string;
  variant: string;
  position: number;
  props: any;
}

export class AdaptiveTemplateService {
  private deepseek: DeepSeekService;
  private contentService: ContentPersonalizationService;

  constructor() {
    this.deepseek = new DeepSeekService({
      apiKey: process.env.DEEPSEEK_API_KEY || ''
    });
    this.contentService = new ContentPersonalizationService();
  }

  // Définition de structures de templates ultra-variées
  private templateStructures: TemplateStructure[] = [
    // Structure 1: Urgence maximale - Style Neon Tech
    {
      id: 'urgency-first',
      name: 'Urgence Première',
      description: 'Pour les métiers d\'urgence 24/7',
      blocks: [
        { type: 'header-v3-perfect', variant: 'transparent-float', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'split-diagonal', position: 2, priority: 'required' },
        { type: 'cta-v3-perfect', variant: 'floating-emergency', position: 3, priority: 'required' },
        { type: 'services-v3-perfect', variant: 'hexagon-grid', position: 4, priority: 'required' },
        { type: 'features-v3-perfect', variant: '3d-carousel', position: 5, priority: 'optional' },
        { type: 'testimonials-v3-perfect', variant: 'stacked-cards', position: 6, priority: 'conditional' },
        { type: 'contact-v3-perfect', variant: 'glass-morphism', position: 7, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'wave-animated', position: 8, priority: 'required' }
      ],
      tags: ['urgency', '24/7', 'emergency', 'neon']
    },
    // Structure 2: Portfolio visuel - Style Brutalist Moderne
    {
      id: 'visual-showcase',
      name: 'Vitrine Visuelle',
      description: 'Pour les métiers avec réalisations visuelles',
      blocks: [
        { type: 'header-v3-perfect', variant: 'bold-brutalist', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'asymmetric-split', position: 2, priority: 'required' },
        { type: 'gallery-v3-perfect', variant: 'polaroid-stack', position: 3, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'animated-counters', position: 4, priority: 'optional' },
        { type: 'services-v3-perfect', variant: 'flip-cards', position: 5, priority: 'required' },
        { type: 'gallery-v3-perfect', variant: 'infinite-scroll', position: 6, priority: 'conditional' },
        { type: 'testimonials-v3-perfect', variant: 'video-wall', position: 7, priority: 'optional' },
        { type: 'cta-v3-perfect', variant: 'liquid-morph', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'split-creative', position: 9, priority: 'required' }
      ],
      tags: ['portfolio', 'visual', 'showcase', 'gallery', 'brutalist']
    },
    // Structure 3: Confiance et expertise - Style Corporate Premium
    {
      id: 'trust-expertise',
      name: 'Confiance & Expertise',
      description: 'Pour établir la crédibilité',
      blocks: [
        { type: 'header-v3-perfect', variant: 'corporate-mega', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'cinemagraph-bg', position: 2, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'timeline-history', position: 3, priority: 'required' },
        { type: 'features-v3-perfect', variant: 'bento-grid', position: 4, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'trust-badges', position: 5, priority: 'conditional' },
        { type: 'testimonials-v3-perfect', variant: 'linkedin-style', position: 6, priority: 'required' },
        { type: 'faq-v3-perfect', variant: 'chat-bubble', position: 7, priority: 'optional' },
        { type: 'contact-v3-perfect', variant: 'appointment-scheduler', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'corporate-trust', position: 9, priority: 'required' }
      ],
      tags: ['trust', 'expertise', 'professional', 'corporate']
    },
    // Structure 4: Local et proximité - Style Terroir Moderne
    {
      id: 'local-proximity',
      name: 'Proximité Locale',
      description: 'Pour l\'ancrage territorial',
      blocks: [
        { type: 'header-v3-perfect', variant: 'warm-organic', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'map-background', position: 2, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'local-roots', position: 3, priority: 'required' },
        { type: 'services-v3-perfect', variant: 'location-based', position: 4, priority: 'required' },
        { type: 'features-v3-perfect', variant: 'interactive-map', position: 5, priority: 'conditional' },
        { type: 'pricing-v3-perfect', variant: 'zone-pricing', position: 6, priority: 'conditional' },
        { type: 'testimonials-v3-perfect', variant: 'google-reviews', position: 7, priority: 'optional' },
        { type: 'contact-v3-perfect', variant: 'multi-location', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'community-links', position: 9, priority: 'required' }
      ],
      tags: ['local', 'proximity', 'community', 'terroir']
    },
    // Structure 5: Innovation et modernité - Style Cyberpunk 2030
    {
      id: 'modern-innovation',
      name: 'Innovation Moderne',
      description: 'Pour les entreprises innovantes',
      blocks: [
        { type: 'header-v3-perfect', variant: 'holographic', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'particles-3d', position: 2, priority: 'required' },
        { type: 'features-v3-perfect', variant: 'floating-orbs', position: 3, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'tech-metrics', position: 4, priority: 'optional' },
        { type: 'services-v3-perfect', variant: 'neural-network', position: 5, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'innovation-lab', position: 6, priority: 'conditional' },
        { type: 'cta-v3-perfect', variant: 'glitch-effect', position: 7, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'matrix-rain', position: 8, priority: 'required' }
      ],
      tags: ['modern', 'innovation', 'tech', 'cyberpunk']
    },
    // Structure 6: Services détaillés - Style Catalogue Luxe
    {
      id: 'service-focused',
      name: 'Focus Services',
      description: 'Pour présenter les services en détail',
      blocks: [
        { type: 'header-v3-perfect', variant: 'luxury-minimal', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'editorial-split', position: 2, priority: 'required' },
        { type: 'services-v3-perfect', variant: 'magazine-layout', position: 3, priority: 'required' },
        { type: 'pricing-v3-perfect', variant: 'luxury-cards', position: 4, priority: 'conditional' },
        { type: 'content-v3-perfect', variant: 'service-journey', position: 5, priority: 'optional' },
        { type: 'features-v3-perfect', variant: 'diamond-grid', position: 6, priority: 'optional' },
        { type: 'faq-v3-perfect', variant: 'elegant-drops', position: 7, priority: 'conditional' },
        { type: 'contact-v3-perfect', variant: 'concierge-form', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'luxury-brands', position: 9, priority: 'required' }
      ],
      tags: ['services', 'detailed', 'pricing', 'luxury']
    },
    // Structure 7: Storytelling - Style Documentaire Cinéma
    {
      id: 'story-driven',
      name: 'Histoire & Valeurs',
      description: 'Pour raconter une histoire',
      blocks: [
        { type: 'header-v3-perfect', variant: 'documentary-nav', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'cinematic-intro', position: 2, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'chapter-scroll', position: 3, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'mission-manifesto', position: 4, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'team-portraits', position: 5, priority: 'conditional' },
        { type: 'services-v3-perfect', variant: 'narrative-cards', position: 6, priority: 'required' },
        { type: 'testimonials-v3-perfect', variant: 'documentary-style', position: 7, priority: 'optional' },
        { type: 'cta-v3-perfect', variant: 'epilogue-cta', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'credits-roll', position: 9, priority: 'required' }
      ],
      tags: ['story', 'history', 'values', 'cinematic']
    },
    // Structure 8: Conversion optimisée - Style Landing Page Silicon Valley
    {
      id: 'conversion-optimized',
      name: 'Conversion Max',
      description: 'Pour maximiser les conversions',
      blocks: [
        { type: 'header-v3-perfect', variant: 'sticky-cta', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'split-form', position: 2, priority: 'required' },
        { type: 'features-v3-perfect', variant: 'icon-showcase', position: 3, priority: 'required' },
        { type: 'testimonials-v3-perfect', variant: 'trust-logos', position: 4, priority: 'required' },
        { type: 'pricing-v3-perfect', variant: 'slider-compare', position: 5, priority: 'conditional' },
        { type: 'cta-v3-perfect', variant: 'countdown-offer', position: 6, priority: 'required' },
        { type: 'faq-v3-perfect', variant: 'instant-answers', position: 7, priority: 'optional' },
        { type: 'contact-v3-perfect', variant: 'smart-form', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'conversion-focused', position: 9, priority: 'required' }
      ],
      tags: ['conversion', 'leads', 'sales', 'silicon-valley']
    },
    // Structure 9: Portfolio créatif - Style Art Gallery Immersif
    {
      id: 'creative-portfolio',
      name: 'Portfolio Créatif',
      description: 'Pour les métiers créatifs',
      blocks: [
        { type: 'header-v3-perfect', variant: 'invisible-menu', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'fullscreen-gallery', position: 2, priority: 'required' },
        { type: 'gallery-v3-perfect', variant: 'hexagon-hive', position: 3, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'artist-statement', position: 4, priority: 'optional' },
        { type: 'gallery-v3-perfect', variant: '3d-carousel', position: 5, priority: 'required' },
        { type: 'testimonials-v3-perfect', variant: 'art-critics', position: 6, priority: 'optional' },
        { type: 'cta-v3-perfect', variant: 'exhibition-invite', position: 7, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'gallery-minimal', position: 8, priority: 'required' }
      ],
      tags: ['creative', 'portfolio', 'artistic', 'gallery']
    },
    // Structure 10: Minimaliste élégant - Style Zen Japonais
    {
      id: 'minimalist-elegant',
      name: 'Minimaliste Élégant',
      description: 'Pour une approche épurée',
      blocks: [
        { type: 'header-v3-perfect', variant: 'zen-navigation', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'breath-space', position: 2, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'haiku-intro', position: 3, priority: 'required' },
        { type: 'services-v3-perfect', variant: 'zen-cards', position: 4, priority: 'required' },
        { type: 'testimonials-v3-perfect', variant: 'minimal-wisdom', position: 5, priority: 'optional' },
        { type: 'contact-v3-perfect', variant: 'serene-form', position: 6, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'zen-closure', position: 7, priority: 'required' }
      ],
      tags: ['minimal', 'elegant', 'clean', 'zen']
    },
    // Structure 11: Dark Luxury - Style Noir Premium
    {
      id: 'dark-luxury',
      name: 'Dark Luxury',
      description: 'Pour un positionnement haut de gamme',
      blocks: [
        { type: 'header-v3-perfect', variant: 'black-gold', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'dark-elegance', position: 2, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'luxury-intro', position: 3, priority: 'required' },
        { type: 'services-v3-perfect', variant: 'gold-accent', position: 4, priority: 'required' },
        { type: 'gallery-v3-perfect', variant: 'spotlight-gallery', position: 5, priority: 'conditional' },
        { type: 'testimonials-v3-perfect', variant: 'vip-reviews', position: 6, priority: 'optional' },
        { type: 'pricing-v3-perfect', variant: 'premium-tiers', position: 7, priority: 'conditional' },
        { type: 'contact-v3-perfect', variant: 'exclusive-form', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'luxury-dark', position: 9, priority: 'required' }
      ],
      tags: ['luxury', 'premium', 'dark', 'exclusive']
    },
    // Structure 12: Eco-Responsable - Style Nature Organique
    {
      id: 'eco-friendly',
      name: 'Eco-Responsable',
      description: 'Pour les entreprises écologiques',
      blocks: [
        { type: 'header-v3-perfect', variant: 'earth-tones', position: 1, priority: 'required' },
        { type: 'hero-v3-perfect', variant: 'nature-video', position: 2, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'eco-mission', position: 3, priority: 'required' },
        { type: 'features-v3-perfect', variant: 'leaf-icons', position: 4, priority: 'required' },
        { type: 'services-v3-perfect', variant: 'sustainable-grid', position: 5, priority: 'required' },
        { type: 'content-v3-perfect', variant: 'carbon-stats', position: 6, priority: 'optional' },
        { type: 'testimonials-v3-perfect', variant: 'eco-community', position: 7, priority: 'optional' },
        { type: 'cta-v3-perfect', variant: 'green-action', position: 8, priority: 'required' },
        { type: 'footer-v3-perfect', variant: 'eco-footer', position: 9, priority: 'required' }
      ],
      tags: ['eco', 'sustainable', 'green', 'nature']
    }
  ];

  // Analyse des données disponibles
  analyzeAvailableData(formData: any): {
    hasServices: boolean;
    hasPricing: boolean;
    hasGallery: boolean;
    hasTestimonials: boolean;
    hasTeam: boolean;
    hasCertifications: boolean;
    hasProcess: boolean;
    hasEmergency: boolean;
    hasLocation: boolean;
    hasFAQ: boolean;
    businessCharacteristics: string[];
  } {
    return {
      hasServices: formData.services?.length > 0,
      hasPricing: formData.pricing?.hourlyRate || formData.services?.some((s: any) => s.priceRange),
      hasGallery: formData.portfolioImages?.length > 0 || formData.projects?.length > 0,
      hasTestimonials: formData.testimonials?.length > 0,
      hasTeam: formData.teamMembers?.length > 0,
      hasCertifications: formData.certifications?.length > 0,
      hasProcess: formData.workProcess?.steps?.length > 0,
      hasEmergency: formData.availability?.is24x7 || formData.is24x7Available,
      hasLocation: formData.serviceAreas?.length > 0,
      hasFAQ: formData.commonQuestions?.length > 0,
      businessCharacteristics: this.extractCharacteristics(formData)
    };
  }

  // Extraction des caractéristiques business
  private extractCharacteristics(formData: any): string[] {
    const characteristics = [];
    
    if (formData.availability?.is24x7 || formData.is24x7Available) {
      characteristics.push('urgency', '24/7');
    }
    if (formData.portfolioImages?.length > 5 || formData.projects?.length > 3) {
      characteristics.push('portfolio', 'visual');
    }
    if (formData.yearEstablished && new Date().getFullYear() - formData.yearEstablished > 10) {
      characteristics.push('established', 'trust');
    }
    if (formData.certifications?.length > 2) {
      characteristics.push('certified', 'professional');
    }
    if (formData.serviceAreas?.length > 5) {
      characteristics.push('local', 'coverage');
    }
    if (formData.teamSize > 5) {
      characteristics.push('team', 'scale');
    }
    if (formData.uniqueSellingPoint?.includes('innov') || formData.uniqueSellingPoint?.includes('modern')) {
      characteristics.push('innovation', 'modern');
    }
    if (formData.pricePositioning === 'premium') {
      characteristics.push('premium', 'quality');
    }
    
    return characteristics;
  }

  // Sélection intelligente de la structure
  async selectOptimalStructure(
    formData: any,
    aiAnalysis: any
  ): Promise<TemplateStructure> {
    const availableData = this.analyzeAvailableData(formData);
    const characteristics = availableData.businessCharacteristics;
    
    // Score chaque structure
    const scoredStructures = this.templateStructures.map(structure => {
      let score = 0;
      
      // Correspondance des tags
      structure.tags.forEach(tag => {
        if (characteristics.includes(tag)) score += 20;
        if (aiAnalysis.priorities?.some((p: string) => p.toLowerCase().includes(tag))) score += 15;
      });
      
      // Pénalité pour blocs manquants
      structure.blocks.forEach(block => {
        if (block.priority === 'required') {
          if (block.type.includes('pricing') && !availableData.hasPricing) score -= 10;
          if (block.type.includes('gallery') && !availableData.hasGallery) score -= 10;
          if (block.type.includes('testimonials') && !availableData.hasTestimonials) score -= 5;
        }
      });
      
      return { structure, score };
    });
    
    // Sélectionner la meilleure ou une aléatoire parmi les top 3
    const topStructures = scoredStructures
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    const selected = topStructures[Math.floor(Math.random() * topStructures.length)];
    return selected.structure;
  }

  // Génération des blocs adaptatifs
  async generateAdaptiveBlocks(
    structure: TemplateStructure,
    formData: any,
    personalizedContent: any,
    theme: any
  ): Promise<AdaptiveBlock[]> {
    const availableData = this.analyzeAvailableData(formData);
    const blocks: AdaptiveBlock[] = [];
    
    for (const blockDef of structure.blocks) {
      // Vérifier si le bloc doit être inclus
      if (blockDef.condition && !blockDef.condition(formData)) {
        continue;
      }
      
      // Skip les blocs conditionnels si pas de données
      if (blockDef.priority === 'conditional') {
        if (blockDef.type.includes('pricing') && !availableData.hasPricing) continue;
        if (blockDef.type.includes('gallery') && !availableData.hasGallery) continue;
        if (blockDef.type.includes('testimonials') && !availableData.hasTestimonials) continue;
        if (blockDef.type.includes('team') && !availableData.hasTeam) continue;
        if (blockDef.type.includes('certifications') && !availableData.hasCertifications) continue;
        if (blockDef.type.includes('faq') && !availableData.hasFAQ) continue;
      }
      
      // Générer les props du bloc
      const props = await this.generateBlockProps(
        blockDef.type,
        blockDef.variant || 'default',
        formData,
        personalizedContent,
        theme
      );
      
      blocks.push({
        type: blockDef.type,
        variant: blockDef.variant || this.selectBestVariant(blockDef.type, formData),
        position: blocks.length + 1,
        props
      });
    }
    
    return blocks;
  }

  // Sélection de la meilleure variante
  private selectBestVariant(blockType: string, formData: any): string {
    const variantsByType: Record<string, { condition: (data: any) => boolean; variant: string }[]> = {
      'hero-v3-perfect': [
        { condition: (d) => d.availability?.is24x7, variant: 'split-content' },
        { condition: (d) => d.portfolioImages?.length > 0, variant: 'fullscreen-video' },
        { condition: (d) => d.yearEstablished < 2010, variant: 'gradient-modern' },
        { condition: (d) => true, variant: 'minimal-centered' }
      ],
      'services-v3-perfect': [
        { condition: (d) => d.services?.length > 6, variant: 'grid-modern' },
        { condition: (d) => d.pricing?.hourlyRate, variant: 'cards-hover' },
        { condition: (d) => true, variant: 'list-detailed' }
      ],
      'gallery-v3-perfect': [
        { condition: (d) => d.beforeAfterImages?.length > 0, variant: 'before-after' },
        { condition: (d) => d.portfolioImages?.length > 10, variant: 'masonry-flow' },
        { condition: (d) => true, variant: 'grid-uniform' }
      ],
      'testimonials-v3-perfect': [
        { condition: (d) => d.testimonials?.length > 6, variant: 'carousel-3d' },
        { condition: (d) => d.videoTestimonials?.length > 0, variant: 'video-testimonials' },
        { condition: (d) => true, variant: 'grid' }
      ]
    };
    
    const variants = variantsByType[blockType];
    if (!variants) return 'default';
    
    for (const { condition, variant } of variants) {
      if (condition(formData)) return variant;
    }
    
    return 'default';
  }

  // Génération des props spécifiques
  private async generateBlockProps(
    blockType: string,
    variant: string,
    formData: any,
    personalizedContent: any,
    theme: any
  ): Promise<any> {
    const baseProps = {
      ...theme.colors,
      businessName: formData.businessName,
      phone: formData.phone,
      email: formData.email
    };
    
    switch (blockType) {
      case 'hero-v3-perfect':
        return {
          ...baseProps,
          variant,
          title: personalizedContent.hero.title,
          subtitle: personalizedContent.hero.subtitle,
          primaryButtonText: personalizedContent.hero.ctaText,
          urgencyBadge: personalizedContent.hero.urgencyBadge,
          backgroundImage: formData.heroImage || undefined,
          showVideo: formData.introVideo ? true : false,
          videoUrl: formData.introVideo
        };
        
      case 'services-v3-perfect':
        const services = personalizedContent.services.slice(0, 8);
        const serviceProps: any = { ...baseProps, variant, title: 'Nos Services' };
        services.forEach((service: any, index: number) => {
          serviceProps[`service${index + 1}_title`] = service.title;
          serviceProps[`service${index + 1}_description`] = service.description;
          serviceProps[`service${index + 1}_icon`] = service.icon;
          serviceProps[`service${index + 1}_price`] = service.price;
          serviceProps[`service${index + 1}_duration`] = service.duration;
          serviceProps[`service${index + 1}_specialty`] = service.speciality;
          // Ajouter l'image du service si disponible
          if (formData.services?.[index]?.image) {
            serviceProps[`service${index + 1}_image`] = formData.services[index].image;
          }
        });
        return serviceProps;
        
      case 'gallery-v3-perfect':
        const images = formData.portfolioImages || [];
        const galleryProps: any = { ...baseProps, variant, title: 'Nos Réalisations' };
        images.slice(0, 20).forEach((img: any, index: number) => {
          galleryProps[`image${index + 1}_src`] = img.url || img;
          galleryProps[`image${index + 1}_title`] = img.title || `Réalisation ${index + 1}`;
          galleryProps[`image${index + 1}_description`] = img.description || '';
          galleryProps[`image${index + 1}_category`] = img.category || 'general';
        });
        return galleryProps;
        
      case 'testimonials-v3-perfect':
        const testimonials = personalizedContent.testimonials;
        const testimonialProps: any = { ...baseProps, variant, title: 'Ils nous font confiance' };
        testimonials.forEach((testimonial: any, index: number) => {
          testimonialProps[`testimonial${index + 1}_text`] = testimonial.text;
          testimonialProps[`testimonial${index + 1}_author`] = testimonial.author;
          testimonialProps[`testimonial${index + 1}_service`] = testimonial.service;
          testimonialProps[`testimonial${index + 1}_rating`] = testimonial.rating;
          // Ajouter la photo du client si disponible
          if (testimonial.image) {
            testimonialProps[`testimonial${index + 1}_image`] = testimonial.image;
          }
        });
        return testimonialProps;
        
      case 'content-v3-perfect':
        if (variant === 'about') {
          return {
            ...baseProps,
            variant,
            title: `À propos de ${formData.businessName}`,
            content: personalizedContent.about.story,
            values: personalizedContent.about.values,
            certifications: personalizedContent.about.certifications,
            experience: personalizedContent.about.experience,
            founderImage: formData.teamMembers?.[0]?.photo
          };
        } else if (variant === 'stats') {
          return {
            ...baseProps,
            variant,
            title: 'Notre Expertise en Chiffres',
            stat1_value: formData.totalProjectsCompleted || '500+',
            stat1_label: 'Projets réalisés',
            stat2_value: personalizedContent.about.experience,
            stat2_label: 'D\'expérience',
            stat3_value: formData.teamSize || '10',
            stat3_label: 'Experts',
            stat4_value: '100%',
            stat4_label: 'Clients satisfaits'
          };
        } else if (variant === 'team' || variant === 'team-showcase') {
          const teamProps: any = { ...baseProps, variant, title: 'Notre Équipe' };
          formData.teamMembers?.forEach((member: any, index: number) => {
            teamProps[`member${index + 1}_name`] = member.name;
            teamProps[`member${index + 1}_role`] = member.role;
            teamProps[`member${index + 1}_experience`] = member.experience;
            teamProps[`member${index + 1}_photo`] = member.photo;
            teamProps[`member${index + 1}_bio`] = member.bio;
          });
          return teamProps;
        } else if (variant === 'certifications' || variant === 'trust-indicators') {
          const certProps: any = { ...baseProps, variant, title: 'Nos Certifications' };
          formData.certifications?.forEach((cert: any, index: number) => {
            certProps[`cert${index + 1}_name`] = cert.name;
            certProps[`cert${index + 1}_year`] = cert.year;
            certProps[`cert${index + 1}_image`] = cert.image;
            certProps[`cert${index + 1}_description`] = cert.description;
          });
          return certProps;
        }
        return baseProps;
        
      case 'features-v3-perfect':
        const features = personalizedContent.features;
        const featureProps: any = { ...baseProps, variant, title: 'Pourquoi nous choisir' };
        features.forEach((feature: any, index: number) => {
          featureProps[`feature${index + 1}_title`] = feature.title;
          featureProps[`feature${index + 1}_description`] = feature.description;
          featureProps[`feature${index + 1}_icon`] = feature.icon;
        });
        return featureProps;
        
      case 'faq-v3-perfect':
        const faqs = personalizedContent.faq;
        const faqProps: any = { ...baseProps, variant, title: 'Questions Fréquentes' };
        faqs.forEach((faq: any, index: number) => {
          faqProps[`faq${index + 1}_question`] = faq.question;
          faqProps[`faq${index + 1}_answer`] = faq.answer;
        });
        return faqProps;
        
      case 'pricing-v3-perfect':
        if (formData.pricingPlans?.length > 0) {
          const pricingProps: any = { ...baseProps, variant, title: 'Nos Tarifs' };
          formData.pricingPlans.forEach((plan: any, index: number) => {
            pricingProps[`plan${index + 1}_name`] = plan.name;
            pricingProps[`plan${index + 1}_price`] = plan.price;
            pricingProps[`plan${index + 1}_description`] = plan.description;
            pricingProps[`plan${index + 1}_features`] = plan.features;
          });
          return pricingProps;
        }
        return { ...baseProps, variant, title: 'Devis sur mesure' };
        
      case 'contact-v3-perfect':
        return {
          ...baseProps,
          variant,
          title: 'Contactez-nous',
          address: formData.mainAddress?.street || personalizedContent.localSEO.areas[0],
          serviceAreas: personalizedContent.localSEO.areas.join(', '),
          showUrgency: formData.availability?.is24x7,
          mapPosition: variant.includes('map') ? 'right' : undefined
        };
        
      case 'cta-v3-perfect':
        return {
          ...baseProps,
          variant,
          title: this.generateCTATitle(variant, formData),
          subtitle: this.generateCTASubtitle(variant, formData),
          buttonText: personalizedContent.hero.ctaText,
          urgencyText: formData.availability?.is24x7 ? 'Disponible 24/7' : undefined
        };
        
      case 'header-v3-perfect':
        return {
          ...baseProps,
          variant,
          logo: formData.logo,
          menuItems: this.generateMenuItems(formData, personalizedContent),
          ctaButton: {
            text: formData.availability?.is24x7 ? 'Urgence 24/7' : 'Devis Gratuit',
            highlight: true
          }
        };
        
      case 'footer-v3-perfect':
        return {
          ...baseProps,
          variant,
          certifications: personalizedContent.about.certifications,
          serviceAreas: personalizedContent.localSEO.areas,
          socialLinks: formData.socialMedia,
          newsletter: formData.collectEmails
        };
        
      default:
        return baseProps;
    }
  }

  // Génération du titre CTA
  private generateCTATitle(variant: string, formData: any): string {
    const titles: Record<string, string> = {
      'urgency-banner': 'Besoin d\'une intervention urgente ?',
      'gradient-wave': 'Prêt à démarrer votre projet ?',
      'floating-cards': 'Transformez vos idées en réalité',
      'multi-cta': 'Plusieurs façons de nous contacter',
      'narrative': `L'histoire de ${formData.businessName} continue avec vous`,
      'creative-cta': 'Créons ensemble quelque chose d\'unique'
    };
    return titles[variant] || 'Contactez-nous dès maintenant';
  }

  // Génération du sous-titre CTA
  private generateCTASubtitle(variant: string, formData: any): string {
    if (formData.availability?.is24x7) {
      return 'Intervention rapide 24h/24, 7j/7';
    }
    return 'Devis gratuit et sans engagement';
  }

  // Génération des éléments de menu
  private generateMenuItems(formData: any, personalizedContent: any): any[] {
    const items = [
      { label: 'Accueil', href: '#' }
    ];
    
    if (personalizedContent.services.length > 0) {
      items.push({ label: 'Services', href: '#services' });
    }
    if (formData.portfolioImages?.length > 0) {
      items.push({ label: 'Réalisations', href: '#gallery' });
    }
    if (formData.teamMembers?.length > 0) {
      items.push({ label: 'Équipe', href: '#team' });
    }
    items.push(
      { label: 'À propos', href: '#about' },
      { label: 'Contact', href: '#contact' }
    );
    
    return items;
  }

  // Génération de variations uniques
  async generateUniqueVariations(
    formData: any,
    aiAnalysis: any,
    count: number = 3
  ): Promise<any[]> {
    const variations = [];
    const usedStructures = new Set<string>();
    
    for (let i = 0; i < count; i++) {
      // Sélectionner une structure non utilisée
      let structure = await this.selectOptimalStructure(formData, aiAnalysis);
      while (usedStructures.has(structure.id) && usedStructures.size < this.templateStructures.length) {
        const randomIndex = Math.floor(Math.random() * this.templateStructures.length);
        structure = this.templateStructures[randomIndex];
      }
      usedStructures.add(structure.id);
      
      // Générer le contenu personnalisé
      const personalizedContent = await this.contentService.generatePersonalizedContent(
        formData,
        aiAnalysis
      );
      
      // Générer un thème unique
      const theme = this.generateUniqueTheme(formData, i);
      
      // Générer les blocs adaptatifs
      const blocks = await this.generateAdaptiveBlocks(
        structure,
        formData,
        personalizedContent,
        theme
      );
      
      variations.push({
        id: `variation-${i + 1}`,
        name: structure.name,
        description: structure.description,
        structure: structure.id,
        blocks,
        theme,
        personalizedContent,
        score: 90 - (i * 5) // Score décroissant
      });
    }
    
    return variations;
  }

  // Génération de thème unique
  private generateUniqueTheme(formData: any, index: number): any {
    const colorSchemes = [
      // Scheme 1: Electric Blue Neon
      {
        name: 'Electric Neon',
        primary: '#00D9FF',
        secondary: '#0066FF',
        accent: '#FF00FF',
        background: '#0A0A0A',
        surface: '#1A1A1A',
        text: '#FFFFFF',
        textMuted: '#B8B8B8',
        success: '#00FF88',
        warning: '#FFD700',
        error: '#FF0066',
        gradient: 'linear-gradient(135deg, #00D9FF 0%, #0066FF 50%, #FF00FF 100%)'
      },
      // Scheme 2: Brutalist Orange
      {
        name: 'Brutalist Impact',
        primary: '#FF6B00',
        secondary: '#1A1A1A',
        accent: '#FFEB00',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        textMuted: '#666666',
        success: '#00C853',
        warning: '#FF9800',
        error: '#D32F2F',
        gradient: 'linear-gradient(45deg, #FF6B00 0%, #FFEB00 100%)'
      },
      // Scheme 3: Corporate Trust Blue
      {
        name: 'Corporate Premium',
        primary: '#1E3A8A',
        secondary: '#3B82F6',
        accent: '#F59E0B',
        background: '#FAFBFC',
        surface: '#FFFFFF',
        text: '#1E293B',
        textMuted: '#64748B',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
      },
      // Scheme 4: Earthy Organic
      {
        name: 'Terroir Naturel',
        primary: '#8B4513',
        secondary: '#228B22',
        accent: '#FFD700',
        background: '#FFF8DC',
        surface: '#FFFFFF',
        text: '#2F4F4F',
        textMuted: '#696969',
        success: '#32CD32',
        warning: '#FFA500',
        error: '#DC143C',
        gradient: 'linear-gradient(135deg, #8B4513 0%, #228B22 100%)'
      },
      // Scheme 5: Cyberpunk Purple
      {
        name: 'Cyberpunk 2030',
        primary: '#9D00FF',
        secondary: '#00FFF0',
        accent: '#FF0080',
        background: '#0D0D0D',
        surface: '#1A0D26',
        text: '#FFFFFF',
        textMuted: '#B8B8D0',
        success: '#00FF00',
        warning: '#FFFF00',
        error: '#FF0000',
        gradient: 'linear-gradient(135deg, #9D00FF 0%, #00FFF0 50%, #FF0080 100%)'
      },
      // Scheme 6: Luxury Gold Black
      {
        name: 'Dark Luxury',
        primary: '#FFD700',
        secondary: '#1A1A1A',
        accent: '#B8860B',
        background: '#000000',
        surface: '#1A1A1A',
        text: '#FFFFFF',
        textMuted: '#CCCCCC',
        success: '#218838',
        warning: '#FFC107',
        error: '#C82333',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)'
      },
      // Scheme 7: Pastel Dream
      {
        name: 'Pastel Elegance',
        primary: '#E8B4F8',
        secondary: '#B4E8F8',
        accent: '#F8B4B4',
        background: '#FEFEFE',
        surface: '#FFFFFF',
        text: '#4A5568',
        textMuted: '#A0AEC0',
        success: '#B4F8B4',
        warning: '#F8E8B4',
        error: '#F8B4B4',
        gradient: 'linear-gradient(135deg, #E8B4F8 0%, #B4E8F8 50%, #F8B4B4 100%)'
      },
      // Scheme 8: Industrial Steel
      {
        name: 'Industrial Power',
        primary: '#455A64',
        secondary: '#FF5722',
        accent: '#FFC107',
        background: '#ECEFF1',
        surface: '#FFFFFF',
        text: '#263238',
        textMuted: '#607D8B',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        gradient: 'linear-gradient(135deg, #455A64 0%, #FF5722 100%)'
      },
      // Scheme 9: Zen Minimal
      {
        name: 'Zen Serenity',
        primary: '#6B7280',
        secondary: '#374151',
        accent: '#D97706',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#1F2937',
        textMuted: '#9CA3AF',
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        gradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)'
      },
      // Scheme 10: Ocean Fresh
      {
        name: 'Ocean Breeze',
        primary: '#0891B2',
        secondary: '#06B6D4',
        accent: '#10B981',
        background: '#F0FDFA',
        surface: '#FFFFFF',
        text: '#134E4A',
        textMuted: '#5EEAD4',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 50%, #10B981 100%)'
      },
      // Scheme 11: Sunset Glow
      {
        name: 'Sunset Vibes',
        primary: '#F97316',
        secondary: '#EA580C',
        accent: '#FCD34D',
        background: '#FFFBEB',
        surface: '#FFFFFF',
        text: '#451A03',
        textMuted: '#92400E',
        success: '#65A30D',
        warning: '#FCD34D',
        error: '#DC2626',
        gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #FCD34D 100%)'
      },
      // Scheme 12: Forest Deep
      {
        name: 'Forest Sanctuary',
        primary: '#15803D',
        secondary: '#166534',
        accent: '#A3E635',
        background: '#F7FEE7',
        surface: '#FFFFFF',
        text: '#14532D',
        textMuted: '#22C55E',
        success: '#16A34A',
        warning: '#FDE047',
        error: '#DC2626',
        gradient: 'linear-gradient(135deg, #15803D 0%, #166534 50%, #A3E635 100%)'
      }
    ];
    
    const fonts = [
      { heading: 'Space Grotesk', body: 'Manrope' },
      { heading: 'Montserrat', body: 'Inter' },
      { heading: 'Raleway', body: 'Roboto' },
      { heading: 'Poppins', body: 'Open Sans' },
      { heading: 'Playfair Display', body: 'Lato' },
      { heading: 'Bebas Neue', body: 'Source Sans Pro' },
      { heading: 'Oswald', body: 'Nunito' },
      { heading: 'DM Serif Display', body: 'DM Sans' }
    ];

    const styles = [
      { borderRadius: '0px', spacing: 'tight', shadows: 'sharp' },
      { borderRadius: '4px', spacing: 'normal', shadows: 'subtle' },
      { borderRadius: '8px', spacing: 'normal', shadows: 'medium' },
      { borderRadius: '16px', spacing: 'relaxed', shadows: 'soft' },
      { borderRadius: '24px', spacing: 'relaxed', shadows: 'dreamy' },
      { borderRadius: '50px', spacing: 'generous', shadows: 'floating' }
    ];

    // Sélection basée sur les préférences et l'index
    let schemeIndex = index % colorSchemes.length;
    
    // Adapter selon les préférences utilisateur
    if (formData.stylePreference) {
      if (formData.stylePreference.includes('modern')) schemeIndex = [0, 4, 6][index % 3];
      if (formData.stylePreference.includes('classic')) schemeIndex = [2, 8, 9][index % 3];
      if (formData.stylePreference.includes('bold')) schemeIndex = [1, 5, 7][index % 3];
      if (formData.stylePreference.includes('natural')) schemeIndex = [3, 11, 9][index % 3];
    }
    
    const selectedScheme = colorSchemes[schemeIndex];
    const selectedFont = fonts[index % fonts.length];
    const selectedStyle = styles[Math.floor(index / 2) % styles.length];
    
    return {
      name: selectedScheme.name,
      colors: {
        primary: selectedScheme.primary,
        secondary: selectedScheme.secondary,
        accent: selectedScheme.accent,
        background: selectedScheme.background,
        surface: selectedScheme.surface,
        text: selectedScheme.text,
        textMuted: selectedScheme.textMuted,
        success: selectedScheme.success,
        warning: selectedScheme.warning,
        error: selectedScheme.error,
        gradient: selectedScheme.gradient
      },
      fonts: selectedFont,
      style: {
        borderRadius: selectedStyle.borderRadius,
        spacing: selectedStyle.spacing,
        shadows: selectedStyle.shadows,
        animations: index % 2 === 0 ? 'smooth' : 'snappy',
        transitions: index % 3 === 0 ? '0.3s ease' : index % 3 === 1 ? '0.2s ease-out' : '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    };
  }

  // Obtenir une analyse par défaut si DeepSeek n'est pas disponible
  getDefaultAnalysis(formData: any): any {
    const is24x7 = formData.is24x7Available || formData.availability?.is24x7;
    const hasGallery = formData.hasGallery || formData.portfolio?.enabled;
    const isEstablished = formData.yearEstablished && formData.yearEstablished < 2015;
    const hasTestimonials = formData.hasTestimonials || formData.testimonials?.length > 0;
    
    return {
      businessProfile: `${formData.businessType} ${isEstablished ? 'établi' : 'en développement'} basé à ${formData.serviceAreas?.[0] || 'France'}`,
      priorities: [
        is24x7 ? 'Service urgence 24/7' : 'Service sur rendez-vous',
        hasGallery ? 'Portfolio visuel de qualité' : 'Présentation détaillée des services',
        isEstablished ? 'Expérience et confiance établie' : 'Innovation et approche moderne',
        'Couverture géographique étendue',
        'Conversion optimale des visiteurs'
      ].slice(0, 5),
      keyPoints: [
        is24x7 ? 'Bouton urgence flottant avec numéro direct' : 'Système de prise de rendez-vous intégré',
        hasGallery ? 'Galeries avant/après interactives' : 'Descriptions détaillées avec bénéfices',
        'Carte interactive des zones d\'intervention',
        hasTestimonials ? 'Témoignages vidéo et avis Google' : 'Badges de confiance et certifications',
        'Formulaire de devis intelligent',
        'Chat en ligne pour questions rapides'
      ],
      recommendedFeatures: [
        'Formulaire de contact multi-étapes',
        'Numéro de téléphone sticky',
        hasGallery ? 'Galerie filtrable par catégorie' : 'Carousel de services',
        'FAQ dynamique avec recherche',
        'Badges de confiance animés',
        'Calculateur de devis en ligne',
        'Zone client avec suivi projet'
      ],
      customizationTips: [
        'Photos authentiques de l\'équipe en action',
        'Ton professionnel mais accessible',
        'Intégration avis Google My Business en temps réel',
        'Couleurs alignées avec l\'identité métier',
        'Micro-animations subtiles',
        'Optimisation mobile prioritaire'
      ],
      templateRecommendations: {
        urgency: is24x7 ? 85 : 30,
        trust: isEstablished ? 90 : 60,
        visual: hasGallery ? 80 : 40,
        local: formData.serviceAreas?.length > 3 ? 75 : 50,
        premium: formData.pricePositioning === 'premium' ? 80 : 40,
        innovation: !isEstablished ? 75 : 40
      }
    };
  }
}
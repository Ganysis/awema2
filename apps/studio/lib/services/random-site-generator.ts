import { siteGenerator } from './site-generator';
import { BusinessInfo } from '@awema/shared';

interface RandomizationConfig {
  // Styles cohérents pour tout le site
  colorScheme: 'primary' | 'blue' | 'green' | 'purple' | 'gradient';
  visualStyle: 'clean' | 'modern' | 'elegant' | 'minimal' | 'professional' | 'creative' | 'bold';
  spacing: 'compact' | 'normal' | 'spacious';
  animations: 'none' | 'subtle' | 'normal' | 'dynamic';
  
  // Préférences de layout
  heroStyle: string;
  featuresStyle: string;
  galleryStyle: string;
  ctaStyle: string;
  faqStyle: string;
  pricingStyle: string;
  contentLayout: string;
}

export class RandomSiteGenerator {
  private static getRandomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private static mapVisualStyle(style: string): 'modern' | 'classic' | 'industrial' | 'natural' {
    const mapping: Record<string, 'modern' | 'classic' | 'industrial' | 'natural'> = {
      'clean': 'modern',
      'modern': 'modern',
      'elegant': 'classic',
      'minimal': 'modern',
      'professional': 'classic',
      'creative': 'modern',
      'bold': 'industrial'
    };
    return mapping[style] || 'modern';
  }

  private static generateRandomConfig(): RandomizationConfig {
    // Générer une configuration cohérente
    const colorSchemes = ['primary', 'blue', 'green', 'purple', 'gradient'] as const;
    const visualStyles = ['clean', 'modern', 'elegant', 'minimal', 'professional', 'creative', 'bold'] as const;
    const spacings = ['compact', 'normal', 'spacious'] as const;
    const animations = ['none', 'subtle', 'normal', 'dynamic'] as const;

    // Styles cohérents basés sur le style visuel principal
    const visualStyle = this.getRandomItem([...visualStyles]);
    
    // Adapter les autres choix au style principal
    let colorScheme = this.getRandomItem([...colorSchemes]);
    let spacing = this.getRandomItem([...spacings]);
    let animationLevel = this.getRandomItem([...animations]);

    // Cohérence des styles
    if (visualStyle === 'minimal' || visualStyle === 'clean') {
      spacing = this.getRandomItem(['normal', 'spacious']);
      animationLevel = this.getRandomItem(['none', 'subtle']);
      colorScheme = this.getRandomItem(['primary', 'blue']);
    } else if (visualStyle === 'bold' || visualStyle === 'creative') {
      animationLevel = this.getRandomItem(['normal', 'dynamic']);
      colorScheme = this.getRandomItem(['gradient', 'purple', 'green']);
    } else if (visualStyle === 'elegant' || visualStyle === 'professional') {
      spacing = 'spacious';
      animationLevel = 'subtle';
    }

    // Sélection des layouts spécifiques
    const heroStyles = ['hero-split-screen', 'hero-centered'];
    const featuresStyles = [
      'grid-icons', 'cards-modern', 'list-badges', 'boxes-colored',
      'timeline-vertical', 'hexagon-grid', 'circular-icons', 'metro-tiles'
    ];
    const galleryStyles = [
      'grid', 'masonry', 'carousel', 'grid-hover', 'cards', 
      'timeline', 'tabs', 'mosaic', 'lightbox'
    ];
    const ctaStyles = [
      'banner-classic', 'box-centered', 'gradient-modern', 'minimal',
      'split-image', 'floating-card', 'wave-pattern', 'diagonal'
    ];
    const faqStyles = [
      'accordion-classic', 'accordion-modern', 'cards-faq', 'timeline-faq',
      'tabs-categories', 'grid-two-col', 'chat-style', 'minimal'
    ];
    const pricingStyles = [
      'cards-classic', 'cards-modern', 'table-compare', 'minimal',
      'cards-gradient', 'toggle-period', 'cards-3d'
    ];
    const contentLayouts = [
      'image-right', 'image-left', 'image-top', 'split-even',
      'overlay', 'card-horizontal'
    ];

    return {
      colorScheme,
      visualStyle,
      spacing,
      animations: animationLevel,
      heroStyle: this.getRandomItem(heroStyles),
      featuresStyle: this.getRandomItem(featuresStyles),
      galleryStyle: this.getRandomItem(galleryStyles),
      ctaStyle: this.getRandomItem(ctaStyles),
      faqStyle: this.getRandomItem(faqStyles),
      pricingStyle: this.getRandomItem(pricingStyles),
      contentLayout: this.getRandomItem(contentLayouts)
    };
  }

  private static applyRandomization(blocks: any[], config: RandomizationConfig): any[] {
    return blocks.map(block => {
      const randomizedBlock = { ...block };
      
      // Appliquer la configuration selon le type de bloc
      switch (block.type) {
        case 'hero-split-screen':
        case 'hero-centered':
          randomizedBlock.props = {
            ...randomizedBlock.props,
            backgroundEffect: config.visualStyle === 'modern' ? 'gradient' : 
                            config.visualStyle === 'creative' ? 'particles' : 'solid',
            contentAlignment: this.getRandomItem(['left', 'center', 'right'])
          };
          break;

        case 'text-image-clean':
          randomizedBlock.props = {
            ...randomizedBlock.props,
            features: randomizedBlock.props.features || ['✓ Qualité garantie', '✓ Service rapide', '✓ Prix compétitifs']
          };
          // Appliquer des variantes aléatoires
          randomizedBlock.variants = [];
          if (Math.random() > 0.5) {
            randomizedBlock.variants.push('image-left');
          }
          if (config.visualStyle === 'modern' && Math.random() > 0.6) {
            randomizedBlock.variants.push('gray-background');
          }
          break;

        case 'features-clean':
          randomizedBlock.props = {
            ...randomizedBlock.props,
            columns: this.getRandomItem([2, 3, 4])
          };
          // Appliquer des variantes aléatoires
          randomizedBlock.variants = [];
          if (Math.random() > 0.6) {
            randomizedBlock.variants.push('gray-background');
          }
          if (config.visualStyle === 'modern' || config.visualStyle === 'elegant') {
            randomizedBlock.variants.push('centered');
          }
          break;

        case 'gallery-clean':
          randomizedBlock.props = {
            ...randomizedBlock.props,
            columns: this.getRandomItem([2, 3, 4])
          };
          // Appliquer des variantes aléatoires
          randomizedBlock.variants = [];
          if (Math.random() > 0.5) {
            randomizedBlock.variants.push('gray-background');
          }
          if (config.spacing === 'spacious') {
            randomizedBlock.variants.push('full-width');
          }
          break;

        case 'faq-clean':
          randomizedBlock.props = {
            ...randomizedBlock.props
          };
          // Appliquer des variantes aléatoires
          randomizedBlock.variants = [];
          if (Math.random() > 0.6) {
            randomizedBlock.variants.push('gray-background');
          }
          if (config.visualStyle === 'modern' || config.visualStyle === 'elegant') {
            randomizedBlock.variants.push('centered');
          }
          break;

        case 'pricing-clean':
          randomizedBlock.props = {
            ...randomizedBlock.props
          };
          // Appliquer des variantes aléatoires
          randomizedBlock.variants = [];
          if (Math.random() > 0.5) {
            randomizedBlock.variants.push('gray-background');
          }
          break;

        case 'cta-clean':
          randomizedBlock.props = {
            ...randomizedBlock.props
          };
          // Appliquer des variantes aléatoires
          randomizedBlock.variants = [];
          if (config.colorScheme === 'gradient' || Math.random() > 0.6) {
            randomizedBlock.variants.push('gradient');
          }
          if (config.visualStyle === 'bold' || config.visualStyle === 'creative') {
            randomizedBlock.variants.push('dark');
          }
          if (config.spacing === 'compact') {
            randomizedBlock.variants.push('compact');
          }
          break;

        case 'services-grid-cards':
        case 'services-list-detailed':
          randomizedBlock.props = {
            ...randomizedBlock.props,
            columns: this.getRandomItem([2, 3, 4]),
            showIcon: true,
            iconStyle: config.visualStyle === 'modern' ? 'gradient' : 'solid'
          };
          break;

        case 'testimonials-carousel':
          randomizedBlock.props = {
            ...randomizedBlock.props,
            layout: this.getRandomItem(['carousel', 'grid', 'masonry']),
            showRating: config.visualStyle !== 'minimal',
            autoplay: config.animations !== 'none'
          };
          break;
      }

      // Appliquer l'animation globale
      if (randomizedBlock.props && config.animations !== 'none') {
        randomizedBlock.props.animation = config.animations === 'dynamic' ? 
          this.getRandomItem(['fade-up', 'zoom-in', 'slide']) : 'fade-up';
      }

      return randomizedBlock;
    });
  }

  public static generateRandomizedSite(businessInfo: BusinessInfo | any): {
    blocks: any[];
    pages: Map<string, any[]>;
    theme: any;
    config: RandomizationConfig;
  } {
    // Générer la configuration aléatoire cohérente
    const config = this.generateRandomConfig();
    
    // Adapter BusinessInfo au format Client attendu par siteGenerator
    // Gérer le cas où businessInfo est un objet vide ou incomplet
    const clientData = {
      businessName: businessInfo?.businessName || businessInfo?.companyName || 'Mon Entreprise',
      businessType: businessInfo?.businessType || businessInfo?.industry?.category || 'artisan',
      description: businessInfo?.description || 'Entreprise professionnelle de qualité',
      phone: businessInfo?.phone || businessInfo?.contact?.phone || '01 23 45 67 89',
      email: businessInfo?.email || businessInfo?.contact?.email || 'contact@entreprise.fr',
      address: businessInfo?.address || businessInfo?.contact?.address?.street || '123 rue Exemple',
      city: businessInfo?.city || businessInfo?.contact?.address?.city || 'Paris',
      postalCode: businessInfo?.postalCode || businessInfo?.contact?.address?.postalCode || '75001',
      services: businessInfo?.services || [
        { 
          id: '1', 
          name: 'Service principal', 
          description: 'Notre expertise à votre service',
          price: { amount: 100, currency: '€' },
          features: ['Qualité garantie', 'Intervention rapide', 'Devis gratuit'],
          category: 'principal',
          images: []
        },
        { 
          id: '2', 
          name: 'Service secondaire', 
          description: 'Solutions complémentaires',
          price: { amount: 150, currency: '€' },
          features: ['Service complet', 'Matériel inclus', 'Garantie 2 ans'],
          category: 'complementaire',
          images: []
        }
      ],
      interventionCities: businessInfo?.interventionCities || businessInfo?.location?.serviceArea || ['Paris', 'Banlieue'],
      photos: businessInfo?.photos || [],
      testimonials: businessInfo?.testimonials || [
        { author: 'Client satisfait', text: 'Excellent travail, je recommande !', rating: 5 }
      ],
      certifications: businessInfo?.certifications || [],
      insurance: businessInfo?.insurance || true,
      visualStyle: this.mapVisualStyle(config.visualStyle),
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      selectedPages: ['home', 'services', 'contact', 'about']
    };
    
    // Générer le site de base
    const baseSite = siteGenerator.generateSiteFromClient(clientData);
    
    // Appliquer la randomisation aux blocs
    const randomizedBlocks = this.applyRandomization(baseSite.blocks, config);
    
    // Randomiser aussi les pages
    const randomizedPages = new Map();
    baseSite.pages.forEach((pageBlocks, slug) => {
      randomizedPages.set(slug, this.applyRandomization(pageBlocks, config));
    });
    
    // Adapter le thème à la configuration
    const theme = {
      ...baseSite.theme,
      variant: config.visualStyle === 'minimal' ? 'minimal' : 
               config.visualStyle === 'modern' ? 'ultra-pro' : 'premium',
      colors: {
        ...baseSite.theme.colors,
        scheme: config.colorScheme
      }
    };

    return {
      blocks: randomizedBlocks,
      pages: randomizedPages,
      theme,
      config
    };
  }

  // Générer une variation d'un site existant
  public static regenerateWithNewStyle(
    businessInfo: BusinessInfo, 
    currentBlocks: any[],
    keepContent: boolean = true
  ): {
    blocks: any[];
    pages: Map<string, any[]>;
    theme: any;
    config: RandomizationConfig;
  } {
    const newConfig = this.generateRandomConfig();
    
    if (keepContent) {
      // Garder le contenu mais changer les styles
      const randomizedBlocks = this.applyRandomization(currentBlocks, newConfig);
      
      // Convertir BusinessInfo en format Client
      const clientData = {
        businessName: businessInfo.companyName,
        businessType: businessInfo.industry.category,
        description: businessInfo.description,
        phone: businessInfo.contact.phone,
        email: businessInfo.contact.email,
        address: businessInfo.contact.address?.street || '',
        city: businessInfo.contact.address?.city || '',
        postalCode: businessInfo.contact.address?.postalCode || '',
        services: businessInfo.services.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description,
          price: String(s.price?.amount || 0),
          priceType: 'fixed' as const,
          duration: '2 heures',
          guarantee: '2 ans',
          images: []
        })),
        interventionCities: [],
        photos: [],
        testimonials: [],
        certifications: [],
        insurance: 'Assuré',
        visualStyle: this.mapVisualStyle(newConfig.visualStyle),
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
        selectedPages: ['home', 'services', 'contact', 'about']
      };
      
      // Régénérer les pages avec les nouveaux styles
      const baseSite = siteGenerator.generateSiteFromClient(clientData);
      const randomizedPages = new Map();
      baseSite.pages.forEach((pageBlocks, slug) => {
        randomizedPages.set(slug, this.applyRandomization(pageBlocks, newConfig));
      });
      
      return {
        blocks: randomizedBlocks,
        pages: randomizedPages,
        theme: {
          variant: newConfig.visualStyle === 'minimal' ? 'minimal' : 
                   newConfig.visualStyle === 'modern' ? 'ultra-pro' : 'premium',
          colors: { scheme: newConfig.colorScheme }
        },
        config: newConfig
      };
    } else {
      // Régénérer complètement
      return this.generateRandomizedSite(businessInfo);
    }
  }
}
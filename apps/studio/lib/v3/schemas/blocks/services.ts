/**
 * Services Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { colorSchema, imageSchema, buttonSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour un service
export const serviceItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string(),
  icon: z.union([
    z.string(), // Emoji ou texte
    z.object({
      type: z.enum(['emoji', 'svg', 'image', 'lottie']),
      value: z.string()
    })
  ]).optional(),
  image: imageSchema.optional(),
  
  // Détails du service
  features: z.array(z.string()).optional(),
  
  // Pricing
  pricing: z.object({
    enabled: z.boolean().default(false),
    amount: z.number().optional(),
    currency: z.string().default('€'),
    period: z.enum(['hour', 'day', 'project', 'custom']).default('project'),
    customPeriod: z.string().optional(),
    startingAt: z.boolean().default(true),
    description: z.string().optional()
  }).optional(),
  
  // CTA
  cta: z.object({
    enabled: z.boolean().default(true),
    text: z.string().default('En savoir plus'),
    link: z.string().default('#'),
    style: z.enum(['link', 'button']).default('link')
  }).optional(),
  
  // Badge
  badge: z.object({
    text: z.string(),
    color: z.enum(['primary', 'secondary', 'success', 'warning', 'error']).default('primary'),
    position: z.enum(['top-left', 'top-right']).default('top-right')
  }).optional(),
  
  // Availability
  availability: z.object({
    status: z.enum(['available', 'busy', 'unavailable']).default('available'),
    message: z.string().optional()
  }).optional(),
  
  // Category
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  
  // Ordre et mise en avant
  order: z.number().optional(),
  featured: z.boolean().default(false),
  popular: z.boolean().default(false)
});

// Schema principal Services
export const servicesDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'grid-cards',
    'list-detailed',
    'carousel-modern',
    'masonry-creative',
    'tabs-organized',
    'accordion-compact',
    'timeline-process',
    'hexagon-tech'
  ]).default('grid-cards').describe('Style visuel du bloc services'),
  
  // Visual variant (theme style)
  visualVariant: z.enum([
    'modern',
    'minimal',
    'bold',
    'elegant'
  ]).default('modern').describe('Style visuel du thème'),
  
  // Configuration du titre
  title: z.string().default('Nos Services'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  
  // Services
  services: z.array(serviceItemSchema).min(1).default([
    {
      id: '1',
      title: 'Rénovation complète',
      description: 'Transformation totale de votre espace, de la conception à la réalisation.',
      icon: '🏠',
      features: [
        'Étude personnalisée',
        'Plans 3D',
        'Gestion complète du projet',
        'Garantie décennale'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 5000,
        currency: '€',
        period: 'project'
      },
      featured: true
    },
    {
      id: '2',
      title: 'Électricité',
      description: 'Installation et mise aux normes de vos équipements électriques.',
      icon: '⚡',
      features: [
        'Diagnostic gratuit',
        'Mise aux normes',
        'Domotique',
        'Dépannage 24/7'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 50,
        currency: '€',
        period: 'hour'
      }
    },
    {
      id: '3',
      title: 'Plomberie',
      description: 'Installation, réparation et entretien de vos équipements sanitaires.',
      icon: '🔧',
      features: [
        'Intervention rapide',
        'Devis gratuit',
        'Matériel de qualité',
        'Garantie pièces et main d\'œuvre'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 45,
        currency: '€',
        period: 'hour'
      }
    }
  ]),
  
  // Layout
  layout: z.object({
    columns: z.number().min(1).max(4).default(3),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
    alignment: z.enum(['left', 'center', 'right']).default('left')
  }).default({}),
  
  // Options d'affichage
  display: z.object({
    showIcon: z.boolean().default(true),
    iconSize: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
    iconStyle: z.enum(['filled', 'outline', 'gradient', 'shadow', '3d']).default('filled'),
    iconPosition: z.enum(['top', 'left', 'right']).default('top'),
    
    showImage: z.boolean().default(false),
    imagePosition: z.enum(['top', 'bottom', 'background', 'side']).default('top'),
    imageRatio: z.enum(['square', 'landscape', 'portrait']).default('landscape'),
    
    showFeatures: z.boolean().default(true),
    featuresStyle: z.enum(['list', 'tags', 'grid']).default('list'),
    maxFeatures: z.number().default(4),
    
    showPricing: z.boolean().default(true),
    pricingStyle: z.enum(['simple', 'badge', 'prominent']).default('simple'),
    
    cardStyle: z.enum(['flat', 'elevated', 'outlined', 'gradient', 'glassmorphism']).default('elevated'),
    cardHover: z.enum(['none', 'lift', 'scale', 'glow', 'flip']).default('lift'),
    
    showBadges: z.boolean().default(true),
    highlightFeatured: z.boolean().default(true),
    
    animation: z.enum(['none', 'fade', 'slide', 'scale', 'flip']).default('fade'),
    animationDelay: z.number().default(100),
    stagger: z.boolean().default(true)
  }).default({}),
  
  // Filtrage et catégories
  filtering: z.object({
    enabled: z.boolean().default(false),
    categories: z.array(z.object({
      id: z.string(),
      label: z.string(),
      count: z.number().optional()
    })).default([]),
    defaultCategory: z.string().optional(),
    style: z.enum(['tabs', 'buttons', 'dropdown']).default('buttons'),
    position: z.enum(['top', 'side']).default('top'),
    showAll: z.boolean().default(true),
    allLabel: z.string().default('Tous les services')
  }).default({}),
  
  // Carousel options (pour variant carousel)
  carousel: z.object({
    enabled: z.boolean().default(false),
    autoplay: z.boolean().default(true),
    autoplayDelay: z.number().default(5000),
    loop: z.boolean().default(true),
    showArrows: z.boolean().default(true),
    showDots: z.boolean().default(true),
    slidesPerView: z.number().default(3),
    spacing: z.number().default(24)
  }).default({}),
  
  // Process/Timeline options
  process: z.object({
    showStepNumbers: z.boolean().default(true),
    numberStyle: z.enum(['circle', 'square', 'hexagon']).default('circle'),
    connectorStyle: z.enum(['solid', 'dashed', 'dotted', 'gradient']).default('solid'),
    orientation: z.enum(['vertical', 'horizontal']).default('vertical')
  }).default({}),
  
  // Call to action global
  cta: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Vous ne trouvez pas le service recherché ?'),
    description: z.string().default('Contactez-nous pour un devis personnalisé'),
    buttonText: z.string().default('Demander un devis'),
    buttonLink: z.string().default('#contact'),
    buttonVariant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
    position: z.enum(['bottom', 'top']).default('bottom')
  }).default({}),
  
  // Témoignages intégrés
  testimonials: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Ce que nos clients disent'),
    items: z.array(z.object({
      serviceId: z.string(),
      author: z.string(),
      rating: z.number().min(0).max(5),
      comment: z.string()
    })).default([])
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type ServicesData = z.infer<typeof servicesDataSchema>;

// Valeurs par défaut complètes
export const servicesDefaults: ServicesData = {
  variant: 'grid-cards',
  title: 'Nos Services',
  subtitle: 'Des solutions adaptées à tous vos besoins',
  description: 'Découvrez notre gamme complète de services professionnels.',
  
  services: [
    {
      id: '1',
      title: 'Rénovation complète',
      description: 'Transformation totale de votre espace, de la conception à la réalisation. Nous gérons l\'intégralité de votre projet.',
      icon: '🏠',
      features: [
        'Étude personnalisée',
        'Plans 3D et visualisation',
        'Gestion complète du projet',
        'Garantie décennale'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 5000,
        currency: '€',
        period: 'project',
        description: 'Prix variable selon la surface'
      },
      cta: {
        enabled: true,
        text: 'Demander un devis',
        link: '#contact',
        style: 'button'
      },
      featured: true,
      popular: true,
      category: 'renovation',
      tags: ['rénovation', 'maison', 'appartement']
    },
    {
      id: '2',
      title: 'Électricité',
      description: 'Installation et mise aux normes de vos équipements électriques en toute sécurité.',
      icon: '⚡',
      features: [
        'Diagnostic gratuit',
        'Mise aux normes NF C 15-100',
        'Installation domotique',
        'Dépannage 24/7'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 50,
        currency: '€',
        period: 'hour'
      },
      cta: {
        enabled: true,
        text: 'En savoir plus',
        link: '#electricite',
        style: 'link'
      },
      category: 'technique',
      tags: ['électricité', 'sécurité', 'domotique']
    },
    {
      id: '3',
      title: 'Plomberie',
      description: 'Installation, réparation et entretien de vos équipements sanitaires.',
      icon: '🔧',
      features: [
        'Intervention rapide',
        'Devis gratuit',
        'Matériel de qualité',
        'Garantie pièces et MO'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 45,
        currency: '€',
        period: 'hour'
      },
      cta: {
        enabled: true,
        text: 'Urgence plomberie',
        link: 'tel:0123456789',
        style: 'button'
      },
      availability: {
        status: 'available',
        message: 'Disponible 7j/7'
      },
      category: 'technique',
      tags: ['plomberie', 'sanitaire', 'urgence']
    },
    {
      id: '4',
      title: 'Peinture & Décoration',
      description: 'Embellissez vos espaces avec nos services de peinture et décoration professionnels.',
      icon: '🎨',
      features: [
        'Conseil couleurs',
        'Peintures écologiques',
        'Papiers peints',
        'Enduits décoratifs'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 25,
        currency: '€',
        period: 'hour',
        description: 'Fournitures en sus'
      },
      category: 'decoration',
      tags: ['peinture', 'décoration', 'design']
    },
    {
      id: '5',
      title: 'Menuiserie',
      description: 'Création et pose de menuiseries sur mesure pour vos intérieurs et extérieurs.',
      icon: '🪵',
      features: [
        'Sur mesure',
        'Bois certifié',
        'Isolation optimale',
        'Finitions soignées'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 500,
        currency: '€',
        period: 'project'
      },
      category: 'menuiserie',
      tags: ['menuiserie', 'bois', 'sur-mesure']
    },
    {
      id: '6',
      title: 'Carrelage & Sol',
      description: 'Pose de carrelage et revêtements de sol pour un intérieur élégant et durable.',
      icon: '🏗️',
      features: [
        'Large choix matériaux',
        'Pose traditionnelle',
        'Joints époxy',
        'Ragréage inclus'
      ],
      pricing: {
        enabled: true,
        startingAt: true,
        amount: 40,
        currency: '€',
        period: 'custom',
        customPeriod: 'm²'
      },
      category: 'sols',
      tags: ['carrelage', 'sol', 'revêtement']
    }
  ],
  
  layout: {
    columns: 3,
    gap: 'lg',
    containerWidth: 'normal',
    alignment: 'left'
  },
  
  display: {
    showIcon: true,
    iconSize: 'lg',
    iconStyle: 'filled',
    iconPosition: 'top',
    showImage: false,
    imagePosition: 'top',
    imageRatio: 'landscape',
    showFeatures: true,
    featuresStyle: 'list',
    maxFeatures: 4,
    showPricing: true,
    pricingStyle: 'simple',
    cardStyle: 'elevated',
    cardHover: 'lift',
    showBadges: true,
    highlightFeatured: true,
    animation: 'fade',
    animationDelay: 100,
    stagger: true
  },
  
  filtering: {
    enabled: true,
    categories: [
      { id: 'all', label: 'Tous', count: 6 },
      { id: 'renovation', label: 'Rénovation', count: 1 },
      { id: 'technique', label: 'Technique', count: 2 },
      { id: 'decoration', label: 'Décoration', count: 1 },
      { id: 'menuiserie', label: 'Menuiserie', count: 1 },
      { id: 'sols', label: 'Sols', count: 1 }
    ],
    defaultCategory: 'all',
    style: 'buttons',
    position: 'top',
    showAll: true,
    allLabel: 'Tous les services'
  },
  
  carousel: {
    enabled: false,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    showArrows: true,
    showDots: true,
    slidesPerView: 3,
    spacing: 24
  },
  
  process: {
    showStepNumbers: true,
    numberStyle: 'circle',
    connectorStyle: 'solid',
    orientation: 'vertical'
  },
  
  cta: {
    enabled: true,
    title: 'Vous ne trouvez pas le service recherché ?',
    description: 'Nous proposons bien d\'autres services. Contactez-nous pour en discuter.',
    buttonText: 'Demander un devis personnalisé',
    buttonLink: '#contact',
    buttonVariant: 'primary',
    position: 'bottom'
  },
  
  testimonials: {
    enabled: false,
    title: 'Ce que nos clients disent',
    items: []
  },
  
  styles: {
    padding: 'lg',
    borderRadius: 'lg',
    shadow: 'md'
  }
};

// Logger de validation
servicesDataSchema._parse = new Proxy(servicesDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('servicesDataSchema', 'parse', 'Validation des données Services', { 
      hasData: !!args[0],
      servicesCount: args[0]?.services?.length || 0
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('servicesDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('servicesDataSchema', 'parse', '✅ Validation réussie', {
        servicesCount: result.data.services.length,
        variant: result.data.variant
      });
    }
    
    return result;
  }
});
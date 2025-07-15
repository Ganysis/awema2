/**
 * Features Schema V3 - Validation complète avec Zod
 */

import { z } from 'zod';
import { imageSchema, colorSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour une feature individuelle
export const featureItemSchema = z.object({
  id: z.string().default(() => {
    const id = crypto.randomUUID();
    logger.debug('featureItemSchema', 'generate', `Génération ID feature: ${id}`);
    return id;
  }),
  
  title: z.string().min(1, 'Le titre est requis'),
  
  description: z.string().min(1, 'La description est requise'),
  
  icon: z.union([
    z.string(), // SVG ou classe d'icône
    z.object({
      type: z.enum(['svg', 'class', 'emoji', 'image']),
      value: z.string(),
      color: colorSchema.optional()
    })
  ]).optional(),
  
  image: imageSchema.optional(),
  
  badge: z.object({
    text: z.string(),
    color: z.enum(['primary', 'secondary', 'success', 'warning', 'error', 'info']).default('primary')
  }).optional(),
  
  link: z.object({
    url: z.string().default('#'),
    text: z.string().default('En savoir plus'),
    target: z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
    style: z.enum(['link', 'button', 'arrow']).default('link')
  }).optional(),
  
  category: z.string().optional(),
  
  highlight: z.boolean().default(false),
  
  stats: z.object({
    value: z.string(),
    label: z.string(),
    trend: z.enum(['up', 'down', 'stable']).optional()
  }).optional(),
  
  customData: z.record(z.any()).optional()
});

// Schema principal Features
export const featuresDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'grid-modern',
    'cards-hover',
    'timeline-vertical',
    'carousel-3d',
    'tabs-animated',
    'masonry-creative',
    'comparison-table',
    'flip-cards'
  ]).default('grid-modern').describe('Style visuel du bloc features'),
  
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
  
  // Layout
  layout: z.object({
    columns: z.number().min(1).max(6).default(3),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal')
  }).default({
    columns: 3,
    gap: 'md',
    alignment: 'center',
    containerWidth: 'normal'
  }),
  
  // Features
  features: z.array(featureItemSchema).min(1).default([
    {
      id: '1',
      title: 'Performance Optimale',
      description: 'Des sites web ultra-rapides optimisés pour une expérience utilisateur exceptionnelle.',
      icon: '⚡',
      highlight: true
    },
    {
      id: '2',
      title: 'Design Moderne',
      description: 'Interfaces élégantes et intuitives qui captivent vos visiteurs.',
      icon: '🎨',
      highlight: false
    },
    {
      id: '3',
      title: 'SEO Avancé',
      description: 'Optimisation complète pour un meilleur référencement sur les moteurs de recherche.',
      icon: '🔍',
      highlight: false
    }
  ]),
  
  // Options d'affichage
  display: z.object({
    showIcon: z.boolean().default(true),
    iconStyle: z.enum(['filled', 'outline', 'gradient', 'shadow', 'animated']).default('filled'),
    iconSize: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
    iconPosition: z.enum(['top', 'left', 'right']).default('top'),
    
    showImage: z.boolean().default(false),
    imageStyle: z.enum(['cover', 'contain', 'rounded', 'circle']).default('rounded'),
    imageRatio: z.enum(['1:1', '4:3', '16:9', '3:2']).default('16:9'),
    
    showBadge: z.boolean().default(false),
    showStats: z.boolean().default(false),
    showLink: z.boolean().default(true),
    showCategory: z.boolean().default(false),
    
    cardStyle: z.enum(['flat', 'elevated', 'outlined', 'glassmorphism', 'gradient']).default('elevated'),
    cardHover: z.enum(['none', 'lift', 'scale', 'glow', 'rotate']).default('lift'),
    
    animation: z.enum(['none', 'fade', 'slide', 'zoom', 'flip', 'bounce']).default('fade'),
    animationDelay: z.number().default(100),
    stagger: z.boolean().default(true)
  }).default({}),
  
  // Filtres et catégories
  filtering: z.object({
    enabled: z.boolean().default(false),
    categories: z.array(z.object({
      id: z.string(),
      label: z.string(),
      count: z.number().optional()
    })).default([]),
    defaultCategory: z.string().optional(),
    style: z.enum(['buttons', 'tabs', 'dropdown', 'tags']).default('buttons'),
    position: z.enum(['top', 'left', 'right']).default('top'),
    showAll: z.boolean().default(true),
    allLabel: z.string().default('Tous'),
    showCount: z.boolean().default(false)
  }).default({}),
  
  // Mode timeline
  timeline: z.object({
    enabled: z.boolean().default(false),
    lineStyle: z.enum(['solid', 'dashed', 'gradient']).default('solid'),
    linePosition: z.enum(['left', 'center', 'alternate']).default('center'),
    showDates: z.boolean().default(true),
    dateFormat: z.enum(['short', 'long', 'relative']).default('short')
  }).default({}),
  
  // Mode carousel
  carousel: z.object({
    enabled: z.boolean().default(false),
    autoplay: z.boolean().default(true),
    autoplayDelay: z.number().min(1000).max(10000).default(5000),
    loop: z.boolean().default(true),
    showDots: z.boolean().default(true),
    showArrows: z.boolean().default(true),
    slidesPerView: z.object({
      desktop: z.number().default(3),
      tablet: z.number().default(2),
      mobile: z.number().default(1)
    }).default({
      desktop: 3,
      tablet: 2,
      mobile: 1
    }),
    effect: z.enum(['slide', 'fade', 'cube', 'coverflow', 'flip']).default('slide'),
    gap: z.number().default(20)
  }).default({}),
  
  // Mode comparison
  comparison: z.object({
    enabled: z.boolean().default(false),
    headers: z.array(z.string()).default([]),
    showToggle: z.boolean().default(false),
    highlightBest: z.boolean().default(true),
    stickyHeader: z.boolean().default(true)
  }).default({}),
  
  // Call to action
  cta: z.object({
    enabled: z.boolean().default(false),
    text: z.string().default('Voir tous nos services'),
    link: z.string().default('#services'),
    variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
    position: z.enum(['bottom', 'top']).default('bottom')
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).default('lg'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type FeaturesData = z.infer<typeof featuresDataSchema>;

// Valeurs par défaut complètes
export const featuresDefaults: FeaturesData = {
  variant: 'grid-modern',
  title: 'Nos Services',
  subtitle: 'Des solutions adaptées à vos besoins',
  description: 'Découvrez comment nous pouvons vous aider à atteindre vos objectifs.',
  
  layout: {
    columns: 3,
    gap: 'md',
    alignment: 'center',
    containerWidth: 'normal'
  },
  
  features: [
    {
      id: '1',
      title: 'Développement Web',
      description: 'Sites web modernes et applications sur mesure avec les dernières technologies.',
      icon: {
        type: 'emoji',
        value: '💻'
      },
      highlight: true,
      category: 'development',
      link: {
        url: '#dev-web',
        text: 'En savoir plus',
        target: '_self',
        style: 'arrow'
      }
    },
    {
      id: '2',
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur intuitives et expériences engageantes pour vos utilisateurs.',
      icon: {
        type: 'emoji',
        value: '🎨'
      },
      highlight: false,
      category: 'design',
      link: {
        url: '#design',
        text: 'En savoir plus',
        target: '_self',
        style: 'arrow'
      }
    },
    {
      id: '3',
      title: 'SEO & Marketing',
      description: 'Stratégies de référencement et marketing digital pour booster votre visibilité.',
      icon: {
        type: 'emoji',
        value: '📈'
      },
      highlight: false,
      category: 'marketing',
      link: {
        url: '#seo',
        text: 'En savoir plus',
        target: '_self',
        style: 'arrow'
      }
    },
    {
      id: '4',
      title: 'E-commerce',
      description: 'Solutions e-commerce complètes pour vendre en ligne efficacement.',
      icon: {
        type: 'emoji',
        value: '🛒'
      },
      highlight: false,
      category: 'development',
      link: {
        url: '#ecommerce',
        text: 'En savoir plus',
        target: '_self',
        style: 'arrow'
      }
    },
    {
      id: '5',
      title: 'Applications Mobiles',
      description: 'Applications natives et hybrides pour iOS et Android.',
      icon: {
        type: 'emoji',
        value: '📱'
      },
      highlight: false,
      category: 'development',
      link: {
        url: '#mobile',
        text: 'En savoir plus',
        target: '_self',
        style: 'arrow'
      }
    },
    {
      id: '6',
      title: 'Consulting Digital',
      description: 'Conseils stratégiques pour votre transformation digitale.',
      icon: {
        type: 'emoji',
        value: '🚀'
      },
      highlight: false,
      category: 'consulting',
      link: {
        url: '#consulting',
        text: 'En savoir plus',
        target: '_self',
        style: 'arrow'
      }
    }
  ],
  
  display: {
    showIcon: true,
    iconStyle: 'gradient',
    iconSize: 'lg',
    iconPosition: 'top',
    showImage: false,
    imageStyle: 'rounded',
    imageRatio: '16:9',
    showBadge: false,
    showStats: false,
    showLink: true,
    showCategory: false,
    cardStyle: 'elevated',
    cardHover: 'lift',
    animation: 'fade',
    animationDelay: 100,
    stagger: true
  },
  
  filtering: {
    enabled: false,
    categories: [
      { id: 'all', label: 'Tous' },
      { id: 'development', label: 'Développement', count: 3 },
      { id: 'design', label: 'Design', count: 1 },
      { id: 'marketing', label: 'Marketing', count: 1 },
      { id: 'consulting', label: 'Consulting', count: 1 }
    ],
    defaultCategory: 'all',
    style: 'buttons',
    position: 'top',
    showAll: true,
    allLabel: 'Tous'
  },
  
  timeline: {
    enabled: false,
    lineStyle: 'solid',
    linePosition: 'center',
    showDates: true,
    dateFormat: 'short'
  },
  
  carousel: {
    enabled: false,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    showDots: true,
    showArrows: true,
    slidesPerView: {
      desktop: 3,
      tablet: 2,
      mobile: 1
    },
    effect: 'slide',
    gap: 20
  },
  
  comparison: {
    enabled: false,
    headers: [],
    showToggle: false,
    highlightBest: true,
    stickyHeader: true
  },
  
  cta: {
    enabled: false,
    text: 'Voir tous nos services',
    link: '#services',
    variant: 'primary',
    position: 'bottom'
  },
  
  styles: {
    padding: 'lg',
    borderRadius: 'lg',
    shadow: 'md'
  }
};

// Logger de validation
featuresDataSchema._parse = new Proxy(featuresDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('featuresDataSchema', 'parse', 'Validation des données Features', { 
      hasData: !!args[0],
      dataKeys: args[0] ? Object.keys(args[0]) : []
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('featuresDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('featuresDataSchema', 'parse', '✅ Validation réussie');
    }
    
    return result;
  }
});
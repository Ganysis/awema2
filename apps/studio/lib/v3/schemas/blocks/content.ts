/**
 * Content Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { colorSchema, imageSchema, buttonSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour un élément de timeline
export const timelineItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  date: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  image: imageSchema.optional(),
  link: z.object({
    text: z.string(),
    url: z.string()
  }).optional()
});

// Schema pour un accordion item
export const accordionItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  title: z.string(),
  content: z.string(),
  icon: z.string().optional(),
  open: z.boolean().default(false)
});

// Schema pour un tab
export const tabItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  label: z.string(),
  content: z.string(),
  icon: z.string().optional(),
  badge: z.string().optional()
});

// Schema pour une quote
export const quoteSchema = z.object({
  text: z.string(),
  author: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  image: imageSchema.optional(),
  rating: z.number().min(0).max(5).optional()
});

// Schema pour comparaison avant/après
export const beforeAfterSchema = z.object({
  before: z.object({
    image: imageSchema,
    label: z.string().default('Avant')
  }),
  after: z.object({
    image: imageSchema,
    label: z.string().default('Après')
  }),
  title: z.string().optional(),
  description: z.string().optional()
});

// Schema pour une statistique
export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: colorSchema.optional()
});

// Schema principal Content
export const contentDataSchema = z.object({
  // Type de contenu
  type: z.enum([
    'text-image',
    'timeline',
    'accordion',
    'tabs',
    'quote',
    'stats',
    'before-after',
    'process'
  ]).default('text-image').describe('Type de contenu à afficher'),
  
  // Configuration commune
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  
  // Contenu Text-Image
  textImage: z.object({
    layout: z.enum(['left', 'right', 'center', 'zigzag']).default('left'),
    content: z.string().default('Votre contenu ici...'),
    image: imageSchema.optional(),
    imageSize: z.enum(['small', 'medium', 'large', 'full']).default('medium'),
    imageStyle: z.enum(['rounded', 'circle', 'square', 'shadow']).default('rounded'),
    features: z.array(z.object({
      icon: z.string().optional(),
      text: z.string()
    })).optional(),
    cta: buttonSchema.optional()
  }).optional(),
  
  // Timeline
  timeline: z.object({
    style: z.enum(['vertical', 'horizontal', 'alternate', 'compact']).default('vertical'),
    items: z.array(timelineItemSchema).default([]),
    showConnector: z.boolean().default(true),
    connectorStyle: z.enum(['solid', 'dashed', 'dotted']).default('solid'),
    iconStyle: z.enum(['circle', 'square', 'custom']).default('circle'),
    animation: z.boolean().default(true)
  }).optional(),
  
  // Accordion
  accordion: z.object({
    style: z.enum(['simple', 'bordered', 'separated', 'filled']).default('simple'),
    items: z.array(accordionItemSchema).default([]),
    expandBehavior: z.enum(['single', 'multiple']).default('single'),
    showIcon: z.boolean().default(true),
    iconPosition: z.enum(['left', 'right']).default('right'),
    animation: z.enum(['none', 'slide', 'fade']).default('slide')
  }).optional(),
  
  // Tabs
  tabs: z.object({
    style: z.enum(['line', 'enclosed', 'pills', 'vertical']).default('line'),
    items: z.array(tabItemSchema).default([]),
    alignment: z.enum(['left', 'center', 'right', 'justified']).default('left'),
    animation: z.enum(['none', 'fade', 'slide']).default('fade'),
    showIcons: z.boolean().default(false),
    showBadges: z.boolean().default(false)
  }).optional(),
  
  // Quote
  quote: z.object({
    style: z.enum(['simple', 'bordered', 'card', 'testimonial']).default('simple'),
    data: quoteSchema,
    showQuoteIcon: z.boolean().default(true),
    quoteIconStyle: z.enum(['classic', 'modern', 'minimal']).default('classic'),
    alignment: z.enum(['left', 'center', 'right']).default('center')
  }).optional(),
  
  // Stats
  stats: z.object({
    style: z.enum(['simple', 'cards', 'circular', 'progress']).default('simple'),
    items: z.array(statSchema).default([]),
    columns: z.number().min(1).max(6).default(3),
    animation: z.boolean().default(true),
    countUp: z.boolean().default(true),
    showIcons: z.boolean().default(true)
  }).optional(),
  
  // Before/After
  beforeAfter: z.object({
    style: z.enum(['slider', 'toggle', 'side-by-side', 'overlay']).default('slider'),
    data: beforeAfterSchema,
    sliderPosition: z.number().min(0).max(100).default(50),
    orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
    showLabels: z.boolean().default(true)
  }).optional(),
  
  // Process
  process: z.object({
    style: z.enum(['steps', 'arrows', 'circles', 'cards']).default('steps'),
    items: z.array(z.object({
      number: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: imageSchema.optional()
    })).default([]),
    orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
    showConnectors: z.boolean().default(true),
    numberStyle: z.enum(['circle', 'square', 'custom']).default('circle')
  }).optional(),
  
  // Layout
  layout: z.object({
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    gap: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
    alignment: z.enum(['left', 'center', 'right']).default('left')
  }).default({}),
  
  // Animations
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'scale', 'rotate']).default('fade'),
    duration: z.number().default(600),
    stagger: z.boolean().default(true),
    staggerDelay: z.number().default(100)
  }).default({}),
  
  // Background
  background: z.object({
    type: z.enum(['none', 'color', 'gradient', 'pattern', 'image']).default('none'),
    color: colorSchema.optional(),
    gradient: z.object({
      from: colorSchema,
      to: colorSchema,
      angle: z.number().default(135)
    }).optional(),
    pattern: z.object({
      type: z.enum(['dots', 'lines', 'grid']).default('dots'),
      color: colorSchema.optional(),
      opacity: z.number().min(0).max(1).default(0.1)
    }).optional(),
    image: imageSchema.optional()
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    textColor: colorSchema.optional(),
    headingColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('none')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type ContentData = z.infer<typeof contentDataSchema>;

// Valeurs par défaut complètes
export const contentDefaults: ContentData = {
  type: 'text-image',
  title: 'Notre Expertise',
  subtitle: 'Des années d\'expérience à votre service',
  description: 'Découvrez comment nous pouvons transformer vos projets en réalité.',
  
  textImage: {
    layout: 'left',
    content: `Avec plus de 10 ans d'expérience dans le domaine, nous sommes votre partenaire de confiance pour tous vos projets de rénovation et de construction.

Notre équipe d'experts qualifiés met tout en œuvre pour garantir la qualité et la satisfaction de nos clients. Nous utilisons les meilleures techniques et matériaux pour assurer la durabilité de nos réalisations.`,
    image: {
      src: '/images/expertise.jpg',
      alt: 'Notre équipe d\'experts'
    },
    imageSize: 'medium',
    imageStyle: 'rounded',
    features: [
      { icon: '✓', text: 'Devis gratuit et détaillé' },
      { icon: '✓', text: 'Garantie décennale' },
      { icon: '✓', text: 'Respect des délais' },
      { icon: '✓', text: 'Matériaux de qualité' }
    ],
    cta: {
      text: 'En savoir plus',
      link: '#about',
      variant: 'primary',
      size: 'md'
    }
  },
  
  timeline: {
    style: 'vertical',
    items: [
      {
        id: '1',
        date: '2010',
        title: 'Création de l\'entreprise',
        description: 'Début de notre aventure avec une équipe passionnée',
        icon: '🚀'
      },
      {
        id: '2',
        date: '2015',
        title: 'Expansion régionale',
        description: 'Ouverture de nouvelles agences pour mieux vous servir',
        icon: '📈'
      },
      {
        id: '3',
        date: '2020',
        title: 'Certification qualité',
        description: 'Obtention des certifications ISO 9001 et RGE',
        icon: '🏆'
      }
    ],
    showConnector: true,
    connectorStyle: 'solid',
    iconStyle: 'circle',
    animation: true
  },
  
  accordion: {
    style: 'simple',
    items: [],
    expandBehavior: 'single',
    showIcon: true,
    iconPosition: 'right',
    animation: 'slide'
  },
  
  tabs: {
    style: 'line',
    items: [],
    alignment: 'left',
    animation: 'fade',
    showIcons: false,
    showBadges: false
  },
  
  quote: {
    style: 'simple',
    data: {
      text: 'La qualité n\'est jamais un accident. C\'est toujours le résultat d\'un effort intelligent.',
      author: 'John Ruskin',
      role: 'Écrivain et critique d\'art'
    },
    showQuoteIcon: true,
    quoteIconStyle: 'classic',
    alignment: 'center'
  },
  
  stats: {
    style: 'simple',
    items: [],
    columns: 3,
    animation: true,
    countUp: true,
    showIcons: true
  },
  
  beforeAfter: {
    style: 'slider',
    data: {
      before: {
        image: { src: '/images/before.jpg', alt: 'Avant travaux' },
        label: 'Avant'
      },
      after: {
        image: { src: '/images/after.jpg', alt: 'Après travaux' },
        label: 'Après'
      }
    },
    sliderPosition: 50,
    orientation: 'horizontal',
    showLabels: true
  },
  
  process: {
    style: 'steps',
    items: [],
    orientation: 'horizontal',
    showConnectors: true,
    numberStyle: 'circle'
  },
  
  layout: {
    containerWidth: 'normal',
    padding: 'lg',
    gap: 'md',
    alignment: 'left'
  },
  
  animation: {
    enabled: true,
    type: 'fade',
    duration: 600,
    stagger: true,
    staggerDelay: 100
  },
  
  background: {
    type: 'none'
  },
  
  styles: {
    borderRadius: 'md',
    shadow: 'none'
  }
};

// Logger de validation
contentDataSchema._parse = new Proxy(contentDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('contentDataSchema', 'parse', 'Validation des données Content', { 
      hasData: !!args[0],
      type: args[0]?.type
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('contentDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('contentDataSchema', 'parse', '✅ Validation réussie', {
        type: result.data.type,
        hasAnimation: result.data.animation.enabled
      });
    }
    
    return result;
  }
});
/**
 * CTA Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { buttonSchema, colorSchema, imageSchema } from '../common';
import { logger } from '../../core/logger';

// Schema principal CTA
export const ctaDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'simple-centered',
    'split-image',
    'gradient-wave',
    'glassmorphism',
    'floating-cards',
    'diagonal-split',
    'video-background',
    'animated-particles'
  ]).default('simple-centered').describe('Style visuel du bloc CTA'),
  
  // Configuration du titre
  title: z.string().default('Prêt à démarrer votre projet ?'),
  
  subtitle: z.string().optional(),
  
  description: z.string().optional(),
  
  // Mise en évidence du texte
  highlight: z.object({
    enabled: z.boolean().default(false),
    text: z.string().optional(),
    style: z.enum(['underline', 'background', 'gradient', 'animated']).default('gradient')
  }).default({}),
  
  // Boutons CTA
  buttons: z.object({
    primary: buttonSchema.extend({
      icon: z.string().optional(),
      iconPosition: z.enum(['left', 'right']).default('right')
    }),
    secondary: buttonSchema.extend({
      icon: z.string().optional(),
      iconPosition: z.enum(['left', 'right']).default('right')
    }).optional()
  }).default({
    primary: {
      text: 'Contactez-nous',
      link: '#contact',
      variant: 'primary',
      size: 'lg'
    }
  }),
  
  // Image/Media
  media: z.object({
    type: z.enum(['none', 'image', 'video', 'lottie', 'svg']).default('none'),
    image: imageSchema.optional(),
    video: z.object({
      url: z.string().url(),
      poster: z.string().optional(),
      autoplay: z.boolean().default(true),
      loop: z.boolean().default(true),
      muted: z.boolean().default(true)
    }).optional(),
    lottie: z.object({
      url: z.string().url(),
      autoplay: z.boolean().default(true),
      loop: z.boolean().default(true)
    }).optional(),
    position: z.enum(['left', 'right', 'background', 'top', 'bottom']).default('right'),
    size: z.enum(['small', 'medium', 'large', 'full']).default('medium'),
    animation: z.enum(['none', 'float', 'pulse', 'rotate', 'scale']).default('none')
  }).default({}),
  
  // Statistiques
  stats: z.object({
    enabled: z.boolean().default(false),
    items: z.array(z.object({
      value: z.string(),
      label: z.string(),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
      icon: z.string().optional(),
      animate: z.boolean().default(true)
    })).default([
      { value: '500', label: 'Clients satisfaits', prefix: '+', animate: true },
      { value: '98', label: 'Taux de satisfaction', suffix: '%', animate: true },
      { value: '10', label: "Années d'expérience", prefix: '+', animate: true }
    ]),
    layout: z.enum(['row', 'grid', 'cards']).default('row'),
    style: z.enum(['simple', 'boxed', 'circular']).default('simple'),
    position: z.enum(['top', 'bottom', 'left', 'right']).optional()
  }).default({}),
  
  // Badges/Trust indicators
  badges: z.object({
    enabled: z.boolean().default(false),
    items: z.array(z.object({
      type: z.enum(['text', 'image', 'icon']),
      content: z.string(),
      alt: z.string().optional()
    })).default([]),
    position: z.enum(['top', 'bottom', 'inline']).default('bottom'),
    style: z.enum(['simple', 'outlined', 'filled']).default('simple')
  }).default({}),
  
  // Timer/Urgency
  urgency: z.object({
    enabled: z.boolean().default(false),
    type: z.enum(['countdown', 'limited-spots', 'deadline', 'flash-sale']).default('countdown'),
    countdown: z.object({
      endDate: z.string(), // ISO date
      labels: z.object({
        days: z.string().default('Jours'),
        hours: z.string().default('Heures'),
        minutes: z.string().default('Minutes'),
        seconds: z.string().default('Secondes')
      }).default({}),
      expiredMessage: z.string().default("L'offre est terminée"),
      style: z.enum(['boxes', 'inline', 'circular']).default('boxes')
    }).optional(),
    limitedSpots: z.object({
      total: z.number(),
      remaining: z.number(),
      message: z.string().default('Plus que {remaining} places disponibles')
    }).optional(),
    deadline: z.object({
      date: z.string(),
      message: z.string().default('Offre valable jusqu\'au {date}')
    }).optional()
  }).default({}),
  
  // Layout
  layout: z.object({
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    contentWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
    spacing: z.enum(['compact', 'normal', 'relaxed', 'spacious']).default('normal'),
    containerPadding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg')
  }).default({}),
  
  // Animations
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'scale', 'rotate', 'bounce']).default('fade'),
    duration: z.number().default(600),
    delay: z.number().default(0),
    stagger: z.boolean().default(true),
    onScroll: z.boolean().default(true)
  }).default({}),
  
  // Background effects
  background: z.object({
    type: z.enum(['color', 'gradient', 'pattern', 'image', 'video', 'animated']).default('gradient'),
    color: colorSchema.optional(),
    gradient: z.object({
      type: z.enum(['linear', 'radial', 'conic']).default('linear'),
      angle: z.number().default(135),
      colors: z.array(colorSchema).default(['#3b82f6', '#8b5cf6']),
      animate: z.boolean().default(false)
    }).optional(),
    pattern: z.object({
      type: z.enum(['dots', 'grid', 'waves', 'zigzag', 'circles']).default('dots'),
      color: colorSchema.optional(),
      opacity: z.number().min(0).max(1).default(0.1),
      size: z.enum(['sm', 'md', 'lg']).default('md')
    }).optional(),
    image: imageSchema.optional(),
    overlay: z.object({
      enabled: z.boolean().default(true),
      color: colorSchema.default('#000000'),
      opacity: z.number().min(0).max(1).default(0.5)
    }).optional(),
    blur: z.number().min(0).max(20).default(0),
    particles: z.object({
      enabled: z.boolean().default(false),
      count: z.number().default(50),
      color: colorSchema.default('#ffffff'),
      shape: z.enum(['circle', 'square', 'triangle', 'star']).default('circle'),
      speed: z.number().default(1)
    }).optional()
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    buttonRadius: z.enum(['none', 'sm', 'md', 'lg', 'full']).default('md'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    textShadow: z.boolean().default(false),
    glassmorphism: z.object({
      enabled: z.boolean().default(false),
      blur: z.number().default(10),
      opacity: z.number().default(0.7)
    }).default({})
  }).default({})
});

// Type TypeScript dérivé du schéma
export type CTAData = z.infer<typeof ctaDataSchema>;

// Valeurs par défaut complètes
export const ctaDefaults: CTAData = {
  variant: 'simple-centered',
  title: 'Prêt à transformer vos idées en réalité ?',
  subtitle: 'Contactez-nous dès aujourd\'hui',
  description: 'Notre équipe d\'experts est là pour vous accompagner dans tous vos projets.',
  
  highlight: {
    enabled: true,
    text: 'transformer vos idées',
    style: 'gradient'
  },
  
  buttons: {
    primary: {
      text: 'Demander un devis gratuit',
      link: '#contact',
      variant: 'primary',
      size: 'lg',
      icon: '→',
      iconPosition: 'right'
    },
    secondary: {
      text: 'Voir nos réalisations',
      link: '#portfolio',
      variant: 'outline',
      size: 'lg'
    }
  },
  
  media: {
    type: 'none',
    position: 'right',
    size: 'medium',
    animation: 'none'
  },
  
  stats: {
    enabled: true,
    items: [
      { value: '500', label: 'Clients satisfaits', prefix: '+', animate: true },
      { value: '98', label: 'Taux de satisfaction', suffix: '%', animate: true },
      { value: '10', label: "Années d'expérience", prefix: '+', animate: true }
    ],
    layout: 'row',
    style: 'simple'
  },
  
  badges: {
    enabled: false,
    items: [],
    position: 'bottom',
    style: 'simple'
  },
  
  urgency: {
    enabled: false,
    type: 'countdown'
  },
  
  layout: {
    alignment: 'center',
    contentWidth: 'normal',
    spacing: 'normal',
    containerPadding: 'lg'
  },
  
  animation: {
    enabled: true,
    type: 'fade',
    duration: 600,
    delay: 0,
    stagger: true,
    onScroll: true
  },
  
  background: {
    type: 'gradient',
    gradient: {
      type: 'linear',
      angle: 135,
      colors: ['#3b82f6', '#8b5cf6'],
      animate: false
    }
  },
  
  styles: {
    buttonRadius: 'md',
    shadow: 'lg',
    textShadow: false,
    glassmorphism: {
      enabled: false,
      blur: 10,
      opacity: 0.7
    }
  }
};

// Logger de validation
ctaDataSchema._parse = new Proxy(ctaDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('ctaDataSchema', 'parse', 'Validation des données CTA', { 
      hasData: !!args[0],
      variant: args[0]?.variant
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('ctaDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('ctaDataSchema', 'parse', '✅ Validation réussie', {
        variant: result.data.variant,
        hasStats: result.data.stats.enabled,
        hasUrgency: result.data.urgency.enabled
      });
    }
    
    return result;
  }
});
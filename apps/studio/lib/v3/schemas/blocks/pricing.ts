/**
 * Pricing Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { buttonSchema, colorSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour une feature de pricing
export const pricingFeatureSchema = z.object({
  text: z.string().min(1, 'Le texte est requis'),
  included: z.boolean().default(true),
  tooltip: z.string().optional(),
  icon: z.string().optional(),
  highlight: z.boolean().default(false)
});

// Schema pour un plan de pricing
export const pricingPlanSchema = z.object({
  id: z.string().default(() => {
    const id = crypto.randomUUID();
    logger.debug('pricingPlanSchema', 'generate', `Génération ID plan: ${id}`);
    return id;
  }),
  
  name: z.string().min(1, 'Le nom du plan est requis'),
  
  description: z.string().optional(),
  
  price: z.object({
    amount: z.number().min(0),
    currency: z.string().default('€'),
    period: z.enum(['month', 'year', 'once', 'custom']).default('month'),
    customPeriod: z.string().optional(),
    originalPrice: z.number().optional(), // Prix barré
    discount: z.object({
      percentage: z.number().min(0).max(100),
      label: z.string().optional()
    }).optional()
  }),
  
  badge: z.object({
    text: z.string(),
    color: z.enum(['primary', 'secondary', 'success', 'warning', 'error']).default('primary'),
    position: z.enum(['top', 'inline']).default('top')
  }).optional(),
  
  features: z.array(pricingFeatureSchema).default([]),
  
  cta: buttonSchema.extend({
    fullWidth: z.boolean().default(true)
  }),
  
  recommended: z.boolean().default(false),
  
  popular: z.boolean().default(false),
  
  customData: z.record(z.any()).optional(),
  
  order: z.number().optional()
});

// Schema principal Pricing
export const pricingDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'cards-classic',
    'cards-modern',
    'table-comparison',
    'cards-gradient',
    'cards-glassmorphism',
    'toggle-monthly-yearly',
    'slider-interactive',
    'cards-minimal'
  ]).default('cards-modern').describe('Style visuel du bloc pricing'),
  
  // Configuration du titre
  title: z.string().default('Nos Tarifs'),
  
  subtitle: z.string().optional(),
  
  description: z.string().optional(),
  
  // Plans
  plans: z.array(pricingPlanSchema).min(1).max(5).default([
    {
      id: '1',
      name: 'Starter',
      description: 'Parfait pour démarrer',
      price: {
        amount: 29,
        currency: '€',
        period: 'month'
      },
      features: [
        { text: '1 site web', included: true },
        { text: 'Hébergement inclus', included: true },
        { text: 'Support par email', included: true },
        { text: 'SSL gratuit', included: true },
        { text: 'Personnalisation avancée', included: false },
        { text: 'Support prioritaire', included: false }
      ],
      cta: {
        text: 'Commencer',
        link: '#',
        variant: 'outline',
        fullWidth: true
      },
      recommended: false,
      popular: false
    },
    {
      id: '2',
      name: 'Pro',
      description: 'Pour les professionnels',
      price: {
        amount: 59,
        currency: '€',
        period: 'month',
        originalPrice: 79
      },
      badge: {
        text: 'Plus populaire',
        color: 'primary',
        position: 'top'
      },
      features: [
        { text: '3 sites web', included: true },
        { text: 'Hébergement premium', included: true },
        { text: 'Support prioritaire', included: true },
        { text: 'SSL gratuit', included: true },
        { text: 'Personnalisation avancée', included: true },
        { text: 'Analytics avancés', included: true }
      ],
      cta: {
        text: 'Choisir Pro',
        link: '#',
        variant: 'primary',
        fullWidth: true
      },
      recommended: true,
      popular: true
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'Solutions sur mesure',
      price: {
        amount: 199,
        currency: '€',
        period: 'month'
      },
      features: [
        { text: 'Sites illimités', included: true },
        { text: 'Infrastructure dédiée', included: true },
        { text: 'Support 24/7', included: true },
        { text: 'SSL gratuit', included: true },
        { text: 'Personnalisation complète', included: true },
        { text: 'API access', included: true }
      ],
      cta: {
        text: 'Nous contacter',
        link: '#contact',
        variant: 'secondary',
        fullWidth: true
      },
      recommended: false,
      popular: false
    }
  ]),
  
  // Layout
  layout: z.object({
    columns: z.number().min(1).max(4).default(3),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
    alignment: z.enum(['top', 'center', 'bottom']).default('top'),
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
    equalHeight: z.boolean().default(true)
  }).default({}),
  
  // Options d'affichage
  display: z.object({
    showCurrency: z.boolean().default(true),
    currencyPosition: z.enum(['before', 'after', 'superscript']).default('before'),
    
    showPeriod: z.boolean().default(true),
    periodFormat: z.enum(['full', 'short', 'slash']).default('full'),
    
    showOriginalPrice: z.boolean().default(true),
    showDiscount: z.boolean().default(true),
    
    featureStyle: z.enum(['list', 'checklist', 'table', 'grid']).default('checklist'),
    featureIcon: z.enum(['check', 'arrow', 'star', 'custom']).default('check'),
    showFeatureTooltips: z.boolean().default(false),
    
    cardStyle: z.enum(['flat', 'elevated', 'outlined', 'gradient', 'glassmorphism']).default('elevated'),
    cardHover: z.enum(['none', 'lift', 'scale', 'glow', 'highlight']).default('lift'),
    
    highlightRecommended: z.boolean().default(true),
    recommendedScale: z.number().default(1.05),
    
    animation: z.enum(['none', 'fade', 'slide', 'scale', 'flip']).default('fade'),
    animationDelay: z.number().default(100),
    stagger: z.boolean().default(true)
  }).default({}),
  
  // Toggle période
  periodToggle: z.object({
    enabled: z.boolean().default(false),
    defaultPeriod: z.enum(['month', 'year']).default('month'),
    monthlyLabel: z.string().default('Mensuel'),
    yearlyLabel: z.string().default('Annuel'),
    yearlyDiscount: z.number().default(20),
    discountBadge: z.string().default('Économisez {discount}%'),
    position: z.enum(['top', 'bottom', 'integrated']).default('top'),
    style: z.enum(['toggle', 'tabs', 'buttons']).default('toggle')
  }).default({}),
  
  // Comparaison
  comparison: z.object({
    enabled: z.boolean().default(false),
    features: z.array(z.object({
      category: z.string().optional(),
      name: z.string(),
      description: z.string().optional(),
      plans: z.record(z.union([
        z.boolean(),
        z.string(),
        z.object({
          value: z.union([z.boolean(), z.string()]),
          tooltip: z.string().optional()
        })
      ]))
    })).default([]),
    stickyHeader: z.boolean().default(true),
    highlightDifferences: z.boolean().default(true),
    expandableRows: z.boolean().default(false)
  }).default({}),
  
  // FAQ section
  faq: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Questions sur nos tarifs'),
    items: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([]),
    position: z.enum(['bottom', 'side']).default('bottom')
  }).default({}),
  
  // Garanties
  guarantees: z.object({
    enabled: z.boolean().default(false),
    items: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string()
    })).default([
      {
        icon: '🔒',
        title: 'Paiement sécurisé',
        description: 'Transactions 100% sécurisées'
      },
      {
        icon: '⏰',
        title: '30 jours d\'essai',
        description: 'Satisfait ou remboursé'
      },
      {
        icon: '🚫',
        title: 'Sans engagement',
        description: 'Annulez à tout moment'
      }
    ]),
    position: z.enum(['top', 'bottom']).default('bottom'),
    style: z.enum(['inline', 'cards', 'banner']).default('inline')
  }).default({}),
  
  // Call to action global
  cta: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Besoin d\'une solution personnalisée ?'),
    description: z.string().default('Contactez-nous pour discuter de vos besoins spécifiques'),
    buttonText: z.string().default('Parlons de votre projet'),
    buttonLink: z.string().default('#contact'),
    buttonVariant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
    position: z.enum(['bottom', 'top']).default('bottom'),
    style: z.enum(['simple', 'card', 'banner']).default('card')
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type PricingData = z.infer<typeof pricingDataSchema>;

// Valeurs par défaut complètes
export const pricingDefaults: PricingData = {
  variant: 'cards-modern',
  title: 'Choisissez votre plan',
  subtitle: 'Des tarifs transparents et adaptés à vos besoins',
  description: 'Tous nos plans incluent l\'hébergement, le SSL et le support technique.',
  
  plans: [
    {
      id: '1',
      name: 'Starter',
      description: 'Idéal pour commencer',
      price: {
        amount: 297,
        currency: '€',
        period: 'once'
      },
      features: [
        { text: 'Site web one-page', included: true },
        { text: 'Design personnalisé', included: true },
        { text: 'Mobile responsive', included: true },
        { text: 'Hébergement 1 an inclus', included: true },
        { text: 'Certificat SSL', included: true },
        { text: 'Support par email', included: true },
        { text: 'Formation incluse', included: false },
        { text: 'Modifications illimitées', included: false }
      ],
      cta: {
        text: 'Démarrer',
        link: '#contact',
        variant: 'outline',
        size: 'md',
        fullWidth: true
      },
      recommended: false,
      popular: false
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Notre best-seller',
      price: {
        amount: 597,
        currency: '€',
        period: 'once',
        originalPrice: 797,
        discount: {
          percentage: 25,
          label: 'Offre limitée'
        }
      },
      badge: {
        text: 'Recommandé',
        color: 'primary',
        position: 'top'
      },
      features: [
        { text: 'Site web multi-pages', included: true, highlight: true },
        { text: 'Design sur mesure', included: true },
        { text: 'Mobile responsive', included: true },
        { text: 'Hébergement 2 ans inclus', included: true, highlight: true },
        { text: 'Certificat SSL', included: true },
        { text: 'Support prioritaire', included: true },
        { text: 'Formation complète', included: true, highlight: true },
        { text: '3 mois de modifications', included: true }
      ],
      cta: {
        text: 'Choisir ce plan',
        link: '#contact',
        variant: 'primary',
        size: 'lg',
        fullWidth: true
      },
      recommended: true,
      popular: true
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'Solutions avancées',
      price: {
        amount: 997,
        currency: '€',
        period: 'once'
      },
      features: [
        { text: 'Site web sur mesure', included: true },
        { text: 'Design premium', included: true },
        { text: 'Mobile responsive', included: true },
        { text: 'Hébergement 3 ans inclus', included: true },
        { text: 'Certificat SSL', included: true },
        { text: 'Support 24/7', included: true, highlight: true },
        { text: 'Formation + documentation', included: true },
        { text: 'Modifications illimitées 1 an', included: true, highlight: true }
      ],
      cta: {
        text: 'Contactez-nous',
        link: '#contact',
        variant: 'secondary',
        size: 'md',
        fullWidth: true
      },
      recommended: false,
      popular: false
    }
  ],
  
  layout: {
    columns: 3,
    gap: 'lg',
    alignment: 'top',
    containerWidth: 'normal',
    equalHeight: true
  },
  
  display: {
    showCurrency: true,
    currencyPosition: 'after',
    showPeriod: true,
    periodFormat: 'full',
    showOriginalPrice: true,
    showDiscount: true,
    featureStyle: 'checklist',
    featureIcon: 'check',
    showFeatureTooltips: false,
    cardStyle: 'elevated',
    cardHover: 'lift',
    highlightRecommended: true,
    recommendedScale: 1.05,
    animation: 'fade',
    animationDelay: 100,
    stagger: true
  },
  
  periodToggle: {
    enabled: false,
    defaultPeriod: 'month',
    monthlyLabel: 'Mensuel',
    yearlyLabel: 'Annuel',
    yearlyDiscount: 20,
    discountBadge: 'Économisez {discount}%',
    position: 'top',
    style: 'toggle'
  },
  
  comparison: {
    enabled: false,
    features: [],
    stickyHeader: true,
    highlightDifferences: true,
    expandableRows: false
  },
  
  faq: {
    enabled: false,
    title: 'Questions sur nos tarifs',
    items: [],
    position: 'bottom'
  },
  
  guarantees: {
    enabled: true,
    items: [
      {
        icon: '✨',
        title: 'Qualité garantie',
        description: 'Satisfaction 100% garantie'
      },
      {
        icon: '🔒',
        title: 'Paiement sécurisé',
        description: 'Transactions cryptées SSL'
      },
      {
        icon: '🚀',
        title: 'Livraison rapide',
        description: 'Site en ligne en 2-4 semaines'
      }
    ],
    position: 'bottom',
    style: 'inline'
  },
  
  cta: {
    enabled: true,
    title: 'Besoin d\'un devis personnalisé ?',
    description: 'Chaque projet est unique. Parlons de vos besoins spécifiques.',
    buttonText: 'Demander un devis',
    buttonLink: '#contact',
    buttonVariant: 'primary',
    position: 'bottom',
    style: 'card'
  },
  
  styles: {
    padding: 'lg',
    borderRadius: 'lg',
    shadow: 'lg'
  }
};

// Logger de validation
pricingDataSchema._parse = new Proxy(pricingDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('pricingDataSchema', 'parse', 'Validation des données Pricing', { 
      hasData: !!args[0],
      plansCount: args[0]?.plans?.length || 0
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('pricingDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('pricingDataSchema', 'parse', '✅ Validation réussie', {
        plansCount: result.data.plans.length,
        variant: result.data.variant
      });
    }
    
    return result;
  }
});
/**
 * Pricing Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';

// Schema pour un plan tarifaire
export const pricingPlanSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  price: z.number().min(0),
  yearlyPrice: z.number().min(0).optional(),
  currency: z.string().default('€'),
  period: z.enum(['month', 'year', 'one-time']).default('month'),
  
  features: z.array(z.string()).min(1).max(20),
  limitations: z.array(z.string()).optional(),
  
  featured: z.boolean().default(false),
  popular: z.boolean().default(false),
  
  ctaText: z.string().max(50).default('Commencer'),
  ctaLink: z.string().default('#'),
  ctaStyle: z.enum(['primary', 'secondary', 'outline']).default('primary'),
  
  badge: z.object({
    text: z.string().max(30),
    color: z.string().optional()
  }).optional(),
  
  customData: z.record(z.any()).optional()
});

// Schema principal Pricing
export const pricingDataSchema = z.object({
  // Variante visuelle
  variant: z.enum([
    'cards-modern',       // Cartes modernes avec hover
    'table-comparison',   // Tableau comparatif
    'slider-interactive', // Curseur interactif
    'cards-flip',        // Cartes retournables
    'timeline',          // Chronologie de prix
    'grid-bento',        // Style Bento Box
    'gradient-wave',     // Vagues gradient
    'neumorphic'         // Style neumorphique
  ]).default('cards-modern'),

  // Contenu principal
  title: z.string().min(1).max(100).default('Choisissez votre plan'),
  subtitle: z.string().max(200).optional(),
  
  // Plans tarifaires
  plans: z.array(pricingPlanSchema).min(1).max(6).default([
    {
      name: 'Starter',
      description: 'Parfait pour commencer',
      price: 19,
      yearlyPrice: 190,
      features: [
        '1 site web',
        'Domaine personnalisé',
        'SSL gratuit',
        'Support par email',
        'Statistiques de base'
      ],
      ctaText: 'Commencer'
    },
    {
      name: 'Pro',
      description: 'Pour les professionnels',
      price: 39,
      yearlyPrice: 390,
      featured: true,
      popular: true,
      features: [
        '5 sites web',
        'Domaines illimités',
        'SSL gratuit',
        'Support prioritaire',
        'Statistiques avancées',
        'Sauvegarde automatique',
        'API access'
      ],
      ctaText: 'Essai gratuit'
    },
    {
      name: 'Enterprise',
      description: 'Solutions sur mesure',
      price: 99,
      yearlyPrice: 990,
      features: [
        'Sites illimités',
        'Infrastructure dédiée',
        'SSL premium',
        'Support 24/7',
        'Analytics complet',
        'Backup temps réel',
        'API illimitée',
        'Formation équipe'
      ],
      ctaText: 'Nous contacter'
    }
  ]),
  
  // Options d'affichage
  showToggle: z.boolean().default(true),
  defaultPeriod: z.enum(['monthly', 'yearly']).default('monthly'),
  yearlyDiscount: z.number().min(0).max(50).optional(),
  
  // Currency
  currency: z.string().default('€'),
  currencyOptions: z.array(z.string()).optional(),
  
  // Comparison features (pour table)
  comparisonFeatures: z.array(z.object({
    category: z.string(),
    features: z.array(z.string())
  })).optional(),
  
  // Slider options (pour slider-interactive)
  sliderConfig: z.object({
    min: z.number().default(1),
    max: z.number().default(100),
    step: z.number().default(1),
    default: z.number().default(10),
    label: z.string().default('Utilisateurs'),
    basePrice: z.number().default(0),
    pricePerUnit: z.number().default(5)
  }).optional(),
  
  // Animation
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'scale', 'flip']).default('fade'),
    duration: z.number().min(0.1).max(2).default(0.6),
    stagger: z.boolean().default(true),
    hover: z.enum(['none', 'lift', 'glow', 'scale']).default('lift')
  }).optional(),
  
  // Layout
  layout: z.object({
    columns: z.enum(['1', '2', '3', '4', 'auto']).default('3'),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
    alignment: z.enum(['start', 'center', 'end', 'stretch']).default('stretch')
  }).optional(),
  
  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      accent: z.string().optional(),
      text: z.string().optional(),
      background: z.string().optional(),
      featured: z.string().optional()
    }).optional(),
    typography: z.object({
      titleSize: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      priceSize: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      fontFamily: z.string().optional()
    }).optional(),
    borders: z.object({
      style: z.enum(['none', 'solid', 'gradient']).optional(),
      radius: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).optional(),
      width: z.enum(['thin', 'medium', 'thick']).optional()
    }).optional(),
    shadows: z.object({
      card: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
      hover: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional()
    }).optional()
  }).optional(),
  
  // Call to Action global
  globalCta: z.object({
    enabled: z.boolean().default(false),
    text: z.string().max(200),
    buttonText: z.string().max(50),
    buttonLink: z.string(),
    position: z.enum(['top', 'bottom']).default('bottom')
  }).optional(),
  
  // Garanties
  guarantees: z.array(z.object({
    icon: z.string(),
    text: z.string().max(100)
  })).optional(),
  
  // FAQ courte
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).max(5).optional(),
  
  // Schema.org
  seo: z.object({
    schemaEnabled: z.boolean().default(true),
    priceRange: z.string().optional()
  }).optional(),
  
  // ID personnalisé
  id: z.string().optional()

}).strict();

export type PricingData = z.infer<typeof pricingDataSchema>;

// Valeurs par défaut
export const pricingDefaults: PricingData = {
  variant: 'cards-modern',
  title: 'Des tarifs simples et transparents',
  subtitle: 'Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.',
  plans: [
    {
      name: 'Starter',
      description: 'Idéal pour débuter',
      price: 19,
      yearlyPrice: 190,
      currency: '€',
      period: 'month',
      features: [
        '1 site web professionnel',
        'Domaine personnalisé inclus',
        'Certificat SSL gratuit',
        'Hébergement ultra-rapide',
        'Support par email',
        'Mises à jour automatiques'
      ],
      featured: false,
      popular: false,
      ctaText: 'Commencer',
      ctaLink: '#starter',
      ctaStyle: 'primary'
    },
    {
      name: 'Professionnel',
      description: 'Pour développer votre activité',
      price: 39,
      yearlyPrice: 390,
      currency: '€',
      period: 'month',
      features: [
        'Tout du plan Starter',
        '5 sites web',
        'Domaines illimités',
        'Sauvegarde quotidienne',
        'Support prioritaire 7j/7',
        'Statistiques avancées',
        'Optimisation SEO Pro',
        'Accès API'
      ],
      featured: true,
      popular: true,
      badge: {
        text: 'Plus populaire',
        color: '#f59e0b'
      },
      ctaText: 'Essai gratuit 14 jours',
      ctaLink: '#pro',
      ctaStyle: 'primary'
    },
    {
      name: 'Enterprise',
      description: 'Solutions sur mesure',
      price: 99,
      yearlyPrice: 990,
      currency: '€',
      period: 'month',
      features: [
        'Tout du plan Pro',
        'Sites web illimités',
        'Infrastructure dédiée',
        'SLA 99.9%',
        'Support 24/7 dédié',
        'Formation de votre équipe',
        'Développement sur mesure',
        'Consultant dédié'
      ],
      featured: false,
      popular: false,
      ctaText: 'Contactez-nous',
      ctaLink: '#enterprise',
      ctaStyle: 'primary'
    }
  ],
  showToggle: true,
  defaultPeriod: 'monthly',
  yearlyDiscount: 20,
  currency: '€',
  animation: {
    enabled: true,
    type: 'fade',
    duration: 0.6,
    stagger: true,
    hover: 'lift'
  },
  layout: {
    columns: '3',
    gap: 'md',
    alignment: 'stretch'
  },
  guarantees: [
    { icon: '✓', text: 'Sans engagement' },
    { icon: '🔒', text: 'Paiement sécurisé' },
    { icon: '💰', text: 'Garantie 30 jours' }
  ],
  seo: {
    schemaEnabled: true
  }
};

// Presets pour différents cas d'usage
export const pricingPresets = {
  saas: {
    variant: 'cards-modern' as const,
    title: 'Pricing that scales with your business',
    subtitle: 'Start free, upgrade when you need more features',
    plans: [
      {
        name: 'Free',
        price: 0,
        features: ['Up to 3 projects', '1GB storage', 'Community support'],
        ctaText: 'Get Started'
      },
      {
        name: 'Team',
        price: 49,
        yearlyPrice: 490,
        featured: true,
        features: ['Unlimited projects', '100GB storage', 'Priority support', 'Team collaboration'],
        ctaText: 'Start Free Trial'
      },
      {
        name: 'Business',
        price: 149,
        yearlyPrice: 1490,
        features: ['Everything in Team', '1TB storage', 'Advanced analytics', 'Custom integrations'],
        ctaText: 'Contact Sales'
      }
    ]
  },
  
  agency: {
    variant: 'table-comparison' as const,
    title: 'Compare our service packages',
    plans: [
      {
        name: 'Essential',
        price: 999,
        features: ['Website design', 'Mobile responsive', '5 pages', 'Basic SEO'],
        ctaText: 'Choose Essential'
      },
      {
        name: 'Professional',
        price: 2499,
        featured: true,
        features: ['Everything in Essential', 'Custom design', '20 pages', 'Advanced SEO', 'Content writing'],
        ctaText: 'Choose Professional'
      },
      {
        name: 'Premium',
        price: 4999,
        features: ['Everything in Professional', 'E-commerce', 'Unlimited pages', 'Marketing strategy', 'Monthly maintenance'],
        ctaText: 'Choose Premium'
      }
    ]
  },
  
  consultant: {
    variant: 'slider-interactive' as const,
    title: 'Pay only for what you need',
    subtitle: 'Adjust the hours and see your price in real-time',
    sliderConfig: {
      min: 1,
      max: 40,
      step: 1,
      default: 10,
      label: 'Hours per month',
      basePrice: 0,
      pricePerUnit: 150
    }
  },
  
  ecommerce: {
    variant: 'cards-flip' as const,
    title: 'Choose your online store plan',
    plans: [
      {
        name: 'Starter Store',
        price: 29,
        features: ['Up to 100 products', '2% transaction fee', 'Basic themes', 'Email support'],
        ctaText: 'Start Selling'
      },
      {
        name: 'Growth Store',
        price: 79,
        featured: true,
        features: ['Up to 1000 products', '1% transaction fee', 'Premium themes', 'Priority support', 'Marketing tools'],
        ctaText: 'Grow Your Business'
      },
      {
        name: 'Enterprise Store',
        price: 299,
        features: ['Unlimited products', '0% transaction fee', 'Custom themes', '24/7 support', 'Advanced analytics'],
        ctaText: 'Scale Up'
      }
    ]
  },
  
  membership: {
    variant: 'timeline' as const,
    title: 'Join our community',
    subtitle: 'Different levels for different needs',
    plans: [
      {
        name: 'Bronze Member',
        price: 9,
        features: ['Access to basic content', 'Monthly newsletter', 'Member badge'],
        ctaText: 'Join Bronze'
      },
      {
        name: 'Silver Member',
        price: 19,
        features: ['All Bronze benefits', 'Premium content', 'Live workshops', 'Priority access'],
        ctaText: 'Join Silver'
      },
      {
        name: 'Gold Member',
        price: 49,
        featured: true,
        features: ['All Silver benefits', 'VIP events', '1-on-1 coaching', 'Exclusive resources'],
        ctaText: 'Join Gold'
      }
    ]
  }
};
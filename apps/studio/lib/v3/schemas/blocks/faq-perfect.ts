/**
 * FAQ Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';

// Schema pour un item FAQ
export const faqItemSchema = z.object({
  question: z.string().min(1).max(200),
  answer: z.string().min(1).max(2000),
  icon: z.string().optional(),
  category: z.string().optional(),
  duration: z.string().optional(), // Pour video-style
  featured: z.boolean().optional()
});

// Schema principal FAQ
export const faqDataSchema = z.object({
  // Variante visuelle
  variant: z.enum([
    'accordion-modern',    // Accordéon moderne avec animations
    'chat-style',         // Style conversation/chat
    'timeline',           // Timeline verticale
    'cards-grid',         // Grille de cartes
    'tabs-horizontal',    // Onglets horizontaux
    'floating-bubbles',   // Bulles flottantes
    'masonry',           // Disposition masonry
    'video-style'        // Style FAQ vidéo
  ]).default('accordion-modern'),

  // Variante de thème (nouveau)
  themeVariant: z.enum([
    'modern',    // Design épuré et contemporain
    'minimal',   // Ultra épuré
    'bold',      // Fort impact visuel
    'elegant'    // Sophistiqué et raffiné
  ]).default('modern').optional(),
  
  // Variante visuelle (nom correct pour V3)
  visualVariant: z.enum([
    'modern',    // Design épuré et contemporain
    'minimal',   // Ultra épuré
    'bold',      // Fort impact visuel
    'elegant'    // Sophistiqué et raffiné
  ]).default('modern').optional(),

  // Contenu principal
  title: z.string().min(1).max(100).default('Questions Fréquentes'),
  subtitle: z.string().max(200).optional(),
  
  // Items FAQ
  items: z.array(faqItemSchema).min(1).max(50).default([
    {
      question: "Comment fonctionne votre service ?",
      answer: "Notre service est conçu pour être simple et intuitif. Vous créez votre compte, personnalisez votre site avec notre éditeur visuel, puis publiez en un clic. Tout est inclus : hébergement, domaine, SSL et support."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Votre site est disponible immédiatement après publication. Pour les personnalisations avancées, comptez 24-48h. Notre équipe est là pour vous accompagner à chaque étape."
    },
    {
      question: "Puis-je modifier mon site après publication ?",
      answer: "Absolument ! Vous gardez un accès complet à l'éditeur et pouvez modifier votre site à tout moment. Les changements sont appliqués instantanément sans interruption de service."
    }
  ]),

  // Options d'affichage
  expandFirst: z.boolean().default(false),
  expandMultiple: z.boolean().default(false),
  showNumbers: z.boolean().default(false),
  showCategories: z.boolean().default(false),
  
  // Recherche
  searchEnabled: z.boolean().default(false),
  searchPlaceholder: z.string().optional(),
  
  // Filtres
  categories: z.array(z.object({
    id: z.string(),
    name: z.string(),
    color: z.string().optional()
  })).optional(),
  
  // Animation
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'zoom', 'bounce']).default('fade'),
    duration: z.number().min(0.1).max(2).default(0.6),
    easing: z.enum(['ease', 'ease-in', 'ease-out', 'ease-in-out']).default('ease-out'),
    stagger: z.boolean().default(true),
    staggerDelay: z.number().min(0).max(1).default(0.1)
  }).optional(),

  // Layout
  layout: z.object({
    columns: z.enum(['1', '2', '3', 'auto']).default('1'),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
    maxWidth: z.enum(['narrow', 'normal', 'wide', 'full']).default('normal')
  }).optional(),

  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      accent: z.string().optional(),
      text: z.string().optional(),
      textSecondary: z.string().optional(),
      background: z.string().optional(),
      border: z.string().optional()
    }).optional(),
    typography: z.object({
      questionSize: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      questionWeight: z.enum(['400', '500', '600', '700']).optional(),
      answerSize: z.enum(['sm', 'md', 'lg']).optional(),
      lineHeight: z.enum(['tight', 'normal', 'relaxed']).optional()
    }).optional(),
    spacing: z.object({
      itemPadding: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      containerPadding: z.enum(['sm', 'md', 'lg', 'xl']).optional()
    }).optional(),
    borders: z.object({
      style: z.enum(['none', 'solid', 'dashed', 'gradient']).optional(),
      width: z.enum(['thin', 'medium', 'thick']).optional(),
      radius: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).optional()
    }).optional()
  }).optional(),

  // Interactions
  interactions: z.object({
    hover: z.enum(['none', 'lift', 'glow', 'scale']).default('lift'),
    click: z.enum(['toggle', 'expand', 'modal']).default('toggle'),
    keyboard: z.boolean().default(true),
    touch: z.boolean().default(true)
  }).optional(),

  // Call to Action (ancienne structure pour compatibilité)
  cta: z.object({
    enabled: z.boolean().default(false),
    title: z.string().max(100).optional(),
    description: z.string().max(500).optional(),
    buttonText: z.string().max(100).optional(),
    buttonLink: z.string().optional(),
    position: z.enum(['top', 'bottom']).default('bottom'),
    style: z.enum(['button', 'link', 'banner']).default('button')
  }).optional(),

  // CTA fields séparés (nouvelle structure)
  ctaEnabled: z.boolean().optional(),
  ctaTitle: z.string().optional(),
  ctaDescription: z.string().optional(),
  ctaButtonText: z.string().optional(),
  ctaButtonLink: z.string().optional(),

  // Background color
  backgroundColor: z.string().optional(),

  // Schema.org
  seo: z.object({
    schemaEnabled: z.boolean().default(true),
    faqPage: z.boolean().default(true)
  }).optional(),

  // ID personnalisé
  id: z.string().optional()

}).strict();

export type FAQData = z.infer<typeof faqDataSchema>;

// Valeurs par défaut
export const faqDefaults: FAQData = {
  variant: 'accordion-modern',
  title: 'Questions Fréquentes',
  subtitle: 'Trouvez rapidement les réponses à vos questions',
  items: [
    {
      question: "Quels sont vos délais d'intervention pour une urgence ?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nous intervenons dans l'heure pour les urgences et sous 24-48h pour les demandes standards. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      icon: "⚡",
      category: "general"
    },
    {
      question: "Comment obtenir un devis gratuit pour mes travaux ?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Vous pouvez demander un devis gratuit directement sur notre site, par téléphone ou lors d'une visite. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
      icon: "📋",
      category: "billing"
    },
    {
      question: "Quelles garanties offrez-vous sur vos prestations ?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nous offrons une garantie décennale sur tous nos travaux, ainsi qu'une garantie de parfait achèvement d'un an. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Toutes nos interventions sont couvertes par notre assurance professionnelle.",
      icon: "🛡️",
      category: "general"
    },
    {
      question: "Intervenez-vous le week-end et les jours fériés ?",
      answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Oui, notre service d'urgence est disponible 7j/7, y compris les week-ends et jours fériés. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      icon: "📅",
      category: "general"
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nous acceptons tous les moyens de paiement : CB, espèces, chèque, virement. Possibilité de paiement en plusieurs fois sans frais pour les gros travaux. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "💳",
      category: "billing"
    },
    {
      question: "Comment savoir si vous intervenez dans ma zone ?",
      answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nous intervenons dans un rayon de 50km autour de notre siège. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vérifiez votre éligibilité en entrant votre code postal sur notre site.",
      icon: "📍",
      category: "technical"
    }
  ],
  expandFirst: true,
  searchEnabled: false,
  animation: {
    enabled: true,
    type: 'fade',
    duration: 0.6,
    easing: 'ease-out',
    stagger: true,
    staggerDelay: 0.1
  },
  seo: {
    schemaEnabled: true,
    faqPage: true
  }
};

// Presets pour différents cas d'usage
export const faqPresets = {
  support: {
    variant: 'accordion-modern' as const,
    title: 'Centre d\'Aide',
    subtitle: 'Comment pouvons-nous vous aider ?',
    searchEnabled: true,
    searchPlaceholder: 'Rechercher dans l\'aide...',
    categories: [
      { id: 'general', name: 'Général', color: '#667eea' },
      { id: 'billing', name: 'Facturation', color: '#f59e0b' },
      { id: 'technical', name: 'Technique', color: '#10b981' }
    ]
  },
  
  product: {
    variant: 'cards-grid' as const,
    title: 'Tout sur notre Produit',
    subtitle: 'Découvrez les fonctionnalités en détail',
    layout: {
      columns: '2' as const,
      gap: 'lg' as const,
      maxWidth: 'wide' as const
    }
  },
  
  onboarding: {
    variant: 'timeline' as const,
    title: 'Guide de Démarrage',
    subtitle: 'Suivez ces étapes pour bien commencer',
    showNumbers: true,
    expandFirst: true
  },
  
  chatbot: {
    variant: 'chat-style' as const,
    title: 'Assistant Virtuel',
    subtitle: 'Posez vos questions comme dans une conversation',
    animation: {
      enabled: true,
      type: 'slide' as const,
      duration: 0.4,
      easing: 'ease-out' as const,
      stagger: false,
      staggerDelay: 0
    }
  },
  
  video: {
    variant: 'video-style' as const,
    title: 'Tutoriels Vidéo',
    subtitle: 'Apprenez en regardant',
    items: [
      {
        question: "Comment créer votre premier site ?",
        answer: "Dans cette vidéo, nous vous montrons étape par étape comment créer et publier votre premier site web professionnel.",
        duration: "5:42"
      },
      {
        question: "Personnaliser votre design",
        answer: "Découvrez toutes les options de personnalisation : couleurs, polices, mise en page et bien plus encore.",
        duration: "8:15"
      }
    ]
  }
};
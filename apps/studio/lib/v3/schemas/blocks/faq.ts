/**
 * FAQ Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { colorSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour une question FAQ
export const faqItemSchema = z.object({
  id: z.string().default(() => {
    const id = crypto.randomUUID();
    logger.debug('faqItemSchema', 'generate', `Génération ID FAQ: ${id}`);
    return id;
  }),
  
  question: z.string().min(1, 'La question est requise'),
  
  answer: z.string().min(1, 'La réponse est requise'),
  
  category: z.string().optional(),
  
  tags: z.array(z.string()).default([]),
  
  featured: z.boolean().default(false),
  
  helpfulCount: z.number().default(0),
  
  relatedQuestions: z.array(z.string()).optional(),
  
  metadata: z.object({
    author: z.string().optional(),
    dateCreated: z.string().optional(),
    dateModified: z.string().optional(),
    views: z.number().optional()
  }).optional(),
  
  cta: z.object({
    text: z.string(),
    link: z.string(),
    style: z.enum(['link', 'button']).default('link')
  }).optional(),
  
  open: z.boolean().default(false)
});

// Schema pour une catégorie FAQ
export const faqCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: colorSchema.optional(),
  count: z.number().optional()
});

// Schema principal FAQ
export const faqDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'accordion-classic',
    'cards-expandable',
    'list-minimal',
    'tabs-grouped',
    'grid-modern',
    'timeline-vertical',
    'chat-style',
    'knowledge-base'
  ]).default('accordion-classic').describe('Style visuel du bloc FAQ'),
  
  // Configuration du titre
  title: z.string().default('Questions Fréquentes'),
  
  subtitle: z.string().optional(),
  
  description: z.string().optional(),
  
  // Questions
  items: z.array(faqItemSchema).min(1).default([
    {
      id: '1',
      question: 'Quels sont vos délais de livraison ?',
      answer: 'Nos délais de livraison varient selon la complexité du projet. En général, comptez 2 à 4 semaines pour un site web standard et 6 à 12 semaines pour une application complexe.',
      category: 'general',
      featured: true,
      helpfulCount: 42,
      open: false
    },
    {
      id: '2',
      question: 'Proposez-vous un service de maintenance ?',
      answer: 'Oui, nous proposons différents forfaits de maintenance incluant les mises à jour de sécurité, l\'hébergement, les sauvegardes automatiques et le support technique.',
      category: 'services',
      helpfulCount: 38,
      open: false
    },
    {
      id: '3',
      question: 'Puis-je modifier mon site moi-même ?',
      answer: 'Absolument ! Tous nos sites sont livrés avec un CMS intuitif qui vous permet de modifier facilement vos contenus. Nous proposons également une formation personnalisée.',
      category: 'technical',
      helpfulCount: 35,
      open: false
    }
  ]),
  
  // Layout
  layout: z.object({
    columns: z.number().min(1).max(3).default(1),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('narrow'),
    alignment: z.enum(['left', 'center', 'right']).default('left')
  }).default({}),
  
  // Options d'affichage
  display: z.object({
    showIcon: z.boolean().default(true),
    iconStyle: z.enum(['plus', 'chevron', 'arrow', 'custom']).default('plus'),
    iconPosition: z.enum(['left', 'right']).default('right'),
    
    showNumber: z.boolean().default(false),
    numberStyle: z.enum(['decimal', 'roman', 'letter', 'custom']).default('decimal'),
    
    showCategory: z.boolean().default(false),
    showTags: z.boolean().default(false),
    showHelpful: z.boolean().default(false),
    showShare: z.boolean().default(false),
    showSearch: z.boolean().default(false),
    
    expandBehavior: z.enum(['single', 'multiple', 'all']).default('single'),
    defaultExpanded: z.array(z.string()).default([]),
    
    animation: z.enum(['none', 'slide', 'fade', 'scale']).default('slide'),
    animationDuration: z.number().default(300),
    animationDelay: z.number().default(50),
    stagger: z.boolean().default(true),
    
    divider: z.boolean().default(true),
    dividerStyle: z.enum(['solid', 'dashed', 'dotted', 'gradient']).default('solid'),
    
    highlightOnHover: z.boolean().default(true),
    
    questionStyle: z.object({
      fontSize: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
      fontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('semibold'),
      textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).default('none')
    }).default({}),
    
    answerStyle: z.object({
      fontSize: z.enum(['sm', 'md', 'lg']).default('md'),
      lineHeight: z.enum(['tight', 'normal', 'relaxed']).default('relaxed'),
      formatting: z.boolean().default(true) // Support markdown/rich text
    }).default({})
  }).default({}),
  
  // Catégories et filtrage
  categories: z.object({
    enabled: z.boolean().default(false),
    items: z.array(faqCategorySchema).default([
      { id: 'general', label: 'Général' },
      { id: 'services', label: 'Services' },
      { id: 'technical', label: 'Technique' },
      { id: 'pricing', label: 'Tarifs' }
    ]),
    defaultCategory: z.string().optional(),
    style: z.enum(['tabs', 'buttons', 'dropdown', 'sidebar']).default('tabs'),
    position: z.enum(['top', 'left', 'right']).default('top'),
    showAll: z.boolean().default(true),
    allLabel: z.string().default('Toutes les questions'),
    showCount: z.boolean().default(true),
    sticky: z.boolean().default(false)
  }).default({}),
  
  // Recherche
  search: z.object({
    enabled: z.boolean().default(false),
    placeholder: z.string().default('Rechercher une question...'),
    position: z.enum(['top', 'sticky', 'sidebar']).default('top'),
    style: z.enum(['simple', 'advanced', 'autocomplete']).default('simple'),
    minChars: z.number().default(3),
    debounceMs: z.number().default(300),
    showSuggestions: z.boolean().default(true),
    highlightMatches: z.boolean().default(true),
    noResultsMessage: z.string().default('Aucune question trouvée'),
    searchIn: z.array(z.enum(['question', 'answer', 'tags'])).default(['question', 'answer'])
  }).default({}),
  
  // Fonctionnalités interactives
  feedback: z.object({
    enabled: z.boolean().default(false),
    style: z.enum(['helpful', 'rating', 'both']).default('helpful'),
    helpfulText: z.string().default('Cette réponse vous a-t-elle aidé ?'),
    yesText: z.string().default('Oui'),
    noText: z.string().default('Non'),
    thanksMessage: z.string().default('Merci pour votre retour !'),
    allowComments: z.boolean().default(false)
  }).default({}),
  
  // Mode Chat
  chatMode: z.object({
    enabled: z.boolean().default(false),
    avatarUser: z.string().optional(),
    avatarBot: z.string().optional(),
    botName: z.string().default('Assistant'),
    typing: z.boolean().default(true),
    typingDuration: z.number().default(1000),
    showTimestamp: z.boolean().default(false)
  }).default({}),
  
  // Call to action
  cta: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Vous n\'avez pas trouvé votre réponse ?'),
    description: z.string().default('Notre équipe est là pour vous aider'),
    buttonText: z.string().default('Contactez-nous'),
    buttonLink: z.string().default('#contact'),
    buttonVariant: z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
    position: z.enum(['bottom', 'top', 'floating']).default('bottom'),
    style: z.enum(['simple', 'card', 'banner']).default('card')
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    questionColor: colorSchema.optional(),
    answerColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('none'),
    cardStyle: z.enum(['flat', 'elevated', 'outlined', 'glassmorphism']).default('flat')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type FAQData = z.infer<typeof faqDataSchema>;

// Valeurs par défaut complètes
export const faqDefaults: FAQData = {
  variant: 'accordion-classic',
  title: 'Questions Fréquentes',
  subtitle: 'Tout ce que vous devez savoir',
  description: 'Retrouvez les réponses aux questions les plus courantes sur nos services.',
  
  items: [
    {
      id: '1',
      question: 'Quels sont vos délais de livraison ?',
      answer: 'Nos délais de livraison varient selon la complexité du projet. En général, comptez 2 à 4 semaines pour un site web standard et 6 à 12 semaines pour une application complexe. Nous vous fournirons un calendrier détaillé après l\'analyse de vos besoins.',
      category: 'general',
      tags: ['délais', 'planning', 'livraison'],
      featured: true,
      helpfulCount: 42,
      open: false
    },
    {
      id: '2',
      question: 'Proposez-vous un service de maintenance ?',
      answer: 'Oui, nous proposons différents forfaits de maintenance incluant les mises à jour de sécurité, l\'hébergement, les sauvegardes automatiques et le support technique. Nos forfaits démarrent à 39€/mois.',
      category: 'services',
      tags: ['maintenance', 'support', 'hébergement'],
      helpfulCount: 38,
      open: false
    },
    {
      id: '3',
      question: 'Puis-je modifier mon site moi-même ?',
      answer: 'Absolument ! Tous nos sites sont livrés avec un CMS intuitif qui vous permet de modifier facilement vos contenus. Nous proposons également une formation personnalisée pour vous rendre totalement autonome.',
      category: 'technical',
      tags: ['CMS', 'autonomie', 'formation'],
      helpfulCount: 35,
      open: false
    },
    {
      id: '4',
      question: 'Quels sont vos modes de paiement ?',
      answer: 'Nous acceptons les virements bancaires, les cartes de crédit (Visa, Mastercard, Amex) et PayPal. Le paiement s\'effectue en 3 fois : 30% à la commande, 40% à la validation de la maquette, et 30% à la livraison.',
      category: 'pricing',
      tags: ['paiement', 'tarifs', 'facturation'],
      helpfulCount: 28,
      open: false
    },
    {
      id: '5',
      question: 'Mon site sera-t-il optimisé pour le référencement ?',
      answer: 'Oui, tous nos sites sont développés avec les meilleures pratiques SEO : structure sémantique, vitesse de chargement optimisée, balises meta personnalisées, sitemap XML, et compatibilité mobile. Nous proposons aussi des services SEO avancés.',
      category: 'technical',
      tags: ['SEO', 'référencement', 'Google'],
      featured: true,
      helpfulCount: 45,
      open: false
    },
    {
      id: '6',
      question: 'Proposez-vous des formations ?',
      answer: 'Oui, nous proposons des formations personnalisées pour vous permettre de gérer votre site en toute autonomie. Les formations peuvent être en présentiel ou en visioconférence, et incluent des supports de cours détaillés.',
      category: 'services',
      tags: ['formation', 'apprentissage', 'autonomie'],
      helpfulCount: 22,
      open: false
    }
  ],
  
  layout: {
    columns: 1,
    gap: 'md',
    containerWidth: 'narrow',
    alignment: 'left'
  },
  
  display: {
    showIcon: true,
    iconStyle: 'plus',
    iconPosition: 'right',
    showNumber: false,
    numberStyle: 'decimal',
    showCategory: false,
    showTags: false,
    showHelpful: false,
    showShare: false,
    showSearch: false,
    expandBehavior: 'single',
    defaultExpanded: [],
    animation: 'slide',
    animationDuration: 300,
    divider: true,
    dividerStyle: 'solid',
    highlightOnHover: true,
    questionStyle: {
      fontSize: 'md',
      fontWeight: 'semibold',
      textTransform: 'none'
    },
    answerStyle: {
      fontSize: 'md',
      lineHeight: 'relaxed',
      formatting: true
    }
  },
  
  categories: {
    enabled: true,
    items: [
      { id: 'all', label: 'Toutes', count: 6 },
      { id: 'general', label: 'Général', icon: '📋', count: 1 },
      { id: 'services', label: 'Services', icon: '🛠️', count: 2 },
      { id: 'technical', label: 'Technique', icon: '💻', count: 2 },
      { id: 'pricing', label: 'Tarifs', icon: '💰', count: 1 }
    ],
    defaultCategory: 'all',
    style: 'tabs',
    position: 'top',
    showAll: true,
    allLabel: 'Toutes les questions',
    showCount: true,
    sticky: false
  },
  
  search: {
    enabled: false,
    placeholder: 'Rechercher une question...',
    position: 'top',
    style: 'simple',
    minChars: 3,
    debounceMs: 300,
    showSuggestions: true,
    highlightMatches: true,
    noResultsMessage: 'Aucune question trouvée',
    searchIn: ['question', 'answer']
  },
  
  feedback: {
    enabled: false,
    style: 'helpful',
    helpfulText: 'Cette réponse vous a-t-elle aidé ?',
    yesText: 'Oui',
    noText: 'Non',
    thanksMessage: 'Merci pour votre retour !',
    allowComments: false
  },
  
  chatMode: {
    enabled: false,
    botName: 'Assistant',
    typing: true,
    typingDuration: 1000,
    showTimestamp: false
  },
  
  cta: {
    enabled: true,
    title: 'Vous n\'avez pas trouvé votre réponse ?',
    description: 'Notre équipe est là pour vous aider',
    buttonText: 'Contactez-nous',
    buttonLink: '#contact',
    buttonVariant: 'primary',
    position: 'bottom',
    style: 'card'
  },
  
  styles: {
    padding: 'lg',
    borderRadius: 'md',
    shadow: 'none',
    cardStyle: 'flat'
  }
};

// Logger de validation
faqDataSchema._parse = new Proxy(faqDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('faqDataSchema', 'parse', 'Validation des données FAQ', { 
      hasData: !!args[0],
      itemsCount: args[0]?.items?.length || 0
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('faqDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('faqDataSchema', 'parse', '✅ Validation réussie', {
        itemsCount: result.data.items.length,
        variant: result.data.variant
      });
    }
    
    return result;
  }
});
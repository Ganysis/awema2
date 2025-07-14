/**
 * Header Schema V3 - Validation complète avec Zod
 */

import { z } from 'zod';
import { buttonSchema, imageSchema, colorSchema } from '../common';

// Schema pour un élément de menu
export const menuItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  label: z.string().min(1, 'Le label est requis'),
  link: z.string().default('#'),
  target: z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
  icon: z.string().optional(),
  badge: z.object({
    text: z.string(),
    color: z.enum(['primary', 'secondary', 'success', 'warning', 'error']).default('primary')
  }).optional(),
  
  // Support mega menu
  megaMenu: z.object({
    enabled: z.boolean().default(false),
    columns: z.number().min(1).max(6).default(3),
    style: z.enum(['cards', 'columns', 'tabs', 'mixed']).default('columns'),
    items: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      link: z.string(),
      image: imageSchema.optional()
    }))
  }).optional(),
  
  // Sous-menu dropdown classique
  subItems: z.lazy(() => z.array(menuItemSchema)).optional()
});

// Schema pour la recherche
export const searchConfigSchema = z.object({
  enabled: z.boolean().default(false),
  placeholder: z.string().default('Rechercher...'),
  style: z.enum(['modal', 'dropdown', 'inline', 'instant']).default('modal'),
  hotkey: z.string().optional().default('cmd+k'),
  apiEndpoint: z.string().optional()
});

// Schema pour le dark mode
export const darkModeSchema = z.object({
  enabled: z.boolean().default(false),
  style: z.enum(['toggle', 'dropdown', 'auto', 'system']).default('toggle'),
  defaultMode: z.enum(['light', 'dark', 'system']).default('system')
});

// Schema pour les langues
export const languageSelectorSchema = z.object({
  enabled: z.boolean().default(false),
  style: z.enum(['dropdown', 'flags', 'inline', 'modal']).default('dropdown'),
  languages: z.array(z.object({
    code: z.string().min(2).max(5),
    label: z.string(),
    flag: z.string().optional(),
    url: z.string().optional()
  })).min(1).default([
    { code: 'fr', label: 'Français' }
  ])
});

// Schema principal du Header
export const headerDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'minimal-float',
    'glassmorphism',
    'gradient-accent',
    'shadow-elegant',
    'bold-corporate',
    'split-nav',
    'center-logo',
    'mega-menu-pro'
  ]).default('minimal-float'),
  
  // Configuration du logo
  logo: z.object({
    type: z.enum(['text', 'image', 'both']).default('text'),
    text: z.string().default('AWEMA'),
    image: imageSchema.optional(),
    size: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
    link: z.string().default('/')
  }),
  
  // Navigation principale
  navigation: z.object({
    items: z.array(menuItemSchema).default([]),
    alignment: z.enum(['left', 'center', 'right', 'justify']).default('right'),
    style: z.enum(['links', 'buttons', 'pills', 'underline']).default('links'),
    mobileStyle: z.enum(['drawer', 'fullscreen', 'dropdown', 'accordion', 'push']).default('drawer'),
    mobileBreakpoint: z.number().default(768)
  }),
  
  // Actions (boutons CTA)
  actions: z.object({
    enabled: z.boolean().default(true),
    items: z.array(buttonSchema).max(3).default([
      {
        text: 'Contact',
        link: '#contact',
        variant: 'primary',
        size: 'md'
      }
    ])
  }),
  
  // Features
  search: searchConfigSchema,
  darkMode: darkModeSchema,
  languageSelector: languageSelectorSchema,
  
  // Options de comportement
  behavior: z.object({
    sticky: z.boolean().default(true),
    hideOnScroll: z.boolean().default(false),
    transparent: z.boolean().default(false),
    shrinkOnScroll: z.boolean().default(true),
    showTopBar: z.boolean().default(false),
    animateOnScroll: z.boolean().default(true)
  }),
  
  // Top bar (optionnel)
  topBar: z.object({
    enabled: z.boolean().default(false),
    content: z.string().default(''),
    style: z.enum(['info', 'promo', 'alert', 'custom']).default('info'),
    dismissible: z.boolean().default(true),
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional()
  }),
  
  // Styles personnalisés
  styles: z.object({
    height: z.enum(['sm', 'md', 'lg', 'xl', 'auto']).default('md'),
    padding: z.enum(['none', 'sm', 'md', 'lg']).default('md'),
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    borderBottom: z.boolean().default(true),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('sm'),
    blur: z.boolean().default(false)
  })
});

// Type TypeScript dérivé du schéma
export type HeaderData = z.infer<typeof headerDataSchema>;

// Valeurs par défaut complètes
export const headerDefaults: HeaderData = {
  variant: 'minimal-float',
  
  logo: {
    type: 'text',
    text: 'AWEMA',
    size: 'md',
    link: '/'
  },
  
  navigation: {
    items: [
      {
        id: '1',
        label: 'Accueil',
        link: '/',
        target: '_self'
      },
      {
        id: '2',
        label: 'Services',
        link: '#services',
        target: '_self',
        subItems: [
          {
            id: '2-1',
            label: 'Développement Web',
            link: '#dev-web',
            target: '_self'
          },
          {
            id: '2-2',
            label: 'Design UI/UX',
            link: '#design',
            target: '_self'
          }
        ]
      },
      {
        id: '3',
        label: 'À propos',
        link: '#about',
        target: '_self'
      },
      {
        id: '4',
        label: 'Contact',
        link: '#contact',
        target: '_self'
      }
    ],
    alignment: 'right',
    style: 'links',
    mobileStyle: 'drawer',
    mobileBreakpoint: 768
  },
  
  actions: {
    enabled: true,
    items: [
      {
        text: 'Devis gratuit',
        link: '#contact',
        variant: 'primary',
        size: 'md'
      }
    ]
  },
  
  search: {
    enabled: false,
    placeholder: 'Rechercher...',
    style: 'modal',
    hotkey: 'cmd+k'
  },
  
  darkMode: {
    enabled: false,
    style: 'toggle',
    defaultMode: 'system'
  },
  
  languageSelector: {
    enabled: false,
    style: 'dropdown',
    languages: [
      { code: 'fr', label: 'Français' }
    ]
  },
  
  behavior: {
    sticky: true,
    hideOnScroll: false,
    transparent: false,
    shrinkOnScroll: true,
    showTopBar: false,
    animateOnScroll: true
  },
  
  topBar: {
    enabled: false,
    content: '',
    style: 'info',
    dismissible: true
  },
  
  styles: {
    height: 'md',
    padding: 'md',
    borderBottom: true,
    shadow: 'sm',
    blur: false
  }
};
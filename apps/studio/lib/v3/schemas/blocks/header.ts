/**
 * Header V3 Schema - Navigation ultra-moderne avec mega menu
 */

import { z } from 'zod';

// Schema pour un lien de navigation
export const navLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  target: z.enum(['_self', '_blank']).default('_self'),
});

// Schema pour un sous-menu
export const subMenuSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  links: z.array(navLinkSchema),
  featured: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    link: z.string(),
  }).optional(),
});

// Schema pour un élément de menu principal
export const menuItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string().optional(),
  icon: z.string().optional(),
  badge: z.string().optional(),
  highlight: z.boolean().default(false),
  submenu: subMenuSchema.optional(),
  megaMenu: z.object({
    enabled: z.boolean().default(false),
    columns: z.number().min(2).max(6).default(4),
    showImages: z.boolean().default(true),
    featured: z.array(z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
      link: z.string(),
    })).optional(),
  }).optional(),
});

// Schema principal Header
export const headerDataSchema = z.object({
  // Variantes visuelles
  visualVariant: z.enum([
    'modern',
    'minimal', 
    'bold',
    'elegant',
    'corporate',
    'creative',
    'tech',
    'classic'
  ]).default('modern'),

  // Branding
  branding: z.object({
    type: z.enum(['logo', 'text', 'both']).default('text'),
    logoUrl: z.string().optional(),
    logoAlt: z.string().default('Logo'),
    companyName: z.string().default('Mon Entreprise'),
    tagline: z.string().optional(),
    size: z.enum(['small', 'medium', 'large', 'xl']).default('medium'),
    position: z.enum(['left', 'center']).default('left'),
  }),

  // Navigation
  navigation: z.object({
    items: z.array(menuItemSchema).default([
      {
        id: 'home',
        label: 'Accueil',
        url: '/',
      },
      {
        id: 'services',
        label: 'Services',
        submenu: {
          id: 'services-menu',
          label: 'Nos Services',
          description: 'Découvrez tous nos services',
          links: [],
        },
      },
      {
        id: 'about',
        label: 'À propos',
        url: '/about',
      },
      {
        id: 'gallery',
        label: 'Galerie',
        url: '/gallery',
      },
      {
        id: 'contact',
        label: 'Contact',
        url: '/contact',
        highlight: true,
      },
    ]),
    alignment: z.enum(['left', 'center', 'right']).default('right'),
    style: z.enum(['links', 'buttons', 'pills']).default('links'),
  }),

  // Features
  features: z.object({
    // Sticky
    sticky: z.object({
      enabled: z.boolean().default(true),
      behavior: z.enum(['always', 'scrollUp', 'scrollDown']).default('always'),
      shrinkOnScroll: z.boolean().default(true),
      showAfter: z.number().default(100),
      backgroundColor: z.string().optional(),
      shadow: z.boolean().default(true),
    }),

    // Search
    search: z.object({
      enabled: z.boolean().default(false),
      placeholder: z.string().default('Rechercher...'),
      style: z.enum(['inline', 'modal', 'dropdown']).default('modal'),
      icon: z.boolean().default(true),
    }),

    // Dark mode toggle
    darkMode: z.object({
      enabled: z.boolean().default(false),
      defaultMode: z.enum(['light', 'dark', 'system']).default('system'),
      icon: z.boolean().default(true),
      label: z.boolean().default(false),
    }),

    // Language selector
    languageSelector: z.object({
      enabled: z.boolean().default(false),
      languages: z.array(z.object({
        code: z.string(),
        label: z.string(),
        flag: z.string().optional(),
      })).default([
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
      ]),
      style: z.enum(['dropdown', 'flags', 'text']).default('dropdown'),
    }),

    // CTA Button
    cta: z.object({
      enabled: z.boolean().default(true),
      text: z.string().default('Devis gratuit'),
      link: z.string().default('#contact'),
      style: z.enum(['primary', 'secondary', 'outline', 'gradient']).default('primary'),
      icon: z.string().optional(),
      size: z.enum(['small', 'medium', 'large']).default('medium'),
    }),

    // Announcement bar
    announcement: z.object({
      enabled: z.boolean().default(false),
      text: z.string().default('🎉 Offre spéciale : -20% sur tous nos services !'),
      link: z.string().optional(),
      dismissible: z.boolean().default(true),
      position: z.enum(['top', 'bottom']).default('top'),
      style: z.enum(['info', 'success', 'warning', 'gradient']).default('gradient'),
    }),
  }),

  // Mobile menu
  mobile: z.object({
    breakpoint: z.number().default(1024),
    menuStyle: z.enum(['slide', 'fullscreen', 'dropdown', 'bottom']).default('slide'),
    animation: z.enum(['fade', 'slide', 'scale', 'rotate']).default('slide'),
    showLogo: z.boolean().default(true),
    showSocial: z.boolean().default(true),
    backgroundColor: z.string().optional(),
  }),

  // Layout
  layout: z.object({
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('wide'),
    padding: z.enum(['none', 'small', 'medium', 'large']).default('medium'),
    height: z.enum(['auto', 'small', 'medium', 'large']).default('medium'),
    shadow: z.boolean().default(false),
    border: z.boolean().default(false),
  }),

  // Social links
  social: z.object({
    enabled: z.boolean().default(true),
    position: z.enum(['nav', 'mobile', 'both']).default('mobile'),
    links: z.array(z.object({
      platform: z.string(),
      url: z.string(),
      icon: z.string(),
      label: z.string().optional(),
    })).default([
      { platform: 'facebook', url: '#', icon: 'facebook' },
      { platform: 'instagram', url: '#', icon: 'instagram' },
      { platform: 'linkedin', url: '#', icon: 'linkedin' },
    ]),
  }),

  // Contact info (quick access)
  quickContact: z.object({
    enabled: z.boolean().default(false),
    phone: z.string().optional(),
    email: z.string().optional(),
    showInDesktop: z.boolean().default(true),
    showInMobile: z.boolean().default(true),
    style: z.enum(['text', 'icons', 'buttons']).default('text'),
  }),

  // Styles personnalisés
  styles: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    accentColor: z.string().optional(),
    hoverEffect: z.enum(['none', 'underline', 'background', 'scale']).default('underline'),
    fontFamily: z.string().optional(),
    fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
    fontWeight: z.enum(['normal', 'medium', 'bold']).default('medium'),
    borderRadius: z.enum(['none', 'small', 'medium', 'large', 'full']).default('medium'),
    customCSS: z.string().optional(),
  }),
});

// Type TypeScript dérivé du schéma
export type HeaderData = z.infer<typeof headerDataSchema>;

// Valeurs par défaut complètes
export const headerDefaults: HeaderData = {
  visualVariant: 'modern',
  
  branding: {
    type: 'text',
    companyName: 'Mon Entreprise',
    logoAlt: 'Logo',
    size: 'medium',
    position: 'left',
  },

  navigation: {
    items: [
      {
        id: 'home',
        label: 'Accueil',
        url: '/',
      },
      {
        id: 'services',
        label: 'Services',
        submenu: {
          id: 'services-menu',
          label: 'Nos Services',
          description: 'Découvrez notre expertise',
          links: [
            { id: 's1', label: 'Service 1', url: '/services/service-1' },
            { id: 's2', label: 'Service 2', url: '/services/service-2' },
            { id: 's3', label: 'Service 3', url: '/services/service-3' },
          ],
        },
      },
      {
        id: 'about',
        label: 'À propos',
        url: '/about',
      },
      {
        id: 'gallery',
        label: 'Galerie',
        url: '/gallery',
      },
      {
        id: 'contact',
        label: 'Contact',
        url: '/contact',
        highlight: true,
      },
    ],
    alignment: 'right',
    style: 'links',
  },

  features: {
    sticky: {
      enabled: true,
      behavior: 'always',
      shrinkOnScroll: true,
      showAfter: 100,
      shadow: true,
    },
    search: {
      enabled: false,
      placeholder: 'Rechercher...',
      style: 'modal',
      icon: true,
    },
    darkMode: {
      enabled: false,
      defaultMode: 'system',
      icon: true,
      label: false,
    },
    languageSelector: {
      enabled: false,
      languages: [
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
      ],
      style: 'dropdown',
    },
    cta: {
      enabled: true,
      text: 'Devis gratuit',
      link: '#contact',
      style: 'primary',
      size: 'medium',
    },
    announcement: {
      enabled: false,
      text: '🎉 Offre spéciale : -20% sur tous nos services !',
      dismissible: true,
      position: 'top',
      style: 'gradient',
    },
  },

  mobile: {
    breakpoint: 1024,
    menuStyle: 'slide',
    animation: 'slide',
    showLogo: true,
    showSocial: true,
  },

  layout: {
    containerWidth: 'wide',
    padding: 'medium',
    height: 'medium',
    shadow: false,
    border: false,
  },

  social: {
    enabled: true,
    position: 'mobile',
    links: [
      { platform: 'facebook', url: 'https://facebook.com', icon: 'facebook' },
      { platform: 'instagram', url: 'https://instagram.com', icon: 'instagram' },
      { platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin' },
    ],
  },

  quickContact: {
    enabled: false,
    showInDesktop: true,
    showInMobile: true,
    style: 'text',
  },

  styles: {
    hoverEffect: 'underline',
    fontSize: 'medium',
    fontWeight: 'medium',
    borderRadius: 'medium',
  },
};
/**
 * Footer V3 Schema - Pied de page ultra-moderne avec widgets dynamiques
 */

import { z } from 'zod';

// Schema pour un lien de footer
export const footerLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
  icon: z.string().optional(),
  target: z.enum(['_self', '_blank']).default('_self'),
});

// Schema pour une colonne de liens
export const footerColumnSchema = z.object({
  title: z.string(),
  links: z.array(footerLinkSchema),
  icon: z.string().optional(),
});

// Schema pour un widget
export const footerWidgetSchema = z.object({
  type: z.enum([
    'companyInfo',
    'quickLinks',
    'servicesGrid',
    'contactInfo',
    'businessHours',
    'newsletter',
    'recentWork',
    'certifications',
    'paymentMethods',
    'map',
    'social',
    'testimonial',
    'stats',
    'custom'
  ]),
  enabled: z.boolean().default(true),
  title: z.string().optional(),
  position: z.number().default(1),
  config: z.record(z.any()).optional(),
});

// Schema principal Footer
export const footerDataSchema = z.object({
  // Variantes visuelles
  visualVariant: z.enum([
    'waves',
    'gradient',
    'split',
    'centered',
    'dark',
    'floating',
    'geometric',
    'organic'
  ]).default('waves'),

  // Informations de l'entreprise
  company: z.object({
    name: z.string().default('Mon Entreprise'),
    logo: z.string().optional(),
    description: z.string().default('Votre partenaire de confiance pour tous vos projets'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    registrationNumber: z.string().optional(),
    vatNumber: z.string().optional(),
  }),

  // Widgets actifs
  widgets: z.array(footerWidgetSchema).default([
    {
      type: 'companyInfo',
      enabled: true,
      position: 1,
    },
    {
      type: 'quickLinks',
      enabled: true,
      title: 'Navigation',
      position: 2,
    },
    {
      type: 'servicesGrid',
      enabled: true,
      title: 'Nos Services',
      position: 3,
    },
    {
      type: 'contactInfo',
      enabled: true,
      title: 'Contact',
      position: 4,
    },
  ]),

  // Newsletter
  newsletter: z.object({
    enabled: z.boolean().default(true),
    title: z.string().default('Restez informé'),
    description: z.string().default('Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités'),
    placeholder: z.string().default('Votre email'),
    buttonText: z.string().default('S\'inscrire'),
    style: z.enum(['inline', 'stacked', 'card', 'minimal', 'floating']).default('inline'),
    successMessage: z.string().default('Merci pour votre inscription !'),
    gdprText: z.string().optional(),
  }),

  // Réseaux sociaux
  social: z.object({
    enabled: z.boolean().default(true),
    title: z.string().default('Suivez-nous'),
    style: z.enum(['icons', 'buttons', 'cards', 'gradient']).default('icons'),
    size: z.enum(['small', 'medium', 'large']).default('medium'),
    links: z.array(z.object({
      platform: z.string(),
      url: z.string(),
      icon: z.string(),
      label: z.string().optional(),
      color: z.string().optional(),
    })).default([
      { platform: 'facebook', url: '#', icon: 'facebook', color: '#1877f2' },
      { platform: 'instagram', url: '#', icon: 'instagram', color: '#e4405f' },
      { platform: 'linkedin', url: '#', icon: 'linkedin', color: '#0077b5' },
      { platform: 'twitter', url: '#', icon: 'twitter', color: '#1da1f2' },
    ]),
  }),

  // Horaires d'ouverture
  businessHours: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Horaires'),
    style: z.enum(['list', 'table', 'cards', 'timeline']).default('list'),
    hours: z.array(z.object({
      day: z.string(),
      hours: z.string(),
      closed: z.boolean().default(false),
    })).default([
      { day: 'Lundi', hours: '9h - 18h', closed: false },
      { day: 'Mardi', hours: '9h - 18h', closed: false },
      { day: 'Mercredi', hours: '9h - 18h', closed: false },
      { day: 'Jeudi', hours: '9h - 18h', closed: false },
      { day: 'Vendredi', hours: '9h - 18h', closed: false },
      { day: 'Samedi', hours: '9h - 12h', closed: false },
      { day: 'Dimanche', hours: 'Fermé', closed: true },
    ]),
  }),

  // Certifications / Partenaires
  certifications: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Nos certifications'),
    style: z.enum(['logos', 'cards', 'carousel', 'grid']).default('logos'),
    items: z.array(z.object({
      name: z.string(),
      logo: z.string(),
      url: z.string().optional(),
      description: z.string().optional(),
    })).default([]),
  }),

  // Moyens de paiement
  paymentMethods: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Moyens de paiement'),
    style: z.enum(['icons', 'cards', 'list']).default('icons'),
    methods: z.array(z.object({
      name: z.string(),
      icon: z.string(),
      enabled: z.boolean().default(true),
    })).default([
      { name: 'Visa', icon: 'visa', enabled: true },
      { name: 'Mastercard', icon: 'mastercard', enabled: true },
      { name: 'PayPal', icon: 'paypal', enabled: true },
      { name: 'Virement', icon: 'bank', enabled: true },
    ]),
  }),

  // Liens rapides
  quickLinks: z.object({
    columns: z.array(footerColumnSchema).default([
      {
        title: 'Services',
        links: [
          { label: 'Service 1', url: '/services/service-1' },
          { label: 'Service 2', url: '/services/service-2' },
          { label: 'Service 3', url: '/services/service-3' },
        ],
      },
      {
        title: 'À propos',
        links: [
          { label: 'Notre équipe', url: '/about' },
          { label: 'Nos valeurs', url: '/about#values' },
          { label: 'Notre histoire', url: '/about#history' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { label: 'Blog', url: '/blog' },
          { label: 'FAQ', url: '/faq' },
          { label: 'Support', url: '/support' },
        ],
      },
    ]),
  }),

  // Barre de copyright
  copyright: z.object({
    enabled: z.boolean().default(true),
    text: z.string().default('© {year} {company}. Tous droits réservés.'),
    position: z.enum(['left', 'center', 'right']).default('center'),
    showCredits: z.boolean().default(true),
    creditsText: z.string().default('Créé avec ❤️ par Awema'),
    creditsUrl: z.string().default('https://awema.fr'),
  }),

  // Liens légaux
  legal: z.object({
    enabled: z.boolean().default(true),
    position: z.enum(['copyright', 'separate', 'columns']).default('copyright'),
    links: z.array(footerLinkSchema).default([
      { label: 'Mentions légales', url: '/legal' },
      { label: 'Politique de confidentialité', url: '/privacy' },
      { label: 'CGV', url: '/terms' },
      { label: 'Cookies', url: '/cookies' },
    ]),
  }),

  // Layout
  layout: z.object({
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('wide'),
    columnsDesktop: z.number().min(1).max(6).default(4),
    columnsTablet: z.number().min(1).max(4).default(2),
    columnsMobile: z.number().min(1).max(2).default(1),
    gap: z.enum(['small', 'medium', 'large', 'xl']).default('large'),
    padding: z.enum(['small', 'medium', 'large', 'xl']).default('large'),
    alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
  }),

  // Back to top button
  backToTop: z.object({
    enabled: z.boolean().default(true),
    style: z.enum(['circle', 'square', 'text', 'floating']).default('circle'),
    position: z.enum(['right', 'left', 'center']).default('right'),
    icon: z.string().default('arrow-up'),
    showAfter: z.number().default(300),
  }),

  // Cookie notice
  cookieNotice: z.object({
    enabled: z.boolean().default(false),
    text: z.string().default('Nous utilisons des cookies pour améliorer votre expérience.'),
    acceptText: z.string().default('Accepter'),
    rejectText: z.string().default('Refuser'),
    learnMoreText: z.string().default('En savoir plus'),
    learnMoreUrl: z.string().default('/cookies'),
    position: z.enum(['bottom', 'top']).default('bottom'),
    style: z.enum(['bar', 'popup', 'corner']).default('bar'),
  }),

  // Styles personnalisés
  styles: z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    accentColor: z.string().optional(),
    borderColor: z.string().optional(),
    fontFamily: z.string().optional(),
    fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
    customCSS: z.string().optional(),
  }),
});

// Type TypeScript dérivé du schéma
export type FooterData = z.infer<typeof footerDataSchema>;

// Valeurs par défaut complètes
export const footerDefaults: FooterData = {
  visualVariant: 'waves',

  company: {
    name: 'Mon Entreprise',
    description: 'Votre partenaire de confiance pour tous vos projets',
  },

  widgets: [
    {
      type: 'companyInfo',
      enabled: true,
      position: 1,
    },
    {
      type: 'quickLinks',
      enabled: true,
      title: 'Navigation',
      position: 2,
    },
    {
      type: 'servicesGrid',
      enabled: true,
      title: 'Nos Services',
      position: 3,
    },
    {
      type: 'contactInfo',
      enabled: true,
      title: 'Contact',
      position: 4,
    },
  ],

  newsletter: {
    enabled: true,
    title: 'Restez informé',
    description: 'Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités',
    placeholder: 'Votre email',
    buttonText: 'S\'inscrire',
    style: 'inline',
    successMessage: 'Merci pour votre inscription !',
  },

  social: {
    enabled: true,
    title: 'Suivez-nous',
    style: 'icons',
    size: 'medium',
    links: [
      { platform: 'facebook', url: 'https://facebook.com', icon: 'facebook', color: '#1877f2' },
      { platform: 'instagram', url: 'https://instagram.com', icon: 'instagram', color: '#e4405f' },
      { platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin', color: '#0077b5' },
    ],
  },

  businessHours: {
    enabled: false,
    title: 'Horaires',
    style: 'list',
    hours: [
      { day: 'Lundi - Vendredi', hours: '9h - 18h', closed: false },
      { day: 'Samedi', hours: '9h - 12h', closed: false },
      { day: 'Dimanche', hours: 'Fermé', closed: true },
    ],
  },

  certifications: {
    enabled: false,
    title: 'Nos certifications',
    style: 'logos',
    items: [],
  },

  paymentMethods: {
    enabled: false,
    title: 'Moyens de paiement',
    style: 'icons',
    methods: [
      { name: 'Visa', icon: 'visa', enabled: true },
      { name: 'Mastercard', icon: 'mastercard', enabled: true },
      { name: 'PayPal', icon: 'paypal', enabled: true },
    ],
  },

  quickLinks: {
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Tous nos services', url: '/services' },
          { label: 'Devis gratuit', url: '/contact' },
          { label: 'Réalisations', url: '/gallery' },
        ],
      },
      {
        title: 'À propos',
        links: [
          { label: 'Qui sommes-nous', url: '/about' },
          { label: 'Notre équipe', url: '/about#team' },
          { label: 'Nos valeurs', url: '/about#values' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { label: 'Blog', url: '/blog' },
          { label: 'FAQ', url: '/faq' },
          { label: 'Contact', url: '/contact' },
        ],
      },
    ],
  },

  copyright: {
    enabled: true,
    text: '© {year} {company}. Tous droits réservés.',
    position: 'center',
    showCredits: true,
    creditsText: 'Créé avec ❤️ par Awema',
    creditsUrl: 'https://awema.fr',
  },

  legal: {
    enabled: true,
    position: 'copyright',
    links: [
      { label: 'Mentions légales', url: '/legal' },
      { label: 'Confidentialité', url: '/privacy' },
      { label: 'CGV', url: '/terms' },
    ],
  },

  layout: {
    containerWidth: 'wide',
    columnsDesktop: 4,
    columnsTablet: 2,
    columnsMobile: 1,
    gap: 'large',
    padding: 'large',
    alignment: 'left',
  },

  backToTop: {
    enabled: true,
    style: 'circle',
    position: 'right',
    icon: 'arrow-up',
    showAfter: 300,
  },

  cookieNotice: {
    enabled: false,
    text: 'Nous utilisons des cookies pour améliorer votre expérience.',
    acceptText: 'Accepter',
    rejectText: 'Refuser',
    learnMoreText: 'En savoir plus',
    learnMoreUrl: '/cookies',
    position: 'bottom',
    style: 'bar',
  },

  styles: {
    fontSize: 'medium',
  },
};
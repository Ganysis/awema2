/**
 * Footer Schema V3 - Validation complète avec Zod
 */

import { z } from 'zod';
import { colorSchema, imageSchema } from '../common';

// Schema pour un lien du footer
export const footerLinkSchema = z.object({
  label: z.string().min(1, 'Le label est requis'),
  url: z.string().default('#'),
  target: z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
  icon: z.string().optional()
});

// Schema pour une colonne du footer
export const footerColumnSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  links: z.array(footerLinkSchema).min(1).default([]),
  style: z.enum(['links', 'tags', 'grid']).default('links')
});

// Schema pour les réseaux sociaux
export const socialLinkSchema = z.object({
  platform: z.enum([
    'facebook', 'twitter', 'instagram', 'linkedin', 
    'youtube', 'tiktok', 'pinterest', 'whatsapp',
    'telegram', 'discord', 'github', 'dribbble'
  ]),
  url: z.string().url('URL invalide'),
  label: z.string().optional(),
  color: colorSchema.optional()
});

// Schema pour la newsletter
export const newsletterSchema = z.object({
  enabled: z.boolean().default(false),
  title: z.string().default('Newsletter'),
  description: z.string().default('Inscrivez-vous pour recevoir nos dernières actualités'),
  placeholder: z.string().default('Votre email'),
  buttonText: z.string().default('S\'inscrire'),
  style: z.enum(['inline', 'stacked', 'minimal', 'card', 'gradient']).default('inline'),
  webhookUrl: z.string().optional(),
  successMessage: z.string().default('Merci pour votre inscription !'),
  errorMessage: z.string().default('Une erreur est survenue. Veuillez réessayer.')
});

// Schema pour les widgets dynamiques
export const footerWidgetSchema = z.object({
  type: z.enum(['recent-posts', 'opening-hours', 'contact-info', 'payment-methods', 'certifications', 'custom']),
  title: z.string(),
  content: z.any() // Contenu spécifique selon le type
});

// Schema principal du Footer
export const footerDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'minimal-elegant',
    'gradient-modern',
    'dark-corporate',
    'waves-creative',
    'glassmorphism',
    'split-sections',
    'mega-footer',
    'centered-simple'
  ]).default('minimal-elegant'),
  
  // Layout
  layout: z.object({
    columns: z.number().min(1).max(6).default(4),
    alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal')
  }),
  
  // Informations de l'entreprise
  company: z.object({
    name: z.string().default('Mon Entreprise'),
    logo: imageSchema.optional(),
    description: z.string().optional(),
    showLogo: z.boolean().default(true)
  }),
  
  // Colonnes de navigation
  columns: z.array(footerColumnSchema).default([
    {
      title: 'Services',
      links: [
        { label: 'Développement Web', url: '#dev' },
        { label: 'Design UI/UX', url: '#design' },
        { label: 'Consulting', url: '#consulting' }
      ],
      style: 'links'
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', url: '#about' },
        { label: 'Équipe', url: '#team' },
        { label: 'Carrières', url: '#careers' }
      ],
      style: 'links'
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', url: '#contact' },
        { label: 'FAQ', url: '#faq' },
        { label: 'Documentation', url: '#docs' }
      ],
      style: 'links'
    }
  ]),
  
  // Réseaux sociaux
  social: z.object({
    enabled: z.boolean().default(true),
    title: z.string().optional(),
    links: z.array(socialLinkSchema).default([
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ]),
    style: z.enum(['icons', 'buttons', 'cards', 'floating']).default('icons'),
    position: z.enum(['top', 'bottom', 'sidebar']).default('bottom')
  }),
  
  // Newsletter
  newsletter: newsletterSchema,
  
  // Widgets supplémentaires
  widgets: z.array(footerWidgetSchema).default([]),
  
  // Barre de copyright
  bottomBar: z.object({
    enabled: z.boolean().default(true),
    copyright: z.string().default('© 2024 Mon Entreprise. Tous droits réservés.'),
    links: z.array(footerLinkSchema).default([
      { label: 'Mentions légales', url: '/legal' },
      { label: 'Politique de confidentialité', url: '/privacy' },
      { label: 'CGV', url: '/terms' }
    ]),
    style: z.enum(['simple', 'split', 'centered', 'gradient']).default('simple'),
    showBackToTop: z.boolean().default(true)
  }),
  
  // Informations de contact
  contactInfo: z.object({
    enabled: z.boolean().default(true),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    hours: z.object({
      weekdays: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional()
    }).optional()
  }),
  
  // Moyens de paiement
  paymentMethods: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Moyens de paiement acceptés'),
    methods: z.array(z.enum([
      'visa', 'mastercard', 'amex', 'paypal', 
      'stripe', 'apple-pay', 'google-pay', 'bitcoin'
    ])).default(['visa', 'mastercard', 'paypal'])
  }),
  
  // Certifications
  certifications: z.object({
    enabled: z.boolean().default(false),
    title: z.string().default('Certifications'),
    items: z.array(z.object({
      name: z.string(),
      image: imageSchema,
      url: z.string().optional()
    })).default([])
  }),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    borderTop: z.boolean().default(true),
    borderStyle: z.enum(['solid', 'gradient', 'wave', 'zigzag']).default('solid')
  })
});

// Type TypeScript dérivé du schéma
export type FooterData = z.infer<typeof footerDataSchema>;

// Valeurs par défaut complètes
export const footerDefaults: FooterData = {
  variant: 'minimal-elegant',
  
  layout: {
    columns: 4,
    alignment: 'left',
    containerWidth: 'normal'
  },
  
  company: {
    name: 'Mon Entreprise',
    showLogo: true,
    description: 'Votre partenaire digital de confiance pour tous vos projets web.'
  },
  
  columns: [
    {
      title: 'Services',
      links: [
        { label: 'Développement Web', url: '#dev', target: '_self' },
        { label: 'Applications Mobiles', url: '#mobile', target: '_self' },
        { label: 'Design UI/UX', url: '#design', target: '_self' },
        { label: 'Consulting Digital', url: '#consulting', target: '_self' }
      ],
      style: 'links'
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', url: '#about', target: '_self' },
        { label: 'Notre équipe', url: '#team', target: '_self' },
        { label: 'Carrières', url: '#careers', target: '_self' },
        { label: 'Blog', url: '#blog', target: '_self' }
      ],
      style: 'links'
    },
    {
      title: 'Support',
      links: [
        { label: 'Centre d\'aide', url: '#help', target: '_self' },
        { label: 'Contact', url: '#contact', target: '_self' },
        { label: 'FAQ', url: '#faq', target: '_self' },
        { label: 'Status', url: '#status', target: '_self' }
      ],
      style: 'links'
    }
  ],
  
  social: {
    enabled: true,
    links: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ],
    style: 'icons',
    position: 'bottom'
  },
  
  newsletter: {
    enabled: false,
    title: 'Restez informé',
    description: 'Recevez nos dernières actualités et offres exclusives',
    placeholder: 'Votre adresse email',
    buttonText: 'S\'inscrire',
    style: 'inline',
    successMessage: 'Merci pour votre inscription !',
    errorMessage: 'Une erreur est survenue. Veuillez réessayer.'
  },
  
  widgets: [],
  
  bottomBar: {
    enabled: true,
    copyright: `© ${new Date().getFullYear()} Mon Entreprise. Tous droits réservés.`,
    links: [
      { label: 'Mentions légales', url: '/mentions-legales', target: '_self' },
      { label: 'Confidentialité', url: '/politique-confidentialite', target: '_self' },
      { label: 'CGV', url: '/cgv', target: '_self' },
      { label: 'Cookies', url: '/cookies', target: '_self' }
    ],
    style: 'simple',
    showBackToTop: true
  },
  
  contactInfo: {
    enabled: true,
    phone: '01 23 45 67 89',
    email: 'contact@monentreprise.fr',
    address: '123 Rue de la République, 75001 Paris'
  },
  
  paymentMethods: {
    enabled: false,
    title: 'Moyens de paiement acceptés',
    methods: ['visa', 'mastercard', 'paypal']
  },
  
  certifications: {
    enabled: false,
    title: 'Nos certifications',
    items: []
  },
  
  styles: {
    padding: 'lg',
    borderTop: true,
    borderStyle: 'solid'
  }
};
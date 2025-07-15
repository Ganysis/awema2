/**
 * Contact Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';
import { imageSchema } from '../common';

// Schema pour les informations de contact
export const contactInfoSchema = z.object({
  type: z.enum(['phone', 'email', 'address', 'hours', 'social']),
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
  link: z.string().optional()
});

// Schema pour un champ de formulaire
export const formFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio', 'file', 'date', 'time']),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.object({
    value: z.string(),
    label: z.string()
  })).optional(),
  validation: z.object({
    pattern: z.string().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    min: z.string().optional(), // Pour date/time
    max: z.string().optional()
  }).optional(),
  width: z.enum(['full', 'half', 'third']).default('full'),
  rows: z.number().optional() // Pour textarea
});

// Schema pour les horaires
export const hoursSchema = z.object({
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
  sunday: z.string().optional(),
  special: z.string().optional() // Horaires spéciaux/exceptions
});

// Schema pour la map
export const mapConfigSchema = z.object({
  enabled: z.boolean().default(true),
  provider: z.enum(['google', 'mapbox', 'openstreetmap']).default('google'),
  apiKey: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  zoom: z.number().min(1).max(20).default(15),
  style: z.enum(['roadmap', 'satellite', 'hybrid', 'terrain', 'dark', 'light']).default('roadmap'),
  markers: z.array(z.object({
    lat: z.number(),
    lng: z.number(),
    title: z.string().optional(),
    info: z.string().optional()
  })).optional()
});

// Schema principal Contact
export const contactDataSchema = z.object({
  // Variante visuelle
  variant: z.enum([
    'split-modern',       // Écran divisé moderne
    'floating-cards',     // Cartes flottantes
    'glassmorphism',      // Effet verre dépoli
    'map-fullscreen',     // Map plein écran
    'minimal-centered',   // Minimaliste centré
    'gradient-waves',     // Vagues gradient
    'sidebar-sticky',     // Sidebar collante
    'chat-style'         // Style messagerie
  ]).default('split-modern'),

  // Variante de thème (nouveau)
  themeVariant: z.enum([
    'modern',    // Design épuré et contemporain
    'minimal',   // Ultra épuré
    'bold',      // Fort impact visuel
    'elegant'    // Sophistiqué et raffiné
  ]).default('modern'),

  // Titre et description
  title: z.string().min(1).max(200).default('Contactez-nous'),
  subtitle: z.string().max(300).optional(),
  description: z.string().max(1000).optional(),
  
  // Informations de contact
  contactInfo: z.array(contactInfoSchema).default([
    {
      type: 'phone',
      label: 'Téléphone',
      value: '+33 1 23 45 67 89',
      icon: '📞'
    },
    {
      type: 'email',
      label: 'Email',
      value: 'contact@example.com',
      icon: '✉️',
      link: 'mailto:contact@example.com'
    },
    {
      type: 'address',
      label: 'Adresse',
      value: '123 Rue de la Paix, 75001 Paris',
      icon: '📍'
    }
  ]),
  
  // Horaires d'ouverture
  hours: hoursSchema.optional(),
  showHours: z.boolean().default(false),
  
  // Réseaux sociaux
  socialLinks: z.array(z.object({
    platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp', 'telegram']),
    url: z.string().url(),
    label: z.string().optional()
  })).optional(),
  
  // Configuration du formulaire
  form: z.object({
    enabled: z.boolean().default(true),
    title: z.string().default('Envoyez-nous un message'),
    fields: z.array(formFieldSchema).default([
      {
        name: 'name',
        type: 'text',
        label: 'Nom complet',
        placeholder: 'Jean Dupont',
        required: true,
        width: 'half'
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'jean@example.com',
        required: true,
        width: 'half'
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Téléphone',
        placeholder: '+33 6 12 34 56 78',
        required: false,
        width: 'half'
      },
      {
        name: 'subject',
        type: 'select',
        label: 'Sujet',
        required: true,
        width: 'half',
        options: [
          { value: 'general', label: 'Question générale' },
          { value: 'quote', label: 'Demande de devis' },
          { value: 'support', label: 'Support technique' },
          { value: 'other', label: 'Autre' }
        ]
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'Message',
        placeholder: 'Votre message...',
        required: true,
        rows: 5,
        width: 'full'
      }
    ]),
    submitButton: z.object({
      text: z.string().default('Envoyer'),
      loadingText: z.string().default('Envoi en cours...'),
      successText: z.string().default('Message envoyé !'),
      style: z.enum(['primary', 'secondary', 'gradient']).default('primary')
    }).optional(),
    consent: z.object({
      enabled: z.boolean().default(true),
      text: z.string().default('J\'accepte que mes données soient utilisées pour me recontacter'),
      required: z.boolean().default(true)
    }).optional(),
    recaptcha: z.object({
      enabled: z.boolean().default(false),
      siteKey: z.string().optional(),
      theme: z.enum(['light', 'dark']).default('light')
    }).optional()
  }).optional(),
  
  // Configuration de la map
  map: mapConfigSchema.optional(),
  
  // Options d'affichage
  displayOptions: z.object({
    layout: z.enum(['left', 'right', 'top', 'bottom', 'overlay']).default('right'),
    showMap: z.boolean().default(true),
    mapPosition: z.enum(['left', 'right', 'top', 'bottom', 'background']).default('right'),
    showContactInfo: z.boolean().default(true),
    showForm: z.boolean().default(true),
    showFAQ: z.boolean().default(false),
    showTestimonial: z.boolean().default(false)
  }).optional(),
  
  // FAQ rapide
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional(),
  
  // Témoignage
  testimonial: z.object({
    content: z.string(),
    author: z.string(),
    role: z.string().optional(),
    avatar: imageSchema.optional()
  }).optional(),
  
  // Call to action supplémentaire
  cta: z.object({
    enabled: z.boolean().default(false),
    title: z.string(),
    description: z.string().optional(),
    button: z.object({
      text: z.string(),
      link: z.string(),
      style: z.enum(['primary', 'secondary', 'outline']).default('primary')
    })
  }).optional(),
  
  // Animation
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'zoom', 'float']).default('fade'),
    duration: z.number().min(0.1).max(2).default(0.8),
    stagger: z.boolean().default(true),
    parallax: z.boolean().default(false)
  }).optional(),
  
  // Background
  background: z.object({
    type: z.enum(['color', 'gradient', 'image', 'pattern', 'video']).default('color'),
    color: z.string().optional(),
    gradient: z.object({
      angle: z.number().default(135),
      colors: z.array(z.string()).min(2).default(['#f3f4f6', '#ffffff'])
    }).optional(),
    image: imageSchema.optional(),
    pattern: z.enum(['dots', 'grid', 'waves', 'circuit']).optional(),
    overlay: z.object({
      enabled: z.boolean().default(false),
      opacity: z.number().min(0).max(1).default(0.5)
    }).optional()
  }).optional(),
  
  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
      text: z.string().optional(),
      border: z.string().optional()
    }).optional(),
    typography: z.object({
      fontFamily: z.string().optional(),
      titleSize: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      textSize: z.enum(['sm', 'md', 'lg']).optional()
    }).optional(),
    spacing: z.object({
      padding: z.string().optional(),
      gap: z.string().optional()
    }).optional()
  }).optional(),
  
  // Intégrations
  integrations: z.object({
    webhook: z.string().url().optional(),
    emailTo: z.string().email().optional(),
    slack: z.object({
      enabled: z.boolean().default(false),
      webhookUrl: z.string().url().optional(),
      channel: z.string().optional()
    }).optional(),
    mailchimp: z.object({
      enabled: z.boolean().default(false),
      apiKey: z.string().optional(),
      listId: z.string().optional()
    }).optional(),
    googleSheets: z.object({
      enabled: z.boolean().default(false),
      spreadsheetId: z.string().optional(),
      sheetName: z.string().optional()
    }).optional()
  }).optional(),
  
  // ID personnalisé
  id: z.string().optional()

}).strict();

export type ContactData = z.infer<typeof contactDataSchema>;

// Valeurs par défaut
export const contactDefaults: ContactData = {
  variant: 'split-modern',
  title: 'Contactez-nous',
  subtitle: 'Nous sommes là pour répondre à toutes vos questions',
  description: 'N\'hésitez pas à nous contacter pour toute demande d\'information, devis ou support technique.',
  contactInfo: [
    {
      type: 'phone',
      label: 'Téléphone',
      value: '+33 1 23 45 67 89',
      icon: '📞'
    },
    {
      type: 'email',
      label: 'Email',
      value: 'contact@example.com',
      icon: '✉️',
      link: 'mailto:contact@example.com'
    },
    {
      type: 'address',
      label: 'Adresse',
      value: '123 Rue de la Paix, 75001 Paris',
      icon: '📍'
    },
    {
      type: 'hours',
      label: 'Horaires',
      value: 'Lun-Ven: 9h-18h',
      icon: '🕐'
    }
  ],
  showHours: true,
  hours: {
    monday: '9h00 - 18h00',
    tuesday: '9h00 - 18h00',
    wednesday: '9h00 - 18h00',
    thursday: '9h00 - 18h00',
    friday: '9h00 - 18h00',
    saturday: '10h00 - 16h00',
    sunday: 'Fermé'
  },
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/example' },
    { platform: 'twitter', url: 'https://twitter.com/example' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/example' }
  ],
  form: {
    enabled: true,
    title: 'Envoyez-nous un message',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Nom complet',
        placeholder: 'Jean Dupont',
        required: true,
        width: 'half'
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'jean@example.com',
        required: true,
        width: 'half'
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Téléphone',
        placeholder: '+33 6 12 34 56 78',
        required: false,
        width: 'half'
      },
      {
        name: 'subject',
        type: 'select',
        label: 'Sujet',
        required: true,
        width: 'half',
        options: [
          { value: 'general', label: 'Question générale' },
          { value: 'quote', label: 'Demande de devis' },
          { value: 'support', label: 'Support technique' },
          { value: 'other', label: 'Autre' }
        ]
      },
      {
        name: 'message',
        type: 'textarea',
        label: 'Message',
        placeholder: 'Votre message...',
        required: true,
        rows: 5,
        width: 'full'
      }
    ],
    submitButton: {
      text: 'Envoyer le message',
      loadingText: 'Envoi en cours...',
      successText: 'Message envoyé avec succès !',
      style: 'primary'
    },
    consent: {
      enabled: true,
      text: 'J\'accepte que mes données soient utilisées pour me recontacter',
      required: true
    }
  },
  map: {
    enabled: true,
    provider: 'google',
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    zoom: 15,
    style: 'roadmap'
  },
  displayOptions: {
    layout: 'right',
    showMap: true,
    mapPosition: 'right',
    showContactInfo: true,
    showForm: true
  },
  animation: {
    enabled: true,
    type: 'fade',
    duration: 0.8,
    stagger: true
  }
};

// Presets pour différents cas d'usage
export const contactPresets = {
  corporate: {
    variant: 'split-modern' as const,
    title: 'Siège Social',
    subtitle: 'Contactez notre équipe commerciale',
    contactInfo: [
      {
        type: 'phone',
        label: 'Standard',
        value: '+33 1 40 50 60 70',
        icon: '☎️'
      },
      {
        type: 'phone',
        label: 'Service Commercial',
        value: '+33 1 40 50 60 71',
        icon: '📱'
      },
      {
        type: 'email',
        label: 'Email Commercial',
        value: 'sales@corporate.com',
        icon: '📧'
      },
      {
        type: 'address',
        label: 'Adresse',
        value: '1 Avenue des Champs-Élysées, 75008 Paris',
        icon: '🏢'
      }
    ],
    displayOptions: {
      layout: 'left',
      showMap: true,
      mapPosition: 'left',
      showContactInfo: true,
      showForm: true,
      showTestimonial: true
    },
    testimonial: {
      content: 'Une équipe professionnelle et réactive. Excellent service client !',
      author: 'Marie Dubois',
      role: 'Directrice Achats, TechCorp'
    }
  },
  
  support: {
    variant: 'chat-style' as const,
    title: 'Centre d\'aide',
    subtitle: 'Nous sommes là pour vous aider',
    form: {
      enabled: true,
      title: 'Comment pouvons-nous vous aider ?',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Votre nom',
          required: true,
          width: 'full'
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          width: 'full'
        },
        {
          name: 'issue_type',
          type: 'select',
          label: 'Type de problème',
          required: true,
          width: 'full',
          options: [
            { value: 'technical', label: 'Problème technique' },
            { value: 'billing', label: 'Facturation' },
            { value: 'account', label: 'Compte' },
            { value: 'other', label: 'Autre' }
          ]
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Décrivez votre problème',
          required: true,
          rows: 4,
          width: 'full'
        }
      ]
    },
    displayOptions: {
      showMap: false,
      showFAQ: true
    },
    faq: [
      {
        question: 'Comment réinitialiser mon mot de passe ?',
        answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion.'
      },
      {
        question: 'Où trouver ma facture ?',
        answer: 'Connectez-vous à votre compte et allez dans "Mes factures".'
      }
    ]
  },
  
  agency: {
    variant: 'gradient-waves' as const,
    title: 'Discutons de votre projet',
    subtitle: 'Transformons vos idées en réalité',
    cta: {
      enabled: true,
      title: 'Prêt à démarrer ?',
      description: 'Réservez un appel découverte gratuit de 30 minutes',
      button: {
        text: 'Réserver un créneau',
        link: '#calendar',
        style: 'primary'
      }
    },
    form: {
      enabled: true,
      title: 'Parlez-nous de votre projet',
      fields: [
        {
          name: 'company',
          type: 'text',
          label: 'Entreprise',
          required: true,
          width: 'half'
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nom',
          required: true,
          width: 'half'
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email professionnel',
          required: true,
          width: 'half'
        },
        {
          name: 'budget',
          type: 'select',
          label: 'Budget estimé',
          width: 'half',
          options: [
            { value: '<5k', label: 'Moins de 5 000€' },
            { value: '5k-10k', label: '5 000€ - 10 000€' },
            { value: '10k-25k', label: '10 000€ - 25 000€' },
            { value: '>25k', label: 'Plus de 25 000€' }
          ]
        },
        {
          name: 'project',
          type: 'textarea',
          label: 'Description du projet',
          placeholder: 'Décrivez votre projet en quelques lignes...',
          required: true,
          rows: 6,
          width: 'full'
        }
      ]
    }
  },
  
  restaurant: {
    variant: 'map-fullscreen' as const,
    title: 'Venez nous rendre visite',
    subtitle: 'Au cœur du quartier historique',
    contactInfo: [
      {
        type: 'phone',
        label: 'Réservations',
        value: '+33 1 23 45 67 89',
        icon: '📞'
      },
      {
        type: 'address',
        label: 'Adresse',
        value: '15 Rue de la Gastronomie, 75004 Paris',
        icon: '📍'
      }
    ],
    hours: {
      monday: 'Fermé',
      tuesday: '12h00 - 14h30, 19h00 - 22h30',
      wednesday: '12h00 - 14h30, 19h00 - 22h30',
      thursday: '12h00 - 14h30, 19h00 - 22h30',
      friday: '12h00 - 14h30, 19h00 - 23h00',
      saturday: '12h00 - 15h00, 19h00 - 23h00',
      sunday: '12h00 - 15h00',
      special: 'Fermé les jours fériés'
    },
    showHours: true,
    displayOptions: {
      layout: 'overlay',
      showMap: true,
      mapPosition: 'background',
      showForm: false
    },
    map: {
      enabled: true,
      style: 'dark',
      zoom: 17
    }
  },
  
  minimal: {
    variant: 'minimal-centered' as const,
    title: 'Hello !',
    subtitle: 'Restons en contact',
    contactInfo: [
      {
        type: 'email',
        label: '',
        value: 'hello@minimal.com'
      }
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/minimal' },
      { platform: 'twitter', url: 'https://twitter.com/minimal' }
    ],
    displayOptions: {
      showMap: false,
      showForm: false,
      showContactInfo: true
    }
  },
  
  medical: {
    variant: 'floating-cards' as const,
    title: 'Cabinet Médical',
    subtitle: 'Prise de rendez-vous en ligne',
    contactInfo: [
      {
        type: 'phone',
        label: 'Secrétariat',
        value: '+33 1 23 45 67 89',
        icon: '☎️'
      },
      {
        type: 'phone',
        label: 'Urgences',
        value: '+33 1 23 45 67 90',
        icon: '🚨'
      },
      {
        type: 'address',
        label: 'Cabinet',
        value: '50 Avenue de la Santé, 75013 Paris',
        icon: '🏥'
      }
    ],
    hours: {
      monday: '8h00 - 19h00',
      tuesday: '8h00 - 19h00',
      wednesday: '8h00 - 12h00',
      thursday: '8h00 - 19h00',
      friday: '8h00 - 19h00',
      saturday: '9h00 - 12h00',
      sunday: 'Fermé'
    },
    showHours: true,
    form: {
      enabled: true,
      title: 'Demande de rendez-vous',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom et prénom',
          required: true,
          width: 'full'
        },
        {
          name: 'phone',
          type: 'tel',
          label: 'Téléphone',
          required: true,
          width: 'half'
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          width: 'half'
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date souhaitée',
          required: true,
          width: 'half',
          validation: {
            min: new Date().toISOString().split('T')[0]
          }
        },
        {
          name: 'time',
          type: 'select',
          label: 'Créneau préféré',
          width: 'half',
          options: [
            { value: 'morning', label: 'Matin (8h-12h)' },
            { value: 'afternoon', label: 'Après-midi (14h-18h)' }
          ]
        },
        {
          name: 'reason',
          type: 'textarea',
          label: 'Motif de consultation',
          rows: 3,
          width: 'full'
        }
      ]
    }
  }
};
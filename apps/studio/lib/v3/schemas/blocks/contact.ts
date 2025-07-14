/**
 * Schéma Contact Ultra-Modern V3
 */

import { z } from 'zod';
import { 
  modernVariantSchema,
  formFieldSchema,
  buttonSchema,
  imageSchema
} from '../common';

export const contactDataSchema = z.object({
  // Variant visuel
  variant: modernVariantSchema,
  
  // Layout
  layout: z.enum(['split-left', 'split-right', 'stacked', 'floating', 'fullwidth']).default('split-right'),
  
  // Contenu
  title: z.string().min(1).max(100),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  
  // Informations de contact
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    hours: z.object({
      weekdays: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional(),
    }).optional(),
    socials: z.array(z.object({
      platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']),
      url: z.string().url(),
      username: z.string().optional(),
    })).optional(),
  }),
  
  // Formulaire
  form: z.object({
    fields: z.array(formFieldSchema).min(1).max(10),
    submitButton: buttonSchema,
    successMessage: z.string().default('Message envoyé avec succès !'),
    errorMessage: z.string().default('Une erreur est survenue. Veuillez réessayer.'),
    webhookUrl: z.string().url().optional(),
    recaptcha: z.boolean().default(false),
  }),
  
  // Map
  map: z.object({
    enabled: z.boolean().default(true),
    position: z.enum(['left', 'right', 'top', 'bottom', 'background']).default('right'),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
    zoom: z.number().min(1).max(20).default(14),
    style: z.enum(['roadmap', 'satellite', 'hybrid', 'terrain', 'custom']).default('roadmap'),
    markers: z.array(z.object({
      position: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      title: z.string().optional(),
      icon: z.string().optional(),
    })).optional(),
    apiKey: z.string().optional(),
  }).optional(),
  
  // Features visuelles
  features: z.object({
    floatingLabels: z.boolean().default(true),
    iconFields: z.boolean().default(true),
    liveValidation: z.boolean().default(true),
    smoothScroll: z.boolean().default(true),
  }).optional(),
  
  // Images/Décoration
  decorativeImage: imageSchema.optional(),
  backgroundPattern: z.enum(['none', 'dots', 'grid', 'waves']).default('none'),
});

export type ContactData = z.infer<typeof contactDataSchema>;

// Valeurs par défaut
export const contactDefaults: ContactData = {
  variant: 'split-screen',
  layout: 'split-right',
  title: 'Contactez-nous',
  subtitle: 'Nous sommes là pour vous aider',
  contactInfo: {
    phone: '01 23 45 67 89',
    email: 'contact@example.com',
  },
  form: {
    fields: [
      {
        name: 'name',
        label: 'Nom',
        type: 'text',
        required: true,
        placeholder: 'Votre nom',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'votre@email.com',
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
        placeholder: 'Votre message...',
        rows: 5,
      },
    ],
    submitButton: {
      text: 'Envoyer',
      variant: 'primary',
      size: 'lg',
      fullWidth: true,
    },
    successMessage: 'Message envoyé avec succès !',
    errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
  },
};
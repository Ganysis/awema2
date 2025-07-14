/**
 * CTA Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';
import { imageSchema } from '../common';

// Schema pour un bouton CTA
export const ctaButtonSchema = z.object({
  text: z.string().min(1).max(50),
  link: z.string().default('#'),
  style: z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
  target: z.enum(['_self', '_blank']).optional(),
  icon: z.string().optional(),
  animation: z.enum(['none', 'pulse', 'glow', 'shake', 'magnetic']).optional(),
  sound: z.enum(['click', 'hover', 'success']).optional(),
  confetti: z.boolean().optional()
});

// Schema pour le formulaire
export const ctaFormSchema = z.object({
  type: z.enum(['email', 'text', 'tel']).default('email'),
  placeholder: z.string().max(100).default('Votre email'),
  buttonText: z.string().max(50).default('Envoyer'),
  action: z.string().optional(),
  method: z.enum(['POST', 'GET']).default('POST')
});

// Schema principal CTA
export const ctaDataSchema = z.object({
  // Variante visuelle
  variant: z.enum([
    'gradient-wave',      // Vagues gradient animées
    'glassmorphism',      // Effet verre dépoli
    'split-screen',       // Écran divisé
    'floating-cards',     // Cartes flottantes
    'neon-glow',         // Lueur néon
    'parallax-layers',   // Couches parallaxe
    'morphing-shapes',   // Formes changeantes
    'video-background'   // Fond vidéo
  ]).default('gradient-wave'),

  // Contenu principal
  title: z.string().min(1).max(100).default('Prêt à commencer ?'),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  
  // Boutons CTA
  buttons: z.array(ctaButtonSchema).max(3).default([
    {
      text: 'Commencer maintenant',
      link: '#start',
      style: 'primary'
    },
    {
      text: 'En savoir plus',
      link: '#learn',
      style: 'secondary'
    }
  ]),
  
  // Formulaire (alternatif aux boutons)
  form: ctaFormSchema.optional(),
  
  // Features/Points
  features: z.array(z.object({
    icon: z.string(),
    text: z.string().max(100)
  })).max(4).optional(),
  
  // Countdown timer
  countdown: z.object({
    enabled: z.boolean().default(false),
    targetDate: z.string(), // ISO date string
    showDays: z.boolean().default(true),
    expiredText: z.string().default('Offre expirée')
  }).optional(),
  
  // Media
  image: imageSchema.optional(),
  videoUrl: z.string().url().optional(),
  
  // Background
  background: z.object({
    type: z.enum(['color', 'gradient', 'image', 'video', 'pattern']).default('gradient'),
    color: z.string().optional(),
    gradient: z.object({
      angle: z.number().default(135),
      colors: z.array(z.object({
        color: z.string(),
        position: z.number().min(0).max(100)
      })).min(2).default([
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 50 },
        { color: '#f093fb', position: 100 }
      ])
    }).optional(),
    image: imageSchema.optional(),
    pattern: z.enum(['dots', 'grid', 'waves', 'mesh']).optional(),
    overlay: z.object({
      enabled: z.boolean().default(true),
      opacity: z.number().min(0).max(1).default(0.8)
    }).optional()
  }).optional(),
  
  // Animation
  animation: z.object({
    enabled: z.boolean().default(true),
    entrance: z.enum(['fade', 'slide', 'zoom', 'bounce']).default('fade'),
    duration: z.number().min(0.1).max(2).default(0.8),
    stagger: z.boolean().default(true),
    parallax: z.boolean().default(false),
    hover: z.enum(['none', 'lift', 'glow', 'scale']).default('lift')
  }).optional(),
  
  // Layout
  layout: z.object({
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    maxWidth: z.enum(['narrow', 'normal', 'wide', 'full']).default('normal'),
    padding: z.object({
      top: z.string().default('6rem'),
      bottom: z.string().default('6rem')
    }).optional()
  }).optional(),
  
  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      accent: z.string().optional(),
      text: z.string().optional(),
      background: z.string().optional()
    }).optional(),
    typography: z.object({
      titleSize: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      titleWeight: z.enum(['400', '600', '700', '800']).optional(),
      fontFamily: z.string().optional()
    }).optional(),
    effects: z.object({
      blur: z.number().min(0).max(20).optional(),
      shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
      borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).optional()
    }).optional()
  }).optional(),
  
  // Urgency/Scarcity
  urgency: z.object({
    enabled: z.boolean().default(false),
    type: z.enum(['limited-time', 'limited-spots', 'flash-sale']).default('limited-time'),
    text: z.string().max(100),
    color: z.string().optional()
  }).optional(),
  
  // Social proof
  socialProof: z.object({
    enabled: z.boolean().default(false),
    text: z.string().max(200),
    avatars: z.array(imageSchema).max(5).optional(),
    rating: z.number().min(0).max(5).optional()
  }).optional(),
  
  // Tracking
  tracking: z.object({
    event: z.string().optional(),
    category: z.string().optional(),
    label: z.string().optional()
  }).optional(),
  
  // ID personnalisé
  id: z.string().optional()

}).strict();

export type CTAData = z.infer<typeof ctaDataSchema>;

// Valeurs par défaut
export const ctaDefaults: CTAData = {
  variant: 'gradient-wave',
  title: 'Prêt à transformer votre présence en ligne ?',
  subtitle: 'Rejoignez des milliers de professionnels satisfaits',
  description: 'Créez votre site web professionnel en quelques minutes avec notre plateforme intuitive.',
  buttons: [
    {
      text: 'Commencer gratuitement',
      link: '#start',
      style: 'primary',
      icon: '🚀',
      animation: 'pulse'
    },
    {
      text: 'Voir la démo',
      link: '#demo',
      style: 'secondary',
      icon: '▶'
    }
  ],
  features: [
    { icon: '✓', text: 'Sans engagement' },
    { icon: '🔒', text: 'Paiement sécurisé' },
    { icon: '⚡', text: 'Installation instantanée' }
  ],
  animation: {
    enabled: true,
    entrance: 'fade',
    duration: 0.8,
    stagger: true,
    parallax: false,
    hover: 'lift'
  },
  layout: {
    alignment: 'center',
    maxWidth: 'normal'
  }
};

// Presets pour différents cas d'usage
export const ctaPresets = {
  newsletter: {
    variant: 'glassmorphism' as const,
    title: 'Restez informé',
    subtitle: 'Recevez nos dernières actualités directement dans votre boîte mail',
    form: {
      type: 'email' as const,
      placeholder: 'Entrez votre email',
      buttonText: "S'inscrire"
    },
    features: [
      { icon: '📬', text: 'Newsletter hebdomadaire' },
      { icon: '🎁', text: 'Contenu exclusif' },
      { icon: '🚫', text: 'Zéro spam' }
    ]
  },
  
  sale: {
    variant: 'neon-glow' as const,
    title: 'OFFRE LIMITÉE',
    subtitle: 'Jusqu\'à -50% sur tous nos plans',
    countdown: {
      enabled: true,
      targetDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      showDays: true,
      expiredText: 'Offre terminée'
    },
    urgency: {
      enabled: true,
      type: 'flash-sale' as const,
      text: '⚡ Plus que 24 places disponibles',
      color: '#ef4444'
    },
    buttons: [
      {
        text: 'J\'en profite',
        link: '#offer',
        style: 'primary' as const,
        animation: 'shake' as const,
        confetti: true
      }
    ]
  },
  
  webinar: {
    variant: 'split-screen' as const,
    title: 'Webinar Gratuit : Boostez vos ventes',
    subtitle: 'Mardi 15 Mars à 14h00',
    description: 'Découvrez les stratégies utilisées par les meilleurs pour doubler leur chiffre d\'affaires.',
    form: {
      type: 'email' as const,
      placeholder: 'Email professionnel',
      buttonText: 'Réserver ma place'
    },
    socialProof: {
      enabled: true,
      text: '+2,847 inscrits',
      rating: 4.8
    }
  },
  
  download: {
    variant: 'floating-cards' as const,
    title: 'Téléchargez notre guide gratuit',
    subtitle: '10 étapes pour créer un site qui convertit',
    buttons: [
      {
        text: 'Télécharger le PDF',
        link: '#download',
        style: 'primary' as const,
        icon: '📥',
        sound: 'success' as const
      }
    ],
    features: [
      { icon: '📖', text: '47 pages de contenu' },
      { icon: '🎯', text: 'Exemples concrets' },
      { icon: '📊', text: 'Templates inclus' }
    ]
  },
  
  consultation: {
    variant: 'morphing-shapes' as const,
    title: 'Consultation gratuite de 30 minutes',
    subtitle: 'Parlons de votre projet',
    description: 'Nos experts sont là pour vous conseiller et vous accompagner dans votre transformation digitale.',
    buttons: [
      {
        text: 'Prendre rendez-vous',
        link: '#calendar',
        style: 'primary' as const,
        icon: '📅'
      },
      {
        text: 'Nous contacter',
        link: '#contact',
        style: 'secondary' as const,
        icon: '💬'
      }
    ]
  },
  
  trial: {
    variant: 'video-background' as const,
    title: 'Essayez gratuitement pendant 14 jours',
    subtitle: 'Aucune carte de crédit requise',
    videoUrl: 'https://example.com/background-video.mp4',
    buttons: [
      {
        text: 'Démarrer l\'essai gratuit',
        link: '#trial',
        style: 'primary' as const,
        animation: 'glow' as const
      }
    ],
    features: [
      { icon: '✅', text: 'Toutes les fonctionnalités' },
      { icon: '🔄', text: 'Annulation à tout moment' },
      { icon: '🤝', text: 'Support prioritaire' }
    ]
  }
};
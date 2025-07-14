/**
 * Hero Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';
import { imageSchema } from '../common';

// Schema pour l'éditeur avec toutes les options ergonomiques
export const heroDataSchema = z.object({
  // Variante visuelle avec preview
  variant: z.enum([
    'gradient-animated',      // Gradient animé luxueux
    'glassmorphism',         // Effet verre dépoli moderne
    'parallax-particles',    // Particules parallaxe magiques
    'video-cinematic',       // Vidéo fond cinématique
    'morphing-shapes',       // Formes morphing futuristes
    'neon-cyberpunk',        // Néon style cyberpunk
    'liquid-gradient',       // Gradient liquide organique
    'minimal-elegant'        // Minimaliste élégant
  ]).default('gradient-animated'),

  // Textes principaux
  title: z.string().min(1).max(100).default('Bienvenue sur notre site'),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(500).optional(),

  // CTA avec options avancées
  cta: z.object({
    primary: z.object({
      text: z.string().min(1).max(50),
      link: z.string(),
      icon: z.string().optional(),
      variant: z.enum(['solid', 'gradient', 'outline', 'ghost']).default('gradient'),
      size: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
      animation: z.enum(['none', 'pulse', 'glow', 'shake']).default('none')
    }).optional(),
    secondary: z.object({
      text: z.string().min(1).max(50),
      link: z.string(),
      icon: z.string().optional(),
      variant: z.enum(['solid', 'outline', 'ghost', 'link']).default('outline'),
      size: z.enum(['sm', 'md', 'lg', 'xl']).default('lg')
    }).optional()
  }).default({}),

  // Badge/Tag
  badge: z.object({
    enabled: z.boolean().default(false),
    text: z.string().max(30),
    icon: z.string().optional(),
    position: z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right']).default('top-right'),
    style: z.enum(['solid', 'gradient', 'outline']).default('gradient')
  }).optional(),

  // Features rapides
  features: z.array(z.object({
    icon: z.string(),
    text: z.string().max(50)
  })).max(4).optional(),

  // Media (image, vidéo, animation)
  media: z.object({
    enabled: z.boolean().default(false),
    type: z.enum(['image', 'video', 'lottie', '3d-model']).default('image'),
    position: z.enum(['right', 'left', 'background', 'floating']).default('right'),
    image: imageSchema.optional(),
    video: z.object({
      url: z.string().url(),
      poster: z.string().url().optional(),
      autoplay: z.boolean().default(true),
      loop: z.boolean().default(true),
      muted: z.boolean().default(true)
    }).optional(),
    lottie: z.object({
      url: z.string().url(),
      autoplay: z.boolean().default(true),
      loop: z.boolean().default(true)
    }).optional()
  }).optional(),

  // Background avancé
  background: z.object({
    type: z.enum(['color', 'gradient', 'image', 'video', 'pattern']).default('gradient'),
    color: z.string().optional(),
    gradient: z.object({
      type: z.enum(['linear', 'radial', 'conic']).default('linear'),
      angle: z.number().default(135),
      colors: z.array(z.object({
        color: z.string(),
        position: z.number().min(0).max(100)
      })).min(2).default([
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 }
      ])
    }).optional(),
    image: imageSchema.optional(),
    video: z.object({
      url: z.string().url(),
      poster: z.string().url().optional()
    }).optional(),
    pattern: z.enum(['dots', 'grid', 'lines', 'waves', 'mesh']).optional(),
    blur: z.number().min(0).max(20).default(0),
    opacity: z.number().min(0).max(1).default(1)
  }).optional(),

  // Overlay
  overlay: z.object({
    enabled: z.boolean().default(false),
    type: z.enum(['color', 'gradient', 'pattern']).default('gradient'),
    opacity: z.number().min(0).max(1).default(0.5),
    blendMode: z.enum(['normal', 'multiply', 'screen', 'overlay']).default('normal')
  }).optional(),

  // Animations
  animation: z.object({
    entrance: z.enum(['none', 'fade', 'slide', 'zoom', 'rotate']).default('fade'),
    duration: z.number().min(0.1).max(5).default(1),
    delay: z.number().min(0).max(5).default(0),
    easing: z.enum(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier']).default('ease-out'),
    onScroll: z.boolean().default(false),
    cursor: z.enum(['default', 'glow', 'trail', 'magnetic']).default('default')
  }).optional(),

  // Parallaxe
  parallax: z.object({
    enabled: z.boolean().default(false),
    speed: z.number().min(0.1).max(2).default(0.5),
    offset: z.number().default(0)
  }).optional(),

  // Layout
  layout: z.object({
    alignment: z.enum(['left', 'center', 'right']).default('left'),
    verticalAlign: z.enum(['top', 'center', 'bottom']).default('center'),
    contentWidth: z.enum(['narrow', 'normal', 'wide', 'full']).default('normal'),
    padding: z.object({
      top: z.string().default('6rem'),
      bottom: z.string().default('6rem')
    }).optional()
  }).optional(),

  // Hauteur
  height: z.enum(['auto', 'screen', 'large', 'medium', 'small', 'custom']).default('screen'),
  customHeight: z.string().optional(),

  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      accent: z.string().optional(),
      text: z.string().optional(),
      textSecondary: z.string().optional()
    }).optional(),
    typography: z.object({
      headingFont: z.string().optional(),
      headingWeight: z.enum(['300', '400', '600', '700', '800', '900']).optional(),
      bodyFont: z.string().optional(),
      letterSpacing: z.string().optional()
    }).optional(),
    spacing: z.object({
      containerPadding: z.string().optional(),
      elementGap: z.string().optional()
    }).optional()
  }).optional()

}).strict();

export type HeroData = z.infer<typeof heroDataSchema>;

// Valeurs par défaut avec toutes les options
export const heroDefaults: HeroData = {
  variant: 'gradient-animated',
  title: 'Créez des Sites Web Magnifiques',
  subtitle: 'Une plateforme moderne pour artisans et professionnels',
  description: 'Concevez, personnalisez et déployez votre site web professionnel en quelques minutes avec notre éditeur intuitif.',
  cta: {
    primary: {
      text: 'Commencer Gratuitement',
      link: '#start',
      variant: 'gradient',
      size: 'lg',
      animation: 'pulse'
    },
    secondary: {
      text: 'Voir la Démo',
      link: '#demo',
      variant: 'outline',
      size: 'lg'
    }
  },
  features: [
    { icon: '🚀', text: 'Déploiement rapide' },
    { icon: '🎨', text: 'Design moderne' },
    { icon: '📱', text: '100% responsive' },
    { icon: '⚡', text: 'Ultra performant' }
  ],
  height: 'screen',
  animation: {
    entrance: 'fade',
    duration: 1,
    delay: 0,
    easing: 'ease-out',
    onScroll: true
  }
};

// Configurations prédéfinies pour l'éditeur
export const heroPresets = {
  startup: {
    variant: 'gradient-animated',
    title: 'La Révolution du Web No-Code',
    subtitle: 'Créez votre présence en ligne sans coder',
    badge: {
      enabled: true,
      text: '🔥 Nouveau',
      style: 'gradient'
    }
  },
  agency: {
    variant: 'glassmorphism',
    title: 'Agence Digitale Créative',
    subtitle: 'Nous donnons vie à vos idées',
    media: {
      enabled: true,
      type: 'image',
      position: 'right'
    }
  },
  saas: {
    variant: 'morphing-shapes',
    title: 'Plateforme SaaS Moderne',
    subtitle: 'Automatisez votre business',
    features: [
      { icon: '🔒', text: 'Sécurisé' },
      { icon: '📊', text: 'Analytics' },
      { icon: '🌍', text: 'Global' }
    ]
  },
  portfolio: {
    variant: 'minimal-elegant',
    title: 'Designer & Développeur',
    subtitle: 'Portfolio créatif',
    layout: {
      alignment: 'center',
      verticalAlign: 'center'
    }
  },
  ecommerce: {
    variant: 'liquid-gradient',
    title: 'Collection Été 2024',
    subtitle: 'Découvrez les nouvelles tendances',
    cta: {
      primary: {
        text: 'Acheter Maintenant',
        link: '#shop',
        variant: 'solid',
        size: 'xl'
      }
    }
  }
};
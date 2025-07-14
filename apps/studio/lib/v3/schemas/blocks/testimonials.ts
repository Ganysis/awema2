/**
 * Testimonials Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { colorSchema, imageSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour un témoignage
export const testimonialItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  
  // Contenu principal
  content: z.string().min(1, 'Le contenu est requis'),
  
  // Auteur
  author: z.object({
    name: z.string().min(1, 'Le nom est requis'),
    role: z.string().optional(),
    company: z.string().optional(),
    image: imageSchema.optional(),
    verified: z.boolean().default(false)
  }),
  
  // Rating
  rating: z.number().min(0).max(5).optional(),
  
  // Date
  date: z.string().optional(), // ISO date
  
  // Source
  source: z.object({
    type: z.enum(['website', 'google', 'facebook', 'trustpilot', 'custom']).default('website'),
    name: z.string().optional(),
    url: z.string().url().optional(),
    verified: z.boolean().default(false)
  }).optional(),
  
  // Media
  media: z.object({
    type: z.enum(['none', 'image', 'video']).default('none'),
    image: imageSchema.optional(),
    video: z.object({
      url: z.string().url(),
      platform: z.enum(['youtube', 'vimeo', 'local']).default('youtube'),
      thumbnail: z.string().optional()
    }).optional()
  }).optional(),
  
  // Tags et catégories
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  
  // Mise en avant
  featured: z.boolean().default(false),
  
  // Réponse de l'entreprise
  response: z.object({
    content: z.string(),
    date: z.string(),
    author: z.string().optional()
  }).optional()
});

// Schema principal Testimonials
export const testimonialsDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'grid-cards',
    'carousel-modern',
    'masonry-pinterest',
    'list-detailed',
    'timeline-vertical',
    'slider-fullwidth',
    'quotes-minimal',
    'cards-3d'
  ]).default('grid-cards').describe('Style visuel du bloc testimonials'),
  
  // Configuration du titre
  title: z.string().default('Ce que disent nos clients'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  
  // Témoignages
  testimonials: z.array(testimonialItemSchema).min(1).default([
    {
      id: '1',
      content: 'Excellent travail ! L\'équipe a transformé notre maison au-delà de nos espérances. Professionnalisme et qualité au rendez-vous.',
      author: {
        name: 'Marie Dupont',
        role: 'Propriétaire',
        company: 'Particulier',
        verified: true
      },
      rating: 5,
      date: new Date().toISOString(),
      source: {
        type: 'google',
        verified: true
      },
      featured: true
    },
    {
      id: '2',
      content: 'Très satisfait de la rénovation de notre salle de bain. Travail soigné, délais respectés et équipe très professionnelle.',
      author: {
        name: 'Jean Martin',
        role: 'Client',
        verified: true
      },
      rating: 5,
      date: new Date().toISOString(),
      source: {
        type: 'website',
        verified: true
      }
    },
    {
      id: '3',
      content: 'Une équipe à l\'écoute qui a su comprendre nos besoins. Le résultat est parfait et le budget a été respecté.',
      author: {
        name: 'Sophie Bernard',
        role: 'Architecte',
        company: 'Atelier Design',
        verified: true
      },
      rating: 5,
      date: new Date().toISOString(),
      source: {
        type: 'facebook',
        verified: true
      }
    }
  ]),
  
  // Layout
  layout: z.object({
    columns: z.number().min(1).max(4).default(3),
    gap: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
    alignment: z.enum(['left', 'center', 'right']).default('center')
  }).default({}),
  
  // Options d'affichage
  display: z.object({
    showRating: z.boolean().default(true),
    ratingStyle: z.enum(['stars', 'numeric', 'both']).default('stars'),
    maxStars: z.number().default(5),
    
    showAuthorImage: z.boolean().default(true),
    authorImageSize: z.enum(['sm', 'md', 'lg']).default('md'),
    authorImagePosition: z.enum(['top', 'left', 'bottom']).default('top'),
    
    showDate: z.boolean().default(true),
    dateFormat: z.enum(['relative', 'short', 'full']).default('relative'),
    
    showSource: z.boolean().default(true),
    sourceStyle: z.enum(['simple', 'badge', 'link']).default('badge'),
    
    showQuoteIcon: z.boolean().default(true),
    quoteIconStyle: z.enum(['classic', 'modern', 'minimal']).default('modern'),
    quoteIconPosition: z.enum(['top-left', 'top-right', 'center']).default('top-left'),
    
    contentLength: z.enum(['full', 'truncate', 'excerpt']).default('full'),
    maxLength: z.number().default(200),
    
    showVerifiedBadge: z.boolean().default(true),
    
    cardStyle: z.enum(['flat', 'elevated', 'outlined', 'gradient', 'glassmorphism']).default('elevated'),
    cardHover: z.enum(['none', 'lift', 'scale', 'glow']).default('lift'),
    
    highlightFeatured: z.boolean().default(true),
    featuredStyle: z.enum(['border', 'background', 'badge', 'scale']).default('border'),
    
    animation: z.enum(['none', 'fade', 'slide', 'scale', 'flip']).default('fade'),
    animationDelay: z.number().default(100),
    stagger: z.boolean().default(true)
  }).default({}),
  
  // Filtrage
  filtering: z.object({
    enabled: z.boolean().default(false),
    categories: z.array(z.object({
      id: z.string(),
      label: z.string(),
      count: z.number().optional()
    })).default([]),
    sources: z.array(z.object({
      id: z.string(),
      label: z.string(),
      icon: z.string().optional()
    })).default([]),
    ratings: z.boolean().default(true),
    style: z.enum(['tabs', 'buttons', 'dropdown']).default('buttons'),
    position: z.enum(['top', 'side']).default('top')
  }).default({}),
  
  // Carousel options
  carousel: z.object({
    enabled: z.boolean().default(false),
    autoplay: z.boolean().default(true),
    autoplayDelay: z.number().default(5000),
    loop: z.boolean().default(true),
    showArrows: z.boolean().default(true),
    showDots: z.boolean().default(true),
    slidesPerView: z.number().default(3),
    spacing: z.number().default(24),
    effect: z.enum(['slide', 'fade', 'coverflow', 'flip']).default('slide')
  }).default({}),
  
  // Intégration API
  integration: z.object({
    enabled: z.boolean().default(false),
    source: z.enum(['google', 'facebook', 'trustpilot', 'custom']).default('google'),
    apiKey: z.string().optional(),
    businessId: z.string().optional(),
    autoSync: z.boolean().default(false),
    syncInterval: z.number().default(86400000), // 24h en ms
    minRating: z.number().default(4),
    maxCount: z.number().default(20)
  }).default({}),
  
  // Statistiques
  stats: z.object({
    enabled: z.boolean().default(true),
    position: z.enum(['top', 'bottom', 'side']).default('top'),
    items: z.array(z.object({
      type: z.enum(['average_rating', 'total_reviews', 'satisfaction', 'custom']),
      value: z.string(),
      label: z.string(),
      icon: z.string().optional()
    })).default([
      { type: 'average_rating', value: '4.9', label: 'Note moyenne', icon: '⭐' },
      { type: 'total_reviews', value: '250+', label: 'Avis clients', icon: '💬' },
      { type: 'satisfaction', value: '98%', label: 'Satisfaction', icon: '😊' }
    ])
  }).default({}),
  
  // Call to action
  cta: z.object({
    enabled: z.boolean().default(true),
    title: z.string().default('Rejoignez nos clients satisfaits'),
    description: z.string().default('Demandez votre devis gratuit dès aujourd\'hui'),
    buttonText: z.string().default('Demander un devis'),
    buttonLink: z.string().default('#contact'),
    buttonVariant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
    position: z.enum(['bottom', 'top']).default('bottom'),
    showReviewButton: z.boolean().default(true),
    reviewButtonText: z.string().default('Laisser un avis')
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    cardBackground: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type TestimonialsData = z.infer<typeof testimonialsDataSchema>;

// Valeurs par défaut complètes
export const testimonialsDefaults: TestimonialsData = {
  variant: 'grid-cards',
  title: 'Ce que disent nos clients',
  subtitle: 'La satisfaction de nos clients est notre priorité',
  description: 'Découvrez les témoignages de ceux qui nous ont fait confiance.',
  
  testimonials: [
    {
      id: '1',
      content: 'Excellent travail ! L\'équipe a transformé notre maison au-delà de nos espérances. Le chantier s\'est déroulé dans les temps et le budget a été respecté. Je recommande vivement !',
      author: {
        name: 'Marie Dupont',
        role: 'Propriétaire',
        company: 'Particulier',
        image: {
          src: '/images/testimonials/marie.jpg',
          alt: 'Marie Dupont'
        },
        verified: true
      },
      rating: 5,
      date: '2024-01-15T10:00:00Z',
      source: {
        type: 'google',
        name: 'Google Reviews',
        url: 'https://google.com/reviews/example',
        verified: true
      },
      featured: true,
      tags: ['rénovation', 'maison', 'satisfaction']
    },
    {
      id: '2',
      content: 'Très satisfait de la rénovation de notre salle de bain. Travail soigné, délais respectés et équipe très professionnelle. Un grand merci pour votre excellent travail !',
      author: {
        name: 'Jean Martin',
        role: 'Client',
        image: {
          src: '/images/testimonials/jean.jpg',
          alt: 'Jean Martin'
        },
        verified: true
      },
      rating: 5,
      date: '2024-01-10T14:30:00Z',
      source: {
        type: 'website',
        verified: true
      },
      tags: ['salle de bain', 'rénovation', 'professionnel']
    },
    {
      id: '3',
      content: 'Une équipe à l\'écoute qui a su comprendre nos besoins et proposer des solutions adaptées. Le résultat est parfait et le budget a été respecté. Nous sommes ravis !',
      author: {
        name: 'Sophie Bernard',
        role: 'Architecte',
        company: 'Atelier Design',
        image: {
          src: '/images/testimonials/sophie.jpg',
          alt: 'Sophie Bernard'
        },
        verified: true
      },
      rating: 5,
      date: '2024-01-05T09:15:00Z',
      source: {
        type: 'facebook',
        name: 'Facebook',
        url: 'https://facebook.com/reviews/example',
        verified: true
      },
      tags: ['architecture', 'design', 'collaboration']
    },
    {
      id: '4',
      content: 'Intervention rapide pour un dépannage plomberie. Technicien compétent et tarifs corrects. Je garde leurs coordonnées précieusement !',
      author: {
        name: 'Pierre Durand',
        role: 'Locataire',
        verified: false
      },
      rating: 4,
      date: '2023-12-20T16:45:00Z',
      source: {
        type: 'website',
        verified: true
      },
      tags: ['plomberie', 'urgence', 'dépannage']
    },
    {
      id: '5',
      content: 'Rénovation complète de notre appartement. L\'équipe a fait preuve d\'un grand professionnalisme. Les finitions sont impeccables. Merci pour ce travail remarquable !',
      author: {
        name: 'Isabelle Moreau',
        role: 'Propriétaire',
        company: 'Particulier',
        image: {
          src: '/images/testimonials/isabelle.jpg',
          alt: 'Isabelle Moreau'
        },
        verified: true
      },
      rating: 5,
      date: '2023-12-15T11:20:00Z',
      source: {
        type: 'trustpilot',
        name: 'Trustpilot',
        url: 'https://trustpilot.com/reviews/example',
        verified: true
      },
      featured: true,
      tags: ['appartement', 'rénovation complète', 'finitions']
    },
    {
      id: '6',
      content: 'Très bon rapport qualité/prix. L\'équipe est ponctuelle et le travail est bien fait. Je recommande leurs services.',
      author: {
        name: 'Laurent Petit',
        role: 'Gérant',
        company: 'Restaurant Le Gourmet',
        verified: true
      },
      rating: 4,
      date: '2023-12-10T13:00:00Z',
      source: {
        type: 'google',
        verified: true
      },
      tags: ['restaurant', 'professionnel', 'qualité']
    }
  ],
  
  layout: {
    columns: 3,
    gap: 'lg',
    containerWidth: 'normal',
    alignment: 'center'
  },
  
  display: {
    showRating: true,
    ratingStyle: 'stars',
    maxStars: 5,
    showAuthorImage: true,
    authorImageSize: 'md',
    authorImagePosition: 'top',
    showDate: true,
    dateFormat: 'relative',
    showSource: true,
    sourceStyle: 'badge',
    showQuoteIcon: true,
    quoteIconStyle: 'modern',
    quoteIconPosition: 'top-left',
    contentLength: 'full',
    maxLength: 200,
    showVerifiedBadge: true,
    cardStyle: 'elevated',
    cardHover: 'lift',
    highlightFeatured: true,
    featuredStyle: 'border',
    animation: 'fade',
    animationDelay: 100,
    stagger: true
  },
  
  filtering: {
    enabled: false,
    categories: [],
    sources: [
      { id: 'all', label: 'Toutes les sources' },
      { id: 'google', label: 'Google', icon: '🌐' },
      { id: 'facebook', label: 'Facebook', icon: '📘' },
      { id: 'trustpilot', label: 'Trustpilot', icon: '⭐' },
      { id: 'website', label: 'Site web', icon: '🌍' }
    ],
    ratings: true,
    style: 'buttons',
    position: 'top'
  },
  
  carousel: {
    enabled: false,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    showArrows: true,
    showDots: true,
    slidesPerView: 3,
    spacing: 24,
    effect: 'slide'
  },
  
  integration: {
    enabled: false,
    source: 'google',
    autoSync: false,
    syncInterval: 86400000,
    minRating: 4,
    maxCount: 20
  },
  
  stats: {
    enabled: true,
    position: 'top',
    items: [
      { type: 'average_rating', value: '4.9/5', label: 'Note moyenne', icon: '⭐' },
      { type: 'total_reviews', value: '250+', label: 'Avis vérifiés', icon: '💬' },
      { type: 'satisfaction', value: '98%', label: 'Clients satisfaits', icon: '😊' }
    ]
  },
  
  cta: {
    enabled: true,
    title: 'Rejoignez nos clients satisfaits',
    description: 'Demandez votre devis gratuit et sans engagement',
    buttonText: 'Obtenir un devis',
    buttonLink: '#contact',
    buttonVariant: 'primary',
    position: 'bottom',
    showReviewButton: true,
    reviewButtonText: 'Laisser un avis'
  },
  
  styles: {
    padding: 'lg',
    borderRadius: 'lg',
    shadow: 'md'
  }
};

// Logger de validation
testimonialsDataSchema._parse = new Proxy(testimonialsDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('testimonialsDataSchema', 'parse', 'Validation des données Testimonials', { 
      hasData: !!args[0],
      testimonialsCount: args[0]?.testimonials?.length || 0
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('testimonialsDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('testimonialsDataSchema', 'parse', '✅ Validation réussie', {
        testimonialsCount: result.data.testimonials.length,
        variant: result.data.variant,
        hasStats: result.data.stats.enabled
      });
    }
    
    return result;
  }
});
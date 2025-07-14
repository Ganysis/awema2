/**
 * Testimonials Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';
import { imageSchema } from '../common';

// Schema pour un témoignage
export const testimonialSchema = z.object({
  id: z.string().optional(),
  author: z.object({
    name: z.string().min(1).max(100),
    role: z.string().max(100).optional(),
    company: z.string().max(100).optional(),
    location: z.string().max(100).optional(),
    avatar: imageSchema.optional(),
    verified: z.boolean().optional()
  }),
  content: z.string().min(10).max(1000),
  rating: z.number().min(0).max(5).optional(),
  date: z.string().optional(),
  source: z.enum(['google', 'facebook', 'trustpilot', 'website', 'video']).optional(),
  videoUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  likes: z.number().optional(),
  helpful: z.object({
    yes: z.number().default(0),
    no: z.number().default(0)
  }).optional()
});

// Schema pour les statistiques
export const testimonialsStatsSchema = z.object({
  averageRating: z.number().min(0).max(5),
  totalReviews: z.number(),
  distribution: z.object({
    5: z.number(),
    4: z.number(),
    3: z.number(),
    2: z.number(),
    1: z.number()
  }).optional(),
  verified: z.number().optional()
});

// Schema principal Testimonials
export const testimonialsDataSchema = z.object({
  // Variante visuelle
  variant: z.enum([
    'carousel-modern',     // Carrousel moderne avec navigation
    'grid-masonry',       // Grille masonry dynamique
    'wall-infinite',      // Mur infini défilant
    'cards-3d',          // Cartes 3D interactives
    'timeline-animated',  // Timeline avec animations
    'video-spotlight',    // Focus sur vidéos
    'social-proof',      // Preuve sociale avancée
    'interactive-map'    // Carte interactive avec témoignages
  ]).default('carousel-modern'),

  // Titre et description
  title: z.string().min(1).max(200).default('Ce que disent nos clients'),
  subtitle: z.string().max(300).optional(),
  
  // Témoignages
  testimonials: z.array(testimonialSchema).min(1).default([
    {
      author: {
        name: 'Sophie Martin',
        role: 'Directrice Marketing',
        company: 'TechCorp',
        avatar: { url: '/images/avatar1.jpg', alt: 'Sophie Martin' },
        verified: true
      },
      content: 'Service exceptionnel ! L\'équipe a transformé notre présence en ligne. Notre trafic a augmenté de 200% en 3 mois.',
      rating: 5,
      date: '2024-01-15',
      source: 'google',
      featured: true
    },
    {
      author: {
        name: 'Jean Dupont',
        role: 'CEO',
        company: 'StartupX',
        location: 'Paris, France'
      },
      content: 'Professionnalisme et créativité au rendez-vous. Je recommande vivement leurs services.',
      rating: 5,
      date: '2024-01-10',
      source: 'trustpilot'
    },
    {
      author: {
        name: 'Marie Leblanc',
        role: 'Responsable Communication',
        company: 'Agence360'
      },
      content: 'Une collaboration fluide et des résultats qui dépassent nos attentes. Merci pour votre excellent travail !',
      rating: 5,
      date: '2024-01-05',
      source: 'facebook'
    }
  ]),
  
  // Statistiques
  showStats: z.boolean().default(true),
  stats: testimonialsStatsSchema.optional(),
  
  // Options d'affichage
  displayOptions: z.object({
    showRating: z.boolean().default(true),
    showDate: z.boolean().default(true),
    showSource: z.boolean().default(true),
    showAvatar: z.boolean().default(true),
    showCompany: z.boolean().default(true),
    showLocation: z.boolean().default(false),
    showVerified: z.boolean().default(true),
    showLikes: z.boolean().default(false),
    showHelpful: z.boolean().default(false),
    autoplay: z.boolean().default(true),
    autoplaySpeed: z.number().min(2000).max(10000).default(5000),
    itemsPerView: z.object({
      desktop: z.number().min(1).max(6).default(3),
      tablet: z.number().min(1).max(4).default(2),
      mobile: z.number().min(1).max(2).default(1)
    }).optional()
  }).optional(),
  
  // Filtres et tri
  filters: z.object({
    enabled: z.boolean().default(false),
    categories: z.array(z.string()).optional(),
    sortBy: z.enum(['date', 'rating', 'helpful']).default('date'),
    showSearch: z.boolean().default(false)
  }).optional(),
  
  // Call to action
  cta: z.object({
    enabled: z.boolean().default(true),
    text: z.string().default('Laisser un avis'),
    link: z.string().default('#review'),
    style: z.enum(['button', 'link', 'floating']).default('button')
  }).optional(),
  
  // Intégrations
  integrations: z.object({
    googleReviews: z.object({
      enabled: z.boolean().default(false),
      placeId: z.string().optional(),
      apiKey: z.string().optional()
    }).optional(),
    trustpilot: z.object({
      enabled: z.boolean().default(false),
      businessId: z.string().optional()
    }).optional(),
    facebook: z.object({
      enabled: z.boolean().default(false),
      pageId: z.string().optional()
    }).optional()
  }).optional(),
  
  // Animation
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'zoom', 'flip']).default('fade'),
    duration: z.number().min(0.1).max(2).default(0.6),
    stagger: z.boolean().default(true),
    parallax: z.boolean().default(false),
    hover: z.enum(['none', 'lift', 'glow', 'scale']).default('lift')
  }).optional(),
  
  // Layout
  layout: z.object({
    maxWidth: z.enum(['narrow', 'normal', 'wide', 'full']).default('wide'),
    padding: z.object({
      top: z.string().default('6rem'),
      bottom: z.string().default('6rem')
    }).optional(),
    gap: z.enum(['sm', 'md', 'lg']).default('md')
  }).optional(),
  
  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
      cardBg: z.string().optional(),
      text: z.string().optional(),
      rating: z.string().optional()
    }).optional(),
    typography: z.object({
      fontFamily: z.string().optional(),
      quoteSize: z.enum(['sm', 'md', 'lg']).optional(),
      quoteStyle: z.enum(['normal', 'italic']).optional()
    }).optional(),
    card: z.object({
      shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
      borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
      border: z.boolean().optional()
    }).optional()
  }).optional(),
  
  // ID personnalisé
  id: z.string().optional()

}).strict();

export type TestimonialsData = z.infer<typeof testimonialsDataSchema>;

// Valeurs par défaut
export const testimonialsDefaults: TestimonialsData = {
  variant: 'carousel-modern',
  title: 'Ce que disent nos clients',
  subtitle: 'Plus de 1000 professionnels nous font confiance',
  testimonials: [
    {
      author: {
        name: 'Sophie Martin',
        role: 'Directrice Marketing',
        company: 'TechCorp',
        avatar: { url: '/images/avatar1.jpg', alt: 'Sophie Martin' },
        verified: true
      },
      content: 'Service exceptionnel ! L\'équipe a transformé notre présence en ligne. Notre trafic a augmenté de 200% en 3 mois. Je recommande vivement.',
      rating: 5,
      date: '2024-01-15',
      source: 'google',
      featured: true,
      category: 'Marketing'
    },
    {
      author: {
        name: 'Jean Dupont',
        role: 'CEO',
        company: 'StartupX',
        location: 'Paris, France'
      },
      content: 'Professionnalisme et créativité au rendez-vous. L\'équipe a su comprendre nos besoins et livrer un site qui dépasse nos attentes.',
      rating: 5,
      date: '2024-01-10',
      source: 'trustpilot',
      category: 'Business'
    },
    {
      author: {
        name: 'Marie Leblanc',
        role: 'Responsable Communication',
        company: 'Agence360'
      },
      content: 'Une collaboration fluide du début à la fin. Les délais ont été respectés et le résultat est magnifique. Merci !',
      rating: 5,
      date: '2024-01-05',
      source: 'facebook',
      category: 'Communication'
    }
  ],
  showStats: true,
  stats: {
    averageRating: 4.8,
    totalReviews: 1247,
    distribution: {
      5: 980,
      4: 215,
      3: 40,
      2: 10,
      1: 2
    },
    verified: 1150
  },
  displayOptions: {
    showRating: true,
    showDate: true,
    showSource: true,
    showAvatar: true,
    showCompany: true,
    showVerified: true,
    autoplay: true,
    autoplaySpeed: 5000
  },
  animation: {
    enabled: true,
    type: 'fade',
    duration: 0.6,
    stagger: true,
    hover: 'lift'
  }
};

// Presets pour différents cas d'usage
export const testimonialsPresets = {
  ecommerce: {
    variant: 'grid-masonry' as const,
    title: 'Avis clients vérifiés',
    testimonials: [
      {
        author: {
          name: 'Claire D.',
          verified: true
        },
        content: 'Produit conforme à la description. Livraison rapide. Je recommande !',
        rating: 5,
        date: '2024-01-20',
        source: 'website',
        helpful: { yes: 42, no: 2 }
      },
      {
        author: {
          name: 'Thomas M.',
          verified: true
        },
        content: 'Excellent rapport qualité/prix. Service client au top.',
        rating: 4,
        date: '2024-01-18',
        source: 'website',
        helpful: { yes: 28, no: 1 }
      }
    ],
    displayOptions: {
      showHelpful: true,
      showVerified: true,
      showRating: true
    },
    filters: {
      enabled: true,
      sortBy: 'helpful',
      showSearch: true
    }
  },
  
  corporate: {
    variant: 'video-spotlight' as const,
    title: 'Témoignages clients',
    subtitle: 'Découvrez les success stories de nos partenaires',
    testimonials: [
      {
        author: {
          name: 'Philippe Moreau',
          role: 'Directeur Général',
          company: 'Groupe Industriel SA',
          avatar: { url: '/images/philippe.jpg', alt: 'Philippe Moreau' }
        },
        content: 'Une transformation digitale réussie grâce à leur expertise. ROI impressionnant.',
        rating: 5,
        videoUrl: 'https://example.com/testimonial1.mp4',
        featured: true
      }
    ],
    displayOptions: {
      showCompany: true,
      showLocation: true,
      autoplay: false
    }
  },
  
  service: {
    variant: 'timeline-animated' as const,
    title: 'Parcours clients',
    subtitle: 'Suivez l\'évolution de nos collaborations',
    testimonials: [
      {
        author: {
          name: 'Restaurant Le Gourmet',
          role: 'Client depuis 2022'
        },
        content: 'Début de collaboration : création du site web. Augmentation de 150% des réservations en ligne.',
        date: '2022-03-15',
        category: 'Phase 1'
      },
      {
        author: {
          name: 'Restaurant Le Gourmet',
          role: 'Client depuis 2022'
        },
        content: 'Ajout du système de commande en ligne. Nouveau canal de revenus générant 30% du CA.',
        date: '2023-01-10',
        category: 'Phase 2'
      }
    ]
  },
  
  socialProof: {
    variant: 'social-proof' as const,
    title: 'Ils nous font confiance',
    showStats: true,
    stats: {
      averageRating: 4.9,
      totalReviews: 5432,
      verified: 5300
    },
    integrations: {
      googleReviews: { enabled: true },
      trustpilot: { enabled: true },
      facebook: { enabled: true }
    },
    displayOptions: {
      showSource: true,
      showVerified: true,
      itemsPerView: {
        desktop: 4,
        tablet: 2,
        mobile: 1
      }
    }
  },
  
  minimal: {
    variant: 'cards-3d' as const,
    title: 'Témoignages',
    testimonials: [
      {
        author: { name: 'Anna K.' },
        content: 'Simplicité et efficacité. Exactement ce que je cherchais.',
        rating: 5
      },
      {
        author: { name: 'Marc L.' },
        content: 'Interface intuitive et résultats professionnels.',
        rating: 5
      }
    ],
    displayOptions: {
      showRating: true,
      showDate: false,
      showSource: false,
      showCompany: false
    },
    animation: {
      enabled: true,
      type: 'flip',
      hover: 'scale'
    }
  },
  
  mapBased: {
    variant: 'interactive-map' as const,
    title: 'Nos clients dans le monde',
    subtitle: 'Cliquez sur les marqueurs pour découvrir leurs témoignages',
    testimonials: [
      {
        author: {
          name: 'Tech Solutions',
          location: 'Paris, France'
        },
        content: 'Partenaire de confiance pour notre expansion européenne.',
        rating: 5
      },
      {
        author: {
          name: 'Global Corp',
          location: 'New York, USA'
        },
        content: 'Excellence in digital transformation services.',
        rating: 5
      }
    ],
    displayOptions: {
      showLocation: true,
      showAvatar: true
    }
  }
};
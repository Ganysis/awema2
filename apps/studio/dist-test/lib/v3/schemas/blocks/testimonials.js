"use strict";
/**
 * Testimonials Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialsDefaults = exports.testimonialsDataSchema = exports.testimonialItemSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour un témoignage
exports.testimonialItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => crypto.randomUUID()),
    // Contenu principal
    content: zod_1.z.string().min(1, 'Le contenu est requis'),
    // Auteur
    author: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Le nom est requis'),
        role: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        image: common_1.imageSchema.optional(),
        verified: zod_1.z.boolean().default(false)
    }),
    // Rating
    rating: zod_1.z.number().min(0).max(5).optional(),
    // Date
    date: zod_1.z.string().optional(), // ISO date
    // Source
    source: zod_1.z.object({
        type: zod_1.z.enum(['website', 'google', 'facebook', 'trustpilot', 'custom']).default('website'),
        name: zod_1.z.string().optional(),
        url: zod_1.z.string().url().optional(),
        verified: zod_1.z.boolean().default(false)
    }).optional(),
    // Media
    media: zod_1.z.object({
        type: zod_1.z.enum(['none', 'image', 'video']).default('none'),
        image: common_1.imageSchema.optional(),
        video: zod_1.z.object({
            url: zod_1.z.string().url(),
            platform: zod_1.z.enum(['youtube', 'vimeo', 'local']).default('youtube'),
            thumbnail: zod_1.z.string().optional()
        }).optional()
    }).optional(),
    // Tags et catégories
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    // Mise en avant
    featured: zod_1.z.boolean().default(false),
    // Réponse de l'entreprise
    response: zod_1.z.object({
        content: zod_1.z.string(),
        date: zod_1.z.string(),
        author: zod_1.z.string().optional()
    }).optional()
});
// Schema principal Testimonials
exports.testimonialsDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
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
    title: zod_1.z.string().default('Ce que disent nos clients'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Témoignages
    testimonials: zod_1.z.array(exports.testimonialItemSchema).min(1).default([
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
    layout: zod_1.z.object({
        columns: zod_1.z.number().min(1).max(4).default(3),
        gap: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('center')
    }).default({}),
    // Options d'affichage
    display: zod_1.z.object({
        showRating: zod_1.z.boolean().default(true),
        ratingStyle: zod_1.z.enum(['stars', 'numeric', 'both']).default('stars'),
        maxStars: zod_1.z.number().default(5),
        showAuthorImage: zod_1.z.boolean().default(true),
        authorImageSize: zod_1.z.enum(['sm', 'md', 'lg']).default('md'),
        authorImagePosition: zod_1.z.enum(['top', 'left', 'bottom']).default('top'),
        showDate: zod_1.z.boolean().default(true),
        dateFormat: zod_1.z.enum(['relative', 'short', 'full']).default('relative'),
        showSource: zod_1.z.boolean().default(true),
        sourceStyle: zod_1.z.enum(['simple', 'badge', 'link']).default('badge'),
        showQuoteIcon: zod_1.z.boolean().default(true),
        quoteIconStyle: zod_1.z.enum(['classic', 'modern', 'minimal']).default('modern'),
        quoteIconPosition: zod_1.z.enum(['top-left', 'top-right', 'center']).default('top-left'),
        contentLength: zod_1.z.enum(['full', 'truncate', 'excerpt']).default('full'),
        maxLength: zod_1.z.number().default(200),
        showVerifiedBadge: zod_1.z.boolean().default(true),
        cardStyle: zod_1.z.enum(['flat', 'elevated', 'outlined', 'gradient', 'glassmorphism']).default('elevated'),
        cardHover: zod_1.z.enum(['none', 'lift', 'scale', 'glow']).default('lift'),
        highlightFeatured: zod_1.z.boolean().default(true),
        featuredStyle: zod_1.z.enum(['border', 'background', 'badge', 'scale']).default('border'),
        animation: zod_1.z.enum(['none', 'fade', 'slide', 'scale', 'flip']).default('fade'),
        animationDelay: zod_1.z.number().default(100),
        stagger: zod_1.z.boolean().default(true)
    }).default({}),
    // Filtrage
    filtering: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        categories: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            label: zod_1.z.string(),
            count: zod_1.z.number().optional()
        })).default([]),
        sources: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            label: zod_1.z.string(),
            icon: zod_1.z.string().optional()
        })).default([]),
        ratings: zod_1.z.boolean().default(true),
        style: zod_1.z.enum(['tabs', 'buttons', 'dropdown']).default('buttons'),
        position: zod_1.z.enum(['top', 'side']).default('top')
    }).default({}),
    // Carousel options
    carousel: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        autoplay: zod_1.z.boolean().default(true),
        autoplayDelay: zod_1.z.number().default(5000),
        loop: zod_1.z.boolean().default(true),
        showArrows: zod_1.z.boolean().default(true),
        showDots: zod_1.z.boolean().default(true),
        slidesPerView: zod_1.z.number().default(3),
        spacing: zod_1.z.number().default(24),
        effect: zod_1.z.enum(['slide', 'fade', 'coverflow', 'flip']).default('slide')
    }).default({}),
    // Intégration API
    integration: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        source: zod_1.z.enum(['google', 'facebook', 'trustpilot', 'custom']).default('google'),
        apiKey: zod_1.z.string().optional(),
        businessId: zod_1.z.string().optional(),
        autoSync: zod_1.z.boolean().default(false),
        syncInterval: zod_1.z.number().default(86400000), // 24h en ms
        minRating: zod_1.z.number().default(4),
        maxCount: zod_1.z.number().default(20)
    }).default({}),
    // Statistiques
    stats: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        position: zod_1.z.enum(['top', 'bottom', 'side']).default('top'),
        items: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.enum(['average_rating', 'total_reviews', 'satisfaction', 'custom']),
            value: zod_1.z.string(),
            label: zod_1.z.string(),
            icon: zod_1.z.string().optional()
        })).default([
            { type: 'average_rating', value: '4.9', label: 'Note moyenne', icon: '⭐' },
            { type: 'total_reviews', value: '250+', label: 'Avis clients', icon: '💬' },
            { type: 'satisfaction', value: '98%', label: 'Satisfaction', icon: '😊' }
        ])
    }).default({}),
    // Call to action
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        title: zod_1.z.string().default('Rejoignez nos clients satisfaits'),
        description: zod_1.z.string().default('Demandez votre devis gratuit dès aujourd\'hui'),
        buttonText: zod_1.z.string().default('Demander un devis'),
        buttonLink: zod_1.z.string().default('#contact'),
        buttonVariant: zod_1.z.enum(['primary', 'secondary', 'outline']).default('primary'),
        position: zod_1.z.enum(['bottom', 'top']).default('bottom'),
        showReviewButton: zod_1.z.boolean().default(true),
        reviewButtonText: zod_1.z.string().default('Laisser un avis')
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        backgroundColor: common_1.colorSchema.optional(),
        textColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        cardBackground: common_1.colorSchema.optional(),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md')
    }).default({})
});
// Valeurs par défaut complètes
exports.testimonialsDefaults = {
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
exports.testimonialsDataSchema._parse = new Proxy(exports.testimonialsDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('testimonialsDataSchema', 'parse', 'Validation des données Testimonials', {
            hasData: !!args[0],
            testimonialsCount: args[0]?.testimonials?.length || 0
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('testimonialsDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('testimonialsDataSchema', 'parse', '✅ Validation réussie', {
                testimonialsCount: result.data.testimonials.length,
                variant: result.data.variant,
                hasStats: result.data.stats.enabled
            });
        }
        return result;
    }
});

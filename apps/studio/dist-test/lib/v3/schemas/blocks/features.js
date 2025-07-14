"use strict";
/**
 * Features Schema V3 - Validation complète avec Zod
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresDefaults = exports.featuresDataSchema = exports.featureItemSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour une feature individuelle
exports.featureItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => {
        const id = crypto.randomUUID();
        logger_1.logger.debug('featureItemSchema', 'generate', `Génération ID feature: ${id}`);
        return id;
    }),
    title: zod_1.z.string().min(1, 'Le titre est requis'),
    description: zod_1.z.string().min(1, 'La description est requise'),
    icon: zod_1.z.union([
        zod_1.z.string(), // SVG ou classe d'icône
        zod_1.z.object({
            type: zod_1.z.enum(['svg', 'class', 'emoji', 'image']),
            value: zod_1.z.string(),
            color: common_1.colorSchema.optional()
        })
    ]).optional(),
    image: common_1.imageSchema.optional(),
    badge: zod_1.z.object({
        text: zod_1.z.string(),
        color: zod_1.z.enum(['primary', 'secondary', 'success', 'warning', 'error', 'info']).default('primary')
    }).optional(),
    link: zod_1.z.object({
        url: zod_1.z.string().default('#'),
        text: zod_1.z.string().default('En savoir plus'),
        target: zod_1.z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
        style: zod_1.z.enum(['link', 'button', 'arrow']).default('link')
    }).optional(),
    category: zod_1.z.string().optional(),
    highlight: zod_1.z.boolean().default(false),
    stats: zod_1.z.object({
        value: zod_1.z.string(),
        label: zod_1.z.string(),
        trend: zod_1.z.enum(['up', 'down', 'stable']).optional()
    }).optional(),
    customData: zod_1.z.record(zod_1.z.any()).optional()
});
// Schema principal Features
exports.featuresDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
        'grid-modern',
        'cards-hover',
        'timeline-vertical',
        'carousel-3d',
        'tabs-animated',
        'masonry-creative',
        'comparison-table',
        'flip-cards'
    ]).default('grid-modern').describe('Style visuel du bloc features'),
    // Configuration du titre
    title: zod_1.z.string().default('Nos Services'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Layout
    layout: zod_1.z.object({
        columns: zod_1.z.number().min(1).max(6).default(3),
        gap: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('center'),
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal')
    }).default({
        columns: 3,
        gap: 'md',
        alignment: 'center',
        containerWidth: 'normal'
    }),
    // Features
    features: zod_1.z.array(exports.featureItemSchema).min(1).default([
        {
            id: '1',
            title: 'Performance Optimale',
            description: 'Des sites web ultra-rapides optimisés pour une expérience utilisateur exceptionnelle.',
            icon: '⚡',
            highlight: true
        },
        {
            id: '2',
            title: 'Design Moderne',
            description: 'Interfaces élégantes et intuitives qui captivent vos visiteurs.',
            icon: '🎨',
            highlight: false
        },
        {
            id: '3',
            title: 'SEO Avancé',
            description: 'Optimisation complète pour un meilleur référencement sur les moteurs de recherche.',
            icon: '🔍',
            highlight: false
        }
    ]),
    // Options d'affichage
    display: zod_1.z.object({
        showIcon: zod_1.z.boolean().default(true),
        iconStyle: zod_1.z.enum(['filled', 'outline', 'gradient', 'shadow', 'animated']).default('filled'),
        iconSize: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
        iconPosition: zod_1.z.enum(['top', 'left', 'right']).default('top'),
        showImage: zod_1.z.boolean().default(false),
        imageStyle: zod_1.z.enum(['cover', 'contain', 'rounded', 'circle']).default('rounded'),
        imageRatio: zod_1.z.enum(['1:1', '4:3', '16:9', '3:2']).default('16:9'),
        showBadge: zod_1.z.boolean().default(false),
        showStats: zod_1.z.boolean().default(false),
        showLink: zod_1.z.boolean().default(true),
        showCategory: zod_1.z.boolean().default(false),
        cardStyle: zod_1.z.enum(['flat', 'elevated', 'outlined', 'glassmorphism', 'gradient']).default('elevated'),
        cardHover: zod_1.z.enum(['none', 'lift', 'scale', 'glow', 'rotate']).default('lift'),
        animation: zod_1.z.enum(['none', 'fade', 'slide', 'zoom', 'flip', 'bounce']).default('fade'),
        animationDelay: zod_1.z.number().default(100),
        stagger: zod_1.z.boolean().default(true)
    }).default({}),
    // Filtres et catégories
    filtering: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        categories: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            label: zod_1.z.string(),
            count: zod_1.z.number().optional()
        })).default([]),
        defaultCategory: zod_1.z.string().optional(),
        style: zod_1.z.enum(['buttons', 'tabs', 'dropdown', 'tags']).default('buttons'),
        position: zod_1.z.enum(['top', 'left', 'right']).default('top'),
        showAll: zod_1.z.boolean().default(true),
        allLabel: zod_1.z.string().default('Tous')
    }).default({}),
    // Mode timeline
    timeline: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        lineStyle: zod_1.z.enum(['solid', 'dashed', 'gradient']).default('solid'),
        linePosition: zod_1.z.enum(['left', 'center', 'alternate']).default('center'),
        showDates: zod_1.z.boolean().default(true),
        dateFormat: zod_1.z.enum(['short', 'long', 'relative']).default('short')
    }).default({}),
    // Mode carousel
    carousel: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        autoplay: zod_1.z.boolean().default(true),
        autoplayDelay: zod_1.z.number().min(1000).max(10000).default(5000),
        loop: zod_1.z.boolean().default(true),
        showDots: zod_1.z.boolean().default(true),
        showArrows: zod_1.z.boolean().default(true),
        slidesPerView: zod_1.z.object({
            desktop: zod_1.z.number().default(3),
            tablet: zod_1.z.number().default(2),
            mobile: zod_1.z.number().default(1)
        }).default({
            desktop: 3,
            tablet: 2,
            mobile: 1
        }),
        effect: zod_1.z.enum(['slide', 'fade', 'cube', 'coverflow', 'flip']).default('slide'),
        gap: zod_1.z.number().default(20)
    }).default({}),
    // Mode comparison
    comparison: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        headers: zod_1.z.array(zod_1.z.string()).default([]),
        showToggle: zod_1.z.boolean().default(false),
        highlightBest: zod_1.z.boolean().default(true),
        stickyHeader: zod_1.z.boolean().default(true)
    }).default({}),
    // Call to action
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        text: zod_1.z.string().default('Voir tous nos services'),
        link: zod_1.z.string().default('#services'),
        variant: zod_1.z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
        position: zod_1.z.enum(['bottom', 'top']).default('bottom')
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        backgroundColor: common_1.colorSchema.optional(),
        textColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).default('lg'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md')
    }).default({})
});
// Valeurs par défaut complètes
exports.featuresDefaults = {
    variant: 'grid-modern',
    title: 'Nos Services',
    subtitle: 'Des solutions adaptées à vos besoins',
    description: 'Découvrez comment nous pouvons vous aider à atteindre vos objectifs.',
    layout: {
        columns: 3,
        gap: 'md',
        alignment: 'center',
        containerWidth: 'normal'
    },
    features: [
        {
            id: '1',
            title: 'Développement Web',
            description: 'Sites web modernes et applications sur mesure avec les dernières technologies.',
            icon: {
                type: 'emoji',
                value: '💻'
            },
            highlight: true,
            category: 'development',
            link: {
                url: '#dev-web',
                text: 'En savoir plus',
                target: '_self',
                style: 'arrow'
            }
        },
        {
            id: '2',
            title: 'Design UI/UX',
            description: 'Interfaces utilisateur intuitives et expériences engageantes pour vos utilisateurs.',
            icon: {
                type: 'emoji',
                value: '🎨'
            },
            highlight: false,
            category: 'design',
            link: {
                url: '#design',
                text: 'En savoir plus',
                target: '_self',
                style: 'arrow'
            }
        },
        {
            id: '3',
            title: 'SEO & Marketing',
            description: 'Stratégies de référencement et marketing digital pour booster votre visibilité.',
            icon: {
                type: 'emoji',
                value: '📈'
            },
            highlight: false,
            category: 'marketing',
            link: {
                url: '#seo',
                text: 'En savoir plus',
                target: '_self',
                style: 'arrow'
            }
        },
        {
            id: '4',
            title: 'E-commerce',
            description: 'Solutions e-commerce complètes pour vendre en ligne efficacement.',
            icon: {
                type: 'emoji',
                value: '🛒'
            },
            highlight: false,
            category: 'development',
            link: {
                url: '#ecommerce',
                text: 'En savoir plus',
                target: '_self',
                style: 'arrow'
            }
        },
        {
            id: '5',
            title: 'Applications Mobiles',
            description: 'Applications natives et hybrides pour iOS et Android.',
            icon: {
                type: 'emoji',
                value: '📱'
            },
            highlight: false,
            category: 'development',
            link: {
                url: '#mobile',
                text: 'En savoir plus',
                target: '_self',
                style: 'arrow'
            }
        },
        {
            id: '6',
            title: 'Consulting Digital',
            description: 'Conseils stratégiques pour votre transformation digitale.',
            icon: {
                type: 'emoji',
                value: '🚀'
            },
            highlight: false,
            category: 'consulting',
            link: {
                url: '#consulting',
                text: 'En savoir plus',
                target: '_self',
                style: 'arrow'
            }
        }
    ],
    display: {
        showIcon: true,
        iconStyle: 'gradient',
        iconSize: 'lg',
        iconPosition: 'top',
        showImage: false,
        imageStyle: 'rounded',
        imageRatio: '16:9',
        showBadge: false,
        showStats: false,
        showLink: true,
        showCategory: false,
        cardStyle: 'elevated',
        cardHover: 'lift',
        animation: 'fade',
        animationDelay: 100,
        stagger: true
    },
    filtering: {
        enabled: false,
        categories: [
            { id: 'all', label: 'Tous' },
            { id: 'development', label: 'Développement', count: 3 },
            { id: 'design', label: 'Design', count: 1 },
            { id: 'marketing', label: 'Marketing', count: 1 },
            { id: 'consulting', label: 'Consulting', count: 1 }
        ],
        defaultCategory: 'all',
        style: 'buttons',
        position: 'top',
        showAll: true,
        allLabel: 'Tous'
    },
    timeline: {
        enabled: false,
        lineStyle: 'solid',
        linePosition: 'center',
        showDates: true,
        dateFormat: 'short'
    },
    carousel: {
        enabled: false,
        autoplay: true,
        autoplayDelay: 5000,
        loop: true,
        showDots: true,
        showArrows: true,
        slidesPerView: {
            desktop: 3,
            tablet: 2,
            mobile: 1
        },
        effect: 'slide',
        gap: 20
    },
    comparison: {
        enabled: false,
        headers: [],
        showToggle: false,
        highlightBest: true,
        stickyHeader: true
    },
    cta: {
        enabled: false,
        text: 'Voir tous nos services',
        link: '#services',
        variant: 'primary',
        position: 'bottom'
    },
    styles: {
        padding: 'lg',
        borderRadius: 'lg',
        shadow: 'md'
    }
};
// Logger de validation
exports.featuresDataSchema._parse = new Proxy(exports.featuresDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('featuresDataSchema', 'parse', 'Validation des données Features', {
            hasData: !!args[0],
            dataKeys: args[0] ? Object.keys(args[0]) : []
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('featuresDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('featuresDataSchema', 'parse', '✅ Validation réussie');
        }
        return result;
    }
});

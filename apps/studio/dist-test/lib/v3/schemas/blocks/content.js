"use strict";
/**
 * Content Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentDefaults = exports.contentDataSchema = exports.statSchema = exports.beforeAfterSchema = exports.quoteSchema = exports.tabItemSchema = exports.accordionItemSchema = exports.timelineItemSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour un élément de timeline
exports.timelineItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => crypto.randomUUID()),
    date: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
    image: common_1.imageSchema.optional(),
    link: zod_1.z.object({
        text: zod_1.z.string(),
        url: zod_1.z.string()
    }).optional()
});
// Schema pour un accordion item
exports.accordionItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => crypto.randomUUID()),
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
    open: zod_1.z.boolean().default(false)
});
// Schema pour un tab
exports.tabItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => crypto.randomUUID()),
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    icon: zod_1.z.string().optional(),
    badge: zod_1.z.string().optional()
});
// Schema pour une quote
exports.quoteSchema = zod_1.z.object({
    text: zod_1.z.string(),
    author: zod_1.z.string(),
    role: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
    image: common_1.imageSchema.optional(),
    rating: zod_1.z.number().min(0).max(5).optional()
});
// Schema pour comparaison avant/après
exports.beforeAfterSchema = zod_1.z.object({
    before: zod_1.z.object({
        image: common_1.imageSchema,
        label: zod_1.z.string().default('Avant')
    }),
    after: zod_1.z.object({
        image: common_1.imageSchema,
        label: zod_1.z.string().default('Après')
    }),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
// Schema pour une statistique
exports.statSchema = zod_1.z.object({
    value: zod_1.z.string(),
    label: zod_1.z.string(),
    prefix: zod_1.z.string().optional(),
    suffix: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
    color: common_1.colorSchema.optional()
});
// Schema principal Content
exports.contentDataSchema = zod_1.z.object({
    // Type de contenu
    type: zod_1.z.enum([
        'text-image',
        'timeline',
        'accordion',
        'tabs',
        'quote',
        'stats',
        'before-after',
        'process'
    ]).default('text-image').describe('Type de contenu à afficher'),
    // Configuration commune
    title: zod_1.z.string().optional(),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Contenu Text-Image
    textImage: zod_1.z.object({
        layout: zod_1.z.enum(['left', 'right', 'center', 'zigzag']).default('left'),
        content: zod_1.z.string().default('Votre contenu ici...'),
        image: common_1.imageSchema.optional(),
        imageSize: zod_1.z.enum(['small', 'medium', 'large', 'full']).default('medium'),
        imageStyle: zod_1.z.enum(['rounded', 'circle', 'square', 'shadow']).default('rounded'),
        features: zod_1.z.array(zod_1.z.object({
            icon: zod_1.z.string().optional(),
            text: zod_1.z.string()
        })).optional(),
        cta: common_1.buttonSchema.optional()
    }).optional(),
    // Timeline
    timeline: zod_1.z.object({
        style: zod_1.z.enum(['vertical', 'horizontal', 'alternate', 'compact']).default('vertical'),
        items: zod_1.z.array(exports.timelineItemSchema).default([]),
        showConnector: zod_1.z.boolean().default(true),
        connectorStyle: zod_1.z.enum(['solid', 'dashed', 'dotted']).default('solid'),
        iconStyle: zod_1.z.enum(['circle', 'square', 'custom']).default('circle'),
        animation: zod_1.z.boolean().default(true)
    }).optional(),
    // Accordion
    accordion: zod_1.z.object({
        style: zod_1.z.enum(['simple', 'bordered', 'separated', 'filled']).default('simple'),
        items: zod_1.z.array(exports.accordionItemSchema).default([]),
        expandBehavior: zod_1.z.enum(['single', 'multiple']).default('single'),
        showIcon: zod_1.z.boolean().default(true),
        iconPosition: zod_1.z.enum(['left', 'right']).default('right'),
        animation: zod_1.z.enum(['none', 'slide', 'fade']).default('slide')
    }).optional(),
    // Tabs
    tabs: zod_1.z.object({
        style: zod_1.z.enum(['line', 'enclosed', 'pills', 'vertical']).default('line'),
        items: zod_1.z.array(exports.tabItemSchema).default([]),
        alignment: zod_1.z.enum(['left', 'center', 'right', 'justified']).default('left'),
        animation: zod_1.z.enum(['none', 'fade', 'slide']).default('fade'),
        showIcons: zod_1.z.boolean().default(false),
        showBadges: zod_1.z.boolean().default(false)
    }).optional(),
    // Quote
    quote: zod_1.z.object({
        style: zod_1.z.enum(['simple', 'bordered', 'card', 'testimonial']).default('simple'),
        data: exports.quoteSchema,
        showQuoteIcon: zod_1.z.boolean().default(true),
        quoteIconStyle: zod_1.z.enum(['classic', 'modern', 'minimal']).default('classic'),
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('center')
    }).optional(),
    // Stats
    stats: zod_1.z.object({
        style: zod_1.z.enum(['simple', 'cards', 'circular', 'progress']).default('simple'),
        items: zod_1.z.array(exports.statSchema).default([]),
        columns: zod_1.z.number().min(1).max(6).default(3),
        animation: zod_1.z.boolean().default(true),
        countUp: zod_1.z.boolean().default(true),
        showIcons: zod_1.z.boolean().default(true)
    }).optional(),
    // Before/After
    beforeAfter: zod_1.z.object({
        style: zod_1.z.enum(['slider', 'toggle', 'side-by-side', 'overlay']).default('slider'),
        data: exports.beforeAfterSchema,
        sliderPosition: zod_1.z.number().min(0).max(100).default(50),
        orientation: zod_1.z.enum(['horizontal', 'vertical']).default('horizontal'),
        showLabels: zod_1.z.boolean().default(true)
    }).optional(),
    // Process
    process: zod_1.z.object({
        style: zod_1.z.enum(['steps', 'arrows', 'circles', 'cards']).default('steps'),
        items: zod_1.z.array(zod_1.z.object({
            number: zod_1.z.string(),
            title: zod_1.z.string(),
            description: zod_1.z.string(),
            icon: zod_1.z.string().optional(),
            image: common_1.imageSchema.optional()
        })).default([]),
        orientation: zod_1.z.enum(['horizontal', 'vertical']).default('horizontal'),
        showConnectors: zod_1.z.boolean().default(true),
        numberStyle: zod_1.z.enum(['circle', 'square', 'custom']).default('circle')
    }).optional(),
    // Layout
    layout: zod_1.z.object({
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        gap: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('left')
    }).default({}),
    // Animations
    animation: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        type: zod_1.z.enum(['fade', 'slide', 'scale', 'rotate']).default('fade'),
        duration: zod_1.z.number().default(600),
        stagger: zod_1.z.boolean().default(true),
        staggerDelay: zod_1.z.number().default(100)
    }).default({}),
    // Background
    background: zod_1.z.object({
        type: zod_1.z.enum(['none', 'color', 'gradient', 'pattern', 'image']).default('none'),
        color: common_1.colorSchema.optional(),
        gradient: zod_1.z.object({
            from: common_1.colorSchema,
            to: common_1.colorSchema,
            angle: zod_1.z.number().default(135)
        }).optional(),
        pattern: zod_1.z.object({
            type: zod_1.z.enum(['dots', 'lines', 'grid']).default('dots'),
            color: common_1.colorSchema.optional(),
            opacity: zod_1.z.number().min(0).max(1).default(0.1)
        }).optional(),
        image: common_1.imageSchema.optional()
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        textColor: common_1.colorSchema.optional(),
        headingColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('none')
    }).default({})
});
// Valeurs par défaut complètes
exports.contentDefaults = {
    type: 'text-image',
    title: 'Notre Expertise',
    subtitle: 'Des années d\'expérience à votre service',
    description: 'Découvrez comment nous pouvons transformer vos projets en réalité.',
    textImage: {
        layout: 'left',
        content: `Avec plus de 10 ans d'expérience dans le domaine, nous sommes votre partenaire de confiance pour tous vos projets de rénovation et de construction.

Notre équipe d'experts qualifiés met tout en œuvre pour garantir la qualité et la satisfaction de nos clients. Nous utilisons les meilleures techniques et matériaux pour assurer la durabilité de nos réalisations.`,
        image: {
            src: '/images/expertise.jpg',
            alt: 'Notre équipe d\'experts'
        },
        imageSize: 'medium',
        imageStyle: 'rounded',
        features: [
            { icon: '✓', text: 'Devis gratuit et détaillé' },
            { icon: '✓', text: 'Garantie décennale' },
            { icon: '✓', text: 'Respect des délais' },
            { icon: '✓', text: 'Matériaux de qualité' }
        ],
        cta: {
            text: 'En savoir plus',
            link: '#about',
            variant: 'primary',
            size: 'md'
        }
    },
    timeline: {
        style: 'vertical',
        items: [
            {
                id: '1',
                date: '2010',
                title: 'Création de l\'entreprise',
                description: 'Début de notre aventure avec une équipe passionnée',
                icon: '🚀'
            },
            {
                id: '2',
                date: '2015',
                title: 'Expansion régionale',
                description: 'Ouverture de nouvelles agences pour mieux vous servir',
                icon: '📈'
            },
            {
                id: '3',
                date: '2020',
                title: 'Certification qualité',
                description: 'Obtention des certifications ISO 9001 et RGE',
                icon: '🏆'
            }
        ],
        showConnector: true,
        connectorStyle: 'solid',
        iconStyle: 'circle',
        animation: true
    },
    accordion: {
        style: 'simple',
        items: [],
        expandBehavior: 'single',
        showIcon: true,
        iconPosition: 'right',
        animation: 'slide'
    },
    tabs: {
        style: 'line',
        items: [],
        alignment: 'left',
        animation: 'fade',
        showIcons: false,
        showBadges: false
    },
    quote: {
        style: 'simple',
        data: {
            text: 'La qualité n\'est jamais un accident. C\'est toujours le résultat d\'un effort intelligent.',
            author: 'John Ruskin',
            role: 'Écrivain et critique d\'art'
        },
        showQuoteIcon: true,
        quoteIconStyle: 'classic',
        alignment: 'center'
    },
    stats: {
        style: 'simple',
        items: [],
        columns: 3,
        animation: true,
        countUp: true,
        showIcons: true
    },
    beforeAfter: {
        style: 'slider',
        data: {
            before: {
                image: { src: '/images/before.jpg', alt: 'Avant travaux' },
                label: 'Avant'
            },
            after: {
                image: { src: '/images/after.jpg', alt: 'Après travaux' },
                label: 'Après'
            }
        },
        sliderPosition: 50,
        orientation: 'horizontal',
        showLabels: true
    },
    process: {
        style: 'steps',
        items: [],
        orientation: 'horizontal',
        showConnectors: true,
        numberStyle: 'circle'
    },
    layout: {
        containerWidth: 'normal',
        padding: 'lg',
        gap: 'md',
        alignment: 'left'
    },
    animation: {
        enabled: true,
        type: 'fade',
        duration: 600,
        stagger: true,
        staggerDelay: 100
    },
    background: {
        type: 'none'
    },
    styles: {
        borderRadius: 'md',
        shadow: 'none'
    }
};
// Logger de validation
exports.contentDataSchema._parse = new Proxy(exports.contentDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('contentDataSchema', 'parse', 'Validation des données Content', {
            hasData: !!args[0],
            type: args[0]?.type
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('contentDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('contentDataSchema', 'parse', '✅ Validation réussie', {
                type: result.data.type,
                hasAnimation: result.data.animation.enabled
            });
        }
        return result;
    }
});

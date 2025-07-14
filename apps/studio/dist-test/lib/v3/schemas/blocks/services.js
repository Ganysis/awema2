"use strict";
/**
 * Services Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesDefaults = exports.servicesDataSchema = exports.serviceItemSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour un service
exports.serviceItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => crypto.randomUUID()),
    title: zod_1.z.string().min(1, 'Le titre est requis'),
    description: zod_1.z.string(),
    icon: zod_1.z.union([
        zod_1.z.string(), // Emoji ou texte
        zod_1.z.object({
            type: zod_1.z.enum(['emoji', 'svg', 'image', 'lottie']),
            value: zod_1.z.string()
        })
    ]).optional(),
    image: common_1.imageSchema.optional(),
    // Détails du service
    features: zod_1.z.array(zod_1.z.string()).optional(),
    // Pricing
    pricing: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        amount: zod_1.z.number().optional(),
        currency: zod_1.z.string().default('€'),
        period: zod_1.z.enum(['hour', 'day', 'project', 'custom']).default('project'),
        customPeriod: zod_1.z.string().optional(),
        startingAt: zod_1.z.boolean().default(true),
        description: zod_1.z.string().optional()
    }).optional(),
    // CTA
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        text: zod_1.z.string().default('En savoir plus'),
        link: zod_1.z.string().default('#'),
        style: zod_1.z.enum(['link', 'button']).default('link')
    }).optional(),
    // Badge
    badge: zod_1.z.object({
        text: zod_1.z.string(),
        color: zod_1.z.enum(['primary', 'secondary', 'success', 'warning', 'error']).default('primary'),
        position: zod_1.z.enum(['top-left', 'top-right']).default('top-right')
    }).optional(),
    // Availability
    availability: zod_1.z.object({
        status: zod_1.z.enum(['available', 'busy', 'unavailable']).default('available'),
        message: zod_1.z.string().optional()
    }).optional(),
    // Category
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    // Ordre et mise en avant
    order: zod_1.z.number().optional(),
    featured: zod_1.z.boolean().default(false),
    popular: zod_1.z.boolean().default(false)
});
// Schema principal Services
exports.servicesDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
        'grid-cards',
        'list-detailed',
        'carousel-modern',
        'masonry-creative',
        'tabs-organized',
        'accordion-compact',
        'timeline-process',
        'hexagon-tech'
    ]).default('grid-cards').describe('Style visuel du bloc services'),
    // Configuration du titre
    title: zod_1.z.string().default('Nos Services'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Services
    services: zod_1.z.array(exports.serviceItemSchema).min(1).default([
        {
            id: '1',
            title: 'Rénovation complète',
            description: 'Transformation totale de votre espace, de la conception à la réalisation.',
            icon: '🏠',
            features: [
                'Étude personnalisée',
                'Plans 3D',
                'Gestion complète du projet',
                'Garantie décennale'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 5000,
                currency: '€',
                period: 'project'
            },
            featured: true
        },
        {
            id: '2',
            title: 'Électricité',
            description: 'Installation et mise aux normes de vos équipements électriques.',
            icon: '⚡',
            features: [
                'Diagnostic gratuit',
                'Mise aux normes',
                'Domotique',
                'Dépannage 24/7'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 50,
                currency: '€',
                period: 'hour'
            }
        },
        {
            id: '3',
            title: 'Plomberie',
            description: 'Installation, réparation et entretien de vos équipements sanitaires.',
            icon: '🔧',
            features: [
                'Intervention rapide',
                'Devis gratuit',
                'Matériel de qualité',
                'Garantie pièces et main d\'œuvre'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 45,
                currency: '€',
                period: 'hour'
            }
        }
    ]),
    // Layout
    layout: zod_1.z.object({
        columns: zod_1.z.number().min(1).max(4).default(3),
        gap: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('left')
    }).default({}),
    // Options d'affichage
    display: zod_1.z.object({
        showIcon: zod_1.z.boolean().default(true),
        iconSize: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
        iconStyle: zod_1.z.enum(['filled', 'outline', 'gradient', 'shadow', '3d']).default('filled'),
        iconPosition: zod_1.z.enum(['top', 'left', 'right']).default('top'),
        showImage: zod_1.z.boolean().default(false),
        imagePosition: zod_1.z.enum(['top', 'bottom', 'background', 'side']).default('top'),
        imageRatio: zod_1.z.enum(['square', 'landscape', 'portrait']).default('landscape'),
        showFeatures: zod_1.z.boolean().default(true),
        featuresStyle: zod_1.z.enum(['list', 'tags', 'grid']).default('list'),
        maxFeatures: zod_1.z.number().default(4),
        showPricing: zod_1.z.boolean().default(true),
        pricingStyle: zod_1.z.enum(['simple', 'badge', 'prominent']).default('simple'),
        cardStyle: zod_1.z.enum(['flat', 'elevated', 'outlined', 'gradient', 'glassmorphism']).default('elevated'),
        cardHover: zod_1.z.enum(['none', 'lift', 'scale', 'glow', 'flip']).default('lift'),
        showBadges: zod_1.z.boolean().default(true),
        highlightFeatured: zod_1.z.boolean().default(true),
        animation: zod_1.z.enum(['none', 'fade', 'slide', 'scale', 'flip']).default('fade'),
        animationDelay: zod_1.z.number().default(100),
        stagger: zod_1.z.boolean().default(true)
    }).default({}),
    // Filtrage et catégories
    filtering: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        categories: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            label: zod_1.z.string(),
            count: zod_1.z.number().optional()
        })).default([]),
        defaultCategory: zod_1.z.string().optional(),
        style: zod_1.z.enum(['tabs', 'buttons', 'dropdown']).default('buttons'),
        position: zod_1.z.enum(['top', 'side']).default('top'),
        showAll: zod_1.z.boolean().default(true),
        allLabel: zod_1.z.string().default('Tous les services')
    }).default({}),
    // Carousel options (pour variant carousel)
    carousel: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        autoplay: zod_1.z.boolean().default(true),
        autoplayDelay: zod_1.z.number().default(5000),
        loop: zod_1.z.boolean().default(true),
        showArrows: zod_1.z.boolean().default(true),
        showDots: zod_1.z.boolean().default(true),
        slidesPerView: zod_1.z.number().default(3),
        spacing: zod_1.z.number().default(24)
    }).default({}),
    // Process/Timeline options
    process: zod_1.z.object({
        showStepNumbers: zod_1.z.boolean().default(true),
        numberStyle: zod_1.z.enum(['circle', 'square', 'hexagon']).default('circle'),
        connectorStyle: zod_1.z.enum(['solid', 'dashed', 'dotted', 'gradient']).default('solid'),
        orientation: zod_1.z.enum(['vertical', 'horizontal']).default('vertical')
    }).default({}),
    // Call to action global
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        title: zod_1.z.string().default('Vous ne trouvez pas le service recherché ?'),
        description: zod_1.z.string().default('Contactez-nous pour un devis personnalisé'),
        buttonText: zod_1.z.string().default('Demander un devis'),
        buttonLink: zod_1.z.string().default('#contact'),
        buttonVariant: zod_1.z.enum(['primary', 'secondary', 'outline']).default('primary'),
        position: zod_1.z.enum(['bottom', 'top']).default('bottom')
    }).default({}),
    // Témoignages intégrés
    testimonials: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        title: zod_1.z.string().default('Ce que nos clients disent'),
        items: zod_1.z.array(zod_1.z.object({
            serviceId: zod_1.z.string(),
            author: zod_1.z.string(),
            rating: zod_1.z.number().min(0).max(5),
            comment: zod_1.z.string()
        })).default([])
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        backgroundColor: common_1.colorSchema.optional(),
        textColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md')
    }).default({})
});
// Valeurs par défaut complètes
exports.servicesDefaults = {
    variant: 'grid-cards',
    title: 'Nos Services',
    subtitle: 'Des solutions adaptées à tous vos besoins',
    description: 'Découvrez notre gamme complète de services professionnels.',
    services: [
        {
            id: '1',
            title: 'Rénovation complète',
            description: 'Transformation totale de votre espace, de la conception à la réalisation. Nous gérons l\'intégralité de votre projet.',
            icon: '🏠',
            features: [
                'Étude personnalisée',
                'Plans 3D et visualisation',
                'Gestion complète du projet',
                'Garantie décennale'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 5000,
                currency: '€',
                period: 'project',
                description: 'Prix variable selon la surface'
            },
            cta: {
                enabled: true,
                text: 'Demander un devis',
                link: '#contact',
                style: 'button'
            },
            featured: true,
            popular: true,
            category: 'renovation',
            tags: ['rénovation', 'maison', 'appartement']
        },
        {
            id: '2',
            title: 'Électricité',
            description: 'Installation et mise aux normes de vos équipements électriques en toute sécurité.',
            icon: '⚡',
            features: [
                'Diagnostic gratuit',
                'Mise aux normes NF C 15-100',
                'Installation domotique',
                'Dépannage 24/7'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 50,
                currency: '€',
                period: 'hour'
            },
            cta: {
                enabled: true,
                text: 'En savoir plus',
                link: '#electricite',
                style: 'link'
            },
            category: 'technique',
            tags: ['électricité', 'sécurité', 'domotique']
        },
        {
            id: '3',
            title: 'Plomberie',
            description: 'Installation, réparation et entretien de vos équipements sanitaires.',
            icon: '🔧',
            features: [
                'Intervention rapide',
                'Devis gratuit',
                'Matériel de qualité',
                'Garantie pièces et MO'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 45,
                currency: '€',
                period: 'hour'
            },
            cta: {
                enabled: true,
                text: 'Urgence plomberie',
                link: 'tel:0123456789',
                style: 'button'
            },
            availability: {
                status: 'available',
                message: 'Disponible 7j/7'
            },
            category: 'technique',
            tags: ['plomberie', 'sanitaire', 'urgence']
        },
        {
            id: '4',
            title: 'Peinture & Décoration',
            description: 'Embellissez vos espaces avec nos services de peinture et décoration professionnels.',
            icon: '🎨',
            features: [
                'Conseil couleurs',
                'Peintures écologiques',
                'Papiers peints',
                'Enduits décoratifs'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 25,
                currency: '€',
                period: 'hour',
                description: 'Fournitures en sus'
            },
            category: 'decoration',
            tags: ['peinture', 'décoration', 'design']
        },
        {
            id: '5',
            title: 'Menuiserie',
            description: 'Création et pose de menuiseries sur mesure pour vos intérieurs et extérieurs.',
            icon: '🪵',
            features: [
                'Sur mesure',
                'Bois certifié',
                'Isolation optimale',
                'Finitions soignées'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 500,
                currency: '€',
                period: 'project'
            },
            category: 'menuiserie',
            tags: ['menuiserie', 'bois', 'sur-mesure']
        },
        {
            id: '6',
            title: 'Carrelage & Sol',
            description: 'Pose de carrelage et revêtements de sol pour un intérieur élégant et durable.',
            icon: '🏗️',
            features: [
                'Large choix matériaux',
                'Pose traditionnelle',
                'Joints époxy',
                'Ragréage inclus'
            ],
            pricing: {
                enabled: true,
                startingAt: true,
                amount: 40,
                currency: '€',
                period: 'custom',
                customPeriod: 'm²'
            },
            category: 'sols',
            tags: ['carrelage', 'sol', 'revêtement']
        }
    ],
    layout: {
        columns: 3,
        gap: 'lg',
        containerWidth: 'normal',
        alignment: 'left'
    },
    display: {
        showIcon: true,
        iconSize: 'lg',
        iconStyle: 'filled',
        iconPosition: 'top',
        showImage: false,
        imagePosition: 'top',
        imageRatio: 'landscape',
        showFeatures: true,
        featuresStyle: 'list',
        maxFeatures: 4,
        showPricing: true,
        pricingStyle: 'simple',
        cardStyle: 'elevated',
        cardHover: 'lift',
        showBadges: true,
        highlightFeatured: true,
        animation: 'fade',
        animationDelay: 100,
        stagger: true
    },
    filtering: {
        enabled: true,
        categories: [
            { id: 'all', label: 'Tous', count: 6 },
            { id: 'renovation', label: 'Rénovation', count: 1 },
            { id: 'technique', label: 'Technique', count: 2 },
            { id: 'decoration', label: 'Décoration', count: 1 },
            { id: 'menuiserie', label: 'Menuiserie', count: 1 },
            { id: 'sols', label: 'Sols', count: 1 }
        ],
        defaultCategory: 'all',
        style: 'buttons',
        position: 'top',
        showAll: true,
        allLabel: 'Tous les services'
    },
    carousel: {
        enabled: false,
        autoplay: true,
        autoplayDelay: 5000,
        loop: true,
        showArrows: true,
        showDots: true,
        slidesPerView: 3,
        spacing: 24
    },
    process: {
        showStepNumbers: true,
        numberStyle: 'circle',
        connectorStyle: 'solid',
        orientation: 'vertical'
    },
    cta: {
        enabled: true,
        title: 'Vous ne trouvez pas le service recherché ?',
        description: 'Nous proposons bien d\'autres services. Contactez-nous pour en discuter.',
        buttonText: 'Demander un devis personnalisé',
        buttonLink: '#contact',
        buttonVariant: 'primary',
        position: 'bottom'
    },
    testimonials: {
        enabled: false,
        title: 'Ce que nos clients disent',
        items: []
    },
    styles: {
        padding: 'lg',
        borderRadius: 'lg',
        shadow: 'md'
    }
};
// Logger de validation
exports.servicesDataSchema._parse = new Proxy(exports.servicesDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('servicesDataSchema', 'parse', 'Validation des données Services', {
            hasData: !!args[0],
            servicesCount: args[0]?.services?.length || 0
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('servicesDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('servicesDataSchema', 'parse', '✅ Validation réussie', {
                servicesCount: result.data.services.length,
                variant: result.data.variant
            });
        }
        return result;
    }
});

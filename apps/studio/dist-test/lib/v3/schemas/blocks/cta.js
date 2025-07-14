"use strict";
/**
 * CTA Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctaDefaults = exports.ctaDataSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema principal CTA
exports.ctaDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
        'simple-centered',
        'split-image',
        'gradient-wave',
        'glassmorphism',
        'floating-cards',
        'diagonal-split',
        'video-background',
        'animated-particles'
    ]).default('simple-centered').describe('Style visuel du bloc CTA'),
    // Configuration du titre
    title: zod_1.z.string().default('Prêt à démarrer votre projet ?'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Mise en évidence du texte
    highlight: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        text: zod_1.z.string().optional(),
        style: zod_1.z.enum(['underline', 'background', 'gradient', 'animated']).default('gradient')
    }).default({}),
    // Boutons CTA
    buttons: zod_1.z.object({
        primary: common_1.buttonSchema.extend({
            icon: zod_1.z.string().optional(),
            iconPosition: zod_1.z.enum(['left', 'right']).default('right')
        }),
        secondary: common_1.buttonSchema.extend({
            icon: zod_1.z.string().optional(),
            iconPosition: zod_1.z.enum(['left', 'right']).default('right')
        }).optional()
    }).default({
        primary: {
            text: 'Contactez-nous',
            link: '#contact',
            variant: 'primary',
            size: 'lg'
        }
    }),
    // Image/Media
    media: zod_1.z.object({
        type: zod_1.z.enum(['none', 'image', 'video', 'lottie', 'svg']).default('none'),
        image: common_1.imageSchema.optional(),
        video: zod_1.z.object({
            url: zod_1.z.string().url(),
            poster: zod_1.z.string().optional(),
            autoplay: zod_1.z.boolean().default(true),
            loop: zod_1.z.boolean().default(true),
            muted: zod_1.z.boolean().default(true)
        }).optional(),
        lottie: zod_1.z.object({
            url: zod_1.z.string().url(),
            autoplay: zod_1.z.boolean().default(true),
            loop: zod_1.z.boolean().default(true)
        }).optional(),
        position: zod_1.z.enum(['left', 'right', 'background', 'top', 'bottom']).default('right'),
        size: zod_1.z.enum(['small', 'medium', 'large', 'full']).default('medium'),
        animation: zod_1.z.enum(['none', 'float', 'pulse', 'rotate', 'scale']).default('none')
    }).default({}),
    // Statistiques
    stats: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        items: zod_1.z.array(zod_1.z.object({
            value: zod_1.z.string(),
            label: zod_1.z.string(),
            prefix: zod_1.z.string().optional(),
            suffix: zod_1.z.string().optional(),
            icon: zod_1.z.string().optional(),
            animate: zod_1.z.boolean().default(true)
        })).default([
            { value: '500', label: 'Clients satisfaits', prefix: '+', animate: true },
            { value: '98', label: 'Taux de satisfaction', suffix: '%', animate: true },
            { value: '10', label: "Années d'expérience", prefix: '+', animate: true }
        ]),
        layout: zod_1.z.enum(['row', 'grid', 'cards']).default('row'),
        style: zod_1.z.enum(['simple', 'boxed', 'circular']).default('simple')
    }).default({}),
    // Badges/Trust indicators
    badges: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        items: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.enum(['text', 'image', 'icon']),
            content: zod_1.z.string(),
            alt: zod_1.z.string().optional()
        })).default([]),
        position: zod_1.z.enum(['top', 'bottom', 'inline']).default('bottom'),
        style: zod_1.z.enum(['simple', 'outlined', 'filled']).default('simple')
    }).default({}),
    // Timer/Urgency
    urgency: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        type: zod_1.z.enum(['countdown', 'limited-spots', 'deadline', 'flash-sale']).default('countdown'),
        countdown: zod_1.z.object({
            endDate: zod_1.z.string(), // ISO date
            labels: zod_1.z.object({
                days: zod_1.z.string().default('Jours'),
                hours: zod_1.z.string().default('Heures'),
                minutes: zod_1.z.string().default('Minutes'),
                seconds: zod_1.z.string().default('Secondes')
            }).default({}),
            expiredMessage: zod_1.z.string().default("L'offre est terminée"),
            style: zod_1.z.enum(['boxes', 'inline', 'circular']).default('boxes')
        }).optional(),
        limitedSpots: zod_1.z.object({
            total: zod_1.z.number(),
            remaining: zod_1.z.number(),
            message: zod_1.z.string().default('Plus que {remaining} places disponibles')
        }).optional(),
        deadline: zod_1.z.object({
            date: zod_1.z.string(),
            message: zod_1.z.string().default('Offre valable jusqu\'au {date}')
        }).optional()
    }).default({}),
    // Layout
    layout: zod_1.z.object({
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('center'),
        contentWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
        spacing: zod_1.z.enum(['compact', 'normal', 'relaxed', 'spacious']).default('normal'),
        containerPadding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg')
    }).default({}),
    // Animations
    animation: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        type: zod_1.z.enum(['fade', 'slide', 'scale', 'rotate', 'bounce']).default('fade'),
        duration: zod_1.z.number().default(600),
        delay: zod_1.z.number().default(0),
        stagger: zod_1.z.boolean().default(true),
        onScroll: zod_1.z.boolean().default(true)
    }).default({}),
    // Background effects
    background: zod_1.z.object({
        type: zod_1.z.enum(['color', 'gradient', 'pattern', 'image', 'video', 'animated']).default('gradient'),
        color: common_1.colorSchema.optional(),
        gradient: zod_1.z.object({
            type: zod_1.z.enum(['linear', 'radial', 'conic']).default('linear'),
            angle: zod_1.z.number().default(135),
            colors: zod_1.z.array(common_1.colorSchema).default(['#3b82f6', '#8b5cf6']),
            animate: zod_1.z.boolean().default(false)
        }).optional(),
        pattern: zod_1.z.object({
            type: zod_1.z.enum(['dots', 'grid', 'waves', 'zigzag', 'circles']).default('dots'),
            color: common_1.colorSchema.optional(),
            opacity: zod_1.z.number().min(0).max(1).default(0.1),
            size: zod_1.z.enum(['sm', 'md', 'lg']).default('md')
        }).optional(),
        image: common_1.imageSchema.optional(),
        overlay: zod_1.z.object({
            enabled: zod_1.z.boolean().default(true),
            color: common_1.colorSchema.default('#000000'),
            opacity: zod_1.z.number().min(0).max(1).default(0.5)
        }).optional(),
        blur: zod_1.z.number().min(0).max(20).default(0),
        particles: zod_1.z.object({
            enabled: zod_1.z.boolean().default(false),
            count: zod_1.z.number().default(50),
            color: common_1.colorSchema.default('#ffffff'),
            shape: zod_1.z.enum(['circle', 'square', 'triangle', 'star']).default('circle'),
            speed: zod_1.z.number().default(1)
        }).optional()
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        textColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        buttonRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'full']).default('md'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        textShadow: zod_1.z.boolean().default(false),
        glassmorphism: zod_1.z.object({
            enabled: zod_1.z.boolean().default(false),
            blur: zod_1.z.number().default(10),
            opacity: zod_1.z.number().default(0.7)
        }).default({})
    }).default({})
});
// Valeurs par défaut complètes
exports.ctaDefaults = {
    variant: 'simple-centered',
    title: 'Prêt à transformer vos idées en réalité ?',
    subtitle: 'Contactez-nous dès aujourd\'hui',
    description: 'Notre équipe d\'experts est là pour vous accompagner dans tous vos projets.',
    highlight: {
        enabled: true,
        text: 'transformer vos idées',
        style: 'gradient'
    },
    buttons: {
        primary: {
            text: 'Demander un devis gratuit',
            link: '#contact',
            variant: 'primary',
            size: 'lg',
            icon: '→',
            iconPosition: 'right'
        },
        secondary: {
            text: 'Voir nos réalisations',
            link: '#portfolio',
            variant: 'outline',
            size: 'lg'
        }
    },
    media: {
        type: 'none',
        position: 'right',
        size: 'medium',
        animation: 'none'
    },
    stats: {
        enabled: true,
        items: [
            { value: '500', label: 'Clients satisfaits', prefix: '+', animate: true },
            { value: '98', label: 'Taux de satisfaction', suffix: '%', animate: true },
            { value: '10', label: "Années d'expérience", prefix: '+', animate: true }
        ],
        layout: 'row',
        style: 'simple'
    },
    badges: {
        enabled: false,
        items: [],
        position: 'bottom',
        style: 'simple'
    },
    urgency: {
        enabled: false,
        type: 'countdown'
    },
    layout: {
        alignment: 'center',
        contentWidth: 'normal',
        spacing: 'normal',
        containerPadding: 'lg'
    },
    animation: {
        enabled: true,
        type: 'fade',
        duration: 600,
        delay: 0,
        stagger: true,
        onScroll: true
    },
    background: {
        type: 'gradient',
        gradient: {
            type: 'linear',
            angle: 135,
            colors: ['#3b82f6', '#8b5cf6'],
            animate: false
        }
    },
    styles: {
        buttonRadius: 'md',
        shadow: 'lg',
        textShadow: false,
        glassmorphism: {
            enabled: false,
            blur: 10,
            opacity: 0.7
        }
    }
};
// Logger de validation
exports.ctaDataSchema._parse = new Proxy(exports.ctaDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('ctaDataSchema', 'parse', 'Validation des données CTA', {
            hasData: !!args[0],
            variant: args[0]?.variant
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('ctaDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('ctaDataSchema', 'parse', '✅ Validation réussie', {
                variant: result.data.variant,
                hasStats: result.data.stats.enabled,
                hasUrgency: result.data.urgency.enabled
            });
        }
        return result;
    }
});

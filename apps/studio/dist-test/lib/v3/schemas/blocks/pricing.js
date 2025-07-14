"use strict";
/**
 * Pricing Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricingDefaults = exports.pricingDataSchema = exports.pricingPlanSchema = exports.pricingFeatureSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour une feature de pricing
exports.pricingFeatureSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, 'Le texte est requis'),
    included: zod_1.z.boolean().default(true),
    tooltip: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
    highlight: zod_1.z.boolean().default(false)
});
// Schema pour un plan de pricing
exports.pricingPlanSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => {
        const id = crypto.randomUUID();
        logger_1.logger.debug('pricingPlanSchema', 'generate', `Génération ID plan: ${id}`);
        return id;
    }),
    name: zod_1.z.string().min(1, 'Le nom du plan est requis'),
    description: zod_1.z.string().optional(),
    price: zod_1.z.object({
        amount: zod_1.z.number().min(0),
        currency: zod_1.z.string().default('€'),
        period: zod_1.z.enum(['month', 'year', 'once', 'custom']).default('month'),
        customPeriod: zod_1.z.string().optional(),
        originalPrice: zod_1.z.number().optional(), // Prix barré
        discount: zod_1.z.object({
            percentage: zod_1.z.number().min(0).max(100),
            label: zod_1.z.string().optional()
        }).optional()
    }),
    badge: zod_1.z.object({
        text: zod_1.z.string(),
        color: zod_1.z.enum(['primary', 'secondary', 'success', 'warning', 'error']).default('primary'),
        position: zod_1.z.enum(['top', 'inline']).default('top')
    }).optional(),
    features: zod_1.z.array(exports.pricingFeatureSchema).default([]),
    cta: common_1.buttonSchema.extend({
        fullWidth: zod_1.z.boolean().default(true)
    }),
    recommended: zod_1.z.boolean().default(false),
    popular: zod_1.z.boolean().default(false),
    customData: zod_1.z.record(zod_1.z.any()).optional(),
    order: zod_1.z.number().optional()
});
// Schema principal Pricing
exports.pricingDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
        'cards-classic',
        'cards-modern',
        'table-comparison',
        'cards-gradient',
        'cards-glassmorphism',
        'toggle-monthly-yearly',
        'slider-interactive',
        'cards-minimal'
    ]).default('cards-modern').describe('Style visuel du bloc pricing'),
    // Configuration du titre
    title: zod_1.z.string().default('Nos Tarifs'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Plans
    plans: zod_1.z.array(exports.pricingPlanSchema).min(1).max(5).default([
        {
            id: '1',
            name: 'Starter',
            description: 'Parfait pour démarrer',
            price: {
                amount: 29,
                currency: '€',
                period: 'month'
            },
            features: [
                { text: '1 site web', included: true },
                { text: 'Hébergement inclus', included: true },
                { text: 'Support par email', included: true },
                { text: 'SSL gratuit', included: true },
                { text: 'Personnalisation avancée', included: false },
                { text: 'Support prioritaire', included: false }
            ],
            cta: {
                text: 'Commencer',
                link: '#',
                variant: 'outline',
                fullWidth: true
            },
            recommended: false,
            popular: false
        },
        {
            id: '2',
            name: 'Pro',
            description: 'Pour les professionnels',
            price: {
                amount: 59,
                currency: '€',
                period: 'month',
                originalPrice: 79
            },
            badge: {
                text: 'Plus populaire',
                color: 'primary',
                position: 'top'
            },
            features: [
                { text: '3 sites web', included: true },
                { text: 'Hébergement premium', included: true },
                { text: 'Support prioritaire', included: true },
                { text: 'SSL gratuit', included: true },
                { text: 'Personnalisation avancée', included: true },
                { text: 'Analytics avancés', included: true }
            ],
            cta: {
                text: 'Choisir Pro',
                link: '#',
                variant: 'primary',
                fullWidth: true
            },
            recommended: true,
            popular: true
        },
        {
            id: '3',
            name: 'Enterprise',
            description: 'Solutions sur mesure',
            price: {
                amount: 199,
                currency: '€',
                period: 'month'
            },
            features: [
                { text: 'Sites illimités', included: true },
                { text: 'Infrastructure dédiée', included: true },
                { text: 'Support 24/7', included: true },
                { text: 'SSL gratuit', included: true },
                { text: 'Personnalisation complète', included: true },
                { text: 'API access', included: true }
            ],
            cta: {
                text: 'Nous contacter',
                link: '#contact',
                variant: 'secondary',
                fullWidth: true
            },
            recommended: false,
            popular: false
        }
    ]),
    // Layout
    layout: zod_1.z.object({
        columns: zod_1.z.number().min(1).max(4).default(3),
        gap: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
        alignment: zod_1.z.enum(['top', 'center', 'bottom']).default('top'),
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
        equalHeight: zod_1.z.boolean().default(true)
    }).default({}),
    // Options d'affichage
    display: zod_1.z.object({
        showCurrency: zod_1.z.boolean().default(true),
        currencyPosition: zod_1.z.enum(['before', 'after', 'superscript']).default('before'),
        showPeriod: zod_1.z.boolean().default(true),
        periodFormat: zod_1.z.enum(['full', 'short', 'slash']).default('full'),
        showOriginalPrice: zod_1.z.boolean().default(true),
        showDiscount: zod_1.z.boolean().default(true),
        featureStyle: zod_1.z.enum(['list', 'checklist', 'table', 'grid']).default('checklist'),
        featureIcon: zod_1.z.enum(['check', 'arrow', 'star', 'custom']).default('check'),
        showFeatureTooltips: zod_1.z.boolean().default(false),
        cardStyle: zod_1.z.enum(['flat', 'elevated', 'outlined', 'gradient', 'glassmorphism']).default('elevated'),
        cardHover: zod_1.z.enum(['none', 'lift', 'scale', 'glow', 'highlight']).default('lift'),
        highlightRecommended: zod_1.z.boolean().default(true),
        recommendedScale: zod_1.z.number().default(1.05),
        animation: zod_1.z.enum(['none', 'fade', 'slide', 'scale', 'flip']).default('fade'),
        animationDelay: zod_1.z.number().default(100),
        stagger: zod_1.z.boolean().default(true)
    }).default({}),
    // Toggle période
    periodToggle: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        defaultPeriod: zod_1.z.enum(['month', 'year']).default('month'),
        monthlyLabel: zod_1.z.string().default('Mensuel'),
        yearlyLabel: zod_1.z.string().default('Annuel'),
        yearlyDiscount: zod_1.z.number().default(20),
        discountBadge: zod_1.z.string().default('Économisez {discount}%'),
        position: zod_1.z.enum(['top', 'bottom', 'integrated']).default('top'),
        style: zod_1.z.enum(['toggle', 'tabs', 'buttons']).default('toggle')
    }).default({}),
    // Comparaison
    comparison: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        features: zod_1.z.array(zod_1.z.object({
            category: zod_1.z.string().optional(),
            name: zod_1.z.string(),
            description: zod_1.z.string().optional(),
            plans: zod_1.z.record(zod_1.z.union([
                zod_1.z.boolean(),
                zod_1.z.string(),
                zod_1.z.object({
                    value: zod_1.z.union([zod_1.z.boolean(), zod_1.z.string()]),
                    tooltip: zod_1.z.string().optional()
                })
            ]))
        })).default([]),
        stickyHeader: zod_1.z.boolean().default(true),
        highlightDifferences: zod_1.z.boolean().default(true),
        expandableRows: zod_1.z.boolean().default(false)
    }).default({}),
    // FAQ section
    faq: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        title: zod_1.z.string().default('Questions sur nos tarifs'),
        items: zod_1.z.array(zod_1.z.object({
            question: zod_1.z.string(),
            answer: zod_1.z.string()
        })).default([]),
        position: zod_1.z.enum(['bottom', 'side']).default('bottom')
    }).default({}),
    // Garanties
    guarantees: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        items: zod_1.z.array(zod_1.z.object({
            icon: zod_1.z.string(),
            title: zod_1.z.string(),
            description: zod_1.z.string()
        })).default([
            {
                icon: '🔒',
                title: 'Paiement sécurisé',
                description: 'Transactions 100% sécurisées'
            },
            {
                icon: '⏰',
                title: '30 jours d\'essai',
                description: 'Satisfait ou remboursé'
            },
            {
                icon: '🚫',
                title: 'Sans engagement',
                description: 'Annulez à tout moment'
            }
        ]),
        position: zod_1.z.enum(['top', 'bottom']).default('bottom'),
        style: zod_1.z.enum(['inline', 'cards', 'banner']).default('inline')
    }).default({}),
    // Call to action global
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        title: zod_1.z.string().default('Besoin d\'une solution personnalisée ?'),
        description: zod_1.z.string().default('Contactez-nous pour discuter de vos besoins spécifiques'),
        buttonText: zod_1.z.string().default('Parlons de votre projet'),
        buttonLink: zod_1.z.string().default('#contact'),
        buttonVariant: zod_1.z.enum(['primary', 'secondary', 'outline']).default('primary'),
        position: zod_1.z.enum(['bottom', 'top']).default('bottom'),
        style: zod_1.z.enum(['simple', 'card', 'banner']).default('card')
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        backgroundColor: common_1.colorSchema.optional(),
        textColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg')
    }).default({})
});
// Valeurs par défaut complètes
exports.pricingDefaults = {
    variant: 'cards-modern',
    title: 'Choisissez votre plan',
    subtitle: 'Des tarifs transparents et adaptés à vos besoins',
    description: 'Tous nos plans incluent l\'hébergement, le SSL et le support technique.',
    plans: [
        {
            id: '1',
            name: 'Starter',
            description: 'Idéal pour commencer',
            price: {
                amount: 297,
                currency: '€',
                period: 'once'
            },
            features: [
                { text: 'Site web one-page', included: true },
                { text: 'Design personnalisé', included: true },
                { text: 'Mobile responsive', included: true },
                { text: 'Hébergement 1 an inclus', included: true },
                { text: 'Certificat SSL', included: true },
                { text: 'Support par email', included: true },
                { text: 'Formation incluse', included: false },
                { text: 'Modifications illimitées', included: false }
            ],
            cta: {
                text: 'Démarrer',
                link: '#contact',
                variant: 'outline',
                size: 'md',
                fullWidth: true
            },
            recommended: false,
            popular: false
        },
        {
            id: '2',
            name: 'Professional',
            description: 'Notre best-seller',
            price: {
                amount: 597,
                currency: '€',
                period: 'once',
                originalPrice: 797,
                discount: {
                    percentage: 25,
                    label: 'Offre limitée'
                }
            },
            badge: {
                text: 'Recommandé',
                color: 'primary',
                position: 'top'
            },
            features: [
                { text: 'Site web multi-pages', included: true, highlight: true },
                { text: 'Design sur mesure', included: true },
                { text: 'Mobile responsive', included: true },
                { text: 'Hébergement 2 ans inclus', included: true, highlight: true },
                { text: 'Certificat SSL', included: true },
                { text: 'Support prioritaire', included: true },
                { text: 'Formation complète', included: true, highlight: true },
                { text: '3 mois de modifications', included: true }
            ],
            cta: {
                text: 'Choisir ce plan',
                link: '#contact',
                variant: 'primary',
                size: 'lg',
                fullWidth: true
            },
            recommended: true,
            popular: true
        },
        {
            id: '3',
            name: 'Enterprise',
            description: 'Solutions avancées',
            price: {
                amount: 997,
                currency: '€',
                period: 'once'
            },
            features: [
                { text: 'Site web sur mesure', included: true },
                { text: 'Design premium', included: true },
                { text: 'Mobile responsive', included: true },
                { text: 'Hébergement 3 ans inclus', included: true },
                { text: 'Certificat SSL', included: true },
                { text: 'Support 24/7', included: true, highlight: true },
                { text: 'Formation + documentation', included: true },
                { text: 'Modifications illimitées 1 an', included: true, highlight: true }
            ],
            cta: {
                text: 'Contactez-nous',
                link: '#contact',
                variant: 'secondary',
                size: 'md',
                fullWidth: true
            },
            recommended: false,
            popular: false
        }
    ],
    layout: {
        columns: 3,
        gap: 'lg',
        alignment: 'top',
        containerWidth: 'normal',
        equalHeight: true
    },
    display: {
        showCurrency: true,
        currencyPosition: 'after',
        showPeriod: true,
        periodFormat: 'full',
        showOriginalPrice: true,
        showDiscount: true,
        featureStyle: 'checklist',
        featureIcon: 'check',
        showFeatureTooltips: false,
        cardStyle: 'elevated',
        cardHover: 'lift',
        highlightRecommended: true,
        recommendedScale: 1.05,
        animation: 'fade',
        animationDelay: 100,
        stagger: true
    },
    periodToggle: {
        enabled: false,
        defaultPeriod: 'month',
        monthlyLabel: 'Mensuel',
        yearlyLabel: 'Annuel',
        yearlyDiscount: 20,
        discountBadge: 'Économisez {discount}%',
        position: 'top',
        style: 'toggle'
    },
    comparison: {
        enabled: false,
        features: [],
        stickyHeader: true,
        highlightDifferences: true,
        expandableRows: false
    },
    faq: {
        enabled: false,
        title: 'Questions sur nos tarifs',
        items: [],
        position: 'bottom'
    },
    guarantees: {
        enabled: true,
        items: [
            {
                icon: '✨',
                title: 'Qualité garantie',
                description: 'Satisfaction 100% garantie'
            },
            {
                icon: '🔒',
                title: 'Paiement sécurisé',
                description: 'Transactions cryptées SSL'
            },
            {
                icon: '🚀',
                title: 'Livraison rapide',
                description: 'Site en ligne en 2-4 semaines'
            }
        ],
        position: 'bottom',
        style: 'inline'
    },
    cta: {
        enabled: true,
        title: 'Besoin d\'un devis personnalisé ?',
        description: 'Chaque projet est unique. Parlons de vos besoins spécifiques.',
        buttonText: 'Demander un devis',
        buttonLink: '#contact',
        buttonVariant: 'primary',
        position: 'bottom',
        style: 'card'
    },
    styles: {
        padding: 'lg',
        borderRadius: 'lg',
        shadow: 'lg'
    }
};
// Logger de validation
exports.pricingDataSchema._parse = new Proxy(exports.pricingDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('pricingDataSchema', 'parse', 'Validation des données Pricing', {
            hasData: !!args[0],
            plansCount: args[0]?.plans?.length || 0
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('pricingDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('pricingDataSchema', 'parse', '✅ Validation réussie', {
                plansCount: result.data.plans.length,
                variant: result.data.variant
            });
        }
        return result;
    }
});

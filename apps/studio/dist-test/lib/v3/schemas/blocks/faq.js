"use strict";
/**
 * FAQ Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqDefaults = exports.faqDataSchema = exports.faqCategorySchema = exports.faqItemSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour une question FAQ
exports.faqItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => {
        const id = crypto.randomUUID();
        logger_1.logger.debug('faqItemSchema', 'generate', `Génération ID FAQ: ${id}`);
        return id;
    }),
    question: zod_1.z.string().min(1, 'La question est requise'),
    answer: zod_1.z.string().min(1, 'La réponse est requise'),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    featured: zod_1.z.boolean().default(false),
    helpfulCount: zod_1.z.number().default(0),
    relatedQuestions: zod_1.z.array(zod_1.z.string()).optional(),
    metadata: zod_1.z.object({
        author: zod_1.z.string().optional(),
        dateCreated: zod_1.z.string().optional(),
        dateModified: zod_1.z.string().optional(),
        views: zod_1.z.number().optional()
    }).optional(),
    cta: zod_1.z.object({
        text: zod_1.z.string(),
        link: zod_1.z.string(),
        style: zod_1.z.enum(['link', 'button']).default('link')
    }).optional(),
    open: zod_1.z.boolean().default(false)
});
// Schema pour une catégorie FAQ
exports.faqCategorySchema = zod_1.z.object({
    id: zod_1.z.string(),
    label: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
    color: common_1.colorSchema.optional(),
    count: zod_1.z.number().optional()
});
// Schema principal FAQ
exports.faqDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
        'accordion-classic',
        'cards-expandable',
        'list-minimal',
        'tabs-grouped',
        'grid-modern',
        'timeline-vertical',
        'chat-style',
        'knowledge-base'
    ]).default('accordion-classic').describe('Style visuel du bloc FAQ'),
    // Configuration du titre
    title: zod_1.z.string().default('Questions Fréquentes'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Questions
    items: zod_1.z.array(exports.faqItemSchema).min(1).default([
        {
            id: '1',
            question: 'Quels sont vos délais de livraison ?',
            answer: 'Nos délais de livraison varient selon la complexité du projet. En général, comptez 2 à 4 semaines pour un site web standard et 6 à 12 semaines pour une application complexe.',
            category: 'general',
            featured: true,
            helpfulCount: 42,
            open: false
        },
        {
            id: '2',
            question: 'Proposez-vous un service de maintenance ?',
            answer: 'Oui, nous proposons différents forfaits de maintenance incluant les mises à jour de sécurité, l\'hébergement, les sauvegardes automatiques et le support technique.',
            category: 'services',
            helpfulCount: 38,
            open: false
        },
        {
            id: '3',
            question: 'Puis-je modifier mon site moi-même ?',
            answer: 'Absolument ! Tous nos sites sont livrés avec un CMS intuitif qui vous permet de modifier facilement vos contenus. Nous proposons également une formation personnalisée.',
            category: 'technical',
            helpfulCount: 35,
            open: false
        }
    ]),
    // Layout
    layout: zod_1.z.object({
        columns: zod_1.z.number().min(1).max(3).default(1),
        gap: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('narrow'),
        alignment: zod_1.z.enum(['left', 'center', 'right']).default('left')
    }).default({}),
    // Options d'affichage
    display: zod_1.z.object({
        showIcon: zod_1.z.boolean().default(true),
        iconStyle: zod_1.z.enum(['plus', 'chevron', 'arrow', 'custom']).default('plus'),
        iconPosition: zod_1.z.enum(['left', 'right']).default('right'),
        showNumber: zod_1.z.boolean().default(false),
        numberStyle: zod_1.z.enum(['decimal', 'roman', 'letter', 'custom']).default('decimal'),
        showCategory: zod_1.z.boolean().default(false),
        showTags: zod_1.z.boolean().default(false),
        showHelpful: zod_1.z.boolean().default(false),
        showShare: zod_1.z.boolean().default(false),
        showSearch: zod_1.z.boolean().default(false),
        expandBehavior: zod_1.z.enum(['single', 'multiple', 'all']).default('single'),
        defaultExpanded: zod_1.z.array(zod_1.z.string()).default([]),
        animation: zod_1.z.enum(['none', 'slide', 'fade', 'scale']).default('slide'),
        animationDuration: zod_1.z.number().default(300),
        divider: zod_1.z.boolean().default(true),
        dividerStyle: zod_1.z.enum(['solid', 'dashed', 'dotted', 'gradient']).default('solid'),
        highlightOnHover: zod_1.z.boolean().default(true),
        questionStyle: zod_1.z.object({
            fontSize: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
            fontWeight: zod_1.z.enum(['normal', 'medium', 'semibold', 'bold']).default('semibold'),
            textTransform: zod_1.z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).default('none')
        }).default({}),
        answerStyle: zod_1.z.object({
            fontSize: zod_1.z.enum(['sm', 'md', 'lg']).default('md'),
            lineHeight: zod_1.z.enum(['tight', 'normal', 'relaxed']).default('relaxed'),
            formatting: zod_1.z.boolean().default(true) // Support markdown/rich text
        }).default({})
    }).default({}),
    // Catégories et filtrage
    categories: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        items: zod_1.z.array(exports.faqCategorySchema).default([
            { id: 'general', label: 'Général' },
            { id: 'services', label: 'Services' },
            { id: 'technical', label: 'Technique' },
            { id: 'pricing', label: 'Tarifs' }
        ]),
        defaultCategory: zod_1.z.string().optional(),
        style: zod_1.z.enum(['tabs', 'buttons', 'dropdown', 'sidebar']).default('tabs'),
        position: zod_1.z.enum(['top', 'left', 'right']).default('top'),
        showAll: zod_1.z.boolean().default(true),
        allLabel: zod_1.z.string().default('Toutes les questions'),
        showCount: zod_1.z.boolean().default(true),
        sticky: zod_1.z.boolean().default(false)
    }).default({}),
    // Recherche
    search: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        placeholder: zod_1.z.string().default('Rechercher une question...'),
        position: zod_1.z.enum(['top', 'sticky', 'sidebar']).default('top'),
        style: zod_1.z.enum(['simple', 'advanced', 'autocomplete']).default('simple'),
        minChars: zod_1.z.number().default(3),
        debounceMs: zod_1.z.number().default(300),
        showSuggestions: zod_1.z.boolean().default(true),
        highlightMatches: zod_1.z.boolean().default(true),
        noResultsMessage: zod_1.z.string().default('Aucune question trouvée'),
        searchIn: zod_1.z.array(zod_1.z.enum(['question', 'answer', 'tags'])).default(['question', 'answer'])
    }).default({}),
    // Fonctionnalités interactives
    feedback: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        style: zod_1.z.enum(['helpful', 'rating', 'both']).default('helpful'),
        helpfulText: zod_1.z.string().default('Cette réponse vous a-t-elle aidé ?'),
        yesText: zod_1.z.string().default('Oui'),
        noText: zod_1.z.string().default('Non'),
        thanksMessage: zod_1.z.string().default('Merci pour votre retour !'),
        allowComments: zod_1.z.boolean().default(false)
    }).default({}),
    // Mode Chat
    chatMode: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        avatarUser: zod_1.z.string().optional(),
        avatarBot: zod_1.z.string().optional(),
        botName: zod_1.z.string().default('Assistant'),
        typing: zod_1.z.boolean().default(true),
        typingDuration: zod_1.z.number().default(1000),
        showTimestamp: zod_1.z.boolean().default(false)
    }).default({}),
    // Call to action
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        title: zod_1.z.string().default('Vous n\'avez pas trouvé votre réponse ?'),
        description: zod_1.z.string().default('Notre équipe est là pour vous aider'),
        buttonText: zod_1.z.string().default('Contactez-nous'),
        buttonLink: zod_1.z.string().default('#contact'),
        buttonVariant: zod_1.z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
        position: zod_1.z.enum(['bottom', 'top', 'floating']).default('bottom'),
        style: zod_1.z.enum(['simple', 'card', 'banner']).default('card')
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        backgroundColor: common_1.colorSchema.optional(),
        questionColor: common_1.colorSchema.optional(),
        answerColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg'),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('none'),
        cardStyle: zod_1.z.enum(['flat', 'elevated', 'outlined', 'glassmorphism']).default('flat')
    }).default({})
});
// Valeurs par défaut complètes
exports.faqDefaults = {
    variant: 'accordion-classic',
    title: 'Questions Fréquentes',
    subtitle: 'Tout ce que vous devez savoir',
    description: 'Retrouvez les réponses aux questions les plus courantes sur nos services.',
    items: [
        {
            id: '1',
            question: 'Quels sont vos délais de livraison ?',
            answer: 'Nos délais de livraison varient selon la complexité du projet. En général, comptez 2 à 4 semaines pour un site web standard et 6 à 12 semaines pour une application complexe. Nous vous fournirons un calendrier détaillé après l\'analyse de vos besoins.',
            category: 'general',
            tags: ['délais', 'planning', 'livraison'],
            featured: true,
            helpfulCount: 42,
            open: false
        },
        {
            id: '2',
            question: 'Proposez-vous un service de maintenance ?',
            answer: 'Oui, nous proposons différents forfaits de maintenance incluant les mises à jour de sécurité, l\'hébergement, les sauvegardes automatiques et le support technique. Nos forfaits démarrent à 39€/mois.',
            category: 'services',
            tags: ['maintenance', 'support', 'hébergement'],
            helpfulCount: 38,
            open: false
        },
        {
            id: '3',
            question: 'Puis-je modifier mon site moi-même ?',
            answer: 'Absolument ! Tous nos sites sont livrés avec un CMS intuitif qui vous permet de modifier facilement vos contenus. Nous proposons également une formation personnalisée pour vous rendre totalement autonome.',
            category: 'technical',
            tags: ['CMS', 'autonomie', 'formation'],
            helpfulCount: 35,
            open: false
        },
        {
            id: '4',
            question: 'Quels sont vos modes de paiement ?',
            answer: 'Nous acceptons les virements bancaires, les cartes de crédit (Visa, Mastercard, Amex) et PayPal. Le paiement s\'effectue en 3 fois : 30% à la commande, 40% à la validation de la maquette, et 30% à la livraison.',
            category: 'pricing',
            tags: ['paiement', 'tarifs', 'facturation'],
            helpfulCount: 28,
            open: false
        },
        {
            id: '5',
            question: 'Mon site sera-t-il optimisé pour le référencement ?',
            answer: 'Oui, tous nos sites sont développés avec les meilleures pratiques SEO : structure sémantique, vitesse de chargement optimisée, balises meta personnalisées, sitemap XML, et compatibilité mobile. Nous proposons aussi des services SEO avancés.',
            category: 'technical',
            tags: ['SEO', 'référencement', 'Google'],
            featured: true,
            helpfulCount: 45,
            open: false
        },
        {
            id: '6',
            question: 'Proposez-vous des formations ?',
            answer: 'Oui, nous proposons des formations personnalisées pour vous permettre de gérer votre site en toute autonomie. Les formations peuvent être en présentiel ou en visioconférence, et incluent des supports de cours détaillés.',
            category: 'services',
            tags: ['formation', 'apprentissage', 'autonomie'],
            helpfulCount: 22,
            open: false
        }
    ],
    layout: {
        columns: 1,
        gap: 'md',
        containerWidth: 'narrow',
        alignment: 'left'
    },
    display: {
        showIcon: true,
        iconStyle: 'plus',
        iconPosition: 'right',
        showNumber: false,
        numberStyle: 'decimal',
        showCategory: false,
        showTags: false,
        showHelpful: false,
        showShare: false,
        showSearch: false,
        expandBehavior: 'single',
        defaultExpanded: [],
        animation: 'slide',
        animationDuration: 300,
        divider: true,
        dividerStyle: 'solid',
        highlightOnHover: true,
        questionStyle: {
            fontSize: 'md',
            fontWeight: 'semibold',
            textTransform: 'none'
        },
        answerStyle: {
            fontSize: 'md',
            lineHeight: 'relaxed',
            formatting: true
        }
    },
    categories: {
        enabled: true,
        items: [
            { id: 'all', label: 'Toutes', count: 6 },
            { id: 'general', label: 'Général', icon: '📋', count: 1 },
            { id: 'services', label: 'Services', icon: '🛠️', count: 2 },
            { id: 'technical', label: 'Technique', icon: '💻', count: 2 },
            { id: 'pricing', label: 'Tarifs', icon: '💰', count: 1 }
        ],
        defaultCategory: 'all',
        style: 'tabs',
        position: 'top',
        showAll: true,
        allLabel: 'Toutes les questions',
        showCount: true,
        sticky: false
    },
    search: {
        enabled: false,
        placeholder: 'Rechercher une question...',
        position: 'top',
        style: 'simple',
        minChars: 3,
        debounceMs: 300,
        showSuggestions: true,
        highlightMatches: true,
        noResultsMessage: 'Aucune question trouvée',
        searchIn: ['question', 'answer']
    },
    feedback: {
        enabled: false,
        style: 'helpful',
        helpfulText: 'Cette réponse vous a-t-elle aidé ?',
        yesText: 'Oui',
        noText: 'Non',
        thanksMessage: 'Merci pour votre retour !',
        allowComments: false
    },
    chatMode: {
        enabled: false,
        botName: 'Assistant',
        typing: true,
        typingDuration: 1000,
        showTimestamp: false
    },
    cta: {
        enabled: true,
        title: 'Vous n\'avez pas trouvé votre réponse ?',
        description: 'Notre équipe est là pour vous aider',
        buttonText: 'Contactez-nous',
        buttonLink: '#contact',
        buttonVariant: 'primary',
        position: 'bottom',
        style: 'card'
    },
    styles: {
        padding: 'lg',
        borderRadius: 'md',
        shadow: 'none',
        cardStyle: 'flat'
    }
};
// Logger de validation
exports.faqDataSchema._parse = new Proxy(exports.faqDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('faqDataSchema', 'parse', 'Validation des données FAQ', {
            hasData: !!args[0],
            itemsCount: args[0]?.items?.length || 0
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('faqDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('faqDataSchema', 'parse', '✅ Validation réussie', {
                itemsCount: result.data.items.length,
                variant: result.data.variant
            });
        }
        return result;
    }
});

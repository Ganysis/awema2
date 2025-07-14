"use strict";
/**
 * Schéma Contact Ultra-Modern V3
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDefaults = exports.contactDataSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
exports.contactDataSchema = zod_1.z.object({
    // Variant visuel
    variant: common_1.modernVariantSchema,
    // Layout
    layout: zod_1.z.enum(['split-left', 'split-right', 'stacked', 'floating', 'fullwidth']).default('split-right'),
    // Contenu
    title: zod_1.z.string().min(1).max(100),
    subtitle: zod_1.z.string().max(200).optional(),
    description: zod_1.z.string().max(500).optional(),
    // Informations de contact
    contactInfo: zod_1.z.object({
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        address: zod_1.z.string().optional(),
        hours: zod_1.z.object({
            weekdays: zod_1.z.string().optional(),
            saturday: zod_1.z.string().optional(),
            sunday: zod_1.z.string().optional(),
        }).optional(),
        socials: zod_1.z.array(zod_1.z.object({
            platform: zod_1.z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']),
            url: zod_1.z.string().url(),
            username: zod_1.z.string().optional(),
        })).optional(),
    }),
    // Formulaire
    form: zod_1.z.object({
        fields: zod_1.z.array(common_1.formFieldSchema).min(1).max(10),
        submitButton: common_1.buttonSchema,
        successMessage: zod_1.z.string().default('Message envoyé avec succès !'),
        errorMessage: zod_1.z.string().default('Une erreur est survenue. Veuillez réessayer.'),
        webhookUrl: zod_1.z.string().url().optional(),
        recaptcha: zod_1.z.boolean().default(false),
    }),
    // Map
    map: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        position: zod_1.z.enum(['left', 'right', 'top', 'bottom', 'background']).default('right'),
        coordinates: zod_1.z.object({
            lat: zod_1.z.number().min(-90).max(90),
            lng: zod_1.z.number().min(-180).max(180),
        }),
        zoom: zod_1.z.number().min(1).max(20).default(14),
        style: zod_1.z.enum(['roadmap', 'satellite', 'hybrid', 'terrain', 'custom']).default('roadmap'),
        markers: zod_1.z.array(zod_1.z.object({
            position: zod_1.z.object({
                lat: zod_1.z.number(),
                lng: zod_1.z.number(),
            }),
            title: zod_1.z.string().optional(),
            icon: zod_1.z.string().optional(),
        })).optional(),
        apiKey: zod_1.z.string().optional(),
    }).optional(),
    // Features visuelles
    features: zod_1.z.object({
        floatingLabels: zod_1.z.boolean().default(true),
        iconFields: zod_1.z.boolean().default(true),
        liveValidation: zod_1.z.boolean().default(true),
        smoothScroll: zod_1.z.boolean().default(true),
    }).optional(),
    // Images/Décoration
    decorativeImage: common_1.imageSchema.optional(),
    backgroundPattern: zod_1.z.enum(['none', 'dots', 'grid', 'waves']).default('none'),
});
// Valeurs par défaut
exports.contactDefaults = {
    variant: 'split-screen',
    layout: 'split-right',
    title: 'Contactez-nous',
    subtitle: 'Nous sommes là pour vous aider',
    contactInfo: {
        phone: '01 23 45 67 89',
        email: 'contact@example.com',
    },
    form: {
        fields: [
            {
                name: 'name',
                label: 'Nom',
                type: 'text',
                required: true,
                placeholder: 'Votre nom',
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                required: true,
                placeholder: 'votre@email.com',
            },
            {
                name: 'message',
                label: 'Message',
                type: 'textarea',
                required: true,
                placeholder: 'Votre message...',
                rows: 5,
            },
        ],
        submitButton: {
            text: 'Envoyer',
            variant: 'primary',
            size: 'lg',
            fullWidth: true,
        },
        successMessage: 'Message envoyé avec succès !',
        errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
    },
};

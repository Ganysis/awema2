"use strict";
/**
 * Schéma Hero Ultra-Modern V3
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroDefaults = exports.heroDataSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
exports.heroDataSchema = zod_1.z.object({
    // Variant visuel
    variant: common_1.modernVariantSchema,
    // Layout
    layout: zod_1.z.enum(['center', 'left', 'right', 'two-columns', 'split-screen']).default('center'),
    // Contenu principal
    eyebrow: zod_1.z.string().max(50).optional(),
    title: zod_1.z.string().min(1).max(100),
    subtitle: zod_1.z.string().max(200).optional(),
    description: zod_1.z.string().max(500).optional(),
    // Boutons
    primaryButton: common_1.buttonSchema.optional(),
    secondaryButton: common_1.buttonSchema.optional(),
    // Média
    image: common_1.imageSchema.optional(),
    video: zod_1.z.object({
        url: zod_1.z.string().url(),
        poster: common_1.imageSchema.optional(),
    }).optional(),
    // Background
    background: common_1.backgroundSchema.optional(),
    // Hauteur
    height: zod_1.z.enum(['auto', 'screen', 'large', 'medium', 'small']).default('large'),
    // Features visuelles
    features: zod_1.z.object({
        particles: zod_1.z.boolean().default(false),
        waves: zod_1.z.boolean().default(false),
        gradient: zod_1.z.boolean().default(true),
        blur: zod_1.z.boolean().default(false),
        parallax: zod_1.z.boolean().default(false),
    }).optional(),
    // Badges/Tags
    badges: zod_1.z.array(zod_1.z.object({
        text: zod_1.z.string(),
        icon: zod_1.z.string().optional(),
        color: zod_1.z.enum(['primary', 'secondary', 'success', 'warning']).default('primary'),
    })).max(3).optional(),
    // Stats
    stats: zod_1.z.array(zod_1.z.object({
        value: zod_1.z.string(),
        label: zod_1.z.string(),
        icon: zod_1.z.string().optional(),
    })).max(4).optional(),
    // Animation
    titleAnimation: zod_1.z.enum(['none', 'typewriter', 'gradient', 'glitch', 'wave']).default('none'),
    contentAnimation: common_1.animationSchema.optional(),
});
// Valeurs par défaut
exports.heroDefaults = {
    variant: 'gradient-wave',
    layout: 'center',
    title: 'Titre Principal',
    subtitle: 'Sous-titre descriptif',
    height: 'large',
    titleAnimation: 'none',
};

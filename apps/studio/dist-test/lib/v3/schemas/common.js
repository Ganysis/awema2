"use strict";
/**
 * Schémas Zod communs pour tous les blocs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formFieldSchema = exports.backgroundSchema = exports.seoSchema = exports.responsiveValueSchema = exports.spacingSchema = exports.animationSchema = exports.classicVariantSchema = exports.modernVariantSchema = exports.blockVariants = exports.buttonSchema = exports.linkSchema = exports.imageSchema = exports.urlSchema = exports.colorSchema = void 0;
exports.createBlockSchema = createBlockSchema;
exports.validateColor = validateColor;
exports.validateUrl = validateUrl;
const zod_1 = require("zod");
// ============= SCHÉMAS DE BASE =============
exports.colorSchema = zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(|^rgba\(|^hsl\(|^hsla\(|^var\(--/);
exports.urlSchema = zod_1.z.string().url().or(zod_1.z.string().startsWith('/'));
exports.imageSchema = zod_1.z.object({
    src: zod_1.z.string(),
    alt: zod_1.z.string(),
    width: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
    loading: zod_1.z.enum(['lazy', 'eager']).default('lazy'),
});
exports.linkSchema = zod_1.z.object({
    href: zod_1.z.string(),
    target: zod_1.z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
    rel: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
});
exports.buttonSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, 'Le texte du bouton est requis'),
    link: zod_1.z.string().default('#'),
    variant: zod_1.z.enum(['primary', 'secondary', 'outline', 'ghost', 'gradient']).default('primary'),
    size: zod_1.z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
    icon: zod_1.z.string().optional(),
    iconPosition: zod_1.z.enum(['left', 'right']).default('left'),
    fullWidth: zod_1.z.boolean().default(false),
});
// ============= VARIANTS COMMUNS =============
exports.blockVariants = {
    modern: [
        'glassmorphism',
        'gradient-wave',
        'floating-cards',
        'split-screen',
        'neon-glow',
        'minimal-luxe',
        'particles',
        '3d-perspective'
    ],
    classic: [
        'simple',
        'elegant',
        'professional',
        'corporate'
    ],
};
exports.modernVariantSchema = zod_1.z.enum(exports.blockVariants.modern);
exports.classicVariantSchema = zod_1.z.enum(exports.blockVariants.classic);
// ============= ANIMATIONS =============
exports.animationSchema = zod_1.z.object({
    type: zod_1.z.enum(['fade', 'slide', 'zoom', 'rotate', 'bounce', 'none']).default('none'),
    duration: zod_1.z.number().min(0).max(5000).default(1000),
    delay: zod_1.z.number().min(0).max(5000).default(0),
    easing: zod_1.z.enum(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']).default('ease'),
});
// ============= SPACING =============
exports.spacingSchema = zod_1.z.object({
    top: zod_1.z.number().min(0).max(200).default(0),
    bottom: zod_1.z.number().min(0).max(200).default(0),
    left: zod_1.z.number().min(0).max(100).default(0),
    right: zod_1.z.number().min(0).max(100).default(0),
});
// ============= RESPONSIVE =============
const responsiveValueSchema = (schema) => zod_1.z.object({
    mobile: schema,
    tablet: schema.optional(),
    desktop: schema.optional(),
});
exports.responsiveValueSchema = responsiveValueSchema;
// ============= SEO =============
exports.seoSchema = zod_1.z.object({
    title: zod_1.z.string().max(60).optional(),
    description: zod_1.z.string().max(160).optional(),
    keywords: zod_1.z.array(zod_1.z.string()).max(10).optional(),
    ogImage: exports.imageSchema.optional(),
    noIndex: zod_1.z.boolean().default(false),
});
// ============= BACKGROUND =============
exports.backgroundSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        type: zod_1.z.literal('color'),
        color: exports.colorSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal('gradient'),
        gradient: zod_1.z.object({
            type: zod_1.z.enum(['linear', 'radial', 'conic']),
            angle: zod_1.z.number().min(0).max(360).default(135),
            colors: zod_1.z.array(zod_1.z.object({
                color: exports.colorSchema,
                position: zod_1.z.number().min(0).max(100),
            })).min(2).max(5),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('image'),
        image: exports.imageSchema,
        overlay: exports.colorSchema.optional(),
        parallax: zod_1.z.boolean().default(false),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('video'),
        videoUrl: exports.urlSchema,
        poster: exports.imageSchema.optional(),
        autoplay: zod_1.z.boolean().default(true),
        loop: zod_1.z.boolean().default(true),
        muted: zod_1.z.boolean().default(true),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('pattern'),
        pattern: zod_1.z.enum(['dots', 'grid', 'lines', 'waves', 'circuit']),
        color: exports.colorSchema,
        opacity: zod_1.z.number().min(0).max(1).default(0.1),
    }),
]);
// ============= FORM FIELDS =============
exports.formFieldSchema = zod_1.z.object({
    name: zod_1.z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Nom de champ invalide'),
    label: zod_1.z.string().min(1),
    type: zod_1.z.enum(['text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox', 'radio', 'file']),
    placeholder: zod_1.z.string().optional(),
    required: zod_1.z.boolean().default(false),
    validation: zod_1.z.object({
        pattern: zod_1.z.string().optional(),
        min: zod_1.z.number().optional(),
        max: zod_1.z.number().optional(),
        minLength: zod_1.z.number().optional(),
        maxLength: zod_1.z.number().optional(),
    }).optional(),
    options: zod_1.z.array(zod_1.z.object({
        value: zod_1.z.string(),
        label: zod_1.z.string(),
    })).optional(),
    rows: zod_1.z.number().min(1).max(20).default(4).optional(),
    accept: zod_1.z.string().optional(), // Pour type="file"
});
// ============= HELPERS =============
/**
 * Crée un schéma pour un bloc avec métadonnées
 */
function createBlockSchema(dataSchema) {
    return zod_1.z.object({
        id: zod_1.z.string(),
        type: zod_1.z.string(),
        data: dataSchema,
        animation: exports.animationSchema.optional(),
        spacing: exports.spacingSchema.optional(),
        responsive: zod_1.z.object({
            hideOnMobile: zod_1.z.boolean().default(false),
            hideOnTablet: zod_1.z.boolean().default(false),
            hideOnDesktop: zod_1.z.boolean().default(false),
        }).optional(),
        className: zod_1.z.string().optional(),
        attributes: zod_1.z.record(zod_1.z.string()).optional(),
    });
}
/**
 * Valide et nettoie une couleur
 */
function validateColor(color) {
    const result = exports.colorSchema.safeParse(color);
    return result.success ? result.data : '#000000';
}
/**
 * Valide et nettoie une URL
 */
function validateUrl(url) {
    const result = exports.urlSchema.safeParse(url);
    return result.success ? result.data : '#';
}

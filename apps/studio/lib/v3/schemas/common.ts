/**
 * Schémas Zod communs pour tous les blocs
 */

import { z } from 'zod';

// ============= SCHÉMAS DE BASE =============

export const colorSchema = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(|^rgba\(|^hsl\(|^hsla\(|^var\(--/);

export const urlSchema = z.string().url().or(z.string().startsWith('/'));

export const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  loading: z.enum(['lazy', 'eager']).default('lazy'),
});

export const linkSchema = z.object({
  href: z.string(),
  target: z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
  rel: z.string().optional(),
  title: z.string().optional(),
});

export const buttonSchema = z.object({
  text: z.string().min(1, 'Le texte du bouton est requis'),
  link: z.string().default('#'),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost', 'gradient']).default('primary'),
  size: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
  icon: z.string().optional(),
  iconPosition: z.enum(['left', 'right']).default('left'),
  fullWidth: z.boolean().default(false),
});

// ============= VARIANTS COMMUNS =============

export const blockVariants = {
  modern: [
    'glassmorphism',
    'gradient-wave', 
    'floating-cards',
    'split-screen',
    'neon-glow',
    'minimal-luxe',
    'particles',
    '3d-perspective'
  ] as const,
  
  classic: [
    'simple',
    'elegant',
    'professional',
    'corporate'
  ] as const,
};

export const modernVariantSchema = z.enum(blockVariants.modern);
export const classicVariantSchema = z.enum(blockVariants.classic);

// ============= ANIMATIONS =============

export const animationSchema = z.object({
  type: z.enum(['fade', 'slide', 'zoom', 'rotate', 'bounce', 'none']).default('none'),
  duration: z.number().min(0).max(5000).default(1000),
  delay: z.number().min(0).max(5000).default(0),
  easing: z.enum(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']).default('ease'),
});

// ============= SPACING =============

export const spacingSchema = z.object({
  top: z.number().min(0).max(200).default(0),
  bottom: z.number().min(0).max(200).default(0),
  left: z.number().min(0).max(100).default(0),
  right: z.number().min(0).max(100).default(0),
});

// ============= RESPONSIVE =============

export const responsiveValueSchema = <T extends z.ZodType>(schema: T) => z.object({
  mobile: schema,
  tablet: schema.optional(),
  desktop: schema.optional(),
});

// ============= SEO =============

export const seoSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  keywords: z.array(z.string()).max(10).optional(),
  ogImage: imageSchema.optional(),
  noIndex: z.boolean().default(false),
});

// ============= BACKGROUND =============

export const backgroundSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('color'),
    color: colorSchema,
  }),
  z.object({
    type: z.literal('gradient'),
    gradient: z.object({
      type: z.enum(['linear', 'radial', 'conic']),
      angle: z.number().min(0).max(360).default(135),
      colors: z.array(z.object({
        color: colorSchema,
        position: z.number().min(0).max(100),
      })).min(2).max(5),
    }),
  }),
  z.object({
    type: z.literal('image'),
    image: imageSchema,
    overlay: colorSchema.optional(),
    parallax: z.boolean().default(false),
  }),
  z.object({
    type: z.literal('video'),
    videoUrl: urlSchema,
    poster: imageSchema.optional(),
    autoplay: z.boolean().default(true),
    loop: z.boolean().default(true),
    muted: z.boolean().default(true),
  }),
  z.object({
    type: z.literal('pattern'),
    pattern: z.enum(['dots', 'grid', 'lines', 'waves', 'circuit']),
    color: colorSchema,
    opacity: z.number().min(0).max(1).default(0.1),
  }),
]);

// ============= FORM FIELDS =============

export const formFieldSchema = z.object({
  name: z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Nom de champ invalide'),
  label: z.string().min(1),
  type: z.enum(['text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox', 'radio', 'file']),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  validation: z.object({
    pattern: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
  }).optional(),
  options: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),
  rows: z.number().min(1).max(20).default(4).optional(),
  accept: z.string().optional(), // Pour type="file"
});

// ============= HELPERS =============

/**
 * Crée un schéma pour un bloc avec métadonnées
 */
export function createBlockSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    id: z.string(),
    type: z.string(),
    data: dataSchema,
    animation: animationSchema.optional(),
    spacing: spacingSchema.optional(),
    responsive: z.object({
      hideOnMobile: z.boolean().default(false),
      hideOnTablet: z.boolean().default(false),
      hideOnDesktop: z.boolean().default(false),
    }).optional(),
    className: z.string().optional(),
    attributes: z.record(z.string()).optional(),
  });
}

/**
 * Valide et nettoie une couleur
 */
export function validateColor(color: unknown): string {
  const result = colorSchema.safeParse(color);
  return result.success ? result.data : '#000000';
}

/**
 * Valide et nettoie une URL
 */
export function validateUrl(url: unknown): string {
  const result = urlSchema.safeParse(url);
  return result.success ? result.data : '#';
}
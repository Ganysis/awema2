/**
 * Schéma Hero Ultra-Modern V3
 */

import { z } from 'zod';
import { 
  modernVariantSchema, 
  buttonSchema, 
  backgroundSchema,
  animationSchema,
  imageSchema
} from '../common';

export const heroDataSchema = z.object({
  // Variant visuel
  variant: modernVariantSchema,
  
  // Layout
  layout: z.enum(['center', 'left', 'right', 'two-columns', 'split-screen']).default('center'),
  
  // Contenu principal
  eyebrow: z.string().max(50).optional(),
  title: z.string().min(1).max(100),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  
  // Boutons
  primaryButton: buttonSchema.optional(),
  secondaryButton: buttonSchema.optional(),
  
  // Média
  image: imageSchema.optional(),
  video: z.object({
    url: z.string().url(),
    poster: imageSchema.optional(),
  }).optional(),
  
  // Background
  background: backgroundSchema.optional(),
  
  // Hauteur
  height: z.enum(['auto', 'screen', 'large', 'medium', 'small']).default('large'),
  
  // Features visuelles
  features: z.object({
    particles: z.boolean().default(false),
    waves: z.boolean().default(false),
    gradient: z.boolean().default(true),
    blur: z.boolean().default(false),
    parallax: z.boolean().default(false),
  }).optional(),
  
  // Badges/Tags
  badges: z.array(z.object({
    text: z.string(),
    icon: z.string().optional(),
    color: z.enum(['primary', 'secondary', 'success', 'warning']).default('primary'),
  })).max(3).optional(),
  
  // Stats
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
    icon: z.string().optional(),
  })).max(4).optional(),
  
  // Animation
  titleAnimation: z.enum(['none', 'typewriter', 'gradient', 'glitch', 'wave']).default('none'),
  contentAnimation: animationSchema.optional(),
});

export type HeroData = z.infer<typeof heroDataSchema>;

// Valeurs par défaut
export const heroDefaults: HeroData = {
  variant: 'gradient-wave',
  layout: 'center',
  title: 'Titre Principal',
  subtitle: 'Sous-titre descriptif',
  height: 'large',
  titleAnimation: 'none',
};
/**
 * Hero Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { heroDataSchema, heroDefaults, type HeroData } from '../schemas/blocks/hero';
import { logger } from '../core/logger';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { 
  designTokens, 
  baseStyles, 
  microInteractions,
  generateCSS as generateDesignSystemCSS 
} from '../design-system';
import { 
  animations, 
  generateAnimationCSS,
  blockAnimations 
} from '../design-system/animations';
import { 
  ariaAttributes,
  generateAccessibilityCSS 
} from '../design-system/accessibility';
import { 
  performanceConfig,
  generatePerformanceCSS 
} from '../design-system/performance';

export class HeroRendererV3Perfect extends BaseRendererV3<HeroData> {
  type = 'hero-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('HeroRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Hero V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<HeroData, HeroData> {
    logger.debug('HeroRendererV3Perfect', 'validate', 'Validation des données');
    return heroDataSchema.safeParse(data);
  }

  getDefaultData(): HeroData {
    return heroDefaults;
  }

  /**
   * Définit les propriétés éditables du bloc Hero V3
   */
  getBlockProps(): BlockProp[] {
    return [
      // Groupe Visuel
      {
        name: 'variant',
        label: 'Style visuel',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'gradient-wave',
        description: 'Choisissez le style visuel du hero',
        options: [
          { value: 'modern', label: '🎨 Moderne - Gradient dynamique' },
          { value: 'minimal', label: '⚡ Minimaliste - Épuré et rapide' },
          { value: 'bold', label: '🔥 Audacieux - Impact visuel fort' },
          { value: 'elegant', label: '✨ Élégant - Glassmorphism subtil' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Visuel',
          order: 1
        }
      },
      {
        name: 'layout',
        label: 'Disposition',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'center',
        description: 'Disposition du contenu',
        options: ['center', 'left', 'right', 'two-columns', 'split-screen'],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Visuel',
          order: 2
        }
      },
      {
        name: 'height',
        label: 'Hauteur',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'large',
        description: 'Hauteur du bloc hero',
        options: ['auto', 'screen', 'large', 'medium', 'small'],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Visuel',
          order: 3
        }
      },
      
      // Groupe Contenu
      {
        name: 'eyebrow',
        label: 'Sur-titre',
        type: PropType.STRING,
        required: false,
        defaultValue: '',
        description: 'Petit texte au-dessus du titre (max 50 caractères)',
        validation: { max: 50 },
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'ex: Bienvenue',
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'title',
        label: 'Titre principal',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Titre Principal',
        description: 'Le titre principal du hero (max 100 caractères)',
        validation: { min: 1, max: 100 },
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'ex: Votre partenaire de confiance',
          group: 'Contenu',
          order: 2
        }
      },
      {
        name: 'subtitle',
        label: 'Sous-titre',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Sous-titre descriptif',
        description: 'Sous-titre du hero (max 200 caractères)',
        validation: { max: 200 },
        editorConfig: {
          control: EditorControl.TEXTAREA,
          placeholder: 'ex: Description de vos services',
          group: 'Contenu',
          order: 3
        }
      },
      {
        name: 'description',
        label: 'Description',
        type: PropType.STRING,
        required: false,
        defaultValue: '',
        description: 'Description détaillée (max 500 caractères)',
        validation: { max: 500 },
        editorConfig: {
          control: EditorControl.TEXTAREA,
          placeholder: 'ex: Texte plus détaillé...',
          group: 'Contenu',
          order: 4
        }
      },
      
      // Groupe Actions
      {
        name: 'primaryButton',
        label: 'Bouton principal',
        type: PropType.OBJECT,
        required: false,
        itemSchema: [
          {
            name: 'text',
            label: 'Texte',
            type: PropType.STRING,
            required: true,
            editorConfig: { control: EditorControl.TEXT }
          },
          {
            name: 'link',
            label: 'Lien',
            type: PropType.LINK,
            required: false,
            defaultValue: '#',
            editorConfig: { control: EditorControl.TEXT }
          },
          {
            name: 'variant',
            label: 'Style',
            type: PropType.SELECT,
            required: false,
            defaultValue: 'primary',
            options: ['primary', 'secondary', 'outline', 'ghost', 'gradient'],
            editorConfig: { control: EditorControl.SELECT }
          }
        ],
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: 'Actions',
          order: 1
        }
      },
      {
        name: 'secondaryButton',
        label: 'Bouton secondaire',
        type: PropType.OBJECT,
        required: false,
        itemSchema: [
          {
            name: 'text',
            label: 'Texte',
            type: PropType.STRING,
            required: true,
            editorConfig: { control: EditorControl.TEXT }
          },
          {
            name: 'link',
            label: 'Lien',
            type: PropType.LINK,
            required: false,
            defaultValue: '#',
            editorConfig: { control: EditorControl.TEXT }
          },
          {
            name: 'variant',
            label: 'Style',
            type: PropType.SELECT,
            required: false,
            defaultValue: 'secondary',
            options: ['primary', 'secondary', 'outline', 'ghost', 'gradient'],
            editorConfig: { control: EditorControl.SELECT }
          }
        ],
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: 'Actions',
          order: 2
        }
      },
      
      // Groupe Média
      {
        name: 'image',
        label: 'Image',
        type: PropType.IMAGE,
        required: false,
        description: 'Image principale du hero',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          group: 'Média',
          order: 1
        }
      },
      {
        name: 'backgroundImage',
        label: 'Image de fond',
        type: PropType.IMAGE,
        required: false,
        description: 'Image de fond du hero',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          group: 'Média',
          order: 2
        }
      },
      
      // Groupe Configuration
      {
        name: 'titleAnimation',
        label: 'Animation du titre',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'none',
        description: 'Type d\'animation pour le titre',
        options: ['none', 'typewriter', 'gradient', 'glitch', 'wave'],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Configuration',
          order: 1
        }
      },
      {
        name: 'features',
        label: 'Effets visuels',
        type: PropType.OBJECT,
        required: false,
        itemSchema: [
          {
            name: 'particles',
            label: 'Particules',
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: false,
            editorConfig: { control: EditorControl.TOGGLE }
          },
          {
            name: 'waves',
            label: 'Vagues',
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: false,
            editorConfig: { control: EditorControl.TOGGLE }
          },
          {
            name: 'gradient',
            label: 'Dégradé',
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: true,
            editorConfig: { control: EditorControl.TOGGLE }
          },
          {
            name: 'blur',
            label: 'Flou',
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: false,
            editorConfig: { control: EditorControl.TOGGLE }
          },
          {
            name: 'parallax',
            label: 'Parallaxe',
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: false,
            editorConfig: { control: EditorControl.TOGGLE }
          }
        ],
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: 'Configuration',
          order: 2
        }
      }
    ];
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   HERO V3 PERFECT - Design System Unifié
   ======================================== */

/* Import du design system */
${generateDesignSystemCSS()}
${generateAnimationCSS()}
${generateAccessibilityCSS()}
${generatePerformanceCSS()}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

/* Container avec tokens du design system */
.hero__container {
  ${baseStyles.container}
  position: relative;
  z-index: ${designTokens.zIndex.above};
}

/* ========================================
   VARIANTES VISUELLES UNIFIÉES
   ======================================== */

/* 1. Gradient Animé Luxe */
.hero--gradient-animated {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: heroGradientLuxe 15s ease infinite;
}

@keyframes heroGradientLuxe {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero--gradient-animated::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%);
  animation: heroGlow 8s ease-in-out infinite alternate;
}

@keyframes heroGlow {
  from { opacity: 0.5; transform: scale(1); }
  to { opacity: 0.8; transform: scale(1.1); }
}

/* 2. Glassmorphism Ultra */
.hero--glassmorphism {
  background: url('data:image/svg+xml,<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"><defs><filter id="blur"><feGaussianBlur stdDeviation="100"/></filter></defs><rect width="1920" height="1080" fill="%23667eea" filter="url(%23blur)"/><circle cx="400" cy="300" r="300" fill="%23764ba2" filter="url(%23blur)"/><circle cx="1500" cy="800" r="400" fill="%23f093fb" filter="url(%23blur)"/></svg>') center/cover;
}

.hero--glassmorphism .hero__content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 3. Parallax Particles Magique */
.hero--parallax-particles {
  background: linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460);
}

.hero--parallax-particles::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="white" opacity="0.3"/><circle cx="50" cy="50" r="1.5" fill="white" opacity="0.5"/><circle cx="80" cy="20" r="1" fill="white" opacity="0.3"/><circle cx="20" cy="80" r="0.8" fill="white" opacity="0.4"/></svg>');
  animation: heroParticles 50s linear infinite;
}

@keyframes heroParticles {
  from { transform: translateY(0) translateX(0); }
  to { transform: translateY(-100vh) translateX(-100px); }
}

/* 4. Vidéo Background Cinématique */
.hero--video-cinematic {
  background: #000;
}

.hero--video-cinematic .hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.hero--video-cinematic::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(0,0,0,0.3) 0%, 
    rgba(0,0,0,0) 50%, 
    rgba(0,0,0,0.6) 100%);
  pointer-events: none;
}

/* 5. Morphing Shapes Futuriste */
.hero--morphing-shapes {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.hero--morphing-shapes .hero__shape {
  position: absolute;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: heroMorph 20s ease-in-out infinite;
  filter: blur(40px);
  opacity: 0.7;
}

.hero--morphing-shapes .hero__shape:nth-child(1) {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.hero--morphing-shapes .hero__shape:nth-child(2) {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  bottom: -200px;
  right: -200px;
  animation-delay: -10s;
}

@keyframes heroMorph {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
  33% { border-radius: 70% 30% 50% 50% / 30% 70% 70% 30%; transform: rotate(120deg) scale(1.1); }
  66% { border-radius: 30% 70% 40% 60% / 70% 30% 60% 40%; transform: rotate(240deg) scale(0.9); }
}

/* 6. Néon Cyberpunk */
.hero--neon-cyberpunk {
  background: #0a0a0a;
  color: #fff;
}

.hero--neon-cyberpunk .hero__title {
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(45deg, #f06, #0ff, #f06);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: heroNeonGlow 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 0, 102, 0.5));
}

@keyframes heroNeonGlow {
  0%, 100% { background-position: 0% 50%; filter: drop-shadow(0 0 20px rgba(255, 0, 102, 0.5)); }
  50% { background-position: 100% 50%; filter: drop-shadow(0 0 40px rgba(0, 255, 255, 0.8)); }
}

.hero--neon-cyberpunk .hero__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 0, 102, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: heroGridMove 20s linear infinite;
}

@keyframes heroGridMove {
  from { transform: translate(0, 0); }
  to { transform: translate(50px, 50px); }
}

/* 7. Liquid Gradient Organique */
.hero--liquid-gradient {
  background: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}

.hero--liquid-gradient::before,
.hero--liquid-gradient::after {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  background: inherit;
  filter: blur(100px) saturate(150%);
  opacity: 0.7;
  animation: heroLiquid 25s ease-in-out infinite;
}

.hero--liquid-gradient::after {
  animation-delay: -12.5s;
  animation-direction: reverse;
}

@keyframes heroLiquid {
  0%, 100% { transform: translate(-30%, -30%) rotate(0deg) scale(1); }
  33% { transform: translate(30%, -30%) rotate(120deg) scale(1.2); }
  66% { transform: translate(-30%, 30%) rotate(240deg) scale(0.8); }
}

/* 8. Minimaliste Élégant */
.hero--minimal-elegant {
  background: #fafafa;
  color: #1a1a1a;
}

.hero--minimal-elegant .hero__accent {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  filter: blur(80px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: heroBreath 6s ease-in-out infinite;
}

@keyframes heroBreath {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}

/* ========================================
   TYPOGRAPHIE MAGNIFIQUE
   ======================================== */

.hero__title {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  opacity: 0;
  animation: heroFadeUp 1s ease-out 0.2s forwards;
}

.hero__subtitle {
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 1rem;
  opacity: 0;
  animation: heroFadeUp 1s ease-out 0.4s forwards;
}

.hero__description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: heroFadeUp 1s ease-out 0.6s forwards;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   BOUTONS MAGNIFIQUES
   ======================================== */

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  opacity: 0;
  animation: heroFadeUp 1s ease-out 0.8s forwards;
}

.hero__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 9999px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* Bouton Primary Magnifique */
.hero__button--primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.5);
}

.hero__button--primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #764ba2, #f093fb);
  opacity: 0;
  transition: opacity 0.3s;
}

.hero__button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -15px rgba(102, 126, 234, 0.6);
}

.hero__button--primary:hover::before {
  opacity: 1;
}

.hero__button--primary span {
  position: relative;
  z-index: 1;
}

/* Bouton Secondary Glassmorphism */
.hero__button--secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: currentColor;
}

.hero__button--secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Animation icône */
.hero__button-icon {
  font-size: 1.25rem;
  transition: transform 0.3s;
}

.hero__button:hover .hero__button-icon {
  transform: translateX(4px);
}

/* ========================================
   FEATURES RAPIDES
   ======================================== */

.hero__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  opacity: 0;
  animation: heroFadeUp 1s ease-out 1s forwards;
}

.hero__feature {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hero__feature-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  font-size: 1.5rem;
}

.hero__feature-text {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* ========================================
   MEDIAS & DECORATIONS
   ======================================== */

.hero__media {
  position: absolute;
  top: 50%;
  right: -10%;
  transform: translateY(-50%);
  width: 50%;
  max-width: 700px;
  opacity: 0;
  animation: heroSlideIn 1.2s ease-out 0.5s forwards;
}

@keyframes heroSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.hero__image {
  width: 100%;
  height: auto;
  border-radius: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Badge flottant */
.hero__badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  animation: heroPulse 2s ease-in-out infinite;
}

@keyframes heroPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* ========================================
   RESPONSIVE PARFAIT
   ======================================== */

@media (max-width: 1024px) {
  .hero__container {
    padding: 0 1.5rem;
  }
  
  .hero__media {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    width: 100%;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: calc(100vh - 60px);
  }
  
  .hero__title {
    font-size: clamp(2rem, 10vw, 3.5rem);
  }
  
  .hero__cta {
    flex-direction: column;
    width: 100%;
  }
  
  .hero__button {
    width: 100%;
    justify-content: center;
  }
  
  .hero__features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* ========================================
   ANIMATIONS AVANCÉES
   ======================================== */

/* Effet de parallaxe au scroll */
.hero[data-parallax="true"] {
  transform: translateY(calc(var(--scroll-y, 0) * 0.5));
}

.hero[data-parallax="true"] .hero__container {
  transform: translateY(calc(var(--scroll-y, 0) * -0.3));
}

/* Curseur personnalisé */
.hero--cursor-glow {
  cursor: none;
}

.hero__cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent);
  pointer-events: none;
  mix-blend-mode: screen;
  z-index: 9999;
  transition: transform 0.1s ease-out;
}

/* ========================================
   THÈME SOMBRE
   ======================================== */

[data-theme="dark"] .hero--minimal-elegant {
  background: #0a0a0a;
  color: #fafafa;
}

[data-theme="dark"] .hero__button--secondary {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

/* ========================================
   OPTIMISATIONS PERFORMANCES
   ======================================== */

.hero * {
  will-change: auto;
}

.hero__title,
.hero__subtitle,
.hero__description,
.hero__cta {
  contain: layout style;
}

@media (prefers-reduced-motion: reduce) {
  .hero,
  .hero * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
  }

  getRequiredAssets(): any[] {
    return [
      {
        type: 'font',
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap'
      }
    ];
  }

  render(data: HeroData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('HeroRendererV3Perfect', 'render', '🎨 Début du rendu Hero parfait', {
      variant: data.variant
    });

    try {
      // Générer les classes
      const classes = this.getClasses(data);
      
      // Générer le HTML magnifique
      const html = `
<section class="${classes}" ${data.height ? `style="min-height: ${data.height};"` : ''}>
  ${this.renderBackground(data)}
  ${this.renderDecorations(data)}
  
  <div class="hero__container">
    <div class="hero__content">
      ${this.renderBadge(data)}
      ${this.renderTitle(data)}
      ${this.renderSubtitle(data)}
      ${this.renderDescription(data)}
      ${this.renderCTA(data)}
      ${this.renderFeatures(data)}
    </div>
    ${this.renderMedia(data)}
  </div>
  
  ${this.renderCursor(data)}
</section>`;

      // CSS dynamique pour personnalisation
      const dynamicCSS = this.generateDynamicCSS(data);
      
      // JavaScript pour les interactions
      const js = this.generateJS(data);

      const result: RenderResult = {
        html: html.trim(),
        css: this.getDefaultCSS() + '\n' + dynamicCSS,
        js,
        assets: this.getRequiredAssets(),
        errors: [],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: dynamicCSS.length,
          jsSize: js.length
        }
      };

      logger.info('HeroRendererV3Perfect', 'render', '✅ Rendu Hero parfait terminé', {
        renderTime: result.performance?.renderTime
      });

      return result;

    } catch (error) {
      logger.error('HeroRendererV3Perfect', 'render', '❌ Erreur lors du rendu', error as Error);
      
      return {
        html: this.renderFallback(data),
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'hero',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          fallbackUsed: true
        }],
        warnings: []
      };
    }
  }

  private getClasses(data: HeroData): string {
    const classes = [
      'hero',
      `hero--${data.variant}`,
      data.overlay?.enabled ? 'hero--has-overlay' : '',
      data.parallax?.enabled ? 'hero--parallax' : '',
      data.animation?.entrance ? `hero--animate-${data.animation.entrance}` : ''
    ];

    return classes.filter(Boolean).join(' ');
  }

  private renderBackground(data: HeroData): string {
    if (data.background?.type === 'video' && data.background.video) {
      return `
  <video class="hero__video" autoplay muted loop playsinline>
    <source src="${data.background.video.url}" type="video/mp4">
  </video>`;
    }

    if (data.background?.type === 'image' && data.background.image) {
      return `
  <div class="hero__background" style="background-image: url('${data.background.image.src}')"></div>`;
    }

    return '';
  }

  private renderDecorations(data: HeroData): string {
    const decorations: string[] = [];

    // Formes morphing
    if (data.variant === 'morphing-shapes') {
      decorations.push('<div class="hero__shape"></div>');
      decorations.push('<div class="hero__shape"></div>');
    }

    // Grille cyberpunk
    if (data.variant === 'neon-cyberpunk') {
      decorations.push('<div class="hero__grid"></div>');
    }

    // Accent minimaliste
    if (data.variant === 'minimal-elegant') {
      decorations.push('<div class="hero__accent"></div>');
    }

    return decorations.join('\n  ');
  }

  private renderBadge(data: HeroData): string {
    if (!data.badge?.enabled || !data.badge.text) return '';

    return `
      <div class="hero__badge">
        ${data.badge.icon ? `<span class="hero__badge-icon">${data.badge.icon}</span>` : ''}
        <span>${data.badge.text}</span>
      </div>`;
  }

  private renderTitle(data: HeroData): string {
    if (!data.title) return '';

    // Effet spécial pour certaines variantes
    if (data.variant === 'neon-cyberpunk') {
      return `
      <h1 class="hero__title" data-text="${data.title}">
        <span>${data.title}</span>
      </h1>`;
    }

    return `
      <h1 class="hero__title">${data.title}</h1>`;
  }

  private renderSubtitle(data: HeroData): string {
    if (!data.subtitle) return '';
    return `
      <p class="hero__subtitle">${data.subtitle}</p>`;
  }

  private renderDescription(data: HeroData): string {
    if (!data.description) return '';
    return `
      <p class="hero__description">${data.description}</p>`;
  }

  private renderCTA(data: HeroData): string {
    if (!data.cta) return '';

    const buttons: string[] = [];

    if (data.cta.primary) {
      buttons.push(`
        <a href="${data.cta.primary.link}" class="hero__button hero__button--primary">
          <span>${data.cta.primary.text}</span>
          ${data.cta.primary.icon ? `<span class="hero__button-icon">${data.cta.primary.icon}</span>` : '<span class="hero__button-icon">→</span>'}
        </a>`);
    }

    if (data.cta.secondary) {
      buttons.push(`
        <a href="${data.cta.secondary.link}" class="hero__button hero__button--secondary">
          <span>${data.cta.secondary.text}</span>
          ${data.cta.secondary.icon ? `<span class="hero__button-icon">${data.cta.secondary.icon}</span>` : ''}
        </a>`);
    }

    return buttons.length > 0 ? `
      <div class="hero__cta">
        ${buttons.join('\n        ')}
      </div>` : '';
  }

  private renderFeatures(data: HeroData): string {
    if (!data.features || data.features.length === 0) return '';

    const features = data.features.map(feature => `
        <div class="hero__feature">
          <div class="hero__feature-icon">${feature.icon}</div>
          <span class="hero__feature-text">${feature.text}</span>
        </div>`).join('');

    return `
      <div class="hero__features">
        ${features}
      </div>`;
  }

  private renderMedia(data: HeroData): string {
    if (!data.media?.enabled) return '';

    if (data.media.type === 'image' && data.media.image) {
      return `
    <div class="hero__media">
      <img src="${data.media.image.src}" alt="${data.media.image.alt}" class="hero__image" loading="lazy">
    </div>`;
    }

    // Autres types de médias...
    return '';
  }

  private renderCursor(data: HeroData): string {
    if (data.variant === 'neon-cyberpunk' || data.animation?.cursor === 'glow') {
      return '<div class="hero__cursor"></div>';
    }
    return '';
  }

  private generateDynamicCSS(data: HeroData): string {
    const css: string[] = [];

    // Couleurs personnalisées
    if (data.styles?.colors) {
      css.push(`
.hero {
  --hero-primary: ${data.styles.colors.primary || '#667eea'};
  --hero-secondary: ${data.styles.colors.secondary || '#764ba2'};
  --hero-accent: ${data.styles.colors.accent || '#f093fb'};
  --hero-text: ${data.styles.colors.text || 'inherit'};
  --hero-text-secondary: ${data.styles.colors.textSecondary || 'inherit'};
}`);
    }

    // Typographie personnalisée
    if (data.styles?.typography) {
      css.push(`
.hero__title {
  font-family: ${data.styles.typography.headingFont || 'inherit'};
  font-weight: ${data.styles.typography.headingWeight || '800'};
}
.hero__subtitle,
.hero__description {
  font-family: ${data.styles.typography.bodyFont || 'inherit'};
}`);
    }

    return css.join('\n');
  }

  private generateJS(data: HeroData): string {
    const js: string[] = [];

    // Parallaxe
    if (data.parallax?.enabled) {
      js.push(`
// Effet parallaxe Hero
(function() {
  const hero = document.querySelector('.hero--parallax');
  if (!hero) return;
  
  let ticking = false;
  function updateParallax() {
    const scrollY = window.scrollY;
    hero.style.setProperty('--scroll-y', scrollY + 'px');
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
})();`);
    }

    // Curseur personnalisé
    if (data.variant === 'neon-cyberpunk' || data.animation?.cursor === 'glow') {
      js.push(`
// Curseur lumineux Hero
(function() {
  const cursor = document.querySelector('.hero__cursor');
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.transform = \`translate(\${cursorX - 20}px, \${cursorY - 20}px)\`;
    
    requestAnimationFrame(animate);
  }
  animate();
})();`);
    }

    // Animation au scroll
    if (data.animation?.onScroll) {
      js.push(`
// Animation au scroll Hero
(function() {
  const hero = document.querySelector('.hero');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hero--in-view');
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(hero);
})();`);
    }

    return js.join('\n\n');
  }

  private renderFallback(data: HeroData): string {
    return `
<section class="hero hero--fallback">
  <div class="hero__container">
    <h1>${data.title || 'Bienvenue'}</h1>
    ${data.subtitle ? `<p>${data.subtitle}</p>` : ''}
    ${data.cta?.primary ? `<a href="${data.cta.primary.link}" class="hero__button">${data.cta.primary.text}</a>` : ''}
  </div>
</section>`;
  }

  renderPreview(data: HeroData): string {
    // Version simplifiée pour l'éditeur
    return `
<div class="hero-preview hero--${data.variant}">
  <div class="hero-preview__content">
    <h3>${data.title || 'Titre Hero'}</h3>
    <p>${data.subtitle || 'Sous-titre'}</p>
  </div>
</div>`;
  }
}
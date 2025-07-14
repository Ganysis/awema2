/**
 * Hero Renderer V3 PERFECT v2 - Avec Design System Unifié
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

export class HeroRendererV3PerfectV2 extends BaseRendererV3<HeroData> {
  type = 'hero-v3-perfect';
  version = '3.1.0';

  constructor() {
    super();
    logger.info('HeroRendererV3PerfectV2', 'constructor', '🚀 Initialisation avec Design System unifié');
  }

  validate(data: unknown): z.SafeParseReturnType<HeroData, HeroData> {
    return heroDataSchema.safeParse(data);
  }

  getDefaultData(): HeroData {
    return heroDefaults;
  }

  getBlockProps(): BlockProp[] {
    return [
      // Simplification des variantes (de 8 à 4)
      {
        name: 'variant',
        label: 'Style visuel',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel',
        options: [
          { value: 'modern', label: 'Moderne', preview: '🎨' },
          { value: 'minimal', label: 'Minimaliste', preview: '⚡' },
          { value: 'bold', label: 'Audacieux', preview: '🔥' },
          { value: 'elegant', label: 'Élégant', preview: '✨' }
        ],
        editorConfig: {
          control: EditorControl.RADIO_VISUAL, // Nouveau contrôle avec preview
          group: 'Style',
          order: 1
        }
      },
      {
        name: 'layout',
        label: 'Disposition',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'center',
        options: ['center', 'left', 'split'],
        editorConfig: {
          control: EditorControl.BUTTON_GROUP,
          group: 'Style',
          order: 2
        }
      },
      
      // Contenu principal
      {
        name: 'title',
        label: 'Titre principal',
        type: PropType.STRING,
        required: true,
        validation: { max: 100 },
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'Votre titre accrocheur',
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'subtitle',
        label: 'Sous-titre',
        type: PropType.STRING,
        required: false,
        validation: { max: 200 },
        editorConfig: {
          control: EditorControl.TEXTAREA,
          placeholder: 'Description engageante',
          group: 'Contenu',
          order: 2
        }
      },
      
      // Actions simplifiées
      {
        name: 'primaryAction',
        label: 'Action principale',
        type: PropType.OBJECT,
        required: false,
        itemSchema: [
          {
            name: 'text',
            label: 'Texte',
            type: PropType.STRING,
            required: true,
            defaultValue: 'Commencer'
          },
          {
            name: 'link',
            label: 'Lien',
            type: PropType.LINK,
            required: true,
            defaultValue: '#contact'
          }
        ],
        editorConfig: {
          control: EditorControl.INLINE_OBJECT,
          group: 'Actions',
          order: 1
        }
      },
      {
        name: 'secondaryAction',
        label: 'Action secondaire',
        type: PropType.OBJECT,
        required: false,
        itemSchema: [
          {
            name: 'text',
            label: 'Texte',
            type: PropType.STRING,
            defaultValue: 'En savoir plus'
          },
          {
            name: 'link',
            label: 'Lien',
            type: PropType.LINK,
            defaultValue: '#services'
          }
        ],
        editorConfig: {
          control: EditorControl.INLINE_OBJECT,
          group: 'Actions',
          order: 2
        }
      },
      
      // Image avec optimisation
      {
        name: 'image',
        label: 'Image',
        type: PropType.IMAGE,
        required: false,
        description: 'Format recommandé : 1920x1080, WebP',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          group: 'Média',
          order: 1,
          acceptFormats: ['image/webp', 'image/jpeg', 'image/png'],
          maxSize: 500000, // 500KB
          optimize: true
        }
      }
    ];
  }

  render(data: HeroData, context: RenderContext): RenderResult {
    const { variant = 'modern', layout = 'center', title, subtitle, primaryAction, secondaryAction, image } = data;
    const { isExport = false, device = 'desktop' } = context;

    // Classes avec design system
    const heroClass = `hero hero--${variant} hero--${layout} hero--${device}`;
    
    // HTML avec ARIA et optimisations
    const html = `
      <section class="${heroClass}" ${ariaAttributes.navigation.main.role} aria-label="Hero">
        ${this.renderBackground(variant, image)}
        
        <div class="hero__container container">
          <div class="hero__content fade-in-up">
            ${title ? `
              <h1 class="hero__title" ${isExport ? '' : 'contenteditable="true"'}>
                ${this.escapeHtml(title)}
              </h1>
            ` : ''}
            
            ${subtitle ? `
              <p class="hero__subtitle" ${isExport ? '' : 'contenteditable="true"'}>
                ${this.escapeHtml(subtitle)}
              </p>
            ` : ''}
            
            ${(primaryAction || secondaryAction) ? `
              <div class="hero__actions">
                ${primaryAction ? `
                  <a href="${primaryAction.link}" 
                     class="btn btn--primary btn-bounce"
                     ${ariaAttributes.button.base.role}>
                    ${this.escapeHtml(primaryAction.text)}
                  </a>
                ` : ''}
                
                ${secondaryAction ? `
                  <a href="${secondaryAction.link}" 
                     class="btn btn--secondary"
                     ${ariaAttributes.button.base.role}>
                    ${this.escapeHtml(secondaryAction.text)}
                  </a>
                ` : ''}
              </div>
            ` : ''}
          </div>
          
          ${image && layout === 'split' ? `
            <div class="hero__image lazy-load" data-src="${image}">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3C/svg%3E" 
                   alt="" 
                   loading="lazy"
                   class="hero__img lazy-image"
                   data-src="${image}"
                   width="960"
                   height="540">
            </div>
          ` : ''}
        </div>
        
        ${this.renderEffects(variant)}
      </section>
    `;

    // CSS optimisé avec design system
    const css = this.generateCSS(variant, layout, device);
    
    // JS minimal pour animations
    const js = isExport ? '' : this.generateJS();

    return { html, css, js };
  }

  private renderBackground(variant: string, image?: string): string {
    if (variant === 'modern' || variant === 'bold') {
      return `
        <div class="hero__background">
          <div class="hero__gradient"></div>
          ${image ? `
            <div class="hero__bg-image lazy-load" 
                 data-src="${image}"
                 style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 1920 1080\\'%3E%3C/svg%3E');">
            </div>
          ` : ''}
        </div>
      `;
    }
    return '';
  }

  private renderEffects(variant: string): string {
    const effects = [];
    
    if (variant === 'modern') {
      effects.push('<div class="hero__particles"></div>');
    }
    
    if (variant === 'bold') {
      effects.push('<div class="hero__waves"></div>');
    }
    
    if (variant === 'elegant') {
      effects.push('<div class="hero__glow"></div>');
    }
    
    return effects.join('');
  }

  private generateCSS(variant: string, layout: string, device: string): string {
    return `
/* Hero V3 Perfect avec Design System */
${generateDesignSystemCSS()}
${generateAnimationCSS()}
${generateAccessibilityCSS()}
${generatePerformanceCSS()}

.hero {
  position: relative;
  min-height: ${device === 'mobile' ? '100vh' : '90vh'};
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

.hero__container {
  ${baseStyles.container}
  position: relative;
  z-index: 10;
}

/* Layout variations */
.hero--center .hero__content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero--left .hero__content {
  max-width: 600px;
}

.hero--split {
  .hero__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${designTokens.spacing['2xl']};
    align-items: center;
  }
}

/* Contenu */
.hero__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: ${designTokens.spacing.lg};
  color: var(--text);
  
  /* Animation du titre */
  animation: ${animations.fadeInUp.duration}ms ${animations.fadeInUp.easing} both;
  animation-delay: ${blockAnimations.hero.delay.title}ms;
}

.hero__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.6;
  margin-bottom: ${designTokens.spacing.xl};
  color: var(--text-secondary);
  opacity: 0.9;
  
  animation: ${animations.fadeInUp.duration}ms ${animations.fadeInUp.easing} both;
  animation-delay: ${blockAnimations.hero.delay.subtitle}ms;
}

.hero__actions {
  display: flex;
  gap: ${designTokens.spacing.md};
  flex-wrap: wrap;
  ${layout === 'center' ? 'justify-content: center;' : ''}
  
  animation: ${animations.fadeInScale.duration}ms ${animations.fadeInScale.easing} both;
  animation-delay: ${blockAnimations.hero.delay.buttons}ms;
}

/* Boutons avec design system */
.btn {
  ${baseStyles.button.base}
}

.btn--primary {
  ${baseStyles.button.primary}
  font-size: 1.125rem;
  padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
}

.btn--secondary {
  ${baseStyles.button.secondary}
}

/* Variantes visuelles */
.hero--modern {
  background: ${baseStyles.gradients.hero};
  color: white;
  
  .hero__gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.3), transparent 70%);
  }
}

.hero--minimal {
  background: var(--background);
  
  .hero__title {
    background: ${baseStyles.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero--bold {
  background: var(--dark);
  color: white;
  
  .hero__waves {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%2360A5FA' opacity='.3'/%3E%3C/svg%3E");
    background-size: cover;
    animation: wave 10s linear infinite;
  }
}

.hero--elegant {
  ${baseStyles.glass}
  
  .hero__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
    opacity: 0.3;
    filter: blur(100px);
  }
}

/* Images optimisées */
.hero__image {
  position: relative;
  overflow: hidden;
  border-radius: ${designTokens.radius.xl};
  box-shadow: ${designTokens.shadows.xl};
  
  animation: ${animations.slideInRight.duration}ms ${animations.slideInRight.easing} both;
  animation-delay: ${blockAnimations.hero.delay.image}ms;
}

.hero__img {
  width: 100%;
  height: auto;
  display: block;
  ${performanceUtils.gpuAccelerated}
}

/* Responsive */
@media (max-width: ${designTokens.breakpoints.md}) {
  .hero--split .hero__container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero__actions {
    justify-content: center;
  }
  
  .hero__image {
    margin-top: ${designTokens.spacing.xl};
  }
}

/* Animations */
@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

${microInteractions.cardHover}
${microInteractions.buttonBounce}
`;
  }

  private generateJS(): string {
    return `
// Hero V3 Perfect - Animations et interactions
(function() {
  // Lazy loading des images
  const images = document.querySelectorAll('.lazy-image');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Parallax effect
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero__background');
      if (parallax) {
        parallax.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
      }
    });
  }
})();
`;
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
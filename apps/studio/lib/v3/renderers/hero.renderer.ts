/**
 * Hero Renderer V3 - Rendu déterministe et robuste
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { heroDataSchema, heroDefaults, type HeroData } from '../schemas/blocks/hero';

export class HeroRendererV3 implements BlockRenderer<HeroData> {
  type = 'hero-ultra-modern';
  version = '3.0.0';

  validate(data: unknown): z.SafeParseReturnType<HeroData, HeroData> {
    return heroDataSchema.safeParse(data);
  }

  getDefaultData(): HeroData {
    return heroDefaults;
  }

  getDefaultCSS(): string {
    return `
/* Hero Base Styles */
.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 500px;
}

.hero--large { min-height: 100vh; }
.hero--medium { min-height: 70vh; }
.hero--small { min-height: 50vh; }

.hero__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  position: relative;
  z-index: 2;
}

.hero__content {
  max-width: 800px;
}

.hero__eyebrow {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.hero__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.hero__subtitle {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 300;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero__description {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.hero__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Layouts */
.hero--center .hero__content { 
  text-align: center; 
  margin: 0 auto;
}

.hero--center .hero__buttons {
  justify-content: center;
}

.hero--two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Variants */
.hero--glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.hero--gradient-wave {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.hero--gradient-wave::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='white' fill-opacity='0.3'/%3E%3C/svg%3E");
  background-size: cover;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__content > * {
  animation: fadeInUp 0.8s ease-out backwards;
}

.hero__eyebrow { animation-delay: 0.1s; }
.hero__title { animation-delay: 0.2s; }
.hero__subtitle { animation-delay: 0.3s; }
.hero__description { animation-delay: 0.4s; }
.hero__buttons { animation-delay: 0.5s; }

/* Responsive */
@media (max-width: 768px) {
  .hero--two-columns {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero__buttons {
    flex-direction: column;
  }
}`;
  }

  getRequiredAssets() {
    return [];
  }

  renderPreview(data: HeroData): string {
    return `
<div class="hero-preview">
  <h3>${data.title}</h3>
  <p>${data.subtitle || 'Hero Block'}</p>
</div>`;
  }

  render(data: HeroData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    try {
      // Générer le HTML
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      const css = this.generateCSS(data);
      
      // Générer le JS si nécessaire
      const js = this.generateJS(data);
      
      // Calculer les performances
      const renderTime = performance.now() - startTime;
      
      return {
        html,
        css: this.getDefaultCSS() + css,
        js,
        assets: [],
        errors: [],
        warnings: [],
        performance: {
          renderTime,
          cssSize: css.length,
          jsSize: js.length,
        }
      };
    } catch (error) {
      return {
        html: '<div class="hero hero--error">Erreur de rendu</div>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'hero',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          fallbackUsed: true
        }],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: 0,
          jsSize: 0,
        }
      };
    }
  }

  private generateHTML(data: HeroData): string {
    const { 
      variant, 
      layout, 
      height,
      eyebrow, 
      title, 
      subtitle, 
      description,
      primaryButton,
      secondaryButton,
      image,
      stats,
      badges
    } = data;

    const classes = [
      'hero',
      `hero--${variant}`,
      `hero--${layout}`,
      `hero--${height}`
    ].join(' ');

    return `
<section class="${classes}" data-block="hero">
  ${this.renderBackground(data)}
  
  <div class="hero__container">
    ${layout === 'two-columns' && image ? '<div class="hero__grid">' : ''}
    
    <div class="hero__content">
      ${eyebrow ? `<span class="hero__eyebrow">${this.escape(eyebrow)}</span>` : ''}
      
      <h1 class="hero__title">${this.escape(title)}</h1>
      
      ${subtitle ? `<p class="hero__subtitle">${this.escape(subtitle)}</p>` : ''}
      
      ${description ? `<p class="hero__description">${this.escape(description)}</p>` : ''}
      
      ${badges?.length ? this.renderBadges(badges) : ''}
      
      ${(primaryButton || secondaryButton) ? `
        <div class="hero__buttons">
          ${primaryButton ? this.renderButton(primaryButton, 'primary') : ''}
          ${secondaryButton ? this.renderButton(secondaryButton, 'secondary') : ''}
        </div>
      ` : ''}
      
      ${stats?.length ? this.renderStats(stats) : ''}
    </div>
    
    ${layout === 'two-columns' && image ? `
      <div class="hero__media">
        ${this.renderImage(image)}
      </div>
      </div>
    ` : ''}
  </div>
  
  ${this.renderEffects(data)}
</section>`;
  }

  private generateCSS(data: HeroData): string {
    const { background } = data;
    let css = '';

    // CSS pour le background personnalisé
    if (background) {
      css += this.generateBackgroundCSS(background);
    }

    // CSS pour les animations spécifiques
    if (data.titleAnimation !== 'none') {
      css += this.generateAnimationCSS(data.titleAnimation);
    }

    return css;
  }

  private generateJS(data: HeroData): string {
    let js = '';

    // JS pour les animations
    if (data.titleAnimation === 'typewriter') {
      js += this.generateTypewriterJS();
    }

    // JS pour parallax
    if (data.features?.parallax) {
      js += this.generateParallaxJS();
    }

    return js;
  }

  private renderBackground(data: HeroData): string {
    if (!data.background) return '';

    switch (data.background.type) {
      case 'image':
        return `<div class="hero__background hero__background--image" style="background-image: url('${data.background.image.src}')"></div>`;
      
      case 'video':
        return `
<div class="hero__background hero__background--video">
  <video autoplay muted loop playsinline>
    <source src="${data.background.videoUrl}" type="video/mp4">
  </video>
</div>`;
      
      default:
        return '';
    }
  }

  private renderButton(button: any, type: string): string {
    const classes = [
      'btn',
      `btn--${button.variant || type}`,
      `btn--${button.size || 'md'}`,
      button.fullWidth ? 'btn--full' : ''
    ].filter(Boolean).join(' ');

    return `
<a href="${button.link || '#'}" class="${classes}">
  ${button.icon && button.iconPosition === 'left' ? `<span class="btn__icon">${button.icon}</span>` : ''}
  <span class="btn__text">${this.escape(button.text)}</span>
  ${button.icon && button.iconPosition === 'right' ? `<span class="btn__icon">${button.icon}</span>` : ''}
</a>`;
  }

  private renderBadges(badges: any[]): string {
    return `
<div class="hero__badges">
  ${badges.map(badge => `
    <span class="badge badge--${badge.color}">
      ${badge.icon ? `<span class="badge__icon">${badge.icon}</span>` : ''}
      ${this.escape(badge.text)}
    </span>
  `).join('')}
</div>`;
  }

  private renderStats(stats: any[]): string {
    return `
<div class="hero__stats">
  ${stats.map(stat => `
    <div class="stat">
      ${stat.icon ? `<span class="stat__icon">${stat.icon}</span>` : ''}
      <span class="stat__value">${this.escape(stat.value)}</span>
      <span class="stat__label">${this.escape(stat.label)}</span>
    </div>
  `).join('')}
</div>`;
  }

  private renderImage(image: any): string {
    return `<img 
      src="${image.src}" 
      alt="${this.escape(image.alt || '')}" 
      loading="${image.loading || 'lazy'}"
      class="hero__image"
    />`;
  }

  private renderEffects(data: HeroData): string {
    let effects = '';

    if (data.features?.particles) {
      effects += '<div class="hero__particles" id="particles"></div>';
    }

    if (data.features?.waves) {
      effects += '<div class="hero__waves"></div>';
    }

    return effects;
  }

  private generateBackgroundCSS(background: any): string {
    // Implémenter selon le type de background
    return '';
  }

  private generateAnimationCSS(animation: string): string {
    // Implémenter les animations CSS
    return '';
  }

  private generateTypewriterJS(): string {
    return `
// Typewriter effect
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
  // Typewriter implementation
}`;
  }

  private generateParallaxJS(): string {
    return `
// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero__background');
  if (parallax) {
    parallax.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
  }
});`;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
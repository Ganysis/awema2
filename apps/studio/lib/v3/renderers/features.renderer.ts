/**
 * Features Renderer V3 - Rendu robuste avec logs détaillés
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { featuresDataSchema, featuresDefaults, type FeaturesData } from '../schemas/blocks/features';
import { logger } from '../core/logger';

export class FeaturesRendererV3 implements BlockRenderer<FeaturesData> {
  type = 'features-ultra-modern';
  version = '3.0.0';

  constructor() {
    logger.info('FeaturesRendererV3', 'constructor', '🚀 Initialisation du renderer Features V3');
  }

  validate(data: unknown): z.SafeParseReturnType<FeaturesData, FeaturesData> {
    logger.debug('FeaturesRendererV3', 'validate', 'Validation des données', { 
      hasData: !!data,
      dataType: typeof data 
    });
    
    const result = featuresDataSchema.safeParse(data);
    
    if (!result.success) {
      logger.warn('FeaturesRendererV3', 'validate', 'Validation échouée', {
        errors: result.error.errors
      });
    } else {
      logger.info('FeaturesRendererV3', 'validate', '✅ Validation réussie', {
        featuresCount: result.data.features.length,
        variant: result.data.variant
      });
    }
    
    return result;
  }

  getDefaultData(): FeaturesData {
    logger.debug('FeaturesRendererV3', 'getDefaultData', 'Retour des données par défaut');
    return featuresDefaults;
  }

  getDefaultCSS(): string {
    logger.debug('FeaturesRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
    return `
/* Features Base Styles */
.features {
  position: relative;
  padding: var(--features-padding, 4rem) 0;
  overflow: hidden;
}

.features__container {
  max-width: var(--features-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.features--container-full .features__container { max-width: 100%; }
.features--container-wide .features__container { max-width: 1400px; }
.features--container-normal .features__container { max-width: 1200px; }
.features--container-narrow .features__container { max-width: 1000px; }

/* Header */
.features__header {
  text-align: center;
  margin-bottom: 3rem;
}

.features__header--left { text-align: left; }
.features__header--right { text-align: right; }

.features__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.features__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.features__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 800px;
  margin: 0 auto;
}

/* Grid Layout */
.features__grid {
  display: grid;
  gap: var(--features-gap, 2rem);
}

.features__grid--1 { grid-template-columns: 1fr; }
.features__grid--2 { grid-template-columns: repeat(2, 1fr); }
.features__grid--3 { grid-template-columns: repeat(3, 1fr); }
.features__grid--4 { grid-template-columns: repeat(4, 1fr); }
.features__grid--5 { grid-template-columns: repeat(5, 1fr); }
.features__grid--6 { grid-template-columns: repeat(6, 1fr); }

/* Feature Item */
.feature {
  position: relative;
  padding: 2rem;
  background: var(--bg-elevated, white);
  border-radius: var(--features-radius, 1rem);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Card Styles */
.feature--flat { background: transparent; box-shadow: none; }
.feature--elevated { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.feature--outlined { border: 1px solid var(--border, #e5e7eb); box-shadow: none; }
.feature--glassmorphism { 
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.feature--gradient {
  background: linear-gradient(135deg, var(--gradient-from, #f3f4f6), var(--gradient-to, #ffffff));
}

/* Hover Effects */
.feature--hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.feature--hover-scale:hover { transform: scale(1.05); }
.feature--hover-glow:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
.feature--hover-rotate:hover { transform: rotate(2deg); }

/* Icon */
.feature__icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.feature__icon--filled {
  background: var(--primary-100, #dbeafe);
  color: var(--primary, #3b82f6);
  border-radius: 1rem;
}

.feature__icon--outline {
  border: 2px solid var(--primary, #3b82f6);
  color: var(--primary, #3b82f6);
  border-radius: 1rem;
}

.feature__icon--gradient {
  background: linear-gradient(135deg, var(--primary, #3b82f6), var(--secondary, #10b981));
  color: white;
  border-radius: 1rem;
}

.feature__icon--shadow {
  background: white;
  color: var(--primary, #3b82f6);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Icon positions */
.feature--icon-left { flex-direction: row; align-items: start; }
.feature--icon-left .feature__icon { margin-right: 1.5rem; margin-bottom: 0; }

.feature--icon-right { flex-direction: row; align-items: start; }
.feature--icon-right .feature__icon { order: 2; margin-left: 1.5rem; margin-bottom: 0; }

/* Content */
.feature__content {
  flex: 1;
}

.feature__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text, #1f2937);
}

.feature__description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 1rem;
}

.feature__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary, #3b82f6);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.feature__link:hover {
  gap: 0.75rem;
}

.feature__link-arrow {
  transition: transform 0.3s;
}

.feature__link:hover .feature__link-arrow {
  transform: translateX(4px);
}

/* Badge */
.feature__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  background: var(--primary, #3b82f6);
  color: white;
}

/* Highlight */
.feature--highlight {
  border: 2px solid var(--primary, #3b82f6);
  transform: scale(1.02);
}

/* Timeline Variant */
.features--timeline-vertical .features__grid {
  position: relative;
  display: block;
}

.features--timeline-vertical .features__grid::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border, #e5e7eb);
  transform: translateX(-50%);
}

.features--timeline-vertical .feature {
  position: relative;
  width: calc(50% - 2rem);
  margin-bottom: 3rem;
}

.features--timeline-vertical .feature:nth-child(odd) {
  margin-left: 0;
}

.features--timeline-vertical .feature:nth-child(even) {
  margin-left: calc(50% + 2rem);
}

.features--timeline-vertical .feature::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary, #3b82f6);
  border: 4px solid white;
  border-radius: 50%;
  top: 2rem;
}

.features--timeline-vertical .feature:nth-child(odd)::before {
  right: -3.5rem;
}

.features--timeline-vertical .feature:nth-child(even)::before {
  left: -3.5rem;
}

/* Carousel Variant */
.features--carousel-3d .features__grid {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.features--carousel-3d .features__grid::-webkit-scrollbar {
  display: none;
}

.features--carousel-3d .feature {
  flex: 0 0 300px;
  scroll-snap-align: center;
  margin-right: 2rem;
}

/* Tabs Variant */
.features--tabs-animated .features__tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid var(--border, #e5e7eb);
}

.features__tab {
  padding: 1rem 2rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.features__tab:hover {
  color: var(--text, #1f2937);
}

.features__tab--active {
  color: var(--primary, #3b82f6);
}

.features__tab--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary, #3b82f6);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature--animate {
  animation: fadeInUp 0.6s ease-out backwards;
}

/* Responsive */
@media (max-width: 1024px) {
  .features__grid--4,
  .features__grid--5,
  .features__grid--6 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .features__grid--2,
  .features__grid--3,
  .features__grid--4,
  .features__grid--5,
  .features__grid--6 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .features--timeline-vertical .feature {
    width: 100%;
    margin-left: 0 !important;
  }
  
  .features--timeline-vertical .features__grid::before {
    left: 2rem;
  }
  
  .features--timeline-vertical .feature::before {
    left: -3rem !important;
    right: auto !important;
  }
}

@media (max-width: 480px) {
  .features__grid {
    grid-template-columns: 1fr !important;
  }
  
  .feature--icon-left,
  .feature--icon-right {
    flex-direction: column;
  }
  
  .feature--icon-left .feature__icon,
  .feature--icon-right .feature__icon {
    margin: 0 0 1.5rem 0;
  }
}

/* Gap variants */
.features--gap-sm .features__grid { gap: 1rem; }
.features--gap-md .features__grid { gap: 1.5rem; }
.features--gap-lg .features__grid { gap: 2rem; }
.features--gap-xl .features__grid { gap: 3rem; }

/* Padding variants */
.features--padding-none { padding: 0; }
.features--padding-sm { padding: 2rem 0; }
.features--padding-md { padding: 3rem 0; }
.features--padding-lg { padding: 4rem 0; }
.features--padding-xl { padding: 6rem 0; }`;
  }

  getRequiredAssets() {
    logger.debug('FeaturesRendererV3', 'getRequiredAssets', 'Aucun asset requis');
    return [];
  }

  renderPreview(data: FeaturesData): string {
    logger.debug('FeaturesRendererV3', 'renderPreview', 'Génération preview', {
      variant: data.variant,
      featuresCount: data.features.length
    });
    
    return `
<div class="features-preview">
  <h3>${data.title}</h3>
  <p>${data.features.length} features - ${data.variant}</p>
</div>`;
  }

  render(data: FeaturesData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('FeaturesRendererV3', 'render', '🎨 Début du rendu Features', {
      variant: data.variant,
      featuresCount: data.features.length,
      hasContext: !!context
    });
    
    try {
      // Générer le HTML
      logger.debug('FeaturesRendererV3', 'render', 'Génération HTML');
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      logger.debug('FeaturesRendererV3', 'render', 'Génération CSS');
      const css = this.generateCSS(data);
      
      // Générer le JS si nécessaire
      logger.debug('FeaturesRendererV3', 'render', 'Génération JS');
      const js = this.generateJS(data);
      
      // Calculer les performances
      const renderTime = performance.now() - startTime;
      
      logger.info('FeaturesRendererV3', 'render', '✅ Rendu Features terminé', {
        renderTime: renderTime.toFixed(2),
        htmlLength: html.length,
        cssLength: css.length,
        jsLength: js.length
      });
      
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
      logger.error('FeaturesRendererV3', 'render', '❌ Erreur lors du rendu', error as Error);
      
      return {
        html: '<div class="features features--error">Erreur de rendu</div>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'features',
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

  private generateHTML(data: FeaturesData): string {
    logger.debug('FeaturesRendererV3', 'generateHTML', 'Génération structure HTML', {
      variant: data.variant,
      layout: data.layout
    });
    
    const classes = [
      'features',
      `features--${data.variant}`,
      `features--container-${data.layout.containerWidth}`,
      `features--gap-${data.layout.gap}`,
      `features--padding-${data.styles.padding || 'lg'}`
    ].join(' ');

    // Filtrer les features par catégorie si nécessaire
    let features = data.features;
    if (data.filtering.enabled && data.filtering.defaultCategory && data.filtering.defaultCategory !== 'all') {
      features = data.features.filter(f => f.category === data.filtering.defaultCategory);
    }

    return `
<section class="${classes}" id="features" data-block="features">
  <div class="features__container">
    ${this.renderHeader(data)}
    ${data.filtering.enabled ? this.renderFilters(data) : ''}
    ${this.renderFeatures(features, data)}
    ${data.cta.enabled ? this.renderCTA(data.cta) : ''}
  </div>
</section>`;
  }

  private renderHeader(data: FeaturesData): string {
    if (!data.title && !data.subtitle && !data.description) return '';
    
    logger.debug('FeaturesRendererV3', 'renderHeader', 'Génération header');
    
    return `
<div class="features__header features__header--${data.layout.alignment}">
  ${data.title ? `<h2 class="features__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="features__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="features__description">${this.escape(data.description)}</p>` : ''}
</div>`;
  }

  private renderFilters(data: FeaturesData): string {
    logger.debug('FeaturesRendererV3', 'renderFilters', 'Génération filtres', {
      style: data.filtering.style,
      categoriesCount: data.filtering.categories.length
    });
    
    return `
<div class="features__filters features__filters--${data.filtering.style}">
  ${data.filtering.showAll ? `
    <button class="features__filter features__filter--active" data-category="all">
      ${this.escape(data.filtering.allLabel)}
      ${data.filtering.showCount ? `<span class="features__filter-count">${data.features.length}</span>` : ''}
    </button>
  ` : ''}
  
  ${data.filtering.categories.map(cat => `
    <button class="features__filter" data-category="${cat.id}">
      ${this.escape(cat.label)}
      ${data.filtering.showCount && cat.count ? `<span class="features__filter-count">${cat.count}</span>` : ''}
    </button>
  `).join('')}
</div>`;
  }

  private renderFeatures(features: any[], data: FeaturesData): string {
    logger.debug('FeaturesRendererV3', 'renderFeatures', 'Génération features', {
      count: features.length,
      variant: data.variant
    });
    
    // Rendu spécifique selon la variante
    switch (data.variant) {
      case 'timeline-vertical':
        return this.renderTimelineFeatures(features, data);
      case 'carousel-3d':
        return this.renderCarouselFeatures(features, data);
      case 'tabs-animated':
        return this.renderTabsFeatures(features, data);
      default:
        return this.renderGridFeatures(features, data);
    }
  }

  private renderGridFeatures(features: any[], data: FeaturesData): string {
    const gridClasses = `features__grid features__grid--${data.layout.columns}`;
    
    return `
<div class="${gridClasses}">
  ${features.map((feature, index) => this.renderFeature(feature, data, index)).join('')}
</div>`;
  }

  private renderTimelineFeatures(features: any[], data: FeaturesData): string {
    return `
<div class="features__grid features__timeline">
  ${features.map((feature, index) => this.renderFeature(feature, data, index)).join('')}
</div>`;
  }

  private renderCarouselFeatures(features: any[], data: FeaturesData): string {
    return `
<div class="features__carousel-wrapper">
  <div class="features__grid features__carousel" id="features-carousel">
    ${features.map((feature, index) => this.renderFeature(feature, data, index)).join('')}
  </div>
  ${data.carousel.showArrows ? `
    <button class="features__carousel-prev" aria-label="Précédent">‹</button>
    <button class="features__carousel-next" aria-label="Suivant">›</button>
  ` : ''}
  ${data.carousel.showDots ? `
    <div class="features__carousel-dots">
      ${features.map((_, index) => `
        <button class="features__carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
      `).join('')}
    </div>
  ` : ''}
</div>`;
  }

  private renderTabsFeatures(features: any[], data: FeaturesData): string {
    // Grouper par catégorie
    const categories = [...new Set(features.map(f => f.category || 'general'))];
    
    return `
<div class="features__tabs-wrapper">
  <div class="features__tabs">
    ${categories.map((cat, index) => `
      <button class="features__tab ${index === 0 ? 'features__tab--active' : ''}" data-tab="${cat}">
        ${this.escape(cat)}
      </button>
    `).join('')}
  </div>
  
  <div class="features__tabs-content">
    ${categories.map((cat, index) => `
      <div class="features__tab-panel ${index === 0 ? 'active' : ''}" data-panel="${cat}">
        <div class="features__grid features__grid--${data.layout.columns}">
          ${features.filter(f => (f.category || 'general') === cat)
            .map((feature, idx) => this.renderFeature(feature, data, idx))
            .join('')}
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
  }

  private renderFeature(feature: any, data: FeaturesData, index: number): string {
    const delay = data.display.stagger ? index * data.display.animationDelay : 0;
    
    const classes = [
      'feature',
      `feature--${data.display.cardStyle}`,
      `feature--hover-${data.display.cardHover}`,
      `feature--icon-${data.display.iconPosition}`,
      feature.highlight ? 'feature--highlight' : '',
      data.display.animation !== 'none' ? 'feature--animate' : ''
    ].filter(Boolean).join(' ');
    
    const styles = data.display.animation !== 'none' 
      ? `animation-delay: ${delay}ms;` 
      : '';
    
    return `
<article class="${classes}" style="${styles}" data-category="${feature.category || 'general'}">
  ${feature.badge ? `
    <span class="feature__badge feature__badge--${feature.badge.color}">
      ${this.escape(feature.badge.text)}
    </span>
  ` : ''}
  
  ${this.renderFeatureIcon(feature, data)}
  
  <div class="feature__content">
    <h3 class="feature__title">${this.escape(feature.title)}</h3>
    <p class="feature__description">${this.escape(feature.description)}</p>
    
    ${data.display.showStats && feature.stats ? `
      <div class="feature__stats">
        <span class="feature__stats-value">${this.escape(feature.stats.value)}</span>
        <span class="feature__stats-label">${this.escape(feature.stats.label)}</span>
        ${feature.stats.trend ? `<span class="feature__stats-trend feature__stats-trend--${feature.stats.trend}"></span>` : ''}
      </div>
    ` : ''}
    
    ${data.display.showLink && feature.link ? this.renderFeatureLink(feature.link) : ''}
  </div>
</article>`;
  }

  private renderFeatureIcon(feature: any, data: FeaturesData): string {
    if (!data.display.showIcon || !feature.icon) return '';
    
    const iconClasses = `feature__icon feature__icon--${data.display.iconStyle} feature__icon--${data.display.iconSize}`;
    
    // Si c'est un objet icon
    if (typeof feature.icon === 'object') {
      if (feature.icon.type === 'image' && feature.image) {
        return `
<div class="${iconClasses}">
  <img src="${feature.image.src}" alt="${this.escape(feature.image.alt || '')}" />
</div>`;
      }
      return `<div class="${iconClasses}">${feature.icon.value}</div>`;
    }
    
    // Sinon c'est une string (emoji ou SVG)
    return `<div class="${iconClasses}">${feature.icon}</div>`;
  }

  private renderFeatureLink(link: any): string {
    if (link.style === 'button') {
      return `
<a href="${link.url}" class="btn btn--primary btn--sm" ${link.target !== '_self' ? `target="${link.target}"` : ''}>
  ${this.escape(link.text)}
</a>`;
    }
    
    return `
<a href="${link.url}" class="feature__link" ${link.target !== '_self' ? `target="${link.target}"` : ''}>
  ${this.escape(link.text)}
  <span class="feature__link-arrow">→</span>
</a>`;
  }

  private renderCTA(cta: any): string {
    return `
<div class="features__cta">
  <a href="${cta.link}" class="btn btn--${cta.variant} btn--lg">
    ${this.escape(cta.text)}
  </a>
</div>`;
  }

  private generateCSS(data: FeaturesData): string {
    logger.debug('FeaturesRendererV3', 'generateCSS', 'Génération CSS spécifique');
    
    let css = '';
    
    // CSS des couleurs personnalisées
    if (data.styles.backgroundColor || data.styles.textColor || data.styles.accentColor) {
      css += `
.features {
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
  ${data.styles.textColor ? `color: ${data.styles.textColor};` : ''}
  ${data.styles.accentColor ? `--primary: ${data.styles.accentColor};` : ''}
}`;
    }
    
    // CSS pour border radius
    if (data.styles.borderRadius) {
      const radiusMap = {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px'
      };
      css += `
.features .feature {
  border-radius: ${radiusMap[data.styles.borderRadius]};
}`;
    }
    
    return css;
  }

  private generateJS(data: FeaturesData): string {
    logger.debug('FeaturesRendererV3', 'generateJS', 'Génération JS', {
      hasFiltering: data.filtering.enabled,
      hasCarousel: data.variant === 'carousel-3d',
      hasTabs: data.variant === 'tabs-animated'
    });
    
    let js = '';
    
    // JS pour les filtres
    if (data.filtering.enabled) {
      js += this.generateFilterJS();
    }
    
    // JS pour le carousel
    if (data.variant === 'carousel-3d' || data.carousel.enabled) {
      js += this.generateCarouselJS(data);
    }
    
    // JS pour les tabs
    if (data.variant === 'tabs-animated') {
      js += this.generateTabsJS();
    }
    
    return js;
  }

  private generateFilterJS(): string {
    return `
// Features Filtering
(function() {
  const filters = document.querySelectorAll('.features__filter');
  const features = document.querySelectorAll('.feature');
  
  if (!filters.length || !features.length) return;
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('features__filter--active'));
      filter.classList.add('features__filter--active');
      
      // Filter features
      features.forEach(feature => {
        const featureCategory = feature.dataset.category || 'general';
        
        if (category === 'all' || featureCategory === category) {
          feature.style.display = '';
          feature.classList.add('feature--animate');
        } else {
          feature.style.display = 'none';
        }
      });
    });
  });
})();`;
  }

  private generateCarouselJS(data: FeaturesData): string {
    return `
// Features Carousel
(function() {
  const carousel = document.getElementById('features-carousel');
  if (!carousel) return;
  
  let currentSlide = 0;
  const slides = carousel.children;
  const totalSlides = slides.length;
  const dots = document.querySelectorAll('.features__carousel-dot');
  
  function goToSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * (slides[0].offsetWidth + 32); // 32px gap
    carousel.style.transform = 'translateX(' + offset + 'px)';
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  // Navigation
  const prevBtn = document.querySelector('.features__carousel-prev');
  const nextBtn = document.querySelector('.features__carousel-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(currentSlide);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    });
  }
  
  // Dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  ${data.carousel.autoplay ? `
  // Autoplay
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, ${data.carousel.autoplayDelay});
  ` : ''}
})();`;
  }

  private generateTabsJS(): string {
    return `
// Features Tabs
(function() {
  const tabs = document.querySelectorAll('.features__tab');
  const panels = document.querySelectorAll('.features__tab-panel');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('features__tab--active'));
      tab.classList.add('features__tab--active');
      
      // Update active panel
      panels.forEach(p => p.classList.remove('active'));
      panels[index].classList.add('active');
      
      // Animate features
      const features = panels[index].querySelectorAll('.feature');
      features.forEach((feature, i) => {
        feature.style.animationDelay = (i * 100) + 'ms';
        feature.classList.add('feature--animate');
      });
    });
  });
})();`;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
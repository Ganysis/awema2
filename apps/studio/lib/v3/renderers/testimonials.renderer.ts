/**
 * Testimonials Renderer V3 - Rendu robuste avec logs détaillés
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { testimonialsDataSchema, testimonialsDefaults, type TestimonialsData } from '../schemas/blocks/testimonials';
import { logger } from '../core/logger';

export class TestimonialsRendererV3 implements BlockRenderer<TestimonialsData> {
  type = 'testimonials-ultra-modern';
  version = '3.0.0';

  constructor() {
    logger.info('TestimonialsRendererV3', 'constructor', '🚀 Initialisation du renderer Testimonials V3');
  }

  validate(data: unknown): z.SafeParseReturnType<TestimonialsData, TestimonialsData> {
    logger.debug('TestimonialsRendererV3', 'validate', 'Validation des données', { 
      hasData: !!data,
      dataType: typeof data 
    });
    
    const result = testimonialsDataSchema.safeParse(data);
    
    if (!result.success) {
      logger.warn('TestimonialsRendererV3', 'validate', 'Validation échouée', {
        errors: result.error.errors
      });
    } else {
      logger.info('TestimonialsRendererV3', 'validate', '✅ Validation réussie', {
        testimonialsCount: result.data.testimonials.length,
        variant: result.data.variant,
        hasStats: result.data.stats.enabled
      });
    }
    
    return result;
  }

  getDefaultData(): TestimonialsData {
    logger.debug('TestimonialsRendererV3', 'getDefaultData', 'Retour des données par défaut');
    return testimonialsDefaults;
  }

  getDefaultCSS(): string {
    logger.debug('TestimonialsRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
    return `
/* Testimonials Base Styles */
.testimonials {
  position: relative;
  padding: var(--testimonials-padding, 4rem) 0;
  overflow: hidden;
}

.testimonials__container {
  max-width: var(--testimonials-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.testimonials--container-full .testimonials__container { max-width: 100%; }
.testimonials--container-wide .testimonials__container { max-width: 1400px; }
.testimonials--container-normal .testimonials__container { max-width: 1200px; }
.testimonials--container-narrow .testimonials__container { max-width: 1000px; }

/* Header */
.testimonials__header {
  text-align: center;
  margin-bottom: 3rem;
}

.testimonials__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.testimonials__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.testimonials__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 800px;
  margin: 0 auto;
}

/* Stats */
.testimonials__stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.testimonials__stat {
  text-align: center;
}

.testimonials__stat-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.testimonials__stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text, #1f2937);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.testimonials__stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

/* Grid Layout */
.testimonials__grid {
  display: grid;
  gap: var(--testimonials-gap, 2rem);
}

.testimonials__grid--1 { grid-template-columns: 1fr; }
.testimonials__grid--2 { grid-template-columns: repeat(2, 1fr); }
.testimonials__grid--3 { grid-template-columns: repeat(3, 1fr); }
.testimonials__grid--4 { grid-template-columns: repeat(4, 1fr); }

/* Testimonial Card */
.testimonial {
  position: relative;
  padding: 2rem;
  background: var(--bg-elevated, white);
  border-radius: var(--testimonials-radius, 1rem);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Card Styles */
.testimonial--flat { background: transparent; box-shadow: none; }
.testimonial--elevated { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.testimonial--outlined { border: 1px solid var(--border, #e5e7eb); box-shadow: none; }
.testimonial--gradient {
  background: linear-gradient(135deg, var(--gradient-from, #f3f4f6), var(--gradient-to, #ffffff));
}
.testimonial--glassmorphism { 
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Hover Effects */
.testimonial--hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.testimonial--hover-scale:hover { transform: scale(1.05); }
.testimonial--hover-glow:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }

/* Featured */
.testimonial--featured {
  border: 2px solid var(--primary, #3b82f6);
}

.testimonial--featured.testimonial--elevated {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

/* Quote Icon */
.testimonial__quote-icon {
  position: absolute;
  font-size: 4rem;
  color: var(--primary, #3b82f6);
  opacity: 0.1;
  line-height: 1;
}

.testimonial__quote-icon--top-left { top: 1rem; left: 1rem; }
.testimonial__quote-icon--top-right { top: 1rem; right: 1rem; }
.testimonial__quote-icon--center { 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  font-size: 8rem;
}

/* Content */
.testimonial__content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text, #1f2937);
  margin-bottom: 1.5rem;
  flex: 1;
  position: relative;
  z-index: 1;
}

.testimonial__content--italic {
  font-style: italic;
}

/* Rating */
.testimonial__rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.testimonial__star {
  color: #fbbf24;
  font-size: 1.25rem;
}

.testimonial__star--empty {
  color: #e5e7eb;
}

.testimonial__rating-numeric {
  margin-left: 0.5rem;
  font-weight: 600;
  color: var(--text, #1f2937);
}

/* Author */
.testimonial__author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}

.testimonial__author-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial__author-info {
  flex: 1;
}

.testimonial__author-name {
  font-weight: 600;
  color: var(--text, #1f2937);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.testimonial__verified {
  color: var(--primary, #3b82f6);
  font-size: 1rem;
}

.testimonial__author-role {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

/* Date */
.testimonial__date {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  margin-top: 0.5rem;
}

/* Source */
.testimonial__source {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.25rem 0.75rem;
  background: var(--bg-secondary, #f9fafb);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--text-secondary, #6b7280);
}

.testimonial__source--badge {
  background: var(--primary-100, #dbeafe);
  color: var(--primary, #3b82f6);
}

.testimonial__source-icon {
  font-size: 1rem;
}

/* Media */
.testimonial__media {
  margin: 1rem 0;
}

.testimonial__media img {
  width: 100%;
  border-radius: 0.5rem;
}

.testimonial__video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 0.5rem;
}

.testimonial__video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Masonry */
.testimonials--masonry-pinterest .testimonials__grid {
  column-count: 3;
  column-gap: 2rem;
}

.testimonials--masonry-pinterest .testimonial {
  break-inside: avoid;
  margin-bottom: 2rem;
}

/* List */
.testimonials--list-detailed .testimonials__grid {
  display: flex;
  flex-direction: column;
}

.testimonials--list-detailed .testimonial {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
}

/* Carousel */
.testimonials__carousel {
  overflow: hidden;
  position: relative;
}

.testimonials__carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonials__carousel-slide {
  flex: 0 0 auto;
  width: calc(100% / var(--slides-per-view, 3));
  padding: 0 calc(var(--spacing, 24px) / 2);
}

.testimonials__carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
}

.testimonials__carousel-arrow--prev { left: 1rem; }
.testimonials__carousel-arrow--next { right: 1rem; }

.testimonials__carousel-arrow:hover {
  transform: translateY(-50%) scale(1.1);
}

.testimonials__carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.testimonials__carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border, #e5e7eb);
  cursor: pointer;
  transition: all 0.3s;
}

.testimonials__carousel-dot--active {
  width: 24px;
  border-radius: 4px;
  background: var(--primary, #3b82f6);
}

/* CTA Section */
.testimonials__cta {
  text-align: center;
  margin-top: 3rem;
  padding: 3rem;
  background: var(--bg-secondary, #f9fafb);
  border-radius: 1rem;
}

.testimonials__cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text, #1f2937);
}

.testimonials__cta-description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 2rem;
}

.testimonials__cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn--primary {
  background: var(--primary, #3b82f6);
  color: white;
}

.btn--primary:hover {
  background: var(--primary-600, #2563eb);
}

.btn--outline {
  background: transparent;
  color: var(--primary, #3b82f6);
  border-color: var(--primary, #3b82f6);
}

.btn--outline:hover {
  background: var(--primary, #3b82f6);
  color: white;
}

/* Responsive */
@media (max-width: 1024px) {
  .testimonials__grid--4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .testimonials--masonry-pinterest .testimonials__grid {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr !important;
  }
  
  .testimonials--masonry-pinterest .testimonials__grid {
    column-count: 1;
  }
  
  .testimonials__stats {
    gap: 2rem;
  }
  
  .testimonials__carousel-slide {
    width: 100%;
  }
}

/* Gap variants */
.testimonials--gap-sm .testimonials__grid { gap: 1rem; }
.testimonials--gap-md .testimonials__grid { gap: 1.5rem; }
.testimonials--gap-lg .testimonials__grid { gap: 2rem; }
.testimonials--gap-xl .testimonials__grid { gap: 3rem; }

/* Padding variants */
.testimonials--padding-none { padding: 0; }
.testimonials--padding-sm { padding: 2rem 0; }
.testimonials--padding-md { padding: 3rem 0; }
.testimonials--padding-lg { padding: 4rem 0; }
.testimonials--padding-xl { padding: 6rem 0; }`;
  }

  getRequiredAssets() {
    logger.debug('TestimonialsRendererV3', 'getRequiredAssets', 'Aucun asset requis');
    return [];
  }

  renderPreview(data: TestimonialsData): string {
    logger.debug('TestimonialsRendererV3', 'renderPreview', 'Génération preview', {
      variant: data.variant,
      testimonialsCount: data.testimonials.length
    });
    
    return `
<div class="testimonials-preview">
  <h3>${data.title}</h3>
  <p>${data.testimonials.length} témoignages - ${data.variant}</p>
</div>`;
  }

  render(data: TestimonialsData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('TestimonialsRendererV3', 'render', '🎨 Début du rendu Testimonials', {
      variant: data.variant,
      testimonialsCount: data.testimonials.length,
      hasStats: data.stats.enabled,
      hasContext: !!context
    });
    
    try {
      // Générer le HTML
      logger.debug('TestimonialsRendererV3', 'render', 'Génération HTML');
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      logger.debug('TestimonialsRendererV3', 'render', 'Génération CSS');
      const css = this.generateCSS(data);
      
      // Générer le JS si nécessaire
      logger.debug('TestimonialsRendererV3', 'render', 'Génération JS');
      const js = this.generateJS(data);
      
      // Calculer les performances
      const renderTime = performance.now() - startTime;
      
      logger.info('TestimonialsRendererV3', 'render', '✅ Rendu Testimonials terminé', {
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
      logger.error('TestimonialsRendererV3', 'render', '❌ Erreur lors du rendu', error as Error);
      
      return {
        html: '<div class="testimonials testimonials--error">Erreur de rendu</div>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'testimonials',
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

  private generateHTML(data: TestimonialsData): string {
    logger.debug('TestimonialsRendererV3', 'generateHTML', 'Génération structure HTML', {
      variant: data.variant,
      layout: data.layout
    });
    
    const classes = [
      'testimonials',
      `testimonials--${data.variant}`,
      `testimonials--container-${data.layout.containerWidth}`,
      `testimonials--gap-${data.layout.gap}`,
      `testimonials--padding-${data.styles.padding || 'lg'}`
    ].join(' ');

    return `
<section class="${classes}" id="testimonials" data-block="testimonials">
  <div class="testimonials__container">
    ${this.renderHeader(data)}
    ${data.stats.enabled && data.stats.position === 'top' ? this.renderStats(data.stats) : ''}
    ${data.filtering.enabled ? this.renderFilters(data) : ''}
    ${this.renderTestimonials(data)}
    ${data.stats.enabled && data.stats.position === 'bottom' ? this.renderStats(data.stats) : ''}
    ${data.cta.enabled ? this.renderCTA(data.cta) : ''}
  </div>
</section>`;
  }

  private renderHeader(data: TestimonialsData): string {
    if (!data.title && !data.subtitle && !data.description) return '';
    
    logger.debug('TestimonialsRendererV3', 'renderHeader', 'Génération header');
    
    return `
<div class="testimonials__header">
  ${data.title ? `<h2 class="testimonials__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="testimonials__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="testimonials__description">${this.escape(data.description)}</p>` : ''}
</div>`;
  }

  private renderStats(stats: any): string {
    logger.debug('TestimonialsRendererV3', 'renderStats', 'Génération stats', {
      count: stats.items.length
    });
    
    return `
<div class="testimonials__stats">
  ${stats.items.map((stat: any) => `
    <div class="testimonials__stat">
      ${stat.icon ? `<div class="testimonials__stat-icon">${stat.icon}</div>` : ''}
      <div class="testimonials__stat-value">${this.escape(stat.value)}</div>
      <div class="testimonials__stat-label">${this.escape(stat.label)}</div>
    </div>
  `).join('')}
</div>`;
  }

  private renderFilters(data: TestimonialsData): string {
    logger.debug('TestimonialsRendererV3', 'renderFilters', 'Génération filtres');
    
    // TODO: Implémenter les filtres
    return '';
  }

  private renderTestimonials(data: TestimonialsData): string {
    logger.debug('TestimonialsRendererV3', 'renderTestimonials', 'Génération témoignages', {
      count: data.testimonials.length,
      variant: data.variant
    });
    
    switch (data.variant) {
      case 'carousel-modern':
      case 'slider-fullwidth':
        return this.renderCarouselTestimonials(data);
      case 'masonry-pinterest':
        return this.renderMasonryTestimonials(data);
      case 'list-detailed':
        return this.renderListTestimonials(data);
      default:
        return this.renderGridTestimonials(data);
    }
  }

  private renderGridTestimonials(data: TestimonialsData): string {
    const gridClasses = `testimonials__grid testimonials__grid--${data.layout.columns}`;
    
    return `
<div class="${gridClasses}">
  ${data.testimonials.map((testimonial, index) => 
    this.renderTestimonial(testimonial, data, index)
  ).join('')}
</div>`;
  }

  private renderCarouselTestimonials(data: TestimonialsData): string {
    return `
<div class="testimonials__carousel">
  <div class="testimonials__carousel-track" 
       style="--slides-per-view: ${data.carousel.slidesPerView}; --spacing: ${data.carousel.spacing}px;">
    ${data.testimonials.map((testimonial, index) => `
      <div class="testimonials__carousel-slide">
        ${this.renderTestimonial(testimonial, data, index)}
      </div>
    `).join('')}
  </div>
  
  ${data.carousel.showArrows ? `
    <button class="testimonials__carousel-arrow testimonials__carousel-arrow--prev" aria-label="Précédent">‹</button>
    <button class="testimonials__carousel-arrow testimonials__carousel-arrow--next" aria-label="Suivant">›</button>
  ` : ''}
  
  ${data.carousel.showDots ? `
    <div class="testimonials__carousel-dots">
      ${data.testimonials.map((_, index) => `
        <button class="testimonials__carousel-dot ${index === 0 ? 'testimonials__carousel-dot--active' : ''}" 
                data-slide="${index}"></button>
      `).join('')}
    </div>
  ` : ''}
</div>`;
  }

  private renderMasonryTestimonials(data: TestimonialsData): string {
    return `
<div class="testimonials__grid testimonials__masonry">
  ${data.testimonials.map((testimonial, index) => 
    this.renderTestimonial(testimonial, data, index)
  ).join('')}
</div>`;
  }

  private renderListTestimonials(data: TestimonialsData): string {
    return `
<div class="testimonials__grid testimonials__list">
  ${data.testimonials.map((testimonial, index) => 
    this.renderTestimonial(testimonial, data, index)
  ).join('')}
</div>`;
  }

  private renderTestimonial(testimonial: any, data: TestimonialsData, index: number): string {
    logger.debug('TestimonialsRendererV3', 'renderTestimonial', 'Génération témoignage', {
      author: testimonial.author.name,
      featured: testimonial.featured
    });
    
    const delay = data.display.stagger ? index * data.display.animationDelay : 0;
    
    const classes = [
      'testimonial',
      `testimonial--${data.display.cardStyle}`,
      `testimonial--hover-${data.display.cardHover}`,
      testimonial.featured && data.display.highlightFeatured ? 'testimonial--featured' : '',
      data.display.animation !== 'none' ? 'testimonial--animate' : ''
    ].filter(Boolean).join(' ');
    
    const styles = data.display.animation !== 'none' 
      ? `animation-delay: ${delay}ms;` 
      : '';
    
    return `
<article class="${classes}" style="${styles}">
  ${data.display.showQuoteIcon ? `
    <span class="testimonial__quote-icon testimonial__quote-icon--${data.display.quoteIconPosition}">"</span>
  ` : ''}
  
  ${data.display.showRating && testimonial.rating ? this.renderRating(testimonial.rating, data) : ''}
  
  <div class="testimonial__content ${data.display.quoteIconStyle === 'classic' ? 'testimonial__content--italic' : ''}">
    ${this.formatContent(testimonial.content, data)}
  </div>
  
  ${testimonial.media && testimonial.media.type !== 'none' ? this.renderMedia(testimonial.media) : ''}
  
  <div class="testimonial__footer">
    ${this.renderAuthor(testimonial.author, data)}
    
    ${data.display.showDate && testimonial.date ? `
      <div class="testimonial__date">${this.formatDate(testimonial.date, data.display.dateFormat)}</div>
    ` : ''}
    
    ${data.display.showSource && testimonial.source ? this.renderSource(testimonial.source, data) : ''}
  </div>
  
  ${testimonial.response ? this.renderResponse(testimonial.response) : ''}
</article>`;
  }

  private renderRating(rating: number, data: TestimonialsData): string {
    const stars = [];
    const maxStars = data.display.maxStars || 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(`<span class="testimonial__star ${i <= rating ? '' : 'testimonial__star--empty'}">★</span>`);
    }
    
    return `
<div class="testimonials__rating">
  ${stars.join('')}
  ${data.display.ratingStyle === 'both' || data.display.ratingStyle === 'numeric' ? 
    `<span class="testimonial__rating-numeric">${rating}/${maxStars}</span>` : ''}
</div>`;
  }

  private renderAuthor(author: any, data: TestimonialsData): string {
    return `
<div class="testimonial__author">
  ${data.display.showAuthorImage && author.image ? `
    <img src="${author.image.src}" 
         alt="${this.escape(author.name)}" 
         class="testimonial__author-image" />
  ` : ''}
  
  <div class="testimonial__author-info">
    <div class="testimonial__author-name">
      ${this.escape(author.name)}
      ${data.display.showVerifiedBadge && author.verified ? 
        '<span class="testimonial__verified" title="Vérifié">✓</span>' : ''}
    </div>
    ${author.role || author.company ? `
      <div class="testimonial__author-role">
        ${author.role ? this.escape(author.role) : ''}
        ${author.role && author.company ? ' • ' : ''}
        ${author.company ? this.escape(author.company) : ''}
      </div>
    ` : ''}
  </div>
</div>`;
  }

  private renderSource(source: any, data: TestimonialsData): string {
    const sourceClass = `testimonial__source testimonial__source--${data.display.sourceStyle}`;
    
    return `
<div class="${sourceClass}">
  ${this.getSourceIcon(source.type)}
  <span>${source.name || this.getSourceName(source.type)}</span>
  ${source.verified ? '<span class="testimonial__verified">✓</span>' : ''}
</div>`;
  }

  private renderMedia(media: any): string {
    if (media.type === 'image' && media.image) {
      return `
<div class="testimonial__media">
  <img src="${media.image.src}" alt="${this.escape(media.image.alt || '')}" />
</div>`;
    }
    
    if (media.type === 'video' && media.video) {
      return `
<div class="testimonial__media">
  <div class="testimonial__video">
    ${this.getVideoEmbed(media.video)}
  </div>
</div>`;
    }
    
    return '';
  }

  private renderResponse(response: any): string {
    return `
<div class="testimonial__response">
  <strong>Notre réponse :</strong>
  <p>${this.escape(response.content)}</p>
  <small>${this.formatDate(response.date, 'short')}</small>
</div>`;
  }

  private renderCTA(cta: any): string {
    return `
<div class="testimonials__cta">
  <h3 class="testimonials__cta-title">${this.escape(cta.title)}</h3>
  <p class="testimonials__cta-description">${this.escape(cta.description)}</p>
  <div class="testimonials__cta-buttons">
    <a href="${cta.buttonLink}" class="btn btn--${cta.buttonVariant}">
      ${this.escape(cta.buttonText)}
    </a>
    ${cta.showReviewButton ? `
      <button class="btn btn--outline" onclick="window.open('#review', '_blank')">
        ${this.escape(cta.reviewButtonText)}
      </button>
    ` : ''}
  </div>
</div>`;
  }

  private generateCSS(data: TestimonialsData): string {
    logger.debug('TestimonialsRendererV3', 'generateCSS', 'Génération CSS spécifique');
    
    let css = '';
    
    // CSS des couleurs personnalisées
    if (data.styles.backgroundColor || data.styles.textColor || data.styles.accentColor) {
      css += `
.testimonials {
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
  ${data.styles.textColor ? `color: ${data.styles.textColor};` : ''}
  ${data.styles.accentColor ? `--primary: ${data.styles.accentColor};` : ''}
}`;
    }
    
    // CSS pour card background
    if (data.styles.cardBackground) {
      css += `
.testimonials .testimonial {
  background-color: ${data.styles.cardBackground};
}`;
    }
    
    // CSS pour border radius
    if (data.styles.borderRadius) {
      const radiusMap = {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem'
      };
      css += `
.testimonials .testimonial {
  --testimonials-radius: ${radiusMap[data.styles.borderRadius]};
}`;
    }
    
    return css;
  }

  private generateJS(data: TestimonialsData): string {
    logger.debug('TestimonialsRendererV3', 'generateJS', 'Génération JS', {
      hasCarousel: data.variant.includes('carousel') || data.carousel.enabled,
      hasFiltering: data.filtering.enabled
    });
    
    let js = '';
    
    // JS pour carousel
    if (data.variant.includes('carousel') || data.carousel.enabled) {
      js += this.generateCarouselJS(data);
    }
    
    // JS pour filtering
    if (data.filtering.enabled) {
      js += this.generateFilteringJS();
    }
    
    // JS pour animations
    if (data.display.animation !== 'none') {
      js += this.generateAnimationJS();
    }
    
    return js;
  }

  private generateCarouselJS(data: TestimonialsData): string {
    return `
// Testimonials Carousel
(function() {
  const track = document.querySelector('.testimonials__carousel-track');
  if (!track) return;
  
  let currentSlide = 0;
  const slides = track.children;
  const totalSlides = slides.length;
  const slidesPerView = ${data.carousel.slidesPerView};
  const maxSlide = Math.max(0, totalSlides - slidesPerView);
  
  function goToSlide(index) {
    currentSlide = Math.min(Math.max(0, index), maxSlide);
    const offset = -currentSlide * (100 / slidesPerView);
    track.style.transform = 'translateX(' + offset + '%)';
    
    // Update dots
    const dots = document.querySelectorAll('.testimonials__carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('testimonials__carousel-dot--active', i === currentSlide);
    });
  }
  
  // Navigation arrows
  const prevBtn = document.querySelector('.testimonials__carousel-arrow--prev');
  const nextBtn = document.querySelector('.testimonials__carousel-arrow--next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }
  
  // Dots navigation
  const dots = document.querySelectorAll('.testimonials__carousel-dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  ${data.carousel.autoplay ? `
  // Autoplay
  let autoplayInterval = setInterval(() => {
    goToSlide((currentSlide + 1) % (maxSlide + 1));
  }, ${data.carousel.autoplayDelay});
  
  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
      goToSlide((currentSlide + 1) % (maxSlide + 1));
    }, ${data.carousel.autoplayDelay});
  });
  ` : ''}
})();`;
  }

  private generateFilteringJS(): string {
    return `
// Testimonials Filtering
(function() {
  // TODO: Implémenter le filtrage
})();`;
  }

  private generateAnimationJS(): string {
    return `
// Testimonials Animation
(function() {
  const testimonials = document.querySelectorAll('.testimonial--animate');
  
  if (!testimonials.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  testimonials.forEach(testimonial => observer.observe(testimonial));
})();`;
  }

  private formatContent(content: string, data: TestimonialsData): string {
    if (data.display.contentLength === 'truncate' && content.length > data.display.maxLength) {
      return this.escape(content.substring(0, data.display.maxLength)) + '...';
    }
    return this.escape(content);
  }

  private formatDate(date: string, format: string): string {
    const d = new Date(date);
    
    switch (format) {
      case 'relative':
        // TODO: Implémenter le format relatif
        return 'Il y a 2 jours';
      case 'short':
        return d.toLocaleDateString('fr-FR');
      case 'full':
        return d.toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      default:
        return date;
    }
  }

  private getSourceIcon(type: string): string {
    const icons: any = {
      google: '🌐',
      facebook: '📘',
      trustpilot: '⭐',
      website: '🌍'
    };
    return icons[type] || '💬';
  }

  private getSourceName(type: string): string {
    const names: any = {
      google: 'Google',
      facebook: 'Facebook',
      trustpilot: 'Trustpilot',
      website: 'Site web'
    };
    return names[type] || type;
  }

  private getVideoEmbed(video: any): string {
    if (video.platform === 'youtube') {
      const videoId = video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      return `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    
    if (video.platform === 'vimeo') {
      const videoId = video.url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `<iframe src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
    
    return `<video src="${video.url}" controls></video>`;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
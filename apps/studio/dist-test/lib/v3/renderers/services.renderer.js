"use strict";
/**
 * Services Renderer V3 - Rendu robuste avec logs détaillés
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesRendererV3 = void 0;
const services_1 = require("../schemas/blocks/services");
const logger_1 = require("../core/logger");
class ServicesRendererV3 {
    constructor() {
        this.type = 'services-ultra-modern';
        this.version = '3.0.0';
        logger_1.logger.info('ServicesRendererV3', 'constructor', '🚀 Initialisation du renderer Services V3');
    }
    validate(data) {
        logger_1.logger.debug('ServicesRendererV3', 'validate', 'Validation des données', {
            hasData: !!data,
            dataType: typeof data
        });
        const result = services_1.servicesDataSchema.safeParse(data);
        if (!result.success) {
            logger_1.logger.warn('ServicesRendererV3', 'validate', 'Validation échouée', {
                errors: result.error.errors
            });
        }
        else {
            logger_1.logger.info('ServicesRendererV3', 'validate', '✅ Validation réussie', {
                servicesCount: result.data.services.length,
                variant: result.data.variant
            });
        }
        return result;
    }
    getDefaultData() {
        logger_1.logger.debug('ServicesRendererV3', 'getDefaultData', 'Retour des données par défaut');
        return services_1.servicesDefaults;
    }
    getDefaultCSS() {
        logger_1.logger.debug('ServicesRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
        return `
/* Services Base Styles */
.services {
  position: relative;
  padding: var(--services-padding, 4rem) 0;
  overflow: hidden;
}

.services__container {
  max-width: var(--services-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.services--container-full .services__container { max-width: 100%; }
.services--container-wide .services__container { max-width: 1400px; }
.services--container-normal .services__container { max-width: 1200px; }
.services--container-narrow .services__container { max-width: 1000px; }

/* Header */
.services__header {
  text-align: center;
  margin-bottom: 3rem;
}

.services__header--left { text-align: left; }
.services__header--right { text-align: right; }

.services__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.services__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.services__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 800px;
  margin: 0 auto;
}

/* Filters */
.services__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.services__filter {
  padding: 0.5rem 1.5rem;
  background: transparent;
  border: 2px solid var(--border, #e5e7eb);
  border-radius: 9999px;
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
  cursor: pointer;
  transition: all 0.3s;
}

.services__filter:hover {
  border-color: var(--primary, #3b82f6);
  color: var(--primary, #3b82f6);
}

.services__filter--active {
  background: var(--primary, #3b82f6);
  border-color: var(--primary, #3b82f6);
  color: white;
}

.services__filter-count {
  margin-left: 0.5rem;
  opacity: 0.7;
}

/* Grid Layout */
.services__grid {
  display: grid;
  gap: var(--services-gap, 2rem);
}

.services__grid--1 { grid-template-columns: 1fr; }
.services__grid--2 { grid-template-columns: repeat(2, 1fr); }
.services__grid--3 { grid-template-columns: repeat(3, 1fr); }
.services__grid--4 { grid-template-columns: repeat(4, 1fr); }

/* Service Card */
.service {
  position: relative;
  padding: 2rem;
  background: var(--bg-elevated, white);
  border-radius: var(--services-radius, 1rem);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Card Styles */
.service--flat { background: transparent; box-shadow: none; }
.service--elevated { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.service--outlined { border: 1px solid var(--border, #e5e7eb); box-shadow: none; }
.service--gradient {
  background: linear-gradient(135deg, var(--gradient-from, #f3f4f6), var(--gradient-to, #ffffff));
}
.service--glassmorphism { 
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Hover Effects */
.service--hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.service--hover-scale:hover { transform: scale(1.05); }
.service--hover-glow:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
.service--hover-flip:hover { transform: rotateY(180deg); }

/* Featured Service */
.service--featured {
  border: 2px solid var(--primary, #3b82f6);
  transform: scale(1.02);
}

/* Badge */
.service__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  white-space: nowrap;
}

.service__badge--primary { background: var(--primary, #3b82f6); color: white; }
.service__badge--secondary { background: var(--secondary, #10b981); color: white; }
.service__badge--success { background: var(--success, #10b981); color: white; }
.service__badge--warning { background: var(--warning, #f59e0b); color: white; }
.service__badge--error { background: var(--error, #ef4444); color: white; }

/* Icon */
.service__icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.service__icon--filled {
  background: var(--primary-100, #dbeafe);
  color: var(--primary, #3b82f6);
  border-radius: 1rem;
}

.service__icon--outline {
  border: 3px solid var(--primary, #3b82f6);
  color: var(--primary, #3b82f6);
  border-radius: 1rem;
}

.service__icon--gradient {
  background: linear-gradient(135deg, var(--primary, #3b82f6), var(--secondary, #10b981));
  color: white;
  border-radius: 1rem;
}

.service__icon--shadow {
  background: white;
  color: var(--primary, #3b82f6);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service__icon--3d {
  background: var(--primary, #3b82f6);
  color: white;
  border-radius: 1rem;
  box-shadow: 
    0 10px 20px rgba(59, 130, 246, 0.3),
    inset 0 -3px 0 rgba(0, 0, 0, 0.2);
}

/* Icon positions */
.service--icon-left {
  flex-direction: row;
  align-items: start;
}

.service--icon-left .service__icon {
  margin-right: 1.5rem;
  margin-bottom: 0;
}

.service--icon-right {
  flex-direction: row;
  align-items: start;
}

.service--icon-right .service__icon {
  order: 2;
  margin-left: 1.5rem;
  margin-bottom: 0;
}

/* Content */
.service__content {
  flex: 1;
}

.service__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text, #1f2937);
}

.service__description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 1rem;
}

/* Features */
.service__features {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.service__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.service__feature::before {
  content: '✓';
  color: var(--primary, #3b82f6);
  font-weight: bold;
}

/* Pricing */
.service__pricing {
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid var(--border, #e5e7eb);
}

.service__price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.service__price-starting {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.service__price-amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text, #1f2937);
}

.service__price-currency {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
}

.service__price-period {
  font-size: 1rem;
  color: var(--text-secondary, #6b7280);
}

.service__price-description {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

/* Availability */
.service__availability {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.service__availability--available {
  color: var(--success, #10b981);
}

.service__availability--busy {
  color: var(--warning, #f59e0b);
}

.service__availability--unavailable {
  color: var(--error, #ef4444);
}

/* CTA */
.service__cta {
  margin-top: auto;
  padding-top: 1rem;
}

.service__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary, #3b82f6);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.service__link:hover {
  gap: 0.75rem;
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
  width: 100%;
}

.btn--primary {
  background: var(--primary, #3b82f6);
  color: white;
}

.btn--primary:hover {
  background: var(--primary-600, #2563eb);
}

/* List View */
.services--list-detailed .services__grid {
  display: flex;
  flex-direction: column;
}

.services--list-detailed .service {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
}

/* Carousel */
.services__carousel {
  overflow: hidden;
  position: relative;
}

.services__carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.services__carousel-slide {
  flex: 0 0 auto;
  width: calc(100% / var(--slides-per-view, 3));
  padding: 0 calc(var(--spacing, 24px) / 2);
}

.services__carousel-arrows {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  pointer-events: none;
}

.services__carousel-arrow {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s;
}

.services__carousel-arrow:hover {
  transform: scale(1.1);
}

.services__carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.services__carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border, #e5e7eb);
  cursor: pointer;
  transition: all 0.3s;
}

.services__carousel-dot--active {
  width: 24px;
  border-radius: 4px;
  background: var(--primary, #3b82f6);
}

/* Process/Timeline */
.services--timeline-process .services__grid {
  position: relative;
  display: block;
}

.services--timeline-process .services__grid::before {
  content: '';
  position: absolute;
  left: 40px;
  top: 40px;
  bottom: 40px;
  width: 2px;
  background: var(--border, #e5e7eb);
}

.services--timeline-process .service {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* CTA Section */
.services__cta-section {
  background: var(--bg-secondary, #f9fafb);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  margin-top: 3rem;
}

.services__cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text, #1f2937);
}

.services__cta-description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .services__grid--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services__grid {
    grid-template-columns: 1fr !important;
  }
  
  .service--icon-left,
  .service--icon-right {
    flex-direction: column;
  }
  
  .service--icon-left .service__icon,
  .service--icon-right .service__icon {
    margin: 0 0 1.5rem 0;
  }
}

/* Gap variants */
.services--gap-sm .services__grid { gap: 1rem; }
.services--gap-md .services__grid { gap: 1.5rem; }
.services--gap-lg .services__grid { gap: 2rem; }
.services--gap-xl .services__grid { gap: 3rem; }

/* Padding variants */
.services--padding-none { padding: 0; }
.services--padding-sm { padding: 2rem 0; }
.services--padding-md { padding: 3rem 0; }
.services--padding-lg { padding: 4rem 0; }
.services--padding-xl { padding: 6rem 0; }`;
    }
    getRequiredAssets() {
        logger_1.logger.debug('ServicesRendererV3', 'getRequiredAssets', 'Aucun asset requis');
        return [];
    }
    renderPreview(data) {
        logger_1.logger.debug('ServicesRendererV3', 'renderPreview', 'Génération preview', {
            variant: data.variant,
            servicesCount: data.services.length
        });
        return `
<div class="services-preview">
  <h3>${data.title}</h3>
  <p>${data.services.length} services - ${data.variant}</p>
</div>`;
    }
    render(data, context) {
        const startTime = performance.now();
        logger_1.logger.info('ServicesRendererV3', 'render', '🎨 Début du rendu Services', {
            variant: data.variant,
            servicesCount: data.services.length,
            hasContext: !!context
        });
        try {
            // Générer le HTML
            logger_1.logger.debug('ServicesRendererV3', 'render', 'Génération HTML');
            const html = this.generateHTML(data);
            // Générer le CSS spécifique
            logger_1.logger.debug('ServicesRendererV3', 'render', 'Génération CSS');
            const css = this.generateCSS(data);
            // Générer le JS si nécessaire
            logger_1.logger.debug('ServicesRendererV3', 'render', 'Génération JS');
            const js = this.generateJS(data);
            // Calculer les performances
            const renderTime = performance.now() - startTime;
            logger_1.logger.info('ServicesRendererV3', 'render', '✅ Rendu Services terminé', {
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
        }
        catch (error) {
            logger_1.logger.error('ServicesRendererV3', 'render', '❌ Erreur lors du rendu', error);
            return {
                html: '<div class="services services--error">Erreur de rendu</div>',
                css: this.getDefaultCSS(),
                js: '',
                assets: [],
                errors: [{
                        blockId: 'services',
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
    generateHTML(data) {
        logger_1.logger.debug('ServicesRendererV3', 'generateHTML', 'Génération structure HTML', {
            variant: data.variant,
            layout: data.layout
        });
        const classes = [
            'services',
            `services--${data.variant}`,
            `services--container-${data.layout.containerWidth}`,
            `services--gap-${data.layout.gap}`,
            `services--padding-${data.styles.padding || 'lg'}`
        ].join(' ');
        // Filtrer les services si nécessaire
        let services = data.services;
        if (data.filtering.enabled && data.filtering.defaultCategory && data.filtering.defaultCategory !== 'all') {
            services = data.services.filter(s => s.category === data.filtering.defaultCategory);
        }
        return `
<section class="${classes}" id="services" data-block="services">
  <div class="services__container">
    ${this.renderHeader(data)}
    ${data.filtering.enabled ? this.renderFilters(data) : ''}
    ${data.cta.enabled && data.cta.position === 'top' ? this.renderCTA(data.cta) : ''}
    ${this.renderServices(services, data)}
    ${data.testimonials.enabled ? this.renderTestimonials(data.testimonials) : ''}
    ${data.cta.enabled && data.cta.position === 'bottom' ? this.renderCTA(data.cta) : ''}
  </div>
</section>`;
    }
    renderHeader(data) {
        if (!data.title && !data.subtitle && !data.description)
            return '';
        logger_1.logger.debug('ServicesRendererV3', 'renderHeader', 'Génération header');
        return `
<div class="services__header services__header--${data.layout.alignment}">
  ${data.title ? `<h2 class="services__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="services__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="services__description">${this.escape(data.description)}</p>` : ''}
</div>`;
    }
    renderFilters(data) {
        logger_1.logger.debug('ServicesRendererV3', 'renderFilters', 'Génération filtres', {
            style: data.filtering.style,
            categoriesCount: data.filtering.categories.length
        });
        return `
<div class="services__filters services__filters--${data.filtering.style}">
  ${data.filtering.showAll ? `
    <button class="services__filter services__filter--active" data-category="all">
      ${this.escape(data.filtering.allLabel)}
      ${data.filtering.categories[0]?.count ? `<span class="services__filter-count">${data.services.length}</span>` : ''}
    </button>
  ` : ''}
  
  ${data.filtering.categories.filter(cat => cat.id !== 'all').map(cat => `
    <button class="services__filter" data-category="${cat.id}">
      ${this.escape(cat.label)}
      ${cat.count ? `<span class="services__filter-count">${cat.count}</span>` : ''}
    </button>
  `).join('')}
</div>`;
    }
    renderServices(services, data) {
        logger_1.logger.debug('ServicesRendererV3', 'renderServices', 'Génération services', {
            count: services.length,
            variant: data.variant
        });
        // Rendu spécifique selon la variante
        switch (data.variant) {
            case 'carousel-modern':
                return this.renderCarouselServices(services, data);
            case 'timeline-process':
                return this.renderTimelineServices(services, data);
            case 'tabs-organized':
                return this.renderTabsServices(services, data);
            default:
                return this.renderGridServices(services, data);
        }
    }
    renderGridServices(services, data) {
        const gridClasses = `services__grid services__grid--${data.layout.columns}`;
        return `
<div class="${gridClasses}">
  ${services.map((service, index) => this.renderService(service, data, index)).join('')}
</div>`;
    }
    renderCarouselServices(services, data) {
        return `
<div class="services__carousel">
  <div class="services__carousel-track" style="--slides-per-view: ${data.carousel.slidesPerView}; --spacing: ${data.carousel.spacing}px;">
    ${services.map((service, index) => `
      <div class="services__carousel-slide">
        ${this.renderService(service, data, index)}
      </div>
    `).join('')}
  </div>
  
  ${data.carousel.showArrows ? `
    <div class="services__carousel-arrows">
      <button class="services__carousel-arrow services__carousel-arrow--prev" aria-label="Précédent">‹</button>
      <button class="services__carousel-arrow services__carousel-arrow--next" aria-label="Suivant">›</button>
    </div>
  ` : ''}
  
  ${data.carousel.showDots ? `
    <div class="services__carousel-dots">
      ${services.map((_, index) => `
        <button class="services__carousel-dot ${index === 0 ? 'services__carousel-dot--active' : ''}" data-slide="${index}"></button>
      `).join('')}
    </div>
  ` : ''}
</div>`;
    }
    renderTimelineServices(services, data) {
        return `
<div class="services__grid services__timeline">
  ${services.map((service, index) => this.renderService(service, data, index)).join('')}
</div>`;
    }
    renderTabsServices(services, data) {
        // Grouper par catégorie
        const categories = [...new Set(services.map(s => s.category || 'general'))];
        return `
<div class="services__tabs">
  <div class="services__tabs-nav">
    ${categories.map((cat, index) => `
      <button class="services__tab ${index === 0 ? 'services__tab--active' : ''}" data-tab="${cat}">
        ${this.escape(cat)}
      </button>
    `).join('')}
  </div>
  
  <div class="services__tabs-content">
    ${categories.map((cat, index) => `
      <div class="services__tab-panel ${index === 0 ? 'active' : ''}" data-panel="${cat}">
        <div class="services__grid services__grid--${data.layout.columns}">
          ${services.filter(s => (s.category || 'general') === cat)
            .map((service, idx) => this.renderService(service, data, idx))
            .join('')}
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
    }
    renderService(service, data, index) {
        logger_1.logger.debug('ServicesRendererV3', 'renderService', 'Génération service', {
            title: service.title,
            featured: service.featured
        });
        const delay = data.display.stagger ? index * data.display.animationDelay : 0;
        const classes = [
            'service',
            `service--${data.display.cardStyle}`,
            `service--hover-${data.display.cardHover}`,
            `service--icon-${data.display.iconPosition}`,
            service.featured && data.display.highlightFeatured ? 'service--featured' : '',
            data.display.animation !== 'none' ? 'service--animate' : ''
        ].filter(Boolean).join(' ');
        const styles = data.display.animation !== 'none'
            ? `animation-delay: ${delay}ms;`
            : '';
        return `
<article class="${classes}" style="${styles}" data-category="${service.category || 'general'}">
  ${service.badge ? `
    <span class="service__badge service__badge--${service.badge.color}">
      ${this.escape(service.badge.text)}
    </span>
  ` : ''}
  
  ${data.display.showIcon && service.icon ? this.renderServiceIcon(service.icon, data) : ''}
  
  ${data.display.showImage && service.image ? `
    <div class="service__image service__image--${data.display.imagePosition}">
      <img src="${service.image.src}" alt="${this.escape(service.image.alt || '')}" />
    </div>
  ` : ''}
  
  <div class="service__content">
    <h3 class="service__title">${this.escape(service.title)}</h3>
    <p class="service__description">${this.escape(service.description)}</p>
    
    ${data.display.showFeatures && service.features ? this.renderFeatures(service.features, data) : ''}
    
    ${data.display.showPricing && service.pricing?.enabled ? this.renderPricing(service.pricing, data) : ''}
    
    ${service.availability ? this.renderAvailability(service.availability) : ''}
    
    ${service.cta?.enabled ? this.renderCTAButton(service.cta) : ''}
  </div>
</article>`;
    }
    renderServiceIcon(icon, data) {
        const iconClasses = `service__icon service__icon--${data.display.iconStyle} service__icon--${data.display.iconSize}`;
        if (typeof icon === 'object') {
            // TODO: Gérer les différents types d'icônes (svg, image, lottie)
            return `<div class="${iconClasses}">${icon.value}</div>`;
        }
        // C'est une string (emoji ou texte)
        return `<div class="${iconClasses}">${icon}</div>`;
    }
    renderFeatures(features, data) {
        if (data.display.featuresStyle === 'tags') {
            return `
<div class="service__features service__features--tags">
  ${features.slice(0, data.display.maxFeatures).map(f => `
    <span class="service__feature-tag">${this.escape(f)}</span>
  `).join('')}
</div>`;
        }
        return `
<ul class="service__features">
  ${features.slice(0, data.display.maxFeatures).map(f => `
    <li class="service__feature">${this.escape(f)}</li>
  `).join('')}
</ul>`;
    }
    renderPricing(pricing, data) {
        return `
<div class="service__pricing service__pricing--${data.display.pricingStyle}">
  <div class="service__price">
    ${pricing.startingAt ? '<span class="service__price-starting">À partir de</span>' : ''}
    <span class="service__price-amount">${pricing.amount}</span>
    <span class="service__price-currency">${pricing.currency}</span>
    ${pricing.period !== 'project' ? `
      <span class="service__price-period">/${this.getPeriodLabel(pricing.period, pricing.customPeriod)}</span>
    ` : ''}
  </div>
  ${pricing.description ? `<p class="service__price-description">${this.escape(pricing.description)}</p>` : ''}
</div>`;
    }
    renderAvailability(availability) {
        return `
<div class="service__availability service__availability--${availability.status}">
  <span class="service__availability-icon">●</span>
  ${availability.message || this.getAvailabilityLabel(availability.status)}
</div>`;
    }
    renderCTAButton(cta) {
        if (cta.style === 'link') {
            return `
<div class="service__cta">
  <a href="${cta.link}" class="service__link">
    ${this.escape(cta.text)}
    <span class="service__link-arrow">→</span>
  </a>
</div>`;
        }
        return `
<div class="service__cta">
  <a href="${cta.link}" class="btn btn--primary">
    ${this.escape(cta.text)}
  </a>
</div>`;
    }
    renderTestimonials(testimonials) {
        if (!testimonials.items || testimonials.items.length === 0)
            return '';
        return `
<div class="services__testimonials">
  <h3>${this.escape(testimonials.title)}</h3>
  <!-- TODO: Implémenter l'affichage des témoignages -->
</div>`;
    }
    renderCTA(cta) {
        return `
<div class="services__cta-section">
  <h3 class="services__cta-title">${this.escape(cta.title)}</h3>
  <p class="services__cta-description">${this.escape(cta.description)}</p>
  <a href="${cta.buttonLink}" class="btn btn--${cta.buttonVariant} btn--lg">
    ${this.escape(cta.buttonText)}
  </a>
</div>`;
    }
    generateCSS(data) {
        logger_1.logger.debug('ServicesRendererV3', 'generateCSS', 'Génération CSS spécifique');
        let css = '';
        // CSS des couleurs personnalisées
        if (data.styles.backgroundColor || data.styles.textColor || data.styles.accentColor) {
            css += `
.services {
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
                xl: '1.5rem'
            };
            css += `
.services .service {
  --services-radius: ${radiusMap[data.styles.borderRadius]};
}`;
        }
        // CSS pour shadow
        if (data.styles.shadow && data.display.cardStyle === 'elevated') {
            const shadowMap = {
                none: 'none',
                sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            };
            css += `
.services .service--elevated {
  box-shadow: ${shadowMap[data.styles.shadow]};
}`;
        }
        return css;
    }
    generateJS(data) {
        logger_1.logger.debug('ServicesRendererV3', 'generateJS', 'Génération JS', {
            hasFiltering: data.filtering.enabled,
            hasCarousel: data.variant === 'carousel-modern' || data.carousel.enabled,
            hasTabs: data.variant === 'tabs-organized'
        });
        let js = '';
        // JS pour les filtres
        if (data.filtering.enabled) {
            js += this.generateFilterJS();
        }
        // JS pour le carousel
        if (data.variant === 'carousel-modern' || data.carousel.enabled) {
            js += this.generateCarouselJS(data);
        }
        // JS pour les tabs
        if (data.variant === 'tabs-organized') {
            js += this.generateTabsJS();
        }
        // JS pour les animations
        if (data.display.animation !== 'none') {
            js += this.generateAnimationJS();
        }
        return js;
    }
    generateFilterJS() {
        return `
// Services Filtering
(function() {
  const filters = document.querySelectorAll('.services__filter');
  const services = document.querySelectorAll('.service');
  
  if (!filters.length || !services.length) return;
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('services__filter--active'));
      filter.classList.add('services__filter--active');
      
      // Filter services
      services.forEach(service => {
        const serviceCategory = service.dataset.category || 'general';
        
        if (category === 'all' || serviceCategory === category) {
          service.style.display = '';
          service.classList.add('service--animate');
        } else {
          service.style.display = 'none';
        }
      });
    });
  });
})();`;
    }
    generateCarouselJS(data) {
        return `
// Services Carousel
(function() {
  const track = document.querySelector('.services__carousel-track');
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
    const dots = document.querySelectorAll('.services__carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('services__carousel-dot--active', i === currentSlide);
    });
  }
  
  // Navigation
  const prevBtn = document.querySelector('.services__carousel-arrow--prev');
  const nextBtn = document.querySelector('.services__carousel-arrow--next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }
  
  // Dots
  const dots = document.querySelectorAll('.services__carousel-dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  ${data.carousel.autoplay ? `
  // Autoplay
  setInterval(() => {
    goToSlide((currentSlide + 1) % (maxSlide + 1));
  }, ${data.carousel.autoplayDelay});
  ` : ''}
})();`;
    }
    generateTabsJS() {
        return `
// Services Tabs
(function() {
  const tabs = document.querySelectorAll('.services__tab');
  const panels = document.querySelectorAll('.services__tab-panel');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Update active states
      tabs.forEach(t => t.classList.remove('services__tab--active'));
      panels.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('services__tab--active');
      panels[index].classList.add('active');
    });
  });
})();`;
    }
    generateAnimationJS() {
        return `
// Services Animation
(function() {
  const services = document.querySelectorAll('.service--animate');
  
  if (!services.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  services.forEach(service => observer.observe(service));
})();`;
    }
    getPeriodLabel(period, customPeriod) {
        const periodMap = {
            hour: 'heure',
            day: 'jour',
            project: 'projet'
        };
        return customPeriod || periodMap[period] || period;
    }
    getAvailabilityLabel(status) {
        const statusMap = {
            available: 'Disponible',
            busy: 'Occupé',
            unavailable: 'Indisponible'
        };
        return statusMap[status] || status;
    }
    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
exports.ServicesRendererV3 = ServicesRendererV3;

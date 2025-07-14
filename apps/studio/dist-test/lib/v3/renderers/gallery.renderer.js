"use strict";
/**
 * Gallery Renderer V3 - Rendu robuste avec logs détaillés
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryRendererV3 = void 0;
const gallery_1 = require("../schemas/blocks/gallery");
const logger_1 = require("../core/logger");
class GalleryRendererV3 {
    constructor() {
        this.type = 'gallery-ultra-modern';
        this.version = '3.0.0';
        logger_1.logger.info('GalleryRendererV3', 'constructor', '🚀 Initialisation du renderer Gallery V3');
    }
    validate(data) {
        logger_1.logger.debug('GalleryRendererV3', 'validate', 'Validation des données', {
            hasData: !!data,
            dataType: typeof data
        });
        const result = gallery_1.galleryDataSchema.safeParse(data);
        if (!result.success) {
            logger_1.logger.warn('GalleryRendererV3', 'validate', 'Validation échouée', {
                errors: result.error.errors
            });
        }
        else {
            logger_1.logger.info('GalleryRendererV3', 'validate', '✅ Validation réussie', {
                itemsCount: result.data.items.length,
                variant: result.data.variant
            });
        }
        return result;
    }
    getDefaultData() {
        logger_1.logger.debug('GalleryRendererV3', 'getDefaultData', 'Retour des données par défaut');
        return gallery_1.galleryDefaults;
    }
    getDefaultCSS() {
        logger_1.logger.debug('GalleryRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
        return `
/* Gallery Base Styles */
.gallery {
  position: relative;
  padding: var(--gallery-padding, 4rem) 0;
  overflow: hidden;
}

.gallery__container {
  max-width: var(--gallery-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.gallery--container-full .gallery__container { max-width: 100%; padding: 0; }
.gallery--container-wide .gallery__container { max-width: 1400px; }
.gallery--container-normal .gallery__container { max-width: 1200px; }
.gallery--container-narrow .gallery__container { max-width: 1000px; }

/* Header */
.gallery__header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.gallery__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.gallery__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 800px;
  margin: 0 auto;
}

/* Filters */
.gallery__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.gallery__filter {
  padding: 0.5rem 1.5rem;
  background: var(--bg-elevated, #f3f4f6);
  border: 2px solid transparent;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
  cursor: pointer;
  transition: all 0.3s;
}

.gallery__filter:hover {
  background: var(--bg-hover, #e5e7eb);
}

.gallery__filter--active {
  background: var(--primary, #3b82f6);
  color: white;
  border-color: var(--primary, #3b82f6);
}

.gallery__filter-count {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  font-size: 0.75rem;
}

/* Grid Layout */
.gallery__grid {
  display: grid;
  gap: var(--gallery-gap, 1rem);
}

/* Grid columns */
.gallery__grid--desktop-1 { grid-template-columns: 1fr; }
.gallery__grid--desktop-2 { grid-template-columns: repeat(2, 1fr); }
.gallery__grid--desktop-3 { grid-template-columns: repeat(3, 1fr); }
.gallery__grid--desktop-4 { grid-template-columns: repeat(4, 1fr); }
.gallery__grid--desktop-5 { grid-template-columns: repeat(5, 1fr); }
.gallery__grid--desktop-6 { grid-template-columns: repeat(6, 1fr); }

/* Gallery Item */
.gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--gallery-radius, 0.5rem);
  background: var(--bg-elevated, #f3f4f6);
  cursor: pointer;
  transition: all 0.3s;
}

.gallery__item--featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Aspect ratios */
.gallery__item--ratio-auto { aspect-ratio: auto; }
.gallery__item--ratio-1-1 { aspect-ratio: 1/1; }
.gallery__item--ratio-4-3 { aspect-ratio: 4/3; }
.gallery__item--ratio-16-9 { aspect-ratio: 16/9; }
.gallery__item--ratio-3-2 { aspect-ratio: 3/2; }
.gallery__item--ratio-2-3 { aspect-ratio: 2/3; }

/* Image */
.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

/* Hover effects */
.gallery__item--hover-zoom:hover .gallery__image { transform: scale(1.05); }
.gallery__item--hover-rotate:hover .gallery__image { transform: rotate(2deg) scale(1.05); }
.gallery__item--hover-blur:hover .gallery__image { filter: blur(2px); }
.gallery__item--hover-grayscale:hover .gallery__image { filter: grayscale(1); }
.gallery__item--hover-brightness:hover .gallery__image { filter: brightness(1.2); }

/* Overlay */
.gallery__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}

.gallery__overlay--always {
  opacity: 1;
}

.gallery__item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.gallery__item-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.gallery__item-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: white;
}

/* Masonry Layout */
.gallery--masonry-flow .gallery__grid {
  column-count: 3;
  column-gap: 1rem;
}

.gallery--masonry-flow .gallery__item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

/* Carousel */
.gallery--carousel-fullscreen .gallery__grid {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.gallery--carousel-fullscreen .gallery__grid::-webkit-scrollbar {
  display: none;
}

.gallery--carousel-fullscreen .gallery__item {
  flex: 0 0 100%;
  scroll-snap-align: center;
  height: 70vh;
}

/* Lightbox */
.gallery__lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.gallery__lightbox--active {
  opacity: 1;
  visibility: visible;
}

.gallery__lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.gallery__lightbox-controls {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
}

.gallery__lightbox-btn {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.gallery__lightbox-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.gallery__lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.gallery__lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.gallery__lightbox-prev { left: 2rem; }
.gallery__lightbox-next { right: 2rem; }

.gallery__lightbox-caption {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
}

.gallery__lightbox-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.gallery__lightbox-counter {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Thumbnails */
.gallery__lightbox-thumbnails {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  max-width: 90vw;
  overflow-x: auto;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
}

.gallery__lightbox-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.gallery__lightbox-thumb:hover,
.gallery__lightbox-thumb--active {
  opacity: 1;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gallery__item--animate {
  animation: slideIn 0.6s ease-out backwards;
}

/* Loading */
.gallery__item--loading {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive */
@media (max-width: 1024px) {
  .gallery__grid--desktop-5,
  .gallery__grid--desktop-6 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .gallery--masonry-flow .gallery__grid {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .gallery__grid--desktop-3,
  .gallery__grid--desktop-4,
  .gallery__grid--desktop-5,
  .gallery__grid--desktop-6 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery__item--featured {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .gallery--masonry-flow .gallery__grid {
    column-count: 1;
  }
}

@media (max-width: 480px) {
  .gallery__grid {
    grid-template-columns: 1fr !important;
  }
}

/* Gap variants */
.gallery--gap-none .gallery__grid { gap: 0; }
.gallery--gap-xs .gallery__grid { gap: 0.25rem; }
.gallery--gap-sm .gallery__grid { gap: 0.5rem; }
.gallery--gap-md .gallery__grid { gap: 1rem; }
.gallery--gap-lg .gallery__grid { gap: 1.5rem; }
.gallery--gap-xl .gallery__grid { gap: 2rem; }

/* Padding variants */
.gallery--padding-none { padding: 0; }
.gallery--padding-sm { padding: 2rem 0; }
.gallery--padding-md { padding: 3rem 0; }
.gallery--padding-lg { padding: 4rem 0; }
.gallery--padding-xl { padding: 6rem 0; }

/* Border radius variants */
.gallery--radius-none .gallery__item { border-radius: 0; }
.gallery--radius-sm .gallery__item { border-radius: 0.25rem; }
.gallery--radius-md .gallery__item { border-radius: 0.5rem; }
.gallery--radius-lg .gallery__item { border-radius: 1rem; }
.gallery--radius-xl .gallery__item { border-radius: 1.5rem; }`;
    }
    getRequiredAssets() {
        logger_1.logger.debug('GalleryRendererV3', 'getRequiredAssets', 'Aucun asset requis');
        return [];
    }
    renderPreview(data) {
        logger_1.logger.debug('GalleryRendererV3', 'renderPreview', 'Génération preview', {
            variant: data.variant,
            itemsCount: data.items.length
        });
        return `
<div class="gallery-preview">
  <h3>${data.title}</h3>
  <p>${data.items.length} images - ${data.variant}</p>
</div>`;
    }
    render(data, context) {
        const startTime = performance.now();
        logger_1.logger.info('GalleryRendererV3', 'render', '🎨 Début du rendu Gallery', {
            variant: data.variant,
            itemsCount: data.items.length,
            hasLightbox: data.lightbox.enabled,
            hasFilters: data.filtering.enabled
        });
        try {
            // Générer le HTML
            logger_1.logger.debug('GalleryRendererV3', 'render', 'Génération HTML');
            const html = this.generateHTML(data);
            // Générer le CSS spécifique
            logger_1.logger.debug('GalleryRendererV3', 'render', 'Génération CSS');
            const css = this.generateCSS(data);
            // Générer le JS
            logger_1.logger.debug('GalleryRendererV3', 'render', 'Génération JS');
            const js = this.generateJS(data);
            // Calculer les performances
            const renderTime = performance.now() - startTime;
            logger_1.logger.info('GalleryRendererV3', 'render', '✅ Rendu Gallery terminé', {
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
            logger_1.logger.error('GalleryRendererV3', 'render', '❌ Erreur lors du rendu', error);
            return {
                html: '<div class="gallery gallery--error">Erreur de rendu</div>',
                css: this.getDefaultCSS(),
                js: '',
                assets: [],
                errors: [{
                        blockId: 'gallery',
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
        logger_1.logger.debug('GalleryRendererV3', 'generateHTML', 'Génération structure HTML', {
            variant: data.variant,
            layout: data.layout,
            filtering: data.filtering.enabled
        });
        const classes = [
            'gallery',
            `gallery--${data.variant}`,
            `gallery--container-${data.layout.containerWidth}`,
            `gallery--gap-${data.layout.gap}`,
            `gallery--padding-${data.styles.padding || 'lg'}`,
            `gallery--radius-${data.display.borderRadius}`
        ].join(' ');
        return `
<section class="${classes}" id="gallery" data-block="gallery">
  <div class="gallery__container">
    ${this.renderHeader(data)}
    ${data.filtering.enabled ? this.renderFilters(data) : ''}
    ${this.renderGallery(data)}
    ${data.cta.enabled ? this.renderCTA(data.cta) : ''}
  </div>
  ${data.lightbox.enabled ? this.renderLightbox() : ''}
</section>`;
    }
    renderHeader(data) {
        if (!data.title && !data.subtitle && !data.description)
            return '';
        logger_1.logger.debug('GalleryRendererV3', 'renderHeader', 'Génération header');
        return `
<div class="gallery__header">
  ${data.title ? `<h2 class="gallery__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="gallery__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="gallery__description">${this.escape(data.description)}</p>` : ''}
</div>`;
    }
    renderFilters(data) {
        logger_1.logger.debug('GalleryRendererV3', 'renderFilters', 'Génération filtres', {
            style: data.filtering.style,
            categoriesCount: data.filtering.categories.length
        });
        return `
<div class="gallery__filters gallery__filters--${data.filtering.style}">
  ${data.filtering.showAll ? `
    <button class="gallery__filter gallery__filter--active" data-filter="all">
      ${this.escape(data.filtering.allLabel)}
      ${data.filtering.showCount ? `<span class="gallery__filter-count">${data.items.length}</span>` : ''}
    </button>
  ` : ''}
  
  ${data.filtering.categories.map(cat => `
    <button class="gallery__filter" data-filter="${cat.id}">
      ${this.escape(cat.label)}
      ${data.filtering.showCount && cat.count ? `<span class="gallery__filter-count">${cat.count}</span>` : ''}
    </button>
  `).join('')}
</div>`;
    }
    renderGallery(data) {
        logger_1.logger.debug('GalleryRendererV3', 'renderGallery', 'Génération galerie', {
            itemsCount: data.items.length,
            variant: data.variant
        });
        const gridClasses = [
            'gallery__grid',
            `gallery__grid--desktop-${data.layout.columns.desktop}`,
            `gallery__grid--tablet-${data.layout.columns.tablet}`,
            `gallery__grid--mobile-${data.layout.columns.mobile}`
        ].join(' ');
        return `
<div class="${gridClasses}" id="gallery-grid">
  ${data.items.map((item, index) => this.renderGalleryItem(item, data, index)).join('')}
</div>`;
    }
    renderGalleryItem(item, data, index) {
        const delay = data.display.stagger ? index * data.display.animationDelay : 0;
        const classes = [
            'gallery__item',
            `gallery__item--ratio-${data.layout.aspectRatio}`,
            `gallery__item--hover-${data.display.hoverEffect}`,
            item.featured ? 'gallery__item--featured' : '',
            data.display.animation !== 'none' ? 'gallery__item--animate' : '',
            data.lazyLoad.enabled ? 'gallery__item--loading' : ''
        ].filter(Boolean).join(' ');
        const styles = data.display.animation !== 'none'
            ? `animation-delay: ${delay}ms;`
            : '';
        return `
<div class="${classes}" 
     style="${styles}" 
     data-category="${item.category || 'uncategorized'}"
     data-index="${index}">
  <img 
    src="${data.lazyLoad.enabled ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E' : item.image.src}"
    ${data.lazyLoad.enabled ? `data-src="${item.image.src}"` : ''}
    alt="${this.escape(item.image.alt || '')}"
    class="gallery__image"
    loading="${data.display.imageLoading}"
    width="${item.image.width || ''}"
    height="${item.image.height || ''}"
  />
  
  ${data.display.overlayStyle !== 'none' ? `
    <div class="gallery__overlay ${data.display.overlayStyle === 'always' ? 'gallery__overlay--always' : ''}">
      ${data.display.showTitle && item.title ? `
        <h3 class="gallery__item-title">${this.escape(item.title)}</h3>
      ` : ''}
      ${data.display.showDescription && item.description ? `
        <p class="gallery__item-description">${this.escape(item.description)}</p>
      ` : ''}
      ${data.display.showCategory && item.category ? `
        <span class="gallery__item-category">${this.escape(item.category)}</span>
      ` : ''}
    </div>
  ` : ''}
</div>`;
    }
    renderLightbox() {
        logger_1.logger.debug('GalleryRendererV3', 'renderLightbox', 'Génération lightbox');
        return `
<div class="gallery__lightbox" id="gallery-lightbox">
  <div class="gallery__lightbox-controls">
    ${`<button class="gallery__lightbox-btn" id="lightbox-zoom" aria-label="Zoom">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
        <path d="M11 8v6M8 11h6"></path>
      </svg>
    </button>`}
    ${`<button class="gallery__lightbox-btn" id="lightbox-fullscreen" aria-label="Plein écran">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
      </svg>
    </button>`}
    <button class="gallery__lightbox-btn" id="lightbox-close" aria-label="Fermer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
  
  <button class="gallery__lightbox-nav gallery__lightbox-prev" id="lightbox-prev" aria-label="Précédent">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  
  <button class="gallery__lightbox-nav gallery__lightbox-next" id="lightbox-next" aria-label="Suivant">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  
  <img class="gallery__lightbox-image" id="lightbox-image" src="" alt="" />
  
  <div class="gallery__lightbox-caption">
    <h3 class="gallery__lightbox-title" id="lightbox-title"></h3>
    <p class="gallery__lightbox-counter" id="lightbox-counter"></p>
  </div>
  
  ${`<div class="gallery__lightbox-thumbnails" id="lightbox-thumbnails"></div>`}
</div>`;
    }
    renderCTA(cta) {
        return `
<div class="gallery__cta">
  <a href="${cta.link}" class="btn btn--${cta.variant} btn--lg">
    ${this.escape(cta.text)}
  </a>
</div>`;
    }
    generateCSS(data) {
        logger_1.logger.debug('GalleryRendererV3', 'generateCSS', 'Génération CSS spécifique');
        let css = '';
        // CSS des couleurs personnalisées
        if (data.styles.backgroundColor || data.styles.textColor || data.styles.accentColor) {
            css += `
.gallery {
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
  ${data.styles.textColor ? `color: ${data.styles.textColor};` : ''}
  ${data.styles.accentColor ? `--primary: ${data.styles.accentColor};` : ''}
}`;
        }
        // CSS pour le lightbox
        if (data.lightbox.enabled && data.lightbox.backdropColor) {
            css += `
.gallery__lightbox {
  background: ${data.lightbox.backdropColor}${Math.round(data.lightbox.backdropOpacity * 255).toString(16).padStart(2, '0')};
}`;
        }
        // CSS pour masonry responsive
        if (data.variant === 'masonry-flow') {
            css += `
@media (max-width: 1024px) {
  .gallery--masonry-flow .gallery__grid {
    column-count: ${data.layout.columns.tablet};
  }
}
@media (max-width: 640px) {
  .gallery--masonry-flow .gallery__grid {
    column-count: ${data.layout.columns.mobile};
  }
}`;
        }
        return css;
    }
    generateJS(data) {
        logger_1.logger.debug('GalleryRendererV3', 'generateJS', 'Génération JS', {
            hasFiltering: data.filtering.enabled,
            hasLightbox: data.lightbox.enabled,
            hasLazyLoad: data.lazyLoad.enabled,
            hasCarousel: data.variant === 'carousel-fullscreen'
        });
        let js = '';
        // Lazy loading
        if (data.lazyLoad.enabled) {
            js += this.generateLazyLoadJS(data);
        }
        // Filtres
        if (data.filtering.enabled) {
            js += this.generateFilterJS(data);
        }
        // Lightbox
        if (data.lightbox.enabled) {
            js += this.generateLightboxJS(data);
        }
        // Masonry
        if (data.variant === 'masonry-flow' && data.masonry.enabled) {
            js += this.generateMasonryJS(data);
        }
        // Carousel
        if (data.variant === 'carousel-fullscreen' || data.carousel.enabled) {
            js += this.generateCarouselJS(data);
        }
        return js;
    }
    generateLazyLoadJS(data) {
        return `
// Gallery Lazy Loading
(function() {
  const images = document.querySelectorAll('.gallery__image[data-src]');
  if (!images.length) return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const item = img.closest('.gallery__item');
        
        // Load image
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        
        // Remove loading class when loaded
        img.addEventListener('load', () => {
          item.classList.remove('gallery__item--loading');
          ${data.lazyLoad.fadeIn ? `
          img.style.opacity = '0';
          img.style.transition = 'opacity ${data.lazyLoad.fadeInDuration}ms';
          setTimeout(() => { img.style.opacity = '1'; }, 10);
          ` : ''}
        });
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '${data.lazyLoad.rootMargin}',
    threshold: ${data.lazyLoad.threshold}
  });
  
  images.forEach(img => imageObserver.observe(img));
})();`;
    }
    generateFilterJS(data) {
        return `
// Gallery Filtering
(function() {
  const filters = document.querySelectorAll('.gallery__filter');
  const items = document.querySelectorAll('.gallery__item');
  
  if (!filters.length || !items.length) return;
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterValue = filter.dataset.filter;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('gallery__filter--active'));
      filter.classList.add('gallery__filter--active');
      
      // Filter items
      items.forEach((item, index) => {
        const category = item.dataset.category || 'uncategorized';
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = '';
          ${data.filtering.animation !== 'none' ? `
          item.style.animationDelay = (index * 50) + 'ms';
          item.classList.add('gallery__item--animate');
          ` : ''}
        } else {
          item.style.display = 'none';
        }
      });
      
      ${data.masonry.enabled ? 'if (window.galleryMasonry) window.galleryMasonry.layout();' : ''}
    });
  });
})();`;
    }
    generateLightboxJS(data) {
        return `
// Gallery Lightbox
(function() {
  const items = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('gallery-lightbox');
  if (!items.length || !lightbox) return;
  
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxZoom = document.getElementById('lightbox-zoom');
  
  let currentIndex = 0;
  let zoomLevel = 1;
  const galleryData = ${JSON.stringify(data.items.map(item => ({
            src: item.image.src,
            title: item.title || '',
            description: item.description || ''
        })))};
  
  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('gallery__lightbox--active');
    document.body.style.overflow = 'hidden';
    
    ${data.lightbox.keyboardNavigation ? `
    document.addEventListener('keydown', handleKeyboard);
    ` : ''}
  }
  
  function closeLightbox() {
    lightbox.classList.remove('gallery__lightbox--active');
    document.body.style.overflow = '';
    zoomLevel = 1;
    lightboxImage.style.transform = '';
    
    ${data.lightbox.keyboardNavigation ? `
    document.removeEventListener('keydown', handleKeyboard);
    ` : ''}
  }
  
  function updateLightbox() {
    const item = galleryData[currentIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.title;
    
    ${data.lightbox.showCaption ? `
    lightboxTitle.textContent = item.title;
    ` : ''}
    
    ${data.lightbox.showCounter ? `
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + galleryData.length;
    ` : ''}
    
    // Update thumbnails
    ${data.lightbox.showThumbnails ? `
    updateThumbnails();
    ` : ''}
  }
  
  function navigate(direction) {
    currentIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
    updateLightbox();
  }
  
  ${data.lightbox.keyboardNavigation ? `
  function handleKeyboard(e) {
    switch(e.key) {
      case 'ArrowLeft': navigate(-1); break;
      case 'ArrowRight': navigate(1); break;
      case 'Escape': closeLightbox(); break;
      case '+': zoom(1.2); break;
      case '-': zoom(0.8); break;
    }
  }
  ` : ''}
  
  ${data.lightbox.showZoom ? `
  function zoom(factor) {
    zoomLevel = Math.min(Math.max(zoomLevel * factor, 1), ${data.lightbox.maxZoom});
    lightboxImage.style.transform = 'scale(' + zoomLevel + ')';
  }
  
  lightboxZoom?.addEventListener('click', () => zoom(1.5));
  ` : ''}
  
  // Event listeners
  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => navigate(-1));
  lightboxNext?.addEventListener('click', () => navigate(1));
  
  // Click outside to close
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  ${data.lightbox.autoplay ? `
  // Autoplay
  let autoplayInterval;
  function startAutoplay() {
    autoplayInterval = setInterval(() => navigate(1), ${data.lightbox.autoplayDelay});
  }
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  lightbox?.addEventListener('mouseenter', stopAutoplay);
  lightbox?.addEventListener('mouseleave', startAutoplay);
  ` : ''}
})();`;
    }
    generateMasonryJS(data) {
        return `
// Gallery Masonry Layout
(function() {
  // Simple masonry simulation
  const grid = document.querySelector('.gallery__grid');
  if (!grid || !grid.classList.contains('gallery--masonry-flow')) return;
  
  function layoutMasonry() {
    const items = grid.querySelectorAll('.gallery__item');
    // Masonry logic here if needed
  }
  
  window.galleryMasonry = { layout: layoutMasonry };
  
  // Layout on load and resize
  window.addEventListener('load', layoutMasonry);
  window.addEventListener('resize', layoutMasonry);
})();`;
    }
    generateCarouselJS(data) {
        return `
// Gallery Carousel
(function() {
  const carousel = document.querySelector('.gallery--carousel-fullscreen .gallery__grid');
  if (!carousel) return;
  
  let currentSlide = 0;
  const slides = carousel.children;
  const totalSlides = slides.length;
  
  ${data.carousel.autoplay ? `
  // Autoplay
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    carousel.scrollTo({
      left: currentSlide * carousel.offsetWidth,
      behavior: 'smooth'
    });
  }, ${data.carousel.autoplayDelay});
  ` : ''}
})();`;
    }
    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
exports.GalleryRendererV3 = GalleryRendererV3;

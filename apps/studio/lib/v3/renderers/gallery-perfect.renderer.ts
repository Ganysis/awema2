/**
 * Gallery Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { galleryDataSchema, galleryDefaults, type GalleryData } from '../schemas/blocks/gallery';
import { logger } from '../core/logger';

export class GalleryRendererV3Perfect extends BaseRendererV3<GalleryData> {
  type = 'gallery-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('GalleryRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Gallery V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<GalleryData, GalleryData> {
    return galleryDataSchema.safeParse(data);
  }

  getDefaultData(): GalleryData {
    return galleryDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Utilise la méthode de base qui génère automatiquement les props
   */
  getBlockProps(): BlockProp[] {
    // Utilise la méthode de la classe de base qui génère automatiquement
    // les props à partir des données par défaut
    return super.getBlockProps();
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   GALLERY V3 PERFECT - Styles magnifiques
   ======================================== */

.gallery {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--gallery-bg, #ffffff);
}

.gallery__container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.gallery__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.gallery__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1f2937;
}

.gallery__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Masonry Flow - Disposition fluide */
.gallery--masonry-flow .gallery__grid {
  columns: 300px auto;
  column-gap: 1.5rem;
}

.gallery--masonry-flow .gallery__item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery--masonry-flow .gallery__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}

@supports (grid-template-rows: masonry) {
  .gallery--masonry-flow .gallery__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: masonry;
    gap: 1.5rem;
  }
}

/* 2. Infinite Grid - Grille infinie */
.gallery--infinite-grid .gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1px;
  background: #e5e7eb;
  padding: 1px;
  border-radius: 1rem;
  overflow: hidden;
}

.gallery--infinite-grid .gallery__item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: white;
  transition: all 0.3s;
}

.gallery--infinite-grid .gallery__item:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
}

.gallery--infinite-grid .gallery__item:nth-child(3n) {
  grid-column: span 2;
  grid-row: span 2;
}

/* 3. Carousel Elegant - Carrousel sophistiqué */
.gallery--carousel-elegant {
  position: relative;
}

.gallery--carousel-elegant .gallery__track {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem 0;
}

.gallery--carousel-elegant .gallery__track::-webkit-scrollbar {
  display: none;
}

.gallery--carousel-elegant .gallery__item {
  flex: 0 0 400px;
  scroll-snap-align: center;
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.4s;
}

.gallery--carousel-elegant .gallery__item:hover {
  transform: scale(1.02);
}

.gallery--carousel-elegant .gallery__controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.gallery--carousel-elegant .gallery__control {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s;
}

.gallery--carousel-elegant .gallery__control:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.3);
}

/* 4. Hexagon Hive - Alvéoles hexagonales */
.gallery--hexagon-hive .gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 10px;
  justify-content: center;
  padding: 2rem 0;
}

.gallery--hexagon-hive .gallery__item {
  position: relative;
  width: 200px;
  height: 230px;
  margin: 10px;
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
  transition: all 0.4s;
}

.gallery--hexagon-hive .gallery__item:nth-child(even) {
  margin-top: -55px;
}

.gallery--hexagon-hive .gallery__item:hover {
  transform: scale(1.1) rotate(10deg);
  z-index: 10;
  filter: brightness(1.1);
}

/* 5. Polaroid Stack - Pile Polaroid */
.gallery--polaroid-stack .gallery__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 3rem 0;
}

.gallery--polaroid-stack .gallery__item {
  position: relative;
  background: white;
  padding: 1rem 1rem 4rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  transform: rotate(var(--rotation, -5deg));
  transition: all 0.4s;
  cursor: pointer;
}

.gallery--polaroid-stack .gallery__item:nth-child(even) {
  --rotation: 5deg;
}

.gallery--polaroid-stack .gallery__item:nth-child(3n) {
  --rotation: -3deg;
}

.gallery--polaroid-stack .gallery__item:hover {
  transform: rotate(0deg) scale(1.1);
  z-index: 10;
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.3);
}

.gallery--polaroid-stack .gallery__caption {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  color: #4b5563;
}

/* 6. Mosaic Art - Mosaïque artistique */
.gallery--mosaic-art .gallery__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 150px;
  gap: 0.5rem;
  border-radius: 1.5rem;
  overflow: hidden;
}

.gallery--mosaic-art .gallery__item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s;
}

.gallery--mosaic-art .gallery__item:nth-child(1) {
  grid-column: span 3;
  grid-row: span 2;
}

.gallery--mosaic-art .gallery__item:nth-child(2) {
  grid-column: span 2;
  grid-row: span 3;
}

.gallery--mosaic-art .gallery__item:nth-child(5) {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery--mosaic-art .gallery__item:hover {
  transform: scale(0.98);
  filter: brightness(0.9);
}

/* 7. Perspective Cards - Cartes 3D */
.gallery--perspective-cards {
  perspective: 1200px;
}

.gallery--perspective-cards .gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  transform-style: preserve-3d;
}

.gallery--perspective-cards .gallery__item {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotateY(var(--rotateY, 0deg)) rotateX(var(--rotateX, 0deg));
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}

.gallery--perspective-cards .gallery__item:hover {
  transform: rotateY(5deg) rotateX(-5deg) translateZ(50px);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
}

/* 8. Split View - Vue divisée */
.gallery--split-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.gallery--split-view .gallery__main {
  position: sticky;
  top: 2rem;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.2);
}

.gallery--split-view .gallery__thumbnails {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.gallery--split-view .gallery__thumbnail {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.7;
}

.gallery--split-view .gallery__thumbnail:hover,
.gallery--split-view .gallery__thumbnail.active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
}

/* ========================================
   ÉLÉMENTS COMMUNS
   ======================================== */

/* Images optimisées */
.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery__item:hover .gallery__image {
  transform: scale(1.1);
}

/* Overlay sophistiqué */
.gallery__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}

.gallery__overlay-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.4s;
}

.gallery__overlay-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  transform: translateY(20px);
  transition: transform 0.4s 0.1s;
}

.gallery__item:hover .gallery__overlay-title,
.gallery__item:hover .gallery__overlay-description {
  transform: translateY(0);
}

/* Badges et tags */
.gallery__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.gallery__badge--new {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

/* Bouton de zoom */
.gallery__zoom {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.2);
}

.gallery__item:hover .gallery__zoom {
  opacity: 1;
  transform: scale(1);
}

.gallery__zoom:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.3);
}

/* ========================================
   LIGHTBOX MAGNIFIQUE
   ======================================== */

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
  transition: all 0.4s;
  backdrop-filter: blur(20px);
}

.gallery__lightbox.active {
  opacity: 1;
  visibility: visible;
}

.gallery__lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  transform: scale(0.8);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery__lightbox.active .gallery__lightbox-content {
  transform: scale(1);
}

.gallery__lightbox-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1rem;
}

.gallery__lightbox-close {
  position: absolute;
  top: -3rem;
  right: 0;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.5rem;
}

.gallery__lightbox-close:hover {
  transform: rotate(90deg) scale(1.1);
}

.gallery__lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.5rem;
}

.gallery__lightbox-prev {
  left: -5rem;
}

.gallery__lightbox-next {
  right: -5rem;
}

.gallery__lightbox-nav:hover {
  transform: translateY(-50%) scale(1.1);
}

/* Info panel */
.gallery__lightbox-info {
  position: absolute;
  bottom: -4rem;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
}

.gallery__lightbox-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.gallery__lightbox-description {
  font-size: 1rem;
  opacity: 0.8;
}

/* ========================================
   FILTRES AVANCÉS
   ======================================== */

.gallery__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.gallery__filter {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.gallery__filter::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery__filter:hover::before,
.gallery__filter.active::before {
  opacity: 1;
}

.gallery__filter span {
  position: relative;
  z-index: 1;
  transition: color 0.3s;
}

.gallery__filter:hover span,
.gallery__filter.active span {
  color: white;
}

/* ========================================
   ANIMATIONS DE CHARGEMENT
   ======================================== */

.gallery__loading {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.gallery__skeleton {
  aspect-ratio: 1;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: galleryShimmer 1.5s infinite;
  border-radius: 1rem;
}

@keyframes galleryShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ========================================
   ANIMATIONS D'ENTRÉE
   ======================================== */

.gallery__item {
  opacity: 0;
  animation: galleryFadeIn 0.8s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.05s);
}

@keyframes galleryFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ========================================
   RESPONSIVE PARFAIT
   ======================================== */

@media (max-width: 1024px) {
  .gallery--split-view {
    grid-template-columns: 1fr;
  }
  
  .gallery--split-view .gallery__main {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .gallery--hexagon-hive .gallery__grid {
    grid-template-columns: repeat(auto-fit, 150px);
  }
  
  .gallery--hexagon-hive .gallery__item {
    width: 150px;
    height: 173px;
  }
}

@media (max-width: 768px) {
  .gallery {
    padding: 4rem 0;
  }
  
  .gallery__container {
    padding: 0 1rem;
  }
  
  .gallery--masonry-flow .gallery__grid {
    columns: 200px auto;
    column-gap: 1rem;
  }
  
  .gallery--carousel-elegant .gallery__item {
    flex: 0 0 300px;
  }
  
  .gallery--mosaic-art .gallery__grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
  }
  
  .gallery__lightbox-nav {
    display: none;
  }
}

/* ========================================
   EFFETS SPECIAUX
   ======================================== */

/* Effet de révélation au scroll */
.gallery--reveal .gallery__item {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery--reveal .gallery__item.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Effet de parallaxe */
.gallery--parallax .gallery__item:nth-child(even) {
  transform: translateY(calc(var(--scroll-y, 0) * 0.1px));
}

.gallery--parallax .gallery__item:nth-child(odd) {
  transform: translateY(calc(var(--scroll-y, 0) * -0.1px));
}

/* ========================================
   THÈME SOMBRE
   ======================================== */

[data-theme="dark"] .gallery {
  background: #0f0f0f;
}

[data-theme="dark"] .gallery__title {
  color: #f9fafb;
}

[data-theme="dark"] .gallery__subtitle {
  color: #9ca3af;
}

[data-theme="dark"] .gallery__filter {
  background: #1f2937;
  color: #e5e7eb;
}

[data-theme="dark"] .gallery__overlay {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.95) 100%
  );
}

/* ========================================
   OPTIMISATIONS PERFORMANCES
   ======================================== */

.gallery__image {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.gallery__item {
  contain: layout style paint;
}

@media (prefers-reduced-motion: reduce) {
  .gallery *,
  .gallery *::before,
  .gallery *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
  }

  getRequiredAssets(): any[] {
    return [];
  }

  render(data: GalleryData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('GalleryRendererV3Perfect', 'render', '🎨 Début du rendu Gallery parfait', {
      variant: data.variant,
      imagesCount: data.images.length
    });

    try {
      const html = `
<section class="gallery gallery--${data.variant} ${data.animation?.reveal ? 'gallery--reveal' : ''} ${data.parallax?.enabled ? 'gallery--parallax' : ''}">
  <div class="gallery__container">
    ${this.renderHeader(data)}
    ${this.renderFilters(data)}
    ${this.renderGallery(data)}
    ${this.renderLightbox(data)}
  </div>
</section>`;

      const css = this.getDefaultCSS() + this.generateDynamicCSS(data);
      const js = this.generateJS(data);

      const result: RenderResult = {
        html: html.trim(),
        css,
        js,
        assets: this.getRequiredAssets(),
        errors: [],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: css.length,
          jsSize: js.length
        }
      };

      logger.info('GalleryRendererV3Perfect', 'render', '✅ Rendu Gallery parfait terminé');
      return result;

    } catch (error) {
      logger.error('GalleryRendererV3Perfect', 'render', '❌ Erreur lors du rendu', error as Error);
      return this.renderFallback(data);
    }
  }

  private renderHeader(data: GalleryData): string {
    if (!data.title && !data.subtitle) return '';

    return `
    <div class="gallery__header">
      ${data.title ? `<h2 class="gallery__title">${data.title}</h2>` : ''}
      ${data.subtitle ? `<p class="gallery__subtitle">${data.subtitle}</p>` : ''}
    </div>`;
  }

  private renderFilters(data: GalleryData): string {
    if (!data.filtering?.enabled || !data.filtering.categories?.length) return '';

    const filters = data.filtering.categories.map(cat => `
      <button class="gallery__filter" data-filter="${cat.id}">
        <span>${cat.label}</span>
      </button>
    `).join('');

    return `
    <div class="gallery__filters">
      ${data.filtering.showAll ? `<button class="gallery__filter active" data-filter="all"><span>${data.filtering.allLabel}</span></button>` : ''}
      ${filters}
    </div>`;
  }

  private renderGallery(data: GalleryData): string {
    switch (data.variant) {
      case 'carousel-elegant':
        return this.renderCarousel(data);
      case 'split-view':
        return this.renderSplitView(data);
      default:
        return this.renderGrid(data);
    }
  }

  private renderGrid(data: GalleryData): string {
    const items = data.images.map((image, index) => this.renderItem(image, index, data)).join('');
    return `<div class="gallery__grid">${items}</div>`;
  }

  private renderCarousel(data: GalleryData): string {
    const items = data.images.map((image, index) => this.renderItem(image, index, data)).join('');
    
    return `
    <div class="gallery__carousel">
      <div class="gallery__track">
        ${items}
      </div>
      <div class="gallery__controls">
        <button class="gallery__control gallery__control--prev">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="gallery__control gallery__control--next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>`;
  }

  private renderSplitView(data: GalleryData): string {
    const mainImage = data.images[0];
    const thumbnails = data.images.map((image, index) => `
      <div class="gallery__thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
        <img src="${image.src}" alt="${image.alt}" class="gallery__image" loading="lazy">
      </div>
    `).join('');

    return `
    <div class="gallery__split">
      <div class="gallery__main">
        <img src="${mainImage.src}" alt="${mainImage.alt}" class="gallery__image gallery__main-image">
      </div>
      <div class="gallery__thumbnails">
        ${thumbnails}
      </div>
    </div>`;
  }

  private renderItem(image: any, index: number, data: GalleryData): string {
    const showOverlay = data.display?.showOverlay && (image.title || image.description);
    const showBadge = data.display?.showBadge && image.badge;
    const showZoom = data.display?.showZoomButton;

    return `
    <div class="gallery__item" style="--index: ${index};" data-category="${image.category || 'all'}">
      <img src="${image.src}" alt="${image.alt}" class="gallery__image" loading="lazy">
      
      ${showOverlay ? `
        <div class="gallery__overlay">
          ${image.title ? `<h3 class="gallery__overlay-title">${image.title}</h3>` : ''}
          ${image.description ? `<p class="gallery__overlay-description">${image.description}</p>` : ''}
        </div>
      ` : ''}
      
      ${showBadge ? `
        <span class="gallery__badge ${image.badge.type === 'new' ? 'gallery__badge--new' : ''}">
          ${image.badge.text}
        </span>
      ` : ''}
      
      ${showZoom ? `
        <button class="gallery__zoom" data-index="${index}" aria-label="Zoom image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      ` : ''}
      
      ${data.variant === 'polaroid-stack' && image.caption ? `
        <div class="gallery__caption">${image.caption}</div>
      ` : ''}
    </div>`;
  }

  private renderLightbox(data: GalleryData): string {
    if (!data.lightbox?.enabled) return '';

    return `
    <div class="gallery__lightbox" role="dialog" aria-label="Image viewer">
      <div class="gallery__lightbox-content">
        <img class="gallery__lightbox-image" alt="">
        <button class="gallery__lightbox-close" aria-label="Close">×</button>
        
        ${data.lightbox.showNavigation ? `
          <button class="gallery__lightbox-nav gallery__lightbox-prev" aria-label="Previous image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="gallery__lightbox-nav gallery__lightbox-next" aria-label="Next image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        ` : ''}
        
        ${data.lightbox.showInfo ? `
          <div class="gallery__lightbox-info">
            <h3 class="gallery__lightbox-title"></h3>
            <p class="gallery__lightbox-description"></p>
          </div>
        ` : ''}
      </div>
    </div>`;
  }

  private generateDynamicCSS(data: GalleryData): string {
    const css: string[] = [];

    // Couleurs personnalisées
    if (data.styles?.colors) {
      css.push(`
.gallery {
  --gallery-primary: ${data.styles.colors.primary || '#667eea'};
  --gallery-accent: ${data.styles.colors.accent || '#764ba2'};
  --gallery-bg: ${data.styles.colors.background || '#ffffff'};
}`);
    }

    // Espacements personnalisés
    if (data.styles?.spacing) {
      css.push(`
.gallery__grid {
  gap: ${data.styles.spacing.gap || '1.5rem'};
}
.gallery {
  padding: ${data.styles.spacing.padding || '6rem 0'};
}`);
    }

    return css.join('\n');
  }

  private generateJS(data: GalleryData): string {
    const js: string[] = [];

    // Lightbox
    if (data.lightbox?.enabled) {
      js.push(this.generateLightboxJS(data));
    }

    // Filtres
    if (data.filtering?.enabled) {
      js.push(this.generateFilterJS());
    }

    // Carousel
    if (data.variant === 'carousel-elegant') {
      js.push(this.generateCarouselJS());
    }

    // Split view
    if (data.variant === 'split-view') {
      js.push(this.generateSplitViewJS());
    }

    // Lazy loading avec animation
    if (data.lazyLoading?.enabled) {
      js.push(this.generateLazyLoadJS());
    }

    // Parallaxe
    if (data.parallax?.enabled) {
      js.push(this.generateParallaxJS());
    }

    // Reveal animation
    if (data.animation?.reveal) {
      js.push(this.generateRevealJS());
    }

    return js.join('\n\n');
  }

  private generateLightboxJS(data: GalleryData): string {
    return `
// Gallery Lightbox V3 Perfect
(function() {
  const lightbox = document.querySelector('.gallery__lightbox');
  const lightboxImage = lightbox?.querySelector('.gallery__lightbox-image');
  const lightboxTitle = lightbox?.querySelector('.gallery__lightbox-title');
  const lightboxDesc = lightbox?.querySelector('.gallery__lightbox-description');
  const closeBtn = lightbox?.querySelector('.gallery__lightbox-close');
  const prevBtn = lightbox?.querySelector('.gallery__lightbox-prev');
  const nextBtn = lightbox?.querySelector('.gallery__lightbox-next');
  
  const images = Array.from(document.querySelectorAll('.gallery__item')).map(item => ({
    src: item.querySelector('.gallery__image')?.src,
    alt: item.querySelector('.gallery__image')?.alt,
    title: item.querySelector('.gallery__overlay-title')?.textContent,
    description: item.querySelector('.gallery__overlay-description')?.textContent
  }));
  
  let currentIndex = 0;
  
  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function updateLightbox() {
    const image = images[currentIndex];
    if (lightboxImage) lightboxImage.src = image.src;
    if (lightboxImage) lightboxImage.alt = image.alt || '';
    if (lightboxTitle) lightboxTitle.textContent = image.title || '';
    if (lightboxDesc) lightboxDesc.textContent = image.description || '';
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }
  
  // Event listeners
  document.querySelectorAll('.gallery__item, .gallery__zoom').forEach((el, index) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = el.dataset.index || index;
      openLightbox(parseInt(idx));
    });
  });
  
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', prevImage);
  nextBtn?.addEventListener('click', nextImage);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape': closeLightbox(); break;
      case 'ArrowLeft': prevImage(); break;
      case 'ArrowRight': nextImage(); break;
    }
  });
  
  // Click outside to close
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Touch gestures for mobile
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  
  lightbox?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  });
})();`;
  }

  private generateFilterJS(): string {
    return `
// Gallery Filters
(function() {
  const filters = document.querySelectorAll('.gallery__filter');
  const items = document.querySelectorAll('.gallery__item');
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
      // Filter items with animation
      items.forEach((item, index) => {
        const itemCategory = item.dataset.category;
        const shouldShow = category === 'all' || itemCategory === category;
        
        if (shouldShow) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
})();`;
  }

  private generateCarouselJS(): string {
    return `
// Gallery Carousel
(function() {
  const track = document.querySelector('.gallery--carousel-elegant .gallery__track');
  const prevBtn = document.querySelector('.gallery__control--prev');
  const nextBtn = document.querySelector('.gallery__control--next');
  
  if (!track) return;
  
  let scrollAmount = 0;
  const scrollStep = 420; // item width + gap
  
  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.style.opacity = scrollAmount <= 0 ? '0.3' : '1';
    nextBtn.style.opacity = scrollAmount >= maxScroll ? '0.3' : '1';
  }
  
  prevBtn?.addEventListener('click', () => {
    scrollAmount = Math.max(0, scrollAmount - scrollStep);
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    updateButtons();
  });
  
  nextBtn?.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    scrollAmount = Math.min(maxScroll, scrollAmount + scrollStep);
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    updateButtons();
  });
  
  // Update on scroll
  track.addEventListener('scroll', () => {
    scrollAmount = track.scrollLeft;
    updateButtons();
  });
  
  // Initial state
  updateButtons();
  
  // Auto-scroll if enabled
  ${data.carousel?.autoplay ? `
  let autoScrollInterval = setInterval(() => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
    } else {
      scrollAmount += scrollStep;
    }
    track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    updateButtons();
  }, ${data.carousel.autoplayDelay || 5000});
  
  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      } else {
        scrollAmount += scrollStep;
      }
      track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      updateButtons();
    }, ${data.carousel.autoplayDelay || 5000});
  });
  ` : ''}
})();`;
  }

  private generateSplitViewJS(): string {
    return `
// Gallery Split View
(function() {
  const mainImage = document.querySelector('.gallery__main-image');
  const thumbnails = document.querySelectorAll('.gallery__thumbnail');
  const images = Array.from(document.querySelectorAll('.gallery__thumbnail img')).map(img => ({
    src: img.src,
    alt: img.alt
  }));
  
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      // Update active thumbnail
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      // Update main image with fade effect
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = images[index].src;
        mainImage.alt = images[index].alt;
        mainImage.style.opacity = '1';
      }, 300);
    });
  });
})();`;
  }

  private generateLazyLoadJS(): string {
    return `
// Lazy Loading with Animation
(function() {
  const images = document.querySelectorAll('.gallery__image[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loading');
        
        img.addEventListener('load', () => {
          img.classList.remove('loading');
          img.classList.add('loaded');
        });
        
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  images.forEach(img => imageObserver.observe(img));
})();`;
  }

  private generateParallaxJS(): string {
    return `
// Gallery Parallax Effect
(function() {
  const gallery = document.querySelector('.gallery--parallax');
  if (!gallery) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrollY = window.scrollY;
    gallery.style.setProperty('--scroll-y', scrollY);
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
})();`;
  }

  private generateRevealJS(): string {
    return `
// Gallery Reveal Animation
(function() {
  const items = document.querySelectorAll('.gallery--reveal .gallery__item');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 50);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  items.forEach(item => revealObserver.observe(item));
})();`;
  }

  private renderFallback(data: GalleryData): RenderResult {
    return {
      html: `
<section class="gallery gallery--fallback">
  <div class="gallery__container">
    <h2>${data.title || 'Galerie'}</h2>
    <div class="gallery__grid">
      ${data.images.map(img => `
        <div class="gallery__item">
          <img src="${img.src}" alt="${img.alt}" loading="lazy">
        </div>
      `).join('')}
    </div>
  </div>
</section>`,
      css: this.getDefaultCSS(),
      js: '',
      assets: [],
      errors: [{
        blockId: 'gallery',
        message: 'Erreur lors du rendu',
        fallbackUsed: true
      }],
      warnings: []
    };
  }

  renderPreview(data: GalleryData): string {
    return `
<div class="gallery-preview gallery--${data.variant}">
  <h3>${data.title || 'Gallery'}</h3>
  <div class="gallery-preview__grid">
    ${data.images.slice(0, 4).map(img => `
      <div class="gallery-preview__item">
        <img src="${img.src}" alt="${img.alt}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 0.5rem;">
      </div>
    `).join('')}
    ${data.images.length > 4 ? `<div class="gallery-preview__more">+${data.images.length - 4}</div>` : ''}
  </div>
</div>`;
  }
}
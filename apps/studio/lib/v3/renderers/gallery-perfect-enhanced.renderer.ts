/**
 * Gallery Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { galleryDataSchema, galleryDefaults, type GalleryData } from '../schemas/blocks/gallery';
import { logger } from '../core/logger';

export class GalleryRendererV3PerfectEnhanced extends BaseRendererV3<GalleryData> {
  type = 'gallery-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('GalleryRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Gallery V3 PERFECT Enhanced');
  }

  validate(data: unknown): z.SafeParseReturnType<GalleryData, GalleryData> {
    return galleryDataSchema.safeParse(data);
  }

  getDefaultData(): GalleryData {
    return {
      ...galleryDefaults,
      variant: 'masonry-flow' as any,
      visualVariant: 'modern' as any
    };
  }

  getBlockProps(): BlockProp[] {
    const baseProps = super.getBlockProps();
    
    // Filter out any existing variant properties to avoid duplicates
    const filteredProps = baseProps.filter(prop => prop.name !== 'variant' && prop.name !== 'visualVariant');
    
    // Add visual variant property at the beginning
    const visualVariantProp: BlockProp = {
      name: 'visualVariant',
      label: 'Style visuel',
      type: PropType.SELECT,
      required: false,
      defaultValue: 'modern',
      description: 'Choisissez le style visuel du bloc',
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
    };

    // Insert visual variant as first property
    return [visualVariantProp, ...filteredProps];
  }

  render(data: GalleryData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    // Extract theme colors and typography
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    const visualVariant = (data as any).visualVariant || 'modern';
    
    logger.info('GalleryRendererV3PerfectEnhanced', 'render', '🎨 Début du rendu Gallery parfait', {
      variant: data.variant,
      visualVariant,
      itemsCount: data.items.length,
      theme: {
        primaryColor,
        secondaryColor,
        fontHeading,
        fontBody
      }
    });

    try {
      const html = `
<section class="gallery gallery--${data.variant} gallery--visual-${visualVariant}">
  <div class="gallery__container">
    ${this.renderHeader(data)}
    ${this.renderFilters(data)}
    ${this.renderGallery(data)}
  </div>
</section>`;

      const css = this.generateCSS(data, theme);
      const js = this.generateJS(data);

      const result: RenderResult = {
        html: html.trim(),
        css,
        js,
        assets: [],
        errors: [],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: css.length,
          jsSize: js.length
        }
      };

      logger.info('GalleryRendererV3PerfectEnhanced', 'render', '✅ Rendu Gallery parfait terminé');
      return result;

    } catch (error) {
      logger.error('GalleryRendererV3PerfectEnhanced', 'render', '❌ Erreur lors du rendu', error as Error);
      return this.renderFallback(data);
    }
  }

  private generateCSS(data: GalleryData, theme?: any): string {
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    
    return `
/* Variables CSS du thème */
:root {
  --gallery-primary: ${primaryColor};
  --gallery-secondary: ${secondaryColor};
  --gallery-font-heading: ${fontHeading};
  --gallery-font-body: ${fontBody};
}

/* ========================================
   GALLERY V3 PERFECT Enhanced - Styles magnifiques
   ======================================== */

.gallery {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  font-family: var(--gallery-font-body);
}

.gallery__container {
  max-width: 1400px;
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
  font-family: var(--gallery-font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  opacity: 0;
  animation: galleryFadeUp 0.8s ease-out 0.2s forwards;
}

.gallery__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
  opacity: 0;
  animation: galleryFadeUp 0.8s ease-out 0.4s forwards;
}

/* ========================================
   VARIANTES VISUELLES
   ======================================== */

/* Modern - Gradient dynamique */
.gallery--visual-modern {
  background: linear-gradient(135deg, rgba(var(--gallery-primary-rgb, 102, 126, 234), 0.05) 0%, rgba(var(--gallery-secondary-rgb, 118, 75, 162), 0.05) 100%);
}

.gallery--visual-modern .gallery__title {
  background: linear-gradient(135deg, var(--gallery-primary), var(--gallery-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gallery--visual-modern .gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery--visual-modern .gallery__item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

.gallery--visual-modern .gallery__overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

/* Minimal - Épuré et rapide */
.gallery--visual-minimal {
  background: #fafafa;
}

.gallery--visual-minimal .gallery__title {
  color: #111;
}

.gallery--visual-minimal .gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: 0;
  transition: all 0.3s ease;
}

.gallery--visual-minimal .gallery__item:hover {
  transform: scale(1.02);
}

.gallery--visual-minimal .gallery__overlay {
  background: rgba(255, 255, 255, 0.9);
  color: #111;
}

/* Bold - Impact visuel fort */
.gallery--visual-bold {
  background: #111;
  color: white;
}

.gallery--visual-bold .gallery__title {
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gallery--visual-bold .gallery__subtitle {
  color: #9ca3af;
}

.gallery--visual-bold .gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #333;
}

.gallery--visual-bold .gallery__item:hover {
  border-color: var(--gallery-primary);
}

.gallery--visual-bold .gallery__overlay {
  background: rgba(0, 0, 0, 0.9);
}

/* Elegant - Glassmorphism subtil */
.gallery--visual-elegant {
  background: #f8f9fa;
  position: relative;
}

.gallery--visual-elegant::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="%23667eea" opacity="0.1"/></svg>');
  background-size: 400px 400px;
  opacity: 0.3;
  pointer-events: none;
}

.gallery--visual-elegant .gallery__title {
  color: #212529;
}

.gallery--visual-elegant .gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  transition: all 0.4s ease;
}

.gallery--visual-elegant .gallery__item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-4px);
}

/* ========================================
   ANIMATIONS
   ======================================== */

@keyframes galleryFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes galleryItemReveal {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ========================================
   LAYOUT DE BASE (toutes variantes)
   ======================================== */

/* Masonry Flow - Layout dynamique */
.gallery--masonry-flow .gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  grid-auto-flow: dense;
}

.gallery--masonry-flow .gallery__item:nth-child(4n+1) {
  grid-row: span 2;
}

.gallery--masonry-flow .gallery__item:nth-child(6n+3) {
  grid-column: span 2;
}

/* Grid Uniform - Grille régulière */
.gallery--grid-uniform .gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Gallery item base */
.gallery__item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  animation: galleryItemReveal 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.05s);
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery__item:hover .gallery__image {
  transform: scale(1.1);
}

/* Overlay */
.gallery__overlay {
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}

.gallery__item-title {
  font-family: var(--gallery-font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.gallery__item-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
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
  padding: 0.5rem 1.25rem;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.gallery__filter:hover {
  background: #e5e7eb;
}

.gallery__filter.active {
  background: white;
  border-color: var(--gallery-primary);
  color: var(--gallery-primary);
  box-shadow: 0 4px 15px -3px rgba(102, 126, 234, 0.2);
}

/* Lightbox */
.gallery__lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.gallery__lightbox.active {
  opacity: 1;
  visibility: visible;
}

.gallery__lightbox-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.gallery__lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.gallery__lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 768px) {
  .gallery {
    padding: 4rem 0;
  }
  
  .gallery__grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
    gap: 1rem !important;
  }
  
  .gallery--masonry-flow .gallery__item:nth-child(4n+1),
  .gallery--masonry-flow .gallery__item:nth-child(6n+3) {
    grid-row: auto;
    grid-column: auto;
  }
}

/* ========================================
   PERFORMANCE
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .gallery *,
  .gallery *::before,
  .gallery *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;
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
    if (!data.filtering?.enabled) return '';

    const categories = [...new Set(data.items.map(item => item.category).filter(Boolean))];
    
    return `
    <div class="gallery__filters">
      <button class="gallery__filter active" data-filter="all">
        ${data.filtering.allLabel || 'Tous'}
      </button>
      ${categories.map(cat => `
        <button class="gallery__filter" data-filter="${cat}">
          ${cat}
        </button>
      `).join('')}
    </div>`;
  }

  private renderGallery(data: GalleryData): string {
    const items = data.items.map((item, index) => `
      <div class="gallery__item" 
           style="--index: ${index};" 
           data-category="${item.category || 'all'}"
           data-id="${item.id}">
        <img src="${item.image.src}" 
             alt="${item.image.alt || ''}" 
             class="gallery__image"
             loading="lazy">
        ${(item.title || item.description) ? `
          <div class="gallery__overlay">
            ${item.title ? `<h3 class="gallery__item-title">${item.title}</h3>` : ''}
            ${item.description ? `<p class="gallery__item-description">${item.description}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `).join('');

    return `
    <div class="gallery__grid">
      ${items}
    </div>
    ${data.lightbox?.enabled ? this.renderLightbox() : ''}`;
  }

  private renderLightbox(): string {
    return `
    <div class="gallery__lightbox" id="gallery-lightbox">
      <button class="gallery__lightbox-close" aria-label="Fermer">×</button>
      <img class="gallery__lightbox-image" src="" alt="">
    </div>`;
  }

  private generateJS(data: GalleryData): string {
    const js: string[] = [];

    // Filters
    if (data.filtering?.enabled) {
      js.push(`
// Gallery filtering
(function() {
  const filters = document.querySelectorAll('.gallery__filter');
  const items = document.querySelectorAll('.gallery__item');
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterValue = filter.dataset.filter;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
      // Filter items
      items.forEach(item => {
        const category = item.dataset.category || 'all';
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
})();`);
    }

    // Lightbox
    if (data.lightbox?.enabled) {
      js.push(`
// Gallery lightbox
(function() {
  const items = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = lightbox?.querySelector('.gallery__lightbox-image');
  const closeBtn = lightbox?.querySelector('.gallery__lightbox-close');
  
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery__image');
      if (lightbox && lightboxImage && img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
      }
    });
  });
  
  closeBtn?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
  });
  
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
})();`);
    }

    return js.join('\n\n');
  }

  private renderFallback(data: GalleryData): RenderResult {
    return {
      html: `
<section class="gallery gallery--fallback">
  <div class="gallery__container">
    <h2>${data.title || 'Galerie'}</h2>
    <div class="gallery__grid">
      ${data.items.map(item => `
        <div class="gallery__item">
          <img src="${item.image.src}" alt="${item.image.alt || ''}">
        </div>
      `).join('')}
    </div>
  </div>
</section>`,
      css: '',
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
    const visualVariant = (data as any).visualVariant || 'modern';
    return `
<div class="gallery-preview gallery--${data.variant} gallery--visual-${visualVariant}">
  <h3>${data.title || 'Gallery'}</h3>
  <div class="gallery-preview__grid">
    ${data.items.slice(0, 4).map(item => `
      <div class="gallery-mini">
        <img src="${item.image.src}" alt="">
      </div>
    `).join('')}
  </div>
</div>`;
  }

  getDefaultCSS(): string {
    // Return empty string as CSS is generated in render method
    return '';
  }

  getRequiredAssets(): any[] {
    return [];
  }
}
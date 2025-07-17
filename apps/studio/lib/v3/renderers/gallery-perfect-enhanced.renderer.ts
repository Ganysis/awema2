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
    // Retourner la structure de données attendue par le schéma
    // mais on va utiliser une structure plate pour l'édition
    return {
      ...galleryDefaults,
      variant: 'masonry-flow' as any,
      visualVariant: 'modern' as any
    };
  }

  getBlockProps(): BlockProp[] {
    // Structure plate pour éviter [object Object]
    const props: BlockProp[] = [
      // Groupe Visuel
      {
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
      },
      {
        name: 'variant',
        label: 'Type de galerie',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'masonry-flow',
        description: 'Choisissez le type d\'affichage de la galerie',
        options: [
          { value: 'masonry-flow', label: '🎭 Masonry - Disposition dynamique' },
          { value: 'grid-uniform', label: '⬜ Grille - Disposition uniforme' },
          { value: 'carousel-fullscreen', label: '🎠 Carrousel - Plein écran' },
          { value: 'instagram-style', label: '📱 Instagram - Style moderne' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Visuel',
          order: 2
        }
      },
      
      // Groupe Contenu
      {
        name: 'title',
        label: 'Titre de la galerie',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Notre Galerie',
        description: 'Titre principal de la galerie',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'subtitle',
        label: 'Sous-titre',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Découvrez nos réalisations',
        description: 'Sous-titre optionnel',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 2
        }
      },
      
      // Images - Structure plate pour l'ergonomie
      // On va gérer jusqu'à 20 images
      ...this.generateImageProps(20),
      
      // Options d'affichage
      {
        name: 'showOverlay',
        label: 'Afficher les informations au survol',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Affiche le titre et la description au survol',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 1
        }
      },
      {
        name: 'enableLightbox',
        label: 'Activer la lightbox',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Permet d\'ouvrir les images en grand',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 2
        }
      },
      {
        name: 'enableFiltering',
        label: 'Activer les filtres',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Permet de filtrer par catégorie',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 3
        }
      },
      {
        name: 'columns_desktop',
        label: 'Colonnes (desktop)',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 3,
        description: 'Nombre de colonnes sur desktop',
        validation: { min: 1, max: 6 },
        editorConfig: {
          control: EditorControl.SLIDER,
          group: 'Layout',
          order: 1
        }
      },
      {
        name: 'columns_tablet',
        label: 'Colonnes (tablette)',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 2,
        description: 'Nombre de colonnes sur tablette',
        validation: { min: 1, max: 4 },
        editorConfig: {
          control: EditorControl.SLIDER,
          group: 'Layout',
          order: 2
        }
      },
      {
        name: 'columns_mobile',
        label: 'Colonnes (mobile)',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 1,
        description: 'Nombre de colonnes sur mobile',
        validation: { min: 1, max: 2 },
        editorConfig: {
          control: EditorControl.SLIDER,
          group: 'Layout',
          order: 3
        }
      },
      {
        name: 'gap',
        label: 'Espacement',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'md',
        description: 'Espace entre les images',
        options: [
          { value: 'none', label: 'Aucun' },
          { value: 'xs', label: 'Très petit' },
          { value: 'sm', label: 'Petit' },
          { value: 'md', label: 'Moyen' },
          { value: 'lg', label: 'Grand' },
          { value: 'xl', label: 'Très grand' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Layout',
          order: 4
        }
      }
    ];
    
    return props;
  }
  
  /**
   * Génère les propriétés pour chaque image de manière plate
   */
  private generateImageProps(count: number): BlockProp[] {
    const props: BlockProp[] = [];
    
    for (let i = 1; i <= count; i++) {
      // Image principale
      props.push({
        name: `image${i}_src`,
        label: `Image ${i}`,
        type: PropType.STRING,
        required: false,
        defaultValue: i <= 6 ? this.getDefaultImage(i) : '',
        description: `URL de l'image ${i}`,
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          group: `Images`,
          order: (i - 1) * 5 + 1,
          condition: i > 1 ? {
            prop: `image${i - 1}_src`
          } : undefined
        }
      });
      
      // Titre de l'image (conditionnel)
      props.push({
        name: `image${i}_title`,
        label: `Titre`,
        type: PropType.STRING,
        required: false,
        defaultValue: '',
        description: `Titre de l'image ${i}`,
        editorConfig: {
          control: EditorControl.TEXT,
          group: `Images`,
          order: (i - 1) * 5 + 2,
          condition: {
            prop: `image${i}_src`
          }
        }
      });
      
      // Description (conditionnel)
      props.push({
        name: `image${i}_description`,
        label: `Description`,
        type: PropType.STRING,
        required: false,
        defaultValue: '',
        description: `Description de l'image ${i}`,
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: `Images`,
          order: (i - 1) * 5 + 3,
          condition: {
            prop: `image${i}_src`
          }
        }
      });
      
      // Catégorie (conditionnel et seulement si filtering activé)
      props.push({
        name: `image${i}_category`,
        label: `Catégorie`,
        type: PropType.SELECT,
        required: false,
        defaultValue: 'all',
        description: `Catégorie de l'image ${i}`,
        options: [
          { value: 'all', label: 'Toutes' },
          { value: 'nature', label: 'Nature' },
          { value: 'architecture', label: 'Architecture' },
          { value: 'portrait', label: 'Portraits' },
          { value: 'workspace', label: 'Espaces' },
          { value: 'product', label: 'Produits' },
          { value: 'event', label: 'Événements' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: `Images`,
          order: (i - 1) * 5 + 4,
          condition: {
            prop: `image${i}_src`,
            values: ['enableFiltering']
          }
        }
      });
      
      // Alt text pour SEO (conditionnel)
      props.push({
        name: `image${i}_alt`,
        label: `Texte alternatif (SEO)`,
        type: PropType.STRING,
        required: false,
        defaultValue: '',
        description: `Texte alternatif pour l'image ${i}`,
        editorConfig: {
          control: EditorControl.TEXT,
          group: `Images`,
          order: (i - 1) * 5 + 5,
          condition: {
            prop: `image${i}_src`
          },
          placeholder: 'Description pour les moteurs de recherche'
        }
      });
    }
    
    return props;
  }
  
  /**
   * Retourne une image par défaut selon l'index
   */
  private getDefaultImage(index: number): string {
    const defaultImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      'https://images.unsplash.com/photo-1494526585095-c41746248156',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e'
    ];
    return defaultImages[index - 1] || '';
  }
  
  /**
   * Extrait les images depuis les données plates
   */
  private extractImages(data: any): any[] {
    const images = [];
    
    for (let i = 1; i <= 20; i++) {
      const src = data[`image${i}_src`];
      if (src) {
        images.push({
          id: `image-${i}`,
          image: {
            src,
            alt: data[`image${i}_alt`] || data[`image${i}_title`] || `Image ${i}`
          },
          title: data[`image${i}_title`] || '',
          description: data[`image${i}_description`] || '',
          category: data[`image${i}_category`] || 'all',
          type: 'image'
        });
      }
    }
    
    return images;
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
    const variant = (data as any).variant || 'masonry-flow';
    
    // Extraire les images depuis la structure plate
    const images = this.extractImages(data);
    
    logger.info('GalleryRendererV3PerfectEnhanced', 'render', '🎨 Début du rendu Gallery parfait', {
      variant,
      visualVariant,
      itemsCount: images.length,
      theme: {
        primaryColor,
        secondaryColor,
        fontHeading,
        fontBody
      }
    });

    try {
      const html = `
<section class="gallery gallery--${variant} gallery--visual-${visualVariant}">
  <div class="gallery__container">
    ${this.renderHeader(data)}
    ${this.renderFilters(data, images)}
    ${this.renderGallery(data, images)}
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

  private generateCSS(data: any, theme?: any): string {
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
  --gap-none: 0;
  --gap-xs: 0.25rem;
  --gap-sm: 0.5rem;
  --gap-md: 1rem;
  --gap-lg: 1.5rem;
  --gap-xl: 2rem;
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

/* Layout de base avec variables dynamiques */
.gallery__grid {
  display: grid;
  gap: var(--gap);
}

/* Masonry Flow - Layout dynamique */
.gallery--masonry-flow .gallery__grid {
  grid-template-columns: repeat(var(--columns-desktop), 1fr);
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
  grid-template-columns: repeat(var(--columns-desktop), 1fr);
}

/* Instagram Style - Carré parfait */
.gallery--instagram-style .gallery__grid {
  grid-template-columns: repeat(var(--columns-desktop), 1fr);
}

.gallery--instagram-style .gallery__item {
  aspect-ratio: 1;
}

.gallery--instagram-style .gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Carousel Fullscreen - Une image à la fois */
.gallery--carousel-fullscreen .gallery__grid {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: var(--gap);
}

.gallery--carousel-fullscreen .gallery__item {
  flex: 0 0 100%;
  scroll-snap-align: start;
  height: 70vh;
}

.gallery--carousel-fullscreen .gallery__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
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

@media (max-width: 1024px) {
  .gallery__grid {
    grid-template-columns: repeat(var(--columns-tablet), 1fr) !important;
  }
  
  .gallery--carousel-fullscreen .gallery__item {
    height: 60vh;
  }
}

@media (max-width: 768px) {
  .gallery {
    padding: 4rem 0;
  }
  
  .gallery__grid {
    grid-template-columns: repeat(var(--columns-mobile), 1fr) !important;
  }
  
  .gallery--masonry-flow .gallery__item:nth-child(4n+1),
  .gallery--masonry-flow .gallery__item:nth-child(6n+3) {
    grid-row: auto;
    grid-column: auto;
  }
  
  .gallery--carousel-fullscreen .gallery__item {
    height: 50vh;
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

  private renderFilters(data: any, images: any[]): string {
    if (!data.enableFiltering) return '';

    const categories = [...new Set(images.map(item => item.category).filter(cat => cat && cat !== 'all'))];
    
    return `
    <div class="gallery__filters">
      <button class="gallery__filter active" data-filter="all">
        Toutes
      </button>
      ${categories.map(cat => `
        <button class="gallery__filter" data-filter="${cat}">
          ${this.getCategoryLabel(cat)}
        </button>
      `).join('')}
    </div>`;
  }
  
  private getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'nature': 'Nature',
      'architecture': 'Architecture',
      'portrait': 'Portraits',
      'workspace': 'Espaces',
      'product': 'Produits',
      'event': 'Événements'
    };
    return labels[category] || category;
  }

  private renderGallery(data: any, images: any[]): string {
    const columnsDesktop = data.columns_desktop || 3;
    const columnsTablet = data.columns_tablet || 2;
    const columnsMobile = data.columns_mobile || 1;
    const gap = data.gap || 'md';
    const showOverlay = data.showOverlay !== false;
    
    const items = images.map((item, index) => `
      <div class="gallery__item" 
           style="--index: ${index};" 
           data-category="${item.category || 'all'}"
           data-id="${item.id}">
        <img src="${item.image.src}" 
             alt="${item.image.alt || ''}" 
             class="gallery__image"
             loading="lazy">
        ${showOverlay && (item.title || item.description) ? `
          <div class="gallery__overlay">
            ${item.title ? `<h3 class="gallery__item-title">${item.title}</h3>` : ''}
            ${item.description ? `<p class="gallery__item-description">${item.description}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `).join('');

    return `
    <div class="gallery__grid" 
         style="--columns-desktop: ${columnsDesktop}; --columns-tablet: ${columnsTablet}; --columns-mobile: ${columnsMobile}; --gap: var(--gap-${gap});">
      ${items}
    </div>
    ${data.enableLightbox !== false ? this.renderLightbox() : ''}`;
  }

  private renderLightbox(): string {
    return `
    <div class="gallery__lightbox" id="gallery-lightbox">
      <button class="gallery__lightbox-close" aria-label="Fermer">×</button>
      <img class="gallery__lightbox-image" src="" alt="">
    </div>`;
  }

  private generateJS(data: any): string {
    const js: string[] = [];

    // Filters
    if (data.enableFiltering) {
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
    if (data.enableLightbox !== false) {
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

  private renderFallback(data: any): RenderResult {
    const images = this.extractImages(data);
    return {
      html: `
<section class="gallery gallery--fallback">
  <div class="gallery__container">
    <h2>${data.title || 'Galerie'}</h2>
    <div class="gallery__grid">
      ${images.map(item => `
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

  renderPreview(data: any): string {
    const visualVariant = data.visualVariant || 'modern';
    const variant = data.variant || 'masonry-flow';
    const images = this.extractImages(data);
    
    return `
<div class="gallery-preview gallery--${variant} gallery--visual-${visualVariant}">
  <h3>${data.title || 'Gallery'}</h3>
  <div class="gallery-preview__grid">
    ${images.slice(0, 4).map(item => `
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
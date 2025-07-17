/**
 * Gallery Renderer V3 SUPREME - Version ultra-ergonomique avec drag & drop
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { galleryDataSchema, galleryDefaults, type GalleryData } from '../schemas/blocks/gallery';
import { logger } from '../core/logger';

export class GalleryRendererV3Supreme extends BaseRendererV3<GalleryData> {
  type = 'gallery-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('GalleryRendererV3Supreme', 'constructor', '🖼️ Initialisation du renderer Gallery V3 SUPREME avec interface ergonomique');
  }

  validate(data: unknown): z.SafeParseReturnType<GalleryData, GalleryData> {
    return galleryDataSchema.safeParse(data);
  }

  getDefaultData(): GalleryData {
    return {
      ...galleryDefaults,
      title: 'Nos Réalisations',
      subtitle: 'Découvrez nos projets récents et laissez-vous inspirer',
      variant: 'masonry-flow',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
          alt: 'Salon moderne avec canapé gris et décoration épurée',
          title: 'Rénovation salon moderne',
          category: 'interior',
          description: 'Transformation complète d\'un salon avec des tons neutres et une ambiance chaleureuse'
        },
        {
          src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
          alt: 'Façade de maison contemporaine avec jardin',
          title: 'Construction maison moderne',
          category: 'exterior',
          description: 'Maison individuelle avec architecture contemporaine et espaces verts'
        },
        {
          src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
          alt: 'Cuisine équipée moderne avec îlot central',
          title: 'Cuisine design avec îlot',
          category: 'kitchen',
          description: 'Cuisine fonctionnelle alliant esthétique et praticité'
        },
        {
          src: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
          alt: 'Salle de bain luxueuse avec douche italienne',
          title: 'Salle de bain contemporaine',
          category: 'bathroom',
          description: 'Espace bien-être avec douche à l\'italienne et finitions haut de gamme'
        },
        {
          src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
          alt: 'Chambre parentale avec tête de lit capitonnée',
          title: 'Suite parentale cosy',
          category: 'bedroom',
          description: 'Chambre apaisante avec mobilier sur mesure et éclairage d\'ambiance'
        },
        {
          src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
          alt: 'Terrasse aménagée avec mobilier de jardin',
          title: 'Aménagement terrasse',
          category: 'garden',
          description: 'Espace extérieur convivial pour profiter des beaux jours'
        },
        {
          src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
          alt: 'Rénovation complète d\'un appartement ancien',
          title: 'Rénovation appartement',
          category: 'renovation',
          description: 'Transformation totale d\'un appartement haussmannien'
        },
        {
          src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop',
          alt: 'Espace commercial moderne et lumineux',
          title: 'Agencement boutique',
          category: 'commercial',
          description: 'Design commercial optimisé pour l\'expérience client'
        }
      ],
      columns: 4,
      columnsTablet: 3,
      columnsMobile: 2,
      gap: 'md',
      enableLightbox: true,
      enableFilters: true,
      showOverlay: true,
      animationStyle: 'fade-up',
      hoverEffect: 'zoom'
    };
  }

  /**
   * Configuration ergonomique avec gestion avancée des images
   */
  getBlockProps(): BlockProp[] {
    return [
      // === GROUPE : Style visuel V3 (standard pour tous les blocs V3) ===
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Style visuel',
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel du bloc',
        options: ['modern', 'minimal', 'bold', 'elegant'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'modern', label: '🎨 Moderne - Gradient dynamique' },
            { value: 'minimal', label: '⚡ Minimaliste - Épuré et rapide' },
            { value: 'bold', label: '🔥 Audacieux - Impact visuel fort' },
            { value: 'elegant', label: '✨ Élégant - Glassmorphism subtil' }
          ],
          group: '🎨 Style',
          order: 1
        }
      },

      // === GROUPE : Mise en page ===
      {
        name: 'variant',
        type: PropType.SELECT,
        label: 'Type de galerie',
        required: false,
        defaultValue: 'masonry-flow',
        description: 'Choisissez la disposition de votre galerie',
        options: ['masonry-flow', 'grid-uniform', 'carousel-fullscreen', 'instagram-style'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'masonry-flow', label: '🌊 Masonry - Style Pinterest fluide' },
            { value: 'grid-uniform', label: '⬜ Grille - Disposition régulière' },
            { value: 'carousel-fullscreen', label: '🎬 Carrousel - Plein écran' },
            { value: 'instagram-style', label: '📱 Instagram - Grille carrée' }
          ],
          group: '📐 Mise en page',
          order: 1
        }
      },

      // === GROUPE : Configuration principale ===
      {
        name: 'title',
        type: PropType.STRING,
        label: 'Titre de la galerie',
        required: false,
        defaultValue: 'Nos Réalisations',
        description: 'Le titre principal de votre galerie',
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'Ex: Nos plus belles réalisations',
          group: '📝 Configuration',
          order: 1
        }
      },

      {
        name: 'subtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        required: false,
        defaultValue: 'Découvrez nos projets récents',
        description: 'Texte descriptif sous le titre',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          placeholder: 'Une brève description de votre galerie...',
          group: '📝 Configuration',
          order: 2
        }
      },

      // === GROUPE : Images avec interface ergonomique ===
      {
        name: 'images',
        type: PropType.ARRAY,
        label: 'Images de la galerie',
        required: false,
        defaultValue: [],
        description: 'Gérez vos images facilement',
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: '🖼️ Images',
          order: 1,
          helpText: 'Ajoutez jusqu\'à 50 images dans votre galerie'
        }
      },

      // === GROUPE : Mise en page ===
      {
        name: 'columns',
        type: PropType.NUMBER,
        label: 'Colonnes (Desktop)',
        required: false,
        defaultValue: 4,
        description: 'Nombre de colonnes sur grand écran',
        validation: { min: 1, max: 6 },
        editorConfig: {
          control: EditorControl.SLIDER,
          group: '📐 Mise en page',
          order: 1
        }
      },

      {
        name: 'columnsTablet',
        type: PropType.NUMBER,
        label: 'Colonnes (Tablette)',
        required: false,
        defaultValue: 3,
        description: 'Nombre de colonnes sur tablette',
        validation: { min: 1, max: 4 },
        editorConfig: {
          control: EditorControl.SLIDER,
          group: '📐 Mise en page',
          order: 2
        }
      },

      {
        name: 'columnsMobile',
        type: PropType.NUMBER,
        label: 'Colonnes (Mobile)',
        required: false,
        defaultValue: 2,
        description: 'Nombre de colonnes sur mobile',
        validation: { min: 1, max: 3 },
        editorConfig: {
          control: EditorControl.SLIDER,
          group: '📐 Mise en page',
          order: 3
        }
      },

      {
        name: 'gap',
        type: PropType.SELECT,
        label: 'Espacement entre images',
        defaultValue: 'md',
        options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'none', label: 'Aucun' },
            { value: 'xs', label: 'Très petit (4px)' },
            { value: 'sm', label: 'Petit (8px)' },
            { value: 'md', label: 'Moyen (16px)' },
            { value: 'lg', label: 'Grand (24px)' },
            { value: 'xl', label: 'Très grand (32px)' }
          ],
          group: '📐 Mise en page',
          order: 4
        }
      },

      {
        name: 'aspectRatio',
        type: PropType.SELECT,
        label: 'Format des images',
        defaultValue: 'auto',
        options: ['auto', 'square', '4:3', '16:9', '3:2', 'portrait'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'auto', label: 'Automatique (conserve les proportions)' },
            { value: 'square', label: 'Carré (1:1)' },
            { value: '4:3', label: 'Standard (4:3)' },
            { value: '16:9', label: 'Cinéma (16:9)' },
            { value: '3:2', label: 'Photo (3:2)' },
            { value: 'portrait', label: 'Portrait (3:4)' }
          ],
          group: '📐 Mise en page',
          order: 5
        }
      },

      // === GROUPE : Filtres ===
      {
        name: 'showFilters',
        type: PropType.BOOLEAN,
        label: 'Afficher les filtres',
        defaultValue: true,
        description: 'Permettre de filtrer les images par catégorie',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '🏷️ Filtres',
          order: 1
        }
      },

      {
        name: 'filterPosition',
        type: PropType.SELECT,
        label: 'Position des filtres',
        defaultValue: 'top',
        options: ['top', 'left', 'right'],
        editorConfig: {
          control: EditorControl.RADIO,
          condition: { prop: 'showFilters', value: true },
          options: [
            { value: 'top', label: '⬆️ En haut' },
            { value: 'left', label: '⬅️ À gauche' },
            { value: 'right', label: '➡️ À droite' }
          ],
          group: '🏷️ Filtres',
          order: 2
        }
      },

      {
        name: 'filterStyle',
        type: PropType.SELECT,
        label: 'Style des filtres',
        defaultValue: 'pills',
        options: ['pills', 'buttons', 'tabs', 'dropdown'],
        editorConfig: {
          control: EditorControl.SELECT,
          condition: { prop: 'showFilters', value: true },
          options: [
            { value: 'pills', label: '💊 Pills - Boutons arrondis' },
            { value: 'buttons', label: '🔲 Boutons - Rectangulaires' },
            { value: 'tabs', label: '📑 Onglets - Style tabs' },
            { value: 'dropdown', label: '📋 Menu déroulant' }
          ],
          group: '🏷️ Filtres',
          order: 3
        }
      },

      {
        name: 'customCategories',
        type: PropType.ARRAY,
        label: 'Catégories personnalisées',
        required: false,
        defaultValue: [],
        description: 'Créez vos propres catégories de filtrage',
        editorConfig: {
          control: EditorControl.COLLECTION,
          condition: { prop: 'showFilters', value: true },
          group: '🏷️ Filtres',
          order: 4,
          helpText: 'Les catégories seront automatiquement détectées depuis vos images'
        }
      },

      {
        name: 'showAllFilter',
        type: PropType.BOOLEAN,
        label: 'Afficher le filtre "Toutes"',
        defaultValue: true,
        description: 'Ajouter un bouton pour afficher toutes les images',
        editorConfig: {
          control: EditorControl.TOGGLE,
          condition: { prop: 'showFilters', value: true },
          group: '🏷️ Filtres',
          order: 5
        }
      },

      {
        name: 'allFilterLabel',
        type: PropType.STRING,
        label: 'Libellé du filtre "Toutes"',
        defaultValue: 'Toutes',
        editorConfig: {
          control: EditorControl.TEXT,
          condition: { prop: 'showAllFilter', value: true },
          placeholder: 'Ex: Toutes les réalisations',
          group: '🏷️ Filtres',
          order: 6
        }
      },

      // === GROUPE : Fonctionnalités ===
      {
        name: 'enableLightbox',
        type: PropType.BOOLEAN,
        label: 'Activer la lightbox',
        defaultValue: true,
        description: 'Ouvrir les images en grand au clic',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '⚙️ Fonctionnalités',
          order: 1
        }
      },

      {
        name: 'lightboxStyle',
        type: PropType.SELECT,
        label: 'Style de lightbox',
        defaultValue: 'modern',
        options: ['modern', 'minimal', 'fullscreen', 'slideshow', 'gallery'],
        editorConfig: {
          control: EditorControl.SELECT,
          condition: { prop: 'enableLightbox', value: true },
          options: [
            { value: 'modern', label: 'Moderne - Avec contrôles élégants' },
            { value: 'minimal', label: 'Minimal - Épuré' },
            { value: 'fullscreen', label: 'Plein écran - Immersif' },
            { value: 'slideshow', label: 'Diaporama - Navigation automatique' },
            { value: 'gallery', label: 'Galerie - Avec vignettes' }
          ],
          group: '⚙️ Fonctionnalités',
          order: 2
        }
      },

      {
        name: 'enableZoom',
        type: PropType.BOOLEAN,
        label: 'Activer le zoom',
        defaultValue: true,
        description: 'Permettre de zoomer sur les images',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '⚙️ Fonctionnalités',
          order: 5
        }
      },

      {
        name: 'zoomLevel',
        type: PropType.NUMBER,
        label: 'Niveau de zoom maximum',
        defaultValue: 3,
        validation: { min: 2, max: 10 },
        editorConfig: {
          control: EditorControl.SLIDER,
          condition: { prop: 'enableZoom', value: true },
          group: '⚙️ Fonctionnalités',
          order: 6
        }
      },

      {
        name: 'enableLazyLoad',
        type: PropType.BOOLEAN,
        label: 'Chargement progressif',
        defaultValue: true,
        description: 'Charger les images au fur et à mesure du scroll',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '⚙️ Fonctionnalités',
          order: 7
        }
      },

      {
        name: 'showOverlay',
        type: PropType.BOOLEAN,
        label: 'Afficher les infos au survol',
        defaultValue: true,
        description: 'Titre et description sur les images',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '⚙️ Fonctionnalités',
          order: 8
        }
      },

      // === GROUPE : Animations ===
      {
        name: 'animationStyle',
        type: PropType.SELECT,
        label: 'Style d\'animation',
        defaultValue: 'fade-up',
        options: ['none', 'fade', 'fade-up', 'scale', 'flip', 'slide'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'none', label: 'Aucune animation' },
            { value: 'fade', label: 'Fondu simple' },
            { value: 'fade-up', label: 'Fondu montant' },
            { value: 'scale', label: 'Zoom progressif' },
            { value: 'flip', label: 'Rotation 3D' },
            { value: 'slide', label: 'Glissement latéral' }
          ],
          group: '✨ Animations',
          order: 1
        }
      },

      {
        name: 'hoverEffect',
        type: PropType.SELECT,
        label: 'Effet au survol',
        defaultValue: 'zoom',
        options: ['none', 'zoom', 'brightness', 'grayscale', 'blur', 'rotate'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'none', label: 'Aucun effet' },
            { value: 'zoom', label: 'Zoom léger' },
            { value: 'brightness', label: 'Éclaircissement' },
            { value: 'grayscale', label: 'Noir et blanc → Couleur' },
            { value: 'blur', label: 'Flou → Net' },
            { value: 'rotate', label: 'Rotation légère' }
          ],
          group: '✨ Animations',
          order: 2
        }
      }
    ];
  }

  render(data: GalleryData, context?: RenderContext): RenderResult {
    try {
      const customData = data as any;
      
      // Extraire le thème
      const theme = context?.theme;
      const colors = {
        primary: theme?.colors?.primary || '#667eea',
        secondary: theme?.colors?.secondary || '#764ba2',
        text: theme?.colors?.text || '#1a202c',
        background: theme?.colors?.background || '#ffffff'
      };
      
      // Convertir les couleurs hex en RGB pour les effets
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '102, 126, 234';
      };

      // Extraire toutes les propriétés
      const props = {
        visualVariant: customData.visualVariant || 'modern',
        variant: customData.variant || 'masonry-flow',
        title: customData.title || 'Nos Réalisations',
        subtitle: customData.subtitle || '',
        images: customData.images || [],
        columns: customData.columns || 4,
        columnsTablet: customData.columnsTablet || 3,
        columnsMobile: customData.columnsMobile || 2,
        gap: customData.gap || 'md',
        aspectRatio: customData.aspectRatio || 'auto',
        enableLightbox: customData.enableLightbox !== false,
        lightboxStyle: customData.lightboxStyle || 'modern',
        showFilters: customData.showFilters !== false,
        filterPosition: customData.filterPosition || 'top',
        filterStyle: customData.filterStyle || 'pills',
        customCategories: customData.customCategories || [],
        showAllFilter: customData.showAllFilter !== false,
        allFilterLabel: customData.allFilterLabel || 'Toutes',
        enableZoom: customData.enableZoom !== false,
        zoomLevel: customData.zoomLevel || 3,
        enableLazyLoad: customData.enableLazyLoad !== false,
        showOverlay: customData.showOverlay !== false,
        animationStyle: customData.animationStyle || 'fade-up',
        hoverEffect: customData.hoverEffect || 'zoom'
      };

      // Générer le HTML
      const html = this.renderGallery(props);
      
      // CSS avec toutes les variantes
      const css = this.getDefaultCSS() + this.generateVariantCSS(props, colors, hexToRgb);
      
      // JavaScript pour les interactions
      const js = this.getDefaultJS(props);

      return {
        html,
        css,
        js,
        assets: [],
        errors: [],
        warnings: []
      };

    } catch (error) {
      logger.error('GalleryRendererV3Supreme', 'render', 'Erreur lors du rendu', error);
      return {
        html: '<div class="gallery-error">Erreur de rendu</div>',
        css: '',
        js: '',
        assets: [],
        errors: [{ 
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          blockId: 'gallery',
          fallbackUsed: false
        }],
        warnings: []
      };
    }
  }

  private renderGallery(props: any): string {
    const {
      visualVariant,
      variant,
      title,
      subtitle,
      images,
      columns,
      gap,
      showFilters,
      filterPosition,
      filterStyle,
      customCategories,
      showAllFilter,
      allFilterLabel,
      showOverlay,
      animationStyle
    } = props;

    // Extraire les catégories
    const categories = showFilters ? this.extractCategories(images, customCategories) : [];

    // Classes CSS
    const galleryClasses = [
      'gallery',
      `gallery--visual-${visualVariant}`,
      `gallery--${variant}`,
      `gallery--gap-${gap}`,
      `gallery--animation-${animationStyle}`,
      showFilters ? `gallery--filters-${filterPosition}` : '',
      showFilters ? `gallery--filter-style-${filterStyle}` : '',
      showOverlay ? 'gallery--has-overlay' : ''
    ].filter(Boolean).join(' ');

    return `
      <section class="${galleryClasses}" data-gallery-variant="${variant}">
        <div class="gallery__container">
          ${title || subtitle ? `
            <div class="gallery__header">
              ${title ? `<h2 class="gallery__title">${this.escapeHtml(title)}</h2>` : ''}
              ${subtitle ? `<p class="gallery__subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
            </div>
          ` : ''}
          
          ${showFilters && categories.length > 0 ? this.renderFilters(categories, props) : ''}
          
          <div class="gallery__wrapper">
            <div class="gallery__grid" data-columns="${columns}">
              ${images.map((image: any, index: number) => this.renderImage(image, index, props)).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderFilters(categories: any[], props: any): string {
    const { filterPosition, filterStyle, showAllFilter, allFilterLabel } = props;
    
    return `
      <div class="gallery__filters gallery__filters--${filterPosition} gallery__filters--style-${filterStyle}">
        ${showAllFilter ? `
          <button class="gallery__filter gallery__filter--active" data-filter="all">
            ${this.escapeHtml(allFilterLabel)}
          </button>
        ` : ''}
        ${categories.map(cat => cat.id !== 'all' ? `
          <button class="gallery__filter" data-filter="${cat.id}">
            ${cat.icon ? `<span class="gallery__filter-icon">${cat.icon}</span>` : ''}
            <span class="gallery__filter-label">${this.escapeHtml(cat.label)}</span>
          </button>
        ` : '').join('')}
      </div>
    `;
  }

  private renderImage(image: any, index: number, props: any): string {
    const { showOverlay, enableLightbox, hoverEffect } = props;
    
    return `
      <div class="gallery__item ${hoverEffect ? `gallery__item--hover-${hoverEffect}` : ''}" 
           data-category="${image.category || 'all'}"
           data-index="${index}">
        <div class="gallery__image-wrapper">
          <img 
            src="${image.src}" 
            alt="${this.escapeHtml(image.alt || `Image ${index + 1}`)}"
            title="${this.escapeHtml(image.title || '')}"
            class="gallery__image"
            loading="${props.enableLazyLoad ? 'lazy' : 'eager'}"
            ${enableLightbox ? 'data-lightbox="gallery"' : ''}
          />
          
          ${showOverlay && (image.title || image.description) ? `
            <div class="gallery__overlay">
              <div class="gallery__overlay-content">
                ${image.title ? `<h3 class="gallery__overlay-title">${this.escapeHtml(image.title)}</h3>` : ''}
                ${image.description ? `<p class="gallery__overlay-description">${this.escapeHtml(image.description)}</p>` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private extractCategories(images: any[], customCategories: any[] = []): any[] {
    const categoriesMap = new Map();
    
    // D'abord ajouter les catégories personnalisées
    customCategories.forEach(cat => {
      if (cat.id) {
        categoriesMap.set(cat.id, {
          id: cat.id,
          label: cat.label || cat.id,
          icon: cat.icon || ''
        });
      }
    });
    
    // Ensuite extraire les catégories des images si pas de catégories personnalisées
    if (customCategories.length === 0) {
      // Catégories par défaut
      const defaultCategories: Record<string, { label: string; icon: string }> = {
        'interior': { label: 'Intérieur', icon: '🛋️' },
        'exterior': { label: 'Extérieur', icon: '🏡' },
        'kitchen': { label: 'Cuisine', icon: '🍳' },
        'bathroom': { label: 'Salle de bain', icon: '🚿' },
        'bedroom': { label: 'Chambre', icon: '🛏️' },
        'living': { label: 'Salon', icon: '🛋️' },
        'garden': { label: 'Jardin', icon: '🌳' },
        'renovation': { label: 'Rénovation', icon: '🔨' },
        'commercial': { label: 'Commercial', icon: '🏢' }
      };
      
      images.forEach(img => {
        if (img.category && img.category !== 'all' && !categoriesMap.has(img.category)) {
          const defaultCat = defaultCategories[img.category];
          categoriesMap.set(img.category, {
            id: img.category,
            label: defaultCat?.label || img.category,
            icon: defaultCat?.icon || ''
          });
        }
      });
    }
    
    return Array.from(categoriesMap.values());
  }

  private generateVariantCSS(props: any, colors: any, hexToRgb: (hex: string) => string): string {
    const { variant, columns, columnsTablet, columnsMobile, gap, aspectRatio } = props;
    
    // Gap values
    const gapValues: Record<string, string> = {
      'none': '0',
      'xs': '0.25rem',
      'sm': '0.5rem',
      'md': '1rem',
      'lg': '1.5rem',
      'xl': '2rem'
    };

    return `
/* ========================================
   GALLERY V3 SUPREME - Variables
   ======================================== */
.gallery {
  --gallery-columns: ${columns};
  --gallery-columns-tablet: ${columnsTablet};
  --gallery-columns-mobile: ${columnsMobile};
  --gallery-gap: ${gapValues[gap] || '1rem'};
  --gallery-primary: ${colors.primary};
  --gallery-secondary: ${colors.secondary};
  --gallery-primary-rgb: ${hexToRgb(colors.primary)};
  --gallery-secondary-rgb: ${hexToRgb(colors.secondary)};
  --gallery-text: ${colors.text};
  --gallery-background: ${colors.background};
  --gallery-border: #e2e8f0;
}

/* Aspect ratios */
${aspectRatio !== 'auto' ? `
.gallery__image-wrapper {
  position: relative;
  overflow: hidden;
  ${aspectRatio === 'square' ? 'aspect-ratio: 1;' : ''}
  ${aspectRatio === '4:3' ? 'aspect-ratio: 4/3;' : ''}
  ${aspectRatio === '16:9' ? 'aspect-ratio: 16/9;' : ''}
  ${aspectRatio === '3:2' ? 'aspect-ratio: 3/2;' : ''}
  ${aspectRatio === 'portrait' ? 'aspect-ratio: 3/4;' : ''}
}

.gallery__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
` : ''}

/* Variant-specific styles */
${this.generateVariantSpecificCSS(variant)}

/* Visual variant styles */
${this.generateVisualVariantCSS(props.visualVariant)}

/* Filter styles */
${this.generateFilterStyles(props.filterStyle)}
    `;
  }

  private generateVariantSpecificCSS(variant: string): string {
    switch (variant) {
      case 'masonry-flow':
        return `
/* Masonry Flow */
.gallery--masonry-flow .gallery__grid {
  column-count: var(--gallery-columns);
  column-gap: var(--gallery-gap);
}

.gallery--masonry-flow .gallery__item {
  break-inside: avoid;
  margin-bottom: var(--gallery-gap);
}

@media (max-width: 1024px) {
  .gallery--masonry-flow .gallery__grid {
    column-count: var(--gallery-columns-tablet);
  }
}

@media (max-width: 640px) {
  .gallery--masonry-flow .gallery__grid {
    column-count: var(--gallery-columns-mobile);
  }
}
        `;

      case 'grid-uniform':
        return `
/* Grid Uniform */
.gallery--grid-uniform .gallery__grid {
  display: grid;
  grid-template-columns: repeat(var(--gallery-columns), 1fr);
  gap: var(--gallery-gap);
}

@media (max-width: 1024px) {
  .gallery--grid-uniform .gallery__grid {
    grid-template-columns: repeat(var(--gallery-columns-tablet), 1fr);
  }
}

@media (max-width: 640px) {
  .gallery--grid-uniform .gallery__grid {
    grid-template-columns: repeat(var(--gallery-columns-mobile), 1fr);
  }
}
        `;

      case 'instagram-style':
        return `
/* Instagram Style */
.gallery--instagram-style .gallery__grid {
  display: grid;
  grid-template-columns: repeat(var(--gallery-columns), 1fr);
  gap: calc(var(--gallery-gap) / 2);
}

.gallery--instagram-style .gallery__image-wrapper {
  aspect-ratio: 1;
  overflow: hidden;
}

.gallery--instagram-style .gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
        `;

      case 'carousel-fullscreen':
        return `
/* Carousel Fullscreen */
.gallery--carousel-fullscreen {
  position: relative;
  overflow: hidden;
}

.gallery--carousel-fullscreen .gallery__grid {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  gap: var(--gallery-gap);
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
  position: relative;
}

.gallery--carousel-fullscreen .gallery__image-wrapper {
  height: 100%;
  width: 100%;
}

.gallery--carousel-fullscreen .gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Navigation pour le carousel */
.gallery--carousel-fullscreen::before,
.gallery--carousel-fullscreen::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery--carousel-fullscreen::before {
  left: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
}

.gallery--carousel-fullscreen::after {
  right: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z'/%3E%3C/svg%3E");
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-width: 768px) {
  .gallery--carousel-fullscreen .gallery__item {
    height: 50vh;
  }
}
        `;

      default:
        return '';
    }
  }

  private generateVisualVariantCSS(visualVariant: string): string {
    switch (visualVariant) {
      case 'modern':
        return `
/* Modern visual style - Gradient dynamique */
.gallery--visual-modern {
  position: relative;
  overflow: hidden;
}

.gallery--visual-modern::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(var(--gallery-primary-rgb, 102, 126, 234), 0.1) 0%,
    transparent 70%
  );
  animation: pulse 20s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
}

.gallery--visual-modern .gallery__title {
  background: linear-gradient(135deg, var(--gallery-primary), var(--gallery-secondary, var(--gallery-primary)));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.gallery--visual-modern .gallery__item {
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.gallery--visual-modern .gallery__item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}

.gallery--visual-modern .gallery__filter--active {
  background: linear-gradient(135deg, var(--gallery-primary), var(--gallery-secondary, var(--gallery-primary)));
  border-color: transparent;
  box-shadow: 0 4px 15px -3px rgba(var(--gallery-primary-rgb, 102, 126, 234), 0.5);
}
        `;

      case 'minimal':
        return `
/* Minimal visual style - Épuré et rapide */
.gallery--visual-minimal .gallery__title {
  font-weight: 300;
  letter-spacing: -0.02em;
  font-size: clamp(2.5rem, 5vw, 4rem);
  background: linear-gradient(to right, var(--gallery-text), var(--gallery-primary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gallery--visual-minimal .gallery__subtitle {
  font-weight: 300;
  opacity: 0.7;
}

.gallery--visual-minimal .gallery__item {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.gallery--visual-minimal .gallery__item:hover {
  border-color: var(--gallery-primary);
}

.gallery--visual-minimal .gallery__image {
  filter: grayscale(20%);
  transition: filter 0.3s ease;
}

.gallery--visual-minimal .gallery__item:hover .gallery__image {
  filter: grayscale(0%);
  transform: scale(1.02);
}

.gallery--visual-minimal .gallery__filter {
  font-weight: 400;
  text-transform: lowercase;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.375rem 1rem;
}

.gallery--visual-minimal .gallery__filter--active {
  border-color: var(--gallery-primary);
  color: var(--gallery-primary);
  background: transparent;
}
        `;

      case 'bold':
        return `
/* Bold visual style - Impact visuel fort */
.gallery--visual-bold {
  background: #0a0a0a;
  color: white;
  position: relative;
}

.gallery--visual-bold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.gallery--visual-bold .gallery__container {
  position: relative;
  z-index: 1;
}

.gallery--visual-bold .gallery__title,
.gallery--visual-bold .gallery__subtitle {
  color: white;
}

.gallery--visual-bold .gallery__title {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  font-size: clamp(3rem, 7vw, 5rem);
}

.gallery--visual-bold .gallery__item {
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery--visual-bold .gallery__item:hover {
  transform: scale(1.05) rotate(-1deg);
  box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.7);
}

.gallery--visual-bold .gallery__filter {
  background: white;
  color: #0a0a0a;
  border: 2px solid white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.gallery--visual-bold .gallery__filter--active {
  background: var(--gallery-primary);
  color: white;
  border-color: var(--gallery-primary);
  transform: scale(1.05);
}
        `;

      case 'elegant':
        return `
/* Elegant visual style - Glassmorphism subtil */
.gallery--visual-elegant {
  position: relative;
  background: linear-gradient(to bottom, #fafafa, #f0f0f0);
}

.gallery--visual-elegant::before {
  content: '';
  position: absolute;
  top: 20%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--gallery-primary) 0%, transparent 70%);
  opacity: 0.1;
  filter: blur(60px);
}

.gallery--visual-elegant .gallery__header {
  text-align: center;
  position: relative;
  z-index: 1;
}

.gallery--visual-elegant .gallery__title {
  font-weight: 400;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--gallery-text);
  position: relative;
  display: inline-block;
}

.gallery--visual-elegant .gallery__title::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: var(--gallery-primary);
}

.gallery--visual-elegant .gallery__item {
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.gallery--visual-elegant .gallery__item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.gallery--visual-elegant .gallery__filter {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--gallery-text);
  transition: all 0.3s ease;
}

.gallery--visual-elegant .gallery__filter--active {
  background: var(--gallery-primary);
  color: white;
  border-color: var(--gallery-primary);
  box-shadow: 0 4px 20px rgba(var(--gallery-primary-rgb, 102, 126, 234), 0.3);
}

.gallery--visual-elegant .gallery__overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
}
        `;

      default:
        return '';
    }
  }

  private generateFilterStyles(filterStyle: string): string {
    switch (filterStyle) {
      case 'pills':
        return `
/* Pills filter style */
.gallery__filters--style-pills .gallery__filter {
  padding: 0.5rem 1.5rem;
  border: 2px solid transparent;
  background: transparent;
  color: var(--gallery-text);
  font-weight: 500;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery__filters--style-pills .gallery__filter:hover {
  border-color: var(--gallery-primary);
  color: var(--gallery-primary);
}

.gallery__filters--style-pills .gallery__filter--active {
  background: var(--gallery-primary);
  color: white;
  border-color: var(--gallery-primary);
}
        `;

      case 'buttons':
        return `
/* Buttons filter style */
.gallery__filters--style-buttons .gallery__filter {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--gallery-border, #e2e8f0);
  background: white;
  color: var(--gallery-text);
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery__filters--style-buttons .gallery__filter:hover {
  border-color: var(--gallery-primary);
  background: rgba(var(--gallery-primary-rgb, 102, 126, 234), 0.1);
}

.gallery__filters--style-buttons .gallery__filter--active {
  background: var(--gallery-primary);
  color: white;
  border-color: var(--gallery-primary);
}
        `;

      case 'tabs':
        return `
/* Tabs filter style */
.gallery__filters--style-tabs {
  border-bottom: 2px solid var(--gallery-border, #e2e8f0);
  gap: 0;
}

.gallery__filters--style-tabs .gallery__filter {
  padding: 1rem 2rem;
  border: none;
  background: transparent;
  color: var(--gallery-text);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.gallery__filters--style-tabs .gallery__filter::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background 0.3s ease;
}

.gallery__filters--style-tabs .gallery__filter:hover {
  color: var(--gallery-primary);
}

.gallery__filters--style-tabs .gallery__filter--active {
  color: var(--gallery-primary);
}

.gallery__filters--style-tabs .gallery__filter--active::after {
  background: var(--gallery-primary);
}
        `;

      case 'dropdown':
        return `
/* Dropdown filter style */
.gallery__filters--style-dropdown {
  position: relative;
  display: inline-block;
}

.gallery__filters--style-dropdown .gallery__filter {
  display: none;
}

.gallery__filters--style-dropdown::before {
  content: 'Filtrer par catégorie';
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--gallery-border, #e2e8f0);
  background: white;
  color: var(--gallery-text);
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
}

/* Note: Dropdown functionality requires JavaScript enhancement */
        `;

      default:
        return '';
    }
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   GALLERY V3 SUPREME - Styles de base
   ======================================== */

.gallery {
  position: relative;
  padding: 5rem 0;
  background: var(--gallery-background);
}

.gallery__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.gallery__header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--gallery-text);
  margin: 0 0 1rem;
}

.gallery__subtitle {
  font-size: 1.125rem;
  color: var(--gallery-text);
  opacity: 0.8;
  margin: 0;
}

/* Filters */
.gallery__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.gallery__filters--top {
  justify-content: center;
}

.gallery__filters--left {
  position: sticky;
  top: 2rem;
  flex-direction: column;
  width: 200px;
  margin-right: 2rem;
  float: left;
}

.gallery__filters--right {
  position: sticky;
  top: 2rem;
  flex-direction: column;
  width: 200px;
  margin-left: 2rem;
  float: right;
}

.gallery__filter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border: 2px solid transparent;
  background: transparent;
  color: var(--gallery-text);
  font-weight: 500;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery__filter-icon {
  font-size: 1.2em;
  line-height: 1;
}

.gallery__filter:hover {
  border-color: var(--gallery-primary);
  color: var(--gallery-primary);
}

.gallery__filter--active {
  background: var(--gallery-primary);
  color: white;
  border-color: var(--gallery-primary);
}

/* Images */
.gallery__item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery__image-wrapper {
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
}

.gallery__image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

/* Hover Effects */
.gallery__item--hover-zoom:hover .gallery__image {
  transform: scale(1.1);
}

.gallery__item--hover-brightness .gallery__image {
  filter: brightness(0.8);
  transition: filter 0.3s ease;
}

.gallery__item--hover-brightness:hover .gallery__image {
  filter: brightness(1);
}

.gallery__item--hover-grayscale .gallery__image {
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.gallery__item--hover-grayscale:hover .gallery__image {
  filter: grayscale(0%);
}

/* Overlay */
.gallery__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}

.gallery__overlay-content {
  color: white;
}

.gallery__overlay-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.gallery__overlay-description {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
}

/* Animations */
.gallery--animation-fade-up .gallery__item {
  opacity: 0;
  transform: translateY(20px);
  animation: galleryFadeUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s);
}

@keyframes galleryFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .gallery__container {
    padding: 0 1rem;
  }
  
  .gallery__filters--left {
    position: static;
    width: 100%;
    flex-direction: row;
    margin-right: 0;
    margin-bottom: 2rem;
    float: none;
  }
}
    `;
  }

  getDefaultJS(props: any): string {
    return `
// Gallery V3 Supreme - JavaScript
(function() {
  'use strict';
  
  class GalleryV3Supreme {
    constructor() {
      this.init();
    }
    
    init() {
      this.initFilters();
      this.initLightbox();
      this.initAnimations();
      this.initLazyLoad();
      this.initCarousel();
    }
    
    // Filtres par catégorie
    initFilters() {
      const filters = document.querySelectorAll('.gallery__filter');
      const items = document.querySelectorAll('.gallery__item');
      
      filters.forEach(filter => {
        filter.addEventListener('click', () => {
          const category = filter.dataset.filter;
          
          // Update active state
          filters.forEach(f => f.classList.remove('gallery__filter--active'));
          filter.classList.add('gallery__filter--active');
          
          // Filter items
          items.forEach((item, index) => {
            const itemCategory = item.dataset.category || 'all';
            const shouldShow = category === 'all' || itemCategory === category;
            
            item.style.display = shouldShow ? '' : 'none';
            
            // Re-apply animations
            if (shouldShow) {
              item.style.setProperty('--index', index);
            }
          });
        });
      });
    }
    
    // Lightbox
    initLightbox() {
      const lightboxEnabled = ${props.enableLightbox};
      if (!lightboxEnabled) return;
      
      const images = document.querySelectorAll('[data-lightbox="gallery"]');
      
      images.forEach(img => {
        img.addEventListener('click', (e) => {
          e.preventDefault();
          this.openLightbox(img.src, img.alt);
        });
      });
    }
    
    openLightbox(src, alt) {
      // Créer la lightbox (simplifiée pour la démo)
      const lightbox = document.createElement('div');
      lightbox.className = 'gallery-lightbox';
      lightbox.innerHTML = \`
        <div class="gallery-lightbox__overlay"></div>
        <div class="gallery-lightbox__content">
          <img src="\${src}" alt="\${alt}" />
          <button class="gallery-lightbox__close">&times;</button>
        </div>
      \`;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Fermer la lightbox
      lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-lightbox__overlay') || 
            e.target.classList.contains('gallery-lightbox__close')) {
          lightbox.remove();
          document.body.style.overflow = '';
        }
      });
    }
    
    // Animations
    initAnimations() {
      const items = document.querySelectorAll('.gallery__item');
      
      items.forEach((item, index) => {
        item.style.setProperty('--index', index);
      });
    }
    
    // Lazy loading natif
    initLazyLoad() {
      if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        return;
      }
      
      // Fallback pour les anciens navigateurs
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
    
    // Carousel navigation
    initCarousel() {
      const carousel = document.querySelector('.gallery--carousel-fullscreen');
      if (!carousel) return;
      
      const grid = carousel.querySelector('.gallery__grid');
      if (!grid) return;
      
      // Navigation avec les flèches
      carousel.addEventListener('click', (e) => {
        const target = e.target;
        const rect = carousel.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        
        if (clickX < width * 0.3) {
          // Clic sur la partie gauche - précédent
          grid.scrollBy({ left: -grid.offsetWidth, behavior: 'smooth' });
        } else if (clickX > width * 0.7) {
          // Clic sur la partie droite - suivant
          grid.scrollBy({ left: grid.offsetWidth, behavior: 'smooth' });
        }
      });
      
      // Navigation au clavier
      document.addEventListener('keydown', (e) => {
        if (!carousel.matches(':hover')) return;
        
        if (e.key === 'ArrowLeft') {
          grid.scrollBy({ left: -grid.offsetWidth, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
          grid.scrollBy({ left: grid.offsetWidth, behavior: 'smooth' });
        }
      });
    }
  }
  
  // CSS pour la lightbox
  const style = document.createElement('style');
  style.textContent = \`
    .gallery-lightbox {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .gallery-lightbox__overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
    }
    
    .gallery-lightbox__content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }
    
    .gallery-lightbox__content img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
    }
    
    .gallery-lightbox__close {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 3rem;
      cursor: pointer;
      padding: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  \`;
  document.head.appendChild(style);
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GalleryV3Supreme());
  } else {
    new GalleryV3Supreme();
  }
})();
    `;
  }

  private escapeHtml(text: string): string {
    if (!text) return '';
    
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };
    
    return text.replace(/[&<>"'\/]/g, (char) => escapeMap[char] || char);
  }

  renderPreview(data: GalleryData): string {
    return this.render(data).html;
  }

  getRequiredAssets(): any[] {
    return [];
  }
}

export const galleryRendererV3Supreme = new GalleryRendererV3Supreme();
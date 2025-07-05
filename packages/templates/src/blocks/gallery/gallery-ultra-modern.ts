import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Gallery Ultra-Moderne - Système de galerie révolutionnaire
 * Lightbox pro, filtres dynamiques, zoom, lazy loading, support 360°
 */
export const galleryUltraModern: Block = {
  id: 'gallery-ultra-modern',
  name: 'Gallery Ultra-Moderne',
  description: 'Galerie professionnelle avec lightbox avancé, filtres, zoom, lazy loading et support 360°',
  category: BlockCategory.GALLERY,
  tags: ['gallery', 'lightbox', 'filters', '360', 'zoom', 'modern'],
  thumbnail: '/blocks/gallery-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.HIGH,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel',
      defaultValue: 'masonry-flow',
      required: true,
      validation: {
        options: [
          { label: 'Masonry Flow', value: 'masonry-flow' },
          { label: 'Infinite Grid', value: 'infinite-grid' },
          { label: 'Hexagon Hive', value: 'hexagon-hive' },
          { label: 'Polaroid Stack', value: 'polaroid-stack' },
          { label: 'Metro Tiles', value: 'metro-tiles' },
          { label: 'Cinema Strip', value: 'cinema-strip' },
          { label: 'Diamond Grid', value: 'diamond-grid' },
          { label: 'Spiral Gallery', value: 'spiral-gallery' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 1
      }
    },
    {
      name: 'lightboxStyle',
      type: PropType.STRING,
      description: 'Style du lightbox',
      defaultValue: 'immersive',
      required: true,
      validation: {
        options: [
          { label: 'Immersif plein écran', value: 'immersive' },
          { label: 'Modal élégant', value: 'elegant-modal' },
          { label: 'Slide cinéma', value: 'cinema-slide' },
          { label: 'Zoom focus', value: 'zoom-focus' },
          { label: 'Gallery flow', value: 'gallery-flow' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Lightbox',
        order: 2
      }
    },
    {
      name: 'enableFilters',
      type: PropType.BOOLEAN,
      description: 'Activer les filtres',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 3
      }
    },
    {
      name: 'filterAnimation',
      type: PropType.STRING,
      description: 'Animation des filtres',
      defaultValue: 'morphing',
      required: false,
      validation: {
        options: [
          { label: 'Morphing fluide', value: 'morphing' },
          { label: 'Fade élégant', value: 'fade' },
          { label: 'Flip 3D', value: 'flip-3d' },
          { label: 'Scale bounce', value: 'scale-bounce' },
          { label: 'Particles', value: 'particles' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Fonctionnalités',
        order: 4,
        condition: { prop: 'enableFilters', value: true }
      }
    },
    {
      name: 'enable360',
      type: PropType.BOOLEAN,
      description: 'Support images 360°',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 5,
        helpText: 'Permet d\'afficher des images 360° interactives'
      }
    },
    {
      name: 'enableZoom',
      type: PropType.BOOLEAN,
      description: 'Zoom haute résolution',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 6
      }
    },
    {
      name: 'zoomLevel',
      type: PropType.NUMBER,
      description: 'Niveau de zoom max',
      defaultValue: 3,
      required: false,
      validation: {
        min: 2,
        max: 10
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Fonctionnalités',
        order: 7,
        condition: { prop: 'enableZoom', value: true }
      }
    },
    {
      name: 'enableLazyLoad',
      type: PropType.BOOLEAN,
      description: 'Chargement progressif',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Performance',
        order: 8,
        helpText: 'Améliore les performances en chargeant les images à la demande'
      }
    },
    {
      name: 'enableVideoSupport',
      type: PropType.BOOLEAN,
      description: 'Support vidéos',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 9
      }
    },
    {
      name: 'columnsDesktop',
      type: PropType.NUMBER,
      description: 'Colonnes (desktop)',
      defaultValue: 4,
      required: false,
      validation: {
        min: 2,
        max: 6
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 10
      }
    },
    {
      name: 'columnsTablet',
      type: PropType.NUMBER,
      description: 'Colonnes (tablette)',
      defaultValue: 3,
      required: false,
      validation: {
        min: 1,
        max: 4
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 11
      }
    },
    {
      name: 'columnsMobile',
      type: PropType.NUMBER,
      description: 'Colonnes (mobile)',
      defaultValue: 2,
      required: false,
      validation: {
        min: 1,
        max: 3
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 12
      }
    },
    {
      name: 'aspectRatio',
      type: PropType.STRING,
      description: 'Ratio des images',
      defaultValue: 'auto',
      required: false,
      validation: {
        options: [
          { label: 'Auto (original)', value: 'auto' },
          { label: 'Carré (1:1)', value: '1:1' },
          { label: 'Paysage (16:9)', value: '16:9' },
          { label: 'Portrait (3:4)', value: '3:4' },
          { label: 'Cinéma (21:9)', value: '21:9' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Layout',
        order: 13
      }
    },
    {
      name: 'gap',
      type: PropType.NUMBER,
      description: 'Espacement (px)',
      defaultValue: 16,
      required: false,
      validation: {
        min: 0,
        max: 50
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 14
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      defaultValue: 'Nos Réalisations',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 15
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Découvrez nos projets récents et laissez-vous inspirer',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 16
      }
    },
    {
      name: 'images',
      type: PropType.ARRAY,
      description: 'Images de la galerie (chaque image doit avoir une propriété "category" correspondant à un id de catégorie)',
      defaultValue: [
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
          title: 'Intérieur moderne',
          category: 'interior',
          description: 'Rénovation complète d\'un salon contemporain',
          tags: ['moderne', 'salon', 'rénovation'],
          is360: false,
          videoUrl: '',
          width: 800,
          height: 600
        },
        {
          url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1200&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=600&fit=crop',
          title: 'Façade élégante',
          category: 'exterior',
          description: 'Restauration d\'une façade historique',
          tags: ['façade', 'restauration', 'historique'],
          is360: false,
          videoUrl: '',
          width: 800,
          height: 1200
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
          title: 'Cuisine design',
          category: 'interior',
          description: 'Cuisine moderne avec îlot central',
          tags: ['cuisine', 'moderne', 'design'],
          is360: false,
          videoUrl: '',
          width: 1200,
          height: 800
        },
        {
          url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
          title: 'Jardin paysager',
          category: 'exterior',
          description: 'Aménagement paysager complet',
          tags: ['jardin', 'paysager', 'extérieur'],
          is360: false,
          videoUrl: '',
          width: 800,
          height: 800
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&h=667&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&h=334&fit=crop',
          title: 'Salle de bain luxe',
          category: 'interior',
          description: 'Salle de bain spa avec finitions haut de gamme',
          tags: ['salle de bain', 'luxe', 'spa'],
          is360: false,
          videoUrl: '',
          width: 1000,
          height: 667
        },
        {
          url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=1000&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=500&fit=crop',
          title: 'Terrasse aménagée',
          category: 'exterior',
          description: 'Terrasse extérieure avec mobilier design',
          tags: ['terrasse', 'extérieur', 'design'],
          is360: false,
          videoUrl: '',
          width: 800,
          height: 1000
        }
      ],
      required: true,
      validation: {
        min: 1,
        max: 50
      },
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Contenu',
        order: 17
      }
    },
    {
      name: 'categories',
      type: PropType.ARRAY,
      description: 'Catégories de filtrage',
      defaultValue: [
        { id: 'all', label: 'Toutes', icon: 'grid' },
        { id: 'interior', label: 'Intérieur', icon: 'home' },
        { id: 'exterior', label: 'Extérieur', icon: 'trees' },
        { id: 'renovation', label: 'Rénovation', icon: 'hammer' },
        { id: 'construction', label: 'Construction', icon: 'building' }
      ],
      required: false,
      validation: {
        min: 2,
        max: 10
      },
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Filtres',
        order: 18,
        condition: { prop: 'enableFilters', value: true },
        helpText: 'Les catégories doivent correspondre aux valeurs "category" dans vos images. Ex: si une image a category: "interior", créez une catégorie avec id: "interior"'
      }
    },
    {
      name: 'enableDownload',
      type: PropType.BOOLEAN,
      description: 'Permettre le téléchargement',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 19
      }
    },
    {
      name: 'enableShare',
      type: PropType.BOOLEAN,
      description: 'Boutons de partage',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 20
      }
    },
    {
      name: 'enableFullscreen',
      type: PropType.BOOLEAN,
      description: 'Mode plein écran',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 21
      }
    },
    {
      name: 'enableThumbnails',
      type: PropType.BOOLEAN,
      description: 'Vignettes dans lightbox',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Lightbox',
        order: 22
      }
    },
    {
      name: 'autoplaySpeed',
      type: PropType.NUMBER,
      description: 'Vitesse autoplay (sec)',
      defaultValue: 5,
      required: false,
      validation: {
        min: 2,
        max: 10
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Lightbox',
        order: 23,
        helpText: '0 pour désactiver l\'autoplay'
      }
    },
    {
      name: 'loadingAnimation',
      type: PropType.STRING,
      description: 'Animation de chargement',
      defaultValue: 'skeleton',
      required: false,
      validation: {
        options: [
          { label: 'Skeleton', value: 'skeleton' },
          { label: 'Blur progressif', value: 'blur' },
          { label: 'Fade in', value: 'fade' },
          { label: 'Scale up', value: 'scale' },
          { label: 'Shimmer', value: 'shimmer' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Performance',
        order: 24,
        condition: { prop: 'enableLazyLoad', value: true }
      }
    }
  ]
};

export function renderGalleryUltraModern(props: any, variants: string[] = []): RenderedBlock {
  const {
    variant = 'masonry-flow',
    lightboxStyle = 'immersive',
    enableFilters = true,
    filterAnimation = 'morphing',
    enable360 = false,
    enableZoom = true,
    zoomLevel = 3,
    enableLazyLoad = true,
    enableVideoSupport = true,
    columnsDesktop = 4,
    columnsTablet = 3,
    columnsMobile = 2,
    aspectRatio = 'auto',
    gap = 16,
    title = 'Nos Réalisations',
    subtitle = 'Découvrez nos projets récents et laissez-vous inspirer',
    images = [],
    categories = [],
    enableDownload = false,
    enableShare = true,
    enableFullscreen = true,
    enableThumbnails = true,
    autoplaySpeed = 5,
    loadingAnimation = 'skeleton'
  } = props;

  const themeColors = props.themeColors || {
    primary: '#667eea',
    'primary-hover': '#5a67d8',
    secondary: '#48bb78',
    background: '#ffffff',
    text: '#2d3748',
    border: '#e2e8f0'
  };

  // Composants de base partagés
  const filterButtons = enableFilters ? `
    <div class="gallery-filters ${filterAnimation}" data-filter-animation="${filterAnimation}">
      ${categories.map((cat: any) => `
        <button 
          class="filter-btn ${cat.id === 'all' ? 'active' : ''}" 
          data-filter="${cat.id}"
          aria-label="Filtrer par ${cat.label}"
        >
          ${cat.icon ? `<i class="icon-${cat.icon}"></i>` : ''}
          <span>${cat.label}</span>
          <span class="count" data-count="${cat.id}">0</span>
        </button>
      `).join('')}
    </div>
  ` : '';

  const galleryItem = (img: any, index: number) => {
    const isVideo = img.videoUrl && enableVideoSupport;
    const is360Image = img.is360 && enable360;
    
    return `
      <div class="gallery-item ${loadingAnimation}" 
           data-category="${img.category || 'all'}"
           data-index="${index}"
           ${is360Image ? 'data-360="true"' : ''}
           ${isVideo ? 'data-video="true"' : ''}
      >
        <div class="gallery-item-inner">
          ${enableLazyLoad ? `
            <div class="lazy-placeholder ${loadingAnimation}"></div>
            <img 
              class="gallery-image lazy" 
              data-src="${img.thumbnail || img.url}"
              alt="${img.title}"
              width="${img.width || 800}"
              height="${img.height || 600}"
            />
          ` : `
            <img 
              class="gallery-image" 
              src="${img.thumbnail || img.url}"
              alt="${img.title}"
              width="${img.width || 800}"
              height="${img.height || 600}"
            />
          `}
          
          <div class="gallery-overlay">
            <div class="overlay-content">
              ${img.title ? `<h3 class="item-title">${img.title}</h3>` : ''}
              ${img.description ? `<p class="item-description">${img.description}</p>` : ''}
              
              <div class="item-actions">
                <button class="action-btn view-btn" aria-label="Voir en grand">
                  ${isVideo ? '<i class="icon-play"></i>' : '<i class="icon-expand"></i>'}
                </button>
                ${enableZoom && !isVideo ? `
                  <button class="action-btn zoom-btn" aria-label="Zoom">
                    <i class="icon-zoom-in"></i>
                  </button>
                ` : ''}
                ${is360Image ? `
                  <button class="action-btn rotate-360-btn" aria-label="Vue 360°">
                    <i class="icon-360"></i>
                  </button>
                ` : ''}
              </div>
            </div>
            
            ${img.tags && img.tags.length > 0 ? `
              <div class="item-tags">
                ${img.tags.map((tag: string) => `
                  <span class="tag">${tag}</span>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          ${isVideo ? `
            <div class="video-indicator">
              <i class="icon-video"></i>
            </div>
          ` : ''}
          
          ${is360Image ? `
            <div class="360-indicator">
              <i class="icon-360"></i>
              <span>360°</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Lightbox HTML
  const lightboxHtml = `
    <div class="gallery-lightbox ${lightboxStyle}" id="gallery-lightbox" aria-hidden="true">
      <div class="lightbox-backdrop"></div>
      
      <div class="lightbox-container">
        <div class="lightbox-header">
          <div class="lightbox-info">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-description"></p>
          </div>
          
          <div class="lightbox-controls">
            ${enableShare ? `
              <button class="control-btn share-btn" aria-label="Partager">
                <i class="icon-share"></i>
              </button>
            ` : ''}
            ${enableDownload ? `
              <button class="control-btn download-btn" aria-label="Télécharger">
                <i class="icon-download"></i>
              </button>
            ` : ''}
            ${enableFullscreen ? `
              <button class="control-btn fullscreen-btn" aria-label="Plein écran">
                <i class="icon-maximize"></i>
              </button>
            ` : ''}
            <button class="control-btn close-btn" aria-label="Fermer">
              <i class="icon-x"></i>
            </button>
          </div>
        </div>
        
        <div class="lightbox-content">
          <button class="nav-btn prev-btn" aria-label="Image précédente">
            <i class="icon-chevron-left"></i>
          </button>
          
          <div class="lightbox-stage">
            <div class="lightbox-loader">
              <div class="loader-spinner"></div>
            </div>
            
            <img class="lightbox-image" alt="" />
            
            ${enableVideoSupport ? `
              <div class="lightbox-video-container">
                <iframe class="lightbox-video" frameborder="0" allowfullscreen></iframe>
              </div>
            ` : ''}
            
            ${enable360 ? `
              <div class="lightbox-360-container">
                <canvas class="lightbox-360-canvas"></canvas>
                <div class="lightbox-360-controls">
                  <button class="360-play-btn"><i class="icon-play"></i></button>
                  <div class="360-progress"></div>
                </div>
              </div>
            ` : ''}
            
            ${enableZoom ? `
              <div class="zoom-controls">
                <button class="zoom-in-btn"><i class="icon-plus"></i></button>
                <input type="range" class="zoom-slider" min="1" max="${zoomLevel}" step="0.1" value="1" />
                <button class="zoom-out-btn"><i class="icon-minus"></i></button>
                <button class="zoom-reset-btn">100%</button>
              </div>
            ` : ''}
          </div>
          
          <button class="nav-btn next-btn" aria-label="Image suivante">
            <i class="icon-chevron-right"></i>
          </button>
        </div>
        
        ${enableThumbnails ? `
          <div class="lightbox-thumbnails">
            <div class="thumbnails-track">
              ${images.map((img: any, i: number) => `
                <button class="thumbnail-item ${i === 0 ? 'active' : ''}" 
                        data-index="${i}"
                        aria-label="Voir ${img.title || `image ${i + 1}`}">
                  <img src="${img.thumbnail || img.url}" alt="${img.title || ''}" />
                  ${img.videoUrl ? '<i class="icon-play-circle"></i>' : ''}
                  ${img.is360 ? '<i class="icon-360"></i>' : ''}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      
      ${enableShare ? `
        <div class="share-modal" aria-hidden="true">
          <div class="share-modal-content">
            <h4>Partager cette image</h4>
            <div class="share-buttons">
              <button class="share-facebook"><i class="icon-facebook"></i> Facebook</button>
              <button class="share-twitter"><i class="icon-twitter"></i> Twitter</button>
              <button class="share-pinterest"><i class="icon-pinterest"></i> Pinterest</button>
              <button class="share-link"><i class="icon-link"></i> Copier le lien</button>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Styles spécifiques par variante
  const variantStyles: Record<string, string> = {
    'masonry-flow': `
      .gallery-grid {
        column-count: ${columnsDesktop};
        column-gap: ${gap}px;
      }
      
      .gallery-item {
        break-inside: avoid;
        margin-bottom: ${gap}px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .gallery-item:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }
      
      @media (max-width: 1024px) {
        .gallery-grid { column-count: ${columnsTablet}; }
      }
      
      @media (max-width: 640px) {
        .gallery-grid { column-count: ${columnsMobile}; }
      }
    `,
    
    'infinite-grid': `
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(${columnsDesktop}, 1fr);
        gap: ${gap}px;
        position: relative;
      }
      
      .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        aspect-ratio: ${aspectRatio === 'auto' ? 'auto' : aspectRatio.replace(':', '/')};
      }
      
      .gallery-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, 
          ${themeColors.primary}20 0%, 
          transparent 50%,
          ${themeColors.secondary}20 100%
        );
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .gallery-item:hover::before {
        opacity: 1;
      }
      
      @media (max-width: 1024px) {
        .gallery-grid { grid-template-columns: repeat(${columnsTablet}, 1fr); }
      }
      
      @media (max-width: 640px) {
        .gallery-grid { grid-template-columns: repeat(${columnsMobile}, 1fr); }
      }
    `,
    
    'hexagon-hive': `
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(${columnsDesktop}, 1fr);
        gap: ${gap}px;
        padding: 40px 0;
      }
      
      .gallery-item {
        position: relative;
        padding-top: 115.47%; /* Hexagon ratio */
        clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        transition: all 0.3s ease;
      }
      
      .gallery-item-inner {
        position: absolute;
        inset: 0;
      }
      
      .gallery-item:nth-child(even) {
        margin-top: -57.735%;
      }
      
      .gallery-item:hover {
        transform: scale(1.1);
        z-index: 10;
      }
      
      @media (max-width: 1024px) {
        .gallery-grid { grid-template-columns: repeat(${columnsTablet}, 1fr); }
      }
      
      @media (max-width: 640px) {
        .gallery-grid { grid-template-columns: repeat(${columnsMobile}, 1fr); }
        .gallery-item { clip-path: none; padding-top: 100%; }
        .gallery-item:nth-child(even) { margin-top: 0; }
      }
    `,
    
    'polaroid-stack': `
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: ${gap * 2}px;
        padding: 40px;
      }
      
      .gallery-item {
        background: white;
        padding: 10px 10px 60px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: rotate(${Math.random() * 6 - 3}deg);
        transition: all 0.3s ease;
        position: relative;
      }
      
      .gallery-item::after {
        content: attr(data-title);
        position: absolute;
        bottom: 15px;
        left: 15px;
        right: 15px;
        text-align: center;
        font-family: 'Permanent Marker', cursive;
        color: #444;
        font-size: 16px;
      }
      
      .gallery-item:hover {
        transform: rotate(0deg) scale(1.05);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        z-index: 10;
      }
      
      .gallery-image {
        width: 100%;
        height: auto;
        display: block;
      }
    `,
    
    'metro-tiles': `
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 200px;
        gap: ${gap}px;
      }
      
      .gallery-item:nth-child(5n+1) {
        grid-column: span 2;
        grid-row: span 2;
      }
      
      .gallery-item:nth-child(5n+4) {
        grid-row: span 2;
      }
      
      .gallery-item {
        position: relative;
        overflow: hidden;
        background: ${themeColors.primary}10;
        transition: all 0.3s ease;
      }
      
      .gallery-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, 
          ${themeColors.primary} 0%, 
          transparent 100%
        );
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .gallery-item:hover::before {
        opacity: 0.9;
      }
      
      @media (max-width: 1024px) {
        .gallery-grid { 
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 150px;
        }
      }
      
      @media (max-width: 640px) {
        .gallery-grid { 
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 120px;
        }
        .gallery-item:nth-child(5n+1),
        .gallery-item:nth-child(5n+4) {
          grid-column: span 1;
          grid-row: span 1;
        }
      }
    `,
    
    'cinema-strip': `
      .gallery-wrapper {
        background: #000;
        padding: 40px 0;
        position: relative;
        overflow: hidden;
      }
      
      .gallery-wrapper::before,
      .gallery-wrapper::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 30px;
        background-image: repeating-linear-gradient(
          90deg,
          transparent,
          transparent 20px,
          #333 20px,
          #333 40px
        );
        z-index: 10;
      }
      
      .gallery-wrapper::before { top: 0; }
      .gallery-wrapper::after { bottom: 0; }
      
      .gallery-grid {
        display: flex;
        gap: ${gap}px;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: 0 20px;
      }
      
      .gallery-item {
        flex: 0 0 300px;
        height: 400px;
        position: relative;
        border: 3px solid #fff;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
      }
      
      .gallery-item:hover {
        transform: scale(1.05);
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
      }
      
      /* Scrollbar styling */
      .gallery-grid::-webkit-scrollbar {
        height: 10px;
      }
      
      .gallery-grid::-webkit-scrollbar-track {
        background: #222;
      }
      
      .gallery-grid::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 5px;
      }
    `,
    
    'diamond-grid': `
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(${columnsDesktop}, 1fr);
        gap: ${gap * 2}px;
        transform: rotate(45deg);
        margin: 100px auto;
        max-width: 80%;
      }
      
      .gallery-item {
        position: relative;
        overflow: hidden;
        aspect-ratio: 1;
        transform: rotate(-45deg);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .gallery-item-inner {
        width: 141.42%;
        height: 141.42%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .gallery-item:hover {
        transform: rotate(-45deg) scale(1.2);
        z-index: 10;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      
      @media (max-width: 1024px) {
        .gallery-grid { 
          grid-template-columns: repeat(${columnsTablet}, 1fr);
          max-width: 90%;
        }
      }
      
      @media (max-width: 640px) {
        .gallery-grid { 
          transform: none;
          margin: 20px auto;
          max-width: 100%;
        }
        .gallery-item { transform: none; }
        .gallery-item-inner {
          width: 100%;
          height: 100%;
          position: static;
          transform: none;
        }
      }
    `,
    
    'spiral-gallery': `
      .gallery-grid {
        position: relative;
        height: 800px;
        margin: 50px auto;
      }
      
      .gallery-item {
        position: absolute;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .gallery-item:hover {
        transform: scale(1.5);
        z-index: 100;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
      
      /* Spiral positioning */
      ${images.map((_: any, i: number) => {
        const angle = i * 0.5;
        const radius = 50 + i * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const size = 100 + i * 5;
        
        return `
          .gallery-item:nth-child(${i + 1}) {
            left: calc(50% + ${x}px - ${size/2}px);
            top: calc(50% + ${y}px - ${size/2}px);
            width: ${size}px;
            height: ${size}px;
            z-index: ${50 - i};
          }
        `;
      }).join('\n')}
      
      @media (max-width: 768px) {
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: ${gap}px;
          height: auto;
        }
        
        .gallery-item {
          position: static !important;
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 1;
          border-radius: 10px !important;
        }
      }
    `
  };

  // Animations communes
  const animations = `
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
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes rotate360 {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    .gallery-item {
      animation: fadeInUp 0.6s ease-out;
      animation-fill-mode: both;
    }
    
    ${images.map((_: any, i: number) => `
      .gallery-item:nth-child(${i + 1}) {
        animation-delay: ${i * 0.1}s;
      }
    `).join('\n')}
  `;

  // Loading animations
  const loadingStyles: Record<string, string> = {
    skeleton: `
      .lazy-placeholder {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
    `,
    blur: `
      .gallery-image.lazy {
        filter: blur(20px);
        transition: filter 0.5s ease;
      }
      .gallery-image.lazy.loaded {
        filter: blur(0);
      }
    `,
    fade: `
      .gallery-image.lazy {
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .gallery-image.lazy.loaded {
        opacity: 1;
      }
    `,
    scale: `
      .gallery-image.lazy {
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.5s ease;
      }
      .gallery-image.lazy.loaded {
        transform: scale(1);
        opacity: 1;
      }
    `,
    shimmer: `
      .lazy-placeholder {
        position: relative;
        overflow: hidden;
        background: #f0f0f0;
      }
      .lazy-placeholder::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255,255,255,0.8) 50%, 
          transparent 100%
        );
        animation: shimmer 1.5s infinite;
      }
    `
  };

  const css = `
    <style>
      .gallery-section {
        padding: 80px 20px;
        background: ${themeColors.background};
        position: relative;
        overflow: hidden;
      }
      
      .gallery-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .gallery-header {
        text-align: center;
        margin-bottom: 60px;
      }
      
      .gallery-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        color: ${themeColors.text};
        margin-bottom: 20px;
        opacity: 0;
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .gallery-subtitle {
        font-size: 1.25rem;
        color: ${themeColors.text}aa;
        max-width: 600px;
        margin: 0 auto;
        opacity: 0;
        animation: fadeInUp 0.8s ease-out 0.2s forwards;
      }
      
      /* Filtres */
      .gallery-filters {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 40px;
        opacity: 0;
        animation: fadeInUp 0.8s ease-out 0.4s forwards;
      }
      
      .filter-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: white;
        border: 2px solid ${themeColors.border};
        border-radius: 30px;
        font-size: 0.95rem;
        font-weight: 500;
        color: ${themeColors.text};
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .filter-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary});
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .filter-btn:hover,
      .filter-btn.active {
        border-color: ${themeColors.primary};
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }
      
      .filter-btn.active {
        background: ${themeColors.primary};
        color: white;
      }
      
      .filter-btn .count {
        background: ${themeColors.primary}20;
        color: ${themeColors.primary};
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
        transition: all 0.3s;
      }
      
      .filter-btn.active .count {
        background: rgba(255, 255, 255, 0.3);
        color: white;
      }
      
      /* Gallery Grid - Base styles */
      .gallery-grid {
        position: relative;
        width: 100%;
      }
      
      .gallery-item-inner {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .gallery-item:hover .gallery-image {
        transform: scale(1.1);
      }
      
      /* Overlay */
      .gallery-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, 
          transparent 0%, 
          rgba(0, 0, 0, 0.7) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 20px;
      }
      
      .gallery-item:hover .gallery-overlay {
        opacity: 1;
      }
      
      .overlay-content {
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      
      .gallery-item:hover .overlay-content {
        transform: translateY(0);
      }
      
      .item-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: white;
        margin-bottom: 8px;
      }
      
      .item-description {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 16px;
        line-height: 1.5;
      }
      
      .item-actions {
        display: flex;
        gap: 10px;
      }
      
      .action-btn {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .action-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
      }
      
      .item-tags {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      
      .tag {
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        color: ${themeColors.text};
      }
      
      /* Video & 360 indicators */
      .video-indicator,
      .360-indicator {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        padding: 8px 16px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: white;
        font-size: 0.85rem;
        font-weight: 500;
      }
      
      /* Lightbox Styles */
      .gallery-lightbox {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
      }
      
      .gallery-lightbox.active {
        display: block;
      }
      
      .lightbox-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
      }
      
      .lightbox-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        opacity: 0;
        animation: scaleIn 0.3s ease 0.1s forwards;
      }
      
      .lightbox-header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 20px 40px;
        background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 10;
      }
      
      .lightbox-info {
        max-width: 60%;
      }
      
      .lightbox-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
        margin-bottom: 8px;
      }
      
      .lightbox-description {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.8);
      }
      
      .lightbox-controls {
        display: flex;
        gap: 12px;
      }
      
      .control-btn {
        width: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
      
      .lightbox-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        position: relative;
      }
      
      .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 5;
      }
      
      .nav-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
      }
      
      .prev-btn { left: 40px; }
      .next-btn { right: 40px; }
      
      .lightbox-stage {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .lightbox-loader {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .loader-spinner {
        width: 60px;
        height: 60px;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-top-color: white;
        border-radius: 50%;
        animation: rotate360 1s linear infinite;
      }
      
      .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .lightbox-image.loaded {
        opacity: 1;
      }
      
      /* Video container */
      .lightbox-video-container {
        position: absolute;
        inset: 0;
        display: none;
      }
      
      .lightbox-video-container.active {
        display: block;
      }
      
      .lightbox-video {
        width: 100%;
        height: 100%;
      }
      
      /* 360 container */
      .lightbox-360-container {
        position: absolute;
        inset: 0;
        display: none;
      }
      
      .lightbox-360-container.active {
        display: block;
      }
      
      .lightbox-360-canvas {
        width: 100%;
        height: 100%;
        cursor: grab;
      }
      
      .lightbox-360-canvas:active {
        cursor: grabbing;
      }
      
      /* Zoom controls */
      .zoom-controls {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 30px;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .lightbox-stage:hover .zoom-controls {
        opacity: 1;
      }
      
      .zoom-in-btn,
      .zoom-out-btn {
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .zoom-in-btn:hover,
      .zoom-out-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .zoom-slider {
        width: 120px;
        height: 4px;
        -webkit-appearance: none;
        appearance: none;
        background: rgba(255, 255, 255, 0.2);
        outline: none;
        border-radius: 2px;
      }
      
      .zoom-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
      }
      
      .zoom-reset-btn {
        background: none;
        border: none;
        color: white;
        font-size: 0.85rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
      }
      
      .zoom-reset-btn:hover {
        opacity: 1;
      }
      
      /* Thumbnails */
      .lightbox-thumbnails {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;
        background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
      }
      
      .thumbnails-track {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: 10px 0;
      }
      
      .thumbnail-item {
        flex: 0 0 80px;
        height: 60px;
        border: 2px solid transparent;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .thumbnail-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .thumbnail-item.active {
        border-color: white;
        transform: scale(1.1);
      }
      
      .thumbnail-item:hover {
        border-color: rgba(255, 255, 255, 0.5);
      }
      
      /* Share modal */
      .share-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10001;
      }
      
      .share-modal.active {
        display: flex;
      }
      
      .share-modal-content {
        background: white;
        padding: 30px;
        border-radius: 16px;
        max-width: 400px;
        width: 90%;
        animation: scaleIn 0.3s ease;
      }
      
      .share-modal h4 {
        font-size: 1.25rem;
        margin-bottom: 20px;
        color: ${themeColors.text};
      }
      
      .share-buttons {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      
      .share-buttons button {
        padding: 12px 20px;
        border: 1px solid ${themeColors.border};
        border-radius: 8px;
        background: white;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .share-buttons button:hover {
        background: ${themeColors.primary}10;
        border-color: ${themeColors.primary};
        transform: translateY(-2px);
      }
      
      /* Icons (simplified) */
      .icon-expand::before { content: '⛶'; }
      .icon-zoom-in::before { content: '🔍'; }
      .icon-360::before { content: '↻'; }
      .icon-play::before { content: '▶'; }
      .icon-video::before { content: '🎬'; }
      .icon-share::before { content: '↗'; }
      .icon-download::before { content: '⬇'; }
      .icon-maximize::before { content: '⛶'; }
      .icon-x::before { content: '✕'; }
      .icon-chevron-left::before { content: '‹'; font-size: 24px; }
      .icon-chevron-right::before { content: '›'; font-size: 24px; }
      .icon-plus::before { content: '+'; }
      .icon-minus::before { content: '-'; }
      .icon-play-circle::before { content: '▶'; }
      .icon-facebook::before { content: 'f'; font-weight: bold; }
      .icon-twitter::before { content: 'X'; font-weight: bold; }
      .icon-pinterest::before { content: 'P'; font-weight: bold; }
      .icon-link::before { content: '🔗'; }
      
      /* Variant specific styles */
      ${variantStyles[variant] || variantStyles['masonry-flow']}
      
      /* Loading animation styles */
      ${loadingStyles[loadingAnimation] || loadingStyles.skeleton}
      
      /* Animations */
      ${animations}
      
      /* Filter animations */
      ${filterAnimation === 'morphing' ? `
        .gallery-item {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-item.filtered-out {
          opacity: 0;
          transform: scale(0.8);
          pointer-events: none;
        }
      ` : ''}
      
      ${filterAnimation === 'fade' ? `
        .gallery-item {
          transition: opacity 0.4s ease;
        }
        .gallery-item.filtered-out {
          opacity: 0;
          pointer-events: none;
        }
      ` : ''}
      
      ${filterAnimation === 'flip-3d' ? `
        .gallery-item {
          transition: all 0.6s ease;
          transform-style: preserve-3d;
        }
        .gallery-item.filtered-out {
          transform: rotateY(90deg);
          opacity: 0;
          pointer-events: none;
        }
      ` : ''}
      
      ${filterAnimation === 'scale-bounce' ? `
        .gallery-item {
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .gallery-item.filtered-out {
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
        }
      ` : ''}
      
      ${filterAnimation === 'particles' ? `
        .gallery-item {
          transition: all 0.6s ease;
          position: relative;
        }
        .gallery-item.filtered-out {
          opacity: 0;
          transform: scale(0.8);
          pointer-events: none;
        }
        .gallery-item.filtered-out::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url('data:image/svg+xml,...') center/cover;
          opacity: 0;
          animation: particles 1s ease;
        }
        @keyframes particles {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(2); }
        }
      ` : ''}
      
      /* Responsive */
      @media (max-width: 768px) {
        .gallery-header { margin-bottom: 40px; }
        .gallery-title { font-size: 2rem; }
        .gallery-subtitle { font-size: 1.1rem; }
        
        .filter-btn {
          padding: 10px 20px;
          font-size: 0.9rem;
        }
        
        .lightbox-header {
          padding: 15px 20px;
          flex-direction: column;
          gap: 15px;
        }
        
        .lightbox-info { max-width: 100%; }
        
        .prev-btn { left: 10px; }
        .next-btn { right: 10px; }
        
        .nav-btn {
          width: 44px;
          height: 44px;
        }
        
        .lightbox-thumbnails { display: none; }
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    </style>
  `;

  const html = `
    <section class="gallery-section" id="gallery">
      <div class="gallery-container">
        <div class="gallery-header">
          ${title ? `<h2 class="gallery-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="gallery-subtitle">${subtitle}</p>` : ''}
        </div>
        
        ${filterButtons}
        
        <div class="gallery-wrapper">
          <div class="gallery-grid">
            ${images.map((img: any, index: number) => 
              galleryItem({ ...img, title: img.title || '' }, index)
            ).join('')}
          </div>
        </div>
      </div>
    </section>
    
    ${lightboxHtml}
  `;

  const js = `
    <script>
      (function() {
        const gallery = {
          currentIndex: 0,
          images: ${JSON.stringify(images)},
          isZoomed: false,
          zoomLevel: 1,
          
          init() {
            // Vérifier la configuration des catégories
            this.checkCategoryConfiguration();
            this.initFilters();
            this.initGalleryItems();
            this.initLightbox();
            this.initLazyLoading();
            this.init360Support();
            this.initVideoSupport();
            this.updateFilterCounts();
          },
          
          checkCategoryConfiguration() {
            if (!${enableFilters}) return;
            
            const categories = ${JSON.stringify(categories)};
            const images = ${JSON.stringify(images)};
            
            // Vérifier que toutes les catégories d'images existent
            const imageCategories = [...new Set(images.map(img => img.category).filter(Boolean))];
            const categoryIds = categories.map(cat => cat.id);
            
            const missingCategories = imageCategories.filter(cat => cat !== 'all' && !categoryIds.includes(cat));
            
            if (missingCategories.length > 0) {
              console.warn(
                'Gallery Ultra-Modern: Des catégories d\'images n\'existent pas dans la configuration des filtres:',
                missingCategories,
                '\nPour corriger: ajoutez ces catégories dans le tableau "categories" avec le format { id: "category_name", label: "Label Affiché", icon: "icon-name" }'
              );
            }
            
            // Vérifier les images sans catégorie
            const uncategorizedImages = images.filter(img => !img.category);
            if (uncategorizedImages.length > 0) {
              console.info(
                'Gallery Ultra-Modern: ' + uncategorizedImages.length + ' image(s) sans catégorie.',
                'Ces images apparaîtront uniquement dans "Toutes".',
                'Pour les catégoriser, ajoutez une propriété "category" à chaque image.'
              );
            }
          },
          
          initFilters() {
            if (!${enableFilters}) return;
            
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
              btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.filterGallery(filter);
                
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
              });
            });
          },
          
          filterGallery(category) {
            const items = document.querySelectorAll('.gallery-item');
            
            items.forEach(item => {
              const itemCategory = item.dataset.category;
              
              if (category === 'all' || itemCategory === category) {
                item.classList.remove('filtered-out');
              } else {
                item.classList.add('filtered-out');
              }
            });
            
            // Re-layout for masonry
            if ('${variant}' === 'masonry-flow') {
              setTimeout(() => {
                const grid = document.querySelector('.gallery-grid');
                grid.style.height = 'auto';
              }, 100);
            }
          },
          
          updateFilterCounts() {
            if (!${enableFilters}) return;
            
            const categories = ${JSON.stringify(categories)};
            const items = document.querySelectorAll('.gallery-item');
            
            categories.forEach(cat => {
              const count = cat.id === 'all' 
                ? items.length 
                : document.querySelectorAll(\`.gallery-item[data-category="\${cat.id}"]\`).length;
              
              const countEl = document.querySelector(\`[data-count="\${cat.id}"]\`);
              if (countEl) {
                countEl.textContent = count;
                
                // Masquer les boutons de catégorie sans images
                if (count === 0 && cat.id !== 'all') {
                  const btn = countEl.closest('.filter-btn');
                  if (btn) {
                    btn.style.display = 'none';
                    console.info('Gallery Ultra-Modern: Catégorie "' + cat.label + '" masquée car aucune image n\'y correspond.');
                  }
                }
              }
            });
          },
          
          initGalleryItems() {
            const items = document.querySelectorAll('.gallery-item');
            
            items.forEach(item => {
              const viewBtn = item.querySelector('.view-btn');
              const zoomBtn = item.querySelector('.zoom-btn');
              const rotate360Btn = item.querySelector('.rotate-360-btn');
              
              if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                  e.preventDefault();
                  const index = parseInt(item.dataset.index);
                  this.openLightbox(index);
                });
              }
              
              if (zoomBtn) {
                zoomBtn.addEventListener('click', (e) => {
                  e.preventDefault();
                  const index = parseInt(item.dataset.index);
                  this.openLightbox(index);
                  setTimeout(() => this.toggleZoom(), 300);
                });
              }
              
              if (rotate360Btn) {
                rotate360Btn.addEventListener('click', (e) => {
                  e.preventDefault();
                  const index = parseInt(item.dataset.index);
                  this.openLightbox(index);
                  this.show360View();
                });
              }
            });
          },
          
          initLightbox() {
            const lightbox = document.getElementById('gallery-lightbox');
            const closeBtn = lightbox.querySelector('.close-btn');
            const prevBtn = lightbox.querySelector('.prev-btn');
            const nextBtn = lightbox.querySelector('.next-btn');
            const backdrop = lightbox.querySelector('.lightbox-backdrop');
            
            closeBtn.addEventListener('click', () => this.closeLightbox());
            backdrop.addEventListener('click', () => this.closeLightbox());
            
            prevBtn.addEventListener('click', () => this.navigate(-1));
            nextBtn.addEventListener('click', () => this.navigate(1));
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
              if (!lightbox.classList.contains('active')) return;
              
              switch(e.key) {
                case 'Escape': this.closeLightbox(); break;
                case 'ArrowLeft': this.navigate(-1); break;
                case 'ArrowRight': this.navigate(1); break;
              }
            });
            
            // Touch/swipe support
            let touchStartX = 0;
            const stage = lightbox.querySelector('.lightbox-stage');
            
            stage.addEventListener('touchstart', (e) => {
              touchStartX = e.touches[0].clientX;
            });
            
            stage.addEventListener('touchend', (e) => {
              const touchEndX = e.changedTouches[0].clientX;
              const diff = touchStartX - touchEndX;
              
              if (Math.abs(diff) > 50) {
                if (diff > 0) this.navigate(1);
                else this.navigate(-1);
              }
            });
            
            // Initialize controls
            this.initShareButtons();
            this.initDownload();
            this.initFullscreen();
            this.initZoomControls();
            this.initThumbnails();
            this.initAutoplay();
          },
          
          openLightbox(index) {
            this.currentIndex = index;
            const lightbox = document.getElementById('gallery-lightbox');
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            this.updateLightboxContent();
          },
          
          closeLightbox() {
            const lightbox = document.getElementById('gallery-lightbox');
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Reset states
            this.resetZoom();
            this.hideVideo();
            this.hide360View();
            this.stopAutoplay();
          },
          
          navigate(direction) {
            const totalImages = this.images.length;
            this.currentIndex = (this.currentIndex + direction + totalImages) % totalImages;
            this.updateLightboxContent();
          },
          
          updateLightboxContent() {
            const image = this.images[this.currentIndex];
            const lightbox = document.getElementById('gallery-lightbox');
            
            // Update info
            const title = lightbox.querySelector('.lightbox-title');
            const description = lightbox.querySelector('.lightbox-description');
            title.textContent = image.title || '';
            description.textContent = image.description || '';
            
            // Update image
            if (image.videoUrl && ${enableVideoSupport}) {
              this.showVideo(image.videoUrl);
            } else if (image.is360 && ${enable360}) {
              this.show360Image(image.url);
            } else {
              this.showImage(image.url);
            }
            
            // Update thumbnails
            this.updateThumbnails();
          },
          
          showImage(url) {
            const lightbox = document.getElementById('gallery-lightbox');
            const img = lightbox.querySelector('.lightbox-image');
            const loader = lightbox.querySelector('.lightbox-loader');
            
            // Hide other content
            this.hideVideo();
            this.hide360View();
            
            // Show loader
            loader.style.display = 'flex';
            img.classList.remove('loaded');
            
            // Load image
            const tempImg = new Image();
            tempImg.onload = () => {
              img.src = url;
              img.classList.add('loaded');
              loader.style.display = 'none';
            };
            tempImg.src = url;
          },
          
          showVideo(url) {
            if (!${enableVideoSupport}) return;
            
            const lightbox = document.getElementById('gallery-lightbox');
            const videoContainer = lightbox.querySelector('.lightbox-video-container');
            const iframe = lightbox.querySelector('.lightbox-video');
            
            // Parse video URL (YouTube/Vimeo)
            let videoId, embedUrl;
            
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
              videoId = url.match(/(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([^&\\n?#]+)/)?.[1];
              embedUrl = \`https://www.youtube.com/embed/\${videoId}?autoplay=1\`;
            } else if (url.includes('vimeo.com')) {
              videoId = url.match(/vimeo\\.com\\/(\\d+)/)?.[1];
              embedUrl = \`https://player.vimeo.com/video/\${videoId}?autoplay=1\`;
            }
            
            if (embedUrl) {
              iframe.src = embedUrl;
              videoContainer.classList.add('active');
              lightbox.querySelector('.lightbox-image').style.display = 'none';
            }
          },
          
          hideVideo() {
            const lightbox = document.getElementById('gallery-lightbox');
            const videoContainer = lightbox.querySelector('.lightbox-video-container');
            const iframe = lightbox.querySelector('.lightbox-video');
            
            videoContainer.classList.remove('active');
            iframe.src = '';
            lightbox.querySelector('.lightbox-image').style.display = '';
          },
          
          show360Image(url) {
            if (!${enable360}) return;
            
            const lightbox = document.getElementById('gallery-lightbox');
            const container360 = lightbox.querySelector('.lightbox-360-container');
            const canvas = lightbox.querySelector('.lightbox-360-canvas');
            
            container360.classList.add('active');
            lightbox.querySelector('.lightbox-image').style.display = 'none';
            
            // Initialize 360 viewer (simplified)
            this.init360Viewer(canvas, url);
          },
          
          hide360View() {
            const lightbox = document.getElementById('gallery-lightbox');
            const container360 = lightbox.querySelector('.lightbox-360-container');
            
            container360.classList.remove('active');
            lightbox.querySelector('.lightbox-image').style.display = '';
          },
          
          init360Viewer(canvas, imageUrl) {
            // Simplified 360 viewer implementation
            const ctx = canvas.getContext('2d');
            const img = new Image();
            let rotation = 0;
            let isDragging = false;
            let lastX = 0;
            
            img.onload = () => {
              canvas.width = canvas.offsetWidth;
              canvas.height = canvas.offsetHeight;
              
              const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                
                const scale = Math.min(
                  canvas.width / img.width,
                  canvas.height / img.height
                );
                
                ctx.drawImage(
                  img,
                  -img.width * scale / 2,
                  -img.height * scale / 2,
                  img.width * scale,
                  img.height * scale
                );
                ctx.restore();
              };
              
              canvas.addEventListener('mousedown', (e) => {
                isDragging = true;
                lastX = e.clientX;
              });
              
              canvas.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const deltaX = e.clientX - lastX;
                rotation += deltaX * 0.5;
                lastX = e.clientX;
                draw();
              });
              
              canvas.addEventListener('mouseup', () => {
                isDragging = false;
              });
              
              canvas.addEventListener('mouseleave', () => {
                isDragging = false;
              });
              
              // Auto-rotate
              const autoRotate = () => {
                if (!isDragging) {
                  rotation += 0.5;
                  draw();
                }
                requestAnimationFrame(autoRotate);
              };
              
              draw();
              // autoRotate(); // Uncomment for auto-rotation
            };
            
            img.src = imageUrl;
          },
          
          initZoomControls() {
            if (!${enableZoom}) return;
            
            const lightbox = document.getElementById('gallery-lightbox');
            const zoomInBtn = lightbox.querySelector('.zoom-in-btn');
            const zoomOutBtn = lightbox.querySelector('.zoom-out-btn');
            const zoomSlider = lightbox.querySelector('.zoom-slider');
            const zoomResetBtn = lightbox.querySelector('.zoom-reset-btn');
            const image = lightbox.querySelector('.lightbox-image');
            
            const updateZoom = (level) => {
              this.zoomLevel = Math.max(1, Math.min(${zoomLevel}, level));
              image.style.transform = \`scale(\${this.zoomLevel})\`;
              zoomSlider.value = this.zoomLevel;
              zoomResetBtn.textContent = Math.round(this.zoomLevel * 100) + '%';
            };
            
            zoomInBtn?.addEventListener('click', () => updateZoom(this.zoomLevel + 0.5));
            zoomOutBtn?.addEventListener('click', () => updateZoom(this.zoomLevel - 0.5));
            zoomResetBtn?.addEventListener('click', () => updateZoom(1));
            
            zoomSlider?.addEventListener('input', (e) => {
              updateZoom(parseFloat(e.target.value));
            });
            
            // Mouse wheel zoom
            lightbox.addEventListener('wheel', (e) => {
              if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                updateZoom(this.zoomLevel + delta);
              }
            });
          },
          
          resetZoom() {
            this.zoomLevel = 1;
            const image = document.querySelector('.lightbox-image');
            if (image) image.style.transform = '';
          },
          
          toggleZoom() {
            const newLevel = this.zoomLevel > 1 ? 1 : 2;
            this.updateZoom(newLevel);
          },
          
          initShareButtons() {
            if (!${enableShare}) return;
            
            const lightbox = document.getElementById('gallery-lightbox');
            const shareBtn = lightbox.querySelector('.share-btn');
            const shareModal = lightbox.querySelector('.share-modal');
            
            shareBtn?.addEventListener('click', () => {
              shareModal.classList.add('active');
            });
            
            shareModal?.addEventListener('click', (e) => {
              if (e.target === shareModal) {
                shareModal.classList.remove('active');
              }
            });
            
            // Share buttons
            const shareButtons = shareModal?.querySelectorAll('.share-buttons button');
            shareButtons?.forEach(btn => {
              btn.addEventListener('click', () => {
                const image = this.images[this.currentIndex];
                const url = window.location.href;
                const text = image.title || 'Check out this image';
                
                if (btn.classList.contains('share-facebook')) {
                  window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${url}\`);
                } else if (btn.classList.contains('share-twitter')) {
                  window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${text}\`);
                } else if (btn.classList.contains('share-pinterest')) {
                  window.open(\`https://pinterest.com/pin/create/button/?url=\${url}&media=\${image.url}&description=\${text}\`);
                } else if (btn.classList.contains('share-link')) {
                  navigator.clipboard.writeText(url).then(() => {
                    btn.textContent = 'Copié!';
                    setTimeout(() => {
                      btn.innerHTML = '<i class="icon-link"></i> Copier le lien';
                    }, 2000);
                  });
                }
              });
            });
          },
          
          initDownload() {
            if (!${enableDownload}) return;
            
            const lightbox = document.getElementById('gallery-lightbox');
            const downloadBtn = lightbox.querySelector('.download-btn');
            
            downloadBtn?.addEventListener('click', () => {
              const image = this.images[this.currentIndex];
              const link = document.createElement('a');
              link.href = image.url;
              link.download = image.title || 'image';
              link.click();
            });
          },
          
          initFullscreen() {
            if (!${enableFullscreen}) return;
            
            const lightbox = document.getElementById('gallery-lightbox');
            const fullscreenBtn = lightbox.querySelector('.fullscreen-btn');
            
            fullscreenBtn?.addEventListener('click', () => {
              if (!document.fullscreenElement) {
                lightbox.requestFullscreen().catch(err => {
                  console.error('Failed to enter fullscreen:', err);
                });
              } else {
                document.exitFullscreen();
              }
            });
            
            document.addEventListener('fullscreenchange', () => {
              const icon = fullscreenBtn?.querySelector('i');
              if (icon) {
                icon.className = document.fullscreenElement ? 'icon-minimize' : 'icon-maximize';
              }
            });
          },
          
          initThumbnails() {
            if (!${enableThumbnails}) return;
            
            const thumbnails = document.querySelectorAll('.thumbnail-item');
            
            thumbnails.forEach(thumb => {
              thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.index);
                this.currentIndex = index;
                this.updateLightboxContent();
              });
            });
          },
          
          updateThumbnails() {
            if (!${enableThumbnails}) return;
            
            const thumbnails = document.querySelectorAll('.thumbnail-item');
            thumbnails.forEach((thumb, index) => {
              thumb.classList.toggle('active', index === this.currentIndex);
            });
            
            // Scroll active thumbnail into view
            const activeThumb = thumbnails[this.currentIndex];
            activeThumb?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
          },
          
          initAutoplay() {
            if (${autoplaySpeed} <= 0) return;
            
            let autoplayInterval;
            
            const startAutoplay = () => {
              autoplayInterval = setInterval(() => {
                this.navigate(1);
              }, ${autoplaySpeed} * 1000);
            };
            
            const stopAutoplay = () => {
              clearInterval(autoplayInterval);
            };
            
            // Auto-start when lightbox opens
            const lightbox = document.getElementById('gallery-lightbox');
            const observer = new MutationObserver((mutations) => {
              mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                  if (lightbox.classList.contains('active')) {
                    startAutoplay();
                  } else {
                    stopAutoplay();
                  }
                }
              });
            });
            
            observer.observe(lightbox, { attributes: true });
            
            // Pause on hover
            lightbox.addEventListener('mouseenter', stopAutoplay);
            lightbox.addEventListener('mouseleave', startAutoplay);
          },
          
          stopAutoplay() {
            // Called from closeLightbox
          },
          
          initLazyLoading() {
            if (!${enableLazyLoad}) return;
            
            const lazyImages = document.querySelectorAll('.gallery-image.lazy');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const img = entry.target;
                  const src = img.dataset.src;
                  
                  // Create a new image to preload
                  const tempImg = new Image();
                  tempImg.onload = () => {
                    img.src = src;
                    img.classList.add('loaded');
                    img.previousElementSibling?.remove(); // Remove placeholder
                  };
                  tempImg.src = src;
                  
                  observer.unobserve(img);
                }
              });
            }, {
              rootMargin: '50px 0px',
              threshold: 0.01
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
          },
          
          initVideoSupport() {
            if (!${enableVideoSupport}) return;
            
            // Video support is handled in showVideo method
          },
          
          init360Support() {
            if (!${enable360}) return;
            
            // 360 support is handled in show360Image method
          }
        };
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => gallery.init());
        } else {
          gallery.init();
        }
      })();
    </script>
  `;

  return {
    html: css + html + js,
    css: '', // CSS is included in HTML
    js: '' // JS is included in HTML
  };
}
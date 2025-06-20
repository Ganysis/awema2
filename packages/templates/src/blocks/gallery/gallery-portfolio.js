import { BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';
export const galleryPortfolio = {
    id: 'gallery-portfolio',
    name: 'Galerie / Portfolio',
    description: 'Galerie photos avec multiples layouts pour présenter les réalisations',
    category: BlockCategory.GALLERY,
    tags: [],
    thumbnail: '/blocks/placeholder.png',
    performanceImpact: PerformanceImpact.LOW,
    variants: [],
    props: [
        {
            name: 'layout',
            type: PropType.STRING,
            description: 'Layout',
            defaultValue: 'grid',
            required: true,
            validation: {
                options: [
                    { label: 'Grille classique', value: 'grid' },
                    { label: 'Masonry (Pinterest)', value: 'masonry' },
                    { label: 'Carousel slider', value: 'carousel' },
                    { label: 'Grille avec hover', value: 'grid-hover' },
                    { label: 'Cards avec description', value: 'cards' },
                    { label: 'Timeline', value: 'timeline' },
                    { label: 'Tabs par catégorie', value: 'tabs' },
                    { label: 'Mosaic créative', value: 'mosaic' },
                    { label: 'Lightbox simple', value: 'lightbox' },
                    { label: 'Before/After slider', value: 'before-after' }
                ]
            }
        },
        {
            name: 'title',
            type: PropType.STRING,
            description: 'Title',
            defaultValue: 'Nos Réalisations',
            required: true,
            editorConfig: {
                control: EditorControl.TEXT
            }
        },
        {
            name: 'subtitle',
            type: PropType.STRING,
            description: 'Subtitle',
            defaultValue: 'Découvrez nos projets récents',
            required: false,
            editorConfig: {
                control: EditorControl.TEXT
            }
        },
        {
            name: 'images',
            type: PropType.STRING,
            description: 'Images',
            defaultValue: [
                {
                    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
                    title: 'Rénovation cuisine moderne',
                    category: 'Cuisine',
                    description: 'Transformation complète avec îlot central'
                },
                {
                    url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
                    title: 'Salle de bain luxe',
                    category: 'Salle de bain',
                    description: 'Design contemporain avec douche italienne'
                },
                {
                    url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
                    title: 'Terrasse bois',
                    category: 'Extérieur',
                    description: 'Aménagement extérieur en bois exotique'
                }
            ],
            required: true,
            editorConfig: {
                control: EditorControl.TEXTAREA,
                helpText: 'Format JSON: [{url, title, category, description}, ...]'
            }
        },
        {
            name: 'columns',
            type: PropType.STRING,
            description: 'Columns',
            defaultValue: '3',
            required: true,
            validation: {
                options: [
                    { label: '2 colonnes', value: '2' },
                    { label: '3 colonnes', value: '3' },
                    { label: '4 colonnes', value: '4' },
                    { label: '5 colonnes', value: '5' }
                ]
            }
        },
        {
            name: 'imageRatio',
            type: PropType.STRING,
            description: 'Image Ratio',
            defaultValue: 'square',
            required: true,
            validation: {
                options: [
                    { label: 'Carré (1:1)', value: 'square' },
                    { label: 'Paysage (16:9)', value: 'landscape' },
                    { label: 'Portrait (3:4)', value: 'portrait' },
                    { label: 'Variable', value: 'variable' }
                ]
            }
        },
        {
            name: 'showFilter',
            type: PropType.BOOLEAN,
            description: 'Show Filter',
            defaultValue: true,
            required: false,
            editorConfig: {
                control: EditorControl.TOGGLE
            }
        },
        {
            name: 'enableLightbox',
            type: PropType.BOOLEAN,
            description: 'Enable Lightbox',
            defaultValue: true,
            required: false,
            editorConfig: {
                control: EditorControl.TOGGLE
            }
        },
        {
            name: 'backgroundColor',
            type: PropType.STRING,
            description: 'Background Color',
            defaultValue: 'white',
            required: true,
            validation: {
                options: [
                    { label: 'Blanc', value: 'white' },
                    { label: 'Gris clair', value: 'gray' },
                    { label: 'Noir', value: 'black' },
                    { label: 'Dégradé', value: 'gradient' }
                ]
            }
        },
        {
            name: 'spacing',
            type: PropType.STRING,
            description: 'Spacing',
            defaultValue: 'normal',
            required: true,
            validation: {
                options: [
                    { label: 'Aucun', value: 'none' },
                    { label: 'Serré', value: 'tight' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Large', value: 'large' }
                ]
            }
        }
    ],
    defaultProps: {
        layout: 'grid',
        title: 'Nos Réalisations',
        columns: '3',
        imageRatio: 'square',
        showFilter: true,
        enableLightbox: true
    }
};
export function renderGalleryPortfolio(props) {
    const { layout = 'grid', title, subtitle, images = [], columns = '3', imageRatio = 'square', showFilter = true, enableLightbox = true, backgroundColor = 'white', spacing = 'normal' } = props;
    const backgroundClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        black: 'bg-gray-900 text-white',
        gradient: 'bg-gradient-to-br from-gray-50 to-white'
    };
    const spacingClasses = {
        none: 'gap-0',
        tight: 'gap-2',
        normal: 'gap-4 md:gap-6',
        large: 'gap-6 md:gap-8'
    };
    const columnClasses = {
        '2': 'md:grid-cols-2',
        '3': 'md:grid-cols-2 lg:grid-cols-3',
        '4': 'md:grid-cols-2 lg:grid-cols-4',
        '5': 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
    };
    const ratioClasses = {
        square: 'aspect-square',
        landscape: 'aspect-video',
        portrait: 'aspect-[3/4]',
        variable: ''
    };
    const categories = [...new Set(images.map((img) => img.category))].filter(Boolean);
    const renderFilters = () => {
        if (!showFilter || categories.length === 0)
            return '';
        return `
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button class="filter-btn active px-4 py-2 rounded-full bg-primary-600 text-white" data-filter="all">
          Tout
        </button>
        ${categories.map((cat) => `
          <button class="filter-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors" data-filter="${cat.toLowerCase().replace(/\s+/g, '-')}">
            ${cat}
          </button>
        `).join('')}
      </div>
    `;
    };
    const renderImage = (image, index) => {
        const categoryClass = image.category ? `category-${image.category.toLowerCase().replace(/\s+/g, '-')}` : '';
        switch (layout) {
            case 'grid':
            case 'grid-hover':
                return `
          <div class="gallery-item ${categoryClass} ${ratioClasses[imageRatio]} overflow-hidden rounded-lg ${layout === 'grid-hover' ? 'group cursor-pointer' : ''}" data-aos="fade-up" data-aos-delay="${index * 50}">
            <img 
              src="${image.url}" 
              alt="${image.title}" 
              class="w-full h-full object-cover ${layout === 'grid-hover' ? 'group-hover:scale-110 transition-transform duration-300' : ''}"
              ${enableLightbox ? 'data-lightbox="gallery"' : ''}
            >
            ${layout === 'grid-hover' ? `
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                <div class="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center p-4">
                  <h3 class="text-xl font-semibold mb-2">${image.title}</h3>
                  ${image.description ? `<p class="text-sm">${image.description}</p>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        `;
            case 'cards':
                return `
          <div class="gallery-item ${categoryClass} bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="${ratioClasses[imageRatio]} overflow-hidden">
              <img 
                src="${image.url}" 
                alt="${image.title}" 
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                ${enableLightbox ? 'data-lightbox="gallery"' : ''}
              >
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-1">${image.title}</h3>
              ${image.category ? `<span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full mb-2">${image.category}</span>` : ''}
              ${image.description ? `<p class="text-gray-600 text-sm">${image.description}</p>` : ''}
            </div>
          </div>
        `;
            case 'masonry':
                const heights = ['h-64', 'h-80', 'h-96', 'h-72'];
                const height = heights[index % heights.length];
                return `
          <div class="gallery-item ${categoryClass} ${height} rounded-lg overflow-hidden relative group" data-aos="fade-up" data-aos-delay="${index * 50}">
            <img 
              src="${image.url}" 
              alt="${image.title}" 
              class="w-full h-full object-cover"
              ${enableLightbox ? 'data-lightbox="gallery"' : ''}
            >
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 class="text-white font-semibold">${image.title}</h3>
            </div>
          </div>
        `;
            case 'carousel':
                return `
          <div class="swiper-slide">
            <div class="${ratioClasses[imageRatio] || 'aspect-video'} overflow-hidden rounded-lg">
              <img 
                src="${image.url}" 
                alt="${image.title}" 
                class="w-full h-full object-cover"
              >
            </div>
            <div class="text-center mt-4">
              <h3 class="text-lg font-semibold">${image.title}</h3>
              ${image.description ? `<p class="text-gray-600 text-sm mt-1">${image.description}</p>` : ''}
            </div>
          </div>
        `;
            case 'before-after':
                if (!image.beforeUrl)
                    return '';
                return `
          <div class="gallery-item ${categoryClass} before-after-container ${ratioClasses[imageRatio]} rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="before-after-slider">
              <img src="${image.beforeUrl}" alt="${image.title} - Avant" class="before-image">
              <img src="${image.url}" alt="${image.title} - Après" class="after-image">
              <div class="slider-handle">
                <span class="slider-button"></span>
              </div>
            </div>
            <div class="p-4 bg-white">
              <h3 class="text-lg font-semibold">${image.title}</h3>
            </div>
          </div>
        `;
            default:
                return `
          <div class="gallery-item ${categoryClass}">
            <img src="${image.url}" alt="${image.title}" class="w-full">
          </div>
        `;
        }
    };
    const renderGallery = () => {
        switch (layout) {
            case 'carousel':
                return `
          <div class="swiper gallery-carousel">
            <div class="swiper-wrapper">
              ${images.map((img, idx) => renderImage(img, idx)).join('')}
            </div>
            <div class="swiper-pagination mt-8"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        `;
            case 'tabs':
                return `
          <div class="tabs-container">
            <div class="tabs-header flex flex-wrap justify-center gap-2 mb-8">
              <button class="tab-btn active px-6 py-3 rounded-lg bg-primary-600 text-white" data-tab="all">
                Tout voir
              </button>
              ${categories.map((cat, idx) => `
                <button class="tab-btn px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300" data-tab="tab-${idx}">
                  ${cat}
                </button>
              `).join('')}
            </div>
            <div class="tabs-content">
              <div class="tab-pane active grid grid-cols-1 ${columnClasses[columns]} ${spacingClasses[spacing]}" id="all">
                ${images.map((img, idx) => renderImage(img, idx)).join('')}
              </div>
              ${categories.map((cat, idx) => `
                <div class="tab-pane hidden grid grid-cols-1 ${columnClasses[columns]} ${spacingClasses[spacing]}" id="tab-${idx}">
                  ${images.filter((img) => img.category === cat).map((img, i) => renderImage(img, i)).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        `;
            default:
                return `
          <div class="grid grid-cols-1 ${columnClasses[columns]} ${spacingClasses[spacing]}">
            ${images.map((img, idx) => renderImage(img, idx)).join('')}
          </div>
        `;
        }
    };
    return {
        html: `
      <section class="${backgroundClasses[backgroundColor]} py-16 md:py-24 gallery-section gallery-${layout}">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${title}</h2>
            ${subtitle ? `<p class="text-xl text-gray-600">${subtitle}</p>` : ''}
          </div>
          
          ${renderFilters()}
          ${renderGallery()}
        </div>
      </section>
      
      ${enableLightbox ? `
        <div id="lightbox" class="lightbox hidden fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button class="lightbox-close absolute top-4 right-4 text-white text-4xl">&times;</button>
          <img class="lightbox-image max-w-90vw max-h-90vh" src="" alt="">
          <button class="lightbox-prev absolute left-4 text-white text-4xl">‹</button>
          <button class="lightbox-next absolute right-4 text-white text-4xl">›</button>
        </div>
      ` : ''}
    `,
        css: `
      .gallery-masonry {
        columns: 1;
      }
      @media (min-width: 768px) {
        .gallery-masonry { columns: 2; }
      }
      @media (min-width: 1024px) {
        .gallery-masonry { columns: ${columns}; }
      }
      
      .gallery-masonry .gallery-item {
        break-inside: avoid;
        margin-bottom: 1rem;
      }
      
      .before-after-slider {
        position: relative;
        overflow: hidden;
      }
      
      .before-after-slider img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
      }
      
      .after-image {
        clip-path: inset(0 50% 0 0);
      }
      
      .slider-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 3px;
        background: white;
        cursor: ew-resize;
      }
      
      .slider-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      
      .lightbox {
        cursor: pointer;
      }
      
      .lightbox-image {
        cursor: default;
      }
    `,
        js: `
      // Filter functionality
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          
          // Update active state
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-primary-600', 'text-white'));
          this.classList.add('active', 'bg-primary-600', 'text-white');
          
          // Filter items
          document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.classList.contains('category-' + filter)) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
      
      // Lightbox functionality
      if (${enableLightbox}) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        let currentIndex = 0;
        const galleryImages = document.querySelectorAll('[data-lightbox="gallery"]');
        
        galleryImages.forEach((img, index) => {
          img.addEventListener('click', function() {
            currentIndex = index;
            lightboxImg.src = this.src;
            lightbox.classList.remove('hidden');
          });
        });
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
          lightbox.classList.add('hidden');
        });
        
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
            lightbox.classList.add('hidden');
          }
        });
      }
      
      // Tabs functionality
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Update buttons
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active', 'bg-primary-600', 'text-white'));
          this.classList.add('active', 'bg-primary-600', 'text-white');
          
          // Update panes
          document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
          document.getElementById(tabId).classList.remove('hidden');
        });
      });
      
      // Initialize Swiper for carousel
      if ('${layout}' === 'carousel') {
        new Swiper('.gallery-carousel', {
          slidesPerView: 1,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: ${parseInt(columns) - 1} },
            1024: { slidesPerView: ${columns} }
          }
        });
      }
    `,
        variants: []
    };
}

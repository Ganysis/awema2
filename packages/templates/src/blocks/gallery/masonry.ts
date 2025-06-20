import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const galleryMasonry: Block = {
  id: 'gallery-masonry',
  name: 'Masonry Gallery',
  description: 'Pinterest-style masonry gallery with filtering',
  category: BlockCategory.GALLERY,
  tags: ['gallery', 'masonry', 'portfolio', 'images', 'filter'],
  thumbnail: '/blocks/gallery-masonry.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Gallery title',
      required: false,

      defaultValue: 'Our Work',

      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Enter title',
        group: 'Content',
        order: 1
      }
    },
    {
      name: 'images',
      type: PropType.STRING,
      description: 'Gallery images with metadata',
      required: true,

      defaultValue: [],

      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Images',
        order: 2
      }
    }
  ],
  variants: [
    {
      id: 'rounded',
      name: 'Rounded Corners',
      description: 'Images with rounded corners',
      modifications: {
        borderRadius: '12px'
      }
    }
  ],
  defaultProps: {
    title: 'Our Work',
    images: [
      {
        src: '/images/gallery/project1.jpg',
        alt: 'Project 1',
        category: 'renovation',
        title: 'Modern Kitchen Renovation'
      }
    ]
  },
  dependencies: []
};

export function renderGalleryMasonry(props: any, variants: string[] = []): RenderedBlock {
  const rounded = variants.includes('rounded');
  
  // Build images HTML
  let imagesHtml = '';
  if (props.images && Array.isArray(props.images)) {
    props.images.forEach((image: any, index: number) => {
      imagesHtml += `
        <div class="gallery-masonry__item" data-category="${image.category || 'all'}">
          <div class="gallery-masonry__item-inner">
            <img src="${image.src}" 
                 alt="${image.alt || 'Gallery image ' + (index + 1)}" 
                 loading="lazy"
                 class="gallery-masonry__image">
            <div class="gallery-masonry__overlay">
              ${image.title ? `<h3 class="gallery-masonry__item-title">${image.title}</h3>` : ''}
              <button class="gallery-masonry__view-btn" aria-label="View larger image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 21l-6-6m6 6v-7m0 7h-7"/>
                  <path d="M3 12V3m0 0h7M3 3l6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  const html = `
    <section class="gallery-masonry" role="region" aria-label="Gallery">
      <div class="container">
        ${props.title ? `
          <div class="gallery-masonry__header">
            <h2 class="gallery-masonry__title">${props.title}</h2>
          </div>
        ` : ''}
        
        <div class="gallery-masonry__grid">
          ${imagesHtml}
        </div>
      </div>
    </section>
  `;

  const css = `
    .gallery-masonry {
      padding: 4rem 0;
    }

    .gallery-masonry__header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .gallery-masonry__title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-text, #333);
    }

    .gallery-masonry__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .gallery-masonry__item {
      position: relative;
      overflow: hidden;
      background: var(--color-surface, #f5f5f5);
    }

    .gallery-masonry__item-inner {
      position: relative;
      overflow: hidden;
      height: 100%;
    }

    .gallery-masonry__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .gallery-masonry__item:hover .gallery-masonry__image {
      transform: scale(1.1);
    }

    .gallery-masonry__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-masonry__item:hover .gallery-masonry__overlay {
      opacity: 1;
    }

    .gallery-masonry__item-title {
      color: white;
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .gallery-masonry__view-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
    }

    .gallery-masonry__view-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.1);
    }

    /* Masonry layout variations */
    .gallery-masonry__item:nth-child(4n+1) {
      grid-row: span 2;
    }

    .gallery-masonry__item:nth-child(6n+3) {
      grid-column: span 2;
      grid-row: span 2;
    }

    @media (max-width: 768px) {
      .gallery-masonry__grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
      
      .gallery-masonry__item:nth-child(4n+1),
      .gallery-masonry__item:nth-child(6n+3) {
        grid-row: span 1;
        grid-column: span 1;
      }
    }
    
    ${rounded ? '.gallery-masonry__item { border-radius: 12px; }' : ''}
  `;

  const criticalCSS = `
    .gallery-masonry { padding: 4rem 0; }
    .gallery-masonry__grid { display: grid; gap: 20px; }
    .gallery-masonry__item { position: relative; overflow: hidden; }
    .gallery-masonry__image { width: 100%; height: 100%; object-fit: cover; }
  `;

  return {
    html,
    css,
    criticalCSS,
    js: '',
    dependencies: []
  };
}
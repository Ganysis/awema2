import { Block, BlockCategory, PropType, EditorControl, RenderedBlock, PerformanceImpact } from '@awema/shared';

export const galleryClean: Block = {
  id: 'gallery-clean',
  name: 'Galerie Photos',
  description: 'Galerie d\'images avec lightbox',
  category: BlockCategory.GALLERY,
  tags: ['gallery', 'images', 'lightbox', 'clean'],
  variants: [
    {
      id: 'gray-background',
      name: 'Fond gris',
      description: 'Ajoute un fond gris à la section',
      modifications: {}
    },
    {
      id: 'full-width',
      name: 'Pleine largeur',
      description: 'Galerie en pleine largeur',
      modifications: {}
    }
  ],
  thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
  performanceImpact: PerformanceImpact.MEDIUM,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la galerie',
      defaultValue: 'Nos Réalisations',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le titre'},
      required: false
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre optionnel',
      defaultValue: 'Découvrez nos projets récents',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le sous-titre'},
      required: false
    },
    {
      name: 'images',
      type: PropType.STRING,
      description: 'Liste des images de la galerie',
      defaultValue: JSON.stringify([
        {
          url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
          alt: 'Projet 1',
          title: 'Rénovation cuisine'
        },
        {
          url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
          alt: 'Projet 2',
          title: 'Salle de bain moderne'
        },
        {
          url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
          alt: 'Projet 3',
          title: 'Aménagement extérieur'
        },
        {
          url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
          alt: 'Projet 4',
          title: 'Installation électrique'
        }
      ]),
      validation: {
        min: 1,
        max: 20
      },
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Format JSON pour les images',
        helpText: 'Chaque image doit avoir: url, alt, title'
      },
      required: false
    },
    {
      name: 'columns',
      type: PropType.NUMBER,
      description: 'Nombre de colonnes de la grille',
      defaultValue: 3,
      validation: {
        min: 2,
        max: 4
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        placeholder: 'Nombre de colonnes'
      },
      required: false
    }
  ],
  defaultProps: {
    title: 'Nos Réalisations',
    subtitle: 'Découvrez nos projets récents',
    columns: 3,
    images: JSON.stringify([
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
        alt: 'Projet 1',
        title: 'Rénovation cuisine'
      },
      {
        url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
        alt: 'Projet 2',
        title: 'Salle de bain moderne'
      },
      {
        url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
        alt: 'Projet 3',
        title: 'Aménagement extérieur'
      },
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        alt: 'Projet 4',
        title: 'Installation électrique'
      }
    ])
  }
};

export function renderGalleryClean(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const hasBackground = variants.includes('gray-background');
  const isFullWidth = variants.includes('full-width');
  
  const html = `
    <section class="gallery-section ${hasBackground ? 'gallery-section--gray' : ''}">
      <div class="gallery-container ${isFullWidth ? 'gallery-container--full' : ''}">
        <div class="gallery-header">
          <h2 class="gallery-title">${props.title}</h2>
          ${props.subtitle ? `<p class="gallery-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="gallery-grid gallery-grid--${props.columns}">
          ${JSON.parse(props.images).map((image: any, index: number) => `
            <div class="gallery-item" data-aos="fade-up" data-aos-delay="${index * 50}">
              <a href="${image.url}" class="gallery-link" data-lightbox="gallery" data-title="${image.title}">
                <img 
                  src="${image.url}" 
                  alt="${image.alt}"
                  class="gallery-image"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div class="gallery-overlay">
                  <div class="gallery-overlay-content">
                    <span class="gallery-overlay-title">${image.title}</span>
                    <svg class="gallery-overlay-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .gallery-section {
      padding: 5rem 0;
      position: relative;
    }

    .gallery-section--gray {
      background-color: #f8f9fa;
    }

    .gallery-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .gallery-container--full {
      max-width: none;
    }

    .gallery-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .gallery-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .gallery-subtitle {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
    }

    .gallery-grid {
      display: grid;
      gap: 1.5rem;
    }

    .gallery-grid--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .gallery-grid--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .gallery-grid--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 0.5rem;
      background: #f1f3f5;
    }

    .gallery-link {
      display: block;
      position: relative;
      height: 0;
      padding-bottom: 75%;
      overflow: hidden;
    }

    .gallery-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-item:hover .gallery-image {
      transform: scale(1.1);
    }

    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }

    .gallery-overlay-content {
      text-align: center;
      color: white;
    }

    .gallery-overlay-title {
      display: block;
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .gallery-overlay-icon {
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }

    @media (max-width: 1024px) {
      .gallery-grid--4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .gallery-grid--2,
      .gallery-grid--3,
      .gallery-grid--4 {
        grid-template-columns: 1fr;
      }

      .gallery-title {
        font-size: 2rem;
      }
    }
  `;

  const criticalCSS = `
    .gallery-section { padding: 5rem 0; }
    .gallery-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .gallery-grid { display: grid; gap: 1.5rem; }
    .gallery-grid--3 { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 768px) { .gallery-grid--3 { grid-template-columns: 1fr; } }
  `;

  return {
    html,
    css,
    js: '',
    criticalCSS,
    dependencies: []
  };
}
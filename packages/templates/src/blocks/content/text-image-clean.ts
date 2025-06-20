import { Block, BlockCategory, PropType, EditorControl, RenderedBlock, PerformanceImpact } from '@awema/shared';

export const textImageClean: Block = {
  id: 'text-image-clean',
  name: 'Texte & Image',
  description: 'Section avec texte et image côte à côte',
  category: BlockCategory.CONTENT,
  tags: ['content', 'image', 'text', 'clean'],
  variants: [
    {
      id: 'image-left',
      name: 'Image à gauche',
      description: 'Affiche l\'image à gauche du texte',
      modifications: {}
    },
    {
      id: 'gray-background',
      name: 'Fond gris',
      description: 'Ajoute un fond gris à la section',
      modifications: {}
    }
  ],
  thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal de la section',
      defaultValue: 'Notre Expertise',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le titre'},
      required: false
    },
    {
      name: 'content',
      type: PropType.STRING,
      description: 'Texte principal de la section',
      defaultValue: 'Nous mettons notre savoir-faire à votre service pour réaliser tous vos projets avec professionnalisme et efficacité.',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Entrez le contenu'},
      required: false
    },
    {
      name: 'imageUrl',
      type: PropType.STRING,
      description: 'Image principale de la section',
      defaultValue: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      editorConfig: {
        control: EditorControl.IMAGE_PICKER},
      required: false
    },
    {
      name: 'imageAlt',
      type: PropType.STRING,
      description: 'Texte alternatif pour l\'image (SEO)',
      required: true,
      defaultValue: 'Notre équipe au travail',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de l\'image'
      }
    },
    {
      name: 'ctaText',
      type: PropType.STRING,
      description: 'Texte du bouton d\'action',
      required: false,
      defaultValue: 'En savoir plus',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Texte du bouton'
      }
    },
    {
      name: 'ctaLink',
      type: PropType.STRING,
      description: 'URL de destination du bouton',
      defaultValue: '#contact',
      editorConfig: {
        control: EditorControl.LINK_PICKER},
      required: false
    },
    {
      name: 'features',
      type: PropType.STRING,
      description: 'Liste des points clés',
      defaultValue: JSON.stringify([
        '✓ Plus de 10 ans d\'expérience',
        '✓ Équipe qualifiée',
        '✓ Devis gratuit'
      ]),
      validation: {
        max: 6
      },
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Un point clé par ligne',
        helpText: 'Entrez chaque point clé sur une nouvelle ligne'
      },
      required: false
    }
  ],
  defaultProps: {
    title: 'Notre Expertise',
    content: 'Nous mettons notre savoir-faire à votre service pour réaliser tous vos projets avec professionnalisme et efficacité.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    imageAlt: 'Notre équipe au travail',
    features: JSON.stringify([
      '✓ Plus de 10 ans d\'expérience',
      '✓ Équipe qualifiée',
      '✓ Devis gratuit'
    ])
  }
};

export function renderTextImageClean(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const isReversed = variants.includes('image-left');
  const hasBackground = variants.includes('gray-background');
  
  const html = `
    <section class="content-section ${hasBackground ? 'content-section--gray' : ''}">
      <div class="content-container">
        <div class="content-grid ${isReversed ? 'content-grid--reversed' : ''}">
          <div class="content-text">
            <h2 class="content-title">${props.title}</h2>
            <div class="content-body">
              <p>${props.content}</p>
            </div>
            ${props.features && props.features.length > 0 ? `
              <ul class="content-features">
                ${props.features.map((feature: string) => `
                  <li class="content-feature">${feature}</li>
                `).join('')}
              </ul>
            ` : ''}
            ${props.ctaText ? `
              <div class="content-cta">
                <a href="${props.ctaLink}" class="btn btn-primary">${props.ctaText}</a>
              </div>
            ` : ''}
          </div>
          <div class="content-media">
            <img 
              src="${props.imageUrl}" 
              alt="${props.imageAlt}"
              class="content-image"
              loading="lazy"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  `;

  const css = `
    .content-section {
      padding: 5rem 0;
      position: relative;
    }

    .content-section--gray {
      background-color: #f8f9fa;
    }

    .content-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .content-grid--reversed {
      direction: rtl;
    }

    .content-grid--reversed > * {
      direction: ltr;
    }

    .content-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: var(--color-text);
    }

    .content-body {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
    }

    .content-features {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
    }

    .content-feature {
      padding: 0.75rem 0;
      font-size: 1rem;
      color: var(--color-text-secondary);
    }

    .content-cta {
      margin-top: 2rem;
    }

    .content-media {
      position: relative;
      overflow: hidden;
      border-radius: 0.5rem;
    }

    .content-image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
    }

    .content-image:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .content-title {
        font-size: 2rem;
      }

      .content-body {
        font-size: 1rem;
      }
    }
  `;

  const criticalCSS = `
    .content-section { padding: 5rem 0; }
    .content-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .content-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; }
    @media (max-width: 768px) { .content-grid { grid-template-columns: 1fr; } }
  `;

  return {
    html,
    css,
    js: '',
    criticalCSS,
    dependencies: []
  };
}
import { Block, BlockCategory, PropType, EditorControl, RenderedBlock, PerformanceImpact } from '@awema/shared';

export const textImageBlock: Block = {
  id: 'text-image-flexible',
  name: 'Texte & Image',
  description: 'Section flexible avec texte et image (multiple layouts)',
  category: BlockCategory.CONTENT,
  tags: ['content', 'image', 'text', 'flexible'],
  variants: [],
  defaultProps: {
    layout: 'image-right',
    style: 'clean',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    imagePosition: 'center',
    title: 'Un savoir-faire reconnu',
    titleSize: 'large',
    content: 'Fort de plus de 20 ans d\'expérience, nous mettons notre expertise à votre service.',
    backgroundColor: 'white',
    spacing: 'normal',
    animation: 'fade-up'
  },
  thumbnail: '/blocks/text-image.png',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Disposition du texte et de l\'image',
      defaultValue: 'image-right',
      required: true,
      validation: {
        options: [
          { label: 'Image à droite', value: 'image-right' },
          { label: 'Image à gauche', value: 'image-left' },
          { label: 'Image en haut', value: 'image-top' },
          { label: 'Image en bas', value: 'image-bottom' },
          { label: 'Alterné (zigzag)', value: 'alternating' },
          { label: 'Superposé', value: 'overlay' },
          { label: 'Carte horizontale', value: 'card-horizontal' },
          { label: 'Split 50/50', value: 'split-even' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'style',
      type: PropType.STRING,
      description: 'Style visuel de la section',
      defaultValue: 'clean',
      required: true,
      validation: {
        options: [
          { label: 'Épuré', value: 'clean' },
          { label: 'Moderne', value: 'modern' },
          { label: 'Élégant', value: 'elegant' },
          { label: 'Minimaliste', value: 'minimal' },
          { label: 'Professionnel', value: 'professional' },
          { label: 'Créatif', value: 'creative' },
          { label: 'Audacieux', value: 'bold' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'imageUrl',
      type: PropType.STRING,
      description: 'URL de l\'image à afficher',
      defaultValue: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      required: true,
      editorConfig: {
        control: EditorControl.IMAGE_PICKER
      }
    },
    {
      name: 'imagePosition',
      type: PropType.STRING,
      description: 'Position de l\'image dans son conteneur',
      defaultValue: 'center',
      required: true,
      validation: {
        options: [
          { label: 'Centre', value: 'center' },
          { label: 'Haut', value: 'top' },
          { label: 'Bas', value: 'bottom' },
          { label: 'Gauche', value: 'left' },
          { label: 'Droite', value: 'right' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'overline',
      type: PropType.STRING,
      description: 'Texte au-dessus du titre principal',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'NOTRE EXPERTISE'
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal de la section',
      defaultValue: 'Un savoir-faire reconnu',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'titleSize',
      type: PropType.STRING,
      description: 'Taille du titre principal',
      defaultValue: 'large',
      required: true,
      validation: {
        options: [
          { label: 'Petit', value: 'small' },
          { label: 'Moyen', value: 'medium' },
          { label: 'Grand', value: 'large' },
          { label: 'Très grand', value: 'xlarge' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'content',
      type: PropType.STRING,
      description: 'Contenu principal du texte',
      defaultValue: 'Fort de plus de 20 ans d\'expérience, nous mettons notre expertise à votre service pour tous vos projets.',
      required: true,
      editorConfig: {
        control: EditorControl.TEXTAREA
      }
    },
    {
      name: 'bulletPoints',
      type: PropType.STRING,
      description: 'Liste de points clés',
      defaultValue: [],
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Ajoutez des points clés (un par ligne)...'
      }
    },
    {
      name: 'primaryButtonText',
      type: PropType.STRING,
      description: 'Texte du bouton principal',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Texte du bouton principal'
      }
    },
    {
      name: 'primaryButtonHref',
      type: PropType.STRING,
      description: 'Lien du bouton principal',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Lien du bouton principal'
      }
    },
    {
      name: 'secondaryButtonText',
      type: PropType.STRING,
      description: 'Texte du bouton secondaire',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Texte du bouton secondaire'
      }
    },
    {
      name: 'secondaryButtonHref',
      type: PropType.STRING,
      description: 'Lien du bouton secondaire',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Lien du bouton secondaire'
      }
    },
    {
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Couleur de fond de la section',
      defaultValue: 'white',
      required: true,
      validation: {
        options: [
          { label: 'Blanc', value: 'white' },
          { label: 'Gris clair', value: 'light-gray' },
          { label: 'Gris foncé', value: 'dark-gray' },
          { label: 'Noir', value: 'black' },
          { label: 'Primaire', value: 'primary' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Pattern', value: 'pattern' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'spacing',
      type: PropType.STRING,
      description: 'Espacement vertical de la section',
      defaultValue: 'normal',
      required: true,
      validation: {
        options: [
          { label: 'Compact', value: 'compact' },
          { label: 'Normal', value: 'normal' },
          { label: 'Aéré', value: 'spacious' },
          { label: 'Très aéré', value: 'extra-spacious' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'animation',
      type: PropType.STRING,
      description: 'Type d\'animation à l\'apparition',
      defaultValue: 'fade-up',
      required: true,
      validation: {
        options: [
          { label: 'Aucune', value: 'none' },
          { label: 'Fade up', value: 'fade-up' },
          { label: 'Fade in', value: 'fade-in' },
          { label: 'Slide', value: 'slide' },
          { label: 'Zoom', value: 'zoom' },
          { label: 'Parallax', value: 'parallax' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT
      }
    },
    {
      name: 'imageEffects',
      type: PropType.STRING,
      description: 'Effets visuels appliqués à l\'image',
      defaultValue: [],
      required: false,
      validation: {
        options: [
          { label: 'Ombre portée', value: 'shadow' },
          { label: 'Coins arrondis', value: 'rounded' },
          { label: 'Bordure', value: 'border' },
          { label: 'Effet hover zoom', value: 'hover-zoom' },
          { label: 'Effet hover rotate', value: 'hover-rotate' },
          { label: 'Masque de forme', value: 'shape-mask' },
          { label: 'Filtre noir et blanc', value: 'grayscale' }
        ]
      },
      editorConfig: {
        control: EditorControl.MULTI_SELECT
      }
    }
  ]
};

// Render function
export function renderTextImageBlock(props: Record<string, any>): RenderedBlock {
  const {
    layout = 'image-right',
    style = 'clean',
    imageUrl,
    imagePosition = 'center',
    overline,
    title,
    titleSize = 'large',
    content,
    bulletPoints = [],
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    backgroundColor = 'white',
    spacing = 'normal',
    animation = 'fade-up',
    imageEffects = []
  } = props;

  // Style classes
  const spacingClasses = {
    compact: 'py-8 md:py-12',
    normal: 'py-12 md:py-20',
    spacious: 'py-16 md:py-28',
    'extra-spacious': 'py-20 md:py-36'
  };

  const titleSizeClasses = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl',
    xlarge: 'text-5xl md:text-6xl'
  };

  const backgroundClasses = {
    white: 'bg-white',
    'light-gray': 'bg-gray-50',
    'dark-gray': 'bg-gray-900 text-white',
    black: 'bg-black text-white',
    primary: 'bg-primary-50',
    gradient: 'bg-gradient-to-br from-primary-50 to-white',
    pattern: 'bg-white bg-pattern'
  };

  const styleVariants = {
    clean: 'clean-style',
    modern: 'modern-style',
    elegant: 'elegant-style',
    minimal: 'minimal-style',
    professional: 'professional-style',
    creative: 'creative-style',
    bold: 'bold-style'
  };

  // Image effects
  const imageClasses = imageEffects.map((effect: string) => {
    switch(effect) {
      case 'shadow': return 'shadow-2xl';
      case 'rounded': return 'rounded-lg overflow-hidden';
      case 'border': return 'border-4 border-white';
      case 'hover-zoom': return 'hover-zoom';
      case 'hover-rotate': return 'hover-rotate';
      case 'shape-mask': return 'shape-mask';
      case 'grayscale': return 'grayscale hover:grayscale-0 transition-all';
      default: return '';
    }
  }).join(' ');

  // Layout specific rendering
  const renderLayout = () => {
    switch(layout) {
      case 'image-right':
        return `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div class="content-section" data-aos="${animation}">
              ${renderTextContent()}
            </div>
            <div class="image-section" data-aos="${animation}" data-aos-delay="100">
              <div class="relative ${imageClasses}">
                <img src="${imageUrl}" alt="${title}" class="w-full h-auto object-cover" style="object-position: ${imagePosition};">
              </div>
            </div>
          </div>
        `;
      
      case 'image-left':
        return `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div class="image-section order-2 lg:order-1" data-aos="${animation}">
              <div class="relative ${imageClasses}">
                <img src="${imageUrl}" alt="${title}" class="w-full h-auto object-cover" style="object-position: ${imagePosition};">
              </div>
            </div>
            <div class="content-section order-1 lg:order-2" data-aos="${animation}" data-aos-delay="100">
              ${renderTextContent()}
            </div>
          </div>
        `;
      
      case 'image-top':
        return `
          <div class="max-w-4xl mx-auto">
            <div class="image-section mb-12" data-aos="${animation}">
              <div class="relative ${imageClasses}">
                <img src="${imageUrl}" alt="${title}" class="w-full h-auto object-cover max-h-96" style="object-position: ${imagePosition};">
              </div>
            </div>
            <div class="content-section text-center" data-aos="${animation}" data-aos-delay="100">
              ${renderTextContent()}
            </div>
          </div>
        `;
      
      case 'split-even':
        return `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div class="content-section p-8 lg:p-16 flex items-center" data-aos="${animation}">
              <div class="w-full">
                ${renderTextContent()}
              </div>
            </div>
            <div class="image-section h-64 lg:h-auto" data-aos="${animation}" data-aos-delay="100">
              <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover" style="object-position: ${imagePosition};">
            </div>
          </div>
        `;
      
      case 'overlay':
        return `
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
            <img src="${imageUrl}" alt="${title}" class="w-full h-[600px] object-cover" style="object-position: ${imagePosition};">
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <div class="content-section text-white text-center max-w-3xl px-4" data-aos="${animation}">
                ${renderTextContent()}
              </div>
            </div>
          </div>
        `;
      
      default:
        return `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div class="content-section">
              ${renderTextContent()}
            </div>
            <div class="image-section">
              <img src="${imageUrl}" alt="${title}" class="w-full h-auto ${imageClasses}">
            </div>
          </div>
        `;
    }
  };

  const renderTextContent = () => {
    return `
      ${overline ? `<p class="overline text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2">${overline}</p>` : ''}
      <h2 class="${titleSizeClasses[titleSize as keyof typeof titleSizeClasses]} font-bold mb-6">${title}</h2>
      <div class="prose prose-lg max-w-none mb-6">
        <p>${content}</p>
      </div>
      ${bulletPoints.length > 0 ? `
        <ul class="space-y-3 mb-8">
          ${(Array.isArray(bulletPoints) ? bulletPoints : bulletPoints.split('\n').filter(Boolean)).map((point: string) => `
            <li class="flex items-start">
              <svg class="w-6 h-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-700">${point}</span>
            </li>
          `).join('')}
        </ul>
      ` : ''}
      ${(primaryButtonText || secondaryButtonText) ? `
        <div class="flex flex-wrap gap-4">
          ${primaryButtonText ? `
            <a href="${primaryButtonHref || '#'}" class="btn-primary inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors">
              ${primaryButtonText}
            </a>
          ` : ''}
          ${secondaryButtonText ? `
            <a href="${secondaryButtonHref || '#'}" class="btn-secondary inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-gray-700 bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors">
              ${secondaryButtonText}
            </a>
          ` : ''}
        </div>
      ` : ''}
    `;
  };

  return {
    html: `
      <section class="${backgroundClasses[backgroundColor as keyof typeof backgroundClasses]} ${spacingClasses[spacing as keyof typeof spacingClasses]} ${styleVariants[style as keyof typeof styleVariants]} text-image-block text-image-${layout}">
        <div class="container mx-auto px-4">
          ${renderLayout()}
        </div>
      </section>
    `,
    css: `
      .text-image-block .hover-zoom {
        transition: transform 0.3s ease;
      }
      .text-image-block .hover-zoom:hover {
        transform: scale(1.05);
      }
      .text-image-block .hover-rotate {
        transition: transform 0.3s ease;
      }
      .text-image-block .hover-rotate:hover {
        transform: rotate(2deg) scale(1.02);
      }
      .text-image-block .shape-mask {
        clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
      }
      .text-image-block .bg-pattern {
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      
      /* Style variants */
      .modern-style h2 {
        background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .elegant-style {
        font-family: 'Playfair Display', serif;
      }
      
      .bold-style h2 {
        text-transform: uppercase;
        letter-spacing: -0.02em;
      }
      
      .creative-style .content-section {
        position: relative;
      }
      .creative-style .content-section::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        width: 100px;
        height: 100px;
        background: var(--primary-100);
        border-radius: 50%;
        z-index: -1;
      }
    `,
    js: '',
    dependencies: []
  };
}
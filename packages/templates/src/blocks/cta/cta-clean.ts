import { Block, BlockCategory, PropType, EditorControl, RenderedBlock, PerformanceImpact } from '@awema/shared';

export const ctaClean: Block = {
  id: 'cta-clean',
  name: 'Appel à Action',
  description: 'Section d\'appel à l\'action professionnelle',
  category: BlockCategory.CTA,
  tags: ['cta', 'call-to-action', 'conversion', 'clean'],
  variants: [
    {
      id: 'gradient',
      name: 'Dégradé',
      description: 'Fond avec dégradé de couleurs',
      modifications: {}
    },
    {
      id: 'dark',
      name: 'Sombre',
      description: 'Fond sombre',
      modifications: {}
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Version compacte avec moins d\'espacement',
      modifications: {}
    }
  ],
  thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal de l\'appel à l\'action',
      required: true,
      defaultValue: 'Prêt à démarrer votre projet ?',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le titre'
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre optionnel',
      defaultValue: 'Contactez-nous dès aujourd\'hui pour un devis gratuit',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le sous-titre'},
      required: false
    },
    {
      name: 'primaryButtonText',
      type: PropType.STRING,
      description: 'Texte du bouton principal',
      defaultValue: 'Demander un devis',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Texte du bouton'},
      required: false
    },
    {
      name: 'primaryButtonLink',
      type: PropType.STRING,
      description: 'URL du bouton principal',
      defaultValue: '#contact',
      editorConfig: {
        control: EditorControl.LINK_PICKER},
      required: false
    },
    {
      name: 'secondaryButtonText',
      type: PropType.STRING,
      description: 'Texte du bouton secondaire (optionnel)',
      defaultValue: 'Nous appeler',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Texte du bouton secondaire'},
      required: false
    },
    {
      name: 'secondaryButtonLink',
      type: PropType.STRING,
      description: 'URL du bouton secondaire',
      defaultValue: 'tel:0123456789',
      editorConfig: {
        control: EditorControl.LINK_PICKER},
      required: false
    },
    {
      name: 'backgroundImage',
      type: PropType.STRING,
      description: 'Image de fond optionnelle',
      defaultValue: '',
      editorConfig: {
        control: EditorControl.IMAGE_PICKER},
      required: false
    }
  ],
  defaultProps: {
    title: 'Prêt à démarrer votre projet ?',
    subtitle: 'Contactez-nous dès aujourd\'hui pour un devis gratuit',
    primaryButtonText: 'Demander un devis',
    primaryButtonLink: '#contact',
    secondaryButtonText: 'Nous appeler',
    secondaryButtonLink: 'tel:0123456789'
  }
};

export function renderCtaClean(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const hasGradient = variants.includes('gradient');
  const isDark = variants.includes('dark');
  const isCompact = variants.includes('compact');
  
  const html = `
    <section class="cta-section ${hasGradient ? 'cta-section--gradient' : ''} ${isDark ? 'cta-section--dark' : ''} ${isCompact ? 'cta-section--compact' : ''}" ${props.backgroundImage ? `style="background-image: url('${props.backgroundImage}');"` : ''}>
      ${props.backgroundImage ? '<div class="cta-overlay"></div>' : ''}
      <div class="cta-container">
        <div class="cta-content">
          <h2 class="cta-title">${props.title}</h2>
          ${props.subtitle ? `<p class="cta-subtitle">${props.subtitle}</p>` : ''}
          <div class="cta-buttons">
            <a href="${props.primaryButtonLink}" class="btn btn-primary btn-lg">
              ${props.primaryButtonText}
            </a>
            ${props.secondaryButtonText ? `
              <a href="${props.secondaryButtonLink}" class="btn btn-secondary btn-lg">
                ${props.secondaryButtonText}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  `;

  const css = `
    .cta-section {
      padding: 5rem 0;
      position: relative;
      background-color: var(--color-primary);
      color: white;
      text-align: center;
      overflow: hidden;
    }

    .cta-section--gradient {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-700) 100%);
    }

    .cta-section--dark {
      background-color: #1a1a1a;
    }

    .cta-section--compact {
      padding: 3rem 0;
    }

    .cta-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }

    .cta-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1.5rem;
      position: relative;
      z-index: 2;
    }

    .cta-content {
      animation: fadeIn 0.8s ease-out;
    }

    .cta-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: white;
    }

    .cta-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      color: white;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-section .btn-primary {
      background: white;
      color: var(--color-primary);
      border: 2px solid white;
    }

    .cta-section .btn-primary:hover {
      background: transparent;
      color: white;
    }

    .cta-section .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .cta-section .btn-secondary:hover {
      background: white;
      color: var(--color-primary);
    }

    .cta-section--dark .btn-secondary:hover {
      color: #1a1a1a;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .cta-title {
        font-size: 2rem;
      }

      .cta-subtitle {
        font-size: 1.125rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .cta-buttons .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `;

  const criticalCSS = `
    .cta-section { padding: 5rem 0; background-color: var(--color-primary); color: white; text-align: center; }
    .cta-container { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
    .cta-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
    .cta-buttons { display: flex; gap: 1rem; justify-content: center; }
  `;

  return {
    html,
    css,
    js: '',
    criticalCSS,
    dependencies: []
  };
}
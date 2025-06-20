import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';
import { renderIcon } from '../../utils/icons';

export const featuresIconGrid: Block = {
  id: 'features-icon-grid',
  name: 'Icon Grid Features',
  description: 'Grid layout with icons and feature descriptions',
  category: BlockCategory.FEATURES,
  tags: ['features', 'grid', 'icons', 'benefits', 'services'],
  thumbnail: '/blocks/features-icon-grid.jpg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Section title',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Enter title',
        group: 'Content',
        order: 1
      }
    },
    {
      name: 'features',
      type: PropType.STRING,
      description: 'List of features',
      defaultValue: JSON.stringify([
        {
          icon: 'shield-check',
          title: 'Trusted & Reliable',
          description: '10+ years of excellence in service delivery'
        }
      ]),
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Features',
        order: 2
      },
      required: false
    }
  ],
  variants: [
    {
      id: 'cards',
      name: 'Card Style',
      description: 'Features in card containers',
      modifications: {
        style: 'cards'
      }
    }
  ],
  defaultProps: {
    title: 'Why Choose Us',
    features: JSON.stringify([
      {
        icon: 'shield-check',
        title: 'Trusted & Reliable',
        description: '10+ years of excellence in service delivery'
      }
    ])
  },
  dependencies: []
};

export function renderFeaturesIconGrid(props: any, variants: string[] = []): RenderedBlock {
  const isCards = variants.includes('cards');
  
  // Build HTML
  let featuresHtml = '';
  const featuresArray = props.features ? JSON.parse(props.features) : [];
  if (featuresArray && Array.isArray(featuresArray)) {
    featuresArray.forEach((feature: any) => {
      featuresHtml += `
        <div class="features-icon-grid__item">
          <div class="features-icon-grid__icon-wrapper">
            ${feature.icon ? renderIcon(feature.icon, 'features-icon-grid__icon', 48) : renderIcon('shield-check', 'features-icon-grid__icon', 48)}
          </div>
          <h3 class="features-icon-grid__item-title">${feature.title}</h3>
          <p class="features-icon-grid__item-description">${feature.description}</p>
        </div>
      `;
    });
  }
  
  const html = `
    <section class="features-icon-grid ${isCards ? 'features-icon-grid--cards' : ''}" role="region" aria-label="Features">
      <div class="container">
        ${props.title ? `
          <div class="features-icon-grid__header">
            <h2 class="features-icon-grid__title">${props.title}</h2>
          </div>
        ` : ''}
        
        <div class="features-icon-grid__grid">
          ${featuresHtml}
        </div>
      </div>
    </section>
  `;

  const css = `
    .features-icon-grid {
      padding: 5rem 0;
      background: var(--color-background, #ffffff);
    }

    .features-icon-grid__header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .features-icon-grid__title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-text, #1a1a1a);
    }

    .features-icon-grid__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 3rem;
    }

    .features-icon-grid__item {
      text-align: center;
    }

    .features-icon-grid__icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary-light, #e0f2fe);
      border-radius: 1rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .features-icon-grid__icon {
      width: 3rem;
      height: 3rem;
      color: var(--color-primary, #3b82f6);
    }

    .features-icon-grid__item-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--color-text, #1a1a1a);
    }

    .features-icon-grid__item-description {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: var(--color-text-secondary, #666);
    }

    .features-icon-grid--cards .features-icon-grid__item {
      background: var(--color-surface, #f8f9fa);
      padding: 2.5rem;
      border-radius: 1rem;
      transition: all 0.3s ease;
    }

    .features-icon-grid--cards .features-icon-grid__item:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .features-icon-grid {
        padding: 3rem 0;
      }
      
      .features-icon-grid__grid {
        gap: 2rem;
      }
    }
  `;

  const criticalCSS = `
    .features-icon-grid { padding: 5rem 0; }
    .features-icon-grid__grid { display: grid; gap: 3rem; }
    .features-icon-grid__icon-wrapper { display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
    .features-icon-grid__icon { width: 3rem; height: 3rem; color: var(--color-primary, #3b82f6); }
  `;

  return {
    html,
    css,
    criticalCSS,
    js: '',
    dependencies: []
  };
}
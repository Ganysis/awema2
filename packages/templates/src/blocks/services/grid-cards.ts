import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock, DependencyType } from '@awema/shared';
import { renderIcon } from '../../utils/icons';

export const servicesGridCards: Block = {
  id: 'services-grid-cards',
  name: 'Services Grid Cards',
  description: 'Display services in a responsive grid layout with cards',
  category: BlockCategory.FEATURES,
  tags: ['services', 'features', 'grid', 'cards'],
  thumbnail: '/blocks/services-grid-cards.jpg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Section title',
      required: true,
      defaultValue: 'Our Services',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Enter section title',
        group: 'Content',
        order: 1
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Section subtitle',
      required: false,
      defaultValue: 'Professional solutions for every need',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Enter subtitle',
        group: 'Content',
        order: 2
      }
    },
    {
      name: 'services',
      type: PropType.STRING,
      description: 'List of services',
      required: true,
      defaultValue: JSON.stringify([
        {
          icon: 'wrench',
          title: 'Installation',
          description: 'Professional installation services with warranty',
          link: '#'
        },
        {
          icon: 'tools',
          title: 'Repair',
          description: 'Quick and reliable repair services',
          link: '#'
        },
        {
          icon: 'shield-check',
          title: 'Maintenance',
          description: 'Regular maintenance to prevent issues',
          link: '#'
        }
      ]),
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Services',
        order: 3,
        helpText: 'Format JSON: [{icon, title, description, link}, ...]'
      }
    },
    {
      name: 'columns',
      type: PropType.NUMBER,
      description: 'Number of columns (2-4)',
      required: false,
      defaultValue: 3,
      validation: {
        min: 2,
        max: 4
      },
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Layout',
        order: 4
      }
    },
    {
      name: 'showIcons',
      type: PropType.BOOLEAN,
      description: 'Show service icons',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Display',
        order: 5
      }
    },
    {
      name: 'showLinks',
      type: PropType.BOOLEAN,
      description: 'Show "Learn More" links',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Display',
        order: 6
      }
    }
  ],
  variants: [
    {
      id: 'bordered',
      name: 'Bordered Cards',
      description: 'Cards with borders',
      modifications: {
        cardStyle: 'bordered'
      }
    },
    {
      id: 'shadow',
      name: 'Shadow Cards',
      description: 'Cards with shadow effect',
      modifications: {
        cardStyle: 'shadow'
      }
    },
    {
      id: 'hover-lift',
      name: 'Hover Lift',
      description: 'Cards lift on hover',
      modifications: {
        hoverEffect: 'lift'
      }
    },
    {
      id: 'colored-icons',
      name: 'Colored Icons',
      description: 'Use primary color for icons',
      modifications: {
        iconStyle: 'colored'
      }
    }
  ],
  defaultProps: {
    title: 'Our Services',
    subtitle: 'Professional solutions for every need',
    columns: 3,
    showIcons: true,
    showLinks: true
  }
};

export function renderServicesGridCards(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const hasBorders = variants.includes('bordered');
  const hasShadow = variants.includes('shadow');
  const hasHoverLift = variants.includes('hover-lift');
  const hasColoredIcons = variants.includes('colored-icons');
  
  // Parse services if it's a string
  const services = typeof props.services === 'string' ? JSON.parse(props.services) : props.services;

  const cardClasses = [
    'service-card',
    hasBorders && 'service-card--bordered',
    hasShadow && 'service-card--shadow',
    hasHoverLift && 'service-card--hover-lift'
  ].filter(Boolean).join(' ');

  const iconClasses = [
    'service-icon',
    hasColoredIcons && 'service-icon--colored'
  ].filter(Boolean).join(' ');

  const html = `
    <section class="services-grid" aria-labelledby="services-title">
      <div class="services-container">
        <div class="services-header">
          <h2 id="services-title" class="services-title">${props.title}</h2>
          ${props.subtitle ? `<p class="services-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="services-grid-wrapper" data-columns="${props.columns}">
          ${services.map((service: any, index: number) => `
            <article class="${cardClasses}" data-aos="fade-up" data-aos-delay="${index * 100}">
              ${props.showIcons && service.icon ? `
                <div class="${iconClasses}">
                  ${renderIcon(service.icon, 'icon', 48)}
                </div>
              ` : ''}
              <h3 class="service-title">${service.title}</h3>
              <p class="service-description">${service.description}</p>
              ${props.showLinks && service.link ? `
                <a href="${service.link}" class="service-link" aria-label="Learn more about ${service.title}">
                  Learn More
                  <svg class="icon-arrow" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              ` : ''}
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .services-grid {
      padding: 5rem 0;
      background-color: var(--color-background-alt, #f8f9fa);
    }

    .services-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .services-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .services-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .services-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .services-grid-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .services-grid-wrapper[data-columns="2"] {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }

    .services-grid-wrapper[data-columns="4"] {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .service-card {
      background: var(--color-background);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .service-card--bordered {
      border: 1px solid var(--color-border);
    }

    .service-card--shadow {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .service-card--hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .service-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background-color: var(--color-background-alt);
      border-radius: var(--border-radius);
      margin-bottom: 1.5rem;
      color: var(--color-text-secondary);
    }

    .service-icon--colored {
      background-color: var(--color-primary-light);
      color: var(--color-primary);
    }

    .service-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .service-description {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-primary);
      font-weight: 600;
      text-decoration: none;
      transition: gap 0.3s ease;
    }

    .service-link:hover {
      gap: 0.75rem;
    }

    .icon-arrow {
      transition: transform 0.3s ease;
    }

    .service-link:hover .icon-arrow {
      transform: translateX(2px);
    }

    @media (max-width: 768px) {
      .services-grid {
        padding: 3rem 0;
      }

      .services-grid-wrapper {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .service-card {
        padding: 1.5rem;
      }
    }
  `;

  const criticalCSS = `
    .services-grid {
      padding: 5rem 0;
      background-color: var(--color-background-alt, #f8f9fa);
    }
    .services-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .services-grid-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .service-card {
      background: var(--color-background);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
    }
  `;

  return {
    html,
    css,
    criticalCSS,
    dependencies: [
      {
        type: DependencyType.ICON,
        resource: 'feather-icons',
        critical: false
      }
    ]
  };
}
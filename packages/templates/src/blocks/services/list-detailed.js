import { BlockCategory, PropType, EditorControl, PerformanceImpact, DependencyType } from '@awema/shared';
export const servicesListDetailed = {
    id: 'services-list-detailed',
    name: 'Services Detailed List',
    description: 'Display services in a detailed list format with images',
    category: BlockCategory.FEATURES,
    tags: ['services', 'features', 'list', 'detailed'],
    thumbnail: '/blocks/services-list-detailed.jpg',
    performanceImpact: PerformanceImpact.MEDIUM,
    props: [
        {
            name: 'title',
            type: PropType.STRING,
            description: 'Section title',
            required: true,
            defaultValue: 'What We Offer',
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
            defaultValue: 'Complete solutions for your needs',
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
            description: 'List of detailed services',
            required: true,
            defaultValue: JSON.stringify([
                {
                    title: 'Professional Installation',
                    description: 'Our certified technicians provide expert installation services with attention to detail and quality workmanship.',
                    features: ['Licensed professionals', '24/7 availability', 'Warranty included'],
                    image: '/service-installation.jpg',
                    imageAlt: 'Professional installation service',
                    price: 'From $99',
                    link: '#'
                },
                {
                    title: 'Emergency Repairs',
                    description: 'Fast response times for urgent repairs. We understand that emergencies happen at the worst times.',
                    features: ['30-minute response', 'Fixed pricing', 'Quality guarantee'],
                    image: '/service-repair.jpg',
                    imageAlt: 'Emergency repair service',
                    price: 'From $149',
                    link: '#'
                }
            ]),
            editorConfig: {
                control: EditorControl.TEXTAREA,
                group: 'Services',
                order: 3,
                helpText: 'Format JSON: [{title, description, features, image, imageAlt, price, link}, ...]'
            }
        },
        {
            name: 'showPricing',
            type: PropType.BOOLEAN,
            description: 'Show pricing information',
            required: false,
            defaultValue: true,
            editorConfig: {
                control: EditorControl.TOGGLE,
                group: 'Display',
                order: 4
            }
        },
        {
            name: 'showFeatures',
            type: PropType.BOOLEAN,
            description: 'Show feature lists',
            required: false,
            defaultValue: true,
            editorConfig: {
                control: EditorControl.TOGGLE,
                group: 'Display',
                order: 5
            }
        },
        {
            name: 'ctaText',
            type: PropType.STRING,
            description: 'Call to action button text',
            required: false,
            defaultValue: 'Get Quote',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Button text',
                group: 'CTA',
                order: 6
            }
        }
    ],
    variants: [
        {
            id: 'alternating',
            name: 'Alternating Layout',
            description: 'Alternate image position for each service',
            modifications: {
                layout: 'alternating'
            }
        },
        {
            id: 'compact',
            name: 'Compact View',
            description: 'Reduced spacing and smaller images',
            modifications: {
                size: 'compact'
            }
        },
        {
            id: 'accent-features',
            name: 'Accent Features',
            description: 'Highlight features with accent color',
            modifications: {
                featureStyle: 'accent'
            }
        }
    ],
    defaultProps: {
        title: 'What We Offer',
        subtitle: 'Complete solutions for your needs',
        showPricing: true,
        showFeatures: true,
        ctaText: 'Get Quote'
    }
};
export function renderServicesListDetailed(props, variants = []) {
    const isAlternating = variants.includes('alternating');
    const isCompact = variants.includes('compact');
    const hasAccentFeatures = variants.includes('accent-features');
    // Parse services if it's a string
    const services = typeof props.services === 'string' ? JSON.parse(props.services) : props.services;
    const html = `
    <section class="services-list ${isCompact ? 'services-list--compact' : ''}" aria-labelledby="services-list-title">
      <div class="services-list-container">
        <div class="services-list-header">
          <h2 id="services-list-title" class="services-list-title">${props.title}</h2>
          ${props.subtitle ? `<p class="services-list-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="services-list-items">
          ${services.map((service, index) => {
        const isEven = index % 2 === 0;
        const shouldReverse = isAlternating && !isEven;
        return `
              <article class="service-item ${shouldReverse ? 'service-item--reversed' : ''}" data-aos="fade-up">
                <div class="service-item-image">
                  <img 
                    src="${service.image}" 
                    alt="${service.imageAlt || service.title}"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </div>
                <div class="service-item-content">
                  <h3 class="service-item-title">${service.title}</h3>
                  ${props.showPricing && service.price ? `
                    <div class="service-item-price">${service.price}</div>
                  ` : ''}
                  <p class="service-item-description">${service.description}</p>
                  ${props.showFeatures && service.features ? `
                    <ul class="service-item-features ${hasAccentFeatures ? 'service-item-features--accent' : ''}">
                      ${service.features.map((feature) => `
                        <li>
                          <svg class="icon" width="20" height="20" fill="currentColor">
                            <use href="#icon-check"></use>
                          </svg>
                          <span>${feature}</span>
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                  ${props.ctaText && service.link ? `
                    <a href="${service.link}" class="btn btn-primary">${props.ctaText}</a>
                  ` : ''}
                </div>
              </article>
            `;
    }).join('')}
        </div>
      </div>
    </section>
  `;
    const css = `
    .services-list {
      padding: 5rem 0;
      background-color: var(--color-background);
    }

    .services-list--compact {
      padding: 3rem 0;
    }

    .services-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .services-list-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .services-list-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .services-list-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .services-list-items {
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .services-list--compact .services-list-items {
      gap: 2rem;
    }

    .service-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      padding: 2rem;
      background: var(--color-background-alt);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
    }

    .services-list--compact .service-item {
      padding: 1.5rem;
      gap: 2rem;
    }

    .service-item--reversed {
      direction: rtl;
    }

    .service-item--reversed > * {
      direction: ltr;
    }

    .service-item-image {
      position: relative;
      overflow: hidden;
      border-radius: var(--border-radius);
    }

    .service-item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .service-item:hover .service-item-image img {
      transform: scale(1.05);
    }

    .service-item-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .service-item-title {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
      line-height: 1.2;
      color: var(--color-text);
    }

    .service-item-price {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-primary);
    }

    .service-item-description {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
    }

    .service-item-features {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .service-item-features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      color: var(--color-text-secondary);
    }

    .service-item-features .icon {
      flex-shrink: 0;
      color: var(--color-success);
    }

    .service-item-features--accent .icon {
      color: var(--color-accent);
    }

    .service-item .btn {
      align-self: flex-start;
      margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
      .services-list-items {
        gap: 3rem;
      }

      .service-item {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 1.5rem;
      }

      .service-item--reversed {
        direction: ltr;
      }

      .service-item-image {
        max-height: 250px;
      }

      .service-item-content {
        gap: 1rem;
      }

      .service-item .btn {
        width: 100%;
        text-align: center;
      }
    }
  `;
    const criticalCSS = `
    .services-list {
      padding: 5rem 0;
    }
    .services-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .service-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      padding: 2rem;
      background: var(--color-background-alt);
      border-radius: var(--border-radius-lg);
    }
    .service-item-title {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
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

import { Block, BlockCategory, PropType, EditorControl, RenderedBlock, PerformanceImpact } from '@awema/shared';

export const pricingClean: Block = {
  id: 'pricing-clean',
  name: 'Tarifs',
  description: 'Grille de tarifs professionnelle',
  category: BlockCategory.PRICING,
  tags: ['pricing', 'tarifs', 'plans', 'clean'],
  variants: [
    {
      id: 'gray-background',
      name: 'Fond gris',
      description: 'Ajoute un fond gris à la section',
      modifications: {}
    }
  ],
  thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section tarifs',
      required: true,
      defaultValue: 'Nos Tarifs',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le titre'
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre optionnel',
      required: false,
      defaultValue: 'Des prix transparents et compétitifs',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le sous-titre'
      }
    },
    {
      name: 'plans',
      type: PropType.STRING,
      description: 'Liste des plans tarifaires',
      required: true,
      defaultValue: JSON.stringify([
        {
          name: 'Essentiel',
          price: 'à partir de 50€',
          period: '/intervention',
          description: 'Idéal pour les petites réparations',
          features: [
            'Déplacement inclus',
            'Devis gratuit',
            'Intervention rapide',
            'Garantie 6 mois'
          ],
          highlighted: false,
          ctaText: 'Demander un devis',
          ctaLink: '#contact'
        },
        {
          name: 'Standard',
          price: 'à partir de 150€',
          period: '/journée',
          description: 'Pour vos travaux de rénovation',
          features: [
            'Tout du plan Essentiel',
            'Matériel professionnel',
            'Garantie 1 an',
            'Service prioritaire',
            'Conseils personnalisés'
          ],
          highlighted: true,
          ctaText: 'Choisir ce plan',
          ctaLink: '#contact'
        },
        {
          name: 'Premium',
          price: 'Sur devis',
          period: '',
          description: 'Projets complets sur mesure',
          features: [
            'Tout du plan Standard',
            'Chef de projet dédié',
            'Garantie 2 ans',
            'Service 24/7',
            'Suivi personnalisé',
            'Maintenance incluse'
          ],
          highlighted: false,
          ctaText: 'Nous contacter',
          ctaLink: '#contact'
        }
      ]),
      validation: {
        min: 1,
        max: 6
      },
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Format JSON pour les plans tarifaires',
        helpText: 'Chaque plan doit avoir: name, price, period, description, features, highlighted, ctaText, ctaLink'
      }
    }
  ],
  defaultProps: {
    title: 'Nos Tarifs',
    subtitle: 'Des prix transparents et compétitifs',
    plans: JSON.stringify([
      {
        name: 'Essentiel',
        price: 'à partir de 50€',
        period: '/intervention',
        description: 'Idéal pour les petites réparations',
        features: [
          'Déplacement inclus',
          'Devis gratuit',
          'Intervention rapide',
          'Garantie 6 mois'
        ],
        highlighted: false,
        ctaText: 'Demander un devis',
        ctaLink: '#contact'
      },
      {
        name: 'Standard',
        price: 'à partir de 150€',
        period: '/journée',
        description: 'Pour vos travaux de rénovation',
        features: [
          'Tout du plan Essentiel',
          'Matériel professionnel',
          'Garantie 1 an',
          'Service prioritaire',
          'Conseils personnalisés'
        ],
        highlighted: true,
        ctaText: 'Choisir ce plan',
        ctaLink: '#contact'
      },
      {
        name: 'Premium',
        price: 'Sur devis',
        period: '',
        description: 'Projets complets sur mesure',
        features: [
          'Tout du plan Standard',
          'Chef de projet dédié',
          'Garantie 2 ans',
          'Service 24/7',
          'Suivi personnalisé',
          'Maintenance incluse'
        ],
        highlighted: false,
        ctaText: 'Nous contacter',
        ctaLink: '#contact'
      }
    ])
  }
};

export function renderPricingClean(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const hasBackground = variants.includes('gray-background');
  
  // Parse plans if it's a string
  const plans = typeof props.plans === 'string' ? JSON.parse(props.plans) : props.plans;
  
  const html = `
    <section class="pricing-section ${hasBackground ? 'pricing-section--gray' : ''}">
      <div class="pricing-container">
        <div class="pricing-header">
          <h2 class="pricing-title">${props.title}</h2>
          ${props.subtitle ? `<p class="pricing-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="pricing-grid pricing-grid--${plans.length}">
          ${plans.map((plan: any, index: number) => `
            <div class="pricing-card ${plan.highlighted ? 'pricing-card--highlighted' : ''}" data-aos="fade-up" data-aos-delay="${index * 100}">
              ${plan.highlighted ? '<div class="pricing-badge">Populaire</div>' : ''}
              <div class="pricing-card-header">
                <h3 class="pricing-plan-name">${plan.name}</h3>
                <div class="pricing-price">
                  <span class="pricing-amount">${plan.price}</span>
                  ${plan.period ? `<span class="pricing-period">${plan.period}</span>` : ''}
                </div>
                <p class="pricing-description">${plan.description}</p>
              </div>
              <div class="pricing-card-body">
                <ul class="pricing-features">
                  ${plan.features.map((feature: string) => `
                    <li class="pricing-feature">
                      <svg class="pricing-feature-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      ${feature}
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="pricing-card-footer">
                <a href="${plan.ctaLink}" class="btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}">
                  ${plan.ctaText}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .pricing-section {
      padding: 5rem 0;
      position: relative;
    }

    .pricing-section--gray {
      background-color: #f8f9fa;
    }

    .pricing-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .pricing-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .pricing-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .pricing-subtitle {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
    }

    .pricing-grid {
      display: grid;
      gap: 2rem;
      align-items: start;
    }

    .pricing-grid--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .pricing-grid--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .pricing-grid--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .pricing-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 2rem;
      position: relative;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .pricing-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .pricing-card--highlighted {
      border-color: var(--color-primary);
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .pricing-card--highlighted:hover {
      transform: scale(1.05) translateY(-5px);
    }

    .pricing-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-primary);
      color: white;
      padding: 0.25rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .pricing-card-header {
      text-align: center;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 2rem;
    }

    .pricing-plan-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .pricing-price {
      margin-bottom: 1rem;
    }

    .pricing-amount {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .pricing-period {
      font-size: 1rem;
      color: var(--color-text-secondary);
      margin-left: 0.5rem;
    }

    .pricing-description {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
    }

    .pricing-card-body {
      flex: 1;
      margin-bottom: 2rem;
    }

    .pricing-features {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .pricing-feature {
      display: flex;
      align-items: center;
      padding: 0.75rem 0;
      color: var(--color-text-secondary);
    }

    .pricing-feature-icon {
      color: var(--color-success);
      margin-right: 0.75rem;
      flex-shrink: 0;
    }

    .pricing-card-footer {
      margin-top: auto;
    }

    .pricing-card-footer .btn {
      width: 100%;
      justify-content: center;
    }

    @media (max-width: 1024px) {
      .pricing-grid--4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .pricing-grid--2,
      .pricing-grid--3,
      .pricing-grid--4 {
        grid-template-columns: 1fr;
      }

      .pricing-card--highlighted {
        transform: none;
      }

      .pricing-title {
        font-size: 2rem;
      }
    }
  `;

  const criticalCSS = `
    .pricing-section { padding: 5rem 0; }
    .pricing-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .pricing-grid { display: grid; gap: 2rem; }
    .pricing-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .pricing-card { background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 2rem; }
    @media (max-width: 768px) { .pricing-grid--3 { grid-template-columns: 1fr; } }
  `;

  return {
    html,
    css,
    js: '',
    criticalCSS,
    dependencies: []
  };
}
import { BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';
export const featuresClean = {
    id: 'features-clean',
    name: 'Points Forts',
    description: 'Grille de points forts avec icônes',
    category: BlockCategory.FEATURES,
    tags: ['features', 'grid', 'icons', 'clean'],
    variants: [
        {
            id: 'gray-background',
            name: 'Fond gris',
            description: 'Ajoute un fond gris à la section',
            modifications: {}
        },
        {
            id: 'centered',
            name: 'Centré',
            description: 'Centre le titre et le sous-titre',
            modifications: {}
        }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400',
    performanceImpact: PerformanceImpact.LOW,
    props: [
        {
            name: 'title',
            type: PropType.STRING,
            description: 'Titre principal de la section',
            defaultValue: 'Pourquoi Nous Choisir',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Entrez le titre'
            },
            required: false
        },
        {
            name: 'subtitle',
            type: PropType.STRING,
            description: 'Sous-titre optionnel',
            defaultValue: 'Des services de qualité pour tous vos besoins',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Entrez le sous-titre'
            },
            required: false
        },
        {
            name: 'features',
            type: PropType.STRING,
            description: 'Liste des points forts avec leurs icônes',
            defaultValue: JSON.stringify([
                {
                    icon: 'shield-check',
                    title: 'Garantie 10 ans',
                    description: 'Tous nos travaux sont garantis'
                },
                {
                    icon: 'clock',
                    title: 'Intervention rapide',
                    description: 'Disponible 7j/7 pour vos urgences'
                },
                {
                    icon: 'currency-euro',
                    title: 'Prix transparents',
                    description: 'Devis gratuit et sans surprise'
                }
            ]),
            validation: {
                min: 1,
                max: 8
            },
            editorConfig: {
                control: EditorControl.TEXTAREA,
                placeholder: 'Format JSON pour les points forts',
                helpText: 'Chaque point fort doit avoir: icon, title, description'
            },
            required: false
        },
        {
            name: 'columns',
            type: PropType.NUMBER,
            description: 'Nombre de colonnes pour la grille',
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
        title: 'Pourquoi Nous Choisir',
        subtitle: 'Des services de qualité pour tous vos besoins',
        columns: 3,
        features: JSON.stringify([
            {
                icon: 'shield-check',
                title: 'Garantie 10 ans',
                description: 'Tous nos travaux sont garantis'
            },
            {
                icon: 'clock',
                title: 'Intervention rapide',
                description: 'Disponible 7j/7 pour vos urgences'
            },
            {
                icon: 'currency-euro',
                title: 'Prix transparents',
                description: 'Devis gratuit et sans surprise'
            }
        ])
    }
};
const iconSvgs = {
    'shield-check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
    'clock': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
    'currency-euro': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />',
    'check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />',
    'star': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />'
};
export function renderFeaturesClean(props, variants = []) {
    const hasBackground = variants.includes('gray-background');
    const isCentered = variants.includes('centered');
    const html = `
    <section class="features-section ${hasBackground ? 'features-section--gray' : ''}">
      <div class="features-container">
        <div class="features-header ${isCentered ? 'features-header--centered' : ''}">
          <h2 class="features-title">${props.title}</h2>
          ${props.subtitle ? `<p class="features-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="features-grid features-grid--${props.columns}">
          ${JSON.parse(props.features).map((feature, index) => `
            <div class="feature-item" data-aos="fade-up" data-aos-delay="${index * 100}">
              <div class="feature-icon">
                <svg class="feature-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  ${iconSvgs[feature.icon] || iconSvgs['check']}
                </svg>
              </div>
              <h3 class="feature-title">${feature.title}</h3>
              <p class="feature-description">${feature.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
    const css = `
    .features-section {
      padding: 5rem 0;
      position: relative;
    }

    .features-section--gray {
      background-color: #f8f9fa;
    }

    .features-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .features-header {
      margin-bottom: 3rem;
    }

    .features-header--centered {
      text-align: center;
    }

    .features-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .features-subtitle {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
      max-width: 600px;
    }

    .features-header--centered .features-subtitle {
      margin: 0 auto;
    }

    .features-grid {
      display: grid;
      gap: 2rem;
    }

    .features-grid--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .features-grid--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .features-grid--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .feature-item {
      padding: 2rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .feature-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      width: 3rem;
      height: 3rem;
      background: var(--color-primary-100);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .feature-icon-svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--color-primary);
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--color-text);
    }

    .feature-description {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }

    @media (max-width: 1024px) {
      .features-grid--4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .features-grid--2,
      .features-grid--3,
      .features-grid--4 {
        grid-template-columns: 1fr;
      }

      .features-title {
        font-size: 2rem;
      }
    }
  `;
    const criticalCSS = `
    .features-section { padding: 5rem 0; }
    .features-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .features-grid { display: grid; gap: 2rem; }
    .features-grid--3 { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 768px) { .features-grid--3 { grid-template-columns: 1fr; } }
  `;
    return {
        html,
        css,
        js: '',
        criticalCSS,
        dependencies: []
    };
}

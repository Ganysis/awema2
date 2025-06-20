import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';

export const featuresMultiStyle: Block = {
  id: 'features-multi-style',
  name: 'Points Forts / Avantages',
  description: 'Section avantages avec multiples styles de présentation',
  category: BlockCategory.FEATURES,
  tags: [],
  thumbnail: '/blocks/placeholder.png',
  performanceImpact: PerformanceImpact.LOW,
  variants: [],
  props: [
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Layout',
      defaultValue: 'grid-icons',
      required: true,
      validation: {
        options: [
          { label: 'Grille avec icônes', value: 'grid-icons' },
          { label: 'Cartes modernes', value: 'cards-modern' },
          { label: 'Liste avec badges', value: 'list-badges' },
          { label: 'Boîtes colorées', value: 'boxes-colored' },
          { label: 'Timeline verticale', value: 'timeline-vertical' },
          { label: 'Hexagones', value: 'hexagon-grid' },
          { label: 'Cartes superposées', value: 'cards-overlap' },
          { label: 'Icônes circulaires', value: 'circular-icons' },
          { label: 'Blocs alternés', value: 'alternating-blocks' },
          { label: 'Metro style', value: 'metro-tiles' }
        ]
      }
    },
    {
      name: 'columns',
      type: PropType.STRING,
      description: 'Columns',
      defaultValue: '3',
      required: true,
      validation: {
        options: [
          { label: '2 colonnes', value: '2' },
          { label: '3 colonnes', value: '3' },
          { label: '4 colonnes', value: '4' },
          { label: '5 colonnes', value: '5' },
          { label: '6 colonnes', value: '6' }
        ]
      }
    },
    {
      name: 'sectionTitle',
      type: PropType.STRING,
      description: 'Section Title',
      defaultValue: 'Nos Points Forts',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'sectionSubtitle',
      type: PropType.STRING,
      description: 'Section Subtitle',
      defaultValue: 'Découvrez ce qui nous différencie',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'features',
      type: PropType.STRING,
      description: 'Features',
      defaultValue: [
        {
          icon: 'shield-check',
          title: 'Garantie 10 ans',
          description: 'Tous nos travaux sont garantis pendant 10 ans',
          color: 'blue'
        },
        {
          icon: 'clock',
          title: 'Délais respectés',
          description: 'Nous respectons les délais convenus',
          color: 'green'
        },
        {
          icon: 'currency-euro',
          title: 'Prix transparents',
          description: 'Devis détaillé sans surprise',
          color: 'purple'
        }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{...}, {...}]'
      }
    },
    {
      name: 'showNumbers',
      type: PropType.STRING,
      description: 'Show Numbers',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE
      }
    },
    {
      name: 'iconStyle',
      type: PropType.STRING,
      description: 'Icon Style',
      defaultValue: 'solid',
      required: true,
      validation: {
        options: [
          { label: 'Solide', value: 'solid' },
          { label: 'Contour', value: 'outline' },
          { label: 'Duo-tone', value: 'duotone' },
          { label: 'Gradient', value: 'gradient' }
        ]
      }
    },
    {
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Background Color',
      defaultValue: 'white',
      required: true,
      validation: {
        options: [
          { label: 'Blanc', value: 'white' },
          { label: 'Gris clair', value: 'gray-light' },
          { label: 'Dégradé subtil', value: 'gradient-subtle' },
          { label: 'Pattern géométrique', value: 'pattern-geo' },
          { label: 'Vagues', value: 'waves' }
        ]
      }
    },
    {
      name: 'animation',
      type: PropType.STRING,
      description: 'Animation',
      defaultValue: 'fade-up',
      required: true,
      validation: {
        options: [
          { label: 'Aucune', value: 'none' },
          { label: 'Fade up', value: 'fade-up' },
          { label: 'Zoom in', value: 'zoom-in' },
          { label: 'Flip', value: 'flip' },
          { label: 'Slide', value: 'slide' }
        ]
      }
    }
  ],
  defaultProps: {
    layout: 'grid-icons',
    columns: '3',
    sectionTitle: 'Nos Points Forts',
    features: [
      {
        icon: 'shield-check',
        title: 'Garantie 10 ans',
        description: 'Tous nos travaux sont garantis',
        color: 'blue'
      }
    ]
  }
};

// Icon mapping
const iconSvgs: Record<string, string> = {
  'shield-check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
  'clock': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
  'currency-euro': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />',
  'star': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />',
  'thumb-up': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />',
  'lightning-bolt': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  'heart': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />',
  'users': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />',
  'chart-bar': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
  'key': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />',
  'light-bulb': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
  'target': '<circle cx="12" cy="12" r="3" stroke-width="2"/><circle cx="12" cy="12" r="8" stroke-width="2"/><line x1="12" y1="2" x2="12" y2="4" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="22" stroke-width="2"/><line x1="2" y1="12" x2="4" y2="12" stroke-width="2"/><line x1="20" y1="12" x2="22" y2="12" stroke-width="2"/>'
};

export function renderFeaturesMultiStyle(props: any): any {
  const {
    layout = 'grid-icons',
    columns = '3',
    sectionTitle,
    sectionSubtitle,
    features = [],
    showNumbers = false,
    iconStyle = 'solid',
    backgroundColor = 'white',
    animation = 'fade-up'
  } = props;

  const backgroundStyles = {
    'white': 'bg-white',
    'gray-light': 'bg-gray-50',
    'gradient-subtle': 'bg-gradient-to-br from-gray-50 to-white',
    'pattern-geo': 'bg-white bg-pattern-geo',
    'waves': 'bg-white bg-waves'
  };

  const colorClasses: Record<string, any> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-400 to-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-400 to-green-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', gradient: 'from-red-400 to-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-400 to-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-400 to-orange-600' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', gradient: 'from-pink-400 to-pink-600' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', gradient: 'from-indigo-400 to-indigo-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200', gradient: 'from-yellow-400 to-yellow-600' }
  };

  const renderIcon = (icon: string, color: string, index: number) => {
    const colors = colorClasses[color] || colorClasses.blue;
    
    if (iconStyle === 'gradient') {
      return `
        <div class="w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient} p-4 text-white">
          <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${iconSvgs[icon] || iconSvgs['star']}
          </svg>
        </div>
      `;
    }
    
    return `
      <div class="w-16 h-16 rounded-full ${iconStyle === 'solid' ? colors.bg : 'bg-white border-2 ' + colors.border} flex items-center justify-center">
        ${showNumbers ? 
          `<span class="text-2xl font-bold ${colors.text}">${index + 1}</span>` :
          `<svg class="w-8 h-8 ${colors.text}" fill="${iconStyle === 'solid' ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            ${iconSvgs[icon] || iconSvgs['star']}
          </svg>`
        }
      </div>
    `;
  };

  const renderFeature = (feature: any, index: number) => {
    const { icon, title, description, color } = feature;
    const colors = colorClasses[color] || colorClasses.blue;

    switch(layout) {
      case 'grid-icons':
        return `
          <div class="text-center" data-aos="${animation}" data-aos-delay="${index * 100}">
            <div class="flex justify-center mb-4">
              ${renderIcon(icon, color, index)}
            </div>
            <h3 class="text-xl font-semibold mb-2">${title}</h3>
            <p class="text-gray-600">${description}</p>
          </div>
        `;
      
      case 'cards-modern':
        return `
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow" data-aos="${animation}" data-aos-delay="${index * 100}">
            <div class="mb-4">
              ${renderIcon(icon, color, index)}
            </div>
            <h3 class="text-xl font-semibold mb-2">${title}</h3>
            <p class="text-gray-600">${description}</p>
          </div>
        `;
      
      case 'boxes-colored':
        return `
          <div class="p-6 rounded-lg ${colors.bg} border ${colors.border}" data-aos="${animation}" data-aos-delay="${index * 100}">
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-4">
                ${renderIcon(icon, color, index)}
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2 ${colors.text}">${title}</h3>
                <p class="text-gray-700">${description}</p>
              </div>
            </div>
          </div>
        `;
      
      case 'list-badges':
        return `
          <div class="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors" data-aos="${animation}" data-aos-delay="${index * 100}">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full ${colors.bg} ${colors.text} font-semibold">
              ${index + 1}
            </span>
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-1">${title}</h3>
              <p class="text-gray-600">${description}</p>
            </div>
          </div>
        `;
      
      case 'hexagon-grid':
        return `
          <div class="hexagon-item" data-aos="${animation}" data-aos-delay="${index * 100}">
            <div class="hexagon ${colors.bg}">
              <div class="hexagon-content">
                <div class="mb-3">
                  <svg class="w-10 h-10 ${colors.text}" fill="currentColor" viewBox="0 0 24 24">
                    ${iconSvgs[icon] || iconSvgs['star']}
                  </svg>
                </div>
                <h3 class="text-lg font-semibold mb-1">${title}</h3>
                <p class="text-sm">${description}</p>
              </div>
            </div>
          </div>
        `;
      
      default:
        return `
          <div class="feature-item" data-aos="${animation}" data-aos-delay="${index * 100}">
            ${renderIcon(icon, color, index)}
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        `;
    }
  };

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
    '5': 'md:grid-cols-2 lg:grid-cols-5',
    '6': 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  return {
    html: `
      <section class="${backgroundStyles[backgroundColor as keyof typeof backgroundStyles]} py-16 md:py-24 features-section features-${layout}">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${sectionTitle}</h2>
            ${sectionSubtitle ? `<p class="text-xl text-gray-600">${sectionSubtitle}</p>` : ''}
          </div>
          
          <div class="grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-8">
            ${features.map((feature: any, index: number) => renderFeature(feature, index)).join('')}
          </div>
        </div>
      </section>
    `,
    css: `
      .bg-pattern-geo {
        background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M20 20v20H0V20H20zM40 20v20H20V20H40z'/%3E%3C/g%3E%3C/svg%3E");
      }
      
      .hexagon {
        position: relative;
        width: 200px;
        height: 110px;
        margin: 55px auto;
        transform: rotate(0deg);
      }
      
      .hexagon-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        padding: 20px;
      }
      
      .features-metro-tiles .feature-item {
        background: #f3f4f6;
        padding: 2rem;
        height: 100%;
        transition: all 0.3s ease;
      }
      
      .features-metro-tiles .feature-item:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      }
    `,
    js: '',
    variants: []
  };
}
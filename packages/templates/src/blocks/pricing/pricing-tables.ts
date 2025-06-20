import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';

export const pricingTables: Block = {
  id: 'pricing-tables',
  name: 'Tarifs / Prix',
  description: 'Tables de prix avec multiples styles de présentation',
  category: BlockCategory.PRICING,
  tags: [],
  thumbnail: '/blocks/placeholder.png',
  performanceImpact: PerformanceImpact.LOW,
  variants: [],
  props: [
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Layout',
      defaultValue: 'cards-classic',
      required: true,
      validation: {
        options: [
          { label: 'Cards classiques', value: 'cards-classic' },
          { label: 'Cards modernes', value: 'cards-modern' },
          { label: 'Table comparative', value: 'table-compare' },
          { label: 'Pricing minimal', value: 'minimal' },
          { label: 'Cards gradient', value: 'cards-gradient' },
          { label: 'Toggle mensuel/annuel', value: 'toggle-period' },
          { label: 'Slider interactif', value: 'slider-interactive' },
          { label: 'Cards 3D', value: 'cards-3d' }
        ]
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      defaultValue: 'Nos Tarifs',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre de la section',
      defaultValue: 'Des prix transparents et sans surprise',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'plans',
      type: PropType.STRING,
      description: 'Liste des plans tarifaires',
      defaultValue: JSON.stringify([
        {
          name: 'Essentiel',
          price: '49',
          currency: '€',
          period: '/intervention',
          description: 'Pour les petites réparations',
          features: [
            'Déplacement inclus',
            'Devis gratuit',
            'Garantie 1 an',
            'Intervention sous 48h'
          ],
          recommended: false,
          buttonText: 'Choisir',
          buttonLink: '/contact'
        },
        {
          name: 'Premium',
          price: '99',
          currency: '€',
          period: '/intervention',
          description: 'Notre offre la plus populaire',
          features: [
            'Tout du plan Essentiel',
            'Matériel premium',
            'Garantie 3 ans',
            'Intervention sous 24h',
            'Support prioritaire'
          ],
          recommended: true,
          buttonText: 'Choisir',
          buttonLink: '/contact'
        },
        {
          name: 'Sur mesure',
          price: 'Devis',
          currency: '',
          period: 'personnalisé',
          description: 'Pour les grands projets',
          features: [
            'Étude personnalisée',
            'Matériel haut de gamme',
            'Garantie 5 ans',
            'Chef de projet dédié',
            'Suivi complet'
          ],
          recommended: false,
          buttonText: 'Nous contacter',
          buttonLink: '/contact'
        }
      ]),
      required: true,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{name, price, currency, period, description, features, recommended, buttonText, buttonLink}, ...]'
      }
    },
    {
      name: 'showFeatureComparison',
      type: PropType.BOOLEAN,
      description: 'Afficher la comparaison des fonctionnalités',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE
      }
    },
    {
      name: 'colorScheme',
      type: PropType.STRING,
      description: 'Schéma de couleurs',
      defaultValue: 'primary',
      required: true,
      validation: {
        options: [
          { label: 'Primaire', value: 'primary' },
          { label: 'Bleu', value: 'blue' },
          { label: 'Vert', value: 'green' },
          { label: 'Violet', value: 'purple' },
          { label: 'Gradient', value: 'gradient' }
        ]
      }
    },
    {
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Couleur de fond',
      defaultValue: 'gray',
      required: true,
      validation: {
        options: [
          { label: 'Blanc', value: 'white' },
          { label: 'Gris', value: 'gray' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Pattern', value: 'pattern' }
        ]
      }
    }
  ],
  defaultProps: {
    layout: 'cards-classic',
    title: 'Nos Tarifs',
    colorScheme: 'primary',
    backgroundColor: 'gray'
  }
};

export function renderPricingTables(props: any): any {
  const {
    layout = 'cards-classic',
    title,
    subtitle,
    showFeatureComparison = false,
    colorScheme = 'primary',
    backgroundColor = 'gray'
  } = props;
  
  // Parse plans if it's a string
  const plans = typeof props.plans === 'string' ? JSON.parse(props.plans) : (props.plans || []);

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
    pattern: 'bg-white bg-pattern-price'
  };

  const colorSchemes = {
    primary: {
      recommended: 'bg-primary-600 text-white',
      button: 'bg-primary-600 hover:bg-primary-700 text-white',
      buttonOutline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
      badge: 'bg-primary-100 text-primary-800',
      gradient: 'from-primary-400 to-primary-600'
    },
    blue: {
      recommended: 'bg-blue-600 text-white',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonOutline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      badge: 'bg-blue-100 text-blue-800',
      gradient: 'from-blue-400 to-blue-600'
    },
    green: {
      recommended: 'bg-green-600 text-white',
      button: 'bg-green-600 hover:bg-green-700 text-white',
      buttonOutline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
      badge: 'bg-green-100 text-green-800',
      gradient: 'from-green-400 to-green-600'
    },
    purple: {
      recommended: 'bg-purple-600 text-white',
      button: 'bg-purple-600 hover:bg-purple-700 text-white',
      buttonOutline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
      badge: 'bg-purple-100 text-purple-800',
      gradient: 'from-purple-400 to-purple-600'
    },
    gradient: {
      recommended: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white',
      button: 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white',
      buttonOutline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
      badge: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800',
      gradient: 'from-primary-400 via-purple-500 to-secondary-600'
    }
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.primary;

  const renderPlan = (plan: any, index: number) => {
    const { name, price, currency, period, description, features, recommended, buttonText, buttonLink } = plan;
    
    switch(layout) {
      case 'cards-classic':
        return `
          <div class="pricing-card ${recommended ? 'transform scale-105 shadow-2xl' : 'shadow-lg'} bg-white rounded-lg p-8 relative" 
               data-aos="fade-up" data-aos-delay="${index * 100}">
            ${recommended ? `
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="px-4 py-1 ${colors.recommended} text-sm font-semibold rounded-full">
                  Recommandé
                </span>
              </div>
            ` : ''}
            <h3 class="text-2xl font-bold mb-2">${name}</h3>
            <p class="text-gray-600 mb-6">${description}</p>
            <div class="mb-6">
              <span class="text-4xl font-bold">${currency}${price}</span>
              <span class="text-gray-600">${period}</span>
            </div>
            <ul class="mb-8 space-y-3">
              ${features.map((feature: string) => `
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">${feature}</span>
                </li>
              `).join('')}
            </ul>
            <a href="${buttonLink}" class="block w-full text-center px-6 py-3 rounded-md font-medium transition-colors ${recommended ? colors.button : colors.buttonOutline}">
              ${buttonText}
            </a>
          </div>
        `;
      
      case 'cards-modern':
        return `
          <div class="pricing-card group hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden ${recommended ? 'ring-2 ring-primary-600' : ''}" 
               data-aos="zoom-in" data-aos-delay="${index * 100}">
            ${recommended ? `
              <div class="${colors.recommended} text-center py-2">
                <span class="text-sm font-semibold">⭐ Meilleur choix</span>
              </div>
            ` : ''}
            <div class="p-8">
              <h3 class="text-xl font-semibold mb-2">${name}</h3>
              <p class="text-gray-600 text-sm mb-6">${description}</p>
              <div class="flex items-baseline mb-8">
                <span class="text-5xl font-bold">${currency}${price}</span>
                <span class="text-gray-600 ml-2">${period}</span>
              </div>
              <div class="space-y-4 mb-8">
                ${features.map((feature: string) => `
                  <div class="flex items-start">
                    <div class="w-6 h-6 rounded-full ${colors.badge} flex items-center justify-center mr-3 mt-0.5">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="text-gray-700">${feature}</span>
                  </div>
                `).join('')}
              </div>
              <button class="w-full px-6 py-4 rounded-xl font-semibold transition-all ${recommended ? colors.button : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}">
                ${buttonText} →
              </button>
            </div>
          </div>
        `;
      
      case 'cards-gradient':
        return `
          <div class="pricing-card relative group" data-aos="flip-left" data-aos-delay="${index * 150}">
            <div class="absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative bg-white rounded-2xl p-8 shadow-lg">
              ${recommended ? `
                <div class="absolute -top-4 -right-4">
                  <div class="w-24 h-24">
                    <div class="absolute inset-0 ${colors.recommended} rounded-full animate-ping opacity-20"></div>
                    <div class="relative flex items-center justify-center w-full h-full ${colors.recommended} rounded-full">
                      <span class="text-xs font-bold">TOP</span>
                    </div>
                  </div>
                </div>
              ` : ''}
              <h3 class="text-2xl font-bold mb-2 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent">
                ${name}
              </h3>
              <p class="text-gray-600 mb-6">${description}</p>
              <div class="mb-8">
                <span class="text-6xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent">
                  ${currency}${price}
                </span>
                <span class="text-gray-600 block">${period}</span>
              </div>
              <ul class="mb-8 space-y-3">
                ${features.map((feature: string, i: number) => `
                  <li class="flex items-center transform hover:translate-x-2 transition-transform">
                    <span class="w-8 h-8 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center text-white mr-3">
                      ${i + 1}
                    </span>
                    <span class="text-gray-700">${feature}</span>
                  </li>
                `).join('')}
              </ul>
              <a href="${buttonLink}" class="block w-full text-center px-6 py-4 rounded-xl font-bold bg-gradient-to-r ${colors.gradient} text-white transform hover:scale-105 transition-transform">
                ${buttonText}
              </a>
            </div>
          </div>
        `;
      
      case 'minimal':
        return `
          <div class="pricing-card text-center py-8 ${recommended ? 'border-t-4 border-primary-600' : ''}" 
               data-aos="fade" data-aos-delay="${index * 50}">
            <h3 class="text-lg font-medium text-gray-900 mb-4">${name}</h3>
            <div class="mb-6">
              <span class="text-4xl font-light">${currency}${price}</span>
              <span class="text-gray-500">${period}</span>
            </div>
            <p class="text-gray-600 mb-6 text-sm">${description}</p>
            <a href="${buttonLink}" class="inline-block px-8 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
              ${buttonText}
            </a>
          </div>
        `;
      
      case 'cards-3d':
        return `
          <div class="pricing-card-3d" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="card-inner ${recommended ? 'recommended' : ''}">
              <div class="card-front bg-white rounded-xl shadow-xl p-8">
                ${recommended ? `<span class="badge ${colors.badge} px-3 py-1 rounded-full text-sm font-semibold">Popular</span>` : ''}
                <h3 class="text-2xl font-bold mt-4 mb-2">${name}</h3>
                <div class="text-4xl font-bold mb-6">${currency}${price}<span class="text-lg text-gray-600">${period}</span></div>
                <p class="text-gray-600 mb-6">${description}</p>
                <button class="flip-button text-primary-600 font-semibold">
                  Voir les détails →
                </button>
              </div>
              <div class="card-back bg-gradient-to-br ${colors.gradient} text-white rounded-xl shadow-xl p-8">
                <h4 class="text-xl font-bold mb-4">Inclus :</h4>
                <ul class="space-y-2 mb-6">
                  ${features.map((feature: string) => `
                    <li class="flex items-center">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      ${feature}
                    </li>
                  `).join('')}
                </ul>
                <a href="${buttonLink}" class="block w-full text-center px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold">
                  ${buttonText}
                </a>
              </div>
            </div>
          </div>
        `;
      
      default:
        return `
          <div class="pricing-plan">
            <h3>${name}</h3>
            <div>${currency}${price}${period}</div>
            <a href="${buttonLink}">${buttonText}</a>
          </div>
        `;
    }
  };

  const renderTogglePeriod = () => {
    return `
      <div class="toggle-period-wrapper text-center mb-12">
        <div class="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button class="period-btn active px-6 py-2 rounded-md bg-white shadow-sm font-medium" data-period="monthly">
            Mensuel
          </button>
          <button class="period-btn px-6 py-2 rounded-md font-medium text-gray-600" data-period="annual">
            Annuel <span class="text-green-600 text-sm">(-20%)</span>
          </button>
        </div>
      </div>
    `;
  };

  const gridClasses = plans.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 
                      plans.length === 3 ? 'md:grid-cols-3 max-w-6xl' : 
                      'md:grid-cols-2 lg:grid-cols-4 max-w-7xl';

  return {
    html: `
      <section class="${backgroundClasses[backgroundColor as keyof typeof backgroundClasses]} py-16 md:py-24 pricing-section pricing-${layout}">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${title}</h2>
            ${subtitle ? `<p class="text-xl text-gray-600 max-w-2xl mx-auto">${subtitle}</p>` : ''}
          </div>
          
          ${layout === 'toggle-period' ? renderTogglePeriod() : ''}
          
          <div class="grid grid-cols-1 ${gridClasses} gap-8 mx-auto">
            ${plans.map((plan: any, index: number) => renderPlan(plan, index)).join('')}
          </div>
          
          ${showFeatureComparison ? `
            <div class="mt-16 text-center">
              <button class="text-primary-600 font-semibold hover:text-primary-700">
                Comparer toutes les fonctionnalités →
              </button>
            </div>
          ` : ''}
        </div>
      </section>
    `,
    css: `
      .bg-pattern-price {
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      
      .pricing-card {
        transition: all 0.3s ease;
      }
      
      .pricing-card:hover {
        transform: translateY(-10px);
      }
      
      /* 3D Card Effect */
      .pricing-card-3d {
        perspective: 1000px;
        height: 500px;
      }
      
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      
      .pricing-card-3d:hover .card-inner {
        transform: rotateY(180deg);
      }
      
      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      .card-back {
        transform: rotateY(180deg);
      }
      
      .pricing-slider {
        -webkit-appearance: none;
        width: 100%;
        height: 8px;
        border-radius: 5px;
        background: #e5e7eb;
        outline: none;
        transition: background 0.3s;
      }
      
      .pricing-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--primary-600);
        cursor: pointer;
      }
      
      .pricing-slider::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--primary-600);
        cursor: pointer;
      }
    `,
    js: `
      // Toggle period functionality
      if ('${layout}' === 'toggle-period') {
        document.querySelectorAll('.period-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => {
              b.classList.remove('active', 'bg-white', 'shadow-sm');
              b.classList.add('text-gray-600');
            });
            this.classList.add('active', 'bg-white', 'shadow-sm');
            this.classList.remove('text-gray-600');
            
            const period = this.getAttribute('data-period');
            // Here you would update prices based on period
            console.log('Switched to ' + period);
          });
        });
      }
      
      // Interactive slider functionality
      if ('${layout}' === 'slider-interactive') {
        const slider = document.getElementById('pricing-slider');
        if (slider) {
          slider.addEventListener('input', function(e) {
            const value = e.target.value;
            // Update pricing based on slider value
            console.log('Slider value:', value);
          });
        }
      }
    `,
    variants: []
  };
}
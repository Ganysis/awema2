import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';

export const ctaSection: Block = {
  id: 'cta-section',
  name: 'Call to Action',
  description: 'Section d\'appel à l\'action avec multiples variantes',
  category: BlockCategory.CTA,
  tags: [],
  thumbnail: '/blocks/placeholder.png',
  performanceImpact: PerformanceImpact.LOW,
  variants: [],
  props: [
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Layout',
      defaultValue: 'banner-classic',
      required: true,
      validation: {
        options: [
          { label: 'Banner classique', value: 'banner-classic' },
          { label: 'Box centrée', value: 'box-centered' },
          { label: 'Gradient moderne', value: 'gradient-modern' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Split image', value: 'split-image' },
          { label: 'Floating card', value: 'floating-card' },
          { label: 'Wave pattern', value: 'wave-pattern' },
          { label: 'Diagonal', value: 'diagonal' },
          { label: 'Testimonial CTA', value: 'testimonial-cta' },
          { label: 'Video background', value: 'video-bg' }
        ]
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Title',
      defaultValue: 'Prêt à démarrer votre projet ?',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Subtitle',
      defaultValue: 'Contactez-nous dès aujourd\'hui pour un devis gratuit',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA
      }
    },
    {
      name: 'primaryButtonText',
      description: 'Texte du bouton principal',
      type: PropType.STRING,
      defaultValue: 'Demander un devis',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'primaryButtonHref',
      description: 'Lien du bouton principal',
      type: PropType.STRING,
      defaultValue: '/contact',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'primaryButtonStyle',
      description: 'Style du bouton principal',
      type: PropType.STRING,
      defaultValue: 'filled',
      required: true,
      editorConfig: {
        control: EditorControl.SELECT
      },
      validation: {
        options: [
          { label: 'Rempli', value: 'filled' },
          { label: 'Contour', value: 'outline' },
          { label: 'Ghost', value: 'ghost' }
        ]
      }
    },
    {
      name: 'secondaryButtonText',
      description: 'Texte du bouton secondaire',
      type: PropType.STRING,
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'secondaryButtonHref',
      description: 'Lien du bouton secondaire',
      type: PropType.STRING,
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'secondaryButtonStyle',
      description: 'Style du bouton secondaire',
      type: PropType.STRING,
      defaultValue: 'outline',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT
      },
      validation: {
        options: [
          { label: 'Rempli', value: 'filled' },
          { label: 'Contour', value: 'outline' },
          { label: 'Ghost', value: 'ghost' }
        ]
      }
    },
    {
      name: 'features',
      type: PropType.STRING,
      description: 'Features',
      defaultValue: ['✓ Devis gratuit', '✓ Intervention rapide', '✓ Garantie incluse'],
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA
      }
    },
    {
      name: 'image',
      type: PropType.STRING,
      description: 'Image',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.IMAGE_PICKER
      }
    },
    {
      name: 'testimonialText',
      description: 'Texte du témoignage',
      type: PropType.STRING,
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA
      }
    },
    {
      name: 'testimonialAuthor',
      description: 'Auteur du témoignage',
      type: PropType.STRING,
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'testimonialRole',
      description: 'Rôle de l\'auteur',
      type: PropType.STRING,
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'colorScheme',
      type: PropType.STRING,
      description: 'Color Scheme',
      defaultValue: 'primary',
      required: true,
      validation: {
        options: [
          { label: 'Primaire', value: 'primary' },
          { label: 'Sombre', value: 'dark' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Accent', value: 'accent' }
        ]
      }
    },
    {
      name: 'size',
      type: PropType.STRING,
      description: 'Size',
      defaultValue: 'medium',
      required: true,
      validation: {
        options: [
          { label: 'Compact', value: 'small' },
          { label: 'Normal', value: 'medium' },
          { label: 'Large', value: 'large' }
        ]
      }
    }
  ],
  defaultProps: {
    layout: 'banner-classic',
    title: 'Prêt à démarrer votre projet ?',
    subtitle: 'Contactez-nous dès aujourd\'hui pour un devis gratuit',
    primaryButtonText: 'Demander un devis',
    primaryButtonHref: '/contact',
    primaryButtonStyle: 'filled',
    secondaryButtonText: '',
    secondaryButtonHref: '',
    secondaryButtonStyle: 'outline',
    features: ['✓ Devis gratuit', '✓ Intervention rapide', '✓ Garantie incluse'],
    image: '',
    testimonialText: '',
    testimonialAuthor: '',
    testimonialRole: '',
    colorScheme: 'primary',
    size: 'medium'
  }
};

export function renderCtaSection(props: any): any {
  const {
    layout = 'banner-classic',
    title,
    subtitle,
    primaryButtonText,
    primaryButtonHref,
    primaryButtonStyle,
    secondaryButtonText,
    secondaryButtonHref,
    secondaryButtonStyle,
    features = [],
    image,
    testimonialText,
    testimonialAuthor,
    testimonialRole,
    colorScheme = 'primary',
    size = 'medium'
  } = props;

  // Create button objects for backward compatibility
  const primaryButton = primaryButtonText ? {
    text: primaryButtonText,
    href: primaryButtonHref,
    style: primaryButtonStyle
  } : null;

  const secondaryButton = secondaryButtonText ? {
    text: secondaryButtonText,
    href: secondaryButtonHref,
    style: secondaryButtonStyle
  } : null;

  const testimonial = testimonialText ? {
    text: testimonialText,
    author: testimonialAuthor,
    role: testimonialRole
  } : null;

  const sizeClasses = {
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-20',
    large: 'py-20 md:py-32'
  };

  const colorSchemes = {
    primary: {
      bg: 'bg-primary-600',
      text: 'text-white',
      button: 'bg-white text-primary-600 hover:bg-gray-100',
      buttonOutline: 'border-2 border-white text-white hover:bg-white hover:text-primary-600'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-white',
      button: 'bg-primary-600 text-white hover:bg-primary-700',
      buttonOutline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
    },
    gradient: {
      bg: 'bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600',
      text: 'text-white',
      button: 'bg-white text-gray-900 hover:bg-gray-100',
      buttonOutline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
    },
    accent: {
      bg: 'bg-accent-500',
      text: 'text-white',
      button: 'bg-white text-accent-600 hover:bg-gray-100',
      buttonOutline: 'border-2 border-white text-white hover:bg-white hover:text-accent-600'
    }
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.primary;

  const renderButton = (button: any, isPrimary: boolean = true) => {
    if (!button?.text) return '';
    
    const baseClasses = 'inline-flex items-center px-6 py-3 font-medium rounded-md transition-all transform hover:scale-105';
    const styleClasses = {
      filled: isPrimary ? colors.button : 'bg-gray-700 text-white hover:bg-gray-800',
      outline: colors.buttonOutline,
      ghost: 'text-white hover:bg-white/10'
    };
    
    const buttonStyle = button.style || 'filled';
    const styleClass = styleClasses[buttonStyle as keyof typeof styleClasses] || styleClasses.filled;
    
    return `
      <a href="${button.href}" class="${baseClasses} ${styleClass}">
        ${button.text}
      </a>
    `;
  };

  const renderLayout = () => {
    switch(layout) {
      case 'banner-classic':
        return `
          <div class="text-center max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-bold mb-6">${title}</h2>
            ${subtitle ? `<p class="text-xl mb-8 opacity-90">${subtitle}</p>` : ''}
            ${features.length > 0 ? `
              <div class="flex flex-wrap justify-center gap-4 mb-8">
                ${features.map((feature: string) => `
                  <span class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full">
                    ${feature}
                  </span>
                `).join('')}
              </div>
            ` : ''}
            <div class="flex flex-wrap gap-4 justify-center">
              ${renderButton(primaryButton)}
              ${renderButton(secondaryButton, false)}
            </div>
          </div>
        `;
      
      case 'box-centered':
        return `
          <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${title}</h2>
            ${subtitle ? `<p class="text-lg text-gray-600 mb-8">${subtitle}</p>` : ''}
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              ${renderButton(primaryButton)}
              ${renderButton(secondaryButton, false)}
            </div>
          </div>
        `;
      
      case 'gradient-modern':
        return `
          <div class="relative overflow-hidden rounded-3xl">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 opacity-90"></div>
            <div class="absolute inset-0 bg-pattern-dots opacity-10"></div>
            <div class="relative z-10 text-center px-8 py-16 md:py-24">
              <h2 class="text-4xl md:text-6xl font-bold mb-6 animate-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                ${title}
              </h2>
              ${subtitle ? `<p class="text-xl mb-8 text-white/90 max-w-2xl mx-auto">${subtitle}</p>` : ''}
              <div class="flex flex-wrap gap-4 justify-center">
                ${renderButton(primaryButton)}
                ${renderButton(secondaryButton, false)}
              </div>
            </div>
          </div>
        `;
      
      case 'minimal':
        return `
          <div class="text-center">
            <h2 class="text-2xl md:text-3xl font-light mb-8">${title}</h2>
            <div class="flex gap-8 justify-center items-center">
              ${renderButton(primaryButton)}
              ${subtitle ? `<span class="text-gray-600">${subtitle}</span>` : ''}
            </div>
          </div>
        `;
      
      case 'split-image':
        return `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
            <div class="${colors.bg} ${colors.text} p-12 flex items-center">
              <div>
                <h2 class="text-3xl md:text-4xl font-bold mb-4">${title}</h2>
                ${subtitle ? `<p class="text-lg mb-8 opacity-90">${subtitle}</p>` : ''}
                <div class="flex flex-wrap gap-4">
                  ${renderButton(primaryButton)}
                  ${renderButton(secondaryButton, false)}
                </div>
              </div>
            </div>
            <div class="bg-cover bg-center h-64 lg:h-auto" style="background-image: url('${image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'}')"></div>
          </div>
        `;
      
      case 'floating-card':
        return `
          <div class="relative">
            <div class="absolute inset-0 ${colors.bg} transform skew-y-3"></div>
            <div class="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto transform -translate-y-8">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                  </svg>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${title}</h2>
                ${subtitle ? `<p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">${subtitle}</p>` : ''}
                <div class="flex flex-wrap gap-4 justify-center">
                  ${renderButton(primaryButton)}
                  ${renderButton(secondaryButton, false)}
                </div>
              </div>
            </div>
          </div>
        `;
      
      case 'wave-pattern':
        return `
          <div class="relative">
            <div class="absolute inset-0 overflow-hidden">
              <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" fill="currentColor" class="${colors.text} opacity-10">
                <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div class="relative z-10 text-center">
              <h2 class="text-3xl md:text-5xl font-bold mb-6">${title}</h2>
              ${subtitle ? `<p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">${subtitle}</p>` : ''}
              <div class="flex flex-wrap gap-4 justify-center">
                ${renderButton(primaryButton)}
                ${renderButton(secondaryButton, false)}
              </div>
            </div>
          </div>
        `;
      
      case 'diagonal':
        return `
          <div class="relative overflow-hidden">
            <div class="absolute inset-0 ${colors.bg} transform -skew-y-6"></div>
            <div class="relative z-10 py-24 text-center">
              <h2 class="text-3xl md:text-5xl font-bold mb-6">${title}</h2>
              ${subtitle ? `<p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">${subtitle}</p>` : ''}
              ${features.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                  ${features.map((feature: string) => `
                    <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                      ${feature}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              <div class="flex flex-wrap gap-4 justify-center">
                ${renderButton(primaryButton)}
                ${renderButton(secondaryButton, false)}
              </div>
            </div>
          </div>
        `;
      
      case 'testimonial-cta':
        const { text, author, role } = testimonial || {};
        return `
          <div class="max-w-4xl mx-auto text-center">
            ${text ? `
              <blockquote class="mb-8">
                <p class="text-2xl md:text-3xl font-light italic mb-4">"${text}"</p>
                <footer class="text-sm">
                  <cite class="not-italic">
                    <span class="font-semibold">${author}</span>
                    ${role ? `, <span class="opacity-75">${role}</span>` : ''}
                  </cite>
                </footer>
              </blockquote>
            ` : ''}
            <div class="mt-12 p-8 bg-white/10 backdrop-blur rounded-2xl">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">${title}</h2>
              ${subtitle ? `<p class="text-lg mb-6 opacity-90">${subtitle}</p>` : ''}
              <div class="flex flex-wrap gap-4 justify-center">
                ${renderButton(primaryButton)}
                ${renderButton(secondaryButton, false)}
              </div>
            </div>
          </div>
        `;
      
      default:
        return `
          <div class="text-center">
            <h2 class="text-3xl font-bold mb-4">${title}</h2>
            ${subtitle ? `<p class="text-xl mb-8">${subtitle}</p>` : ''}
            ${renderButton(primaryButton)}
          </div>
        `;
    }
  };

  return {
    html: `
      <section class="${colors.bg} ${colors.text} ${sizeClasses[size as keyof typeof sizeClasses]} cta-section cta-${layout}" data-aos="fade-up">
        <div class="container mx-auto px-4">
          ${renderLayout()}
        </div>
      </section>
    `,
    css: `
      @keyframes gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
      
      .bg-pattern-dots {
        background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 1px);
        background-size: 20px 20px;
      }
      
      .cta-section {
        position: relative;
        overflow: hidden;
      }
      
      .cta-floating-card .absolute {
        z-index: 0;
      }
      
      .cta-wave-pattern svg {
        height: 120px;
      }
      
      @media (max-width: 768px) {
        .cta-diagonal .absolute {
          transform: -skew-y-3;
        }
      }
    `,
    js: '',
    variants: []
  };
}
import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';

export const faqAccordion: Block = {
  id: 'faq-accordion',
  name: 'FAQ / Questions Fréquentes',
  description: 'Section FAQ avec accordéon et multiples styles',
  category: BlockCategory.FAQ,
  tags: [],
  thumbnail: '/blocks/placeholder.png',
  performanceImpact: PerformanceImpact.LOW,
  variants: [],
  props: [
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Layout',
      defaultValue: 'accordion-classic',
      required: true,
      validation: {
        options: [
          { label: 'Accordéon classique', value: 'accordion-classic' },
          { label: 'Accordéon moderne', value: 'accordion-modern' },
          { label: 'Cards FAQ', value: 'cards-faq' },
          { label: 'Timeline FAQ', value: 'timeline-faq' },
          { label: 'Tabs catégories', value: 'tabs-categories' },
          { label: 'Grille 2 colonnes', value: 'grid-two-col' },
          { label: 'Chat style', value: 'chat-style' },
          { label: 'Minimaliste', value: 'minimal' }
        ]
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Title',
      defaultValue: 'Questions Fréquentes',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Subtitle',
      defaultValue: 'Trouvez rapidement les réponses à vos questions',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'questions',
      type: PropType.STRING,
      description: 'Questions',
      defaultValue: [
        {
          question: 'Quels sont vos délais d\'intervention ?',
          answer: 'Nous intervenons généralement sous 24 à 48h pour les urgences, et sous 3 à 5 jours pour les travaux planifiés.',
          category: 'Délais'
        },
        {
          question: 'Proposez-vous des devis gratuits ?',
          answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins.',
          category: 'Tarifs'
        },
        {
          question: 'Quelles sont vos zones d\'intervention ?',
          answer: 'Nous intervenons dans un rayon de 30km autour de notre siège, incluant toute la métropole.',
          category: 'Zones'
        }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{...}, {...}]'
      }
    },
    {
      name: 'expandFirst',
      type: PropType.STRING,
      description: 'Expand First',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE
      }
    },
    {
      name: 'showIcon',
      type: PropType.BOOLEAN,
      description: 'Show Icon',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE
      }
    },
    {
      name: 'iconStyle',
      description: 'Style d\'icône',
      type: PropType.STRING,
      defaultValue: 'plus-minus',
      required: true,
      validation: {
        options: [
          { label: 'Plus/Moins', value: 'plus-minus' },
          { label: 'Chevron', value: 'chevron' },
          { label: 'Flèche', value: 'arrow' },
          { label: 'Caret', value: 'caret' }
        ]
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
          { label: 'Neutre', value: 'neutral' },
          { label: 'Bleu', value: 'blue' },
          { label: 'Vert', value: 'green' },
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
          { label: 'Gris clair', value: 'gray' },
          { label: 'Pattern', value: 'pattern' },
          { label: 'Gradient subtil', value: 'gradient' }
        ]
      }
    },
    {
      name: 'showCTA',
      type: PropType.BOOLEAN,
      description: 'Show CTA',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE
      }
    },
    {
      name: 'ctaText',
      type: PropType.STRING,
      description: 'Cta Text',
      defaultValue: 'Vous avez d\'autres questions ?',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'ctaButtonText',
      description: 'Texte du bouton CTA',
      type: PropType.STRING,
      defaultValue: 'Contactez-nous',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    },
    {
      name: 'ctaButtonHref',
      description: 'Lien du bouton CTA',
      type: PropType.STRING,
      defaultValue: '/contact',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT
      }
    }
  ],
  defaultProps: {
    layout: 'accordion-classic',
    title: 'Questions Fréquentes',
    expandFirst: true,
    showIcon: true,
    colorScheme: 'primary'
  }
};

export function renderFaqAccordion(props: any): any {
  const {
    layout = 'accordion-classic',
    title,
    subtitle,
    questions = [],
    expandFirst = true,
    showIcon = true,
    iconStyle = 'plus-minus',
    colorScheme = 'primary',
    backgroundColor = 'white',
    showCTA = true,
    ctaText,
    ctaButtonText,
    ctaButtonHref
  } = props;

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    pattern: 'bg-white bg-pattern-dots',
    gradient: 'bg-gradient-to-br from-gray-50 to-white'
  };

  const colorSchemes = {
    primary: {
      question: 'text-gray-900',
      answer: 'text-gray-600',
      icon: 'text-primary-600',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-50',
      activeBg: 'bg-primary-50'
    },
    neutral: {
      question: 'text-gray-800',
      answer: 'text-gray-600',
      icon: 'text-gray-500',
      border: 'border-gray-300',
      hover: 'hover:bg-gray-100',
      activeBg: 'bg-gray-100'
    },
    blue: {
      question: 'text-blue-900',
      answer: 'text-blue-700',
      icon: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-50',
      activeBg: 'bg-blue-50'
    },
    green: {
      question: 'text-green-900',
      answer: 'text-green-700',
      icon: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:bg-green-50',
      activeBg: 'bg-green-50'
    },
    gradient: {
      question: 'text-gray-900',
      answer: 'text-gray-600',
      icon: 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800',
      border: 'border-gray-200',
      hover: 'hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent',
      activeBg: 'bg-gradient-to-r from-primary-50 to-transparent'
    }
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.primary;

  const renderIcon = (isOpen: boolean = false) => {
    if (!showIcon) return '';
    
    const icons = {
      'plus-minus': isOpen ? 
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />' :
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />',
      'chevron': isOpen ?
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />' :
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />',
      'arrow': isOpen ?
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />' :
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />',
      'caret': isOpen ?
        '<path d="M6 9l6 6 6-6" />' :
        '<path d="M9 6l6 6-6 6" />'
    };

    return `
      <svg class="w-5 h-5 ${colors.icon} transition-transform duration-200 ${isOpen ? '' : 'rotate-0'}" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${icons[iconStyle as keyof typeof icons] || icons['plus-minus']}
      </svg>
    `;
  };

  const renderQuestion = (item: any, index: number) => {
    const isFirst = index === 0;
    const shouldExpand = expandFirst && isFirst;
    
    switch(layout) {
      case 'accordion-classic':
        return `
          <div class="faq-item border-b ${colors.border}" data-aos="fade-up" data-aos-delay="${index * 50}">
            <button class="faq-question w-full px-4 py-4 text-left flex justify-between items-center ${colors.hover} transition-colors"
                    data-faq-index="${index}">
              <span class="${colors.question} font-medium">${item.question}</span>
              ${renderIcon()}
            </button>
            <div class="faq-answer ${shouldExpand ? '' : 'hidden'} px-4 pb-4">
              <p class="${colors.answer}">${item.answer}</p>
            </div>
          </div>
        `;
      
      case 'accordion-modern':
        return `
          <div class="faq-item mb-4 rounded-lg border ${colors.border} overflow-hidden" data-aos="fade-up" data-aos-delay="${index * 50}">
            <button class="faq-question w-full px-6 py-4 text-left flex justify-between items-center ${colors.hover} transition-all"
                    data-faq-index="${index}">
              <span class="${colors.question} font-semibold text-lg">${item.question}</span>
              <span class="icon-wrapper p-2 rounded-full ${colors.activeBg}">
                ${renderIcon()}
              </span>
            </button>
            <div class="faq-answer ${shouldExpand ? '' : 'hidden'} px-6 pb-4 ${colors.activeBg}">
              <p class="${colors.answer} leading-relaxed">${item.answer}</p>
            </div>
          </div>
        `;
      
      case 'cards-faq':
        return `
          <div class="faq-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6" 
               data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-10 h-10 rounded-full ${colors.activeBg} flex items-center justify-center mr-4">
                <span class="${colors.icon} font-bold">${index + 1}</span>
              </div>
              <div class="flex-1">
                <h3 class="${colors.question} font-semibold text-lg mb-2">${item.question}</h3>
                <p class="${colors.answer}">${item.answer}</p>
              </div>
            </div>
          </div>
        `;
      
      case 'chat-style':
        return `
          <div class="chat-item mb-6" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="flex items-start mb-3">
              <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="bg-gray-100 rounded-lg px-4 py-2 max-w-3xl">
                <p class="${colors.question} font-medium">${item.question}</p>
              </div>
            </div>
            <div class="flex items-start justify-end">
              <div class="bg-primary-600 text-white rounded-lg px-4 py-2 max-w-3xl mr-3">
                <p>${item.answer}</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                </svg>
              </div>
            </div>
          </div>
        `;
      
      case 'minimal':
        return `
          <div class="faq-item py-4 border-b border-gray-100" data-aos="fade" data-aos-delay="${index * 30}">
            <button class="faq-question w-full text-left group" data-faq-index="${index}">
              <h3 class="${colors.question} font-medium group-hover:text-primary-600 transition-colors">
                ${item.question}
              </h3>
            </button>
            <div class="faq-answer ${shouldExpand ? '' : 'hidden'} mt-2">
              <p class="${colors.answer} text-sm leading-relaxed">${item.answer}</p>
            </div>
          </div>
        `;
      
      default:
        return `
          <div class="faq-item">
            <h3>${item.question}</h3>
            <p>${item.answer}</p>
          </div>
        `;
    }
  };

  const renderLayout = () => {
    const categories = [...new Set(questions.map((q: any) => q.category))].filter(Boolean);
    
    switch(layout) {
      case 'tabs-categories':
        if (categories.length === 0) {
          return `<div class="space-y-4">${questions.map((q: any, i: number) => renderQuestion(q, i)).join('')}</div>`;
        }
        return `
          <div class="tabs-faq">
            <div class="tabs-header flex flex-wrap gap-2 mb-8 justify-center">
              <button class="tab-btn active px-4 py-2 rounded-full bg-primary-600 text-white" data-tab="all">
                Toutes les questions
              </button>
              ${categories.map((cat: any) => `
                <button class="tab-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300" data-tab="${cat.toLowerCase().replace(/\s+/g, '-')}">
                  ${cat}
                </button>
              `).join('')}
            </div>
            <div class="tabs-content">
              <div class="tab-pane active" id="all">
                <div class="space-y-4">
                  ${questions.map((q: any, i: number) => renderQuestion(q, i)).join('')}
                </div>
              </div>
              ${categories.map((cat: any) => `
                <div class="tab-pane hidden" id="${cat.toLowerCase().replace(/\s+/g, '-')}">
                  <div class="space-y-4">
                    ${questions.filter((q: any) => q.category === cat).map((q: any, i: number) => renderQuestion(q, i)).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      
      case 'grid-two-col':
        return `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${questions.map((q: any, i: number) => renderQuestion(q, i)).join('')}
          </div>
        `;
      
      case 'timeline-faq':
        return `
          <div class="timeline-faq relative">
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            ${questions.map((q: any, i: number) => `
              <div class="timeline-item relative pl-20 pb-8" data-aos="fade-left" data-aos-delay="${i * 100}">
                <div class="absolute left-6 w-5 h-5 bg-primary-600 rounded-full border-4 border-white"></div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h3 class="${colors.question} font-semibold text-lg mb-2">${q.question}</h3>
                  <p class="${colors.answer}">${q.answer}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      
      default:
        return `
          <div class="faq-container max-w-3xl mx-auto">
            ${questions.map((q: any, i: number) => renderQuestion(q, i)).join('')}
          </div>
        `;
    }
  };

  return {
    html: `
      <section class="${backgroundClasses[backgroundColor as keyof typeof backgroundClasses]} py-16 md:py-24 faq-section faq-${layout}">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">${title}</h2>
            ${subtitle ? `<p class="text-xl text-gray-600 max-w-2xl mx-auto">${subtitle}</p>` : ''}
          </div>
          
          ${renderLayout()}
          
          ${showCTA && ctaText ? `
            <div class="text-center mt-12 pt-8 border-t ${colors.border}">
              <p class="text-lg ${colors.question} mb-4">${ctaText}</p>
              ${ctaButtonText ? `
                <a href="${ctaButtonHref || '/contact'}" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
                  ${ctaButtonText}
                </a>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </section>
    `,
    css: `
      .bg-pattern-dots {
        background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
        background-size: 20px 20px;
      }
      
      .faq-accordion-classic .faq-answer,
      .faq-accordion-modern .faq-answer,
      .faq-minimal .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
      }
      
      .faq-accordion-classic .faq-answer:not(.hidden),
      .faq-accordion-modern .faq-answer:not(.hidden),
      .faq-minimal .faq-answer:not(.hidden) {
        max-height: 500px;
        transition: max-height 0.3s ease-in;
      }
      
      .faq-question svg {
        transition: transform 0.3s ease;
      }
      
      .faq-question.active svg {
        transform: rotate(180deg);
      }
      
      .faq-question.active + .faq-answer {
        display: block;
      }
      
      .chat-style .chat-item {
        animation: fadeInUp 0.5s ease-out;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    js: `
      // Accordion functionality
      document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
          const answer = this.nextElementSibling;
          const isOpen = !answer.classList.contains('hidden');
          
          // Close all other answers in accordion layouts
          if ('${layout}'.includes('accordion')) {
            document.querySelectorAll('.faq-answer').forEach(a => {
              if (a !== answer) {
                a.classList.add('hidden');
                a.previousElementSibling.classList.remove('active');
              }
            });
          }
          
          // Toggle current answer
          answer.classList.toggle('hidden');
          this.classList.toggle('active');
        });
      });
      
      // Tabs functionality
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Update buttons
          document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active', 'bg-primary-600', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-700');
          });
          this.classList.add('active', 'bg-primary-600', 'text-white');
          this.classList.remove('bg-gray-200', 'text-gray-700');
          
          // Update panes
          document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
          const targetPane = tabId === 'all' ? 
            document.getElementById('all') : 
            document.getElementById(tabId);
          if (targetPane) targetPane.classList.remove('hidden');
        });
      });
    `,
    variants: []
  };
}
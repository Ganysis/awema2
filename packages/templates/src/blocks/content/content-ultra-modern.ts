import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Content Ultra-Moderne - Enrichissement majeur avec les 8 mêmes variantes
 * Rich text, animated typography, quotes, comparisons, timelines
 */
export const contentUltraModern: Block = {
  id: 'content-ultra-modern',
  name: 'Content Ultra-Moderne',
  description: 'Section de contenu avec 8 designs magnifiques, typographie animée et fonctionnalités avancées',
  category: BlockCategory.CONTENT,
  tags: ['content', 'text', 'modern', 'animated', 'glassmorphism', 'gradient', 'rich-text'],
  thumbnail: '/blocks/content-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.LOW,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel (même que Contact/CTA)',
      defaultValue: 'glassmorphism',
      required: true,
      validation: {
        options: [
          { label: 'Glassmorphism', value: 'glassmorphism' },
          { label: 'Gradient Wave', value: 'gradient-wave' },
          { label: 'Floating Cards', value: 'floating-cards' },
          { label: 'Neon Glow', value: 'neon-glow' },
          { label: 'Minimal Luxe', value: 'minimal-luxe' },
          { label: 'Split Screen', value: 'split-screen' },
          { label: 'Particles Background', value: 'particles' },
          { label: '3D Perspective', value: '3d-perspective' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 1
      }
    },
    {
      name: 'contentType',
      type: PropType.STRING,
      description: 'Type de contenu',
      defaultValue: 'text-image',
      required: true,
      validation: {
        options: [
          { label: 'Texte & Image', value: 'text-image' },
          { label: 'Citation inspirante', value: 'quote' },
          { label: 'Comparaison Avant/Après', value: 'comparison' },
          { label: 'Timeline/Chronologie', value: 'timeline' },
          { label: 'Statistiques animées', value: 'stats' },
          { label: 'Accordion/FAQ', value: 'accordion' },
          { label: 'Tabs/Onglets', value: 'tabs' },
          { label: 'Témoignage détaillé', value: 'testimonial' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Type',
        order: 2
      }
    },
    {
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Couleur de fond de la section',
      defaultValue: 'transparent',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Design',
        order: 3
      }
    },
    {
      name: 'backgroundGradient',
      type: PropType.STRING,
      description: 'Dégradé de fond',
      defaultValue: '',
      required: false,
      validation: {
        options: [
          { value: '', label: 'Aucun' },
          { value: 'purple-blue', label: 'Violet → Bleu' },
          { value: 'orange-pink', label: 'Orange → Rose' },
          { value: 'green-blue', label: 'Vert → Bleu' },
          { value: 'red-purple', label: 'Rouge → Violet' },
          { value: 'custom', label: 'Personnalisé' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 4
      }
    },
    {
      name: 'eyebrow',
      type: PropType.STRING,
      description: 'Texte au-dessus du titre',
      defaultValue: '💡 Notre expertise',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: À propos, Notre histoire',
        group: 'Contenu',
        order: 5
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal',
      defaultValue: 'Des solutions innovantes pour vos projets',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 6
      }
    },
    {
      name: 'titleAnimation',
      type: PropType.STRING,
      description: 'Animation du titre',
      defaultValue: 'none',
      required: false,
      validation: {
        options: [
          { value: 'none', label: 'Aucune' },
          { value: 'typewriter', label: 'Machine à écrire' },
          { value: 'gradient', label: 'Dégradé animé' },
          { value: 'glitch', label: 'Effet glitch' },
          { value: 'wave', label: 'Vague' },
          { value: 'split', label: 'Split text' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Animations',
        order: 7
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Découvrez notre approche unique et notre savoir-faire reconnu',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 8
      }
    },
    {
      name: 'content',
      type: PropType.STRING,
      description: 'Contenu principal (supporte HTML)',
      defaultValue: `<p>Fort de <strong>plus de 15 ans d'expérience</strong>, notre équipe met son expertise à votre service pour réaliser tous vos projets.</p>
<p>Nous privilégions une approche personnalisée, en écoutant vos besoins spécifiques pour vous proposer des solutions sur mesure qui correspondent parfaitement à vos attentes et votre budget.</p>`,
      required: true,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Supporte le HTML pour le formatage',
        group: 'Contenu',
        order: 9
      }
    },
    {
      name: 'image',
      type: PropType.STRING,
      description: 'Image principale',
      defaultValue: '/placeholder.jpg',
      required: false,
      editorConfig: {
        control: EditorControl.IMAGE_PICKER,
        group: 'Média',
        order: 10
      }
    },
    {
      name: 'imagePosition',
      type: PropType.STRING,
      description: 'Position de l\'image',
      defaultValue: 'right',
      required: false,
      validation: {
        options: [
          { value: 'left', label: 'À gauche' },
          { value: 'right', label: 'À droite' },
          { value: 'top', label: 'En haut' },
          { value: 'bottom', label: 'En bas' },
          { value: 'background', label: 'En arrière-plan' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Média',
        order: 11
      }
    },
    {
      name: 'features',
      type: PropType.ARRAY,
      description: 'Points clés ou caractéristiques',
      defaultValue: [
        { icon: 'check', text: 'Expertise reconnue dans le domaine' },
        { icon: 'star', text: 'Plus de 500 projets réalisés' },
        { icon: 'shield', text: 'Garantie qualité sur tous nos travaux' },
        { icon: 'clock', text: 'Délais respectés et transparence totale' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Contenu',
        order: 12
      }
    },
    {
      name: 'quote',
      type: PropType.OBJECT,
      description: 'Citation (pour contentType = quote)',
      defaultValue: {
        text: 'La qualité n\'est jamais un accident. C\'est toujours le résultat d\'un effort intelligent.',
        author: 'John Ruskin',
        role: 'Écrivain et critique d\'art'
      },
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Citation',
        order: 13
      }
    },
    {
      name: 'comparison',
      type: PropType.OBJECT,
      description: 'Données de comparaison (pour contentType = comparison)',
      defaultValue: {
        beforeTitle: 'Avant',
        afterTitle: 'Après',
        beforeImage: '/before.jpg',
        afterImage: '/after.jpg',
        beforePoints: ['Ancien système', 'Performance limitée', 'Coûts élevés'],
        afterPoints: ['Solution moderne', 'Performance optimale', 'Économies garanties']
      },
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Comparaison',
        order: 14
      }
    },
    {
      name: 'timeline',
      type: PropType.ARRAY,
      description: 'Événements chronologiques (pour contentType = timeline)',
      defaultValue: [
        { year: '2008', title: 'Création', description: 'Fondation de notre entreprise' },
        { year: '2015', title: 'Expansion', description: 'Ouverture de 3 nouvelles agences' },
        { year: '2020', title: 'Innovation', description: 'Lancement de notre solution digitale' },
        { year: '2024', title: 'Leader', description: 'N°1 dans notre région' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Timeline',
        order: 15
      }
    },
    {
      name: 'stats',
      type: PropType.ARRAY,
      description: 'Statistiques animées (pour contentType = stats)',
      defaultValue: [
        { value: '500+', label: 'Projets réalisés', suffix: '', prefix: '' },
        { value: '98', label: 'Satisfaction client', suffix: '%', prefix: '' },
        { value: '15', label: 'Années d\'expérience', suffix: ' ans', prefix: '+' },
        { value: '24', label: 'Disponibilité', suffix: '/7', prefix: '' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Statistiques',
        order: 16
      }
    },
    {
      name: 'tabs',
      type: PropType.ARRAY,
      description: 'Onglets (pour contentType = tabs)',
      defaultValue: [
        { 
          title: 'Notre Mission', 
          content: 'Fournir des solutions de qualité qui dépassent les attentes de nos clients.',
          icon: 'target'
        },
        { 
          title: 'Notre Vision', 
          content: 'Devenir le leader reconnu dans notre domaine d\'expertise.',
          icon: 'eye'
        },
        { 
          title: 'Nos Valeurs', 
          content: 'Intégrité, innovation, excellence et satisfaction client.',
          icon: 'heart'
        }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Onglets',
        order: 17
      }
    },
    {
      name: 'accordion',
      type: PropType.ARRAY,
      description: 'Questions/Réponses (pour contentType = accordion)',
      defaultValue: [
        { 
          question: 'Pourquoi nous choisir ?', 
          answer: 'Notre expertise reconnue et notre engagement qualité font la différence.'
        },
        { 
          question: 'Quels sont vos délais ?', 
          answer: 'Nous respectons scrupuleusement les délais convenus avec transparence totale.'
        },
        { 
          question: 'Proposez-vous des garanties ?', 
          answer: 'Oui, tous nos travaux sont garantis selon les normes en vigueur.'
        }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Accordion',
        order: 18
      }
    },
    {
      name: 'primaryButton',
      type: PropType.OBJECT,
      description: 'Bouton principal',
      defaultValue: {
        text: 'En savoir plus',
        link: '/about',
        style: 'primary',
        icon: 'arrow-right'
      },
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Boutons',
        order: 19
      }
    },
    {
      name: 'secondaryButton',
      type: PropType.OBJECT,
      description: 'Bouton secondaire',
      defaultValue: {
        text: 'Nous contacter',
        link: '/contact',
        style: 'secondary',
        icon: 'phone'
      },
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Boutons',
        order: 20
      }
    },
    {
      name: 'animation',
      type: PropType.STRING,
      description: 'Animation de la section',
      defaultValue: 'fade-up',
      required: false,
      validation: {
        options: [
          { value: 'none', label: 'Aucune' },
          { value: 'fade-up', label: 'Apparition du bas' },
          { value: 'fade-down', label: 'Apparition du haut' },
          { value: 'fade-left', label: 'Apparition de gauche' },
          { value: 'fade-right', label: 'Apparition de droite' },
          { value: 'zoom-in', label: 'Zoom avant' },
          { value: 'parallax', label: 'Effet parallaxe' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Animations',
        order: 21
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    contentType: 'text-image',
    title: 'Des solutions innovantes pour vos projets',
    content: '<p>Notre expertise à votre service.</p>'
  }
};

export function renderContentUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    contentType = 'text-image',
    backgroundColor = 'transparent',
    backgroundGradient = '',
    eyebrow = '',
    title = '',
    titleAnimation = 'none',
    subtitle = '',
    content = '',
    image = '',
    imagePosition = 'right',
    features = [],
    quote = {},
    comparison = {},
    timeline = [],
    stats = [],
    tabs = [],
    accordion = [],
    primaryButton = null,
    secondaryButton = null,
    animation = 'fade-up'
  } = props;

  // Parse arrays if needed
  const featuresList = typeof features === 'string' ? JSON.parse(features) : features;
  const timelineList = typeof timeline === 'string' ? JSON.parse(timeline) : timeline;
  const statsList = typeof stats === 'string' ? JSON.parse(stats) : stats;
  const tabsList = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;
  const accordionList = typeof accordion === 'string' ? JSON.parse(accordion) : accordion;
  
  // Background styles
  const backgroundStyle = backgroundColor !== 'transparent' ? `background-color: ${backgroundColor};` : '';
  const gradientClass = backgroundGradient ? `gradient-${backgroundGradient}` : '';
  
  // Animation attributes
  const animationAttrs = animation !== 'none' ? `data-aos="${animation}" data-aos-duration="1000"` : '';

  // Render content based on type
  let contentHtml = '';
  
  switch (contentType) {
    case 'text-image':
      contentHtml = renderTextImage();
      break;
    case 'quote':
      contentHtml = renderQuote();
      break;
    case 'comparison':
      contentHtml = renderComparison();
      break;
    case 'timeline':
      contentHtml = renderTimeline();
      break;
    case 'stats':
      contentHtml = renderStats();
      break;
    case 'tabs':
      contentHtml = renderTabs();
      break;
    case 'accordion':
      contentHtml = renderAccordion();
      break;
    case 'testimonial':
      contentHtml = renderTestimonial();
      break;
    default:
      contentHtml = renderTextImage();
  }

  function renderTextImage() {
    const imageLeft = imagePosition === 'left';
    const imageTop = imagePosition === 'top';
    const imageBg = imagePosition === 'background';
    
    return `
      <div class="content-wrapper ${imageTop ? 'image-top' : ''} ${imageBg ? 'image-bg' : ''}">
        ${imageBg && image ? `<div class="content-bg-image" style="background-image: url('${image}');"></div>` : ''}
        
        ${image && !imageBg ? `
          <div class="content-image ${imageLeft ? 'order-1' : 'order-2'}">
            <img src="${image}" alt="${title}" loading="lazy" />
            ${variant === '3d-perspective' ? '<div class="image-shadow"></div>' : ''}
          </div>
        ` : ''}
        
        <div class="content-text ${image && !imageBg ? (imageLeft ? 'order-2' : 'order-1') : ''}">
          ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
          
          ${title ? `<h2 class="content-title ${titleAnimation !== 'none' ? `title-${titleAnimation}` : ''}">${title}</h2>` : ''}
          
          ${subtitle ? `<p class="content-subtitle">${subtitle}</p>` : ''}
          
          ${content ? `<div class="content-body">${content}</div>` : ''}
          
          ${featuresList.length > 0 ? `
            <ul class="content-features">
              ${featuresList.map((feature: any) => `
                <li class="content-feature">
                  <svg class="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <use href="#icon-${feature.icon || 'check'}"/>
                  </svg>
                  <span>${feature.text}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
          
          ${renderButtons()}
        </div>
      </div>
    `;
  }

  function renderQuote() {
    return `
      <div class="content-quote-wrapper">
        <div class="quote-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
        </div>
        <blockquote class="content-quote">
          <p class="quote-text">${quote.text || 'Citation inspirante'}</p>
          ${quote.author ? `
            <footer class="quote-footer">
              <cite class="quote-author">${quote.author}</cite>
              ${quote.role ? `<span class="quote-role">${quote.role}</span>` : ''}
            </footer>
          ` : ''}
        </blockquote>
      </div>
    `;
  }

  function renderComparison() {
    return `
      <div class="content-comparison">
        <div class="comparison-header">
          ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
          ${title ? `<h2 class="content-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="content-subtitle">${subtitle}</p>` : ''}
        </div>
        
        <div class="comparison-grid">
          <div class="comparison-item before">
            <h3 class="comparison-title">${comparison.beforeTitle || 'Avant'}</h3>
            ${comparison.beforeImage ? `
              <div class="comparison-image">
                <img src="${comparison.beforeImage}" alt="${comparison.beforeTitle}" />
              </div>
            ` : ''}
            ${comparison.beforePoints?.length > 0 ? `
              <ul class="comparison-points">
                ${comparison.beforePoints.map((point: string) => `
                  <li class="comparison-point negative">
                    <svg class="point-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>${point}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
          
          <div class="comparison-divider">
            <div class="divider-line"></div>
            <div class="divider-icon">VS</div>
            <div class="divider-line"></div>
          </div>
          
          <div class="comparison-item after">
            <h3 class="comparison-title">${comparison.afterTitle || 'Après'}</h3>
            ${comparison.afterImage ? `
              <div class="comparison-image">
                <img src="${comparison.afterImage}" alt="${comparison.afterTitle}" />
              </div>
            ` : ''}
            ${comparison.afterPoints?.length > 0 ? `
              <ul class="comparison-points">
                ${comparison.afterPoints.map((point: string) => `
                  <li class="comparison-point positive">
                    <svg class="point-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>${point}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
        
        ${renderButtons()}
      </div>
    `;
  }

  function renderTimeline() {
    return `
      <div class="content-timeline">
        <div class="timeline-header">
          ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
          ${title ? `<h2 class="content-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="content-subtitle">${subtitle}</p>` : ''}
        </div>
        
        <div class="timeline-items">
          ${timelineList.map((item: any, index: number) => `
            <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
              <div class="timeline-marker">
                <span class="marker-year">${item.year}</span>
              </div>
              <div class="timeline-content">
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        ${renderButtons()}
      </div>
    `;
  }

  function renderStats() {
    return `
      <div class="content-stats">
        <div class="stats-header">
          ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
          ${title ? `<h2 class="content-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="content-subtitle">${subtitle}</p>` : ''}
        </div>
        
        <div class="stats-grid">
          ${statsList.map((stat: any, index: number) => `
            <div class="stat-item" data-aos="zoom-in" data-aos-delay="${index * 100}">
              <div class="stat-value" data-value="${stat.value}">
                ${stat.prefix || ''}<span class="stat-number">0</span>${stat.suffix || ''}
              </div>
              <div class="stat-label">${stat.label}</div>
            </div>
          `).join('')}
        </div>
        
        ${content ? `<div class="content-body">${content}</div>` : ''}
        
        ${renderButtons()}
      </div>
    `;
  }

  function renderTabs() {
    return `
      <div class="content-tabs">
        <div class="tabs-header">
          ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
          ${title ? `<h2 class="content-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="content-subtitle">${subtitle}</p>` : ''}
        </div>
        
        <div class="tabs-container">
          <div class="tabs-nav">
            ${tabsList.map((tab: any, index: number) => `
              <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${index}">
                ${tab.icon ? `
                  <svg class="tab-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <use href="#icon-${tab.icon}"/>
                  </svg>
                ` : ''}
                <span>${tab.title}</span>
              </button>
            `).join('')}
          </div>
          
          <div class="tabs-content">
            ${tabsList.map((tab: any, index: number) => `
              <div class="tab-panel ${index === 0 ? 'active' : ''}" data-panel="${index}">
                <div class="tab-content">${tab.content}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${renderButtons()}
      </div>
    `;
  }

  function renderAccordion() {
    return `
      <div class="content-accordion">
        <div class="accordion-header">
          ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
          ${title ? `<h2 class="content-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="content-subtitle">${subtitle}</p>` : ''}
        </div>
        
        <div class="accordion-items">
          ${accordionList.map((item: any, index: number) => `
            <div class="accordion-item" data-aos="fade-up" data-aos-delay="${index * 50}">
              <button class="accordion-trigger ${index === 0 ? 'active' : ''}">
                <span class="accordion-question">${item.question}</span>
                <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div class="accordion-content ${index === 0 ? 'active' : ''}">
                <p class="accordion-answer">${item.answer}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        ${renderButtons()}
      </div>
    `;
  }

  function renderTestimonial() {
    return `
      <div class="content-testimonial">
        <div class="testimonial-wrapper">
          ${image ? `
            <div class="testimonial-image">
              <img src="${image}" alt="Témoignage" />
            </div>
          ` : ''}
          
          <div class="testimonial-content">
            ${eyebrow ? `<div class="content-eyebrow">${eyebrow}</div>` : ''}
            
            <blockquote class="testimonial-quote">
              <p class="quote-text">${content || 'Témoignage client'}</p>
            </blockquote>
            
            ${title ? `
              <div class="testimonial-author">
                <cite class="author-name">${title}</cite>
                ${subtitle ? `<span class="author-role">${subtitle}</span>` : ''}
              </div>
            ` : ''}
            
            <div class="testimonial-rating">
              ${[1,2,3,4,5].map(() => `
                <svg class="rating-star" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderButtons() {
    if (!primaryButton && !secondaryButton) return '';
    
    return `
      <div class="content-buttons">
        ${primaryButton ? `
          <a href="${primaryButton.link}" class="content-button primary">
            <span>${primaryButton.text}</span>
            ${primaryButton.icon ? `
              <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <use href="#icon-${primaryButton.icon}"/>
              </svg>
            ` : ''}
          </a>
        ` : ''}
        
        ${secondaryButton ? `
          <a href="${secondaryButton.link}" class="content-button secondary">
            <span>${secondaryButton.text}</span>
            ${secondaryButton.icon ? `
              <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <use href="#icon-${secondaryButton.icon}"/>
              </svg>
            ` : ''}
          </a>
        ` : ''}
      </div>
    `;
  }

  const html = `
    <!-- SVG Icons Definition -->
    <svg style="display: none;">
      <symbol id="icon-check" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"></polyline>
      </symbol>
      <symbol id="icon-star" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </symbol>
      <symbol id="icon-arrow-right" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </symbol>
      <symbol id="icon-target" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </symbol>
      <symbol id="icon-eye" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </symbol>
      <symbol id="icon-heart" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </symbol>
    </svg>

    <section class="content-ultra ${variant} ${gradientClass} content-${contentType}" style="${backgroundStyle}" ${animationAttrs}>
      ${variant === 'particles' ? '<div class="particles-bg"></div>' : ''}
      
      <div class="container">
        ${contentHtml}
      </div>
    </section>
  `;

  const css = `
    /* Base Styles - Cohérence avec Contact/CTA Ultra-Modern */
    .content-ultra {
      position: relative;
      padding: 80px 0;
      overflow: hidden;
      background: var(--color-background, #fff);
    }
    
    .content-ultra .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    
    /* Typography - Utilise les variables globales */
    .content-eyebrow {
      display: inline-block;
      font-family: var(--font-secondary);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary, #007bff);
      background: rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
      padding: 6px 16px;
      border-radius: 30px;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }
    
    .content-title {
      font-family: var(--font-primary);
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 700;
      color: var(--color-text, #111);
      margin: 0 0 20px;
      line-height: 1.2;
    }
    
    .content-subtitle {
      font-family: var(--font-secondary);
      font-size: 20px;
      color: var(--color-text-secondary, #666);
      margin: 0 0 30px;
      opacity: 0.9;
    }
    
    .content-body {
      font-family: var(--font-secondary);
      font-size: 16px;
      line-height: 1.8;
      color: var(--color-text, #111);
      margin-bottom: 30px;
    }
    
    .content-body p {
      margin-bottom: 16px;
    }
    
    .content-body strong {
      font-weight: 600;
      color: var(--color-primary, #007bff);
    }
    
    /* Text & Image Layout */
    .content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .content-wrapper.image-top {
      grid-template-columns: 1fr;
    }
    
    .content-wrapper.image-bg {
      grid-template-columns: 1fr;
      position: relative;
      min-height: 500px;
      align-items: center;
    }
    
    .content-bg-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      background-position: center;
      opacity: 0.1;
      z-index: -1;
    }
    
    .content-image {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
    }
    
    .content-image img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 20px;
    }
    
    .image-shadow {
      position: absolute;
      bottom: -20px;
      left: 20px;
      right: -20px;
      height: 100%;
      background: var(--color-primary, #007bff);
      opacity: 0.1;
      border-radius: 20px;
      z-index: -1;
    }
    
    /* Features */
    .content-features {
      list-style: none;
      padding: 0;
      margin: 0 0 40px;
    }
    
    .content-feature {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-text, #111);
    }
    
    .feature-icon {
      color: var(--color-primary, #007bff);
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    /* Buttons */
    .content-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 40px;
    }
    
    .content-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 16px 28px;
      font-family: var(--font-primary);
      font-size: 16px;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .content-button.primary {
      background: var(--color-primary, #007bff);
      color: white;
      box-shadow: 0 4px 20px rgba(var(--color-primary-rgb, 0, 123, 255), 0.3);
    }
    
    .content-button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(var(--color-primary-rgb, 0, 123, 255), 0.4);
    }
    
    .content-button.secondary {
      background: transparent;
      color: var(--color-text, #111);
      border: 2px solid var(--color-border, #e0e0e0);
    }
    
    .content-button.secondary:hover {
      background: var(--color-background-alt, #f5f5f5);
      border-color: var(--color-primary, #007bff);
      color: var(--color-primary, #007bff);
    }
    
    /* Quote Style */
    .content-quote-wrapper {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .quote-icon {
      color: var(--color-primary, #007bff);
      opacity: 0.2;
      margin-bottom: 30px;
    }
    
    .content-quote {
      margin: 0;
    }
    
    .quote-text {
      font-family: var(--font-primary);
      font-size: clamp(24px, 4vw, 36px);
      font-weight: 300;
      font-style: italic;
      color: var(--color-text, #111);
      line-height: 1.4;
      margin: 0 0 30px;
    }
    
    .quote-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    
    .quote-author {
      font-family: var(--font-primary);
      font-size: 18px;
      font-weight: 600;
      font-style: normal;
      color: var(--color-primary, #007bff);
    }
    
    .quote-role {
      font-family: var(--font-secondary);
      font-size: 14px;
      color: var(--color-text-secondary, #666);
    }
    
    /* Comparison Style */
    .content-comparison {
      text-align: center;
    }
    
    .comparison-header {
      margin-bottom: 60px;
    }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 40px;
      align-items: start;
    }
    
    .comparison-item {
      padding: 30px;
      border-radius: 20px;
      background: var(--color-background-alt, #f8f9fa);
    }
    
    .comparison-item.before {
      border: 2px solid var(--color-error, #dc3545);
    }
    
    .comparison-item.after {
      border: 2px solid var(--color-success, #28a745);
    }
    
    .comparison-title {
      font-family: var(--font-primary);
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px;
    }
    
    .comparison-item.before .comparison-title {
      color: var(--color-error, #dc3545);
    }
    
    .comparison-item.after .comparison-title {
      color: var(--color-success, #28a745);
    }
    
    .comparison-image {
      margin-bottom: 20px;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .comparison-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .comparison-points {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
    }
    
    .comparison-point {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-family: var(--font-secondary);
      font-size: 16px;
    }
    
    .comparison-point.negative {
      color: var(--color-error, #dc3545);
    }
    
    .comparison-point.positive {
      color: var(--color-success, #28a745);
    }
    
    .point-icon {
      flex-shrink: 0;
    }
    
    .comparison-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    
    .divider-line {
      width: 2px;
      height: 100px;
      background: var(--color-border, #e0e0e0);
    }
    
    .divider-icon {
      font-family: var(--font-primary);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-primary, #007bff);
      background: white;
      padding: 10px;
      border-radius: 50%;
      border: 2px solid var(--color-primary, #007bff);
    }
    
    /* Timeline Style */
    .content-timeline {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .timeline-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .timeline-items {
      position: relative;
      padding-left: 40px;
    }
    
    .timeline-items::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--color-border, #e0e0e0);
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 40px;
    }
    
    .timeline-marker {
      position: absolute;
      left: -40px;
      top: 0;
      width: 32px;
      height: 32px;
      background: var(--color-primary, #007bff);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb, 0, 123, 255), 0.2);
    }
    
    .marker-year {
      font-family: var(--font-primary);
      font-size: 10px;
      font-weight: 700;
      color: white;
    }
    
    .timeline-content {
      background: var(--color-background-alt, #f8f9fa);
      padding: 20px;
      border-radius: 12px;
      margin-left: 20px;
    }
    
    .timeline-title {
      font-family: var(--font-primary);
      font-size: 20px;
      font-weight: 600;
      color: var(--color-primary, #007bff);
      margin: 0 0 8px;
    }
    
    .timeline-description {
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-text, #111);
      margin: 0;
    }
    
    /* Stats Style */
    .content-stats {
      text-align: center;
    }
    
    .stats-header {
      margin-bottom: 60px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-family: var(--font-primary);
      font-size: clamp(36px, 6vw, 56px);
      font-weight: 700;
      color: var(--color-primary, #007bff);
      margin-bottom: 8px;
      line-height: 1;
    }
    
    .stat-label {
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-text-secondary, #666);
    }
    
    /* Tabs Style */
    .content-tabs {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .tabs-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .tabs-nav {
      display: flex;
      border-bottom: 2px solid var(--color-border, #e0e0e0);
      margin-bottom: 30px;
    }
    
    .tab-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 24px;
      background: none;
      border: none;
      font-family: var(--font-primary);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-secondary, #666);
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .tab-button.active {
      color: var(--color-primary, #007bff);
    }
    
    .tab-button::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-primary, #007bff);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    .tab-button.active::after {
      transform: scaleX(1);
    }
    
    .tab-icon {
      opacity: 0.6;
      transition: opacity 0.3s ease;
    }
    
    .tab-button.active .tab-icon {
      opacity: 1;
    }
    
    .tabs-content {
      position: relative;
    }
    
    .tab-panel {
      display: none;
      animation: fadeIn 0.5s ease;
    }
    
    .tab-panel.active {
      display: block;
    }
    
    .tab-content {
      font-family: var(--font-secondary);
      font-size: 16px;
      line-height: 1.8;
      color: var(--color-text, #111);
    }
    
    /* Accordion Style */
    .content-accordion {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .accordion-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .accordion-item {
      margin-bottom: 16px;
      border: 1px solid var(--color-border, #e0e0e0);
      border-radius: 12px;
      overflow: hidden;
    }
    
    .accordion-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px 24px;
      background: none;
      border: none;
      font-family: var(--font-primary);
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text, #111);
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .accordion-trigger:hover {
      background: var(--color-background-alt, #f8f9fa);
    }
    
    .accordion-trigger.active {
      background: var(--color-background-alt, #f8f9fa);
      color: var(--color-primary, #007bff);
    }
    
    .accordion-icon {
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }
    
    .accordion-trigger.active .accordion-icon {
      transform: rotate(180deg);
    }
    
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .accordion-content.active {
      max-height: 500px;
    }
    
    .accordion-answer {
      padding: 0 24px 20px;
      font-family: var(--font-secondary);
      font-size: 16px;
      line-height: 1.8;
      color: var(--color-text-secondary, #666);
      margin: 0;
    }
    
    /* Testimonial Style */
    .content-testimonial {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .testimonial-wrapper {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .testimonial-image {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
    }
    
    .testimonial-image img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 20px;
    }
    
    .testimonial-quote {
      margin: 0 0 30px;
    }
    
    .testimonial-author {
      margin-bottom: 16px;
    }
    
    .author-name {
      font-family: var(--font-primary);
      font-size: 20px;
      font-weight: 600;
      font-style: normal;
      color: var(--color-primary, #007bff);
      display: block;
      margin-bottom: 4px;
    }
    
    .author-role {
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-text-secondary, #666);
    }
    
    .testimonial-rating {
      display: flex;
      gap: 4px;
    }
    
    .rating-star {
      color: #fbbf24;
    }
    
    /* Title Animations */
    .title-typewriter {
      position: relative;
      display: inline-block;
    }
    
    .title-typewriter::after {
      content: '|';
      position: absolute;
      right: -10px;
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .title-gradient {
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary, #6c757d));
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-shift 3s ease infinite;
    }
    
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .title-glitch {
      position: relative;
      animation: glitch 2s infinite;
    }
    
    .title-glitch::before,
    .title-glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .title-glitch::before {
      animation: glitch-1 0.5s infinite;
      color: var(--color-primary);
      z-index: -1;
    }
    
    .title-glitch::after {
      animation: glitch-2 0.5s infinite;
      color: var(--color-secondary, #6c757d);
      z-index: -2;
    }
    
    @keyframes glitch {
      0%, 100% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
    }
    
    @keyframes glitch-1 {
      0%, 100% { clip-path: inset(0 0 0 0); }
      25% { clip-path: inset(0 100% 0 0); }
      50% { clip-path: inset(0 0 100% 0); }
      75% { clip-path: inset(100% 0 0 0); }
    }
    
    @keyframes glitch-2 {
      0%, 100% { transform: translate(0); }
      33% { transform: translate(-1px); }
      66% { transform: translate(1px); }
    }
    
    /* Gradient Backgrounds - Même que Contact/CTA */
    .gradient-purple-blue {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
    }
    
    .gradient-orange-pink {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .gradient-green-blue {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    .gradient-red-purple {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }
    
    /* Variant: Glassmorphism */
    .glassmorphism {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
    }
    
    .glassmorphism .content-wrapper,
    .glassmorphism .content-quote-wrapper,
    .glassmorphism .comparison-item,
    .glassmorphism .timeline-content,
    .glassmorphism .accordion-item,
    .glassmorphism .testimonial-wrapper {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 48px;
    }
    
    .glassmorphism .content-title,
    .glassmorphism .content-subtitle,
    .glassmorphism .content-body,
    .glassmorphism .content-feature,
    .glassmorphism .quote-text,
    .glassmorphism .quote-author {
      color: white;
    }
    
    .glassmorphism .content-eyebrow {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .glassmorphism .content-button.secondary {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      color: white;
    }
    
    /* Variant: Gradient Wave */
    .gradient-wave {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
      position: relative;
    }
    
    .gradient-wave::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
      background-size: cover;
    }
    
    .gradient-wave .content-title,
    .gradient-wave .content-subtitle,
    .gradient-wave .content-body,
    .gradient-wave .content-feature {
      color: white;
    }
    
    .gradient-wave .content-eyebrow {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    /* Variant: Floating Cards */
    .floating-cards .content-wrapper,
    .floating-cards .content-quote-wrapper,
    .floating-cards .comparison-item,
    .floating-cards .timeline-content,
    .floating-cards .stat-item,
    .floating-cards .accordion-item {
      background: white;
      border-radius: 20px;
      padding: 48px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    
    .floating-cards::before,
    .floating-cards::after {
      content: '';
      position: absolute;
      border-radius: 20px;
      opacity: 0.1;
    }
    
    .floating-cards::before {
      top: 10%;
      left: 5%;
      width: 250px;
      height: 250px;
      background: var(--color-primary, #007bff);
      animation: float 6s ease-in-out infinite;
    }
    
    .floating-cards::after {
      bottom: 10%;
      right: 5%;
      width: 200px;
      height: 200px;
      background: var(--color-secondary, #6c757d);
      animation: float 8s ease-in-out infinite reverse;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    /* Variant: Neon Glow */
    .neon-glow {
      background: #0a0a0a;
    }
    
    .neon-glow .content-wrapper,
    .neon-glow .content-quote-wrapper,
    .neon-glow .comparison-item,
    .neon-glow .timeline-content,
    .neon-glow .accordion-item {
      border: 2px solid var(--color-primary, #007bff);
      border-radius: 20px;
      padding: 48px;
      position: relative;
      box-shadow: 
        0 0 20px var(--color-primary),
        inset 0 0 20px rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
    }
    
    .neon-glow .content-title {
      color: white;
      text-shadow: 0 0 20px var(--color-primary);
    }
    
    .neon-glow .content-subtitle,
    .neon-glow .content-body,
    .neon-glow .content-feature {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .neon-glow .content-eyebrow {
      background: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      box-shadow: 0 0 10px var(--color-primary);
    }
    
    /* Variant: Minimal Luxe */
    .minimal-luxe {
      background: #fafafa;
    }
    
    .minimal-luxe .content-wrapper,
    .minimal-luxe .content-quote-wrapper,
    .minimal-luxe .comparison-item,
    .minimal-luxe .timeline-content,
    .minimal-luxe .accordion-item {
      background: white;
      padding: 64px;
      border-radius: 0;
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    }
    
    .minimal-luxe .content-title {
      font-weight: 300;
      letter-spacing: -1px;
    }
    
    .minimal-luxe .content-eyebrow {
      background: transparent;
      color: var(--color-text-secondary);
      padding: 0;
      margin-bottom: 40px;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    
    .minimal-luxe .content-button {
      border-radius: 0;
    }
    
    /* Variant: Split Screen */
    .split-screen .content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .split-screen .content-text {
      padding: 48px;
    }
    
    .split-screen .content-image {
      height: 100%;
      border-radius: 0;
    }
    
    .split-screen .content-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0;
    }
    
    /* Variant: Particles */
    .particles {
      background: #1a1a2e;
      position: relative;
    }
    
    .particles-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .particles .content-wrapper,
    .particles .content-quote-wrapper,
    .particles .comparison-item,
    .particles .timeline-content,
    .particles .accordion-item {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 48px;
    }
    
    .particles .content-title,
    .particles .content-subtitle,
    .particles .content-body,
    .particles .content-feature {
      color: white;
    }
    
    /* Variant: 3D Perspective */
    .3d-perspective {
      perspective: 1000px;
    }
    
    .3d-perspective .content-wrapper,
    .3d-perspective .content-quote-wrapper,
    .3d-perspective .comparison-item,
    .3d-perspective .timeline-content,
    .3d-perspective .accordion-item {
      background: white;
      padding: 48px;
      border-radius: 20px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
      transform: rotateX(5deg) rotateY(-5deg);
      transition: transform 0.3s ease;
    }
    
    .3d-perspective .content-wrapper:hover,
    .3d-perspective .content-quote-wrapper:hover,
    .3d-perspective .comparison-item:hover,
    .3d-perspective .timeline-content:hover,
    .3d-perspective .accordion-item:hover {
      transform: rotateX(0) rotateY(0);
    }
    
    /* Animations */
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
    
    /* Responsive */
    @media (max-width: 768px) {
      .content-ultra {
        padding: 60px 0;
      }
      
      .content-wrapper {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .content-image {
        order: -1;
      }
      
      .content-title {
        font-size: 28px;
      }
      
      .content-subtitle {
        font-size: 18px;
      }
      
      .comparison-grid {
        grid-template-columns: 1fr;
      }
      
      .comparison-divider {
        display: none;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
      
      .tabs-nav {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      
      .testimonial-wrapper {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .testimonial-image {
        max-width: 200px;
        margin: 0 auto;
      }
      
      .split-screen .content-wrapper {
        grid-template-columns: 1fr;
      }
      
      .split-screen .content-image {
        height: 300px;
        order: -1;
      }
      
      .glassmorphism .content-wrapper,
      .floating-cards .content-wrapper,
      .neon-glow .content-wrapper,
      .minimal-luxe .content-wrapper,
      .particles .content-wrapper,
      .3d-perspective .content-wrapper {
        padding: 32px 24px;
      }
      
      .content-buttons {
        flex-direction: column;
        width: 100%;
      }
      
      .content-button {
        width: 100%;
        justify-content: center;
      }
    }
    
    @media (max-width: 480px) {
      .content-ultra {
        padding: 40px 0;
      }
      
      .content-title {
        font-size: 24px;
      }
      
      .content-subtitle {
        font-size: 16px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .stat-value {
        font-size: 36px;
      }
    }
  `;

  const js = `
    (function() {
      // Title animations
      const animatedTitles = document.querySelectorAll('.title-typewriter');
      animatedTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.visibility = 'visible';
        
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        };
        
        // Start animation when in viewport
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              typeWriter();
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(title);
      });
      
      // Glitch effect
      const glitchTitles = document.querySelectorAll('.title-glitch');
      glitchTitles.forEach(title => {
        title.setAttribute('data-text', title.textContent);
      });
      
      // Stats counter animation
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const finalValue = stat.parentElement.dataset.value;
        const duration = 2000;
        const start = 0;
        const increment = finalValue / (duration / 16);
        
        let current = start;
        
        const counter = () => {
          current += increment;
          if (current < finalValue) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(counter);
          } else {
            stat.textContent = finalValue;
          }
        };
        
        // Start animation when in viewport
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              counter();
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(stat);
      });
      
      // Tabs functionality
      const tabButtons = document.querySelectorAll('.tab-button');
      const tabPanels = document.querySelectorAll('.tab-panel');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabIndex = button.dataset.tab;
          
          // Remove active class from all
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabPanels.forEach(panel => panel.classList.remove('active'));
          
          // Add active class to clicked
          button.classList.add('active');
          document.querySelector(\`.tab-panel[data-panel="\${tabIndex}"]\`).classList.add('active');
        });
      });
      
      // Accordion functionality
      const accordionTriggers = document.querySelectorAll('.accordion-trigger');
      
      accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const content = trigger.nextElementSibling;
          const isActive = trigger.classList.contains('active');
          
          // Close all accordions
          accordionTriggers.forEach(t => {
            t.classList.remove('active');
            t.nextElementSibling.classList.remove('active');
          });
          
          // Open clicked accordion if it wasn't active
          if (!isActive) {
            trigger.classList.add('active');
            content.classList.add('active');
          }
        });
      });
      
      // Particles animation for particles variant
      const particlesSection = document.querySelector('.content-ultra.particles');
      if (particlesSection) {
        const particlesBg = particlesSection.querySelector('.particles-bg');
        
        // Create particles
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.width = '2px';
          particle.style.height = '2px';
          particle.style.background = 'white';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.opacity = Math.random();
          particle.style.animation = \`particles-float \${10 + Math.random() * 20}s linear infinite\`;
          particle.style.animationDelay = Math.random() * 10 + 's';
          particlesBg.appendChild(particle);
        }
      }
      
      // Parallax effect for images
      const parallaxImages = document.querySelectorAll('.content-image img');
      
      window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
          const rect = img.getBoundingClientRect();
          const speed = 0.5;
          const yPos = rect.top * speed;
          
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            img.style.transform = \`translateY(\${yPos}px)\`;
          }
        });
      });
    })();
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}
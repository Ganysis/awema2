import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Services Ultra-Moderne - Présentation révolutionnaire des services
 * 8 variantes visuelles spectaculaires
 */
export const servicesUltraModern: Block = {
  id: 'services-ultra-modern',
  name: 'Services Ultra-Moderne',
  description: 'Section services avec animations 3D, filtres dynamiques et 8 designs époustouflants',
  category: BlockCategory.FEATURES,
  tags: ['services', 'modern', 'animated', '3d', 'interactive', 'filterable'],
  thumbnail: '/blocks/services-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel',
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
      name: 'layout',
      type: PropType.STRING,
      description: 'Type de mise en page',
      defaultValue: 'grid',
      required: true,
      validation: {
        options: [
          { label: 'Grille', value: 'grid' },
          { label: 'Carousel', value: 'carousel' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Cards 3D', value: 'cards-3d' },
          { label: 'Hexagones', value: 'hexagon' },
          { label: 'Bento Box', value: 'bento' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 2
      }
    },
    {
      name: 'columns',
      type: PropType.NUMBER,
      description: 'Nombre de colonnes (mode grille)',
      defaultValue: 3,
      required: false,
      validation: {
        min: 2,
        max: 4
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 3,
        condition: { prop: 'layout', value: 'grid' }
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      defaultValue: 'Nos Services',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 4
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Découvrez notre expertise à votre service',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 5
      }
    },
    {
      name: 'services',
      type: PropType.ARRAY,
      description: 'Liste des services',
      defaultValue: [
        {
          title: 'Installation électrique',
          description: 'Installation complète aux normes',
          icon: 'bolt',
          image: '',
          price: 'À partir de 50€/h',
          features: ['Devis gratuit', 'Garantie 10 ans', 'Intervention 24/7'],
          link: '#',
          category: 'installation'
        },
        {
          title: 'Dépannage urgent',
          description: 'Intervention rapide 24/7',
          icon: 'wrench',
          image: '',
          price: 'À partir de 80€',
          features: ['Disponible 24/7', 'Diagnostic gratuit', 'Sans frais de déplacement'],
          link: '#',
          category: 'depannage'
        },
        {
          title: 'Rénovation électrique',
          description: 'Mise aux normes complète',
          icon: 'home',
          image: '',
          price: 'Sur devis',
          features: ['Étude personnalisée', 'Matériel certifié', 'Suivi de chantier'],
          link: '#',
          category: 'renovation'
        }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.OBJECT_ARRAY,
        group: 'Services',
        order: 6,
        schema: [
          { name: 'title', type: PropType.STRING, label: 'Titre du service' },
          { name: 'description', type: PropType.STRING, label: 'Description' },
          { 
            name: 'icon', 
            type: PropType.STRING, 
            label: 'Icône',
            options: ['bolt', 'wrench', 'home', 'shield', 'clock', 'star', 'check', 'tool']
          },
          { name: 'image', type: PropType.STRING, label: 'Image', control: EditorControl.IMAGE },
          { name: 'price', type: PropType.STRING, label: 'Prix' },
          { 
            name: 'features', 
            type: PropType.ARRAY, 
            label: 'Caractéristiques',
            control: EditorControl.STRING_ARRAY
          },
          { name: 'link', type: PropType.STRING, label: 'Lien' },
          { 
            name: 'category', 
            type: PropType.STRING, 
            label: 'Catégorie',
            options: ['installation', 'depannage', 'renovation', 'conseil', 'autre']
          }
        ]
      }
    },
    {
      name: 'showFilters',
      type: PropType.BOOLEAN,
      description: 'Afficher les filtres par catégorie',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 7
      }
    },
    {
      name: 'showPrices',
      type: PropType.BOOLEAN,
      description: 'Afficher les prix',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 8
      }
    },
    {
      name: 'showFeatures',
      type: PropType.BOOLEAN,
      description: 'Afficher les caractéristiques',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 9
      }
    },
    {
      name: 'ctaText',
      type: PropType.STRING,
      description: 'Texte du bouton CTA',
      defaultValue: 'En savoir plus',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Actions',
        order: 10
      }
    },
    {
      name: 'hoverEffect',
      type: PropType.STRING,
      description: 'Effet au survol',
      defaultValue: 'scale',
      required: false,
      validation: {
        options: [
          { label: 'Scale', value: 'scale' },
          { label: 'Rotate 3D', value: 'rotate3d' },
          { label: 'Flip', value: 'flip' },
          { label: 'Glow', value: 'glow' },
          { label: 'Slide', value: 'slide' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Animations',
        order: 11
      }
    },
    {
      name: 'animateOnScroll',
      type: PropType.BOOLEAN,
      description: 'Animation au scroll',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Animations',
        order: 12
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    layout: 'grid',
    columns: 3,
    title: 'Nos Services',
    showFilters: true,
    showPrices: true,
    showFeatures: true,
    animateOnScroll: true
  }
};

export function renderServicesUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    layout = 'grid',
    columns = 3,
    title = 'Nos Services',
    subtitle = '',
    services = [],
    showFilters = true,
    showPrices = true,
    showFeatures = true,
    ctaText = 'En savoir plus',
    hoverEffect = 'scale',
    animateOnScroll = true
  } = props;

  // Parse arrays if needed
  const servicesList = typeof services === 'string' ? JSON.parse(services) : services;

  // Get unique categories
  const categories = ['all', ...new Set(servicesList.map((s: any) => s.category).filter(Boolean))];

  const css = `
    .services-ultra-modern {
      padding: 4rem 2rem;
      position: relative;
      overflow: hidden;
    }
    
    .services-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .services-title {
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 1rem;
    }
    
    .services-subtitle {
      font-size: 1.25rem;
      opacity: 0.8;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .services-filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }
    
    .filter-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 2rem;
      background: rgba(255, 255, 255, 0.1);
      color: currentColor;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .filter-button:hover,
    .filter-button.active {
      background: var(--color-primary, #3b82f6);
      color: white;
      transform: translateY(-2px);
    }
    
    .services-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .services-grid.cols-2 {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
    
    .services-grid.cols-4 {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    
    .service-card {
      position: relative;
      border-radius: 1rem;
      padding: 2rem;
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
    }
    
    .service-icon {
      width: 60px;
      height: 60px;
      margin-bottom: 1.5rem;
      color: var(--color-primary, #3b82f6);
    }
    
    .service-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .service-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }
    
    .service-description {
      opacity: 0.8;
      margin-bottom: 1rem;
    }
    
    .service-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-primary, #3b82f6);
      margin-bottom: 1rem;
    }
    
    .service-features {
      list-style: none;
      padding: 0;
      margin-bottom: 1.5rem;
    }
    
    .service-feature {
      padding: 0.25rem 0;
      opacity: 0.8;
      position: relative;
      padding-left: 1.5rem;
    }
    
    .service-feature:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--color-primary, #3b82f6);
    }
    
    .service-cta {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: var(--color-primary, #3b82f6);
      color: white;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .service-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
    
    /* Hover Effects */
    .hover-scale:hover {
      transform: scale(1.05);
    }
    
    .hover-rotate3d:hover {
      transform: perspective(1000px) rotateY(10deg);
    }
    
    .hover-glow:hover {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    }
    
    /* Variant: Glassmorphism */
    .variant-glassmorphism {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .variant-glassmorphism .service-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    /* Variant: Gradient Wave */
    .variant-gradient-wave {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    
    .variant-gradient-wave .service-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
    }
    
    /* Variant: Neon Glow */
    .variant-neon-glow {
      background: #0a0a0a;
      color: white;
    }
    
    .variant-neon-glow .service-card {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(0, 255, 136, 0.3);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
    }
    
    .variant-neon-glow .service-card:hover {
      border-color: #00ff88;
      box-shadow: 0 0 40px rgba(0, 255, 136, 0.5);
    }
    
    /* Variant: Minimal Luxe */
    .variant-minimal-luxe {
      background: #fafafa;
      color: #1a202c;
    }
    
    .variant-minimal-luxe .service-card {
      background: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    /* Variant: Floating Cards */
    .variant-floating-cards .service-card {
      background: white;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transform: translateY(0);
    }
    
    .variant-floating-cards .service-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }
    
    /* Layout: Timeline */
    .layout-timeline {
      position: relative;
      padding: 2rem 0;
    }
    
    .layout-timeline:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--color-primary, #3b82f6);
      transform: translateX(-50%);
    }
    
    .layout-timeline .service-card {
      width: calc(50% - 2rem);
      margin-bottom: 2rem;
    }
    
    .layout-timeline .service-card:nth-child(odd) {
      margin-left: auto;
      margin-right: 2rem;
    }
    
    .layout-timeline .service-card:nth-child(even) {
      margin-right: auto;
      margin-left: 2rem;
    }
    
    /* Layout: Carousel */
    .layout-carousel {
      display: flex;
      gap: 2rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: 1rem;
    }
    
    .layout-carousel .service-card {
      flex: 0 0 350px;
      scroll-snap-align: start;
    }
    
    /* Layout: Hexagon */
    .layout-hexagon {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .layout-hexagon .service-card {
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    
    /* Layout: Bento Box */
    .layout-bento {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1.5rem;
      grid-auto-rows: 250px;
    }
    
    .layout-bento .service-card:nth-child(1) {
      grid-column: span 3;
      grid-row: span 2;
    }
    
    .layout-bento .service-card:nth-child(2) {
      grid-column: span 3;
    }
    
    .layout-bento .service-card:nth-child(3) {
      grid-column: span 3;
    }
    
    .layout-bento .service-card:nth-child(4) {
      grid-column: span 2;
    }
    
    .layout-bento .service-card:nth-child(5) {
      grid-column: span 2;
    }
    
    .layout-bento .service-card:nth-child(6) {
      grid-column: span 2;
    }
    
    /* Animations */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
      
      .layout-timeline:before {
        left: 20px;
      }
      
      .layout-timeline .service-card {
        width: calc(100% - 3rem);
        margin-left: 3rem !important;
        margin-right: 0 !important;
      }
      
      .layout-bento {
        grid-template-columns: 1fr;
      }
      
      .layout-bento .service-card {
        grid-column: span 1 !important;
        grid-row: span 1 !important;
      }
    }
  `;

  const html = `
    <section class="services-ultra-modern variant-${variant}">
      ${title || subtitle ? `
        <div class="services-header">
          ${title ? `<h2 class="services-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="services-subtitle">${subtitle}</p>` : ''}
        </div>
      ` : ''}
      
      ${showFilters && categories.length > 2 ? `
        <div class="services-filters">
          ${categories.map(cat => `
            <button class="filter-button ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
              ${cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="services-container">
        <div class="services-grid layout-${layout} cols-${columns}">
          ${servicesList.map((service: any, index: number) => `
            <div class="service-card hover-${hoverEffect} ${animateOnScroll ? 'animate-on-scroll' : ''}" 
                 data-category="${service.category || 'autre'}"
                 style="animation-delay: ${index * 0.1}s">
              ${service.image ? `
                <img src="${service.image}" alt="${service.title}" class="service-image">
              ` : service.icon ? `
                <svg class="service-icon" fill="currentColor" viewBox="0 0 24 24">
                  ${getIconPath(service.icon)}
                </svg>
              ` : ''}
              
              <h3 class="service-title">${service.title || ''}</h3>
              <p class="service-description">${service.description || ''}</p>
              
              ${showPrices && service.price ? `
                <div class="service-price">${service.price}</div>
              ` : ''}
              
              ${showFeatures && service.features && service.features.length > 0 ? `
                <ul class="service-features">
                  ${service.features.map((feature: string) => `
                    <li class="service-feature">${feature}</li>
                  `).join('')}
                </ul>
              ` : ''}
              
              ${service.link ? `
                <a href="${service.link}" class="service-cta">${ctaText}</a>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const js = `
    ${showFilters ? `
    // Filter functionality
    document.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter services
        document.querySelectorAll('.service-card').forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
    ` : ''}
    
    ${animateOnScroll ? `
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    ` : ''}
  `;

  return { html, css, js };
}

// Helper function for icons
function getIconPath(icon: string): string {
  const icons: Record<string, string> = {
    bolt: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    wrench: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    shield: '<path d="M12 2l8 4v6c0 4-3.5 7.5-8 9-4.5-1.5-8-5-8-9V6l8-4z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
  };
  
  return icons[icon] || icons.bolt;
}
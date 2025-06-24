import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const beforeAfter: Block = {
  id: 'before-after',
  name: 'Avant/Après',
  description: 'Comparaison interactive avant/après pour montrer vos réalisations',
  category: BlockCategory.GALLERY,
  tags: ['gallery', 'before', 'after', 'comparison', 'slider', 'interactive'],
  thumbnail: '/blocks/before-after.svg',
  performanceImpact: PerformanceImpact.MEDIUM,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      required: false,
      defaultValue: 'Nos Réalisations',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de la section',
        group: 'Contenu',
        order: 1
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      required: false,
      defaultValue: 'Découvrez la transformation',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Sous-titre de la section',
        group: 'Contenu',
        order: 2
      }
    },
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style de présentation',
      required: true,
      defaultValue: 'slider',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Style',
        order: 3
      },
      validation: {
        options: [
          { value: 'slider', label: 'Slider interactif' },
          { value: 'fade', label: 'Transition en fondu' },
          { value: 'split', label: 'Vue divisée' },
          { value: 'reveal', label: 'Révélation au survol' }
        ]
      }
    },
    {
      name: 'comparisons',
      type: PropType.STRING,
      description: 'Liste des comparaisons avant/après',
      required: true,
      defaultValue: JSON.stringify([
        {
          id: '1',
          title: 'Rénovation Salle de Bain',
          beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
          afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
          description: 'Transformation complète avec nouveaux carrelages et sanitaires'
        },
        {
          id: '2',
          title: 'Réfection Cuisine',
          beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
          afterImage: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800',
          description: 'Modernisation complète de l\'espace cuisine'
        }
      ]),
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{id, title, beforeImage, afterImage, description}, ...]',
        group: 'Comparaisons',
        order: 4
      }
    },
    {
      name: 'showLabels',
      type: PropType.STRING,
      description: 'Afficher les labels "Avant/Après"',
      required: false,
      defaultValue: 'true',
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 5
      }
    }
  ],
  variants: [
    {
      id: 'slider',
      name: 'Slider Interactif',
      description: 'Glissière interactive pour comparer',
      modifications: {}
    },
    {
      id: 'fade',
      name: 'Transition Fondu',
      description: 'Transition douce entre avant et après',
      modifications: {}
    },
    {
      id: 'split',
      name: 'Vue Divisée',
      description: 'Affichage côte à côte',
      modifications: {}
    },
    {
      id: 'reveal',
      name: 'Révélation',
      description: 'Révèle l\'après au survol',
      modifications: {}
    }
  ],
  defaultProps: {
    title: 'Nos Réalisations',
    subtitle: 'Découvrez la transformation',
    variant: 'slider',
    comparisons: [
      {
        id: '1',
        title: 'Rénovation Salle de Bain',
        beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
        description: 'Transformation complète avec nouveaux carrelages et sanitaires'
      }
    ],
    showLabels: true
  }
};

export function renderBeforeAfter(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    title = 'Nos Réalisations',
    subtitle = '',
    variant = 'slider',
    comparisons = [],
    showLabels = true
  } = props;

  // Parse comparisons if string
  const comparisonsList = typeof comparisons === 'string' ? JSON.parse(comparisons) : comparisons;

  // Generate HTML based on variant
  const generateComparisonHTML = (comparison: any, index: number) => {
    switch (variant) {
      case 'slider':
        return `
          <div class="comparison-item slider-variant" data-index="${index}">
            <h3 class="comparison-title">${comparison.title}</h3>
            <div class="comparison-container">
              <div class="comparison-slider" id="comparison-${comparison.id}">
                <div class="image-container">
                  <img src="${comparison.beforeImage}" alt="${comparison.title} - Avant" class="before-image">
                  ${showLabels ? '<span class="label label-before">Avant</span>' : ''}
                </div>
                <div class="image-container after">
                  <img src="${comparison.afterImage}" alt="${comparison.title} - Après" class="after-image">
                  ${showLabels ? '<span class="label label-after">Après</span>' : ''}
                </div>
                <div class="slider-handle">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="var(--color-primary)"/>
                    <path d="M13 20L10 17M10 17L13 14M10 17H30M27 20L30 23M30 23L27 26M30 23H10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              ${comparison.description ? `<p class="comparison-description">${comparison.description}</p>` : ''}
            </div>
          </div>
        `;
      
      case 'fade':
        return `
          <div class="comparison-item fade-variant" data-index="${index}">
            <h3 class="comparison-title">${comparison.title}</h3>
            <div class="comparison-container">
              <div class="comparison-fade" id="comparison-${comparison.id}">
                <img src="${comparison.beforeImage}" alt="${comparison.title} - Avant" class="before-image">
                <img src="${comparison.afterImage}" alt="${comparison.title} - Après" class="after-image">
                ${showLabels ? `
                  <div class="labels">
                    <span class="label label-before active">Avant</span>
                    <span class="label label-after">Après</span>
                  </div>
                ` : ''}
              </div>
              ${comparison.description ? `<p class="comparison-description">${comparison.description}</p>` : ''}
            </div>
          </div>
        `;
      
      case 'split':
        return `
          <div class="comparison-item split-variant" data-index="${index}">
            <h3 class="comparison-title">${comparison.title}</h3>
            <div class="comparison-container">
              <div class="comparison-split">
                <div class="split-image before">
                  <img src="${comparison.beforeImage}" alt="${comparison.title} - Avant">
                  ${showLabels ? '<span class="label">Avant</span>' : ''}
                </div>
                <div class="split-image after">
                  <img src="${comparison.afterImage}" alt="${comparison.title} - Après">
                  ${showLabels ? '<span class="label">Après</span>' : ''}
                </div>
              </div>
              ${comparison.description ? `<p class="comparison-description">${comparison.description}</p>` : ''}
            </div>
          </div>
        `;
      
      case 'reveal':
        return `
          <div class="comparison-item reveal-variant" data-index="${index}">
            <h3 class="comparison-title">${comparison.title}</h3>
            <div class="comparison-container">
              <div class="comparison-reveal" id="comparison-${comparison.id}">
                <img src="${comparison.beforeImage}" alt="${comparison.title} - Avant" class="before-image">
                <div class="reveal-overlay">
                  <img src="${comparison.afterImage}" alt="${comparison.title} - Après" class="after-image">
                </div>
                ${showLabels ? `
                  <div class="labels">
                    <span class="label label-before">Avant</span>
                    <span class="label label-after">Après</span>
                  </div>
                ` : ''}
              </div>
              ${comparison.description ? `<p class="comparison-description">${comparison.description}</p>` : ''}
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  };

  const html = `
    <section class="before-after-section ${variant}-variant">
      <div class="container">
        ${title || subtitle ? `
          <div class="section-header">
            ${title ? `<h2 class="section-title">${title}</h2>` : ''}
            ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
          </div>
        ` : ''}
        
        <div class="comparisons-grid">
          ${comparisonsList.map((comp: any, index: number) => generateComparisonHTML(comp, index)).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .before-after-section {
      padding: 80px 0;
      background: var(--color-background, #fff);
    }
    
    .before-after-section .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .before-after-section .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .before-after-section .section-title {
      font-size: 48px;
      font-weight: 700;
      color: var(--color-text, #111);
      margin: 0 0 20px;
    }
    
    .before-after-section .section-subtitle {
      font-size: 20px;
      color: var(--color-text-secondary, #666);
      margin: 0;
    }
    
    .comparisons-grid {
      display: grid;
      gap: 60px;
    }
    
    .comparison-item {
      position: relative;
    }
    
    .comparison-title {
      font-size: 28px;
      font-weight: 600;
      color: var(--color-text, #111);
      margin: 0 0 30px;
      text-align: center;
    }
    
    .comparison-container {
      position: relative;
    }
    
    .comparison-description {
      margin-top: 20px;
      text-align: center;
      color: var(--color-text-secondary, #666);
      font-size: 16px;
    }
    
    /* Slider Variant Styles */
    .slider-variant .comparison-slider {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      cursor: col-resize;
    }
    
    .slider-variant .image-container {
      position: relative;
      overflow: hidden;
    }
    
    .slider-variant .image-container.after {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }
    
    .slider-variant img {
      display: block;
      width: 100%;
      height: auto;
      max-width: none;
    }
    
    .slider-variant .after-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      max-width: none;
    }
    
    .slider-variant .slider-handle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      cursor: col-resize;
      user-select: none;
    }
    
    .slider-variant .label {
      position: absolute;
      top: 20px;
      padding: 8px 16px;
      background: var(--color-primary, #007bff);
      color: white;
      font-size: 14px;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .slider-variant .label-before {
      left: 20px;
    }
    
    .slider-variant .label-after {
      right: 20px;
    }
    
    /* Fade Variant Styles */
    .fade-variant .comparison-fade {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      cursor: pointer;
    }
    
    .fade-variant img {
      display: block;
      width: 100%;
      height: auto;
      transition: opacity 0.5s ease;
    }
    
    .fade-variant .after-image {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    
    .fade-variant .comparison-fade:hover .after-image {
      opacity: 1;
    }
    
    .fade-variant .labels {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
    }
    
    .fade-variant .label {
      padding: 8px 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .fade-variant .label.active {
      background: var(--color-primary, #007bff);
    }
    
    /* Split Variant Styles */
    .split-variant .comparison-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .split-variant .split-image {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .split-variant .split-image:hover {
      transform: scale(1.02);
    }
    
    .split-variant .split-image img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .split-variant .label {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 8px 16px;
      background: var(--color-primary, #007bff);
      color: white;
      font-size: 14px;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
    }
    
    /* Reveal Variant Styles */
    .reveal-variant .comparison-reveal {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      cursor: pointer;
    }
    
    .reveal-variant img {
      display: block;
      width: 100%;
      height: auto;
    }
    
    .reveal-variant .reveal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip-path: inset(0 100% 0 0);
      transition: clip-path 0.6s ease;
    }
    
    .reveal-variant .comparison-reveal:hover .reveal-overlay {
      clip-path: inset(0 0 0 0);
    }
    
    .reveal-variant .labels {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
    }
    
    .reveal-variant .label {
      padding: 8px 16px;
      background: var(--color-primary, #007bff);
      color: white;
      font-size: 14px;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
      transition: opacity 0.3s ease;
    }
    
    .reveal-variant .label-after {
      opacity: 0;
    }
    
    .reveal-variant .comparison-reveal:hover .label-before {
      opacity: 0;
    }
    
    .reveal-variant .comparison-reveal:hover .label-after {
      opacity: 1;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .before-after-section {
        padding: 60px 0;
      }
      
      .before-after-section .section-title {
        font-size: 36px;
      }
      
      .before-after-section .section-subtitle {
        font-size: 18px;
      }
      
      .comparison-title {
        font-size: 24px;
        margin-bottom: 20px;
      }
      
      .comparisons-grid {
        gap: 40px;
      }
      
      .split-variant .comparison-split {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .fade-variant .labels {
        bottom: 10px;
      }
      
      .slider-variant .label,
      .fade-variant .label,
      .split-variant .label,
      .reveal-variant .label {
        font-size: 12px;
        padding: 6px 12px;
      }
    }
    
    @media (max-width: 480px) {
      .before-after-section .section-title {
        font-size: 28px;
      }
      
      .comparison-title {
        font-size: 20px;
      }
      
      .slider-variant .slider-handle svg {
        width: 30px;
        height: 30px;
      }
    }
  `;

  const js = `
    (function() {
      // Slider variant functionality
      const sliders = document.querySelectorAll('.slider-variant .comparison-slider');
      
      sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const afterContainer = slider.querySelector('.image-container.after');
        let isActive = false;
        
        // Mouse events
        handle.addEventListener('mousedown', () => isActive = true);
        document.addEventListener('mouseup', () => isActive = false);
        document.addEventListener('mousemove', (e) => {
          if (!isActive) return;
          handleMove(e.clientX);
        });
        
        // Touch events
        handle.addEventListener('touchstart', () => isActive = true);
        document.addEventListener('touchend', () => isActive = false);
        document.addEventListener('touchmove', (e) => {
          if (!isActive) return;
          handleMove(e.touches[0].clientX);
        });
        
        // Click to set position
        slider.addEventListener('click', (e) => {
          handleMove(e.clientX);
        });
        
        function handleMove(clientX) {
          const rect = slider.getBoundingClientRect();
          const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
          const percentage = (x / rect.width) * 100;
          
          afterContainer.style.width = percentage + '%';
          handle.style.left = percentage + '%';
        }
      });
      
      // Fade variant functionality
      const fadeContainers = document.querySelectorAll('.fade-variant .comparison-fade');
      
      fadeContainers.forEach(container => {
        const labels = container.querySelectorAll('.label');
        const afterImage = container.querySelector('.after-image');
        
        labels.forEach(label => {
          label.addEventListener('click', (e) => {
            e.stopPropagation();
            const isAfter = label.classList.contains('label-after');
            
            labels.forEach(l => l.classList.remove('active'));
            label.classList.add('active');
            
            afterImage.style.opacity = isAfter ? '1' : '0';
          });
        });
      });
      
      // Add touch support for reveal variant on mobile
      const revealContainers = document.querySelectorAll('.reveal-variant .comparison-reveal');
      
      revealContainers.forEach(container => {
        let touchActive = false;
        
        container.addEventListener('touchstart', () => {
          touchActive = true;
          container.classList.add('touch-active');
        });
        
        container.addEventListener('touchend', () => {
          setTimeout(() => {
            touchActive = false;
            container.classList.remove('touch-active');
          }, 1000);
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
import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Hero Ultra-Moderne - Section héro révolutionnaire
 * 8 variantes visuelles spectaculaires
 */
export const heroUltraModern: Block = {
  id: 'hero-ultra-modern',
  name: 'Hero Ultra-Moderne',
  description: 'Section héro avec animations 3D, vidéo background et 8 designs époustouflants',
  category: BlockCategory.HERO,
  tags: ['hero', 'modern', 'animated', '3d', 'video', 'parallax'],
  thumbnail: '/blocks/hero-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.HIGH,
  
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
      defaultValue: 'centered',
      required: true,
      validation: {
        options: [
          { label: 'Centré', value: 'centered' },
          { label: 'Aligné à gauche', value: 'left-aligned' },
          { label: 'Deux colonnes', value: 'two-columns' },
          { label: 'Pleine largeur', value: 'fullwidth' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 2
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal',
      defaultValue: 'Transformez votre maison avec expertise',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 3
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Artisan électricien certifié depuis 2010',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 4
      }
    },
    {
      name: 'description',
      type: PropType.STRING,
      description: 'Description',
      defaultValue: 'Installation, dépannage et rénovation électrique. Intervention rapide 24/7.',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 5
      }
    },
    {
      name: 'primaryButton',
      type: PropType.OBJECT,
      description: 'Bouton principal',
      defaultValue: {
        text: 'Devis gratuit',
        link: '#contact',
        style: 'primary'
      },
      required: false,
      editorConfig: {
        control: EditorControl.OBJECT,
        group: 'Actions',
        order: 6,
        schema: [
          { name: 'text', type: PropType.STRING, label: 'Texte' },
          { name: 'link', type: PropType.STRING, label: 'Lien' },
          { 
            name: 'style', 
            type: PropType.STRING, 
            label: 'Style',
            options: ['primary', 'secondary', 'gradient', 'glass']
          }
        ]
      }
    },
    {
      name: 'secondaryButton',
      type: PropType.OBJECT,
      description: 'Bouton secondaire',
      defaultValue: {
        text: 'Nos services',
        link: '#services',
        style: 'secondary'
      },
      required: false,
      editorConfig: {
        control: EditorControl.OBJECT,
        group: 'Actions',
        order: 7,
        schema: [
          { name: 'text', type: PropType.STRING, label: 'Texte' },
          { name: 'link', type: PropType.STRING, label: 'Lien' },
          { 
            name: 'style', 
            type: PropType.STRING, 
            label: 'Style',
            options: ['primary', 'secondary', 'ghost', 'glass']
          }
        ]
      }
    },
    {
      name: 'backgroundType',
      type: PropType.STRING,
      description: 'Type de fond',
      defaultValue: 'gradient',
      required: false,
      validation: {
        options: [
          { label: 'Gradient', value: 'gradient' },
          { label: 'Image', value: 'image' },
          { label: 'Vidéo', value: 'video' },
          { label: 'Couleur unie', value: 'solid' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Fond',
        order: 8
      }
    },
    {
      name: 'backgroundImage',
      type: PropType.STRING,
      description: 'Image de fond',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.IMAGE,
        group: 'Fond',
        order: 9,
        condition: { prop: 'backgroundType', value: 'image' }
      }
    },
    {
      name: 'backgroundVideo',
      type: PropType.STRING,
      description: 'URL de la vidéo',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Fond',
        order: 10,
        placeholder: 'https://exemple.com/video.mp4',
        condition: { prop: 'backgroundType', value: 'video' }
      }
    },
    {
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Couleur de fond',
      defaultValue: '#1a202c',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Fond',
        order: 11,
        condition: { prop: 'backgroundType', value: 'solid' }
      }
    },
    {
      name: 'gradientStart',
      type: PropType.STRING,
      description: 'Couleur de début du gradient',
      defaultValue: '#667eea',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Fond',
        order: 12,
        condition: { prop: 'backgroundType', value: 'gradient' }
      }
    },
    {
      name: 'gradientEnd',
      type: PropType.STRING,
      description: 'Couleur de fin du gradient',
      defaultValue: '#764ba2',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Fond',
        order: 13,
        condition: { prop: 'backgroundType', value: 'gradient' }
      }
    },
    {
      name: 'overlay',
      type: PropType.BOOLEAN,
      description: 'Ajouter un overlay',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fond',
        order: 14
      }
    },
    {
      name: 'heroImage',
      type: PropType.STRING,
      description: 'Image principale',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.IMAGE,
        group: 'Média',
        order: 15,
        helpText: 'Utilisée en mode 2 colonnes ou split screen'
      }
    },
    {
      name: 'heroImagePosition',
      type: PropType.STRING,
      description: 'Position de l\'image',
      defaultValue: 'right',
      required: false,
      validation: {
        options: [
          { label: 'Droite', value: 'right' },
          { label: 'Gauche', value: 'left' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Média',
        order: 16,
        condition: { prop: 'layout', value: 'two-columns' }
      }
    },
    {
      name: 'showScrollIndicator',
      type: PropType.BOOLEAN,
      description: 'Indicateur de défilement',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Animations',
        order: 18
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    layout: 'centered',
    title: 'Transformez votre maison avec expertise',
    subtitle: 'Artisan électricien certifié depuis 2010',
    backgroundType: 'gradient',
    overlay: true,
    showScrollIndicator: true
  }
};

export function renderHeroUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    layout = 'centered',
    title = 'Transformez votre maison avec expertise',
    subtitle = '',
    description = '',
    primaryButton = null,
    secondaryButton = null,
    backgroundType = 'gradient',
    backgroundImage = '',
    backgroundVideo = '',
    backgroundColor = '#1a202c',
    gradientStart = '#667eea',
    gradientEnd = '#764ba2',
    overlay = true,
    heroImage = '',
    heroImagePosition = 'right',
    showScrollIndicator = true
  } = props;

  // Parse objects if needed
  const primaryBtn = typeof primaryButton === 'string' ? JSON.parse(primaryButton) : primaryButton;
  const secondaryBtn = typeof secondaryButton === 'string' ? JSON.parse(secondaryButton) : secondaryButton;

  const css = `
    .hero-ultra-modern {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    
    .hero-content {
      position: relative;
      z-index: 10;
      width: 100%;
      padding: 2rem;
    }
    
    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.5rem;
      opacity: 0.9;
      margin-bottom: 1rem;
    }
    
    .hero-description {
      font-size: 1.125rem;
      opacity: 0.8;
      margin-bottom: 2rem;
      max-width: 600px;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }
    
    .hero-button {
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
    }
    
    .button-primary {
      background: var(--color-primary, #3b82f6);
      color: white;
    }
    
    .button-primary:hover {
      background: var(--color-primary-dark, #2563eb);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
    
    .button-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }
    
    .button-secondary:hover {
      background: white;
      color: #1a202c;
    }
    
    .button-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .button-glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .button-ghost {
      background: transparent;
      color: currentColor;
      border: 2px solid currentColor;
    }
    
    .hero-features {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }
    
    .hero-feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }
    
    .hero-feature-icon {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--color-primary, #3b82f6);
    }
    
    .hero-background {
      position: absolute;
      inset: 0;
      z-index: 1;
    }
    
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
    
    .hero-image-wrapper {
      position: relative;
      height: 100%;
    }
    
    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      animation: bounce 2s infinite;
      z-index: 10;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-20px); }
    }
    
    /* Order utilities for flexbox */
    .order-1 { order: 1; }
    .order-2 { order: 2; }
    
    /* Variant: Glassmorphism */
    .variant-glassmorphism {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .variant-glassmorphism .hero-content {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 2rem;
      padding: 3rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .variant-glassmorphism .hero-title,
    .variant-glassmorphism .hero-subtitle,
    .variant-glassmorphism .hero-description {
      color: white;
    }
    
    /* Variant: Gradient Wave */
    .variant-gradient-wave {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      position: relative;
    }
    
    .variant-gradient-wave::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: white;
      clip-path: polygon(0 50%, 100% 0, 100% 100%, 0 100%);
    }
    
    /* Variant: Neon Glow */
    .variant-neon-glow {
      background: #0a0a0a;
      color: white;
    }
    
    .variant-neon-glow .hero-title {
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
    }
    
    .variant-neon-glow .button-primary {
      background: transparent;
      color: #00ff88;
      border: 2px solid #00ff88;
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    }
    
    /* Variant: Minimal Luxe */
    .variant-minimal-luxe {
      background: #fafafa;
      color: #1a202c;
    }
    
    .variant-minimal-luxe .hero-title,
    .variant-minimal-luxe .hero-subtitle,
    .variant-minimal-luxe .hero-description {
      color: #1a202c;
    }
    
    /* Variant: Split Screen */
    .variant-split-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    
    .variant-split-screen .hero-content {
      padding: 4rem;
      display: flex;
      align-items: center;
    }
    
    .variant-split-screen .hero-image-side {
      position: relative;
      height: 100vh;
      overflow: hidden;
    }
    
    /* Variant: Particles */
    .variant-particles {
      background: #1a202c;
      color: white;
    }
    
    /* Variant: 3D Perspective */
    .variant-3d-perspective {
      perspective: 1000px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .variant-3d-perspective .hero-content {
      transform: rotateY(-5deg) rotateX(5deg);
      transform-style: preserve-3d;
    }
    
    /* Layouts */
    .layout-centered {
      text-align: center;
    }
    
    .layout-centered .hero-description {
      margin-left: auto;
      margin-right: auto;
    }
    
    .layout-centered .hero-buttons {
      justify-content: center;
    }
    
    .layout-centered .hero-features {
      justify-content: center;
    }
    
    .layout-left-aligned {
      text-align: left;
    }
    
    .layout-two-columns .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    
    .layout-fullwidth .hero-container {
      max-width: 100%;
      padding: 0 4rem;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        width: 100%;
      }
      
      .hero-button {
        width: 100%;
        text-align: center;
      }
      
      .layout-two-columns .hero-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .layout-two-columns .hero-image-wrapper {
        order: 2 !important;
      }
      
      .layout-two-columns .hero-text-content {
        order: 1 !important;
      }
      
      .variant-split-screen {
        grid-template-columns: 1fr;
      }
      
      .variant-split-screen .hero-image-side {
        height: 300px;
      }
    }
  `;

  const html = `
    <section class="hero-ultra-modern variant-${variant} layout-${layout}" 
      ${backgroundType === 'gradient' ? `style="background: linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%);"` : ''}
      ${backgroundType === 'solid' ? `style="background-color: ${backgroundColor};"` : ''}>
      
      ${backgroundType === 'image' && backgroundImage ? `
        <div class="hero-background">
          <img src="${backgroundImage}" alt="" style="width: 100%; height: 100%; object-fit: cover;">
          ${overlay ? '<div class="hero-overlay"></div>' : ''}
        </div>
      ` : ''}
      
      ${backgroundType === 'video' && backgroundVideo ? `
        <div class="hero-background">
          <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
            <source src="${backgroundVideo}" type="video/mp4">
          </video>
          ${overlay ? '<div class="hero-overlay"></div>' : ''}
        </div>
      ` : ''}
      
      <div class="hero-content">
        <div class="hero-container">
          <div class="hero-text-content ${layout === 'two-columns' && heroImagePosition === 'left' ? 'order-2' : ''}">
            ${subtitle ? `<p class="hero-subtitle">${subtitle}</p>` : ''}
            <h1 class="hero-title">${title}</h1>
            ${description ? `<p class="hero-description">${description}</p>` : ''}
            
            ${(primaryBtn || secondaryBtn) ? `
              <div class="hero-buttons">
                ${primaryBtn && primaryBtn.text ? `
                  <a href="${primaryBtn.link || '#'}" class="hero-button button-${primaryBtn.style || 'primary'}">
                    ${primaryBtn.text}
                  </a>
                ` : ''}
                ${secondaryBtn && secondaryBtn.text ? `
                  <a href="${secondaryBtn.link || '#'}" class="hero-button button-${secondaryBtn.style || 'secondary'}">
                    ${secondaryBtn.text}
                  </a>
                ` : ''}
              </div>
            ` : ''}
          </div>
          
          ${layout === 'two-columns' && heroImage ? `
            <div class="hero-image-wrapper ${heroImagePosition === 'left' ? 'order-1' : ''}">
              <img src="${heroImage}" alt="${title}" class="hero-image">
            </div>
          ` : ''}
        </div>
      </div>
      
      ${variant === 'split-screen' && heroImage ? `
        <div class="hero-image-side">
          <img src="${heroImage}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      ` : ''}
      
      ${showScrollIndicator ? `
        <div class="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14m0 0l-7-7m7 7l7-7"/>
          </svg>
        </div>
      ` : ''}
    </section>
  `;

  const js = variant === 'particles' ? `
    // Particles animation
    // Simplified particles effect
  ` : '';

  return { html, css, js };
}
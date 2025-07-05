import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Features Ultra-Moderne - Bloc révolutionnaire avec animations avancées
 * 8 variantes visuelles impressionnantes avec options d'images
 */
export const featuresUltraModern: Block = {
  id: 'features-ultra-modern',
  name: 'Features Ultra-Moderne',
  description: 'Section features avec animations avancées, effets 3D et 8 designs magnifiques',
  category: BlockCategory.FEATURES,
  tags: ['features', 'modern', 'animated', '3d', 'interactive', 'images'],
  thumbnail: '/blocks/features-ultra-modern.jpg',
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
      name: 'displayMode',
      type: PropType.STRING,
      description: 'Mode d\'affichage',
      defaultValue: 'grid',
      required: true,
      validation: {
        options: [
          { label: 'Grille moderne', value: 'grid' },
          { label: 'Cards flottantes', value: 'floating' },
          { label: 'Timeline interactive', value: 'timeline' },
          { label: 'Tabs animés', value: 'tabs' },
          { label: 'Carrousel', value: 'carousel' },
          { label: 'Zigzag', value: 'zigzag' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Layout',
        order: 2
      }
    },
    {
      name: 'showImages',
      type: PropType.BOOLEAN,
      description: 'Afficher des images pour chaque feature',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Contenu',
        order: 3,
        helpText: 'Ajoute une image illustrative pour chaque fonctionnalité'
      }
    },
    {
      name: 'imagePosition',
      type: PropType.STRING,
      description: 'Position des images',
      defaultValue: 'bottom',
      required: false,
      validation: {
        options: [
          { label: 'En bas', value: 'bottom' },
          { label: 'En haut', value: 'top' },
          { label: 'À côté de l\'icône', value: 'beside-icon' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Contenu',
        order: 4,
        condition: {
          prop: 'showImages',
          value: true
        }
      }
    },
    {
      name: 'enableFilters',
      type: PropType.BOOLEAN,
      description: 'Activer les filtres dynamiques',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Interactivité',
        order: 5,
        helpText: 'Permet de filtrer les features par catégorie'
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal',
      defaultValue: 'Nos fonctionnalités',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 6
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Découvrez nos services et fonctionnalités',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 7
      }
    },
    {
      name: 'features',
      type: PropType.ARRAY,
      description: 'Liste des fonctionnalités',
      defaultValue: [
        {
          icon: 'sparkles',
          title: 'Innovation',
          description: 'Technologies de pointe pour des résultats exceptionnels',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
          imageAlt: 'Service professionnel',
          link: '',
          category: 'tech',
          highlight: false
        }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 8,
        helpText: 'Géré via l\'éditeur de collection'
      }
    },
    {
      name: 'columns',
      type: PropType.NUMBER,
      description: 'Nombre de colonnes (desktop)',
      defaultValue: 3,
      required: false,
      validation: {
        min: 2,
        max: 6
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 9,
        condition: {
          prop: 'displayMode',
          values: ['grid', 'floating']
        }
      }
    },
    {
      name: 'iconStyle',
      type: PropType.STRING,
      description: 'Style des icônes',
      defaultValue: 'contained',
      required: false,
      validation: {
        options: [
          { label: 'Contenu', value: 'contained' },
          { label: 'Outline', value: 'outline' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Glassmorphism', value: 'glass' },
          { label: 'Néomorphisme', value: 'neumorphism' },
          { label: '3D', value: '3d' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 10
      }
    },
    {
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Couleur de fond',
      defaultValue: 'transparent',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Design',
        order: 11
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
          { value: 'red-purple', label: 'Rouge → Violet' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 12
      }
    },
    {
      name: 'enableHoverEffects',
      type: PropType.BOOLEAN,
      description: 'Activer les effets au survol',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Animations',
        order: 13
      }
    },
    {
      name: 'hoverEffect',
      type: PropType.STRING,
      description: 'Type d\'effet au survol',
      defaultValue: 'lift',
      required: false,
      validation: {
        options: [
          { label: 'Soulèvement', value: 'lift' },
          { label: 'Zoom', value: 'zoom' },
          { label: 'Rotation 3D', value: 'rotate-3d' },
          { label: 'Glow', value: 'glow' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Animations',
        order: 14,
        condition: {
          prop: 'enableHoverEffects',
          value: true
        }
      }
    },
    {
      name: 'animationDelay',
      type: PropType.NUMBER,
      description: 'Délai entre animations (ms)',
      defaultValue: 100,
      required: false,
      validation: {
        min: 0,
        max: 500
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Animations',
        order: 15
      }
    },
    {
      name: 'showNumbers',
      type: PropType.BOOLEAN,
      description: 'Afficher les numéros',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Contenu',
        order: 16
      }
    }
  ],
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    displayMode: 'grid',
    showImages: false,
    imagePosition: 'bottom',
    enableFilters: false,
    title: 'Nos fonctionnalités',
    subtitle: 'Découvrez nos services et fonctionnalités qui font la différence',
    features: [
      {
        icon: 'sparkles',
        title: 'Innovation continue',
        description: 'Nous repoussons constamment les limites de la technologie',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        imageAlt: 'Innovation technologique',
        link: '',
        category: 'tech',
        highlight: true
      },
      {
        icon: 'shield',
        title: 'Sécurité maximale',
        description: 'Protection de niveau bancaire pour vos données',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        imageAlt: 'Sécurité des données',
        link: '',
        category: 'security',
        highlight: false
      },
      {
        icon: 'lightning',
        title: 'Performance ultra',
        description: 'Vitesse et réactivité exceptionnelles',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
        imageAlt: 'Performance optimale',
        link: '',
        category: 'performance',
        highlight: false
      },
      {
        icon: 'heart',
        title: 'Experience utilisateur',
        description: 'Interface intuitive et agréable',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
        imageAlt: 'Interface utilisateur',
        link: '',
        category: 'ux',
        highlight: false
      },
      {
        icon: 'globe',
        title: 'Portée mondiale',
        description: 'Accessible partout dans le monde',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
        imageAlt: 'Accessibilité mondiale',
        link: '',
        category: 'global',
        highlight: false
      },
      {
        icon: 'support',
        title: 'Support 24/7',
        description: 'Une équipe toujours là pour vous',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        imageAlt: 'Support client',
        link: '',
        category: 'support',
        highlight: false
      }
    ],
    columns: 3,
    iconStyle: 'contained',
    backgroundColor: 'transparent',
    backgroundGradient: '',
    enableHoverEffects: true,
    hoverEffect: 'lift',
    animationDelay: 100,
    showNumbers: false,
    showImages: true,
    imagePosition: 'bottom'
  }
};

// Fonction de rendu principale
export function renderFeaturesUltraModern(props: any, variants: string[] = []): RenderedBlock {
  const config = { ...featuresUltraModern.defaultProps, ...props };
  
  // Base HTML structure
  const html = `
    <section class="features-ultra-modern ${config.variant} ${config.displayMode}" ${config.backgroundColor ? `style="background-color: ${config.backgroundColor};"` : ''}>
      ${renderBackground(config)}
      <div class="features-container">
        ${renderHeader(config)}
        ${config.enableFilters ? renderFilters(config) : ''}
        ${renderFeatures(config)}
      </div>
    </section>
  `;

  // CSS avec toutes les variantes
  const css = `
    .features-ultra-modern {
      position: relative;
      padding: 80px 20px;
      overflow: hidden;
    }

    .features-container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    /* Header Styles */
    .features-header {
      text-align: center;
      margin-bottom: 60px;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .features-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .features-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: #64748b;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.8;
    }

    /* Filter Styles */
    .features-filters {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 25px;
      border: 2px solid transparent;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      color: #475569;
    }

    .filter-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .filter-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    /* Grid Layout */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }

    .features-grid.columns-2 { grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); }
    .features-grid.columns-4 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .features-grid.columns-5 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .features-grid.columns-6 { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }

    /* Feature Card Base */
    .feature-card {
      position: relative;
      padding: 40px 30px;
      border-radius: 20px;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
      cursor: pointer;
    }

    .feature-card:nth-child(n) {
      animation-delay: calc(var(--delay) * 1ms);
    }

    /* Icon Container */
    .feature-icon-container {
      width: 80px;
      height: 80px;
      margin-bottom: 25px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon svg {
      width: 40px;
      height: 40px;
    }

    /* Feature Number */
    .feature-number {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }

    /* Feature Content */
    .feature-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      color: #1e293b;
    }

    .feature-description {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    /* Feature Image */
    .feature-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 12px;
      margin-top: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover .feature-image {
      transform: scale(1.02);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .image-position-top .feature-image {
      margin-top: 0;
      margin-bottom: 20px;
      order: -1;
    }

    .image-position-beside-icon {
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }

    .image-position-beside-icon .feature-icon-container {
      flex-shrink: 0;
    }

    .image-position-beside-icon .feature-image {
      width: 100px;
      height: 100px;
      margin-top: 0;
    }

    /* Variant: Glassmorphism */
    .glassmorphism .feature-card {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    }

    .glassmorphism .feature-icon-container {
      background: rgba(102, 126, 234, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }

    /* Variant: Gradient Wave */
    .gradient-wave {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }

    .gradient-wave::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
      background-size: cover;
    }

    .gradient-wave .feature-card {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    /* Variant: Floating Cards */
    .floating-cards .feature-card {
      background: white;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      animation: float 6s ease-in-out infinite;
    }

    .floating-cards .feature-card:nth-child(2n) {
      animation-delay: 1s;
    }

    .floating-cards .feature-card:nth-child(3n) {
      animation-delay: 2s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    /* Variant: Neon Glow */
    .neon-glow {
      background: #0a0a0a;
    }

    .neon-glow .feature-card {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid;
      border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
      position: relative;
      overflow: hidden;
    }

    .neon-glow .feature-card::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 20px;
      opacity: 0;
      z-index: -1;
      transition: opacity 0.3s ease;
      filter: blur(10px);
    }

    .neon-glow .feature-card:hover::before {
      opacity: 0.7;
    }

    .neon-glow .feature-title {
      color: white;
    }

    .neon-glow .feature-description {
      color: rgba(255, 255, 255, 0.7);
    }

    /* Variant: Minimal Luxe */
    .minimal-luxe .feature-card {
      background: white;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .minimal-luxe .feature-card:hover {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    .minimal-luxe .feature-icon-container {
      background: #f8fafc;
      border-radius: 16px;
    }

    /* Variant: Split Screen */
    .split-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      min-height: 600px;
    }

    .split-screen .features-container {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      max-width: 100%;
      padding: 0 60px;
    }

    .split-screen .features-header {
      grid-column: 1;
      text-align: left;
    }

    .split-screen .features-grid {
      grid-column: 2;
      gap: 20px;
    }

    /* Variant: Particles Background */
    .particles #particles-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .particles .feature-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
    }

    /* Variant: 3D Perspective */
    .3d-perspective {
      perspective: 1000px;
    }

    .3d-perspective .features-grid {
      transform-style: preserve-3d;
    }

    .3d-perspective .feature-card {
      background: white;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transform: rotateY(0deg);
      transform-style: preserve-3d;
    }

    /* Display Mode: Timeline */
    .timeline .features-grid {
      position: relative;
      padding: 60px 40px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline .features-grid::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, transparent, #667eea, #764ba2, transparent);
      transform: translateX(-50%);
    }

    .timeline .feature-card {
      width: calc(50% - 80px);
      margin-bottom: 80px;
      position: relative;
      background: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 40px;
      border-radius: 20px;
    }

    .timeline .feature-card::before {
      content: '';
      position: absolute;
      width: 40px;
      height: 2px;
      background: #e5e7eb;
      top: 50%;
      transform: translateY(-50%);
    }

    .timeline .feature-card::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 24px;
      background: #667eea;
      border: 4px solid white;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    }

    .timeline .feature-card:nth-child(odd) {
      margin-left: 0;
      margin-right: auto;
    }

    .timeline .feature-card:nth-child(odd)::before {
      right: -40px;
    }

    .timeline .feature-card:nth-child(odd)::after {
      right: -52px;
    }

    .timeline .feature-card:nth-child(even) {
      margin-left: auto;
      margin-right: 0;
    }

    .timeline .feature-card:nth-child(even)::before {
      left: -40px;
    }

    .timeline .feature-card:nth-child(even)::after {
      left: -52px;
    }

    .timeline .feature-icon-container {
      margin-bottom: 20px;
    }

    .timeline .feature-title {
      font-size: 1.75rem;
      margin-bottom: 20px;
    }

    .timeline .feature-description {
      font-size: 1.125rem;
      line-height: 1.8;
      margin-bottom: 25px;
    }

    .timeline .feature-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 12px;
      margin-top: 25px;
    }

    /* Display Mode: Tabs */
    .tabs .features-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 40px;
      min-height: 500px;
    }

    .tabs .tab-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .tabs .tab-button {
      padding: 20px;
      background: rgba(255, 255, 255, 0.8);
      border: 2px solid transparent;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 15px;
      color: #475569;
      font-weight: 500;
    }

    .tabs .tab-button:hover {
      background: rgba(255, 255, 255, 0.9);
      border-color: #e5e7eb;
    }

    .tabs .tab-button.active {
      background: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transform: translateX(10px);
      border-color: #667eea;
      color: #667eea;
    }

    .tabs .tab-content {
      padding: 40px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    .tabs .tab-content h3 {
      color: #1e293b;
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .tabs .tab-content p {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .tabs .tab-content a {
      background: #667eea;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      transition: background 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .tabs .tab-content a:hover {
      background: #5b63d8;
    }

    /* Display Mode: Carousel */
    .carousel .features-grid {
      display: flex;
      gap: 30px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: 20px;
    }

    .carousel .feature-card {
      flex: 0 0 350px;
      scroll-snap-align: center;
    }

    /* Display Mode: Zigzag */
    .zigzag .features-grid {
      display: flex;
      flex-direction: column;
      gap: 60px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .zigzag .feature-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .zigzag .feature-card:nth-child(even) {
      direction: rtl;
    }

    .zigzag .feature-card:nth-child(even) > * {
      direction: ltr;
    }

    /* Icon Styles */
    .icon-contained .feature-icon-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      color: white;
    }

    .icon-contained .feature-icon svg {
      fill: white;
    }

    .icon-outline .feature-icon-container {
      border: 3px solid;
      border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
      border-radius: 20px;
    }

    .icon-gradient .feature-icon svg {
      fill: url(#gradient);
    }

    .icon-glass .feature-icon-container {
      background: rgba(102, 126, 234, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(102, 126, 234, 0.2);
      border-radius: 20px;
    }

    .icon-neumorphism .feature-icon-container {
      background: #e0e5ec;
      box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
      border-radius: 20px;
    }

    .icon-3d .feature-icon-container {
      transform-style: preserve-3d;
      transform: rotateY(-20deg) rotateX(10deg);
      box-shadow: 
        20px 20px 60px rgba(0, 0, 0, 0.2),
        -20px -20px 60px rgba(255, 255, 255, 0.7);
    }

    /* Hover Effects */
    .hover-lift:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .hover-zoom:hover {
      transform: scale(1.05);
    }

    .hover-rotate-3d:hover {
      transform: perspective(1000px) rotateY(10deg) rotateX(-10deg);
    }

    .hover-glow:hover {
      box-shadow: 
        0 0 20px rgba(102, 126, 234, 0.5),
        0 0 40px rgba(102, 126, 234, 0.3),
        0 0 60px rgba(102, 126, 234, 0.1);
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .features-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }
      
      .split-screen .features-container {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .split-screen .features-header {
        grid-column: 1;
        text-align: center;
      }
      
      .split-screen .features-grid {
        grid-column: 1;
      }
      
      .tabs .features-grid {
        grid-template-columns: 1fr;
      }
      
      .tabs .tab-list {
        flex-direction: row;
        overflow-x: auto;
      }
      
      .timeline .features-grid {
        padding: 40px 20px;
      }
      
      .timeline .feature-card {
        width: calc(100% - 40px);
        margin-left: 40px !important;
        margin-right: 0 !important;
        margin-bottom: 40px;
      }
      
      .timeline .features-grid::before {
        left: 20px;
      }
      
      .timeline .feature-card::before {
        display: none;
      }
      
      .timeline .feature-card::after {
        left: -52px !important;
        right: auto !important;
      }
      
      .zigzag .feature-card {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .features-ultra-modern {
        padding: 60px 15px;
      }
      
      .features-header {
        margin-bottom: 40px;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .feature-card {
        padding: 30px 20px;
      }
      
      .carousel .feature-card {
        flex: 0 0 280px;
      }
      
      .image-position-beside-icon {
        flex-direction: column;
      }
      
      .image-position-beside-icon .feature-image {
        width: 100%;
        height: 200px;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .features-ultra-modern:not(.neon-glow) {
        background: #0f172a;
      }
      
      .feature-card {
        background: rgba(30, 41, 59, 0.5);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .feature-title {
        color: white;
      }
      
      .feature-description {
        color: #cbd5e1;
      }
      
      .filter-btn {
        background: rgba(30, 41, 59, 0.5);
        color: #cbd5e1;
      }
    }

    /* Gradient backgrounds */
    .gradient-purple-blue {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .gradient-orange-pink {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }

    .gradient-green-blue {
      background: linear-gradient(135deg, #13547a 0%, #80d0c7 100%);
    }

    .gradient-red-purple {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    /* Custom scrollbar for carousel */
    .carousel .features-grid::-webkit-scrollbar {
      height: 8px;
    }

    .carousel .features-grid::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    .carousel .features-grid::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
    }
  `;

  const js = `
    document.addEventListener('DOMContentLoaded', function() {
      // Set animation delays
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card, index) => {
        card.style.setProperty('--delay', index * ${config.animationDelay});
      });

      // Initialize filters
      if (${config.enableFilters}) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const featureCards = document.querySelectorAll('.feature-card');

        filterBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            featureCards.forEach(card => {
              if (category === 'all' || card.dataset.category === category) {
                card.style.display = '';
                card.style.opacity = '1';
              } else {
                card.style.opacity = '0';
                setTimeout(() => {
                  card.style.display = 'none';
                }, 300);
              }
            });
          });
        });
      }

      // Tabs functionality
      if ('${config.displayMode}' === 'tabs') {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach((btn, index) => {
          btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');
            
            btn.classList.add('active');
            if (tabContents[index]) {
              tabContents[index].style.display = 'block';
            }
          });
        });
        
        // Show first tab by default
        if (tabButtons[0]) tabButtons[0].click();
      }

      // Particles background
      if ('${config.variant}' === 'particles') {
        if (typeof particlesJS !== 'undefined') {
          particlesJS('particles-bg', {
            particles: {
              number: { value: 80 },
              color: { value: '#667eea' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#667eea',
                opacity: 0.2,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
              }
            },
            retina_detect: true
          });
        }
      }

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.feature-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
      });
    });
  `;

  return {
    html,
    css,
    js,
    dependencies: config.variant === 'particles' ? [
      { type: 'js', resource: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js', critical: false }
    ] : []
  };
}

// Helper render functions
function renderBackground(config: any): string {
  if (config.variant === 'particles') {
    return '<div id="particles-bg"></div>';
  }
  
  if (config.backgroundGradient) {
    return `<div class="absolute inset-0 gradient-${config.backgroundGradient} opacity-10"></div>`;
  }
  
  return '';
}

function renderHeader(config: any): string {
  return `
    <div class="features-header">
      <h2 class="features-title">${config.title}</h2>
      ${config.subtitle ? `<p class="features-subtitle">${config.subtitle}</p>` : ''}
    </div>
  `;
}

function renderFilters(config: any): string {
  const categories = Array.from(new Set(config.features.map((f: any) => f.category).filter(Boolean)));
  
  return `
    <div class="features-filters">
      <button class="filter-btn active" data-category="all">Tous</button>
      ${categories.map(cat => `
        <button class="filter-btn" data-category="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
      `).join('')}
    </div>
  `;
}

function renderFeatures(config: any): string {
  const displayMode = config.displayMode;
  
  if (displayMode === 'tabs') {
    return renderTabsLayout(config);
  }
  
  return `
    <div class="features-grid ${config.displayMode} columns-${config.columns} ${config.iconStyle ? `icon-${config.iconStyle}` : ''}">
      ${config.features.map((feature: any, index: number) => renderFeatureCard(feature, index, config)).join('')}
    </div>
  `;
}

function renderFeatureCard(feature: any, index: number, config: any): string {
  const showNumber = config.showNumbers;
  const hoverClass = config.enableHoverEffects ? `hover-${config.hoverEffect}` : '';
  const imagePositionClass = config.showImages && config.imagePosition === 'beside-icon' ? 'image-position-beside-icon' : '';
  
  return `
    <div class="feature-card ${hoverClass} ${feature.highlight ? 'highlighted' : ''} ${imagePositionClass}" 
         data-category="${feature.category || 'general'}">
      ${showNumber ? `<span class="feature-number">${index + 1}</span>` : ''}
      
      ${config.showImages && config.imagePosition === 'top' && feature.image ? 
        `<img src="${feature.image}" alt="${feature.imageAlt || feature.title}" class="feature-image image-position-top" />` : ''
      }
      
      ${imagePositionClass ? '<div class="feature-content-wrapper">' : ''}
      
      <div class="feature-icon-container">
        <div class="feature-icon">
          ${renderIcon(feature.icon)}
        </div>
      </div>
      
      <h3 class="feature-title">${feature.title}</h3>
      <p class="feature-description">${feature.description}</p>
      
      ${feature.link ? `
        <a href="${feature.link}" class="feature-link inline-block text-primary-600 hover:text-primary-700 font-medium mt-2">
          En savoir plus
        </a>
      ` : ''}
      
      ${imagePositionClass ? '</div>' : ''}
      
      ${config.showImages && config.imagePosition === 'beside-icon' && feature.image ? 
        `<img src="${feature.image}" alt="${feature.imageAlt || feature.title}" class="feature-image" />` : ''
      }
      
      ${config.showImages && config.imagePosition === 'bottom' && feature.image ? 
        `<img src="${feature.image}" alt="${feature.imageAlt || feature.title}" class="feature-image" />` : ''
      }
    </div>
  `;
}

function renderTabsLayout(config: any): string {
  return `
    <div class="features-grid tabs">
      <div class="tab-list">
        ${config.features.map((feature: any, index: number) => `
          <button class="tab-button ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="feature-icon-container" style="width: 40px; height: 40px;">
              ${renderIcon(feature.icon)}
            </div>
            <span>${feature.title}</span>
          </button>
        `).join('')}
      </div>
      <div class="tab-contents">
        ${config.features.map((feature: any, index: number) => `
          <div class="tab-content" style="${index === 0 ? '' : 'display: none;'}">
            <h3 class="text-2xl font-bold mb-4">${feature.title}</h3>
            <p class="text-gray-600 mb-6">${feature.description}</p>
            ${config.showImages && feature.image ? 
              `<img src="${feature.image}" alt="${feature.imageAlt || feature.title}" class="w-full rounded-lg mb-6" />` : ''
            }
            ${feature.link ? `
              <a href="${feature.link}" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                En savoir plus
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderIcon(icon: string): string {
  // SVG gradient definition for gradient icon style
  const gradientDef = `
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
  `;
  
  const iconMap: Record<string, string> = {
    sparkles: `<svg viewBox="0 0 24 24" fill="currentColor">${gradientDef}<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="currentColor">${gradientDef}<path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24" fill="currentColor">${gradientDef}<path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="currentColor">${gradientDef}<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="currentColor">${gradientDef}<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    support: `<svg viewBox="0 0 24 24" fill="currentColor">${gradientDef}<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>`
  };
  
  return iconMap[icon] || iconMap.sparkles;
}
import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Testimonials Ultra-Moderne - Système de témoignages révolutionnaire
 * Support vidéo, masonry, filtres dynamiques et 8 designs magnifiques
 */
export const testimonialsUltraModern: Block = {
  id: 'testimonials-ultra-modern',
  name: 'Testimonials Ultra-Moderne',
  description: 'Section témoignages avec vidéos, layout masonry, filtres et 8 designs époustouflants',
  category: BlockCategory.TESTIMONIALS,
  tags: ['testimonials', 'reviews', 'video', 'masonry', 'filters', 'modern'],
  thumbnail: '/blocks/testimonials-ultra-modern.jpg',
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
      defaultValue: 'masonry',
      required: true,
      validation: {
        options: [
          { label: 'Masonry dynamique', value: 'masonry' },
          { label: 'Grille moderne', value: 'grid' },
          { label: 'Carrousel 3D', value: 'carousel-3d' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Cards empilées', value: 'stacked' },
          { label: 'Slider horizontal', value: 'slider' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Layout',
        order: 2
      }
    },
    {
      name: 'enableVideoTestimonials',
      type: PropType.BOOLEAN,
      description: 'Activer les témoignages vidéo',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 3,
        helpText: 'Permet d\'ajouter des vidéos YouTube/Vimeo aux témoignages'
      }
    },
    {
      name: 'enableFilters',
      type: PropType.BOOLEAN,
      description: 'Activer les filtres par catégorie',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 4,
        helpText: 'Permet de filtrer les témoignages par service, note, etc.'
      }
    },
    {
      name: 'filterType',
      type: PropType.STRING,
      description: 'Type de filtres',
      defaultValue: 'buttons',
      required: false,
      validation: {
        options: [
          { label: 'Boutons', value: 'buttons' },
          { label: 'Dropdown', value: 'dropdown' },
          { label: 'Tags', value: 'tags' },
          { label: 'Recherche', value: 'search' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Fonctionnalités',
        order: 5,
        condition: {
          prop: 'enableFilters',
          value: true
        }
      }
    },
    {
      name: 'showStats',
      type: PropType.BOOLEAN,
      description: 'Afficher les statistiques',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 6,
        helpText: 'Affiche la note moyenne et le nombre d\'avis'
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal',
      defaultValue: 'Ce que disent nos clients',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 7
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Des milliers de clients satisfaits partagent leur expérience',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 8
      }
    },
    {
      name: 'testimonials',
      type: PropType.ARRAY,
      description: 'Liste des témoignages',
      defaultValue: [
        {
          name: 'Jean Dupont',
          role: 'PDG, TechCorp',
          content: 'Service exceptionnel ! L\'équipe a dépassé toutes nos attentes.',
          rating: 5,
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
          date: '2024-01-15',
          service: 'web-design',
          verified: true,
          videoUrl: '',
          videoThumbnail: '',
          highlight: true
        }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 9,
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
        max: 5
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 10,
        condition: {
          prop: 'layout',
          values: ['grid', 'masonry']
        }
      }
    },
    {
      name: 'cardStyle',
      type: PropType.STRING,
      description: 'Style des cartes',
      defaultValue: 'elevated',
      required: false,
      validation: {
        options: [
          { label: 'Élevé', value: 'elevated' },
          { label: 'Bordure', value: 'bordered' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Glassmorphism', value: 'glass' },
          { label: 'Néomorphisme', value: 'neumorphism' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 11
      }
    },
    {
      name: 'showSocialProof',
      type: PropType.BOOLEAN,
      description: 'Afficher les badges de confiance',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 12,
        helpText: 'Google Reviews, Trustpilot, etc.'
      }
    },
    {
      name: 'enableGoogleMyBusiness',
      type: PropType.BOOLEAN,
      description: 'Importer les avis Google My Business',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Import Google',
        order: 13,
        helpText: 'Synchroniser automatiquement vos avis Google'
      }
    },
    {
      name: 'googlePlaceId',
      type: PropType.STRING,
      description: 'Google Place ID',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Import Google',
        order: 14,
        placeholder: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        helpText: 'Trouvez votre Place ID sur developers.google.com/maps/documentation/places/web-service/place-id',
        condition: { prop: 'enableGoogleMyBusiness', value: true }
      }
    },
    {
      name: 'googleApiKey',
      type: PropType.STRING,
      description: 'Clé API Google (optionnel)',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Import Google',
        order: 15,
        placeholder: 'AIzaSy...',
        helpText: 'Si vide, utilise la clé par défaut du site',
        condition: { prop: 'enableGoogleMyBusiness', value: true }
      }
    },
    {
      name: 'googleReviewsCount',
      type: PropType.NUMBER,
      description: 'Nombre d\'avis à importer',
      defaultValue: 10,
      required: false,
      validation: {
        min: 1,
        max: 50
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Import Google',
        order: 16,
        helpText: 'Maximum 50 avis',
        condition: { prop: 'enableGoogleMyBusiness', value: true }
      }
    },
    {
      name: 'googleMinRating',
      type: PropType.NUMBER,
      description: 'Note minimale des avis',
      defaultValue: 4,
      required: false,
      validation: {
        min: 1,
        max: 5
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Import Google',
        order: 17,
        helpText: 'N\'importer que les avis avec cette note ou plus',
        condition: { prop: 'enableGoogleMyBusiness', value: true }
      }
    },
    {
      name: 'googleAutoSync',
      type: PropType.BOOLEAN,
      description: 'Synchronisation automatique',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Import Google',
        order: 18,
        helpText: 'Actualiser les avis toutes les 24h',
        condition: { prop: 'enableGoogleMyBusiness', value: true }
      }
    },
    {
      name: 'animationStyle',
      type: PropType.STRING,
      description: 'Style d\'animation',
      defaultValue: 'fade-up',
      required: false,
      validation: {
        options: [
          { label: 'Fade Up', value: 'fade-up' },
          { label: 'Zoom In', value: 'zoom-in' },
          { label: 'Slide In', value: 'slide-in' },
          { label: '3D Flip', value: 'flip-3d' },
          { label: 'Aucune', value: 'none' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Animations',
        order: 19
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
        order: 20
      }
    },
    {
      name: 'maxTestimonialsToShow',
      type: PropType.NUMBER,
      description: 'Nombre max de témoignages à afficher',
      defaultValue: 9,
      required: false,
      validation: {
        min: 3,
        max: 20
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Layout',
        order: 21
      }
    },
    {
      name: 'enableLoadMore',
      type: PropType.BOOLEAN,
      description: 'Activer le bouton "Voir plus"',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 22
      }
    }
  ],
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    layout: 'masonry',
    enableVideoTestimonials: true,
    enableFilters: true,
    filterType: 'buttons',
    showStats: true,
    title: 'Ce que disent nos clients',
    subtitle: 'Des milliers de clients satisfaits partagent leur expérience',
    testimonials: [
      {
        name: 'Sophie Martin',
        role: 'Directrice Marketing, StartupX',
        content: 'Une transformation complète de notre présence en ligne. Les résultats ont dépassé toutes nos attentes avec une augmentation de 200% du trafic.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        date: '2024-02-10',
        service: 'marketing-digital',
        verified: true,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoThumbnail: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=300&fit=crop',
        highlight: true
      },
      {
        name: 'Pierre Dubois',
        role: 'CEO, TechInno',
        content: 'Professionnalisme exemplaire et résultats concrets. Je recommande vivement !',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        date: '2024-01-28',
        service: 'web-development',
        verified: true,
        videoUrl: '',
        videoThumbnail: '',
        highlight: false
      },
      {
        name: 'Marie Lecomte',
        role: 'Responsable Communication',
        content: 'Un accompagnement sur mesure qui a vraiment fait la différence. L\'équipe est à l\'écoute et très réactive.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        date: '2024-02-05',
        service: 'branding',
        verified: true,
        videoUrl: '',
        videoThumbnail: '',
        highlight: false
      },
      {
        name: 'Alexandre Chen',
        role: 'Entrepreneur',
        content: 'Excellent travail ! Site moderne, rapide et parfaitement optimisé pour le SEO.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        date: '2024-01-20',
        service: 'seo',
        verified: true,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        highlight: false
      },
      {
        name: 'Julie Bernard',
        role: 'Gérante, BoutiqueMode',
        content: 'Notre boutique en ligne a triplé ses ventes grâce à leur expertise. Un investissement très rentable !',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
        date: '2024-02-12',
        service: 'e-commerce',
        verified: true,
        videoUrl: '',
        videoThumbnail: '',
        highlight: true
      },
      {
        name: 'Thomas Petit',
        role: 'Directeur Artistique',
        content: 'Créativité et professionnalisme au rendez-vous. Un plaisir de travailler avec cette équipe.',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
        date: '2024-01-15',
        service: 'design',
        verified: true,
        videoUrl: '',
        videoThumbnail: '',
        highlight: false
      }
    ],
    columns: 3,
    cardStyle: 'elevated',
    showSocialProof: true,
    animationStyle: 'fade-up',
    backgroundColor: 'transparent',
    maxTestimonialsToShow: 9,
    enableLoadMore: true
  }
};

// Fonction de rendu principale
export function renderTestimonialsUltraModern(props: any, variants: string[] = []): RenderedBlock {
  const config = { ...testimonialsUltraModern.defaultProps, ...props };
  
  // Calculate stats
  const totalReviews = config.testimonials.length;
  const averageRating = config.testimonials.reduce((acc: number, t: any) => acc + (t.rating || 5), 0) / totalReviews;
  
  // Get categories for filters
  const categories = Array.from(new Set(config.testimonials.map((t: any) => t.service).filter(Boolean)));
  
  // Base HTML structure
  const html = `
    <section class="testimonials-ultra-modern ${config.variant} ${config.layout}" ${config.backgroundColor ? `style="background-color: ${config.backgroundColor};"` : ''}>
      ${renderBackground(config)}
      <div class="testimonials-container">
        ${renderHeader(config, averageRating, totalReviews)}
        ${config.showSocialProof ? renderSocialProof() : ''}
        ${config.enableFilters ? renderFilters(config, categories) : ''}
        ${renderTestimonials(config)}
        ${config.enableLoadMore ? renderLoadMore() : ''}
      </div>
    </section>
  `;

  // CSS avec toutes les variantes et layouts
  const css = `
    .testimonials-ultra-modern {
      position: relative;
      padding: 80px 20px;
      overflow: hidden;
    }

    .testimonials-container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    /* Header Styles */
    .testimonials-header {
      text-align: center;
      margin-bottom: 60px;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .testimonials-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .testimonials-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: #64748b;
      max-width: 600px;
      margin: 0 auto 30px;
      line-height: 1.8;
    }

    /* Stats Display */
    .testimonials-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;
      margin-bottom: 30px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1e293b;
      display: block;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .rating-stars {
      display: flex;
      gap: 4px;
      justify-content: center;
      margin-top: 8px;
    }

    .star {
      width: 24px;
      height: 24px;
      fill: #fbbf24;
    }

    .star.empty {
      fill: #e5e7eb;
    }

    /* Social Proof */
    .social-proof {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .social-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .social-badge img {
      height: 30px;
    }

    .social-badge-text {
      font-size: 0.875rem;
      color: #475569;
    }

    /* Filter Styles */
    .testimonials-filters {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 25px;
      border: 2px solid transparent;
      background: rgba(255, 255, 255, 0.8);
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

    /* Layout: Masonry */
    .masonry .testimonials-grid {
      column-count: 3;
      column-gap: 30px;
    }

    .masonry .testimonial-card {
      break-inside: avoid;
      margin-bottom: 30px;
      transform-origin: center top;
    }

    /* Layout: Grid */
    .grid .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }

    /* Layout: Carousel 3D */
    .carousel-3d .testimonials-grid {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 600px;
      position: relative;
      transform-style: preserve-3d;
      perspective: 1200px;
    }

    .carousel-3d .testimonial-card {
      position: absolute;
      width: 400px;
      transform-origin: center;
      transition: all 0.6s ease;
      opacity: 0.7;
    }

    .carousel-3d .testimonial-card.active {
      opacity: 1;
      transform: translateZ(100px) scale(1.1);
    }

    /* Layout: Timeline */
    .timeline .testimonials-grid {
      position: relative;
      padding: 40px 0;
      max-width: 800px;
      margin: 0 auto;
    }

    .timeline .testimonials-grid::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, transparent, #667eea, #764ba2, transparent);
      transform: translateX(-50%);
    }

    .timeline .testimonial-card {
      width: calc(50% - 40px);
      margin-bottom: 60px;
      position: relative;
    }

    .timeline .testimonial-card:nth-child(odd) {
      margin-left: 0;
    }

    .timeline .testimonial-card:nth-child(even) {
      margin-left: auto;
    }

    /* Layout: Stacked */
    .stacked .testimonials-grid {
      position: relative;
      height: 600px;
      max-width: 600px;
      margin: 0 auto;
    }

    .stacked .testimonial-card {
      position: absolute;
      width: 100%;
      transition: all 0.4s ease;
      cursor: pointer;
    }

    .stacked .testimonial-card:hover {
      transform: translateY(-20px) scale(1.02);
    }

    /* Layout: Slider */
    .slider .testimonials-grid {
      display: flex;
      gap: 30px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: 20px;
      scrollbar-width: thin;
    }

    .slider .testimonial-card {
      flex: 0 0 400px;
      scroll-snap-align: center;
    }

    /* Testimonial Card Base */
    .testimonial-card {
      position: relative;
      padding: 40px;
      border-radius: 20px;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
      background: white;
    }

    .testimonial-card:nth-child(n) {
      animation-delay: calc(var(--delay) * 100ms);
    }

    /* Video Testimonial */
    .video-testimonial {
      position: relative;
      margin-bottom: 20px;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
    }

    .video-thumbnail {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .video-play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .video-play-btn:hover {
      transform: translate(-50%, -50%) scale(1.1);
      background: white;
    }

    .video-play-icon {
      width: 0;
      height: 0;
      border-left: 20px solid #667eea;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      margin-left: 4px;
    }

    /* Content */
    .testimonial-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .testimonial-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .testimonial-info {
      flex: 1;
    }

    .testimonial-name {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .testimonial-role {
      font-size: 0.875rem;
      color: #64748b;
    }

    .testimonial-rating {
      display: flex;
      gap: 2px;
      margin-bottom: 15px;
    }

    .testimonial-rating .star {
      width: 16px;
      height: 16px;
    }

    .testimonial-content {
      font-size: 1rem;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 15px;
    }

    .testimonial-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid #e5e7eb;
    }

    .testimonial-date {
      font-size: 0.875rem;
      color: #94a3b8;
    }

    .verified-badge {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.875rem;
      color: #16a34a;
    }

    .verified-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    /* Card Styles */
    .card-elevated {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    }

    .card-elevated:hover {
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .card-bordered {
      border: 2px solid #e5e7eb;
      box-shadow: none;
    }

    .card-bordered:hover {
      border-color: #667eea;
    }

    .card-gradient {
      background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
    }

    .card-glass {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card-neumorphism {
      background: #e0e5ec;
      box-shadow: 
        9px 9px 16px #a3b1c6,
        -9px -9px 16px #ffffff;
    }

    /* Variant Styles */
    .glassmorphism .testimonial-card {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    }

    .gradient-wave {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .gradient-wave .testimonial-card {
      background: rgba(255, 255, 255, 0.95);
    }

    .floating-cards .testimonial-card {
      animation: float 6s ease-in-out infinite;
    }

    .floating-cards .testimonial-card:nth-child(2n) {
      animation-delay: 1s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    .neon-glow {
      background: #0a0a0a;
    }

    .neon-glow .testimonial-card {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid;
      border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
    }

    .neon-glow .testimonial-name,
    .neon-glow .testimonial-content {
      color: white;
    }

    .neon-glow .testimonial-role,
    .neon-glow .testimonial-date {
      color: rgba(255, 255, 255, 0.7);
    }

    /* Load More Button */
    .load-more-container {
      text-align: center;
      margin-top: 50px;
    }

    .load-more-btn {
      padding: 15px 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .load-more-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .masonry .testimonials-grid {
        column-count: 2;
      }

      .testimonials-stats {
        gap: 30px;
      }

      .carousel-3d .testimonial-card {
        width: 350px;
      }
    }

    @media (max-width: 768px) {
      .testimonials-ultra-modern {
        padding: 60px 15px;
      }

      .masonry .testimonials-grid {
        column-count: 1;
      }

      .grid .testimonials-grid {
        grid-template-columns: 1fr;
      }

      .timeline .testimonial-card {
        width: 100%;
        margin-left: 40px !important;
      }

      .timeline .testimonials-grid::before {
        left: 20px;
      }

      .slider .testimonial-card {
        flex: 0 0 320px;
      }

      .testimonial-card {
        padding: 30px 20px;
      }

      .testimonials-stats {
        flex-direction: column;
        gap: 20px;
      }

      .social-proof {
        gap: 15px;
      }

      .social-badge {
        padding: 10px 15px;
      }
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

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes flip3D {
      from {
        opacity: 0;
        transform: rotateY(90deg);
      }
      to {
        opacity: 1;
        transform: rotateY(0);
      }
    }

    /* Animation Classes */
    .anim-fade-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .anim-zoom-in {
      animation: zoomIn 0.8s ease-out forwards;
    }

    .anim-slide-in {
      animation: slideIn 0.8s ease-out forwards;
    }

    .anim-flip-3d {
      animation: flip3D 0.8s ease-out forwards;
    }

    /* Video Modal */
    .video-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .video-modal.active {
      display: flex;
    }

    .video-modal-content {
      position: relative;
      width: 90%;
      max-width: 900px;
    }

    .video-modal-close {
      position: absolute;
      top: -40px;
      right: 0;
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .video-modal-close:hover {
      transform: rotate(90deg);
    }

    .video-iframe {
      width: 100%;
      height: 506px;
      border-radius: 12px;
    }

    /* Google Reviews Styles */
    .google-loading {
      text-align: center;
      padding: 40px;
      color: #64748b;
    }
    
    .google-loading .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 20px;
      border: 3px solid #e5e7eb;
      border-top-color: #4285F4;
      border-radius: 50%;
      animation: rotate360 1s linear infinite;
    }
    
    .google-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-size: 0.875rem;
      font-weight: 500;
      color: #4285F4;
    }
    
    .google-badge img {
      width: 20px;
      height: 20px;
    }
    
    .testimonial-card.google-review {
      border: 2px solid #4285F4;
      position: relative;
    }
    
    .testimonial-card.google-review::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #4285F4 0%, transparent 100%);
      opacity: 0.03;
      pointer-events: none;
    }
    
    /* Filter update for Google reviews */
    .filter-btn[data-category="google-review"] {
      background: #4285F4;
      color: white;
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .testimonials-ultra-modern:not(.neon-glow) {
        background: #0f172a;
      }

      .testimonial-card {
        background: rgba(30, 41, 59, 0.8);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .testimonial-name {
        color: white;
      }

      .testimonial-content {
        color: #cbd5e1;
      }

      .stat-value {
        color: white;
      }

      .filter-btn {
        background: rgba(30, 41, 59, 0.8);
        color: #cbd5e1;
      }

      .social-badge {
        background: rgba(30, 41, 59, 0.8);
      }
      
      .google-badge {
        background: rgba(30, 41, 59, 0.9);
      }
      
      .testimonial-card.google-review {
        border-color: #4285F4;
      }
    }
  `;

  const js = `
    document.addEventListener('DOMContentLoaded', function() {
      const section = document.querySelector('.testimonials-ultra-modern');
      
      // Google My Business Import
      if (${config.enableGoogleMyBusiness} && '${config.googlePlaceId}') {
        loadGoogleReviews();
      }
      
      // Set animation delays
      const cards = section.querySelectorAll('.testimonial-card');
      cards.forEach((card, index) => {
        card.style.setProperty('--delay', index);
      });

      // Initialize filters
      if (${config.enableFilters}) {
        const filterBtns = section.querySelectorAll('.filter-btn');
        const testimonialCards = section.querySelectorAll('.testimonial-card');

        filterBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            testimonialCards.forEach(card => {
              if (category === 'all' || card.dataset.service === category) {
                card.style.display = '';
                card.style.opacity = '1';
              } else {
                card.style.opacity = '0';
                setTimeout(() => {
                  card.style.display = 'none';
                }, 300);
              }
            });

            // Re-layout masonry if needed
            if ('${config.layout}' === 'masonry') {
              setTimeout(() => {
                // Trigger reflow for masonry
                const grid = section.querySelector('.testimonials-grid');
                grid.style.columnCount = grid.style.columnCount;
              }, 350);
            }
          });
        });
      }

      // Video testimonials
      if (${config.enableVideoTestimonials}) {
        const videoThumbnails = section.querySelectorAll('.video-testimonial');
        const modal = section.querySelector('.video-modal');
        const modalClose = section.querySelector('.video-modal-close');
        const iframe = section.querySelector('.video-iframe');

        videoThumbnails.forEach(thumb => {
          thumb.addEventListener('click', function() {
            const videoUrl = this.dataset.video;
            const videoId = extractVideoId(videoUrl);
            
            if (videoId) {
              iframe.src = \`https://www.youtube.com/embed/\${videoId}?autoplay=1\`;
              modal.classList.add('active');
            }
          });
        });

        modalClose?.addEventListener('click', function() {
          modal.classList.remove('active');
          iframe.src = '';
        });

        modal?.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.classList.remove('active');
            iframe.src = '';
          }
        });

        function extractVideoId(url) {
          const regex = /(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/|youtube\\.com\\/embed\\/)([^&\\?]+)/;
          const match = url.match(regex);
          return match ? match[1] : null;
        }
      }

      // Carousel 3D functionality
      if ('${config.layout}' === 'carousel-3d') {
        const cards = section.querySelectorAll('.testimonial-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        
        function updateCarousel() {
          cards.forEach((card, index) => {
            const angle = ((index - currentIndex) * (360 / totalCards));
            const translateZ = 400;
            card.style.transform = \`rotateY(\${angle}deg) translateZ(\${translateZ}px)\`;
            
            if (index === currentIndex) {
              card.classList.add('active');
            } else {
              card.classList.remove('active');
            }
          });
        }
        
        updateCarousel();
        
        // Auto-rotate
        setInterval(() => {
          currentIndex = (currentIndex + 1) % totalCards;
          updateCarousel();
        }, 5000);
        
        // Click to rotate
        cards.forEach((card, index) => {
          card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
          });
        });
      }

      // Stacked layout
      if ('${config.layout}' === 'stacked') {
        const cards = section.querySelectorAll('.testimonial-card');
        
        cards.forEach((card, index) => {
          card.style.top = \`\${index * 20}px\`;
          card.style.left = \`\${index * 10}px\`;
          card.style.zIndex = cards.length - index;
          
          card.addEventListener('click', function() {
            // Bring clicked card to front
            cards.forEach((c, i) => {
              c.style.zIndex = cards.length - i;
            });
            this.style.zIndex = cards.length + 1;
          });
        });
      }

      // Load more functionality
      if (${config.enableLoadMore}) {
        const loadMoreBtn = section.querySelector('.load-more-btn');
        const hiddenCards = section.querySelectorAll('.testimonial-card.hidden');
        let shown = ${config.maxTestimonialsToShow};
        
        // Hide cards beyond max
        cards.forEach((card, index) => {
          if (index >= shown) {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        });
        
        loadMoreBtn?.addEventListener('click', function() {
          const toShow = Math.min(shown + 3, cards.length);
          
          for (let i = shown; i < toShow; i++) {
            cards[i].classList.remove('hidden');
            cards[i].style.display = '';
            cards[i].style.animationDelay = \`\${(i - shown) * 100}ms\`;
          }
          
          shown = toShow;
          
          if (shown >= cards.length) {
            this.style.display = 'none';
          }
        });
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

      cards.forEach(card => {
        if ('${config.animationStyle}' !== 'none') {
          card.classList.add('anim-${config.animationStyle}');
          card.style.animationPlayState = 'paused';
          observer.observe(card);
        }
      });
      
      // Google My Business Functions
      async function loadGoogleReviews() {
        const placeId = '${config.googlePlaceId}';
        const apiKey = '${config.googleApiKey}' || window.GOOGLE_API_KEY || '';
        const minRating = ${config.googleMinRating || 4};
        const maxReviews = ${config.googleReviewsCount || 10};
        
        if (!apiKey) {
          console.warn('Google API key not provided. Add googleApiKey or set window.GOOGLE_API_KEY');
          return;
        }
        
        try {
          // Show loading indicator
          const container = section.querySelector('.testimonials-grid');
          const loadingEl = document.createElement('div');
          loadingEl.className = 'google-loading';
          loadingEl.innerHTML = '<div class="spinner"></div><p>Chargement des avis Google...</p>';
          container.prepend(loadingEl);
          
          // Fetch place details
          const response = await fetch(
            \`https://maps.googleapis.com/maps/api/place/details/json?place_id=\${placeId}&fields=reviews,rating,user_ratings_total&key=\${apiKey}\`
          );
          
          // Note: Due to CORS, this needs to be proxied through your backend
          // This is a simplified example - implement proper backend endpoint
          const proxyResponse = await fetch('/api/google-reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ placeId, apiKey })
          });
          
          const data = await proxyResponse.json();
          
          if (data.result && data.result.reviews) {
            const googleReviews = data.result.reviews
              .filter(review => review.rating >= minRating)
              .slice(0, maxReviews)
              .map(review => ({
                name: review.author_name,
                role: 'Client Google',
                content: review.text,
                rating: review.rating,
                image: review.profile_photo_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.author_name),
                date: new Date(review.time * 1000).toISOString().split('T')[0],
                service: 'google-review',
                verified: true,
                isGoogleReview: true
              }));
            
            // Remove loading indicator
            loadingEl.remove();
            
            // Add Google reviews to the grid
            googleReviews.forEach((review, index) => {
              const cardHtml = renderGoogleReviewCard(review, index);
              container.insertAdjacentHTML('afterbegin', cardHtml);
            });
            
            // Update stats if enabled
            if (${config.showStats}) {
              updateStatsWithGoogleReviews(data.result);
            }
            
            // Re-initialize animations for new cards
            initializeNewCards();
          }
        } catch (error) {
          console.error('Failed to load Google reviews:', error);
          // Remove loading indicator on error
          const loadingEl = section.querySelector('.google-loading');
          if (loadingEl) loadingEl.remove();
        }
      }
      
      function renderGoogleReviewCard(review, index) {
        return \`
          <div class="testimonial-card card-${config.cardStyle || 'elevated'} google-review" 
               data-service="google-review"
               style="--delay: \${index}">
            
            <div class="google-badge">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'/%3E%3C/svg%3E" alt="Google">
              <span>Avis Google</span>
            </div>
            
            <div class="testimonial-header">
              <img src="\${review.image}" alt="\${review.name}" class="testimonial-avatar">
              <div class="testimonial-info">
                <h3 class="testimonial-name">\${review.name}</h3>
                <p class="testimonial-role">\${review.role}</p>
              </div>
            </div>
            
            <div class="testimonial-rating">
              \${renderStars(review.rating)}
            </div>
            
            <p class="testimonial-content">"\${review.content}"</p>
            
            <div class="testimonial-footer">
              <span class="testimonial-date">\${formatDate(review.date)}</span>
              <span class="verified-badge">
                <svg class="verified-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Vérifié par Google
              </span>
            </div>
          </div>
        \`;
      }
      
      function updateStatsWithGoogleReviews(googleData) {
        const statsEl = section.querySelector('.testimonials-stats');
        if (!statsEl || !googleData.rating) return;
        
        // Update average rating
        const ratingValueEl = statsEl.querySelector('.stat-value');
        if (ratingValueEl) {
          const currentRating = parseFloat(ratingValueEl.textContent);
          const googleRating = googleData.rating;
          const totalReviews = parseInt(statsEl.querySelectorAll('.stat-value')[1].textContent);
          const googleReviewsCount = googleData.user_ratings_total || 0;
          
          // Calculate combined average
          const combinedAverage = ((currentRating * totalReviews) + (googleRating * googleReviewsCount)) / (totalReviews + googleReviewsCount);
          ratingValueEl.textContent = combinedAverage.toFixed(1);
          
          // Update total reviews count
          const totalReviewsEl = statsEl.querySelectorAll('.stat-value')[1];
          if (totalReviewsEl) {
            totalReviewsEl.textContent = totalReviews + googleReviewsCount;
          }
          
          // Update stars display
          const starsContainer = ratingValueEl.parentElement.querySelector('.rating-stars');
          if (starsContainer) {
            starsContainer.innerHTML = renderStarsHTML(combinedAverage);
          }
        }
      }
      
      function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          stars += \`
            <svg class="star \${i > rating ? 'empty' : ''}" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          \`;
        }
        return \`<div class="testimonial-rating">\${stars}</div>\`;
      }
      
      function renderStarsHTML(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          stars += \`
            <svg class="star \${i > rating ? 'empty' : ''}" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          \`;
        }
        return stars;
      }
      
      function formatDate(dateStr) {
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
      }
      
      function initializeNewCards() {
        // Re-apply animations to new cards
        const newCards = section.querySelectorAll('.testimonial-card.google-review');
        newCards.forEach((card, index) => {
          if ('${config.animationStyle}' !== 'none') {
            card.classList.add('anim-${config.animationStyle}');
            card.style.animationPlayState = 'running';
          }
        });
        
        // Re-initialize filters if enabled
        if (${config.enableFilters}) {
          const filterBtns = section.querySelectorAll('.filter-btn');
          filterBtns.forEach(btn => {
            // Re-count items per category
            const category = btn.dataset.category;
            if (category === 'google-review' || category === 'all') {
              // Update count display if needed
            }
          });
        }
      }
      
      // Auto-sync Google reviews
      if (${config.enableGoogleMyBusiness} && ${config.googleAutoSync}) {
        // Sync every 24 hours
        setInterval(() => {
          loadGoogleReviews();
        }, 24 * 60 * 60 * 1000);
      }
    });
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}

// Helper render functions
function renderBackground(config: any): string {
  if (config.variant === 'particles') {
    return '<div id="particles-bg"></div>';
  }
  
  if (config.variant === 'gradient-wave') {
    return `
      <div class="absolute inset-0 opacity-10">
        <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320">
          <path fill="currentColor" fill-opacity="0.3" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    `;
  }
  
  return '';
}

function renderHeader(config: any, averageRating: number, totalReviews: number): string {
  return `
    <div class="testimonials-header">
      <h2 class="testimonials-title">${config.title}</h2>
      ${config.subtitle ? `<p class="testimonials-subtitle">${config.subtitle}</p>` : ''}
      
      ${config.showStats ? `
        <div class="testimonials-stats">
          <div class="stat-item">
            <span class="stat-value">${averageRating.toFixed(1)}</span>
            <span class="stat-label">Note moyenne</span>
            ${renderStars(averageRating)}
          </div>
          <div class="stat-item">
            <span class="stat-value">${totalReviews}</span>
            <span class="stat-label">Avis clients</span>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderSocialProof(): string {
  return `
    <div class="social-proof">
      <div class="social-badge">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M23.49 12.27c-.62 0-1.24.03-1.84.09-5.15.47-9.37 3.69-11.02 8.19-.45 1.21-.68 2.51-.68 3.82 0 .81.09 1.62.27 2.4l-2.61 7.87 8.07-2.58c1.44.65 3.01 1.01 4.63 1.01h.04c5.93 0 10.76-4.83 10.76-10.76 0-2.88-1.12-5.58-3.15-7.61-2.04-2.03-4.74-3.15-7.61-3.15l-.86-.28z'/%3E%3C/svg%3E" alt="Google">
        <span class="social-badge-text">4.9/5 sur Google</span>
      </div>
      <div class="social-badge">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%2300B67A' d='M24 0l5.7 17.5h18.4l-14.9 10.8 5.7 17.5L24 35l-14.9 10.8 5.7-17.5L0 17.5h18.4z'/%3E%3C/svg%3E" alt="Trustpilot">
        <span class="social-badge-text">Excellent sur Trustpilot</span>
      </div>
      <div class="social-badge">
        <span class="social-badge-text">✓ Avis vérifiés</span>
      </div>
    </div>
  `;
}

function renderFilters(config: any, categories: string[]): string {
  if (config.filterType === 'buttons') {
    return `
      <div class="testimonials-filters">
        <button class="filter-btn active" data-category="all">Tous</button>
        ${categories.map(cat => `
          <button class="filter-btn" data-category="${cat}">${formatCategory(cat)}</button>
        `).join('')}
      </div>
    `;
  }
  
  // Add other filter types (dropdown, tags, search) here if needed
  return '';
}

function renderTestimonials(config: any): string {
  return `
    <div class="testimonials-grid">
      ${config.testimonials.map((testimonial: any, index: number) => renderTestimonialCard(testimonial, index, config)).join('')}
    </div>
    ${config.enableVideoTestimonials ? renderVideoModal() : ''}
  `;
}

function renderTestimonialCard(testimonial: any, index: number, config: any): string {
  const cardClass = config.cardStyle ? `card-${config.cardStyle}` : '';
  
  return `
    <div class="testimonial-card ${cardClass} ${testimonial.highlight ? 'highlighted' : ''}" 
         data-service="${testimonial.service || ''}"
         style="--delay: ${index}">
      
      ${config.enableVideoTestimonials && testimonial.videoUrl ? `
        <div class="video-testimonial" data-video="${testimonial.videoUrl}">
          <img src="${testimonial.videoThumbnail || testimonial.image}" alt="${testimonial.name}" class="video-thumbnail">
          <div class="video-play-btn">
            <div class="video-play-icon"></div>
          </div>
        </div>
      ` : ''}
      
      <div class="testimonial-header">
        <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
        <div class="testimonial-info">
          <h3 class="testimonial-name">${testimonial.name}</h3>
          <p class="testimonial-role">${testimonial.role}</p>
        </div>
      </div>
      
      <div class="testimonial-rating">
        ${renderStars(testimonial.rating)}
      </div>
      
      <p class="testimonial-content">"${testimonial.content}"</p>
      
      <div class="testimonial-footer">
        <span class="testimonial-date">${formatDate(testimonial.date)}</span>
        ${testimonial.verified ? `
          <span class="verified-badge">
            <svg class="verified-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Vérifié
          </span>
        ` : ''}
      </div>
    </div>
  `;
}

function renderVideoModal(): string {
  return `
    <div class="video-modal">
      <div class="video-modal-content">
        <button class="video-modal-close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
        <iframe class="video-iframe" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  `;
}

function renderLoadMore(): string {
  return `
    <div class="load-more-container">
      <button class="load-more-btn">Voir plus de témoignages</button>
    </div>
  `;
}

function renderStars(rating: number): string {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(`
      <svg class="star ${i > rating ? 'empty' : ''}" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    `);
  }
  return `<div class="rating-stars">${stars.join('')}</div>`;
}

function formatCategory(cat: string): string {
  const categoryMap: Record<string, string> = {
    'web-design': 'Design Web',
    'web-development': 'Développement',
    'marketing-digital': 'Marketing',
    'branding': 'Branding',
    'seo': 'SEO',
    'e-commerce': 'E-commerce',
    'design': 'Design'
  };
  return categoryMap[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}
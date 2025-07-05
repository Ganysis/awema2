import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Reviews Ultra-Modern - Système d'avis révolutionnaire
 * 8 variantes visuelles avec intégration Google Reviews
 */
export const reviewsUltraModern: Block = {
  id: 'reviews-ultra-modern',
  name: 'Reviews Ultra-Moderne',
  description: 'Avis clients avec intégration Google, design moderne et animations avancées',
  category: BlockCategory.TESTIMONIALS,
  tags: ['reviews', 'testimonials', 'google', 'rating', 'social-proof', 'animated'],
  thumbnail: '/blocks/reviews-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  render: renderReviewsUltraModern,
  
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
          { label: 'Grille moderne', value: 'grid' },
          { label: 'Carousel 3D', value: 'carousel-3d' },
          { label: 'Masonry dynamique', value: 'masonry' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Wall of fame', value: 'wall' },
          { label: 'Flip cards', value: 'flip' }
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
      description: 'Titre de la section',
      defaultValue: 'Ce que disent nos clients',
      required: false,
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
      defaultValue: 'Plus de 500 clients satisfaits nous font confiance',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 4
      }
    },
    {
      name: 'googlePlaceId',
      type: PropType.STRING,
      description: 'Google Place ID pour importer les avis',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Intégration Google',
        order: 5,
        placeholder: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        helpText: 'Trouvez votre Place ID sur developers.google.com/maps/documentation/places/web-service/place-id'
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
        group: 'Intégration Google',
        order: 6,
        placeholder: 'AIzaSy...'
      }
    },
    {
      name: 'autoImport',
      type: PropType.BOOLEAN,
      description: 'Importer automatiquement les avis Google',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Intégration Google',
        order: 7
      }
    },
    {
      name: 'minRating',
      type: PropType.NUMBER,
      description: 'Note minimale à afficher',
      defaultValue: 4,
      required: false,
      validation: {
        min: 1,
        max: 5
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Filtres',
        order: 8
      }
    },
    {
      name: 'maxReviews',
      type: PropType.NUMBER,
      description: 'Nombre maximum d\'avis',
      defaultValue: 12,
      required: false,
      validation: {
        min: 3,
        max: 50
      },
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Filtres',
        order: 9
      }
    },
    {
      name: 'showRating',
      type: PropType.BOOLEAN,
      description: 'Afficher la note globale',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 10
      }
    },
    {
      name: 'showFilters',
      type: PropType.BOOLEAN,
      description: 'Afficher les filtres',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 11
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
        group: 'Options',
        order: 12
      }
    },
    {
      name: 'animateOnScroll',
      type: PropType.BOOLEAN,
      description: 'Animations au scroll',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 13
      }
    },
    {
      name: 'reviews',
      type: PropType.ARRAY,
      description: 'Liste des avis',
      defaultValue: [
        {
          id: '1',
          author: 'Marie Dupont',
          rating: 5,
          date: '2024-01-15',
          content: 'Service exceptionnel ! L\'équipe est très professionnelle et à l\'écoute. Le travail a été réalisé dans les temps avec une qualité irréprochable.',
          avatar: '/avatars/marie.jpg',
          images: ['/plomberie-1.jpg', '/plomberie-2.jpg'],
          service: 'Plomberie',
          verified: true,
          helpful: 12,
          source: 'google'
        },
        {
          id: '2',
          author: 'Jean Martin',
          rating: 5,
          date: '2024-01-10',
          content: 'Je recommande vivement ! Très satisfait de la prestation. Prix corrects et travail de qualité.',
          avatar: '/avatars/jean.jpg',
          images: ['/electricite-1.jpg'],
          service: 'Électricité',
          verified: true,
          helpful: 8,
          source: 'google'
        },
        {
          id: '3',
          author: 'Sophie Bernard',
          rating: 4,
          date: '2024-01-05',
          content: 'Bon travail dans l\'ensemble. Équipe sympathique et professionnelle. Je referai appel à leurs services.',
          avatar: '/avatars/sophie.jpg',
          images: [],
          service: 'Chauffage',
          verified: true,
          helpful: 5,
          source: 'site'
        }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Avis manuels',
        order: 14,
        itemLabel: (item: any) => item.author || 'Nouvel avis'
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    layout: 'grid',
    title: 'Ce que disent nos clients',
    showRating: true,
    showFilters: true,
    animateOnScroll: true
  }
};

export function renderReviewsUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    layout = 'grid',
    title = 'Ce que disent nos clients',
    subtitle = '',
    googlePlaceId = '',
    autoImport = false,
    minRating = 4,
    maxReviews = 12,
    showRating = true,
    showFilters = true,
    showStats = true,
    animateOnScroll = true,
    reviews = []
  } = props;

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum: number, r: any) => sum + (typeof r.rating === 'string' ? parseInt(r.rating, 10) : r.rating), 0) / totalReviews).toFixed(1)
    : '5.0';
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter((r: any) => {
      const rVal = typeof r.rating === 'string' ? parseInt(r.rating, 10) : r.rating;
      return rVal === rating;
    }).length,
    percentage: totalReviews > 0 
      ? (reviews.filter((r: any) => {
          const rVal = typeof r.rating === 'string' ? parseInt(r.rating, 10) : r.rating;
          return rVal === rating;
        }).length / totalReviews * 100).toFixed(0)
      : '0'
  }));

  const css = `
    .reviews-ultra-modern {
      position: relative;
      padding: 4rem 2rem;
      overflow: hidden;
    }
    
    .reviews-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .reviews-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .reviews-title {
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 1rem;
      color: #1a1a1a;
    }
    
    .variant-glassmorphism .reviews-title,
    .variant-gradient-wave .reviews-title,
    .variant-neon-glow .reviews-title,
    .variant-particles .reviews-title,
    .variant-3d-perspective .reviews-title {
      color: white;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .variant-minimal-luxe .reviews-title,
    .variant-split-screen .reviews-title,
    .variant-floating-cards .reviews-title {
      background: linear-gradient(135deg, var(--color-primary, #3b82f6) 0%, var(--color-secondary, #8b5cf6) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .reviews-subtitle {
      font-size: 1.25rem;
      opacity: 0.8;
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* Stats Section */
    .reviews-stats {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 3rem;
      margin-bottom: 3rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .rating-summary {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .average-rating {
      font-size: 4rem;
      font-weight: 800;
      color: var(--color-primary, #3b82f6);
      margin-bottom: 0.5rem;
    }
    
    .rating-stars {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }
    
    .star {
      width: 24px;
      height: 24px;
      fill: #fbbf24;
    }
    
    .star.empty {
      fill: rgba(255, 255, 255, 0.2);
    }
    
    .total-reviews {
      font-size: 1.125rem;
      opacity: 0.8;
    }
    
    .rating-distribution {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .rating-bar {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
    }
    
    .rating-number {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: 600;
    }
    
    .rating-progress {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    
    .rating-fill {
      height: 100%;
      background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
      border-radius: 4px;
      transition: width 0.8s ease;
    }
    
    .rating-count {
      font-size: 0.875rem;
      opacity: 0.7;
      min-width: 3rem;
      text-align: right;
    }
    
    /* Filters */
    .reviews-filters {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }
    
    .filter-button {
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 2rem;
      color: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .filter-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    .filter-button.active {
      background: var(--color-primary, #3b82f6);
      color: white;
      border-color: var(--color-primary, #3b82f6);
    }
    
    /* Reviews Grid */
    .reviews-grid {
      display: grid;
      gap: 2rem;
    }
    
    .layout-grid .reviews-grid {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
    
    .layout-masonry .reviews-grid {
      columns: 3 350px;
      column-gap: 2rem;
    }
    
    .layout-masonry .review-card {
      break-inside: avoid;
      margin-bottom: 2rem;
    }
    
    .review-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      padding: 2rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .review-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .review-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .review-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    
    .review-avatar.placeholder {
      background: linear-gradient(135deg, var(--color-primary, #3b82f6) 0%, var(--color-secondary, #8b5cf6) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
      color: white;
    }
    
    .review-info {
      flex: 1;
    }
    
    .review-author {
      font-weight: 700;
      font-size: 1.125rem;
      margin-bottom: 0.25rem;
    }
    
    .review-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      opacity: 0.7;
    }
    
    .review-rating {
      display: flex;
      gap: 0.125rem;
    }
    
    .review-star {
      width: 16px;
      height: 16px;
      fill: #fbbf24;
    }
    
    .review-star.empty {
      fill: rgba(255, 255, 255, 0.2);
    }
    
    .review-date {
      font-size: 0.875rem;
      opacity: 0.6;
    }
    
    .review-content {
      margin: 1rem 0;
      line-height: 1.7;
      opacity: 0.9;
    }
    
    .review-images {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 0.5rem;
      margin: 1rem 0;
    }
    
    .review-image {
      width: 100%;
      height: 100px;
      object-fit: cover;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .review-image:hover {
      transform: scale(1.05);
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .review-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .review-service {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      font-size: 0.875rem;
    }
    
    .review-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .review-helpful {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      opacity: 0.7;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }
    
    .review-helpful:hover {
      opacity: 1;
    }
    
    .review-source {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      opacity: 0.6;
    }
    
    .verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.125rem 0.5rem;
      background: #10b981;
      color: white;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    /* Carousel 3D Layout */
    .layout-carousel-3d .reviews-grid {
      display: flex;
      gap: 2rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 2rem 0;
    }
    
    .layout-carousel-3d .review-card {
      flex: 0 0 400px;
      scroll-snap-align: center;
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
    }
    
    .layout-carousel-3d .review-card:hover {
      transform: rotateY(5deg) translateZ(20px);
    }
    
    /* Timeline Layout */
    .layout-timeline .reviews-grid {
      position: relative;
      padding-left: 3rem;
    }
    
    .layout-timeline .reviews-grid::before {
      content: '';
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, transparent 0%, var(--color-primary, #3b82f6) 50%, transparent 100%);
    }
    
    .layout-timeline .review-card {
      position: relative;
      margin-bottom: 3rem;
    }
    
    .layout-timeline .review-card::before {
      content: '';
      position: absolute;
      left: -2.5rem;
      top: 2rem;
      width: 12px;
      height: 12px;
      background: var(--color-primary, #3b82f6);
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    }
    
    /* Animations */
    ${animateOnScroll ? `
      .review-card {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.6s ease forwards;
      }
      
      .review-card:nth-child(1) { animation-delay: 0.1s; }
      .review-card:nth-child(2) { animation-delay: 0.2s; }
      .review-card:nth-child(3) { animation-delay: 0.3s; }
      .review-card:nth-child(4) { animation-delay: 0.4s; }
      .review-card:nth-child(5) { animation-delay: 0.5s; }
      .review-card:nth-child(6) { animation-delay: 0.6s; }
      
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    ` : ''}
    
    /* Variant Styles */
    .variant-glassmorphism {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }
    
    .variant-glassmorphism::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .variant-glassmorphism .review-card {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .variant-glassmorphism .review-card:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
    }
    
    .variant-gradient-wave {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      position: relative;
    }
    
    .variant-gradient-wave::before {
      content: '';
      position: absolute;
      top: 0;
      left: -50%;
      width: 200%;
      height: 100%;
      background: url('data:image/svg+xml,...') repeat-x;
      animation: wave 20s linear infinite;
      opacity: 0.1;
    }
    
    .variant-floating-cards .review-card {
      animation: float 6s ease-in-out infinite;
    }
    
    .variant-floating-cards .review-card:nth-child(2n) {
      animation-delay: 3s;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    .variant-neon-glow .review-card {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    }
    
    .variant-neon-glow .review-card:hover {
      box-shadow: 0 0 50px rgba(59, 130, 246, 0.8);
    }
    
    .variant-minimal-luxe {
      background: #fafafa;
      color: #1a1a1a;
    }
    
    .variant-minimal-luxe .review-card {
      background: white;
      border: none;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    }
    
    .variant-split-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      padding: 0;
    }
    
    .variant-split-screen .reviews-container {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      padding: 4rem 2rem;
    }
    
    .variant-particles {
      position: relative;
    }
    
    .variant-particles::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,...') no-repeat center;
      opacity: 0.1;
      animation: drift 20s linear infinite;
    }
    
    @keyframes drift {
      from { transform: translateX(0); }
      to { transform: translateX(100px); }
    }
    
    .variant-3d-perspective {
      perspective: 1000px;
    }
    
    .variant-3d-perspective .reviews-grid {
      transform-style: preserve-3d;
      transform: rotateX(5deg);
    }
    
    .variant-3d-perspective .review-card {
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
    }
    
    .variant-3d-perspective .review-card:hover {
      transform: translateZ(50px) rotateY(5deg);
    }
    
    /* Lightbox */
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: zoom-out;
      backdrop-filter: blur(10px);
    }
    
    .lightbox.active {
      display: flex;
    }
    
    .lightbox-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 1rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      font-size: 1.5rem;
    }
    
    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
    
    /* Google Badge */
    .google-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      color: #1a1a1a;
      border-radius: 0.5rem;
      font-weight: 600;
      margin-top: 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .google-icon {
      width: 20px;
      height: 20px;
    }
    
    /* Load More Button */
    .load-more {
      text-align: center;
      margin-top: 3rem;
    }
    
    .load-more-button {
      padding: 1rem 2rem;
      background: var(--color-primary, #3b82f6);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .load-more-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
    
    @media (max-width: 768px) {
      .reviews-stats {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .layout-grid .reviews-grid {
        grid-template-columns: 1fr;
      }
      
      .layout-masonry .reviews-grid {
        columns: 1;
      }
      
      .variant-split-screen .reviews-container {
        grid-template-columns: 1fr;
      }
    }
  `;

  const renderStars = (rating: number | string) => {
    const ratingNum = typeof rating === 'string' ? parseInt(rating, 10) : rating;
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < Math.floor(ratingNum);
      return `
        <svg class="review-star ${filled ? '' : 'empty'}" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      `;
    }).join('');
  };

  const renderReviewCard = (review: any) => {
    const initials = review.author.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    
    // Handle images - can be array or string with line breaks
    let imagesList = [];
    if (review.images) {
      if (Array.isArray(review.images)) {
        imagesList = review.images;
      } else if (typeof review.images === 'string' && review.images.trim()) {
        imagesList = review.images.split('\n').filter((img: string) => img.trim());
      }
    }
    
    return `
      <article class="review-card">
        <div class="review-header">
          ${review.avatar ? `
            <img src="${review.avatar}" alt="${review.author}" class="review-avatar" />
          ` : `
            <div class="review-avatar placeholder">${initials}</div>
          `}
          <div class="review-info">
            <h4 class="review-author">${review.author}</h4>
            <div class="review-meta">
              <div class="review-rating">
                ${renderStars(review.rating)}
              </div>
              <time class="review-date">${new Date(review.date).toLocaleDateString('fr-FR')}</time>
              ${review.verified ? '<span class="verified-badge">✓ Vérifié</span>' : ''}
            </div>
          </div>
        </div>
        
        <p class="review-content">${review.content}</p>
        
        ${imagesList.length > 0 ? `
          <div class="review-images">
            ${imagesList.map((img: string, index: number) => `
              <img src="${img.trim()}" alt="${review.author} - Photo ${index + 1}" class="review-image" onclick="openLightbox('${img.trim()}')" />
            `).join('')}
          </div>
        ` : ''}
        
        <div class="review-footer">
          <div class="review-service">
            <span>${review.service || 'Service général'}</span>
          </div>
          <div class="review-actions">
            ${review.helpful ? `
              <span class="review-helpful">
                👍 ${review.helpful} utile${review.helpful > 1 ? 's' : ''}
              </span>
            ` : ''}
            ${review.source ? `
              <span class="review-source">
                ${review.source === 'google' ? '🔷 Google' : '🌐 Site'}
              </span>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  };

  const html = `
    <section class="reviews-ultra-modern variant-${variant} layout-${layout}">
      <div class="reviews-container">
        ${title || subtitle ? `
          <div class="reviews-header">
            ${title ? `<h2 class="reviews-title">${title}</h2>` : ''}
            ${subtitle ? `<p class="reviews-subtitle">${subtitle}</p>` : ''}
          </div>
        ` : ''}
        
        ${showStats && reviews.length > 0 ? `
          <div class="reviews-stats">
            <div class="rating-summary">
              <div class="average-rating">${averageRating}</div>
              <div class="rating-stars">
                ${renderStars(parseFloat(averageRating))}
              </div>
              <div class="total-reviews">${totalReviews} avis clients</div>
              ${googlePlaceId ? `
                <div class="google-badge">
                  <svg class="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Avis Google vérifiés</span>
                </div>
              ` : ''}
            </div>
            
            <div class="rating-distribution">
              ${ratingDistribution.map((dist: any) => `
                <div class="rating-bar">
                  <div class="rating-number">
                    <span>${dist.rating}</span>
                    <svg class="star" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div class="rating-progress">
                    <div class="rating-fill" style="width: ${dist.percentage}%"></div>
                  </div>
                  <div class="rating-count">${dist.percentage}%</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        ${showFilters ? `
          <div class="reviews-filters">
            <button class="filter-button active" data-filter="all">Tous les avis</button>
            <button class="filter-button" data-filter="5">5 étoiles</button>
            <button class="filter-button" data-filter="4">4 étoiles</button>
            <button class="filter-button" data-filter="recent">Plus récents</button>
            <button class="filter-button" data-filter="helpful">Plus utiles</button>
          </div>
        ` : ''}
        
        <div class="reviews-grid" id="reviews-grid">
          ${reviews.slice(0, maxReviews).map((review: any) => renderReviewCard(review)).join('')}
        </div>
        
        ${reviews.length > maxReviews ? `
          <div class="load-more">
            <button class="load-more-button" onclick="loadMoreReviews()">
              Voir plus d'avis
            </button>
          </div>
        ` : ''}
        
        ${autoImport && googlePlaceId ? `
          <div class="google-import-notice" style="text-align: center; margin-top: 2rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 0.5rem;">
            <p style="opacity: 0.8;">Les avis Google seront automatiquement importés lors de la publication du site.</p>
          </div>
        ` : ''}
      </div>
      
      <!-- Lightbox -->
      <div class="lightbox" id="reviews-lightbox" onclick="closeLightbox()">
        <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
        <img class="lightbox-image" id="lightbox-image" src="" alt="" />
      </div>
    </section>
  `;

  const js = `
    // Lightbox functions
    function openLightbox(imageSrc) {
      const lightbox = document.getElementById('reviews-lightbox');
      const lightboxImage = document.getElementById('lightbox-image');
      lightboxImage.src = imageSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
      const lightbox = document.getElementById('reviews-lightbox');
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
    
    // Reviews filters
    const filterButtons = document.querySelectorAll('.filter-button');
    const reviewsGrid = document.getElementById('reviews-grid');
    let allReviews = ${JSON.stringify(reviews)};
    let currentFilter = 'all';
    let displayedReviews = ${maxReviews};
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        filterReviews();
      });
    });
    
    function filterReviews() {
      let filtered = [...allReviews];
      
      switch(currentFilter) {
        case '5':
          filtered = filtered.filter(r => {
            const rating = typeof r.rating === 'string' ? parseInt(r.rating, 10) : r.rating;
            return rating === 5;
          });
          break;
        case '4':
          filtered = filtered.filter(r => {
            const rating = typeof r.rating === 'string' ? parseInt(r.rating, 10) : r.rating;
            return rating === 4;
          });
          break;
        case 'recent':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'helpful':
          filtered.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
          break;
      }
      
      renderReviews(filtered.slice(0, displayedReviews));
    }
    
    function renderReviews(reviews) {
      // Animation de sortie
      const cards = reviewsGrid.querySelectorAll('.review-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
        }, i * 50);
      });
      
      // Rendu des nouvelles reviews
      setTimeout(() => {
        // Utilisation de la fonction renderReviewCard définie plus haut
        const renderReviewCardInline = (review) => {
          const initials = review.author.split(' ').map(n => n[0]).join('').toUpperCase();
          
          // Handle images - can be array or string with line breaks
          let imagesList = [];
          if (review.images) {
            if (Array.isArray(review.images)) {
              imagesList = review.images;
            } else if (typeof review.images === 'string' && review.images.trim()) {
              imagesList = review.images.split('\\n').filter(img => img.trim());
            }
          }
          
          const renderStarsInline = (rating) => {
            const ratingNum = typeof rating === 'string' ? parseInt(rating, 10) : rating;
            return Array.from({ length: 5 }, (_, i) => {
              const filled = i < Math.floor(ratingNum);
              return \`<svg class="review-star \${filled ? '' : 'empty'}" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>\`;
            }).join('');
          };
          
          return \`
            <article class="review-card">
              <div class="review-header">
                \${review.avatar ? \`
                  <img src="\${review.avatar}" alt="\${review.author}" class="review-avatar" />
                \` : \`
                  <div class="review-avatar placeholder">\${initials}</div>
                \`}
                <div class="review-info">
                  <h4 class="review-author">\${review.author}</h4>
                  <div class="review-meta">
                    <div class="review-rating">
                      \${renderStarsInline(review.rating)}
                    </div>
                    <time class="review-date">\${new Date(review.date).toLocaleDateString('fr-FR')}</time>
                    \${review.verified ? '<span class="verified-badge">✓ Vérifié</span>' : ''}
                  </div>
                </div>
              </div>
              
              <p class="review-content">\${review.content}</p>
              
              \${imagesList.length > 0 ? \`
                <div class="review-images">
                  \${imagesList.map((img, index) => \`
                    <img src="\${img.trim()}" alt="\${review.author} - Photo \${index + 1}" class="review-image" onclick="openLightbox('\${img.trim()}')" />
                  \`).join('')}
                </div>
              \` : ''}
              
              <div class="review-footer">
                <div class="review-service">
                  <span>\${review.service || 'Service général'}</span>
                </div>
                <div class="review-actions">
                  \${review.helpful ? \`
                    <span class="review-helpful">
                      👍 \${review.helpful} utile\${review.helpful > 1 ? 's' : ''}
                    </span>
                  \` : ''}
                  \${review.source ? \`
                    <span class="review-source">
                      \${review.source === 'google' ? '🔷 Google' : '🌐 Site'}
                    </span>
                  \` : ''}
                </div>
              </div>
            </article>
          \`;
        };
        
        reviewsGrid.innerHTML = reviews.map(renderReviewCardInline).join('');
        
        // Animation d'entrée
        const newCards = reviewsGrid.querySelectorAll('.review-card');
        newCards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
        });
      }, 500);
    }
    
    function loadMoreReviews() {
      displayedReviews += ${maxReviews};
      filterReviews();
      
      if (displayedReviews >= allReviews.length) {
        document.querySelector('.load-more').style.display = 'none';
      }
    }
    
    // Helpful button interaction
    document.addEventListener('click', function(e) {
      if (e.target.closest('.review-helpful')) {
        const helpful = e.target.closest('.review-helpful');
        const count = parseInt(helpful.textContent.match(/\\d+/)[0]);
        helpful.innerHTML = \`👍 \${count + 1} utile\${count + 1 > 1 ? 's' : ''}\`;
        helpful.style.color = 'var(--color-primary, #3b82f6)';
      }
    });
    
    ${animateOnScroll ? `
      // Intersection Observer pour les animations au scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      document.querySelectorAll('.review-card').forEach(card => {
        observer.observe(card);
      });
    ` : ''}
    
    ${layout === 'carousel-3d' ? `
      // Carousel 3D controls
      const carousel = document.querySelector('.layout-carousel-3d .reviews-grid');
      let isDown = false;
      let startX;
      let scrollLeft;
      
      carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });
      
      carousel.addEventListener('mouseleave', () => {
        isDown = false;
      });
      
      carousel.addEventListener('mouseup', () => {
        isDown = false;
      });
      
      carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
      });
    ` : ''}
    
    ${googlePlaceId && autoImport ? `
      // Google Reviews integration placeholder
      console.log('Google Place ID configured: ${googlePlaceId}');
      console.log('Auto-import enabled. Reviews will be fetched on production.');
    ` : ''}
  `;

  return { html, css, js, dependencies: [] };
}
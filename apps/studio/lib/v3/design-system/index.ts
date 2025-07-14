/**
 * V3 Design System - Système unifié pour tous les blocs
 * 
 * Principes:
 * - Performance: Animations GPU, lazy loading
 * - Accessibilité: WCAG AAA, navigation clavier
 * - Cohérence: Styles partagés entre tous les blocs
 * - Modernité: Glassmorphism, gradients subtils
 */

// ============================================
// TOKENS DE DESIGN
// ============================================

export const designTokens = {
  // Espacements (basés sur 8px grid)
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
  },

  // Rayons de bordure
  radius: {
    none: '0',
    sm: '0.375rem',   // 6px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    full: '9999px',
  },

  // Ombres (optimisées pour performance)
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(59, 130, 246, 0.5)',
    'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Transitions (courbes d'accélération naturelles)
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    // Courbes spécifiques
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Breakpoints responsive
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  zIndex: {
    base: 0,
    above: 10,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
  }
};

// ============================================
// STYLES DE BASE
// ============================================

export const baseStyles = {
  // Container responsive
  container: `
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${designTokens.spacing.md};
    
    @media (min-width: ${designTokens.breakpoints.md}) {
      padding: 0 ${designTokens.spacing.lg};
    }
  `,

  // Glassmorphism effect
  glass: `
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    @supports not (backdrop-filter: blur(12px)) {
      background: rgba(255, 255, 255, 0.95);
    }
  `,

  // Card moderne
  card: `
    background: white;
    border-radius: ${designTokens.radius.lg};
    box-shadow: ${designTokens.shadows.md};
    transition: all ${designTokens.transitions.base};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${designTokens.shadows.lg};
    }
  `,

  // Boutons accessibles
  button: {
    base: `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: ${designTokens.spacing.sm} ${designTokens.spacing.lg};
      font-weight: 600;
      border-radius: ${designTokens.radius.md};
      transition: all ${designTokens.transitions.fast};
      cursor: pointer;
      position: relative;
      overflow: hidden;
      
      /* Focus visible pour accessibilité */
      &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }
      
      /* Ripple effect au clic */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: scale(0);
        opacity: 0;
        transition: all ${designTokens.transitions.slow};
      }
      
      &:active::after {
        transform: scale(2);
        opacity: 1;
        transition: 0s;
      }
    `,
    primary: `
      background: var(--primary);
      color: white;
      
      &:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
      }
    `,
    secondary: `
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
      
      &:hover {
        background: var(--primary);
        color: white;
      }
    `
  },

  // Gradients modernes
  gradients: {
    primary: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  }
};

// ============================================
// MICRO-INTERACTIONS
// ============================================

export const microInteractions = {
  // Hover cards avec tilt 3D
  cardHover: `
    .card-hover {
      transform-style: preserve-3d;
      transition: transform ${designTokens.transitions.base};
      
      &:hover {
        transform: rotateY(5deg) rotateX(-5deg) translateZ(10px);
      }
    }
  `,

  // Boutons avec micro-bounce
  buttonBounce: `
    .btn-bounce {
      transition: all ${designTokens.transitions.fast};
      
      &:hover {
        animation: micro-bounce 0.5s ease-in-out;
      }
      
      @keyframes micro-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
    }
  `,

  // Entrée progressive des éléments
  fadeInUp: `
    .fade-in-up {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.6s ${designTokens.transitions.easeOut} forwards;
      
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  `,

  // Loader skeleton performant
  skeleton: `
    .skeleton {
      position: relative;
      overflow: hidden;
      background: #f0f0f0;
      
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transform: translateX(-100%);
        animation: skeleton-loading 1.5s infinite;
      }
      
      @keyframes skeleton-loading {
        to { transform: translateX(100%); }
      }
    }
  `,

  // Focus trap pour accessibilité
  focusTrap: `
    .focus-trap {
      &:focus-within {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
      }
    }
  `
};

// ============================================
// UTILITAIRES PERFORMANCE
// ============================================

export const performanceUtils = {
  // GPU acceleration
  gpuAccelerated: `
    transform: translateZ(0);
    will-change: transform;
  `,

  // Lazy loading images
  lazyImage: `
    .lazy-img {
      opacity: 0;
      transition: opacity ${designTokens.transitions.slow};
      
      &.loaded {
        opacity: 1;
      }
    }
  `,

  // Préférence reduced motion
  reducedMotion: `
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `,

  // Container queries pour performance
  containerQuery: `
    container-type: inline-size;
    
    @container (min-width: 768px) {
      .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `
};

// ============================================
// COMPOSANTS RÉUTILISABLES
// ============================================

export const components = {
  // Badge moderne
  badge: `
    .badge {
      display: inline-flex;
      align-items: center;
      padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: ${designTokens.radius.full};
      background: var(--primary-light);
      color: var(--primary);
      
      &.badge-success {
        background: #d1fae5;
        color: #065f46;
      }
    }
  `,

  // Tooltip accessible
  tooltip: `
    .tooltip {
      position: relative;
      
      &::after {
        content: attr(aria-label);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
        padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
        background: rgba(0, 0, 0, 0.9);
        color: white;
        font-size: 0.875rem;
        border-radius: ${designTokens.radius.sm};
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: all ${designTokens.transitions.fast};
      }
      
      &:hover::after,
      &:focus-visible::after {
        opacity: 1;
        transform: translateX(-50%) translateY(-8px);
      }
    }
  `,

  // Loading spinner optimisé
  spinner: `
    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    }
  `
};

// ============================================
// HELPERS CSS
// ============================================

export const generateCSS = () => `
  /* Variables CSS globales */
  :root {
    /* Couleurs avec variantes */
    --primary: #3B82F6;
    --primary-light: #93BBFC;
    --primary-dark: #1E40AF;
    
    --secondary: #8B5CF6;
    --secondary-light: #C4B5FD;
    --secondary-dark: #5B21B6;
    
    --accent: #10B981;
    --success: #10B981;
    --warning: #F59E0B;
    --error: #EF4444;
    
    /* Espacements */
    ${Object.entries(designTokens.spacing).map(([key, value]) => 
      `--spacing-${key}: ${value};`
    ).join('\n    ')}
    
    /* Ombres */
    ${Object.entries(designTokens.shadows).map(([key, value]) => 
      `--shadow-${key}: ${value};`
    ).join('\n    ')}
  }

  /* Dark mode automatique */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #111827;
      --text: #F9FAFB;
      --card-bg: #1F2937;
    }
  }

  /* Classes utilitaires */
  ${baseStyles.container}
  ${microInteractions.fadeInUp}
  ${microInteractions.skeleton}
  ${performanceUtils.lazyImage}
  ${performanceUtils.reducedMotion}
  ${components.badge}
  ${components.tooltip}
  ${components.spinner}
`;
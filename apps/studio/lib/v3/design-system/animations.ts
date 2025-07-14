/**
 * Système d'animations performantes V3
 * GPU-accelerated, accessibles et fluides
 */

// ============================================
// ANIMATIONS DE BASE
// ============================================

export const animations = {
  // Fade variations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 300,
    easing: 'ease-out'
  },
  
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  fadeInScale: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: 300,
    easing: 'ease-out'
  },

  // Slide variations
  slideInLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  slideInRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Micro-interactions
  pulse: {
    keyframes: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
    `,
    duration: '1s',
    iterationCount: 'infinite'
  },
  
  ripple: {
    keyframes: `
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
    `,
    duration: '600ms',
    easing: 'ease-out'
  },

  // Skeleton loading
  shimmer: {
    keyframes: `
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
    `,
    duration: '2s',
    iterationCount: 'infinite'
  }
};

// ============================================
// ORCHESTRATEUR D'ANIMATIONS
// ============================================

export class AnimationOrchestrator {
  private observers: Map<Element, IntersectionObserver> = new Map();
  private animatedElements: Set<Element> = new Set();

  /**
   * Observe un élément pour déclencher l'animation au scroll
   */
  observe(element: Element, animation: keyof typeof animations, options?: {
    threshold?: number;
    delay?: number;
    once?: boolean;
  }) {
    const { threshold = 0.1, delay = 0, once = true } = options || {};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(element)) {
          setTimeout(() => {
            this.animate(element, animation);
            if (once) {
              this.animatedElements.add(element);
              observer.unobserve(element);
            }
          }, delay);
        }
      });
    }, { threshold });

    observer.observe(element);
    this.observers.set(element, observer);
  }

  /**
   * Anime un élément
   */
  private animate(element: Element, animation: keyof typeof animations) {
    const anim = animations[animation];
    
    if ('from' in anim && 'to' in anim) {
      // Animation simple
      element.animate([anim.from, anim.to], {
        duration: anim.duration,
        easing: anim.easing || 'ease-out',
        fill: 'forwards'
      });
    } else if ('keyframes' in anim) {
      // Animation complexe
      element.classList.add(`anim-${animation}`);
    }
  }

  /**
   * Arrête l'observation
   */
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// ============================================
// GÉNÉRATEUR CSS OPTIMISÉ
// ============================================

export const generateAnimationCSS = () => `
  /* Animations de base */
  .anim-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .anim-fade-in-up {
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .anim-slide-in-left {
    animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .anim-slide-in-right {
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  /* Keyframes optimisés */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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
  
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  ${animations.pulse.keyframes}
  ${animations.ripple.keyframes}
  ${animations.shimmer.keyframes}

  /* Classes utilitaires */
  .anim-pulse {
    animation: pulse 1s ease-in-out infinite;
  }
  
  .anim-shimmer {
    background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }

  /* Stagger animations pour listes */
  .stagger-children > * {
    opacity: 0;
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .stagger-children > *:nth-child(1) { animation-delay: 0ms; }
  .stagger-children > *:nth-child(2) { animation-delay: 50ms; }
  .stagger-children > *:nth-child(3) { animation-delay: 100ms; }
  .stagger-children > *:nth-child(4) { animation-delay: 150ms; }
  .stagger-children > *:nth-child(5) { animation-delay: 200ms; }
  .stagger-children > *:nth-child(6) { animation-delay: 250ms; }
  .stagger-children > *:nth-child(7) { animation-delay: 300ms; }
  .stagger-children > *:nth-child(8) { animation-delay: 350ms; }

  /* Optimisations performance */
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }

  /* Respect des préférences utilisateur */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    .anim-pulse,
    .anim-shimmer {
      animation: none !important;
    }
  }

  /* Smooth scroll avec fallback */
  html {
    scroll-behavior: smooth;
  }
  
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;

// ============================================
// HOOKS REACT POUR ANIMATIONS
// ============================================

export const useAnimation = () => {
  const orchestrator = new AnimationOrchestrator();

  const animateOnScroll = (
    ref: React.RefObject<HTMLElement>,
    animation: keyof typeof animations,
    options?: Parameters<AnimationOrchestrator['observe']>[2]
  ) => {
    if (ref.current) {
      orchestrator.observe(ref.current, animation, options);
    }
  };

  const cleanup = () => {
    orchestrator.disconnect();
  };

  return { animateOnScroll, cleanup };
};

// ============================================
// ANIMATIONS SPÉCIFIQUES AUX BLOCS
// ============================================

export const blockAnimations = {
  // Hero: Entrée dramatique
  hero: {
    title: 'fade-in-up',
    subtitle: 'fade-in-up',
    buttons: 'fade-in-scale',
    image: 'slide-in-right',
    delay: {
      title: 0,
      subtitle: 100,
      buttons: 200,
      image: 300
    }
  },

  // Features: Apparition en grille
  features: {
    container: 'fade-in',
    card: 'fade-in-up',
    stagger: true,
    staggerDelay: 50
  },

  // Gallery: Effet masonry
  gallery: {
    container: 'fade-in',
    image: 'fade-in-scale',
    filter: 'slide-in-left',
    stagger: true,
    staggerDelay: 30
  },

  // Pricing: Mise en avant
  pricing: {
    card: 'fade-in-up',
    featured: 'pulse',
    stagger: true,
    staggerDelay: 100
  },

  // Contact: Glissement latéral
  contact: {
    form: 'slide-in-left',
    info: 'slide-in-right',
    map: 'fade-in-scale',
    delay: {
      form: 0,
      info: 100,
      map: 200
    }
  }
};
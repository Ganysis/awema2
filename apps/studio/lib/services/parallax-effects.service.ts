/**
 * Service pour gérer les effets parallax et animations avancées
 */
export class ParallaxEffectsService {
  private scrollY = 0;
  private mouseX = 0;
  private mouseY = 0;
  private ticking = false;
  private observers: Map<Element, IntersectionObserver> = new Map();

  /**
   * Initialise les effets parallax sur la page
   */
  init(): void {
    // Écouteurs d'événements
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));

    // Initialiser l'intersection observer pour les animations au scroll
    this.initScrollAnimations();

    // Initialiser les effets parallax
    this.initParallaxEffects();

    // Initialiser les effets de tilt
    this.initTiltEffects();
  }

  /**
   * Nettoie les écouteurs d'événements
   */
  destroy(): void {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));

    // Nettoyer les observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  /**
   * Gère le scroll de la page
   */
  private handleScroll(): void {
    this.scrollY = window.scrollY;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateParallaxElements();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  /**
   * Gère le mouvement de la souris
   */
  private handleMouseMove(e: MouseEvent): void {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    this.mouseX = (e.clientX - centerX) / centerX;
    this.mouseY = (e.clientY - centerY) / centerY;

    this.updateMouseParallaxElements();
  }

  /**
   * Gère le redimensionnement de la fenêtre
   */
  private handleResize(): void {
    this.updateParallaxElements();
  }

  /**
   * Initialise les animations au scroll
   */
  private initScrollAnimations(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Déclencher les animations en cascade pour les enfants
          const children = entry.target.querySelectorAll('[data-animation-delay]');
          children.forEach((child, index) => {
            const delay = child.getAttribute('data-animation-delay') || index * 100;
            setTimeout(() => {
              child.classList.add('animated');
            }, Number(delay));
          });
        }
      });
    }, options);

    // Observer tous les éléments avec des effets de scroll
    const scrollElements = document.querySelectorAll('[data-scroll-effect]');
    scrollElements.forEach(element => {
      observer.observe(element);
      this.observers.set(element, observer);
    });
  }

  /**
   * Initialise les effets parallax
   */
  private initParallaxEffects(): void {
    this.updateParallaxElements();
  }

  /**
   * Met à jour les éléments parallax
   */
  private updateParallaxElements(): void {
    // Hero parallax
    const heroElements = document.querySelectorAll('.hero--parallax');
    heroElements.forEach(hero => {
      const rect = hero.getBoundingClientRect();
      const speed = 0.5;
      const yPos = rect.top * speed;
      hero.style.setProperty('--parallax-offset', `${yPos}px`);
    });

    // Gallery parallax
    const galleryItems = document.querySelectorAll('.gallery--parallax .gallery__item');
    galleryItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const speed = item.getAttribute('data-parallax-speed') || 'medium';
      const speedValue = speed === 'slow' ? 0.3 : speed === 'fast' ? 0.7 : 0.5;
      const yPos = (rect.top - window.innerHeight / 2) * speedValue;
      item.style.setProperty('--scroll-offset', `${yPos}px`);
    });

    // Content parallax background
    const contentBgs = document.querySelectorAll('.content--parallax .content__background');
    contentBgs.forEach(bg => {
      const rect = bg.getBoundingClientRect();
      const yPos = rect.top * 0.3;
      bg.style.transform = `scale(1.2) translateY(${yPos}px)`;
    });
  }

  /**
   * Met à jour les éléments avec parallax souris
   */
  private updateMouseParallaxElements(): void {
    const mouseElements = document.querySelectorAll('[data-mouse-parallax]');
    mouseElements.forEach(element => {
      element.style.setProperty('--mouse-x', `${this.mouseX * 20}px`);
      element.style.setProperty('--mouse-y', `${this.mouseY * 20}px`);
    });
  }

  /**
   * Initialise les effets de tilt
   */
  private initTiltEffects(): void {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = ((y - centerY) / centerY) * 10;
        const tiltY = ((centerX - x) / centerX) * 10;
        
        element.style.setProperty('--tilt-x', `${tiltX}deg`);
        element.style.setProperty('--tilt-y', `${tiltY}deg`);
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  /**
   * Ajoute un effet de parallax à un élément spécifique
   */
  addParallaxEffect(element: HTMLElement, options: {
    speed?: number;
    offset?: number;
    direction?: 'vertical' | 'horizontal' | 'both';
  } = {}): void {
    const { speed = 0.5, offset = 0, direction = 'vertical' } = options;
    
    element.setAttribute('data-parallax', 'true');
    element.setAttribute('data-parallax-speed', String(speed));
    element.setAttribute('data-parallax-offset', String(offset));
    element.setAttribute('data-parallax-direction', direction);
    
    // Ajouter l'élément aux éléments à mettre à jour
    this.updateParallaxElements();
  }

  /**
   * Déclenche une animation spécifique
   */
  triggerAnimation(element: HTMLElement, animationName: string, duration = 1000): Promise<void> {
    return new Promise((resolve) => {
      element.style.animation = `${animationName} ${duration}ms ease-out forwards`;
      
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
    });
  }

  /**
   * Crée un effet de révélation de texte
   */
  revealText(element: HTMLElement, options: {
    duration?: number;
    delay?: number;
    stagger?: number;
  } = {}): void {
    const { duration = 800, delay = 0, stagger = 50 } = options;
    
    // Diviser le texte en mots
    const text = element.textContent || '';
    const words = text.split(' ');
    
    element.innerHTML = '';
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `all ${duration}ms ease-out`;
      span.style.transitionDelay = `${delay + (index * stagger)}ms`;
      
      element.appendChild(span);
      
      // Déclencher l'animation
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 50);
    });
  }
}

// Singleton
export const parallaxEffects = new ParallaxEffectsService();
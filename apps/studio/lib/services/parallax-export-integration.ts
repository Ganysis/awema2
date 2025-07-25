/**
 * Service pour intégrer les effets parallax dans l'export statique
 */
export class ParallaxExportIntegration {
  
  /**
   * Génère le CSS des effets parallax pour l'export
   */
  static generateParallaxCSS(): string {
    return `
/* ========================================
   PARALLAX EFFECTS - Intégration export
   ======================================== */

/* Hero Parallax */
.hero--parallax {
  position: relative;
  overflow: hidden;
}

.hero--parallax .hero__background {
  position: absolute;
  inset: -20%;
  width: 140%;
  height: 140%;
  object-fit: cover;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000);
}

/* Animations d'entrée */
@keyframes heroContentFadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero--parallax .hero__content > * {
  animation: heroContentFadeIn 1.2s ease-out forwards;
  opacity: 0;
}

.hero--parallax .hero__title { animation-delay: 0.2s; }
.hero--parallax .hero__subtitle { animation-delay: 0.4s; }
.hero--parallax .hero__buttons { animation-delay: 0.6s; }

/* Features animations */
@keyframes featureFadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.features--parallax .feature__item {
  opacity: 0;
  animation: featureFadeInUp 0.8s ease-out forwards;
}

.features--parallax .feature__item:nth-child(1) { animation-delay: 0.1s; }
.features--parallax .feature__item:nth-child(2) { animation-delay: 0.2s; }
.features--parallax .feature__item:nth-child(3) { animation-delay: 0.3s; }
.features--parallax .feature__item:nth-child(4) { animation-delay: 0.4s; }
.features--parallax .feature__item:nth-child(5) { animation-delay: 0.5s; }
.features--parallax .feature__item:nth-child(6) { animation-delay: 0.6s; }

/* Icônes flottantes */
@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.features--parallax .feature__icon {
  animation: floatIcon 3s ease-in-out infinite;
}

/* Gallery reveal */
@keyframes galleryItemReveal {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.gallery--parallax .gallery__item {
  opacity: 0;
  animation: galleryItemReveal 0.6s ease-out forwards;
}

/* Testimonials 3D */
.testimonials--parallax .testimonial__card {
  transform-style: preserve-3d;
  transition: transform 0.6s ease-out;
}

.testimonials--parallax .testimonial__card:hover {
  transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
}

/* Pricing hover */
.pricing--parallax .pricing__card {
  transition: all 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000);
}

.pricing--parallax .pricing__card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Services reveal */
@keyframes serviceReveal {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.services--parallax .service__card {
  opacity: 0;
  animation: serviceReveal 0.8s ease-out forwards;
}

/* Scroll effects */
[data-scroll-effect="fade-up"] {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

[data-scroll-effect="fade-up"].in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
    `.trim();
  }

  /**
   * Génère le JavaScript des effets parallax pour l'export
   */
  static generateParallaxJS(): string {
    return `
// Parallax Effects JavaScript
(function() {
  'use strict';

  // Variables globales
  let scrollY = 0;
  let ticking = false;

  // Initialisation
  function init() {
    // Écouter le scroll
    window.addEventListener('scroll', handleScroll);
    
    // Initialiser les animations au scroll
    initScrollAnimations();
    
    // Initialiser le parallax basique
    initBasicParallax();
  }

  // Gestion du scroll
  function handleScroll() {
    scrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Mise à jour du parallax
  function updateParallax() {
    // Hero parallax
    const heroElements = document.querySelectorAll('.hero--parallax .hero__background');
    heroElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = 'translateY(' + yPos + 'px)';
    });

    // Gallery items parallax
    const galleryItems = document.querySelectorAll('.gallery--parallax .gallery__item');
    galleryItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const speed = 0.3 + (index % 3) * 0.1;
      const yPos = -((rect.top - window.innerHeight) * speed * 0.1);
      item.style.transform = 'translateY(' + yPos + 'px)';
    });

    ticking = false;
  }

  // Animations au scroll
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Animation des enfants
          const children = entry.target.querySelectorAll('[data-animation-delay]');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animated');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observer les éléments avec effets
    document.querySelectorAll('[data-scroll-effect]').forEach(element => {
      observer.observe(element);
    });
  }

  // Parallax basique au chargement
  function initBasicParallax() {
    // Ajouter les classes d'animation aux éléments
    const animatedElements = document.querySelectorAll(
      '.hero--parallax, .features--parallax, .gallery--parallax, ' +
      '.testimonials--parallax, .pricing--parallax, .services--parallax'
    );
    
    animatedElements.forEach(element => {
      element.classList.add('parallax-ready');
    });

    // Déclencher le premier update
    updateParallax();
  }

  // Effet de tilt pour les cartes
  function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = ((y - centerY) / centerY) * 5;
        const tiltY = ((centerX - x) / centerX) * 5;
        
        this.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  // Lancer l'initialisation au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Initialiser les effets de tilt
  initTiltEffect();
})();
    `.trim();
  }

  /**
   * Ajoute les attributs parallax aux blocs
   */
  static addParallaxAttributes(blockType: string, blockHtml: string): string {
    // Mapper les types de blocs aux classes parallax
    const parallaxClasses: Record<string, string> = {
      'hero': 'hero--parallax',
      'features': 'features--parallax',
      'gallery': 'gallery--parallax',
      'testimonials': 'testimonials--parallax',
      'pricing': 'pricing--parallax',
      'services': 'services--parallax',
      'content': 'content--parallax',
      'faq': 'faq--parallax'
    };

    // Trouver le type de bloc principal
    const mainType = Object.keys(parallaxClasses).find(type => 
      blockType.toLowerCase().includes(type)
    );

    if (mainType && parallaxClasses[mainType]) {
      // Ajouter la classe parallax
      blockHtml = blockHtml.replace(
        /class="([^"]*)"/,
        `class="$1 ${parallaxClasses[mainType]}"`
      );

      // Ajouter des attributs data pour les effets
      if (mainType === 'hero') {
        blockHtml = blockHtml.replace(
          /<img([^>]*class="[^"]*hero__background[^"]*"[^>]*)>/,
          '<img$1 data-parallax-speed="0.5">'
        );
      }

      // Ajouter data-scroll-effect aux sections
      if (!blockHtml.includes('data-scroll-effect')) {
        blockHtml = blockHtml.replace(
          /<section([^>]*)>/,
          '<section$1 data-scroll-effect="fade-up">'
        );
      }

      // Ajouter data-tilt aux cartes
      if (['pricing', 'services', 'testimonials'].includes(mainType)) {
        blockHtml = blockHtml.replace(
          /class="([^"]*card[^"]*)"/g,
          'class="$1" data-tilt'
        );
      }
    }

    return blockHtml;
  }

  /**
   * Intègre les effets parallax dans l'export HTML complet
   */
  static integrateIntoExport(html: string): string {
    // Ajouter le CSS parallax avant la fermeture de </head>
    const parallaxCSS = this.generateParallaxCSS();
    html = html.replace(
      '</head>',
      `<style>${parallaxCSS}</style>\n</head>`
    );

    // Ajouter le JS parallax avant la fermeture de </body>
    const parallaxJS = this.generateParallaxJS();
    html = html.replace(
      '</body>',
      `<script>${parallaxJS}</script>\n</body>`
    );

    return html;
  }
}

export default ParallaxExportIntegration;
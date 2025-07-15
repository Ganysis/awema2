/**
 * Testimonials Renderer V3 PERFECT ENHANCED - Design magnifique avec variants de style
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { testimonialsDataSchema, testimonialsDefaults, type TestimonialsData } from '../schemas/blocks/testimonials';
import { logger } from '../core/logger';

export class TestimonialsRendererV3PerfectEnhanced extends BaseRendererV3<TestimonialsData> {
  type = 'testimonials-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('TestimonialsRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Testimonials V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<TestimonialsData, TestimonialsData> {
    return testimonialsDataSchema.safeParse(data);
  }

  getDefaultData(): TestimonialsData {
    return testimonialsDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Ajoute la propriété variant pour les styles
   */
  getBlockProps(): BlockProp[] {
    const baseProps = super.getBlockProps();
    
    // Filter out any existing variant properties to avoid duplicates
    const filteredProps = baseProps.filter(prop => prop.name !== 'variant' && prop.name !== 'visualVariant');
    
    // Ajouter la propriété variant au début
    const variantProp: BlockProp = {
      name: 'variant',  // Changed from 'key' to 'name' for consistency
      type: PropType.SELECT,
      label: 'Style des témoignages',
      required: false,
      defaultValue: 'modern',
      description: 'Choisissez le style visuel des témoignages',
      options: [
        { value: 'modern', label: 'Moderne' },
        { value: 'minimal', label: 'Minimaliste' },
        { value: 'bold', label: 'Impact' },
        { value: 'elegant', label: 'Élégant' }
      ],
      editorConfig: {
        control: EditorControl.RADIO,
        group: 'Visuel',
        order: 1
      }
    };

    return [variantProp, ...filteredProps];
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   TESTIMONIALS V3 PERFECT ENHANCED - Styles avec thème
   ======================================== */

.testimonials {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--background);
}

.testimonials__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.testimonials__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.testimonials__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text);
}

.testimonials__subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ========================================
   STYLES DE VARIANTES AVEC THÈME
   ======================================== */

/* Style Moderne */
.testimonials[data-style-variant="modern"] {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary), transparent 95%) 0%, 
    var(--background) 50%);
}

.testimonials[data-style-variant="modern"] .testimonials__card {
  background: var(--surface);
  border-radius: 2rem;
  padding: 2.5rem;
  box-shadow: 0 20px 60px -10px color-mix(in srgb, var(--text), transparent 85%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.testimonials[data-style-variant="modern"] .testimonials__card::before {
  content: '"';
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary);
  opacity: 0.2;
  font-family: var(--font-heading);
}

.testimonials[data-style-variant="modern"] .testimonials__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px -15px color-mix(in srgb, var(--primary), transparent 70%);
}

.testimonials[data-style-variant="modern"] .testimonials__rating {
  color: var(--accent);
  margin-bottom: 1rem;
}

.testimonials[data-style-variant="modern"] .testimonials__name {
  font-family: var(--font-heading);
  color: var(--text);
  font-weight: 700;
}

.testimonials[data-style-variant="modern"] .testimonials__role {
  color: var(--primary);
  font-family: var(--font-body);
}

/* Style Minimaliste */
.testimonials[data-style-variant="minimal"] {
  background: var(--background);
  padding: 8rem 0;
}

.testimonials[data-style-variant="minimal"] .testimonials__header {
  margin-bottom: 6rem;
}

.testimonials[data-style-variant="minimal"] .testimonials__title {
  font-family: var(--font-body);
  font-weight: 300;
  letter-spacing: -0.02em;
}

.testimonials[data-style-variant="minimal"] .testimonials__card {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 3rem;
  transition: all 0.3s ease;
}

.testimonials[data-style-variant="minimal"] .testimonials__card:hover {
  border-color: var(--text);
}

.testimonials[data-style-variant="minimal"] .testimonials__text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 2;
  color: var(--text);
  font-style: normal;
  margin-bottom: 2rem;
}

.testimonials[data-style-variant="minimal"] .testimonials__divider {
  width: 60px;
  height: 1px;
  background: var(--border);
  margin: 2rem 0;
}

.testimonials[data-style-variant="minimal"] .testimonials__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonials[data-style-variant="minimal"] .testimonials__avatar {
  filter: grayscale(100%);
  transition: filter 0.3s;
}

.testimonials[data-style-variant="minimal"] .testimonials__card:hover .testimonials__avatar {
  filter: grayscale(0%);
}

/* Style Impact */
.testimonials[data-style-variant="bold"] {
  background: var(--text);
  color: var(--background);
  padding: 8rem 0;
  position: relative;
}

.testimonials[data-style-variant="bold"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    color-mix(in srgb, var(--background), transparent 95%) 10px,
    color-mix(in srgb, var(--background), transparent 95%) 20px
  );
  pointer-events: none;
}

.testimonials[data-style-variant="bold"] .testimonials__title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: var(--background);
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

.testimonials[data-style-variant="bold"] .testimonials__subtitle {
  color: var(--primary);
  font-weight: 600;
}

.testimonials[data-style-variant="bold"] .testimonials__card {
  background: var(--background);
  color: var(--text);
  border-radius: 0;
  padding: 3rem;
  position: relative;
  transform: rotate(-1deg);
  transition: all 0.3s;
}

.testimonials[data-style-variant="bold"] .testimonials__card:nth-child(even) {
  transform: rotate(1deg);
}

.testimonials[data-style-variant="bold"] .testimonials__card:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 10;
}

.testimonials[data-style-variant="bold"] .testimonials__text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.testimonials[data-style-variant="bold"] .testimonials__rating {
  color: var(--accent);
  font-size: 2rem;
}

/* Style Élégant */
.testimonials[data-style-variant="elegant"] {
  background: linear-gradient(180deg, var(--surface) 0%, var(--background) 100%);
  padding: 10rem 0;
  position: relative;
}

.testimonials[data-style-variant="elegant"]::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    color-mix(in srgb, var(--accent), transparent 90%), 
    transparent);
  filter: blur(100px);
  pointer-events: none;
}

.testimonials[data-style-variant="elegant"] .testimonials__title {
  font-family: var(--font-heading);
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.02em;
}

.testimonials[data-style-variant="elegant"] .testimonials__subtitle {
  text-align: center;
  font-style: italic;
}

.testimonials[data-style-variant="elegant"] .testimonials__card {
  background: color-mix(in srgb, var(--surface), transparent 50%);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--border), transparent 50%);
  border-radius: 2rem;
  padding: 3rem;
  text-align: center;
  transition: all 0.4s ease;
}

.testimonials[data-style-variant="elegant"] .testimonials__card:hover {
  background: var(--surface);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px -10px color-mix(in srgb, var(--text), transparent 85%);
}

.testimonials[data-style-variant="elegant"] .testimonials__text {
  font-family: var(--font-body);
  font-size: 1.25rem;
  line-height: 1.8;
  font-style: italic;
  color: var(--text);
  margin-bottom: 2rem;
}

.testimonials[data-style-variant="elegant"] .testimonials__avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border: 3px solid var(--primary);
}

/* ========================================
   LAYOUTS COMMUNS AVEC THÈME
   ======================================== */

/* Statistiques avec thème */
.testimonials__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--surface);
  border-radius: 1rem;
  border: 1px solid var(--border);
}

.testimonials__stat-value {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.testimonials__stat-label {
  font-family: var(--font-body);
  color: var(--text-secondary);
}

/* Badges sociaux avec thème */
.testimonials__badges {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
}

.testimonials__badge {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--background);
  border-radius: 9999px;
  font-family: var(--font-body);
  font-weight: 600;
}

/* Filtres avec thème */
.testimonials__filters {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 9999px;
}

.testimonials__filter {
  padding: 0.5rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.3s;
}

.testimonials__filter:hover {
  color: var(--primary);
}

.testimonials__filter.active {
  background: var(--primary);
  color: var(--background);
  border-radius: 9999px;
}

/* Éléments de carte avec thème */
.testimonials__text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonials__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonials__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.testimonials__name {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.testimonials__role {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.testimonials__company {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--primary);
  font-weight: 600;
}

/* Rating avec thème */
.testimonials__rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.testimonials__star {
  color: var(--accent);
}

/* Boutons navigation avec thème */
.testimonials__nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.testimonials__nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.testimonials__nav-btn:hover {
  background: var(--primary);
  color: var(--background);
  border-color: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials__stats {
    grid-template-columns: 1fr;
  }
  
  .testimonials[data-style-variant="bold"] .testimonials__text {
    font-size: 1.25rem;
  }
  
  .testimonials[data-style-variant="elegant"] .testimonials__card {
    padding: 2rem;
  }
}

/* Animations */
.testimonials__card {
  opacity: 0;
  animation: testimonialsFadeIn 0.6s ease-out forwards;
}

.testimonials__card:nth-child(1) { animation-delay: 0.1s; }
.testimonials__card:nth-child(2) { animation-delay: 0.2s; }
.testimonials__card:nth-child(3) { animation-delay: 0.3s; }
.testimonials__card:nth-child(4) { animation-delay: 0.4s; }
.testimonials__card:nth-child(5) { animation-delay: 0.5s; }
.testimonials__card:nth-child(6) { animation-delay: 0.6s; }

@keyframes testimonialsFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Testimonials V3 Perfect Enhanced - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation globale
  function initTestimonials() {
    const testimonialSections = document.querySelectorAll('.testimonials');
    
    testimonialSections.forEach(section => {
      const layout = Array.from(section.classList)
        .find(c => c.startsWith('testimonials--'))
        ?.replace('testimonials--', '');
      
      // Filtres
      initFilters(section);
      
      // Layout spécifique
      switch(layout) {
        case 'carousel-modern':
          initCarousel(section);
          break;
        case 'masonry-wall':
          initMasonry(section);
          break;
        case 'timeline-stories':
          initTimeline(section);
          break;
        case 'stacked-cards':
          initStackedCards(section);
          break;
        case 'carousel-3d':
          initCarousel3D(section);
          break;
        case 'video-testimonials':
          initVideoTestimonials(section);
          break;
      }
      
      // Animations globales
      observeTestimonials(section);
      
      // Google Reviews import
      initGoogleReviews(section);
    });
  }
  
  // Filtres par catégorie
  function initFilters(section) {
    const filters = section.querySelectorAll('.testimonials__filter');
    const cards = section.querySelectorAll('.testimonials__card');
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.dataset.category;
        
        // Filtrer les cartes
        cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            card.classList.add('testimonials__card--visible');
          } else {
            card.style.display = 'none';
            card.classList.remove('testimonials__card--visible');
          }
        });
        
        // Réorganiser masonry si besoin
        const masonry = section.querySelector('.testimonials--masonry-wall');
        if (masonry) {
          reorganizeMasonry(masonry);
        }
      });
    });
  }
  
  // Carousel moderne
  function initCarousel(section) {
    const track = section.querySelector('.testimonials__track');
    const cards = section.querySelectorAll('.testimonials__card');
    const prevBtn = section.querySelector('.testimonials__nav-btn--prev');
    const nextBtn = section.querySelector('.testimonials__nav-btn--next');
    const indicators = section.querySelector('.testimonials__indicators');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // gap
    
    // Auto-play
    let autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }, 5000);
    
    // Navigation
    prevBtn?.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });
    
    nextBtn?.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });
    
    // Indicateurs
    if (indicators) {
      cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonials__indicator';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          clearInterval(autoplayInterval);
          currentIndex = index;
          updateCarousel();
        });
        
        indicators.appendChild(dot);
      });
    }
    
    function updateCarousel() {
      track.style.transform = \`translateX(-\${currentIndex * cardWidth}px)\`;
      
      // Update indicators
      const dots = indicators?.querySelectorAll('.testimonials__indicator');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextBtn?.click();
      }
      if (touchEndX > touchStartX + 50) {
        prevBtn?.click();
      }
    }
  }
  
  // Masonry layout
  function initMasonry(section) {
    const grid = section.querySelector('.testimonials__grid');
    if (!grid) return;
    
    // Attendre le chargement des images
    const images = grid.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            organizeMasonry();
          }
        });
      }
    });
    
    if (loadedImages === images.length) {
      organizeMasonry();
    }
    
    function organizeMasonry() {
      const cards = grid.querySelectorAll('.testimonials__card');
      const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const columnHeights = new Array(columns).fill(0);
      
      cards.forEach(card => {
        const minColumn = columnHeights.indexOf(Math.min(...columnHeights));
        card.style.gridColumn = minColumn + 1;
        columnHeights[minColumn] += card.offsetHeight + 20; // gap
      });
    }
    
    // Réorganiser sur resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(organizeMasonry, 250);
    });
  }
  
  // Timeline stories
  function initTimeline(section) {
    const items = section.querySelectorAll('.testimonials__timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('testimonials__timeline-item--visible');
        }
      });
    }, { threshold: 0.3 });
    
    items.forEach(item => observer.observe(item));
  }
  
  // Stacked cards
  function initStackedCards(section) {
    const stack = section.querySelector('.testimonials__stack');
    const cards = section.querySelectorAll('.testimonials__card');
    const nextBtn = section.querySelector('.testimonials__stack-next');
    
    if (!stack || cards.length === 0) return;
    
    let currentIndex = 0;
    
    // Position initiale
    updateStack();
    
    nextBtn?.addEventListener('click', () => {
      // Déplacer la carte du dessus à la fin
      const firstCard = cards[currentIndex];
      firstCard.style.transform = 'translateX(150%) rotate(10deg)';
      firstCard.style.opacity = '0';
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateStack();
        
        // Réinitialiser la carte déplacée
        setTimeout(() => {
          firstCard.style.transition = 'none';
          firstCard.style.transform = '';
          firstCard.style.opacity = '';
          
          setTimeout(() => {
            firstCard.style.transition = '';
          }, 50);
        }, 50);
      }, 300);
    });
    
    function updateStack() {
      cards.forEach((card, index) => {
        const offset = (index - currentIndex + cards.length) % cards.length;
        
        card.style.zIndex = cards.length - offset;
        card.style.transform = \`translateY(\${offset * 10}px) scale(\${1 - offset * 0.05})\`;
        card.style.opacity = offset < 3 ? '1' : '0';
        
        // Rendre cliquable seulement la carte du dessus
        card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
      });
    }
  }
  
  // Carousel 3D
  function initCarousel3D(section) {
    const carousel = section.querySelector('.testimonials__carousel-3d');
    const cards = section.querySelectorAll('.testimonials__card');
    const prevBtn = section.querySelector('.testimonials__nav-btn--prev');
    const nextBtn = section.querySelector('.testimonials__nav-btn--next');
    
    if (!carousel || cards.length === 0) return;
    
    let currentRotation = 0;
    const angleStep = 360 / cards.length;
    
    // Positionner les cartes en cercle
    cards.forEach((card, index) => {
      const angle = index * angleStep;
      card.style.transform = \`rotateY(\${angle}deg) translateZ(300px)\`;
    });
    
    prevBtn?.addEventListener('click', () => {
      currentRotation += angleStep;
      updateCarousel3D();
    });
    
    nextBtn?.addEventListener('click', () => {
      currentRotation -= angleStep;
      updateCarousel3D();
    });
    
    function updateCarousel3D() {
      carousel.style.transform = \`rotateY(\${currentRotation}deg)\`;
    }
    
    // Auto-rotation optionnelle
    let autoRotate = setInterval(() => {
      currentRotation -= 0.5;
      carousel.style.transform = \`rotateY(\${currentRotation}deg)\`;
    }, 50);
    
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => {
        currentRotation -= 0.5;
        carousel.style.transform = \`rotateY(\${currentRotation}deg)\`;
      }, 50);
    });
  }
  
  // Video testimonials
  function initVideoTestimonials(section) {
    const videos = section.querySelectorAll('.testimonials__video');
    const playBtns = section.querySelectorAll('.testimonials__play-btn');
    
    playBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const video = videos[index];
        const card = btn.closest('.testimonials__card');
        
        if (video) {
          // Créer modal vidéo
          const modal = document.createElement('div');
          modal.className = 'testimonials__video-modal';
          modal.innerHTML = \`
            <div class="testimonials__video-modal-content">
              <button class="testimonials__video-close">&times;</button>
              <iframe src="\${video.dataset.src}?autoplay=1" frameborder="0" allowfullscreen></iframe>
            </div>
          \`;
          
          document.body.appendChild(modal);
          
          // Animation d'entrée
          setTimeout(() => {
            modal.classList.add('active');
          }, 10);
          
          // Fermer modal
          modal.querySelector('.testimonials__video-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
              modal.remove();
            }, 300);
          });
          
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              modal.querySelector('.testimonials__video-close').click();
            }
          });
        }
      });
    });
  }
  
  // Google Reviews import
  function initGoogleReviews(section) {
    const importBtn = section.querySelector('.testimonials__import-google');
    if (!importBtn) return;
    
    importBtn.addEventListener('click', async () => {
      const placeId = importBtn.dataset.placeId;
      if (!placeId) return;
      
      try {
        // Simuler l'import (en production, utiliser l'API Google Places)
        importBtn.textContent = 'Importation...';
        importBtn.disabled = true;
        
        // Simuler un délai
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Ajouter les avis importés
        const reviews = [
          {
            author: 'Marie L.',
            rating: 5,
            text: 'Excellent service, je recommande vivement !',
            date: 'Il y a 2 jours'
          },
          {
            author: 'Pierre D.',
            rating: 5,
            text: 'Très professionnel et à l\'écoute.',
            date: 'Il y a 1 semaine'
          }
        ];
        
        const grid = section.querySelector('.testimonials__grid');
        reviews.forEach(review => {
          const card = createReviewCard(review);
          grid.appendChild(card);
        });
        
        importBtn.textContent = '✓ Importé';
        setTimeout(() => {
          importBtn.textContent = 'Importer de Google';
          importBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        console.error('Erreur import Google Reviews:', error);
        importBtn.textContent = 'Erreur';
        importBtn.disabled = false;
      }
    });
  }
  
  // Créer une carte d'avis
  function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'testimonials__card testimonials__card--google';
    card.innerHTML = \`
      <div class="testimonials__google-badge">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </div>
      <div class="testimonials__rating">
        \${Array(review.rating).fill('★').join('')}
      </div>
      <p class="testimonials__text">\${review.text}</p>
      <div class="testimonials__author">
        <div class="testimonials__avatar" style="background: #e0e0e0;">
          \${review.author.charAt(0)}
        </div>
        <div>
          <div class="testimonials__name">\${review.author}</div>
          <div class="testimonials__date">\${review.date}</div>
        </div>
      </div>
    \`;
    
    // Animation d'entrée
    setTimeout(() => {
      card.classList.add('testimonials__card--visible');
    }, 100);
    
    return card;
  }
  
  // Observer pour animations
  function observeTestimonials(section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('testimonials--visible');
          
          // Animer les statistiques
          animateStats(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section);
  }
  
  // Animer les statistiques
  function animateStats(section) {
    const stats = section.querySelectorAll('.testimonials__stat-value');
    
    stats.forEach(stat => {
      const value = parseInt(stat.textContent);
      if (isNaN(value)) return;
      
      const duration = 2000;
      const start = 0;
      const increment = value / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        
        stat.textContent = Math.floor(current);
        
        // Ajouter le signe + ou % si nécessaire
        if (stat.dataset.suffix) {
          stat.textContent += stat.dataset.suffix;
        }
      }, 16);
    });
  }
  
  // Load more functionality
  function initLoadMore(section) {
    const loadMoreBtn = section.querySelector('.testimonials__load-more');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', async () => {
      loadMoreBtn.textContent = 'Chargement...';
      loadMoreBtn.disabled = true;
      
      // Simuler le chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ajouter plus de témoignages (en production, charger depuis l'API)
      const grid = section.querySelector('.testimonials__grid');
      for (let i = 0; i < 3; i++) {
        const card = grid.querySelector('.testimonials__card').cloneNode(true);
        grid.appendChild(card);
      }
      
      loadMoreBtn.textContent = 'Voir plus';
      loadMoreBtn.disabled = false;
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
  } else {
    initTestimonials();
  }
  
  // Export pour usage externe
  window.TestimonialsPerfect = {
    init: initTestimonials,
    createReviewCard: createReviewCard
  };
})();
    `;
  }

  render(data: TestimonialsData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('TestimonialsRendererV3PerfectEnhanced', 'render', 'Validation échouée', validation.error);
        return {
          html: this.renderError('Données invalides'),
          css: this.getDefaultCSS(),
          js: this.getDefaultJS(),
          errors: validation.error.errors.map(e => ({
            message: e.message,
            path: e.path.join('.')
          }))
        };
      }

      const validData = validation.data;
      logger.info('TestimonialsRendererV3PerfectEnhanced', 'render', 'Rendu Testimonials avec layout:', validData.layout);

      // Ajouter le style variant depuis les données
      const styleVariant = (data as any).variant || 'modern';

      // Générer le HTML selon le layout
      const html = this.renderLayout(validData, styleVariant);
      
      // CSS avec variables personnalisées
      const customCSS = this.generateCustomCSS(validData);
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('TestimonialsRendererV3PerfectEnhanced', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderLayout(data: TestimonialsData, styleVariant: string): string {
    let content = '';
    
    switch(data.layout) {
      case 'grid-modern':
        content = this.renderGridModern(data);
        break;
      case 'carousel-modern':
        content = this.renderCarouselModern(data);
        break;
      case 'masonry-wall':
        content = this.renderMasonryWall(data);
        break;
      case 'slider-elegant':
        content = this.renderSliderElegant(data);
        break;
      case 'stacked-cards':
        content = this.renderStackedCards(data);
        break;
      case 'timeline-stories':
        content = this.renderTimelineStories(data);
        break;
      case 'carousel-3d':
        content = this.renderCarousel3D(data);
        break;
      case 'video-testimonials':
        content = this.renderVideoTestimonials(data);
        break;
      default:
        content = this.renderGridModern(data);
    }

    return `
      <section class="testimonials testimonials--${data.layout}" data-style-variant="${styleVariant}" id="${data.id || 'testimonials'}">
        <div class="testimonials__container">
          ${this.renderHeader(data)}
          ${this.renderStats(data)}
          ${this.renderFilters(data)}
          ${content}
          ${this.renderBadges(data)}
        </div>
      </section>
    `;
  }

  private renderHeader(data: TestimonialsData): string {
    if (!data.title && !data.subtitle) return '';
    
    return `
      <header class="testimonials__header">
        ${data.title ? `<h2 class="testimonials__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="testimonials__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      </header>
    `;
  }

  private renderStats(data: TestimonialsData): string {
    if (!data.stats || data.stats.length === 0) return '';
    
    return `
      <div class="testimonials__stats">
        ${data.stats.map(stat => `
          <div class="testimonials__stat">
            <div class="testimonials__stat-value" data-suffix="${stat.suffix || ''}">${this.escapeHtml(stat.value)}</div>
            <div class="testimonials__stat-label">${this.escapeHtml(stat.label)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderFilters(data: TestimonialsData): string {
    if (!data.filters?.enabled || !data.filters.categories || data.filters.categories.length === 0) return '';
    
    return `
      <div class="testimonials__filters">
        <button class="testimonials__filter active" data-category="all">Tous</button>
        ${data.filters.categories.map(cat => `
          <button class="testimonials__filter" data-category="${this.escapeHtml(cat)}">
            ${this.escapeHtml(cat)}
          </button>
        `).join('')}
      </div>
    `;
  }

  private renderBadges(data: TestimonialsData): string {
    if (!data.badges || data.badges.length === 0) return '';
    
    return `
      <div class="testimonials__badges">
        ${data.badges.map(badge => `
          <span class="testimonials__badge">
            ${badge.icon ? `<span class="testimonials__badge-icon">${badge.icon}</span>` : ''}
            ${this.escapeHtml(badge.text)}
          </span>
        `).join('')}
      </div>
    `;
  }

  private renderGridModern(data: TestimonialsData): string {
    return `
      <div class="testimonials__grid">
        ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
      </div>
      ${data.loadMore?.enabled ? `
        <button class="testimonials__load-more">
          ${this.escapeHtml(data.loadMore.text || 'Voir plus')}
        </button>
      ` : ''}
    `;
  }

  private renderCarouselModern(data: TestimonialsData): string {
    return `
      <div class="testimonials__carousel">
        <div class="testimonials__track">
          ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
        </div>
        <div class="testimonials__nav">
          <button class="testimonials__nav-btn testimonials__nav-btn--prev">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          <button class="testimonials__nav-btn testimonials__nav-btn--next">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
        <div class="testimonials__indicators"></div>
      </div>
    `;
  }

  private renderMasonryWall(data: TestimonialsData): string {
    return `
      <div class="testimonials__grid testimonials__grid--masonry">
        ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
      </div>
    `;
  }

  private renderSliderElegant(data: TestimonialsData): string {
    return `
      <div class="testimonials__slider">
        <div class="testimonials__slider-track">
          ${data.testimonials.map((testimonial, index) => `
            <div class="testimonials__slide ${index === 0 ? 'active' : ''}">
              ${this.renderTestimonialCard(testimonial, data)}
            </div>
          `).join('')}
        </div>
        <div class="testimonials__dots">
          ${data.testimonials.map((_, index) => `
            <button class="testimonials__dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderStackedCards(data: TestimonialsData): string {
    return `
      <div class="testimonials__stack">
        ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
        <button class="testimonials__stack-next">Suivant →</button>
      </div>
    `;
  }

  private renderTimelineStories(data: TestimonialsData): string {
    return `
      <div class="testimonials__timeline">
        ${data.testimonials.map((testimonial, index) => `
          <div class="testimonials__timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="testimonials__timeline-marker"></div>
            ${this.renderTestimonialCard(testimonial, data)}
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderCarousel3D(data: TestimonialsData): string {
    return `
      <div class="testimonials__carousel-3d-container">
        <div class="testimonials__carousel-3d">
          ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
        </div>
        <div class="testimonials__nav">
          <button class="testimonials__nav-btn testimonials__nav-btn--prev">←</button>
          <button class="testimonials__nav-btn testimonials__nav-btn--next">→</button>
        </div>
      </div>
    `;
  }

  private renderVideoTestimonials(data: TestimonialsData): string {
    return `
      <div class="testimonials__videos">
        ${data.testimonials.map(testimonial => `
          <div class="testimonials__card testimonials__card--video" data-category="${testimonial.category || ''}">
            ${testimonial.video ? `
              <div class="testimonials__video-wrapper">
                <img src="${testimonial.video.thumbnail || testimonial.avatar}" alt="${testimonial.name}" class="testimonials__video-thumb">
                <button class="testimonials__play-btn">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="white" d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div class="testimonials__video" data-src="${testimonial.video.url}"></div>
              </div>
            ` : ''}
            <div class="testimonials__content">
              ${this.renderRating(testimonial.rating)}
              <p class="testimonials__text">${this.escapeHtml(testimonial.text)}</p>
              ${this.renderAuthor(testimonial)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderTestimonialCard(testimonial: any, data: TestimonialsData): string {
    return `
      <div class="testimonials__card" data-category="${testimonial.category || ''}">
        ${this.renderRating(testimonial.rating)}
        <p class="testimonials__text">${this.escapeHtml(testimonial.text)}</p>
        ${this.renderAuthor(testimonial)}
        ${testimonial.logo ? `
          <img src="${testimonial.logo}" alt="${testimonial.company || ''}" class="testimonials__logo">
        ` : ''}
      </div>
    `;
  }

  private renderRating(rating: number | undefined): string {
    if (!rating) return '';
    
    const stars = Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆');
    
    return `
      <div class="testimonials__rating">
        ${stars.map(star => `<span class="testimonials__star">${star}</span>`).join('')}
      </div>
    `;
  }

  private renderAuthor(testimonial: any): string {
    return `
      <div class="testimonials__author">
        ${testimonial.avatar ? `
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonials__avatar">
        ` : ''}
        <div>
          <div class="testimonials__name">${this.escapeHtml(testimonial.name)}</div>
          ${testimonial.role ? `<div class="testimonials__role">${this.escapeHtml(testimonial.role)}</div>` : ''}
          ${testimonial.company ? `<div class="testimonials__company">${this.escapeHtml(testimonial.company)}</div>` : ''}
        </div>
      </div>
    `;
  }

  private generateCustomCSS(data: TestimonialsData): string {
    let css = '\n/* Custom Testimonials Styles */\n';
    
    // Couleurs personnalisées
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.testimonials {
        --testimonials-primary: ${colors.primary || '#667eea'};
        --testimonials-secondary: ${colors.secondary || '#764ba2'};
        --testimonials-text: ${colors.text || '#4b5563'};
        --testimonials-bg: ${colors.background || '#ffffff'};
        --testimonials-card-bg: ${colors.cardBackground || '#ffffff'};
      }\n`;
    }

    // Spacing
    if (data.styles?.spacing) {
      const spacing = data.styles.spacing;
      css += `.testimonials {
        ${spacing.padding ? `padding: ${spacing.padding};` : ''}
      }
      .testimonials__grid {
        ${spacing.gap ? `gap: ${spacing.gap};` : ''}
      }\n`;
    }

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="testimonials-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur Testimonials:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const testimonialsRendererV3PerfectEnhanced = new TestimonialsRendererV3PerfectEnhanced();
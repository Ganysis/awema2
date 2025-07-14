/**
 * Testimonials Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { testimonialsDataSchema, testimonialsDefaults, type TestimonialsData } from '../schemas/blocks/testimonials';
import { logger } from '../core/logger';

export class TestimonialsRendererV3Perfect extends BaseRendererV3<TestimonialsData> {
  type = 'testimonials-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('TestimonialsRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Testimonials V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<TestimonialsData, TestimonialsData> {
    return testimonialsDataSchema.safeParse(data);
  }

  getDefaultData(): TestimonialsData {
    return testimonialsDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Utilise la méthode de base qui génère automatiquement les props
   */
  getBlockProps(): BlockProp[] {
    // Utilise la méthode de la classe de base qui génère automatiquement
    // les props à partir des données par défaut
    return super.getBlockProps();
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   TESTIMONIALS V3 PERFECT - Styles magnifiques
   ======================================== */

.testimonials {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--testimonials-bg, #ffffff);
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1f2937;
}

.testimonials__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
}

/* Statistiques */
.testimonials__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 1rem;
}

.testimonials__stat {
  text-align: center;
}

.testimonials__stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.testimonials__stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Rating distribution */
.testimonials__distribution {
  max-width: 400px;
  margin: 0 auto;
}

.testimonials__distribution-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.testimonials__distribution-stars {
  display: flex;
  gap: 0.25rem;
  width: 100px;
}

.testimonials__distribution-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.testimonials__distribution-fill {
  height: 100%;
  background: #fbbf24;
  transition: width 1s ease-out;
}

.testimonials__distribution-count {
  font-size: 0.875rem;
  color: #6b7280;
  width: 50px;
  text-align: right;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Carousel Modern - Carrousel avec navigation */
.testimonials--carousel-modern .testimonials__wrapper {
  position: relative;
  overflow: hidden;
}

.testimonials--carousel-modern .testimonials__track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 2rem;
}

.testimonials--carousel-modern .testimonial__card {
  flex: 0 0 calc(33.333% - 1.333rem);
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.testimonials--carousel-modern .testimonial__card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.2);
}

.testimonials--carousel-modern .testimonials__nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.testimonials--carousel-modern .testimonials__nav-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonials--carousel-modern .testimonials__nav-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  transform: scale(1.1);
}

.testimonials--carousel-modern .testimonials__dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.testimonials--carousel-modern .testimonials__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonials--carousel-modern .testimonials__dot.active {
  width: 30px;
  border-radius: 5px;
  background: #6366f1;
}

/* 2. Grid Masonry - Grille dynamique */
.testimonials--grid-masonry .testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  grid-auto-flow: dense;
}

.testimonials--grid-masonry .testimonial__card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.testimonials--grid-masonry .testimonial__card:nth-child(3n+1) {
  grid-row: span 2;
}

.testimonials--grid-masonry .testimonial__card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* 3. Wall Infinite - Mur défilant */
.testimonials--wall-infinite {
  --scroll-speed: 40s;
}

.testimonials--wall-infinite .testimonials__wall {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.testimonials--wall-infinite .testimonials__row {
  display: flex;
  gap: 2rem;
  animation: testimonialScroll var(--scroll-speed) linear infinite;
}

.testimonials--wall-infinite .testimonials__row:nth-child(even) {
  animation-direction: reverse;
}

@keyframes testimonialScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.testimonials--wall-infinite .testimonial__card {
  flex: 0 0 400px;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.testimonials--wall-infinite .testimonials__wall:hover .testimonials__row {
  animation-play-state: paused;
}

/* 4. Cards 3D - Cartes interactives */
.testimonials--cards-3d .testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  perspective: 1000px;
}

.testimonials--cards-3d .testimonial__card {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.testimonials--cards-3d .testimonial__card:hover {
  transform: rotateY(180deg);
}

.testimonials--cards-3d .testimonial__front,
.testimonials--cards-3d .testimonial__back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: inherit;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.testimonials--cards-3d .testimonial__back {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: rotateY(180deg);
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* 5. Timeline Animated - Timeline avec animations */
.testimonials--timeline-animated .testimonials__timeline {
  position: relative;
  padding: 2rem 0;
}

.testimonials--timeline-animated .testimonials__timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
  transform: translateX(-50%);
}

.testimonials--timeline-animated .testimonial__item {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  opacity: 0;
  animation: timelineFadeIn 0.6s ease forwards;
}

.testimonials--timeline-animated .testimonial__item:nth-child(even) {
  flex-direction: row-reverse;
}

@keyframes timelineFadeIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.testimonials--timeline-animated .testimonial__content {
  flex: 1;
  padding: 0 3rem;
}

.testimonials--timeline-animated .testimonial__card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.testimonials--timeline-animated .testimonial__date {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #6366f1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  white-space: nowrap;
}

/* 6. Video Spotlight - Focus vidéos */
.testimonials--video-spotlight .testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.testimonials--video-spotlight .testimonial__card {
  position: relative;
  background: #000;
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 16/9;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonials--video-spotlight .testimonial__card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.testimonials--video-spotlight .testimonial__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials--video-spotlight .testimonial__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.testimonials--video-spotlight .testimonial__card:hover .testimonial__overlay {
  opacity: 1;
}

.testimonials--video-spotlight .testimonial__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.testimonials--video-spotlight .testimonial__card:hover .testimonial__play {
  transform: translate(-50%, -50%) scale(1.2);
  background: white;
}

/* 7. Social Proof - Preuve sociale avancée */
.testimonials--social-proof .testimonials__platforms {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.testimonials--social-proof .platform__badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: white;
  border-radius: 5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.testimonials--social-proof .platform__badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.testimonials--social-proof .platform__logo {
  width: 40px;
  height: 40px;
}

.testimonials--social-proof .platform__info {
  text-align: left;
}

.testimonials--social-proof .platform__rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #1f2937;
}

.testimonials--social-proof .platform__count {
  font-size: 0.875rem;
  color: #6b7280;
}

.testimonials--social-proof .testimonials__trust {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 1.5rem;
  margin-bottom: 3rem;
}

.testimonials--social-proof .trust__logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.testimonials--social-proof .trust__logo {
  height: 40px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.testimonials--social-proof .trust__logo:hover {
  opacity: 1;
}

/* 8. Interactive Map - Carte interactive */
.testimonials--interactive-map .testimonials__map-container {
  position: relative;
  height: 600px;
  background: #f3f4f6;
  border-radius: 1.5rem;
  overflow: hidden;
}

.testimonials--interactive-map .testimonials__map {
  width: 100%;
  height: 100%;
  filter: grayscale(0.5);
  transition: filter 0.3s ease;
}

.testimonials--interactive-map .testimonials__map:hover {
  filter: grayscale(0);
}

.testimonials--interactive-map .testimonial__marker {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #6366f1;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

.testimonials--interactive-map .testimonial__marker::before {
  content: '';
  position: absolute;
  inset: 8px;
  background: white;
  border-radius: 50%;
}

.testimonials--interactive-map .testimonial__marker:hover {
  transform: rotate(-45deg) scale(1.2);
  background: #4f46e5;
}

.testimonials--interactive-map .testimonial__popup {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.testimonials--interactive-map .testimonial__marker:hover .testimonial__popup {
  opacity: 1;
  visibility: visible;
  bottom: 70px;
}

/* Éléments communs */
.testimonial__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.testimonial__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f3f4f6;
}

.testimonial__author {
  flex: 1;
}

.testimonial__name {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.testimonial__verified {
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
}

.testimonial__role {
  font-size: 0.875rem;
  color: #6b7280;
}

.testimonial__company {
  font-size: 0.875rem;
  color: #9ca3af;
}

.testimonial__content {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1rem;
  font-style: italic;
  position: relative;
}

.testimonial__content::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: -20px;
  font-size: 3rem;
  color: #e5e7eb;
  font-family: Georgia, serif;
}

.testimonial__rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.testimonial__star {
  width: 20px;
  height: 20px;
  color: #fbbf24;
}

.testimonial__star--empty {
  color: #e5e7eb;
}

.testimonial__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.testimonial__date {
  font-size: 0.875rem;
  color: #9ca3af;
}

.testimonial__source {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.testimonial__source-icon {
  width: 20px;
  height: 20px;
}

/* Filtres */
.testimonials__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.testimonials__filter {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 5rem;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonials__filter:hover,
.testimonials__filter.active {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
  transform: translateY(-2px);
}

/* CTA */
.testimonials__cta {
  text-align: center;
  margin-top: 4rem;
}

.testimonials__cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #6366f1;
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.testimonials__cta-btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials--carousel-modern .testimonial__card {
    flex: 0 0 100%;
  }
  
  .testimonials--grid-masonry .testimonials__grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials--timeline-animated .testimonials__timeline::before {
    left: 20px;
  }
  
  .testimonials--timeline-animated .testimonial__item,
  .testimonials--timeline-animated .testimonial__item:nth-child(even) {
    flex-direction: row;
  }
  
  .testimonials--timeline-animated .testimonial__content {
    padding-left: 3rem;
  }
  
  .testimonials__filters {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
  
  .testimonials__filter {
    flex-shrink: 0;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .testimonials {
    background: #1f2937;
  }
  
  .testimonials__title {
    color: white;
  }
  
  .testimonials__subtitle {
    color: #d1d5db;
  }
  
  .testimonial__card {
    background: #374151;
    color: white;
  }
  
  .testimonial__name {
    color: white;
  }
  
  .testimonial__content {
    color: #e5e7eb;
  }
  
  .testimonials__stats {
    background: #374151;
  }
  
  .testimonials__stat-value {
    color: white;
  }
}`;
  }

  getDefaultJS(): string {
    return `
// ========================================
// TESTIMONIALS V3 PERFECT - JavaScript
// ========================================

class TestimonialsV3Perfect {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'carousel-modern';
    this.autoplay = element.dataset.autoplay === 'true';
    this.autoplaySpeed = parseInt(element.dataset.autoplaySpeed) || 5000;
    
    this.init();
  }
  
  init() {
    console.log('🎭 Initialisation Testimonials V3 Perfect:', this.variant);
    
    // Initialisation selon la variante
    switch(this.variant) {
      case 'carousel-modern':
        this.initCarousel();
        break;
      case 'grid-masonry':
        this.initMasonry();
        break;
      case 'wall-infinite':
        this.initInfiniteWall();
        break;
      case 'cards-3d':
        this.initCards3D();
        break;
      case 'timeline-animated':
        this.initTimeline();
        break;
      case 'video-spotlight':
        this.initVideoSpotlight();
        break;
      case 'social-proof':
        this.initSocialProof();
        break;
      case 'interactive-map':
        this.initInteractiveMap();
        break;
    }
    
    // Fonctionnalités communes
    this.initFilters();
    this.initRatingDisplay();
    this.initHelpful();
    this.initLoadMore();
    this.initSearch();
  }
  
  // Carousel Modern
  initCarousel() {
    const track = this.element.querySelector('.testimonials__track');
    const cards = this.element.querySelectorAll('.testimonial__card');
    const prevBtn = this.element.querySelector('.testimonials__nav-btn--prev');
    const nextBtn = this.element.querySelector('.testimonials__nav-btn--next');
    const dots = this.element.querySelectorAll('.testimonials__dot');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardsPerView = this.getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    const updateCarousel = () => {
      const offset = -(currentIndex * (100 / cardsPerView));
      track.style.transform = \`translateX(\${offset}%)\`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === Math.floor(currentIndex / cardsPerView));
      });
    };
    
    // Navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - cardsPerView);
        updateCarousel();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, currentIndex + cardsPerView);
        updateCarousel();
      });
    }
    
    // Dots navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index * cardsPerView;
        updateCarousel();
      });
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        // Swipe left
        currentIndex = Math.min(maxIndex, currentIndex + cardsPerView);
      } else if (touchEndX > touchStartX + 50) {
        // Swipe right
        currentIndex = Math.max(0, currentIndex - cardsPerView);
      }
      updateCarousel();
    };
    
    // Autoplay
    if (this.autoplay) {
      let autoplayInterval = setInterval(() => {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + cardsPerView;
        updateCarousel();
      }, this.autoplaySpeed);
      
      // Pause on hover
      this.element.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
      this.element.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
          currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + cardsPerView;
          updateCarousel();
        }, this.autoplaySpeed);
      });
    }
    
    // Responsive
    window.addEventListener('resize', () => {
      const newCardsPerView = this.getCardsPerView();
      if (newCardsPerView !== cardsPerView) {
        location.reload(); // Simple reload for demo
      }
    });
  }
  
  getCardsPerView() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }
  
  // Grid Masonry
  initMasonry() {
    const grid = this.element.querySelector('.testimonials__grid');
    if (!grid) return;
    
    // Simulate masonry with CSS Grid
    const cards = grid.querySelectorAll('.testimonial__card');
    cards.forEach((card, index) => {
      // Add varying heights for masonry effect
      if (index % 3 === 0) {
        card.style.gridRow = 'span 2';
      }
      
      // Stagger animation
      card.style.animationDelay = \`\${index * 0.1}s\`;
    });
  }
  
  // Infinite Wall
  initInfiniteWall() {
    const wall = this.element.querySelector('.testimonials__wall');
    if (!wall) return;
    
    // Duplicate content for seamless loop
    const rows = wall.querySelectorAll('.testimonials__row');
    rows.forEach(row => {
      const cards = row.innerHTML;
      row.innerHTML += cards; // Duplicate for seamless loop
    });
    
    // Pause on hover
    wall.addEventListener('mouseenter', () => {
      rows.forEach(row => row.style.animationPlayState = 'paused');
    });
    
    wall.addEventListener('mouseleave', () => {
      rows.forEach(row => row.style.animationPlayState = 'running');
    });
  }
  
  // 3D Cards
  initCards3D() {
    const cards = this.element.querySelectorAll('.testimonial__card');
    
    cards.forEach(card => {
      // Add flip functionality
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
      
      // 3D tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }
  
  // Timeline
  initTimeline() {
    const items = this.element.querySelectorAll('.testimonial__item');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = \`\${entry.target.dataset.index * 0.2}s\`;
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    
    items.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });
  }
  
  // Video Spotlight
  initVideoSpotlight() {
    const cards = this.element.querySelectorAll('.testimonial__card');
    
    cards.forEach(card => {
      const video = card.querySelector('.testimonial__video');
      const playBtn = card.querySelector('.testimonial__play');
      
      if (video && playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          
          if (video.paused) {
            video.play();
            playBtn.style.display = 'none';
          } else {
            video.pause();
            playBtn.style.display = 'flex';
          }
        });
        
        video.addEventListener('ended', () => {
          playBtn.style.display = 'flex';
        });
      }
    });
  }
  
  // Social Proof
  initSocialProof() {
    // Animate statistics
    const stats = this.element.querySelectorAll('.testimonials__stat-value');
    
    stats.forEach(stat => {
      const value = parseInt(stat.textContent);
      let current = 0;
      const increment = value / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current).toLocaleString();
      }, 30);
    });
    
    // Rating distribution animation
    const bars = this.element.querySelectorAll('.testimonials__distribution-fill');
    bars.forEach(bar => {
      const width = bar.dataset.width || '0';
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 300);
    });
  }
  
  // Interactive Map
  initInteractiveMap() {
    const markers = this.element.querySelectorAll('.testimonial__marker');
    
    markers.forEach(marker => {
      marker.addEventListener('click', () => {
        // Close other popups
        markers.forEach(m => {
          if (m !== marker) {
            m.classList.remove('active');
          }
        });
        
        marker.classList.toggle('active');
      });
    });
    
    // Close popups on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.testimonial__marker')) {
        markers.forEach(m => m.classList.remove('active'));
      }
    });
  }
  
  // Filtres
  initFilters() {
    const filters = this.element.querySelectorAll('.testimonials__filter');
    const cards = this.element.querySelectorAll('.testimonial__card');
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.category;
        
        // Update active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter cards
        cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            card.style.animation = 'testimonialFadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Re-init masonry if needed
        if (this.variant === 'grid-masonry') {
          this.initMasonry();
        }
      });
    });
  }
  
  // Rating display
  initRatingDisplay() {
    const ratings = this.element.querySelectorAll('.testimonial__rating');
    
    ratings.forEach(rating => {
      const value = parseFloat(rating.dataset.rating) || 0;
      const stars = rating.querySelectorAll('.testimonial__star');
      
      stars.forEach((star, index) => {
        if (index < Math.floor(value)) {
          star.classList.remove('testimonial__star--empty');
        } else if (index < value) {
          // Half star
          star.style.background = 'linear-gradient(90deg, #fbbf24 50%, #e5e7eb 50%)';
          star.style.backgroundClip = 'text';
          star.style.webkitBackgroundClip = 'text';
        } else {
          star.classList.add('testimonial__star--empty');
        }
      });
    });
  }
  
  // Helpful votes
  initHelpful() {
    const helpfulBtns = this.element.querySelectorAll('.testimonial__helpful-btn');
    
    helpfulBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const countEl = btn.querySelector('.testimonial__helpful-count');
        let count = parseInt(countEl.textContent) || 0;
        
        // Toggle state
        if (btn.classList.contains('active')) {
          count--;
          btn.classList.remove('active');
        } else {
          count++;
          btn.classList.add('active');
          
          // Remove active from opposite button
          const opposite = type === 'yes' ? 
            btn.parentElement.querySelector('[data-type="no"]') :
            btn.parentElement.querySelector('[data-type="yes"]');
          
          if (opposite && opposite.classList.contains('active')) {
            opposite.classList.remove('active');
            const oppositeCount = opposite.querySelector('.testimonial__helpful-count');
            oppositeCount.textContent = parseInt(oppositeCount.textContent) - 1;
          }
        }
        
        countEl.textContent = count;
        
        // Animate
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 200);
      });
    });
  }
  
  // Load more
  initLoadMore() {
    const loadMoreBtn = this.element.querySelector('.testimonials__load-more');
    if (!loadMoreBtn) return;
    
    const hiddenCards = this.element.querySelectorAll('.testimonial__card[data-hidden="true"]');
    let revealed = 0;
    const perLoad = 6;
    
    loadMoreBtn.addEventListener('click', () => {
      for (let i = revealed; i < revealed + perLoad && i < hiddenCards.length; i++) {
        hiddenCards[i].removeAttribute('data-hidden');
        hiddenCards[i].style.animation = 'testimonialFadeIn 0.5s ease';
      }
      
      revealed += perLoad;
      
      if (revealed >= hiddenCards.length) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }
  
  // Search
  initSearch() {
    const searchInput = this.element.querySelector('.testimonials__search');
    if (!searchInput) return;
    
    const cards = this.element.querySelectorAll('.testimonial__card');
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      cards.forEach(card => {
        const content = card.textContent.toLowerCase();
        
        if (content.includes(query)) {
          card.style.display = '';
          
          // Highlight matches
          const contentEl = card.querySelector('.testimonial__content');
          if (contentEl) {
            const text = contentEl.textContent;
            const regex = new RegExp(\`(\${query})\`, 'gi');
            contentEl.innerHTML = text.replace(regex, '<mark>$1</mark>');
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.testimonials').forEach(element => {
    new TestimonialsV3Perfect(element);
  });
});`;
  }

  render(data: TestimonialsData, context: RenderContext): RenderResult {
    logger.info('TestimonialsRendererV3Perfect', 'render', '🎨 Rendu du bloc Testimonials', { variant: data.variant });

    const validatedData = this.validate(data);
    if (!validatedData.success) {
      logger.error('TestimonialsRendererV3Perfect', 'render', '❌ Données invalides', validatedData.error);
      return {
        html: '<div class="error">Erreur de validation des données Testimonials</div>',
        css: '',
        js: ''
      };
    }

    const testimonials = validatedData.data;

    // Génération du HTML selon la variante
    let testimonialsHTML = '';
    
    switch (testimonials.variant) {
      case 'carousel-modern':
        testimonialsHTML = this.renderCarouselModern(testimonials);
        break;
      case 'grid-masonry':
        testimonialsHTML = this.renderGridMasonry(testimonials);
        break;
      case 'wall-infinite':
        testimonialsHTML = this.renderWallInfinite(testimonials);
        break;
      case 'cards-3d':
        testimonialsHTML = this.renderCards3D(testimonials);
        break;
      case 'timeline-animated':
        testimonialsHTML = this.renderTimelineAnimated(testimonials);
        break;
      case 'video-spotlight':
        testimonialsHTML = this.renderVideoSpotlight(testimonials);
        break;
      case 'social-proof':
        testimonialsHTML = this.renderSocialProof(testimonials);
        break;
      case 'interactive-map':
        testimonialsHTML = this.renderInteractiveMap(testimonials);
        break;
      default:
        testimonialsHTML = this.renderCarouselModern(testimonials);
    }

    // Stats
    const statsHTML = testimonials.showStats && testimonials.stats ? this.renderStats(testimonials.stats) : '';

    // Filters
    const filtersHTML = testimonials.filtering?.enabled ? this.renderFilters(testimonials) : '';

    // CTA
    const ctaHTML = testimonials.cta?.enabled ? `
      <div class="testimonials__cta">
        <a href="${testimonials.cta.link}" class="testimonials__cta-btn">
          ${testimonials.cta.text}
          <svg class="testimonials__cta-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
          </svg>
        </a>
      </div>
    ` : '';

    const html = `
      <section class="testimonials testimonials--${testimonials.variant}" 
               data-variant="${testimonials.variant}"
               data-autoplay="${testimonials.displayOptions?.autoplay || false}"
               data-autoplay-speed="${testimonials.displayOptions?.autoplaySpeed || 5000}"
               ${testimonials.id ? `id="${testimonials.id}"` : ''}>
        <div class="testimonials__container">
          ${testimonials.title || testimonials.subtitle ? `
            <div class="testimonials__header">
              ${testimonials.title ? `<h2 class="testimonials__title">${testimonials.title}</h2>` : ''}
              ${testimonials.subtitle ? `<p class="testimonials__subtitle">${testimonials.subtitle}</p>` : ''}
            </div>
          ` : ''}
          
          ${statsHTML}
          ${filtersHTML}
          ${testimonialsHTML}
          ${ctaHTML}
        </div>
      </section>
    `;

    return {
      html,
      css: this.getDefaultCSS(),
      js: this.getDefaultJS()
    };
  }

  private renderStats(stats: any): string {
    return `
      <div class="testimonials__stats">
        <div class="testimonials__stat">
          <div class="testimonials__stat-value">${stats.averageRating}</div>
          <div class="testimonials__stat-label">Note moyenne</div>
        </div>
        <div class="testimonials__stat">
          <div class="testimonials__stat-value">${stats.totalReviews}</div>
          <div class="testimonials__stat-label">Avis clients</div>
        </div>
        ${stats.verified ? `
          <div class="testimonials__stat">
            <div class="testimonials__stat-value">${stats.verified}</div>
            <div class="testimonials__stat-label">Avis vérifiés</div>
          </div>
        ` : ''}
      </div>
      
      ${stats.distribution ? `
        <div class="testimonials__distribution">
          ${[5,4,3,2,1].map(rating => `
            <div class="testimonials__distribution-row">
              <div class="testimonials__distribution-stars">
                ${Array(5).fill('').map((_, i) => `
                  <svg class="testimonial__star ${i >= rating ? 'testimonial__star--empty' : ''}" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                `).join('')}
              </div>
              <div class="testimonials__distribution-bar">
                <div class="testimonials__distribution-fill" data-width="${(stats.distribution[rating] / stats.totalReviews) * 100}"></div>
              </div>
              <div class="testimonials__distribution-count">${stats.distribution[rating]}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  private renderFilters(testimonials: TestimonialsData): string {
    const categories = testimonials.filtering?.categories || [{id: 'all', label: 'Tous'}];
    
    return `
      <div class="testimonials__filters">
        ${categories.map((cat: any, index: number) => `
          <button class="testimonials__filter ${index === 0 ? 'active' : ''}" data-category="${cat.id || cat}">
            ${cat.label || cat}
          </button>
        `).join('')}
        
        ${testimonials.filtering?.showSearch ? `
          <input type="search" 
                 class="testimonials__search" 
                 placeholder="Rechercher dans les avis..."
                 aria-label="Rechercher">
        ` : ''}
      </div>
    `;
  }

  private renderTestimonialCard(testimonial: any, options: any): string {
    const showRating = options?.showRating !== false;
    const showDate = options?.showDate !== false;
    const showSource = options?.showSource !== false;
    const showAvatar = options?.showAvatar !== false;
    const showCompany = options?.showCompany !== false;
    const showLocation = options?.showLocation;
    const showVerified = options?.showVerified !== false;
    const showLikes = options?.showLikes;
    const showHelpful = options?.showHelpful;

    return `
      <div class="testimonial__card" 
           ${testimonial.category ? `data-category="${testimonial.category}"` : ''}
           ${testimonial.featured ? 'data-featured="true"' : ''}>
        <div class="testimonial__header">
          ${showAvatar && testimonial.author.avatar ? `
            <img src="${testimonial.author.avatar.url}" 
                 alt="${testimonial.author.avatar.alt || testimonial.author.name}" 
                 class="testimonial__avatar">
          ` : ''}
          <div class="testimonial__author">
            <div class="testimonial__name">
              ${testimonial.author.name}
              ${showVerified && testimonial.author.verified ? `
                <span class="testimonial__verified" title="Vérifié">✓</span>
              ` : ''}
            </div>
            ${testimonial.author.role ? `
              <div class="testimonial__role">${testimonial.author.role}</div>
            ` : ''}
            ${showCompany && testimonial.author.company ? `
              <div class="testimonial__company">${testimonial.author.company}</div>
            ` : ''}
            ${showLocation && testimonial.author.location ? `
              <div class="testimonial__location">📍 ${testimonial.author.location}</div>
            ` : ''}
          </div>
        </div>
        
        ${showRating && testimonial.rating ? `
          <div class="testimonial__rating" data-rating="${testimonial.rating}">
            ${Array(5).fill('').map((_, i) => `
              <svg class="testimonial__star ${i >= testimonial.rating ? 'testimonial__star--empty' : ''}" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="testimonial__content">
          ${testimonial.content}
        </div>
        
        ${showHelpful && testimonial.helpful ? `
          <div class="testimonial__helpful">
            <span class="testimonial__helpful-label">Cette évaluation vous a-t-elle été utile ?</span>
            <button class="testimonial__helpful-btn" data-type="yes">
              👍 <span class="testimonial__helpful-count">${testimonial.helpful.yes || 0}</span>
            </button>
            <button class="testimonial__helpful-btn" data-type="no">
              👎 <span class="testimonial__helpful-count">${testimonial.helpful.no || 0}</span>
            </button>
          </div>
        ` : ''}
        
        <div class="testimonial__footer">
          ${showDate && testimonial.date ? `
            <div class="testimonial__date">${this.formatDate(testimonial.date)}</div>
          ` : ''}
          ${showSource && testimonial.source ? `
            <div class="testimonial__source">
              ${this.getSourceIcon(testimonial.source)}
              ${testimonial.source}
            </div>
          ` : ''}
          ${showLikes && testimonial.likes ? `
            <div class="testimonial__likes">
              ❤️ ${testimonial.likes}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderCarouselModern(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__wrapper">
        <div class="testimonials__track">
          ${testimonials.testimonials.map(t => 
            this.renderTestimonialCard(t, testimonials.displayOptions)
          ).join('')}
        </div>
        
        <div class="testimonials__nav">
          <button class="testimonials__nav-btn testimonials__nav-btn--prev" aria-label="Précédent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="testimonials__nav-btn testimonials__nav-btn--next" aria-label="Suivant">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="testimonials__dots">
          ${Array(Math.ceil(testimonials.testimonials.length / 3)).fill('').map((_, i) => `
            <button class="testimonials__dot ${i === 0 ? 'active' : ''}" aria-label="Aller à la page ${i + 1}"></button>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderGridMasonry(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__grid">
        ${testimonials.testimonials.map(t => 
          this.renderTestimonialCard(t, testimonials.displayOptions)
        ).join('')}
      </div>
    `;
  }

  private renderWallInfinite(testimonials: TestimonialsData): string {
    // Group testimonials into rows
    const rows = [];
    const itemsPerRow = 4;
    for (let i = 0; i < testimonials.testimonials.length; i += itemsPerRow) {
      rows.push(testimonials.testimonials.slice(i, i + itemsPerRow));
    }

    return `
      <div class="testimonials__wall">
        ${rows.map((row, index) => `
          <div class="testimonials__row">
            ${row.map(t => 
              this.renderTestimonialCard(t, testimonials.displayOptions)
            ).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderCards3D(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__grid">
        ${testimonials.testimonials.map(t => `
          <div class="testimonial__card">
            <div class="testimonial__front">
              ${this.renderTestimonialCard(t, testimonials.displayOptions)}
            </div>
            <div class="testimonial__back">
              <h3>Plus d'infos</h3>
              <p>${t.author.company || 'Client satisfait'}</p>
              ${t.tags ? `
                <div class="testimonial__tags">
                  ${t.tags.map(tag => `<span class="testimonial__tag">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderTimelineAnimated(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__timeline">
        ${testimonials.testimonials.map((t, index) => `
          <div class="testimonial__item">
            <div class="testimonial__date">${this.formatDate(t.date || '2024-01-01')}</div>
            <div class="testimonial__content">
              ${this.renderTestimonialCard(t, testimonials.displayOptions)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderVideoSpotlight(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__grid">
        ${testimonials.testimonials.map(t => `
          <div class="testimonial__card">
            ${t.videoUrl ? `
              <video class="testimonial__video" poster="${t.author.avatar?.url || '/images/video-poster.jpg'}">
                <source src="${t.videoUrl}" type="video/mp4">
              </video>
              <button class="testimonial__play" aria-label="Lire la vidéo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            ` : `
              <img src="${t.author.avatar?.url || '/images/testimonial-placeholder.jpg'}" 
                   alt="${t.author.name}" 
                   class="testimonial__video">
            `}
            <div class="testimonial__overlay">
              <h4>${t.author.name}</h4>
              <p>${t.author.role || ''} ${t.author.company ? `@ ${t.author.company}` : ''}</p>
              <p>"${t.content}"</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderSocialProof(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__platforms">
        <div class="platform__badge">
          <img src="/images/google-logo.svg" alt="Google" class="platform__logo">
          <div class="platform__info">
            <div class="platform__rating">
              4.9 ⭐⭐⭐⭐⭐
            </div>
            <div class="platform__count">1,234 avis</div>
          </div>
        </div>
        
        <div class="platform__badge">
          <img src="/images/trustpilot-logo.svg" alt="Trustpilot" class="platform__logo">
          <div class="platform__info">
            <div class="platform__rating">
              4.8 ⭐⭐⭐⭐⭐
            </div>
            <div class="platform__count">856 avis</div>
          </div>
        </div>
        
        <div class="platform__badge">
          <img src="/images/facebook-logo.svg" alt="Facebook" class="platform__logo">
          <div class="platform__info">
            <div class="platform__rating">
              4.9 ⭐⭐⭐⭐⭐
            </div>
            <div class="platform__count">432 avis</div>
          </div>
        </div>
      </div>
      
      <div class="testimonials__trust">
        <h3>Nos certifications et partenaires</h3>
        <div class="trust__logos">
          <img src="/images/cert1.svg" alt="Certification 1" class="trust__logo">
          <img src="/images/cert2.svg" alt="Certification 2" class="trust__logo">
          <img src="/images/cert3.svg" alt="Certification 3" class="trust__logo">
        </div>
      </div>
      
      <div class="testimonials__grid">
        ${testimonials.testimonials.map(t => 
          this.renderTestimonialCard(t, testimonials.displayOptions)
        ).join('')}
      </div>
    `;
  }

  private renderInteractiveMap(testimonials: TestimonialsData): string {
    return `
      <div class="testimonials__map-container">
        <div class="testimonials__map" id="testimonials-map">
          <!-- Map background -->
          <img src="/images/world-map.svg" alt="Carte du monde" style="width: 100%; height: 100%; object-fit: cover;">
          
          <!-- Markers -->
          ${testimonials.testimonials.map((t, index) => `
            <div class="testimonial__marker" 
                 style="top: ${this.getMapPosition(t.author.location).y}%; 
                        left: ${this.getMapPosition(t.author.location).x}%;">
              <div class="testimonial__popup">
                ${this.renderTestimonialCard(t, testimonials.displayOptions)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  }

  private getSourceIcon(source: string): string {
    const icons: Record<string, string> = {
      google: '<svg class="testimonial__source-icon" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
      facebook: '<svg class="testimonial__source-icon" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      trustpilot: '<svg class="testimonial__source-icon" viewBox="0 0 24 24"><path fill="#00B67A" d="M12 0l3.708 7.514L24 8.721l-6 5.845L19.416 24 12 19.514 4.584 24 6 14.566 0 8.721l8.292-1.207z"/></svg>',
      website: '<svg class="testimonial__source-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
      video: '<svg class="testimonial__source-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>'
    };
    
    return icons[source] || icons.website;
  }

  private getMapPosition(location?: string): { x: number, y: number } {
    // Simple mapping for demo - in real app, use geocoding
    const positions: Record<string, { x: number, y: number }> = {
      'Paris, France': { x: 50, y: 30 },
      'New York, USA': { x: 25, y: 35 },
      'London, UK': { x: 48, y: 28 },
      'Tokyo, Japan': { x: 85, y: 38 },
      'Sydney, Australia': { x: 90, y: 75 }
    };
    
    return positions[location || ''] || { x: 50, y: 50 };
  }
}
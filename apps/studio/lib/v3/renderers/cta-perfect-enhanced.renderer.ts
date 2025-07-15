/**
 * CTA Renderer V3 PERFECT ENHANCED - Version avec variantes de thème
 * Inclut les variantes : modern, minimal, bold, elegant
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { ctaDataSchema, ctaDefaults, type CTAData } from '../schemas/blocks/cta-perfect';
import { logger } from '../core/logger';

export class CTARendererV3PerfectEnhanced extends BaseRendererV3<CTAData> {
  type = 'cta-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('CTARendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer CTA V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<CTAData, CTAData> {
    return ctaDataSchema.safeParse(data);
  }

  getDefaultData(): CTAData {
    return ctaDefaults;
  }

  getBlockProps(): BlockProp[] {
    return super.getBlockProps();
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CTA V3 PERFECT ENHANCED - Styles avec variantes
   ======================================== */

.cta {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  font-family: var(--font-family-body);
}

.cta__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Styles de base communs */
.cta__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 1.5rem;
  font-family: var(--font-family-heading);
}

.cta__subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  margin-bottom: 2rem;
  line-height: var(--line-height-relaxed);
  font-family: var(--font-family-body);
}

.cta__description {
  font-size: var(--font-size-lg);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--line-height-relaxed);
  font-family: var(--font-family-body);
}

/* ========================================
   VARIANTE MODERN - Design épuré et contemporain
   ======================================== */
.cta--modern {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  color: white;
  position: relative;
}

.cta--modern::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ctaModernPattern 30s linear infinite;
  opacity: 0.3;
}

@keyframes ctaModernPattern {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-50px, -50px); }
}

.cta--modern .cta__buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta--modern .cta__button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  border-radius: var(--radius-full);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: var(--font-family-body);
}

.cta--modern .cta__button--primary {
  background: white;
  color: var(--color-primary);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
}

.cta--modern .cta__button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}

.cta--modern .cta__button--secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta--modern .cta__button--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Features grid */
.cta--modern .cta__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.cta--modern .cta__feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  opacity: 0.9;
}

.cta--modern .cta__feature-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

/* ========================================
   VARIANTE MINIMAL - Ultra épuré
   ======================================== */
.cta--minimal {
  background: var(--color-background);
  color: var(--color-text-primary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.cta--minimal .cta__content {
  max-width: 600px;
}

.cta--minimal .cta__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.cta--minimal .cta__subtitle {
  display: none;
}

.cta--minimal .cta__description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.cta--minimal .cta__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta--minimal .cta__button {
  padding: 0.75rem 2rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  font-family: var(--font-family-body);
}

.cta--minimal .cta__button--primary {
  background: var(--color-text-primary);
  color: var(--color-background);
}

.cta--minimal .cta__button--primary:hover {
  background: var(--color-text-secondary);
  transform: translateY(-1px);
}

.cta--minimal .cta__button--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.cta--minimal .cta__button--secondary:hover {
  border-color: var(--color-text-primary);
  background: var(--color-surface);
}

.cta--minimal .cta__features {
  display: none;
}

/* ========================================
   VARIANTE BOLD - Fort impact visuel
   ======================================== */
.cta--bold {
  background: var(--color-primary);
  color: white;
  position: relative;
  padding: 8rem 0;
}

.cta--bold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 50%, var(--color-secondary) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, var(--color-primary-dark) 0%, transparent 50%);
  opacity: 0.3;
}

.cta--bold::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
}

.cta--bold .cta__content {
  position: relative;
  z-index: 10;
}

.cta--bold .cta__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cta--bold .cta__subtitle {
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: var(--font-weight-light);
  opacity: 0.9;
}

.cta--bold .cta__description {
  font-size: var(--font-size-lg);
  opacity: 0.85;
}

.cta--bold .cta__buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.cta--bold .cta__button {
  padding: 1.25rem 3rem;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  border-radius: var(--radius-lg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  font-family: var(--font-family-body);
}

.cta--bold .cta__button--primary {
  background: white;
  color: var(--color-primary);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.cta--bold .cta__button--primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--color-primary-light);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.cta--bold .cta__button--primary:hover::before {
  width: 300px;
  height: 300px;
}

.cta--bold .cta__button--primary:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4);
  color: white;
}

.cta--bold .cta__button--secondary {
  background: transparent;
  color: white;
  border: 3px solid white;
}

.cta--bold .cta__button--secondary:hover {
  background: white;
  color: var(--color-primary);
  transform: translateY(-3px) scale(1.05);
}

.cta--bold .cta__features {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 4rem;
}

.cta--bold .cta__feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.cta--bold .cta__feature-icon {
  font-size: 2rem;
}

/* ========================================
   VARIANTE ELEGANT - Sophistiqué et raffiné
   ======================================== */
.cta--elegant {
  background: var(--color-surface);
  color: var(--color-text-primary);
  position: relative;
  overflow: visible;
}

.cta--elegant::before {
  content: '';
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%);
  opacity: 0.1;
  pointer-events: none;
}

.cta--elegant .cta__container {
  position: relative;
  z-index: 1;
}

.cta--elegant .cta__content {
  background: var(--color-background);
  padding: 4rem;
  border-radius: var(--radius-2xl);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-border);
  max-width: 900px;
}

.cta--elegant .cta__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--font-weight-light);
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.cta--elegant .cta__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.cta--elegant .cta__description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: 2.5rem;
}

.cta--elegant .cta__buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta--elegant .cta__button {
  padding: 1rem 2.5rem;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-family: var(--font-family-body);
  letter-spacing: 0.02em;
}

.cta--elegant .cta__button--primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  box-shadow: 0 10px 30px -10px var(--color-primary);
}

.cta--elegant .cta__button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px -10px var(--color-primary);
}

.cta--elegant .cta__button--secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  position: relative;
  overflow: hidden;
}

.cta--elegant .cta__button--secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  transition: left 0.4s;
  z-index: -1;
}

.cta--elegant .cta__button--secondary:hover {
  color: white;
  border-color: var(--color-primary);
}

.cta--elegant .cta__button--secondary:hover::before {
  left: 0;
}

.cta--elegant .cta__features {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.cta--elegant .cta__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.cta--elegant .cta__feature-icon {
  color: var(--color-primary);
  font-size: 1.25rem;
}

/* ========================================
   ANIMATIONS COMMUNES
   ======================================== */

/* Animation d'entrée */
.cta__content > * {
  opacity: 0;
  animation: ctaFadeUp 0.8s ease-out forwards;
}

.cta__title { animation-delay: 0.1s; }
.cta__subtitle { animation-delay: 0.2s; }
.cta__description { animation-delay: 0.3s; }
.cta__buttons { animation-delay: 0.4s; }
.cta__features { animation-delay: 0.5s; }

@keyframes ctaFadeUp {
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
@media (max-width: 768px) {
  .cta {
    padding: 4rem 0;
  }
  
  .cta__container {
    padding: 0 1rem;
  }
  
  .cta__buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .cta__button {
    width: 100%;
    justify-content: center;
  }
  
  .cta--bold {
    padding: 6rem 0;
  }
  
  .cta--elegant .cta__content {
    padding: 2.5rem 1.5rem;
  }
  
  .cta--elegant .cta__features {
    flex-direction: column;
    gap: 1.5rem;
  }
}

/* Mode sombre - adaptations */
@media (prefers-color-scheme: dark) {
  .cta--minimal {
    border-color: var(--color-border);
  }
  
  .cta--elegant::before {
    opacity: 0.05;
  }
}`;
  }

  getDefaultJS(): string {
    return `
// ========================================
// CTA V3 PERFECT ENHANCED - JavaScript
// ========================================

class CTAV3PerfectEnhanced {
  constructor(element) {
    this.element = element;
    this.variant = this.getVariant();
    this.buttons = element.querySelectorAll('.cta__button');
    this.form = element.querySelector('.cta__form');
    
    this.init();
  }
  
  getVariant() {
    const classes = this.element.classList;
    if (classes.contains('cta--modern')) return 'modern';
    if (classes.contains('cta--minimal')) return 'minimal';
    if (classes.contains('cta--bold')) return 'bold';
    if (classes.contains('cta--elegant')) return 'elegant';
    return 'modern'; // default
  }
  
  init() {
    console.log('🎯 Initialisation CTA V3 Perfect Enhanced:', this.variant);
    
    // Observer pour animations
    this.observeCTA();
    
    // Interactions boutons
    this.initButtons();
    
    // Form handling si présent
    if (this.form) {
      this.initForm();
    }
    
    // Effets spécifiques selon la variante
    this.initVariantEffects();
  }
  
  observeCTA() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cta--visible');
          
          // Animation des éléments selon la variante
          if (this.variant === 'bold') {
            this.animateBoldElements();
          } else if (this.variant === 'elegant') {
            this.animateElegantElements();
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(this.element);
  }
  
  initButtons() {
    this.buttons.forEach((button, index) => {
      // Hover effects
      button.addEventListener('mouseenter', () => {
        if (this.variant === 'modern' || this.variant === 'elegant') {
          button.style.transform = 'translateY(-2px)';
        } else if (this.variant === 'bold') {
          button.style.transform = 'scale(1.05)';
        }
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
      
      // Click effects
      button.addEventListener('click', (e) => {
        // Ripple effect pour modern et elegant
        if (this.variant === 'modern' || this.variant === 'elegant') {
          this.createRipple(e, button);
        }
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cta_click', {
            cta_variant: this.variant,
            button_text: button.textContent.trim(),
            button_type: button.classList.contains('cta__button--primary') ? 'primary' : 'secondary'
          });
        }
      });
      
      // Animation d'entrée décalée
      setTimeout(() => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          button.style.opacity = '1';
          button.style.transform = 'translateY(0)';
        }, 50);
      }, 400 + index * 100);
    });
  }
  
  createRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = \`
      position: absolute;
      width: \${size}px;
      height: \${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: translate(\${x}px, \${y}px) scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    \`;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  initForm() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const button = this.form.querySelector('.cta__button');
      const input = this.form.querySelector('.cta__input');
      const originalText = button.textContent;
      
      // Loading state
      button.textContent = 'Envoi...';
      button.disabled = true;
      input.disabled = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      button.textContent = '✓ Envoyé !';
      button.style.background = '#10b981';
      
      // Reset after delay
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
        input.disabled = false;
        input.value = '';
      }, 3000);
    });
  }
  
  initVariantEffects() {
    switch(this.variant) {
      case 'modern':
        this.initModernEffects();
        break;
      case 'bold':
        this.initBoldEffects();
        break;
      case 'elegant':
        this.initElegantEffects();
        break;
    }
  }
  
  initModernEffects() {
    // Parallax léger sur le pattern de fond
    let ticking = false;
    
    const updateParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          
          const pattern = this.element.querySelector('::before');
          if (pattern) {
            pattern.style.transform = \`translate(\${rate}px, \${rate}px)\`;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', updateParallax, { passive: true });
  }
  
  initBoldEffects() {
    // Effet de pulsation sur le titre
    const title = this.element.querySelector('.cta__title');
    if (title) {
      title.style.animation = 'pulse 2s ease-in-out infinite';
    }
    
    // Particules flottantes
    this.createFloatingParticles();
  }
  
  createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cta__particles';
    particlesContainer.style.cssText = \`
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    \`;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 10;
      const animationDelay = Math.random() * 20;
      
      particle.style.cssText = \`
        position: absolute;
        width: \${size}px;
        height: \${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: \${left}%;
        bottom: -20px;
        animation: floatUp \${animationDuration}s ease-in-out \${animationDelay}s infinite;
      \`;
      
      particlesContainer.appendChild(particle);
    }
    
    this.element.appendChild(particlesContainer);
  }
  
  initElegantEffects() {
    // Effet de lueur douce au survol
    const content = this.element.querySelector('.cta__content');
    if (content) {
      content.addEventListener('mouseenter', () => {
        content.style.boxShadow = '0 30px 80px -20px rgba(0, 0, 0, 0.2)';
      });
      
      content.addEventListener('mouseleave', () => {
        content.style.boxShadow = '';
      });
    }
    
    // Animation subtile des features
    const features = this.element.querySelectorAll('.cta__feature');
    features.forEach((feature, index) => {
      feature.style.opacity = '0';
      feature.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        feature.style.transition = 'all 0.6s ease-out';
        feature.style.opacity = '1';
        feature.style.transform = 'translateX(0)';
      }, 600 + index * 100);
    });
  }
  
  animateBoldElements() {
    // Animation spéciale pour les boutons bold
    this.buttons.forEach((button, index) => {
      setTimeout(() => {
        button.style.animation = 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, 500 + index * 150);
    });
  }
  
  animateElegantElements() {
    // Animation fade élégante
    const elements = this.element.querySelectorAll('.cta__content > *');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
}

// Styles additionnels
const style = document.createElement('style');
style.textContent = \`
  @keyframes ripple {
    to {
      transform: translate(var(--x), var(--y)) scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes floatUp {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-500px) translateX(50px) scale(1.2);
      opacity: 0.1;
    }
    100% {
      transform: translateY(-1000px) translateX(-50px) scale(0.8);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cta').forEach(element => {
    new CTAV3PerfectEnhanced(element);
  });
});`;
  }

  render(data: CTAData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('CTARendererV3PerfectEnhanced', 'render', 'Validation échouée', validation.error);
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
      const themeVariant = data.themeVariant || 'modern';
      logger.info('CTARendererV3PerfectEnhanced', 'render', 'Rendu CTA Enhanced avec variante:', themeVariant);

      // Générer le HTML selon la variante de thème
      const html = `
        <section class="cta cta--${themeVariant}" id="${data.id || 'cta'}">
          <div class="cta__container">
            <div class="cta__content">
              ${this.renderContent(validData)}
            </div>
          </div>
        </section>
      `;
      
      return {
        html,
        css: this.getDefaultCSS(),
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('CTARendererV3PerfectEnhanced', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderContent(data: CTAData): string {
    return `
      <h2 class="cta__title">${this.escapeHtml(data.title)}</h2>
      ${data.subtitle ? `<p class="cta__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      ${data.description ? `<p class="cta__description">${this.escapeHtml(data.description)}</p>` : ''}
      
      ${data.form ? this.renderForm(data) : this.renderButtons(data)}
      
      ${data.features && data.features.length > 0 ? this.renderFeatures(data.features) : ''}
    `;
  }

  private renderButtons(data: CTAData): string {
    if (!data.buttons || data.buttons.length === 0) return '';
    
    return `
      <div class="cta__buttons">
        ${data.buttons.map(button => `
          <a href="${button.link}" 
             class="cta__button cta__button--${button.style || 'primary'}"
             ${button.target ? `target="${button.target}"` : ''}>
            ${button.icon ? `<span class="cta__button-icon">${button.icon}</span>` : ''}
            <span>${this.escapeHtml(button.text)}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  private renderForm(data: CTAData): string {
    if (!data.form) return '';
    
    return `
      <form class="cta__form">
        <input type="${data.form.type || 'email'}" 
               placeholder="${this.escapeHtml(data.form.placeholder || 'Votre email')}" 
               class="cta__input"
               required>
        <button type="submit" class="cta__button cta__button--primary">
          ${this.escapeHtml(data.form.buttonText || 'Envoyer')}
        </button>
      </form>
    `;
  }

  private renderFeatures(features: any[]): string {
    return `
      <div class="cta__features">
        ${features.map(feature => `
          <div class="cta__feature">
            <div class="cta__feature-icon">${feature.icon || '✓'}</div>
            <span class="cta__feature-text">${this.escapeHtml(feature.text)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderError(message: string): string {
    return `
      <div class="cta-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur CTA:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const ctaRendererV3PerfectEnhanced = new CTARendererV3PerfectEnhanced();
/**
 * Pricing Renderer V3 PERFECT ENHANCED - Design magnifique avec variants de style
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { pricingDataSchema, pricingDefaults, type PricingData } from '../schemas/blocks/pricing';
import { logger } from '../core/logger';

export class PricingRendererV3PerfectEnhanced extends BaseRendererV3<PricingData> {
  type = 'pricing-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('PricingRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Pricing V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<PricingData, PricingData> {
    return pricingDataSchema.safeParse(data);
  }

  getDefaultData(): PricingData {
    return pricingDefaults;
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
      label: 'Style des tarifs',
      required: false,
      defaultValue: 'modern',
      description: 'Choisissez le style visuel des tarifs',
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
   PRICING V3 PERFECT ENHANCED - Styles avec thème
   ======================================== */

.pricing {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--background);
}

.pricing__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.pricing__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.pricing__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text);
}

.pricing__subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ========================================
   STYLES DE VARIANTES AVEC THÈME
   ======================================== */

/* Style Moderne */
.pricing[data-style-variant="modern"] {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary), transparent 95%) 0%, 
    var(--background) 50%);
}

.pricing[data-style-variant="modern"] .pricing__card {
  background: var(--surface);
  border-radius: 2rem;
  padding: 3rem 2rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  overflow: hidden;
}

.pricing[data-style-variant="modern"] .pricing__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transform: scaleX(0);
  transition: transform 0.3s;
}

.pricing[data-style-variant="modern"] .pricing__card:hover::before {
  transform: scaleX(1);
}

.pricing[data-style-variant="modern"] .pricing__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -10px color-mix(in srgb, var(--primary), transparent 70%);
}

.pricing[data-style-variant="modern"] .pricing__card--featured {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--background);
  transform: scale(1.05);
}

.pricing[data-style-variant="modern"] .pricing__price {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pricing[data-style-variant="modern"] .pricing__card--featured .pricing__price {
  background: var(--background);
  -webkit-background-clip: text;
  background-clip: text;
}

.pricing[data-style-variant="modern"] .pricing__button {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--background);
  border: none;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-family: var(--font-body);
  font-weight: 600;
  transition: all 0.3s;
}

.pricing[data-style-variant="modern"] .pricing__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--primary), transparent 50%);
}

/* Style Minimaliste */
.pricing[data-style-variant="minimal"] {
  background: var(--background);
  padding: 8rem 0;
}

.pricing[data-style-variant="minimal"] .pricing__header {
  margin-bottom: 6rem;
}

.pricing[data-style-variant="minimal"] .pricing__title {
  font-family: var(--font-body);
  font-weight: 300;
  letter-spacing: -0.02em;
}

.pricing[data-style-variant="minimal"] .pricing__card {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 4rem 2rem;
  transition: all 0.3s ease;
  text-align: center;
}

.pricing[data-style-variant="minimal"] .pricing__card:hover {
  border-color: var(--text);
  background: var(--surface);
}

.pricing[data-style-variant="minimal"] .pricing__name {
  font-family: var(--font-body);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.pricing[data-style-variant="minimal"] .pricing__price {
  font-family: var(--font-body);
  font-size: 4rem;
  font-weight: 200;
  color: var(--text);
  margin-bottom: 3rem;
}

.pricing[data-style-variant="minimal"] .pricing__divider {
  width: 60px;
  height: 1px;
  background: var(--border);
  margin: 2rem auto;
}

.pricing[data-style-variant="minimal"] .pricing__button {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--text);
  padding: 0.75rem 2rem;
  font-family: var(--font-body);
  font-weight: 400;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing[data-style-variant="minimal"] .pricing__button:hover {
  background: var(--text);
  color: var(--background);
}

/* Style Impact */
.pricing[data-style-variant="bold"] {
  background: var(--text);
  color: var(--background);
  padding: 8rem 0;
  position: relative;
}

.pricing[data-style-variant="bold"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      color-mix(in srgb, var(--background), transparent 95%) 20px,
      color-mix(in srgb, var(--background), transparent 95%) 40px
    );
  pointer-events: none;
}

.pricing[data-style-variant="bold"] .pricing__title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: var(--background);
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

.pricing[data-style-variant="bold"] .pricing__subtitle {
  color: var(--primary);
  font-weight: 600;
}

.pricing[data-style-variant="bold"] .pricing__card {
  background: var(--background);
  color: var(--text);
  border-radius: 0;
  padding: 3rem;
  position: relative;
  transform: rotate(-2deg);
  transition: all 0.3s;
  box-shadow: 10px 10px 0 var(--primary);
}

.pricing[data-style-variant="bold"] .pricing__card:nth-child(even) {
  transform: rotate(2deg);
  box-shadow: -10px 10px 0 var(--secondary);
}

.pricing[data-style-variant="bold"] .pricing__card:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 10;
}

.pricing[data-style-variant="bold"] .pricing__price {
  font-family: var(--font-heading);
  font-size: 5rem;
  font-weight: 900;
  color: var(--primary);
  text-transform: uppercase;
}

.pricing[data-style-variant="bold"] .pricing__button {
  background: var(--text);
  color: var(--background);
  border: none;
  padding: 1.5rem 3rem;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s;
}

.pricing[data-style-variant="bold"] .pricing__button:hover {
  background: var(--primary);
  transform: scale(1.1);
}

/* Style Élégant */
.pricing[data-style-variant="elegant"] {
  background: linear-gradient(180deg, var(--surface) 0%, var(--background) 100%);
  padding: 10rem 0;
  position: relative;
}

.pricing[data-style-variant="elegant"]::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    color-mix(in srgb, var(--accent), transparent 90%), 
    transparent);
  filter: blur(100px);
  pointer-events: none;
}

.pricing[data-style-variant="elegant"] .pricing__title {
  font-family: var(--font-heading);
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.02em;
}

.pricing[data-style-variant="elegant"] .pricing__subtitle {
  text-align: center;
  font-style: italic;
}

.pricing[data-style-variant="elegant"] .pricing__card {
  background: color-mix(in srgb, var(--surface), transparent 50%);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--border), transparent 50%);
  border-radius: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.pricing[data-style-variant="elegant"] .pricing__card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
  border-radius: 2rem;
  opacity: 0;
  transition: opacity 0.4s;
  z-index: -1;
}

.pricing[data-style-variant="elegant"] .pricing__card:hover::before {
  opacity: 1;
}

.pricing[data-style-variant="elegant"] .pricing__card:hover {
  background: var(--surface);
  transform: translateY(-4px);
}

.pricing[data-style-variant="elegant"] .pricing__price {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 300;
  color: var(--text);
  margin-bottom: 2rem;
}

.pricing[data-style-variant="elegant"] .pricing__button {
  background: transparent;
  color: var(--text);
  border: 2px solid var(--primary);
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-family: var(--font-body);
  font-weight: 500;
  transition: all 0.3s;
}

.pricing[data-style-variant="elegant"] .pricing__button:hover {
  background: var(--primary);
  color: var(--background);
  border-color: var(--primary);
}

/* ========================================
   ÉLÉMENTS COMMUNS AVEC THÈME
   ======================================== */

/* Toggle période avec thème */
.pricing__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0 3rem;
}

.pricing__toggle-label {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.pricing__toggle-label.active {
  color: var(--text);
}

.pricing__toggle-switch {
  position: relative;
  width: 60px;
  height: 32px;
  background: var(--border);
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s;
}

.pricing__toggle-switch.active {
  background: var(--primary);
}

.pricing__toggle-slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: var(--background);
  border-radius: 50%;
  transition: transform 0.3s;
}

.pricing__toggle-switch.active .pricing__toggle-slider {
  transform: translateX(28px);
}

/* Badge économie avec thème */
.pricing__save {
  display: inline-block;
  background: var(--accent);
  color: var(--background);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  font-family: var(--font-body);
}

/* Nom du plan avec thème */
.pricing__name {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

/* Description avec thème */
.pricing__description {
  font-family: var(--font-body);
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

/* Prix avec thème */
.pricing__price-wrapper {
  margin-bottom: 2rem;
}

.pricing__currency {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.pricing__period {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-secondary);
}

/* Features avec thème */
.pricing__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.pricing__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-family: var(--font-body);
  color: var(--text);
}

.pricing__feature-icon {
  width: 20px;
  height: 20px;
  color: var(--primary);
  flex-shrink: 0;
}

.pricing__feature--disabled {
  opacity: 0.5;
  text-decoration: line-through;
}

.pricing__feature--disabled .pricing__feature-icon {
  color: var(--text-secondary);
}

/* Badge featured avec thème */
.pricing__badge {
  position: absolute;
  top: -0.5rem;
  right: 2rem;
  background: var(--accent);
  color: var(--background);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
}

/* Garantie avec thème */
.pricing__guarantee {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
}

.pricing__guarantee-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.pricing__guarantee-text {
  font-family: var(--font-body);
  color: var(--text-secondary);
}

/* FAQ avec thème */
.pricing__faq {
  margin-top: 4rem;
}

.pricing__faq-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin-bottom: 2rem;
}

.pricing__faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
}

.pricing__faq-question {
  padding: 1.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pricing__faq-answer {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s, padding 0.3s;
  font-family: var(--font-body);
  color: var(--text-secondary);
}

.pricing__faq-item.active .pricing__faq-answer {
  max-height: 200px;
  padding: 0 1.5rem 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .pricing[data-style-variant="bold"] .pricing__card {
    transform: none;
    box-shadow: 0 10px 0 var(--primary);
  }
  
  .pricing[data-style-variant="bold"] .pricing__card:nth-child(even) {
    transform: none;
    box-shadow: 0 10px 0 var(--secondary);
  }
}

/* Animations */
.pricing__card {
  opacity: 0;
  animation: pricingFadeIn 0.6s ease-out forwards;
}

.pricing__card:nth-child(1) { animation-delay: 0.1s; }
.pricing__card:nth-child(2) { animation-delay: 0.2s; }
.pricing__card:nth-child(3) { animation-delay: 0.3s; }
.pricing__card:nth-child(4) { animation-delay: 0.4s; }

@keyframes pricingFadeIn {
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
// Pricing V3 Perfect Enhanced - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation globale
  function initPricing() {
    const pricingSections = document.querySelectorAll('.pricing');
    
    pricingSections.forEach(section => {
      // Toggle période
      initPeriodToggle(section);
      
      // FAQ accordéon
      initFAQ(section);
      
      // Animations au scroll
      observePricing(section);
      
      // Layout spécifique
      const layout = Array.from(section.classList)
        .find(c => c.startsWith('pricing--'))
        ?.replace('pricing--', '');
      
      switch(layout) {
        case 'cards-slider':
          initCardsSlider(section);
          break;
        case 'comparison-table':
          initComparisonTable(section);
          break;
        case 'toggle-view':
          initToggleView(section);
          break;
      }
    });
  }
  
  // Toggle mensuel/annuel
  function initPeriodToggle(section) {
    const toggle = section.querySelector('.pricing__toggle-switch');
    const monthlyLabel = section.querySelector('[data-period="monthly"]');
    const yearlyLabel = section.querySelector('[data-period="yearly"]');
    const cards = section.querySelectorAll('.pricing__card');
    
    if (!toggle) return;
    
    let isYearly = false;
    
    toggle.addEventListener('click', () => {
      isYearly = !isYearly;
      toggle.classList.toggle('active', isYearly);
      
      // Update labels
      monthlyLabel?.classList.toggle('active', !isYearly);
      yearlyLabel?.classList.toggle('active', isYearly);
      
      // Update prices
      cards.forEach(card => {
        const monthlyPrice = card.querySelector('[data-price="monthly"]');
        const yearlyPrice = card.querySelector('[data-price="yearly"]');
        
        if (monthlyPrice && yearlyPrice) {
          monthlyPrice.style.display = isYearly ? 'none' : 'block';
          yearlyPrice.style.display = isYearly ? 'block' : 'none';
        }
        
        // Update price value with animation
        const priceElement = card.querySelector('.pricing__price-value');
        if (priceElement) {
          const newPrice = isYearly 
            ? priceElement.dataset.yearlyPrice 
            : priceElement.dataset.monthlyPrice;
          
          if (newPrice) {
            animatePrice(priceElement, newPrice);
          }
        }
      });
      
      // Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pricing_toggle', {
          period: isYearly ? 'yearly' : 'monthly'
        });
      }
    });
  }
  
  // Animation prix
  function animatePrice(element, newPrice) {
    const oldPrice = parseInt(element.textContent);
    const targetPrice = parseInt(newPrice);
    const duration = 500;
    const start = Date.now();
    
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const current = Math.floor(oldPrice + (targetPrice - oldPrice) * progress);
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
  
  // FAQ Accordéon
  function initFAQ(section) {
    const faqItems = section.querySelectorAll('.pricing__faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.pricing__faq-question');
      const icon = item.querySelector('.pricing__faq-icon');
      
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fermer tous les autres
        faqItems.forEach(i => {
          i.classList.remove('active');
          const otherIcon = i.querySelector('.pricing__faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
  
  // Cards Slider
  function initCardsSlider(section) {
    const slider = section.querySelector('.pricing__slider');
    const track = section.querySelector('.pricing__track');
    const cards = section.querySelectorAll('.pricing__card');
    const prevBtn = section.querySelector('.pricing__nav-prev');
    const nextBtn = section.querySelector('.pricing__nav-next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // gap
    
    function updateSlider() {
      track.style.transform = \`translateX(-\${currentIndex * cardWidth}px)\`;
      
      // Update nav buttons
      prevBtn?.classList.toggle('disabled', currentIndex === 0);
      nextBtn?.classList.toggle('disabled', currentIndex === cards.length - 1);
    }
    
    prevBtn?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
    
    nextBtn?.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
    
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
  
  // Comparison Table
  function initComparisonTable(section) {
    const table = section.querySelector('.pricing__comparison');
    const headers = table?.querySelectorAll('th');
    const highlight = section.querySelector('.pricing__highlight-column');
    
    headers?.forEach((header, index) => {
      header.addEventListener('mouseenter', () => {
        // Highlight column
        const cells = table.querySelectorAll(\`td:nth-child(\${index + 1}), th:nth-child(\${index + 1})\`);
        cells.forEach(cell => cell.classList.add('highlighted'));
        
        if (highlight) {
          const rect = header.getBoundingClientRect();
          const tableRect = table.getBoundingClientRect();
          highlight.style.left = \`\${rect.left - tableRect.left}px\`;
          highlight.style.width = \`\${rect.width}px\`;
          highlight.style.opacity = '1';
        }
      });
      
      header.addEventListener('mouseleave', () => {
        const cells = table.querySelectorAll('.highlighted');
        cells.forEach(cell => cell.classList.remove('highlighted'));
        
        if (highlight) {
          highlight.style.opacity = '0';
        }
      });
    });
    
    // Feature tooltips
    const features = table?.querySelectorAll('[data-tooltip]');
    
    features?.forEach(feature => {
      feature.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'pricing__tooltip';
        tooltip.textContent = feature.dataset.tooltip;
        
        document.body.appendChild(tooltip);
        
        const rect = feature.getBoundingClientRect();
        tooltip.style.top = \`\${rect.top - tooltip.offsetHeight - 10}px\`;
        tooltip.style.left = \`\${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px\`;
        
        setTimeout(() => {
          tooltip.classList.add('active');
        }, 10);
      });
      
      feature.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.pricing__tooltip');
        if (tooltip) {
          tooltip.classList.remove('active');
          setTimeout(() => {
            tooltip.remove();
          }, 300);
        }
      });
    });
  }
  
  // Toggle View
  function initToggleView(section) {
    const viewButtons = section.querySelectorAll('.pricing__view-btn');
    const views = section.querySelectorAll('.pricing__view');
    
    viewButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Update buttons
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update views
        views.forEach(v => v.classList.remove('active'));
        if (views[index]) {
          views[index].classList.add('active');
        }
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'pricing_view_change', {
            view: btn.dataset.view
          });
        }
      });
    });
  }
  
  // Observer pour animations
  function observePricing(section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pricing--visible');
          
          // Animer les prix
          animatePrices(entry.target);
          
          // Animer les features
          animateFeatures(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section);
  }
  
  // Animer les prix au scroll
  function animatePrices(section) {
    const prices = section.querySelectorAll('.pricing__price-value');
    
    prices.forEach((price, index) => {
      setTimeout(() => {
        const value = parseInt(price.textContent);
        if (!isNaN(value)) {
          price.textContent = '0';
          animatePrice(price, value);
        }
      }, index * 100);
    });
  }
  
  // Animer les features
  function animateFeatures(section) {
    const features = section.querySelectorAll('.pricing__feature');
    
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          feature.style.transition = 'all 0.4s ease-out';
          feature.style.opacity = '1';
          feature.style.transform = 'translateX(0)';
        }, 50);
      }, index * 50);
    });
  }
  
  // Calculateur d'économies
  function initSavingsCalculator(section) {
    const calculator = section.querySelector('.pricing__calculator');
    if (!calculator) return;
    
    const slider = calculator.querySelector('.pricing__calculator-slider');
    const output = calculator.querySelector('.pricing__calculator-output');
    const savings = calculator.querySelector('.pricing__calculator-savings');
    
    slider?.addEventListener('input', () => {
      const users = parseInt(slider.value);
      const monthlyPrice = 99; // Prix de base
      const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% de réduction
      
      const monthlyCost = users * monthlyPrice;
      const yearlyCost = users * yearlyPrice;
      const savedAmount = (monthlyCost * 12) - yearlyCost;
      
      output.textContent = \`\${users} utilisateurs\`;
      savings.textContent = \`Économisez \${Math.round(savedAmount)}€/an\`;
    });
  }
  
  // CTA flottant
  function initFloatingCTA(section) {
    const cta = section.querySelector('.pricing__floating-cta');
    if (!cta) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          cta.classList.add('visible');
        } else {
          cta.classList.remove('visible');
        }
      });
    }, { threshold: 0 });
    
    const cards = section.querySelector('.pricing__grid');
    if (cards) observer.observe(cards);
    
    // Smooth scroll to pricing
    cta?.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPricing();
      
      // Fonctionnalités supplémentaires
      document.querySelectorAll('.pricing').forEach(section => {
        initSavingsCalculator(section);
        initFloatingCTA(section);
      });
    });
  } else {
    initPricing();
    
    document.querySelectorAll('.pricing').forEach(section => {
      initSavingsCalculator(section);
      initFloatingCTA(section);
    });
  }
  
  // Export pour usage externe
  window.PricingPerfect = {
    init: initPricing,
    animatePrice: animatePrice
  };
})();
    `;
  }

  render(data: PricingData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('PricingRendererV3PerfectEnhanced', 'render', 'Validation échouée', validation.error);
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
      logger.info('PricingRendererV3PerfectEnhanced', 'render', 'Rendu Pricing avec layout:', validData.layout);

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
      logger.error('PricingRendererV3PerfectEnhanced', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderLayout(data: PricingData, styleVariant: string): string {
    let content = '';
    
    switch(data.layout) {
      case 'cards-classic':
        content = this.renderCardsClassic(data);
        break;
      case 'cards-modern':
        content = this.renderCardsModern(data);
        break;
      case 'cards-slider':
        content = this.renderCardsSlider(data);
        break;
      case 'comparison-table':
        content = this.renderComparisonTable(data);
        break;
      case 'toggle-view':
        content = this.renderToggleView(data);
        break;
      case 'single-plan':
        content = this.renderSinglePlan(data);
        break;
      case 'cards-minimal':
        content = this.renderCardsMinimal(data);
        break;
      case 'cards-gradient':
        content = this.renderCardsGradient(data);
        break;
      default:
        content = this.renderCardsModern(data);
    }

    return `
      <section class="pricing pricing--${data.layout}" data-style-variant="${styleVariant}" id="${data.id || 'pricing'}">
        <div class="pricing__container">
          ${this.renderHeader(data)}
          ${this.renderToggle(data)}
          ${content}
          ${this.renderGuarantee(data)}
          ${this.renderFAQ(data)}
        </div>
      </section>
    `;
  }

  private renderHeader(data: PricingData): string {
    if (!data.title && !data.subtitle) return '';
    
    return `
      <header class="pricing__header">
        ${data.title ? `<h2 class="pricing__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="pricing__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      </header>
    `;
  }

  private renderToggle(data: PricingData): string {
    if (!data.toggle?.enabled) return '';
    
    return `
      <div class="pricing__toggle">
        <span class="pricing__toggle-label active" data-period="monthly">
          ${this.escapeHtml(data.toggle.monthlyLabel || 'Mensuel')}
        </span>
        <div class="pricing__toggle-switch">
          <div class="pricing__toggle-slider"></div>
        </div>
        <span class="pricing__toggle-label" data-period="yearly">
          ${this.escapeHtml(data.toggle.yearlyLabel || 'Annuel')}
          ${data.toggle.yearlySave ? `<span class="pricing__save">${this.escapeHtml(data.toggle.yearlySave)}</span>` : ''}
        </span>
      </div>
    `;
  }

  private renderGuarantee(data: PricingData): string {
    if (!data.guarantee) return '';
    
    return `
      <div class="pricing__guarantee">
        ${data.guarantee.icon ? `<div class="pricing__guarantee-icon">${data.guarantee.icon}</div>` : ''}
        <h3 class="pricing__guarantee-title">${this.escapeHtml(data.guarantee.title)}</h3>
        <p class="pricing__guarantee-text">${this.escapeHtml(data.guarantee.text)}</p>
      </div>
    `;
  }

  private renderFAQ(data: PricingData): string {
    if (!data.faq || data.faq.length === 0) return '';
    
    return `
      <div class="pricing__faq">
        <h3 class="pricing__faq-title">Questions fréquentes</h3>
        <div class="pricing__faq-list">
          ${data.faq.map((item, index) => `
            <div class="pricing__faq-item">
              <button class="pricing__faq-question">
                ${this.escapeHtml(item.question)}
                <span class="pricing__faq-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </span>
              </button>
              <div class="pricing__faq-answer">
                <p>${item.answer}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderCardsClassic(data: PricingData): string {
    return this.renderCards(data, 'classic');
  }

  private renderCardsModern(data: PricingData): string {
    return this.renderCards(data, 'modern');
  }

  private renderCardsMinimal(data: PricingData): string {
    return this.renderCards(data, 'minimal');
  }

  private renderCardsGradient(data: PricingData): string {
    return this.renderCards(data, 'gradient');
  }

  private renderCards(data: PricingData, style: string): string {
    return `
      <div class="pricing__grid pricing__grid--${style}">
        ${data.plans.map(plan => this.renderPlanCard(plan, data)).join('')}
      </div>
    `;
  }

  private renderCardsSlider(data: PricingData): string {
    return `
      <div class="pricing__slider">
        <button class="pricing__nav pricing__nav-prev">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>
        <div class="pricing__track">
          ${data.plans.map(plan => this.renderPlanCard(plan, data)).join('')}
        </div>
        <button class="pricing__nav pricing__nav-next">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    `;
  }

  private renderComparisonTable(data: PricingData): string {
    const allFeatures = [...new Set(data.plans.flatMap(plan => 
      plan.features.map(f => typeof f === 'string' ? f : f.text)
    ))];
    
    return `
      <div class="pricing__comparison">
        <div class="pricing__highlight-column"></div>
        <table class="pricing__table">
          <thead>
            <tr>
              <th>Fonctionnalités</th>
              ${data.plans.map(plan => `
                <th>
                  <div class="pricing__plan-header">
                    <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
                    <div class="pricing__price">
                      <span class="pricing__currency">${plan.currency || '€'}</span>
                      <span class="pricing__price-value">${plan.price}</span>
                      <span class="pricing__period">/${plan.period || 'mois'}</span>
                    </div>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${allFeatures.map(feature => `
              <tr>
                <td>${this.escapeHtml(feature)}</td>
                ${data.plans.map(plan => {
                  const hasFeature = plan.features.some(f => 
                    (typeof f === 'string' ? f : f.text) === feature
                  );
                  return `
                    <td>
                      ${hasFeature ? `
                        <svg viewBox="0 0 24 24" width="20" height="20" class="pricing__check">
                          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      ` : `
                        <svg viewBox="0 0 24 24" width="20" height="20" class="pricing__cross">
                          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      `}
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
            <tr>
              <td></td>
              ${data.plans.map(plan => `
                <td>
                  <button class="pricing__button pricing__button--${plan.buttonStyle || 'primary'}">
                    ${this.escapeHtml(plan.buttonText || 'Commencer')}
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  private renderToggleView(data: PricingData): string {
    return `
      <div class="pricing__toggle-view">
        <div class="pricing__view-buttons">
          <button class="pricing__view-btn active" data-view="cards">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/>
            </svg>
            Cartes
          </button>
          <button class="pricing__view-btn" data-view="table">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M3 3h18v6H3zm0 8h18v6H3zm0 8h18v2H3z"/>
            </svg>
            Tableau
          </button>
        </div>
        
        <div class="pricing__view pricing__view--cards active">
          ${this.renderCards(data, 'modern')}
        </div>
        
        <div class="pricing__view pricing__view--table">
          ${this.renderComparisonTable(data)}
        </div>
      </div>
    `;
  }

  private renderSinglePlan(data: PricingData): string {
    const plan = data.plans[0];
    if (!plan) return '';
    
    return `
      <div class="pricing__single">
        <div class="pricing__single-card">
          ${this.renderPlanCard(plan, data)}
        </div>
      </div>
    `;
  }

  private renderPlanCard(plan: any, data: PricingData): string {
    const monthlyPrice = plan.price;
    const yearlyPrice = plan.yearlyPrice || Math.floor(plan.price * 12 * 0.8);
    
    return `
      <div class="pricing__card ${plan.featured ? 'pricing__card--featured' : ''}">
        ${plan.badge ? `<span class="pricing__badge">${this.escapeHtml(plan.badge)}</span>` : ''}
        
        <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
        ${plan.description ? `<p class="pricing__description">${this.escapeHtml(plan.description)}</p>` : ''}
        
        <div class="pricing__price-wrapper">
          <div class="pricing__price" data-price="monthly">
            <span class="pricing__currency">${plan.currency || '€'}</span>
            <span class="pricing__price-value" data-monthly-price="${monthlyPrice}" data-yearly-price="${yearlyPrice}">
              ${monthlyPrice}
            </span>
            <span class="pricing__period">/${plan.period || 'mois'}</span>
          </div>
          
          <div class="pricing__price" data-price="yearly" style="display: none;">
            <span class="pricing__currency">${plan.currency || '€'}</span>
            <span class="pricing__price-value">${yearlyPrice}</span>
            <span class="pricing__period">/an</span>
          </div>
        </div>
        
        <ul class="pricing__features">
          ${plan.features.map(feature => this.renderFeature(feature)).join('')}
        </ul>
        
        <button class="pricing__button pricing__button--${plan.buttonStyle || 'primary'}">
          ${this.escapeHtml(plan.buttonText || 'Commencer')}
        </button>
        
        ${plan.note ? `<p class="pricing__note">${this.escapeHtml(plan.note)}</p>` : ''}
      </div>
    `;
  }

  private renderFeature(feature: string | any): string {
    const isString = typeof feature === 'string';
    const text = isString ? feature : feature.text;
    const included = isString ? true : feature.included !== false;
    
    return `
      <li class="pricing__feature ${!included ? 'pricing__feature--disabled' : ''}">
        <svg class="pricing__feature-icon" viewBox="0 0 24 24" width="20" height="20">
          ${included ? `
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          ` : `
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          `}
        </svg>
        <span>${this.escapeHtml(text)}</span>
      </li>
    `;
  }

  private generateCustomCSS(data: PricingData): string {
    let css = '\n/* Custom Pricing Styles */\n';
    
    // Couleurs personnalisées
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.pricing {
        --pricing-primary: ${colors.primary || '#667eea'};
        --pricing-secondary: ${colors.secondary || '#764ba2'};
        --pricing-accent: ${colors.accent || '#f093fb'};
        --pricing-text: ${colors.text || '#4b5563'};
        --pricing-bg: ${colors.background || '#ffffff'};
      }\n`;
    }

    // Spacing
    if (data.styles?.spacing) {
      const spacing = data.styles.spacing;
      css += `.pricing {
        ${spacing.padding ? `padding: ${spacing.padding};` : ''}
      }
      .pricing__grid {
        ${spacing.gap ? `gap: ${spacing.gap};` : ''}
      }\n`;
    }

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="pricing-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur Pricing:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const pricingRendererV3PerfectEnhanced = new PricingRendererV3PerfectEnhanced();
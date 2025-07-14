/**
 * Pricing Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { pricingDataSchema, pricingDefaults, type PricingData } from '../schemas/blocks/pricing';
import { logger } from '../core/logger';

export class PricingRendererV3Perfect extends BaseRendererV3<PricingData> {
  type = 'pricing-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('PricingRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Pricing V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<PricingData, PricingData> {
    return pricingDataSchema.safeParse(data);
  }

  getDefaultData(): PricingData {
    return pricingDefaults;
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
   PRICING V3 PERFECT - Styles magnifiques
   ======================================== */

.pricing {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--pricing-bg, #ffffff);
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1f2937;
}

.pricing__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
}

/* Toggle période */
.pricing__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0 3rem;
}

.pricing__toggle-label {
  font-weight: 600;
  color: #4b5563;
  transition: color 0.3s;
}

.pricing__toggle-label.active {
  color: #1f2937;
}

.pricing__toggle-switch {
  position: relative;
  width: 60px;
  height: 32px;
  background: #e5e7eb;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s;
}

.pricing__toggle-switch.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.pricing__toggle-slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.pricing__toggle-switch.active .pricing__toggle-slider {
  transform: translateX(28px);
}

.pricing__badge {
  display: inline-block;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Cards Modern - Cartes élégantes avec hover */
.pricing--cards-modern .pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  align-items: stretch;
}

.pricing--cards-modern .pricing__card {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.pricing--cards-modern .pricing__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

.pricing--cards-modern .pricing__card.featured {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.05);
  z-index: 10;
}

.pricing--cards-modern .pricing__card.featured .pricing__name,
.pricing--cards-modern .pricing__card.featured .pricing__price,
.pricing--cards-modern .pricing__card.featured .pricing__description,
.pricing--cards-modern .pricing__card.featured .pricing__feature {
  color: white;
}

.pricing--cards-modern .pricing__popular {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 15px -3px rgba(245, 158, 11, 0.3);
}

.pricing--cards-modern .pricing__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.pricing--cards-modern .pricing__description {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.pricing--cards-modern .pricing__price-wrapper {
  margin-bottom: 2rem;
}

.pricing--cards-modern .pricing__price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-weight: 800;
  color: #1f2937;
}

.pricing--cards-modern .pricing__currency {
  font-size: 1.5rem;
}

.pricing--cards-modern .pricing__amount {
  font-size: 3rem;
  line-height: 1;
}

.pricing--cards-modern .pricing__period {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
}

.pricing--cards-modern .pricing__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
}

.pricing--cards-modern .pricing__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #4b5563;
}

.pricing--cards-modern .pricing__feature-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.pricing--cards-modern .pricing__card.featured .pricing__feature-icon {
  background: rgba(255, 255, 255, 0.2);
}

.pricing--cards-modern .pricing__cta {
  display: block;
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.pricing--cards-modern .pricing__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.4);
}

.pricing--cards-modern .pricing__card.featured .pricing__cta {
  background: white;
  color: #667eea;
}

/* 2. Table Comparison - Tableau comparatif */
.pricing--table-comparison {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.pricing--table-comparison .pricing__table {
  width: 100%;
  min-width: 800px;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.pricing--table-comparison th,
.pricing--table-comparison td {
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.pricing--table-comparison thead {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.pricing--table-comparison th {
  font-weight: 600;
  white-space: nowrap;
}

.pricing--table-comparison .pricing__plan-header {
  text-align: center;
  vertical-align: top;
}

.pricing--table-comparison .pricing__plan-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.pricing--table-comparison .pricing__plan-price {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.pricing--table-comparison .pricing__plan-cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: white;
  color: #667eea;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.pricing--table-comparison .pricing__plan-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.2);
}

.pricing--table-comparison tbody tr:hover {
  background: #f9fafb;
}

.pricing--table-comparison .pricing__feature-name {
  font-weight: 600;
  color: #1f2937;
}

.pricing--table-comparison .pricing__check {
  text-align: center;
  color: #10b981;
  font-size: 1.25rem;
}

.pricing--table-comparison .pricing__cross {
  text-align: center;
  color: #ef4444;
  font-size: 1.25rem;
}

/* 3. Slider Interactive - Curseur de prix */
.pricing--slider-interactive .pricing__calculator {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.pricing--slider-interactive .pricing__slider-wrapper {
  margin-bottom: 3rem;
}

.pricing--slider-interactive .pricing__slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.pricing--slider-interactive .pricing__slider-value {
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
}

.pricing--slider-interactive .pricing__slider {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 9999px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.pricing--slider-interactive .pricing__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 15px -3px rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
}

.pricing--slider-interactive .pricing__slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.pricing--slider-interactive .pricing__result {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 1rem;
}

.pricing--slider-interactive .pricing__total {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.pricing--slider-interactive .pricing__breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.pricing--slider-interactive .pricing__breakdown-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
}

.pricing--slider-interactive .pricing__breakdown-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.pricing--slider-interactive .pricing__breakdown-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

/* 4. Cards Flip - Cartes retournables */
.pricing--cards-flip .pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  perspective: 1000px;
}

.pricing--cards-flip .pricing__card {
  position: relative;
  height: 500px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.pricing--cards-flip .pricing__card:hover {
  transform: rotateY(180deg);
}

.pricing--cards-flip .pricing__card-front,
.pricing--cards-flip .pricing__card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.pricing--cards-flip .pricing__card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.pricing--cards-flip .pricing__flip-hint {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pricing--cards-flip .pricing__card-back .pricing__flip-hint {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* 5. Timeline Pricing - Prix chronologique */
.pricing--timeline .pricing__timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing--timeline .pricing__timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2, #f093fb);
  opacity: 0.3;
}

.pricing--timeline .pricing__item {
  position: relative;
  padding: 2rem 0;
  width: 50%;
}

.pricing--timeline .pricing__item:nth-child(odd) {
  padding-right: 3rem;
  text-align: right;
}

.pricing--timeline .pricing__item:nth-child(even) {
  margin-left: 50%;
  padding-left: 3rem;
}

.pricing--timeline .pricing__item::before {
  content: '';
  position: absolute;
  top: 2.5rem;
  width: 20px;
  height: 20px;
  background: white;
  border: 4px solid #667eea;
  border-radius: 50%;
  z-index: 10;
}

.pricing--timeline .pricing__item:nth-child(odd)::before {
  right: -10px;
}

.pricing--timeline .pricing__item:nth-child(even)::before {
  left: -10px;
}

.pricing--timeline .pricing__content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.pricing--timeline .pricing__content:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
}

/* 6. Grid Bento - Style Bento Box */
.pricing--grid-bento .pricing__bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1.5rem;
}

.pricing--grid-bento .pricing__box {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.pricing--grid-bento .pricing__box:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.15);
}

.pricing--grid-bento .pricing__box--large {
  grid-column: span 2;
  grid-row: span 2;
}

.pricing--grid-bento .pricing__box--wide {
  grid-column: span 2;
}

.pricing--grid-bento .pricing__box--tall {
  grid-row: span 2;
}

.pricing--grid-bento .pricing__box--featured {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.pricing--grid-bento .pricing__box--featured .pricing__box-title,
.pricing--grid-bento .pricing__box--featured .pricing__box-price,
.pricing--grid-bento .pricing__box--featured .pricing__box-description {
  color: white;
}

.pricing--grid-bento .pricing__box::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.pricing--grid-bento .pricing__box:hover::before {
  opacity: 1;
}

/* 7. Gradient Wave - Vagues gradient */
.pricing--gradient-wave .pricing__wave-container {
  position: relative;
  padding: 4rem 0;
}

.pricing--gradient-wave .pricing__wave {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  opacity: 0.1;
  overflow: hidden;
}

.pricing--gradient-wave .pricing__wave::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, white 30%, transparent 70%);
  animation: wave 20s linear infinite;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pricing--gradient-wave .pricing__cards {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.pricing--gradient-wave .pricing__card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s;
}

.pricing--gradient-wave .pricing__card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2);
}

/* 8. Neumorphic - Style neumorphique */
.pricing--neumorphic {
  background: #e0e5ec;
}

.pricing--neumorphic .pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
}

.pricing--neumorphic .pricing__card {
  background: #e0e5ec;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 
    20px 20px 60px #bec3c9,
    -20px -20px 60px #ffffff;
  transition: all 0.3s;
}

.pricing--neumorphic .pricing__card:hover {
  box-shadow: 
    25px 25px 75px #bec3c9,
    -25px -25px 75px #ffffff;
}

.pricing--neumorphic .pricing__card.featured {
  box-shadow: 
    inset 20px 20px 60px #bec3c9,
    inset -20px -20px 60px #ffffff;
}

.pricing--neumorphic .pricing__button {
  background: #e0e5ec;
  border: none;
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-weight: 600;
  color: #667eea;
  box-shadow: 
    10px 10px 30px #bec3c9,
    -10px -10px 30px #ffffff;
  transition: all 0.3s;
  cursor: pointer;
}

.pricing--neumorphic .pricing__button:hover {
  box-shadow: 
    5px 5px 15px #bec3c9,
    -5px -5px 15px #ffffff;
}

.pricing--neumorphic .pricing__button:active {
  box-shadow: 
    inset 5px 5px 15px #bec3c9,
    inset -5px -5px 15px #ffffff;
}

/* Animations communes */
@keyframes pricingFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pricing__card,
.pricing__item,
.pricing__box {
  animation: pricingFadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.pricing__card:nth-child(1),
.pricing__item:nth-child(1),
.pricing__box:nth-child(1) { animation-delay: 0.1s; }

.pricing__card:nth-child(2),
.pricing__item:nth-child(2),
.pricing__box:nth-child(2) { animation-delay: 0.2s; }

.pricing__card:nth-child(3),
.pricing__item:nth-child(3),
.pricing__box:nth-child(3) { animation-delay: 0.3s; }

.pricing__card:nth-child(4),
.pricing__item:nth-child(4),
.pricing__box:nth-child(4) { animation-delay: 0.4s; }

/* Responsive */
@media (max-width: 768px) {
  .pricing__toggle {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pricing--timeline .pricing__item {
    width: 100%;
    padding-left: 3rem !important;
    padding-right: 0 !important;
    text-align: left !important;
  }
  
  .pricing--timeline .pricing__item:nth-child(even) {
    margin-left: 0;
  }
  
  .pricing--timeline .pricing__timeline::before {
    left: 15px;
    transform: none;
  }
  
  .pricing--timeline .pricing__item::before {
    left: 5px !important;
    right: auto !important;
  }
  
  .pricing--grid-bento .pricing__bento {
    grid-template-columns: 1fr;
  }
  
  .pricing--grid-bento .pricing__box--large,
  .pricing--grid-bento .pricing__box--wide {
    grid-column: span 1;
  }
  
  .pricing--table-comparison {
    font-size: 0.875rem;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .pricing {
    background: #0f172a;
  }
  
  .pricing__title {
    color: white;
  }
  
  .pricing__subtitle {
    color: #94a3b8;
  }
  
  .pricing--cards-modern .pricing__card,
  .pricing--table-comparison .pricing__table,
  .pricing--slider-interactive .pricing__calculator,
  .pricing--cards-flip .pricing__card-front,
  .pricing--timeline .pricing__content,
  .pricing--grid-bento .pricing__box {
    background: #1e293b;
  }
  
  .pricing--cards-modern .pricing__name,
  .pricing--cards-modern .pricing__price,
  .pricing--table-comparison .pricing__feature-name,
  .pricing--slider-interactive .pricing__breakdown-value,
  .pricing--timeline .pricing__content h3,
  .pricing--grid-bento .pricing__box-title {
    color: white;
  }
  
  .pricing--cards-modern .pricing__description,
  .pricing--cards-modern .pricing__feature,
  .pricing--table-comparison td,
  .pricing--slider-interactive .pricing__breakdown-label {
    color: #cbd5e1;
  }
  
  .pricing--table-comparison tbody tr:hover {
    background: #334155;
  }
  
  .pricing--table-comparison th,
  .pricing--table-comparison td {
    border-color: #334155;
  }
  
  .pricing--neumorphic {
    background: #1a1a1a;
  }
  
  .pricing--neumorphic .pricing__card {
    background: #1a1a1a;
    box-shadow: 
      20px 20px 60px #0f0f0f,
      -20px -20px 60px #252525;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Pricing V3 Perfect - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation Pricing
  function initPricing() {
    const pricings = document.querySelectorAll('.pricing');
    
    pricings.forEach(pricing => {
      const variant = Array.from(pricing.classList).find(c => c.startsWith('pricing--'))?.replace('pricing--', '');
      
      // Toggle période
      initPeriodToggle(pricing);
      
      // Variantes spécifiques
      switch(variant) {
        case 'slider-interactive':
          initSliderInteractive(pricing);
          break;
        case 'cards-flip':
          initCardsFlip(pricing);
          break;
        case 'table-comparison':
          initTableComparison(pricing);
          break;
      }
      
      // Animations d'entrée
      observePricing(pricing);
    });
  }
  
  // Toggle période (mensuel/annuel)
  function initPeriodToggle(pricing) {
    const toggle = pricing.querySelector('.pricing__toggle-switch');
    if (!toggle) return;
    
    const monthlyLabel = pricing.querySelector('.pricing__toggle-label[data-period="monthly"]');
    const yearlyLabel = pricing.querySelector('.pricing__toggle-label[data-period="yearly"]');
    const cards = pricing.querySelectorAll('.pricing__card');
    
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      const isYearly = toggle.classList.contains('active');
      
      // Update labels
      if (monthlyLabel && yearlyLabel) {
        monthlyLabel.classList.toggle('active', !isYearly);
        yearlyLabel.classList.toggle('active', isYearly);
      }
      
      // Update prices
      cards.forEach(card => {
        const monthlyPrice = card.getAttribute('data-monthly-price');
        const yearlyPrice = card.getAttribute('data-yearly-price');
        const priceElement = card.querySelector('.pricing__amount');
        const periodElement = card.querySelector('.pricing__period');
        
        if (priceElement && monthlyPrice && yearlyPrice) {
          if (isYearly) {
            priceElement.textContent = yearlyPrice;
            if (periodElement) periodElement.textContent = '/an';
            
            // Show savings
            const savingsElement = card.querySelector('.pricing__savings');
            if (savingsElement) {
              const monthlyCost = parseInt(monthlyPrice) * 12;
              const yearlyCost = parseInt(yearlyPrice);
              const savings = monthlyCost - yearlyCost;
              savingsElement.textContent = \`Économisez \${savings}€\`;
              savingsElement.style.display = 'block';
            }
          } else {
            priceElement.textContent = monthlyPrice;
            if (periodElement) periodElement.textContent = '/mois';
            
            const savingsElement = card.querySelector('.pricing__savings');
            if (savingsElement) {
              savingsElement.style.display = 'none';
            }
          }
          
          // Animation
          priceElement.style.transform = 'scale(0.8)';
          priceElement.style.opacity = '0';
          setTimeout(() => {
            priceElement.style.transform = 'scale(1)';
            priceElement.style.opacity = '1';
          }, 150);
        }
      });
      
      // Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pricing_toggle', {
          pricing_period: isYearly ? 'yearly' : 'monthly'
        });
      }
    });
  }
  
  // Slider interactif
  function initSliderInteractive(pricing) {
    const sliders = pricing.querySelectorAll('.pricing__slider');
    
    sliders.forEach(slider => {
      const output = pricing.querySelector(\`[data-slider-output="\${slider.id}"]\`);
      const totalElement = pricing.querySelector('.pricing__total');
      
      slider.addEventListener('input', () => {
        const value = parseInt(slider.value);
        
        // Update display
        if (output) {
          output.textContent = value.toLocaleString();
        }
        
        // Calculate price
        const basePrice = parseFloat(slider.getAttribute('data-base-price') || '0');
        const pricePerUnit = parseFloat(slider.getAttribute('data-price-per-unit') || '0');
        const total = basePrice + (value * pricePerUnit);
        
        if (totalElement) {
          totalElement.textContent = \`\${total.toLocaleString()}€\`;
        }
        
        // Update breakdown
        updateBreakdown(pricing, value, total);
        
        // Visual feedback
        const progress = (value - slider.min) / (slider.max - slider.min);
        slider.style.background = \`linear-gradient(to right, #667eea 0%, #667eea \${progress * 100}%, #e5e7eb \${progress * 100}%, #e5e7eb 100%)\`;
      });
      
      // Initialize
      slider.dispatchEvent(new Event('input'));
    });
  }
  
  // Update breakdown
  function updateBreakdown(pricing, units, total) {
    const breakdownItems = pricing.querySelectorAll('.pricing__breakdown-item');
    
    breakdownItems.forEach(item => {
      const type = item.getAttribute('data-breakdown-type');
      const valueElement = item.querySelector('.pricing__breakdown-value');
      
      if (valueElement) {
        switch(type) {
          case 'units':
            valueElement.textContent = units.toLocaleString();
            break;
          case 'monthly':
            valueElement.textContent = \`\${Math.round(total / 12).toLocaleString()}€\`;
            break;
          case 'daily':
            valueElement.textContent = \`\${Math.round(total / 365).toLocaleString()}€\`;
            break;
          case 'per-unit':
            valueElement.textContent = \`\${Math.round(total / units).toLocaleString()}€\`;
            break;
        }
      }
    });
  }
  
  // Cards flip
  function initCardsFlip(pricing) {
    const cards = pricing.querySelectorAll('.pricing__card');
    
    cards.forEach(card => {
      let isFlipped = false;
      
      // Click to flip
      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return; // Don't flip on CTA click
        
        isFlipped = !isFlipped;
        card.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
      });
      
      // Keyboard support
      card.setAttribute('tabindex', '0');
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
  
  // Table comparison
  function initTableComparison(pricing) {
    const table = pricing.querySelector('.pricing__table');
    if (!table) return;
    
    // Highlight column on hover
    const cells = table.querySelectorAll('td, th');
    
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        const index = Array.from(cell.parentElement.children).indexOf(cell);
        const column = table.querySelectorAll(\`tr > *:nth-child(\${index + 1})\`);
        
        column.forEach(c => c.classList.add('highlight'));
      });
      
      cell.addEventListener('mouseleave', () => {
        const highlighted = table.querySelectorAll('.highlight');
        highlighted.forEach(c => c.classList.remove('highlight'));
      });
    });
    
    // Sticky header on scroll
    const thead = table.querySelector('thead');
    if (thead) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          thead.classList.toggle('sticky', !entry.isIntersecting);
        },
        { threshold: [1] }
      );
      
      observer.observe(thead);
    }
  }
  
  // Observer pour animations
  function observePricing(pricing) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pricing--visible');
          
          // Animer les compteurs
          animateCounters(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(pricing);
  }
  
  // Animation des compteurs
  function animateCounters(pricing) {
    const counters = pricing.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'));
      const duration = 1000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.round(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
    });
  }
  
  // Calculateur de prix
  function initPriceCalculator() {
    const calculators = document.querySelectorAll('.pricing__calculator');
    
    calculators.forEach(calc => {
      const form = calc.querySelector('form');
      if (!form) return;
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        let total = 0;
        
        // Base price
        const plan = formData.get('plan');
        const basePrice = parseFloat(form.querySelector(\`[name="plan"][value="\${plan}"]\`).getAttribute('data-price') || '0');
        total += basePrice;
        
        // Add-ons
        const addons = formData.getAll('addon');
        addons.forEach(addon => {
          const addonPrice = parseFloat(form.querySelector(\`[name="addon"][value="\${addon}"]\`).getAttribute('data-price') || '0');
          total += addonPrice;
        });
        
        // Display result
        const resultElement = calc.querySelector('.pricing__calc-result');
        if (resultElement) {
          resultElement.textContent = \`Total: \${total.toLocaleString()}€/mois\`;
          resultElement.style.transform = 'scale(1.1)';
          setTimeout(() => {
            resultElement.style.transform = 'scale(1)';
          }, 300);
        }
      });
      
      // Real-time update
      form.addEventListener('change', () => {
        form.dispatchEvent(new Event('submit'));
      });
    });
  }
  
  // Comparaison interactive
  function initComparison() {
    const comparisons = document.querySelectorAll('.pricing__comparison');
    
    comparisons.forEach(comp => {
      const selects = comp.querySelectorAll('select');
      
      selects.forEach(select => {
        select.addEventListener('change', () => {
          updateComparison(comp);
        });
      });
      
      // Initial update
      updateComparison(comp);
    });
  }
  
  // Update comparison display
  function updateComparison(comp) {
    const plan1 = comp.querySelector('[name="plan1"]').value;
    const plan2 = comp.querySelector('[name="plan2"]').value;
    
    // Show/hide features based on plans
    const features = comp.querySelectorAll('.pricing__comparison-feature');
    
    features.forEach(feature => {
      const hasPlan1 = feature.getAttribute(\`data-\${plan1}\`) === 'true';
      const hasPlan2 = feature.getAttribute(\`data-\${plan2}\`) === 'true';
      
      feature.querySelector('.pricing__plan1-status').innerHTML = hasPlan1 ? '✓' : '✗';
      feature.querySelector('.pricing__plan2-status').innerHTML = hasPlan2 ? '✓' : '✗';
      
      // Highlight differences
      if (hasPlan1 !== hasPlan2) {
        feature.classList.add('highlight-difference');
      } else {
        feature.classList.remove('highlight-difference');
      }
    });
  }
  
  // Keyboard navigation
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      const activePricing = document.querySelector('.pricing:hover');
      if (!activePricing) return;
      
      const cards = Array.from(activePricing.querySelectorAll('.pricing__card'));
      const focusedCard = cards.find(card => card === document.activeElement);
      
      if (!focusedCard) return;
      
      const currentIndex = cards.indexOf(focusedCard);
      let nextIndex;
      
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % cards.length;
          cards[nextIndex].focus();
          break;
          
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
          cards[nextIndex].focus();
          break;
      }
    });
  }
  
  // Currency converter
  function initCurrencyConverter() {
    const converters = document.querySelectorAll('.pricing__currency-select');
    
    converters.forEach(select => {
      select.addEventListener('change', () => {
        const currency = select.value;
        const pricing = select.closest('.pricing');
        
        updateCurrency(pricing, currency);
      });
    });
  }
  
  // Update currency display
  function updateCurrency(pricing, currency) {
    const prices = pricing.querySelectorAll('[data-price-eur]');
    
    // Exchange rates (simplified)
    const rates = {
      EUR: 1,
      USD: 1.1,
      GBP: 0.85,
      CHF: 0.98
    };
    
    const symbols = {
      EUR: '€',
      USD: '$',
      GBP: '£',
      CHF: 'CHF'
    };
    
    prices.forEach(price => {
      const eurPrice = parseFloat(price.getAttribute('data-price-eur'));
      const convertedPrice = Math.round(eurPrice * rates[currency]);
      
      price.querySelector('.pricing__currency').textContent = symbols[currency];
      price.querySelector('.pricing__amount').textContent = convertedPrice.toLocaleString();
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPricing();
      initPriceCalculator();
      initComparison();
      initKeyboardNav();
      initCurrencyConverter();
    });
  } else {
    initPricing();
    initPriceCalculator();
    initComparison();
    initKeyboardNav();
    initCurrencyConverter();
  }
  
  // Export pour usage externe
  window.PricingPerfect = {
    init: initPricing,
    updateCurrency: updateCurrency
  };
})();
    `;
  }

  render(data: PricingData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('PricingRendererV3Perfect', 'render', 'Validation échouée', validation.error);
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
      logger.info('PricingRendererV3Perfect', 'render', 'Rendu Pricing avec variante:', validData.variant);

      // Générer le HTML selon la variante
      const html = this.renderVariant(validData);
      
      // CSS avec variables personnalisées
      const customCSS = this.generateCustomCSS(validData);
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('PricingRendererV3Perfect', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderVariant(data: PricingData): string {
    // Structure de base commune
    const header = `
      <div class="pricing__header">
        <h2 class="pricing__title">${this.escapeHtml(data.title)}</h2>
        ${data.subtitle ? `<p class="pricing__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        ${data.showToggle ? this.renderToggle(data) : ''}
      </div>
    `;

    // Rendu selon la variante
    let content = '';
    switch(data.variant) {
      case 'cards-modern':
        content = this.renderCardsModern(data);
        break;
      case 'table-comparison':
        content = this.renderTableComparison(data);
        break;
      case 'slider-interactive':
        content = this.renderSliderInteractive(data);
        break;
      case 'cards-flip':
        content = this.renderCardsFlip(data);
        break;
      case 'timeline':
        content = this.renderTimeline(data);
        break;
      case 'grid-bento':
        content = this.renderGridBento(data);
        break;
      case 'gradient-wave':
        content = this.renderGradientWave(data);
        break;
      case 'neumorphic':
        content = this.renderNeumorphic(data);
        break;
      default:
        content = this.renderCardsModern(data);
    }

    return `
      <section class="pricing pricing--${data.variant}" id="${data.id || 'pricing'}">
        <div class="pricing__container">
          ${header}
          ${content}
        </div>
      </section>
    `;
  }

  private renderToggle(data: PricingData): string {
    return `
      <div class="pricing__toggle">
        <span class="pricing__toggle-label ${!data.defaultPeriod || data.defaultPeriod === 'monthly' ? 'active' : ''}" data-period="monthly">
          Mensuel
        </span>
        <button class="pricing__toggle-switch ${data.defaultPeriod === 'yearly' ? 'active' : ''}" type="button" aria-label="Toggle pricing period">
          <span class="pricing__toggle-slider"></span>
        </button>
        <span class="pricing__toggle-label ${data.defaultPeriod === 'yearly' ? 'active' : ''}" data-period="yearly">
          Annuel
          ${data.yearlyDiscount ? `<span class="pricing__badge">-${data.yearlyDiscount}%</span>` : ''}
        </span>
      </div>
    `;
  }

  private renderCardsModern(data: PricingData): string {
    const plans = data.plans.map((plan, index) => `
      <div class="pricing__card ${plan.featured ? 'featured' : ''}" 
           data-monthly-price="${plan.price}" 
           data-yearly-price="${plan.yearlyPrice || plan.price * 10}">
        ${plan.popular ? '<div class="pricing__popular">Plus populaire</div>' : ''}
        <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
        ${plan.description ? `<p class="pricing__description">${this.escapeHtml(plan.description)}</p>` : ''}
        
        <div class="pricing__price-wrapper">
          <div class="pricing__price">
            <span class="pricing__currency">${data.currency || '€'}</span>
            <span class="pricing__amount">${plan.price?.amount || plan.price}</span>
            <span class="pricing__period">/${data.defaultPeriod === 'yearly' ? 'an' : 'mois'}</span>
          </div>
          <div class="pricing__savings" style="display: none; color: #10b981; font-size: 0.875rem; margin-top: 0.5rem;"></div>
        </div>
        
        <ul class="pricing__features">
          ${plan.features.map(feature => `
            <li class="pricing__feature">
              <span class="pricing__feature-icon">✓</span>
              <span>${feature.text || feature}</span>
            </li>
          `).join('')}
        </ul>
        
        <a href="${plan.ctaLink || '#'}" class="pricing__cta">
          ${plan.ctaText || 'Commencer'}
        </a>
      </div>
    `).join('');

    return `<div class="pricing__grid">${plans}</div>`;
  }

  private renderTableComparison(data: PricingData): string {
    const features = this.extractAllFeatures(data.plans);
    
    return `
      <div class="pricing__table-wrapper">
        <table class="pricing__table">
          <thead>
            <tr>
              <th>Fonctionnalités</th>
              ${data.plans.map(plan => `
                <th class="pricing__plan-header">
                  <div class="pricing__plan-name">${this.escapeHtml(plan.name)}</div>
                  <div class="pricing__plan-price">${plan.price?.amount || plan.price}€/mois</div>
                  <a href="${plan.cta?.link || plan.ctaLink || '#'}" class="pricing__plan-cta">${plan.cta?.text || plan.ctaText || 'Choisir'}</a>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${features.map(feature => `
              <tr>
                <td class="pricing__feature-name">${feature}</td>
                ${data.plans.map(plan => `
                  <td class="${plan.features.includes(feature) ? 'pricing__check' : 'pricing__cross'}">
                    ${plan.features.includes(feature) ? '✓' : '✗'}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderSliderInteractive(data: PricingData): string {
    return `
      <div class="pricing__calculator">
        <div class="pricing__slider-wrapper">
          <div class="pricing__slider-label">
            <span>Nombre d'utilisateurs</span>
            <span class="pricing__slider-value" data-slider-output="users">10</span>
          </div>
          <input type="range" 
                 class="pricing__slider" 
                 id="users"
                 min="1" 
                 max="100" 
                 value="10"
                 data-base-price="29"
                 data-price-per-unit="5">
        </div>
        
        <div class="pricing__result">
          <div class="pricing__total">290€</div>
          <div class="pricing__breakdown">
            <div class="pricing__breakdown-item" data-breakdown-type="units">
              <div class="pricing__breakdown-label">Utilisateurs</div>
              <div class="pricing__breakdown-value">10</div>
            </div>
            <div class="pricing__breakdown-item" data-breakdown-type="monthly">
              <div class="pricing__breakdown-label">Par mois</div>
              <div class="pricing__breakdown-value">24€</div>
            </div>
            <div class="pricing__breakdown-item" data-breakdown-type="per-unit">
              <div class="pricing__breakdown-label">Par utilisateur</div>
              <div class="pricing__breakdown-value">29€</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCardsFlip(data: PricingData): string {
    const plans = data.plans.map((plan, index) => `
      <div class="pricing__card">
        <div class="pricing__card-front">
          <div class="pricing__flip-hint">
            <span>Retourner</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          </div>
          <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
          <div class="pricing__price">
            <span class="pricing__currency">${data.currency || '€'}</span>
            <span class="pricing__amount">${plan.price?.amount || plan.price}</span>
            <span class="pricing__period">/mois</span>
          </div>
          <p class="pricing__description">${this.escapeHtml(plan.description || '')}</p>
          <div class="pricing__cta">Voir les détails →</div>
        </div>
        <div class="pricing__card-back">
          <div class="pricing__flip-hint">
            <span>Retour</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          </div>
          <h3>${this.escapeHtml(plan.name)} - Détails</h3>
          <ul class="pricing__features">
            ${plan.features.map(feature => `<li>✓ ${feature.text || feature}</li>`).join('')}
          </ul>
          <a href="${plan.ctaLink || '#'}" class="pricing__cta">${plan.ctaText || 'Commencer'}</a>
        </div>
      </div>
    `).join('');

    return `<div class="pricing__grid">${plans}</div>`;
  }

  private renderTimeline(data: PricingData): string {
    const items = data.plans.map((plan, index) => `
      <div class="pricing__item">
        <div class="pricing__content">
          <h3>${this.escapeHtml(plan.name)}</h3>
          <div class="pricing__price">${plan.price?.amount || plan.price}€/mois</div>
          <p>${this.escapeHtml(plan.description || '')}</p>
          <a href="${plan.cta?.link || plan.ctaLink || '#'}" class="pricing__cta">${plan.cta?.text || plan.ctaText || 'Choisir'}</a>
        </div>
      </div>
    `).join('');

    return `<div class="pricing__timeline">${items}</div>`;
  }

  private renderGridBento(data: PricingData): string {
    const boxes = data.plans.map((plan, index) => {
      const classes = ['pricing__box'];
      if (index === 0) classes.push('pricing__box--large');
      if (index === 1) classes.push('pricing__box--wide');
      if (index === 2) classes.push('pricing__box--tall');
      if (plan.featured) classes.push('pricing__box--featured');
      
      return `
        <div class="${classes.join(' ')}">
          <h3 class="pricing__box-title">${this.escapeHtml(plan.name)}</h3>
          <div class="pricing__box-price">${plan.price?.amount || plan.price}€/mois</div>
          <p class="pricing__box-description">${this.escapeHtml(plan.description || '')}</p>
          ${index === 0 ? `
            <ul class="pricing__features">
              ${plan.features.slice(0, 5).map(f => `<li>✓ ${f}</li>`).join('')}
            </ul>
          ` : ''}
          <a href="${plan.cta?.link || plan.ctaLink || '#'}" class="pricing__cta">${plan.cta?.text || plan.ctaText || 'Choisir'}</a>
        </div>
      `;
    }).join('');

    return `<div class="pricing__bento">${boxes}</div>`;
  }

  private renderGradientWave(data: PricingData): string {
    const cards = data.plans.map(plan => `
      <div class="pricing__card">
        <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
        <div class="pricing__price">
          <span class="pricing__amount">${plan.price?.amount || plan.price}€</span>
          <span class="pricing__period">/mois</span>
        </div>
        <ul class="pricing__features">
          ${plan.features.map(f => `<li>✓ ${f.text || f}</li>`).join('')}
        </ul>
        <a href="${plan.ctaLink || '#'}" class="pricing__cta">${plan.ctaText || 'Choisir'}</a>
      </div>
    `).join('');

    return `
      <div class="pricing__wave-container">
        <div class="pricing__wave"></div>
        <div class="pricing__cards">${cards}</div>
      </div>
    `;
  }

  private renderNeumorphic(data: PricingData): string {
    const plans = data.plans.map(plan => `
      <div class="pricing__card ${plan.featured ? 'featured' : ''}">
        <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
        <div class="pricing__price">${plan.price?.amount || plan.price}€/mois</div>
        <ul class="pricing__features">
          ${plan.features.map(f => `<li>✓ ${f.text || f}</li>`).join('')}
        </ul>
        <button class="pricing__button">${plan.cta?.text || plan.ctaText || 'Choisir'}</button>
      </div>
    `).join('');

    return `<div class="pricing__grid">${plans}</div>`;
  }

  private extractAllFeatures(plans: any[]): string[] {
    const allFeatures = new Set<string>();
    plans.forEach(plan => {
      plan.features.forEach((feature: string) => allFeatures.add(feature));
    });
    return Array.from(allFeatures);
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
        --pricing-text: ${colors.text || '#1f2937'};
        --pricing-bg: ${colors.background || '#ffffff'};
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

export const pricingRendererV3Perfect = new PricingRendererV3Perfect();
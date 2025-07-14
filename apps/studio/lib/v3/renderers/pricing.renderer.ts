/**
 * Pricing Renderer V3 - Rendu robuste avec logs détaillés
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { pricingDataSchema, pricingDefaults, type PricingData } from '../schemas/blocks/pricing';
import { logger } from '../core/logger';

export class PricingRendererV3 implements BlockRenderer<PricingData> {
  type = 'pricing-ultra-modern';
  version = '3.0.0';

  constructor() {
    logger.info('PricingRendererV3', 'constructor', '🚀 Initialisation du renderer Pricing V3');
  }

  validate(data: unknown): z.SafeParseReturnType<PricingData, PricingData> {
    logger.debug('PricingRendererV3', 'validate', 'Validation des données', { 
      hasData: !!data,
      dataType: typeof data 
    });
    
    const result = pricingDataSchema.safeParse(data);
    
    if (!result.success) {
      logger.warn('PricingRendererV3', 'validate', 'Validation échouée', {
        errors: result.error.errors
      });
    } else {
      logger.info('PricingRendererV3', 'validate', '✅ Validation réussie', {
        plansCount: result.data.plans.length,
        variant: result.data.variant
      });
    }
    
    return result;
  }

  getDefaultData(): PricingData {
    logger.debug('PricingRendererV3', 'getDefaultData', 'Retour des données par défaut');
    return pricingDefaults;
  }

  getDefaultCSS(): string {
    logger.debug('PricingRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
    return `
/* Pricing Base Styles */
.pricing {
  position: relative;
  padding: var(--pricing-padding, 4rem) 0;
  overflow: hidden;
}

.pricing__container {
  max-width: var(--pricing-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.pricing--container-full .pricing__container { max-width: 100%; }
.pricing--container-wide .pricing__container { max-width: 1400px; }
.pricing--container-normal .pricing__container { max-width: 1200px; }
.pricing--container-narrow .pricing__container { max-width: 1000px; }

/* Header */
.pricing__header {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.pricing__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.pricing__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 800px;
  margin: 0 auto;
}

/* Period Toggle */
.pricing__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.pricing__toggle-label {
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
  transition: color 0.3s;
}

.pricing__toggle-label--active {
  color: var(--text, #1f2937);
}

.pricing__toggle-switch {
  position: relative;
  width: 60px;
  height: 32px;
  background: var(--border, #e5e7eb);
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s;
}

.pricing__toggle-switch--active {
  background: var(--primary, #3b82f6);
}

.pricing__toggle-switch::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

.pricing__toggle-switch--active::after {
  transform: translateX(28px);
}

.pricing__toggle-badge {
  padding: 0.25rem 0.75rem;
  background: var(--success-100, #d1fae5);
  color: var(--success-700, #065f46);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
}

/* Plans Grid */
.pricing__plans {
  display: grid;
  gap: var(--pricing-gap, 2rem);
  margin-bottom: 3rem;
}

.pricing__plans--1 { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
.pricing__plans--2 { grid-template-columns: repeat(2, 1fr); }
.pricing__plans--3 { grid-template-columns: repeat(3, 1fr); }
.pricing__plans--4 { grid-template-columns: repeat(4, 1fr); }

/* Plan Card */
.pricing__plan {
  position: relative;
  padding: 2rem;
  background: var(--bg-elevated, white);
  border-radius: var(--pricing-radius, 1rem);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Card Styles */
.pricing__plan--flat { background: transparent; box-shadow: none; }
.pricing__plan--elevated { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
.pricing__plan--outlined { border: 1px solid var(--border, #e5e7eb); box-shadow: none; }
.pricing__plan--gradient {
  background: linear-gradient(135deg, var(--gradient-from, #f3f4f6), var(--gradient-to, #ffffff));
}
.pricing__plan--glassmorphism { 
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Hover Effects */
.pricing__plan--hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.pricing__plan--hover-scale:hover { transform: scale(1.05); }
.pricing__plan--hover-glow:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
.pricing__plan--hover-highlight:hover { border-color: var(--primary, #3b82f6); }

/* Recommended Plan */
.pricing__plan--recommended {
  transform: scale(var(--recommended-scale, 1.05));
  z-index: 1;
}

.pricing__plan--recommended.pricing__plan--elevated {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Badge */
.pricing__badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  white-space: nowrap;
}

.pricing__badge--primary { background: var(--primary, #3b82f6); color: white; }
.pricing__badge--secondary { background: var(--secondary, #10b981); color: white; }
.pricing__badge--success { background: var(--success, #10b981); color: white; }
.pricing__badge--warning { background: var(--warning, #f59e0b); color: white; }
.pricing__badge--error { background: var(--error, #ef4444); color: white; }

/* Plan Header */
.pricing__plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pricing__plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text, #1f2937);
}

.pricing__plan-description {
  font-size: 1rem;
  color: var(--text-secondary, #6b7280);
}

/* Price */
.pricing__price {
  text-align: center;
  margin-bottom: 2rem;
}

.pricing__price-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.pricing__currency {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
}

.pricing__currency--superscript {
  font-size: 1rem;
  vertical-align: super;
}

.pricing__amount {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text, #1f2937);
  line-height: 1;
}

.pricing__period {
  font-size: 1rem;
  color: var(--text-secondary, #6b7280);
  margin-left: 0.25rem;
}

.pricing__original-price {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  text-decoration: line-through;
  opacity: 0.7;
}

.pricing__discount {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  background: var(--error-100, #fee2e2);
  color: var(--error-700, #b91c1c);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.25rem;
}

/* Features */
.pricing__features {
  flex: 1;
  margin-bottom: 2rem;
}

.pricing__features--list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pricing__feature {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border, #e5e7eb);
}

.pricing__feature:last-child {
  border-bottom: none;
}

.pricing__feature-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.pricing__feature-icon--included {
  color: var(--success, #10b981);
}

.pricing__feature-icon--not-included {
  color: var(--error, #ef4444);
}

.pricing__feature-text {
  flex: 1;
  font-size: 1rem;
  color: var(--text, #1f2937);
}

.pricing__feature--not-included .pricing__feature-text {
  color: var(--text-secondary, #6b7280);
  opacity: 0.7;
}

.pricing__feature--highlight .pricing__feature-text {
  font-weight: 600;
}

.pricing__feature-tooltip {
  margin-left: 0.5rem;
  color: var(--text-secondary, #6b7280);
  cursor: help;
}

/* CTA */
.pricing__cta {
  margin-top: auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn--primary {
  background: var(--primary, #3b82f6);
  color: white;
}

.btn--primary:hover {
  background: var(--primary-600, #2563eb);
}

.btn--secondary {
  background: var(--secondary, #10b981);
  color: white;
}

.btn--secondary:hover {
  background: var(--secondary-600, #059669);
}

.btn--outline {
  background: transparent;
  color: var(--primary, #3b82f6);
  border-color: var(--primary, #3b82f6);
}

.btn--outline:hover {
  background: var(--primary, #3b82f6);
  color: white;
}

.btn--full-width {
  width: 100%;
}

.btn--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Comparison Table */
.pricing__comparison {
  overflow-x: auto;
  margin: 3rem 0;
}

.pricing__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.pricing__table-header {
  background: var(--bg-secondary, #f9fafb);
  position: sticky;
  top: 0;
  z-index: 10;
}

.pricing__table-header th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text, #1f2937);
  border-bottom: 2px solid var(--border, #e5e7eb);
}

.pricing__table-header th:first-child {
  width: 40%;
}

.pricing__table-row {
  border-bottom: 1px solid var(--border, #e5e7eb);
}

.pricing__table-row:hover {
  background: var(--bg-hover, #f9fafb);
}

.pricing__table-row td {
  padding: 1rem;
  color: var(--text, #1f2937);
}

.pricing__table-feature {
  font-weight: 500;
}

.pricing__table-value {
  text-align: center;
}

.pricing__table-value--yes {
  color: var(--success, #10b981);
}

.pricing__table-value--no {
  color: var(--error, #ef4444);
}

/* Guarantees */
.pricing__guarantees {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.pricing__guarantee {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pricing__guarantee-icon {
  font-size: 2rem;
}

.pricing__guarantee-content {
  text-align: left;
}

.pricing__guarantee-title {
  font-weight: 600;
  color: var(--text, #1f2937);
  margin-bottom: 0.25rem;
}

.pricing__guarantee-description {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

/* CTA Section */
.pricing__cta-section {
  background: var(--bg-secondary, #f9fafb);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  margin-top: 3rem;
}

.pricing__cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text, #1f2937);
}

.pricing__cta-description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .pricing__plans--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pricing__plans--2,
  .pricing__plans--3,
  .pricing__plans--4 {
    grid-template-columns: 1fr;
  }
  
  .pricing__plan--recommended {
    transform: scale(1);
  }
  
  .pricing__guarantees {
    flex-direction: column;
    gap: 2rem;
  }
}

/* Gap variants */
.pricing--gap-sm .pricing__plans { gap: 1rem; }
.pricing--gap-md .pricing__plans { gap: 1.5rem; }
.pricing--gap-lg .pricing__plans { gap: 2rem; }
.pricing--gap-xl .pricing__plans { gap: 3rem; }

/* Padding variants */
.pricing--padding-none { padding: 0; }
.pricing--padding-sm { padding: 2rem 0; }
.pricing--padding-md { padding: 3rem 0; }
.pricing--padding-lg { padding: 4rem 0; }
.pricing--padding-xl { padding: 6rem 0; }`;
  }

  getRequiredAssets() {
    logger.debug('PricingRendererV3', 'getRequiredAssets', 'Aucun asset requis');
    return [];
  }

  renderPreview(data: PricingData): string {
    logger.debug('PricingRendererV3', 'renderPreview', 'Génération preview', {
      variant: data.variant,
      plansCount: data.plans.length
    });
    
    return `
<div class="pricing-preview">
  <h3>${data.title}</h3>
  <p>${data.plans.length} plans - ${data.variant}</p>
</div>`;
  }

  render(data: PricingData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('PricingRendererV3', 'render', '🎨 Début du rendu Pricing', {
      variant: data.variant,
      plansCount: data.plans.length,
      hasContext: !!context
    });
    
    try {
      // Générer le HTML
      logger.debug('PricingRendererV3', 'render', 'Génération HTML');
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      logger.debug('PricingRendererV3', 'render', 'Génération CSS');
      const css = this.generateCSS(data);
      
      // Générer le JS si nécessaire
      logger.debug('PricingRendererV3', 'render', 'Génération JS');
      const js = this.generateJS(data);
      
      // Calculer les performances
      const renderTime = performance.now() - startTime;
      
      logger.info('PricingRendererV3', 'render', '✅ Rendu Pricing terminé', {
        renderTime: renderTime.toFixed(2),
        htmlLength: html.length,
        cssLength: css.length,
        jsLength: js.length
      });
      
      return {
        html,
        css: this.getDefaultCSS() + css,
        js,
        assets: [],
        errors: [],
        warnings: [],
        performance: {
          renderTime,
          cssSize: css.length,
          jsSize: js.length,
        }
      };
    } catch (error) {
      logger.error('PricingRendererV3', 'render', '❌ Erreur lors du rendu', error as Error);
      
      return {
        html: '<div class="pricing pricing--error">Erreur de rendu</div>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'pricing',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          fallbackUsed: true
        }],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: 0,
          jsSize: 0,
        }
      };
    }
  }

  private generateHTML(data: PricingData): string {
    logger.debug('PricingRendererV3', 'generateHTML', 'Génération structure HTML', {
      variant: data.variant,
      layout: data.layout
    });
    
    const classes = [
      'pricing',
      `pricing--${data.variant}`,
      `pricing--container-${data.layout.containerWidth}`,
      `pricing--gap-${data.layout.gap}`,
      `pricing--padding-${data.styles.padding || 'lg'}`
    ].join(' ');

    return `
<section class="${classes}" id="pricing" data-block="pricing">
  <div class="pricing__container">
    ${this.renderHeader(data)}
    ${data.periodToggle.enabled ? this.renderPeriodToggle(data.periodToggle) : ''}
    ${data.guarantees.enabled && data.guarantees.position === 'top' ? this.renderGuarantees(data.guarantees) : ''}
    ${this.renderPlans(data)}
    ${data.comparison.enabled ? this.renderComparisonTable(data) : ''}
    ${data.guarantees.enabled && data.guarantees.position === 'bottom' ? this.renderGuarantees(data.guarantees) : ''}
    ${data.faq.enabled ? this.renderFAQ(data.faq) : ''}
    ${data.cta.enabled ? this.renderCTA(data.cta) : ''}
  </div>
</section>`;
  }

  private renderHeader(data: PricingData): string {
    if (!data.title && !data.subtitle && !data.description) return '';
    
    logger.debug('PricingRendererV3', 'renderHeader', 'Génération header');
    
    return `
<div class="pricing__header">
  ${data.title ? `<h2 class="pricing__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="pricing__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="pricing__description">${this.escape(data.description)}</p>` : ''}
</div>`;
  }

  private renderPeriodToggle(toggle: any): string {
    logger.debug('PricingRendererV3', 'renderPeriodToggle', 'Génération toggle', {
      style: toggle.style,
      defaultPeriod: toggle.defaultPeriod
    });
    
    const isYearly = toggle.defaultPeriod === 'year';
    
    return `
<div class="pricing__toggle pricing__toggle--${toggle.position}">
  <span class="pricing__toggle-label ${!isYearly ? 'pricing__toggle-label--active' : ''}" data-period="month">
    ${this.escape(toggle.monthlyLabel)}
  </span>
  
  <button class="pricing__toggle-switch ${isYearly ? 'pricing__toggle-switch--active' : ''}" 
          data-toggle="period" 
          aria-label="Basculer entre mensuel et annuel">
  </button>
  
  <span class="pricing__toggle-label ${isYearly ? 'pricing__toggle-label--active' : ''}" data-period="year">
    ${this.escape(toggle.yearlyLabel)}
  </span>
  
  ${toggle.yearlyDiscount > 0 ? `
    <span class="pricing__toggle-badge">
      ${this.escape(toggle.discountBadge.replace('{discount}', toggle.yearlyDiscount.toString()))}
    </span>
  ` : ''}
</div>`;
  }

  private renderPlans(data: PricingData): string {
    logger.debug('PricingRendererV3', 'renderPlans', 'Génération plans', {
      count: data.plans.length,
      columns: data.layout.columns
    });
    
    const gridClasses = `pricing__plans pricing__plans--${data.layout.columns}`;
    
    return `
<div class="${gridClasses}">
  ${data.plans.map((plan, index) => this.renderPlan(plan, data, index)).join('')}
</div>`;
  }

  private renderPlan(plan: any, data: PricingData, index: number): string {
    logger.debug('PricingRendererV3', 'renderPlan', 'Génération plan', {
      name: plan.name,
      recommended: plan.recommended
    });
    
    const delay = data.display.stagger ? index * data.display.animationDelay : 0;
    
    const classes = [
      'pricing__plan',
      `pricing__plan--${data.display.cardStyle}`,
      `pricing__plan--hover-${data.display.cardHover}`,
      plan.recommended && data.display.highlightRecommended ? 'pricing__plan--recommended' : '',
      data.display.animation !== 'none' ? 'pricing__plan--animate' : ''
    ].filter(Boolean).join(' ');
    
    const styles = data.display.animation !== 'none' 
      ? `animation-delay: ${delay}ms;` 
      : '';
    
    return `
<article class="${classes}" style="${styles}" data-plan="${plan.id}">
  ${plan.badge ? `
    <span class="pricing__badge pricing__badge--${plan.badge.color}">
      ${this.escape(plan.badge.text)}
    </span>
  ` : ''}
  
  <div class="pricing__plan-header">
    <h3 class="pricing__plan-name">${this.escape(plan.name)}</h3>
    ${plan.description ? `<p class="pricing__plan-description">${this.escape(plan.description)}</p>` : ''}
  </div>
  
  ${this.renderPrice(plan.price, data)}
  
  ${this.renderFeatures(plan.features, data)}
  
  <div class="pricing__cta">
    ${this.renderButton(plan.cta)}
  </div>
</article>`;
  }

  private renderPrice(price: any, data: PricingData): string {
    logger.debug('PricingRendererV3', 'renderPrice', 'Génération prix', {
      amount: price.amount,
      period: price.period
    });
    
    const currencyPosition = data.display.currencyPosition;
    const showCurrency = data.display.showCurrency;
    const showPeriod = data.display.showPeriod;
    
    return `
<div class="pricing__price">
  ${price.originalPrice && data.display.showOriginalPrice ? `
    <div class="pricing__original-price">
      ${showCurrency && currencyPosition === 'before' ? price.currency : ''}
      ${price.originalPrice}
      ${showCurrency && currencyPosition === 'after' ? price.currency : ''}
    </div>
  ` : ''}
  
  <div class="pricing__price-wrapper">
    ${showCurrency && currencyPosition === 'before' ? `
      <span class="pricing__currency">${price.currency}</span>
    ` : ''}
    
    ${showCurrency && currencyPosition === 'superscript' ? `
      <span class="pricing__currency pricing__currency--superscript">${price.currency}</span>
    ` : ''}
    
    <span class="pricing__amount">${price.amount}</span>
    
    ${showCurrency && currencyPosition === 'after' ? `
      <span class="pricing__currency">${price.currency}</span>
    ` : ''}
    
    ${showPeriod && price.period !== 'once' ? `
      <span class="pricing__period">/${this.formatPeriod(price.period, data.display.periodFormat)}</span>
    ` : ''}
  </div>
  
  ${price.discount && data.display.showDiscount ? `
    <span class="pricing__discount">-${price.discount.percentage}%</span>
  ` : ''}
</div>`;
  }

  private renderFeatures(features: any[], data: PricingData): string {
    logger.debug('PricingRendererV3', 'renderFeatures', 'Génération features', {
      count: features.length,
      style: data.display.featureStyle
    });
    
    if (data.display.featureStyle === 'checklist') {
      return `
<ul class="pricing__features pricing__features--list">
  ${features.map(feature => this.renderFeature(feature, data)).join('')}
</ul>`;
    }
    
    // Pour d'autres styles, adapter le rendu
    return `
<div class="pricing__features pricing__features--${data.display.featureStyle}">
  ${features.map(feature => this.renderFeature(feature, data)).join('')}
</div>`;
  }

  private renderFeature(feature: any, data: PricingData): string {
    const iconMap = {
      check: '✓',
      arrow: '→',
      star: '★',
      custom: feature.icon || '•'
    };
    
    const icon = iconMap[data.display.featureIcon] || '✓';
    const notIncludedIcon = '✕';
    
    return `
<li class="pricing__feature ${!feature.included ? 'pricing__feature--not-included' : ''} ${feature.highlight ? 'pricing__feature--highlight' : ''}">
  <span class="pricing__feature-icon ${feature.included ? 'pricing__feature-icon--included' : 'pricing__feature-icon--not-included'}">
    ${feature.included ? icon : notIncludedIcon}
  </span>
  <span class="pricing__feature-text">
    ${this.escape(feature.text)}
    ${feature.tooltip && data.display.showFeatureTooltips ? `
      <span class="pricing__feature-tooltip" title="${this.escape(feature.tooltip)}">ⓘ</span>
    ` : ''}
  </span>
</li>`;
  }

  private renderButton(cta: any): string {
    const classes = [
      'btn',
      `btn--${cta.variant}`,
      `btn--${cta.size || 'md'}`,
      cta.fullWidth ? 'btn--full-width' : ''
    ].filter(Boolean).join(' ');
    
    return `
<a href="${cta.link}" class="${classes}">
  ${this.escape(cta.text)}
</a>`;
  }

  private renderComparisonTable(data: PricingData): string {
    logger.debug('PricingRendererV3', 'renderComparisonTable', 'Génération tableau comparatif', {
      featuresCount: data.comparison.features.length
    });
    
    return `
<div class="pricing__comparison">
  <table class="pricing__table">
    <thead class="pricing__table-header ${data.comparison.stickyHeader ? 'pricing__table-header--sticky' : ''}">
      <tr>
        <th>Fonctionnalités</th>
        ${data.plans.map(plan => `<th>${this.escape(plan.name)}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${data.comparison.features.map(feature => `
        <tr class="pricing__table-row">
          <td class="pricing__table-feature">
            ${this.escape(feature.name)}
            ${feature.description ? `<br><small>${this.escape(feature.description)}</small>` : ''}
          </td>
          ${data.plans.map(plan => {
            const value = feature.plans[plan.id];
            if (typeof value === 'boolean') {
              return `<td class="pricing__table-value pricing__table-value--${value ? 'yes' : 'no'}">${value ? '✓' : '✕'}</td>`;
            } else if (typeof value === 'object' && value.value !== undefined) {
              return `<td class="pricing__table-value">${this.escape(String(value.value))}</td>`;
            } else if (value) {
              return `<td class="pricing__table-value">${this.escape(String(value))}</td>`;
            }
            return '<td class="pricing__table-value">-</td>';
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>`;
  }

  private renderGuarantees(guarantees: any): string {
    logger.debug('PricingRendererV3', 'renderGuarantees', 'Génération garanties', {
      count: guarantees.items.length,
      style: guarantees.style
    });
    
    return `
<div class="pricing__guarantees pricing__guarantees--${guarantees.style}">
  ${guarantees.items.map(item => `
    <div class="pricing__guarantee">
      <span class="pricing__guarantee-icon">${item.icon}</span>
      <div class="pricing__guarantee-content">
        <div class="pricing__guarantee-title">${this.escape(item.title)}</div>
        <div class="pricing__guarantee-description">${this.escape(item.description)}</div>
      </div>
    </div>
  `).join('')}
</div>`;
  }

  private renderFAQ(faq: any): string {
    logger.debug('PricingRendererV3', 'renderFAQ', 'Génération FAQ', {
      itemsCount: faq.items.length,
      position: faq.position
    });
    
    return `
<div class="pricing__faq pricing__faq--${faq.position}">
  <h3 class="pricing__faq-title">${this.escape(faq.title)}</h3>
  <div class="pricing__faq-items">
    ${faq.items.map((item: any, index: number) => `
      <details class="pricing__faq-item" ${index === 0 ? 'open' : ''}>
        <summary class="pricing__faq-question">${this.escape(item.question)}</summary>
        <div class="pricing__faq-answer">${this.escape(item.answer)}</div>
      </details>
    `).join('')}
  </div>
</div>`;
  }

  private renderCTA(cta: any): string {
    logger.debug('PricingRendererV3', 'renderCTA', 'Génération CTA', {
      style: cta.style,
      position: cta.position
    });
    
    return `
<div class="pricing__cta-section pricing__cta-section--${cta.style}">
  <h3 class="pricing__cta-title">${this.escape(cta.title)}</h3>
  <p class="pricing__cta-description">${this.escape(cta.description)}</p>
  <a href="${cta.buttonLink}" class="btn btn--${cta.buttonVariant} btn--lg">
    ${this.escape(cta.buttonText)}
  </a>
</div>`;
  }

  private generateCSS(data: PricingData): string {
    logger.debug('PricingRendererV3', 'generateCSS', 'Génération CSS spécifique');
    
    let css = '';
    
    // CSS des couleurs personnalisées
    if (data.styles.backgroundColor || data.styles.textColor || data.styles.accentColor) {
      css += `
.pricing {
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
  ${data.styles.textColor ? `color: ${data.styles.textColor};` : ''}
  ${data.styles.accentColor ? `--primary: ${data.styles.accentColor};` : ''}
}`;
    }
    
    // CSS pour border radius
    if (data.styles.borderRadius) {
      const radiusMap = {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem'
      };
      css += `
.pricing .pricing__plan {
  border-radius: ${radiusMap[data.styles.borderRadius]};
}`;
    }
    
    // CSS pour shadow
    if (data.styles.shadow && data.display.cardStyle === 'elevated') {
      const shadowMap = {
        none: 'none',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      };
      css += `
.pricing .pricing__plan--elevated {
  box-shadow: ${shadowMap[data.styles.shadow]};
}`;
    }
    
    // CSS pour recommended scale
    if (data.display.highlightRecommended && data.display.recommendedScale !== 1) {
      css += `
.pricing .pricing__plan--recommended {
  --recommended-scale: ${data.display.recommendedScale};
}`;
    }
    
    return css;
  }

  private generateJS(data: PricingData): string {
    logger.debug('PricingRendererV3', 'generateJS', 'Génération JS', {
      hasPeriodToggle: data.periodToggle.enabled,
      hasComparison: data.comparison.enabled
    });
    
    let js = '';
    
    // JS pour le toggle de période
    if (data.periodToggle.enabled) {
      js += this.generatePeriodToggleJS(data);
    }
    
    // JS pour les tooltips
    if (data.display.showFeatureTooltips) {
      js += this.generateTooltipsJS();
    }
    
    // JS pour l'animation au scroll
    if (data.display.animation !== 'none') {
      js += this.generateAnimationJS();
    }
    
    return js;
  }

  private generatePeriodToggleJS(data: PricingData): string {
    return `
// Pricing Period Toggle
(function() {
  const toggle = document.querySelector('.pricing__toggle-switch');
  const monthlyLabel = document.querySelector('[data-period="month"]');
  const yearlyLabel = document.querySelector('[data-period="year"]');
  const prices = document.querySelectorAll('.pricing__amount');
  const periods = document.querySelectorAll('.pricing__period');
  
  if (!toggle) return;
  
  // Prix de base (mensuels)
  const basePrices = [${data.plans.map(p => p.price.amount).join(', ')}];
  const yearlyDiscount = ${data.periodToggle.yearlyDiscount};
  
  let isYearly = ${data.periodToggle.defaultPeriod === 'year'};
  
  function updatePrices() {
    prices.forEach((price, index) => {
      if (index < basePrices.length) {
        const basePrice = basePrices[index];
        const newPrice = isYearly 
          ? Math.round(basePrice * 12 * (1 - yearlyDiscount / 100))
          : basePrice;
        price.textContent = newPrice;
      }
    });
    
    periods.forEach(period => {
      period.textContent = isYearly ? '/an' : '/mois';
    });
    
    toggle.classList.toggle('pricing__toggle-switch--active', isYearly);
    monthlyLabel.classList.toggle('pricing__toggle-label--active', !isYearly);
    yearlyLabel.classList.toggle('pricing__toggle-label--active', isYearly);
  }
  
  toggle.addEventListener('click', () => {
    isYearly = !isYearly;
    updatePrices();
  });
})();`;
  }

  private generateTooltipsJS(): string {
    return `
// Pricing Tooltips
(function() {
  const tooltips = document.querySelectorAll('.pricing__feature-tooltip');
  
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
      const text = e.target.getAttribute('title');
      if (!text) return;
      
      const tooltipEl = document.createElement('div');
      tooltipEl.className = 'pricing__tooltip-popup';
      tooltipEl.textContent = text;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.zIndex = '1000';
      
      document.body.appendChild(tooltipEl);
      
      const rect = e.target.getBoundingClientRect();
      tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 5) + 'px';
      tooltipEl.style.left = (rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
    });
    
    tooltip.addEventListener('mouseleave', () => {
      const popup = document.querySelector('.pricing__tooltip-popup');
      if (popup) popup.remove();
    });
  });
})();`;
  }

  private generateAnimationJS(): string {
    return `
// Pricing Animation on Scroll
(function() {
  const plans = document.querySelectorAll('.pricing__plan--animate');
  
  if (!plans.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  plans.forEach(plan => observer.observe(plan));
})();`;
  }

  private formatPeriod(period: string, format: string): string {
    const periodMap = {
      full: { month: 'mois', year: 'an', once: '', custom: period },
      short: { month: 'mo', year: 'an', once: '', custom: period },
      slash: { month: 'mois', year: 'an', once: '', custom: period }
    };
    
    return periodMap[format]?.[period] || period;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
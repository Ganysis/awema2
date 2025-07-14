/**
 * FAQ Renderer V3 - Rendu robuste avec logs détaillés
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { faqDataSchema, faqDefaults, type FAQData } from '../schemas/blocks/faq';
import { logger } from '../core/logger';

export class FAQRendererV3 implements BlockRenderer<FAQData> {
  type = 'faq-ultra-modern';
  version = '3.0.0';

  constructor() {
    logger.info('FAQRendererV3', 'constructor', '🚀 Initialisation du renderer FAQ V3');
  }

  validate(data: unknown): z.SafeParseReturnType<FAQData, FAQData> {
    logger.debug('FAQRendererV3', 'validate', 'Validation des données', { 
      hasData: !!data,
      dataType: typeof data 
    });
    
    const result = faqDataSchema.safeParse(data);
    
    if (!result.success) {
      logger.warn('FAQRendererV3', 'validate', 'Validation échouée', {
        errors: result.error.errors
      });
    } else {
      logger.info('FAQRendererV3', 'validate', '✅ Validation réussie', {
        itemsCount: result.data.items.length,
        variant: result.data.variant
      });
    }
    
    return result;
  }

  getDefaultData(): FAQData {
    logger.debug('FAQRendererV3', 'getDefaultData', 'Retour des données par défaut');
    return faqDefaults;
  }

  getDefaultCSS(): string {
    logger.debug('FAQRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
    return `
/* FAQ Base Styles */
.faq {
  position: relative;
  padding: var(--faq-padding, 4rem) 0;
  overflow: hidden;
}

.faq__container {
  max-width: var(--faq-max-width, 900px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.faq--container-full .faq__container { max-width: 100%; }
.faq--container-wide .faq__container { max-width: 1200px; }
.faq--container-normal .faq__container { max-width: 900px; }
.faq--container-narrow .faq__container { max-width: 700px; }

/* Header */
.faq__header {
  text-align: center;
  margin-bottom: 3rem;
}

.faq__header--left { text-align: left; }
.faq__header--right { text-align: right; }

.faq__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.faq__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.faq__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 700px;
  margin: 0 auto;
}

/* Categories */
.faq__categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.faq__category {
  padding: 0.5rem 1.5rem;
  background: var(--bg-elevated, #f3f4f6);
  border: 2px solid transparent;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.faq__category:hover {
  background: var(--bg-hover, #e5e7eb);
}

.faq__category--active {
  background: var(--primary, #3b82f6);
  color: white;
  border-color: var(--primary, #3b82f6);
}

.faq__category-count {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  font-size: 0.75rem;
}

/* Search */
.faq__search {
  margin-bottom: 2rem;
}

.faq__search-input {
  width: 100%;
  padding: 1rem 1.5rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid var(--border, #e5e7eb);
  border-radius: 9999px;
  background: white;
  transition: all 0.3s;
}

.faq__search-input:focus {
  outline: none;
  border-color: var(--primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.faq__search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-secondary, #6b7280);
}

/* FAQ List */
.faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--faq-gap, 1rem);
}

/* FAQ Item - Accordion Style */
.faq__item {
  background: var(--bg-elevated, white);
  border-radius: var(--faq-radius, 0.75rem);
  overflow: hidden;
  transition: all 0.3s;
}

/* Card styles */
.faq__item--flat { background: transparent; box-shadow: none; }
.faq__item--elevated { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); }
.faq__item--outlined { border: 1px solid var(--border, #e5e7eb); }
.faq__item--glassmorphism { 
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.faq__item--highlight:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Question */
.faq__question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.3s;
}

.faq__question:hover {
  background: var(--bg-hover, #f9fafb);
}

.faq__question-text {
  flex: 1;
  font-size: var(--faq-question-size, 1.125rem);
  font-weight: var(--faq-question-weight, 600);
  color: var(--text, #1f2937);
  text-transform: var(--faq-question-transform, none);
}

.faq__question-icon {
  width: 24px;
  height: 24px;
  color: var(--primary, #3b82f6);
  transition: transform 0.3s;
  flex-shrink: 0;
}

.faq__item--open .faq__question-icon {
  transform: rotate(180deg);
}

/* Icon styles */
.faq__question-icon--plus {
  transition: transform 0.3s;
}

.faq__item--open .faq__question-icon--plus {
  transform: rotate(45deg);
}

/* Answer */
.faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq__item--open .faq__answer {
  max-height: 1000px;
}

.faq__answer-content {
  padding: 0 1.5rem 1.5rem;
  font-size: var(--faq-answer-size, 1rem);
  line-height: var(--faq-answer-height, 1.75);
  color: var(--text-secondary, #6b7280);
}

.faq__answer-content p {
  margin-bottom: 1rem;
}

.faq__answer-content p:last-child {
  margin-bottom: 0;
}

/* Divider */
.faq__item--divider {
  border-bottom: 1px solid var(--border, #e5e7eb);
}

.faq__item--divider:last-child {
  border-bottom: none;
}

/* Number */
.faq__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--primary-100, #dbeafe);
  color: var(--primary, #3b82f6);
  border-radius: 50%;
  font-weight: 600;
  margin-right: 1rem;
}

/* Chat Style Variant */
.faq--chat-style .faq__list {
  max-width: 700px;
  margin: 0 auto;
}

.faq--chat-style .faq__item {
  background: transparent;
  margin-bottom: 2rem;
}

.faq--chat-style .faq__question {
  background: var(--primary, #3b82f6);
  color: white;
  border-radius: 1.5rem 1.5rem 0.25rem 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
}

.faq--chat-style .faq__question-text {
  color: white;
}

.faq--chat-style .faq__answer {
  background: var(--bg-elevated, #f3f4f6);
  border-radius: 0.25rem 1.5rem 1.5rem 1.5rem;
  max-height: none;
  overflow: visible;
}

.faq--chat-style .faq__answer-content {
  padding: 1rem 1.5rem;
}

/* Timeline Variant */
.faq--timeline-vertical .faq__list {
  position: relative;
  padding-left: 3rem;
}

.faq--timeline-vertical .faq__list::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border, #e5e7eb);
}

.faq--timeline-vertical .faq__item::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 1.5rem;
  width: 12px;
  height: 12px;
  background: var(--primary, #3b82f6);
  border: 3px solid white;
  border-radius: 50%;
}

/* Grid Variant */
.faq--grid-modern .faq__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

/* CTA Section */
.faq__cta {
  margin-top: 4rem;
  text-align: center;
  padding: 3rem;
  background: var(--bg-elevated, #f9fafb);
  border-radius: 1rem;
}

.faq__cta--card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.faq__cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text, #1f2937);
}

.faq__cta-description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 1.5rem;
}

/* Feedback */
.faq__feedback {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border, #e5e7eb);
}

.faq__feedback-text {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.faq__feedback-buttons {
  display: flex;
  gap: 0.5rem;
}

.faq__feedback-btn {
  padding: 0.25rem 0.75rem;
  background: none;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.faq__feedback-btn:hover {
  background: var(--bg-hover, #f3f4f6);
}

.faq__feedback-btn--active {
  background: var(--primary, #3b82f6);
  color: white;
  border-color: var(--primary, #3b82f6);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq__item--animate {
  animation: slideDown 0.3s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .faq--grid-modern .faq__list {
    grid-template-columns: 1fr;
  }
  
  .faq__categories {
    flex-direction: column;
    width: 100%;
  }
  
  .faq__category {
    width: 100%;
    justify-content: center;
  }
}

/* Gap variants */
.faq--gap-sm .faq__list { gap: 0.5rem; }
.faq--gap-md .faq__list { gap: 1rem; }
.faq--gap-lg .faq__list { gap: 1.5rem; }
.faq--gap-xl .faq__list { gap: 2rem; }

/* Padding variants */
.faq--padding-none { padding: 0; }
.faq--padding-sm { padding: 2rem 0; }
.faq--padding-md { padding: 3rem 0; }
.faq--padding-lg { padding: 4rem 0; }
.faq--padding-xl { padding: 6rem 0; }

/* Border radius variants */
.faq--radius-none .faq__item { border-radius: 0; }
.faq--radius-sm .faq__item { border-radius: 0.25rem; }
.faq--radius-md .faq__item { border-radius: 0.5rem; }
.faq--radius-lg .faq__item { border-radius: 0.75rem; }
.faq--radius-xl .faq__item { border-radius: 1rem; }`;
  }

  getRequiredAssets() {
    logger.debug('FAQRendererV3', 'getRequiredAssets', 'Aucun asset requis');
    return [];
  }

  renderPreview(data: FAQData): string {
    logger.debug('FAQRendererV3', 'renderPreview', 'Génération preview', {
      variant: data.variant,
      itemsCount: data.items.length
    });
    
    return `
<div class="faq-preview">
  <h3>${data.title}</h3>
  <p>${data.items.length} questions - ${data.variant}</p>
</div>`;
  }

  render(data: FAQData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('FAQRendererV3', 'render', '🎨 Début du rendu FAQ', {
      variant: data.variant,
      itemsCount: data.items.length,
      hasCategories: data.categories.enabled,
      hasSearch: data.search.enabled,
      hasFeedback: data.feedback.enabled
    });
    
    try {
      // Générer le HTML
      logger.debug('FAQRendererV3', 'render', 'Génération HTML');
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      logger.debug('FAQRendererV3', 'render', 'Génération CSS');
      const css = this.generateCSS(data);
      
      // Générer le JS
      logger.debug('FAQRendererV3', 'render', 'Génération JS');
      const js = this.generateJS(data);
      
      // Calculer les performances
      const renderTime = performance.now() - startTime;
      
      logger.info('FAQRendererV3', 'render', '✅ Rendu FAQ terminé', {
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
      logger.error('FAQRendererV3', 'render', '❌ Erreur lors du rendu', error as Error);
      
      return {
        html: '<div class="faq faq--error">Erreur de rendu</div>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'faq',
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

  private generateHTML(data: FAQData): string {
    logger.debug('FAQRendererV3', 'generateHTML', 'Génération structure HTML', {
      variant: data.variant,
      layout: data.layout
    });
    
    const classes = [
      'faq',
      `faq--${data.variant}`,
      `faq--container-${data.layout.containerWidth}`,
      `faq--gap-${data.layout.gap}`,
      `faq--padding-${data.styles.padding || 'lg'}`,
      `faq--radius-${data.styles.borderRadius || 'md'}`
    ].join(' ');

    return `
<section class="${classes}" id="faq" data-block="faq">
  <div class="faq__container">
    ${this.renderHeader(data)}
    ${data.search.enabled ? this.renderSearch(data) : ''}
    ${data.categories.enabled ? this.renderCategories(data) : ''}
    ${this.renderFAQList(data)}
    ${data.cta.enabled ? this.renderCTA(data.cta) : ''}
  </div>
</section>`;
  }

  private renderHeader(data: FAQData): string {
    if (!data.title && !data.subtitle && !data.description) return '';
    
    logger.debug('FAQRendererV3', 'renderHeader', 'Génération header');
    
    return `
<div class="faq__header faq__header--${data.layout.alignment}">
  ${data.title ? `<h2 class="faq__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="faq__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="faq__description">${this.escape(data.description)}</p>` : ''}
</div>`;
  }

  private renderSearch(data: FAQData): string {
    logger.debug('FAQRendererV3', 'renderSearch', 'Génération recherche', {
      style: data.search.style,
      position: data.search.position
    });
    
    return `
<div class="faq__search faq__search--${data.search.position}">
  <div style="position: relative;">
    <svg class="faq__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
    <input 
      type="search" 
      class="faq__search-input" 
      placeholder="${this.escape(data.search.placeholder)}"
      data-search-in="${data.search.searchIn.join(',')}"
      data-min-chars="${data.search.minChars}"
    />
  </div>
  <div class="faq__search-results" style="display: none;">
    <p class="faq__search-no-results">${this.escape(data.search.noResultsMessage)}</p>
  </div>
</div>`;
  }

  private renderCategories(data: FAQData): string {
    logger.debug('FAQRendererV3', 'renderCategories', 'Génération catégories', {
      style: data.categories.style,
      count: data.categories.items.length
    });
    
    return `
<div class="faq__categories faq__categories--${data.categories.style}">
  ${data.categories.showAll ? `
    <button class="faq__category faq__category--active" data-category="all">
      ${this.escape(data.categories.allLabel)}
      ${data.categories.showCount ? `<span class="faq__category-count">${data.items.length}</span>` : ''}
    </button>
  ` : ''}
  
  ${data.categories.items.map(cat => `
    <button class="faq__category" data-category="${cat.id}">
      ${cat.icon ? `<span class="faq__category-icon">${cat.icon}</span>` : ''}
      ${this.escape(cat.label)}
      ${data.categories.showCount && cat.count ? `<span class="faq__category-count">${cat.count}</span>` : ''}
    </button>
  `).join('')}
</div>`;
  }

  private renderFAQList(data: FAQData): string {
    logger.debug('FAQRendererV3', 'renderFAQList', 'Génération liste FAQ', {
      itemsCount: data.items.length,
      expandBehavior: data.display.expandBehavior
    });
    
    // Filtrer par catégorie par défaut si nécessaire
    let items = data.items;
    if (data.categories.enabled && data.categories.defaultCategory && data.categories.defaultCategory !== 'all') {
      items = data.items.filter(item => item.category === data.categories.defaultCategory);
    }
    
    return `
<div class="faq__list" data-expand-behavior="${data.display.expandBehavior}">
  ${items.map((item, index) => this.renderFAQItem(item, data, index)).join('')}
</div>`;
  }

  private renderFAQItem(item: any, data: FAQData, index: number): string {
    const delay = data.display.stagger ? index * data.display.animationDelay : 0;
    const isOpen = data.display.defaultExpanded.includes(item.id) || item.open;
    
    const classes = [
      'faq__item',
      `faq__item--${data.styles.cardStyle}`,
      data.display.highlightOnHover ? 'faq__item--highlight' : '',
      data.display.divider ? 'faq__item--divider' : '',
      isOpen ? 'faq__item--open' : '',
      data.display.animation !== 'none' ? 'faq__item--animate' : ''
    ].filter(Boolean).join(' ');
    
    const styles = data.display.animation !== 'none' 
      ? `animation-delay: ${delay}ms;` 
      : '';
    
    return `
<article class="${classes}" 
         style="${styles}" 
         data-category="${item.category || 'general'}"
         data-index="${index}">
  <button class="faq__question" aria-expanded="${isOpen ? 'true' : 'false'}">
    ${data.display.showNumber ? `
      <span class="faq__number">${index + 1}</span>
    ` : ''}
    
    <span class="faq__question-text">${this.escape(item.question)}</span>
    
    ${this.renderQuestionIcon(data.display.iconStyle)}
  </button>
  
  <div class="faq__answer">
    <div class="faq__answer-content">
      ${this.escape(item.answer)}
      
      ${item.cta ? `
        <a href="${item.cta.link}" class="faq__answer-link">
          ${this.escape(item.cta.text)}
        </a>
      ` : ''}
    </div>
    
    ${data.feedback.enabled ? this.renderFeedback(item, data) : ''}
  </div>
</article>`;
  }

  private renderQuestionIcon(style: string): string {
    switch (style) {
      case 'plus':
        return `
<svg class="faq__question-icon faq__question-icon--plus" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>`;
      case 'chevron':
        return `
<svg class="faq__question-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
</svg>`;
      case 'arrow':
        return `
<svg class="faq__question-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg>`;
      default:
        return `<span class="faq__question-icon">+</span>`;
    }
  }

  private renderFeedback(item: any, data: FAQData): string {
    return `
<div class="faq__feedback" data-item-id="${item.id}">
  <span class="faq__feedback-text">${this.escape(data.feedback.helpfulText)}</span>
  <div class="faq__feedback-buttons">
    <button class="faq__feedback-btn" data-feedback="yes">
      ${this.escape(data.feedback.yesText)}
    </button>
    <button class="faq__feedback-btn" data-feedback="no">
      ${this.escape(data.feedback.noText)}
    </button>
  </div>
  <span class="faq__feedback-thanks" style="display: none;">
    ${this.escape(data.feedback.thanksMessage)}
  </span>
</div>`;
  }

  private renderCTA(cta: any): string {
    return `
<div class="faq__cta faq__cta--${cta.style}">
  <h3 class="faq__cta-title">${this.escape(cta.title)}</h3>
  <p class="faq__cta-description">${this.escape(cta.description)}</p>
  <a href="${cta.buttonLink}" class="btn btn--${cta.buttonVariant} btn--lg">
    ${this.escape(cta.buttonText)}
  </a>
</div>`;
  }

  private generateCSS(data: FAQData): string {
    logger.debug('FAQRendererV3', 'generateCSS', 'Génération CSS spécifique');
    
    let css = '';
    
    // CSS des couleurs personnalisées
    if (data.styles.backgroundColor || data.styles.questionColor || data.styles.answerColor) {
      css += `
.faq {
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
}
${data.styles.questionColor ? `
.faq__question-text {
  color: ${data.styles.questionColor};
}` : ''}
${data.styles.answerColor ? `
.faq__answer-content {
  color: ${data.styles.answerColor};
}` : ''}`;
    }
    
    // CSS pour les tailles de police
    css += `
.faq {
  --faq-question-size: ${data.display.questionStyle.fontSize === 'sm' ? '1rem' : 
                         data.display.questionStyle.fontSize === 'md' ? '1.125rem' : 
                         data.display.questionStyle.fontSize === 'lg' ? '1.25rem' : '1.5rem'};
  --faq-question-weight: ${data.display.questionStyle.fontWeight};
  --faq-question-transform: ${data.display.questionStyle.textTransform};
  --faq-answer-size: ${data.display.answerStyle.fontSize === 'sm' ? '0.875rem' : 
                       data.display.answerStyle.fontSize === 'md' ? '1rem' : '1.125rem'};
  --faq-answer-height: ${data.display.answerStyle.lineHeight === 'tight' ? '1.25' : 
                         data.display.answerStyle.lineHeight === 'normal' ? '1.5' : '1.75'};
}`;
    
    return css;
  }

  private generateJS(data: FAQData): string {
    logger.debug('FAQRendererV3', 'generateJS', 'Génération JS', {
      hasSearch: data.search.enabled,
      hasCategories: data.categories.enabled,
      hasFeedback: data.feedback.enabled,
      expandBehavior: data.display.expandBehavior
    });
    
    let js = '';
    
    // Accordion behavior
    js += this.generateAccordionJS(data);
    
    // Search
    if (data.search.enabled) {
      js += this.generateSearchJS(data);
    }
    
    // Categories
    if (data.categories.enabled) {
      js += this.generateCategoriesJS(data);
    }
    
    // Feedback
    if (data.feedback.enabled) {
      js += this.generateFeedbackJS(data);
    }
    
    // Chat mode
    if (data.chatMode.enabled) {
      js += this.generateChatModeJS(data);
    }
    
    return js;
  }

  private generateAccordionJS(data: FAQData): string {
    return `
// FAQ Accordion
(function() {
  const faqList = document.querySelector('.faq__list');
  if (!faqList) return;
  
  const expandBehavior = faqList.dataset.expandBehavior || 'single';
  const items = faqList.querySelectorAll('.faq__item');
  const questions = faqList.querySelectorAll('.faq__question');
  
  questions.forEach((question, index) => {
    question.addEventListener('click', () => {
      const item = items[index];
      const isOpen = item.classList.contains('faq__item--open');
      
      // Close others if single expand
      if (expandBehavior === 'single' && !isOpen) {
        items.forEach(i => i.classList.remove('faq__item--open'));
        questions.forEach(q => q.setAttribute('aria-expanded', 'false'));
      }
      
      // Toggle current
      item.classList.toggle('faq__item--open');
      question.setAttribute('aria-expanded', !isOpen);
      
      // Smooth height animation
      const answer = item.querySelector('.faq__answer');
      if (answer) {
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
      }
    });
  });
  
  // Expand all if configured
  ${data.display.expandBehavior === 'all' ? `
  items.forEach(item => {
    item.classList.add('faq__item--open');
    const answer = item.querySelector('.faq__answer');
    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
  });
  ` : ''}
})();`;
  }

  private generateSearchJS(data: FAQData): string {
    return `
// FAQ Search
(function() {
  const searchInput = document.querySelector('.faq__search-input');
  if (!searchInput) return;
  
  const items = document.querySelectorAll('.faq__item');
  const noResults = document.querySelector('.faq__search-no-results');
  const minChars = parseInt(searchInput.dataset.minChars) || 3;
  const searchIn = (searchInput.dataset.searchIn || 'question,answer').split(',');
  let searchTimeout;
  
  function performSearch(query) {
    if (query.length < minChars && query.length > 0) return;
    
    let visibleCount = 0;
    const lowerQuery = query.toLowerCase();
    
    items.forEach(item => {
      const question = item.querySelector('.faq__question-text')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.faq__answer-content')?.textContent.toLowerCase() || '';
      
      let matches = false;
      if (searchIn.includes('question') && question.includes(lowerQuery)) matches = true;
      if (searchIn.includes('answer') && answer.includes(lowerQuery)) matches = true;
      
      if (!query || matches) {
        item.style.display = '';
        visibleCount++;
        
        ${data.search.highlightMatches ? `
        // Highlight matches
        if (query && matches) {
          // Implementation for highlighting
        }
        ` : ''}
      } else {
        item.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      noResults.parentElement.style.display = visibleCount === 0 && query ? 'block' : 'none';
    }
  }
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, ${data.search.debounceMs});
  });
})();`;
  }

  private generateCategoriesJS(data: FAQData): string {
    return `
// FAQ Categories
(function() {
  const categories = document.querySelectorAll('.faq__category');
  const items = document.querySelectorAll('.faq__item');
  
  if (!categories.length || !items.length) return;
  
  categories.forEach(category => {
    category.addEventListener('click', () => {
      const categoryId = category.dataset.category;
      
      // Update active category
      categories.forEach(c => c.classList.remove('faq__category--active'));
      category.classList.add('faq__category--active');
      
      // Filter items
      items.forEach((item, index) => {
        const itemCategory = item.dataset.category || 'general';
        
        if (categoryId === 'all' || itemCategory === categoryId) {
          item.style.display = '';
          item.style.animationDelay = (index * 50) + 'ms';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();`;
  }

  private generateFeedbackJS(data: FAQData): string {
    return `
// FAQ Feedback
(function() {
  const feedbackButtons = document.querySelectorAll('.faq__feedback-btn');
  
  feedbackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const feedback = btn.closest('.faq__feedback');
      const itemId = feedback.dataset.itemId;
      const value = btn.dataset.feedback;
      
      // Mark as active
      feedback.querySelectorAll('.faq__feedback-btn').forEach(b => {
        b.classList.remove('faq__feedback-btn--active');
      });
      btn.classList.add('faq__feedback-btn--active');
      
      // Show thanks message
      const thanks = feedback.querySelector('.faq__feedback-thanks');
      if (thanks) {
        feedback.querySelector('.faq__feedback-text').style.display = 'none';
        feedback.querySelector('.faq__feedback-buttons').style.display = 'none';
        thanks.style.display = 'block';
      }
      
      // Send feedback (implement your logic)
      console.log('FAQ Feedback:', { itemId, value });
    });
  });
})();`;
  }

  private generateChatModeJS(data: FAQData): string {
    return `
// FAQ Chat Mode
(function() {
  const chatItems = document.querySelectorAll('.faq--chat-style .faq__item');
  
  chatItems.forEach((item, index) => {
    // Simulate typing effect
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.animation = 'fadeIn 0.5s forwards';
    }, index * ${data.chatMode.typingDuration});
  });
})();`;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
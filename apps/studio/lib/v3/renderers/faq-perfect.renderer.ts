/**
 * FAQ Renderer V3 PERFECT - Version corrigée
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { faqDataSchema, faqDefaults, type FAQData } from '../schemas/blocks/faq';
import { logger } from '../core/logger';

export class FAQRendererV3Perfect extends BaseRendererV3<FAQData> {
  type = 'faq-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('FAQRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer FAQ V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<FAQData, FAQData> {
    return faqDataSchema.safeParse(data);
  }

  getDefaultData(): FAQData {
    return faqDefaults;
  }

  getBlockProps(): BlockProp[] {
    return super.getBlockProps();
  }

  getRequiredAssets(): string[] {
    return [];
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   FAQ V3 PERFECT - Styles magnifiques
   ======================================== */

.faq {
  position: relative;
  padding: var(--faq-padding, 6rem 0);
  overflow: hidden;
  background: var(--faq-bg, #ffffff);
  color: var(--faq-text, #1f2937);
}

.faq__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.faq__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.faq__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--faq-question-color, #1f2937);
}

.faq__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--faq-answer-color, #6b7280);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.faq__description {
  color: var(--faq-answer-color, #6b7280);
  line-height: 1.6;
}

/* Recherche */
.faq__search-wrapper {
  margin-top: 2rem;
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.faq__search {
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s;
}

.faq__search:focus {
  outline: none;
  border-color: var(--faq-accent, #667eea);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Catégories */
.faq__categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.faq__categories--tabs {
  border-bottom: 2px solid #e5e7eb;
  gap: 0;
}

.faq__category {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--faq-text, #6b7280);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.faq__categories--tabs .faq__category {
  border: none;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  padding: 1rem 1.5rem;
  margin-bottom: -2px;
}

.faq__category:hover {
  color: var(--faq-accent, #667eea);
  border-color: var(--faq-accent, #667eea);
}

.faq__category.active {
  background: var(--faq-accent, #667eea);
  color: white;
  border-color: var(--faq-accent, #667eea);
}

.faq__categories--tabs .faq__category.active {
  background: transparent;
  color: var(--faq-accent, #667eea);
  border-bottom-color: var(--faq-accent, #667eea);
}

.faq__category-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

/* Liste FAQ */
.faq__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ========================================
   VARIANTE ACCORDION CLASSIC
   ======================================== */
.faq--accordion-classic .faq__item {
  background: white;
  border-radius: var(--faq-radius, 1rem);
  overflow: hidden;
  box-shadow: var(--faq-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq--accordion-classic .faq__item:hover {
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.faq--accordion-classic .faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: var(--faq-question-size, 1.125rem);
  font-weight: var(--faq-question-weight, 600);
  color: var(--faq-question-color, #1f2937);
  transition: all 0.3s;
  gap: 1rem;
}

.faq--accordion-classic .faq__question:hover {
  color: var(--faq-accent, #667eea);
}

.faq--accordion-classic .faq__number {
  font-weight: 700;
  color: var(--faq-accent, #667eea);
  margin-right: 0.5rem;
}

.faq--accordion-classic .faq__question-text {
  flex: 1;
}

.faq--accordion-classic .faq__icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--faq-accent, #667eea);
  transition: transform 0.3s;
  flex-shrink: 0;
}

.faq--accordion-classic .faq__icon--left {
  order: -1;
}

.faq--accordion-classic .faq__item.active .faq__icon {
  transform: rotate(180deg);
}

.faq--accordion-classic .faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.faq--accordion-classic .faq__item.active .faq__answer {
  max-height: 800px;
  transition: max-height 0.3s ease-in;
}

.faq--accordion-classic .faq__answer-content {
  padding: 0 2rem 1.5rem;
  color: var(--faq-answer-color, #6b7280);
  line-height: var(--faq-answer-line-height, 1.625);
  font-size: var(--faq-answer-size, 1rem);
}

/* Item CTA */
.faq__item-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: var(--faq-accent, #667eea);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.faq__item-cta:hover {
  gap: 0.75rem;
  text-decoration: underline;
}

.faq__item-cta--button {
  background: var(--faq-accent, #667eea);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
}

.faq__item-cta--button:hover {
  background: var(--faq-accent-dark, #5a67d8);
  text-decoration: none;
}

/* Feedback */
.faq__feedback {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.faq__feedback-text {
  color: #6b7280;
}

.faq__feedback-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.875rem;
}

.faq__feedback-btn:hover {
  border-color: var(--faq-accent, #667eea);
  color: var(--faq-accent, #667eea);
}

.faq__feedback-btn.active {
  background: var(--faq-accent, #667eea);
  color: white;
  border-color: var(--faq-accent, #667eea);
}

/* ========================================
   AUTRES VARIANTES
   ======================================== */

/* Cards Expandable */
.faq--cards-expandable .faq__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.faq--cards-expandable .faq__item {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
}

.faq--cards-expandable .faq__item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* List Minimal */
.faq--list-minimal .faq__list {
  max-width: 800px;
  margin: 0 auto;
}

.faq--list-minimal .faq__item {
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem 0;
}

.faq--list-minimal .faq__item:last-child {
  border-bottom: none;
}

.faq--list-minimal summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--faq-question-color, #1f2937);
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq--list-minimal summary::-webkit-details-marker {
  display: none;
}

.faq--list-minimal summary::after {
  content: '+';
  font-size: 1.5rem;
  color: var(--faq-accent, #667eea);
  transition: transform 0.3s;
}

.faq--list-minimal details[open] summary::after {
  transform: rotate(45deg);
}

.faq--list-minimal .faq__answer {
  margin-top: 1rem;
  color: var(--faq-answer-color, #6b7280);
  line-height: 1.6;
}

/* Chat Style */
.faq--chat-style .faq__list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.faq--chat-style .faq__item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq--chat-style .faq__question {
  align-self: flex-end;
  background: linear-gradient(135deg, var(--faq-accent, #667eea), #764ba2);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 1.5rem 1.5rem 0.25rem 1.5rem;
  max-width: 70%;
  font-weight: 500;
  box-shadow: 0 4px 20px -5px rgba(102, 126, 234, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.faq--chat-style .faq__question:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px -5px rgba(102, 126, 234, 0.4);
}

.faq--chat-style .faq__answer {
  align-self: flex-start;
  background: #f3f4f6;
  color: var(--faq-answer-color, #4b5563);
  padding: 1rem 1.5rem;
  border-radius: 1.5rem 1.5rem 1.5rem 0.25rem;
  max-width: 70%;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
}

.faq--chat-style .faq__item.active .faq__answer {
  opacity: 1;
  transform: translateY(0);
}

/* CTA Global */
.faq__cta {
  margin-top: 4rem;
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 1rem;
}

.faq__cta--card {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.faq__cta-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--faq-question-color, #1f2937);
}

.faq__cta-description {
  color: var(--faq-answer-color, #6b7280);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.faq__cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--faq-accent, #667eea);
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.faq__cta-button:hover {
  background: var(--faq-accent-dark, #5a67d8);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .faq__categories {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
  
  .faq__category {
    flex-shrink: 0;
  }
  
  .faq--cards-expandable .faq__list {
    grid-template-columns: 1fr;
  }
  
  .faq--chat-style .faq__question,
  .faq--chat-style .faq__answer {
    max-width: 85%;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .faq {
    background: var(--faq-bg-dark, #0f172a);
    color: var(--faq-text-dark, #e2e8f0);
  }
  
  .faq__item {
    background: var(--faq-card-dark, #1e293b);
  }
  
  .faq__question {
    color: var(--faq-question-color-dark, white);
  }
  
  .faq__answer-content {
    color: var(--faq-answer-color-dark, #cbd5e1);
  }
  
  .faq__search {
    background: var(--faq-card-dark, #1e293b);
    border-color: #334155;
    color: white;
  }
  
  .faq__category {
    border-color: #334155;
    color: #94a3b8;
  }
  
  .faq__category:hover {
    border-color: var(--faq-accent, #667eea);
    color: var(--faq-accent, #667eea);
  }
}`;
  }

  getDefaultJS(): string {
    return `
// ========================================
// FAQ V3 PERFECT - JavaScript simplifié
// ========================================

class FAQV3Perfect {
  constructor(element) {
    this.element = element;
    this.variant = element.classList[1]?.replace('faq--', '') || 'accordion-classic';
    this.items = element.querySelectorAll('.faq__item');
    this.searchInput = element.querySelector('.faq__search');
    this.categories = element.querySelectorAll('.faq__category');
    this.feedbackBtns = element.querySelectorAll('.faq__feedback-btn');
    
    this.init();
  }
  
  init() {
    console.log('🎯 Initialisation FAQ V3 Perfect:', this.variant);
    
    // Comportement selon la variante
    switch(this.variant) {
      case 'accordion-classic':
      case 'cards-expandable':
        this.initAccordion();
        break;
      case 'chat-style':
        this.initChatStyle();
        break;
      case 'tabs-grouped':
        this.initTabs();
        break;
    }
    
    // Fonctionnalités communes
    if (this.searchInput) {
      this.initSearch();
    }
    if (this.categories.length > 0) {
      this.initCategories();
    }
    if (this.feedbackBtns.length > 0) {
      this.initFeedback();
    }
  }
  
  initAccordion() {
    const expandBehavior = this.element.dataset.expandBehavior || 'single';
    
    this.items.forEach(item => {
      const question = item.querySelector('.faq__question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Comportement single : fermer les autres
        if (expandBehavior === 'single' && !isActive) {
          this.items.forEach(i => {
            i.classList.remove('active');
            const q = i.querySelector('.faq__question');
            if (q) q.setAttribute('aria-expanded', 'false');
          });
        }
        
        // Toggle l'item actuel
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
        
        // Animation de hauteur pour l'answer
        const answer = item.querySelector('.faq__answer');
        if (answer) {
          if (!isActive) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '';
          }
        }
      });
    });
  }
  
  initChatStyle() {
    this.items.forEach((item, index) => {
      const question = item.querySelector('.faq__question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        item.classList.add('active');
        
        // Animation de typing
        const answer = item.querySelector('.faq__answer');
        if (answer && !item.dataset.shown) {
          answer.style.opacity = '0';
          
          setTimeout(() => {
            answer.style.opacity = '1';
            item.dataset.shown = 'true';
          }, 300 + (index * 100));
        }
      });
    });
  }
  
  initTabs() {
    const tabs = this.element.querySelectorAll('.faq__tab');
    const panels = this.element.querySelectorAll('.faq__panel');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Update active states
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        if (panels[index]) {
          panels[index].classList.add('active');
        }
      });
    });
    
    // Active first tab by default
    if (tabs[0]) tabs[0].click();
  }
  
  initSearch() {
    let searchTimeout;
    const minChars = parseInt(this.element.dataset.searchMinChars) || 3;
    
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      
      searchTimeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        
        if (query.length === 0) {
          this.clearSearch();
          return;
        }
        
        if (query.length < minChars) return;
        
        this.performSearch(query);
      }, 300);
    });
  }
  
  performSearch(query) {
    let hasResults = false;
    
    this.items.forEach(item => {
      const question = item.querySelector('.faq__question-text')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.faq__answer-content')?.textContent.toLowerCase() || '';
      const tags = item.dataset.tags?.toLowerCase() || '';
      
      const matches = question.includes(query) || 
                      answer.includes(query) || 
                      tags.includes(query);
      
      if (matches) {
        item.style.display = '';
        hasResults = true;
      } else {
        item.style.display = 'none';
      }
    });
    
    // Show no results message
    this.toggleNoResults(!hasResults);
  }
  
  clearSearch() {
    this.items.forEach(item => {
      item.style.display = '';
    });
    this.toggleNoResults(false);
  }
  
  toggleNoResults(show) {
    let noResultsEl = this.element.querySelector('.faq__no-results');
    
    if (show && !noResultsEl) {
      noResultsEl = document.createElement('div');
      noResultsEl.className = 'faq__no-results';
      noResultsEl.textContent = 'Aucune question ne correspond à votre recherche.';
      noResultsEl.style.cssText = 'text-align: center; padding: 3rem; color: #6b7280;';
      this.element.querySelector('.faq__list').appendChild(noResultsEl);
    } else if (!show && noResultsEl) {
      noResultsEl.remove();
    }
  }
  
  initCategories() {
    this.categories.forEach(cat => {
      cat.addEventListener('click', () => {
        const categoryId = cat.dataset.category;
        
        // Update active state
        this.categories.forEach(c => c.classList.remove('active'));
        cat.classList.add('active');
        
        // Filter items
        this.filterByCategory(categoryId);
      });
    });
  }
  
  filterByCategory(categoryId) {
    this.items.forEach(item => {
      const itemCategory = item.dataset.category || 'general';
      
      if (categoryId === 'all' || itemCategory === categoryId) {
        item.style.display = '';
        item.style.animation = 'fadeIn 0.3s ease';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  initFeedback() {
    this.feedbackBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.item;
        const isYes = btn.classList.contains('faq__feedback-btn--yes');
        
        // Toggle active state
        const siblingBtn = btn.parentElement.querySelector(
          isYes ? '.faq__feedback-btn--no' : '.faq__feedback-btn--yes'
        );
        
        btn.classList.add('active');
        if (siblingBtn) siblingBtn.classList.remove('active');
        
        // Show thanks message
        const feedback = btn.closest('.faq__feedback');
        if (feedback && !feedback.dataset.thanked) {
          feedback.dataset.thanked = 'true';
          
          const thanks = document.createElement('span');
          thanks.className = 'faq__feedback-thanks';
          thanks.textContent = 'Merci pour votre retour !';
          thanks.style.cssText = 'margin-left: 1rem; color: #10b981; font-weight: 500;';
          feedback.appendChild(thanks);
          
          setTimeout(() => {
            thanks.style.opacity = '0';
            setTimeout(() => thanks.remove(), 300);
          }, 2000);
        }
        
        // Send feedback (in real app)
        console.log('Feedback:', { itemId, helpful: isYes });
      });
    });
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq').forEach(element => {
    new FAQV3Perfect(element);
  });
});`;
  }

  render(data: FAQData, context: RenderContext): RenderResult {
    logger.info('FAQRendererV3Perfect', 'render', '🎨 Rendu du bloc FAQ', { variant: data.variant });

    const validatedData = this.validate(data);
    if (!validatedData.success) {
      logger.error('FAQRendererV3Perfect', 'render', '❌ Données invalides', validatedData.error);
      return {
        html: '<div class="error">Erreur de validation des données FAQ</div>',
        css: '',
        js: '',
        assets: [],
        errors: [{ 
          message: 'Erreur de validation des données FAQ',
          blockId: this.type,
          fallbackUsed: false
        }],
        warnings: undefined
      };
    }

    const faq = validatedData.data;

    // Header
    const header = `
      <div class="faq__header">
        ${faq.title ? `<h2 class="faq__title">${this.escapeHtml(faq.title)}</h2>` : ''}
        ${faq.subtitle ? `<p class="faq__subtitle">${this.escapeHtml(faq.subtitle)}</p>` : ''}
        ${faq.description ? `<p class="faq__description">${this.escapeHtml(faq.description)}</p>` : ''}
        ${faq.search?.enabled ? `
          <div class="faq__search-wrapper">
            <input type="text" 
                   class="faq__search" 
                   placeholder="${this.escapeHtml(faq.search.placeholder)}"
                   aria-label="Rechercher dans la FAQ">
          </div>
        ` : ''}
      </div>
    `;

    // Rendu selon la variante
    let content = '';
    switch(faq.variant) {
      case 'accordion-classic':
        content = this.renderAccordionClassic(faq);
        break;
      case 'cards-expandable':
        content = this.renderCardsExpandable(faq);
        break;
      case 'list-minimal':
        content = this.renderListMinimal(faq);
        break;
      case 'tabs-grouped':
        content = this.renderTabsGrouped(faq);
        break;
      case 'grid-modern':
        content = this.renderGridModern(faq);
        break;
      case 'timeline-vertical':
        content = this.renderTimelineVertical(faq);
        break;
      case 'chat-style':
        content = this.renderChatStyle(faq);
        break;
      case 'knowledge-base':
        content = this.renderKnowledgeBase(faq);
        break;
      default:
        content = this.renderAccordionClassic(faq);
    }

    const html = `
      <section class="faq faq--${faq.variant}" 
               id="faq"
               data-expand-behavior="${faq.display.expandBehavior}"
               data-search-min-chars="${faq.search?.minChars || 3}">
        <div class="faq__container">
          ${header}
          ${content}
        </div>
      </section>
    `;

    return {
      html,
      css: this.getDefaultCSS() + this.generateCustomCSS(faq),
      js: this.getDefaultJS(),
      assets: [],
      errors: undefined,
      warnings: undefined
    };
  }

  private renderAccordionClassic(data: FAQData): string {
    const shouldExpand = (index: number, item: any) => {
      if (data.display.expandBehavior === 'all') return true;
      if (data.display.defaultExpanded?.includes(item.id)) return true;
      return false;
    };

    const items = data.items.map((item, index) => `
      <div class="faq__item ${shouldExpand(index, item) || item.open ? 'active' : ''}" 
           data-id="${item.id}"
           data-category="${item.category || 'general'}"
           data-tags="${item.tags?.join(',') || ''}">
        <button class="faq__question" aria-expanded="${shouldExpand(index, item) || item.open ? 'true' : 'false'}">
          ${data.display.showNumber ? `<span class="faq__number">${index + 1}.</span>` : ''}
          <span class="faq__question-text">${this.escapeHtml(item.question)}</span>
          ${data.display.showIcon ? `
            <span class="faq__icon faq__icon--${data.display.iconPosition}">
              ${this.getIcon(data.display.iconStyle)}
            </span>
          ` : ''}
        </button>
        <div class="faq__answer">
          <div class="faq__answer-content">
            ${item.answer}
            ${item.cta ? `
              <a href="${item.cta.link}" class="faq__item-cta faq__item-cta--${item.cta.style}">
                ${item.cta.text}
              </a>
            ` : ''}
          </div>
          ${data.feedback?.enabled ? this.renderFeedback(item) : ''}
        </div>
      </div>
    `).join('');

    return `
      ${data.categories?.enabled ? this.renderCategories(data) : ''}
      <div class="faq__list">${items}</div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderCardsExpandable(data: FAQData): string {
    const items = data.items.map((item, index) => `
      <div class="faq__item" 
           data-id="${item.id}"
           data-category="${item.category || 'general'}">
        <div class="faq__question">
          ${this.getDefaultIcon(index)}
          <span>${this.escapeHtml(item.question)}</span>
        </div>
        <div class="faq__answer">
          ${item.answer}
        </div>
      </div>
    `).join('');

    return `
      ${data.categories?.enabled ? this.renderCategories(data) : ''}
      <div class="faq__list">${items}</div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderListMinimal(data: FAQData): string {
    const items = data.items.map((item) => `
      <details class="faq__item" 
               data-id="${item.id}"
               data-category="${item.category || 'general'}">
        <summary class="faq__question">
          ${this.escapeHtml(item.question)}
        </summary>
        <div class="faq__answer">
          ${item.answer}
        </div>
      </details>
    `).join('');

    return `
      ${data.categories?.enabled ? this.renderCategories(data) : ''}
      <div class="faq__list">${items}</div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderTabsGrouped(data: FAQData): string {
    const tabs = data.items.map((item, index) => `
      <button class="faq__tab ${index === 0 ? 'active' : ''}" data-index="${index}">
        ${this.escapeHtml(item.question)}
      </button>
    `).join('');

    const panels = data.items.map((item, index) => `
      <div class="faq__panel ${index === 0 ? 'active' : ''}">
        <h3>${this.escapeHtml(item.question)}</h3>
        <div class="faq__answer">${item.answer}</div>
      </div>
    `).join('');

    return `
      <div class="faq--tabs-grouped">
        <aside class="faq__sidebar">
          <div class="faq__tabs">${tabs}</div>
        </aside>
        <div class="faq__content">${panels}</div>
      </div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderGridModern(data: FAQData): string {
    const items = data.items.map((item, index) => `
      <div class="faq__item" data-id="${item.id}">
        <div class="faq__card">
          <div class="faq__question">
            ${this.getDefaultIcon(index)}
            <h3>${this.escapeHtml(item.question)}</h3>
          </div>
          <div class="faq__answer">
            ${item.answer}
          </div>
        </div>
      </div>
    `).join('');

    return `
      ${data.categories?.enabled ? this.renderCategories(data) : ''}
      <div class="faq__list" style="grid-template-columns: repeat(${data.layout.columns}, 1fr);">
        ${items}
      </div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderTimelineVertical(data: FAQData): string {
    const items = data.items.map((item, index) => `
      <div class="faq__item" data-number="${String(index + 1).padStart(2, '0')}">
        <div class="faq__question">
          ${this.escapeHtml(item.question)}
        </div>
        <div class="faq__answer">
          ${item.answer}
        </div>
      </div>
    `).join('');

    return `
      <div class="faq__list faq__list--timeline">${items}</div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderChatStyle(data: FAQData): string {
    const items = data.items.map((item) => `
      <div class="faq__item" data-id="${item.id}">
        <div class="faq__question">
          ${this.escapeHtml(item.question)}
        </div>
        <div class="faq__answer">
          ${data.chatMode?.enabled && data.chatMode.botName ? `
            <div class="faq__bot-name">${data.chatMode.botName}</div>
          ` : ''}
          ${item.answer}
        </div>
      </div>
    `).join('');

    return `
      <div class="faq__list">${items}</div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderKnowledgeBase(data: FAQData): string {
    // Group items by category
    const categorizedItems = this.groupByCategory(data.items);
    
    return `
      <div class="faq__knowledge-base">
        ${data.categories?.enabled ? `
          <aside class="faq__sidebar">
            ${this.renderCategories(data)}
          </aside>
        ` : ''}
        <div class="faq__content">
          ${Object.entries(categorizedItems).map(([category, items]: [string, any[]]) => `
            <section class="faq__category-section" data-category="${category}">
              <h3 class="faq__category-title">${this.getCategoryLabel(category, data)}</h3>
              <div class="faq__category-items">
                ${items.map(item => `
                  <article class="faq__item" data-id="${item.id}">
                    <h4 class="faq__question">${this.escapeHtml(item.question)}</h4>
                    <div class="faq__answer">${item.answer}</div>
                    ${item.tags?.length ? `
                      <div class="faq__tags">
                        ${item.tags.map((tag: string) => `
                          <span class="faq__tag">${tag}</span>
                        `).join('')}
                      </div>
                    ` : ''}
                  </article>
                `).join('')}
              </div>
            </section>
          `).join('')}
        </div>
      </div>
      ${data.cta?.enabled ? this.renderCTA(data.cta) : ''}
    `;
  }

  private renderCategories(data: FAQData): string {
    if (!data.categories?.enabled) return '';
    
    return `
      <nav class="faq__categories faq__categories--${data.categories.style}" role="tablist">
        ${data.categories.items.map(cat => `
          <button class="faq__category ${cat.id === data.categories?.defaultCategory ? 'active' : ''}" 
                  data-category="${cat.id}"
                  role="tab"
                  aria-selected="${cat.id === data.categories?.defaultCategory ? 'true' : 'false'}">
            ${cat.icon || ''} ${cat.label}
            ${data.categories?.showCount && cat.count ? `
              <span class="faq__category-count">${cat.count}</span>
            ` : ''}
          </button>
        `).join('')}
      </nav>
    `;
  }

  private renderFeedback(item: any): string {
    return `
      <div class="faq__feedback">
        <span class="faq__feedback-text">${this.escapeHtml(item.feedbackText || 'Cette réponse vous a-t-elle aidé ?')}</span>
        <button class="faq__feedback-btn faq__feedback-btn--yes" 
                data-item="${item.id}"
                aria-label="Oui, cette réponse m'a aidé">
          👍 ${item.yesText || 'Oui'}
        </button>
        <button class="faq__feedback-btn faq__feedback-btn--no" 
                data-item="${item.id}"
                aria-label="Non, cette réponse ne m'a pas aidé">
          👎 ${item.noText || 'Non'}
        </button>
      </div>
    `;
  }

  private renderCTA(cta: any): string {
    return `
      <div class="faq__cta faq__cta--${cta.style}">
        ${cta.title ? `<h3 class="faq__cta-title">${this.escapeHtml(cta.title)}</h3>` : ''}
        ${cta.description ? `<p class="faq__cta-description">${this.escapeHtml(cta.description)}</p>` : ''}
        <a href="${cta.buttonLink}" 
           class="faq__cta-button faq__cta-button--${cta.buttonVariant}">
          ${this.escapeHtml(cta.buttonText)}
        </a>
      </div>
    `;
  }

  private generateCustomCSS(data: FAQData): string {
    let css = '\n/* Custom FAQ Styles */\n';
    
    // Variables CSS personnalisées
    if (data.styles) {
      const vars: string[] = [];
      if (data.styles.backgroundColor) vars.push(`--faq-bg: ${data.styles.backgroundColor}`);
      if (data.styles.questionColor) vars.push(`--faq-question-color: ${data.styles.questionColor}`);
      if (data.styles.answerColor) vars.push(`--faq-answer-color: ${data.styles.answerColor}`);
      if (data.styles.accentColor) vars.push(`--faq-accent: ${data.styles.accentColor}`);
      
      if (vars.length > 0) {
        css += `.faq--${data.variant} {\n  ${vars.join(';\n  ')};\n}\n`;
      }
    }

    // Styles des questions
    if (data.display?.questionStyle) {
      const qs = data.display.questionStyle;
      const fontSize = {
        sm: '0.875rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem'
      }[qs.fontSize] || '1.125rem';

      const fontWeight = {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }[qs.fontWeight] || 600;

      css += `.faq--${data.variant} .faq__question {
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  text-transform: ${qs.textTransform};
}\n`;
    }

    // Styles des réponses
    if (data.display?.answerStyle) {
      const as = data.display.answerStyle;
      const fontSize = {
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem'
      }[as.fontSize] || '1rem';

      const lineHeight = {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.625
      }[as.lineHeight] || 1.625;

      css += `.faq--${data.variant} .faq__answer-content {
  font-size: ${fontSize};
  line-height: ${lineHeight};
}\n`;
    }

    return css;
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  private getIcon(style: string): string {
    const icons: Record<string, string> = {
      plus: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
      chevron: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
      arrow: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      custom: '❓'
    };
    return icons[style] || icons.plus;
  }

  private getDefaultIcon(index: number): string {
    const icons = ['🤔', '💡', '📝', '🎯', '🚀', '⚡', '🔧', '📊'];
    return icons[index % icons.length];
  }

  private groupByCategory(items: any[]): Record<string, any[]> {
    return items.reduce((acc, item) => {
      const category = item.category || 'general';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  }

  private getCategoryLabel(categoryId: string, data: FAQData): string {
    const category = data.categories?.items.find(cat => cat.id === categoryId);
    return category?.label || categoryId;
  }
}

export const faqRendererV3Perfect = new FAQRendererV3Perfect();
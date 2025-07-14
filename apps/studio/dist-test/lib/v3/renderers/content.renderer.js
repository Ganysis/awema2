"use strict";
/**
 * Content Renderer V3 - Rendu robuste avec logs détaillés
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRendererV3 = void 0;
const content_1 = require("../schemas/blocks/content");
const logger_1 = require("../core/logger");
class ContentRendererV3 {
    constructor() {
        this.type = 'content-ultra-modern';
        this.version = '3.0.0';
        logger_1.logger.info('ContentRendererV3', 'constructor', '🚀 Initialisation du renderer Content V3');
    }
    validate(data) {
        logger_1.logger.debug('ContentRendererV3', 'validate', 'Validation des données', {
            hasData: !!data,
            dataType: typeof data
        });
        const result = content_1.contentDataSchema.safeParse(data);
        if (!result.success) {
            logger_1.logger.warn('ContentRendererV3', 'validate', 'Validation échouée', {
                errors: result.error.errors
            });
        }
        else {
            logger_1.logger.info('ContentRendererV3', 'validate', '✅ Validation réussie', {
                type: result.data.type,
                hasAnimation: result.data.animation.enabled
            });
        }
        return result;
    }
    getDefaultData() {
        logger_1.logger.debug('ContentRendererV3', 'getDefaultData', 'Retour des données par défaut');
        return content_1.contentDefaults;
    }
    getDefaultCSS() {
        logger_1.logger.debug('ContentRendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
        return `
/* Content Base Styles */
.content {
  position: relative;
  padding: var(--content-padding, 4rem) 0;
  overflow: hidden;
}

.content__container {
  max-width: var(--content-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.content--container-full .content__container { max-width: 100%; }
.content--container-wide .content__container { max-width: 1400px; }
.content--container-normal .content__container { max-width: 1200px; }
.content--container-narrow .content__container { max-width: 900px; }

/* Header */
.content__header {
  margin-bottom: 3rem;
}

.content__header--left { text-align: left; }
.content__header--center { text-align: center; }
.content__header--right { text-align: right; }

.content__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--heading-color, #1f2937);
}

.content__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.content__description {
  font-size: 1.125rem;
  color: var(--text-secondary, #6b7280);
  max-width: 800px;
  margin: 0 auto;
}

/* Text-Image Layout */
.content__text-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.content__text-image--left { direction: ltr; }
.content__text-image--right { direction: rtl; }
.content__text-image--center {
  grid-template-columns: 1fr;
  text-align: center;
}

.content__text-image-content,
.content__text-image-media {
  direction: ltr;
}

.content__text-image-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-color, #4b5563);
  margin-bottom: 2rem;
  white-space: pre-line;
}

.content__text-image-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.content__text-image-feature {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.content__text-image-feature-icon {
  color: var(--accent-color, #3b82f6);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.content__text-image img {
  width: 100%;
  height: auto;
  border-radius: var(--content-radius, 1rem);
}

.content__text-image img.rounded { border-radius: 1rem; }
.content__text-image img.circle { border-radius: 50%; }
.content__text-image img.square { border-radius: 0; }
.content__text-image img.shadow { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }

/* Timeline */
.content__timeline {
  position: relative;
  padding: 2rem 0;
}

.content__timeline--vertical {
  padding-left: 3rem;
}

.content__timeline--vertical::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border, #e5e7eb);
}

.content__timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.content__timeline-item:last-child {
  padding-bottom: 0;
}

.content__timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 2rem;
  height: 2rem;
  background: var(--accent-color, #3b82f6);
  border: 4px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.content__timeline-date {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.content__timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--heading-color, #1f2937);
}

.content__timeline-description {
  color: var(--text-color, #4b5563);
  line-height: 1.6;
}

/* Accordion */
.content__accordion-item {
  border-bottom: 1px solid var(--border, #e5e7eb);
  padding: 1rem 0;
}

.content__accordion-item:last-child {
  border-bottom: none;
}

.content__accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s;
}

.content__accordion-header:hover {
  color: var(--accent-color, #3b82f6);
}

.content__accordion-title {
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.content__accordion-icon {
  transition: transform 0.3s;
}

.content__accordion-item--open .content__accordion-icon {
  transform: rotate(180deg);
}

.content__accordion-content {
  padding-top: 1rem;
  color: var(--text-color, #4b5563);
  line-height: 1.6;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.content__accordion-item--open .content__accordion-content {
  max-height: 500px;
}

/* Tabs */
.content__tabs-nav {
  display: flex;
  border-bottom: 2px solid var(--border, #e5e7eb);
  margin-bottom: 2rem;
}

.content__tab {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary, #6b7280);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.content__tab:hover {
  color: var(--text, #1f2937);
}

.content__tab--active {
  color: var(--accent-color, #3b82f6);
}

.content__tab--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-color, #3b82f6);
}

.content__tab-panels {
  position: relative;
}

.content__tab-panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.content__tab-panel--active {
  display: block;
}

/* Quote */
.content__quote {
  position: relative;
  padding: 3rem;
  text-align: center;
}

.content__quote--simple {
  border-left: 4px solid var(--accent-color, #3b82f6);
  text-align: left;
  padding: 1.5rem 2rem;
}

.content__quote--card {
  background: var(--bg-elevated, white);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.content__quote-icon {
  font-size: 3rem;
  color: var(--accent-color, #3b82f6);
  opacity: 0.2;
  margin-bottom: 1rem;
}

.content__quote-text {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--text, #1f2937);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.content__quote-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.content__quote-author img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.content__quote-author-name {
  font-weight: 600;
  color: var(--text, #1f2937);
}

.content__quote-author-role {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

/* Stats */
.content__stats {
  display: grid;
  gap: 2rem;
  margin: 2rem 0;
}

.content__stats--3 { grid-template-columns: repeat(3, 1fr); }
.content__stats--4 { grid-template-columns: repeat(4, 1fr); }
.content__stats--5 { grid-template-columns: repeat(5, 1fr); }
.content__stats--6 { grid-template-columns: repeat(6, 1fr); }

.content__stat {
  text-align: center;
}

.content__stat--cards {
  background: var(--bg-elevated, white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.content__stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color, #3b82f6);
}

.content__stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text, #1f2937);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.content__stat-label {
  font-size: 1rem;
  color: var(--text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.content__stat-description {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

/* Before/After */
.content__before-after {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 1rem;
}

.content__before-after-slider {
  position: relative;
  cursor: col-resize;
}

.content__before-after-image {
  display: block;
  width: 100%;
  height: auto;
}

.content__before-after-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.content__before-after-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
  cursor: col-resize;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.content__before-after-handle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.content__before-after-label {
  position: absolute;
  top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
}

.content__before-after-label--before { left: 1rem; }
.content__before-after-label--after { right: 1rem; }

/* Process */
.content__process {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.content__process--vertical {
  flex-direction: column;
}

.content__process-item {
  flex: 1;
  position: relative;
  text-align: center;
}

.content__process-number {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: var(--accent-color, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 50%;
}

.content__process-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--heading-color, #1f2937);
}

.content__process-description {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.content__process-connector {
  position: absolute;
  top: 30px;
  left: 100%;
  width: calc(100% - 60px);
  height: 2px;
  background: var(--border, #e5e7eb);
  z-index: -1;
}

.content__process-item:last-child .content__process-connector {
  display: none;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .content__text-image {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .content__stats {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  .content__process {
    flex-direction: column;
  }
  
  .content__process-connector {
    display: none;
  }
}

/* Gap variants */
.content--gap-none { gap: 0; }
.content--gap-sm { gap: 1rem; }
.content--gap-md { gap: 2rem; }
.content--gap-lg { gap: 3rem; }
.content--gap-xl { gap: 4rem; }

/* Padding variants */
.content--padding-none { padding: 0; }
.content--padding-sm { padding: 2rem 0; }
.content--padding-md { padding: 3rem 0; }
.content--padding-lg { padding: 4rem 0; }
.content--padding-xl { padding: 6rem 0; }`;
    }
    getRequiredAssets() {
        logger_1.logger.debug('ContentRendererV3', 'getRequiredAssets', 'Aucun asset requis');
        return [];
    }
    renderPreview(data) {
        logger_1.logger.debug('ContentRendererV3', 'renderPreview', 'Génération preview', {
            type: data.type
        });
        return `
<div class="content-preview">
  <h3>${data.title || 'Content'}</h3>
  <p>Type: ${data.type}</p>
</div>`;
    }
    render(data, context) {
        const startTime = performance.now();
        logger_1.logger.info('ContentRendererV3', 'render', '🎨 Début du rendu Content', {
            type: data.type,
            hasAnimation: data.animation.enabled,
            hasContext: !!context
        });
        try {
            // Générer le HTML
            logger_1.logger.debug('ContentRendererV3', 'render', 'Génération HTML');
            const html = this.generateHTML(data);
            // Générer le CSS spécifique
            logger_1.logger.debug('ContentRendererV3', 'render', 'Génération CSS');
            const css = this.generateCSS(data);
            // Générer le JS si nécessaire
            logger_1.logger.debug('ContentRendererV3', 'render', 'Génération JS');
            const js = this.generateJS(data);
            // Calculer les performances
            const renderTime = performance.now() - startTime;
            logger_1.logger.info('ContentRendererV3', 'render', '✅ Rendu Content terminé', {
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
        }
        catch (error) {
            logger_1.logger.error('ContentRendererV3', 'render', '❌ Erreur lors du rendu', error);
            return {
                html: '<div class="content content--error">Erreur de rendu</div>',
                css: this.getDefaultCSS(),
                js: '',
                assets: [],
                errors: [{
                        blockId: 'content',
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
    generateHTML(data) {
        logger_1.logger.debug('ContentRendererV3', 'generateHTML', 'Génération structure HTML', {
            type: data.type,
            layout: data.layout
        });
        const classes = [
            'content',
            `content--type-${data.type}`,
            `content--container-${data.layout.containerWidth}`,
            `content--padding-${data.layout.padding}`,
            `content--gap-${data.layout.gap}`
        ].join(' ');
        return `
<section class="${classes}" id="content" data-block="content">
  ${this.renderBackground(data)}
  <div class="content__container">
    ${this.renderHeader(data)}
    ${this.renderContent(data)}
  </div>
</section>`;
    }
    renderBackground(data) {
        if (data.background.type === 'none')
            return '';
        let style = '';
        switch (data.background.type) {
            case 'color':
                style = `background-color: ${data.background.color};`;
                break;
            case 'gradient':
                if (data.background.gradient) {
                    style = `background: linear-gradient(${data.background.gradient.angle}deg, ${data.background.gradient.from}, ${data.background.gradient.to});`;
                }
                break;
            case 'pattern':
                // Pattern sera géré par CSS
                return `<div class="content__background content__background--pattern-${data.background.pattern?.type}"></div>`;
            case 'image':
                if (data.background.image) {
                    style = `background-image: url('${data.background.image.src}'); background-size: cover; background-position: center;`;
                }
                break;
        }
        return style ? `<div class="content__background" style="${style}"></div>` : '';
    }
    renderHeader(data) {
        if (!data.title && !data.subtitle && !data.description)
            return '';
        return `
<div class="content__header content__header--${data.layout.alignment}">
  ${data.title ? `<h2 class="content__title">${this.escape(data.title)}</h2>` : ''}
  ${data.subtitle ? `<p class="content__subtitle">${this.escape(data.subtitle)}</p>` : ''}
  ${data.description ? `<p class="content__description">${this.escape(data.description)}</p>` : ''}
</div>`;
    }
    renderContent(data) {
        logger_1.logger.debug('ContentRendererV3', 'renderContent', 'Rendu du contenu spécifique', {
            type: data.type
        });
        switch (data.type) {
            case 'text-image':
                return this.renderTextImage(data.textImage);
            case 'timeline':
                return this.renderTimeline(data.timeline);
            case 'accordion':
                return this.renderAccordion(data.accordion);
            case 'tabs':
                return this.renderTabs(data.tabs);
            case 'quote':
                return this.renderQuote(data.quote);
            case 'stats':
                return this.renderStats(data.stats);
            case 'before-after':
                return this.renderBeforeAfter(data.beforeAfter);
            case 'process':
                return this.renderProcess(data.process);
            default:
                return '';
        }
    }
    renderTextImage(textImage) {
        if (!textImage)
            return '';
        const contentHtml = `
<div class="content__text-image-content">
  <div class="content__text-image-text">${this.escape(textImage.content)}</div>
  ${textImage.features ? `
    <ul class="content__text-image-features">
      ${textImage.features.map((f) => `
        <li class="content__text-image-feature">
          ${f.icon ? `<span class="content__text-image-feature-icon">${f.icon}</span>` : ''}
          <span>${this.escape(f.text)}</span>
        </li>
      `).join('')}
    </ul>
  ` : ''}
  ${textImage.cta ? this.renderButton(textImage.cta) : ''}
</div>`;
        const mediaHtml = textImage.image ? `
<div class="content__text-image-media">
  <img src="${textImage.image.src}" 
       alt="${this.escape(textImage.image.alt || '')}" 
       class="${textImage.imageStyle}" />
</div>` : '';
        return `
<div class="content__text-image content__text-image--${textImage.layout}">
  ${textImage.layout === 'right' ? mediaHtml + contentHtml : contentHtml + mediaHtml}
</div>`;
    }
    renderTimeline(timeline) {
        if (!timeline || !timeline.items.length)
            return '';
        return `
<div class="content__timeline content__timeline--${timeline.style}">
  ${timeline.items.map((item) => `
    <div class="content__timeline-item">
      <div class="content__timeline-marker">
        ${item.icon || ''}
      </div>
      <div class="content__timeline-content">
        <div class="content__timeline-date">${this.escape(item.date)}</div>
        <h3 class="content__timeline-title">${this.escape(item.title)}</h3>
        <p class="content__timeline-description">${this.escape(item.description)}</p>
        ${item.link ? `<a href="${item.link.url}" class="content__timeline-link">${this.escape(item.link.text)}</a>` : ''}
      </div>
    </div>
  `).join('')}
</div>`;
    }
    renderAccordion(accordion) {
        if (!accordion || !accordion.items.length)
            return '';
        return `
<div class="content__accordion">
  ${accordion.items.map((item, index) => `
    <div class="content__accordion-item ${item.open || index === 0 ? 'content__accordion-item--open' : ''}" data-accordion-item>
      <div class="content__accordion-header" data-accordion-trigger>
        <h3 class="content__accordion-title">
          ${item.icon ? `<span>${item.icon}</span>` : ''}
          ${this.escape(item.title)}
        </h3>
        <span class="content__accordion-icon">▼</span>
      </div>
      <div class="content__accordion-content">
        ${this.escape(item.content)}
      </div>
    </div>
  `).join('')}
</div>`;
    }
    renderTabs(tabs) {
        if (!tabs || !tabs.items.length)
            return '';
        return `
<div class="content__tabs">
  <div class="content__tabs-nav">
    ${tabs.items.map((item, index) => `
      <button class="content__tab ${index === 0 ? 'content__tab--active' : ''}" 
              data-tab="${item.id}">
        ${item.icon ? `<span>${item.icon}</span>` : ''}
        ${this.escape(item.label)}
        ${item.badge ? `<span class="content__tab-badge">${this.escape(item.badge)}</span>` : ''}
      </button>
    `).join('')}
  </div>
  <div class="content__tab-panels">
    ${tabs.items.map((item, index) => `
      <div class="content__tab-panel ${index === 0 ? 'content__tab-panel--active' : ''}" 
           data-panel="${item.id}">
        ${this.escape(item.content)}
      </div>
    `).join('')}
  </div>
</div>`;
    }
    renderQuote(quote) {
        if (!quote || !quote.data)
            return '';
        const { data, style, showQuoteIcon, alignment } = quote;
        return `
<div class="content__quote content__quote--${style}">
  ${showQuoteIcon ? '<div class="content__quote-icon">"</div>' : ''}
  <blockquote class="content__quote-text">${this.escape(data.text)}</blockquote>
  <div class="content__quote-author">
    ${data.image ? `<img src="${data.image.src}" alt="${this.escape(data.author)}" />` : ''}
    <div>
      <div class="content__quote-author-name">${this.escape(data.author)}</div>
      ${data.role ? `<div class="content__quote-author-role">${this.escape(data.role)}</div>` : ''}
    </div>
  </div>
</div>`;
    }
    renderStats(stats) {
        if (!stats || !stats.items.length)
            return '';
        return `
<div class="content__stats content__stats--${stats.columns}">
  ${stats.items.map((stat) => `
    <div class="content__stat content__stat--${stats.style}">
      ${stat.icon && stats.showIcons ? `<div class="content__stat-icon">${stat.icon}</div>` : ''}
      <div class="content__stat-value" ${stats.animation && stats.countUp ? `data-count-to="${stat.value}"` : ''}>
        ${stat.prefix || ''}${stats.countUp ? '0' : stat.value}${stat.suffix || ''}
      </div>
      <div class="content__stat-label">${this.escape(stat.label)}</div>
      ${stat.description ? `<div class="content__stat-description">${this.escape(stat.description)}</div>` : ''}
    </div>
  `).join('')}
</div>`;
    }
    renderBeforeAfter(beforeAfter) {
        if (!beforeAfter || !beforeAfter.data)
            return '';
        const { data, style, sliderPosition, showLabels } = beforeAfter;
        return `
<div class="content__before-after">
  ${data.title ? `<h3>${this.escape(data.title)}</h3>` : ''}
  ${data.description ? `<p>${this.escape(data.description)}</p>` : ''}
  
  <div class="content__before-after-slider" data-before-after>
    <img src="${data.after.image.src}" 
         alt="${this.escape(data.after.image.alt || '')}" 
         class="content__before-after-image" />
    
    <div class="content__before-after-overlay" style="width: ${sliderPosition}%">
      <img src="${data.before.image.src}" 
           alt="${this.escape(data.before.image.alt || '')}" 
           class="content__before-after-image" />
    </div>
    
    <div class="content__before-after-handle" style="left: ${sliderPosition}%"></div>
    
    ${showLabels ? `
      <span class="content__before-after-label content__before-after-label--before">
        ${this.escape(data.before.label)}
      </span>
      <span class="content__before-after-label content__before-after-label--after">
        ${this.escape(data.after.label)}
      </span>
    ` : ''}
  </div>
</div>`;
    }
    renderProcess(process) {
        if (!process || !process.items.length)
            return '';
        return `
<div class="content__process content__process--${process.orientation}">
  ${process.items.map((item, index) => `
    <div class="content__process-item">
      <div class="content__process-number content__process-number--${process.numberStyle}">
        ${item.icon || item.number}
      </div>
      <h3 class="content__process-title">${this.escape(item.title)}</h3>
      <p class="content__process-description">${this.escape(item.description)}</p>
      ${process.showConnectors && index < process.items.length - 1 ?
            '<div class="content__process-connector"></div>' : ''}
    </div>
  `).join('')}
</div>`;
    }
    renderButton(button) {
        return `
<a href="${button.link}" class="btn btn--${button.variant} btn--${button.size}">
  ${this.escape(button.text)}
</a>`;
    }
    generateCSS(data) {
        logger_1.logger.debug('ContentRendererV3', 'generateCSS', 'Génération CSS spécifique');
        let css = '';
        // CSS des couleurs personnalisées
        if (data.styles.textColor || data.styles.headingColor || data.styles.accentColor) {
            css += `
.content {
  ${data.styles.textColor ? `--text-color: ${data.styles.textColor};` : ''}
  ${data.styles.headingColor ? `--heading-color: ${data.styles.headingColor};` : ''}
  ${data.styles.accentColor ? `--accent-color: ${data.styles.accentColor};` : ''}
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
.content img,
.content__quote--card,
.content__stat--cards {
  --content-radius: ${radiusMap[data.styles.borderRadius]};
}`;
        }
        return css;
    }
    generateJS(data) {
        logger_1.logger.debug('ContentRendererV3', 'generateJS', 'Génération JS');
        let js = '';
        // JS pour accordion
        if (data.type === 'accordion') {
            js += this.generateAccordionJS(data.accordion);
        }
        // JS pour tabs
        if (data.type === 'tabs') {
            js += this.generateTabsJS();
        }
        // JS pour stats avec countUp
        if (data.type === 'stats' && data.stats?.countUp) {
            js += this.generateStatsJS();
        }
        // JS pour before/after
        if (data.type === 'before-after') {
            js += this.generateBeforeAfterJS();
        }
        // JS pour animations
        if (data.animation.enabled) {
            js += this.generateAnimationJS(data.animation);
        }
        return js;
    }
    generateAccordionJS(accordion) {
        return `
// Content Accordion
(function() {
  const accordionItems = document.querySelectorAll('[data-accordion-item]');
  const expandBehavior = '${accordion?.expandBehavior || 'single'}';
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('content__accordion-item--open');
      
      if (expandBehavior === 'single') {
        accordionItems.forEach(i => i.classList.remove('content__accordion-item--open'));
      }
      
      if (!isOpen) {
        item.classList.add('content__accordion-item--open');
      } else {
        item.classList.remove('content__accordion-item--open');
      }
    });
  });
})();`;
    }
    generateTabsJS() {
        return `
// Content Tabs
(function() {
  const tabs = document.querySelectorAll('.content__tab');
  const panels = document.querySelectorAll('.content__tab-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      
      // Update active states
      tabs.forEach(t => t.classList.remove('content__tab--active'));
      panels.forEach(p => p.classList.remove('content__tab-panel--active'));
      
      tab.classList.add('content__tab--active');
      document.querySelector(\`[data-panel="\${targetId}"]\`).classList.add('content__tab-panel--active');
    });
  });
})();`;
    }
    generateStatsJS() {
        return `
// Content Stats CountUp
(function() {
  const stats = document.querySelectorAll('[data-count-to]');
  
  const animateValue = (elem, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      elem.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const value = parseInt(entry.target.dataset.countTo);
        animateValue(entry.target, 0, value, 2000);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
})();`;
    }
    generateBeforeAfterJS() {
        return `
// Content Before/After Slider
(function() {
  const slider = document.querySelector('[data-before-after]');
  if (!slider) return;
  
  const handle = slider.querySelector('.content__before-after-handle');
  const overlay = slider.querySelector('.content__before-after-overlay');
  let isDragging = false;
  
  const updatePosition = (x) => {
    const rect = slider.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    handle.style.left = position + '%';
    overlay.style.width = position + '%';
  };
  
  handle.addEventListener('mousedown', () => isDragging = true);
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) updatePosition(e.clientX);
  });
  
  document.addEventListener('mouseup', () => isDragging = false);
  
  // Touch support
  handle.addEventListener('touchstart', () => isDragging = true);
  
  document.addEventListener('touchmove', (e) => {
    if (isDragging) updatePosition(e.touches[0].clientX);
  });
  
  document.addEventListener('touchend', () => isDragging = false);
})();`;
    }
    generateAnimationJS(animation) {
        return `
// Content Animation
(function() {
  const elements = document.querySelectorAll('.content > *');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = '${animation.type} ${animation.duration}ms ease-out forwards';
        }, ${animation.stagger ? 'index * ' + animation.staggerDelay : 0});
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();`;
    }
    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
exports.ContentRendererV3 = ContentRendererV3;

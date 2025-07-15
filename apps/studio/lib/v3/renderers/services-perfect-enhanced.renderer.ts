/**
 * Services Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { servicesDataSchema, servicesDefaults, type ServicesData } from '../schemas/blocks/services';
import { logger } from '../core/logger';

export class ServicesRendererV3PerfectEnhanced extends BaseRendererV3<ServicesData> {
  type = 'services-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ServicesRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Services V3 PERFECT Enhanced');
  }

  validate(data: unknown): z.SafeParseReturnType<ServicesData, ServicesData> {
    return servicesDataSchema.safeParse(data);
  }

  getDefaultData(): ServicesData {
    return {
      ...servicesDefaults,
      variant: 'grid-cards' as any,
      visualVariant: 'modern' as any
    };
  }

  getBlockProps(): BlockProp[] {
    const baseProps = super.getBlockProps();
    
    // Filter out any existing variant properties to avoid duplicates
    const filteredProps = baseProps.filter(prop => prop.name !== 'variant' && prop.name !== 'visualVariant');
    
    // Add visual variant property at the beginning
    const visualVariantProp: BlockProp = {
      name: 'visualVariant',
      label: 'Style visuel',
      type: PropType.SELECT,
      required: false,
      defaultValue: 'modern',
      description: 'Choisissez le style visuel du bloc',
      options: [
        { value: 'modern', label: '🎨 Moderne - Gradient dynamique' },
        { value: 'minimal', label: '⚡ Minimaliste - Épuré et rapide' },
        { value: 'bold', label: '🔥 Audacieux - Impact visuel fort' },
        { value: 'elegant', label: '✨ Élégant - Glassmorphism subtil' }
      ],
      editorConfig: {
        control: EditorControl.RADIO,
        group: 'Visuel',
        order: 1
      }
    };

    // Insert visual variant as first property
    return [visualVariantProp, ...filteredProps];
  }

  render(data: ServicesData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    // Extract theme colors and typography
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    const visualVariant = (data as any).visualVariant || 'modern';
    
    logger.info('ServicesRendererV3PerfectEnhanced', 'render', '🎨 Début du rendu Services parfait', {
      variant: data.variant,
      visualVariant,
      servicesCount: data.services.length,
      theme: {
        primaryColor,
        secondaryColor,
        fontHeading,
        fontBody
      }
    });

    try {
      const html = `
<section class="services services--${data.variant} services--visual-${visualVariant}">
  <div class="services__container">
    ${this.renderHeader(data)}
    ${this.renderServices(data)}
  </div>
</section>`;

      const css = this.generateCSS(data, theme);
      const js = this.generateJS(data);

      const result: RenderResult = {
        html: html.trim(),
        css,
        js,
        assets: [],
        errors: [],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: css.length,
          jsSize: js.length
        }
      };

      logger.info('ServicesRendererV3PerfectEnhanced', 'render', '✅ Rendu Services parfait terminé');
      return result;

    } catch (error) {
      logger.error('ServicesRendererV3PerfectEnhanced', 'render', '❌ Erreur lors du rendu', error as Error);
      return this.renderFallback(data);
    }
  }

  private generateCSS(data: ServicesData, theme?: any): string {
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    
    return `
/* Variables CSS du thème */
:root {
  --services-primary: ${primaryColor};
  --services-secondary: ${secondaryColor};
  --services-font-heading: ${fontHeading};
  --services-font-body: ${fontBody};
}

/* ========================================
   SERVICES V3 PERFECT Enhanced - Styles magnifiques
   ======================================== */

.services {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  font-family: var(--services-font-body);
}

.services__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header élégant */
.services__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.services__title {
  font-family: var(--services-font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  opacity: 0;
  animation: servicesFadeUp 0.8s ease-out 0.2s forwards;
}

.services__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
  opacity: 0;
  animation: servicesFadeUp 0.8s ease-out 0.4s forwards;
}

/* ========================================
   VARIANTES VISUELLES
   ======================================== */

/* Modern - Gradient dynamique */
.services--visual-modern {
  background: linear-gradient(135deg, rgba(var(--services-primary-rgb, 102, 126, 234), 0.05) 0%, rgba(var(--services-secondary-rgb, 118, 75, 162), 0.05) 100%);
}

.services--visual-modern .services__title {
  background: linear-gradient(135deg, var(--services-primary), var(--services-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services--visual-modern .service__card {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.services--visual-modern .service__card:hover {
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

.services--visual-modern .service__icon {
  background: linear-gradient(135deg, var(--services-primary), var(--services-secondary));
  color: white;
}

/* Minimal - Épuré et rapide */
.services--visual-minimal {
  background: #fafafa;
}

.services--visual-minimal .services__title {
  color: #111;
}

.services--visual-minimal .service__card {
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.services--visual-minimal .service__card:hover {
  border-color: var(--services-primary);
  transform: translateY(-4px);
}

.services--visual-minimal .service__icon {
  background: transparent;
  border: 2px solid var(--services-primary);
  color: var(--services-primary);
}

/* Bold - Impact visuel fort */
.services--visual-bold {
  background: #111;
  color: white;
}

.services--visual-bold .services__title {
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services--visual-bold .services__subtitle {
  color: #9ca3af;
}

.services--visual-bold .service__card {
  background: #1a1a1a;
  border: 1px solid #333;
}

.services--visual-bold .service__card:hover {
  background: #222;
  border-color: var(--services-primary);
}

.services--visual-bold .service__icon {
  background: var(--services-primary);
  color: white;
}

.services--visual-bold .service__title {
  color: white;
}

.services--visual-bold .service__description {
  color: #9ca3af;
}

/* Elegant - Glassmorphism subtil */
.services--visual-elegant {
  background: #f8f9fa;
  position: relative;
}

.services--visual-elegant::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="%23667eea" opacity="0.1"/></svg>');
  background-size: 400px 400px;
  opacity: 0.3;
  pointer-events: none;
}

.services--visual-elegant .services__title {
  color: #212529;
}

.services--visual-elegant .service__card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

.services--visual-elegant .service__card:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-4px);
}

.services--visual-elegant .service__icon {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: var(--services-primary);
}

/* ========================================
   ANIMATIONS
   ======================================== */

@keyframes servicesFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes servicesSlideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   LAYOUT DE BASE (toutes variantes)
   ======================================== */

/* Grid Cards - Cartes en grille */
.services--grid-cards .services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.services--grid-cards .service__card {
  position: relative;
  border-radius: 1.5rem;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: servicesSlideUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.services--grid-cards .service__card:hover {
  transform: translateY(-8px);
}

/* Service card elements */
.service__icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.service__icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.service__card:hover .service__icon::before {
  transform: translateX(100%);
}

.service__title {
  font-family: var(--services-font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  line-height: 1.3;
}

.service__description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Features list */
.service__features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.service__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
}

.service__feature::before {
  content: '✓';
  color: var(--services-primary);
  font-weight: bold;
}

/* Pricing */
.service__pricing {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  font-family: var(--services-font-heading);
}

.service__price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--services-primary);
}

.service__price-currency {
  font-size: 1.25rem;
  color: #6b7280;
}

.service__price-period {
  font-size: 1rem;
  color: #6b7280;
}

/* CTA */
.service__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--services-primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.service__cta:hover {
  gap: 0.75rem;
  color: var(--services-secondary);
}

.service__cta--button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--services-primary);
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s;
}

.service__cta--button:hover {
  background: var(--services-secondary);
  transform: translateY(-2px);
}

/* Badge */
.service__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: var(--services-primary);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* List Detailed variant */
.services--list-detailed .services__list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.services--list-detailed .service__card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
}

/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 768px) {
  .services {
    padding: 4rem 0;
  }
  
  .services__grid {
    grid-template-columns: 1fr !important;
  }
  
  .services--list-detailed .service__card {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* ========================================
   PERFORMANCE
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .services *,
  .services *::before,
  .services *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;
  }

  private renderHeader(data: ServicesData): string {
    if (!data.title && !data.subtitle) return '';

    return `
    <div class="services__header">
      ${data.title ? `<h2 class="services__title">${data.title}</h2>` : ''}
      ${data.subtitle ? `<p class="services__subtitle">${data.subtitle}</p>` : ''}
    </div>`;
  }

  private renderServices(data: ServicesData): string {
    switch (data.variant) {
      case 'list-detailed':
        return this.renderListDetailed(data);
      case 'carousel-modern':
        return this.renderCarousel(data);
      case 'tabs-organized':
        return this.renderTabs(data);
      default:
        return this.renderGrid(data);
    }
  }

  private renderGrid(data: ServicesData): string {
    const services = data.services.map((service, index) => `
      <div class="service__card" style="--index: ${index};">
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private renderListDetailed(data: ServicesData): string {
    const services = data.services.map((service, index) => `
      <div class="service__card" style="--index: ${index};">
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `<div class="services__list">${services}</div>`;
  }

  private renderCarousel(data: ServicesData): string {
    const services = data.services.map((service, index) => `
      <div class="service__card" style="--index: ${index};">
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `
    <div class="services__carousel">
      <div class="services__carousel-track">
        ${services}
      </div>
      <div class="services__carousel-controls">
        <button class="carousel-prev">←</button>
        <button class="carousel-next">→</button>
      </div>
    </div>`;
  }

  private renderTabs(data: ServicesData): string {
    const categories = [...new Set(data.services.map(s => s.category || 'general'))];
    
    const tabs = categories.map((cat, index) => `
      <button class="services__tab ${index === 0 ? 'active' : ''}" data-tab="${cat}">
        ${cat}
      </button>
    `).join('');

    const panels = categories.map((cat, index) => {
      const categoryServices = data.services.filter(s => (s.category || 'general') === cat);
      return `
        <div class="services__panel ${index === 0 ? 'active' : ''}" data-panel="${cat}">
          <div class="services__grid">
            ${categoryServices.map((service, idx) => `
              <div class="service__card" style="--index: ${idx};">
                ${this.renderServiceContent(service, data)}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    return `
    <div class="services__tabs-wrapper">
      <div class="services__tabs">${tabs}</div>
      <div class="services__panels">${panels}</div>
    </div>`;
  }

  private renderServiceContent(service: any, data: ServicesData): string {
    const parts: string[] = [];

    // Badge
    if (service.badge) {
      parts.push(`<span class="service__badge">${service.badge.text}</span>`);
    }

    // Icon
    if (service.icon) {
      const iconValue = typeof service.icon === 'object' ? service.icon.value : service.icon;
      parts.push(`<div class="service__icon">${iconValue}</div>`);
    }

    // Title
    parts.push(`<h3 class="service__title">${service.title}</h3>`);

    // Description
    if (service.description) {
      parts.push(`<p class="service__description">${service.description}</p>`);
    }

    // Features
    if (service.features && service.features.length > 0) {
      parts.push(`
        <ul class="service__features">
          ${service.features.map(feature => `
            <li class="service__feature">${feature}</li>
          `).join('')}
        </ul>
      `);
    }

    // Pricing
    if (service.pricing?.enabled && service.pricing.amount) {
      parts.push(`
        <div class="service__pricing">
          <span class="service__price-currency">${service.pricing.currency}</span>
          <span class="service__price">${service.pricing.amount}</span>
          <span class="service__price-period">/${service.pricing.period === 'custom' ? service.pricing.customPeriod : service.pricing.period}</span>
        </div>
      `);
    }

    // CTA
    if (service.cta?.enabled) {
      const ctaClass = service.cta.style === 'button' ? 'service__cta--button' : 'service__cta';
      parts.push(`
        <a href="${service.cta.link}" class="${ctaClass}">
          ${service.cta.text}
          ${service.cta.style === 'link' ? '<span>→</span>' : ''}
        </a>
      `);
    }

    return parts.join('\n');
  }

  private generateJS(data: ServicesData): string {
    const js: string[] = [];

    // Carousel JS
    if (data.variant === 'carousel-modern') {
      js.push(`
// Services carousel
(function() {
  const track = document.querySelector('.services__carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;
  
  function updateCarousel() {
    const cardWidth = track.children[0].offsetWidth + 32; // width + gap
    track.style.transform = \`translateX(-\${currentIndex * cardWidth}px)\`;
  }
  
  prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextBtn?.addEventListener('click', () => {
    if (currentIndex < track.children.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
})();`);
    }

    // Tabs JS
    if (data.variant === 'tabs-organized') {
      js.push(`
// Services tabs
(function() {
  const tabs = document.querySelectorAll('.services__tab');
  const panels = document.querySelectorAll('.services__panel');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update panels
      panels.forEach(p => p.classList.remove('active'));
      panels[index].classList.add('active');
    });
  });
})();`);
    }

    return js.join('\n\n');
  }

  private renderFallback(data: ServicesData): RenderResult {
    return {
      html: `
<section class="services services--fallback">
  <div class="services__container">
    <h2>${data.title || 'Nos Services'}</h2>
    <div class="services__grid">
      ${data.services.map(s => `
        <div class="service__card">
          <h3>${s.title}</h3>
          <p>${s.description || ''}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>`,
      css: '',
      js: '',
      assets: [],
      errors: [{
        blockId: 'services',
        message: 'Erreur lors du rendu',
        fallbackUsed: true
      }],
      warnings: []
    };
  }

  renderPreview(data: ServicesData): string {
    const visualVariant = (data as any).visualVariant || 'modern';
    return `
<div class="services-preview services--${data.variant} services--visual-${visualVariant}">
  <h3>${data.title || 'Services'}</h3>
  <div class="services-preview__grid">
    ${data.services.slice(0, 3).map(s => `
      <div class="service-mini">
        ${s.icon ? `<span>${typeof s.icon === 'object' ? s.icon.value : s.icon}</span>` : ''}
        <span>${s.title}</span>
      </div>
    `).join('')}
  </div>
</div>`;
  }

  getDefaultCSS(): string {
    // Return empty string as CSS is generated in render method
    return '';
  }

  getRequiredAssets(): any[] {
    return [];
  }
}
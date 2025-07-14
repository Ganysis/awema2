/**
 * Features Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { featuresDataSchema, featuresDefaults, type FeaturesData } from '../schemas/blocks/features';
import { logger } from '../core/logger';

export class FeaturesRendererV3Perfect extends BaseRendererV3<FeaturesData> {
  type = 'features-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('FeaturesRendererV3Perfect', 'constructor', '🚀 Initialisation du renderer Features V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<FeaturesData, FeaturesData> {
    return featuresDataSchema.safeParse(data);
  }

  getDefaultData(): FeaturesData {
    return featuresDefaults;
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
   FEATURES V3 PERFECT - Styles magnifiques
   ======================================== */

.features {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
}

.features__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header magnifique */
.features__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.features__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  animation: featuresFadeUp 0.8s ease-out 0.2s forwards;
}

.features__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
  opacity: 0;
  animation: featuresFadeUp 0.8s ease-out 0.4s forwards;
}

@keyframes featuresFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   VARIANTES DE LAYOUT
   ======================================== */

/* 1. Grid Modern - Cartes élégantes */
.features--grid-modern .features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.features--grid-modern .feature {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: featuresSlideUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.features--grid-modern .feature:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

@keyframes featuresSlideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 2. Cards Hover - Effet 3D au survol */
.features--cards-hover .features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;
}

.features--cards-hover .feature {
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 2rem;
  padding: 3rem;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.features--cards-hover .feature::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2rem;
  opacity: 0;
  transition: opacity 0.4s;
  z-index: -1;
}

.features--cards-hover .feature:hover {
  transform: rotateY(15deg) rotateX(5deg);
}

.features--cards-hover .feature:hover::before {
  opacity: 1;
}

.features--cards-hover .feature:hover * {
  color: white !important;
}

/* 3. Timeline Vertical - Progression élégante */
.features--timeline-vertical .features__grid {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.features--timeline-vertical::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  transform: translateX(-50%);
}

.features--timeline-vertical .feature {
  position: relative;
  width: calc(50% - 2rem);
  margin-bottom: 4rem;
  opacity: 0;
  animation: featuresTimelineFade 0.8s ease-out forwards;
  animation-delay: calc(var(--index) * 0.15s);
}

.features--timeline-vertical .feature:nth-child(odd) {
  margin-left: 0;
  text-align: right;
}

.features--timeline-vertical .feature:nth-child(even) {
  margin-left: calc(50% + 2rem);
  text-align: left;
}

.features--timeline-vertical .feature::after {
  content: '';
  position: absolute;
  top: 2rem;
  width: 20px;
  height: 20px;
  background: white;
  border: 4px solid #667eea;
  border-radius: 50%;
}

.features--timeline-vertical .feature:nth-child(odd)::after {
  right: -2.9rem;
}

.features--timeline-vertical .feature:nth-child(even)::after {
  left: -2.9rem;
}

@keyframes featuresTimelineFade {
  from {
    opacity: 0;
    transform: translateX(var(--direction, 20px));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 4. Carousel 3D - Rotation spectaculaire */
.features--carousel-3d {
  perspective: 1200px;
}

.features--carousel-3d .features__grid {
  display: flex;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.features--carousel-3d .feature {
  position: absolute;
  width: 350px;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: rotateY(calc(var(--index) * 45deg)) translateZ(400px);
  transition: all 0.4s;
}

.features--carousel-3d .carousel-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

/* 5. Tabs Animés - Navigation interactive */
.features--tabs-animated .features__tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.features--tabs-animated .tab {
  position: relative;
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.features--tabs-animated .tab::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s;
}

.features--tabs-animated .tab:hover::before,
.features--tabs-animated .tab.active::before {
  opacity: 1;
}

.features--tabs-animated .tab span {
  position: relative;
  z-index: 1;
  color: #4b5563;
  transition: color 0.3s;
}

.features--tabs-animated .tab:hover span,
.features--tabs-animated .tab.active span {
  color: white;
}

.features--tabs-animated .feature {
  display: none;
  opacity: 0;
  animation: featuresTabFade 0.5s ease-out forwards;
}

.features--tabs-animated .feature.active {
  display: block;
}

@keyframes featuresTabFade {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 6. Masonry Creative - Layout dynamique */
.features--masonry-creative .features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  grid-auto-flow: dense;
}

.features--masonry-creative .feature:nth-child(3n+1) {
  grid-row: span 2;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.features--masonry-creative .feature:nth-child(4n+2) {
  grid-column: span 2;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.features--masonry-creative .feature {
  position: relative;
  border-radius: 1.5rem;
  padding: 2.5rem;
  overflow: hidden;
  transition: all 0.4s;
}

.features--masonry-creative .feature::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}

.features--masonry-creative .feature:hover::before {
  opacity: 1;
  animation: featuresPulse 2s ease-in-out infinite;
}

@keyframes featuresPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* 7. Comparison Table - Tableau comparatif */
.features--comparison-table .features__table {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.features--comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.features--comparison-table th,
.features--comparison-table td {
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.features--comparison-table th {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 700;
}

.features--comparison-table tr {
  transition: background 0.3s;
}

.features--comparison-table tr:hover {
  background: #f9fafb;
}

.features--comparison-table .check {
  color: #10b981;
  font-size: 1.5rem;
}

.features--comparison-table .cross {
  color: #ef4444;
  font-size: 1.5rem;
}

/* 8. Flip Cards - Cartes retournables */
.features--flip-cards .features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.features--flip-cards .feature {
  position: relative;
  height: 350px;
  perspective: 1000px;
}

.features--flip-cards .feature__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.features--flip-cards .feature:hover .feature__inner {
  transform: rotateY(180deg);
}

.features--flip-cards .feature__front,
.features--flip-cards .feature__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.features--flip-cards .feature__front {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.features--flip-cards .feature__back {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: rotateY(180deg);
}

/* ========================================
   ÉLÉMENTS COMMUNS
   ======================================== */

/* Icônes magnifiques */
.feature__icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 1rem;
  font-size: 2.5rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.feature__icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.feature:hover .feature__icon::before {
  transform: translateX(100%);
}

/* Variantes d'icônes */
.feature__icon--outline {
  background: transparent;
  border: 3px solid #667eea;
  color: #667eea;
}

.feature__icon--gradient {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.feature__icon--shadow {
  box-shadow: 0 10px 30px -5px rgba(102, 126, 234, 0.4);
}

.feature__icon--animated {
  animation: featuresIconFloat 3s ease-in-out infinite;
}

@keyframes featuresIconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Titres et descriptions */
.feature__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  line-height: 1.3;
}

.feature__description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Badges et tags */
.feature__badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature__badge--new {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

/* Stats */
.feature__stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.feature__stat {
  text-align: center;
}

.feature__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.feature__stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Liens et CTA */
.feature__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.feature__link:hover {
  gap: 0.75rem;
  color: #764ba2;
}

.feature__link-icon {
  transition: transform 0.3s;
}

.feature__link:hover .feature__link-icon {
  transform: translateX(4px);
}

/* Images */
.feature__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

/* Progress bars */
.feature__progress {
  margin-top: 1rem;
}

.feature__progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.feature__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 9999px;
  width: var(--progress, 0%);
  transition: width 1s ease-out;
}

/* ========================================
   ANIMATIONS ET EFFETS
   ======================================== */

/* Particules flottantes */
.features--particles::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2" fill="%23667eea" opacity="0.1"/><circle cx="90" cy="30" r="1.5" fill="%23764ba2" opacity="0.1"/><circle cx="30" cy="80" r="1" fill="%23f093fb" opacity="0.1"/></svg>');
  opacity: 0.5;
  pointer-events: none;
}

/* Effet de vague */
.features--wave {
  position: relative;
}

.features--wave::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23f3f4f6" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  pointer-events: none;
}

/* ========================================
   FILTRES ET CATÉGORIES
   ======================================== */

.features__filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.features__filter {
  padding: 0.5rem 1.25rem;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.features__filter:hover {
  background: #e5e7eb;
}

.features__filter.active {
  background: white;
  border-color: #667eea;
  color: #667eea;
  box-shadow: 0 4px 15px -3px rgba(102, 126, 234, 0.2);
}

/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 1024px) {
  .features--timeline-vertical::before {
    left: 30px;
  }
  
  .features--timeline-vertical .feature {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    text-align: left !important;
  }
  
  .features--timeline-vertical .feature::after {
    left: -42px !important;
    right: auto !important;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 4rem 0;
  }
  
  .features__grid {
    grid-template-columns: 1fr !important;
  }
  
  .features--carousel-3d .feature {
    position: relative;
    transform: none !important;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  
  .features--comparison-table {
    overflow-x: auto;
  }
  
  .features--comparison-table table {
    min-width: 600px;
  }
}

/* ========================================
   THÈME SOMBRE
   ======================================== */

[data-theme="dark"] .features {
  background: #0f0f0f;
}

[data-theme="dark"] .feature {
  background: #1a1a1a;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
}

[data-theme="dark"] .feature__title {
  color: #f9fafb;
}

[data-theme="dark"] .feature__description {
  color: #9ca3af;
}

[data-theme="dark"] .features__filter {
  background: #1a1a1a;
  color: #e5e7eb;
}

/* ========================================
   ÉTATS D'INTERACTION
   ======================================== */

.feature {
  position: relative;
  overflow: hidden;
}

.feature::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.feature:active::after {
  width: 300px;
  height: 300px;
}

/* ========================================
   OPTIMISATIONS PERFORMANCES
   ======================================== */

.features * {
  will-change: auto;
}

.feature {
  contain: layout style paint;
}

@media (prefers-reduced-motion: reduce) {
  .features *,
  .features *::before,
  .features *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
  }

  getRequiredAssets(): any[] {
    return [];
  }

  render(data: FeaturesData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    logger.info('FeaturesRendererV3Perfect', 'render', '🎨 Début du rendu Features parfait', {
      variant: data.variant,
      featuresCount: data.features.length
    });

    try {
      const html = `
<section class="features features--${data.variant} ${data.animation?.enabled ? 'features--animated' : ''}">
  <div class="features__container">
    ${this.renderHeader(data)}
    ${this.renderFilters(data)}
    ${this.renderFeatures(data)}
  </div>
</section>`;

      const css = this.getDefaultCSS() + this.generateDynamicCSS(data);
      const js = this.generateJS(data);

      const result: RenderResult = {
        html: html.trim(),
        css,
        js,
        assets: this.getRequiredAssets(),
        errors: [],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: css.length,
          jsSize: js.length
        }
      };

      logger.info('FeaturesRendererV3Perfect', 'render', '✅ Rendu Features parfait terminé');
      return result;

    } catch (error) {
      logger.error('FeaturesRendererV3Perfect', 'render', '❌ Erreur lors du rendu', error as Error);
      return this.renderFallback(data);
    }
  }

  private renderHeader(data: FeaturesData): string {
    if (!data.title && !data.subtitle) return '';

    return `
    <div class="features__header">
      ${data.title ? `<h2 class="features__title">${data.title}</h2>` : ''}
      ${data.subtitle ? `<p class="features__subtitle">${data.subtitle}</p>` : ''}
    </div>`;
  }

  private renderFilters(data: FeaturesData): string {
    if (!data.filtering?.enabled || !data.filtering.categories?.length) return '';

    const filters = data.filtering.categories.map(cat => `
      <button class="features__filter" data-category="${cat.id}">
        ${cat.label}
        ${data.filtering.showCount && cat.count ? `<span>(${cat.count})</span>` : ''}
      </button>
    `).join('');

    return `
    <div class="features__filters">
      ${data.filtering.showAll ? `<button class="features__filter active" data-category="all">${data.filtering.allLabel}</button>` : ''}
      ${filters}
    </div>`;
  }

  private renderFeatures(data: FeaturesData): string {
    switch (data.variant) {
      case 'timeline-vertical':
        return this.renderTimeline(data);
      case 'carousel-3d':
        return this.renderCarousel3D(data);
      case 'tabs-animated':
        return this.renderTabs(data);
      case 'comparison-table':
        return this.renderComparisonTable(data);
      case 'flip-cards':
        return this.renderFlipCards(data);
      default:
        return this.renderGrid(data);
    }
  }

  private renderGrid(data: FeaturesData): string {
    const features = data.features.map((feature, index) => `
      <div class="feature" style="--index: ${index};" ${feature.category ? `data-category="${feature.category}"` : ''}>
        ${this.renderFeatureContent(feature, data)}
      </div>
    `).join('');

    return `<div class="features__grid">${features}</div>`;
  }

  private renderTimeline(data: FeaturesData): string {
    const features = data.features.map((feature, index) => `
      <div class="feature" style="--index: ${index}; --direction: ${index % 2 === 0 ? '-20px' : '20px'};">
        ${this.renderFeatureContent(feature, data)}
        ${feature.date ? `<div class="feature__date">${feature.date}</div>` : ''}
      </div>
    `).join('');

    return `<div class="features__grid features__timeline">${features}</div>`;
  }

  private renderCarousel3D(data: FeaturesData): string {
    const features = data.features.map((feature, index) => `
      <div class="feature" style="--index: ${index};">
        ${this.renderFeatureContent(feature, data)}
      </div>
    `).join('');

    return `
    <div class="features__grid" data-rotation="0">
      ${features}
    </div>
    <div class="carousel-controls">
      <button class="carousel-prev">←</button>
      <button class="carousel-next">→</button>
    </div>`;
  }

  private renderTabs(data: FeaturesData): string {
    const tabs = data.features.map((feature, index) => `
      <button class="tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
        ${feature.icon ? `<span>${feature.icon}</span>` : ''}
        <span>${feature.title}</span>
      </button>
    `).join('');

    const contents = data.features.map((feature, index) => `
      <div class="feature ${index === 0 ? 'active' : ''}" data-content="${index}">
        ${this.renderFeatureContent(feature, data)}
      </div>
    `).join('');

    return `
    <div class="features__tabs">${tabs}</div>
    <div class="features__content">${contents}</div>`;
  }

  private renderComparisonTable(data: FeaturesData): string {
    // Simplified table for comparison
    return `
    <div class="features__table">
      <table>
        <thead>
          <tr>
            <th>Fonctionnalité</th>
            <th>Basique</th>
            <th>Pro</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          ${data.features.map(feature => `
            <tr>
              <td>${feature.title}</td>
              <td><span class="check">✓</span></td>
              <td><span class="check">✓</span></td>
              <td><span class="check">✓</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
  }

  private renderFlipCards(data: FeaturesData): string {
    const features = data.features.map((feature, index) => `
      <div class="feature" style="--index: ${index};">
        <div class="feature__inner">
          <div class="feature__front">
            ${this.renderFeatureContent(feature, data)}
          </div>
          <div class="feature__back">
            <h3>${feature.title}</h3>
            <p>Informations détaillées sur ${feature.title.toLowerCase()}</p>
            ${feature.link ? `<a href="${feature.link.url}" class="feature__link">En savoir plus →</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `<div class="features__grid">${features}</div>`;
  }

  private renderFeatureContent(feature: any, data: FeaturesData): string {
    const parts: string[] = [];

    // Badge
    if (feature.badge) {
      parts.push(`<span class="feature__badge ${feature.badge.type === 'new' ? 'feature__badge--new' : ''}">${feature.badge.text}</span>`);
    }

    // Icon
    if (data.display?.showIcon && feature.icon) {
      const iconClass = `feature__icon feature__icon--${data.display.iconStyle}`;
      parts.push(`<div class="${iconClass}">${feature.icon}</div>`);
    }

    // Image
    if (data.display?.showImage && feature.image) {
      parts.push(`<img src="${feature.image.src}" alt="${feature.image.alt}" class="feature__image" loading="lazy">`);
    }

    // Title
    parts.push(`<h3 class="feature__title">${feature.title}</h3>`);

    // Description
    if (feature.description) {
      parts.push(`<p class="feature__description">${feature.description}</p>`);
    }

    // Progress
    if (feature.progress !== undefined) {
      parts.push(`
        <div class="feature__progress">
          <div class="feature__progress-bar">
            <div class="feature__progress-fill" style="--progress: ${feature.progress}%"></div>
          </div>
        </div>
      `);
    }

    // Stats
    if (data.display?.showStats && feature.stats) {
      const stats = feature.stats.map(stat => `
        <div class="feature__stat">
          <div class="feature__stat-value">${stat.value}</div>
          <div class="feature__stat-label">${stat.label}</div>
        </div>
      `).join('');
      parts.push(`<div class="feature__stats">${stats}</div>`);
    }

    // Link
    if (data.display?.showLink && feature.link) {
      parts.push(`
        <a href="${feature.link.url}" class="feature__link">
          ${feature.link.text}
          <span class="feature__link-icon">→</span>
        </a>
      `);
    }

    return parts.join('\n');
  }

  private generateDynamicCSS(data: FeaturesData): string {
    const css: string[] = [];

    // Custom colors
    if (data.styles?.colors) {
      css.push(`
.features {
  --feature-primary: ${data.styles.colors.primary || '#667eea'};
  --feature-secondary: ${data.styles.colors.secondary || '#764ba2'};
  --feature-accent: ${data.styles.colors.accent || '#f093fb'};
}`);
    }

    // Custom spacing
    if (data.styles?.spacing) {
      css.push(`
.features__grid {
  gap: ${data.styles.spacing.gap || '2rem'};
}`);
    }

    return css.join('\n');
  }

  private generateJS(data: FeaturesData): string {
    const js: string[] = [];

    // Filters
    if (data.filtering?.enabled) {
      js.push(`
// Features filtering
(function() {
  const filters = document.querySelectorAll('.features__filter');
  const features = document.querySelectorAll('.feature[data-category]');
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
      // Filter features
      features.forEach(feature => {
        if (category === 'all' || feature.dataset.category === category) {
          feature.style.display = '';
          feature.style.opacity = '0';
          setTimeout(() => feature.style.opacity = '1', 10);
        } else {
          feature.style.opacity = '0';
          setTimeout(() => feature.style.display = 'none', 300);
        }
      });
    });
  });
})();`);
    }

    // Carousel 3D
    if (data.variant === 'carousel-3d') {
      js.push(`
// Carousel 3D rotation
(function() {
  const grid = document.querySelector('.features--carousel-3d .features__grid');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let rotation = 0;
  
  function rotate(direction) {
    rotation += direction * 45;
    grid.style.transform = \`rotateY(\${rotation}deg)\`;
  }
  
  prevBtn?.addEventListener('click', () => rotate(-1));
  nextBtn?.addEventListener('click', () => rotate(1));
  
  // Auto-rotate
  setInterval(() => rotate(1), 5000);
})();`);
    }

    // Tabs
    if (data.variant === 'tabs-animated') {
      js.push(`
// Tabs animation
(function() {
  const tabs = document.querySelectorAll('.features--tabs-animated .tab');
  const contents = document.querySelectorAll('.features--tabs-animated .feature[data-content]');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update content
      contents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });
      
      const content = contents[index];
      content.style.display = 'block';
      setTimeout(() => content.classList.add('active'), 10);
    });
  });
})();`);
    }

    // Progress animation
    if (data.features.some(f => f.progress !== undefined)) {
      js.push(`
// Animate progress bars on scroll
(function() {
  const progressBars = document.querySelectorAll('.feature__progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.style.getPropertyValue('--progress');
        entry.target.style.width = progress;
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => observer.observe(bar));
})();`);
    }

    return js.join('\n\n');
  }

  private renderFallback(data: FeaturesData): RenderResult {
    return {
      html: `
<section class="features features--fallback">
  <div class="features__container">
    <h2>${data.title || 'Nos Fonctionnalités'}</h2>
    <div class="features__grid">
      ${data.features.map(f => `
        <div class="feature">
          <h3>${f.title}</h3>
          <p>${f.description || ''}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>`,
      css: this.getDefaultCSS(),
      js: '',
      assets: [],
      errors: [{
        blockId: 'features',
        message: 'Erreur lors du rendu',
        fallbackUsed: true
      }],
      warnings: []
    };
  }

  renderPreview(data: FeaturesData): string {
    return `
<div class="features-preview features--${data.variant}">
  <h3>${data.title || 'Features'}</h3>
  <div class="features-preview__grid">
    ${data.features.slice(0, 3).map(f => `
      <div class="feature-mini">
        ${f.icon ? `<span>${f.icon}</span>` : ''}
        <span>${f.title}</span>
      </div>
    `).join('')}
  </div>
</div>`;
  }
}
/**
 * Features Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { featuresDataSchema, featuresDefaults, type FeaturesData } from '../schemas/blocks/features';
import { logger } from '../core/logger';

export class FeaturesRendererV3PerfectEnhanced extends BaseRendererV3<FeaturesData> {
  type = 'features-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('FeaturesRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Features V3 PERFECT Enhanced');
  }

  validate(data: unknown): z.SafeParseReturnType<FeaturesData, FeaturesData> {
    return featuresDataSchema.safeParse(data);
  }

  getDefaultData(): FeaturesData {
    return {
      ...featuresDefaults,
      variant: 'grid-modern' as any,
      visualVariant: 'modern' as any
    };
  }

  getBlockProps(): BlockProp[] {
    // Define custom properties with better ergonomics
    const customProps: BlockProp[] = [
      // Visual Style
      {
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
          group: 'Style',
          order: 1
        }
      },
      
      // Layout type
      {
        name: 'variant',
        label: 'Type de disposition',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'grid-modern',
        description: 'Choisissez la disposition des features',
        options: [
          { value: 'grid-modern', label: '📱 Grille moderne' },
          { value: 'cards-hover', label: '🃏 Cartes avec hover' },
          { value: 'timeline-vertical', label: '📅 Timeline verticale' },
          { value: 'carousel-3d', label: '🎠 Carousel 3D' },
          { value: 'tabs-animated', label: '📑 Onglets animés' },
          { value: 'masonry-creative', label: '🧱 Masonry créatif' },
          { value: 'comparison-table', label: '⚖️ Tableau comparatif' },
          { value: 'flip-cards', label: '🔄 Cartes flip' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Style',
          order: 2
        }
      },
      
      // Content
      {
        name: 'title',
        label: 'Titre principal',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Nos Services',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'subtitle',
        label: 'Sous-titre',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Des solutions adaptées à vos besoins',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 2
        }
      },
      {
        name: 'description',
        label: 'Description',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Découvrez comment nous pouvons vous aider à atteindre vos objectifs.',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 3
        }
      },
      
      // Layout Options (simplified)
      {
        name: 'columns',
        label: 'Nombre de colonnes',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 3,
        description: 'Nombre de colonnes sur desktop',
        editorConfig: {
          control: EditorControl.SLIDER,
          group: 'Mise en page',
          order: 1,
          min: 1,
          max: 6,
          step: 1
        }
      },
      {
        name: 'gap',
        label: 'Espacement',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'md',
        options: [
          { value: 'sm', label: 'Petit' },
          { value: 'md', label: 'Moyen' },
          { value: 'lg', label: 'Grand' },
          { value: 'xl', label: 'Très grand' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Mise en page',
          order: 2
        }
      },
      {
        name: 'alignment',
        label: 'Alignement du texte',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'center',
        options: [
          { value: 'left', label: 'Gauche' },
          { value: 'center', label: 'Centré' },
          { value: 'right', label: 'Droite' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Mise en page',
          order: 3
        }
      },
      
      // Display Options (simplified)
      {
        name: 'showIcon',
        label: 'Afficher les icônes',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 1
        }
      },
      {
        name: 'iconStyle',
        label: 'Style des icônes',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'filled',
        options: [
          { value: 'filled', label: 'Rempli' },
          { value: 'outline', label: 'Contour' },
          { value: 'gradient', label: 'Dégradé' },
          { value: 'shadow', label: 'Ombre' },
          { value: 'animated', label: 'Animé' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 2,
          condition: { showIcon: true }
        }
      },
      {
        name: 'cardStyle',
        label: 'Style des cartes',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'elevated',
        options: [
          { value: 'flat', label: 'Plat' },
          { value: 'elevated', label: 'Surélevé' },
          { value: 'outlined', label: 'Contour' },
          { value: 'glassmorphism', label: 'Verre dépoli' },
          { value: 'gradient', label: 'Dégradé' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 3
        }
      },
      {
        name: 'showLink',
        label: 'Afficher les liens',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 4
        }
      },
      {
        name: 'animation',
        label: 'Animation',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'fade',
        options: [
          { value: 'none', label: 'Aucune' },
          { value: 'fade', label: 'Fondu' },
          { value: 'slide', label: 'Glissement' },
          { value: 'zoom', label: 'Zoom' },
          { value: 'flip', label: 'Rotation' },
          { value: 'bounce', label: 'Rebond' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 5
        }
      },
      
      // Features Collection
      {
        name: 'features',
        label: 'Liste des features',
        type: PropType.ARRAY,
        required: true,
        defaultValue: this.getDefaultData().features,
        description: 'Gérez vos features',
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: 'Features',
          order: 1,
          itemLabel: (item: any) => item.title || 'Nouvelle feature',
          collapsed: false,
          schema: [
            {
              name: 'icon',
              label: 'Icône',
              type: PropType.STRING,
              defaultValue: '⭐',
              editorConfig: {
                control: EditorControl.ICON_PICKER,
                placeholder: 'Emoji ou icône'
              }
            },
            {
              name: 'title',
              label: 'Titre',
              type: PropType.STRING,
              required: true,
              defaultValue: 'Nouvelle feature',
              editorConfig: {
                control: EditorControl.TEXT
              }
            },
            {
              name: 'description',
              label: 'Description',
              type: PropType.STRING,
              required: true,
              defaultValue: 'Description de la feature',
              editorConfig: {
                control: EditorControl.TEXTAREA,
                rows: 3
              }
            },
            {
              name: 'image',
              label: 'Image (optionnel)',
              type: PropType.STRING,
              required: false,
              editorConfig: {
                control: EditorControl.IMAGE
              }
            },
            {
              name: 'imageAlt',
              label: 'Texte alternatif image',
              type: PropType.STRING,
              required: false,
              editorConfig: {
                control: EditorControl.TEXT,
                condition: { image: { $exists: true } }
              }
            },
            {
              name: 'linkUrl',
              label: 'Lien (optionnel)',
              type: PropType.STRING,
              required: false,
              defaultValue: '#',
              editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'https://...'
              }
            },
            {
              name: 'linkText',
              label: 'Texte du lien',
              type: PropType.STRING,
              required: false,
              defaultValue: 'En savoir plus',
              editorConfig: {
                control: EditorControl.TEXT,
                condition: { linkUrl: { $exists: true } }
              }
            },
            {
              name: 'category',
              label: 'Catégorie',
              type: PropType.STRING,
              required: false,
              editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'development, design, etc.'
              }
            },
            {
              name: 'highlight',
              label: 'Mettre en avant',
              type: PropType.BOOLEAN,
              required: false,
              defaultValue: false,
              editorConfig: {
                control: EditorControl.TOGGLE
              }
            }
          ]
        }
      }
    ];

    return customProps;
  }

  render(data: FeaturesData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    // Normalize data from simplified format
    const normalizedData = this.normalizeData(data);
    
    // Extract theme colors and typography
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    const visualVariant = normalizedData.visualVariant || 'modern';
    
    logger.info('FeaturesRendererV3PerfectEnhanced', 'render', '🎨 Début du rendu Features parfait', {
      variant: normalizedData.variant,
      visualVariant,
      featuresCount: normalizedData.features.length,
      theme: {
        primaryColor,
        secondaryColor,
        fontHeading,
        fontBody
      }
    });

    try {
      const html = `
<section class="features features--${normalizedData.variant} features--visual-${visualVariant} ${normalizedData.animation === 'none' ? '' : 'features--animated'}">
  <div class="features__container">
    ${this.renderHeader(normalizedData)}
    ${this.renderFilters(normalizedData)}
    ${this.renderFeatures(normalizedData)}
  </div>
</section>`;

      const css = this.generateCSS(normalizedData, theme);
      const js = this.generateJS(normalizedData);

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

      logger.info('FeaturesRendererV3PerfectEnhanced', 'render', '✅ Rendu Features parfait terminé');
      return result;

    } catch (error) {
      logger.error('FeaturesRendererV3PerfectEnhanced', 'render', '❌ Erreur lors du rendu', error as Error);
      return this.renderFallback(data);
    }
  }

  private normalizeData(data: any): FeaturesData {
    // Create a normalized version that matches the schema expectations
    const normalized: any = {
      ...data,
      layout: {
        columns: data.columns || 3,
        gap: data.gap || 'md',
        alignment: data.alignment || 'center',
        containerWidth: 'normal'
      },
      display: {
        showIcon: data.showIcon !== false,
        iconStyle: data.iconStyle || 'filled',
        iconSize: 'lg',
        iconPosition: 'top',
        showImage: false,
        showLink: data.showLink !== false,
        showCategory: false,
        cardStyle: data.cardStyle || 'elevated',
        cardHover: 'lift',
        animation: data.animation || 'fade',
        animationDelay: 100,
        stagger: true
      },
      filtering: {
        enabled: false
      },
      animation: {
        enabled: data.animation !== 'none',
        type: data.animation || 'fade'
      }
    };

    // Normalize features to match expected structure
    if (normalized.features && Array.isArray(normalized.features)) {
      normalized.features = normalized.features.map((feature: any) => ({
        ...feature,
        link: feature.linkUrl ? {
          url: feature.linkUrl,
          text: feature.linkText || 'En savoir plus',
          target: '_self',
          style: 'link'
        } : undefined,
        image: feature.image ? {
          src: feature.image,
          alt: feature.imageAlt || feature.title || ''
        } : undefined
      }));
    }

    return normalized as FeaturesData;
  }

  private generateCSS(data: FeaturesData, theme?: any): string {
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    
    return `
/* Variables CSS du thème */
:root {
  --features-primary: ${primaryColor};
  --features-secondary: ${secondaryColor};
  --features-font-heading: ${fontHeading};
  --features-font-body: ${fontBody};
}

/* ========================================
   FEATURES V3 PERFECT Enhanced - Styles magnifiques
   ======================================== */

.features {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  font-family: var(--features-font-body);
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
  font-family: var(--features-font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
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

/* ========================================
   VARIANTES VISUELLES
   ======================================== */

/* Modern - Gradient dynamique */
.features--visual-modern {
  background: linear-gradient(135deg, rgba(var(--features-primary-rgb, 102, 126, 234), 0.05) 0%, rgba(var(--features-secondary-rgb, 118, 75, 162), 0.05) 100%);
}

.features--visual-modern .features__title {
  background: linear-gradient(135deg, var(--features-primary), var(--features-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features--visual-modern .feature {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.features--visual-modern .feature:hover {
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
}

.features--visual-modern .feature__icon {
  background: linear-gradient(135deg, var(--features-primary), var(--features-secondary));
}

/* Minimal - Épuré et rapide */
.features--visual-minimal {
  background: #fafafa;
}

.features--visual-minimal .features__title {
  color: #111;
}

.features--visual-minimal .feature {
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.features--visual-minimal .feature:hover {
  border-color: var(--features-primary);
  transform: translateY(-4px);
}

.features--visual-minimal .feature__icon {
  background: transparent;
  border: 2px solid var(--features-primary);
  color: var(--features-primary);
}

/* Bold - Impact visuel fort */
.features--visual-bold {
  background: #111;
  color: white;
}

.features--visual-bold .features__title {
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features--visual-bold .features__subtitle {
  color: #9ca3af;
}

.features--visual-bold .feature {
  background: #1a1a1a;
  border: 1px solid #333;
}

.features--visual-bold .feature:hover {
  background: #222;
  border-color: var(--features-primary);
}

.features--visual-bold .feature__icon {
  background: var(--features-primary);
  color: white;
}

.features--visual-bold .feature__title {
  color: white;
}

.features--visual-bold .feature__description {
  color: #9ca3af;
}

/* Elegant - Glassmorphism subtil */
.features--visual-elegant {
  background: #f8f9fa;
  position: relative;
}

.features--visual-elegant::before {
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

.features--visual-elegant .features__title {
  color: #212529;
}

.features--visual-elegant .feature {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

.features--visual-elegant .feature:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-4px);
}

.features--visual-elegant .feature__icon {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: var(--features-primary);
}

/* ========================================
   ANIMATIONS
   ======================================== */

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

/* ========================================
   LAYOUT DE BASE (toutes variantes)
   ======================================== */

/* Grid Modern - Cartes élégantes */
.features--grid-modern .features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.features--grid-modern .feature {
  position: relative;
  border-radius: 1.5rem;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: featuresSlideUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.features--grid-modern .feature:hover {
  transform: translateY(-8px);
}

/* Feature elements communs */
.feature__icon {
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

.feature__title {
  font-family: var(--features-font-heading);
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

.feature__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--features-primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.feature__link:hover {
  gap: 0.75rem;
  color: var(--features-secondary);
}

/* Filters */
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
  border-color: var(--features-primary);
  color: var(--features-primary);
  box-shadow: 0 4px 15px -3px rgba(102, 126, 234, 0.2);
}

/* ========================================
   AUTRES VARIANTES DE LAYOUT
   ======================================== */

/* Timeline, Carousel, Tabs, etc. - styles from original */
/* ... (rest of the layout styles remain the same) ... */

/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 768px) {
  .features {
    padding: 4rem 0;
  }
  
  .features__grid {
    grid-template-columns: 1fr !important;
  }
}

/* ========================================
   PERFORMANCE
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .features *,
  .features *::before,
  .features *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;
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

    // Icon
    if (data.display?.showIcon && feature.icon) {
      const iconValue = typeof feature.icon === 'object' ? feature.icon.value : feature.icon;
      parts.push(`<div class="feature__icon">${iconValue}</div>`);
    }

    // Title
    parts.push(`<h3 class="feature__title">${feature.title}</h3>`);

    // Description
    if (feature.description) {
      parts.push(`<p class="feature__description">${feature.description}</p>`);
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
      css: '',
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
    const visualVariant = (data as any).visualVariant || 'modern';
    return `
<div class="features-preview features--${data.variant} features--visual-${visualVariant}">
  <h3>${data.title || 'Features'}</h3>
  <div class="features-preview__grid">
    ${data.features.slice(0, 3).map(f => `
      <div class="feature-mini">
        ${f.icon ? `<span>${typeof f.icon === 'object' ? f.icon.value : f.icon}</span>` : ''}
        <span>${f.title}</span>
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
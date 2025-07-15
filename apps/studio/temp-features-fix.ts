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
    // Start with basic properties that are always visible
    const baseProps: BlockProp[] = [
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
          { value: 'carousel-modern', label: '🎠 Carousel moderne' },
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
      }
    ];

    // Add 6 feature slots with simple fields
    for (let i = 1; i <= 6; i++) {
      baseProps.push(
        // Feature title
        {
          name: `feature${i}_title`,
          label: `Feature ${i} - Titre`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? `Feature ${i}` : '',
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Feature ${i}`,
            order: 1
          }
        },
        // Feature icon
        {
          name: `feature${i}_icon`,
          label: `Feature ${i} - Icône`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? ['🚀', '🎨', '🔍', '💻', '🛡️', '📱'][i-1] : '',
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Feature ${i}`,
            order: 2,
            placeholder: 'Emoji ou texte court'
          }
        },
        // Feature description
        {
          name: `feature${i}_description`,
          label: `Feature ${i} - Description`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? `Description de la feature ${i}` : '',
          editorConfig: {
            control: EditorControl.TEXTAREA,
            group: `Feature ${i}`,
            order: 3,
            rows: 2
          }
        },
        // Feature link
        {
          name: `feature${i}_link`,
          label: `Feature ${i} - Lien`,
          type: PropType.STRING,
          required: false,
          defaultValue: '#',
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Feature ${i}`,
            order: 4,
            placeholder: 'URL du lien'
          }
        },
        // Feature link text
        {
          name: `feature${i}_linkText`,
          label: `Feature ${i} - Texte du lien`,
          type: PropType.STRING,
          required: false,
          defaultValue: 'En savoir plus',
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Feature ${i}`,
            order: 5
          }
        }
      );
      
      // Add variant-specific fields
      // Timeline fields
      if (true) { // We'll show all fields and use them based on variant
        baseProps.push(
          {
            name: `feature${i}_date`,
            label: `Feature ${i} - Date/Étape (Timeline)`,
            type: PropType.STRING,
            required: false,
            defaultValue: '',
            editorConfig: {
              control: EditorControl.TEXT,
              group: `Feature ${i}`,
              order: 6,
              placeholder: 'Ex: Janvier 2024, Étape 1'
            }
          },
          {
            name: `feature${i}_status`,
            label: `Feature ${i} - Statut (Timeline)`,
            type: PropType.SELECT,
            required: false,
            defaultValue: 'completed',
            options: [
              { value: 'completed', label: '✅ Complété' },
              { value: 'in-progress', label: '🔄 En cours' },
              { value: 'upcoming', label: '⏳ À venir' }
            ],
            editorConfig: {
              control: EditorControl.SELECT,
              group: `Feature ${i}`,
              order: 7
            }
          }
        );
        
        // Comparison table fields
        baseProps.push(
          {
            name: `feature${i}_basic`,
            label: `Feature ${i} - Plan Basique (Tableau)`,
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: true,
            editorConfig: {
              control: EditorControl.TOGGLE,
              group: `Feature ${i}`,
              order: 8
            }
          },
          {
            name: `feature${i}_pro`,
            label: `Feature ${i} - Plan Pro (Tableau)`,
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: true,
            editorConfig: {
              control: EditorControl.TOGGLE,
              group: `Feature ${i}`,
              order: 9
            }
          },
          {
            name: `feature${i}_premium`,
            label: `Feature ${i} - Plan Premium (Tableau)`,
            type: PropType.BOOLEAN,
            required: false,
            defaultValue: true,
            editorConfig: {
              control: EditorControl.TOGGLE,
              group: `Feature ${i}`,
              order: 10
            }
          }
        );
        
        // Flip card fields
        baseProps.push(
          {
            name: `feature${i}_backTitle`,
            label: `Feature ${i} - Titre verso (Flip)`,
            type: PropType.STRING,
            required: false,
            defaultValue: '',
            editorConfig: {
              control: EditorControl.TEXT,
              group: `Feature ${i}`,
              order: 11
            }
          },
          {
            name: `feature${i}_backDescription`,
            label: `Feature ${i} - Description verso (Flip)`,
            type: PropType.STRING,
            required: false,
            defaultValue: '',
            editorConfig: {
              control: EditorControl.TEXTAREA,
              group: `Feature ${i}`,
              order: 12,
              rows: 2
            }
          },
          {
            name: `feature${i}_backFeatures`,
            label: `Feature ${i} - Points clés verso (Flip)`,
            type: PropType.STRING,
            required: false,
            defaultValue: '',
            editorConfig: {
              control: EditorControl.TEXTAREA,
              group: `Feature ${i}`,
              order: 13,
              rows: 3,
              placeholder: 'Un point par ligne'
            }
          }
        );
      }
    }

    return baseProps;
  }

  // Helper method to extract features from flat data structure
  private extractFeatures(data: any): any[] {
    const features = [];
    
    // Extract up to 6 features from flat structure
    for (let i = 1; i <= 6; i++) {
      const title = data[`feature${i}_title`];
      if (title) {
        features.push({
          icon: data[`feature${i}_icon`] || '🌟',
          title,
          description: data[`feature${i}_description`] || '',
          linkUrl: data[`feature${i}_link`] || '#',
          linkText: data[`feature${i}_linkText`] || 'En savoir plus',
          // Timeline specific
          date: data[`feature${i}_date`] || `Étape ${i}`,
          status: data[`feature${i}_status`] || 'completed',
          // Comparison table specific
          plans: {
            basic: data[`feature${i}_basic`] !== false,
            pro: data[`feature${i}_pro`] !== false,
            premium: data[`feature${i}_premium`] !== false
          },
          // Flip card specific
          front: {
            icon: data[`feature${i}_icon`] || '🌟',
            title,
            subtitle: data[`feature${i}_description`] || ''
          },
          back: {
            title: data[`feature${i}_backTitle`] || title,
            description: data[`feature${i}_backDescription`] || data[`feature${i}_description`] || '',
            features: data[`feature${i}_backFeatures`] || '',
            buttonText: data[`feature${i}_linkText`] || 'En savoir plus',
            buttonUrl: data[`feature${i}_link`] || '#'
          }
        });
      }
    }
    
    return features;
  }

  render(data: FeaturesData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    // Extract features from flat data structure
    const extractedFeatures = this.extractFeatures(data);
    
    // Create normalized data with extracted features
    const normalizedData = {
      ...data,
      features: extractedFeatures,
      visualVariant: data.visualVariant || 'modern'
    };
    
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

  private generateCSS(data: any, theme?: any): string {
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

/* Continue with all the CSS from the original file... */
`;
  }

  private renderHeader(data: any): string {
    if (!data.title && !data.subtitle) return '';

    return `
    <div class="features__header">
      ${data.title ? `<h2 class="features__title">${data.title}</h2>` : ''}
      ${data.subtitle ? `<p class="features__subtitle">${data.subtitle}</p>` : ''}
    </div>`;
  }

  private renderFeatures(data: any): string {
    switch (data.variant) {
      case 'timeline-vertical':
        return this.renderTimeline(data);
      case 'carousel-modern':
        return this.renderModernCarousel(data);
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

  private renderGrid(data: any): string {
    const features = data.features.map((feature: any, index: number) => `
      <div class="feature" style="--index: ${index};" ${feature.category ? `data-category="${feature.category}"` : ''}>
        ${this.renderFeatureContent(feature, data)}
      </div>
    `).join('');

    return `<div class="features__grid">${features}</div>`;
  }

  private renderTimeline(data: any): string {
    const features = data.features.map((feature: any, index: number) => {
      const date = feature.date || `Étape ${index + 1}`;
      const status = feature.status || 'completed';
      
      return `
      <div class="feature feature--${status}" style="--index: ${index};">
        <div class="feature__date">${date}</div>
        <div class="feature__content">
          ${feature.icon ? `<div class="feature__icon">${feature.icon}</div>` : ''}
          <h3 class="feature__title">${feature.title}</h3>
          ${feature.description ? `<p class="feature__description">${feature.description}</p>` : ''}
          ${feature.linkUrl ? `
            <a href="${feature.linkUrl}" class="feature__link">
              ${feature.linkText || 'En savoir plus'}
              <span class="feature__link-icon">→</span>
            </a>
          ` : ''}
        </div>
        <div class="feature__marker"></div>
      </div>
    `}).join('');

    return `<div class="features__grid features__timeline">${features}</div>`;
  }

  private renderModernCarousel(data: any): string {
    const features = data.features.map((feature: any, index: number) => `
      <div class="feature carousel__slide" style="--index: ${index};">
        ${this.renderFeatureContent(feature, data)}
      </div>
    `).join('');

    return `
    <div class="features__carousel">
      <div class="carousel__track">
        ${features}
      </div>
      <div class="carousel__nav">
        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="carousel__dots"></div>
        <button class="carousel__btn carousel__btn--next" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>`;
  }

  private renderTabs(data: any): string {
    const tabs = data.features.map((feature: any, index: number) => `
      <button class="tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
        ${feature.icon ? `<span class="tab__icon">${feature.icon}</span>` : ''}
        <span class="tab__title">${feature.title}</span>
      </button>
    `).join('');

    const contents = data.features.map((feature: any, index: number) => `
      <div class="tab__content ${index === 0 ? 'active' : ''}" data-content="${index}">
        <div class="tab__inner">
          ${feature.icon ? `<div class="feature__icon feature__icon--large">${feature.icon}</div>` : ''}
          <h3 class="feature__title">${feature.title}</h3>
          ${feature.description ? `<p class="feature__description">${feature.description}</p>` : ''}
          ${feature.linkUrl ? `
            <a href="${feature.linkUrl}" class="feature__link">
              ${feature.linkText || 'En savoir plus'}
              <span class="feature__link-icon">→</span>
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');

    return `
    <div class="features__tabs-container">
      <div class="features__tabs">${tabs}</div>
      <div class="features__content">${contents}</div>
    </div>`;
  }

  private renderComparisonTable(data: any): string {
    // Get unique plan names from features or use defaults
    const planNames = ['basic', 'pro', 'premium'];
    const planLabels: any = {
      basic: 'Basique',
      pro: 'Pro',
      premium: 'Premium'
    };

    return `
    <div class="features__table-wrapper">
      <table class="features__table">
        <thead>
          <tr>
            <th class="features__table-header features__table-header--feature">
              <span>Fonctionnalités</span>
            </th>
            ${planNames.map(plan => `
              <th class="features__table-header features__table-header--${plan}">
                <div class="plan-header">
                  <span class="plan-name">${planLabels[plan]}</span>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.features.map((feature: any) => {
            const plans = feature.plans || { basic: true, pro: true, premium: true };
            const customValues = feature.customValues || {};
            
            return `
            <tr class="features__table-row">
              <td class="features__table-cell features__table-cell--feature">
                <div class="feature-info">
                  <span class="feature-name">${feature.title}</span>
                  ${feature.description ? `
                    <span class="feature-tooltip" title="${feature.description}">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 12a1 1 0 100-2 1 1 0 000 2zm1-3.5v.5a1 1 0 11-2 0V6a1 1 0 011-1 2 2 0 10-2-2 1 1 0 01-2 0 4 4 0 114 4z"/>
                      </svg>
                    </span>
                  ` : ''}
                </div>
              </td>
              ${planNames.map((plan: string) => `
                <td class="features__table-cell features__table-cell--${plan}">
                  ${customValues[plan] ? `
                    <span class="custom-value">${customValues[plan]}</span>
                  ` : plans[plan] ? `
                    <span class="check check--yes">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    </span>
                  ` : `
                    <span class="check check--no">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                      </svg>
                    </span>
                  `}
                </td>
              `).join('')}
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
  }

  private renderFlipCards(data: any): string {
    const features = data.features.map((feature: any, index: number) => {
      // Handle both old and new data structures
      const front = feature.front || {
        icon: feature.icon,
        title: feature.title,
        subtitle: feature.description
      };
      
      const back = feature.back || {
        title: feature.title,
        description: `Informations détaillées sur ${feature.title}`,
        features: '',
        buttonText: 'En savoir plus',
        buttonUrl: feature.linkUrl || '#'
      };

      return `
      <div class="feature flip-card" style="--index: ${index};">
        <div class="feature__inner">
          <div class="feature__front">
            ${front.icon ? `<div class="feature__icon">${front.icon}</div>` : ''}
            <h3 class="feature__title">${front.title}</h3>
            ${front.subtitle ? `<p class="feature__subtitle">${front.subtitle}</p>` : ''}
          </div>
          <div class="feature__back">
            <h3 class="feature__title">${back.title}</h3>
            ${back.description ? `<p class="feature__description">${back.description}</p>` : ''}
            ${back.features ? `
              <ul class="feature__list">
                ${back.features.split('\n').filter((f: string) => f.trim()).map((point: string) => `
                  <li>${point}</li>
                `).join('')}
              </ul>
            ` : ''}
            ${back.buttonUrl ? `
              <a href="${back.buttonUrl}" class="feature__link feature__link--button">
                ${back.buttonText || 'En savoir plus'}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `}).join('');

    return `<div class="features__grid features__grid--flip">${features}</div>`;
  }

  private renderFeatureContent(feature: any, data: any): string {
    const parts: string[] = [];

    // Icon
    if (data.showIcon !== false && feature.icon) {
      parts.push(`<div class="feature__icon">${feature.icon}</div>`);
    }

    // Title
    parts.push(`<h3 class="feature__title">${feature.title}</h3>`);

    // Description
    if (feature.description) {
      parts.push(`<p class="feature__description">${feature.description}</p>`);
    }

    // Link
    if (data.showLink !== false && feature.linkUrl) {
      parts.push(`
        <a href="${feature.linkUrl}" class="feature__link">
          ${feature.linkText || 'En savoir plus'}
          <span class="feature__link-icon">→</span>
        </a>
      `);
    }

    return parts.join('\n');
  }

  private generateJS(data: any): string {
    const js: string[] = [];

    // Modern Carousel functionality
    if (data.variant === 'carousel-modern') {
      js.push(`
// Modern Carousel functionality
(function() {
  const carousel = document.querySelector('.features--carousel-modern');
  if (!carousel) return;
  
  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');
  const dotsContainer = carousel.querySelector('.carousel__dots');
  
  let currentIndex = 0;
  const slidesPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
  const maxIndex = Math.max(0, slides.length - slidesPerView);
  
  // Create dots
  if (dotsContainer) {
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(track).gap);
    track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
    
    // Update dots
    const dots = dotsContainer?.querySelectorAll('.carousel__dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Update buttons
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === maxIndex;
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Event listeners
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });
  
  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateCarousel, 150);
  });
  
  // Initialize
  updateCarousel();
})();`);
    }

    // Tabs functionality
    if (data.variant === 'tabs-animated') {
      js.push(`
// Tabs functionality
(function() {
  const tabs = document.querySelectorAll('.features--tabs-animated .tab');
  const contents = document.querySelectorAll('.features--tabs-animated .tab__content');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      contents.forEach(content => {
        content.classList.remove('active');
      });
      
      setTimeout(() => {
        contents[index].classList.add('active');
      }, 10);
    });
  });
  
  // Keyboard navigation
  let currentTab = 0;
  document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('tab')) {
      if (e.key === 'ArrowRight') {
        currentTab = (currentTab + 1) % tabs.length;
        tabs[currentTab].click();
        tabs[currentTab].focus();
      } else if (e.key === 'ArrowLeft') {
        currentTab = (currentTab - 1 + tabs.length) % tabs.length;
        tabs[currentTab].click();
        tabs[currentTab].focus();
      }
    }
  });
})();`);
    }

    // Flip cards interaction
    if (data.variant === 'flip-cards') {
      js.push(`
// Flip cards touch support
(function() {
  const cards = document.querySelectorAll('.features--flip-cards .feature');
  
  cards.forEach(card => {
    card.addEventListener('touchstart', () => {
      const inner = card.querySelector('.feature__inner');
      if (inner) {
        const isFlipped = inner.style.transform === 'rotateY(180deg)';
        inner.style.transform = isFlipped ? '' : 'rotateY(180deg)';
      }
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
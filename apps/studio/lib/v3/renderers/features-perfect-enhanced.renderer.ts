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
      },
      
      // Features Collection with dynamic schema based on variant
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
          schema: this.getFeatureSchema()
        }
      }
    ];

    return customProps;
  }

  private getFeatureSchema(): any[] {
    // Base schema common to all variants
    const baseSchema = [
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
      }
    ];

    // Timeline specific fields
    const timelineSchema = [
      ...baseSchema,
      {
        name: 'date',
        label: 'Date ou étape',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Étape 1',
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'Ex: Janvier 2024, Étape 1, Phase A'
        }
      },
      {
        name: 'status',
        label: 'Statut',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'completed',
        options: [
          { value: 'completed', label: '✅ Complété' },
          { value: 'in-progress', label: '🔄 En cours' },
          { value: 'upcoming', label: '⏳ À venir' }
        ],
        editorConfig: {
          control: EditorControl.SELECT
        }
      }
    ];

    // Comparison table specific fields
    const comparisonSchema = [
      {
        name: 'title',
        label: 'Fonctionnalité',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Nouvelle fonctionnalité',
        editorConfig: {
          control: EditorControl.TEXT
        }
      },
      {
        name: 'description',
        label: 'Description (tooltip)',
        type: PropType.STRING,
        required: false,
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'Info-bulle au survol'
        }
      },
      {
        name: 'plans',
        label: 'Disponibilité par plan',
        type: PropType.OBJECT,
        required: true,
        defaultValue: {
          basic: true,
          pro: true,
          premium: true
        },
        editorConfig: {
          control: EditorControl.OBJECT,
          schema: [
            {
              name: 'basic',
              label: 'Plan Basique',
              type: PropType.BOOLEAN,
              defaultValue: true,
              editorConfig: { control: EditorControl.TOGGLE }
            },
            {
              name: 'pro',
              label: 'Plan Pro',
              type: PropType.BOOLEAN,
              defaultValue: true,
              editorConfig: { control: EditorControl.TOGGLE }
            },
            {
              name: 'premium',
              label: 'Plan Premium',
              type: PropType.BOOLEAN,
              defaultValue: true,
              editorConfig: { control: EditorControl.TOGGLE }
            }
          ]
        }
      },
      {
        name: 'customValues',
        label: 'Valeurs personnalisées (optionnel)',
        type: PropType.OBJECT,
        required: false,
        editorConfig: {
          control: EditorControl.OBJECT,
          schema: [
            {
              name: 'basic',
              label: 'Valeur Basique',
              type: PropType.STRING,
              editorConfig: { 
                control: EditorControl.TEXT,
                placeholder: 'Ex: 10 GB, 5 utilisateurs'
              }
            },
            {
              name: 'pro',
              label: 'Valeur Pro',
              type: PropType.STRING,
              editorConfig: { 
                control: EditorControl.TEXT,
                placeholder: 'Ex: 100 GB, 50 utilisateurs'
              }
            },
            {
              name: 'premium',
              label: 'Valeur Premium',
              type: PropType.STRING,
              editorConfig: { 
                control: EditorControl.TEXT,
                placeholder: 'Ex: Illimité'
              }
            }
          ]
        }
      }
    ];

    // Flip cards specific fields
    const flipCardSchema = [
      {
        name: 'front',
        label: 'Face avant',
        type: PropType.OBJECT,
        required: true,
        editorConfig: {
          control: EditorControl.OBJECT,
          schema: [
            {
              name: 'icon',
              label: 'Icône',
              type: PropType.STRING,
              defaultValue: '⭐',
              editorConfig: {
                control: EditorControl.ICON_PICKER
              }
            },
            {
              name: 'title',
              label: 'Titre',
              type: PropType.STRING,
              required: true,
              defaultValue: 'Titre avant',
              editorConfig: {
                control: EditorControl.TEXT
              }
            },
            {
              name: 'subtitle',
              label: 'Sous-titre',
              type: PropType.STRING,
              editorConfig: {
                control: EditorControl.TEXT
              }
            }
          ]
        }
      },
      {
        name: 'back',
        label: 'Face arrière',
        type: PropType.OBJECT,
        required: true,
        editorConfig: {
          control: EditorControl.OBJECT,
          schema: [
            {
              name: 'title',
              label: 'Titre',
              type: PropType.STRING,
              required: true,
              defaultValue: 'Titre arrière',
              editorConfig: {
                control: EditorControl.TEXT
              }
            },
            {
              name: 'description',
              label: 'Description',
              type: PropType.STRING,
              required: true,
              defaultValue: 'Description détaillée',
              editorConfig: {
                control: EditorControl.TEXTAREA,
                rows: 4
              }
            },
            {
              name: 'features',
              label: 'Points clés (un par ligne)',
              type: PropType.STRING,
              editorConfig: {
                control: EditorControl.TEXTAREA,
                rows: 3,
                placeholder: '✓ Point 1\n✓ Point 2\n✓ Point 3'
              }
            },
            {
              name: 'buttonText',
              label: 'Texte du bouton',
              type: PropType.STRING,
              defaultValue: 'En savoir plus',
              editorConfig: {
                control: EditorControl.TEXT
              }
            },
            {
              name: 'buttonUrl',
              label: 'Lien du bouton',
              type: PropType.STRING,
              defaultValue: '#',
              editorConfig: {
                control: EditorControl.TEXT
              }
            }
          ]
        }
      }
    ];

    // Add common fields to all variants except comparison table
    const commonFields = [
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
          control: EditorControl.TEXT
        }
      }
    ];

    // Return default schema (will be dynamic in the future based on selected variant)
    return [...baseSchema, ...commonFields];
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

/* Timeline Vertical */
.features--timeline-vertical .features__timeline {
  position: relative;
  padding: 2rem 0;
}

.features--timeline-vertical .features__timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--features-primary) 0%, var(--features-secondary) 100%);
}

.features--timeline-vertical .feature {
  position: relative;
  width: calc(50% - 3rem);
  margin-bottom: 4rem;
  opacity: 0;
  animation: featuresSlideIn 0.8s ease-out forwards;
  animation-delay: calc(var(--index) * 0.15s);
}

.features--timeline-vertical .feature:nth-child(odd) {
  margin-left: 0;
  text-align: right;
  padding-right: 3rem;
  --direction: -20px;
}

.features--timeline-vertical .feature:nth-child(even) {
  margin-left: calc(50% + 3rem);
  text-align: left;
  padding-left: 3rem;
  --direction: 20px;
}

.features--timeline-vertical .feature__date {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--features-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.features--timeline-vertical .feature__content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.features--timeline-vertical .feature:hover .feature__content {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.15);
}

.features--timeline-vertical .feature__marker {
  position: absolute;
  width: 24px;
  height: 24px;
  background: white;
  border: 4px solid var(--features-primary);
  border-radius: 50%;
  top: 1rem;
  transition: all 0.3s;
}

.features--timeline-vertical .feature:hover .feature__marker {
  transform: scale(1.2);
  border-color: var(--features-secondary);
}

.features--timeline-vertical .feature:nth-child(odd) .feature__marker {
  right: -3rem;
}

.features--timeline-vertical .feature:nth-child(even) .feature__marker {
  left: -3rem;
}

.features--timeline-vertical .feature--completed .feature__marker {
  background: var(--features-primary);
}

.features--timeline-vertical .feature--in-progress .feature__marker {
  background: #f59e0b;
  border-color: #f59e0b;
}

.features--timeline-vertical .feature--upcoming .feature__marker {
  background: #e5e7eb;
  border-color: #e5e7eb;
}

@keyframes featuresSlideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Carousel Modern */
.features--carousel-modern .features__carousel {
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

.features--carousel-modern .carousel__track {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.features--carousel-modern .carousel__slide {
  flex: 0 0 calc(33.333% - 1.333rem);
  min-width: 320px;
  border-radius: 1.5rem;
  padding: 2.5rem;
  transition: all 0.4s;
}

@media (max-width: 1024px) {
  .features--carousel-modern .carousel__slide {
    flex: 0 0 calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .features--carousel-modern .carousel__slide {
    flex: 0 0 100%;
  }
}

.features--carousel-modern .carousel__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.features--carousel-modern .carousel__btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.features--carousel-modern .carousel__btn:hover {
  background: var(--features-primary);
  border-color: var(--features-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.features--carousel-modern .carousel__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.features--carousel-modern .carousel__dots {
  display: flex;
  gap: 0.5rem;
}

.features--carousel-modern .carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s;
}

.features--carousel-modern .carousel__dot.active {
  width: 24px;
  border-radius: 4px;
  background: var(--features-primary);
}

/* Tabs Animated */
.features--tabs-animated .features__tabs-container {
  max-width: 1000px;
  margin: 0 auto;
}

.features--tabs-animated .features__tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: #f3f4f6;
  padding: 0.5rem;
  border-radius: 1rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.features--tabs-animated .tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.features--tabs-animated .tab__icon {
  font-size: 1.25rem;
  transition: transform 0.3s;
}

.features--tabs-animated .tab:hover {
  color: var(--features-primary);
  transform: translateY(-1px);
}

.features--tabs-animated .tab:hover .tab__icon {
  transform: scale(1.1);
}

.features--tabs-animated .tab.active {
  color: white;
  background: linear-gradient(135deg, var(--features-primary), var(--features-secondary));
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.features--tabs-animated .features__content {
  position: relative;
  min-height: 400px;
}

.features--tabs-animated .tab__content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.features--tabs-animated .tab__content.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.features--tabs-animated .tab__inner {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.features--tabs-animated .feature__icon--large {
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
  font-size: 3rem;
  background: linear-gradient(135deg, rgba(var(--features-primary-rgb, 102, 126, 234), 0.1), rgba(var(--features-secondary-rgb, 118, 75, 162), 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
}

/* Masonry Creative */
.features--masonry-creative .features__grid {
  column-count: 3;
  column-gap: 2rem;
}

.features--masonry-creative .feature {
  break-inside: avoid;
  margin-bottom: 2rem;
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.4s;
  opacity: 0;
  animation: featuresFadeIn 0.8s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.features--masonry-creative .feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}

/* Comparison Table */
.features--comparison-table .features__table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.features--comparison-table .features__table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 600px;
}

.features--comparison-table .features__table-header {
  padding: 1.5rem 1.25rem;
  text-align: center;
  position: relative;
}

.features--comparison-table .features__table-header--feature {
  text-align: left;
  background: #f9fafb;
  font-weight: 700;
  color: #111827;
}

.features--comparison-table .features__table-header--basic {
  background: #e5e7eb;
}

.features--comparison-table .features__table-header--pro {
  background: linear-gradient(135deg, var(--features-primary), var(--features-secondary));
  color: white;
}

.features--comparison-table .features__table-header--premium {
  background: #111827;
  color: white;
}

.features--comparison-table .plan-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.features--comparison-table .plan-name {
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.features--comparison-table .features__table-row {
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s;
}

.features--comparison-table .features__table-row:hover {
  background: rgba(102, 126, 234, 0.02);
}

.features--comparison-table .features__table-cell {
  padding: 1.25rem;
  text-align: center;
}

.features--comparison-table .features__table-cell--feature {
  text-align: left;
  font-weight: 500;
}

.features--comparison-table .feature-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.features--comparison-table .feature-tooltip {
  color: #9ca3af;
  cursor: help;
  display: inline-flex;
  align-items: center;
}

.features--comparison-table .check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.features--comparison-table .check--yes {
  color: #10b981;
}

.features--comparison-table .check--no {
  color: #ef4444;
}

.features--comparison-table .custom-value {
  font-weight: 600;
  color: var(--features-primary);
}

/* Flip Cards */
.features--flip-cards .features__grid--flip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.features--flip-cards .flip-card {
  position: relative;
  height: 400px;
  perspective: 1200px;
  cursor: pointer;
}

.features--flip-cards .feature__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.features--flip-cards .flip-card:hover .feature__inner {
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
  overflow: hidden;
}

.features--flip-cards .feature__front {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.features--flip-cards .feature__front .feature__icon {
  width: 90px;
  height: 90px;
  margin-bottom: 1.5rem;
  font-size: 3rem;
  background: linear-gradient(135deg, rgba(var(--features-primary-rgb, 102, 126, 234), 0.1), rgba(var(--features-secondary-rgb, 118, 75, 162), 0.1));
}

.features--flip-cards .feature__front .feature__title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.features--flip-cards .feature__front .feature__subtitle {
  color: #6b7280;
  line-height: 1.6;
}

.features--flip-cards .feature__back {
  background: linear-gradient(135deg, var(--features-primary) 0%, var(--features-secondary) 100%);
  color: white;
  transform: rotateY(180deg);
  padding: 2rem;
}

.features--flip-cards .feature__back .feature__title {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.features--flip-cards .feature__back .feature__description {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.features--flip-cards .feature__back .feature__list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
  width: 100%;
}

.features--flip-cards .feature__back .feature__list li {
  padding: 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.features--flip-cards .feature__back .feature__list li::before {
  content: '✓';
  color: white;
  font-weight: 700;
  flex-shrink: 0;
}

.features--flip-cards .feature__back .feature__link--button {
  color: var(--features-primary);
  background: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;
}

.features--flip-cards .feature__back .feature__link--button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@keyframes featuresFadeIn {
  to {
    opacity: 1;
  }
}

/* Cards Hover (deuxième variante de grid) */
.features--cards-hover .features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.features--cards-hover .feature {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e5e7eb;
}

.features--cards-hover .feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--features-primary) 0%, var(--features-secondary) 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s;
}

.features--cards-hover .feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px -10px rgba(102, 126, 234, 0.3);
  border-color: transparent;
}

.features--cards-hover .feature:hover::before {
  transform: scaleX(1);
}

/* ========================================
   VARIANTES VISUELLES (appliquées à toutes les dispositions)
   ======================================== */

/* Modern - avec les couleurs du thème */
.features--visual-modern .feature {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.features--visual-modern .feature__icon {
  background: linear-gradient(135deg, var(--features-primary) 0%, var(--features-secondary) 100%);
  color: white;
}

/* Minimal */
.features--visual-minimal .feature {
  background: transparent;
  border: 2px solid #e5e7eb;
  box-shadow: none;
}

.features--visual-minimal .feature:hover {
  border-color: var(--features-primary);
  background: rgba(102, 126, 234, 0.02);
}

.features--visual-minimal .feature__icon {
  background: transparent;
  border: 2px solid var(--features-primary);
  color: var(--features-primary);
}

.features--visual-minimal .feature__title {
  font-weight: 500;
}

/* Bold */
.features--visual-bold {
  background: #111;
  color: white;
}

.features--visual-bold .features__title,
.features--visual-bold .features__subtitle {
  color: white;
}

.features--visual-bold .feature {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.features--visual-bold .feature:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--features-primary);
}

.features--visual-bold .feature__icon {
  background: var(--features-primary);
  color: white;
  box-shadow: 0 10px 30px -5px rgba(102, 126, 234, 0.5);
}

.features--visual-bold .feature__title {
  color: white;
  font-weight: 700;
}

.features--visual-bold .feature__description {
  color: rgba(255, 255, 255, 0.8);
}

.features--visual-bold .feature__link {
  color: var(--features-primary);
  font-weight: 700;
}

/* Elegant */
.features--visual-elegant .feature {
  background: rgba(248, 249, 250, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.08);
}

.features--visual-elegant .feature:hover {
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.12);
}

.features--visual-elegant .feature__icon {
  background: transparent;
  border: 1px solid var(--features-primary);
  color: var(--features-primary);
  position: relative;
  overflow: visible;
}

.features--visual-elegant .feature__icon::after {
  content: '';
  position: absolute;
  inset: -5px;
  background: linear-gradient(135deg, var(--features-primary) 0%, var(--features-secondary) 100%);
  border-radius: inherit;
  opacity: 0.2;
  z-index: -1;
  filter: blur(10px);
}

.features--visual-elegant .feature__title {
  font-weight: 300;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
}

/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 1024px) {
  .features--timeline-vertical .feature {
    width: 100%;
    margin-left: 0 !important;
    text-align: left !important;
    padding-left: 3rem !important;
    padding-right: 0 !important;
  }
  
  .features--timeline-vertical .features__timeline::before {
    left: 0;
    transform: none;
  }
  
  .features--timeline-vertical .feature::after {
    left: -10px !important;
    right: auto !important;
  }
  
  .features--masonry-creative .features__grid {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 4rem 0;
  }
  
  .features__grid {
    grid-template-columns: 1fr !important;
  }
  
  .features--carousel-3d .features__grid {
    height: 400px;
  }
  
  .features--carousel-3d .feature {
    width: 280px;
    height: 380px;
  }
  
  .features--masonry-creative .features__grid {
    column-count: 1;
  }
  
  .features--tabs-animated .features__tabs {
    gap: 0.5rem;
  }
  
  .features--tabs-animated .tab {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
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

  private renderGrid(data: FeaturesData): string {
    const features = data.features.map((feature, index) => `
      <div class="feature" style="--index: ${index};" ${feature.category ? `data-category="${feature.category}"` : ''}>
        ${this.renderFeatureContent(feature, data)}
      </div>
    `).join('');

    return `<div class="features__grid">${features}</div>`;
  }

  private renderTimeline(data: FeaturesData): string {
    const features = data.features.map((feature: any, index) => {
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

  private renderModernCarousel(data: FeaturesData): string {
    const features = data.features.map((feature, index) => `
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

  private renderTabs(data: FeaturesData): string {
    const tabs = data.features.map((feature, index) => `
      <button class="tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
        ${feature.icon ? `<span class="tab__icon">${feature.icon}</span>` : ''}
        <span class="tab__title">${feature.title}</span>
      </button>
    `).join('');

    const contents = data.features.map((feature, index) => `
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

  private renderComparisonTable(data: FeaturesData): string {
    // Get unique plan names from features or use defaults
    const planNames = ['basic', 'pro', 'premium'];
    const planLabels = {
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
              ${planNames.map(plan => `
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

  private renderFlipCards(data: FeaturesData): string {
    const features = data.features.map((feature: any, index) => {
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
                ${back.features.split('\n').filter(f => f.trim()).map(point => `
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
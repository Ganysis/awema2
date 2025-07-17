/**
 * Pricing Renderer V3 PERFECT ENHANCED - Design magnifique avec variants de style
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { pricingDataSchema, pricingDefaults, type PricingData } from '../schemas/blocks/pricing';
import { logger } from '../core/logger';

export class PricingRendererV3PerfectEnhanced extends BaseRendererV3<PricingData> {
  type = 'pricing-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('PricingRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Pricing V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<PricingData, PricingData> {
    return pricingDataSchema.safeParse(data);
  }

  getDefaultData(): PricingData {
    return pricingDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Structure PLATE pour éviter les [object Object]
   */
  getBlockProps(): BlockProp[] {
    // NE PAS utiliser super.getBlockProps() pour éviter les objets imbriqués
    const props: BlockProp[] = [
      // Propriétés harmonisées avec Services et Features V3
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

      // Type de disposition
      {
        name: 'layout',
        label: 'Type de disposition',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'cards-modern',
        description: 'Choisissez la disposition des tarifs',
        options: [
          { value: 'cards-modern', label: '📱 Cartes modernes - Design épuré' },
          { value: 'cards-gradient', label: '🌈 Cartes gradient - Effet visuel' },
          { value: 'cards-minimal', label: '⚡ Cartes minimales - Ultra simple' },
          { value: 'comparison-table', label: '📊 Tableau comparatif - Vue détaillée' },
          { value: 'cards-slider', label: '🎠 Carousel - Navigation fluide' },
          { value: 'toggle-view', label: '🔄 Vue toggle - Mensuel/Annuel' },
          { value: 'single-plan', label: '📄 Plan unique - Focus produit' },
          { value: 'cards-hover', label: '🎯 Cartes hover - Interactif' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Style',
          order: 2
        }
      },

      // Contenu principal
      {
        name: 'title',
        label: 'Titre principal',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Nos Tarifs',
        description: 'Le titre principal de la section tarifs',
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
        defaultValue: 'Choisissez le plan qui vous convient',
        description: 'Texte sous le titre principal',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 2
        }
      },

      // Plan 1 - Structure plate
      {
        name: 'plan1_name',
        label: 'Nom du plan 1',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Starter',
        description: 'Nom du premier plan tarifaire',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 1',
          order: 1
        }
      },
      {
        name: 'plan1_description',
        label: 'Description du plan 1',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Parfait pour démarrer',
        description: 'Description courte du plan',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 1',
          order: 2
        }
      },
      {
        name: 'plan1_price',
        label: 'Prix du plan 1',
        type: PropType.NUMBER,
        required: true,
        defaultValue: 29,
        description: 'Prix du plan (nombre uniquement)',
        editorConfig: {
          control: EditorControl.NUMBER,
          group: 'Plan 1',
          order: 3
        }
      },
      {
        name: 'plan1_currency',
        label: 'Devise',
        type: PropType.STRING,
        required: false,
        defaultValue: '€',
        description: 'Symbole de la devise',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 1',
          order: 4
        }
      },
      {
        name: 'plan1_period',
        label: 'Période',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'month',
        description: 'Période de facturation',
        options: [
          { value: 'month', label: 'Par mois' },
          { value: 'year', label: 'Par an' },
          { value: 'once', label: 'Une fois' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Plan 1',
          order: 5
        }
      },
      {
        name: 'plan1_features',
        label: 'Caractéristiques',
        type: PropType.STRING,
        required: false,
        defaultValue: '✓ 1 site web\n✓ Hébergement inclus\n✓ Support par email\n✓ SSL gratuit\n✗ Personnalisation avancée\n✗ Support prioritaire',
        description: 'Liste des caractéristiques (une par ligne, utilisez ✓ ou ✗)',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Plan 1',
          order: 6,
          rows: 6
        }
      },
      {
        name: 'plan1_cta_text',
        label: 'Texte du bouton',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Commencer',
        description: 'Texte du bouton d\'action',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 1',
          order: 7
        }
      },
      {
        name: 'plan1_popular',
        label: 'Plan populaire',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Mettre en avant ce plan',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Plan 1',
          order: 8
        }
      },

      // Plan 2 - Structure plate
      {
        name: 'plan2_name',
        label: 'Nom du plan 2',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Pro',
        description: 'Nom du deuxième plan tarifaire',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 2',
          order: 1,
          condition: {
            prop: 'plan1_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_description',
        label: 'Description du plan 2',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Pour les professionnels',
        description: 'Description courte du plan',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 2',
          order: 2,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_price',
        label: 'Prix du plan 2',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 59,
        description: 'Prix du plan (nombre uniquement)',
        editorConfig: {
          control: EditorControl.NUMBER,
          group: 'Plan 2',
          order: 3,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_currency',
        label: 'Devise',
        type: PropType.STRING,
        required: false,
        defaultValue: '€',
        description: 'Symbole de la devise',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 2',
          order: 4,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_period',
        label: 'Période',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'month',
        description: 'Période de facturation',
        options: [
          { value: 'month', label: 'Par mois' },
          { value: 'year', label: 'Par an' },
          { value: 'once', label: 'Une fois' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Plan 2',
          order: 5,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_features',
        label: 'Caractéristiques',
        type: PropType.STRING,
        required: false,
        defaultValue: '✓ 3 sites web\n✓ Hébergement premium\n✓ Support prioritaire\n✓ SSL gratuit\n✓ Personnalisation avancée\n✓ Analytics avancés',
        description: 'Liste des caractéristiques (une par ligne, utilisez ✓ ou ✗)',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Plan 2',
          order: 6,
          rows: 6,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_cta_text',
        label: 'Texte du bouton',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Choisir Pro',
        description: 'Texte du bouton d\'action',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 2',
          order: 7,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan2_popular',
        label: 'Plan populaire',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Mettre en avant ce plan',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Plan 2',
          order: 8,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },

      // Plan 3 - Structure plate
      {
        name: 'plan3_name',
        label: 'Nom du plan 3',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Enterprise',
        description: 'Nom du troisième plan tarifaire',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 3',
          order: 1,
          condition: {
            prop: 'plan2_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_description',
        label: 'Description du plan 3',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Solutions sur mesure',
        description: 'Description courte du plan',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 3',
          order: 2,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_price',
        label: 'Prix du plan 3',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 199,
        description: 'Prix du plan (nombre uniquement)',
        editorConfig: {
          control: EditorControl.NUMBER,
          group: 'Plan 3',
          order: 3,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_currency',
        label: 'Devise',
        type: PropType.STRING,
        required: false,
        defaultValue: '€',
        description: 'Symbole de la devise',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 3',
          order: 4,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_period',
        label: 'Période',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'month',
        description: 'Période de facturation',
        options: [
          { value: 'month', label: 'Par mois' },
          { value: 'year', label: 'Par an' },
          { value: 'once', label: 'Une fois' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Plan 3',
          order: 5,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_features',
        label: 'Caractéristiques',
        type: PropType.STRING,
        required: false,
        defaultValue: '✓ Sites illimités\n✓ Infrastructure dédiée\n✓ Support 24/7\n✓ SSL gratuit\n✓ Personnalisation complète\n✓ API access',
        description: 'Liste des caractéristiques (une par ligne, utilisez ✓ ou ✗)',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Plan 3',
          order: 6,
          rows: 6,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_cta_text',
        label: 'Texte du bouton',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Nous contacter',
        description: 'Texte du bouton d\'action',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Plan 3',
          order: 7,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      },
      {
        name: 'plan3_popular',
        label: 'Plan populaire',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Mettre en avant ce plan',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Plan 3',
          order: 8,
          condition: {
            prop: 'plan3_name',
            operator: 'NOT_EMPTY'
          }
        }
      }
    ];

    return props;
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   PRICING V3 PERFECT ENHANCED - Styles avec thème
   ======================================== */

/* Variables CSS utilitaires (non liées au thème) */
.pricing {
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900;
  --font-weight-light: 300;
  --line-height-tight: 1.25;
  --line-height-relaxed: 1.625;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
}

.pricing {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--color-background);
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
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.pricing__subtitle {
  font-family: var(--font-family-body);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ========================================
   STYLES DE VARIANTES AVEC THÈME
   ======================================== */

/* Style Moderne */
.pricing--modern {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--color-primary), transparent 95%) 0%, 
    var(--color-background) 50%);
}

.pricing--modern .pricing__card {
  background: var(--color-surface);
  border-radius: 2rem;
  padding: 3rem 2rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.pricing--modern .pricing__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transform: scaleX(0);
  transition: transform 0.3s;
}

.pricing--modern .pricing__card:hover::before {
  transform: scaleX(1);
}

.pricing--modern .pricing__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -10px color-mix(in srgb, var(--color-primary), transparent 70%);
}

.pricing--modern .pricing__card--featured {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: var(--color-background);
  transform: scale(1.05);
}

.pricing--modern .pricing__price {
  font-family: var(--font-family-heading);
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pricing--modern .pricing__card--featured .pricing__price {
  background: var(--color-background);
  -webkit-background-clip: text;
  background-clip: text;
}

.pricing--modern .pricing__button {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: var(--color-background);
  border: none;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-family: var(--font-family-body);
  font-weight: 600;
  transition: all 0.3s;
}

.pricing--modern .pricing__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--color-primary), transparent 50%);
}

/* Style Minimaliste */
.pricing--minimal {
  background: var(--color-background);
  padding: 8rem 0;
}

.pricing--minimal .pricing__header {
  margin-bottom: 6rem;
}

.pricing--minimal .pricing__title {
  font-family: var(--font-family-body);
  font-weight: 300;
  letter-spacing: -0.02em;
}

.pricing--minimal .pricing__card {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0;
  padding: 4rem 2rem;
  transition: all 0.3s ease;
  text-align: center;
}

.pricing--minimal .pricing__card:hover {
  border-color: var(--color-text-primary);
  background: var(--color-surface);
}

.pricing--minimal .pricing__name {
  font-family: var(--font-family-body);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.pricing--minimal .pricing__price {
  font-family: var(--font-family-body);
  font-size: 4rem;
  font-weight: 200;
  color: var(--color-text-primary);
  margin-bottom: 3rem;
}

.pricing--minimal .pricing__divider {
  width: 60px;
  height: 1px;
  background: var(--color-border);
  margin: 2rem auto;
}

.pricing--minimal .pricing__button {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-text-primary);
  padding: 0.75rem 2rem;
  font-family: var(--font-family-body);
  font-weight: 400;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing--minimal .pricing__button:hover {
  background: var(--color-text-primary);
  color: var(--color-background);
}

/* Styles spécifiques pour les cartes featured dans la variante minimal */
.pricing--minimal .pricing__card--featured {
  background: var(--color-surface);
  border: 2px solid var(--color-primary);
  color: var(--color-text-primary);
}

.pricing--minimal .pricing__card--featured .pricing__name,
.pricing--minimal .pricing__card--featured .pricing__price,
.pricing--minimal .pricing__card--featured .pricing__description {
  color: var(--color-text-primary);
}

.pricing--minimal .pricing__card--featured .pricing__price-value {
  color: var(--color-primary);
  font-weight: 400;
}

.pricing--minimal .pricing__card--featured .pricing__badge {
  background: var(--color-primary);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.pricing--minimal .pricing__card--featured .pricing__button {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  font-weight: 500;
}

.pricing--minimal .pricing__card--featured .pricing__button:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.pricing--minimal .pricing__card--featured .pricing__feature {
  color: var(--color-text-primary);
}

.pricing--minimal .pricing__card--featured .pricing__feature-icon circle {
  fill: var(--color-primary);
  opacity: 0.15;
}

.pricing--minimal .pricing__card--featured .pricing__feature-icon path {
  stroke: var(--color-primary);
}

/* Style Impact */
.pricing--bold {
  background: var(--color-text-primary);
  color: var(--color-background);
  padding: 8rem 0;
  position: relative;
}

.pricing--bold::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      color-mix(in srgb, var(--color-background), transparent 95%) 20px,
      color-mix(in srgb, var(--color-background), transparent 95%) 40px
    );
  pointer-events: none;
}

.pricing--bold .pricing__title {
  font-family: var(--font-family-heading);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: var(--color-background);
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

.pricing--bold .pricing__subtitle {
  color: var(--color-primary);
  font-weight: 600;
}

.pricing--bold .pricing__card {
  background: var(--color-background);
  color: var(--color-text-primary);
  border-radius: 0;
  padding: 3rem;
  position: relative;
  transform: rotate(-2deg);
  transition: all 0.3s;
  box-shadow: 10px 10px 0 var(--color-primary);
}

.pricing--bold .pricing__card:nth-child(even) {
  transform: rotate(2deg);
  box-shadow: -10px 10px 0 var(--color-secondary);
}

.pricing--bold .pricing__card:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 10;
}

.pricing--bold .pricing__price {
  font-family: var(--font-family-heading);
  font-size: 5rem;
  font-weight: 900;
  color: var(--color-primary);
  text-transform: uppercase;
}

.pricing--bold .pricing__button {
  background: var(--color-text-primary);
  color: var(--color-background);
  border: none;
  padding: 1.5rem 3rem;
  font-family: var(--font-family-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s;
}

.pricing--bold .pricing__button:hover {
  background: var(--color-primary);
  transform: scale(1.1);
}

/* Styles spécifiques pour les cartes featured dans la variante bold */
.pricing--bold .pricing__card--featured {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  transform: rotate(-2deg) scale(1.08);
  box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.3);
}

.pricing--bold .pricing__card--featured:nth-child(even) {
  transform: rotate(2deg) scale(1.08);
}

.pricing--bold .pricing__card--featured:hover {
  transform: rotate(0deg) scale(1.1);
}

/* Assurer la lisibilité du texte blanc sur fond gradient */
.pricing--bold .pricing__card--featured .pricing__name,
.pricing--bold .pricing__card--featured .pricing__description,
.pricing--bold .pricing__card--featured .pricing__price,
.pricing--bold .pricing__card--featured .pricing__currency,
.pricing--bold .pricing__card--featured .pricing__period,
.pricing--bold .pricing__card--featured .pricing__feature {
  color: white !important;
}

.pricing--bold .pricing__card--featured .pricing__price {
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing--bold .pricing__card--featured .pricing__badge {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pricing--bold .pricing__card--featured .pricing__button {
  background: white;
  color: var(--color-primary);
  border: 2px solid white;
  font-weight: 800;
}

.pricing--bold .pricing__card--featured .pricing__button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.pricing--bold .pricing__card--featured .pricing__feature-icon circle {
  fill: rgba(255, 255, 255, 0.2);
}

.pricing--bold .pricing__card--featured .pricing__feature-icon path {
  stroke: white;
}

.pricing--bold .pricing__card--featured .pricing__divider {
  background: rgba(255, 255, 255, 0.3);
}

/* Style Élégant */
.pricing--elegant {
  background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-background) 100%);
  padding: 10rem 0;
  position: relative;
}

.pricing--elegant::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    color-mix(in srgb, var(--color-accent), transparent 90%), 
    transparent);
  filter: blur(100px);
  pointer-events: none;
}

.pricing--elegant .pricing__title {
  font-family: var(--font-family-heading);
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.02em;
}

.pricing--elegant .pricing__subtitle {
  text-align: center;
  font-style: italic;
}

.pricing--elegant .pricing__card {
  background: color-mix(in srgb, var(--color-surface), transparent 50%);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--color-border), transparent 50%);
  border-radius: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.pricing--elegant .pricing__card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-accent));
  border-radius: 2rem;
  opacity: 0;
  transition: opacity 0.4s;
  z-index: -1;
}

.pricing--elegant .pricing__card:hover::before {
  opacity: 1;
}

.pricing--elegant .pricing__card:hover {
  background: var(--color-surface);
  transform: translateY(-4px);
}

.pricing--elegant .pricing__price {
  font-family: var(--font-family-heading);
  font-size: 3rem;
  font-weight: 300;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.pricing--elegant .pricing__button {
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-primary);
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-family: var(--font-family-body);
  font-weight: 500;
  transition: all 0.3s;
}

.pricing--elegant .pricing__button:hover {
  background: var(--color-primary);
  color: var(--color-background);
  border-color: var(--color-primary);
}

/* Styles spécifiques pour les cartes featured dans la variante elegant */
.pricing--elegant .pricing__card--featured {
  background: color-mix(in srgb, var(--color-surface), transparent 30%);
  backdrop-filter: blur(30px);
  border: 2px solid color-mix(in srgb, var(--color-primary), transparent 30%);
  box-shadow: 0 20px 40px -10px color-mix(in srgb, var(--color-primary), transparent 30%);
  color: var(--color-text-primary);
}

.pricing--elegant .pricing__card--featured::before {
  opacity: 0.8;
}

.pricing--elegant .pricing__card--featured .pricing__name,
.pricing--elegant .pricing__card--featured .pricing__description,
.pricing--elegant .pricing__card--featured .pricing__price-value,
.pricing--elegant .pricing__card--featured .pricing__feature {
  color: var(--color-text-primary);
}

.pricing--elegant .pricing__card--featured .pricing__price-value {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 400;
}

.pricing--elegant .pricing__card--featured .pricing__currency,
.pricing--elegant .pricing__card--featured .pricing__period {
  color: var(--color-text-secondary);
}

.pricing--elegant .pricing__card--featured .pricing__badge {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pricing--elegant .pricing__card--featured .pricing__button {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  border: none;
  font-weight: 600;
}

.pricing--elegant .pricing__card--featured .pricing__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--color-primary), transparent 50%);
}

.pricing--elegant .pricing__card--featured .pricing__feature-icon circle {
  fill: var(--color-primary);
  opacity: 0.15;
}

.pricing--elegant .pricing__card--featured .pricing__feature-icon path {
  stroke: var(--color-primary);
}

/* Effet hover adaptatif pour glassmorphism */
.pricing--elegant .pricing__card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.pricing--elegant .pricing__card:hover {
  background: color-mix(in srgb, var(--color-primary), transparent 85%);
  backdrop-filter: blur(40px);
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 30px 60px -20px color-mix(in srgb, var(--color-primary), transparent 50%);
}

/* Adaptation des couleurs au hover pour meilleur contraste */
.pricing--elegant .pricing__card:hover .pricing__name,
.pricing--elegant .pricing__card:hover .pricing__description,
.pricing--elegant .pricing__card:hover .pricing__price-value,
.pricing--elegant .pricing__card:hover .pricing__currency,
.pricing--elegant .pricing__card:hover .pricing__period,
.pricing--elegant .pricing__card:hover .pricing__feature {
  color: white;
  transition: color 0.3s ease;
}

.pricing--elegant .pricing__card:hover .pricing__price-value {
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pricing--elegant .pricing__card:hover .pricing__button {
  background: white;
  color: var(--color-primary);
  border-color: white;
}

.pricing--elegant .pricing__card:hover .pricing__feature-icon circle {
  fill: rgba(255, 255, 255, 0.2);
}

.pricing--elegant .pricing__card:hover .pricing__feature-icon path {
  stroke: white;
}

/* Hover spécifique pour les cartes featured */
.pricing--elegant .pricing__card--featured:hover {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--color-primary), transparent 20%),
    color-mix(in srgb, var(--color-secondary), transparent 20%)
  );
  backdrop-filter: blur(50px);
}

.pricing--elegant .pricing__card--featured:hover .pricing__button {
  background: white;
  color: var(--color-primary);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

/* ========================================
   STYLES DE BASE DES CARTES
   ======================================== */

/* Styles par défaut pour toutes les cartes - Meilleur contraste */
.pricing__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s ease;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pricing__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  border-color: var(--color-primary);
}

.pricing__badge {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing__name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 1.5rem 0 0.5rem;
}

.pricing__description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  margin-bottom: 2rem;
}

.pricing__price-wrapper {
  margin: 2rem 0;
}

.pricing__price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.pricing__currency {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.pricing__price-value {
  font-size: 3.5rem;
  font-weight: var(--font-weight-black);
  color: var(--color-text-primary);
  line-height: 1;
}

.pricing__period {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-normal);
}

.pricing__features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  flex: 1;
}

.pricing__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
}

.pricing__feature--disabled {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.pricing__feature-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.pricing__feature-icon svg {
  width: 100%;
  height: 100%;
}

/* Carte mise en avant avec meilleur contraste */
.pricing__card--featured {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  transform: scale(1.05);
  z-index: 1;
}

.pricing__card--featured .pricing__name,
.pricing__card--featured .pricing__price-value,
.pricing__card--featured .pricing__feature {
  color: white;
}

.pricing__card--featured .pricing__description,
.pricing__card--featured .pricing__currency,
.pricing__card--featured .pricing__period {
  color: rgba(255, 255, 255, 0.9);
}

.pricing__card--featured .pricing__badge {
  background: white;
  color: var(--color-primary);
}

.pricing__card--featured .pricing__button--primary {
  background: white;
  color: var(--color-primary);
  border-color: white;
}

.pricing__card--featured .pricing__button--primary:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

/* ========================================
   LAYOUTS DE CARTES AMÉLIORÉS
   ======================================== */

/* Cards Modern - Design épuré et moderne (PAR DÉFAUT) */
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch;
}

.pricing-layout--cards-modern .pricing__grid {
  /* Hérite des styles par défaut ci-dessus */
}

/* Cards Gradient - Effets visuels gradients */
.pricing-layout--cards-gradient .pricing__card {
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-secondary) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.pricing-layout--cards-gradient .pricing__card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.1) 0%, 
    transparent 70%);
  animation: float 20s infinite ease-in-out;
}

/* Cards Minimal - Ultra simple et épuré */
.pricing-layout--cards-minimal .pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-layout--cards-minimal .pricing__card {
  border: 1px solid var(--color-border);
  background: transparent;
  padding: 2rem;
  text-align: center;
}

/* Styles spécifiques pour les cartes featured dans cards-minimal layout */
.pricing-layout--cards-minimal .pricing__card--featured {
  background: var(--color-surface);
  border: 2px solid var(--color-primary);
  color: var(--color-text-primary);
}

.pricing-layout--cards-minimal .pricing__card--featured .pricing__name,
.pricing-layout--cards-minimal .pricing__card--featured .pricing__description,
.pricing-layout--cards-minimal .pricing__card--featured .pricing__price-value,
.pricing-layout--cards-minimal .pricing__card--featured .pricing__currency,
.pricing-layout--cards-minimal .pricing__card--featured .pricing__period,
.pricing-layout--cards-minimal .pricing__card--featured .pricing__feature {
  color: var(--color-text-primary) !important;
}

.pricing-layout--cards-minimal .pricing__card--featured .pricing__feature-icon circle {
  fill: var(--color-primary);
  opacity: 0.15;
}

.pricing-layout--cards-minimal .pricing__card--featured .pricing__feature-icon path {
  stroke: var(--color-primary);
}

.pricing-layout--cards-minimal .pricing__card--featured .pricing__button--primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pricing-layout--cards-minimal .pricing__card--featured .pricing__badge {
  background: var(--color-primary);
  color: white;
}

/* Cards Hover - Effets interactifs au survol */
.pricing-layout--cards-hover .pricing__card {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.pricing-layout--cards-hover .pricing__card:hover {
  transform: rotateY(10deg) rotateX(-10deg);
}

.pricing-layout--cards-hover .pricing__card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    var(--color-primary-light) 50%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.pricing-layout--cards-hover .pricing__card:hover::after {
  opacity: 1;
  animation: shimmer 0.6s ease-out;
}

/* Styles spécifiques pour cards-hover featured */
.pricing-layout--cards-hover .pricing__card--featured {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
}

.pricing-layout--cards-hover .pricing__card--featured .pricing__name,
.pricing-layout--cards-hover .pricing__card--featured .pricing__description,
.pricing-layout--cards-hover .pricing__card--featured .pricing__price-value,
.pricing-layout--cards-hover .pricing__card--featured .pricing__currency,
.pricing-layout--cards-hover .pricing__card--featured .pricing__period,
.pricing-layout--cards-hover .pricing__card--featured .pricing__feature {
  color: white !important;
}

.pricing-layout--cards-hover .pricing__card--featured .pricing__feature-icon circle {
  fill: rgba(255, 255, 255, 0.2);
}

.pricing-layout--cards-hover .pricing__card--featured .pricing__feature-icon path {
  stroke: white;
}

.pricing-layout--cards-hover .pricing__card--featured .pricing__button--primary {
  background: white;
  color: var(--color-primary);
}

.pricing-layout--cards-hover .pricing__card--featured .pricing__badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

/* Comparison Table - Vue détaillée en tableau */
.pricing-layout--comparison-table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.pricing-layout--comparison-table .pricing__table {
  width: 100%;
  min-width: 800px;
  border-collapse: separate;
  border-spacing: 0;
}

.pricing-layout--comparison-table th,
.pricing-layout--comparison-table td {
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.pricing-layout--comparison-table th {
  background: var(--color-surface);
  font-weight: var(--font-weight-bold);
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Toggle View - Bascule mensuel/annuel */
.pricing-layout--toggle-view .pricing__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.pricing-layout--toggle-view .pricing__toggle-switch {
  width: 60px;
  height: 30px;
  background: var(--color-border);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.pricing-layout--toggle-view .pricing__toggle-switch.active {
  background: var(--color-primary);
}

.pricing-layout--toggle-view .pricing__toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.pricing-layout--toggle-view .pricing__toggle-switch.active .pricing__toggle-slider {
  transform: translateX(30px);
}

/* Single Plan - Focus sur un seul produit */
.pricing-layout--single-plan .pricing__card {
  max-width: 500px;
  margin: 0 auto;
  padding: 4rem;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

/* Cards Slider - Carousel fluide */
.pricing-layout--cards-slider {
  position: relative;
  overflow: hidden;
  padding: 0 3rem;
}

.pricing-layout--cards-slider .pricing__slider {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
  padding: 2rem 0;
}

.pricing-layout--cards-slider .pricing__slide {
  flex: 0 0 350px;
  scroll-snap-align: center;
}

.pricing-layout--cards-slider .pricing__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.pricing-layout--cards-slider .pricing__nav:hover {
  background: var(--color-primary-dark);
  transform: translateY(-50%) scale(1.1);
}

.pricing-layout--cards-slider .pricing__nav--prev {
  left: 0;
}

.pricing-layout--cards-slider .pricing__nav--next {
  right: 0;
}

/* ========================================
   ÉLÉMENTS COMMUNS AVEC THÈME
   ======================================== */

/* Styles de boutons généraux */
.pricing__button {
  display: inline-block;
  width: 100%;
  padding: 1rem 2rem;
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.pricing__button--primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pricing__button--primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px var(--color-primary);
}

.pricing__button--outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.pricing__button--outline:hover {
  background: var(--color-primary);
  color: white;
}

/* Toggle période avec thème */
.pricing__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0 3rem;
}

.pricing__toggle-label {
  font-family: var(--font-family-body);
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color 0.3s;
}

.pricing__toggle-label.active {
  color: var(--color-text-primary);
}

.pricing__toggle-switch {
  position: relative;
  width: 60px;
  height: 32px;
  background: var(--color-border);
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s;
}

.pricing__toggle-switch.active {
  background: var(--color-primary);
}

.pricing__toggle-slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: var(--color-background);
  border-radius: 50%;
  transition: transform 0.3s;
}

.pricing__toggle-switch.active .pricing__toggle-slider {
  transform: translateX(28px);
}

/* Badge économie avec thème */
.pricing__save {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-background);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  font-family: var(--font-family-body);
}

/* Nom du plan avec thème */
.pricing__name {
  font-family: var(--font-family-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

/* Description avec thème */
.pricing__description {
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

/* Prix avec thème */
.pricing__price-wrapper {
  margin-bottom: 2rem;
}

.pricing__currency {
  font-size: 1.5rem;
  color: var(--color-text-secondary);
}

.pricing__period {
  font-family: var(--font-family-body);
  font-size: 1rem;
  color: var(--color-text-secondary);
}

/* Features avec thème */
.pricing__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.pricing__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-family: var(--font-family-body);
  color: var(--color-text-primary);
}

.pricing__feature-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.pricing__feature--disabled {
  opacity: 0.5;
  text-decoration: line-through;
}

.pricing__feature--disabled .pricing__feature-icon {
  color: var(--color-text-secondary);
}

/* Badge featured avec thème */
.pricing__badge {
  position: absolute;
  top: -0.5rem;
  right: 2rem;
  background: var(--color-accent);
  color: var(--color-background);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  font-weight: 600;
}

/* Garantie avec thème */
.pricing__guarantee {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
}

.pricing__guarantee-title {
  font-family: var(--font-family-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.pricing__guarantee-text {
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
}

/* FAQ avec thème */
.pricing__faq {
  margin-top: 4rem;
}

.pricing__faq-title {
  font-family: var(--font-family-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: 2rem;
}

.pricing__faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
}

.pricing__faq-question {
  padding: 1.5rem;
  font-family: var(--font-family-body);
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pricing__faq-answer {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s, padding 0.3s;
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
}

.pricing__faq-item.active .pricing__faq-answer {
  max-height: 200px;
  padding: 0 1.5rem 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .pricing--bold .pricing__card {
    transform: none;
    box-shadow: 0 10px 0 var(--color-primary);
  }
  
  .pricing--bold .pricing__card:nth-child(even) {
    transform: none;
    box-shadow: 0 10px 0 var(--color-secondary);
  }
}

/* Animations */
.pricing__card {
  opacity: 0;
  animation: pricingFadeIn 0.6s ease-out forwards;
}

.pricing__card:nth-child(1) { animation-delay: 0.1s; }
.pricing__card:nth-child(2) { animation-delay: 0.2s; }
.pricing__card:nth-child(3) { animation-delay: 0.3s; }
.pricing__card:nth-child(4) { animation-delay: 0.4s; }

@keyframes pricingFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Pricing V3 Perfect Enhanced - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation globale
  function initPricing() {
    const pricingSections = document.querySelectorAll('.pricing');
    
    pricingSections.forEach(section => {
      // Toggle période
      initPeriodToggle(section);
      
      // FAQ accordéon
      initFAQ(section);
      
      // Animations au scroll
      observePricing(section);
      
      // Layout spécifique
      const layout = Array.from(section.classList)
        .find(c => c.startsWith('pricing--'))
        ?.replace('pricing--', '');
      
      switch(layout) {
        case 'cards-slider':
          initCardsSlider(section);
          break;
        case 'comparison-table':
          initComparisonTable(section);
          break;
        case 'toggle-view':
          initToggleView(section);
          break;
      }
    });
  }
  
  // Toggle mensuel/annuel
  function initPeriodToggle(section) {
    const toggle = section.querySelector('.pricing__toggle-switch');
    const monthlyLabel = section.querySelector('[data-period="monthly"]');
    const yearlyLabel = section.querySelector('[data-period="yearly"]');
    const cards = section.querySelectorAll('.pricing__card');
    
    if (!toggle) return;
    
    let isYearly = false;
    
    toggle.addEventListener('click', () => {
      isYearly = !isYearly;
      toggle.classList.toggle('active', isYearly);
      
      // Update labels
      monthlyLabel?.classList.toggle('active', !isYearly);
      yearlyLabel?.classList.toggle('active', isYearly);
      
      // Update prices
      cards.forEach(card => {
        const monthlyPrice = card.querySelector('[data-price="monthly"]');
        const yearlyPrice = card.querySelector('[data-price="yearly"]');
        
        if (monthlyPrice && yearlyPrice) {
          monthlyPrice.style.display = isYearly ? 'none' : 'block';
          yearlyPrice.style.display = isYearly ? 'block' : 'none';
        }
        
        // Update price value with animation
        const priceElement = card.querySelector('.pricing__price-value');
        if (priceElement) {
          const newPrice = isYearly 
            ? priceElement.dataset.yearlyPrice 
            : priceElement.dataset.monthlyPrice;
          
          if (newPrice) {
            animatePrice(priceElement, newPrice);
          }
        }
      });
      
      // Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pricing_toggle', {
          period: isYearly ? 'yearly' : 'monthly'
        });
      }
    });
  }
  
  // Animation prix
  function animatePrice(element, newPrice) {
    const oldPrice = parseInt(element.textContent);
    const targetPrice = parseInt(newPrice);
    const duration = 500;
    const start = Date.now();
    
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const current = Math.floor(oldPrice + (targetPrice - oldPrice) * progress);
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
  
  // FAQ Accordéon
  function initFAQ(section) {
    const faqItems = section.querySelectorAll('.pricing__faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.pricing__faq-question');
      const icon = item.querySelector('.pricing__faq-icon');
      
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fermer tous les autres
        faqItems.forEach(i => {
          i.classList.remove('active');
          const otherIcon = i.querySelector('.pricing__faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
  
  // Cards Slider
  function initCardsSlider(section) {
    const slider = section.querySelector('.pricing__slider');
    const track = section.querySelector('.pricing__track');
    const cards = section.querySelectorAll('.pricing__card');
    const prevBtn = section.querySelector('.pricing__nav-prev');
    const nextBtn = section.querySelector('.pricing__nav-next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // gap
    
    function updateSlider() {
      track.style.transform = \`translateX(-\${currentIndex * cardWidth}px)\`;
      
      // Update nav buttons
      prevBtn?.classList.toggle('disabled', currentIndex === 0);
      nextBtn?.classList.toggle('disabled', currentIndex === cards.length - 1);
    }
    
    prevBtn?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
    
    nextBtn?.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextBtn?.click();
      }
      if (touchEndX > touchStartX + 50) {
        prevBtn?.click();
      }
    }
  }
  
  // Comparison Table
  function initComparisonTable(section) {
    const table = section.querySelector('.pricing__comparison');
    const headers = table?.querySelectorAll('th');
    const highlight = section.querySelector('.pricing__highlight-column');
    
    headers?.forEach((header, index) => {
      header.addEventListener('mouseenter', () => {
        // Highlight column
        const cells = table.querySelectorAll(\`td:nth-child(\${index + 1}), th:nth-child(\${index + 1})\`);
        cells.forEach(cell => cell.classList.add('highlighted'));
        
        if (highlight) {
          const rect = header.getBoundingClientRect();
          const tableRect = table.getBoundingClientRect();
          highlight.style.left = \`\${rect.left - tableRect.left}px\`;
          highlight.style.width = \`\${rect.width}px\`;
          highlight.style.opacity = '1';
        }
      });
      
      header.addEventListener('mouseleave', () => {
        const cells = table.querySelectorAll('.highlighted');
        cells.forEach(cell => cell.classList.remove('highlighted'));
        
        if (highlight) {
          highlight.style.opacity = '0';
        }
      });
    });
    
    // Feature tooltips
    const features = table?.querySelectorAll('[data-tooltip]');
    
    features?.forEach(feature => {
      feature.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'pricing__tooltip';
        tooltip.textContent = feature.dataset.tooltip;
        
        document.body.appendChild(tooltip);
        
        const rect = feature.getBoundingClientRect();
        tooltip.style.top = \`\${rect.top - tooltip.offsetHeight - 10}px\`;
        tooltip.style.left = \`\${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px\`;
        
        setTimeout(() => {
          tooltip.classList.add('active');
        }, 10);
      });
      
      feature.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.pricing__tooltip');
        if (tooltip) {
          tooltip.classList.remove('active');
          setTimeout(() => {
            tooltip.remove();
          }, 300);
        }
      });
    });
  }
  
  // Toggle View
  function initToggleView(section) {
    const viewButtons = section.querySelectorAll('.pricing__view-btn');
    const views = section.querySelectorAll('.pricing__view');
    
    viewButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Update buttons
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update views
        views.forEach(v => v.classList.remove('active'));
        if (views[index]) {
          views[index].classList.add('active');
        }
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'pricing_view_change', {
            view: btn.dataset.view
          });
        }
      });
    });
  }
  
  // Observer pour animations
  function observePricing(section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pricing--visible');
          
          // Animer les prix
          animatePrices(entry.target);
          
          // Animer les features
          animateFeatures(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section);
  }
  
  // Animer les prix au scroll
  function animatePrices(section) {
    const prices = section.querySelectorAll('.pricing__price-value');
    
    prices.forEach((price, index) => {
      setTimeout(() => {
        const value = parseInt(price.textContent);
        if (!isNaN(value)) {
          price.textContent = '0';
          animatePrice(price, value);
        }
      }, index * 100);
    });
  }
  
  // Animer les features
  function animateFeatures(section) {
    const features = section.querySelectorAll('.pricing__feature');
    
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          feature.style.transition = 'all 0.4s ease-out';
          feature.style.opacity = '1';
          feature.style.transform = 'translateX(0)';
        }, 50);
      }, index * 50);
    });
  }
  
  // Calculateur d'économies
  function initSavingsCalculator(section) {
    const calculator = section.querySelector('.pricing__calculator');
    if (!calculator) return;
    
    const slider = calculator.querySelector('.pricing__calculator-slider');
    const output = calculator.querySelector('.pricing__calculator-output');
    const savings = calculator.querySelector('.pricing__calculator-savings');
    
    slider?.addEventListener('input', () => {
      const users = parseInt(slider.value);
      const monthlyPrice = 99; // Prix de base
      const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% de réduction
      
      const monthlyCost = users * monthlyPrice;
      const yearlyCost = users * yearlyPrice;
      const savedAmount = (monthlyCost * 12) - yearlyCost;
      
      output.textContent = \`\${users} utilisateurs\`;
      savings.textContent = \`Économisez \${Math.round(savedAmount)}€/an\`;
    });
  }
  
  // CTA flottant
  function initFloatingCTA(section) {
    const cta = section.querySelector('.pricing__floating-cta');
    if (!cta) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          cta.classList.add('visible');
        } else {
          cta.classList.remove('visible');
        }
      });
    }, { threshold: 0 });
    
    const cards = section.querySelector('.pricing__grid');
    if (cards) observer.observe(cards);
    
    // Smooth scroll to pricing
    cta?.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPricing();
      
      // Fonctionnalités supplémentaires
      document.querySelectorAll('.pricing').forEach(section => {
        initSavingsCalculator(section);
        initFloatingCTA(section);
      });
    });
  } else {
    initPricing();
    
    document.querySelectorAll('.pricing').forEach(section => {
      initSavingsCalculator(section);
      initFloatingCTA(section);
    });
  }
  
  // Export pour usage externe
  window.PricingPerfect = {
    init: initPricing,
    animatePrice: animatePrice
  };
})();
    `;
  }

  /**
   * Extrait les plans depuis les données plates
   */
  private extractPlans(data: any): any[] {
    const plans = [];
    
    // Extraire jusqu'à 3 plans
    for (let i = 1; i <= 3; i++) {
      const name = data[`plan${i}_name`];
      if (name) {
        const features = data[`plan${i}_features`] || '';
        const featuresArray = features.split('\n').map((f: string) => {
          const trimmed = f.trim();
          if (trimmed.startsWith('✓')) {
            return { text: trimmed.substring(1).trim(), included: true };
          } else if (trimmed.startsWith('✗')) {
            return { text: trimmed.substring(1).trim(), included: false };
          }
          return { text: trimmed, included: true };
        }).filter((f: any) => f.text);

        plans.push({
          id: i.toString(),
          name,
          description: data[`plan${i}_description`] || '',
          price: {
            amount: data[`plan${i}_price`] || 0,
            currency: data[`plan${i}_currency`] || '€',
            period: data[`plan${i}_period`] || 'month'
          },
          features: featuresArray,
          cta: {
            text: data[`plan${i}_cta_text`] || 'Choisir',
            link: '#',
            variant: data[`plan${i}_popular`] ? 'primary' : 'outline',
            fullWidth: true
          },
          popular: data[`plan${i}_popular`] || false,
          featured: data[`plan${i}_popular`] || false,
          recommended: data[`plan${i}_popular`] || false
        });
      }
    }
    
    return plans;
  }

  render(data: PricingData, context?: RenderContext): RenderResult {
    try {
      // NE PAS valider avec le schema car on utilise une structure plate
      const validData = data as any;
      logger.info('PricingRendererV3PerfectEnhanced', 'render', 'Rendu Pricing avec layout:', validData.layout || 'cards-modern');

      // Récupération complète des couleurs du thème
      const theme = context?.theme;
      const primaryColor = theme?.colors?.primary || '#667eea';
      const secondaryColor = theme?.colors?.secondary || '#764ba2';
      const textColor = theme?.colors?.text || '#1a202c';
      const textSecondaryColor = theme?.colors?.textSecondary || '#718096';
      const backgroundColor = theme?.colors?.background || '#ffffff';
      const surfaceColor = theme?.colors?.surface || '#f7fafc';
      const borderColor = theme?.colors?.border || '#e2e8f0';
      const accentColor = theme?.colors?.accent || primaryColor;
      const fontHeading = theme?.typography?.fontFamily?.heading || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const fontBody = theme?.typography?.fontFamily?.body || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      // Extraire les plans depuis les données plates
      const plans = this.extractPlans(validData);
      
      // Créer un objet de données compatible avec les méthodes de rendu existantes
      const dataWithPlans = {
        ...validData,
        plans,
        layout: validData.layout || 'cards-modern'
      };

      // Récupérer le style visuel depuis les données (harmonisé avec Services/Features)
      const visualVariant = (data as any).visualVariant || 'modern';

      // Générer le HTML selon le layout avec les couleurs du thème
      const html = this.renderLayout(dataWithPlans, visualVariant, {
        primaryColor,
        secondaryColor,
        textColor,
        textSecondaryColor,
        backgroundColor,
        surfaceColor,
        borderColor,
        accentColor,
        fontHeading,
        fontBody
      });
      
      // CSS avec variables personnalisées du thème
      const customCSS = this.generateCustomCSS(validData, context);
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('PricingRendererV3PerfectEnhanced', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderLayout(data: any, visualVariant: string, themeColors: any): string {
    let content = '';
    
    switch(data.layout) {
      case 'cards-classic':
        content = this.renderCardsClassic(data);
        break;
      case 'cards-modern':
        content = this.renderCardsModern(data);
        break;
      case 'cards-slider':
        content = this.renderCardsSlider(data);
        break;
      case 'comparison-table':
        content = this.renderComparisonTable(data);
        break;
      case 'toggle-view':
        content = this.renderToggleView(data);
        break;
      case 'single-plan':
        content = this.renderSinglePlan(data);
        break;
      case 'cards-minimal':
        content = this.renderCardsMinimal(data);
        break;
      case 'cards-gradient':
        content = this.renderCardsGradient(data);
        break;
      case 'cards-hover':
        content = this.renderCardsHover(data);
        break;
      default:
        content = this.renderCardsModern(data);
    }

    // Fonction helper pour générer une couleur avec transparence
    const colorWithAlpha = (color: string, alpha: number): string => {
      // Si c'est déjà en rgba, on remplace juste l'alpha
      if (color.startsWith('rgba')) {
        return color.replace(/[\d.]+\)$/, `${alpha})`);
      }
      // Si c'est en hex, on convertit en rgba
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      // Si c'est en rgb, on ajoute l'alpha
      if (color.startsWith('rgb')) {
        return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
      }
      return color;
    };

    // Styles inline avec toutes les variables CSS du thème
    const themeStyles = `
      --color-primary: ${themeColors.primaryColor};
      --color-primary-light: ${colorWithAlpha(themeColors.primaryColor, 0.1)};
      --color-primary-dark: ${themeColors.primaryColor};
      --color-secondary: ${themeColors.secondaryColor};
      --color-text-primary: ${themeColors.textColor};
      --color-text-secondary: ${themeColors.textSecondaryColor};
      --color-background: ${themeColors.backgroundColor};
      --color-surface: ${themeColors.surfaceColor};
      --color-border: ${themeColors.borderColor};
      --color-accent: ${themeColors.accentColor};
      --font-family-heading: ${themeColors.fontHeading};
      --font-family-body: ${themeColors.fontBody};
      --pricing-primary: ${themeColors.primaryColor};
      --pricing-secondary: ${themeColors.secondaryColor};
      --pricing-accent: ${themeColors.accentColor};
      --pricing-text: ${themeColors.textColor};
      --pricing-bg: ${themeColors.backgroundColor};
    `.trim();

    return `
      <section class="pricing pricing--${visualVariant} pricing-layout--${data.layout}" id="${data.id || 'pricing'}" style="${themeStyles}">
        <div class="pricing__container">
          ${this.renderHeader(data)}
          ${this.renderToggle(data)}
          ${content}
          ${this.renderGuarantee(data)}
          ${this.renderFAQ(data)}
        </div>
      </section>
    `;
  }

  private renderHeader(data: any): string {
    if (!data.title && !data.subtitle) return '';
    
    return `
      <header class="pricing__header">
        ${data.title ? `<h2 class="pricing__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="pricing__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      </header>
    `;
  }

  private renderToggle(data: any): string {
    if (!data.toggle?.enabled) return '';
    
    return `
      <div class="pricing__toggle">
        <span class="pricing__toggle-label active" data-period="monthly">
          ${this.escapeHtml(data.toggle.monthlyLabel || 'Mensuel')}
        </span>
        <div class="pricing__toggle-switch">
          <div class="pricing__toggle-slider"></div>
        </div>
        <span class="pricing__toggle-label" data-period="yearly">
          ${this.escapeHtml(data.toggle.yearlyLabel || 'Annuel')}
          ${data.toggle.yearlySave ? `<span class="pricing__save">${this.escapeHtml(data.toggle.yearlySave)}</span>` : ''}
        </span>
      </div>
    `;
  }

  private renderGuarantee(data: any): string {
    if (!data.guarantee) return '';
    
    return `
      <div class="pricing__guarantee">
        ${data.guarantee.icon ? `<div class="pricing__guarantee-icon">${data.guarantee.icon}</div>` : ''}
        <h3 class="pricing__guarantee-title">${this.escapeHtml(data.guarantee.title)}</h3>
        <p class="pricing__guarantee-text">${this.escapeHtml(data.guarantee.text)}</p>
      </div>
    `;
  }

  private renderFAQ(data: any): string {
    if (!data.faq?.enabled || !data.faq?.items || data.faq.items.length === 0) return '';
    
    return `
      <div class="pricing__faq">
        <h3 class="pricing__faq-title">${this.escapeHtml(data.faq.title || 'Questions fréquentes')}</h3>
        <div class="pricing__faq-list">
          ${data.faq.items.map((item, index) => `
            <div class="pricing__faq-item">
              <button class="pricing__faq-question">
                ${this.escapeHtml(item.question)}
                <span class="pricing__faq-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </span>
              </button>
              <div class="pricing__faq-answer">
                <p>${this.escapeHtml(item.answer)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderCardsClassic(data: any): string {
    return this.renderCards(data, 'classic');
  }

  private renderCardsModern(data: any): string {
    return this.renderCards(data, 'modern');
  }

  private renderCardsMinimal(data: any): string {
    return this.renderCards(data, 'minimal');
  }

  private renderCardsGradient(data: any): string {
    return this.renderCards(data, 'gradient');
  }

  private renderCardsHover(data: any): string {
    return this.renderCards(data, 'hover');
  }

  private renderCards(data: any, style: string): string {
    return `
      <div class="pricing__grid pricing__grid--${style}">
        ${data.plans.map(plan => this.renderPlanCard(plan, data)).join('')}
      </div>
    `;
  }

  private renderCardsSlider(data: any): string {
    return `
      <div class="pricing__slider">
        <button class="pricing__nav pricing__nav-prev">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>
        <div class="pricing__track">
          ${data.plans.map(plan => this.renderPlanCard(plan, data)).join('')}
        </div>
        <button class="pricing__nav pricing__nav-next">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    `;
  }

  private renderComparisonTable(data: any): string {
    const allFeatures = [...new Set(data.plans.flatMap(plan => 
      plan.features.map(f => typeof f === 'string' ? f : f.text)
    ))];
    
    return `
      <div class="pricing__comparison">
        <div class="pricing__highlight-column"></div>
        <table class="pricing__table">
          <thead>
            <tr>
              <th>Fonctionnalités</th>
              ${data.plans.map(plan => `
                <th>
                  <div class="pricing__plan-header">
                    <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
                    <div class="pricing__price">
                      <span class="pricing__currency">${plan.currency || '€'}</span>
                      <span class="pricing__price-value">${plan.price}</span>
                      <span class="pricing__period">/${plan.period || 'mois'}</span>
                    </div>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${allFeatures.map(feature => `
              <tr>
                <td>${this.escapeHtml(feature)}</td>
                ${data.plans.map(plan => {
                  const hasFeature = plan.features.some(f => 
                    (typeof f === 'string' ? f : f.text) === feature
                  );
                  return `
                    <td>
                      ${hasFeature ? `
                        <svg viewBox="0 0 24 24" width="20" height="20" class="pricing__check">
                          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      ` : `
                        <svg viewBox="0 0 24 24" width="20" height="20" class="pricing__cross">
                          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      `}
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
            <tr>
              <td></td>
              ${data.plans.map(plan => `
                <td>
                  <button class="pricing__button pricing__button--${plan.buttonStyle || 'primary'}">
                    ${this.escapeHtml(plan.buttonText || 'Commencer')}
                  </button>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  private renderToggleView(data: any): string {
    return `
      <div class="pricing__toggle-view">
        <div class="pricing__view-buttons">
          <button class="pricing__view-btn active" data-view="cards">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/>
            </svg>
            Cartes
          </button>
          <button class="pricing__view-btn" data-view="table">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M3 3h18v6H3zm0 8h18v6H3zm0 8h18v2H3z"/>
            </svg>
            Tableau
          </button>
        </div>
        
        <div class="pricing__view pricing__view--cards active">
          ${this.renderCards(data, 'modern')}
        </div>
        
        <div class="pricing__view pricing__view--table">
          ${this.renderComparisonTable(data)}
        </div>
      </div>
    `;
  }

  private renderSinglePlan(data: any): string {
    const plan = data.plans[0];
    if (!plan) return '';
    
    return `
      <div class="pricing__single">
        <div class="pricing__single-card">
          ${this.renderPlanCard(plan, data)}
        </div>
      </div>
    `;
  }

  private renderPlanCard(plan: any, data: any): string {
    // Extraire les valeurs correctement depuis l'objet price
    const price = typeof plan.price === 'object' ? plan.price.amount : plan.price;
    const currency = typeof plan.price === 'object' ? plan.price.currency : '€';
    const period = typeof plan.price === 'object' ? plan.price.period : 'month';
    
    const monthlyPrice = price || 0;
    const yearlyPrice = plan.yearlyPrice || Math.floor(monthlyPrice * 12 * 0.8);
    
    // Traduction des périodes
    const periodText = {
      'month': 'mois',
      'year': 'an',
      'once': ''
    }[period] || 'mois';
    
    return `
      <div class="pricing__card ${plan.featured || plan.popular ? 'pricing__card--featured' : ''}">
        ${plan.popular ? `<span class="pricing__badge">Plus populaire</span>` : ''}
        
        <h3 class="pricing__name">${this.escapeHtml(plan.name)}</h3>
        ${plan.description ? `<p class="pricing__description">${this.escapeHtml(plan.description)}</p>` : ''}
        
        <div class="pricing__price-wrapper">
          <div class="pricing__price" data-price="monthly">
            <span class="pricing__currency">${currency}</span>
            <span class="pricing__price-value" data-monthly-price="${monthlyPrice}" data-yearly-price="${yearlyPrice}">
              ${monthlyPrice}
            </span>
            <span class="pricing__period">${period !== 'once' ? '/' + periodText : ''}</span>
          </div>
          
          <div class="pricing__price" data-price="yearly" style="display: none;">
            <span class="pricing__currency">${currency}</span>
            <span class="pricing__price-value">${yearlyPrice}</span>
            <span class="pricing__period">/an</span>
          </div>
        </div>
        
        <ul class="pricing__features">
          ${plan.features.map((feature: any) => this.renderFeature(feature)).join('')}
        </ul>
        
        <button class="pricing__button ${plan.cta?.variant === 'primary' || plan.popular ? 'pricing__button--primary' : 'pricing__button--outline'}">
          ${this.escapeHtml(plan.cta?.text || 'Commencer')}
        </button>
        
        ${plan.note ? `<p class="pricing__note">${this.escapeHtml(plan.note)}</p>` : ''}
      </div>
    `;
  }

  private renderFeature(feature: string | any): string {
    const isString = typeof feature === 'string';
    const text = isString ? feature : feature.text;
    const included = isString ? true : feature.included !== false;
    
    return `
      <li class="pricing__feature ${!included ? 'pricing__feature--disabled' : ''}">
        <svg class="pricing__feature-icon" viewBox="0 0 24 24" width="20" height="20" fill="none">
          ${included ? `
            <circle cx="12" cy="12" r="10" fill="var(--color-primary)" opacity="0.15"/>
            <path stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/>
          ` : `
            <circle cx="12" cy="12" r="10" stroke="var(--color-text-secondary)" stroke-width="1.5" opacity="0.3"/>
            <path stroke="var(--color-text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 9l-6 6M9 9l6 6"/>
          `}
        </svg>
        <span>${this.escapeHtml(text)}</span>
      </li>
    `;
  }

  private generateCustomCSS(data: PricingData, context?: RenderContext): string {
    let css = '\n/* Custom Pricing Styles */\n';
    
    // Les couleurs du thème sont maintenant appliquées via les styles inline dans renderLayout
    // Cette section reste vide car les couleurs sont gérées par les variables CSS du thème

    // Spacing
    if (data.styles?.spacing) {
      const spacing = data.styles.spacing;
      css += `.pricing {
        ${spacing.padding ? `padding: ${spacing.padding};` : ''}
      }
      .pricing__grid {
        ${spacing.gap ? `gap: ${spacing.gap};` : ''}
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

export const pricingRendererV3PerfectEnhanced = new PricingRendererV3PerfectEnhanced();
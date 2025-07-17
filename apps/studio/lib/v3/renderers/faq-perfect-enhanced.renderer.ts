/**
 * FAQ Renderer V3 PERFECT ENHANCED - Version avec variantes de thème
 * Inclut les variantes : modern, minimal, bold, elegant
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { faqDataSchema, faqDefaults, type FAQData } from '../schemas/blocks/faq-perfect';
import { logger } from '../core/logger';

export class FAQRendererV3PerfectEnhanced extends BaseRendererV3<FAQData> {
  type = 'faq-v3-perfect';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('FAQRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer FAQ V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<FAQData, FAQData> {
    return faqDataSchema.safeParse(data);
  }

  getDefaultData(): FAQData {
    return faqDefaults;
  }

  getBlockProps(): BlockProp[] {
    return [
      {
        name: 'themeVariant',
        label: 'Style visuel',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel du bloc FAQ',
        options: [
          { value: 'modern', label: '🎨 Moderne - Design épuré' },
          { value: 'minimal', label: '⚡ Minimaliste - Ultra simple' },
          { value: 'bold', label: '🔥 Audacieux - Fort impact' },
          { value: 'elegant', label: '✨ Élégant - Sophistiqué' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Visuel',
          order: 1
        }
      },
      {
        name: 'title',
        label: 'Titre principal',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Questions Fréquentes',
        description: 'Le titre principal de la section FAQ',
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
        defaultValue: 'Trouvez rapidement les réponses à vos questions',
        description: 'Texte descriptif sous le titre',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 2
        }
      },
      {
        name: 'items',
        label: 'Questions et réponses',
        type: PropType.ARRAY,
        required: true,
        defaultValue: faqDefaults.items,
        description: 'Liste des questions et réponses',
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: 'Contenu',
          order: 3,
          schema: [
            {
              name: 'question',
              label: 'Question',
              type: PropType.STRING,
              required: true,
              editorConfig: {
                control: EditorControl.TEXT
              }
            },
            {
              name: 'answer',
              label: 'Réponse',
              type: PropType.STRING,
              required: true,
              editorConfig: {
                control: EditorControl.TEXTAREA,
                rows: 4
              }
            },
            {
              name: 'category',
              label: 'Catégorie',
              type: PropType.STRING,
              required: false,
              editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'general'
              }
            }
          ],
          maxItems: 50,
          minItems: 1,
          addButtonText: 'Ajouter une question',
          removeButtonText: 'Supprimer'
        }
      },
      {
        name: 'expandFirst',
        label: 'Ouvrir la première question',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Ouvrir automatiquement la première question au chargement',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Comportement',
          order: 1
        }
      },
      {
        name: 'expandMultiple',
        label: 'Expansion multiple',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Permettre d\'ouvrir plusieurs questions en même temps',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Comportement',
          order: 2
        }
      },
      {
        name: 'showNumbers',
        label: 'Afficher les numéros',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Afficher les numéros devant les questions (style Bold uniquement)',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 1,
          condition: {
            prop: 'themeVariant',
            value: 'bold'
          }
        }
      },
      {
        name: 'searchEnabled',
        label: 'Activer la recherche',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Ajouter un champ de recherche dans les questions',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Fonctionnalités',
          order: 1
        }
      },
      {
        name: 'searchPlaceholder',
        label: 'Placeholder de recherche',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Rechercher dans les questions...',
        description: 'Texte du placeholder dans le champ de recherche',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Fonctionnalités',
          order: 2,
          condition: {
            prop: 'searchEnabled',
            value: true
          }
        }
      },
      {
        name: 'showCategories',
        label: 'Afficher les catégories',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: false,
        description: 'Afficher les filtres par catégorie',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Fonctionnalités',
          order: 3
        }
      },
      {
        name: 'categories',
        label: 'Catégories disponibles',
        type: PropType.ARRAY,
        required: false,
        defaultValue: [
          { id: 'general', name: 'Général' },
          { id: 'billing', name: 'Facturation' },
          { id: 'technical', name: 'Technique' }
        ],
        description: 'Liste des catégories pour filtrer les questions',
        editorConfig: {
          control: EditorControl.COLLECTION,
          group: 'Fonctionnalités',
          order: 4,
          condition: {
            prop: 'showCategories',
            value: true
          },
          schema: [
            {
              name: 'id',
              label: 'ID',
              type: PropType.STRING,
              required: true,
              editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'general'
              }
            },
            {
              name: 'name',
              label: 'Nom affiché',
              type: PropType.STRING,
              required: true,
              editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Général'
              }
            }
          ],
          maxItems: 10,
          minItems: 1,
          addButtonText: 'Ajouter une catégorie',
          removeButtonText: 'Supprimer'
        }
      },
      {
        name: 'cta',
        label: 'Call to Action',
        type: PropType.OBJECT,
        required: false,
        defaultValue: {
          enabled: false,
          title: 'Vous ne trouvez pas votre réponse ?',
          description: 'Notre équipe est là pour vous aider',
          buttonText: 'Contactez-nous',
          buttonLink: '/contact'
        },
        description: 'Ajouter une section d\'appel à l\'action en bas',
        editorConfig: {
          control: EditorControl.OBJECT,
          group: 'Call to Action',
          order: 1,
          schema: [
            {
              name: 'enabled',
              label: 'Activer le CTA',
              type: PropType.BOOLEAN,
              defaultValue: false,
              editorConfig: {
                control: EditorControl.TOGGLE
              }
            },
            {
              name: 'title',
              label: 'Titre',
              type: PropType.STRING,
              editorConfig: {
                control: EditorControl.TEXT,
                condition: {
                  prop: 'enabled',
                  value: true
                }
              }
            },
            {
              name: 'description',
              label: 'Description',
              type: PropType.STRING,
              editorConfig: {
                control: EditorControl.TEXTAREA,
                condition: {
                  prop: 'enabled',
                  value: true
                }
              }
            },
            {
              name: 'buttonText',
              label: 'Texte du bouton',
              type: PropType.STRING,
              editorConfig: {
                control: EditorControl.TEXT,
                condition: {
                  prop: 'enabled',
                  value: true
                }
              }
            },
            {
              name: 'buttonLink',
              label: 'Lien du bouton',
              type: PropType.STRING,
              editorConfig: {
                control: EditorControl.TEXT,
                condition: {
                  prop: 'enabled',
                  value: true
                }
              }
            }
          ]
        }
      }
    ];
  }

  getRequiredAssets(): string[] {
    return [];
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   FAQ V3 PERFECT ENHANCED - Styles avec variantes
   ======================================== */

.faq {
  position: relative;
  padding: var(--faq-padding, 6rem 0);
  overflow: hidden;
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}

/* Base container */
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
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  font-family: var(--font-family-heading);
}

.faq__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: 1rem;
  font-family: var(--font-family-body);
}

.faq__description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
}

/* ========================================
   VARIANTE MODERN - Design épuré et contemporain
   ======================================== */
.faq--modern {
  background: var(--color-background);
}

.faq--modern .faq__item {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq--modern .faq__item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.faq--modern .faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  transition: all 0.3s;
  gap: 1rem;
  font-family: var(--font-family-heading);
}

.faq--modern .faq__item.active .faq__question {
  color: var(--color-primary);
}

.faq--modern .faq__icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: transform 0.3s;
  flex-shrink: 0;
}

.faq--modern .faq__item.active .faq__icon {
  transform: rotate(180deg);
}

.faq--modern .faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.faq--modern .faq__item.active .faq__answer {
  max-height: 800px;
  transition: max-height 0.3s ease-in;
}

.faq--modern .faq__answer-content {
  padding: 0 2rem 1.5rem;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
  font-family: var(--font-family-body);
}

/* ========================================
   VARIANTE MINIMAL - Ultra épuré
   ======================================== */
.faq--minimal {
  background: transparent;
}

.faq--minimal .faq__header {
  margin-bottom: 3rem;
}

.faq--minimal .faq__title {
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.02em;
}

.faq--minimal .faq__item {
  border-bottom: 1px solid var(--color-border);
  padding: 1.5rem 0;
}

.faq--minimal .faq__item:last-child {
  border-bottom: none;
}

.faq--minimal .faq__question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 0;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  transition: color 0.3s;
  font-family: var(--font-family-body);
}

.faq--minimal .faq__question:hover {
  color: var(--color-primary);
}

.faq--minimal .faq__icon {
  font-size: 1.25rem;
  color: var(--color-primary);
  transition: transform 0.3s;
}

.faq--minimal .faq__item.active .faq__icon {
  transform: rotate(45deg);
}

.faq--minimal .faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.faq--minimal .faq__item.active .faq__answer {
  max-height: 500px;
}

.faq--minimal .faq__answer-content {
  padding: 1rem 0;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-body);
}

/* ========================================
   VARIANTE BOLD - Fort impact visuel
   ======================================== */
.faq--bold {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  color: white;
}

.faq--bold .faq__title,
.faq--bold .faq__subtitle,
.faq--bold .faq__description {
  color: white;
}

.faq--bold .faq__item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s;
}

.faq--bold .faq__item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.faq--bold .faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: white;
  gap: 1rem;
  font-family: var(--font-family-heading);
}

.faq--bold .faq__number {
  font-size: 2rem;
  font-weight: var(--font-weight-black);
  opacity: 0.5;
  margin-right: 1rem;
}

.faq--bold .faq__icon {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
}

.faq--bold .faq__item.active .faq__icon {
  background: white;
  color: var(--color-primary);
  transform: rotate(180deg);
}

.faq--bold .faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out;
}

.faq--bold .faq__item.active .faq__answer {
  max-height: 800px;
}

.faq--bold .faq__answer-content {
  padding: 0 2rem 2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
  font-family: var(--font-family-body);
}

/* ========================================
   VARIANTE ELEGANT - Sophistiqué et raffiné
   ======================================== */
.faq--elegant {
  background: var(--color-background);
  position: relative;
}

.faq--elegant::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(180deg, var(--color-primary-light) 0%, transparent 100%);
  opacity: 0.05;
  pointer-events: none;
}

.faq--elegant .faq__header {
  position: relative;
  z-index: 1;
}

.faq--elegant .faq__title {
  font-weight: var(--font-weight-light);
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.faq--elegant .faq__item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq--elegant .faq__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  opacity: 0;
  transition: opacity 0.4s;
}

.faq--elegant .faq__item:hover {
  transform: translateX(8px);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
}

.faq--elegant .faq__item.active::before {
  opacity: 1;
}

.faq--elegant .faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 2rem;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-primary);
  transition: all 0.3s;
  gap: 1rem;
  font-family: var(--font-family-heading);
  letter-spacing: -0.01em;
}

.faq--elegant .faq__item.active .faq__question {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.faq--elegant .faq__icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all 0.4s;
}

.faq--elegant .faq__item.active .faq__icon {
  color: var(--color-primary);
  transform: rotate(180deg);
}

.faq--elegant .faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq--elegant .faq__item.active .faq__answer {
  max-height: 800px;
}

.faq--elegant .faq__answer-content {
  padding: 0 2rem 1.75rem;
  padding-left: 2.5rem;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-body);
}

/* ========================================
   ÉLÉMENTS COMMUNS
   ======================================== */

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
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all 0.3s;
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}

.faq__search:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

/* Catégories */
.faq__categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.faq__category {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-family-body);
}

.faq__category:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.faq__category.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* CTA Section */
.faq__cta {
  margin-top: 4rem;
  text-align: center;
  padding: 3rem;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
}

.faq__cta-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  font-family: var(--font-family-heading);
}

.faq__cta-description {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--line-height-relaxed);
  font-family: var(--font-family-body);
}

.faq__cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: all 0.3s;
  font-family: var(--font-family-body);
}

.faq__cta-button:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px var(--color-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .faq {
    padding: 4rem 0;
  }
  
  .faq__container {
    padding: 0 1rem;
  }
  
  .faq__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
  }
  
  .faq__categories {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }
  
  .faq__category {
    flex-shrink: 0;
  }
  
  .faq--elegant .faq__item:hover {
    transform: none;
  }
  
  .faq--bold .faq__question {
    padding: 1.5rem;
  }
}

/* Mode sombre - adaptations */
@media (prefers-color-scheme: dark) {
  .faq--bold {
    background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  }
  
  .faq--elegant::before {
    opacity: 0.02;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq__item {
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: calc(var(--item-index, 0) * 0.05s);
}`;
  }

  getDefaultJS(): string {
    return `
// ========================================
// FAQ V3 PERFECT ENHANCED - JavaScript
// ========================================

class FAQV3PerfectEnhanced {
  constructor(element) {
    this.element = element;
    this.variant = this.getVariant();
    this.items = element.querySelectorAll('.faq__item');
    this.searchInput = element.querySelector('.faq__search');
    this.categories = element.querySelectorAll('.faq__category');
    
    this.init();
  }
  
  getVariant() {
    const classes = this.element.classList;
    if (classes.contains('faq--modern')) return 'modern';
    if (classes.contains('faq--minimal')) return 'minimal';
    if (classes.contains('faq--bold')) return 'bold';
    if (classes.contains('faq--elegant')) return 'elegant';
    return 'modern'; // default
  }
  
  init() {
    console.log('🎯 Initialisation FAQ V3 Perfect Enhanced:', this.variant);
    
    // Animation des items au chargement
    this.animateItems();
    
    // Comportement accordion
    this.initAccordion();
    
    // Fonctionnalités additionnelles
    if (this.searchInput) {
      this.initSearch();
    }
    if (this.categories.length > 0) {
      this.initCategories();
    }
  }
  
  animateItems() {
    this.items.forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
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
        
        // Animation spécifique selon la variante
        this.handleVariantAnimation(item, !isActive);
      });
    });
  }
  
  handleVariantAnimation(item, isOpening) {
    const answer = item.querySelector('.faq__answer');
    if (!answer) return;
    
    if (this.variant === 'elegant' && isOpening) {
      // Animation élégante avec fade
      answer.style.opacity = '0';
      setTimeout(() => {
        answer.style.opacity = '1';
      }, 100);
    } else if (this.variant === 'bold' && isOpening) {
      // Animation bold avec pulse
      item.style.animation = 'pulse 0.3s ease-out';
      setTimeout(() => {
        item.style.animation = '';
      }, 300);
    }
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
    
    // Icône de recherche animée
    if (this.variant === 'modern' || this.variant === 'elegant') {
      this.searchInput.addEventListener('focus', () => {
        this.searchInput.parentElement.classList.add('focused');
      });
      
      this.searchInput.addEventListener('blur', () => {
        this.searchInput.parentElement.classList.remove('focused');
      });
    }
  }
  
  performSearch(query) {
    let hasResults = false;
    
    this.items.forEach((item, index) => {
      const question = item.querySelector('.faq__question-text')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.faq__answer-content')?.textContent.toLowerCase() || '';
      
      const matches = question.includes(query) || answer.includes(query);
      
      if (matches) {
        item.style.display = '';
        item.style.animation = 'fadeIn 0.3s ease-out';
        hasResults = true;
      } else {
        item.style.display = 'none';
      }
    });
    
    this.toggleNoResults(!hasResults);
  }
  
  clearSearch() {
    this.items.forEach((item, index) => {
      item.style.display = '';
      item.style.animation = 'fadeIn 0.3s ease-out';
      item.style.animationDelay = \`\${index * 0.05}s\`;
    });
    this.toggleNoResults(false);
  }
  
  toggleNoResults(show) {
    let noResultsEl = this.element.querySelector('.faq__no-results');
    
    if (show && !noResultsEl) {
      noResultsEl = document.createElement('div');
      noResultsEl.className = 'faq__no-results';
      noResultsEl.textContent = 'Aucune question ne correspond à votre recherche.';
      noResultsEl.style.cssText = \`
        text-align: center; 
        padding: 3rem; 
        color: var(--color-text-secondary);
        font-family: var(--font-family-body);
      \`;
      this.element.querySelector('.faq__list').appendChild(noResultsEl);
    } else if (!show && noResultsEl) {
      noResultsEl.remove();
    }
  }
  
  initCategories() {
    this.categories.forEach(cat => {
      cat.addEventListener('click', () => {
        const categoryId = cat.dataset.category;
        
        // Update active state avec animation
        this.categories.forEach(c => c.classList.remove('active'));
        cat.classList.add('active');
        
        // Animation du bouton selon la variante
        if (this.variant === 'modern' || this.variant === 'bold') {
          cat.style.transform = 'scale(1.05)';
          setTimeout(() => {
            cat.style.transform = '';
          }, 200);
        }
        
        // Filter items
        this.filterByCategory(categoryId);
      });
    });
  }
  
  filterByCategory(categoryId) {
    let visibleIndex = 0;
    
    this.items.forEach(item => {
      const itemCategory = item.dataset.category || 'general';
      
      if (categoryId === 'all' || itemCategory === categoryId) {
        item.style.display = '';
        item.style.animation = 'fadeIn 0.3s ease-out';
        item.style.animationDelay = \`\${visibleIndex * 0.05}s\`;
        visibleIndex++;
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// Styles additionnels pour les animations
const style = document.createElement('style');
style.textContent = \`
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  .faq__search-wrapper.focused {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
\`;
document.head.appendChild(style);

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq').forEach(element => {
    new FAQV3PerfectEnhanced(element);
  });
});`;
  }

  render(data: FAQData, context: RenderContext): RenderResult {
    logger.info('FAQRendererV3PerfectEnhanced', 'render', '🎨 Rendu du bloc FAQ Enhanced', { variant: data.variant });

    const validatedData = this.validate(data);
    if (!validatedData.success) {
      logger.error('FAQRendererV3PerfectEnhanced', 'render', '❌ Données invalides', validatedData.error);
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
    const themeVariant = data.themeVariant || 'modern';

    // Recherche
    const searchHtml = faq.searchEnabled ? `
      <div class="faq__search-wrapper">
        <input type="text" 
               class="faq__search" 
               placeholder="${this.escapeHtml(faq.searchPlaceholder || 'Rechercher...')}"
               aria-label="Rechercher dans la FAQ">
      </div>
    ` : '';

    // Header
    const header = `
      <div class="faq__header">
        ${faq.title ? `<h2 class="faq__title">${this.escapeHtml(faq.title)}</h2>` : ''}
        ${faq.subtitle ? `<p class="faq__subtitle">${this.escapeHtml(faq.subtitle)}</p>` : ''}
        ${searchHtml}
      </div>
    `;

    // Items FAQ
    const items = faq.items.map((item, index) => {
      const shouldOpen = index === 0 && faq.expandFirst;
      
      return `
        <div class="faq__item ${shouldOpen ? 'active' : ''}" 
             data-category="${item.category || 'general'}">
          <button class="faq__question" aria-expanded="${shouldOpen ? 'true' : 'false'}">
            ${faq.showNumbers && themeVariant === 'bold' ? `<span class="faq__number">${String(index + 1).padStart(2, '0')}</span>` : ''}
            <span class="faq__question-text">${this.escapeHtml(item.question)}</span>
            <span class="faq__icon">
              ${this.getIcon(themeVariant)}
            </span>
          </button>
          <div class="faq__answer">
            <div class="faq__answer-content">
              ${item.answer}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Catégories
    const categoriesHtml = faq.showCategories && faq.categories ? this.renderCategories(faq) : '';

    const html = `
      <section class="faq faq--${themeVariant}" 
               id="faq"
               data-expand-behavior="${faq.expandMultiple ? 'multiple' : 'single'}"
               data-search-min-chars="3">
        <div class="faq__container">
          ${header}
          ${categoriesHtml}
          <div class="faq__list">${items}</div>
          ${faq.cta?.enabled ? this.renderCTA(faq.cta) : ''}
        </div>
      </section>
    `;

    return {
      html,
      css: this.getDefaultCSS(),
      js: this.getDefaultJS(),
      assets: [],
      errors: undefined,
      warnings: undefined
    };
  }

  private renderCategories(data: FAQData): string {
    if (!data.categories || data.categories.length === 0) return '';
    
    return `
      <nav class="faq__categories" role="tablist">
        <button class="faq__category active" 
                data-category="all"
                role="tab"
                aria-selected="true">
          Toutes
        </button>
        ${data.categories.map(cat => `
          <button class="faq__category" 
                  data-category="${cat.id}"
                  role="tab"
                  aria-selected="false">
            ${cat.name}
          </button>
        `).join('')}
      </nav>
    `;
  }

  private renderCTA(cta: any): string {
    if (!cta || !cta.enabled) return '';
    
    return `
      <div class="faq__cta">
        ${cta.title ? `<h3 class="faq__cta-title">${this.escapeHtml(cta.title)}</h3>` : ''}
        ${cta.description ? `<p class="faq__cta-description">${this.escapeHtml(cta.description)}</p>` : ''}
        ${cta.buttonText ? `
          <a href="${cta.buttonLink || '#'}" class="faq__cta-button">
            ${this.escapeHtml(cta.buttonText)}
          </a>
        ` : ''}
      </div>
    `;
  }

  private escapeHtml(str: string): string {
    if (!str) return '';
    
    // Fallback if DOM is not available (during SSR or export)
    if (typeof document === 'undefined') {
      const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      };
      return str.replace(/[&<>"'\/]/g, (char) => escapeMap[char] || char);
    }
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  private getIcon(variant: string): string {
    const icons: Record<string, string> = {
      modern: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 7.5L10 12.5L15 7.5"/></svg>',
      minimal: '+',
      bold: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>',
      elegant: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 7.5L10 12.5L15 7.5"/></svg>'
    };
    return icons[variant] || icons.modern;
  }
}

export const faqRendererV3PerfectEnhanced = new FAQRendererV3PerfectEnhanced();
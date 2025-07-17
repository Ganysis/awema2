/**
 * Content Renderer V3 PERFECT ENHANCED - Design magnifique avec variants de style
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { contentDataSchema, contentDefaults, type ContentData } from '../schemas/blocks/content';
import { logger } from '../core/logger';

export class ContentRendererV3PerfectEnhanced extends BaseRendererV3<ContentData> {
  type = 'content-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContentRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Content V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<ContentData, ContentData> {
    return contentDataSchema.safeParse(data);
  }

  getDefaultData(): ContentData {
    return contentDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * OVERRIDE COMPLET - pas d'héritage
   */
  getBlockProps(): BlockProp[] {
    // IMPORTANT: Ne PAS appeler super() - on définit TOUT ici
    const props: BlockProp[] = [
      // Style visuel (comme les autres blocs V3)
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Style visuel',
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
      },
      
      // Type de contenu
      {
        name: 'type',
        type: PropType.SELECT,
        label: 'Type de contenu',
        required: true,
        defaultValue: 'text-image',
        description: 'Choisissez le type de contenu à afficher',
        options: [
          { value: 'text-image', label: '📝 Texte et Image' },
          { value: 'timeline', label: '⏱️ Timeline' },
          { value: 'accordion', label: '📂 Accordéon' },
          { value: 'tabs', label: '🗂️ Onglets' },
          { value: 'quote', label: '💬 Citation' },
          { value: 'stats', label: '📊 Statistiques' },
          { value: 'before-after', label: '🔄 Avant/Après' },
          { value: 'process', label: '📋 Processus' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Type de contenu',
          order: 1
        }
      },
      
      // Contenu commun
      {
        name: 'title',
        type: PropType.STRING,
        label: 'Titre',
        required: false,
        description: 'Titre principal de la section',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'subtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        required: false,
        description: 'Sous-titre ou description courte',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 2
        }
      },
      
      // Layout
      {
        name: 'layout.containerWidth',
        type: PropType.SELECT,
        label: 'Largeur du conteneur',
        defaultValue: 'normal',
        options: [
          { value: 'full', label: 'Pleine largeur' },
          { value: 'wide', label: 'Large' },
          { value: 'normal', label: 'Normal' },
          { value: 'narrow', label: 'Étroit' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Mise en page',
          order: 1
        }
      },
      {
        name: 'layout.padding',
        type: PropType.SELECT,
        label: 'Espacement interne',
        defaultValue: 'lg',
        options: [
          { value: 'none', label: 'Aucun' },
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
      
      // Animation
      {
        name: 'animation.enabled',
        type: PropType.BOOLEAN,
        label: 'Activer les animations',
        defaultValue: true,
        description: 'Active les animations au défilement',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Animations',
          order: 1
        }
      },
      
      // ===== CHAMPS CONDITIONNELS POUR TEXT-IMAGE =====
      {
        name: 'textImage.layout',
        type: PropType.SELECT,
        label: 'Position de l\'image',
        defaultValue: 'right',
        description: 'Choisissez où placer l\'image par rapport au texte',
        options: [
          { value: 'left', label: '⬅️ Image à gauche' },
          { value: 'right', label: '➡️ Image à droite' },
          { value: 'center', label: '⬆️ Image centrée au dessus' },
          { value: 'zigzag', label: '🔄 Alternance (plusieurs sections)' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Texte et Image',
          order: 1,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          }
        }
      },
      {
        name: 'textImage.image',
        type: PropType.STRING,
        label: 'Image principale',
        required: false,
        description: 'URL de l\'image ou sélectionnez depuis la galerie',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          group: 'Texte et Image',
          order: 2,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          },
          placeholder: 'https://exemple.com/image.jpg'
        }
      },
      {
        name: 'textImage.imageSize',
        type: PropType.SELECT,
        label: 'Taille de l\'image',
        defaultValue: 'medium',
        options: [
          { value: 'small', label: 'Petite (30%)' },
          { value: 'medium', label: 'Moyenne (40%)' },
          { value: 'large', label: 'Grande (50%)' },
          { value: 'full', label: 'Pleine largeur' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Texte et Image',
          order: 3,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          }
        }
      },
      {
        name: 'textImage.imageStyle',
        type: PropType.SELECT,
        label: 'Style de l\'image',
        defaultValue: 'rounded',
        options: [
          { value: 'rounded', label: '⚪ Coins arrondis' },
          { value: 'circle', label: '🔵 Cercle' },
          { value: 'square', label: '⬜ Carré' },
          { value: 'shadow', label: '🌑 Avec ombre' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Texte et Image',
          order: 4,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          }
        }
      },
      {
        name: 'textImage.content',
        type: PropType.STRING,
        label: 'Contenu principal',
        required: false,
        defaultValue: '<p>Votre contenu ici...</p>',
        description: 'Écrivez et mettez en forme votre contenu comme dans WordPress',
        editorConfig: {
          control: EditorControl.RICH_TEXT,
          group: 'Texte et Image',
          order: 5,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          },
          richTextOptions: {
            // Barre d'outils style WordPress
            toolbar: [
              // Ligne 1 : Formats et actions principales
              {
                name: 'format',
                label: 'Format',
                type: 'dropdown',
                options: [
                  { value: 'paragraph', label: 'Paragraphe' },
                  { value: 'heading2', label: 'Titre 2' },
                  { value: 'heading3', label: 'Titre 3' },
                  { value: 'heading4', label: 'Titre 4' }
                ]
              },
              '|',
              { name: 'bold', label: 'Gras', icon: 'B', shortcut: 'Ctrl+B' },
              { name: 'italic', label: 'Italique', icon: 'I', shortcut: 'Ctrl+I' },
              { name: 'underline', label: 'Souligné', icon: 'U', shortcut: 'Ctrl+U' },
              { name: 'strike', label: 'Barré', icon: 'ABC' },
              '|',
              { name: 'bulletList', label: 'Liste à puces', icon: '• • •' },
              { name: 'orderedList', label: 'Liste numérotée', icon: '1. 2. 3.' },
              { name: 'outdent', label: 'Réduire le retrait', icon: '←' },
              { name: 'indent', label: 'Augmenter le retrait', icon: '→' },
              '|',
              { name: 'alignLeft', label: 'Aligner à gauche', icon: '⬛⬜⬜' },
              { name: 'alignCenter', label: 'Centrer', icon: '⬜⬛⬜' },
              { name: 'alignRight', label: 'Aligner à droite', icon: '⬜⬜⬛' },
              { name: 'justify', label: 'Justifier', icon: '⬛⬛⬛' },
              '|',
              { name: 'link', label: 'Insérer/modifier un lien', icon: '🔗', shortcut: 'Ctrl+K' },
              { name: 'blockquote', label: 'Citation', icon: '"' },
              { name: 'table', label: 'Tableau', icon: '⊞' },
              { name: 'horizontalRule', label: 'Ligne de séparation', icon: '━━━' },
              '|',
              {
                name: 'textColor',
                label: 'Couleur du texte',
                type: 'color-picker',
                icon: 'A',
                colors: [
                  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#efefef',
                  '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff',
                  '#9900ff', '#ff00ff'
                ]
              },
              {
                name: 'backgroundColor',
                label: 'Couleur de fond',
                type: 'color-picker',
                icon: '🖍️',
                colors: [
                  'transparent', '#ffff00', '#00ff00', '#00ffff', '#ff00ff',
                  '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3'
                ]
              },
              '|',
              { name: 'removeFormat', label: 'Supprimer la mise en forme', icon: 'T̸' },
              '|',
              { name: 'undo', label: 'Annuler', icon: '↶', shortcut: 'Ctrl+Z' },
              { name: 'redo', label: 'Rétablir', icon: '↷', shortcut: 'Ctrl+Y' },
              '|',
              { name: 'fullscreen', label: 'Plein écran', icon: '⛶' },
              { name: 'help', label: 'Aide', icon: '?' }
            ],
            // Options de l'éditeur
            placeholder: 'Commencez à écrire votre contenu ici... Utilisez la barre d\'outils pour formater votre texte.',
            minHeight: '400px',
            maxHeight: '600px',
            autofocus: false,
            spellcheck: true,
            // Formats autorisés
            formats: [
              'paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6',
              'bold', 'italic', 'underline', 'strike', 'code',
              'bulletList', 'orderedList', 'blockquote', 'codeBlock',
              'link', 'video', 'table', 'horizontalRule'
            ],
            // Options pour les liens
            linkOptions: {
              defaultProtocol: 'https://',
              targets: [
                { value: '_self', label: 'Même fenêtre' },
                { value: '_blank', label: 'Nouvelle fenêtre' },
                { value: '_parent', label: 'Fenêtre parent' },
                { value: '_top', label: 'Fenêtre principale' }
              ],
              rel: ['nofollow', 'noopener', 'noreferrer']
            },
            // Options pour les tableaux
            tableOptions: {
              defaultRows: 3,
              defaultCols: 3,
              maxRows: 20,
              maxCols: 10,
              allowHeaderRow: true,
              allowHeaderCol: true
            }
          }
        }
      },
      {
        name: 'textImage.features',
        type: PropType.ARRAY,
        label: 'Points clés (optionnel)',
        required: false,
        description: 'Liste de points avec icônes',
        editorConfig: {
          control: EditorControl.ARRAY,
          group: 'Texte et Image',
          order: 6,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          },
          addButtonText: '+ Ajouter un point',
          schema: [
            {
              name: 'icon',
              type: PropType.STRING,
              label: 'Icône',
              defaultValue: '✓',
              placeholder: 'Ex: ✓, ⭐, 🚀'
            },
            {
              name: 'text',
              type: PropType.STRING,
              label: 'Texte',
              required: true,
              placeholder: 'Point important à mettre en avant'
            }
          ]
        }
      },
      {
        name: 'textImage.cta',
        type: PropType.OBJECT,
        label: 'Bouton d\'action (optionnel)',
        required: false,
        editorConfig: {
          control: EditorControl.OBJECT,
          group: 'Texte et Image',
          order: 7,
          showIf: {
            field: 'type',
            operator: 'equals',
            value: 'text-image'
          },
          schema: [
            {
              name: 'text',
              type: PropType.STRING,
              label: 'Texte du bouton',
              defaultValue: 'En savoir plus'
            },
            {
              name: 'link',
              type: PropType.STRING,
              label: 'Lien',
              defaultValue: '#'
            },
            {
              name: 'style',
              type: PropType.SELECT,
              label: 'Style',
              defaultValue: 'primary',
              options: [
                { value: 'primary', label: 'Principal' },
                { value: 'secondary', label: 'Secondaire' },
                { value: 'outline', label: 'Contour' }
              ]
            }
          ]
        }
      }
    ];

    // Retourner UNIQUEMENT nos props personnalisés (pas de super() pour éviter les doublons)
    return props;
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CONTENT V3 PERFECT ENHANCED - Styles avec thème
   ======================================== */

.content {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  background: var(--background);
}

.content__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========================================
   STYLES DE VARIANTES AVEC THÈME
   ======================================== */

/* Style Moderne */
.content--visual-modern {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary), transparent 95%) 0%, 
    var(--background) 50%);
}

.content--visual-modern .content__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

.content--visual-modern .content__subtitle {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--text-secondary);
  opacity: 0.9;
}

.content--visual-modern .content__body {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text);
}

.content--visual-modern .content__card {
  background: var(--surface);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content--visual-modern .content__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px -15px color-mix(in srgb, var(--primary), transparent 80%);
}

/* Style Minimaliste */
.content--visual-minimal {
  background: var(--background);
  padding: 8rem 0;
}

.content--visual-minimal .content__title {
  font-family: var(--font-body);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--text);
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

.content--visual-minimal .content__subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 3rem;
}

.content--visual-minimal .content__body {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 2;
  color: var(--text);
  max-width: 65ch;
  margin: 0 auto;
}

.content--visual-minimal .content__divider {
  width: 60px;
  height: 1px;
  background: var(--border);
  margin: 3rem auto;
}

/* Style Impact */
.content--visual-bold {
  background: var(--text);
  color: var(--background);
  padding: 8rem 0;
  position: relative;
}

.content--visual-bold::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

.content--visual-bold .content__title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: var(--background);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.content--visual-bold .content__subtitle {
  font-family: var(--font-body);
  font-size: 1.5rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 2rem;
}

.content--visual-bold .content__body {
  font-family: var(--font-body);
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--background);
  opacity: 0.9;
}

.content--visual-bold .content__highlight {
  color: var(--accent);
  font-weight: 700;
}

/* Style Élégant */
.content--visual-elegant {
  background: linear-gradient(180deg, var(--background) 0%, var(--surface) 100%);
  padding: 10rem 0;
  position: relative;
}

.content--visual-elegant::after {
  content: '';
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent);
  opacity: 0.1;
  filter: blur(40px);
}

.content--visual-elegant .content__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: var(--text);
  text-align: center;
  letter-spacing: 0.02em;
  margin-bottom: 2rem;
}

.content--visual-elegant .content__subtitle {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--text-secondary);
  text-align: center;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.content--visual-elegant .content__body {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--text);
  text-align: justify;
  column-count: 2;
  column-gap: 3rem;
  column-rule: 1px solid var(--border);
}

/* ========================================
   VARIANTES DE LAYOUT (inchangées mais avec thème)
   ======================================== */

/* Magazine Layout avec thème */
.content--magazine-layout .content__meta {
  color: var(--text-secondary);
  font-family: var(--font-body);
}

.content--magazine-layout .content__dropcap {
  color: var(--primary);
  font-family: var(--font-heading);
}

.content--magazine-layout .content__pullquote {
  border-color: var(--primary);
  color: var(--text);
  font-family: var(--font-body);
}

/* Blog Modern avec thème */
.content--blog-modern .content__main {
  background: var(--surface);
  box-shadow: 0 10px 40px -10px color-mix(in srgb, var(--text), transparent 90%);
}

.content--blog-modern .content__widget {
  background: var(--surface);
  border: 1px solid var(--border);
}

.content--blog-modern .content__widget-title {
  color: var(--text);
  font-family: var(--font-heading);
  border-bottom-color: var(--border);
}

.content--blog-modern .content__toc-link {
  color: var(--text-secondary);
  font-family: var(--font-body);
}

.content--blog-modern .content__toc-link:hover,
.content--blog-modern .content__toc-link.active {
  color: var(--primary);
}

/* Timeline Story avec thème */
.content--timeline-story .content__timeline::before {
  background: linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent));
}

.content--timeline-story .content__chapter::before {
  background: var(--background);
  border-color: var(--primary);
  color: var(--primary);
}

.content--timeline-story .content__chapter.active::before {
  background: var(--primary);
  color: var(--background);
}

.content--timeline-story .content__chapter-title {
  color: var(--text);
  font-family: var(--font-heading);
}

.content--timeline-story .content__chapter-content {
  color: var(--text-secondary);
  font-family: var(--font-body);
}

/* Cards Grid avec thème */
.content--cards-grid .content__card {
  background: var(--surface);
  border: 1px solid var(--border);
}

.content--cards-grid .content__card-category {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  font-family: var(--font-body);
}

.content--cards-grid .content__card-title {
  color: var(--text);
  font-family: var(--font-heading);
}

.content--cards-grid .content__card-excerpt {
  color: var(--text-secondary);
  font-family: var(--font-body);
}

.content--cards-grid .content__card-link {
  color: var(--primary);
  font-family: var(--font-body);
}

/* Accordion Tabs avec thème */
.content--accordion-tabs .content__tab {
  color: var(--text-secondary);
  font-family: var(--font-body);
  border-bottom-color: var(--border);
}

.content--accordion-tabs .content__tab.active {
  color: var(--primary);
}

.content--accordion-tabs .content__tab.active::after {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.content--accordion-tabs .content__accordion-header {
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
}

.content--accordion-tabs .content__accordion-item.active .content__accordion-header {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--background);
}

/* Comparison Table avec thème */
.content--comparison-table .content__comparison {
  background: var(--surface);
  border: 1px solid var(--border);
}

.content--comparison-table thead {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.content--comparison-table th,
.content--comparison-table td {
  border-color: var(--border);
  font-family: var(--font-body);
}

.content--comparison-table tbody tr:hover {
  background: color-mix(in srgb, var(--primary), transparent 95%);
}

/* Interactive Story avec thème */
.content--interactive-story {
  background: var(--text);
  color: var(--background);
}

.content--interactive-story .content__scene-content {
  background: color-mix(in srgb, var(--text), transparent 30%);
  backdrop-filter: blur(10px);
}

.content--interactive-story .content__scene-title {
  background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-heading);
}

.content--interactive-story .content__choice {
  background: color-mix(in srgb, var(--background), transparent 90%);
  border-color: color-mix(in srgb, var(--background), transparent 80%);
  color: var(--background);
  font-family: var(--font-body);
}

.content--interactive-story .content__choice:hover {
  background: color-mix(in srgb, var(--background), transparent 80%);
}

/* Éléments communs avec thème */
.content__title {
  font-family: var(--font-heading);
  color: var(--text);
}

.content__subtitle {
  font-family: var(--font-body);
  color: var(--text-secondary);
}

.content__body {
  font-family: var(--font-body);
  color: var(--text);
}

.content__body h2,
.content__body h3 {
  font-family: var(--font-heading);
  color: var(--text);
}

.content__body blockquote {
  background: var(--surface);
  border-left-color: var(--primary);
  color: var(--text);
}

.content__body code {
  background: var(--surface);
  color: var(--primary);
}

.content__body pre {
  background: var(--text);
  color: var(--background);
}

/* Call to action inline avec thème */
.content__cta-inline {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary), transparent 90%), 
    color-mix(in srgb, var(--secondary), transparent 90%));
}

.content__cta-inline h3 {
  color: var(--text);
  font-family: var(--font-heading);
}

.content__cta-inline p {
  color: var(--text-secondary);
  font-family: var(--font-body);
}

.content__cta-inline a {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--background);
  font-family: var(--font-body);
}

.content__cta-inline a:hover {
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--primary), transparent 60%);
}

/* Progress reading bar avec thème */
.content__progress {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

/* Animations restent les mêmes */
.content--animated .content__title,
.content--animated .content__subtitle,
.content--animated .content__body > * {
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out forwards;
}

.content--animated .content__title { animation-delay: 0.1s; }
.content--animated .content__subtitle { animation-delay: 0.2s; }
.content--animated .content__body > *:nth-child(1) { animation-delay: 0.3s; }
.content--animated .content__body > *:nth-child(2) { animation-delay: 0.4s; }
.content--animated .content__body > *:nth-child(3) { animation-delay: 0.5s; }
.content--animated .content__body > *:nth-child(4) { animation-delay: 0.6s; }

@keyframes contentFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   STYLES POUR TEXT-IMAGE
   ======================================== */

.content__text-image {
  padding: 2rem 0;
}

.content__text-image-wrapper {
  display: grid;
  gap: 3rem;
  align-items: center;
}

/* Layout: Image à droite (par défaut) */
.content__text-image--image-right .content__text-image-wrapper {
  grid-template-columns: 1fr auto;
}

/* Layout: Image à gauche */
.content__text-image--image-left .content__text-image-wrapper {
  grid-template-columns: auto 1fr;
}

.content__text-image--image-left .content__text-image-media {
  order: -1;
}

/* Layout: Image centrée au-dessus */
.content__text-image--image-center .content__text-image-wrapper {
  grid-template-columns: 1fr;
  text-align: center;
}

.content__text-image-media--center {
  margin: 0 auto 2rem;
}

/* Tailles d'image */
.content__text-image-media--small {
  width: 300px;
  max-width: 100%;
}

.content__text-image-media--medium {
  width: 400px;
  max-width: 100%;
}

.content__text-image-media--large {
  width: 500px;
  max-width: 100%;
}

.content__text-image-media--full {
  width: 100%;
}

/* Styles d'image */
.content__text-image-img {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s ease;
}

.content__text-image-img--rounded {
  border-radius: 1rem;
}

.content__text-image-img--circle {
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
}

.content__text-image-img--square {
  border-radius: 0;
}

.content__text-image-img--shadow {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}

/* Contenu riche */
.content__rich-text {
  font-family: var(--font-body);
  color: var(--text);
  line-height: 1.8;
}

.content__rich-text h2 {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: var(--text);
}

.content__rich-text h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: var(--text);
}

.content__rich-text h4 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.25rem 0 0.5rem;
  color: var(--text);
}

.content__rich-text p {
  margin: 0 0 1.5rem;
}

.content__rich-text ul,
.content__rich-text ol {
  margin: 0 0 1.5rem;
  padding-left: 2rem;
}

.content__rich-text li {
  margin: 0.5rem 0;
}

.content__rich-text strong {
  font-weight: 600;
  color: var(--text);
}

.content__rich-text em {
  font-style: italic;
}

.content__rich-text u {
  text-decoration: underline;
}

.content__rich-text a {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.content__rich-text a:hover {
  border-bottom-color: var(--primary);
}

.content__rich-text blockquote {
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-left: 4px solid var(--primary);
  background: var(--surface);
  font-style: italic;
  color: var(--text-secondary);
}

/* Features list */
.content__features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.content__feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 1rem 0;
}

.content__feature-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: var(--primary);
  margin-top: 0.125rem;
}

.content__feature-text {
  font-family: var(--font-body);
  color: var(--text);
  line-height: 1.6;
}

/* CTA Button */
.content__cta {
  margin-top: 2rem;
}

.content__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.content__btn--primary {
  background: var(--primary);
  color: white;
  border: 2px solid var(--primary);
}

.content__btn--primary:hover {
  background: var(--secondary);
  border-color: var(--secondary);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}

.content__btn--secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.content__btn--secondary:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.content__btn--outline {
  background: transparent;
  color: var(--text);
  border: 2px solid var(--border);
}

.content__btn--outline:hover {
  border-color: var(--text);
  transform: translateY(-2px);
}

/* Container widths */
.content__container--full {
  max-width: 100%;
}

.content__container--wide {
  max-width: 1400px;
}

.content__container--normal {
  max-width: 1200px;
}

.content__container--narrow {
  max-width: 800px;
}

/* Responsive - inchangé */
@media (max-width: 768px) {
  /* Text-Image responsive */
  .content__text-image--image-left .content__text-image-wrapper,
  .content__text-image--image-right .content__text-image-wrapper {
    grid-template-columns: 1fr;
  }
  
  .content__text-image-media {
    order: -1;
    margin: 0 auto 2rem;
  }
  
  .content__text-image-media--small,
  .content__text-image-media--medium,
  .content__text-image-media--large {
    width: 100%;
    max-width: 400px;
  }
  
  .content__rich-text h2 {
    font-size: 1.5rem;
  }
  
  .content__rich-text h3 {
    font-size: 1.25rem;
  }
  
  .content__rich-text h4 {
    font-size: 1.125rem;
  }
  
  .content--magazine-layout .content__body {
    column-count: 1;
  }
  
  .content--blog-modern .content__wrapper {
    grid-template-columns: 1fr;
  }
  
  .content--split-content .content__section {
    grid-template-columns: 1fr;
  }
  
  .content--split-content .content__section:nth-child(even) {
    direction: ltr;
  }
  
  .content--accordion-tabs .content__tabs {
    flex-direction: column;
    border-bottom: none;
  }
  
  .content--accordion-tabs .content__tab.active::after {
    display: none;
  }
  
  .content--cards-grid .content__grid {
    grid-template-columns: 1fr;
  }
  
  .content--visual-elegant .content__body {
    column-count: 1;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Content V3 Perfect Enhanced - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation Content
  function initContent() {
    const contents = document.querySelectorAll('.content');
    
    contents.forEach(content => {
      const variant = Array.from(content.classList).find(c => c.startsWith('content--'))?.replace('content--', '');
      
      // Progress bar
      initProgressBar(content);
      
      // Table of contents
      initTableOfContents(content);
      
      // Variantes spécifiques
      switch(variant) {
        case 'timeline-story':
          initTimelineStory(content);
          break;
        case 'accordion-tabs':
          initAccordionTabs(content);
          break;
        case 'interactive-story':
          initInteractiveStory(content);
          break;
        case 'cards-grid':
          initCardsGrid(content);
          break;
      }
      
      // Animations d'entrée
      observeContent(content);
      
      // Reading time
      calculateReadingTime(content);
    });
  }
  
  // Progress bar de lecture
  function initProgressBar(content) {
    const progressBar = document.createElement('div');
    progressBar.className = 'content__progress';
    document.body.appendChild(progressBar);
    
    let ticking = false;
    
    function updateProgress() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrolled = window.scrollY;
          const progress = scrolled / documentHeight;
          
          progressBar.style.transform = 'scaleX(' + progress + ')';
          
          ticking = false;
        });
        
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }
  
  // Table des matières
  function initTableOfContents(content) {
    const toc = content.querySelector('.content__toc');
    if (!toc) return;
    
    const headings = content.querySelectorAll('h2, h3');
    const tocItems = [];
    
    // Créer les liens
    headings.forEach((heading, index) => {
      const id = 'heading-' + index;
      heading.id = id;
      
      const level = heading.tagName.toLowerCase();
      const item = document.createElement('li');
      item.className = 'content__toc-item content__toc-item--' + level;
      
      const link = document.createElement('a');
      link.href = '#' + id;
      link.className = 'content__toc-link';
      link.textContent = heading.textContent;
      
      if (level === 'h3') {
        link.style.paddingLeft = '1rem';
      }
      
      item.appendChild(link);
      tocItems.push({ element: item, target: heading, link });
    });
    
    // Ajouter au TOC
    toc.innerHTML = '';
    tocItems.forEach(item => toc.appendChild(item.element));
    
    // Smooth scroll
    tocItems.forEach(item => {
      item.link.addEventListener('click', (e) => {
        e.preventDefault();
        item.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    
    // Active state on scroll
    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = Array.from(headings).indexOf(entry.target);
        if (index !== -1) {
          if (entry.isIntersecting) {
            tocItems.forEach(item => item.link.classList.remove('active'));
            tocItems[index].link.classList.add('active');
          }
        }
      });
    }, observerOptions);
    
    headings.forEach(heading => observer.observe(heading));
  }
  
  // Timeline Story
  function initTimelineStory(content) {
    const chapters = content.querySelectorAll('.content__chapter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.5 });
    
    chapters.forEach(chapter => observer.observe(chapter));
  }
  
  // Accordion Tabs
  function initAccordionTabs(content) {
    // Tabs
    const tabs = content.querySelectorAll('.content__tab');
    const panels = content.querySelectorAll('.content__panel');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        if (panels[index]) {
          panels[index].classList.add('active');
        }
      });
    });
    
    // Accordion items
    const accordionItems = content.querySelectorAll('.content__accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.content__accordion-header');
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
  
  // Interactive Story
  function initInteractiveStory(content) {
    const scenes = content.querySelectorAll('.content__scene');
    let currentScene = 0;
    
    // Show first scene
    if (scenes.length > 0) {
      scenes[currentScene].classList.add('active');
    }
    
    // Handle choices
    const choices = content.querySelectorAll('.content__choice');
    
    choices.forEach(choice => {
      choice.addEventListener('click', (e) => {
        e.preventDefault();
        
        const nextSceneId = choice.getAttribute('data-next-scene');
        if (nextSceneId) {
          // Hide current scene
          scenes[currentScene].classList.remove('active');
          
          // Find and show next scene
          const nextScene = content.querySelector(\`#\${nextSceneId}\`);
          if (nextScene) {
            const nextIndex = Array.from(scenes).indexOf(nextScene);
            if (nextIndex !== -1) {
              currentScene = nextIndex;
              nextScene.classList.add('active');
              
              // Scroll to scene
              nextScene.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
        
        // Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'story_choice', {
            choice_text: choice.textContent,
            scene_id: nextSceneId
          });
        }
      });
    });
  }
  
  // Cards Grid
  function initCardsGrid(content) {
    const cards = content.querySelectorAll('.content__card');
    
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const link = card.querySelector('.content__card-link');
        if (link) {
          window.location.href = link.href;
        }
      });
    });
  }
  
  // Calculate reading time
  function calculateReadingTime(content) {
    const text = content.textContent || '';
    const wordsPerMinute = 200;
    const words = text.trim().split(/\\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    const readingTimeElement = content.querySelector('.content__reading-time');
    if (readingTimeElement) {
      readingTimeElement.textContent = \`\${minutes} min de lecture\`;
    }
  }
  
  // Observer pour animations
  function observeContent(content) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('content--visible');
          
          // Animate elements
          animateElements(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = content.querySelectorAll('.content__title, .content__subtitle, .content__body > *, .content__card');
    elements.forEach(el => observer.observe(el));
  }
  
  // Animate elements
  function animateElements(container) {
    const animatedElements = container.querySelectorAll('[data-animate]');
    
    animatedElements.forEach((element, index) => {
      const animationType = element.dataset.animate || 'fade';
      const delay = index * 100;
      
      setTimeout(() => {
        element.style.opacity = '0';
        
        switch(animationType) {
          case 'slide':
            element.style.transform = 'translateX(-30px)';
            break;
          case 'zoom':
            element.style.transform = 'scale(0.8)';
            break;
          default:
            element.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
          element.style.transition = 'all 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'none';
        }, 50);
      }, delay);
    });
  }
  
  // Copy code blocks
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
      const button = document.createElement('button');
      button.className = 'content__code-copy';
      button.textContent = 'Copier';
      button.style.cssText = \`
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.25rem 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.25rem;
        color: #e5e7eb;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.3s;
      \`;
      
      block.style.position = 'relative';
      block.appendChild(button);
      
      button.addEventListener('click', async () => {
        const code = block.querySelector('code')?.textContent || block.textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = '✓ Copié !';
          button.style.background = '#10b981';
          
          setTimeout(() => {
            button.textContent = 'Copier';
            button.style.background = 'rgba(255, 255, 255, 0.1)';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }
  
  // Image zoom
  function initImageZoom() {
    const images = document.querySelectorAll('.content__image');
    
    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'content__image-overlay';
        overlay.style.cssText = \`
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
          opacity: 0;
          transition: opacity 0.3s;
        \`;
        
        const zoomedImg = img.cloneNode();
        zoomedImg.style.cssText = \`
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          transform: scale(0.8);
          transition: transform 0.3s;
        \`;
        
        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);
        
        // Force reflow
        overlay.offsetHeight;
        
        overlay.style.opacity = '1';
        zoomedImg.style.transform = 'scale(1)';
        
        overlay.addEventListener('click', () => {
          overlay.style.opacity = '0';
          zoomedImg.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            overlay.remove();
          }, 300);
        });
      });
    });
  }
  
  // Share functionality
  function initShare() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const platform = button.dataset.share;
        const url = window.location.href;
        const title = document.title;
        
        switch(platform) {
          case 'native':
            if (navigator.share) {
              try {
                await navigator.share({
                  title: title,
                  url: url
                });
              } catch (err) {
                console.log('Share cancelled');
              }
            }
            break;
            
          case 'twitter':
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url));
            break;
            
          case 'facebook':
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
            break;
            
          case 'linkedin':
            window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url));
            break;
            
          case 'copy':
            try {
              await navigator.clipboard.writeText(url);
              button.textContent = '✓ Lien copié !';
              setTimeout(() => {
                button.textContent = button.dataset.originalText || 'Copier le lien';
              }, 2000);
            } catch (err) {
              console.error('Failed to copy:', err);
            }
            break;
        }
      });
    });
  }
  
  // Print friendly
  function initPrint() {
    const printButton = document.querySelector('[data-print]');
    if (!printButton) return;
    
    printButton.addEventListener('click', () => {
      window.print();
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initContent();
      initCodeCopy();
      initImageZoom();
      initShare();
      initPrint();
    });
  } else {
    initContent();
    initCodeCopy();
    initImageZoom();
    initShare();
    initPrint();
  }
  
  // Export pour usage externe
  window.ContentPerfect = {
    init: initContent,
    calculateReadingTime: calculateReadingTime
  };
})();
    `;
  }

  render(data: ContentData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('ContentRendererV3PerfectEnhanced', 'render', 'Validation échouée', validation.error);
        return {
          html: this.renderError('Données invalides'),
          css: this.getDefaultCSS(),
          js: this.getDefaultJS(),
          errors: validation.error.errors.map(e => ({
            message: e.message,
            path: e.path.join('.')
          }))
        };
      }

      const validData = validation.data;
      logger.info('ContentRendererV3PerfectEnhanced', 'render', 'Rendu Content avec variante:', validData.variant);

      // Extraire le thème du contexte
      const theme = context?.theme;
      const primaryColor = theme?.colors?.primary || '#667eea';
      const secondaryColor = theme?.colors?.secondary || '#764ba2';
      const textColor = theme?.colors?.text || '#1a202c';
      const textSecondaryColor = theme?.colors?.textSecondary || '#718096';
      const backgroundColor = theme?.colors?.background || '#ffffff';
      const surfaceColor = theme?.colors?.surface || '#f7fafc';
      const borderColor = theme?.colors?.border || '#e2e8f0';
      const accentColor = theme?.colors?.accent || primaryColor;
      const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
      const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';

      // Ajouter le style variant depuis les données (visualVariant pour uniformité)
      const visualVariant = (data as any).visualVariant || 'modern';

      // Générer le HTML selon la variante
      const html = this.renderVariant(validData, visualVariant, context);
      
      // CSS avec variables personnalisées et thème
      const customCSS = this.generateCustomCSS(validData, {
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
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('ContentRendererV3PerfectEnhanced', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderVariant(data: ContentData, visualVariant: string, context?: RenderContext): string {
    let content = '';
    
    // Utiliser data.type au lieu de data.variant
    switch(data.type) {
      case 'text-image':
        content = this.renderTextImage(data);
        break;
      case 'timeline':
        content = this.renderTimeline(data);
        break;
      case 'accordion':
        content = this.renderAccordion(data);
        break;
      case 'tabs':
        content = this.renderTabs(data);
        break;
      case 'quote':
        content = this.renderQuote(data);
        break;
      case 'stats':
        content = this.renderStats(data);
        break;
      case 'before-after':
        content = this.renderBeforeAfter(data);
        break;
      case 'process':
        content = this.renderProcess(data);
        break;
      default:
        content = this.renderTextImage(data);
    }

    return `
      <section class="content content--${data.type} content--visual-${visualVariant} ${data.animation?.enabled ? 'content--animated' : ''}" data-style-variant="${visualVariant}" id="${data.id || 'content'}">
        <div class="content__container content__container--${data.layout?.containerWidth || 'normal'}">
          ${content}
        </div>
      </section>
    `;
  }

  private renderTextImage(data: ContentData): string {
    const textImage = data.textImage || {};
    const layout = textImage.layout || 'right';
    const imagePosition = layout === 'left' ? 'content__text-image--image-left' : 
                         layout === 'right' ? 'content__text-image--image-right' :
                         layout === 'center' ? 'content__text-image--image-center' : 
                         'content__text-image--zigzag';

    return `
      <div class="content__text-image ${imagePosition}">
        ${data.title ? `<h2 class="content__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__text-image-wrapper">
          ${textImage.image && layout !== 'center' ? `
            <div class="content__text-image-media content__text-image-media--${textImage.imageSize || 'medium'}">
              <img 
                src="${textImage.image.src || textImage.image}" 
                alt="${textImage.image.alt || ''}" 
                class="content__text-image-img content__text-image-img--${textImage.imageStyle || 'rounded'}"
                loading="lazy"
              />
            </div>
          ` : ''}
          
          <div class="content__text-image-content">
            ${textImage.image && layout === 'center' ? `
              <div class="content__text-image-media content__text-image-media--center content__text-image-media--${textImage.imageSize || 'medium'}">
                <img 
                  src="${textImage.image.src || textImage.image}" 
                  alt="${textImage.image.alt || ''}" 
                  class="content__text-image-img content__text-image-img--${textImage.imageStyle || 'rounded'}"
                  loading="lazy"
                />
              </div>
            ` : ''}
            
            <div class="content__rich-text">
              ${textImage.content || '<p>Votre contenu ici...</p>'}
            </div>
            
            ${textImage.features && textImage.features.length > 0 ? `
              <ul class="content__features">
                ${textImage.features.map(feature => `
                  <li class="content__feature">
                    <span class="content__feature-icon">${feature.icon || '✓'}</span>
                    <span class="content__feature-text">${this.escapeHtml(feature.text)}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            
            ${textImage.cta ? `
              <div class="content__cta">
                <a href="${textImage.cta.link || '#'}" class="content__btn content__btn--${textImage.cta.style || 'primary'}">
                  ${this.escapeHtml(textImage.cta.text || 'En savoir plus')}
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderTimeline(data: ContentData): string {
    const timeline = data.timeline || {};
    return `
      <div class="content__timeline content__timeline--${timeline.style || 'vertical'}">
        ${data.title ? `<h2 class="content__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__timeline-items">
          ${(timeline.items || []).map((item, index) => `
            <div class="content__timeline-item" style="--index: ${index}">
              <div class="content__timeline-marker">
                ${item.icon ? `<span class="content__timeline-icon">${item.icon}</span>` : ''}
              </div>
              <div class="content__timeline-content">
                <time class="content__timeline-date">${this.escapeHtml(item.date)}</time>
                <h3 class="content__timeline-title">${this.escapeHtml(item.title)}</h3>
                <p class="content__timeline-description">${this.escapeHtml(item.description)}</p>
                ${item.link ? `
                  <a href="${item.link.url}" class="content__timeline-link">
                    ${this.escapeHtml(item.link.text)}
                  </a>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderAccordion(data: ContentData): string {
    const accordion = data.accordion || {};
    return `
      <div class="content__accordion content__accordion--${accordion.style || 'simple'}">
        ${data.title ? `<h2 class="content__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__accordion-items">
          ${(accordion.items || []).map((item, index) => `
            <div class="content__accordion-item ${item.open ? 'active' : ''}" data-index="${index}">
              <button class="content__accordion-trigger">
                ${item.icon ? `<span class="content__accordion-icon">${item.icon}</span>` : ''}
                <span class="content__accordion-title">${this.escapeHtml(item.title)}</span>
                <span class="content__accordion-arrow">▼</span>
              </button>
              <div class="content__accordion-content">
                <div class="content__accordion-inner">
                  ${item.content}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderTabs(data: ContentData): string {
    const tabs = data.tabs || {};
    return `
      <div class="content__tabs content__tabs--${tabs.style || 'line'}">
        ${data.title ? `<h2 class="content__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__tabs-nav">
          ${(tabs.items || []).map((item, index) => `
            <button class="content__tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
              ${item.icon ? `<span class="content__tab-icon">${item.icon}</span>` : ''}
              <span class="content__tab-label">${this.escapeHtml(item.label)}</span>
              ${item.badge ? `<span class="content__tab-badge">${this.escapeHtml(item.badge)}</span>` : ''}
            </button>
          `).join('')}
        </div>
        
        <div class="content__tabs-panels">
          ${(tabs.items || []).map((item, index) => `
            <div class="content__tab-panel ${index === 0 ? 'active' : ''}" data-panel="${index}">
              ${item.content}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderQuote(data: ContentData): string {
    const quote = data.quote || {};
    const quoteData = quote.data || {};
    
    return `
      <div class="content__quote content__quote--${quote.style || 'simple'}">
        ${quote.showQuoteIcon !== false ? `
          <div class="content__quote-icon content__quote-icon--${quote.quoteIconStyle || 'classic'}">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        ` : ''}
        
        <blockquote class="content__quote-text">
          ${quoteData.text || 'Votre citation ici...'}
        </blockquote>
        
        <div class="content__quote-author">
          ${quoteData.image ? `
            <img src="${quoteData.image.src || quoteData.image}" alt="${quoteData.author || ''}" class="content__quote-avatar">
          ` : ''}
          <div class="content__quote-author-info">
            <cite class="content__quote-name">${this.escapeHtml(quoteData.author || 'Auteur')}</cite>
            ${quoteData.role ? `<span class="content__quote-role">${this.escapeHtml(quoteData.role)}</span>` : ''}
            ${quoteData.company ? `<span class="content__quote-company">${this.escapeHtml(quoteData.company)}</span>` : ''}
          </div>
          ${quoteData.rating ? `
            <div class="content__quote-rating">
              ${Array.from({length: 5}, (_, i) => `
                <span class="content__quote-star ${i < quoteData.rating ? 'filled' : ''}">★</span>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderStats(data: ContentData): string {
    const stats = data.stats || {};
    
    return `
      <div class="content__stats content__stats--${stats.style || 'simple'}">
        ${data.title ? `<h2 class="content__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__stats-grid" style="--columns: ${stats.columns || 3}">
          ${(stats.items || []).map((stat, index) => `
            <div class="content__stat" style="--index: ${index}">
              ${stat.icon ? `<div class="content__stat-icon">${stat.icon}</div>` : ''}
              <div class="content__stat-value">
                ${stat.prefix || ''}${stat.value}${stat.suffix || ''}
              </div>
              <div class="content__stat-label">${this.escapeHtml(stat.label)}</div>
              ${stat.description ? `<p class="content__stat-description">${this.escapeHtml(stat.description)}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderBeforeAfter(data: ContentData): string {
    const beforeAfter = data.beforeAfter || {};
    const beforeAfterData = beforeAfter.data || {};
    
    return `
      <div class="content__before-after content__before-after--${beforeAfter.style || 'slider'}">
        ${beforeAfterData.title ? `<h2 class="content__title">${this.escapeHtml(beforeAfterData.title)}</h2>` : ''}
        ${beforeAfterData.description ? `<p class="content__subtitle">${this.escapeHtml(beforeAfterData.description)}</p>` : ''}
        
        <div class="content__before-after-container">
          <div class="content__before-after-wrapper">
            <div class="content__before">
              <img src="${beforeAfterData.before?.image?.src || ''}" alt="${beforeAfterData.before?.label || 'Avant'}">
              ${beforeAfter.showLabels !== false ? `<span class="content__before-label">${beforeAfterData.before?.label || 'Avant'}</span>` : ''}
            </div>
            <div class="content__after">
              <img src="${beforeAfterData.after?.image?.src || ''}" alt="${beforeAfterData.after?.label || 'Après'}">
              ${beforeAfter.showLabels !== false ? `<span class="content__after-label">${beforeAfterData.after?.label || 'Après'}</span>` : ''}
            </div>
            ${beforeAfter.style === 'slider' ? `
              <div class="content__before-after-slider" style="left: ${beforeAfter.sliderPosition || 50}%">
                <div class="content__before-after-handle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                    <path d="M16 5v14l-11-7z" transform="scale(-1, 1) translate(-24, 0)"/>
                  </svg>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderProcess(data: ContentData): string {
    const process = data.process || {};
    
    return `
      <div class="content__process content__process--${process.style || 'steps'} content__process--${process.orientation || 'horizontal'}">
        ${data.title ? `<h2 class="content__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__process-items">
          ${(process.items || []).map((item, index) => `
            <div class="content__process-item" style="--index: ${index}">
              <div class="content__process-number content__process-number--${process.numberStyle || 'circle'}">
                ${item.icon || item.number || (index + 1)}
              </div>
              ${process.showConnectors !== false && index < (process.items || []).length - 1 ? `
                <div class="content__process-connector"></div>
              ` : ''}
              <div class="content__process-content">
                <h3 class="content__process-title">${this.escapeHtml(item.title)}</h3>
                <p class="content__process-description">${this.escapeHtml(item.description)}</p>
                ${item.image ? `
                  <img src="${item.image.src || item.image}" alt="${item.title}" class="content__process-image">
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderMagazineLayout(data: ContentData): string {
    return `
      <div class="content__wrapper">
        <header class="content__header">
          <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
          ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
          ${data.meta ? this.renderMeta(data.meta) : ''}
        </header>
        <div class="content__body">
          ${data.content ? this.renderRichContent(data.content) : ''}
        </div>
      </div>
    `;
  }

  private renderBlogModern(data: ContentData): string {
    return `
      <div class="content__wrapper">
        <main class="content__main">
          <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
          ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
          ${data.meta ? this.renderMeta(data.meta) : ''}
          <div class="content__body">
            ${data.content ? this.renderRichContent(data.content) : ''}
          </div>
        </main>
        <aside class="content__sidebar">
          ${data.sidebar ? this.renderSidebar(data.sidebar) : ''}
        </aside>
      </div>
    `;
  }

  private renderTimelineStory(data: ContentData): string {
    const chapters = data.chapters || [];
    
    return `
      <div class="content__timeline">
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        ${chapters.map((chapter, index) => `
          <div class="content__chapter" data-year="${chapter.year || index + 1}">
            <h2 class="content__chapter-title">${this.escapeHtml(chapter.title)}</h2>
            <div class="content__chapter-content">
              ${chapter.content}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderCardsGrid(data: ContentData): string {
    const cards = data.cards || [];
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__grid">
          ${cards.map(card => `
            <article class="content__card">
              ${card.image ? `<img src="${card.image?.url || card.image}" alt="${card.image?.alt || ''}" class="content__card-image">` : ''}
              <div class="content__card-body">
                ${card.category ? `<span class="content__card-category">${this.escapeHtml(card.category)}</span>` : ''}
                <h3 class="content__card-title">${this.escapeHtml(card.title)}</h3>
                <p class="content__card-excerpt">${this.escapeHtml(card.excerpt || '')}</p>
                <a href="${card.link?.url || card.link || '#'}" class="content__card-link">
                  Lire la suite <span>→</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderSplitContent(data: ContentData): string {
    const sections = data.sections || [];
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        ${sections.map(section => `
          <div class="content__section">
            <div class="content__text">
              <h3>${this.escapeHtml(section.title)}</h3>
              <p>${section.content}</p>
              ${section.link ? `<a href="${section.link?.url || section.link}" class="content__link">${this.escapeHtml(section.link?.text || 'En savoir plus')} →</a>` : ''}
            </div>
            <div class="content__visual">
              ${section.image ? `<img src="${section.image?.url || section.image}" alt="${section.image?.alt || ''}">` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderAccordionTabs(data: ContentData): string {
    const tabs = data.tabs || [];
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__tabs">
          ${tabs.map((tab, index) => `
            <button class="content__tab ${index === 0 ? 'active' : ''}" data-tab="${index}">
              ${this.escapeHtml(tab.title)}
            </button>
          `).join('')}
        </div>
        
        <div class="content__panels">
          ${tabs.map((tab, index) => `
            <div class="content__panel ${index === 0 ? 'active' : ''}">
              <div>${tab.content}</div>
              
              ${tab.accordion && tab.accordion.length > 0 ? `
                <div class="content__accordion">
                  ${tab.accordion.map(item => `
                    <div class="content__accordion-item">
                      <div class="content__accordion-header">
                        <span>${this.escapeHtml(item.question)}</span>
                        <span>+</span>
                      </div>
                      <div class="content__accordion-content">
                        <div>${item.answer}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderComparisonTable(data: ContentData): string {
    const comparison = data.comparison || { headers: [], rows: [] };
    
    return `
      <div>
        <h1 class="content__title">${this.escapeHtml(data.title)}</h1>
        ${data.subtitle ? `<p class="content__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
        
        <div class="content__comparison">
          <table class="content__table">
            <thead>
              <tr>
                ${comparison.headers.map(header => `<th>${this.escapeHtml(header)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${comparison.rows.map(row => `
                <tr>
                  ${row.cells.map(cell => `
                    <td>
                      ${cell.badge ? `
                        <span class="content__badge content__badge--${cell.badge.type || 'info'}">
                          ${this.escapeHtml(cell.value)}
                        </span>
                      ` : this.escapeHtml(cell.value)}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private renderInteractiveStory(data: ContentData): string {
    const scenes = data.scenes || [];
    
    return `
      ${scenes.map((scene, index) => `
        <div class="content__scene ${index === 0 ? 'active' : ''}" id="scene-${index}">
          ${scene.background ? `
            <div class="content__scene-bg">
              <img src="${scene.background.url}" alt="${scene.background.alt || ''}">
            </div>
          ` : ''}
          <div class="content__scene-content">
            <h2 class="content__scene-title">${this.escapeHtml(scene.title)}</h2>
            <p class="content__scene-text">${scene.text}</p>
            
            ${scene.choices && scene.choices.length > 0 ? `
              <div class="content__choices">
                ${scene.choices.map(choice => `
                  <a href="#" class="content__choice" data-next-scene="scene-${choice.nextScene}">
                    ${this.escapeHtml(choice.text)}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    `;
  }

  private renderMeta(meta: any): string {
    return `
      <div class="content__meta">
        ${meta.author ? `<span class="content__author">Par ${this.escapeHtml(meta.author)}</span>` : ''}
        ${meta.date ? `<span class="content__date">${this.escapeHtml(meta.date)}</span>` : ''}
        ${meta.readingTime ? `<span class="content__reading-time">${meta.readingTime} min</span>` : ''}
      </div>
    `;
  }

  private renderSidebar(sidebar: any): string {
    return `
      ${sidebar.toc ? `
        <div class="content__widget">
          <h3 class="content__widget-title">Table des matières</h3>
          <ul class="content__toc"></ul>
        </div>
      ` : ''}
      
      ${sidebar.author ? `
        <div class="content__widget">
          <h3 class="content__widget-title">À propos de l'auteur</h3>
          <div class="content__author-bio">
            ${sidebar.author?.avatar ? `<img src="${sidebar.author.avatar}" alt="${sidebar.author?.name || 'Auteur'}" class="content__author-avatar">` : ''}
            <h4>${this.escapeHtml(sidebar.author?.name || 'Auteur')}</h4>
            <p>${this.escapeHtml(sidebar.author?.bio || '')}</p>
          </div>
        </div>
      ` : ''}
      
      ${sidebar.related && sidebar.related.length > 0 ? `
        <div class="content__widget">
          <h3 class="content__widget-title">Articles similaires</h3>
          <ul class="content__related">
            ${sidebar.related.map(item => `
              <li><a href="${item.link?.url || item.link || '#'}">${this.escapeHtml(item.title)}</a></li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    `;
  }

  private renderRichContent(content: string): string {
    // Add drop cap to first letter if magazine layout
    if (content.startsWith('<p>')) {
      const firstParagraph = content.substring(3);
      const firstLetter = firstParagraph.charAt(0);
      const rest = firstParagraph.substring(1);
      return `<p><span class="content__dropcap">${firstLetter}</span>${rest}`;
    }
    
    return content;
  }

  private generateCustomCSS(data: ContentData, theme: any): string {
    let css = '\n/* Custom Content Styles avec thème dynamique */\n';
    
    // Variables CSS du thème
    css += `:root {
      --content-primary: ${theme.primaryColor};
      --content-secondary: ${theme.secondaryColor};
      --content-text: ${theme.textColor};
      --content-text-secondary: ${theme.textSecondaryColor};
      --content-background: ${theme.backgroundColor};
      --content-surface: ${theme.surfaceColor};
      --content-border: ${theme.borderColor};
      --content-accent: ${theme.accentColor};
      --content-font-heading: ${theme.fontHeading};
      --content-font-body: ${theme.fontBody};
    }\n`;

    // Remplacer les variables var() dans le CSS par les variables du thème
    css += `
    /* Override des variables CSS pour utiliser le thème */
    .content {
      --primary: var(--content-primary);
      --secondary: var(--content-secondary);
      --text: var(--content-text);
      --text-secondary: var(--content-text-secondary);
      --background: var(--content-background);
      --surface: var(--content-surface);
      --border: var(--content-border);
      --accent: var(--content-accent);
      --font-heading: var(--content-font-heading);
      --font-body: var(--content-font-body);
    }\n`;
    
    // Couleurs personnalisées (override du thème si spécifié)
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.content {
        ${colors.primary ? `--content-primary: ${colors.primary};` : ''}
        ${colors.secondary ? `--content-secondary: ${colors.secondary};` : ''}
        ${colors.text ? `--content-text: ${colors.text};` : ''}
        ${colors.heading ? `--content-text: ${colors.heading};` : ''}
        ${colors.background ? `--content-background: ${colors.background};` : ''}
      }\n`;
    }

    // Typography personnalisée
    if (data.styles?.typography) {
      const typo = data.styles.typography;
      css += `.content {
        ${typo.fontFamily ? `--content-font-body: ${typo.fontFamily};` : ''}
        ${typo.fontSize ? `font-size: ${typo.fontSize};` : ''}
        ${typo.lineHeight ? `line-height: ${typo.lineHeight};` : ''}
      }\n`;
    }

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="content-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur Content:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    // Échappement HTML sans dépendance au DOM
    if (!text) return '';
    
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };
    
    return text.replace(/[&<>"'\/]/g, (char) => escapeMap[char] || char);
  }
}

export const contentRendererV3PerfectEnhanced = new ContentRendererV3PerfectEnhanced();
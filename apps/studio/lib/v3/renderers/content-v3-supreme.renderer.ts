/**
 * Content Renderer V3 SUPREME - La version ULTIME avec éditeur visuel complet
 * Inspiré de WordPress, Elementor et Divi
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { contentDataSchema, contentDefaults, type ContentData } from '../schemas/blocks/content';
import { logger } from '../core/logger';

export class ContentRendererV3Supreme extends BaseRendererV3<ContentData> {
  type = 'content-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContentRendererV3Supreme', 'constructor', '🚀 Initialisation du renderer Content V3 SUPREME avec éditeur visuel complet');
  }

  validate(data: unknown): z.SafeParseReturnType<ContentData, ContentData> {
    return contentDataSchema.safeParse(data);
  }

  getDefaultData(): ContentData {
    return contentDefaults;
  }

  /**
   * Configuration COMPLÈTE en FRANÇAIS avec éditeur visuel
   */
  getBlockProps(): BlockProp[] {
    return [
      // === GROUPE : Style visuel ===
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Style visuel',
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel du bloc',
        options: ['modern', 'minimal', 'bold', 'elegant'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'modern', label: '✨ Moderne - Dégradés et ombres douces' },
            { value: 'minimal', label: '⚡ Minimaliste - Épuré et élégant' },
            { value: 'bold', label: '💪 Impact - Contrastes forts' },
            { value: 'elegant', label: '👑 Élégant - Raffiné et sophistiqué' }
          ],
          group: '🎨 Style',
          order: 1
        }
      },
      
      // === GROUPE : En-tête ===
      {
        name: 'showTitle',
        type: PropType.BOOLEAN,
        label: 'Afficher le titre principal',
        defaultValue: true,
        description: 'Active ou désactive le titre de la section',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '📝 En-tête',
          order: 1
        }
      },
      
      {
        name: 'title',
        type: PropType.STRING,
        label: 'Titre principal',
        required: false,
        defaultValue: 'Notre Expertise',
        description: 'Le titre qui apparaît en haut de la section',
        editorConfig: {
          control: EditorControl.TEXT,
          condition: { prop: 'showTitle', value: true },
          placeholder: 'Entrez votre titre ici...',
          group: '📝 En-tête',
          order: 2
        }
      },
      
      {
        name: 'titleSize',
        type: PropType.SELECT,
        label: 'Taille du titre',
        defaultValue: 'default',
        options: ['small', 'default', 'large', 'huge'],
        editorConfig: {
          control: EditorControl.SELECT,
          condition: { prop: 'showTitle', value: true },
          options: [
            { value: 'small', label: 'Petit' },
            { value: 'default', label: 'Normal' },
            { value: 'large', label: 'Grand' },
            { value: 'huge', label: 'Très grand' }
          ],
          group: '📝 En-tête',
          order: 3
        }
      },
      
      {
        name: 'showSubtitle',
        type: PropType.BOOLEAN,
        label: 'Afficher le sous-titre',
        defaultValue: true,
        description: 'Active ou désactive le sous-titre',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '📝 En-tête',
          order: 4
        }
      },
      
      {
        name: 'subtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        required: false,
        defaultValue: 'Des années d\'expérience à votre service',
        description: 'Texte d\'accroche sous le titre principal',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          condition: { prop: 'showSubtitle', value: true },
          placeholder: 'Décrivez brièvement votre service...',
          group: '📝 En-tête',
          order: 5
        }
      },
      
      // === GROUPE : Mise en page ===
      {
        name: 'contentLayout',
        type: PropType.SELECT,
        label: 'Disposition du contenu',
        defaultValue: 'text-right',
        description: 'Comment organiser le texte et l\'image',
        options: ['text-only', 'text-left', 'text-right', 'text-top', 'text-bottom', 'text-center'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'text-only', label: '📝 Texte seul', icon: '⬜' },
            { value: 'text-left', label: '⬅️ Texte à gauche', icon: '◧' },
            { value: 'text-right', label: '➡️ Texte à droite', icon: '◨' },
            { value: 'text-top', label: '⬆️ Texte en haut', icon: '⬒' },
            { value: 'text-bottom', label: '⬇️ Texte en bas', icon: '⬓' },
            { value: 'text-center', label: '🎯 Centré', icon: '⬜' }
          ],
          group: '📐 Mise en page',
          order: 1
        }
      },
      
      {
        name: 'containerWidth',
        type: PropType.SELECT,
        label: 'Largeur du conteneur',
        defaultValue: 'normal',
        options: ['full', 'wide', 'normal', 'narrow'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'full', label: 'Pleine largeur' },
            { value: 'wide', label: 'Large (1400px)' },
            { value: 'normal', label: 'Normal (1200px)' },
            { value: 'narrow', label: 'Étroit (800px)' }
          ],
          group: '📐 Mise en page',
          order: 2
        }
      },
      
      {
        name: 'contentAlign',
        type: PropType.SELECT,
        label: 'Alignement du texte',
        defaultValue: 'left',
        options: ['left', 'center', 'right', 'justify'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'left', label: 'Gauche', icon: '⬛⬜⬜' },
            { value: 'center', label: 'Centré', icon: '⬜⬛⬜' },
            { value: 'right', label: 'Droite', icon: '⬜⬜⬛' },
            { value: 'justify', label: 'Justifié', icon: '⬛⬛⬛' }
          ],
          group: '📐 Mise en page',
          order: 3
        }
      },
      
      // === GROUPE : Contenu principal avec ÉDITEUR VISUEL ===
      {
        name: 'richContent',
        type: PropType.STRING,
        label: 'Contenu principal',
        required: false,
        defaultValue: `<h2>Un service d'exception</h2>
<p>Créez votre contenu facilement avec notre éditeur visuel. Cliquez sur les boutons pour formater votre texte sans écrire de code !</p>
<ul>
  <li><strong>Simple</strong> - Pas besoin de connaître le HTML</li>
  <li><strong>Puissant</strong> - Toutes les options de formatage</li>
  <li><strong>Visuel</strong> - Voyez le résultat en temps réel</li>
</ul>
<p>Essayez dès maintenant en sélectionnant du texte et en utilisant la barre d'outils !</p>`,
        description: 'Utilisez l\'éditeur visuel pour créer votre contenu',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: '✏️ Contenu',
          order: 1,
          // Configuration de l'éditeur visuel COMPLET
          visualEditor: {
            enabled: true,
            toolbar: [
              // Ligne 1 : Formats et styles de base
              {
                type: 'toolbar-row',
                items: [
                  {
                    type: 'format-select',
                    label: 'Format',
                    options: [
                      { value: 'p', label: 'Paragraphe', shortcut: 'Alt+Shift+7' },
                      { value: 'h1', label: 'Titre 1', shortcut: 'Alt+Shift+1' },
                      { value: 'h2', label: 'Titre 2', shortcut: 'Alt+Shift+2' },
                      { value: 'h3', label: 'Titre 3', shortcut: 'Alt+Shift+3' },
                      { value: 'h4', label: 'Titre 4', shortcut: 'Alt+Shift+4' },
                      { value: 'blockquote', label: 'Citation' },
                      { value: 'pre', label: 'Code' }
                    ]
                  },
                  { type: 'separator' },
                  { type: 'button', action: 'bold', icon: 'B', tooltip: 'Gras (Ctrl+B)', className: 'bold' },
                  { type: 'button', action: 'italic', icon: 'I', tooltip: 'Italique (Ctrl+I)', className: 'italic' },
                  { type: 'button', action: 'underline', icon: 'U', tooltip: 'Souligné (Ctrl+U)', className: 'underline' },
                  { type: 'button', action: 'strikethrough', icon: 'S', tooltip: 'Barré', className: 'strike' },
                  { type: 'separator' },
                  { type: 'button', action: 'link', icon: '🔗', tooltip: 'Insérer/modifier un lien (Ctrl+K)' },
                  { type: 'button', action: 'unlink', icon: '🔗', tooltip: 'Supprimer le lien', className: 'unlink' },
                  { type: 'button', action: 'image', icon: '🖼️', tooltip: 'Insérer une image' },
                  { type: 'separator' },
                  { type: 'color-picker', action: 'text-color', icon: 'A', tooltip: 'Couleur du texte' },
                  { type: 'color-picker', action: 'bg-color', icon: '🎨', tooltip: 'Couleur de fond' }
                ]
              },
              // Ligne 2 : Listes, alignement et autres
              {
                type: 'toolbar-row',
                items: [
                  { type: 'button', action: 'bullet-list', icon: '• •', tooltip: 'Liste à puces' },
                  { type: 'button', action: 'number-list', icon: '1.', tooltip: 'Liste numérotée' },
                  { type: 'separator' },
                  { type: 'button', action: 'align-left', icon: '⬛⬜⬜', tooltip: 'Aligner à gauche' },
                  { type: 'button', action: 'align-center', icon: '⬜⬛⬜', tooltip: 'Centrer' },
                  { type: 'button', action: 'align-right', icon: '⬜⬜⬛', tooltip: 'Aligner à droite' },
                  { type: 'button', action: 'align-justify', icon: '⬛⬛⬛', tooltip: 'Justifier' },
                  { type: 'separator' },
                  { type: 'button', action: 'outdent', icon: '←', tooltip: 'Diminuer le retrait' },
                  { type: 'button', action: 'indent', icon: '→', tooltip: 'Augmenter le retrait' },
                  { type: 'separator' },
                  { type: 'button', action: 'table', icon: '⊞', tooltip: 'Insérer un tableau' },
                  { type: 'button', action: 'hr', icon: '—', tooltip: 'Ligne horizontale' },
                  { type: 'separator' },
                  { type: 'button', action: 'undo', icon: '↶', tooltip: 'Annuler (Ctrl+Z)' },
                  { type: 'button', action: 'redo', icon: '↷', tooltip: 'Rétablir (Ctrl+Y)' },
                  { type: 'separator' },
                  { type: 'button', action: 'fullscreen', icon: '⛶', tooltip: 'Plein écran' },
                  { type: 'button', action: 'code-view', icon: '</>', tooltip: 'Voir le code HTML' }
                ]
              }
            ],
            // Éléments rapides à insérer
            quickInsert: [
              { label: '📊 Bloc statistiques', action: 'insert-stats', template: '<div class="stats-block"><div class="stat"><span class="number">98%</span><span class="label">Satisfaction</span></div></div>' },
              { label: '💬 Citation élégante', action: 'insert-quote', template: '<blockquote class="elegant-quote">"Votre citation ici..."<cite>— Auteur</cite></blockquote>' },
              { label: '✅ Liste de points forts', action: 'insert-checklist', template: '<ul class="checklist"><li>Point fort 1</li><li>Point fort 2</li><li>Point fort 3</li></ul>' },
              { label: '🎯 Bouton d\'action', action: 'insert-button', template: '<a href="#" class="btn btn-primary">Cliquez ici</a>' },
              { label: '⚡ Alerte info', action: 'insert-alert', template: '<div class="alert alert-info">Information importante</div>' },
              { label: '🎨 Colonnes 2x', action: 'insert-columns', template: '<div class="columns-2"><div class="column">Colonne 1</div><div class="column">Colonne 2</div></div>' }
            ],
            // Options de l'éditeur
            options: {
              height: '500px',
              placeholder: 'Commencez à écrire ou utilisez la barre d\'outils...',
              autosave: true,
              autosaveInterval: 30000,
              spellcheck: true,
              visualBlocks: true,
              resizable: true,
              statusbar: true
            }
          }
        }
      },
      
      // === GROUPE : Image ===
      {
        name: 'showMedia',
        type: PropType.BOOLEAN,
        label: 'Ajouter une image',
        defaultValue: true,
        description: 'Afficher une image avec votre contenu',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '🖼️ Image',
          order: 1
        }
      },
      
      {
        name: 'mediaUrl',
        type: PropType.STRING,
        label: 'Image',
        required: false,
        defaultValue: '',
        description: 'Cliquez pour sélectionner ou uploader une image',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          condition: { prop: 'showMedia', value: true },
          placeholder: 'Aucune image sélectionnée',
          group: '🖼️ Image',
          order: 2
        }
      },
      
      {
        name: 'mediaAlt',
        type: PropType.STRING,
        label: 'Description de l\'image (SEO)',
        required: false,
        defaultValue: '',
        description: 'Important pour l\'accessibilité et le référencement',
        editorConfig: {
          control: EditorControl.TEXT,
          condition: { prop: 'showMedia', value: true },
          placeholder: 'Ex: Photo de notre équipe au travail',
          group: '🖼️ Image',
          order: 3
        }
      },
      
      {
        name: 'mediaSize',
        type: PropType.SELECT,
        label: 'Taille de l\'image',
        defaultValue: 'medium',
        options: ['small', 'medium', 'large', 'full'],
        editorConfig: {
          control: EditorControl.SELECT,
          condition: { prop: 'showMedia', value: true },
          options: [
            { value: 'small', label: 'Petite (300px)', icon: '▫' },
            { value: 'medium', label: 'Moyenne (500px)', icon: '◽' },
            { value: 'large', label: 'Grande (700px)', icon: '◻' },
            { value: 'full', label: 'Pleine largeur', icon: '⬜' }
          ],
          group: '🖼️ Image',
          order: 4
        }
      },
      
      {
        name: 'mediaStyle',
        type: PropType.SELECT,
        label: 'Style de l\'image',
        defaultValue: 'rounded',
        options: ['none', 'rounded', 'circle', 'shadow', 'border'],
        editorConfig: {
          control: EditorControl.SELECT,
          condition: { prop: 'showMedia', value: true },
          options: [
            { value: 'none', label: 'Sans style' },
            { value: 'rounded', label: 'Coins arrondis' },
            { value: 'circle', label: 'Cercle' },
            { value: 'shadow', label: 'Avec ombre' },
            { value: 'border', label: 'Avec bordure' }
          ],
          group: '🖼️ Image',
          order: 5
        }
      },
      
      // === GROUPE : Couleurs personnalisées ===
      {
        name: 'useCustomColors',
        type: PropType.BOOLEAN,
        label: 'Personnaliser les couleurs',
        defaultValue: false,
        description: 'Remplacer les couleurs du thème par vos propres couleurs',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '🎨 Couleurs',
          order: 1
        }
      },
      
      {
        name: 'customBackground',
        type: PropType.COLOR,
        label: 'Couleur de fond',
        required: false,
        defaultValue: '',
        description: 'Couleur de fond de toute la section',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: '🎨 Couleurs',
          order: 2
        }
      },
      
      {
        name: 'customTitleColor',
        type: PropType.COLOR,
        label: 'Couleur du titre',
        required: false,
        defaultValue: '',
        description: 'Couleur du titre principal',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: '🎨 Couleurs',
          order: 3
        }
      },
      
      {
        name: 'customTextColor',
        type: PropType.COLOR,
        label: 'Couleur du texte',
        required: false,
        defaultValue: '',
        description: 'Couleur du texte principal',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: '🎨 Couleurs',
          order: 4
        }
      },
      
      {
        name: 'customHeadingColor',
        type: PropType.COLOR,
        label: 'Couleur des titres',
        required: false,
        defaultValue: '',
        description: 'Couleur des titres H1, H2, H3, H4 dans le contenu (par défaut: couleur du thème)',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: '🎨 Couleurs',
          order: 5,
          helpText: 'Les titres utilisent automatiquement la couleur primaire du thème si non définie'
        }
      },
      
      {
        name: 'customAccentColor',
        type: PropType.COLOR,
        label: 'Couleur d\'accent',
        required: false,
        defaultValue: '',
        description: 'Couleur pour les liens, boutons et éléments interactifs',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: '🎨 Couleurs',
          order: 6
        }
      },
      
      // === GROUPE : Options avancées ===
      {
        name: 'enableAnimation',
        type: PropType.BOOLEAN,
        label: 'Activer les animations',
        defaultValue: true,
        description: 'Animations douces au défilement',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: '⚙️ Avancé',
          order: 1
        }
      },
      
      {
        name: 'spacing',
        type: PropType.SELECT,
        label: 'Espacement',
        defaultValue: 'normal',
        options: ['compact', 'normal', 'relaxed', 'spacious'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'compact', label: 'Compact' },
            { value: 'normal', label: 'Normal' },
            { value: 'relaxed', label: 'Aéré' },
            { value: 'spacious', label: 'Très espacé' }
          ],
          group: '⚙️ Avancé',
          order: 2
        }
      }
    ];
  }

  render(data: ContentData, context?: RenderContext): RenderResult {
    try {
      const customData = data as any;
      
      // Extraire le thème
      const theme = context?.theme;
      const colors = {
        primary: theme?.colors?.primary || '#667eea',
        secondary: theme?.colors?.secondary || '#764ba2',
        text: theme?.colors?.text || '#1a202c',
        textSecondary: theme?.colors?.secondary || '#718096',
        background: theme?.colors?.background || '#ffffff',
        surface: '#f7fafc',
        border: '#e2e8f0',
        accent: theme?.colors?.accent || theme?.colors?.primary || '#667eea'
      };

      // Extraire toutes les propriétés
      const props = {
        visualVariant: customData.visualVariant || 'modern',
        showTitle: customData.showTitle !== false,
        title: customData.title || 'Notre Expertise',
        titleSize: customData.titleSize || 'default',
        showSubtitle: customData.showSubtitle !== false,
        subtitle: customData.subtitle || '',
        contentLayout: customData.contentLayout || 'text-right',
        containerWidth: customData.containerWidth || 'normal',
        contentAlign: customData.contentAlign || 'left',
        richContent: customData.richContent || customData.mainContent || '<p>Contenu par défaut</p>',
        showMedia: customData.showMedia !== false,
        mediaUrl: customData.mediaUrl || '',
        mediaAlt: customData.mediaAlt || '',
        mediaSize: customData.mediaSize || 'medium',
        mediaStyle: customData.mediaStyle || 'rounded',
        useCustomColors: customData.useCustomColors || false,
        customBackground: customData.customBackground || '',
        customTitleColor: customData.customTitleColor || '',
        customTextColor: customData.customTextColor || '',
        customHeadingColor: customData.customHeadingColor || '',
        customAccentColor: customData.customAccentColor || '',
        enableAnimation: customData.enableAnimation !== false,
        spacing: customData.spacing || 'normal'
      };

      // Générer le HTML
      const html = this.renderContent(props);
      
      // CSS avec couleurs personnalisées FONCTIONNELLES
      const css = this.getDefaultCSS() + this.generateCustomCSS(props, colors);
      
      // JavaScript pour l'éditeur visuel
      const js = this.getDefaultJS();

      return {
        html,
        css,
        js,
        assets: [],
        errors: [],
        warnings: []
      };

    } catch (error) {
      logger.error('ContentRendererV3Supreme', 'render', 'Erreur lors du rendu', error);
      return {
        html: '<div class="content-error">Erreur de rendu</div>',
        css: '',
        js: '',
        assets: [],
        errors: [{ 
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          blockId: 'content',
          fallbackUsed: false
        }],
        warnings: []
      };
    }
  }

  private renderContent(props: any): string {
    const {
      visualVariant,
      showTitle,
      title,
      titleSize,
      showSubtitle,
      subtitle,
      contentLayout,
      containerWidth,
      contentAlign,
      richContent,
      showMedia,
      mediaUrl,
      mediaAlt,
      mediaSize,
      mediaStyle,
      enableAnimation,
      spacing,
      useCustomColors
    } = props;

    // Classes CSS avec couleurs personnalisées
    const contentClasses = [
      'content',
      `content--visual-${visualVariant}`,
      `content--layout-${contentLayout}`,
      `content--align-${contentAlign}`,
      `content--spacing-${spacing}`,
      enableAnimation ? 'content--animated' : '',
      useCustomColors ? 'content--custom-colors' : ''
    ].filter(Boolean).join(' ');

    const needsGrid = contentLayout !== 'text-only' && contentLayout !== 'text-center' && showMedia && mediaUrl;

    return `
      <section class="${contentClasses}" data-content-variant="${visualVariant}">
        <div class="content__wrapper">
          <div class="content__container content__container--${containerWidth}">
            ${(showTitle || showSubtitle) ? `
              <div class="content__header">
                ${showTitle ? `<h1 class="content__title content__title--${titleSize}">${this.escapeHtml(title)}</h1>` : ''}
                ${showSubtitle ? `<p class="content__subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
              </div>
            ` : ''}
            
            <div class="content__body">
              ${needsGrid ? `
                <div class="content__grid">
                  ${this.renderContentArea(richContent, contentAlign)}
                  ${this.renderMediaArea(mediaUrl, mediaAlt, mediaSize, mediaStyle)}
                </div>
              ` : `
                ${contentLayout === 'text-center' && showMedia && mediaUrl ? this.renderMediaArea(mediaUrl, mediaAlt, mediaSize, mediaStyle) : ''}
                ${this.renderContentArea(richContent, contentAlign)}
              `}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderContentArea(content: string, align: string): string {
    return `
      <div class="content__text-area">
        <div class="content__rich-text content__rich-text--align-${align}">
          ${content}
        </div>
      </div>
    `;
  }

  private renderMediaArea(url: string, alt: string, size: string, style: string): string {
    if (!url) return '';
    
    return `
      <div class="content__media-area">
        <div class="content__media content__media--${size} content__media--${style}">
          <img 
            src="${url}" 
            alt="${this.escapeHtml(alt)}" 
            loading="lazy"
            class="content__image"
          />
        </div>
      </div>
    `;
  }

  private generateCustomCSS(props: any, themeColors: any): string {
    const {
      useCustomColors,
      customBackground,
      customTitleColor,
      customTextColor,
      customHeadingColor,
      customAccentColor
    } = props;

    let css = `
/* ========================================
   CONTENT V3 SUPREME - Variables CSS
   ======================================== */
.content {
  /* Couleurs du thème par défaut */
  --content-primary: ${themeColors.primary};
  --content-secondary: ${themeColors.secondary};
  --content-text: ${themeColors.text};
  --content-text-secondary: ${themeColors.textSecondary};
  --content-background: ${themeColors.background};
  --content-surface: ${themeColors.surface};
  --content-border: ${themeColors.border};
  --content-accent: ${themeColors.accent};
  
  /* Variables utilisées dans le CSS */
  --bg-color: transparent;
  --title-color: ${themeColors.text};
  --text-color: ${themeColors.text};
  --heading-color: ${themeColors.primary}; /* Les titres H1-H6 utilisent la couleur primaire */
  --accent-color: ${themeColors.primary};
  --link-color: ${themeColors.primary};
}
`;

    // Appliquer les couleurs personnalisées SI activées
    if (useCustomColors) {
      css += `
/* Couleurs personnalisées activées */
.content--custom-colors {
  ${customBackground ? `--bg-color: ${customBackground} !important;` : ''}
  ${customTitleColor ? `--title-color: ${customTitleColor} !important;` : ''}
  ${customTextColor ? `--text-color: ${customTextColor} !important;` : ''}
  ${customHeadingColor ? `--heading-color: ${customHeadingColor} !important;` : ''}
  ${customAccentColor ? `
    --accent-color: ${customAccentColor} !important;
    --link-color: ${customAccentColor} !important;
  ` : ''}
}

/* Application forcée des couleurs personnalisées avec sélecteurs plus spécifiques */
${customBackground ? `
  .content--custom-colors { 
    background-color: ${customBackground} !important; 
  }
  .content--custom-colors .content__wrapper {
    background-color: transparent !important;
  }
` : ''}

${customTitleColor ? `
  .content--custom-colors .content__title { 
    color: ${customTitleColor} !important;
    -webkit-text-fill-color: ${customTitleColor} !important;
  }
` : ''}

${customTextColor ? `
  .content--custom-colors .content__subtitle,
  .content--custom-colors .content__description,
  .content--custom-colors .content__rich-text,
  .content--custom-colors .content__rich-text p,
  .content--custom-colors .content__rich-text div,
  .content--custom-colors .content__rich-text span,
  .content--custom-colors .content__rich-text li,
  .content--custom-colors .content__rich-text td,
  .content--custom-colors .content__rich-text th { 
    color: ${customTextColor} !important; 
  }
` : ''}

${customHeadingColor ? `
  .content--custom-colors .content__rich-text h1,
  .content--custom-colors .content__rich-text h2,
  .content--custom-colors .content__rich-text h3,
  .content--custom-colors .content__rich-text h4,
  .content--custom-colors .content__rich-text h5,
  .content--custom-colors .content__rich-text h6,
  .content--custom-colors .content__rich-text strong,
  .content--custom-colors .content__rich-text b { 
    color: ${customHeadingColor} !important; 
  }
` : ''}

${customAccentColor ? `
  .content--custom-colors .content__rich-text a { 
    color: ${customAccentColor} !important; 
    border-bottom-color: ${customAccentColor} !important;
  }
  .content--custom-colors .content__rich-text a:hover { 
    color: ${customAccentColor} !important;
    opacity: 0.8;
  }
  .content--custom-colors .btn,
  .content--custom-colors .btn-primary,
  .content--custom-colors button { 
    background-color: ${customAccentColor} !important;
    border-color: ${customAccentColor} !important;
  }
  .content--custom-colors .content__rich-text blockquote {
    border-left-color: ${customAccentColor} !important;
  }
  .content--custom-colors .stats-block .number {
    color: ${customAccentColor} !important;
  }
  .content--custom-colors .checklist li::before {
    background-color: ${customAccentColor} !important;
  }
` : ''}
`;
    }

    return css;
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CONTENT V3 SUPREME - Styles ultimes
   ======================================== */

.content {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-color);
  font-family: var(--font-body, 'Inter', system-ui, sans-serif);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.content__wrapper {
  position: relative;
  z-index: 1;
}

/* Spacing variants */
.content--spacing-compact { padding: 3rem 0; }
.content--spacing-normal { padding: 5rem 0; }
.content--spacing-relaxed { padding: 7rem 0; }
.content--spacing-spacious { padding: 10rem 0; }

/* Container widths */
.content__container {
  margin: 0 auto;
  padding: 0 2rem;
}

.content__container--full { max-width: 100%; }
.content__container--wide { max-width: 1400px; }
.content__container--normal { max-width: 1200px; }
.content__container--narrow { max-width: 800px; }

/* ========================================
   HEADER
   ======================================== */
.content__header {
  margin-bottom: 3rem;
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out forwards;
}

.content__title {
  font-family: var(--font-heading, 'Inter', system-ui, sans-serif);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  color: var(--title-color);
  transition: all 0.3s ease;
}

/* Title sizes */
.content__title--small { font-size: clamp(1.875rem, 4vw, 2.5rem); }
.content__title--default { font-size: clamp(2.5rem, 5vw, 3.5rem); }
.content__title--large { font-size: clamp(3rem, 6vw, 4.5rem); }
.content__title--huge { font-size: clamp(3.5rem, 7vw, 5.5rem); }

.content__subtitle {
  font-family: var(--font-body, 'Inter', system-ui, sans-serif);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
}

/* ========================================
   LAYOUTS
   ======================================== */
.content__body {
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out 0.2s forwards;
}

.content__grid {
  display: grid;
  gap: 4rem;
  align-items: center;
}

/* Layout variations */
.content--layout-text-only .content__text-area {
  max-width: 800px;
  margin: 0 auto;
}

.content--layout-text-left .content__grid {
  grid-template-columns: 1fr auto;
}

.content--layout-text-right .content__grid {
  grid-template-columns: auto 1fr;
}
.content--layout-text-right .content__media-area {
  order: -1;
}

.content--layout-text-top .content__grid,
.content--layout-text-bottom .content__grid {
  grid-template-columns: 1fr;
}

.content--layout-text-bottom .content__media-area {
  order: -1;
}

.content--layout-text-center {
  text-align: center;
}
.content--layout-text-center .content__header {
  text-align: center;
}
.content--layout-text-center .content__media-area {
  margin: 0 auto 3rem;
}

/* ========================================
   RICH TEXT STYLES
   ======================================== */
.content__rich-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-color);
}

/* Text alignment */
.content__rich-text--align-left { text-align: left; }
.content__rich-text--align-center { text-align: center; }
.content__rich-text--align-right { text-align: right; }
.content__rich-text--align-justify { text-align: justify; }

/* Headings - Utilisent la couleur du thème par défaut */
.content__rich-text h1,
.content__rich-text h2,
.content__rich-text h3,
.content__rich-text h4,
.content__rich-text h5,
.content__rich-text h6 {
  font-family: var(--font-heading, 'Inter', system-ui, sans-serif);
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--content-primary); /* Utilise la couleur primaire du thème */
  transition: color 0.3s ease;
}

.content__rich-text h1 { font-size: 2.5rem; }
.content__rich-text h2 { font-size: 2rem; }
.content__rich-text h3 { font-size: 1.5rem; }
.content__rich-text h4 { font-size: 1.25rem; }

.content__rich-text h1:first-child,
.content__rich-text h2:first-child,
.content__rich-text h3:first-child,
.content__rich-text h4:first-child {
  margin-top: 0;
}

/* Paragraphs and lists */
.content__rich-text p {
  margin: 0 0 1.5rem;
  color: var(--text-color);
}

.content__rich-text ul,
.content__rich-text ol {
  margin: 0 0 1.5rem;
  padding-left: 2rem;
  color: var(--text-color);
}

.content__rich-text li {
  margin: 0.5rem 0;
  line-height: 1.7;
}

/* Text styles - Strong utilise aussi la couleur primaire du thème */
.content__rich-text strong,
.content__rich-text b {
  font-weight: 700;
  color: var(--content-primary); /* Utilise la couleur primaire du thème */
}

.content__rich-text em,
.content__rich-text i {
  font-style: italic;
}

.content__rich-text u {
  text-decoration: underline;
  text-decoration-color: var(--accent-color);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}

.content__rich-text s,
.content__rich-text del {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Links */
.content__rich-text a {
  color: var(--link-color);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.content__rich-text a:hover {
  border-bottom-color: var(--link-color);
  opacity: 0.8;
}

/* Blockquotes */
.content__rich-text blockquote {
  position: relative;
  margin: 2rem 0;
  padding: 2rem 3rem;
  background: linear-gradient(135deg, 
    rgba(var(--content-surface), 0.5),
    rgba(var(--content-background), 0.5)
  );
  border-left: 4px solid var(--accent-color);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--heading-color);
  border-radius: 0.5rem;
}

.content__rich-text blockquote::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1.5rem;
  font-size: 4rem;
  font-weight: 900;
  color: var(--accent-color);
  opacity: 0.3;
  font-family: Georgia, serif;
}

.content__rich-text blockquote cite {
  display: block;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-style: normal;
  color: var(--text-color);
  opacity: 0.8;
}

/* Special blocks from editor */
.stats-block {
  display: flex;
  gap: 3rem;
  margin: 2rem 0;
  justify-content: center;
  text-align: center;
}

.stats-block .stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stats-block .number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--accent-color);
  line-height: 1;
}

.stats-block .label {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
}

.elegant-quote {
  text-align: center;
  font-size: 1.5rem;
  max-width: 800px;
  margin: 3rem auto;
}

.checklist {
  list-style: none;
  padding-left: 0;
}

.checklist li {
  position: relative;
  padding-left: 2rem;
}

.checklist li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--accent-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.alert-info {
  background: rgba(var(--content-primary), 0.1);
  border-left: 4px solid var(--content-primary);
  color: var(--text-color);
}

.columns-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

/* ========================================
   MEDIA STYLES
   ======================================== */
.content__media {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

/* Media sizes */
.content__media--small { max-width: 300px; }
.content__media--medium { max-width: 500px; }
.content__media--large { max-width: 700px; }
.content__media--full { max-width: 100%; }

/* Media styles */
.content__media--none { border-radius: 0; }
.content__media--rounded { border-radius: 1rem; }
.content__media--circle {
  border-radius: 50%;
  aspect-ratio: 1;
}
.content__media--circle .content__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content__media--shadow {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}
.content__media--border {
  border: 8px solid white;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
}

.content__image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.6s ease;
}

.content__media:hover .content__image {
  transform: scale(1.05);
}

/* ========================================
   VISUAL VARIANTS
   ======================================== */

/* Modern */
.content--visual-modern {
  background: linear-gradient(135deg, 
    rgba(var(--content-primary), 0.02) 0%, 
    var(--bg-color, transparent) 50%
  );
}

.content--visual-modern .content__title {
  background: linear-gradient(135deg, var(--content-primary), var(--content-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Désactiver le gradient si couleur personnalisée */
.content--custom-colors.content--visual-modern .content__title {
  background: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
}

/* Minimal */
.content--visual-minimal .content__title {
  font-weight: 300;
  letter-spacing: -0.02em;
}

.content--visual-minimal .content__media {
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.content--visual-minimal .content__media:hover {
  filter: grayscale(0%);
}

/* Bold */
.content--visual-bold {
  background: var(--content-text);
  color: var(--content-background);
}

.content--visual-bold .content__title,
.content--visual-bold .content__subtitle,
.content--visual-bold .content__rich-text,
.content--visual-bold .content__rich-text * {
  color: var(--content-background) !important;
}

.content--visual-bold .content__title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

/* Elegant */
.content--visual-elegant .content__header {
  text-align: center;
}

.content--visual-elegant .content__title {
  font-weight: 400;
  position: relative;
  display: inline-block;
}

.content--visual-elegant .content__title::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: var(--accent-color);
}

/* ========================================
   ANIMATIONS
   ======================================== */
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

.content--animated .content__rich-text > * {
  opacity: 0;
  animation: contentFadeUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s + 0.3s);
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 768px) {
  .content--spacing-compact { padding: 2rem 0; }
  .content--spacing-normal { padding: 3rem 0; }
  .content--spacing-relaxed { padding: 4rem 0; }
  .content--spacing-spacious { padding: 5rem 0; }
  
  .content__container {
    padding: 0 1rem;
  }
  
  .content__grid {
    grid-template-columns: 1fr !important;
    gap: 2rem;
  }
  
  .content__media-area {
    order: -1 !important;
  }
  
  .content__title--small { font-size: 1.75rem; }
  .content__title--default { font-size: 2rem; }
  .content__title--large { font-size: 2.5rem; }
  .content__title--huge { font-size: 3rem; }
  
  .columns-2 {
    grid-template-columns: 1fr;
  }
  
  .stats-block {
    flex-direction: column;
    gap: 2rem;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Content V3 Supreme - JavaScript avec éditeur visuel
(function() {
  'use strict';
  
  class ContentV3Supreme {
    constructor() {
      this.init();
    }
    
    init() {
      this.initAnimations();
      this.initRichTextEnhancements();
      this.initVisualEditor();
    }
    
    // Animations au scroll
    initAnimations() {
      const contents = document.querySelectorAll('.content--animated');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.content__rich-text > *');
            elements.forEach((el, i) => {
              el.style.setProperty('--index', i);
            });
            
            entry.target.classList.add('content--in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      contents.forEach(content => observer.observe(content));
    }
    
    // Améliorations du texte riche
    initRichTextEnhancements() {
      // Smooth scroll pour les ancres
      document.querySelectorAll('.content__rich-text a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
      
      // Liens externes
      document.querySelectorAll('.content__rich-text a[href^="http"]').forEach(link => {
        if (link.hostname !== window.location.hostname) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
    
    // ÉDITEUR VISUEL (simulation pour la démo)
    initVisualEditor() {
      // Cette partie serait intégrée avec PropertyControls.tsx
      // pour créer un vrai éditeur visuel
      
      // Simulation des actions de l'éditeur
      window.ContentEditorActions = {
        // Formatage de base
        bold: () => document.execCommand('bold'),
        italic: () => document.execCommand('italic'),
        underline: () => document.execCommand('underline'),
        strikethrough: () => document.execCommand('strikeThrough'),
        
        // Formats de bloc
        formatBlock: (tag) => document.execCommand('formatBlock', false, tag),
        
        // Listes
        insertUnorderedList: () => document.execCommand('insertUnorderedList'),
        insertOrderedList: () => document.execCommand('insertOrderedList'),
        
        // Alignement
        justifyLeft: () => document.execCommand('justifyLeft'),
        justifyCenter: () => document.execCommand('justifyCenter'),
        justifyRight: () => document.execCommand('justifyRight'),
        justifyFull: () => document.execCommand('justifyFull'),
        
        // Indentation
        indent: () => document.execCommand('indent'),
        outdent: () => document.execCommand('outdent'),
        
        // Insertion
        createLink: (url) => {
          const selection = window.getSelection();
          if (!selection.toString()) {
            alert('Sélectionnez du texte pour créer un lien');
            return;
          }
          document.execCommand('createLink', false, url);
        },
        
        insertImage: (url) => {
          document.execCommand('insertImage', false, url);
        },
        
        insertHTML: (html) => {
          document.execCommand('insertHTML', false, html);
        },
        
        // Couleurs
        foreColor: (color) => document.execCommand('foreColor', false, color),
        backColor: (color) => document.execCommand('backColor', false, color),
        
        // Annuler/Refaire
        undo: () => document.execCommand('undo'),
        redo: () => document.execCommand('redo'),
        
        // Nettoyer le formatage
        removeFormat: () => document.execCommand('removeFormat')
      };
    }
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ContentV3Supreme());
  } else {
    new ContentV3Supreme();
  }
  
  // Export pour usage externe
  window.ContentV3Supreme = ContentV3Supreme;
})();
    `;
  }

  private escapeHtml(text: string): string {
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

  renderPreview(data: ContentData): string {
    return this.render(data).html;
  }

  getRequiredAssets(): any[] {
    return [];
  }
}

export const contentRendererV3Supreme = new ContentRendererV3Supreme();
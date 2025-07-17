/**
 * Content Renderer V3 ULTIMATE - Version finale avec toutes les améliorations
 * - Éditeur visuel complet
 * - Personnalisation totale des couleurs
 * - Layouts flexibles
 * - Harmonie parfaite avec le thème
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { contentDataSchema, contentDefaults, type ContentData } from '../schemas/blocks/content';
import { logger } from '../core/logger';

export class ContentRendererV3Ultimate extends BaseRendererV3<ContentData> {
  type = 'content-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContentRendererV3Ultimate', 'constructor', '🚀 Initialisation du renderer Content V3 ULTIMATE');
  }

  validate(data: unknown): z.SafeParseReturnType<ContentData, ContentData> {
    return contentDataSchema.safeParse(data);
  }

  getDefaultData(): ContentData {
    return contentDefaults;
  }

  /**
   * Propriétés complètes et ergonomiques
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
        description: 'Style visuel du bloc',
        options: ['modern', 'minimal', 'bold', 'elegant'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'modern', label: 'Modern', icon: '✨' },
            { value: 'minimal', label: 'Minimal', icon: '⚡' },
            { value: 'bold', label: 'Bold', icon: '💪' },
            { value: 'elegant', label: 'Elegant', icon: '👑' }
          ],
          group: 'Style',
          order: 1
        }
      },
      
      // === GROUPE : Header optionnel ===
      {
        name: 'showTitle',
        type: PropType.BOOLEAN,
        label: 'Afficher le titre',
        defaultValue: true,
        description: 'Afficher ou masquer le titre principal',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Header',
          order: 1
        }
      },
      
      {
        name: 'title',
        type: PropType.STRING,
        label: 'Titre principal',
        required: false,
        defaultValue: 'Notre Expertise',
        description: 'Titre principal de la section',
        editorConfig: {
          control: EditorControl.TEXT,
          condition: { prop: 'showTitle', value: true },
          group: 'Header',
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
          group: 'Header',
          order: 3
        }
      },
      
      {
        name: 'showSubtitle',
        type: PropType.BOOLEAN,
        label: 'Afficher le sous-titre',
        defaultValue: true,
        description: 'Afficher ou masquer le sous-titre',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Header',
          order: 4
        }
      },
      
      {
        name: 'subtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        required: false,
        defaultValue: 'Des années d\'expérience à votre service',
        description: 'Texte d\'accroche sous le titre',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          condition: { prop: 'showSubtitle', value: true },
          group: 'Header',
          order: 5
        }
      },
      
      // === GROUPE : Layout du contenu ===
      {
        name: 'contentLayout',
        type: PropType.SELECT,
        label: 'Disposition du contenu',
        defaultValue: 'text-right',
        description: 'Comment organiser le texte et l\'image',
        options: ['text-only', 'text-left', 'text-right', 'text-top', 'text-bottom', 'text-center', 'text-alternate'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'text-only', label: '📝 Texte seul' },
            { value: 'text-left', label: '⬅️ Texte à gauche' },
            { value: 'text-right', label: '➡️ Texte à droite' },
            { value: 'text-top', label: '⬆️ Texte en haut' },
            { value: 'text-bottom', label: '⬇️ Texte en bas' },
            { value: 'text-center', label: '🎯 Centré' },
            { value: 'text-alternate', label: '🔄 Alterné (zigzag)' }
          ],
          group: 'Mise en page',
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
          group: 'Mise en page',
          order: 2
        }
      },
      
      {
        name: 'contentAlign',
        type: PropType.SELECT,
        label: 'Alignement du contenu',
        defaultValue: 'left',
        options: ['left', 'center', 'right', 'justify'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'left', label: '⬛⬜⬜' },
            { value: 'center', label: '⬜⬛⬜' },
            { value: 'right', label: '⬜⬜⬛' },
            { value: 'justify', label: '⬛⬛⬛' }
          ],
          group: 'Mise en page',
          order: 3
        }
      },
      
      // === GROUPE : Contenu principal ===
      {
        name: 'richContent',
        type: PropType.STRING,
        label: 'Contenu principal',
        required: false,
        defaultValue: `<h2>Titre de section</h2>
<p>Créez votre contenu ici avec l'éditeur visuel. Utilisez la barre d'outils pour formater votre texte, ajouter des listes, des liens et bien plus.</p>
<ul>
  <li>Point important numéro 1</li>
  <li>Point important numéro 2</li>
  <li>Point important numéro 3</li>
</ul>
<p>Ajoutez des <strong>mots en gras</strong> ou en <em>italique</em> pour mettre en valeur certains éléments.</p>`,
        description: 'Éditeur visuel complet',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 1,
          // Configuration éditeur riche (sera gérée par PropertyControls)
          richEditor: true
        }
      },
      
      // === GROUPE : Image/Média ===
      {
        name: 'showMedia',
        type: PropType.BOOLEAN,
        label: 'Afficher une image',
        defaultValue: true,
        description: 'Ajouter une image au contenu',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Image',
          order: 1
        }
      },
      
      {
        name: 'mediaUrl',
        type: PropType.STRING,
        label: 'Image',
        required: false,
        defaultValue: '/images/expertise.jpg',
        description: 'Sélectionnez ou uploadez une image',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          condition: { prop: 'showMedia', value: true },
          group: 'Image',
          order: 2
        }
      },
      
      {
        name: 'mediaAlt',
        type: PropType.STRING,
        label: 'Texte alternatif',
        required: false,
        defaultValue: '',
        description: 'Description de l\'image pour l\'accessibilité',
        editorConfig: {
          control: EditorControl.TEXT,
          condition: { prop: 'showMedia', value: true },
          placeholder: 'Description de l\'image',
          group: 'Image',
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
            { value: 'small', label: 'Petite (300px)' },
            { value: 'medium', label: 'Moyenne (500px)' },
            { value: 'large', label: 'Grande (700px)' },
            { value: 'full', label: 'Pleine largeur' }
          ],
          group: 'Image',
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
          group: 'Image',
          order: 5
        }
      },
      
      // === GROUPE : Personnalisation des couleurs ===
      {
        name: 'useCustomColors',
        type: PropType.BOOLEAN,
        label: 'Personnaliser les couleurs',
        defaultValue: false,
        description: 'Utiliser des couleurs personnalisées au lieu du thème',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Couleurs',
          order: 1
        }
      },
      
      {
        name: 'customBackground',
        type: PropType.COLOR,
        label: 'Couleur de fond',
        required: false,
        defaultValue: '',
        description: 'Couleur de fond de la section',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: 'Couleurs',
          order: 2
        }
      },
      
      {
        name: 'customTitleColor',
        type: PropType.COLOR,
        label: 'Couleur du titre',
        required: false,
        defaultValue: '',
        description: 'Couleur personnalisée pour le titre',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: 'Couleurs',
          order: 3
        }
      },
      
      {
        name: 'customTextColor',
        type: PropType.COLOR,
        label: 'Couleur du texte',
        required: false,
        defaultValue: '',
        description: 'Couleur personnalisée pour le texte',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: 'Couleurs',
          order: 4
        }
      },
      
      {
        name: 'customHeadingColor',
        type: PropType.COLOR,
        label: 'Couleur des titres (H2-H4)',
        required: false,
        defaultValue: '',
        description: 'Couleur pour les titres dans le contenu',
        editorConfig: {
          control: EditorControl.COLOR_PICKER,
          condition: { prop: 'useCustomColors', value: true },
          group: 'Couleurs',
          order: 5
        }
      },
      
      // === GROUPE : Options avancées ===
      {
        name: 'enableAnimation',
        type: PropType.BOOLEAN,
        label: 'Activer les animations',
        defaultValue: true,
        description: 'Animations au défilement',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Avancé',
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
          group: 'Avancé',
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
      
      const typography = {
        fontHeading: 'Inter, system-ui, sans-serif',
        fontBody: 'Inter, system-ui, sans-serif'
      };

      // Extraire les propriétés
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
        enableAnimation: customData.enableAnimation !== false,
        spacing: customData.spacing || 'normal'
      };

      // Générer le HTML
      const html = this.renderContent(props, colors);
      
      // CSS avec variables personnalisées
      const css = this.getDefaultCSS() + this.generateCustomCSS(props, colors, typography);
      
      // JavaScript
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
      logger.error('ContentRendererV3Ultimate', 'render', 'Erreur lors du rendu', error);
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

  private renderContent(props: any, colors: any): string {
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
      spacing
    } = props;

    // Classes CSS
    const contentClasses = [
      'content',
      `content--visual-${visualVariant}`,
      `content--layout-${contentLayout}`,
      `content--align-${contentAlign}`,
      `content--spacing-${spacing}`,
      enableAnimation ? 'content--animated' : ''
    ].filter(Boolean).join(' ');

    // Déterminer si on a besoin d'une grille
    const needsGrid = contentLayout !== 'text-only' && contentLayout !== 'text-center' && showMedia && mediaUrl;

    return `
      <section class="${contentClasses}" data-content-variant="${visualVariant}">
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

  private generateCustomCSS(props: any, colors: any, typography: any): string {
    const {
      useCustomColors,
      customBackground,
      customTitleColor,
      customTextColor,
      customHeadingColor
    } = props;

    let css = `
/* ========================================
   Variables du thème
   ======================================== */
.content {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --text: ${colors.text};
  --text-secondary: ${colors.textSecondary};
  --background: ${colors.background};
  --surface: ${colors.surface};
  --border: ${colors.border};
  --accent: ${colors.accent};
  --font-heading: ${typography.fontHeading};
  --font-body: ${typography.fontBody};
  
  /* Couleurs des headings héritées du thème par défaut */
  --heading-color: ${colors.text};
  --title-color: ${colors.text};
  --content-text-color: ${colors.text};
  --content-bg: transparent;
}
`;

    // Ajouter les couleurs personnalisées si activées
    if (useCustomColors) {
      css += `
/* Couleurs personnalisées */
.content {
  ${customBackground ? `--content-bg: ${customBackground};` : ''}
  ${customTitleColor ? `--title-color: ${customTitleColor};` : ''}
  ${customTextColor ? `--content-text-color: ${customTextColor};` : ''}
  ${customHeadingColor ? `--heading-color: ${customHeadingColor};` : ''}
}
`;
    }

    return css;
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CONTENT V3 ULTIMATE - Styles parfaits
   ======================================== */

.content {
  position: relative;
  overflow: hidden;
  background: var(--content-bg);
  font-family: var(--font-body);
  color: var(--content-text-color);
  transition: background-color 0.3s ease;
}

/* Spacing variants */
.content--spacing-compact { padding: 3rem 0; }
.content--spacing-normal { padding: 5rem 0; }
.content--spacing-relaxed { padding: 7rem 0; }
.content--spacing-spacious { padding: 9rem 0; }

/* Container widths */
.content__container {
  margin: 0 auto;
  padding: 0 2rem;
  transition: max-width 0.3s ease;
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
  font-family: var(--font-heading);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--title-color);
  transition: color 0.3s ease;
}

/* Title sizes */
.content__title--small { font-size: clamp(1.875rem, 4vw, 2.5rem); }
.content__title--default { font-size: clamp(2.5rem, 5vw, 3.5rem); }
.content__title--large { font-size: clamp(3rem, 6vw, 4.5rem); }
.content__title--huge { font-size: clamp(3.5rem, 7vw, 5.5rem); }

.content__subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.6;
  color: var(--text-secondary);
  opacity: 0.9;
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

/* Layout: Texte seul */
.content--layout-text-only .content__text-area {
  max-width: 800px;
  margin: 0 auto;
}

/* Layout: Texte à gauche */
.content--layout-text-left .content__grid {
  grid-template-columns: 1fr auto;
}

/* Layout: Texte à droite */
.content--layout-text-right .content__grid {
  grid-template-columns: auto 1fr;
}
.content--layout-text-right .content__media-area {
  order: -1;
}

/* Layout: Texte en haut */
.content--layout-text-top .content__grid {
  grid-template-columns: 1fr;
}

/* Layout: Texte en bas */
.content--layout-text-bottom .content__grid {
  grid-template-columns: 1fr;
}
.content--layout-text-bottom .content__media-area {
  order: -1;
}

/* Layout: Centré */
.content--layout-text-center {
  text-align: center;
}
.content--layout-text-center .content__header {
  text-align: center;
}
.content--layout-text-center .content__media-area {
  margin: 0 auto 3rem;
}

/* Layout: Alterné (pour plusieurs sections) */
.content--layout-text-alternate:nth-child(even) .content__media-area {
  order: -1;
}

/* ========================================
   RICH TEXT EDITOR STYLES
   ======================================== */
.content__rich-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--content-text-color);
}

/* Alignement du texte */
.content__rich-text--align-left { text-align: left; }
.content__rich-text--align-center { text-align: center; }
.content__rich-text--align-right { text-align: right; }
.content__rich-text--align-justify { text-align: justify; }

/* Headings avec couleur du thème */
.content__rich-text h1,
.content__rich-text h2,
.content__rich-text h3,
.content__rich-text h4,
.content__rich-text h5,
.content__rich-text h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--heading-color);
  transition: color 0.3s ease;
}

.content__rich-text h1 { font-size: 2.5rem; }
.content__rich-text h2 { font-size: 2rem; }
.content__rich-text h3 { font-size: 1.5rem; }
.content__rich-text h4 { font-size: 1.25rem; }
.content__rich-text h5 { font-size: 1.125rem; }
.content__rich-text h6 { font-size: 1rem; }

.content__rich-text h1:first-child,
.content__rich-text h2:first-child,
.content__rich-text h3:first-child,
.content__rich-text h4:first-child {
  margin-top: 0;
}

/* Paragraphes et éléments de base */
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
  line-height: 1.7;
}

.content__rich-text strong,
.content__rich-text b {
  font-weight: 700;
  color: var(--heading-color);
}

.content__rich-text em,
.content__rich-text i {
  font-style: italic;
}

.content__rich-text u {
  text-decoration: underline;
  text-decoration-color: var(--primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}

.content__rich-text s,
.content__rich-text strike {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Liens */
.content__rich-text a {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.content__rich-text a:hover {
  border-bottom-color: var(--primary);
  color: var(--secondary);
}

/* Blockquotes */
.content__rich-text blockquote {
  position: relative;
  margin: 2rem 0;
  padding: 2rem 3rem;
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--surface), transparent 50%),
    color-mix(in srgb, var(--background), transparent 50%)
  );
  border-left: 4px solid var(--primary);
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
  color: var(--primary);
  opacity: 0.3;
  font-family: Georgia, serif;
}

/* Code */
.content__rich-text code {
  background: var(--surface);
  color: var(--primary);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Fira Code', monospace;
}

.content__rich-text pre {
  background: var(--text);
  color: var(--background);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 2rem 0;
}

.content__rich-text pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

/* Tables */
.content__rich-text table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}

.content__rich-text th,
.content__rich-text td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  text-align: left;
}

.content__rich-text th {
  background: var(--surface);
  font-weight: 700;
  color: var(--heading-color);
}

.content__rich-text tr:hover {
  background: color-mix(in srgb, var(--surface), transparent 50%);
}

/* Horizontal rule */
.content__rich-text hr {
  margin: 3rem 0;
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border), transparent);
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
.content__media--none {
  border-radius: 0;
}

.content__media--rounded {
  border-radius: 1rem;
}

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
   VARIANTES VISUELLES
   ======================================== */

/* Modern */
.content--visual-modern {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary), transparent 98%) 0%, 
    var(--background) 50%
  );
}

.content--visual-modern .content__title {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content--visual-modern .content__media {
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2);
}

.content--visual-modern .content__rich-text blockquote {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.7)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Minimal */
.content--visual-minimal .content__title {
  font-weight: 300;
  letter-spacing: -0.02em;
}

.content--visual-minimal .content__subtitle {
  font-weight: 400;
  opacity: 0.7;
}

.content--visual-minimal .content__media {
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.content--visual-minimal .content__media:hover {
  filter: grayscale(0%);
}

.content--visual-minimal .content__rich-text {
  font-weight: 300;
}

.content--visual-minimal .content__rich-text strong {
  font-weight: 500;
}

/* Bold */
.content--visual-bold {
  background: var(--text);
  --content-bg: var(--text);
  --title-color: var(--background);
  --content-text-color: var(--background);
  --heading-color: var(--background);
}

.content--visual-bold .content__title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.9;
}

.content--visual-bold .content__subtitle {
  color: var(--primary);
  font-weight: 600;
  font-size: 1.5rem;
}

.content--visual-bold .content__rich-text {
  font-size: 1.25rem;
  font-weight: 400;
}

.content--visual-bold .content__rich-text a {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.content--visual-bold .content__media {
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
}

.content--visual-bold .content__media:hover {
  transform: rotate(0deg) scale(1.05);
}

/* Elegant */
.content--visual-elegant {
  background: linear-gradient(180deg, var(--background) 0%, var(--surface) 100%);
  position: relative;
}

.content--visual-elegant::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent,
    var(--accent),
    transparent
  );
}

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
  background: var(--accent);
}

.content--visual-elegant .content__subtitle {
  font-style: italic;
  opacity: 0.8;
}

.content--visual-elegant .content__media {
  border: 10px solid white;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.3);
}

.content--visual-elegant .content__rich-text {
  font-size: 1.1875rem;
  line-height: 1.9;
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

.content--animated .content__media {
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out 0.5s forwards;
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 1024px) {
  .content__grid {
    gap: 3rem;
  }
  
  .content__media--large {
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  /* Spacing responsive */
  .content--spacing-compact { padding: 2rem 0; }
  .content--spacing-normal { padding: 3rem 0; }
  .content--spacing-relaxed { padding: 4rem 0; }
  .content--spacing-spacious { padding: 5rem 0; }
  
  .content__container {
    padding: 0 1.5rem;
  }
  
  /* Tous les layouts deviennent verticaux sur mobile */
  .content__grid {
    grid-template-columns: 1fr !important;
    gap: 2rem;
  }
  
  /* L'image toujours en premier sur mobile */
  .content__media-area {
    order: -1 !important;
  }
  
  /* Tailles de titre responsive */
  .content__title--small { font-size: 1.75rem; }
  .content__title--default { font-size: 2rem; }
  .content__title--large { font-size: 2.5rem; }
  .content__title--huge { font-size: 3rem; }
  
  .content__subtitle {
    font-size: 1.125rem;
  }
  
  .content__rich-text {
    font-size: 1rem;
  }
  
  .content__rich-text h1 { font-size: 2rem; }
  .content__rich-text h2 { font-size: 1.75rem; }
  .content__rich-text h3 { font-size: 1.5rem; }
  .content__rich-text h4 { font-size: 1.25rem; }
  
  .content__rich-text blockquote {
    padding: 1.5rem 2rem;
    font-size: 1.125rem;
  }
  
  /* Media responsive */
  .content__media {
    max-width: 100% !important;
  }
  
  /* Bold responsive */
  .content--visual-bold .content__title {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
}

/* ========================================
   TOOLBAR DE L'ÉDITEUR (Styles pour l'éditeur)
   ======================================== */
.content-editor-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-editor-btn {
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.content-editor-btn:hover {
  background: var(--surface);
  border-color: var(--border);
}

.content-editor-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.content-editor-separator {
  width: 1px;
  height: 24px;
  background: var(--border);
  margin: 0 0.25rem;
}

.content-editor-dropdown {
  position: relative;
}

.content-editor-dropdown select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  cursor: pointer;
}
    `;
  }

  getDefaultJS(): string {
    return `
// Content V3 Ultimate - JavaScript
(function() {
  'use strict';
  
  class ContentV3Ultimate {
    constructor() {
      this.init();
    }
    
    init() {
      this.initAnimations();
      this.initRichTextEnhancements();
      this.initImageEffects();
    }
    
    // Animations au scroll
    initAnimations() {
      const contents = document.querySelectorAll('.content--animated');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animer les éléments progressivement
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
      
      // Tables responsive
      document.querySelectorAll('.content__rich-text table').forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'content__table-wrapper';
        wrapper.style.overflowX = 'auto';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
    }
    
    // Effets sur les images
    initImageEffects() {
      // Lazy loading avec fade in
      const images = document.querySelectorAll('.content__image');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
            
            img.addEventListener('load', () => {
              img.style.opacity = '1';
            });
            
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });
      
      images.forEach(img => imageObserver.observe(img));
      
      // Zoom au clic
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
            transform: scale(0.9);
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
            zoomedImg.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
              overlay.remove();
            }, 300);
          });
        });
      });
    }
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ContentV3Ultimate());
  } else {
    new ContentV3Ultimate();
  }
  
  // Export pour usage externe
  window.ContentV3Ultimate = ContentV3Ultimate;
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

export const contentRendererV3Ultimate = new ContentRendererV3Ultimate();
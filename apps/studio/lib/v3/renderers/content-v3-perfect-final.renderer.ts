/**
 * Content Renderer V3 PERFECT FINAL
 * Harmonisé avec tous les blocs V3 : couleurs globales, typo, variantes cohérentes
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { contentDataSchema, contentDefaults, type ContentData } from '../schemas/blocks/content';
import { logger } from '../core/logger';

export class ContentRendererV3PerfectFinal extends BaseRendererV3<ContentData> {
  type = 'content-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContentRendererV3PerfectFinal', 'constructor', '🚀 Initialisation du renderer Content V3 PERFECT FINAL');
  }

  validate(data: unknown): z.SafeParseReturnType<ContentData, ContentData> {
    return contentDataSchema.safeParse(data);
  }

  getDefaultData(): ContentData {
    return contentDefaults;
  }

  /**
   * Propriétés harmonisées avec les autres blocs V3
   */
  getBlockProps(): BlockProp[] {
    return [
      // 1. Style visuel - EXACTEMENT comme les autres blocs V3
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Style visuel',
        required: false,
        defaultValue: 'modern',
        description: 'Style visuel du bloc Content',
        options: ['modern', 'minimal', 'bold', 'elegant'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'modern', label: 'Modern', icon: '✨' },
            { value: 'minimal', label: 'Minimal', icon: '⚡' },
            { value: 'bold', label: 'Bold', icon: '💪' },
            { value: 'elegant', label: 'Elegant', icon: '👑' }
          ]
        }
      },
      
      // 2. Preset de contenu - Pour démarrer rapidement
      {
        name: 'contentPreset',
        type: PropType.SELECT,
        label: 'Type de contenu',
        required: false,
        defaultValue: 'custom',
        description: 'Choisissez un modèle ou créez librement',
        options: ['custom', 'article', 'service', 'story', 'comparison'],
        editorConfig: {
          control: EditorControl.SELECT,
          options: [
            { value: 'custom', label: '🎨 Création libre' },
            { value: 'article', label: '📰 Article / Blog' },
            { value: 'service', label: '🛠️ Présentation service' },
            { value: 'story', label: '📖 Story telling' },
            { value: 'comparison', label: '⚖️ Comparaison' }
          ]
        }
      },
      
      // 3. Section Hero (optionnelle)
      {
        name: 'showHeroSection',
        type: PropType.BOOLEAN,
        label: 'Afficher la section Hero',
        defaultValue: true,
        description: 'Titre et sous-titre stylés en haut du contenu',
        editorConfig: {
          control: EditorControl.SWITCH
        }
      },
      
      {
        name: 'heroTitle',
        type: PropType.STRING,
        label: 'Titre principal',
        required: false,
        defaultValue: 'Notre Expertise',
        description: 'Titre qui s\'adapte au style visuel choisi',
        editorConfig: {
          control: EditorControl.TEXT,
          showIf: {
            field: 'showHeroSection',
            value: true
          }
        }
      },
      
      {
        name: 'heroSubtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        required: false,
        defaultValue: 'Des années d\'expérience à votre service',
        description: 'Texte d\'accroche sous le titre',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          showIf: {
            field: 'showHeroSection',
            value: true
          }
        }
      },
      
      {
        name: 'heroBadge',
        type: PropType.STRING,
        label: 'Badge/Tag',
        required: false,
        defaultValue: '',
        description: 'Ex: "Nouveau", "Premium", "2024"',
        editorConfig: {
          control: EditorControl.TEXT,
          placeholder: 'Badge optionnel',
          showIf: {
            field: 'showHeroSection',
            value: true
          }
        }
      },
      
      // 4. Contenu principal avec éditeur riche
      {
        name: 'mainContent',
        type: PropType.STRING,
        label: 'Contenu principal',
        required: false,
        defaultValue: `
<h2>Un service d'exception</h2>
<p>Nous mettons notre expertise à votre service pour réaliser vos projets les plus ambitieux. Notre équipe de professionnels qualifiés vous accompagne à chaque étape.</p>

<h3>Nos points forts</h3>
<ul>
  <li><strong>Expertise reconnue</strong> - Plus de 15 ans d'expérience</li>
  <li><strong>Équipe qualifiée</strong> - Professionnels certifiés</li>
  <li><strong>Résultats garantis</strong> - Satisfaction client 98%</li>
</ul>

<blockquote>
  "Un travail exceptionnel, je recommande vivement leurs services."
  <cite>- Marie D., Cliente satisfaite</cite>
</blockquote>
        `,
        description: 'Éditeur complet avec snippets intelligents',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          // Configuration de l'éditeur riche
          richTextConfig: {
            toolbar: {
              // Ligne 1 : Formats et structure
              line1: [
                {
                  type: 'dropdown',
                  name: 'format',
                  label: 'Format',
                  options: [
                    { value: 'p', label: 'Paragraphe' },
                    { value: 'h2', label: 'Titre 2' },
                    { value: 'h3', label: 'Titre 3' },
                    { value: 'h4', label: 'Titre 4' },
                    { value: 'blockquote', label: 'Citation' }
                  ]
                },
                { type: 'separator' },
                { type: 'button', name: 'bold', icon: 'B', tooltip: 'Gras (Ctrl+B)' },
                { type: 'button', name: 'italic', icon: 'I', tooltip: 'Italique (Ctrl+I)' },
                { type: 'button', name: 'underline', icon: 'U', tooltip: 'Souligné (Ctrl+U)' },
                { type: 'button', name: 'strike', icon: 'S', tooltip: 'Barré' },
                { type: 'separator' },
                { type: 'button', name: 'link', icon: '🔗', tooltip: 'Lien (Ctrl+K)' },
                { type: 'button', name: 'unlink', icon: '🔗', tooltip: 'Supprimer le lien' }
              ],
              // Ligne 2 : Listes et alignement
              line2: [
                { type: 'button', name: 'bulletList', icon: '• •', tooltip: 'Liste à puces' },
                { type: 'button', name: 'orderedList', icon: '1.', tooltip: 'Liste numérotée' },
                { type: 'separator' },
                { type: 'button', name: 'alignLeft', icon: '⬛⬜⬜', tooltip: 'Aligner à gauche' },
                { type: 'button', name: 'alignCenter', icon: '⬜⬛⬜', tooltip: 'Centrer' },
                { type: 'button', name: 'alignRight', icon: '⬜⬜⬛', tooltip: 'Aligner à droite' },
                { type: 'button', name: 'justify', icon: '⬛⬛⬛', tooltip: 'Justifier' },
                { type: 'separator' },
                { type: 'button', name: 'outdent', icon: '←', tooltip: 'Réduire le retrait' },
                { type: 'button', name: 'indent', icon: '→', tooltip: 'Augmenter le retrait' }
              ]
            },
            // Snippets rapides adaptés au style
            snippets: [
              {
                label: '📊 Stats en ligne',
                icon: '📊',
                content: '<div class="content-stats-inline"><span class="stat-number">98%</span><span class="stat-label">Satisfaction</span></div>'
              },
              {
                label: '💬 Citation stylée',
                icon: '💬',
                content: '<blockquote class="content-quote-styled">"Votre citation ici"<cite>- Auteur</cite></blockquote>'
              },
              {
                label: '✅ Liste design',
                icon: '✅',
                content: '<ul class="content-list-styled"><li>Point 1</li><li>Point 2</li><li>Point 3</li></ul>'
              },
              {
                label: '🎯 Call-to-action',
                icon: '🎯',
                content: '<div class="content-cta-inline"><p>Texte d\'appel</p><a href="#" class="btn-inline">Action</a></div>'
              }
            ],
            // Configuration avancée
            height: '400px',
            placeholder: 'Commencez à écrire ou choisissez un snippet...',
            allowHTML: true,
            autofocus: false
          }
        }
      },
      
      // 5. Section Media flexible
      {
        name: 'mediaType',
        type: PropType.SELECT,
        label: 'Type de média',
        required: false,
        defaultValue: 'image',
        description: 'Ajoutez un élément visuel',
        options: ['none', 'image', 'video', 'gallery'],
        editorConfig: {
          control: EditorControl.RADIO,
          options: [
            { value: 'none', label: '❌ Aucun' },
            { value: 'image', label: '🖼️ Image' },
            { value: 'video', label: '🎥 Vidéo' },
            { value: 'gallery', label: '🎨 Galerie' }
          ]
        }
      },
      
      {
        name: 'mediaPosition',
        type: PropType.SELECT,
        label: 'Position du média',
        required: false,
        defaultValue: 'right',
        description: 'Où placer le média',
        options: ['left', 'right', 'top', 'bottom', 'background'],
        editorConfig: {
          control: EditorControl.SELECT,
          showIf: {
            field: 'mediaType',
            operator: 'notEquals',
            value: 'none'
          }
        }
      },
      
      {
        name: 'mediaUrl',
        type: PropType.STRING,
        label: 'URL du média',
        required: false,
        defaultValue: '/images/expertise.jpg',
        description: 'Image ou vidéo à afficher',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER,
          showIf: {
            field: 'mediaType',
            operator: 'in',
            value: ['image', 'video']
          }
        }
      },
      
      {
        name: 'mediaEffect',
        type: PropType.SELECT,
        label: 'Effet visuel',
        required: false,
        defaultValue: 'none',
        description: 'Animation ou effet sur le média',
        options: ['none', 'parallax', 'reveal', 'zoom', 'float'],
        editorConfig: {
          control: EditorControl.SELECT,
          showIf: {
            field: 'mediaType',
            operator: 'notEquals',
            value: 'none'
          }
        }
      },
      
      // 6. Options avancées
      {
        name: 'enableAnimation',
        type: PropType.BOOLEAN,
        label: 'Activer les animations',
        defaultValue: true,
        description: 'Animations au défilement',
        editorConfig: {
          control: EditorControl.SWITCH
        }
      },
      
      {
        name: 'containerWidth',
        type: PropType.SELECT,
        label: 'Largeur du conteneur',
        defaultValue: 'normal',
        options: ['full', 'wide', 'normal', 'narrow'],
        editorConfig: {
          control: EditorControl.SELECT
        }
      }
    ];
  }

  render(data: ContentData, context?: RenderContext): RenderResult {
    try {
      // Extraire toutes les données personnalisées
      const customData = data as any;
      
      // Extraire le thème EXACTEMENT comme les autres blocs V3
      const theme = context?.theme;
      const colors = {
        primary: theme?.colors?.primary || '#667eea',
        secondary: theme?.colors?.secondary || '#764ba2',
        text: theme?.colors?.text || '#1a202c',
        textSecondary: theme?.colors?.textSecondary || '#718096',
        background: theme?.colors?.background || '#ffffff',
        surface: theme?.colors?.surface || '#f7fafc',
        border: theme?.colors?.border || '#e2e8f0',
        accent: theme?.colors?.accent || theme?.colors?.primary || '#667eea'
      };
      
      const typography = {
        fontHeading: theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif',
        fontBody: theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif'
      };

      // Variables du bloc
      const visualVariant = customData.visualVariant || 'modern';
      const contentPreset = customData.contentPreset || 'custom';
      const showHeroSection = customData.showHeroSection !== false;
      const heroTitle = customData.heroTitle || data.title || 'Notre Expertise';
      const heroSubtitle = customData.heroSubtitle || data.subtitle || '';
      const heroBadge = customData.heroBadge || '';
      const mainContent = customData.mainContent || customData.richContent || data.textImage?.content || '<p>Contenu par défaut</p>';
      const mediaType = customData.mediaType || 'image';
      const mediaPosition = customData.mediaPosition || 'right';
      const mediaUrl = customData.mediaUrl || data.textImage?.image?.src || '';
      const mediaEffect = customData.mediaEffect || 'none';
      const enableAnimation = customData.enableAnimation !== false;
      const containerWidth = customData.containerWidth || 'normal';

      // Générer le HTML selon la variante et le preset
      const html = this.renderContent({
        visualVariant,
        contentPreset,
        showHeroSection,
        heroTitle,
        heroSubtitle,
        heroBadge,
        mainContent,
        mediaType,
        mediaPosition,
        mediaUrl,
        mediaEffect,
        enableAnimation,
        containerWidth
      });

      // CSS avec toutes les variantes visuelles
      const css = this.getDefaultCSS() + this.generateThemeCSS(colors, typography);
      
      // JavaScript pour les interactions
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
      logger.error('ContentRendererV3PerfectFinal', 'render', 'Erreur lors du rendu', error);
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
      contentPreset,
      showHeroSection,
      heroTitle,
      heroSubtitle,
      heroBadge,
      mainContent,
      mediaType,
      mediaPosition,
      mediaUrl,
      mediaEffect,
      enableAnimation,
      containerWidth
    } = props;

    // Classes CSS
    const contentClasses = [
      'content',
      `content--visual-${visualVariant}`,
      `content--preset-${contentPreset}`,
      `content--media-${mediaPosition}`,
      mediaEffect !== 'none' ? `content--effect-${mediaEffect}` : '',
      enableAnimation ? 'content--animated' : ''
    ].filter(Boolean).join(' ');

    return `
      <section class="${contentClasses}" data-content-variant="${visualVariant}">
        <div class="content__container content__container--${containerWidth}">
          ${showHeroSection ? `
            <div class="content__hero">
              ${heroBadge ? `<span class="content__badge">${this.escapeHtml(heroBadge)}</span>` : ''}
              <h1 class="content__title">${this.escapeHtml(heroTitle)}</h1>
              ${heroSubtitle ? `<p class="content__subtitle">${this.escapeHtml(heroSubtitle)}</p>` : ''}
            </div>
          ` : ''}
          
          <div class="content__body-wrapper">
            ${mediaType !== 'none' && mediaPosition === 'top' ? this.renderMedia(mediaType, mediaUrl, mediaEffect) : ''}
            
            <div class="content__layout">
              ${mediaType !== 'none' && mediaPosition === 'left' ? this.renderMedia(mediaType, mediaUrl, mediaEffect) : ''}
              
              <div class="content__main">
                <div class="content__rich-text">
                  ${mainContent}
                </div>
              </div>
              
              ${mediaType !== 'none' && mediaPosition === 'right' ? this.renderMedia(mediaType, mediaUrl, mediaEffect) : ''}
            </div>
            
            ${mediaType !== 'none' && mediaPosition === 'bottom' ? this.renderMedia(mediaType, mediaUrl, mediaEffect) : ''}
          </div>
          
          ${mediaType !== 'none' && mediaPosition === 'background' ? `
            <div class="content__background-media">
              ${this.renderMedia(mediaType, mediaUrl, mediaEffect)}
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  private renderMedia(type: string, url: string, effect: string): string {
    if (!url) return '';
    
    const mediaClasses = [
      'content__media',
      `content__media--${type}`,
      effect !== 'none' ? `content__media--effect-${effect}` : ''
    ].filter(Boolean).join(' ');

    switch (type) {
      case 'image':
        return `
          <div class="${mediaClasses}">
            <img src="${url}" alt="" loading="lazy" />
          </div>
        `;
      
      case 'video':
        return `
          <div class="${mediaClasses}">
            <video src="${url}" controls playsinline></video>
          </div>
        `;
      
      case 'gallery':
        // Pour la galerie, on pourrait parser plusieurs URLs depuis le contenu
        return `
          <div class="${mediaClasses}">
            <div class="content__gallery-grid">
              <!-- Images de la galerie -->
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  }

  private generateThemeCSS(colors: any, typography: any): string {
    return `
/* ========================================
   CONTENT V3 - Variables du thème
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
  
  /* Gradients basés sur le thème */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--secondary));
  --gradient-subtle: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary), transparent 95%), 
    color-mix(in srgb, var(--secondary), transparent 98%)
  );
}
    `;
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CONTENT V3 PERFECT - Harmonisé avec tous les blocs V3
   ======================================== */

.content {
  position: relative;
  padding: 5rem 0;
  overflow: hidden;
  background: var(--background);
  font-family: var(--font-body);
  color: var(--text);
}

.content__container {
  margin: 0 auto;
  padding: 0 2rem;
}

.content__container--full { max-width: 100%; }
.content__container--wide { max-width: 1400px; }
.content__container--normal { max-width: 1200px; }
.content__container--narrow { max-width: 800px; }

/* ========================================
   HERO SECTION
   ======================================== */
.content__hero {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out forwards;
}

.content__badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.content__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.content__subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

/* ========================================
   LAYOUT SYSTEM
   ======================================== */
.content__body-wrapper {
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out 0.2s forwards;
}

.content__layout {
  display: grid;
  gap: 3rem;
  align-items: center;
}

/* Positions du média */
.content--media-left .content__layout {
  grid-template-columns: auto 1fr;
}

.content--media-right .content__layout {
  grid-template-columns: 1fr auto;
}

.content--media-top .content__layout,
.content--media-bottom .content__layout {
  grid-template-columns: 1fr;
}

/* ========================================
   RICH TEXT STYLES
   ======================================== */
.content__rich-text {
  font-size: 1.125rem;
  line-height: 1.8;
}

.content__rich-text h2 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  margin: 3rem 0 1.5rem;
  color: var(--text);
}

.content__rich-text h3 {
  font-family: var(--font-heading);
  font-size: 1.875rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem;
  color: var(--text);
}

.content__rich-text h4 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
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
  line-height: 1.7;
}

.content__rich-text strong {
  font-weight: 600;
  color: var(--text);
}

.content__rich-text em {
  font-style: italic;
}

.content__rich-text a {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.content__rich-text a:hover {
  border-bottom-color: var(--primary);
}

.content__rich-text blockquote {
  position: relative;
  margin: 2rem 0;
  padding: 2rem 3rem;
  background: var(--surface);
  border-left: 4px solid var(--primary);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--text);
}

.content__rich-text blockquote::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary);
  opacity: 0.2;
}

.content__rich-text blockquote cite {
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
  font-style: normal;
  color: var(--text-secondary);
}

/* Snippets stylés */
.content-stats-inline {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--gradient-subtle);
  border-radius: 0.5rem;
  margin: 0 0.5rem;
}

.content-stats-inline .stat-number {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}

.content-stats-inline .stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.content-quote-styled {
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, var(--surface), var(--background));
  border: 2px solid var(--border);
  border-radius: 1rem;
  text-align: center;
  font-size: 1.5rem;
  color: var(--text);
}

.content-list-styled {
  list-style: none;
  padding: 0;
}

.content-list-styled li {
  position: relative;
  padding-left: 2rem;
  margin: 1rem 0;
}

.content-list-styled li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.content-cta-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: var(--gradient-subtle);
  border-radius: 1rem;
  margin: 2rem 0;
}

.content-cta-inline p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}

.btn-inline {
  padding: 0.875rem 2rem;
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.btn-inline:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}

/* ========================================
   MEDIA STYLES
   ======================================== */
.content__media {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

.content__media--image {
  max-width: 500px;
  width: 100%;
}

.content__media img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.6s ease;
}

.content__media--video {
  max-width: 700px;
  width: 100%;
}

.content__media video {
  width: 100%;
  height: auto;
  border-radius: 1rem;
}

/* Effets média */
.content__media--effect-parallax {
  transform: translateY(0);
  transition: transform 0.5s ease-out;
}

.content__media--effect-reveal {
  clip-path: inset(100% 0 0 0);
  animation: revealUp 1s ease-out forwards;
}

.content__media--effect-zoom img {
  transform: scale(1.1);
}

.content__media--effect-zoom:hover img {
  transform: scale(1);
}

.content__media--effect-float {
  animation: float 6s ease-in-out infinite;
}

/* ========================================
   VARIANTES VISUELLES - Harmonisées avec V3
   ======================================== */

/* Modern - Gradients et effets glass */
.content--visual-modern {
  background: var(--gradient-subtle);
}

.content--visual-modern .content__title {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content--visual-modern .content__media {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}

.content--visual-modern .content__rich-text blockquote {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--surface), transparent 30%),
    color-mix(in srgb, var(--background), transparent 30%)
  );
  backdrop-filter: blur(10px);
  border: 1px solid color-mix(in srgb, var(--border), transparent 50%);
}

/* Minimal - Épuré et spacieux */
.content--visual-minimal {
  padding: 8rem 0;
}

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
  max-width: 65ch;
  margin: 0 auto;
}

/* Bold - Impact et contrastes */
.content--visual-bold {
  background: var(--text);
  color: var(--background);
}

.content--visual-bold .content__title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  color: var(--background);
}

.content--visual-bold .content__subtitle {
  color: var(--primary);
  font-weight: 600;
  font-size: 1.5rem;
}

.content--visual-bold .content__rich-text {
  color: var(--background);
  font-size: 1.25rem;
}

.content--visual-bold .content__rich-text h2,
.content--visual-bold .content__rich-text h3,
.content--visual-bold .content__rich-text strong {
  color: var(--background);
}

.content--visual-bold .content__rich-text a {
  color: var(--primary);
}

.content--visual-bold .content__media {
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
}

.content--visual-bold .content__media:hover {
  transform: rotate(0deg) scale(1.05);
}

/* Elegant - Raffiné et sophistiqué */
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

.content--visual-elegant .content__title {
  font-weight: 400;
  text-align: center;
  position: relative;
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
  text-align: center;
  font-style: italic;
  opacity: 0.8;
}

.content--visual-elegant .content__media {
  border: 8px solid white;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2);
}

.content--visual-elegant .content__rich-text {
  column-count: 2;
  column-gap: 3rem;
  column-rule: 1px solid var(--border);
}

/* ========================================
   PRESETS DE CONTENU
   ======================================== */

/* Article/Blog */
.content--preset-article .content__hero {
  text-align: left;
}

.content--preset-article .content__rich-text::first-letter {
  float: left;
  font-size: 5rem;
  line-height: 1;
  font-weight: 900;
  margin-right: 0.5rem;
  color: var(--primary);
}

/* Service */
.content--preset-service .content__rich-text ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
}

/* Story */
.content--preset-story .content__rich-text h2 {
  position: relative;
  padding-left: 3rem;
}

.content--preset-story .content__rich-text h2::before {
  content: attr(data-number, '');
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: bold;
}

/* Comparison */
.content--preset-comparison .content__rich-text {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
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

@keyframes revealUp {
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Animation des éléments internes */
.content--animated .content__rich-text > * {
  opacity: 0;
  animation: contentFadeUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s);
}

.content--animated .content__media {
  opacity: 0;
  animation: contentFadeUp 0.8s ease-out 0.4s forwards;
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 1024px) {
  .content--visual-elegant .content__rich-text {
    column-count: 1;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 3rem 0;
  }
  
  .content__layout {
    grid-template-columns: 1fr !important;
  }
  
  .content__media {
    max-width: 100%;
    margin-bottom: 2rem;
  }
  
  .content--media-right .content__media {
    order: -1;
  }
  
  .content__title {
    font-size: 2rem;
  }
  
  .content__rich-text {
    font-size: 1rem;
  }
  
  .content__rich-text h2 {
    font-size: 1.75rem;
  }
  
  .content__rich-text h3 {
    font-size: 1.5rem;
  }
  
  .content__rich-text blockquote {
    padding: 1.5rem 2rem;
    font-size: 1.125rem;
  }
  
  .content--preset-comparison .content__rich-text {
    grid-template-columns: 1fr;
  }
  
  .content--preset-service .content__rich-text ul {
    grid-template-columns: 1fr;
  }
}

/* ========================================
   COMPATIBILITÉ THÈME V3
   ======================================== */
/* Utilisation des mêmes classes que les autres blocs V3 */
.content__gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content__glass-card {
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--surface), transparent 30%),
    color-mix(in srgb, var(--background), transparent 30%)
  );
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--border), transparent 50%);
  border-radius: 1.5rem;
  padding: 2rem;
}

.content__hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content__hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}
    `;
  }

  getDefaultJS(): string {
    return `
// Content V3 Perfect - JavaScript harmonisé avec V3
(function() {
  'use strict';
  
  class ContentV3Perfect {
    constructor() {
      this.init();
    }
    
    init() {
      this.initAnimations();
      this.initMediaEffects();
      this.initRichTextEnhancements();
      this.initSnippets();
    }
    
    // Animations au scroll (comme les autres blocs V3)
    initAnimations() {
      const contents = document.querySelectorAll('.content--animated');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Animer les éléments enfants progressivement
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
    
    // Effets sur les médias
    initMediaEffects() {
      // Effet parallax
      const parallaxMedia = document.querySelectorAll('.content__media--effect-parallax');
      if (parallaxMedia.length > 0) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          
          parallaxMedia.forEach(media => {
            const rate = scrolled * -0.5;
            media.style.transform = 'translateY(' + rate + 'px)';
          });
        }, { passive: true });
      }
      
      // Zoom au survol avec smoothing
      const zoomMedia = document.querySelectorAll('.content__media--effect-zoom img');
      zoomMedia.forEach(img => {
        img.addEventListener('mouseenter', () => {
          img.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
      });
    }
    
    // Améliorations du texte riche
    initRichTextEnhancements() {
      // Numérotation automatique des chapitres pour le preset story
      const storyContents = document.querySelectorAll('.content--preset-story');
      storyContents.forEach(content => {
        const h2s = content.querySelectorAll('.content__rich-text h2');
        h2s.forEach((h2, index) => {
          h2.setAttribute('data-number', index + 1);
        });
      });
      
      // Liens externes dans nouvelle fenêtre
      const externalLinks = document.querySelectorAll('.content__rich-text a[href^="http"]');
      externalLinks.forEach(link => {
        if (!link.hostname === window.location.hostname) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          link.innerHTML += ' <span class="external-icon">↗</span>';
        }
      });
      
      // Animation des stats inline au scroll
      const statsInline = document.querySelectorAll('.content-stats-inline');
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            if (number) {
              this.animateNumber(number);
            }
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      statsInline.forEach(stat => statsObserver.observe(stat));
    }
    
    // Animation des nombres (comme les autres blocs V3)
    animateNumber(element) {
      const finalValue = parseInt(element.textContent);
      const duration = 2000;
      const step = (timestamp, startTime, startValue) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (finalValue - startValue) + startValue);
        element.textContent = currentValue + (element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
          requestAnimationFrame((timestamp) => step(timestamp, startTime, startValue));
        }
      };
      
      requestAnimationFrame((timestamp) => step(timestamp, timestamp, 0));
    }
    
    // Gestion des snippets (si éditeur actif)
    initSnippets() {
      // Cette partie serait active uniquement dans l'éditeur
      if (window.__editorMode) {
        // Logique pour insérer les snippets dans l'éditeur
      }
    }
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ContentV3Perfect());
  } else {
    new ContentV3Perfect();
  }
  
  // Export pour usage externe
  window.ContentV3Perfect = ContentV3Perfect;
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

export const contentRendererV3PerfectFinal = new ContentRendererV3PerfectFinal();
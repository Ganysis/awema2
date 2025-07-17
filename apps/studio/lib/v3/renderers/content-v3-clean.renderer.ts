/**
 * Content Renderer V3 CLEAN - Version épurée sans champs parasites
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { contentDataSchema, contentDefaults, type ContentData } from '../schemas/blocks/content';
import { logger } from '../core/logger';

export class ContentRendererV3Clean extends BaseRendererV3<ContentData> {
  type = 'content-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContentRendererV3Clean', 'constructor', '🚀 Initialisation du renderer Content V3 CLEAN');
  }

  validate(data: unknown): z.SafeParseReturnType<ContentData, ContentData> {
    return contentDataSchema.safeParse(data);
  }

  getDefaultData(): ContentData {
    return contentDefaults;
  }

  /**
   * OVERRIDE COMPLET - On retourne EXACTEMENT ce qu'on veut
   * Pas d'appel à super(), pas d'héritage
   */
  getBlockProps(): BlockProp[] {
    return [
      // 1. Style visuel
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Style visuel',
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel du bloc',
        options: ['modern', 'minimal', 'bold', 'elegant'],
        editorConfig: {
          control: EditorControl.RADIO
        }
      },
      
      // 2. Type de contenu
      {
        name: 'contentType',
        type: PropType.SELECT,
        label: 'Type de contenu',
        required: true,
        defaultValue: 'text-image',
        description: 'Sélectionnez le type de contenu',
        options: ['text-image'],
        editorConfig: {
          control: EditorControl.SELECT
        }
      },
      
      // 3. Titre
      {
        name: 'contentTitle',
        type: PropType.STRING,
        label: 'Titre',
        required: false,
        defaultValue: 'Notre Expertise',
        description: 'Titre principal de la section',
        editorConfig: {
          control: EditorControl.TEXT
        }
      },
      
      // 4. Sous-titre
      {
        name: 'contentSubtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        required: false,
        defaultValue: 'Des années d\'expérience à votre service',
        description: 'Sous-titre de la section',
        editorConfig: {
          control: EditorControl.TEXT
        }
      },
      
      // 5. Position de l'image
      {
        name: 'imagePosition',
        type: PropType.SELECT,
        label: 'Position de l\'image',
        required: false,
        defaultValue: 'right',
        description: 'Où placer l\'image par rapport au texte',
        options: ['left', 'right'],
        editorConfig: {
          control: EditorControl.RADIO
        }
      },
      
      // 6. URL de l'image
      {
        name: 'imageUrl',
        type: PropType.STRING,
        label: 'Image',
        required: false,
        defaultValue: '/images/expertise.jpg',
        description: 'Sélectionnez une image',
        editorConfig: {
          control: EditorControl.IMAGE_PICKER
        }
      },
      
      // 7. Contenu riche
      {
        name: 'richContent',
        type: PropType.STRING,
        label: 'Contenu',
        required: false,
        defaultValue: `
<h2>Un titre pour structurer</h2>
<p>Votre contenu principal ici. Utilisez la barre d'outils pour formater votre texte.</p>
<ul>
  <li>Point important 1</li>
  <li>Point important 2</li>
  <li>Point important 3</li>
</ul>
<p>Ajoutez des <strong>mots en gras</strong> ou en <em>italique</em> pour mettre en valeur.</p>
        `,
        description: 'Rédigez votre contenu avec mise en forme',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          // Options pour l'éditeur de texte riche
          /*richTextOptions: {
            minHeight: '400px',
            placeholder: 'Commencez à écrire...',
            toolbar: [
              // Formats
              {
                name: 'format',
                type: 'dropdown',
                options: [
                  { value: 'p', label: 'Paragraphe' },
                  { value: 'h2', label: 'Titre 2' },
                  { value: 'h3', label: 'Titre 3' },
                  { value: 'h4', label: 'Titre 4' }
                ]
              },
              '|',
              // Styles de base
              { name: 'bold', icon: 'B' },
              { name: 'italic', icon: 'I' },
              { name: 'underline', icon: 'U' },
              { name: 'strike', icon: 'S' },
              '|',
              // Listes
              { name: 'bulletList', icon: '• • •' },
              { name: 'orderedList', icon: '1. 2.' },
              '|',
              // Alignement
              { name: 'alignLeft', icon: '⬛⬜⬜' },
              { name: 'alignCenter', icon: '⬜⬛⬜' },
              { name: 'alignRight', icon: '⬜⬜⬛' },
              '|',
              // Autres
              { name: 'link', icon: '🔗' },
              { name: 'blockquote', icon: '"' },
              { name: 'clear', icon: '✖️' }
            ]
          }*/
        }
      }
    ];
  }

  render(data: ContentData, context?: RenderContext): RenderResult {
    try {
      // Extraire les données personnalisées
      const customData = data as any;
      const visualVariant = customData.visualVariant || 'modern';
      const contentType = customData.contentType || 'text-image';
      const title = customData.contentTitle || data.title;
      const subtitle = customData.contentSubtitle || data.subtitle;
      const imagePosition = customData.imagePosition || 'right';
      const imageUrl = customData.imageUrl || '';
      const richContent = customData.richContent || '<p>Contenu par défaut</p>';

      // Extraire le thème
      const theme = context?.theme;
      const themeVars = {
        primaryColor: theme?.colors?.primary || '#667eea',
        secondaryColor: theme?.colors?.secondary || '#764ba2',
        textColor: theme?.colors?.text || '#1a202c',
        textSecondaryColor: theme?.colors?.secondary || '#718096',
        backgroundColor: theme?.colors?.background || '#ffffff',
        surfaceColor: '#f7fafc',
        borderColor: '#e2e8f0',
        fontHeading: 'Inter, sans-serif',
        fontBody: 'Inter, sans-serif'
      };

      // Générer le HTML
      const html = `
        <section class="content content--visual-${visualVariant} content--${contentType}">
          <div class="content__container">
            ${title ? `<h2 class="content__title">${this.escapeHtml(title)}</h2>` : ''}
            ${subtitle ? `<p class="content__subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
            
            <div class="content__layout content__layout--image-${imagePosition}">
              ${imageUrl ? `
                <div class="content__image-wrapper">
                  <img 
                    src="${imageUrl}" 
                    alt="${title || 'Image'}" 
                    class="content__image"
                    loading="lazy"
                  />
                </div>
              ` : ''}
              
              <div class="content__text-wrapper">
                <div class="content__rich-text">
                  ${richContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      `;

      // CSS personnalisé
      const css = this.getDefaultCSS() + `
        /* Variables du thème */
        .content {
          --primary: ${themeVars.primaryColor};
          --secondary: ${themeVars.secondaryColor};
          --text: ${themeVars.textColor};
          --text-secondary: ${themeVars.textSecondaryColor};
          --background: ${themeVars.backgroundColor};
          --surface: ${themeVars.surfaceColor};
          --border: ${themeVars.borderColor};
          --font-heading: ${themeVars.fontHeading};
          --font-body: ${themeVars.fontBody};
        }
      `;

      return {
        html,
        css,
        js: this.getDefaultJS(),
        assets: [],
        errors: [],
        warnings: []
      };

    } catch (error) {
      logger.error('ContentRendererV3Clean', 'render', 'Erreur lors du rendu', error);
      return {
        html: '<div class="error">Erreur de rendu</div>',
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

  getDefaultCSS(): string {
    return `
/* Content V3 Clean - Styles épurés */
.content {
  padding: 4rem 0;
  background: var(--background);
}

.content__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.content__subtitle {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.content__layout {
  display: grid;
  gap: 3rem;
  align-items: center;
}

.content__layout--image-left {
  grid-template-columns: auto 1fr;
}

.content__layout--image-right {
  grid-template-columns: 1fr auto;
}

.content__layout--image-right .content__image-wrapper {
  order: 2;
}

.content__image-wrapper {
  max-width: 500px;
}

.content__image {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

/* Contenu riche */
.content__rich-text {
  font-family: var(--font-body);
  color: var(--text);
  line-height: 1.8;
  font-size: 1.125rem;
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
  padding: 1.5rem 2rem;
  border-left: 4px solid var(--primary);
  background: var(--surface);
  font-style: italic;
  color: var(--text-secondary);
}

/* Variantes visuelles */
.content--visual-modern .content__title {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content--visual-minimal {
  padding: 6rem 0;
}

.content--visual-minimal .content__title {
  font-weight: 300;
  letter-spacing: -0.02em;
}

.content--visual-bold {
  background: var(--text);
  color: var(--background);
}

.content--visual-bold .content__title,
.content--visual-bold .content__subtitle,
.content--visual-bold .content__rich-text {
  color: var(--background);
}

.content--visual-elegant .content__image {
  border-radius: 2rem;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .content__layout {
    grid-template-columns: 1fr !important;
  }
  
  .content__image-wrapper {
    order: -1 !important;
    max-width: 100%;
    margin-bottom: 2rem;
  }
  
  .content__title {
    font-size: 2rem;
  }
  
  .content__rich-text {
    font-size: 1rem;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Content V3 Clean - JavaScript minimal
(function() {
  'use strict';
  
  // Animation au scroll
  const observeContent = () => {
    const contents = document.querySelectorAll('.content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('content--visible');
        }
      });
    }, { threshold: 0.1 });
    
    contents.forEach(content => observer.observe(content));
  };
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeContent);
  } else {
    observeContent();
  }
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

export const contentRendererV3Clean = new ContentRendererV3Clean();
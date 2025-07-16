/**
 * Services Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { servicesDataSchema, servicesDefaults, type ServicesData } from '../schemas/blocks/services';
import { logger } from '../core/logger';

export class ServicesRendererV3PerfectEnhanced extends BaseRendererV3<ServicesData> {
  type = 'services-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ServicesRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Services V3 PERFECT Enhanced');
  }

  validate(data: unknown): z.SafeParseReturnType<ServicesData, ServicesData> {
    return servicesDataSchema.safeParse(data);
  }

  getDefaultData(): ServicesData {
    return {
      ...servicesDefaults,
      variant: 'grid-cards' as any,
      visualVariant: 'modern' as any
    };
  }

  getBlockProps(): BlockProp[] {
    // Completely override base method to provide flat structure
    const props: BlockProp[] = [
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
        defaultValue: 'grid-cards',
        description: 'Choisissez la disposition des services',
        options: [
          { value: 'grid-cards', label: '📱 Grille de cartes' },
          { value: 'list-detailed', label: '📋 Liste détaillée' },
          { value: 'carousel-modern', label: '🎠 Carousel moderne' },
          { value: 'masonry-creative', label: '🧱 Masonry créatif' },
          { value: 'tabs-organized', label: '📑 Onglets organisés' },
          { value: 'accordion-compact', label: '📂 Accordéon compact' },
          { value: 'timeline-process', label: '📅 Timeline processus' },
          { value: 'hexagon-tech', label: '⬡ Hexagones tech' }
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
        description: 'Le titre principal du bloc services',
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
        defaultValue: 'Des solutions adaptées à tous vos besoins',
        description: 'Le sous-titre du bloc',
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
        defaultValue: 'Découvrez notre gamme complète de services professionnels.',
        description: 'Description générale des services',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 3
        }
      },
      
      // Layout Options
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
          max: 4,
          step: 1
        }
      },
      {
        name: 'gap',
        label: 'Espacement',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'lg',
        description: 'Espacement entre les services',
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
      
      // Display Options
      {
        name: 'showIcon',
        label: 'Afficher les icônes',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Afficher les icônes des services',
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
        description: 'Style visuel des icônes',
        options: [
          { value: 'filled', label: 'Rempli' },
          { value: 'outline', label: 'Contour' },
          { value: 'gradient', label: 'Dégradé' },
          { value: 'shadow', label: 'Ombre' },
          { value: '3d', label: '3D' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 2,
          condition: { showIcon: true }
        }
      },
      {
        name: 'showPricing',
        label: 'Afficher les prix',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Afficher les prix des services',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 3
        }
      },
      {
        name: 'pricingStyle',
        label: 'Style des prix',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'simple',
        description: 'Style d\'affichage des prix',
        options: [
          { value: 'simple', label: 'Simple' },
          { value: 'badge', label: 'Badge' },
          { value: 'prominent', label: 'Proéminent' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 4,
          condition: { showPricing: true }
        }
      },
      {
        name: 'showFeatures',
        label: 'Afficher les caractéristiques',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        description: 'Afficher la liste des caractéristiques',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Affichage',
          order: 5
        }
      },
      {
        name: 'featuresStyle',
        label: 'Style des caractéristiques',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'list',
        description: 'Style d\'affichage des caractéristiques',
        options: [
          { value: 'list', label: 'Liste' },
          { value: 'tags', label: 'Tags' },
          { value: 'grid', label: 'Grille' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 6,
          condition: { showFeatures: true }
        }
      },
      {
        name: 'cardStyle',
        label: 'Style des cartes',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'elevated',
        description: 'Style visuel des cartes',
        options: [
          { value: 'flat', label: 'Plat' },
          { value: 'elevated', label: 'Surélevé' },
          { value: 'outlined', label: 'Contour' },
          { value: 'gradient', label: 'Dégradé' },
          { value: 'glassmorphism', label: 'Verre dépoli' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 7
        }
      },
      {
        name: 'animation',
        label: 'Animation',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'fade',
        description: 'Type d\'animation',
        options: [
          { value: 'none', label: 'Aucune' },
          { value: 'fade', label: 'Fondu' },
          { value: 'slide', label: 'Glissement' },
          { value: 'scale', label: 'Échelle' },
          { value: 'flip', label: 'Rotation' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage',
          order: 8
        }
      }
    ];

    // Add 6 service slots with simple fields
    for (let i = 1; i <= 6; i++) {
      props.push(
        // Service title
        {
          name: `service${i}_title`,
          label: `Service ${i} - Titre`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? servicesDefaults.services[i-1]?.title || '' : '',
          description: `Titre du service ${i}`,
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Service ${i}`,
            order: 1
          }
        },
        // Service icon
        {
          name: `service${i}_icon`,
          label: `Service ${i} - Icône`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? servicesDefaults.services[i-1]?.icon || '' : '',
          description: `Icône du service ${i}`,
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Service ${i}`,
            order: 2,
            placeholder: 'Emoji ou texte court'
          }
        },
        // Service description
        {
          name: `service${i}_description`,
          label: `Service ${i} - Description`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? servicesDefaults.services[i-1]?.description || '' : '',
          description: `Description du service ${i}`,
          editorConfig: {
            control: EditorControl.TEXTAREA,
            group: `Service ${i}`,
            order: 3
          }
        },
        // Service price
        {
          name: `service${i}_price`,
          label: `Service ${i} - Prix`,
          type: PropType.NUMBER,
          required: false,
          defaultValue: i <= 3 ? servicesDefaults.services[i-1]?.pricing?.amount || 0 : 0,
          description: `Prix du service ${i} (0 = pas de prix affiché)`,
          editorConfig: {
            control: EditorControl.NUMBER,
            group: `Service ${i}`,
            order: 4,
            min: 0,
            step: 1
          }
        },
        // Service price period
        {
          name: `service${i}_pricePeriod`,
          label: `Service ${i} - Période prix`,
          type: PropType.SELECT,
          required: false,
          defaultValue: i <= 3 ? servicesDefaults.services[i-1]?.pricing?.period || 'project' : 'project',
          description: `Période pour le prix`,
          options: [
            { value: 'hour', label: 'Par heure' },
            { value: 'day', label: 'Par jour' },
            { value: 'project', label: 'Par projet' },
            { value: 'custom', label: 'Personnalisé' }
          ],
          editorConfig: {
            control: EditorControl.SELECT,
            group: `Service ${i}`,
            order: 5
          }
        },
        // Service custom period
        {
          name: `service${i}_customPeriod`,
          label: `Service ${i} - Période personnalisée`,
          type: PropType.STRING,
          required: false,
          defaultValue: 'm²',
          description: `Texte personnalisé pour la période (ex: m², pièce, etc.)`,
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Service ${i}`,
            order: 6,
            condition: { [`service${i}_pricePeriod`]: 'custom' }
          }
        },
        // Service starting at
        {
          name: `service${i}_startingAt`,
          label: `Service ${i} - À partir de`,
          type: PropType.BOOLEAN,
          required: false,
          defaultValue: true,
          description: `Afficher "À partir de" avant le prix`,
          editorConfig: {
            control: EditorControl.TOGGLE,
            group: `Service ${i}`,
            order: 7
          }
        },
        // Service CTA text
        {
          name: `service${i}_ctaText`,
          label: `Service ${i} - Texte du bouton`,
          type: PropType.STRING,
          required: false,
          defaultValue: 'En savoir plus',
          description: `Texte du bouton d'action`,
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Service ${i}`,
            order: 8
          }
        },
        // Service CTA link
        {
          name: `service${i}_ctaLink`,
          label: `Service ${i} - Lien`,
          type: PropType.STRING,
          required: false,
          defaultValue: '#',
          description: `URL du lien`,
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Service ${i}`,
            order: 9
          }
        },
        // Service features
        {
          name: `service${i}_features`,
          label: `Service ${i} - Caractéristiques`,
          type: PropType.STRING,
          required: false,
          defaultValue: i <= 3 ? (servicesDefaults.services[i-1]?.features || []).join('\n') : '',
          description: `Liste des caractéristiques (une par ligne)`,
          editorConfig: {
            control: EditorControl.TEXTAREA,
            group: `Service ${i}`,
            order: 10,
            placeholder: 'Une caractéristique par ligne'
          }
        },
        // Service featured
        {
          name: `service${i}_featured`,
          label: `Service ${i} - Mise en avant`,
          type: PropType.BOOLEAN,
          required: false,
          defaultValue: i === 1,
          description: `Mettre en avant ce service`,
          editorConfig: {
            control: EditorControl.TOGGLE,
            group: `Service ${i}`,
            order: 11
          }
        },
        // Service category
        {
          name: `service${i}_category`,
          label: `Service ${i} - Catégorie`,
          type: PropType.STRING,
          required: false,
          defaultValue: '',
          description: `Catégorie du service`,
          editorConfig: {
            control: EditorControl.TEXT,
            group: `Service ${i}`,
            order: 12
          }
        }
      );
    }

    return props;
  }

  // Helper method to extract services from flat data structure
  private extractServices(data: any): any[] {
    const services = [];
    
    // Extract up to 6 services from flat structure
    for (let i = 1; i <= 6; i++) {
      const title = data[`service${i}_title`];
      if (title) {
        const features = data[`service${i}_features`] 
          ? data[`service${i}_features`].split('\n').filter((f: string) => f.trim())
          : [];
        
        services.push({
          id: String(i),
          title,
          description: data[`service${i}_description`] || '',
          icon: data[`service${i}_icon`] || '🔧',
          features,
          pricing: {
            enabled: data[`service${i}_price`] > 0,
            amount: data[`service${i}_price`] || 0,
            currency: '€',
            period: data[`service${i}_pricePeriod`] || 'project',
            customPeriod: data[`service${i}_customPeriod`] || '',
            startingAt: data[`service${i}_startingAt`] !== false
          },
          cta: {
            enabled: true,
            text: data[`service${i}_ctaText`] || 'En savoir plus',
            link: data[`service${i}_ctaLink`] || '#',
            style: 'link' as const
          },
          featured: data[`service${i}_featured`] || false,
          category: data[`service${i}_category`] || ''
        });
      }
    }
    
    return services;
  }

  render(data: ServicesData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    // Check if we have flat data structure or already have services array
    const hasServicesArray = data.services && Array.isArray(data.services) && data.services.length > 0;
    const extractedServices = hasServicesArray ? data.services : this.extractServices(data);
    
    // Create normalized data with extracted services
    const normalizedData = {
      ...data,
      services: extractedServices,
      visualVariant: (data as any).visualVariant || 'modern',
      // Ensure display options are properly set
      display: {
        ...servicesDefaults.display,
        ...(data.display || {}),
        showPricing: (data as any).showPricing !== false,
        pricingStyle: (data as any).pricingStyle || 'simple',
        showIcon: (data as any).showIcon !== false,
        iconStyle: (data as any).iconStyle || 'filled',
        showFeatures: (data as any).showFeatures !== false,
        featuresStyle: (data as any).featuresStyle || 'list',
        cardStyle: (data as any).cardStyle || 'elevated',
        animation: (data as any).animation || 'fade'
      },
      layout: {
        ...servicesDefaults.layout,
        ...(data.layout || {}),
        columns: (data as any).columns || 3,
        gap: (data as any).gap || 'lg'
      }
    };
    
    // Extract theme colors and typography
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fonts?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fonts?.body || 'Inter, system-ui, sans-serif';
    const visualVariant = normalizedData.visualVariant || 'modern';
    
    logger.info('ServicesRendererV3PerfectEnhanced', 'render', '🎨 Début du rendu Services parfait', {
      variant: normalizedData.variant,
      visualVariant,
      servicesCount: normalizedData.services.length,
      theme: {
        primaryColor,
        secondaryColor,
        fontHeading,
        fontBody
      }
    });

    try {
      const html = `
<section class="services services--${normalizedData.variant} services--visual-${visualVariant} ${normalizedData.display.animation !== 'none' ? 'services--animated' : ''}">
  <div class="services__container">
    ${this.renderHeader(normalizedData)}
    ${this.renderServices(normalizedData)}
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

      logger.info('ServicesRendererV3PerfectEnhanced', 'render', '✅ Rendu Services parfait terminé');
      return result;

    } catch (error) {
      logger.error('ServicesRendererV3PerfectEnhanced', 'render', '❌ Erreur lors du rendu', error as Error);
      return this.renderFallback(data);
    }
  }

  private generateCSS(data: any, theme?: any): string {
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fonts?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fonts?.body || 'Inter, system-ui, sans-serif';
    const visualVariant = data.visualVariant || 'modern';
    
    // Visual variant styles
    const variantStyles: any = {
      modern: {
        gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        shadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        hoverShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        borderRadius: '1.5rem'
      },
      minimal: {
        gradient: 'none',
        shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        hoverShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem'
      },
      bold: {
        gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        hoverShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        borderRadius: '2rem'
      },
      elegant: {
        gradient: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
        shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        hoverShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
        borderRadius: '1rem'
      }
    };
    
    const currentVariant = variantStyles[visualVariant];
    
    return `
/* ========================================
   SERVICES V3 PERFECT ENHANCED - Styles avec thème
   ======================================== */

/* Variables CSS du thème */
:root {
  --services-primary: ${primaryColor};
  --services-secondary: ${secondaryColor};
  --services-font-heading: ${fontHeading};
  --services-font-body: ${fontBody};
  --services-gradient: ${currentVariant.gradient};
  --services-shadow: ${currentVariant.shadow};
  --services-hover-shadow: ${currentVariant.hoverShadow};
  --services-border-radius: ${currentVariant.borderRadius};
}

.services {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  font-family: var(--services-font-body);
}

.services__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.services__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.services__title {
  font-family: var(--services-font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--services-primary);
}

.services--visual-modern .services__title {
  background: var(--services-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.services__description {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
}

/* Base grid styles */
.services__grid {
  display: grid;
  grid-template-columns: repeat(${data.layout.columns || 3}, 1fr);
  gap: ${data.layout.gap === 'sm' ? '1rem' : data.layout.gap === 'xl' ? '4rem' : data.layout.gap === 'md' ? '1.5rem' : '2rem'};
}

/* Service card base */
.service {
  position: relative;
  background: white;
  border-radius: var(--services-border-radius);
  padding: 2.5rem;
  box-shadow: var(--services-shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.service:hover {
  transform: translateY(-8px);
  box-shadow: var(--services-hover-shadow);
}

/* Visual variants specific styles */
.services--visual-elegant .service {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.services--visual-minimal .service {
  border: 1px solid #e5e7eb;
}

.services--visual-bold .service {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Card styles */
.service--flat {
  box-shadow: none;
  background: #f9fafb;
}

.service--outlined {
  box-shadow: none;
  border: 2px solid #e5e7eb;
}

.service--gradient {
  background: var(--services-gradient);
  color: white;
}

.service--glassmorphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Featured service */
.service--featured {
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: var(--services-gradient);
  color: white;
}

.service--featured .service__title,
.service--featured .service__description,
.service--featured .service__price,
.service--featured .service__features li,
.service--featured .service__link {
  color: white;
}

/* Icons */
.service__icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  display: ${data.display.showIcon === false ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  border-radius: 1rem;
}

.service__icon--filled {
  background: var(--services-gradient);
  color: white;
}

.service__icon--outline {
  border: 3px solid var(--services-primary);
  color: var(--services-primary);
}

.service__icon--gradient {
  background: var(--services-gradient);
  color: white;
}

.service__icon--shadow {
  background: white;
  color: var(--services-primary);
  box-shadow: 0 10px 30px -5px rgba(102, 126, 234, 0.4);
}

.service__icon--3d {
  background: var(--services-gradient);
  color: white;
  transform: perspective(100px) rotateX(10deg);
  box-shadow: 0 20px 40px -10px rgba(102, 126, 234, 0.5);
}

/* Typography */
.service__title {
  font-family: var(--services-font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  line-height: 1.3;
}

.service__description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

/* Pricing */
.service__price {
  display: ${data.display.showPricing === false ? 'none' : 'flex'};
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  font-family: var(--services-font-heading);
}

.service__price--simple {
  font-size: 1.25rem;
  color: var(--services-primary);
  font-weight: 600;
}

.service__price--badge {
  display: inline-flex;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--services-primary);
}

.service__price--prominent {
  font-size: 2rem;
  font-weight: 800;
  background: var(--services-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.service__price-prefix {
  font-size: 0.875em;
  opacity: 0.7;
  font-weight: normal;
}

.service__price-amount {
  font-weight: 800;
}

.service__price-currency {
  font-size: 0.875em;
  margin-left: 0.125rem;
}

.service__price-period {
  font-size: 0.875em;
  opacity: 0.7;
  font-weight: normal;
}

/* Features */
.service__features {
  display: ${data.display.showFeatures === false ? 'none' : 'block'};
  margin-bottom: 1.5rem;
}

.service__features--list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service__features--list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-size: 0.95rem;
}

.service__features--list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--services-primary);
  font-weight: bold;
}

.service__features--tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service__features--tags .feature-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #4b5563;
}

.service__features--grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  font-size: 0.875rem;
}

/* Links */
.service__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--services-primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  margin-top: auto;
}

.service__link:hover {
  gap: 0.75rem;
  color: var(--services-secondary);
}

.service__link-icon {
  transition: transform 0.3s;
}

.service__link:hover .service__link-icon {
  transform: translateX(4px);
}

/* Variant: List Detailed */
.services--list-detailed .services__grid {
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
}

.services--list-detailed .service {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.services--list-detailed .service__icon {
  margin: 0;
}

.services--list-detailed .service__content {
  flex: 1;
}

.services--list-detailed .service__price {
  margin: 0;
  text-align: right;
}

/* Variant: Carousel Modern */
.services--carousel-modern .services__carousel {
  position: relative;
  overflow: hidden;
}

.services--carousel-modern .carousel__track {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
}

.services--carousel-modern .carousel__slide {
  flex: 0 0 calc(33.333% - 1.333rem);
  min-width: 0;
}

.services--carousel-modern .carousel__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
}

.services--carousel-modern .carousel__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid var(--services-primary);
  border-radius: 50%;
  background: white;
  color: var(--services-primary);
  cursor: pointer;
  transition: all 0.3s;
}

.services--carousel-modern .carousel__btn:hover {
  background: var(--services-primary);
  color: white;
}

.services--carousel-modern .carousel__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variant: Masonry Creative */
.services--masonry-creative .services__grid {
  grid-auto-flow: dense;
}

.services--masonry-creative .service:nth-child(3n+1) {
  grid-row: span 2;
}

.services--masonry-creative .service:nth-child(5n+2) {
  grid-column: span 2;
}

/* Variant: Tabs Organized */
.services--tabs-organized .services__tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0;
}

.services--tabs-organized .tab {
  position: relative;
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  color: #6b7280;
}

.services--tabs-organized .tab::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--services-gradient);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.services--tabs-organized .tab:hover {
  color: var(--services-primary);
}

.services--tabs-organized .tab.active {
  color: var(--services-primary);
}

.services--tabs-organized .tab.active::after {
  transform: scaleX(1);
}

.services--tabs-organized .tab__content {
  display: none;
}

.services--tabs-organized .tab__content.active {
  display: grid;
  grid-template-columns: repeat(${data.layout.columns || 3}, 1fr);
  gap: ${data.layout.gap === 'sm' ? '1rem' : data.layout.gap === 'xl' ? '4rem' : data.layout.gap === 'md' ? '1.5rem' : '2rem'};
  animation: tabContentFade 0.5s ease-out;
}

@keyframes tabContentFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Variant: Accordion Compact */
.services--accordion-compact .services__grid {
  display: block;
  max-width: 800px;
  margin: 0 auto;
}

.services--accordion-compact .service {
  margin-bottom: 1rem;
  cursor: pointer;
}

.services--accordion-compact .service__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: white;
  border-radius: var(--services-border-radius);
  transition: all 0.3s;
}

.services--accordion-compact .service__header:hover {
  background: #f9fafb;
}

.services--accordion-compact .service__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.services--accordion-compact .service--expanded .service__content {
  max-height: 500px;
  padding: 0 1.5rem 1.5rem;
}

.services--accordion-compact .service__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  transition: all 0.3s;
}

.services--accordion-compact .service--expanded .service__toggle {
  transform: rotate(180deg);
  background: var(--services-primary);
  color: white;
}

/* Variant: Timeline Process */
.services--timeline-process .services__grid {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  grid-template-columns: 1fr;
}

.services--timeline-process .services__grid::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--services-gradient);
}

.services--timeline-process .service {
  margin-left: 80px;
  position: relative;
}

.services--timeline-process .service__number {
  position: absolute;
  left: -50px;
  top: 30px;
  width: 40px;
  height: 40px;
  background: white;
  border: 4px solid var(--services-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--services-primary);
}

/* Variant: Hexagon Tech */
.services--hexagon-tech .services__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.services--hexagon-tech .service {
  width: 300px;
  height: 350px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--services-gradient);
  color: white;
  transition: all 0.3s;
}

.services--hexagon-tech .service:hover {
  transform: scale(1.1) rotate(5deg);
}

.services--hexagon-tech .service__title,
.services--hexagon-tech .service__description,
.services--hexagon-tech .service__price {
  color: white;
}

/* Animations */
.services--animated .service {
  opacity: 0;
  animation: servicesFadeIn 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes servicesFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .services--carousel-modern .carousel__slide {
    flex: 0 0 calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .services {
    padding: 4rem 0;
  }
  
  .services__grid {
    grid-template-columns: 1fr;
  }
  
  .services--carousel-modern .carousel__slide {
    flex: 0 0 100%;
  }
  
  .services--list-detailed .service {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .services--list-detailed .service__icon {
    margin: 0 auto 1rem;
  }
  
  .services--list-detailed .service__price {
    text-align: center;
  }
  
  .services--hexagon-tech .service {
    width: 250px;
    height: 300px;
  }
}

/* Dark theme support */
[data-theme="dark"] .services {
  background: #0f0f0f;
}

[data-theme="dark"] .service {
  background: #1a1a1a;
  color: #e5e7eb;
}

[data-theme="dark"] .service__title {
  color: #f9fafb;
}

[data-theme="dark"] .service__description {
  color: #9ca3af;
}

[data-theme="dark"] .service__features--list li {
  color: #d1d5db;
}

[data-theme="dark"] .services--accordion-compact .service__header {
  background: #1a1a1a;
}

[data-theme="dark"] .services--accordion-compact .service__header:hover {
  background: #262626;
}
`;
  }

  private renderHeader(data: any): string {
    if (!data.title && !data.subtitle && !data.description) return '';

    return `
    <div class="services__header">
      ${data.title ? `<h2 class="services__title">${data.title}</h2>` : ''}
      ${data.subtitle ? `<p class="services__subtitle">${data.subtitle}</p>` : ''}
      ${data.description ? `<p class="services__description">${data.description}</p>` : ''}
    </div>`;
  }

  private renderServices(data: any): string {
    switch (data.variant) {
      case 'list-detailed':
        return this.renderListDetailed(data);
      case 'carousel-modern':
        return this.renderCarousel(data);
      case 'tabs-organized':
        return this.renderTabs(data);
      case 'accordion-compact':
        return this.renderAccordion(data);
      case 'timeline-process':
        return this.renderTimeline(data);
      case 'hexagon-tech':
        return this.renderHexagon(data);
      case 'masonry-creative':
        return this.renderMasonry(data);
      default:
        return this.renderGrid(data);
    }
  }

  private renderGrid(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service service--${data.display.cardStyle} ${service.featured ? 'service--featured' : ''}" style="--index: ${index};">
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private renderServiceContent(service: any, data: any): string {
    const parts: string[] = [];

    // Icon
    if (data.display.showIcon !== false && service.icon) {
      parts.push(`<div class="service__icon service__icon--${data.display.iconStyle}">${service.icon}</div>`);
    }

    // Title
    parts.push(`<h3 class="service__title">${service.title}</h3>`);

    // Description
    if (service.description) {
      parts.push(`<p class="service__description">${service.description}</p>`);
    }

    // Price
    if (data.display.showPricing !== false && service.pricing?.enabled && service.pricing.amount > 0) {
      const priceClass = `service__price service__price--${data.display.pricingStyle}`;
      const periodText = service.pricing.period === 'hour' ? '/heure' :
                        service.pricing.period === 'day' ? '/jour' :
                        service.pricing.period === 'custom' ? `/${service.pricing.customPeriod}` :
                        '';
      
      parts.push(`
        <div class="${priceClass}">
          ${service.pricing.startingAt ? '<span class="service__price-prefix">À partir de</span>' : ''}
          <span class="service__price-amount">${service.pricing.amount}</span>
          <span class="service__price-currency">${service.pricing.currency || '€'}</span>
          ${periodText ? `<span class="service__price-period">${periodText}</span>` : ''}
        </div>
      `);
    }

    // Features
    if (data.display.showFeatures !== false && service.features && service.features.length > 0) {
      const featuresClass = `service__features service__features--${data.display.featuresStyle}`;
      
      if (data.display.featuresStyle === 'tags') {
        parts.push(`
          <div class="${featuresClass}">
            ${service.features.map((feature: string) => `
              <span class="feature-tag">${feature}</span>
            `).join('')}
          </div>
        `);
      } else if (data.display.featuresStyle === 'grid') {
        parts.push(`
          <div class="${featuresClass}">
            ${service.features.slice(0, data.display.maxFeatures || 4).map((feature: string) => `
              <div>${feature}</div>
            `).join('')}
          </div>
        `);
      } else {
        parts.push(`
          <ul class="${featuresClass}">
            ${service.features.slice(0, data.display.maxFeatures || 4).map((feature: string) => `
              <li>${feature}</li>
            `).join('')}
          </ul>
        `);
      }
    }

    // CTA
    if (service.cta?.enabled && service.cta.text) {
      parts.push(`
        <a href="${service.cta.link || '#'}" class="service__link">
          ${service.cta.text}
          <span class="service__link-icon">→</span>
        </a>
      `);
    }

    return parts.join('\n');
  }

  private renderListDetailed(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service service--${data.display.cardStyle}" style="--index: ${index};">
        ${data.display.showIcon !== false && service.icon ? 
          `<div class="service__icon service__icon--${data.display.iconStyle}">${service.icon}</div>` : ''
        }
        <div class="service__content">
          <h3 class="service__title">${service.title}</h3>
          ${service.description ? `<p class="service__description">${service.description}</p>` : ''}
        </div>
        ${data.display.showPricing !== false && service.pricing?.enabled && service.pricing.amount > 0 ? `
          <div class="service__price service__price--${data.display.pricingStyle}">
            ${service.pricing.startingAt ? '<span class="service__price-prefix">À partir de</span>' : ''}
            <span class="service__price-amount">${service.pricing.amount}</span>
            <span class="service__price-currency">${service.pricing.currency || '€'}</span>
            ${service.pricing.period === 'hour' ? '<span class="service__price-period">/h</span>' : ''}
          </div>
        ` : ''}
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private renderCarousel(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service carousel__slide service--${data.display.cardStyle}" style="--index: ${index};">
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `
    <div class="services__carousel">
      <div class="carousel__track">
        ${services}
      </div>
      <div class="carousel__nav">
        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button class="carousel__btn carousel__btn--next" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>`;
  }

  private renderTabs(data: any): string {
    // Group services by category
    const categories = new Map<string, any[]>();
    
    data.services.forEach((service: any) => {
      const category = service.category || 'general';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(service);
    });

    const tabs = Array.from(categories.entries()).map(([category, services], index) => `
      <button class="tab ${index === 0 ? 'active' : ''}" data-tab="${category}">
        ${category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    `).join('');

    const contents = Array.from(categories.entries()).map(([category, services], index) => `
      <div class="tab__content ${index === 0 ? 'active' : ''}" data-content="${category}">
        ${services.map((service: any, serviceIndex: number) => `
          <div class="service service--${data.display.cardStyle}" style="--index: ${serviceIndex};">
            ${this.renderServiceContent(service, data)}
          </div>
        `).join('')}
      </div>
    `).join('');

    return `
    <div class="services__tabs-container">
      <div class="services__tabs">${tabs}</div>
      <div class="services__content">${contents}</div>
    </div>`;
  }

  private renderAccordion(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service" style="--index: ${index};">
        <div class="service__header">
          <div class="service__header-content">
            ${data.display.showIcon !== false && service.icon ? 
              `<div class="service__icon service__icon--${data.display.iconStyle}">${service.icon}</div>` : ''
            }
            <h3 class="service__title">${service.title}</h3>
          </div>
          <div class="service__toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
        <div class="service__content">
          ${service.description ? `<p class="service__description">${service.description}</p>` : ''}
          ${this.renderServiceContent(service, data)}
        </div>
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private renderTimeline(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service" style="--index: ${index};">
        <div class="service__number">${index + 1}</div>
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private renderHexagon(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service" style="--index: ${index};">
        ${data.display.showIcon !== false && service.icon ? 
          `<div class="service__icon">${service.icon}</div>` : ''
        }
        <h3 class="service__title">${service.title}</h3>
        ${service.description ? `<p class="service__description">${service.description.substring(0, 100)}...</p>` : ''}
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private renderMasonry(data: any): string {
    const services = data.services.map((service: any, index: number) => `
      <div class="service service--${data.display.cardStyle} ${service.featured ? 'service--featured' : ''}" style="--index: ${index};">
        ${this.renderServiceContent(service, data)}
      </div>
    `).join('');

    return `<div class="services__grid">${services}</div>`;
  }

  private generateJS(data: any): string {
    const js: string[] = [];

    // Carousel functionality
    if (data.variant === 'carousel-modern') {
      js.push(`
// Carousel functionality for services
(function() {
  const carousel = document.querySelector('.services--carousel-modern');
  if (!carousel) return;
  
  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');
  
  let currentIndex = 0;
  const slidesPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
  const maxIndex = Math.max(0, slides.length - slidesPerView);
  
  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(track).gap);
    track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
    
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
  
  // Initialize
  updateCarousel();
})();`);
    }

    // Tabs functionality
    if (data.variant === 'tabs-organized') {
      js.push(`
// Tabs functionality for services
(function() {
  const tabs = document.querySelectorAll('.services--tabs-organized .tab');
  const contents = document.querySelectorAll('.services--tabs-organized .tab__content');
  
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      contents.forEach(content => content.classList.remove('active'));
      const targetContent = document.querySelector('.tab__content[data-content="' + tab.dataset.tab + '"]');
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
})();`);
    }

    // Accordion functionality
    if (data.variant === 'accordion-compact') {
      js.push(`
// Accordion functionality for services
(function() {
  const services = document.querySelectorAll('.services--accordion-compact .service');
  
  services.forEach(service => {
    const header = service.querySelector('.service__header');
    
    header?.addEventListener('click', () => {
      const isExpanded = service.classList.contains('service--expanded');
      
      // Close all other services
      services.forEach(s => s.classList.remove('service--expanded'));
      
      // Toggle current service
      if (!isExpanded) {
        service.classList.add('service--expanded');
      }
    });
  });
})();`);
    }

    return js.join('\n\n');
  }

  private renderFallback(data: ServicesData): RenderResult {
    return {
      html: `
<section class="services services--fallback">
  <div class="services__container">
    <h2>${data.title || 'Nos Services'}</h2>
    <div class="services__grid">
      ${data.services.map(s => `
        <div class="service">
          <h3>${s.title}</h3>
          <p>${s.description || ''}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>`,
      css: '',
      js: '',
      assets: [],
      errors: [{
        blockId: 'services',
        message: 'Erreur lors du rendu',
        fallbackUsed: true
      }],
      warnings: []
    };
  }

  renderPreview(data: ServicesData): string {
    const visualVariant = (data as any).visualVariant || 'modern';
    return `
<div class="services-preview services--${data.variant} services--visual-${visualVariant}">
  <h3>${data.title || 'Services'}</h3>
  <div class="services-preview__grid">
    ${data.services.slice(0, 3).map(s => `
      <div class="service-mini">
        ${s.icon ? `<span>${typeof s.icon === 'object' ? s.icon.value : s.icon}</span>` : ''}
        <span>${s.title}</span>
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
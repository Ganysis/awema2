/**
 * Adaptateur V2 vers V3 - Conversion automatique avec logs détaillés
 */

import { BlockData } from '../types';
import { logger } from '../core/logger';

export interface V2Block {
  id?: string;
  type: string;
  props?: any;
  [key: string]: any;
}

export interface V2Project {
  id?: string;
  name?: string;
  pages?: any[];
  blocks?: V2Block[];
  settings?: any;
  theme?: any;
  businessInfo?: any;
  globalHeader?: V2Block;
  globalFooter?: V2Block;
  [key: string]: any;
}

export class V2ToV3Adapter {
  private static instance: V2ToV3Adapter;
  private conversionMap: Map<string, string> = new Map();
  private transformers: Map<string, (v2: any) => any> = new Map();

  constructor() {
    logger.info('V2ToV3Adapter', 'constructor', '🔄 Initialisation de l\'adaptateur V2→V3');
    this.initializeConversionMap();
    this.initializeTransformers();
  }

  static getInstance(): V2ToV3Adapter {
    if (!V2ToV3Adapter.instance) {
      V2ToV3Adapter.instance = new V2ToV3Adapter();
    }
    return V2ToV3Adapter.instance;
  }

  /**
   * Map des types V2 vers V3
   */
  private initializeConversionMap(): void {
    logger.debug('V2ToV3Adapter', 'initializeConversionMap', '📋 Initialisation de la map de conversion');
    
    // Map des types de blocs V2 → V3
    this.conversionMap.set('hero', 'hero-ultra-modern');
    this.conversionMap.set('hero-ultra-modern', 'hero-ultra-modern');
    this.conversionMap.set('header', 'header-ultra-modern');
    this.conversionMap.set('header-ultra-modern', 'header-ultra-modern');
    this.conversionMap.set('footer', 'footer-ultra-modern');
    this.conversionMap.set('footer-ultra-modern', 'footer-ultra-modern');
    this.conversionMap.set('contact', 'contact-ultra-modern');
    this.conversionMap.set('contact-ultra-modern', 'contact-ultra-modern');
    this.conversionMap.set('features', 'features-ultra-modern');
    this.conversionMap.set('features-ultra-modern', 'features-ultra-modern');
    this.conversionMap.set('gallery', 'gallery-ultra-modern');
    this.conversionMap.set('gallery-ultra-modern', 'gallery-ultra-modern');
    this.conversionMap.set('faq', 'faq-ultra-modern');
    this.conversionMap.set('faq-ultra-modern', 'faq-ultra-modern');
    this.conversionMap.set('pricing', 'pricing-ultra-modern');
    this.conversionMap.set('pricing-ultra-modern', 'pricing-ultra-modern');
    this.conversionMap.set('cta', 'cta-ultra-modern');
    this.conversionMap.set('cta-ultra-modern', 'cta-ultra-modern');
    this.conversionMap.set('content', 'content-ultra-modern');
    this.conversionMap.set('content-ultra-modern', 'content-ultra-modern');
    this.conversionMap.set('testimonials', 'testimonials-ultra-modern');
    this.conversionMap.set('testimonials-ultra-modern', 'testimonials-ultra-modern');
    this.conversionMap.set('services', 'services-ultra-modern');
    
    logger.info('V2ToV3Adapter', 'initializeConversionMap', `✅ ${this.conversionMap.size} types mappés`);
  }

  /**
   * Transformateurs spécifiques par type
   */
  private initializeTransformers(): void {
    logger.debug('V2ToV3Adapter', 'initializeTransformers', '🔧 Initialisation des transformateurs');
    
    // Hero transformer
    this.transformers.set('hero-ultra-modern', (v2: any) => {
      logger.debug('V2ToV3Adapter', 'transformHero', 'Transformation Hero V2→V3', { v2 });
      
      return {
        variant: v2.variant || 'gradient-wave',
        layout: v2.layout || 'center',
        height: v2.height || 'large',
        eyebrow: v2.eyebrow,
        title: v2.title || 'Titre par défaut',
        subtitle: v2.subtitle,
        description: v2.description,
        primaryButton: this.transformButton(v2.primaryButton),
        secondaryButton: this.transformButton(v2.secondaryButton),
        image: this.transformImage(v2.image),
        background: this.transformBackground(v2.background),
        badges: v2.badges || [],
        stats: v2.stats || [],
        features: v2.features || {},
        titleAnimation: v2.titleAnimation || 'fade-in'
      };
    });

    // Contact transformer
    this.transformers.set('contact-ultra-modern', (v2: any) => {
      logger.debug('V2ToV3Adapter', 'transformContact', 'Transformation Contact V2→V3', { v2 });
      
      return {
        variant: v2.variant || 'gradient-wave',
        layout: v2.layout || 'split-right',
        title: v2.title || 'Contactez-nous',
        subtitle: v2.subtitle,
        description: v2.description,
        contactInfo: {
          phone: v2.phone || v2.contactInfo?.phone,
          email: v2.email || v2.contactInfo?.email,
          address: v2.address || v2.contactInfo?.address,
          hours: v2.hours || v2.contactInfo?.hours
        },
        form: this.transformContactForm(v2.form || v2),
        map: this.transformMap(v2.map || v2)
      };
    });

    // Header transformer
    this.transformers.set('header-ultra-modern', (v2: any) => {
      logger.debug('V2ToV3Adapter', 'transformHeader', 'Transformation Header V2→V3', { v2 });
      
      return {
        variant: v2.variant || 'minimal-float',
        logo: {
          type: v2.logo?.type || 'text',
          text: v2.logo?.text || v2.businessName || 'Mon Entreprise',
          image: this.transformImage(v2.logo?.image),
          size: v2.logo?.size || 'md',
          link: v2.logo?.link || '/'
        },
        navigation: {
          items: this.transformMenuItems(v2.menuItems || v2.navigation?.items || []),
          alignment: v2.navigation?.alignment || 'right',
          style: v2.navigation?.style || 'links',
          mobileStyle: v2.navigation?.mobileStyle || 'drawer',
          mobileBreakpoint: v2.navigation?.mobileBreakpoint || 768
        },
        actions: {
          enabled: v2.actions?.enabled !== false,
          items: (v2.actions?.items || v2.ctaButtons || []).map(this.transformButton)
        },
        search: {
          enabled: v2.search?.enabled || false,
          placeholder: v2.search?.placeholder || 'Rechercher...',
          style: v2.search?.style || 'modal',
          hotkey: v2.search?.hotkey || 'cmd+k'
        },
        darkMode: {
          enabled: v2.darkMode?.enabled || false,
          style: v2.darkMode?.style || 'toggle',
          defaultMode: v2.darkMode?.defaultMode || 'system'
        },
        languageSelector: {
          enabled: v2.languageSelector?.enabled || false,
          style: v2.languageSelector?.style || 'dropdown',
          languages: v2.languageSelector?.languages || [{ code: 'fr', label: 'Français' }]
        },
        behavior: {
          sticky: v2.sticky !== false,
          hideOnScroll: v2.hideOnScroll || false,
          transparent: v2.transparent || false,
          shrinkOnScroll: v2.shrinkOnScroll !== false,
          showTopBar: v2.showTopBar || false,
          animateOnScroll: v2.animateOnScroll !== false
        },
        topBar: {
          enabled: v2.topBar?.enabled || false,
          content: v2.topBar?.content || '',
          style: v2.topBar?.style || 'info',
          dismissible: v2.topBar?.dismissible !== false
        },
        styles: {
          height: v2.styles?.height || 'md',
          padding: v2.styles?.padding || 'md',
          backgroundColor: v2.styles?.backgroundColor,
          textColor: v2.styles?.textColor,
          borderBottom: v2.styles?.borderBottom !== false,
          shadow: v2.styles?.shadow || 'sm',
          blur: v2.styles?.blur || false
        }
      };
    });

    // Footer transformer
    this.transformers.set('footer-ultra-modern', (v2: any) => {
      logger.debug('V2ToV3Adapter', 'transformFooter', 'Transformation Footer V2→V3', { v2 });
      
      return {
        variant: v2.variant || 'minimal-elegant',
        layout: {
          columns: v2.columns?.length || 4,
          alignment: v2.layout?.alignment || 'left',
          containerWidth: v2.layout?.containerWidth || 'normal'
        },
        company: {
          name: v2.companyName || v2.company?.name || 'Mon Entreprise',
          logo: this.transformImage(v2.logo || v2.company?.logo),
          description: v2.description || v2.company?.description,
          showLogo: v2.showLogo !== false
        },
        columns: this.transformFooterColumns(v2.columns || []),
        social: {
          enabled: v2.social?.enabled !== false,
          title: v2.social?.title,
          links: this.transformSocialLinks(v2.socialLinks || v2.social?.links || []),
          style: v2.social?.style || 'icons',
          position: v2.social?.position || 'bottom'
        },
        newsletter: {
          enabled: v2.newsletter?.enabled || false,
          title: v2.newsletter?.title || 'Newsletter',
          description: v2.newsletter?.description || 'Restez informé',
          placeholder: v2.newsletter?.placeholder || 'Votre email',
          buttonText: v2.newsletter?.buttonText || 'S\'inscrire',
          style: v2.newsletter?.style || 'inline',
          webhookUrl: v2.newsletter?.webhookUrl,
          successMessage: v2.newsletter?.successMessage || 'Merci !',
          errorMessage: v2.newsletter?.errorMessage || 'Erreur !'
        },
        widgets: v2.widgets || [],
        bottomBar: {
          enabled: v2.bottomBar?.enabled !== false,
          copyright: v2.copyright || v2.bottomBar?.copyright || `© ${new Date().getFullYear()} Mon Entreprise`,
          links: this.transformFooterLinks(v2.legalLinks || v2.bottomBar?.links || []),
          style: v2.bottomBar?.style || 'simple',
          showBackToTop: v2.bottomBar?.showBackToTop !== false
        },
        contactInfo: {
          enabled: v2.contactInfo?.enabled !== false,
          phone: v2.phone || v2.contactInfo?.phone,
          email: v2.email || v2.contactInfo?.email,
          address: v2.address || v2.contactInfo?.address,
          hours: v2.hours || v2.contactInfo?.hours
        },
        paymentMethods: {
          enabled: v2.paymentMethods?.enabled || false,
          title: v2.paymentMethods?.title || 'Moyens de paiement',
          methods: v2.paymentMethods?.methods || []
        },
        certifications: {
          enabled: v2.certifications?.enabled || false,
          title: v2.certifications?.title || 'Certifications',
          items: v2.certifications?.items || []
        },
        styles: {
          backgroundColor: v2.styles?.backgroundColor,
          textColor: v2.styles?.textColor,
          accentColor: v2.styles?.accentColor,
          padding: v2.styles?.padding || 'lg',
          borderTop: v2.styles?.borderTop !== false,
          borderStyle: v2.styles?.borderStyle || 'solid'
        }
      };
    });

    logger.info('V2ToV3Adapter', 'initializeTransformers', `✅ ${this.transformers.size} transformateurs créés`);
  }

  /**
   * Convertit un bloc V2 en BlockData V3
   */
  convertBlock(v2Block: V2Block): BlockData | null {
    const startTime = performance.now();
    logger.info('V2ToV3Adapter', 'convertBlock', `🔄 Conversion bloc V2→V3: ${v2Block.type}`, {
      id: v2Block.id,
      type: v2Block.type,
      hasProps: !!v2Block.props
    });
    
    try {
      // 1. Déterminer le type V3
      const v3Type = this.conversionMap.get(v2Block.type);
      if (!v3Type) {
        logger.warn('V2ToV3Adapter', 'convertBlock', `⚠️ Type non mappé: ${v2Block.type}`);
        return null;
      }
      
      // 2. Obtenir le transformateur
      const transformer = this.transformers.get(v3Type);
      const v2Data = v2Block.props || v2Block;
      
      // 3. Transformer les données
      let v3Data;
      if (transformer) {
        logger.debug('V2ToV3Adapter', 'convertBlock', `🔧 Application du transformateur: ${v3Type}`);
        v3Data = transformer(v2Data);
      } else {
        logger.warn('V2ToV3Adapter', 'convertBlock', `⚠️ Pas de transformateur pour: ${v3Type}, copie directe`);
        v3Data = { ...v2Data };
      }
      
      // 4. Créer le BlockData V3
      const blockData: BlockData = {
        meta: {
          id: v2Block.id || this.generateId(),
          type: v3Type,
          version: '3.0.0',
          created: new Date(),
          modified: new Date(),
          validationStatus: 'valid',
          source: 'v2-adapter'
        },
        data: v3Data
      };
      
      logger.info('V2ToV3Adapter', 'convertBlock', `✅ Bloc converti: ${v2Block.type} → ${v3Type}`, {
        duration: performance.now() - startTime,
        dataKeys: Object.keys(v3Data)
      });
      
      logger.performance('V2ToV3Adapter', 'convertBlock', startTime);
      return blockData;
      
    } catch (error) {
      logger.error('V2ToV3Adapter', 'convertBlock', `❌ Erreur lors de la conversion: ${v2Block.type}`, error as Error);
      return null;
    }
  }

  /**
   * Convertit un projet V2 complet
   */
  convertProject(v2Project: V2Project): {
    blocks: BlockData[];
    metadata: any;
  } {
    const startTime = performance.now();
    logger.info('V2ToV3Adapter', 'convertProject', '📦 Conversion projet V2→V3', {
      projectName: v2Project.name,
      pagesCount: v2Project.pages?.length || 0,
      blocksCount: v2Project.blocks?.length || 0,
      hasGlobalHeader: !!v2Project.globalHeader,
      hasGlobalFooter: !!v2Project.globalFooter
    });
    
    const blocks: BlockData[] = [];
    const errors: any[] = [];
    
    try {
      // 1. Convertir le header global
      if (v2Project.globalHeader) {
        logger.debug('V2ToV3Adapter', 'convertProject', '📌 Conversion du header global');
        const header = this.convertBlock(v2Project.globalHeader);
        if (header) blocks.push(header);
        else errors.push({ type: 'header', error: 'Conversion échouée' });
      }
      
      // 2. Convertir les blocs de la page principale
      const mainPage = v2Project.pages?.find(p => p.slug === '/') || v2Project.pages?.[0];
      if (mainPage?.blocks) {
        logger.debug('V2ToV3Adapter', 'convertProject', `📄 Conversion de ${mainPage.blocks.length} blocs de la page principale`);
        
        mainPage.blocks.forEach((block: V2Block, index: number) => {
          const converted = this.convertBlock(block);
          if (converted) {
            blocks.push(converted);
            logger.debug('V2ToV3Adapter', 'convertProject', `✅ Bloc ${index + 1}/${mainPage.blocks.length} converti`);
          } else {
            errors.push({ type: block.type, index, error: 'Conversion échouée' });
            logger.warn('V2ToV3Adapter', 'convertProject', `⚠️ Bloc ${index + 1} non converti: ${block.type}`);
          }
        });
      }
      
      // 3. Convertir le footer global
      if (v2Project.globalFooter) {
        logger.debug('V2ToV3Adapter', 'convertProject', '📌 Conversion du footer global');
        const footer = this.convertBlock(v2Project.globalFooter);
        if (footer) blocks.push(footer);
        else errors.push({ type: 'footer', error: 'Conversion échouée' });
      }
      
      // 4. Créer les métadonnées
      const metadata = {
        name: v2Project.name || 'Projet converti',
        theme: this.convertTheme(v2Project.theme),
        businessInfo: v2Project.businessInfo || {},
        pages: v2Project.pages || [],
        conversionInfo: {
          date: new Date(),
          source: 'v2',
          version: '3.0.0',
          blocksConverted: blocks.length,
          errors: errors
        }
      };
      
      logger.info('V2ToV3Adapter', 'convertProject', `✅ Projet converti avec succès`, {
        blocksConverted: blocks.length,
        errorsCount: errors.length,
        duration: performance.now() - startTime
      });
      
      if (errors.length > 0) {
        logger.warn('V2ToV3Adapter', 'convertProject', `⚠️ ${errors.length} erreurs lors de la conversion`, errors);
      }
      
      logger.performance('V2ToV3Adapter', 'convertProject', startTime);
      
      return { blocks, metadata };
      
    } catch (error) {
      logger.error('V2ToV3Adapter', 'convertProject', '❌ Erreur critique lors de la conversion du projet', error as Error);
      throw error;
    }
  }

  /**
   * Convertit un thème V2 en V3
   */
  private convertTheme(v2Theme: any): any {
    if (!v2Theme) {
      return {
        colors: {
          primary: '#3b82f6',
          secondary: '#10b981'
        }
      };
    }
    
    return {
      colors: {
        primary: v2Theme.primaryColor || v2Theme.primary || '#3b82f6',
        secondary: v2Theme.secondaryColor || v2Theme.secondary || '#10b981',
        accent: v2Theme.accentColor || v2Theme.accent || '#f59e0b'
      },
      typography: {
        font: v2Theme.fontFamily || 'system-ui'
      }
    };
  }

  /**
   * Helpers de transformation
   */
  private transformButton(v2Button: any): any {
    if (!v2Button) return null;
    
    logger.debug('V2ToV3Adapter', 'transformButton', 'Transformation bouton', v2Button);
    
    return {
      text: v2Button.text || v2Button.label || 'Cliquez ici',
      link: v2Button.link || v2Button.href || '#',
      variant: v2Button.variant || 'primary',
      size: v2Button.size || 'md',
      icon: v2Button.icon,
      iconPosition: v2Button.iconPosition || 'right',
      fullWidth: v2Button.fullWidth || false,
      target: v2Button.target || '_self'
    };
  }

  private transformImage(v2Image: any): any {
    if (!v2Image) return null;
    
    // Si c'est une string, c'est l'URL
    if (typeof v2Image === 'string') {
      return { src: v2Image, alt: '' };
    }
    
    return {
      src: v2Image.src || v2Image.url || '',
      alt: v2Image.alt || '',
      width: v2Image.width,
      height: v2Image.height,
      loading: v2Image.loading || 'lazy'
    };
  }

  private transformBackground(v2Bg: any): any {
    if (!v2Bg) return null;
    
    return {
      type: v2Bg.type || 'color',
      color: v2Bg.color,
      gradient: v2Bg.gradient,
      image: this.transformImage(v2Bg.image),
      videoUrl: v2Bg.videoUrl,
      overlay: v2Bg.overlay,
      parallax: v2Bg.parallax || false
    };
  }

  private transformContactForm(v2Form: any): any {
    logger.debug('V2ToV3Adapter', 'transformContactForm', 'Transformation formulaire', v2Form);
    
    // Champs par défaut si non fournis
    const defaultFields = [
      {
        type: 'text',
        name: 'name',
        label: 'Nom',
        placeholder: 'Votre nom',
        required: true
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'votre@email.com',
        required: true
      },
      {
        type: 'textarea',
        name: 'message',
        label: 'Message',
        placeholder: 'Votre message...',
        required: true,
        rows: 5
      }
    ];
    
    return {
      fields: v2Form.fields || defaultFields,
      submitButton: {
        text: v2Form.submitText || v2Form.submitButton?.text || 'Envoyer',
        loadingText: v2Form.loadingText || 'Envoi en cours...'
      },
      successMessage: v2Form.successMessage || 'Message envoyé avec succès !',
      errorMessage: v2Form.errorMessage || 'Une erreur est survenue.',
      webhookUrl: v2Form.webhookUrl || v2Form.webhook
    };
  }

  private transformMap(v2Map: any): any {
    return {
      enabled: v2Map.enabled !== false && (v2Map.showMap !== false),
      coordinates: {
        lat: v2Map.latitude || v2Map.coordinates?.lat || 48.8566,
        lng: v2Map.longitude || v2Map.coordinates?.lng || 2.3522
      },
      zoom: v2Map.zoom || 15,
      apiKey: v2Map.apiKey || v2Map.googleMapsApiKey
    };
  }

  private transformMenuItems(v2Items: any[]): any[] {
    return v2Items.map((item, index) => ({
      id: item.id || `menu-${index}`,
      label: item.label || item.text || 'Menu',
      link: item.link || item.href || '#',
      target: item.target || '_self',
      icon: item.icon,
      badge: item.badge,
      megaMenu: item.megaMenu,
      subItems: item.subItems || item.children
    }));
  }

  private transformSocialLinks(v2Links: any[]): any[] {
    return v2Links.map(link => {
      if (typeof link === 'string') {
        // Deviner la plateforme depuis l'URL
        const platform = this.guessPlatform(link);
        return { platform, url: link };
      }
      
      return {
        platform: link.platform || link.type || this.guessPlatform(link.url),
        url: link.url || link.href || '#',
        label: link.label
      };
    });
  }

  private transformFooterColumns(v2Columns: any[]): any[] {
    return v2Columns.map(col => ({
      title: col.title || col.heading || 'Liens',
      links: (col.links || col.items || []).map(link => ({
        label: link.label || link.text || 'Lien',
        url: link.url || link.href || '#',
        target: link.target || '_self',
        icon: link.icon
      })),
      style: col.style || 'links'
    }));
  }

  private transformFooterLinks(v2Links: any[]): any[] {
    return v2Links.map(link => ({
      label: link.label || link.text || 'Lien',
      url: link.url || link.href || '#',
      target: link.target || '_self'
    }));
  }

  private transformTheme(v2Theme: any): any {
    if (!v2Theme) return null;
    
    return {
      colors: {
        primary: v2Theme.primaryColor || v2Theme.colors?.primary || '#3b82f6',
        secondary: v2Theme.secondaryColor || v2Theme.colors?.secondary || '#10b981',
        accent: v2Theme.accentColor || v2Theme.colors?.accent || '#f59e0b',
        ...v2Theme.colors
      },
      fonts: v2Theme.fonts || {},
      ...v2Theme
    };
  }

  private guessPlatform(url: string): string {
    if (!url) return 'website';
    
    const patterns = {
      facebook: /facebook\.com/i,
      twitter: /twitter\.com|x\.com/i,
      instagram: /instagram\.com/i,
      linkedin: /linkedin\.com/i,
      youtube: /youtube\.com/i,
      tiktok: /tiktok\.com/i,
      pinterest: /pinterest\.com/i
    };
    
    for (const [platform, regex] of Object.entries(patterns)) {
      if (regex.test(url)) return platform;
    }
    
    return 'website';
  }

  private generateId(): string {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const v2ToV3Adapter = V2ToV3Adapter.getInstance();
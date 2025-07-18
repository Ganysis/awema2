/**
 * Header V3 Perfect Enhanced Renderer
 * 8 variants visuelles avec toutes les fonctionnalités modernes
 */

import { BaseRendererV3 } from './base.renderer';

export class HeaderPerfectEnhancedRenderer extends BaseRendererV3<any> {
  type = 'header-perfect-enhanced';
  version = '3.0.0';

  validate(data: unknown) {
    // Basic validation - in production, use a proper schema
    return { success: true, data: data as any };
  }

  renderPreview(data: any): string {
    return `
<div class="header-preview" style="padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
  <h3 style="margin: 0 0 0.5rem; font-size: 1.125rem; font-weight: 600;">Header ${data.visualVariant || 'modern'}</h3>
  <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">${this.extractNavItems(data).length} éléments de menu • ${data.ctaEnabled ? 'CTA activé' : 'Sans CTA'}</p>
</div>`;
  }

  getRequiredAssets() {
    return [];
  }

  getBlockProps() {
    return [
      // Visual Variant
      {
        name: 'visualVariant',
        label: 'Style visuel',
        type: 'select',
        default: 'modern',
        description: 'Choisissez le style visuel du header',
        editorControl: 'radio',
        options: [
          { value: 'modern', label: 'Modern', icon: '🎨' },
          { value: 'minimal', label: 'Minimal', icon: '⚡' },
          { value: 'bold', label: 'Bold', icon: '💪' },
          { value: 'elegant', label: 'Elegant', icon: '✨' },
          { value: 'corporate', label: 'Corporate', icon: '🏢' },
          { value: 'creative', label: 'Creative', icon: '🎭' },
          { value: 'tech', label: 'Tech', icon: '💻' },
          { value: 'classic', label: 'Classic', icon: '🎩' }
        ]
      },

      // Branding
      {
        name: 'brandingType',
        label: 'Type de logo',
        type: 'select',
        default: 'text',
        description: 'Choisissez comment afficher votre marque',
        options: [
          { value: 'text', label: 'Texte uniquement' },
          { value: 'logo', label: 'Logo uniquement' },
          { value: 'both', label: 'Logo + Texte' }
        ]
      },
      {
        name: 'logoUrl',
        label: 'URL du logo',
        type: 'string',
        default: '',
        description: 'URL de votre logo (PNG, SVG recommandé)',
        showIf: (data) => data.brandingType === 'logo' || data.brandingType === 'both'
      },
      {
        name: 'companyName',
        label: 'Nom de l\'entreprise',
        type: 'string',
        default: 'Mon Entreprise',
        description: 'Le nom de votre entreprise',
        showIf: (data) => data.brandingType === 'text' || data.brandingType === 'both'
      },
      {
        name: 'tagline',
        label: 'Slogan',
        type: 'string',
        default: '',
        description: 'Slogan ou phrase d\'accroche (optionnel)'
      },

      // Navigation Items (flat structure)
      ...this.generateNavItemProps(6),

      // Sticky behavior
      {
        name: 'stickyEnabled',
        label: 'Header fixe au scroll',
        type: 'boolean',
        default: true,
        description: 'Le header reste visible lors du défilement'
      },
      {
        name: 'stickyBehavior',
        label: 'Comportement du sticky',
        type: 'select',
        default: 'always',
        description: 'Comment le header se comporte au scroll',
        showIf: (data) => data.stickyEnabled,
        options: [
          { value: 'always', label: 'Toujours visible' },
          { value: 'scrollUp', label: 'Visible au scroll up' },
          { value: 'scrollDown', label: 'Visible au scroll down' }
        ]
      },
      {
        name: 'shrinkOnScroll',
        label: 'Réduire au scroll',
        type: 'boolean',
        default: true,
        description: 'Réduire la hauteur du header au scroll',
        showIf: (data) => data.stickyEnabled
      },

      // Search
      {
        name: 'searchEnabled',
        label: 'Activer la recherche',
        type: 'boolean',
        default: false,
        description: 'Ajouter une fonction de recherche'
      },
      {
        name: 'searchStyle',
        label: 'Style de recherche',
        type: 'select',
        default: 'modal',
        description: 'Comment la recherche s\'affiche',
        showIf: (data) => data.searchEnabled,
        options: [
          { value: 'inline', label: 'En ligne' },
          { value: 'modal', label: 'Modal' },
          { value: 'dropdown', label: 'Dropdown' },
          { value: 'instant', label: 'Instantanée' }
        ]
      },
      {
        name: 'searchPlaceholder',
        label: 'Placeholder de recherche',
        type: 'string',
        default: 'Rechercher...',
        description: 'Texte dans le champ de recherche',
        showIf: (data) => data.searchEnabled
      },

      // Dark Mode
      {
        name: 'darkModeEnabled',
        label: 'Mode sombre',
        type: 'boolean',
        default: false,
        description: 'Permettre de basculer en mode sombre'
      },
      {
        name: 'darkModeStyle',
        label: 'Style du switch',
        type: 'select',
        default: 'icon',
        description: 'Apparence du bouton mode sombre',
        showIf: (data) => data.darkModeEnabled,
        options: [
          { value: 'icon', label: 'Icône seulement' },
          { value: 'toggle', label: 'Toggle switch' },
          { value: 'dropdown', label: 'Dropdown' },
          { value: 'animated', label: 'Animé' }
        ]
      },

      // Language Selector
      {
        name: 'languageEnabled',
        label: 'Sélecteur de langue',
        type: 'boolean',
        default: false,
        description: 'Permettre de changer de langue'
      },
      {
        name: 'languageStyle',
        label: 'Style du sélecteur',
        type: 'select',
        default: 'dropdown',
        description: 'Apparence du sélecteur de langue',
        showIf: (data) => data.languageEnabled,
        options: [
          { value: 'dropdown', label: 'Dropdown' },
          { value: 'flags', label: 'Drapeaux' },
          { value: 'text', label: 'Texte' },
          { value: 'combo', label: 'Drapeau + Texte' }
        ]
      },

      // CTA Button
      {
        name: 'ctaEnabled',
        label: 'Bouton d\'action',
        type: 'boolean',
        default: true,
        description: 'Afficher un bouton d\'appel à l\'action'
      },
      {
        name: 'ctaText',
        label: 'Texte du bouton',
        type: 'string',
        default: 'Devis gratuit',
        description: 'Texte du bouton CTA',
        showIf: (data) => data.ctaEnabled
      },
      {
        name: 'ctaLink',
        label: 'Lien du bouton',
        type: 'string',
        default: '#contact',
        description: 'URL de destination',
        showIf: (data) => data.ctaEnabled
      },
      {
        name: 'ctaStyle',
        label: 'Style du bouton',
        type: 'select',
        default: 'primary',
        description: 'Apparence du bouton CTA',
        showIf: (data) => data.ctaEnabled,
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'secondary', label: 'Secondaire' },
          { value: 'outline', label: 'Contour' },
          { value: 'gradient', label: 'Dégradé' },
          { value: 'glow', label: 'Lumineux' }
        ]
      },

      // Announcement Bar
      {
        name: 'announcementEnabled',
        label: 'Barre d\'annonce',
        type: 'boolean',
        default: false,
        description: 'Afficher une barre d\'annonce'
      },
      {
        name: 'announcementText',
        label: 'Texte de l\'annonce',
        type: 'string',
        default: '🎉 Offre spéciale : -20% sur tous nos services !',
        description: 'Message à afficher',
        showIf: (data) => data.announcementEnabled
      },
      {
        name: 'announcementDismissible',
        label: 'Peut être fermée',
        type: 'boolean',
        default: true,
        description: 'Permettre de fermer l\'annonce',
        showIf: (data) => data.announcementEnabled
      },

      // Mobile Menu
      {
        name: 'mobileMenuStyle',
        label: 'Style du menu mobile',
        type: 'select',
        default: 'slide',
        description: 'Animation du menu mobile',
        options: [
          { value: 'slide', label: 'Glissement' },
          { value: 'fullscreen', label: 'Plein écran' },
          { value: 'dropdown', label: 'Dropdown' },
          { value: 'bottom', label: 'Depuis le bas' },
          { value: 'morphing', label: 'Morphing' }
        ]
      },

      // Social Links
      {
        name: 'socialEnabled',
        label: 'Réseaux sociaux',
        type: 'boolean',
        default: true,
        description: 'Afficher les liens sociaux'
      },
      {
        name: 'socialPosition',
        label: 'Position des réseaux',
        type: 'select',
        default: 'mobile',
        description: 'Où afficher les réseaux sociaux',
        showIf: (data) => data.socialEnabled,
        options: [
          { value: 'desktop', label: 'Bureau seulement' },
          { value: 'mobile', label: 'Mobile seulement' },
          { value: 'both', label: 'Les deux' },
          { value: 'topbar', label: 'Barre du haut' }
        ]
      },

      // Layout
      {
        name: 'containerWidth',
        label: 'Largeur du conteneur',
        type: 'select',
        default: 'wide',
        description: 'Largeur maximale du header',
        options: [
          { value: 'full', label: 'Pleine largeur' },
          { value: 'wide', label: 'Large (1400px)' },
          { value: 'normal', label: 'Normal (1200px)' },
          { value: 'narrow', label: 'Étroit (1000px)' }
        ]
      },
      {
        name: 'headerHeight',
        label: 'Hauteur du header',
        type: 'select',
        default: 'medium',
        description: 'Hauteur du header',
        options: [
          { value: 'small', label: 'Petit (60px)' },
          { value: 'medium', label: 'Moyen (80px)' },
          { value: 'large', label: 'Grand (100px)' },
          { value: 'xl', label: 'Très grand (120px)' }
        ]
      },

      // Theme colors
      {
        name: 'backgroundColor',
        label: 'Couleur de fond',
        type: 'string',
        default: '',
        description: 'Couleur de fond personnalisée (ex: #ffffff)'
      },
      {
        name: 'textColor',
        label: 'Couleur du texte',
        type: 'string',
        default: '',
        description: 'Couleur du texte personnalisée (ex: #1f2937)'
      },
      {
        name: 'accentColor',
        label: 'Couleur d\'accent',
        type: 'string',
        default: '',
        description: 'Couleur pour les hovers et accents'
      }
    ];
  }

  private generateNavItemProps(count: number) {
    const props = [];
    for (let i = 1; i <= count; i++) {
      props.push(
        {
          name: `nav${i}_label`,
          label: `Menu ${i} - Libellé`,
          type: 'string',
          default: i === 1 ? 'Accueil' : i === 2 ? 'Services' : i === 3 ? 'À propos' : i === 4 ? 'Galerie' : i === 5 ? 'Contact' : '',
          description: `Texte du menu ${i}`,
          showIf: (data) => i === 1 || data[`nav${i - 1}_label`]
        },
        {
          name: `nav${i}_url`,
          label: `Menu ${i} - Lien`,
          type: 'string',
          default: i === 1 ? '/' : i === 2 ? '/services' : i === 3 ? '/about' : i === 4 ? '/gallery' : i === 5 ? '/contact' : '',
          description: `URL de destination`,
          showIf: (data) => data[`nav${i}_label`]
        },
        {
          name: `nav${i}_icon`,
          label: `Menu ${i} - Icône`,
          type: 'string',
          default: '',
          description: `Icône ou emoji (optionnel)`,
          showIf: (data) => data[`nav${i}_label`]
        },
        {
          name: `nav${i}_highlight`,
          label: `Menu ${i} - Mettre en avant`,
          type: 'boolean',
          default: i === 5,
          description: `Mettre en évidence ce menu`,
          showIf: (data) => data[`nav${i}_label`]
        },
        {
          name: `nav${i}_megaEnabled`,
          label: `Menu ${i} - Mega menu`,
          type: 'boolean',
          default: i === 2,
          description: `Activer le mega menu pour ce lien`,
          showIf: (data) => data[`nav${i}_label`]
        }
      );
    }
    return props;
  }

  getDefaultData() {
    return {
      visualVariant: 'modern',
      brandingType: 'text',
      logoUrl: '',
      companyName: 'Mon Entreprise',
      tagline: '',
      
      // Navigation items
      nav1_label: 'Accueil',
      nav1_url: '/',
      nav1_icon: '🏠',
      nav1_highlight: false,
      nav1_megaEnabled: false,
      
      nav2_label: 'Services',
      nav2_url: '/services',
      nav2_icon: '⚡',
      nav2_highlight: false,
      nav2_megaEnabled: true,
      
      nav3_label: 'À propos',
      nav3_url: '/about',
      nav3_icon: '👤',
      nav3_highlight: false,
      nav3_megaEnabled: false,
      
      nav4_label: 'Galerie',
      nav4_url: '/gallery',
      nav4_icon: '🖼️',
      nav4_highlight: false,
      nav4_megaEnabled: false,
      
      nav5_label: 'Contact',
      nav5_url: '/contact',
      nav5_icon: '📞',
      nav5_highlight: true,
      nav5_megaEnabled: false,
      
      nav6_label: '',
      nav6_url: '',
      nav6_icon: '',
      nav6_highlight: false,
      nav6_megaEnabled: false,
      
      // Features
      stickyEnabled: true,
      stickyBehavior: 'always',
      shrinkOnScroll: true,
      
      searchEnabled: false,
      searchStyle: 'modal',
      searchPlaceholder: 'Rechercher...',
      
      darkModeEnabled: false,
      darkModeStyle: 'icon',
      
      languageEnabled: false,
      languageStyle: 'dropdown',
      
      ctaEnabled: true,
      ctaText: 'Devis gratuit',
      ctaLink: '#contact',
      ctaStyle: 'primary',
      
      announcementEnabled: false,
      announcementText: '🎉 Offre spéciale : -20% sur tous nos services !',
      announcementDismissible: true,
      
      // Mobile
      mobileMenuStyle: 'slide',
      
      // Social
      socialEnabled: true,
      socialPosition: 'mobile',
      
      // Layout
      containerWidth: 'wide',
      headerHeight: 'medium',
      
      // Theme
      backgroundColor: '',
      textColor: '',
      accentColor: ''
    };
  }

  private extractNavItems(data: any): any[] {
    const items = [];
    for (let i = 1; i <= 6; i++) {
      const label = data[`nav${i}_label`];
      if (label) {
        items.push({
          label,
          url: data[`nav${i}_url`] || '#',
          icon: data[`nav${i}_icon`] || '',
          highlight: data[`nav${i}_highlight`] || false,
          megaEnabled: data[`nav${i}_megaEnabled`] || false
        });
      }
    }
    return items;
  }

  render(data: any, context?: any) {
    const html = this.renderHTML(data);
    const css = this.getCSS(data);
    const js = this.getJS();
    
    return {
      html,
      css,
      js,
      assets: [],
      errors: [],
      warnings: [],
      performance: {
        renderTime: 0,
        cssSize: css.length,
        jsSize: js.length
      }
    };
  }

  getDefaultCSS() {
    return this.getCSS(this.getDefaultData());
  }

  private renderHTML(data: any) {
    const navItems = this.extractNavItems(data);
    
    const classes = [
      'header-v3',
      `header-v3--${data.visualVariant}`,
      `header-v3--height-${data.headerHeight}`,
      `header-v3--container-${data.containerWidth}`,
      data.stickyEnabled ? 'header-v3--sticky' : '',
      data.announcementEnabled ? 'header-v3--has-announcement' : ''
    ].filter(Boolean).join(' ');

    return `
${data.announcementEnabled ? this.renderAnnouncement(data) : ''}

<header class="${classes}" id="header-v3" data-sticky-behavior="${data.stickyBehavior}">
  <div class="header-v3__container">
    <div class="header-v3__wrapper">
      <!-- Logo/Branding -->
      <div class="header-v3__branding">
        <a href="/" class="header-v3__logo-link">
          ${this.renderBranding(data)}
        </a>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="header-v3__nav" role="navigation">
        <ul class="header-v3__menu">
          ${navItems.map((item, index) => this.renderNavItem(item, index, data)).join('')}
        </ul>
      </nav>
      
      <!-- Actions -->
      <div class="header-v3__actions">
        ${data.searchEnabled ? this.renderSearch(data) : ''}
        ${data.languageEnabled ? this.renderLanguageSelector(data) : ''}
        ${data.darkModeEnabled ? this.renderDarkMode(data) : ''}
        ${data.socialEnabled && data.socialPosition !== 'mobile' ? this.renderSocialIcons(data) : ''}
        ${data.ctaEnabled ? this.renderCTA(data) : ''}
        
        <!-- Mobile Toggle -->
        <button class="header-v3__mobile-toggle" aria-label="Menu" data-menu-style="${data.mobileMenuStyle}">
          <span class="header-v3__burger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  ${this.renderMobileMenu(navItems, data)}
</header>`;
  }

  private renderAnnouncement(data: any): string {
    return `
<div class="header-v3__announcement" id="header-announcement">
  <div class="header-v3__announcement-content">
    <span>${data.announcementText}</span>
    ${data.announcementDismissible ? `
      <button class="header-v3__announcement-close" aria-label="Fermer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    ` : ''}
  </div>
</div>`;
  }

  private renderBranding(data: any): string {
    if (data.brandingType === 'logo' && data.logoUrl) {
      return `<img src="${data.logoUrl}" alt="${data.companyName}" class="header-v3__logo-image" />`;
    } else if (data.brandingType === 'both' && data.logoUrl) {
      return `
        <img src="${data.logoUrl}" alt="${data.companyName}" class="header-v3__logo-image" />
        <div class="header-v3__logo-text">
          <span class="header-v3__company-name">${data.companyName}</span>
          ${data.tagline ? `<span class="header-v3__tagline">${data.tagline}</span>` : ''}
        </div>
      `;
    } else {
      return `
        <div class="header-v3__logo-text">
          <span class="header-v3__company-name">${data.companyName}</span>
          ${data.tagline ? `<span class="header-v3__tagline">${data.tagline}</span>` : ''}
        </div>
      `;
    }
  }

  private renderNavItem(item: any, index: number, data: any): string {
    const classes = [
      'header-v3__menu-item',
      item.highlight ? 'header-v3__menu-item--highlight' : '',
      item.megaEnabled ? 'header-v3__menu-item--has-mega' : ''
    ].filter(Boolean).join(' ');

    return `
<li class="${classes}">
  <a href="${item.url}" class="header-v3__menu-link">
    ${item.icon ? `<span class="header-v3__menu-icon">${item.icon}</span>` : ''}
    <span>${item.label}</span>
    ${item.megaEnabled ? '<svg class="header-v3__menu-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round"/></svg>' : ''}
  </a>
  ${item.megaEnabled ? this.renderMegaMenu(item, data) : ''}
</li>`;
  }

  private renderMegaMenu(item: any, data: any): string {
    // Services mega menu example
    if (item.label === 'Services') {
      return `
<div class="header-v3__mega-menu">
  <div class="header-v3__mega-content">
    <div class="header-v3__mega-grid">
      <div class="header-v3__mega-column">
        <h3 class="header-v3__mega-title">Services principaux</h3>
        <ul class="header-v3__mega-list">
          <li><a href="/services/plomberie">🔧 Plomberie générale</a></li>
          <li><a href="/services/chauffage">🔥 Chauffage & Climatisation</a></li>
          <li><a href="/services/urgences">🚨 Urgences 24/7</a></li>
          <li><a href="/services/renovation">🏠 Rénovation salle de bain</a></li>
        </ul>
      </div>
      <div class="header-v3__mega-column">
        <h3 class="header-v3__mega-title">Services spécialisés</h3>
        <ul class="header-v3__mega-list">
          <li><a href="/services/detection-fuites">💧 Détection de fuites</a></li>
          <li><a href="/services/debouchage">🚿 Débouchage canalisations</a></li>
          <li><a href="/services/chaudiere">♨️ Installation chaudière</a></li>
          <li><a href="/services/economie-eau">💰 Économie d'eau</a></li>
        </ul>
      </div>
      <div class="header-v3__mega-featured">
        <img src="/api/placeholder/400/250" alt="Service en vedette" />
        <h4>Offre du mois</h4>
        <p>-20% sur l'entretien de votre chaudière</p>
        <a href="/promotions" class="header-v3__mega-cta">En savoir plus →</a>
      </div>
    </div>
  </div>
</div>`;
    }
    return '';
  }

  private renderSearch(data: any): string {
    return `
<div class="header-v3__search header-v3__search--${data.searchStyle}">
  <button class="header-v3__search-toggle" aria-label="Rechercher">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  </button>
  ${data.searchStyle === 'inline' ? `
    <input type="search" class="header-v3__search-input" placeholder="${data.searchPlaceholder}" />
  ` : ''}
</div>`;
  }

  private renderLanguageSelector(data: any): string {
    return `
<div class="header-v3__language header-v3__language--${data.languageStyle}">
  <button class="header-v3__language-toggle" aria-label="Langue">
    ${data.languageStyle === 'flags' || data.languageStyle === 'combo' ? '🇫🇷' : ''}
    ${data.languageStyle !== 'flags' ? '<span>FR</span>' : ''}
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
  <div class="header-v3__language-dropdown">
    <a href="#" data-lang="fr">🇫🇷 Français</a>
    <a href="#" data-lang="en">🇬🇧 English</a>
    <a href="#" data-lang="es">🇪🇸 Español</a>
  </div>
</div>`;
  }

  private renderDarkMode(data: any): string {
    const darkModeContent = {
      icon: `
        <svg class="header-v3__dark-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="header-v3__dark-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `,
      toggle: `
        <div class="header-v3__dark-switch">
          <span class="header-v3__dark-slider"></span>
        </div>
      `,
      animated: `
        <div class="header-v3__dark-animated">
          <div class="header-v3__dark-circle"></div>
        </div>
      `,
      dropdown: `
        <span>Thème</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `
    };

    return `
<div class="header-v3__dark header-v3__dark--${data.darkModeStyle}">
  <button class="header-v3__dark-toggle" aria-label="Mode sombre">
    ${darkModeContent[data.darkModeStyle] || darkModeContent.icon}
  </button>
  ${data.darkModeStyle === 'dropdown' ? `
    <div class="header-v3__dark-dropdown">
      <a href="#" data-theme="light">☀️ Clair</a>
      <a href="#" data-theme="dark">🌙 Sombre</a>
      <a href="#" data-theme="system">💻 Système</a>
    </div>
  ` : ''}
</div>`;
  }

  private renderSocialIcons(data: any): string {
    return `
<div class="header-v3__social">
  <a href="https://facebook.com" aria-label="Facebook" class="header-v3__social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
  <a href="https://instagram.com" aria-label="Instagram" class="header-v3__social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
    </svg>
  </a>
  <a href="https://linkedin.com" aria-label="LinkedIn" class="header-v3__social-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>
</div>`;
  }

  private renderCTA(data: any): string {
    const classes = [
      'header-v3__cta',
      `header-v3__cta--${data.ctaStyle}`
    ].join(' ');

    return `
<a href="${data.ctaLink}" class="${classes}">
  <span>${data.ctaText}</span>
  ${data.ctaStyle === 'glow' ? '<span class="header-v3__cta-glow"></span>' : ''}
</a>`;
  }

  private renderMobileMenu(navItems: any[], data: any): string {
    return `
<div class="header-v3__mobile-menu header-v3__mobile-menu--${data.mobileMenuStyle}" id="mobile-menu">
  <div class="header-v3__mobile-content">
    ${data.mobileMenuStyle === 'fullscreen' ? `
      <button class="header-v3__mobile-close" aria-label="Fermer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    ` : ''}
    
    <nav class="header-v3__mobile-nav">
      <ul class="header-v3__mobile-list">
        ${navItems.map(item => `
          <li class="header-v3__mobile-item">
            <a href="${item.url}" class="header-v3__mobile-link">
              ${item.icon ? `<span class="header-v3__mobile-icon">${item.icon}</span>` : ''}
              <span>${item.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
    
    ${data.ctaEnabled ? `
      <div class="header-v3__mobile-cta">
        <a href="${data.ctaLink}" class="header-v3__cta header-v3__cta--${data.ctaStyle}">
          ${data.ctaText}
        </a>
      </div>
    ` : ''}
    
    ${data.socialEnabled && (data.socialPosition === 'mobile' || data.socialPosition === 'both') ? `
      <div class="header-v3__mobile-social">
        ${this.renderSocialIcons(data)}
      </div>
    ` : ''}
  </div>
</div>`;
  }

  getCSS(data: any) {
    const heightMap = {
      'small': '60px',
      'medium': '80px',
      'large': '100px',
      'xl': '120px'
    };

    const containerMap = {
      'full': '100%',
      'wide': '1400px',
      'normal': '1200px',
      'narrow': '1000px'
    };

    return `
/* Header V3 Perfect Enhanced - Base Styles */
.header-v3 {
  position: relative;
  width: 100%;
  background: var(--header-bg, #ffffff);
  color: var(--header-text, #1f2937);
  z-index: 1000;
  transition: all 0.3s ease;
  ${data.backgroundColor ? `background-color: ${data.backgroundColor};` : ''}
  ${data.textColor ? `color: ${data.textColor};` : ''}
}

.header-v3__container {
  max-width: ${containerMap[data.containerWidth] || containerMap.wide};
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-v3__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${heightMap[data.headerHeight] || heightMap.medium};
  transition: height 0.3s ease;
}

/* Sticky Behavior */
.header-v3--sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  animation: slideDown 0.3s ease;
}

.header-v3--sticky.header-v3--scrolled {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

${data.shrinkOnScroll ? `
.header-v3--sticky.header-v3--scrolled .header-v3__wrapper {
  height: calc(${heightMap[data.headerHeight] || heightMap.medium} - 20px);
}
` : ''}

.header-v3--sticky.header-v3--hidden {
  transform: translateY(-100%);
}

@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

/* Announcement Bar */
.header-v3__announcement {
  background: var(--primary, #3b82f6);
  color: white;
  padding: 0.75rem 1rem;
  text-align: center;
  position: relative;
  font-size: 0.875rem;
}

.header-v3__announcement-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.header-v3__announcement-close {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.header-v3__announcement-close:hover {
  opacity: 1;
}

/* Branding */
.header-v3__branding {
  flex-shrink: 0;
}

.header-v3__logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.3s;
}

.header-v3__logo-link:hover {
  opacity: 0.8;
}

.header-v3__logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.header-v3__logo-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.header-v3__company-name {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.header-v3__tagline {
  font-size: 0.75rem;
  opacity: 0.7;
  line-height: 1;
}

/* Navigation */
.header-v3__nav {
  display: none;
}

@media (min-width: 1024px) {
  .header-v3__nav {
    display: block;
  }
}

.header-v3__menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.header-v3__menu-item {
  position: relative;
}

.header-v3__menu-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s;
  position: relative;
}

.header-v3__menu-link:hover {
  color: var(--primary, #3b82f6);
  background: rgba(59, 130, 246, 0.1);
}

.header-v3__menu-item--highlight .header-v3__menu-link {
  background: var(--primary, #3b82f6);
  color: white;
}

.header-v3__menu-item--highlight .header-v3__menu-link:hover {
  background: var(--primary-dark, #2563eb);
}

.header-v3__menu-icon {
  font-size: 1.125rem;
}

.header-v3__menu-arrow {
  opacity: 0.5;
  transition: transform 0.3s;
}

.header-v3__menu-item:hover .header-v3__menu-arrow {
  transform: rotate(180deg);
}

/* Mega Menu */
.header-v3__mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  max-width: 90vw;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.header-v3__menu-item:hover .header-v3__mega-menu {
  opacity: 1;
  visibility: visible;
}

.header-v3__mega-content {
  padding: 2rem;
}

.header-v3__mega-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 2rem;
}

.header-v3__mega-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header-v3__mega-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin: 0;
}

.header-v3__mega-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-v3__mega-list a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.header-v3__mega-list a:hover {
  background: #f3f4f6;
  color: var(--primary, #3b82f6);
}

.header-v3__mega-featured {
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.header-v3__mega-featured img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.header-v3__mega-featured h4 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.header-v3__mega-featured p {
  margin: 0 0 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.header-v3__mega-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary, #3b82f6);
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s;
}

.header-v3__mega-cta:hover {
  gap: 0.75rem;
}

/* Actions */
.header-v3__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Search */
.header-v3__search {
  position: relative;
}

.header-v3__search-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: inherit;
  transition: all 0.3s;
  border-radius: 0.375rem;
}

.header-v3__search-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--primary, #3b82f6);
}

.header-v3__search--inline .header-v3__search-input {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.header-v3__search--inline:focus-within .header-v3__search-input {
  opacity: 1;
  visibility: visible;
}

/* Language Selector */
.header-v3__language {
  position: relative;
}

.header-v3__language-toggle {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: inherit;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.3s;
}

.header-v3__language-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.header-v3__language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.header-v3__language:hover .header-v3__language-dropdown {
  opacity: 1;
  visibility: visible;
}

.header-v3__language-dropdown a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.header-v3__language-dropdown a:hover {
  background: #f3f4f6;
  color: var(--primary, #3b82f6);
}

/* Dark Mode */
.header-v3__dark {
  position: relative;
}

.header-v3__dark-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: inherit;
  transition: all 0.3s;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-v3__dark-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.header-v3__dark-sun,
.header-v3__dark-moon {
  width: 20px;
  height: 20px;
}

.header-v3__dark-moon {
  display: none;
}

.dark .header-v3__dark-sun {
  display: none;
}

.dark .header-v3__dark-moon {
  display: block;
}

/* Dark Mode Toggle Style */
.header-v3__dark--toggle .header-v3__dark-switch {
  width: 44px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  position: relative;
  transition: background 0.3s;
}

.header-v3__dark--toggle .header-v3__dark-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dark .header-v3__dark--toggle .header-v3__dark-switch {
  background: var(--primary, #3b82f6);
}

.dark .header-v3__dark--toggle .header-v3__dark-slider {
  transform: translateX(20px);
}

/* Dark Mode Animated */
.header-v3__dark--animated .header-v3__dark-animated {
  width: 40px;
  height: 40px;
  position: relative;
}

.header-v3__dark--animated .header-v3__dark-circle {
  width: 20px;
  height: 20px;
  background: #fbbf24;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.dark .header-v3__dark--animated .header-v3__dark-circle {
  width: 16px;
  height: 16px;
  background: #e5e7eb;
  border-radius: 50% 0;
  transform: translate(-30%, -50%) rotate(45deg);
}

/* Dark Mode Dropdown */
.header-v3__dark-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 140px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.header-v3__dark--dropdown:hover .header-v3__dark-dropdown {
  opacity: 1;
  visibility: visible;
}

.header-v3__dark-dropdown a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.header-v3__dark-dropdown a:hover {
  background: #f3f4f6;
  color: var(--primary, #3b82f6);
}

/* Social Icons */
.header-v3__social {
  display: flex;
  gap: 0.5rem;
}

.header-v3__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 0.375rem;
  color: #6b7280;
  transition: all 0.3s;
}

.header-v3__social-link:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--primary, #3b82f6);
}

/* CTA Button */
.header-v3__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.header-v3__cta--primary {
  background: var(--primary, #3b82f6);
  color: white;
}

.header-v3__cta--primary:hover {
  background: var(--primary-dark, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.header-v3__cta--secondary {
  background: #f3f4f6;
  color: #374151;
}

.header-v3__cta--secondary:hover {
  background: #e5e7eb;
}

.header-v3__cta--outline {
  background: transparent;
  color: var(--primary, #3b82f6);
  border: 2px solid var(--primary, #3b82f6);
}

.header-v3__cta--outline:hover {
  background: var(--primary, #3b82f6);
  color: white;
}

.header-v3__cta--gradient {
  background: linear-gradient(135deg, var(--primary, #3b82f6), var(--secondary, #8b5cf6));
  color: white;
}

.header-v3__cta--gradient:hover {
  background: linear-gradient(135deg, var(--primary-dark, #2563eb), var(--secondary-dark, #7c3aed));
}

.header-v3__cta--glow {
  background: var(--primary, #3b82f6);
  color: white;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.header-v3__cta--glow:hover {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.7);
}

.header-v3__cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.header-v3__cta--glow:hover .header-v3__cta-glow {
  opacity: 1;
}

/* Mobile Toggle */
.header-v3__mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: inherit;
  border-radius: 0.375rem;
  transition: all 0.3s;
}

@media (min-width: 1024px) {
  .header-v3__mobile-toggle {
    display: none;
  }
}

.header-v3__mobile-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.header-v3__burger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 24px;
  height: 24px;
  position: relative;
}

.header-v3__burger span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all 0.3s;
}

.header-v3__mobile-toggle.active .header-v3__burger span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.header-v3__mobile-toggle.active .header-v3__burger span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.header-v3__mobile-toggle.active .header-v3__burger span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Menu */
.header-v3__mobile-menu {
  position: fixed;
  top: ${heightMap[data.headerHeight] || heightMap.medium};
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 999;
  transition: all 0.3s ease;
  overflow-y: auto;
}

/* Mobile Menu Styles */
.header-v3__mobile-menu--slide {
  transform: translateX(-100%);
}

.header-v3__mobile-menu--slide.active {
  transform: translateX(0);
}

.header-v3__mobile-menu--fullscreen {
  opacity: 0;
  visibility: hidden;
  top: 0;
}

.header-v3__mobile-menu--fullscreen.active {
  opacity: 1;
  visibility: visible;
}

.header-v3__mobile-menu--dropdown {
  transform: translateY(-100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-v3__mobile-menu--dropdown.active {
  transform: translateY(0);
}

.header-v3__mobile-menu--bottom {
  transform: translateY(100%);
  top: auto;
  bottom: 0;
  height: auto;
  max-height: 80vh;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
}

.header-v3__mobile-menu--bottom.active {
  transform: translateY(0);
}

.header-v3__mobile-menu--morphing {
  clip-path: circle(0% at top right);
  transform: none;
}

.header-v3__mobile-menu--morphing.active {
  clip-path: circle(150% at top right);
}

.header-v3__mobile-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100%;
}

.header-v3__mobile-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: inherit;
  border-radius: 0.375rem;
  transition: all 0.3s;
}

.header-v3__mobile-close:hover {
  background: rgba(0, 0, 0, 0.05);
}

.header-v3__mobile-nav {
  flex: 1;
}

.header-v3__mobile-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-v3__mobile-item {
  animation: fadeInUp 0.5s ease backwards;
}

.header-v3__mobile-item:nth-child(1) { animation-delay: 0.1s; }
.header-v3__mobile-item:nth-child(2) { animation-delay: 0.2s; }
.header-v3__mobile-item:nth-child(3) { animation-delay: 0.3s; }
.header-v3__mobile-item:nth-child(4) { animation-delay: 0.4s; }
.header-v3__mobile-item:nth-child(5) { animation-delay: 0.5s; }
.header-v3__mobile-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-v3__mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.125rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.header-v3__mobile-link:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--primary, #3b82f6);
}

.header-v3__mobile-icon {
  font-size: 1.25rem;
}

.header-v3__mobile-cta {
  margin-top: auto;
  text-align: center;
}

.header-v3__mobile-social {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

/* Visual Variants */

/* Modern */
.header-v3--modern {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-v3--modern .header-v3__menu-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: calc(100% - 2rem);
  height: 2px;
  background: var(--primary, #3b82f6);
  transition: transform 0.3s;
}

.header-v3--modern .header-v3__menu-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* Minimal */
.header-v3--minimal {
  background: transparent;
  border-bottom: 1px solid #e5e7eb;
}

.header-v3--minimal.header-v3--scrolled {
  background: white;
}

.header-v3--minimal .header-v3__menu-link {
  padding: 0.5rem 0.75rem;
  font-weight: 400;
}

.header-v3--minimal .header-v3__menu-link:hover {
  background: none;
  color: var(--primary, #3b82f6);
}

/* Bold */
.header-v3--bold {
  background: var(--primary, #3b82f6);
  color: white;
}

.header-v3--bold .header-v3__menu-link {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

.header-v3--bold .header-v3__menu-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.header-v3--bold .header-v3__cta {
  background: white;
  color: var(--primary, #3b82f6);
}

.header-v3--bold .header-v3__cta:hover {
  background: #f3f4f6;
}

/* Elegant */
.header-v3--elegant {
  background: linear-gradient(to bottom, white, #fafafa);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}

.header-v3--elegant .header-v3__company-name {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.header-v3--elegant .header-v3__menu-link {
  font-family: 'Crimson Text', serif;
  font-size: 1.0625rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.header-v3--elegant .header-v3__mega-menu {
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

/* Corporate */
.header-v3--corporate {
  background: #1e293b;
  color: white;
}

.header-v3--corporate .header-v3__wrapper {
  height: 90px;
}

.header-v3--corporate .header-v3__menu-link {
  font-weight: 500;
  position: relative;
}

.header-v3--corporate .header-v3__menu-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 0;
  background: #3b82f6;
  transition: height 0.3s;
}

.header-v3--corporate .header-v3__menu-link:hover::before {
  height: 100%;
}

.header-v3--corporate .header-v3__menu-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* Creative */
.header-v3--creative {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-v3--creative .header-v3__menu-link {
  border-radius: 2rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-v3--creative .header-v3__menu-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.header-v3--creative .header-v3__cta {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-weight: 700;
}

/* Tech */
.header-v3--tech {
  background: #0f172a;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
}

.header-v3--tech .header-v3__menu-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  position: relative;
  overflow: hidden;
}

.header-v3--tech .header-v3__menu-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
  transition: left 0.5s;
}

.header-v3--tech .header-v3__menu-link:hover::before {
  left: 100%;
}

.header-v3--tech .header-v3__cta {
  background: #3b82f6;
  color: white;
  position: relative;
  overflow: hidden;
}

.header-v3--tech .header-v3__cta::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: width 0.6s, height 0.6s;
}

.header-v3--tech .header-v3__cta:hover::before {
  width: 300px;
  height: 300px;
}

/* Classic */
.header-v3--classic {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-v3--classic .header-v3__wrapper {
  border-bottom: 3px solid var(--primary, #3b82f6);
}

.header-v3--classic .header-v3__company-name {
  font-family: Georgia, serif;
}

.header-v3--classic .header-v3__menu-link {
  font-family: Georgia, serif;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  padding: 0.75rem 1rem;
}

.header-v3--classic .header-v3__menu-link:hover {
  background: none;
  border-bottom-color: var(--primary, #3b82f6);
}

.header-v3--classic .header-v3__menu-item--highlight .header-v3__menu-link {
  background: none;
  border-bottom-color: var(--primary, #3b82f6);
  color: var(--primary, #3b82f6);
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .header-v3__container {
    padding: 0 1rem;
  }
  
  .header-v3__wrapper {
    height: 60px;
  }
  
  .header-v3__company-name {
    font-size: 1.25rem;
  }
  
  .header-v3__tagline {
    display: none;
  }
  
  .header-v3__mobile-menu {
    top: 60px;
  }
  
  .header-v3--has-announcement .header-v3__mobile-menu {
    top: calc(60px + 48px);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .header-v3 {
    background: #1f2937;
    color: #f3f4f6;
  }
  
  .header-v3__mega-menu,
  .header-v3__language-dropdown,
  .header-v3__dark-dropdown,
  .header-v3__mobile-menu {
    background: #1f2937;
    color: #f3f4f6;
  }
  
  .header-v3__mega-list a,
  .header-v3__language-dropdown a,
  .header-v3__dark-dropdown a {
    color: #e5e7eb;
  }
  
  .header-v3__mega-list a:hover,
  .header-v3__language-dropdown a:hover,
  .header-v3__dark-dropdown a:hover {
    background: #374151;
  }
  
  .header-v3__mega-featured {
    background: #374151;
  }
  
  .header-v3__announcement {
    background: var(--primary-dark, #2563eb);
  }
}

/* Print styles */
@media print {
  .header-v3 {
    position: static;
    box-shadow: none;
  }
  
  .header-v3__mobile-toggle,
  .header-v3__actions,
  .header-v3__announcement {
    display: none;
  }
}
`;
  }

  getJS() {
    return `
// Header V3 Perfect Enhanced JavaScript
(function() {
  const header = document.getElementById('header-v3');
  if (!header) return;
  
  const mobileToggle = header.querySelector('.header-v3__mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const announcementClose = header.querySelector('.header-v3__announcement-close');
  const searchToggle = header.querySelector('.header-v3__search-toggle');
  const darkToggle = header.querySelector('.header-v3__dark-toggle');
  
  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileToggle.classList.contains('active');
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = isActive ? '' : 'hidden';
    });
    
    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Sticky header behavior
  const stickyBehavior = header.dataset.stickyBehavior;
  if (header.classList.contains('header-v3--sticky')) {
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class
      if (currentScroll > 50) {
        header.classList.add('header-v3--scrolled');
      } else {
        header.classList.remove('header-v3--scrolled');
      }
      
      // Handle hide on scroll
      if (stickyBehavior === 'scrollUp' || stickyBehavior === 'scrollDown') {
        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down
          if (stickyBehavior === 'scrollDown') {
            header.classList.remove('header-v3--hidden');
          } else {
            header.classList.add('header-v3--hidden');
          }
        } else {
          // Scrolling up
          if (stickyBehavior === 'scrollUp') {
            header.classList.remove('header-v3--hidden');
          } else {
            header.classList.add('header-v3--hidden');
          }
        }
      }
      
      lastScroll = currentScroll;
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }
  
  // Announcement bar dismiss
  if (announcementClose) {
    const announcement = document.getElementById('header-announcement');
    
    announcementClose.addEventListener('click', () => {
      announcement.style.display = 'none';
      localStorage.setItem('headerAnnouncementDismissed', 'true');
      
      // Adjust mobile menu position
      if (mobileMenu) {
        mobileMenu.style.top = header.offsetHeight + 'px';
      }
    });
    
    // Check if already dismissed
    if (localStorage.getItem('headerAnnouncementDismissed') === 'true') {
      announcement.style.display = 'none';
    }
  }
  
  // Search functionality
  if (searchToggle) {
    const searchStyle = searchToggle.dataset.searchStyle;
    
    searchToggle.addEventListener('click', () => {
      if (searchStyle === 'modal') {
        // Create and show search modal
        const modal = document.createElement('div');
        modal.className = 'header-v3__search-modal';
        modal.innerHTML = \`
          <div class="header-v3__search-modal-content">
            <input type="search" class="header-v3__search-modal-input" placeholder="Rechercher..." autofocus>
            <button class="header-v3__search-modal-close">×</button>
          </div>
        \`;
        document.body.appendChild(modal);
        
        // Focus input
        const input = modal.querySelector('input');
        input.focus();
        
        // Close on click outside or close button
        modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target.classList.contains('header-v3__search-modal-close')) {
            modal.remove();
          }
        });
        
        // Close on escape
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            modal.remove();
          }
        });
      } else if (searchStyle === 'instant') {
        // Implement instant search
        console.log('Instant search activated');
      }
    });
    
    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchToggle.click();
      }
    });
  }
  
  // Dark mode toggle
  if (darkToggle) {
    const darkStyle = darkToggle.querySelector('[data-dark-style]')?.dataset.darkStyle || 'icon';
    
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
    }
    
    darkToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Animate transition
      if (darkStyle === 'animated') {
        darkToggle.classList.add('animating');
        setTimeout(() => darkToggle.classList.remove('animating'), 500);
      }
    });
  }
  
  // Language selector
  const langToggle = header.querySelector('.header-v3__language-toggle');
  if (langToggle) {
    const dropdown = header.querySelector('.header-v3__language-dropdown');
    
    dropdown?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.dataset.lang;
        console.log('Language changed to:', lang);
        // Implement language change logic
      });
    });
  }
  
  // Mega menu keyboard navigation
  const megaMenuItems = header.querySelectorAll('.header-v3__menu-item--has-mega');
  megaMenuItems.forEach(item => {
    const link = item.querySelector('.header-v3__menu-link');
    const megaMenu = item.querySelector('.header-v3__mega-menu');
    
    if (link && megaMenu) {
      // Show on focus
      link.addEventListener('focus', () => {
        megaMenu.style.opacity = '1';
        megaMenu.style.visibility = 'visible';
      });
      
      // Hide when focus leaves the mega menu
      megaMenu.addEventListener('focusout', (e) => {
        if (!megaMenu.contains(e.relatedTarget)) {
          megaMenu.style.opacity = '';
          megaMenu.style.visibility = '';
        }
      });
    }
  });
  
  // Search modal styles
  const searchModalStyles = \`
    <style>
      .header-v3__search-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 20vh;
        animation: fadeIn 0.2s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .header-v3__search-modal-content {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 600px;
        position: relative;
        animation: slideDown 0.3s ease;
      }
      
      @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .header-v3__search-modal-input {
        width: 100%;
        padding: 2rem;
        font-size: 1.5rem;
        border: none;
        border-radius: 1rem;
        outline: none;
      }
      
      .header-v3__search-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        line-height: 1;
        cursor: pointer;
        color: #6b7280;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
      }
      
      .header-v3__search-modal-close:hover {
        background: #f3f4f6;
        color: #374151;
      }
      
      @media (prefers-color-scheme: dark) {
        .header-v3__search-modal-content {
          background: #1f2937;
        }
        
        .header-v3__search-modal-input {
          background: #1f2937;
          color: #f3f4f6;
        }
        
        .header-v3__search-modal-close {
          color: #9ca3af;
        }
        
        .header-v3__search-modal-close:hover {
          background: #374151;
          color: #e5e7eb;
        }
      }
    </style>
  \`;
  
  // Inject search modal styles
  if (searchToggle && !document.getElementById('header-v3-search-styles')) {
    const styleEl = document.createElement('div');
    styleEl.id = 'header-v3-search-styles';
    styleEl.innerHTML = searchModalStyles;
    document.head.appendChild(styleEl.firstElementChild);
  }
})();
`;
  }
}

// Export the renderer
export default HeaderPerfectEnhancedRenderer;
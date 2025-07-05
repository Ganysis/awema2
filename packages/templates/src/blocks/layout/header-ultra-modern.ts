import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Header Ultra-Moderne - Navigation révolutionnaire
 * Mega menus, recherche intelligente, dark mode, multi-langue
 */
export const headerUltraModern: Block = {
  id: 'header-ultra-modern',
  name: 'Header Ultra-Moderne',
  description: 'Header professionnel avec mega menus, recherche avancée, dark mode et sélecteur de langue',
  category: BlockCategory.HEADER,
  tags: ['header', 'navigation', 'mega-menu', 'search', 'dark-mode', 'language'],
  thumbnail: '/blocks/header-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel',
      defaultValue: 'transparent-modern',
      required: true,
      validation: {
        options: [
          { label: 'Transparent Modern', value: 'transparent-modern' },
          { label: 'Floating Glass', value: 'floating-glass' },
          { label: 'Minimal Clean', value: 'minimal-clean' },
          { label: 'Bold Gradient', value: 'bold-gradient' },
          { label: 'Split Navigation', value: 'split-nav' },
          { label: 'Centered Logo', value: 'centered-logo' },
          { label: 'Sidebar Reveal', value: 'sidebar-reveal' },
          { label: 'Fullscreen Overlay', value: 'fullscreen-overlay' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 1
      }
    },
    {
      name: 'sticky',
      type: PropType.BOOLEAN,
      description: 'Header fixe au scroll',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Comportement',
        order: 2
      }
    },
    {
      name: 'hideOnScroll',
      type: PropType.BOOLEAN,
      description: 'Masquer au scroll vers le bas',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Comportement',
        order: 3,
        helpText: 'Le header réapparaît au scroll vers le haut'
      }
    },
    {
      name: 'shrinkOnScroll',
      type: PropType.BOOLEAN,
      description: 'Réduire la taille au scroll',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Comportement',
        order: 4,
        condition: { prop: 'sticky', value: true }
      }
    },
    {
      name: 'enableMegaMenu',
      type: PropType.BOOLEAN,
      description: 'Activer les mega menus',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 5
      }
    },
    {
      name: 'megaMenuStyle',
      type: PropType.STRING,
      description: 'Style des mega menus',
      defaultValue: 'cards',
      required: false,
      validation: {
        options: [
          { label: 'Cards avec images', value: 'cards' },
          { label: 'Colonnes simples', value: 'columns' },
          { label: 'Full width', value: 'full-width' },
          { label: 'Tabs', value: 'tabs' },
          { label: 'Accordion mobile', value: 'accordion' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Fonctionnalités',
        order: 6,
        condition: { prop: 'enableMegaMenu', value: true }
      }
    },
    {
      name: 'enableSearch',
      type: PropType.BOOLEAN,
      description: 'Barre de recherche',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 7
      }
    },
    {
      name: 'searchStyle',
      type: PropType.STRING,
      description: 'Style de recherche',
      defaultValue: 'modal',
      required: false,
      validation: {
        options: [
          { label: 'Modal plein écran', value: 'modal' },
          { label: 'Dropdown', value: 'dropdown' },
          { label: 'Inline expandable', value: 'inline' },
          { label: 'Sidebar', value: 'sidebar' },
          { label: 'Instant search', value: 'instant' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Fonctionnalités',
        order: 8,
        condition: { prop: 'enableSearch', value: true }
      }
    },
    {
      name: 'enableDarkMode',
      type: PropType.BOOLEAN,
      description: 'Bouton dark mode',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 9
      }
    },
    {
      name: 'darkModeStyle',
      type: PropType.STRING,
      description: 'Style du toggle',
      defaultValue: 'switch',
      required: false,
      validation: {
        options: [
          { label: 'Switch iOS', value: 'switch' },
          { label: 'Icône soleil/lune', value: 'icon' },
          { label: 'Bouton texte', value: 'button' },
          { label: 'Auto selon système', value: 'auto' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Fonctionnalités',
        order: 10,
        condition: { prop: 'enableDarkMode', value: true }
      }
    },
    {
      name: 'enableLanguageSelector',
      type: PropType.BOOLEAN,
      description: 'Sélecteur de langue',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 11
      }
    },
    {
      name: 'languages',
      type: PropType.ARRAY,
      description: 'Langues disponibles',
      defaultValue: [
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'es', label: 'Español', flag: '🇪🇸' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Fonctionnalités',
        order: 12,
        condition: { prop: 'enableLanguageSelector', value: true }
      }
    },
    {
      name: 'logo',
      type: PropType.OBJECT,
      description: 'Logo de l\'entreprise',
      defaultValue: {
        url: '/logo.png',
        alt: 'Logo',
        width: 150,
        height: 40
      },
      required: true,
      editorConfig: {
        control: EditorControl.OBJECT,
        group: 'Contenu',
        order: 13
      }
    },
    {
      name: 'navigation',
      type: PropType.ARRAY,
      description: 'Éléments de navigation',
      defaultValue: [
        {
          label: 'Services',
          link: '#services',
          megaMenu: true,
          columns: [
            {
              title: 'Services Principaux',
              items: [
                { label: 'Développement Web', link: '/services/web', description: 'Sites web sur mesure', icon: 'code' },
                { label: 'Design UI/UX', link: '/services/design', description: 'Interfaces modernes', icon: 'palette' },
                { label: 'Marketing Digital', link: '/services/marketing', description: 'Stratégies efficaces', icon: 'trending-up' }
              ]
            },
            {
              title: 'Solutions',
              items: [
                { label: 'E-commerce', link: '/solutions/ecommerce', description: 'Boutiques en ligne', icon: 'shopping-cart' },
                { label: 'Applications', link: '/solutions/apps', description: 'Apps mobiles', icon: 'smartphone' },
                { label: 'SEO', link: '/solutions/seo', description: 'Référencement', icon: 'search' }
              ]
            }
          ],
          featured: {
            title: 'Nouveau Service',
            description: 'Découvrez notre offre IA',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
            link: '/services/ai',
            cta: 'En savoir plus'
          }
        },
        {
          label: 'À propos',
          link: '/about',
          megaMenu: false
        },
        {
          label: 'Portfolio',
          link: '/portfolio',
          megaMenu: false
        },
        {
          label: 'Contact',
          link: '/contact',
          megaMenu: false,
          highlight: true
        }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Contenu',
        order: 14
      }
    },
    {
      name: 'mobileMenuStyle',
      type: PropType.STRING,
      description: 'Style du menu mobile',
      defaultValue: 'slide-right',
      required: false,
      validation: {
        options: [
          { label: 'Slide depuis droite', value: 'slide-right' },
          { label: 'Slide depuis gauche', value: 'slide-left' },
          { label: 'Fullscreen', value: 'fullscreen' },
          { label: 'Dropdown', value: 'dropdown' },
          { label: 'Bottom sheet', value: 'bottom-sheet' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Mobile',
        order: 15
      }
    },
    {
      name: 'enableTopBar',
      type: PropType.BOOLEAN,
      description: 'Barre d\'info au-dessus',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 16
      }
    },
    {
      name: 'topBarContent',
      type: PropType.STRING,
      description: 'Contenu de la barre d\'info',
      defaultValue: '📞 01 23 45 67 89 | 📧 contact@example.com | 🕒 Lun-Ven 9h-18h',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Options',
        order: 17,
        condition: { prop: 'enableTopBar', value: true }
      }
    },
    {
      name: 'enableSocialIcons',
      type: PropType.BOOLEAN,
      description: 'Icônes réseaux sociaux',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 18
      }
    },
    {
      name: 'socialLinks',
      type: PropType.ARRAY,
      description: 'Liens réseaux sociaux',
      defaultValue: [
        { platform: 'facebook', url: 'https://facebook.com', icon: 'facebook' },
        { platform: 'instagram', url: 'https://instagram.com', icon: 'instagram' },
        { platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Options',
        order: 19,
        condition: { prop: 'enableSocialIcons', value: true }
      }
    },
    {
      name: 'ctaButton',
      type: PropType.OBJECT,
      description: 'Bouton d\'action principal',
      defaultValue: {
        text: 'Devis gratuit',
        link: '/contact',
        style: 'primary'
      },
      required: false,
      editorConfig: {
        control: EditorControl.OBJECT,
        group: 'Contenu',
        order: 20
      }
    },
    {
      name: 'animationStyle',
      type: PropType.STRING,
      description: 'Style d\'animation',
      defaultValue: 'smooth',
      required: false,
      validation: {
        options: [
          { label: 'Smooth', value: 'smooth' },
          { label: 'Bouncy', value: 'bouncy' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Énergique', value: 'energetic' },
          { label: 'Aucune', value: 'none' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Animations',
        order: 21
      }
    }
  ]
};

export function renderHeaderUltraModern(props: any, variants: string[] = []): RenderedBlock {
  const {
    variant = 'transparent-modern',
    sticky = true,
    hideOnScroll = false,
    shrinkOnScroll = true,
    enableMegaMenu = true,
    megaMenuStyle = 'cards',
    enableSearch = true,
    searchStyle = 'modal',
    enableDarkMode = true,
    darkModeStyle = 'switch',
    enableLanguageSelector = true,
    languages = [],
    logo = {},
    navigation = [],
    mobileMenuStyle = 'slide-right',
    enableTopBar = true,
    topBarContent = '',
    enableSocialIcons = true,
    socialLinks = [],
    ctaButton = {},
    animationStyle = 'smooth'
  } = props;

  const themeColors = props.themeColors || {
    primary: '#667eea',
    'primary-hover': '#5a67d8',
    secondary: '#48bb78',
    background: '#ffffff',
    text: '#2d3748',
    border: '#e2e8f0'
  };

  // Generate unique IDs for accessibility
  const menuId = `menu-${Math.random().toString(36).substr(2, 9)}`;
  const searchId = `search-${Math.random().toString(36).substr(2, 9)}`;

  // Top bar HTML
  const topBarHtml = enableTopBar ? `
    <div class="header-topbar">
      <div class="container mx-auto px-4">
        <div class="topbar-content">
          <div class="topbar-info">${topBarContent}</div>
          ${enableSocialIcons ? `
            <div class="topbar-social">
              ${socialLinks.map((social: any) => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" 
                   class="social-link" aria-label="${social.platform}">
                  <i class="icon-${social.icon}"></i>
                </a>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  ` : '';

  // Dark mode toggle
  const darkModeToggle = enableDarkMode ? renderDarkModeToggle(darkModeStyle) : '';

  // Language selector
  const languageSelector = enableLanguageSelector ? renderLanguageSelector(languages) : '';

  // Search button
  const searchButton = enableSearch ? `
    <button class="search-trigger" aria-label="Rechercher" data-search-style="${searchStyle}">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  ` : '';

  // Navigation items with mega menus
  const navigationHtml = navigation.map((item: any) => 
    renderNavigationItem(item, enableMegaMenu, megaMenuStyle)
  ).join('');

  // Mobile menu HTML
  const mobileMenuHtml = renderMobileMenu(navigation, mobileMenuStyle, logo);

  // Search modal/dropdown
  const searchHtml = enableSearch ? renderSearchModal(searchStyle) : '';

  // Main header HTML
  const html = `
    ${topBarHtml}
    <header class="header-ultra-modern ${variant} ${sticky ? 'sticky' : ''}" 
            data-hide-on-scroll="${hideOnScroll}"
            data-shrink-on-scroll="${shrinkOnScroll}">
      <div class="header-container">
        <div class="header-content">
          <!-- Logo -->
          <div class="header-logo">
            <a href="/" aria-label="Accueil">
              <img src="${logo.url}" alt="${logo.alt}" 
                   width="${logo.width}" height="${logo.height}"
                   class="logo-image" />
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="header-nav desktop-only" aria-label="Navigation principale">
            <ul class="nav-list">
              ${navigationHtml}
            </ul>
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            ${searchButton}
            ${languageSelector}
            ${darkModeToggle}
            
            ${ctaButton.text ? `
              <a href="${ctaButton.link}" class="cta-button ${ctaButton.style || 'primary'}">
                ${ctaButton.text}
              </a>
            ` : ''}

            <!-- Mobile Menu Trigger -->
            <button class="mobile-menu-trigger mobile-only" 
                    aria-label="Menu" 
                    aria-expanded="false"
                    aria-controls="${menuId}">
              <span class="burger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    ${mobileMenuHtml}
    ${searchHtml}
  `;

  // Variant-specific styles
  const variantStyles: Record<string, string> = {
    'transparent-modern': `
      .header-ultra-modern {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
      
      .header-ultra-modern.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
      }
    `,
    'floating-glass': `
      .header-ultra-modern {
        margin: 20px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      }
    `,
    'minimal-clean': `
      .header-ultra-modern {
        background: white;
        border-bottom: 1px solid ${themeColors.border};
      }
      
      .nav-link {
        font-weight: 400;
        letter-spacing: 0.5px;
      }
    `,
    'bold-gradient': `
      .header-ultra-modern {
        background: linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%);
        color: white;
      }
      
      .nav-link {
        color: rgba(255, 255, 255, 0.9);
      }
      
      .nav-link:hover {
        color: white;
      }
    `,
    'split-nav': `
      .header-content {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
      }
      
      .header-nav {
        order: 1;
      }
      
      .header-logo {
        order: 2;
        justify-self: center;
      }
      
      .header-actions {
        order: 3;
        justify-self: end;
      }
    `,
    'centered-logo': `
      .header-content {
        flex-direction: column;
        padding: 20px 0;
      }
      
      .header-logo {
        margin-bottom: 20px;
      }
      
      .header-nav {
        width: 100%;
        justify-content: center;
      }
      
      .header-actions {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    `,
    'sidebar-reveal': `
      .header-ultra-modern {
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      
      .header-nav {
        position: fixed;
        left: -300px;
        top: 0;
        bottom: 0;
        width: 300px;
        background: white;
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
        transition: left 0.3s ease;
        padding: 80px 20px 20px;
        overflow-y: auto;
      }
      
      .header-nav.active {
        left: 0;
      }
      
      .nav-list {
        flex-direction: column;
        gap: 20px;
      }
    `,
    'fullscreen-overlay': `
      .header-ultra-modern {
        background: white;
        border-bottom: 1px solid ${themeColors.border};
      }
      
      .header-nav {
        position: fixed;
        inset: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .header-nav.active {
        opacity: 1;
        visibility: visible;
      }
      
      .nav-list {
        flex-direction: column;
        gap: 40px;
        font-size: 2rem;
      }
    `
  };

  const css = `
    <style>
      /* Top Bar */
      .header-topbar {
        background: ${themeColors.text};
        color: white;
        font-size: 0.875rem;
        padding: 8px 0;
      }
      
      .topbar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .topbar-social {
        display: flex;
        gap: 15px;
      }
      
      .social-link {
        color: rgba(255, 255, 255, 0.8);
        transition: color 0.3s ease;
      }
      
      .social-link:hover {
        color: white;
      }
      
      /* Main Header */
      .header-ultra-modern {
        position: ${sticky ? 'sticky' : 'relative'};
        top: 0;
        z-index: 1000;
        transition: all 0.3s ease;
      }
      
      .header-ultra-modern.sticky.scrolled {
        ${shrinkOnScroll ? `
          padding: 10px 0;
        ` : ''}
      }
      
      .header-ultra-modern.hide {
        transform: translateY(-100%);
      }
      
      .header-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        transition: padding 0.3s ease;
      }
      
      /* Logo */
      .header-logo {
        flex-shrink: 0;
      }
      
      .logo-image {
        height: auto;
        max-height: 50px;
        transition: max-height 0.3s ease;
      }
      
      .scrolled .logo-image {
        ${shrinkOnScroll ? 'max-height: 40px;' : ''}
      }
      
      /* Navigation */
      .header-nav {
        display: flex;
        align-items: center;
      }
      
      .nav-list {
        display: flex;
        align-items: center;
        gap: 40px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .nav-item {
        position: relative;
      }
      
      .nav-link {
        display: flex;
        align-items: center;
        gap: 6px;
        color: ${themeColors.text};
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
        padding: 8px 0;
      }
      
      .nav-link:hover {
        color: ${themeColors.primary};
      }
      
      .nav-link.highlight {
        color: ${themeColors.primary};
      }
      
      .nav-arrow {
        width: 12px;
        height: 12px;
        transition: transform 0.3s ease;
      }
      
      .nav-item:hover .nav-arrow {
        transform: rotate(180deg);
      }
      
      /* Mega Menu */
      .mega-menu {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        padding: 30px;
        min-width: 600px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        margin-top: 20px;
      }
      
      .nav-item:hover .mega-menu {
        opacity: 1;
        visibility: visible;
        margin-top: 10px;
      }
      
      .mega-menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
      }
      
      .mega-menu-column h3 {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${themeColors.text};
        margin-bottom: 20px;
      }
      
      .mega-menu-item {
        display: block;
        padding: 12px 0;
        color: ${themeColors.text};
        text-decoration: none;
        transition: all 0.3s ease;
        border-radius: 8px;
      }
      
      .mega-menu-item:hover {
        color: ${themeColors.primary};
        padding-left: 10px;
        background: ${themeColors.primary}10;
      }
      
      .mega-menu-item-title {
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .mega-menu-item-desc {
        font-size: 0.875rem;
        color: #64748b;
      }
      
      .mega-menu-featured {
        background: ${themeColors.primary}05;
        border-radius: 12px;
        padding: 20px;
      }
      
      .mega-menu-featured img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 15px;
      }
      
      .mega-menu-featured h4 {
        font-size: 1.125rem;
        margin-bottom: 8px;
      }
      
      .mega-menu-featured p {
        font-size: 0.875rem;
        color: #64748b;
        margin-bottom: 15px;
      }
      
      .mega-menu-featured a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: ${themeColors.primary};
        font-weight: 500;
        text-decoration: none;
      }
      
      /* Header Actions */
      .header-actions {
        display: flex;
        align-items: center;
        gap: 20px;
      }
      
      /* Search */
      .search-trigger {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        color: ${themeColors.text};
        transition: color 0.3s ease;
      }
      
      .search-trigger:hover {
        color: ${themeColors.primary};
      }
      
      .search-icon {
        width: 20px;
        height: 20px;
      }
      
      /* Search Modal */
      .search-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 2000;
      }
      
      .search-modal.active {
        opacity: 1;
        visibility: visible;
      }
      
      .search-modal-content {
        width: 90%;
        max-width: 700px;
      }
      
      .search-input-wrapper {
        position: relative;
      }
      
      .search-input {
        width: 100%;
        padding: 20px 60px 20px 20px;
        font-size: 1.5rem;
        background: white;
        border: none;
        border-radius: 12px;
        outline: none;
      }
      
      .search-submit {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: ${themeColors.primary};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      
      .search-submit:hover {
        background: ${themeColors['primary-hover']};
      }
      
      .search-close {
        position: absolute;
        top: 40px;
        right: 40px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
      }
      
      /* Dark Mode Toggle */
      .dark-mode-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        color: ${themeColors.text};
        transition: color 0.3s ease;
      }
      
      .dark-mode-toggle:hover {
        color: ${themeColors.primary};
      }
      
      /* Switch style */
      .dark-mode-switch {
        position: relative;
        width: 50px;
        height: 26px;
        background: #e5e7eb;
        border-radius: 13px;
        transition: background 0.3s ease;
        cursor: pointer;
      }
      
      .dark-mode-switch.active {
        background: ${themeColors.primary};
      }
      
      .dark-mode-switch::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
      }
      
      .dark-mode-switch.active::after {
        transform: translateX(24px);
      }
      
      /* Language Selector */
      .language-selector {
        position: relative;
      }
      
      .language-current {
        display: flex;
        align-items: center;
        gap: 8px;
        background: none;
        border: 1px solid ${themeColors.border};
        padding: 6px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .language-current:hover {
        border-color: ${themeColors.primary};
      }
      
      .language-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        margin-top: 8px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .language-selector:hover .language-dropdown {
        opacity: 1;
        visibility: visible;
      }
      
      .language-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        color: ${themeColors.text};
        text-decoration: none;
        transition: background 0.3s ease;
      }
      
      .language-option:hover {
        background: ${themeColors.primary}10;
      }
      
      /* CTA Button */
      .cta-button {
        display: inline-flex;
        align-items: center;
        padding: 12px 24px;
        background: ${themeColors.primary};
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .cta-button:hover {
        background: ${themeColors['primary-hover']};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      
      /* Mobile Menu Trigger */
      .mobile-menu-trigger {
        display: none;
        background: none;
        border: none;
        padding: 8px;
        cursor: pointer;
      }
      
      .burger-icon {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 24px;
      }
      
      .burger-icon span {
        display: block;
        height: 2px;
        background: ${themeColors.text};
        transition: all 0.3s ease;
      }
      
      .mobile-menu-trigger[aria-expanded="true"] .burger-icon span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-trigger[aria-expanded="true"] .burger-icon span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-trigger[aria-expanded="true"] .burger-icon span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
      
      /* Mobile Menu */
      .mobile-menu {
        position: fixed;
        top: 0;
        right: -100%;
        bottom: 0;
        width: 100%;
        max-width: 400px;
        background: white;
        box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
        transition: right 0.3s ease;
        z-index: 1001;
        overflow-y: auto;
      }
      
      .mobile-menu.active {
        right: 0;
      }
      
      .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid ${themeColors.border};
      }
      
      .mobile-menu-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
      
      .mobile-menu-nav {
        padding: 20px;
      }
      
      .mobile-nav-item {
        border-bottom: 1px solid ${themeColors.border};
      }
      
      .mobile-nav-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        color: ${themeColors.text};
        text-decoration: none;
        font-weight: 500;
      }
      
      .mobile-submenu {
        padding-left: 20px;
        margin-top: 10px;
        display: none;
      }
      
      .mobile-submenu.active {
        display: block;
      }
      
      .mobile-submenu-item {
        padding: 10px 0;
      }
      
      .mobile-submenu-link {
        color: #64748b;
        text-decoration: none;
        font-size: 0.9rem;
      }
      
      /* Variant Styles */
      ${variantStyles[variant] || variantStyles['transparent-modern']}
      
      /* Animations */
      ${animationStyle === 'smooth' ? `
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      ` : ''}
      
      ${animationStyle === 'bouncy' ? `
        * {
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      ` : ''}
      
      ${animationStyle === 'energetic' ? `
        .nav-link:hover {
          animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      ` : ''}
      
      /* Responsive */
      @media (max-width: 1024px) {
        .desktop-only {
          display: none !important;
        }
        
        .mobile-only {
          display: block !important;
        }
        
        .mobile-menu-trigger {
          display: block;
        }
        
        .header-actions {
          gap: 15px;
        }
        
        .cta-button {
          display: none;
        }
      }
      
      @media (max-width: 640px) {
        .header-topbar {
          display: none;
        }
        
        .header-content {
          padding: 15px 0;
        }
        
        .language-selector {
          display: none;
        }
      }
      
      /* Dark Mode Support */
      @media (prefers-color-scheme: dark) {
        .header-ultra-modern {
          background: rgba(15, 23, 42, 0.95);
          color: white;
        }
        
        .nav-link {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .nav-link:hover {
          color: ${themeColors.primary};
        }
        
        .mega-menu {
          background: #1e293b;
          color: white;
        }
        
        .mega-menu-item {
          color: rgba(255, 255, 255, 0.9);
        }
        
        .mobile-menu {
          background: #1e293b;
          color: white;
        }
      }
      
      /* Accessibility */
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      /* Focus styles */
      a:focus,
      button:focus {
        outline: 2px solid ${themeColors.primary};
        outline-offset: 2px;
      }
      
      /* Print styles */
      @media print {
        .header-topbar,
        .header-actions,
        .mobile-menu-trigger {
          display: none !important;
        }
      }
    </style>
  `;

  const js = `
    <script>
      (function() {
        const header = document.querySelector('.header-ultra-modern');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const searchModal = document.querySelector('.search-modal');
        const searchTrigger = document.querySelector('.search-trigger');
        const searchClose = document.querySelector('.search-close');
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        // Scroll behaviors
        function updateHeader() {
          const currentScrollY = window.scrollY;
          
          // Add scrolled class
          if (currentScrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          
          // Hide on scroll down, show on scroll up
          if (${hideOnScroll}) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
              header.classList.add('hide');
            } else {
              header.classList.remove('hide');
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        }
        
        function requestTick() {
          if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
          }
        }
        
        if (${sticky}) {
          window.addEventListener('scroll', requestTick);
        }
        
        // Mobile menu
        mobileMenuTrigger?.addEventListener('click', () => {
          const isOpen = mobileMenu.classList.contains('active');
          mobileMenu.classList.toggle('active');
          mobileMenuTrigger.setAttribute('aria-expanded', !isOpen);
          document.body.style.overflow = isOpen ? '' : 'hidden';
        });
        
        mobileMenuClose?.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          mobileMenuTrigger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
        
        // Mobile submenu toggles
        document.querySelectorAll('.mobile-nav-toggle').forEach(toggle => {
          toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            submenu.classList.toggle('active');
            toggle.classList.toggle('active');
          });
        });
        
        // Search modal
        searchTrigger?.addEventListener('click', () => {
          const searchStyle = searchTrigger.dataset.searchStyle;
          
          if (searchStyle === 'modal') {
            searchModal.classList.add('active');
            setTimeout(() => {
              searchModal.querySelector('.search-input')?.focus();
            }, 100);
          }
          // Add other search styles handling here
        });
        
        searchClose?.addEventListener('click', () => {
          searchModal.classList.remove('active');
        });
        
        searchModal?.addEventListener('click', (e) => {
          if (e.target === searchModal) {
            searchModal.classList.remove('active');
          }
        });
        
        // Dark mode toggle
        darkModeToggle?.addEventListener('click', () => {
          const isDark = document.documentElement.classList.contains('dark');
          document.documentElement.classList.toggle('dark');
          
          // Save preference
          localStorage.setItem('darkMode', !isDark ? 'true' : 'false');
          
          // Update toggle state
          if (darkModeToggle.classList.contains('dark-mode-switch')) {
            darkModeToggle.classList.toggle('active');
          }
        });
        
        // Check saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true' || 
            (savedDarkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          darkModeToggle?.classList.add('active');
        }
        
        // Language selector
        document.querySelectorAll('.language-option').forEach(option => {
          option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.dataset.lang;
            
            // Save language preference
            localStorage.setItem('language', lang);
            
            // Update current language display
            const currentLang = document.querySelector('.language-current span');
            if (currentLang) {
              currentLang.textContent = option.textContent;
            }
            
            // Trigger language change event
            window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
          });
        });
        
        // Mega menu keyboard navigation
        const megaMenuItems = document.querySelectorAll('.nav-item');
        megaMenuItems.forEach(item => {
          const link = item.querySelector('.nav-link');
          const megaMenu = item.querySelector('.mega-menu');
          
          if (megaMenu) {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            
            item.addEventListener('mouseenter', () => {
              link.setAttribute('aria-expanded', 'true');
            });
            
            item.addEventListener('mouseleave', () => {
              link.setAttribute('aria-expanded', 'false');
            });
            
            // Keyboard support
            link.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = link.getAttribute('aria-expanded') === 'true';
                link.setAttribute('aria-expanded', !isOpen);
                megaMenu.style.opacity = isOpen ? '0' : '1';
                megaMenu.style.visibility = isOpen ? 'hidden' : 'visible';
              }
            });
          }
        });
        
        // Escape key handlers
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            // Close mobile menu
            if (mobileMenu?.classList.contains('active')) {
              mobileMenu.classList.remove('active');
              mobileMenuTrigger.setAttribute('aria-expanded', 'false');
              document.body.style.overflow = '';
            }
            
            // Close search modal
            if (searchModal?.classList.contains('active')) {
              searchModal.classList.remove('active');
            }
            
            // Close mega menus
            document.querySelectorAll('.nav-link[aria-expanded="true"]').forEach(link => {
              link.setAttribute('aria-expanded', 'false');
            });
          }
        });
        
        // Intersection Observer for animations
        if ('${animationStyle}' !== 'none') {
          const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
          };
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
              }
            });
          }, observerOptions);
          
          document.querySelectorAll('.nav-item').forEach(item => {
            observer.observe(item);
          });
        }
      })();
    </script>
  `;

  return {
    html: css + html + js,
    css: '', // CSS included in HTML
    js: '' // JS included in HTML
  };
}

// Helper functions
function renderDarkModeToggle(style: string): string {
  switch (style) {
    case 'switch':
      return `
        <button class="dark-mode-toggle dark-mode-switch" 
                aria-label="Basculer le mode sombre"
                role="switch"
                aria-checked="false">
        </button>
      `;
    case 'icon':
      return `
        <button class="dark-mode-toggle" aria-label="Basculer le mode sombre">
          <svg class="sun-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg class="moon-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      `;
    case 'button':
      return `
        <button class="dark-mode-toggle cta-button secondary" aria-label="Mode sombre">
          <span class="light-text">🌙 Sombre</span>
          <span class="dark-text" style="display: none;">☀️ Clair</span>
        </button>
      `;
    default:
      return '';
  }
}

function renderLanguageSelector(languages: any[]): string {
  if (!languages || languages.length === 0) return '';
  
  const currentLang = languages[0];
  
  return `
    <div class="language-selector">
      <button class="language-current" aria-label="Changer de langue" aria-haspopup="true">
        <span>${currentLang.flag}</span>
        <span>${currentLang.label}</span>
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="language-dropdown" role="menu">
        ${languages.map(lang => `
          <a href="#" class="language-option" data-lang="${lang.code}" role="menuitem">
            <span>${lang.flag}</span>
            <span>${lang.label}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function renderNavigationItem(item: any, enableMegaMenu: boolean, megaMenuStyle: string): string {
  const hasDropdown = item.megaMenu && enableMegaMenu && item.columns;
  
  return `
    <li class="nav-item">
      <a href="${item.link}" class="nav-link ${item.highlight ? 'highlight' : ''}">
        ${item.label}
        ${hasDropdown ? `
          <svg class="nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        ` : ''}
      </a>
      ${hasDropdown ? renderMegaMenu(item, megaMenuStyle) : ''}
    </li>
  `;
}

function renderMegaMenu(item: any, style: string): string {
  switch (style) {
    case 'cards':
      return `
        <div class="mega-menu">
          <div class="mega-menu-grid">
            ${item.columns.map((column: any) => `
              <div class="mega-menu-column">
                <h3>${column.title}</h3>
                ${column.items.map((subItem: any) => `
                  <a href="${subItem.link}" class="mega-menu-item">
                    <div class="mega-menu-item-title">${subItem.label}</div>
                    ${subItem.description ? `
                      <div class="mega-menu-item-desc">${subItem.description}</div>
                    ` : ''}
                  </a>
                `).join('')}
              </div>
            `).join('')}
            ${item.featured ? `
              <div class="mega-menu-featured">
                ${item.featured.image ? `
                  <img src="${item.featured.image}" alt="${item.featured.title}" />
                ` : ''}
                <h4>${item.featured.title}</h4>
                <p>${item.featured.description}</p>
                <a href="${item.featured.link}">
                  ${item.featured.cta} →
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    // Add other mega menu styles here
    default:
      return '';
  }
}

function renderMobileMenu(navigation: any[], style: string, logo: any): string {
  return `
    <div class="mobile-menu ${style}" role="dialog" aria-label="Menu de navigation">
      <div class="mobile-menu-header">
        <img src="${logo.url}" alt="${logo.alt}" height="30" />
        <button class="mobile-menu-close" aria-label="Fermer le menu">
          <span>✕</span>
        </button>
      </div>
      <nav class="mobile-menu-nav">
        ${navigation.map(item => `
          <div class="mobile-nav-item">
            ${item.columns ? `
              <button class="mobile-nav-link mobile-nav-toggle">
                ${item.label}
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div class="mobile-submenu">
                ${item.columns.map((column: any) => 
                  column.items.map((subItem: any) => `
                    <div class="mobile-submenu-item">
                      <a href="${subItem.link}" class="mobile-submenu-link">
                        ${subItem.label}
                      </a>
                    </div>
                  `).join('')
                ).join('')}
              </div>
            ` : `
              <a href="${item.link}" class="mobile-nav-link">
                ${item.label}
              </a>
            `}
          </div>
        `).join('')}
      </nav>
    </div>
  `;
}

function renderSearchModal(style: string): string {
  if (style === 'modal') {
    return `
      <div class="search-modal" role="dialog" aria-label="Recherche">
        <button class="search-close" aria-label="Fermer la recherche">
          <span>✕</span>
        </button>
        <div class="search-modal-content">
          <form class="search-form" action="/search" method="GET">
            <div class="search-input-wrapper">
              <input 
                type="search" 
                name="q" 
                class="search-input" 
                placeholder="Rechercher..."
                aria-label="Rechercher"
                autocomplete="off"
              />
              <button type="submit" class="search-submit">
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  // Add other search styles here
  return '';
}
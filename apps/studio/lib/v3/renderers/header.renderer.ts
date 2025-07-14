/**
 * Header Renderer V3 - Rendu robuste avec toutes les fonctionnalités
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { headerDataSchema, headerDefaults, type HeaderData } from '../schemas/blocks/header';

export class HeaderRendererV3 implements BlockRenderer<HeaderData> {
  type = 'header-ultra-modern';
  version = '3.0.0';

  validate(data: unknown): z.SafeParseReturnType<HeaderData, HeaderData> {
    return headerDataSchema.safeParse(data);
  }

  getDefaultData(): HeaderData {
    return headerDefaults;
  }

  getDefaultCSS(): string {
    return `
/* Header Base Styles */
.header {
  position: relative;
  width: 100%;
  background: white;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header--sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.header--transparent {
  background: transparent;
}

.header--scrolled {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header--hidden {
  transform: translateY(-100%);
}

/* Container */
.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height, 70px);
  transition: height 0.3s ease;
}

.header--scrolled .header__wrapper {
  height: calc(var(--header-height, 70px) - 10px);
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text, #1f2937);
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s;
}

.header__logo:hover {
  opacity: 0.8;
}

.header__logo-image {
  height: 40px;
  width: auto;
  margin-right: 0.5rem;
}

/* Navigation */
.header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header__menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.header__menu-item {
  position: relative;
}

.header__menu-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--text, #1f2937);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border-radius: 0.5rem;
}

.header__menu-link:hover {
  color: var(--primary, #3b82f6);
  background: rgba(59, 130, 246, 0.1);
}

/* Dropdown */
.header__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.header__menu-item:hover .header__dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.header__dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text, #1f2937);
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.header__dropdown-item:hover {
  background: var(--bg-elevated, #f9fafb);
  color: var(--primary, #3b82f6);
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Search */
.header__search {
  position: relative;
}

.header__search-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text, #1f2937);
  transition: all 0.3s;
}

.header__search-toggle:hover {
  color: var(--primary, #3b82f6);
}

/* Dark Mode Toggle */
.header__dark-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text, #1f2937);
  transition: all 0.3s;
}

/* Mobile Menu Toggle */
.header__mobile-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text, #1f2937);
}

.header__mobile-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: currentColor;
  margin: 5px 0;
  transition: all 0.3s;
}

.header__mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.header__mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.header__mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Menu */
.header__mobile-menu {
  position: fixed;
  top: var(--header-height, 70px);
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 2rem;
}

.header__mobile-menu.active {
  transform: translateX(0);
}

.header__mobile-menu .header__menu {
  flex-direction: column;
  gap: 1rem;
}

/* Mega Menu */
.header__mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  max-width: 90vw;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  margin-top: 1rem;
}

.header__menu-item:hover .header__mega-menu {
  opacity: 1;
  visibility: visible;
}

.header__mega-menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

/* Variants */
.header--glassmorphism {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.header--gradient-accent {
  background: linear-gradient(90deg, var(--primary-50), var(--secondary-50));
}

.header--minimal-float {
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}

/* Top Bar */
.header__topbar {
  background: var(--primary, #3b82f6);
  color: white;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  text-align: center;
}

.header__topbar--dismissible {
  position: relative;
  padding-right: 2rem;
}

.header__topbar-close {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header__nav {
    display: none;
  }
  
  .header__mobile-toggle {
    display: block;
  }
  
  .header__actions {
    margin-left: auto;
  }
}

/* Height variants */
.header--height-sm .header__wrapper { height: 50px; }
.header--height-md .header__wrapper { height: 70px; }
.header--height-lg .header__wrapper { height: 90px; }
.header--height-xl .header__wrapper { height: 110px; }

/* Padding variants */
.header--padding-none .header__container { padding: 0; }
.header--padding-sm .header__container { padding: 0 0.5rem; }
.header--padding-md .header__container { padding: 0 1rem; }
.header--padding-lg .header__container { padding: 0 2rem; }

/* Shadow variants */
.header--shadow-none { box-shadow: none; }
.header--shadow-sm { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.header--shadow-md { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.header--shadow-lg { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
.header--shadow-xl { box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1); }`;
  }

  getRequiredAssets() {
    return [];
  }

  renderPreview(data: HeaderData): string {
    return `
<div class="header-preview">
  <h3>Header ${data.variant}</h3>
  <p>${data.navigation.items.length} menu items</p>
</div>`;
  }

  render(data: HeaderData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    try {
      // Générer le HTML
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      const css = this.generateCSS(data);
      
      // Générer le JS (menu mobile, sticky, etc.)
      const js = this.generateJS(data);
      
      // Calculer les performances
      const renderTime = performance.now() - startTime;
      
      return {
        html,
        css: this.getDefaultCSS() + css,
        js,
        assets: [],
        errors: [],
        warnings: [],
        performance: {
          renderTime,
          cssSize: css.length,
          jsSize: js.length,
        }
      };
    } catch (error) {
      return {
        html: '<header class="header header--error">Erreur de rendu</header>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'header',
          message: error instanceof Error ? error.message : 'Erreur inconnue',
          fallbackUsed: true
        }],
        warnings: [],
        performance: {
          renderTime: performance.now() - startTime,
          cssSize: 0,
          jsSize: 0,
        }
      };
    }
  }

  private generateHTML(data: HeaderData): string {
    const classes = [
      'header',
      `header--${data.variant}`,
      `header--height-${data.styles.height}`,
      `header--padding-${data.styles.padding}`,
      `header--shadow-${data.styles.shadow}`,
      data.behavior.sticky ? 'header--sticky' : '',
      data.behavior.transparent ? 'header--transparent' : '',
      data.styles.blur ? 'header--blur' : ''
    ].filter(Boolean).join(' ');

    return `
${data.topBar.enabled ? this.renderTopBar(data.topBar) : ''}

<header class="${classes}" id="main-header" data-block="header">
  <div class="header__container">
    <div class="header__wrapper">
      ${this.renderLogo(data.logo)}
      
      ${this.renderNavigation(data.navigation)}
      
      <div class="header__actions">
        ${data.search.enabled ? this.renderSearch(data.search) : ''}
        ${data.languageSelector.enabled ? this.renderLanguageSelector(data.languageSelector) : ''}
        ${data.darkMode.enabled ? this.renderDarkModeToggle(data.darkMode) : ''}
        ${data.actions.enabled ? this.renderActions(data.actions) : ''}
        
        <button class="header__mobile-toggle" id="mobile-menu-toggle" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
  
  ${this.renderMobileMenu(data)}
</header>`;
  }

  private renderTopBar(topBar: any): string {
    if (!topBar.enabled) return '';
    
    const classes = [
      'header__topbar',
      `header__topbar--${topBar.style}`,
      topBar.dismissible ? 'header__topbar--dismissible' : ''
    ].filter(Boolean).join(' ');
    
    return `
<div class="${classes}" id="header-topbar">
  ${this.escape(topBar.content)}
  ${topBar.dismissible ? `
    <button class="header__topbar-close" aria-label="Fermer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  ` : ''}
</div>`;
  }

  private renderLogo(logo: HeaderData['logo']): string {
    const content = logo.type === 'image' && logo.image
      ? `<img src="${logo.image.src}" alt="${this.escape(logo.image.alt || logo.text)}" class="header__logo-image" />`
      : logo.type === 'both' && logo.image
      ? `<img src="${logo.image.src}" alt="${this.escape(logo.image.alt || '')}" class="header__logo-image" /><span>${this.escape(logo.text)}</span>`
      : `<span>${this.escape(logo.text)}</span>`;
    
    return `
<a href="${logo.link}" class="header__logo header__logo--${logo.size}">
  ${content}
</a>`;
  }

  private renderNavigation(nav: HeaderData['navigation']): string {
    return `
<nav class="header__nav" role="navigation">
  <ul class="header__menu header__menu--${nav.style}">
    ${nav.items.map(item => this.renderMenuItem(item)).join('')}
  </ul>
</nav>`;
  }

  private renderMenuItem(item: any): string {
    const hasDropdown = item.subItems && item.subItems.length > 0;
    const hasMegaMenu = item.megaMenu?.enabled;
    
    return `
<li class="header__menu-item">
  <a href="${item.link}" class="header__menu-link" ${item.target !== '_self' ? `target="${item.target}"` : ''}>
    ${item.icon ? `<span class="header__menu-icon">${item.icon}</span>` : ''}
    ${this.escape(item.label)}
    ${item.badge ? `<span class="header__menu-badge header__menu-badge--${item.badge.color}">${this.escape(item.badge.text)}</span>` : ''}
    ${hasDropdown || hasMegaMenu ? '<svg class="header__menu-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round"/></svg>' : ''}
  </a>
  
  ${hasMegaMenu ? this.renderMegaMenu(item.megaMenu) : ''}
  ${hasDropdown && !hasMegaMenu ? this.renderDropdown(item.subItems) : ''}
</li>`;
  }

  private renderDropdown(items: any[]): string {
    return `
<ul class="header__dropdown">
  ${items.map(item => `
    <li>
      <a href="${item.link}" class="header__dropdown-item" ${item.target !== '_self' ? `target="${item.target}"` : ''}>
        ${item.icon ? `<span class="header__dropdown-icon">${item.icon}</span>` : ''}
        ${this.escape(item.label)}
      </a>
    </li>
  `).join('')}
</ul>`;
  }

  private renderMegaMenu(megaMenu: any): string {
    return `
<div class="header__mega-menu header__mega-menu--${megaMenu.style}">
  <div class="header__mega-menu-grid" style="grid-template-columns: repeat(${megaMenu.columns}, 1fr)">
    ${megaMenu.items.map(item => `
      <a href="${item.link}" class="header__mega-menu-item">
        ${item.image ? `<img src="${item.image.src}" alt="${this.escape(item.image.alt || '')}" class="header__mega-menu-image" />` : ''}
        ${item.icon ? `<div class="header__mega-menu-icon">${item.icon}</div>` : ''}
        <h4 class="header__mega-menu-title">${this.escape(item.title)}</h4>
        ${item.description ? `<p class="header__mega-menu-desc">${this.escape(item.description)}</p>` : ''}
      </a>
    `).join('')}
  </div>
</div>`;
  }

  private renderSearch(search: any): string {
    return `
<div class="header__search">
  <button class="header__search-toggle" aria-label="Rechercher" data-search-style="${search.style}">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  </button>
</div>`;
  }

  private renderLanguageSelector(langSelector: any): string {
    const currentLang = langSelector.languages[0];
    
    return `
<div class="header__language-selector header__language-selector--${langSelector.style}">
  <button class="header__language-toggle" aria-label="Langue">
    ${langSelector.style === 'flags' && currentLang.flag ? `<img src="${currentLang.flag}" alt="${currentLang.label}" class="header__language-flag" />` : ''}
    ${langSelector.style !== 'flags' ? `<span>${currentLang.code.toUpperCase()}</span>` : ''}
  </button>
</div>`;
  }

  private renderDarkModeToggle(darkMode: any): string {
    return `
<button class="header__dark-toggle" aria-label="Mode sombre" data-dark-style="${darkMode.style}">
  <svg class="header__dark-icon header__dark-icon--light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
  <svg class="header__dark-icon header__dark-icon--dark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: none;">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</button>`;
  }

  private renderActions(actions: any): string {
    return actions.items.map(action => {
      const classes = [
        'btn',
        `btn--${action.variant}`,
        `btn--${action.size}`
      ].join(' ');
      
      return `<a href="${action.link}" class="${classes}">${this.escape(action.text)}</a>`;
    }).join('');
  }

  private renderMobileMenu(data: HeaderData): string {
    return `
<div class="header__mobile-menu" id="mobile-menu">
  <nav>
    <ul class="header__menu">
      ${data.navigation.items.map(item => this.renderMobileMenuItem(item)).join('')}
    </ul>
  </nav>
  
  ${data.actions.enabled ? `
    <div class="header__mobile-actions">
      ${this.renderActions(data.actions)}
    </div>
  ` : ''}
</div>`;
  }

  private renderMobileMenuItem(item: any): string {
    return `
<li class="header__menu-item">
  <a href="${item.link}" class="header__menu-link">
    ${this.escape(item.label)}
  </a>
  ${item.subItems ? `
    <ul class="header__submenu">
      ${item.subItems.map(sub => `
        <li><a href="${sub.link}" class="header__submenu-link">${this.escape(sub.label)}</a></li>
      `).join('')}
    </ul>
  ` : ''}
</li>`;
  }

  private generateCSS(data: HeaderData): string {
    let css = '';
    
    // CSS des couleurs personnalisées
    if (data.styles.backgroundColor || data.styles.textColor) {
      css += `
.header {
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
  ${data.styles.textColor ? `color: ${data.styles.textColor};` : ''}
}`;
    }
    
    // CSS du top bar
    if (data.topBar.enabled && (data.topBar.backgroundColor || data.topBar.textColor)) {
      css += `
.header__topbar {
  ${data.topBar.backgroundColor ? `background-color: ${data.topBar.backgroundColor};` : ''}
  ${data.topBar.textColor ? `color: ${data.topBar.textColor};` : ''}
}`;
    }
    
    return css;
  }

  private generateJS(data: HeaderData): string {
    return `
// Header V3 JavaScript
(function() {
  const header = document.getElementById('main-header');
  if (!header) return;
  
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  ${data.behavior.sticky ? `
  // Sticky header
  let lastScroll = 0;
  const headerHeight = header.offsetHeight;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    ${data.behavior.hideOnScroll ? `
    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > headerHeight) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    ` : ''}
    
    lastScroll = currentScroll;
  });
  ` : ''}
  
  ${data.topBar.enabled && data.topBar.dismissible ? `
  // Top bar dismiss
  const topBar = document.getElementById('header-topbar');
  const topBarClose = topBar?.querySelector('.header__topbar-close');
  
  if (topBarClose) {
    topBarClose.addEventListener('click', () => {
      topBar.style.display = 'none';
      localStorage.setItem('topBarDismissed', 'true');
    });
    
    // Check if already dismissed
    if (localStorage.getItem('topBarDismissed') === 'true') {
      topBar.style.display = 'none';
    }
  }
  ` : ''}
  
  ${data.search.enabled ? `
  // Search functionality
  const searchToggle = document.querySelector('.header__search-toggle');
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      // Implement search modal/dropdown based on style
      console.log('Search opened:', '${data.search.style}');
    });
    
    ${data.search.hotkey ? `
    // Hotkey support
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchToggle.click();
      }
    });
    ` : ''}
  }
  ` : ''}
  
  ${data.darkMode.enabled ? `
  // Dark mode toggle
  const darkToggle = document.querySelector('.header__dark-toggle');
  const lightIcon = darkToggle?.querySelector('.header__dark-icon--light');
  const darkIcon = darkToggle?.querySelector('.header__dark-icon--dark');
  
  if (darkToggle) {
    // Get current theme
    const currentTheme = localStorage.getItem('theme') || '${data.darkMode.defaultMode}';
    
    // Apply theme
    if (currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'block';
    }
    
    // Toggle theme
    darkToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      lightIcon.style.display = isDark ? 'none' : 'block';
      darkIcon.style.display = isDark ? 'block' : 'none';
    });
  }
  ` : ''}
})();`;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
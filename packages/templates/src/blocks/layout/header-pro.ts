import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const headerPro: Block = {
  id: 'header-pro',
  name: 'Header Professionnel',
  description: 'En-tête professionnel avec navigation complète et sous-menus',
  category: BlockCategory.HEADER,
  tags: ['header', 'navigation', 'menu', 'dropdown', 'responsive'],
  thumbnail: '/blocks/header-pro.svg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'logoType',
      type: PropType.STRING,
      description: 'Type de logo',
      required: true,
      defaultValue: 'text',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Logo',
        order: 1
      },
      validation: {
        options: [
          { value: 'text', label: 'Texte' },
          { value: 'image', label: 'Image' }
        ]
      }
    },
    {
      name: 'logoText',
      type: PropType.STRING,
      description: 'Nom de l\'entreprise',
      required: false,
      defaultValue: 'MonEntreprise',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Nom de l\'entreprise',
        group: 'Logo',
        order: 2
      }
    },
    {
      name: 'logoImage',
      type: PropType.STRING,
      description: 'URL du logo',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.IMAGE_PICKER,
        placeholder: 'URL de l\'image du logo',
        group: 'Logo',
        order: 3
      }
    },
    {
      name: 'services',
      type: PropType.STRING,
      description: 'Liste des services',
      required: true,
      defaultValue: JSON.stringify([
        { label: 'Service 1', href: '/services/service-1' },
        { label: 'Service 2', href: '/services/service-2' },
        { label: 'Service 3', href: '/services/service-3' },
        { label: 'Service 4', href: '/services/service-4' }
      ]),
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{label, href}, ...]',
        group: 'Navigation',
        order: 2
      }
    },
    {
      name: 'showCTA',
      type: PropType.STRING,
      description: 'Afficher bouton d\'appel à l\'action',
      required: false,
      defaultValue: 'true',
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 3
      }
    },
    {
      name: 'ctaText',
      type: PropType.STRING,
      description: 'Texte du bouton CTA',
      required: false,
      defaultValue: 'Devis gratuit',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Texte du bouton',
        group: 'Options',
        order: 4
      }
    },
    {
      name: 'ctaHref',
      type: PropType.STRING,
      description: 'Lien du bouton CTA',
      required: false,
      defaultValue: '/contact',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: '/contact',
        group: 'Options',
        order: 5
      }
    }
  ],
  variants: [
    {
      id: 'default',
      name: 'Par défaut',
      description: 'Style par défaut',
      modifications: {}
    }
  ],
  defaultProps: {
    logoType: 'text',
    logoText: 'MonEntreprise',
    logoImage: '',
    services: [
      { label: 'Service 1', href: '/services/service-1' },
      { label: 'Service 2', href: '/services/service-2' },
      { label: 'Service 3', href: '/services/service-3' },
      { label: 'Service 4', href: '/services/service-4' }
    ],
    showCTA: true,
    ctaText: 'Devis gratuit',
    ctaHref: '/contact'
  }
};

export function renderHeaderPro(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const { 
    logoType = 'text',
    logoText = 'MonEntreprise',
    logoImage = '',
    services = [],
    showCTA = true,
    ctaText = 'Devis gratuit',
    ctaHref = '/contact'
  } = props;

  // Générer le logo selon le type
  const logoContent = logoType === 'image' && logoImage
    ? `<img src="${logoImage}" alt="${logoText}" class="logo-image" />`
    : `<span class="logo-text">${logoText}</span>`;

  const html = `
    <header class="header-pro">
      <div class="container">
        <div class="header-content">
          <a href="/" class="logo">
            ${logoContent}
          </a>
          
          <nav class="nav-menu" id="navMenu">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="/" class="nav-link">Accueil</a>
              </li>
              
              <li class="nav-item has-dropdown">
                <a href="/services" class="nav-link">
                  Services
                  <svg class="dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </a>
                <ul class="dropdown-menu">
                  ${services.map((service: any) => `
                    <li><a href="${service.href}" class="dropdown-link">${service.label}</a></li>
                  `).join('')}
                </ul>
              </li>
              
              <li class="nav-item">
                <a href="/contact" class="nav-link">Contact</a>
              </li>
            </ul>
            
            ${showCTA ? `
              <a href="${ctaHref}" class="cta-button mobile-cta">${ctaText}</a>
            ` : ''}
          </nav>
          
          <div class="header-actions">
            ${showCTA ? `
              <a href="${ctaHref}" class="cta-button desktop-cta">${ctaText}</a>
            ` : ''}
            
            <button class="menu-toggle" id="menuToggle" aria-label="Menu">
              <span class="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `;

  const css = `
    .header-pro {
      background: var(--color-background, #fff);
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .header-pro .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .header-pro .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
    }
    
    .header-pro .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: transform 0.3s ease;
    }
    
    .header-pro .logo:hover {
      transform: scale(1.05);
    }
    
    .header-pro .logo-text {
      font-size: 28px;
      font-weight: bold;
      color: var(--color-primary, #333);
    }
    
    .header-pro .logo-image {
      height: 50px;
      width: auto;
      object-fit: contain;
    }
    
    .header-pro .nav-menu {
      display: flex;
      align-items: center;
      gap: 40px;
    }
    
    .header-pro .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 35px;
    }
    
    .header-pro .nav-item {
      position: relative;
    }
    
    .header-pro .nav-link {
      color: var(--color-text, #333);
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
      padding: 10px 0;
      position: relative;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: color 0.3s ease;
    }
    
    .header-pro .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--primary, #007bff);
      transition: width 0.3s ease;
    }
    
    .header-pro .nav-link:hover {
      color: var(--primary, #007bff);
    }
    
    .header-pro .nav-link:hover::after {
      width: 100%;
    }
    
    .header-pro .dropdown-icon {
      transition: transform 0.3s ease;
    }
    
    .header-pro .has-dropdown:hover .dropdown-icon {
      transform: rotate(180deg);
    }
    
    .header-pro .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: #fff;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      border-radius: 8px;
      padding: 10px 0;
      min-width: 200px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      list-style: none;
      margin-top: 10px;
    }
    
    .header-pro .has-dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .header-pro .dropdown-link {
      display: block;
      padding: 12px 20px;
      color: #333;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .header-pro .dropdown-link:hover {
      background: var(--primary-light, #f0f7ff);
      color: var(--primary, #007bff);
      padding-left: 25px;
    }
    
    .header-pro .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .header-pro .cta-button {
      background: var(--primary, #007bff);
      color: #fff;
      padding: 12px 24px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,123,255,0.2);
    }
    
    .header-pro .cta-button:hover {
      background: var(--primary-dark, #0056b3);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,123,255,0.3);
    }
    
    .header-pro .mobile-cta {
      display: none;
    }
    
    .header-pro .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      margin-right: -10px;
    }
    
    .header-pro .menu-icon {
      display: flex;
      flex-direction: column;
      width: 28px;
      height: 20px;
      position: relative;
    }
    
    .header-pro .menu-icon span {
      display: block;
      width: 100%;
      height: 3px;
      background: #333;
      border-radius: 2px;
      position: absolute;
      transition: all 0.3s ease;
    }
    
    .header-pro .menu-icon span:nth-child(1) {
      top: 0;
    }
    
    .header-pro .menu-icon span:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }
    
    .header-pro .menu-icon span:nth-child(3) {
      bottom: 0;
    }
    
    .header-pro.menu-open .menu-icon span:nth-child(1) {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
    
    .header-pro.menu-open .menu-icon span:nth-child(2) {
      opacity: 0;
    }
    
    .header-pro.menu-open .menu-icon span:nth-child(3) {
      bottom: 50%;
      transform: translateY(50%) rotate(-45deg);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
      .header-pro .desktop-cta {
        display: none;
      }
      
      .header-pro .mobile-cta {
        display: block;
        margin-top: 20px;
      }
    }
    
    @media (max-width: 768px) {
      .header-pro .header-content {
        height: 70px;
      }
      
      .header-pro .logo-text {
        font-size: 24px;
      }
      
      .header-pro .logo-image {
        height: 40px;
      }
      
      .header-pro .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: #fff;
        flex-direction: column;
        align-items: flex-start;
        padding: 30px 20px;
        gap: 0;
        transition: left 0.3s ease;
        overflow-y: auto;
      }
      
      .header-pro.menu-open .nav-menu {
        left: 0;
      }
      
      .header-pro .nav-list {
        flex-direction: column;
        width: 100%;
        gap: 0;
      }
      
      .header-pro .nav-item {
        width: 100%;
      }
      
      .header-pro .nav-link {
        padding: 15px 0;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        width: 100%;
      }
      
      .header-pro .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        padding: 0;
        margin-top: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      
      .header-pro .has-dropdown.active .dropdown-menu {
        max-height: 500px;
        padding: 10px 0;
      }
      
      .header-pro .dropdown-link {
        padding: 10px 20px;
        font-size: 16px;
      }
      
      .header-pro .menu-toggle {
        display: block;
      }
      
      .header-pro .cta-button {
        width: 100%;
        text-align: center;
      }
    }
    
    /* Animations */
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .header-pro.scrolled {
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
  `;

  const js = `
    (function() {
      const header = document.querySelector('.header-pro');
      const toggle = document.getElementById('menuToggle');
      const navMenu = document.getElementById('navMenu');
      const dropdowns = document.querySelectorAll('.has-dropdown');
      
      // Mobile menu toggle
      if (toggle && navMenu) {
        toggle.addEventListener('click', function() {
          header.classList.toggle('menu-open');
        });
      }
      
      // Mobile dropdown toggle
      dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('active');
          }
        });
      });
      
      // Header scroll effect
      let lastScroll = 0;
      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
      });
      
      // Close mobile menu on window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          header.classList.remove('menu-open');
          dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
      });
      
      // Close mobile menu on click outside
      document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && header.classList.contains('menu-open')) {
          header.classList.remove('menu-open');
        }
      });
    })();
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}
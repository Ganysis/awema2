import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const simpleHeader: Block = {
  id: 'simple-header',
  name: 'Header Simple',
  description: 'En-tête simple avec logo et navigation',
  category: BlockCategory.HEADER,
  tags: ['header', 'navigation', 'menu'],
  thumbnail: '/blocks/simple-header.svg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'logo',
      type: PropType.STRING,
      description: 'Nom de l\'entreprise',
      required: true,
      defaultValue: 'MonEntreprise',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Nom de l\'entreprise',
        group: 'Logo',
        order: 1
      }
    },
    {
      name: 'menuItems',
      type: PropType.STRING,
      description: 'Éléments du menu',
      required: true,
      defaultValue: JSON.stringify([
        { label: 'Accueil', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' }
      ]),
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{label, href}, ...]',
        group: 'Navigation',
        order: 2
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
    logo: 'MonEntreprise',
    menuItems: [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' }
    ]
  }
};

export function renderSimpleHeader(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const { logo = 'MonEntreprise', menuItems = [] } = props;

  const html = `
    <header class="simple-header">
      <div class="container">
        <div class="header-content">
          <a href="/" class="logo">${logo}</a>
          <nav class="nav-menu">
            <ul>
              ${menuItems.map((item: any) => `
                <li><a href="${item.href}">${item.label}</a></li>
              `).join('')}
            </ul>
          </nav>
          <button class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;

  const css = `
    .simple-header {
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .simple-header .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .simple-header .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    
    .simple-header .logo {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary, #333);
      text-decoration: none;
    }
    
    .simple-header .nav-menu ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 30px;
    }
    
    .simple-header .nav-menu a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .simple-header .nav-menu a:hover {
      color: var(--primary, #007bff);
    }
    
    .simple-header .menu-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }
    
    .simple-header .menu-toggle span {
      display: block;
      width: 25px;
      height: 3px;
      background: #333;
      margin: 3px 0;
      transition: 0.3s;
    }
    
    @media (max-width: 768px) {
      .simple-header .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: #fff;
        transition: left 0.3s;
      }
      
      .simple-header .nav-menu.active {
        left: 0;
      }
      
      .simple-header .nav-menu ul {
        flex-direction: column;
        padding: 20px;
        gap: 20px;
      }
      
      .simple-header .menu-toggle {
        display: flex;
      }
    }
  `;

  const js = `
    (function() {
      const toggle = document.getElementById('menuToggle');
      const menu = document.querySelector('.nav-menu');
      
      if (toggle && menu) {
        toggle.addEventListener('click', function() {
          menu.classList.toggle('active');
        });
      }
    })();
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}
export function renderHeaderUltraModern(props: any): { html: string; css: string; js: string } {
  const {
    variant = 'transparent-blur',
    logo = { text: 'Logo', fontSize: 24 },
    menuItems = [],
    ctaButton,
    sticky = true,
    darkMode = false,
  } = props;

  const html = `
    <header class="header-ultra-modern header-${variant} ${sticky ? 'sticky-header' : ''} ${darkMode ? 'dark-mode' : ''}">
      <div class="container mx-auto px-4">
        <nav class="nav-wrapper">
          <div class="logo-wrapper">
            <a href="/" class="logo" style="font-size: ${logo.fontSize}px">
              ${logo.text}
            </a>
          </div>
          
          <div class="nav-menu">
            <ul class="nav-list">
              ${menuItems.map((item: any) => `
                <li class="nav-item">
                  <a href="${item.link}" class="nav-link">${item.label}</a>
                </li>
              `).join('')}
            </ul>
          </div>
          
          ${ctaButton ? `
            <div class="nav-cta">
              <a href="${ctaButton.link}" class="btn btn-primary">
                ${ctaButton.text}
              </a>
            </div>
          ` : ''}
          
          <button class="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  `;

  const css = `
    .header-ultra-modern {
      position: relative;
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .header-transparent-blur {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    
    .sticky-header {
      position: sticky;
      top: 0;
    }
    
    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }
    
    .logo {
      font-weight: bold;
      text-decoration: none;
      color: inherit;
    }
    
    .nav-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-link {
      text-decoration: none;
      color: inherit;
      transition: color 0.3s ease;
    }
    
    .nav-link:hover {
      color: var(--primary-color, #3B82F6);
    }
    
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
    }
    
    .mobile-menu-toggle span {
      width: 24px;
      height: 2px;
      background: currentColor;
      transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .nav-menu, .nav-cta {
        display: none;
      }
      
      .mobile-menu-toggle {
        display: flex;
      }
    }
  `;

  const js = `
    document.addEventListener('DOMContentLoaded', function() {
      const toggle = document.querySelector('.mobile-menu-toggle');
      const header = document.querySelector('.header-ultra-modern');
      
      if (toggle) {
        toggle.addEventListener('click', function() {
          header.classList.toggle('menu-open');
        });
      }
    });
  `;

  return { html, css, js };
}
import {
  Page,
  Project,
  GeneratorContext,
  BlockInstance,
  Block,
  BlockCategory,
  RenderedBlock,
  Template,
  TemplateVariant
} from '@awema/shared';

export class TemplateEngine {
  // private blockCache: Map<string, Block> = new Map();
  // private templateCache: Map<string, Template> = new Map();

  async renderPage(page: Page, project: Project, context: GeneratorContext): Promise<string> {
    const { template } = project;
    
    // Get template data
    const templateData = await this.getTemplate(template.templateId);
    const variant = templateData.variants.find(v => v.id === template.variant);
    
    if (!variant) {
      throw new Error(`Template variant ${template.variant} not found`);
    }

    // Render blocks
    const renderedBlocks = await Promise.all(
      page.blocks.map(block => this.renderBlock(block, project, context))
    );

    // Build page HTML
    const html = this.buildPageHTML({
      page,
      project,
      template: templateData,
      variant,
      blocks: renderedBlocks,
      context
    });

    return html;
  }

  async renderBlock(
    blockInstance: BlockInstance,
    project: Project,
    _context: GeneratorContext
  ): Promise<RenderedBlock> {
    const block = await this.getBlock(blockInstance.blockId);
    
    // Merge default props with instance props
    const props = {
      ...block.defaultProps,
      ...blockInstance.props
    };

    // Apply variants
    for (const variantId of blockInstance.variants) {
      const variant = block.variants.find(v => v.id === variantId);
      if (variant) {
        Object.assign(props, variant.modifications);
      }
    }

    // Render block HTML (simplified for POC)
    const html = this.renderBlockHTML(block, props, project);
    const css = this.renderBlockCSS(block, props, project);
    const js = block.category === BlockCategory.FORM || block.category === BlockCategory.GALLERY 
      ? this.renderBlockJS(block, props, project) 
      : undefined;

    return {
      html,
      css,
      js,
      dependencies: block.dependencies || [],
      criticalCSS: css // For POC, all CSS is critical
    };
  }

  private renderBlockHTML(block: Block, props: any, project: Project): string {
    // Simplified block rendering for POC
    switch (block.category) {
      case BlockCategory.HERO:
        return this.renderHeroBlock(props, project);
      case BlockCategory.HEADER:
        return this.renderHeaderBlock(props, project);
      case BlockCategory.FEATURES:
        return this.renderFeaturesBlock(props, project);
      case BlockCategory.CTA:
        return this.renderCTABlock(props, project);
      case BlockCategory.FOOTER:
        return this.renderFooterBlock(props, project);
      default:
        return `<div class="block-${block.id}">Block: ${block.name}</div>`;
    }
  }

  private renderHeroBlock(props: any, project: Project): string {
    return `
      <section class="hero" aria-label="Hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">${props.title || project.businessInfo.companyName}</h1>
            <p class="hero-subtitle">${props.subtitle || project.businessInfo.description}</p>
            ${props.ctaText ? `
              <div class="hero-actions">
                <a href="${props.ctaLink || '#contact'}" class="btn btn-primary">
                  ${props.ctaText}
                </a>
              </div>
            ` : ''}
          </div>
          ${props.image ? `
            <div class="hero-image">
              <img src="${props.image}" alt="${props.imageAlt || ''}" loading="lazy">
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  private renderHeaderBlock(props: any, project: Project): string {
    return `
      <header class="header" role="banner">
        <div class="container">
          <div class="header-content">
            <div class="logo">
              ${project.businessInfo.branding.logo ? 
                `<img src="${project.businessInfo.branding.logo}" alt="${project.businessInfo.companyName}">` :
                `<span class="logo-text">${project.businessInfo.companyName}</span>`
              }
            </div>
            <nav class="navigation" role="navigation" aria-label="Main navigation">
              <ul class="nav-list">
                ${(props.navItems || ['Home', 'About', 'Services', 'Contact']).map((item: string) => `
                  <li class="nav-item">
                    <a href="#${item.toLowerCase()}" class="nav-link">${item}</a>
                  </li>
                `).join('')}
              </ul>
            </nav>
            <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
              <span class="hamburger"></span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  private renderFeaturesBlock(props: any, project: Project): string {
    const features = props.features || project.businessInfo.services.slice(0, 3).map(service => ({
      title: service.name,
      description: service.description,
      icon: '✓'
    }));

    return `
      <section class="features" aria-label="Features">
        <div class="container">
          <h2 class="features-title">${props.title || 'Our Services'}</h2>
          <div class="features-grid">
            ${features.map((feature: any) => `
              <div class="feature">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  private renderCTABlock(props: any, _project: Project): string {
    return `
      <section class="cta" aria-label="Call to action">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">${props.title || 'Ready to Get Started?'}</h2>
            <p class="cta-subtitle">${props.subtitle || 'Contact us today for a free consultation'}</p>
            <div class="cta-actions">
              <a href="${props.primaryLink || '#contact'}" class="btn btn-primary">
                ${props.primaryText || 'Get Started'}
              </a>
              ${props.secondaryText ? `
                <a href="${props.secondaryLink || '#learn-more'}" class="btn btn-secondary">
                  ${props.secondaryText}
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderFooterBlock(props: any, project: Project): string {
    const { businessInfo } = project;
    const currentYear = new Date().getFullYear();

    return `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <div class="footer-content">
            <div class="footer-info">
              <h3>${businessInfo.companyName}</h3>
              <p>${businessInfo.description}</p>
              ${businessInfo.contact.address ? `
                <address>
                  ${businessInfo.contact.address.street}<br>
                  ${businessInfo.contact.address.city}, ${businessInfo.contact.address.state} ${businessInfo.contact.address.postalCode}
                </address>
              ` : ''}
            </div>
            <div class="footer-links">
              <h4>Quick Links</h4>
              <ul>
                ${(props.links || ['Privacy Policy', 'Terms of Service', 'Contact']).map((link: string) => `
                  <li><a href="#${link.toLowerCase().replace(/\s+/g, '-')}">${link}</a></li>
                `).join('')}
              </ul>
            </div>
            ${Object.keys(businessInfo.socialMedia).length > 0 ? `
              <div class="footer-social">
                <h4>Follow Us</h4>
                <div class="social-links">
                  ${Object.entries(businessInfo.socialMedia)
                    .filter(([_, url]) => url)
                    .map(([platform, url]) => `
                      <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${platform}">
                        ${platform}
                      </a>
                    `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
          <div class="footer-bottom">
            <p>&copy; ${currentYear} ${businessInfo.companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }

  private renderBlockCSS(block: Block, _props: any, project: Project): string {
    const { colors, fonts, spacing } = project.template.customizations;
    
    // Base CSS variables
    let css = `:root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --text: ${colors.text};
      --text-secondary: ${colors.textSecondary};
      --border: ${colors.border};
      --font-heading: ${fonts.heading};
      --font-body: ${fonts.body};
      --font-size-base: ${fonts.baseSize};
      --spacing-unit: ${spacing.baseUnit}px;
    }\n\n`;

    // Add block-specific CSS
    switch (block.category) {
      case BlockCategory.HERO:
        css += this.getHeroCSS();
        break;
      case BlockCategory.HEADER:
        css += this.getHeaderCSS();
        break;
      case BlockCategory.FEATURES:
        css += this.getFeaturesCSS();
        break;
      case BlockCategory.CTA:
        css += this.getCTACSS();
        break;
      case BlockCategory.FOOTER:
        css += this.getFooterCSS();
        break;
    }

    return css;
  }

  private getHeroCSS(): string {
    return `
    .hero {
      padding: calc(var(--spacing-unit) * 8) 0;
      background: var(--background);
      color: var(--text);
    }
    .hero-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    .hero-title {
      font-family: var(--font-heading);
      font-size: calc(var(--font-size-base) * 3);
      margin-bottom: calc(var(--spacing-unit) * 2);
      line-height: 1.2;
    }
    .hero-subtitle {
      font-size: calc(var(--font-size-base) * 1.25);
      color: var(--text-secondary);
      margin-bottom: calc(var(--spacing-unit) * 4);
    }
    .hero-actions {
      display: flex;
      gap: calc(var(--spacing-unit) * 2);
      justify-content: center;
    }
    `;
  }

  private getHeaderCSS(): string {
    return `
    .header {
      padding: calc(var(--spacing-unit) * 2) 0;
      background: var(--background);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-family: var(--font-heading);
      font-size: calc(var(--font-size-base) * 1.5);
      font-weight: bold;
    }
    .logo img {
      height: 40px;
      width: auto;
    }
    .nav-list {
      display: flex;
      gap: calc(var(--spacing-unit) * 3);
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-link {
      color: var(--text);
      text-decoration: none;
      transition: color 0.3s;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .mobile-menu-toggle {
      display: none;
    }
    @media (max-width: 768px) {
      .navigation {
        display: none;
      }
      .mobile-menu-toggle {
        display: block;
      }
    }
    `;
  }

  private getFeaturesCSS(): string {
    return `
    .features {
      padding: calc(var(--spacing-unit) * 8) 0;
      background: var(--background);
    }
    .features-title {
      font-family: var(--font-heading);
      font-size: calc(var(--font-size-base) * 2.5);
      text-align: center;
      margin-bottom: calc(var(--spacing-unit) * 6);
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: calc(var(--spacing-unit) * 4);
    }
    .feature {
      text-align: center;
      padding: calc(var(--spacing-unit) * 3);
    }
    .feature-icon {
      font-size: calc(var(--font-size-base) * 3);
      color: var(--primary);
      margin-bottom: calc(var(--spacing-unit) * 2);
    }
    .feature-title {
      font-family: var(--font-heading);
      font-size: calc(var(--font-size-base) * 1.5);
      margin-bottom: calc(var(--spacing-unit) * 1);
    }
    .feature-description {
      color: var(--text-secondary);
      line-height: 1.6;
    }
    `;
  }

  private getCTACSS(): string {
    return `
    .cta {
      padding: calc(var(--spacing-unit) * 8) 0;
      background: var(--primary);
      color: white;
      text-align: center;
    }
    .cta-title {
      font-family: var(--font-heading);
      font-size: calc(var(--font-size-base) * 2.5);
      margin-bottom: calc(var(--spacing-unit) * 2);
    }
    .cta-subtitle {
      font-size: calc(var(--font-size-base) * 1.25);
      margin-bottom: calc(var(--spacing-unit) * 4);
      opacity: 0.9;
    }
    .cta-actions {
      display: flex;
      gap: calc(var(--spacing-unit) * 2);
      justify-content: center;
    }
    `;
  }

  private getFooterCSS(): string {
    return `
    .footer {
      padding: calc(var(--spacing-unit) * 6) 0 calc(var(--spacing-unit) * 2);
      background: var(--text);
      color: var(--background);
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: calc(var(--spacing-unit) * 4);
      margin-bottom: calc(var(--spacing-unit) * 4);
    }
    .footer h3, .footer h4 {
      font-family: var(--font-heading);
      margin-bottom: calc(var(--spacing-unit) * 2);
    }
    .footer a {
      color: var(--background);
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    .footer a:hover {
      opacity: 1;
    }
    .footer-bottom {
      text-align: center;
      padding-top: calc(var(--spacing-unit) * 2);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0.6;
    }
    `;
  }

  private renderBlockJS(_block: Block, _props: any, _project: Project): string {
    // Simple JS for interactivity
    return `
    (function() {
      'use strict';
      
      // Mobile menu toggle
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      const navigation = document.querySelector('.navigation');
      
      if (mobileToggle && navigation) {
        mobileToggle.addEventListener('click', function() {
          navigation.classList.toggle('is-open');
          mobileToggle.classList.toggle('is-active');
        });
      }
      
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    })();
    `;
  }

  private buildPageHTML(options: {
    page: Page;
    project: Project;
    template: Template;
    variant: TemplateVariant;
    blocks: RenderedBlock[];
    context: GeneratorContext;
  }): string {
    const { page, project, blocks } = options;
    const { businessInfo } = project;

    // Combine all CSS
    const allCSS = blocks.map(b => b.css).join('\n');
    
    // Combine all JS
    const allJS = blocks.filter(b => b.js).map(b => b.js).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.meta.title || businessInfo.companyName}</title>
    <meta name="description" content="${page.meta.description || businessInfo.description}">
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Critical CSS (inlined) -->
    <style>
    /* Reset and base styles */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: var(--font-size-base);
      line-height: 1.5;
      color: var(--text);
      background: var(--background);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 calc(var(--spacing-unit) * 2);
    }
    
    .btn {
      display: inline-block;
      padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
      font-weight: 500;
      text-decoration: none;
      border-radius: 4px;
      transition: all 0.3s;
      cursor: pointer;
      border: none;
    }
    
    .btn-primary {
      background: var(--primary);
      color: white;
    }
    
    .btn-primary:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
    }
    
    .btn-secondary:hover {
      background: var(--primary);
      color: white;
    }
    
    ${allCSS}
    </style>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/css/${page.id}.css" as="style">
    ${allJS ? `<link rel="preload" href="/js/${page.id}.js" as="script">` : ''}
</head>
<body>
    ${blocks.map(b => b.html).join('\n')}
    
    <!-- Non-critical CSS -->
    <link rel="stylesheet" href="/css/${page.id}.css">
    
    <!-- JavaScript -->
    ${allJS ? `<script src="/js/${page.id}.js" defer></script>` : ''}
</body>
</html>`;
  }

  async generatePageCSS(_page: Page, _project: Project, _context: GeneratorContext): Promise<string> {
    // This would contain non-critical CSS
    // For POC, we're inlining all CSS, so this returns empty
    return '';
  }

  async generatePageJS(page: Page, project: Project, context: GeneratorContext): Promise<string> {
    // Collect all JS from blocks
    const blocks = await Promise.all(
      page.blocks.map(block => this.renderBlock(block, project, context))
    );
    
    const allJS = blocks.filter(b => b.js).map(b => b.js).join('\n');
    return allJS;
  }

  private async getTemplate(templateId: string): Promise<Template> {
    // Mock template data for POC
    return {
      id: templateId,
      name: 'Modern Business',
      description: 'A modern, responsive business template',
      category: 'BUSINESS' as any,
      tags: ['modern', 'responsive', 'business'],
      variants: [
        {
          id: 'light',
          name: 'Light',
          description: 'Light color scheme',
          thumbnail: '',
          colorScheme: {
            name: 'Light',
            colors: {
              primary: '#0066cc',
              secondary: '#0052a3',
              accent: '#ff6b6b',
              background: '#ffffff',
              text: '#333333'
            }
          },
          layoutStyle: 'MODERN' as any
        }
      ],
      blocks: ['hero', 'header', 'features', 'cta', 'footer'],
      defaultBlocks: [],
      features: ['responsive', 'seo-optimized', 'fast-loading'],
      industries: ['business', 'corporate', 'professional'],
      thumbnail: '',
      screenshots: [],
      performance: {
        lighthouseScore: 95,
        pageSpeed: 98,
        firstContentfulPaint: 1.2,
        largestContentfulPaint: 2.5,
        totalBlockingTime: 50,
        cumulativeLayoutShift: 0.05
      }
    };
  }

  private async getBlock(blockId: string): Promise<Block> {
    // Mock block data for POC
    const blocks: Record<string, Partial<Block>> = {
      hero: {
        id: 'hero',
        name: 'Hero Section',
        category: 'HERO' as any,
        defaultProps: {
          title: 'Welcome to Our Business',
          subtitle: 'We provide excellent services',
          ctaText: 'Get Started',
          ctaLink: '#contact'
        }
      },
      header: {
        id: 'header',
        name: 'Header',
        category: 'HEADER' as any,
        defaultProps: {
          navItems: ['Home', 'About', 'Services', 'Contact']
        }
      },
      features: {
        id: 'features',
        name: 'Features',
        category: 'FEATURES' as any,
        defaultProps: {
          title: 'Our Services'
        }
      },
      cta: {
        id: 'cta',
        name: 'Call to Action',
        category: 'CTA' as any,
        defaultProps: {
          title: 'Ready to Get Started?',
          subtitle: 'Contact us today',
          primaryText: 'Get Started',
          primaryLink: '#contact'
        }
      },
      footer: {
        id: 'footer',
        name: 'Footer',
        category: 'FOOTER' as any,
        defaultProps: {}
      }
    };

    const block = blocks[blockId];
    if (!block) {
      throw new Error(`Block ${blockId} not found`);
    }

    return {
      ...block,
      description: '',
      tags: [],
      props: [],
      variants: [],
      thumbnail: '',
      performanceImpact: 'LOW' as any
    } as Block;
  }
}
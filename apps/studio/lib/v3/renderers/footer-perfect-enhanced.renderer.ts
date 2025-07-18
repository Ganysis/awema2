/**
 * Footer V3 Perfect Enhanced Renderer
 * Pied de page ultra-moderne avec widgets dynamiques et 8 variantes visuelles
 */

import { BaseRendererV3 } from './base.renderer';
import { FooterData, footerDataSchema, footerDefaults } from '../schemas/blocks/footer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { RenderResult, RenderContext } from '../types';
import { z } from 'zod';

export class FooterRendererV3PerfectEnhanced extends BaseRendererV3<FooterData> {
  type = 'footer-v3-perfect';
  version = '3.0.0';
  
  constructor() {
    super();
  }

  getBlockName(): string {
    return 'Footer V3 Perfect Enhanced';
  }

  getBlockCategory(): string {
    return 'layout';
  }

  getBlockDescription(): string {
    return 'Pied de page ultra-moderne avec widgets dynamiques, newsletter, réseaux sociaux et 8 variantes visuelles';
  }

  getBlockTags(): string[] {
    return ['footer', 'v3', 'widgets', 'newsletter', 'social', 'responsive'];
  }

  getDefaultData(): FooterData {
    return footerDefaults;
  }

  getBlockProps(): BlockProp[] {
    return [
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Variante visuelle',
        options: [
          { value: 'waves', label: '🌊 Waves - Vagues animées' },
          { value: 'gradient', label: '🎨 Gradient - Dégradés modernes' },
          { value: 'split', label: '➗ Split - Design asymétrique' },
          { value: 'centered', label: '🎯 Centered - Tout centré' },
          { value: 'dark', label: '🌑 Dark - Fond sombre' },
          { value: 'floating', label: '☁️ Floating - Effets flottants' },
          { value: 'geometric', label: '📐 Geometric - Formes géométriques' },
          { value: 'organic', label: '🌿 Organic - Formes organiques' }
        ],
        defaultValue: 'waves',
        required: true,
        description: 'Choisissez le style visuel du footer',
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Apparence',
          order: 1
        }
      },
      {
        name: 'companyName',
        type: PropType.STRING,
        label: 'Nom de l\'entreprise',
        defaultValue: 'Mon Entreprise',
        required: true,
        description: 'Le nom de votre entreprise',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Entreprise',
          order: 1
        }
      },
      {
        name: 'newsletterEnabled',
        type: PropType.BOOLEAN,
        label: 'Activer la newsletter',
        defaultValue: true,
        description: 'Afficher le formulaire d\'inscription à la newsletter',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Newsletter',
          order: 1
        }
      },
      {
        name: 'socialEnabled',
        type: PropType.BOOLEAN,
        label: 'Activer les réseaux sociaux',
        defaultValue: true,
        description: 'Afficher les liens vers les réseaux sociaux',
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Réseaux sociaux',
          order: 1
        }
      }
    ];
  }

  render(data: FooterData, context?: RenderContext): RenderResult {
    const id = 'footer-' + Math.random().toString(36).substr(2, 9);
    const { html, css, js } = this.renderFooter(data, id, context);
    
    return {
      html,
      css: this.generateCSS(data, id, context) + css,
      js: this.generateJS(data, id) + js
    };
  }
  
  validate(data: unknown): z.SafeParseReturnType<FooterData, FooterData> {
    return { success: true, data: data as FooterData } as any;
  }
  
  renderPreview(data: FooterData): string {
    return this.render(data, { isExport: false }).html;
  }
  
  getRequiredAssets(): any[] {
    return [];
  }
  
  getDefaultCSS(): string {
    return '';
  }

  private renderFooter(data: FooterData, id: string, context?: any): { html: string; css: string; js: string } {
    const theme = context?.theme;
    
    // Récupération des couleurs du thème
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const textColor = theme?.colors?.text || '#1a202c';
    const backgroundColor = theme?.colors?.background || '#ffffff';
    const surfaceColor = theme?.colors?.surface || '#f7fafc';
    const borderColor = theme?.colors?.border || '#e2e8f0';
    
    // Déterminer les couleurs du footer selon le thème
    const footerBg = data.styles?.backgroundColor || primaryColor;
    const footerText = this.getContrastColor(footerBg);
    const footerTextSecondary = footerText === '#ffffff' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)';
    
    const footerId = `footer-${id}`;
    
    const html = `
      <footer 
        id="${footerId}" 
        class="footer-v3 footer-v3--${data.visualVariant}"
        style="
          --footer-bg: ${footerBg};
          --footer-text: ${footerText};
          --footer-text-secondary: ${footerTextSecondary};
          --footer-primary: ${primaryColor};
          --footer-secondary: ${secondaryColor};
          --footer-border: ${footerText === '#ffffff' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
        "
      >
        ${this.renderVisualBackground(data.visualVariant)}
        
        ${data.newsletter?.enabled ? this.renderNewsletter(data) : ''}
        
        <div class="footer-v3__main">
          <div class="footer-v3__container footer-v3__container--${data.layout.containerWidth}">
            <div class="footer-v3__grid footer-v3__grid--${data.layout.columnsDesktop}">
              ${this.renderWidgets(data)}
            </div>
          </div>
        </div>
        
        ${this.renderCopyright(data)}
        ${data.backToTop?.enabled ? this.renderBackToTop(data) : ''}
        ${data.cookieNotice?.enabled ? this.renderCookieNotice(data) : ''}
      </footer>
    `;

    const css = '';
    const js = '';

    return { html, css, js };
  }

  private renderVisualBackground(variant: string): string {
    switch (variant) {
      case 'waves':
        return `
          <div class="footer-v3__waves">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" fill-opacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="currentColor" fill-opacity="0.5" d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,234.7C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="currentColor" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,234.7C672,245,768,235,864,218.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        `;
      
      case 'gradient':
        return '<div class="footer-v3__gradient"></div>';
      
      case 'geometric':
        return `
          <div class="footer-v3__geometric">
            <div class="footer-v3__shape footer-v3__shape--1"></div>
            <div class="footer-v3__shape footer-v3__shape--2"></div>
            <div class="footer-v3__shape footer-v3__shape--3"></div>
          </div>
        `;
      
      case 'organic':
        return `
          <div class="footer-v3__organic">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" fill-opacity="0.2" d="M0,224L120,208C240,192,480,160,720,165.3C960,171,1200,213,1320,234.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
          </div>
        `;
      
      default:
        return '';
    }
  }

  private renderNewsletter(data: FooterData): string {
    if (!data.newsletter?.enabled) return '';
    
    const { title, description, placeholder, buttonText, style } = data.newsletter;
    
    return `
      <div class="footer-v3__newsletter footer-v3__newsletter--${style}">
        <div class="footer-v3__container footer-v3__container--${data.layout.containerWidth}">
          <div class="footer-v3__newsletter-content">
            ${title ? `<h3 class="footer-v3__newsletter-title">${this.escapeHtml(title)}</h3>` : ''}
            ${description ? `<p class="footer-v3__newsletter-description">${this.escapeHtml(description)}</p>` : ''}
            
            <form class="footer-v3__newsletter-form" data-newsletter-form>
              <div class="footer-v3__newsletter-input-group">
                <input 
                  type="email" 
                  class="footer-v3__newsletter-input" 
                  placeholder="${this.escapeHtml(placeholder || 'Votre email')}"
                  required
                  aria-label="Email pour newsletter"
                >
                <button type="submit" class="footer-v3__newsletter-button">
                  ${this.escapeHtml(buttonText || 'S\'inscrire')}
                  <svg class="footer-v3__newsletter-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
              <div class="footer-v3__newsletter-message" data-newsletter-message></div>
            </form>
            
            ${data.newsletter.gdprText ? `
              <p class="footer-v3__newsletter-gdpr">${this.escapeHtml(data.newsletter.gdprText)}</p>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderWidgets(data: FooterData): string {
    const sortedWidgets = [...data.widgets]
      .filter(w => w.enabled)
      .sort((a, b) => a.position - b.position);
    
    return sortedWidgets.map(widget => this.renderWidget(widget, data)).join('');
  }

  private renderWidget(widget: any, data: FooterData): string {
    switch (widget.type) {
      case 'companyInfo':
        return this.renderCompanyInfo(data);
      case 'quickLinks':
        return this.renderQuickLinks(data);
      case 'servicesGrid':
        return this.renderServicesGrid(data);
      case 'contactInfo':
        return this.renderContactInfo(data);
      case 'businessHours':
        return this.renderBusinessHours(data);
      case 'social':
        return this.renderSocialLinks(data);
      case 'certifications':
        return this.renderCertifications(data);
      case 'paymentMethods':
        return this.renderPaymentMethods(data);
      default:
        return '';
    }
  }

  private renderCompanyInfo(data: FooterData): string {
    const { name, logo, description } = data.company;
    
    return `
      <div class="footer-v3__widget footer-v3__widget--company">
        ${logo ? `
          <img src="${this.escapeHtml(logo)}" alt="${this.escapeHtml(name)}" class="footer-v3__logo">
        ` : `
          <h3 class="footer-v3__company-name">${this.escapeHtml(name)}</h3>
        `}
        
        ${description ? `
          <p class="footer-v3__company-description">${this.escapeHtml(description)}</p>
        ` : ''}
        
        ${data.social?.enabled && data.social.position !== 'separate' ? 
          this.renderSocialIcons(data.social) : ''
        }
      </div>
    `;
  }

  private renderQuickLinks(data: FooterData): string {
    return data.quickLinks.columns.map(column => `
      <div class="footer-v3__widget footer-v3__widget--links">
        <h4 class="footer-v3__widget-title">
          ${column.icon ? `<span class="footer-v3__widget-icon">${column.icon}</span>` : ''}
          ${this.escapeHtml(column.title)}
        </h4>
        <ul class="footer-v3__links">
          ${column.links.map(link => `
            <li class="footer-v3__link-item">
              <a 
                href="${this.escapeHtml(link.url)}" 
                class="footer-v3__link"
                ${link.target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : ''}
              >
                ${link.icon ? `<span class="footer-v3__link-icon">${link.icon}</span>` : ''}
                ${this.escapeHtml(link.label)}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  private renderServicesGrid(data: FooterData): string {
    // Pour l'instant, on utilise les liens de la première colonne des quickLinks
    const servicesLinks = data.quickLinks.columns.find(col => 
      col.title.toLowerCase().includes('service')
    )?.links || [];
    
    return `
      <div class="footer-v3__widget footer-v3__widget--services">
        <h4 class="footer-v3__widget-title">Nos Services</h4>
        <div class="footer-v3__services-grid">
          ${servicesLinks.map(service => `
            <a href="${this.escapeHtml(service.url)}" class="footer-v3__service-item">
              <span class="footer-v3__service-icon">🛠️</span>
              <span class="footer-v3__service-name">${this.escapeHtml(service.label)}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderContactInfo(data: FooterData): string {
    const { phone, email, address } = data.company;
    
    if (!phone && !email && !address) return '';
    
    return `
      <div class="footer-v3__widget footer-v3__widget--contact">
        <h4 class="footer-v3__widget-title">Contact</h4>
        <div class="footer-v3__contact-list">
          ${phone ? `
            <div class="footer-v3__contact-item">
              <svg class="footer-v3__contact-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <a href="tel:${this.escapeHtml(phone.replace(/\s/g, ''))}" class="footer-v3__contact-link">
                ${this.escapeHtml(phone)}
              </a>
            </div>
          ` : ''}
          
          ${email ? `
            <div class="footer-v3__contact-item">
              <svg class="footer-v3__contact-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:${this.escapeHtml(email)}" class="footer-v3__contact-link">
                ${this.escapeHtml(email)}
              </a>
            </div>
          ` : ''}
          
          ${address ? `
            <div class="footer-v3__contact-item">
              <svg class="footer-v3__contact-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <address class="footer-v3__contact-address">
                ${this.escapeHtml(address).replace(/\n/g, '<br>')}
              </address>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderBusinessHours(data: FooterData): string {
    if (!data.businessHours?.enabled) return '';
    
    const { title, style, hours } = data.businessHours;
    
    return `
      <div class="footer-v3__widget footer-v3__widget--hours">
        <h4 class="footer-v3__widget-title">${this.escapeHtml(title || 'Horaires')}</h4>
        <div class="footer-v3__hours footer-v3__hours--${style}">
          ${hours.map(schedule => `
            <div class="footer-v3__hours-item ${schedule.closed ? 'footer-v3__hours-item--closed' : ''}">
              <span class="footer-v3__hours-day">${this.escapeHtml(schedule.day)}</span>
              <span class="footer-v3__hours-time">${this.escapeHtml(schedule.hours)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderSocialLinks(data: FooterData): string {
    if (!data.social?.enabled || data.social.position === 'separate') return '';
    
    return `
      <div class="footer-v3__widget footer-v3__widget--social">
        ${data.social.title ? `
          <h4 class="footer-v3__widget-title">${this.escapeHtml(data.social.title)}</h4>
        ` : ''}
        ${this.renderSocialIcons(data.social)}
      </div>
    `;
  }

  private renderSocialIcons(social: FooterData['social']): string {
    return `
      <div class="footer-v3__social footer-v3__social--${social.style} footer-v3__social--${social.size}">
        ${social.links.map(link => `
          <a 
            href="${this.escapeHtml(link.url)}" 
            class="footer-v3__social-link footer-v3__social-link--${link.platform}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${this.escapeHtml(link.label || link.platform)}"
            ${link.color ? `style="--social-color: ${link.color}"` : ''}
          >
            ${this.renderSocialIcon(link.platform)}
          </a>
        `).join('')}
      </div>
    `;
  }

  private renderSocialIcon(platform: string): string {
    const icons: Record<string, string> = {
      facebook: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      twitter: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      youtube: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      pinterest: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>',
      tiktok: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>'
    };

    return icons[platform] || '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>';
  }

  private renderCertifications(data: FooterData): string {
    if (!data.certifications?.enabled || !data.certifications.items.length) return '';
    
    const { title, style, items } = data.certifications;
    
    return `
      <div class="footer-v3__widget footer-v3__widget--certifications">
        ${title ? `<h4 class="footer-v3__widget-title">${this.escapeHtml(title)}</h4>` : ''}
        <div class="footer-v3__certifications footer-v3__certifications--${style}">
          ${items.map(cert => `
            ${cert.url ? `<a href="${this.escapeHtml(cert.url)}" target="_blank" rel="noopener noreferrer" class="footer-v3__certification">` : '<div class="footer-v3__certification">'}
              <img src="${this.escapeHtml(cert.logo)}" alt="${this.escapeHtml(cert.name)}" class="footer-v3__certification-logo">
              ${cert.description && style === 'cards' ? `
                <div class="footer-v3__certification-info">
                  <h5 class="footer-v3__certification-name">${this.escapeHtml(cert.name)}</h5>
                  <p class="footer-v3__certification-description">${this.escapeHtml(cert.description)}</p>
                </div>
              ` : ''}
            ${cert.url ? '</a>' : '</div>'}
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderPaymentMethods(data: FooterData): string {
    if (!data.paymentMethods?.enabled) return '';
    
    const { title, style, methods } = data.paymentMethods;
    const enabledMethods = methods.filter(m => m.enabled);
    
    if (!enabledMethods.length) return '';
    
    return `
      <div class="footer-v3__widget footer-v3__widget--payment">
        ${title ? `<h4 class="footer-v3__widget-title">${this.escapeHtml(title)}</h4>` : ''}
        <div class="footer-v3__payment footer-v3__payment--${style}">
          ${enabledMethods.map(method => `
            <div class="footer-v3__payment-method">
              ${this.renderPaymentIcon(method.icon)}
              ${style !== 'icons' ? `<span class="footer-v3__payment-name">${this.escapeHtml(method.name)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderPaymentIcon(icon: string): string {
    const icons: Record<string, string> = {
      visa: '<svg viewBox="0 0 48 32" width="48" height="32"><rect width="48" height="32" rx="4" fill="#1A1F71"/><path fill="white" d="M19.24 20.58l1.33-7.75h2.13l-1.33 7.75h-2.13zm9.78-7.56c-.42-.16-.92-.24-1.5-.24-1.66 0-2.83.88-2.84 2.14-.01 1.12 1.66 1.74 2.04 2.35.39.63.26 1.02-.12 1.23-.39.21-.94.26-1.44.1-.52-.16-.8-.26-1.23-.42l-.17-.08-.18 1.1c.31.14.88.26 1.47.27 1.57 0 2.89-.77 2.9-2.18.01-1.45-2.32-1.53-2.3-2.18 0-.2.22-.41.7-.46.24-.03.9-.05 1.65.29l.2-1.12h-.18zm4.25-.19c-.36 0-.63.08-.79.38l-2.85 6.78h1.57l.4-1.1h1.92l.23 1.1h1.38l-1.2-7.16h-1.14l.48.01zm-1.04 4.93l.79-2.17.45 2.17h-1.24zm-11.19-4.93l-2.34 7.16h1.5l2.34-7.16h-1.5z"/></svg>',
      mastercard: '<svg viewBox="0 0 48 32" width="48" height="32"><rect width="48" height="32" rx="4" fill="#EB001B"/><circle cx="19" cy="16" r="8" fill="#FF5F00"/><circle cx="29" cy="16" r="8" fill="#F79E1B"/><path fill="#EB001B" d="M24 11.08a7.92 7.92 0 0 0-5 1.76 8 8 0 0 0 0 6.32 7.92 7.92 0 0 0 5 1.76 7.92 7.92 0 0 0 5-1.76 8 8 0 0 0 0-6.32 7.92 7.92 0 0 0-5-1.76z"/></svg>',
      paypal: '<svg viewBox="0 0 48 32" width="48" height="32"><rect width="48" height="32" rx="4" fill="#003087"/><path fill="white" d="M29.76 9.12c.3 1.9-.52 4.52-2.31 6.04-1.58 1.34-3.8 1.9-6.26 1.9h-.42c-.3 0-.56.22-.61.51l-.02.08-.61 3.88-.02.06a.53.53 0 0 1-.52.44h-2.2c-.18 0-.33-.14-.33-.32a.34.34 0 0 1 .02-.12L19.55 6.4a.8.8 0 0 1 .78-.64h3.63c1.58 0 3.01.28 4.02.95 1.14.76 1.68 1.95 1.78 3.41zm-11.21 5.8l.88-5.58h1.76c.64 0 1.11.08 1.37.37.28.31.36.8.23 1.45-.27 1.36-1.18 2.06-2.69 2.06h-.96c-.3 0-.55.22-.59.51v1.19z"/></svg>',
      amex: '<svg viewBox="0 0 48 32" width="48" height="32"><rect width="48" height="32" rx="4" fill="#2E77BB"/><path fill="white" d="M13.83 16.73l-.65-1.58-.65 1.58h1.3zm11.45-3.51v.65h1.61v.87h-1.61v.68h1.8v.86h-2.78v-4.06h2.78v.87h-1.8v.13zm-6.09 0l-.97 2.32-.96-2.32h-1.48v3.62l-1.48-3.62h-1.34l-1.75 4.06h1.02l.33-.8h1.8l.33.8h1.77v-3.06l1.26 3.06h.72l1.25-3.06v3.06h.98v-4.06h-1.48zm9.48 0h-1.43l-1.13 1.51-1.12-1.51h-1.43v4.06h.97v-2.72l1.3 1.72h.03l1.29-1.71v2.71h.98v-4.06h-.46zm2.45 3.19v-3.19h.98v3.16c0 .62.31.93.93.93s.93-.31.93-.93v-3.16h.98v3.19c0 1.17-.66 1.74-1.91 1.74s-1.91-.57-1.91-1.74z"/></svg>',
      bank: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zm4-6l-10-5-10 5v2h20V6z"/></svg>',
      cash: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.93.66 1.64 2.08 1.64 1.56 0 2.1-.68 2.1-1.62 0-1.84-4.77-1.49-4.77-4.73 0-1.77 1.21-2.84 2.93-3.20V5h2.67v1.77c1.37.37 2.53 1.35 2.68 2.94h-1.96c-.12-.8-.66-1.35-1.59-1.35-1.11 0-1.74.61-1.74 1.42 0 1.67 4.77 1.23 4.77 4.73.01 1.88-1.12 3.03-3.19 3.58z"/></svg>',
      check: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48L7.5 12 11 2h2l2.9 7.95L19 2h2l-5 13h-2l-2.9-7.95L8 17H6l-2.85-7.05z"/></svg>'
    };

    return icons[icon] || icons.cash;
  }

  private renderCopyright(data: FooterData): string {
    if (!data.copyright?.enabled) return '';
    
    const { text, position, showCredits, creditsText, creditsUrl } = data.copyright;
    const year = new Date().getFullYear();
    const copyrightText = text
      .replace('{year}', year.toString())
      .replace('{company}', data.company.name);
    
    return `
      <div class="footer-v3__bottom">
        <div class="footer-v3__container footer-v3__container--${data.layout.containerWidth}">
          <div class="footer-v3__bottom-content footer-v3__bottom-content--${position}">
            <div class="footer-v3__copyright">
              <p class="footer-v3__copyright-text">${this.escapeHtml(copyrightText)}</p>
              ${data.legal?.enabled && data.legal.position === 'copyright' ? `
                <div class="footer-v3__legal-links">
                  ${data.legal.links.map(link => `
                    <a href="${this.escapeHtml(link.url)}" class="footer-v3__legal-link">
                      ${this.escapeHtml(link.label)}
                    </a>
                  `).join('<span class="footer-v3__legal-separator">|</span>')}
                </div>
              ` : ''}
            </div>
            ${showCredits ? `
              <div class="footer-v3__credits">
                <a href="${this.escapeHtml(creditsUrl)}" target="_blank" rel="noopener noreferrer" class="footer-v3__credits-link">
                  ${this.escapeHtml(creditsText)}
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderBackToTop(data: FooterData): string {
    if (!data.backToTop?.enabled) return '';
    
    const { style, position, icon } = data.backToTop;
    
    return `
      <button 
        class="footer-v3__back-to-top footer-v3__back-to-top--${style} footer-v3__back-to-top--${position}" 
        aria-label="Retour en haut"
        data-back-to-top
      >
        ${style === 'text' ? 'Haut' : `
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        `}
      </button>
    `;
  }

  private renderCookieNotice(data: FooterData): string {
    if (!data.cookieNotice?.enabled) return '';
    
    const { text, acceptText, rejectText, learnMoreText, learnMoreUrl, position, style } = data.cookieNotice;
    
    return `
      <div class="footer-v3__cookie-notice footer-v3__cookie-notice--${style} footer-v3__cookie-notice--${position}" data-cookie-notice>
        <div class="footer-v3__cookie-content">
          <p class="footer-v3__cookie-text">
            ${this.escapeHtml(text)}
            ${learnMoreUrl ? `
              <a href="${this.escapeHtml(learnMoreUrl)}" class="footer-v3__cookie-link">
                ${this.escapeHtml(learnMoreText)}
              </a>
            ` : ''}
          </p>
          <div class="footer-v3__cookie-actions">
            <button class="footer-v3__cookie-btn footer-v3__cookie-btn--accept" data-cookie-accept>
              ${this.escapeHtml(acceptText)}
            </button>
            <button class="footer-v3__cookie-btn footer-v3__cookie-btn--reject" data-cookie-reject>
              ${this.escapeHtml(rejectText)}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private generateCSS(data: FooterData, id: string, context?: any): string {
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    
    return `
/* Footer V3 Perfect Enhanced - CSS */
.footer-v3 {
  position: relative;
  background: var(--footer-bg);
  color: var(--footer-text);
  overflow: hidden;
}

/* Container widths */
.footer-v3__container {
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-v3__container--full { max-width: 100%; }
.footer-v3__container--wide { max-width: 1400px; }
.footer-v3__container--normal { max-width: 1200px; }
.footer-v3__container--narrow { max-width: 1000px; }

/* Main content area */
.footer-v3__main {
  padding: 4rem 0 3rem;
  position: relative;
  z-index: 10;
}

/* Grid layout */
.footer-v3__grid {
  display: grid;
  gap: 3rem;
}

.footer-v3__grid--1 { grid-template-columns: 1fr; }
.footer-v3__grid--2 { grid-template-columns: repeat(2, 1fr); }
.footer-v3__grid--3 { grid-template-columns: repeat(3, 1fr); }
.footer-v3__grid--4 { grid-template-columns: repeat(4, 1fr); }
.footer-v3__grid--5 { grid-template-columns: repeat(5, 1fr); }
.footer-v3__grid--6 { grid-template-columns: repeat(6, 1fr); }

/* Visual backgrounds */
.footer-v3__waves {
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  height: 100px;
  color: var(--footer-bg);
  opacity: 0.2;
}

.footer-v3__waves svg {
  width: 100%;
  height: 100%;
}

.footer-v3--gradient .footer-v3__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    var(--footer-primary) 0%, 
    var(--footer-secondary) 100%);
  opacity: 0.1;
}

.footer-v3--geometric .footer-v3__geometric {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.footer-v3__shape {
  position: absolute;
  opacity: 0.05;
}

.footer-v3__shape--1 {
  width: 300px;
  height: 300px;
  background: var(--footer-primary);
  border-radius: 50%;
  top: -150px;
  right: -150px;
}

.footer-v3__shape--2 {
  width: 200px;
  height: 200px;
  background: var(--footer-secondary);
  transform: rotate(45deg);
  bottom: 50px;
  left: 10%;
}

.footer-v3__shape--3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, var(--footer-primary), var(--footer-secondary));
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  top: 40%;
  right: 20%;
}

/* Widgets */
.footer-v3__widget {
  min-width: 0;
}

.footer-v3__widget-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  color: var(--footer-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-v3__widget-icon {
  font-size: 1.25rem;
}

/* Company info */
.footer-v3__logo {
  height: 48px;
  width: auto;
  margin-bottom: 1rem;
}

.footer-v3__company-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.footer-v3__company-description {
  margin: 0 0 1.5rem;
  color: var(--footer-text-secondary);
  line-height: 1.6;
}

/* Links */
.footer-v3__links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-v3__link-item {
  margin-bottom: 0.75rem;
}

.footer-v3__link {
  color: var(--footer-text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.footer-v3__link:hover {
  color: var(--footer-text);
  transform: translateX(4px);
}

.footer-v3__link-icon {
  font-size: 1rem;
}

/* Services grid */
.footer-v3__services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.footer-v3__service-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  color: var(--footer-text-secondary);
  transition: all 0.3s ease;
}

.footer-v3__service-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--footer-text);
  transform: translateY(-2px);
}

/* Contact info */
.footer-v3__contact-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-v3__contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.footer-v3__contact-icon {
  flex-shrink: 0;
  color: var(--footer-primary);
}

.footer-v3__contact-link {
  color: var(--footer-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-v3__contact-link:hover {
  color: var(--footer-text);
}

.footer-v3__contact-address {
  font-style: normal;
  color: var(--footer-text-secondary);
  line-height: 1.5;
}

/* Business hours */
.footer-v3__hours {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-v3__hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--footer-border);
}

.footer-v3__hours-item:last-child {
  border-bottom: none;
}

.footer-v3__hours-item--closed {
  opacity: 0.6;
}

.footer-v3__hours-day {
  font-weight: 500;
}

.footer-v3__hours-time {
  color: var(--footer-text-secondary);
}

.footer-v3__hours--table {
  display: table;
  width: 100%;
}

.footer-v3__hours--table .footer-v3__hours-item {
  display: table-row;
}

.footer-v3__hours--table .footer-v3__hours-day,
.footer-v3__hours--table .footer-v3__hours-time {
  display: table-cell;
  padding: 0.5rem;
}

/* Newsletter */
.footer-v3__newsletter {
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem 0;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
}

.footer-v3__newsletter--card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin: 0 1rem 3rem;
}

.footer-v3__newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.footer-v3__newsletter-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
}

.footer-v3__newsletter-description {
  margin: 0 0 2rem;
  color: var(--footer-text-secondary);
}

.footer-v3__newsletter-form {
  margin-bottom: 1rem;
}

.footer-v3__newsletter-input-group {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.footer-v3__newsletter--stacked .footer-v3__newsletter-input-group {
  flex-direction: column;
}

.footer-v3__newsletter-input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--footer-border);
  border-radius: 50px;
  color: var(--footer-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.footer-v3__newsletter-input::placeholder {
  color: var(--footer-text-secondary);
}

.footer-v3__newsletter-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--footer-primary);
}

.footer-v3__newsletter-button {
  padding: 0.875rem 2rem;
  background: var(--footer-primary);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.footer-v3__newsletter-button:hover {
  background: var(--footer-secondary);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.footer-v3__newsletter-icon {
  transition: transform 0.3s ease;
}

.footer-v3__newsletter-button:hover .footer-v3__newsletter-icon {
  transform: translateX(4px);
}

.footer-v3__newsletter-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  display: none;
}

.footer-v3__newsletter-message.success {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  display: block;
}

.footer-v3__newsletter-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  display: block;
}

.footer-v3__newsletter-gdpr {
  font-size: 0.75rem;
  color: var(--footer-text-secondary);
  margin: 0;
}

/* Social links */
.footer-v3__social {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer-v3__social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--footer-text);
  transition: all 0.3s ease;
  text-decoration: none;
}

.footer-v3__social-link:hover {
  background: var(--social-color, var(--footer-primary));
  color: white;
  transform: translateY(-4px);
}

.footer-v3__social-link svg {
  width: 20px;
  height: 20px;
}

.footer-v3__social--buttons .footer-v3__social-link {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: auto;
}

.footer-v3__social--cards .footer-v3__social-link {
  width: auto;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  background: var(--social-color, var(--footer-primary));
  color: white;
}

.footer-v3__social--gradient .footer-v3__social-link {
  background: linear-gradient(135deg, var(--social-color, var(--footer-primary)), var(--footer-secondary));
  color: white;
}

.footer-v3__social--small .footer-v3__social-link {
  width: 32px;
  height: 32px;
}

.footer-v3__social--small svg {
  width: 16px;
  height: 16px;
}

.footer-v3__social--large .footer-v3__social-link {
  width: 48px;
  height: 48px;
}

.footer-v3__social--large svg {
  width: 24px;
  height: 24px;
}

/* Certifications */
.footer-v3__certifications {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.footer-v3__certification {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.footer-v3__certification:hover {
  transform: translateY(-2px);
}

.footer-v3__certification-logo {
  height: 40px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.footer-v3__certification:hover .footer-v3__certification-logo {
  filter: grayscale(0%);
  opacity: 1;
}

.footer-v3__certifications--cards .footer-v3__certification {
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.footer-v3__certification-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem;
}

.footer-v3__certification-description {
  font-size: 0.75rem;
  color: var(--footer-text-secondary);
  margin: 0;
}

/* Payment methods */
.footer-v3__payment {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer-v3__payment-method {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-v3__payment-method svg {
  height: 32px;
  width: auto;
  border-radius: 4px;
}

.footer-v3__payment--cards .footer-v3__payment-method {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.footer-v3__payment-name {
  font-size: 0.875rem;
  color: var(--footer-text-secondary);
}

/* Bottom bar */
.footer-v3__bottom {
  background: rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
  position: relative;
  z-index: 10;
}

.footer-v3__bottom-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.footer-v3__bottom-content--left { justify-content: flex-start; }
.footer-v3__bottom-content--center { justify-content: center; }
.footer-v3__bottom-content--right { justify-content: flex-end; }

.footer-v3__copyright {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.footer-v3__copyright-text {
  margin: 0;
  color: var(--footer-text-secondary);
}

.footer-v3__legal-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.footer-v3__legal-link {
  color: var(--footer-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-v3__legal-link:hover {
  color: var(--footer-text);
}

.footer-v3__legal-separator {
  color: var(--footer-text-secondary);
  opacity: 0.5;
}

.footer-v3__credits {
  margin-left: auto;
}

.footer-v3__credits-link {
  color: var(--footer-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-v3__credits-link:hover {
  color: var(--footer-text);
}

/* Back to top */
.footer-v3__back-to-top {
  position: fixed;
  bottom: 2rem;
  width: 48px;
  height: 48px;
  background: var(--footer-primary);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 100;
}

.footer-v3__back-to-top--right { right: 2rem; }
.footer-v3__back-to-top--left { left: 2rem; }
.footer-v3__back-to-top--center { left: 50%; transform: translateX(-50%); }

.footer-v3__back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.footer-v3__back-to-top:hover {
  background: var(--footer-secondary);
  transform: translateY(-4px);
}

.footer-v3__back-to-top--square {
  border-radius: 8px;
}

.footer-v3__back-to-top--text {
  width: auto;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
}

.footer-v3__back-to-top--floating {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.footer-v3__back-to-top svg {
  width: 24px;
  height: 24px;
}

/* Cookie notice */
.footer-v3__cookie-notice {
  position: fixed;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1.5rem;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.footer-v3__cookie-notice--bottom { bottom: 0; }
.footer-v3__cookie-notice--top { top: 0; transform: translateY(-100%); }

.footer-v3__cookie-notice.visible {
  transform: translateY(0);
}

.footer-v3__cookie-notice--popup {
  left: 2rem;
  right: auto;
  bottom: 2rem;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.footer-v3__cookie-notice--corner {
  left: auto;
  right: 2rem;
  bottom: 2rem;
  max-width: 350px;
  border-radius: 8px;
}

.footer-v3__cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

.footer-v3__cookie-text {
  margin: 0;
  flex: 1;
}

.footer-v3__cookie-link {
  color: var(--footer-primary);
  text-decoration: underline;
}

.footer-v3__cookie-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.footer-v3__cookie-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.footer-v3__cookie-btn--accept {
  background: var(--footer-primary);
  color: white;
}

.footer-v3__cookie-btn--accept:hover {
  background: var(--footer-secondary);
}

.footer-v3__cookie-btn--reject {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.footer-v3__cookie-btn--reject:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Variant-specific styles */
.footer-v3--dark {
  background: #111;
}

.footer-v3--split .footer-v3__main {
  background: linear-gradient(90deg, var(--footer-bg) 50%, rgba(255, 255, 255, 0.05) 50%);
}

.footer-v3--centered {
  text-align: center;
}

.footer-v3--centered .footer-v3__widget-title {
  justify-content: center;
}

.footer-v3--centered .footer-v3__social {
  justify-content: center;
}

.footer-v3--floating .footer-v3__widget {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--footer-border);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-v3__grid--4,
  .footer-v3__grid--5,
  .footer-v3__grid--6 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-v3__newsletter-content {
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {
  .footer-v3__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-v3__main {
    padding: 3rem 0 2rem;
  }
  
  .footer-v3__newsletter-input-group {
    flex-direction: column;
  }
  
  .footer-v3__services-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-v3__bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-v3__credits {
    margin-left: 0;
  }
  
  .footer-v3__cookie-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-v3__cookie-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .footer-v3__cookie-btn {
    width: 100%;
  }
}

/* Animations */
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

.footer-v3__widget {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.footer-v3__widget:nth-child(1) { animation-delay: 0.1s; }
.footer-v3__widget:nth-child(2) { animation-delay: 0.2s; }
.footer-v3__widget:nth-child(3) { animation-delay: 0.3s; }
.footer-v3__widget:nth-child(4) { animation-delay: 0.4s; }

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .footer-v3 {
    --footer-border: rgba(255, 255, 255, 0.1);
  }
}

/* Print styles */
@media print {
  .footer-v3__newsletter,
  .footer-v3__back-to-top,
  .footer-v3__cookie-notice {
    display: none;
  }
}
    `;
  }

  private generateJS(data: FooterData, id: string): string {
    return `
// Footer V3 Perfect Enhanced - JavaScript
(function() {
  const footer = document.getElementById('footer-${id}');
  if (!footer) return;

  // Newsletter form handling
  const newsletterForm = footer.querySelector('[data-newsletter-form]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      const messageEl = this.querySelector('[data-newsletter-message]');
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      // Show loading state
      button.disabled = true;
      button.textContent = 'Envoi...';
      
      try {
        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        messageEl.className = 'footer-v3__newsletter-message success';
        messageEl.textContent = '${data.newsletter.successMessage}';
        
        // Reset form
        this.reset();
      } catch (error) {
        // Show error message
        messageEl.className = 'footer-v3__newsletter-message error';
        messageEl.textContent = 'Une erreur est survenue. Veuillez réessayer.';
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  }

  // Back to top button
  const backToTop = footer.querySelector('[data-back-to-top]');
  if (backToTop) {
    // Show/hide based on scroll position
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > ${data.backToTop.showAfter}) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
      
      lastScroll = currentScroll;
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Cookie notice
  const cookieNotice = footer.querySelector('[data-cookie-notice]');
  if (cookieNotice) {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (!cookieChoice) {
      setTimeout(() => {
        cookieNotice.classList.add('visible');
      }, 1000);
    }
    
    // Handle accept
    const acceptBtn = cookieNotice.querySelector('[data-cookie-accept]');
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookieChoice', 'accepted');
      cookieNotice.classList.remove('visible');
      
      // Enable analytics/cookies here
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted'
        });
      }
    });
    
    // Handle reject
    const rejectBtn = cookieNotice.querySelector('[data-cookie-reject]');
    rejectBtn.addEventListener('click', function() {
      localStorage.setItem('cookieChoice', 'rejected');
      cookieNotice.classList.remove('visible');
      
      // Disable analytics/cookies here
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied'
        });
      }
    });
  }

  // Animate widgets on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Pause animations until in view
  footer.querySelectorAll('.footer-v3__widget').forEach(widget => {
    widget.style.animationPlayState = 'paused';
    observer.observe(widget);
  });
})();
    `;
  }

  private getContrastColor(bgColor: string): string {
    // Simple contrast calculation
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? '#000000' : '#ffffff';
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
}
/**
 * Footer Renderer V3 - Rendu complet et robuste
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { footerDataSchema, footerDefaults, type FooterData } from '../schemas/blocks/footer';

export class FooterRendererV3 implements BlockRenderer<FooterData> {
  type = 'footer-ultra-modern';
  version = '3.0.0';

  validate(data: unknown): z.SafeParseReturnType<FooterData, FooterData> {
    return footerDataSchema.safeParse(data);
  }

  getDefaultData(): FooterData {
    return footerDefaults;
  }

  getDefaultCSS(): string {
    return `
/* Footer Base Styles */
.footer {
  position: relative;
  width: 100%;
  background: var(--footer-bg, #1f2937);
  color: var(--footer-text, #f9fafb);
  overflow: hidden;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Container widths */
.footer--container-full .footer__container { max-width: 100%; }
.footer--container-wide .footer__container { max-width: 1400px; }
.footer--container-normal .footer__container { max-width: 1200px; }
.footer--container-narrow .footer__container { max-width: 1000px; }

/* Main Content */
.footer__main {
  padding: 4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__grid {
  display: grid;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Column layouts */
.footer--columns-2 .footer__grid { grid-template-columns: repeat(2, 1fr); }
.footer--columns-3 .footer__grid { grid-template-columns: repeat(3, 1fr); }
.footer--columns-4 .footer__grid { grid-template-columns: repeat(4, 1fr); }
.footer--columns-5 .footer__grid { grid-template-columns: repeat(5, 1fr); }
.footer--columns-6 .footer__grid { grid-template-columns: repeat(6, 1fr); }

/* Company Section */
.footer__company {
  grid-column: span 2;
}

.footer__logo {
  display: inline-block;
  margin-bottom: 1rem;
}

.footer__logo img {
  height: 40px;
  width: auto;
}

.footer__company-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer__company-desc {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 300px;
}

/* Column Styles */
.footer__column {
  min-width: 0;
}

.footer__column-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__link {
  display: block;
  padding: 0.5rem 0;
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.footer__link:hover {
  opacity: 1;
  transform: translateX(5px);
  color: var(--primary, #3b82f6);
}

/* Social Links */
.footer__social {
  margin: 2rem 0;
}

.footer__social-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer__social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: inherit;
  transition: all 0.3s;
}

.footer__social-link:hover {
  background: var(--primary, #3b82f6);
  transform: translateY(-3px);
}

.footer__social-link svg {
  width: 20px;
  height: 20px;
}

/* Newsletter */
.footer__newsletter {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  margin: 2rem 0;
}

.footer__newsletter-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.footer__newsletter-desc {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.footer__newsletter-form {
  display: flex;
  gap: 1rem;
}

.footer__newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
}

.footer__newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.footer__newsletter-input:focus {
  outline: none;
  border-color: var(--primary, #3b82f6);
  background: rgba(255, 255, 255, 0.15);
}

.footer__newsletter-button {
  padding: 0.75rem 1.5rem;
  background: var(--primary, #3b82f6);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.footer__newsletter-button:hover {
  background: var(--primary-dark, #2563eb);
  transform: translateY(-2px);
}

/* Contact Info */
.footer__contact {
  margin: 2rem 0;
}

.footer__contact-item {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  opacity: 0.8;
}

.footer__contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.6;
}

/* Payment Methods */
.footer__payment {
  margin: 2rem 0;
}

.footer__payment-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer__payment-methods {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer__payment-method {
  width: 40px;
  height: 25px;
  background: white;
  border-radius: 4px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bottom Bar */
.footer__bottom {
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__copyright {
  font-size: 0.875rem;
  opacity: 0.7;
}

.footer__bottom-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer__bottom-link {
  font-size: 0.875rem;
  color: inherit;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.footer__bottom-link:hover {
  opacity: 1;
}

/* Back to Top */
.footer__back-to-top {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 50px;
  height: 50px;
  background: var(--primary, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.footer__back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Variants */
.footer--minimal-elegant {
  background: #1a1a1a;
}

.footer--gradient-modern {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}

.footer--dark-corporate {
  background: #0f172a;
  border-top: 3px solid var(--primary, #3b82f6);
}

.footer--waves-creative {
  background: #1f2937;
  position: relative;
}

.footer--waves-creative::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%231f2937'/%3E%3C/svg%3E");
  background-size: cover;
}

.footer--glassmorphism {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
}

/* Padding variants */
.footer--padding-none .footer__main { padding: 0; }
.footer--padding-sm .footer__main { padding: 2rem 0; }
.footer--padding-md .footer__main { padding: 3rem 0; }
.footer--padding-lg .footer__main { padding: 4rem 0; }
.footer--padding-xl .footer__main { padding: 6rem 0; }

/* Responsive */
@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr !important;
  }
  
  .footer__company {
    grid-column: span 1;
  }
  
  .footer__bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer__newsletter-form {
    flex-direction: column;
  }
  
  .footer__back-to-top {
    right: 1rem;
    bottom: 1rem;
    width: 40px;
    height: 40px;
  }
}`;
  }

  getRequiredAssets() {
    return [];
  }

  renderPreview(data: FooterData): string {
    return `
<div class="footer-preview">
  <h3>Footer ${data.variant}</h3>
  <p>${data.columns.length} colonnes</p>
</div>`;
  }

  render(data: FooterData, context?: RenderContext): RenderResult {
    const startTime = performance.now();
    
    try {
      // Générer le HTML
      const html = this.generateHTML(data);
      
      // Générer le CSS spécifique
      const css = this.generateCSS(data);
      
      // Générer le JS (newsletter, back to top, etc.)
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
        html: '<footer class="footer footer--error">Erreur de rendu</footer>',
        css: this.getDefaultCSS(),
        js: '',
        assets: [],
        errors: [{
          blockId: 'footer',
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

  private generateHTML(data: FooterData): string {
    const classes = [
      'footer',
      `footer--${data.variant}`,
      `footer--columns-${data.layout.columns}`,
      `footer--container-${data.layout.containerWidth}`,
      `footer--padding-${data.styles.padding}`
    ].join(' ');

    return `
<footer class="${classes}" data-block="footer">
  <div class="footer__container">
    <div class="footer__main">
      ${this.renderMainContent(data)}
      ${data.social.enabled && data.social.position === 'top' ? this.renderSocialLinks(data.social) : ''}
      ${data.newsletter.enabled ? this.renderNewsletter(data.newsletter) : ''}
      ${data.paymentMethods.enabled ? this.renderPaymentMethods(data.paymentMethods) : ''}
      ${data.certifications.enabled ? this.renderCertifications(data.certifications) : ''}
    </div>
    
    ${data.bottomBar.enabled ? this.renderBottomBar(data) : ''}
  </div>
  
  ${data.bottomBar.showBackToTop ? this.renderBackToTop() : ''}
</footer>`;
  }

  private renderMainContent(data: FooterData): string {
    return `
<div class="footer__grid">
  ${data.company.showLogo || data.company.description || data.contactInfo.enabled ? `
    <div class="footer__company">
      ${data.company.showLogo ? this.renderCompanyInfo(data.company) : ''}
      ${data.contactInfo.enabled ? this.renderContactInfo(data.contactInfo) : ''}
      ${data.social.enabled && data.social.position === 'sidebar' ? this.renderSocialLinks(data.social) : ''}
    </div>
  ` : ''}
  
  ${data.columns.map(column => this.renderColumn(column)).join('')}
  
  ${data.widgets.map(widget => this.renderWidget(widget)).join('')}
</div>`;
  }

  private renderCompanyInfo(company: FooterData['company']): string {
    return `
<div class="footer__company-info">
  ${company.logo ? `
    <a href="/" class="footer__logo">
      <img src="${company.logo.src}" alt="${this.escape(company.logo.alt || company.name)}" />
    </a>
  ` : `
    <h3 class="footer__company-name">${this.escape(company.name)}</h3>
  `}
  
  ${company.description ? `
    <p class="footer__company-desc">${this.escape(company.description)}</p>
  ` : ''}
</div>`;
  }

  private renderColumn(column: any): string {
    return `
<div class="footer__column">
  <h4 class="footer__column-title">${this.escape(column.title)}</h4>
  
  <ul class="footer__links footer__links--${column.style}">
    ${column.links.map(link => `
      <li>
        <a href="${link.url}" class="footer__link" ${link.target !== '_self' ? `target="${link.target}"` : ''}>
          ${link.icon ? `<span class="footer__link-icon">${link.icon}</span>` : ''}
          ${this.escape(link.label)}
        </a>
      </li>
    `).join('')}
  </ul>
</div>`;
  }

  private renderContactInfo(info: FooterData['contactInfo']): string {
    return `
<div class="footer__contact">
  ${info.phone ? `
    <div class="footer__contact-item">
      <svg class="footer__contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span>${this.escape(info.phone)}</span>
    </div>
  ` : ''}
  
  ${info.email ? `
    <div class="footer__contact-item">
      <svg class="footer__contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span>${this.escape(info.email)}</span>
    </div>
  ` : ''}
  
  ${info.address ? `
    <div class="footer__contact-item">
      <svg class="footer__contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>${this.escape(info.address)}</span>
    </div>
  ` : ''}
</div>`;
  }

  private renderSocialLinks(social: FooterData['social']): string {
    return `
<div class="footer__social footer__social--${social.style}">
  ${social.title ? `<h4 class="footer__social-title">${this.escape(social.title)}</h4>` : ''}
  
  <div class="footer__social-links">
    ${social.links.map(link => `
      <a href="${link.url}" class="footer__social-link footer__social-link--${link.platform}" aria-label="${link.label || link.platform}" target="_blank">
        ${this.getSocialIcon(link.platform)}
      </a>
    `).join('')}
  </div>
</div>`;
  }

  private renderNewsletter(newsletter: FooterData['newsletter']): string {
    return `
<div class="footer__newsletter footer__newsletter--${newsletter.style}">
  <h3 class="footer__newsletter-title">${this.escape(newsletter.title)}</h3>
  <p class="footer__newsletter-desc">${this.escape(newsletter.description)}</p>
  
  <form class="footer__newsletter-form" id="footer-newsletter">
    <input 
      type="email" 
      class="footer__newsletter-input" 
      placeholder="${this.escape(newsletter.placeholder)}"
      required
    />
    <button type="submit" class="footer__newsletter-button">
      ${this.escape(newsletter.buttonText)}
    </button>
  </form>
  
  <div class="footer__newsletter-message footer__newsletter-message--success" style="display: none;">
    ${this.escape(newsletter.successMessage)}
  </div>
  <div class="footer__newsletter-message footer__newsletter-message--error" style="display: none;">
    ${this.escape(newsletter.errorMessage)}
  </div>
</div>`;
  }

  private renderPaymentMethods(payment: FooterData['paymentMethods']): string {
    return `
<div class="footer__payment">
  <h4 class="footer__payment-title">${this.escape(payment.title)}</h4>
  <div class="footer__payment-methods">
    ${payment.methods.map(method => `
      <div class="footer__payment-method footer__payment-method--${method}">
        ${this.getPaymentIcon(method)}
      </div>
    `).join('')}
  </div>
</div>`;
  }

  private renderCertifications(certs: FooterData['certifications']): string {
    return `
<div class="footer__certifications">
  <h4 class="footer__certifications-title">${this.escape(certs.title)}</h4>
  <div class="footer__certifications-list">
    ${certs.items.map(cert => `
      ${cert.url ? `<a href="${cert.url}" target="_blank">` : ''}
        <img src="${cert.image.src}" alt="${this.escape(cert.name)}" class="footer__certification" />
      ${cert.url ? '</a>' : ''}
    `).join('')}
  </div>
</div>`;
  }

  private renderWidget(widget: any): string {
    // Implémenter selon le type de widget
    return '';
  }

  private renderBottomBar(data: FooterData): string {
    const { bottomBar } = data;
    
    return `
<div class="footer__bottom footer__bottom--${bottomBar.style}">
  <div class="footer__bottom-content">
    <p class="footer__copyright">${this.escape(bottomBar.copyright)}</p>
    
    <nav class="footer__bottom-links">
      ${bottomBar.links.map(link => `
        <a href="${link.url}" class="footer__bottom-link" ${link.target !== '_self' ? `target="${link.target}"` : ''}>
          ${this.escape(link.label)}
        </a>
      `).join('')}
    </nav>
  </div>
  
  ${data.social.enabled && data.social.position === 'bottom' ? this.renderSocialLinks(data.social) : ''}
</div>`;
  }

  private renderBackToTop(): string {
    return `
<button class="footer__back-to-top" id="back-to-top" aria-label="Retour en haut">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>`;
  }

  private generateCSS(data: FooterData): string {
    let css = '';
    
    // CSS des couleurs personnalisées
    if (data.styles.backgroundColor || data.styles.textColor || data.styles.accentColor) {
      css += `
.footer {
  ${data.styles.backgroundColor ? `--footer-bg: ${data.styles.backgroundColor};` : ''}
  ${data.styles.backgroundColor ? `background-color: ${data.styles.backgroundColor};` : ''}
  ${data.styles.textColor ? `--footer-text: ${data.styles.textColor};` : ''}
  ${data.styles.textColor ? `color: ${data.styles.textColor};` : ''}
  ${data.styles.accentColor ? `--primary: ${data.styles.accentColor};` : ''}
}`;
    }
    
    // CSS pour la bordure personnalisée
    if (data.styles.borderStyle === 'gradient') {
      css += `
.footer__main {
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, var(--primary), var(--secondary)) 1;
}`;
    }
    
    return css;
  }

  private generateJS(data: FooterData): string {
    let js = '';
    
    // Newsletter
    if (data.newsletter.enabled) {
      js += `
// Newsletter Footer
(function() {
  const form = document.getElementById('footer-newsletter');
  if (!form) return;
  
  const successMsg = form.querySelector('.footer__newsletter-message--success');
  const errorMsg = form.querySelector('.footer__newsletter-message--error');
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = input.value.trim();
    if (!email) return;
    
    // Disable form
    input.disabled = true;
    button.disabled = true;
    button.textContent = 'Envoi...';
    
    // Hide messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    try {
      ${data.newsletter.webhookUrl ? `
      // Send to webhook
      const response = await fetch('${data.newsletter.webhookUrl}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' })
      });
      
      if (!response.ok) throw new Error('Erreur serveur');
      ` : `
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      `}
      
      // Show success
      successMsg.style.display = 'block';
      input.value = '';
      
    } catch (error) {
      // Show error
      errorMsg.style.display = 'block';
    } finally {
      // Re-enable form
      input.disabled = false;
      button.disabled = false;
      button.textContent = '${this.escape(data.newsletter.buttonText)}';
    }
  });
})();`;
    }
    
    // Back to top
    if (data.bottomBar.showBackToTop) {
      js += `
// Back to Top
(function() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;
  
  // Show/hide based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initial state
  backToTop.style.opacity = '0';
  backToTop.style.visibility = 'hidden';
  backToTop.style.transition = 'all 0.3s';
})();`;
    }
    
    return js;
  }

  private getSocialIcon(platform: string): string {
    const icons = {
      facebook: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      twitter: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      instagram: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>',
      linkedin: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      youtube: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
    };
    
    return icons[platform] || '<svg fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
  }

  private getPaymentIcon(method: string): string {
    // Retourner des icônes SVG simplifiées pour les méthodes de paiement
    return `<span style="font-size: 10px; font-weight: bold;">${method.toUpperCase()}</span>`;
  }

  private escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
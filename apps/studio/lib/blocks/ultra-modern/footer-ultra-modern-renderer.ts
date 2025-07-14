export function renderFooterUltraModern(props: any): { html: string; css: string; js: string } {
  const {
    variant = 'gradient-wave',
    companyName = 'Company Name',
    description = '',
    columns = [],
    contactInfo = {},
    socialLinks = [],
    newsletter = { enabled: false },
    bottomLinks = []
  } = props;

  const html = `
    <footer class="footer-ultra-modern footer-${variant}">
      <div class="footer-content">
        <div class="container mx-auto px-4">
          <div class="footer-grid">
            <!-- Company Info -->
            <div class="footer-company">
              <h3 class="footer-logo">${companyName}</h3>
              ${description ? `<p class="footer-description">${description}</p>` : ''}
              
              ${socialLinks.length > 0 ? `
                <div class="social-links">
                  ${socialLinks.map((link: any) => `
                    <a href="${link.url}" class="social-link" aria-label="${link.platform}">
                      <i class="fab fa-${link.platform}"></i>
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            
            <!-- Footer Columns -->
            ${columns.map((column: any) => `
              <div class="footer-column">
                <h4 class="column-title">${column.title}</h4>
                <ul class="column-links">
                  ${column.links.map((link: any) => `
                    <li><a href="${link.url}">${link.text}</a></li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
            
            <!-- Contact Info -->
            ${Object.keys(contactInfo).length > 0 ? `
              <div class="footer-contact">
                <h4 class="column-title">Contact</h4>
                ${contactInfo.phone ? `<p><i class="fas fa-phone"></i> ${contactInfo.phone}</p>` : ''}
                ${contactInfo.email ? `<p><i class="fas fa-envelope"></i> ${contactInfo.email}</p>` : ''}
                ${contactInfo.address ? `<p><i class="fas fa-map-marker-alt"></i> ${contactInfo.address}</p>` : ''}
              </div>
            ` : ''}
            
            <!-- Newsletter -->
            ${newsletter.enabled ? `
              <div class="footer-newsletter">
                <h4 class="column-title">${newsletter.title || 'Newsletter'}</h4>
                <form class="newsletter-form">
                  <input type="email" placeholder="${newsletter.placeholder || 'Votre email'}" required>
                  <button type="submit">${newsletter.buttonText || 'S\'inscrire'}</button>
                </form>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="container mx-auto px-4">
          <div class="bottom-content">
            <p>&copy; ${new Date().getFullYear()} ${companyName}. Tous droits réservés.</p>
            ${bottomLinks.length > 0 ? `
              <div class="bottom-links">
                ${bottomLinks.map((link: any, index: number) => `
                  ${index > 0 ? '<span>|</span>' : ''}
                  <a href="${link.url}">${link.text}</a>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </footer>
  `;

  const css = `
    .footer-ultra-modern {
      margin-top: 4rem;
      background: #1a1a1a;
      color: white;
    }
    
    .footer-gradient-wave {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }
    
    .footer-content {
      padding: 4rem 0 3rem;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
    }
    
    .footer-logo {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    
    .footer-description {
      margin-bottom: 1.5rem;
      opacity: 0.8;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    .column-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .column-links {
      list-style: none;
      padding: 0;
    }
    
    .column-links li {
      margin-bottom: 0.5rem;
    }
    
    .column-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .column-links a:hover {
      color: white;
    }
    
    .footer-contact p {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .newsletter-form {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .newsletter-form input {
      flex: 1;
      padding: 0.5rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 4px;
    }
    
    .newsletter-form input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    .newsletter-form button {
      padding: 0.5rem 1.5rem;
      background: white;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .newsletter-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .footer-bottom {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.5rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .bottom-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .bottom-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .bottom-links a:hover {
      color: white;
    }
    
    .bottom-links span {
      opacity: 0.4;
    }
    
    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .bottom-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `;

  const js = `
    document.addEventListener('DOMContentLoaded', function() {
      const newsletterForm = document.querySelector('.newsletter-form');
      if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;
          alert('Merci pour votre inscription avec : ' + email);
          this.reset();
        });
      }
    });
  `;

  return { html, css, js };
}
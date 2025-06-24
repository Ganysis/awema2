import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const footerPro: Block = {
  id: 'footer-pro',
  name: 'Footer Professionnel',
  description: 'Pied de page professionnel avec liens services, mentions légales et crédit Awema',
  category: BlockCategory.FOOTER,
  tags: ['footer', 'contact', 'services', 'legal'],
  thumbnail: '/blocks/footer-pro.svg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'companyName',
      type: PropType.STRING,
      description: 'Nom de l\'entreprise',
      required: true,
      defaultValue: 'MonEntreprise',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Nom de l\'entreprise',
        group: 'Informations',
        order: 1
      }
    },
    {
      name: 'description',
      type: PropType.STRING,
      description: 'Description courte',
      required: false,
      defaultValue: 'Votre partenaire de confiance pour tous vos projets',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'entreprise',
        group: 'Informations',
        order: 2
      }
    },
    {
      name: 'address',
      type: PropType.STRING,
      description: 'Adresse',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Adresse complète',
        group: 'Contact',
        order: 3
      }
    },
    {
      name: 'phone',
      type: PropType.STRING,
      description: 'Téléphone',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: '01 23 45 67 89',
        group: 'Contact',
        order: 4
      }
    },
    {
      name: 'email',
      type: PropType.STRING,
      description: 'Email',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'contact@monentreprise.fr',
        group: 'Contact',
        order: 5
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
        order: 6
      }
    },
    {
      name: 'socialLinks',
      type: PropType.STRING,
      description: 'Réseaux sociaux',
      required: false,
      defaultValue: JSON.stringify([
        { platform: 'facebook', url: '#' },
        { platform: 'instagram', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]),
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{platform, url}, ...]',
        group: 'Social',
        order: 7
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
    companyName: 'MonEntreprise',
    description: 'Votre partenaire de confiance pour tous vos projets',
    address: '',
    phone: '',
    email: '',
    services: [
      { label: 'Service 1', href: '/services/service-1' },
      { label: 'Service 2', href: '/services/service-2' },
      { label: 'Service 3', href: '/services/service-3' },
      { label: 'Service 4', href: '/services/service-4' }
    ],
    socialLinks: [
      { platform: 'facebook', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'linkedin', url: '#' }
    ]
  }
};

export function renderFooterPro(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const { 
    companyName = 'MonEntreprise',
    description = '',
    address = '',
    phone = '',
    email = '',
    services = [],
    socialLinks = []
  } = props;

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, string> = {
      facebook: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      instagram: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>',
      linkedin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      twitter: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>'
    };
    return icons[platform] || '';
  };

  const html = `
    <footer class="footer-pro">
      <div class="container">
        <div class="footer-content">
          <div class="footer-main">
            <!-- Company Info -->
            <div class="footer-section footer-about">
              <h3 class="footer-title">${companyName}</h3>
              ${description ? `<p class="footer-description">${description}</p>` : ''}
              
              ${socialLinks.length > 0 ? `
                <div class="social-links">
                  ${socialLinks.map((link: any) => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}">
                      ${getSocialIcon(link.platform)}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            
            <!-- Services -->
            <div class="footer-section footer-services">
              <h4 class="footer-heading">Nos Services</h4>
              <ul class="footer-links">
                ${services.map((service: any) => `
                  <li><a href="${service.href}">${service.label}</a></li>
                `).join('')}
              </ul>
            </div>
            
            <!-- Quick Links -->
            <div class="footer-section footer-quicklinks">
              <h4 class="footer-heading">Liens Utiles</h4>
              <ul class="footer-links">
                <li><a href="/">Accueil</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/mentions-legales">Mentions légales</a></li>
              </ul>
            </div>
            
            <!-- Contact -->
            <div class="footer-section footer-contact">
              <h4 class="footer-heading">Contact</h4>
              <div class="contact-info">
                ${address ? `
                  <div class="contact-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 2.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM8 14c-2.17 0-4.07-1.14-5.13-2.86C3.93 9.83 6.05 9 8 9s4.07.83 5.13 2.14C12.07 12.86 10.17 14 8 14z"/>
                    </svg>
                    <span>${address.replace(/\n/g, '<br>')}</span>
                  </div>
                ` : ''}
                
                ${phone ? `
                  <div class="contact-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 012.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg>
                    <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a>
                  </div>
                ` : ''}
                
                ${email ? `
                  <div class="contact-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 002 13h12a1 1 0 00.966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                    </svg>
                    <a href="mailto:${email}">${email}</a>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
          
          <!-- Bottom Bar -->
          <div class="footer-bottom">
            <div class="bottom-content">
              <p class="copyright">&copy; ${new Date().getFullYear()} ${companyName}. Tous droits réservés.</p>
              <p class="awema-credit">
                Site créé avec <a href="https://awema.fr" target="_blank" rel="noopener">AWEMA Studio</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;

  const css = `
    .footer-pro {
      background: #1a1a1a;
      color: #fff;
      padding-top: 60px;
      margin-top: auto;
    }
    
    .footer-pro .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .footer-pro .footer-main {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .footer-pro .footer-title {
      font-size: 28px;
      margin: 0 0 15px;
      color: #fff;
    }
    
    .footer-pro .footer-description {
      color: #ccc;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    
    .footer-pro .social-links {
      display: flex;
      gap: 15px;
    }
    
    .footer-pro .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .footer-pro .social-links a:hover {
      background: var(--primary, #007bff);
      transform: translateY(-3px);
    }
    
    .footer-pro .social-links svg {
      width: 20px;
      height: 20px;
    }
    
    .footer-pro .footer-heading {
      font-size: 18px;
      margin: 0 0 20px;
      color: #fff;
      font-weight: 600;
    }
    
    .footer-pro .footer-links {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .footer-pro .footer-links li {
      margin-bottom: 12px;
    }
    
    .footer-pro .footer-links a {
      color: #ccc;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      padding-left: 15px;
    }
    
    .footer-pro .footer-links a::before {
      content: '›';
      position: absolute;
      left: 0;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .footer-pro .footer-links a:hover {
      color: #fff;
      padding-left: 20px;
    }
    
    .footer-pro .footer-links a:hover::before {
      opacity: 1;
      left: 5px;
    }
    
    .footer-pro .contact-info {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .footer-pro .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #ccc;
    }
    
    .footer-pro .contact-item svg {
      flex-shrink: 0;
      margin-top: 2px;
      opacity: 0.7;
    }
    
    .footer-pro .contact-item a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-pro .contact-item a:hover {
      color: #fff;
    }
    
    .footer-pro .footer-bottom {
      padding: 30px 0;
    }
    
    .footer-pro .bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .footer-pro .copyright {
      margin: 0;
      color: #999;
      font-size: 14px;
    }
    
    .footer-pro .awema-credit {
      margin: 0;
      color: #999;
      font-size: 14px;
    }
    
    .footer-pro .awema-credit a {
      color: var(--primary, #007bff);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .footer-pro .awema-credit a:hover {
      color: #fff;
      text-decoration: underline;
    }
    
    /* Responsive */
    @media (max-width: 992px) {
      .footer-pro .footer-main {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
      
      .footer-pro .footer-about {
        grid-column: 1 / -1;
      }
    }
    
    @media (max-width: 768px) {
      .footer-pro {
        padding-top: 40px;
      }
      
      .footer-pro .footer-main {
        grid-template-columns: 1fr;
        gap: 30px;
        padding-bottom: 30px;
      }
      
      .footer-pro .footer-title {
        font-size: 24px;
      }
      
      .footer-pro .footer-heading {
        font-size: 16px;
        margin-bottom: 15px;
      }
      
      .footer-pro .bottom-content {
        flex-direction: column;
        text-align: center;
        gap: 10px;
      }
      
      .footer-pro .social-links {
        justify-content: center;
      }
    }
    
    @media (max-width: 480px) {
      .footer-pro .footer-links {
        font-size: 14px;
      }
      
      .footer-pro .contact-item {
        font-size: 14px;
      }
      
      .footer-pro .copyright,
      .footer-pro .awema-credit {
        font-size: 12px;
      }
    }
  `;

  const js = `
    (function() {
      // Smooth scroll for anchor links
      const footerLinks = document.querySelectorAll('.footer-pro a[href^="#"]');
      
      footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
      
      // Add animation on scroll
      const footer = document.querySelector('.footer-pro');
      if (footer) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(footer);
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
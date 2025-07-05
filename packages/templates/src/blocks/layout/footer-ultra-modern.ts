import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Footer Ultra-Moderne - Pied de page révolutionnaire
 * Widgets dynamiques, newsletter, social wall, plan du site intelligent
 */
export const footerUltraModern: Block = {
  id: 'footer-ultra-modern',
  name: 'Footer Ultra-Moderne',
  description: 'Footer professionnel avec widgets, newsletter avancée, social wall et fonctionnalités modernes',
  category: BlockCategory.FOOTER,
  tags: ['footer', 'widgets', 'newsletter', 'social', 'sitemap', 'modern'],
  thumbnail: '/blocks/footer-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.LOW,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel',
      defaultValue: 'waves-gradient',
      required: true,
      validation: {
        options: [
          { label: 'Waves Gradient', value: 'waves-gradient' },
          { label: 'Dark Elegant', value: 'dark-elegant' },
          { label: 'Minimal Clean', value: 'minimal-clean' },
          { label: 'Corporate Pro', value: 'corporate-pro' },
          { label: 'Creative Split', value: 'creative-split' },
          { label: 'Tech Modern', value: 'tech-modern' },
          { label: 'Glassmorphism', value: 'glassmorphism' },
          { label: 'Organic Shapes', value: 'organic-shapes' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 1
      }
    },
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Disposition des colonnes',
      defaultValue: '4-columns',
      required: true,
      validation: {
        options: [
          { label: '4 colonnes égales', value: '4-columns' },
          { label: '3 colonnes + large', value: '3-plus-wide' },
          { label: '2 colonnes centrées', value: '2-centered' },
          { label: 'Mega footer', value: 'mega-footer' },
          { label: 'Compact', value: 'compact' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Layout',
        order: 2
      }
    },
    {
      name: 'enableNewsletter',
      type: PropType.BOOLEAN,
      description: 'Widget Newsletter',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Widgets',
        order: 3
      }
    },
    {
      name: 'newsletterStyle',
      type: PropType.STRING,
      description: 'Style de newsletter',
      defaultValue: 'inline-modern',
      required: false,
      validation: {
        options: [
          { label: 'Inline moderne', value: 'inline-modern' },
          { label: 'Card avec image', value: 'card-image' },
          { label: 'Split screen', value: 'split-screen' },
          { label: 'Floating box', value: 'floating-box' },
          { label: 'Minimal', value: 'minimal' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Widgets',
        order: 4,
        condition: { prop: 'enableNewsletter', value: true }
      }
    },
    {
      name: 'enableSocialWall',
      type: PropType.BOOLEAN,
      description: 'Mur social Instagram/Facebook',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Widgets',
        order: 5
      }
    },
    {
      name: 'socialFeedType',
      type: PropType.STRING,
      description: 'Type de feed social',
      defaultValue: 'instagram',
      required: false,
      validation: {
        options: [
          { label: 'Instagram', value: 'instagram' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'Twitter/X', value: 'twitter' },
          { label: 'Mix réseaux', value: 'mixed' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Widgets',
        order: 6,
        condition: { prop: 'enableSocialWall', value: true }
      }
    },
    {
      name: 'enableRecentPosts',
      type: PropType.BOOLEAN,
      description: 'Articles récents',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Widgets',
        order: 7
      }
    },
    {
      name: 'enableOpeningHours',
      type: PropType.BOOLEAN,
      description: 'Horaires d\'ouverture',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Widgets',
        order: 8
      }
    },
    {
      name: 'enablePaymentMethods',
      type: PropType.BOOLEAN,
      description: 'Moyens de paiement',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Widgets',
        order: 9
      }
    },
    {
      name: 'enableCertifications',
      type: PropType.BOOLEAN,
      description: 'Certifications & Labels',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Widgets',
        order: 10
      }
    },
    {
      name: 'enableBackToTop',
      type: PropType.BOOLEAN,
      description: 'Bouton retour en haut',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 11
      }
    },
    {
      name: 'enableCookieNotice',
      type: PropType.BOOLEAN,
      description: 'Bandeau cookies',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 12
      }
    },
    {
      name: 'companyInfo',
      type: PropType.OBJECT,
      description: 'Informations entreprise',
      defaultValue: {
        name: 'AWEMA Studio',
        description: 'Créateur de sites web professionnels pour artisans et PME',
        logo: '/logo-white.png',
        address: '123 rue de la Paix, 75001 Paris',
        phone: '01 23 45 67 89',
        email: 'contact@awema.fr'
      },
      required: true,
      editorConfig: {
        control: EditorControl.OBJECT,
        group: 'Contenu',
        order: 13
      }
    },
    {
      name: 'columns',
      type: PropType.ARRAY,
      description: 'Colonnes du footer',
      defaultValue: [
        {
          title: 'Services',
          links: [
            { label: 'Création de sites web', link: '/services/creation-site' },
            { label: 'Refonte de site', link: '/services/refonte' },
            { label: 'Maintenance', link: '/services/maintenance' },
            { label: 'Référencement SEO', link: '/services/seo' },
            { label: 'Marketing digital', link: '/services/marketing' }
          ]
        },
        {
          title: 'À propos',
          links: [
            { label: 'Notre équipe', link: '/about/equipe' },
            { label: 'Nos valeurs', link: '/about/valeurs' },
            { label: 'Témoignages', link: '/testimonials' },
            { label: 'Partenaires', link: '/partners' },
            { label: 'Carrières', link: '/careers' }
          ]
        },
        {
          title: 'Ressources',
          links: [
            { label: 'Blog', link: '/blog' },
            { label: 'Guides gratuits', link: '/guides' },
            { label: 'FAQ', link: '/faq' },
            { label: 'Support', link: '/support' },
            { label: 'Contact', link: '/contact' }
          ]
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
      name: 'socialLinks',
      type: PropType.ARRAY,
      description: 'Réseaux sociaux',
      defaultValue: [
        { platform: 'facebook', url: 'https://facebook.com', icon: 'facebook' },
        { platform: 'instagram', url: 'https://instagram.com', icon: 'instagram' },
        { platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin' },
        { platform: 'youtube', url: 'https://youtube.com', icon: 'youtube' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Contenu',
        order: 15
      }
    },
    {
      name: 'openingHours',
      type: PropType.ARRAY,
      description: 'Horaires d\'ouverture',
      defaultValue: [
        { day: 'Lundi - Vendredi', hours: '9h00 - 18h00' },
        { day: 'Samedi', hours: '10h00 - 16h00' },
        { day: 'Dimanche', hours: 'Fermé' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Widgets',
        order: 16,
        condition: { prop: 'enableOpeningHours', value: true }
      }
    },
    {
      name: 'paymentMethods',
      type: PropType.ARRAY,
      description: 'Moyens de paiement acceptés',
      defaultValue: [
        { name: 'Visa', icon: 'cc-visa' },
        { name: 'Mastercard', icon: 'cc-mastercard' },
        { name: 'PayPal', icon: 'cc-paypal' },
        { name: 'Apple Pay', icon: 'cc-apple-pay' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Widgets',
        order: 17,
        condition: { prop: 'enablePaymentMethods', value: true }
      }
    },
    {
      name: 'certifications',
      type: PropType.ARRAY,
      description: 'Certifications et labels',
      defaultValue: [
        { name: 'Google Partner', image: '/certif-google.png' },
        { name: 'Qualité Web', image: '/certif-opquast.png' },
        { name: 'RGPD Compliant', image: '/certif-rgpd.png' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Widgets',
        order: 18,
        condition: { prop: 'enableCertifications', value: true }
      }
    },
    {
      name: 'legalLinks',
      type: PropType.ARRAY,
      description: 'Liens légaux',
      defaultValue: [
        { label: 'Mentions légales', link: '/legal' },
        { label: 'Politique de confidentialité', link: '/privacy' },
        { label: 'CGV', link: '/cgv' },
        { label: 'Cookies', link: '/cookies' }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.COLLECTION,
        group: 'Contenu',
        order: 19
      }
    },
    {
      name: 'copyrightText',
      type: PropType.STRING,
      description: 'Texte de copyright',
      defaultValue: '© 2024 {company}. Tous droits réservés.',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 20,
        helpText: 'Utilisez {company} pour le nom de l\'entreprise et {year} pour l\'année'
      }
    },
    {
      name: 'developerCredit',
      type: PropType.BOOLEAN,
      description: 'Crédit développeur AWEMA',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 21,
        helpText: 'Affiche "Site créé par AWEMA"'
      }
    }
  ]
};

export function renderFooterUltraModern(props: any, variants: string[] = []): RenderedBlock {
  const {
    variant = 'waves-gradient',
    layout = '4-columns',
    enableNewsletter = true,
    newsletterStyle = 'inline-modern',
    enableSocialWall = true,
    socialFeedType = 'instagram',
    enableRecentPosts = true,
    enableOpeningHours = true,
    enablePaymentMethods = true,
    enableCertifications = true,
    enableBackToTop = true,
    enableCookieNotice = true,
    companyInfo = {},
    columns = [],
    socialLinks = [],
    openingHours = [],
    paymentMethods = [],
    certifications = [],
    legalLinks = [],
    copyrightText = '',
    developerCredit = true
  } = props;

  const themeColors = props.themeColors || {
    primary: '#667eea',
    'primary-hover': '#5a67d8',
    secondary: '#48bb78',
    background: '#ffffff',
    text: '#2d3748',
    border: '#e2e8f0'
  };

  const currentYear = new Date().getFullYear();
  const processedCopyright = copyrightText
    .replace('{company}', companyInfo.name || 'Company')
    .replace('{year}', currentYear.toString());

  // Newsletter widget
  const newsletterWidget = enableNewsletter ? renderNewsletterWidget(newsletterStyle) : '';

  // Social wall widget
  const socialWallWidget = enableSocialWall ? renderSocialWall(socialFeedType) : '';

  // Recent posts widget
  const recentPostsWidget = enableRecentPosts ? renderRecentPosts() : '';

  // Opening hours widget
  const openingHoursWidget = enableOpeningHours && openingHours.length > 0 ? renderOpeningHours(openingHours) : '';

  // Background decoration based on variant
  const backgroundDecoration = renderBackgroundDecoration(variant);

  // Back to top button
  const backToTopButton = enableBackToTop ? `
    <button class="back-to-top" aria-label="Retour en haut">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  ` : '';

  // Cookie notice
  const cookieNotice = enableCookieNotice ? renderCookieNotice() : '';

  const html = `
    <footer class="footer-ultra-modern ${variant} ${layout}">
      ${backgroundDecoration}
      
      <!-- Newsletter Section -->
      ${newsletterWidget}
      
      <!-- Main Footer Content -->
      <div class="footer-main">
        <div class="container mx-auto px-4">
          <div class="footer-grid">
            <!-- Company Info Column -->
            <div class="footer-column company-column">
              <div class="company-info">
                ${companyInfo.logo ? `
                  <img src="${companyInfo.logo}" alt="${companyInfo.name}" class="company-logo" />
                ` : `
                  <h3 class="company-name">${companyInfo.name || 'Company'}</h3>
                `}
                <p class="company-description">${companyInfo.description || ''}</p>
                
                <!-- Social Links -->
                ${socialLinks.length > 0 ? `
                  <div class="social-links">
                    ${socialLinks.map((social: any) => `
                      <a href="${social.url}" target="_blank" rel="noopener noreferrer" 
                         class="social-link" aria-label="${social.platform}">
                        <i class="icon-${social.icon}"></i>
                      </a>
                    `).join('')}
                  </div>
                ` : ''}
                
                <!-- Contact Info -->
                <div class="contact-info">
                  ${companyInfo.phone ? `
                    <div class="contact-item">
                      <i class="icon-phone"></i>
                      <a href="tel:${companyInfo.phone.replace(/\s/g, '')}">${companyInfo.phone}</a>
                    </div>
                  ` : ''}
                  ${companyInfo.email ? `
                    <div class="contact-item">
                      <i class="icon-mail"></i>
                      <a href="mailto:${companyInfo.email}">${companyInfo.email}</a>
                    </div>
                  ` : ''}
                  ${companyInfo.address ? `
                    <div class="contact-item">
                      <i class="icon-map-pin"></i>
                      <span>${companyInfo.address}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
            
            <!-- Navigation Columns -->
            ${columns.map((column: any) => `
              <div class="footer-column">
                <h4 class="column-title">${column.title}</h4>
                <ul class="column-links">
                  ${column.links.map((link: any) => `
                    <li>
                      <a href="${link.link}" class="footer-link">
                        ${link.label}
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
            
            <!-- Widget Column -->
            <div class="footer-column widget-column">
              ${openingHoursWidget}
              ${recentPostsWidget}
            </div>
          </div>
          
          <!-- Additional Widgets Row -->
          ${enablePaymentMethods || enableCertifications || enableSocialWall ? `
            <div class="footer-widgets">
              ${enablePaymentMethods && paymentMethods.length > 0 ? `
                <div class="payment-methods">
                  <h5>Moyens de paiement acceptés</h5>
                  <div class="payment-icons">
                    ${paymentMethods.map((method: any) => `
                      <i class="icon-${method.icon}" title="${method.name}"></i>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${enableCertifications && certifications.length > 0 ? `
                <div class="certifications">
                  <h5>Nos certifications</h5>
                  <div class="certification-logos">
                    ${certifications.map((cert: any) => `
                      <img src="${cert.image}" alt="${cert.name}" title="${cert.name}" />
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${socialWallWidget}
            </div>
          ` : ''}
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="container mx-auto px-4">
          <div class="bottom-content">
            <div class="copyright">
              <p>${processedCopyright}</p>
              ${developerCredit ? `
                <p class="developer-credit">
                  Site créé avec ❤️ par <a href="https://awema.fr" target="_blank" rel="noopener">AWEMA</a>
                </p>
              ` : ''}
            </div>
            
            <div class="legal-links">
              ${legalLinks.map((link: any) => `
                <a href="${link.link}" class="legal-link">${link.label}</a>
              `).join(' • ')}
            </div>
          </div>
        </div>
      </div>
      
      ${backToTopButton}
      ${cookieNotice}
    </footer>
  `;

  const css = `
    <style>
      /* Base Footer Styles */
      .footer-ultra-modern {
        position: relative;
        overflow: hidden;
        margin-top: 80px;
      }
      
      /* Variant: Waves Gradient */
      .waves-gradient {
        background: linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%);
        color: white;
      }
      
      .waves-gradient::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        animation: wave 20s linear infinite;
      }
      
      @keyframes wave {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Variant: Dark Elegant */
      .dark-elegant {
        background: #0f172a;
        color: #e2e8f0;
      }
      
      .dark-elegant .footer-link {
        color: #cbd5e1;
      }
      
      /* Variant: Minimal Clean */
      .minimal-clean {
        background: #f8fafc;
        color: ${themeColors.text};
        border-top: 1px solid ${themeColors.border};
      }
      
      .minimal-clean .footer-link {
        color: #64748b;
      }
      
      /* Variant: Corporate Pro */
      .corporate-pro {
        background: linear-gradient(to bottom, #1e293b 0%, #0f172a 100%);
        color: white;
      }
      
      /* Variant: Creative Split */
      .creative-split {
        background: white;
        position: relative;
      }
      
      .creative-split::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        background: ${themeColors.primary};
        transform: skewX(-10deg);
        transform-origin: top left;
      }
      
      /* Variant: Tech Modern */
      .tech-modern {
        background: #000;
        color: white;
        position: relative;
      }
      
      .tech-modern::before {
        content: '';
        position: absolute;
        inset: 0;
        background: 
          linear-gradient(90deg, transparent 0%, ${themeColors.primary}20 50%, transparent 100%),
          linear-gradient(0deg, transparent 0%, ${themeColors.secondary}20 50%, transparent 100%);
        opacity: 0.5;
      }
      
      /* Variant: Glassmorphism */
      .glassmorphism {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        color: ${themeColors.text};
      }
      
      /* Variant: Organic Shapes */
      .organic-shapes {
        background: ${themeColors.primary};
        color: white;
        position: relative;
      }
      
      .organic-shapes .shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;
        background: white;
      }
      
      /* Newsletter Widget Styles */
      .newsletter-section {
        padding: 60px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .newsletter-inline-modern {
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
      }
      
      .newsletter-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 10px;
      }
      
      .newsletter-subtitle {
        font-size: 1.125rem;
        opacity: 0.9;
        margin-bottom: 30px;
      }
      
      .newsletter-form {
        display: flex;
        gap: 10px;
        max-width: 500px;
        margin: 0 auto;
      }
      
      .newsletter-input {
        flex: 1;
        padding: 15px 20px;
        border: 2px solid transparent;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.9);
        color: ${themeColors.text};
        font-size: 1rem;
        transition: all 0.3s ease;
      }
      
      .newsletter-input:focus {
        outline: none;
        border-color: ${themeColors.primary};
        background: white;
      }
      
      .newsletter-submit {
        padding: 15px 30px;
        background: ${themeColors.primary};
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .newsletter-submit:hover {
        background: ${themeColors['primary-hover']};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      
      .newsletter-privacy {
        font-size: 0.875rem;
        margin-top: 15px;
        opacity: 0.8;
      }
      
      /* Main Footer Content */
      .footer-main {
        padding: 60px 0 40px;
        position: relative;
        z-index: 1;
      }
      
      .footer-grid {
        display: grid;
        gap: 40px;
      }
      
      /* Layout: 4 columns */
      .footer-ultra-modern.\\34-columns .footer-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
      
      /* Layout: 3 plus wide */
      .footer-ultra-modern.\\33-plus-wide .footer-grid {
        grid-template-columns: 2fr 1fr 1fr 1fr;
      }
      
      /* Layout: 2 centered */
      .footer-ultra-modern.\\32-centered .footer-grid {
        grid-template-columns: 1fr 1fr;
        max-width: 800px;
        margin: 0 auto;
      }
      
      /* Layout: Mega footer */
      .footer-ultra-modern.mega-footer .footer-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
      
      /* Layout: Compact */
      .footer-ultra-modern.compact .footer-main {
        padding: 40px 0 20px;
      }
      
      .footer-ultra-modern.compact .footer-grid {
        grid-template-columns: 2fr 1fr;
        gap: 60px;
      }
      
      /* Company Info */
      .company-logo {
        height: 40px;
        margin-bottom: 20px;
      }
      
      .company-name {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 20px;
      }
      
      .company-description {
        margin-bottom: 25px;
        opacity: 0.9;
        line-height: 1.6;
      }
      
      /* Social Links */
      .social-links {
        display: flex;
        gap: 12px;
        margin-bottom: 25px;
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
        background: ${themeColors.primary};
        transform: translateY(-3px);
      }
      
      /* Contact Info */
      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0.9;
      }
      
      .contact-item a {
        color: inherit;
        text-decoration: none;
        transition: opacity 0.3s ease;
      }
      
      .contact-item a:hover {
        opacity: 0.7;
      }
      
      /* Column Styles */
      .column-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 20px;
      }
      
      .column-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .column-links li {
        margin-bottom: 12px;
      }
      
      .footer-link {
        color: inherit;
        text-decoration: none;
        opacity: 0.8;
        transition: all 0.3s ease;
        display: inline-block;
      }
      
      .footer-link:hover {
        opacity: 1;
        transform: translateX(5px);
      }
      
      /* Opening Hours Widget */
      .opening-hours {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
      }
      
      .opening-hours h5 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 15px;
      }
      
      .hours-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .hours-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .hours-item:last-child {
        border-bottom: none;
      }
      
      .hours-day {
        font-weight: 500;
      }
      
      .hours-time {
        opacity: 0.8;
      }
      
      /* Recent Posts Widget */
      .recent-posts {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 12px;
      }
      
      .recent-posts h5 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 15px;
      }
      
      .post-item {
        display: flex;
        gap: 12px;
        margin-bottom: 15px;
      }
      
      .post-thumbnail {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
        flex-shrink: 0;
      }
      
      .post-content {
        flex: 1;
      }
      
      .post-title {
        font-weight: 500;
        margin-bottom: 4px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .post-date {
        font-size: 0.875rem;
        opacity: 0.7;
      }
      
      /* Social Wall Widget */
      .social-wall {
        padding: 40px 0;
      }
      
      .social-wall h5 {
        text-align: center;
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 20px;
      }
      
      .social-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .social-post {
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      
      .social-post:hover {
        transform: scale(1.05);
      }
      
      .social-post img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .social-post-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        padding: 10px;
      }
      
      .social-post:hover .social-post-overlay {
        opacity: 1;
      }
      
      .social-post-stats {
        display: flex;
        gap: 15px;
        color: white;
        font-size: 0.875rem;
      }
      
      /* Footer Widgets Row */
      .footer-widgets {
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
      }
      
      .footer-widgets h5 {
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.8;
      }
      
      /* Payment Methods */
      .payment-icons {
        display: flex;
        gap: 15px;
      }
      
      .payment-icons i {
        font-size: 2rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
      }
      
      .payment-icons i:hover {
        opacity: 1;
      }
      
      /* Certifications */
      .certification-logos {
        display: flex;
        gap: 20px;
        align-items: center;
      }
      
      .certification-logos img {
        height: 40px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }
      
      .certification-logos img:hover {
        opacity: 1;
      }
      
      /* Footer Bottom */
      .footer-bottom {
        background: rgba(0, 0, 0, 0.2);
        padding: 20px 0;
      }
      
      .bottom-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
      }
      
      .copyright p {
        margin: 0;
        opacity: 0.8;
      }
      
      .developer-credit {
        font-size: 0.875rem;
        margin-top: 5px;
      }
      
      .developer-credit a {
        color: ${themeColors.primary};
        text-decoration: none;
        font-weight: 500;
      }
      
      .legal-links {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }
      
      .legal-link {
        color: inherit;
        text-decoration: none;
        opacity: 0.8;
        font-size: 0.875rem;
        transition: opacity 0.3s ease;
      }
      
      .legal-link:hover {
        opacity: 1;
      }
      
      /* Back to Top Button */
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: ${themeColors.primary};
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
      
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }
      
      /* Cookie Notice */
      .cookie-notice {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 20px;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
      }
      
      .cookie-notice.show {
        transform: translateY(0);
      }
      
      .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
      }
      
      .cookie-text {
        flex: 1;
      }
      
      .cookie-buttons {
        display: flex;
        gap: 10px;
      }
      
      .cookie-btn {
        padding: 10px 20px;
        border-radius: 6px;
        border: none;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .cookie-accept {
        background: ${themeColors.primary};
        color: white;
      }
      
      .cookie-accept:hover {
        background: ${themeColors['primary-hover']};
      }
      
      .cookie-decline {
        background: transparent;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      
      .cookie-decline:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      /* Icons (placeholder styles) */
      [class^="icon-"] {
        display: inline-block;
        width: 16px;
        height: 16px;
      }
      
      /* Responsive */
      @media (max-width: 1024px) {
        .footer-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .company-column {
          grid-column: span 2;
        }
        
        .widget-column {
          grid-column: span 2;
        }
      }
      
      @media (max-width: 640px) {
        .footer-grid {
          grid-template-columns: 1fr !important;
          text-align: center;
        }
        
        .company-column,
        .widget-column {
          grid-column: span 1;
        }
        
        .social-links {
          justify-content: center;
        }
        
        .contact-info {
          align-items: center;
        }
        
        .newsletter-form {
          flex-direction: column;
        }
        
        .bottom-content {
          flex-direction: column;
          text-align: center;
        }
        
        .footer-widgets {
          flex-direction: column;
          text-align: center;
        }
        
        .payment-icons,
        .certification-logos {
          justify-content: center;
        }
        
        .cookie-content {
          flex-direction: column;
          text-align: center;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .minimal-clean {
          background: #0f172a;
          color: #e2e8f0;
        }
        
        .minimal-clean .footer-link {
          color: #cbd5e1;
        }
      }
      
      /* Print styles */
      @media print {
        .back-to-top,
        .cookie-notice,
        .newsletter-section,
        .social-wall {
          display: none !important;
        }
      }
    </style>
  `;

  const js = `
    <script>
      (function() {
        // Back to Top Button
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
          window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
              backToTop.classList.add('visible');
            } else {
              backToTop.classList.remove('visible');
            }
          });
          
          backToTop.addEventListener('click', () => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }
        
        // Cookie Notice
        const cookieNotice = document.querySelector('.cookie-notice');
        const acceptBtn = document.querySelector('.cookie-accept');
        const declineBtn = document.querySelector('.cookie-decline');
        
        if (cookieNotice) {
          // Check if cookies were already accepted
          const cookiesAccepted = localStorage.getItem('cookiesAccepted');
          
          if (!cookiesAccepted) {
            setTimeout(() => {
              cookieNotice.classList.add('show');
            }, 2000);
          }
          
          acceptBtn?.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.classList.remove('show');
            // Initialize analytics, etc.
            if (typeof gtag !== 'undefined') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
          });
          
          declineBtn?.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            cookieNotice.classList.remove('show');
          });
        }
        
        // Newsletter Form
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
          newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('.newsletter-input').value;
            const submitBtn = newsletterForm.querySelector('.newsletter-submit');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Envoi...';
            submitBtn.disabled = true;
            
            try {
              // Send to your newsletter endpoint
              const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
              });
              
              if (response.ok) {
                submitBtn.textContent = '✓ Inscrit !';
                newsletterForm.reset();
              } else {
                throw new Error('Subscription failed');
              }
            } catch (error) {
              submitBtn.textContent = 'Erreur';
              console.error('Newsletter subscription error:', error);
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }, 3000);
          });
        }
        
        // Social Wall - Instagram Feed
        if (${enableSocialWall}) {
          // This would typically load from Instagram API
          // For demo purposes, we'll use placeholder functionality
          const loadSocialPosts = async () => {
            const socialGrid = document.querySelector('.social-grid');
            if (!socialGrid) return;
            
            // In production, fetch from Instagram/Facebook API
            // const posts = await fetchSocialPosts();
            
            // Placeholder: Add click handlers
            const posts = socialGrid.querySelectorAll('.social-post');
            posts.forEach(post => {
              post.addEventListener('click', () => {
                // Open in new window or modal
                window.open(post.dataset.url, '_blank');
              });
            });
          };
          
          loadSocialPosts();
        }
        
        // Recent Posts - Dynamic Loading
        if (${enableRecentPosts}) {
          const loadRecentPosts = async () => {
            const container = document.querySelector('.recent-posts-list');
            if (!container) return;
            
            try {
              // Fetch recent posts from your API
              const response = await fetch('/api/posts/recent?limit=3');
              const posts = await response.json();
              
              container.innerHTML = posts.map(post => \`
                <div class="post-item">
                  <img src="\${post.thumbnail}" alt="\${post.title}" class="post-thumbnail" />
                  <div class="post-content">
                    <h6 class="post-title">
                      <a href="\${post.url}">\${post.title}</a>
                    </h6>
                    <span class="post-date">\${formatDate(post.date)}</span>
                  </div>
                </div>
              \`).join('');
            } catch (error) {
              console.error('Failed to load recent posts:', error);
            }
          };
          
          // Uncomment to enable dynamic loading
          // loadRecentPosts();
        }
        
        // Utility function to format date
        function formatDate(dateString) {
          const date = new Date(dateString);
          const options = { day: 'numeric', month: 'short', year: 'numeric' };
          return date.toLocaleDateString('fr-FR', options);
        }
        
        // Animate elements on scroll
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        // Observe footer columns
        document.querySelectorAll('.footer-column').forEach(column => {
          column.style.opacity = '0';
          column.style.transform = 'translateY(20px)';
          column.style.transition = 'all 0.6s ease';
          observer.observe(column);
        });
      })();
    </script>
  `;

  return {
    html: css + html + js,
    css: '', // CSS included in HTML
    js: '' // JS included in HTML
  };
}

// Helper render functions
function renderNewsletterWidget(style: string): string {
  switch (style) {
    case 'inline-modern':
      return `
        <div class="newsletter-section">
          <div class="container mx-auto px-4">
            <div class="newsletter-inline-modern">
              <h3 class="newsletter-title">Restez informé</h3>
              <p class="newsletter-subtitle">Recevez nos dernières actualités et offres exclusives</p>
              <form class="newsletter-form">
                <input 
                  type="email" 
                  class="newsletter-input" 
                  placeholder="Votre adresse email"
                  required
                />
                <button type="submit" class="newsletter-submit">
                  S'inscrire
                </button>
              </form>
              <p class="newsletter-privacy">
                En vous inscrivant, vous acceptez notre 
                <a href="/privacy">politique de confidentialité</a>
              </p>
            </div>
          </div>
        </div>
      `;
    // Add other newsletter styles
    default:
      return '';
  }
}

function renderSocialWall(feedType: string): string {
  // In production, this would fetch real social media posts
  const placeholderPosts = [
    { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=300&fit=crop', likes: 124, comments: 8 },
    { image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=300&fit=crop', likes: 89, comments: 5 },
    { image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=300&fit=crop', likes: 156, comments: 12 },
    { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=300&fit=crop', likes: 201, comments: 15 },
    { image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=300&h=300&fit=crop', likes: 92, comments: 7 },
    { image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&h=300&fit=crop', likes: 178, comments: 9 }
  ];
  
  return `
    <div class="social-wall">
      <h5>Suivez-nous sur ${feedType === 'instagram' ? 'Instagram' : feedType}</h5>
      <div class="social-grid">
        ${placeholderPosts.map(post => `
          <div class="social-post" data-url="https://instagram.com">
            <img src="${post.image}" alt="Post social media" />
            <div class="social-post-overlay">
              <div class="social-post-stats">
                <span>❤️ ${post.likes}</span>
                <span>💬 ${post.comments}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderRecentPosts(): string {
  // Placeholder posts - in production, fetch from CMS/Blog
  return `
    <div class="recent-posts">
      <h5>Articles récents</h5>
      <div class="recent-posts-list">
        <div class="post-item">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop" 
               alt="Article" class="post-thumbnail" />
          <div class="post-content">
            <h6 class="post-title">
              <a href="/blog/tendances-web-2024">Les tendances web design 2024</a>
            </h6>
            <span class="post-date">15 jan. 2024</span>
          </div>
        </div>
        <div class="post-item">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop" 
               alt="Article" class="post-thumbnail" />
          <div class="post-content">
            <h6 class="post-title">
              <a href="/blog/seo-local">Optimiser son SEO local</a>
            </h6>
            <span class="post-date">10 jan. 2024</span>
          </div>
        </div>
        <div class="post-item">
          <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=100&h=100&fit=crop" 
               alt="Article" class="post-thumbnail" />
          <div class="post-content">
            <h6 class="post-title">
              <a href="/blog/marketing-artisans">Marketing digital pour artisans</a>
            </h6>
            <span class="post-date">5 jan. 2024</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOpeningHours(hours: any[]): string {
  return `
    <div class="opening-hours">
      <h5>Horaires d'ouverture</h5>
      <div class="hours-list">
        ${hours.map(item => `
          <div class="hours-item">
            <span class="hours-day">${item.day}</span>
            <span class="hours-time">${item.hours}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderBackgroundDecoration(variant: string): string {
  switch (variant) {
    case 'organic-shapes':
      return `
        <div class="shape" style="width: 300px; height: 300px; top: -150px; left: -150px;"></div>
        <div class="shape" style="width: 200px; height: 200px; bottom: -100px; right: -100px;"></div>
        <div class="shape" style="width: 150px; height: 150px; top: 50%; left: 20%;"></div>
      `;
    case 'waves-gradient':
      return `
        <svg class="wave-decoration" style="position: absolute; top: 0; left: 0; width: 100%; height: 100px;">
          <path fill="rgba(255,255,255,0.05)" d="M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,0 L0,0 Z" />
        </svg>
      `;
    default:
      return '';
  }
}

function renderCookieNotice(): string {
  return `
    <div class="cookie-notice">
      <div class="cookie-content">
        <div class="cookie-text">
          <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.</p>
        </div>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-accept">Accepter</button>
          <button class="cookie-btn cookie-decline">Refuser</button>
        </div>
      </div>
    </div>
  `;
}
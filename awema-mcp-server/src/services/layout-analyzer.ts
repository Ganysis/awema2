import { JSDOM } from 'jsdom';

export interface LayoutSection {
  type: string;
  selector?: string;
  content?: {
    title?: string;
    subtitle?: string;
    text?: string;
    images?: string[];
    buttons?: Array<{
      text: string;
      href?: string;
    }>;
  };
  style?: {
    backgroundColor?: string;
    textAlign?: string;
    padding?: string;
  };
}

export interface LayoutAnalysis {
  type: 'artisan' | 'corporate' | 'modern' | 'classic';
  sections: LayoutSection[];
  navigation?: {
    type: 'fixed' | 'static';
    items: string[];
  };
  footer?: {
    columns: number;
    hasNewsletter: boolean;
    hasSocialLinks: boolean;
  };
}

export class LayoutAnalyzer {
  async analyze(html: string): Promise<LayoutAnalysis> {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const sections: LayoutSection[] = [];
    const layoutType = this.detectLayoutType(document);

    // Analyser le header/hero
    const hero = this.analyzeHeroSection(document);
    if (hero) sections.push(hero);

    // Analyser les sections de services
    const services = this.analyzeServicesSection(document);
    if (services) sections.push(services);

    // Analyser les témoignages
    const testimonials = this.analyzeTestimonialsSection(document);
    if (testimonials) sections.push(testimonials);

    // Analyser la galerie
    const gallery = this.analyzeGallerySection(document);
    if (gallery) sections.push(gallery);

    // Analyser le contact
    const contact = this.analyzeContactSection(document);
    if (contact) sections.push(contact);

    // Analyser la navigation
    const navigation = this.analyzeNavigation(document);

    // Analyser le footer
    const footer = this.analyzeFooter(document);

    return {
      type: layoutType,
      sections,
      navigation,
      footer
    };
  }

  private detectLayoutType(document: Document): LayoutAnalysis['type'] {
    const bodyText = document.body.textContent?.toLowerCase() || '';
    
    // Détecter le type basé sur le contenu et le style
    if (bodyText.includes('urgence') || bodyText.includes('24/7') || bodyText.includes('dépannage')) {
      return 'artisan';
    }
    
    if (document.querySelector('.corporate, .business, .enterprise')) {
      return 'corporate';
    }
    
    if (document.querySelector('.minimal, .clean, .modern')) {
      return 'modern';
    }
    
    return 'classic';
  }

  private analyzeHeroSection(document: Document): LayoutSection | null {
    const heroSelectors = [
      'header', '.hero', '.banner', '[class*="hero"]', 
      'section:first-of-type', '.jumbotron'
    ];

    for (const selector of heroSelectors) {
      const hero = document.querySelector(selector);
      if (hero) {
        const title = hero.querySelector('h1, h2')?.textContent?.trim();
        const subtitle = hero.querySelector('p, .subtitle, .lead')?.textContent?.trim();
        const buttons = Array.from(hero.querySelectorAll('a.btn, button, .button'))
          .map(btn => ({
            text: btn.textContent?.trim() || '',
            href: (btn as HTMLAnchorElement).href
          }));

        return {
          type: 'hero',
          selector,
          content: {
            title,
            subtitle,
            buttons
          }
        };
      }
    }

    return null;
  }

  private analyzeServicesSection(document: Document): LayoutSection | null {
    const servicesSelectors = [
      '.services', '#services', '[class*="service"]',
      'section:has(h2:contains("service"))'
    ];

    for (const selector of servicesSelectors) {
      const section = document.querySelector(selector);
      if (section) {
        const title = section.querySelector('h2, h3')?.textContent?.trim();
        const serviceCards = Array.from(section.querySelectorAll('.service, .card, [class*="service-item"]'));
        
        if (serviceCards.length > 0) {
          return {
            type: 'services',
            selector,
            content: {
              title,
              text: `${serviceCards.length} services détectés`
            }
          };
        }
      }
    }

    // Recherche alternative basée sur le contenu
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      const text = section.textContent?.toLowerCase() || '';
      if (text.includes('nos services') || text.includes('prestations')) {
        return {
          type: 'services',
          content: {
            title: section.querySelector('h2, h3')?.textContent?.trim()
          }
        };
      }
    }

    return null;
  }

  private analyzeTestimonialsSection(document: Document): LayoutSection | null {
    const testimonialSelectors = [
      '.testimonials', '.reviews', '[class*="testimonial"]',
      '.temoignages', '[class*="review"]'
    ];

    for (const selector of testimonialSelectors) {
      const section = document.querySelector(selector);
      if (section) {
        const title = section.querySelector('h2, h3')?.textContent?.trim();
        const reviews = section.querySelectorAll('.testimonial, .review, .quote');
        
        return {
          type: 'testimonials',
          selector,
          content: {
            title,
            text: `${reviews.length} témoignages détectés`
          }
        };
      }
    }

    return null;
  }

  private analyzeGallerySection(document: Document): LayoutSection | null {
    const gallerySelectors = [
      '.gallery', '[class*="gallery"]', '.portfolio',
      '.realisations', '.projets'
    ];

    for (const selector of gallerySelectors) {
      const section = document.querySelector(selector);
      if (section) {
        const images = section.querySelectorAll('img');
        const imageUrls = Array.from(images)
          .map(img => img.src)
          .filter(src => src && !src.includes('placeholder'));

        if (imageUrls.length > 0) {
          return {
            type: 'gallery',
            selector,
            content: {
              title: section.querySelector('h2, h3')?.textContent?.trim(),
              images: imageUrls.slice(0, 10)
            }
          };
        }
      }
    }

    return null;
  }

  private analyzeContactSection(document: Document): LayoutSection | null {
    const contactSelectors = [
      '.contact', '#contact', '[class*="contact"]',
      'section:has(form)', 'footer'
    ];

    for (const selector of contactSelectors) {
      const section = document.querySelector(selector);
      if (section) {
        const hasForm = section.querySelector('form') !== null;
        const hasPhone = section.textContent?.match(/\d{2}[\s.-]\d{2}[\s.-]\d{2}[\s.-]\d{2}[\s.-]\d{2}/);
        const hasEmail = section.textContent?.includes('@');

        if (hasForm || hasPhone || hasEmail) {
          return {
            type: 'contact',
            selector,
            content: {
              title: section.querySelector('h2, h3')?.textContent?.trim(),
              text: hasForm ? 'Formulaire de contact détecté' : 'Informations de contact détectées'
            }
          };
        }
      }
    }

    return null;
  }

  private analyzeNavigation(document: Document): LayoutAnalysis['navigation'] {
    const nav = document.querySelector('nav, .navbar, .navigation, header nav');
    
    if (nav) {
      const items = Array.from(nav.querySelectorAll('a'))
        .map(link => link.textContent?.trim() || '')
        .filter(text => text.length > 0 && text.length < 30);

      const isFixed = window.getComputedStyle(nav).position === 'fixed' ||
                     nav.classList.contains('fixed') ||
                     nav.classList.contains('sticky');

      return {
        type: isFixed ? 'fixed' : 'static',
        items
      };
    }

    return undefined;
  }

  private analyzeFooter(document: Document): LayoutAnalysis['footer'] {
    const footer = document.querySelector('footer, .footer');
    
    if (footer) {
      const columns = footer.querySelectorAll('.col, .column, [class*="col-"]').length || 1;
      const hasNewsletter = footer.querySelector('input[type="email"], .newsletter') !== null;
      const hasSocialLinks = footer.querySelector('.social, [class*="social"], [class*="facebook"], [class*="twitter"]') !== null;

      return {
        columns,
        hasNewsletter,
        hasSocialLinks
      };
    }

    return undefined;
  }
}
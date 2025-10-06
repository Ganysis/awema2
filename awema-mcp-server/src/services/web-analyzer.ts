import puppeteer, { Browser, Page } from 'puppeteer';
import { JSDOM } from 'jsdom';

export interface WebPageData {
  url: string;
  html?: string;
  screenshot?: string;
  title?: string;
  description?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  typography?: {
    primary?: string;
    secondary?: string;
  };
  sections?: string[];
  features?: string[];
}

export class WebAnalyzer {
  private browser: Browser | null = null;

  async analyze(url: string, options: any = {}): Promise<WebPageData> {
    try {
      // Lancer le navigateur si pas déjà fait
      if (!this.browser) {
        this.browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }

      const page = await this.browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      // Charger la page
      console.log(`Loading ${url}...`);
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Attendre un peu pour les animations
      await page.waitForTimeout(2000);

      const result: WebPageData = { url };

      // Capturer le HTML
      if (options.extractHTML !== false) {
        result.html = await page.content();
      }

      // Prendre un screenshot
      if (options.screenshot !== false) {
        const screenshotBuffer = await page.screenshot({ 
          fullPage: false,
          type: 'png',
          encoding: 'base64'
        });
        result.screenshot = screenshotBuffer as string;
      }

      // Extraire les métadonnées
      const metadata = await page.evaluate(() => {
        const getMetaContent = (name: string) => {
          const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
          return meta?.getAttribute('content') || '';
        };

        return {
          title: document.title,
          description: getMetaContent('description') || getMetaContent('og:description'),
          ogImage: getMetaContent('og:image')
        };
      });

      result.title = metadata.title;
      result.description = metadata.description;

      // Analyser les couleurs depuis le CSS
      const colors = await page.evaluate(() => {
        const extractColors = () => {
          const colors = new Set<string>();
          
          // Parcourir toutes les feuilles de style
          for (const sheet of document.styleSheets) {
            try {
              const rules = sheet.cssRules || sheet.rules;
              for (const rule of rules) {
                if (rule instanceof CSSStyleRule) {
                  const style = rule.style;
                  // Extraire les couleurs des propriétés CSS
                  ['color', 'background-color', 'background', 'border-color'].forEach(prop => {
                    const value = style.getPropertyValue(prop);
                    if (value && value.match(/#[0-9a-f]{3,6}|rgb/i)) {
                      colors.add(value);
                    }
                  });
                }
              }
            } catch (e) {
              // Ignorer les erreurs CORS
            }
          }

          // Analyser aussi les styles inline
          document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
              const value = style[prop as any];
              if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
                colors.add(value);
              }
            });
          });

          return Array.from(colors);
        };

        const allColors = extractColors();
        
        // Essayer de détecter les couleurs principales
        const primaryButton = document.querySelector('.btn-primary, .button-primary, [class*="primary"]');
        const primaryColor = primaryButton ? window.getComputedStyle(primaryButton).backgroundColor : null;

        return {
          all: allColors,
          primary: primaryColor
        };
      });

      // Déterminer les couleurs principales
      if (colors.all.length > 0) {
        result.colors = {
          primary: colors.primary || colors.all[0],
          secondary: colors.all[1] || '#1a1a1a',
          accent: colors.all[2] || colors.all[0]
        };
      }

      // Analyser la typographie
      const typography = await page.evaluate(() => {
        const getMainFont = (selector: string) => {
          const el = document.querySelector(selector);
          if (el) {
            const font = window.getComputedStyle(el).fontFamily;
            return font.split(',')[0].trim().replace(/['"]/g, '');
          }
          return null;
        };

        return {
          heading: getMainFont('h1, h2, h3') || 'sans-serif',
          body: getMainFont('body, p') || 'sans-serif'
        };
      });

      result.typography = {
        primary: typography.heading,
        secondary: typography.body
      };

      // Détecter les sections principales
      const sections = await page.evaluate(() => {
        const sectionNames: string[] = [];
        
        // Détecter hero/header
        if (document.querySelector('header, .hero, .banner, [class*="hero"], [class*="banner"]')) {
          sectionNames.push('hero');
        }

        // Détecter services
        if (document.querySelector('.services, #services, [class*="service"], section:has(h2:contains("service"))')) {
          sectionNames.push('services');
        }

        // Détecter témoignages
        if (document.querySelector('.testimonials, .reviews, [class*="testimonial"], [class*="review"]')) {
          sectionNames.push('testimonials');
        }

        // Détecter contact
        if (document.querySelector('.contact, #contact, form, [class*="contact"]')) {
          sectionNames.push('contact');
        }

        // Détecter galerie
        if (document.querySelector('.gallery, [class*="gallery"], .portfolio')) {
          sectionNames.push('gallery');
        }

        return sectionNames;
      });

      result.sections = sections;

      // Détecter les features spécifiques aux artisans
      const features = await page.evaluate(() => {
        const features: string[] = [];
        const text = document.body.innerText.toLowerCase();

        // Urgence
        if (text.includes('24/7') || text.includes('urgence') || text.includes('24h/24')) {
          features.push('urgency');
        }

        // Prix
        if (text.includes('devis gratuit') || text.includes('prix') || text.includes('tarif')) {
          features.push('pricing');
        }

        // Zone d'intervention
        if (text.includes('zone d\'intervention') || text.includes('nous intervenons')) {
          features.push('service-area');
        }

        // Certifications
        if (text.includes('certifié') || text.includes('agréé') || text.includes('qualibat')) {
          features.push('certifications');
        }

        // Avis clients
        if (document.querySelector('.stars, .rating, [class*="star"]')) {
          features.push('reviews');
        }

        return features;
      });

      result.features = features;

      await page.close();

      return result;

    } catch (error) {
      console.error('Error analyzing website:', error);
      throw error;
    }
  }

  async takeScreenshot(url: string): Promise<string> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    const page = await this.browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const screenshot = await page.screenshot({ 
      fullPage: false,
      type: 'png',
      encoding: 'base64'
    });
    
    await page.close();
    return screenshot as string;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
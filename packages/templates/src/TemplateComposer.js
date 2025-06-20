// Import blocks
import { heroSplitScreen, renderHeroSplitScreen } from './blocks/hero/split-screen';
import { heroCentered, renderHeroCentered } from './blocks/hero/centered';
import { servicesGridCards, renderServicesGridCards } from './blocks/services/grid-cards';
import { servicesListDetailed, renderServicesListDetailed } from './blocks/services/list-detailed';
import { contactFormMap, renderContactFormMap } from './blocks/contact/form-map';
import { testimonialsCarousel, renderTestimonialsCarousel } from './blocks/testimonials/carousel';
import { simpleHeader, renderSimpleHeader } from './blocks/layout/header';
import { simpleFooter, renderSimpleFooter } from './blocks/layout/footer';
import { textImageBlock, renderTextImageBlock } from './blocks/content/text-image';
import { featuresMultiStyle, renderFeaturesMultiStyle } from './blocks/features/features-multi-style';
import { galleryPortfolio, renderGalleryPortfolio } from './blocks/gallery/gallery-portfolio';
import { faqAccordion, renderFaqAccordion } from './blocks/faq/faq-accordion';
import { pricingTables, renderPricingTables } from './blocks/pricing/pricing-tables';
import { ctaSection, renderCtaSection } from './blocks/cta/cta-section';
// Import clean style blocks
import { textImageClean, renderTextImageClean } from './blocks/content/text-image-clean';
import { featuresClean, renderFeaturesClean } from './blocks/features/features-clean';
import { galleryClean, renderGalleryClean } from './blocks/gallery/gallery-clean';
import { faqClean, renderFaqClean } from './blocks/faq/faq-clean';
import { pricingClean, renderPricingClean } from './blocks/pricing/pricing-clean';
import { ctaClean, renderCtaClean } from './blocks/cta/cta-clean';
// Import variants
import { ultraProVariant, ultraProStyles } from './variants/ultra-pro';
import { premiumVariant, premiumStyles } from './variants/premium';
import { minimalVariant, minimalStyles } from './variants/minimal';
// Import page templates
import { landingPageTemplate, generateLandingPageBlocks } from './pages/landing';
import { multiPageTemplate, generateMultiPageStructure } from './pages/multi-page';
export class TemplateComposer {
    constructor() {
        this.blocks = new Map();
        this.renderers = new Map();
        this.variants = new Map();
        this.variantStyles = new Map();
        this.templates = new Map();
        this.registerBlocks();
        this.registerVariants();
        this.registerTemplates();
    }
    registerBlocks() {
        // Hero blocks
        this.blocks.set('hero-split-screen', heroSplitScreen);
        this.renderers.set('hero-split-screen', renderHeroSplitScreen);
        this.blocks.set('hero-centered', heroCentered);
        this.renderers.set('hero-centered', renderHeroCentered);
        // Service blocks
        this.blocks.set('services-grid-cards', servicesGridCards);
        this.renderers.set('services-grid-cards', renderServicesGridCards);
        this.blocks.set('services-list-detailed', servicesListDetailed);
        this.renderers.set('services-list-detailed', renderServicesListDetailed);
        // Contact blocks
        this.blocks.set('contact-form-map', contactFormMap);
        this.renderers.set('contact-form-map', renderContactFormMap);
        // Testimonial blocks
        this.blocks.set('testimonials-carousel', testimonialsCarousel);
        this.renderers.set('testimonials-carousel', renderTestimonialsCarousel);
        // Layout blocks
        this.blocks.set('simple-header', simpleHeader);
        this.renderers.set('simple-header', renderSimpleHeader);
        this.blocks.set('simple-footer', simpleFooter);
        this.renderers.set('simple-footer', renderSimpleFooter);
        // Content blocks
        this.blocks.set('text-image-flexible', textImageBlock);
        this.renderers.set('text-image-flexible', renderTextImageBlock);
        // Features blocks
        this.blocks.set('features-multi-style', featuresMultiStyle);
        this.renderers.set('features-multi-style', renderFeaturesMultiStyle);
        // Gallery blocks
        this.blocks.set('gallery-portfolio', galleryPortfolio);
        this.renderers.set('gallery-portfolio', renderGalleryPortfolio);
        // FAQ blocks
        this.blocks.set('faq-accordion', faqAccordion);
        this.renderers.set('faq-accordion', renderFaqAccordion);
        // Pricing blocks
        this.blocks.set('pricing-tables', pricingTables);
        this.renderers.set('pricing-tables', renderPricingTables);
        // CTA blocks
        this.blocks.set('cta-section', ctaSection);
        this.renderers.set('cta-section', renderCtaSection);
        // Clean style blocks
        this.blocks.set('text-image-clean', textImageClean);
        this.renderers.set('text-image-clean', renderTextImageClean);
        this.blocks.set('features-clean', featuresClean);
        this.renderers.set('features-clean', renderFeaturesClean);
        this.blocks.set('gallery-clean', galleryClean);
        this.renderers.set('gallery-clean', renderGalleryClean);
        this.blocks.set('faq-clean', faqClean);
        this.renderers.set('faq-clean', renderFaqClean);
        this.blocks.set('pricing-clean', pricingClean);
        this.renderers.set('pricing-clean', renderPricingClean);
        this.blocks.set('cta-clean', ctaClean);
        this.renderers.set('cta-clean', renderCtaClean);
    }
    registerVariants() {
        this.variants.set('ultra-pro', ultraProVariant);
        this.variantStyles.set('ultra-pro', ultraProStyles);
        this.variants.set('premium', premiumVariant);
        this.variantStyles.set('premium', premiumStyles);
        this.variants.set('minimal', minimalVariant);
        this.variantStyles.set('minimal', minimalStyles);
    }
    registerTemplates() {
        this.templates.set('landing-page', landingPageTemplate);
        this.templates.set('multi-page', multiPageTemplate);
    }
    getBlock(blockId) {
        return this.blocks.get(blockId);
    }
    getVariant(variantId) {
        return this.variants.get(variantId);
    }
    getTemplate(templateId) {
        return this.templates.get(templateId);
    }
    renderBlock(blockId, props, variants = []) {
        const renderer = this.renderers.get(blockId);
        if (!renderer) {
            console.error(`No renderer found for block: ${blockId}`);
            return null;
        }
        return renderer(props, variants);
    }
    composePage(config) {
        var _a;
        const variant = this.variants.get(config.variant);
        const variantStyles = this.variantStyles.get(config.variant) || '';
        if (!variant) {
            throw new Error(`Variant not found: ${config.variant}`);
        }
        let html = '';
        let css = variantStyles;
        let js = '';
        let criticalCSS = '';
        const dependencies = new Set();
        // Sort blocks by order
        const sortedBlocks = [...config.blocks].sort((a, b) => a.order - b.order);
        // Render each block
        for (const blockConfig of sortedBlocks) {
            const rendered = this.renderBlock(blockConfig.blockId, blockConfig.props, blockConfig.variants);
            if (rendered) {
                html += rendered.html + '\n';
                css += '\n' + rendered.css;
                if (rendered.js) {
                    js += '\n' + rendered.js;
                }
                if (rendered.criticalCSS) {
                    criticalCSS += '\n' + rendered.criticalCSS;
                }
                // Collect dependencies
                (_a = rendered.dependencies) === null || _a === void 0 ? void 0 : _a.forEach(dep => {
                    dependencies.add(JSON.stringify(dep));
                });
            }
        }
        // Add custom styles if provided
        if (config.customStyles) {
            css += '\n' + config.customStyles;
        }
        // Add base button styles
        css = this.getBaseStyles() + '\n' + css;
        criticalCSS = this.getBaseCriticalStyles() + '\n' + criticalCSS;
        return {
            html: this.wrapInLayout(html, variant),
            css: this.optimizeCSS(css),
            js: this.optimizeJS(js),
            criticalCSS: this.optimizeCSS(criticalCSS)
        };
    }
    getBaseStyles() {
        return `
      /* Base Reset and Typography */
      *, *::before, *::after {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      img {
        max-width: 100%;
        height: auto;
        display: block;
      }

      /* Base Button Styles */
      .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
        border: none;
        border-radius: var(--border-radius, 4px);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }

      .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      .btn-block {
        display: block;
        width: 100%;
      }

      /* Utility Classes */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    }
    getBaseCriticalStyles() {
        return `
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
      img { max-width: 100%; height: auto; }
      .btn { display: inline-block; padding: 0.75rem 1.5rem; text-decoration: none; cursor: pointer; }
    `;
    }
    wrapInLayout(content, _variant) {
        return `
      <main class="site-main" role="main">
        ${content}
      </main>
    `;
    }
    optimizeCSS(css) {
        // Remove empty rules and comments
        return css
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*{\s*/g, '{') // Remove space around {
            .replace(/\s*}\s*/g, '}') // Remove space around }
            .replace(/\s*:\s*/g, ':') // Remove space around :
            .replace(/\s*;\s*/g, ';') // Remove space around ;
            .replace(/;}}/g, '}}') // Remove last semicolon
            .trim();
    }
    optimizeJS(js) {
        if (!js)
            return '';
        // Wrap in IIFE to avoid global scope pollution
        return `(function(){${js.trim()}})();`;
    }
    // Helper methods for specific use cases
    generateLandingPage(config) {
        const blocks = generateLandingPageBlocks(config);
        return this.composePage({
            template: 'landing-page',
            variant: config.variant,
            blocks,
            customStyles: this.generateBusinessSpecificStyles(config)
        });
    }
    generateMultiPageSite(config) {
        const pages = generateMultiPageStructure(config);
        const results = new Map();
        for (const page of pages) {
            const pageContent = this.composePage({
                template: 'multi-page',
                variant: config.variant,
                blocks: page.blocks,
                customStyles: this.generateBusinessSpecificStyles(config)
            });
            results.set(page.slug, pageContent);
        }
        return results;
    }
    generateBusinessSpecificStyles(config) {
        let styles = '';
        if (config.colorScheme) {
            styles += `
        :root {
          --color-primary: ${config.colorScheme.primary};
          --color-secondary: ${config.colorScheme.secondary};
          --color-accent: ${config.colorScheme.accent};
        }
      `;
        }
        return styles;
    }
    // Export available blocks, variants, and templates
    getAvailableBlocks() {
        return Array.from(this.blocks.values());
    }
    getAvailableVariants() {
        return Array.from(this.variants.values());
    }
    getAvailableTemplates() {
        return Array.from(this.templates.values());
    }
}

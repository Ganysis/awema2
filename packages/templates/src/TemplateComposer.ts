import { 
  Template, 
  TemplateVariant, 
  RenderedBlock,
  Block
} from '@awema/shared';

// Import blocks
import { heroCentered, renderHeroCentered } from './blocks/hero/centered';
import { heroSplitScreen, renderHeroSplitScreen } from './blocks/hero/split-screen';
import { servicesGridCards, renderServicesGridCards } from './blocks/services/grid-cards';
import { servicesListDetailed, renderServicesListDetailed } from './blocks/services/list-detailed';
import { contactFormMap, renderContactFormMap } from './blocks/contact/form-map';
import { testimonialsCarousel, renderTestimonialsCarousel } from './blocks/testimonials/carousel';
import { textImageClean, renderTextImageClean } from './blocks/content/text-image-clean';
import { textImageBlock, renderTextImageBlock } from './blocks/content/text-image';
import { featuresClean, renderFeaturesClean } from './blocks/features/features-clean';
import { featuresMultiStyle, renderFeaturesMultiStyle } from './blocks/features/features-multi-style';
import { featuresIconGrid, renderFeaturesIconGrid } from './blocks/features/icon-grid';
import { galleryClean, renderGalleryClean } from './blocks/gallery/gallery-clean';
import { galleryPortfolio, renderGalleryPortfolio } from './blocks/gallery/gallery-portfolio';
import { galleryMasonry, renderGalleryMasonry } from './blocks/gallery/masonry';
import { faqAccordion, renderFaqAccordion } from './blocks/faq/faq-accordion';
import { faqClean, renderFaqClean } from './blocks/faq/faq-clean';
import { faqUltraModern, renderFaqUltraModern } from './blocks/faq/faq-ultra-modern';
import { pricingClean, renderPricingClean } from './blocks/pricing/pricing-clean';
import { pricingTables, renderPricingTables } from './blocks/pricing/pricing-tables';
import { ctaClean, renderCtaClean } from './blocks/cta/cta-clean';
import { ctaSection, renderCtaSection } from './blocks/cta/cta-section';
import { simpleFooter, renderSimpleFooter } from './blocks/layout/footer';
import { simpleHeader, renderSimpleHeader } from './blocks/layout/header';

// Import variants
import { ultraProVariant, ultraProStyles } from './variants/ultra-pro';
import { premiumVariant, premiumStyles } from './variants/premium';
import { minimalVariant, minimalStyles } from './variants/minimal';

// Import templates
import { landingPageTemplate } from './pages/landing';
import { multiPageTemplate } from './pages/multi-page';

export class TemplateComposer {
  private blocks: Map<string, Block>;
  private variants: Map<string, TemplateVariant>;
  private variantStyles: Map<string, string>; // Changed to Map<string, string>
  private templates: Map<string, Template>;

  constructor() {
    this.blocks = new Map();
    this.variants = new Map();
    this.variantStyles = new Map();
    this.templates = new Map();

    this.registerBlocks();
    this.registerVariants();
    this.registerTemplates();
  }

  private registerBlocks() {
    this.blocks.set('hero-centered', heroCentered);
    this.blocks.set('hero-split-screen', heroSplitScreen);
    this.blocks.set('services-grid-cards', servicesGridCards);
    this.blocks.set('services-list-detailed', servicesListDetailed);
    this.blocks.set('contact-form-map', contactFormMap);
    this.blocks.set('testimonials-carousel', testimonialsCarousel);
    this.blocks.set('text-image-clean', textImageClean);
    this.blocks.set('text-image-flexible', textImageBlock);
    this.blocks.set('features-clean', featuresClean);
    this.blocks.set('features-multi-style', featuresMultiStyle);
    this.blocks.set('features-icon-grid', featuresIconGrid);
    this.blocks.set('gallery-clean', galleryClean);
    this.blocks.set('gallery-portfolio', galleryPortfolio);
    this.blocks.set('gallery-masonry', galleryMasonry);
    this.blocks.set('faq-accordion', faqAccordion);
    this.blocks.set('faq-clean', faqClean);
    this.blocks.set('faq-ultra-modern', faqUltraModern);
    this.blocks.set('pricing-clean', pricingClean);
    this.blocks.set('pricing-tables', pricingTables);
    this.blocks.set('cta-clean', ctaClean);
    this.blocks.set('cta-section', ctaSection);
    this.blocks.set('simple-footer', simpleFooter);
    this.blocks.set('simple-header', simpleHeader);
  }

  private registerVariants() {
    this.variants.set('ultra-pro', ultraProVariant);
    this.variantStyles.set('ultra-pro', ultraProStyles);

    this.variants.set('premium', premiumVariant);
    this.variantStyles.set('premium', premiumStyles);

    this.variants.set('minimal', minimalVariant);
    this.variantStyles.set('minimal', minimalStyles);
  }

  private registerTemplates() {
    this.templates.set('landing-page', landingPageTemplate);
    this.templates.set('multi-page', multiPageTemplate);
  }

  public getBlock(blockId: string): Block | undefined {
    return this.blocks.get(blockId);
  }

  public getAllBlocks(): Block[] {
    return Array.from(this.blocks.values());
  }

  public getBlocksByCategory(category: string): Block[] {
    return this.getAllBlocks().filter(block => block.category === category);
  }

  public getVariant(variantId: string): TemplateVariant | undefined {
    return this.variants.get(variantId);
  }

  public getAllVariants(): TemplateVariant[] {
    return Array.from(this.variants.values());
  }

  public getTemplate(templateId: string): Template | undefined {
    return this.templates.get(templateId);
  }

  public getAllTemplates(): Template[] {
    return Array.from(this.templates.values());
  }

  public renderBlock(blockId: string, props: Record<string, any>, variants: string[] = []): RenderedBlock | null {
    const block = this.blocks.get(blockId);
    if (!block) {
      console.error(`Block not found: ${blockId}`);
      return null;
    }

    // Get the appropriate render function based on block ID
    let renderer;
    switch (blockId) {
      case 'hero-centered':
        renderer = renderHeroCentered;
        break;
      case 'hero-split-screen':
        renderer = renderHeroSplitScreen;
        break;
      case 'services-grid-cards':
        renderer = renderServicesGridCards;
        break;
      case 'services-list-detailed':
        renderer = renderServicesListDetailed;
        break;
      case 'contact-form-map':
        renderer = renderContactFormMap;
        break;
      case 'testimonials-carousel':
        renderer = renderTestimonialsCarousel;
        break;
      case 'text-image-clean':
        renderer = renderTextImageClean;
        break;
      case 'text-image-flexible':
        renderer = renderTextImageBlock;
        break;
      case 'features-clean':
        renderer = renderFeaturesClean;
        break;
      case 'features-multi-style':
        renderer = renderFeaturesMultiStyle;
        break;
      case 'features-icon-grid':
        renderer = renderFeaturesIconGrid;
        break;
      case 'gallery-clean':
        renderer = renderGalleryClean;
        break;
      case 'gallery-portfolio':
        renderer = renderGalleryPortfolio;
        break;
      case 'gallery-masonry':
        renderer = renderGalleryMasonry;
        break;
      case 'faq-accordion':
        renderer = renderFaqAccordion;
        break;
      case 'faq-clean':
        renderer = renderFaqClean;
        break;
      case 'faq-ultra-modern':
        renderer = renderFaqUltraModern;
        break;
      case 'pricing-clean':
        renderer = renderPricingClean;
        break;
      case 'pricing-tables':
        renderer = renderPricingTables;
        break;
      case 'cta-clean':
        renderer = renderCtaClean;
        break;
      case 'cta-section':
        renderer = renderCtaSection;
        break;
      case 'simple-footer':
        renderer = renderSimpleFooter;
        break;
      case 'simple-header':
        renderer = renderSimpleHeader;
        break;
      default:
        console.error(`No renderer found for block: ${blockId}`);
        return null;
    }

    try {
      const mergedProps = { ...block.props, ...props };
      return renderer(mergedProps, variants);
    } catch (error) {
      console.error(`Error rendering block ${blockId}:`, error);
      return null;
    }
  }

  public getVariantStyles(variantId: string): string {
    return this.variantStyles.get(variantId) || '';
  }

  public composePage(options: {
    template: string;
    variant: string;
    blocks: Array<{ blockId: string; order: number; props: Record<string, any>; variants: string[] }>;
    customStyles?: string;
  }): { html: string; css: string; js: string; criticalCSS: string } {
    const { blocks, variant, customStyles } = options;
    
    // Sort blocks by order
    const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
    
    // Render each block
    const renderedBlocks = sortedBlocks.map(block => {
      const rendered = this.renderBlock(block.blockId, block.props, [...block.variants, variant]);
      return rendered;
    }).filter(Boolean);
    
    // Combine HTML
    const html = renderedBlocks.map(block => block!.html).join('\n');
    
    // Get variant styles
    const variantCss = this.getVariantStyles(variant);
    
    // Combine CSS
    const css = [
      variantCss,
      ...renderedBlocks.map(block => block!.css || ''),
      customStyles || ''
    ].filter(Boolean).join('\n');
    
    // Combine JS
    const js = renderedBlocks
      .map(block => block!.js || '')
      .filter(Boolean)
      .join('\n');
    
    // For now, all CSS is critical
    const criticalCSS = css;
    
    return {
      html,
      css,
      js,
      criticalCSS
    };
  }
}
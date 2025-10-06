import { 
  Template, 
  TemplateVariant, 
  RenderedBlock,
  Block
} from '@awema/shared';

// Import blocks - Using stubs for missing blocks
import { stubBlock } from './blocks/stub';

// Stub definitions for missing blocks
const heroCentered = stubBlock;
const renderHeroCentered = () => stubBlock.render();
const heroSplitScreen = stubBlock;
const renderHeroSplitScreen = () => stubBlock.render();
const servicesGridCards = stubBlock;
const renderServicesGridCards = () => stubBlock.render();
const servicesListDetailed = stubBlock;
const renderServicesListDetailed = () => stubBlock.render();
const contactFormMap = stubBlock;
const renderContactFormMap = () => stubBlock.render();
const contactUltraModern = stubBlock;
const renderContactUltraModern = () => stubBlock.render();
const testimonialsCarousel = stubBlock;
const renderTestimonialsCarousel = () => stubBlock.render();
const textImageClean = stubBlock;
const renderTextImageClean = () => stubBlock.render();
const textImageBlock = stubBlock;
const renderTextImageBlock = () => stubBlock.render();
const featuresClean = stubBlock;
const renderFeaturesClean = () => stubBlock.render();
const featuresMultiStyle = stubBlock;
const renderFeaturesMultiStyle = () => stubBlock.render();
const featuresIconGrid = stubBlock;
const renderFeaturesIconGrid = () => stubBlock.render();
const processSteps = stubBlock;
const renderProcessSteps = () => stubBlock.render();
const statsNumbers = stubBlock;
const renderStatsNumbers = () => stubBlock.render();
const galleryClean = stubBlock;
const renderGalleryClean = () => stubBlock.render();
const galleryPortfolio = stubBlock;
const renderGalleryPortfolio = () => stubBlock.render();
const galleryMasonry = stubBlock;
const renderGalleryMasonry = () => stubBlock.render();
const beforeAfter = stubBlock;
const renderBeforeAfter = () => stubBlock.render();
const faqAccordion = stubBlock;
const renderFaqAccordion = () => stubBlock.render();
const faqClean = stubBlock;
const renderFaqClean = () => stubBlock.render();
const faqUltraModern = stubBlock;
const renderFaqUltraModern = () => stubBlock.render();
const pricingClean = stubBlock;
const renderPricingClean = () => stubBlock.render();
const pricingTables = stubBlock;
const renderPricingTables = () => stubBlock.render();
const ctaClean = stubBlock;
const renderCtaClean = () => stubBlock.render();
const ctaSection = stubBlock;
const renderCtaSection = () => stubBlock.render();
import { simpleFooter, renderSimpleFooter } from './blocks/layout/footer';
import { footerPro, renderFooterPro } from './blocks/layout/footer-pro';
import { simpleHeader, renderSimpleHeader } from './blocks/layout/header';
import { headerPro, renderHeaderPro } from './blocks/layout/header-pro';

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
    this.blocks.set('contact-ultra-modern', contactUltraModern);
    this.blocks.set('testimonials-carousel', testimonialsCarousel);
    this.blocks.set('text-image-clean', textImageClean);
    this.blocks.set('text-image-flexible', textImageBlock);
    this.blocks.set('features-clean', featuresClean);
    this.blocks.set('features-multi-style', featuresMultiStyle);
    this.blocks.set('features-icon-grid', featuresIconGrid);
    this.blocks.set('process-steps', processSteps);
    this.blocks.set('stats-numbers', statsNumbers);
    this.blocks.set('gallery-clean', galleryClean);
    this.blocks.set('gallery-portfolio', galleryPortfolio);
    this.blocks.set('gallery-masonry', galleryMasonry);
    this.blocks.set('before-after', beforeAfter);
    this.blocks.set('faq-accordion', faqAccordion);
    this.blocks.set('faq-clean', faqClean);
    this.blocks.set('faq-ultra-modern', faqUltraModern);
    this.blocks.set('pricing-clean', pricingClean);
    this.blocks.set('pricing-tables', pricingTables);
    this.blocks.set('cta-clean', ctaClean);
    this.blocks.set('cta-section', ctaSection);
    this.blocks.set('simple-footer', simpleFooter);
    this.blocks.set('footer-pro', footerPro);
    this.blocks.set('simple-header', simpleHeader);
    this.blocks.set('header-pro', headerPro);
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
      case 'contact-ultra-modern':
        renderer = renderContactUltraModern;
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
      case 'process-steps':
        renderer = renderProcessSteps;
        break;
      case 'stats-numbers':
        renderer = renderStatsNumbers;
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
      case 'before-after':
        renderer = renderBeforeAfter;
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
      case 'footer-pro':
        renderer = renderFooterPro;
        break;
      case 'simple-header':
        renderer = renderSimpleHeader;
        break;
      case 'header-pro':
        renderer = renderHeaderPro;
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
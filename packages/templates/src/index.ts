// @awema/templates entry point
export const version = '0.0.1';

// Export the main composer
export { TemplateComposer } from './TemplateComposer';

// Export blocks
export { heroCentered, renderHeroCentered } from './blocks/hero/centered';
export { heroSplitScreen, renderHeroSplitScreen } from './blocks/hero/split-screen';
export { servicesGridCards, renderServicesGridCards } from './blocks/services/grid-cards';
export { servicesListDetailed, renderServicesListDetailed } from './blocks/services/list-detailed';
export { contactFormMap, renderContactFormMap } from './blocks/contact/form-map';
export { testimonialsCarousel, renderTestimonialsCarousel } from './blocks/testimonials/carousel';
export { textImageClean, renderTextImageClean } from './blocks/content/text-image-clean';
export { textImageBlock, renderTextImageBlock } from './blocks/content/text-image';
export { featuresClean, renderFeaturesClean } from './blocks/features/features-clean';
export { featuresMultiStyle, renderFeaturesMultiStyle } from './blocks/features/features-multi-style';
export { featuresIconGrid, renderFeaturesIconGrid } from './blocks/features/icon-grid';
export { galleryClean, renderGalleryClean } from './blocks/gallery/gallery-clean';
export { galleryPortfolio, renderGalleryPortfolio } from './blocks/gallery/gallery-portfolio';
export { galleryMasonry, renderGalleryMasonry } from './blocks/gallery/masonry';
export { faqAccordion, renderFaqAccordion } from './blocks/faq/faq-accordion';
export { faqClean, renderFaqClean } from './blocks/faq/faq-clean';
export { faqUltraModern, renderFaqUltraModern } from './blocks/faq/faq-ultra-modern';
export { pricingClean, renderPricingClean } from './blocks/pricing/pricing-clean';
export { pricingTables, renderPricingTables } from './blocks/pricing/pricing-tables';
export { ctaClean, renderCtaClean } from './blocks/cta/cta-clean';
export { ctaSection, renderCtaSection } from './blocks/cta/cta-section';
export { simpleFooter, renderSimpleFooter } from './blocks/layout/footer';
export { simpleHeader, renderSimpleHeader } from './blocks/layout/header';

// Export utility generators
export { ColorGenerator } from './utils/color-generator';
export { TypographyGenerator } from './utils/typography-generator';
export { SpacingGenerator } from './utils/spacing-generator';

// Export utility functions
export { renderIcon } from './utils/icons';

// Export variants
export { ultraProVariant, ultraProStyles } from './variants/ultra-pro';
export { premiumVariant, premiumStyles } from './variants/premium';
export { minimalVariant, minimalStyles } from './variants/minimal';

// Export page templates
export { 
  landingPageTemplate, 
  generateLandingPageBlocks 
} from './pages/landing';

export type { LandingPageConfig } from './pages/landing';

export { 
  multiPageTemplate, 
  generateMultiPageStructure 
} from './pages/multi-page';

export type { MultiPageConfig, PageConfig } from './pages/multi-page';

// Re-export types from shared
export type {
  Block,
  BlockCategory,
  BlockVariant,
  RenderedBlock,
  Template,
  TemplateVariant,
  TemplateConfig,
  DefaultBlock
} from '@awema/shared';

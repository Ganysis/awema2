// @awema/templates entry point
export const version = '0.0.1';
// Export the main composer
export { TemplateComposer } from './TemplateComposer';
// Export blocks
export { heroSplitScreen, renderHeroSplitScreen } from './blocks/hero/split-screen';
export { heroCentered, renderHeroCentered } from './blocks/hero/centered';
export { servicesGridCards, renderServicesGridCards } from './blocks/services/grid-cards';
export { servicesListDetailed, renderServicesListDetailed } from './blocks/services/list-detailed';
export { contactFormMap, renderContactFormMap } from './blocks/contact/form-map';
export { testimonialsCarousel, renderTestimonialsCarousel } from './blocks/testimonials/carousel';
export { simpleHeader, renderSimpleHeader } from './blocks/layout/header';
export { simpleFooter, renderSimpleFooter } from './blocks/layout/footer';
export { textImageBlock, renderTextImageBlock } from './blocks/content/text-image';
export { featuresMultiStyle, renderFeaturesMultiStyle } from './blocks/features/features-multi-style';
export { galleryPortfolio, renderGalleryPortfolio } from './blocks/gallery/gallery-portfolio';
export { faqAccordion, renderFaqAccordion } from './blocks/faq/faq-accordion';
export { pricingTables, renderPricingTables } from './blocks/pricing/pricing-tables';
export { ctaSection, renderCtaSection } from './blocks/cta/cta-section';
// Export clean style blocks
export { textImageClean, renderTextImageClean } from './blocks/content/text-image-clean';
export { featuresClean, renderFeaturesClean } from './blocks/features/features-clean';
export { galleryClean, renderGalleryClean } from './blocks/gallery/gallery-clean';
export { faqClean, renderFaqClean } from './blocks/faq/faq-clean';
export { pricingClean, renderPricingClean } from './blocks/pricing/pricing-clean';
export { ctaClean, renderCtaClean } from './blocks/cta/cta-clean';
// Export additional blocks
export { featuresIconGrid, renderFeaturesIconGrid } from './blocks/features/icon-grid';
export { galleryMasonry, renderGalleryMasonry } from './blocks/gallery/masonry';
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
export { landingPageTemplate, generateLandingPageBlocks } from './pages/landing';
export { multiPageTemplate, generateMultiPageStructure } from './pages/multi-page';

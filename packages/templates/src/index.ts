// @awema/templates entry point
export const version = '0.0.1';

// Export the main composer
export { TemplateComposer } from './TemplateComposer';

// Export ONLY Header and Footer blocks
export { simpleFooter, renderSimpleFooter } from './blocks/layout/footer';
export { footerPro, renderFooterPro } from './blocks/layout/footer-pro';
export { footerUltraModern, renderFooterUltraModern } from './blocks/layout/footer-ultra-modern';
export { simpleHeader, renderSimpleHeader } from './blocks/layout/header';
export { headerPro, renderHeaderPro } from './blocks/layout/header-pro';
export { headerUltraModern, renderHeaderUltraModern } from './blocks/layout/header-ultra-modern';

// Export utility generators
export { ColorGenerator, type ColorScheme } from './utils/color-generator';
export { TypographyGenerator, type TypographySystem } from './utils/typography-generator';
export { SpacingGenerator, type LayoutSystem } from './utils/spacing-generator';

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
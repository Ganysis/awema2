import {
  // Header et Footer uniquement
  simpleFooter,
  renderSimpleFooter,
  footerPro,
  renderFooterPro,
  simpleHeader,
  renderSimpleHeader,
  headerPro,
  renderHeaderPro,
  headerUltraModern,
  footerUltraModern,
  
  // Types
  type Block
} from '@awema/templates';

// Import des renderers Ultra-Modern locaux
import { renderHeaderUltraModern } from './ultra-modern/header-ultra-modern-renderer';
import { renderFooterUltraModern } from './ultra-modern/footer-ultra-modern-renderer';
import { useEditorStore } from '@/lib/store/editor-store';
import { BlockCategory } from '@awema/shared';

// Import des renderers V3 Perfect Enhanced
import { HeroRendererV3PerfectEnhanced } from '../v3/renderers/hero-perfect-enhanced.renderer';
import { FeaturesRendererV3PerfectEnhanced } from '../v3/renderers/features-perfect-enhanced.renderer';
import { ServicesRendererV3PerfectEnhanced } from '../v3/renderers/services-perfect-enhanced.renderer';
import { GalleryRendererV3Supreme } from '../v3/renderers/gallery-v3-supreme.renderer';
import { ContentRendererV3Supreme as ContentRendererV3PerfectEnhanced } from '../v3/renderers/content-v3-supreme.renderer';
import { TestimonialsRendererV3PerfectEnhanced } from '../v3/renderers/testimonials-perfect-enhanced.renderer';
import { PricingRendererV3PerfectEnhanced } from '../v3/renderers/pricing-perfect-enhanced.renderer';
import { FAQRendererV3PerfectEnhanced } from '../v3/renderers/faq-perfect-enhanced.renderer';
import { CTARendererV3PerfectEnhanced } from '../v3/renderers/cta-perfect-enhanced.renderer';
import { ContactRendererV3PerfectEnhanced } from '../v3/renderers/contact-perfect-enhanced.renderer';
import { HeaderPerfectEnhancedRenderer } from '../v3/renderers/header-perfect-enhanced.renderer';
import { FooterRendererV3PerfectEnhanced } from '../v3/renderers/footer-perfect-enhanced.renderer';

// Créer les instances V3
const heroV3 = new HeroRendererV3PerfectEnhanced();
const featuresV3 = new FeaturesRendererV3PerfectEnhanced();
const servicesV3 = new ServicesRendererV3PerfectEnhanced();
const galleryV3 = new GalleryRendererV3Supreme();
const contentV3 = new ContentRendererV3PerfectEnhanced();
const testimonialsV3 = new TestimonialsRendererV3PerfectEnhanced();
const pricingV3 = new PricingRendererV3PerfectEnhanced();
const faqV3 = new FAQRendererV3PerfectEnhanced();
const ctaV3 = new CTARendererV3PerfectEnhanced();
const contactV3 = new ContactRendererV3PerfectEnhanced();
const headerV3 = new HeaderPerfectEnhancedRenderer();
const footerV3 = new FooterRendererV3PerfectEnhanced();

// Créer les wrappers pour les renderers V3
const renderHeroV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return heroV3.render(props, context);
};

const renderFeaturesV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return featuresV3.render(props, context);
};

const renderServicesV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return servicesV3.render(props, context);
};

const renderGalleryV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return galleryV3.render(props, context);
};

const renderContentV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return contentV3.render(props, context);
};

const renderTestimonialsV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return testimonialsV3.render(props, context);
};

const renderPricingV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return pricingV3.render(props, context);
};

const renderFAQV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return faqV3.render(props, context);
};

const renderCTAV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return ctaV3.render(props, context);
};

const renderContactV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return contactV3.render(props, context);
};

const renderHeaderV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return headerV3.render(props, context);
};

const renderFooterV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  return footerV3.render(props, context);
};

// Créer les blocs V3 pour le registry
const headerV3Perfect: Block = {
  id: 'header-v3-perfect',
  name: 'Header V3 Perfect',
  category: 'header',
  description: '8 variantes modernes avec mega menu et animations',
  tags: ['v3', 'header', 'modern', 'navigation'],
  get props() { return headerV3.getBlockProps(); },
  variants: [],
  defaultProps: headerV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'low' as any
};

const heroV3Perfect: Block = {
  id: 'hero-v3-perfect',
  name: 'Hero V3 Perfect',
  category: 'hero',
  description: '8 variantes spectaculaires avec animations 3D',
  tags: ['v3', 'hero', 'modern', 'animated'],
  get props() { return heroV3.getBlockProps(); },
  variants: [],
  defaultProps: heroV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const featuresV3Perfect: Block = {
  id: 'features-v3-perfect',
  name: 'Features V3 Perfect',
  category: 'features',
  description: '6 layouts innovants avec animations',
  tags: ['v3', 'features', 'modern', 'animated'],
  get props() { return featuresV3.getBlockProps(); },
  variants: [],
  defaultProps: featuresV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const servicesV3Perfect: Block = {
  id: 'services-v3-perfect',
  name: 'Services V3 Perfect',
  category: 'services',
  description: '8 designs avec comparaisons et calculateur',
  tags: ['v3', 'services', 'modern', 'interactive'],
  get props() { return servicesV3.getBlockProps(); },
  variants: [],
  defaultProps: servicesV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const galleryV3Perfect: Block = {
  id: 'gallery-v3-perfect',
  name: 'Gallery V3 Perfect',
  category: 'gallery',
  description: '8 layouts + lightbox 5 styles + zoom 10x',
  tags: ['v3', 'gallery', 'modern', 'interactive'],
  get props() { return galleryV3.getBlockProps(); },
  variants: [],
  defaultProps: galleryV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const contentV3Perfect: Block = {
  id: 'content-v3-perfect',
  name: 'Content V3 Perfect',
  category: 'content',
  description: '8 formats avec table des matières auto',
  tags: ['v3', 'content', 'modern', 'rich'],
  get props() { return contentV3.getBlockProps(); },
  variants: [],
  defaultProps: contentV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'low' as any
};

const testimonialsV3Perfect: Block = {
  id: 'testimonials-v3-perfect',
  name: 'Testimonials V3 Perfect',
  category: 'testimonials',
  description: 'Intégrations Google/Trustpilot + vidéos',
  tags: ['v3', 'testimonials', 'modern', 'social'],
  get props() { return testimonialsV3.getBlockProps(); },
  variants: [],
  defaultProps: testimonialsV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const pricingV3Perfect: Block = {
  id: 'pricing-v3-perfect',
  name: 'Pricing V3 Perfect',
  category: 'pricing',
  description: 'Toggle période + calculateur + 8 variantes',
  tags: ['v3', 'pricing', 'modern', 'interactive'],
  get props() { return pricingV3.getBlockProps(); },
  variants: [],
  defaultProps: pricingV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'low' as any
};

const faqV3Perfect: Block = {
  id: 'faq-v3-perfect',
  name: 'FAQ V3 Perfect',
  category: 'faq',
  description: 'Recherche + chatbot simulé + 8 styles',
  tags: ['v3', 'faq', 'modern', 'interactive'],
  get props() { return faqV3.getBlockProps(); },
  variants: [],
  defaultProps: faqV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'low' as any
};

const ctaV3Perfect: Block = {
  id: 'cta-v3-perfect',
  name: 'CTA V3 Perfect',
  category: 'cta',
  description: 'Countdown + confetti + sons + animations',
  tags: ['v3', 'cta', 'modern', 'animated'],
  get props() { return ctaV3.getBlockProps(); },
  variants: [],
  defaultProps: ctaV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const contactV3Perfect: Block = {
  id: 'contact-v3-perfect',
  name: 'Contact V3 Perfect',
  category: 'contact',
  description: 'Validation temps réel + map + webhooks',
  tags: ['v3', 'contact', 'modern', 'form'],
  get props() { return contactV3.getBlockProps(); },
  variants: [],
  defaultProps: contactV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
};

const footerV3Perfect: Block = {
  id: 'footer-v3-perfect',
  name: 'Footer V3 Perfect',
  category: 'footer',
  description: '8 variantes avec widgets dynamiques et animations',
  tags: ['v3', 'footer', 'modern', 'widgets'],
  get props() { return footerV3.getBlockProps(); },
  variants: [],
  defaultProps: footerV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'low' as any
};

// Map template block categories to shared BlockCategory enum
const categoryMap: Record<string, BlockCategory> = {
  'hero': BlockCategory.HERO,
  'header': BlockCategory.HEADER,
  'services': BlockCategory.FEATURES,
  'contact': BlockCategory.CONTACT,
  'testimonials': BlockCategory.TESTIMONIALS,
  'footer': BlockCategory.FOOTER,
  'content': BlockCategory.CONTENT,
  'features': BlockCategory.FEATURES,
  'gallery': BlockCategory.GALLERY,
  'faq': BlockCategory.FAQ,
  'pricing': BlockCategory.PRICING,
  'cta': BlockCategory.CTA,
};

export interface BlockDefinition {
  block: Block;
  category: BlockCategory;
  name: string;
  description: string;
  thumbnail?: string;
}

// Define all available blocks with metadata - ONLY V3 + Header/Footer
export const blockRegistry: BlockDefinition[] = [
  // HEADER BLOCKS
  {
    block: simpleHeader,
    category: BlockCategory.HEADER,
    name: 'Header Simple',
    description: 'En-tête simple avec logo et navigation',
  },
  {
    block: headerPro,
    category: BlockCategory.HEADER,
    name: 'Header Professionnel',
    description: 'En-tête professionnel avec navigation complète et sous-menus',
  },
  {
    block: headerUltraModern,
    category: BlockCategory.HEADER,
    name: 'Header Ultra-Moderne',
    description: 'En-tête ultra-moderne avec 8 variantes visuelles, mega menus et fonctionnalités avancées',
  },
  {
    block: headerV3Perfect,
    category: BlockCategory.HEADER,
    name: '🎨 Header V3 PERFECT',
    description: '8 variantes (Modern, Minimal, Bold, Elegant, Corporate, Creative, Tech, Classic) avec mega menu, sticky avancé, dark mode, recherche, et animations',
  },
  
  // V3 PERFECT BLOCKS
  {
    block: heroV3Perfect,
    category: BlockCategory.HERO,
    name: '🚀 Hero V3 PERFECT',
    description: '8 variantes spectaculaires avec animations 3D, particles, vidéos - ZERO erreur garanti',
  },
  {
    block: featuresV3Perfect,
    category: BlockCategory.FEATURES,
    name: '✨ Features V3 PERFECT',
    description: '6 layouts innovants (Bento, 3D Carousel, Timeline) - Validation Zod stricte',
  },
  {
    block: servicesV3Perfect,
    category: BlockCategory.FEATURES,
    name: '🛠️ Services V3 PERFECT',
    description: '8 designs (Hexagon, Map, 3D Cards) avec comparaisons et calculateur - 100% fiable',
  },
  {
    block: galleryV3Perfect,
    category: BlockCategory.GALLERY,
    name: '🖼️ Gallery V3 PERFECT',
    description: '8 layouts (Masonry, 3D Flip, Polaroid) + lightbox 5 styles + zoom 10x',
  },
  {
    block: contentV3Perfect,
    category: BlockCategory.CONTENT,
    name: '📝 Content V3 PERFECT',
    description: '8 formats (Magazine, Timeline, Interactive) avec table des matières auto',
  },
  {
    block: testimonialsV3Perfect,
    category: BlockCategory.TESTIMONIALS,
    name: '💬 Testimonials V3 PERFECT',
    description: '8 designs + intégrations Google/Trustpilot + vidéos + map interactive',
  },
  {
    block: pricingV3Perfect,
    category: BlockCategory.PRICING,
    name: '💰 Pricing V3 PERFECT',
    description: '8 variantes (Slider, Flip, Neumorphic) + toggle période + calculateur',
  },
  {
    block: faqV3Perfect,
    category: BlockCategory.FAQ,
    name: '❓ FAQ V3 PERFECT',
    description: '8 styles (Chat, Bubbles, Video) + recherche + chatbot simulé',
  },
  {
    block: ctaV3Perfect,
    category: BlockCategory.CTA,
    name: '🎯 CTA V3 PERFECT',
    description: '8 designs spectaculaires + countdown + confetti + sons + boutons magnétiques',
  },
  {
    block: contactV3Perfect,
    category: BlockCategory.CONTACT,
    name: '📞 Contact V3 PERFECT',
    description: '8 interfaces (Chat, Map Full, Glass) + validation temps réel + webhooks',
  },
  
  // FOOTER BLOCKS
  {
    block: simpleFooter,
    category: BlockCategory.FOOTER,
    name: 'Footer Simple',
    description: 'Pied de page simple avec informations de contact',
  },
  {
    block: footerPro,
    category: BlockCategory.FOOTER,
    name: 'Footer Professionnel',
    description: 'Pied de page professionnel avec liens services, mentions légales et crédit Awema',
  },
  {
    block: footerUltraModern,
    category: BlockCategory.FOOTER,
    name: 'Footer Ultra-Moderne',
    description: 'Pied de page ultra-moderne avec 8 variantes, widgets dynamiques et intégrations avancées',
  },
  {
    block: footerV3Perfect,
    category: BlockCategory.FOOTER,
    name: '🦶 Footer V3 PERFECT',
    description: '8 variantes (Waves, Gradient, Split, Centered, Dark, Floating, Geometric, Organic) avec widgets dynamiques, newsletter avancée, et animations',
  },
].filter(def => def && def.block);

// Helper functions
export function getBlocksByCategory(category: BlockCategory): BlockDefinition[] {
  return blockRegistry.filter(def => def && def.block && def.category === category);
}

export function getBlockById(id: string): BlockDefinition | undefined {
  return blockRegistry.find(def => def && def.block && def.block.id === id);
}

export function getAllCategories(): BlockCategory[] {
  const categories = new Set(blockRegistry.map(def => def.category));
  return Array.from(categories);
}

// Map of block IDs to their render functions - ONLY V3 + Header/Footer
const renderFunctions: Record<string, any> = {
  // Header
  'simple-header': renderSimpleHeader,
  'header-pro': renderHeaderPro,
  'header-ultra-modern': renderHeaderUltraModern,
  'header-v3-perfect': renderHeaderV3Perfect,
  
  // V3 PERFECT renderers
  'hero-v3-perfect': renderHeroV3Perfect,
  'features-v3-perfect': renderFeaturesV3Perfect,
  'services-v3-perfect': renderServicesV3Perfect,
  'gallery-v3-perfect': renderGalleryV3Perfect,
  'content-v3-perfect': renderContentV3Perfect,
  'testimonials-v3-perfect': renderTestimonialsV3Perfect,
  'pricing-v3-perfect': renderPricingV3Perfect,
  'faq-v3-perfect': renderFAQV3Perfect,
  'cta-v3-perfect': renderCTAV3Perfect,
  'contact-v3-perfect': renderContactV3Perfect,
  
  // Footer
  'simple-footer': renderSimpleFooter,
  'footer-pro': renderFooterPro,
  'footer-ultra-modern': renderFooterUltraModern,
  'footer-v3-perfect': renderFooterV3Perfect,
};

export function getBlockRenderFunction(blockId: string): ((props: any, variants?: string[], isExport?: boolean) => any) | undefined {
  return renderFunctions[blockId];
}
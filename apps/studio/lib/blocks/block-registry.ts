import {
  // Hero blocks
  heroSplitScreen,
  heroCentered,
  renderHeroSplitScreen,
  renderHeroCentered,
  
  // Services blocks
  servicesGridCards,
  servicesListDetailed,
  renderServicesGridCards,
  renderServicesListDetailed,
  
  // Contact blocks
  contactFormMap,
  renderContactFormMap,
  
  // Testimonials blocks
  testimonialsCarousel,
  renderTestimonialsCarousel,
  
  // Layout blocks
  simpleHeader,
  renderSimpleHeader,
  simpleFooter,
  renderSimpleFooter,
  
  // Content blocks
  textImageBlock,
  renderTextImageBlock,
  
  // Features blocks
  featuresMultiStyle,
  renderFeaturesMultiStyle,
  
  // Gallery blocks
  galleryPortfolio,
  renderGalleryPortfolio,
  
  // FAQ blocks
  faqAccordion,
  renderFaqAccordion,
  
  // Pricing blocks
  pricingTables,
  renderPricingTables,
  
  // CTA blocks
  ctaSection,
  renderCtaSection,
  
  // Types
  type Block
} from '@awema/templates';
import { BlockCategory } from '@awema/shared';

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
};

export interface BlockDefinition {
  block: Block;
  category: BlockCategory;
  name: string;
  description: string;
  thumbnail?: string;
}

// Define all available blocks with metadata
export const blockRegistry: BlockDefinition[] = [
  // Hero blocks
  {
    block: heroSplitScreen,
    category: BlockCategory.HERO,
    name: 'Split Screen Hero',
    description: 'Hero section with content on one side and image on the other',
  },
  {
    block: heroCentered,
    category: BlockCategory.HERO,
    name: 'Centered Hero',
    description: 'Centered hero section with title, subtitle and CTA',
  },
  
  // Services blocks
  {
    block: servicesGridCards,
    category: BlockCategory.FEATURES,
    name: 'Services Grid',
    description: 'Grid layout for displaying services with cards',
  },
  {
    block: servicesListDetailed,
    category: BlockCategory.FEATURES,
    name: 'Services List',
    description: 'Detailed list view of services',
  },
  
  // Contact blocks
  {
    block: contactFormMap,
    category: BlockCategory.CONTACT,
    name: 'Contact Form with Map',
    description: 'Contact form alongside location map',
  },
  
  // Testimonials blocks
  {
    block: testimonialsCarousel,
    category: BlockCategory.TESTIMONIALS,
    name: 'Testimonials Carousel',
    description: 'Rotating testimonials display',
  },
  
  // Layout blocks
  {
    block: simpleHeader,
    category: BlockCategory.HEADER,
    name: 'Header Simple',
    description: 'En-tête simple avec logo et navigation',
  },
  {
    block: simpleFooter,
    category: BlockCategory.FOOTER,
    name: 'Footer Simple',
    description: 'Pied de page simple avec informations de contact',
  },
  
  // Content blocks
  {
    block: textImageBlock,
    category: BlockCategory.CONTENT,
    name: 'Texte & Image Flexible',
    description: 'Section avec texte et image, multiples layouts disponibles',
  },
  
  // Features blocks
  {
    block: featuresMultiStyle,
    category: BlockCategory.FEATURES,
    name: 'Points Forts Multi-Styles',
    description: 'Avantages et points forts avec 10+ styles de présentation',
  },
  
  // Gallery blocks
  {
    block: galleryPortfolio,
    category: BlockCategory.GALLERY,
    name: 'Galerie Portfolio',
    description: 'Galerie photos avec lightbox et multiples layouts',
  },
  
  // FAQ blocks
  {
    block: faqAccordion,
    category: BlockCategory.FAQ,
    name: 'FAQ Accordéon',
    description: 'Questions fréquentes avec 8 styles différents',
  },
  
  // Pricing blocks
  {
    block: pricingTables,
    category: BlockCategory.PRICING,
    name: 'Tables de Prix',
    description: 'Tarifs avec 8 présentations différentes',
  },
  
  // CTA blocks
  {
    block: ctaSection,
    category: BlockCategory.CTA,
    name: 'Call to Action',
    description: 'Appel à l\'action avec 10 variantes',
  },
];

// Helper functions
export function getBlocksByCategory(category: BlockCategory): BlockDefinition[] {
  return blockRegistry.filter(def => def.category === category);
}

export function getBlockById(id: string): BlockDefinition | undefined {
  return blockRegistry.find(def => def.block.id === id);
}

export function getAllCategories(): BlockCategory[] {
  const categories = new Set(blockRegistry.map(def => def.category));
  return Array.from(categories);
}

// Map of block IDs to their render functions
const renderFunctions: Record<string, any> = {
  'hero-split-screen': renderHeroSplitScreen,
  'hero-centered': renderHeroCentered,
  'services-grid-cards': renderServicesGridCards,
  'services-list-detailed': renderServicesListDetailed,
  'contact-form-map': renderContactFormMap,
  'testimonials-carousel': renderTestimonialsCarousel,
  'simple-header': renderSimpleHeader,
  'simple-footer': renderSimpleFooter,
  'text-image-flexible': renderTextImageBlock,
  'features-multi-style': renderFeaturesMultiStyle,
  'gallery-portfolio': renderGalleryPortfolio,
  'faq-accordion': renderFaqAccordion,
  'pricing-tables': renderPricingTables,
  'cta-section': renderCtaSection,
};

export function getBlockRenderFunction(blockId: string): ((props: any, variants?: string[]) => any) | undefined {
  return renderFunctions[blockId];
}
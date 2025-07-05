import {
  heroCentered,
  renderHeroCentered,
  heroSplitScreen,
  renderHeroSplitScreen,
  heroUltraModern,
  renderHeroUltraModern,
  servicesGridCards,
  renderServicesGridCards,
  servicesListDetailed,
  renderServicesListDetailed,
  contactFormMap,
  renderContactFormMap,
  contactUltraModern,
  renderContactUltraModern,
  testimonialsCarousel,
  renderTestimonialsCarousel,
  textImageClean,
  renderTextImageClean,
  textImageBlock,
  renderTextImageBlock,
  contentUltraModern,
  renderContentUltraModern,
  featuresClean,
  renderFeaturesClean,
  featuresMultiStyle,
  renderFeaturesMultiStyle,
  featuresIconGrid,
  renderFeaturesIconGrid,
  processSteps,
  renderProcessSteps,
  statsNumbers,
  renderStatsNumbers,
  galleryClean,
  renderGalleryClean,
  galleryPortfolio,
  renderGalleryPortfolio,
  galleryMasonry,
  renderGalleryMasonry,
  beforeAfter,
  renderBeforeAfter,
  faqAccordion,
  renderFaqAccordion,
  faqClean,
  renderFaqClean,
  faqUltraModern,
  renderFaqUltraModern,
  pricingClean,
  renderPricingClean,
  pricingTables,
  renderPricingTables,
  ctaClean,
  renderCtaClean,
  ctaSection,
  renderCtaSection,
  ctaUltraModern,
  renderCtaUltraModern,
  simpleFooter,
  renderSimpleFooter,
  footerPro,
  renderFooterPro,
  simpleHeader,
  renderSimpleHeader,
  headerPro,
  renderHeaderPro,
  reviewsBlock,
  renderReviews,
  
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
  {
    block: heroCentered,
    category: BlockCategory.HERO,
    name: 'Centered Hero',
    description: 'Centered hero section with background options',
  },
  {
    block: heroSplitScreen,
    category: BlockCategory.HERO,
    name: 'Split Screen Hero',
    description: 'Hero section with content on left and image on right',
  },
  {
    block: heroUltraModern,
    category: BlockCategory.HERO,
    name: 'Hero Ultra-Moderne',
    description: 'Section héro avec animations 3D, vidéo background et 8 designs époustouflants',
  },
  {
    block: servicesGridCards,
    category: BlockCategory.FEATURES,
    name: 'Services Grid Cards',
    description: 'Display services in a responsive grid layout with cards',
  },
  {
    block: servicesListDetailed,
    category: BlockCategory.FEATURES,
    name: 'Services Detailed List',
    description: 'Display services in a detailed list format with images',
  },
  {
    block: contactFormMap,
    category: BlockCategory.CONTACT,
    name: 'Contact Form with Map',
    description: 'Contact section with form and optional map',
  },
  {
    block: contactUltraModern,
    category: BlockCategory.CONTACT,
    name: 'Contact Ultra-Moderne',
    description: 'Formulaire de contact avec 8 designs magnifiques et configuration simple',
  },
  {
    block: testimonialsCarousel,
    category: BlockCategory.TESTIMONIALS,
    name: 'Testimonials Carousel',
    description: 'Display customer testimonials in a carousel',
  },
  {
    block: textImageClean,
    category: BlockCategory.CONTENT,
    name: 'Texte & Image',
    description: 'Section avec texte et image côte à côte',
  },
  {
    block: textImageBlock,
    category: BlockCategory.CONTENT,
    name: 'Texte & Image',
    description: 'Section flexible avec texte et image (multiple layouts)',
  },
  {
    block: contentUltraModern,
    category: BlockCategory.CONTENT,
    name: 'Content Ultra-Moderne',
    description: 'Section de contenu avec 8 designs magnifiques, typographie animée et fonctionnalités avancées',
  },
  {
    block: featuresClean,
    category: BlockCategory.FEATURES,
    name: 'Points Forts',
    description: 'Grille de points forts avec icônes',
  },
  {
    block: featuresMultiStyle,
    category: BlockCategory.FEATURES,
    name: 'Points Forts / Avantages',
    description: 'Section avantages avec multiples styles de présentation',
  },
  {
    block: featuresIconGrid,
    category: BlockCategory.FEATURES,
    name: 'Icon Grid Features',
    description: 'Grid layout with icons and feature descriptions',
  },
  {
    block: processSteps,
    category: BlockCategory.FEATURES,
    name: 'Processus / Étapes',
    description: 'Présentation des étapes de votre processus de travail',
  },
  {
    block: statsNumbers,
    category: BlockCategory.FEATURES,
    name: 'Statistiques / Chiffres',
    description: 'Chiffres clés et statistiques avec animations',
  },
  {
    block: galleryClean,
    category: BlockCategory.GALLERY,
    name: 'Galerie Photos',
    description: 'Galerie d\'images avec lightbox',
  },
  {
    block: galleryPortfolio,
    category: BlockCategory.GALLERY,
    name: 'Galerie / Portfolio',
    description: 'Galerie photos avec multiples layouts pour présenter les réalisations',
  },
  {
    block: galleryMasonry,
    category: BlockCategory.GALLERY,
    name: 'Masonry Gallery',
    description: 'Pinterest-style masonry gallery with filtering',
  },
  {
    block: beforeAfter,
    category: BlockCategory.GALLERY,
    name: 'Avant/Après',
    description: 'Comparaison interactive avant/après pour montrer vos réalisations',
  },
  {
    block: faqAccordion,
    category: BlockCategory.FAQ,
    name: 'FAQ / Questions Fréquentes',
    description: 'Section FAQ avec accordéon et multiples styles',
  },
  {
    block: faqClean,
    category: BlockCategory.FAQ,
    name: 'FAQ',
    description: 'Questions fréquemment posées avec accordéon',
  },
  {
    block: faqUltraModern,
    category: BlockCategory.FAQ,
    name: 'FAQ Ultra-Moderne',
    description: 'Système FAQ révolutionnaire avec 8 variantes ultra-modernes et fonctionnalités avancées',
  },
  {
    block: pricingClean,
    category: BlockCategory.PRICING,
    name: 'Tarifs',
    description: 'Grille de tarifs professionnelle',
  },
  {
    block: pricingTables,
    category: BlockCategory.PRICING,
    name: 'Tarifs / Prix',
    description: 'Tables de prix avec multiples styles de présentation',
  },
  {
    block: ctaClean,
    category: BlockCategory.CTA,
    name: 'Appel à Action',
    description: 'Section d\'appel à l\'action professionnelle',
  },
  {
    block: ctaSection,
    category: BlockCategory.CTA,
    name: 'Call to Action',
    description: 'Section d\'appel à l\'action avec multiples variantes',
  },
  {
    block: ctaUltraModern,
    category: BlockCategory.CTA,
    name: 'CTA Ultra-Moderne',
    description: 'Appel à l\'action avec 8 designs magnifiques et animations avancées',
  },
  {
    block: simpleFooter,
    category: BlockCategory.CONTENT,
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
    block: simpleHeader,
    category: BlockCategory.CONTENT,
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
    block: reviewsBlock,
    category: BlockCategory.TESTIMONIALS,
    name: 'Avis clients',
    description: 'Affichage des avis clients avec notation et schema.org pour SEO',
  },
].filter(def => def && def.block); // Filter out any invalid entries

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

// Map of block IDs to their render functions
const renderFunctions: Record<string, any> = {
  'hero-centered': renderHeroCentered,
  'hero-split-screen': renderHeroSplitScreen,
  'hero-ultra-modern': renderHeroUltraModern,
  'services-grid-cards': renderServicesGridCards,
  'services-list-detailed': renderServicesListDetailed,
  'contact-form-map': renderContactFormMap,
  'contact-ultra-modern': renderContactUltraModern,
  'testimonials-carousel': renderTestimonialsCarousel,
  'text-image-clean': renderTextImageClean,
  'text-image-flexible': renderTextImageBlock,
  'content-ultra-modern': renderContentUltraModern,
  'features-clean': renderFeaturesClean,
  'features-multi-style': renderFeaturesMultiStyle,
  'features-icon-grid': renderFeaturesIconGrid,
  'process-steps': renderProcessSteps,
  'stats-numbers': renderStatsNumbers,
  'gallery-clean': renderGalleryClean,
  'gallery-portfolio': renderGalleryPortfolio,
  'gallery-masonry': renderGalleryMasonry,
  'before-after': renderBeforeAfter,
  'faq-accordion': renderFaqAccordion,
  'faq-clean': renderFaqClean,
  'faq-ultra-modern': renderFaqUltraModern,
  'pricing-clean': renderPricingClean,
  'pricing-tables': renderPricingTables,
  'cta-clean': renderCtaClean,
  'cta-section': renderCtaSection,
  'cta-ultra-modern': renderCtaUltraModern,
  'simple-footer': renderSimpleFooter,
  'footer-pro': renderFooterPro,
  'simple-header': renderSimpleHeader,
  'header-pro': renderHeaderPro,
  'reviews': renderReviews,
};

export function getBlockRenderFunction(blockId: string): ((props: any, variants?: string[]) => any) | undefined {
  return renderFunctions[blockId];
}
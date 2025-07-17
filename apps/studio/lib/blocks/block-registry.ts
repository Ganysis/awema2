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
  servicesUltraModern,
  renderServicesUltraModern,
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
  pricingUltraModern,
  renderPricingUltraModern,
  pricingUltraModernSimple,
  renderPricingUltraModernSimple,
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
  reviewsUltraModern,
  renderReviewsUltraModern,
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

// Import des renderers V3 Perfect
import { HeroRendererV3Perfect } from '../v3/renderers/hero-perfect.renderer';
import { HeroRendererV3PerfectEnhanced } from '../v3/renderers/hero-perfect-enhanced.renderer';
import { FeaturesRendererV3Perfect } from '../v3/renderers/features-perfect.renderer';
import { FeaturesRendererV3PerfectEnhanced } from '../v3/renderers/features-perfect-enhanced.renderer';
import { ServicesRendererV3Perfect } from '../v3/renderers/services-perfect.renderer';
import { ServicesRendererV3PerfectEnhanced } from '../v3/renderers/services-perfect-enhanced.renderer';
import { GalleryRendererV3Perfect } from '../v3/renderers/gallery-perfect.renderer';
import { GalleryRendererV3PerfectEnhanced } from '../v3/renderers/gallery-perfect-enhanced.renderer';
import { GalleryRendererV3Supreme } from '../v3/renderers/gallery-v3-supreme.renderer';
import { ContentRendererV3Perfect } from '../v3/renderers/content-perfect.renderer';
import { ContentRendererV3Supreme as ContentRendererV3PerfectEnhanced } from '../v3/renderers/content-v3-supreme.renderer';
import { TestimonialsRendererV3Perfect } from '../v3/renderers/testimonials-perfect.renderer';
import { TestimonialsRendererV3PerfectEnhanced } from '../v3/renderers/testimonials-perfect-enhanced.renderer';
import { PricingRendererV3Perfect } from '../v3/renderers/pricing-perfect.renderer';
import { PricingRendererV3PerfectEnhanced } from '../v3/renderers/pricing-perfect-enhanced.renderer';
import { FAQRendererV3Perfect } from '../v3/renderers/faq-perfect.renderer';
import { FAQRendererV3PerfectEnhanced } from '../v3/renderers/faq-perfect-enhanced.renderer';
import { CTARendererV3Perfect } from '../v3/renderers/cta-perfect.renderer';
import { CTARendererV3PerfectEnhanced } from '../v3/renderers/cta-perfect-enhanced.renderer';
import { ContactRendererV3Perfect } from '../v3/renderers/contact-perfect.renderer';
import { ContactRendererV3PerfectEnhanced } from '../v3/renderers/contact-perfect-enhanced.renderer';

// Créer les instances V3
const heroV3 = new HeroRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const featuresV3 = new FeaturesRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const servicesV3 = new ServicesRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const galleryV3 = new GalleryRendererV3Supreme(); // Using supreme version for better ergonomics
const contentV3 = new ContentRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const testimonialsV3 = new TestimonialsRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const pricingV3 = new PricingRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const faqV3 = new FAQRendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const ctaV3 = new CTARendererV3PerfectEnhanced(); // Using enhanced version for better visuals
const contactV3 = new ContactRendererV3PerfectEnhanced(); // Using enhanced version for better visuals

// Créer les wrappers pour les renderers V3
const renderHeroV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  console.log('🔵 renderHeroV3Perfect called with props:', props, 'isExport:', isExport);
  console.log('🔵 Theme:', theme);
  
  try {
    const result = heroV3.render(props, context);
    console.log('🔵 renderHeroV3Perfect result type:', typeof result);
    console.log('🔵 renderHeroV3Perfect result keys:', result ? Object.keys(result) : 'null');
    console.log('🔵 Has HTML:', !!result?.html, 'Length:', result?.html?.length || 0);
    console.log('🔵 Has CSS:', !!result?.css, 'Length:', result?.css?.length || 0);
    console.log('🔵 Has JS:', !!result?.js, 'Length:', result?.js?.length || 0);
    
    if (result?.css) {
      console.log('🔵 CSS preview:', result.css.substring(0, 200) + '...');
      console.log('🔵 CSS includes hero--modern:', result.css.includes('hero--modern'));
    }
    
    return result; // Retourner l'objet complet {html, css, js}
  } catch (error) {
    console.error('🔴 Error in renderHeroV3Perfect:', error);
    throw error;
  }
};

const renderFeaturesV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = featuresV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderServicesV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = servicesV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderGalleryV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = galleryV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderContentV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = contentV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderTestimonialsV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = testimonialsV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderPricingV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = pricingV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderFAQV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = faqV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderCTAV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = ctaV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

const renderContactV3Perfect = (props: any, variants?: string[], isExport: boolean = false) => {
  // Récupérer le thème depuis le store ou depuis le thème temporaire
  let theme = undefined;
  if (typeof window !== 'undefined') {
    theme = (window as any).__tempTheme || (window as any).__editorStore?.getState()?.theme;
  }
  
  const context = { 
    isExport,
    theme,
    device: 'desktop' as 'desktop' | 'tablet' | 'mobile' | undefined
  };
  
  const result = contactV3.render(props, context);
  return result; // Retourner l'objet complet {html, css, js}
};

// Créer les blocs V3 pour le registry
const heroV3Perfect: Block = {
  id: 'hero-v3-perfect',
  name: 'Hero V3 Perfect',
  category: 'hero',
  description: '8 variantes spectaculaires avec animations 3D',
  tags: ['v3', 'hero', 'modern', 'animated'],
  get props() { return heroV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return featuresV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return servicesV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return galleryV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return contentV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return testimonialsV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  props: pricingV3.getBlockProps(),
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
  get props() { return faqV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return ctaV3.getBlockProps(); }, // Use getter to ensure fresh props each time
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
  get props() { return contactV3.getBlockProps(); }, // Use getter to ensure fresh props each time
  variants: [],
  defaultProps: contactV3.getDefaultData(),
  thumbnail: '',
  performanceImpact: 'medium' as any
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
    block: servicesUltraModern,
    category: BlockCategory.FEATURES,
    name: 'Services Ultra-Moderne',
    description: 'Section services avec animations 3D, filtres dynamiques et 8 designs époustouflants',
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
    block: pricingUltraModern,
    category: BlockCategory.PRICING,
    name: 'Pricing Ultra-Moderne',
    description: 'Tables de prix avec animations 3D, toggle mensuel/annuel et 8 designs époustouflants',
  },
  {
    block: pricingUltraModernSimple,
    category: BlockCategory.PRICING,
    name: 'Pricing Ultra-Moderne Simple',
    description: 'Tables de prix avec interface simplifiée et tous les champs visibles',
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
    block: footerUltraModern,
    category: BlockCategory.FOOTER,
    name: 'Footer Ultra-Moderne',
    description: 'Pied de page ultra-moderne avec 8 variantes, widgets dynamiques et intégrations avancées',
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
    block: headerUltraModern,
    category: BlockCategory.HEADER,
    name: 'Header Ultra-Moderne',
    description: 'En-tête ultra-moderne avec 8 variantes visuelles, mega menus et fonctionnalités avancées',
  },
  {
    block: reviewsBlock,
    category: BlockCategory.TESTIMONIALS,
    name: 'Avis clients',
    description: 'Affichage des avis clients avec notation et schema.org pour SEO',
  },
  {
    block: reviewsUltraModern,
    category: BlockCategory.TESTIMONIALS,
    name: 'Reviews Ultra-Moderne',
    description: 'Avis clients avec intégration Google, design moderne et animations avancées',
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
  'hero': renderHeroCentered, // Default hero mapping
  'hero-centered': renderHeroCentered,
  'hero-split-screen': renderHeroSplitScreen,
  'hero-ultra-modern': renderHeroUltraModern,
  'header-ultra-modern': renderHeaderUltraModern,
  'footer-ultra-modern': renderFooterUltraModern,
  'services-grid-cards': renderServicesGridCards,
  'services-list-detailed': renderServicesListDetailed,
  'services-ultra-modern': renderServicesUltraModern,
  'contact-form-map': renderContactFormMap,
  'contact-ultra-modern': renderContactUltraModern,
  'testimonials-carousel': renderTestimonialsCarousel,
  'text-image-clean': renderTextImageClean,
  'text-image-flexible': renderTextImageBlock,
  'content-ultra-modern': renderContentUltraModern,
  'features': renderFeaturesClean, // Default features mapping
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
  'pricing-ultra-modern': renderPricingUltraModern,
  'pricing-ultra-modern-simple': renderPricingUltraModernSimple,
  'cta-clean': renderCtaClean,
  'cta-section': renderCtaSection,
  'cta-ultra-modern': renderCtaUltraModern,
  'simple-footer': renderSimpleFooter,
  'footer-pro': renderFooterPro,
  'simple-header': renderSimpleHeader,
  'header-pro': renderHeaderPro,
  'reviews': renderReviews,
  'reviews-ultra-modern': renderReviewsUltraModern,
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
};

export function getBlockRenderFunction(blockId: string): ((props: any, variants?: string[], isExport?: boolean) => any) | undefined {
  return renderFunctions[blockId];
}
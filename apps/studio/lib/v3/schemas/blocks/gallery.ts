/**
 * Gallery Schema V3 - Validation complète avec Zod et logs
 */

import { z } from 'zod';
import { imageSchema, colorSchema } from '../common';
import { logger } from '../../core/logger';

// Schema pour un item de galerie
export const galleryItemSchema = z.object({
  id: z.string().default(() => {
    const id = crypto.randomUUID();
    logger.debug('galleryItemSchema', 'generate', `Génération ID item galerie: ${id}`);
    return id;
  }),
  
  image: imageSchema.extend({
    thumbnail: imageSchema.optional(), // Image miniature optionnelle
    srcset: z.string().optional(), // Pour responsive images
    sizes: z.string().optional()
  }),
  
  title: z.string().optional(),
  
  description: z.string().optional(),
  
  category: z.string().optional(),
  
  tags: z.array(z.string()).default([]),
  
  link: z.object({
    url: z.string(),
    target: z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
    rel: z.string().optional()
  }).optional(),
  
  metadata: z.object({
    date: z.string().optional(),
    author: z.string().optional(),
    location: z.string().optional(),
    camera: z.string().optional(),
    dimensions: z.object({
      width: z.number(),
      height: z.number()
    }).optional()
  }).optional(),
  
  video: z.object({
    url: z.string(),
    poster: imageSchema.optional(),
    autoplay: z.boolean().default(false),
    muted: z.boolean().default(true),
    loop: z.boolean().default(true)
  }).optional(),
  
  type: z.enum(['image', 'video', '360']).default('image'),
  
  featured: z.boolean().default(false),
  
  order: z.number().optional()
});

// Schema principal Gallery
export const galleryDataSchema = z.object({
  // Variants visuels
  variant: z.enum([
    'masonry-flow',
    'grid-uniform',
    'carousel-fullscreen',
    'lightbox-minimal',
    'instagram-style',
    'pinterest-cascade',
    'hero-slider',
    'mosaic-creative'
  ]).default('masonry-flow').describe('Style visuel de la galerie'),
  
  // Visual variant (theme style)
  visualVariant: z.enum([
    'modern',
    'minimal',
    'bold',
    'elegant'
  ]).default('modern').describe('Style visuel du thème'),
  
  // Configuration du titre
  title: z.string().default('Notre Galerie'),
  
  subtitle: z.string().optional(),
  
  description: z.string().optional(),
  
  // Items de la galerie
  items: z.array(galleryItemSchema).min(1).default([
    {
      id: '1',
      image: {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt: 'Paysage montagne'
      },
      title: 'Sommet enneigé',
      category: 'nature',
      featured: true,
      type: 'image'
    },
    {
      id: '2',
      image: {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        alt: 'Forêt tropicale'
      },
      title: 'Forêt mystique',
      category: 'nature',
      type: 'image'
    },
    {
      id: '3',
      image: {
        src: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        alt: 'Architecture moderne'
      },
      title: 'Design urbain',
      category: 'architecture',
      type: 'image'
    }
  ]),
  
  // Layout
  layout: z.object({
    columns: z.object({
      desktop: z.number().min(1).max(6).default(3),
      tablet: z.number().min(1).max(4).default(2),
      mobile: z.number().min(1).max(2).default(1)
    }).default({
      desktop: 3,
      tablet: 2,
      mobile: 1
    }),
    
    gap: z.enum(['none', 'xs', 'sm', 'md', 'lg', 'xl']).default('md'),
    
    aspectRatio: z.enum(['auto', '1:1', '4:3', '16:9', '3:2', '2:3']).default('auto'),
    
    containerWidth: z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
    
    height: z.enum(['auto', 'fixed', 'viewport']).default('auto'),
    
    fixedHeight: z.number().optional()
  }).default({}),
  
  // Options d'affichage
  display: z.object({
    showTitle: z.boolean().default(true),
    showDescription: z.boolean().default(false),
    showCategory: z.boolean().default(false),
    showTags: z.boolean().default(false),
    showMetadata: z.boolean().default(false),
    
    overlayStyle: z.enum(['none', 'hover', 'gradient', 'always']).default('hover'),
    overlayPosition: z.enum(['center', 'bottom', 'top']).default('bottom'),
    overlayAnimation: z.enum(['fade', 'slide', 'scale']).default('fade'),
    
    imageLoading: z.enum(['lazy', 'eager', 'auto']).default('lazy'),
    imageObjectFit: z.enum(['cover', 'contain', 'fill', 'none', 'scale-down']).default('cover'),
    
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).default('md'),
    
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
    
    hoverEffect: z.enum(['none', 'zoom', 'rotate', 'blur', 'grayscale', 'brightness']).default('zoom'),
    hoverScale: z.number().default(1.05),
    
    animation: z.enum(['none', 'fade', 'slide', 'zoom', 'flip']).default('fade'),
    animationDelay: z.number().default(100),
    stagger: z.boolean().default(true)
  }).default({}),
  
  // Lightbox
  lightbox: z.object({
    enabled: z.boolean().default(true),
    
    style: z.enum(['minimal', 'full', 'slideshow', 'theater', 'immersive']).default('minimal'),
    
    showThumbnails: z.boolean().default(true),
    showArrows: z.boolean().default(true),
    showCounter: z.boolean().default(true),
    showCaption: z.boolean().default(true),
    showZoom: z.boolean().default(true),
    showDownload: z.boolean().default(false),
    showShare: z.boolean().default(false),
    showFullscreen: z.boolean().default(true),
    
    animation: z.enum(['fade', 'slide', 'zoom', 'none']).default('fade'),
    
    backdropColor: colorSchema.optional(),
    backdropOpacity: z.number().min(0).max(1).default(0.9),
    
    autoplay: z.boolean().default(false),
    autoplayDelay: z.number().default(5000),
    
    keyboardNavigation: z.boolean().default(true),
    touchGestures: z.boolean().default(true),
    
    zoomLevels: z.array(z.number()).default([1, 2, 3, 5, 10]),
    maxZoom: z.number().default(10)
  }).default({}),
  
  // Filtres
  filtering: z.object({
    enabled: z.boolean().default(false),
    
    categories: z.array(z.object({
      id: z.string(),
      label: z.string(),
      count: z.number().optional(),
      color: colorSchema.optional()
    })).default([]),
    
    defaultCategory: z.string().optional(),
    
    style: z.enum(['buttons', 'dropdown', 'sidebar', 'tags']).default('buttons'),
    position: z.enum(['top', 'left', 'right']).default('top'),
    
    showAll: z.boolean().default(true),
    allLabel: z.string().default('Toutes'),
    
    animation: z.enum(['none', 'fade', 'scale']).default('fade'),
    
    multiSelect: z.boolean().default(false),
    
    showCount: z.boolean().default(true),
    
    sortOptions: z.array(z.object({
      value: z.string(),
      label: z.string()
    })).optional()
  }).default({}),
  
  // Mode carousel
  carousel: z.object({
    enabled: z.boolean().default(false),
    
    autoplay: z.boolean().default(true),
    autoplayDelay: z.number().default(5000),
    pauseOnHover: z.boolean().default(true),
    
    loop: z.boolean().default(true),
    
    showDots: z.boolean().default(true),
    showArrows: z.boolean().default(true),
    showThumbnails: z.boolean().default(false),
    
    slidesPerView: z.object({
      desktop: z.number().default(1),
      tablet: z.number().default(1),
      mobile: z.number().default(1)
    }).default({}),
    
    effect: z.enum(['slide', 'fade', 'cube', 'coverflow', 'flip', 'cards']).default('slide'),
    
    speed: z.number().default(500),
    
    gap: z.number().default(0),
    
    centeredSlides: z.boolean().default(false),
    
    freeMode: z.boolean().default(false)
  }).default({}),
  
  // Mode masonry
  masonry: z.object({
    enabled: z.boolean().default(false),
    
    columnWidth: z.enum(['auto', 'fixed']).default('auto'),
    fixedWidth: z.number().optional(),
    
    gutter: z.number().default(10),
    
    horizontalOrder: z.boolean().default(false),
    
    fitWidth: z.boolean().default(false),
    
    originLeft: z.boolean().default(true),
    originTop: z.boolean().default(true),
    
    percentPosition: z.boolean().default(true),
    
    transitionDuration: z.number().default(400)
  }).default({}),
  
  // Lazy loading
  lazyLoad: z.object({
    enabled: z.boolean().default(true),
    
    threshold: z.number().default(0),
    rootMargin: z.string().default('50px'),
    
    placeholder: z.enum(['blur', 'skeleton', 'spinner', 'none']).default('blur'),
    
    fadeIn: z.boolean().default(true),
    fadeInDuration: z.number().default(300)
  }).default({}),
  
  // Actions
  cta: z.object({
    enabled: z.boolean().default(false),
    text: z.string().default('Voir toute la galerie'),
    link: z.string().default('#gallery'),
    variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
    position: z.enum(['bottom', 'top']).default('bottom')
  }).default({}),
  
  // Styles personnalisés
  styles: z.object({
    backgroundColor: colorSchema.optional(),
    textColor: colorSchema.optional(),
    accentColor: colorSchema.optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg')
  }).default({})
});

// Type TypeScript dérivé du schéma
export type GalleryData = z.infer<typeof galleryDataSchema>;

// Valeurs par défaut complètes
export const galleryDefaults: GalleryData = {
  variant: 'masonry-flow',
  title: 'Notre Galerie',
  subtitle: 'Découvrez nos réalisations',
  description: 'Une sélection de nos meilleurs projets et créations.',
  
  items: [
    {
      id: '1',
      image: {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        alt: 'Paysage montagne',
        width: 1920,
        height: 1080
      },
      title: 'Sommet enneigé',
      description: 'Vue panoramique des Alpes',
      category: 'nature',
      tags: ['montagne', 'neige', 'paysage'],
      featured: true,
      type: 'image'
    },
    {
      id: '2',
      image: {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        alt: 'Forêt tropicale',
        width: 1920,
        height: 1280
      },
      title: 'Forêt mystique',
      description: 'Au cœur de la nature sauvage',
      category: 'nature',
      tags: ['forêt', 'nature', 'vert'],
      type: 'image'
    },
    {
      id: '3',
      image: {
        src: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        alt: 'Architecture moderne',
        width: 1920,
        height: 1080
      },
      title: 'Design urbain',
      description: 'Architecture contemporaine',
      category: 'architecture',
      tags: ['ville', 'moderne', 'design'],
      type: 'image'
    },
    {
      id: '4',
      image: {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        alt: 'Portrait professionnel',
        width: 1920,
        height: 1920
      },
      title: 'Portrait corporate',
      description: 'Photographie professionnelle',
      category: 'portrait',
      tags: ['portrait', 'professionnel'],
      type: 'image'
    },
    {
      id: '5',
      image: {
        src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        alt: 'Espace de travail',
        width: 1920,
        height: 1280
      },
      title: 'Bureau moderne',
      description: 'Environnement de travail créatif',
      category: 'workspace',
      tags: ['bureau', 'travail', 'moderne'],
      type: 'image'
    },
    {
      id: '6',
      image: {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
        alt: 'Forêt enchantée',
        width: 1920,
        height: 1280
      },
      title: 'Sentier forestier',
      description: 'Chemin à travers les bois',
      category: 'nature',
      tags: ['forêt', 'chemin', 'nature'],
      type: 'image'
    }
  ],
  
  layout: {
    columns: {
      desktop: 3,
      tablet: 2,
      mobile: 1
    },
    gap: 'md',
    aspectRatio: 'auto',
    containerWidth: 'normal',
    height: 'auto'
  },
  
  display: {
    showTitle: true,
    showDescription: false,
    showCategory: false,
    showTags: false,
    showMetadata: false,
    overlayStyle: 'hover',
    overlayPosition: 'bottom',
    overlayAnimation: 'fade',
    imageLoading: 'lazy',
    imageObjectFit: 'cover',
    borderRadius: 'md',
    shadow: 'md',
    hoverEffect: 'zoom',
    hoverScale: 1.05,
    animation: 'fade',
    animationDelay: 100,
    stagger: true
  },
  
  lightbox: {
    enabled: true,
    style: 'minimal',
    showThumbnails: true,
    showArrows: true,
    showCounter: true,
    showCaption: true,
    showZoom: true,
    showDownload: false,
    showShare: false,
    showFullscreen: true,
    animation: 'fade',
    backdropOpacity: 0.9,
    autoplay: false,
    autoplayDelay: 5000,
    keyboardNavigation: true,
    touchGestures: true,
    zoomLevels: [1, 2, 3, 5, 10],
    maxZoom: 10
  },
  
  filtering: {
    enabled: true,
    categories: [
      { id: 'all', label: 'Toutes', count: 6 },
      { id: 'nature', label: 'Nature', count: 3 },
      { id: 'architecture', label: 'Architecture', count: 1 },
      { id: 'portrait', label: 'Portraits', count: 1 },
      { id: 'workspace', label: 'Espaces', count: 1 }
    ],
    defaultCategory: 'all',
    style: 'buttons',
    position: 'top',
    showAll: true,
    allLabel: 'Toutes',
    animation: 'fade',
    multiSelect: false,
    showCount: true
  },
  
  carousel: {
    enabled: false,
    autoplay: true,
    autoplayDelay: 5000,
    pauseOnHover: true,
    loop: true,
    showDots: true,
    showArrows: true,
    showThumbnails: false,
    slidesPerView: {
      desktop: 1,
      tablet: 1,
      mobile: 1
    },
    effect: 'slide',
    speed: 500,
    gap: 0,
    centeredSlides: false,
    freeMode: false
  },
  
  masonry: {
    enabled: true,
    columnWidth: 'auto',
    gutter: 10,
    horizontalOrder: false,
    fitWidth: false,
    originLeft: true,
    originTop: true,
    percentPosition: true,
    transitionDuration: 400
  },
  
  lazyLoad: {
    enabled: true,
    threshold: 0,
    rootMargin: '50px',
    placeholder: 'blur',
    fadeIn: true,
    fadeInDuration: 300
  },
  
  cta: {
    enabled: false,
    text: 'Voir toute la galerie',
    link: '#gallery',
    variant: 'primary',
    position: 'bottom'
  },
  
  styles: {
    padding: 'lg'
  }
};

// Logger de validation
galleryDataSchema._parse = new Proxy(galleryDataSchema._parse, {
  apply(target, thisArg, args) {
    logger.debug('galleryDataSchema', 'parse', 'Validation des données Gallery', { 
      hasData: !!args[0],
      itemsCount: args[0]?.items?.length || 0
    });
    
    const result = Reflect.apply(target, thisArg, args);
    
    if (!result.success) {
      logger.warn('galleryDataSchema', 'parse', 'Validation échouée', {
        errors: result.error?.errors
      });
    } else {
      logger.info('galleryDataSchema', 'parse', '✅ Validation réussie', {
        itemsCount: result.data.items.length
      });
    }
    
    return result;
  }
});
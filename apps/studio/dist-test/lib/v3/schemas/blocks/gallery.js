"use strict";
/**
 * Gallery Schema V3 - Validation complète avec Zod et logs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryDefaults = exports.galleryDataSchema = exports.galleryItemSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const logger_1 = require("../../core/logger");
// Schema pour un item de galerie
exports.galleryItemSchema = zod_1.z.object({
    id: zod_1.z.string().default(() => {
        const id = crypto.randomUUID();
        logger_1.logger.debug('galleryItemSchema', 'generate', `Génération ID item galerie: ${id}`);
        return id;
    }),
    image: common_1.imageSchema.extend({
        thumbnail: common_1.imageSchema.optional(), // Image miniature optionnelle
        srcset: zod_1.z.string().optional(), // Pour responsive images
        sizes: zod_1.z.string().optional()
    }),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    link: zod_1.z.object({
        url: zod_1.z.string(),
        target: zod_1.z.enum(['_self', '_blank', '_parent', '_top']).default('_self'),
        rel: zod_1.z.string().optional()
    }).optional(),
    metadata: zod_1.z.object({
        date: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        camera: zod_1.z.string().optional(),
        dimensions: zod_1.z.object({
            width: zod_1.z.number(),
            height: zod_1.z.number()
        }).optional()
    }).optional(),
    video: zod_1.z.object({
        url: zod_1.z.string(),
        poster: common_1.imageSchema.optional(),
        autoplay: zod_1.z.boolean().default(false),
        muted: zod_1.z.boolean().default(true),
        loop: zod_1.z.boolean().default(true)
    }).optional(),
    type: zod_1.z.enum(['image', 'video', '360']).default('image'),
    featured: zod_1.z.boolean().default(false),
    order: zod_1.z.number().optional()
});
// Schema principal Gallery
exports.galleryDataSchema = zod_1.z.object({
    // Variants visuels
    variant: zod_1.z.enum([
        'masonry-flow',
        'grid-uniform',
        'carousel-fullscreen',
        'lightbox-minimal',
        'instagram-style',
        'pinterest-cascade',
        'hero-slider',
        'mosaic-creative'
    ]).default('masonry-flow').describe('Style visuel de la galerie'),
    // Configuration du titre
    title: zod_1.z.string().default('Notre Galerie'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    // Items de la galerie
    items: zod_1.z.array(exports.galleryItemSchema).min(1).default([
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
    layout: zod_1.z.object({
        columns: zod_1.z.object({
            desktop: zod_1.z.number().min(1).max(6).default(3),
            tablet: zod_1.z.number().min(1).max(4).default(2),
            mobile: zod_1.z.number().min(1).max(2).default(1)
        }).default({
            desktop: 3,
            tablet: 2,
            mobile: 1
        }),
        gap: zod_1.z.enum(['none', 'xs', 'sm', 'md', 'lg', 'xl']).default('md'),
        aspectRatio: zod_1.z.enum(['auto', '1:1', '4:3', '16:9', '3:2', '2:3']).default('auto'),
        containerWidth: zod_1.z.enum(['full', 'wide', 'normal', 'narrow']).default('normal'),
        height: zod_1.z.enum(['auto', 'fixed', 'viewport']).default('auto'),
        fixedHeight: zod_1.z.number().optional()
    }).default({}),
    // Options d'affichage
    display: zod_1.z.object({
        showTitle: zod_1.z.boolean().default(true),
        showDescription: zod_1.z.boolean().default(false),
        showCategory: zod_1.z.boolean().default(false),
        showTags: zod_1.z.boolean().default(false),
        showMetadata: zod_1.z.boolean().default(false),
        overlayStyle: zod_1.z.enum(['none', 'hover', 'gradient', 'always']).default('hover'),
        overlayPosition: zod_1.z.enum(['center', 'bottom', 'top']).default('bottom'),
        overlayAnimation: zod_1.z.enum(['fade', 'slide', 'scale']).default('fade'),
        imageLoading: zod_1.z.enum(['lazy', 'eager', 'auto']).default('lazy'),
        imageObjectFit: zod_1.z.enum(['cover', 'contain', 'fill', 'none', 'scale-down']).default('cover'),
        borderRadius: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).default('md'),
        shadow: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
        hoverEffect: zod_1.z.enum(['none', 'zoom', 'rotate', 'blur', 'grayscale', 'brightness']).default('zoom'),
        hoverScale: zod_1.z.number().default(1.05),
        animation: zod_1.z.enum(['none', 'fade', 'slide', 'zoom', 'flip']).default('fade'),
        animationDelay: zod_1.z.number().default(100),
        stagger: zod_1.z.boolean().default(true)
    }).default({}),
    // Lightbox
    lightbox: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        style: zod_1.z.enum(['minimal', 'full', 'slideshow', 'theater', 'immersive']).default('minimal'),
        showThumbnails: zod_1.z.boolean().default(true),
        showArrows: zod_1.z.boolean().default(true),
        showCounter: zod_1.z.boolean().default(true),
        showCaption: zod_1.z.boolean().default(true),
        showZoom: zod_1.z.boolean().default(true),
        showDownload: zod_1.z.boolean().default(false),
        showShare: zod_1.z.boolean().default(false),
        showFullscreen: zod_1.z.boolean().default(true),
        animation: zod_1.z.enum(['fade', 'slide', 'zoom', 'none']).default('fade'),
        backdropColor: common_1.colorSchema.optional(),
        backdropOpacity: zod_1.z.number().min(0).max(1).default(0.9),
        autoplay: zod_1.z.boolean().default(false),
        autoplayDelay: zod_1.z.number().default(5000),
        keyboardNavigation: zod_1.z.boolean().default(true),
        touchGestures: zod_1.z.boolean().default(true),
        zoomLevels: zod_1.z.array(zod_1.z.number()).default([1, 2, 3, 5, 10]),
        maxZoom: zod_1.z.number().default(10)
    }).default({}),
    // Filtres
    filtering: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        categories: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            label: zod_1.z.string(),
            count: zod_1.z.number().optional(),
            color: common_1.colorSchema.optional()
        })).default([]),
        defaultCategory: zod_1.z.string().optional(),
        style: zod_1.z.enum(['buttons', 'dropdown', 'sidebar', 'tags']).default('buttons'),
        position: zod_1.z.enum(['top', 'left', 'right']).default('top'),
        showAll: zod_1.z.boolean().default(true),
        allLabel: zod_1.z.string().default('Toutes'),
        animation: zod_1.z.enum(['none', 'fade', 'scale']).default('fade'),
        multiSelect: zod_1.z.boolean().default(false),
        showCount: zod_1.z.boolean().default(true),
        sortOptions: zod_1.z.array(zod_1.z.object({
            value: zod_1.z.string(),
            label: zod_1.z.string()
        })).optional()
    }).default({}),
    // Mode carousel
    carousel: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        autoplay: zod_1.z.boolean().default(true),
        autoplayDelay: zod_1.z.number().default(5000),
        pauseOnHover: zod_1.z.boolean().default(true),
        loop: zod_1.z.boolean().default(true),
        showDots: zod_1.z.boolean().default(true),
        showArrows: zod_1.z.boolean().default(true),
        showThumbnails: zod_1.z.boolean().default(false),
        slidesPerView: zod_1.z.object({
            desktop: zod_1.z.number().default(1),
            tablet: zod_1.z.number().default(1),
            mobile: zod_1.z.number().default(1)
        }).default({}),
        effect: zod_1.z.enum(['slide', 'fade', 'cube', 'coverflow', 'flip', 'cards']).default('slide'),
        speed: zod_1.z.number().default(500),
        gap: zod_1.z.number().default(0),
        centeredSlides: zod_1.z.boolean().default(false),
        freeMode: zod_1.z.boolean().default(false)
    }).default({}),
    // Mode masonry
    masonry: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        columnWidth: zod_1.z.enum(['auto', 'fixed']).default('auto'),
        fixedWidth: zod_1.z.number().optional(),
        gutter: zod_1.z.number().default(10),
        horizontalOrder: zod_1.z.boolean().default(false),
        fitWidth: zod_1.z.boolean().default(false),
        originLeft: zod_1.z.boolean().default(true),
        originTop: zod_1.z.boolean().default(true),
        percentPosition: zod_1.z.boolean().default(true),
        transitionDuration: zod_1.z.number().default(400)
    }).default({}),
    // Lazy loading
    lazyLoad: zod_1.z.object({
        enabled: zod_1.z.boolean().default(true),
        threshold: zod_1.z.number().default(0),
        rootMargin: zod_1.z.string().default('50px'),
        placeholder: zod_1.z.enum(['blur', 'skeleton', 'spinner', 'none']).default('blur'),
        fadeIn: zod_1.z.boolean().default(true),
        fadeInDuration: zod_1.z.number().default(300)
    }).default({}),
    // Actions
    cta: zod_1.z.object({
        enabled: zod_1.z.boolean().default(false),
        text: zod_1.z.string().default('Voir toute la galerie'),
        link: zod_1.z.string().default('#gallery'),
        variant: zod_1.z.enum(['primary', 'secondary', 'outline', 'ghost']).default('primary'),
        position: zod_1.z.enum(['bottom', 'top']).default('bottom')
    }).default({}),
    // Styles personnalisés
    styles: zod_1.z.object({
        backgroundColor: common_1.colorSchema.optional(),
        textColor: common_1.colorSchema.optional(),
        accentColor: common_1.colorSchema.optional(),
        padding: zod_1.z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('lg')
    }).default({})
});
// Valeurs par défaut complètes
exports.galleryDefaults = {
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
exports.galleryDataSchema._parse = new Proxy(exports.galleryDataSchema._parse, {
    apply(target, thisArg, args) {
        logger_1.logger.debug('galleryDataSchema', 'parse', 'Validation des données Gallery', {
            hasData: !!args[0],
            itemsCount: args[0]?.items?.length || 0
        });
        const result = Reflect.apply(target, thisArg, args);
        if (!result.success) {
            logger_1.logger.warn('galleryDataSchema', 'parse', 'Validation échouée', {
                errors: result.error?.errors
            });
        }
        else {
            logger_1.logger.info('galleryDataSchema', 'parse', '✅ Validation réussie', {
                itemsCount: result.data.items.length
            });
        }
        return result;
    }
});

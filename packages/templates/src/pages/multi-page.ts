import { Template, TemplateCategory, DefaultBlock } from '@awema/shared';

export const multiPageTemplate: Template = {
  id: 'multi-page',
  name: 'Multi-Page Website',
  description: 'Full website with separate pages for services, about, and contact',
  category: TemplateCategory.BUSINESS,
  tags: ['multi-page', 'business', 'corporate', 'professional'],
  thumbnail: '/templates/multi-page.jpg',
  screenshots: [
    '/templates/multi-page-1.jpg',
    '/templates/multi-page-2.jpg',
    '/templates/multi-page-3.jpg'
  ],
  features: [
    'Multiple pages',
    'Navigation menu',
    'Service detail pages',
    'About us section',
    'Contact page',
    'Blog ready',
    'SEO optimized',
    'Mobile responsive'
  ],
  industries: [
    'contractors',
    'medical',
    'legal',
    'consulting',
    'corporate',
    'agencies'
  ],
  variants: [],
  blocks: [
    'hero-split-screen',
    'hero-centered',
    'services-grid-cards',
    'services-list-detailed',
    'testimonials-carousel',
    'contact-form-map'
  ],
  defaultBlocks: [], // Will be populated per page
  performance: {
    lighthouseScore: 96,
    pageSpeed: 92,
    firstContentfulPaint: 1.4,
    largestContentfulPaint: 2.8,
    totalBlockingTime: 150,
    cumulativeLayoutShift: 0.03
  }
};

export interface PageConfig {
  slug: string;
  title: string;
  description: string;
  blocks: DefaultBlock[];
}

export interface MultiPageConfig {
  businessName: string;
  businessType: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    hours?: string;
  };
  services: Array<{
    title: string;
    description: string;
    details?: string;
    features?: string[];
    icon?: string;
    price?: string;
    image?: string;
  }>;
  about?: {
    story: string;
    mission?: string;
    team?: Array<{
      name: string;
      role: string;
      bio?: string;
      image?: string;
    }>;
  };
  testimonials?: Array<{
    name: string;
    role?: string;
    content: string;
    rating?: number;
    image?: string;
  }>;
}

export function generateMultiPageStructure(config: MultiPageConfig): PageConfig[] {
  const pages: PageConfig[] = [];

  // Home Page
  pages.push({
    slug: 'index',
    title: `${config.businessName} - Professional ${config.businessType} Services`,
    description: `Welcome to ${config.businessName}. We provide expert ${config.businessType} services with quality and reliability.`,
    blocks: [
      {
        blockId: 'hero-centered',
        order: 1,
        props: {
          title: `Welcome to ${config.businessName}`,
          subtitle: `Your trusted ${config.businessType} experts`,
          description: 'Quality service, competitive prices, and customer satisfaction guaranteed.',
          ctaText: 'Get Started',
          ctaLink: '/contact',
          secondaryCtaText: 'Our Services',
          secondaryCtaLink: '/services',
          backgroundImage: `/hero-${config.businessType}.jpg`
        },
        variants: ['minimal']
      },
      {
        blockId: 'services-grid-cards',
        order: 2,
        props: {
          title: 'What We Offer',
          subtitle: 'Professional solutions for every need',
          services: config.services.slice(0, 3).map(s => ({
            ...s,
            link: `/services/${s.title.toLowerCase().replace(/\s+/g, '-')}`
          })),
          columns: 3,
          showIcons: true,
          showLinks: true
        },
        variants: ['bordered', 'hover-lift']
      },
      {
        blockId: 'testimonials-carousel',
        order: 3,
        props: {
          title: 'Client Testimonials',
          testimonials: config.testimonials?.slice(0, 3) || [],
          showRating: true,
          showImages: false,
          autoplay: true
        },
        variants: ['minimal']
      }
    ]
  });

  // Services Page
  pages.push({
    slug: 'services',
    title: `Our Services - ${config.businessName}`,
    description: `Explore our comprehensive ${config.businessType} services. Professional solutions tailored to your needs.`,
    blocks: [
      {
        blockId: 'hero-centered',
        order: 1,
        props: {
          title: 'Our Services',
          subtitle: 'Comprehensive solutions for all your needs',
          ctaText: 'Get Quote',
          ctaLink: '/contact'
        },
        variants: ['minimal']
      },
      {
        blockId: 'services-list-detailed',
        order: 2,
        props: {
          title: 'Service Details',
          services: config.services.map(s => ({
            ...s,
            link: `/services/${s.title.toLowerCase().replace(/\s+/g, '-')}`
          })),
          showPricing: true,
          showFeatures: true,
          ctaText: 'Learn More'
        },
        variants: ['alternating']
      }
    ]
  });

  // Individual Service Pages
  config.services.forEach((service, index) => {
    const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-');
    pages.push({
      slug: `services/${serviceSlug}`,
      title: `${service.title} - ${config.businessName}`,
      description: service.details || service.description,
      blocks: [
        {
          blockId: 'hero-split-screen',
          order: 1,
          props: {
            title: service.title,
            subtitle: service.description,
            ctaText: 'Get Quote',
            ctaLink: '/contact',
            image: service.image || `/service-${index + 1}.jpg`,
            imageAlt: service.title
          },
          variants: index % 2 === 0 ? [] : ['image-left']
        },
        {
          blockId: 'contact-form-map',
          order: 2,
          props: {
            title: `Inquire About ${service.title}`,
            subtitle: 'Get a free consultation',
            contactInfo: config.contactInfo,
            showMap: false,
            formFields: [
              { name: 'name', label: 'Your Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'email', required: true },
              { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
              { name: 'message', label: 'Project Details', type: 'textarea', required: true }
            ]
          },
          variants: ['stacked']
        }
      ]
    });
  });

  // About Page
  if (config.about) {
    pages.push({
      slug: 'about',
      title: `About Us - ${config.businessName}`,
      description: `Learn about ${config.businessName}. ${config.about.story}`,
      blocks: [
        {
          blockId: 'hero-centered',
          order: 1,
          props: {
            title: 'About Us',
            subtitle: config.about.mission || 'Dedicated to excellence since day one',
            description: config.about.story
          },
          variants: ['minimal']
        },
        {
          blockId: 'testimonials-carousel',
          order: 2,
          props: {
            title: 'What People Say',
            testimonials: config.testimonials || [],
            showRating: true,
            showImages: true,
            autoplay: false
          },
          variants: ['cards']
        }
      ]
    });
  }

  // Contact Page
  pages.push({
    slug: 'contact',
    title: `Contact Us - ${config.businessName}`,
    description: `Get in touch with ${config.businessName}. We're here to help with all your ${config.businessType} needs.`,
    blocks: [
      {
        blockId: 'hero-centered',
        order: 1,
        props: {
          title: 'Get In Touch',
          subtitle: 'We\'re here to help',
          ctaText: 'Call Now',
          ctaLink: `tel:${config.contactInfo.phone.replace(/\D/g, '')}`
        },
        variants: ['minimal']
      },
      {
        blockId: 'contact-form-map',
        order: 2,
        props: {
          title: 'Send Us a Message',
          contactInfo: config.contactInfo,
          showMap: true,
          formFields: [
            { name: 'name', label: 'Your Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ]
        },
        variants: ['form-left']
      }
    ]
  });

  return pages;
}
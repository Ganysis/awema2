import { Template, TemplateCategory, DefaultBlock } from '@awema/shared';

export const landingPageTemplate: Template = {
  id: 'landing-page',
  name: 'Single Page Landing',
  description: 'All-in-one landing page with all sections on a single page',
  category: TemplateCategory.LANDING,
  tags: ['landing', 'single-page', 'conversion', 'marketing'],
  thumbnail: '/templates/landing-page.jpg',
  screenshots: [
    '/templates/landing-page-1.jpg',
    '/templates/landing-page-2.jpg'
  ],
  features: [
    'Hero section',
    'Services showcase',
    'Customer testimonials',
    'Contact form',
    'SEO optimized',
    'Mobile responsive',
    'Fast loading'
  ],
  industries: [
    'contractors',
    'services',
    'consultants',
    'freelancers',
    'small-business'
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
  defaultBlocks: [
    {
      blockId: 'hero-split-screen',
      order: 1,
      props: {
        title: 'Professional Services You Can Trust',
        subtitle: 'Quality workmanship and exceptional service for over 20 years',
        ctaText: 'Get Free Quote',
        ctaLink: '#contact',
        secondaryCtaText: 'View Our Work',
        secondaryCtaLink: '#services'
      },
      variants: []
    },
    {
      blockId: 'services-grid-cards',
      order: 2,
      props: {
        title: 'Our Services',
        subtitle: 'Complete solutions for all your needs',
        columns: 3,
        showIcons: true,
        showLinks: true
      },
      variants: ['shadow', 'hover-lift']
    },
    {
      blockId: 'testimonials-carousel',
      order: 3,
      props: {
        title: 'What Our Customers Say',
        subtitle: 'Join hundreds of satisfied customers',
        showRating: true,
        showImages: true,
        autoplay: true
      },
      variants: []
    },
    {
      blockId: 'contact-form-map',
      order: 4,
      props: {
        title: 'Get In Touch',
        subtitle: 'Free quotes and consultations',
        showMap: true,
        submitText: 'Send Message'
      },
      variants: []
    }
  ],
  performance: {
    lighthouseScore: 98,
    pageSpeed: 95,
    firstContentfulPaint: 1.2,
    largestContentfulPaint: 2.4,
    totalBlockingTime: 100,
    cumulativeLayoutShift: 0.02
  }
};

export interface LandingPageConfig {
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
    icon?: string;
    price?: string;
  }>;
  testimonials?: Array<{
    name: string;
    role?: string;
    content: string;
    rating?: number;
    image?: string;
  }>;
  heroImage?: string;
  logo?: string;
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function generateLandingPageBlocks(config: LandingPageConfig): DefaultBlock[] {
  return [
    {
      blockId: 'hero-split-screen',
      order: 1,
      props: {
        title: `Welcome to ${config.businessName}`,
        subtitle: `Professional ${config.businessType} services in your area`,
        ctaText: 'Get Free Quote',
        ctaLink: '#contact',
        secondaryCtaText: 'Our Services',
        secondaryCtaLink: '#services',
        image: config.heroImage || `/hero-${config.businessType}.jpg`,
        imageAlt: `${config.businessName} professional services`
      },
      variants: []
    },
    {
      blockId: 'services-grid-cards',
      order: 2,
      props: {
        title: 'Our Services',
        subtitle: `Expert ${config.businessType} solutions`,
        services: config.services,
        columns: Math.min(config.services.length, 3),
        showIcons: true,
        showLinks: true
      },
      variants: ['shadow', 'hover-lift']
    },
    {
      blockId: 'testimonials-carousel',
      order: 3,
      props: {
        title: 'Customer Reviews',
        subtitle: 'See what our clients say about us',
        testimonials: config.testimonials || [
          {
            name: 'John Doe',
            role: 'Homeowner',
            content: 'Excellent service and professional work. Highly recommended!',
            rating: 5
          },
          {
            name: 'Jane Smith',
            role: 'Business Owner',
            content: 'Quick response time and fair pricing. Very satisfied with the results.',
            rating: 5
          }
        ],
        showRating: true,
        showImages: true,
        autoplay: true
      },
      variants: []
    },
    {
      blockId: 'contact-form-map',
      order: 4,
      props: {
        title: 'Contact Us',
        subtitle: 'Get your free quote today',
        contactInfo: config.contactInfo,
        showMap: true,
        submitText: 'Send Message',
        mapCoordinates: { lat: 40.7128, lng: -74.0060 },
        formFields: [
          { name: 'name', label: 'Your Name', type: 'text', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
          { name: 'service', label: 'Service Needed', type: 'select', options: config.services.map(s => s.title), required: true },
          { name: 'message', label: 'Message', type: 'textarea', required: true }
        ]
      },
      variants: []
    }
  ];
}
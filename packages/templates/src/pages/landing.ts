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
    'header-pro',
    'hero-v3-perfect',
    'services-v3-perfect',
    'features-v3-perfect',
    'testimonials-v3-perfect',
    'contact-v3-perfect',
    'footer-pro'
  ],
  defaultBlocks: [
    {
      blockId: 'header-pro',
      order: 0,
      props: {}
    },
    {
      blockId: 'hero-v3-perfect',
      order: 1,
      props: {
        title: 'Professional Services You Can Trust',
        subtitle: 'Quality workmanship and exceptional service for over 20 years',
        ctaText: 'Get Free Quote',
        ctaLink: '#contact',
        secondaryCtaText: 'View Our Work',
        secondaryCtaLink: '#services'
      },
      variants: ['split-screen']
    },
    {
      blockId: 'services-v3-perfect',
      order: 2,
      props: {
        title: 'Our Services',
        subtitle: 'Professional solutions tailored to your needs'
      }
    },
    {
      blockId: 'features-v3-perfect',
      order: 3,
      props: {
        title: 'Why Choose Us',
        subtitle: 'Experience the difference quality makes'
      }
    },
    {
      blockId: 'testimonials-v3-perfect',
      order: 4,
      props: {
        title: 'What Our Clients Say',
        subtitle: 'Don\'t just take our word for it'
      }
    },
    {
      blockId: 'contact-v3-perfect',
      order: 5,
      props: {
        title: 'Get In Touch',
        subtitle: 'Ready to start your project? Contact us today for a free quote',
        showMap: true
      }
    },
    {
      blockId: 'footer-pro',
      order: 6,
      props: {}
    }
  ],
  customCSS: '',
  customJS: '',
  seo: {
    title: 'Professional Services | Your Company Name',
    description: 'Quality workmanship and exceptional service. Get your free quote today.',
    keywords: ['services', 'professional', 'quality', 'trusted']
  }
};

export interface LandingPageConfig {
  companyName: string;
  industry: string;
  services: string[];
  primaryColor?: string;
  secondaryColor?: string;
  features?: string[];
  testimonials?: Array<{
    name: string;
    text: string;
    rating?: number;
  }>;
}

export function generateLandingPageBlocks(config: LandingPageConfig): DefaultBlock[] {
  return [
    {
      blockId: 'header-pro',
      order: 0,
      props: {
        businessName: config.companyName,
        primaryColor: config.primaryColor
      }
    },
    {
      blockId: 'hero-v3-perfect',
      order: 1,
      props: {
        title: `Welcome to ${config.companyName}`,
        subtitle: `Professional ${config.industry} services you can trust`,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor
      }
    },
    {
      blockId: 'services-v3-perfect',
      order: 2,
      props: {
        title: 'Our Services',
        services: config.services.map((service, index) => ({
          id: `service-${index}`,
          title: service,
          description: `Professional ${service.toLowerCase()} services`,
          icon: '🔧'
        }))
      }
    },
    {
      blockId: 'features-v3-perfect',
      order: 3,
      props: {
        title: 'Why Choose Us',
        features: config.features || []
      }
    },
    {
      blockId: 'testimonials-v3-perfect',
      order: 4,
      props: {
        title: 'Client Testimonials',
        testimonials: config.testimonials || []
      }
    },
    {
      blockId: 'contact-v3-perfect',
      order: 5,
      props: {
        title: 'Contact Us',
        subtitle: 'Get your free quote today'
      }
    },
    {
      blockId: 'footer-pro',
      order: 6,
      props: {
        businessName: config.companyName,
        primaryColor: config.primaryColor
      }
    }
  ];
}
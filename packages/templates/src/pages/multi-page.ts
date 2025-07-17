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
    'header-pro',
    'hero-v3-perfect',
    'services-v3-perfect',
    'features-v3-perfect',
    'testimonials-v3-perfect',
    'contact-v3-perfect',
    'footer-pro'
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
  id: string;
  title: string;
  slug: string;
  blocks: DefaultBlock[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface MultiPageConfig {
  companyName: string;
  industry: string;
  services: Array<{
    name: string;
    description: string;
    features?: string[];
  }>;
  primaryColor?: string;
  secondaryColor?: string;
}

export function generateMultiPageStructure(config: MultiPageConfig): PageConfig[] {
  const pages: PageConfig[] = [];

  // Home page
  pages.push({
    id: 'home',
    title: 'Home',
    slug: '/',
    blocks: [
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
          subtitle: `Professional ${config.industry} services`,
          primaryColor: config.primaryColor,
          secondaryColor: config.secondaryColor
        }
      },
      {
        blockId: 'services-v3-perfect',
        order: 2,
        props: {
          title: 'Our Services',
          subtitle: 'What we offer'
        }
      },
      {
        blockId: 'features-v3-perfect',
        order: 3,
        props: {
          title: 'Why Choose Us'
        }
      },
      {
        blockId: 'testimonials-v3-perfect',
        order: 4,
        props: {
          title: 'Client Reviews'
        }
      },
      {
        blockId: 'cta-v3-perfect',
        order: 5,
        props: {
          title: 'Ready to Get Started?',
          ctaText: 'Contact Us'
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
    ],
    seo: {
      title: `${config.companyName} | Professional ${config.industry} Services`,
      description: `${config.companyName} provides professional ${config.industry} services. Quality work, competitive prices.`
    }
  });

  // Services overview page
  pages.push({
    id: 'services',
    title: 'Services',
    slug: '/services',
    blocks: [
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
          title: 'Our Services',
          subtitle: 'Professional solutions for all your needs',
          visualVariant: 'minimal'
        }
      },
      {
        blockId: 'services-v3-perfect',
        order: 2,
        props: {
          title: 'What We Offer',
          visualVariant: 'modern'
        }
      },
      {
        blockId: 'pricing-v3-perfect',
        order: 3,
        props: {
          title: 'Transparent Pricing'
        }
      },
      {
        blockId: 'cta-v3-perfect',
        order: 4,
        props: {
          title: 'Need a Custom Solution?',
          ctaText: 'Get Quote'
        }
      },
      {
        blockId: 'footer-pro',
        order: 5,
        props: {
          businessName: config.companyName,
          primaryColor: config.primaryColor
        }
      }
    ],
    seo: {
      title: `Services | ${config.companyName}`,
      description: `Explore our professional ${config.industry} services. Quality work guaranteed.`
    }
  });

  // About page
  pages.push({
    id: 'about',
    title: 'About Us',
    slug: '/about',
    blocks: [
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
          title: `About ${config.companyName}`,
          subtitle: 'Your trusted partner since 2000',
          visualVariant: 'minimal'
        }
      },
      {
        blockId: 'content-v3-perfect',
        order: 2,
        props: {
          title: 'Our Story',
          contentType: 'article'
        }
      },
      {
        blockId: 'features-v3-perfect',
        order: 3,
        props: {
          title: 'Our Values',
          visualVariant: 'cards-hover'
        }
      },
      {
        blockId: 'gallery-v3-perfect',
        order: 4,
        props: {
          title: 'Our Work'
        }
      },
      {
        blockId: 'footer-pro',
        order: 5,
        props: {
          businessName: config.companyName,
          primaryColor: config.primaryColor
        }
      }
    ],
    seo: {
      title: `About Us | ${config.companyName}`,
      description: `Learn about ${config.companyName} - your trusted ${config.industry} partner.`
    }
  });

  // Contact page
  pages.push({
    id: 'contact',
    title: 'Contact',
    slug: '/contact',
    blocks: [
      {
        blockId: 'header-pro',
        order: 0,
        props: {
          businessName: config.companyName,
          primaryColor: config.primaryColor
        }
      },
      {
        blockId: 'contact-v3-perfect',
        order: 1,
        props: {
          title: 'Get In Touch',
          subtitle: 'We\'re here to help with your project',
          showMap: true
        }
      },
      {
        blockId: 'faq-v3-perfect',
        order: 2,
        props: {
          title: 'Frequently Asked Questions'
        }
      },
      {
        blockId: 'footer-pro',
        order: 3,
        props: {
          businessName: config.companyName,
          primaryColor: config.primaryColor
        }
      }
    ],
    seo: {
      title: `Contact Us | ${config.companyName}`,
      description: `Contact ${config.companyName} for professional ${config.industry} services. Get your free quote today.`
    }
  });

  return pages;
}
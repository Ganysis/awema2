import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Structures de templates pré-définies
const templateStructures = [
  {
    name: 'Urgence 24/7 Premium',
    category: 'plombier',
    tags: ['urgency', '24/7', 'emergency', 'professional'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'sticky-transparent', position: 1 },
      { type: 'hero-v3-perfect', variant: 'split-content', position: 2 },
      { type: 'cta-v3-perfect', variant: 'urgency-banner', position: 3 },
      { type: 'services-v3-perfect', variant: 'cards-hover', position: 4 },
      { type: 'features-v3-perfect', variant: 'timeline', position: 5 },
      { type: 'testimonials-v3-perfect', variant: 'carousel-3d', position: 6 },
      { type: 'contact-v3-perfect', variant: 'split-map', position: 7 },
      { type: 'footer-v3-perfect', variant: 'mega-footer', position: 8 }
    ],
    theme: {
      colors: {
        primary: '#dc2626',
        secondary: '#991b1b',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      }
    },
    score: 95
  },
  {
    name: 'Confiance & Expertise',
    category: 'electricien',
    tags: ['trust', 'expertise', 'professional', 'certified'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'classic-professional', position: 1 },
      { type: 'hero-v3-perfect', variant: 'gradient-modern', position: 2 },
      { type: 'content-v3-perfect', variant: 'about', position: 3 },
      { type: 'features-v3-perfect', variant: 'cards', position: 4 },
      { type: 'services-v3-perfect', variant: 'grid-modern', position: 5 },
      { type: 'testimonials-v3-perfect', variant: 'grid', position: 6 },
      { type: 'faq-v3-perfect', variant: 'accordion', position: 7 },
      { type: 'contact-v3-perfect', variant: 'elegant-form', position: 8 },
      { type: 'footer-v3-perfect', variant: 'corporate', position: 9 }
    ],
    theme: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      }
    },
    score: 92
  },
  {
    name: 'Portfolio Visuel',
    category: 'menuisier',
    tags: ['portfolio', 'visual', 'showcase', 'gallery'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'centered-modern', position: 1 },
      { type: 'hero-v3-perfect', variant: 'fullscreen-video', position: 2 },
      { type: 'gallery-v3-perfect', variant: 'masonry-flow', position: 3 },
      { type: 'content-v3-perfect', variant: 'stats', position: 4 },
      { type: 'services-v3-perfect', variant: 'grid-modern', position: 5 },
      { type: 'gallery-v3-perfect', variant: 'before-after', position: 6 },
      { type: 'testimonials-v3-perfect', variant: 'masonry', position: 7 },
      { type: 'cta-v3-perfect', variant: 'gradient-wave', position: 8 },
      { type: 'footer-v3-perfect', variant: 'minimal-elegant', position: 9 }
    ],
    theme: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#6d28d9',
        accent: '#f59e0b',
        background: '#fafafa',
        text: '#111827'
      }
    },
    score: 90
  },
  {
    name: 'Proximité Locale',
    category: 'jardinier',
    tags: ['local', 'proximity', 'community', 'eco'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'transparent-overlay', position: 1 },
      { type: 'hero-v3-perfect', variant: 'parallax', position: 2 },
      { type: 'content-v3-perfect', variant: 'local-presence', position: 3 },
      { type: 'services-v3-perfect', variant: 'seasonal-services', position: 4 },
      { type: 'features-v3-perfect', variant: 'eco-approach', position: 5 },
      { type: 'testimonials-v3-perfect', variant: 'timeline', position: 6 },
      { type: 'contact-v3-perfect', variant: 'map-fullwidth', position: 7 },
      { type: 'footer-v3-perfect', variant: 'local-info', position: 8 }
    ],
    theme: {
      colors: {
        primary: '#10b981',
        secondary: '#065f46',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1e293b'
      }
    },
    score: 88
  },
  {
    name: 'Innovation Tech',
    category: 'chauffagiste',
    tags: ['modern', 'innovation', 'tech', 'efficiency'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'futuristic', position: 1 },
      { type: 'hero-v3-perfect', variant: 'animated-gradient', position: 2 },
      { type: 'features-v3-perfect', variant: '3d-cards', position: 3 },
      { type: 'services-v3-perfect', variant: 'heating-systems', position: 4 },
      { type: 'content-v3-perfect', variant: 'energy-savings', position: 5 },
      { type: 'pricing-v3-perfect', variant: 'comparison', position: 6 },
      { type: 'cta-v3-perfect', variant: 'floating-cards', position: 7 },
      { type: 'footer-v3-perfect', variant: 'tech-modern', position: 8 }
    ],
    theme: {
      colors: {
        primary: '#0891b2',
        secondary: '#164e63',
        accent: '#f97316',
        background: '#f8fafc',
        text: '#0f172a'
      }
    },
    score: 91
  },
  {
    name: 'Service Premium',
    category: 'peintre',
    tags: ['premium', 'quality', 'artistic', 'professional'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'elegant-minimal', position: 1 },
      { type: 'hero-v3-perfect', variant: 'artistic-hero', position: 2 },
      { type: 'content-v3-perfect', variant: 'color-expertise', position: 3 },
      { type: 'gallery-v3-perfect', variant: 'grid-creative', position: 4 },
      { type: 'services-v3-perfect', variant: 'detailed-cards', position: 5 },
      { type: 'testimonials-v3-perfect', variant: 'elegant-quotes', position: 6 },
      { type: 'contact-v3-perfect', variant: 'premium-form', position: 7 },
      { type: 'footer-v3-perfect', variant: 'creative-footer', position: 8 }
    ],
    theme: {
      colors: {
        primary: '#e11d48',
        secondary: '#be123c',
        accent: '#fde047',
        background: '#fffbeb',
        text: '#1c1917'
      }
    },
    score: 93
  },
  {
    name: 'Conversion Optimale',
    category: 'carreleur',
    tags: ['conversion', 'leads', 'sales', 'efficient'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'cta-header', position: 1 },
      { type: 'hero-v3-perfect', variant: 'lead-capture', position: 2 },
      { type: 'features-v3-perfect', variant: 'benefits-icons', position: 3 },
      { type: 'content-v3-perfect', variant: 'laying-techniques', position: 4 },
      { type: 'gallery-v3-perfect', variant: 'showcase-slider', position: 5 },
      { type: 'testimonials-v3-perfect', variant: 'social-proof', position: 6 },
      { type: 'cta-v3-perfect', variant: 'multi-cta', position: 7 },
      { type: 'contact-v3-perfect', variant: 'conversion-form', position: 8 },
      { type: 'footer-v3-perfect', variant: 'trust-signals', position: 9 }
    ],
    theme: {
      colors: {
        primary: '#f97316',
        secondary: '#ea580c',
        accent: '#3b82f6',
        background: '#ffffff',
        text: '#18181b'
      }
    },
    score: 94
  },
  {
    name: 'Sécurité Plus',
    category: 'serrurier',
    tags: ['security', 'emergency', '24/7', 'trust'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'security-header', position: 1 },
      { type: 'hero-v3-perfect', variant: 'emergency-hero', position: 2 },
      { type: 'services-v3-perfect', variant: 'security-services', position: 3 },
      { type: 'features-v3-perfect', variant: 'trust-badges', position: 4 },
      { type: 'content-v3-perfect', variant: 'certifications', position: 5 },
      { type: 'testimonials-v3-perfect', variant: 'verified-reviews', position: 6 },
      { type: 'cta-v3-perfect', variant: 'urgency-cta', position: 7 },
      { type: 'contact-v3-perfect', variant: 'emergency-contact', position: 8 },
      { type: 'footer-v3-perfect', variant: 'security-footer', position: 9 }
    ],
    theme: {
      colors: {
        primary: '#dc2626',
        secondary: '#7f1d1d',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      }
    },
    score: 96
  },
  {
    name: 'Construction Solide',
    category: 'macon',
    tags: ['construction', 'solid', 'professional', 'reliable'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'industrial-header', position: 1 },
      { type: 'hero-v3-perfect', variant: 'construction-hero', position: 2 },
      { type: 'services-v3-perfect', variant: 'construction-types', position: 3 },
      { type: 'content-v3-perfect', variant: 'process-timeline', position: 4 },
      { type: 'gallery-v3-perfect', variant: 'project-showcase', position: 5 },
      { type: 'features-v3-perfect', variant: 'quality-assurance', position: 6 },
      { type: 'testimonials-v3-perfect', variant: 'project-testimonials', position: 7 },
      { type: 'contact-v3-perfect', variant: 'project-inquiry', position: 8 },
      { type: 'footer-v3-perfect', variant: 'professional-footer', position: 9 }
    ],
    theme: {
      colors: {
        primary: '#6b7280',
        secondary: '#374151',
        accent: '#f59e0b',
        background: '#f9fafb',
        text: '#111827'
      }
    },
    score: 89
  },
  {
    name: 'Toiture Excellence',
    category: 'couvreur',
    tags: ['roofing', 'excellence', 'quality', 'professional'],
    blocks: [
      { type: 'header-v3-perfect', variant: 'professional-menu', position: 1 },
      { type: 'hero-v3-perfect', variant: 'roofing-hero', position: 2 },
      { type: 'services-v3-perfect', variant: 'roofing-types', position: 3 },
      { type: 'cta-v3-perfect', variant: 'roof-emergency', position: 4 },
      { type: 'content-v3-perfect', variant: 'materials-quality', position: 5 },
      { type: 'gallery-v3-perfect', variant: 'roofing-gallery', position: 6 },
      { type: 'features-v3-perfect', variant: 'guarantees', position: 7 },
      { type: 'testimonials-v3-perfect', variant: 'customer-stories', position: 8 },
      { type: 'contact-v3-perfect', variant: 'quote-request', position: 9 },
      { type: 'footer-v3-perfect', variant: 'complete-footer', position: 10 }
    ],
    theme: {
      colors: {
        primary: '#991b1b',
        secondary: '#450a0a',
        accent: '#22c55e',
        background: '#ffffff',
        text: '#1a1a1a'
      }
    },
    score: 87
  }
];

async function createTemplates() {
  console.log('🚀 Création des templates adaptatifs...');
  
  for (const templateData of templateStructures) {
    try {
      const template = await prisma.template.create({
        data: {
          name: templateData.name,
          category: templateData.category,
          blocks: JSON.stringify(templateData.blocks),
          theme: JSON.stringify(templateData.theme),
          tags: JSON.stringify(templateData.tags),
          score: templateData.score,
          isActive: true,
          metadata: JSON.stringify({
            createdBy: 'system',
            version: '1.0',
            type: 'adaptive'
          })
        }
      });
      
      console.log(`✅ Template créé: ${template.name} (${template.category})`);
    } catch (error) {
      console.error(`❌ Erreur création template ${templateData.name}:`, error);
    }
  }
  
  console.log('\n📊 Résumé des templates par catégorie:');
  const categories = await prisma.template.groupBy({
    by: ['category'],
    _count: {
      category: true
    }
  });
  
  categories.forEach(cat => {
    console.log(`- ${cat.category}: ${cat._count.category} templates`);
  });
  
  await prisma.$disconnect();
}

createTemplates()
  .catch(console.error)
  .finally(() => process.exit());
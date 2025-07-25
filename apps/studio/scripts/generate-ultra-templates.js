const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Configuration des combinaisons de templates
const BUSINESS_TYPES = [
  'plombier', 'electricien', 'menuisier', 'peintre', 'macon', 
  'chauffagiste', 'carreleur', 'couvreur', 'jardinier', 'serrurier'
];

const TEMPLATE_STYLES = [
  { id: 'modern', name: 'Modern', description: 'Design contemporain épuré' },
  { id: 'classic', name: 'Classique', description: 'Élégant et intemporel' },
  { id: 'bold', name: 'Bold', description: 'Impact visuel fort' },
  { id: 'minimal', name: 'Minimal', description: 'Simple et efficace' },
  { id: 'premium', name: 'Premium', description: 'Luxueux et sophistiqué' }
];

const TEMPLATE_PURPOSES = [
  { id: 'conversion', name: 'Conversion', focus: 'urgency' },
  { id: 'trust', name: 'Confiance', focus: 'testimonials' },
  { id: 'showcase', name: 'Portfolio', focus: 'gallery' },
  { id: 'local', name: 'Local SEO', focus: 'location' },
  { id: 'corporate', name: 'Corporate', focus: 'professional' }
];

// Patterns de blocs ultra-professionnels
const ULTRA_PATTERNS = {
  'conversion-urgency': {
    name: 'Conversion Urgence',
    blocks: [
      { type: 'header-v3-perfect', variant: 'modern', config: { sticky: 'always', urgencyCTA: true } },
      { type: 'hero-v3-perfect', variant: 'bold', config: { countdown: true, particles: true } },
      { type: 'services-v3-perfect', variant: 'cards-hover', config: { urgencyBadges: true } },
      { type: 'cta-v3-perfect', variant: 'urgent', config: { confetti: true, sound: true } },
      { type: 'testimonials-v3-perfect', variant: 'carousel-3d', config: { autoplay: true } },
      { type: 'contact-v3-perfect', variant: 'floating-cards', config: { urgencyForm: true } },
      { type: 'footer-v3-perfect', variant: 'dark', config: { emergency24h: true } }
    ]
  },
  
  'trust-authority': {
    name: 'Trust Authority',
    blocks: [
      { type: 'header-v3-perfect', variant: 'corporate', config: { badges: true, certifications: true } },
      { type: 'hero-v3-perfect', variant: 'elegant', config: { trustIndicators: true } },
      { type: 'content-v3-perfect', variant: 'stats', config: { animatedCounters: true } },
      { type: 'features-v3-perfect', variant: 'timeline', config: { processSteps: true } },
      { type: 'testimonials-v3-perfect', variant: 'video-testimonials', config: { googleReviews: true } },
      { type: 'gallery-v3-perfect', variant: 'before-after', config: { comparison: true } },
      { type: 'faq-v3-perfect', variant: 'chatbot', config: { aiAssistant: true } },
      { type: 'footer-v3-perfect', variant: 'gradient', config: { awards: true } }
    ]
  },
  
  'visual-portfolio': {
    name: 'Visual Portfolio',
    blocks: [
      { type: 'header-v3-perfect', variant: 'minimal', config: { transparent: true, floatingMenu: true } },
      { type: 'hero-v3-perfect', variant: 'fullscreen-slider', config: { kenBurns: true } },
      { type: 'gallery-v3-perfect', variant: 'masonry-flow', config: { filters: true, zoom10x: true } },
      { type: 'content-v3-perfect', variant: 'magazine', config: { parallax: true } },
      { type: 'services-v3-perfect', variant: 'bento-showcase', config: { hoverEffects: true } },
      { type: 'testimonials-v3-perfect', variant: 'instagram-style', config: { socialWall: true } },
      { type: 'cta-v3-perfect', variant: 'video-bg', config: { cinematicMode: true } },
      { type: 'footer-v3-perfect', variant: 'organic', config: { instagramFeed: true } }
    ]
  },
  
  'premium-luxury': {
    name: 'Premium Luxury',
    blocks: [
      { type: 'header-v3-perfect', variant: 'elegant', config: { goldAccents: true, reservationBtn: true } },
      { type: 'hero-v3-perfect', variant: 'cinematic', config: { videoBackground: true, glassEffect: true } },
      { type: 'content-v3-perfect', variant: 'editorial', config: { dropCaps: true, elegantTypo: true } },
      { type: 'services-v3-perfect', variant: 'luxury-cards', config: { goldBorders: true, premiumBadge: true } },
      { type: 'gallery-v3-perfect', variant: '3d-showcase', config: { spotlightEffect: true } },
      { type: 'pricing-v3-perfect', variant: 'premium-table', config: { vipOptions: true } },
      { type: 'testimonials-v3-perfect', variant: 'vip-cards', config: { clientLogos: true } },
      { type: 'contact-v3-perfect', variant: 'concierge', config: { appointmentCalendar: true } },
      { type: 'footer-v3-perfect', variant: 'luxury-minimal', config: { exclusiveAccess: true } }
    ]
  },
  
  'local-domination': {
    name: 'Local Domination',
    blocks: [
      { type: 'header-v3-perfect', variant: 'modern', config: { locationBadge: true, localPhone: true } },
      { type: 'hero-v3-perfect', variant: 'map-integrated', config: { serviceAreaMap: true } },
      { type: 'services-v3-perfect', variant: 'location-cards', config: { cityBadges: true } },
      { type: 'content-v3-perfect', variant: 'local-guide', config: { neighborhoodInfo: true } },
      { type: 'gallery-v3-perfect', variant: 'local-projects', config: { geoTags: true } },
      { type: 'testimonials-v3-perfect', variant: 'map-reviews', config: { locationPins: true } },
      { type: 'faq-v3-perfect', variant: 'local-questions', config: { citySpecific: true } },
      { type: 'contact-v3-perfect', variant: 'multi-location', config: { branchSelector: true } },
      { type: 'footer-v3-perfect', variant: 'service-areas', config: { cityLinks: true } }
    ]
  }
};

// Palettes de couleurs par métier
const COLOR_PALETTES = {
  plombier: [
    { primary: '#0066CC', secondary: '#00A651', accent: '#FF6B35' },
    { primary: '#0891B2', secondary: '#7C3AED', accent: '#EC4899' },
    { primary: '#DC2626', secondary: '#059669', accent: '#F59E0B' }
  ],
  electricien: [
    { primary: '#FCD34D', secondary: '#1F2937', accent: '#EF4444' },
    { primary: '#8B5CF6', secondary: '#10B981', accent: '#F59E0B' },
    { primary: '#3B82F6', secondary: '#F97316', accent: '#06B6D4' }
  ],
  menuisier: [
    { primary: '#92400E', secondary: '#059669', accent: '#F59E0B' },
    { primary: '#7C2D12', secondary: '#0891B2', accent: '#D97706' }
  ],
  peintre: [
    { primary: '#7C3AED', secondary: '#EC4899', accent: '#06B6D4' },
    { primary: '#A78BFA', secondary: '#F9A8D4', accent: '#67E8F9' }
  ],
  general: [
    { primary: '#1E40AF', secondary: '#10B981', accent: '#F59E0B' },
    { primary: '#8B5CF6', secondary: '#10B981', accent: '#F59E0B' },
    { primary: '#991B1B', secondary: '#B91C1C', accent: '#FCD34D' }
  ]
};

// Générateur de noms créatifs
function generateCreativeName(business, style, purpose) {
  const prefixes = {
    modern: ['Neo', 'Ultra', 'Fusion', 'Quantum', 'Apex'],
    classic: ['Heritage', 'Prestige', 'Elite', 'Crown', 'Royal'],
    bold: ['Impact', 'Power', 'Thunder', 'Blaze', 'Storm'],
    minimal: ['Pure', 'Zen', 'Clean', 'Simple', 'Essential'],
    premium: ['Luxe', 'Diamond', 'Platinum', 'Gold', 'Exclusive']
  };
  
  const suffixes = {
    conversion: ['Convert', 'Boost', 'Rush', 'Flash', 'Surge'],
    trust: ['Trust', 'Authority', 'Expert', 'Master', 'Pro'],
    showcase: ['Gallery', 'Portfolio', 'Showcase', 'Vision', 'Display'],
    local: ['Local', 'City', 'Metro', 'Regional', 'Zone'],
    corporate: ['Corporate', 'Business', 'Enterprise', 'Office', 'Company']
  };
  
  const prefix = prefixes[style][Math.floor(Math.random() * 5)];
  const suffix = suffixes[purpose][Math.floor(Math.random() * 5)];
  
  return `${prefix} ${suffix}`;
}

// Générateur de descriptions marketing
function generateMarketingDescription(business, style, purpose) {
  const intros = [
    `Template ${style} ultra-professionnel pour ${business}`,
    `Design ${style} nouvelle génération pour ${business}`,
    `Solution web ${style} premium pour ${business}`,
    `Template ${style} haute performance pour ${business}`
  ];
  
  const features = {
    conversion: 'avec focus sur la conversion et l\'urgence. Parfait pour maximiser les demandes de devis.',
    trust: 'mettant en avant votre expertise et crédibilité. Idéal pour établir la confiance.',
    showcase: 'avec portfolio visuel époustouflant. Parfait pour présenter vos réalisations.',
    local: 'optimisé pour le référencement local. Dominez votre marché géographique.',
    corporate: 'au design professionnel et corporate. Parfait pour les entreprises établies.'
  };
  
  const closings = [
    'Performance optimale garantie.',
    'Compatible tous écrans et navigateurs.',
    'SEO-ready et ultra-rapide.',
    'Prêt pour 2030 et au-delà.'
  ];
  
  const intro = intros[Math.floor(Math.random() * intros.length)];
  const feature = features[purpose];
  const closing = closings[Math.floor(Math.random() * closings.length)];
  
  return `${intro} ${feature} ${closing}`;
}

// Fonction pour générer un UUID simple
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Fonction principale de génération
async function generateUltraTemplates() {
  console.log('🚀 Démarrage de la génération massive de templates ultra-professionnels...\n');
  
  let totalGenerated = 0;
  
  for (const businessType of BUSINESS_TYPES) {
    console.log(`\n📦 Génération pour ${businessType}...`);
    
    for (const style of TEMPLATE_STYLES) {
      for (const purpose of TEMPLATE_PURPOSES) {
        // Sélectionner le pattern approprié
        const patternKey = `${purpose.id}-${purpose.focus}`;
        const pattern = ULTRA_PATTERNS[patternKey] || ULTRA_PATTERNS['trust-authority'];
        
        // Obtenir une palette de couleurs
        const palettes = COLOR_PALETTES[businessType] || COLOR_PALETTES.general;
        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        
        // Créer les blocs avec configuration
        const blocks = pattern.blocks.map((block, index) => ({
          id: generateUUID(),
          type: block.type,
          variant: block.variant,
          props: {
            ...block.config,
            // Placeholders personnalisables
            businessName: '{{businessName}}',
            businessType: '{{businessType}}',
            phone: '{{phone}}',
            email: '{{email}}',
            address: '{{address}}',
            city: '{{city}}'
          },
          position: index
        }));
        
        // Créer le template
        const template = {
          name: generateCreativeName(businessType, style.id, purpose.id),
          description: generateMarketingDescription(businessType, style.id, purpose.id),
          category: businessType,
          blocks: JSON.stringify(blocks),
          theme: JSON.stringify({
            colors: palette,
            fonts: {
              heading: style.id === 'premium' ? 'Playfair Display' : 'Inter',
              body: 'Inter'
            },
            spacing: style.id === 'minimal' ? 'relaxed' : 'normal',
            borderRadius: style.id === 'bold' ? 'small' : 'medium'
          }),
          tags: JSON.stringify([
            businessType,
            style.id,
            purpose.id,
            'ultra-pro',
            '2030-ready'
          ]),
          metadata: JSON.stringify({
            style: style.id,
            purpose: purpose.id,
            performance: blocks.length > 8 ? 'medium' : 'high',
            seoOptimized: true,
            mobileFirst: true,
            accessibility: 90,
            aiGenerated: false
          })
        };
        
        // Sauvegarder en base de données
        try {
          await prisma.template.create({
            data: template
          });
          
          totalGenerated++;
          console.log(`  ✅ ${template.name}`);
        } catch (error) {
          console.error(`  ❌ Erreur pour ${template.name}:`, error.message);
        }
      }
    }
  }
  
  console.log(`\n🎉 Génération terminée ! ${totalGenerated} templates créés.`);
  
  // Générer des variantes supplémentaires
  console.log('\n🔄 Génération de variantes supplémentaires...');
  
  // Variantes spéciales par métier
  const specialVariants = {
    plombier: ['urgence-fuite', 'renovation-sdb', 'eco-responsable'],
    electricien: ['domotique', 'urgence-panne', 'mise-aux-normes'],
    menuisier: ['sur-mesure', 'restauration', 'eco-bois'],
    peintre: ['decoration', 'ravalement', 'artiste'],
    jardinier: ['paysagiste', 'entretien', 'eco-jardin']
  };
  
  for (const [business, variants] of Object.entries(specialVariants)) {
    for (const variant of variants) {
      console.log(`  🎯 Variante spéciale: ${business} - ${variant}`);
      
      // Créer une variante spécialisée basée sur le pattern approprié
      let pattern;
      if (variant.includes('urgence')) {
        pattern = ULTRA_PATTERNS['conversion-urgency'];
      } else if (variant.includes('eco')) {
        pattern = ULTRA_PATTERNS['trust-authority'];
      } else {
        pattern = ULTRA_PATTERNS['visual-portfolio'];
      }
      
      const palettes = COLOR_PALETTES[business] || COLOR_PALETTES.general;
      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      
      const blocks = pattern.blocks.map((block, index) => ({
        id: generateUUID(),
        type: block.type,
        variant: block.variant,
        props: {
          ...block.config,
          businessName: '{{businessName}}',
          businessType: '{{businessType}}',
          phone: '{{phone}}',
          email: '{{email}}',
          address: '{{address}}',
          city: '{{city}}'
        },
        position: index
      }));
      
      const template = {
        name: `${business.charAt(0).toUpperCase() + business.slice(1)} ${variant.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
        description: `Template spécialisé ${variant} pour ${business}. Optimisé pour répondre aux besoins spécifiques.`,
        category: business,
        blocks: JSON.stringify(blocks),
        theme: JSON.stringify({
          colors: palette,
          fonts: {
            heading: 'Inter',
            body: 'Inter'
          },
          spacing: 'normal',
          borderRadius: 'medium'
        }),
        tags: JSON.stringify([
          business,
          variant,
          'specialised',
          'ultra-pro',
          '2030-ready'
        ]),
        metadata: JSON.stringify({
          style: 'special',
          purpose: variant,
          performance: 'high',
          seoOptimized: true,
          mobileFirst: true,
          accessibility: 92,
          aiGenerated: false
        })
      };
      
      try {
        await prisma.template.create({
          data: template
        });
        totalGenerated++;
      } catch (error) {
        console.error(`    ❌ Erreur:`, error.message);
      }
    }
  }
  
  console.log('\n✨ Toutes les variantes ont été générées !');
  console.log(`📊 Total: ${totalGenerated} templates créés`);
  
  await prisma.$disconnect();
}

// Exécuter la génération
generateUltraTemplates().catch(console.error);
// Templates de structure de site par type de métier
// Définit quels blocs utiliser et comment structurer le site selon le business

export interface BusinessTemplate {
  name: string;
  description: string;
  homeBlocks: string[];
  servicePageBlocks: string[];
  localPageBlocks: string[];
  defaultPageBlocks: string[];
  specialPages?: {
    name: string;
    slug: string;
    blocks: string[];
  }[];
  features: string[]; // Caractéristiques spécifiques du métier
  urgency: boolean; // Si le métier nécessite des services d'urgence
  portfolio: boolean; // Si le métier nécessite une galerie de réalisations
}

export const businessTemplates: Record<string, BusinessTemplate> = {
  plumber: {
    name: 'Plombier',
    description: 'Template pour plombier avec focus urgence et intervention rapide',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'CTAV3', 'FeaturesV3', 'TestimonialsV3', 'PricingV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'PricingV3', 'FAQV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'TestimonialsV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Urgence 24/7',
        slug: '/urgence',
        blocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'FeaturesV3', 'ContactV3', 'FooterV3']
      },
      {
        name: 'Dépannage',
        slug: '/depannage',
        blocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'PricingV3', 'CTAV3', 'FooterV3']
      }
    ],
    features: ['intervention-rapide', 'urgence-24h', 'devis-gratuit', 'garantie-decennale'],
    urgency: true,
    portfolio: false
  },

  electrician: {
    name: 'Électricien',
    description: 'Template pour électricien avec accent sur sécurité et conformité',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'CTAV3', 'TestimonialsV3', 'PricingV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Mise aux normes',
        slug: '/mise-aux-normes',
        blocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'FAQV3', 'CTAV3', 'FooterV3']
      },
      {
        name: 'Dépannage électrique',
        slug: '/depannage-electrique',
        blocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'ServicesV3', 'PricingV3', 'FooterV3']
      }
    ],
    features: ['certifie-qualifelec', 'diagnostic-gratuit', 'normes-nfc-15-100', 'urgence-disponible'],
    urgency: true,
    portfolio: false
  },

  carpenter: {
    name: 'Menuisier',
    description: 'Template pour menuisier avec portfolio et réalisations',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'FeaturesV3', 'TestimonialsV3', 'CTAV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Réalisations',
        slug: '/realisations',
        blocks: ['HeaderV3', 'HeroV3', 'GalleryV3', 'TestimonialsV3', 'CTAV3', 'FooterV3']
      },
      {
        name: 'Sur mesure',
        slug: '/sur-mesure',
        blocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'GalleryV3', 'ContactV3', 'FooterV3']
      }
    ],
    features: ['sur-mesure', 'bois-certifie', 'finitions-soignees', 'devis-personnalise'],
    urgency: false,
    portfolio: true
  },

  painter: {
    name: 'Peintre',
    description: 'Template pour peintre avec galerie avant/après',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'FeaturesV3', 'TestimonialsV3', 'PricingV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Avant/Après',
        slug: '/avant-apres',
        blocks: ['HeaderV3', 'HeroV3', 'GalleryV3', 'TestimonialsV3', 'CTAV3', 'FooterV3']
      },
      {
        name: 'Devis gratuit',
        slug: '/devis',
        blocks: ['HeaderV3', 'HeroV3', 'PricingV3', 'ContactV3', 'FooterV3']
      }
    ],
    features: ['peintures-eco', 'garantie-finition', 'devis-gratuit', 'conseil-couleurs'],
    urgency: false,
    portfolio: true
  },

  mason: {
    name: 'Maçon',
    description: 'Template pour maçon avec focus travaux et construction',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'GalleryV3', 'TestimonialsV3', 'CTAV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'GalleryV3', 'PricingV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Nos chantiers',
        slug: '/chantiers',
        blocks: ['HeaderV3', 'HeroV3', 'GalleryV3', 'ContentV3', 'TestimonialsV3', 'FooterV3']
      },
      {
        name: 'Extension & Rénovation',
        slug: '/extension-renovation',
        blocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'GalleryV3', 'CTAV3', 'FooterV3']
      }
    ],
    features: ['garantie-decennale', 'etude-gratuite', 'respect-delais', 'materiaux-qualite'],
    urgency: false,
    portfolio: true
  },

  roofer: {
    name: 'Couvreur',
    description: 'Template pour couvreur avec urgence et expertise toiture',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'CTAV3', 'FeaturesV3', 'GalleryV3', 'TestimonialsV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'CTAV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Urgence toiture',
        slug: '/urgence-toiture',
        blocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'FeaturesV3', 'ContactV3', 'FooterV3']
      },
      {
        name: 'Diagnostic gratuit',
        slug: '/diagnostic',
        blocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'ContactV3', 'FooterV3']
      }
    ],
    features: ['intervention-urgence', 'diagnostic-gratuit', 'garantie-etancheite', 'tous-types-toitures'],
    urgency: true,
    portfolio: true
  },

  tiler: {
    name: 'Carreleur',
    description: 'Template pour carreleur avec galerie et finitions',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'FeaturesV3', 'TestimonialsV3', 'PricingV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'PricingV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Nos réalisations',
        slug: '/realisations',
        blocks: ['HeaderV3', 'HeroV3', 'GalleryV3', 'TestimonialsV3', 'CTAV3', 'FooterV3']
      },
      {
        name: 'Types de carrelage',
        slug: '/types-carrelage',
        blocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'PricingV3', 'FooterV3']
      }
    ],
    features: ['pose-precise', 'joints-parfaits', 'conseil-choix', 'garantie-pose'],
    urgency: false,
    portfolio: true
  },

  locksmith: {
    name: 'Serrurier',
    description: 'Template pour serrurier avec focus urgence et sécurité',
    homeBlocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'ServicesV3', 'FeaturesV3', 'TestimonialsV3', 'PricingV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'ServicesV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Urgence 24/7',
        slug: '/urgence-serrurier',
        blocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'FeaturesV3', 'PricingV3', 'ContactV3', 'FooterV3']
      },
      {
        name: 'Sécurité',
        slug: '/securite',
        blocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'ContentV3', 'CTAV3', 'FooterV3']
      }
    ],
    features: ['urgence-24h-7j', 'ouverture-portes', 'blindage-securite', 'tarifs-transparents'],
    urgency: true,
    portfolio: false
  },

  heatingEngineer: {
    name: 'Chauffagiste',
    description: 'Template pour chauffagiste avec maintenance et urgence',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'CTAV3', 'TestimonialsV3', 'PricingV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FeaturesV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Entretien chaudière',
        slug: '/entretien-chaudiere',
        blocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'PricingV3', 'FAQV3', 'CTAV3', 'FooterV3']
      },
      {
        name: 'Dépannage chauffage',
        slug: '/depannage-chauffage',
        blocks: ['HeaderV3', 'HeroV3', 'CTAV3', 'ServicesV3', 'PricingV3', 'FooterV3']
      }
    ],
    features: ['certifie-rge', 'depannage-rapide', 'contrat-entretien', 'economies-energie'],
    urgency: true,
    portfolio: false
  },

  landscaper: {
    name: 'Paysagiste',
    description: 'Template pour paysagiste avec portfolio jardins',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'FeaturesV3', 'TestimonialsV3', 'CTAV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'PricingV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'GalleryV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'GalleryV3', 'FooterV3'],
    specialPages: [
      {
        name: 'Créations jardins',
        slug: '/creations-jardins',
        blocks: ['HeaderV3', 'HeroV3', 'GalleryV3', 'ContentV3', 'TestimonialsV3', 'CTAV3', 'FooterV3']
      },
      {
        name: 'Entretien espaces verts',
        slug: '/entretien',
        blocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'PricingV3', 'CTAV3', 'FooterV3']
      }
    ],
    features: ['creation-jardins', 'entretien-annuel', 'conseil-plantation', 'arrosage-auto'],
    urgency: false,
    portfolio: true
  },

  // Template par défaut pour autres métiers
  default: {
    name: 'Artisan',
    description: 'Template générique pour artisan',
    homeBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'FeaturesV3', 'TestimonialsV3', 'CTAV3', 'FooterV3'],
    servicePageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'PricingV3', 'CTAV3', 'FooterV3'],
    localPageBlocks: ['HeaderV3', 'HeroV3', 'ServicesV3', 'ContactV3', 'FooterV3'],
    defaultPageBlocks: ['HeaderV3', 'HeroV3', 'ContentV3', 'FooterV3'],
    features: ['devis-gratuit', 'garantie-travaux', 'artisan-qualifie', 'satisfaction-client'],
    urgency: false,
    portfolio: false
  }
};

// Helper pour obtenir les features d'un métier
export function getBusinessFeatures(businessType: string): string[] {
  const template = businessTemplates[businessType] || businessTemplates.default;
  return template.features;
}

// Helper pour savoir si un métier nécessite l'urgence
export function isUrgencyBusiness(businessType: string): boolean {
  const template = businessTemplates[businessType] || businessTemplates.default;
  return template.urgency;
}

// Helper pour savoir si un métier nécessite un portfolio
export function needsPortfolio(businessType: string): boolean {
  const template = businessTemplates[businessType] || businessTemplates.default;
  return template.portfolio;
}
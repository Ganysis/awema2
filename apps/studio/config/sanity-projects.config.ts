/**
 * Configuration centralisée pour les projets Sanity
 * Gère les templates, schémas et configurations selon les métiers
 */

export interface SanityProjectConfig {
  projectId: string;
  dataset: 'production' | 'staging' | 'development';
  apiVersion: string;
  token: string;
  template: string;
  businessType: string;
  domain: string;
  studioUrl: string;
  cdnUrl: string;
  webhooks: string[];
  features: string[];
  schemas: string[];
  createdAt: string;
  lastSync?: string;
  status: 'creating' | 'active' | 'suspended' | 'archived';
}

export interface BusinessTypeConfig {
  name: string;
  displayName: string;
  schemas: string[];
  defaultServices: ServiceTemplate[];
  seoKeywords: string[];
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  templates: TemplateVariant[];
}

export interface ServiceTemplate {
  name: string;
  category: string;
  description: string;
  pricing: 'fixed' | 'starting' | 'quote' | 'free';
  amount?: number;
  urgency: boolean;
  featured: boolean;
}

export interface TemplateVariant {
  id: string;
  name: string;
  description: string;
  preview: string;
  premium: boolean;
  features: string[];
}

/**
 * Configuration des métiers supportés
 */
export const BUSINESS_TYPES: Record<string, BusinessTypeConfig> = {
  plombier: {
    name: 'plombier',
    displayName: 'Plombier',
    schemas: [
      'client-site',
      'settings',
      'services',
      'testimonials',
      'projects',
      'services-plomberie',
      'urgences-24h',
      'certifications',
      'zones-intervention',
      'tarifs-depannage'
    ],
    defaultServices: [
      {
        name: 'Dépannage urgence 24h/7j',
        category: 'urgence-plomberie',
        description: 'Intervention rapide pour fuites, canalisations bouchées, pannes chauffe-eau',
        pricing: 'starting',
        amount: 80,
        urgency: true,
        featured: true
      },
      {
        name: 'Installation chauffe-eau',
        category: 'installation-plomberie',
        description: 'Installation et remplacement de chauffe-eau électrique, gaz ou thermodynamique',
        pricing: 'starting',
        amount: 200,
        urgency: false,
        featured: true
      },
      {
        name: 'Rénovation salle de bain',
        category: 'renovation-plomberie',
        description: 'Rénovation complète : plomberie, sanitaires, carrelage, douche italienne',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Débouchage canalisations',
        category: 'entretien-plomberie',
        description: 'Débouchage haute pression, inspection caméra, détartrage',
        pricing: 'starting',
        amount: 90,
        urgency: true,
        featured: false
      }
    ],
    seoKeywords: [
      'plombier',
      'dépannage plomberie',
      'installation chauffe-eau',
      'rénovation salle de bain',
      'urgence plomberie',
      'fuite eau',
      'canalisation bouchée'
    ],
    features: [
      'urgency-24h',
      'online-quote',
      'before-after-gallery',
      'certification-display',
      'intervention-zones'
    ],
    colors: {
      primary: '#2563eb', // Bleu professionnel
      secondary: '#1e40af',
      accent: '#3b82f6'
    },
    templates: [
      {
        id: 'plombier-classique',
        name: 'Classique',
        description: 'Template épuré et professionnel',
        preview: '/templates/plombier-classique.jpg',
        premium: false,
        features: ['responsive', 'seo-optimized', 'contact-form']
      },
      {
        id: 'plombier-moderne',
        name: 'Moderne',
        description: 'Design moderne avec animations',
        preview: '/templates/plombier-moderne.jpg',
        premium: true,
        features: ['animations', 'parallax', 'video-background']
      }
    ]
  },

  electricien: {
    name: 'electricien',
    displayName: 'Électricien',
    schemas: [
      'client-site',
      'settings',
      'services',
      'testimonials',
      'projects',
      'services-electricite',
      'domotique',
      'mise-aux-normes',
      'certifications-elec',
      'urgences-electriques'
    ],
    defaultServices: [
      {
        name: 'Installation électrique complète',
        category: 'installation-electricite',
        description: 'Installation et rénovation de tableaux électriques aux normes NF C 15-100',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Domotique connectée',
        category: 'domotique',
        description: 'Installation de systèmes domotiques : éclairage, volets, chauffage connectés',
        pricing: 'starting',
        amount: 300,
        urgency: false,
        featured: true
      },
      {
        name: 'Dépannage électrique urgence',
        category: 'depannage-electricite',
        description: 'Intervention rapide pour pannes électriques, court-circuits, disjoncteurs',
        pricing: 'starting',
        amount: 90,
        urgency: true,
        featured: true
      },
      {
        name: 'Mise aux normes',
        category: 'normes-electricite',
        description: 'Mise en conformité installation électrique selon NF C 15-100',
        pricing: 'quote',
        urgency: false,
        featured: false
      }
    ],
    seoKeywords: [
      'électricien',
      'installation électrique',
      'domotique',
      'tableau électrique',
      'mise aux normes',
      'dépannage électricité',
      'NF C 15-100'
    ],
    features: [
      'urgency-24h',
      'smart-home-showcase',
      'certification-display',
      'before-after-gallery',
      'quote-calculator'
    ],
    colors: {
      primary: '#f59e0b', // Orange électricien
      secondary: '#d97706',
      accent: '#fbbf24'
    },
    templates: [
      {
        id: 'electricien-pro',
        name: 'Professionnel',
        description: 'Template axé sur les certifications',
        preview: '/templates/electricien-pro.jpg',
        premium: false,
        features: ['certifications-slider', 'service-calculator']
      },
      {
        id: 'electricien-smart',
        name: 'Smart Home',
        description: 'Spécialisé domotique et maison connectée',
        preview: '/templates/electricien-smart.jpg',
        premium: true,
        features: ['interactive-demo', '3d-visualization']
      }
    ]
  },

  menuisier: {
    name: 'menuisier',
    displayName: 'Menuisier',
    schemas: [
      'client-site',
      'settings',
      'services',
      'testimonials',
      'projects',
      'services-menuiserie',
      'materiaux',
      'realisations',
      'sur-mesure',
      'garanties'
    ],
    defaultServices: [
      {
        name: 'Aménagement sur-mesure',
        category: 'sur-mesure',
        description: 'Conception et fabrication de meubles sur-mesure : placards, bibliothèques, cuisines',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Rénovation parquet',
        category: 'renovation-menuiserie',
        description: 'Pose, rénovation et vitrification de parquets massifs et contrecollés',
        pricing: 'starting',
        amount: 45,
        urgency: false,
        featured: true
      },
      {
        name: 'Menuiserie extérieure',
        category: 'menuiserie-exterieure',
        description: 'Terrasses bois, pergolas, clôtures, bardages et aménagements extérieurs',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Dépannage menuiserie',
        category: 'depannage-menuiserie',
        description: 'Réparation portes, fenêtres, serrures, ajustements',
        pricing: 'starting',
        amount: 80,
        urgency: true,
        featured: false
      }
    ],
    seoKeywords: [
      'menuisier',
      'aménagement sur-mesure',
      'parquet',
      'terrasse bois',
      'menuiserie extérieure',
      'placards',
      'rénovation bois'
    ],
    features: [
      'portfolio-gallery',
      'material-showcase',
      'custom-quote-form',
      '3d-preview',
      'wood-calculator'
    ],
    colors: {
      primary: '#92400e', // Brun bois
      secondary: '#78350f',
      accent: '#a16207'
    },
    templates: [
      {
        id: 'menuisier-artisan',
        name: 'Artisan',
        description: 'Template chaleureux avec focus sur le savoir-faire',
        preview: '/templates/menuisier-artisan.jpg',
        premium: false,
        features: ['wood-textures', 'craft-showcase']
      },
      {
        id: 'menuisier-premium',
        name: 'Premium',
        description: 'Haut de gamme avec galerie interactive',
        preview: '/templates/menuisier-premium.jpg',
        premium: true,
        features: ['360-gallery', 'material-visualizer']
      }
    ]
  },

  paysagiste: {
    name: 'paysagiste',
    displayName: 'Paysagiste',
    schemas: [
      'client-site',
      'settings',
      'services',
      'testimonials',
      'projects',
      'services-paysagisme',
      'jardins',
      'espaces-verts',
      'entretien',
      'plantations'
    ],
    defaultServices: [
      {
        name: 'Création de jardins',
        category: 'creation-jardins',
        description: 'Conception et réalisation de jardins paysagers, massifs, allées',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Entretien espaces verts',
        category: 'entretien-jardins',
        description: 'Tonte, taille, désherbage, traitement, entretien annuel',
        pricing: 'starting',
        amount: 35,
        urgency: false,
        featured: true
      },
      {
        name: 'Élagage et abattage',
        category: 'elagage',
        description: 'Élagage, taille sanitaire, abattage sécurisé, évacuation',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Arrosage automatique',
        category: 'arrosage',
        description: 'Installation systèmes d\'arrosage automatique, programmateurs',
        pricing: 'starting',
        amount: 500,
        urgency: false,
        featured: false
      }
    ],
    seoKeywords: [
      'paysagiste',
      'création jardin',
      'entretien espaces verts',
      'élagage',
      'arrosage automatique',
      'aménagement extérieur',
      'jardinier'
    ],
    features: [
      'seasonal-gallery',
      'plant-database',
      'garden-visualizer',
      'maintenance-calendar',
      'quote-by-area'
    ],
    colors: {
      primary: '#16a34a', // Vert nature
      secondary: '#15803d',
      accent: '#22c55e'
    },
    templates: [
      {
        id: 'paysagiste-nature',
        name: 'Nature',
        description: 'Template vert avec focus sur les plantes',
        preview: '/templates/paysagiste-nature.jpg',
        premium: false,
        features: ['plant-carousel', 'seasonal-colors']
      },
      {
        id: 'paysagiste-luxury',
        name: 'Luxury Gardens',
        description: 'Haut de gamme pour jardins d\'exception',
        preview: '/templates/paysagiste-luxury.jpg',
        premium: true,
        features: ['drone-videos', 'vr-garden-tour']
      }
    ]
  },

  macon: {
    name: 'macon',
    displayName: 'Maçon',
    schemas: [
      'client-site',
      'settings',
      'services',
      'testimonials',
      'projects',
      'services-maconnerie',
      'gros-oeuvre',
      'renovations',
      'extensions',
      'terrassement'
    ],
    defaultServices: [
      {
        name: 'Extension maison',
        category: 'extension',
        description: 'Extensions, surélévations, agrandissements de maisons',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Rénovation façade',
        category: 'facade',
        description: 'Ravalement, isolation extérieure, enduits, peinture façade',
        pricing: 'quote',
        urgency: false,
        featured: true
      },
      {
        name: 'Terrassement',
        category: 'terrassement',
        description: 'Excavation, nivellement, fondations, VRD',
        pricing: 'starting',
        amount: 50,
        urgency: false,
        featured: true
      },
      {
        name: 'Création ouvertures',
        category: 'ouverture',
        description: 'Percement murs porteurs, fenêtres, portes, baies vitrées',
        pricing: 'quote',
        urgency: false,
        featured: false
      }
    ],
    seoKeywords: [
      'maçon',
      'extension maison',
      'rénovation façade',
      'terrassement',
      'gros œuvre',
      'construction',
      'ravalement'
    ],
    features: [
      'project-timeline',
      'construction-phases',
      'material-calculator',
      'permit-assistance',
      'progress-tracking'
    ],
    colors: {
      primary: '#6b7280', // Gris béton
      secondary: '#4b5563',
      accent: '#9ca3af'
    },
    templates: [
      {
        id: 'macon-construction',
        name: 'Construction',
        description: 'Template robuste axé sur la construction',
        preview: '/templates/macon-construction.jpg',
        premium: false,
        features: ['construction-timeline', 'material-showcase']
      },
      {
        id: 'macon-renovation',
        name: 'Rénovation',
        description: 'Spécialisé dans la rénovation et l\'extension',
        preview: '/templates/macon-renovation.jpg',
        premium: true,
        features: ['before-after-slider', '3d-modeling']
      }
    ]
  }
};

/**
 * Configuration des templates disponibles
 */
export const TEMPLATE_CONFIGS = {
  'classique': {
    name: 'Classique',
    description: 'Template épuré et professionnel',
    features: ['responsive', 'seo-optimized', 'contact-form'],
    premium: false
  },
  'moderne': {
    name: 'Moderne',
    description: 'Design moderne avec animations',
    features: ['animations', 'parallax', 'video-background'],
    premium: true
  },
  'premium': {
    name: 'Premium',
    description: 'Template haut de gamme avec fonctionnalités avancées',
    features: ['advanced-gallery', 'booking-system', 'live-chat'],
    premium: true
  }
};

/**
 * Configuration des schémas de base (communs à tous les métiers)
 */
export const BASE_SCHEMAS = [
  'client-site',
  'settings',
  'services',
  'testimonials',
  'projects',
  'navigation',
  'seo-config',
  'blockContent'
];

/**
 * Configuration des webhooks par défaut
 */
export const DEFAULT_WEBHOOKS = [
  'content-update',
  'site-rebuild',
  'seo-sync',
  'analytics-update'
];

/**
 * Configuration des fonctionnalités disponibles
 */
export const AVAILABLE_FEATURES = {
  'urgency-24h': {
    name: 'Service d\'urgence 24h/7j',
    description: 'Affichage prominant du service d\'urgence',
    businessTypes: ['plombier', 'electricien', 'chauffagiste']
  },
  'online-quote': {
    name: 'Devis en ligne',
    description: 'Formulaire de devis intelligent',
    businessTypes: ['all']
  },
  'portfolio-gallery': {
    name: 'Galerie de réalisations',
    description: 'Galerie photo interactive des projets',
    businessTypes: ['all']
  },
  'certification-display': {
    name: 'Affichage certifications',
    description: 'Showcase des certifications et labels',
    businessTypes: ['all']
  },
  'booking-system': {
    name: 'Système de réservation',
    description: 'Réservation de créneaux en ligne',
    businessTypes: ['all']
  }
};

/**
 * Utilitaires de configuration
 */
export class SanityProjectConfigManager {
  static getBusinessConfig(businessType: string): BusinessTypeConfig | null {
    return BUSINESS_TYPES[businessType.toLowerCase()] || null;
  }

  static getSchemasForBusiness(businessType: string): string[] {
    const config = this.getBusinessConfig(businessType);
    return config ? config.schemas : BASE_SCHEMAS;
  }

  static getDefaultServices(businessType: string): ServiceTemplate[] {
    const config = this.getBusinessConfig(businessType);
    return config ? config.defaultServices : [];
  }

  static getTemplatesForBusiness(businessType: string): TemplateVariant[] {
    const config = this.getBusinessConfig(businessType);
    return config ? config.templates : [];
  }

  static getFeaturesForBusiness(businessType: string): string[] {
    const config = this.getBusinessConfig(businessType);
    return config ? config.features : [];
  }

  static getColorsForBusiness(businessType: string): { primary: string; secondary: string; accent: string } {
    const config = this.getBusinessConfig(businessType);
    return config ? config.colors : {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6'
    };
  }

  static getSEOKeywords(businessType: string): string[] {
    const config = this.getBusinessConfig(businessType);
    return config ? config.seoKeywords : [];
  }

  static validateProjectConfig(config: Partial<SanityProjectConfig>): string[] {
    const errors: string[] = [];

    if (!config.businessType || !BUSINESS_TYPES[config.businessType]) {
      errors.push('Type de métier invalide ou manquant');
    }

    if (!config.domain || !config.domain.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)) {
      errors.push('Nom de domaine invalide');
    }

    if (!config.template) {
      errors.push('Template manquant');
    }

    return errors;
  }

  static generateProjectId(businessName: string): string {
    const slug = businessName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);

    const timestamp = Date.now().toString(36);
    return `${slug}-${timestamp}`;
  }
}

export default SanityProjectConfigManager;
/**
 * Configuration pour le générateur de mockups Netlify
 * AWEMA 3.0 - Système de mockups ThemeFisher
 */

import { TemplateConfig, MockupConfig, BusinessType, ColorMapping } from '../types/mockup.types';

// Mapping des couleurs par métier artisan
export const BUSINESS_COLORS = {
  plombier: {
    primary: '#1e40af', // Bleu professionnel
    secondary: '#3b82f6',
    accent: '#60a5fa'
  },
  electricien: {
    primary: '#f59e0b', // Jaune/Orange électricité
    secondary: '#fbbf24',
    accent: '#fcd34d'
  },
  paysagiste: {
    primary: '#059669', // Vert nature
    secondary: '#10b981',
    accent: '#34d399'
  },
  menuisier: {
    primary: '#92400e', // Marron bois
    secondary: '#b45309',
    accent: '#d97706'
  },
  peintre: {
    primary: '#7c3aed', // Violet créatif
    secondary: '#8b5cf6',
    accent: '#a78bfa'
  },
  maçon: {
    primary: '#6b7280', // Gris pierre
    secondary: '#9ca3af',
    accent: '#d1d5db'
  },
  couvreur: {
    primary: '#dc2626', // Rouge toit
    secondary: '#ef4444',
    accent: '#f87171'
  },
  chauffagiste: {
    primary: '#ea580c', // Orange chaleur
    secondary: '#f97316',
    accent: '#fb923c'
  },
  serrurier: {
    primary: '#374151', // Gris métal
    secondary: '#4b5563',
    accent: '#6b7280'
  },
  vitrier: {
    primary: '#0891b2', // Bleu clair vitre
    secondary: '#0ea5e9',
    accent: '#38bdf8'
  },
  carreleur: {
    primary: '#be185d', // Rose carrelage
    secondary: '#db2777',
    accent: '#ec4899'
  },
  jardinier: {
    primary: '#16a34a', // Vert jardin
    secondary: '#22c55e',
    accent: '#4ade80'
  },
  autre: {
    primary: '#4f46e5', // Violet par défaut
    secondary: '#6366f1',
    accent: '#8b5cf6'
  }
};

// Configuration des couleurs communes pour tous les templates
export const COLOR_MAPPINGS: ColorMapping[] = [
  {
    cssVariable: '--primary-color',
    defaultValue: '#4f46e5',
    description: 'Couleur principale du thème'
  },
  {
    cssVariable: '--secondary-color',
    defaultValue: '#6366f1',
    description: 'Couleur secondaire'
  },
  {
    cssVariable: '--accent-color',
    defaultValue: '#8b5cf6',
    description: 'Couleur d\'accent pour les boutons'
  },
  {
    cssVariable: '--text-primary',
    defaultValue: '#1f2937',
    description: 'Couleur du texte principal'
  },
  {
    cssVariable: '--text-secondary',
    defaultValue: '#6b7280',
    description: 'Couleur du texte secondaire'
  },
  {
    cssVariable: '--bg-primary',
    defaultValue: '#ffffff',
    description: 'Couleur de fond principale'
  },
  {
    cssVariable: '--bg-secondary',
    defaultValue: '#f9fafb',
    description: 'Couleur de fond secondaire'
  }
];

// Templates ThemeFisher disponibles
export const AVAILABLE_TEMPLATES: TemplateConfig[] = [
  {
    name: 'sydney',
    displayName: 'Sydney - Moderne & Élégant',
    description: 'Template moderne avec animations fluides et design premium',
    category: 'premium',
    baseDirectory: '/templates/sydney',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    colorMappings: COLOR_MAPPINGS,
    supportedBusiness: ['plombier', 'electricien', 'menuisier', 'autre']
  },
  {
    name: 'nextspace',
    displayName: 'NextSpace - Tech & Innovation',
    description: 'Design moderne orienté technologie et innovation',
    category: 'modern',
    baseDirectory: '/templates/nextspace',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    colorMappings: COLOR_MAPPINGS,
    supportedBusiness: ['electricien', 'domotique', 'tech', 'autre']
  },
  {
    name: 'locomotive',
    displayName: 'Locomotive - Puissant & Professionnel',
    description: 'Template robuste pour artisans professionnels',
    category: 'classic',
    baseDirectory: '/templates/locomotive',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    colorMappings: COLOR_MAPPINGS,
    supportedBusiness: ['paysagiste', 'menuisier', 'maçon', 'couvreur', 'autre']
  }
];

// Configuration principale
export const MOCKUP_CONFIG: MockupConfig = {
  netlify: {
    apiToken: process.env.NETLIFY_API_TOKEN || '',
    teamId: process.env.NETLIFY_TEAM_ID,
    defaultTTL: 72 // 3 jours
  },
  templates: {
    baseDirectory: '/home/Ganyc/Desktop/awema/awema2/apps/studio/templates',
    outputDirectory: '/tmp/claude/mockup-builds',
    buildTimeout: 120000 // 2 minutes
  },
  content: {
    useLoremIpsum: true,
    minWordsPerSection: 50,
    maxWordsPerSection: 150
  },
  deployment: {
    retryAttempts: 3,
    retryDelay: 5000,
    cleanupAfterHours: 72
  }
};

// Templates de contenu Lorem Ipsum par section
export const LOREM_CONTENT = {
  hero: {
    title: '{businessName} - Votre Expert {businessType}',
    subtitle: 'Service professionnel de qualité depuis plus de 10 ans dans la région de {location}',
    cta: 'Demandez un devis gratuit'
  },
  about: {
    title: 'Qui sommes-nous ?',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  services: {
    title: 'Nos Services',
    items: [
      'Service de qualité professionnelle',
      'Intervention rapide et efficace',
      'Devis gratuit et transparent',
      'Garantie sur tous nos travaux'
    ]
  },
  contact: {
    title: 'Contactez-nous',
    description: 'N\'hésitez pas à nous contacter pour tous vos besoins',
    phone: '{phone}',
    email: '{email}',
    address: '{location}'
  }
};

// Configuration des templates par défaut
export const DEFAULT_TEMPLATE_SELECTION = ['sydney', 'nextspace', 'locomotive'];

// Fonction utilitaire pour obtenir les couleurs d'un métier
export function getBusinessColors(businessType: BusinessType) {
  return BUSINESS_COLORS[businessType] || BUSINESS_COLORS.autre;
}

// Fonction utilitaire pour obtenir les templates compatibles avec un métier
export function getCompatibleTemplates(businessType: BusinessType): TemplateConfig[] {
  return AVAILABLE_TEMPLATES.filter(template =>
    template.supportedBusiness.includes(businessType) ||
    template.supportedBusiness.includes('autre')
  );
}

// Validation de la configuration
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!MOCKUP_CONFIG.netlify.apiToken) {
    errors.push('NETLIFY_API_TOKEN est requis');
  }

  if (AVAILABLE_TEMPLATES.length === 0) {
    errors.push('Au moins un template doit être configuré');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
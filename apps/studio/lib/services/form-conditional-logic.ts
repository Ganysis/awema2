// Logique conditionnelle pour le formulaire ultra-complet

import { ClientFormUltra } from '@/types/client-form-ultra';

export interface ConditionalRule {
  condition: (data: Partial<ClientFormUltra>) => boolean;
  showFields?: string[];
  hideFields?: string[];
  requiredFields?: string[];
  optionalFields?: string[];
  suggestions?: string[];
}

// Règles conditionnelles par type de métier
export const FORM_CONDITIONAL_RULES: ConditionalRule[] = [
  // ===== RÈGLES PLOMBIER =====
  {
    condition: (data) => data.businessType === 'plombier',
    showFields: [
      'gasLicense',
      'heatingSpecialties',
      'emergencyEquipment',
      'waterTreatmentKnowledge'
    ],
    suggestions: [
      'Mentionnez vos certifications gaz (PGN/PGP)',
      'Précisez les marques de chaudières que vous entretenez',
      'Indiquez si vous intervenez sur les pompes à chaleur'
    ]
  },
  {
    condition: (data) => data.businessType === 'plombier' && data.availability?.is24x7 === true,
    requiredFields: ['emergencyResponseTime', 'emergencySurcharge'],
    showFields: ['emergencyAreas', 'nightTeam'],
    suggestions: ['Détaillez votre processus d\'intervention urgente']
  },

  // ===== RÈGLES ÉLECTRICIEN =====
  {
    condition: (data) => data.businessType === 'electricien',
    showFields: [
      'electricalLicenses',
      'voltageCapabilities',
      'smartHomeExpertise',
      'solarPanelCertification'
    ],
    requiredFields: ['consuelNumber', 'qualifelecNumber'],
    suggestions: [
      'Mentionnez votre habilitation électrique (B1V, B2V, etc.)',
      'Précisez si vous êtes certifié RGE pour les panneaux solaires',
      'Indiquez votre expertise en domotique'
    ]
  },

  // ===== RÈGLES MENUISIER =====
  {
    condition: (data) => data.businessType === 'menuisier',
    showFields: [
      'woodTypes',
      'workshopSize',
      'machineryList',
      'customDesignCapability',
      'finishingTechniques'
    ],
    suggestions: [
      'Listez les essences de bois que vous travaillez',
      'Mentionnez si vous avez un showroom',
      'Précisez vos capacités de conception 3D'
    ]
  },

  // ===== RÈGLES JARDINIER =====
  {
    condition: (data) => data.businessType === 'jardinier',
    showFields: [
      'seasonalServices',
      'equipmentList',
      'phytosanitaryLicense',
      'compostingService',
      'landscapeDesign'
    ],
    suggestions: [
      'Détaillez vos services par saison',
      'Mentionnez votre approche écologique',
      'Précisez si vous faites de la conception paysagère'
    ]
  },

  // ===== RÈGLES URGENCE 24/7 =====
  {
    condition: (data) => data.availability?.is24x7 === true,
    requiredFields: [
      'emergencyResponseTime',
      'mobilePhone',
      'nightSurcharge',
      'weekendSurcharge'
    ],
    showFields: ['emergencyProtocol', 'backupTeam'],
    suggestions: [
      'Expliquez votre organisation pour les urgences',
      'Précisez vos délais d\'intervention par zone'
    ]
  },

  // ===== RÈGLES ENTREPRISE FAMILIALE =====
  {
    condition: (data) => data.familyBusiness === true,
    showFields: ['familyHistory', 'succession', 'familyMembers'],
    suggestions: [
      'Racontez l\'histoire familiale de l\'entreprise',
      'Mentionnez depuis combien de générations'
    ]
  },

  // ===== RÈGLES GRANDE ÉQUIPE =====
  {
    condition: (data) => data.teamSize === '11-20' || data.teamSize === '20+',
    requiredFields: ['teamMembers', 'organizationChart'],
    showFields: ['departments', 'projectManagement', 'qualityProcess'],
    suggestions: [
      'Détaillez l\'organisation de vos équipes',
      'Mentionnez vos processus qualité'
    ]
  },

  // ===== RÈGLES CERTIFICATIONS =====
  {
    condition: (data) => data.certifications && data.certifications.length > 3,
    showFields: ['certificationGallery', 'qualityPolicy'],
    suggestions: [
      'Mettez en avant vos certifications les plus prestigieuses',
      'Expliquez ce que ces certifications apportent à vos clients'
    ]
  },

  // ===== RÈGLES PORTFOLIO =====
  {
    condition: (data) => data.projects && data.projects.length > 0,
    requiredFields: ['beforeAfterPhotos'],
    showFields: ['projectCategories', 'signatureProjects'],
    suggestions: [
      'Assurez-vous d\'avoir des photos avant/après pour chaque projet',
      'Mettez en avant vos réalisations les plus impressionnantes'
    ]
  },

  // ===== RÈGLES PRIX PREMIUM =====
  {
    condition: (data) => data.pricePositioning === 'premium',
    requiredFields: [
      'uniqueSellingPoint',
      'certifications',
      'guarantees',
      'teamMembers'
    ],
    showFields: ['luxuryServices', 'vipClients', 'exclusivePartners'],
    suggestions: [
      'Justifiez votre positionnement premium',
      'Mettez en avant vos services exclusifs',
      'Détaillez vos garanties exceptionnelles'
    ]
  },

  // ===== RÈGLES SERVICES ÉCOLOGIQUES =====
  {
    condition: (data) => {
      const hasEcoMaterials = data.materials?.some(m => m.ecoFriendly);
      const hasEcoLabels = data.labels?.some(l => l.includes('RGE') || l.includes('eco'));
      return hasEcoMaterials || hasEcoLabels;
    },
    showFields: ['ecoApproach', 'carbonFootprint', 'recyclingPolicy'],
    suggestions: [
      'Détaillez votre démarche écologique',
      'Mentionnez vos partenaires locaux',
      'Expliquez vos économies d\'énergie'
    ]
  }
];

// Fonction pour obtenir les champs à afficher selon les données
export function getVisibleFields(formData: Partial<ClientFormUltra>): Set<string> {
  const visibleFields = new Set<string>();
  const hiddenFields = new Set<string>();
  
  FORM_CONDITIONAL_RULES.forEach(rule => {
    if (rule.condition(formData)) {
      rule.showFields?.forEach(field => visibleFields.add(field));
      rule.hideFields?.forEach(field => hiddenFields.add(field));
    }
  });
  
  // Retirer les champs cachés
  hiddenFields.forEach(field => visibleFields.delete(field));
  
  return visibleFields;
}

// Fonction pour obtenir les champs requis selon les données
export function getRequiredFields(formData: Partial<ClientFormUltra>): Set<string> {
  const requiredFields = new Set<string>();
  
  // Champs toujours requis
  const alwaysRequired = [
    'businessName',
    'businessType',
    'email',
    'phone',
    'yearEstablished',
    'founderStory',
    'uniqueSellingPoint',
    'teamSize',
    'companyValues'
  ];
  
  alwaysRequired.forEach(field => requiredFields.add(field));
  
  // Ajouter les champs conditionnellement requis
  FORM_CONDITIONAL_RULES.forEach(rule => {
    if (rule.condition(formData)) {
      rule.requiredFields?.forEach(field => requiredFields.add(field));
    }
  });
  
  return requiredFields;
}

// Fonction pour obtenir les suggestions contextuelles
export function getContextualSuggestions(formData: Partial<ClientFormUltra>): string[] {
  const suggestions: string[] = [];
  
  FORM_CONDITIONAL_RULES.forEach(rule => {
    if (rule.condition(formData) && rule.suggestions) {
      suggestions.push(...rule.suggestions);
    }
  });
  
  // Suggestions basées sur la complétude
  const completionRate = calculateFormCompletion(formData);
  if (completionRate < 30) {
    suggestions.push('Commencez par remplir les informations de base');
  } else if (completionRate < 60) {
    suggestions.push('N\'oubliez pas d\'ajouter des photos de vos réalisations');
  } else if (completionRate < 80) {
    suggestions.push('Ajoutez des témoignages clients pour renforcer votre crédibilité');
  }
  
  return [...new Set(suggestions)]; // Éliminer les doublons
}

// Fonction pour calculer le taux de complétion
export function calculateFormCompletion(formData: Partial<ClientFormUltra>): number {
  const requiredFields = getRequiredFields(formData);
  let filledRequired = 0;
  
  requiredFields.forEach(field => {
    const value = (formData as any)[field];
    if (value !== undefined && value !== null && value !== '' && 
        (!Array.isArray(value) || value.length > 0)) {
      filledRequired++;
    }
  });
  
  return Math.round((filledRequired / requiredFields.size) * 100);
}

// Validation intelligente des champs
export function validateField(
  fieldName: string, 
  value: any, 
  formData: Partial<ClientFormUltra>
): { isValid: boolean; error?: string; warning?: string } {
  // Validation email
  if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, error: 'Email invalide' };
    }
  }
  
  // Validation téléphone
  if ((fieldName === 'phone' || fieldName === 'mobilePhone') && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
      return { isValid: false, error: 'Numéro de téléphone invalide' };
    }
  }
  
  // Validation SIRET
  if (fieldName === 'siret' && value) {
    const siretClean = value.replace(/\s/g, '');
    if (siretClean.length !== 14 || !/^\d+$/.test(siretClean)) {
      return { isValid: false, error: 'SIRET invalide (14 chiffres requis)' };
    }
  }
  
  // Validation année
  if (fieldName === 'yearEstablished' && value) {
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      return { isValid: false, error: `Année invalide (entre 1900 et ${currentYear})` };
    }
    if (currentYear - year > 50) {
      return { isValid: true, warning: 'Plus de 50 ans d\'expérience ! Mettez-le en avant !' };
    }
  }
  
  // Validation des prix
  if (fieldName.includes('price') || fieldName.includes('Rate')) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      return { isValid: false, error: 'Prix invalide' };
    }
    if (num > 1000) {
      return { isValid: true, warning: 'Prix élevé - assurez-vous de justifier la valeur' };
    }
  }
  
  return { isValid: true };
}

// Suggestions de complétion automatique
export function getFieldSuggestions(fieldName: string, businessType?: string): string[] {
  const suggestions: Record<string, Record<string, string[]>> = {
    companyValues: {
      all: ['Qualité', 'Ponctualité', 'Transparence', 'Écoute', 'Innovation', 'Proximité', 'Fiabilité'],
      plombier: ['Réactivité', 'Propreté', 'Expertise technique'],
      electricien: ['Sécurité', 'Conformité', 'Technologie'],
      menuisier: ['Artisanat', 'Sur-mesure', 'Durabilité'],
      jardinier: ['Respect de la nature', 'Créativité', 'Saisonnalité']
    },
    guarantees: {
      all: ['Devis gratuit', 'Garantie décennale', 'Satisfaction garantie', 'SAV réactif'],
      plombier: ['Intervention 30min', 'Pas de supplément déplacement', 'Garantie pièces 2 ans'],
      electricien: ['Mise aux normes garantie', 'Diagnostic gratuit', 'Garantie installation 5 ans']
    },
    certifications: {
      plombier: ['RGE', 'Qualibat', 'PGN', 'PGP', 'QualiPAC'],
      electricien: ['Qualifelec', 'RGE', 'IRVE', 'Consuel'],
      menuisier: ['Qualibat', 'Label Artisan', 'PEFC', 'FSC'],
      jardinier: ['Certiphyto', 'Label EcoJardin', 'QualiPaysage']
    }
  };
  
  const fieldSuggestions = suggestions[fieldName];
  if (!fieldSuggestions) return [];
  
  const allSuggestions = fieldSuggestions.all || [];
  const typeSuggestions = businessType && fieldSuggestions[businessType] ? fieldSuggestions[businessType] : [];
  
  return [...new Set([...allSuggestions, ...typeSuggestions])];
}
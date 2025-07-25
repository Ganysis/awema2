// Types pour le formulaire client ultra-complet

export interface ClientFormUltra {
  // ===== SECTION 1: INFORMATIONS DE BASE =====
  businessName: string;
  businessType: 'plombier' | 'electricien' | 'menuisier' | 'jardinier' | 'carreleur' | 'peintre' | 'macon' | 'couvreur' | 'serrurier' | 'chauffagiste';
  legalStatus: 'auto-entrepreneur' | 'sarl' | 'sas' | 'eurl' | 'artisan' | 'autre';
  siret: string;
  email: string;
  phone: string;
  mobilePhone?: string;
  
  // ===== SECTION 2: HISTOIRE & IDENTITÉ =====
  yearEstablished: number;
  founderStory: string; // "Comment avez-vous démarré cette activité ?"
  previousExperience: string; // "Quelle était votre expérience avant ?"
  companyValues: string[]; // 3-5 valeurs (ex: "Qualité", "Ponctualité", "Transparence")
  uniqueSellingPoint: string; // "Qu'est-ce qui vous différencie de vos concurrents ?"
  teamSize: 'solo' | '2-5' | '6-10' | '11-20' | '20+';
  familyBusiness: boolean;
  
  // ===== SECTION 3: ÉQUIPE & COMPÉTENCES =====
  teamMembers: Array<{
    name: string;
    role: string;
    experience: string;
    photo?: File;
    specialties: string[];
  }>;
  languages: string[]; // Langues parlées
  
  // ===== SECTION 4: CERTIFICATIONS & GARANTIES =====
  certifications: Array<{
    name: string;
    year: number;
    number?: string;
    file?: File; // PDF ou image du certificat
  }>;
  insurances: {
    decennale: boolean;
    decennaleNumber?: string;
    rcPro: boolean;
    rcProNumber?: string;
    otherInsurances?: string[];
  };
  labels: string[]; // RGE, Qualibat, Handibat, etc.
  guarantees: string[]; // "Satisfaction garantie", "Devis gratuit", etc.
  
  // ===== SECTION 5: SERVICES DÉTAILLÉS =====
  services: Array<{
    name: string;
    description: string;
    priceRange: {
      min: number;
      max: number;
      unit: 'hour' | 'day' | 'project' | 'm2' | 'ml';
    };
    duration: string; // "2-3 heures", "1 journée", etc.
    isSpecialty: boolean;
    requiredTools?: string[];
  }>;
  
  // ===== SECTION 6: ZONES & DISPONIBILITÉ =====
  mainAddress: {
    street: string;
    city: string;
    postalCode: string;
    department: string;
    showOnWebsite: boolean;
  };
  serviceAreas: Array<{
    city: string;
    postalCode: string;
    maxDistance: number; // en km
    surcharge?: number; // % ou € fixe
  }>;
  availability: {
    is24x7: boolean;
    regularHours: {
      monday: { start: string; end: string; closed: boolean };
      tuesday: { start: string; end: string; closed: boolean };
      wednesday: { start: string; end: string; closed: boolean };
      thursday: { start: string; end: string; closed: boolean };
      friday: { start: string; end: string; closed: boolean };
      saturday: { start: string; end: string; closed: boolean };
      sunday: { start: string; end: string; closed: boolean };
    };
    holidayAvailability: boolean;
    emergencyResponseTime: '30min' | '1h' | '2h' | '4h' | 'same-day' | 'next-day';
  };
  
  // ===== SECTION 7: TARIFICATION & PAIEMENT =====
  pricing: {
    hourlyRate?: number;
    minimumCharge?: number;
    freeQuote: boolean;
    freeTravel: boolean;
    travelCostPerKm?: number;
    emergencySurcharge?: number; // % supplémentaire
    weekendSurcharge?: number;
    nightSurcharge?: number;
  };
  paymentMethods: ('cash' | 'check' | 'card' | 'transfer' | 'paypal' | 'payment-plan')[];
  paymentTerms: 'immediate' | '30-days' | '50-50' | 'custom';
  invoicing: {
    immediateInvoice: boolean;
    digitalInvoice: boolean;
    vatRate: number;
  };
  
  // ===== SECTION 8: PORTFOLIO & RÉALISATIONS =====
  projects: Array<{
    title: string;
    description: string;
    duration: string;
    budget: string;
    category: string;
    beforePhotos: File[];
    afterPhotos: File[];
    clientTestimonial?: string;
    challenges?: string;
    solutions?: string;
    date: Date;
  }>;
  totalProjectsCompleted: number;
  averageProjectValue: string;
  specialtyProjects: string[]; // Types de projets spécialisés
  
  // ===== SECTION 9: CLIENTS & TÉMOIGNAGES =====
  clientTypes: ('individuals' | 'businesses' | 'public' | 'associations')[];
  typicalClientProfile: string; // Description du client type
  testimonials: Array<{
    clientName: string;
    clientTitle?: string;
    company?: string;
    service: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    date: Date;
    photo?: File;
    videoUrl?: string;
    projectPhotos?: File[];
  }>;
  googleReviewsUrl?: string;
  facebookPageUrl?: string;
  trustedProUrl?: string;
  
  // ===== SECTION 10: MATÉRIAUX & PARTENAIRES =====
  preferredBrands: string[]; // Marques avec lesquelles vous travaillez
  suppliers: Array<{
    name: string;
    type: string;
    partnership: boolean;
    discount?: string;
  }>;
  materials: Array<{
    type: string;
    brands: string[];
    ecoFriendly: boolean;
    origin: 'local' | 'france' | 'europe' | 'other';
  }>;
  
  // ===== SECTION 11: OUTILS & ÉQUIPEMENTS =====
  equipment: Array<{
    name: string;
    brand: string;
    specialty: boolean;
  }>;
  vehicles: Array<{
    type: string;
    branded: boolean;
    equipped: boolean;
  }>;
  
  // ===== SECTION 12: MARKETING & COMMUNICATION =====
  existingWebsite?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  logo?: File;
  brandColors?: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  slogan?: string;
  marketingBudget?: 'none' | '<500' | '500-1000' | '1000-2000' | '2000+';
  
  // ===== SECTION 13: CONCURRENCE & POSITIONNEMENT =====
  mainCompetitors: string[]; // Noms des concurrents principaux
  competitiveAdvantages: string[]; // Vos avantages
  pricePositioning: 'budget' | 'standard' | 'premium';
  targetMarketShare?: string;
  
  // ===== SECTION 14: OBJECTIFS & CROISSANCE =====
  businessGoals: string[]; // Objectifs à court/moyen terme
  expansionPlans?: string; // Plans de développement
  hiringPlans: boolean;
  newServicesPlanned?: string[];
  
  // ===== SECTION 15: DÉFIS & BESOINS =====
  currentChallenges: string[]; // Défis actuels de l'entreprise
  websiteExpectations: string[]; // Attentes pour le nouveau site
  leadGenerationNeeds: 'low' | 'medium' | 'high' | 'critical';
  monthlyLeadsTarget?: number;
  
  // ===== SECTION 16: PRÉFÉRENCES SITE WEB =====
  stylePreference: 'modern' | 'classic' | 'minimalist' | 'bold' | 'professional' | 'friendly';
  colorPreference: 'bright' | 'dark' | 'neutral' | 'vibrant' | 'pastel';
  inspirationWebsites?: string[]; // Sites qu'ils aiment
  dislikedWebsites?: string[]; // Sites qu'ils n'aiment pas
  mustHaveFeatures: string[]; // Fonctionnalités indispensables
  niceToHaveFeatures: string[]; // Fonctionnalités souhaitées
  
  // ===== SECTION 17: CONTENU ADDITIONNEL =====
  blogTopics?: string[]; // Sujets pour blog
  faqQuestions: Array<{
    question: string;
    answer: string;
  }>;
  legalMentions?: {
    companyFullName: string;
    legalForm: string;
    capital?: string;
    rcsNumber?: string;
    vatNumber?: string;
    headquarters: string;
  };
  
  // ===== SECTION 18: DONNÉES ANALYTICS =====
  currentWebsiteStats?: {
    monthlyVisitors?: number;
    topTrafficSources?: string[];
    conversionRate?: number;
    bounceRate?: number;
  };
  
  // ===== SECTION 19: SAISONNALITÉ =====
  seasonality: {
    highSeason: string[]; // Mois
    lowSeason: string[];
    holidaySchedule?: string; // Fermetures annuelles
  };
  
  // ===== SECTION 20: MÉDIAS =====
  mediaAssets: {
    logoFiles: File[];
    teamPhotos: File[];
    workplacePhotos: File[];
    vehiclePhotos: File[];
    certificationPhotos: File[];
    beforeAfterPhotos: Array<{
      before: File;
      after: File;
      description: string;
    }>;
    videos?: Array<{
      file?: File;
      url?: string;
      title: string;
      description: string;
    }>;
  };
  
  // ===== MÉTADONNÉES =====
  formCompletedAt: Date;
  formCompletionTime: number; // Temps en minutes
  ipAddress?: string;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
  referralSource?: string;
}

// Types pour la progression du formulaire
export interface FormProgress {
  currentStep: number;
  totalSteps: number;
  completedSections: string[];
  skippedSections: string[];
  completionPercentage: number;
  savedAsDraft: boolean;
  lastSavedAt?: Date;
}

// Types pour la validation
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  suggestions: Record<string, string>;
  requiredFieldsMissing: string[];
  optionalFieldsMissing: string[];
}
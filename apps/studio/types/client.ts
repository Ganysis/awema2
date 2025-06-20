export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  priceType: 'fixed' | 'from' | 'quote';
  duration: string;
  guarantee: string;
  images: string[];
}

export interface Schedule {
  [day: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
}

export interface Client {
  id: string;
  // Informations entreprise
  businessName: string;
  legalForm: string;
  siret: string;
  insurance: string;
  yearsExperience: string;
  certifications: string[];
  slogan: string;
  sloganSecondary: string;
  logo: string;
  
  // Coordonnées
  phone: string;
  phoneUrgency: string;
  email: string;
  emailAccounting: string;
  address: string;
  city: string;
  postalCode: string;
  
  // Horaires
  schedule: Schedule;
  
  // Services
  businessType: string;
  services: Service[];
  
  // Zone d'intervention
  interventionCities: string[];
  interventionRadius: string;
  departments: string[];
  travelFees: string;
  
  // Personnalisation
  colorScheme: 'predefined' | 'custom';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  visualStyle: 'modern' | 'classic' | 'industrial' | 'natural';
  typography: string;
  
  // Options
  selectedPages: string[];
  socialMedia: SocialMedia;
  paymentMethods: string[];
  languages: string[];
  emergency247: boolean;
  
  // Métadonnées
  status: 'draft' | 'review' | 'published' | 'maintenance';
  createdAt: string;
  updatedAt: string;
  
  // Médias
  photos: string[];
  videos: string[];
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  photo?: string;
}

export interface FormSubmission {
  id: string;
  clientId: string;
  formType: string;
  data: Record<string, any>;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}
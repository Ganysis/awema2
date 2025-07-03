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

export interface ClientFormData {
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
  schedule: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  
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
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  paymentMethods: string[];
  languages: string[];
  emergency247: boolean;
}

export const businessTypes = [
  { value: 'electricien', label: 'Électricien' },
  { value: 'plombier', label: 'Plombier' },
  { value: 'menuisier', label: 'Menuisier' },
  { value: 'macon', label: 'Maçon' },
  { value: 'peintre', label: 'Peintre' },
  { value: 'carreleur', label: 'Carreleur' },
  { value: 'couvreur', label: 'Couvreur' },
  { value: 'jardinier', label: 'Jardinier / Paysagiste' },
  { value: 'serrurier', label: 'Serrurier' }
];

export const colorSchemes: Record<string, { primary: string; secondary: string; accent: string; }> = {
  electricien: { primary: '#FFA500', secondary: '#1E40AF', accent: '#10B981' },
  plombier: { primary: '#3B82F6', secondary: '#6366F1', accent: '#EF4444' },
  menuisier: { primary: '#92400E', secondary: '#B45309', accent: '#059669' },
  macon: { primary: '#6B7280', secondary: '#DC2626', accent: '#F59E0B' },
  peintre: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#14B8A6' }
};
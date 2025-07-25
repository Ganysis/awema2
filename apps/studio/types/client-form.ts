// Types pour le formulaire client et la génération de site

export interface ClientFormData {
  businessInfo?: {
    companyName: string;
    legalForm?: string;
    siret?: string;
    insurance?: string;
    yearsOfExperience?: string;
    certifications?: string[];
    businessType?: string;
    description?: string;
  };
  
  contact?: {
    phones?: Array<{
      number: string;
      type: 'main' | 'mobile' | 'emergency' | 'fax';
    }>;
    emails?: Array<{
      email: string;
      type: 'contact' | 'accounting' | 'support';
    }>;
    address?: {
      street: string;
      city: string;
      postalCode: string;
      country?: string;
    };
    hours?: any; // Format flexible pour les horaires
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
      tiktok?: string;
    };
  };
  
  services?: {
    mainServices?: Array<{
      name: string;
      description?: string;
      price?: string | number;
      priceType?: 'fixed' | 'from' | 'quote';
      duration?: string;
      guarantee?: string;
      included?: string[];
      images?: string[];
    }>;
  };
  
  serviceArea?: {
    cities?: string[];
    radius?: number;
    departments?: string[];
    travelFees?: string;
  };
  
  branding?: {
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
    visualStyle?: 'modern' | 'classic' | 'industrial' | 'natural';
    typography?: string;
    logo?: string | null;
  };
  
  options?: {
    selectedPages?: string[];
    paymentMethods?: string[];
    languages?: string[];
    emergency247?: boolean;
    analytics?: {
      googleId?: string;
      facebookPixel?: string;
    };
  };
  
  media?: {
    logo?: string | null;
    photos?: Array<{
      src: string;
      title?: string;
      description?: string;
      category?: string;
      alt?: string;
    }>;
    videos?: Array<{
      url: string;
      title?: string;
      platform?: 'youtube' | 'vimeo';
    }>;
  };
  
  pricing?: {
    paymentMethods?: string[];
  };
  
  testimonials?: {
    reviews?: Array<{
      name: string;
      rating?: number;
      comment: string;
      date?: string;
      location?: string;
    }>;
  };
}
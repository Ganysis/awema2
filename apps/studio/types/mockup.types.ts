/**
 * Types pour le système de génération de mockups Netlify
 * AWEMA 3.0 - Générateur de Mockups Premium
 */

export interface MockupResult {
  templateName: string;
  netlifyUrl: string;  // ex: sydney-1234567890.netlify.app
  previewImage: string;
  deploymentId: string;
  status: 'pending' | 'building' | 'ready' | 'error';
  buildTime?: number; // en secondes
  error?: string;
}

export interface MockupGenerationRequest {
  formData: ClientFormData;
  selectedTemplates: TemplateConfig[];
  options?: MockupOptions;
}

export interface ClientFormData {
  businessName: string;
  businessType: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  services?: string[];
  colors?: {
    primary: string;
    secondary: string;
  };
  logo?: string; // URL ou base64
}

export interface TemplateConfig {
  name: string;
  displayName: string;
  description: string;
  category: 'modern' | 'classic' | 'premium' | 'creative';
  baseDirectory: string;
  buildCommand: string;
  outputDirectory: string;
  colorMappings: ColorMapping[];
  supportedBusiness: BusinessType[];
}

export interface ColorMapping {
  cssVariable: string;
  defaultValue: string;
  description: string;
}

export interface MockupOptions {
  includeContact: boolean;
  includePricing: boolean;
  includeGallery: boolean;
  seoOptimized: boolean;
  mobileOptimized: boolean;
  useLoremIpsum: boolean;
  deploymentTTL: number; // en heures
}

export interface NetlifyDeployment {
  id: string;
  url: string;
  state: 'new' | 'building' | 'ready' | 'error';
  created_at: string;
  updated_at: string;
  error_message?: string;
  site_name: string;
}

export interface MockupGenerationResult {
  success: boolean;
  mockups: MockupResult[];
  totalTime: number;
  errors?: string[];
  warnings?: string[];
}

export type BusinessType =
  | 'plombier'
  | 'electricien'
  | 'paysagiste'
  | 'menuisier'
  | 'peintre'
  | 'maçon'
  | 'couvreur'
  | 'chauffagiste'
  | 'serrurier'
  | 'vitrier'
  | 'carreleur'
  | 'jardinier'
  | 'autre';

export interface MockupTemplate {
  id: string;
  name: string;
  displayName: string;
  description: string;
  thumbnail: string;
  category: string;
  features: string[];
  sourceDirectory: string;
  isActive: boolean;
  businessTypes: BusinessType[];
  estimatedBuildTime: number; // en secondes
}

export interface MockupEvent {
  type: 'mockups.generation.started' | 'mockups.generation.progress' | 'mockups.generation.completed' | 'mockups.generation.failed';
  data: {
    requestId: string;
    mockups?: MockupResult[];
    progress?: {
      current: number;
      total: number;
      currentTemplate?: string;
    };
    error?: string;
  };
}

// Configuration globale pour les mockups
export interface MockupConfig {
  netlify: {
    apiToken: string;
    teamId?: string;
    defaultTTL: number; // en heures
  };
  templates: {
    baseDirectory: string;
    outputDirectory: string;
    buildTimeout: number; // en millisecondes
  };
  content: {
    useLoremIpsum: boolean;
    minWordsPerSection: number;
    maxWordsPerSection: number;
  };
  deployment: {
    retryAttempts: number;
    retryDelay: number; // en millisecondes
    cleanupAfterHours: number;
  };
}
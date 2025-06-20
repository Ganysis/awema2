import { Block } from './block';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  variants: TemplateVariant[];
  blocks: string[]; // Block IDs that can be used with this template
  defaultBlocks: DefaultBlock[];
  features: string[];
  industries: string[];
  thumbnail: string;
  screenshots: string[];
  performance: PerformanceMetrics;
}

export interface TemplateVariant {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  colorScheme: ColorSchemePreset;
  layoutStyle: LayoutStyle;
}

export interface DefaultBlock {
  blockId: string;
  order: number;
  props: Record<string, any>;
  variants: string[];
}

export interface ColorSchemePreset {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export enum TemplateCategory {
  BUSINESS = 'business',
  PORTFOLIO = 'portfolio',
  ECOMMERCE = 'ecommerce',
  BLOG = 'blog',
  LANDING = 'landing',
  RESTAURANT = 'restaurant',
  MEDICAL = 'medical',
  EDUCATION = 'education',
  NONPROFIT = 'nonprofit',
  EVENT = 'event'
}

export enum LayoutStyle {
  MODERN = 'modern',
  CLASSIC = 'classic',
  MINIMAL = 'minimal',
  BOLD = 'bold',
  PLAYFUL = 'playful',
  ELEGANT = 'elegant',
  CORPORATE = 'corporate'
}

export interface PerformanceMetrics {
  lighthouseScore: number;
  pageSpeed: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
}

export interface TemplateConfig {
  template: Template;
  variant: TemplateVariant;
  customizations: TemplateCustomization;
  blocks: BlockConfig[];
}

export interface BlockConfig {
  block: Block;
  props: Record<string, any>;
  order: number;
  variants: string[];
}

export interface TemplateCustomization {
  colors: ColorScheme;
  fonts: FontScheme;
  spacing: SpacingScheme;
  borderRadius: string;
  animations: boolean;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
}

export interface FontScheme {
  heading: string;
  body: string;
  mono: string;
  baseSize: string;
  scale: number;
}

export interface SpacingScheme {
  baseUnit: number;
  scale: number;
}
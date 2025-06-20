import { BusinessInfo } from './business';
import { SEOConfig } from './seo';
import { PerformanceConfig } from './performance';
import { BlockInstance } from './block';
import { TemplateCustomization } from './template';

export interface Project {
  id: string;
  name: string;
  domain: string;
  businessInfo: BusinessInfo;
  template: TemplateSelection;
  pages: Page[];
  assets: Asset[];
  seo: SEOConfig;
  performance: PerformanceConfig;
  createdAt: Date;
  updatedAt: Date;
  status: ProjectStatus;
}

export interface Page {
  id: string;
  path: string;
  title: string;
  description: string;
  blocks: BlockInstance[];
  meta: PageMeta;
  isHomePage: boolean;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface Asset {
  id: string;
  type: AssetType;
  path: string;
  originalPath: string;
  optimizedPath?: string;
  size: number;
  optimizedSize?: number;
  mimeType: string;
}

export enum AssetType {
  IMAGE = 'image',
  VIDEO = 'video',
  FONT = 'font',
  DOCUMENT = 'document',
  OTHER = 'other'
}

export enum ProjectStatus {
  DRAFT = 'draft',
  GENERATING = 'generating',
  READY = 'ready',
  PUBLISHED = 'published',
  ERROR = 'error'
}

export interface TemplateSelection {
  templateId: string;
  variant: string;
  customizations: TemplateCustomization;
}



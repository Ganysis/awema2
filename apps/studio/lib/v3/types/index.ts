/**
 * AWEMA V3 - Types Core
 * Architecture ultra-robuste avec validation stricte
 */

import { z } from 'zod';
import type { BlockProp } from '@awema/shared';

// ============= TYPES DE BASE =============

export interface BlockMetadata {
  id: string;
  type: string;
  version: string;
  created: string;
  modified: string;
  createdAt?: string; // Alias pour compatibilité
  updatedAt?: string; // Alias pour compatibilité
  validationStatus: 'valid' | 'invalid' | 'warning';
  validationErrors?: ValidationError[];
  source?: 'v2' | 'v3' | 'manual'; // Source du bloc
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface BlockData<T = any> {
  id: string;
  type: string;
  meta: BlockMetadata;
  data: T;
  cache?: {
    html?: string;
    css?: string;
    js?: string;
    generatedAt?: Date;
  };
}

// ============= RENDER TYPES =============

export interface RenderResult {
  html: string;
  css: string;
  js: string;
  assets: Asset[];
  errors: RenderError[];
  warnings: string[];
  performance?: {
    renderTime: number;
    cssSize: number;
    jsSize: number;
    totalTime?: number;
  };
}

export interface Asset {
  type: 'image' | 'font' | 'icon' | 'video' | 'other';
  path: string;
  content?: Buffer | string;
  url?: string;
  size?: number;
  critical?: boolean;
}

export interface RenderError {
  blockId: string;
  message: string;
  stack?: string;
  fallbackUsed: boolean;
}

// ============= RENDERER INTERFACE =============

export interface BlockRenderer<T = any> {
  type: string;
  version: string;
  
  // Rendu principal
  render(data: T, context?: RenderContext): RenderResult;
  
  // CSS par défaut du bloc
  getDefaultCSS(): string;
  
  // Assets requis
  getRequiredAssets(): Asset[];
  
  // Validation des données
  validate(data: unknown): z.SafeParseReturnType<T, T>;
  
  // Valeurs par défaut
  getDefaultData(): T;
  
  // Preview pour l'éditeur
  renderPreview(data: T): string;
  
  // Props pour l'éditeur
  getBlockProps(): BlockProp[];
}

export interface RenderContext {
  theme?: ThemeV3;
  locale?: string;
  device?: 'desktop' | 'tablet' | 'mobile';
  isEditor?: boolean;
  baseUrl?: string;
  page?: {
    id: string;
    slug: string;
    name: string;
  };
  globalData?: any;
  format?: 'static' | 'nextjs' | 'gatsby' | 'nuxt';
}

// ============= THEME V3 =============

export interface ThemeV3 {
  id: string;
  name: string;
  colors: ColorSystemV3;
  typography: TypographySystemV3;
  spacing: SpacingSystemV3;
  components: ComponentStylesV3;
}

export interface ColorSystemV3 {
  // Couleurs principales
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  
  // Couleurs neutres
  gray: ColorScale;
  
  // Couleurs sémantiques
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  
  // Couleurs de surface
  background: {
    default: string;
    paper: string;
    elevated: string;
  };
  
  // Couleurs de texte
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Main
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface TypographySystemV3 {
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  
  weights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface SpacingSystemV3 {
  unit: number; // Base unit in px
  scale: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    8: number;
    10: number;
    12: number;
    16: number;
    20: number;
    24: number;
    32: number;
    40: number;
    48: number;
    56: number;
    64: number;
  };
}

export interface ComponentStylesV3 {
  button: {
    borderRadius: string;
    padding: { x: string; y: string };
    fontSize: string;
    fontWeight: number;
  };
  
  card: {
    borderRadius: string;
    padding: string;
    shadow: string;
  };
  
  input: {
    borderRadius: string;
    padding: { x: string; y: string };
    borderWidth: string;
  };
}

// ============= EXPORT V3 =============

export interface ExportOptionsV3 {
  format: 'static' | 'nextjs' | 'gatsby' | 'nuxt';
  optimization: {
    minifyHTML: boolean;
    minifyCSS: boolean;
    minifyJS: boolean;
    optimizeImages: boolean;
    inlineCSS: boolean;
    inlineJS: boolean;
    criticalCSS: boolean;
  };
  features: {
    cms: boolean;
    analytics: boolean;
    seo: boolean;
    pwa: boolean;
    sitemap: boolean;
    robots: boolean;
  };
  deployment: {
    platform: 'netlify' | 'vercel' | 'aws' | 'custom';
    config: Record<string, any>;
  };
}

export interface ExportResultV3 {
  success: boolean;
  files: ExportedFile[];
  manifest: ExportManifest;
  report: ExportReport;
  errors: ExportError[];
}

export interface ExportedFile {
  path: string;
  content: string | Buffer;
  type: string;
  size: number;
  encoding: 'utf8' | 'binary';
}

export interface ExportManifest {
  version: string;
  created: Date;
  pages: string[];
  assets: string[];
  totalSize: number;
  checksum: string;
}

export interface ExportReport {
  performance: {
    totalTime: number;
    renderTime: number;
    optimizationTime: number;
    fileWriteTime: number;
  };
  
  sizes: {
    html: number;
    css: number;
    js: number;
    images: number;
    total: number;
  };
  
  optimization: {
    htmlMinified: number;
    cssMinified: number;
    jsMinified: number;
    imagesOptimized: number;
  };
  
  seo: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
}

export interface ExportError {
  type: 'render' | 'optimization' | 'write' | 'validation';
  message: string;
  details?: any;
  blockId?: string;
  file?: string;
}

// ============= RENDER ENGINE TYPES =============

export interface RenderEngineOptions {
  enableCache?: boolean;
  cacheMaxAge?: number;
  enableLogs?: boolean;
  logLevel?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  enableValidation?: boolean;
  enablePerformanceTracking?: boolean;
  maxRenderTime?: number;
}

export interface CacheEntry {
  result: RenderResult;
  timestamp: number;
  hash: string;
}
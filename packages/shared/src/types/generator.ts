import { PerformanceConfig } from './performance';
import { SEOConfig } from './seo';
import { Project, Page, Asset } from './project';

export interface GeneratorConfig {
  outputPath: string;
  baseUrl: string;
  environment: Environment;
  performance: PerformanceConfig;
  seo: SEOConfig;
  analytics?: AnalyticsConfig;
  cdn?: CDNConfig;
  debug: boolean;
}

export interface GeneratorOptions {
  parallel: boolean;
  workers: number;
  cache: boolean;
  cachePath?: string;
  watch: boolean;
  verbose: boolean;
  dryRun: boolean;
}

export interface GeneratorResult {
  success: boolean;
  project: Project;
  outputPath: string;
  files: GeneratedFile[];
  metrics: GeneratorMetrics;
  errors: GeneratorError[];
  warnings: string[];
}

export interface GeneratedFile {
  path: string;
  type: FileType;
  size: number;
  hash: string;
  compressed?: boolean;
  optimized?: boolean;
}

export interface GeneratorMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  filesGenerated: number;
  totalSize: number;
  compressedSize: number;
  performanceScore: number;
  seoScore: number;
}

export interface GeneratorError {
  code: string;
  message: string;
  file?: string;
  line?: number;
  column?: number;
  stack?: string;
}

export interface AnalyticsConfig {
  googleAnalytics?: string;
  googleTagManager?: string;
  facebookPixel?: string;
  customScripts?: AnalyticsScript[];
}

export interface AnalyticsScript {
  id: string;
  code: string;
  position: ScriptPosition;
  async?: boolean;
  defer?: boolean;
}

export interface CDNConfig {
  enabled: boolean;
  provider: CDNProvider;
  baseUrl: string;
  includePaths: string[];
  excludePaths: string[];
  purgeOnDeploy: boolean;
}

export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production'
}

export enum FileType {
  HTML = 'html',
  CSS = 'css',
  JS = 'js',
  IMAGE = 'image',
  FONT = 'font',
  JSON = 'json',
  XML = 'xml',
  OTHER = 'other'
}

export enum ScriptPosition {
  HEAD = 'head',
  BODY_START = 'body_start',
  BODY_END = 'body_end'
}

export enum CDNProvider {
  CLOUDFLARE = 'cloudflare',
  CLOUDFRONT = 'cloudfront',
  FASTLY = 'fastly',
  AKAMAI = 'akamai',
  CUSTOM = 'custom'
}

export interface GeneratorContext {
  project: Project;
  config: GeneratorConfig;
  options: GeneratorOptions;
  cache: Map<string, any>;
  metrics: GeneratorMetrics;
}

export interface GeneratorPlugin {
  name: string;
  version: string;
  hooks: GeneratorHooks;
}

export interface GeneratorHooks {
  beforeGenerate?: (context: GeneratorContext) => Promise<void>;
  afterGenerate?: (context: GeneratorContext, result: GeneratorResult) => Promise<void>;
  beforePage?: (context: GeneratorContext, page: Page) => Promise<void>;
  afterPage?: (context: GeneratorContext, page: Page, html: string) => Promise<string>;
  beforeAsset?: (context: GeneratorContext, asset: Asset) => Promise<void>;
  afterAsset?: (context: GeneratorContext, asset: Asset, content: Buffer) => Promise<Buffer>;
  onError?: (context: GeneratorContext, error: GeneratorError) => Promise<void>;
}
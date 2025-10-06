/**
 * AGENT 8 : Types TypeScript pour le système de déploiement Cloudflare
 *
 * Définitions des types pour les services de déploiement,
 * monitoring, DNS et build.
 */

// Configuration Cloudflare
export interface CloudflareConfig {
  accountId: string;
  apiToken: string;
  zoneId?: string; // Pour les sous-domaines awema.fr
}

// Options de déploiement
export interface DeploymentOptions {
  projectName?: string;
  customDomain?: string;
  buildConfig?: BuildConfig;
  monitoring?: boolean;
  analytics?: boolean;
}

// Résultat de déploiement
export interface DeploymentResult {
  success: boolean;
  projectId: string;
  deploymentId: string;
  url: string;
  customDomain?: string;
  buildTime: number;
  deployTime: number;
  performance: any;
  createdAt: string;
  error?: string;
}

// Configuration de build
export interface BuildConfig {
  buildFlags: string[];
  businessName: string;
  primaryColor: string;
  outputDirectory?: string;
  environmentVariables?: Record<string, string>;
}

// Résultat de build
export interface BuildResult {
  success: boolean;
  buildTime: number;
  outputPath: string;
  archivePath: string;
  archiveSize: number;
  astroConfig: AstroConfig;
  buildOutput: string;
  optimizations: BuildOptimizations;
  performance: BuildPerformance;
  error?: string;
}

// Configuration Astro
export interface AstroConfig {
  site: string;
  output: 'static' | 'server' | 'hybrid';
  adapter: string;
  build: {
    format: 'file' | 'directory';
    assets: string;
  };
  vite: {
    define: Record<string, string>;
    build: any;
    ssr: any;
  };
  integrations: any[];
  image?: {
    service: {
      entrypoint: string;
    };
  };
}

// Optimisations de build
export interface BuildOptimizations {
  minification: boolean;
  compression: 'gzip' | 'brotli';
  imageOptimization: boolean;
  codesplitting: boolean;
  treeshaking: boolean;
}

// Performance du build
export interface BuildPerformance {
  bundleSize: number;
  chunkCount: number;
  assetCount: number;
}

// Configuration DNS
export interface DomainConfig {
  redirectWWW?: boolean;
  useApexDomain?: boolean;
  sslMode?: 'flexible' | 'full' | 'strict';
  cacheRules?: string[];
}

// Enregistrement DNS
export interface DNSRecord {
  id: string;
  type: 'A' | 'CNAME' | 'TXT' | 'MX';
  name: string;
  content: string;
  ttl: number;
  proxied?: boolean;
  createdAt: string;
}

// Résultat DNS
export interface DNSResult {
  success: boolean;
  domain: string;
  subdomain?: string;
  zoneId: string;
  records: DNSRecord[];
  ssl: any;
  cacheRules: any;
  propagationTime: number;
  verificationUrl: string;
  createdAt: string;
  error?: string;
}

// Configuration de monitoring
export interface MonitoringConfig {
  continuousMonitoring: boolean;
  checkInterval: number; // en millisecondes
  alertThreshold: number;
  performanceThreshold: number; // en millisecondes
  seoMinScore: number;
  notificationEndpoints?: string[];
}

// Résultat de health check
export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: HealthCheck[];
  checkedAt: string;
}

// Check individuel
export interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  statusCode?: number;
  responseTime?: number;
  details: string;
}

// Métriques de performance
export interface PerformanceMetrics {
  firstLoadTime: number;
  cachedLoadTime: number;
  improvementRatio?: string;
  contentSize?: number;
  cacheStatus: string;
  cdnDetected: string;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  recommendations: string[];
  measurements?: any[];
  timestamp: string;
  error?: string;
}

// Rapport de monitoring complet
export interface MonitoringReport {
  deploymentId: string;
  url: string;
  monitoring: {
    health: HealthCheckResult;
    performance: PerformanceMetrics;
    ssl: any;
    mobile: any;
    seo: any;
  };
  status: 'healthy' | 'degraded' | 'unhealthy';
  score: number;
  recommendations: string[];
  monitoringSetup: boolean;
  executionTime: number;
  timestamp: string;
}

// Événements de déploiement
export type DeploymentEvent =
  | 'deployment.started'
  | 'deployment.building'
  | 'deployment.deploying'
  | 'deployment.success'
  | 'deployment.failed'
  | 'deployment.cancelled';

// Webhook payload
export interface DeploymentWebhook {
  event: DeploymentEvent;
  project: {
    id: string;
    name: string;
    created_on: string;
  };
  deployment: {
    id: string;
    stage: string;
    url: string;
    created_on: string;
    modified_on: string;
  };
  timestamp: string;
}

// Analytics de déploiement
export interface DeploymentAnalytics {
  projectId: string;
  projectName: string;
  period: '24h' | '7d' | '30d';
  webAnalytics?: {
    pageViews: number;
    uniqueVisitors: number;
    bandwidth: number;
    requests: number;
    threats: number;
    cachedRequests: number;
    cacheRatio: string;
  };
  deploymentMetrics?: {
    totalDeployments: number;
    successfulDeployments: number;
    failedDeployments: number;
    successRate: string;
    averageBuildTime: number;
    lastDeployment: any;
    recentDeployments: any[];
  };
  performance?: {
    responseTime: number;
    status: string;
    statusCode: number;
    ssl: boolean;
    cdn: string;
    lastChecked: string;
  };
  urls: {
    primary: string;
    dashboard: string;
    analytics: string;
    webAnalytics?: string;
  };
  recommendations: string[];
  timestamp: string;
}

// Status de projet
export interface ProjectStatus {
  id: string;
  name: string;
  created_on: string;
  production_branch: string;
  domains: Array<{
    name: string;
    status: string;
    verification_status: string;
    created_on: string;
  }>;
  latest_deployment?: {
    id: string;
    url: string;
    stage: string;
    created_on: string;
    modified_on: string;
  };
}

// Erreurs spécialisées
export class CloudflareDeploymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'CloudflareDeploymentError';
  }
}

export class DNSConfigurationError extends Error {
  constructor(
    message: string,
    public domain: string,
    public details?: any
  ) {
    super(message);
    this.name = 'DNSConfigurationError';
  }
}

export class BuildError extends Error {
  constructor(
    message: string,
    public buildOutput?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'BuildError';
  }
}

export class MonitoringError extends Error {
  constructor(
    message: string,
    public url: string,
    public checkType?: string
  ) {
    super(message);
    this.name = 'MonitoringError';
  }
}

// Utilitaires de types
export type DeploymentStatus = 'pending' | 'building' | 'deploying' | 'success' | 'failed' | 'cancelled';

export type DNSPropagationStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

export type SSLStatus = 'pending' | 'active' | 'expired' | 'error';

export type MonitoringStatus = 'active' | 'paused' | 'error' | 'not_configured';

// Configuration d'environnement
export interface EnvironmentConfig {
  // Sanity
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_VERSION: string;

  // Business (publiques)
  PUBLIC_BUSINESS_NAME: string;
  PUBLIC_BUSINESS_TYPE: string;
  PUBLIC_BUSINESS_PHONE: string;
  PUBLIC_BUSINESS_EMAIL: string;
  PUBLIC_BUSINESS_ADDRESS: string;
  PUBLIC_BUSINESS_CITY: string;

  // Design (publiques)
  PUBLIC_PRIMARY_COLOR: string;
  PUBLIC_SECONDARY_COLOR: string;

  // Build
  NODE_ENV: 'development' | 'production';
  BUILD_TARGET: 'cloudflare-pages' | 'netlify' | 'vercel';
}

// Configuration complète de déploiement
export interface FullDeploymentConfig {
  cloudflare: CloudflareConfig;
  build: BuildConfig;
  domain: DomainConfig;
  monitoring: MonitoringConfig;
  environment: Partial<EnvironmentConfig>;
}

// Réponse API standardisée
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  executionTime?: number;
}

// Log de déploiement
export interface DeploymentLog {
  deploymentId: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  details?: any;
  source: 'build' | 'deploy' | 'dns' | 'monitoring';
}

export default {};
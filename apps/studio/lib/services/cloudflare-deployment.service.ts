/**
 * AGENT 8 : Service de déploiement Cloudflare Pages
 *
 * Service principal pour déployer automatiquement les sites enrichis
 * sur Cloudflare Pages avec configuration complète et monitoring.
 */

import { CloudflareConfig, DeploymentOptions, DeploymentResult } from '../types/deployment';

export class CloudflareDeploymentService {
  private config: CloudflareConfig;
  private baseUrl = 'https://api.cloudflare.com/client/v4';

  constructor(config: CloudflareConfig) {
    this.config = config;
    this.validateConfig();
  }

  private validateConfig(): void {
    if (!this.config.accountId) {
      throw new Error('Cloudflare Account ID is required');
    }
    if (!this.config.apiToken) {
      throw new Error('Cloudflare API Token is required');
    }
  }

  /**
   * Déploie le site Astro enrichi sur Cloudflare Pages
   */
  async deployToCloudflare(
    workflow: any,
    astroProject: any,
    sanityConfig: any
  ): Promise<DeploymentResult> {
    const startTime = Date.now();

    try {
      console.log('🚀 [CloudflareDeployment] Début du déploiement pour:', workflow.businessName);

      // 1. Préparation du projet
      const projectName = this.generateProjectName(workflow.businessName);
      const deployment = await this.prepareDeployment(workflow, sanityConfig, projectName);

      // 2. Création du projet Cloudflare Pages si nécessaire
      const project = await this.ensureCloudflareProject(projectName, deployment.config);

      // 3. Upload du build
      const uploadResult = await this.uploadProjectFiles(project.name, astroProject);

      // 4. Configuration du domaine
      const domainResult = await this.configureDomain(project, workflow);

      // 5. Monitoring post-déploiement
      const healthCheck = await this.performHealthCheck(domainResult.url);

      const totalTime = Date.now() - startTime;

      const result: DeploymentResult = {
        success: true,
        projectId: project.id,
        deploymentId: uploadResult.id,
        url: domainResult.url,
        customDomain: domainResult.customDomain,
        buildTime: uploadResult.buildTime,
        deployTime: totalTime,
        performance: healthCheck,
        createdAt: new Date().toISOString()
      };

      console.log('✅ [CloudflareDeployment] Déploiement réussi:', result.url);

      // Événement de fin
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('deployment.completed', {
          detail: result
        }));
      }

      return result;

    } catch (error) {
      console.error('❌ [CloudflareDeployment] Erreur:', error);
      throw new Error(`Échec du déploiement: ${error.message}`);
    }
  }

  private generateProjectName(businessName: string): string {
    const sanitized = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const timestamp = Date.now().toString().slice(-6);
    return `${sanitized}-${timestamp}`;
  }

  private async prepareDeployment(
    workflow: any,
    sanityConfig: any,
    projectName: string
  ): Promise<{ config: any; envVars: Record<string, string> }> {
    const envVars = {
      SANITY_PROJECT_ID: sanityConfig.projectId,
      SANITY_DATASET: sanityConfig.dataset || 'production',
      SANITY_API_VERSION: sanityConfig.apiVersion || '2023-05-03',
      PUBLIC_BUSINESS_NAME: workflow.businessName,
      PUBLIC_BUSINESS_TYPE: workflow.businessType,
      PUBLIC_BUSINESS_PHONE: workflow.phone || '',
      PUBLIC_BUSINESS_EMAIL: workflow.email || '',
      PUBLIC_BUSINESS_ADDRESS: workflow.address || '',
      PUBLIC_BUSINESS_CITY: workflow.city || '',
      PUBLIC_PRIMARY_COLOR: workflow.primaryColor || '#0066CC',
      PUBLIC_SECONDARY_COLOR: workflow.secondaryColor || '#00AA00',
      NODE_ENV: 'production'
    };

    const config = {
      name: projectName,
      production_branch: 'main',
      build_config: {
        build_command: 'npm run build',
        build_output_directory: 'dist',
        root_dir: '/',
        web_analytics_tag: null,
        web_analytics_token: null
      },
      deployment_configs: {
        production: {
          environment_variables: envVars,
          compatibility_date: '2023-10-30',
          compatibility_flags: ['nodejs_compat'],
          fail_open: true,
          always_use_latest_compatibility_date: false
        }
      }
    };

    return { config, envVars };
  }

  private async ensureCloudflareProject(
    projectName: string,
    config: any
  ): Promise<any> {
    try {
      // Vérifier si le projet existe déjà
      const existingProject = await this.getProject(projectName);
      if (existingProject) {
        console.log('📋 [CloudflareDeployment] Projet existant trouvé:', projectName);
        return existingProject;
      }
    } catch (error) {
      // Le projet n'existe pas, on va le créer
    }

    console.log('🆕 [CloudflareDeployment] Création du projet:', projectName);

    const response = await fetch(`${this.baseUrl}/accounts/${this.config.accountId}/pages/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Échec création projet: ${error.errors?.[0]?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.result;
  }

  private async getProject(projectName: string): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.result;
    }

    return null;
  }

  private async uploadProjectFiles(
    projectName: string,
    astroProject: any
  ): Promise<{ id: string; buildTime: number }> {
    const startTime = Date.now();

    console.log('📦 [CloudflareDeployment] Upload des fichiers...');

    // Créer un FormData avec les fichiers du projet Astro
    const formData = new FormData();

    // Si astroProject contient les fichiers buildés
    if (astroProject.files) {
      Object.entries(astroProject.files).forEach(([path, content]: [string, any]) => {
        const blob = new Blob([content], { type: this.getMimeType(path) });
        formData.append('files', blob, path);
      });
    } else if (astroProject.zipBuffer) {
      // Si on a un buffer ZIP
      formData.append('file', new Blob([astroProject.zipBuffer], { type: 'application/zip' }), 'project.zip');
    }

    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}/deployments`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Échec upload: ${error.errors?.[0]?.message || response.statusText}`);
    }

    const result = await response.json();
    const buildTime = Date.now() - startTime;

    console.log('✅ [CloudflareDeployment] Upload terminé en', buildTime, 'ms');

    return {
      id: result.result.id,
      buildTime
    };
  }

  private getMimeType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'json': 'application/json',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'svg': 'image/svg+xml',
      'ico': 'image/x-icon',
      'txt': 'text/plain',
      'md': 'text/markdown'
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  private async configureDomain(
    project: any,
    workflow: any
  ): Promise<{ url: string; customDomain?: string }> {
    const defaultUrl = `https://${project.name}.pages.dev`;

    // Si le client a un domaine personnalisé
    if (workflow.customDomain) {
      console.log('🌐 [CloudflareDeployment] Configuration domaine personnalisé:', workflow.customDomain);

      try {
        await this.addCustomDomain(project.name, workflow.customDomain);
        return {
          url: `https://${workflow.customDomain}`,
          customDomain: workflow.customDomain
        };
      } catch (error) {
        console.warn('⚠️ [CloudflareDeployment] Échec domaine personnalisé, utilisation du défaut');
      }
    }

    // Sinon, créer un sous-domaine awema.fr
    const subdomain = `${workflow.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.awema.fr`;

    try {
      if (this.config.zoneId) {
        await this.createSubdomain(subdomain, defaultUrl);
        return {
          url: `https://${subdomain}`,
          customDomain: subdomain
        };
      }
    } catch (error) {
      console.warn('⚠️ [CloudflareDeployment] Échec sous-domaine, utilisation du défaut');
    }

    return { url: defaultUrl };
  }

  private async addCustomDomain(projectName: string, domain: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}/domains`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: domain })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Échec ajout domaine: ${error.errors?.[0]?.message || response.statusText}`);
    }
  }

  private async createSubdomain(subdomain: string, target: string): Promise<void> {
    if (!this.config.zoneId) {
      throw new Error('Zone ID requis pour créer des sous-domaines');
    }

    const response = await fetch(
      `${this.baseUrl}/zones/${this.config.zoneId}/dns_records`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'CNAME',
          name: subdomain,
          content: new URL(target).hostname,
          ttl: 1 // Auto TTL
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Échec création sous-domaine: ${error.errors?.[0]?.message || response.statusText}`);
    }
  }

  private async performHealthCheck(url: string): Promise<any> {
    console.log('🏥 [CloudflareDeployment] Health check:', url);

    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-cache'
      });

      const responseTime = Date.now() - startTime;

      return {
        status: response.ok ? 'healthy' : 'unhealthy',
        statusCode: response.status,
        responseTime,
        ssl: url.startsWith('https://'),
        headers: Object.fromEntries(response.headers.entries())
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        responseTime: Date.now() - startTime
      };
    }
  }

  /**
   * Obtient le statut d'un déploiement
   */
  async getDeploymentStatus(projectName: string, deploymentId: string): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}/deployments/${deploymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur récupération statut: ${response.statusText}`);
    }

    const result = await response.json();
    return result.result;
  }

  /**
   * Liste tous les projets
   */
  async listProjects(): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur liste projets: ${response.statusText}`);
    }

    const result = await response.json();
    return result.result;
  }

  /**
   * Purge le cache pour un projet
   */
  async purgeCache(projectName: string): Promise<void> {
    console.log('🧹 [CloudflareDeployment] Purge cache pour:', projectName);

    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}/purge_build_cache`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur purge cache: ${response.statusText}`);
    }
  }

  /**
   * Supprime un projet
   */
  async deleteProject(projectName: string): Promise<void> {
    console.log('🗑️ [CloudflareDeployment] Suppression projet:', projectName);

    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur suppression projet: ${response.statusText}`);
    }
  }
}

// Instance par défaut avec configuration depuis les variables d'environnement
export const cloudflareDeployment = new CloudflareDeploymentService({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  zoneId: process.env.CLOUDFLARE_ZONE_ID // Optionnel pour sous-domaines
});

export default CloudflareDeploymentService;
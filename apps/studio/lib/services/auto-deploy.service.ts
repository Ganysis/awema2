import { NetlifyDeployCorrectService } from './netlify-deploy-correct.service';
import { CMSExportIntegration } from './cms-export-integration';
import { SupabaseAutoSetup } from './supabase-auto-setup';
import crypto from 'crypto';

// Import dynamique pour éviter l'erreur si le module n'est pas installé
let createClient: any;
try {
  const supabaseModule = require('@supabase/supabase-js');
  createClient = supabaseModule.createClient;
} catch (error) {
  console.warn('Supabase not installed. CMS features will be limited.');
}

import bcrypt from 'bcryptjs';

export interface AutoDeployConfig {
  netlifyToken: string;
  supabaseUrl: string;
  supabaseServiceKey: string;
  baseUrl?: string;
}

export interface DeploymentRequest {
  siteId: string;
  siteName: string;
  projectData: any;
  plan: 'starter' | 'pro' | 'premium';
  customDomain?: string;
  adminEmail?: string;
}

export interface DeploymentResult {
  success: boolean;
  siteUrl?: string;
  adminUrl?: string;
  credentials?: {
    email: string;
    password: string;
  };
  dnsInstructions?: any;
  error?: string;
}

/**
 * Service de déploiement automatique one-click
 */
export class AutoDeployService {
  private netlifyService: NetlifyDeployCorrectService;
  private supabase: any;
  private config: AutoDeployConfig;
  private supabaseAutoSetup: SupabaseAutoSetup;

  constructor(config: AutoDeployConfig) {
    this.config = config;
    this.netlifyService = new NetlifyDeployCorrectService(config.netlifyToken);
    this.supabaseAutoSetup = new SupabaseAutoSetup();
    
    if (createClient && config.supabaseUrl && config.supabaseServiceKey) {
      console.log('[AutoDeploy] Initialisation du client Supabase');
      this.supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
    } else {
      console.warn('[AutoDeploy] Client Supabase non initialisé:', {
        hasCreateClient: !!createClient,
        hasSupabaseUrl: !!config.supabaseUrl,
        hasSupabaseServiceKey: !!config.supabaseServiceKey
      });
      this.supabase = null;
    }
  }

  /**
   * Déploie automatiquement un site complet avec CMS
   */
  async deployOneClick(request: DeploymentRequest): Promise<DeploymentResult> {
    try {
      console.log('🚀 Démarrage du déploiement automatique...');

      // 1. Générer les identifiants
      // Pour les tests, utiliser des identifiants simples
      const adminEmail = 'admin@admin.fr';
      const adminPassword = 'admin';

      // 2. Créer automatiquement le site et les utilisateurs dans Supabase
      let siteEntry = null;
      if (this.supabase && request.plan !== 'starter') {
        console.log('💾 Configuration automatique Supabase...');
        
        try {
          // S'assurer que le super admin existe
          await this.supabaseAutoSetup.ensureSuperAdmin();
          console.log('✅ Super Admin vérifié');
          
          // Créer automatiquement le site et les utilisateurs
          const setupResult = await this.supabaseAutoSetup.createSiteWithAdmin({
            siteId: request.siteId,
            siteName: request.siteName,
            domain: request.customDomain || `${request.siteName}.netlify.app`,
            adminEmail: request.adminEmail || `admin@${request.siteName}.fr`,
            adminPassword: 'admin123' // Mot de passe par défaut pour l'admin du site
          });
          
          if (setupResult) {
            siteEntry = setupResult.site;
            console.log('✅ Configuration automatique réussie :');
            console.log('   - Site créé :', setupResult.site.domain);
            console.log('   - Admin site :', setupResult.adminEmail);
            console.log('   - Client :', setupResult.clientEmail, '(mdp: admin)');
            console.log('   - Super Admin : admin@awema.fr (accès global)');
          } else {
            console.error('❌ Échec de la configuration automatique');
          }
          
        } catch (error) {
          console.error('[AutoDeploy] Erreur auto-setup:', error);
          // Continuer sans Supabase si erreur
        }
      }

      // 3. Préparer les options de déploiement
      const deployOptions = {
        projectId: siteEntry?.id || request.siteId,
        siteName: request.siteName,
        customDomain: request.customDomain,
        netlifyToken: this.config.netlifyToken,
        includeCms: request.plan !== 'starter',
        cmsLevel: request.plan === 'premium' ? 'full' : 'basic',
        cmsAdminEmail: adminEmail,
        cmsPassword: adminPassword,
        cmsPlan: request.plan,
        supabaseUrl: this.config.supabaseUrl,
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        // Passer le siteId et les infos créées pour le CMS
        cmsSiteId: siteEntry?.id,
        cmsSiteName: request.siteName,
        cmsSubdomain: siteEntry?.subdomain || request.siteName
      };

      // 4. Déployer sur Netlify
      console.log('📦 Déploiement sur Netlify...');
      const deployment = await this.netlifyService.deployProject(
        request.projectData,
        deployOptions,
        (progress) => {
          console.log(`${progress.stage}: ${progress.message} (${progress.progress}%)`);
        }
      );

      // 5. Mettre à jour la base de données
      if (siteEntry && this.supabase) {
        console.log('💾 Mise à jour de la base de données...');
        await this.updateSiteInDatabase(siteEntry.id, {
          netlify_site_id: deployment.siteUrl.replace('https://', '').replace('http://', '').replace('.netlify.app', ''),
          netlify_deploy_id: deployment.deployId,
          last_deployed_at: new Date().toISOString(),
          status: 'active'
        });
      }

      // 6. Générer les instructions DNS si domaine personnalisé
      let dnsInstructions = null;
      if (request.customDomain) {
        const { DNSConfigService } = await import('./dns-config.service');
        dnsInstructions = DNSConfigService.generateDNSConfiguration(
          request.customDomain,
          `${request.siteName}.netlify.app`
        );
      }

      // 7. Envoyer l'email de bienvenue (si configuré)
      await this.sendWelcomeEmail({
        email: adminEmail,
        siteName: request.siteName,
        siteUrl: deployment.siteUrl,
        adminUrl: `${deployment.siteUrl}/admin`,
        credentials: { email: adminEmail, password: adminPassword }
      });

      console.log('✅ Déploiement terminé avec succès!');

      return {
        success: true,
        siteUrl: deployment.siteUrl,
        adminUrl: `${deployment.siteUrl}/admin`,
        credentials: {
          email: adminEmail,
          password: adminPassword
        },
        dnsInstructions
      };

    } catch (error) {
      console.error('❌ Erreur lors du déploiement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Déploie plusieurs sites en lot (batch)
   */
  async deployBatch(requests: DeploymentRequest[]): Promise<DeploymentResult[]> {
    console.log(`🚀 Déploiement en lot de ${requests.length} sites...`);
    
    const results: DeploymentResult[] = [];
    
    // Déployer en parallèle par groupes de 3 pour ne pas surcharger
    const batchSize = 3;
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(request => this.deployOneClick(request))
      );
      results.push(...batchResults);
      
      // Petite pause entre les lots
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log(`✅ Déploiement en lot terminé: ${results.filter(r => r.success).length}/${requests.length} réussis`);
    return results;
  }

  /**
   * Met à jour un site existant
   */
  async updateSite(siteId: string, projectData: any): Promise<DeploymentResult> {
    try {
      console.log('🔄 Mise à jour du site...');

      // Récupérer les infos du site
      const { data: site, error } = await this.supabase
        .from('sites')
        .select('*')
        .eq('id', siteId)
        .single();

      if (error || !site) {
        throw new Error('Site non trouvé');
      }

      // Déployer les mises à jour
      const deployOptions = {
        projectId: siteId,
        siteName: site.subdomain,
        customDomain: site.domain,
        netlifyToken: this.config.netlifyToken,
        includeCms: site.plan !== 'starter',
        cmsLevel: site.plan === 'premium' ? 'full' : 'basic',
        cmsPlan: site.plan,
        supabaseUrl: this.config.supabaseUrl,
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      };

      const deployment = await this.netlifyService.deployProject(
        projectData,
        deployOptions,
        (progress) => {
          console.log(`${progress.stage}: ${progress.message} (${progress.progress}%)`);
        }
      );

      // Mettre à jour la base de données
      await this.updateSiteInDatabase(siteId, {
        last_deployed_at: new Date().toISOString(),
        netlify_deploy_id: deployment.deployId
      });

      console.log('✅ Mise à jour terminée!');

      return {
        success: true,
        siteUrl: deployment.siteUrl,
        adminUrl: `${deployment.siteUrl}/admin`
      };

    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Clone un site existant
   */
  async cloneSite(sourceSiteId: string, newSiteName: string, newPlan?: 'starter' | 'pro' | 'premium'): Promise<DeploymentResult> {
    try {
      console.log('🔄 Clonage du site...');

      // Récupérer les données du site source
      const { data: sourceData, error: sourceError } = await this.supabase
        .from('content')
        .select('*')
        .eq('site_id', sourceSiteId);

      if (sourceError) {
        throw new Error('Impossible de récupérer les données du site source');
      }

      // Récupérer les infos du site source
      const { data: sourceSite } = await this.supabase
        .from('sites')
        .select('*')
        .eq('id', sourceSiteId)
        .single();

      // Créer le nouveau site
      const newSiteId = crypto.randomUUID();
      const projectData = this.reconstructProjectData(sourceData);

      const deployRequest: DeploymentRequest = {
        siteId: newSiteId,
        siteName: newSiteName,
        projectData,
        plan: newPlan || sourceSite?.plan || 'starter'
      };

      return await this.deployOneClick(deployRequest);

    } catch (error) {
      console.error('❌ Erreur lors du clonage:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Met à jour les infos dans la base de données
   */
  private async updateSiteInDatabase(siteId: string, updates: any): Promise<void> {
    if (!this.supabase) {
      console.warn('[AutoDeploy] Supabase non initialisé - mise à jour ignorée');
      return;
    }
    
    try {
      console.log('[AutoDeploy] Mise à jour dans Supabase:', { siteId, updates });
      
      const { error } = await this.supabase
        .from('sites')
        .update(updates)
        .eq('id', siteId);

      if (error) {
        console.error('[AutoDeploy] Erreur Supabase:', error);
      } else {
        console.log('[AutoDeploy] Mise à jour réussie dans Supabase');
      }
    } catch (err) {
      console.error('[AutoDeploy] Exception lors de la mise à jour:', err);
    }
  }

  /**
   * Envoie l'email de bienvenue (placeholder)
   */
  private async sendWelcomeEmail(data: any): Promise<void> {
    // TODO: Implémenter l'envoi d'email
    console.log('📧 Email de bienvenue (simulation):', {
      to: data.email,
      subject: `Bienvenue sur ${data.siteName}`,
      content: `
Votre site est maintenant en ligne!

URL du site: ${data.siteUrl}
Administration: ${data.adminUrl}

Identifiants de connexion:
Email: ${data.credentials.email}
Mot de passe: ${data.credentials.password}

Conservez ces informations en lieu sûr.

L'équipe AWEMA
      `
    });
  }

  /**
   * Reconstruit les données du projet à partir du contenu
   */
  private reconstructProjectData(contentData: any[]): any {
    const pages: any = {};
    
    contentData.forEach(content => {
      pages[content.page_id] = {
        id: content.page_id,
        title: content.page_title,
        slug: content.page_slug,
        blocks: content.blocks || [],
        seo: content.seo || {},
        settings: content.settings || {}
      };
    });

    return {
      pages: Object.values(pages),
      theme: contentData[0]?.settings?.theme || {},
      businessInfo: contentData[0]?.settings?.businessInfo || {},
      settings: contentData[0]?.settings || {}
    };
  }


  /**
   * Génère un mot de passe sécurisé
   */
  private generateSecurePassword(): string {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    
    // Assurer au moins un de chaque type
    password += 'A'; // Majuscule
    password += 'a'; // Minuscule
    password += '1'; // Chiffre
    password += '!'; // Symbole
    
    // Compléter le reste
    for (let i = 4; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Mélanger le mot de passe
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Vérifie le statut d'un déploiement
   */
  async checkDeploymentStatus(deployId: string): Promise<{
    status: 'building' | 'ready' | 'error';
    url?: string;
    error?: string;
  }> {
    try {
      // TODO: Implémenter la vérification via l'API Netlify
      return { status: 'ready' };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }
}

// Export d'une instance singleton si les variables d'environnement sont disponibles
export const autoDeployService = (() => {
  const netlifyToken = process.env.NETLIFY_AUTH_TOKEN;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log('[AutoDeploy] Configuration:', {
    hasNetlifyToken: !!netlifyToken,
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseServiceKey: !!supabaseServiceKey
  });
  
  if (netlifyToken && supabaseUrl) {
    return new AutoDeployService({
      netlifyToken,
      supabaseUrl,
      supabaseServiceKey: supabaseServiceKey || '',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    });
  }
  
  console.warn('[AutoDeploy] Service non initialisé - vérifiez les variables d\'environnement');
  return null;
})();
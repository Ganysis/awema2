import { NetlifyAPI } from '@netlify/api';
import { StaticExportService } from './static-export-simplified';
import { DNSConfigService } from './dns-config.service';
import type { Page, EditorBlock } from '@/lib/store/editor-store';

export interface DeployOptions {
  projectId: string;
  siteName: string;
  customDomain?: string;
  netlifyToken: string;
  includeCms?: boolean;
  cmsLevel?: 'none' | 'basic' | 'full';
  cmsAdminEmail?: string;
  cmsPassword?: string;
  cmsPlan?: 'starter' | 'pro' | 'premium';
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export interface DeployProgress {
  stage: 'preparing' | 'transforming' | 'uploading' | 'deploying' | 'completed' | 'error';
  message: string;
  progress: number;
  siteUrl?: string;
  deployId?: string;
}

export class NetlifyDeployService {
  private netlifyClient: NetlifyAPI;

  constructor(token: string) {
    this.netlifyClient = new NetlifyAPI(token);
  }

  /**
   * Déploie un projet sur Netlify avec transformation des URLs
   */
  async deployProject(
    projectData: any,
    options: DeployOptions,
    onProgress?: (progress: DeployProgress) => void
  ): Promise<{ siteUrl: string; deployId: string }> {
    try {
      // Étape 1: Préparer le site
      onProgress?.({
        stage: 'preparing',
        message: 'Préparation du site pour le déploiement...',
        progress: 10
      });

      // Déterminer l'URL finale du site
      const siteUrl = options.customDomain 
        ? `https://${options.customDomain}`
        : `https://${options.siteName}.netlify.app`;

      // Étape 2: Transformer les URLs
      onProgress?.({
        stage: 'transforming',
        message: 'Transformation des liens pour le domaine de production...',
        progress: 20
      });

      const transformedProjectData = this.transformProjectUrls(projectData, siteUrl);

      // Étape 3: Générer l'export statique
      const exportOptions = {
        minifyHtml: true,
        minifyCss: true,
        minifyJs: true,
        optimizeImages: true,
        generateManifest: true,
        generateServiceWorker: true,
        includeSourceMap: false,
        useCompression: true,
        includeCms: options.includeCms ?? true,
        cmsLevel: options.cmsLevel || 'basic',
        cmsPassword: options.cmsPassword || 'admin123',
        cmsAdminEmail: options.cmsAdminEmail,
        cmsPlan: options.cmsPlan || 'starter',
        supabaseUrl: options.supabaseUrl,
        supabaseAnonKey: options.supabaseAnonKey,
      };

      const exportData = await StaticExportService.exportSite(
        transformedProjectData,
        exportOptions
      );

      // Étape 4: Créer ou récupérer le site Netlify
      onProgress?.({
        stage: 'uploading',
        message: 'Création du site sur Netlify...',
        progress: 40
      });

      let site;
      try {
        // Essayer de récupérer un site existant
        const sites = await this.netlifyClient.listSites();
        site = sites.find((s: any) => s.name === options.siteName);

        if (!site) {
          // Créer un nouveau site
          site = await this.netlifyClient.createSite({
            body: {
              name: options.siteName,
              custom_domain: options.customDomain,
            }
          });
        }
      } catch (error) {
        console.error('Erreur lors de la création/récupération du site:', error);
        throw new Error('Impossible de créer ou récupérer le site sur Netlify');
      }

      // Étape 5: Préparer les fichiers pour le déploiement
      onProgress?.({
        stage: 'uploading',
        message: 'Préparation des fichiers pour le déploiement...',
        progress: 50
      });

      const files: Record<string, string> = {};
      
      // Ajouter le fichier index.html
      files['index.html'] = exportData.html;

      // Ajouter les fichiers CSS et JS
      if (exportData.css) {
        files['assets/css/styles.css'] = exportData.css;
      }
      if (exportData.js) {
        files['assets/js/main.js'] = exportData.js;
      }

      // Ajouter les fichiers additionnels
      exportData.additionalFiles.forEach(file => {
        files[file.path] = file.content;
      });

      // Ajouter les instructions DNS si un domaine personnalisé est défini
      if (options.customDomain) {
        const dnsConfig = DNSConfigService.generateDNSConfiguration(
          options.customDomain,
          options.siteName
        );
        
        // Ajouter le fichier d'instructions DNS
        files['DNS-CONFIGURATION.md'] = DNSConfigService.generateDNSInstructionsFile(dnsConfig);
        
        // Ajouter aussi dans le dossier admin pour faciliter l'accès
        files['admin/DNS-CONFIGURATION.md'] = DNSConfigService.generateDNSInstructionsFile(dnsConfig);
      }

      // Étape 6: Déployer les fichiers
      onProgress?.({
        stage: 'deploying',
        message: 'Déploiement des fichiers sur Netlify...',
        progress: 70
      });

      // Debug: vérifier la taille des fichiers
      const totalSize = Object.values(files).reduce((acc, content) => acc + content.length, 0);
      console.log(`[Netlify Deploy] Nombre de fichiers: ${Object.keys(files).length}`);
      console.log(`[Netlify Deploy] Taille totale: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
      
      // Debug: afficher les premiers fichiers
      const fileList = Object.keys(files).slice(0, 10);
      console.log('[Netlify Deploy] Fichiers à déployer:', fileList);
      
      // Vérifier que nous avons bien des fichiers
      if (Object.keys(files).length === 0) {
        throw new Error('Aucun fichier à déployer!');
      }

      // Créer le déploiement avec les fichiers
      console.log('[Netlify Deploy] Création du déploiement pour le site:', site.id);
      
      let deploy;
      try {
        deploy = await this.netlifyClient.createSiteDeploy({
          siteId: site.id!,
          body: {
            files,
            draft: false,
            branch: 'main'
          }
        });
        
        console.log('[Netlify Deploy] Déploiement créé:', deploy.id);
      } catch (deployError: any) {
        console.error('[Netlify Deploy] Erreur lors de la création du déploiement:', deployError);
        
        // Si l'erreur est liée à la taille, essayer avec moins de fichiers
        if (deployError.message?.includes('too large') || deployError.message?.includes('413')) {
          console.log('[Netlify Deploy] Tentative avec méthode alternative...');
          
          // Essayer de déployer uniquement les fichiers essentiels
          const essentialFiles: Record<string, string> = {
            'index.html': files['index.html'],
            '_redirects': '/* /index.html 200'
          };
          
          if (files['assets/css/styles.css']) {
            essentialFiles['assets/css/styles.css'] = files['assets/css/styles.css'];
          }
          if (files['assets/js/main.js']) {
            essentialFiles['assets/js/main.js'] = files['assets/js/main.js'];
          }
          
          deploy = await this.netlifyClient.createSiteDeploy({
            siteId: site.id!,
            body: {
              files: essentialFiles,
              draft: false,
              branch: 'main'
            }
          });
          
          console.log('[Netlify Deploy] Déploiement alternatif créé:', deploy.id);
        }
        
        throw deployError;
      }

      // Étape 7: Attendre que le déploiement soit terminé
      onProgress?.({
        stage: 'deploying',
        message: 'Finalisation du déploiement...',
        progress: 90
      });

      // Vérifier le statut du déploiement
      let deployStatus = await this.netlifyClient.getSiteDeploy({
        siteId: site.id!,
        deployId: deploy.id!
      });

      // Attendre que le déploiement soit terminé
      while (deployStatus.state === 'uploading' || deployStatus.state === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        deployStatus = await this.netlifyClient.getSiteDeploy({
          siteId: site.id!,
          deployId: deploy.id!
        });
      }

      if (deployStatus.state !== 'ready') {
        throw new Error(`Le déploiement a échoué: ${deployStatus.error_message || 'Erreur inconnue'}`);
      }

      // Étape 8: Déploiement terminé
      const finalUrl = deployStatus.ssl_url || deployStatus.url || siteUrl;
      
      onProgress?.({
        stage: 'completed',
        message: 'Déploiement terminé avec succès !',
        progress: 100,
        siteUrl: finalUrl,
        deployId: deploy.id
      });

      return {
        siteUrl: finalUrl,
        deployId: deploy.id!
      };

    } catch (error: any) {
      onProgress?.({
        stage: 'error',
        message: error.message || 'Erreur lors du déploiement',
        progress: 0
      });
      throw error;
    }
  }

  /**
   * Transforme toutes les URLs du projet pour le domaine de production
   */
  private transformProjectUrls(projectData: any, siteUrl: string): any {
    const transformed = JSON.parse(JSON.stringify(projectData)); // Deep clone
    const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

    // Transformer les liens dans toutes les pages
    if (transformed.pages) {
      transformed.pages = transformed.pages.map((page: Page) => ({
        ...page,
        blocks: page.blocks.map(block => this.transformBlockUrls(block, baseUrl))
      }));
    }

    // Transformer le header global
    if (transformed.globalHeader) {
      transformed.globalHeader = this.transformBlockUrls(transformed.globalHeader, baseUrl);
    }

    // Transformer le footer global
    if (transformed.globalFooter) {
      transformed.globalFooter = this.transformBlockUrls(transformed.globalFooter, baseUrl);
    }

    // Transformer les informations business
    if (transformed.businessInfo && transformed.businessInfo.website) {
      transformed.businessInfo.website = baseUrl;
    }

    return transformed;
  }

  /**
   * Transforme les URLs dans un bloc
   */
  private transformBlockUrls(block: EditorBlock, baseUrl: string): EditorBlock {
    const transformedBlock = { ...block };
    
    if (transformedBlock.props) {
      transformedBlock.props = this.transformPropsUrls(transformedBlock.props, baseUrl);
    }

    return transformedBlock;
  }

  /**
   * Transforme récursivement les URLs dans les props d'un bloc
   */
  private transformPropsUrls(props: any, baseUrl: string): any {
    if (typeof props !== 'object' || props === null) {
      return props;
    }

    const transformed: any = Array.isArray(props) ? [] : {};

    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'string') {
        // Transformer les URLs relatives
        if (this.isRelativeUrl(value) && !this.isAnchor(value)) {
          transformed[key] = this.transformUrl(value, baseUrl);
        } else {
          transformed[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Récursion pour les objets et tableaux
        transformed[key] = this.transformPropsUrls(value, baseUrl);
      } else {
        transformed[key] = value;
      }
    }

    return transformed;
  }

  /**
   * Vérifie si une URL est relative
   */
  private isRelativeUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    // Ignorer les URLs absolues, les ancres, et les URLs spéciales
    return !url.startsWith('http://') && 
           !url.startsWith('https://') && 
           !url.startsWith('mailto:') && 
           !url.startsWith('tel:') && 
           !url.startsWith('//') &&
           !url.startsWith('data:') &&
           (url.startsWith('/') || /^[a-zA-Z0-9]/.test(url));
  }

  /**
   * Vérifie si une URL est une ancre
   */
  private isAnchor(url: string): boolean {
    return url.startsWith('#');
  }

  /**
   * Transforme une URL relative en URL absolue
   */
  private transformUrl(url: string, baseUrl: string): string {
    // Si l'URL commence par /, la transformer directement
    if (url.startsWith('/')) {
      return baseUrl + url;
    }
    
    // Si l'URL est relative sans /, ajouter le slash
    return baseUrl + '/' + url;
  }
}
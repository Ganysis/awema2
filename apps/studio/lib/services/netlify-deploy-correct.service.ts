import { NetlifyAPI } from '@netlify/api';
import { StaticExportService } from './static-export-simplified';
import { DNSConfigService } from './dns-config.service';
import type { Page, EditorBlock } from '@/lib/store/editor-store';
import crypto from 'crypto';

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
  cmsSiteId?: string;
  cmsSiteName?: string;
  cmsSubdomain?: string;
}

export interface DeployProgress {
  stage: 'preparing' | 'transforming' | 'uploading' | 'deploying' | 'completed' | 'error';
  message: string;
  progress: number;
  siteUrl?: string;
  deployId?: string;
}

export class NetlifyDeployCorrectService {
  private netlifyClient: NetlifyAPI;

  constructor(token: string) {
    this.netlifyClient = new NetlifyAPI(token);
  }

  /**
   * Calcule le SHA1 d'un contenu
   */
  private calculateSHA1(content: string): string {
    return crypto.createHash('sha1').update(content).digest('hex');
  }

  /**
   * Déploie un projet sur Netlify en suivant le workflow correct
   */
  async deployProject(
    projectData: any,
    options: DeployOptions,
    onProgress?: (progress: DeployProgress) => void
  ): Promise<{ siteUrl: string; deployId: string }> {
    try {
      console.log('🚀 Début du déploiement Netlify (version correcte)...');

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
        message: 'Transformation des URLs et génération du CMS...',
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
        cmsSiteId: options.cmsSiteId,
        cmsSiteName: options.cmsSiteName,
        cmsSubdomain: options.cmsSubdomain,
      };

      console.log('📦 Génération de l\'export statique...');

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
        console.log('🔍 Recherche du site existant:', options.siteName);
        const sites = await this.netlifyClient.listSites();
        site = sites.find((s: any) => s.name === options.siteName);

        if (!site) {
          // Créer un nouveau site
          console.log('✨ Création d\'un nouveau site...');
          site = await this.netlifyClient.createSite({
            body: {
              name: options.siteName,
              custom_domain: options.customDomain,
            }
          });
          console.log('✅ Site créé:', site.id);
        } else {
          console.log('♻️  Site existant trouvé:', site.id);
        }
      } catch (error) {
        console.error('❌ Erreur lors de la création/récupération du site:', error);
        throw new Error('Impossible de créer ou récupérer le site sur Netlify');
      }

      // Étape 5: Préparer les fichiers avec leurs SHA1
      onProgress?.({
        stage: 'uploading',
        message: 'Préparation des fichiers pour le déploiement...',
        progress: 50
      });

      const files: { [path: string]: string } = {};
      const fileContents: { [path: string]: string } = {};
      
      // Préparer index.html
      fileContents['/index.html'] = exportData.html;
      files['/index.html'] = this.calculateSHA1(exportData.html);
      
      // Préparer les fichiers CSS et JS
      if (exportData.css) {
        fileContents['/assets/css/styles.css'] = exportData.css;
        files['/assets/css/styles.css'] = this.calculateSHA1(exportData.css);
      }
      if (exportData.js) {
        fileContents['/assets/js/main.js'] = exportData.js;
        files['/assets/js/main.js'] = this.calculateSHA1(exportData.js);
      }

      // Préparer les fichiers additionnels
      console.log('📁 Fichiers additionnels à déployer:');
      exportData.additionalFiles.forEach(file => {
        const path = file.path.startsWith('/') ? file.path : `/${file.path}`;
        fileContents[path] = file.content;
        files[path] = this.calculateSHA1(file.content);
        console.log(`   - ${path} (${file.content.length} caractères)`);
      });

      // Ajouter les instructions DNS si un domaine personnalisé est défini
      if (options.customDomain) {
        const dnsConfig = DNSConfigService.generateDNSConfiguration(
          options.customDomain,
          `${options.siteName}.netlify.app`
        );
        
        const dnsContent = JSON.stringify(dnsConfig, null, 2);
        fileContents['/dns-config.json'] = dnsContent;
        files['/dns-config.json'] = this.calculateSHA1(dnsContent);
      }

      console.log('📊 Total des fichiers à déployer:', Object.keys(files).length);
      console.log('🔐 SHA1 calculés pour tous les fichiers');

      // Étape 6: Créer le déploiement avec les SHA1
      onProgress?.({
        stage: 'deploying',
        message: `Création du déploiement...`,
        progress: 60
      });

      console.log('🚀 Création du déploiement avec les SHA1...');
      
      let deploy;
      try {
        // Créer le déploiement avec les SHA1 des fichiers
        deploy = await this.netlifyClient.createSiteDeploy({
          site_id: site.id,
          body: {
            files: files,
            draft: false,
            async: false
          }
        });
        
        console.log('✅ Déploiement créé:', deploy.id);
        console.log('   État:', deploy.state);
        console.log('   Fichiers requis:', deploy.required?.length || 0);
        
        // Étape 7: Upload des fichiers requis
        if (deploy.required && deploy.required.length > 0) {
          onProgress?.({
            stage: 'deploying',
            message: `Upload de ${deploy.required.length} fichiers...`,
            progress: 70
          });
          
          console.log(`📤 Upload de ${deploy.required.length} fichiers requis...`);
          
          let uploadedCount = 0;
          for (const sha of deploy.required) {
            // Trouver le fichier correspondant au SHA
            const filePath = Object.entries(files).find(([_, s]) => s === sha)?.[0];
            
            if (filePath && fileContents[filePath]) {
              try {
                console.log(`   Upload ${filePath}...`);
                
                await this.netlifyClient.uploadDeployFile({
                  deploy_id: deploy.id,
                  path: filePath,
                  body: fileContents[filePath]
                });
                
                uploadedCount++;
                console.log(`   ✅ ${filePath} uploadé (${uploadedCount}/${deploy.required.length})`);
                
                const progress = 70 + (20 * uploadedCount / deploy.required.length);
                onProgress?.({
                  stage: 'deploying',
                  message: `Upload des fichiers... (${uploadedCount}/${deploy.required.length})`,
                  progress: Math.round(progress)
                });
                
              } catch (uploadError) {
                console.error(`   ❌ Erreur upload ${filePath}:`, uploadError);
              }
            } else {
              console.warn(`   ⚠️  Fichier non trouvé pour SHA: ${sha}`);
            }
          }
          
          console.log(`📊 Upload terminé: ${uploadedCount}/${deploy.required.length} fichiers`);
        }

      } catch (deployError) {
        console.error('❌ Erreur lors du déploiement:', deployError);
        throw deployError;
      }

      // Étape 8: Attendre que le déploiement soit prêt
      onProgress?.({
        stage: 'deploying',
        message: 'Finalisation du déploiement...',
        progress: 90
      });

      console.log('⏳ Attente de la finalisation du déploiement...');
      
      // Attendre un peu pour que Netlify traite le déploiement
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Vérifier le statut du déploiement
      let deployStatus;
      let attempts = 0;
      const maxAttempts = 30; // 30 * 2 secondes = 1 minute max

      while (attempts < maxAttempts) {
        try {
          deployStatus = await this.netlifyClient.getSiteDeploy({
            site_id: site.id,
            deploy_id: deploy.id
          });

          console.log(`📊 Statut du déploiement: ${deployStatus.state}`);

          if (deployStatus.state === 'ready' || deployStatus.state === 'prepared') {
            console.log('✅ Déploiement prêt!');
            break;
          }

          if (deployStatus.state === 'error' || deployStatus.state === 'failed') {
            throw new Error(`Le déploiement a échoué: ${deployStatus.error_message || 'Erreur inconnue'}`);
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
          attempts++;
        } catch (statusError) {
          console.warn('⚠️  Impossible de vérifier le statut:', statusError);
          break;
        }
      }

      // Si le déploiement n'est pas prêt après l'attente, continuer quand même
      if (deployStatus && deployStatus.state !== 'ready' && deployStatus.state !== 'prepared') {
        console.warn('⚠️  Le déploiement n\'est pas encore prêt, mais on continue...');
      }

      // Étape 9: Succès
      const finalUrl = deployStatus?.ssl_url || deployStatus?.url || site.ssl_url || site.url || siteUrl;
      
      onProgress?.({
        stage: 'completed',
        message: 'Déploiement terminé avec succès !',
        progress: 100,
        siteUrl: finalUrl,
        deployId: deploy.id
      });

      console.log('✅ Déploiement terminé avec succès !');
      console.log('🌐 URL du site:', finalUrl);
      console.log('🆔 Deploy ID:', deploy.id);

      return {
        siteUrl: finalUrl,
        deployId: deploy.id
      };

    } catch (error) {
      console.error('❌ Erreur lors du déploiement:', error);
      onProgress?.({
        stage: 'error',
        message: error instanceof Error ? error.message : 'Erreur inconnue',
        progress: 0
      });
      throw error;
    }
  }

  private transformProjectUrls(projectData: any, siteUrl: string): any {
    // Transformer les URLs dans le projet
    const transformed = JSON.parse(JSON.stringify(projectData));
    
    // Transformer les URLs dans les pages
    if (transformed.pages) {
      transformed.pages = transformed.pages.map((page: Page) => ({
        ...page,
        blocks: page.blocks?.map((block: EditorBlock) => 
          this.transformBlockUrls(block, siteUrl)
        ) || []
      }));
    }

    return transformed;
  }

  private transformBlockUrls(block: EditorBlock, siteUrl: string): EditorBlock {
    const transformed = { ...block };
    
    // Transformer les liens internes
    if (transformed.props) {
      Object.keys(transformed.props).forEach(key => {
        if (typeof transformed.props[key] === 'string') {
          // Remplacer les liens internes
          if (transformed.props[key].startsWith('/') && !transformed.props[key].startsWith('//')) {
            transformed.props[key] = transformed.props[key];
          }
        } else if (Array.isArray(transformed.props[key])) {
          // Transformer les arrays d'objets
          transformed.props[key] = transformed.props[key].map((item: any) => {
            if (typeof item === 'object' && item !== null) {
              return this.transformObjectUrls(item, siteUrl);
            }
            return item;
          });
        } else if (typeof transformed.props[key] === 'object' && transformed.props[key] !== null) {
          // Transformer les objets
          transformed.props[key] = this.transformObjectUrls(transformed.props[key], siteUrl);
        }
      });
    }

    return transformed;
  }

  private transformObjectUrls(obj: any, siteUrl: string): any {
    const transformed = { ...obj };
    
    Object.keys(transformed).forEach(key => {
      if (typeof transformed[key] === 'string') {
        if (key.toLowerCase().includes('link') || key.toLowerCase().includes('url')) {
          if (transformed[key].startsWith('/') && !transformed[key].startsWith('//')) {
            transformed[key] = transformed[key];
          }
        }
      }
    });

    return transformed;
  }
}
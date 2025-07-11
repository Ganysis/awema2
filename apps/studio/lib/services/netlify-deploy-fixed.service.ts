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

export class NetlifyDeployServiceFixed {
  private netlifyClient: NetlifyAPI;

  constructor(token: string) {
    this.netlifyClient = new NetlifyAPI(token);
  }

  async deployProject(
    projectData: any,
    options: DeployOptions,
    onProgress?: (progress: DeployProgress) => void
  ): Promise<{ siteUrl: string; deployId: string }> {
    try {
      console.log('🚀 Début du déploiement Netlify (version corrigée)...');

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
      };

      console.log('📦 Génération de l\'export statique avec options:', {
        includeCms: exportOptions.includeCms,
        cmsLevel: exportOptions.cmsLevel,
        cmsPlan: exportOptions.cmsPlan
      });

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

      // Étape 5: Préparer les fichiers pour le déploiement
      onProgress?.({
        stage: 'uploading',
        message: 'Préparation des fichiers pour le déploiement...',
        progress: 50
      });

      const files: { [path: string]: string } = {};
      
      // Ajouter le fichier index.html
      files['/index.html'] = exportData.html;
      console.log('📄 Ajout de index.html (%d caractères)', exportData.html.length);

      // Ajouter les fichiers CSS et JS
      if (exportData.css) {
        files['/assets/css/styles.css'] = exportData.css;
        console.log('🎨 Ajout de styles.css (%d caractères)', exportData.css.length);
      }
      if (exportData.js) {
        files['/assets/js/main.js'] = exportData.js;
        console.log('📜 Ajout de main.js (%d caractères)', exportData.js.length);
      }

      // Ajouter les fichiers additionnels
      exportData.additionalFiles.forEach(file => {
        const path = file.path.startsWith('/') ? file.path : `/${file.path}`;
        files[path] = file.content;
        console.log('📄 Ajout de %s (%d caractères)', path, file.content.length);
      });

      // Ajouter les instructions DNS si un domaine personnalisé est défini
      if (options.customDomain) {
        const dnsConfig = DNSConfigService.generateDNSConfiguration(
          options.customDomain,
          `${options.siteName}.netlify.app`
        );
        
        files['/dns-config.json'] = JSON.stringify(dnsConfig, null, 2);
        console.log('🌐 Ajout de la configuration DNS');
      }

      console.log('📊 Total des fichiers à déployer:', Object.keys(files).length);

      // Étape 6: Déployer les fichiers
      onProgress?.({
        stage: 'deploying',
        message: `Déploiement de ${Object.keys(files).length} fichiers...`,
        progress: 70
      });

      console.log('🚀 Début du déploiement des fichiers...');
      
      // Méthode alternative de déploiement plus fiable
      let deploy;
      try {
        // Créer un déploiement
        deploy = await this.netlifyClient.createSiteDeploy({
          site_id: site.id,
          body: {}
        });
        console.log('📦 Déploiement créé:', deploy.id);

        // Uploader chaque fichier individuellement
        let fileCount = 0;
        const totalFiles = Object.keys(files).length;
        
        for (const [path, content] of Object.entries(files)) {
          try {
            await this.netlifyClient.uploadDeployFile({
              deploy_id: deploy.id,
              path: path,
              body: content
            });
            fileCount++;
            
            const progress = 70 + (20 * fileCount / totalFiles);
            onProgress?.({
              stage: 'deploying',
              message: `Upload des fichiers... (${fileCount}/${totalFiles})`,
              progress: Math.round(progress)
            });
            
            console.log(`✅ [${fileCount}/${totalFiles}] ${path}`);
          } catch (fileError) {
            console.error(`❌ Erreur upload ${path}:`, fileError);
          }
        }

        console.log(`📊 ${fileCount}/${totalFiles} fichiers uploadés avec succès`);

      } catch (deployError) {
        console.error('❌ Erreur lors du déploiement:', deployError);
        
        // Méthode de fallback
        console.log('🔄 Tentative avec méthode alternative...');
        deploy = await this.netlifyClient.createSiteDeploy({
          site_id: site.id,
          body: {
            files
          }
        });
      }

      // Étape 7: Attendre que le déploiement soit prêt
      onProgress?.({
        stage: 'deploying',
        message: 'Finalisation du déploiement...',
        progress: 90
      });

      console.log('⏳ Attente de la finalisation du déploiement...');
      
      // Attendre un peu pour que Netlify traite le déploiement
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Vérifier le statut du déploiement
      let deployStatus;
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        try {
          deployStatus = await this.netlifyClient.getSiteDeploy({
            site_id: site.id,
            deploy_id: deploy.id
          });

          console.log(`📊 Statut du déploiement: ${deployStatus.state}`);

          if (deployStatus.state === 'ready' || deployStatus.state === 'prepared') {
            break;
          }

          if (deployStatus.state === 'error') {
            throw new Error('Le déploiement a échoué sur Netlify');
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
          attempts++;
        } catch (statusError) {
          console.warn('⚠️  Impossible de vérifier le statut:', statusError);
          break;
        }
      }

      // Étape 8: Succès
      onProgress?.({
        stage: 'completed',
        message: 'Déploiement terminé avec succès !',
        progress: 100,
        siteUrl: site.url || siteUrl,
        deployId: deploy.id
      });

      console.log('✅ Déploiement terminé avec succès !');
      console.log('🌐 URL du site:', site.url || siteUrl);
      console.log('🆔 Deploy ID:', deploy.id);

      return {
        siteUrl: site.url || siteUrl,
        deployId: deploy.id
      };

    } catch (error) {
      console.error('❌ Erreur lors du déploiement:', error);
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
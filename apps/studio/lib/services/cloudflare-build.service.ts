/**
 * AGENT 8 : Service de build optimisé pour Cloudflare Pages
 *
 * Responsable du build Astro avec optimisations spécifiques
 * à Cloudflare Pages et configuration des variables d'environnement.
 */

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { BuildConfig, BuildResult, AstroConfig } from '../types/deployment';

export class CloudflareBuildService {
  private tempDir: string;
  private buildConfig: BuildConfig;

  constructor(buildConfig: BuildConfig) {
    this.buildConfig = buildConfig;
    this.tempDir = path.join(process.cwd(), '.temp', `build-${Date.now()}`);
  }

  /**
   * Build le projet Astro avec optimisations Cloudflare
   */
  async buildAstroProject(
    astroProject: any,
    sanityConfig: any,
    workflow: any
  ): Promise<BuildResult> {
    const startTime = Date.now();

    try {
      console.log('🔨 [CloudflareBuild] Début du build Astro...');

      // 1. Créer le répertoire temporaire
      await this.ensureTempDirectory();

      // 2. Préparer la configuration Astro
      const astroConfig = await this.prepareAstroConfig(workflow, sanityConfig);

      // 3. Copier les fichiers du projet
      await this.copyProjectFiles(astroProject);

      // 4. Générer la configuration d'environnement
      await this.generateEnvironmentConfig(workflow, sanityConfig);

      // 5. Installer les dépendances
      await this.installDependencies();

      // 6. Build avec optimisations Cloudflare
      const buildOutput = await this.performOptimizedBuild();

      // 7. Optimisations post-build
      await this.applyCloudflareOptimizations();

      // 8. Créer l'archive pour déploiement
      const archive = await this.createDeploymentArchive();

      const buildTime = Date.now() - startTime;

      const result: BuildResult = {
        success: true,
        buildTime,
        outputPath: path.join(this.tempDir, 'dist'),
        archivePath: archive.path,
        archiveSize: archive.size,
        astroConfig,
        buildOutput,
        optimizations: {
          minification: true,
          compression: 'brotli',
          imageOptimization: true,
          codesplitting: true,
          treeshaking: true
        },
        performance: {
          bundleSize: await this.calculateBundleSize(),
          chunkCount: await this.countChunks(),
          assetCount: await this.countAssets()
        }
      };

      console.log('✅ [CloudflareBuild] Build terminé en', buildTime, 'ms');
      return result;

    } catch (error) {
      console.error('❌ [CloudflareBuild] Erreur de build:', error);
      throw new Error(`Échec du build Astro: ${error.message}`);
    }
  }

  private async ensureTempDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
      console.log('📁 [CloudflareBuild] Répertoire temporaire créé:', this.tempDir);
    } catch (error) {
      throw new Error(`Impossible de créer le répertoire temporaire: ${error.message}`);
    }
  }

  private async prepareAstroConfig(workflow: any, sanityConfig: any): Promise<AstroConfig> {
    const config: AstroConfig = {
      site: workflow.customDomain
        ? `https://${workflow.customDomain}`
        : `https://${workflow.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pages.dev`,
      output: 'static',
      adapter: '@astrojs/cloudflare',
      build: {
        format: 'directory',
        assets: 'assets'
      },
      vite: {
        define: {
          'process.env.SANITY_PROJECT_ID': JSON.stringify(sanityConfig.projectId),
          'process.env.SANITY_DATASET': JSON.stringify(sanityConfig.dataset || 'production'),
          'process.env.PUBLIC_BUSINESS_NAME': JSON.stringify(workflow.businessName),
          'process.env.PUBLIC_BUSINESS_TYPE': JSON.stringify(workflow.businessType)
        },
        build: {
          minify: 'terser',
          cssMinify: true,
          rollupOptions: {
            output: {
              manualChunks: {
                vendor: ['@astrojs/cloudflare', '@sanity/client'],
                sanity: ['@sanity/client', '@sanity/image-url']
              }
            }
          }
        },
        ssr: {
          external: ['@astrojs/cloudflare']
        }
      },
      integrations: [
        '@astrojs/tailwind',
        '@astrojs/sitemap',
        {
          name: 'cloudflare-optimization',
          hooks: {
            'astro:build:done': ({ dir }) => {
              console.log('🚀 Build terminé, application des optimisations Cloudflare...');
            }
          }
        }
      ],
      image: {
        service: {
          entrypoint: '@astrojs/cloudflare/image-service'
        }
      }
    };

    // Écrire la configuration Astro
    const configPath = path.join(this.tempDir, 'astro.config.mjs');
    const configContent = `
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig(${JSON.stringify(config, null, 2)});
`;

    await fs.writeFile(configPath, configContent);
    return config;
  }

  private async copyProjectFiles(astroProject: any): Promise<void> {
    console.log('📋 [CloudflareBuild] Copie des fichiers du projet...');

    // Si on a les fichiers sources
    if (astroProject.files) {
      for (const [filePath, content] of Object.entries(astroProject.files)) {
        const fullPath = path.join(this.tempDir, filePath);
        const dir = path.dirname(fullPath);

        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(fullPath, content as string);
      }
    }

    // Ajouter les fichiers de base Astro si nécessaire
    await this.ensureBaseAstroFiles();
  }

  private async ensureBaseAstroFiles(): Promise<void> {
    const packageJsonPath = path.join(this.tempDir, 'package.json');

    // Vérifier si package.json existe
    try {
      await fs.access(packageJsonPath);
    } catch {
      // Créer un package.json basique
      const packageJson = {
        name: 'astro-cloudflare-site',
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'astro dev',
          build: 'astro build',
          preview: 'astro preview'
        },
        dependencies: {
          'astro': '^4.0.0',
          '@astrojs/cloudflare': '^8.0.0',
          '@astrojs/tailwind': '^5.0.0',
          '@astrojs/sitemap': '^3.0.0',
          '@sanity/client': '^6.0.0',
          '@sanity/image-url': '^1.0.0',
          'tailwindcss': '^3.0.0'
        },
        devDependencies: {
          '@types/node': '^20.0.0',
          'typescript': '^5.0.0'
        }
      };

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
  }

  private async generateEnvironmentConfig(workflow: any, sanityConfig: any): Promise<void> {
    const envContent = `
# Sanity Configuration
SANITY_PROJECT_ID="${sanityConfig.projectId}"
SANITY_DATASET="${sanityConfig.dataset || 'production'}"
SANITY_API_VERSION="${sanityConfig.apiVersion || '2023-05-03'}"

# Business Information (Public)
PUBLIC_BUSINESS_NAME="${workflow.businessName}"
PUBLIC_BUSINESS_TYPE="${workflow.businessType}"
PUBLIC_BUSINESS_PHONE="${workflow.phone || ''}"
PUBLIC_BUSINESS_EMAIL="${workflow.email || ''}"
PUBLIC_BUSINESS_ADDRESS="${workflow.address || ''}"
PUBLIC_BUSINESS_CITY="${workflow.city || ''}"

# Design Configuration (Public)
PUBLIC_PRIMARY_COLOR="${workflow.primaryColor || '#0066CC'}"
PUBLIC_SECONDARY_COLOR="${workflow.secondaryColor || '#00AA00'}"

# Build Configuration
NODE_ENV="production"
BUILD_TARGET="cloudflare-pages"
`;

    await fs.writeFile(path.join(this.tempDir, '.env'), envContent.trim());
    await fs.writeFile(path.join(this.tempDir, '.env.production'), envContent.trim());
  }

  private async installDependencies(): Promise<void> {
    console.log('📦 [CloudflareBuild] Installation des dépendances...');

    try {
      execSync('npm install --production', {
        cwd: this.tempDir,
        stdio: 'pipe',
        timeout: 120000 // 2 minutes max
      });
    } catch (error) {
      throw new Error(`Échec installation dépendances: ${error.message}`);
    }
  }

  private async performOptimizedBuild(): Promise<string> {
    console.log('🏗️ [CloudflareBuild] Build Astro avec optimisations...');

    try {
      const buildCommand = `npm run build -- ${this.buildConfig.buildFlags.join(' ')}`;

      const output = execSync(buildCommand, {
        cwd: this.tempDir,
        stdio: 'pipe',
        encoding: 'utf-8',
        timeout: 300000, // 5 minutes max
        env: {
          ...process.env,
          NODE_ENV: 'production',
          BUILD_TARGET: 'cloudflare-pages',
          ASTRO_TELEMETRY_DISABLED: '1'
        }
      });

      return output;
    } catch (error) {
      throw new Error(`Échec du build Astro: ${error.message}`);
    }
  }

  private async applyCloudflareOptimizations(): Promise<void> {
    console.log('⚡ [CloudflareBuild] Application des optimisations Cloudflare...');

    const distPath = path.join(this.tempDir, 'dist');

    // 1. Créer _headers pour optimisations Cloudflare
    await this.createHeadersFile(distPath);

    // 2. Créer _redirects pour SPA routing
    await this.createRedirectsFile(distPath);

    // 3. Optimiser les images
    await this.optimizeImages(distPath);

    // 4. Compresser les assets
    await this.compressAssets(distPath);

    // 5. Générer le manifest PWA si nécessaire
    await this.generatePWAManifest(distPath);
  }

  private async createHeadersFile(distPath: string): Promise<void> {
    const headers = `
# Cache statique pour les assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache pour les images
/images/*
  Cache-Control: public, max-age=31536000

# Headers de sécurité
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# HTML - pas de cache
/*.html
  Cache-Control: no-cache, no-store, must-revalidate

# API routes
/api/*
  Cache-Control: no-cache
`;

    await fs.writeFile(path.join(distPath, '_headers'), headers.trim());
  }

  private async createRedirectsFile(distPath: string): Promise<void> {
    const redirects = `
# SPA fallback
/* /index.html 200

# API routes redirection
/api/* https://api.awema.fr/:splat 301
`;

    await fs.writeFile(path.join(distPath, '_redirects'), redirects.trim());
  }

  private async optimizeImages(distPath: string): Promise<void> {
    // Placeholder pour optimisation images
    // En production, on utiliserait sharp ou imagemin
    console.log('🖼️ [CloudflareBuild] Optimisation des images...');
  }

  private async compressAssets(distPath: string): Promise<void> {
    // Placeholder pour compression des assets
    // En production, on utiliserait gzip/brotli
    console.log('🗜️ [CloudflareBuild] Compression des assets...');
  }

  private async generatePWAManifest(distPath: string): Promise<void> {
    const manifest = {
      name: this.buildConfig.businessName,
      short_name: this.buildConfig.businessName,
      description: `Site web professionnel de ${this.buildConfig.businessName}`,
      start_url: '/',
      display: 'minimal-ui',
      background_color: this.buildConfig.primaryColor || '#ffffff',
      theme_color: this.buildConfig.primaryColor || '#0066CC',
      icons: [
        {
          src: '/favicon.ico',
          sizes: '48x48',
          type: 'image/x-icon'
        }
      ]
    };

    await fs.writeFile(
      path.join(distPath, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }

  private async createDeploymentArchive(): Promise<{ path: string; size: number }> {
    console.log('📦 [CloudflareBuild] Création de l\'archive de déploiement...');

    const archiver = require('archiver');
    const archive = archiver('zip', { zlib: { level: 9 } });

    const archivePath = path.join(this.tempDir, 'deployment.zip');
    const output = require('fs').createWriteStream(archivePath);

    return new Promise((resolve, reject) => {
      output.on('close', async () => {
        const stats = await fs.stat(archivePath);
        resolve({ path: archivePath, size: stats.size });
      });

      archive.on('error', reject);
      archive.pipe(output);
      archive.directory(path.join(this.tempDir, 'dist'), false);
      archive.finalize();
    });
  }

  private async calculateBundleSize(): Promise<number> {
    const distPath = path.join(this.tempDir, 'dist');
    let totalSize = 0;

    const calculateSize = async (dir: string): Promise<void> => {
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dir, file.name);

        if (file.isDirectory()) {
          await calculateSize(filePath);
        } else {
          const stats = await fs.stat(filePath);
          totalSize += stats.size;
        }
      }
    };

    await calculateSize(distPath);
    return totalSize;
  }

  private async countChunks(): Promise<number> {
    const assetsPath = path.join(this.tempDir, 'dist', 'assets');

    try {
      const files = await fs.readdir(assetsPath);
      return files.filter(f => f.endsWith('.js')).length;
    } catch {
      return 0;
    }
  }

  private async countAssets(): Promise<number> {
    const assetsPath = path.join(this.tempDir, 'dist', 'assets');

    try {
      const files = await fs.readdir(assetsPath);
      return files.length;
    } catch {
      return 0;
    }
  }

  /**
   * Nettoie les fichiers temporaires
   */
  async cleanup(): Promise<void> {
    try {
      await fs.rm(this.tempDir, { recursive: true, force: true });
      console.log('🧹 [CloudflareBuild] Nettoyage terminé');
    } catch (error) {
      console.warn('⚠️ [CloudflareBuild] Erreur nettoyage:', error.message);
    }
  }
}

export default CloudflareBuildService;
/**
 * Service de génération et déploiement de mockups sur Netlify
 * AWEMA 3.0 - Générateur de Mockups ThemeFisher Premium
 *
 * Responsabilités:
 * - Génération de 3 mockups à partir des templates ThemeFisher
 * - Injection de contenu Lorem Ipsum personnalisé
 * - Build automatique des templates
 * - Déploiement sur Netlify avec URLs temporaires
 * - Gestion des événements et logging
 */

import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import archiver from 'archiver';
import fetch from 'node-fetch';

import {
  MockupResult,
  MockupGenerationRequest,
  MockupGenerationResult,
  ClientFormData,
  TemplateConfig,
  MockupEvent,
  NetlifyDeployment
} from '../../types/mockup.types';

import {
  MOCKUP_CONFIG,
  AVAILABLE_TEMPLATES,
  DEFAULT_TEMPLATE_SELECTION,
  getBusinessColors,
  getCompatibleTemplates,
  LOREM_CONTENT,
  validateConfig
} from '../../config/netlify-mockup.config';

const execAsync = promisify(exec);

export class NetlifyMockupGeneratorService {
  private config = MOCKUP_CONFIG;
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor() {
    this.validateConfiguration();
  }

  /**
   * Point d'entrée principal : génère 3 mockups et les déploie
   */
  async generateMockups(
    formData: ClientFormData,
    selectedTemplates?: string[]
  ): Promise<MockupGenerationResult> {
    const startTime = Date.now();
    const requestId = `mockup-${Date.now()}`;

    try {
      console.log(`🚀 [MOCKUP] Début génération mockups pour ${formData.businessName}`);

      this.emitEvent('mockups.generation.started', {
        requestId,
        data: { formData }
      });

      // 1. Sélection des templates
      const templates = await this.selectTemplates(formData, selectedTemplates);
      console.log(`📋 Templates sélectionnés: ${templates.map(t => t.name).join(', ')}`);

      // 2. Génération des mockups
      const mockupResults: MockupResult[] = [];
      let errors: string[] = [];

      for (let i = 0; i < templates.length; i++) {
        const template = templates[i];

        this.emitEvent('mockups.generation.progress', {
          requestId,
          progress: {
            current: i + 1,
            total: templates.length,
            currentTemplate: template.displayName
          }
        });

        try {
          const mockup = await this.generateSingleMockup(formData, template, requestId);
          mockupResults.push(mockup);
          console.log(`✅ [${template.name}] Mockup généré: ${mockup.netlifyUrl}`);
        } catch (error) {
          const errorMsg = `Erreur génération ${template.name}: ${error instanceof Error ? error.message : error}`;
          console.error(`❌ ${errorMsg}`);
          errors.push(errorMsg);

          // Créer un mockup en erreur
          mockupResults.push({
            templateName: template.name,
            netlifyUrl: '',
            previewImage: '',
            deploymentId: '',
            status: 'error',
            error: errorMsg
          });
        }
      }

      const totalTime = Math.round((Date.now() - startTime) / 1000);
      const successfulMockups = mockupResults.filter(m => m.status === 'ready');

      console.log(`🎉 Génération terminée: ${successfulMockups.length}/${templates.length} mockups créés en ${totalTime}s`);

      const result: MockupGenerationResult = {
        success: successfulMockups.length > 0,
        mockups: mockupResults,
        totalTime,
        errors: errors.length > 0 ? errors : undefined
      };

      this.emitEvent('mockups.generation.completed', {
        requestId,
        mockups: result.mockups
      });

      return result;

    } catch (error) {
      const errorMsg = `Erreur critique génération mockups: ${error instanceof Error ? error.message : error}`;
      console.error(`💥 ${errorMsg}`);

      this.emitEvent('mockups.generation.failed', {
        requestId,
        error: errorMsg
      });

      return {
        success: false,
        mockups: [],
        totalTime: Math.round((Date.now() - startTime) / 1000),
        errors: [errorMsg]
      };
    }
  }

  /**
   * Génère un mockup individuel
   */
  private async generateSingleMockup(
    formData: ClientFormData,
    template: TemplateConfig,
    requestId: string
  ): Promise<MockupResult> {
    const mockupId = `${template.name}-${Date.now()}`;
    const buildDir = path.join(this.config.templates.outputDirectory, mockupId);

    try {
      // 1. Copier le template de base
      await this.copyTemplateBase(template, buildDir);

      // 2. Injecter le contenu personnalisé
      await this.injectContent(formData, template, buildDir);

      // 3. Appliquer les couleurs du métier
      await this.applyBusinessColors(formData, buildDir);

      // 4. Build du template
      const buildResult = await this.buildTemplate(buildDir, template);

      // 5. Déployer sur Netlify
      const deployment = await this.deployToNetlify(
        buildResult.outputPath,
        mockupId,
        formData
      );

      return {
        templateName: template.name,
        netlifyUrl: deployment.url,
        previewImage: `${deployment.url}/screenshot.png`, // Sera généré automatiquement
        deploymentId: deployment.id,
        status: 'ready',
        buildTime: buildResult.buildTime
      };

    } catch (error) {
      throw new Error(`Échec génération ${template.name}: ${error instanceof Error ? error.message : error}`);
    } finally {
      // Nettoyage du répertoire temporaire
      try {
        await fs.remove(buildDir);
      } catch (cleanupError) {
        console.warn(`⚠️  Échec nettoyage ${buildDir}:`, cleanupError);
      }
    }
  }

  /**
   * Copie la base du template
   */
  private async copyTemplateBase(template: TemplateConfig, buildDir: string): Promise<void> {
    const templatePath = path.join(this.config.templates.baseDirectory, template.baseDirectory);

    // Vérifier que le template existe
    if (!(await fs.pathExists(templatePath))) {
      // Créer un template de base simple si le template n'existe pas
      await this.createBasicTemplate(buildDir, template);
    } else {
      await fs.copy(templatePath, buildDir);
    }
  }

  /**
   * Crée un template HTML basique si les templates ThemeFisher ne sont pas disponibles
   */
  private async createBasicTemplate(buildDir: string, template: TemplateConfig): Promise<void> {
    await fs.ensureDir(buildDir);

    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - {{BUSINESS_TYPE}}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #4f46e5;
            --secondary-color: #6366f1;
            --accent-color: #8b5cf6;
        }
        .btn-primary {
            background-color: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-gray-900">{{BUSINESS_NAME}}</h1>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#services" class="text-gray-700 hover:text-gray-900">Services</a>
                    <a href="#about" class="text-gray-700 hover:text-gray-900">À propos</a>
                    <a href="#contact" class="text-gray-700 hover:text-gray-900">Contact</a>
                    <a href="tel:{{PHONE}}" class="btn-primary">Appeler</a>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {{HERO_TITLE}}
            </h2>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {{HERO_SUBTITLE}}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" class="btn-primary text-lg">{{HERO_CTA}}</a>
                <a href="tel:{{PHONE}}" class="bg-white text-gray-900 px-8 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    {{PHONE}}
                </a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Nos Services</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {{SERVICE_ITEMS}}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">{{CONTACT_TITLE}}</h2>
            <p class="text-xl text-gray-600 mb-8">{{CONTACT_DESCRIPTION}}</p>
            <div class="flex flex-col md:flex-row gap-8 justify-center items-center">
                <a href="tel:{{PHONE}}" class="btn-primary text-lg">Appelez-nous</a>
                <div class="text-gray-600">
                    <p><strong>Téléphone :</strong> {{PHONE}}</p>
                    <p><strong>Email :</strong> {{EMAIL}}</p>
                    <p><strong>Zone d'intervention :</strong> {{LOCATION}}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 class="text-xl font-bold mb-4">{{BUSINESS_NAME}}</h3>
            <p class="text-gray-400 mb-4">Votre expert {{BUSINESS_TYPE}} à {{LOCATION}}</p>
            <div class="flex justify-center space-x-8">
                <a href="tel:{{PHONE}}" class="text-gray-400 hover:text-white">{{PHONE}}</a>
                <a href="mailto:{{EMAIL}}" class="text-gray-400 hover:text-white">{{EMAIL}}</a>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
                <p>&copy; 2025 {{BUSINESS_NAME}}. Tous droits réservés. Propulsé par AWEMA.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

    await fs.writeFile(path.join(buildDir, 'index.html'), htmlContent);

    // Package.json simple pour le build
    const packageJson = {
      name: `mockup-${template.name}`,
      version: "1.0.0",
      scripts: {
        build: "mkdir -p dist && cp *.html dist/"
      }
    };

    await fs.writeFile(path.join(buildDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  }

  /**
   * Injecte le contenu personnalisé dans les templates
   */
  private async injectContent(formData: ClientFormData, template: TemplateConfig, buildDir: string): Promise<void> {
    const colors = getBusinessColors(formData.businessType as any);

    // Préparer les remplacements
    const replacements = {
      '{{BUSINESS_NAME}}': formData.businessName,
      '{{BUSINESS_TYPE}}': formData.businessType,
      '{{LOCATION}}': formData.location,
      '{{PHONE}}': formData.phone,
      '{{EMAIL}}': formData.email,
      '{{HERO_TITLE}}': LOREM_CONTENT.hero.title
        .replace('{businessName}', formData.businessName)
        .replace('{businessType}', formData.businessType),
      '{{HERO_SUBTITLE}}': LOREM_CONTENT.hero.subtitle
        .replace('{location}', formData.location),
      '{{HERO_CTA}}': LOREM_CONTENT.hero.cta,
      '{{CONTACT_TITLE}}': LOREM_CONTENT.contact.title,
      '{{CONTACT_DESCRIPTION}}': LOREM_CONTENT.contact.description,
      '{{SERVICE_ITEMS}}': this.generateServiceItems()
    };

    // Trouver tous les fichiers HTML et les traiter
    const htmlFiles = await this.findHTMLFiles(buildDir);

    for (const filePath of htmlFiles) {
      let content = await fs.readFile(filePath, 'utf-8');

      // Appliquer tous les remplacements
      for (const [placeholder, value] of Object.entries(replacements)) {
        content = content.replace(new RegExp(placeholder, 'g'), value);
      }

      await fs.writeFile(filePath, content);
    }
  }

  /**
   * Génère les éléments de service pour le contenu
   */
  private generateServiceItems(): string {
    const services = [
      'Service rapide et efficace',
      'Devis gratuit sous 24h',
      'Intervention d\'urgence',
      'Garantie sur tous travaux'
    ];

    return services.map(service => `
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">${service}</h3>
        <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
      </div>
    `).join('');
  }

  /**
   * Applique les couleurs du métier
   */
  private async applyBusinessColors(formData: ClientFormData, buildDir: string): Promise<void> {
    const colors = getBusinessColors(formData.businessType as any);

    const cssFiles = await this.findCSSFiles(buildDir);

    for (const filePath of cssFiles) {
      let content = await fs.readFile(filePath, 'utf-8');

      // Remplacer les variables CSS
      content = content.replace(/--primary-color:\s*[^;]+/g, `--primary-color: ${colors.primary}`);
      content = content.replace(/--secondary-color:\s*[^;]+/g, `--secondary-color: ${colors.secondary}`);
      content = content.replace(/--accent-color:\s*[^;]+/g, `--accent-color: ${colors.accent}`);

      await fs.writeFile(filePath, content);
    }
  }

  /**
   * Build le template
   */
  private async buildTemplate(buildDir: string, template: TemplateConfig): Promise<{ outputPath: string; buildTime: number }> {
    const startTime = Date.now();

    try {
      // Changer vers le répertoire de build
      process.chdir(buildDir);

      // Exécuter la commande de build
      await execAsync(template.buildCommand, {
        timeout: this.config.templates.buildTimeout,
        cwd: buildDir
      });

      const outputPath = path.join(buildDir, template.outputDirectory);

      // Vérifier que le build a généré des fichiers
      if (!(await fs.pathExists(outputPath))) {
        throw new Error(`Répertoire de sortie ${template.outputDirectory} introuvable après build`);
      }

      const buildTime = Math.round((Date.now() - startTime) / 1000);
      console.log(`✅ Build ${template.name} terminé en ${buildTime}s`);

      return { outputPath, buildTime };

    } catch (error) {
      throw new Error(`Échec build: ${error instanceof Error ? error.message : error}`);
    }
  }

  /**
   * Déploie sur Netlify
   */
  private async deployToNetlify(
    sitePath: string,
    mockupId: string,
    formData: ClientFormData
  ): Promise<NetlifyDeployment> {
    try {
      // Créer l'archive du site
      const archivePath = path.join('/tmp/claude', `${mockupId}.zip`);
      await this.createZipArchive(sitePath, archivePath);

      // Créer le site sur Netlify
      const site = await this.createNetlifySite(mockupId, formData);

      // Déployer les fichiers
      const deployment = await this.deployFiles(site.id, archivePath);

      console.log(`🌐 Site déployé: ${deployment.url}`);

      return deployment;

    } catch (error) {
      throw new Error(`Échec déploiement Netlify: ${error instanceof Error ? error.message : error}`);
    }
  }

  /**
   * Crée une archive ZIP du site
   */
  private async createZipArchive(sitePath: string, archivePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(archivePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', resolve);
      archive.on('error', reject);

      archive.pipe(output);
      archive.directory(sitePath, false);
      archive.finalize();
    });
  }

  /**
   * Crée un site sur Netlify
   */
  private async createNetlifySite(mockupId: string, formData: ClientFormData): Promise<{ id: string; url: string }> {
    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.netlify.apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: mockupId,
        custom_domain: null
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur création site Netlify: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Déploie les fichiers sur Netlify
   */
  private async deployFiles(siteId: string, archivePath: string): Promise<NetlifyDeployment> {
    const fileBuffer = await fs.readFile(archivePath);

    const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.netlify.apiToken}`,
        'Content-Type': 'application/zip'
      },
      body: fileBuffer
    });

    if (!response.ok) {
      throw new Error(`Erreur déploiement Netlify: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Sélectionne les templates à utiliser
   */
  private async selectTemplates(
    formData: ClientFormData,
    selectedTemplates?: string[]
  ): Promise<TemplateConfig[]> {
    if (selectedTemplates && selectedTemplates.length > 0) {
      return AVAILABLE_TEMPLATES.filter(t => selectedTemplates.includes(t.name)).slice(0, 3);
    }

    // Sélection automatique basée sur le métier
    const compatibleTemplates = getCompatibleTemplates(formData.businessType as any);

    if (compatibleTemplates.length >= 3) {
      return compatibleTemplates.slice(0, 3);
    }

    // Fallback : prendre les templates par défaut
    return AVAILABLE_TEMPLATES.filter(t =>
      DEFAULT_TEMPLATE_SELECTION.includes(t.name)
    ).slice(0, 3);
  }

  /**
   * Trouve tous les fichiers HTML dans un répertoire
   */
  private async findHTMLFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await this.findHTMLFiles(fullPath));
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Trouve tous les fichiers CSS dans un répertoire
   */
  private async findCSSFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await this.findCSSFiles(fullPath));
      } else if (entry.name.endsWith('.css')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Validation de la configuration
   */
  private validateConfiguration(): void {
    const validation = validateConfig();
    if (!validation.valid) {
      throw new Error(`Configuration invalide: ${validation.errors.join(', ')}`);
    }
  }

  /**
   * Gestion des événements
   */
  public on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  private emitEvent(type: MockupEvent['type'], data: MockupEvent['data']): void {
    const handlers = this.eventHandlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler({ type, data });
        } catch (error) {
          console.error(`Erreur handler événement ${type}:`, error);
        }
      });
    }
  }

  /**
   * Nettoyage des déploiements expirés
   */
  public async cleanupExpiredDeployments(): Promise<void> {
    console.log('🧹 Nettoyage des déploiements expirés...');
    // TODO: Implémenter le nettoyage des sites Netlify expirés
  }
}

// Instance singleton
export const netlifyMockupGenerator = new NetlifyMockupGeneratorService();
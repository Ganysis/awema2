/**
 * Intégration de l'export V3 dans le système existant
 */

import { StaticExportV3 } from '../v3/export/static-export-v3';
import { logger } from '../v3/core/logger';
import JSZip from 'jszip';

interface ExportV3Options {
  useV3?: boolean;
  enableLogs?: boolean;
  minify?: boolean;
  inlineAssets?: boolean;
  format?: 'static' | 'nextjs' | 'gatsby' | 'nuxt';
}

export class StaticExportV3Integration {
  private v3Exporter: StaticExportV3;
  
  constructor() {
    this.v3Exporter = new StaticExportV3();
  }
  
  /**
   * Export un site complet en utilisant V3
   */
  async exportSiteV3(
    siteData: any,
    options: ExportV3Options = {}
  ): Promise<{ zip: JSZip; logs?: any[] }> {
    logger.info('StaticExportV3Integration', 'exportSiteV3', '🚀 Export V3 activé', {
      pagesCount: siteData.pages?.length || 0,
      options
    });
    
    try {
      // Préparer les données pour V3
      const pages = this.preparePagesForV3(siteData.pages || []);
      const globalData = this.prepareGlobalData(siteData);
      
      // Options d'export V3
      const exportOptions = {
        minify: options.minify || false,
        inlineCSS: options.inlineAssets || false,
        inlineJS: options.inlineAssets || false,
        optimize: true,
        format: options.format || 'static'
      };
      
      // Exporter avec V3
      const result = await this.v3Exporter.exportSite(
        pages,
        globalData,
        exportOptions
      );
      
      // Créer le ZIP
      const zip = new JSZip();
      
      // Ajouter tous les fichiers générés
      for (const [filename, content] of result.files) {
        zip.file(filename, content);
      }
      
      // Ajouter les assets (images, etc.)
      await this.addAssetsToZip(zip, siteData);
      
      // Ajouter un fichier de métadonnées V3
      const metadata = {
        version: '3.0.0',
        exportDate: new Date().toISOString(),
        stats: result.stats,
        errors: result.errors,
        warnings: result.warnings,
        options: exportOptions
      };
      zip.file('v3-metadata.json', JSON.stringify(metadata, null, 2));
      
      // Ajouter les logs si demandé
      if (options.enableLogs) {
        const logs = this.v3Exporter.getLogs();
        zip.file('v3-logs.json', JSON.stringify(logs, null, 2));
        
        // Créer un rapport HTML des logs
        const logsHTML = this.generateLogsHTML(logs, result);
        zip.file('v3-logs-report.html', logsHTML);
      }
      
      logger.info('StaticExportV3Integration', 'exportSiteV3', '✅ Export V3 terminé', {
        filesCount: result.files.size,
        totalSize: result.stats.totalSize,
        renderTime: result.stats.renderTime,
        errors: result.errors.length,
        warnings: result.warnings.length
      });
      
      return {
        zip,
        logs: options.enableLogs ? this.v3Exporter.getLogs() : undefined
      };
      
    } catch (error) {
      logger.error('StaticExportV3Integration', 'exportSiteV3', '❌ Erreur export V3', error as Error);
      throw error;
    }
  }
  
  /**
   * Préparer les pages pour V3
   */
  private preparePagesForV3(pages: any[]): any[] {
    return pages.map(page => ({
      id: page.id || crypto.randomUUID(),
      name: page.name || 'Page',
      slug: page.slug || '/',
      blocks: page.blocks || [],
      seo: page.seo || {}
    }));
  }
  
  /**
   * Préparer les données globales
   */
  private prepareGlobalData(siteData: any): any {
    return {
      siteName: siteData.name || 'Mon Site',
      siteUrl: siteData.url || '',
      logo: siteData.logo,
      theme: siteData.theme || {},
      contact: siteData.contact || {},
      social: siteData.social || {},
      analytics: siteData.analytics || {}
    };
  }
  
  /**
   * Ajouter les assets au ZIP
   */
  private async addAssetsToZip(zip: JSZip, siteData: any): Promise<void> {
    // Créer le dossier assets
    const assetsFolder = zip.folder('assets');
    if (!assetsFolder) return;
    
    // Ajouter les images
    const imagesFolder = assetsFolder.folder('images');
    if (imagesFolder && siteData.images) {
      // TODO: Ajouter les images du site
    }
    
    // Ajouter les fonts
    const fontsFolder = assetsFolder.folder('fonts');
    if (fontsFolder) {
      // Ajouter les fonts de base
      // TODO: Implémenter
    }
  }
  
  /**
   * Générer un rapport HTML des logs
   */
  private generateLogsHTML(logs: any[], result: any): string {
    const logsByLevel = {
      DEBUG: logs.filter(l => l.level === 'DEBUG'),
      INFO: logs.filter(l => l.level === 'INFO'),
      WARN: logs.filter(l => l.level === 'WARN'),
      ERROR: logs.filter(l => l.level === 'ERROR'),
      CRITICAL: logs.filter(l => l.level === 'CRITICAL')
    };
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport V3 Export - AWEMA Studio</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f9fafb;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }
    h1 { color: #3b82f6; margin-bottom: 2rem; }
    h2 { color: #1f2937; margin-top: 2rem; }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    .stat {
      padding: 1rem;
      background: #f3f4f6;
      border-radius: 0.5rem;
      text-align: center;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #3b82f6;
    }
    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
    }
    .logs {
      margin-top: 2rem;
    }
    .log-section {
      margin-bottom: 2rem;
    }
    .log-level {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .log-level-DEBUG { background: #e5e7eb; color: #6b7280; }
    .log-level-INFO { background: #dbeafe; color: #1e40af; }
    .log-level-WARN { background: #fef3c7; color: #92400e; }
    .log-level-ERROR { background: #fee2e2; color: #991b1b; }
    .log-level-CRITICAL { background: #991b1b; color: white; }
    .log-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .log-table th {
      background: #f3f4f6;
      padding: 0.5rem;
      text-align: left;
      font-weight: 600;
    }
    .log-table td {
      padding: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .log-table tr:hover {
      background: #f9fafb;
    }
    .success { color: #10b981; }
    .warning { color: #f59e0b; }
    .error { color: #ef4444; }
    pre {
      background: #f3f4f6;
      padding: 0.5rem;
      border-radius: 0.25rem;
      overflow-x: auto;
      font-size: 0.75rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Rapport d'Export V3 - AWEMA Studio</h1>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-value">${result.stats.totalPages}</div>
        <div class="stat-label">Pages exportées</div>
      </div>
      <div class="stat">
        <div class="stat-value">${result.stats.v3BlocksRendered}</div>
        <div class="stat-label">Blocs V3 rendus</div>
      </div>
      <div class="stat">
        <div class="stat-value">${(result.stats.renderTime / 1000).toFixed(2)}s</div>
        <div class="stat-label">Temps de rendu</div>
      </div>
      <div class="stat">
        <div class="stat-value">${(result.stats.totalSize / 1024).toFixed(1)}KB</div>
        <div class="stat-label">Taille totale</div>
      </div>
    </div>
    
    ${result.errors.length > 0 ? `
      <div class="errors">
        <h2 class="error">❌ Erreurs (${result.errors.length})</h2>
        <ul>
          ${result.errors.map((e: any) => `<li>${e.message}</li>`).join('')}
        </ul>
      </div>
    ` : '<p class="success">✅ Aucune erreur détectée</p>'}
    
    ${result.warnings.length > 0 ? `
      <div class="warnings">
        <h2 class="warning">⚠️ Avertissements (${result.warnings.length})</h2>
        <ul>
          ${result.warnings.map((w: any) => `<li>${w.message}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    <div class="logs">
      <h2>📋 Logs détaillés</h2>
      
      ${Object.entries(logsByLevel).map(([level, levelLogs]) => {
        if (levelLogs.length === 0) return '';
        
        return `
          <div class="log-section">
            <span class="log-level log-level-${level}">${level} (${levelLogs.length})</span>
            <table class="log-table">
              <thead>
                <tr>
                  <th>Temps</th>
                  <th>Composant</th>
                  <th>Méthode</th>
                  <th>Message</th>
                  <th>Données</th>
                </tr>
              </thead>
              <tbody>
                ${levelLogs.slice(0, 100).map((log: any) => `
                  <tr>
                    <td>${new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td>${log.component}</td>
                    <td>${log.method}</td>
                    <td>${log.message}</td>
                    <td>${log.data ? '<pre>' + JSON.stringify(log.data, null, 2) + '</pre>' : '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            ${levelLogs.length > 100 ? `<p>... et ${levelLogs.length - 100} autres logs</p>` : ''}
          </div>
        `;
      }).join('')}
    </div>
    
    <hr style="margin: 3rem 0;">
    
    <p style="text-align: center; color: #6b7280;">
      Généré le ${new Date().toLocaleString('fr-FR')} par AWEMA Studio V3
    </p>
  </div>
</body>
</html>`;
  }
  
  /**
   * Vérifier si V3 est disponible
   */
  isV3Available(): boolean {
    return true;
  }
  
  /**
   * Obtenir les statistiques V3
   */
  getV3Stats(): any {
    const logs = this.v3Exporter.getLogs();
    return {
      totalLogs: logs.length,
      logsByLevel: {
        DEBUG: logs.filter(l => l.level === 'DEBUG').length,
        INFO: logs.filter(l => l.level === 'INFO').length,
        WARN: logs.filter(l => l.level === 'WARN').length,
        ERROR: logs.filter(l => l.level === 'ERROR').length,
        CRITICAL: logs.filter(l => l.level === 'CRITICAL').length
      }
    };
  }
}
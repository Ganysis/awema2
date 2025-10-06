/**
 * AGENT 8 : Service de monitoring post-déploiement
 *
 * Responsable du health checking, performance monitoring,
 * error tracking et analytics intégration après déploiement.
 */

import { MonitoringConfig, HealthCheckResult, PerformanceMetrics, MonitoringReport } from '../types/deployment';

export class DeploymentMonitorService {
  private config: MonitoringConfig;
  private activeMonitors: Map<string, NodeJS.Timeout> = new Map();

  constructor(config: MonitoringConfig) {
    this.config = config;
  }

  /**
   * Lance le monitoring complet pour un site déployé
   */
  async startMonitoring(deployment: any): Promise<MonitoringReport> {
    console.log('📊 [Monitor] Début monitoring pour:', deployment.url);

    try {
      const startTime = Date.now();

      // 1. Health check initial
      const healthCheck = await this.performHealthCheck(deployment.url);

      // 2. Tests de performance
      const performanceMetrics = await this.measurePerformance(deployment.url);

      // 3. Vérification SSL/TLS
      const sslCheck = await this.checkSSLStatus(deployment.url);

      // 4. Test de réactivité mobile
      const mobileCheck = await this.checkMobileResponsiveness(deployment.url);

      // 5. Validation SEO de base
      const seoCheck = await this.performBasicSEOCheck(deployment.url);

      // 6. Configuration du monitoring continu
      if (this.config.continuousMonitoring) {
        this.setupContinuousMonitoring(deployment);
      }

      const totalTime = Date.now() - startTime;

      const report: MonitoringReport = {
        deploymentId: deployment.deploymentId,
        url: deployment.url,
        monitoring: {
          health: healthCheck,
          performance: performanceMetrics,
          ssl: sslCheck,
          mobile: mobileCheck,
          seo: seoCheck
        },
        status: this.calculateOverallStatus(healthCheck, performanceMetrics, sslCheck),
        score: this.calculateQualityScore(healthCheck, performanceMetrics, sslCheck, seoCheck),
        recommendations: this.generateRecommendations(healthCheck, performanceMetrics, sslCheck, seoCheck),
        monitoringSetup: this.config.continuousMonitoring,
        executionTime: totalTime,
        timestamp: new Date().toISOString()
      };

      console.log('✅ [Monitor] Monitoring terminé avec score:', report.score);

      return report;

    } catch (error) {
      console.error('❌ [Monitor] Erreur monitoring:', error);
      throw new Error(`Échec du monitoring: ${error.message}`);
    }
  }

  private async performHealthCheck(url: string): Promise<HealthCheckResult> {
    console.log('🏥 [Monitor] Health check:', url);

    const checks: any[] = [];
    let overallStatus = 'healthy';

    try {
      // Test de base HTTP
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'HEAD',
        timeout: 10000,
        headers: {
          'User-Agent': 'AWEMA-Monitor/1.0'
        }
      });
      const responseTime = Date.now() - startTime;

      checks.push({
        name: 'HTTP Response',
        status: response.ok ? 'pass' : 'fail',
        statusCode: response.status,
        responseTime,
        details: response.ok ? 'Site accessible' : `Erreur HTTP ${response.status}`
      });

      if (!response.ok) overallStatus = 'unhealthy';

      // Vérifications des headers de sécurité
      const securityHeaders = [
        'strict-transport-security',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy'
      ];

      securityHeaders.forEach(header => {
        const hasHeader = response.headers.has(header);
        checks.push({
          name: `Security Header: ${header}`,
          status: hasHeader ? 'pass' : 'warning',
          details: hasHeader ? 'Configuré' : 'Manquant'
        });
      });

      // Test du contenu
      try {
        const contentResponse = await fetch(url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'AWEMA-Monitor/1.0'
          }
        });

        if (contentResponse.ok) {
          const content = await contentResponse.text();
          const hasTitle = /<title>/i.test(content);
          const hasMetaDescription = /<meta[^>]*name=["\']description/i.test(content);
          const hasH1 = /<h1/i.test(content);

          checks.push({
            name: 'Page Title',
            status: hasTitle ? 'pass' : 'fail',
            details: hasTitle ? 'Présent' : 'Manquant'
          });

          checks.push({
            name: 'Meta Description',
            status: hasMetaDescription ? 'pass' : 'warning',
            details: hasMetaDescription ? 'Présente' : 'Manquante'
          });

          checks.push({
            name: 'H1 Tag',
            status: hasH1 ? 'pass' : 'warning',
            details: hasH1 ? 'Présent' : 'Manquant'
          });

          // Vérifier les erreurs JS
          const hasJSErrors = /error|uncaught|exception/i.test(content);
          if (hasJSErrors) {
            checks.push({
              name: 'JavaScript Errors',
              status: 'warning',
              details: 'Erreurs potentielles détectées dans le HTML'
            });
          }
        }
      } catch (error) {
        checks.push({
          name: 'Content Check',
          status: 'fail',
          details: `Impossible de récupérer le contenu: ${error.message}`
        });
        overallStatus = 'degraded';
      }

      // Test des redirections
      try {
        const wwwUrl = url.replace('https://', 'https://www.');
        const wwwResponse = await fetch(wwwUrl, {
          method: 'HEAD',
          timeout: 10000,
          redirect: 'manual'
        });

        if (wwwResponse.status >= 300 && wwwResponse.status < 400) {
          checks.push({
            name: 'WWW Redirect',
            status: 'pass',
            details: 'Redirection www configurée'
          });
        } else {
          checks.push({
            name: 'WWW Redirect',
            status: 'info',
            details: 'Pas de redirection www'
          });
        }
      } catch (error) {
        // Ignore les erreurs de test www
      }

    } catch (error) {
      checks.push({
        name: 'HTTP Response',
        status: 'fail',
        details: `Impossible d'accéder au site: ${error.message}`
      });
      overallStatus = 'unhealthy';
    }

    return {
      status: overallStatus,
      checks,
      checkedAt: new Date().toISOString()
    };
  }

  private async measurePerformance(url: string): Promise<PerformanceMetrics> {
    console.log('⚡ [Monitor] Test performance:', url);

    try {
      const measurements: any[] = [];

      // Mesures multiples pour la précision
      for (let i = 0; i < 3; i++) {
        const startTime = Date.now();

        const response = await fetch(url, {
          timeout: 30000,
          headers: {
            'User-Agent': 'AWEMA-Monitor/1.0',
            'Cache-Control': i === 0 ? 'no-cache' : 'max-age=0'
          }
        });

        const responseTime = Date.now() - startTime;
        const contentLength = response.headers.get('content-length');

        measurements.push({
          responseTime,
          cached: i > 0,
          statusCode: response.status,
          contentLength: contentLength ? parseInt(contentLength) : null,
          headers: {
            cfRay: response.headers.get('cf-ray'),
            cfCacheStatus: response.headers.get('cf-cache-status'),
            server: response.headers.get('server')
          }
        });

        // Pause entre les mesures
        if (i < 2) await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const uncachedTime = measurements[0].responseTime;
      const cachedTimes = measurements.slice(1).map(m => m.responseTime);
      const avgCachedTime = cachedTimes.reduce((a, b) => a + b, 0) / cachedTimes.length;

      // Analyse des performances
      const performance = {
        firstLoadTime: uncachedTime,
        cachedLoadTime: avgCachedTime,
        improvementRatio: uncachedTime > 0 ? ((uncachedTime - avgCachedTime) / uncachedTime * 100).toFixed(1) : '0',
        contentSize: measurements[0].contentLength,
        cacheStatus: measurements.some(m => m.headers.cfCacheStatus) ? 'working' : 'not_detected',
        cdnDetected: measurements.some(m => m.headers.cfRay) ? 'cloudflare' : 'none',
        recommendations: []
      };

      // Générer des recommandations
      if (uncachedTime > 3000) {
        performance.recommendations.push('Optimiser les temps de réponse (>3s)');
      }
      if (uncachedTime > 1000 && avgCachedTime > 500) {
        performance.recommendations.push('Améliorer la configuration du cache');
      }
      if (performance.contentSize && performance.contentSize > 1000000) {
        performance.recommendations.push('Réduire la taille de la page (>1MB)');
      }

      return {
        ...performance,
        measurements,
        grade: this.calculatePerformanceGrade(uncachedTime, avgCachedTime),
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        firstLoadTime: 0,
        cachedLoadTime: 0,
        error: error.message,
        grade: 'F',
        recommendations: ['Impossible de mesurer les performances'],
        timestamp: new Date().toISOString()
      };
    }
  }

  private calculatePerformanceGrade(firstLoad: number, cached: number): string {
    const avgTime = (firstLoad + cached) / 2;

    if (avgTime < 500) return 'A+';
    if (avgTime < 1000) return 'A';
    if (avgTime < 2000) return 'B';
    if (avgTime < 3000) return 'C';
    if (avgTime < 5000) return 'D';
    return 'F';
  }

  private async checkSSLStatus(url: string): Promise<any> {
    console.log('🔒 [Monitor] Vérification SSL:', url);

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        timeout: 10000
      });

      const sslInfo = {
        enabled: url.startsWith('https://'),
        status: 'valid',
        headers: {
          hsts: response.headers.get('strict-transport-security'),
          securityHeaders: []
        },
        grade: 'A',
        recommendations: []
      };

      // Vérifier les headers de sécurité
      const securityHeaders = [
        'strict-transport-security',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy'
      ];

      securityHeaders.forEach(header => {
        const value = response.headers.get(header);
        if (value) {
          sslInfo.headers.securityHeaders.push({ name: header, value });
        } else {
          sslInfo.recommendations.push(`Ajouter le header ${header}`);
        }
      });

      // Calculer la note SSL
      const headerCount = sslInfo.headers.securityHeaders.length;
      if (headerCount >= 4) sslInfo.grade = 'A+';
      else if (headerCount >= 3) sslInfo.grade = 'A';
      else if (headerCount >= 2) sslInfo.grade = 'B';
      else sslInfo.grade = 'C';

      return sslInfo;

    } catch (error) {
      return {
        enabled: false,
        status: 'error',
        error: error.message,
        grade: 'F',
        recommendations: ['Configurer SSL/TLS']
      };
    }
  }

  private async checkMobileResponsiveness(url: string): Promise<any> {
    console.log('📱 [Monitor] Test responsive:', url);

    try {
      const response = await fetch(url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const content = await response.text();

      const checks = {
        viewport: /<meta[^>]*name=["\']viewport["\'][^>]*>/i.test(content),
        responsive: /@media|responsive/i.test(content),
        mobileOptimized: /mobile|phone|tablet/i.test(content),
        touchFriendly: /touch-action|tap-highlight/i.test(content)
      };

      const score = Object.values(checks).filter(Boolean).length;

      return {
        responsive: score >= 2,
        checks,
        score: score,
        maxScore: 4,
        grade: score >= 3 ? 'A' : score >= 2 ? 'B' : score >= 1 ? 'C' : 'D',
        recommendations: [
          !checks.viewport ? 'Ajouter une balise viewport' : null,
          !checks.responsive ? 'Ajouter du CSS responsive' : null,
          !checks.touchFriendly ? 'Optimiser pour le touch' : null
        ].filter(Boolean)
      };

    } catch (error) {
      return {
        responsive: false,
        error: error.message,
        grade: 'F',
        recommendations: ['Impossible de tester la responsivité']
      };
    }
  }

  private async performBasicSEOCheck(url: string): Promise<any> {
    console.log('🔍 [Monitor] Audit SEO basique:', url);

    try {
      const response = await fetch(url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'AWEMA-SEO-Bot/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const content = await response.text();

      // Extractions SEO
      const title = content.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();
      const description = content.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)/i)?.[1]?.trim();
      const h1Tags = content.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
      const imgWithoutAlt = (content.match(/<img(?![^>]*alt)/gi) || []).length;
      const totalImages = (content.match(/<img/gi) || []).length;

      const checks = {
        title: {
          exists: !!title,
          length: title?.length || 0,
          optimal: title && title.length >= 30 && title.length <= 60
        },
        description: {
          exists: !!description,
          length: description?.length || 0,
          optimal: description && description.length >= 120 && description.length <= 160
        },
        headings: {
          h1Count: h1Tags.length,
          hasH1: h1Tags.length > 0,
          optimal: h1Tags.length === 1
        },
        images: {
          total: totalImages,
          withoutAlt: imgWithoutAlt,
          altRatio: totalImages > 0 ? ((totalImages - imgWithoutAlt) / totalImages * 100).toFixed(1) : 100
        },
        structure: {
          hasRobots: /<meta[^>]*name=["\']robots/i.test(content),
          hasCanonical: /<link[^>]*rel=["\']canonical/i.test(content),
          hasOpenGraph: /<meta[^>]*property=["\']og:/i.test(content),
          hasStructuredData: /application\/ld\+json/i.test(content)
        }
      };

      // Calcul du score SEO
      let score = 0;
      const maxScore = 10;

      if (checks.title.optimal) score += 2;
      else if (checks.title.exists) score += 1;

      if (checks.description.optimal) score += 2;
      else if (checks.description.exists) score += 1;

      if (checks.headings.optimal) score += 2;
      else if (checks.headings.hasH1) score += 1;

      if (checks.images.altRatio >= 90) score += 1;
      if (checks.structure.hasCanonical) score += 1;
      if (checks.structure.hasOpenGraph) score += 1;
      if (checks.structure.hasStructuredData) score += 1;

      const recommendations = [];

      if (!checks.title.optimal) {
        recommendations.push(checks.title.exists
          ? `Optimiser la longueur du titre (${checks.title.length} caractères)`
          : 'Ajouter un titre de page'
        );
      }

      if (!checks.description.optimal) {
        recommendations.push(checks.description.exists
          ? `Optimiser la meta description (${checks.description.length} caractères)`
          : 'Ajouter une meta description'
        );
      }

      if (!checks.headings.optimal) {
        recommendations.push(checks.headings.h1Count === 0
          ? 'Ajouter un H1'
          : `Utiliser un seul H1 (${checks.headings.h1Count} trouvés)`
        );
      }

      if (checks.images.withoutAlt > 0) {
        recommendations.push(`Ajouter des attributs alt aux images (${checks.images.withoutAlt} manquants)`);
      }

      if (!checks.structure.hasCanonical) {
        recommendations.push('Ajouter une URL canonique');
      }

      if (!checks.structure.hasOpenGraph) {
        recommendations.push('Ajouter les balises Open Graph');
      }

      return {
        score,
        maxScore,
        percentage: Math.round((score / maxScore) * 100),
        grade: score >= 8 ? 'A' : score >= 6 ? 'B' : score >= 4 ? 'C' : score >= 2 ? 'D' : 'F',
        checks,
        recommendations,
        details: {
          title: title || 'Aucun titre',
          description: description || 'Aucune description',
          h1Count: h1Tags.length
        }
      };

    } catch (error) {
      return {
        score: 0,
        error: error.message,
        grade: 'F',
        recommendations: ['Impossible d\'effectuer l\'audit SEO']
      };
    }
  }

  private setupContinuousMonitoring(deployment: any): void {
    const monitorId = deployment.deploymentId;

    // Nettoyer le monitoring existant
    if (this.activeMonitors.has(monitorId)) {
      clearInterval(this.activeMonitors.get(monitorId)!);
    }

    // Configurer le monitoring continu
    const interval = setInterval(async () => {
      try {
        console.log('🔄 [Monitor] Check périodique:', deployment.url);

        const healthCheck = await this.performHealthCheck(deployment.url);

        if (healthCheck.status === 'unhealthy') {
          console.error('🚨 [Monitor] Site en panne détecté:', deployment.url);

          // Ici on pourrait:
          // - Envoyer des alertes
          // - Déclencher des actions de récupération
          // - Notifier les administrateurs

          if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('monitoring.alert', {
              detail: {
                deploymentId: monitorId,
                url: deployment.url,
                status: healthCheck.status,
                timestamp: new Date().toISOString()
              }
            }));
          }
        }

      } catch (error) {
        console.warn('⚠️ [Monitor] Erreur check périodique:', error.message);
      }
    }, this.config.checkInterval || 300000); // 5 minutes par défaut

    this.activeMonitors.set(monitorId, interval);

    console.log('⏰ [Monitor] Monitoring continu configuré pour:', deployment.url);
  }

  private calculateOverallStatus(health: any, performance: any, ssl: any): string {
    if (health.status === 'unhealthy') return 'unhealthy';
    if (ssl.grade === 'F' || performance.grade === 'F') return 'degraded';
    if (health.status === 'degraded') return 'degraded';
    return 'healthy';
  }

  private calculateQualityScore(health: any, performance: any, ssl: any, seo: any): number {
    const weights = {
      health: 0.4,   // 40%
      performance: 0.3, // 30%
      ssl: 0.2,      // 20%
      seo: 0.1       // 10%
    };

    const scores = {
      health: health.status === 'healthy' ? 100 : health.status === 'degraded' ? 70 : 0,
      performance: this.gradeToScore(performance.grade),
      ssl: this.gradeToScore(ssl.grade),
      seo: seo.percentage || 0
    };

    return Math.round(
      scores.health * weights.health +
      scores.performance * weights.performance +
      scores.ssl * weights.ssl +
      scores.seo * weights.seo
    );
  }

  private gradeToScore(grade: string): number {
    const gradeMap: Record<string, number> = {
      'A+': 100, 'A': 95, 'B': 80, 'C': 65, 'D': 50, 'F': 0
    };
    return gradeMap[grade] || 0;
  }

  private generateRecommendations(health: any, performance: any, ssl: any, seo: any): string[] {
    const recommendations: string[] = [];

    // Health recommendations
    if (health.status !== 'healthy') {
      recommendations.push('Résoudre les problèmes de santé du site');
    }

    // Performance recommendations
    if (performance.recommendations?.length > 0) {
      recommendations.push(...performance.recommendations);
    }

    // SSL recommendations
    if (ssl.recommendations?.length > 0) {
      recommendations.push(...ssl.recommendations);
    }

    // SEO recommendations
    if (seo.recommendations?.length > 0) {
      recommendations.push(...seo.recommendations.slice(0, 3)); // Top 3 SEO issues
    }

    return recommendations.slice(0, 8); // Maximum 8 recommandations
  }

  /**
   * Arrête le monitoring pour un déploiement
   */
  stopMonitoring(deploymentId: string): void {
    if (this.activeMonitors.has(deploymentId)) {
      clearInterval(this.activeMonitors.get(deploymentId)!);
      this.activeMonitors.delete(deploymentId);
      console.log('⏹️ [Monitor] Monitoring arrêté pour:', deploymentId);
    }
  }

  /**
   * Arrête tous les monitorings
   */
  stopAllMonitoring(): void {
    this.activeMonitors.forEach((interval, deploymentId) => {
      clearInterval(interval);
      console.log('⏹️ [Monitor] Monitoring arrêté pour:', deploymentId);
    });
    this.activeMonitors.clear();
  }

  /**
   * Obtient la liste des monitorings actifs
   */
  getActiveMonitors(): string[] {
    return Array.from(this.activeMonitors.keys());
  }
}

// Configuration par défaut
const defaultMonitoringConfig: MonitoringConfig = {
  continuousMonitoring: true,
  checkInterval: 300000, // 5 minutes
  alertThreshold: 3, // 3 échecs consécutifs avant alerte
  performanceThreshold: 3000, // 3 secondes
  seoMinScore: 70 // Score SEO minimum
};

export const deploymentMonitor = new DeploymentMonitorService(defaultMonitoringConfig);

export default DeploymentMonitorService;
/**
 * AGENT 8 : API Route - Analytics de déploiement
 *
 * GET /api/deployment/analytics?projectName=xxx
 * Récupérer les métriques Cloudflare pour un projet
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const projectName = url.searchParams.get('projectName');
    const period = url.searchParams.get('period') || '24h'; // 24h, 7d, 30d

    if (!projectName) {
      return NextResponse.json(
        { error: 'Nom du projet requis' },
        { status: 400 }
      );
    }

    console.log('📊 [API] Récupération analytics pour:', projectName);

    // Configuration Cloudflare
    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    if (!cloudflareConfig.accountId || !cloudflareConfig.apiToken) {
      return NextResponse.json(
        { error: 'Configuration Cloudflare manquante' },
        { status: 500 }
      );
    }

    const baseUrl = 'https://api.cloudflare.com/client/v4';

    // 1. Obtenir les informations du projet
    const projectResponse = await fetch(
      `${baseUrl}/accounts/${cloudflareConfig.accountId}/pages/projects/${projectName}`,
      {
        headers: {
          'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
        }
      }
    );

    if (!projectResponse.ok) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    const projectData = await projectResponse.json();
    const project = projectData.result;

    // 2. Récupérer les analytics Web (si configuré)
    let webAnalytics = null;
    if (project.web_analytics_tag && cloudflareConfig.zoneId) {
      try {
        // Calculer les dates selon la période
        const endDate = new Date();
        const startDate = new Date();

        switch (period) {
          case '24h':
            startDate.setHours(startDate.getHours() - 24);
            break;
          case '7d':
            startDate.setDate(startDate.getDate() - 7);
            break;
          case '30d':
            startDate.setDate(startDate.getDate() - 30);
            break;
        }

        const analyticsResponse = await fetch(
          `${baseUrl}/zones/${cloudflareConfig.zoneId}/analytics/dashboard?since=${startDate.toISOString()}&until=${endDate.toISOString()}`,
          {
            headers: {
              'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
            }
          }
        );

        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          webAnalytics = analyticsData.result;
        }
      } catch (error) {
        console.warn('⚠️ Impossible de récupérer les analytics web:', error.message);
      }
    }

    // 3. Métriques de déploiement
    let deploymentMetrics = null;
    try {
      const deploymentsResponse = await fetch(
        `${baseUrl}/accounts/${cloudflareConfig.accountId}/pages/projects/${projectName}/deployments?per_page=20`,
        {
          headers: {
            'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
          }
        }
      );

      if (deploymentsResponse.ok) {
        const deploymentsData = await deploymentsResponse.json();
        const deployments = deploymentsData.result;

        // Calculer les métriques
        const successfulDeployments = deployments.filter((d: any) => d.stage === 'success');
        const failedDeployments = deployments.filter((d: any) => d.stage === 'failure');

        const buildTimes = deployments
          .filter((d: any) => d.stage === 'success' && d.created_on && d.modified_on)
          .map((d: any) => {
            const start = new Date(d.created_on).getTime();
            const end = new Date(d.modified_on).getTime();
            return end - start;
          });

        const avgBuildTime = buildTimes.length > 0
          ? buildTimes.reduce((a, b) => a + b, 0) / buildTimes.length
          : 0;

        deploymentMetrics = {
          totalDeployments: deployments.length,
          successfulDeployments: successfulDeployments.length,
          failedDeployments: failedDeployments.length,
          successRate: deployments.length > 0
            ? (successfulDeployments.length / deployments.length * 100).toFixed(1)
            : 0,
          averageBuildTime: Math.round(avgBuildTime / 1000), // en secondes
          lastDeployment: deployments[0] ? {
            id: deployments[0].id,
            stage: deployments[0].stage,
            url: deployments[0].url,
            created_on: deployments[0].created_on,
            modified_on: deployments[0].modified_on
          } : null,
          recentDeployments: deployments.slice(0, 10).map((d: any) => ({
            id: d.id,
            stage: d.stage,
            created_on: d.created_on,
            deployment_trigger: d.deployment_trigger
          }))
        };
      }
    } catch (error) {
      console.warn('⚠️ Impossible de récupérer les métriques de déploiement:', error.message);
    }

    // 4. Informations sur les domaines
    const domains = project.domains?.map((domain: any) => ({
      name: domain.name,
      status: domain.status,
      verification_status: domain.verification_status,
      created_on: domain.created_on
    })) || [];

    // 5. Performance metrics (simulées si pas d'accès direct)
    let performanceMetrics = null;
    const primaryDomain = domains[0]?.name || `${projectName}.pages.dev`;

    try {
      // Test simple de performance
      const startTime = Date.now();
      const response = await fetch(`https://${primaryDomain}`, {
        method: 'HEAD',
        timeout: 10000
      });
      const responseTime = Date.now() - startTime;

      performanceMetrics = {
        responseTime,
        status: response.ok ? 'online' : 'offline',
        statusCode: response.status,
        ssl: true,
        cdn: response.headers.get('CF-Ray') ? 'Cloudflare' : 'Unknown',
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      performanceMetrics = {
        status: 'error',
        error: error.message,
        lastChecked: new Date().toISOString()
      };
    }

    const response = {
      success: true,
      project: {
        id: project.id,
        name: project.name,
        created_on: project.created_on,
        production_branch: project.production_branch,
        domains
      },
      period,
      webAnalytics: webAnalytics ? {
        pageViews: webAnalytics.totals?.pageviews?.all || 0,
        uniqueVisitors: webAnalytics.totals?.uniques?.all || 0,
        bandwidth: webAnalytics.totals?.bandwidth?.all || 0,
        requests: webAnalytics.totals?.requests?.all || 0,
        threats: webAnalytics.totals?.threats?.all || 0,
        cachedRequests: webAnalytics.totals?.requests?.cached || 0,
        cacheRatio: webAnalytics.totals?.requests?.all > 0
          ? ((webAnalytics.totals?.requests?.cached || 0) / webAnalytics.totals.requests.all * 100).toFixed(1)
          : 0
      } : {
        message: 'Web Analytics non configuré',
        setupUrl: 'https://dash.cloudflare.com/analytics/web-analytics'
      },
      deploymentMetrics,
      performance: performanceMetrics,
      urls: {
        primary: `https://${primaryDomain}`,
        dashboard: `https://dash.cloudflare.com/pages/projects/${projectName}`,
        analytics: 'https://dash.cloudflare.com/analytics',
        webAnalytics: project.web_analytics_tag
          ? `https://dash.cloudflare.com/analytics/web-analytics/sites/${project.web_analytics_tag}`
          : null
      },
      recommendations: [
        !project.web_analytics_tag ? 'Activer Cloudflare Web Analytics pour des métriques détaillées' : null,
        deploymentMetrics?.successRate < 90 ? 'Améliorer le taux de succès des déploiements' : null,
        performanceMetrics?.responseTime > 2000 ? 'Optimiser les performances du site' : null,
        domains.length === 1 && domains[0]?.name.includes('.pages.dev') ? 'Configurer un domaine personnalisé' : null
      ].filter(Boolean),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ [API] Erreur récupération analytics:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Activer Web Analytics pour un projet
    const body = await request.json();
    const { projectName, enableAnalytics = true } = body;

    if (!projectName) {
      return NextResponse.json(
        { error: 'Nom du projet requis' },
        { status: 400 }
      );
    }

    console.log('📈 [API] Configuration Web Analytics pour:', projectName);

    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    const baseUrl = 'https://api.cloudflare.com/client/v4';

    if (enableAnalytics) {
      // Créer un site Web Analytics
      const analyticsResponse = await fetch(
        `${baseUrl}/accounts/${cloudflareConfig.accountId}/rum/site_info`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: projectName,
            auto_install: true
          })
        }
      );

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        const webAnalyticsTag = analyticsData.result.tag;

        // Mettre à jour le projet avec le tag Analytics
        const updateResponse = await fetch(
          `${baseUrl}/accounts/${cloudflareConfig.accountId}/pages/projects/${projectName}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              web_analytics_tag: webAnalyticsTag,
              web_analytics_token: analyticsData.result.snippet
            })
          }
        );

        if (updateResponse.ok) {
          return NextResponse.json({
            success: true,
            message: 'Web Analytics activé avec succès',
            webAnalyticsTag,
            dashboardUrl: `https://dash.cloudflare.com/analytics/web-analytics/sites/${webAnalyticsTag}`,
            timestamp: new Date().toISOString()
          });
        }
      }

      throw new Error('Impossible d\'activer Web Analytics');
    }

    return NextResponse.json({
      success: true,
      message: 'Configuration Analytics mise à jour'
    });

  } catch (error) {
    console.error('❌ [API] Erreur configuration analytics:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
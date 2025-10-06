/**
 * AGENT 8 : API Route - Status de déploiement
 *
 * GET /api/deployment/status?projectName=xxx&deploymentId=xxx
 * Obtenir le statut en temps réel du déploiement
 */

import { NextRequest, NextResponse } from 'next/server';
import { CloudflareDeploymentService } from '../../../../lib/services/cloudflare-deployment.service';
import { CloudflareDNSService } from '../../../../lib/services/cloudflare-dns.service';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const projectName = url.searchParams.get('projectName');
    const deploymentId = url.searchParams.get('deploymentId');
    const domain = url.searchParams.get('domain');

    if (!projectName) {
      return NextResponse.json(
        { error: 'Nom du projet requis (projectName)' },
        { status: 400 }
      );
    }

    // Configuration Cloudflare
    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    const deployService = new CloudflareDeploymentService(cloudflareConfig);
    const dnsService = new CloudflareDNSService(cloudflareConfig);

    // 1. Statut du projet
    const project = await deployService.getProject?.(projectName) || null;

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    // 2. Statut du déploiement spécifique (si fourni)
    let deploymentStatus = null;
    if (deploymentId) {
      try {
        deploymentStatus = await deployService.getDeploymentStatus(projectName, deploymentId);
      } catch (error) {
        console.warn('⚠️ Impossible de récupérer le statut du déploiement:', error.message);
      }
    }

    // 3. Vérification DNS (si domaine fourni)
    let dnsStatus = null;
    if (domain) {
      try {
        dnsStatus = await dnsService.checkDNSPropagation(domain);
      } catch (error) {
        console.warn('⚠️ Impossible de vérifier la propagation DNS:', error.message);
      }
    }

    // 4. Health check de l'URL
    let healthCheck = null;
    const siteUrl = project.domains?.[0]?.name
      ? `https://${project.domains[0].name}`
      : `https://${projectName}.pages.dev`;

    try {
      const healthResponse = await fetch(siteUrl, {
        method: 'HEAD',
        timeout: 10000
      });

      healthCheck = {
        url: siteUrl,
        status: healthResponse.ok ? 'online' : 'offline',
        statusCode: healthResponse.status,
        responseTime: healthResponse.headers.get('CF-Ray') ? 'cached' : 'fresh',
        ssl: siteUrl.startsWith('https://'),
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      healthCheck = {
        url: siteUrl,
        status: 'error',
        error: error.message,
        checkedAt: new Date().toISOString()
      };
    }

    // 5. Analytics de base (si disponible)
    let analytics = null;
    try {
      // Cloudflare Web Analytics (si configuré)
      analytics = {
        enabled: !!project.web_analytics_tag,
        tag: project.web_analytics_tag,
        dashboardUrl: 'https://dash.cloudflare.com/analytics/web-analytics'
      };
    } catch (error) {
      // Analytics non disponibles
    }

    const response = {
      success: true,
      project: {
        id: project.id,
        name: project.name,
        created_on: project.created_on,
        production_branch: project.production_branch,
        domains: project.domains?.map((d: any) => ({
          name: d.name,
          status: d.status,
          verification_status: d.verification_status,
          created_on: d.created_on
        })) || [],
        latest_deployment: project.latest_deployment ? {
          id: project.latest_deployment.id,
          url: project.latest_deployment.url,
          stage: project.latest_deployment.stage,
          created_on: project.latest_deployment.created_on,
          modified_on: project.latest_deployment.modified_on
        } : null
      },
      deployment: deploymentStatus ? {
        id: deploymentStatus.id,
        stage: deploymentStatus.stage, // queued, building, deploying, success, failure
        url: deploymentStatus.url,
        created_on: deploymentStatus.created_on,
        modified_on: deploymentStatus.modified_on,
        deployment_trigger: deploymentStatus.deployment_trigger,
        build_config: deploymentStatus.build_config
      } : null,
      dns: dnsStatus,
      health: healthCheck,
      analytics,
      urls: {
        production: siteUrl,
        cloudflarePages: `https://${projectName}.pages.dev`,
        dashboard: `https://dash.cloudflare.com/pages/projects/${projectName}`,
        analytics: analytics?.enabled ? analytics.dashboardUrl : null
      },
      checkedAt: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ [API] Erreur récupération statut:', error);

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
    // Webhook pour notifications de déploiement
    const body = await request.json();
    const { event, project, deployment } = body;

    console.log('🔔 [API] Webhook déploiement:', event, project?.name);

    // Traitement des événements Cloudflare Pages
    switch (event) {
      case 'deployment.started':
        console.log('🚀 Déploiement démarré:', project.name);
        break;

      case 'deployment.success':
        console.log('✅ Déploiement réussi:', project.name, deployment.url);
        break;

      case 'deployment.failed':
        console.error('❌ Déploiement échoué:', project.name);
        break;

      default:
        console.log('📝 Événement non géré:', event);
    }

    // Ici, on pourrait:
    // - Mettre à jour une base de données
    // - Envoyer des notifications
    // - Déclencher d'autres actions

    return NextResponse.json({
      success: true,
      message: 'Webhook traité',
      event,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ [API] Erreur traitement webhook:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
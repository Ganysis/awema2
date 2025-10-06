/**
 * AGENT 8 : API Route - Déploiement Cloudflare
 *
 * POST /api/deployment/cloudflare
 * Lancer le déploiement complet sur Cloudflare Pages
 */

import { NextRequest, NextResponse } from 'next/server';
import { CloudflareDeploymentService } from '../../../../lib/services/cloudflare-deployment.service';
import { CloudflareBuildService } from '../../../../lib/services/cloudflare-build.service';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 [API] Début déploiement Cloudflare...');

    const body = await request.json();
    const {
      workflow,
      astroProject,
      sanityConfig,
      buildConfig = {
        buildFlags: ['--silent'],
        businessName: workflow?.businessName || 'Site',
        primaryColor: workflow?.primaryColor || '#0066CC'
      }
    } = body;

    // Validation des données requises
    if (!workflow) {
      return NextResponse.json(
        { error: 'Données workflow manquantes' },
        { status: 400 }
      );
    }

    if (!astroProject) {
      return NextResponse.json(
        { error: 'Projet Astro manquant' },
        { status: 400 }
      );
    }

    if (!sanityConfig) {
      return NextResponse.json(
        { error: 'Configuration Sanity manquante' },
        { status: 400 }
      );
    }

    // Configuration Cloudflare
    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    // Vérifier les variables d'environnement
    if (!cloudflareConfig.accountId || !cloudflareConfig.apiToken) {
      return NextResponse.json(
        { error: 'Configuration Cloudflare manquante (variables d\'environnement)' },
        { status: 500 }
      );
    }

    // 1. Initialiser les services
    const buildService = new CloudflareBuildService(buildConfig);
    const deployService = new CloudflareDeploymentService(cloudflareConfig);

    // 2. Build du projet Astro
    console.log('🔨 [API] Build Astro en cours...');
    const buildResult = await buildService.buildAstroProject(astroProject, sanityConfig, workflow);

    if (!buildResult.success) {
      await buildService.cleanup();
      return NextResponse.json(
        {
          error: 'Échec du build Astro',
          details: buildResult.buildOutput
        },
        { status: 500 }
      );
    }

    // 3. Déploiement sur Cloudflare Pages
    console.log('☁️ [API] Déploiement Cloudflare en cours...');
    const deployResult = await deployService.deployToCloudflare(
      workflow,
      {
        files: astroProject.files,
        zipBuffer: buildResult.archivePath ? require('fs').readFileSync(buildResult.archivePath) : null
      },
      sanityConfig
    );

    // 4. Nettoyage des fichiers temporaires
    await buildService.cleanup();

    // 5. Réponse de succès
    const response = {
      success: true,
      deployment: {
        projectId: deployResult.projectId,
        deploymentId: deployResult.deploymentId,
        url: deployResult.url,
        customDomain: deployResult.customDomain,
        buildTime: buildResult.buildTime,
        deployTime: deployResult.deployTime,
        performance: deployResult.performance
      },
      build: {
        bundleSize: buildResult.performance?.bundleSize,
        chunkCount: buildResult.performance?.chunkCount,
        assetCount: buildResult.performance?.assetCount,
        optimizations: buildResult.optimizations
      },
      nextSteps: [
        'Le site est maintenant en ligne',
        'La propagation DNS peut prendre jusqu\'à 5 minutes',
        'Les certificats SSL sont automatiquement provisionnés',
        'Le cache CDN sera populé lors des premières visites'
      ],
      urls: {
        production: deployResult.url,
        cloudflarePages: `https://${deployResult.projectId}.pages.dev`,
        analytics: `https://dash.cloudflare.com/analytics/web-analytics`
      },
      timestamp: new Date().toISOString()
    };

    console.log('✅ [API] Déploiement Cloudflare terminé:', response.deployment.url);

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ [API] Erreur déploiement Cloudflare:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        troubleshooting: [
          'Vérifier les variables d\'environnement Cloudflare',
          'Contrôler les permissions API Token',
          'Valider le format des données d\'entrée',
          'Consulter les logs pour plus de détails'
        ]
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Lister les projets déployés
    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    const deployService = new CloudflareDeploymentService(cloudflareConfig);
    const projects = await deployService.listProjects();

    return NextResponse.json({
      success: true,
      projects: projects.map(project => ({
        id: project.id,
        name: project.name,
        production_branch: project.production_branch,
        created_on: project.created_on,
        domains: project.domains,
        latest_deployment: project.latest_deployment
      }))
    });

  } catch (error) {
    console.error('❌ [API] Erreur liste projets:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
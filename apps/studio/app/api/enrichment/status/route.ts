import { NextRequest, NextResponse } from 'next/server';
import { enrichAndMigrateService } from '@/lib/services/enrich-and-migrate.service';

/**
 * API Route: GET /api/enrichment/status
 * Récupère le statut en temps réel de l'enrichissement d'un workflow
 *
 * Usage: GET /api/enrichment/status?workflowId=wf-123456
 */
export async function GET(request: NextRequest) {
  console.log('📊 API Enrichment: Récupération statut enrichissement...');

  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json({
        success: false,
        error: 'workflowId est requis',
        example: '/api/enrichment/status?workflowId=wf-123456'
      }, { status: 400 });
    }

    // Récupérer le statut depuis le service
    const statusResult = await enrichAndMigrateService.getEnrichmentStatus(workflowId);

    // Enrichir avec des informations supplémentaires
    const enrichedStatus = {
      success: true,
      workflowId,
      ...statusResult,
      timestamp: new Date().toISOString(),
      actions: generateAvailableActions(statusResult.status),
      endpoints: {
        retry: `/api/enrichment/retry?workflowId=${workflowId}`,
        preview: `/api/enrichment/preview?workflowId=${workflowId}`,
        cleanup: `/api/enrichment/cleanup?workflowId=${workflowId}`
      }
    };

    // Ajouter des détails spécifiques selon le statut
    if (statusResult.status === 'enrichment_completed') {
      enrichedStatus.nextStep = {
        agent: 'Agent 8',
        action: 'Déploiement Astro + Cloudflare Pages',
        endpoint: '/api/deployment/start',
        estimatedDuration: 60000 // 1 minute
      };
    } else if (statusResult.status === 'enrichment_failed') {
      enrichedStatus.troubleshooting = {
        retryAvailable: true,
        commonCauses: [
          'Timeout de l\'API DeepSeek',
          'Données de template corrompues',
          'Erreur de conversion Astro',
          'Problème d\'intégration Sanity'
        ],
        supportContact: '/api/support/create-ticket'
      };
    }

    console.log(`📈 Statut enrichissement ${workflowId}: ${statusResult.status} (${statusResult.progress}%)`);

    return NextResponse.json(enrichedStatus);

  } catch (error) {
    console.error('❌ Erreur récupération statut enrichissement:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * API Route: POST /api/enrichment/status
 * Met à jour le statut d'enrichissement (usage interne)
 */
export async function POST(request: NextRequest) {
  console.log('📝 API Enrichment: Mise à jour statut...');

  try {
    const body = await request.json();
    const { workflowId, status, details, progress } = body;

    if (!workflowId || !status) {
      return NextResponse.json({
        success: false,
        error: 'workflowId et status sont requis'
      }, { status: 400 });
    }

    // Validation du statut
    const validStatuses = [
      'enrichment_started',
      'content_generation_started',
      'content_mapping_started',
      'astro_conversion_started',
      'sanity_content_migration_started',
      'enrichment_completed',
      'enrichment_failed'
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        error: `Statut invalide. Statuts valides: ${validStatuses.join(', ')}`
      }, { status: 400 });
    }

    // En production, ici on mettrait à jour la base de données
    // await updateEnrichmentStatus(workflowId, status, details, progress);

    console.log(`📊 Statut mis à jour ${workflowId}: ${status}`);

    return NextResponse.json({
      success: true,
      workflowId,
      status,
      updatedAt: new Date().toISOString(),
      message: 'Statut mis à jour avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur mise à jour statut:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

/**
 * API Route: DELETE /api/enrichment/status
 * Supprime le statut d'enrichissement (nettoyage)
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json({
        success: false,
        error: 'workflowId est requis'
      }, { status: 400 });
    }

    // Nettoyer le statut et les ressources associées
    await enrichAndMigrateService.cleanupEnrichmentResources(workflowId);

    console.log(`🧹 Statut nettoyé pour workflow ${workflowId}`);

    return NextResponse.json({
      success: true,
      workflowId,
      message: 'Statut et ressources nettoyés avec succès',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur nettoyage statut:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur nettoyage des ressources',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

/**
 * Génère les actions disponibles selon le statut
 */
function generateAvailableActions(status: string): string[] {
  const actions: string[] = [];

  switch (status) {
    case 'enrichment_started':
    case 'content_generation_started':
    case 'content_mapping_started':
    case 'astro_conversion_started':
    case 'sanity_content_migration_started':
      actions.push('cancel', 'view_progress');
      break;

    case 'enrichment_completed':
      actions.push('view_result', 'download_project', 'deploy', 'cleanup');
      break;

    case 'enrichment_failed':
      actions.push('retry', 'view_error', 'contact_support', 'cleanup');
      break;

    case 'unknown':
      actions.push('refresh', 'restart');
      break;

    default:
      actions.push('view_details');
  }

  return actions;
}

/**
 * Middleware pour logging et monitoring
 */
function logStatusRequest(workflowId: string, status: string, userAgent?: string) {
  const logData = {
    timestamp: new Date().toISOString(),
    workflowId,
    status,
    userAgent,
    endpoint: '/api/enrichment/status'
  };

  // En production, envoyer vers un service de monitoring
  console.log('📊 Status Request:', JSON.stringify(logData));
}

/**
 * Headers CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
import { NextRequest, NextResponse } from 'next/server';
import { workflowSanityIntegrationService } from '@/lib/services/workflow-sanity-integration.service';

/**
 * API POST /api/workflow/sanity-integration
 * Point d'entrée principal pour l'intégration Sanity dans le workflow
 * Appelé par Agent 4 après qu'un client ait choisi son template
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API /api/workflow/sanity-integration - Début intégration...');

    const body = await request.json();
    const {
      workflowId,
      clientId,
      selectedTemplate,
      formData,
      businessInfo,
      options = {}
    } = body;

    // Validation des données requises
    if (!workflowId || !clientId || !selectedTemplate || !businessInfo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données requises manquantes',
          required: ['workflowId', 'clientId', 'selectedTemplate', 'businessInfo'],
          code: 'MISSING_REQUIRED_DATA'
        },
        { status: 400 }
      );
    }

    console.log(`📋 Intégration Sanity pour workflow ${workflowId} (${businessInfo.businessName})`);

    // Préparer les données d'intégration
    const integrationStep = {
      workflowId,
      clientId,
      selectedTemplate,
      formData: formData || {},
      businessInfo: {
        businessName: businessInfo.businessName,
        businessType: businessInfo.businessType,
        domain: businessInfo.domain || `${businessInfo.businessName.toLowerCase().replace(/\s+/g, '-')}.exemple.fr`,
        colors: businessInfo.colors || {
          primary: '#2563eb',
          secondary: '#1e40af',
          accent: '#3b82f6'
        }
      },
      options: {
        includeTestData: options.includeTestData !== false,
        generateSampleContent: options.generateSampleContent !== false,
        createInitialPages: options.createInitialPages !== false,
        setupNavigation: options.setupNavigation !== false
      }
    };

    // Lancer l'intégration Sanity
    const integrationResult = await workflowSanityIntegrationService.integrateAfterTemplateChoice(integrationStep);

    if (!integrationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Échec de l\'intégration Sanity',
          details: integrationResult.error,
          workflowId,
          code: 'SANITY_INTEGRATION_FAILED'
        },
        { status: 500 }
      );
    }

    // Générer les données de handoff pour Agent 7 (Astro)
    const astroHandoff = await workflowSanityIntegrationService.generateAstroHandoff(workflowId);

    const result = {
      success: true,
      workflowId,
      integration: {
        ...integrationResult,
        integrationTime: new Date().toISOString()
      },
      handoff: {
        // Données pour Agent 7 (Configuration Astro)
        astro: astroHandoff,
        readyForNextStep: true,
        nextAgent: 'astro-setup',
        nextStepInstructions: 'Configurer le projet Astro avec les credentials Sanity fournis'
      },
      monitoring: {
        sanityStudioUrl: integrationResult.credentials.studioUrl,
        contentManagementReady: true,
        webhooksConfigured: true,
        statusEndpoint: `/api/sanity/status?projectId=${integrationResult.projectId}`
      }
    };

    console.log(`✅ Intégration Sanity complète pour workflow ${workflowId}`);
    console.log(`🤝 Handoff prêt pour Agent 7 (Astro): projet ${integrationResult.projectId}`);

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('❌ Erreur API intégration Sanity:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur interne lors de l\'intégration Sanity',
        details: error.message,
        code: 'INTERNAL_INTEGRATION_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * API GET /api/workflow/sanity-integration?workflowId={id}
 * Récupère le statut de l'intégration Sanity pour un workflow
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get('workflowId');
    const action = url.searchParams.get('action');

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: 'WorkflowId requis',
          code: 'MISSING_WORKFLOW_ID'
        },
        { status: 400 }
      );
    }

    console.log(`📊 Vérification statut intégration Sanity pour workflow ${workflowId}`);

    switch (action) {
      case 'status':
        const status = await workflowSanityIntegrationService.getIntegrationStatus(workflowId);
        return NextResponse.json({
          success: true,
          workflowId,
          status,
          checkedAt: new Date().toISOString()
        });

      case 'handoff':
        const handoff = await workflowSanityIntegrationService.generateAstroHandoff(workflowId);
        return NextResponse.json({
          success: true,
          workflowId,
          handoff,
          generatedAt: new Date().toISOString()
        });

      case 'stats':
        const stats = workflowSanityIntegrationService.getIntegrationStats();
        return NextResponse.json({
          success: true,
          stats,
          generatedAt: new Date().toISOString()
        });

      default:
        // Par défaut, retourner le statut
        const defaultStatus = await workflowSanityIntegrationService.getIntegrationStatus(workflowId);
        return NextResponse.json({
          success: true,
          workflowId,
          status: defaultStatus,
          checkedAt: new Date().toISOString()
        });
    }

  } catch (error) {
    console.error('❌ Erreur vérification statut intégration:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la vérification du statut',
        details: error.message,
        code: 'STATUS_CHECK_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * API PUT /api/workflow/sanity-integration
 * Met à jour ou relance l'intégration Sanity
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflowId, action, updates } = body;

    if (!workflowId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: 'WorkflowId et action requis',
          code: 'MISSING_PARAMETERS'
        },
        { status: 400 }
      );
    }

    console.log(`🔄 Action ${action} sur intégration Sanity pour workflow ${workflowId}`);

    switch (action) {
      case 'retry':
        const retryResult = await workflowSanityIntegrationService.retryIntegration(workflowId);
        return NextResponse.json({
          success: true,
          action: 'retry',
          workflowId,
          result: retryResult,
          retriedAt: new Date().toISOString()
        });

      case 'update-content':
        if (!updates) {
          return NextResponse.json(
            {
              success: false,
              error: 'Données de mise à jour requises',
              code: 'MISSING_UPDATES'
            },
            { status: 400 }
          );
        }

        const updateResult = await workflowSanityIntegrationService.updateSanityContent(workflowId, updates);
        return NextResponse.json({
          success: updateResult.success,
          action: 'update-content',
          workflowId,
          result: updateResult,
          updatedAt: new Date().toISOString()
        });

      case 'cleanup':
        const cleanupResult = await workflowSanityIntegrationService.cleanupWorkflowSanity(workflowId);
        return NextResponse.json({
          success: cleanupResult.success,
          action: 'cleanup',
          workflowId,
          result: cleanupResult,
          cleanedAt: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Action non supportée: ${action}`,
            availableActions: ['retry', 'update-content', 'cleanup'],
            code: 'UNSUPPORTED_ACTION'
          },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('❌ Erreur action intégration Sanity:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'exécution de l\'action',
        details: error.message,
        code: 'ACTION_EXECUTION_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * API DELETE /api/workflow/sanity-integration?workflowId={id}
 * Nettoie complètement l'intégration Sanity d'un workflow
 */
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: 'WorkflowId requis',
          code: 'MISSING_WORKFLOW_ID'
        },
        { status: 400 }
      );
    }

    console.log(`🗑️ Suppression intégration Sanity pour workflow ${workflowId}`);

    const cleanupResult = await workflowSanityIntegrationService.cleanupWorkflowSanity(workflowId);

    return NextResponse.json({
      success: cleanupResult.success,
      workflowId,
      cleanup: cleanupResult,
      deletedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur suppression intégration Sanity:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la suppression',
        details: error.message,
        code: 'DELETION_ERROR'
      },
      { status: 500 }
    );
  }
}
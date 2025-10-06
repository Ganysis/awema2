/**
 * API Route principale pour l'orchestration AWEMA 3.0
 *
 * Endpoints:
 * - POST /api/workflow/orchestrate : Démarrer nouveau workflow
 * - GET /api/workflow/orchestrate?id=xxx : Obtenir statut
 * - PUT /api/workflow/orchestrate : Mettre à jour (sélection client)
 */

import { NextRequest, NextResponse } from 'next/server';
import { AwemaWorkflowAPI } from '@/lib/services/awema-workflow-orchestrator.service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validation basique
    if (!formData.businessName || !formData.email) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Démarrer le workflow AWEMA complet
    const workflowId = await AwemaWorkflowAPI.startWorkflow(formData);

    return NextResponse.json({
      success: true,
      workflowId,
      message: 'Workflow démarré avec succès',
      nextSteps: {
        mockups: 'Génération en cours (2-3 min)',
        email: 'Sera envoyé automatiquement',
        selection: `/client-selection/${workflowId}`
      }
    });

  } catch (error) {
    console.error('Erreur orchestration:', error);
    return NextResponse.json(
      { error: 'Erreur lors du démarrage du workflow' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('id');

    if (!workflowId) {
      // Retourner le dashboard si pas d'ID
      const dashboard = await AwemaWorkflowAPI.getDashboard();
      return NextResponse.json(dashboard);
    }

    // Obtenir le statut d'un workflow spécifique
    const status = await AwemaWorkflowAPI.getStatus(workflowId);

    return NextResponse.json(status);

  } catch (error) {
    console.error('Erreur obtention statut:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du statut' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { workflowId, selectedTemplate } = await request.json();

    if (!workflowId || !selectedTemplate) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Gérer la sélection du client
    await AwemaWorkflowAPI.handleSelection(workflowId, selectedTemplate);

    return NextResponse.json({
      success: true,
      message: 'Sélection enregistrée, production en cours',
      estimatedTime: '2-3 heures'
    });

  } catch (error) {
    console.error('Erreur sélection:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sélection' },
      { status: 500 }
    );
  }
}
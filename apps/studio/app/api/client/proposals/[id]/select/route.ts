import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const body = await request.json();
    const { selectedOption } = body;

    // Valider l'option
    if (!selectedOption || selectedOption < 1 || selectedOption > 3) {
      return NextResponse.json(
        { success: false, error: 'Option invalide' },
        { status: 400 }
      );
    }

    // Récupérer la proposition
    const proposal = await prisma.templateProposal.findUnique({
      where: { 
        id: proposalId,
        status: 'PROPOSED'
      }
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposition introuvable ou déjà sélectionnée' },
        { status: 404 }
      );
    }

    // Mettre à jour avec la sélection
    await prisma.templateProposal.update({
      where: { id: proposalId },
      data: {
        selectedOption,
        status: 'SELECTED',
        selectedAt: new Date()
      }
    });

    // Créer une log d'activité
    await prisma.activityLog.create({
      data: {
        action: 'template_selected',
        entity: 'template_proposal',
        entityId: proposalId,
        details: JSON.stringify({
          selectedOption,
          clientId: proposal.clientId
        })
      }
    });

    // TODO: Notifier l'admin de la sélection (email, notification, etc.)

    return NextResponse.json({
      success: true,
      message: 'Votre choix a été enregistré avec succès'
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la sélection' },
      { status: 500 }
    );
  }
}
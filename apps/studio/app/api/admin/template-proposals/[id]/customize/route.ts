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
    const { customizations, status } = body;

    // Récupérer la proposition actuelle
    const proposal = await prisma.templateProposal.findUnique({
      where: { id: proposalId }
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposition introuvable' },
        { status: 404 }
      );
    }

    // Parser les options existantes
    const option1 = proposal.option1 ? JSON.parse(proposal.option1) : {};
    const option2 = proposal.option2 ? JSON.parse(proposal.option2) : {};
    const option3 = proposal.option3 ? JSON.parse(proposal.option3) : {};

    // Mettre à jour avec les personnalisations
    if (customizations.option1) {
      option1.adminNotes = customizations.option1.notes;
      option1.customHighlights = customizations.option1.highlights || [];
    }
    if (customizations.option2) {
      option2.adminNotes = customizations.option2.notes;
      option2.customHighlights = customizations.option2.highlights || [];
    }
    if (customizations.option3) {
      option3.adminNotes = customizations.option3.notes;
      option3.customHighlights = customizations.option3.highlights || [];
    }

    // Sauvegarder
    await prisma.templateProposal.update({
      where: { id: proposalId },
      data: {
        option1: JSON.stringify(option1),
        option2: JSON.stringify(option2),
        option3: JSON.stringify(option3),
        adminNotes: customizations.globalNotes,
        customMessage: customizations.globalMessage,
        status: status || 'CUSTOMIZING'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Personnalisations sauvegardées'
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    );
  }
}
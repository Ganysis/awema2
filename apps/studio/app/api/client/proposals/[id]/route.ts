import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;

    // Récupérer la proposition
    const proposal = await prisma.templateProposal.findUnique({
      where: { 
        id: proposalId,
        status: { in: ['PROPOSED', 'SELECTED', 'CONFIRMED'] } // Seulement les propositions envoyées
      },
      include: {
        client: {
          select: {
            name: true,
            companyName: true
          }
        }
      }
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposition introuvable ou non disponible' },
        { status: 404 }
      );
    }

    // Formater les données pour le client (sans l'analyse IA)
    const clientProposal = {
      id: proposal.id,
      customMessage: proposal.customMessage,
      option1: proposal.option1 ? JSON.parse(proposal.option1) : null,
      option2: proposal.option2 ? JSON.parse(proposal.option2) : null,
      option3: proposal.option3 ? JSON.parse(proposal.option3) : null,
      selectedOption: proposal.selectedOption,
      status: proposal.status
    };

    return NextResponse.json({
      success: true,
      proposal: clientProposal
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
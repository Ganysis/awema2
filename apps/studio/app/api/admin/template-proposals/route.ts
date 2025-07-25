import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Récupérer toutes les propositions avec les infos client
    const proposals = await prisma.templateProposal.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parser les données JSON
    const formattedProposals = proposals.map(proposal => ({
      ...proposal,
      formData: JSON.parse(proposal.formData),
      aiAnalysis: proposal.aiAnalysis ? JSON.parse(proposal.aiAnalysis) : null,
      option1: proposal.option1 ? JSON.parse(proposal.option1) : null,
      option2: proposal.option2 ? JSON.parse(proposal.option2) : null,
      option3: proposal.option3 ? JSON.parse(proposal.option3) : null
    }));

    return NextResponse.json({
      success: true,
      proposals: formattedProposals
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Créer une nouvelle proposition après soumission du formulaire
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, formData } = body;

    // Créer la proposition
    const proposal = await prisma.templateProposal.create({
      data: {
        clientId,
        formData: JSON.stringify(formData),
        status: 'PENDING'
      }
    });

    return NextResponse.json({
      success: true,
      proposalId: proposal.id
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
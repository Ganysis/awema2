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
    const { customizations, customMessage } = body;

    // Récupérer la proposition avec le client
    const proposal = await prisma.templateProposal.findUnique({
      where: { id: proposalId },
      include: {
        client: true
      }
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposition introuvable' },
        { status: 404 }
      );
    }

    // Mettre à jour le statut et le message
    await prisma.templateProposal.update({
      where: { id: proposalId },
      data: {
        customMessage: customMessage || customizations.globalMessage,
        status: 'PROPOSED',
        proposedAt: new Date()
      }
    });

    // TODO: Ici, on pourrait envoyer un email au client avec un lien vers la page de sélection
    // Pour l'instant, on simule juste l'envoi

    // Créer une activité log (si vous avez ce système)
    await prisma.activityLog.create({
      data: {
        action: 'proposal_sent',
        entity: 'template_proposal',
        entityId: proposalId,
        details: JSON.stringify({
          clientName: proposal.client.name,
          clientEmail: proposal.client.email
        })
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Propositions envoyées au client',
      viewUrl: `/client/proposals/${proposalId}` // URL pour le client
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}
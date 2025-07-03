import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/api/middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const updatedClient = await prisma.client.update({
      where: { id: params.id },
      data: { status: status.toUpperCase() },
    });

    return NextResponse.json({
      success: true,
      data: updatedClient,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
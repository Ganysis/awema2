import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authenticate } from '@/lib/api/middleware'

const prisma = new PrismaClient()

// POST /api/projects/[id]/versions/[versionId]/restore - Restaurer une version
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    const authResult = await authenticate(request)
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      )
    }

    // Récupérer la version à restaurer
    const version = await prisma.contentVersion.findUnique({
      where: { id: params.versionId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            createdBy: true,
          },
        },
      },
    })

    if (!version || version.projectId !== params.id) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      )
    }

    // Créer une nouvelle version avec les données restaurées
    const lastVersion = await prisma.contentVersion.findFirst({
      where: { projectId: params.id },
      orderBy: { version: 'desc' },
      select: { version: true },
    })

    const restoredVersion = await prisma.contentVersion.create({
      data: {
        projectId: params.id,
        contentId: params.id,
        version: (lastVersion?.version || 0) + 1,
        data: version.data,
        changes: `Restored from version ${version.version}`,
        createdBy: authResult.user?.id,
      },
    })

    // Mettre à jour le projet avec les données restaurées
    await prisma.project.update({
      where: { id: params.id },
      data: {
        data: version.data,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'version_restored',
        entity: 'project',
        entityId: params.id,
        userId: authResult.user?.id,
        projectId: params.id,
        details: JSON.stringify({
          restoredFromVersion: version.version,
          newVersion: restoredVersion.version,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: restoredVersion.id,
        version: restoredVersion.version,
        restoredFrom: version.version,
      },
    })
  } catch (error) {
    console.error('Error restoring version:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to restore version' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
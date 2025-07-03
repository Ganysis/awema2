import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authenticate } from '@/lib/api/middleware'
import { z } from 'zod'

const prisma = new PrismaClient()

// Schema pour créer une version
const createVersionSchema = z.object({
  data: z.string(), // JSON string du projet
  description: z.string().optional(),
  isAutoSave: z.boolean().default(false),
})

// GET /api/projects/[id]/versions - Liste les versions d'un projet
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticate(request)
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      )
    }

    // Vérifier que l'utilisateur a accès au projet
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      select: { createdBy: true }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Récupérer les versions
    const versions = await prisma.contentVersion.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        version: true,
        changes: true,
        createdAt: true,
        creator: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      take: 50, // Limiter à 50 versions
    })

    return NextResponse.json({
      success: true,
      data: versions,
    })
  } catch (error) {
    console.error('Error fetching versions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch versions' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST /api/projects/[id]/versions - Créer une nouvelle version
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticate(request)
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createVersionSchema.parse(body)

    // Vérifier que le projet existe
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Obtenir le numéro de version suivant
    const lastVersion = await prisma.contentVersion.findFirst({
      where: { projectId: params.id },
      orderBy: { version: 'desc' },
      select: { version: true },
    })

    const nextVersion = (lastVersion?.version || 0) + 1

    // Créer la version
    const version = await prisma.contentVersion.create({
      data: {
        projectId: params.id,
        contentId: params.id, // On utilise l'ID du projet comme contentId
        version: nextVersion,
        data: validatedData.data,
        changes: validatedData.description || (validatedData.isAutoSave ? 'Auto-save' : 'Manual save'),
        createdBy: authResult.user?.id,
      },
    })

    // Mettre à jour le projet avec les dernières données
    await prisma.project.update({
      where: { id: params.id },
      data: { 
        data: validatedData.data,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: validatedData.isAutoSave ? 'auto_saved' : 'version_created',
        entity: 'project',
        entityId: params.id,
        userId: authResult.user?.id,
        projectId: params.id,
        details: JSON.stringify({
          version: nextVersion,
          description: validatedData.description,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: version.id,
        version: version.version,
        createdAt: version.createdAt,
      },
    })
  } catch (error) {
    console.error('Error creating version:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create version' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { formLinkService } from '@/lib/db/services/form-link.service'
import { getServerSession } from '@/lib/auth/session'
import { z } from 'zod'

const createFormLinkSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  clientId: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
  maxUses: z.number().optional(),
})

// GET /api/forms - List all form links
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // For now, list all form links in dev mode
    // TODO: Filter by user when auth is implemented
    const formLinks = await formLinkService.list()
    
    return NextResponse.json(formLinks)
  } catch (error) {
    console.error('Failed to fetch form links:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form links' },
      { status: 500 }
    )
  }
}

// POST /api/forms - Create a new form link
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await req.json()
    const data = createFormLinkSchema.parse(body)
    
    const formLink = await formLinkService.create({
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      createdBy: session.userId,
    })
    
    // Return the full URL for convenience
    const url = `${process.env.NEXT_PUBLIC_APP_URL || req.headers.get('origin')}/form/${formLink.uniqueId}`
    
    return NextResponse.json({
      ...formLink,
      url,
    })
  } catch (error) {
    console.error('Failed to create form link:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create form link' },
      { status: 500 }
    )
  }
}
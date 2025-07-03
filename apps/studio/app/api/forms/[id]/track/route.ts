import { NextRequest, NextResponse } from 'next/server'
import { formLinkService } from '@/lib/db/services/form-link.service'
import { z } from 'zod'

const trackSchema = z.object({
  action: z.enum(['start', 'view']),
  sessionId: z.string().optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: uniqueId } = params
    const body = await req.json()
    const { action, sessionId } = trackSchema.parse(body)
    
    // Check if form link exists
    const formLink = await formLinkService.getByUniqueId(uniqueId)
    if (!formLink || formLink.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Form not found or inactive' },
        { status: 404 }
      )
    }
    
    // Track the action
    if (action === 'start') {
      await formLinkService.incrementStarted(uniqueId)
      
      // Create a submission record to track progress
      const ip = req.headers.get('x-forwarded-for') || 
                 req.headers.get('x-real-ip') || 
                 'unknown'
      const userAgent = req.headers.get('user-agent') || 'unknown'
      
      if (sessionId) {
        await formLinkService.createSubmission({
          formLinkId: formLink.id,
          data: {},
          step: 0,
          completed: false,
          ip,
          userAgent,
          sessionId,
        })
      }
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Form tracking error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid tracking data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to track form action' },
      { status: 500 }
    )
  }
}
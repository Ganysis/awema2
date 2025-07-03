import { NextRequest, NextResponse } from 'next/server'
import { formLinkService } from '@/lib/db/services/form-link.service'
import { z } from 'zod'

const saveProgressSchema = z.object({
  data: z.any(),
  step: z.number().min(0).max(8),
  sessionId: z.string(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: uniqueId } = params
    const body = await req.json()
    const { data, step, sessionId } = saveProgressSchema.parse(body)
    
    // Check if form link exists and is active
    const formLink = await formLinkService.getByUniqueId(uniqueId)
    if (!formLink || formLink.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Form not found or inactive' },
        { status: 404 }
      )
    }
    
    // Get or create submission record
    let submission = await formLinkService.getLatestSubmission(formLink.id, sessionId)
    
    if (submission) {
      // Update existing submission
      await formLinkService.updateSubmission(submission.id, {
        data,
        step,
        completed: step === 8,
      })
    } else {
      // Create new submission
      const ip = req.headers.get('x-forwarded-for') || 
                 req.headers.get('x-real-ip') || 
                 'unknown'
      const userAgent = req.headers.get('user-agent') || 'unknown'
      
      submission = await formLinkService.createSubmission({
        formLinkId: formLink.id,
        data,
        step,
        completed: false,
        ip,
        userAgent,
        sessionId,
      })
    }
    
    return NextResponse.json({ 
      success: true,
      submissionId: submission.id,
    })
    
  } catch (error) {
    console.error('Save progress error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid progress data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    )
  }
}
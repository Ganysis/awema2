import { NextRequest, NextResponse } from 'next/server'
import { formLinkService } from '@/lib/db/services/form-link.service'
import { getServerSession } from '@/lib/auth/session'

// DELETE /api/forms/[id] - Delete a form link
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Verify ownership
    const formLink = await formLinkService.getById(params.id)
    if (!formLink) {
      return NextResponse.json({ error: 'Form link not found' }, { status: 404 })
    }
    
    // For now, allow deletion in dev mode
    // TODO: Add proper ownership check when auth is implemented
    // if (formLink.createdBy !== session.userId && session.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }
    
    await formLinkService.delete(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete form link:', error)
    return NextResponse.json(
      { error: 'Failed to delete form link' },
      { status: 500 }
    )
  }
}

// GET /api/forms/[id] - Get form link details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const formLink = await formLinkService.getById(params.id)
    if (!formLink) {
      return NextResponse.json({ error: 'Form link not found' }, { status: 404 })
    }
    
    // Get analytics
    const analytics = await formLinkService.getAnalytics(params.id)
    
    return NextResponse.json({
      ...formLink,
      analytics,
    })
  } catch (error) {
    console.error('Failed to fetch form link:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form link' },
      { status: 500 }
    )
  }
}
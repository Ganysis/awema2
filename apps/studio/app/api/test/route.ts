import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    // Test database connection
    const clientCount = await prisma.client.count()
    const projectCount = await prisma.project.count()
    const formLinkCount = await prisma.formLink.count()
    
    return NextResponse.json({
      success: true,
      database: 'connected',
      counts: {
        clients: clientCount,
        projects: projectCount,
        formLinks: formLinkCount
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
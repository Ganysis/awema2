import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL || 'AWEMA Studio <noreply@awema.studio>',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@awema.studio',
  })
}
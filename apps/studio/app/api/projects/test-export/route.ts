
import { NextRequest, NextResponse } from 'next/server';
import { SimpleExportV2 } from '@/lib/services/simple-export-v2';

export async function POST(request: NextRequest) {
  try {
    const { projectData } = await request.json();
    const html = await SimpleExportV2.exportToHTML(projectData);
    
    return NextResponse.json({
      success: true,
      html: html
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
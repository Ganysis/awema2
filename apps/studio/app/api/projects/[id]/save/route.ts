import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
// import { authenticate } from '@/lib/api/middleware'; // TODO: Fix bcrypt
import { z } from 'zod';

// Validation schema
const saveProjectSchema = z.object({
  data: z.object({
    businessInfo: z.any().optional(), // More flexible
    projectName: z.string().optional(),
    globalHeader: z.any().nullable().optional(),
    globalFooter: z.any().nullable().optional(),
    pages: z.array(z.any()).optional(),
    theme: z.any().optional(), // More flexible
  }),
});

// POST /api/projects/[id]/save - Save project data
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Re-enable authentication
    // const authResult = await authenticate(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: authResult.error },
    //     { status: 401 }
    //   );
    // }

    console.log('Saving project:', params.id);
    
    const body = await request.json();
    console.log('Received data keys:', Object.keys(body.data || {}));
    
    const { data } = saveProjectSchema.parse(body);
    
    // Check data size
    const dataString = JSON.stringify(data);
    console.log('Data size:', (dataString.length / 1024).toFixed(2), 'KB');
    
    // SQLite has a default limit of 1MB for strings
    if (dataString.length > 900000) { // Leave some margin
      console.warn('Data too large for SQLite, attempting to compress...');
      // TODO: Implement compression if needed
    }

    // Update project with new data
    const project = await ProjectService.update(params.id, {
      data: data, // This will be stringified by the service
    });
    
    console.log('Project saved successfully');

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project saved successfully',
    });
  } catch (error: any) {
    console.error('Save project error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save project' },
      { status: 500 }
    );
  }
}
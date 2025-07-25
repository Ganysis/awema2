import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
import { z } from 'zod';

// Validation schema for save data
const saveDataSchema = z.object({
  data: z.any(), // Accept any structure for now
});

// POST /api/projects/[projectId]/save - Save project data
export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    console.log('Saving project:', projectId);

    const body = await request.json();
    const validationResult = saveDataSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Update project data
    const updatedProject = await ProjectService.update(projectId, {
      data: JSON.stringify(validationResult.data.data),
      updatedAt: new Date(),
    });

    console.log('Project saved successfully');

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (error: any) {
    console.error('Save project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save project' },
      { status: 500 }
    );
  }
}
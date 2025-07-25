import { NextRequest, NextResponse } from 'next/server';
import { TemplateSelectionService } from '@/lib/services/template-selection.service';
import { z } from 'zod';

// Schema de validation pour la sélection de templates
const SelectionCriteriaSchema = z.object({
  businessType: z.string(),
  services: z.array(z.string()),
  targetAudience: z.array(z.string()),
  stylePreference: z.string(),
  urgencyLevel: z.enum(['high', 'medium', 'low']),
  hasGallery: z.boolean(),
  hasTestimonials: z.boolean(),
  hasPricing: z.boolean(),
  is24x7Available: z.boolean(),
  yearEstablished: z.number().optional(),
  serviceAreas: z.array(z.string()),
  specializations: z.array(z.string()),
  goals: z.array(z.string())
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valider les données
    const criteria = SelectionCriteriaSchema.parse(body);
    
    // Service de sélection
    const selectionService = new TemplateSelectionService();
    
    // Sélectionner les 3 meilleurs templates
    const selectedTemplates = await selectionService.selectBestTemplates(criteria, 3);
    
    // Nettoyer
    await selectionService.cleanup();
    
    return NextResponse.json({
      success: true,
      templates: selectedTemplates,
      message: `${selectedTemplates.length} templates sélectionnés pour ${criteria.businessType}`
    });
    
  } catch (error) {
    console.error('Erreur sélection templates:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Données invalides', 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la sélection des templates' 
      },
      { status: 500 }
    );
  }
}
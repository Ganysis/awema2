import { NextRequest, NextResponse } from 'next/server';
import { ClaudeContentService } from '@/lib/services/claude-content.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, context, apiKey } = body;

    if (!prompt || !context) {
      return NextResponse.json(
        { error: 'Prompt et contexte requis' },
        { status: 400 }
      );
    }

    // Utiliser la clé API fournie ou celle de l'environnement
    const claudeService = new ClaudeContentService(apiKey);
    
    const result = await claudeService.generateContent({
      prompt,
      context
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur génération contenu:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération du contenu',
        content: 'Erreur temporaire. Veuillez réessayer.'
      },
      { status: 500 }
    );
  }
}
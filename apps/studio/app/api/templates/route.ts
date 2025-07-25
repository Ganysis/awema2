import { NextRequest, NextResponse } from 'next/server';
import { TemplateGeneratorEngine, TEMPLATE_PATTERNS } from '@/lib/services/template-generator-engine';

// GET - Récupérer la liste des templates disponibles
export async function GET() {
  try {
    // Transformer les patterns en format attendu par le frontend
    const templates = Object.entries(TEMPLATE_PATTERNS).map(([key, pattern]) => ({
      id: key,
      name: pattern.name,
      description: pattern.description,
      category: detectCategoryFromTags(pattern.theme?.colors?.primary || '#0066CC'),
      tags: getTagsFromPattern(pattern),
      theme: pattern.theme || {
        colors: {
          primary: '#0066CC',
          secondary: '#10B981'
        }
      }
    }));

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error loading templates:', error);
    return NextResponse.json(
      { error: 'Failed to load templates' },
      { status: 500 }
    );
  }
}

// Helper pour détecter la catégorie selon les couleurs
function detectCategoryFromTags(primaryColor: string): string {
  const colorMappings: Record<string, string> = {
    '#DC2626': 'plombier', // Rouge urgence
    '#1E40AF': 'electricien', // Bleu électrique
    '#7C3AED': 'peintre', // Violet créatif
    '#92400E': 'menuisier', // Marron bois
    '#059669': 'jardinier', // Vert nature
    '#991B1B': 'couvreur', // Rouge foncé toiture
    '#0066CC': 'chauffagiste' // Bleu chaleur
  };

  return colorMappings[primaryColor] || 'plombier';
}

// Helper pour extraire les tags d'un pattern
function getTagsFromPattern(pattern: any): string[] {
  const tags: string[] = [];
  
  // Analyser les blocs pour déterminer les tags
  if (pattern.blocks) {
    pattern.blocks.forEach((block: any) => {
      if (block.type.includes('gallery')) tags.push('portfolio');
      if (block.type.includes('testimonials')) tags.push('avis');
      if (block.type.includes('pricing')) tags.push('tarifs');
      if (block.variant?.includes('urgent')) tags.push('urgence');
      if (block.variant?.includes('luxury')) tags.push('premium');
      if (block.variant?.includes('local')) tags.push('local');
    });
  }

  // Ajouter des tags selon le nom
  if (pattern.name.toLowerCase().includes('urgence')) tags.push('urgency');
  if (pattern.name.toLowerCase().includes('trust')) tags.push('trust');
  if (pattern.name.toLowerCase().includes('visual')) tags.push('showcase');
  if (pattern.name.toLowerCase().includes('local')) tags.push('local');

  return [...new Set(tags)]; // Supprimer les doublons
}
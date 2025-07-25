import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { TemplateSelectionService } from '@/lib/services/template-selection.service';
import { DeepSeekService } from '@/lib/services/deepseek.service';
import { ContentPersonalizationService } from '@/lib/services/content-personalization.service';
import { getRecommendedBlocks } from '@/lib/services/profession-specific-blocks';
import { AdaptiveTemplateService } from '@/lib/services/adaptive-template.service';
import { IntelligentBlockSelectorService } from '@/lib/services/intelligent-block-selector.service';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;

    // Récupérer la proposition
    const proposal = await prisma.templateProposal.findUnique({
      where: { id: proposalId }
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposition introuvable' },
        { status: 404 }
      );
    }

    const formData = JSON.parse(proposal.formData);

    // Service DeepSeek pour l'analyse IA
    const deepseekService = new DeepSeekService({
      apiKey: process.env.DEEPSEEK_API_KEY || ''
    });

    // 1. Analyser le profil client avec DeepSeek
    console.log('🤖 Analyse du profil client avec DeepSeek...');
    const aiAnalysis = await deepseekService.analyzeBusinessProfile(formData);
    console.log('✅ Analyse terminée:', aiAnalysis);

    // Services
    const selectionService = new TemplateSelectionService();
    const contentService = new ContentPersonalizationService();
    const adaptiveService = new AdaptiveTemplateService();
    const blockSelector = new IntelligentBlockSelectorService();

    // 2. Utiliser le nouveau système de templates adaptatifs
    console.log('🎯 Génération de 3 variations uniques de templates...');
    
    // Générer 3 variations complètement différentes
    const uniqueVariations = await adaptiveService.generateUniqueVariations(
      formData,
      aiAnalysis,
      3
    );

    // 3. Pour chaque variation, personnaliser avec le contenu
    const templatesWithPersonalization = await Promise.all(
      uniqueVariations.map(async (variation, index) => {
        console.log(`📝 Personnalisation de la variation ${index + 1}: ${variation.name}`);
        
        // Générer du contenu personnalisé unique pour cette variation
        const personalizedContent = await contentService.generatePersonalizedContent(
          formData,
          aiAnalysis
        );
        
        // Sélection intelligente des blocs basée sur les données
        const criteria = {
          availableData: adaptiveService.analyzeAvailableData(formData),
          businessType: formData.businessType,
          businessCharacteristics: variation.personalizedContent.localSEO.areas || [],
          aiPriorities: aiAnalysis.priorities || []
        };
        
        const intelligentBlocks = blockSelector.selectOptimalBlocks(criteria);
        
        // Ajouter des blocs profession-specific
        const professionBlocks = getRecommendedBlocks(
          formData.businessType,
          aiAnalysis,
          formData
        );
        
        // Créer une structure de template unique
        let finalBlocks = [...variation.blocks];
        
        // Intégrer les blocs métier spécifiques
        professionBlocks.forEach(profBlock => {
          const insertPosition = profBlock.position - 1;
          if (insertPosition < finalBlocks.length) {
            finalBlocks.splice(insertPosition, 0, {
              type: profBlock.type,
              variant: profBlock.variant,
              position: profBlock.position,
              props: profBlock.props
            });
          } else {
            finalBlocks.push({
              type: profBlock.type,
              variant: profBlock.variant,
              position: finalBlocks.length + 1,
              props: profBlock.props
            });
          }
        });
        
        // Réorganiser les positions
        finalBlocks = finalBlocks.map((block, idx) => ({
          ...block,
          position: idx + 1
        }));
        
        // Générer des suggestions personnalisées
        const suggestions = await deepseekService.generatePersonalizationSuggestions(
          { name: variation.name, ...variation },
          formData,
          aiAnalysis
        );
        
        return {
          id: `adaptive-${index + 1}`,
          name: variation.name,
          description: variation.description,
          score: variation.score,
          blocks: finalBlocks,
          theme: variation.theme,
          personalizationSuggestions: suggestions,
          personalizedContent: personalizedContent,
          templateStructure: variation.structure
        };
      })
    );

    // 6. Préparer les options formatées avec l'analyse IA
    const options = templatesWithPersonalization.map((template, index) => ({
      templateId: template.id,
      templateName: template.name,
      score: template.aiScore || template.score,
      reasoning: `Template sélectionné par l'IA pour sa correspondance avec ${aiAnalysis.priorities?.join(', ')}`,
      blocks: template.blocks.map((b: any) => ({ 
        type: b.type, 
        variant: b.variant,
        props: b.props || {},
        position: b.position,
        professionSpecific: b.professionSpecific || false
      })),
      theme: template.theme,
      personalizationSuggestions: template.personalizationSuggestions,
      personalizedContent: template.personalizedContent,
      adminNotes: '',
      customHighlights: []
    }));

    // Mettre à jour la proposition
    await prisma.templateProposal.update({
      where: { id: proposalId },
      data: {
        aiAnalysis: JSON.stringify(aiAnalysis),
        option1: JSON.stringify(options[0]),
        option2: JSON.stringify(options[1]),
        option3: JSON.stringify(options[2]),
        status: 'ANALYZED',
        analyzedAt: new Date()
      }
    });

    await selectionService.cleanup();
    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Analyse terminée avec succès'
    });

  } catch (error) {
    console.error('Erreur analyse:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'analyse' },
      { status: 500 }
    );
  }
}
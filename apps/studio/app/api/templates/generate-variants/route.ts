import { NextRequest, NextResponse } from 'next/server';
import { TemplateGeneratorEngine } from '@/lib/services/template-generator-engine';
import { DeepSeekService } from '@/lib/services/deepseek.service';
import { ContentPersonalizationService } from '@/lib/services/content-personalization.service';
import { AdaptiveTemplateService } from '@/lib/services/adaptive-template.service';

export async function POST(request: NextRequest) {
  try {
    const { clientData, templateIds } = await request.json();

    if (!clientData || !templateIds || templateIds.length === 0) {
      return NextResponse.json(
        { error: 'Données client et templates requis' },
        { status: 400 }
      );
    }

    console.log('🚀 Génération de variantes pour:', {
      client: clientData.businessName,
      templates: templateIds
    });

    // Initialiser les services
    const templateEngine = new TemplateGeneratorEngine();
    const deepseekService = new DeepSeekService({
      apiKey: process.env.DEEPSEEK_API_KEY || ''
    });
    const contentService = new ContentPersonalizationService();
    const adaptiveService = new AdaptiveTemplateService();

    // 1. Analyser le profil client avec DeepSeek si configuré
    let aiAnalysis = null;
    if (process.env.DEEPSEEK_API_KEY) {
      try {
        console.log('🤖 Analyse IA du profil client...');
        console.time('DeepSeek Analysis');
        aiAnalysis = await deepseekService.analyzeBusinessProfile(clientData);
        console.timeEnd('DeepSeek Analysis');
        console.log('✅ Analyse IA complétée:', {
          priorities: aiAnalysis?.priorities?.length || 0,
          hasRecommendations: !!aiAnalysis?.templateRecommendations
        });
      } catch (error) {
        console.warn('⚠️ Analyse IA échouée, utilisation du mode template:', error);
      }
    } else {
      console.log('ℹ️ DeepSeek non configuré, utilisation du mode template');
    }

    // 2. Générer les variantes basées sur les templates sélectionnés
    const variants = [];

    for (const templateId of templateIds) {
      try {
        console.log(`📝 Génération de variante pour template: ${templateId}`);
        
        // Utiliser le service adaptatif pour créer une variante unique
        console.log('⏳ Génération de variante unique...');
        const analysisToUse = aiAnalysis || deepseekService.getDefaultAnalysis(clientData);
        const uniqueVariations = await adaptiveService.generateUniqueVariations(
          clientData,
          analysisToUse,
          1 // Une variante par template sélectionné
        );

        if (uniqueVariations.length > 0) {
          const variation = uniqueVariations[0];
          
          // Générer le contenu personnalisé
          const personalizedContent = await contentService.generatePersonalizedContent(
            clientData,
            aiAnalysis || adaptiveService.getDefaultAnalysis(clientData)
          );

          // Personnaliser les blocs avec le contenu
          const personalizedBlocks = await deepseekService.generateCustomizedTemplate(
            variation,
            clientData,
            personalizedContent
          );

          variants.push({
            id: `variant-${templateId}-${Date.now()}`,
            templateId,
            name: variation.name,
            description: variation.description,
            blocks: personalizedBlocks.blocks,
            theme: variation.theme,
            score: variation.score,
            personalizedContent,
            aiRecommendations: aiAnalysis?.priorities || []
          });
        }
      } catch (error) {
        console.error(`Erreur génération variante ${templateId}:`, error);
      }
    }

    // 3. Si pas assez de variantes, générer avec le moteur de templates
    if (variants.length < templateIds.length) {
      console.log('🔧 Génération de variantes supplémentaires avec le moteur de templates...');
      
      const engineVariants = await templateEngine.generateTemplates(
        clientData,
        templateIds.length - variants.length
      );

      engineVariants.forEach(template => {
        variants.push({
          id: template.id,
          templateId: 'engine-generated',
          name: template.name,
          description: template.description,
          blocks: template.blocks,
          theme: template.theme,
          score: template.score,
          personalizedContent: null,
          aiRecommendations: []
        });
      });
    }

    console.log(`✅ ${variants.length} variantes générées avec succès`);

    return NextResponse.json(variants);

  } catch (error) {
    console.error('Erreur génération variantes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération des variantes' },
      { status: 500 }
    );
  }
}

// Ajouter une méthode à AdaptiveTemplateService pour obtenir une analyse par défaut
declare module '@/lib/services/adaptive-template.service' {
  interface AdaptiveTemplateService {
    getDefaultAnalysis(formData: any): any;
  }
}
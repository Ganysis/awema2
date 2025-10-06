import { generateFullPage } from './generate-full-page.js';

export async function analyzeWebsite(params: any): Promise<any> {
  // Rediriger vers le générateur de page complète
  console.log('🔄 Génération de page complète depuis URL...');
  
  const result = await generateFullPage({
    url: params.url,
    style: params.style || 'corporate',
    businessInfo: params.businessInfo || {}
  });
  
  return {
    success: true,
    message: `Page complète générée avec ${result.blocks.length} blocs`,
    url: params.url,
    blocksGenerated: result.blocks.map(b => ({
      type: b.type,
      variant: b.variant,
      performance: b.performance
    })),
    totalSize: `${Math.round(result.analysis.performance.totalSize / 1024)}KB`,
    estimatedPageSpeed: result.analysis.performance.estimatedPageSpeed,
    page: result.page
  };
}
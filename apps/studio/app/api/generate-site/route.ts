import { NextRequest, NextResponse } from 'next/server';
import { AIContentGeneratorService } from '@/lib/services/ai-content-generator.service';
import { InternalLinkBuilderService } from '@/lib/services/internal-link-builder.service';
import { ContentCacheService } from '@/lib/services/content-cache.service';
import { MediaOptimizationService } from '@/lib/services/media-optimization.service';
import { AISiteGeneratorService } from '@/lib/services/ai-site-generator.service';

// Initialize services with API keys from environment
const aiConfig = {
  deepseek: process.env.DEEPSEEK_API_KEY ? {
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat' as const,
    maxTokens: 8000,
    temperature: 0.7,
    costPer1kTokens: 0.002
  } : undefined,
  claude: process.env.CLAUDE_API_KEY ? {
    apiKey: process.env.CLAUDE_API_KEY,
    model: 'claude-3-sonnet-20240229' as const,
    maxTokens: 4000,
    temperature: 0.7,
    costPer1kTokens: 0.015
  } : undefined,
  openai: process.env.OPENAI_API_KEY ? {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-3.5-turbo' as const,
    maxTokens: 4000,
    temperature: 0.7,
    costPer1kTokens: 0.01
  } : undefined
};

// Instantiate services
const aiGenerator = new AIContentGeneratorService(aiConfig);
const linkBuilder = new InternalLinkBuilderService();
const contentCache = new ContentCacheService();
const mediaOptimizer = new MediaOptimizationService();
const siteGenerator = new AISiteGeneratorService(
  aiGenerator,
  linkBuilder,
  contentCache,
  mediaOptimizer
);

export async function POST(request: NextRequest) {
  try {
    const { clientData, config } = await request.json();

    // Validate request
    if (!clientData || !clientData.businessName) {
      return NextResponse.json(
        { error: 'Client data is required' },
        { status: 400 }
      );
    }

    // Check if AI is configured
    if (!aiConfig.deepseek && !aiConfig.claude && !aiConfig.openai) {
      console.warn('No AI provider configured, using template mode');
      config.enableAI = false;
    }

    console.log('🚀 Starting AI site generation:', {
      client: clientData.businessName,
      config: config
    });

    // Generate the site
    const generatedSite = await siteGenerator.generateSite(clientData, {
      quality: config.quality || 'premium',
      enableAI: config.enableAI !== false,
      aiProvider: config.provider || 'deepseek',
      targetWordsPerPage: config.wordsPerPage || 2000,
      internalLinksPerPage: 15,
      batchSize: 10,
      cacheEnabled: config.enableCache !== false,
      mediaOptimization: true
    });

    // Transform pages to match editor format
    const transformedPages = generatedSite.pages.map(page => ({
      id: page.slug,
      name: page.title,
      slug: page.slug,
      blocks: page.blocks,
      seo: {
        title: page.title,
        description: page.metaDescription,
        schema: page.schema
      }
    }));

    // Update the site structure for the editor
    const siteData = {
      pages: transformedPages,
      theme: {
        colors: {
          primary: clientData.primaryColor || '#0066cc',
          secondary: clientData.secondaryColor || '#ff6600'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        }
      },
      settings: {
        analytics: generatedSite.analytics,
        sitemap: generatedSite.sitemapXml,
        robots: generatedSite.robotsTxt
      }
    };

    // Clear AI generator cost tracking for next generation
    aiGenerator.resetCost();

    return NextResponse.json({
      success: true,
      site: siteData,
      stats: generatedSite.stats,
      message: `Site généré avec succès ! ${generatedSite.stats.totalPages} pages créées.`
    });

  } catch (error) {
    console.error('Site generation error:', error);
    
    // Detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      message: errorMessage,
      type: error?.constructor?.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    };

    return NextResponse.json(
      { 
        error: 'Failed to generate site',
        details: errorDetails 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check service status
export async function GET() {
  const status = {
    configured: {
      deepseek: !!process.env.DEEPSEEK_API_KEY,
      claude: !!process.env.CLAUDE_API_KEY,
      openai: !!process.env.OPENAI_API_KEY
    },
    cacheStats: contentCache.getStats(),
    recommendation: 'DeepSeek configured and ready for use!'
  };

  return NextResponse.json(status);
}
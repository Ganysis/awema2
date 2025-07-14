import { NextResponse } from 'next/server';
import { getBlockRenderFunction, getBlockById } from '@/lib/blocks/block-registry';

export async function GET() {
  try {
    const results: any = {};
    
    // Liste des blocs V3 à tester
    const v3Blocks = [
      'hero-v3-perfect',
      'features-v3-perfect',
      'services-v3-perfect',
      'gallery-v3-perfect',
      'content-v3-perfect',
      'testimonials-v3-perfect',
      'pricing-v3-perfect',
      'faq-v3-perfect',
      'cta-v3-perfect',
      'contact-v3-perfect'
    ];
    
    for (const blockId of v3Blocks) {
      const blockDef = getBlockById(blockId);
      const renderFn = getBlockRenderFunction(blockId);
      
      results[blockId] = {
        found: !!blockDef,
        hasRenderFunction: !!renderFn,
        hasProps: blockDef?.block?.props ? blockDef.block.props.length : 0,
        defaultProps: blockDef?.block?.defaultProps ? Object.keys(blockDef.block.defaultProps) : []
      };
      
      // Tester le rendu
      if (renderFn && blockDef?.block?.defaultProps) {
        try {
          const rendered = renderFn(blockDef.block.defaultProps);
          results[blockId].renderResult = {
            type: typeof rendered,
            hasHtml: !!rendered?.html,
            hasCss: !!rendered?.css,
            hasJs: !!rendered?.js,
            htmlLength: rendered?.html?.length || 0,
            cssLength: rendered?.css?.length || 0
          };
        } catch (error: any) {
          results[blockId].renderError = error.message;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      results
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { blockType, props } = await request.json();
    
    const renderFn = getBlockRenderFunction(blockType);
    if (!renderFn) {
      return NextResponse.json({
        success: false,
        error: `No render function found for ${blockType}`
      }, { status: 404 });
    }
    
    const result = renderFn(props || {});
    
    return NextResponse.json({
      success: true,
      blockType,
      result: {
        type: typeof result,
        hasHtml: !!result?.html,
        hasCss: !!result?.css,
        hasJs: !!result?.js,
        htmlPreview: result?.html?.substring(0, 200) + '...',
        cssPreview: result?.css?.substring(0, 200) + '...'
      }
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
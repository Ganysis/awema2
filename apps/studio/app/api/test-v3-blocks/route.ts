import { NextResponse } from 'next/server';
import { getBlockById } from '@/lib/blocks/block-registry';

export async function GET() {
  try {
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
      'contact-v3-perfect',
      'header-v3-perfect',
      'footer-v3-perfect'
    ];

    const results = v3Blocks.map(blockId => {
      try {
        const block = getBlockById(blockId);
        if (!block) {
          return {
            blockId,
            status: 'not_found',
            error: 'Block not found'
          };
        }

        // Get default data
        const defaultData = block.block.defaultData || {};
        
        // Check for variant prop
        const props = block.block.props || [];
        const variantProp = props.find(p => p.name === 'variant');
        
        // Try to render with default data
        let renderResult = null;
        let renderError = null;
        try {
          renderResult = block.block.render(defaultData);
        } catch (error) {
          renderError = error instanceof Error ? error.message : 'Unknown render error';
        }

        // Check for potential issues
        const issues = [];
        
        // Check if HTML contains [object Object]
        if (renderResult?.html?.includes('[object Object]')) {
          issues.push('HTML contains [object Object]');
        }
        
        // Check if variant prop has options
        if (variantProp && (!variantProp.options || variantProp.options.length === 0)) {
          issues.push('Variant prop has no options');
        }
        
        // Check if CSS/JS are missing
        if (renderResult && !renderResult.css) {
          issues.push('Missing CSS');
        }
        if (renderResult && !renderResult.js) {
          issues.push('Missing JS');
        }

        return {
          blockId,
          status: 'success',
          blockName: block.block.name,
          category: block.block.category,
          hasVariantProp: !!variantProp,
          variantOptions: variantProp?.options?.length || 0,
          propsCount: props.length,
          renderSuccess: !!renderResult && !renderError,
          renderError,
          issues: issues.length > 0 ? issues : null,
          // Sample of rendered HTML (first 200 chars)
          htmlPreview: renderResult?.html ? renderResult.html.substring(0, 200) + '...' : null
        };
      } catch (error) {
        return {
          blockId,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });

    // Summary
    const summary = {
      total: results.length,
      success: results.filter(r => r.status === 'success').length,
      notFound: results.filter(r => r.status === 'not_found').length,
      errors: results.filter(r => r.status === 'error').length,
      withIssues: results.filter(r => r.issues && r.issues.length > 0).length,
      renderFailures: results.filter(r => r.status === 'success' && !r.renderSuccess).length
    };

    return NextResponse.json({
      summary,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
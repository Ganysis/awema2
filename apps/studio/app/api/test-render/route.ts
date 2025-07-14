import { NextRequest, NextResponse } from 'next/server';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';

export async function POST(request: NextRequest) {
  try {
    const { blockType, props } = await request.json();
    
    const renderFn = getBlockRenderFunction(blockType);
    if (!renderFn) {
      return NextResponse.json({
        success: false,
        error: 'Block type not found'
      });
    }
    
    const result = renderFn(props, []);
    
    return NextResponse.json({
      success: true,
      html: result.html || '',
      css: result.css || '',
      js: result.js || ''
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
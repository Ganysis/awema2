import { NextResponse } from 'next/server';
import { getBlockById } from '@/lib/blocks/block-registry';

export async function GET() {
  try {
    const heroBlock = getBlockById('hero-v3-perfect');
    
    if (!heroBlock) {
      return NextResponse.json({ error: 'Block not found' });
    }
    
    // Examiner les props
    const props = heroBlock.block.props;
    const variantProp = props.find(p => p.name === 'variant');
    
    return NextResponse.json({
      blockName: heroBlock.block.name,
      totalProps: props.length,
      variantProp: variantProp ? {
        name: variantProp.name,
        label: variantProp.label,
        type: variantProp.type,
        control: variantProp.editorConfig?.control,
        hasOptions: !!variantProp.options,
        optionsCount: variantProp.options?.length,
        options: variantProp.options
      } : null,
      allPropNames: props.map(p => p.name)
    });
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
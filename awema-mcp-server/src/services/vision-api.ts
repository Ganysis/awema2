import Anthropic from 'anthropic';
import { VisionAnalysisResult } from '../types/analysis.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface VisionAnalysisOptions {
  analyzeLayout?: boolean;
  analyzeColors?: boolean;
  analyzeTypography?: boolean;
  elementType?: string;
}

export async function analyzeWithVision(
  imageBuffer: Buffer,
  options: VisionAnalysisOptions = {}
): Promise<VisionAnalysisResult> {
  const {
    analyzeLayout = true,
    analyzeColors = true,
    analyzeTypography = true,
    elementType,
  } = options;

  const base64Image = imageBuffer.toString('base64');
  
  const systemPrompt = `You are a professional web design analyst. Analyze the provided image and extract design elements that can be used to create similar web components.`;
  
  const userPrompt = `Analyze this ${elementType || 'web design'} image and provide:

${analyzeLayout ? '1. Layout structure (grid, flex, positioning, spacing)' : ''}
${analyzeColors ? '2. Color palette (primary, secondary, accent colors, background, text)' : ''}
${analyzeTypography ? '3. Typography (font families, sizes, weights, hierarchy)' : ''}
4. Design style (corporate, modern, creative, minimal)
5. Key visual elements and their positions
6. Overall design complexity and formality

Provide the analysis in a structured JSON format with these exact fields:
{
  "description": "Brief description of the design",
  "layout": { "type": "grid|flex|absolute", "columns": number, "gap": "spacing value" },
  "colors": { "dominant": ["hex colors"], "palette": { "primary": "#hex", "secondary": "#hex" }, "contrast": number },
  "typography": { "detected": boolean, "style": "serif|sans-serif", "hierarchy": ["heading styles"] },
  "elements": [{ "type": "element type", "position": { "x": 0, "y": 0, "width": 100, "height": 100 } }],
  "style": { "formality": "casual|professional|corporate", "complexity": "simple|moderate|complex", "modernness": "classic|modern|cutting-edge" }
}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: userPrompt,
            },
          ],
        },
      ],
      system: systemPrompt,
    });

    // Parse the response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const analysis = JSON.parse(jsonMatch[0]);
        return analysis as VisionAnalysisResult;
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
      }
    }

    // Fallback analysis
    return {
      description: 'Failed to analyze image properly',
      style: {
        formality: 'professional',
        complexity: 'moderate',
        modernness: 'modern',
      },
      recommendations: ['Manual review recommended'],
    } as VisionAnalysisResult;
  } catch (error) {
    console.error('Vision API error:', error);
    throw new Error(`Vision analysis failed: ${error.message}`);
  }
}

export async function analyzeDesignFeedback(
  currentDesign: string,
  feedback: string
): Promise<{ changes: Record<string, any>; explanation: string }> {
  const systemPrompt = `You are a web design expert. Analyze the user's feedback and determine what specific changes need to be made to the design.`;
  
  const userPrompt = `Current design code:
${currentDesign}

User feedback:
${feedback}

Analyze the feedback and provide:
1. Specific changes needed (colors, spacing, layout, etc.)
2. Explanation of why these changes improve the design

Format as JSON:
{
  "changes": {
    "colors": { "primary": "#new-hex" },
    "spacing": { "padding": "new-value" },
    "layout": { "type": "new-layout" }
  },
  "explanation": "Why these changes improve the design"
}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      changes: {},
      explanation: 'Could not parse feedback',
    };
  } catch (error) {
    console.error('Feedback analysis error:', error);
    throw new Error(`Feedback analysis failed: ${error.message}`);
  }
}
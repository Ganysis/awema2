export interface WebsiteAnalysisParams {
  url: string;
  elements?: string[];
  extractColors?: boolean;
  extractFonts?: boolean;
  extractLayouts?: boolean;
}

export interface ImageAnalysisParams {
  imagePath: string;
  blockType?: string;
  style?: 'corporate' | 'modern' | 'creative' | 'minimal' | 'bold';
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  additional: string[];
}

export interface Typography {
  primary: string;
  secondary?: string;
  size: {
    base: string;
    heading: string;
    small: string;
  };
  weight: {
    normal: number;
    medium: number;
    bold: number;
  };
  lineHeight: string;
}

export interface LayoutPattern {
  type: 'grid' | 'flex' | 'absolute' | 'float';
  columns?: number;
  gap?: string;
  alignment?: string;
  distribution?: string;
}

export interface VisionAnalysisResult {
  description: string;
  layout?: LayoutPattern;
  colors?: {
    dominant: string[];
    palette: ColorPalette;
    contrast: number;
  };
  typography?: {
    detected: boolean;
    style: 'serif' | 'sans-serif' | 'display' | 'monospace';
    hierarchy: string[];
  };
  elements?: {
    type: string;
    position: { x: number; y: number; width: number; height: number };
    content?: string;
  }[];
  style?: {
    formality: 'casual' | 'professional' | 'corporate' | 'creative';
    complexity: 'simple' | 'moderate' | 'complex';
    modernness: 'classic' | 'modern' | 'cutting-edge';
  };
}

export interface DesignAnalysis {
  url?: string;
  imagePath?: string;
  timestamp: string;
  elements: Record<string, VisionAnalysisResult>;
  styles: {
    fonts?: Typography;
    colors?: ColorPalette;
    colorPalette?: any;
  };
  visionAnalysis: VisionAnalysisResult;
  recommendations: string[];
}

export interface BlockGenerationParams {
  reference?: DesignAnalysis;
  blockType: string;
  variant: string;
  customizations?: {
    colors?: Partial<ColorPalette>;
    fonts?: Partial<Typography>;
    spacing?: {
      base: string;
      scale: number;
    };
  };
}

export interface GeneratedBlock {
  type: string;
  variant: string;
  code: string;
  css: string;
  defaultData: Record<string, any>;
  preview?: string;
}

export interface PreviewParams {
  blockCode: string;
  data?: Record<string, any>;
  format: 'html' | 'screenshot' | 'url';
}

export interface IterateParams {
  currentBlock: string;
  feedback: string;
  aspects?: ('colors' | 'layout' | 'typography' | 'spacing' | 'animations' | 'content')[];
}
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { temporal } from 'zundo';
import type { Block, BusinessInfo, DefaultBlock } from '@awema/shared';
import type { ColorScheme, TypographySystem, LayoutSystem } from '@awema/templates';

export interface EditorBlock {
  id: string;
  type: string;
  props: Record<string, any>;
  children: EditorBlock[];
  isSelected?: boolean;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  blocks: EditorBlock[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface Theme {
  variant: 'ultra-pro' | 'premium' | 'minimal';
  colors: ColorScheme & {
    textMuted?: string;
  };
  typography: TypographySystem;
  spacing: LayoutSystem;
  customCSS: string;
}

export interface EditorState {
  // Project Info
  businessInfo: BusinessInfo;
  projectName: string;
  
  // Global Layout
  globalHeader: EditorBlock | null;
  globalFooter: EditorBlock | null;
  
  // Page Structure
  pages: Page[];
  currentPageId: string;
  blocks: EditorBlock[]; // Current page blocks (computed from pages)
  selectedBlockId: string | null;
  
  // Theme
  theme: Theme;
  
  // UI State
  isDragging: boolean;
  isPreviewMode: boolean;
  isSaving: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  
  // Actions
  setBusinessInfo: (info: Partial<BusinessInfo>) => void;
  setProjectName: (name: string) => void;
  
  // Global Layout Actions
  setGlobalHeader: (block: EditorBlock | null) => void;
  setGlobalFooter: (block: EditorBlock | null) => void;
  updateGlobalHeader: (updates: Partial<EditorBlock>) => void;
  updateGlobalFooter: (updates: Partial<EditorBlock>) => void;
  
  // Page Actions
  addPage: (page: Omit<Page, 'blocks'>) => void;
  removePage: (pageId: string) => void;
  updatePage: (pageId: string, updates: Partial<Page>) => void;
  setCurrentPage: (pageId: string) => void;
  initializePages: (pages: Page[]) => void;
  
  // Block Actions
  addBlock: (block: EditorBlock) => void;
  removeBlock: (blockId: string) => void;
  updateBlock: (blockId: string, updates: Partial<EditorBlock>) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  selectBlock: (blockId: string | null) => void;
  duplicateBlock: (blockId: string) => void;
  clearBlocks: () => void;
  
  // Theme Actions
  setTheme: (theme: Theme) => void;
  setThemeVariant: (variant: 'ultra-pro' | 'premium' | 'minimal') => void;
  updateColors: (colors: Partial<ColorScheme>) => void;
  updateTypography: (typography: Partial<TypographySystem>) => void;
  updateSpacing: (spacing: Partial<LayoutSystem>) => void;
  setCustomCSS: (css: string) => void;
  
  // Data Actions
  setPages: (pages: Page[]) => void;
  
  // UI Actions
  setDragging: (isDragging: boolean) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setSaving: (isSaving: boolean) => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  
  // Utils
  generateSitePreview: () => Promise<string>;
  exportSite: () => Promise<{ html: string; css: string; js: string }>;
}

const defaultColors: ColorScheme & { textMuted?: string } = {
  primary: 'hsl(221, 83%, 53%)',
  secondary: 'hsl(271, 81%, 65%)',
  accent: 'hsl(0, 84%, 60%)',
  background: 'hsl(0, 0%, 100%)',
  surface: 'hsl(210, 20%, 98%)',
  text: 'hsl(222, 47%, 11%)',
  textSecondary: 'hsl(215, 20%, 65%)',
  textMuted: 'hsl(215, 20%, 65%)',
  border: 'hsl(214, 32%, 91%)',
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(45, 93%, 47%)',
  error: 'hsl(0, 84%, 60%)'
};

const defaultTypography: TypographySystem = {
  fontFamily: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem'
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
};

const defaultSpacing: LayoutSystem = {
  spacing: {
    '0': '0px',
    'px': '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
    '11': '2.75rem',
    '12': '3rem',
    '14': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '28': '7rem',
    '32': '8rem',
    '36': '9rem',
    '40': '10rem',
    '44': '11rem',
    '48': '12rem',
    '52': '13rem',
    '56': '14rem',
    '60': '15rem',
    '64': '16rem',
    '72': '18rem',
    '80': '20rem',
    '96': '24rem'
  },
  containerSizes: {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    full: '100%'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  gridColumns: {
    '1': 'repeat(1, minmax(0, 1fr))',
    '2': 'repeat(2, minmax(0, 1fr))',
    '3': 'repeat(3, minmax(0, 1fr))',
    '4': 'repeat(4, minmax(0, 1fr))',
    '5': 'repeat(5, minmax(0, 1fr))',
    '6': 'repeat(6, minmax(0, 1fr))',
    '8': 'repeat(8, minmax(0, 1fr))',
    '12': 'repeat(12, minmax(0, 1fr))'
  }
};

export const useEditorStore = create<EditorState>()(
  temporal(
    immer((set, get) => ({
      // Initial State
      businessInfo: {} as BusinessInfo,
      projectName: 'Mon Site Web',
      globalHeader: null,
      globalFooter: null,
      pages: [
        {
          id: 'home',
          name: 'Accueil',
          slug: '/',
          blocks: [],
          meta: {
            title: 'Accueil',
            description: ''
          }
        }
      ],
      currentPageId: 'home',
      blocks: [],
      selectedBlockId: null,
      theme: {
        variant: 'ultra-pro',
        colors: defaultColors,
        typography: defaultTypography,
        spacing: defaultSpacing,
        customCSS: ''
      },
      isDragging: false,
      isPreviewMode: false,
      isSaving: false,
      previewDevice: 'desktop',

      // Business Info Actions
      setBusinessInfo: (info) => set((state) => {
        Object.assign(state.businessInfo, info);
      }),
      
      setProjectName: (name) => set((state) => {
        state.projectName = name;
      }),

      // Global Layout Actions
      setGlobalHeader: (block) => set((state) => {
        state.globalHeader = block;
      }),

      setGlobalFooter: (block) => set((state) => {
        state.globalFooter = block;
      }),

      updateGlobalHeader: (updates) => set((state) => {
        if (state.globalHeader) {
          Object.assign(state.globalHeader, updates);
        }
      }),

      updateGlobalFooter: (updates) => set((state) => {
        if (state.globalFooter) {
          Object.assign(state.globalFooter, updates);
        }
      }),

      // Page Actions
      addPage: (pageData) => set((state) => {
        const newPage: Page = {
          ...pageData,
          blocks: []
        };
        state.pages.push(newPage);
      }),

      removePage: (pageId) => set((state) => {
        if (state.pages.length > 1 && pageId !== 'home') {
          state.pages = state.pages.filter(p => p.id !== pageId);
          if (state.currentPageId === pageId) {
            state.currentPageId = 'home';
            const homePage = state.pages.find(p => p.id === 'home');
            state.blocks = homePage?.blocks || [];
          }
        }
      }),

      updatePage: (pageId, updates) => set((state) => {
        const page = state.pages.find(p => p.id === pageId);
        if (page) {
          Object.assign(page, updates);
        }
      }),

      setCurrentPage: (pageId) => set((state) => {
        const page = state.pages.find(p => p.id === pageId);
        if (page) {
          // Save current blocks to current page
          const currentPage = state.pages.find(p => p.id === state.currentPageId);
          if (currentPage) {
            currentPage.blocks = [...state.blocks];
          }
          
          // Switch to new page
          state.currentPageId = pageId;
          state.blocks = [...page.blocks];
          state.selectedBlockId = null;
        }
      }),

      setPages: (pages) => set((state) => {
        state.pages = pages;
        // Update current page blocks if needed
        const currentPage = pages.find(p => p.id === state.currentPageId);
        if (currentPage) {
          state.blocks = [...currentPage.blocks];
        }
      }),
      
      initializePages: (pages) => set((state) => {
        state.pages = pages;
        state.currentPageId = pages[0]?.id || 'home';
        state.blocks = pages[0]?.blocks || [];
      }),

      // Block Actions
      addBlock: (block) => set((state) => {
        // Update blocks in current page as well
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (currentPage) {
        // Get block definition to access default props
        const { getBlockById } = require('../blocks/block-registry');
        const blockDef = getBlockById(block.type);
        
        // Start with block's defaultProps if available
        let mergedProps = { ...blockDef?.block?.defaultProps || {} };
        
        // Add default values from prop definitions
        if (blockDef?.block?.props) {
          blockDef.block.props.forEach(prop => {
            if (prop.defaultValue !== undefined && !(prop.name in mergedProps)) {
              mergedProps[prop.name] = prop.defaultValue;
            }
          });
        }
        
        // Override with any provided props
        mergedProps = { ...mergedProps, ...block.props };
        
        const newBlock = {
          ...block,
          props: mergedProps
        };
        state.blocks.push(newBlock);
        currentPage.blocks.push(newBlock);
        }
      }),

      removeBlock: (blockId) => set((state) => {
        state.blocks = state.blocks.filter(b => b.id !== blockId);
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (currentPage) {
          currentPage.blocks = currentPage.blocks.filter(b => b.id !== blockId);
        }
        if (state.selectedBlockId === blockId) {
          state.selectedBlockId = null;
        }
      }),

      updateBlock: (blockId, updates) => set((state) => {
        const block = state.blocks.find(b => b.id === blockId);
        if (block) {
          Object.assign(block, updates);
        }
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (currentPage) {
          const pageBlock = currentPage.blocks.find(b => b.id === blockId);
          if (pageBlock) {
            Object.assign(pageBlock, updates);
          }
        }
      }),

      moveBlock: (fromIndex, toIndex) => set((state) => {
        const [movedBlock] = state.blocks.splice(fromIndex, 1);
        state.blocks.splice(toIndex, 0, movedBlock);
        
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (currentPage) {
          const [movedPageBlock] = currentPage.blocks.splice(fromIndex, 1);
          currentPage.blocks.splice(toIndex, 0, movedPageBlock);
        }
      }),

      selectBlock: (blockId) => set((state) => {
        state.selectedBlockId = blockId;
        state.blocks.forEach(b => {
          b.isSelected = b.id === blockId;
        });
      }),

      duplicateBlock: (blockId) => set((state) => {
        const block = state.blocks.find(b => b.id === blockId);
        if (block) {
          const duplicated: EditorBlock = {
            ...block,
            id: crypto.randomUUID(),
            isSelected: false
          };
          
          const index = state.blocks.findIndex(b => b.id === blockId);
          state.blocks.splice(index + 1, 0, duplicated);
          
          const currentPage = state.pages.find(p => p.id === state.currentPageId);
          if (currentPage) {
            currentPage.blocks.splice(index + 1, 0, duplicated);
          }
        }
      }),
      
      clearBlocks: () => set((state) => {
        state.blocks = [];
        state.selectedBlockId = null;
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (currentPage) {
          currentPage.blocks = [];
        }
      }),

      // Theme Actions
      setTheme: (theme) => set((state) => {
        state.theme = theme;
      }),
      
      setThemeVariant: (variant) => set((state) => {
        state.theme.variant = variant;
      }),

      updateColors: (colors) => set((state) => {
        Object.assign(state.theme.colors, colors);
      }),

      updateTypography: (typography) => set((state) => {
        Object.assign(state.theme.typography, typography);
      }),

      updateSpacing: (spacing) => set((state) => {
        Object.assign(state.theme.spacing, spacing);
      }),

      setCustomCSS: (css) => set((state) => {
        state.theme.customCSS = css;
      }),

      // UI Actions
      setDragging: (isDragging) => set((state) => {
        state.isDragging = isDragging;
      }),

      setPreviewMode: (isPreview) => set((state) => {
        state.isPreviewMode = isPreview;
      }),

      setSaving: (isSaving) => set((state) => {
        state.isSaving = isSaving;
      }),

      setPreviewDevice: (device) => set((state) => {
        state.previewDevice = device;
      }),

      // Utils
      generateSitePreview: async () => {
        const { blocks, theme, globalHeader, globalFooter } = get();
        
        // Use the preview generator service
        const { previewGenerator } = await import('../services/preview-generator');
        return previewGenerator.generatePreview(blocks, theme, globalHeader, globalFooter);
      },

      exportSite: async () => {
        const { blocks, theme, businessInfo } = get();
        
        // Use the preview generator to get the full HTML
        const { previewGenerator } = await import('../services/preview-generator');
        const fullHtml = previewGenerator.generatePreview(blocks, theme);
        
        // For now, return the HTML as a single file
        // In production, this would generate separate HTML/CSS/JS files
        return {
          html: fullHtml,
          css: '', // CSS is embedded in the HTML for now
          js: ''   // JS is embedded in the HTML for now
        };
      }
    })),
    {
      limit: 50 // Undo/redo history limit
    }
  )
);
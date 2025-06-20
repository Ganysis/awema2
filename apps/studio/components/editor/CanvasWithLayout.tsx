'use client';

import React from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';
import { BlockItem } from './BlockItem';

interface CanvasWithLayoutProps {
  children: React.ReactNode;
  isPreviewMode?: boolean;
}

export function CanvasWithLayout({ children, isPreviewMode = false }: CanvasWithLayoutProps) {
  const { globalHeader, globalFooter, theme } = useEditorStore();

  const renderGlobalBlock = (block: any, type: 'header' | 'footer') => {
    if (!block) return null;
    
    const renderFunction = getBlockRenderFunction(block.type);
    if (!renderFunction) {
      console.warn(`No render function found for block type: ${block.type}`);
      return null;
    }

    try {
      const renderedBlock = renderFunction(block.props, []);
      
      if (isPreviewMode) {
        // In preview mode, render HTML directly
        return (
          <div 
            dangerouslySetInnerHTML={{ __html: renderedBlock.html }}
            className={`global-block global-${type}`}
          />
        );
      } else {
        // In edit mode, show as non-editable block
        return (
          <div className="relative opacity-75 pointer-events-none">
            <div className="absolute top-2 left-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Global {type === 'header' ? 'Header' : 'Footer'}
            </div>
            <BlockItem block={block} isGlobal={true} />
          </div>
        );
      }
    } catch (error) {
      console.error(`Error rendering ${type} block:`, error);
      return null;
    }
  };

  if (isPreviewMode) {
    // Get CSS and JS from header and footer
    let headerCSS = '';
    let headerJS = '';
    let footerCSS = '';
    let footerJS = '';
    
    if (globalHeader) {
      const headerRender = getBlockRenderFunction(globalHeader.type);
      if (headerRender) {
        const rendered = headerRender(globalHeader.props, []);
        headerCSS = rendered.css || '';
        headerJS = rendered.js || '';
      }
    }
    
    if (globalFooter) {
      const footerRender = getBlockRenderFunction(globalFooter.type);
      if (footerRender) {
        const rendered = footerRender(globalFooter.props, []);
        footerCSS = rendered.css || '';
        footerJS = rendered.js || '';
      }
    }
    
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${theme.colors.primary};
            --primary-dark: ${theme.colors.primary};
            --secondary: ${theme.colors.secondary};
            --accent: ${theme.colors.accent};
            --bg-primary: ${theme.colors.background};
            --text-primary: ${theme.colors.text};
            --text-secondary: ${theme.colors.textSecondary};
            --border: ${theme.colors.border};
          }
          body {
            margin: 0;
            padding: 0;
            font-family: ${theme.typography.fontFamily.body}, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          ${headerCSS}
          ${footerCSS}
        `}} />
        
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {renderGlobalBlock(globalHeader, 'header')}
          <main style={{ flex: '1 0 auto' }}>
            {children}
          </main>
          {renderGlobalBlock(globalFooter, 'footer')}
        </div>
        
        {/* Scripts */}
        {headerJS && <script dangerouslySetInnerHTML={{ __html: headerJS }} />}
        {footerJS && <script dangerouslySetInnerHTML={{ __html: footerJS }} />}
      </>
    );
  }

  // Pour l'éditeur, on doit aussi inclure les styles de base
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .canvas-with-layout {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .canvas-with-layout .header-navigation {
          position: absolute !important;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }
        .page-content {
          flex: 1;
          position: relative;
        }
        .global-header {
          position: relative;
          z-index: 100;
        }
        .global-footer {
          margin-top: auto;
          position: relative;
        }
      `}} />
      
      <div className="canvas-with-layout">
        {/* Header */}
        <div className="global-header">
          {renderGlobalBlock(globalHeader, 'header')}
        </div>
        
        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
        
        {/* Footer */}
        <div className="global-footer">
          {renderGlobalBlock(globalFooter, 'footer')}
        </div>
      </div>
    </>
  );
}
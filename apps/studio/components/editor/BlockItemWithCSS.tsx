'use client';

import { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@/lib/store/editor-store';
import type { EditorBlock } from '@/lib/store/editor-store';
import { getBlockById, getBlockRenderFunction } from '@/lib/blocks/block-registry';
import { 
  TrashIcon, 
  DocumentDuplicateIcon,
  EyeIcon,
  EyeSlashIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface BlockItemProps {
  block: EditorBlock;
  isGlobal?: boolean;
}

// Real block preview with actual CSS
function BlockRealPreview({ block }: { block: EditorBlock }) {
  const [preview, setPreview] = useState<{ html: string; css: string } | null>(null);
  
  useEffect(() => {
    const renderBlock = async () => {
      try {
        const renderFn = getBlockRenderFunction(block.type);
        if (!renderFn) {
          console.warn(`No render function found for block type: ${block.type}`);
          return;
        }
        
        // Parse JSON props if needed
        let processedProps = { ...(block.props || {}) };
        Object.keys(processedProps).forEach(key => {
          const value = processedProps[key];
          if (typeof value === 'string') {
            try {
              const parsed = JSON.parse(value);
              if (typeof parsed === 'object') {
                processedProps[key] = parsed;
              }
            } catch (e) {
              // Keep original value
            }
          }
        });
        
        const rendered = renderFn(processedProps, []);
        
        if (rendered && typeof rendered === 'object') {
          setPreview({
            html: rendered.html || '',
            css: rendered.css || ''
          });
        }
      } catch (error) {
        console.error(`Error rendering block ${block.type}:`, error);
      }
    };
    
    renderBlock();
  }, [block]);
  
  if (!preview) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <>
      {preview.css && (
        <style dangerouslySetInnerHTML={{ __html: preview.css }} />
      )}
      <div 
        className="block-preview-content"
        dangerouslySetInnerHTML={{ __html: preview.html }}
      />
    </>
  );
}

export function BlockItemWithCSS({ block, isGlobal = false }: BlockItemProps) {
  const { 
    selectBlock,
    selectedBlockId,
    updateBlock,
    duplicateBlock,
    removeBlock
  } = useEditorStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: block.id,
    disabled: isGlobal 
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  
  const isSelected = selectedBlockId === block.id;

  const handleClick = (e: React.MouseEvent) => {
    // Don't select if clicking on action buttons
    if ((e.target as HTMLElement).closest('.block-actions')) {
      return;
    }
    selectBlock(block.id);
  };

  const isHidden = block.props?.hidden || false;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`
        group relative border-2 transition-all overflow-hidden
        ${isSelected 
          ? 'border-primary-500 shadow-lg' 
          : 'border-transparent hover:border-gray-300'
        }
        ${isHidden ? 'opacity-50' : ''}
      `}
    >
      {/* Drag Handle */}
      {!isGlobal && (
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-2 p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded shadow-sm z-10"
        >
          <Bars3Icon className="w-4 h-4 text-gray-400" />
        </div>
      )}
      
      {/* Block Actions */}
      {!isGlobal && (
        <div className="block-actions absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => updateBlock(block.id, { props: { ...block.props, hidden: !isHidden } })}
          className="p-1 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
          title={isHidden ? 'Show' : 'Hide'}
        >
          {isHidden ? (
            <EyeSlashIcon className="w-4 h-4 text-gray-400" />
          ) : (
            <EyeIcon className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        <button
          onClick={() => duplicateBlock(block.id)}
          className="p-1 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
          title="Duplicate"
        >
          <DocumentDuplicateIcon className="w-4 h-4 text-gray-400" />
        </button>
        
        <button
          onClick={() => removeBlock(block.id)}
          className="p-1 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
          title="Delete"
        >
          <TrashIcon className="w-4 h-4 text-red-400" />
        </button>
        </div>
      )}
      
      {/* Real Block Preview with CSS */}
      <div className="block-preview-wrapper" style={{ maxHeight: '400px', overflow: 'hidden' }}>
        <BlockRealPreview block={block} />
      </div>
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-primary-500 pointer-events-none rounded-lg" />
      )}
    </div>
  );
}
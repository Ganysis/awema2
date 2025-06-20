'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@/lib/store/editor-store';
import type { EditorBlock } from '@/lib/store/editor-store';
import { getBlockById } from '@/lib/blocks/block-registry';
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

// Block preview component
function BlockPreview({ blockType, blockProps }: { blockType: string; blockProps: Record<string, any> }) {
  const blockDef = getBlockById(blockType);
  
  if (!blockDef) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">Unknown block type: {blockType}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {blockDef.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {blockDef.category}
        </p>
      </div>
      
      {/* Mock preview based on block type */}
      <div className="mt-4">
        {blockType.includes('hero') && (
          <div className="space-y-3">
            <div className="h-32 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-500 rounded"></div>
              </div>
            </div>
          </div>
        )}
        {blockType.includes('services') && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-12 w-12 bg-primary-200 rounded mx-auto" />
                <div className="h-2 bg-gray-300 rounded" />
                <div className="h-2 bg-gray-200 rounded w-4/5 mx-auto" />
              </div>
            ))}
          </div>
        )}
        {blockType.includes('gallery') && (
          <div className="grid grid-cols-4 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        )}
        {blockType.includes('features') && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary-200 rounded flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-gray-300 rounded" />
                  <div className="h-2 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        )}
        {blockType.includes('testimonials') && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 justify-center">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-4 h-4 bg-yellow-400 rounded" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-300 rounded" />
              <div className="h-2 bg-gray-200 rounded" />
              <div className="h-2 bg-gray-200 rounded w-4/5 mx-auto" />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="h-2 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        )}
        {blockType.includes('contact') && (
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-10 bg-primary-200 rounded" />
          </div>
        )}
        {blockType.includes('header') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-6 bg-primary-300 rounded" />
                <div className="flex space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-16 h-4 bg-gray-300 rounded" />
                  ))}
                </div>
              </div>
              <div className="w-20 h-8 bg-primary-400 rounded" />
            </div>
          </div>
        )}
        {blockType.includes('footer') && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-800 rounded text-white">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-gray-600 rounded" />
                  <div className="w-full h-2 bg-gray-700 rounded" />
                  <div className="w-full h-2 bg-gray-700 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-gray-600 rounded" />
                  <div className="w-full h-2 bg-gray-700 rounded" />
                  <div className="w-4/5 h-2 bg-gray-700 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-gray-600 rounded" />
                  <div className="w-full h-2 bg-gray-700 rounded" />
                  <div className="w-4/5 h-2 bg-gray-700 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-4 bg-gray-600 rounded" />
                  <div className="w-full h-2 bg-gray-700 rounded" />
                  <div className="w-4/5 h-2 bg-gray-700 rounded" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="w-32 h-2 bg-gray-600 rounded mx-auto" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function BlockItem({ block, isGlobal = false }: BlockItemProps) {
  const { 
    selectBlock, 
    removeBlock, 
    duplicateBlock,
    updateBlock,
    selectedBlockId 
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

  const blockDef = getBlockById(block.type);
  const isHidden = block.props?.hidden || false;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={`
        group relative border-2 transition-all
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
      
      {/* Block Content Preview */}
      <div className="p-8 bg-gray-50">
        <BlockPreview blockType={block.type} blockProps={block.props} />
      </div>
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-primary-500 pointer-events-none rounded-lg" />
      )}
    </div>
  );
}
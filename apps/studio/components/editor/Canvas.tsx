'use client';

import { useRef, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { getBlockById } from '@/lib/blocks/block-registry';
import { 
  DndContext, 
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { BlockItem } from './BlockItem';
import { EmptyState } from './EmptyState';
import { LivePreview } from './LivePreview';
import { CanvasWithLayout } from './CanvasWithLayout';

export function Canvas() {
  const { 
    blocks, 
    previewDevice,
    isDragging,
    setDragging,
    moveBlock,
    isPreviewMode 
  } = useEditorStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Device widths
  const deviceWidths = {
    mobile: 375,
    tablet: 768,
    desktop: 1280
  };
  
  const handleDragStart = () => {
    setDragging(true);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    setDragging(false);
    
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        moveBlock(oldIndex, newIndex);
      }
    }
  };
  
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    
    // Handle dropping new blocks from sidebar
    if (!active || !over) return;
  };
  
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    
    const blockId = event.dataTransfer.getData('blockId');
    if (blockId) {
      const { addBlock } = useEditorStore.getState();
      const blockDef = getBlockById(blockId);
      
      if (blockDef) {
        addBlock({
          id: crypto.randomUUID(),
          type: blockId,
          props: {
            ...blockDef.block.defaultProps
          },
          children: []
        });
      }
    }
  };
  
  const handleDragOverNative = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
      {/* Device Frame */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto transition-all duration-300" style={{
          maxWidth: deviceWidths[previewDevice],
          width: '100%'
        }}>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Browser Chrome for Desktop */}
            {previewDevice === 'desktop' && (
              <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded h-6 flex items-center px-3">
                    <span className="text-xs text-gray-500">https://monsite.fr</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Canvas Content */}
            <div 
              ref={containerRef}
              className="min-h-[600px] relative overflow-hidden"
              onDrop={handleDrop}
              onDragOver={handleDragOverNative}
              style={{
                // Add mobile/tablet frame styling
                ...(previewDevice === 'mobile' && {
                  borderRadius: '2rem',
                  border: '8px solid #333'
                }),
                ...(previewDevice === 'tablet' && {
                  borderRadius: '1rem',
                  border: '12px solid #333'
                })
              }}
            >
              <CanvasWithLayout isPreviewMode={isPreviewMode}>
                {isPreviewMode ? (
                  <LivePreview />
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <SortableContext
                      items={blocks.map(b => b.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {blocks.length === 0 ? (
                        <EmptyState />
                      ) : (
                        <div className="relative">
                          {blocks.map((block) => (
                            <BlockItem key={block.id} block={block} />
                          ))}
                        </div>
                      )}
                    </SortableContext>
                    
                    <DragOverlay>
                      {isDragging && (
                        <div className="bg-primary-100 border-2 border-primary-500 border-dashed rounded-lg p-8 opacity-50">
                          <p className="text-primary-700 text-center">Drop here</p>
                        </div>
                      )}
                    </DragOverlay>
                  </DndContext>
                )}
              </CanvasWithLayout>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-8 bg-white border-t border-gray-200 px-4 flex items-center justify-between text-xs text-gray-500">
        <span>{blocks.length} blocks</span>
        <span>{previewDevice} view</span>
      </div>
    </div>
  );
}
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
import { DeviceFrame } from './DeviceFrame';

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
      {/* Main Editor Area */}
      <div className="flex-1 overflow-hidden">
        <DeviceFrame device={previewDevice} showFrame={previewDevice !== 'desktop'}>
          <div 
            ref={containerRef}
            className="w-full h-full bg-white overflow-auto"
            onDrop={handleDrop}
            onDragOver={handleDragOverNative}
          >
            {/* Browser Chrome for Desktop */}
            {previewDevice === 'desktop' && (
              <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 sticky top-0 z-10">
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
        </DeviceFrame>
      </div>
      
      {/* Status Bar */}
      <div className="h-8 bg-white border-t border-gray-200 px-4 flex items-center justify-between text-xs text-gray-500">
        <span>{blocks.length} blocks</span>
        <span>{previewDevice} view</span>
      </div>
    </div>
  );
}
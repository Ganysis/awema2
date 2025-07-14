'use client';

import React, { useState, useCallback } from 'react';
import { BlockType } from '@/lib/types';
import { blockRegistry } from '@/lib/blocks/block-registry';
import PropertyControls from '@/components/editor/PropertyControls';
import LivePreview from '@/components/editor/LivePreview';
import { debounce } from 'lodash';

interface PageEditorProps {
  pageId: string;
  initialBlocks: BlockType[];
  theme: any;
  onSave: (blocks: BlockType[]) => Promise<void>;
  readOnly?: boolean;
}

export default function PageEditor({ 
  pageId, 
  initialBlocks, 
  theme,
  onSave,
  readOnly = false 
}: PageEditorProps) {
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (blocksToSave: BlockType[]) => {
      setIsSaving(true);
      try {
        await onSave(blocksToSave);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Erreur de sauvegarde:', error);
      } finally {
        setIsSaving(false);
      }
    }, 2000),
    [onSave]
  );

  // Update block properties
  const updateBlock = (blockId: string, updates: Partial<BlockType>) => {
    if (readOnly) return;

    const updatedBlocks = blocks.map(block => 
      block.id === blockId 
        ? { ...block, ...updates, props: { ...block.props, ...updates.props } }
        : block
    );
    
    setBlocks(updatedBlocks);
    debouncedSave(updatedBlocks);
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Block List (Read Only) */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Blocs de la page</h2>
          <p className="text-sm text-gray-500 mt-1">
            Cliquez sur un bloc pour le modifier
          </p>
        </div>
        
        <div className="p-4 space-y-2">
          {blocks.map((block) => {
            const config = blockRegistry.find(b => b.type === block.type);
            const isSelected = selectedBlockId === block.id;
            
            return (
              <button
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                className={`w-full p-3 rounded-lg border transition-all text-left ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-lg">{config?.icon || '📄'}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {config?.name || block.type}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {block.props?.title || block.props?.heading || 'Sans titre'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center - Live Preview */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Aperçu en direct</h1>
            {isSaving && (
              <span className="text-sm text-blue-600 flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sauvegarde...
              </span>
            )}
            {lastSaved && !isSaving && (
              <span className="text-sm text-green-600">
                ✓ Sauvegardé à {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <LivePreview
              blocks={blocks}
              theme={theme}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        {selectedBlock ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Propriétés du bloc
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {blockRegistry.find(b => b.type === selectedBlock.type)?.name}
              </p>
            </div>
            
            <div className="p-4">
              {readOnly ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    Mode lecture seule - Les modifications sont désactivées
                  </p>
                </div>
              ) : (
                <PropertyControls
                  block={selectedBlock}
                  onChange={(updates) => updateBlock(selectedBlock.id, updates)}
                />
              )}
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun bloc sélectionné
            </h3>
            <p className="text-sm text-gray-500">
              Cliquez sur un bloc dans la liste pour modifier ses propriétés
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
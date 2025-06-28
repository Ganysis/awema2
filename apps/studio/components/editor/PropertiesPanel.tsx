'use client';

import { useEditorStore } from '@/lib/store/editor-store';
import { getBlockById } from '@/lib/blocks/block-registry';
import { PropertyControls } from './PropertyControls';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PropertiesPanelProps {
  projectId?: string;
}

export function PropertiesPanel({ projectId }: PropertiesPanelProps) {
  const { selectedBlockId, blocks, updateBlock, selectBlock } = useEditorStore();
  
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  const blockDef = selectedBlock ? getBlockById(selectedBlock.type) : null;
  
  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <p className="text-sm">Select a block to edit its properties</p>
        </div>
      </div>
    );
  }
  
  const handlePropChange = (propName: string, value: any) => {
    updateBlock(selectedBlock.id, {
      props: {
        ...selectedBlock.props,
        [propName]: value
      }
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Block Properties</h3>
        <button
          onClick={() => selectBlock(null)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <XMarkIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      {/* Properties Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Block Info */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Block Type</h4>
            <p className="text-sm text-gray-500">{blockDef?.name || selectedBlock.type}</p>
          </div>
          
          {/* Dynamic Properties based on block definition */}
          {blockDef && (
            <PropertyControls
              props={blockDef.block.props}
              values={selectedBlock.props}
              onChange={handlePropChange}
              projectId={projectId}
            />
          )}
          
          {/* Additional properties for specific blocks */}
          {selectedBlock.type === 'contact-form-map' && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Form Settings</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Email
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  value={selectedBlock.props.destinationEmail || 'contact@example.com'}
                  onChange={(e) => handlePropChange('destinationEmail', e.target.value)}
                  className="property-input"
                  placeholder="email@example.com"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email address where form submissions will be sent
                </p>
              </div>
            </div>
          )}
          
          {/* Visibility */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!selectedBlock.props?.hidden}
                onChange={(e) => handlePropChange('hidden', !e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Visible</span>
            </label>
          </div>
          
          {/* Spacing */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Spacing</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Top</label>
                <select
                  value={selectedBlock.props.paddingTop || 'md'}
                  onChange={(e) => handlePropChange('paddingTop', e.target.value)}
                  className="property-input text-sm"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Bottom</label>
                <select
                  value={selectedBlock.props.paddingBottom || 'md'}
                  onChange={(e) => handlePropChange('paddingBottom', e.target.value)}
                  className="property-input text-sm"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Background */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Background</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={selectedBlock.props.backgroundColor || '#ffffff'}
                    onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedBlock.props.backgroundColor || '#ffffff'}
                    onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                    placeholder="#ffffff"
                    className="property-input flex-1"
                  />
                  <button
                    onClick={() => handlePropChange('backgroundColor', null)}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Background Pattern</label>
                <select
                  value={selectedBlock.props.backgroundPattern || 'none'}
                  onChange={(e) => handlePropChange('backgroundPattern', e.target.value)}
                  className="property-input text-sm"
                >
                  <option value="none">None</option>
                  <option value="dots">Dots</option>
                  <option value="grid">Grid</option>
                  <option value="lines">Lines</option>
                  <option value="waves">Waves</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
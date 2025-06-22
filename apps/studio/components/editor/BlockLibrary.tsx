'use client';

import { useMemo } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { blockRegistry, getAllCategories } from '@/lib/blocks/block-registry';
import { BlockCategory } from '@awema/shared';
import { 
  Square3Stack3DIcon,
  PhotoIcon,
  ChatBubbleBottomCenterTextIcon,
  CubeIcon,
  PhoneIcon,
  UserGroupIcon,
  StarIcon,
  SparklesIcon,
  DocumentTextIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface BlockLibraryProps {
  searchQuery: string;
}

// Icon mapping for categories
const categoryIcons: Partial<Record<BlockCategory, React.ComponentType<any>>> = {
  [BlockCategory.HERO]: Square3Stack3DIcon,
  [BlockCategory.HEADER]: DocumentTextIcon,
  [BlockCategory.FEATURES]: SparklesIcon,
  [BlockCategory.GALLERY]: PhotoIcon,
  [BlockCategory.TESTIMONIALS]: ChatBubbleBottomCenterTextIcon,
  [BlockCategory.CONTACT]: PhoneIcon,
  [BlockCategory.CTA]: StarIcon,
  [BlockCategory.FOOTER]: DocumentTextIcon,
  [BlockCategory.FAQ]: QuestionMarkCircleIcon,
  [BlockCategory.PRICING]: CurrencyDollarIcon,
  [BlockCategory.CONTENT]: DocumentTextIcon,
};

// Category display names
const categoryNames: Partial<Record<BlockCategory, string>> = {
  [BlockCategory.HERO]: 'Hero',
  [BlockCategory.HEADER]: 'Header',
  [BlockCategory.FEATURES]: 'Features',
  [BlockCategory.GALLERY]: 'Gallery',
  [BlockCategory.TESTIMONIALS]: 'Testimonials',
  [BlockCategory.CONTACT]: 'Contact',
  [BlockCategory.CTA]: 'Call to Action',
  [BlockCategory.FOOTER]: 'Footer',
  [BlockCategory.FAQ]: 'FAQ',
  [BlockCategory.PRICING]: 'Pricing',
  [BlockCategory.CONTENT]: 'Content',
};

export function BlockLibrary({ searchQuery }: BlockLibraryProps) {
  const { addBlock } = useEditorStore();
  
  // Debug: Log all blocks to check if FAQ blocks are present
  console.log('Total blocks in registry:', blockRegistry.length);
  console.log('Categories in registry:', getAllCategories());
  
  // Filter blocks based on search
  const filteredBlocks = useMemo(() => {
    if (!searchQuery) return blockRegistry;
    
    const query = searchQuery.toLowerCase();
    return blockRegistry.filter(blockDef => 
      blockDef.name.toLowerCase().includes(query) ||
      blockDef.description.toLowerCase().includes(query) ||
      (categoryNames[blockDef.category] || '').toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  // Group blocks by category
  const groupedBlocks = useMemo(() => {
    const groups: Partial<Record<BlockCategory, typeof blockRegistry>> = {};
    
    filteredBlocks.forEach(blockDef => {
      const category = blockDef.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category]!.push(blockDef);
    });
    
    return groups;
  }, [filteredBlocks]);

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    e.dataTransfer.setData('blockId', blockId);
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  const handleAddBlock = (blockId: string) => {
    const blockDef = blockRegistry.find(def => def.block.id === blockId);
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
  };

  return (
    <div className="p-4">
      {Object.entries(groupedBlocks).map(([category, blocks]) => {
        const Icon = categoryIcons[category as BlockCategory] || CubeIcon;
        
        return (
          <div key={category} className="mb-6">
            <div className="flex items-center mb-3">
              <Icon className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="text-sm font-semibold text-gray-700">
                {categoryNames[category as BlockCategory] || category}
              </h3>
            </div>
            
            <div className="space-y-2">
              {blocks.map(blockDef => {
                if (!blockDef || !blockDef.block) {
                  console.error('Invalid blockDef:', blockDef);
                  return null;
                }
                return (
                <div
                  key={blockDef.block.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, blockDef.block.id)}
                  onClick={() => handleAddBlock(blockDef.block.id)}
                  className="block-item group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-12 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                      <CubeIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {blockDef.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {blockDef.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {categoryNames[blockDef.category] || blockDef.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddBlock(blockDef.block.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-xs text-primary-600 hover:text-primary-700 font-medium transition-opacity"
                    >
                      + Add
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {filteredBlocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No blocks found</p>
        </div>
      )}
    </div>
  );
}
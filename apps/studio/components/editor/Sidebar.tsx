'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BlockLibrary } from './BlockLibrary';
import { TemplateLibrary } from './TemplateLibrary';
import { ThemeSelector } from './ThemeSelector';
import { PageNavigationEnhanced } from './PageNavigationEnhanced';
import { Sparkles } from 'lucide-react';

type Tab = 'pages' | 'blocks' | 'templates' | 'theme';

interface SidebarProps {
  onAIGenerate?: () => void;
}

export function Sidebar({ onAIGenerate }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>('pages');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('pages')}
            className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'pages'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Pages
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'blocks'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Blocks
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'templates'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'theme'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Theme
          </button>
        </div>
      </div>
      
      {/* Search */}
      {activeTab !== 'theme' && activeTab !== 'pages' && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'pages' && <PageNavigationEnhanced />}
        {activeTab === 'blocks' && <BlockLibrary searchQuery={searchQuery} />}
        {activeTab === 'templates' && <TemplateLibrary searchQuery={searchQuery} />}
        {activeTab === 'theme' && <ThemeSelector />}
      </div>
      
      {/* AI Generation Button */}
      {onAIGenerate && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onAIGenerate}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Génération IA</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Générez du contenu unique avec l'IA
          </p>
        </div>
      )}
    </div>
  );
}
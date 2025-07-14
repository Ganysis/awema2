'use client';

import React, { useState, useEffect } from 'react';
import PageEditor from './PageEditor';
import { BlockType } from '@/lib/types';

interface Page {
  id: string;
  title: string;
  slug: string;
  blocks: BlockType[];
  meta?: {
    title?: string;
    description?: string;
  };
}

export default function PageManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState({
    primaryColor: '#3B82F6',
    font: 'Inter'
  });

  // Charger les pages depuis l'API
  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const response = await fetch('/api/cms/content');
      const data = await response.json();
      
      // Transformer les données en format Page
      const pagesData = data.map((item: any) => ({
        id: item.id,
        title: item.page_title || 'Sans titre',
        slug: item.page_slug || '/',
        blocks: item.blocks || [],
        meta: item.seo || {}
      }));
      
      setPages(pagesData);
      if (pagesData.length > 0 && !selectedPageId) {
        setSelectedPageId(pagesData[0].id);
      }
    } catch (error) {
      console.error('Erreur chargement pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePage = async (pageId: string, blocks: BlockType[]) => {
    try {
      const page = pages.find(p => p.id === pageId);
      if (!page) return;

      const response = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pageId,
          data: {
            page_title: page.title,
            page_slug: page.slug,
            blocks: blocks,
            seo: page.meta
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erreur de sauvegarde');
      }

      // Mettre à jour l'état local
      setPages(pages.map(p => 
        p.id === pageId ? { ...p, blocks } : p
      ));

    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      throw error;
    }
  };

  const selectedPage = pages.find(p => p.id === selectedPageId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Chargement des pages...</p>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune page trouvée</h3>
          <p className="text-gray-500">Créez des pages depuis l'éditeur AWEMA Studio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header avec sélecteur de pages */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Éditeur de Pages</h1>
              <select
                value={selectedPageId || ''}
                onChange={(e) => setSelectedPageId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {pages.map(page => (
                  <option key={page.id} value={page.id}>
                    {page.title} ({page.slug})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                Mode édition - Sans ajout/suppression de blocs
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Éditeur de page */}
      <div className="flex-1 overflow-hidden">
        {selectedPage && (
          <PageEditor
            key={selectedPage.id}
            pageId={selectedPage.id}
            initialBlocks={selectedPage.blocks}
            theme={theme}
            onSave={(blocks) => savePage(selectedPage.id, blocks)}
          />
        )}
      </div>
    </div>
  );
}
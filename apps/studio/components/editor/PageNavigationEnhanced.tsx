'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { 
  PlusIcon, 
  HomeIcon, 
  DocumentTextIcon, 
  MapPinIcon, 
  InformationCircleIcon, 
  PhotoIcon, 
  QuestionMarkCircleIcon, 
  ScaleIcon, 
  XMarkIcon, 
  PencilSquareIcon, 
  TrashIcon,
  DocumentDuplicateIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  EyeIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

interface PageType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultSlug: string;
  category: 'main' | 'services' | 'seo' | 'other';
}

const pageTypes: Record<string, PageType> = {
  home: { id: 'home', name: 'Accueil', icon: HomeIcon, defaultSlug: '/', category: 'main' },
  service: { id: 'service', name: 'Service', icon: DocumentTextIcon, defaultSlug: '/services/', category: 'services' },
  'seo-local': { id: 'seo-local', name: 'SEO Local', icon: MapPinIcon, defaultSlug: '/ville/', category: 'seo' },
  about: { id: 'about', name: 'À propos', icon: InformationCircleIcon, defaultSlug: '/a-propos', category: 'other' },
  gallery: { id: 'gallery', name: 'Galerie', icon: PhotoIcon, defaultSlug: '/galerie', category: 'other' },
  faq: { id: 'faq', name: 'FAQ', icon: QuestionMarkCircleIcon, defaultSlug: '/faq', category: 'other' },
  legal: { id: 'legal', name: 'Mentions légales', icon: ScaleIcon, defaultSlug: '/mentions-legales', category: 'other' },
};

const categoryNames = {
  main: 'Pages principales',
  services: 'Pages services',
  seo: 'Pages SEO locales',
  other: 'Autres pages'
};

export function PageNavigationEnhanced() {
  const { pages, currentPageId, setCurrentPage, addPage, removePage, updatePage } = useEditorStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['main', 'services']));
  const [previewPageId, setPreviewPageId] = useState<string | null>(null);
  
  // Form state for new/edit page
  const [pageForm, setPageForm] = useState({
    name: '',
    slug: '',
    type: 'service',
    meta: {
      title: '',
      description: ''
    }
  });

  // Grouper les pages par catégorie
  const groupedPages = pages.reduce((acc, page) => {
    let category = 'other';
    if (page.id === 'home') category = 'main';
    else if (page.slug?.includes('/services/')) category = 'services';
    else if (page.slug?.includes('/ville/') || (page.slug?.includes('-') && page.slug?.split('-').length > 2)) category = 'seo';
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(page);
    return acc;
  }, {} as Record<string, typeof pages>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddPage = (type?: string) => {
    const pageType = type ? pageTypes[type] : pageTypes.service;
    setPageForm({
      name: '',
      slug: pageType.defaultSlug,
      type: pageType.id,
      meta: {
        title: '',
        description: ''
      }
    });
    setIsAddDialogOpen(true);
  };

  const handleEditPage = (page: any) => {
    setPageForm({
      name: page.name,
      slug: page.slug,
      type: page.type || 'service',
      meta: page.meta || {
        title: '',
        description: ''
      }
    });
    setEditingPageId(page.id);
    setIsAddDialogOpen(true);
  };

  const handleDuplicatePage = (page: any) => {
    const newPageId = crypto.randomUUID();
    const newSlug = page.slug + '-copie';
    addPage({
      id: newPageId,
      name: page.name + ' (copie)',
      slug: newSlug,
      meta: { ...page.meta }
    });
    // Copy blocks to the new page
    const newPage = pages.find(p => p.id === newPageId);
    if (newPage) {
      updatePage(newPageId, { blocks: [...page.blocks] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPageId) {
      // Update existing page
      updatePage(editingPageId, {
        name: pageForm.name,
        slug: pageForm.slug,
        meta: pageForm.meta
      });
    } else {
      // Create new page
      const pageId = crypto.randomUUID();
      addPage({
        id: pageId,
        name: pageForm.name,
        slug: pageForm.slug,
        meta: pageForm.meta
      });
    }
    
    setIsAddDialogOpen(false);
    setEditingPageId(null);
  };

  const handleDeletePage = (pageId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
      removePage(pageId);
    }
  };

  const getPageIcon = (page: any) => {
    if (page.id === 'home') return HomeIcon;
    if (page.slug?.includes('/services/')) return DocumentTextIcon;
    if (page.slug?.includes('/ville/') || page.slug?.includes('-')) return MapPinIcon;
    if (page.slug?.includes('galerie')) return PhotoIcon;
    if (page.slug?.includes('faq')) return QuestionMarkCircleIcon;
    if (page.slug?.includes('mentions') || page.slug?.includes('cgv')) return ScaleIcon;
    if (page.slug?.includes('propos')) return InformationCircleIcon;
    return DocumentTextIcon;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
            <p className="text-xs text-gray-500 mt-0.5">{pages.length} pages</p>
          </div>
          <button
            onClick={() => handleAddPage()}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
          >
            <PlusIcon className="h-3 w-3" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Pages by category */}
      <div className="overflow-y-auto">
        {Object.entries(categoryNames).map(([categoryKey, categoryName]) => {
          const categoryPages = groupedPages[categoryKey] || [];
          if (categoryPages.length === 0 && categoryKey !== 'main') return null;

          const isExpanded = expandedCategories.has(categoryKey);

          return (
            <div key={categoryKey} className="border-b border-gray-100">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(categoryKey)}
                className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDownIcon className="h-3 w-3 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="h-3 w-3 text-gray-400" />
                  )}
                  <span className="text-xs font-medium text-gray-600">{categoryName}</span>
                  <span className="text-xs text-gray-400">({categoryPages.length})</span>
                </div>
                {categoryKey !== 'main' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPage(categoryKey === 'services' ? 'service' : categoryKey === 'seo' ? 'seo-local' : 'about');
                    }}
                    className="p-0.5 hover:bg-gray-200 rounded"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </button>
                )}
              </button>

              {/* Pages in category */}
              {isExpanded && (
                <div className="pb-1">
                  {categoryPages.map((page) => {
                    const Icon = getPageIcon(page);
                    const isActive = currentPageId === page.id;
                    const isHome = page.id === 'home';
                    const blockCount = page.blocks?.length || 0;

                    return (
                      <div
                        key={page.id}
                        className={`
                          group mx-2 mb-1 flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-all
                          ${isActive 
                            ? 'bg-primary-600 text-white shadow-sm' 
                            : 'hover:bg-gray-100'
                          }
                        `}
                        onClick={() => setCurrentPage(page.id)}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium">{page.name}</span>
                            {blockCount > 0 && (
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                isActive ? 'bg-primary-500 text-primary-100' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {blockCount}
                              </span>
                            )}
                          </div>
                          <div className={`text-xs truncate ${isActive ? 'text-primary-200' : 'text-gray-500'}`}>
                            {page.slug}
                          </div>
                        </div>
                        
                        {!isHome && (
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                            <button
                              className={`p-1 rounded ${isActive ? 'hover:bg-primary-700' : 'hover:bg-gray-200'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewPageId(page.id);
                              }}
                              title="Aperçu"
                            >
                              <EyeIcon className="h-3 w-3" />
                            </button>
                            <button
                              className={`p-1 rounded ${isActive ? 'hover:bg-primary-700' : 'hover:bg-gray-200'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicatePage(page);
                              }}
                              title="Dupliquer"
                            >
                              <DocumentDuplicateIcon className="h-3 w-3" />
                            </button>
                            <button
                              className={`p-1 rounded ${isActive ? 'hover:bg-primary-700' : 'hover:bg-gray-200'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditPage(page);
                              }}
                              title="Éditer"
                            >
                              <PencilSquareIcon className="h-3 w-3" />
                            </button>
                            <button
                              className={`p-1 rounded ${isActive ? 'hover:bg-red-700 text-red-300' : 'hover:bg-red-100 text-red-600'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePage(page.id);
                              }}
                              title="Supprimer"
                            >
                              <TrashIcon className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-500">Total blocs</p>
            <p className="font-semibold text-gray-900">
              {pages.reduce((acc, page) => acc + (page.blocks?.length || 0), 0)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Page active</p>
            <p className="font-semibold text-gray-900 truncate">
              {pages.find(p => p.id === currentPageId)?.name || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editingPageId ? 'Modifier la page' : 'Ajouter une page'}
              </h2>
              <button
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setEditingPageId(null);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingPageId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de page
                  </label>
                  <select
                    value={pageForm.type}
                    onChange={(e) => {
                      const pageType = pageTypes[e.target.value as keyof typeof pageTypes];
                      setPageForm({
                        ...pageForm,
                        type: e.target.value,
                        slug: pageType.defaultSlug
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {Object.entries(pageTypes).filter(([key]) => key !== 'home').map(([key, type]) => (
                      <option key={key} value={key}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la page
                </label>
                <input
                  type="text"
                  value={pageForm.name}
                  onChange={(e) => setPageForm({ ...pageForm, name: e.target.value })}
                  placeholder="Ex: Plomberie, Paris, FAQ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la page
                </label>
                <input
                  type="text"
                  value={pageForm.slug}
                  onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                  placeholder="/services/plomberie"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  L'URL doit commencer par / et ne pas contenir d'espaces
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">SEO (optionnel)</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Titre SEO
                    </label>
                    <input
                      type="text"
                      value={pageForm.meta.title}
                      onChange={(e) => setPageForm({
                        ...pageForm,
                        meta: { ...pageForm.meta, title: e.target.value }
                      })}
                      placeholder="Titre pour les moteurs de recherche"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Description SEO
                    </label>
                    <textarea
                      value={pageForm.meta.description}
                      onChange={(e) => setPageForm({
                        ...pageForm,
                        meta: { ...pageForm.meta, description: e.target.value }
                      })}
                      placeholder="Description pour les moteurs de recherche"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingPageId(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!pageForm.name || !pageForm.slug}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingPageId ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewPageId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Aperçu : {pages.find(p => p.id === previewPageId)?.name}
              </h2>
              <button
                onClick={() => setPreviewPageId(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {pages.find(p => p.id === previewPageId)?.blocks?.map((block: any, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <CubeIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{block.type}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {JSON.stringify(block.props).substring(0, 100)}...
                    </div>
                  </div>
                )) || (
                  <p className="text-center text-gray-500">Aucun bloc sur cette page</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
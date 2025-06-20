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
  TrashIcon 
} from '@heroicons/react/24/outline';

interface PageType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultSlug: string;
}

const pageTypes: Record<string, PageType> = {
  home: { id: 'home', name: 'Accueil', icon: HomeIcon, defaultSlug: '/' },
  service: { id: 'service', name: 'Service', icon: DocumentTextIcon, defaultSlug: '/services/' },
  'seo-local': { id: 'seo-local', name: 'SEO Local', icon: MapPinIcon, defaultSlug: '/ville/' },
  about: { id: 'about', name: 'À propos', icon: InformationCircleIcon, defaultSlug: '/a-propos' },
  gallery: { id: 'gallery', name: 'Galerie', icon: PhotoIcon, defaultSlug: '/galerie' },
  faq: { id: 'faq', name: 'FAQ', icon: QuestionMarkCircleIcon, defaultSlug: '/faq' },
  legal: { id: 'legal', name: 'Mentions légales', icon: ScaleIcon, defaultSlug: '/mentions-legales' },
};

export function PageNavigation() {
  const { pages, currentPageId, setCurrentPage, addPage, removePage, updatePage } = useEditorStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  
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

  const handleAddPage = () => {
    setPageForm({
      name: '',
      slug: '',
      type: 'service',
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
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Pages</h3>
        <button
          onClick={handleAddPage}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1">
        {pages.map((page) => {
          const Icon = getPageIcon(page);
          const isActive = currentPageId === page.id;
          const isHome = page.id === 'home';

          return (
            <div
              key={page.id}
              className={`
                group flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors
                ${isActive 
                  ? 'bg-primary-600 text-white' 
                  : 'hover:bg-gray-100'
                }
              `}
              onClick={() => setCurrentPage(page.id)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{page.name}</span>
              
              {!isHome && (
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPage(page);
                    }}
                  >
                    <PencilSquareIcon className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 hover:bg-red-100 text-red-600 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page.id);
                    }}
                  >
                    <TrashIcon className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Simple Dialog/Modal */}
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
                    {Object.entries(pageTypes).map(([key, type]) => (
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre SEO (optionnel)
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description SEO (optionnel)
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
    </div>
  );
}
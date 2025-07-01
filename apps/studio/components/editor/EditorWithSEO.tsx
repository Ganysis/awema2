'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEditorStore, type Page } from '@/lib/store/editor-store';
import { siteGenerator } from '@/lib/services/site-generator';
import { Gender, IncomeLevel, EducationLevel } from '@awema/shared';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Toolbar } from './Toolbar';
import { PreviewModal } from './PreviewModal';
import { SEOPageEditor } from './SEOPageEditor';
import { SEOSettings } from '../SEOSettings';
import { 
  CheckIcon, 
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface EditorProps {
  projectId?: string;
  template?: string;
  theme?: string;
}

type EditorTab = 'design' | 'seo' | 'settings';

export function EditorWithSEO({ projectId, template, theme = 'premium' }: EditorProps = {}) {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<EditorTab>('design');
  
  const { 
    isPreviewMode, 
    setPreviewMode, 
    clearBlocks, 
    addBlock, 
    setThemeVariant, 
    updateColors, 
    initializePages, 
    setBusinessInfo,
    pages,
    setPages,
    theme: currentTheme,
    businessInfo,
    projectName,
    setProjectName,
    globalHeader,
    globalFooter,
    setGlobalHeader,
    setGlobalFooter,
    setSaving,
    isSaving,
    currentPageId,
    selectedBlockId
  } = useEditorStore();
  
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');
  const isGenerated = searchParams.get('generated') === 'true';
  const autoPreview = searchParams.get('preview') === 'true';

  // Fonction pour sauvegarder le projet
  const saveProject = useCallback(async () => {
    if (!projectId) return;
    
    setSaveStatus('saving');
    setSaving(true);
    
    try {
      const response = await fetch(`/api/projects/${projectId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            businessInfo,
            projectName,
            globalHeader,
            globalFooter,
            pages,
            theme: currentTheme,
          },
        }),
      });
      
      if (response.ok) {
        setLastSaved(new Date());
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }, [projectId, businessInfo, projectName, globalHeader, globalFooter, pages, currentTheme, setSaving]);

  // Fonction pour charger le projet
  const loadProject = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();
      
      if (data.success && data.data.data) {
        const projectData = data.data.data;
        
        if (projectData.businessInfo) {
          setBusinessInfo(projectData.businessInfo);
        }
        if (projectData.projectName) {
          setProjectName(projectData.projectName);
        }
        if (projectData.theme) {
          setThemeVariant(projectData.theme.variant || theme);
          if (projectData.theme.colors) {
            updateColors(projectData.theme.colors);
          }
        }
        if (projectData.globalHeader) {
          setGlobalHeader(projectData.globalHeader);
        }
        if (projectData.globalFooter) {
          setGlobalFooter(projectData.globalFooter);
        }
        if (projectData.pages && projectData.pages.length > 0) {
          initializePages(projectData.pages);
        }
      } else if (isGenerated && clientId) {
        await generateInitialSite();
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour générer le site initial
  const generateInitialSite = async () => {
    if (!clientId) return;
    
    try {
      const clientResponse = await fetch(`/api/clients/${clientId}`);
      const clientData = await clientResponse.json();
      
      if (clientData.success) {
        const client = clientData.data;
        const generatedData = siteGenerator.generateSiteFromClient(client);
        
        if (generatedData) {
          // Extract business info from client data
          setBusinessInfo({
            companyName: client.businessName || 'Mon Entreprise',
            industry: {
              category: client.businessType || 'artisan',
              subCategory: client.businessType || 'general',
              keywords: []
            },
            description: client.businessDescription || '',
            targetAudience: {
              demographics: {
                ageRange: [25, 65],
                gender: [Gender.ALL],
                income: IncomeLevel.MEDIUM,
                education: [EducationLevel.HIGH_SCHOOL],
                location: [client.city || 'France']
              },
              psychographics: {
                interests: [],
                values: [],
                lifestyle: [],
                challenges: []
              },
              behaviors: []
            },
            services: client.services?.map((s: any, index: number) => ({
              id: `service-${index}`,
              name: s.name || s,
              description: s.description || '',
              features: [],
              category: 'general'
            })) || [],
            contact: {
              email: client.email || '',
              phone: client.phone || '',
              address: {
                street: client.address || '',
                city: client.city || '',
                state: '',
                postalCode: client.postalCode || '',
                country: 'France'
              },
              hours: {}
            },
            socialMedia: {},
            branding: {
              colors: {
                primary: client.primaryColor || '#000000'
              },
              values: []
            },
            location: {
              serviceArea: client.interventionCities || [],
              isOnline: false
            }
          });
          
          // Set project name based on business name
          setProjectName(`${client.businessName} - Site Web`);
          
          // Apply generated theme
          if (generatedData.theme) {
            setThemeVariant(generatedData.theme.variant);
            updateColors(generatedData.theme.colors);
          }
          
          // Initialize pages with generated blocks
          if (generatedData.pages) {
            // Convert Map to array of Page objects
            const pagesArray: Page[] = Array.from(generatedData.pages.entries()).map(([key, blocks]) => ({
              id: key,
              name: key.charAt(0).toUpperCase() + key.slice(1),
              slug: key === 'home' ? '/' : `/${key}`,
              blocks: blocks
            }));
            initializePages(pagesArray);
          }
          
          // Set main page blocks
          if (generatedData.blocks && generatedData.blocks.length > 0) {
            // Find header and footer blocks
            const headerBlock = generatedData.blocks.find(b => b.type === 'header-pro' || b.type === 'simple-header');
            const footerBlock = generatedData.blocks.find(b => b.type === 'footer-pro' || b.type === 'simple-footer');
            
            if (headerBlock) {
              setGlobalHeader(headerBlock);
            }
            
            if (footerBlock) {
              setGlobalFooter(footerBlock);
            }
            
            // Set the remaining blocks as the main page content
            const contentBlocks = generatedData.blocks.filter(b => 
              b.type !== 'header-pro' && 
              b.type !== 'simple-header' && 
              b.type !== 'footer-pro' && 
              b.type !== 'simple-footer'
            );
            
            // Update the home page blocks
            const updatedPages = pages.map(p => 
              p.id === 'home' ? { ...p, blocks: contentBlocks } : p
            );
            setPages(updatedPages);
          }
          
          await saveProject();
        }
      }
    } catch (error) {
      console.error('Error generating site:', error);
    }
  };

  // Auto-save toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (projectId && !isSaving) {
        saveProject();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [projectId, saveProject, isSaving]);

  // Load project on mount
  useEffect(() => {
    loadProject();
  }, [projectId]);

  // Auto preview
  useEffect(() => {
    if (autoPreview && !loading) {
      setShowPreview(true);
    }
  }, [autoPreview, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'éditeur...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toolbar onPreview={() => setShowPreview(true)} />
      
      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-4">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('design')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'design'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <CogIcon className="w-4 h-4" />
                Design
              </div>
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'seo'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MagnifyingGlassIcon className="w-4 h-4" />
                SEO
                <span className="bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5 rounded">
                  2030
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4" />
                Analytics
              </div>
            </button>
          </nav>
          
          {/* Save Status */}
          <div className="flex items-center gap-2 text-sm">
            {saveStatus === 'saving' && (
              <span className="flex items-center text-gray-600">
                <CloudArrowUpIcon className="w-4 h-4 mr-1 animate-pulse" />
                Sauvegarde...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="flex items-center text-green-600">
                <CheckIcon className="w-4 h-4 mr-1" />
                Sauvegardé
              </span>
            )}
            {lastSaved && (
              <span className="text-gray-500">
                {new Date(lastSaved).toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'design' && (
          <>
            <Sidebar />
            <div className="flex-1 flex">
              <Canvas />
              {selectedBlockId && <PropertiesPanel />}
            </div>
          </>
        )}
        
        {activeTab === 'seo' && (
          <div className="flex-1 flex">
            <div className="w-80 bg-white border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Pages du site</h3>
                <p className="text-sm text-gray-600 mt-1">Sélectionnez une page pour analyser et optimiser son SEO</p>
              </div>
              <div className="p-4 space-y-2">
                {pages.map(page => {
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        const store = useEditorStore.getState();
                        store.setCurrentPage(page.id);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        currentPageId === page.id
                          ? 'bg-primary-50 border-2 border-primary-300 shadow-sm'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{page.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{page.slug}</div>
                        </div>
                        <div className="ml-2">
                          {currentPageId === page.id && (
                            <div className="flex items-center">
                              <CheckIcon className="w-5 h-5 text-primary-600" />
                            </div>
                          )}
                        </div>
                      </div>
                      {page.seo?.title && (
                        <div className="mt-2 text-xs text-gray-600 truncate">
                          {page.seo.title}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col bg-gray-50">
              {currentPageId ? (
                <>
                  {/* Page Header */}
                  <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          Optimisation SEO : {pages.find(p => p.id === currentPageId)?.name}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Analysez et optimisez le référencement de cette page
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const currentIndex = pages.findIndex(p => p.id === currentPageId);
                            if (currentIndex > 0) {
                              const store = useEditorStore.getState();
                              store.setCurrentPage(pages[currentIndex - 1].id);
                            }
                          }}
                          disabled={pages.findIndex(p => p.id === currentPageId) === 0}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ← Page précédente
                        </button>
                        <button
                          onClick={() => {
                            const currentIndex = pages.findIndex(p => p.id === currentPageId);
                            if (currentIndex < pages.length - 1) {
                              const store = useEditorStore.getState();
                              store.setCurrentPage(pages[currentIndex + 1].id);
                            }
                          }}
                          disabled={pages.findIndex(p => p.id === currentPageId) === pages.length - 1}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Page suivante →
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* SEO Editor */}
                  <div className="flex-1 overflow-y-auto">
                    <SEOPageEditor pageId={currentPageId} />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune page sélectionnée</h3>
                    <p className="mt-1 text-sm text-gray-500">Sélectionnez une page dans la liste pour commencer l'optimisation SEO</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Configuration SEO & Analytics</h2>
              <SEOSettings 
                exportOptions={{
                  enableAdvancedSEO: true,
                  generateSEOContent: true,
                  enableAnalytics: false,
                  ga4MeasurementId: '',
                  enableSEOMonitoring: true,
                  enableImageOptimization: true,
                  generateSitemap: true,
                  generateRobotsTxt: true,
                }}
                onUpdate={(options) => {
                  // Pour l'instant, on sauvegarde les options dans localStorage
                  // TODO: Ajouter les champs analytics dans BusinessInfo type
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('awema_seo_options', JSON.stringify(options));
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}
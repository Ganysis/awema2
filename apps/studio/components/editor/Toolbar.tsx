'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { ExportModalWithZip } from './ExportModalWithZip';
import { NetlifyDeployModal } from './NetlifyDeployModal';
import { RandomSiteGenerator } from '@/lib/services/random-site-generator';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  EyeIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  SparklesIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface ToolbarProps {
  onPreview: () => void;
  saveStatus?: React.ReactNode;
  projectId?: string;
}

export function Toolbar({ onPreview, saveStatus, projectId }: ToolbarProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { 
    projectName,
    previewDevice, 
    setPreviewDevice,
    isSaving,
    isPreviewMode,
    setPreviewMode,
    businessInfo,
    currentPageId,
    pages,
    blocks,
    clearBlocks,
    addBlock,
    initializePages,
    setThemeVariant,
    updateColors
  } = useEditorStore();
  
  // Get undo/redo from temporal store
  const temporalStore = useEditorStore.temporal;
  const { undo, redo, pastStates, futureStates } = temporalStore.getState();
  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  const handleRandomGeneration = async () => {
    // On peut générer même sans businessInfo complet
    setIsGenerating(true);
    
    try {
      // Générer le site aléatoire
      const randomSite = RandomSiteGenerator.generateRandomizedSite(businessInfo);
      
      // Effacer les blocs actuels
      clearBlocks();
      
      // Appliquer le nouveau thème
      setThemeVariant(randomSite.theme.variant);
      if (randomSite.theme.colors) {
        updateColors(randomSite.theme.colors);
      }
      
      // Convertir les pages
      const editorPages = [];
      
      // Page principale
      editorPages.push({
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: randomSite.blocks,
        meta: {
          title: `${businessInfo.companyName || 'Mon Site'} - ${businessInfo.industry?.category || 'Services'}`,
          description: businessInfo.description || `Services de ${businessInfo.industry?.category || 'qualité'}`
        }
      });
      
      // Autres pages
      randomSite.pages.forEach((pageBlocks, slug) => {
        const pageName = slug.includes('services/') ? 
          slug.replace('services/', '').charAt(0).toUpperCase() + slug.replace('services/', '').slice(1) :
          slug.charAt(0).toUpperCase() + slug.slice(1);
          
        editorPages.push({
          id: crypto.randomUUID(),
          name: pageName,
          slug: `/${slug}`,
          blocks: pageBlocks,
          meta: {
            title: `${pageName} - ${businessInfo.companyName}`,
            description: `${pageName} - ${businessInfo.industry?.category || 'Services'}`
          }
        });
      });
      
      // Initialiser toutes les pages
      initializePages(editorPages);
      
      // Message de succès avec les styles appliqués
      const styleInfo = `
        Style visuel: ${randomSite.config.visualStyle}
        Couleurs: ${randomSite.config.colorScheme}
        Espacement: ${randomSite.config.spacing}
        Animations: ${randomSite.config.animations}
      `;
      
      console.log('Site généré avec succès !', styleInfo);
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      alert('Une erreur est survenue lors de la génération');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
    <div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-900">{projectName}</h1>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => undo()}
            disabled={!canUndo}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => redo()}
            disabled={!canRedo}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Center Section - Save Status & Device Preview */}
      <div className="flex items-center space-x-4">
        {saveStatus && (
          <div className="flex items-center">
            {saveStatus}
          </div>
        )}
        
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setPreviewDevice('mobile')}
          className={`p-2 rounded ${
            previewDevice === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
          }`}
          title="Mobile"
        >
          <DevicePhoneMobileIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setPreviewDevice('tablet')}
          className={`p-2 rounded ${
            previewDevice === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
          }`}
          title="Tablet"
        >
          <DeviceTabletIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setPreviewDevice('desktop')}
          className={`p-2 rounded ${
            previewDevice === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
          }`}
          title="Desktop"
        >
          <ComputerDesktopIcon className="w-5 h-5" />
        </button>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleRandomGeneration}
          disabled={isGenerating}
          className="px-4 py-2 text-sm font-medium rounded-md flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          title="Générer automatiquement un nouveau design"
        >
          <SparklesIcon className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Génération...' : 'Génération Auto'}</span>
        </button>

        <button
          onClick={() => setPreviewMode(!isPreviewMode)}
          className={`px-4 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
            isPreviewMode 
              ? 'text-white bg-primary-600 hover:bg-primary-700' 
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <EyeIcon className="w-4 h-4" />
          <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
        </button>
        
        <button
          onClick={onPreview}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
        >
          <EyeIcon className="w-4 h-4" />
          <span>Full Preview</span>
        </button>
        
        <button
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 flex items-center space-x-2"
          disabled={isSaving}
        >
          <CloudArrowUpIcon className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Export'}</span>
        </button>
        
        <button
          onClick={() => setShowDeployModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center space-x-2"
          disabled={isSaving || !projectId}
          title={!projectId ? 'Sauvegardez d\'abord votre projet' : 'Déployer sur Netlify'}
        >
          <GlobeAltIcon className="w-4 h-4" />
          <span>Déployer</span>
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-100"
          title="Settings"
        >
          <Cog6ToothIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
    
    {showExportModal && (
      <ExportModalWithZip onClose={() => setShowExportModal(false)} projectId={projectId} />
    )}
    
    {showDeployModal && projectId && (
      <NetlifyDeployModal 
        onClose={() => setShowDeployModal(false)} 
        projectId={projectId} 
      />
    )}
    </>
  );
}
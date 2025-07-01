'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { 
  XMarkIcon, 
  CloudArrowDownIcon,
  CodeBracketIcon,
  FolderArrowDownIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CogIcon,
  LockClosedIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { SEOSettings } from '../SEOSettings';
import { SimplifiedExportOptions } from '@/lib/services/static-export-simplified';

interface ExportModalProps {
  onClose: () => void;
  projectId?: string;
}

export function ExportModalWithCMS({ onClose, projectId }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [exportType, setExportType] = useState<'download' | 'code' | 'deploy'>('download');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Advanced options
  const [minifyHtml, setMinifyHtml] = useState(true);
  const [minifyCss, setMinifyCss] = useState(true);
  const [minifyJs, setMinifyJs] = useState(true);
  const [generateManifest, setGenerateManifest] = useState(true);
  const [generateServiceWorker, setGenerateServiceWorker] = useState(true);
  const [includeCms, setIncludeCms] = useState(false);
  const [cmsPassword, setCmsPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'advanced'>('general');
  
  // SEO Options
  const [seoOptions, setSeoOptions] = useState<SimplifiedExportOptions>({
    enableAdvancedSEO: true,
    generateSEOContent: true,
    enableAnalytics: false,
    enableSEOMonitoring: true,
    enableImageOptimization: true,
    generateAMP: false
  });
  
  const { projectName } = useEditorStore();

  const handleExport = async () => {
    if (!projectId) {
      alert('Projet non sauvegardé. Veuillez sauvegarder avant d\'exporter.');
      return;
    }

    setIsExporting(true);
    setExportStatus('exporting');
    
    try {
      if (exportType === 'download') {
        // Préparer les options d'export
        const exportOptions = {
          projectId,
          minifyHtml,
          minifyCss,
          minifyJs,
          generateManifest,
          generateServiceWorker,
          includeCms,
          cmsPassword: includeCms ? cmsPassword : undefined,
          ...seoOptions
        };

        // Appeler l'API d'export
        const response = await fetch('/api/export', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(exportOptions),
        });
        
        if (!response.ok) {
          throw new Error('Export failed');
        }
        
        // Télécharger le ZIP
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${projectName || 'site'}-export.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        setExportStatus('success');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Exporter le site
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {exportStatus === 'idle' || exportStatus === 'exporting' ? (
            <>
              <p className="text-gray-600 mb-6">
                Choisissez comment vous souhaitez exporter votre site web.
              </p>

              {/* Export Options */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="exportType"
                    value="download"
                    checked={exportType === 'download'}
                    onChange={(e) => setExportType(e.target.value as any)}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <FolderArrowDownIcon className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">Télécharger en ZIP</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Téléchargez tous les fichiers HTML, CSS, JS et assets optimisés
                    </p>
                  </div>
                </label>
              </div>

              {/* Advanced Options */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <CogIcon className="w-4 h-4 mr-1" />
                  Options avancées
                  <span className="ml-2">{showAdvancedOptions ? '▼' : '▶'}</span>
                </button>

                {showAdvancedOptions && (
                  <div className="mt-4 space-y-4 bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Optimisation</h4>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={minifyHtml}
                          onChange={(e) => setMinifyHtml(e.target.checked)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Minifier le HTML</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={minifyCss}
                          onChange={(e) => setMinifyCss(e.target.checked)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Minifier le CSS</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={minifyJs}
                          onChange={(e) => setMinifyJs(e.target.checked)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Minifier le JavaScript</span>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Fonctionnalités</h4>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={generateManifest}
                          onChange={(e) => setGenerateManifest(e.target.checked)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Générer manifest.json (PWA)</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={generateServiceWorker}
                          onChange={(e) => setGenerateServiceWorker(e.target.checked)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Générer Service Worker (offline)</span>
                      </label>
                    </div>

                    <div className="border-t pt-4">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={includeCms}
                          onChange={(e) => setIncludeCms(e.target.checked)}
                          className="mt-1 text-primary-600 focus:ring-primary-500"
                        />
                        <div className="ml-2">
                          <div className="flex items-center">
                            <LockClosedIcon className="w-4 h-4 text-gray-600 mr-1" />
                            <span className="text-sm font-medium text-gray-900">
                              Inclure le CMS d'administration
                            </span>
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Nouveau
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Permet de modifier le contenu après déploiement
                          </p>
                        </div>
                      </label>

                      {includeCms && (
                        <div className="mt-3 ml-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe administrateur
                          </label>
                          <input
                            type="password"
                            value={cmsPassword}
                            onChange={(e) => setCmsPassword(e.target.value)}
                            placeholder="Mot de passe pour accéder au CMS"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Email par défaut : admin@site.com
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Features included */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Inclus dans l'export :</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Toutes les pages et contenus
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Styles et scripts optimisés
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    SEO et métadonnées
                  </li>
                  {includeCms && (
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Interface d'administration CMS
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : exportStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Export réussi !
              </h3>
              <p className="text-gray-600">
                Votre site a été exporté avec succès.
              </p>
              {includeCms && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <p className="font-medium">Accès au CMS :</p>
                  <p>URL : /admin</p>
                  <p>Email : admin@site.com</p>
                  <p>Mot de passe : {cmsPassword || 'admin123'}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <ExclamationCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Erreur d'export
              </h3>
              <p className="text-gray-600">
                Une erreur s'est produite lors de l'export.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {(exportStatus === 'idle' || exportStatus === 'exporting') && (
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isExporting}
            >
              Annuler
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || (includeCms && !cmsPassword)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Export en cours...
                </>
              ) : (
                'Exporter'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
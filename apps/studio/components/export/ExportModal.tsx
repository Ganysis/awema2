'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  CloudArrowUpIcon,
  FolderArrowDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  CogIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { useEditorStore } from '@/lib/store/editor-store';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExportOptions {
  includeAdmin: boolean;
  optimizeImages: boolean;
  generateServiceWorker: boolean;
  generateSEOContent: boolean;
  includeAnalytics: boolean;
  compressionLevel: 'standard' | 'maximum';
  runLighthouseTest: boolean;
}

interface ExportProgress {
  stage: string;
  progress: number;
  currentTask: string;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includeAdmin: true,
    optimizeImages: true,
    generateServiceWorker: true,
    generateSEOContent: true,
    includeAnalytics: true,
    compressionLevel: 'maximum',
    runLighthouseTest: true
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress>({
    stage: 'idle',
    progress: 0,
    currentTask: ''
  });
  const [exportResult, setExportResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { blocks, pages, theme, businessInfo } = useEditorStore();
  
  const handleExport = async () => {
    if (!businessInfo) {
      setError('Aucune information client configurée');
      return;
    }
    
    setIsExporting(true);
    setError(null);
    setExportResult(null);
    
    try {
      // Étape 1: Préparation
      setExportProgress({
        stage: 'preparation',
        progress: 10,
        currentTask: 'Préparation de l\'export...'
      });
      
      const outputDir = `/tmp/export-${Date.now()}`;
      
      // Étape 2: Préparation des données
      setExportProgress({
        stage: 'preparation',
        progress: 30,
        currentTask: 'Préparation des données...'
      });
      
      // Étape 4: Export statique
      setExportProgress({
        stage: 'static-export',
        progress: 70,
        currentTask: 'Export et optimisation des fichiers...'
      });
      
      // Call the API endpoint
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessInfo,
          blocks,
          pages,
          theme,
          exportOptions
        })
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const result = await response.json();
      
      // Étape 5: Finalisation
      setExportProgress({
        stage: 'finalization',
        progress: 90,
        currentTask: 'Finalisation et compression...'
      });
      
      // Simuler le téléchargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setExportProgress({
        stage: 'complete',
        progress: 100,
        currentTask: 'Export terminé !'
      });
      
      setExportResult(result);
      
    } catch (err) {
      console.error('Export error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'export');
    } finally {
      setIsExporting(false);
    }
  };
  
  const downloadExport = () => {
    // TODO: Implémenter le téléchargement réel
    console.log('Téléchargement de l\'export...');
  };
  
  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Export du site statique
                </Dialog.Title>
                
                {!isExporting && !exportResult && (
                  <div className="space-y-6">
                    {/* Options d'export */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Options d'export</h4>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={exportOptions.includeAdmin}
                          onChange={(e) => setExportOptions({
                            ...exportOptions,
                            includeAdmin: e.target.checked
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center">
                          <CogIcon className="w-5 h-5 mr-2 text-gray-400" />
                          Inclure l'interface d'administration CMS
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={exportOptions.optimizeImages}
                          onChange={(e) => setExportOptions({
                            ...exportOptions,
                            optimizeImages: e.target.checked
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center">
                          <SparklesIcon className="w-5 h-5 mr-2 text-gray-400" />
                          Optimiser les images (WebP, compression)
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={exportOptions.generateServiceWorker}
                          onChange={(e) => setExportOptions({
                            ...exportOptions,
                            generateServiceWorker: e.target.checked
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center">
                          <GlobeAltIcon className="w-5 h-5 mr-2 text-gray-400" />
                          Générer Service Worker (mode hors-ligne)
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={exportOptions.generateSEOContent}
                          onChange={(e) => setExportOptions({
                            ...exportOptions,
                            generateSEOContent: e.target.checked
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center">
                          <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-400" />
                          Générer contenu SEO optimisé (1500+ mots)
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={exportOptions.runLighthouseTest}
                          onChange={(e) => setExportOptions({
                            ...exportOptions,
                            runLighthouseTest: e.target.checked
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center">
                          <BeakerIcon className="w-5 h-5 mr-2 text-gray-400" />
                          Tester les performances avec Lighthouse
                        </span>
                      </label>
                    </div>
                    
                    {/* Niveau de compression */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Niveau de compression</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="standard"
                            checked={exportOptions.compressionLevel === 'standard'}
                            onChange={(e) => setExportOptions({
                              ...exportOptions,
                              compressionLevel: 'standard'
                            })}
                            className="mr-2"
                          />
                          <span>Standard (plus rapide)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="maximum"
                            checked={exportOptions.compressionLevel === 'maximum'}
                            onChange={(e) => setExportOptions({
                              ...exportOptions,
                              compressionLevel: 'maximum'
                            })}
                            className="mr-2"
                          />
                          <span>Maximum (fichiers plus légers)</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Informations client */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Informations du site</h4>
                      <dl className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Client :</dt>
                          <dd className="font-medium">{businessInfo?.businessName}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Pages :</dt>
                          <dd className="font-medium">{pages.length + 1}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Blocs :</dt>
                          <dd className="font-medium">{blocks.length}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    {/* Erreur */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                          <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              Erreur lors de l'export
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>{error}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Progression de l'export */}
                {isExporting && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{exportProgress.currentTask}</span>
                        <span>{exportProgress.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exportProgress.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>• Génération du HTML optimisé</p>
                      <p>• Minification CSS/JS</p>
                      <p>• Compression des assets</p>
                      <p>• Génération des données structurées</p>
                    </div>
                  </div>
                )}
                
                {/* Résultat de l'export */}
                {exportResult && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">
                            Export terminé avec succès !
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    {/* Métriques de performance */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Performance estimée</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="text-gray-500">Taille totale :</dt>
                          <dd className="font-medium">
                            {(exportResult.performance.totalSize / 1024 / 1024).toFixed(2)} MB
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Taille compressée :</dt>
                          <dd className="font-medium">
                            {(exportResult.performance.compressedSize / 1024 / 1024).toFixed(2)} MB
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Réduction :</dt>
                          <dd className="font-medium text-green-600">
                            -{exportResult.performance.imageOptimization}%
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Temps de chargement (3G) :</dt>
                          <dd className="font-medium">
                            {exportResult.performance.estimatedLoadTime}s
                          </dd>
                        </div>
                      </div>
                    </div>
                    
                    {/* Score SEO */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Analyse SEO</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Score global :</span>
                        <span className={`text-2xl font-bold ${getPerformanceColor(exportResult.seo.score)}`}>
                          {exportResult.seo.score}/100
                        </span>
                      </div>
                      {exportResult.seo.issues.length > 0 && (
                        <ul className="mt-2 text-sm text-red-600 space-y-1">
                          {exportResult.seo.issues.map((issue: string, index: number) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* Fichiers générés */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Fichiers générés</h4>
                      <p className="text-sm text-gray-500">
                        {exportResult.files.length} fichiers prêts à être déployés
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                  {!isExporting && !exportResult && (
                    <>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={handleExport}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <CloudArrowUpIcon className="w-5 h-5 inline-block mr-2 -mt-0.5" />
                        Lancer l'export
                      </button>
                    </>
                  )}
                  
                  {exportResult && (
                    <>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Fermer
                      </button>
                      <button
                        type="button"
                        onClick={downloadExport}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FolderArrowDownIcon className="w-5 h-5 inline-block mr-2 -mt-0.5" />
                        Télécharger l'export
                      </button>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
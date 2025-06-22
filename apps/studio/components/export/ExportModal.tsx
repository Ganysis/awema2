'use client';

import { useState } from 'react';
import {
  CloudArrowUpIcon,
  FolderArrowDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

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
  // const [exportOptions, setExportOptions] = useState<ExportOptions>({
  //   includeAdmin: true,
  //   optimizeImages: true,
  //   generateServiceWorker: true,
  //   generateSEOContent: true,
  //   includeAnalytics: true,
  //   compressionLevel: 'maximum',
  //   runLighthouseTest: true
  // });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress>({
    stage: '',
    progress: 0,
    currentTask: ''
  });
  const [exportResult, setExportResult] = useState<{
    success: boolean;
    message: string;
    downloadUrl?: string;
  } | null>(null);

  // const { project, pages, globalBlocks } = useEditorStore();

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      // Simulate export process
      setExportProgress({
        stage: 'Préparation',
        progress: 10,
        currentTask: 'Génération de la structure...'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      setExportProgress({
        stage: 'Génération',
        progress: 50,
        currentTask: 'Création des pages...'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      setExportProgress({
        stage: 'Optimisation',
        progress: 80,
        currentTask: 'Compression des assets...'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      setExportProgress({
        stage: 'Finalisation',
        progress: 100,
        currentTask: 'Export terminé!'
      });

      setExportResult({
        success: true,
        message: 'Export réussi!',
        downloadUrl: '/mock-download.zip'
      });
    } catch (error) {
      setExportResult({
        success: false,
        message: 'Erreur lors de l\'export'
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
              <CloudArrowUpIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Export du site
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Configurez et exportez votre site web
                </p>
              </div>
            </div>
          </div>

          {!isExporting && !exportResult && (
            <div className="mt-5 space-y-4">
              {/* Export options would go here */}
              <div className="text-center mt-6">
                <button
                  onClick={handleExport}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Démarrer l'export
                </button>
              </div>
            </div>
          )}

          {isExporting && (
            <div className="mt-5">
              <div className="text-center">
                <p className="text-lg font-medium">{exportProgress.stage}</p>
                <p className="text-sm text-gray-500 mt-2">{exportProgress.currentTask}</p>
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2 w-full">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${exportProgress.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {exportResult && (
            <div className="mt-5">
              <div className="text-center">
                {exportResult.success ? (
                  <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
                ) : (
                  <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-500" />
                )}
                <p className="mt-3 text-lg font-medium">{exportResult.message}</p>
                {exportResult.downloadUrl && (
                  <a
                    href={exportResult.downloadUrl}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FolderArrowDownIcon className="mr-2 h-5 w-5" />
                    Télécharger
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
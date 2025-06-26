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
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface ExportModalProps {
  onClose: () => void;
  projectId?: string;
}

export function ExportModalWithZip({ onClose, projectId }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [exportType, setExportType] = useState<'download' | 'code' | 'deploy'>('download');
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
        // Appeler l'API d'export
        const response = await fetch('/api/export', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectId }),
        });
        
        if (!response.ok) {
          throw new Error('Export failed');
        }
        
        // Télécharger le ZIP
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}-export.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setExportStatus('success');
        
        // Fermer après 2 secondes
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (exportType === 'deploy') {
        // TODO: Implémenter le déploiement one-click
        alert('Le déploiement one-click sera bientôt disponible !');
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
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
        <div className="p-6">
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

                <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors opacity-50">
                  <input
                    type="radio"
                    name="exportType"
                    value="deploy"
                    checked={exportType === 'deploy'}
                    onChange={(e) => setExportType(e.target.value as any)}
                    className="mt-1 text-primary-600 focus:ring-primary-500"
                    disabled
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <CloudArrowDownIcon className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">Déployer en ligne</span>
                      <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Bientôt</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Déployez directement sur Netlify ou Vercel
                    </p>
                  </div>
                </label>
              </div>

              {/* Features included */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Inclus dans l'export :</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    HTML minifié et optimisé
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    CSS et JS compressés
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Images optimisées (WebP)
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    SEO et métadonnées
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Service Worker pour mode offline
                  </li>
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
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Export en cours...
                </>
              ) : (
                <>
                  <CloudArrowDownIcon className="w-4 h-4 mr-2" />
                  Exporter
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
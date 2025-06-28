'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ClockIcon, TrashIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import { VersionHistoryService, Version } from '@/lib/services/version-history.service';
import { useEditorStore } from '@/lib/store/editor-store';

interface VersionHistoryModalProps {
  onClose: () => void;
  projectId?: string;
}

export function VersionHistoryModal({ onClose, projectId }: VersionHistoryModalProps) {
  const [versionHistory, setVersionHistory] = useState<VersionHistoryService | null>(null);
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  
  const store = useEditorStore();

  useEffect(() => {
    // Initialiser le service d'historique
    const service = new VersionHistoryService({
      storageKey: projectId ? `version-history-${projectId}` : 'version-history-default',
      maxVersions: 50,
      autoSaveInterval: 30000 // 30 secondes
    });
    
    setVersionHistory(service);
    setVersions(service.getVersions());
    
    // Démarrer la sauvegarde automatique
    service.startAutoSave(() => ({
      pages: store.pages,
      blocks: store.blocks,
      theme: store.theme,
      businessInfo: store.businessInfo,
      globalHeader: store.globalHeader,
      globalFooter: store.globalFooter,
      timestamp: Date.now()
    }));
    
    return () => {
      service.stopAutoSave();
    };
  }, [projectId]);

  const handleSaveManual = () => {
    if (!versionHistory) return;
    
    const data = {
      pages: store.pages,
      blocks: store.blocks,
      theme: store.theme,
      businessInfo: store.businessInfo,
      globalHeader: store.globalHeader,
      globalFooter: store.globalFooter,
      timestamp: Date.now()
    };
    
    const description = prompt('Description de la sauvegarde (optionnel):');
    versionHistory.saveVersion(data, 'manual', description || 'Sauvegarde manuelle');
    setVersions(versionHistory.getVersions());
  };

  const handleRestore = async (versionId: string) => {
    if (!versionHistory || isRestoring) return;
    
    setIsRestoring(true);
    try {
      const restoredData = versionHistory.restoreVersion(versionId);
      if (restoredData) {
        // Restaurer les données dans le store
        if (restoredData.pages) store.setPages(restoredData.pages);
        if (restoredData.blocks) {
          store.clearBlocks();
          restoredData.blocks.forEach((block: any) => store.addBlock(block));
        }
        if (restoredData.theme) store.setTheme(restoredData.theme);
        if (restoredData.businessInfo) store.setBusinessInfo(restoredData.businessInfo);
        if (restoredData.globalHeader) store.setGlobalHeader(restoredData.globalHeader);
        if (restoredData.globalFooter) store.setGlobalFooter(restoredData.globalFooter);
        
        // Rafraîchir la liste des versions
        setVersions(versionHistory.getVersions());
        
        // Message de succès
        alert('Version restaurée avec succès !');
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
      alert('Erreur lors de la restauration de la version');
    } finally {
      setIsRestoring(false);
    }
  };

  const handleDelete = (versionId: string) => {
    if (!versionHistory) return;
    
    versionHistory.deleteVersion(versionId);
    setVersions(versionHistory.getVersions());
    setShowConfirmDelete(null);
  };

  const handleClearHistory = () => {
    if (!versionHistory) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ? Cette action est irréversible.')) {
      versionHistory.clearHistory();
      setVersions([]);
    }
  };

  const formatSize = (data: any): string => {
    const size = JSON.stringify(data).length;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <ClockIcon className="w-6 h-6 text-gray-600" />
              <Dialog.Title className="text-lg font-semibold">
                Historique des versions
              </Dialog.Title>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Actions */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={handleSaveManual}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Sauvegarder maintenant</span>
              </button>
              
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Effacer tout l'historique</span>
              </button>
            </div>

            {/* Liste des versions */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {versions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune version sauvegardée
                </div>
              ) : (
                versions.map((version) => (
                  <div
                    key={version.id}
                    className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      selectedVersion?.id === version.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedVersion(version)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{version.label}</h3>
                          {version.type === 'auto' && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              Auto
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{version.date}</p>
                        {version.description && (
                          <p className="text-sm text-gray-700 mt-2">{version.description}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Taille: {formatSize(version.data)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(version.id);
                          }}
                          disabled={isRestoring}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
                          title="Restaurer cette version"
                        >
                          <ArrowPathIcon className={`w-5 h-5 ${isRestoring ? 'animate-spin' : ''}`} />
                        </button>
                        
                        {showConfirmDelete === version.id ? (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(version.id);
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Confirmer la suppression"
                            >
                              <CheckIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowConfirmDelete(null);
                              }}
                              className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                              title="Annuler"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowConfirmDelete(version.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Supprimer cette version"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Info :</strong> Les sauvegardes automatiques sont effectuées toutes les 30 secondes. 
                Les versions manuelles sont conservées en priorité. Maximum {versionHistory?.options?.maxVersions || 50} versions.
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
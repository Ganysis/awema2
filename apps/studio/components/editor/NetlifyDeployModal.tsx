'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, GlobeAltIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { DNSInstructionsModal } from './DNSInstructionsModal';
import { DomainPurchaseHelper, DomainStatusDisplay } from './DomainPurchaseHelper';

interface NetlifyDeployModalProps {
  onClose: () => void;
  projectId: string;
}

type DeployStatus = 'idle' | 'preparing' | 'transforming' | 'uploading' | 'deploying' | 'completed' | 'error';

interface DeployProgress {
  stage: DeployStatus;
  message: string;
  progress: number;
  siteUrl?: string;
  deployId?: string;
  dnsInstructions?: any;
}

export function NetlifyDeployModal({ onClose, projectId }: NetlifyDeployModalProps) {
  const [netlifyToken, setNetlifyToken] = useState('');
  const [siteName, setSiteName] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle');
  const [deployMessage, setDeployMessage] = useState('');
  const [deployProgress, setDeployProgress] = useState(0);
  const [siteUrl, setSiteUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showDNSInstructions, setShowDNSInstructions] = useState(false);
  const [dnsConfig, setDnsConfig] = useState<any>(null);

  // Charger le token depuis le localStorage si disponible
  useEffect(() => {
    const savedToken = localStorage.getItem('netlifyToken');
    if (savedToken) {
      setNetlifyToken(savedToken);
    }
  }, []);

  // Sauvegarder le token dans le localStorage
  const handleTokenChange = (token: string) => {
    setNetlifyToken(token);
    if (token) {
      localStorage.setItem('netlifyToken', token);
    } else {
      localStorage.removeItem('netlifyToken');
    }
  };

  const handleDeploy = async () => {
    if (!netlifyToken || !siteName) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsDeploying(true);
    setDeployStatus('preparing');
    setDeployMessage('Préparation du déploiement...');
    setDeployProgress(10);

    try {
      // Simuler les étapes de déploiement pour le feedback visuel
      const stages: DeployProgress[] = [
        { stage: 'preparing', message: 'Préparation du site...', progress: 10 },
        { stage: 'transforming', message: 'Transformation des liens...', progress: 30 },
        { stage: 'uploading', message: 'Upload des fichiers...', progress: 50 },
        { stage: 'deploying', message: 'Déploiement en cours...', progress: 70 },
      ];

      // Afficher les étapes progressivement
      for (const stage of stages) {
        setDeployStatus(stage.stage);
        setDeployMessage(stage.message);
        setDeployProgress(stage.progress);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Effectuer le déploiement réel
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          netlifyToken,
          siteName,
          customDomain: customDomain || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Le déploiement a échoué');
      }

      // Déploiement réussi
      setSiteUrl(result.siteUrl);
      setDeployStatus('completed');
      setDeployMessage('Déploiement terminé avec succès !');
      setDeployProgress(100);
      
      // Si un domaine personnalisé a été configuré, récupérer les instructions DNS
      if (customDomain && result.dnsConfig) {
        setDnsConfig(result.dnsConfig);
      }

    } catch (error: any) {
      console.error('Erreur de déploiement:', error);
      setDeployStatus('error');
      setDeployMessage(error.message || 'Une erreur est survenue lors du déploiement');
      setDeployProgress(0);
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = () => {
    switch (deployStatus) {
      case 'completed':
        return <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto" />;
      case 'error':
        return <ExclamationCircleIcon className="w-12 h-12 text-red-500 mx-auto" />;
      default:
        return <GlobeAltIcon className="w-12 h-12 text-blue-500 mx-auto animate-pulse" />;
    }
  };

  const getProgressBarColor = () => {
    switch (deployStatus) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Déployer sur Netlify
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {deployStatus === 'idle' ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Token Netlify <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={netlifyToken}
                    onChange={(e) => handleTokenChange(e.target.value)}
                    placeholder="Votre token d'accès personnel Netlify"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    <a 
                      href="https://app.netlify.com/user/applications#personal-access-tokens" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Obtenir un token →
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du site <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="mon-site-artisan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL : https://{siteName || 'mon-site'}.netlify.app
                  </p>
                </div>

                {/* Domain Purchase Helper */}
                <DomainPurchaseHelper 
                  siteName={siteName || 'mon-site'} 
                  onDomainSelected={setCustomDomain}
                />

                {customDomain && (
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-sm font-medium text-gray-700">
                      Domaine configuré : {customDomain}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Les instructions DNS seront générées après le déploiement
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  💰 Économisez 83% par rapport à o2switch
                </h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>✅ Netlify : 15€/an (domaine inclus)</li>
                  <li>✅ CDN mondial inclus</li>
                  <li>✅ SSL automatique</li>
                  <li>✅ Déploiement en 1 clic</li>
                </ul>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeploy}
                  disabled={!netlifyToken || !siteName || isDeploying}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <GlobeAltIcon className="w-4 h-4" />
                  <span>Déployer maintenant</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                {getStatusIcon()}
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {deployMessage}
              </h3>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor()}`}
                  style={{ width: `${deployProgress}%` }}
                />
              </div>

              {deployStatus === 'completed' && siteUrl && (
                <>
                  <div className="mt-6">
                    <p className="text-sm text-green-800 mb-4 text-center">
                      ✅ Votre site est maintenant en ligne !
                    </p>
                    
                    {/* Affichage du statut du domaine */}
                    <DomainStatusDisplay
                      temporaryUrl={siteUrl}
                      customDomain={customDomain}
                      isConfigured={false}
                    />

                    {customDomain && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setShowDNSInstructions(true)}
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Voir les instructions de configuration DNS →
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {deployStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    {deployMessage}
                  </p>
                </div>
              )}

              {(deployStatus === 'completed' || deployStatus === 'error') && (
                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Fermer
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal des instructions DNS */}
      {showDNSInstructions && customDomain && (
        <DNSInstructionsModal
          domain={customDomain}
          siteName={siteName}
          dnsConfig={dnsConfig}
          onClose={() => setShowDNSInstructions(false)}
        />
      )}
    </div>
  );
}
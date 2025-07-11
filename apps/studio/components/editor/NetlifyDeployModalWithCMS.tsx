'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, GlobeAltIcon, CheckCircleIcon, ExclamationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { DNSInstructionsModal } from './DNSInstructionsModal';
import { DomainPurchaseHelper, DomainStatusDisplay } from './DomainPurchaseHelper';
import { useEditorStore } from '@/lib/store/editor-store';

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

type PlanType = 'starter' | 'pro' | 'premium';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: PlanType;
  name: string;
  price: number;
  monthly: number;
  features: PlanFeature[];
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 297,
    monthly: 19,
    features: [
      { name: 'Site web optimisé', included: true },
      { name: 'Hébergement Netlify', included: true },
      { name: 'SSL inclus', included: true },
      { name: 'Domaine personnalisé', included: true },
      { name: 'CMS intégré', included: false },
      { name: 'Édition de contenu', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 497,
    monthly: 39,
    features: [
      { name: 'Site web optimisé', included: true },
      { name: 'Hébergement Netlify', included: true },
      { name: 'SSL inclus', included: true },
      { name: 'Domaine personnalisé', included: true },
      { name: 'CMS intégré', included: true },
      { name: 'Édition de contenu', included: true },
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 797,
    monthly: 59,
    features: [
      { name: 'Site web optimisé', included: true },
      { name: 'Hébergement Netlify', included: true },
      { name: 'SSL inclus', included: true },
      { name: 'Domaine personnalisé', included: true },
      { name: 'CMS intégré', included: true },
      { name: 'Édition de contenu', included: true },
      { name: 'Multi-utilisateurs', included: true },
      { name: 'API avancée', included: true },
      { name: 'Analytics intégrés', included: true },
    ]
  }
];

export function NetlifyDeployModalWithCMS({ onClose, projectId }: NetlifyDeployModalProps) {
  const [netlifyToken, setNetlifyToken] = useState('');
  const [siteName, setSiteName] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro');
  const [adminEmail, setAdminEmail] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle');
  const [deployMessage, setDeployMessage] = useState('');
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployResult, setDeployResult] = useState<any>(null);
  const [showDNSInstructions, setShowDNSInstructions] = useState(false);
  
  // Récupérer les données du projet depuis le store
  const { pages, theme, businessInfo } = useEditorStore();

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
    setDeployMessage('Préparation du déploiement avec CMS...');
    setDeployProgress(10);

    try {
      // Préparer les données du projet
      const projectData = {
        pages,
        theme,
        businessInfo,
        settings: {
          siteName: businessInfo?.name || siteName,
          siteDescription: businessInfo?.description || '',
          language: 'fr'
        }
      };

      // Simuler les étapes de déploiement pour le feedback visuel
      const stages: DeployProgress[] = [
        { stage: 'preparing', message: 'Préparation du site et du CMS...', progress: 10 },
        { stage: 'transforming', message: 'Configuration du CMS Supabase...', progress: 25 },
        { stage: 'uploading', message: 'Upload des fichiers et assets...', progress: 50 },
        { stage: 'deploying', message: 'Déploiement sur Netlify...', progress: 75 },
      ];

      // Afficher les étapes progressivement
      for (const stage of stages) {
        setDeployStatus(stage.stage);
        setDeployMessage(stage.message);
        setDeployProgress(stage.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Effectuer le déploiement réel avec le nouveau système
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteId: projectId,
          siteName,
          projectData,
          plan: selectedPlan,
          customDomain: customDomain || undefined,
          adminEmail: adminEmail || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Le déploiement a échoué');
      }

      // Déploiement réussi
      setDeployResult(result);
      setDeployStatus('completed');
      setDeployMessage('Déploiement terminé avec succès !');
      setDeployProgress(100);

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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Déployer avec CMS intégré
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
              {/* Sélection du plan */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Choisissez votre plan
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            Recommandé
                          </span>
                        </div>
                      )}
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {plan.price}€
                      </p>
                      <p className="text-sm text-gray-500">
                        puis {plan.monthly}€/mois
                      </p>
                      <ul className="mt-3 space-y-1">
                        {plan.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="text-xs flex items-center">
                            <span className={feature.included ? 'text-green-500 mr-1' : 'text-gray-300 mr-1'}>
                              {feature.included ? '✓' : '✗'}
                            </span>
                            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

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

                {selectedPlan !== 'starter' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email administrateur CMS
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@monentreprise.fr (optionnel)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Laissez vide pour utiliser l'email par défaut
                    </p>
                  </div>
                )}

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

              {selectedPlan !== 'starter' && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-900 mb-2 flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-1" />
                    CMS inclus avec le plan {PLANS.find(p => p.id === selectedPlan)?.name}
                  </h3>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>✓ Interface d'administration intuitive</li>
                    <li>✓ Édition de contenu en temps réel</li>
                    <li>✓ Sauvegarde automatique</li>
                    {selectedPlan === 'premium' && <li>✓ Multi-utilisateurs et API</li>}
                  </ul>
                </div>
              )}

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

              {deployStatus === 'completed' && deployResult && (
                <>
                  <div className="mt-6">
                    <p className="text-sm text-green-800 mb-4 text-center">
                      ✅ Votre site est maintenant en ligne !
                    </p>
                    
                    <DomainStatusDisplay
                      temporaryUrl={deployResult.siteUrl}
                      customDomain={customDomain}
                      isConfigured={false}
                    />

                    {deployResult.credentials && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          🔐 Identifiants CMS
                        </h4>
                        <p className="text-sm text-blue-800">
                          <strong>URL Admin:</strong> {deployResult.adminUrl}
                        </p>
                        <p className="text-sm text-blue-800">
                          <strong>Email:</strong> {deployResult.credentials.email}
                        </p>
                        <p className="text-sm text-blue-800">
                          <strong>Mot de passe:</strong> {deployResult.credentials.password}
                        </p>
                        <p className="text-xs text-blue-600 mt-2">
                          ⚠️ Sauvegardez ces informations, elles ne seront plus affichées !
                        </p>
                      </div>
                    )}

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
      {showDNSInstructions && customDomain && deployResult?.dnsInstructions && (
        <DNSInstructionsModal
          domain={customDomain}
          siteName={siteName}
          dnsConfig={deployResult.dnsInstructions}
          onClose={() => setShowDNSInstructions(false)}
        />
      )}
    </div>
  );
}
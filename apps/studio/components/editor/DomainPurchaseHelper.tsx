'use client';

import { useState } from 'react';
import { GlobeAltIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface DomainPurchaseHelperProps {
  siteName: string;
  onDomainSelected?: (domain: string) => void;
}

export function DomainPurchaseHelper({ siteName, onDomainSelected }: DomainPurchaseHelperProps) {
  const [showHelper, setShowHelper] = useState(false);
  const [purchaseMethod, setPurchaseMethod] = useState<'now' | 'later' | null>(null);
  const [desiredDomain, setDesiredDomain] = useState('');

  const temporaryUrl = `https://${siteName}.netlify.app`;

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <GlobeAltIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Configuration du domaine
          </h3>
          
          {!showHelper ? (
            <>
              <p className="text-sm text-blue-700 mb-3">
                Votre site sera d'abord accessible sur : <code className="bg-blue-100 px-1 py-0.5 rounded">{temporaryUrl}</code>
              </p>
              <button
                onClick={() => setShowHelper(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Comment obtenir mon propre domaine ?
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-blue-700">
                Choisissez quand acheter votre domaine :
              </p>
              
              <div className="space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="purchase-time"
                    value="later"
                    onChange={() => setPurchaseMethod('later')}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-blue-900">
                      Acheter plus tard (Recommandé)
                    </span>
                    <p className="text-xs text-blue-600">
                      Testez d'abord votre site, puis ajoutez un domaine
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="purchase-time"
                    value="now"
                    onChange={() => setPurchaseMethod('now')}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-blue-900">
                      J'ai déjà un domaine ou je veux l'acheter maintenant
                    </span>
                    <p className="text-xs text-blue-600">
                      Configurez-le après le déploiement
                    </p>
                  </div>
                </label>
              </div>

              {purchaseMethod === 'later' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-start space-x-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Excellente approche !
                      </p>
                      <ul className="text-xs text-green-700 mt-1 space-y-1">
                        <li>✓ Votre site s'adaptera automatiquement au domaine</li>
                        <li>✓ Tous les liens fonctionneront correctement</li>
                        <li>✓ Guide d'achat inclus dans votre export</li>
                        <li>✓ Configuration DNS générée automatiquement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {purchaseMethod === 'now' && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-1">
                      Quel domaine souhaitez-vous utiliser ?
                    </label>
                    <input
                      type="text"
                      value={desiredDomain}
                      onChange={(e) => {
                        setDesiredDomain(e.target.value);
                        onDomainSelected?.(e.target.value);
                      }}
                      placeholder="www.mon-entreprise.fr"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-start space-x-2">
                      <InformationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <div className="text-xs text-yellow-700">
                        <p className="font-medium mb-1">Options d'achat :</p>
                        <ul className="space-y-1">
                          <li>• <strong>Via Netlify</strong> : 15€/an, configuration automatique</li>
                          <li>• <strong>Via Gandi/OVH</strong> : 10-15€/an, configuration manuelle</li>
                          <li>• Instructions détaillées dans DNS-CONFIGURATION.md</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowHelper(false);
                  setPurchaseMethod(null);
                }}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                ← Retour
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Composant pour afficher le statut du domaine après déploiement
 */
export function DomainStatusDisplay({ 
  temporaryUrl, 
  customDomain, 
  isConfigured 
}: { 
  temporaryUrl: string; 
  customDomain?: string; 
  isConfigured?: boolean;
}) {
  return (
    <div className="space-y-3">
      {/* URL temporaire toujours accessible */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded">
        <p className="text-sm font-medium text-gray-700">
          URL temporaire (toujours accessible)
        </p>
        <a
          href={temporaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          {temporaryUrl} →
        </a>
      </div>

      {/* Domaine personnalisé si configuré */}
      {customDomain && (
        <div className={`p-3 border rounded ${
          isConfigured 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <p className="text-sm font-medium text-gray-700">
            Domaine personnalisé
          </p>
          <p className="text-sm text-gray-600">
            {customDomain}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isConfigured 
              ? '✓ Configuration DNS active' 
              : '⏳ En attente de configuration DNS (voir instructions)'}
          </p>
        </div>
      )}

      {/* Message sur l'adaptation automatique */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-xs text-blue-700">
          <strong>💡 Info :</strong> Votre site s'adapte automatiquement au domaine utilisé. 
          Tous les liens fonctionneront correctement, que vous utilisiez l'URL temporaire ou votre domaine personnalisé.
        </p>
      </div>
    </div>
  );
}
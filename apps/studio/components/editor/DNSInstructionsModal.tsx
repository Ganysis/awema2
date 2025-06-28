'use client';

import { useState } from 'react';
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

interface DNSInstructionsModalProps {
  domain: string;
  siteName: string;
  dnsConfig?: any;
  onClose: () => void;
}

export function DNSInstructionsModal({ domain, siteName, dnsConfig, onClose }: DNSInstructionsModalProps) {
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);
  const [selectedRegistrar, setSelectedRegistrar] = useState<string>('general');

  const handleCopy = (text: string, recordId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(recordId);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  // Générer la configuration DNS si elle n'est pas fournie
  const config = dnsConfig || generateBasicDNSConfig(domain, siteName);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Configuration DNS pour {domain}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Suivez ces instructions pour connecter votre domaine
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Sélecteur de registrar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choisissez votre hébergeur de domaine
            </label>
            <select
              value={selectedRegistrar}
              onChange={(e) => setSelectedRegistrar(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">Instructions générales</option>
              <option value="ovh">OVH</option>
              <option value="gandi">Gandi</option>
              <option value="ionos">1&1 IONOS</option>
              <option value="godaddy">GoDaddy</option>
            </select>
          </div>

          {/* Tableau des enregistrements DNS */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Enregistrements DNS à configurer
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valeur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TTL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {config.records.map((record: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          record.type === 'A' ? 'bg-blue-100 text-blue-800' :
                          record.type === 'CNAME' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {record.value}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.ttl || 3600}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleCopy(record.value, `record-${index}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {copiedRecord === `record-${index}` ? (
                            <CheckIcon className="w-5 h-5" />
                          ) : (
                            <ClipboardDocumentIcon className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Instructions spécifiques */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Instructions pour {selectedRegistrar === 'general' ? 'votre hébergeur' : getRegistrarName(selectedRegistrar)}
            </h3>
            
            {selectedRegistrar === 'general' ? (
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Connectez-vous à votre gestionnaire de domaine (registrar)</li>
                <li>Accédez à la gestion DNS du domaine {domain}</li>
                <li>Ajoutez les enregistrements DNS listés dans le tableau ci-dessus</li>
                <li>Sauvegardez les modifications</li>
                <li>Attendez la propagation DNS (5 minutes à 48 heures)</li>
              </ol>
            ) : (
              <div className="space-y-4">
                {getRegistrarInstructions(selectedRegistrar, config, siteName)}
              </div>
            )}
          </div>

          {/* Notes importantes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              ⚠️ Notes importantes
            </h4>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• La propagation DNS peut prendre de 5 minutes à 48 heures</li>
              <li>• Pendant cette période, votre site reste accessible via {siteName}.netlify.app</li>
              <li>• Une fois la propagation terminée, Netlify activera automatiquement le SSL (HTTPS)</li>
              <li>• Les instructions DNS ont été ajoutées à votre site dans le fichier DNS-CONFIGURATION.md</li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              🔍 Outils de vérification
            </h4>
            <div className="space-y-2">
              <a
                href="https://dnschecker.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline block"
              >
                DNS Checker - Vérifier la propagation DNS mondiale →
              </a>
              <a
                href={`https://app.netlify.com/sites/${siteName}/settings/domain`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline block"
              >
                Paramètres de domaine Netlify →
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fonctions utilitaires
function generateBasicDNSConfig(domain: string, siteName: string) {
  const isApex = !domain.startsWith('www.');
  const records = [];

  if (isApex) {
    records.push({
      type: 'A',
      name: '@',
      value: '75.2.60.5',
      ttl: 3600
    });
    records.push({
      type: 'CNAME',
      name: 'www',
      value: `${siteName}.netlify.app`,
      ttl: 3600
    });
  } else {
    records.push({
      type: 'CNAME',
      name: 'www',
      value: `${siteName}.netlify.app`,
      ttl: 3600
    });
  }

  records.push({
    type: 'TXT',
    name: '_netlify',
    value: `${siteName}.netlify.app`,
    ttl: 3600
  });

  return { records };
}

function getRegistrarName(registrar: string): string {
  const names: { [key: string]: string } = {
    ovh: 'OVH',
    gandi: 'Gandi',
    ionos: '1&1 IONOS',
    godaddy: 'GoDaddy'
  };
  return names[registrar] || registrar;
}

function getRegistrarInstructions(registrar: string, config: any, siteName: string) {
  const instructions: { [key: string]: JSX.Element } = {
    ovh: (
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
        <li>Connectez-vous à votre espace client OVH</li>
        <li>Cliquez sur "Domaines" dans le menu</li>
        <li>Sélectionnez votre domaine</li>
        <li>Cliquez sur l'onglet "Zone DNS"</li>
        <li>Cliquez sur "Ajouter une entrée"</li>
        <li>Pour chaque enregistrement dans le tableau :
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Sélectionnez le type d'enregistrement</li>
            <li>Remplissez les champs selon le tableau</li>
            <li>Validez l'ajout</li>
          </ul>
        </li>
        <li>Une fois tous les enregistrements ajoutés, validez les modifications</li>
      </ol>
    ),
    gandi: (
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
        <li>Connectez-vous à votre compte Gandi</li>
        <li>Sélectionnez votre domaine</li>
        <li>Cliquez sur "DNS" dans le menu</li>
        <li>Cliquez sur "Ajouter un enregistrement"</li>
        <li>Ajoutez chaque enregistrement du tableau</li>
        <li>Sauvegardez les modifications</li>
      </ol>
    ),
    ionos: (
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
        <li>Connectez-vous à votre espace client IONOS</li>
        <li>Accédez à "Domaines & SSL"</li>
        <li>Cliquez sur votre domaine</li>
        <li>Sélectionnez "Ajuster les paramètres DNS"</li>
        <li>Créez les enregistrements selon le tableau</li>
        <li>Enregistrez les modifications</li>
      </ol>
    ),
    godaddy: (
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
        <li>Connectez-vous à votre compte GoDaddy</li>
        <li>Accédez à "Mes domaines"</li>
        <li>Cliquez sur "DNS" à côté de votre domaine</li>
        <li>Cliquez sur "Ajouter" pour chaque enregistrement</li>
        <li>Remplissez les champs selon le tableau</li>
        <li>Enregistrez les modifications</li>
      </ol>
    )
  };

  return instructions[registrar] || instructions.ovh;
}
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CheckIcon,
  SparklesIcon,
  CubeIcon,
  SwatchIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  companyName?: string;
  services?: string;
  city?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  preview: string;
}

const templates: Template[] = {
  plumber: {
    id: 'plumber',
    name: 'Plombier',
    description: 'Template optimisé pour les plombiers avec services d\'urgence',
    icon: '🔧',
    preview: '/templates/plumber.jpg'
  },
  electrician: {
    id: 'electrician',
    name: 'Électricien',
    description: 'Design moderne pour électriciens avec portfolio de réalisations',
    icon: '⚡',
    preview: '/templates/electrician.jpg'
  },
  carpenter: {
    id: 'carpenter',
    name: 'Menuisier',
    description: 'Vitrine élégante pour menuisiers et ébénistes',
    icon: '🪵',
    preview: '/templates/carpenter.jpg'
  },
  painter: {
    id: 'painter',
    name: 'Peintre',
    description: 'Portfolio visuel pour peintres en bâtiment',
    icon: '🎨',
    preview: '/templates/painter.jpg'
  },
  tiler: {
    id: 'tiler',
    name: 'Carreleur',
    description: 'Galerie de réalisations pour carreleurs',
    icon: '🏗️',
    preview: '/templates/tiler.jpg'
  },
  mason: {
    id: 'mason',
    name: 'Maçon',
    description: 'Site professionnel pour maçons et constructeurs',
    icon: '🧱',
    preview: '/templates/mason.jpg'
  }
};

const themes = [
  { id: 'minimal', name: 'Minimal', description: 'Design épuré et moderne' },
  { id: 'premium', name: 'Premium', description: 'Design élégant avec animations' },
  { id: 'ultra-pro', name: 'Ultra Pro', description: 'Design avancé avec toutes les fonctionnalités' }
];

export default function NewProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    template: '',
    theme: 'premium',
    domain: '',
    generateContent: true
  });

  useEffect(() => {
    fetchClient();
  }, [params.id]);

  useEffect(() => {
    // Auto-générer le nom du projet
    if (client && !formData.name) {
      setFormData(prev => ({
        ...prev,
        name: `Site ${client.companyName || client.name}`,
        domain: `${(client.companyName || client.name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.fr`
      }));
    }
  }, [client]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/clients/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setClient(data.data);
      } else {
        setError('Client non trouvé');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.template) {
      setError('Veuillez sélectionner un template');
      return;
    }

    setCreating(true);
    setError(null);
    
    try {
      // Créer le projet
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          clientId: params.id,
          template: formData.template,
          domain: formData.domain,
          features: {
            theme: formData.theme,
            generateContent: formData.generateContent
          },
          settings: {
            language: 'fr',
            timezone: 'Europe/Paris'
          }
        }),
      });
      
      const projectData = await projectResponse.json();
      
      if (projectData.success) {
        // Si génération automatique activée
        if (formData.generateContent) {
          // TODO: Appeler l'API de génération de contenu
          console.log('Génération du contenu...');
        }
        
        // Rediriger vers l'éditeur
        router.push(`/editor/${projectData.data.id}`);
      } else {
        setError(projectData.error || 'Erreur lors de la création');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={`/dashboard/clients/${params.id}/projects`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Créer un nouveau projet
                </h1>
                <p className="text-sm text-gray-500">
                  Pour {client?.name} {client?.companyName && `- ${client.companyName}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Step 1: Basic Info */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CubeIcon className="w-5 h-5 mr-2 text-primary-600" />
              Informations du projet
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du projet
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ex: Site Plomberie Dupont"
                />
              </div>
              
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de domaine souhaité
                </label>
                <input
                  type="text"
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="plomberie-dupont.fr"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Optionnel - Vous pourrez le configurer plus tard
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Template Selection */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-primary-600" />
              Choisir un template
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(templates).map((template) => (
                <div
                  key={template.id}
                  onClick={() => setFormData(prev => ({ ...prev, template: template.id }))}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    formData.template === template.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {formData.template === template.id && (
                    <div className="absolute top-2 right-2">
                      <CheckIcon className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  
                  <div className="text-3xl mb-2">{template.icon}</div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Theme Selection */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SwatchIcon className="w-5 h-5 mr-2 text-primary-600" />
              Choisir un thème
            </h2>
            
            <div className="space-y-3">
              {themes.map((theme) => (
                <label
                  key={theme.id}
                  className={`relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.theme === theme.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme.id}
                    checked={formData.theme === theme.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>
                  {formData.theme === theme.id && (
                    <CheckIcon className="w-5 h-5 text-primary-600 ml-3" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Options */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <RocketLaunchIcon className="w-5 h-5 mr-2 text-primary-600" />
              Options de création
            </h2>
            
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={formData.generateContent}
                onChange={(e) => setFormData(prev => ({ ...prev, generateContent: e.target.checked }))}
                className="mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-3">
                <span className="font-medium text-gray-900">
                  Générer automatiquement le contenu
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Créer automatiquement les pages et le contenu basé sur les informations du client
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link
              href={`/dashboard/clients/${params.id}/projects`}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={creating || !formData.template}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {creating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Création...
                </>
              ) : (
                <>
                  <RocketLaunchIcon className="w-4 h-4 mr-2" />
                  Créer le projet
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
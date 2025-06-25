'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  GlobeAltIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  DocumentDuplicateIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  name: string;
  slug: string;
  template: string;
  status: string;
  domain?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface Client {
  id: string;
  name: string;
  companyName?: string;
}

export default function ClientProjectsPage() {
  const params = useParams();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      // Récupérer les infos du client
      const clientResponse = await fetch(`/api/clients/${params.id}`);
      const clientData = await clientResponse.json();
      
      if (clientData.success) {
        setClient(clientData.data);
      }

      // Récupérer les projets du client
      const projectsResponse = await fetch(`/api/projects?clientId=${params.id}`);
      const projectsData = await projectsResponse.json();
      
      if (projectsData.success) {
        setProjects(projectsData.data);
      } else {
        setError(projectsData.error || 'Erreur lors du chargement des projets');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectId));
        setShowDeleteConfirm(null);
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const handleExport = async (projectId: string) => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `site-${projectId}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Erreur lors de l\'export');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'DRAFT':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <ExclamationCircleIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'Publié';
      case 'DRAFT':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const getTemplateLabel = (template: string) => {
    const templates: Record<string, string> = {
      'plumber': 'Plombier',
      'electrician': 'Électricien',
      'carpenter': 'Menuisier',
      'painter': 'Peintre',
      'tiler': 'Carreleur',
      'mason': 'Maçon'
    };
    return templates[template] || template;
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
                href={`/dashboard/clients/${params.id}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Projets de {client?.name}
                </h1>
                {client?.companyName && (
                  <p className="text-sm text-gray-500">{client.companyName}</p>
                )}
              </div>
            </div>
            <Link
              href={`/dashboard/clients/${params.id}/projects/new`}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Nouveau projet
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <GlobeAltIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun projet
            </h2>
            <p className="text-gray-600 mb-6">
              Créez votre premier site web pour ce client
            </p>
            <Link
              href={`/dashboard/clients/${params.id}/projects/new`}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Créer un projet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {getTemplateLabel(project.template)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(project.status)}
                      <span className="ml-2 text-sm text-gray-600">
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                  </div>

                  {project.domain && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 flex items-center">
                        <GlobeAltIcon className="w-4 h-4 mr-1" />
                        {project.domain}
                      </p>
                    </div>
                  )}

                  <div className="text-sm text-gray-500 mb-6">
                    <p>Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}</p>
                    {project.publishedAt && (
                      <p>Publié le {new Date(project.publishedAt).toLocaleDateString('fr-FR')}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/editor/${project.id}`}
                      className="inline-flex items-center justify-center px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <PencilSquareIcon className="w-4 h-4 mr-1" />
                      Éditer
                    </Link>
                    
                    <Link
                      href={`/preview/${project.id}`}
                      target="_blank"
                      className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Prévisualiser
                    </Link>
                    
                    <button
                      onClick={() => handleExport(project.id)}
                      className="inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Exporter
                    </button>
                    
                    <button
                      onClick={() => setShowDeleteConfirm(project.id)}
                      className="inline-flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Supprimer
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                    <button className="text-gray-600 hover:text-gray-900 flex items-center">
                      <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                      Dupliquer
                    </button>
                    {project.status === 'DRAFT' && (
                      <button className="text-primary-600 hover:text-primary-900 flex items-center">
                        <RocketLaunchIcon className="w-4 h-4 mr-1" />
                        Publier
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
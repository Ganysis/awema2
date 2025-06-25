'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { EditorWithSave } from '@/components/editor/EditorWithSave';

interface Project {
  id: string;
  name: string;
  template: string;
  features?: {
    theme?: string;
  };
  client?: {
    id: string;
    name: string;
    companyName?: string;
  };
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [params.projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.projectId}`);
      const data = await response.json();
      
      if (data.success) {
        setProject(data.data);
      } else {
        setError('Projet non trouvé');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'éditeur...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Projet non trouvé'}</p>
          <Link href="/dashboard" className="text-primary-600 hover:underline">
            Retour au dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={project.client ? `/dashboard/clients/${project.client.id}/projects` : '/dashboard'}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {project.name}
                </h1>
                {project.client && (
                  <p className="text-sm text-gray-500">
                    {project.client.name} {project.client.companyName && `- ${project.client.companyName}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="flex-1">
        <EditorWithSave 
          projectId={project.id}
          template={project.template}
          theme={project.features?.theme || 'premium'}
        />
      </div>
    </div>
  );
}
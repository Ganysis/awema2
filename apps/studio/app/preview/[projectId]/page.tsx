'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  data?: any;
}

export default function PreviewPage() {
  const params = useParams();
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
          <p className="mt-4 text-gray-600">Chargement de la prévisualisation...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Projet non trouvé'}</p>
        </div>
      </div>
    );
  }

  // TODO: Implémenter la vraie prévisualisation avec le rendu du site
  return (
    <div className="min-h-screen bg-white">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Prévisualisation : {project.name}</h1>
        <p className="text-gray-600">La prévisualisation complète sera bientôt disponible</p>
      </div>
    </div>
  );
}
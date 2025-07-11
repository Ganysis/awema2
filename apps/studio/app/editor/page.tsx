'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditorPage() {
  const router = useRouter();

  useEffect(() => {
    // Créer un projet temporaire et rediriger
    const createTempProject = async () => {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Nouveau Projet',
            template: 'custom',
            features: {
              theme: 'premium'
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          router.push(`/editor/${data.data.id}`);
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        router.push('/dashboard');
      }
    };

    createTempProject();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Création du projet...</p>
      </div>
    </div>
  );
}
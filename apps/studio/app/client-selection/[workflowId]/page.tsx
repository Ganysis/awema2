'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { MockupComparison } from '@/components/client/MockupComparison';
import { WorkflowData, MockupData, SelectionResponse } from '@/types/client-selection.types';

interface ClientSelectionPageProps {
  params: {
    workflowId: string;
  };
  searchParams?: {
    token?: string;
  };
}

export default function ClientSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const workflowId = params?.workflowId as string;

  const [workflowData, setWorkflowData] = useState<WorkflowData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMockup, setSelectedMockup] = useState<MockupData | null>(null);

  useEffect(() => {
    if (workflowId) {
      loadWorkflowData();
    }
  }, [workflowId]);

  const loadWorkflowData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/client/workflow/${workflowId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des données');
      }

      if (!data.data) {
        throw new Error('Aucune donnée trouvée pour ce workflow');
      }

      setWorkflowData(data.data);

      // Vérification des mockups
      if (!data.data.mockups || data.data.mockups.length === 0) {
        throw new Error('Aucun mockup disponible pour ce workflow');
      }

      // Vérification de l'expiration
      if (new Date() > new Date(data.data.expiresAt)) {
        throw new Error('Ce lien a expiré. Veuillez contacter votre prestataire.');
      }

      // Vérification du statut
      if (data.data.status === 'chosen') {
        setError('Un design a déjà été sélectionné pour ce projet.');
      }

    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockupSelection = async (mockup: MockupData): Promise<void> => {
    try {
      setSelectedMockup(mockup);

      const response = await fetch('/api/client/selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId,
          selectedTemplate: mockup.variant,
          mockupId: mockup.id,
          clientInfo: {
            userAgent: navigator.userAgent,
            device: getDeviceType(),
            timestamp: new Date().toISOString()
          }
        }),
      });

      const data: SelectionResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la sélection');
      }

      // Notification de succès
      toast.success('Votre choix a été confirmé avec succès !', {
        duration: 3000,
        position: 'top-center',
        icon: '🎉'
      });

      // Redirection vers la page de remerciement après un délai
      setTimeout(() => {
        router.push(`/client-selection/${workflowId}/thank-you?template=${mockup.variant}`);
      }, 2000);

    } catch (err) {
      console.error('Erreur lors de la sélection:', err);
      toast.error(
        err instanceof Error ? err.message : 'Une erreur est survenue lors de la sélection',
        {
          duration: 5000,
          position: 'top-center'
        }
      );
    }
  };

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Chargement de vos mockups...
          </h2>
          <p className="text-gray-600">
            Préparation de votre sélection personnalisée
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="max-w-md text-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Problème de chargement
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={loadWorkflowData}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Réessayer
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {workflowData?.clientName}
                </h1>
                <p className="text-sm text-gray-500">
                  Sélection de votre site web
                </p>
              </div>
            </div>

            {/* Project Info */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V4m8 0H8m0 0v2m0 0V6m0 0v6m0 0v6" />
                </svg>
                <span>{workflowData?.businessType}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Expire le {new Date(workflowData?.expiresAt || '').toLocaleDateString('fr-FR')}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {workflowData?.mockups && (
          <MockupComparison
            mockups={workflowData.mockups}
            workflowId={workflowId}
            onSelection={handleMockupSelection}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Une question ? Contactez-nous à{' '}
              <a href="mailto:support@awema.fr" className="text-blue-600 hover:text-blue-800">
                support@awema.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
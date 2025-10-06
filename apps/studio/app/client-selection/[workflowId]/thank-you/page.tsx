'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { TemplateVariant } from '@/types/client-selection.types';

export default function ThankYouPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const workflowId = params?.workflowId as string;
  const selectedTemplate = searchParams?.get('template') as TemplateVariant;

  const [countdown, setCountdown] = useState(10);
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    // Récupérer les infos client si possible
    const loadClientInfo = async () => {
      try {
        const response = await fetch(`/api/client/workflow/${workflowId}`);
        if (response.ok) {
          const data = await response.json();
          setClientName(data.data?.clientName || '');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des infos client:', error);
      }
    };

    loadClientInfo();
  }, [workflowId]);

  useEffect(() => {
    // Countdown et redirection automatique
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const templateInfo = {
    sydney: {
      name: 'Sydney',
      description: 'Design moderne et épuré',
      color: 'from-blue-600 to-cyan-600'
    },
    locomotive: {
      name: 'Locomotive',
      description: 'Style industriel et robuste',
      color: 'from-gray-700 to-gray-900'
    },
    nextspace: {
      name: 'NextSpace',
      description: 'Futuriste et innovant',
      color: 'from-purple-600 to-pink-600'
    }
  };

  const template = selectedTemplate ? templateInfo[selectedTemplate] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Merci {clientName && `${clientName} `}! 🎉
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Votre choix a été enregistré avec succès
        </p>

        {/* Selected Template Info */}
        {template && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Design {template.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {template.description}
            </p>

            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-800 font-medium">
                ✅ Votre sélection a été transmise à notre équipe
              </p>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Prochaines étapes
          </h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Personnalisation du contenu</h4>
                <p className="text-sm text-gray-600">Nous allons enrichir votre site avec du contenu adapté à votre secteur d'activité</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Optimisation SEO</h4>
                <p className="text-sm text-gray-600">Configuration des mots-clés et optimisations pour les moteurs de recherche</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Livraison</h4>
                <p className="text-sm text-gray-600">Réception du lien de votre site web finalisé sous 24-48h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timing */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 text-yellow-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Délai estimé : 24-48 heures</span>
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            Vous recevrez une notification par email dès que votre site sera prêt
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Une question ? N'hésitez pas à nous contacter :
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <a
              href="mailto:support@awema.fr"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@awema.fr</span>
            </a>
            <a
              href="tel:+33123456789"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>01 23 45 67 89</span>
            </a>
          </div>
        </div>

        {/* Auto-redirect Notice */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            Redirection automatique dans {countdown} seconde{countdown !== 1 ? 's' : ''}...
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Retourner à l'accueil maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
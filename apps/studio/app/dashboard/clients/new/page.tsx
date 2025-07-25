'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CheckIcon,
  ExclamationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { ClientFormUltra } from '@/components/forms/client-form-ultra';
import { ClientFormUltra as ClientFormUltraType } from '@/types/client-form-ultra';

export default function NewClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: Partial<ClientFormUltraType>) => {
    setSaving(true);
    setError(null);
    
    try {
      // Créer le client dans la base
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Mapper les données du formulaire ultra vers le format API
          name: formData.businessName || '',
          email: formData.email || '',
          phone: formData.phone || '',
          companyName: formData.businessName || '',
          businessType: formData.businessType,
          status: 'ACTIVE',
          // Stocker toutes les données ultra dans un champ JSON
          ultraFormData: formData
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        
        // Créer automatiquement une proposition de template
        const proposalResponse = await fetch('/api/admin/template-proposals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId: data.data.id,
            formData: formData
          }),
        });
        
        const proposalData = await proposalResponse.json();
        
        // Rediriger vers la page de propositions
        setTimeout(() => {
          if (proposalData.success) {
            router.push('/admin/proposals');
          } else {
            router.push(`/dashboard/clients/${data.data.id}`);
          }
        }, 1500);
      } else {
        setError(data.error || 'Erreur lors de la création');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/clients"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Nouveau Client
                </h1>
                <p className="text-sm text-gray-500">
                  Formulaire ultra-complet avec génération IA
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
              <SparklesIcon className="w-4 h-4" />
              <span>100+ champs disponibles</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {/* Alerts */}
        {error && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <ExclamationCircleIcon className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Client créé avec succès !
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Génération des templates personnalisés en cours...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <SparklesIcon className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Nouveau formulaire ultra-complet
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Ce formulaire collecte un maximum d'informations pour permettre à l'IA de générer 
                    des sites web vraiment personnalisés. Plus vous remplissez de champs, plus le résultat 
                    sera pertinent et unique.
                  </p>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>14 sections thématiques</li>
                    <li>Upload de photos (projets, équipe, certifications)</li>
                    <li>Champs conditionnels selon le métier</li>
                    <li>Suggestions intelligentes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Component */}
        <ClientFormUltra
          onSubmit={handleSubmit}
          mode="create"
        />
      </main>
    </div>
  );
}
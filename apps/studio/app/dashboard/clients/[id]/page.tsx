'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  TagIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface ClientDetail {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  website?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  siret?: string;
  vatNumber?: string;
  status: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    projects: number;
    leads: number;
  };
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchClient();
  }, [params.id]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/clients/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        // S'assurer que tags est toujours un tableau
        const clientData = {
          ...data.data,
          tags: Array.isArray(data.data.tags) ? data.data.tags : []
        };
        setClient(clientData);
      } else {
        setError(data.error || 'Erreur lors du chargement');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/clients/${params.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'INACTIVE':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Actif';
      case 'INACTIVE':
        return 'Inactif';
      case 'SUSPENDED':
        return 'Suspendu';
      default:
        return status;
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

  if (error || !client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Client non trouvé'}</p>
          <Link href="/dashboard" className="text-primary-600 hover:underline">
            Retour au dashboard
          </Link>
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
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Détails du client
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/dashboard/clients/${client.id}/projects`}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <GlobeAltIcon className="w-4 h-4 mr-2" />
                Projets
              </Link>
              <Link
                href={`/dashboard/clients/${client.id}/edit`}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Modifier
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Client Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{client.name}</h2>
                {client.companyName && (
                  <p className="text-primary-100 mt-1 text-lg">{client.companyName}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(client.status)}
                <span className="text-lg">{getStatusLabel(client.status)}</span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Informations de contact
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <EnvelopeIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <a href={`mailto:${client.email}`} className="hover:text-primary-600">
                      {client.email}
                    </a>
                  </div>
                  
                  {client.phone && (
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="w-5 h-5 mr-3 text-gray-400" />
                      <a href={`tel:${client.phone}`} className="hover:text-primary-600">
                        {client.phone}
                      </a>
                    </div>
                  )}
                  
                  {client.website && (
                    <div className="flex items-center text-gray-600">
                      <GlobeAltIcon className="w-5 h-5 mr-3 text-gray-400" />
                      <a 
                        href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-600"
                      >
                        {client.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Adresse
                </h3>
                
                <div className="space-y-3">
                  {(client.address || client.city || client.postalCode) ? (
                    <div className="flex items-start text-gray-600">
                      <MapPinIcon className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        {client.address && <p>{client.address}</p>}
                        {(client.postalCode || client.city) && (
                          <p>{client.postalCode} {client.city}</p>
                        )}
                        {client.country && <p>{client.country}</p>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">Aucune adresse renseignée</p>
                  )}
                </div>
              </div>

              {/* Business Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Informations entreprise
                </h3>
                
                <div className="space-y-3">
                  {client.siret && (
                    <div className="flex items-center text-gray-600">
                      <BuildingOfficeIcon className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">SIRET</p>
                        <p>{client.siret}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.vatNumber && (
                    <div className="ml-8">
                      <p className="text-sm text-gray-500">TVA</p>
                      <p className="text-gray-600">{client.vatNumber}</p>
                    </div>
                  )}
                  
                  {!client.siret && !client.vatNumber && (
                    <p className="text-gray-400 italic">Aucune information entreprise</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Statistiques
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    href={`/dashboard/clients/${client.id}/projects`}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-3xl font-bold text-primary-600">
                      {client._count?.projects || 0}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Projets</p>
                  </Link>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {client._count?.leads || 0}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Leads</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {client.tags && Array.isArray(client.tags) && client.tags.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                    >
                      <TagIcon className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {client.notes && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Notes
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{client.notes}</p>
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="mt-6 pt-6 border-t flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Créé le {new Date(client.createdAt).toLocaleDateString('fr-FR')}
              </div>
              <div>
                Modifié le {new Date(client.updatedAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
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
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  SparklesIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  businessType?: string;
  city?: string;
  status: string;
  projectsCount: number;
  lastActivity?: string;
  createdAt: string;
  hasUltraForm?: boolean;
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [filterStatus]);

  const fetchClients = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      
      const response = await fetch(`/api/clients?${params}`);
      const data = await response.json();
      
      if (data.success) {
        // Marquer les clients qui ont des données ultra
        const clientsWithUltraFlag = data.data.items.map((client: any) => ({
          ...client,
          hasUltraForm: !!client.ultraFormData
        }));
        setClients(clientsWithUltraFlag);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'INACTIVE':
        return <XCircleIcon className="w-5 h-5 text-gray-400" />;
      case 'SUSPENDED':
        return <ClockIcon className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Actif';
      case 'INACTIVE': return 'Inactif';
      case 'SUSPENDED': return 'Suspendu';
      default: return status;
    }
  };

  const getBusinessTypeLabel = (type?: string) => {
    if (!type) return null;
    const types: Record<string, string> = {
      plombier: '🔧 Plombier',
      electricien: '⚡ Électricien',
      menuisier: '🪵 Menuisier',
      jardinier: '🌱 Jardinier',
      carreleur: '🏠 Carreleur',
      peintre: '🎨 Peintre',
      macon: '🧱 Maçon',
      couvreur: '🏗️ Couvreur',
      serrurier: '🔑 Serrurier',
      chauffagiste: '🔥 Chauffagiste'
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <UserGroupIcon className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
                <p className="text-sm text-gray-500">
                  {clients.length} client{clients.length > 1 ? 's' : ''} au total
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/proposals"
                className="flex items-center space-x-2 px-4 py-2 text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>Propositions IA</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              
              <Link
                href="/dashboard/clients/new"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Nouveau client</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>Filtres</span>
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterStatus === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilterStatus('ACTIVE')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterStatus === 'ACTIVE'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Actifs
                </button>
                <button
                  onClick={() => setFilterStatus('INACTIVE')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterStatus === 'INACTIVE'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inactifs
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="ml-3 text-gray-600">Chargement des clients...</p>
            </div>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Aucun client trouvé' : 'Aucun client pour le moment'}
            </p>
            <Link
              href="/dashboard/clients/new"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Créer votre premier client</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entreprise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projets
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                          {client.phone && (
                            <div className="text-sm text-gray-500">{client.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          {client.companyName && (
                            <div className="flex items-center space-x-2">
                              <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {client.companyName}
                              </span>
                            </div>
                          )}
                          {client.businessType && (
                            <div className="text-sm text-gray-600 mt-1">
                              {getBusinessTypeLabel(client.businessType)}
                            </div>
                          )}
                          {client.city && (
                            <div className="text-sm text-gray-500">{client.city}</div>
                          )}
                          {client.hasUltraForm && (
                            <div className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                              <SparklesIcon className="w-3 h-3" />
                              <span>Formulaire Ultra</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {client.projectsCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(client.status)}
                          <span className="text-sm text-gray-900">
                            {getStatusLabel(client.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/dashboard/clients/${client.id}`}
                          className="text-primary-600 hover:text-primary-900"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
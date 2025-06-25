'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  EyeIcon
} from '@heroicons/react/24/outline';


interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  companyName?: string;
  tags: string[];
  _count?: {
    projects: number;
    leads: number;
  };
}

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/clients');
      
      // Debug: log raw response
      const text = await response.text();
      console.log('Raw API response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        console.error('Raw text that failed to parse:', text);
        return;
      }
      
      if (data.success) {
        console.log('Clients data:', data.data);
        setClients(data.data);
      } else {
        console.error('Failed to fetch clients:', data.error);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (client.city?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                         (client.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesStatus = !filterStatus || client.status === filterStatus;
    const matchesType = !filterType || (client.tags?.includes(filterType) || false);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Dashboard AWEMA
            </h1>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Nouveau Client
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Clients</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{clients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Clients Actifs</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {clients.filter(c => c.status === 'ACTIVE').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Projets</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {clients.reduce((sum, c) => sum + (c._count?.projects || 0), 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Leads</p>
            <p className="text-3xl font-bold text-primary-600 mt-2">
              {clients.reduce((sum, c) => sum + (c._count?.leads || 0), 0)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher par nom ou ville..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus || ''}
                onChange={(e) => setFilterStatus(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Tous les statuts</option>
                <option value="ACTIVE">Actif</option>
                <option value="INACTIVE">Inactif</option>
                <option value="SUSPENDED">Suspendu</option>
              </select>
              
              {/* Temporarily hide type filter until we have proper tag management */}
              {/*<select
                value={filterType || ''}
                onChange={(e) => setFilterType(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Tous les métiers</option>
                <option value="electricien">Électricien</option>
                <option value="plombier">Plombier</option>
                <option value="menuisier">Menuisier</option>
                <option value="macon">Maçon</option>
                <option value="peintre">Peintre</option>
              </select>*/}
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Chargement des clients...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {clients.length === 0 ? 'Aucun client trouvé.' : 'Aucun client ne correspond à vos critères de recherche.'}
              </p>
              {clients.length === 0 && (
                <Link
                  href="/dashboard/new"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Créer votre premier client
                </Link>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projets / Leads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière modification
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => {
                  const statusColor = client.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                                     client.status === 'INACTIVE' ? 'bg-gray-100 text-gray-800' : 
                                     'bg-red-100 text-red-800';
                  const statusLabel = client.status === 'ACTIVE' ? 'Actif' : 
                                     client.status === 'INACTIVE' ? 'Inactif' : 
                                     'Suspendu';
                  
                  return (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.companyName || 'Particulier'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="text-sm text-gray-500">
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span>{client._count?.projects || 0} projets</span>
                          <span className="text-gray-500 ml-2">{client._count?.leads || 0} leads</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.updatedAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/clients/${client.id}`}
                            className="text-primary-600 hover:text-primary-900"
                            title="Voir détails"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </Link>
                          <Link
                            href={`/dashboard/clients/${client.id}/edit`}
                            className="text-gray-600 hover:text-gray-900"
                            title="Éditer"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </Link>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Dupliquer"
                          >
                            <DocumentDuplicateIcon className="w-5 h-5" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Exporter"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
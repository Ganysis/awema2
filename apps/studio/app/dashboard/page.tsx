'use client';

import { useState } from 'react';
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

// Mock data for now - will be replaced with real database
const mockClients = [
  {
    id: '1',
    businessName: 'Électricité Durand',
    businessType: 'electricien',
    status: 'published',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    city: 'Paris',
    leadCount: 12
  },
  {
    id: '2', 
    businessName: 'Plomberie Martin',
    businessType: 'plombier',
    status: 'draft',
    createdAt: '2024-01-18',
    lastModified: '2024-01-19',
    city: 'Lyon',
    leadCount: 0
  },
  {
    id: '3',
    businessName: 'Menuiserie Lebois',
    businessType: 'menuisier',
    status: 'review',
    createdAt: '2024-01-10',
    lastModified: '2024-01-22',
    city: 'Marseille',
    leadCount: 5
  }
];

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  review: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  maintenance: 'bg-orange-100 text-orange-800'
};

const statusLabels: Record<string, string> = {
  draft: 'Brouillon',
  review: 'En révision',
  published: 'Publié',
  maintenance: 'Maintenance'
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || client.status === filterStatus;
    const matchesType = !filterType || client.businessType === filterType;
    
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
            <p className="text-3xl font-bold text-gray-900 mt-2">{mockClients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Sites Publiés</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {mockClients.filter(c => c.status === 'published').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">En Cours</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {mockClients.filter(c => c.status === 'draft' || c.status === 'review').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Leads</p>
            <p className="text-3xl font-bold text-primary-600 mt-2">
              {mockClients.reduce((sum, c) => sum + c.leadCount, 0)}
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
                <option value="draft">Brouillon</option>
                <option value="review">En révision</option>
                <option value="published">Publié</option>
                <option value="maintenance">Maintenance</option>
              </select>
              
              <select
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
              </select>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Métier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads
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
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {client.businessName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.city}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">
                      {client.businessType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
                      {statusLabels[client.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {client.leadCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.lastModified).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/?clientId=${client.id}`}
                        className="text-primary-600 hover:text-primary-900"
                        title="Éditer"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/?clientId=${client.id}&preview=true`}
                        className="text-gray-600 hover:text-gray-900"
                        title="Preview"
                      >
                        <EyeIcon className="w-5 h-5" />
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
                      {client.status === 'published' && (
                        <a
                          href={`https://${client.businessName.toLowerCase().replace(/\s+/g, '-')}.awema.fr`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900"
                          title="Voir le site"
                        >
                          <GlobeAltIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
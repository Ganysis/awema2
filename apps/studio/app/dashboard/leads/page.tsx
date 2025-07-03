'use client';

import { useState, useEffect } from 'react';
import { 
  BuildingOfficeIcon as Building2, 
  EnvelopeIcon as Mail, 
  PhoneIcon as Phone, 
  MapPinIcon as MapPin, 
  CalendarIcon as Calendar, 
  ArrowTopRightOnSquareIcon as ExternalLink, 
  FunnelIcon as Filter, 
  ArrowDownTrayIcon as Download, 
  MagnifyingGlassIcon as Search 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  source?: string;
  project?: {
    id: string;
    name: string;
  };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLeads();
  }, [page, filter, searchTerm]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(filter !== 'all' && { status: filter }),
      });

      const response = await fetch(`/api/leads?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLeads(result.data);
          setTotalPages(result.pagination.pages);
        }
      } else if (response.status === 401) {
        // En mode dev, on ignore l'erreur d'auth
        console.warn('Authentication error - using mock data in dev mode');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status } : lead
        ));
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const exportLeads = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Company', 'Message', 'Status', 'Date'],
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.message || '',
        lead.status,
        new Date(lead.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter;
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    converted: 'bg-green-100 text-green-800'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Suivi des Leads</h1>
          <p className="text-gray-600">Pipeline de conversion - Du prospect au client</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Leads</div>
            <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Nouveaux</div>
            <div className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.status === 'new').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Qualifiés</div>
            <div className="text-2xl font-bold text-purple-600">
              {leads.filter(l => l.status === 'qualified').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">Convertis</div>
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'converted').length}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="new">Nouveaux</option>
                <option value="contacted">Contactés</option>
                <option value="qualified">Qualifiés</option>
                <option value="converted">Convertis</option>
              </select>
              <button
                onClick={exportLeads}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exporter CSV
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entreprise
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{lead.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {lead.message || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[lead.status]}`}
                      >
                        <option value="new">Nouveau</option>
                        <option value="contacted">Contacté</option>
                        <option value="qualified">Qualifié</option>
                        <option value="converted">Converti</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {lead.project && (
                        <Link
                          href={`/dashboard/projects/${lead.project.id}`}
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          Voir projet
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun lead trouvé</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
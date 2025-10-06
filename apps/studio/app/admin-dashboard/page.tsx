'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { WorkflowKanban } from '@/components/admin/WorkflowKanban';
import { WorkflowStats } from '@/components/admin/WorkflowStats';
import { WorkflowTable } from '@/components/admin/WorkflowTable';
import { WorkflowConnectionStatus } from '@/components/admin/WorkflowConnectionStatus';
import { useWorkflowStore } from '@/lib/stores/workflow.store';
import { useWorkflowRealtimeUpdates } from '@/lib/hooks/useWorkflowWebSocket';
import { WorkflowStatus, WorkflowFilters, BUSINESS_TYPES } from '@/lib/types/workflow.types';
import { Search, Filter, RefreshCw, Download, Plus, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const {
    workflows,
    stats,
    filters,
    loading,
    error,
    fetchWorkflows,
    updateFilters,
    refreshData,
    exportData,
    updateWorkflowStatus,
    executeWorkflowAction
  } = useWorkflowStore();

  // WebSocket pour les mises à jour temps réel
  const {
    isConnected,
    reconnect,
    requestStats
  } = useWorkflowRealtimeUpdates();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  useEffect(() => {
    const newFilters: WorkflowFilters = {
      search: searchQuery || undefined,
      status: selectedStatus === 'all' ? undefined : selectedStatus as WorkflowStatus,
      businessType: selectedBusinessType === 'all' ? undefined : selectedBusinessType
    };
    updateFilters(newFilters);
  }, [searchQuery, selectedStatus, selectedBusinessType, updateFilters]);

  const handleRefresh = async () => {
    try {
      await refreshData();
      toast.success('Données actualisées');
    } catch (error) {
      toast.error('Erreur lors de l\'actualisation');
    }
  };

  const handleExport = async () => {
    try {
      await exportData();
      toast.success('Export en cours...');
    } catch (error) {
      toast.error('Erreur lors de l\'export');
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Erreur</h2>
          <p className="text-red-600">{error}</p>
          <Button onClick={handleRefresh} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500 mt-1">Gestion des workflows clients</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Indicateur de connexion temps réel */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs">
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3 text-green-500" />
                <span className="text-green-600">Temps réel</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-red-500" />
                <span className="text-red-600">Hors ligne</span>
                <Button variant="ghost" size="sm" onClick={reconnect} className="ml-1 p-1">
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>

          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
        </div>
      </div>

      {/* Stats */}
      <WorkflowStats stats={stats} loading={loading} />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.values(WorkflowStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Métier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les métiers</SelectItem>
                {BUSINESS_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                Kanban
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Tableau
              </Button>
            </div>
          </div>

          {/* Active filters */}
          <div className="flex items-center space-x-2 mt-4">
            {(searchQuery || selectedStatus !== 'all' || selectedBusinessType !== 'all') && (
              <>
                <span className="text-sm text-gray-500">Filtres actifs:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="text-xs">
                    Recherche: {searchQuery}
                  </Badge>
                )}
                {selectedStatus !== 'all' && (
                  <Badge variant="secondary" className="text-xs">
                    Statut: {selectedStatus}
                  </Badge>
                )}
                {selectedBusinessType !== 'all' && (
                  <Badge variant="secondary" className="text-xs">
                    Métier: {selectedBusinessType}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('all');
                    setSelectedBusinessType('all');
                  }}
                  className="text-xs"
                >
                  Effacer
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="min-h-96">
        {viewMode === 'kanban' ? (
          <WorkflowKanban
            workflows={workflows}
            loading={loading}
            onStatusChange={updateWorkflowStatus}
            onAction={async (workflowId, action) => {
              await executeWorkflowAction(workflowId, { type: action as any });
            }}
          />
        ) : (
          <WorkflowTable
            workflows={workflows}
            loading={loading}
            onAction={async (workflowId, action) => {
              await executeWorkflowAction(workflowId, { type: action as any });
            }}
          />
        )}
      </div>
    </div>
  );
}
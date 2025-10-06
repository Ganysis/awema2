'use client';

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import {
  Workflow,
  WorkflowStats,
  WorkflowFilters,
  WorkflowDashboard,
  WorkflowStatus,
  WorkflowActionPayload
} from '@/lib/types/workflow.types';

interface WorkflowStore extends WorkflowDashboard {
  // Actions
  fetchWorkflows: () => Promise<void>;
  refreshData: () => Promise<void>;
  updateFilters: (filters: Partial<WorkflowFilters>) => void;
  clearFilters: () => void;

  // Workflow actions
  updateWorkflowStatus: (workflowId: string, status: WorkflowStatus) => Promise<void>;
  executeWorkflowAction: (workflowId: string, action: WorkflowActionPayload) => Promise<void>;

  // Bulk actions
  executeBulkAction: (workflowIds: string[], action: string) => Promise<void>;

  // Data management
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (workflowId: string, updates: Partial<Workflow>) => void;
  removeWorkflow: (workflowId: string) => void;

  // Export
  exportData: (format?: 'csv' | 'json') => Promise<void>;

  // WebSocket
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;

  // Utils
  getWorkflowById: (id: string) => Workflow | undefined;
  getWorkflowsByStatus: (status: WorkflowStatus) => Workflow[];
  getFilteredWorkflows: () => Workflow[];
}

// Store initial state
const initialState: Omit<WorkflowDashboard, keyof WorkflowStore> = {
  workflows: [],
  stats: {
    total: 0,
    byStatus: {} as Record<WorkflowStatus, number>,
    avgTimeToChoice: 0,
    conversionRate: 0,
    avgGenerationTime: 0,
    totalRevenue: 0
  },
  filters: {},
  loading: false,
  error: null
};

export const useWorkflowStore = create<WorkflowStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          ...initialState,

          // WebSocket connection
          ws: null as WebSocket | null,

          fetchWorkflows: async () => {
            set({ loading: true, error: null });

            try {
              const { filters } = get();
              const params = new URLSearchParams();

              if (filters.status) params.append('status', filters.status);
              if (filters.businessType) params.append('businessType', filters.businessType);
              if (filters.search) params.append('search', filters.search);
              if (filters.dateRange) {
                params.append('dateFrom', filters.dateRange[0].toISOString());
                params.append('dateTo', filters.dateRange[1].toISOString());
              }

              const response = await fetch(`/api/admin/workflows?${params}`);

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              if (data.success) {
                set({
                  workflows: data.data.workflows,
                  stats: data.data.stats,
                  loading: false
                });
              } else {
                throw new Error(data.error || 'Erreur inconnue');
              }

            } catch (error) {
              console.error('Error fetching workflows:', error);
              set({
                error: error instanceof Error ? error.message : 'Erreur lors du chargement',
                loading: false
              });
            }
          },

          refreshData: async () => {
            await get().fetchWorkflows();
          },

          updateFilters: (newFilters) => {
            set((state) => ({
              filters: { ...state.filters, ...newFilters }
            }));
            // Auto-fetch with new filters
            get().fetchWorkflows();
          },

          clearFilters: () => {
            set({ filters: {} });
            get().fetchWorkflows();
          },

          updateWorkflowStatus: async (workflowId, status) => {
            try {
              const response = await fetch(`/api/admin/workflows/${workflowId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  status,
                  actionDescription: `Statut changé vers ${status}`
                })
              });

              if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour');
              }

              const data = await response.json();

              if (data.success) {
                get().updateWorkflow(workflowId, { status, updatedAt: new Date() });
                // Refresh stats
                await get().refreshData();
              }

            } catch (error) {
              console.error('Error updating workflow status:', error);
              throw error;
            }
          },

          executeWorkflowAction: async (workflowId, actionPayload) => {
            try {
              const response = await fetch(`/api/admin/workflows/${workflowId}/actions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  action: actionPayload.type,
                  metadata: actionPayload.metadata
                })
              });

              if (!response.ok) {
                throw new Error('Erreur lors de l\'exécution de l\'action');
              }

              const data = await response.json();

              if (data.success) {
                // Refresh workflow data
                await get().refreshData();
                return data.data;
              }

            } catch (error) {
              console.error('Error executing workflow action:', error);
              throw error;
            }
          },

          executeBulkAction: async (workflowIds, action) => {
            try {
              const promises = workflowIds.map(id =>
                get().executeWorkflowAction(id, { type: action as any })
              );

              await Promise.all(promises);
              await get().refreshData();

            } catch (error) {
              console.error('Error executing bulk action:', error);
              throw error;
            }
          },

          addWorkflow: (workflow) => {
            set((state) => ({
              workflows: [workflow, ...state.workflows]
            }));
          },

          updateWorkflow: (workflowId, updates) => {
            set((state) => ({
              workflows: state.workflows.map(w =>
                w.id === workflowId
                  ? { ...w, ...updates, updatedAt: new Date() }
                  : w
              )
            }));
          },

          removeWorkflow: (workflowId) => {
            set((state) => ({
              workflows: state.workflows.filter(w => w.id !== workflowId)
            }));
          },

          exportData: async (format = 'csv') => {
            try {
              const { workflows } = get();

              if (format === 'csv') {
                const csvContent = generateCSV(workflows);
                downloadFile(csvContent, 'workflows.csv', 'text/csv');
              } else {
                const jsonContent = JSON.stringify(workflows, null, 2);
                downloadFile(jsonContent, 'workflows.json', 'application/json');
              }

            } catch (error) {
              console.error('Error exporting data:', error);
              throw error;
            }
          },

          connectWebSocket: () => {
            if (typeof window === 'undefined') return;

            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsUrl = `${protocol}//${window.location.host}/api/ws/workflows`;

            try {
              const ws = new WebSocket(wsUrl);

              ws.onopen = () => {
                console.log('WebSocket connected');
                set({ ws });
              };

              ws.onmessage = (event) => {
                try {
                  const message = JSON.parse(event.data);
                  handleWebSocketMessage(message, get, set);
                } catch (error) {
                  console.error('Error parsing WebSocket message:', error);
                }
              };

              ws.onclose = () => {
                console.log('WebSocket disconnected');
                set({ ws: null });
                // Reconnect after 5 seconds
                setTimeout(() => get().connectWebSocket(), 5000);
              };

              ws.onerror = (error) => {
                console.error('WebSocket error:', error);
              };

            } catch (error) {
              console.error('Error connecting WebSocket:', error);
            }
          },

          disconnectWebSocket: () => {
            const { ws } = get() as any;
            if (ws) {
              ws.close();
              set({ ws: null });
            }
          },

          getWorkflowById: (id) => {
            return get().workflows.find(w => w.id === id);
          },

          getWorkflowsByStatus: (status) => {
            return get().workflows.filter(w => w.status === status);
          },

          getFilteredWorkflows: () => {
            const { workflows, filters } = get();

            return workflows.filter(workflow => {
              if (filters.status && workflow.status !== filters.status) {
                return false;
              }

              if (filters.businessType && workflow.client.businessType !== filters.businessType) {
                return false;
              }

              if (filters.search) {
                const search = filters.search.toLowerCase();
                const matchesName = workflow.client.name.toLowerCase().includes(search);
                const matchesEmail = workflow.client.email.toLowerCase().includes(search);
                const matchesCity = workflow.client.city.toLowerCase().includes(search);

                if (!matchesName && !matchesEmail && !matchesCity) {
                  return false;
                }
              }

              if (filters.dateRange) {
                const created = new Date(workflow.createdAt);
                const [start, end] = filters.dateRange;

                if (created < start || created > end) {
                  return false;
                }
              }

              return true;
            });
          }
        }),
        {
          name: 'workflow-store',
          partialize: (state) => ({
            filters: state.filters
          })
        }
      )
    ),
    {
      name: 'workflow-store'
    }
  )
);

// Utility functions
function generateCSV(workflows: Workflow[]): string {
  const headers = [
    'ID', 'Client', 'Email', 'Métier', 'Ville', 'Statut',
    'Mockups', 'Créé le', 'Mis à jour'
  ];

  const rows = workflows.map(w => [
    w.id,
    w.client.name,
    w.client.email,
    w.client.businessType,
    w.client.city,
    w.status,
    w.mockups.length.toString(),
    new Date(w.createdAt).toLocaleDateString('fr-FR'),
    new Date(w.updatedAt).toLocaleDateString('fr-FR')
  ]);

  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handleWebSocketMessage(message: any, get: any, set: any) {
  switch (message.type) {
    case 'workflow_updated':
      get().updateWorkflow(message.workflowId, message.updates);
      break;

    case 'workflow_created':
      get().addWorkflow(message.workflow);
      break;

    case 'workflow_deleted':
      get().removeWorkflow(message.workflowId);
      break;

    case 'stats_updated':
      set((state: any) => ({ stats: { ...state.stats, ...message.stats } }));
      break;

    default:
      console.log('Unknown WebSocket message type:', message.type);
  }
}

// Hook for easy component usage
export const useWorkflows = () => {
  const store = useWorkflowStore();

  return {
    workflows: store.getFilteredWorkflows(),
    stats: store.stats,
    loading: store.loading,
    error: store.error,
    filters: store.filters,
    actions: {
      fetch: store.fetchWorkflows,
      refresh: store.refreshData,
      updateFilters: store.updateFilters,
      clearFilters: store.clearFilters,
      updateStatus: store.updateWorkflowStatus,
      executeAction: store.executeWorkflowAction,
      executeBulkAction: store.executeBulkAction,
      export: store.exportData
    }
  };
};
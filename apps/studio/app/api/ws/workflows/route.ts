import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

// Types pour les messages WebSocket
interface WorkflowWebSocketMessage {
  type: 'workflow_updated' | 'workflow_created' | 'workflow_deleted' | 'stats_updated';
  workflowId?: string;
  workflow?: any;
  updates?: any;
  stats?: any;
  timestamp: string;
}

// Instance globale du serveur Socket.IO
let io: SocketIOServer | null = null;

export function GET(request: NextRequest) {
  // WebSocket upgrade sera géré par Socket.IO
  return new Response('WebSocket endpoint - use Socket.IO client', { status: 200 });
}

export function initializeWebSocket(server: HTTPServer) {
  if (io) return io;

  io = new SocketIOServer(server, {
    path: '/api/ws/workflows',
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? ['https://your-domain.com']
        : ['http://localhost:3000'],
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected to workflow WebSocket:', socket.id);

    // Joindre la room admin pour recevoir les mises à jour
    socket.join('admin');

    // Authentification (optionnelle pour l'admin)
    socket.on('auth', (token) => {
      // Vérifier le token admin ici si nécessaire
      socket.emit('auth_success', { message: 'Authenticated as admin' });
    });

    // Demande de statistiques temps réel
    socket.on('request_stats', async () => {
      try {
        const stats = await getRealtimeStats();
        socket.emit('stats_update', {
          type: 'stats_updated',
          stats,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        socket.emit('error', { message: 'Error fetching stats' });
      }
    });

    // Demande de workflows filtrés
    socket.on('request_workflows', async (filters) => {
      try {
        const workflows = await getFilteredWorkflows(filters);
        socket.emit('workflows_update', {
          type: 'workflows_updated',
          workflows,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        socket.emit('error', { message: 'Error fetching workflows' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from workflow WebSocket:', socket.id);
    });
  });

  console.log('WebSocket server initialized for workflows');
  return io;
}

// Fonctions pour émettre des événements
export function emitWorkflowUpdate(workflowId: string, updates: any) {
  if (!io) return;

  const message: WorkflowWebSocketMessage = {
    type: 'workflow_updated',
    workflowId,
    updates,
    timestamp: new Date().toISOString()
  };

  io.to('admin').emit('workflow_update', message);
}

export function emitWorkflowCreated(workflow: any) {
  if (!io) return;

  const message: WorkflowWebSocketMessage = {
    type: 'workflow_created',
    workflow,
    timestamp: new Date().toISOString()
  };

  io.to('admin').emit('workflow_created', message);
}

export function emitWorkflowDeleted(workflowId: string) {
  if (!io) return;

  const message: WorkflowWebSocketMessage = {
    type: 'workflow_deleted',
    workflowId,
    timestamp: new Date().toISOString()
  };

  io.to('admin').emit('workflow_deleted', message);
}

export function emitStatsUpdate(stats: any) {
  if (!io) return;

  const message: WorkflowWebSocketMessage = {
    type: 'stats_updated',
    stats,
    timestamp: new Date().toISOString()
  };

  io.to('admin').emit('stats_update', message);
}

// Fonctions utilitaires
async function getRealtimeStats() {
  // Cette fonction devrait utiliser Prisma pour calculer les stats en temps réel
  // Similaire à la fonction calculateStats dans l'API REST
  try {
    const response = await fetch('/api/admin/workflows');
    const data = await response.json();
    return data.data.stats;
  } catch (error) {
    console.error('Error fetching realtime stats:', error);
    throw error;
  }
}

async function getFilteredWorkflows(filters: any) {
  try {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.businessType) params.append('businessType', filters.businessType);
    if (filters.search) params.append('search', filters.search);

    const response = await fetch(`/api/admin/workflows?${params}`);
    const data = await response.json();
    return data.data.workflows;
  } catch (error) {
    console.error('Error fetching filtered workflows:', error);
    throw error;
  }
}

// Middleware pour déclencher des événements WebSocket depuis d'autres APIs
export class WorkflowWebSocketEmitter {
  static async onWorkflowStatusChanged(workflowId: string, newStatus: string, previousStatus: string) {
    emitWorkflowUpdate(workflowId, {
      status: newStatus,
      previousStatus,
      updatedAt: new Date().toISOString()
    });

    // Émettre aussi les nouvelles stats
    const stats = await getRealtimeStats();
    emitStatsUpdate(stats);
  }

  static async onWorkflowCreated(workflow: any) {
    emitWorkflowCreated(workflow);

    // Émettre les nouvelles stats
    const stats = await getRealtimeStats();
    emitStatsUpdate(stats);
  }

  static async onWorkflowDeleted(workflowId: string) {
    emitWorkflowDeleted(workflowId);

    // Émettre les nouvelles stats
    const stats = await getRealtimeStats();
    emitStatsUpdate(stats);
  }

  static async onMockupsGenerated(workflowId: string, mockupsCount: number) {
    emitWorkflowUpdate(workflowId, {
      mockupsCount,
      lastAction: 'mockups_generated',
      updatedAt: new Date().toISOString()
    });
  }

  static async onEmailSent(workflowId: string, emailType: 'initial' | 'reminder') {
    emitWorkflowUpdate(workflowId, {
      lastEmailSent: emailType,
      lastAction: `${emailType}_email_sent`,
      updatedAt: new Date().toISOString()
    });
  }

  static async onChoiceMade(workflowId: string, chosenMockupId: string) {
    emitWorkflowUpdate(workflowId, {
      chosenMockupId,
      lastAction: 'choice_made',
      updatedAt: new Date().toISOString()
    });

    // Mettre à jour les stats de conversion
    const stats = await getRealtimeStats();
    emitStatsUpdate(stats);
  }

  static async onDeploymentComplete(workflowId: string, deploymentUrl: string) {
    emitWorkflowUpdate(workflowId, {
      deploymentUrl,
      lastAction: 'deployment_complete',
      updatedAt: new Date().toISOString()
    });

    // Mettre à jour les stats de revenus
    const stats = await getRealtimeStats();
    emitStatsUpdate(stats);
  }
}

export default WorkflowWebSocketEmitter;
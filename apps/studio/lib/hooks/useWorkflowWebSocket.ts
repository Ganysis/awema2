'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useWorkflowStore } from '@/lib/stores/workflow.store';
import { toast } from 'sonner';

interface WorkflowWebSocketHookOptions {
  autoConnect?: boolean;
  showNotifications?: boolean;
  debug?: boolean;
}

export function useWorkflowWebSocket(options: WorkflowWebSocketHookOptions = {}) {
  const {
    autoConnect = true,
    showNotifications = true,
    debug = false
  } = options;

  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const {
    updateWorkflow,
    addWorkflow,
    removeWorkflow,
    refreshData
  } = useWorkflowStore();

  // Fonction de connexion
  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      if (debug) console.log('WebSocket already connected');
      return;
    }

    const socketUrl = process.env.NODE_ENV === 'production'
      ? 'wss://your-domain.com'
      : 'http://localhost:3000';

    socketRef.current = io(socketUrl, {
      path: '/api/ws/workflows',
      transports: ['websocket', 'polling'],
      timeout: 10000,
      retries: 3
    });

    const socket = socketRef.current;

    // Événements de connexion
    socket.on('connect', () => {
      if (debug) console.log('WebSocket connected:', socket.id);
      reconnectAttempts.current = 0;

      // Authentification automatique (si nécessaire)
      socket.emit('auth', 'admin-token'); // Remplacer par un vrai token

      // Demander les stats initiales
      socket.emit('request_stats');

      if (showNotifications) {
        toast.success('Connexion temps réel activée');
      }
    });

    socket.on('disconnect', (reason) => {
      if (debug) console.log('WebSocket disconnected:', reason);

      if (showNotifications && reason !== 'io client disconnect') {
        toast.warning('Connexion temps réel perdue');
      }

      // Tentative de reconnexion automatique
      if (reason !== 'io client disconnect' && reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current++;
          if (debug) console.log(`Tentative de reconnexion ${reconnectAttempts.current}/${maxReconnectAttempts}`);
          socket.connect();
        }, delay);
      }
    });

    socket.on('connect_error', (error) => {
      if (debug) console.error('WebSocket connection error:', error);

      if (showNotifications) {
        toast.error('Erreur de connexion temps réel');
      }
    });

    // Événements de données
    socket.on('workflow_update', (message) => {
      if (debug) console.log('Workflow update received:', message);

      updateWorkflow(message.workflowId, message.updates);

      if (showNotifications) {
        toast.info(`Workflow mis à jour: ${message.workflowId.slice(0, 8)}...`);
      }
    });

    socket.on('workflow_created', (message) => {
      if (debug) console.log('Workflow created received:', message);

      addWorkflow(message.workflow);

      if (showNotifications) {
        toast.success(`Nouveau workflow: ${message.workflow.client.name}`);
      }
    });

    socket.on('workflow_deleted', (message) => {
      if (debug) console.log('Workflow deleted received:', message);

      removeWorkflow(message.workflowId);

      if (showNotifications) {
        toast.info(`Workflow supprimé: ${message.workflowId.slice(0, 8)}...`);
      }
    });

    socket.on('stats_update', (message) => {
      if (debug) console.log('Stats update received:', message);

      // Forcer un refresh des données pour mettre à jour les stats
      refreshData();
    });

    socket.on('auth_success', (message) => {
      if (debug) console.log('WebSocket auth success:', message);
    });

    socket.on('error', (error) => {
      if (debug) console.error('WebSocket error:', error);

      if (showNotifications) {
        toast.error(`Erreur WebSocket: ${error.message}`);
      }
    });

  }, [debug, showNotifications, updateWorkflow, addWorkflow, removeWorkflow, refreshData]);

  // Fonction de déconnexion
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    if (debug) console.log('WebSocket disconnected manually');
  }, [debug]);

  // Fonction de reconnexion manuelle
  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 1000);
  }, [disconnect, connect]);

  // Fonctions utilitaires
  const isConnected = useCallback(() => {
    return socketRef.current?.connected || false;
  }, []);

  const requestStats = useCallback(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('request_stats');
    }
  }, []);

  const requestWorkflows = useCallback((filters: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('request_workflows', filters);
    }
  }, []);

  // Émetteur d'événements personnalisés
  const emitEvent = useCallback((eventName: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(eventName, data);
      if (debug) console.log(`Emitted ${eventName}:`, data);
    }
  }, [debug]);

  // Effet pour la connexion/déconnexion automatique
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Nettoyage lors du démontage
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  // Nettoyage des timeouts lors du démontage
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Gestion de la visibilité de la page pour économiser les ressources
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page cachée - réduire la fréquence des mises à jour
        if (debug) console.log('Page hidden - reducing WebSocket activity');
      } else {
        // Page visible - reprendre l'activité normale
        if (debug) console.log('Page visible - resuming normal WebSocket activity');
        if (!isConnected() && autoConnect) {
          connect();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoConnect, connect, isConnected, debug]);

  return {
    // État de connexion
    isConnected: isConnected(),
    reconnectAttempts: reconnectAttempts.current,

    // Actions de connexion
    connect,
    disconnect,
    reconnect,

    // Utilitaires
    requestStats,
    requestWorkflows,
    emitEvent,

    // Socket instance (pour usage avancé)
    socket: socketRef.current
  };
}

// Hook simplifié pour une utilisation de base
export function useWorkflowRealtimeUpdates() {
  return useWorkflowWebSocket({
    autoConnect: true,
    showNotifications: true,
    debug: process.env.NODE_ENV === 'development'
  });
}

// Hook pour les notifications uniquement
export function useWorkflowNotifications() {
  return useWorkflowWebSocket({
    autoConnect: true,
    showNotifications: true,
    debug: false
  });
}
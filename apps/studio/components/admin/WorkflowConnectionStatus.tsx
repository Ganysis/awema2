'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkflowRealtimeUpdates } from '@/lib/hooks/useWorkflowWebSocket';
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface WorkflowConnectionStatusProps {
  showDetails?: boolean;
  compact?: boolean;
}

export function WorkflowConnectionStatus({
  showDetails = false,
  compact = false
}: WorkflowConnectionStatusProps) {
  const {
    isConnected,
    reconnectAttempts,
    connect,
    disconnect,
    reconnect,
    requestStats
  } = useWorkflowRealtimeUpdates();

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs ${
          isConnected ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isConnected ? (
            <>
              <Wifi className="w-3 h-3" />
              <span>Connecté</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3" />
              <span>Déconnecté</span>
              {reconnectAttempts > 0 && (
                <span className="ml-1">({reconnectAttempts} tentatives)</span>
              )}
            </>
          )}
        </div>

        {!isConnected && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reconnect}
            className="h-6 w-6 p-0"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  }

  if (!showDetails) {
    return (
      <Badge
        variant={isConnected ? "default" : "destructive"}
        className="flex items-center space-x-1"
      >
        {isConnected ? (
          <Wifi className="w-3 h-3" />
        ) : (
          <WifiOff className="w-3 h-3" />
        )}
        <span>{isConnected ? 'Temps réel actif' : 'Hors ligne'}</span>
      </Badge>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center">
          {isConnected ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
          )}
          État de la connexion
        </CardTitle>
        <CardDescription>
          Mises à jour en temps réel des workflows
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Statut</span>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </Badge>
        </div>

        {reconnectAttempts > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tentatives de reconnexion</span>
            <span className="text-sm font-medium">{reconnectAttempts}</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={disconnect}
                className="flex-1"
              >
                <WifiOff className="w-3 h-3 mr-2" />
                Déconnecter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={requestStats}
                className="flex-1"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Actualiser
              </Button>
            </>
          ) : (
            <Button
              onClick={reconnect}
              className="w-full"
              size="sm"
            >
              <Wifi className="w-3 h-3 mr-2" />
              Reconnecter
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Mises à jour automatiques des statuts</p>
          <p>• Notifications en temps réel</p>
          <p>• Synchronisation multi-utilisateurs</p>
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Workflow, WorkflowStatus, WORKFLOW_STATUS_LABELS, WORKFLOW_STATUS_COLORS } from '@/lib/types/workflow.types';
import {
  MoreVertical,
  Mail,
  RefreshCw,
  Eye,
  Deploy,
  Archive,
  Clock,
  MapPin,
  Briefcase,
  ExternalLink,
  Users
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

interface WorkflowCardProps {
  workflow: Workflow;
  onAction: (workflowId: string, action: string) => Promise<void>;
  compact?: boolean;
}

export function WorkflowCard({ workflow, onAction, compact = false }: WorkflowCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: string) => {
    setIsLoading(true);
    try {
      await onAction(workflow.id, action);
      toast.success('Action exécutée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'exécution');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: WorkflowStatus) => {
    switch (status) {
      case WorkflowStatus.FORM_RECEIVED:
        return <Users className="w-4 h-4" />;
      case WorkflowStatus.MOCKUPS_READY:
        return <RefreshCw className="w-4 h-4" />;
      case WorkflowStatus.SENT:
        return <Mail className="w-4 h-4" />;
      case WorkflowStatus.VIEWED:
        return <Eye className="w-4 h-4" />;
      case WorkflowStatus.CHOSEN:
        return <ExternalLink className="w-4 h-4" />;
      case WorkflowStatus.ENRICHED:
        return <RefreshCw className="w-4 h-4" />;
      case WorkflowStatus.DEPLOYED:
        return <Deploy className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getAvailableActions = () => {
    const actions: { label: string; action: string; icon: any; variant?: any }[] = [];

    switch (workflow.status) {
      case WorkflowStatus.FORM_RECEIVED:
        actions.push({
          label: 'Générer mockups',
          action: 'generate_mockups',
          icon: RefreshCw
        });
        break;
      case WorkflowStatus.MOCKUPS_READY:
        actions.push({
          label: 'Envoyer email',
          action: 'send_email',
          icon: Mail
        });
        break;
      case WorkflowStatus.SENT:
      case WorkflowStatus.VIEWED:
        actions.push({
          label: 'Relancer client',
          action: 'send_reminder',
          icon: Mail
        });
        break;
      case WorkflowStatus.CHOSEN:
        actions.push({
          label: 'Enrichir contenu',
          action: 'start_enrichment',
          icon: RefreshCw
        });
        break;
      case WorkflowStatus.ENRICHED:
        actions.push({
          label: 'Déployer site',
          action: 'deploy_site',
          icon: Deploy
        });
        break;
    }

    // Actions communes
    if (workflow.status !== WorkflowStatus.DEPLOYED) {
      actions.push({
        label: 'Archiver',
        action: 'archive',
        icon: Archive,
        variant: 'destructive'
      });
    }

    return actions;
  };

  const chosenMockup = workflow.mockups.find(m => m.isChosen);

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${compact ? 'p-2' : ''}`}>
      <CardHeader className={`${compact ? 'pb-2' : 'pb-3'}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {workflow.client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CardTitle className={`${compact ? 'text-sm' : 'text-base'} truncate`}>
                {workflow.client.name}
              </CardTitle>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Briefcase className="w-3 h-3" />
                <span className="capitalize">{workflow.client.businessType}</span>
                <MapPin className="w-3 h-3 ml-2" />
                <span>{workflow.client.city}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={isLoading}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {getAvailableActions().map((action) => (
                <DropdownMenuItem
                  key={action.action}
                  onClick={() => handleAction(action.action)}
                  className={action.variant === 'destructive' ? 'text-red-600' : ''}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className={`space-y-3 ${compact ? 'pt-0' : ''}`}>
        {/* Status */}
        <div className="flex items-center justify-between">
          <Badge className={`${WORKFLOW_STATUS_COLORS[workflow.status]} text-xs`}>
            {getStatusIcon(workflow.status)}
            <span className="ml-1">{WORKFLOW_STATUS_LABELS[workflow.status]}</span>
          </Badge>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(workflow.createdAt), {
              addSuffix: true,
              locale: fr
            })}
          </span>
        </div>

        {/* Mockups info */}
        {workflow.mockups.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-600 mb-1">
              Mockups: {workflow.mockups.length} générés
              {chosenMockup && (
                <span className="text-green-600 font-medium ml-2">
                  • 1 choisi
                </span>
              )}
            </div>
            {chosenMockup && (
              <div className="text-xs text-gray-500 truncate">
                Choix: {chosenMockup.title}
              </div>
            )}
          </div>
        )}

        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progression</span>
            <span>{Math.round((Object.values(WorkflowStatus).indexOf(workflow.status) + 1) / Object.values(WorkflowStatus).length * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${(Object.values(WorkflowStatus).indexOf(workflow.status) + 1) / Object.values(WorkflowStatus).length * 100}%`
              }}
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex space-x-2">
          {getAvailableActions().slice(0, 2).map((action) => (
            <Button
              key={action.action}
              size="sm"
              variant="outline"
              onClick={() => handleAction(action.action)}
              disabled={isLoading}
              className="flex-1 text-xs"
            >
              <action.icon className="w-3 h-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Contact info */}
        <div className="border-t pt-2 space-y-1">
          <div className="text-xs text-gray-600 truncate">
            📧 {workflow.client.email}
          </div>
          {workflow.client.phone && (
            <div className="text-xs text-gray-600">
              📱 {workflow.client.phone}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
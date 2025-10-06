'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkflowCard } from './WorkflowCard';
import { Workflow, WorkflowStatus, WORKFLOW_STATUS_LABELS } from '@/lib/types/workflow.types';
import { Plus, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

interface WorkflowKanbanProps {
  workflows: Workflow[];
  loading: boolean;
  onStatusChange?: (workflowId: string, newStatus: WorkflowStatus) => Promise<void>;
  onAction?: (workflowId: string, action: string) => Promise<void>;
}

export function WorkflowKanban({ workflows, loading, onStatusChange, onAction }: WorkflowKanbanProps) {
  const [mounted, setMounted] = useState(false);
  const [optimisticWorkflows, setOptimisticWorkflows] = useState<Workflow[]>(workflows);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOptimisticWorkflows(workflows);
  }, [workflows]);

  const getWorkflowsByStatus = (status: WorkflowStatus): Workflow[] => {
    return optimisticWorkflows.filter(workflow => workflow.status === status);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const workflowId = draggableId;
    const newStatus = destination.droppableId as WorkflowStatus;

    // Optimistic update
    setOptimisticWorkflows(prev =>
      prev.map(w =>
        w.id === workflowId
          ? { ...w, status: newStatus, updatedAt: new Date() }
          : w
      )
    );

    try {
      if (onStatusChange) {
        await onStatusChange(workflowId, newStatus);
        toast.success('Statut mis à jour');
      }
    } catch (error) {
      // Revert optimistic update
      setOptimisticWorkflows(workflows);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleWorkflowAction = async (workflowId: string, action: string) => {
    if (onAction) {
      await onAction(workflowId, action);
    }
  };

  const getStatusColor = (status: WorkflowStatus): string => {
    switch (status) {
      case WorkflowStatus.FORM_RECEIVED:
        return 'border-gray-300 bg-gray-50';
      case WorkflowStatus.MOCKUPS_READY:
        return 'border-blue-300 bg-blue-50';
      case WorkflowStatus.SENT:
        return 'border-yellow-300 bg-yellow-50';
      case WorkflowStatus.VIEWED:
        return 'border-orange-300 bg-orange-50';
      case WorkflowStatus.CHOSEN:
        return 'border-purple-300 bg-purple-50';
      case WorkflowStatus.ENRICHED:
        return 'border-green-300 bg-green-50';
      case WorkflowStatus.DEPLOYED:
        return 'border-emerald-300 bg-emerald-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  if (!mounted) {
    return <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {Object.values(WorkflowStatus).map((status) => (
          <Card key={status} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 h-full">
        {Object.values(WorkflowStatus).map((status) => {
          const workflowsInStatus = getWorkflowsByStatus(status);

          return (
            <Card key={status} className={`flex flex-col h-fit min-h-96 ${getStatusColor(status)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {WORKFLOW_STATUS_LABELS[status]}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {workflowsInStatus.length}
                  </Badge>
                </div>
              </CardHeader>

              <Droppable droppableId={status} type="workflow">
                {(provided, snapshot) => (
                  <CardContent
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-3 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-blue-100' : ''
                    }`}
                  >
                    {workflowsInStatus.map((workflow, index) => (
                      <Draggable
                        key={workflow.id}
                        draggableId={workflow.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`transition-transform ${
                              snapshot.isDragging ? 'rotate-2 scale-105 shadow-lg' : ''
                            }`}
                          >
                            <WorkflowCard
                              workflow={workflow}
                              onAction={handleWorkflowAction}
                              compact
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {workflowsInStatus.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-sm">Aucun workflow</div>
                        <div className="text-xs mt-1">dans ce statut</div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Droppable>
            </Card>
          );
        })}
      </div>
    </DragDropContext>
  );
}
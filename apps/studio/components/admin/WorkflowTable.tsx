'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Workflow, WorkflowStatus, WORKFLOW_STATUS_LABELS, WORKFLOW_STATUS_COLORS } from '@/lib/types/workflow.types';
import {
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit,
  Trash,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

interface WorkflowTableProps {
  workflows: Workflow[];
  loading: boolean;
  onAction?: (workflowId: string, action: string) => Promise<void>;
}

type SortField = 'name' | 'status' | 'businessType' | 'createdAt' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

export function WorkflowTable({ workflows, loading, onAction }: WorkflowTableProps) {
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedWorkflows = [...workflows].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case 'name':
        aValue = a.client.name.toLowerCase();
        bValue = b.client.name.toLowerCase();
        break;
      case 'status':
        aValue = Object.values(WorkflowStatus).indexOf(a.status);
        bValue = Object.values(WorkflowStatus).indexOf(b.status);
        break;
      case 'businessType':
        aValue = a.client.businessType.toLowerCase();
        bValue = b.client.businessType.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'updatedAt':
        aValue = new Date(a.updatedAt).getTime();
        bValue = new Date(b.updatedAt).getTime();
        break;
      default:
        aValue = a.updatedAt;
        bValue = b.updatedAt;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleRowSelect = (workflowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(workflowId)) {
      newSelected.delete(workflowId);
    } else {
      newSelected.add(workflowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === workflows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(workflows.map(w => w.id)));
    }
  };

  const handleBulkAction = async (action: string) => {
    try {
      await Promise.all(
        Array.from(selectedRows).map(id => onAction?.(id, action))
      );
      setSelectedRows(new Set());
      toast.success(`Action "${action}" exécutée sur ${selectedRows.size} workflows`);
    } catch (error) {
      toast.error('Erreur lors de l\'action groupée');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ?
      <ChevronUp className="w-4 h-4" /> :
      <ChevronDown className="w-4 h-4" />;
  };

  const getProgressPercentage = (status: WorkflowStatus): number => {
    return Math.round((Object.values(WorkflowStatus).indexOf(status) + 1) / Object.values(WorkflowStatus).length * 100);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Workflows ({workflows.length})
          </CardTitle>
          {selectedRows.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedRows.size} sélectionné(s)
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Actions groupées
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkAction('send_reminder')}>
                    <Mail className="w-4 h-4 mr-2" />
                    Relancer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                    <Trash className="w-4 h-4 mr-2" />
                    Archiver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === workflows.length && workflows.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>Client</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Statut
                    {renderSortIcon('status')}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('businessType')}
                >
                  <div className="flex items-center">
                    Métier
                    {renderSortIcon('businessType')}
                  </div>
                </TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Mockups</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Créé
                    {renderSortIcon('createdAt')}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('updatedAt')}
                >
                  <div className="flex items-center">
                    Mis à jour
                    {renderSortIcon('updatedAt')}
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedWorkflows.map((workflow) => (
                <TableRow key={workflow.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(workflow.id)}
                      onChange={() => handleRowSelect(workflow.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {workflow.client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{workflow.client.name}</div>
                        <div className="text-xs text-gray-500 flex items-center space-x-2">
                          <span>{workflow.client.city}</span>
                          {workflow.client.email && (
                            <a
                              href={`mailto:${workflow.client.email}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Mail className="w-3 h-3" />
                            </a>
                          )}
                          {workflow.client.phone && (
                            <a
                              href={`tel:${workflow.client.phone}`}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className={`${WORKFLOW_STATUS_COLORS[workflow.status]} text-xs`}>
                      {WORKFLOW_STATUS_LABELS[workflow.status]}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="capitalize text-sm">{workflow.client.businessType}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(workflow.status)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">
                        {getProgressPercentage(workflow.status)}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {workflow.mockups.length > 0 ? (
                        <div className="flex items-center space-x-1">
                          <span className="text-blue-600">{workflow.mockups.length}</span>
                          {workflow.mockups.some(m => m.isChosen) && (
                            <span className="text-green-600 text-xs">• choisi</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Aucun</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {format(new Date(workflow.createdAt), 'dd/MM/yyyy', { locale: fr })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(workflow.createdAt), 'HH:mm')}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {formatDistanceToNow(new Date(workflow.updatedAt), {
                        addSuffix: true,
                        locale: fr
                      })}
                    </div>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        {workflow.mockups.length > 0 && (
                          <DropdownMenuItem>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Voir mockups
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkflowStats as IWorkflowStats } from '@/lib/types/workflow.types';
import {
  Users,
  Clock,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Timer,
  BarChart3,
  Target
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface WorkflowStatsProps {
  stats: IWorkflowStats;
  loading: boolean;
}

export function WorkflowStats({ stats, loading }: WorkflowStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}min`;
    } else if (hours < 24) {
      return `${Math.round(hours)}h`;
    } else {
      return `${Math.round(hours / 24)}j`;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Workflows */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Workflows
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            +12% par rapport au mois dernier
          </p>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taux de Conversion
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Formulaire → Déploiement
          </p>
        </CardContent>
      </Card>

      {/* Average Time to Choice */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Temps Moyen de Choix
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(stats.avgTimeToChoice)}</div>
          <p className="text-xs text-muted-foreground">
            De l'envoi au choix
          </p>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Revenus Générés
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            Ce mois-ci
          </p>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg">Répartition par Statut</CardTitle>
          <CardDescription>
            Distribution actuelle des workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="text-center">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs mb-1 block">
                    {status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Temps de génération moyen</span>
            <span className="font-semibold">{stats.avgGenerationTime}min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Workflows complétés</span>
            <span className="font-semibold">
              {stats.byStatus.deployed || 0} / {stats.total}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">En cours</span>
            <span className="font-semibold text-blue-600">
              {stats.total - (stats.byStatus.deployed || 0)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Timer className="w-5 h-5 mr-2" />
            Activité Récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Dernier workflow créé</span>
              <span className="font-medium text-green-600">Il y a 2h</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Dernier déploiement</span>
              <span className="font-medium text-blue-600">Il y a 4h</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Choix en attente</span>
              <span className="font-medium text-orange-600">
                {stats.byStatus.sent + stats.byStatus.viewed || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
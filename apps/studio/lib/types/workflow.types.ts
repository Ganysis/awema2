export enum WorkflowStatus {
  FORM_RECEIVED = 'form_received',
  MOCKUPS_READY = 'mockups_ready',
  SENT = 'sent',
  VIEWED = 'viewed',
  CHOSEN = 'chosen',
  ENRICHED = 'enriched',
  DEPLOYED = 'deployed'
}

export interface WorkflowClient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessType: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowMockup {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  isChosen: boolean;
  viewCount: number;
  createdAt: Date;
}

export interface WorkflowAction {
  id: string;
  type: 'email_sent' | 'mockups_generated' | 'choice_made' | 'enrichment_started' | 'deployed';
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Workflow {
  id: string;
  clientId: string;
  client: WorkflowClient;
  status: WorkflowStatus;
  mockups: WorkflowMockup[];
  actions: WorkflowAction[];
  metadata: {
    formData: Record<string, any>;
    generationTime?: number;
    enrichmentProgress?: number;
    deploymentUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface WorkflowStats {
  total: number;
  byStatus: Record<WorkflowStatus, number>;
  avgTimeToChoice: number; // en heures
  conversionRate: number; // pourcentage
  avgGenerationTime: number; // en minutes
  totalRevenue: number;
}

export interface WorkflowFilters {
  status?: WorkflowStatus | WorkflowStatus[];
  dateRange?: [Date, Date];
  businessType?: string;
  city?: string;
  search?: string;
}

export interface WorkflowDashboard {
  workflows: Workflow[];
  stats: WorkflowStats;
  filters: WorkflowFilters;
  loading: boolean;
  error: string | null;
}

export interface WorkflowActionPayload {
  type: 'regenerate_mockups' | 'send_reminder' | 'start_enrichment' | 'deploy_site' | 'archive';
  metadata?: Record<string, any>;
}

export const WORKFLOW_STATUS_LABELS: Record<WorkflowStatus, string> = {
  [WorkflowStatus.FORM_RECEIVED]: 'Formulaire reçu',
  [WorkflowStatus.MOCKUPS_READY]: 'Mockups générés',
  [WorkflowStatus.SENT]: 'Email envoyé',
  [WorkflowStatus.VIEWED]: 'Email consulté',
  [WorkflowStatus.CHOSEN]: 'Choix effectué',
  [WorkflowStatus.ENRICHED]: 'Contenu enrichi',
  [WorkflowStatus.DEPLOYED]: 'Site déployé'
};

export const WORKFLOW_STATUS_COLORS: Record<WorkflowStatus, string> = {
  [WorkflowStatus.FORM_RECEIVED]: 'bg-gray-100 text-gray-800',
  [WorkflowStatus.MOCKUPS_READY]: 'bg-blue-100 text-blue-800',
  [WorkflowStatus.SENT]: 'bg-yellow-100 text-yellow-800',
  [WorkflowStatus.VIEWED]: 'bg-orange-100 text-orange-800',
  [WorkflowStatus.CHOSEN]: 'bg-purple-100 text-purple-800',
  [WorkflowStatus.ENRICHED]: 'bg-green-100 text-green-800',
  [WorkflowStatus.DEPLOYED]: 'bg-emerald-100 text-emerald-800'
};

export const BUSINESS_TYPES = [
  'plombier',
  'electricien',
  'menuisier',
  'paysagiste',
  'maçon',
  'couvreur',
  'chauffagiste',
  'peintre',
  'carreleur',
  'serrurier'
] as const;

export type BusinessType = typeof BUSINESS_TYPES[number];
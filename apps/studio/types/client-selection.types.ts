export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type TemplateVariant = 'sydney' | 'locomotive' | 'nextspace';
export type WorkflowStatus = 'pending' | 'mockups_ready' | 'awaiting_selection' | 'chosen' | 'completed';

export interface ClientSelection {
  workflowId: string;
  selectedTemplate: TemplateVariant;
  selectedAt: Date;
  clientInfo: {
    ip: string;
    userAgent: string;
    device: DeviceType;
    viewTime: number; // Temps total passé sur la page
    templateViewTimes: Record<TemplateVariant, number>; // Temps par template
  };
  metadata?: {
    referrer?: string;
    sessionId?: string;
    utmSource?: string;
  };
}

export interface MockupData {
  id: string;
  name: string;
  variant: TemplateVariant;
  previewUrl: string;
  thumbnailUrl: string;
  description: string;
  features: string[];
  category: string;
  lastUpdated: Date;
}

export interface WorkflowData {
  id: string;
  clientName: string;
  businessType: string;
  mockups: MockupData[];
  status: WorkflowStatus;
  createdAt: Date;
  expiresAt: Date;
  metadata: {
    clientEmail?: string;
    formData: Record<string, any>;
  };
}

export interface SelectionEvent {
  type: 'mockup_view' | 'device_change' | 'selection_made' | 'page_view';
  timestamp: Date;
  data: {
    workflowId: string;
    template?: TemplateVariant;
    device?: DeviceType;
    duration?: number;
  };
}

export interface ClientSelectionProps {
  workflowId: string;
  workflowData: WorkflowData;
  token: string;
}

export interface MockupPreviewProps {
  mockup: MockupData;
  device: DeviceType;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export interface DeviceSwitcherProps {
  currentDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  className?: string;
}

export interface SelectionConfirmationProps {
  isOpen: boolean;
  selectedMockup: MockupData | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// API Response Types
export interface SelectionResponse {
  success: boolean;
  message: string;
  data?: {
    selectionId: string;
    workflowId: string;
    nextStep?: string;
  };
  error?: string;
}

export interface WorkflowResponse {
  success: boolean;
  data?: WorkflowData;
  error?: string;
}

// Configuration
export const DEVICE_DIMENSIONS = {
  desktop: { width: 1200, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 }
} as const;

export const SELECTION_CONFIG = {
  maxSelectionTime: 72 * 60 * 60 * 1000, // 72 heures en ms
  preloadDelay: 1000, // Délai avant préchargement des iframes
  trackingInterval: 5000, // Intervalle de tracking en ms
  confirmationDelay: 2000 // Délai avant redirection après confirmation
} as const;
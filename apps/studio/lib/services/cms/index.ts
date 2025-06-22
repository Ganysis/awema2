/**
 * CMS Service Export
 * Main entry point for the CMS functionality
 */

export * from './cms-api';

// Re-export specific items for easier access
export { 
  CMSApi,
  createCMSMiddleware,
  createStandaloneCMSServer,
  generateCMSIntegration,
  CMSExportUtils
} from './cms-api';

export type { 
  CMSContent, 
  CMSConfig
} from './cms-api';
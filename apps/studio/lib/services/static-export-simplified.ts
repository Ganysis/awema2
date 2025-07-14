import { renderToString } from 'react-dom/server';
import React from 'react';
import type { EditorBlock, Page, Theme } from '@/lib/store/editor-store';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';

export interface SimplifiedExportOptions {
  minifyHtml?: boolean;
  includeCms?: boolean;
  [key: string]: any;
}

export interface ExportData {
  html: string;
  css: string;
  js: string;
  additionalFiles: Array<{ path: string; content: string; }>;
  assets: Array<{ path: string; data: Buffer; }>;
}

// Importer le service corrigé
import { ExportServiceFixed } from './export-service-fixed';

// Utiliser le service corrigé
export class StaticExportService {
  static async exportSite(
    projectData: any,
    options: SimplifiedExportOptions = {}
  ): Promise<ExportData> {
    console.log('[Export] Utilisation du service corrigé');
    return ExportServiceFixed.exportSite(projectData, options);
  }
}
/**
 * Logger V3 - Système de logs détaillés pour debugging
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  component: string;
  method: string;
  message: string;
  data?: any;
  error?: Error;
  performance?: {
    startTime: number;
    endTime: number;
    duration: number;
  };
}

export class LoggerV3 {
  private static instance: LoggerV3;
  private logs: LogEntry[] = [];
  private logLevel: LogLevel = LogLevel.DEBUG;
  private maxLogs: number = 10000;
  private enableConsole: boolean = true;
  private enableStorage: boolean = true;

  private constructor() {
    console.log('🚀 [LoggerV3] Système de logs V3 initialisé');
  }

  static getInstance(): LoggerV3 {
    if (!LoggerV3.instance) {
      LoggerV3.instance = new LoggerV3();
    }
    return LoggerV3.instance;
  }

  /**
   * Log de debug détaillé
   */
  debug(component: string, method: string, message: string, data?: any): void {
    this.log(LogLevel.DEBUG, component, method, message, data);
  }

  /**
   * Log d'information
   */
  info(component: string, method: string, message: string, data?: any): void {
    this.log(LogLevel.INFO, component, method, message, data);
  }

  /**
   * Log d'avertissement
   */
  warn(component: string, method: string, message: string, data?: any): void {
    this.log(LogLevel.WARN, component, method, message, data);
  }

  /**
   * Log d'erreur
   */
  error(component: string, method: string, message: string, error?: Error, data?: any): void {
    this.log(LogLevel.ERROR, component, method, message, data, error);
  }

  /**
   * Log critique
   */
  critical(component: string, method: string, message: string, error?: Error, data?: any): void {
    this.log(LogLevel.CRITICAL, component, method, message, data, error);
  }

  /**
   * Log avec performance
   */
  performance(component: string, method: string, startTime: number): void {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.log(LogLevel.INFO, component, method, `Performance: ${duration.toFixed(2)}ms`, {
      performance: {
        startTime,
        endTime,
        duration
      }
    });
  }

  /**
   * Log principal
   */
  private log(
    level: LogLevel, 
    component: string, 
    method: string, 
    message: string, 
    data?: any, 
    error?: Error
  ): void {
    if (level < this.logLevel) return;

    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      component,
      method,
      message,
      data,
      error
    };

    // Ajouter aux logs en mémoire
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Supprimer le plus ancien
    }

    // Console log
    if (this.enableConsole) {
      this.consoleLog(entry);
    }

    // Storage log
    if (this.enableStorage) {
      this.storageLog(entry);
    }
  }

  /**
   * Affichage console avec couleurs
   */
  private consoleLog(entry: LogEntry): void {
    const levelColors = {
      [LogLevel.DEBUG]: 'color: #6b7280',
      [LogLevel.INFO]: 'color: #3b82f6',
      [LogLevel.WARN]: 'color: #f59e0b',
      [LogLevel.ERROR]: 'color: #ef4444',
      [LogLevel.CRITICAL]: 'background: #ef4444; color: white; font-weight: bold'
    };

    const levelNames = {
      [LogLevel.DEBUG]: 'DEBUG',
      [LogLevel.INFO]: 'INFO',
      [LogLevel.WARN]: 'WARN',
      [LogLevel.ERROR]: 'ERROR',
      [LogLevel.CRITICAL]: 'CRITICAL'
    };

    const timestamp = entry.timestamp.toISOString();
    const prefix = `[${timestamp}] [${levelNames[entry.level]}] [${entry.component}::${entry.method}]`;

    console.log(
      `%c${prefix} ${entry.message}`,
      levelColors[entry.level]
    );

    if (entry.data) {
      console.log('📊 Data:', entry.data);
    }

    if (entry.error) {
      console.error('❌ Error:', entry.error);
    }
  }

  /**
   * Sauvegarde dans localStorage
   */
  private storageLog(entry: LogEntry): void {
    try {
      const key = `v3_log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(key, JSON.stringify(entry));

      // Nettoyer les vieux logs
      this.cleanOldLogs();
    } catch (e) {
      // Ignorer les erreurs de storage
    }
  }

  /**
   * Nettoyer les vieux logs
   */
  private cleanOldLogs(): void {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('v3_log_'));
    if (keys.length > 1000) {
      // Supprimer les 100 plus anciens
      keys.sort().slice(0, 100).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }

  /**
   * Obtenir tous les logs
   */
  getLogs(filter?: {
    level?: LogLevel;
    component?: string;
    startDate?: Date;
    endDate?: Date;
  }): LogEntry[] {
    let filtered = [...this.logs];

    if (filter) {
      if (filter.level !== undefined) {
        filtered = filtered.filter(log => log.level >= filter.level!);
      }
      if (filter.component) {
        filtered = filtered.filter(log => log.component === filter.component);
      }
      if (filter.startDate) {
        filtered = filtered.filter(log => log.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filtered = filtered.filter(log => log.timestamp <= filter.endDate!);
      }
    }

    return filtered;
  }

  /**
   * Exporter les logs
   */
  exportLogs(): string {
    const logs = this.getLogs();
    const report = {
      generated: new Date().toISOString(),
      totalLogs: logs.length,
      byLevel: {
        debug: logs.filter(l => l.level === LogLevel.DEBUG).length,
        info: logs.filter(l => l.level === LogLevel.INFO).length,
        warn: logs.filter(l => l.level === LogLevel.WARN).length,
        error: logs.filter(l => l.level === LogLevel.ERROR).length,
        critical: logs.filter(l => l.level === LogLevel.CRITICAL).length
      },
      logs: logs.map(log => ({
        ...log,
        levelName: LogLevel[log.level]
      }))
    };

    return JSON.stringify(report, null, 2);
  }

  /**
   * Vider les logs
   */
  clearLogs(): void {
    this.logs = [];
    
    // Nettoyer localStorage
    Object.keys(localStorage)
      .filter(k => k.startsWith('v3_log_'))
      .forEach(key => localStorage.removeItem(key));

    console.log('🧹 [LoggerV3] Logs vidés');
  }

  /**
   * Alias pour clearLogs (compatibilité)
   */
  clear(): void {
    this.clearLogs();
  }

  /**
   * Configuration
   */
  configure(options: {
    logLevel?: LogLevel;
    enableConsole?: boolean;
    enableStorage?: boolean;
    maxLogs?: number;
  }): void {
    if (options.logLevel !== undefined) this.logLevel = options.logLevel;
    if (options.enableConsole !== undefined) this.enableConsole = options.enableConsole;
    if (options.enableStorage !== undefined) this.enableStorage = options.enableStorage;
    if (options.maxLogs !== undefined) this.maxLogs = options.maxLogs;

    this.info('LoggerV3', 'configure', 'Configuration mise à jour', options);
  }
}

// Helper function pour faciliter l'accès
export const logger = LoggerV3.getInstance();
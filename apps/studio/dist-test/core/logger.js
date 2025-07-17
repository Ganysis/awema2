"use strict";
/**
 * Logger V3 - Système de logs détaillés pour debugging
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerV3 = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["CRITICAL"] = 4] = "CRITICAL";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class LoggerV3 {
    constructor() {
        this.logs = [];
        this.logLevel = LogLevel.DEBUG;
        this.maxLogs = 10000;
        this.enableConsole = true;
        this.enableStorage = true;
        console.log('🚀 [LoggerV3] Système de logs V3 initialisé');
    }
    static getInstance() {
        if (!LoggerV3.instance) {
            LoggerV3.instance = new LoggerV3();
        }
        return LoggerV3.instance;
    }
    /**
     * Log de debug détaillé
     */
    debug(component, method, message, data) {
        this.log(LogLevel.DEBUG, component, method, message, data);
    }
    /**
     * Log d'information
     */
    info(component, method, message, data) {
        this.log(LogLevel.INFO, component, method, message, data);
    }
    /**
     * Log d'avertissement
     */
    warn(component, method, message, data) {
        this.log(LogLevel.WARN, component, method, message, data);
    }
    /**
     * Log d'erreur
     */
    error(component, method, message, error, data) {
        this.log(LogLevel.ERROR, component, method, message, data, error);
    }
    /**
     * Log critique
     */
    critical(component, method, message, error, data) {
        this.log(LogLevel.CRITICAL, component, method, message, data, error);
    }
    /**
     * Log avec performance
     */
    performance(component, method, startTime) {
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
    log(level, component, method, message, data, error) {
        if (level < this.logLevel)
            return;
        const entry = {
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
    consoleLog(entry) {
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
        console.log(`%c${prefix} ${entry.message}`, levelColors[entry.level]);
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
    storageLog(entry) {
        try {
            const key = `v3_log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem(key, JSON.stringify(entry));
            // Nettoyer les vieux logs
            this.cleanOldLogs();
        }
        catch (e) {
            // Ignorer les erreurs de storage
        }
    }
    /**
     * Nettoyer les vieux logs
     */
    cleanOldLogs() {
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
    getLogs(filter) {
        let filtered = [...this.logs];
        if (filter) {
            if (filter.level !== undefined) {
                filtered = filtered.filter(log => log.level >= filter.level);
            }
            if (filter.component) {
                filtered = filtered.filter(log => log.component === filter.component);
            }
            if (filter.startDate) {
                filtered = filtered.filter(log => log.timestamp >= filter.startDate);
            }
            if (filter.endDate) {
                filtered = filtered.filter(log => log.timestamp <= filter.endDate);
            }
        }
        return filtered;
    }
    /**
     * Exporter les logs
     */
    exportLogs() {
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
    clearLogs() {
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
    clear() {
        this.clearLogs();
    }
    /**
     * Configuration
     */
    configure(options) {
        if (options.logLevel !== undefined)
            this.logLevel = options.logLevel;
        if (options.enableConsole !== undefined)
            this.enableConsole = options.enableConsole;
        if (options.enableStorage !== undefined)
            this.enableStorage = options.enableStorage;
        if (options.maxLogs !== undefined)
            this.maxLogs = options.maxLogs;
        this.info('LoggerV3', 'configure', 'Configuration mise à jour', options);
    }
}
exports.LoggerV3 = LoggerV3;
// Helper function pour faciliter l'accès
exports.logger = LoggerV3.getInstance();

import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface CacheEntry {
  key: string;
  content: any;
  metadata: {
    createdAt: Date;
    lastAccessed: Date;
    accessCount: number;
    size: number;
    provider: string;
    cost: number;
  };
}

export interface CacheStats {
  totalEntries: number;
  totalSize: number;
  totalCostSaved: number;
  hitRate: number;
  providers: Record<string, number>;
  topAccessed: Array<{ key: string; count: number }>;
}

export class ContentCacheService {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private cacheDir: string;
  private maxMemorySize: number = 100 * 1024 * 1024; // 100MB
  private maxDiskSize: number = 1024 * 1024 * 1024; // 1GB
  private currentMemorySize: number = 0;
  private hits: number = 0;
  private misses: number = 0;

  constructor() {
    this.cacheDir = path.join(process.cwd(), '.cache', 'ai-content');
    this.initializeCache();
  }

  private async initializeCache(): Promise<void> {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true });
      await this.loadPersistentCache();
    } catch (error) {
      console.error('Failed to initialize cache:', error);
    }
  }

  async get(key: string): Promise<any | null> {
    const hashedKey = this.hashKey(key);

    // Check memory cache first
    if (this.memoryCache.has(hashedKey)) {
      const entry = this.memoryCache.get(hashedKey)!;
      entry.metadata.lastAccessed = new Date();
      entry.metadata.accessCount++;
      this.hits++;
      console.log(`💾 Cache HIT (memory): ${key}`);
      return entry.content;
    }

    // Check disk cache
    try {
      const diskPath = path.join(this.cacheDir, `${hashedKey}.json`);
      const data = await fs.readFile(diskPath, 'utf-8');
      const entry: CacheEntry = JSON.parse(data);
      
      // Promote to memory cache if frequently accessed
      if (entry.metadata.accessCount > 5) {
        await this.addToMemoryCache(hashedKey, entry);
      }
      
      entry.metadata.lastAccessed = new Date();
      entry.metadata.accessCount++;
      
      // Update disk cache with new metadata
      await fs.writeFile(diskPath, JSON.stringify(entry, null, 2));
      
      this.hits++;
      console.log(`💾 Cache HIT (disk): ${key}`);
      return entry.content;
    } catch (error) {
      this.misses++;
      console.log(`❌ Cache MISS: ${key}`);
      return null;
    }
  }

  async set(key: string, content: any, metadata?: Partial<CacheEntry['metadata']>): Promise<void> {
    const hashedKey = this.hashKey(key);
    const size = JSON.stringify(content).length;
    
    const entry: CacheEntry = {
      key,
      content,
      metadata: {
        createdAt: new Date(),
        lastAccessed: new Date(),
        accessCount: 1,
        size,
        provider: metadata?.provider || 'unknown',
        cost: metadata?.cost || 0,
        ...metadata
      }
    };

    // Add to memory cache if space available
    if (this.currentMemorySize + size < this.maxMemorySize) {
      await this.addToMemoryCache(hashedKey, entry);
    }

    // Always persist to disk
    await this.persistToDisk(hashedKey, entry);
    
    console.log(`✅ Cached: ${key} (${this.formatSize(size)}, saved $${metadata?.cost || 0})`);
  }

  private async addToMemoryCache(hashedKey: string, entry: CacheEntry): Promise<void> {
    // Evict old entries if needed
    while (this.currentMemorySize + entry.metadata.size > this.maxMemorySize) {
      await this.evictLRU();
    }

    this.memoryCache.set(hashedKey, entry);
    this.currentMemorySize += entry.metadata.size;
  }

  private async evictLRU(): Promise<void> {
    let lruKey: string | null = null;
    let lruTime = new Date();

    // Find least recently used entry
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.metadata.lastAccessed < lruTime) {
        lruTime = entry.metadata.lastAccessed;
        lruKey = key;
      }
    }

    if (lruKey) {
      const entry = this.memoryCache.get(lruKey)!;
      this.currentMemorySize -= entry.metadata.size;
      this.memoryCache.delete(lruKey);
      console.log(`🗑️ Evicted from memory: ${entry.key}`);
    }
  }

  private async persistToDisk(hashedKey: string, entry: CacheEntry): Promise<void> {
    try {
      const filePath = path.join(this.cacheDir, `${hashedKey}.json`);
      await fs.writeFile(filePath, JSON.stringify(entry, null, 2));
    } catch (error) {
      console.error('Failed to persist cache to disk:', error);
    }
  }

  private async loadPersistentCache(): Promise<void> {
    try {
      const files = await fs.readdir(this.cacheDir);
      const recentFiles = [];

      // Load file metadata
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          const stats = await fs.stat(filePath);
          recentFiles.push({ file, mtime: stats.mtime });
        }
      }

      // Sort by modification time (most recent first)
      recentFiles.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

      // Load most recent files into memory (up to memory limit)
      for (const { file } of recentFiles.slice(0, 100)) {
        try {
          const filePath = path.join(this.cacheDir, file);
          const data = await fs.readFile(filePath, 'utf-8');
          const entry: CacheEntry = JSON.parse(data);
          
          if (this.currentMemorySize + entry.metadata.size < this.maxMemorySize) {
            const hashedKey = file.replace('.json', '');
            this.memoryCache.set(hashedKey, entry);
            this.currentMemorySize += entry.metadata.size;
          } else {
            break; // Memory limit reached
          }
        } catch (error) {
          console.error(`Failed to load cache file ${file}:`, error);
        }
      }

      console.log(`📂 Loaded ${this.memoryCache.size} entries into memory cache`);
    } catch (error) {
      console.error('Failed to load persistent cache:', error);
    }
  }

  private hashKey(key: string): string {
    return createHash('sha256').update(key).digest('hex');
  }

  // Find similar cached pages for context
  async getSimilarPages(context: any, limit: number = 5): Promise<any[]> {
    const similarPages = [];
    const targetService = context.service?.toLowerCase();
    const targetCity = context.city?.toLowerCase();

    for (const entry of this.memoryCache.values()) {
      const key = entry.key.toLowerCase();
      
      // Calculate similarity score
      let score = 0;
      if (targetService && key.includes(targetService)) score += 2;
      if (targetCity && key.includes(targetCity)) score += 1;
      if (context.type && key.includes(context.type)) score += 1;
      
      if (score > 0) {
        similarPages.push({
          content: entry.content,
          score,
          key: entry.key
        });
      }
    }

    // Sort by similarity score and return top matches
    return similarPages
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);
  }

  // Get cache statistics
  getStats(): CacheStats {
    const providers: Record<string, number> = {};
    const accessCounts: Array<{ key: string; count: number }> = [];
    let totalCostSaved = 0;

    for (const entry of this.memoryCache.values()) {
      // Provider stats
      providers[entry.metadata.provider] = (providers[entry.metadata.provider] || 0) + 1;
      
      // Cost saved (for cache hits)
      if (entry.metadata.accessCount > 1) {
        totalCostSaved += entry.metadata.cost * (entry.metadata.accessCount - 1);
      }
      
      // Access counts
      accessCounts.push({
        key: entry.key,
        count: entry.metadata.accessCount
      });
    }

    // Sort by access count
    accessCounts.sort((a, b) => b.count - a.count);

    const hitRate = this.hits / (this.hits + this.misses) || 0;

    return {
      totalEntries: this.memoryCache.size,
      totalSize: this.currentMemorySize,
      totalCostSaved,
      hitRate,
      providers,
      topAccessed: accessCounts.slice(0, 10)
    };
  }

  // Clear cache
  async clear(): Promise<void> {
    this.memoryCache.clear();
    this.currentMemorySize = 0;
    this.hits = 0;
    this.misses = 0;

    // Clear disk cache
    try {
      const files = await fs.readdir(this.cacheDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          await fs.unlink(path.join(this.cacheDir, file));
        }
      }
    } catch (error) {
      console.error('Failed to clear disk cache:', error);
    }

    console.log('🧹 Cache cleared');
  }

  // Prune old entries
  async prune(maxAgeHours: number = 24 * 7): Promise<number> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - maxAgeHours);
    
    let prunedCount = 0;

    // Prune memory cache
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.metadata.lastAccessed < cutoffTime) {
        this.memoryCache.delete(key);
        this.currentMemorySize -= entry.metadata.size;
        prunedCount++;
      }
    }

    // Prune disk cache
    try {
      const files = await fs.readdir(this.cacheDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          const stats = await fs.stat(filePath);
          
          if (stats.mtime < cutoffTime) {
            await fs.unlink(filePath);
            prunedCount++;
          }
        }
      }
    } catch (error) {
      console.error('Failed to prune disk cache:', error);
    }

    console.log(`🧹 Pruned ${prunedCount} old cache entries`);
    return prunedCount;
  }

  // Export cache for analysis
  async exportCache(outputPath: string): Promise<void> {
    const stats = this.getStats();
    const entries = Array.from(this.memoryCache.values()).map(entry => ({
      key: entry.key,
      provider: entry.metadata.provider,
      size: entry.metadata.size,
      cost: entry.metadata.cost,
      accessCount: entry.metadata.accessCount,
      createdAt: entry.metadata.createdAt,
      lastAccessed: entry.metadata.lastAccessed
    }));

    const report = {
      stats,
      entries,
      summary: {
        totalEntries: entries.length,
        totalSize: this.formatSize(this.currentMemorySize),
        totalCostSaved: `$${stats.totalCostSaved.toFixed(2)}`,
        averageHitRate: `${(stats.hitRate * 100).toFixed(1)}%`,
        mostUsedProvider: Object.entries(stats.providers)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || 'none'
      }
    };

    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
    console.log(`📊 Cache report exported to ${outputPath}`);
  }

  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  // Preload cache with common patterns
  async preloadCommonPatterns(businessTypes: string[], cities: string[], services: string[]): Promise<void> {
    console.log('🔄 Preloading common patterns into cache...');
    
    const commonPatterns = [];
    
    // Common service pages
    for (const service of services) {
      commonPatterns.push({
        key: `template-service-${service}`,
        content: this.generateServiceTemplate(service)
      });
    }
    
    // Common city pages
    for (const city of cities) {
      commonPatterns.push({
        key: `template-city-${city}`,
        content: this.generateCityTemplate(city)
      });
    }
    
    // Common combinations
    for (const service of services.slice(0, 5)) {
      for (const city of cities.slice(0, 10)) {
        commonPatterns.push({
          key: `template-${service}-${city}`,
          content: this.generateServiceCityTemplate(service, city)
        });
      }
    }
    
    // Load patterns into cache
    for (const pattern of commonPatterns) {
      await this.set(pattern.key, pattern.content, {
        provider: 'template',
        cost: 0
      });
    }
    
    console.log(`✅ Preloaded ${commonPatterns.length} common patterns`);
  }

  private generateServiceTemplate(service: string): any {
    return {
      title: `${service} - Services professionnels`,
      sections: {
        intro: `Découvrez nos services de ${service} de qualité professionnelle...`,
        benefits: `Pourquoi choisir nos services de ${service}...`,
        process: `Notre processus pour ${service}...`
      }
    };
  }

  private generateCityTemplate(city: string): any {
    return {
      title: `Services à ${city}`,
      sections: {
        intro: `Nous intervenons à ${city} et ses environs...`,
        services: `Tous nos services disponibles à ${city}...`,
        contact: `Contactez-nous pour une intervention à ${city}...`
      }
    };
  }

  private generateServiceCityTemplate(service: string, city: string): any {
    return {
      title: `${service} à ${city}`,
      sections: {
        intro: `Votre expert en ${service} à ${city}...`,
        expertise: `Notre expertise en ${service} dans la région de ${city}...`,
        testimonials: `Ce que disent nos clients à ${city}...`
      }
    };
  }
}
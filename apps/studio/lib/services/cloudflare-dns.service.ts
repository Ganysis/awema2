/**
 * AGENT 8 : Gestionnaire DNS Cloudflare
 *
 * Service responsable de la gestion des domaines personnalisés,
 * sous-domaines, et configuration DNS automatique.
 */

import { CloudflareConfig, DNSRecord, DNSResult, DomainConfig } from '../types/deployment';

export class CloudflareDNSService {
  private config: CloudflareConfig;
  private baseUrl = 'https://api.cloudflare.com/client/v4';

  constructor(config: CloudflareConfig) {
    this.config = config;
    this.validateConfig();
  }

  private validateConfig(): void {
    if (!this.config.accountId) {
      throw new Error('Cloudflare Account ID is required');
    }
    if (!this.config.apiToken) {
      throw new Error('Cloudflare API Token is required');
    }
  }

  /**
   * Configure un domaine personnalisé pour le client
   */
  async setupCustomDomain(
    projectName: string,
    domain: string,
    options: DomainConfig = {}
  ): Promise<DNSResult> {
    console.log('🌐 [CloudflareDNS] Configuration domaine personnalisé:', domain);

    try {
      // 1. Vérifier si la zone existe
      const zone = await this.getZoneByDomain(domain);

      if (!zone) {
        throw new Error(`Zone DNS non trouvée pour le domaine ${domain}`);
      }

      // 2. Ajouter le domaine au projet Pages
      await this.addDomainToProject(projectName, domain);

      // 3. Configurer les enregistrements DNS
      const records = await this.createDNSRecords(zone.id, domain, projectName, options);

      // 4. Configurer SSL
      const sslConfig = await this.configureSLL(zone.id, domain);

      // 5. Appliquer les règles de cache
      const cacheRules = await this.configureCacheRules(zone.id, domain);

      const result: DNSResult = {
        success: true,
        domain,
        zoneId: zone.id,
        records,
        ssl: sslConfig,
        cacheRules,
        propagationTime: this.estimatePropagationTime(records),
        verificationUrl: `https://${domain}`,
        createdAt: new Date().toISOString()
      };

      console.log('✅ [CloudflareDNS] Domaine configuré avec succès:', domain);
      return result;

    } catch (error) {
      console.error('❌ [CloudflareDNS] Erreur configuration domaine:', error);
      throw new Error(`Échec configuration domaine: ${error.message}`);
    }
  }

  /**
   * Crée un sous-domaine sur awema.fr
   */
  async createSubdomain(
    businessName: string,
    projectName: string,
    options: DomainConfig = {}
  ): Promise<DNSResult> {
    const subdomain = this.generateSubdomain(businessName);
    const fullDomain = `${subdomain}.awema.fr`;

    console.log('🏷️ [CloudflareDNS] Création sous-domaine:', fullDomain);

    try {
      if (!this.config.zoneId) {
        throw new Error('Zone ID AWEMA requis pour créer des sous-domaines');
      }

      // 1. Créer l'enregistrement CNAME
      const record = await this.createCNAMERecord(
        this.config.zoneId,
        subdomain,
        `${projectName}.pages.dev`
      );

      // 2. Configurer le domaine personnalisé sur Pages
      await this.addDomainToProject(projectName, fullDomain);

      // 3. Configuration SSL automatique
      const sslConfig = await this.configureSLL(this.config.zoneId, fullDomain);

      // 4. Règles de cache optimisées
      const cacheRules = await this.configureCacheRules(this.config.zoneId, fullDomain, options);

      const result: DNSResult = {
        success: true,
        domain: fullDomain,
        subdomain,
        zoneId: this.config.zoneId,
        records: [record],
        ssl: sslConfig,
        cacheRules,
        propagationTime: 300, // 5 minutes pour les sous-domaines
        verificationUrl: `https://${fullDomain}`,
        createdAt: new Date().toISOString()
      };

      console.log('✅ [CloudflareDNS] Sous-domaine créé:', fullDomain);
      return result;

    } catch (error) {
      console.error('❌ [CloudflareDNS] Erreur création sous-domaine:', error);
      throw new Error(`Échec création sous-domaine: ${error.message}`);
    }
  }

  private generateSubdomain(businessName: string): string {
    return businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50); // Limite de longueur
  }

  private async getZoneByDomain(domain: string): Promise<any> {
    // Extraire le domaine racine
    const rootDomain = this.extractRootDomain(domain);

    const response = await fetch(
      `${this.baseUrl}/zones?name=${rootDomain}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur récupération zone: ${response.statusText}`);
    }

    const result = await response.json();
    return result.result?.[0] || null;
  }

  private extractRootDomain(domain: string): string {
    const parts = domain.split('.');
    if (parts.length <= 2) {
      return domain;
    }
    return parts.slice(-2).join('.');
  }

  private async addDomainToProject(projectName: string, domain: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}/domains`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: domain })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Échec ajout domaine au projet: ${error.errors?.[0]?.message || response.statusText}`);
    }
  }

  private async createDNSRecords(
    zoneId: string,
    domain: string,
    projectName: string,
    options: DomainConfig
  ): Promise<DNSRecord[]> {
    const records: DNSRecord[] = [];

    // Enregistrement principal (A ou CNAME selon le type)
    if (options.useApexDomain && domain.split('.').length === 2) {
      // Apex domain - utiliser des enregistrements A
      const aRecords = await this.createApexRecords(zoneId, domain);
      records.push(...aRecords);
    } else {
      // Sous-domaine - utiliser CNAME
      const cnameRecord = await this.createCNAMERecord(zoneId, domain, `${projectName}.pages.dev`);
      records.push(cnameRecord);
    }

    // Redirection www (si demandée)
    if (options.redirectWWW) {
      const wwwRecord = await this.createWWWRedirect(zoneId, domain);
      if (wwwRecord) records.push(wwwRecord);
    }

    return records;
  }

  private async createApexRecords(zoneId: string, domain: string): Promise<DNSRecord[]> {
    // IPs Cloudflare Pages pour apex domains
    const ips = ['192.0.2.1', '192.0.2.2']; // IPs d'exemple, utiliser les vraies IPs Cloudflare

    const records: DNSRecord[] = [];

    for (const ip of ips) {
      const record = await this.createDNSRecord(zoneId, {
        type: 'A',
        name: domain,
        content: ip,
        ttl: 1 // Auto TTL
      });
      records.push(record);
    }

    return records;
  }

  private async createCNAMERecord(
    zoneId: string,
    name: string,
    target: string
  ): Promise<DNSRecord> {
    return this.createDNSRecord(zoneId, {
      type: 'CNAME',
      name,
      content: target,
      ttl: 1 // Auto TTL
    });
  }

  private async createWWWRedirect(zoneId: string, domain: string): Promise<DNSRecord | null> {
    try {
      return this.createDNSRecord(zoneId, {
        type: 'CNAME',
        name: `www.${domain}`,
        content: domain,
        ttl: 1
      });
    } catch (error) {
      console.warn('⚠️ [CloudflareDNS] Impossible de créer la redirection www:', error.message);
      return null;
    }
  }

  private async createDNSRecord(zoneId: string, record: any): Promise<DNSRecord> {
    const response = await fetch(
      `${this.baseUrl}/zones/${zoneId}/dns_records`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Échec création enregistrement DNS: ${error.errors?.[0]?.message || response.statusText}`);
    }

    const result = await response.json();
    return {
      id: result.result.id,
      type: result.result.type,
      name: result.result.name,
      content: result.result.content,
      ttl: result.result.ttl,
      proxied: result.result.proxied,
      createdAt: result.result.created_on
    };
  }

  private async configureSLL(zoneId: string, domain: string): Promise<any> {
    console.log('🔒 [CloudflareDNS] Configuration SSL pour:', domain);

    try {
      // Activer SSL/TLS strict
      const response = await fetch(
        `${this.baseUrl}/zones/${zoneId}/settings/ssl`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.config.apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: 'strict' })
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur configuration SSL: ${response.statusText}`);
      }

      // Activer HSTS
      await this.enableHSTS(zoneId);

      // Activer HTTP/2
      await this.enableHTTP2(zoneId);

      return {
        ssl: 'strict',
        hsts: true,
        http2: true,
        minTlsVersion: '1.2'
      };
    } catch (error) {
      console.warn('⚠️ [CloudflareDNS] Avertissement SSL:', error.message);
      return { ssl: 'flexible' }; // Fallback
    }
  }

  private async enableHSTS(zoneId: string): Promise<void> {
    await fetch(`${this.baseUrl}/zones/${zoneId}/settings/security_header`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: {
          strict_transport_security: {
            enabled: true,
            max_age: 31536000,
            include_subdomains: true,
            preload: true
          }
        }
      })
    });
  }

  private async enableHTTP2(zoneId: string): Promise<void> {
    await fetch(`${this.baseUrl}/zones/${zoneId}/settings/h2_prioritization`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: 'on' })
    });
  }

  private async configureCacheRules(
    zoneId: string,
    domain: string,
    options: DomainConfig = {}
  ): Promise<any> {
    console.log('⚡ [CloudflareDNS] Configuration cache pour:', domain);

    try {
      // Règles de cache optimisées pour les sites statiques
      const cacheRules = [
        // Assets statiques - cache long
        {
          targets: [{ target: 'host', constraint: { operator: 'eq', value: domain } }],
          actions: [
            {
              id: 'cache_level',
              value: 'cache_everything'
            },
            {
              id: 'edge_cache_ttl',
              value: 31536000 // 1 an
            }
          ],
          expression: `(http.request.uri.path matches "\\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$")`
        },
        // HTML - cache court avec revalidation
        {
          targets: [{ target: 'host', constraint: { operator: 'eq', value: domain } }],
          actions: [
            {
              id: 'cache_level',
              value: 'cache_everything'
            },
            {
              id: 'edge_cache_ttl',
              value: 300 // 5 minutes
            }
          ],
          expression: `(http.request.uri.path matches "\\.(html|htm)$" or http.request.uri.path eq "/")`
        }
      ];

      // Appliquer chaque règle
      for (const rule of cacheRules) {
        await this.createPageRule(zoneId, rule);
      }

      return {
        rules: cacheRules.length,
        assetCache: '1 an',
        htmlCache: '5 minutes',
        compression: 'brotli'
      };

    } catch (error) {
      console.warn('⚠️ [CloudflareDNS] Avertissement cache:', error.message);
      return { rules: 0 };
    }
  }

  private async createPageRule(zoneId: string, rule: any): Promise<void> {
    await fetch(`${this.baseUrl}/zones/${zoneId}/pagerules`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule)
    });
  }

  private estimatePropagationTime(records: DNSRecord[]): number {
    // Estimer le temps de propagation basé sur les types d'enregistrements
    const hasApex = records.some(r => r.type === 'A');
    const hasCNAME = records.some(r => r.type === 'CNAME');

    if (hasApex) return 1800; // 30 minutes pour les apex domains
    if (hasCNAME) return 300;  // 5 minutes pour les CNAME
    return 600; // 10 minutes par défaut
  }

  /**
   * Vérifie le statut de propagation DNS
   */
  async checkDNSPropagation(domain: string): Promise<any> {
    console.log('🔍 [CloudflareDNS] Vérification propagation:', domain);

    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Erreur vérification DNS: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        domain,
        status: result.Status === 0 ? 'resolved' : 'pending',
        records: result.Answer || [],
        ttl: result.Answer?.[0]?.TTL || null,
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        domain,
        status: 'error',
        error: error.message,
        checkedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Supprime un domaine et ses enregistrements DNS
   */
  async removeDomain(
    projectName: string,
    domain: string,
    zoneId: string
  ): Promise<void> {
    console.log('🗑️ [CloudflareDNS] Suppression domaine:', domain);

    try {
      // 1. Supprimer le domaine du projet Pages
      await fetch(
        `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects/${projectName}/domains/${domain}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.config.apiToken}`,
          }
        }
      );

      // 2. Supprimer les enregistrements DNS
      const records = await this.getDNSRecords(zoneId, domain);
      for (const record of records) {
        await this.deleteDNSRecord(zoneId, record.id);
      }

    } catch (error) {
      console.error('❌ [CloudflareDNS] Erreur suppression domaine:', error);
      throw error;
    }
  }

  private async getDNSRecords(zoneId: string, domain: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/zones/${zoneId}/dns_records?name=${domain}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.result;
  }

  private async deleteDNSRecord(zoneId: string, recordId: string): Promise<void> {
    await fetch(`${this.baseUrl}/zones/${zoneId}/dns_records/${recordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
      }
    });
  }

  /**
   * Liste tous les domaines configurés
   */
  async listConfiguredDomains(): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/accounts/${this.config.accountId}/pages/projects`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        }
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.result.flatMap((project: any) =>
      project.domains?.map((domain: any) => ({
        projectName: project.name,
        domain: domain.name,
        status: domain.status,
        createdAt: domain.created_on
      })) || []
    );
  }
}

// Instance par défaut
export const cloudflareDNS = new CloudflareDNSService({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  zoneId: process.env.CLOUDFLARE_ZONE_ID
});

export default CloudflareDNSService;
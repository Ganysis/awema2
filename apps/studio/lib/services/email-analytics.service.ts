import fs from 'fs/promises';
import path from 'path';

export interface EmailEvent {
  id: string;
  timestamp: string;
  event: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'unsubscribed';
  trackingId: string;
  clientId?: string;
  clientEmail: string;
  source?: string;
  targetUrl?: string;
  userAgent?: string;
  ip?: string;
  referer?: string;
  metadata?: Record<string, any>;
}

export interface EmailStats {
  trackingId: string;
  clientEmail: string;
  sentAt: string;
  deliveredAt?: string;
  firstOpenAt?: string;
  lastOpenAt?: string;
  firstClickAt?: string;
  lastClickAt?: string;
  openCount: number;
  clickCount: number;
  clicks: Array<{
    timestamp: string;
    source: string;
    targetUrl: string;
  }>;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained';
  deviceInfo?: {
    device: string;
    browser: string;
    os: string;
  };
}

export interface CampaignStats {
  campaignId: string;
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalComplaints: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
  bounceRate: number;
  complaintRate: number;
  topLinks: Array<{
    url: string;
    clicks: number;
    percentage: number;
  }>;
  timeStats: {
    avgTimeToOpen?: string;
    avgTimeToClick?: string;
    bestOpenHour: number;
    bestClickHour: number;
  };
}

class EmailAnalyticsService {
  private eventsFile = '/tmp/claude/email-events.json';
  private statsFile = '/tmp/claude/email-stats.json';

  /**
   * Enregistre un événement email
   */
  async logEvent(event: Omit<EmailEvent, 'id' | 'timestamp'>): Promise<string> {
    const fullEvent: EmailEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date().toISOString()
    };

    try {
      // S'assurer que le répertoire existe
      await fs.mkdir(path.dirname(this.eventsFile), { recursive: true });

      // Lire les événements existants
      let events: EmailEvent[] = [];
      try {
        const data = await fs.readFile(this.eventsFile, 'utf-8');
        events = JSON.parse(data);
      } catch {
        // Fichier n'existe pas encore
      }

      // Ajouter le nouvel événement
      events.push(fullEvent);

      // Garder seulement les 10000 derniers événements pour éviter que le fichier devienne trop gros
      if (events.length > 10000) {
        events = events.slice(-10000);
      }

      // Sauvegarder
      await fs.writeFile(this.eventsFile, JSON.stringify(events, null, 2));

      console.log(`📊 Événement email enregistré: ${fullEvent.event} - ${fullEvent.trackingId}`);

      // Mettre à jour les statistiques
      await this.updateStats(fullEvent);

      return fullEvent.id;

    } catch (error) {
      console.error('❌ Erreur enregistrement événement email:', error);
      throw error;
    }
  }

  /**
   * Obtient les statistiques pour un tracking ID spécifique
   */
  async getEmailStats(trackingId: string): Promise<EmailStats | null> {
    try {
      const events = await this.getEvents();
      const emailEvents = events.filter(e => e.trackingId === trackingId);

      if (emailEvents.length === 0) {
        return null;
      }

      return this.calculateEmailStats(emailEvents);

    } catch (error) {
      console.error('❌ Erreur récupération stats email:', error);
      return null;
    }
  }

  /**
   * Obtient les statistiques globales d'une campagne
   */
  async getCampaignStats(campaignId?: string): Promise<CampaignStats> {
    try {
      const events = await this.getEvents();
      const campaignEvents = campaignId
        ? events.filter(e => e.metadata?.campaignId === campaignId)
        : events;

      return this.calculateCampaignStats(campaignEvents);

    } catch (error) {
      console.error('❌ Erreur calcul stats campagne:', error);
      throw error;
    }
  }

  /**
   * Obtient le tableau de bord d'analytics complet
   */
  async getAnalyticsDashboard(period = '7d'): Promise<{
    overview: CampaignStats;
    recentEmails: EmailStats[];
    trends: {
      daily: Array<{
        date: string;
        sent: number;
        opened: number;
        clicked: number;
      }>;
      hourly: Array<{
        hour: number;
        opens: number;
        clicks: number;
      }>;
    };
    topPerformers: {
      emails: EmailStats[];
      links: Array<{
        url: string;
        clicks: number;
        emails: number;
      }>;
    };
  }> {
    const events = await this.getEvents();
    const cutoffDate = this.getCutoffDate(period);
    const recentEvents = events.filter(e => new Date(e.timestamp) >= cutoffDate);

    return {
      overview: this.calculateCampaignStats(recentEvents),
      recentEmails: await this.getRecentEmailStats(20),
      trends: this.calculateTrends(recentEvents),
      topPerformers: this.getTopPerformers(recentEvents)
    };
  }

  /**
   * Exporte les données d'analytics
   */
  async exportAnalytics(format: 'json' | 'csv' = 'json', period = '30d'): Promise<{
    data: any;
    filename: string;
  }> {
    const cutoffDate = this.getCutoffDate(period);
    const events = await this.getEvents();
    const filteredEvents = events.filter(e => new Date(e.timestamp) >= cutoffDate);

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `email-analytics-${timestamp}.${format}`;

    if (format === 'csv') {
      const csv = this.convertToCSV(filteredEvents);
      return { data: csv, filename };
    }

    return {
      data: {
        period,
        exportedAt: new Date().toISOString(),
        totalEvents: filteredEvents.length,
        events: filteredEvents,
        summary: this.calculateCampaignStats(filteredEvents)
      },
      filename
    };
  }

  /**
   * Met à jour les statistiques après un nouvel événement
   */
  private async updateStats(event: EmailEvent): Promise<void> {
    try {
      // Lire les stats existantes
      let allStats: Record<string, EmailStats> = {};
      try {
        const data = await fs.readFile(this.statsFile, 'utf-8');
        allStats = JSON.parse(data);
      } catch {
        // Fichier n'existe pas encore
      }

      // Obtenir ou créer les stats pour ce tracking ID
      const existingStats = allStats[event.trackingId];

      if (!existingStats && event.event === 'sent') {
        allStats[event.trackingId] = {
          trackingId: event.trackingId,
          clientEmail: event.clientEmail,
          sentAt: event.timestamp,
          openCount: 0,
          clickCount: 0,
          clicks: [],
          status: 'sent'
        };
      } else if (existingStats) {
        // Mettre à jour les stats existantes
        this.updateExistingStats(existingStats, event);
      }

      // Sauvegarder
      await fs.writeFile(this.statsFile, JSON.stringify(allStats, null, 2));

    } catch (error) {
      console.error('❌ Erreur mise à jour stats:', error);
    }
  }

  /**
   * Met à jour les statistiques existantes avec un nouvel événement
   */
  private updateExistingStats(stats: EmailStats, event: EmailEvent): void {
    switch (event.event) {
      case 'delivered':
        stats.deliveredAt = event.timestamp;
        if (stats.status === 'sent') stats.status = 'delivered';
        break;

      case 'opened':
        if (!stats.firstOpenAt) {
          stats.firstOpenAt = event.timestamp;
        }
        stats.lastOpenAt = event.timestamp;
        stats.openCount++;
        if (stats.status === 'delivered' || stats.status === 'sent') {
          stats.status = 'opened';
        }
        break;

      case 'clicked':
        if (!stats.firstClickAt) {
          stats.firstClickAt = event.timestamp;
        }
        stats.lastClickAt = event.timestamp;
        stats.clickCount++;
        stats.clicks.push({
          timestamp: event.timestamp,
          source: event.source || 'unknown',
          targetUrl: event.targetUrl || ''
        });
        stats.status = 'clicked';
        break;

      case 'bounced':
        stats.status = 'bounced';
        break;

      case 'complained':
        stats.status = 'complained';
        break;
    }

    // Ajouter les infos de device si disponibles
    if (event.userAgent && !stats.deviceInfo) {
      stats.deviceInfo = this.parseUserAgent(event.userAgent);
    }
  }

  /**
   * Calcule les statistiques pour un email spécifique
   */
  private calculateEmailStats(events: EmailEvent[]): EmailStats {
    const sent = events.find(e => e.event === 'sent');
    if (!sent) {
      throw new Error('Aucun événement "sent" trouvé');
    }

    const stats: EmailStats = {
      trackingId: sent.trackingId,
      clientEmail: sent.clientEmail,
      sentAt: sent.timestamp,
      openCount: 0,
      clickCount: 0,
      clicks: [],
      status: 'sent'
    };

    events.forEach(event => {
      this.updateExistingStats(stats, event);
    });

    return stats;
  }

  /**
   * Calcule les statistiques d'une campagne
   */
  private calculateCampaignStats(events: EmailEvent[]): CampaignStats {
    const byType = this.groupEventsByType(events);

    const totalSent = byType.sent?.length || 0;
    const totalDelivered = byType.delivered?.length || 0;
    const totalOpened = byType.opened?.length || 0;
    const totalClicked = byType.clicked?.length || 0;
    const totalBounced = byType.bounced?.length || 0;
    const totalComplaints = byType.complained?.length || 0;

    return {
      campaignId: 'default',
      totalSent,
      totalDelivered,
      totalOpened,
      totalClicked,
      totalBounced,
      totalComplaints,
      deliveryRate: totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0,
      openRate: totalSent > 0 ? (totalOpened / totalSent) * 100 : 0,
      clickRate: totalSent > 0 ? (totalClicked / totalSent) * 100 : 0,
      clickToOpenRate: totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0,
      bounceRate: totalSent > 0 ? (totalBounced / totalSent) * 100 : 0,
      complaintRate: totalSent > 0 ? (totalComplaints / totalSent) * 100 : 0,
      topLinks: this.getTopLinks(byType.clicked || []),
      timeStats: this.calculateTimeStats(events)
    };
  }

  /**
   * Obtient les liens les plus cliqués
   */
  private getTopLinks(clickEvents: EmailEvent[]): Array<{ url: string; clicks: number; percentage: number }> {
    const linkCounts = clickEvents.reduce((acc, event) => {
      const url = event.targetUrl || 'unknown';
      acc[url] = (acc[url] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalClicks = clickEvents.length;

    return Object.entries(linkCounts)
      .map(([url, clicks]) => ({
        url,
        clicks,
        percentage: totalClicks > 0 ? (clicks / totalClicks) * 100 : 0
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);
  }

  /**
   * Calcule les statistiques temporelles
   */
  private calculateTimeStats(events: EmailEvent[]): CampaignStats['timeStats'] {
    const openEvents = events.filter(e => e.event === 'opened');
    const clickEvents = events.filter(e => e.event === 'clicked');

    const hourCounts = { opens: new Array(24).fill(0), clicks: new Array(24).fill(0) };

    openEvents.forEach(event => {
      const hour = new Date(event.timestamp).getHours();
      hourCounts.opens[hour]++;
    });

    clickEvents.forEach(event => {
      const hour = new Date(event.timestamp).getHours();
      hourCounts.clicks[hour]++;
    });

    const bestOpenHour = hourCounts.opens.indexOf(Math.max(...hourCounts.opens));
    const bestClickHour = hourCounts.clicks.indexOf(Math.max(...hourCounts.clicks));

    return {
      bestOpenHour,
      bestClickHour
    };
  }

  /**
   * Calcule les tendances quotidiennes et horaires
   */
  private calculateTrends(events: EmailEvent[]): {
    daily: Array<{ date: string; sent: number; opened: number; clicked: number; }>;
    hourly: Array<{ hour: number; opens: number; clicks: number; }>;
  } {
    // Tendances quotidiennes
    const dailyStats: Record<string, { sent: number; opened: number; clicked: number }> = {};

    events.forEach(event => {
      const date = event.timestamp.slice(0, 10); // YYYY-MM-DD
      if (!dailyStats[date]) {
        dailyStats[date] = { sent: 0, opened: 0, clicked: 0 };
      }

      if (event.event === 'sent') dailyStats[date].sent++;
      if (event.event === 'opened') dailyStats[date].opened++;
      if (event.event === 'clicked') dailyStats[date].clicked++;
    });

    const daily = Object.entries(dailyStats)
      .map(([date, stats]) => ({ date, ...stats }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Tendances horaires
    const hourlyStats = new Array(24).fill(0).map((_, hour) => ({
      hour,
      opens: 0,
      clicks: 0
    }));

    events.forEach(event => {
      const hour = new Date(event.timestamp).getHours();
      if (event.event === 'opened') hourlyStats[hour].opens++;
      if (event.event === 'clicked') hourlyStats[hour].clicks++;
    });

    return { daily, hourly: hourlyStats };
  }

  /**
   * Obtient les top performers
   */
  private getTopPerformers(events: EmailEvent[]): {
    emails: EmailStats[];
    links: Array<{ url: string; clicks: number; emails: number; }>;
  } {
    // Pour simplifier, on retourne des données vides
    // Dans une vraie implémentation, on calculerait les meilleures performances
    return {
      emails: [],
      links: []
    };
  }

  /**
   * Obtient les statistiques des emails récents
   */
  private async getRecentEmailStats(limit: number): Promise<EmailStats[]> {
    const events = await this.getEvents();
    const sentEvents = events.filter(e => e.event === 'sent');

    // Prendre les plus récents
    const recentSent = sentEvents
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    const statsPromises = recentSent.map(sent =>
      this.getEmailStats(sent.trackingId)
    );

    const results = await Promise.all(statsPromises);
    return results.filter(Boolean) as EmailStats[];
  }

  /**
   * Utilitaires privés
   */
  private async getEvents(): Promise<EmailEvent[]> {
    try {
      const data = await fs.readFile(this.eventsFile, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private groupEventsByType(events: EmailEvent[]): Record<string, EmailEvent[]> {
    return events.reduce((acc, event) => {
      if (!acc[event.event]) {
        acc[event.event] = [];
      }
      acc[event.event].push(event);
      return acc;
    }, {} as Record<string, EmailEvent[]>);
  }

  private getCutoffDate(period: string): Date {
    const now = new Date();
    const match = period.match(/^(\d+)([dhwm])$/);

    if (!match) {
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 jours par défaut
    }

    const [, amount, unit] = match;
    const value = parseInt(amount);

    switch (unit) {
      case 'd': return new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
      case 'h': return new Date(now.getTime() - value * 60 * 60 * 1000);
      case 'w': return new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000);
      case 'm': return new Date(now.getTime() - value * 30 * 24 * 60 * 60 * 1000);
      default: return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }

  private parseUserAgent(userAgent: string): { device: string; browser: string; os: string } {
    // Parsing très simple - dans une vraie app, on utiliserait une librairie dédiée
    return {
      device: userAgent.includes('Mobile') ? 'mobile' : 'desktop',
      browser: userAgent.includes('Chrome') ? 'Chrome' : 'Unknown',
      os: userAgent.includes('Windows') ? 'Windows' : userAgent.includes('Mac') ? 'macOS' : 'Unknown'
    };
  }

  private convertToCSV(events: EmailEvent[]): string {
    const headers = 'ID,Timestamp,Event,TrackingID,ClientEmail,Source,TargetURL,UserAgent,IP\n';
    const rows = events.map(e =>
      `${e.id},${e.timestamp},${e.event},${e.trackingId},${e.clientEmail},${e.source || ''},${e.targetUrl || ''},${e.userAgent || ''},${e.ip || ''}`
    ).join('\n');

    return headers + rows;
  }

  private generateEventId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

// Instance singleton
export const emailAnalyticsService = new EmailAnalyticsService();

export default EmailAnalyticsService;
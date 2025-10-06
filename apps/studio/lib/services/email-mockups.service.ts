import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export interface EmailConfig {
  provider: 'brevo' | 'sendgrid' | 'resend';
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo: string;
  trackingDomain?: string;
}

export interface MockupData {
  id: string;
  name: string;
  url: string;
  screenshot?: string;
  description: string;
  style: 'modern' | 'premium' | 'tech' | 'robust';
}

export interface WorkflowData {
  clientId: string;
  clientName: string;
  clientEmail: string;
  businessName: string;
  metier: string;
  ville: string;
  phone?: string;
  requestId: string;
}

interface EmailTrackingData {
  workflowId: string;
  clientEmail: string;
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  trackingId: string;
}

class EmailMockupsService {
  private config: EmailConfig;
  private trackingData: Map<string, EmailTrackingData> = new Map();

  constructor(config: EmailConfig) {
    this.config = config;
  }

  /**
   * Service principal d'envoi des mockups par email
   */
  async sendMockupsEmail(workflow: WorkflowData, mockups: MockupData[]): Promise<{
    success: boolean;
    trackingId?: string;
    error?: string;
  }> {
    try {
      console.log(`📧 Envoi des mockups à ${workflow.clientEmail}`);

      // 1. Générer les screenshots
      const mockupsWithScreenshots = await this.generateScreenshots(mockups);

      // 2. Générer l'ID de tracking
      const trackingId = this.generateTrackingId();

      // 3. Créer les URLs avec tracking
      const trackedMockups = this.addTrackingToMockups(mockupsWithScreenshots, trackingId);

      // 4. Générer le contenu de l'email
      const emailContent = await this.generateEmailContent(workflow, trackedMockups, trackingId);

      // 5. Envoyer l'email
      const result = await this.sendEmail({
        to: workflow.clientEmail,
        subject: `🎨 Vos 3 propositions de site web sont prêtes !`,
        html: emailContent.html,
        text: emailContent.text,
        attachments: this.getScreenshotAttachments(mockupsWithScreenshots)
      });

      // 6. Enregistrer les données de tracking
      this.trackingData.set(trackingId, {
        workflowId: workflow.requestId,
        clientEmail: workflow.clientEmail,
        sentAt: new Date(),
        trackingId
      });

      // 7. Programmer la relance automatique
      this.scheduleFollowUp(workflow, trackingId);

      console.log(`✅ Email envoyé avec succès - Tracking ID: ${trackingId}`);

      return {
        success: true,
        trackingId
      };

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Génère des screenshots des mockups
   */
  private async generateScreenshots(mockups: MockupData[]): Promise<MockupData[]> {
    console.log('📸 Génération des screenshots...');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results = await Promise.all(
      mockups.map(async (mockup) => {
        try {
          const page = await browser.newPage();
          await page.setViewport({ width: 1200, height: 800 });
          await page.goto(mockup.url, { waitUntil: 'networkidle0', timeout: 30000 });

          // Attendre que le contenu soit chargé
          await page.waitForTimeout(2000);

          const screenshotPath = `/tmp/claude/screenshot-${mockup.id}.jpg`;
          await page.screenshot({
            path: screenshotPath,
            type: 'jpeg',
            quality: 85,
            fullPage: false
          });

          await page.close();

          return {
            ...mockup,
            screenshot: screenshotPath
          };
        } catch (error) {
          console.error(`Erreur screenshot pour ${mockup.name}:`, error);
          return mockup;
        }
      })
    );

    await browser.close();
    return results;
  }

  /**
   * Ajoute le tracking aux URLs des mockups
   */
  private addTrackingToMockups(mockups: MockupData[], trackingId: string): MockupData[] {
    return mockups.map(mockup => ({
      ...mockup,
      url: this.addTrackingParams(mockup.url, trackingId, `mockup-${mockup.id}`)
    }));
  }

  /**
   * Génère le contenu HTML et texte de l'email
   */
  private async generateEmailContent(
    workflow: WorkflowData,
    mockups: MockupData[],
    trackingId: string
  ): Promise<{ html: string; text: string }> {

    const trackingPixel = `<img src="${this.config.trackingDomain}/api/emails/track/open/${trackingId}" width="1" height="1" style="display:none;">`;

    const compareUrl = this.addTrackingParams(
      `/compare-mockups?client=${workflow.clientId}`,
      trackingId,
      'compare-all'
    );

    // Template HTML moderne et responsive
    const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vos propositions de site web</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 20px; }
        .greeting { font-size: 18px; margin-bottom: 30px; }
        .mockup-grid { display: block; margin: 30px 0; }
        .mockup-card { border: 1px solid #e2e8f0; border-radius: 12px; margin: 20px 0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .mockup-image { width: 100%; height: 200px; object-fit: cover; }
        .mockup-info { padding: 20px; }
        .mockup-title { font-size: 20px; font-weight: bold; color: #1a202c; margin-bottom: 8px; }
        .mockup-desc { color: #718096; margin-bottom: 15px; }
        .mockup-btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; }
        .mockup-btn:hover { background: #5a67d8; }
        .compare-section { background: #f7fafc; padding: 30px; border-radius: 12px; text-align: center; margin: 40px 0; }
        .compare-btn { display: inline-block; background: #48bb78; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 18px; font-weight: bold; margin-top: 15px; }
        .footer { background: #2d3748; color: #a0aec0; padding: 30px 20px; text-align: center; }
        .footer a { color: #81e6d9; text-decoration: none; }
        .urgency { background: #fed7d7; border-left: 4px solid #f56565; padding: 15px; margin: 20px 0; border-radius: 4px; }
        @media (max-width: 600px) {
          .header { padding: 30px 15px; }
          .content { padding: 30px 15px; }
          .mockup-title { font-size: 18px; }
          .compare-btn { padding: 14px 24px; font-size: 16px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎨 Vos propositions sont prêtes !</h1>
          <p>3 designs uniques pour ${workflow.businessName}</p>
        </div>

        <div class="content">
          <div class="greeting">
            Bonjour ${workflow.clientName},<br><br>
            Nous avons créé <strong>3 propositions personnalisées</strong> pour ${workflow.businessName}.<br>
            Chaque design est spécialement adapté à votre activité de <strong>${workflow.metier}</strong> à ${workflow.ville}.
          </div>

          <div class="mockup-grid">
            ${mockups.map((mockup, index) => `
              <div class="mockup-card">
                ${mockup.screenshot ? `<img src="cid:screenshot-${mockup.id}" alt="${mockup.name}" class="mockup-image">` : ''}
                <div class="mockup-info">
                  <div class="mockup-title">${mockup.name}</div>
                  <div class="mockup-desc">${mockup.description}</div>
                  <a href="${mockup.url}" class="mockup-btn">Voir cette proposition →</a>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="compare-section">
            <h3>💡 Besoin d'aide pour choisir ?</h3>
            <p>Comparez les 3 propositions côte à côte pour voir celle qui vous correspond le mieux.</p>
            <a href="${compareUrl}" class="compare-btn">Comparer les 3 propositions</a>
          </div>

          <div class="urgency">
            <strong>⏰ Offre limitée :</strong> Ces propositions personnalisées sont disponibles pendant <strong>72 heures</strong>.
          </div>

          <p style="margin-top: 30px;">
            Une question ? Répondez simplement à cet email ou appelez-nous au <strong>04 XX XX XX XX</strong>.<br><br>
            L'équipe AWEMA
          </p>
        </div>

        <div class="footer">
          <p>© 2025 AWEMA - Création de sites web professionnels</p>
          <p><a href="${this.addTrackingParams('/unsubscribe', trackingId, 'unsubscribe')}">Se désabonner</a> |
             <a href="${this.addTrackingParams('/privacy', trackingId, 'privacy')}">Politique de confidentialité</a></p>
        </div>
      </div>
      ${trackingPixel}
    </body>
    </html>`;

    // Version texte simple
    const text = `
Bonjour ${workflow.clientName},

Vos 3 propositions de site web pour ${workflow.businessName} sont prêtes !

${mockups.map((mockup, index) => `
${index + 1}. ${mockup.name}
   ${mockup.description}
   Voir: ${mockup.url}
`).join('\n')}

Comparez les 3 propositions: ${compareUrl}

⏰ Propositions disponibles pendant 72 heures.

Une question ? Répondez à cet email ou appelez au 04 XX XX XX XX.

L'équipe AWEMA
`;

    return { html, text };
  }

  /**
   * Envoie l'email via le provider configuré
   */
  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
    text: string;
    attachments?: any[];
  }): Promise<boolean> {

    let transporter;

    switch (this.config.provider) {
      case 'brevo':
        transporter = nodemailer.createTransporter({
          host: 'smtp-relay.sendinblue.com',
          port: 587,
          secure: false,
          auth: {
            user: this.config.fromEmail,
            pass: this.config.apiKey
          }
        });
        break;

      case 'sendgrid':
        transporter = nodemailer.createTransporter({
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false,
          auth: {
            user: 'apikey',
            pass: this.config.apiKey
          }
        });
        break;

      default:
        throw new Error(`Provider ${this.config.provider} non supporté`);
    }

    const mailOptions = {
      from: `${this.config.fromName} <${this.config.fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: this.config.replyTo,
      attachments: options.attachments || []
    };

    const result = await transporter.sendMail(mailOptions);
    return !!result.messageId;
  }

  /**
   * Prépare les pièces jointes screenshots
   */
  private getScreenshotAttachments(mockups: MockupData[]): any[] {
    return mockups
      .filter(mockup => mockup.screenshot)
      .map(mockup => ({
        filename: `${mockup.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        path: mockup.screenshot,
        cid: `screenshot-${mockup.id}`
      }));
  }

  /**
   * Ajoute les paramètres de tracking à une URL
   */
  private addTrackingParams(url: string, trackingId: string, source: string): string {
    const separator = url.includes('?') ? '&' : '?';
    const trackingParams = new URLSearchParams({
      utm_source: 'email',
      utm_medium: 'mockup-proposal',
      utm_campaign: trackingId,
      utm_content: source,
      tid: trackingId
    });

    return `${url}${separator}${trackingParams.toString()}`;
  }

  /**
   * Génère un ID de tracking unique
   */
  private generateTrackingId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Programme une relance automatique
   */
  private scheduleFollowUp(workflow: WorkflowData, trackingId: string): void {
    setTimeout(() => {
      this.sendFollowUpIfNeeded(workflow, trackingId);
    }, 2 * 24 * 60 * 60 * 1000); // 2 jours
  }

  /**
   * Envoie une relance si l'email n'a pas été ouvert
   */
  private async sendFollowUpIfNeeded(workflow: WorkflowData, trackingId: string): Promise<void> {
    const tracking = this.trackingData.get(trackingId);

    if (tracking && !tracking.openedAt) {
      console.log(`📧 Envoi de relance à ${workflow.clientEmail}`);

      const followUpHtml = `
        <p>Bonjour ${workflow.clientName},</p>
        <p>Vous avez peut-être manqué nos 3 propositions de site web pour ${workflow.businessName} ?</p>
        <p><strong>⏰ Plus que 24h pour en profiter !</strong></p>
        <p><a href="${this.addTrackingParams(`/mockups/${workflow.requestId}`, trackingId, 'followup')}"
              style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Voir mes propositions →
           </a></p>
      `;

      await this.sendEmail({
        to: workflow.clientEmail,
        subject: `⏰ Dernière chance : vos propositions de site web`,
        html: followUpHtml,
        text: `Dernière chance pour voir vos propositions de site web : /mockups/${workflow.requestId}`
      });
    }
  }

  /**
   * Enregistre l'ouverture de l'email
   */
  trackEmailOpen(trackingId: string): void {
    const tracking = this.trackingData.get(trackingId);
    if (tracking && !tracking.openedAt) {
      tracking.openedAt = new Date();
      console.log(`📧 Email ouvert - Tracking: ${trackingId}`);
    }
  }

  /**
   * Enregistre le clic sur un lien
   */
  trackEmailClick(trackingId: string): void {
    const tracking = this.trackingData.get(trackingId);
    if (tracking && !tracking.clickedAt) {
      tracking.clickedAt = new Date();
      console.log(`🖱️ Email cliqué - Tracking: ${trackingId}`);
    }
  }

  /**
   * Obtient les statistiques de tracking
   */
  getTrackingStats(trackingId: string): EmailTrackingData | undefined {
    return this.trackingData.get(trackingId);
  }

  /**
   * Test de configuration email
   */
  async testEmailConfig(): Promise<{ success: boolean; error?: string }> {
    try {
      const testResult = await this.sendEmail({
        to: this.config.fromEmail,
        subject: '🧪 Test configuration AWEMA',
        html: '<p>Configuration email OK ✅</p>',
        text: 'Configuration email OK'
      });

      return { success: testResult };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Instance par défaut avec configuration depuis les variables d'environnement
export const emailMockupsService = new EmailMockupsService({
  provider: (process.env.EMAIL_PROVIDER as any) || 'brevo',
  apiKey: process.env.EMAIL_API_KEY || '',
  fromEmail: process.env.EMAIL_FROM || 'noreply@awema.fr',
  fromName: process.env.EMAIL_FROM_NAME || 'AWEMA - Création de sites web',
  replyTo: process.env.EMAIL_REPLY_TO || 'contact@awema.fr',
  trackingDomain: process.env.NEXT_PUBLIC_BASE_URL || 'https://studio.awema.fr'
});

export default EmailMockupsService;
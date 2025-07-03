import { FormLinkWithRelations } from '../db/services/form-link.service'
import { Client, Project } from '@prisma/client'
import { ClientFormData } from '@/types/client'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import FormSubmissionAdminEmail from './templates/form-submission-admin'
import FormSubmissionClientEmail from './templates/form-submission-client'

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

class EmailService {
  private async sendEmail(options: EmailOptions): Promise<void> {
    const from = options.from || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    
    if (resend) {
      try {
        const response = await resend.emails.send({
          from,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
          replyTo: options.replyTo,
        })
        
        console.log('📧 Email sent successfully:', {
          id: response.data?.id,
          to: options.to,
          subject: options.subject
        })
      } catch (error: any) {
        console.error('❌ Failed to send email via Resend:', error)
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          statusCode: error.response?.status
        })
        // Ne pas lancer l'erreur pour ne pas bloquer le processus
        console.log('📧 Falling back to console logging...')
        console.log('Email details:', {
          from,
          to: options.to,
          subject: options.subject,
          preview: options.text?.substring(0, 100) + '...'
        })
      }
    } else {
      // Fallback to console logging in development
      console.log('📧 Email (dev mode):', {
        to: options.to,
        subject: options.subject,
        preview: options.text?.substring(0, 100) + '...'
      })
      console.log('💡 To enable real emails, set RESEND_API_KEY in .env')
    }
  }
  
  async sendFormSubmissionNotification(data: {
    formLink: FormLinkWithRelations
    formData: ClientFormData
    client: Client
    project: Project
  }): Promise<void> {
    const { formLink, formData, client, project } = data
    
    // Email to admin/owner
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@awema.studio'
    
    const subject = `Nouveau formulaire complété: ${formData.businessName}`
    
    // Use React Email template
    const emailComponent = FormSubmissionAdminEmail({
      formData,
      clientId: client.id,
      projectId: project.id,
      formLinkName: formLink.name,
      formLinkDescription: formLink.description || undefined,
    })
    
    const html = await render(emailComponent)
    const text = `
      Nouveau formulaire complété !
      
      Entreprise: ${formData.businessName}
      Contact: ${formData.email} / ${formData.phone}
      Ville: ${formData.city} (${formData.postalCode})
      Type d'activité: ${formData.businessType}
      
      ID Client: ${client.id}
      ID Projet: ${project.id}
      
      Voir le projet: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/projects/${project.id}
    `
    
    await this.sendEmail({
      to: adminEmail,
      subject,
      html,
      text,
    })
    
    // Optional: Send confirmation email to client
    if (formData.email) {
      await this.sendClientConfirmation(formData)
    }
  }
  
  private async sendClientConfirmation(formData: ClientFormData): Promise<void> {
    const subject = `Confirmation de votre demande - ${formData.businessName}`
    
    // Use React Email template
    const emailComponent = FormSubmissionClientEmail({ formData })
    const html = await render(emailComponent)
    
    const text = `
      Merci pour votre confiance !
      
      Bonjour ${formData.businessName},
      
      Nous avons bien reçu votre demande de création de site web.
      Notre équipe va maintenant travailler sur votre projet et vous recontactera très prochainement.
      
      Récapitulatif:
      - Type d'activité: ${formData.businessType}
      - Services: ${formData.services.length} service(s) configuré(s)
      - Zone d'intervention: ${formData.interventionCities.join(', ')}
      
      Cordialement,
      L'équipe AWEMA Studio
    `
    
    await this.sendEmail({
      to: formData.email,
      subject,
      html,
      text,
    })
  }
  
  // Additional email methods for future use
  async sendPasswordReset(email: string, resetToken: string): Promise<void> {
    // TODO: Implement password reset email
  }
  
  async sendProjectUpdate(client: Client, project: Project, message: string): Promise<void> {
    // TODO: Implement project update notification
  }
  
  async sendLeadNotification(lead: any): Promise<void> {
    // TODO: Implement new lead notification
  }
}

export const emailService = new EmailService()
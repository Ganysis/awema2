import { NextResponse } from 'next/server'
import { emailService } from '@/lib/email/email.service'
import { ClientFormData } from '@/types/client'

export async function POST(req: Request) {
  try {
    // Create mock data for testing
    const mockFormData: ClientFormData = {
      businessName: 'Plomberie Durand Test',
      legalForm: 'SARL',
      siret: '123 456 789 00012',
      insurance: 'AXA Pro',
      yearsExperience: '15',
      certifications: ['RGE', 'Qualibat'],
      slogan: 'Votre expert plomberie depuis 2008',
      sloganSecondary: 'Intervention rapide 24/7',
      logo: '',
      phone: '01 23 45 67 89',
      phoneUrgency: '06 12 34 56 78',
      email: 'test@plomberie-durand.fr',
      emailAccounting: 'compta@plomberie-durand.fr',
      address: '123 rue de la République',
      city: 'Paris',
      postalCode: '75001',
      schedule: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '09:00', close: '12:00', closed: false },
        sunday: { open: '', close: '', closed: true }
      },
      businessType: 'plombier',
      services: [
        {
          id: '1',
          name: 'Dépannage urgence',
          description: 'Intervention rapide pour fuites et urgences',
          price: '99',
          priceType: 'from',
          duration: '1-2 heures',
          guarantee: 'Garantie 1 an',
          images: []
        },
        {
          id: '2',
          name: 'Installation chauffe-eau',
          description: 'Installation complète avec mise en service',
          price: '450',
          priceType: 'from',
          duration: '3-4 heures',
          guarantee: 'Garantie 2 ans',
          images: []
        }
      ],
      interventionCities: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine'],
      interventionRadius: '20',
      departments: ['75', '92'],
      travelFees: 'Gratuit dans un rayon de 10km',
      colorScheme: 'predefined',
      primaryColor: '#3B82F6',
      secondaryColor: '#6366F1',
      accentColor: '#EF4444',
      visualStyle: 'modern',
      typography: 'Inter',
      selectedPages: ['gallery', 'about', 'faq'],
      socialMedia: {
        facebook: 'https://facebook.com/plomberiedurand',
        instagram: 'https://instagram.com/plomberiedurand'
      },
      paymentMethods: ['cash', 'check', 'card', 'transfer'],
      languages: ['Français', 'Anglais'],
      emergency247: true
    }

    const mockClient = {
      id: 'test-client-123',
      name: 'Plomberie Durand Test',
      email: 'test@plomberie-durand.fr',
      phone: '01 23 45 67 89',
      address: '123 rue de la République',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      companyName: 'Plomberie Durand Test',
      siret: '123 456 789 00012',
      vatNumber: null,
      website: null,
      status: 'ACTIVE' as const,
      notes: null,
      tags: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null
    }

    const mockProject = {
      id: 'test-project-456',
      name: 'Site web Plomberie Durand Test',
      slug: 'plomberie-durand-test',
      description: null,
      template: 'plombier',
      domain: null,
      subdomain: null,
      customDomain: null,
      status: 'DRAFT' as const,
      publishedAt: null,
      seoTitle: null,
      seoDescription: null,
      seoKeywords: null,
      ogImage: null,
      googleAnalyticsId: null,
      googleTagManagerId: null,
      features: '{}',
      settings: '{}',
      data: JSON.stringify({ formData: mockFormData }),
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: 'test-client-123',
      createdBy: null
    }

    const mockFormLink = {
      id: 'test-form-link-789',
      uniqueId: 'test-unique-id',
      name: 'Formulaire Test Email',
      description: 'Test d\'envoi d\'email depuis le dashboard',
      status: 'ACTIVE' as const,
      expiresAt: null,
      maxUses: 1,
      views: 1,
      started: 1,
      completed: 1,
      formData: null,
      completedAt: new Date(),
      metadata: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      clientId: null,
      client: null
    }

    // Send test email
    await emailService.sendFormSubmissionNotification({
      formLink: mockFormLink,
      formData: mockFormData,
      client: mockClient,
      project: mockProject
    })

    return NextResponse.json({
      success: true,
      message: 'Email de test envoyé ! Vérifiez la console du serveur ou votre boîte de réception.'
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Erreur lors de l\'envoi de l\'email'
    }, { status: 500 })
  }
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { aiSiteGenerator } from '@/lib/services/ai-site-generator.service';
import type { ClientFormData as FormDataType } from '@/types/client-form';
import type { GenerationProgress } from '@/lib/services/ai-site-generator.service';
import { generateId } from '@/lib/utils';

// Types pour le formulaire
interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  priceType: 'fixed' | 'from' | 'quote';
  duration: string;
  guarantee: string;
  images: string[];
}

interface ClientFormData {
  // Informations entreprise
  businessName: string;
  legalForm: string;
  siret: string;
  insurance: string;
  yearsExperience: string;
  certifications: string[];
  slogan: string;
  sloganSecondary: string;
  logo: string;
  
  // Coordonnées
  phone: string;
  phoneUrgency: string;
  email: string;
  emailAccounting: string;
  address: string;
  city: string;
  postalCode: string;
  
  // Horaires
  schedule: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  
  // Services
  businessType: string;
  services: Service[];
  
  // Zone d'intervention
  interventionCities: string[];
  interventionRadius: string;
  departments: string[];
  travelFees: string;
  
  // Personnalisation
  colorScheme: 'predefined' | 'custom';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  visualStyle: 'modern' | 'classic' | 'industrial' | 'natural';
  typography: string;
  
  // Options
  selectedPages: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  paymentMethods: string[];
  languages: string[];
  emergency247: boolean;
}

const businessTypes = [
  { value: 'electricien', label: 'Électricien' },
  { value: 'plombier', label: 'Plombier' },
  { value: 'menuisier', label: 'Menuisier' },
  { value: 'macon', label: 'Maçon' },
  { value: 'peintre', label: 'Peintre' },
  { value: 'carreleur', label: 'Carreleur' },
  { value: 'couvreur', label: 'Couvreur' },
  { value: 'jardinier', label: 'Jardinier / Paysagiste' },
  { value: 'serrurier', label: 'Serrurier' }
];

const colorSchemes: Record<string, { primary: string; secondary: string; accent: string; }> = {
  electricien: { primary: '#FFA500', secondary: '#1E40AF', accent: '#10B981' },
  plombier: { primary: '#3B82F6', secondary: '#6366F1', accent: '#EF4444' },
  menuisier: { primary: '#92400E', secondary: '#B45309', accent: '#059669' },
  macon: { primary: '#6B7280', secondary: '#DC2626', accent: '#F59E0B' },
  peintre: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#14B8A6' }
};

export default function NewClientPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress | null>(null);
  const [formData, setFormData] = useState<ClientFormData>({
    businessName: '',
    legalForm: 'SARL',
    siret: '',
    insurance: '',
    yearsExperience: '',
    certifications: [],
    slogan: '',
    sloganSecondary: '',
    logo: '',
    phone: '',
    phoneUrgency: '',
    email: '',
    emailAccounting: '',
    address: '',
    city: '',
    postalCode: '',
    schedule: {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '12:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    businessType: '',
    services: [],
    interventionCities: [],
    interventionRadius: '20',
    departments: [],
    travelFees: '',
    colorScheme: 'predefined',
    primaryColor: '#3B82F6',
    secondaryColor: '#6366F1',
    accentColor: '#10B981',
    visualStyle: 'modern',
    typography: 'Inter',
    selectedPages: ['gallery', 'about'],
    socialMedia: {},
    paymentMethods: ['cash', 'check', 'card'],
    languages: ['Français'],
    emergency247: false
  });

  const totalSteps = 8;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addService = () => {
    const newService: Service = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      price: '',
      priceType: 'from',
      duration: '',
      guarantee: '',
      images: []
    };
    
    updateFormData('services', [...formData.services, newService]);
  };

  const updateService = (serviceId: string, field: string, value: any) => {
    const updatedServices = formData.services.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    updateFormData('services', updatedServices);
  };

  const removeService = (serviceId: string) => {
    updateFormData('services', formData.services.filter(s => s.id !== serviceId));
  };

  const handleBusinessTypeChange = (type: string) => {
    updateFormData('businessType', type);
    
    // Auto-apply color scheme if predefined
    if (formData.colorScheme === 'predefined' && colorSchemes[type]) {
      const colors = colorSchemes[type];
      updateFormData('primaryColor', colors.primary);
      updateFormData('secondaryColor', colors.secondary);
      updateFormData('accentColor', colors.accent);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    try {
      // Configurer le callback de progression
      aiSiteGenerator.setProgressCallback((progress) => {
        setGenerationProgress(progress);
      });
      
      // Convertir les données du formulaire au format attendu
      const clientFormData: FormDataType = {
        businessInfo: {
          companyName: formData.businessName,
          legalForm: formData.legalForm,
          siret: formData.siret,
          insurance: formData.insurance,
          yearsOfExperience: formData.yearsExperience,
          certifications: formData.certifications,
          businessType: formData.businessType,
          description: formData.slogan
        },
        contact: {
          phones: [
            { number: formData.phone, type: 'main' },
            ...(formData.phoneUrgency ? [{ number: formData.phoneUrgency, type: 'emergency' }] : [])
          ],
          emails: [
            { email: formData.email, type: 'contact' },
            ...(formData.emailAccounting ? [{ email: formData.emailAccounting, type: 'accounting' }] : [])
          ],
          address: {
            street: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: 'France'
          },
          hours: formData.schedule,
          socialMedia: formData.socialMedia
        },
        services: {
          mainServices: formData.services.map(service => ({
            name: service.name,
            description: service.description,
            price: service.price,
            priceType: service.priceType,
            duration: service.duration,
            guarantee: service.guarantee,
            included: service.guarantee ? [service.guarantee] : [],
            images: service.images
          }))
        },
        serviceArea: {
          cities: formData.interventionCities,
          radius: parseInt(formData.interventionRadius),
          departments: formData.departments,
          travelFees: formData.travelFees
        },
        branding: {
          colors: {
            primary: formData.primaryColor,
            secondary: formData.secondaryColor,
            accent: formData.accentColor
          },
          visualStyle: formData.visualStyle,
          typography: formData.typography,
          logo: formData.logo || null
        },
        options: {
          selectedPages: formData.selectedPages,
          paymentMethods: formData.paymentMethods,
          languages: formData.languages,
          emergency247: formData.emergency247
        },
        media: {
          logo: formData.logo || null,
          photos: [],
          videos: []
        },
        pricing: {
          paymentMethods: formData.paymentMethods
        },
        testimonials: {
          reviews: []
        }
      };
      
      let clientId = 'new';
      let projectId = null;
      
      // Créer le client dans la base de données
      try {
        // Valider et formater l'email
        let emailToUse = formData.email;
        if (!emailToUse || !emailToUse.includes('@')) {
          // Générer un email par défaut si manquant ou invalide
          const cleanBusinessName = (formData.businessName || 'client').toLowerCase().replace(/[^a-z0-9]/g, '');
          emailToUse = `contact@${cleanBusinessName}.fr`;
          console.warn(`Email invalide ou manquant, utilisation de: ${emailToUse}`);
        }
        
        const clientData = {
          name: formData.businessName || 'Client',
          email: emailToUse,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          companyName: formData.businessName,
          website: '',
          notes: `Entreprise: ${formData.businessType}\nAnnées d'expérience: ${formData.yearsExperience || 'Non spécifié'}`,
          tags: [formData.businessType]
        };
        
        console.log('Tentative de création du client avec les données:', clientData);
        
        const clientResponse = await fetch('/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });

        const responseText = await clientResponse.text();
        console.log('Réponse du serveur:', clientResponse.status, responseText);
        
        if (!clientResponse.ok) {
          console.error('Erreur lors de la création du client:', clientResponse.status, responseText);
          
          // Essayer de parser l'erreur si c'est du JSON
          try {
            const errorData = JSON.parse(responseText);
            throw new Error(errorData.error || `Erreur création client: ${clientResponse.status}`);
          } catch {
            throw new Error(`Erreur création client: ${clientResponse.status} - ${responseText}`);
          }
        }
        
        // Parser la réponse JSON
        let clientResult;
        try {
          clientResult = JSON.parse(responseText);
        } catch (e) {
          console.error('Erreur parsing JSON:', e);
          throw new Error('Réponse invalide du serveur');
        }
        
        console.log('Client créé avec succès:', clientResult);
        
        if (clientResult.success && clientResult.data) {
          clientId = clientResult.data.id;
          console.log('ID du client créé:', clientId);
          
          // Créer un projet pour ce client
          try {
            const projectData = {
              name: `Site web ${formData.businessName}`,
              clientId: clientId,
              status: 'DRAFT',
              description: `Site web généré automatiquement pour ${formData.businessName}`
            };
            
            console.log('Création du projet avec:', projectData);
            
            const projectResponse = await fetch('/api/projects', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(projectData),
            });
            
            if (projectResponse.ok) {
              const projectResult = await projectResponse.json();
              if (projectResult.success && projectResult.data) {
                projectId = projectResult.data.id;
                console.log('Projet créé avec succès:', projectResult);
              }
            } else {
              const projError = await projectResponse.text();
              console.error('Erreur lors de la création du projet:', projectResponse.status, projError);
            }
          } catch (error) {
            console.error('Erreur lors de la création du projet:', error);
          }
        } else {
          console.error('Format de réponse inattendu:', clientResult);
          throw new Error('Client créé mais format de réponse invalide');
        }
      } catch (error) {
        console.error('Erreur lors de la création du client:', error);
        // Ne pas bloquer la génération du site, mais alerter l'utilisateur
        alert(`Attention: Le client n'a pas pu être enregistré dans la base de données. Erreur: ${(error as Error).message}\n\nLe site sera quand même généré mais sans client associé.`);
        clientId = 'new'; // Fallback sur 'new' si la création échoue
      }

      // Générer le site
      console.log('Début de la génération du site avec les données:', clientFormData);
      let generatedSite;
      try {
        generatedSite = await aiSiteGenerator.generateSiteFromForm(clientFormData);
        console.log('Site généré avec succès:', generatedSite);
        console.log('Nombre de pages:', generatedSite.pages?.length);
        console.log('Pages:', generatedSite.pages?.map(p => ({ slug: p.slug, blocks: p.blocks?.length })));
      } catch (genError) {
        console.error('ERREUR lors de la génération du site:', genError);
        // Créer un site minimal en cas d'erreur
        generatedSite = {
          pages: [{
            id: 'home',
            name: 'Accueil',
            slug: '/',
            isHomePage: true,
            blocks: [
              {
                id: generateId(),
                type: 'Hero V3 Perfect',
                props: {
                  variant: 'split-content',
                  title: formData.businessName || 'Bienvenue',
                  subtitle: `${formData.businessType} à ${formData.city}`,
                  description: 'Votre partenaire de confiance',
                  primaryButton: { text: 'Contactez-nous', href: '#contact' }
                },
                children: []
              }
            ],
            seo: {
              title: formData.businessName,
              description: `${formData.businessType} à ${formData.city}`,
              keywords: [formData.businessType]
            }
          }],
          theme: {
            variant: 'premium',
            colors: {
              primary: '#2563eb',
              secondary: '#7c3aed'
            }
          },
          navigation: {},
          settings: {}
        };
      }
      
      
      // Stocker le site transformé dans sessionStorage
      if (typeof window !== 'undefined') {
        // Trouver la page d'accueil
        const homePage = generatedSite.pages?.find(p => p.isHomePage || p.slug === '/' || p.slug === 'home');
        console.log('Recherche page accueil. Pages disponibles:', generatedSite.pages?.map(p => ({
          slug: p.slug,
          isHomePage: p.isHomePage,
          blocksCount: p.blocks?.length
        })));
        console.log('Page accueil trouvée:', !!homePage, homePage?.slug);
        
        // Extraire header et footer de la page d'accueil
        let globalHeader = null;
        let globalFooter = null;
        let homeBlocks = [];
        
        if (homePage && homePage.blocks) {
          console.log('Blocs de la page accueil:', homePage.blocks.map(b => b.type));
          globalHeader = homePage.blocks.find(b => b.type?.toLowerCase().includes('header'));
          globalFooter = homePage.blocks.find(b => b.type?.toLowerCase().includes('footer'));
          
          // Filtrer les blocs pour enlever header et footer du contenu principal
          homeBlocks = homePage.blocks.filter(b => 
            !b.type?.toLowerCase().includes('header') && 
            !b.type?.toLowerCase().includes('footer')
          );
          console.log('Après filtrage - Header trouvé:', !!globalHeader, '- Footer trouvé:', !!globalFooter, '- Blocs restants:', homeBlocks.length);
        } else {
          console.warn('Aucune page accueil trouvée ou pas de blocs !');
        }
        
        // Créer la structure pour sessionStorage
        const siteToStore = {
          blocks: homeBlocks, // Blocs de la page d'accueil sans header/footer
          pages: generatedSite.pages?.reduce((acc, page) => {
            // Skip la page d'accueil qui est déjà dans blocks
            if (page.isHomePage || page.slug === '/' || page.slug === 'home') {
              return acc;
            }
            
            // Filtrer header/footer des autres pages aussi
            const pageBlocks = page.blocks?.filter(b => 
              !b.type?.toLowerCase().includes('header') && 
              !b.type?.toLowerCase().includes('footer')
            ) || [];
            
            const cleanSlug = page.slug.replace(/^\//, '');
            if (cleanSlug) {
              acc[cleanSlug] = {
                blocks: pageBlocks,
                metadata: page.seo || {}
              };
            }
            return acc;
          }, {}) || {},
          theme: generatedSite.theme,
          navigation: generatedSite.navigation,
          globalHeader: globalHeader,
          globalFooter: globalFooter,
          metadata: homePage?.seo || {}
        };
        
        console.log('SITE À STOCKER DANS SESSIONSTORAGE:', {
          blocksCount: siteToStore.blocks.length,
          pagesCount: Object.keys(siteToStore.pages).length,
          hasHeader: !!siteToStore.globalHeader,
          hasFooter: !!siteToStore.globalFooter,
          pages: Object.keys(siteToStore.pages)
        });
        console.log('Blocs page accueil:', siteToStore.blocks.map(b => b.type));
        
        sessionStorage.setItem('generatedSite', JSON.stringify(siteToStore));
        sessionStorage.setItem('newClientData', JSON.stringify(clientFormData));
        if (clientId !== 'new') {
          sessionStorage.setItem('clientId', clientId);
        }
        if (projectId) {
          sessionStorage.setItem('projectId', projectId);
        }
      }
      
      // Rediriger vers l'éditeur avec l'ID du client et du projet
      const params = new URLSearchParams({
        clientId: clientId,
        generated: 'true',
        ai: 'true'
      });
      if (projectId) {
        params.append('projectId', projectId);
      }
      router.push(`/?${params.toString()}`);
    } catch (error) {
      console.error('Erreur lors de la génération du site:', error);
      alert('Une erreur est survenue lors de la génération du site. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(null);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Informations de l'entreprise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Électricité Durand"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forme juridique
                </label>
                <select
                  value={formData.legalForm}
                  onChange={(e) => updateFormData('legalForm', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="EI">Entreprise Individuelle</option>
                  <option value="EURL">EURL</option>
                  <option value="SARL">SARL</option>
                  <option value="SAS">SAS</option>
                  <option value="SASU">SASU</option>
                  <option value="Auto">Auto-entrepreneur</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro SIRET
                </label>
                <input
                  type="text"
                  value={formData.siret}
                  onChange={(e) => updateFormData('siret', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="123 456 789 00012"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assurance professionnelle
                </label>
                <input
                  type="text"
                  value={formData.insurance}
                  onChange={(e) => updateFormData('insurance', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="AXA Pro"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => updateFormData('yearsExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'activité *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleBusinessTypeChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Sélectionnez un métier</option>
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slogan principal
              </label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => updateFormData('slogan', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Votre expert en électricité depuis 2008"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slogan secondaire
              </label>
              <input
                type="text"
                value={formData.sloganSecondary}
                onChange={(e) => updateFormData('sloganSecondary', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Intervention rapide 24/7 - Devis gratuit"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo de l'entreprise
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo" className="max-w-full max-h-full" />
                  ) : (
                    <PhotoIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Télécharger un logo
                </button>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Coordonnées & Contact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone principal *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="01 23 45 67 89"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone urgences
                </label>
                <input
                  type="tel"
                  value={formData.phoneUrgency}
                  onChange={(e) => updateFormData('phoneUrgency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="06 12 34 56 78"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="contact@entreprise.fr"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email comptabilité
                </label>
                <input
                  type="email"
                  value={formData.emailAccounting}
                  onChange={(e) => updateFormData('emailAccounting', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="compta@entreprise.fr"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse du siège *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="123 rue de la République"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Paris"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal *
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="75001"
                  required
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Horaires d'ouverture</h3>
              <div className="space-y-3">
                {Object.entries({
                  monday: 'Lundi',
                  tuesday: 'Mardi',
                  wednesday: 'Mercredi',
                  thursday: 'Jeudi',
                  friday: 'Vendredi',
                  saturday: 'Samedi',
                  sunday: 'Dimanche'
                }).map(([day, label]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <label className="w-24 text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="checkbox"
                      checked={!formData.schedule[day].closed}
                      onChange={(e) => {
                        const newSchedule = { ...formData.schedule };
                        newSchedule[day].closed = !e.target.checked;
                        updateFormData('schedule', newSchedule);
                      }}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    {!formData.schedule[day].closed && (
                      <>
                        <input
                          type="time"
                          value={formData.schedule[day].open}
                          onChange={(e) => {
                            const newSchedule = { ...formData.schedule };
                            newSchedule[day].open = e.target.value;
                            updateFormData('schedule', newSchedule);
                          }}
                          className="px-3 py-1 border border-gray-300 rounded"
                        />
                        <span className="text-gray-500">à</span>
                        <input
                          type="time"
                          value={formData.schedule[day].close}
                          onChange={(e) => {
                            const newSchedule = { ...formData.schedule };
                            newSchedule[day].close = e.target.value;
                            updateFormData('schedule', newSchedule);
                          }}
                          className="px-3 py-1 border border-gray-300 rounded"
                        />
                      </>
                    )}
                    {formData.schedule[day].closed && (
                      <span className="text-gray-500">Fermé</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.emergency247}
                  onChange={(e) => updateFormData('emergency247', e.target.checked)}
                  className="h-4 w-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Service d'urgence 24h/24 et 7j/7
                </span>
              </label>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Services proposés</h2>
              <button
                type="button"
                onClick={addService}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Ajouter un service
              </button>
            </div>
            
            {formData.services.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">Aucun service ajouté</p>
                <button
                  type="button"
                  onClick={addService}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Ajouter votre premier service
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.services.map((service, index) => (
                  <div key={service.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Service {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeService(service.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du service *
                        </label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Installation électrique"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Durée moyenne
                        </label>
                        <input
                          type="text"
                          value={service.duration}
                          onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="2-4 heures"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type de tarif
                        </label>
                        <select
                          value={service.priceType}
                          onChange={(e) => updateService(service.id, 'priceType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="fixed">Prix fixe</option>
                          <option value="from">À partir de</option>
                          <option value="quote">Sur devis</option>
                        </select>
                      </div>
                      
                      {service.priceType !== 'quote' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prix
                          </label>
                          <input
                            type="text"
                            value={service.price}
                            onChange={(e) => updateService(service.id, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="99€"
                          />
                        </div>
                      )}
                      
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description détaillée
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          rows={3}
                          placeholder="Description complète du service..."
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Garanties
                        </label>
                        <input
                          type="text"
                          value={service.guarantee}
                          onChange={(e) => updateService(service.id, 'guarantee', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Garantie 2 ans pièces et main d'œuvre"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Photos du service
                        </label>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          >
                            <PhotoIcon className="w-5 h-5 inline mr-2" />
                            Ajouter des photos
                          </button>
                          <span className="text-sm text-gray-500">
                            {service.images.length} photo(s) ajoutée(s)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Zone d'intervention</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Villes d'intervention
              </label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ajouter une ville"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          updateFormData('interventionCities', [...formData.interventionCities, input.value.trim()]);
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.interventionCities.map((city, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {city}
                      <button
                        type="button"
                        onClick={() => {
                          updateFormData('interventionCities', 
                            formData.interventionCities.filter((_, i) => i !== index)
                          );
                        }}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Ces villes seront utilisées pour créer des pages SEO locales
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rayon d'intervention (km)
                </label>
                <input
                  type="number"
                  value={formData.interventionRadius}
                  onChange={(e) => updateFormData('interventionRadius', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frais de déplacement
                </label>
                <input
                  type="text"
                  value={formData.travelFees}
                  onChange={(e) => updateFormData('travelFees', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Gratuit dans un rayon de 10km"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Départements couverts
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['75', '77', '78', '91', '92', '93', '94', '95'].map(dept => (
                  <label key={dept} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.departments.includes(dept)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('departments', [...formData.departments, dept]);
                        } else {
                          updateFormData('departments', formData.departments.filter(d => d !== dept));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{dept} - {getDepartmentName(dept)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Personnalisation visuelle</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schéma de couleurs
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="colorScheme"
                    value="predefined"
                    checked={formData.colorScheme === 'predefined'}
                    onChange={(e) => updateFormData('colorScheme', e.target.value)}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">
                    Utiliser les couleurs recommandées pour mon métier
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="colorScheme"
                    value="custom"
                    checked={formData.colorScheme === 'custom'}
                    onChange={(e) => updateFormData('colorScheme', e.target.value)}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">
                    Personnaliser mes couleurs
                  </span>
                </label>
              </div>
            </div>
            
            {formData.colorScheme === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur principale
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData('primaryColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur secondaire
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur d'accent
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => updateFormData('accentColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => updateFormData('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style visuel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'modern', label: 'Moderne', description: 'Épuré et contemporain' },
                  { value: 'classic', label: 'Classique', description: 'Intemporel et élégant' },
                  { value: 'industrial', label: 'Industriel', description: 'Robuste et technique' },
                  { value: 'natural', label: 'Naturel', description: 'Organique et chaleureux' }
                ].map(style => (
                  <label
                    key={style.value}
                    className={`
                      relative flex flex-col p-4 border-2 rounded-lg cursor-pointer
                      ${formData.visualStyle === style.value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="visualStyle"
                      value={style.value}
                      checked={formData.visualStyle === style.value}
                      onChange={(e) => updateFormData('visualStyle', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium text-gray-900">{style.label}</span>
                    <span className="text-sm text-gray-500">{style.description}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typographie
              </label>
              <select
                value={formData.typography}
                onChange={(e) => updateFormData('typography', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Inter">Inter - Moderne et lisible</option>
                <option value="Roboto">Roboto - Professionnel</option>
                <option value="Open Sans">Open Sans - Accueillant</option>
                <option value="Montserrat">Montserrat - Élégant</option>
                <option value="Playfair Display">Playfair Display - Classique</option>
              </select>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Médias & Contenus</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos de réalisations
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Glissez vos photos ici ou cliquez pour sélectionner
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Sélectionner des photos
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG jusqu'à 10MB - Min. 5 photos recommandées
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vidéo de présentation (optionnel)
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Lien YouTube ou Vimeo de votre vidéo de présentation
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Témoignages clients
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nom du client"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Entreprise/Titre"
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      placeholder="Témoignage..."
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
                      rows={3}
                    />
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-700">Note</label>
                      <div className="flex space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className="text-2xl text-yellow-400 hover:text-yellow-500"
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  + Ajouter un témoignage
                </button>
              </div>
            </div>
          </div>
        );
        
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Options & Préférences</h2>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Pages à inclure
              </h3>
              <div className="space-y-2">
                {[
                  { value: 'gallery', label: 'Galerie photos', description: 'Portfolio de vos réalisations' },
                  { value: 'about', label: 'À propos', description: 'Histoire et équipe' },
                  { value: 'faq', label: 'FAQ', description: 'Questions fréquentes' },
                  { value: 'blog', label: 'Blog', description: 'Articles et actualités' }
                ].map(page => (
                  <label key={page.value} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.selectedPages.includes(page.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('selectedPages', [...formData.selectedPages, page.value]);
                        } else {
                          updateFormData('selectedPages', formData.selectedPages.filter(p => p !== page.value));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 rounded mt-1"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">{page.label}</span>
                      <span className="text-sm text-gray-500 block">{page.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Réseaux sociaux
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={formData.socialMedia.facebook || ''}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, facebook: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://facebook.com/votreentreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.socialMedia.instagram || ''}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, instagram: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://instagram.com/votreentreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={formData.socialMedia.linkedin || ''}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, linkedin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://linkedin.com/company/votreentreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TikTok
                  </label>
                  <input
                    type="text"
                    value={formData.socialMedia.tiktok || ''}
                    onChange={(e) => updateFormData('socialMedia', { ...formData.socialMedia, tiktok: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://tiktok.com/@votreentreprise"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Moyens de paiement acceptés
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'cash', label: 'Espèces' },
                  { value: 'check', label: 'Chèque' },
                  { value: 'card', label: 'Carte bancaire' },
                  { value: 'transfer', label: 'Virement' },
                  { value: 'paypal', label: 'PayPal' },
                  { value: 'financing', label: 'Financement' }
                ].map(method => (
                  <label key={method.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes(method.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('paymentMethods', [...formData.paymentMethods, method.value]);
                        } else {
                          updateFormData('paymentMethods', formData.paymentMethods.filter(m => m !== method.value));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Langues parlées
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Français', 'Anglais', 'Espagnol', 'Italien', 
                  'Allemand', 'Portugais', 'Arabe', 'Chinois'
                ].map(lang => (
                  <label key={lang} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('languages', [...formData.languages, lang]);
                        } else {
                          updateFormData('languages', formData.languages.filter(l => l !== lang));
                        }
                      }}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 8:
        // Si on est en train de générer, afficher la progression
        if (isGenerating && generationProgress) {
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-primary-600" />
                Génération de votre site en cours...
              </h2>
              
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8">
                <div className="space-y-6">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">{generationProgress.message}</span>
                      <span className="text-gray-600">{generationProgress.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${generationProgress.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Étapes de génération */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[
                      { step: 'analysis', label: 'Analyse des données', icon: '🔍' },
                      { step: 'structure', label: 'Création de la structure', icon: '🏗️' },
                      { step: 'content', label: 'Génération du contenu', icon: '✍️' },
                      { step: 'blocks', label: 'Configuration des blocs', icon: '🎨' },
                      { step: 'links', label: 'Maillage interne', icon: '🔗' },
                      { step: 'theme', label: 'Application du thème', icon: '🎭' }
                    ].map(({ step, label, icon }) => {
                      const isActive = generationProgress.step === step;
                      const isDone = getStepOrder(generationProgress.step) > getStepOrder(step);
                      
                      return (
                        <div
                          key={step}
                          className={`
                            flex items-center space-x-3 p-3 rounded-lg transition-all
                            ${isActive ? 'bg-white shadow-md scale-105' : 
                              isDone ? 'bg-green-50' : 'bg-gray-50'
                            }
                          `}
                        >
                          <span className="text-2xl">{icon}</span>
                          <div className="flex-1">
                            <p className={`font-medium ${isActive ? 'text-primary-700' : 'text-gray-700'}`}>
                              {label}
                            </p>
                            {isActive && (
                              <p className="text-xs text-gray-500 mt-1">En cours...</p>
                            )}
                            {isDone && (
                              <p className="text-xs text-green-600 mt-1">✓ Terminé</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Animation de chargement */}
                  <div className="flex justify-center mt-8">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
                      <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                  </div>
                  
                  <p className="text-center text-gray-600 text-sm">
                    Veuillez patienter, cela peut prendre quelques instants...
                  </p>
                </div>
              </div>
            </div>
          );
        }
        
        // Sinon, afficher le récapitulatif normal
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Récapitulatif</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-600 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Informations complètes !
                  </h3>
                  <p className="text-gray-700">
                    Toutes les informations nécessaires ont été collectées. 
                    Votre site web va être généré automatiquement avec :
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li>• {formData.services.length} services détaillés</li>
                    <li>• {formData.interventionCities.length} villes de zone d'intervention</li>
                    <li>• {formData.interventionCities.length * formData.services.length} pages SEO locales</li>
                    <li>• Pages : Accueil, Services, Contact, Mentions légales
                      {formData.selectedPages.includes('gallery') && ', Galerie'}
                      {formData.selectedPages.includes('about') && ', À propos'}
                      {formData.selectedPages.includes('faq') && ', FAQ'}
                      {formData.selectedPages.includes('blog') && ', Blog'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Aperçu des informations</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-600">Entreprise</dt>
                  <dd className="text-gray-900">{formData.businessName}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Métier</dt>
                  <dd className="text-gray-900 capitalize">{formData.businessType}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Téléphone</dt>
                  <dd className="text-gray-900">{formData.phone}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Email</dt>
                  <dd className="text-gray-900">{formData.email}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Ville</dt>
                  <dd className="text-gray-900">{formData.city}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Style visuel</dt>
                  <dd className="text-gray-900 capitalize">{formData.visualStyle}</dd>
                </div>
              </dl>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Prochaine étape :</strong> Après validation, vous serez redirigé vers l'éditeur 
                où vous pourrez personnaliser davantage votre site avant publication.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Retour au dashboard
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              Étape {currentStep} sur {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`
                px-6 py-2 rounded-lg font-medium
                ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              Précédent
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Suivant
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Générer le site
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

function getDepartmentName(code: string): string {
  const departments: { [key: string]: string } = {
    '75': 'Paris',
    '77': 'Seine-et-Marne',
    '78': 'Yvelines',
    '91': 'Essonne',
    '92': 'Hauts-de-Seine',
    '93': 'Seine-Saint-Denis',
    '94': 'Val-de-Marne',
    '95': "Val-d'Oise"
  };
  return departments[code] || code;
}

function getStepOrder(step: string): number {
  const order: { [key: string]: number } = {
    'analysis': 1,
    'structure': 2,
    'content': 3,
    'blocks': 4,
    'links': 5,
    'theme': 6,
    'complete': 7
  };
  return order[step] || 0;
}
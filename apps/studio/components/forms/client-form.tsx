'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { 
  ClientFormData, 
  Service, 
  businessTypes, 
  colorSchemes 
} from '@/types/client'

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void | Promise<void>
  onSaveProgress?: (data: ClientFormData, currentStep: number) => void
  isSubmitting?: boolean
  initialData?: Partial<ClientFormData>
  initialStep?: number
}

const defaultFormData: ClientFormData = {
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
}

export function ClientForm({ 
  onSubmit, 
  onSaveProgress, 
  isSubmitting = false,
  initialData,
  initialStep = 1 
}: ClientFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [formData, setFormData] = useState<ClientFormData>(() => ({
    ...defaultFormData,
    ...initialData
  }))
  const totalSteps = 8

  // Save progress on step change
  useEffect(() => {
    if (onSaveProgress && currentStep > 1) {
      onSaveProgress(formData, currentStep)
    }
  }, [currentStep])

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      priceType: 'from',
      duration: '',
      guarantee: '',
      images: []
    }
    
    updateFormData('services', [...formData.services, newService])
  }

  const updateService = (serviceId: string, field: string, value: any) => {
    const updatedServices = formData.services.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    )
    updateFormData('services', updatedServices)
  }

  const removeService = (serviceId: string) => {
    updateFormData('services', formData.services.filter(s => s.id !== serviceId))
  }

  const handleBusinessTypeChange = (type: string) => {
    updateFormData('businessType', type)
    
    // Auto-apply color scheme if predefined
    if (formData.colorScheme === 'predefined' && colorSchemes[type]) {
      const colors = colorSchemes[type]
      updateFormData('primaryColor', colors.primary)
      updateFormData('secondaryColor', colors.secondary)
      updateFormData('accentColor', colors.accent)
    }
  }

  const handleSubmit = async () => {
    await onSubmit(formData)
  }

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessType
      case 2:
        return formData.phone && formData.email && formData.address && formData.city && formData.postalCode
      case 3:
        return formData.services.length > 0
      case 4:
        return formData.interventionCities.length > 0
      default:
        return true
    }
  }

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Étape {currentStep} sur {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% complété
        </span>
      </div>
      <div className="bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )

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
          </div>
        )
        
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
                        const newSchedule = { ...formData.schedule }
                        newSchedule[day].closed = !e.target.checked
                        updateFormData('schedule', newSchedule)
                      }}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    {!formData.schedule[day].closed && (
                      <>
                        <input
                          type="time"
                          value={formData.schedule[day].open}
                          onChange={(e) => {
                            const newSchedule = { ...formData.schedule }
                            newSchedule[day].open = e.target.value
                            updateFormData('schedule', newSchedule)
                          }}
                          className="px-3 py-1 border border-gray-300 rounded"
                        />
                        <span className="text-gray-500">à</span>
                        <input
                          type="time"
                          value={formData.schedule[day].close}
                          onChange={(e) => {
                            const newSchedule = { ...formData.schedule }
                            newSchedule[day].close = e.target.value
                            updateFormData('schedule', newSchedule)
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
        )
        
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Zone d'intervention</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Villes d'intervention *
              </label>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Tapez une ville et appuyez sur Entrée"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const input = e.currentTarget
                      const value = input.value.trim()
                      if (value && !formData.interventionCities.includes(value)) {
                        updateFormData('interventionCities', [...formData.interventionCities, value])
                        input.value = ''
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interventionCities.map((city, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {city}
                    <button
                      type="button"
                      onClick={() => {
                        updateFormData('interventionCities', 
                          formData.interventionCities.filter((_, i) => i !== index)
                        )
                      }}
                      className="ml-2 text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Gratuit dans un rayon de 10km"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Départements couverts
              </label>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Ex: 75, 92, 93..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const input = e.currentTarget
                      const value = input.value.trim()
                      if (value && !formData.departments.includes(value)) {
                        updateFormData('departments', [...formData.departments, value])
                        input.value = ''
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.departments.map((dept, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {dept}
                    <button
                      type="button"
                      onClick={() => {
                        updateFormData('departments', 
                          formData.departments.filter((_, i) => i !== index)
                        )
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Personnalisation visuelle</h2>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schéma de couleurs</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="predefined"
                      checked={formData.colorScheme === 'predefined'}
                      onChange={(e) => updateFormData('colorScheme', e.target.value)}
                      className="h-4 w-4 text-primary-600"
                    />
                    <span>Utiliser les couleurs recommandées pour mon métier</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="custom"
                      checked={formData.colorScheme === 'custom'}
                      onChange={(e) => updateFormData('colorScheme', e.target.value)}
                      className="h-4 w-4 text-primary-600"
                    />
                    <span>Personnaliser mes couleurs</span>
                  </label>
                </div>
              </div>
              
              {formData.colorScheme === 'custom' && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Style visuel</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'modern', label: 'Moderne', description: 'Design épuré et contemporain' },
                  { value: 'classic', label: 'Classique', description: 'Élégant et intemporel' },
                  { value: 'industrial', label: 'Industriel', description: 'Robuste et professionnel' },
                  { value: 'natural', label: 'Naturel', description: 'Chaleureux et accueillant' }
                ].map(style => (
                  <label
                    key={style.value}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.visualStyle === style.value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={style.value}
                      checked={formData.visualStyle === style.value}
                      onChange={(e) => updateFormData('visualStyle', e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{style.label}</div>
                    <div className="text-sm text-gray-500">{style.description}</div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="Inter">Inter (Moderne et lisible)</option>
                <option value="Roboto">Roboto (Google)</option>
                <option value="Open Sans">Open Sans (Classique)</option>
                <option value="Montserrat">Montserrat (Élégant)</option>
                <option value="Raleway">Raleway (Sophistiqué)</option>
                <option value="Poppins">Poppins (Arrondi)</option>
              </select>
            </div>
          </div>
        )
        
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Médias & Contenus</h2>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Photos de vos réalisations
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Glissez vos photos ici ou cliquez pour parcourir
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG ou WebP. Max 5MB par image.
                </p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Choisir des fichiers
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vidéo de présentation (optionnel)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Lien YouTube ou Vimeo de votre vidéo de présentation
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Témoignages clients
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 text-center">
                  Les témoignages peuvent être ajoutés ultérieurement depuis votre espace client
                </p>
              </div>
            </div>
          </div>
        )
        
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
                          updateFormData('selectedPages', [...formData.selectedPages, page.value])
                        } else {
                          updateFormData('selectedPages', formData.selectedPages.filter(p => p !== page.value))
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
                          updateFormData('paymentMethods', [...formData.paymentMethods, method.value])
                        } else {
                          updateFormData('paymentMethods', formData.paymentMethods.filter(m => m !== method.value))
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
                          updateFormData('languages', [...formData.languages, lang])
                        } else {
                          updateFormData('languages', formData.languages.filter(l => l !== lang))
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
        )
        
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Récapitulatif</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-800">
                  Toutes les informations sont complètes ! Vérifiez le récapitulatif ci-dessous.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Entreprise</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Nom</dt>
                    <dd className="font-medium">{formData.businessName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Type d'activité</dt>
                    <dd className="font-medium">{formData.businessType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Téléphone</dt>
                    <dd className="font-medium">{formData.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Email</dt>
                    <dd className="font-medium">{formData.email}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                <p className="text-gray-700">
                  {formData.services.length} service(s) configuré(s)
                </p>
                <ul className="mt-2 space-y-1">
                  {formData.services.map(service => (
                    <li key={service.id} className="text-sm text-gray-600">
                      • {service.name}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Zone d'intervention</h3>
                <p className="text-gray-700">
                  {formData.interventionCities.join(', ')}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Personnalisation</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Style visuel</dt>
                    <dd className="font-medium capitalize">{formData.visualStyle}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Pages incluses</dt>
                    <dd className="font-medium">{formData.selectedPages.length} pages</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div>
      {renderProgressBar()}
      
      <form onSubmit={(e) => { e.preventDefault() }}>
        {renderStep()}
        
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Précédent
          </button>
          
          {currentStep === totalSteps ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !canGoNext()}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Soumettre le formulaire
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
              disabled={!canGoNext()}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
              <ArrowLeftIcon className="w-5 h-5 ml-2 rotate-180" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
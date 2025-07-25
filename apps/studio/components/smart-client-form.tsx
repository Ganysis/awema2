'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Sparkles, Zap, Shield, Image, DollarSign, MapPin, Clock,
  Users, Target, Palette, Layout, Globe, TrendingUp, Award,
  CheckCircle, Info, AlertCircle
} from 'lucide-react';

interface SmartFormData {
  // Business Identity
  businessName: string;
  businessType: string;
  tagline: string;
  yearEstablished: number;
  numberOfEmployees: string;
  businessStage: 'startup' | 'growing' | 'established' | 'enterprise';
  
  // Services & Expertise
  services: string[];
  specializations: string[];
  certifications: string[];
  uniqueSellingPoints: string[];
  
  // Service Model
  serviceModel: {
    urgency24h: boolean;
    onlineBooking: boolean;
    freeQuote: boolean;
    guarantee: boolean;
    insurance: boolean;
  };
  
  // Target Market
  targetAudience: {
    primary: 'particuliers' | 'professionnels' | 'both';
    ageRange: string[];
    incomeLevel: 'economy' | 'standard' | 'premium';
    needs: string[];
  };
  
  // Geographic Coverage
  serviceAreas: {
    mainCity: string;
    additionalCities: string[];
    maxDistance: number;
    interventionMode: 'local' | 'regional' | 'national';
  };
  
  // Competition & Positioning
  marketPosition: {
    priceLevel: 'low' | 'medium' | 'high' | 'premium';
    mainCompetitors: string[];
    differentiators: string[];
    marketShare: 'new' | 'challenger' | 'leader';
  };
  
  // Goals & Priorities
  websiteGoals: {
    primary: string;
    secondary: string[];
    conversionTargets: string[];
    successMetrics: string[];
  };
  
  // Content & Assets
  contentAssets: {
    hasLogo: boolean;
    logoStyle: 'text' | 'icon' | 'combined' | 'need-creation';
    hasPhotos: boolean;
    photoQuality: 'pro' | 'amateur' | 'none';
    hasVideos: boolean;
    hasTestimonials: boolean;
    testimonialCount: number;
  };
  
  // Style Preferences
  stylePreferences: {
    visualStyle: 'modern' | 'classic' | 'bold' | 'minimal' | 'premium';
    colorMood: 'professional' | 'friendly' | 'urgent' | 'luxury' | 'tech' | 'natural';
    animationLevel: 'none' | 'subtle' | 'moderate' | 'rich';
    layoutDensity: 'spacious' | 'balanced' | 'compact';
  };
  
  // Technical Requirements
  technicalNeeds: {
    languages: string[];
    integrations: string[];
    performancePriority: 'speed' | 'visuals' | 'balanced';
    seoImportance: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Budget & Timeline
  projectScope: {
    budget: 'starter' | 'professional' | 'premium' | 'enterprise';
    timeline: 'urgent' | 'normal' | 'flexible';
    maintenanceNeeds: 'none' | 'basic' | 'full';
  };
}

const SMART_QUESTIONS = {
  businessStage: {
    startup: 'Nous venons de démarrer (< 2 ans)',
    growing: 'En croissance (2-5 ans)',
    established: 'Bien établi (5-10 ans)',
    enterprise: 'Leader du marché (10+ ans)'
  },
  
  conversionTargets: [
    { id: 'quote-form', label: 'Formulaire de devis', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'phone-call', label: 'Appel téléphonique', icon: <Clock className="h-4 w-4" /> },
    { id: 'booking', label: 'Réservation en ligne', icon: <Users className="h-4 w-4" /> },
    { id: 'email', label: 'Contact par email', icon: <Globe className="h-4 w-4" /> },
    { id: 'chat', label: 'Chat en direct', icon: <Zap className="h-4 w-4" /> }
  ],
  
  differentiators: [
    'Prix compétitifs',
    'Qualité supérieure',
    'Délais rapides',
    'Service 24/7',
    'Expertise technique',
    'Garantie étendue',
    'Écologique',
    'Local et familial',
    'Certifications',
    'Innovation'
  ]
};

export function SmartClientForm({ onSubmit }: { onSubmit: (data: SmartFormData) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<SmartFormData>>({
    serviceModel: {},
    targetAudience: { needs: [], ageRange: [] },
    serviceAreas: { additionalCities: [] },
    marketPosition: { differentiators: [] },
    websiteGoals: { secondary: [], conversionTargets: [], successMetrics: [] },
    contentAssets: {},
    stylePreferences: {},
    technicalNeeds: { languages: ['fr'], integrations: [] },
    projectScope: {}
  });

  const steps = [
    { id: 'identity', title: 'Identité', icon: <Shield className="h-4 w-4" /> },
    { id: 'services', title: 'Services', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'market', title: 'Marché', icon: <Target className="h-4 w-4" /> },
    { id: 'goals', title: 'Objectifs', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'content', title: 'Contenu', icon: <Image className="h-4 w-4" /> },
    { id: 'style', title: 'Style', icon: <Palette className="h-4 w-4" /> },
    { id: 'technical', title: 'Technique', icon: <Layout className="h-4 w-4" /> }
  ];

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof SmartFormData], ...data }
    }));
  };

  const calculateProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData as SmartFormData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Formulaire Intelligent</h2>
          <Badge variant="secondary">{Math.round(calculateProgress())}% complété</Badge>
        </div>
        
        <Progress value={calculateProgress()} className="mb-4" />
        
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 ${
                index <= currentStep ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-full ${
                index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                {step.icon}
              </div>
              <span className="hidden md:inline text-sm">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Business Identity */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="businessName">Nom de l'entreprise *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName || ''}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Ex: Plomberie Durand"
                />
              </div>

              <div>
                <Label>Type d'activité *</Label>
                <RadioGroup
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {BUSINESS_TYPES.map(type => (
                      <div key={type} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="cursor-pointer capitalize">{type}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Stade de développement *</Label>
                <RadioGroup
                  value={formData.businessStage}
                  onValueChange={(value) => setFormData({ ...formData, businessStage: value as any })}
                >
                  {Object.entries(SMART_QUESTIONS.businessStage).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 mb-2">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="cursor-pointer">
                        <div>
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-gray-500">
                            {key === 'startup' && 'Site vitrine pour démarrer'}
                            {key === 'growing' && 'Site pour accompagner la croissance'}
                            {key === 'established' && 'Refonte pour moderniser'}
                            {key === 'enterprise' && 'Site premium pour leader'}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="tagline">Slogan / Accroche</Label>
                <Input
                  id="tagline"
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Ex: Votre confort, notre priorité"
                />
                <p className="text-sm text-gray-500 mt-1">
                  💡 Un bon slogan aide à créer un site mémorable
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Services & Expertise */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label>Services principaux *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Dépannage urgent', 'Installation', 'Rénovation', 
                    'Maintenance', 'Conseil', 'Formation',
                    'Vente de matériel', 'Service après-vente'
                  ].map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.services?.includes(service)}
                        onCheckedChange={(checked) => {
                          const services = formData.services || [];
                          if (checked) {
                            setFormData({ ...formData, services: [...services, service] });
                          } else {
                            setFormData({ ...formData, services: services.filter(s => s !== service) });
                          }
                        }}
                      />
                      <Label htmlFor={service}>{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Modèle de service</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="urgency24h" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      Service d'urgence 24h/24
                    </Label>
                    <Checkbox
                      id="urgency24h"
                      checked={formData.serviceModel?.urgency24h}
                      onCheckedChange={(checked) => 
                        updateFormData('serviceModel', { urgency24h: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="onlineBooking" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Réservation en ligne
                    </Label>
                    <Checkbox
                      id="onlineBooking"
                      checked={formData.serviceModel?.onlineBooking}
                      onCheckedChange={(checked) => 
                        updateFormData('serviceModel', { onlineBooking: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor="guarantee" className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      Garantie sur les travaux
                    </Label>
                    <Checkbox
                      id="guarantee"
                      checked={formData.serviceModel?.guarantee}
                      onCheckedChange={(checked) => 
                        updateFormData('serviceModel', { guarantee: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Les services d'urgence 24h/24 génèreront un design orienté conversion avec des éléments d'urgence visuels.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step 3: Target Market */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Clientèle cible principale *</Label>
                <RadioGroup
                  value={formData.targetAudience?.primary}
                  onValueChange={(value) => 
                    updateFormData('targetAudience', { primary: value })
                  }
                >
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="particuliers" id="particuliers" />
                      <Label htmlFor="particuliers" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Particuliers</div>
                          <div className="text-sm text-gray-500">Propriétaires, locataires, familles</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="professionnels" id="professionnels" />
                      <Label htmlFor="professionnels" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Professionnels</div>
                          <div className="text-sm text-gray-500">Entreprises, commerces, industries</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Les deux</div>
                          <div className="text-sm text-gray-500">Particuliers et professionnels</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Positionnement tarifaire</Label>
                <RadioGroup
                  value={formData.marketPosition?.priceLevel}
                  onValueChange={(value) => 
                    updateFormData('marketPosition', { priceLevel: value })
                  }
                >
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Économique</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Standard</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">Haut de gamme</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium">Premium</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Zone d'intervention</Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Ville principale"
                    value={formData.serviceAreas?.mainCity || ''}
                    onChange={(e) => 
                      updateFormData('serviceAreas', { mainCity: e.target.value })
                    }
                  />
                  
                  <div>
                    <Label>Rayon d'intervention (km)</Label>
                    <Slider
                      value={[formData.serviceAreas?.maxDistance || 30]}
                      onValueChange={(value) => 
                        updateFormData('serviceAreas', { maxDistance: value[0] })
                      }
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>Local (5km)</span>
                      <span>{formData.serviceAreas?.maxDistance || 30}km</span>
                      <span>Régional (100km)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Goals & Objectives */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Objectif principal du site *</Label>
                <RadioGroup
                  value={formData.websiteGoals?.primary}
                  onValueChange={(value) => 
                    updateFormData('websiteGoals', { primary: value })
                  }
                >
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="generate-leads" id="generate-leads" />
                      <Label htmlFor="generate-leads" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Générer des demandes de devis</div>
                          <div className="text-sm text-gray-500">Maximiser les conversions</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="build-trust" id="build-trust" />
                      <Label htmlFor="build-trust" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Établir la confiance</div>
                          <div className="text-sm text-gray-500">Montrer votre expertise</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="showcase-work" id="showcase-work" />
                      <Label htmlFor="showcase-work" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Présenter vos réalisations</div>
                          <div className="text-sm text-gray-500">Portfolio visuel</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="local-seo" id="local-seo" />
                      <Label htmlFor="local-seo" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Dominer le SEO local</div>
                          <div className="text-sm text-gray-500">Être #1 dans votre ville</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Actions de conversion souhaitées</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {SMART_QUESTIONS.conversionTargets.map(target => (
                    <div 
                      key={target.id}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.websiteGoals?.conversionTargets?.includes(target.id) 
                          ? 'bg-primary/10 border-primary' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        const targets = formData.websiteGoals?.conversionTargets || [];
                        if (targets.includes(target.id)) {
                          updateFormData('websiteGoals', { 
                            conversionTargets: targets.filter(t => t !== target.id) 
                          });
                        } else {
                          updateFormData('websiteGoals', { 
                            conversionTargets: [...targets, target.id] 
                          });
                        }
                      }}
                    >
                      {target.icon}
                      <span className="text-sm">{target.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Vos objectifs détermineront la structure et les éléments prioritaires de votre site.
                  Un site orienté "urgence" aura des CTA plus visibles qu'un site "portfolio".
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step 5: Content & Assets */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label>Assets visuels disponibles</Label>
                <div className="space-y-3 mt-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="hasLogo" className="font-medium">Logo</Label>
                      <Checkbox
                        id="hasLogo"
                        checked={formData.contentAssets?.hasLogo}
                        onCheckedChange={(checked) => 
                          updateFormData('contentAssets', { hasLogo: checked })
                        }
                      />
                    </div>
                    {formData.contentAssets?.hasLogo && (
                      <RadioGroup
                        value={formData.contentAssets?.logoStyle}
                        onValueChange={(value) => 
                          updateFormData('contentAssets', { logoStyle: value })
                        }
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="text" id="text" />
                            <Label htmlFor="text">Texte seul</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="icon" id="icon" />
                            <Label htmlFor="icon">Icône seule</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="combined" id="combined" />
                            <Label htmlFor="combined">Texte + icône</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    )}
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="hasPhotos" className="font-medium">Photos</Label>
                      <Checkbox
                        id="hasPhotos"
                        checked={formData.contentAssets?.hasPhotos}
                        onCheckedChange={(checked) => 
                          updateFormData('contentAssets', { hasPhotos: checked })
                        }
                      />
                    </div>
                    {formData.contentAssets?.hasPhotos && (
                      <RadioGroup
                        value={formData.contentAssets?.photoQuality}
                        onValueChange={(value) => 
                          updateFormData('contentAssets', { photoQuality: value })
                        }
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pro" id="pro" />
                            <Label htmlFor="pro">Professionnelles</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="amateur" id="amateur" />
                            <Label htmlFor="amateur">Amateurs (à améliorer)</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    )}
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hasTestimonials" className="font-medium">Témoignages clients</Label>
                      <Checkbox
                        id="hasTestimonials"
                        checked={formData.contentAssets?.hasTestimonials}
                        onCheckedChange={(checked) => 
                          updateFormData('contentAssets', { hasTestimonials: checked })
                        }
                      />
                    </div>
                    {formData.contentAssets?.hasTestimonials && (
                      <div className="mt-2">
                        <Label>Nombre approximatif</Label>
                        <Slider
                          value={[formData.contentAssets?.testimonialCount || 5]}
                          onValueChange={(value) => 
                            updateFormData('contentAssets', { testimonialCount: value[0] })
                          }
                          max={50}
                          step={1}
                          className="mt-2"
                        />
                        <span className="text-sm text-gray-500">
                          {formData.contentAssets?.testimonialCount || 5} témoignages
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Style Preferences */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <Label>Style visuel souhaité *</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { id: 'modern', name: 'Moderne', desc: 'Épuré et contemporain' },
                    { id: 'classic', name: 'Classique', desc: 'Élégant et intemporel' },
                    { id: 'bold', name: 'Audacieux', desc: 'Impact visuel fort' },
                    { id: 'minimal', name: 'Minimaliste', desc: 'Simple et efficace' },
                    { id: 'premium', name: 'Premium', desc: 'Luxueux et sophistiqué' }
                  ].map(style => (
                    <div
                      key={style.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.stylePreferences?.visualStyle === style.id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => updateFormData('stylePreferences', { visualStyle: style.id })}
                    >
                      <div className="font-medium">{style.name}</div>
                      <div className="text-sm text-gray-500">{style.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Ambiance couleur</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { id: 'professional', name: 'Pro', colors: ['#1E40AF', '#10B981'] },
                    { id: 'friendly', name: 'Amical', colors: ['#F59E0B', '#3B82F6'] },
                    { id: 'urgent', name: 'Urgent', colors: ['#DC2626', '#F59E0B'] },
                    { id: 'luxury', name: 'Luxe', colors: ['#991B1B', '#FCD34D'] },
                    { id: 'tech', name: 'Tech', colors: ['#8B5CF6', '#10B981'] },
                    { id: 'natural', name: 'Nature', colors: ['#059669', '#92400E'] }
                  ].map(mood => (
                    <div
                      key={mood.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.stylePreferences?.colorMood === mood.id
                          ? 'ring-2 ring-primary'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => updateFormData('stylePreferences', { colorMood: mood.id })}
                    >
                      <div className="flex gap-2 mb-2">
                        {mood.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="text-sm font-medium">{mood.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Niveau d'animations</Label>
                <RadioGroup
                  value={formData.stylePreferences?.animationLevel}
                  onValueChange={(value) => 
                    updateFormData('stylePreferences', { animationLevel: value })
                  }
                >
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">Aucune (performance max)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="subtle" id="subtle" />
                      <Label htmlFor="subtle">Subtiles (équilibre)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Modérées (engagement)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rich" id="rich" />
                      <Label htmlFor="rich">Riches (impact max)</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 7: Technical Requirements */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <Label>Importance du référencement (SEO)</Label>
                <RadioGroup
                  value={formData.technicalNeeds?.seoImportance}
                  onValueChange={(value) => 
                    updateFormData('technicalNeeds', { seoImportance: value })
                  }
                >
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="critical" id="critical" />
                      <Label htmlFor="critical" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Critique</div>
                          <div className="text-sm text-gray-500">Je veux être #1 sur Google</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="high" id="high-seo" />
                      <Label htmlFor="high-seo" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Élevée</div>
                          <div className="text-sm text-gray-500">Très important pour mon business</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="medium" id="medium-seo" />
                      <Label htmlFor="medium-seo" className="cursor-pointer">
                        <div>
                          <div className="font-medium">Moyenne</div>
                          <div className="text-sm text-gray-500">Important mais pas prioritaire</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Intégrations souhaitées</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Google Analytics',
                    'Google My Business',
                    'Facebook/Instagram',
                    'Calendrier de réservation',
                    'Chat en direct',
                    'Système de devis',
                    'Paiement en ligne',
                    'Newsletter'
                  ].map(integration => (
                    <div key={integration} className="flex items-center space-x-2">
                      <Checkbox
                        id={integration}
                        checked={formData.technicalNeeds?.integrations?.includes(integration)}
                        onCheckedChange={(checked) => {
                          const integrations = formData.technicalNeeds?.integrations || [];
                          if (checked) {
                            updateFormData('technicalNeeds', { 
                              integrations: [...integrations, integration] 
                            });
                          } else {
                            updateFormData('technicalNeeds', { 
                              integrations: integrations.filter(i => i !== integration) 
                            });
                          }
                        }}
                      />
                      <Label htmlFor={integration}>{integration}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Budget et timeline</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Budget</Label>
                    <Select
                      value={formData.projectScope?.budget}
                      onValueChange={(value) => 
                        updateFormData('projectScope', { budget: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter (< 1000€)</SelectItem>
                        <SelectItem value="professional">Pro (1000-3000€)</SelectItem>
                        <SelectItem value="premium">Premium (3000-5000€)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (5000€+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Délai souhaité</Label>
                    <Select
                      value={formData.projectScope?.timeline}
                      onValueChange={(value) => 
                        updateFormData('projectScope', { timeline: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (< 1 semaine)</SelectItem>
                        <SelectItem value="normal">Normal (2-4 semaines)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Excellent ! Nous avons toutes les informations pour créer le site parfait pour votre entreprise.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Précédent
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Conseil Intelligent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {currentStep === 0 && "💡 Le stade de développement de votre entreprise influencera le design : startup = moderne et dynamique, établi = confiance et autorité."}
            {currentStep === 1 && "💡 Les services d'urgence 24/7 activeront automatiquement des éléments visuels d'urgence (badges, countdown, CTA urgents)."}
            {currentStep === 2 && "💡 Le positionnement tarifaire détermine le style visuel : économique = simplicité, premium = luxe et sophistication."}
            {currentStep === 3 && "💡 Un objectif clair = un site efficace. 'Générer des devis' créera plus de CTA que 'Présenter l'entreprise'."}
            {currentStep === 4 && "💡 Pas de photos ? Pas de problème ! Nous avons des banques d'images professionnelles pour votre secteur."}
            {currentStep === 5 && "💡 Les animations subtiles augmentent l'engagement de 23% sans impacter les performances."}
            {currentStep === 6 && "💡 Un site 'SEO critique' aura une structure technique optimale et du contenu généré par IA pour dominer Google."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
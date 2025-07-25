'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Loader2 } from 'lucide-react';

interface ClientFormPublicProps {
  clientId: string;
  token: string;
}

export function ClientFormPublic({ clientId, token }: ClientFormPublicProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    // Informations entreprise
    businessName: '',
    businessType: '',
    tagline: '',
    description: '',
    yearEstablished: '',
    numberOfEmployees: '',
    
    // Contact
    phone: '',
    email: '',
    website: '',
    
    // Adresse
    address: '',
    postalCode: '',
    city: '',
    
    // Services
    services: [] as string[],
    mainService: '',
    serviceAreas: [] as string[],
    
    // Clients cibles
    targetAudience: '',
    uniqueSellingPoints: '',
    
    // Concurrence
    competitors: '',
    differentiators: '',
    
    // Objectifs
    websiteGoals: [] as string[],
    expectedFeatures: [] as string[],
    
    // Préférences visuelles
    colorPreferences: '',
    stylePreferences: '',
    websitesLiked: '',
    
    // Contenu
    hasLogo: false,
    hasPhotos: false,
    needsPhotography: false,
    existingContent: ''
  });

  const steps = [
    { number: 1, title: 'Informations entreprise' },
    { number: 2, title: 'Services & zones' },
    { number: 3, title: 'Clients & objectifs' },
    { number: 4, title: 'Préférences visuelles' },
    { number: 5, title: 'Contenu & médias' }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/clients/${clientId}/form-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsCompleted(true);
      } else {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Merci !</h2>
              <p className="text-gray-600">
                Votre formulaire a été envoyé avec succès. Nous allons maintenant créer votre site web.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Vous recevrez un email dès que votre site sera prêt pour validation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-full mx-2 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            {steps[currentStep - 1].title}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Questionnaire pour la création de votre site web</CardTitle>
            <CardDescription>
              Merci de remplir ce formulaire pour nous aider à créer le site web parfait pour votre entreprise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Informations entreprise */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Nom de l'entreprise *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="businessType">Type d'activité *</Label>
                  <RadioGroup
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plombier" id="plombier" />
                        <Label htmlFor="plombier">Plombier</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="electricien" id="electricien" />
                        <Label htmlFor="electricien">Électricien</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="menuisier" id="menuisier" />
                        <Label htmlFor="menuisier">Menuisier</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="peintre" id="peintre" />
                        <Label htmlFor="peintre">Peintre</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="macon" id="macon" />
                        <Label htmlFor="macon">Maçon</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="autre" id="autre" />
                        <Label htmlFor="autre">Autre</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="tagline">Slogan (optionnel)</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Ex: Votre confort, notre priorité"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description de l'entreprise *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Décrivez votre entreprise, votre histoire, vos valeurs..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearEstablished">Année de création</Label>
                    <Input
                      id="yearEstablished"
                      value={formData.yearEstablished}
                      onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                      placeholder="Ex: 2010"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numberOfEmployees">Nombre d'employés</Label>
                    <Input
                      id="numberOfEmployees"
                      value={formData.numberOfEmployees}
                      onChange={(e) => setFormData({ ...formData, numberOfEmployees: e.target.value })}
                      placeholder="Ex: 5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Adresse *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Services & zones */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Services proposés *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      'Dépannage urgent',
                      'Installation',
                      'Rénovation',
                      'Maintenance',
                      'Conseil',
                      'Devis gratuit'
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, services: [...formData.services, service] });
                            } else {
                              setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
                            }
                          }}
                        />
                        <Label htmlFor={service}>{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="mainService">Service principal *</Label>
                  <Input
                    id="mainService"
                    value={formData.mainService}
                    onChange={(e) => setFormData({ ...formData, mainService: e.target.value })}
                    placeholder="Ex: Dépannage plomberie 24/7"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceAreas">Zones d'intervention (villes) *</Label>
                  <Textarea
                    id="serviceAreas"
                    value={formData.serviceAreas.join(', ')}
                    onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value.split(',').map(s => s.trim()) })}
                    rows={3}
                    placeholder="Ex: Lyon, Villeurbanne, Caluire-et-Cuire..."
                  />
                  <p className="text-sm text-gray-500 mt-1">Séparez les villes par des virgules</p>
                </div>
              </div>
            )}

            {/* Step 3: Clients & objectifs */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="targetAudience">Clientèle cible *</Label>
                  <Textarea
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    rows={3}
                    placeholder="Décrivez votre clientèle type (particuliers, professionnels, âge, besoins...)"
                  />
                </div>

                <div>
                  <Label htmlFor="uniqueSellingPoints">Points forts de votre entreprise *</Label>
                  <Textarea
                    id="uniqueSellingPoints"
                    value={formData.uniqueSellingPoints}
                    onChange={(e) => setFormData({ ...formData, uniqueSellingPoints: e.target.value })}
                    rows={3}
                    placeholder="Qu'est-ce qui vous différencie de vos concurrents ?"
                  />
                </div>

                <div>
                  <Label htmlFor="competitors">Principaux concurrents</Label>
                  <Textarea
                    id="competitors"
                    value={formData.competitors}
                    onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                    rows={2}
                    placeholder="Noms ou sites web de vos concurrents"
                  />
                </div>

                <div>
                  <Label>Objectifs du site web *</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      'Présenter mes services',
                      'Générer des demandes de devis',
                      'Améliorer ma visibilité locale',
                      'Montrer mes réalisations',
                      'Faciliter le contact client',
                      'Développer ma notoriété'
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.websiteGoals.includes(goal)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, websiteGoals: [...formData.websiteGoals, goal] });
                            } else {
                              setFormData({ ...formData, websiteGoals: formData.websiteGoals.filter(g => g !== goal) });
                            }
                          }}
                        />
                        <Label htmlFor={goal}>{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Fonctionnalités souhaitées</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      'Formulaire de contact',
                      'Demande de devis en ligne',
                      'Galerie photos',
                      'Témoignages clients',
                      'Blog/Actualités',
                      'Carte interactive'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.expectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, expectedFeatures: [...formData.expectedFeatures, feature] });
                            } else {
                              setFormData({ ...formData, expectedFeatures: formData.expectedFeatures.filter(f => f !== feature) });
                            }
                          }}
                        />
                        <Label htmlFor={feature}>{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Préférences visuelles */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label>Style préféré *</Label>
                  <RadioGroup
                    value={formData.stylePreferences}
                    onValueChange={(value) => setFormData({ ...formData, stylePreferences: value })}
                  >
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderne" id="moderne" />
                        <Label htmlFor="moderne">Moderne et épuré</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="classique" id="classique" />
                        <Label htmlFor="classique">Classique et professionnel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="chaleureux" id="chaleureux" />
                        <Label htmlFor="chaleureux">Chaleureux et accueillant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tech" id="tech" />
                        <Label htmlFor="tech">High-tech et innovant</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="colorPreferences">Préférences de couleurs</Label>
                  <Input
                    id="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={(e) => setFormData({ ...formData, colorPreferences: e.target.value })}
                    placeholder="Ex: Bleu et blanc, tons chauds, couleurs vives..."
                  />
                </div>

                <div>
                  <Label htmlFor="websitesLiked">Sites web que vous aimez (optionnel)</Label>
                  <Textarea
                    id="websitesLiked"
                    value={formData.websitesLiked}
                    onChange={(e) => setFormData({ ...formData, websitesLiked: e.target.value })}
                    rows={3}
                    placeholder="URLs de sites web dont vous aimez le design"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Contenu & médias */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasLogo"
                      checked={formData.hasLogo}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasLogo: checked as boolean })}
                    />
                    <Label htmlFor="hasLogo">J'ai déjà un logo</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPhotos"
                      checked={formData.hasPhotos}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasPhotos: checked as boolean })}
                    />
                    <Label htmlFor="hasPhotos">J'ai des photos de mes réalisations</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="needsPhotography"
                      checked={formData.needsPhotography}
                      onCheckedChange={(checked) => setFormData({ ...formData, needsPhotography: checked as boolean })}
                    />
                    <Label htmlFor="needsPhotography">J'aimerais faire réaliser des photos professionnelles</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="existingContent">Contenu existant (optionnel)</Label>
                  <Textarea
                    id="existingContent"
                    value={formData.existingContent}
                    onChange={(e) => setFormData({ ...formData, existingContent: e.target.value })}
                    rows={4}
                    placeholder="Si vous avez déjà des textes, descriptions, ou autre contenu que vous souhaitez utiliser..."
                  />
                </div>

                <Alert>
                  <AlertDescription>
                    Ne vous inquiétez pas si vous n'avez pas encore tout le contenu. Nous pouvons créer les textes et trouver des images pour vous !
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>
              
              {currentStep < 5 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Suivant
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le formulaire'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
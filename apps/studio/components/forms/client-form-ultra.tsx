'use client';

import React, { useState, useCallback } from 'react';
import { 
  Building2, 
  Calendar,
  Users,
  Award,
  MapPin,
  Clock,
  Euro,
  Image,
  MessageSquare,
  Target,
  Palette,
  Upload,
  X,
  ChevronRight,
  ChevronLeft,
  Save,
  Check,
  AlertCircle,
  Info,
  Sparkles,
  Shield,
  Wrench,
  Camera,
  FileText,
  TrendingUp,
  Heart
} from 'lucide-react';
import { ClientFormUltra, FormProgress } from '@/types/client-form-ultra';

interface ClientFormUltraProps {
  onSubmit: (data: Partial<ClientFormUltra>) => void;
  initialData?: Partial<ClientFormUltra>;
  mode?: 'create' | 'edit';
}

// Sections du formulaire
const FORM_SECTIONS = [
  { id: 'basic', title: 'Informations de base', icon: Building2, required: true },
  { id: 'history', title: 'Histoire & Identité', icon: Heart, required: true },
  { id: 'team', title: 'Équipe & Compétences', icon: Users, required: false },
  { id: 'certifications', title: 'Certifications & Garanties', icon: Shield, required: true },
  { id: 'services', title: 'Services détaillés', icon: Wrench, required: true },
  { id: 'availability', title: 'Zones & Disponibilité', icon: MapPin, required: true },
  { id: 'pricing', title: 'Tarification & Paiement', icon: Euro, required: true },
  { id: 'portfolio', title: 'Portfolio & Réalisations', icon: Camera, required: false },
  { id: 'testimonials', title: 'Clients & Témoignages', icon: MessageSquare, required: false },
  { id: 'partners', title: 'Matériaux & Partenaires', icon: Award, required: false },
  { id: 'marketing', title: 'Marketing & Communication', icon: TrendingUp, required: false },
  { id: 'goals', title: 'Objectifs & Croissance', icon: Target, required: false },
  { id: 'preferences', title: 'Préférences Site Web', icon: Palette, required: true },
  { id: 'media', title: 'Médias & Documents', icon: Image, required: false }
];

export function ClientFormUltra({ onSubmit, initialData = {}, mode = 'create' }: ClientFormUltraProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Partial<ClientFormUltra>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [progress, setProgress] = useState<FormProgress>({
    currentStep: 1,
    totalSteps: FORM_SECTIONS.length,
    completedSections: [],
    skippedSections: [],
    completionPercentage: 0,
    savedAsDraft: false
  });

  // Gestionnaire d'upload de fichiers
  const handleFileUpload = useCallback((fieldName: string, files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ...fileArray]
    }));
  }, []);

  // Suppression d'un fichier
  const removeFile = useCallback((fieldName: string, index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  }, []);

  // Navigation entre sections
  const goToSection = (index: number) => {
    if (index >= 0 && index < FORM_SECTIONS.length) {
      setCurrentSection(index);
      setProgress(prev => ({ ...prev, currentStep: index + 1 }));
    }
  };

  const nextSection = () => {
    if (currentSection < FORM_SECTIONS.length - 1) {
      goToSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      goToSection(currentSection - 1);
    }
  };

  // Calcul du pourcentage de complétion
  const calculateProgress = useCallback(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(v => 
      v !== undefined && v !== null && v !== '' && 
      (!Array.isArray(v) || v.length > 0)
    ).length;
    
    return Math.round((filledFields / totalFields) * 100);
  }, [formData]);

  // Mise à jour des données du formulaire
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Composant d'upload réutilisable
  const FileUploadZone = ({ fieldName, label, accept, multiple = true }: {
    fieldName: string;
    label: string;
    accept?: string;
    multiple?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          id={fieldName}
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileUpload(fieldName, e.target.files)}
          className="hidden"
        />
        <label htmlFor={fieldName} className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Cliquez ou glissez des fichiers ici
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {accept ? `Formats acceptés: ${accept}` : 'Tous formats acceptés'}
          </p>
        </label>
      </div>
      
      {/* Fichiers uploadés */}
      {uploadedFiles[fieldName]?.length > 0 && (
        <div className="mt-3 space-y-2">
          {uploadedFiles[fieldName].map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm truncate flex-1">{file.name}</span>
              <button
                onClick={() => removeFile(fieldName, index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Rendu des sections
  const renderSection = () => {
    const section = FORM_SECTIONS[currentSection];
    
    switch (section.id) {
      case 'basic':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Informations de base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  value={formData.businessName || ''}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Plomberie Dupont & Fils"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'activité *
                </label>
                <select
                  value={formData.businessType || ''}
                  onChange={(e) => updateFormData('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="plombier">Plombier</option>
                  <option value="electricien">Électricien</option>
                  <option value="menuisier">Menuisier</option>
                  <option value="jardinier">Jardinier</option>
                  <option value="carreleur">Carreleur</option>
                  <option value="peintre">Peintre</option>
                  <option value="macon">Maçon</option>
                  <option value="couvreur">Couvreur</option>
                  <option value="serrurier">Serrurier</option>
                  <option value="chauffagiste">Chauffagiste</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut juridique *
                </label>
                <select
                  value={formData.legalStatus || ''}
                  onChange={(e) => updateFormData('legalStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="auto-entrepreneur">Auto-entrepreneur</option>
                  <option value="sarl">SARL</option>
                  <option value="sas">SAS</option>
                  <option value="eurl">EURL</option>
                  <option value="artisan">Artisan</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SIRET
                </label>
                <input
                  type="text"
                  value={formData.siret || ''}
                  onChange={(e) => updateFormData('siret', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 123 456 789 00012"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="contact@monentreprise.fr"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone fixe *
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="01 23 45 67 89"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone mobile
                </label>
                <input
                  type="tel"
                  value={formData.mobilePhone || ''}
                  onChange={(e) => updateFormData('mobilePhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Histoire & Identité</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Année de création *
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.yearEstablished || ''}
                onChange={(e) => updateFormData('yearEstablished', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: 2005"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment avez-vous démarré cette activité ? *
              </label>
              <textarea
                value={formData.founderStory || ''}
                onChange={(e) => updateFormData('founderStory', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Après 10 ans comme salarié chez un grand plombier, j'ai décidé de créer ma propre entreprise pour offrir un service plus personnalisé..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qu'est-ce qui vous différencie de vos concurrents ? *
              </label>
              <textarea
                value={formData.uniqueSellingPoint || ''}
                onChange={(e) => updateFormData('uniqueSellingPoint', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Seul plombier de la région certifié pour les pompes à chaleur géothermiques..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taille de l'équipe *
              </label>
              <select
                value={formData.teamSize || ''}
                onChange={(e) => updateFormData('teamSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionnez...</option>
                <option value="solo">Solo (1 personne)</option>
                <option value="2-5">2 à 5 personnes</option>
                <option value="6-10">6 à 10 personnes</option>
                <option value="11-20">11 à 20 personnes</option>
                <option value="20+">Plus de 20 personnes</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.familyBusiness || false}
                  onChange={(e) => updateFormData('familyBusiness', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Entreprise familiale
                </span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valeurs de l'entreprise (3-5 mots clés) *
              </label>
              <input
                type="text"
                value={formData.companyValues?.join(', ') || ''}
                onChange={(e) => updateFormData('companyValues', e.target.value.split(',').map(v => v.trim()))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Qualité, Ponctualité, Transparence, Écoute, Innovation"
              />
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Services détaillés</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Détaillez vos services principaux avec des prix indicatifs. 
                  Cela permettra de créer un site qui convertit mieux vos visiteurs en clients.
                </p>
              </div>
            </div>
            
            {/* Services dynamiques */}
            <div className="space-y-4">
              {(formData.services || [{ name: '', description: '', priceRange: { min: 0, max: 0, unit: 'hour' } }]).map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Service {index + 1}</h4>
                    {index > 0 && (
                      <button
                        onClick={() => {
                          const newServices = [...(formData.services || [])];
                          newServices.splice(index, 1);
                          updateFormData('services', newServices);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nom du service</label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => {
                          const newServices = [...(formData.services || [])];
                          newServices[index] = { ...service, name: e.target.value };
                          updateFormData('services', newServices);
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: Dépannage urgent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Durée moyenne</label>
                      <input
                        type="text"
                        value={service.duration || ''}
                        onChange={(e) => {
                          const newServices = [...(formData.services || [])];
                          newServices[index] = { ...service, duration: e.target.value };
                          updateFormData('services', newServices);
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: 1-2 heures"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...(formData.services || [])];
                        newServices[index] = { ...service, description: e.target.value };
                        updateFormData('services', newServices);
                      }}
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      placeholder="Ex: Intervention rapide pour fuites, débouchage, réparations urgentes..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Prix min</label>
                      <input
                        type="number"
                        value={service.priceRange?.min || ''}
                        onChange={(e) => {
                          const newServices = [...(formData.services || [])];
                          newServices[index] = { 
                            ...service, 
                            priceRange: { 
                              ...service.priceRange, 
                              min: parseInt(e.target.value) 
                            } 
                          };
                          updateFormData('services', newServices);
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="80"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Prix max</label>
                      <input
                        type="number"
                        value={service.priceRange?.max || ''}
                        onChange={(e) => {
                          const newServices = [...(formData.services || [])];
                          newServices[index] = { 
                            ...service, 
                            priceRange: { 
                              ...service.priceRange, 
                              max: parseInt(e.target.value) 
                            } 
                          };
                          updateFormData('services', newServices);
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Unité</label>
                      <select
                        value={service.priceRange?.unit || 'hour'}
                        onChange={(e) => {
                          const newServices = [...(formData.services || [])];
                          newServices[index] = { 
                            ...service, 
                            priceRange: { 
                              ...service.priceRange, 
                              unit: e.target.value as any
                            } 
                          };
                          updateFormData('services', newServices);
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="hour">€/heure</option>
                        <option value="day">€/jour</option>
                        <option value="project">€/projet</option>
                        <option value="m2">€/m²</option>
                        <option value="ml">€/ml</option>
                      </select>
                    </div>
                  </div>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={service.isSpecialty || false}
                      onChange={(e) => {
                        const newServices = [...(formData.services || [])];
                        newServices[index] = { ...service, isSpecialty: e.target.checked };
                        updateFormData('services', newServices);
                      }}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">C'est ma spécialité</span>
                  </label>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => {
                const newServices = [...(formData.services || []), {
                  name: '',
                  description: '',
                  priceRange: { min: 0, max: 0, unit: 'hour' as const },
                  duration: '',
                  isSpecialty: false
                }];
                updateFormData('services', newServices);
              }}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <span className="text-xl">+</span>
              <span>Ajouter un service</span>
            </button>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio & Réalisations</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <Sparkles className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  Les photos avant/après sont cruciales pour convaincre vos futurs clients. 
                  Prenez le temps de bien documenter vos meilleurs projets !
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre total de projets réalisés
              </label>
              <input
                type="number"
                value={formData.totalProjectsCompleted || ''}
                onChange={(e) => updateFormData('totalProjectsCompleted', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: 500"
              />
            </div>
            
            {/* Projets phares */}
            <div className="space-y-6">
              <h4 className="font-medium">Vos projets phares (3-5 exemples)</h4>
              
              {[0, 1, 2].map((index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h5 className="font-medium text-gray-700">Projet {index + 1}</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Titre du projet</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: Rénovation salle de bain complète"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Catégorie</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: Salle de bain"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description du projet</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      placeholder="Décrivez le projet, les défis rencontrés, les solutions apportées..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Durée</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: 5 jours"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Budget</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: 8000-10000€"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Date</label>
                      <input
                        type="month"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploadZone
                      fieldName={`project_${index}_before`}
                      label="Photos AVANT"
                      accept="image/*"
                      multiple={true}
                    />
                    
                    <FileUploadZone
                      fieldName={`project_${index}_after`}
                      label="Photos APRÈS"
                      accept="image/*"
                      multiple={true}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Témoignage client (optionnel)</label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      placeholder="Ex: Très satisfait du résultat, travail propre et soigné..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Clients & Témoignages</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Types de clients
                </label>
                <div className="space-y-2 mt-2">
                  {['Particuliers', 'Entreprises', 'Collectivités', 'Associations'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil de votre client type
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Propriétaires de maisons individuelles, 40-60 ans, revenus moyens+, soucieux de la qualité..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Liens vers vos avis en ligne
              </label>
              <div className="space-y-2">
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="URL Google My Business"
                />
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="URL Page Facebook"
                />
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="URL TrustedPro ou autre plateforme"
                />
              </div>
            </div>
            
            {/* Témoignages */}
            <div className="space-y-4">
              <h4 className="font-medium">Témoignages clients (3-5 meilleurs)</h4>
              
              {[0, 1, 2].map((index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <h5 className="font-medium text-gray-700">Témoignage {index + 1}</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nom du client</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: Marie Dubois"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Service réalisé</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                        placeholder="Ex: Installation chaudière"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Témoignage</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      placeholder="Ex: Très satisfait de l'intervention. Travail rapide et soigné. Je recommande vivement..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Note</label>
                      <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-md">
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">Date</label>
                      <input
                        type="month"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <FileUploadZone
                    fieldName={`testimonial_${index}_photos`}
                    label="Photos du projet (optionnel)"
                    accept="image/*"
                    multiple={true}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Médias & Documents</h3>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex">
                <Camera className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-purple-800">
                  Des visuels de qualité font toute la différence. 
                  Préparez vos meilleures photos en haute résolution.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <FileUploadZone
                fieldName="logo"
                label="Logo de l'entreprise"
                accept="image/*,.pdf,.svg"
                multiple={false}
              />
              
              <FileUploadZone
                fieldName="team_photos"
                label="Photos de l'équipe"
                accept="image/*"
                multiple={true}
              />
              
              <FileUploadZone
                fieldName="workplace_photos"
                label="Photos de vos locaux/atelier"
                accept="image/*"
                multiple={true}
              />
              
              <FileUploadZone
                fieldName="vehicle_photos"
                label="Photos de vos véhicules"
                accept="image/*"
                multiple={true}
              />
              
              <FileUploadZone
                fieldName="certification_docs"
                label="Certificats et labels (PDF ou images)"
                accept="image/*,.pdf"
                multiple={true}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vidéos de présentation
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Lien YouTube de votre vidéo de présentation"
                  />
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Autre lien vidéo (optionnel)"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Section en cours de développement...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* En-tête avec progression */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Nouveau Client' : 'Modifier Client'}
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Progression globale</p>
            <p className="text-2xl font-bold text-blue-600">{calculateProgress()}%</p>
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>
      
      {/* Navigation des sections */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {FORM_SECTIONS.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === currentSection;
            const isCompleted = progress.completedSections.includes(section.id);
            
            return (
              <button
                key={section.id}
                onClick={() => goToSection(index)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : isCompleted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{section.title}</span>
                {section.required && <span className="text-xs">*</span>}
                {isCompleted && <Check className="h-3 w-3 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Contenu de la section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {renderSection()}
      </div>
      
      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg
              ${currentSection === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Précédent</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                // Sauvegarder comme brouillon
                console.log('Saving draft...', formData);
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder le brouillon</span>
            </button>
            
            {currentSection === FORM_SECTIONS.length - 1 ? (
              <button
                onClick={() => onSubmit(formData)}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Check className="h-4 w-4" />
                <span>Terminer et analyser</span>
              </button>
            ) : (
              <button
                onClick={nextSection}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <span>Suivant</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
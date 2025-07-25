'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Check, 
  Sparkles, 
  Eye, 
  Palette, 
  Layout, 
  Zap,
  TrendingUp,
  Globe,
  Users,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  description: string;
  score: number;
  blocks: any[];
  theme: any;
  tags: string[];
  reasoning: string;
  personalizationSuggestions: string[];
}

interface TemplateSelectorProps {
  clientId: string;
  formData: any;
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ clientId, formData, onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('0');

  // Charger les templates recommandés
  useEffect(() => {
    loadTemplates();
  }, [formData]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/templates/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: formData.businessType,
          services: formData.services || [],
          targetAudience: formData.targetAudience || ['particuliers'],
          stylePreference: formData.stylePreference || 'modern',
          urgencyLevel: formData.is24x7Available ? 'high' : 'medium',
          hasGallery: formData.hasGallery || false,
          hasTestimonials: formData.hasTestimonials || false,
          hasPricing: formData.hasPricing || false,
          is24x7Available: formData.is24x7Available || false,
          yearEstablished: formData.yearEstablished,
          serviceAreas: formData.serviceAreas || [],
          specializations: formData.specializations || [],
          goals: formData.goals || ['visibility', 'leads']
        })
      });

      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
        toast.success('Templates chargés avec succès');
      } else {
        toast.error('Erreur lors du chargement des templates');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'urgency': return <Zap className="w-3 h-3" />;
      case 'trust': return <Users className="w-3 h-3" />;
      case 'local': return <Globe className="w-3 h-3" />;
      case 'modern': return <Sparkles className="w-3 h-3" />;
      case '2030-ready': return <TrendingUp className="w-3 h-3" />;
      case '24/7': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onSelect(templateId);
    toast.success('Template sélectionné');
  };

  const renderTemplatePreview = (template: Template) => {
    // Simuler un aperçu visuel basé sur les blocs
    const blockTypes = template.blocks.map(b => b.type);
    const hasHero = blockTypes.includes('hero-v3-perfect');
    const hasGallery = blockTypes.includes('gallery-v3-perfect');
    const hasServices = blockTypes.includes('services-v3-perfect');
    
    return (
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm font-medium mb-2">Structure du template:</div>
        {hasHero && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span className="text-xs">Hero Section</span>
          </div>
        )}
        {hasServices && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-xs">Services</span>
          </div>
        )}
        {hasGallery && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded" />
            <span className="text-xs">Galerie</span>
          </div>
        )}
        <div className="mt-3 pt-3 border-t">
          <div className="text-xs text-gray-600">
            {template.blocks.length} blocs au total
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">
          <Sparkles className="w-8 h-8 mx-auto mb-2" />
          <p>Analyse de vos besoins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          Templates recommandés pour votre activité
        </h2>
        <p className="text-gray-600">
          Nous avons sélectionné les {templates.length} meilleurs templates 
          basés sur vos critères
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          {templates.map((_, index) => (
            <TabsTrigger key={index} value={index.toString()}>
              Option {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {templates.map((template, index) => (
          <TabsContent key={index} value={index.toString()} className="space-y-4">
            <Card className={`border-2 transition-all ${
              selectedTemplate === template.id 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-200'
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {template.name}
                      {selectedTemplate === template.id && (
                        <Badge variant="default" className="ml-2">
                          <Check className="w-3 h-3 mr-1" />
                          Sélectionné
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {template.description}
                    </CardDescription>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(template.score)}`}>
                    {template.score}%
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                      {getTagIcon(tag)}
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Raisonnement */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-900 mb-1">
                    <Sparkles className="w-4 h-4" />
                    Pourquoi ce template ?
                  </div>
                  <p className="text-sm text-blue-800">
                    {template.reasoning}
                  </p>
                </div>

                {/* Aperçu visuel */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Layout className="w-4 h-4" />
                      Aperçu de la structure
                    </h4>
                    {renderTemplatePreview(template)}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Palette de couleurs
                    </h4>
                    <div className="flex gap-2">
                      {Object.entries(template.theme.colors).slice(0, 4).map(([name, color]) => (
                        <div key={name} className="text-center">
                          <div 
                            className="w-12 h-12 rounded-lg shadow-sm mb-1" 
                            style={{ backgroundColor: color as string }}
                          />
                          <span className="text-xs text-gray-600">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions de personnalisation */}
                <div>
                  <h4 className="font-medium mb-2">Suggestions de personnalisation</h4>
                  <ScrollArea className="h-24">
                    <ul className="text-sm text-gray-600 space-y-1">
                      {template.personalizationSuggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSelect(template.id)}
                    variant={selectedTemplate === template.id ? 'default' : 'outline'}
                  >
                    {selectedTemplate === template.id ? 'Sélectionné' : 'Sélectionner'}
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Aperçu complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {selectedTemplate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800">
            Template sélectionné ! Vous pouvez maintenant passer à la personnalisation.
          </p>
        </div>
      )}
    </div>
  );
}
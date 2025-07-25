'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Search, Check, Loader2, Eye, Palette } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  tags: string[];
  theme: {
    colors: {
      primary: string;
      secondary: string;
    };
  };
}

interface TemplateSelectorProps {
  clientData: any;
  onTemplatesSelected: (templateIds: string[]) => void;
  onGenerateVariants: (variants: any[]) => void;
}

export function TemplateSelector({ 
  clientData, 
  onTemplatesSelected,
  onGenerateVariants 
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Tous', icon: '🛠️' },
    { id: 'plombier', name: 'Plombier', icon: '🔧' },
    { id: 'electricien', name: 'Électricien', icon: '⚡' },
    { id: 'menuisier', name: 'Menuisier', icon: '🪵' },
    { id: 'peintre', name: 'Peintre', icon: '🎨' },
    { id: 'macon', name: 'Maçon', icon: '🧱' },
    { id: 'chauffagiste', name: 'Chauffagiste', icon: '🔥' },
    { id: 'carreleur', name: 'Carreleur', icon: '◼' },
    { id: 'couvreur', name: 'Couvreur', icon: '🏠' },
    { id: 'jardinier', name: 'Jardinier', icon: '🌿' }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleTemplateSelection = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
    } else if (selectedTemplates.length < 3) {
      setSelectedTemplates([...selectedTemplates, templateId]);
    } else {
      toast({
        title: 'Maximum atteint',
        description: 'Vous pouvez sélectionner jusqu\'à 3 templates maximum.',
        variant: 'destructive'
      });
    }
  };

  const handleGenerateVariants = async () => {
    if (selectedTemplates.length === 0) {
      toast({
        title: 'Aucun template sélectionné',
        description: 'Veuillez sélectionner au moins un template.',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    onTemplatesSelected(selectedTemplates);

    try {
      const response = await fetch('/api/templates/generate-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientData,
          templateIds: selectedTemplates
        })
      });

      if (response.ok) {
        const variants = await response.json();
        onGenerateVariants(variants);
        
        toast({
          title: '✅ Variantes générées !',
          description: `${variants.length} variantes de page d'accueil ont été créées.`
        });
      }
    } catch (error) {
      console.error('Error generating variants:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Sélection des templates</h2>
        <p className="text-gray-600">
          Choisissez jusqu'à 3 templates pour créer des variantes de page d'accueil pour {clientData.businessName}
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={handleGenerateVariants}
          disabled={selectedTemplates.length === 0 || isGenerating}
          className="min-w-[200px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Générer {selectedTemplates.length} variante{selectedTemplates.length > 1 ? 's' : ''}
            </>
          )}
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Selected count */}
      {selectedTemplates.length > 0 && (
        <Alert>
          <AlertDescription>
            {selectedTemplates.length}/3 templates sélectionnés
          </AlertDescription>
        </Alert>
      )}

      {/* Templates grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(template => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all ${
                selectedTemplates.includes(template.id)
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => toggleTemplateSelection(template.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {selectedTemplates.includes(template.id) && (
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Template preview */}
                <div className="mb-4 bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center">
                  {template.thumbnail ? (
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Palette className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <div className="flex gap-2 justify-center">
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: template.theme.colors.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: template.theme.colors.secondary }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Preview template
                      window.open(`/templates/preview/${template.id}`, '_blank');
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Aperçu
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun template trouvé</p>
        </div>
      )}
    </div>
  );
}
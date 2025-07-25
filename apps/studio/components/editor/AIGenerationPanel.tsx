'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Zap, Crown, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AIGenerationPanelProps {
  clientData: any;
  onGenerationComplete: (generatedSite: any) => void;
}

export function AIGenerationPanel({ clientData, onGenerationComplete }: AIGenerationPanelProps) {
  const [mode, setMode] = useState<'template' | 'full'>('full');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [generationConfig, setGenerationConfig] = useState({
    quality: 'premium',
    enableAI: true,
    provider: 'deepseek',
    generateLocalPages: true,
    pagesCount: 20,
    wordsPerPage: 2000,
    enableCache: true
  });
  const [stats, setStats] = useState<any>(null);
  const { toast } = useToast();

  const calculateEstimates = () => {
    const basePages = 6; // Home, Services, Zones, About, Contact, Legal
    const localPages = generationConfig.generateLocalPages ? generationConfig.pagesCount : 0;
    const totalPages = basePages + localPages;
    
    const costPerPage = {
      standard: 0.10,
      premium: 0.40,
      ultra: 0.80
    };
    
    const timePerPage = {
      standard: 15,
      premium: 20,
      ultra: 30
    };
    
    const estimatedCost = totalPages * costPerPage[generationConfig.quality as keyof typeof costPerPage];
    const estimatedTime = Math.ceil((totalPages * timePerPage[generationConfig.quality as keyof typeof timePerPage]) / 60);
    
    return {
      totalPages,
      estimatedCost: estimatedCost.toFixed(2),
      estimatedTime,
      totalWords: totalPages * generationConfig.wordsPerPage
    };
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    setStats(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 2000);

      const updateMessages = [
        'Analyse de votre activité...',
        'Planification de la structure du site...',
        'Génération du contenu optimisé SEO...',
        'Création des pages locales...',
        'Optimisation du maillage interne...',
        'Finalisation et vérifications...'
      ];

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < updateMessages.length) {
          setProgressMessage(updateMessages[messageIndex]);
          messageIndex++;
        } else {
          clearInterval(messageInterval);
        }
      }, 3000);

      // Call API
      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientData,
          config: {
            ...generationConfig,
            mode,
            templateId: clientData.selectedTemplateId
          }
        })
      });

      clearInterval(progressInterval);
      clearInterval(messageInterval);

      if (!response.ok) {
        throw new Error('Erreur lors de la génération');
      }

      const result = await response.json();
      
      setProgress(100);
      setProgressMessage('Génération terminée !');
      setStats(result.stats);
      
      toast({
        title: '✅ Site généré avec succès !',
        description: `${result.stats.totalPages} pages créées avec ${result.stats.totalWords} mots de contenu unique.`,
      });

      onGenerationComplete(result);
      
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: '❌ Erreur de génération',
        description: 'Une erreur est survenue lors de la génération du site.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const estimates = calculateEstimates();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Génération IA Intelligente
          </CardTitle>
          <CardDescription>
            Utilisez l'IA pour générer automatiquement un site complet et optimisé SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
              <TabsTrigger value="advanced">Avancé</TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="space-y-4">
              {/* Generation Mode */}
              <div className="space-y-3">
                <Label>Mode de génération</Label>
                <RadioGroup
                  value={mode}
                  onValueChange={(value) => setMode(value as 'template' | 'full')}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="template" id="template-mode" />
                    <Label htmlFor="template-mode" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Template validé</div>
                        <p className="text-sm text-gray-500">Générer le site complet à partir du template choisi par le client</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="full" id="full-mode" />
                    <Label htmlFor="full-mode" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Génération complète</div>
                        <p className="text-sm text-gray-500">Générer tout le site avec l'IA (sans template)</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Quality Selection */}
              <div className="space-y-3">
                <Label>Niveau de qualité</Label>
                <RadioGroup
                  value={generationConfig.quality}
                  onValueChange={(value) => setGenerationConfig({ ...generationConfig, quality: value })}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Standard</span>
                          </div>
                          <p className="text-sm text-gray-500">Contenu basique avec templates</p>
                        </div>
                        <span className="text-sm font-medium">~0.10€/page</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Premium</span>
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Recommandé</span>
                          </div>
                          <p className="text-sm text-gray-500">IA DeepSeek pour contenu unique</p>
                        </div>
                        <span className="text-sm font-medium">~0.40€/page</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="ultra" id="ultra" />
                    <Label htmlFor="ultra" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">Ultra</span>
                          </div>
                          <p className="text-sm text-gray-500">Hybride Claude + DeepSeek</p>
                        </div>
                        <span className="text-sm font-medium">~0.80€/page</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Local Pages Generation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="local-pages">Pages locales SEO</Label>
                  <Switch
                    id="local-pages"
                    checked={generationConfig.generateLocalPages}
                    onCheckedChange={(checked) => 
                      setGenerationConfig({ ...generationConfig, generateLocalPages: checked })
                    }
                  />
                </div>
                {generationConfig.generateLocalPages && (
                  <div className="pl-4 space-y-2">
                    <Label className="text-sm">Nombre de pages (Service × Ville)</Label>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={generationConfig.pagesCount}
                      onChange={(e) => 
                        setGenerationConfig({ ...generationConfig, pagesCount: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>10 pages</span>
                      <span className="font-medium">{generationConfig.pagesCount} pages</span>
                      <span>50 pages</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Estimation */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p><strong>Estimation :</strong></p>
                    <p>• {estimates.totalPages} pages au total</p>
                    <p>• ~{estimates.totalWords.toLocaleString()} mots de contenu</p>
                    <p>• Coût estimé : {estimates.estimatedCost}€</p>
                    <p>• Temps : ~{estimates.estimatedTime} minutes</p>
                  </div>
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Pages qui seront générées :</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <div className="p-2 bg-gray-50 rounded text-sm">🏠 Accueil</div>
                  <div className="p-2 bg-gray-50 rounded text-sm">🛠️ Services</div>
                  <div className="p-2 bg-gray-50 rounded text-sm">📍 Zones d'intervention</div>
                  <div className="p-2 bg-gray-50 rounded text-sm">ℹ️ À propos</div>
                  <div className="p-2 bg-gray-50 rounded text-sm">📞 Contact</div>
                  
                  {generationConfig.generateLocalPages && (
                    <>
                      <div className="text-xs text-gray-500 mt-2">Pages locales SEO :</div>
                      <div className="p-2 bg-blue-50 rounded text-sm">🔧 Plomberie Lyon</div>
                      <div className="p-2 bg-blue-50 rounded text-sm">🔧 Plomberie Villeurbanne</div>
                      <div className="p-2 bg-blue-50 rounded text-sm">🚿 Installation sanitaire Lyon</div>
                      <div className="text-xs text-gray-500">... et {estimates.totalPages - 8} autres pages</div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cache">Utiliser le cache</Label>
                  <Switch
                    id="cache"
                    checked={generationConfig.enableCache}
                    onCheckedChange={(checked) => 
                      setGenerationConfig({ ...generationConfig, enableCache: checked })
                    }
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Le cache permet d'économiser jusqu'à 70% sur les coûts de génération
                </p>
              </div>

              <div className="space-y-2">
                <Label>Mots par page</Label>
                <input
                  type="number"
                  value={generationConfig.wordsPerPage}
                  onChange={(e) => 
                    setGenerationConfig({ ...generationConfig, wordsPerPage: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded"
                  min="1000"
                  max="3000"
                  step="100"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Générer le site avec l'IA
              </>
            )}
          </Button>

          {/* Progress */}
          {isGenerating && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500 text-center">{progressMessage}</p>
            </div>
          )}

          {/* Results */}
          {stats && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="space-y-1 text-green-800">
                  <p className="font-medium">Génération terminée avec succès !</p>
                  <p>• {stats.totalPages} pages générées</p>
                  <p>• {stats.totalWords.toLocaleString()} mots de contenu</p>
                  <p>• {stats.totalInternalLinks} liens internes</p>
                  <p>• Coût total : {stats.aiCost.toFixed(2)}€</p>
                  <p>• Cache : {(stats.cacheHitRate * 100).toFixed(0)}% d'économies</p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
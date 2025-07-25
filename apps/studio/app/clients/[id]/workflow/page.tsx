'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { TemplateSelector } from '@/components/template-selector';
import { 
  CheckCircle, 
  Circle, 
  Send, 
  FileText, 
  Palette, 
  Sparkles,
  Globe,
  Clock,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ClientWorkflowPage() {
  const params = useParams();
  const clientId = params.id as string;
  const [client, setClient] = useState<any>(null);
  const [workflow, setWorkflow] = useState({
    formSent: false,
    formCompleted: false,
    templatesSelected: false,
    variantsGenerated: false,
    clientValidated: false,
    siteGenerated: false,
    siteDeployed: false
  });
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadClient();
  }, [clientId]);

  const loadClient = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}`);
      if (response.ok) {
        const data = await response.json();
        setClient(data);
        
        // Load workflow status
        if (data.workflow) {
          setWorkflow(data.workflow);
        }
      }
    } catch (error) {
      console.error('Error loading client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendFormToClient = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/send-form`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        
        // Copy form URL to clipboard
        navigator.clipboard.writeText(data.formUrl);
        
        toast({
          title: '✅ Formulaire envoyé !',
          description: 'Le lien a été copié dans votre presse-papier.'
        });

        setWorkflow({ ...workflow, formSent: true });
        updateWorkflowStatus({ formSent: true });
      }
    } catch (error) {
      console.error('Error sending form:', error);
    }
  };

  const updateWorkflowStatus = async (updates: Partial<typeof workflow>) => {
    try {
      await fetch(`/api/clients/${clientId}/workflow`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.error('Error updating workflow:', error);
    }
  };

  const handleTemplatesSelected = (templateIds: string[]) => {
    setSelectedTemplates(templateIds);
    setWorkflow({ ...workflow, templatesSelected: true });
    updateWorkflowStatus({ templatesSelected: true });
  };

  const handleVariantsGenerated = (variants: any[]) => {
    setGeneratedVariants(variants);
    setWorkflow({ ...workflow, variantsGenerated: true });
    updateWorkflowStatus({ variantsGenerated: true });
  };

  const generateFullSite = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}/generate-full-site`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: client.selectedTemplateId,
          useAI: true
        })
      });

      if (response.ok) {
        toast({
          title: '🚀 Génération lancée !',
          description: 'Le site complet est en cours de génération (environ 10 minutes).'
        });

        setWorkflow({ ...workflow, siteGenerated: true });
        updateWorkflowStatus({ siteGenerated: true });
      }
    } catch (error) {
      console.error('Error generating site:', error);
    }
  };

  const getWorkflowProgress = () => {
    const steps = Object.values(workflow);
    const completed = steps.filter(Boolean).length;
    return (completed / steps.length) * 100;
  };

  const getStepStatus = (isCompleted: boolean) => {
    return isCompleted ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <Circle className="h-5 w-5 text-gray-300" />
    );
  };

  if (isLoading || !client) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{client.businessName}</h1>
            <p className="text-gray-600">{client.businessType} • {client.city}</p>
          </div>
          <Badge variant={workflow.siteDeployed ? 'default' : 'secondary'}>
            {workflow.siteDeployed ? 'Site en ligne' : 'En cours'}
          </Badge>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression globale</span>
            <span>{Math.round(getWorkflowProgress())}%</span>
          </div>
          <Progress value={getWorkflowProgress()} />
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Step 1: Form */}
        <Card className={workflow.formCompleted ? 'border-green-200' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">1. Formulaire client</CardTitle>
              {getStepStatus(workflow.formCompleted)}
            </div>
          </CardHeader>
          <CardContent>
            {!workflow.formSent ? (
              <Button onClick={sendFormToClient} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Envoyer le formulaire
              </Button>
            ) : workflow.formCompleted ? (
              <div className="space-y-2">
                <p className="text-sm text-green-600">✅ Formulaire complété</p>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Voir les réponses
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-amber-600">⏳ En attente de réponse</p>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/client-form/${clientId}`);
                  toast({ title: 'Lien copié !' });
                }}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copier le lien
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Templates */}
        <Card className={workflow.variantsGenerated ? 'border-green-200' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">2. Sélection templates</CardTitle>
              {getStepStatus(workflow.variantsGenerated)}
            </div>
          </CardHeader>
          <CardContent>
            {!workflow.formCompleted ? (
              <p className="text-sm text-gray-500">En attente du formulaire...</p>
            ) : !workflow.variantsGenerated ? (
              <Button
                onClick={() => {/* Open template selector */}}
                className="w-full"
                disabled={!workflow.formCompleted}
              >
                <Palette className="mr-2 h-4 w-4" />
                Choisir les templates
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-green-600">✅ {generatedVariants.length} variantes créées</p>
                <Button variant="outline" size="sm" className="w-full">
                  Voir les variantes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 3: Validation */}
        <Card className={workflow.clientValidated ? 'border-green-200' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">3. Validation client</CardTitle>
              {getStepStatus(workflow.clientValidated)}
            </div>
          </CardHeader>
          <CardContent>
            {!workflow.variantsGenerated ? (
              <p className="text-sm text-gray-500">En attente des variantes...</p>
            ) : !workflow.clientValidated ? (
              <div className="space-y-2">
                <p className="text-sm text-amber-600">⏳ En attente de validation</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    const validationUrl = `${window.location.origin}/client-validation/${clientId}`;
                    window.open(validationUrl, '_blank');
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Voir le portail
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-green-600">✅ Template validé</p>
                <p className="text-xs text-gray-500">
                  Le client a choisi : {client.selectedTemplateName}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="generation">Génération</TabsTrigger>
          <TabsTrigger value="deployment">Déploiement</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          {workflow.formCompleted && !workflow.variantsGenerated ? (
            <TemplateSelector
              clientData={client}
              onTemplatesSelected={handleTemplatesSelected}
              onGenerateVariants={handleVariantsGenerated}
            />
          ) : workflow.variantsGenerated ? (
            <Card>
              <CardHeader>
                <CardTitle>Variantes générées</CardTitle>
                <CardDescription>
                  {generatedVariants.length} variantes ont été créées et envoyées au client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedVariants.map((variant, index) => (
                    <Card key={variant.id} className="overflow-hidden">
                      <div className="aspect-video bg-gray-100 relative">
                        <iframe
                          src={`/preview/${variant.id}?minimal=true`}
                          className="absolute inset-0 w-full h-full"
                          title={variant.templateName}
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="font-medium">Option {index + 1}</p>
                        <p className="text-sm text-gray-500">{variant.templateName}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertDescription>
                Complétez le formulaire client pour accéder à la sélection de templates
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="generation">
          {workflow.clientValidated ? (
            <Card>
              <CardHeader>
                <CardTitle>Génération du site complet</CardTitle>
                <CardDescription>
                  Le client a validé le template. Vous pouvez maintenant générer le site complet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!workflow.siteGenerated ? (
                  <>
                    <Alert>
                      <AlertDescription>
                        La génération créera automatiquement :
                        <ul className="list-disc list-inside mt-2">
                          <li>Toutes les pages (accueil, services, contact, etc.)</li>
                          <li>Contenu optimisé SEO avec l'IA</li>
                          <li>Pages locales pour chaque ville</li>
                          <li>Maillage interne intelligent</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                    <Button onClick={generateFullSite} className="w-full" size="lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Générer le site complet
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        Site généré avec succès ! Vous pouvez maintenant le prévisualiser et le déployer.
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open(`/editor?clientId=${clientId}`, '_blank')}
                      >
                        Ouvrir dans l'éditeur
                      </Button>
                      <Button
                        onClick={() => window.open(`/preview/${clientId}`, '_blank')}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        Prévisualiser
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertDescription>
                Le client doit d'abord valider un template avant de générer le site complet
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="deployment">
          {workflow.siteGenerated ? (
            <Card>
              <CardHeader>
                <CardTitle>Déploiement</CardTitle>
                <CardDescription>
                  Déployez le site sur l'hébergement du client
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!workflow.siteDeployed ? (
                  <div className="space-y-4">
                    <Button className="w-full" size="lg">
                      <Globe className="mr-2 h-4 w-4" />
                      Déployer sur Netlify
                    </Button>
                    <p className="text-sm text-gray-500 text-center">
                      Le site sera accessible à l'adresse : {client.businessName.toLowerCase().replace(/\s+/g, '-')}.netlify.app
                    </p>
                  </div>
                ) : (
                  <Alert className="border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      Site déployé avec succès !
                      <br />
                      URL : <a href={client.deployedUrl} target="_blank" className="underline">
                        {client.deployedUrl}
                      </a>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertDescription>
                Générez d'abord le site complet avant de pouvoir le déployer
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
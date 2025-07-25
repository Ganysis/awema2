'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Loader2, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ClientValidationPortalProps {
  clientId: string;
  token: string;
  variants: Array<{
    id: string;
    templateName: string;
    preview: {
      blocks: any[];
      theme: any;
    };
  }>;
}

export function ClientValidationPortal({ 
  clientId, 
  token, 
  variants 
}: ClientValidationPortalProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedVariant) {
      toast({
        title: 'Sélection requise',
        description: 'Veuillez choisir une variante avant de valider.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/clients/${clientId}/validate-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          selectedTemplateId: selectedVariant,
          feedback
        })
      });

      if (response.ok) {
        setIsCompleted(true);
        
        // Déclencher la génération complète du site
        await fetch(`/api/clients/${clientId}/generate-full-site`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            templateId: selectedVariant
          })
        });
      }
    } catch (error) {
      console.error('Error submitting validation:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive'
      });
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
              <h2 className="text-2xl font-bold mb-2">Merci pour votre validation !</h2>
              <p className="text-gray-600 mb-4">
                Nous allons maintenant créer votre site web complet basé sur le modèle que vous avez choisi.
              </p>
              <Alert>
                <AlertDescription>
                  <strong>Prochaines étapes :</strong>
                  <ul className="list-disc list-inside mt-2 text-left">
                    <li>Génération complète de votre site (30 minutes)</li>
                    <li>Optimisation SEO et performances</li>
                    <li>Configuration de votre espace d'administration</li>
                    <li>Mise en ligne sur votre domaine</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <p className="text-sm text-gray-500 mt-4">
                Vous recevrez un email dès que votre site sera prêt.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'tablet':
        return 'max-w-3xl';
      case 'mobile':
        return 'max-w-sm';
      default:
        return 'max-w-full';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Choisissez votre design préféré</h1>
          <p className="text-gray-600">
            Nous avons créé 3 variantes de page d'accueil pour votre site. 
            Sélectionnez celle qui vous convient le mieux.
          </p>
        </div>

        {/* Device selector */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={deviceView === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('desktop')}
          >
            <Monitor className="h-4 w-4 mr-1" />
            Ordinateur
          </Button>
          <Button
            variant={deviceView === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('tablet')}
          >
            <Tablet className="h-4 w-4 mr-1" />
            Tablette
          </Button>
          <Button
            variant={deviceView === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('mobile')}
          >
            <Smartphone className="h-4 w-4 mr-1" />
            Mobile
          </Button>
        </div>

        {/* Variants */}
        <RadioGroup value={selectedVariant} onValueChange={setSelectedVariant}>
          <div className="space-y-8">
            {variants.map((variant, index) => (
              <Card key={variant.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={variant.id} id={variant.id} />
                      <Label htmlFor={variant.id} className="cursor-pointer">
                        <CardTitle>Option {index + 1}: {variant.templateName}</CardTitle>
                      </Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/preview/${variant.id}?device=${deviceView}`, '_blank')}
                    >
                      Voir en plein écran
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`mx-auto transition-all duration-300 ${getDeviceClass()}`}>
                    <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
                      <iframe
                        src={`/preview/${variant.id}?minimal=true`}
                        className="w-full"
                        style={{ height: deviceView === 'mobile' ? '600px' : '500px' }}
                        title={`Preview ${variant.templateName}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>

        {/* Feedback section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Votre avis</CardTitle>
            <CardDescription>
              Des remarques ou des modifications souhaitées ? Faites-le nous savoir !
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Exemple : J'aime l'option 2 mais j'aimerais des couleurs plus vives..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!selectedVariant || isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validation en cours...
                </>
              ) : (
                'Valider mon choix'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
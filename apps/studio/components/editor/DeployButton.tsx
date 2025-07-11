'use client';

import React, { useState } from 'react';
import { Rocket, AlertCircle, CheckCircle, Loader2, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { generateSiteSlug } from '@/lib/utils/site-slug';

interface DeploymentOptions {
  siteName: string;
  customDomain?: string;
  plan: 'starter' | 'pro' | 'premium';
  adminEmail?: string;
}

interface DeployProgress {
  stage: 'preparing' | 'transforming' | 'uploading' | 'deploying' | 'completed' | 'error';
  message: string;
  progress: number;
  siteUrl?: string;
  deployId?: string;
}

interface DeployButtonProps {
  projectData: any;
  className?: string;
}

export function DeployButton({ projectData, className }: DeployButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState<DeployProgress | null>(null);
  const [deployResult, setDeployResult] = useState<any>(null);
  const [options, setOptions] = useState<DeploymentOptions>({
    siteName: generateSiteSlug(projectData?.businessInfo?.name || 'mon-site'),
    plan: 'starter'
  });
  const { toast } = useToast();

  const validateOptions = (): string | null => {
    if (!options.siteName) {
      return 'Le nom du site est requis';
    }
    if (!/^[a-z0-9-]+$/.test(options.siteName)) {
      return 'Le nom du site ne doit contenir que des lettres minuscules, chiffres et tirets';
    }
    if (options.customDomain && !/^([a-z0-9-]+\.)+[a-z]{2,}$/.test(options.customDomain)) {
      return 'Le domaine personnalisé n\'est pas valide';
    }
    if (options.adminEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(options.adminEmail)) {
      return 'L\'email admin n\'est pas valide';
    }
    return null;
  };

  const handleDeploy = async () => {
    const error = validateOptions();
    if (error) {
      toast({
        title: 'Erreur de validation',
        description: error,
        variant: 'destructive'
      });
      return;
    }

    setIsDeploying(true);
    setDeployProgress({
      stage: 'preparing',
      message: 'Préparation du déploiement...',
      progress: 0
    });

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteId: crypto.randomUUID(),
          siteName: options.siteName,
          projectData: projectData,
          plan: options.plan,
          customDomain: options.customDomain,
          adminEmail: options.adminEmail || `admin@${options.siteName}.awema.site`
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erreur lors du déploiement');
      }

      const result = await response.json();

      if (result.success) {
        setDeployResult(result);
        setDeployProgress({
          stage: 'completed',
          message: 'Déploiement terminé avec succès !',
          progress: 100,
          siteUrl: result.siteUrl
        });
        
        toast({
          title: 'Déploiement réussi !',
          description: 'Votre site est maintenant en ligne.',
        });
      } else {
        throw new Error(result.error || 'Échec du déploiement');
      }
    } catch (error) {
      console.error('Erreur de déploiement:', error);
      setDeployProgress({
        stage: 'error',
        message: error instanceof Error ? error.message : 'Erreur inconnue',
        progress: 0
      });
      
      toast({
        title: 'Erreur de déploiement',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive'
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const resetDeploy = () => {
    setDeployProgress(null);
    setDeployResult(null);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={className}
        variant="default"
      >
        <Rocket className="w-4 h-4 mr-2" />
        Déployer
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {deployResult ? 'Déploiement Réussi !' : 'Déployer votre site'}
            </DialogTitle>
            <DialogDescription>
              {deployResult 
                ? 'Votre site est maintenant en ligne.'
                : 'Configurez les options de déploiement pour votre site.'
              }
            </DialogDescription>
          </DialogHeader>

          {!deployResult ? (
            <div className="space-y-4 py-4">
              {/* Progress */}
              {deployProgress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{deployProgress.message}</span>
                    <span className="font-medium">{deployProgress.progress}%</span>
                  </div>
                  <Progress value={deployProgress.progress} className="h-2" />
                  {deployProgress.stage === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{deployProgress.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Configuration Form */}
              {!isDeploying && (
                <>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="siteName">Nom du site</Label>
                      <Input
                        id="siteName"
                        value={options.siteName}
                        onChange={(e) => setOptions({ ...options, siteName: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                        placeholder="mon-site-web"
                      />
                      <p className="text-sm text-muted-foreground">
                        Votre site sera accessible à : {options.siteName}.netlify.app
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="customDomain">Domaine personnalisé (optionnel)</Label>
                      <Input
                        id="customDomain"
                        value={options.customDomain || ''}
                        onChange={(e) => setOptions({ ...options, customDomain: e.target.value })}
                        placeholder="www.monentreprise.fr"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label>Plan</Label>
                      <RadioGroup 
                        value={options.plan} 
                        onValueChange={(value) => setOptions({ ...options, plan: value as any })}
                      >
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                          <RadioGroupItem value="starter" id="starter" />
                          <Label htmlFor="starter" className="flex-1 cursor-pointer">
                            <div className="font-medium">Starter - Gratuit</div>
                            <div className="text-sm text-muted-foreground">Site statique sans CMS</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                          <RadioGroupItem value="pro" id="pro" />
                          <Label htmlFor="pro" className="flex-1 cursor-pointer">
                            <div className="font-medium">Pro - 39€/mois</div>
                            <div className="text-sm text-muted-foreground">
                              <Database className="inline w-3 h-3 mr-1" />
                              CMS basique pour éditer le contenu
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                          <RadioGroupItem value="premium" id="premium" />
                          <Label htmlFor="premium" className="flex-1 cursor-pointer">
                            <div className="font-medium">Premium - 59€/mois</div>
                            <div className="text-sm text-muted-foreground">
                              <Database className="inline w-3 h-3 mr-1" />
                              CMS complet avec toutes les fonctionnalités
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {options.plan !== 'starter' && (
                      <div className="grid gap-2">
                        <Label htmlFor="adminEmail">Email administrateur</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={options.adminEmail || ''}
                          onChange={(e) => setOptions({ ...options, adminEmail: e.target.value })}
                          placeholder="admin@monentreprise.fr"
                        />
                        <p className="text-sm text-muted-foreground">
                          Pour accéder au CMS de votre site
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="py-4 space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">Votre site est maintenant en ligne !</p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <Globe className="inline w-3 h-3 mr-1" />
                        URL : <a href={deployResult.siteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {deployResult.siteUrl}
                        </a>
                      </p>
                      {deployResult.adminUrl && (
                        <p>
                          <Database className="inline w-3 h-3 mr-1" />
                          Admin : <a href={deployResult.adminUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {deployResult.adminUrl}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {deployResult.credentials && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Identifiants CMS (à conserver) :</p>
                      <div className="space-y-1 text-sm font-mono bg-muted p-2 rounded">
                        <p>Email : {deployResult.credentials.email}</p>
                        <p>Mot de passe : {deployResult.credentials.password}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {deployResult.dnsInstructions && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium">Configuration DNS requise pour votre domaine personnalisé.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <DialogFooter>
            {!deployResult ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isDeploying}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleDeploy}
                  disabled={isDeploying}
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Déploiement en cours...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Déployer maintenant
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={resetDeploy}
                >
                  Fermer
                </Button>
                <Button
                  onClick={() => window.open(deployResult.siteUrl, '_blank')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Voir le site
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
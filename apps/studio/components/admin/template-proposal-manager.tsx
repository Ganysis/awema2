'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Eye, 
  Edit3, 
  Send, 
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  FileText,
  Palette,
  Wand2,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

interface TemplateProposal {
  id: string;
  clientId: string;
  client: {
    name: string;
    email: string;
    companyName?: string;
  };
  formData: any;
  aiAnalysis?: any;
  option1?: any;
  option2?: any;
  option3?: any;
  adminNotes?: string;
  customMessage?: string;
  status: string;
  createdAt: string;
  analyzedAt?: string;
}

export function TemplateProposalManager() {
  const [proposals, setProposals] = useState<TemplateProposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<TemplateProposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [customizations, setCustomizations] = useState({
    option1: { notes: '', highlights: [] },
    option2: { notes: '', highlights: [] },
    option3: { notes: '', highlights: [] },
    globalMessage: ''
  });

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/template-proposals');
      const data = await response.json();
      if (data.success) {
        setProposals(data.proposals);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des propositions');
    } finally {
      setLoading(false);
    }
  };

  const analyzeWithAI = async (proposalId: string) => {
    try {
      const response = await fetch(`/api/admin/template-proposals/${proposalId}/analyze`, {
        method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Analyse IA terminée');
        loadProposals();
      }
    } catch (error) {
      toast.error('Erreur lors de l\'analyse');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'ANALYZED': return <Sparkles className="w-4 h-4 text-blue-500" />;
      case 'CUSTOMIZING': return <Edit3 className="w-4 h-4 text-purple-500" />;
      case 'PROPOSED': return <Send className="w-4 h-4 text-green-500" />;
      case 'SELECTED': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'PENDING': 'En attente d\'analyse',
      'ANALYZED': 'Analysé par IA',
      'CUSTOMIZING': 'En personnalisation',
      'PROPOSED': 'Proposé au client',
      'SELECTED': 'Sélectionné'
    };
    return labels[status] || status;
  };

  const renderAIInsights = (analysis: any) => {
    if (!analysis) return null;

    return (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Analyse IA du profil client
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Type d\'entreprise:</strong> {analysis.businessProfile}</p>
            <p><strong>Besoins prioritaires:</strong> {analysis.priorities?.join(', ')}</p>
            <p><strong>Style recommandé:</strong> {analysis.recommendedStyle}</p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Points clés à mettre en avant</h4>
          <ul className="space-y-1 text-sm text-purple-800">
            {analysis.keyPoints?.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Suggestions de personnalisation</h4>
          <div className="space-y-2 text-sm text-green-800">
            {analysis.customizationTips?.map((tip: string, i: number) => (
              <p key={i}>{tip}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTemplateOption = (option: any, index: number) => {
    if (!option) return null;

    return (
      <Card className="border-2 hover:border-blue-200 transition-all">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Option {index + 1}: {option.templateName}
            <Badge variant="outline">{option.score}% match</Badge>
          </CardTitle>
          <CardDescription>{option.reasoning}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Aperçu visuel */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Structure</Label>
              <div className="mt-1 p-3 bg-gray-50 rounded text-xs space-y-1">
                {option.blocks?.slice(0, 5).map((block: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    {block.type}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Palette</Label>
              <div className="mt-1 flex gap-1">
                {Object.values(option.theme?.colors || {}).slice(0, 4).map((color: any, i: number) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded shadow-sm" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Notes personnalisées */}
          <div>
            <Label htmlFor={`notes-${index}`}>
              Notes personnalisées pour le client
            </Label>
            <Textarea
              id={`notes-${index}`}
              placeholder="Ex: Ce design moderne met en valeur votre expertise avec..."
              className="mt-1"
              rows={3}
              value={customizations[`option${index + 1}` as keyof typeof customizations].notes}
              onChange={(e) => setCustomizations({
                ...customizations,
                [`option${index + 1}`]: {
                  ...customizations[`option${index + 1}` as keyof typeof customizations],
                  notes: e.target.value
                }
              })}
            />
          </div>

          {/* Points forts à souligner */}
          <div>
            <Label>Points forts à souligner</Label>
            <div className="mt-1 space-y-2">
              {['Urgence 24/7 mis en avant', 'Portfolio visuel impactant', 'Optimisé conversion'].map((point) => (
                <label key={point} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  {point}
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const saveCustomizations = async () => {
    if (!selectedProposal) return;

    try {
      const response = await fetch(`/api/admin/template-proposals/${selectedProposal.id}/customize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customizations,
          status: 'CUSTOMIZING'
        })
      });

      if (response.ok) {
        toast.success('Personnalisations sauvegardées');
        loadProposals();
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const sendToClient = async () => {
    if (!selectedProposal) return;

    try {
      const response = await fetch(`/api/admin/template-proposals/${selectedProposal.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customizations,
          customMessage: customizations.globalMessage
        })
      });

      if (response.ok) {
        toast.success('Propositions envoyées au client !');
        loadProposals();
        setSelectedProposal(null);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi');
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Liste des propositions */}
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Propositions en attente</CardTitle>
            <CardDescription>
              {proposals.length} demande{proposals.length > 1 ? 's' : ''} à traiter
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedProposal?.id === proposal.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedProposal(proposal)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {proposal.client.companyName || proposal.client.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {proposal.client.email}
                      </div>
                    </div>
                    {getStatusIcon(proposal.status)}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-xs">
                      {getStatusLabel(proposal.status)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(proposal.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Détails et personnalisation */}
      <div className="md:col-span-2">
        {selectedProposal ? (
          <div className="space-y-6">
            {/* En-tête */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedProposal.client.companyName || selectedProposal.client.name}
                      <Badge>{selectedProposal.formData.businessType}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Proposition créée le {new Date(selectedProposal.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {selectedProposal.status === 'PENDING' && (
                      <Button 
                        onClick={() => analyzeWithAI(selectedProposal.id)}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Wand2 className="w-4 h-4" />
                        Analyser avec IA
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Données du formulaire */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Informations du formulaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Services:</span>
                    <p className="text-gray-600">{selectedProposal.formData.services?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Zone de service:</span>
                    <p className="text-gray-600">{selectedProposal.formData.serviceAreas?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Urgence 24/7:</span>
                    <p className="text-gray-600">{selectedProposal.formData.is24x7Available ? 'Oui' : 'Non'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Style préféré:</span>
                    <p className="text-gray-600">{selectedProposal.formData.stylePreference}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analyse IA */}
            {selectedProposal.aiAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Analyse IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderAIInsights(selectedProposal.aiAnalysis)}
                </CardContent>
              </Card>
            )}

            {/* Options de templates */}
            {selectedProposal.status !== 'PENDING' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Options de templates</h3>
                  <Button 
                    onClick={saveCustomizations}
                    variant="outline"
                    size="sm"
                  >
                    Sauvegarder
                  </Button>
                </div>

                <Tabs defaultValue="0" className="space-y-4">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="0">Option 1</TabsTrigger>
                    <TabsTrigger value="1">Option 2</TabsTrigger>
                    <TabsTrigger value="2">Option 3</TabsTrigger>
                  </TabsList>

                  {[selectedProposal.option1, selectedProposal.option2, selectedProposal.option3].map((option, index) => (
                    <TabsContent key={index} value={index.toString()}>
                      {renderTemplateOption(option, index)}
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Message personnalisé global */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message personnalisé au client
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Bonjour [Nom], Suite à notre échange et l'analyse de vos besoins, j'ai le plaisir de vous présenter 3 propositions de sites web entièrement personnalisées pour votre activité de [métier]..."
                      rows={6}
                      value={customizations.globalMessage}
                      onChange={(e) => setCustomizations({
                        ...customizations,
                        globalMessage: e.target.value
                      })}
                    />
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                  <Button variant="outline">
                    Aperçu client
                  </Button>
                  <Button 
                    onClick={sendToClient}
                    className="flex items-center gap-2"
                    disabled={!customizations.globalMessage}
                  >
                    <Send className="w-4 h-4" />
                    Envoyer au client
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center text-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Sélectionnez une proposition pour commencer</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
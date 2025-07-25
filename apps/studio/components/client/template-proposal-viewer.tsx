'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  Sparkles, 
  Palette, 
  Layout, 
  Star,
  ArrowRight,
  Eye,
  MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ProposalOption {
  templateName: string;
  adminNotes: string;
  customHighlights: string[];
  theme: any;
  blocks: any[];
}

interface ClientProposal {
  id: string;
  customMessage: string;
  option1: ProposalOption;
  option2: ProposalOption;
  option3: ProposalOption;
  selectedOption?: number;
  status: string;
}

interface TemplateProposalViewerProps {
  proposalId: string;
}

export function TemplateProposalViewer({ proposalId }: TemplateProposalViewerProps) {
  const [proposal, setProposal] = useState<ClientProposal | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    loadProposal();
  }, [proposalId]);

  const loadProposal = async () => {
    try {
      const response = await fetch(`/api/client/proposals/${proposalId}`);
      const data = await response.json();
      
      if (data.success) {
        setProposal(data.proposal);
        if (data.proposal.selectedOption) {
          setSelectedOption(data.proposal.selectedOption.toString());
          setShowThankYou(true);
        }
      } else {
        toast.error('Proposition introuvable');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const submitSelection = async () => {
    if (!selectedOption) {
      toast.error('Veuillez sélectionner une option');
      return;
    }

    try {
      const response = await fetch(`/api/client/proposals/${proposalId}/select`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOption: parseInt(selectedOption) })
      });

      if (response.ok) {
        setShowThankYou(true);
        toast.success('Votre choix a été enregistré !');
      }
    } catch (error) {
      toast.error('Erreur lors de la sélection');
    }
  };

  const renderOption = (option: ProposalOption, index: number) => {
    return (
      <Card className={`relative overflow-hidden transition-all ${
        selectedOption === index.toString() 
          ? 'border-2 border-blue-500 shadow-xl' 
          : 'hover:shadow-lg'
      }`}>
        {selectedOption === index.toString() && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-500">
              <Check className="w-3 h-3 mr-1" />
              Sélectionné
            </Badge>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl">
            Option {index + 1}: Design {option.templateName}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {option.adminNotes}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Points forts personnalisés */}
          {option.customHighlights && option.customHighlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Points forts de ce design
              </h4>
              <ul className="space-y-1">
                {option.customHighlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Aperçu visuel stylisé */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Structure du site
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {option.blocks.slice(0, 5).map((block, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                      i === 0 ? 'from-blue-500 to-blue-600' :
                      i === 1 ? 'from-green-500 to-green-600' :
                      i === 2 ? 'from-purple-500 to-purple-600' :
                      i === 3 ? 'from-orange-500 to-orange-600' :
                      'from-pink-500 to-pink-600'
                    }`} />
                    <span className="text-sm capitalize">
                      {block.type.replace(/-/g, ' ').replace('v3 perfect', '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Palette de couleurs
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(option.theme.colors).slice(0, 4).map(([name, color]) => (
                    <div key={name} className="text-center">
                      <div 
                        className="w-full h-16 rounded-lg shadow-sm mb-2 transition-transform hover:scale-105" 
                        style={{ backgroundColor: color as string }}
                      />
                      <span className="text-xs text-gray-600 capitalize">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              Ce design a été spécialement conçu pour mettre en valeur votre activité 
              et attirer vos clients cibles.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p>Chargement de vos propositions personnalisées...</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="text-center p-8">
            <p>Proposition introuvable</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showThankYou && proposal.selectedOption) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Merci pour votre choix !</CardTitle>
            <CardDescription className="text-base mt-2">
              Vous avez sélectionné l'option {proposal.selectedOption}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Notre équipe va maintenant personnaliser ce design avec vos contenus 
              et vos couleurs. Nous vous contacterons très prochainement pour la suite.
            </p>
            <Button className="flex items-center gap-2 mx-auto">
              <MessageCircle className="w-4 h-4" />
              Nous contacter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* En-tête personnalisé */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Vos propositions de sites web personnalisés
        </h1>
        {proposal.customMessage && (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-gray-700 whitespace-pre-line">
                {proposal.customMessage}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Options */}
      <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
        <div className="space-y-8">
          {[proposal.option1, proposal.option2, proposal.option3].map((option, index) => (
            <div key={index} className="relative">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="absolute top-6 left-6 z-10"
              />
              <Label htmlFor={`option-${index}`} className="cursor-pointer block">
                {renderOption(option, index)}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur p-6 border-t">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-medium">Prêt à faire votre choix ?</p>
            <p className="text-sm text-gray-600">
              Sélectionnez l'option qui vous convient le mieux
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Demander plus d'infos
            </Button>
            <Button 
              onClick={submitSelection}
              disabled={!selectedOption}
              className="flex items-center gap-2"
            >
              Valider mon choix
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
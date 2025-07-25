'use client';

import React, { useState, useEffect } from 'react';
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
import { TemplatePreview } from './template-preview';

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

export function TemplateProposalManagerSimple() {
  const [proposals, setProposals] = useState<TemplateProposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<TemplateProposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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
      alert('Erreur lors du chargement des propositions');
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
        alert('Analyse IA terminée !');
        // Recharger les propositions et forcer la mise à jour
        const response2 = await fetch('/api/admin/template-proposals');
        const data2 = await response2.json();
        if (data2.success) {
          setProposals(data2.proposals);
          // Trouver et sélectionner la proposition mise à jour
          const updatedProposal = data2.proposals.find((p: any) => p.id === proposalId);
          if (updatedProposal) {
            setSelectedProposal(updatedProposal);
          }
        }
      }
    } catch (error) {
      alert('Erreur lors de l\'analyse');
    }
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
        alert('Personnalisations sauvegardées !');
        loadProposals();
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
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
        alert('Propositions envoyées au client !');
        loadProposals();
        setSelectedProposal(null);
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi');
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

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Liste des propositions */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Propositions en attente</h2>
            <p className="text-gray-600">
              {proposals.length} demande{proposals.length > 1 ? 's' : ''} à traiter
            </p>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getStatusLabel(proposal.status)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Détails et personnalisation */}
      <div className="md:col-span-2">
        {selectedProposal ? (
          <div className="space-y-6">
            {/* En-tête */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {selectedProposal.client.companyName || selectedProposal.client.name}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {selectedProposal.formData.businessType}
                    </span>
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Proposition créée le {new Date(selectedProposal.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {selectedProposal.status === 'PENDING' && (
                    <button 
                      onClick={() => analyzeWithAI(selectedProposal.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Wand2 className="w-4 h-4" />
                      Analyser avec IA
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Données du formulaire */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4" />
                Informations du formulaire
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Services ({selectedProposal.formData.services?.length || 0}):</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.services?.map((s: any) => 
                      typeof s === 'string' ? s : (s.name || s.title || 'Service')
                    ).join(', ')}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Zone de service:</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.serviceAreas?.map((a: any) => 
                      typeof a === 'string' ? a : (a.city || a.name || 'Zone')
                    ).join(', ')}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Urgence 24/7:</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.availability?.is24x7 || selectedProposal.formData.is24x7Available ? 'Oui' : 'Non'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Style préféré:</span>
                  <p className="text-gray-600">{selectedProposal.formData.stylePreference}</p>
                </div>
                <div>
                  <span className="font-medium">Équipe:</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.teamSize || 0} personnes
                    {selectedProposal.formData.teamMembers?.length > 0 && 
                      ` (${selectedProposal.formData.teamMembers.length} profils détaillés)`
                    }
                  </p>
                </div>
                <div>
                  <span className="font-medium">Portfolio:</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.portfolioImages?.length || 0} images
                    {selectedProposal.formData.projects?.length > 0 && 
                      ` + ${selectedProposal.formData.projects.length} projets détaillés`
                    }
                  </p>
                </div>
                <div>
                  <span className="font-medium">Certifications:</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.certifications?.length || 0}
                    {selectedProposal.formData.labels?.length > 0 && 
                      ` + ${selectedProposal.formData.labels.length} labels`
                    }
                  </p>
                </div>
                <div>
                  <span className="font-medium">Depuis:</span>
                  <p className="text-gray-600">
                    {selectedProposal.formData.yearEstablished || 'Non spécifié'}
                    {selectedProposal.formData.familyBusiness && ' (Entreprise familiale)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Aperçu des médias si disponibles */}
            {(selectedProposal.formData.portfolioImages?.length > 0 || 
              selectedProposal.formData.services?.some((s: any) => s.image) ||
              selectedProposal.formData.teamMembers?.some((m: any) => m.photo)) && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4" />
                  Médias disponibles
                </h3>
                <div className="space-y-3 text-sm">
                  {selectedProposal.formData.services?.filter((s: any) => s.image).length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Images services:</span>
                      <span className="text-gray-600">
                        {selectedProposal.formData.services.filter((s: any) => s.image).length} images
                      </span>
                    </div>
                  )}
                  {selectedProposal.formData.portfolioImages?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Portfolio:</span>
                      <span className="text-gray-600">
                        {selectedProposal.formData.portfolioImages.length} réalisations
                      </span>
                    </div>
                  )}
                  {selectedProposal.formData.teamMembers?.filter((m: any) => m.photo).length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Photos équipe:</span>
                      <span className="text-gray-600">
                        {selectedProposal.formData.teamMembers.filter((m: any) => m.photo).length} membres
                      </span>
                    </div>
                  )}
                  {selectedProposal.formData.certifications?.filter((c: any) => c.image).length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Logos certifications:</span>
                      <span className="text-gray-600">
                        {selectedProposal.formData.certifications.filter((c: any) => c.image).length} logos
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analyse IA */}
            {selectedProposal.aiAnalysis && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4" />
                  Analyse IA
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Profil client</h4>
                    <p className="text-sm text-blue-800">
                      {typeof selectedProposal.aiAnalysis.businessProfile === 'string' 
                        ? selectedProposal.aiAnalysis.businessProfile 
                        : selectedProposal.aiAnalysis.businessProfile?.description || 'Profil en cours d\'analyse...'}
                    </p>
                    {selectedProposal.aiAnalysis.businessProfile?.specificites && (
                      <p className="text-sm text-blue-800 mt-1">
                        <strong>Spécificités:</strong> {selectedProposal.aiAnalysis.businessProfile.specificites}
                      </p>
                    )}
                    <p className="text-sm text-blue-800 mt-1">
                      <strong>Priorités:</strong> {selectedProposal.aiAnalysis.priorities?.join(', ')}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Points clés</h4>
                    <ul className="space-y-1 text-sm text-purple-800">
                      {selectedProposal.aiAnalysis.keyPoints?.map((point: string, i: number) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Options de templates */}
            {selectedProposal.status !== 'PENDING' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Options de templates</h3>
                  <button 
                    onClick={saveCustomizations}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Sauvegarder
                  </button>
                </div>

                {/* Tabs simples */}
                <div className="bg-white rounded-lg shadow">
                  <div className="flex border-b">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 px-4 py-3 text-sm font-medium ${
                          activeTab === index 
                            ? 'border-b-2 border-blue-500 text-blue-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Option {index + 1}
                      </button>
                    ))}
                  </div>

                  {/* Contenu de l'option */}
                  <div className="p-6">
                    {[selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab] && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium mb-1">
                                {[selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].templateName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {[selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].reasoning}
                              </p>
                            </div>
                            <TemplatePreview 
                              template={{
                                id: [selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].templateId,
                                name: [selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].templateName,
                                blocks: [selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].blocks || [],
                                theme: [selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].theme || {}
                              }}
                            />
                          </div>
                        </div>

                        {/* Aperçu miniature */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="text-sm font-medium mb-2">Aperçu de la structure :</h5>
                          <div className="space-y-2">
                            {[selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].blocks?.slice(0, 5).map((block: any, i: number) => (
                              <div key={i} className="flex items-center gap-3 text-sm">
                                <div className={`w-3 h-3 rounded-full ${
                                  i === 0 ? 'bg-blue-500' :
                                  i === 1 ? 'bg-green-500' :
                                  i === 2 ? 'bg-purple-500' :
                                  i === 3 ? 'bg-orange-500' :
                                  'bg-pink-500'
                                }`} />
                                <span className="capitalize">
                                  {block.type.replace(/-/g, ' ').replace('v3 perfect', '')}
                                  {block.variant && block.variant !== 'default' && ` - ${block.variant}`}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Palette :</span>
                              <div className="flex gap-1">
                                {Object.entries([selectedProposal.option1, selectedProposal.option2, selectedProposal.option3][activeTab].theme?.colors || {}).slice(0, 4).map(([name, color]: [string, any]) => (
                                  <div 
                                    key={name}
                                    className="w-6 h-6 rounded shadow-sm" 
                                    style={{ backgroundColor: color }}
                                    title={name}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Notes personnalisées pour le client
                          </label>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={3}
                            placeholder="Ex: Ce design moderne met en valeur votre expertise avec..."
                            value={customizations[`option${activeTab + 1}` as keyof typeof customizations].notes}
                            onChange={(e) => setCustomizations({
                              ...customizations,
                              [`option${activeTab + 1}`]: {
                                ...customizations[`option${activeTab + 1}` as keyof typeof customizations],
                                notes: e.target.value
                              }
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message personnalisé global */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <MessageSquare className="w-4 h-4" />
                    Message personnalisé au client
                  </h3>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Bonjour [Nom], Suite à notre échange et l'analyse de vos besoins..."
                    rows={6}
                    value={customizations.globalMessage}
                    onChange={(e) => setCustomizations({
                      ...customizations,
                      globalMessage: e.target.value
                    })}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Aperçu client
                  </button>
                  <button 
                    onClick={sendToClient}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!customizations.globalMessage}
                  >
                    <Send className="w-4 h-4" />
                    Envoyer au client
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow h-full flex items-center justify-center p-8">
            <div className="text-center text-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Sélectionnez une proposition pour commencer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
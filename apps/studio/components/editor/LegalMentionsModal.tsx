'use client';

import { useState, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { LegalMentionsGenerator, type LegalMentionsData } from '@/lib/services/legal-mentions-generator';
import { XMarkIcon, DocumentTextIcon, ShieldCheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface LegalMentionsModalProps {
  onClose: () => void;
}

export function LegalMentionsModal({ onClose }: LegalMentionsModalProps) {
  const { businessInfo, addBlock, pages, setCurrentPageId } = useEditorStore();
  
  const [formData, setFormData] = useState<LegalMentionsData>({
    companyName: businessInfo?.companyName || '',
    legalForm: '',
    capital: '',
    siret: '',
    rcs: '',
    vatNumber: '',
    address: businessInfo?.address || '',
    postalCode: businessInfo?.postalCode || '',
    city: businessInfo?.city || '',
    country: 'France',
    phone: businessInfo?.phone || '',
    email: businessInfo?.email || '',
    publisherName: '',
    publisherTitle: 'Gérant',
    hostingProvider: 'Netlify, Inc.',
    hostingAddress: '2325 3rd Street, Suite 296, San Francisco, California 94107, United States',
    hostingPhone: '',
    includeCookiePolicy: true,
    includePrivacyPolicy: true,
    includeTermsOfService: false
  });
  
  const [preview, setPreview] = useState('');
  const [activeTab, setActiveTab] = useState<'mentions' | 'privacy' | 'terms'>('mentions');
  
  useEffect(() => {
    updatePreview();
  }, [formData, activeTab]);
  
  const updatePreview = () => {
    let content = '';
    switch (activeTab) {
      case 'mentions':
        content = LegalMentionsGenerator.generate(formData);
        break;
      case 'privacy':
        content = LegalMentionsGenerator.generatePrivacyPolicy(formData);
        break;
      case 'terms':
        content = LegalMentionsGenerator.generateTermsOfService(formData);
        break;
    }
    setPreview(content);
  };
  
  const handleInputChange = (field: keyof LegalMentionsData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const createLegalPage = () => {
    // Chercher ou créer la page mentions légales
    let legalPage = pages.find(p => p.slug === '/legal' || p.slug === '/mentions-legales');
    
    if (!legalPage) {
      // Créer la page si elle n'existe pas
      const { addPage } = useEditorStore.getState();
      legalPage = {
        id: crypto.randomUUID(),
        name: 'Mentions Légales',
        slug: '/mentions-legales',
        blocks: [],
        meta: {
          title: 'Mentions Légales - ' + formData.companyName,
          description: 'Mentions légales et politique de confidentialité de ' + formData.companyName
        }
      };
      addPage(legalPage);
    }
    
    // Basculer vers cette page
    setCurrentPageId(legalPage.id);
    
    // Ajouter le contenu
    const contentBlock = {
      id: crypto.randomUUID(),
      type: 'content-section',
      props: {
        content: preview,
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        paddingTop: 'lg',
        paddingBottom: 'lg'
      },
      children: []
    };
    
    // Vider la page et ajouter le nouveau contenu
    const { clearPageBlocks } = useEditorStore.getState();
    clearPageBlocks(legalPage.id);
    addBlock(contentBlock);
    
    onClose();
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(preview);
    alert('Contenu copié dans le presse-papiers !');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-4 bg-white rounded-lg shadow-2xl flex flex-col max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Générateur de Mentions Légales RGPD</h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('mentions')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'mentions'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Mentions Légales
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'privacy'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Politique de Confidentialité
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'terms'
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            CGU
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Form */}
          <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Informations de l'entreprise</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forme juridique
                  </label>
                  <select
                    value={formData.legalForm}
                    onChange={(e) => handleInputChange('legalForm', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                    <option value="EURL">EURL</option>
                    <option value="SARL">SARL</option>
                    <option value="SAS">SAS</option>
                    <option value="SASU">SASU</option>
                    <option value="SA">SA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capital social
                  </label>
                  <input
                    type="text"
                    value={formData.capital}
                    onChange={(e) => handleInputChange('capital', e.target.value)}
                    placeholder="ex: 10 000 €"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIRET
                  </label>
                  <input
                    type="text"
                    value={formData.siret}
                    onChange={(e) => handleInputChange('siret', e.target.value)}
                    placeholder="123 456 789 00012"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RCS
                  </label>
                  <input
                    type="text"
                    value={formData.rcs}
                    onChange={(e) => handleInputChange('rcs', e.target.value)}
                    placeholder="ex: Paris B 123 456 789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  N° TVA Intracommunautaire
                </label>
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                  placeholder="FR 12 345678901"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <hr className="my-6" />
              
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Coordonnées</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <hr className="my-6" />
              
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Responsable de publication</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du responsable *
                  </label>
                  <input
                    type="text"
                    value={formData.publisherName}
                    onChange={(e) => handleInputChange('publisherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fonction
                  </label>
                  <input
                    type="text"
                    value={formData.publisherTitle}
                    onChange={(e) => handleInputChange('publisherTitle', e.target.value)}
                    placeholder="ex: Gérant, Directeur"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <hr className="my-6" />
              
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Options</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includeCookiePolicy}
                    onChange={(e) => handleInputChange('includeCookiePolicy', e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Inclure la politique des cookies
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includePrivacyPolicy}
                    onChange={(e) => handleInputChange('includePrivacyPolicy', e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Inclure la politique de confidentialité
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Généré conformément au RGPD et à la législation française
          </p>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
            >
              <ClipboardDocumentIcon className="w-4 h-4" />
              <span>Copier</span>
            </button>
            
            <button
              onClick={createLegalPage}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 flex items-center space-x-2"
            >
              <DocumentTextIcon className="w-4 h-4" />
              <span>Créer la page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
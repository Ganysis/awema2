'use client';

import { useEditorStore } from '@/lib/store/editor-store';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface TemplateLibraryProps {
  searchQuery: string;
}

const templates = [
  {
    id: 'landing-electricien',
    name: 'Landing Électricien',
    description: 'Page optimisée pour électriciens avec urgences',
    preview: '/templates/electricien.jpg',
    blocks: [
      {
        id: crypto.randomUUID(),
        type: 'hero-split-screen',
        props: {
          title: 'Électricien Professionnel',
          subtitle: 'Intervention rapide 24/7 - Devis gratuit',
          ctaText: 'Appeler Maintenant',
          ctaLink: 'tel:0123456789',
          secondaryCtaText: 'Devis Gratuit',
          secondaryCtaLink: '#contact',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
          imageAlt: 'Électricien professionnel'
        },
        children: []
      },
      {
        id: crypto.randomUUID(),
        type: 'services-grid-cards',
        props: {
          title: 'Nos Services',
          subtitle: 'Des solutions adaptées à tous vos besoins',
          services: [
            {
              icon: 'bolt',
              title: 'Dépannage Urgent',
              description: 'Intervention rapide 24h/24 et 7j/7',
              link: '#'
            },
            {
              icon: 'lightbulb',
              title: 'Installation Électrique',
              description: 'Installation complète aux normes',
              link: '#'
            },
            {
              icon: 'shield',
              title: 'Mise aux Normes',
              description: 'Sécurité et conformité garanties',
              link: '#'
            },
            {
              icon: 'tools',
              title: 'Rénovation',
              description: 'Modernisation de votre installation',
              link: '#'
            }
          ]
        },
        children: []
      },
      {
        id: crypto.randomUUID(),
        type: 'testimonials-carousel',
        props: {
          title: 'Avis Clients',
          testimonials: [
            {
              name: 'Marie Dupont',
              role: 'Particulier',
              content: 'Intervention rapide et efficace. Très professionnel!',
              rating: 5
            },
            {
              name: 'Jean Martin',
              role: 'Entreprise',
              content: 'Excellent travail, je recommande vivement.',
              rating: 5
            }
          ]
        },
        children: []
      },
      {
        id: crypto.randomUUID(),
        type: 'contact-form-map',
        props: {
          title: 'Contactez-nous',
          subtitle: 'Devis gratuit sous 24h',
          showMap: true,
          destinationEmail: 'contact@electricien.fr',
          formFields: [
            { name: 'name', label: 'Votre Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
            { name: 'service', label: 'Service', type: 'select', options: ['Dépannage', 'Installation', 'Mise aux normes', 'Autre'], required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ],
          contactInfo: {
            phone: '01 23 45 67 89',
            email: 'contact@electricien.fr',
            address: '123 rue de la République, 75001 Paris',
            hours: 'Urgences 24/7 - Bureau: Lun-Ven 8h-18h'
          },
          mapCoordinates: {
            lat: 48.8566,
            lng: 2.3522
          }
        },
        children: []
      }
    ]
  },
  {
    id: 'landing-plombier',
    name: 'Landing Plombier',
    description: 'Page pour plombiers avec services et tarifs',
    preview: '/templates/plombier.jpg',
    blocks: [
      {
        id: crypto.randomUUID(),
        type: 'hero-centered',
        props: {
          title: 'Plombier Certifié',
          subtitle: 'Dépannage et installation - Devis gratuit',
          ctaText: 'Urgence: 01 23 45 67 89',
          ctaLink: 'tel:0123456789',
          image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
          imageAlt: 'Plombier professionnel'
        },
        children: []
      },
      {
        id: crypto.randomUUID(),
        type: 'features-icon-grid',
        props: {
          title: 'Pourquoi Nous Choisir',
          features: [
            {
              icon: 'clock',
              title: 'Disponible 24/7',
              description: 'Interventions d\'urgence jour et nuit'
            },
            {
              icon: 'shield',
              title: 'Garantie 10 ans',
              description: 'Tous nos travaux sont garantis'
            },
            {
              icon: 'star',
              title: '20 ans d\'expérience',
              description: 'Expertise reconnue dans le domaine'
            },
            {
              icon: 'check',
              title: 'Devis Gratuit',
              description: 'Sans engagement sous 24h'
            }
          ]
        },
        children: []
      }
    ]
  }
];

export function TemplateLibrary({ searchQuery }: TemplateLibraryProps) {
  const { addBlock } = useEditorStore();
  
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const applyTemplate = (template: typeof templates[0]) => {
    // Add all blocks from the template
    template.blocks.forEach(block => {
      addBlock(block);
    });
  };

  return (
    <div className="p-4">
      <div className="grid gap-4">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="aspect-video bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <DocumentTextIcon className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {template.blocks.length} blocks
                </span>
                <button 
                  onClick={() => applyTemplate(template)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No templates found</p>
        </div>
      )}
    </div>
  );
}
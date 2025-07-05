'use client';

import { BlockProp, EditorControl, PropType } from '@awema/shared';
import { CollectionEditor } from './CollectionEditor';
import { ImagePickerWithDetails } from './ImagePickerWithDetails';

interface PropertyControlsProps {
  props: BlockProp[];
  values: Record<string, any>;
  onChange: (propName: string, value: any) => void;
  projectId?: string;
}

export function PropertyControls({ props, values, onChange, projectId }: PropertyControlsProps) {
  // Fonction pour détecter si un champ est une image
  const isImageField = (prop: BlockProp): boolean => {
    // Si c'est explicitement un IMAGE_PICKER
    if (prop.editorConfig?.control === EditorControl.IMAGE_PICKER) return true;
    
    // Détecter par le nom de la propriété
    const imageKeywords = ['image', 'photo', 'logo', 'icon', 'avatar', 'banner', 'cover', 'thumbnail', 'img'];
    const propNameLower = prop.name.toLowerCase();
    
    return imageKeywords.some(keyword => propNameLower.includes(keyword));
  };
  
  // Filter props based on conditions (for content-ultra-modern contentType)
  const filteredProps = props.filter(prop => {
    // Check if prop has a condition
    if (prop.editorConfig?.condition) {
      const condition = prop.editorConfig.condition;
      const dependencyValue = values[condition.prop];
      
      // Check if the condition is met
      if (condition.value !== undefined) {
        return dependencyValue === condition.value;
      }
      if (condition.values !== undefined) {
        return condition.values.includes(dependencyValue);
      }
    }
    return true;
  });
  
  // Group props by their group
  const groupedProps = filteredProps.reduce((acc, prop) => {
    const group = prop.editorConfig?.group || 'General';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(prop);
    return acc;
  }, {} as Record<string, BlockProp[]>);

  // Sort props within each group by order
  Object.keys(groupedProps).forEach(group => {
    groupedProps[group].sort((a, b) => 
      (a.editorConfig?.order || 999) - (b.editorConfig?.order || 999)
    );
  });

  const renderControl = (prop: BlockProp) => {
    const value = values[prop.name] ?? prop.defaultValue;
    const config = prop.editorConfig;

    // Handle object types
    if (prop.type === PropType.OBJECT) {
      // Handle specific object types
      if (prop.name === 'quote') {
        // Quote object for content ultra-modern
        const quoteValue = value || {};
        return (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Citation</label>
              <textarea
                value={quoteValue.text || ''}
                onChange={(e) => onChange(prop.name, { ...quoteValue, text: e.target.value })}
                className="property-input"
                placeholder="La qualité n'est jamais un accident..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Auteur</label>
              <input
                type="text"
                value={quoteValue.author || ''}
                onChange={(e) => onChange(prop.name, { ...quoteValue, author: e.target.value })}
                className="property-input"
                placeholder="John Ruskin"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Rôle/Titre (optionnel)</label>
              <input
                type="text"
                value={quoteValue.role || ''}
                onChange={(e) => onChange(prop.name, { ...quoteValue, role: e.target.value })}
                className="property-input"
                placeholder="Écrivain et critique d'art"
              />
            </div>
          </div>
        );
      } else if (prop.name === 'comparison') {
        // Comparison object for content ultra-modern
        const comparisonValue = value || {};
        return (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Titre Avant</label>
                <input
                  type="text"
                  value={comparisonValue.beforeTitle || ''}
                  onChange={(e) => onChange(prop.name, { ...comparisonValue, beforeTitle: e.target.value })}
                  className="property-input"
                  placeholder="Avant"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Titre Après</label>
                <input
                  type="text"
                  value={comparisonValue.afterTitle || ''}
                  onChange={(e) => onChange(prop.name, { ...comparisonValue, afterTitle: e.target.value })}
                  className="property-input"
                  placeholder="Après"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Image Avant</label>
                <ImagePickerWithDetails
                  value={comparisonValue.beforeImage || ''}
                  onChange={(val) => onChange(prop.name, { ...comparisonValue, beforeImage: val })}
                  projectId={projectId}
                  showAlt={false}
                  showTitle={false}
                  placeholder="Image avant"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Image Après</label>
                <ImagePickerWithDetails
                  value={comparisonValue.afterImage || ''}
                  onChange={(val) => onChange(prop.name, { ...comparisonValue, afterImage: val })}
                  projectId={projectId}
                  showAlt={false}
                  showTitle={false}
                  placeholder="Image après"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Points Avant (1 par ligne)</label>
                <textarea
                  value={(comparisonValue.beforePoints || []).join('\n')}
                  onChange={(e) => onChange(prop.name, { ...comparisonValue, beforePoints: e.target.value.split('\n').filter(p => p.trim()) })}
                  className="property-input"
                  placeholder="Ancien système\nPerformance limitée\nCoûts élevés"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Points Après (1 par ligne)</label>
                <textarea
                  value={(comparisonValue.afterPoints || []).join('\n')}
                  onChange={(e) => onChange(prop.name, { ...comparisonValue, afterPoints: e.target.value.split('\n').filter(p => p.trim()) })}
                  className="property-input"
                  placeholder="Solution moderne\nPerformance optimale\nÉconomies garanties"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      } else if (prop.name === 'primaryButton' || prop.name === 'secondaryButton') {
        // Button object
        const buttonValue = value || {};
        return (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Texte du bouton</label>
              <input
                type="text"
                value={buttonValue.text || ''}
                onChange={(e) => onChange(prop.name, { ...buttonValue, text: e.target.value })}
                className="property-input"
                placeholder="En savoir plus"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Lien</label>
              <input
                type="text"
                value={buttonValue.link || ''}
                onChange={(e) => onChange(prop.name, { ...buttonValue, link: e.target.value })}
                className="property-input"
                placeholder="/about"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Icône (optionnel)</label>
              <select
                value={buttonValue.icon || ''}
                onChange={(e) => onChange(prop.name, { ...buttonValue, icon: e.target.value })}
                className="property-input"
              >
                <option value="">Aucune</option>
                <option value="arrow-right">→ Flèche droite</option>
                <option value="external-link">↗ Lien externe</option>
                <option value="phone">📞 Téléphone</option>
                <option value="download">⬇ Télécharger</option>
                <option value="check">✓ Check</option>
              </select>
            </div>
          </div>
        );
      } else if (prop.name === 'contactInfo') {
        const contactInfo = value || {};
        return (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={contactInfo.phone || ''}
                onChange={(e) => onChange(prop.name, { ...contactInfo, phone: e.target.value })}
                className="property-input"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={contactInfo.email || ''}
                onChange={(e) => onChange(prop.name, { ...contactInfo, email: e.target.value })}
                className="property-input"
                placeholder="info@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={contactInfo.address || ''}
                onChange={(e) => onChange(prop.name, { ...contactInfo, address: e.target.value })}
                className="property-input"
                placeholder="123 Main St, City, State"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Business Hours</label>
              <input
                type="text"
                value={contactInfo.hours || ''}
                onChange={(e) => onChange(prop.name, { ...contactInfo, hours: e.target.value })}
                className="property-input"
                placeholder="Mon-Fri: 8AM-6PM"
              />
            </div>
          </div>
        );
      } else if (prop.name === 'mapCoordinates') {
        const coords = value || { lat: 48.8566, lng: 2.3522 };
        return (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Latitude</label>
              <input
                type="number"
                value={coords.lat || ''}
                onChange={(e) => onChange(prop.name, { ...coords, lat: parseFloat(e.target.value) || 0 })}
                className="property-input"
                step="0.0001"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Longitude</label>
              <input
                type="number"
                value={coords.lng || ''}
                onChange={(e) => onChange(prop.name, { ...coords, lng: parseFloat(e.target.value) || 0 })}
                className="property-input"
                step="0.0001"
              />
            </div>
            <div className="text-xs text-gray-500">
              <a 
                href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        );
      }
    }

    // Handle array types with CollectionEditor
    if (prop.type === PropType.ARRAY) {
      // Define schema based on the prop name
      let itemSchema: any = {};
      let itemLabel: ((item: any, index: number) => string) | undefined;
      
      if (prop.name === 'services') {
        // Check if this is for services-list-detailed which has different schema
        const hasPrice = values.services?.[0]?.hasOwnProperty('price');
        if (hasPrice) {
          // Detailed service schema
          itemSchema = {
            title: { type: 'text', label: 'Service Title', defaultValue: 'New Service' },
            description: { type: 'textarea', label: 'Description', defaultValue: 'Service description' },
            image: { type: 'image', label: 'Service Image', defaultValue: '/placeholder.jpg' },
            imageAlt: { type: 'text', label: 'Image Alt Text', defaultValue: 'Service image' },
            price: { type: 'text', label: 'Price', defaultValue: 'From $99' },
            pricePrefix: { type: 'text', label: 'Price Prefix', defaultValue: 'From' },
            features: { type: 'textarea', label: 'Features (one per line)', defaultValue: 'Feature 1\nFeature 2\nFeature 3' },
            link: { type: 'url', label: 'CTA Link', defaultValue: '#' }
          };
        } else {
          // Simple service schema
          itemSchema = {
            icon: { type: 'icon', label: 'Icon' },
            title: { type: 'text', label: 'Service Title', defaultValue: 'New Service' },
            description: { type: 'textarea', label: 'Description', defaultValue: 'Service description' },
            link: { type: 'url', label: 'Link (optional)', defaultValue: '#' }
          };
        }
        itemLabel = (item: any, index: number) => item.title || `Service ${index + 1}`;
      } else if (prop.name === 'testimonials') {
        itemSchema = {
          name: { type: 'text', label: 'Customer Name', defaultValue: 'John Doe' },
          role: { type: 'text', label: 'Role/Company', defaultValue: 'CEO' },
          content: { type: 'textarea', label: 'Testimonial', defaultValue: 'Great service!' },
          rating: { type: 'number', label: 'Rating (1-5)', defaultValue: 5 },
          image: { type: 'image', label: 'Avatar (optional)' },
          date: { type: 'text', label: 'Date', defaultValue: new Date().toISOString().split('T')[0] },
          service: { type: 'text', label: 'Service/Catégorie', defaultValue: 'general' },
          verified: { type: 'checkbox', label: 'Avis vérifié', defaultValue: true },
          videoUrl: { type: 'url', label: 'URL Vidéo (YouTube)', defaultValue: '' },
          videoThumbnail: { type: 'image', label: 'Thumbnail Vidéo', defaultValue: '' },
          highlight: { type: 'checkbox', label: 'Mettre en avant', defaultValue: false }
        };
        itemLabel = (item: any, index: number) => item.name || `Testimonial ${index + 1}`;
      } else if (prop.name === 'reviews') {
        // Reviews Ultra-Modern schema
        itemSchema = {
          author: { type: 'text', label: 'Nom du client', defaultValue: 'Jean Dupont' },
          rating: { 
            type: 'select', 
            label: 'Note', 
            defaultValue: '5',
            options: [
              { value: '5', label: '⭐⭐⭐⭐⭐ 5 étoiles' },
              { value: '4', label: '⭐⭐⭐⭐ 4 étoiles' },
              { value: '3', label: '⭐⭐⭐ 3 étoiles' },
              { value: '2', label: '⭐⭐ 2 étoiles' },
              { value: '1', label: '⭐ 1 étoile' }
            ]
          },
          date: { type: 'date', label: 'Date de l\'avis', defaultValue: new Date().toISOString().split('T')[0] },
          content: { type: 'textarea', label: 'Contenu de l\'avis', defaultValue: 'Excellent service ! Je recommande vivement.' },
          avatar: { type: 'image', label: 'Photo du client (optionnel)', defaultValue: '' },
          images: { 
            type: 'textarea', 
            label: 'Photos du travail (URLs, une par ligne)', 
            defaultValue: '',
            placeholder: '/photo1.jpg\n/photo2.jpg'
          },
          service: { 
            type: 'select', 
            label: 'Service', 
            defaultValue: 'Général',
            options: [
              { value: 'Général', label: 'Service général' },
              { value: 'Plomberie', label: 'Plomberie' },
              { value: 'Électricité', label: 'Électricité' },
              { value: 'Chauffage', label: 'Chauffage' },
              { value: 'Climatisation', label: 'Climatisation' },
              { value: 'Rénovation', label: 'Rénovation' },
              { value: 'Peinture', label: 'Peinture' },
              { value: 'Maçonnerie', label: 'Maçonnerie' }
            ]
          },
          verified: { type: 'checkbox', label: 'Avis vérifié', defaultValue: true },
          helpful: { type: 'number', label: 'Nombre de votes utiles', defaultValue: 0 },
          source: { 
            type: 'select', 
            label: 'Source', 
            defaultValue: 'site',
            options: [
              { value: 'site', label: '🌐 Site web' },
              { value: 'google', label: '🔷 Google Reviews' },
              { value: 'facebook', label: '📘 Facebook' }
            ]
          }
        };
        itemLabel = (item: any, index: number) => item.author || `Avis ${index + 1}`;
      } else if (prop.name === 'images') {
        // Check if this is for gallery-ultra-modern which has more fields
        const hasCategory = values.images?.[0]?.hasOwnProperty('category');
        if (hasCategory) {
          // Gallery Ultra-Modern schema
          itemSchema = {
            url: { type: 'image', label: 'Image URL', defaultValue: '/placeholder.jpg' },
            thumbnail: { type: 'image', label: 'Miniature (optionnel)', defaultValue: '' },
            title: { type: 'text', label: 'Titre', defaultValue: 'Image' },
            category: { 
              type: 'text', 
              label: 'Catégorie (doit correspondre à un ID de filtre)', 
              defaultValue: '', 
              placeholder: 'Ex: interior, exterior',
              helpText: 'Laissez vide pour "Toutes" uniquement'
            },
            description: { type: 'textarea', label: 'Description', defaultValue: '' },
            tags: { type: 'textarea', label: 'Tags (un par ligne)', defaultValue: '' },
            is360: { type: 'checkbox', label: 'Image 360°', defaultValue: false },
            videoUrl: { type: 'url', label: 'URL Vidéo (YouTube/Vimeo)', defaultValue: '' },
            width: { type: 'number', label: 'Largeur', defaultValue: 800 },
            height: { type: 'number', label: 'Hauteur', defaultValue: 600 }
          };
        } else {
          // Simple image schema
          itemSchema = {
            url: { type: 'image', label: 'Image URL', defaultValue: '/placeholder.jpg' },
            alt: { type: 'text', label: 'Alt Text (SEO)', defaultValue: 'Image' },
            title: { type: 'text', label: 'Title (optionnel)', defaultValue: '' }
          };
        }
        itemLabel = (item: any, index: number) => item.title || item.alt || `Image ${index + 1}`;
      } else if (prop.name === 'features') {
        itemSchema = {
          icon: { type: 'icon', label: 'Icon' },
          title: { type: 'text', label: 'Feature Title', defaultValue: 'Feature' },
          description: { type: 'textarea', label: 'Description', defaultValue: 'Feature description' },
          image: { type: 'image', label: 'Image (optionnel)', defaultValue: '' },
          imageAlt: { type: 'text', label: 'Texte alternatif image', defaultValue: '' },
          link: { type: 'url', label: 'Link (optionnel)', defaultValue: '' },
          category: { type: 'text', label: 'Catégorie', defaultValue: 'general' },
          highlight: { type: 'checkbox', label: 'Mettre en avant', defaultValue: false }
        };
        itemLabel = (item: any, index: number) => item.title || `Feature ${index + 1}`;
      } else if (prop.name === 'fields') {
        // Form fields for contact forms
        itemSchema = {
          label: { type: 'text', label: 'Titre du champ', defaultValue: 'Nouveau champ' },
          type: { 
            type: 'select', 
            label: 'Type de champ', 
            defaultValue: 'text',
            options: [
              { value: 'text', label: 'Texte simple' },
              { value: 'email', label: 'Adresse email' },
              { value: 'tel', label: 'Numéro de téléphone' },
              { value: 'number', label: 'Nombre' },
              { value: 'textarea', label: 'Message (zone de texte)' },
              { value: 'date', label: 'Date' }
            ]
          },
          required: { type: 'checkbox', label: 'Champ obligatoire', defaultValue: false },
          placeholder: { type: 'text', label: 'Texte d\'aide', defaultValue: '' },
          icon: {
            type: 'select',
            label: 'Icône',
            defaultValue: 'user',
            options: [
              { value: 'user', label: 'Personne' },
              { value: 'mail', label: 'Email' },
              { value: 'phone', label: 'Téléphone' },
              { value: 'message-circle', label: 'Message' },
              { value: 'edit', label: 'Édition' },
              { value: 'calendar', label: 'Calendrier' },
              { value: 'map-pin', label: 'Localisation' },
              { value: 'briefcase', label: 'Entreprise' },
              { value: 'home', label: 'Domicile' }
            ]
          }
        };
        itemLabel = (item: any, index: number) => item.label || `Champ ${index + 1}`;
      } else if (prop.name === 'timeline') {
        // Timeline items for content ultra-modern
        itemSchema = {
          year: { type: 'text', label: 'Année', defaultValue: '2024' },
          title: { type: 'text', label: 'Titre', defaultValue: 'Événement' },
          description: { type: 'textarea', label: 'Description', defaultValue: 'Description de l\'événement' }
        };
        itemLabel = (item: any, index: number) => item.year + ' - ' + item.title || `Événement ${index + 1}`;
      } else if (prop.name === 'accordion') {
        // Accordion items for content ultra-modern
        itemSchema = {
          question: { type: 'text', label: 'Question', defaultValue: 'Question ?' },
          answer: { type: 'textarea', label: 'Réponse', defaultValue: 'Votre réponse ici...' }
        };
        itemLabel = (item: any, index: number) => item.question || `Question ${index + 1}`;
      } else if (prop.name === 'tabs') {
        // Tabs for content ultra-modern
        itemSchema = {
          title: { type: 'text', label: 'Titre de l\'onglet', defaultValue: 'Onglet' },
          content: { type: 'textarea', label: 'Contenu', defaultValue: 'Contenu de l\'onglet' },
          icon: { 
            type: 'select', 
            label: 'Icône (optionnel)',
            defaultValue: '',
            options: [
              { value: '', label: 'Aucune' },
              { value: 'target', label: 'Cible' },
              { value: 'eye', label: 'Œil' },
              { value: 'heart', label: 'Cœur' },
              { value: 'star', label: 'Étoile' },
              { value: 'check', label: 'Check' },
              { value: 'shield', label: 'Bouclier' }
            ]
          }
        };
        itemLabel = (item: any, index: number) => item.title || `Onglet ${index + 1}`;
      } else if (prop.name === 'stats') {
        // Stats for content ultra-modern
        itemSchema = {
          value: { type: 'text', label: 'Valeur', defaultValue: '100' },
          label: { type: 'text', label: 'Label', defaultValue: 'Statistique' },
          prefix: { type: 'text', label: 'Préfixe (optionnel)', defaultValue: '' },
          suffix: { type: 'text', label: 'Suffixe (optionnel)', defaultValue: '' }
        };
        itemLabel = (item: any, index: number) => item.value + ' ' + item.label || `Stat ${index + 1}`;
      } else if (prop.name === 'categories') {
        // Gallery categories schema
        itemSchema = {
          id: { 
            type: 'text', 
            label: 'ID (doit correspondre aux catégories des images)', 
            defaultValue: 'category-id',
            placeholder: 'Ex: interior, exterior',
            helpText: 'Utilisez "all" pour afficher toutes les images'
          },
          label: { type: 'text', label: 'Label affiché', defaultValue: 'Catégorie' },
          icon: { 
            type: 'select', 
            label: 'Icône (optionnel)', 
            defaultValue: '',
            options: [
              { value: '', label: 'Aucune' },
              { value: 'grid', label: 'Grille' },
              { value: 'home', label: 'Maison' },
              { value: 'trees', label: 'Arbres' },
              { value: 'hammer', label: 'Marteau' },
              { value: 'building', label: 'Bâtiment' },
              { value: 'camera', label: 'Appareil photo' },
              { value: 'star', label: 'Étoile' },
              { value: 'heart', label: 'Cœur' }
            ]
          }
        };
        itemLabel = (item: any, index: number) => item.label || `Catégorie ${index + 1}`;
      } else {
        // Generic array schema
        itemSchema = {
          value: { type: 'text', label: 'Value' }
        };
      }
      
      return (
        <CollectionEditor
          items={value || []}
          onChange={(items) => onChange(prop.name, items)}
          itemSchema={itemSchema}
          itemLabel={itemLabel}
          maxItems={prop.validation?.max || 10}
          projectId={projectId}
        />
      );
    }

    // Gérer les champs d'image automatiquement
    if (isImageField(prop)) {
      // Pour les propriétés de type STRING, on ne montre pas alt/title
      // Pour les propriétés de type OBJECT ou avec des configs spéciales, on les montre
      const isStringProp = prop.type === PropType.STRING;
      const showAlt = !isStringProp && (prop.name.toLowerCase().includes('alt') || 
                      (prop.editorConfig as any)?.showAlt !== false);
      const showTitle = !isStringProp && ((prop.editorConfig as any)?.showTitle === true);
      
      return (
        <ImagePickerWithDetails
          value={value}
          onChange={(val) => onChange(prop.name, val)}
          projectId={projectId}
          showAlt={showAlt}
          showTitle={showTitle}
          placeholder={config?.placeholder || 'Image URL'}
          required={prop.required}
        />
      );
    }

    switch (config?.control || EditorControl.TEXT) {
      case EditorControl.TEXT:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(prop.name, e.target.value)}
            placeholder={config?.placeholder}
            className="property-input"
            required={prop.required}
          />
        );

      case EditorControl.TEXTAREA:
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(prop.name, e.target.value)}
            placeholder={config?.placeholder}
            className="property-input"
            rows={3}
            required={prop.required}
          />
        );

      case EditorControl.NUMBER:
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(prop.name, parseFloat(e.target.value))}
            placeholder={config?.placeholder}
            className="property-input"
            required={prop.required}
            min={prop.validation?.min}
            max={prop.validation?.max}
          />
        );

      case EditorControl.TOGGLE:
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(prop.name, e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{prop.description}</span>
          </label>
        );

      case EditorControl.COLOR_PICKER:
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(prop.name, e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(prop.name, e.target.value)}
              placeholder="#000000"
              className="property-input flex-1"
            />
          </div>
        );

      case EditorControl.SELECT:
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(prop.name, e.target.value)}
            className="property-input"
            required={prop.required}
          >
            {!prop.required && <option value="">Choose...</option>}
            {prop.validation?.options?.map(option => (
              <option key={option.value || option} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );

      case EditorControl.LINK_PICKER:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(prop.name, e.target.value)}
            placeholder={config?.placeholder || 'https://...'}
            className="property-input"
            required={prop.required}
          />
        );

      case EditorControl.IMAGE_PICKER:
        // Déjà géré par isImageField() au-dessus
        return null;

      case EditorControl.SLIDER:
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value || prop.validation?.min || 0}
              onChange={(e) => onChange(prop.name, parseFloat(e.target.value))}
              min={prop.validation?.min}
              max={prop.validation?.max}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{prop.validation?.min || 0}</span>
              <span className="font-medium text-gray-700">{value}</span>
              <span>{prop.validation?.max || 100}</span>
            </div>
          </div>
        );

      case EditorControl.RADIO:
        return (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {prop.validation?.options?.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(prop.name, option.value)}
                className={`
                  px-4 py-3 rounded-lg border-2 transition-all duration-200
                  flex items-center justify-center gap-2 text-sm font-medium
                  ${value === option.value 
                    ? 'border-primary-600 bg-primary-50 text-primary-700' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}
                `}
              >
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(prop.name, e.target.value)}
            placeholder={config?.placeholder}
            className="property-input"
            required={prop.required}
          />
        );
    }
  };

  return (
    <>
      <div className="space-y-6">
        {Object.entries(groupedProps).map(([group, props]) => (
          <div key={group}>
            <h4 className="text-sm font-medium text-gray-700 mb-3">{group}</h4>
            <div className="space-y-4">
              {props.map(prop => (
                <div key={prop.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {prop.description}
                    {prop.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderControl(prop)}
                  {prop.editorConfig?.helpText && (
                    <p className="mt-1 text-xs text-gray-500">
                      {prop.editorConfig.helpText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
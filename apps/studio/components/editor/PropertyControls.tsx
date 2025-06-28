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
  // Group props by their group
  const groupedProps = props.reduce((acc, prop) => {
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
      if (prop.name === 'contactInfo') {
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
          image: { type: 'image', label: 'Avatar (optional)' }
        };
        itemLabel = (item: any, index: number) => item.name || `Testimonial ${index + 1}`;
      } else if (prop.name === 'images') {
        itemSchema = {
          url: { type: 'image', label: 'Image URL', defaultValue: '/placeholder.jpg' },
          alt: { type: 'text', label: 'Alt Text (SEO)', defaultValue: 'Image' },
          title: { type: 'text', label: 'Title (optionnel)', defaultValue: '' }
        };
        itemLabel = (item: any, index: number) => item.alt || item.title || `Image ${index + 1}`;
      } else if (prop.name === 'features') {
        itemSchema = {
          icon: { type: 'icon', label: 'Icon' },
          title: { type: 'text', label: 'Feature Title', defaultValue: 'Feature' },
          description: { type: 'textarea', label: 'Description', defaultValue: 'Feature description' }
        };
        itemLabel = (item: any, index: number) => item.title || `Feature ${index + 1}`;
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
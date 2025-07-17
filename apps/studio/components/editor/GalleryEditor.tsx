'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImagePickerWithDetails } from './ImagePickerWithDetails';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  alt: string;
  category?: string;
  description?: string;
  tags?: string[];
}

interface GalleryEditorProps {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  projectId?: string;
  categories?: { value: string; label: string }[];
  maxImages?: number;
}

// Composant pour une image individuelle avec drag & drop
function SortableImage({ 
  image, 
  index, 
  onUpdate, 
  onRemove, 
  projectId,
  categories 
}: { 
  image: GalleryImage; 
  index: number; 
  onUpdate: (index: number, image: GalleryImage) => void;
  onRemove: (index: number) => void;
  projectId?: string;
  categories?: { value: string; label: string }[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`gallery-editor-item bg-white border rounded-lg p-4 ${isDragging ? 'shadow-2xl' : 'shadow-sm'}`}
    >
      {/* Poignée de drag */}
      <div className="flex items-start gap-3 mb-3">
        <div
          {...attributes}
          {...listeners}
          className="drag-handle cursor-move p-2 hover:bg-gray-100 rounded transition-colors"
          title="Glisser pour réorganiser"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4C7 4.55228 6.55228 5 6 5C5.44772 5 5 4.55228 5 4C5 3.44772 5.44772 3 6 3C6.55228 3 7 3.44772 7 4Z" fill="currentColor"/>
            <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="currentColor"/>
            <path d="M6 17C6.55228 17 7 16.5523 7 16C7 15.4477 6.55228 15 6 15C5.44772 15 5 15.4477 5 16C5 16.5523 5.44772 17 6 17Z" fill="currentColor"/>
            <path d="M15 4C15 4.55228 14.5523 5 14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3C14.5523 3 15 3.44772 15 4Z" fill="currentColor"/>
            <path d="M14 11C14.5523 11 15 10.5523 15 10C15 9.44772 14.5523 9 14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11Z" fill="currentColor"/>
            <path d="M15 16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16C13 15.4477 13.4477 15 14 15C14.5523 15 15 15.4477 15 16Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Aperçu de l'image */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {image.src && (
              <img 
                src={image.src} 
                alt={image.alt || 'Image de galerie'} 
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Image {index + 1}</h4>
              {image.title && <p className="text-sm text-gray-500">{image.title}</p>}
            </div>
            
            {/* Bouton supprimer */}
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Supprimer cette image"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Champs d'édition */}
          <div className="space-y-3">
            {/* Sélecteur d'image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de l'image *
              </label>
              <ImagePickerWithDetails
                value={image.src}
                onChange={(src) => onUpdate(index, { ...image, src })}
                projectId={projectId}
                showAlt={false}
                showTitle={false}
                placeholder="Sélectionner une image"
                required
              />
            </div>

            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre (tooltip)
              </label>
              <input
                type="text"
                value={image.title}
                onChange={(e) => onUpdate(index, { ...image, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ex: Vue panoramique du chantier"
              />
            </div>

            {/* Alt text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texte alternatif (SEO) *
              </label>
              <input
                type="text"
                value={image.alt}
                onChange={(e) => onUpdate(index, { ...image, alt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Description pour l'accessibilité et le SEO"
                required
              />
            </div>

            {/* Catégorie */}
            {categories && categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={image.category || ''}
                  onChange={(e) => onUpdate(index, { ...image, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Aucune catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Description (optionnelle) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optionnelle)
              </label>
              <textarea
                value={image.description || ''}
                onChange={(e) => onUpdate(index, { ...image, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Description détaillée de l'image"
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GalleryEditor({ 
  images = [], 
  onChange, 
  projectId,
  categories,
  maxImages = 20 
}: GalleryEditorProps) {
  const [localImages, setLocalImages] = useState<GalleryImage[]>(images);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sync avec les props
  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  // Ajouter une nouvelle image
  const addImage = () => {
    if (localImages.length >= maxImages) {
      alert(`Vous ne pouvez pas ajouter plus de ${maxImages} images.`);
      return;
    }

    const newImage: GalleryImage = {
      id: `image-${Date.now()}`,
      src: '',
      title: '',
      alt: '',
      category: '',
      description: ''
    };

    const newImages = [...localImages, newImage];
    setLocalImages(newImages);
    onChange(newImages);
  };

  // Mettre à jour une image
  const updateImage = (index: number, updatedImage: GalleryImage) => {
    const newImages = [...localImages];
    newImages[index] = updatedImage;
    setLocalImages(newImages);
    onChange(newImages);
  };

  // Supprimer une image
  const removeImage = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
    onChange(newImages);
  };

  // Gérer le drag & drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = localImages.findIndex(img => img.id === active.id);
      const newIndex = localImages.findIndex(img => img.id === over.id);

      const newImages = arrayMove(localImages, oldIndex, newIndex);
      setLocalImages(newImages);
      onChange(newImages);
    }
  };

  return (
    <div className="gallery-editor">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Images de la galerie ({localImages.length}/{maxImages})
        </h3>
        <button
          onClick={addImage}
          disabled={localImages.length >= maxImages}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          + Ajouter une image
        </button>
      </div>

      {localImages.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            Aucune image dans la galerie
          </p>
          <button
            onClick={addImage}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Ajouter votre première image
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localImages.map(img => img.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {localImages.map((image, index) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  index={index}
                  onUpdate={updateImage}
                  onRemove={removeImage}
                  projectId={projectId}
                  categories={categories}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <style jsx>{`
        .gallery-editor-item {
          transition: all 0.2s ease;
        }
        
        .gallery-editor-item:hover {
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        
        .drag-handle {
          touch-action: none;
        }
      `}</style>
    </div>
  );
}
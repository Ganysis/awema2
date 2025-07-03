'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { ImagePickerWithDetails } from './ImagePickerWithDetails';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CollectionEditorProps {
  items: any[];
  onChange: (items: any[]) => void;
  itemSchema: {
    [key: string]: {
      type: string;
      label: string;
      defaultValue?: any;
      options?: { value: string; label: string }[];
    };
  };
  maxItems?: number;
  itemLabel?: (item: any, index: number) => string;
  projectId?: string;
}

interface SortableItemProps {
  id: string;
  item: any;
  index: number;
  itemSchema: CollectionEditorProps['itemSchema'];
  onUpdate: (key: string, value: any) => void;
  onRemove: () => void;
  itemLabel?: (item: any, index: number) => string;
  projectId?: string;
}

function SortableItem({ id, item, index, itemSchema, onUpdate, onRemove, itemLabel, projectId }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-1 mr-2"
          >
            <Bars3Icon className="w-5 h-5 text-gray-400" />
          </div>
          <h4 className="font-medium text-gray-900">
            {itemLabel ? itemLabel(item, index) : `Item ${index + 1}`}
          </h4>
        </div>
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <TrashIcon className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <div className="space-y-3">
        {Object.entries(itemSchema).map(([key, schema]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {schema.label}
            </label>
            {schema.type === 'text' && (
              <input
                type="text"
                value={item[key] || ''}
                onChange={(e) => onUpdate(key, e.target.value)}
                className="property-input"
              />
            )}
            {schema.type === 'textarea' && (
              <textarea
                value={
                  key === 'features' && Array.isArray(item[key])
                    ? item[key].join('\n')
                    : item[key] || ''
                }
                onChange={(e) => {
                  if (key === 'features') {
                    // Convert newline-separated text to array
                    const features = e.target.value.split('\n').filter(f => f.trim());
                    onUpdate(key, features);
                  } else {
                    onUpdate(key, e.target.value);
                  }
                }}
                className="property-input"
                rows={key === 'features' ? 3 : 2}
                placeholder={key === 'features' ? 'Enter one feature per line' : ''}
              />
            )}
            {schema.type === 'select' && (
              <select
                value={item[key] || ''}
                onChange={(e) => onUpdate(key, e.target.value)}
                className="property-input"
              >
                <option value="">Choose...</option>
                {schema.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {schema.type === 'icon' && (
              <select
                value={item[key] || ''}
                onChange={(e) => onUpdate(key, e.target.value)}
                className="property-input"
              >
                <option value="">Choose icon...</option>
                <optgroup label="Tools & Services">
                  <option value="wrench">🔧 Wrench</option>
                  <option value="tools">🛠️ Tools</option>
                  <option value="hammer">🔨 Hammer</option>
                  <option value="screwdriver">🪛 Screwdriver</option>
                  <option value="gear">⚙️ Gear</option>
                  <option value="bolt">⚡ Bolt</option>
                </optgroup>
                <optgroup label="Safety & Security">
                  <option value="shield">🛡️ Shield</option>
                  <option value="shield-check">✓ Shield Check</option>
                  <option value="lock">🔒 Lock</option>
                  <option value="key">🔑 Key</option>
                  <option value="alert">⚠️ Alert</option>
                </optgroup>
                <optgroup label="General">
                  <option value="lightbulb">💡 Lightbulb</option>
                  <option value="clock">🕐 Clock</option>
                  <option value="star">⭐ Star</option>
                  <option value="heart">❤️ Heart</option>
                  <option value="check">✅ Check</option>
                  <option value="fire">🔥 Fire</option>
                  <option value="home">🏠 Home</option>
                  <option value="phone">📞 Phone</option>
                  <option value="email">✉️ Email</option>
                  <option value="location">📍 Location</option>
                </optgroup>
              </select>
            )}
            {schema.type === 'image' && (
              <ImagePickerWithDetails
                value={item[key]}
                onChange={(val) => onUpdate(key, val)}
                projectId={projectId}
                showAlt={key === 'imageAlt' || schema.label?.toLowerCase().includes('alt')}
                showTitle={schema.label?.toLowerCase().includes('title')}
                placeholder={schema.label || "Image URL"}
              />
            )}
            {schema.type === 'url' && (
              <input
                type="text"
                value={item[key] || ''}
                onChange={(e) => onUpdate(key, e.target.value)}
                placeholder="https://..."
                className="property-input"
              />
            )}
            {schema.type === 'email' && (
              <input
                type="email"
                value={item[key] || ''}
                onChange={(e) => onUpdate(key, e.target.value)}
                placeholder="email@example.com"
                className="property-input"
              />
            )}
            {schema.type === 'number' && (
              <input
                type="number"
                value={item[key] || ''}
                onChange={(e) => onUpdate(key, parseFloat(e.target.value) || 0)}
                className="property-input"
              />
            )}
            {schema.type === 'checkbox' && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!item[key]}
                  onChange={(e) => onUpdate(key, e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600">
                  {typeof item[key] === 'boolean' ? (item[key] ? 'Oui' : 'Non') : 'Non'}
                </span>
              </label>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export function CollectionEditor({ 
  items = [], 
  onChange, 
  itemSchema, 
  maxItems = 10,
  itemLabel,
  projectId 
}: CollectionEditorProps) {
  const [localItems, setLocalItems] = useState(items.map((item, index) => ({
    ...item,
    id: item.id || `item-${index}`
  })));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localItems.findIndex(item => item.id === active.id);
      const newIndex = localItems.findIndex(item => item.id === over?.id);

      const newItems = arrayMove(localItems, oldIndex, newIndex);
      setLocalItems(newItems);
      onChange(newItems.map(({ id, ...rest }) => rest));
    }
  };

  const addItem = () => {
    const newItem: any = { id: `item-${Date.now()}` };
    
    // Set default values
    Object.entries(itemSchema).forEach(([key, schema]) => {
      newItem[key] = schema.defaultValue || '';
    });

    const newItems = [...localItems, newItem];
    setLocalItems(newItems);
    onChange(newItems.map(({ id, ...rest }) => rest));
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...localItems];
    newItems[index] = { ...newItems[index], [key]: value };
    setLocalItems(newItems);
    onChange(newItems.map(({ id, ...rest }) => rest));
  };

  const removeItem = (index: number) => {
    const newItems = localItems.filter((_, i) => i !== index);
    setLocalItems(newItems);
    onChange(newItems.map(({ id, ...rest }) => rest));
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localItems.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {localItems.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              index={index}
              itemSchema={itemSchema}
              itemLabel={itemLabel}
              onUpdate={(key: string, value: any) => updateItem(index, key, value)}
              onRemove={() => removeItem(index)}
              projectId={projectId}
            />
          ))}
        </SortableContext>
      </DndContext>

      {localItems.length < maxItems && (
        <button
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      )}
    </div>
  );
}
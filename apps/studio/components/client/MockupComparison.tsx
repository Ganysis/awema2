'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MockupPreview } from './MockupPreview';
import { DeviceSwitcher } from './DeviceSwitcher';
import { SelectionConfirmation } from './SelectionConfirmation';
import { DeviceType, MockupData, SelectionEvent } from '@/types/client-selection.types';

interface MockupComparisonProps {
  mockups: MockupData[];
  workflowId: string;
  onSelection: (mockup: MockupData) => Promise<void>;
  className?: string;
}

export const MockupComparison: React.FC<MockupComparisonProps> = ({
  mockups,
  workflowId,
  onSelection,
  className
}) => {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [selectedMockup, setSelectedMockup] = useState<MockupData | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewStartTime] = useState(Date.now());
  const [templateViewTimes, setTemplateViewTimes] = useState<Record<string, number>>({});
  const [currentlyViewing, setCurrentlyViewing] = useState<string | null>(null);

  // Tracking des événements
  const trackEvent = (event: Omit<SelectionEvent, 'timestamp'>) => {
    const fullEvent: SelectionEvent = {
      ...event,
      timestamp: new Date()
    };

    // Envoyer l'événement de tracking (en arrière-plan)
    fetch('/api/client/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullEvent)
    }).catch(console.error);
  };

  // Track page view au montage
  useEffect(() => {
    trackEvent({
      type: 'page_view',
      data: { workflowId, device: currentDevice }
    });
  }, [workflowId]);

  // Track changement de device
  useEffect(() => {
    trackEvent({
      type: 'device_change',
      data: { workflowId, device: currentDevice }
    });
  }, [currentDevice, workflowId]);

  // Track temps passé sur les mockups
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentlyViewing) {
        setTemplateViewTimes(prev => ({
          ...prev,
          [currentlyViewing]: (prev[currentlyViewing] || 0) + 5000
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentlyViewing]);

  const handleMockupSelect = (mockup: MockupData) => {
    setSelectedMockup(mockup);
    setIsConfirmationOpen(true);

    trackEvent({
      type: 'mockup_view',
      data: {
        workflowId,
        template: mockup.variant,
        device: currentDevice
      }
    });
  };

  const handleConfirmSelection = async () => {
    if (!selectedMockup) return;

    setIsLoading(true);
    try {
      await onSelection(selectedMockup);

      trackEvent({
        type: 'selection_made',
        data: {
          workflowId,
          template: selectedMockup.variant,
          device: currentDevice,
          duration: Date.now() - viewStartTime
        }
      });
    } catch (error) {
      console.error('Erreur lors de la sélection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockupInView = (mockupId: string) => {
    setCurrentlyViewing(mockupId);
  };

  const handleDeviceChange = (device: DeviceType) => {
    setCurrentDevice(device);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header avec device switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choisissez votre design préféré
          </h2>
          <p className="text-gray-600">
            Sélectionnez le template qui correspond le mieux à votre vision
          </p>
        </div>

        <DeviceSwitcher
          currentDevice={currentDevice}
          onDeviceChange={handleDeviceChange}
        />
      </div>

      {/* Mockups Grid */}
      <div className={cn(
        "grid gap-8 mb-8",
        mockups.length === 3
          ? "grid-cols-1 lg:grid-cols-3"
          : mockups.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1"
      )}>
        {mockups.map((mockup, index) => (
          <div key={mockup.id} className="group">
            {/* Mockup Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
              {/* Preview */}
              <div className="p-4">
                <MockupPreview
                  mockup={mockup}
                  device={currentDevice}
                  onLoad={() => handleMockupInView(mockup.id)}
                  className="mx-auto"
                />
              </div>

              {/* Info & Action */}
              <div className="p-6 pt-2">
                {/* Title & Category */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {mockup.name}
                  </h3>
                  <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {mockup.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2">
                  {mockup.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {mockup.features.slice(0, 3).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {mockup.features.length > 3 && (
                    <span className="inline-block bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded-full">
                      +{mockup.features.length - 3}
                    </span>
                  )}
                </div>

                {/* Selection Button */}
                <button
                  onClick={() => handleMockupSelect(mockup)}
                  className={cn(
                    "w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 transform",
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                    "focus:outline-none focus:ring-4 focus:ring-blue-300"
                  )}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Je choisis ce design</span>
                  </span>
                </button>

                {/* Popular Badge (exemple pour le premier) */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Populaire
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Besoin d'aide pour choisir ?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Tous nos templates sont entièrement personnalisables et optimisés pour votre secteur d'activité
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Responsive Design</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>SEO Optimisé</span>
          </span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Chargement Rapide</span>
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      <SelectionConfirmation
        isOpen={isConfirmationOpen}
        selectedMockup={selectedMockup}
        onConfirm={handleConfirmSelection}
        onCancel={() => {
          setIsConfirmationOpen(false);
          setSelectedMockup(null);
        }}
        isLoading={isLoading}
      />
    </div>
  );
};
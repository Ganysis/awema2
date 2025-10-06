'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SelectionConfirmationProps } from '@/types/client-selection.types';

export const SelectionConfirmation: React.FC<SelectionConfirmationProps> = ({
  isOpen,
  selectedMockup,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  if (!isOpen || !selectedMockup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Confirmer votre choix
          </h2>
          <p className="text-gray-600">
            Vous avez sélectionné le design suivant pour votre site web
          </p>
        </div>

        {/* Selected Mockup Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-4">
            {/* Thumbnail */}
            <div className="w-20 h-16 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
              <img
                src={selectedMockup.thumbnailUrl || selectedMockup.previewUrl}
                alt={selectedMockup.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="80" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 64">
                      <rect width="80" height="64" fill="#f3f4f6"/>
                      <text x="40" y="32" text-anchor="middle" dy="0.35em" fill="#9ca3af" font-family="sans-serif" font-size="8">Preview</text>
                    </svg>
                  `)}`;
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {selectedMockup.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedMockup.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedMockup.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {selectedMockup.features.length > 2 && (
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    +{selectedMockup.features.length - 2} autres
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Prochaines étapes :</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Personnalisation du contenu avec vos informations</li>
                <li>• Optimisation SEO pour votre secteur d'activité</li>
                <li>• Configuration du système de gestion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Retour
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1 px-4 py-3 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed",
              isLoading
                ? "bg-green-400 cursor-wait"
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:scale-[1.02]"
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Confirmation...</span>
              </div>
            ) : (
              'Confirmer mon choix'
            )}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
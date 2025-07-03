'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ClientForm } from '@/components/forms/client-form'
import { FormLinkWithRelations } from '@/lib/db/services/form-link.service'
import { ClientFormData } from '@/types/client'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface PublicFormWrapperProps {
  formLink: FormLinkWithRelations
}

export function PublicFormWrapper({ formLink }: PublicFormWrapperProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId] = useState(() => {
    // Generate or retrieve session ID for tracking partial submissions
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('formSessionId')
      if (stored) return stored
      const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('formSessionId', newId)
      return newId
    }
    return ''
  })

  // Track form start
  useEffect(() => {
    if (formLink.status === 'ACTIVE') {
      fetch(`/api/forms/${formLink.uniqueId}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', sessionId }),
      }).catch(console.error)
    }
  }, [formLink.uniqueId, formLink.status, sessionId])

  const handleSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Submit the form data
      const response = await fetch(`/api/forms/${formLink.uniqueId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: data,
          sessionId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Form submission failed:', response.status, errorData)
        throw new Error(errorData.error || 'Erreur lors de la soumission')
      }

      const result = await response.json()
      
      // Mark as completed
      setIsCompleted(true)
      
      // Clear session storage
      sessionStorage.removeItem('formSessionId')
      sessionStorage.removeItem('publicFormData')
      
      // Optionally redirect after a delay
      setTimeout(() => {
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl
        }
      }, 3000)
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveProgress = (data: ClientFormData, currentStep: number) => {
    // Save progress to session storage
    sessionStorage.setItem('publicFormData', JSON.stringify({ data, currentStep }))
    
    // Optionally save to server for better persistence
    fetch(`/api/forms/${formLink.uniqueId}/save-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
        step: currentStep,
        sessionId,
      }),
    }).catch(console.error)
  }

  // Check if form is still valid
  if (formLink.status !== 'ACTIVE') {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulaire indisponible</h2>
        <p className="text-gray-600">
          {formLink.status === 'COMPLETED' && 'Ce formulaire a déjà été complété.'}
          {formLink.status === 'EXPIRED' && 'Ce formulaire a expiré.'}
          {formLink.status === 'CANCELLED' && 'Ce formulaire a été annulé.'}
        </p>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="text-center py-12">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Merci !</h2>
        <p className="text-gray-600 mb-4">
          Votre formulaire a été soumis avec succès. Nous allons maintenant créer votre site web.
        </p>
        <p className="text-sm text-gray-500">
          Vous allez recevoir un email de confirmation dans quelques instants.
        </p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      <ClientForm
        onSubmit={handleSubmit}
        onSaveProgress={handleSaveProgress}
        isSubmitting={isSubmitting}
        initialData={
          typeof window !== 'undefined'
            ? JSON.parse(sessionStorage.getItem('publicFormData') || '{}').data
            : undefined
        }
        initialStep={
          typeof window !== 'undefined'
            ? JSON.parse(sessionStorage.getItem('publicFormData') || '{}').currentStep
            : undefined
        }
      />
    </div>
  )
}
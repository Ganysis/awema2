'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function EmailTestPage() {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    fetch('/api/emails/config')
      .then(res => res.json())
      .then(data => setConfig(data))
  }, [])

  const sendTestEmail = async () => {
    setSending(true)
    setResult(null)

    try {
      const response = await fetch('/api/emails/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'form-submission',
        }),
      })

      const data = await response.json()
      setResult({
        success: response.ok,
        message: data.message || (response.ok ? 'Email envoyé avec succès!' : 'Erreur lors de l\'envoi'),
      })
    } catch (error) {
      setResult({
        success: false,
        message: 'Erreur de connexion au serveur',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Test des emails</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Envoyer un email de test
        </h2>
        
        <p className="text-gray-600 mb-6">
          Cliquez sur le bouton ci-dessous pour envoyer un email de test de soumission de formulaire.
          L'email sera envoyé à l'adresse configurée dans ADMIN_EMAIL.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note :</strong> Pour que les emails fonctionnent, vous devez configurer RESEND_API_KEY dans le fichier .env
          </p>
        </div>

        <button
          onClick={sendTestEmail}
          disabled={sending}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {sending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            'Envoyer un email de test'
          )}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
            <div className="flex items-start">
              {result.success && (
                <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.message}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Configuration actuelle
        </h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Service d'email :</dt>
            <dd className="text-sm text-gray-900">
              {config?.hasResendKey ? 'Resend (configuré)' : 'Mode développement (logs console)'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email de l'expéditeur :</dt>
            <dd className="text-sm text-gray-900">
              {config?.fromEmail || 'Chargement...'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email admin :</dt>
            <dd className="text-sm text-gray-900">
              {config?.adminEmail || 'Chargement...'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
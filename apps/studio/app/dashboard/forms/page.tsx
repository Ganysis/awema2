'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  PlusIcon, 
  LinkIcon, 
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
  TrashIcon,
  ClipboardIcon
} from '@heroicons/react/24/outline'
import { FormLinkWithRelations } from '@/lib/db/services/form-link.service'

export default function FormsPage() {
  const [formLinks, setFormLinks] = useState<FormLinkWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetchFormLinks()
  }, [])

  const fetchFormLinks = async () => {
    try {
      const response = await fetch('/api/forms')
      if (response.ok) {
        const data = await response.json()
        setFormLinks(data)
      }
    } catch (error) {
      console.error('Failed to fetch form links:', error)
    } finally {
      setLoading(false)
    }
  }

  const createFormLink = async (data: { name: string; description?: string; clientId?: string }) => {
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        await fetchFormLinks()
        setShowCreateModal(false)
      }
    } catch (error) {
      console.error('Failed to create form link:', error)
    }
  }

  const deleteFormLink = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) return
    
    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchFormLinks()
      }
    } catch (error) {
      console.error('Failed to delete form link:', error)
    }
  }

  const copyToClipboard = (uniqueId: string) => {
    const url = `${window.location.origin}/form/${uniqueId}`
    navigator.clipboard.writeText(url)
    setCopiedId(uniqueId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-600 bg-green-50'
      case 'COMPLETED': return 'text-blue-600 bg-blue-50'
      case 'EXPIRED': return 'text-red-600 bg-red-50'
      case 'CANCELLED': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <ClockIcon className="w-4 h-4" />
      case 'COMPLETED': return <CheckCircleIcon className="w-4 h-4" />
      case 'EXPIRED': return <XCircleIcon className="w-4 h-4" />
      case 'CANCELLED': return <XCircleIcon className="w-4 h-4" />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Formulaires</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos liens de formulaires et suivez les soumissions
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Créer un lien
        </button>
      </div>

      {formLinks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun formulaire créé
          </h3>
          <p className="text-gray-600 mb-4">
            Créez votre premier lien de formulaire pour commencer à collecter des informations
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Créer un lien
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistiques
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créé le
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formLinks.map((formLink) => (
                <tr key={formLink.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formLink.name}
                      </div>
                      {formLink.description && (
                        <div className="text-sm text-gray-500">
                          {formLink.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(formLink.status)}`}>
                      {getStatusIcon(formLink.status)}
                      <span className="ml-1">{formLink.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{formLink.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ChartBarIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{formLink.started}</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{formLink.completed}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formLink.client ? (
                      <Link 
                        href={`/dashboard/clients/${formLink.clientId}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {formLink.client.name}
                      </Link>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(formLink.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => copyToClipboard(formLink.uniqueId)}
                        className="text-gray-400 hover:text-gray-500"
                        title="Copier le lien"
                      >
                        {copiedId === formLink.uniqueId ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <ClipboardIcon className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteFormLink(formLink.id)}
                        className="text-red-400 hover:text-red-500"
                        title="Supprimer"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Form Link Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Créer un lien de formulaire
            </h2>
            
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                createFormLink({
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                })
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du lien *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Ex: Formulaire client Dupont"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optionnel)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Notes internes sur ce formulaire..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Créer le lien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
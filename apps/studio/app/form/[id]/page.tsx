import { notFound } from 'next/navigation'
import { PublicFormWrapper } from '@/components/forms/public-form-wrapper'
import { formLinkService } from '@/lib/db/services/form-link.service'

interface PublicFormPageProps {
  params: {
    id: string
  }
}

export default async function PublicFormPage({ params }: PublicFormPageProps) {
  // Vérifier que le lien existe et est valide
  const formLink = await formLinkService.getByUniqueId(params.id)
  
  if (!formLink || formLink.status !== 'ACTIVE') {
    notFound()
  }

  // Incrémenter le nombre de vues
  await formLinkService.incrementViews(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Créons votre site web professionnel
              </h1>
              <p className="text-gray-600">
                Remplissez ce formulaire pour nous permettre de créer un site web parfaitement adapté à votre activité
              </p>
            </div>
            
            <PublicFormWrapper formLink={formLink} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Formulaire de création de site web | AWEMA Studio',
  description: 'Remplissez ce formulaire pour obtenir votre site web professionnel personnalisé',
  robots: 'noindex, nofollow', // On ne veut pas indexer les formulaires
}
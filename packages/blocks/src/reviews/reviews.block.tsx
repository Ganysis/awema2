import React, { useMemo } from 'react';
import { Block } from '@awema/shared/types';
import { ReviewsBlockData, Review, AggregateRating } from '@awema/shared/types/review.types';
import { Star, StarHalf, ThumbsUp, Check, Calendar, Camera } from 'lucide-react';

export const reviewsBlock: Block<ReviewsBlockData> = {
  name: 'reviews',
  category: 'trust',
  icon: 'Star',
  title: 'Avis clients',
  description: 'Affichage des avis clients avec notation et schema.org',
  defaultData: {
    title: 'Ce que disent nos clients',
    subtitle: 'Plus de 500 clients satisfaits nous font confiance',
    showRating: true,
    showImages: true,
    layout: 'grid',
    itemsPerRow: 3,
    enableFilters: true,
    enableSorting: true,
    enablePagination: true,
    itemsPerPage: 9,
    reviews: [
      {
        id: '1',
        author: 'Marie Dupont',
        rating: 5,
        comment: 'Excellent travail ! L\'équipe est professionnelle et à l\'écoute. Le résultat dépasse mes attentes.',
        date: new Date().toISOString(),
        verified: true,
        helpful: 12,
        images: []
      },
      {
        id: '2',
        author: 'Jean Martin',
        rating: 5,
        comment: 'Intervention rapide et efficace. Prix très compétitif. Je recommande vivement !',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true,
        helpful: 8,
        response: {
          author: 'L\'équipe',
          comment: 'Merci pour votre confiance Jean ! Au plaisir de vous revoir.',
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      {
        id: '3',
        author: 'Sophie Bernard',
        rating: 4,
        comment: 'Très bon service, seul bémol le délai un peu long. Mais le résultat est parfait.',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true,
        helpful: 5
      }
    ]
  },
  schema: {
    title: {
      type: 'text',
      label: 'Titre',
      defaultValue: 'Ce que disent nos clients'
    },
    subtitle: {
      type: 'text',
      label: 'Sous-titre',
      defaultValue: 'Plus de 500 clients satisfaits'
    },
    showRating: {
      type: 'boolean',
      label: 'Afficher la note globale',
      defaultValue: true
    },
    showImages: {
      type: 'boolean',
      label: 'Afficher les images des avis',
      defaultValue: true
    },
    layout: {
      type: 'select',
      label: 'Disposition',
      options: [
        { value: 'grid', label: 'Grille' },
        { value: 'list', label: 'Liste' },
        { value: 'carousel', label: 'Carrousel' },
        { value: 'masonry', label: 'Masonry' }
      ],
      defaultValue: 'grid'
    },
    itemsPerRow: {
      type: 'select',
      label: 'Avis par ligne',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ],
      defaultValue: 3,
      condition: (data: ReviewsBlockData) => data.layout === 'grid'
    }
  }
};

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ rating, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <Star key={star} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />;
        } else if (rating >= star - 0.5) {
          return <StarHalf key={star} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />;
        }
        return <Star key={star} className={`${sizeClasses[size]} text-gray-300`} />;
      })}
    </div>
  );
};

export const ReviewsBlockComponent: React.FC<{ data: ReviewsBlockData }> = ({ data }) => {
  const aggregateRating = useMemo<AggregateRating>(() => {
    const totalRating = data.reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      ratingValue: Number((totalRating / data.reviews.length).toFixed(1)),
      reviewCount: data.reviews.length,
      bestRating: 5,
      worstRating: 1
    };
  }, [data.reviews]);

  const sortedReviews = useMemo(() => {
    return [...data.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data.reviews]);

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header avec note globale */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-xl text-gray-600 mb-8">{data.subtitle}</p>}
          
          {data.showRating && (
            <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-gray-900">{aggregateRating.ratingValue}</div>
              <div>
                <StarRating rating={aggregateRating.ratingValue} size="lg" />
                <p className="text-sm text-gray-600 mt-1">{aggregateRating.reviewCount} avis vérifiés</p>
              </div>
            </div>
          )}
        </div>

        {/* Filtres et tri */}
        {(data.enableFilters || data.enableSorting) && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {data.enableFilters && (
              <select className="px-4 py-2 border rounded-lg">
                <option value="">Toutes les notes</option>
                <option value="5">5 étoiles</option>
                <option value="4">4 étoiles et plus</option>
                <option value="3">3 étoiles et plus</option>
              </select>
            )}
            {data.enableSorting && (
              <select className="px-4 py-2 border rounded-lg">
                <option value="recent">Plus récents</option>
                <option value="helpful">Plus utiles</option>
                <option value="rating-high">Note la plus élevée</option>
                <option value="rating-low">Note la plus basse</option>
              </select>
            )}
          </div>
        )}

        {/* Grille d'avis */}
        <div className={`grid ${gridCols[data.itemsPerRow]} gap-6`}>
          {sortedReviews.slice(0, data.enablePagination ? data.itemsPerPage : undefined).map((review) => (
            <article key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{review.author}</h3>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    Vérifié
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-4 line-clamp-4">{review.comment}</p>

              {/* Images */}
              {data.showImages && review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {idx === 2 && review.images!.length > 3 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm">
                          +{review.images!.length - 3}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Réponse */}
              {review.response && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold mb-1">{review.response.author}</p>
                  <p className="text-sm text-gray-600">{review.response.comment}</p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(review.date).toLocaleDateString('fr-FR')}
                </span>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <ThumbsUp className="w-4 h-4" />
                  Utile ({review.helpful})
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {data.enablePagination && data.reviews.length > data.itemsPerPage && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(data.reviews.length / data.itemsPerPage) }, (_, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded border hover:bg-gray-100 transition-colors"
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Services professionnels",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": aggregateRating.ratingValue,
                "reviewCount": aggregateRating.reviewCount,
                "bestRating": aggregateRating.bestRating,
                "worstRating": aggregateRating.worstRating
              },
              "review": data.reviews.map(review => ({
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": review.rating,
                  "bestRating": 5,
                  "worstRating": 1
                },
                "author": {
                  "@type": "Person",
                  "name": review.author
                },
                "datePublished": review.date,
                "reviewBody": review.comment
              }))
            })
          }}
        />
      </div>
    </section>
  );
};
import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const reviewsBlock: Block = {
  id: 'reviews',
  name: 'Avis clients',
  description: 'Affichage des avis clients avec notation et schema.org',
  category: BlockCategory.TESTIMONIALS,
  tags: ['reviews', 'testimonials', 'rating', 'trust'],
  thumbnail: '/blocks/reviews.jpg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      required: true,
      defaultValue: 'Ce que disent nos clients',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de la section',
        group: 'Content',
        order: 1
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre de la section',
      required: false,
      defaultValue: 'Plus de 500 clients satisfaits nous font confiance',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Sous-titre',
        group: 'Content',
        order: 2
      }
    },
    {
      name: 'reviews',
      type: PropType.ARRAY,
      description: 'Liste des avis',
      required: true,
      defaultValue: [],
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Reviews',
        order: 3
      }
    },
    {
      name: 'layout',
      type: PropType.SELECT,
      description: 'Type de disposition',
      required: true,
      defaultValue: 'grid',
      validation: {
        options: ['grid', 'list', 'carousel', 'masonry']
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Layout',
        order: 4
      }
    },
    {
      name: 'itemsPerRow',
      type: PropType.NUMBER,
      description: 'Nombre d\'avis par ligne',
      required: true,
      defaultValue: 3,
      validation: {
        min: 1,
        max: 4
      },
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Layout',
        order: 5
      }
    },
    {
      name: 'showRating',
      type: PropType.BOOLEAN,
      description: 'Afficher la note globale',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Display',
        order: 6
      }
    }
  ],
  variants: [],
  defaultProps: {
    title: 'Ce que disent nos clients',
    subtitle: 'Plus de 500 clients satisfaits nous font confiance',
    showRating: true,
    layout: 'grid',
    itemsPerRow: 3,
    reviews: [
      {
        id: '1',
        author: 'Marie Dupont',
        rating: 5,
        comment: 'Excellent travail ! L\'équipe est professionnelle et à l\'écoute. Le résultat dépasse mes attentes.',
        date: new Date().toISOString(),
        verified: true,
        helpful: 12
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
  }
};

export function renderReviews(props: Record<string, any>): RenderedBlock {
  const {
    title = 'Ce que disent nos clients',
    subtitle,
    reviews = [],
    layout = 'grid',
    itemsPerRow = 3,
    showRating = true
  } = props;

  // Calculer la note moyenne
  const calculateAverageRating = (reviews: any[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc: number, review: any) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  const avgRating = calculateAverageRating(reviews);
  const gridCols = itemsPerRow === 1 ? 'grid-cols-1' : 
                   itemsPerRow === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                   itemsPerRow === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 
                   'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const html = `
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">${title}</h2>
          ${subtitle ? `<p class="text-xl text-gray-600 mb-8">${subtitle}</p>` : ''}
          
          ${showRating && reviews.length > 0 ? `
            <div class="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-lg shadow-md">
              <div class="text-4xl font-bold text-gray-900">${avgRating}</div>
              <div>
                <div class="flex items-center gap-0.5">
                  ${Array.from({length: 5}, (_, i) => 
                    i < Math.floor(avgRating) 
                      ? '<svg class="w-6 h-6 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                      : i < avgRating
                      ? '<svg class="w-6 h-6 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                      : '<svg class="w-6 h-6 text-gray-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                  ).join('')}
                </div>
                <p class="text-sm text-gray-600 mt-1">${reviews.length} avis vérifiés</p>
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="${layout === 'grid' ? `grid ${gridCols} gap-6` : 'space-y-6'}">
          ${reviews.map((review: any) => `
            <article class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="font-semibold text-lg">${review.author}</h3>
                  <div class="flex items-center gap-0.5">
                    ${Array.from({length: 5}, (_, i) => 
                      i < review.rating 
                        ? '<svg class="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                        : '<svg class="w-5 h-5 text-gray-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
                    ).join('')}
                  </div>
                </div>
                ${review.verified ? `
                  <span class="flex items-center gap-1 text-sm text-green-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Vérifié
                  </span>
                ` : ''}
              </div>
              
              <p class="text-gray-700 mb-4">${review.comment}</p>
              
              ${review.response ? `
                <div class="mt-4 pt-4 border-t">
                  <p class="text-sm font-semibold mb-1">${review.response.author}</p>
                  <p class="text-sm text-gray-600">${review.response.comment}</p>
                </div>
              ` : ''}
              
              <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  ${new Date(review.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </article>
          `).join('')}
        </div>
        
        <!-- Schema.org JSON-LD -->
        <script type="application/ld+json">
        ${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Services professionnels",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": avgRating,
            "reviewCount": reviews.length,
            "bestRating": 5,
            "worstRating": 1
          },
          "review": reviews.map((review: any) => ({
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
        })}
        </script>
      </div>
    </section>
  `;

  return {
    html,
    css: '',
    dependencies: [],
    criticalCSS: ''
  };
}